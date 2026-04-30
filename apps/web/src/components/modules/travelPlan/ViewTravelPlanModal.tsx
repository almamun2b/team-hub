"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTravelPlansById } from "@/services/travelPlans/travelPlans";
import type { TravelPlanDetails } from "@/types/travelPlan";
import { format } from "date-fns";
import {
  CalendarDays,
  DollarSign,
  Eye,
  Loader2,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

interface ViewTravelPlanModalProps {
  travelPlanId: string;
  trigger?: React.ReactNode;
}

const ViewTravelPlanModal: React.FC<ViewTravelPlanModalProps> = ({
  travelPlanId,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState<TravelPlanDetails | null>(null);

  const fetchTravelPlan = async () => {
    if (!travelPlanId) return;

    try {
      setIsLoading(true);
      const result = await getTravelPlansById({ id: travelPlanId });

      if (result?.success && result.data) {
        setTravelPlan(result.data);
      } else {
        throw new Error("Failed to fetch travel plan");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch travel plan";
      toast.error(errorMessage);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      fetchTravelPlan();
    } else {
      setTravelPlan(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="p-1 border hover:border-gray-100 rounded">
            <Eye className="h-4 w-4" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Travel Plan Details</DialogTitle>
          <DialogDescription>
            Complete information about this travel plan
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : travelPlan ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                {travelPlan.images?.[0] ? (
                  <Image
                    src={travelPlan.images[0]}
                    alt={travelPlan.title}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                ) : (
                  <AvatarFallback className="text-lg">
                    {travelPlan.title?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{travelPlan.title}</h3>
                <p className="text-muted-foreground mt-1">
                  {travelPlan.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={
                      travelPlan.status === "OPEN"
                        ? "default"
                        : travelPlan.status === "COMPLETED"
                        ? "default"
                        : travelPlan.status === "CANCELLED"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {travelPlan.status}
                  </Badge>
                  <Badge variant="outline">{travelPlan.travelType}</Badge>
                </div>
              </div>
            </div>

            {/* Images */}
            {travelPlan.images && travelPlan.images.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {travelPlan.images.map((image, index) => (
                    <div key={index} className="relative aspect-video">
                      <Image
                        src={image}
                        alt={`${travelPlan.title} - Image ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{travelPlan.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(travelPlan.startDate), "MMM dd, yyyy")} -{" "}
                    {format(new Date(travelPlan.endDate), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    ${travelPlan.budget.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Max {travelPlan.maxMembers} members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Created{" "}
                    {format(new Date(travelPlan.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-2">
              <h4 className="font-medium">Activities</h4>
              <div className="flex flex-wrap gap-2">
                {travelPlan.activities.map((activity, index) => (
                  <Badge key={index} variant="secondary">
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Creator Info */}
            <div className="space-y-2">
              <h4 className="font-medium">Created By</h4>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Avatar className="h-10 w-10">
                  {travelPlan.creator.avatar ? (
                    <Image
                      src={travelPlan.creator.avatar}
                      alt={travelPlan.creator.fullName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <AvatarFallback>
                      {travelPlan.creator.fullName
                        ?.substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">
                    {travelPlan.creator.fullName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {travelPlan.creator.hasVerifiedBadge && (
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-blue-500" />
                        <span className="text-blue-500">Verified</span>
                      </div>
                    )}
                    {travelPlan.creator.isVerified && (
                      <span>Email Verified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-2">
              <h4 className="font-medium">Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-2 bg-muted border rounded">
                  <div className="font-semibold">
                    {travelPlan._count?.travelRequests || 0}
                  </div>
                  <div className="text-muted-foreground">Requests</div>
                </div>
                <div className="text-center p-2 bg-muted border rounded">
                  <div className="font-semibold">{travelPlan.maxMembers}</div>
                  <div className="text-muted-foreground">Max Members</div>
                </div>
                <div className="text-center p-2 bg-muted border rounded">
                  <div className="font-semibold">
                    {travelPlan.activities.length}
                  </div>
                  <div className="text-muted-foreground">Activities</div>
                </div>
                <div className="text-center p-2 bg-muted border rounded">
                  <div className="font-semibold">{travelPlan.travelType}</div>
                  <div className="text-muted-foreground">Type</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button asChild>
                <Link href={`/travel-plan/${travelPlan.id}`}>
                  View Full Details
                </Link>
              </Button>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Travel plan not found.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewTravelPlanModal;
