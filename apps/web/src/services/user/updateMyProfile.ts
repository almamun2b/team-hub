/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

type User = {
  email: string;
  fullName: string;
  contactNumber?: string;
  currentLocation?: string;
  travelInterests?: string;
  bio?: string;
  gender?: "MALE" | "FEMALE";
  dateOfBirth?: string;
  visitedCountries?: string[];
};

export const updateMyProfile = async ({
  file,
  data,
}: {
  file: File | null;
  data: Partial<User>;
}): Promise<any> => {
  try {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("data", JSON.stringify(data));

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const result = await $fetch.patch<any>("/user/profile/update", formData);

    if (result.success) {
      revalidateTag("user", "");
    }

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
