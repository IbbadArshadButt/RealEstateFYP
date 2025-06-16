const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Add user to request
    req.user = {
      userId: user._id,
      role: user.role
    };
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

const isAgent = (req, res, next) => {
  if (req.user && req.user.role === 'agent') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an agent' });
  }
};

module.exports = { protect, isAgent }; 