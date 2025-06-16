import { useState, useEffect } from "react";
import { MapPin, Bed, Bath, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Property } from "@/types";
import { propertyAPI } from "@/services/api";
import { formatPrice } from "@/lib/utils";

// Dummy data for fallback
const dummyProperties: Property[] = [
  {
    _id: "dummy1",
    title: "Luxury Villa in DHA Phase 5",
    description: "Beautiful luxury villa with modern amenities",
    location: "DHA Phase 5, Lahore",
    price: 25000000,
    bedrooms: 5,
    bathrooms: 4,
    area: "1 Kanal",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3"],
    type: "villa",
    featured: true,
    status: "available",
    features: ["Swimming Pool", "Garden", "Security"],
    agent: {
      _id: "agent1",
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      role: "agent",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "dummy2",
    title: "Modern Apartment in Gulberg",
    description: "Spacious apartment with city views",
    location: "Gulberg III, Lahore",
    price: 8500000,
    bedrooms: 3,
    bathrooms: 2,
    area: "1200 sq ft",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3"],
    type: "apartment",
    featured: true,
    status: "available",
    features: ["Elevator", "Parking", "Security"],
    agent: {
      _id: "agent2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "123-456-7890",
      role: "agent",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "dummy3",
    title: "Commercial Plaza in Johar Town",
    description: "Prime location commercial property",
    location: "Johar Town, Lahore",
    price: 50000000,
    bedrooms: 0,
    bathrooms: 8,
    area: "5000 sq ft",
    images: ["https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3"],
    type: "commercial",
    featured: true,
    status: "available",
    features: ["Parking", "Security", "Backup Power"],
    agent: {
      _id: "agent3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "123-456-7890",
      role: "agent",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "dummy4",
    title: "Elegant Villa in Bahria Town",
    description: "Luxurious villa in a prime location",
    location: "Bahria Town, Lahore",
    price: 35000000,
    bedrooms: 6,
    bathrooms: 5,
    area: "1.5 Kanal",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3"],
    type: "villa",
    featured: true,
    status: "available",
    features: ["Swimming Pool", "Garden", "Smart Home"],
    agent: {
      _id: "agent4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "123-456-7890",
      role: "agent",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        setLoading(true);
        const allProperties = await propertyAPI.getProperties();
        
        // Filter featured and recent properties
        const featuredProperties = allProperties
          .filter(property => 
            // Show properties marked as featured or added in the last 7 days
            property.featured || 
            new Date(property.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
          )
          .slice(0, 4); // Show max 4 properties

        setProperties(featuredProperties.length > 0 ? featuredProperties : dummyProperties);
      } catch (error) {
        console.error('Error loading featured properties:', error);
        setProperties(dummyProperties);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProperties();
  }, []);

  const getPropertyBadgeColor = (type: string) => {
    const colors = {
      house: "bg-blue-600",
      apartment: "bg-purple-600",
      commercial: "bg-orange-600",
      villa: "bg-emerald-600"
    };
    return colors[type as keyof typeof colors] || "bg-gray-600";
  };

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties, featuring the finest homes and investment opportunities across Pakistan
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {properties.map((property) => (
            <Card 
              key={property._id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-xl"
            >
              <Link to={`/property/${property._id}`}>
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img
                      src={property.images[0] || "https://placehold.co/400x300?text=No+Image"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.featured && (
                      <Badge className="bg-green-600">
                        Featured
                      </Badge>
                    )}
                    <Badge className={getPropertyBadgeColor(property.type)}>
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">{property.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-4">
                    {formatPrice(property.price)}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                  {property.agent && (
                    <div className="text-sm text-gray-600 border-t pt-3">
                      Listed by: {property.agent.name}
                    </div>
                  )}
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/properties">
            <Button 
              variant="outline" 
              size="lg"
              className="group hover:bg-green-600 hover:text-white hover:border-green-600"
            >
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 