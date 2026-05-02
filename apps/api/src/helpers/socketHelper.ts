import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;

const onlineUsers = new Map<string, string>(); // userId -> socketId

const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "https://team-hub.up.railway.app"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_workspace", (data: { workspaceId: string, userId: string }) => {
      socket.join(data.workspaceId);
      onlineUsers.set(data.userId, socket.id);
      
      io.to(data.workspaceId).emit("user_status_changed", {
        userId: data.userId,
        status: "online"
      });
      
      console.log(`User ${data.userId} joined workspace ${data.workspaceId}`);
    });

    socket.on("disconnect", () => {
      let disconnectedUserId: string | undefined;
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        io.emit("user_status_changed", {
          userId: disconnectedUserId,
          status: "offline"
        });
      }
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

const sendMessageToUser = (userId: string, event: string, data: any) => {
  const socketId = onlineUsers.get(userId);
  if (socketId && io) {
    io.to(socketId).emit(event, data);
  }
};

export const SocketHelper = {
  initSocket,
  getIO,
  sendMessageToUser,
};
