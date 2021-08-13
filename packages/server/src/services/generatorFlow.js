/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { generator } from './generator';
import { isJson } from '../utils/schemaValidators';
import defaultSpec from '../models/defaultSpec.json';
import questions from '../models/questions';
import { childEntityValue } from '../utils/entities';
import specCreator from '../utils/specCreator';

const document = defaultSpec;

export default function generatorFlow(
  entities,
  socket,
  io,
  schemaText,
  schemaQuestion,
  data,
  count,
) {
  const counter = count;
  let toAsk = schemaText;
  let ask = schemaQuestion;
  const generateEntities = childEntityValue(
    entities,
    'generator_flow:generator_flow',
  );
  if (ask && ask.type === 'schema') {
    const validateSchema = isJson(data);
    if (!validateSchema) {
      return io
        .to(socket.id)
        .emit('message', 'A valid json schema is required');
    }
  }
  if (generateEntities && generateEntities.name !== 'start') {
    if (generateEntities.name === 'omit' && generateEntities.confidence > 0.5) {
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
    if (
      generateEntities.name === 'boolean'
      && generateEntities.confidence > 0.5
    ) {
      if (toAsk.canLoop && counter.check) {
        if (generateEntities.value === 'no') {
          counter.parent += 1;
          counter.child = 0;
          counter.check = false;
          toAsk = questions[counter.parent];
          if (toAsk) {
            io.to(socket.id).emit('message', "Ok let's move on");
            return io.to(socket.id).emit('message', toAsk.text);
          }
        } if (generateEntities.value === 'yes') {
          counter.child = 0;
          ask = toAsk.questions[counter.child];
          return io.to(socket.id).emit('message', ask.text);
        }
      }
      if (toAsk && counter.check === false) {
        if (toAsk.required && generateEntities.value === 'no') {
          return io
            .to(socket.id)
            .emit(
              'message',
              "You can't skip this aspect because it's required",
            );
        }
        if (toAsk.required === false && generateEntities.value === 'no') {
          counter.parent += 1;
          counter.child = 0;
          counter.check = false;
          io.to(socket.id).emit('message', "Ok let's move on");
          return io.to(socket.id).emit('message', toAsk.text);
        }
        if (generateEntities.value === 'yes') {
          counter.child = 0;
          counter.check = true;
          return io.to(socket.id).emit('message', ask.text);
        }
      }
      if (toAsk && ask.required && generateEntities.value === 'no') {
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
      generateEntities.name === 'wit$message_body'
          && generateEntities.confidence > 0.5
    ) {
      if (toAsk.text && counter.check === false) {
        return io.to(socket.id).emit('message', 'A Yes or No/Skip answer is required');
      }
    }
    if (
      generateEntities.name === 'wit$number'
            && generateEntities.confidence > 0.5
    ) {
      if (toAsk.text && counter.check === false) {
        return io
          .to(socket.id)
          .emit('message', 'A Yes or No/Skip answer is required');
      }
    }
    if (ask && ask.type === 'string' && generateEntities.role !== 'message_body') {
      return io
        .to(socket.id)
        .emit('message', 'A valid application name should be an alphabet');
    }
    if (ask && ask.type === 'url' && generateEntities.role !== 'url') {
      return io.to(socket.id).emit('message', 'A valid url is required');
    }
    if (ask && ask.type === 'number' && generateEntities.role !== 'number') {
      return io
        .to(socket.id)
        .emit('message', 'A valid application version must be a number');
    }
    if (ask) {
      // call the spec creator function
      const { title } = questions[counter.parent];
      const callSpec = specCreator(title, data, ask);
      if (callSpec) {
        io.to(socket.id).emit('message', callSpec);
      }
      counter.child++;
      ask = toAsk.questions[counter.child];
      if (ask) {
        console.log(document);
        if (title === 'channels') {
          const { messages } = document.components;
          const messageKeys = Object.keys(messages);
          return io.to(socket.id).emit('message', `${ask.text}.The list of messages you have includes: ${messageKeys}`);
        }
        return io.to(socket.id).emit('message', ask.text);
      }
    }
  }
  if (ask && ask.text) {
    io.to(socket.id).emit('message', ask.text);
  } else {
    // Check if current spec requires multiple specifications;
    if (toAsk && toAsk.canLoop) {
      return io.to(socket.id).emit('message', toAsk.loopText);
    }
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
