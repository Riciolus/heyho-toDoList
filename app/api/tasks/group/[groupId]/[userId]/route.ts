import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; groupId: string } }
) {
  try {
    const { userId, groupId } = params;
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
            userId,
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
