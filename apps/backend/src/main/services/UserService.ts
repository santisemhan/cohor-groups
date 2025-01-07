import { UserRepository } from "../repository/UserRepository"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async updateAsync(userId: string, name: string, birthdate: Date) {
    const user = await this.userRepository.findUserByIdOrThrowAsync(userId)
    if (!user?.validation.validatedAt) throw new Error("User is not validated")

    await this.userRepository.updateUserAsync(userId, name, birthdate)
  }
}
