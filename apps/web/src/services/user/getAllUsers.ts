/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

interface GetAllUsersParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  role?: string;
  status?: string;
  gender?: string;
  isVerified?: boolean;
  hasVerifiedBadge?: boolean;
  travelInterest?: string[];
  currentLocation?: string;
}

export const getAllUsers = async (params: GetAllUsersParams = {}) => {
  try {
    // Convert boolean parameters to strings "true"/"false" for API compatibility
    const processedParams: Record<string, any> = { ...params };

    // Convert boolean values to strings that API expects
    if (typeof processedParams.isVerified === "boolean") {
      processedParams.isVerified = processedParams.isVerified
        ? "true"
        : "false";
    }
    if (typeof processedParams.hasVerifiedBadge === "boolean") {
      processedParams.hasVerifiedBadge = processedParams.hasVerifiedBadge
        ? "true"
        : "false";
    }

    console.log(processedParams, "processedParams");

    const result = await $fetch.get<any, GetAllUsersParams>(`/user`, {
      params: processedParams,
    });

    return result;
  } catch (error: any) {
    console.log("GET_ALL_USERS_ERROR:", error);
    throw new Error(error?.message || "Failed to fetch users");
  }
};
