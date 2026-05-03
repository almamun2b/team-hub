export type UserRole = "SUPER_ADMIN" | "ADMIN" | "MEMBER";
export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatar: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface UpdateProfilePayload {
  fullName?: string;
  avatar?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data?: UserProfile;
}
