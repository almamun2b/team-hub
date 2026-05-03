export type NotificationType = "MENTION" | "INVITE" | "GOAL_UPDATE" | "ACTION_ASSIGNED";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
}

export interface NotificationsResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    unreadCount: number;
  };
}