"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PendingRequest } from "@/types/travelPlan";
import { Check, MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RespondToRequestModal from "./RespondToRequestModal";

interface PendingRequestsProps {
  pendingRequests: PendingRequest[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PendingRequests: React.FC<PendingRequestsProps> = ({
  pendingRequests,
}) => {
  const router = useRouter();
  const [modalAction, setModalAction] = useState<"accept" | "reject" | null>(
    null
  );
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAcceptClick = (request: PendingRequest) => {
    setSelectedRequest(request);
    setModalAction("accept");
    setIsModalOpen(true);
  };

  const handleRejectClick = (request: PendingRequest) => {
    setSelectedRequest(request);
    setModalAction("reject");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    setModalAction(null);
  };

  const handleResponseSuccess = () => {
    router.refresh();
  };

  if (pendingRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          You don&apos;t have any pending requests for your travel plans.
        </div>
        <Button
          className="mt-4"
          onClick={() => router.push("/travel-plans/my-plans")}
        >
          View My Travel Plans
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pending Requests</h1>
        <p className="text-muted-foreground">
          Review and respond to requests for your travel plans
        </p>
      </div>

      <div className="grid gap-4">
        {pendingRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">
                    {request.travelPlan.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {request.travelPlan.destination}
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">PENDING</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={request.user.avatar || undefined}
                    alt={request.user.fullName}
                  />
                  <AvatarFallback>
                    {request.user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{request.user.fullName}</span>
                    {request.user.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Requested {formatDate(request.createdAt)}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm font-medium">Message:</div>
                <p className="text-sm text-muted-foreground">
                  {request.message}
                </p>
              </div>

              {request.user.travelInterests.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Travel Interests:</div>
                    <div className="flex flex-wrap gap-1">
                      {request.user.travelInterests.map((interest, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Plan ID: {request.travelPlanId}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(`/travel-plan/${request.travelPlanId}`)
                    }
                  >
                    View Plan
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleAcceptClick(request)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRejectClick(request)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Response Modal */}
      <RespondToRequestModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        request={selectedRequest}
        action={modalAction}
        onSuccess={handleResponseSuccess}
      />
    </div>
  );
};

export default PendingRequests;
