import { Button } from "@/components/ui/button";
import { me } from "@/services/auth/me";
import { getAllUsers } from "@/services/user/getAllUsers";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users Management - Travel Buddy",
  description:
    "Admin dashboard for managing all Travel Buddy users. Monitor user activity, manage roles, and maintain platform safety.",
};

const UsersTable = dynamic(
  () => import("@/components/modules/user/UsersTable")
);
const CreateAdminModal = dynamic(
  () => import("@/components/modules/user/CreateAdminModal")
);

export const userFilterableFields = [
  "role",
  "status",
  "gender",
  "isVerified",
  "hasVerifiedBadge",
  "searchTerm",
] as const;

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
    role?: string;
    status?: string;
    gender?: string;
    isVerified?: string;
    hasVerifiedBadge?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const user = await me();

  if (user?.success && user.data && user.data.role !== "ADMIN") {
    redirect("/");
  }

  const queryParams: {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
    searchTerm?: string;
    role?: string;
    status?: string;
    gender?: string;
    isVerified?: boolean;
    hasVerifiedBadge?: boolean;
  } = {
    page: currentPage,
    limit: 10,
    sortBy: params.sortBy || "createdAt",
    sortOrder: (params.sortOrder as "asc" | "desc") || "desc",
  };

  if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
  if (params.role && params.role !== "all") queryParams.role = params.role;
  if (params.status && params.status !== "all")
    queryParams.status = params.status;
  if (params.gender && params.gender !== "all")
    queryParams.gender = params.gender;

  if (params.isVerified === "true") {
    queryParams.isVerified = true;
  } else if (params.isVerified === "false") {
    queryParams.isVerified = false;
  }
  if (params.hasVerifiedBadge === "true") {
    queryParams.hasVerifiedBadge = true;
  } else if (params.hasVerifiedBadge === "false") {
    queryParams.hasVerifiedBadge = false;
  }

  const tableSearchParams = {
    searchTerm: params.searchTerm || "",
    role: params.role || "all",
    status: params.status || "all",
    gender: params.gender || "all",
    isVerified:
      params.isVerified === "true"
        ? true
        : params.isVerified === "false"
        ? false
        : undefined,
    hasVerifiedBadge:
      params.hasVerifiedBadge === "true"
        ? true
        : params.hasVerifiedBadge === "false"
        ? false
        : undefined,
    sortBy: params.sortBy || "createdAt",
    sortOrder: (params.sortOrder as "asc" | "desc") || "desc",
  };

  const result = await getAllUsers(queryParams);
  if (!result) {
    return <div>Failed to load users</div>;
  }

  const users = result?.success && result?.data ? result?.data : [];
  const meta = result?.success
    ? result?.meta
    : { page: 1, limit: 14, total: 0 };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">
            View and manage all users in the system
          </p>
        </div>
        <CreateAdminModal
          trigger={<Button className="gap-2">Create Admin</Button>}
        />
      </div>

      {!result?.success ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Failed to load users. Please try again later.
          </p>
        </div>
      ) : (
        <Suspense fallback={<div>Loading users table...</div>}>
          <UsersTable
            users={users}
            meta={meta}
            searchParams={tableSearchParams}
          />
        </Suspense>
      )}
    </div>
  );
}
