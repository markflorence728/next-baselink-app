import { setAxiosToken } from "@/app/_lib/auth";
import axiosInstance from "@/app/_lib/axios";

export async function PATCH(
  request: Request,
  { params }: { params: { sid: number } }
) {
  setAxiosToken();

  const sid = params.sid;
  const requestData = await request.json();

  try {
    const response = await axiosInstance.patch(
      `/user-section/${sid}/`,
      requestData
    );

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { sid: number } }
) {
  setAxiosToken();

  const sid = params.sid;

  try {
    const response = await axiosInstance.delete(
      `/user-section/${sid}/`
    );

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
