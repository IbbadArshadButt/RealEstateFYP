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
    required: true
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
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add a virtual for profile image URL
userSchema.virtual('profileImageUrl').get(function() {
  if (!this.profileImage) return '';
  return this.profileImage.startsWith('http') ? this.profileImage : `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${this.profileImage}`;
});

module.exports = mongoose.model('User', userSchema); 