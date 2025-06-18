const Favorite = require('../models/Favorite');
const Property = require('../models/Property');

// Get user's favorites
const getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.userId })
      .populate({
        path: 'property',
        populate: {
          path: 'agent',
          select: 'name email phone profileImage'
        }
      });

    res.json(favorites.map(fav => fav.property));
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add to favorites
const addToFavorites = async (req, res) => {
  try {
    const { propertyId } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      user: req.user.userId,
      property: propertyId
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Property already in favorites' });
    }

    const favorite = await Favorite.create({
      user: req.user.userId,
      property: propertyId
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove from favorites
const removeFromFavorites = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      user: req.user.userId,
      property: propertyId
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check if property is favorited by user
const checkFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const favorite = await Favorite.findOne({
      user: req.user.userId,
      property: propertyId
    });

    res.json({ isFavorite: !!favorite });
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
  checkFavorite
}; 