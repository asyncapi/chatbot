const axios = require('axios');
const modelConfig = require('../config/model');
const logger = require('../utils/logger');

exports.generateResponse = async (message, conversationHistory) => {
  try {
    const url = `https://api-inference.huggingface.co/models/${modelConfig.modelId}`;
    
    // Format conversation history for the model
    const formattedHistory = conversationHistory.map(msg => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n');
    
    // Prepare input for the model
    const input = formattedHistory + `\nUser: ${message}\nAssistant:`;
    
    // Call Hugging Face API
    const response = await axios.post(url, 
      { inputs: input, parameters: modelConfig.modelOptions },
      { 
        headers: { 
          'Authorization': `Bearer ${modelConfig.huggingFaceApiKey}`,
          'Content-Type': 'application/json' 
        } 
      }
    );
    
    if (response.data && response.data[0] && response.data[0].generated_text) {
      // Extract only the assistant's response from the generated text
      const fullText = response.data[0].generated_text;
      const assistantResponse = fullText.split('Assistant:').pop().trim();
      return assistantResponse;
    }
    
    return "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    logger.error(`Error generating AI response: ${error.message}`);
    return "I'm having trouble connecting to my brain. Please try again later.";
  }
};