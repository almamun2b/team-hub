"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getApprovedRequestsForThisPlan } from "@/services/travelPlans/getApprovedRequestsForThisPlan";
import type { ApprovedRequest } from "@/types/travelPlan";
import { CheckCircle, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

interface ApprovedRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelPlanId: string;
  travelPlanTitle: string;
}

const ApprovedRequestsModal: React.FC<ApprovedRequestsModalProps> = ({
  isOpen,
  onClose,
  travelPlanId,
  travelPlanTitle,
}) => {
  const [approvedRequests, setApprovedRequests] = useState<ApprovedRequest[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && travelPlanId) {
      fetchApprovedRequests();
    }
  }, [isOpen, travelPlanId]);

  const fetchApprovedRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getApprovedRequestsForThisPlan({ travelPlanId });
      if (result.success) {
        setApprovedRequests(result.data);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Failed to fetch approved requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Approved Requests
          </DialogTitle>
          <DialogDescription>
            View all approved requests for &quot;{travelPlanTitle}&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">
                Loading approved requests...
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-600">{error}</div>
              <Button
                onClick={fetchApprovedRequests}
                className="mt-2"
                size="sm"
              >
                Try Again
              </Button>
            </div>
          ) : approvedRequests.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">
                No approved requests found for this travel plan.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {approvedRequests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
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

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {request.user.fullName}
                          </span>
                          {request.user.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Request ID: {request.id}
                        </div>
                      </div>
                    </div>

                    <Badge className="bg-green-100 text-green-800">
                      Approved
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Request Message:</div>
                    <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                      {request.message}
                    </div>
                  </div>

                  {request.user.bio && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Bio:</div>
                      <div className="text-sm text-muted-foreground">
                        {request.user.bio}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">
                        Contact Information:
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="mr-2 h-4 w-4" />
                          {request.user.email}
                        </div>
                        {request.user.contactNumber && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="mr-2 h-4 w-4" />
                            {request.user.contactNumber}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">
                        Travel Interests:
                      </div>
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
                  </div>

                  {request.user.visitedCountries.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">
                        Visited Countries:
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {request.user.visitedCountries.join(", ")}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovedRequestsModal;
