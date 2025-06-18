const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
  checkFavorite
} = require('../controllers/favoriteController');

// All routes are protected
router.use(protect);

// Get user's favorites
router.get('/', getUserFavorites);

// Add to favorites
router.post('/', addToFavorites);

// Remove from favorites
router.delete('/:propertyId', removeFromFavorites);

// Check if property is favorited
router.get('/:propertyId/check', checkFavorite);

module.exports = router; 