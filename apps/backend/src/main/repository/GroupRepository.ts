import { UserInGroupError } from "../errors/UserInGroupError"
import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class GroupRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createGroupAsync(name: string, userId: string) {
    const connection = await this.databaseService.connectionAsync()
    console.log
    return await connection.group.create({
      data: {
        name,
        users: {
          create: {
            userId,
          }
        }
      }
    })
  }

  public async joinGroupOrThrowAsync(groupCode: number, userId: string) {
    const connection = await this.databaseService.connectionAsync()
    const group = await connection.userGroups.findFirst({
      where: {
        group: {
          groupCode
        },
        userId
      }
    })
    if(group) {
      throw new UserInGroupError()
    }
    return connection.userGroups.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        group: {
          connect: {
            groupCode
          }
        }
      }
    })
  }
}
