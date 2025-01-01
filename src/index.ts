import { Socket } from "socket.io";

const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req: any, res: any) => {
    res.sendFile(join(__dirname, "index.html"));
});

// io.on("connection", (socket: Socket) => {
//     console.log("a user connected");
// });

// io.on("connection", (socket: Socket) => {
//     console.log("a user connected");
//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     });
// });

io.on("connection", (socket: Socket) => {
    socket.broadcast.emit("hi", "abc");
    console.log("connected");
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
        console.log("message: " + msg);
    });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
