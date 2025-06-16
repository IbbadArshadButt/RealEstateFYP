import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { propertyAPI } from "@/services/api";
import { Property } from "@/types";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Heart, 
  Share2, 
  Phone, 
  Mail,
  Calendar as CalendarIcon,
  Ruler,
  Home,
  Building,
  Loader2,
  MessageSquare
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;
  const [scheduleForm, setScheduleForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: todayStr,
    time: "",
    notes: ""
  });
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        if (!id) {
          throw new Error('Property ID is required');
        }
        
        const data = await propertyAPI.getProperty(id);
        setProperty(data);
      } catch (error: any) {
        console.error('Error loading property:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to load property details',
          variant: 'destructive',
        });
        navigate('/properties');
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id, navigate, toast]);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `PKR ${(price / 10000000).toFixed(2)} Crore`;
    } else if (price >= 100000) {
      return `PKR ${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `PKR ${price.toLocaleString()}`;
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property?._id,
          senderName: contactForm.name,
          senderEmail: contactForm.email,
          senderPhone: contactForm.phone,
          message: contactForm.message
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message Sent",
          description: "Your message has been sent to the agent. They will contact you shortly.",
        });

        // Reset form
        setContactForm({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduling(true);

    try {
      const scheduleDate = new Date(scheduleForm.date);
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property?._id,
          senderName: scheduleForm.name,
          senderEmail: scheduleForm.email,
          senderPhone: scheduleForm.phone,
          message: `Schedule Visit Request:
Date: ${format(scheduleDate, 'PPP')}
Time: ${scheduleForm.time}
Notes: ${scheduleForm.notes}`
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Visit Scheduled",
          description: "Your visit request has been sent to the agent. They will contact you shortly to confirm.",
        });

        // Reset form
        setScheduleForm({
          name: "",
          email: "",
          phone: "",
          date: todayStr,
          time: "",
          notes: ""
        });
      } else {
        throw new Error(data.message || 'Failed to schedule visit');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to schedule visit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  const handleScheduleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setScheduleForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 mb-4" />
            <p className="text-lg">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <p className="text-lg text-red-600">Property not found</p>
            <Button onClick={() => navigate('/properties')} className="mt-4">
              Back to Properties
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative">
                <img
                  src={property.images[currentImageIndex] || "https://placehold.co/800x600?text=No+Image"}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {property.images.length > 0 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Property ${index + 1}`}
                        className={`w-20 h-16 object-cover rounded cursor-pointer ${
                          index === currentImageIndex ? 'ring-2 ring-green-600' : ''
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{property.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge>{property.type}</Badge>
                      <span className="text-3xl font-bold text-green-600">{formatPrice(property.price)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Bed className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <div className="font-semibold">{property.bedrooms}</div>
                        <div className="text-sm text-gray-600">Bedrooms</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Bath className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <div className="font-semibold">{property.bathrooms}</div>
                        <div className="text-sm text-gray-600">Bathrooms</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Ruler className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <div className="font-semibold">{property.area}</div>
                        <div className="text-sm text-gray-600">Area</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Home className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <div className="font-semibold">{property.type}</div>
                        <div className="text-sm text-gray-600">Type</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.features?.map((feature, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                          <span>{feature}</span>
                        </div>
                      )) || (
                        <p className="text-gray-600">No features listed for this property.</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="location" className="mt-6">
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Map will be available soon</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent>
                {property.agent && typeof property.agent !== 'string' ? (
                  <>
                    <div className="flex items-center mb-4">
                      <img
                        src={property.agent.profileImage || "https://placehold.co/100x100?text=Agent"}
                        alt={property.agent.name}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-semibold">{property.agent.name}</div>
                        <div className="text-sm text-gray-600">Real Estate Agent</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Contact Agent</DialogTitle>
                            <DialogDescription>
                              Send a message to {property.agent.name} about this property.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                name="name"
                                value={contactForm.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={contactForm.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={contactForm.phone}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="message">Message</Label>
                              <Textarea
                                id="message"
                                name="message"
                                value={contactForm.message}
                                onChange={handleInputChange}
                                required
                                rows={4}
                              />
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                "Send Message"
                              )}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button className="w-full" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        {property.agent.phone || "Contact Agent"}
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => {
                          if (property.agent && typeof property.agent !== 'string' && property.agent.email) {
                            window.location.href = `mailto:${property.agent.email}?subject=Inquiry about ${property.title}`;
                          } else {
                            toast({
                              title: "Error",
                              description: "Agent email not available",
                              variant: "destructive",
                            });
                          }
                        }}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email Agent
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Schedule Visit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md w-full max-h-[80vh] mt-20 overflow-y-auto rounded-lg shadow-lg">
                          <DialogHeader>
                            <DialogTitle>Schedule Property Visit</DialogTitle>
                            <DialogDescription>
                              Choose your preferred date and time to visit this property.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleScheduleSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                name="name"
                                value={scheduleForm.name}
                                onChange={handleScheduleInputChange}
                                required
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={scheduleForm.email}
                                onChange={handleScheduleInputChange}
                                required
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={scheduleForm.phone}
                                onChange={handleScheduleInputChange}
                                required
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="date">Preferred Date</Label>
                              <Input
                                id="date"
                                name="date"
                                type="date"
                                value={scheduleForm.date}
                                onChange={e => setScheduleForm(prev => ({ ...prev, date: e.target.value }))}
                                required
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="time">Preferred Time</Label>
                              <Input
                                id="time"
                                name="time"
                                type="time"
                                value={scheduleForm.time}
                                onChange={handleScheduleInputChange}
                                required
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="notes">Additional Notes</Label>
                              <Textarea
                                id="notes"
                                name="notes"
                                value={scheduleForm.notes}
                                onChange={handleScheduleInputChange}
                                rows={3}
                                placeholder="Any specific requirements or questions?"
                                className="w-full"
                              />
                            </div>
                            <Button type="submit" className="w-full" disabled={isScheduling}>
                              {isScheduling ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Scheduling...
                                </>
                              ) : (
                                "Schedule Visit"
                              )}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-600 text-center">Agent information not available</p>
                )}
              </CardContent>
            </Card>

            {/* Mortgage Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Mortgage calculator coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
