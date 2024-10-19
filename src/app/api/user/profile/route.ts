import prisma from "@/src/lib/db";
import { getUserIdFromCookie } from "@/src/lib/getIdServerside";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserIdFromCookie();

    const userData = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    });

    return NextResponse.json({ status: true, userData });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
