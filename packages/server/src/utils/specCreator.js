import { channelMessageValidator } from './schemaValidators';
import schemaCreator from './schemaCreator';
import defaultSpec from '../models/defaultSpec.json';

const document = defaultSpec;
let messageIndex = 0;
let channelIndex = 0;

// eslint-disable-next-line consistent-return
export default function specCreator(title, data, ask) {
  let spec = document[title];
  if (title === 'messages') {
    spec = document.components.messages;
    if (ask.title) {
      schemaCreator(spec, data, ask.title, messageIndex);
      messageIndex += 1;
    } else {
      schemaCreator(spec, data, ask.title, null);
    }
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
        return response;
      }
      schemaCreator(spec, response, ask.title, 0);
      channelIndex += 1;
    } else {
      schemaCreator(spec, data, ask.title, null);
    }
  } else {
    schemaCreator(spec, data, ask.title);
  }
}
