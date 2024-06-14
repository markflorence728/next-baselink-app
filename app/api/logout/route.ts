import { cookies } from "next/headers";

export async function GET() {
  const CookieStore = cookies();
  CookieStore.delete("accessToken");
  CookieStore.delete("refreshToken");
  return Response.json({ success: true });
}
