import { Group, OnboardingStep } from "@prisma/client"
import { UserInGroupError } from "../errors/UserInGroupError"
import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"
import { PaginationOptions } from "../support/paginator/PaginationOptions"
import { Paginator } from "../support/paginator/Paginator"
import { PaginatedResult } from "../support/paginator/PaginatedResult"

@Injectable()
export class GroupRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createGroupAsync(data: { name: string; interestIds: string[] }, userId: string) {
    const connection = await this.databaseService.connectionAsync()
    const group = await connection.group.create({
      data: {
        name: data.name,
        GroupInterest: {
          createMany: {
            data: data.interestIds.map((id) => ({
              interestId: id
            }))
          }
        },
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
        },
        include: {
          GroupInterest: {
            include: {
              Interest: true
            }
          }
        }
      })
    )[0]
  }

  public async getGroups(
    excludedGroupId: string,
    options: PaginationOptions<Group>
  ): Promise<PaginatedResult<{ id: string; name: string }>> {
    const connection = await this.databaseService.connectionAsync()

    return Paginator.paginate<Group, { id: string; name: string }>(
      async ({ skip, take }) => {
        return connection.group.findMany({
          where: { NOT: { id: excludedGroupId } },
          select: { id: true, name: true },
          skip,
          take,
          orderBy: { [options.orderBy]: options.orderDirection === "desc" ? "desc" : "asc" }
        })
      },
      async () => {
        return connection.group.count({
          where: { NOT: { id: excludedGroupId } }
        })
      },
      options
    )
  }
}
