/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import client from '../helpers/wit';
import { firstEntityValue } from '../utils/entities';
import questions from '../models/questions';
import generatorFlow from '../services/generatorFlow';
import questionFlow from '../services/questionFlow';

const counter = {
  parent: 0,
  child: 0,
  check: false,
};

const messageHandler = (data, socket, io) => {
  client
    .message(data, {})
    .then((res) => {
      const toAsk = questions[counter.parent];
      const ask = toAsk.questions[counter.child];
      const wantToGenerate = firstEntityValue(res.entities, 'generator_flow:generator_flow');
      const question = firstEntityValue(res.entities, 'question_flow:question_flow');
      if (wantToGenerate) {
        generatorFlow(res.entities, socket, io, toAsk, ask, data, counter);
      }
      if (question) {
        questionFlow(res.entities, socket, io, ask);
      }
      if (!Object.keys(res.entities).length) {
        return io.to(socket.id).emit('message', 'I don\'t understand what you\'re trying to say');
      }
    })
    .catch((error) => {
      console.log(error);
      return io.to(socket.id).emit('message', 'ooohh something went wrong');
    });
};

export default messageHandler;
