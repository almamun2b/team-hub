"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

interface DeleteTravelPlanResponse {
  success: boolean;
  message?: string;
}

export async function deleteTravelPlan({
  id,
}: {
  id: string;
}): Promise<DeleteTravelPlanResponse> {
  try {
    const data = await $fetch.delete<DeleteTravelPlanResponse>(
      `/travel-plans/${id}`
    );

    if (data?.success) {
      revalidateTag("travel-plans", "");
    }

    return (
      data || {
        success: false,
        message: "Failed to delete travel plan",
      }
    );
  } catch (err: unknown) {
    console.log("DELETE_TRAVEL_PLAN_ERROR:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
