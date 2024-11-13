import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function middleware(request: NextRequest) {
  const cookie = cookies();
  const token = cookie.get("authToken")?.value;

  const isApiRoute = request.nextUrl.pathname.startsWith("/api");

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json(
        { status: false, message: "Unauthorized" },
        { status: 401 }
      );
    } else {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  try {
    await jwtVerify(token, secretKey);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/api/tasks/:path*", "/api/user/:path*"],
};
