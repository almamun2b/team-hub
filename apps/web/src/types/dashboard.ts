export interface AdminData {
  stats: {
    totalUsers: number;
    verifiedUsers: number;
    totalAdmins: number;
    totalTravelPlans: number;
    totalReviews: number;
    activeSubscriptions: number;
    totalRevenues: number;
  };
  recentUsers: Array<{
    id: string;
    fullName: string;
    avatar: string | null;
    createdAt: string;
  }>;
  recentTravelPlans: Array<{
    id: string;
    title: string;
    destination: string;
    status: string;
    createdAt: string;
    creator: {
      fullName: string;
      avatar: string | null;
    };
  }>;
}

export interface UserData {
  stats: {
    myTravelPlans: number;
    pendingRequests: number;
    approvedTrips: number;
    reviewsReceived: number;
  };
  upcomingPlans: Array<{
    id: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    creator: {
      id: string;
      fullName: string;
      avatar: string | null;
    };
  }>;
  matchedTravelers: Array<{
    id: string;
    fullName: string;
    avatar: string | null;
    travelInterests: string[];
    hasVerifiedBadge: boolean;
  }>;
}
