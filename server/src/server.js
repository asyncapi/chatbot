import express from 'express';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', async (client) => {
    console.log("hello")
});

export default server;