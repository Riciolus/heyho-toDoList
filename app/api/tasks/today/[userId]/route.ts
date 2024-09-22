import { PrismaClient } from "@/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const currentDate = new Date().toISOString().substring(0, 10);

  const todayTasks = await prisma.tasks.findMany({
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
        },
        {
          created_at: {
            gte: new Date(`${currentDate} 00:00:00`),
            lte: new Date(`${currentDate} 23:59:59`),
          },
        },
      ],
    },
  });
  return NextResponse.json({ status: true, data: todayTasks });
}
