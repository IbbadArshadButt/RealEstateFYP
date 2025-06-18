const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Minimum 8 characters and at least one number
        return v.length >= 8 && /\d/.test(v);
      },
      message: 'Password must be at least 8 characters long and contain at least one number'
    }
  },
  role: {
    type: String,
    enum: ['user', 'agent'],
    default: 'user'
  },
  phone: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: function(doc, ret) {
    // Add full URL for profileImage if it exists
    if (ret.profileImage) {
      ret.profileImage = ret.profileImage.startsWith('http') 
        ? ret.profileImage 
        : `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${ret.profileImage}`;
    }
    return ret;
  }},
  toObject: { virtuals: true }
});

// Add a virtual for profile image URL
userSchema.virtual('profileImageUrl').get(function() {
  if (!this.profileImage) return '';
  return this.profileImage.startsWith('http') ? this.profileImage : `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${this.profileImage}`;
});

module.exports = mongoose.model('User', userSchema); 