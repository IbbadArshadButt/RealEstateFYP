const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const propertyRoutes = require('./routes/properties');
// const inquiryRoutes = require('./routes/inquiries');
const uploadRoutes = require('./routes/upload');
const reviewRoutes = require('./routes/reviews');
const messageRoutes = require('./routes/messageRoutes');
const favoriteRoutes = require('./routes/favorites');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Add support for parsing multipart/form-data
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  if (req.file || req.files) {
    console.log('Files:', req.file || req.files);
  }
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zameen_homes')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
// app.use('/api/inquiries', inquiryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/favorites', favoriteRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Zameen Echo Homes API' });
});

// Catch-all handler for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 