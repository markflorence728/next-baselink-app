import { cookies } from "next/headers";
import axiosInstance, { setAuthToken } from "./axios";
import { redirect } from "next/navigation";
import { User } from "./types/user";

export function setAxiosToken() {
  const CookieStore = cookies();
  const token = CookieStore.get("accessToken")?.value || "";
  setAuthToken(token);
}

export async function validateToken(): Promise<User> {
  setAxiosToken();
  try {
    const response = await axiosInstance.get("/auth/users/me/");
    return response.data;
  } catch (error: any) {
    redirect("/login");
  }
}
