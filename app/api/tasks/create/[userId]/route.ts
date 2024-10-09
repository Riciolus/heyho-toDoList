import { PrismaClient } from "@/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = params;
    const { task, groupId, important, due_date } = body;

    const createdTasks = await prisma.tasks.create({
      data: {
        userId,
        task,
        groupId,
        important,
        due_date,
      },
      include: {
        groups: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ status: true, data: createdTasks });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error,
    });
  }
}
