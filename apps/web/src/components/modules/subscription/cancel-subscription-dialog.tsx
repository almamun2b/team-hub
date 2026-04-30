"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cancelSubscription } from "@/services/payment/cancelSubscription";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface CancelSubscriptionDialogProps {
  children: React.ReactNode;
  onCancelSuccess?: () => void;
}

export function CancelSubscriptionDialog({
  children,
  onCancelSuccess,
}: CancelSubscriptionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCancel = async () => {
    startTransition(async () => {
      const result = await cancelSubscription();
      if (result?.success) {
        setIsOpen(false);
        onCancelSuccess?.();
        toast.success("Subscription cancelled successfully");
      } else {
        toast.error(result?.message || "Failed to cancel subscription");
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Cancel Subscription
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your subscription? You will continue
            to have access to premium features until the end of your current
            billing period. After that, you will lose access to all premium
            features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Keep Subscription
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Yes, Cancel Subscription"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
