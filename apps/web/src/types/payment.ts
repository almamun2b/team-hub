export interface SubscriptionPlan {
  plan: string;
  price: number;
  features: string[];
}

export interface SubscriptionPlansResponse {
  success: boolean;
  message: string;
  data: SubscriptionPlan[];
}

export interface SubscriptionStatus {
  hasSubscription: boolean;
  plan: "MONTHLY" | "YEARLY" | null;
  status: "ACTIVE" | "CANCELLED" | "EXPIRED" | null;
  startDate: string | null;
  endDate: string | null;
  features: string[];
}

export interface SubscriptionStatusResponse {
  success: boolean;
  message: string;
  data: SubscriptionStatus;
}
