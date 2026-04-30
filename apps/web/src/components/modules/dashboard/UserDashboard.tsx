import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserData } from "@/types/dashboard";
import { format } from "date-fns";
import {
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";

interface UserDashboardProps {
  data: UserData;
}

export default function UserDashboard({ data }: UserDashboardProps) {
  const { stats, upcomingPlans, matchedTravelers } = data;

  const statCards = [
    {
      title: "My Travel Plans",
      value: stats.myTravelPlans,
      icon: MapPin,
      color: "text-blue-600",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Approved Trips",
      value: stats.approvedTrips,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Reviews Received",
      value: stats.reviewsReceived,
      icon: Star,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your travel plans and discover new adventures
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Travel Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPlans.map((plan) => (
                <div key={plan.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{plan.title}</h4>
                    <Link href={`/travel-plan/${plan.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500">{plan.destination}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(plan.startDate), "MMM dd")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>to</span>
                      <span>
                        {format(new Date(plan.endDate), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingPlans.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No upcoming travel plans
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Matched Travelers */}
        <Card>
          <CardHeader>
            <CardTitle>Matched Travelers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matchedTravelers.map((traveler) => (
                <div key={traveler.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={traveler.avatar || ""} />
                    <AvatarFallback>
                      {traveler.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {traveler.fullName}
                      </p>
                      {traveler.hasVerifiedBadge && (
                        <ShieldCheck className="h-3 w-3 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {traveler.travelInterests.slice(0, 3).join(", ")}
                      {traveler.travelInterests.length > 3 && "..."}
                    </p>
                  </div>
                  <Link href={`/travelers/${traveler.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>
              ))}
              {matchedTravelers.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No matched travelers found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
