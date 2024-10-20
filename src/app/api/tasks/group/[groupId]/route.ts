import prisma from "@/src/lib/db";
import { getUserIdFromCookie } from "@/src/lib/getIdServerside";
import { NextRequest, NextResponse } from "next/server";

// get all tasks from spesific group (id)
export async function GET(
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const userId = await getUserIdFromCookie();
    const { groupId } = params;
    const tasksByGroup = await prisma.tasks.findMany({
      select: {
        id: true,
        task: true,
        completed: true,
        important: true,
        due_date: true,
        groupId: true,
      },
      where: {
        AND: [
          {
            creatorId: userId,
          },
          {
            groupId,
          },
        ],
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json({ status: true, data: tasksByGroup });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error,
    });
  }
}
