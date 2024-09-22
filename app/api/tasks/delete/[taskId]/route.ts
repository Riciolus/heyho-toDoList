import { PrismaClient } from "@/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

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
