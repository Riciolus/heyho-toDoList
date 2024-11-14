import prisma from "@/src/lib/db";
import { getUserIdFromCookie } from "@/src/lib/getIdServerside";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserIdFromCookie();

    const userData = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        avatar: true,
      },
    });

    return NextResponse.json({ status: true, userData });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = await getUserIdFromCookie();
    const { avatar, email, name } = await req.json();

    const changeUserData = await prisma.users.update({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        avatar: true,
      },
      data: {
        avatar,
        name,
        email,
      },
    });

    return NextResponse.json({ status: true, data: changeUserData });
  } catch (error) {
    return NextResponse.json({ status: false, error }, { status: 401 });
  }
}
