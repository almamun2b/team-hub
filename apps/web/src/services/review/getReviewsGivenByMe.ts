/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import {
  type GetMyReviewsParams,
  type GetMyReviewsResponse,
} from "@/types/review";

export const getReviewsGivenByMe = async (
  params: GetMyReviewsParams = {}
): Promise<GetMyReviewsResponse> => {
  try {
    const {
      limit = 20,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params;

    const result = await $fetch.get<GetMyReviewsResponse>("/reviews/given", {
      next: {
        tags: ["given-reviews"],
      },
      params: {
        limit,
        page,
        sortBy,
        sortOrder,
      },
    });

    return (
      result || {
        success: false,
        message: "No response received",
        meta: {
          page: 1,
          limit: 20,
          total: 0,
        },
        data: [],
      }
    );
  } catch (error: any) {
    console.log("GET_REVIEWS_GIVEN_BY_ME_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch reviews. Please try again.",
      meta: {
        page: 1,
        limit: 20,
        total: 0,
      },
      data: [],
    };
  }
};
