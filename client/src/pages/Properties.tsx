import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Car, Heart, Search, Filter, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { propertyAPI } from "@/services/api";
import { Property } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 5000000000]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("location") || "");
  const [propertyType, setPropertyType] = useState<string>(searchParams.get("type") || "all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const { toast } = useToast();

  // Get agent ID from URL if present
  const agentId = searchParams.get('agent');

  useEffect(() => {
    loadProperties();
  }, [searchParams]);

  useEffect(() => {
    // Update filters when search params change
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const price = searchParams.get("price");

    if (location) setSearchQuery(location);
    if (type) setPropertyType(type);
    if (price) {
      const [min, max] = price.split("-").map(Number);
      if (max) {
        setPriceRange([min, max]);
      } else {
        // Handle "50000000+" case
        setPriceRange([min, 5000000000]);
      }
    }
  }, [searchParams]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching properties...');
      
      const data = await propertyAPI.getProperties(agentId ? { agent: agentId } : undefined);
      console.log('Properties fetched:', data);
      
      if (!Array.isArray(data)) {
        console.error('Invalid properties data:', data);
        throw new Error('Invalid properties data received');
      }
      
      setProperties(data);
    } catch (error: any) {
      console.error('Error loading properties:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load properties';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      setProperties([]);
    } finally {
      setLoading(false);
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

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setPropertyType("all");
    setBedrooms("all");
    setPriceRange([0, 5000000000]);
    setSortBy("default");
  }, []);

  const handlePropertyTypeChange = useCallback((value: string) => {
    console.log('Property type changed to:', value);
    setPropertyType(value);
  }, []);

  const handleBedroomsChange = useCallback((value: string) => {
    console.log('Bedrooms changed to:', value);
    setBedrooms(value);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    console.log('Sort changed to:', value);
    setSortBy(value);
  }, []);

  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = propertyType === 'all' || property.type === propertyType;
      
      const matchesBedrooms = bedrooms === 'all' || 
                            (bedrooms === "4+" ? property.bedrooms >= 4 : property.bedrooms === parseInt(bedrooms));
      
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

      return matchesSearch && matchesType && matchesBedrooms && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'default':
        default:
          return 0;
      }
    });

  // Get agent name for header
  const agentName = properties[0]?.agent?.name;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 mb-4" />
            <p className="text-lg">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <p className="text-lg text-red-600 mb-4">Error: {error}</p>
            <Button onClick={loadProperties}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Agent Properties Header */}
        {agentId && agentName && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Properties by {agentName}</h1>
            <p className="text-gray-600">
              Browse all properties listed by this agent
            </p>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={propertyType} onValueChange={handlePropertyTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={bedrooms} onValueChange={handleBedroomsChange}>
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4+">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={resetFilters}
            >
              <Filter className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range (PKR)</label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={5000000000}
                step={1000000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {agentId ? `Properties by ${agentName}` : 'Properties for Sale'}
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">{filteredProperties.length} results</span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
            <Button onClick={resetFilters} className="mt-4">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.images[0] || "https://placehold.co/400x300?text=No+Image"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-green-600">
                    {new Date(property.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 ? 'New' : property.type}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">{formatPrice(property.price)}</span>
                    <span className="text-gray-600">{property.area}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                  </div>
                  <Link to={`/property/${property._id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
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

export default Properties;
