import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { uploadImages } from '@/services/api';
import { Loader2, X } from 'lucide-react';

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  existingImages?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesUploaded, existingImages = [] }) => {
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>(existingImages);
  const [uploadedImages, setUploadedImages] = useState<string[]>(existingImages);
  const [error, setError] = useState<string>('');

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Validate file types and sizes
    const validFiles = Array.from(files).filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setError('Some files were skipped. Please ensure all files are images under 5MB.');
      return;
    }

    if (validFiles.length + uploadedImages.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Create preview URLs and store them temporarily
      const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
      const currentPreviews = [...previewImages, ...newPreviewUrls];
      setPreviewImages(currentPreviews);

      // Upload to server
      const uploadedUrls = await uploadImages(validFiles);
      
      // Update states with the new URLs
      const newUploadedImages = [...uploadedImages, ...uploadedUrls];
      setUploadedImages(newUploadedImages);
      onImagesUploaded(newUploadedImages);

      // Clean up preview URLs
      newPreviewUrls.forEach(URL.revokeObjectURL);
      
      // Update preview images with the actual uploaded URLs
      setPreviewImages(newUploadedImages);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload images. Please try again.');
      
      // Revert preview images to the previous state
      setPreviewImages(uploadedImages);
    } finally {
      setUploading(false);
      // Clear the input field to allow uploading the same file again
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newUploadedImages = [...uploadedImages];
    newUploadedImages.splice(index, 1);
    setUploadedImages(newUploadedImages);
    setPreviewImages(newUploadedImages);
    onImagesUploaded(newUploadedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={uploading || uploadedImages.length >= 10}
          className="relative"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            'Add Images'
          )}
        </Button>
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <span className="text-sm text-gray-500">
          Upload up to 10 images (max 5MB each) - {uploadedImages.length}/10 uploaded
        </span>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {previewImages.map((url, index) => (
          <div key={`${url}-${index}`} className="relative group">
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload; 