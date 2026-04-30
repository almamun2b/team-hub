"use server";

import { $fetch } from "@/lib/fetch";
import {
  GetAllTravelersParams,
  PublicUserProfileResponse,
  TravelersResponse,
} from "@/types/user";

export const exploreTravelers = async (params: GetAllTravelersParams = {}) => {
  const res = await $fetch.get<TravelersResponse, GetAllTravelersParams>(
    `/user/explore/travelers`,
    {
      params,
    }
  );
  return res;
};

export async function getPublicProfile({ id }: { id: string }) {
  const res = await $fetch.get<PublicUserProfileResponse>(
    `/user/profile/${id}`
  );
  return res;
}
