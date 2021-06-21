const questions = [
  {
    title: 'info',
    required: true,
    questions: [
      {
        text: "what's the name of your application?",
        type: 'string',
        required: true,
      },
      {
        text: "what's the version of your application?",
        type: 'number',
        required: true,
      },
      {
        text: 'how would you describe your application? What is its purpose?',
        type: 'string',
        required: false,
      },
    ],
  },
  {
    title: 'servers',
    text: "Let's describe where is your application available? where to connect to get and send messages?",
    required: false,
    questions: [
      {
        text: 'can you provide a URL of your server?',
        required: false,
        type: 'string',
      },
      {
        text: 'What protocol is your server using?',
        required: false,
        type: 'string',
      },
    ],
  },
  {
    title: 'messages',
    text: 'Would you like to specify what messages is your application producing or consuming?',
    required: false,
    canLoop: true,
    questions: [
      {
        text: 'what is the name of your first message?',
        required: true,
        type: 'string',
      },
      {
        text: 'please paste the schema of your message in JSON format',
        required: true,
        type: 'json',
      },
    ],
  },
  {
    title: 'channels',
    text: 'Are you ready to tell me what topics/channels to send or read messages from?',
    required: false,
    canLoop: true,
    questions: [
      {
        text: 'what is the name of the channel/topic?',
        required: true,
        type: 'string',
      },
      {
        text: 'what messages do you send there, provide names comma seperated',
        required: false,
        type: 'array',
      },
      {
        text: 'do you read some messages from this channel too?',
        required: false,
        type: 'array',
      },
    ],
  },
];

export default questions;
