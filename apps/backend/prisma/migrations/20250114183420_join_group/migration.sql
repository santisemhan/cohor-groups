BEGIN;

-- CreateTable
CREATE TABLE "UserGroups" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "UserGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "groupCode" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGroups_userId_key" ON "UserGroups"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroups_groupId_key" ON "UserGroups"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_groupCode_key" ON "Group"("groupCode");

COMMIT;
