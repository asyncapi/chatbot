# AsyncAPI Chatbot

A professional Node.js chatbot application for AsyncAPI that uses a fine-tuned model from Hugging Face Hub.

## Features

- Real-time chat interface
- Integration with Hugging Face model
- Conversation history management
- Modern UI with gradient design

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hugging Face API key

### Setup

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/asyncapi-chatbot.git
   cd asyncapi-chatbot
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Set up environment variables:
   Create a \`.env\` file in the root directory with:
   \`\`\`
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   PORT=3000
   \`\`\`

4. Start the application:
   \`\`\`
   npm start
   \`\`\`

## Usage

1. Open a browser and navigate to \`http://localhost:3000\`
2. Start interacting with the AsyncAPI chatbot!

## Project Structure

\`\`\`
asyncapi-chatbot/
├── src/                 # Application source code
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── public/              # Static files
│   ├── css/             # Stylesheets
│   ├── js/              # Client-side JavaScript
│   └── index.html       # Main HTML file
├── app.js               # Application entry point
├── package.json         # Project metadata
└── README.md            # Project documentation
\`\`\`

## License

MIT

## Acknowledgements

- [AsyncAPI](https://www.asyncapi.com/)
- [Hugging Face](https://huggingface.co/)
- [Express.js](https://expressjs.com/)