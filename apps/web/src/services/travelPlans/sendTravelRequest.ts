/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

interface TravelPlan {
  travelPlanId: string;
  message: string;
}
export const sendTravelRequest = async (payload: TravelPlan): Promise<any> => {
  try {
    const result = await $fetch.post<any>("/travel-plans/requests/send", payload);
    return result;
  } catch (error: any) {
    console.log("SEND_TRAVEL_REQUEST_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Travel request failed. Please try again.",
    };
  }
};
