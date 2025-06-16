import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Star, Award, Home, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { agentAPI } from "@/services/api";
import { User } from "@/types";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Agents = () => {
  const [agents, setAgents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const data = await agentAPI.getAgents();
      setAgents(data);
    } catch (error: any) {
      console.error('Error loading agents:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load agents',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 mb-4" />
            <p className="text-lg">Loading agents...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meet Our Expert Agents</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with experienced real estate professionals who will help you find your dream property or sell your current one.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{agents.length}</div>
            <div className="text-gray-600">Expert Agents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">100%</div>
            <div className="text-gray-600">Verified Agents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">Fast</div>
            <div className="text-gray-600">Response Time</div>
          </div>
        </div>

        {/* Agents Grid */}
        {agents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No agents found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card key={agent._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={agent.profileImage || "https://placehold.co/300x300?text=Agent"}
                      alt={agent.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <div className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full p-1">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <p className="text-gray-600">Real Estate Agent</p>
                  {agent.phone && (
                    <div className="flex items-center justify-center text-gray-600">
                      <Phone className="w-4 h-4 mr-1" />
                      <span className="text-sm">{agent.phone}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-green-600">
                        {new Date(agent.createdAt).getFullYear()}
                      </div>
                      <div className="text-xs text-gray-600">Joined</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-green-600">Verified</div>
                      <div className="text-xs text-gray-600">Status</div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-2">
                    {agent.phone && (
                      <Button variant="outline" className="w-full" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Agent
                      </Button>
                    )}
                    <Button variant="outline" className="w-full" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Agent
                    </Button>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700" 
                      size="sm"
                      onClick={() => navigate(`/properties?agent=${agent._id}`)}
                    >
                      <Home className="w-4 h-4 mr-2" />
                      View Properties
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12 p-8 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Want to become an agent?</h2>
          <p className="text-gray-600 mb-6">
            Join our team of expert real estate professionals and grow your career with Pakistan's leading property platform.
          </p>
          <Link to="/register">
            <Button className="bg-green-600 hover:bg-green-700">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agents;
