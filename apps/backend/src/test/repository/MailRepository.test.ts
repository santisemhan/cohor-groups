import { afterAll, beforeAll, describe, expect, it } from "@jest/globals"
import { PrismaClient } from "@prisma/client"
import Container from "typedi"
import { randomUUID } from "crypto"
import { MailRepository } from "../../main/repository/MailRepository"

describe("MailRepository", () => {
  const prisma = new PrismaClient()
  let mailRepository: MailRepository

  beforeAll(async () => {
    mailRepository = Container.get(MailRepository)
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it("should create a first attempt", async () => {
    const userId = randomUUID()
    await prisma.user.create({
      data: {
        id: userId,
        email: `${randomUUID()}@cohor.app`
      }
    })
    const attemptMs = 1000

    const result = await mailRepository.createFirstAttempAsync(userId, attemptMs)

    expect(result).toBeDefined()
    expect(result.userId).toBe(userId)
    expect(result.attemptMs).toBe(attemptMs)
  })

  it("should find the last attempt by user ID", async () => {
    const userId = randomUUID()
    await prisma.user.create({
      data: {
        id: userId,
        email: `${randomUUID()}@cohor.app`
      }
    })

    const attemptMs = 1000

    await mailRepository.createFirstAttempAsync(userId, attemptMs)
    const result = await mailRepository.findLastAttempByUserIdAsync(userId)

    expect(result).toBeDefined()
    expect(result?.userId).toBe(userId)
    expect(result?.attemptMs).toBe(attemptMs)
  })

  it("should update the last attempt by ID", async () => {
    const userId = randomUUID()
    await prisma.user.create({
      data: {
        id: userId,
        email: `${randomUUID()}@cohor.app`
      }
    })

    const attemptMs = 1000
    const newAttemptMs = 2000

    const createdAttempt = await mailRepository.createFirstAttempAsync(userId, attemptMs)
    const result = await mailRepository.updateLastAttemptByIdAsync(createdAttempt.id, newAttemptMs)

    expect(result).toBeDefined()
    expect(result.attemptMs).toBe(newAttemptMs)
  })
})
