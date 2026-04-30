/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import type { TravelRequestsResponse } from "@/types/travelPlan";

export const getMyTravelRequests =
  async (): Promise<TravelRequestsResponse> => {
    try {
      const result = await $fetch.get<TravelRequestsResponse>(
        "/travel-plans/requests/my"
      );
      return (
        result || {
          success: false,
          message: "No response received from server",
          data: [],
        }
      );
    } catch (error: any) {
      console.log("GET_MY_TRAVEL_REQUESTS_ERROR:", error);

      return {
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to fetch travel requests. Please try again.",
        data: [],
      };
    }
  };
