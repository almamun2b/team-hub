"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Building,
  Clock,
  Globe,
  Heart,
  MapPin,
  Search,
  Send,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const jobCategories = [
  {
    title: "Engineering",
    icon: <Building className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
    count: 8,
  },
  {
    title: "Product",
    icon: <Target className="h-5 w-5" />,
    color: "bg-green-100 text-green-600",
    count: 5,
  },
  {
    title: "Marketing",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600",
    count: 4,
  },
  {
    title: "Operations",
    icon: <Briefcase className="h-5 w-5" />,
    color: "bg-yellow-100 text-yellow-600",
    count: 3,
  },
  {
    title: "Customer Support",
    icon: <Heart className="h-5 w-5" />,
    color: "bg-red-100 text-red-600",
    count: 6,
  },
];

const jobOpenings = [
  {
    id: 1,
    title: "Senior Full Stack Engineer",
    category: "Engineering",
    type: "Full-time",
    location: "San Francisco, CA (Remote)",
    experience: "5+ years",
    description:
      "Lead the development of our core platform features and mentor junior engineers. You'll work with React, Node.js, and modern cloud technologies to build scalable travel matching systems.",
    requirements: [
      "5+ years of full-stack development experience",
      "Strong proficiency in React and Node.js",
      "Experience with cloud services (AWS/GCP)",
      "Passion for travel and social impact",
    ],
    posted: "2 weeks ago",
    featured: true,
  },
  {
    id: 2,
    title: "Product Designer",
    category: "Product",
    type: "Full-time",
    location: "New York, NY (Hybrid)",
    experience: "3+ years",
    description:
      "Design beautiful and intuitive user experiences for our travel platform. You'll work on our mobile app, web platform, and create design systems that help travelers connect safely.",
    requirements: [
      "3+ years of product design experience",
      "Strong portfolio demonstrating mobile and web design",
      "Proficiency in Figma and design tools",
      "Understanding of user-centered design principles",
    ],
    posted: "1 week ago",
    featured: true,
  },
  {
    id: 3,
    title: "Growth Marketing Manager",
    category: "Marketing",
    type: "Full-time",
    location: "London, UK (Remote)",
    experience: "4+ years",
    description:
      "Lead our growth marketing initiatives to acquire and retain travelers worldwide. You'll manage performance marketing, content strategy, and user acquisition campaigns.",
    requirements: [
      "4+ years of growth marketing experience",
      "Proven track record of user acquisition",
      "Experience with marketing analytics and A/B testing",
      "Passion for travel and community building",
    ],
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Community Manager",
    category: "Customer Support",
    type: "Full-time",
    location: "Austin, TX (Remote)",
    experience: "2+ years",
    description:
      "Build and nurture our global community of travelers. You'll be the voice of Travel Buddy, managing social media, events, and user engagement.",
    requirements: [
      "2+ years of community management experience",
      "Excellent communication and writing skills",
      "Experience with social media management",
      "Passion for travel and connecting people",
    ],
    posted: "1 week ago",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    category: "Engineering",
    type: "Full-time",
    location: "Berlin, Germany (Remote)",
    experience: "4+ years",
    description:
      "Build and maintain our infrastructure to ensure reliable service for millions of travelers. You'll work with CI/CD, monitoring, and cloud architecture.",
    requirements: [
      "4+ years of DevOps experience",
      "Strong knowledge of AWS/GCP and containerization",
      "Experience with monitoring and logging tools",
      "Understanding of scalable systems architecture",
    ],
    posted: "1 week ago",
  },
];

const benefits = [
  {
    title: "Health & Wellness",
    icon: <Heart className="h-6 w-6" />,
    items: [
      "Comprehensive medical, dental, and vision insurance",
      "Mental health support and counseling",
      "Wellness stipend for gym and fitness",
      "Flexible time off and unlimited sick days",
    ],
  },
  {
    title: "Financial Growth",
    icon: <TrendingUp className="h-6 w-6" />,
    items: [
      "Competitive salary and equity packages",
      "401(k) retirement plan with company matching",
      "Annual performance bonuses",
      "Stock options for all employees",
    ],
  },
  {
    title: "Work-Life Balance",
    icon: <Clock className="h-6 w-6" />,
    items: [
      "Flexible work arrangements (remote, hybrid, in-office)",
      "4 weeks paid time off annually",
      "Paid parental leave and sabbatical program",
      "Flexible working hours",
    ],
  },
  {
    title: "Travel Perks",
    icon: <Globe className="h-6 w-6" />,
    items: [
      "Annual travel stipend",
      "Free Travel Buddy premium membership",
      "30 days paid travel time",
      "Discounted travel partners and accommodations",
    ],
  },
];

export default function Careers() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    experience: "",
    message: "",
  });

  const filteredJobs = jobOpenings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert(
      "Thank you for your interest! We'll review your application and get back to you soon.",
    );
    setFormData({
      name: "",
      email: "",
      position: "",
      experience: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us connect travelers worldwide and build the future of social
              travel. Explore career opportunities and join our passionate team.
            </p>
          </div>

          {/* Company Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-3 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">150+</div>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-3 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  50+
                </div>
                <p className="text-sm text-muted-foreground">Countries</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-3 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-3 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  95%
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Job Categories */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
              <p className="text-muted-foreground">
                Find your perfect role and help us make travel more accessible
                to everyone.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                onClick={() => setSelectedCategory("All")}
                className="gap-2"
              >
                <Briefcase className="h-4 w-4" />
                All Positions ({jobOpenings.length})
              </Button>
              {jobCategories.map((category) => (
                <Button
                  key={category.title}
                  variant={
                    selectedCategory === category.title ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.title)}
                  className="gap-2"
                >
                  <div className={`p-1 rounded ${category.color}`}>
                    {category.icon}
                  </div>
                  <div className="text-left">
                    <div>{category.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {category.count} openings
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Search */}
          <Card className="border-0 shadow-3 mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job Listings */}
            <div className="lg:col-span-2 space-y-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="border-0 shadow-3 hover:shadow-4 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {job.category}
                          </Badge>
                          {job.featured && (
                            <Badge className="bg-primary text-primary-foreground text-xs ml-2">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                          <span className="ml-4">• {job.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">
                          {job.posted}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {job.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary text-primary mt-1 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                      <Button size="sm" className="gap-2">
                        <Send className="h-4 w-4" />
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* No Results */}
              {filteredJobs.length === 0 && (
                <Card className="border-0 shadow-3">
                  <CardContent className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No positions found
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
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Benefits */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-3">
                <CardHeader>
                  <CardTitle className="text-lg">Why Join Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          {benefit.icon}
                        </div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {benefit.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div className="w-2 h-2 rounded-full bg-green-500 mt-1 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Application Form */}
              <Card className="border-0 bg-linear-to-br from-primary/5 via-card to-primary/5 shadow-3">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">
                    Don&apos;t see the perfect fit? Send us your resume and
                    we&apos;ll keep you in mind for future opportunities.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position of Interest</Label>
                      <Input
                        id="position"
                        placeholder="e.g., Senior Frontend Developer"
                        value={formData.position}
                        onChange={(e) =>
                          handleInputChange("position", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        placeholder="e.g., 5 years"
                        value={formData.experience}
                        onChange={(e) =>
                          handleInputChange("experience", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Cover Letter</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us why you're excited to join Travel Buddy..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Send Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

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
