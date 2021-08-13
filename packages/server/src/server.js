import express from 'express';

require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).send('AsyncApi chatbot server');
});
const server = require('http').Server(app);

export default server;
