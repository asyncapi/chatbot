import server from '../server';

const io = require('socket.io')(server);

export default function startSocket() {
  io.on('connection', async (client) => {
    client.on('signIn', (evt) => {
      client.to(client.id).emit('bot-message', 'jdbdkbkbkbk');
    });
    client.on('message', (evt) => {
      console.log(evt.data);
      client.to(client.id).emit('message', evt);
    });
  });
  io.on('disconnect', (evt) => {
    console.log('someone left');
  });
}
