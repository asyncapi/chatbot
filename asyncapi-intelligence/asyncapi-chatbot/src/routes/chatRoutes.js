const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.post('/message', chatController.processMessage);

module.exports = router;