import TravelPlansTable from "@/components/modules/travelPlan/TravelPlansTable";
import { me } from "@/services/auth/me";
import { getAdminTravelPlans } from "@/services/travelPlans/travelPlans";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Travel Plans Admin - Travel Buddy",
  description:
    "Admin dashboard for managing all travel plans in Travel Buddy. Monitor, approve, and manage user-submitted travel plans.",
};

interface TravelPlanPageProps {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
    travelType?: string;
    minBudget?: string;
    maxBudget?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function TravelPlanPage({
  searchParams,
}: TravelPlanPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const user = await me();

  if (user?.success && user.data && user.data.role !== "ADMIN") {
    redirect("/");
  }

  const queryParams: {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
    searchTerm?: string;
    travelType?: string;
    minBudget?: string;
    maxBudget?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  } = {
    page: currentPage,
    limit: 10,
    sortBy: params.sortBy || "createdAt",
    sortOrder: (params.sortOrder as "asc" | "desc") || "desc",
  };

  if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
  if (params.travelType && params.travelType !== "all")
    queryParams.travelType = params.travelType;
  if (params.minBudget) queryParams.minBudget = params.minBudget;
  if (params.maxBudget) queryParams.maxBudget = params.maxBudget;
  if (params.startDate) queryParams.startDate = params.startDate;
  if (params.endDate) queryParams.endDate = params.endDate;
  if (params.status && params.status !== "all")
    queryParams.status = params.status;

  console.log(queryParams, "queryParams");

  const result = await getAdminTravelPlans(queryParams);

  const travelPlans = result?.success ? result.data || [] : [];
  const meta = result?.success
    ? result.meta || { page: 1, limit: 14, total: 0 }
    : { page: 1, limit: 14, total: 0 };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Travel Plans Admin</h1>
          <p className="text-muted-foreground">
            Manage all travel plans in the system
          </p>
        </div>
      </div>

      {!result?.success ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Failed to load travel plans. Please try again later.
          </p>
        </div>
      ) : (
        <TravelPlansTable
          travelPlans={travelPlans}
          meta={meta}
          searchParams={queryParams}
        />
      )}
    </div>
  );
}
