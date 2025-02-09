import { afterAll, beforeAll, describe, expect, it } from "@jest/globals"
import { OnboardingStep, Prisma, PrismaClient } from "@prisma/client"
import { UserRepository } from "../../main/repository/UserRepository"
import Container from "typedi"
import { randomUUID } from "crypto"
import bcrypt from "bcryptjs"

describe("UserRepository", () => {
  const prisma = new PrismaClient()
  let userRepository: UserRepository

  beforeAll(async () => {
    userRepository = Container.get(UserRepository)
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it("should create a user", async () => {
    const userId = randomUUID()
    const data: Prisma.UserCreateInput = {
      id: userId,
      email: `${randomUUID()}@cohor.app`,
      password: await bcrypt.hash("password", 10),
      isThirdParty: false
    }
    await userRepository.createUserAsync(data)

    const user = await userRepository.findUserByIdOrThrowAsync(userId)
    expect(user.id).toEqual(userId)
  })

  it("should update a user", async () => {
    const userId = randomUUID()
    const data: Prisma.UserCreateInput = {
      id: userId,
      email: `${randomUUID()}@cohor.app`,
      password: await bcrypt.hash("password", 10),
      isThirdParty: false
    }
    await userRepository.createUserAsync(data)

    const updatedName = "Updated Name"
    const updatedBirthdate = new Date("1990-01-01")
    await userRepository.updateUserAsync(userId, updatedName, updatedBirthdate, OnboardingStep.STEP_TWO)

    const updatedUser = await userRepository.findUserByIdOrThrowAsync(userId)
    expect(updatedUser.name).toEqual(updatedName)
    expect(updatedUser.birthdate).toEqual(updatedBirthdate)
    expect(updatedUser.onboardingStep).toEqual(OnboardingStep.STEP_TWO)
  })

  it("should find a user by email", async () => {
    const userId = randomUUID()
    const email = `${randomUUID()}@cohor.app`
    const data: Prisma.UserCreateInput = {
      id: userId,
      email,
      password: await bcrypt.hash("password", 10),
      isThirdParty: false
    }
    await userRepository.createUserAsync(data)

    const user = await userRepository.findUserByEmailAsync(email)
    expect(user?.email).toEqual(email)
  })

  it("should validate a user", async () => {
    const userId = randomUUID()
    const data: Prisma.UserCreateInput = {
      id: userId,
      email: `${randomUUID()}@cohor.app`,
      password: await bcrypt.hash("password", 10),
      isThirdParty: false,
      validation: {
        create: {
          token: randomUUID()
        }
      }
    }
    await userRepository.createUserAsync(data)

    await userRepository.validateUserAsync(userId)

    const user = await userRepository.findUserByIdOrThrowAsync(userId)
    expect(user).not.toBeNull()
    expect(user.validation).not.toBeNull()
    expect(user.validation?.validatedAt).toBeDefined()
  })
})
