import { TravelPlanCard } from "@/components/modules/travelPlan/TravelPlanCard";
import PaginationCommon from "@/components/shared/pagination-common";
import { Button } from "@/components/ui/button";
import { me } from "@/services/auth/me";
import { matchTravelPlans } from "@/services/travelPlans/matchTravelPlans";
import { TravelPlanSearchParams } from "@/types/travelPlan";
import { Metadata } from "next";
import Link from "next/link";
interface MatchTravelersPageProps {
  searchParams: Promise<TravelPlanSearchParams>;
}

export const metadata: Metadata = {
  title: "Matching Travel Plans - Travel Buddy",
  description:
    "Find personalized travel plan matches based on your interests and preferences. Connect with travelers who share your travel style.",
};

const MatchTravelersPage = async ({
  searchParams,
}: MatchTravelersPageProps) => {
  const params = await searchParams;

  const user = await me();

  if (!user?.data?.email) {
    return (
      <div className="mx-auto px-6 py-20 pt-32">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Login Required
            </h1>
            <p className="text-muted-foreground text-lg">
              You need to login to view matching travel plans and connect with
              fellow travelers.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-foreground">Why login?</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>View personalized travel plan recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Connect with travelers sharing similar interests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Save and organize your favorite travel plans</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="flex-1 sm:flex-initial">
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-initial"
              >
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const response = await matchTravelPlans(params);

  if (!response) {
    return (
      <div className="mx-auto px-6 py-20 pt-32">
        <div className="text-center text-muted-foreground">
          Unable to load travel plans. Please try again later.
        </div>
      </div>
    );
  }
  if (!response.success) {
    return <div className="mx-auto px-6 py-20 pt-32">{response.message}</div>;
  }

  if (!response.data || response.data.length === 0) {
    return (
      <div className="mx-auto px-6 py-20 pt-32">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              No Matching Travel Plans Found
            </h1>
            <p className="text-muted-foreground text-lg">
              We couldn&apos;t find any travel plans that match your current
              interests. Try adjusting your search criteria or explore all
              available plans.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-foreground">
                Tips for finding matches:
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Try broader search terms or fewer filters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Explore different destinations or travel dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Check back later as new plans are added regularly</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="flex-1 sm:flex-initial">
                <Link href="/travel-plans">Browse All Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const totalPages = Math.ceil(response.meta?.total / response.meta?.limit);
  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <h2 className="text-3xl font-bold mb-4 text-center pb-20">
        Travel Plan According to the Interest
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {response.data.map((travel) => (
          <TravelPlanCard key={travel.id} travelPlan={travel} />
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

export default MatchTravelersPage;
