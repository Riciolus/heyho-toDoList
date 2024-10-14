import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const isLoggin = true;

  if (!isLoggin) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
