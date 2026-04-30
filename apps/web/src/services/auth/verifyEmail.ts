/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export async function verifyEmailAction({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  try {
    const data = await $fetch.post<any>("/auth/verify-email", {
      email,
      code,
    });

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Something went wrong",
    };
  }
}

export async function resendVerificationCode({ email }: { email: string }) {
  try {
    const data = await $fetch.post<any>("/auth/resend-verification-code", {
      email,
    });

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Something went wrong",
    };
  }
}
