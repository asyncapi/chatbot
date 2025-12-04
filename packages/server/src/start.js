import 'dotenv/config';
import server from './server';
import startSocket from './helpers/socket';

let PORT = 5000;
const startServer = async () => {
  startSocket();
  if (process.env.NODE_ENV === 'development') {
  server.listen(PORT, () => {
    console.log(`🚀 Server running in development on http://localhost:${PORT}`);
  });
} else {
  PORT = process.env.PORT || PORT;
  server.listen(PORT, () => {
    console.log(`🚀 Server running in production on port ${PORT}`);
  });
}
};

startServer();
