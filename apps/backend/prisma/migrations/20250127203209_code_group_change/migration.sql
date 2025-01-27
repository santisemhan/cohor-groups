/*
  Warnings:

  - You are about to drop the column `groupCode` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Group_groupCode_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "groupCode",
ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_code_key" ON "Group"("code");
