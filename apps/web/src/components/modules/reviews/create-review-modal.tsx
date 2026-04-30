"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/services/review/createReview";
import { type CreateReviewPayload, type ToReviewPlan } from "@/types/review";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateReviewModalProps {
  plan: ToReviewPlan;
  onReviewCreated?: () => void;
}

export function CreateReviewModal({
  plan,
  onReviewCreated,
}: CreateReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: CreateReviewPayload = {
        travelPlanId: plan.travelPlanId,
        revieweeId: plan.creatorId,
        rating,
        comment: comment.trim(),
      };

      const result = await createReview(payload);

      if (result.success) {
        toast.success("Review created successfully!");
        setIsOpen(false);
        setRating(0);
        setComment("");
        onReviewCreated?.();
      } else {
        toast.error(result?.message || "Failed to create review");
        console.log(result, "result");
      }
    } catch {
      toast.error("Failed to create review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        className="p-1 hover:scale-110 transition-transform"
        onClick={() => setRating(i + 1)}
      >
        <Star
          className={`h-6 w-6 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 hover:text-yellow-400"
          }`}
        />
      </button>
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Write Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Travel Plan</DialogTitle>
          <DialogDescription>
            {plan.title} - {plan.destination}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-1">
              {renderStars()}
              <span className="ml-2 text-sm font-medium">
                {rating > 0 ? `${rating}.0` : "Select rating"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment (Min 10 characters)</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this travel plan..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
