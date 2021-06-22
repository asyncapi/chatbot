/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import client from '../helpers/wit';
import { firstEntityValue, childEntityValue } from '../utils/entities';
import questions from '../models/questions';
import defaultSpec from '../models/defaultSpec.json';
import answers from '../models/answers.json';

const counter = {
  parent: 0,
  child: 0,
};
const document = defaultSpec;

const messageHandler = (data, socket, io) => {
  client
    .message(data, {})
    .then((res) => {
      const wantToGenerate = firstEntityValue(res.entities, 'generator_flow:generator_flow');
      const question = firstEntityValue(res.entities, 'question:question');
      if (wantToGenerate) {
        if (
          counter.child >= questions[counter.parent].questions.length
        ) {
          counter.parent += 1;
          counter.child = 0;
        }
        const toAsk = questions[counter.parent];
        const ask = toAsk.questions[counter.child];
        console.log(counter);
        const generateEntities = childEntityValue(
          res.entities,
          'generator_flow:generator_flow',
        );
        if (generateEntities) {
          if (
            generateEntities.name === 'skip'
                    && generateEntities.confidence > 0.5
          ) {
            if (ask.required) {
              return io
                .to(socket.id)
                .emit(
                  'message',
                  "You can't skip this question because it's required",
                );
            }
            io.to(socket.id).emit('message', "Ok let's move on");
          }
          if (
            ask.type === 'string'
                        && generateEntities.role !== 'message_body'
          ) {
            return io
              .to(socket.id)
              .emit(
                'message',
                'A valid application name should be an alphabet',
              );
          }
        }
        if (toAsk.text) {
          io.to(socket.id).emit('message', toAsk.text);
        }
        io.to(socket.id).emit('message', ask.text);
        console.log(counter);
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
