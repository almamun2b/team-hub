import TravelRequestModalWrapper from "@/components/modules/travelPlan/TravelRequestModalWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getTravelPlansById } from "@/services/travelPlans/travelPlans";
import {
  CalendarDays,
  CheckCircle,
  DollarSign,
  MapPin,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TravelPlanDetailPageProps {
  params: Promise<{ travelPlanId: string }>;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ travelPlanId: string }>;
}) => {
  const { travelPlanId } = await params;
  const data = await getTravelPlansById({ id: travelPlanId });

  return {
    title: data?.data?.title ?? "Travel Plan",
    description: data?.data?.description ?? "Travel Plan Details",
  };
};

const TravelPlanDetailPage = async ({ params }: TravelPlanDetailPageProps) => {
  const { travelPlanId } = await params;

  const response = await getTravelPlansById({ id: travelPlanId });

  if (!response) {
    return (
      <div className="mx-auto px-6 py-20 pt-32">
        <div className="text-center text-muted-foreground">
          Unable to load travel plan. Please try again later.
        </div>
      </div>
    );
  }

  if (!response?.success) return <div>Something went wrong</div>;

  const travelPlan = response?.data;

  return (
    <section className="max-w-4xl mx-auto py-10 px-4 pt-32">
      {/* ------- Title ------- */}

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-2">{travelPlan.title}</h1>
        <TravelRequestModalWrapper travelPlanId={travelPlan.id} />
      </div>
      <p className="text-muted-foreground mb-6">{travelPlan.description}</p>

      {/* ------- Image Gallery ------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {travelPlan.images.slice(0, 4).map((img: string, index: number) => (
          <div
            key={index}
            className="relative w-full h-56 rounded-xl overflow-hidden"
          >
            <Image
              src={img}
              alt={`Image ${index}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all hover:scale-105"
            />
          </div>
        ))}
      </div>

      <Separator className="my-8" />

      {/* ------- Details Section ------- */}
      <div className="space-y-6">
        {/* Destination */}
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="text-lg font-medium">{travelPlan.destination}</span>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-primary" />
          <span>
            {new Date(travelPlan.startDate).toLocaleDateString()} -{" "}
            {new Date(travelPlan.endDate).toLocaleDateString()}
          </span>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-primary" />
          <span>${travelPlan.budget}</span>
        </div>

        {/* Members */}
        <div className="flex items-center gap-3">
          <Users2 className="h-5 w-5 text-primary" />
          <span>Max Members: {travelPlan.maxMembers}</span>
        </div>

        {/* Travel Type */}
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm">
            {travelPlan.travelType}
          </Badge>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <Badge
            variant={travelPlan.status === "OPEN" ? "default" : "destructive"}
          >
            {travelPlan.status}
          </Badge>
        </div>
      </div>

      <Separator className="my-8" />

      {/* ------- Activities ------- */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Activities</h2>
        {travelPlan.activities.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {travelPlan.activities.map((activity: string, idx: number) => (
              <li key={idx} className="text-muted-foreground">
                {activity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No activities added.</p>
        )}
      </div>

      <Separator className="my-8" />

      {/* ------- Creator Info ------- */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Created By</h2>

        <Link
          href={`/travelers/${travelPlan.creator.id}`}
          className="flex items-center gap-4"
        >
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={travelPlan.creator.avatar ?? ""}
              alt={travelPlan.creator.fullName}
            />
            <AvatarFallback>
              {travelPlan.creator.fullName?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-medium text-lg flex items-center gap-1">
              {travelPlan.creator.fullName}
              {travelPlan.creator.hasVerifiedBadge && (
                <CheckCircle className="h-5 w-5 text-blue-500" />
              )}
            </h3>
            <p className="text-muted-foreground text-sm">
              {travelPlan.creator.isVerified ? "Verified User" : "Traveler"}
            </p>
          </div>
        </Link>
      </div>

      <div className="h-20" />
    </section>
  );
};

export default TravelPlanDetailPage;
