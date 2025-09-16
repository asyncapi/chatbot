const express = require('express');
const path = require('path');
const chatRoutes = require('./src/routes/chatRoutes');
const logger = require('./src/utils/logger');

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/chat', chatRoutes);

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  logger.info(`AsyncAPI chatbot server running on port ${PORT}`);
});
