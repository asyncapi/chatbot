import server from './server';
import startSocket from './helpers/socket';

const startServer = async () => {
  startSocket();
  if (process.env.NODE_ENV === 'development') {
    server.listen(5000, () => {
      console.log('app now listening to port 5000');
    });
  }
};

startServer();
