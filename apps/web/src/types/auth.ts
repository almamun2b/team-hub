export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: "SUPER_ADMIN" | "ADMIN" | "MEMBER";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    accessToken: string;
    user: User;
  };
}

export interface RefreshResponse {
  success: boolean;
  data: {
    accessToken: string;
  };
}
