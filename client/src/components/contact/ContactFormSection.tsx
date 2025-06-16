import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import api from "@/services/api";

const ContactFormSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiry_type: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/messages/contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: `${formData.inquiry_type ? `[${formData.inquiry_type.toUpperCase()}] ` : ''}${formData.message}`,
      });
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="rounded-2xl shadow-xl border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700 mb-2">Send us a Message</CardTitle>
        <p className="text-gray-600 font-medium">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <Label htmlFor="inquiry_type">Inquiry Type</Label>
              <Select onValueChange={(value) => handleInputChange("inquiry_type", value)}>
                <SelectTrigger className="rounded-lg focus:ring-2 focus:ring-green-500">
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buying">Buying Property</SelectItem>
                  <SelectItem value="selling">Selling Property</SelectItem>
                  <SelectItem value="renting">Renting Property</SelectItem>
                  <SelectItem value="listing">List My Property</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              required
              className="rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
              className="rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg font-bold py-3 rounded-lg shadow-md transition-all" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactFormSection; 