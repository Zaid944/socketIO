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
    // socket.broadcast.emit("hi", "abc");
    console.log("connected");
    socket.on("event", (msg) => {
        console.log(msg);
        socket.broadcast.emit("event2", msg);
        // io.emit("chat message", msg);
        // console.log("message: " + msg);
    });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});

// import express from "express";
// import { Server } from "socket.io";

// const app = express();

// const server = app.listen(3000, () => {
//     console.log("Application started on port 3000!");
// });

// const socketIo = new Server(server, {
//     cors: {
//         origin: "*", // Allow any origin for testing purposes. This should be changed on production.
//     },
// });

// socketIo.on("connection", (socket) => {
//     console.log("New connection created");

//     // Get the auth token provided on handshake.
//     const token = socket.handshake.auth.token;
//     console.log("Auth token", token);

//     try {
//         // Verify the token here and get user info from JWT token.
//     } catch (error) {
//         socket.disconnect(true);
//     }

//     // A client is disconnected.
//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });

//     // Read message recieved from client.
//     socket.on("message_from_client", (data) => {
//         console.log("message_from_client: ", data);
//     });

//     // Send a message to the connected client 5 seconds after the connection is created.
//     setTimeout(() => {
//         socket.emit("message_from_server", `Message: ${Math.random()}`);
//     }, 5_000);
// });
