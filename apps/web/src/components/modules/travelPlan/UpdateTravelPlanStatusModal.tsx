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
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTravelPlansById } from "@/services/travelPlans/travelPlans";
import { updateTravelPlanStatus } from "@/services/travelPlans/updateTravelPlanStatus";
import type { TravelPlanDetails } from "@/types/travelPlan";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateStatusSchema = z.object({
  status: z.enum(["OPEN", "CLOSED", "CANCELLED", "COMPLETED"]),
});

type UpdateStatusFormData = z.infer<typeof updateStatusSchema>;

interface UpdateTravelPlanStatusModalProps {
  travelPlanId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const UpdateTravelPlanStatusModal: React.FC<
  UpdateTravelPlanStatusModalProps
> = ({ travelPlanId, trigger, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [travelPlan, setTravelPlan] = useState<TravelPlanDetails | null>(null);

  const form = useForm<UpdateStatusFormData>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: {
      status: "OPEN",
    },
  });

  const fetchTravelPlan = async () => {
    if (!travelPlanId) return;

    try {
      setIsFetching(true);
      const result = await getTravelPlansById({ id: travelPlanId });

      if (result?.success && result.data) {
        setTravelPlan(result.data);
        form.reset({
          status:
            ((result.data.status === "FULL" ? "OPEN" : result.data.status) as
              | "OPEN"
              | "CLOSED"
              | "CANCELLED"
              | "COMPLETED") || "OPEN",
        });
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

  const onSubmit = async (data: UpdateStatusFormData) => {
    if (!travelPlanId) return;

    try {
      setIsLoading(true);

      const result = await updateTravelPlanStatus({
        id: travelPlanId,
        payload: {
          status: data.status,
        },
      });

      if (result.success) {
        toast.success("Travel plan status updated successfully");
        setIsOpen(false);
        form.reset();
        onSuccess?.();
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update travel plan status";
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
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border text-sm rounded"
          >
            Status Update
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Travel Plan Status</DialogTitle>
          <DialogDescription>
            Change the status of this travel plan
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Travel Plan Info Display */}
              {travelPlan && (
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
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
                      <AvatarFallback className="text-lg">
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
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">New Status</label>
                <Select
                  onValueChange={(value) =>
                    form.setValue(
                      "status",
                      value as "OPEN" | "CLOSED" | "CANCELLED" | "COMPLETED"
                    )
                  }
                  defaultValue={form.getValues("status")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
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
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                      Update Status
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTravelPlanStatusModal;
