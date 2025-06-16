import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Heart, Globe } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We ensure all listings are verified and provide secure transaction processes for your peace of mind."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our dedicated support team is available round the clock to assist you with any queries or concerns."
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction."
  },
  {
    icon: Globe,
    title: "Wide Coverage",
    description: "With presence across major cities in Pakistan, we help you find properties wherever you want to be."
  }
];

const ValuesSection = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">What We Stand For</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-2 border-gray-100 hover:border-green-100 transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/10 to-blue-500/10 rounded-bl-3xl"></div>

              <CardHeader className="relative">
                <div className="bg-gradient-to-br from-green-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuesSection; 