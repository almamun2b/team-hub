export type IUserRole = "SUPER_ADMIN" | "ADMIN" | "MEMBER";

export interface IAuthUser {
  id: string;
  email: string;
  role: IUserRole;
}

export interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
}
