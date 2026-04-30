"use client";

import { SubscriptionStatus } from "@/types/payment";
import { useState } from "react";
import PricingCards from "./PricingCards";
import PricingToggle from "./PricingToggle";

interface Plan {
  plan: string;
  price: number;
  features: string[];
}

interface PricingInteractiveProps {
  plans: Plan[];
  currentSubscription?: SubscriptionStatus | null;
}

export default function PricingInteractive({
  plans,
  currentSubscription,
}: PricingInteractiveProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <>
      <PricingToggle onBillingCycleChange={setBillingCycle} />
      <PricingCards
        plans={plans}
        billingCycle={billingCycle}
        currentSubscription={currentSubscription}
      />
    </>
  );
}
