import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    if (searchLocation) params.append("location", searchLocation);
    if (propertyType) params.append("type", propertyType);
    if (priceRange) params.append("price", priceRange);
    
    // Navigate to properties page with filters
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative min-h-[600px] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect Home in Pakistan
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Discover thousands of properties for sale and rent across Pakistan's top locations
            </p>
          </div>
          
          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <form 
              onSubmit={handleSearch}
              className="bg-white rounded-2xl p-4 md:p-8 shadow-2xl backdrop-blur-sm bg-white/90"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Location Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10 h-12 bg-white"
                    />
                  </div>
                </div>

                {/* Property Type Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-12 bg-white">
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                        <SelectValue placeholder="Select type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="h-12 bg-white">
                      <div className="flex items-center">
                        <Coins className="h-5 w-5 text-gray-400 mr-2" />
                        <SelectValue placeholder="Select range" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5000000">Under 50 Lac</SelectItem>
                      <SelectItem value="5000000-10000000">50 Lac - 1 Crore</SelectItem>
                      <SelectItem value="10000000-25000000">1 - 2.5 Crore</SelectItem>
                      <SelectItem value="25000000-50000000">2.5 - 5 Crore</SelectItem>
                      <SelectItem value="50000000+">Above 5 Crore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="flex flex-col justify-end">
                  <label className="block text-sm font-medium text-transparent mb-2">Search</label>
                  <Button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white h-12 w-full"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <span className="text-gray-600">Popular:</span>
                <button 
                  type="button"
                  onClick={() => {
                    setPropertyType("house");
                    setSearchLocation("DHA");
                  }}
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Houses in DHA
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setPropertyType("apartment");
                    setSearchLocation("Gulberg");
                  }}
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Apartments in Gulberg
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setPropertyType("commercial");
                    setSearchLocation("Johar Town");
                  }}
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Commercial in Johar Town
                </button>
              </div>
            </form>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { number: "10,000+", label: "Properties" },
              { number: "5,000+", label: "Happy Customers" },
              { number: "500+", label: "Verified Agents" },
              { number: "20+", label: "Cities" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 