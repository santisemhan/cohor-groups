import bcrypt from "bcryptjs"

import { Prisma } from "@prisma/client"
import { UserRepository } from "../repository/UserRepository"
import { Injectable } from "../support/decorator/Injectable"
import { JWTPayload, jwtVerify, SignJWT } from "jose"
import { AuthenticationConfigurationProvider } from "../configuration/provider/AuthenticationConfiguration"
import { Role } from "../authorization/Permission"

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authenticationConfigurationProvider: AuthenticationConfigurationProvider
  ) {}

  public async registerAsync(data: Prisma.UserCreateInput) {
    const user = {
      ...data,
      password: await bcrypt.hash(data.password, 10)
    }
    const { id, email } = await this.userRepository.createUserAsync(user)
    return this.generateToken({ sub: id, email: email, role: Role.User })
  }

  public async loginAsync(email: string, password: string) {
    const user = await this.userRepository.findUserByEmailAsync(email)
    if (!user) throw new Error("User not found")

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error("Invalid password")

    return this.generateToken({ sub: user.id, email: user.email, role: Role.User })
  }

  private async generateToken(payload: JWTPayload): Promise<string> {
    const authenticationConfiguration = await this.authenticationConfigurationProvider.getConfigurationAsync()
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
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
}
