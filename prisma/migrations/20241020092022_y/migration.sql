/*
  Warnings:

  - You are about to drop the column `userId` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `assigneeId` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_userId_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "userId",
ADD COLUMN     "assigneeId" TEXT NOT NULL,
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
