/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import client from '../helpers/wit';
import { firstEntityValue, childEntityValue } from '../utils/entities';
import questions from '../models/questions';
import defaultSpec from '../models/defaultSpec.json';
import answers from '../models/answers.json';
import { generator } from '../services/generator';
import { channelMessageValidator, isJson } from '../utils/schemaValidators';
import schemaCreator from '../utils/schemaCreator';

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
        if (ask.type === 'schema') {
          const validateSchema = isJson(data);
          if (validateSchema) {
            // call message schema validation
            const newData = JSON.parse(data);
            const spec = document.components.messages;
            schemaCreator(spec, newData, null, 0);
            counter.parent += 1;
            counter.child = 0;
            counter.check = false;
            toAsk = questions[counter.parent];
            return io.to(socket.id).emit('message', toAsk.text);
          }
          return io
            .to(socket.id)
            .emit('message', 'A valid json schema is required');
        }
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
              } if (toAsk.required === false && generateEntities.value === 'no') {
                counter.parent += 1;
                counter.child = 0;
                counter.check = false;
                io.to(socket.id).emit(
                  'message',
                  "Ok let's move on",
                );
                return io
                  .to(socket.id)
                  .emit('message', toAsk.text);
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
            const spec = document.components.messages;
            schemaCreator(spec, data, ask.title, null);
          } else if (title === 'channels') {
            const spec = document.channels;
            if (ask.title) {
              const response = channelMessageValidator(
                document.components.messages,
                data,
              );
              if (typeof response === 'string') {
                return io.to(socket.id).emit('message', response);
              }
              // FIXME: needs enhancement
              const a = spec[Object.keys(spec)[0]];
              a[ask.title] = {
                message: response,
              };
            } else {
              schemaCreator(spec, data, ask.title, null);
            }
          } else {
            const spec = document[title];
            schemaCreator(spec, data, ask.title);
          }
          counter.child++;
          ask = toAsk.questions[counter.child];
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
          if (!toAsk) {
            io.to(socket.id).emit('message', 'generating spec');
            const test = generator(document);
            return io.to(socket.id).emit('message', test);
          }
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
