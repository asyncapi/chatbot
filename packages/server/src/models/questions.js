const questions = [
  {
    title: 'asyncapi',
    required: true,
    questions: [
      {
        title: 'version',
        text: 'what version of AsyncApi spec are you using?',
        type: 'number',
        required: true,
      },
    ],
  },
  {
    title: 'info',
    required: true,
    questions: [
      {
        title: 'title',
        text: "what's the name of your application?",
        type: 'string',
        required: true,
      },
      {
        title: 'version',
        text: "what's the version of your application?",
        type: 'number',
        required: true,
      },
      {
        title: 'description',
        text: 'how would you describe your application? What is its purpose?',
        type: 'string',
        required: false,
      },
    ],
  },
  {
    title: 'servers',
    text: 'Would you like to describe where your application is available and where to connect to get and send messages?',
    required: false,
    questions: [
      {
        text: 'Is this a production or development server?',
        required: true,
        type: 'string',
      },
      {
        title: 'url',
        text: 'can you provide a URL of your server?',
        required: true,
        type: 'url',
      },
      {
        title: 'protocol',
        text: 'What protocol is your server using?',
        required: true,
        type: 'string',
      },
    ],
  },
  {
    title: 'messages',
    text: 'Would you like to specify what messages your application is producing or consuming?',
    required: false,
    canLoop: true,
    questions: [
      {
        text: 'what is the name of your message?',
        required: true,
        type: 'string',
      },
      {
        title: 'payload',
        text: 'Please paste the shape of your message in JSON Schema format',
        required: true,
        type: 'schema',
      },
    ],
    loopText: 'Would you like to add another message to your application?',
  },
  {
    title: 'channels',
    text: 'Are you ready to tell me what channels/topics/events to send or read messages from?',
    canLoop: true,
    required: true,
    questions: [
      {
        text: 'what is the name of the channel/topic/event?',
        required: true,
        type: 'string',
      },
      {
        title: 'publish',
        text: 'what messages do you send there, provide names comma seperated',
        required: false,
        type: 'string',
      },
      {
        title: 'subscribe',
        text: 'do you read some messages from this channel too? provide names comma seperated',
        required: false,
        type: 'string',
      },
    ],
    loopText:
      'Would you like to add another channel/topic/event to your application?',
  },
];

export default questions;
