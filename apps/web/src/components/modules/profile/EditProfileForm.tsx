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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { DynamicFormField } from "@/components/shared/DynamicFormField";
import { StringListInput } from "@/components/shared/StringListInput";
import { updateMyProfile } from "@/services/user/updateMyProfile";
import { useRouter } from "next/navigation";
import z from "zod";

const updateProfileSchema = z.object({
  fullName: z.string().min(3, "Full name is too short"),
  email: z.string().email(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  contactNumber: z.string().optional(),
  currentLocation: z.string().optional(),
  bio: z.string().max(500).optional(),
  travelInterests: z.array(z.string()).optional(),
  visitedCountries: z.array(z.string()).optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date || date === "") return true;

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) return false;
        const parsed = new Date(date);
        return !isNaN(parsed.getTime());
      },
      { message: "Invalid date format. Please use YYYY-MM-DD format" },
    ),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

interface UpdateProfileFormProps {
  user: {
    fullName: string;
    email: string;
    avatar?: string | null;
    gender?: "MALE" | "FEMALE";
    contactNumber?: string;
    currentLocation?: string;
    bio?: string;
    travelInterests?: string[];
    visitedCountries?: string[];
    dateOfBirth?: string;
    role: string;
    status: string;
    hasVerifiedBadge: boolean;
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
      gender: user.gender,
      contactNumber: user.contactNumber ?? "",
      currentLocation: user.currentLocation ?? "",
      bio: user.bio ?? "",
      travelInterests: user.travelInterests ?? [],
      visitedCountries: user.visitedCountries ?? [],
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
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
    const processedData = {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth).toISOString()
        : undefined,
    };
    console.log(processedData, "processedData");
    const res = await updateMyProfile({
      file: avatarFile,
      data: processedData as any,
    });

    if (res.success) {
      router.push("/profile");
      toast.success(res.message);
    }
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

          {/* Gender */}
          <DynamicFormField name="gender" label="Gender">
            {(field) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          </DynamicFormField>

          <DynamicFormField name="contactNumber" label="Contact Number">
            {(field) => <Input {...field} />}
          </DynamicFormField>

          <DynamicFormField name="currentLocation" label="Current Location">
            {(field) => <Input {...field} />}
          </DynamicFormField>

          <DynamicFormField name="dateOfBirth" label="Date of Birth">
            {(field) => <Input {...field} type="date" />}
          </DynamicFormField>
        </div>

        {/* Bio */}
        <DynamicFormField name="bio" label="Bio">
          {(field) => (
            <Textarea
              {...field}
              rows={4}
              placeholder="Tell something about yourself..."
            />
          )}
        </DynamicFormField>

        {/* Interests */}
        <DynamicFormField name="travelInterests" label="Travel Interests">
          {(field) => (
            <StringListInput
              value={field.value}
              onChange={field.onChange}
              placeholder="e.g. Sea, Forest, Hills"
            />
          )}
        </DynamicFormField>

        <DynamicFormField name="visitedCountries" label="Visited Countries">
          {(field) => (
            <StringListInput
              value={field.value}
              onChange={field.onChange}
              placeholder="e.g. Bangladesh, Nepal"
            />
          )}
        </DynamicFormField>

        {/* Meta */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{user.role}</Badge>
          <Badge variant="outline">{user.status}</Badge>
          {user.hasVerifiedBadge && <Badge>Verified</Badge>}
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
