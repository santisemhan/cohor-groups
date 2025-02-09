import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

const tableNames = ["Users", "Groups"]

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  for (const tableName of tableNames) await prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`)
}

main().finally(async () => {
  await prisma.$disconnect()
})
