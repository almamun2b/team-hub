/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { type GetToReviewPlansResponse } from "@/types/review";

export const getToReviewPlans = async (): Promise<GetToReviewPlansResponse> => {
  try {
    const result = await $fetch.get<GetToReviewPlansResponse>(
      "/reviews/to-review-plans",
      {
        next: {
          tags: ["to-review-plans"],
        },
      }
    );

    return (
      result || {
        success: false,
        message: "No response received",
        data: [],
      }
    );
  } catch (error: any) {
    console.log("GET_TO_REVIEW_PLANS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch plans to review. Please try again.",
      data: [],
    };
  }
};
