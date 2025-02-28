/* eslint-disable max-len */
const questions = [
  {
    title: 'asyncapi',
    required: true,
    questions: [
      {
        title: 'version',
        text: {
          value: 'what version of AsyncApi spec are you using?',
          type: 'array',
          items: ['2.4.0', '2.5.0'],
        },
        type: 'num',
        required: true,
      },
    ],
  },
  // {
  //   title: 'info',
  //   required: true,
  //   questions: [
  //     {
  //       title: 'title',
  //       text: {
  //         value: "what's the name of your application?",
  //         type: 'string',
  //       },
  //       type: 'string',
  //       required: true,
  //     },
  //     {
  //       title: 'version',
  //       text: {
  //         value: "what's the version of your application?",
  //         type: 'number',
  //       },
  //       type: 'number',
  //       required: true,
  //     },
  //     {
  //       title: 'description',
  //       text: {
  //         value:
  //           'how would you describe your application? What is its purpose?',
  //         type: 'string',
  //       },
  //       type: 'string',
  //       required: false,
  //     },
  //   ],
  // },
  {
    title: 'servers',
    text: {
      type: 'boolean',
      value:
        'Would you like to describe where your application is available and where to connect to get and send messages?',
    },
    required: false,
    questions: [
      {
        text: {
          value: 'Is this a production or development server?',
          type: 'array',
          items: ['Production', 'Development'],
        },
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
    text: {
      type: 'boolean',
      value:
        'Would you like to specify what messages your application is producing or consuming?',
    },
    required: true,
    canLoop: true,
    questions: [
      {
        text: {
          value: 'what is the name of your message?',
          type: 'string',
        },
        required: true,
        type: 'string',
      },
      {
        title: 'payload',
        text: {
          value: 'Please paste the shape of your message in JSON Schema format',
          type: 'string',
        },
        required: true,
        type: 'schema',
      },
    ],
    loopText: {
      value: 'Would you like to add another message to your application?',
      type: 'boolean',
    },
  },
  {
    title: 'channels',
    text: {
      value:
        'Are you ready to tell me what channels/topics/events to send or read messages from?',
      type: 'boolean',
    },
    canLoop: true,
    required: true,
    questions: [
      {
        text: {
          value: 'what is the name of the channel/topic/event?',
          type: 'string',
        },
        required: true,
        type: 'string',
      },
      {
        text: {
          title: 'publish',
          value: 'what messages do you send here? List of messages below',
          required: false,
          type: 'array',
        },
      },
      {
        text: {
          title: 'subscribe',
          value:
            'do you read some messages from this channel too? List of messages below',
          required: false,
          type: 'array',
        },
      },
    ],
    loopText: {
      value:
        'Would you like to add another channel/topic/event to your application?',
      type: 'boolean',
    },
  },
];

export default questions;
