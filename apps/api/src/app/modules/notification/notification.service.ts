import prisma from "../../../shared/prisma";
import { SocketHelper } from "../../../helpers/socketHelper";

const getMyNotifications = async (userId: string) => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = await prisma.notification.count({
    where: { userId, isRead: false },
  });

  return { notifications, unreadCount };
};

const markAsRead = async (id: string) => {
  const result = await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
  return result;
};

const markAllAsRead = async (userId: string) => {
  const result = await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
  return result;
};

const createNotification = async (payload: {
  userId: string;
  type: string;
  title: string;
  message: string;
  link?: string;
}) => {
  const result = await prisma.notification.create({
    data: {
      title: payload.title,
      message: payload.message,
      isRead: false,
      userId: payload.userId,
    },
  });

  // Real-time emission
  SocketHelper.sendMessageToUser(payload.userId, "new_notification", result);

  return result;
};

export const NotificationServices = {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
};
