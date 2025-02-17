import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class CategoryRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async getAllAsync() {
    const connection = await this.databaseService.connectionAsync()
    return connection.category.findMany({
      include: {
        interests: true
      }
    })
  }
}
