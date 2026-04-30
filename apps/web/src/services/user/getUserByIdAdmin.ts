import { $fetch } from "@/lib/fetch";
import type { AdminUserResponse } from "@/types/user";

export async function getUserById({
  id,
}: {
  id: string;
}): Promise<AdminUserResponse> {
  try {
    const data = await $fetch.get<AdminUserResponse>(`/user/${id}`);
    return (
      data || {
        success: false,
        message: "Failed to fetch user",
        data: undefined,
      }
    );
  } catch (error: unknown) {
    console.log("GET_USER_BY_ID_ERROR:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: undefined,
    };
  }
}
