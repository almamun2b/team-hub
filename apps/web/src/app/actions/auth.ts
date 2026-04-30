/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AuthResponse } from "@/types/travelPlan";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginActionState =
  | undefined
  | {
      success: boolean;
      message: string;
      fieldErrors?: {
        email?: string;
        password?: string;
      };
    };

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const fieldErrors: NonNullable<LoginActionState> extends { fieldErrors?: infer E }
    ? E
    : never = {} as any;

  if (!email) fieldErrors.email = "Email is required";
  if (!password) fieldErrors.password = "Password is required";

  if (fieldErrors.email || fieldErrors.password) {
    return {
      success: false,
      message: "Please fix the errors",
      fieldErrors,
    };
  }

  // For login action, we need to use native fetch to get Response object for cookie handling
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/v1/auth/login`;
  
  const res = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
    cache: "no-store",
  });

  // IMPORTANT:
  // This is a server-to-server request. Browsers will NOT automatically receive
  // Set-Cookie from this fetch call. We must copy cookies onto the Next.js response.
  const cookieStore = await cookies();
  const getSetCookie = (res.headers as unknown as { getSetCookie?: () => string[] })
    .getSetCookie;
  const setCookieHeaders = typeof getSetCookie === "function" ? getSetCookie.call(res.headers) : [];

  for (const raw of setCookieHeaders) {
    const parts = raw.split(";").map((p) => p.trim());
    const [nameValue, ...attrs] = parts;
    const eqIdx = nameValue.indexOf("=");
    if (eqIdx <= 0) continue;

    const name = nameValue.slice(0, eqIdx);
    const value = nameValue.slice(eqIdx + 1);

    // Only persist auth cookies we care about.
    if (name !== "accessToken" && name !== "refreshToken") continue;

    const parsed = parse(raw);
    const maxAgeRaw = parsed["Max-Age"];
    const maxAge = maxAgeRaw ? Number.parseInt(String(maxAgeRaw), 10) : undefined;
    const path = parsed.Path || "/";

    const sameSiteRaw = (parsed as any).SameSite as string | undefined;
    const sameSite =
      sameSiteRaw?.toLowerCase() === "none"
        ? ("none" as const)
        : sameSiteRaw?.toLowerCase() === "strict"
          ? ("strict" as const)
          : ("lax" as const);

    const secure = attrs.some((a) => a.toLowerCase() === "secure");

    cookieStore.set(name, value, {
      httpOnly: true,
      secure,
      sameSite,
      maxAge,
      path,
    });
  }

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  let data: AuthResponse | null = null;
  let rawText: string | null = null;

  if (isJson) {
    try {
      data = (await res.json()) as AuthResponse;
    } catch {
      data = null;
    }
  } else {
    try {
      rawText = await res.text();
    } catch {
      rawText = null;
    }
  }

  if (res.status === 403) {
    redirect(`/verify-email?email=${encodeURIComponent(email)}`);
  }

  if (!res.ok || !data?.success) {
    return {
      success: false,
      message:
        data?.message ||
        rawText ||
        `Login failed (HTTP ${res.status})`,
    };
  }

  redirect("/");
}
