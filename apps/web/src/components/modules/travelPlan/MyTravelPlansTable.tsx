"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TravelPlan } from "@/types/travelPlan";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle,
  DollarSign,
  Edit,
  Eye,
  MapPin,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ApprovedRequestsModal from "./ApprovedRequestsModal";
import TravelPlanFormModal from "./TravelPlanFormModal";
import UpdateTravelPlanStatusModal from "./UpdateTravelPlanStatusModal";

interface MyTravelPlansTableProps {
  travelPlans: TravelPlan[];
  onSort: (field: string) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  onRefresh: () => void;
  onDeleteClick: (plan: TravelPlan) => void;
}

const MyTravelPlansTable: React.FC<MyTravelPlansTableProps> = ({
  travelPlans,
  onSort,
  sortField,
  sortOrder,
  onRefresh,
  onDeleteClick,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [isApprovedRequestsModalOpen, setIsApprovedRequestsModalOpen] =
    useState(false);
  const [selectedPlanForApprovedRequests, setSelectedPlanForApprovedRequests] =
    useState<TravelPlan | null>(null);

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "OPEN":
        return "default";
      case "COMPLETED":
        return "secondary";
      case "CANCELLED":
        return "destructive";
      case "FULL":
        return "outline";
      default:
        return "secondary";
    }
  };

  const handleEdit = (planId: string) => {
    setEditingPlan(planId);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditingPlan(null);
    onRefresh();
  };

  const handleApprovedRequestsClick = (plan: TravelPlan) => {
    setSelectedPlanForApprovedRequests(plan);
    setIsApprovedRequestsModalOpen(true);
  };

  const handleApprovedRequestsClose = () => {
    setIsApprovedRequestsModalOpen(false);
    setSelectedPlanForApprovedRequests(null);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Travel Plan</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort("travelType")}
                  className="h-auto p-0 font-semibold"
                >
                  Type
                  {getSortIcon("travelType")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort("budget")}
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
                  onClick={() => onSort("maxMembers")}
                  className="h-auto p-0 font-semibold"
                >
                  Members
                  {getSortIcon("maxMembers")}
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort("createdAt")}
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
                    {plan.images && plan.images.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {plan.images.slice(0, 3).map((image, index) => (
                          <div key={index} className="relative w-12 h-12">
                            <Image
                              src={image}
                              alt={`${plan.title} image ${index + 1}`}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        ))}
                        {plan.images.length > 3 && (
                          <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs">
                            +{plan.images.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {plan.destination}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{plan.travelType}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    {plan.budget?.toLocaleString() || "N/A"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {plan.maxMembers || "N/A"}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(plan.status)}>
                    {plan.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(plan.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <UpdateTravelPlanStatusModal
                      travelPlanId={plan.id}
                      onSuccess={() => {}}
                    />
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/travel-plan/${plan.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApprovedRequestsClick(plan)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(plan.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteClick(plan)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
            You haven&apos;t created any travel plans yet.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <TravelPlanFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPlan(null);
        }}
        travelPlanId={editingPlan || undefined}
        onSuccess={handleEditSuccess}
      />

      {/* Approved Requests Modal */}
      <ApprovedRequestsModal
        isOpen={isApprovedRequestsModalOpen}
        onClose={handleApprovedRequestsClose}
        travelPlanId={selectedPlanForApprovedRequests?.id || ""}
        travelPlanTitle={selectedPlanForApprovedRequests?.title || ""}
      />
    </>
  );
};

export default MyTravelPlansTable;
