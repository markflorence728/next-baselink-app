import { setAxiosToken } from "@/app/_lib/auth";
import axiosInstance from "@/app/_lib/axios";

export async function PATCH(
  request: Request,
  { params }: { params: { pid: number } }
) {
  setAxiosToken();

  const pid = params.pid;
  const requestData = await request.json();

  try {
    const response = await axiosInstance.patch(
      `/user-social-platform/${pid}/`,
      requestData
    );

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { pid: number } }
) {
  setAxiosToken();

  const pid = params.pid;

  try {
    const response = await axiosInstance.delete(
      `/user-social-platform/${pid}/`
    );

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
