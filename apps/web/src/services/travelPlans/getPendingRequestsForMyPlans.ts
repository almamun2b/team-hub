/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import type { PendingRequestsResponse } from "@/types/travelPlan";

export const getPendingRequestsForMyPlans =
  async (): Promise<PendingRequestsResponse> => {
    try {
      const result = await $fetch.get<PendingRequestsResponse>(
        "/travel-plans/requests/pending"
      );
      return (
        result || {
          success: false,
          message: "No response received from server",
          data: [],
        }
      );
    } catch (error: any) {
      console.log("GET_PENDING_REQUESTS_ERROR:", error);

      return {
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to fetch pending requests. Please try again.",
        data: [],
      };
    }
  };
