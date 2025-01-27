import { OnboardingStep } from "@prisma/client"
import { UserInGroupError } from "../errors/UserInGroupError"
import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class GroupRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createGroupAsync(name: string, userId: string) {
    const connection = await this.databaseService.connectionAsync()
    const group = await connection.group.create({
      data: {
        name,
        users: {
          create: {
            userId
          }
        }
      }
    })
    await connection.user.update({
      where: {
        id: userId
      },
      data: {
        onboardingStep: OnboardingStep.COMPLETED
      }
    })
    return group.code
  }

  public async joinGroupOrThrowAsync(code: number, userId: string) {
    const connection = await this.databaseService.connectionAsync()
    const group = await connection.userGroups.findFirst({
      where: {
        userId
      }
    })
    if (group) {
      throw new UserInGroupError()
    }
    await connection.userGroups.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        group: {
          connect: {
            code
          }
        }
      }
    })
    await connection.user.update({
      where: {
        id: userId
      },
      data: {
        onboardingStep: OnboardingStep.COMPLETED
      }
    })
  }
}
