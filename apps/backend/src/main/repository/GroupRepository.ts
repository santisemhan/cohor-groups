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
    return { id: group.id, code: group.code, name: group.name }
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
    return connection.user.update({
      include: {
        groups: {
          include: {
            group: true
          }
        }
      },
      where: {
        id: userId
      },
      data: {
        onboardingStep: OnboardingStep.COMPLETED
      }
    })
  }

  public async getUserGroup(userId: string) {
    const connection = await this.databaseService.connectionAsync()
    return (
      await connection.group.findMany({
        where: {
          users: {
            some: {
              userId
            }
          }
        }
      })
    )[0]
  }
}
