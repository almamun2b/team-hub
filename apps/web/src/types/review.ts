export interface TravelPlan {
  id: string;
  title: string;
  destination: string;
}

export interface Reviewer {
  id: string;
  fullName: string;
  avatar: string | null;
}

export interface Review {
  id: string;
  travelPlanId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  travelPlan: TravelPlan;
  reviewer: Reviewer;
  reviewee?: Reviewer;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
}

export interface GetMyReviewsResponse {
  success: boolean;
  message: string;
  meta: Meta;
  data: Review[];
}

export interface GetMyReviewsParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ToReviewPlan {
  travelPlanId: string;
  creatorId: string;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelType: "SOLO" | "GROUP" | "FAMILY" | "COUPLE";
  maxMembers: number;
  activities: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetToReviewPlansResponse {
  success: boolean;
  message: string;
  data: ToReviewPlan[];
}

export interface CreateReviewPayload {
  travelPlanId: string;
  revieweeId: string;
  rating: number;
  comment: string;
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  data?: Review;
}

export interface UpdateReviewPayload {
  rating: number;
  comment: string;
}

export interface UpdateReviewResponse {
  success: boolean;
  message: string;
  data?: Review;
}

export interface DeleteReviewResponse {
  success: boolean;
  message: string;
}
