/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import client from '../helpers/wit';
import { firstEntityValue, childEntityValue } from '../utils/entities';
import questions from '../models/questions';
import defaultSpec from '../models/defaultSpec.json';
import answers from '../models/answers.json';
import { channelMessageValidator, messageSchemaValidator } from '../utils/schemaValidators';

const counter = {
  parent: 0,
  child: 0,
  check: false,
};
const document = defaultSpec;

const messageHandler = (data, socket, io) => {
  client
    .message(data, {})
    .then((res) => {
      let toAsk = questions[counter.parent];
      let ask = toAsk.questions[counter.child];
      const wantToGenerate = firstEntityValue(res.entities, 'generator_flow:generator_flow');
      const question = firstEntityValue(res.entities, 'question_flow:question_flow');
      if (wantToGenerate) {
        const generateEntities = childEntityValue(
          res.entities,
          'generator_flow:generator_flow',
        );
        if (generateEntities && generateEntities.name !== 'start') {
          if (
            generateEntities.name === 'omit'
                    && generateEntities.confidence > 0.5
          ) {
            if (toAsk && counter.check === false) {
              if (toAsk.required) {
                return io
                  .to(socket.id)
                  .emit(
                    'message',
                    "You can't skip this aspect because it's required",
                  );
              }
              counter.parent += 1;
              counter.child = 0;
              toAsk = questions[counter.parent];
              io.to(socket.id).emit('message', "Ok let's move on");
              return io.to(socket.id).emit('message', toAsk.text);
            }
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
          if (generateEntities.name === 'boolean' && generateEntities.confidence > 0.5) {
            if (toAsk && counter.check === false) {
              if (toAsk.required && generateEntities.value === 'no') {
                return io
                  .to(socket.id)
                  .emit(
                    'message',
                    "You can't skip this aspect because it's required",
                  );
              }
              if (generateEntities.value === 'yes') {
                counter.child = 0;
                counter.check = true;
                return io.to(socket.id).emit('message', ask.text);
              }
            }
            if (ask.required && generateEntities.value === 'no') {
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
          if (
            ask.type === 'url'
                      && generateEntities.role !== 'url'
          ) {
            return io
              .to(socket.id)
              .emit(
                'message',
                'A valid url is required',
              );
          }
          if (
            ask.type === 'number'
            && generateEntities.role !== 'number'
          ) {
            return io
              .to(socket.id)
              .emit(
                'message',
                'A valid application version must be a number',
              );
          }
          const { title } = questions[counter.parent];
          if (title === 'messages') {
            if (ask.title) {
              console.log(ask);
              // run payload schema validation
              const validate = messageSchemaValidator(data);
              if (validate === 'invalid schema') {
                return io.to(socket.id).emit('message', 'A valid schema is required');
              }
              const test = {
                [ask.title]: validate,
              };
              const a = document.components.messages;
              a[Object.keys(a)[0]] = test;
              console.log(a);
            } else {
              const b = document.components;
              b[title][data] = {};
            }
          } else if (title === 'channels') {
            if (ask.title) {
              const test = {
                [ask.title]: data,
              };
              const a = document.channels;
              const c = channelMessageValidator(document.components.messages, data);
              if (c.includes('message not found')) {
                return io.to(socket.id).emit('message', `${c}, please input a valid message`);
              }
              a[Object.keys(a)[counter.child]] = test;
            } else {
              const b = document;
              b[title][data] = {};
            }
          } else {
            const a = document[title];
            a[ask.title] = data;
          }
          counter.child++;
          ask = toAsk.questions[counter.child];
          console.log(document);
          if (ask) {
            return io.to(socket.id).emit('message', ask.text);
          }
        }
        if (ask && ask.text) {
          io.to(socket.id).emit('message', ask.text);
        } else {
          counter.parent += 1;
          counter.child = 0;
          counter.check = false;
          toAsk = questions[counter.parent];
          if (toAsk.text) {
            return io.to(socket.id).emit('message', toAsk.text);
          }
          ask = toAsk.questions[counter.child];
          io.to(socket.id).emit('message', ask.text);
        }
      }
      if (question) {
        const generateEntities = childEntityValue(
          res.entities,
          'question_flow:question_flow',
        );
        if (generateEntities) {
          const answer = answers[generateEntities.name];
          if (answer) {
            io.to(socket.id).emit('message', answer);
            return io.to(socket.id).emit('message', `now tell me ${ask.text}`);
          }
          return io
            .to(socket.id)
            .emit(
              'message',
              "I couldn't find an answer to this question sorry",
            );
        }
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
