"use server";

import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserIdFromCookie() {
  const token = cookies().get("authToken")?.value;
  const decoded = verify(
    token as string,
    process.env.AUTH_SECRET as string
  ) as JwtPayload;

  return decoded.userId;
}
