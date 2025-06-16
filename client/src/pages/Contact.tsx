import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactHero from "@/components/contact/ContactHero";
import ContactMethods from "@/components/contact/ContactMethods";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactOffices from "@/components/contact/ContactOffices";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiry_type: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiry_type: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const offices = [
    {
      city: "Karachi",
      address: "Plot 23, Sector 32-A, Korangi Industrial Area, Karachi",
      phone: "+92 21 111 111 456",
      email: "karachi@zameen.com",
      hours: "Mon - Sat: 9:00 AM - 7:00 PM"
    },
    {
      city: "Lahore",
      address: "28-C, Main Boulevard, Gulberg III, Lahore",
      phone: "+92 42 111 111 456",
      email: "lahore@zameen.com",
      hours: "Mon - Sat: 9:00 AM - 7:00 PM"
    },
    {
      city: "Islamabad",
      address: "House 54, Street 15, F-8/1, Islamabad",
      phone: "+92 51 111 111 456",
      email: "islamabad@zameen.com",
      hours: "Mon - Sat: 9:00 AM - 7:00 PM"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our customer service team",
      contact: "+92 21 111 111 456",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@zameen.com",
      action: "Send Email"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 24/7",
      action: "Start Chat"
    },
    {
      icon: Headphones,
      title: "Support Center",
      description: "Browse our comprehensive help center",
      contact: "Self-service options",
      action: "Visit Center"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ContactHero />
      <div className="container mx-auto px-4 py-16">
        <ContactMethods />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactFormSection />
          <ContactOffices />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
