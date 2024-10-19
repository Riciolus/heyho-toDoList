import prisma from "@/src/lib/db";
import { getUserIdFromCookie } from "@/src/lib/getIdServerside";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = await getUserIdFromCookie();
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
