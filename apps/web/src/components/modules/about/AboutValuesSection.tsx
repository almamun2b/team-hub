import { Card, CardContent } from "@/components/ui/card";
import { Globe, Heart, Shield, Sparkles } from "lucide-react";

const values = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Authentic Connections",
    description:
      "We believe best travel experiences come from genuine human connections, not just tourist spots.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Safety First",
    description:
      "Verified profiles, secure payments, and 24/7 support to ensure your peace of mind.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Sustainable Travel",
    description:
      "Promoting responsible tourism that benefits local communities and preserves nature.",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Unique Experiences",
    description: "Curated adventures that go beyond typical tourist itinerary.",
  },
];

export default function AboutValuesSection() {
  return (
    <section className="py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="title">Our Values</h2>
          <p className="mt-4 subtile">
            The principles that guide everything we do
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title}>
              <Card className="h-full border-0 bg-card shadow-3 hover:shadow-6 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                    <div className="text-primary">{value.icon}</div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
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
