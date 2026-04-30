import AboutStatsSection from "@/components/modules/about/AboutStatsSection";
import CTASection from "@/components/modules/home/CTASection";
import HeroSection from "@/components/modules/home/HeroSection";
import HowItWorksSection from "@/components/modules/home/HowItWorksSection";
import PopularDestinationsSection from "@/components/modules/home/PopularDestinationsSection";
import TestimonialsSection from "@/components/modules/home/TestimonialsSection";
import TopRatedTravelersSection from "@/components/modules/home/TopRatedTravelersSection";
import TravelCategoriesSection from "@/components/modules/home/TravelCategoriesSection";
import WhyChooseUsSection from "@/components/modules/home/WhyChooseUsSection";
import { me } from "@/services/auth/me";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Buddy - Connect with Travelers Worldwide",
  description:
    "Discover amazing travel experiences and connect with fellow adventurers around the world. Find travel companions and create unforgettable memories together.",
};

export default async function Home() {
  const user = await me();
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <AboutStatsSection />
      <WhyChooseUsSection />
      <PopularDestinationsSection user={user} />
      <TravelCategoriesSection />
      <TopRatedTravelersSection user={user} />
      <TestimonialsSection />
      <CTASection user={user} />
    </>
  );
}
