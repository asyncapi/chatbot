import { Wit, log, interactive } from 'node-wit';

const client = new Wit({ accessToken: process.env.WIT_TOKEN });
client
  .message('what is the weather in London?', {})
  .then((data) => {
    console.log(`Yay, got Wit.ai response: ${JSON.stringify(data)}`);
  })
  .catch(console.error);

interactive(client);
