/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { AuthService } from "@/services/auth.service";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await AuthService.login({ email, password });

    if (response && response.success) {
      const cookieStore = await cookies();
      
      // The backend likely sets the refreshToken cookie itself via Set-Cookie
      // but we might need to set the accessToken if it's returned in the body
      if (response.data.accessToken) {
        cookieStore.set("accessToken", response.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }

      // Store user info in a cookie or session if needed, 
      // or just rely on the token for future /me calls
    } else {
      return { error: response?.message || "Login failed" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }

  redirect("/dashboard");
}

export async function registerAction(prevState: any, formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await AuthService.register({ fullName, email, password });

    if (response && response.success) {
      // After registration, we might log them in or redirect to login
      // If the backend returns tokens on register, handle them here
    } else {
      return { error: response?.message || "Registration failed" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }

  redirect("/login");
}

export async function logoutAction() {
  await AuthService.logout();
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/login");
}

export async function getMeAction() {
  return await AuthService.getMe();
}
