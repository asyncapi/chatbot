import express from 'express';

require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const server = require('http').Server(app);

export default server;
