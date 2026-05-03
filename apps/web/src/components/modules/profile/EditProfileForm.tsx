/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DynamicFormField } from "@/components/shared/DynamicFormField";
import { updateMyProfile } from "@/services/user/updateMyProfile";
import { useRouter } from "next/navigation";
import z from "zod";

const updateProfileSchema = z.object({
  fullName: z.string().min(3, "Full name is too short"),
  email: z.string().email(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

interface UpdateProfileFormProps {
  user: {
    fullName: string;
    email: string;
    avatar?: string | null;
    role: string;
    status: string;
  };
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  /** ----------------------------
   * Avatar state (UI only)
   * ---------------------------- */
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatar ?? null,
  );
  const router = useRouter();

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
    },
  });

  /** ----------------------------
   * Avatar validation
   * ---------------------------- */
  const handleAvatarChange = (file?: File) => {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    const res = await updateMyProfile({
      file: avatarFile,
      data: { fullName: data.fullName },
    });

    if (res.success) {
      router.push("/dashboard/profile");
      toast.success(res.message);
      return;
    }

    toast.error(res.message || "Failed to update profile");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto mt-10"
      >
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarPreview ?? ""} />
            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleAvatarChange(e.target.files?.[0])}
            />
            <p className="text-xs text-muted-foreground">
              JPG, PNG, WEBP • Max 2MB
            </p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid gap-6 md:grid-cols-2">
          <DynamicFormField name="fullName" label="Full Name">
            {(field) => <Input {...field} />}
          </DynamicFormField>

          <DynamicFormField name="email" label="Email">
            {(field) => <Input {...field} disabled />}
          </DynamicFormField>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{user.role}</Badge>
          <Badge variant="outline">{user.status}</Badge>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
