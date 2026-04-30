/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { type DeleteReviewResponse } from "@/types/review";
import { revalidateTag } from "next/cache";

export async function deleteReview({
  id,
}: {
  id: string;
}): Promise<DeleteReviewResponse> {
  try {
    const data = await $fetch.delete<DeleteReviewResponse>(`/reviews/${id}`);

    if (data?.success) {
      revalidateTag("given-reviews", "layout");
    }

    return (
      data || {
        success: false,
        message: "No response received",
      }
    );
  } catch (error: any) {
    console.log("DELETE_REVIEW_ERROR:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete review. Please try again.",
    };
  }
}
