/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createCheckoutSession } from "@/services/payment/createCheckoutSession";
import { SubscriptionStatus } from "@/types/payment";
import { Check, Crown, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Plan {
  plan: string;
  price: number;
  features: string[];
}

interface PricingCardsProps {
  plans: Plan[];
  billingCycle: "monthly" | "yearly";
  currentSubscription?: SubscriptionStatus | null;
}

export default function PricingCards({
  plans,
  billingCycle,
  currentSubscription,
}: PricingCardsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (planType: string) => {
    if (planType.toLowerCase() === "free") {
      router.push("/subscription");
      return;
    }

    try {
      setIsLoading(true);

      const res = await createCheckoutSession({
        plan: planType.toUpperCase() as any,
      });

      if (res.success && res.data?.url) {
        window.location.href = res.data.url;
      } else {
        console.warn("Subscription error:", res.message);
        toast.error(
          res?.message || "Failed to initiate subscription. Please try again."
        );
      }
    } catch (error: any) {
      toast.error("Failed to initiate subscription. Please try again.");
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentPlan = (planType: string) => {
    return currentSubscription?.plan?.toUpperCase() === planType.toUpperCase();
  };

  const freePlan = plans.find((p) => p.plan === "FREE");
  const monthlyPlan = plans.find((p) => p.plan === "MONTHLY");
  const yearlyPlan = plans.find((p) => p.plan === "YEARLY");

  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {/* Free Plan */}
          {freePlan && (
            <Card className="flex flex-col border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{freePlan.plan}</span>
                  <Badge variant="outline">Popular</Badge>
                </CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${freePlan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {freePlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrentPlan("free") ? (
                  <Button disabled variant="outline" className="w-full">
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSubscribe("free")}
                  >
                    Get Started Free {isLoading ? "..." : ""}
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}

          {/* Monthly Plan */}
          {monthlyPlan && (
            <Card className="relative flex flex-col border-2 border-primary shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="gap-2 bg-primary px-4 py-1">
                  <Zap className="h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{monthlyPlan.plan}</span>
                  <Crown className="h-5 w-5 text-yellow-500" />
                </CardTitle>
                <CardDescription>Best for regular travelers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${monthlyPlan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {monthlyPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrentPlan("monthly") ? (
                  <Button disabled variant="secondary" className="w-full">
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    disabled={isLoading}
                    variant="default"
                    className="w-full"
                    onClick={() => handleSubscribe("monthly")}
                  >
                    Get Monthly Plan {isLoading ? "..." : ""}
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}

          {/* Yearly Plan */}
          {yearlyPlan && (
            <Card className="relative flex flex-col border-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="secondary" className="gap-2 px-4 py-1">
                  <Star className="h-3 w-3" />
                  Best Value
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{yearlyPlan.plan}</span>
                </CardTitle>
                <CardDescription>
                  Perfect for frequent travelers
                </CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      ${yearlyPlan.price}
                    </span>
                    <span className="text-muted-foreground">/year</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="line-through">
                      $
                      {monthlyPlan
                        ? (monthlyPlan.price * 12).toFixed(2)
                        : "119.88"}
                    </span>{" "}
                    <span className="text-green-600">Save 33%</span>
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {yearlyPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrentPlan("yearly") ? (
                  <Button disabled variant="outline" className="w-full">
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSubscribe("monthly")}
                  >
                    Get Yearly Plan {isLoading ? "..." : ""}
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
