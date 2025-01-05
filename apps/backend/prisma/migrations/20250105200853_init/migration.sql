BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userValidationId" UUID NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserValidations" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "token" UUID NOT NULL,
    "validatedAt" TIMESTAMP(3),

    CONSTRAINT "UserValidations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userValidationId_key" ON "Users"("userValidationId");

-- CreateIndex
CREATE UNIQUE INDEX "UserValidations_userId_key" ON "UserValidations"("userId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userValidationId_fkey" FOREIGN KEY ("userValidationId") REFERENCES "UserValidations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

COMMIT;