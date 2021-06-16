import server from '../server';
import messageHandler from '../controllers/message';

const io = require('socket.io')(server);

export default function startSocket() {
  io.on('connection', async (socket) => {
    socket.on('signIn', () => {
      io.to(socket.id).emit('bot-message', 'Hello I\'m Lukasz');
    });
    socket.on('message', (data) => {
      messageHandler(data, socket, io);
    });
  });
  io.on('disconnect', (evt) => {
    console.log('someone left');
  });
}
