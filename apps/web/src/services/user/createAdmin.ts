"use server";

import { $fetch } from "@/lib/fetch";

export interface CreateAdminData {
  email: string;
  fullName: string;
  contactNumber?: string;
  password: string;
}

export interface CreateAdminResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    createdAt: string;
  };
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export const createAdmin = async ({
  file,
  data,
}: {
  file: File | null;
  data: CreateAdminData;
}) => {
  try {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("data", JSON.stringify(data));

    const result = await $fetch.post<CreateAdminResponse>(
      "/user/create-admin",
      formData
    );

    return result;
  } catch (error: unknown) {
    console.log("CREATE_ADMIN_ERROR:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? errorMessage
          : "Admin creation failed. Please try again.",
    } as CreateAdminResponse;
  }
};
