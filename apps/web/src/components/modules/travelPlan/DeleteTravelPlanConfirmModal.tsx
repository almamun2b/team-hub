"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteTravelPlan } from "@/services/travelPlans/deleteTravelPlan";
import type { TravelPlan } from "@/types/travelPlan";
import { format } from "date-fns";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteTravelPlanConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelPlan: TravelPlan | null;
  onSuccess?: () => void;
}

const DeleteTravelPlanConfirmModal: React.FC<
  DeleteTravelPlanConfirmModalProps
> = ({ isOpen, onClose, travelPlan, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = async () => {
    if (!travelPlan) return;

    try {
      setIsLoading(true);
      const result = await deleteTravelPlan({ id: travelPlan.id });

      if (result?.success) {
        toast.success("Travel plan deleted successfully!");
        onSuccess?.();
        onClose();
        setConfirmationText("");
      } else {
        toast.error(result?.message || "Failed to delete travel plan");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete travel plan";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const canDelete = confirmationText === "DELETE";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Travel Plan
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please confirm you want to delete this
            travel plan.
          </DialogDescription>
        </DialogHeader>

        {travelPlan ? (
          <div className="space-y-4">
            {/* Travel Plan Info */}
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              {travelPlan.images && travelPlan.images.length > 0 && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={travelPlan.images[0]}
                    alt={travelPlan.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{travelPlan.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {travelPlan.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{travelPlan.destination}</Badge>
                  <Badge variant="outline">{travelPlan.travelType}</Badge>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-destructive">Warning:</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    <li>• This will permanently delete the travel plan</li>
                    <li>• All travel requests will be deleted</li>
                    <li>• All reviews will be deleted</li>
                    <li>• This action cannot be undone</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Confirmation Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Type <strong>&quot;DELETE&quot;</strong> to confirm:
              </label>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="w-full p-3 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
              />
            </div>

            {/* Travel Plan Details */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <strong>Created:</strong>{" "}
                {format(new Date(travelPlan.createdAt), "MMM dd, yyyy")}
              </p>
              <p>
                <strong>Budget:</strong>{" "}
                {travelPlan.budget
                  ? `$${travelPlan.budget.toLocaleString()}`
                  : "N/A"}
              </p>
              <p>
                <strong>Max Members:</strong> {travelPlan.maxMembers || "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Travel plan not found.</p>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={!canDelete || isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Travel Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTravelPlanConfirmModal;
