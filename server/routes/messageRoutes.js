const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect, isAgent } = require('../middleware/auth');

// Create a new message (public route)
router.post('/', messageController.createMessage);

// Contact form (public route, sends to fixed email)
router.post('/contact', messageController.contactForm);

// Get messages for an agent (protected route)
router.get('/agent/:agentId', protect, isAgent, messageController.getAgentMessages);

// Mark message as read (protected route)
router.put('/:messageId/read', protect, isAgent, messageController.markMessageAsRead);

// Get unread message count (protected route)
router.get('/agent/:agentId/unread', protect, isAgent, messageController.getUnreadCount);

module.exports = router; 