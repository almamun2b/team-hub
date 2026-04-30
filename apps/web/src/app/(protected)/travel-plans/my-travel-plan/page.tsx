import MyTravelPlansClient from "@/components/modules/travelPlan/MyTravelPlansClient";
import { getMyTravelPlans } from "@/services/travelPlans/getMyTravelPlans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Travel Plans - Travel Buddy",
  description:
    "Manage your travel plans on Travel Buddy. Create, edit, and organize your upcoming travel adventures.",
};

interface TravelPlanPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

const MyTravelPlanPage = async ({ searchParams }: TravelPlanPageProps) => {
  const params = await searchParams;

  const queryParams = {
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 14,
    sortBy: params.sortBy || "createdAt",
    sortOrder: (params.sortOrder as "asc" | "desc") || "desc",
  };

  console.log("queryParams", queryParams);

  const result = await getMyTravelPlans(queryParams);

  const travelPlans = result?.success ? result.data ?? [] : [];
  const meta = result?.success
    ? result.meta ?? { page: 1, limit: queryParams.limit, total: 0 }
    : { page: 1, limit: queryParams.limit, total: 0 };

  return (
    <MyTravelPlansClient
      initialTravelPlans={travelPlans}
      initialMeta={meta}
      initialSearchParams={queryParams}
    />
  );
};

export default MyTravelPlanPage;
