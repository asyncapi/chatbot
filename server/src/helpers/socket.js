import server from '../server';

const io = require('socket.io')(server);

const client = io.on('connection', async (client) => {
  console.log(client);
  console.log('hello');
});
