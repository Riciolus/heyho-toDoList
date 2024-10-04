/*
  Warnings:

  - The primary key for the `Groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Groups` table. All the data in the column will be lost.
  - The required column `label` was added to the `Groups` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `title` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_groupId_fkey";

-- AlterTable
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "Groups_pkey" PRIMARY KEY ("label");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("label") ON DELETE CASCADE ON UPDATE CASCADE;
