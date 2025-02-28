import io from 'socket.io-client';

let endpoint = 'http://localhost:5001';
if (process.env.REACT_APP_NODE_ENV === 'production') {
  endpoint = 'http://localhost:80/';
}
const socketConnection = () => io(endpoint, {
  withCredentials: true,
  transports: ['websocket'],
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

export default socketConnection;
