import prisma from "@/src/lib/db";
import { getUserIdFromCookie } from "@/src/lib/getIdServerside";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserIdFromCookie();
    const importantTasks = await prisma.tasks.findMany({
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
            important: true,
          },
        ],
      },
    });
    return NextResponse.json({ status: true, data: importantTasks });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
