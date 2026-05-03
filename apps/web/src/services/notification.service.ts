import { $fetch } from "@/lib/fetch";
import { NotificationsResponse } from "@/types/notification";

export class NotificationService {
  static async getNotifications(): Promise<NotificationsResponse> {
    const response = await $fetch.get<NotificationsResponse>("/notifications");
    return response || { success: false, data: { notifications: [], unreadCount: 0 } };
  }

  static async markAsRead(id: string): Promise<{ success: boolean }> {
    const response = await $fetch.patch<{ success: boolean }>(`/notifications/${id}/read`);
    return response || { success: false };
  }

  static async markAllAsRead(): Promise<{ success: boolean }> {
    const response = await $fetch.patch<{ success: boolean }>("/notifications/read-all");
    return response || { success: false };
  }
}