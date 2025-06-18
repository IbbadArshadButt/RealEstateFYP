import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Bed, Bath, Ruler, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Property } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://realestatefyp.onrender.com/api'
  : 'http://localhost:5000/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load favorites');
      }

      const data = await response.json();
      setFavorites(data);
    } catch (error: any) {
      console.error('Error loading favorites:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load favorites',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (propertyId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/favorites/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }

      setFavorites(prev => prev.filter(fav => fav._id !== propertyId));
      toast({
        title: 'Success',
        description: 'Property removed from favorites',
      });
    } catch (error: any) {
      console.error('Error removing favorite:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to remove from favorites',
        variant: 'destructive',
      });
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `PKR ${(price / 10000000).toFixed(2)} Crore`;
    } else if (price >= 100000) {
      return `PKR ${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `PKR ${price.toLocaleString()}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 mb-4" />
            <p className="text-lg">Loading favorites...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Favorite Properties</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No favorite properties yet.</p>
            <Link to="/properties">
              <Button className="bg-green-600 hover:bg-green-700">
                Browse Properties
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <Card key={property._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/properties/${property._id}`}>
                  <div className="relative h-48">
                    <img
                      src={property.images[0] || "https://placehold.co/600x400?text=No+Image"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-white/80 hover:bg-white"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFavorite(property._id);
                        }}
                      >
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      </Button>
                    </div>
                  </div>
                </Link>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm line-clamp-1">{property.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge>{property.type}</Badge>
                    <span className="font-bold text-green-600">{formatPrice(property.price)}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-gray-50 rounded">
                      <Bed className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-sm">{property.bedrooms}</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <Bath className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-sm">{property.bathrooms}</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <Ruler className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-sm">{property.area}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorites; 