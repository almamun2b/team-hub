import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { confirmSubscription } from "@/services/payment/confirmSubscription";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Crown,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Successful - Travel Buddy",
  description:
    "Welcome to Travel Buddy Premium! Your subscription has been activated successfully. Start enjoying premium travel features.",
};

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

const PaymentSuccessPage = async ({
  searchParams,
}: PaymentSuccessPageProps) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="container flex min-h-screen items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Payment Failed</CardTitle>
            <CardDescription>
              No session ID provided. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you were redirected from a payment gateway, please contact
              support.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/pricing">Back to Pricing</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  try {
    const res = await confirmSubscription({ sessionId: session_id });

    if (!res.success) {
      throw new Error(res.message || "Failed to confirm subscription");
    }

    const subscription = res.data;
    const planName = subscription.plan;
    const startDate = new Date(subscription.startDate);
    const endDate = new Date(subscription.endDate);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const getPlanDetails = (plan: string) => {
      switch (plan) {
        case "MONTHLY":
          return {
            color: "bg-blue-500",
            icon: <Sparkles className="h-5 w-5" />,
            description: "Monthly subscription",
          };
        case "YEARLY":
          return {
            color: "bg-purple-500",
            icon: <Crown className="h-5 w-5" />,
            description: "Annual subscription (Best Value)",
          };
        default:
          return {
            color: "bg-green-500",
            icon: <CheckCircle className="h-5 w-5" />,
            description: "Subscription activated",
          };
      }
    };

    const planDetails = getPlanDetails(planName);

    return (
      <div className="min-h-screen bg-background">
        {/* Success Header */}
        <div className="border-b">
          <div className="container px-4 py-12 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center justify-center rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Travel Buddy Premium!
                </span>
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Your subscription has been activated successfully. Let&apos;s
                start your adventure!
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container px-4 py-12 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Subscription Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                    <CardDescription>
                      Your premium membership information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Plan Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-full ${planDetails.color} p-3`}
                        >
                          <div className="text-white">{planDetails.icon}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold">{planName} Plan</h3>
                          <p className="text-sm text-muted-foreground">
                            {planDetails.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        ACTIVE
                      </Badge>
                    </div>

                    <Separator />

                    {/* Dates */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4" />
                          Start Date
                        </div>
                        <p className="text-lg font-semibold">
                          {formatDate(startDate)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4" />
                          Renewal Date
                        </div>
                        <p className="text-lg font-semibold">
                          {formatDate(endDate)}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* What's Next */}
                    <div>
                      <h3 className="mb-4 font-semibold">What You Get Now</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <span className="font-medium">
                              Unlimited Travel Plans
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Create as many travel plans as you want
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <span className="font-medium">
                              Priority Matching
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Get matched with travelers faster
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <span className="font-medium">Verified Badge</span>
                            <p className="text-sm text-muted-foreground">
                              Show others you&apos;re a trusted member
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <span className="font-medium">
                              Advanced Filters
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Find the perfect travel buddies
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                    <CardDescription>
                      Start using your premium features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button asChild className="w-full gap-2">
                      <Link href="/travel-plans/my-travel-plan">
                        <Sparkles className="h-4 w-4" />
                        Create Travel Plan
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full gap-2">
                      <Link href="/travel-plan">
                        <User className="h-4 w-4" />
                        Find Travel Buddies
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full gap-2">
                      <Link href="/profile">
                        <Shield className="h-4 w-4" />
                        Update Profile
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                    <CardDescription>We&apos;re here for you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Have questions about your subscription? Contact our
                      support team.
                    </p>
                    <Button
                      variant="ghost"
                      asChild
                      className="w-full justify-start"
                    >
                      <Link href="/support">Contact Support</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      asChild
                      className="w-full justify-start"
                    >
                      <Link href="/faq">View FAQ</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12">
              <Card className="border-0 bg-gradient-to-r from-primary/10 to-primary/5 shadow-lg">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold">
                    Ready to Start Your Adventure?
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Your premium membership unlocks amazing features. Let&apos;s
                    make some travel memories!
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild size="lg" className="gap-2">
                      <Link href="/travelers">
                        Explore Travelers
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/">Go to Homepage</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Confirmation Details */}
        <div className="container px-4 py-8 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="border-0 bg-muted/50">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                      Confirmation ID:{" "}
                      <span className="font-mono">
                        {session_id.slice(0, 20)}...
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      A confirmation email has been sent to your registered
                      email address.
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard">View Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error confirming subscription:", error);

    return (
      <div className="container flex min-h-screen items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">
              Payment Confirmation Failed
            </CardTitle>
            <CardDescription>
              We couldn&apos;t confirm your subscription.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              There was an error processing your payment confirmation. This
              could be due to:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Payment session expired</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Network connectivity issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Invalid session ID</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Please check your email for confirmation or contact support if the
              issue persists.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/support">Contact Support</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/pricing">Back to Pricing</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
};

export default PaymentSuccessPage;
