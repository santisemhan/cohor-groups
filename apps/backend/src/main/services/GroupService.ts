import { Group } from "@prisma/client"
import { GroupRepository } from "../repository/GroupRepository"
import { Injectable } from "../support/decorator/Injectable"
import { PaginationOptions } from "../support/paginator/PaginationOptions"
import { CloudinaryService } from "./storage/CloudinaryService"

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  public async createAsync(data: { name: string; interestIds: string[] }, userId: string) {
    return this.groupRepository.createGroupAsync(data, userId)
  }

  public async joinGroupOrThrowAsync(groupCode: number, userId: string) {
    return this.groupRepository.joinGroupOrThrowAsync(groupCode, userId)
  }

  public async getUserGroup(userId: string) {
    return this.groupRepository.getUserGroup(userId)
  }

  public async getGroups(excludedGroupId: string, options: PaginationOptions<Group>) {
    const response = await this.groupRepository.getGroups(excludedGroupId, options)
    const groups = await Promise.all(
      response.data.map(async (group) => ({
        ...group,
        imageURL: await this.cloudinaryService.getUrlAsync("group-profile", group.id)
      }))
    )
    return {
      ...response,
      data: groups
    }
  }
}
