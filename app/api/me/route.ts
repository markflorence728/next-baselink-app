import { setAxiosToken } from "@/app/_lib/auth";
import axiosInstance from "@/app/_lib/axios";

export async function GET(request: Request) {
  setAxiosToken();
  try {
    const response = await axiosInstance.get("/auth/users/me/");
    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      { status: 400 },
    );
  }
}
