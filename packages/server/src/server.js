import express from 'express';
import cors from 'cors';

require('dotenv').config();

const app = express();
const corsOptions = {
  origin: '*', // Sensitive
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.status(200).send('AsyncApi chatbot server');
});
const server = require('http').Server(app);

export default server;
