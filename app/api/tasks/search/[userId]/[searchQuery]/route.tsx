import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; searchQuery: string } }
) {
  try {
    const { userId, searchQuery } = params;

    const searchedData = await prisma.tasks.findMany({
      where: {
        userId,
        task: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json({ status: true, data: searchedData });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
