import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookie = cookies();

  cookie.set({
    name: "authToken",
    value: "",
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({ status: true });
}
