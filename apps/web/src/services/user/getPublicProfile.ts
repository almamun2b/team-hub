/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export async function getPublicProfile({ id }: { id: string }) {
  try {
    const result = await $fetch.get<any>(`/user/profile/${id}`);
    return result;
  } catch (error: any) {
    console.log("GET_PUBLIC_PROFILE_ERROR:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch public profile. Please try again.",
    };
  }
}
