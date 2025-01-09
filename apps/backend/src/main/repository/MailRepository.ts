import { TimeService } from "../services/common/TimeService"
import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class MailerRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly timeService: TimeService
  ) {}

  public async findLastAttempByUserIdAsync(userId: string) {
    const connection = await this.databaseService.connectionAsync()
    return connection.mailRateLimit.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } })
  }

  public async updateLastAttemptByIdAsync(id: string, attemptMs: number) {
    const connection = await this.databaseService.connectionAsync()
    return connection.mailRateLimit.update({
      where: { id },
      data: {
        createdAt: this.timeService.now(),
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
        createdAt: this.timeService.now()
      }
    })
  }
}
