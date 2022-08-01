/* eslint-disable import/no-extraneous-dependencies */
import Base64 from 'js-base64';
import defaultSpec from '../models/defaultSpec.json';
import { isJson } from '../utils/schemaValidators';

let specClone = defaultSpec;

export default function parserFlow(entities, socket, io, data) {
  // check if data coming from client is encoded and is JSON...
  const decodedData = Base64.decode(data);
  if (decodedData && isJson(decodedData)) {
    specClone = decodedData;
    return io.to(socket.id).emit('message', 'Now that i have your spec, what would you like to do?');
  }
  console.log(specClone);
}
