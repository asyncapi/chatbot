document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const closeBtn = document.getElementById('closeBtn');
    const chatContainer = document.querySelector('.chat-container');
    const minimizedChat = document.querySelector('#minimizedChat');

    let conversationId = null;
  
    // Function to add messages to the chat
    function addMessage(message, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
      
      const messagePara = document.createElement('p');
      messagePara.textContent = message;
      
      messageDiv.appendChild(messagePara);
      chatMessages.appendChild(messageDiv);
      
      // Scroll to the bottom of the chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Function to send message to the server
    async function sendMessage(message) {
      try {
        const response = await fetch('/api/chat/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message,
            conversationId
          })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
          conversationId = data.data.conversationId;
          addMessage(data.data.response, false);
        } else {
          addMessage("Sorry, I'm having trouble understanding. Please try again.", false);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage("I'm having trouble connecting. Please check your internet connection.", false);
      }
    }
  
    // Event listener for send button
    sendBtn.addEventListener('click', () => {
      const message = chatInput.value.trim();
      
      if (message) {
        addMessage(message, true);
        chatInput.value = '';
        sendMessage(message);
      }
    });
  
    // Event listener for enter key
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const message = chatInput.value.trim();
        
        if (message) {
          addMessage(message, true);
          chatInput.value = '';
          sendMessage(message);
        }
      }
    });
  
    // Event listener for close button
    closeBtn.addEventListener('click', () => {
      // You can implement minimizing or closing behavior here
      // alert('Chat minimized!');
      // chatContainer.style.display = 'none';
      chatContainer.classList.toggle('minimized');
      minimizedChat.classList.toggle('minimized');
    });

    minimizedChat.addEventListener('click', () => {
      minimizedChat.classList.toggle('minimized');
      chatContainer.classList.toggle('minimized');
    }
    );
  
    // Focus the input field when the page loads
    chatInput.focus();
  });