const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { protect, isAgent } = require('../middleware/auth');

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getProperty);

// Protected routes (agents only)
router.post('/', protect, isAgent, createProperty);
router.put('/:id', protect, isAgent, updateProperty);
router.delete('/:id', protect, isAgent, deleteProperty);

module.exports = router; 