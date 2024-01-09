import { Socket } from 'socket.io';
import http = require("http")
const {Server} = require("socket.io");
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket:Socket) => {
  console.log('a user connected');
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});