import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;

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

    socket.on("join_workspace", (workspaceId: string) => {
      socket.join(workspaceId);
      console.log(`User ${socket.id} joined workspace ${workspaceId}`);
    });

    socket.on("disconnect", () => {
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

export const SocketHelper = {
  initSocket,
  getIO,
};
