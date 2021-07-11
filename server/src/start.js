import server from './server';
import startSocket from './helpers/socket';
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  startSocket();
  if (process.env.NODE_ENV === 'development') {
    server.listen(PORT, () => {
      console.log('app now listening to port 5000');
    });
  }
};

startServer();
