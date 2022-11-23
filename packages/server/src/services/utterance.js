import { isJson } from '../utils/schemaValidators';
import { childEntityValue } from '../utils/entities';
import specCreator from '../utils/specCreator';
import {
  booleanChecker,
  omitChecker,
  textValidator,
} from '../utils/inputValidators';
import defaultSpec from '../models/defaultSpec.json';
import questions from '../models/questions';
import generatorFlow from './generatorFlow';

const document = defaultSpec;

export default function utteranceFlow(
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
  const generateEntities = childEntityValue(entities);
  // eslint-disable-next-line no-use-before-define
  triggerInputValidators(
    toAsk,
    ask,
    data,
    counter,
    socket,
    io,
    questions,
    generateEntities,
  );
  if (
    generateEntities && generateEntities.name === 'boolean'
      && generateEntities.confidence > 0.5
  ) {
    const checkInput = booleanChecker(
      toAsk,
      ask,
      counter,
      socket,
      io,
      questions,
      generateEntities.value,
    );
    if (checkInput) {
      return checkInput;
    }
    toAsk = questions[counter.parent];
  }
  if (ask) {
    // call the spec creator function
    const { title } = questions[counter.parent];
    const callSpec = specCreator(title, data, ask);
    if (callSpec) {
      io.to(socket.id).emit('message', callSpec);
    }
    // eslint-disable-next-line no-plusplus
    counter.child++;
    ask = toAsk.questions[counter.child];
    // eslint-disable-next-line no-use-before-define
    childSupport(socket, io, ask, title);
  }
  return generatorFlow(socket, io, toAsk, ask, counter);
}

// eslint-disable-next-line consistent-return
function childSupport(socket, io, ask, title) {
  if (ask && title === 'channels') {
    const { messages } = document.components;
    const messageKeys = Object.keys(messages);
    if (Object.keys(messages).length > 0) {
      // eslint-disable-next-line no-param-reassign
      ask.text.items = messageKeys;
    }
    return io.to(socket.id).emit('message', ask.text);
  }
}

// eslint-disable-next-line no-shadow, consistent-return
function triggerInputValidators(toAsk, ask, data, counter, socket, io, questions,
  generateEntities) {
  if (ask && ask.type === 'schema') {
    const validateSchema = isJson(data);
    if (!validateSchema) {
      return io
        .to(socket.id)
        .emit('message', 'A valid json schema is required');
    }
  }
  if (
    generateEntities
    && generateEntities.name === 'omit'
    && generateEntities.confidence > 0.5
  ) {
    const checkInput = omitChecker(toAsk, ask, counter, socket, io, questions);
    if (checkInput) {
      return checkInput;
    }
  }

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
}
