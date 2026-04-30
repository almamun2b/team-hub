"use server";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookie = async (
  key: string,
  value: string,
  options?: Partial<ResponseCookie>
) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    path: "/",
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    httpOnly: process.env.NODE_ENV === "production",
    ...options,
  });
};

export const getCookie = async (key: string): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value || null;
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};

export const getAllCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.getAll();
};
