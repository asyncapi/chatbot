var socket = require('socket.io-client')('http://localhost:5000');
const repl = require('repl');
const chalk = require('chalk');

socket.on('disconnect', () => {
    socket.emit('disconnect')
});

socket.on('connect', (data) => {
    console.log(data);
    console.log(chalk.red('--- start chatting ---'))
});

socket.emit('signIn', () => {
    console.log('ookk')
})

socket.on("bot-message", (data) => {
    console.log(data);
});

socket.on('message', (data) => {
    const { cmd } = data;
    console.log(cmd);
});

repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.send({cmd})
    }
})