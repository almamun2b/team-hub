"use client";

import { DynamicFormField } from "@/components/shared/DynamicFormField";
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
import { Input } from "@/components/ui/input";
import { createAdmin, type CreateAdminData } from "@/services/user/createAdmin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Upload } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  contactNumber: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type CreateAdminFormData = z.infer<typeof createAdminSchema>;

interface CreateAdminModalProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({
  trigger,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<CreateAdminFormData>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      email: "",
      fullName: "",
      contactNumber: "",
      password: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: CreateAdminFormData) => {
    try {
      setIsLoading(true);

      const adminData: CreateAdminData = {
        email: data.email,
        fullName: data.fullName,
        contactNumber: data.contactNumber,
        password: data.password,
      };

      const result = await createAdmin({
        file: selectedFile,
        data: adminData,
      });

      if (result && result.success) {
        toast.success("Admin created successfully");
        setIsOpen(false);
        form.reset();
        setSelectedFile(null);
        onSuccess?.();
      } else {
        throw new Error(result?.message || "Failed to create admin");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create admin";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Admin
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Admin</DialogTitle>
          <DialogDescription>
            Create a new admin account with profile image. The admin will have
            full access to the system.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DynamicFormField
              name="email"
              label="Email Address"
              description="Admin's email address for login"
            >
              {(field) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="admin@example.com"
                  disabled={isLoading}
                />
              )}
            </DynamicFormField>

            <DynamicFormField
              name="fullName"
              label="Full Name"
              description="Admin's full name"
            >
              {(field) => (
                <Input {...field} placeholder="John Doe" disabled={isLoading} />
              )}
            </DynamicFormField>

            <DynamicFormField
              name="contactNumber"
              label="Contact Number"
              description="Optional contact number"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="+1234567890"
                  disabled={isLoading}
                />
              )}
            </DynamicFormField>

            <DynamicFormField
              name="password"
              label="Password"
              description="Password for admin login (min 6 characters)"
            >
              {(field) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              )}
            </DynamicFormField>

            <div className="space-y-2">
              <label className="text-sm font-medium">Profile Image</label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="hidden"
                  id="profile-image"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("profile-image")?.click()
                  }
                  disabled={isLoading}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {selectedFile ? selectedFile.name : "Choose Image"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload a profile image for the admin (JPG, PNG, etc.)
              </p>
            </div>

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
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Create Admin
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminModal;
