/* eslint-disable sonarjs/no-collapsible-if */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { generator } from './generator';
import defaultSpec from '../models/defaultSpec.json';
import questions from '../models/questions';

const document = defaultSpec;
// FIXME: Enhance generator flow code
export default function generatorFlow(
  socket,
  io,
  schemaText,
  schemaQuestion,
  count,
) {
  const counter = count;
  let toAsk = schemaText;
  let ask = schemaQuestion;
  // const generateEntities = childEntityValue(
  //   entities,
  //   'generator_flow:generator_flow',
  // );

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
