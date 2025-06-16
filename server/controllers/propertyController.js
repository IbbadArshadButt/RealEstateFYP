const Property = require('../models/Property');

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    console.log('Getting all properties');
    const { agent } = req.query;
    
    // Build query
    const query = {};
    if (agent) {
      query.agent = agent;
    }
    
    const properties = await Property.find(query)
      .populate('agent', 'name email phone role')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${properties.length} properties`);
    res.json(properties);
  } catch (error) {
    console.error('Error getting properties:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('agent', 'name email phone role');
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Error getting property:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create property
const createProperty = async (req, res) => {
  try {
    console.log('Creating property with data:', {
      ...req.body,
      agent: req.user.userId
    });

    const property = await Property.create({
      ...req.body,
      agent: req.user.userId // From auth middleware
    });

    // Populate agent details before sending response
    const populatedProperty = await Property.findById(property._id)
      .populate('agent', 'name email phone role');

    console.log('Property created:', populatedProperty);
    res.status(201).json(populatedProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user is the property agent
    if (property.agent.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('agent', 'name email phone role');

    res.json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user is the property agent
    if (property.agent.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await property.remove();
    res.json({ message: 'Property removed' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
}; 