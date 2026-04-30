import FAQClient from "@/components/modules/faq/FAQClient";
import { HelpCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Travel Buddy",
  description:
    "Find answers to frequently asked questions about Travel Buddy. Learn how our travel companion matching platform works and get help with common issues.",
};

const faqCategories = [
  {
    title: "Getting Started",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Account & Profile",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Safety & Security",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Travel Matching",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Payments & Billing",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Communication",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-indigo-100 text-indigo-600",
  },
];

const faqData = [
  {
    category: "Getting Started",
    question: "What is Travel Buddy and how does it work?",
    answer:
      "Travel Buddy is a platform that connects travelers with compatible companions for shared adventures. Our algorithm matches users based on travel preferences, personality traits, interests, and safety requirements. Once matched, you can communicate through our secure messaging system to plan your trip together.",
    tags: ["beginner", "overview"],
  },
  {
    category: "Getting Started",
    question: "How do I create a travel profile?",
    answer:
      "Creating a profile is simple! Sign up with your email, verify your account, then complete your profile with travel preferences, interests, and a brief bio. Add photos and verify your identity to increase your matching success rate. The more detailed your profile, the better your matches will be.",
    tags: ["profile", "setup"],
  },
  {
    category: "Account & Profile",
    question: "Can I edit my travel preferences after creating my profile?",
    answer:
      "Yes! You can update your travel preferences anytime from your profile settings. Go to 'My Profile' > 'Travel Preferences' to modify your destination interests, travel style, budget range, and other preferences. Changes will affect future matches but won't impact existing conversations.",
    tags: ["profile", "preferences", "editing"],
  },
  {
    category: "Account & Profile",
    question: "How do I delete my account?",
    answer:
      "To delete your account, go to Settings > Account > Delete Account. We'll ask for confirmation and may require email verification. Account deletion is permanent and removes all your data, messages, and match history. You can reactivate within 30 days if you change your mind.",
    tags: ["account", "deletion", "privacy"],
  },
  {
    category: "Safety & Security",
    question: "How does Travel Buddy ensure user safety?",
    answer:
      "We prioritize safety through multiple measures: ID verification, background checks (optional), user rating system, secure messaging, 24/7 support, and emergency assistance features. We also provide safety guidelines and encourage users to meet in public places first.",
    tags: ["safety", "verification", "security"],
  },
  {
    category: "Safety & Security",
    question: "What should I do if I feel unsafe with a match?",
    answer:
      "If you feel unsafe, immediately use our emergency features: block the user, report the incident through our safety center, and contact our 24/7 support team. We take all safety concerns seriously and will investigate promptly. Your safety is our top priority.",
    tags: ["safety", "emergency", "reporting"],
  },
  {
    category: "Travel Matching",
    question: "How does the matching algorithm work?",
    answer:
      "Our algorithm analyzes multiple factors: travel preferences, personality compatibility, interests, budget alignment, travel dates, destination overlap, and safety requirements. It learns from your interactions and feedback to improve future matches. You can also set custom filters for specific criteria.",
    tags: ["matching", "algorithm", "compatibility"],
  },
  {
    category: "Travel Matching",
    question: "Can I message someone without matching?",
    answer:
      "Direct messaging is only available between matched users to maintain quality and safety. However, you can express interest in profiles that catch your eye. If they're also interested, you'll be matched and can then message freely.",
    tags: ["messaging", "matching", "communication"],
  },
  {
    category: "Payments & Billing",
    question: "Is Travel Buddy free to use?",
    answer:
      "Basic features like profile creation and matching are free. Premium features require subscription: unlimited messaging, advanced filters, profile boosts, and priority support. We offer flexible plans: monthly ($9.99), quarterly ($24.99), and annual ($79.99) with savings.",
    tags: ["pricing", "free", "premium"],
  },
  {
    category: "Payments & Billing",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and digital wallets like Apple Pay and Google Pay. All payments are processed securely through Stripe with encryption and fraud protection.",
    tags: ["payment", "methods", "billing"],
  },
  {
    category: "Communication",
    question: "How do I report inappropriate behavior?",
    answer:
      "Report inappropriate behavior by tapping the report button on messages or profiles, selecting the reason, and adding details. Our moderation team reviews reports within 24 hours. Serious violations may result in immediate account suspension.",
    tags: ["reporting", "moderation", "behavior"],
  },
  {
    category: "Communication",
    question: "Can I share external contact information?",
    answer:
      "For safety reasons, we restrict external contact sharing until both users complete our verification process and have been matched for at least 7 days. This helps prevent scams and ensures all communication starts on our secure platform.",
    tags: ["communication", "safety", "verification"],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container px-4 md:px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about Travel Buddy. Can&apos;t
              find what you&apos;re looking for? Contact our support team.
            </p>
          </div>

          <FAQClient
            faqData={faqData}
            faqCategories={faqCategories}
            initialSearchTerm=""
            initialSelectedCategory="All"
          />
        </div>
      </div>
    </div>
  );
}
