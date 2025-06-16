const Message = require('../models/Message');
const Property = require('../models/Property');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { propertyId, senderName, senderEmail, senderPhone, message } = req.body;

    // Get property details
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Get agent ID from property and ensure it's a string
    const agentId = property.agent.toString();
    console.log('Creating message with:', { propertyId, agentId, senderName });

    // Create new message
    const newMessage = new Message({
      propertyId,
      propertyTitle: property.title,
      agentId,
      senderName,
      senderEmail,
      senderPhone,
      message
    });

    await newMessage.save();
    console.log('Message saved successfully:', newMessage);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};

// Get messages for an agent
exports.getAgentMessages = async (req, res) => {
  try {
    const { agentId } = req.params;
    console.log('getAgentMessages called with agentId:', agentId);

    // First, let's check if we have any messages at all
    const allMessages = await Message.find({}).lean();
    console.log('Total messages in DB:', allMessages.length);
    console.log('All messages:', allMessages);

    // Now check messages for this specific agent
    const messages = await Message.find({ agentId: new mongoose.Types.ObjectId(agentId) })
      .sort({ createdAt: -1 })
      .lean();
    console.log('Messages found for agent:', messages.length);
    console.log('Messages for agent:', messages);

    res.status(200).json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Error fetching agent messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};

// Mark message as read
exports.markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByIdAndUpdate(
      messageId,
      { status: 'read' },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating message status',
      error: error.message
    });
  }
};

// Get unread message count for an agent
exports.getUnreadCount = async (req, res) => {
  try {
    const { agentId } = req.params;

    // Ensure agentId is always an ObjectId for the query
    const count = await Message.countDocuments({
      agentId: new mongoose.Types.ObjectId(agentId),
      status: 'unread'
    });

    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting unread count',
      error: error.message
    });
  }
};

// Send contact form to fixed email
exports.contactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Configure your SMTP transport (use your real credentials or environment variables)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL_USER || 'your_gmail@gmail.com',
        pass: process.env.CONTACT_EMAIL_PASS || 'your_gmail_app_password'
      }
    });

    const mailOptions = {
      from: email,
      to: 'ibbadbutt3521@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent to admin email.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
  }
}; 