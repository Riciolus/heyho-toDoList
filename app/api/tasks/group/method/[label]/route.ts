import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Edit spesific group name
export async function PATCH(
  req: NextRequest,
  { params }: { params: { label: string } }
) {
  try {
    const body = await req.json();
    const { label } = params;
    const { title } = body;

    const editData = await prisma.groups.update({
      where: {
        label,
      },
      data: {
        title,
      },
    });

    return NextResponse.json({ status: true, data: editData });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}

// Delete spesific group
export async function DELETE(
  req: NextRequest,
  { params }: { params: { label: string } }
) {
  try {
    const { label } = params;

    await prisma.groups.delete({
      where: {
        label,
      },
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
