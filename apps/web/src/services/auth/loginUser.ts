"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { $fetch } from "@/lib/fetch";
import { AuthResponse } from "@/types/travelPlan";

export interface ParsedCookie {
  [key: string]: string | undefined;
}

export const loginUser = async (data: any) => {
  const result = await $fetch.post<AuthResponse>("/auth/login", {
    email: data?.email,
    password: data?.password,
  });

  if (!result?.success) {
    return {
      success: false,
      message: result?.message || "Login failed",
      error: (result as any)?.error,
    };
  }

  return { success: true, message: result.message };
};
