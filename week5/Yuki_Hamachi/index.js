const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 💡 ユーザーが接続したときの処理
io.on('connection', (socket) => {
  console.log('a user connected');

  // 💬 送信者を含む全員にメッセージをブロードキャスト
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // 🔹 すべてのユーザーに送信
  });

  // 🔹 ユーザーが切断したときの処理
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// サーバーを 3000 番ポートで起動
server.listen(3000, () => {
  console.log('listening on *:3000');
});
