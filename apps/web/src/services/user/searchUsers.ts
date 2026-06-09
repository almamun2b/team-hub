import { $fetch } from "@/lib/fetch";
import { User } from "@/types/auth";

export const searchUsers = async (
  searchTerm: string,
): Promise<{ success: boolean; message?: string; data?: User[] }> => {
  if (!searchTerm?.trim()) {
    return { success: true, data: [] };
  }

  const response = await $fetch.get<{
    success: boolean;
    message?: string;
    data?: User[];
  }>("/users/search", {
    params: {
      searchTerm: searchTerm.trim(),
    },
  });

  return response || { success: false };
};
