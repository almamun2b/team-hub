/* eslint-disable @typescript-eslint/no-explicit-any */
import { $fetch } from "@/lib/fetch";
import { LoginResponse, RegisterResponse, MeResponse, RefreshResponse } from "@/types/auth";

export const AuthService = {
  async register(data: any): Promise<RegisterResponse | null> {
    return $fetch.post<RegisterResponse>("/auth/register", data);
  },

  async login(credentials: any): Promise<LoginResponse | null> {
    return $fetch.post<LoginResponse>("/auth/login", credentials);
  },

  async logout(): Promise<any> {
    return $fetch.post("/auth/logout");
  },

  async refreshToken(): Promise<RefreshResponse | null> {
    return $fetch.post<RefreshResponse>("/auth/refresh-token");
  },

  async getMe(): Promise<MeResponse | null> {
    return $fetch.get<MeResponse>("/auth/me");
  },
};
