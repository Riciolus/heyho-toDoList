import prisma from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;
  const cookie = cookies();

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      status: false,
      message:
        "Account not found. Please check your credentials or sign up for a new account.",
    });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({
      status: false,
      message: "Password does not match!",
    });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.AUTH_SECRET as string,
    {
      expiresIn: "30d",
    }
  );

  cookie.set({
    httpOnly: true,
    name: "authToken",
    value: token,
    secure: process.env.AUTH_SECRET === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 10,
  });

  return NextResponse.json({
    status: true,
    message: `Login successful! Welcome ${user.name}.`,
    token,
  });
}
