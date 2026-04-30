/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
export const createCheckoutSession = async (data: any): Promise<any> => {
  try {
    const result = await $fetch.post<any>(
      "/payment/create-checkout-session",
      data
    );
    return result;
  } catch (error: any) {
    console.log("CREATE_CHECKOUT_SESSION_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Checkout session creation failed. Please try again.",
    };
  }
};
