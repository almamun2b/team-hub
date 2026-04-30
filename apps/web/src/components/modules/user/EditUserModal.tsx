"use client";

import { DynamicFormField } from "@/components/shared/DynamicFormField";
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
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { getUserById as getUserByIdAdmin } from "@/services/user/getUserByIdAdmin";
import { updateStatus } from "@/services/user/updateStatus";
import type { AdminUser } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const editUserSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED", "DELETED"]),
  isVerified: z.boolean(),
  hasVerifiedBadge: z.boolean(),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

interface EditUserModalProps {
  userId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  userId,
  trigger,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      status: "ACTIVE",
      isVerified: false,
      hasVerifiedBadge: false,
    },
  });

  const fetchUser = async () => {
    if (!userId) return;

    try {
      setIsFetching(true);
      const result = await getUserByIdAdmin({ id: userId });

      if (result.success && result.data) {
        setUser(result.data);
        form.reset({
          status: result.data.status || "ACTIVE",
          isVerified: result.data.isVerified || false,
          hasVerifiedBadge: result.data.hasVerifiedBadge || false,
        });
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
      form.reset();
    }
  };

  const onSubmit = async (data: EditUserFormData) => {
    if (!userId) return;

    try {
      setIsLoading(true);

      const result = await updateStatus({
        id: userId,
        payload: {
          status: data.status,
          isVerified: data.isVerified,
          hasVerifiedBadge: data.hasVerifiedBadge,
        },
      });

      if (result.success) {
        toast.success("User status updated successfully");
        setIsOpen(false);
        form.reset();
        onSuccess?.();
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update user";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="p-1 border hover:border-gray-100 rounded">
            <Edit className="h-4 w-4" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User Status</DialogTitle>
          <DialogDescription>
            Update user status, verification, and badge settings
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* User Info Display */}
              {user && (
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
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
                      <AvatarFallback className="text-lg">
                        {user.fullName?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{user.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          user.role === "ADMIN" ? "default" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                      <Badge variant="outline">{user.status}</Badge>
                    </div>
                  </div>
                </div>
              )}

              <DynamicFormField
                name="status"
                label="Account Status"
                description="Current status of the user account"
              >
                {(field) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
                      <SelectItem value="DELETED">Deleted</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </DynamicFormField>

              <DynamicFormField
                name="isVerified"
                label="Email Verified"
                description="Whether the user's email has been verified"
              >
                {(field) => (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVerified"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                    <label htmlFor="isVerified" className="text-sm font-medium">
                      {field.value ? "Verified" : "Not Verified"}
                    </label>
                  </div>
                )}
              </DynamicFormField>

              <DynamicFormField
                name="hasVerifiedBadge"
                label="Verified Badge"
                description="Whether the user has a verified badge"
              >
                {(field) => (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hasVerifiedBadge"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="hasVerifiedBadge"
                      className="text-sm font-medium"
                    >
                      {field.value ? "Has Badge" : "No Badge"}
                    </label>
                  </div>
                )}
              </DynamicFormField>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                      Update User
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
