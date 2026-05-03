import { me } from "@/services/auth/me";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Target, MessageSquare, CheckSquare, BarChart3, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard - Team Hub",
  description: "Your collaborative workspace dashboard.",
};

export default async function DashboardPage() {
  const user = await me();

  if (!user?.success || !user.data) {
    redirect("/login");
  }

  const userData = user.data;

  const quickLinks = [
    { label: "Goals", href: "/goals", icon: Target, description: "Manage your team goals" },
    { label: "Announcements", href: "/announcements", icon: MessageSquare, description: "View team announcements" },
    { label: "Kanban", href: "/kanban", icon: CheckSquare, description: "Track tasks with Kanban board" },
    { label: "Analytics", href: "/analytics", icon: BarChart3, description: "View workspace analytics" },
    { label: "Profile", href: "/dashboard/profile", icon: User, description: "Update your profile" },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold">Welcome back, {userData.fullName}!</h1>
        <p className="text-muted-foreground mt-2">Here's your workspace overview.</p>
      </div>

      {/* User Profile Card */}
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src={userData.avatar ?? ""} />
            <AvatarFallback>{userData.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle>{userData.fullName}</CardTitle>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="secondary">{userData.role}</Badge>
            <Badge variant={userData.status === "ACTIVE" ? "default" : "destructive"}>
              {userData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center">
            Member since {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <Card key={link.label} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <link.icon className="h-5 w-5" />
                {link.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
              <Link href={link.href} className="text-primary hover:underline">
                Go to {link.label}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
