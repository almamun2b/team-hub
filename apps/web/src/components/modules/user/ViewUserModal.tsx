"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserById } from "@/services/user/getUserByIdAdmin";
import type { AdminUser } from "@/types/user";
import { format } from "date-fns";
import { Eye, Loader2, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface ViewUserModalProps {
  userId: string;
  trigger?: React.ReactNode;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ userId, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  const fetchUser = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const result = await getUserById({ id: userId });

      if (result.success && result.data) {
        setUser(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user";
      toast.error(errorMessage);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      fetchUser();
    } else {
      setUser(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "BLOCKED":
        return "destructive";
      case "INACTIVE":
        return "secondary";
      case "DELETED":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="p-1 border hover:border-gray-100 rounded">
            <Eye className="h-4 w-4" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View complete information about this user
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : user ? (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.fullName}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                ) : (
                  <AvatarFallback className="text-lg">
                    {user.fullName?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{user.fullName}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                  <Badge variant={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Contact Information</h4>
                <div className="space-y-1 text-sm">
                  {user.contactNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {user.contactNumber}
                    </div>
                  )}
                  {user.currentLocation && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {user.currentLocation}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Verification Status</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email Verified:</span>
                    <Badge variant={user.isVerified ? "default" : "secondary"}>
                      {user.isVerified ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Verified Badge:</span>
                    <Badge
                      variant={user.hasVerifiedBadge ? "default" : "secondary"}
                    >
                      {user.hasVerifiedBadge ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-2">
              <h4 className="font-medium">Personal Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {user.gender && (
                  <div>
                    <span className="font-medium">Gender:</span> {user.gender}
                  </div>
                )}
                {user.dateOfBirth && (
                  <div>
                    <span className="font-medium">Date of Birth:</span>{" "}
                    {format(new Date(user.dateOfBirth), "MMM dd, yyyy")}
                  </div>
                )}
              </div>
              {user.bio && (
                <div>
                  <span className="font-medium">Bio:</span>
                  <p className="mt-1 text-muted-foreground">{user.bio}</p>
                </div>
              )}
            </div>

            {/* Travel Information */}
            <div className="space-y-2">
              <h4 className="font-medium">Travel Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Travel Interests:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.travelInterests.length > 0 ? (
                      user.travelInterests.map((interest, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {interest}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">
                        No interests specified
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Visited Countries:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.visitedCountries.length > 0 ? (
                      user.visitedCountries.map((country, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {country}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">
                        No countries visited
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-2">
              <h4 className="font-medium">Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-2 bg-muted border rounded">
                  <div className="font-semibold">{user._count.travelPlans}</div>
                  <div className="text-muted-foreground">Travel Plans</div>
                </div>
                <div className="text-center p-2 bg-muted border rounded">
                  <div className="font-semibold">
                    {user._count.reviewsReceived}
                  </div>
                  <div className="text-muted-foreground">Reviews</div>
                </div>
                <div className="text-center p-2 bg-muted border rounded">
                  <div className="font-semibold">
                    {user.avgRating.toFixed(1)}
                  </div>
                  <div className="text-muted-foreground">Avg Rating</div>
                </div>
                <div className="text-center p-2 bg-muted border rounded">
                  <div className="font-semibold">
                    {format(new Date(user.createdAt), "MMM yyyy")}
                  </div>
                  <div className="text-muted-foreground">Joined</div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="space-y-2 text-sm">
              <h4 className="font-medium">Account Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">User ID:</span>
                  <div className="text-muted-foreground text-xs">{user.id}</div>
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>
                  <div>
                    {format(new Date(user.updatedAt), "MMM dd, yyyy HH:mm")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">User not found</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserModal;
