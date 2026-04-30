import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminData } from "@/types/dashboard";
import { format } from "date-fns";
import {
  Calendar,
  CheckCircle,
  CreditCard,
  DollarSign,
  Eye,
  MapPin,
  Shield,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

interface AdminDashboardProps {
  data: AdminData;
}

export default function AdminDashboard({ data }: AdminDashboardProps) {
  const { stats, recentUsers, recentTravelPlans } = data;

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Verified Users",
      value: stats.verifiedUsers,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Total Admins",
      value: stats.totalAdmins,
      icon: Shield,
      color: "text-purple-600",
    },
    {
      title: "Travel Plans",
      value: stats.totalTravelPlans,
      icon: MapPin,
      color: "text-orange-600",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions,
      icon: CreditCard,
      color: "text-indigo-600",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenues.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and monitor your travel platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar || ""} />
                    <AvatarFallback>
                      {user.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.fullName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Joined {format(new Date(user.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                  <Link href={`/travelers/${user.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Travel Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Travel Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTravelPlans.map((plan) => (
                <div key={plan.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{plan.title}</h4>
                    <Badge
                      variant={
                        plan.status === "OPEN"
                          ? "default"
                          : plan.status === "COMPLETED"
                          ? "default"
                          : plan.status === "CANCELLED"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {plan.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{plan.destination}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {format(new Date(plan.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={plan.creator.avatar || ""} />
                        <AvatarFallback className="text-xs">
                          {plan.creator.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500">
                        {plan.creator.fullName}
                      </span>
                    </div>
                    <Link href={`/travel-plan/${plan.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
