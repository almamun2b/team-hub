"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { softDelete } from "@/services/user/deleteUser";
import { getUserById } from "@/services/user/getUserByIdAdmin";
import type { AdminUser } from "@/types/user";
import { format } from "date-fns";
import { Loader2, Trash2, UserX } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteUserModalProps {
  userId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  userId,
  trigger,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  const fetchUser = async () => {
    if (!userId) return;

    try {
      setIsFetching(true);
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
      setIsFetching(false);
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

  const handleDelete = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);

      const result = await softDelete({ id: userId });

      if (result.success) {
        toast.success("User deleted successfully");
        setIsOpen(false);
        setUser(null);
        onSuccess?.();
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete user";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="p-1 border hover:border-gray-100 rounded text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <UserX className="h-5 w-5" />
            Delete User
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and all associated data.
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : user ? (
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Avatar className="h-12 w-12">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.fullName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <AvatarFallback>
                    {user.fullName?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold">{user.fullName}</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                  <Badge variant="outline">{user.status}</Badge>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">
                You are about to delete this user:
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• All personal information will be removed</li>
                <li>• Travel plans and reviews will be deleted</li>
                <li>• Account access will be permanently revoked</li>
                <li>• This action cannot be undone</li>
              </ul>
            </div>

            {/* Additional User Details */}
            <div className="text-sm text-muted-foreground space-y-1">
              <div>
                <span className="font-medium">Member since:</span>{" "}
                {format(new Date(user.createdAt), "MMMM dd, yyyy")}
              </div>
              <div>
                <span className="font-medium">Travel Plans:</span>{" "}
                {user._count.travelPlans}
              </div>
              <div>
                <span className="font-medium">Reviews:</span>{" "}
                {user._count.reviewsReceived}
              </div>
            </div>

            {/* Confirmation */}
            <div className="p-3 bg-background rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Type &quot;DELETE&quot; to confirm:</strong>
              </p>
              <input
                type="text"
                placeholder={`Type "DELETE" to confirm`}
                className="mt-2 w-full p-2 border rounded text-sm"
                onChange={(e) => {
                  const deleteButton =
                    document.getElementById("confirm-delete-btn");
                  if (deleteButton) {
                    (deleteButton as HTMLButtonElement).disabled =
                      e.target.value !== "DELETE";
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">User not found</p>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            id="confirm-delete-btn"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading || !user}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete User
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
