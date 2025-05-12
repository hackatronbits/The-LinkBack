

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const PORT = 5000;


app.use(cors());


app.get('/', (req, res) => {
  res.send(' Welcome to the Socket.IO Chat Server — Server is running fine!');
});

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  console.log(` [Connected] User ID: ${socket.id}`);


  socket.on('send_message', (data) => {
    console.log(` [Message] From ${data.user}: ${data.message}`);
    io.emit('receive_message', data); 
  });

  socket.on('disconnect', () => {
    console.log(` [Disconnected] User ID: ${socket.id}`);
  });
});


server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
