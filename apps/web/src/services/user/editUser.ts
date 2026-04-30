import { $fetch } from "@/lib/fetch";
import type { EditUserPayload, EditUserResponse } from "@/types/user";
import { revalidateTag } from "next/cache";

export async function editUser({
  id,
  payload,
}: {
  id: string;
  payload: EditUserPayload;
}): Promise<EditUserResponse> {
  try {
    const data = await $fetch.patch<EditUserResponse>(`/user/${id}`, payload);

    if (data?.success) {
      revalidateTag("users", "");
    }

    return (
      data || {
        success: false,
        message: "Failed to update user",
      }
    );
  } catch (error: unknown) {
    console.log("EDIT_USER_ERROR:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
