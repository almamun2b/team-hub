/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

interface UpdateTravelPlanData {
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget?: number;
  travelType: string;
  maxMembers?: number;
  activities: string[];
}

interface UpdateTravelPlanResponse {
  success: boolean;
  message: string;
  data?: any;
}
export const updateTravelPlans = async ({
  id,
  images,
  data,
}: {
  id: string;
  images?: File[];
  data: UpdateTravelPlanData;
}): Promise<UpdateTravelPlanResponse> => {
  try {
    const formData = new FormData();

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    formData.append("data", JSON.stringify(data));

    const result = await $fetch.patch<UpdateTravelPlanResponse>(
      `/travel-plans/${id}`,
      formData
    );

    if (result?.success) {
      revalidateTag("travel-plans", "");
    }

    return (
      result ||
      ({
        success: false,
        message: "Travel plan update failed. Please try again.",
      } as UpdateTravelPlanResponse)
    );
  } catch (error: any) {
    console.log("UPDATE_TRAVEL_PLANS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Travel plan update failed. Please try again.",
    } as UpdateTravelPlanResponse;
  }
};
