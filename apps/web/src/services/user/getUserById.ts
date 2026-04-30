/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export async function getUserById({ id }: { id: string }) {
  try {
    const data = await $fetch.get<any>(`/user/${id}`);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
