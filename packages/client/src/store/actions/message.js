/* eslint-disable import/prefer-default-export */
export const onMessageExchange = (message, dispatch, socket) => {
  dispatch({
    type: 'NEW_MESSAGE',
    message,
  });
  if (socket) {
    dispatch({
      type: 'SENDING',
    });
    socket.emit('message', message.text);
  }
};
