import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 mb-16">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-card to-primary/5" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-6">
            <Sparkles className="mr-2 h-3 w-3" />
            Since 2020
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Bringing{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Travelers Together
            </span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Travel Buddy connects like-minded adventurers worldwide, turning
            solo trips into shared memories and strangers into lifelong friends.
          </p>
        </div>
      </div>
    </section>
  );
}
