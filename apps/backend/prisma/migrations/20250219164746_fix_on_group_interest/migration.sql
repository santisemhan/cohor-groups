/*
  Warnings:

  - You are about to drop the column `code` on the `GroupInterest` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `GroupInterest` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "GroupInterest_code_key";

-- AlterTable
ALTER TABLE "GroupInterest" DROP COLUMN "code",
DROP COLUMN "name";
