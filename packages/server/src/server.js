import express from 'express';
import cors from 'cors';

require('dotenv').config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.status(200).send('AsyncApi chatbot server');
});
const server = require('http').Server(app);

export default server;
