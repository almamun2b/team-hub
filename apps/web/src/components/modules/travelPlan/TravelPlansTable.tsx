"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  CalendarDays,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import DeleteTravelPlanModal from "./DeleteTravelPlanModal";
import UpdateTravelPlanStatusModal from "./UpdateTravelPlanStatusModal";
import ViewTravelPlanModal from "./ViewTravelPlanModal";

export type TravelPlan = {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelType: string;
  maxMembers: number;
  activities: string[];
  images: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    fullName: string;
    avatar: string | null;
    isVerified: boolean;
    hasVerifiedBadge: boolean;
  };
};

export type TravelPlanResponse = {
  success: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: TravelPlan[];
};

interface Props {
  travelPlans: TravelPlan[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  searchParams: {
    searchTerm?: string;
    travelType?: string;
    minBudget?: string;
    maxBudget?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  };
}

export default function TravelPlansTable({
  travelPlans,
  meta,
  searchParams,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.searchTerm || "");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    searchParams.searchTerm || ""
  );
  const [minBudget, setMinBudget] = useState(searchParams.minBudget || "");
  const [debouncedMinBudget, setDebouncedMinBudget] = useState(
    searchParams.minBudget || ""
  );
  const [maxBudget, setMaxBudget] = useState(searchParams.maxBudget || "");
  const [debouncedMaxBudget, setDebouncedMaxBudget] = useState(
    searchParams.maxBudget || ""
  );
  const previousDebouncedSearchTerm = useRef(searchParams.searchTerm || "");
  const previousDebouncedMinBudget = useRef(searchParams.minBudget || "");
  const previousDebouncedMaxBudget = useRef(searchParams.maxBudget || "");

  const totalPages = Math.ceil(meta.total / meta.limit);

  const updateQuery = useCallback(
    (updates: Record<string, string | number>) => {
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

  const handleSort = (field: string) => {
    const currentSort = searchParams.sortBy || "createdAt";
    const currentOrder = searchParams.sortOrder || "desc";

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
    const currentSort = searchParams.sortBy ?? "createdAt";
    const currentOrder = searchParams.sortOrder ?? "desc";

    if (currentSort !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }

    return currentOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMinBudget(minBudget);
    }, 300);

    return () => clearTimeout(timer);
  }, [minBudget]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMaxBudget(maxBudget);
    }, 300);

    return () => clearTimeout(timer);
  }, [maxBudget]);

  useEffect(() => {
    const updates: Record<string, string | number> = {};
    let hasUpdates = false;

    if (
      debouncedSearchTerm !== previousDebouncedSearchTerm.current &&
      debouncedSearchTerm !== (searchParams.searchTerm || "")
    ) {
      updates.searchTerm = debouncedSearchTerm;
      previousDebouncedSearchTerm.current = debouncedSearchTerm;
      hasUpdates = true;
    }

    if (
      debouncedMinBudget !== previousDebouncedMinBudget.current &&
      debouncedMinBudget !== (searchParams.minBudget || "")
    ) {
      updates.minBudget = debouncedMinBudget;
      previousDebouncedMinBudget.current = debouncedMinBudget;
      hasUpdates = true;
    }

    if (
      debouncedMaxBudget !== previousDebouncedMaxBudget.current &&
      debouncedMaxBudget !== (searchParams.maxBudget || "")
    ) {
      updates.maxBudget = debouncedMaxBudget;
      previousDebouncedMaxBudget.current = debouncedMaxBudget;
      hasUpdates = true;
    }

    if (hasUpdates) {
      updates.page = 1;
      updateQuery(updates);
    }
  }, [
    debouncedSearchTerm,
    debouncedMinBudget,
    debouncedMaxBudget,
    searchParams.searchTerm,
    searchParams.minBudget,
    searchParams.maxBudget,
    updateQuery,
  ]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Filters</CardTitle>
          <Button
            variant="outline"
            onClick={() =>
              updateQuery({
                searchTerm: "",
                travelType: "all",
                minBudget: "",
                maxBudget: "",
                startDate: "",
                endDate: "",
                status: "all",
                page: 1,
              })
            }
          >
            Clear Filters
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search travel plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Travel Type</label>
              <Select
                value={searchParams.travelType || "all"}
                onValueChange={(value) =>
                  updateQuery({ travelType: value, page: 1 })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="SOLO">Solo</SelectItem>
                  <SelectItem value="FAMILY">Family</SelectItem>
                  <SelectItem value="FRIENDS">Friends</SelectItem>
                  <SelectItem value="COUPLE">Couple</SelectItem>
                  <SelectItem value="GROUP">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={searchParams.status || "all"}
                onValueChange={(value) =>
                  updateQuery({ status: value, page: 1 })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Min Budget</label>
              <Input
                type="number"
                placeholder="Min budget..."
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Max Budget</label>
              <Input
                type="number"
                placeholder="Max budget..."
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={searchParams.startDate || ""}
                onChange={(e) =>
                  updateQuery({ startDate: e.target.value, page: 1 })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={searchParams.endDate || ""}
                onChange={(e) =>
                  updateQuery({ endDate: e.target.value, page: 1 })
                }
              />
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
                      onClick={() => handleSort("title")}
                      className="h-auto p-0 font-semibold"
                    >
                      Travel Plan
                      {getSortIcon("title")}
                    </Button>
                  </TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("budget")}
                      className="h-auto p-0 font-semibold"
                    >
                      Budget
                      {getSortIcon("budget")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("startDate")}
                      className="h-auto p-0 font-semibold"
                    >
                      Start Date
                      {getSortIcon("startDate")}
                    </Button>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("createdAt")}
                      className="h-auto p-0 font-semibold"
                    >
                      Created
                      {getSortIcon("createdAt")}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {travelPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="font-medium">{plan.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {plan.description}
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {plan.activities
                            .slice(0, 2)
                            .map((activity, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {activity}
                              </Badge>
                            ))}
                          {plan.activities.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{plan.activities.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={plan.creator.avatar || ""} />
                          <AvatarFallback>
                            {plan.creator.fullName
                              ?.substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {plan.creator.fullName}
                          </div>
                          {plan.creator.hasVerifiedBadge && (
                            <div className="flex items-center gap-1">
                              <ShieldCheck className="h-3 w-3 text-blue-500" />
                              <span className="text-xs text-blue-500">
                                Verified
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {plan.budget.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {format(new Date(plan.startDate), "MMM dd, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{plan.travelType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          plan.status === "OPEN"
                            ? "default"
                            : plan.status === "COMPLETED"
                            ? "default"
                            : plan.status === "CANCELLED"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(plan.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <ViewTravelPlanModal travelPlanId={plan.id} />
                        <UpdateTravelPlanStatusModal
                          travelPlanId={plan.id}
                          onSuccess={() => {}}
                        />
                        <DeleteTravelPlanModal
                          travelPlanId={plan.id}
                          onSuccess={() => {}}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {travelPlans.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No travel plans found matching your criteria.
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
