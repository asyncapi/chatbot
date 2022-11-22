/* eslint-disable no-var */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
// import { Base64 } from 'js-base64';

/* eslint-disable import/prefer-default-export */
export const onMessageExchange = (message, dispatch, socket) => {
  // const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  // // eslint-disable-next-line no-unused-vars
  // let decodedMessageObject = null;
  // if (message.type === 'user') {
  //   decodedMessageObject = { ...message };
  //   if (base64regex.test(decodedMessageObject.text)) {
  //     const newText = JSON.parse(Base64.decode(decodedMessageObject.text));
  //     decodedMessageObject.text = JSON.stringify(newText);
  //   }
  // console.log(decodedMessage);
  // }
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
