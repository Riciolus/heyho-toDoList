import prisma from "@/src/lib/db";
import { getUserIdFromCookie } from "@/src/lib/getIdServerside";
import { NextRequest, NextResponse } from "next/server";

// Get all group from spesific user
export async function GET() {
  try {
    const userId = await getUserIdFromCookie();
    const groupData = await prisma.groups.findMany({
      where: {
        userId,
      },
      select: {
        label: true,
        title: true,
        icon: true,
      },
    });

    const filteredDynamicGroup = groupData.filter(
      (group) => group.label !== "tasks" && group.label !== "assignment"
    );

    return NextResponse.json({ status: true, data: filteredDynamicGroup });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}

// Add new group
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = await getUserIdFromCookie();
    const { title } = body;

    const newGroupData = await prisma.groups.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json({ status: true, data: newGroupData });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
