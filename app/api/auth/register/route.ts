import prisma from "@/app/lib/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, name } = body;

  const existingUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json({ status: false, message: "User Already Exist" });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ status: true, message: "Account Created", user });
}
