import { afterAll, beforeAll, describe, expect, it } from "@jest/globals"
import { randomUUID } from "crypto"
import { PrismaClient, OnboardingStep } from "@prisma/client"
import Container from "typedi"
import { GroupRepository } from "../../main/repository/GroupRepository"
import { UserInGroupError } from "../../main/errors/UserInGroupError"

describe("GroupRepository", () => {
  const prisma = new PrismaClient()
  let groupRepository: GroupRepository

  beforeAll(async () => {
    groupRepository = Container.get(GroupRepository)
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it("should create a group and update the user's onboarding step", async () => {
    const user = await prisma.user.create({
      data: {
        email: `${randomUUID()}@cohor.app`,
        onboardingStep: OnboardingStep.STEP_THREE
      }
    })

    const groupName = `${randomUUID()} Group`
    const group = await groupRepository.createGroupAsync({ name: groupName, interestIds: [] }, user.id)

    expect(group).toHaveProperty("id")
    expect(group).toHaveProperty("code")
    expect(group.name).toBe(groupName)

    const updatedUser = await prisma.user.findUnique({ where: { id: user.id } })
    expect(updatedUser?.onboardingStep).toBe(OnboardingStep.COMPLETED)
  })

  it("should allow a user to join a group", async () => {
    const admin = await prisma.user.create({
      data: {
        email: `${randomUUID()}@cohor.app`,
        onboardingStep: OnboardingStep.STEP_THREE
      }
    })

    const user = await prisma.user.create({
      data: {
        email: `${randomUUID()}@cohor.app`,
        onboardingStep: OnboardingStep.STEP_THREE
      }
    })

    const groupName = `${randomUUID()} Group`
    const group = await groupRepository.createGroupAsync({ name: groupName, interestIds: [] }, admin.id)
    await groupRepository.joinGroupOrThrowAsync(group.code, user.id)

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { groups: true }
    })

    expect(updatedUser?.groups.length).toBe(1)
    expect(updatedUser?.groups[0].groupId).toBe(group.id)
    expect(updatedUser?.onboardingStep).toBe(OnboardingStep.COMPLETED)
  })

  it("should throw an error if the user is already in a group", async () => {
    const admin = await prisma.user.create({
      data: {
        email: `${randomUUID()}@cohor.app`,
        onboardingStep: OnboardingStep.STEP_THREE
      }
    })

    const user = await prisma.user.create({
      data: {
        email: `${randomUUID()}@cohor.app`,
        onboardingStep: OnboardingStep.STEP_THREE
      }
    })

    const groupName = `${randomUUID()} Group`
    const group = await groupRepository.createGroupAsync({ name: groupName, interestIds: [] }, admin.id)
    await groupRepository.joinGroupOrThrowAsync(group.code, user.id)

    let error
    try {
      // Reject
      await groupRepository.joinGroupOrThrowAsync(group.code, user.id)
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(UserInGroupError)
  })

  it("should return the group the user is in", async () => {
    const user = await prisma.user.create({
      data: {
        email: `${randomUUID()}@cohor.app`,
        onboardingStep: OnboardingStep.COMPLETED
      }
    })

    const groupName = `${randomUUID()} Group`
    const group = await groupRepository.createGroupAsync({ name: groupName, interestIds: [] }, user.id)

    const userGroup = await groupRepository.getUserGroup(user.id)

    expect(userGroup).toBeDefined()
    expect(userGroup?.id).toBe(group.id)
  })

  it("should return undefined if the user is not in any group", async () => {
    const user = await prisma.user.create({
      data: {
        email: `${randomUUID()}@cohor.app`,
        onboardingStep: OnboardingStep.STEP_THREE
      }
    })

    const userGroup = await groupRepository.getUserGroup(user.id)

    expect(userGroup).toBeUndefined()
  })
})
