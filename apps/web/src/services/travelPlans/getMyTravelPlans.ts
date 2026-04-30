/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import type { TravelPlansResponse } from "@/types/travelPlan";

interface MyTravelPlansParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const getMyTravelPlans = async (
  params: MyTravelPlansParams = {}
): Promise<TravelPlansResponse> => {
  try {
    const {
      limit = 20,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params;

    const result = await $fetch.get<TravelPlansResponse, MyTravelPlansParams>(
      "/travel-plans/my/plans",
      {
        params: {
          limit,
          page,
          sortBy,
          sortOrder,
        },
      }
    );

    return (
      result || {
        success: false,
        message: "Failed to fetch travel plans",
        meta: { page: 1, limit: 20, total: 0 },
        data: [],
      }
    );
  } catch (error: any) {
    console.log("GET_MY_TRAVEL_PLANS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch travel plans. Please try again.",
      meta: { page: 1, limit: 20, total: 0 },
      data: [],
    } as TravelPlansResponse;
  }
};
