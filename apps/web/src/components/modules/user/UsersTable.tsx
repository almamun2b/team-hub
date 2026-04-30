"use client";

import DeleteUserModal from "@/components/modules/user/DeleteUserModal";
import EditUserModal from "@/components/modules/user/EditUserModal";
import ViewUserModal from "@/components/modules/user/ViewUserModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle,
  Mail,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export type User = {
  id: string;
  email: string;
  role: string;
  fullName: string;
  contactNumber: string | null;
  status: string;
  isVerified: boolean;
  hasVerifiedBadge: boolean;
  gender?: string;
  createdAt: string;
};

export type UserResponse = {
  success: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: User[];
};

type Props = {
  users: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  searchParams: {
    searchTerm: string;
    role: string;
    status: string;
    gender: string;
    isVerified: boolean | undefined;
    hasVerifiedBadge: boolean | undefined;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
};

export default function UsersTable({ users, meta, searchParams }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.searchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    searchParams.searchTerm
  );
  const previousDebouncedSearchTerm = useRef(searchParams.searchTerm);

  const totalPages = Math.ceil(meta.total / meta.limit);

  const updateQuery = useCallback(
    (updates: Record<string, string | number | boolean | undefined>) => {
      const newParams = new URLSearchParams(params.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === "" || value === undefined) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });
      router.push(`?${newParams.toString()}`);
    },
    [params, router]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (
      debouncedSearchTerm !== previousDebouncedSearchTerm.current &&
      debouncedSearchTerm !== searchParams.searchTerm
    ) {
      updateQuery({ searchTerm: debouncedSearchTerm, page: 1 });
      previousDebouncedSearchTerm.current = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm, searchParams.searchTerm, updateQuery]);

  const handleSort = (field: string) => {
    const currentSort = searchParams.sortBy;
    const currentOrder = searchParams.sortOrder;

    let newOrder: "asc" | "desc" = "desc";
    if (currentSort === field) {
      newOrder = currentOrder === "asc" ? "desc" : "asc";
    }

    updateQuery({
      sortBy: field,
      sortOrder: newOrder,
    });
  };

  const getSortIcon = (field: string) => {
    const currentSort = searchParams.sortBy;
    const currentOrder = searchParams.sortOrder;

    if (currentSort !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }

    return currentOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() =>
                updateQuery({
                  searchTerm: "",
                  role: "all",
                  status: "all",
                  gender: "all",
                  isVerified: undefined,
                  hasVerifiedBadge: undefined,
                  page: 1,
                })
              }
            >
              Clear Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select
                value={searchParams.role}
                onValueChange={(value) => updateQuery({ role: value, page: 1 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={searchParams.status}
                onValueChange={(value) =>
                  updateQuery({ status: value, page: 1 })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="BLOCKED">Blocked</SelectItem>
                  <SelectItem value="DELETED">Deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <Select
                value={searchParams.gender}
                onValueChange={(value) =>
                  updateQuery({ gender: value, page: 1 })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Verified</label>
              <Select
                value={
                  searchParams.isVerified === undefined
                    ? "all"
                    : searchParams.isVerified
                    ? "true"
                    : "false"
                }
                onValueChange={(value) =>
                  updateQuery({
                    isVerified:
                      value === "all"
                        ? undefined
                        : value === "true"
                        ? true
                        : false,
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="true">Verified</SelectItem>
                  <SelectItem value="false">Not Verified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Verified Badge</label>
              <Select
                value={
                  searchParams.hasVerifiedBadge === undefined
                    ? "all"
                    : searchParams.hasVerifiedBadge
                    ? "true"
                    : "false"
                }
                onValueChange={(value) =>
                  updateQuery({
                    hasVerifiedBadge:
                      value === "all"
                        ? undefined
                        : value === "true"
                        ? true
                        : false,
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select badge status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="true">Has Badge</SelectItem>
                  <SelectItem value="false">No Badge</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("fullName")}
                      className="h-auto p-0 font-semibold"
                    >
                      User
                      {getSortIcon("fullName")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("email")}
                      className="h-auto p-0 font-semibold"
                    >
                      Email
                      {getSortIcon("email")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("role")}
                      className="h-auto p-0 font-semibold"
                    >
                      Role
                      {getSortIcon("role")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("status")}
                      className="h-auto p-0 font-semibold"
                    >
                      Status
                      {getSortIcon("status")}
                    </Button>
                  </TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("createdAt")}
                      className="h-auto p-0 font-semibold"
                    >
                      Joined
                      {getSortIcon("createdAt")}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.fullName?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.fullName}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.contactNumber || "No phone"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "ADMIN" ? "default" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "ACTIVE"
                            ? "default"
                            : user.status === "BLOCKED"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {user.isVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">
                          {user.isVerified ? "Verified" : "Not Verified"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.hasVerifiedBadge && (
                        <div className="flex items-center gap-1">
                          <ShieldCheck className="h-4 w-4 text-blue-500" />
                          <Badge variant="outline" className="text-xs">
                            Verified
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(user.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <ViewUserModal userId={user.id} />
                        <EditUserModal userId={user.id} onSuccess={() => {}} />
                        <DeleteUserModal
                          userId={user.id}
                          onSuccess={() => {}}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No users found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(meta.page - 1) * meta.limit + 1} to{" "}
            {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}{" "}
            results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuery({ page: meta.page - 1 })}
              disabled={meta.page <= 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={meta.page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateQuery({ page: pageNum })}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="px-2">...</span>
                  <Button
                    variant={meta.page === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateQuery({ page: totalPages })}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuery({ page: meta.page + 1 })}
              disabled={meta.page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
