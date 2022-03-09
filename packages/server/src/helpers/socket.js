/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-possible-timing-attacks */
import server from '../server';
import messageHandler from '../controllers/message';

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

export default function startSocket() {
  io.on('connection', async (socket) => {
    socket.on('signIn', (data) => {
      if (data === 'generate') {
        io.to(socket.id).emit('bot-message', {
          type: 'array',
          multi: false,
          value:
            "Hello I'm Lukasz, I can help you out writing an AsyncAPI document.Try me!.",
          items: ['Generate spec'],
        });
      }
      if (data === 'read') {
        io.to(socket.id).emit('bot-message', {
          type: 'file',
          multi: false,
          value:
            "Hello I'm Lukasz, I can help you out reading your AsyncAPI document.Try me!.",
          items: ['Upload spec'],
        });
      }
    });
    socket.on('message', (data) => {
      messageHandler(data, socket, io);
    });
  });
  io.on('disconnect', () => {});
}
