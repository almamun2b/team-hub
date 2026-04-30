"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DynamicFormField } from "@/components/shared/DynamicFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { registerUser } from "@/services/auth/registerUser";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),

    fullName: z
      .string()
      .min(3, { message: "Full name is too short" })
      .max(50, { message: "Full name is too long" }),

    travelInterests: z.array(z.string()).optional(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      fullName: "",
      travelInterests: [],
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: RegisterFormData) => {
    const userInfo: Record<string, any> = {
      email: data.email,
      fullName: data.fullName,
      travelInterests: data.travelInterests,
      password: data.password,
    };

    try {
      const res = await registerUser(userInfo);
      if (res.success) {
        toast.success(res?.message || "Form submitted");
        router.push(`/verify-email?email=${userInfo.email}`);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to register");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <DynamicFormField name="fullName" label="Full Name *">
              {(field) => <Input {...field} placeholder="Your full name" />}
            </DynamicFormField>

            {/* Email */}
            <DynamicFormField name="email" label="Email Address *">
              {(field) => (
                <Input {...field} type="email" placeholder="you@example.com" />
              )}
            </DynamicFormField>

            {/* Travel Interests (Multi Select) */}
            <DynamicFormField name="travelInterests" label="Travel Interests">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((item: string, i: number) => (
                      <Badge
                        key={i}
                        className="cursor-pointer"
                        onClick={() =>
                          field.onChange(
                            field.value.filter((v: string) => v !== item)
                          )
                        }
                      >
                        {item} ✕
                      </Badge>
                    ))}
                  </div>

                  <Input
                    placeholder="Add interest & press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const value = e.currentTarget.value.trim();
                        if (value && !field.value.includes(value)) {
                          field.onChange([...field.value, value]);
                        }
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              )}
            </DynamicFormField>

            {/* Password */}
            <DynamicFormField name="password" label="Password *">
              {(field) => <Password {...field} />}
            </DynamicFormField>

            {/* Confirm Password */}
            <DynamicFormField name="confirmPassword" label="Confirm Password *">
              {(field) => <Password {...field} />}
            </DynamicFormField>

            {/* Submit */}
            <Button
              disabled={!form.formState.isValid || isLoading}
              type="submit"
              className="w-full"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
