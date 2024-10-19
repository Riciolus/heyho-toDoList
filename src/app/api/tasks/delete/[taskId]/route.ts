import prisma from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;

    await prisma.tasks.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json({
      status: true,
      message: "Data successfuly deleted",
    });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
