"use server";

import { $fetch } from "@/lib/fetch";
import {
  TravelPlanSearchParams,
  TravelPlansResponse,
} from "@/types/travelPlan";

export const matchTravelPlans = async (params: TravelPlanSearchParams = {}) => {
  const result = await $fetch.get<TravelPlansResponse, TravelPlanSearchParams>(
    `/travel-plans/match`,
    {
      params,
    }
  );

  return result;
};
