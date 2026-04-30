import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  CreditCard,
  FileText,
  MapPin,
  Shield,
  Users,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Travel Buddy",
  description: "Travel Buddy terms of service and user agreement.",
};

const termsSections = [
  {
    title: "Acceptance of Terms",
    icon: <FileText className="h-5 w-5" />,
    content:
      "By accessing and using Travel Buddy, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    items: [],
  },
  {
    title: "User Responsibilities",
    icon: <Users className="h-5 w-5" />,
    content:
      "As a user of Travel Buddy, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.",
    items: [
      "Provide accurate and complete information",
      "Maintain and update your profile regularly",
      "Respect other users and their privacy",
      "Report inappropriate behavior or content",
      "Use the platform for legitimate travel purposes only",
    ],
  },
  {
    title: "Prohibited Activities",
    icon: <AlertCircle className="h-5 w-5" />,
    content:
      "You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.",
    items: [
      "Harassment, abuse, or threats towards other users",
      "Sharing false or misleading information",
      "Spamming or sending unsolicited messages",
      "Attempting to gain unauthorized access to our systems",
      "Using the platform for commercial purposes without permission",
    ],
  },
  {
    title: "Privacy and Data Protection",
    icon: <Shield className="h-5 w-5" />,
    content:
      "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.",
    items: [
      "We collect and use data as described in our Privacy Policy",
      "You control what personal information you share",
      "We implement security measures to protect your data",
      "You can request data deletion at any time",
    ],
  },
  {
    title: "Payment Terms",
    icon: <CreditCard className="h-5 w-5" />,
    content:
      "Certain features of Travel Buddy may require payment. All payments are processed securely through our payment providers.",
    items: [
      "Prices are clearly displayed before purchase",
      "All payments are non-refundable unless specified",
      "We reserve the right to change pricing with notice",
      "Payment disputes will be handled according to our policies",
    ],
  },
  {
    title: "Travel Matching and Safety",
    icon: <MapPin className="h-5 w-5" />,
    content:
      "Our platform connects travelers based on preferences and compatibility. However, we are not responsible for the actions of individual users or travel arrangements.",
    items: [
      "Verify potential travel partners independently",
      "Share travel plans with trusted contacts",
      "Follow local laws and customs when traveling",
      "Report any safety concerns immediately",
      "Use secure payment methods for shared expenses",
    ],
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container px-4 md:px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These terms and conditions outline the rules and regulations for
              the use of Travel Buddy&apos;s services.
            </p>
            <div className="mt-6">
              <Badge variant="outline" className="text-sm">
                Last Updated: {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {termsSections.map((section, index) => (
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
                  {section.items && section.items.length > 0 && (
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
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
