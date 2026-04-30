"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TravelRequest } from "@/types/travelPlan";
import { Calendar, DollarSign, MapPin, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface MyTravelRequestProps {
  travelRequests: TravelRequest[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "ACCEPTED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MyTravelRequest: React.FC<MyTravelRequestProps> = ({
  travelRequests,
}) => {
  const router = useRouter();

  if (travelRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          You havent sent any travel requests yet.
        </div>
        <Button className="mt-4" onClick={() => router.push("/travel-plans")}>
          Browse Travel Plans
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          My Travel Requests
        </h1>
        <p className="text-muted-foreground">
          Track the status of your travel requests
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {travelRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">
                  {request.travelPlan.title}
                </CardTitle>
                <Badge className={`ml-2 ${getStatusColor(request.status)}`}>
                  {request.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {request.travelPlan.destination}
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(request.travelPlan.startDate)} -{" "}
                  {formatDate(request.travelPlan.endDate)}
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="mr-2 h-4 w-4" />$
                  {request.travelPlan.budget.toLocaleString()}
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  {request.travelPlan.maxMembers} max members
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Your message:</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {request.message}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Requested: {formatDate(request.createdAt)}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(`/travel-plan/${request.travelPlan.id}`)
                  }
                >
                  View Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTravelRequest;
