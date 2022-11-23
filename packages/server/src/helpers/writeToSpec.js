import specCreator from '../utils/specCreator';
import questions from '../models/questions';
import defaultSpec from '../models/defaultSpec.json';

const document = defaultSpec;
export default function writeToSpec(socket, io, data, ask, counter, toAsk) {
  let uAsk = ask;
  const count = counter;
  if (uAsk) {
    // call the spec creator function
    const { title } = questions[counter.parent];
    const callSpec = specCreator(title, data, ask);
    if (callSpec) {
      io.to(socket.id).emit('message', callSpec);
    }
    count.child++;
    uAsk = toAsk.questions[count.child];
    console.log(counter);
    if (uAsk) {
        conmso
      if (title === 'channels') {
        const { messages } = document.components;
        const messageKeys = Object.keys(messages);
        if (Object.keys(messages).length > 0) {
          uAsk.text.items = messageKeys;
        }
        return io.to(socket.id).emit('message', uAsk.text);
      }
    }
  }
}
