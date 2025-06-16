const express = require('express');
const router = express.Router();
const { upload, cloudinary } = require('../config/cloudinary');
const { protect } = require('../middleware/auth');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Upload route is working' });
});

// Handle multiple image uploads
router.post('/images', function(req, res, next) {
  protect(req, res, function(err) {
    if (err) return next(err);
    
    upload.array('images', 10)(req, res, async function(err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: 'No files uploaded' });
        }

        const imageUrls = req.files.map(file => file.path);

        res.status(200).json({
          message: 'Images uploaded successfully',
          images: imageUrls
        });
      } catch (error) {
        console.error('Error uploading images:', error);

        // Clean up any uploaded files on error
        if (req.files) {
          for (const file of req.files) {
            if (file.path) {
              try {
                const publicId = file.path.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
              } catch (deleteError) {
                console.error('Error deleting file:', deleteError);
              }
            }
          }
        }

        res.status(500).json({ 
          message: 'Error uploading images',
          error: error.message
        });
      }
    });
  });
});

module.exports = router; 