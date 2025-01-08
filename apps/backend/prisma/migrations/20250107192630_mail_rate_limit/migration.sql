BEGIN;

-- CreateTable
CREATE TABLE "MailRateLimit" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "attemptMs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MailRateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MailRateLimit_userId_key" ON "MailRateLimit"("userId");

COMMIT;