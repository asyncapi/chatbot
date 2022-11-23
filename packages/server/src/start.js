import server from './server';
import startSocket from './helpers/socket';

let PORT = 5001;
const startServer = async () => {
  startSocket();
  if (process.env.NODE_ENV === 'development') {
    server.listen(PORT, () => {});
  } else {
    PORT = process.env.PORT;
    server.listen(PORT, () => {});
    server.listen(PORT, () => {
      console.log(`app now listening in port ${PORT}`);
    });
  }
};

startServer();
