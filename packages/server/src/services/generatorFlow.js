/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-collapsible-if */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { generator } from './generator';
import { isJson } from '../utils/schemaValidators';
import defaultSpec from '../models/defaultSpec.json';
import questions from '../models/questions';
import { childEntityValue } from '../utils/entities';
import specCreator from '../utils/specCreator';
import { booleanChecker, omitChecker, textValidator } from '../utils/inputValidators';

const document = defaultSpec;
// FIXME: Enhance generator flow code
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
      const checkInput = omitChecker(toAsk, ask, counter, socket, io, questions);
      if (checkInput) {
        return checkInput;
      }
    }
    if (
      generateEntities.name === 'boolean'
      && generateEntities.confidence > 0.5
    ) {
      const checkInput = booleanChecker(toAsk, ask, counter, socket,
        io, questions, generateEntities.value);
      if (checkInput) {
        return checkInput;
      }
    }
    // text inpput validator checker
    const checkInput = textValidator(
      toAsk,
      ask,
      counter,
      socket,
      io,
      generateEntities,
    );
    if (checkInput) {
      return checkInput;
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
        if (title === 'channels') {
          const { messages } = document.components;
          const messageKeys = Object.keys(messages);
          if (Object.keys(messages).length > 0) {
            ask.text += `Existing messages => ${messageKeys}`;
          }
          return io
            .to(socket.id)
            .emit(
              'message',
              ask.text,
            );
        }
        return io.to(socket.id).emit('message', ask.text);
      }
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
