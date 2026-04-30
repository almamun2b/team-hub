import { type Review } from "@/types/review";
import { DeleteReviewModal } from "./delete-review-modal";
import { UpdateReviewModal } from "./update-review-modal";

interface ReviewActionsProps {
  review: Review;
}

export function ReviewActions({ review }: ReviewActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <UpdateReviewModal review={review} />
      <DeleteReviewModal review={review} />
    </div>
  );
}
