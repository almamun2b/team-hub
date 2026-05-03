"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Notification } from "@/types/notification";
import { markNotificationAsReadAction, markAllNotificationsAsReadAction } from "@/actions/notification.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NotificationCenterProps {
  initialNotifications: Notification[];
  unreadCount: number;
}

export function NotificationCenter({
  initialNotifications,
  unreadCount: initialUnreadCount,
}: NotificationCenterProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [open, setOpen] = useState(false);

  const handleMarkAsRead = async (id: string) => {
    const result = await markNotificationAsReadAction(id);
    if (result?.success) {
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(Math.max(0, unreadCount - 1));
      router.refresh();
    } else {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    const result = await markAllNotificationsAsReadAction();
    if (result?.success) {
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      router.refresh();
    } else {
      toast.error("Failed to mark all notifications as read");
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <Button size="sm" variant="ghost" onClick={handleMarkAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    notification.isRead
                      ? "bg-muted hover:bg-muted/80"
                      : "bg-primary/10 hover:bg-primary/20"
                  }`}
                  onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="h-2 w-2 rounded-full bg-primary ml-2 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
