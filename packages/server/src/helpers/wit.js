import { Wit, interactive } from 'node-wit';

const client = new Wit({ accessToken: process.env.WIT_TOKEN });

export default client;
