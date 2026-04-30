export type Role = "USER" | "ADMIN";

export interface GetAllTravelersParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  travelInterest?: string[];
  currentLocation?: string;
  hasVerifiedBadge?: string;
}

export interface Traveler {
  id: string;
  fullName: string;
  avatar: string | null;
  bio: string;
  currentLocation: string | null;
  travelInterests: string[];
  visitedCountries: string[];
  isVerified: boolean;
  hasVerifiedBadge: boolean;
  createdAt: string;
  _count: {
    reviewsReceived: number;
    travelPlans: number;
  };
}

export interface TravelersResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Traveler[];
}

export interface PublicUserProfile {
  id: string;
  fullName: string;
  avatar: string | null;
  bio: string;
  currentLocation: string | null;
  travelInterests: string[];
  visitedCountries: string[];
  isVerified: boolean;
  hasVerifiedBadge: boolean;
  createdAt: string; // ISO 8601 date string
  _count: {
    reviewsReceived: number;
    travelPlans: number;
  };
  avgRating: number;
}

export interface PublicUserProfileResponse {
  success: boolean;
  message: string;
  data: PublicUserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  avatar: string | null;
  contactNumber: string;
  bio: string;
  dateOfBirth: string | null;
  gender: string;
  currentLocation: string;
  travelInterests: string[];
  visitedCountries: string[];
  isVerified: boolean;
  hasVerifiedBadge: boolean;
  status: string;
  needPasswordChange: boolean;
  createdAt: string;
  updatedAt: string;
  subscription: {
    id: string;
    plan: string;
    status: string;
    startDate: string;
    endDate: string;
  };
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED";

export interface AdminUser {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  avatar: string | null;
  contactNumber: string | null;
  bio: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  currentLocation: string | null;
  travelInterests: string[];
  visitedCountries: string[];
  isVerified: boolean;
  hasVerifiedBadge: boolean;
  status: UserStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    reviewsReceived: number;
    travelPlans: number;
  };
  subscription: {
    id: string;
    plan: string;
    status: string;
    startDate: string;
    endDate: string;
  } | null;
  avgRating: number;
}

export interface AdminUserResponse {
  success: boolean;
  message: string;
  data?: AdminUser;
}

export interface UpdateUserStatusPayload {
  status?: UserStatus;
  isVerified?: boolean;
  hasVerifiedBadge?: boolean;
}

export interface UpdateUserStatusResponse {
  success: boolean;
  message: string;
  data?: AdminUser;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
  data?: AdminUser;
}

export interface EditUserPayload {
  fullName?: string;
  contactNumber?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: string;
  currentLocation?: string;
  travelInterests?: string[];
  visitedCountries?: string[];
}

export interface EditUserResponse {
  success: boolean;
  message: string;
  data?: AdminUser;
}

export interface TopTraveler {
  id: string;
  fullName: string;
  avatar: string;
  location: string;
  avgRating: string;
  totalReviews: number;
  travelInterests: string[];
  nextTrip: string | null;
}

export interface TopTravelersResponse {
  success: boolean;
  message: string;
  data: TopTraveler[];
}
