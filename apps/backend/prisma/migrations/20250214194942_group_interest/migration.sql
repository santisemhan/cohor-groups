-- CreateTable
CREATE TABLE "GroupInterest" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" UUID NOT NULL,
    "interestId" UUID NOT NULL,

    CONSTRAINT "GroupInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "unicode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupInterest_code_key" ON "GroupInterest"("code");

-- AddForeignKey
ALTER TABLE "GroupInterest" ADD CONSTRAINT "GroupInterest_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupInterest" ADD CONSTRAINT "GroupInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
