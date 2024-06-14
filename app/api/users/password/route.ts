import { setAxiosToken } from "@/app/_lib/auth";
import axiosInstance from "@/app/_lib/axios";

export async function POST(request: Request) {
  setAxiosToken();

  const requestData = await request.json();
  try {
    const response = await axiosInstance.post(`/user-password/`, requestData);
    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error.message, data: error.response.data },
      { status: 400 }
    );
  }
}
