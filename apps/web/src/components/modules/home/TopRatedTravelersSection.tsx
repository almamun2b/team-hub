import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTopTravelers } from "@/services/user/getTopTravelers";
import type { TopTraveler, UserProfileResponse } from "@/types/user";
import { CalendarDays, MapPin, Star, UserCheck } from "lucide-react";
import Link from "next/link";

interface TopRatedTravelersSectionProps {
  user: UserProfileResponse | null;
}

export default async function TopRatedTravelersSection({
  user,
}: TopRatedTravelersSectionProps) {
  let topTravelers: TopTraveler[] = [];
  let error: string | null = null;

  try {
    const result = await getTopTravelers();
    topTravelers = result.data;
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch top travelers";
    console.error("Error fetching top travelers:", err);
  }

  if (error) {
    return (
      <section className="py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h2 className="title">Top Rated Travelers</h2>
            <p className="mt-4 subtile">
              Connect with our most trusted community members
            </p>
          </div>
          <div className="mt-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          ``
          <h2 className="title">Top Rated Travelers</h2>
          <p className="mt-4 subtile">
            Connect with our most trusted community members
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {topTravelers.map((traveler) => (
            <Card
              key={traveler.id}
              className="border-0 bg-linear-to-br from-primary/5 via-card to-primary/5 shadow-3 hover:shadow-6 transition-all"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 border-2 border-primary/20 mb-4">
                    <AvatarImage
                      src={traveler.avatar}
                      alt={traveler.fullName}
                    />
                    <AvatarFallback className="text-lg">
                      {traveler.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="w-full">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">
                        {traveler.fullName}
                      </h3>
                      <Badge variant="secondary" className="gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {traveler.avgRating}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      <MapPin className="mr-1 inline h-3 w-3" />
                      {traveler.location || "Location not specified"}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {traveler?.travelInterests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="outline"
                          className="text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-sm mb-4">
                      <p className="text-muted-foreground">
                        <CalendarDays className="mr-1 inline h-3 w-3" />
                        {traveler.nextTrip
                          ? `Next trip: ${traveler.nextTrip}`
                          : "No upcoming trip"}
                      </p>
                    </div>

                    {user?.data && user.data.email && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full gap-2"
                        asChild
                      >
                        <Link href={`/travelers/${traveler.id}`}>
                          <UserCheck className="h-4 w-4" />
                          View Profile
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
