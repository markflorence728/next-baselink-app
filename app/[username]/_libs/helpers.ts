import axiosInstance from "@/app/_lib/axios";
import { User } from "@/app/_lib/types/user";
import { redirect } from "next/navigation";

export async function getUserData(
  username: string
): Promise<{ success: boolean; data?: User; message?: string }> {
  try {
    const response = await axiosInstance.get(`/user/${username}/`);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          redirect("/login");
        case 404:
          return { success: false, message: "Invalid url..." };
      }
    }

    return { success: false, message: "Something went wrong..." };
  }
}
