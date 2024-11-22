import prisma from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const body = await req.json();
    const { taskId } = params;
    const { task, due_date, groupId } = body;

    await prisma.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        task,
        due_date,
        groupId,
      },
    });

    return NextResponse.json({
      status: true,
      message: "Data successfuly updated.",
    });
  } catch (error) {
    return NextResponse.json({ status: false, error }, { status: 400 });
  }
}
