import { me } from "@/services/auth/me";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Target, MessageSquare, CheckSquare, BarChart3, User } from "lucide-react";
import { AnalyticsSection } from "@/components/modules/dashboard/AnalyticsSection";
import { getCurrentWorkspace } from "@/lib/workspace";

export const metadata: Metadata = {
  title: "Dashboard - Team Hub",
  description: "Your collaborative workspace dashboard.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await me();

  if (!user?.success || !user.data) {
    redirect("/login");
  }

  const userData = user.data;
  const currentWorkspace = await getCurrentWorkspace();
  const workspaceId = currentWorkspace?.id;

  const quickLinks = [
    { label: "Goals", href: "/goals", icon: Target, description: "Manage your team goals" },
    { label: "Announcements", href: "/announcements", icon: MessageSquare, description: "View team announcements" },
    { label: "Kanban", href: "/kanban", icon: CheckSquare, description: "Track tasks with Kanban board" },
    { label: "Analytics", href: "/analytics", icon: BarChart3, description: "View workspace analytics" },
    { label: "Profile", href: "/dashboard/profile", icon: User, description: "Update your profile" },
  ];

  return (
    <div className="container mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="text-center pb-5">
        <h1 className="text-3xl font-bold">Welcome back, {userData.fullName}!</h1>
      </div>

      {/* User Profile Card */}
      <Card className="max-w-md mx-auto hidden">
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

      {/* Analytics Section */}
      {workspaceId ? (
        <AnalyticsSection workspaceId={workspaceId} />
      ) : (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            Select or create a workspace to load analytics.
          </CardContent>
        </Card>
      )}

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
