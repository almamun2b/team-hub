"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  ExternalLink,
  Headphones,
  HelpCircle,
  MapPin,
  MessageCircle,
  Search,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const supportCategories = [
  {
    title: "Getting Started",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Learn the basics of Travel Buddy",
    color: "bg-blue-100 text-blue-600",
    articleCount: 12,
  },
  {
    title: "Account Management",
    icon: <Users className="h-5 w-5" />,
    description: "Profile settings and account help",
    color: "bg-green-100 text-green-600",
    articleCount: 18,
  },
  {
    title: "Safety & Security",
    icon: <Shield className="h-5 w-5" />,
    description: "Stay safe while traveling",
    color: "bg-red-100 text-red-600",
    articleCount: 15,
  },
  {
    title: "Travel Matching",
    icon: <MapPin className="h-5 w-5" />,
    description: "Find and connect with travel buddies",
    color: "bg-purple-100 text-purple-600",
    articleCount: 8,
  },
  {
    title: "Payments & Billing",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Subscription and payment help",
    color: "bg-yellow-100 text-yellow-600",
    articleCount: 10,
  },
  {
    title: "Technical Issues",
    icon: <Settings className="h-5 w-5" />,
    description: "Troubleshooting and bug reports",
    color: "bg-indigo-100 text-indigo-600",
    articleCount: 6,
  },
];

const helpArticles = [
  {
    id: 1,
    title: "Complete Guide to Getting Started",
    category: "Getting Started",
    excerpt:
      "Everything you need to know to start your Travel Buddy journey successfully.",
    content:
      "Welcome to Travel Buddy! This comprehensive guide will walk you through setting up your profile, understanding our matching system, and making your first connections.",
    readTime: "5 min read",
    difficulty: "Beginner",
    featured: true,
  },
  {
    id: 2,
    title: "How to Verify Your Identity",
    category: "Safety & Security",
    excerpt:
      "Step-by-step instructions for completing identity verification to increase trust and matching success.",
    content:
      "Identity verification is crucial for safety and trust on our platform. Follow these simple steps to verify your account...",
    readTime: "3 min read",
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Understanding Your Match Score",
    category: "Travel Matching",
    excerpt:
      "Learn how our compatibility scoring works and how to improve your match quality.",
    content:
      "Our match score algorithm considers multiple factors to ensure compatible travel partnerships...",
    readTime: "7 min read",
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Managing Your Subscription",
    category: "Payments & Billing",
    excerpt:
      "How to upgrade, downgrade, or cancel your Travel Buddy subscription.",
    content:
      "Flexible subscription options let you choose the plan that works best for your travel needs...",
    readTime: "4 min read",
    difficulty: "Easy",
  },
  {
    id: 5,
    title: "Reporting Safety Concerns",
    category: "Safety & Security",
    excerpt:
      "What to do when you encounter safety issues or inappropriate behavior.",
    content:
      "Your safety is our top priority. Learn how to report concerns and what happens next...",
    readTime: "6 min read",
    difficulty: "Important",
  },
  {
    id: 6,
    title: "Profile Optimization Tips",
    category: "Account Management",
    excerpt: "Make your profile stand out and attract better travel matches.",
    content:
      "A well-optimized profile significantly increases your chances of finding compatible travel partners...",
    readTime: "8 min read",
    difficulty: "Intermediate",
  },
];

const quickActions = [
  {
    title: "Live Chat Support",
    description: "Chat with our support team in real-time",
    icon: <MessageCircle className="h-5 w-5" />,
    action: "Start Chat",
    available: true,
  },
  {
    title: "Email Support",
    description: "Get help via email within 24 hours",
    icon: <Headphones className="h-5 w-5" />,
    action: "Send Email",
    available: true,
  },
  {
    title: "Community Forum",
    description: "Get help from other travelers",
    icon: <Users className="h-5 w-5" />,
    action: "Visit Forum",
    available: false,
  },
];

export default function SupportCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All",
  );

  const filteredArticles = helpArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      case "Important":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Support Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers, get help, and learn how to make the most of your
              Travel Buddy experience.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className={`border-0 shadow-3 ${!action.available ? "opacity-60" : ""}`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`p-3 rounded-full ${action.available ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"} mx-auto mb-4`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {action.description}
                  </p>
                  <Button
                    disabled={!action.available}
                    className="w-full"
                    variant={action.available ? "default" : "secondary"}
                  >
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search */}
          <Card className="border-0 shadow-3 mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-3">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant={selectedCategory === "All" ? "default" : "ghost"}
                    onClick={() => setSelectedCategory("All")}
                    className="w-full justify-start gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    All Articles ({helpArticles.length})
                  </Button>
                  {supportCategories.map((category) => (
                    <Button
                      key={category.title}
                      variant={
                        selectedCategory === category.title
                          ? "default"
                          : "ghost"
                      }
                      onClick={() => setSelectedCategory(category.title)}
                      className="w-full justify-start gap-3"
                    >
                      <div className={`p-1 rounded ${category.color}`}>
                        {category.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div>{category.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {category.articleCount} articles
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Articles */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="border-0 shadow-3 hover:shadow-4 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            {article.featured && (
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`text-xs ${getDifficultyColor(article.difficulty)}`}
                          >
                            {article.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {article.readTime}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          Read Article
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* No Results */}
                {filteredArticles.length === 0 && (
                  <Card className="border-0 shadow-3">
                    <CardContent className="text-center py-12">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No articles found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search terms or browse different
                        categories.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("All");
                        }}
                      >
                        Clear Search
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <Card className="border-0 shadow-3 mt-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
                <p className="text-muted-foreground mb-6">
                  Can&apos;t find what you&apos;re looking for? Our support team
                  is here to help you personally.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="gap-2">
                    <Link href="/contact">
                      <MessageCircle className="h-4 w-4" />
                      Contact Support
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="gap-2">
                    <Link href="/faq">
                      <ExternalLink className="h-4 w-4" />
                      Browse FAQ
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-12 text-center">
            <Separator className="mb-6" />
            <div className="mt-4">
              <Link href="/" className="text-primary hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
