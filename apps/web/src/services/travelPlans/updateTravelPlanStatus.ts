"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

interface UpdateTravelPlanStatusResponse {
  success: boolean;
  message?: string;
}

export async function updateTravelPlanStatus({
  id,
  payload,
}: {
  id: string;
  payload: {
    status: "OPEN" | "CLOSED" | "FULL" | "CANCELLED" | "COMPLETED";
  };
}): Promise<UpdateTravelPlanStatusResponse> {
  try {
    const data = await $fetch.patch<UpdateTravelPlanStatusResponse>(
      `/travel-plans/${id}/status`,
      payload
    );

    if (data?.success) {
      revalidateTag("travel-plans", "");
    }

    return (
      data || {
        success: false,
        message: "Failed to update travel plan status",
      }
    );
  } catch (err: unknown) {
    console.log("UPDATE_TRAVEL_PLAN_STATUS_ERROR:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
