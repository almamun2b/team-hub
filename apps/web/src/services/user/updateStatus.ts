"use server";

import { $fetch } from "@/lib/fetch";
import type {
  UpdateUserStatusPayload,
  UpdateUserStatusResponse,
} from "@/types/user";
import { revalidateTag } from "next/cache";

export async function updateStatus({
  id,
  payload,
}: {
  id: string;
  payload: UpdateUserStatusPayload;
}): Promise<UpdateUserStatusResponse> {
  try {
    const data = await $fetch.patch<UpdateUserStatusResponse>(
      `/user/${id}/status`,
      payload
    );

    if (data?.success) {
      revalidateTag("users", "");
    }

    return (
      data || {
        success: false,
        message: "Failed to update user status",
      }
    );
  } catch (error: unknown) {
    console.log("UPDATE_USER_STATUS_ERROR:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
