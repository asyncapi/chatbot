# Asyncapi Chatbot Documentation

# About the project

---

The AsyncApi chatbot is a way of exploring how we could help people to write the asyncapi spec document without knowing the specification. So based on a set of questions and answers it will generate an AsyncApi spec document according to the use cases.

*** Project demo video's coming soon ***

# Project Architecture

---

The Asyncapi chatbot was built using the following tech stack.

1. [Wit.ai](http://wit.ai) —> Used in building the bot's knowledge 
2. Node.js —> Used in writing the server-side bot's code
3. React.js —> Used in writing the client-side bot's code
4. Lerna —> Used in making the project a monorepo, for ease of testing purpose 

## Project's Flow

The project has two flows which are Question flow and Generation flow

1. Question Flow —> This is the module that allows the bot to handle anything question-related(the bot can only handle asyncapi-related questions). This functionality also enables the bot to have the capacity to handle questions in the middle of a conversation without losing track of the conversation.
2. Generator Flow —> This is the module that gives the bot the capacity to generate asyncapi spec document based on the user input and also validates user input based on the question asked by the bot. The spec is generated in real-time during the conversation.

## Project structuring

The project is structured in 3 parts which consist of the server, test-client, and client

### Server

The server structure consists of all the code that allows the bot to communicate with the users effectively. Here is a detailed explanation of each substructure in the server.

1.  Controllers —> This folder consist of the code handler that determines if the user's input is a question or a spec related input
2. Helpers —>  This folder consists of all the external modules the bot is using for communication. E.g. wit.js(for communicating with the [wit.ai](http://wit.ai) NLP) and socket.js(used for real-time communication between the bot and users)
3. Models —> This folder consists of all data required by the bot. E.g the question models which consist of all the questions the bot asks the user. 
4. Services —> This folder consists of codes that process the user's input. E.g the generatorFlow.js(this handles all the spec generation-related inputs), questionFlow.js(this handles all question-related inputs), and generator.js(this handles the generation of the final asyncapi specification in a YAML format
5. Utils —> This folder consists of all reusable codes used across the bots server-side e.g schema validation

### Test Client

This is an Interactive CLI that can be used to interact with the bot... Nothing much here

### Client

This folder consists of all interactive User interface code that we'll be used to interact with the bot from the browser [Coming soon] 

## Common bots vocabulary

1. Skip or Not now —> To tell the bot to skip a question
2. Exit or Kill—> To tell the bot to end the conversation [Not available yet]
3. ? —> To tell the bot to repeat the question [Not available yet]

# Project's Todo

---

- [ ]  An interactive user interface that can be plugged into the asycapi website, playground, and the upcoming studio
- [ ]  Ability to readout specs and give info about channels that users ask for from the spec
- [ ]  Handle and understand more vocabulary
- [ ]  Ability to answer more asyncapi related questions
- [ ]  Ability to modify an existing spec by parsing an existing spec link. So users can tell the bot they want to modify the specification

# Getting started

---

### Prerequisite

1. Git
2. Node: any 12.x version starting with v12.0.0 or greater
3. Yarn
4. A fork of the repo (for any contributions)
5. A clone of the [chatbots](https://github.com/asyncapi/chatbot) repo on your local machine

### Installation

1. cd [chatbots](https://github.com/asyncapi/chatbot) to go into the project root
2. yarn to install the dependencies

### Running locally

Follow this step to run the project with the live server

1. cd into packages/test-client
2. create a .env and add PORT=[http://167.71.46.87/](http://167.71.46.87/) API_KEY="reach out to the maintainers for an API key" to communicate with the live server.  
3. Run yarn start

Follow this step to run the project with local server

1. yarn start:dev to start the project
2. open [http://localhost:5000](http://localhost:5000/) to see the project server running
3. open [http://localhost:3000](http://localhost:3000/) to open the chatbot's UI in your favorite browser[Not available yet]

# Contributing

---

Coming soon