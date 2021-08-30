/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-possible-timing-attacks */
import server from '../server';
import messageHandler from '../controllers/message';

const io = require('socket.io')(server);

export default function startSocket() {
  io.on('connection', async (socket) => {
    socket.on('signIn', () => {
      io.to(socket.id).emit(
        'bot-message',
        "Hello I'm Lukasz, I can help you out writing an AsyncAPI document.Try me!.",
      );
    });
    socket.on('message', (data) => {
      messageHandler(data, socket, io);
    });
  });
  io.on('disconnect', () => {});
}
