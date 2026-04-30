import CTASection from "@/components/modules/home/CTASection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { me } from "@/services/auth/me";
import {
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  Search,
  Shield,
  Star,
  UserCheck,
  Users,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - Travel Buddy",
  description:
    "Learn how Travel Buddy connects travelers worldwide and helps you find your perfect travel companion.",
};

const processSteps = [
  {
    number: 1,
    title: "Create Your Profile",
    description:
      "Sign up and build your travel profile with preferences, interests, and what makes your travel style unique.",
    icon: <UserCheck className="h-6 w-6" />,
    details: [
      "Add photos and verify your identity",
      "Set travel preferences and interests",
      "Write a compelling bio",
      "Highlight your travel experience",
    ],
    time: "5 minutes",
  },
  {
    number: 2,
    title: "Find Compatible Travelers",
    description:
      "Our smart algorithm analyzes your profile and matches you with travelers who share your interests and travel style.",
    icon: <Search className="h-6 w-6" />,
    details: [
      "AI-powered compatibility matching",
      "Filter by destination and dates",
      "View detailed traveler profiles",
      "See match compatibility scores",
    ],
    time: "Instant",
  },
  {
    number: 3,
    title: "Connect & Plan Together",
    description:
      "Message your matches through our secure platform to discuss trip details and ensure you're compatible travel partners.",
    icon: <MessageCircle className="h-6 w-6" />,
    details: [
      "Secure in-app messaging",
      "Share trip ideas and plans",
      "Video chat available",
      "Build trust before traveling",
    ],
    time: "Variable",
  },
  {
    number: 4,
    title: "Travel with Confidence",
    description:
      "Meet your travel buddy and embark on amazing adventures with built-in safety features and community support.",
    icon: <MapPin className="h-6 w-6" />,
    details: [
      "Verified traveler profiles",
      "Safety features and emergency support",
      "Community reviews and ratings",
      "Travel insurance options",
    ],
    time: "Ongoing",
  },
];

const features = [
  {
    title: "Smart Matching Algorithm",
    description:
      "Our AI-powered system analyzes travel preferences, personality traits, and interests to find your perfect travel companion.",
    icon: <Star className="h-5 w-5 text-primary" />,
    stats: "95% Match Success Rate",
  },
  {
    title: "Verified Travelers",
    description:
      "All users go through identity verification to ensure authenticity and build trust within the community.",
    icon: <Shield className="h-5 w-5 text-primary" />,
    stats: "100% ID Verified",
  },
  {
    title: "Secure Messaging",
    description:
      "Communicate safely through our encrypted messaging system before sharing personal contact information.",
    icon: <MessageCircle className="h-5 w-5 text-primary" />,
    stats: "End-to-End Encryption",
  },
  {
    title: "Global Community",
    description:
      "Join thousands of travelers from around the world sharing amazing experiences and creating lasting friendships.",
    icon: <Users className="h-5 w-5 text-primary" />,
    stats: "150+ Countries",
  },
];

export default async function HowItWorks() {
  const user = await me();
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 pt-32 pb-20">
        <div className="mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              How Travel Buddy Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with compatible travelers in 4 simple steps and start your
              next adventure with confidence.
            </p>
          </div>

          {/* Process Steps */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Your Journey Starts Here
              </h2>
              <p className="text-muted-foreground">
                From profile creation to your first trip, we make finding travel
                companions simple and safe.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-3 relative overflow-hidden py-0"
                >
                  <CardContent className="p-6">
                    <div className="flex p-3 gap-3 rounded-full bg-transparent text-primary mb-4">
                      {step.icon}
                      <h3 className="font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {step.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="py-32 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Why Travel Buddy Works
              </h2>
              <p className="text-muted-foreground">
                Our platform is designed with features that make travel matching
                safe, effective, and enjoyable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-3">
                  <CardContent className="p-6 text-center">
                    <div className="flex gap-3 items-center justify-center p-3 rounded-full bg-transparent text-primary mx-auto mb-4">
                      {feature.icon}
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {feature.stats}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <CTASection user={user || null} />
        </div>
      </div>
    </div>
  );
}
