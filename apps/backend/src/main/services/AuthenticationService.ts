import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"

import { Prisma } from "@prisma/client"
import { UserRepository } from "../repository/UserRepository"
import { Injectable } from "../support/decorator/Injectable"
import { JWTPayload, jwtVerify, SignJWT } from "jose"
import { AuthenticationConfigurationProvider } from "../configuration/provider/AuthenticationConfigurationProvider"
import { Role } from "../authorization/Permission"
import { MailService } from "./MailService"
import { WebConfigurationProvider } from "../configuration/provider/WebConfigurationProvider"
import { NotValidatedAccount } from "../errors/NotValidatedAccount"
import { MailRepository } from "../repository/MailRepository"
import { TooManyRequestError } from "../errors/TooManyRequestError"
import { EmailRateLimitError } from "../errors/EmailRateLimitError"
import { UserValidatedError } from "../errors/UserValidatedError"
import { TimeService } from "./common/TimeService"
import { User, OnboardingStep } from "@cohor/types"
import { RegisterRequest } from "../schema/auth/RegisterSchema"
import { UserAlreadyExistError } from "../errors/UserAlreadyExistError"
import { UserNotFoundError } from "../errors/UserNotFoundError"
import { InvalidLoginMethodError } from "../errors/InvalidLoginMethodError"
import { InvalidPasswordError } from "../errors/InvalidPasswordError"
import { InvalidTokenError } from "../errors/InvalidTokenError"
import { verifyEmailTemplate } from "../support/templates/VerifyEmailTemplate"

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailerRepository: MailRepository,
    private readonly authenticationConfigurationProvider: AuthenticationConfigurationProvider,
    private readonly mailService: MailService,
    private readonly timeService: TimeService,
    private readonly webConfigurationProvider: WebConfigurationProvider
  ) {}

  public async registerAsync(data: RegisterRequest) {
    const userExists = await this.userRepository.findUserByEmailAsync(data.email)
    if (
      userExists &&
      ((userExists.password !== null && data.isThirdParty) || (userExists.password === null && !data.isThirdParty))
    ) {
      throw new UserAlreadyExistError()
    }
    if (userExists) return { id: userExists.email, email: userExists.email }

    const userId = randomUUID()
    const token = randomUUID()
    const user: Prisma.UserCreateInput = {
      ...data,
      id: userId,
      password: data.password ? await bcrypt.hash(data.password, 10) : undefined,
      isThirdParty: data.isThirdParty,
      validation: data.isThirdParty
        ? undefined
        : {
            create: {
              token
            }
          }
    }

    const { id, email } = await this.userRepository.createUserAsync(user)
    const configuration = await this.webConfigurationProvider.getConfigurationAsync()
    await this.mailService.sendMail({
      to: email,
      subject: "Validá tu cuenta",
      body: verifyEmailTemplate(`${configuration.source}/auth/validate/${id}/${token}`)
    })
    return { id, email }
  }

  public async revalidateEmail(id: string) {
    const INITIAL_MS = 60 * 1000 // 1 min
    const MULTIPLIER = 2
    const currentTime = this.timeService.now()
    try {
      const user = await this.userRepository.findUserByIdOrThrowAsync(id)
      //PASS TO DYNAMO TTL
      if (!user.validation || user.validation.validatedAt !== null) {
        throw new UserValidatedError()
      }
      const lastAttempt = await this.mailerRepository.findLastAttempByUserIdAsync(user.id)
      if (lastAttempt) {
        const elapsedTime = currentTime.getTime() - lastAttempt.createdAt.getTime()
        const nextAttempMs = lastAttempt.attemptMs * MULTIPLIER
        if (elapsedTime < nextAttempMs) {
          throw new TooManyRequestError()
        }
        await this.mailerRepository.updateLastAttemptByIdAsync(lastAttempt.id, nextAttempMs)
      } else {
        await this.mailerRepository.createFirstAttempAsync(user.id, INITIAL_MS)
      }
      const configuration = await this.webConfigurationProvider.getConfigurationAsync()
      const token = randomUUID()
      await this.mailService.sendMail({
        to: user.email,
        subject: "Validá tu cuenta",
        body: verifyEmailTemplate(`${configuration.source}/auth/validate/${id}/${token}`)
      })
    } catch (error) {
      throw new EmailRateLimitError(error)
    }
  }

  public async loginAsync(email: string, password?: string): Promise<{ user: User; accessToken: string }> {
    const user = await this.userRepository.findUserByEmailAsync(email)
    if (!user) throw new UserNotFoundError()
    if (user.isThirdParty && password) throw new InvalidLoginMethodError()
    if (!user.isThirdParty && !password) throw new InvalidLoginMethodError()

    if (!user.isThirdParty) {
      const passwordMatch = await bcrypt.compare(password as string, user.password as string)
      if (!passwordMatch) throw new InvalidPasswordError()

      if (!user.validation?.validatedAt) throw new NotValidatedAccount()
    }

    const { id, email: userEmail, name, birthdate, onboardingStep } = user

    const accessToken = await this.generateToken({ sub: id, email: userEmail, role: Role.User })
    return {
      user: {
        id,
        email: userEmail,
        name,
        birthdate,
        onboardingStep: onboardingStep as OnboardingStep
      },
      accessToken
    }
  }

  private async generateToken(payload: JWTPayload): Promise<string> {
    const authenticationConfiguration = await this.authenticationConfigurationProvider.getConfigurationAsync()
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(authenticationConfiguration.JWTKey))
  }

  public async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const authenticationConfiguration = await this.authenticationConfigurationProvider.getConfigurationAsync()
      const { payload } = await jwtVerify(token, new TextEncoder().encode(authenticationConfiguration.JWTKey))
      return payload
    } catch {
      return null
    }
  }

  public async validateAccountAsync(userId: string, token: string) {
    const user = await this.userRepository.findUserByIdOrThrowAsync(userId)
    if (!user) throw new UserNotFoundError()

    if (user.validation?.token !== token) throw new InvalidTokenError()

    await this.userRepository.validateUserAsync(userId)
  }
}
