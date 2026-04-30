import PricingFAQ from "@/components/modules/pricing/PricingFAQ";
import PricingHeroSection from "@/components/modules/pricing/PricingHeroSection";
import PricingInteractive from "@/components/modules/pricing/PricingInteractive";
import PricingTrustBadges from "@/components/modules/pricing/PricingTrustBadges";
import PricingValueFeatures from "@/components/modules/pricing/PricingValueFeatures";
import { getSubscriptionPlans } from "@/services/payment/getSubscriptionPlans";
import { getSubscriptionStatus } from "@/services/payment/getSubscriptionStatus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Travel Buddy",
  description:
    "Explore Travel Buddy's subscription plans and pricing options. Find the perfect plan for your travel companion matching needs.",
};

const PricingPageComponent = async () => {
  const [plansResult, subscriptionResult] = await Promise.all([
    getSubscriptionPlans(),
    getSubscriptionStatus(),
  ]);

  if (!plansResult) return;

  if (!plansResult.success) {
    return (
      <div className="container px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="mt-4 text-muted-foreground">
          Unable to load pricing plans. Please try again later.
        </p>
      </div>
    );
  }

  const subscriptionPlans = plansResult.data;
  const currentSubscription = subscriptionResult.success
    ? subscriptionResult.data
    : null;

  return (
    <div className="min-h-screen bg-background">
      <PricingHeroSection />
      <PricingInteractive
        plans={subscriptionPlans}
        currentSubscription={currentSubscription}
      />
      <PricingValueFeatures />
      <PricingFAQ />
      <PricingTrustBadges />
    </div>
  );
};

export default PricingPageComponent;
