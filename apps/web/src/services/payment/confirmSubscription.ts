/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

export const confirmSubscription = async (payload: { sessionId: string }) => {
  try {
    const result = await $fetch.post<any>(
      "/payment/subscription/confirm",
      payload
    );
    if (result.success) {
      revalidateTag("subscription-plans", "");
      revalidateTag("subscription-status", "");
    }
    return result;
  } catch (error: any) {
    console.log("CONFIRM_SUBSCRIPTION_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Subscription confirmation failed. Please try again.",
    };
  }
};
