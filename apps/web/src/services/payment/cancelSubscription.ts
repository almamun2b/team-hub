"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

export interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
}

export const cancelSubscription = async () => {
  try {
    const result = await $fetch.post<CancelSubscriptionResponse>(
      "/payment/subscription/cancel"
    );
    if (result?.success) {
      revalidateTag("subscription-plans", "");
      revalidateTag("subscription-status", "");
    }
    return result;
  } catch (error: unknown) {
    console.log("CANCEL_SUBSCRIPTION_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Unknown error"
          : "Subscription cancellation failed. Please try again.",
    };
  }
};
