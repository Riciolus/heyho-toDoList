import prisma from "@/src/lib/db";
import { getUserIdFromCookie } from "@/src/lib/getIdServerside";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserIdFromCookie();
    const currentDate = new Date().toISOString().substring(0, 10);
    const todayTasks = await prisma.tasks.findMany({
      select: {
        id: true,
        task: true,
        completed: true,
        important: true,
        created_at: true,
        groups: {
          select: {
            title: true,
          },
        },
      },
      where: {
        AND: [
          {
            userId,
          },
          {
            due_date: {
              gte: new Date(`${currentDate} 00:00:00`),
              lte: new Date(`${currentDate} 23:59:59`),
            },
          },
        ],
      },
    });
    return NextResponse.json({ status: true, data: todayTasks });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
