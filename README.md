# Chatbot
The project's aim is to develop a chatbot that can help people create spec documents without knowing the specification.To get started with, the bot will consume the spec, JSON schema and serves the user as an expert. So based on a set of questions and answers it will generate an AsyncApi spec document according to the use cases.

## Getting Started
To get started with the AsyncApi Chatbot, you need to understand the project structure.

## Project Structure

- **Server** - contains all operations for the bot's knowledge
- **Test-Client** - quick interface to communicate with the bot via the CLI
- **Client** - renders the chatbot's interface in a UI

## To contribute

1. Clone the repository
2. cd into the clone repository
3. cd into each project Folder
4. run `yarn`
5. To start the server cd into the server and run `yarn start` and repeat for the rest of the project's root folders
6. Server runs on `localhost:5000`
