/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
// import Base64 from 'js-base64';
import client from '../helpers/wit';
import { firstEntityValue } from '../utils/entities';
import questions from '../models/questions';
import generatorFlow from '../services/generatorFlow';
import questionFlow from '../services/questionFlow';
import { getIntent } from '../utils/intents';
import utteranceFlow from '../services/utterance';

const counter = {
  parent: 0,
  child: 0,
  check: false,
};

const messageHandler = (data, socket, io) => {
  client
    .message(data, {})
    .then((res) => {
      const intent = getIntent(res.intents);
      const toAsk = questions[counter.parent];
      const ask = toAsk.questions[counter.child];
      const question = firstEntityValue(
        res.entities,
        'question_flow:question_flow',
      );
      if (intent && intent.name === 'create_document') {
        return generatorFlow(socket, io, toAsk, ask, counter);
      }
      if (question) {
        questionFlow(res.entities, socket, io, ask);
      }
      if (!Object.keys(res.entities).length) {
        return io
          .to(socket.id)
          .emit('message', "I don't understand what you're trying to say");
      }
      return utteranceFlow(
        res.entities,
        socket,
        io,
        toAsk,
        ask,
        data,
        counter,
      );
    })
    .catch((err) => {
      io.to(socket.id).emit('message', 'ooohh something went wrong');
    });
};

export default messageHandler;
