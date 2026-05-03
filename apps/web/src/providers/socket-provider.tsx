"use client";

import { createContext, useContext, useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { getSocket } from "@/lib/socket";
import { useStore } from "@/store/useStore";

const SocketContext = createContext<ReturnType<typeof getSocket> | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const [socket, setSocket] = useState<ReturnType<typeof getSocket> | null>(null);
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setSocket(getSocket());
  }, []);

  useEffect(() => {
    if (isClient && socket && user) {
      socket.connect();
      socket.emit("identify", user.id);

      // Listen for real-time updates
      const handleUpdate = () => {
        router.refresh();
      };

      socket.on("goal:created", handleUpdate);
      socket.on("goal:updated", handleUpdate);
      socket.on("announcement:created", handleUpdate);
      socket.on("announcement:updated", handleUpdate);
      socket.on("action-item:created", handleUpdate);
      socket.on("action-item:updated", handleUpdate);
      socket.on("notification:new", handleUpdate);
    } else if (isClient && socket) {
      socket.disconnect();
    }

    return () => {
      if (isClient && socket) {
        socket.off("goal:created");
        socket.off("goal:updated");
        socket.off("announcement:created");
        socket.off("announcement:updated");
        socket.off("action-item:created");
        socket.off("action-item:updated");
        socket.off("notification:new");
        socket.disconnect();
      }
    };
  }, [user, socket, router, isClient]);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}