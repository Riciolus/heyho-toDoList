import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  console.log(user);
  if (!user) {
    return NextResponse.json({ status: false, message: "Invalid email" });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ status: false, message: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.AUTH_SECRET as string,
    {
      expiresIn: "30d",
    }
  );

  return NextResponse.json({
    status: true,
    message: "Success! Welcome back.",
    token,
    user,
  });
}
