BEGIN;

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_userValidationId_fkey";

-- DropIndex
DROP INDEX "Users_userValidationId_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "userValidationId",
ADD COLUMN     "isThirdParty" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserValidations" ADD CONSTRAINT "UserValidations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;
