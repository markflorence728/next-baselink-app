import { setAxiosToken } from "@/app/_lib/auth";
import axiosInstance from "@/app/_lib/axios";

export async function PATCH(
  request: Request,
  { params }: { params: { sid: number; bid: number } }
) {
  setAxiosToken();

  const { sid, bid } = params;
  const requestData = await request.formData();
  requestData.append("section_id", sid.toString());

  try {
    const response = await axiosInstance.patch(
      `/user-button/${bid}/`,
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
  { params }: { params: { sid: number; bid: number } }
) {
  setAxiosToken();

  const { sid, bid } = params;

  try {
    const response = await axiosInstance.delete(`/user-button/${bid}/`);

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
