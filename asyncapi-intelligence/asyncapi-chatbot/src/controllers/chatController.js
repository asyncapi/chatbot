const aiService = require('../services/aiService');
const Conversation = require('../models/conversation');
const logger = require('../utils/logger');

exports.processMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    
    // Get or create conversation
    let conversation = conversationId 
      ? await Conversation.getById(conversationId)
      : Conversation.create();
    
    // Add user message to conversation
    conversation.addMessage('user', message);
    
    // Generate response using AI service
    const response = await aiService.generateResponse(message, conversation.getHistory());
    
    // Add bot response to conversation
    conversation.addMessage('bot', response);
    
    // Save conversation
    await conversation.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        response,
        conversationId: conversation.id
      }
    });
  } catch (error) {
    logger.error(`Error processing message: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process your message'
    });
  }
};
