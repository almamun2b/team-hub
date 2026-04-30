import { TravelPlanCard } from "@/components/modules/travelPlan/TravelPlanCard";
import { TravelPlanFilters } from "@/components/modules/travelPlan/TravelPlanFilters";
import PaginationCommon from "@/components/shared/pagination-common";
import { getTravelPlans } from "@/services/travelPlans/travelPlans";
import { TravelPlanSearchParams } from "@/types/travelPlan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Buddy - Discover Amazing Travel Experiences",
  description:
    "Connect with fellow adventurers and discover amazing travel plans around the world",
};

interface ProjectPageProps {
  searchParams: Promise<TravelPlanSearchParams>;
}

const TravelPlanPage = async ({ searchParams }: ProjectPageProps) => {
  const params = await searchParams;
  if (!params.sortOrder) {
    params.sortOrder = "asc";
  }

  const response = await getTravelPlans(params);

  if (!response) {
    return (
      <section className="mx-auto px-6 py-20 pt-32">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Explore Travel Plan
        </h2>
        <div className="text-center text-muted-foreground">
          Unable to load travel plans. Please try again later.
        </div>
      </section>
    );
  }

  const travelPlans = !response.success ? [] : response.data;
  const meta = !response.success
    ? { page: 1, limit: 20, total: 0 }
    : response.meta;

  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Explore Travel Plan
      </h2>

      <TravelPlanFilters searchParams={params} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {travelPlans.map((travel) => (
          <TravelPlanCard key={travel.id} travelPlan={travel} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 text-center">
          <PaginationCommon currentPage={meta.page} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
};

export default TravelPlanPage;
