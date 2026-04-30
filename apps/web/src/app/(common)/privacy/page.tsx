import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Eye, Globe, Lock, Shield, UserCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Travel Buddy",
  description:
    "Travel Buddy privacy policy and how we protect your personal information.",
};

const privacySections = [
  {
    title: "Information We Collect",
    icon: <Database className="h-5 w-5" />,
    content:
      "We collect information you provide directly to us, such as when you create an account, update your profile, or contact us. This includes your name, email address, travel preferences, location data, and any other information you choose to provide.",
    items: [
      "Personal identification information (name, email, phone)",
      "Travel preferences and interests",
      "Location data and travel history",
      "Profile information and photos",
      "Communication data with other users",
    ],
  },
  {
    title: "How We Use Your Information",
    icon: <UserCheck className="h-5 w-5" />,
    content:
      "We use the information we collect to provide, maintain, and improve our services, including matching you with compatible travel partners and enhancing your experience on our platform.",
    items: [
      "To create and manage your account",
      "To match you with compatible travel partners",
      "To facilitate communication between users",
      "To provide customer support",
      "To improve our services and develop new features",
    ],
  },
  {
    title: "Information Sharing",
    icon: <Globe className="h-5 w-5" />,
    content:
      "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.",
    items: [
      "With other users for travel matching purposes",
      "With service providers who assist in operating our platform",
      "When required by law or to protect our rights",
      "With your consent for specific purposes",
    ],
  },
  {
    title: "Data Security",
    icon: <Lock className="h-5 w-5" />,
    content:
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    items: [
      "SSL encryption for data transmission",
      "Regular security audits and updates",
      "Limited access to personal data",
      "Secure data storage practices",
    ],
  },
  {
    title: "Your Rights",
    icon: <Eye className="h-5 w-5" />,
    content:
      "You have the right to access, update, or delete your personal information at any time through your account settings or by contacting our support team.",
    items: [
      "Access to your personal data",
      "Correction of inaccurate information",
      "Deletion of your account and data",
      "Opt-out of marketing communications",
      "Data portability requests",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container px-4 md:px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <div className="mt-6">
              <Badge variant="outline" className="text-sm">
                Last Updated: {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {privacySections.map((section, index) => (
              <Card key={index} className="border-0 shadow-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {section.icon}
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                  {section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
