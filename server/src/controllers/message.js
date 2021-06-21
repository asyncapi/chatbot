/* eslint-disable consistent-return */
import client from '../helpers/wit';
import { firstEntityValue } from '../utils/entities';
import questions from '../models/questions';
import defaultSpec from '../models/defaultSpec.json';
import answers from '../models/answers.json';

const counter = {
  parent: 0,
  child: 0,
};

const messageHandler = (data, socket, io) => {
  client
    .message(data, {})
    .then((res) => {
      console.log(res);
      console.log(res.entities);
      const wantToGenerate = firstEntityValue(res.entities, 'generator_flow:generator_flow');
      const question = firstEntityValue(res.entities, 'question:question');
      if (wantToGenerate) {
        if (counter.child >= questions[counter.parent].questions.length) {
          counter.parent += 1;
          counter.child = 0;
        }
        const toAsk = questions[counter.parent];
        const ask = toAsk.questions[counter.child];
        io.to(socket.id).emit('message', ask.text);
        counter.child++;
        return;
      }
      if (question) {
        const answer = answers[question.name];
        if (answer) {
          return io.to(socket.id).emit('message', answer);
        }
        return io
          .to(socket.id)
          .emit('message', 'I couldn\'t find an answer to this question sorry');
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
