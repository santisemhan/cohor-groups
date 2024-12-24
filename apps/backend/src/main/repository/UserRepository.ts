import { DatabaseService } from "../services/database/DatabaseService"
import { Repository } from "../support/decorator/Repository"

@Repository()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async getAllAsync() {
    const connection = await this.databaseService.connectionAsync()
    return connection.user.findMany()
  }
}
