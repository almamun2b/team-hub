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
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTravelPlans } from "@/services/travelPlans/createTravelPlans";
import { getTravelPlansById } from "@/services/travelPlans/travelPlans";
import { updateTravelPlans } from "@/services/travelPlans/updateTravelPlans";
import type { TravelPlanDetails } from "@/types/travelPlan";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const travelPlanSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  destination: z.string().min(2, "Destination is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  budget: z
    .number()
    .min(1, "Budget must be a positive number")
    .nullable()
    .optional(),
  travelType: z.string().min(1, "Travel type is required"),
  maxMembers: z.number().min(1, "Max members must be at least 1").optional(),
  activities: z.array(z.string()).min(1, "At least one activity is required"),
});

type TravelPlanFormData = z.infer<typeof travelPlanSchema>;

interface ImagePreview {
  file?: File;
  url: string;
  isExisting: boolean;
}

interface TravelPlanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelPlanId?: string;
  onSuccess?: () => void;
}

const TravelPlanFormModal: React.FC<TravelPlanFormModalProps> = ({
  isOpen,
  onClose,
  travelPlanId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [travelPlan, setTravelPlan] = useState<TravelPlanDetails | null>(null);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [activityInput, setActivityInput] = useState("");

  const MAX_IMAGES = 5;

  const form = useForm<TravelPlanFormData>({
    resolver: zodResolver(travelPlanSchema),
    defaultValues: {
      title: "",
      description: "",
      destination: "",
      startDate: "",
      endDate: "",
      budget: 1,
      travelType: "SOLO",
      maxMembers: 1,
      activities: [],
    },
  });

  const isEditing = !!travelPlanId;

  const fetchTravelPlan = useCallback(async () => {
    if (!travelPlanId) return;

    try {
      setIsFetching(true);
      const result = await getTravelPlansById({ id: travelPlanId });

      if (result?.success && result.data) {
        setTravelPlan(result.data);
        form.reset({
          title: result.data.title,
          description: result.data.description,
          destination: result.data.destination,
          startDate: result.data.startDate.split("T")[0],
          endDate: result.data.endDate.split("T")[0],
          budget: result.data.budget,
          travelType: result.data.travelType,
          maxMembers: result.data.maxMembers,
          activities: result.data.activities,
        });

        if (result.data.images && result.data.images.length > 0) {
          const existingImages = result.data.images.map((url) => ({
            url,
            isExisting: true,
          }));
          setImagePreviews(existingImages);
        }
      } else {
        throw new Error("Failed to fetch travel plan");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch travel plan";
      toast.error(errorMessage);
      onClose();
    } finally {
      setIsFetching(false);
    }
  }, [travelPlanId, form, onClose]);

  useEffect(() => {
    if (isOpen && isEditing) {
      fetchTravelPlan();
    } else if (isOpen && !isEditing) {
      form.reset();
      setImagePreviews([]);
      setActivityInput("");
    }
  }, [isOpen, isEditing, fetchTravelPlan, form]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (!preview.isExisting && preview.url) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [imagePreviews]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const remainingSlots = MAX_IMAGES - imagePreviews.length;

    if (remainingSlots <= 0) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);

    const validFiles = filesToAdd.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024;

      if (!isValidType) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} exceeds 5MB size limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newPreviews = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false,
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = "";

    if (filesToAdd.length > remainingSlots) {
      toast.info(`Only ${remainingSlots} image(s) added due to limit`);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => {
      const preview = prev[index];

      if (!preview.isExisting && preview.url) {
        URL.revokeObjectURL(preview.url);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const addActivity = () => {
    if (activityInput.trim()) {
      const currentActivities = form.getValues("activities") || [];
      form.setValue("activities", [...currentActivities, activityInput.trim()]);
      setActivityInput("");
    }
  };

  const removeActivity = (index: number) => {
    const currentActivities = form.getValues("activities") || [];
    form.setValue(
      "activities",
      currentActivities.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: TravelPlanFormData) => {
    try {
      setIsLoading(true);

      const processedData = {
        ...data,
        budget: data.budget && !isNaN(data.budget) ? data.budget : 0,
      };

      const newImages = imagePreviews
        .filter((preview) => !preview.isExisting && preview.file)
        .map((preview) => preview.file!);

      const result = isEditing
        ? await updateTravelPlans({
            id: travelPlanId!,
            images: newImages.length > 0 ? newImages : undefined,
            data: processedData,
          })
        : await createTravelPlans({
            images: newImages,
            data: processedData,
          });

      if (result?.success) {
        toast.success(
          isEditing
            ? "Travel plan updated successfully!"
            : "Travel plan created successfully!"
        );
        onSuccess?.();
        onClose();
        form.reset();
        setImagePreviews([]);
      } else {
        toast.error(result?.message || "Operation failed");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Operation failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Travel Plan" : "Create New Travel Plan"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your travel plan details below."
              : "Fill in the details to create a new travel plan."}
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="Enter travel plan title"
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination *</Label>
                  <Input
                    id="destination"
                    {...form.register("destination")}
                    placeholder="Enter destination"
                  />
                  {form.formState.errors.destination && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.destination.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Describe your travel plan (minimum 20 characters)"
                  rows={4}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>

              {/* Dates and Budget */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...form.register("startDate")}
                  />
                  {form.formState.errors.startDate && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.startDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    {...form.register("endDate")}
                  />
                  {form.formState.errors.endDate && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.endDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (Optional)</Label>
                  <Input
                    id="budget"
                    type="number"
                    {...form.register("budget", { valueAsNumber: true })}
                    placeholder="Enter budget"
                  />
                  {form.formState.errors.budget && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.budget.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Travel Type and Max Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Travel Type *</Label>
                  <Select
                    value={form.watch("travelType")}
                    onValueChange={(value) =>
                      form.setValue("travelType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select travel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SOLO">Solo</SelectItem>
                      <SelectItem value="GROUP">Group</SelectItem>
                      <SelectItem value="FAMILY">Family</SelectItem>
                      <SelectItem value="COUPLE">Couple</SelectItem>
                      <SelectItem value="FRIENDS">Friends</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.travelType && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.travelType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxMembers">Max Members (Optional)</Label>
                  <Input
                    id="maxMembers"
                    type="number"
                    {...form.register("maxMembers", { valueAsNumber: true })}
                    placeholder="Enter max members"
                  />
                  {form.formState.errors.maxMembers && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.maxMembers.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Activities */}
              <div className="space-y-2">
                <Label>Activities *</Label>
                <div className="flex gap-2">
                  <Input
                    value={activityInput}
                    onChange={(e) => setActivityInput(e.target.value)}
                    placeholder="Add an activity"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addActivity())
                    }
                  />
                  <Button type="button" onClick={addActivity}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("activities")?.map((activity, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                    >
                      {activity}
                      <button
                        type="button"
                        onClick={() => removeActivity(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                {form.formState.errors.activities && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.activities.message}
                  </p>
                )}
              </div>

              {/* Images Section - Enhanced */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Images (Optional - Max {MAX_IMAGES} images)</Label>
                  <span className="text-sm text-muted-foreground">
                    {imagePreviews.length} / {MAX_IMAGES} images
                  </span>
                </div>

                {/* Image Upload Area */}
                {imagePreviews.length < MAX_IMAGES && (
                  <div className="relative">
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="images"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImagePlus className="w-10 h-10 mb-2 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB each
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {/* Image Previews Grid */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative aspect-square group rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors"
                      >
                        <Image
                          src={preview.url}
                          alt={`Preview ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          className="object-cover"
                        />

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200" />

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          title="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        {/* Image number badge */}
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>

                        {/* Existing image indicator */}
                        {preview.isExisting && (
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Existing
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Helper text */}
                {imagePreviews.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No images added yet. Add up to {MAX_IMAGES} images to
                    showcase your travel plan.
                  </p>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditing ? "Update Travel Plan" : "Create Travel Plan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TravelPlanFormModal;
