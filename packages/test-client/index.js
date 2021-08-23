/* eslint-disable no-console */
require('dotenv').config();

const PORT = process.env.PORT || 'http://localhost:5000/';
const socket = require('socket.io-client')(PORT);
const repl = require('repl');
const chalk = require('chalk');

socket.on('disconnect', () => {
  socket.emit('disconnect');
});

socket.on('connect', () => {
  console.log(chalk.red('--- start chatting ---'));
});

socket.emit('signIn', process.env.ACCESS_TOKEN);

socket.on('bot-message');

socket.on('message', (data) => {
  console.log(data);
});

repl.start({
  prompt: '',
  eval: (cmd) => {
    socket.emit('message', cmd);
  },
});
