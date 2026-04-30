"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { respondToTravelRequest } from "@/services/travelPlans/respondToTravelRequest";
import type { PendingRequest } from "@/types/travelPlan";
import { AlertTriangle, Check, X } from "lucide-react";

interface RespondToRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: PendingRequest | null;
  action: "accept" | "reject" | null;
  onSuccess: () => void;
}

const RespondToRequestModal: React.FC<RespondToRequestModalProps> = ({
  isOpen,
  onClose,
  request,
  action,
  onSuccess,
}) => {
  const handleRespond = async () => {
    if (!request) return;

    try {
      const result = await respondToTravelRequest({
        requestId: request.id,
        status: action === "accept" ? "APPROVED" : "REJECTED",
      });

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        console.error("Failed to respond to request:", result.message);
      }
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {action === "accept" ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                Accept Travel Request
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-600" />
                Reject Travel Request
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {action === "accept"
              ? "Are you sure you want to accept this travel request? The user will be notified and can join your travel plan."
              : "Are you sure you want to reject this travel request? The user will be notified that their request was declined."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="font-medium">{request.user.fullName}</div>
            <div className="text-sm text-muted-foreground">
              wants to join your travel plan:
            </div>
            <div className="font-medium">{request.travelPlan.title}</div>
            <div className="text-sm text-muted-foreground">
              {request.travelPlan.destination}
            </div>
          </div>

          {action === "reject" && (
            <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                This action cannot be undone. The user will need to submit a new
                request if they want to join your travel plan.
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <strong>Message from user:</strong>
          </div>
          <div className="text-sm bg-muted/30 p-3 rounded border">
            {request.message}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleRespond}
            variant={action === "accept" ? "default" : "destructive"}
            className={
              action === "accept" ? "bg-green-600 hover:bg-green-700" : ""
            }
          >
            {action === "accept" ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Accept Request
              </>
            ) : (
              <>
                <X className="mr-2 h-4 w-4" />
                Reject Request
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RespondToRequestModal;
