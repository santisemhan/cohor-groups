import { randomInt } from "crypto"
import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class GroupRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createGroupAsync(name: string) {
    const connection = await this.databaseService.connectionAsync()
    return connection.group.create({
      data: {
        name
      }
    })
  }

  public async joinGroupOrThrowAsync(groupCode: number, userId: string) {
    const connection = await this.databaseService.connectionAsync()
    const group = await connection.group.findFirstOrThrow({
      where: {
        groupCode
      }
    })
    return connection.userGroups.create({
      data: {
        userId,
        groupId: group.id
      }
    })
  }
}
