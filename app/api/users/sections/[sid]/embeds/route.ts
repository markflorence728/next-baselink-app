import { setAxiosToken } from "@/app/_lib/auth";
import axiosInstance from "@/app/_lib/axios";

export async function POST(
  request: Request,
  { params }: { params: { sid: number } }
) {
  setAxiosToken();

  const requestData = await request.json();
  try {
    const response = await axiosInstance.post(`/user-embed/`, {
      ...requestData,
      section_id: params.sid,
    });
    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
