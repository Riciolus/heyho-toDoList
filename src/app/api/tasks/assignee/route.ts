import prisma from "@/src/lib/db";
import { getUserIdFromCookie } from "@/src/lib/getIdServerside";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserIdFromCookie();

    const tasksByAssigment = await prisma.tasks.findMany({
      select: {
        id: true,
        task: true,
        completed: true,
        important: true,
        due_date: true,
        groupId: true,
        creatorId: true,
        assigneeId: true,
      },
      where: {
        OR: [
          {
            groupId: "tasks",
            assigneeId: userId,
          },
          {
            groupId: "tasks",
            creatorId: userId,
            assigneeId: { not: null },
          },
        ],
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ status: true, data: tasksByAssigment, userId });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error,
    });
  }
}
