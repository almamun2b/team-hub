"use server";

import { $fetch } from "@/lib/fetch";
import { SubscriptionStatusResponse } from "@/types/payment";

export const getSubscriptionStatus =
  async (): Promise<SubscriptionStatusResponse> => {
    try {
      const result = await $fetch.get<SubscriptionStatusResponse>(
        "/payment/subscription/status",
        {
          cache: "force-cache",
          next: {
            tags: ["subscription-status"],
          },
        }
      );
      return (
        result || {
          success: false,
          message: "Failed to fetch subscription status. Please try again.",
          data: {
            hasSubscription: false,
            plan: null,
            status: null,
            startDate: null,
            endDate: null,
            features: [],
          },
        }
      );
    } catch (error: unknown) {
      console.log("GET_SUBSCRIPTION_STATUS_ERROR:", error);

      return {
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : "Failed to fetch subscription status. Please try again.",
        data: {
          hasSubscription: false,
          plan: null,
          status: null,
          startDate: null,
          endDate: null,
          features: [],
        },
      };
    }
  };
