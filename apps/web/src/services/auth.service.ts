import { $fetch } from "@/lib/fetch";
import { AuthResponse, RefreshResponse } from "@/types/auth";

export const AuthService = {
  async register(data: any): Promise<AuthResponse | null> {
    return $fetch.post<AuthResponse>("/auth/register", data);
  },

  async login(credentials: any): Promise<AuthResponse | null> {
    return $fetch.post<AuthResponse>("/auth/login", credentials);
  },

  async logout(): Promise<any> {
    return $fetch.post("/auth/logout");
  },

  async refreshToken(): Promise<RefreshResponse | null> {
    return $fetch.post<RefreshResponse>("/auth/refresh-token");
  },

  async getMe(): Promise<AuthResponse | null> {
    return $fetch.get<AuthResponse>("/auth/me");
  },
};
