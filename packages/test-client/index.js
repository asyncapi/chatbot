var socket = require('socket.io-client')('http://localhost:5001');
const repl = require('repl');
const chalk = require('chalk');

socket.on('disconnect', () => {
    socket.emit('disconnect')
});

socket.on('connect', (data) => {
    console.log(chalk.red('--- start chatting ---'))
});

socket.emit("signIn", "XÆA-12");

socket.on("bot-message", (data) => {
    console.log(data);
});

socket.on('message', (data) => {
    console.log(data);
});

repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.emit("message", cmd)
    }
})
