/* eslint-disable @typescript-eslint/no-explicit-any */
import { TravelerCard } from "@/components/modules/user/TravelerCard";
import PaginationCommon from "@/components/shared/pagination-common";
import { exploreTravelers } from "@/services/user/exploreTravelers";
import { GetAllTravelersParams } from "@/types/user";
import { Metadata } from "next";

interface ProjectPageProps {
  searchParams: Promise<GetAllTravelersParams>;
}

export const metadata: Metadata = {
  title: "Explore Travelers - Travel Buddy",
  description:
    "Discover and connect with amazing travelers from around the world. Find travel companions who share your interests and travel style.",
};

const TravelersPage = async ({ searchParams }: ProjectPageProps) => {
  const params = await searchParams;
  const response = await exploreTravelers(params);

  if (!response) {
    return (
      <section className="mx-auto px-6 py-20 pt-32">
        <div className="text-center text-muted-foreground">
          Unable to load travelers. Please try again later.
        </div>
      </section>
    );
  }

  if (!response.success) {
    throw new Error("Some thing went ");
  }
  const totalPages = Math.ceil(response.meta.total / response.meta.limit);
  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <h2 className="text-3xl font-bold mb-4 text-center">Explore Travelers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {response.data.map((user: any) => (
          <TravelerCard key={user.id} traveler={user} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 text-center">
          <PaginationCommon
            currentPage={response.meta.page}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
};

export default TravelersPage;
