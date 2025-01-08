import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class MailerRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findLastAttempByUserIdAsync(userId: string) {
    const connection = await this.databaseService.connectionAsync()
    return connection.mailRateLimit.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } })
  }

  public async updateLastAttemptByIdAsync(id: string, attemptMs: number) {
    const connection = await this.databaseService.connectionAsync()
    return connection.mailRateLimit.update({
      where: { id },
      data: {
        createdAt: new Date(),
        attemptMs
      }
    })
  }

  public async createFirstAttempAsync(userId: string, attemptMs: number) {
    const connection = await this.databaseService.connectionAsync()
    return connection.mailRateLimit.create({
      data: {
        userId,
        attemptMs,
        createdAt: new Date()
      }
    })
  }
}
