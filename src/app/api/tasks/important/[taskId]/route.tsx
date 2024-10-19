import prisma from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
