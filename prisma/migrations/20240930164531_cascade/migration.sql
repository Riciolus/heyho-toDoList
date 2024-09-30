-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
