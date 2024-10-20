/*
  Warnings:

  - You are about to drop the column `userId` on the `Groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_userId_fkey";

-- AlterTable
ALTER TABLE "Groups" DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT;

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "assigneeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
