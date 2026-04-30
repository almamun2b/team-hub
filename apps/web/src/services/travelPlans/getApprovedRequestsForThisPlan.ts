/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import type { ApprovedRequestsResponse } from "@/types/travelPlan";

export const getApprovedRequestsForThisPlan = async ({
  travelPlanId,
}: {
  travelPlanId: string;
}): Promise<ApprovedRequestsResponse> => {
  try {
    const result = await $fetch.get<ApprovedRequestsResponse>(
      `/travel-plans/requests/approved/${travelPlanId}`
    );
    return (
      result || {
        success: false,
        message: "No response received from server",
        data: [],
      }
    );
  } catch (error: any) {
    console.log("GET_APPROVED_REQUESTS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch approved requests. Please try again.",
      data: [],
    };
  }
};
