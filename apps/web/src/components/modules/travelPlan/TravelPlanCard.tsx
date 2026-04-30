/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowRight,
  CalendarDays,
  DollarSign,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TravelRequestModalWrapper from "./TravelRequestModalWrapper";

export function TravelPlanCard({
  travelPlan,
}: {
  travelPlan: Record<string, any>;
}) {
  const {
    id,
    title,
    description,
    destination,
    startDate,
    endDate,
    budget,
    travelType,
    maxMembers,
    activities,
    images,
    status,
    creator,
  } = travelPlan;

  const firstImage = images?.[0];

  const formattedStart = new Date(startDate).toLocaleDateString();
  const formattedEnd = new Date(endDate).toLocaleDateString();

  return (
    <Card className="overflow-hidden border rounded-xl shadow-sm hover:shadow-lg transition bg-card pt-0">
      {/* Cover Image */}
      <div className="relative h-48 w-full">
        <Image
          src={firstImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-auto"
        />
      </div>

      {/* Content */}
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge
            variant={status === "OPEN" ? "default" : "secondary"}
            className="uppercase"
          >
            {status}
          </Badge>
          <Badge>{travelType}</Badge>
        </div>
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <TravelRequestModalWrapper travelPlanId={id} />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 grow">
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} />
          <span>{destination}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CalendarDays size={16} />
          <span>
            {formattedStart} → {formattedEnd}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <DollarSign size={16} />
          <span>{budget} BDT</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users size={16} />
          <span>Max Members: {maxMembers}</span>
        </div>

        {/* Activities */}
        {activities?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activities.map((a: string, i: number) => (
              <Badge key={i} variant="outline" className="text-xs">
                {a}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Creator */}
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <Link
          href={`/travelers/${creator.id}`}
          className="flex items-center gap-2"
        >
          <Avatar>
            <AvatarImage src={creator.avatar} />
            <AvatarFallback>
              {creator.fullName?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium flex items-center gap-1">
              {creator.fullName}
              {creator.hasVerifiedBadge && (
                <ShieldCheck className="text-blue-500" size={16} />
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {creator.isVerified ? "Verified" : "Unverified"}
            </p>
          </div>
        </Link>

        <Button type="button" asChild size="sm">
          <Link
            href={`/travel-plan/${id}`}
            className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
          >
            View
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
