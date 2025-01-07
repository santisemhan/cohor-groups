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

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authenticationConfigurationProvider: AuthenticationConfigurationProvider,
    private readonly mailService: MailService,
    private readonly webConfigurationProvider: WebConfigurationProvider
  ) {}

  public async registerAsync(data: Prisma.UserCreateWithoutValidationInput) {
    const userId = randomUUID()
    const token = randomUUID()
    const user: Prisma.UserCreateInput = {
      ...data,
      id: userId,
      password: await bcrypt.hash(data.password, 10),
      validation: {
        create: {
          userId,
          token
        }
      }
    }
    const { id, email } = await this.userRepository.createUserAsync(user)
    const configuration = await this.webConfigurationProvider.getConfigurationAsync()
    await this.mailService.sendMail({
      to: email,
      subject: "Validá tu cuenta",
      body: `Por favor validá tu cuenta presionando el siguiente link: ${configuration.source}/auth/validate/${id}/${token}`
    })
    return { id, email }
  }

  public async loginAsync(email: string, password: string) {
    const user = await this.userRepository.findUserByEmailAsync(email)
    if (!user) throw new Error("User not found")

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error("Invalid password")

    if (!user.validation.validatedAt) throw new NotValidatedAccount()

    return this.generateToken({ sub: user.id, email: user.email, role: Role.User })
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
    if (!user) throw new Error("User not found")

    if (user.validation.token !== token) throw new Error("Invalid token")

    await this.userRepository.validateUserAsync(userId)
  }
}
