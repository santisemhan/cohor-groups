import { Prisma } from "@prisma/client"
import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"
import { TimeService } from "../services/common/TimeService"

@Injectable()
export class UserRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly timeService: TimeService
  ) {}

  public async createUserAsync(data: Prisma.UserCreateInput) {
    const connection = await this.databaseService.connectionAsync()
    return connection.user.create({ data })
  }

  public async updateUserAsync(userId: string, name: string, birthdate: Date) {
    const connection = await this.databaseService.connectionAsync()
    return connection.user.update({
      where: { id: userId },
      data: {
        name,
        birthdate
      }
    })
  }

  public async findUserByEmailAsync(email: string) {
    const connection = await this.databaseService.connectionAsync()
    return connection.user.findUnique({ where: { email }, include: { validation: true } })
  }

  public async findUserByIdOrThrowAsync(id: string) {
    const connection = await this.databaseService.connectionAsync()
    return connection.user.findUniqueOrThrow({ where: { id }, include: { validation: true } })
  }

  public async validateUserAsync(userId: string) {
    const connection = await this.databaseService.connectionAsync()
    return connection.userValidation.update({
      where: { userId: userId },
      data: {
        validatedAt: this.timeService.now()
      }
    })
  }
}
