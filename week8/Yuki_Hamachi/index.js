const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: { type: String }
})

const messageModel = mongoose.model("Message", messageSchema)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', async function(socket){
  // 🔁 チャット履歴を送る
  const messages = await messageModel.find();
  socket.emit('chat history', messages);

  // 💬 新しいチャットメッセージを受け取る
  socket.on('chat message', function(msg){
    const message = new messageModel();
    message.content = msg;
    message.save().then(m => {
      io.emit('chat message', msg);
    });
  });
});

server.listen(3000, async function(){
  await mongoose.connect("mongodb+srv://sam:helloworld@cluster0.ytnrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  console.log('listening on *:3000');
});
//mongodb+srv://yuki1010:<db_password>@yuki.b9q3q.mongodb.net/?retryWrites=true&w=majority&appName=Yuki

app.get('/messages', async function(req, res) {
  res.json(await messageModel.find());
});
