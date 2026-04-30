/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export const getReviewById = async ({ id }: { id: string }): Promise<any> => {
  try {
    const result = await $fetch.get<any>(`/reviews/user/${id}?limit=2000`);
    return result;
  } catch (error: any) {
    console.log("GET_REVIEW_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Review update failed. Please try again.",
    };
  }
};
