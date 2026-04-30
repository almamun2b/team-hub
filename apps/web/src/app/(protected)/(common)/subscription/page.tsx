import { CancelSubscriptionDialog } from "@/components/modules/subscription/cancel-subscription-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSubscriptionStatus } from "@/services/payment/getSubscriptionStatus";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscription - Travel Buddy",
  description:
    "Manage your Travel Buddy subscription. Upgrade, downgrade, or cancel your travel companion matching membership.",
};

const SubscriptionPage = async () => {
  const subscriptionData = await getSubscriptionStatus();

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "EXPIRED":
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="outline">No Subscription</Badge>;
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "CANCELLED":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "EXPIRED":
        return <Clock className="h-5 w-5 text-gray-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
        <p className="text-muted-foreground">
          Manage your Travel Buddy subscription and view your plan details.
        </p>
      </div>

      {subscriptionData.success && subscriptionData.data ? (
        <div className="space-y-6">
          {/* Current Subscription Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(subscriptionData.data.status)}
                Current Subscription
              </CardTitle>
              <CardDescription>
                Your current subscription status and plan details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <div className="mt-1">
                    {getStatusBadge(subscriptionData.data.status)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Plan
                  </label>
                  <div className="mt-1">
                    <span className="font-semibold">
                      {subscriptionData.data.plan || "No Active Plan"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Start Date
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(subscriptionData.data.startDate)}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    End Date
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(subscriptionData.data.endDate)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Features */}
          {subscriptionData.data.hasSubscription &&
            subscriptionData.data.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Plan Features</CardTitle>
                  <CardDescription>
                    Features included in your current subscription plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {subscriptionData.data.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Manage Subscription</CardTitle>
              <CardDescription>
                Upgrade, downgrade, or cancel your subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                {subscriptionData.data.hasSubscription && (
                  <CancelSubscriptionDialog>
                    <Button variant="outline">Cancel Subscription</Button>
                  </CancelSubscriptionDialog>
                )}
                <Button asChild variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Unable to Load Subscription
              </h3>
              <p className="text-muted-foreground mb-4">
                {subscriptionData.message ||
                  "We couldn't fetch your subscription details. Please try again."}
              </p>
              <Button>Retry</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionPage;
