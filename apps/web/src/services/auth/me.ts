"use server";

import { $fetch } from "@/lib/fetch";
import { MeResponse } from "@/types/auth";

export async function me() {
  try {
    return await $fetch.get<MeResponse>("/auth/me", {
      cache: "force-cache",
      next: {
        tags: ["user"],
      },
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}
