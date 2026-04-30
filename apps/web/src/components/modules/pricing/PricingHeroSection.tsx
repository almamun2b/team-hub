import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export default function PricingHeroSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-6">
            <TrendingUp className="mr-2 h-3 w-3" />
            Join 50,000+ Travelers
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Choose the perfect plan for your travel adventures. All plans
            include our core features to connect you with amazing travel
            buddies.
          </p>
        </div>
      </div>
    </section>
  );
}
