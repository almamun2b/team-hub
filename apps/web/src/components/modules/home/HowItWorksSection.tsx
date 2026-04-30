import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Plane, Search, UserCheck } from "lucide-react";

const howItWorks = [
  {
    step: 1,
    title: "Create Your Profile",
    description:
      "Share your travel interests, preferences, and upcoming trip plans.",
    icon: <UserCheck className="h-8 w-8" />,
  },
  {
    step: 2,
    title: "Find Travel Buddies",
    description:
      "Browse through verified travelers or use our smart matching system.",
    icon: <Search className="h-8 w-8" />,
  },
  {
    step: 3,
    title: "Connect & Plan",
    description:
      "Chat with potential buddies and plan your adventure together.",
    icon: <MessageSquare className="h-8 w-8" />,
  },
  {
    step: 4,
    title: "Travel & Share",
    description: "Embark on your journey and create unforgettable memories.",
    icon: <Plane className="h-8 w-8" />,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="pb-32 pt-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="title">
            How <span className="text-primary">Travel Buddy</span> Works
          </h2>
          <p className="mt-4 subtitle">
            Find your perfect travel companion in just 4 simple steps
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step) => (
            <div key={step.step} className="relative">
              <Card className="h-full border-0 bg-card shadow-3 hover:shadow-6 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
