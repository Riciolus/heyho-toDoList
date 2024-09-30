import { PrismaClient } from "@/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const groupData = await prisma.groups.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    const filteredDynamicGroup = groupData.filter(
      (group) => group.id !== "tasks"
    );

    return NextResponse.json({ status: true, data: filteredDynamicGroup });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = params;
    const { name } = body;

    const newGroupData = await prisma.groups.create({
      data: {
        userId,
        name,
      },
    });

    return NextResponse.json({ status: true, data: newGroupData });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const id = userId;

    await prisma.groups.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
