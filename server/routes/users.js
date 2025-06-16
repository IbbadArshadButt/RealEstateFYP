const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const { upload } = require('../config/cloudinary');

// Get all agents
router.get('/agents', async (req, res) => {
  try {
    console.log('Fetching agents...');
    
    const agents = await User.find({ role: 'agent' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${agents.length} agents`);
    
    res.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ 
      message: 'Failed to fetch agents',
      error: error.message 
    });
  }
});

// Get all users (protected, for testing)
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all users...');
    
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${users.length} users`);
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      message: 'Failed to fetch users',
      error: error.message 
    });
  }
});

// Update profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      profileImage: updatedUser.profileImageUrl
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile image
router.put('/profile/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    console.log('Uploaded file:', req.file);

    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profileImage = req.file.path;
    const updatedUser = await user.save();

    console.log('Updated user:', {
      id: updatedUser._id,
      profileImage: updatedUser.profileImage,
      profileImageUrl: updatedUser.profileImageUrl
    });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      profileImage: updatedUser.profileImageUrl
    });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 