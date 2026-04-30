import AboutCTASection from "@/components/modules/about/AboutCTASection";
import AboutHeroSection from "@/components/modules/about/AboutHeroSection";
import AboutStatsSection from "@/components/modules/about/AboutStatsSection";
import AboutStorySection from "@/components/modules/about/AboutStorySection";
import AboutTeamSection from "@/components/modules/about/AboutTeamSection";
import AboutValuesSection from "@/components/modules/about/AboutValuesSection";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Travel Buddy",
  description:
    "Learn about Travel Buddy's mission to connect travelers worldwide. Meet our team and discover how we're making travel better together.",
};

export default function AboutPageContent() {
  return (
    <div className="min-h-screen bg-background">
      <AboutHeroSection />
      <AboutStatsSection />
      <AboutStorySection />
      <AboutValuesSection />
      <AboutTeamSection />
      <AboutCTASection />

      <Separator className="my-8" />

      {/* Footer Note */}
      <div className="container px-4 pb-8 text-center md:px-6">
        <p className="text-sm text-muted-foreground">
          Travel Buddy is more than an app — it&apos;s a community of
          adventurers, explorers, and friends waiting to meet. Start your
          journey today.
        </p>
      </div>
    </div>
  );
}
