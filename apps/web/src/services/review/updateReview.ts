/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import {
  type UpdateReviewPayload,
  type UpdateReviewResponse,
} from "@/types/review";
import { revalidateTag } from "next/cache";

export const updateReview = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateReviewPayload;
}): Promise<UpdateReviewResponse> => {
  try {
    const result = await $fetch.patch<UpdateReviewResponse>(
      `/reviews/${id}`,
      payload
    );

    console.log(result, "result");

    if (result?.success) {
      revalidateTag("given-reviews", "");
    }

    return (
      result || {
        success: false,
        message: "No response received",
      }
    );
  } catch (error: any) {
    console.log("UPDATE_REVIEW_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Review update failed. Please try again.",
    };
  }
};
