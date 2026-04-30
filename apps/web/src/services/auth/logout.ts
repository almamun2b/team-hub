/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { deleteCookie } from "./tokenHandlers";

export async function logoutUser() {
  try {
    const result = await $fetch.post<any>("/auth/logout");
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    return result;
  } catch (error: any) {
    console.log("LOGOUT_ERROR:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Logout failed. Please try again.",
    };
  }
}
