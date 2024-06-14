import axiosInstance from "@/app/_lib/axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestData = await request.json();
  const CookieStore = cookies();

  try {
    const response = await axiosInstance.post("/auth/jwt/create/", {
      ...requestData,
    });

    const { access, refresh } = response.data;
    CookieStore.set("accessToken", access, { maxAge: 60 * 60 * 8 });
    CookieStore.set("refreshToken", refresh, { maxAge: 60 * 60 * 24 * 7 });

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      { status: 400 },
    );
  }
}
