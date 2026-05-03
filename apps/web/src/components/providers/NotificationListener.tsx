"use client";

import { useEffect } from "react";
import { useSocket } from "@/hooks/use-socket";
import { useStore } from "@/store/useStore";

export function NotificationListener() {
  const socket = useSocket();
  const { addNotification } = useStore();

  useEffect(() => {
    if (!socket) return;

    socket.on("new_notification", (notification) => {
      addNotification(notification);
    });

    return () => {
      socket.off("new_notification");
    };
  }, [socket, addNotification]);

  return null;
}
