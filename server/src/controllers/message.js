import client from '../helpers/wit';

const messageHandler = (data, socket, io) => {
  client
    .message(data, {})
    .then((res) => {
      console.log(res);
      if (!Object.keys(res.entities).length) {
        return io.to(socket.id).emit('message', 'I don\'t understand what you\'re trying to say');
      }
      console.log(res.entities);
      console.log(res.traits);
    })
    .catch((error) => {
      console.log(error);
      return io.to(socket.id).emit('message', 'ooohh something went wrong');
    });
};

export default messageHandler;
