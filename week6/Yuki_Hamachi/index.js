const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const activeUsers = new Map();

io.on('connection', (socket) => {
  const username = `User${Math.floor(Math.random() * 1000)}`;
  activeUsers.set(socket.id, username);

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${username}: ${msg}`);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', username);
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', username);
  });

  socket.on('disconnect', () => {
    activeUsers.delete(socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
