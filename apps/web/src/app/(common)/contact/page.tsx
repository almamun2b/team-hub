"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const contactOptions = [
  {
    title: "General Support",
    icon: <MessageCircle className="h-5 w-5" />,
    email: "support@travelbuddy.com",
    description: "For general questions, account issues, and platform help",
  },
  {
    title: "Safety & Security",
    icon: <Mail className="h-5 w-5" />,
    email: "safety@travelbuddy.com",
    description: "Report safety concerns or security issues",
  },
  {
    title: "Partnerships",
    icon: <Send className="h-5 w-5" />,
    email: "partners@travelbuddy.com",
    description: "Business partnerships and collaboration opportunities",
  },
];

const officeLocations = [
  {
    city: "Dhaka",
    address: "Firmgate Dhaka, Bangladesh",
    phone: "+880 1712 345678",
  },
  {
    city: "London",
    address: "456 Adventure Ave, London, UK SW1A 0AA",
    phone: "+44 20 7123 4567",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re here to help! Whether you have questions, need support,
              or want to share feedback, we&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Options */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-3">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
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
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Support
                          </SelectItem>
                          <SelectItem value="safety">
                            Safety & Security
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Issues
                          </SelectItem>
                          <SelectItem value="billing">
                            Billing & Payments
                          </SelectItem>
                          <SelectItem value="partnerships">
                            Partnerships
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your question or issue..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Contact Options */}
            <div className="space-y-6">
              <Card className="border-0 shadow-3">
                <CardHeader>
                  <CardTitle>Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="p-2 rounded bg-primary/10 text-primary shrink-0">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">
                          {option.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          {option.description}
                        </p>
                        <a
                          href={`mailto:${option.email}`}
                          className="text-xs text-primary hover:underline"
                        >
                          {option.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="border-0 shadow-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">General Support</span>
                    <Badge variant="outline">24 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Safety Issues</span>
                    <Badge variant="outline">2 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technical Support</span>
                    <Badge variant="outline">48 hours</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Office Locations */}
          <Card className="border-0 shadow-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Our Offices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold">{office.city}</h4>
                    <p className="text-sm text-muted-foreground">
                      {office.address}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {office.phone}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-12 text-center">
            <Separator className="mb-6" />
            <p className="text-sm text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Check out our
              <Link href="/faq" className="text-primary hover:underline mx-1">
                FAQ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
