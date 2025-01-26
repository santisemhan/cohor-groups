import { OnboardingStep, User } from "@cohor/types"
import { UserRepository } from "../repository/UserRepository"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async updateAsync(userId: string, name: string, birthdate: Date, onboardingStep: OnboardingStep) {
    await this.userRepository.updateUserAsync(userId, name, birthdate, onboardingStep)
  }

  public async getUserByIdAsync(userId: string): Promise<User> {
    const { id, email, name, birthdate, onboardingStep } = await this.userRepository.findUserByIdOrThrowAsync(userId)

    return { id, email, name, birthdate, onboardingStep: onboardingStep as OnboardingStep }
  }
}
