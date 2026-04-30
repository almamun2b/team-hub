import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getReviewById } from "@/services/review/getReviewById";
import { getPublicProfile } from "@/services/user/exploreTravelers";
import { BadgeCheck, Star, User } from "lucide-react";

type Review = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer?: {
    id: string;
    fullName: string;
    avatar?: string | null;
  };
  travelPlan?: {
    id: string;
    title: string;
    destination: string;
  };
};
interface TravelerDetailPageProps {
  params: Promise<{ travelerId: string }>;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ travelerId: string }>;
}) => {
  const { travelerId } = await params;
  const data = await getPublicProfile({ id: travelerId });

  return {
    title: data?.data?.fullName ?? "Traveler Profile",
    description: data?.data?.bio ?? "Traveler profile",
  };
};

const TravelerDetailPage = async ({ params }: TravelerDetailPageProps) => {
  const { travelerId } = await params;

  const response = await getPublicProfile({ id: travelerId });

  const reviewsRes = await getReviewById({ id: travelerId });

  console.log("Traveler response:", reviewsRes);

  if (!response?.success) return;
  const traveler = response.data;
  const reviews = reviewsRes?.data || [];

  if (!traveler) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        Traveler not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 pt-32 h-full">
      <Card className="border rounded-2xl shadow-sm">
        <CardContent className="pt-6 space-y-6">
          {/* Top section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={traveler.avatar ?? undefined} />
              <AvatarFallback>
                {traveler.fullName?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                {traveler.fullName}
                {traveler.hasVerifiedBadge && (
                  <Badge className="bg-blue-600 text-white">Verified</Badge>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                Joined: {new Date(traveler.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Bio */}
          {traveler.bio ? (
            <div>
              <h2 className="font-medium mb-2">Bio</h2>
              <p className="text-muted-foreground">{traveler.bio}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No bio available.</p>
          )}

          {/* Current location */}
          <div>
            <h2 className="font-medium mb-2">Current Location</h2>
            <p className="text-muted-foreground">
              {traveler.currentLocation || "Not provided"}
            </p>
          </div>

          {/* Travel Interests */}
          <div>
            <h2 className="font-medium mb-2">Travel Interests</h2>
            <div className="flex flex-wrap gap-2">
              {traveler.travelInterests?.length > 0 ? (
                traveler.travelInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="outline"
                    className="px-3 py-1 rounded-full"
                  >
                    {interest}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">No interests listed.</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="font-medium mb-2">Visited Countries</h2>
            <div className="flex flex-wrap gap-2">
              {traveler.visitedCountries?.length > 0 ? (
                traveler.visitedCountries.map((country) => (
                  <Badge
                    key={country}
                    variant="outline"
                    className="px-3 py-1 rounded-full"
                  >
                    {country}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">No countries visited.</p>
              )}
            </div>
          </div>
          <div>
            <span className="text-[11px] font-medium text-muted-foreground">
              Stats
            </span>
            <div className="mt-1 flex gap-3 text-xs">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <strong>{traveler?._count?.travelPlans ?? 0}</strong>
                <span className="text-muted-foreground">plans</span>
              </span>

              <span className="flex items-center gap-1">
                {/* Reviews icon */}
                <BadgeCheck className="h-3.5 w-3.5" />
                <strong>{traveler?._count?.reviewsReceived ?? 0}</strong>
                <span className="text-muted-foreground">reviews</span>
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <strong>{traveler?.avgRating?.toFixed(1) ?? "N/A"}</strong>
                <span>Average Rating</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Reviews</h3>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review: Review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={review.reviewer?.avatar || undefined}
                        />
                        <AvatarFallback>
                          {review.reviewer?.fullName?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {review.reviewer?.fullName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {review.comment}
                    </p>
                  )}
                  {review.travelPlan && (
                    <p className="text-xs text-muted-foreground mt-2">
                      For:{" "}
                      <span className="font-medium">
                        {review.travelPlan.title}
                      </span>{" "}
                      ({review.travelPlan.destination})
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelerDetailPage;
