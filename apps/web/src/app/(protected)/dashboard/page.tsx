import AdminDashboard from "@/components/modules/dashboard/AdminDashboard";
import UserDashboard from "@/components/modules/dashboard/UserDashboard";
import { me } from "@/services/auth/me";
import { getDashboardStats } from "@/services/user/dashboardStats";
import type { AdminData, UserData } from "@/types/dashboard";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Travel Buddy",
  description:
    "Access your Travel Buddy dashboard to manage your travel plans, profile, and connect with fellow travelers.",
};

export default async function DashboardPage() {
  const user = await me();

  if (!user?.success || !user.data) {
    redirect("/login");
  }

  const result = await getDashboardStats();

  if (!result.success || !result.data) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Failed to load dashboard data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const userRole = user.data.role;

  if (userRole === "ADMIN") {
    return <AdminDashboard data={result.data as AdminData} />;
  }

  return <UserDashboard data={result.data as UserData} />;
}
