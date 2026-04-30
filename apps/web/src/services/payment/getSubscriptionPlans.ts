"use server";

import { $fetch } from "@/lib/fetch";
import { SubscriptionPlansResponse } from "@/types/payment";

export const getSubscriptionPlans = async () => {
  const result = await $fetch.get<SubscriptionPlansResponse>(`/payment/plans`, {
    cache: "force-cache",
    next: {
      tags: ["subscription-plans"],
    },
  });

  return result;
};
