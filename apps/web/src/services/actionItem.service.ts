import { $fetch } from "@/lib/fetch";
import { ActionItem, CreateActionItemPayload, UpdateActionItemPayload } from "@/types/actionItem";

export class ActionItemService {
  static async getActionItems(workspaceId: string): Promise<{ success: boolean; message?: string; data?: ActionItem[] }> {
    const response = await $fetch.get<{ success: boolean; message?: string; data?: ActionItem[] }>(`/action-items/workspace/${workspaceId}`, {
      cache: "force-cache",
      next: { tags: ["action-items", `action-items:${workspaceId}`] },
    });
    return response || { success: false };
  }

  static async createActionItem(payload: CreateActionItemPayload): Promise<{ success: boolean; message?: string; data?: ActionItem }> {
    const response = await $fetch.post<{ success: boolean; message?: string; data?: ActionItem }>("/action-items/create", payload);
    return response || { success: false };
  }

  static async updateActionItem(id: string, payload: UpdateActionItemPayload): Promise<{ success: boolean; message?: string; data?: ActionItem }> {
    const response = await $fetch.patch<{ success: boolean; message?: string; data?: ActionItem }>(`/action-items/${id}`, payload);
    return response || { success: false };
  }

  static async deleteActionItem(id: string): Promise<{ success: boolean; message?: string }> {
    const response = await $fetch.delete<{ success: boolean; message?: string }>(`/action-items/${id}`);
    return response || { success: false };
  }
}
