import { PrismaClient } from "@/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const importantTasks = await prisma.tasks.findMany({
      select: {
        id: true,
        task: true,
        completed: true,
        important: true,
        created_at: true,
        groupId: true,
      },
      where: {
        AND: [
          {
            userId,
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    const { toImportantStatus } = await req.json();

    const changedImportantStatus = await prisma.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        important: toImportantStatus,
      },
      select: {
        important: true,
      },
    });

    return NextResponse.json({ status: true, data: changedImportantStatus });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
