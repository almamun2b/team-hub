import { CreateReviewModal } from "@/components/modules/reviews/create-review-modal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getToReviewPlans } from "@/services/review/toReviewPlans";
import { type ToReviewPlan } from "@/types/review";
import { format } from "date-fns";
import { Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Plans to Review - Travel Buddy",
  description:
    "Review travel plans on Travel Buddy. Help improve the community by providing feedback on travel plans waiting for your review.",
};

const ToReviewPlansPage = async () => {
  const plansData = await getToReviewPlans();

  if (!plansData.success) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-muted-foreground mt-2">{plansData.message}</p>
        </div>
      </div>
    );
  }

  const { data: plans } = plansData;

  const getTravelTypeColor = (type: string) => {
    switch (type) {
      case "SOLO":
        return "bg-blue-100 text-blue-800";
      case "GROUP":
        return "bg-green-100 text-green-800";
      case "FAMILY":
        return "bg-purple-100 text-purple-800";
      case "COUPLE":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Plans to Review</h1>
          <p className="text-muted-foreground">
            Travel plans waiting for your review
          </p>
        </div>
        <Badge variant="secondary">
          {plans.length} {plans.length === 1 ? "Plan" : "Plans"}
        </Badge>
      </div>

      {plans.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No plans to review</h3>
              <p className="text-muted-foreground mt-2">
                You don&apos;t have any travel plans waiting for your review.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {plans.map((plan: ToReviewPlan) => (
            <Card key={plan.travelPlanId}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{plan.title}</CardTitle>
                      <Badge className={getTravelTypeColor(plan.travelType)}>
                        {plan.travelType}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {plan.destination}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(plan.startDate), "MMM d")} -{" "}
                        {format(new Date(plan.endDate), "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {plan.maxMembers} max members
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />${plan.budget}
                      </div>
                    </div>

                    {plan.activities.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {plan.activities.map((activity, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">Created by</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(plan.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {plan.creatorId.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>

                  {plan.images.length > 0 && (
                    <div className="flex gap-2">
                      {plan.images.slice(0, 3).map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image}
                            alt={`Travel plan image ${index + 1}`}
                            width={80}
                            height={80}
                            className="h-20 w-20 object-cover rounded-md"
                          />
                          {plan.images.length > 3 && index === 2 && (
                            <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                +{plan.images.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <CreateReviewModal plan={plan} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToReviewPlansPage;
