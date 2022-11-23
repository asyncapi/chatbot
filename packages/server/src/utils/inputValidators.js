/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
const moveOnMessage = "Ok let's move on";
// eslint-disable-next-line consistent-return
function requiredMessage(socket, io, message, value) {
  if (message && message.required && value === 'no') {
    io.to(socket.id).emit(
      'message',
      "You can't skip this aspect because it's required",
    );
    return io.to(socket.id).emit('message', message.text);
  }
}
// eslint-disable-next-line consistent-return
export const omitChecker = (toAsk, ask, counter, socket, io, questions) => {
  if (toAsk && counter.check === false) {
    if (toAsk.required) {
      requiredMessage(socket, io, toAsk);
    }
    counter.parent += 1;
    counter.child = 0;
    toAsk = questions[counter.parent];
    io.to(socket.id).emit('message', moveOnMessage);
    return io.to(socket.id).emit('message', toAsk.text);
  }
  if (ask.required) {
    requiredMessage(socket, io, ask);
  }
  io.to(socket.id).emit('message', moveOnMessage);
};

// eslint-disable-next-line consistent-return
function moveOn(socket, io, toAsk) {
  if (toAsk) {
    io.to(socket.id).emit('message', moveOnMessage);
    return io.to(socket.id).emit('message', toAsk.text);
  }
}

// eslint-disable-next-line consistent-return
export const booleanChecker = (toAsk, ask, counter, socket, io, questions, value) => {
  if (toAsk.canLoop && counter.check) {
    if (value === 'no') {
      counter.parent += 1;
      counter.child = 0;
      counter.check = false;
      toAsk = questions[counter.parent];
      moveOn(socket, io, toAsk);
    }
    if (value === 'yes') {
      counter.child = 0;
      ask = toAsk.questions[counter.child];
      return io.to(socket.id).emit('message', ask.text);
    }
  }
  if (toAsk && counter.check === false) {
    requiredMessage(socket, io, toAsk, value);
    if (toAsk.required === false && value === 'no') {
      counter.parent += 1;
      counter.child = 0;
      counter.check = false;
      toAsk = questions[counter.parent];
      moveOn(socket, io, toAsk);
    }
    if (value === 'yes') {
      counter.child = 0;
      counter.check = true;
      return io.to(socket.id).emit('message', ask.text);
    }
  }
  requiredMessage(socket, io, ask, value);
  io.to(socket.id).emit('message', moveOnMessage);
};

// eslint-disable-next-line consistent-return
export const textValidator = (toAsk, ask, counter, socket, io, entities) => {
  // eslint-disable-next-line sonarjs/no-collapsible-if
  if (entities) {
    if (
      ask
     && ask.type === 'string'
     && entities.role !== 'message_body'
     && entities.name !== 'omit'
    ) {
      return io
        .to(socket.id)
        .emit('message', 'A valid application name should be an alphabet');
    }
    if (ask && ask.type === 'url' && entities.role !== 'url') {
      return io.to(socket.id).emit('message', 'A valid url is required');
    }
    if (ask && ask.type === 'number' && entities.role !== 'number') {
      return io
        .to(socket.id)
        .emit('message', 'A valid application version must be a number');
    }
  }
};
