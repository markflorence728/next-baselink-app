import { setAxiosToken } from "@/app/_lib/auth";
import axiosInstance from "@/app/_lib/axios";

export async function PATCH(
  request: Request,
  { params }: { params: { sid: number; eid: number } }
) {
  setAxiosToken();

  const { sid, eid } = params;
  const requestData = await request.json();

  try {
    const response = await axiosInstance.patch(`/user-embed/${eid}/`, {
      ...requestData,
      section_id: sid,
    });

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { sid: number; eid: number } }
) {
  setAxiosToken();

  const { sid, eid } = params;

  try {
    const response = await axiosInstance.delete(`/user-embed/${eid}/`);

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
