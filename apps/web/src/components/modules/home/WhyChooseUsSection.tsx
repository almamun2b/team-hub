import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Globe, Shield, Star, TrendingUp, Users } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All users are verified for your safety and peace of mind",
    },
    {
      icon: Users,
      title: "Smart Matching",
      description: "AI-powered algorithm matches you with compatible travelers",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with travelers from over 150 countries worldwide",
    },
    {
      icon: Calendar,
      title: "Flexible Planning",
      description: "Plan trips on your schedule with easy-to-use tools",
    },
    {
      icon: Star,
      title: "Trusted Reviews",
      description: "Read honest reviews from fellow travelers",
    },
    {
      icon: TrendingUp,
      title: "Growing Network",
      description: "Join thousands of successful travel connections",
    },
  ];

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose <span className="text-primary">Travel Buddy</span>
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            The trusted platform for meaningful travel connections
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 bg-card shadow-3 hover:shadow-6 transition-all"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                  <div className="text-primary">
                    <feature.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
