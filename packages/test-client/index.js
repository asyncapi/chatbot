/* eslint-disable no-console */
require('dotenv').config();

let Address = 'http://localhost:5000/';
if (process.env.NODE_ENV === 'production') {
  Address = 'http://167.71.46.87/';
}
const socket = require('socket.io-client')(Address);
const repl = require('repl');
const chalk = require('chalk');

socket.on('disconnect', () => {
  socket.emit('disconnect');
});

socket.on('connect', () => {
  console.log(chalk.red('--- start chatting ---'));
});

socket.emit('signIn');

socket.on('bot-message', (data) => {
  console.log(data);
});

socket.on('message', (data) => {
  console.log(data);
});

repl.start({
  prompt: '',
  eval: (cmd) => {
    socket.emit('message', cmd);
  },
});
