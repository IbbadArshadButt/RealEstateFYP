import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, Headphones } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our customer service team",
    contact: "+92 21 111 111 456",
    action: "Call Now",
    onClick: (contact: string) => {
      window.location.href = `tel:${contact}`;
    }
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours",
    contact: "support@zameen.com",
    action: "Send Email",
    onClick: (contact: string) => {
      window.location.href = `mailto:${contact}?subject=Inquiry from Zameen Echo Homes`;
    }
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    contact: "Available 24/7",
    action: "Chat on WhatsApp",
    onClick: () => {
      window.open("https://wa.me/923081200084", "_blank");
    }
  },
  {
    icon: Headphones,
    title: "Support Center",
    description: "Browse our comprehensive help center",
    contact: "Self-service options",
    action: "Visit Center",
    onClick: () => {
      window.open("/help-center", "_blank");
    }
  }
];

const ContactMethods = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAction = (method: typeof contactMethods[0]) => {
    if (method.onClick) {
      method.onClick(method.contact);
    } else {
      toast({
        title: "Coming Soon",
        description: `${method.title} feature will be available soon.`,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
      {contactMethods.map((method, index) => (
        <Card
          key={index}
          className="text-center rounded-2xl shadow-lg border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:from-green-50 hover:to-blue-50 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Decorative gradient circle */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-200 via-blue-200 to-blue-100 opacity-30 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform" />
          <CardHeader className="relative z-10">
            <div className="bg-gradient-to-br from-green-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform">
              <method.icon className="w-8 h-8 text-white drop-shadow" />
            </div>
            <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-green-700 transition-colors">{method.title}</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-gray-600 text-sm mb-3 font-medium">{method.description}</p>
            <p className="font-semibold mb-4 text-blue-700 group-hover:text-green-700 transition-colors">{method.contact}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full font-semibold group-hover:bg-green-600 group-hover:text-white transition-colors"
              onClick={() => handleAction(method)}
            >
              {method.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContactMethods; 