"use client";

import { format } from "date-fns";
import { Check, MapPin, Star, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Traveler = {
  id: string;
  fullName: string;
  avatar?: string | null;
  bio?: string | null;
  currentLocation?: string;
  travelInterests?: string[];
  visitedCountries?: string[];
  isVerified?: boolean;
  hasVerifiedBadge?: boolean;
  createdAt?: string;
  _count?: {
    reviewsReceived?: number;
    travelPlans?: number;
  };
  avgRating?: number;
};

export function TravelerCard({ traveler }: { traveler: Traveler }) {
  const {
    id,
    fullName,
    avatar,
    bio,
    currentLocation,
    travelInterests = [],
    isVerified,
    hasVerifiedBadge,
    createdAt,
    _count,
    avgRating,
  } = traveler;

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "TB";

  const joined = createdAt ? format(new Date(createdAt), "MMM d, yyyy") : null;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex items-center gap-4 py-4">
        <Avatar className="h-14 w-14">
          {avatar ? (
            <AvatarImage src={avatar} alt={fullName} />
          ) : (
            <AvatarFallback className="bg-muted text-muted-foreground">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 min-w-0">
          <CardTitle className="flex items-center gap-2 text-sm leading-tight">
            <span className="font-medium truncate">{fullName}</span>

            <div className="flex items-center gap-2">
              {isVerified && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {hasVerifiedBadge && (
                <Badge className="bg-amber-600 text-amber-50">Badge</Badge>
              )}
            </div>
          </CardTitle>

          <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">
              {currentLocation || "Location not provided"}
            </span>
          </p>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {bio || "No bio yet — this traveler hasn't added a bio."}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[11px] font-medium text-muted-foreground">
              Interests
            </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {travelInterests.length > 0 ? (
                travelInterests.slice(0, 4).map((t) => (
                  <Badge key={t} className="text-xs" variant="outline">
                    {t}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-medium text-muted-foreground">
              Stats
            </span>
            <div className="mt-1 flex gap-3 text-xs">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <strong>{_count?.travelPlans ?? 0}</strong>
                <span className="text-muted-foreground">plans</span>
              </span>

              <span className="flex items-center gap-1">
                <strong>{_count?.reviewsReceived ?? 0}</strong>
                <span className="text-muted-foreground">reviews</span>
              </span>

              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <strong>{avgRating?.toFixed(1) ?? "N/A"}</strong>
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-4 py-4">
        <div className="text-xs text-muted-foreground">
          {joined ? <span>Joined {joined}</span> : <span>New user</span>}
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/travelers/${id}`} passHref>
            <Button size="sm" variant="default" className="whitespace-nowrap">
              View Profile
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
