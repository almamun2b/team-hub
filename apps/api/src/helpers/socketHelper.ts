import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { env } from "../config/env";
import prisma from "../shared/prisma";

interface ServerToClientEvents {
  user_status_changed: (data: {
    userId: string;
    status: "online" | "offline";
  }) => void;
  [key: string]: (data: any) => void;
}

interface ClientToServerEvents {
  identify: (userId: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId?: string;
}

let io: Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

const onlineUsers = new Map<string, Set<string>>();

const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: [env.clientUrl, "https://team-hub.up.railway.app"],
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 60000,
  });

  io.on("connection", (socket) => {
    console.log(`New socket connected: ${socket.id}`);

    socket.on("identify", async (userId: string) => {
      if (!userId) return;

      console.log(`Identifying user: ${userId} for socket: ${socket.id}`);

      socket.data.userId = userId;

      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId)?.add(socket.id);

      await joinWorkspaceRooms(socket, userId);

      if (onlineUsers.get(userId)?.size === 1) {
        io.emit("user_status_changed", { userId, status: "online" });
      }
    });

    socket.on("disconnect", () => {
      const userId = socket.data.userId;
      console.log(
        `Socket disconnected: ${socket.id} (User: ${userId || "unidentified"})`,
      );

      if (userId) {
        const userSockets = onlineUsers.get(userId);
        if (userSockets) {
          userSockets.delete(socket.id);

          if (userSockets.size === 0) {
            onlineUsers.delete(userId);
            console.log(`User ${userId} is now offline`);
            io.emit("user_status_changed", { userId, status: "offline" });
          }
        }
      }
    });
  });

  return io;
};

const joinWorkspaceRooms = async (socket: Socket, userId: string) => {
  try {
    const memberships = await prisma.workspaceMember.findMany({
      where: { userId },
      select: { workspaceId: true },
    });

    memberships.forEach((m) => {
      socket.join(m.workspaceId);
      console.log(
        `Socket ${socket.id} joined workspace room: ${m.workspaceId}`,
      );
    });
  } catch (error) {
    console.error(
      `Error joining workspace rooms for user ${userId}:`,
      error,
    );
  }
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

const sendMessageToUser = (userId: string, event: string, data: any) => {
  const socketIds = onlineUsers.get(userId);
  if (socketIds && io) {
    socketIds.forEach((socketId) => {
      io.to(socketId).emit(event, data);
    });
  }
};

const joinRoomForUser = (userId: string, roomId: string) => {
  const socketIds = onlineUsers.get(userId);
  if (socketIds && io) {
    socketIds.forEach((socketId) => {
      const socket = io.sockets.sockets.get(socketId);
      if (socket) {
        socket.join(roomId);
      }
    });
  }
};

const broadcastToWorkspace = (
  workspaceId: string,
  event: string,
  data: any,
) => {
  if (io) {
    io.to(workspaceId).emit(event, data);
  }
};

export const SocketHelper = {
  initSocket,
  getIO,
  sendMessageToUser,
  joinRoomForUser,
  broadcastToWorkspace,
};
