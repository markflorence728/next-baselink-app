import { setAxiosToken } from "@/app/_lib/auth";
import axiosInstance from "@/app/_lib/axios";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  setAxiosToken();

  const id = params.id;
  try {
    const response = await axiosInstance.get(`/users/${id}/`);
    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  setAxiosToken();

  const id = params.id;
  const requestData = await request.formData();

  try {
    const response = await axiosInstance.patch(`/users/${id}/`, requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
