import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { Property } from '../types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MessageSquare, Mail, Phone, User, Building } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Message {
  _id: string;
  propertyId: string;
  propertyTitle: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}

const AgentDashboard = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    console.log('AgentDashboard: user?._id =', user?._id);
    loadProperties();
    loadMessages();
  }, []);

  const loadProperties = async () => {
    try {
      console.log('Loading properties for agent:', user?._id);
      const allProperties = await propertyAPI.getProperties();
      console.log('All properties:', allProperties);

      // Filter properties for current agent
      const agentProperties = allProperties.filter(
        (property) => {
          const propertyAgentId = typeof property.agent === 'string' 
            ? property.agent 
            : property.agent._id;
          
          console.log('Comparing:', {
            propertyAgentId,
            userId: user?._id,
            matches: propertyAgentId === user?._id
          });
          
          return propertyAgentId === user?._id;
        }
      );

      console.log('Filtered agent properties:', agentProperties);
      setProperties(agentProperties);
    } catch (error: any) {
      console.error('Error loading properties:', error);
      toast({
        title: 'Error',
        description: 'Failed to load properties',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      console.log('Loading messages for agent:', user?._id);
      // Get the auth token from localStorage
      const token = localStorage.getItem('token');
      
      // Try to fetch real messages from the API with auth token
      const response = await fetch(`http://localhost:5000/api/messages/agent/${user?._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('API response for messages:', data);

      if (data.success && data.messages && data.messages.length > 0) {
        console.log('Found real messages:', data.messages);
        // Transform the API response to match our Message interface
        const realMessages: Message[] = data.messages.map((msg: any) => ({
          _id: msg._id,
          propertyId: msg.propertyId,
          propertyTitle: msg.propertyTitle,
          senderName: msg.senderName,
          senderEmail: msg.senderEmail,
          senderPhone: msg.senderPhone,
          message: msg.message,
          createdAt: msg.createdAt,
          status: msg.status || 'unread'
        }));
        console.log('Transformed messages:', realMessages);
        setMessages(realMessages);
      } else {
        console.log('No real messages found, showing dummy data');
        // Show dummy data if no real messages found
        showDummyMessages();
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      // Show dummy data on error
      showDummyMessages();
    }
  };

  const showDummyMessages = () => {
    const dummyMessages: Message[] = [
      {
        _id: '1',
        propertyId: '1',
        propertyTitle: 'Luxury Apartment in DHA',
        senderName: 'John Doe',
        senderEmail: 'john@example.com',
        senderPhone: '+92 300 1234567',
        message: 'I am interested in this property. Can you provide more details about the amenities?',
        createdAt: new Date().toISOString(),
        status: 'unread'
      },
      {
        _id: '2',
        propertyId: '2',
        propertyTitle: 'Modern Villa in Gulberg',
        senderName: 'Jane Smith',
        senderEmail: 'jane@example.com',
        senderPhone: '+92 301 2345678',
        message: 'What is the best time to schedule a visit?',
        createdAt: new Date().toISOString(),
        status: 'read'
      }
    ];
    setMessages(dummyMessages);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the message status in the local state
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg._id === messageId ? { ...msg, status: 'read' } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      markMessageAsRead(message._id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          <Button asChild>
            <Link to="/agent/property/add">Add New Property</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Messages Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Property Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No messages yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Sender</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message._id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-500" />
                            <span>{message.propertyTitle}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span>{message.senderName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(message.createdAt)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            message.status === 'unread' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {message.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewMessage(message)}
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Message Details</DialogTitle>
                                <DialogDescription>
                                  Inquiry for {message.propertyTitle}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <h4 className="font-semibold">Contact Information</h4>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <User className="w-4 h-4 text-gray-500" />
                                      <span>{message.senderName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4 text-gray-500" />
                                      <span>{message.senderEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-4 h-4 text-gray-500" />
                                      <span>{message.senderPhone}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-semibold">Message</h4>
                                  <p className="text-gray-600">{message.message}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button className="flex-1" variant="outline"
                                    onClick={() => {
                                      if (message.senderEmail) {
                                        window.open(`mailto:${message.senderEmail}`);
                                      }
                                    }}
                                  >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Reply via Email
                                  </Button>
                                  <Button className="flex-1" variant="outline"
                                    onClick={() => {
                                      if (message.senderPhone) {
                                        window.open(`tel:${message.senderPhone}`);
                                      }
                                    }}
                                  >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {messages.length === 0 && (
                <div className="p-4 bg-yellow-100 text-yellow-800 rounded mb-4">
                  No messages found for this agent. (Debug: Check agentId and backend response.)
                </div>
              )}
            </CardContent>
          </Card>

          {/* Properties Section */}
          <Card>
            <CardHeader>
              <CardTitle>My Properties</CardTitle>
            </CardHeader>
            <CardContent>
              {properties.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No properties listed yet.</p>
                  <Button asChild variant="outline">
                    <Link to="/agent/property/add">Add Your First Property</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div
                      key={property._id}
                      className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{property.title}</h3>
                        <p className="text-sm text-gray-600">{property.location}</p>
                        <p className="text-green-600 font-medium mt-1">
                          {formatPrice(property.price)}
                        </p>
                        <div className="flex gap-2 mt-2 text-sm text-gray-500">
                          <span>{property.bedrooms} beds</span>
                          <span>•</span>
                          <span>{property.bathrooms} baths</span>
                          <span>•</span>
                          <span>{property.area}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" asChild>
                          <Link to={`/property/${property._id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgentDashboard; 