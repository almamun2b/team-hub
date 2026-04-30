"use server";

import { $fetch } from "@/lib/fetch";
import { TopTravelersResponse } from "@/types/user";

export const getTopTravelers = async (): Promise<TopTravelersResponse> => {
  try {
    const result = await $fetch.get<TopTravelersResponse>(
      `/user/top-travelers`
    );

    if (!result) {
      throw new Error("Failed to fetch top travelers: No response received");
    }

    return result;
  } catch (error: unknown) {
    console.log("GET_TOP_TRAVELERS_ERROR:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch top travelers";
    throw new Error(errorMessage);
  }
};
