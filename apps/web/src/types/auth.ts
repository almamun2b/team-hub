export type User = {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: "SUPER_ADMIN" | "ADMIN" | "MEMBER";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  createdAt: string;
  updatedAt: string;
};

export interface LoginResponse {
  success: boolean;
  message?: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface MeResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export interface RefreshResponse {
  success: boolean;
  data: {
    accessToken: string;
  };
}