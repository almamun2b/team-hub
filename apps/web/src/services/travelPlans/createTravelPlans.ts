/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

interface CreateTravelPlanData {
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

interface CreateTravelPlanResponse {
  success: boolean;
  message: string;
  data?: any;
}
export const createTravelPlans = async ({
  images,
  data,
}: {
  images: File[];
  data: CreateTravelPlanData;
}): Promise<CreateTravelPlanResponse> => {
  try {
    console.log(images, data, "images, data");
    const formData = new FormData();

    images.forEach((image) => {
      formData.append(`images`, image);
    });

    formData.append("data", JSON.stringify(data));

    const result = await $fetch.post<CreateTravelPlanResponse>(
      "/travel-plans",
      formData
    );

    console.log(result, "result");

    if (result?.success) {
      revalidateTag("travel-plans", "");
    }

    return (
      result ||
      ({
        success: false,
        message: "Travel plan creation failed. Please try again.",
      } as CreateTravelPlanResponse)
    );
  } catch (error: any) {
    console.log("CREATE_TRAVEL_PLANS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Travel plan creation failed. Please try again.",
    } as CreateTravelPlanResponse;
  }
};
