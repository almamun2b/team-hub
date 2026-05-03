"use client";

import { Notification } from "@/types/notification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { markNotificationAsReadAction, markAllNotificationsAsReadAction } from "@/actions/notification.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface NotificationsPageProps {
  notifications: Notification[];
  unreadCount: number;
}

export function NotificationsPage({ notifications, unreadCount }: NotificationsPageProps) {
  const router = useRouter();

  const handleMarkAsRead = async (id: string) => {
    const result = await markNotificationAsReadAction(id);
    if (result?.success) {
      toast.success("Marked as read");
      router.refresh();
    } else {
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    const result = await markAllNotificationsAsReadAction();
    if (result?.success) {
      toast.success("All marked as read");
      router.refresh();
    } else {
      toast.error("Failed to mark all as read");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notifications</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card key={notification.id} className={notification.isRead ? "" : "border-primary"}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {!notification.isRead && (
                        <Badge variant="default" className="text-xs">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="ml-2"
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
