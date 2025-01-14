import { GroupRepository } from "../repository/GroupRepository"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  public async createAsync(name: string, userId: string) {
    return this.groupRepository.createGroupAsync(name, userId)
  }

  public async joinGroupOrThrowAsync(groupCode: number, userId: string) {
    return this.groupRepository.joinGroupOrThrowAsync(groupCode, userId)
  }
}
