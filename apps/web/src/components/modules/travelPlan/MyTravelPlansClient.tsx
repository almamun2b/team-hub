"use client";

import { Button } from "@/components/ui/button";
import type { TravelPlan } from "@/types/travelPlan";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import DeleteTravelPlanConfirmModal from "./DeleteTravelPlanConfirmModal";
import MyTravelPlansTable from "./MyTravelPlansTable";
import TravelPlanFormModal from "./TravelPlanFormModal";

interface MyTravelPlansClientProps {
  initialTravelPlans: TravelPlan[];
  initialSearchParams: {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
  initialMeta: {
    page: number;
    limit: number;
    total: number;
  };
}

const MyTravelPlansClient: React.FC<MyTravelPlansClientProps> = ({
  initialTravelPlans,
  initialMeta,
  initialSearchParams,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------------- URL = SOURCE OF TRUTH ---------------- */
  const page =
    Number(searchParams.get("page")) ||
    initialSearchParams.page ||
    initialMeta.page ||
    1;

  const limit =
    Number(searchParams.get("limit")) ||
    initialSearchParams.limit ||
    initialMeta.limit ||
    10;

  const sortBy =
    searchParams.get("sortBy") || initialSearchParams.sortBy || "createdAt";

  const sortOrder =
    (searchParams.get("sortOrder") as "asc" | "desc") ||
    initialSearchParams.sortOrder ||
    "desc";

  /* ---------------- STATE ---------------- */
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<TravelPlan | null>(null);

  const totalPages = Math.max(1, Math.ceil(initialMeta.total / limit));

  /* ---------------- SORT ---------------- */
  const handleSort = (field: string) => {
    const nextOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";

    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", field);
    params.set("sortOrder", nextOrder);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  /* ---------------- PAGINATION ---------------- */
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  /* ---------------- MODAL HANDLERS ---------------- */
  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    router.refresh();
  };

  const handleDeleteClick = (plan: TravelPlan) => {
    setPlanToDelete(plan);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    setPlanToDelete(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Travel Plans</h1>
          <p className="text-muted-foreground">
            Manage and organize your travel plans
          </p>
        </div>

        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Plan
        </Button>
      </div>

      {/* Table */}
      <MyTravelPlansTable
        travelPlans={initialTravelPlans}
        sortField={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        onDeleteClick={handleDeleteClick}
        onRefresh={() => router.refresh()}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, initialMeta.total)} of {initialMeta.total}{" "}
            results
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                .map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    variant={p === page ? "default" : "outline"}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </Button>
                ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Create Modal */}
      <TravelPlanFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Delete Modal */}
      <DeleteTravelPlanConfirmModal
        isOpen={isDeleteModalOpen}
        travelPlan={planToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPlanToDelete(null);
        }}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default MyTravelPlansClient;
