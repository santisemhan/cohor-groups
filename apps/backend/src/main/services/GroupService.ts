import { GroupRepository } from "../repository/GroupRepository"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  public async createAsync(data: { name: string; interestIds: string[] }, userId: string) {
    return this.groupRepository.createGroupAsync(data, userId)
  }

  public async joinGroupOrThrowAsync(groupCode: number, userId: string) {
    return this.groupRepository.joinGroupOrThrowAsync(groupCode, userId)
  }

  public async getUserGroup(userId: string) {
    return this.groupRepository.getUserGroup(userId)
  }

  public async getGroups(excludedGroupId: string) {
    return this.groupRepository.getGroups(excludedGroupId)
  }
}
