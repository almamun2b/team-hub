"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { NotificationListener } from "./NotificationListener";

const SocketProvider = dynamic(() => import("@/providers/socket-provider").then(mod => ({ default: mod.SocketProvider })), {
  ssr: false,
  loading: () => <>{null}</>,
});

interface ClientSocketProviderProps {
  children: ReactNode;
}

export function ClientSocketProvider({ children }: ClientSocketProviderProps) {
  return (
    <SocketProvider>
      <NotificationListener />
      {children}
    </SocketProvider>
  );
}
