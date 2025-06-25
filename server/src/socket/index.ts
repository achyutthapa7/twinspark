import { Server } from "socket.io";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
};
