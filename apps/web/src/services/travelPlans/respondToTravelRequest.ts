/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export const respondToTravelRequest = async ({
  requestId,
  status,
}: {
  requestId: string;
  status: "APPROVED" | "REJECTED" | "PENDING";
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const result = await $fetch.patch<{
      success: boolean;
      message: string;
    }>(`/travel-plans/requests/${requestId}/respond`, {
      status,
    });
    return (
      result || {
        success: false,
        message: "No response received from server",
      }
    );
  } catch (error: any) {
    console.log("RESPOND_TO_TRAVEL_REQUEST_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to respond to travel request. Please try again.",
    };
  }
};
