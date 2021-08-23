import server from './server';
import startSocket from './helpers/socket';

let PORT = 5000;
const startServer = async () => {
  startSocket();
  if (process.env.NODE_ENV === 'development') {
    server.listen(PORT);
  } else {
    PORT = process.env.PORT;
    server.listen(PORT);
  }
};

startServer();
