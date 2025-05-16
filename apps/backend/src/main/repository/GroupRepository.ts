import { Group, OnboardingStep } from "@prisma/client"
import { UserInGroupError } from "../errors/UserInGroupError"
import { DatabaseService } from "../services/database/DatabaseService"
import { Injectable } from "../support/decorator/Injectable"
import { PaginationOptions } from "../support/paginator/PaginationOptions"
import { Paginator } from "../support/paginator/Paginator"
import { PaginatedResult } from "../support/paginator/PaginatedResult"
import { GroupQueryResponse } from "../../types/group/GroupQuery"
import { GroupResponse } from "@cohor/types"

@Injectable()
export class GroupRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createGroupAsync(data: { name: string; interestIds: string[] }, userId: string) {
    const connection = await this.databaseService.connectionAsync()
    const group = await connection.group.create({
      data: {
        name: data.name,
        GroupInterest: { createMany: { data: data.interestIds.map((id) => ({ interestId: id })) } },
        users: { create: { userId } }
      }
    })
    await connection.user.update({ where: { id: userId }, data: { onboardingStep: OnboardingStep.COMPLETED } })
    return { id: group.id, code: group.code, name: group.name }
  }

  public async joinGroupOrThrowAsync(code: number, userId: string) {
    const connection = await this.databaseService.connectionAsync()
    const group = await connection.userGroups.findFirst({ where: { userId } })
    if (group) {
      throw new UserInGroupError()
    }
    await connection.userGroups.create({ data: { user: { connect: { id: userId } }, group: { connect: { code } } } })
    return connection.user.update({
      include: { groups: { include: { group: true } } },
      where: { id: userId },
      data: { onboardingStep: OnboardingStep.COMPLETED }
    })
  }

  public async getUserGroup(userId: string) {
    const connection = await this.databaseService.connectionAsync()
    return (
      await connection.group.findMany({
        where: { users: { some: { userId } } },
        include: { GroupInterest: { include: { Interest: true } } }
      })
    )[0]
  }

  public async getGroups(
    excludedGroupId: string,
    options: PaginationOptions<Group>
  ): Promise<PaginatedResult<Omit<GroupResponse, "imageURL">>> {
    const connection = await this.databaseService.connectionAsync()
    const result = await Paginator.paginate<Group, GroupQueryResponse>(
      async ({ skip, take }) => {
        return connection.group.findMany({
          where: { NOT: { id: excludedGroupId } },
          select: {
            id: true,
            name: true,
            GroupInterest: { select: { Interest: { select: { id: true, name: true, unicode: true } } } },
            users: { select: { user: { select: { id: true, name: true } } } }
          },
          skip,
          take,
          orderBy: { [options.orderBy]: options.orderDirection === "desc" ? "desc" : "asc" }
        })
      },
      async () => {
        return connection.group.count({ where: { NOT: { id: excludedGroupId } } })
      },
      options
    )
    return {
      ...result,
      data: result.data.map((group) => ({
        id: group.id,
        name: group.name,
        interests: group.GroupInterest.map((groupInterest) => ({
          id: groupInterest.Interest.id,
          name: groupInterest.Interest.name,
          unicode: groupInterest.Interest.unicode
        })),
        members: group.users.map((user) => ({ id: user.user.id, name: user.user.name }))
      }))
    }
  }
}
