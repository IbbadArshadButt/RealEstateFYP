import { Home, Users, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Home, value: "1M+", label: "Properties Listed" },
  { icon: Users, value: "500K+", label: "Happy Customers" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" }
];

const StatsSection = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/10 to-blue-500/10 rounded-bl-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 