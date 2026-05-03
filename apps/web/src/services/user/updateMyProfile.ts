/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

interface UpdateProfileData {
  fullName?: string;
}

export const updateMyProfile = async ({
  file,
  data,
}: {
  file: File | null;
  data: Partial<UpdateProfileData>;
}): Promise<any> => {
  try {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("data", JSON.stringify(data));

    const result = await $fetch.patch<any>("/users/update-me", formData);
    // if (result?.success) {
    //   revalidateTag("user");
    // }

    return result;
  } catch (error: any) {
    console.log("UPDATE_PROFILE_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Profile update failed. Please try again.",
    };
  }
};
