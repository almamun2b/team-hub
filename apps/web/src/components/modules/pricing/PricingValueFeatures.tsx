import { Award, Globe, Shield, Users } from "lucide-react";

interface Feature {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const valueFeatures: Feature[] = [
  {
    name: "Verified Community",
    icon: <Shield className="h-5 w-5" />,
    description: "All members are ID verified for safety",
  },
  {
    name: "Global Network",
    icon: <Globe className="h-5 w-5" />,
    description: "Connect with travelers in 85+ countries",
  },
  {
    name: "Smart Matching",
    icon: <Users className="h-5 w-5" />,
    description: "AI-powered compatibility matching",
  },
  {
    name: "Priority Support",
    icon: <Award className="h-5 w-5" />,
    description: "24/7 dedicated support team",
  },
];

export default function PricingValueFeatures() {
  return (
    <section className="py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Why Travelers Love Us
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            All plans include our core features designed for the best travel
            buddy experience
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {valueFeatures.map((feature) => (
            <div key={feature.name} className="text-center">
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                <div className="text-primary">{feature.icon}</div>
              </div>
              <h3 className="mb-2 font-semibold">{feature.name}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
