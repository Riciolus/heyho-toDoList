import { PrismaClient } from "@/prisma/generated/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get all tasks from all users
export async function GET() {
  try {
    const tasks = await prisma.tasks.findMany();

    return NextResponse.json({ status: true, data: tasks });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error,
    });
  }
}
