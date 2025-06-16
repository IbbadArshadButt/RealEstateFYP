const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  propertyTitle: {
    type: String,
    required: true
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  senderEmail: {
    type: String,
    required: true
  },
  senderPhone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread'
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
messageSchema.index({ agentId: 1, status: 1 });
messageSchema.index({ propertyId: 1 });
messageSchema.index({ createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message; 