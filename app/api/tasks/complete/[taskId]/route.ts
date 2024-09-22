import { PrismaClient } from "@/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    const { toCompletedStatus } = await req.json();

    const changedCompletedStatus = await prisma.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        completed: toCompletedStatus,
      },
      select: {
        completed: true,
      },
    });

    return NextResponse.json({ status: true, data: changedCompletedStatus });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
