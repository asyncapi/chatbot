/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import Base64 from 'js-base64';
import client from '../helpers/wit';
import { firstEntityValue } from '../utils/entities';
import questions from '../models/questions';
import generatorFlow from '../services/generatorFlow';
import questionFlow from '../services/questionFlow';
import parserFlow from '../services/parserFlow';
import { isJson } from '../utils/schemaValidators';

const counter = {
  parent: 0,
  child: 0,
  check: false,
};

const messageHandler = (data, socket, io) => {
  let newData = data;
  // check if data coming from client is encoded...
  const decodedData = Base64.decode(data);
  if (decodedData && isJson(decodedData)) {
    newData = 'I want to parse';
  }
  client
    .message(newData, {})
    .then((res) => {
      const toAsk = questions[counter.parent];
      const ask = toAsk.questions[counter.child];
      const wantToGenerate = firstEntityValue(
        res.entities,
        'generator_flow:generator_flow',
      );
      const question = firstEntityValue(
        res.entities,
        'question_flow:question_flow',
      );
      const wantToParse = firstEntityValue(
        res.entities,
        'intent_flow:intent_flow',
      );
      if (wantToGenerate) {
        generatorFlow(res.entities, socket, io, toAsk, ask, data, counter);
      }
      if (question) {
        questionFlow(res.entities, socket, io, ask);
      }
      if (wantToParse) {
        parserFlow(res.entities, socket, io, data);
      }
      if (!Object.keys(res.entities).length) {
        return io
          .to(socket.id)
          .emit('message', "I don't understand what you're trying to say");
      }
    })
    .catch(() => {
      io.to(socket.id).emit('message', 'ooohh something went wrong');
    });
};

export default messageHandler;
