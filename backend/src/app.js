import express from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import router from "./router.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// ---------------- Socket.io setup with proper CORS -----------------//
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

// ------------ Express middlewares ------------------//
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// -------------- API routes ---------------- //
app.use("/chathub/api/v1", router);

//  ------------ Socket events ----------------- //
io.on("connection", (socket) => {
  console.log(`--->  User connected: ${socket.id}`);

  // --- join room (so users can receive private messages) ---
  socket.on("join_room", (userId) => {
    socket.join(userId);
  });

  // --- send message ---
  socket.on("send_message", (data) => {
    // Broadcast message to receiver's room
    io.to(data.recieverId).emit("receive_message", data);
  });

  // --- disconnect ---
  socket.on("disconnect", () => {
    console.log(` xxxxx User disconnected: ${socket.id}`);
  });
});

//  Export for use in index.js
export { app, server, io };
