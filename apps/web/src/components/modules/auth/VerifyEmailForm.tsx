/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DynamicFormField } from "@/components/shared/DynamicFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  resendVerificationCode,
  verifyEmailAction,
} from "@/services/auth/verifyEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 characters" })
    .regex(/^[A-Z0-9]+$/i, {
      message: "OTP can only contain letters and numbers",
    }),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export function VerifyEmailForm({ email }: any) {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const isLoading = form.formState.isSubmitting;

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const otpValue = watch("otp");

  const onSubmit = async (data: VerifyEmailFormData) => {
    const res = await verifyEmailAction({ email, code: data.otp });

    if (res.success) {
      toast.success(res.message);
      router.push("/login");
    } else {
      toast.error(res.message);
      setValue("otp", "");
    }
  };

  const handleOtpChange = (value: string) => {
    setValue("otp", value, {
      shouldValidate: true,
    });
  };

  const resentCode = async () => {
    setIsResending(true);
    const res = await resendVerificationCode({ email });
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setIsResending(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
      <p className="text-center text-muted-foreground">
        Enter the 6-digit OTP sent to{" "}
        <span className="font-medium">{email}</span>
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mx-auto">
          <DynamicFormField
            name="otp"
            label="OTP *"
            description="Enter the 6-digit code sent to your email"
          >
            {() => (
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otpValue}
                onChange={handleOtpChange}
                autoFocus
                aria-invalid={!!errors.otp}
                className="w-full"
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className={errors.otp ? "border-destructive" : ""}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          </DynamicFormField>

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting || !isValid}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>

          {/* Optional: Resend OTP button */}
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={resentCode}
              disabled={isSubmitting || isResending}
              className="cursor-pointer"
            >
              Didnt receive OTP? Resend
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
