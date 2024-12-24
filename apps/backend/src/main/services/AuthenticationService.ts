import bcrypt from "bcryptjs"

import { Prisma } from "@prisma/client"
import { UserRepository } from "../repository/UserRepository"
import { Injectable } from "../support/decorator/Injectable"
import { JWTPayload, jwtVerify, SignJWT } from "jose"

const SECRET_KEY = new TextEncoder().encode("your-256-bit-secret")

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerAsync(data: Prisma.UserCreateInput) {
    const user = {
      ...data,
      password: await bcrypt.hash(data.password, 10)
    }
    const { id, email } = await this.userRepository.createUserAsync(user)
    return this.generateToken({ sub: id, email: email })
  }

  public async loginAsync(email: string, password: string) {
    const user = await this.userRepository.findUserByEmailAsync(email)
    if (!user) throw new Error("User not found")

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error("Invalid password")

    return this.generateToken({ sub: user.id, email: user.email })
  }

  private async generateToken(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(SECRET_KEY)
  }

  public async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY)
      return payload
    } catch {
      return null
    }
  }
}
