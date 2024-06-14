import { setAxiosToken } from "@/app/_lib/auth";
import axiosInstance from "@/app/_lib/axios";

export async function PATCH(
  request: Request,
  { params }: { params: { sid: number; iid: number } }
) {
  setAxiosToken();

  const { sid, iid } = params;
  const requestData = await request.formData();
  requestData.append("section_id", sid.toString());

  try {
    const response = await axiosInstance.patch(
      `/user-image/${iid}/`,
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { sid: number; iid: number } }
) {
  setAxiosToken();

  const { sid, iid } = params;

  try {
    const response = await axiosInstance.delete(`/user-image/${iid}/`);

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
