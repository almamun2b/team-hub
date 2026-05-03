"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(undefined, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      });
    }
    setSocket(socketInstance);
  }, []);

  return socket;
}
