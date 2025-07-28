const { v4: uuidv4 } = require('uuid');

class Conversation {
  constructor(id = null) {
    this.id = id || uuidv4();
    this.messages = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  addMessage(role, content) {
    this.messages.push({
      role,
      content,
      timestamp: new Date()
    });
    this.updatedAt = new Date();
  }

  getHistory() {
    return this.messages;
  }

  async save() {
    // In a real application, you would save to a database
    // For this simple example, we're just returning the object
    this.updatedAt = new Date();
    return this;
  }

  static create() {
    return new Conversation();
  }

  static async getById(id) {
    // In a real application, you would fetch from a database
    // For this simple example, we're creating a new one
    return new Conversation(id);
  }
}

module.exports = Conversation;
