import { Prisma } from "@prisma/client"
import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createUserAsync(data: Prisma.UserCreateInput) {
    const connection = await this.databaseService.connectionAsync()
    return connection.user.create({ data })
  }

  public async findUserByEmailAsync(email: string) {
    const connection = await this.databaseService.connectionAsync()
    return connection.user.findUnique({ where: { email } })
  }
}
