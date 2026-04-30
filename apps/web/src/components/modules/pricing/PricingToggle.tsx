"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PricingToggleProps {
  onBillingCycleChange: (cycle: "monthly" | "yearly") => void;
}

export default function PricingToggle({
  onBillingCycleChange,
}: PricingToggleProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const handleCycleChange = (cycle: "monthly" | "yearly") => {
    setBillingCycle(cycle);
    onBillingCycleChange(cycle);
  };

  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-md items-center justify-center rounded-lg bg-muted p-1">
          <button
            onClick={() => handleCycleChange("monthly")}
            className={`flex-1 rounded-md px-6 py-3 text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-background shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => handleCycleChange("yearly")}
            className={`flex-1 rounded-md px-6 py-3 text-sm font-medium transition-all ${
              billingCycle === "yearly"
                ? "bg-background shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly Billing
            <Badge variant="secondary" className="ml-2">
              Save 33%
            </Badge>
          </button>
        </div>
      </div>
    </section>
  );
}
