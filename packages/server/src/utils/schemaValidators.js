/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
export const channelMessageValidator = (toValidate, messages) => {
  const msgArray = messages.split(',');
  const channelMessageSchema = {
    message: {
      oneOf: [],
    },
  };
  for (let i = 0; i < msgArray.length; i++) {
    let name = msgArray[i];
    if (msgArray.length > 1 && i < msgArray.length - 1) {
      name = `${name}\n`;
    }
    if (toValidate[name]) {
      channelMessageSchema.message.oneOf.push({
        $ref: `#/components/messages/${msgArray[i]}`,
      });
    } else {
      return `${msgArray[i]} message not found`;
    }
  }
  return channelMessageSchema;
};

export const isJson = (text) => {
  try {
    if (typeof text !== 'string') {
      return false;
    }
    try {
      JSON.parse(text);
      return true;
    } catch (error) {
      return false;
    }
  } catch (e) {
    return false;
  }
};
