/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { sendTravelRequest } from "@/services/travelPlans/sendTravelRequest";
import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface SimpleTravelRequestModalProps {
  travelPlanId: string;
  trigger?: React.ReactNode;
}

const TravelRequestModal = ({
  travelPlanId,
  trigger,
}: SimpleTravelRequestModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const requestToJoin = async () => {
    try {
      setIsLoading(true);

      const res = await sendTravelRequest({
        travelPlanId,
        message: message || "I'd like to join your travel plan!",
      });

      if (res.success) {
        toast.success("Your travel request has been sent.");
        setIsOpen(false);
        setMessage("");
      } else {
        throw new Error(res.message || "Failed to send request");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Request to Join</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Travel Plan</DialogTitle>
          <DialogDescription>
            Send a message to the host requesting to join.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Write a message to the host (optional)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">
            Leaving a friendly message increases your chances of getting
            accepted!
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={requestToJoin}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Request
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TravelRequestModal;
