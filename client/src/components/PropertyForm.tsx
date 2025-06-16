import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from './ImageUpload';

interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  location: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  images: string[];
}

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => Promise<void>;
  initialData?: Partial<PropertyFormData>;
  loading?: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  onSubmit,
  initialData = {},
  loading = false,
}) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'house',
    bedrooms: '',
    bathrooms: '',
    area: '',
    images: [],
    ...initialData,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagesUploaded = (urls: string[]) => {
    setFormData(prev => ({ ...prev, images: urls }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.type) {
      alert('Please select a property type');
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <Label htmlFor="title">Property Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Modern 3 Bedroom Villa"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your property..."
          required
          rows={5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price (PKR) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            placeholder="e.g., 25000000"
            required
          />
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="e.g., DHA Phase 6, Lahore"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Property Type *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleInputChange('type', value)}
            required
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="area">Area *</Label>
          <Input
            id="area"
            value={formData.area}
            onChange={(e) => handleInputChange('area', e.target.value)}
            placeholder="e.g., 10 Marla, 1200 sq ft"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bedrooms">Bedrooms *</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => handleInputChange('bedrooms', e.target.value)}
            placeholder="Number of bedrooms"
            required
            min="0"
          />
        </div>

        <div>
          <Label htmlFor="bathrooms">Bathrooms *</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) => handleInputChange('bathrooms', e.target.value)}
            placeholder="Number of bathrooms"
            required
            min="0"
          />
        </div>
      </div>

      <div>
        <Label>Property Images *</Label>
        <ImageUpload
          onImagesUploaded={handleImagesUploaded}
          existingImages={formData.images}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={loading || formData.images.length === 0}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default PropertyForm; 