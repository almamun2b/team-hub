/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import {
  type CreateReviewPayload,
  type CreateReviewResponse,
} from "@/types/review";
import { revalidateTag } from "next/cache";

export const createReview = async (
  payload: CreateReviewPayload
): Promise<CreateReviewResponse> => {
  try {
    const result = await $fetch.post<CreateReviewResponse>("/reviews", payload);
    if (result?.success) {
      revalidateTag("to-review-plans", "");
    }
    return (
      result || {
        success: false,
        message: "No response received",
      }
    );
  } catch (error: any) {
    console.log("CREATE_REVIEW_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Review creation failed. Please try again.",
    };
  }
};
