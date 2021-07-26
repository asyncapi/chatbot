/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { generator } from './generator';
import { channelMessageValidator, isJson } from '../utils/schemaValidators';
import schemaCreator from '../utils/schemaCreator';
import defaultSpec from '../models/defaultSpec.json';
import questions from '../models/questions';
import { childEntityValue } from '../utils/entities';

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
  if (ask.type === 'schema') {
    const validateSchema = isJson(data);
    if (validateSchema) {
      // call message schema validation
      const newData = JSON.parse(data);
      const spec = document.components.messages;
      schemaCreator(spec, newData, ask.title, 0);
      counter.parent += 1;
      counter.child = 0;
      counter.check = false;
      toAsk = questions[counter.parent];
      return io.to(socket.id).emit('message', toAsk.text);
    }
    return io.to(socket.id).emit('message', 'A valid json schema is required');
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
    if (ask.type === 'string' && generateEntities.role !== 'message_body') {
      return io
        .to(socket.id)
        .emit('message', 'A valid application name should be an alphabet');
    }
    if (ask.type === 'url' && generateEntities.role !== 'url') {
      return io.to(socket.id).emit('message', 'A valid url is required');
    }
    if (ask.type === 'number' && generateEntities.role !== 'number') {
      return io
        .to(socket.id)
        .emit('message', 'A valid application version must be a number');
    }
    const { title } = questions[counter.parent];
    let spec = document[title];
    if (title === 'messages') {
      spec = document.components.messages;
      schemaCreator(spec, data, ask.title, null);
    } else if (title === 'servers') {
      if (ask.title) {
        schemaCreator(spec, data, ask.title, 0);
      } else {
        schemaCreator(spec, data, ask.title, null);
      }
    } else if (title === 'channels') {
      if (ask.title) {
        const response = channelMessageValidator(
          document.components.messages,
          data,
        );
        if (typeof response === 'string') {
          return io.to(socket.id).emit('message', response);
        }
        schemaCreator(spec, response, ask.title, 0);
      } else {
        schemaCreator(spec, data, ask.title, null);
      }
    } else {
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
