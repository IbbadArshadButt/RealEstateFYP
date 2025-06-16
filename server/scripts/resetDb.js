const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zameen_homes')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const resetDatabase = async () => {
  try {
    // Clear all collections
    await mongoose.connection.dropDatabase();
    console.log('Database cleared');

    // Create a test user
    const password = 'test123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const testUser = await User.create({
      name: 'Test Agent',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'agent',
      phone: '1234567890'
    });

    console.log('Test user created:', {
      email: testUser.email,
      password: 'test123',
      role: testUser.role
    });

    console.log('Database reset complete');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await mongoose.connection.close();
  }
};

resetDatabase(); 