import { redirect } from "next/navigation";
import axiosInstance from "./axios";
import { SocialPlatform, Section, User } from "./types/user";
import { setAxiosToken } from "./auth";

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

export async function getUserSocialPlatformsData(): Promise<{
  success: boolean;
  data?: SocialPlatform[];
  message?: string;
}> {
  setAxiosToken();
  try {
    const response = await axiosInstance.get(`/user-social-platform/`);
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

export async function getUserSectionsData(): Promise<{
  success: boolean;
  data?: Section[];
  message?: string;
}> {
  setAxiosToken();
  try {
    const response = await axiosInstance.get(`/user-section/`);
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

export async function getUserSectionData(id: number): Promise<{
  success: boolean;
  data?: Section;
  message?: string;
}> {
  setAxiosToken();
  try {
    const response = await axiosInstance.get(`/user-section/${id}/`);
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
