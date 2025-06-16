import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { propertyAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import PropertyForm from '@/components/PropertyForm';
import Footer from '@/components/Footer';

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);

    try {
      // Convert numeric fields
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        agent: user?._id
      };

      await propertyAPI.createProperty(propertyData);
      
      toast({
        title: 'Success',
        description: 'Property listed successfully',
      });
      
      navigate('/agent/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to list property',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Add New Property</h1>
          
          <PropertyForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProperty; 