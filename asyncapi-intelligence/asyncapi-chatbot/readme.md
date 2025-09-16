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

1. Open a browser and navigate to \`http://localhost:3000`
2. Start interacting with the AsyncAPI chatbot!

## Project Structure

asyncapi-chatbot /	<br/>
|---	src/							# Application source code <br/>
|	|--- config/					#	Configuration files	<br/>		
|	|---  --- controllers/	#Request handlers<br/>
|	|---  --- models/			# Data models<br/>
|	|---  --- routes/			#	API routes<br/>
|	|---  --- services/		# Business logic<br/>
|	|---  --- utils/				# Utility functions <br/>
|--- public						# Static files<br/>
|	|---  --- css/				# Stylesheets		<br/>
|	|---  --- js/					# Client-side JavaScript<br/>
|	|--- --- index.html	    # Main Html File<br/>
|--- app.js						# Application entry point<br/>
|--- package.json			# Project metadata<br/>
|--- Readme.md				# Project documentation<br/>



## screenshots
![image](https://github.com/user-attachments/assets/144fd66e-9aee-4cf0-8d4b-ebb90a838a46)

![image](https://github.com/user-attachments/assets/8197aa5f-bd38-43d9-8d74-1d87c01251ee)


## License

MIT

##

## Acknowledgements

- [AsyncAPI](https://www.asyncapi.com/)
- [Hugging Face](https://huggingface.co/)
- [Express.js](https://expressjs.com/)
