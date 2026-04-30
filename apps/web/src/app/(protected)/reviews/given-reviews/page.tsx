import { ReviewActions } from "@/components/modules/reviews/review-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getReviewsGivenByMe } from "@/services/review/getReviewsGivenByMe";
import { type Review } from "@/types/review";
import { format } from "date-fns";
import { Calendar, MapPin, Star } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Given Reviews - Travel Buddy",
  description:
    "View reviews you've written for other travelers on Travel Buddy. Manage your feedback and help build trust in the travel community.",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const GivenReviewsPage = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1");
  const limit = parseInt(resolvedSearchParams.limit || "10");

  const reviewsData = await getReviewsGivenByMe({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  if (!reviewsData.success) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-muted-foreground mt-2">{reviewsData.message}</p>
        </div>
      </div>
    );
  }

  const { data: reviews, meta } = reviewsData;
  const totalPages = Math.ceil(meta.total / meta.limit);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Given Reviews</h1>
          <p className="text-muted-foreground">
            Reviews you have written for other travelers
          </p>
        </div>
        <Badge variant="secondary">
          {meta.total} {meta.total === 1 ? "Review" : "Reviews"}
        </Badge>
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No reviews given yet</h3>
              <p className="text-muted-foreground mt-2">
                You haven&apos;t written any reviews for other travelers yet.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6">
            {reviews.map((review: Review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          {review.travelPlan?.title || "Unknown Travel Plan"}
                        </CardTitle>
                        <Badge variant="outline">
                          {review.travelPlan?.destination ||
                            "Unknown Destination"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="ml-2 text-sm font-medium">
                            {review.rating}.0
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(review.createdAt), "MMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">Reviewed</p>
                        <p className="text-xs text-muted-foreground">
                          {review.reviewee?.fullName || "Anonymous"}
                        </p>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={review.reviewee?.avatar || ""}
                          alt={review.reviewee?.fullName || "User"}
                        />
                        <AvatarFallback>
                          {review.reviewee?.fullName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed">
                      {review.comment || "No comment provided"}
                    </p>
                    {review.travelPlan && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          Reviewed travel plan to{" "}
                          {review.travelPlan.destination ||
                            "unknown destination"}
                        </div>
                        <ReviewActions review={review} />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={
                        page > 1
                          ? `/reviews/given-reviews?page=${page - 1}`
                          : undefined
                      }
                      className={
                        page <= 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => {
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href={`/reviews/given-reviews?page=${pageNum}`}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      if (pageNum === page - 2 || pageNum === page + 2) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href={
                        page < totalPages
                          ? `/reviews/given-reviews?page=${page + 1}`
                          : undefined
                      }
                      className={
                        page >= totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GivenReviewsPage;
