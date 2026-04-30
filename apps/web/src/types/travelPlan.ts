export type TravelType = "SOLO" | "GROUP" | "FAMILY" | "COUPLE";
export type TravelStatus =
  | "OPEN"
  | "CLOSED"
  | "FULL"
  | "COMPLETED"
  | "CANCELLED";

export interface Creator {
  id: string;
  fullName: string;
  avatar: string;
  isVerified: boolean;
  hasVerifiedBadge: boolean;
}

export interface TravelPlan {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelType: TravelType;
  maxMembers: number;
  activities: string[];
  images: string[];
  status: TravelStatus;
  createdAt: string;
  updatedAt: string;
  creator: Creator;
  _count: {
    travelRequests: number;
  };
}

export interface TravelPlanSearchParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  destination?: string;
  travelType?: string;
  minBudget?: string;
  maxBudget?: string;
  startDate?: string;
  endDate?: string;
}

export interface TravelPlansResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: TravelPlan[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface TravelPlanDetails {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelType: TravelType;
  maxMembers: number;
  activities: string[];
  images: string[];
  status: TravelStatus;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    fullName: string;
    avatar: string;
    isVerified: boolean;
    hasVerifiedBadge: boolean;
  };
  travelRequests: unknown[];
  _count: {
    travelRequests: number;
  };
}

export interface TravelPlanDetailsResponse {
  success: boolean;
  message: string;
  data: TravelPlanDetails;
}

export type Params = Record<string, string | number | boolean>;

export type TravelRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface User {
  id: string;
  fullName: string;
  avatar: string | null;
  bio: string | null;
  travelInterests: string[];
  isVerified: boolean;
}

export interface TravelRequest {
  id: string;
  travelPlanId: string;
  userId: string;
  message: string;
  status: TravelRequestStatus;
  createdAt: string;
  updatedAt: string;
  travelPlan: TravelPlan;
}

export interface PendingRequest {
  id: string;
  travelPlanId: string;
  userId: string;
  message: string;
  status: TravelRequestStatus;
  createdAt: string;
  updatedAt: string;
  travelPlan: {
    id: string;
    title: string;
    destination: string;
  };
  user: User;
}

export interface TravelRequestsResponse {
  success: boolean;
  message: string;
  data: TravelRequest[];
}

export interface PendingRequestsResponse {
  success: boolean;
  message: string;
  data: PendingRequest[];
}

export interface ApprovedRequest {
  id: string;
  travelPlanId: string;
  message: string;
  user: {
    id: string;
    fullName: string;
    avatar: string | null;
    isVerified: boolean;
    travelInterests: string[];
    bio: string | null;
    email: string;
    contactNumber: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    currentLocation: string | null;
    visitedCountries: string[];
  };
}

export interface ApprovedRequestsResponse {
  success: boolean;
  message: string;
  data: ApprovedRequest[];
}

export interface TravelPlansParams extends Partial<Params> {
  page?: string;
  limit?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
