/* eslint-disable consistent-return */
import answers from '../models/answers.json';
import { childEntityValue } from '../utils/entities';

export default function questionFlow(entities, socket, io, ask) {
  const generateEntities = childEntityValue(
    entities,
    'question_flow:question_flow',
  );
  if (generateEntities) {
    const answer = answers[generateEntities.name];
    if (answer) {
      io.to(socket.id).emit('message', answer);
      return io
        .to(socket.id)
        .emit('message', `now tell me ${ask.text}`);
    }
    return io
      .to(socket.id)
      .emit(
        'message',
        'I couldn\'t find an answer to this question sorry',
      );
  }
}
