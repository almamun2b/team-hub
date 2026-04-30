"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { deleteTravelPlan } from "@/services/travelPlans/deleteTravelPlan";
import { getTravelPlansById } from "@/services/travelPlans/travelPlans";
import type { TravelPlanDetails } from "@/types/travelPlan";
import { format } from "date-fns";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteTravelPlanModalProps {
  travelPlanId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const DeleteTravelPlanModal: React.FC<DeleteTravelPlanModalProps> = ({
  travelPlanId,
  trigger,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [travelPlan, setTravelPlan] = useState<TravelPlanDetails | null>(null);
  const [confirmationText, setConfirmationText] = useState("");

  const fetchTravelPlan = async () => {
    if (!travelPlanId) return;

    try {
      setIsFetching(true);
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
      setIsFetching(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!travelPlanId || confirmationText !== "DELETE") return;

    try {
      setIsLoading(true);

      const result = await deleteTravelPlan({ id: travelPlanId });

      if (result.success) {
        toast.success("Travel plan deleted successfully");
        setIsOpen(false);
        setConfirmationText("");
        onSuccess?.();
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete travel plan";
      toast.error(errorMessage);
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
      setConfirmationText("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="p-1 border hover:border-gray-100 rounded text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Travel Plan
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            travel plan and all associated data including requests and reviews.
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : travelPlan ? (
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Travel Plan Info */}
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Avatar className="h-12 w-12">
                {travelPlan.images?.[0] ? (
                  <Image
                    src={travelPlan.images[0]}
                    alt={travelPlan.title}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <AvatarFallback>
                    {travelPlan.title?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold">{travelPlan.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {travelPlan.destination}
                </p>
                <div className="flex items-center gap-2 mt-1">
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

            {/* Warning Message */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">
                You are about to delete this travel plan:
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Title: {travelPlan.title}</li>
                <li>• Destination: {travelPlan.destination}</li>
                <li>• Budget: ${travelPlan.budget.toLocaleString()}</li>
                <li>
                  • Start Date:{" "}
                  {format(new Date(travelPlan.startDate), "MMM dd, yyyy")}
                </li>
                <li>• All travel requests will be deleted</li>
                <li>• All reviews will be deleted</li>
                <li>• This action cannot be undone</li>
              </ul>
            </div>

            {/* Confirmation Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Type <strong>&quot;DELETE&quot;</strong> to confirm:
              </label>
              <Input
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="w-full"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isLoading || confirmationText !== "DELETE"}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Travel Plan
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Travel plan not found.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTravelPlanModal;
