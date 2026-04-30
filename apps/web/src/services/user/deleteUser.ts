"use server";

import { $fetch } from "@/lib/fetch";
import type { DeleteUserResponse } from "@/types/user";
import { revalidateTag } from "next/cache";

export async function softDelete({
  id,
}: {
  id: string;
}): Promise<DeleteUserResponse> {
  try {
    const data = await $fetch.delete<DeleteUserResponse>(`/user/${id}`);

    if (data?.success) {
      revalidateTag("users", "");
    }

    return (
      data || {
        success: false,
        message: "Failed to delete user",
      }
    );
  } catch (error: unknown) {
    console.log("DELETE_USER_ERROR:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
