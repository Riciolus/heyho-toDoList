/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Groups` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Groups_name_key";

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT 'system-user';

-- CreateIndex
CREATE UNIQUE INDEX "Groups_userId_name_key" ON "Groups"("userId", "name");

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
