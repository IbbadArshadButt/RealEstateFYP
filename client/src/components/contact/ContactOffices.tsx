import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Building } from "lucide-react";

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

const ContactOffices = () => (
  <div className="space-y-6">
    <Card className="rounded-2xl shadow-xl border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Our Offices</CardTitle>
        <p className="text-gray-600 font-medium">
          Visit us at any of our locations across Pakistan.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {offices.map((office, index) => (
            <div key={index} className="border-b last:border-b-0 pb-6 last:pb-0">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Building className="w-8 h-8 text-green-600 mt-1" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-green-700 mb-1">{office.city} Office</h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-blue-400 mt-0.5 mr-2" />
                      <span className="text-gray-600 text-sm">{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600 text-sm">{office.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-gray-600 text-sm">{office.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600 text-sm">{office.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ContactOffices; 