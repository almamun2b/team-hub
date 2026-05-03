/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { NotificationService } from "@/services/notification.service";
import { updateTag } from "next/cache";

export async function getNotificationsAction() {
  try {
    const response = await NotificationService.getNotifications();
    return response;
  } catch (error: any) {
    return {
      success: false,
      data: { notifications: [], unreadCount: 0 },
      error: error.message || "Failed to fetch notifications",
    };
  }
}

export async function markNotificationAsReadAction(notificationId: string) {
  try {
    const response = await NotificationService.markAsRead(notificationId);
    updateTag("notifications");
    return response;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to mark notification as read",
    };
  }
}

export async function markAllNotificationsAsReadAction() {
  try {
    const response = await NotificationService.markAllAsRead();
    updateTag("notifications");
    return response;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to mark all notifications as read",
    };
  }
}
