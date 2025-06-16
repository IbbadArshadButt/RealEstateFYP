import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MissionVisionSection = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Our Purpose</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Mission & Vision</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="group relative overflow-hidden border-2 border-green-100 hover:border-green-200 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-4 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full"></div>
              <CardTitle className="text-3xl font-bold text-green-600">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-gray-600 leading-relaxed text-lg">
                To empower every Pakistani with the knowledge, tools, and confidence to make informed 
                real estate decisions. We strive to create a transparent, efficient, and accessible 
                property marketplace that serves the needs of buyers, sellers, tenants, and landlords alike.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-2 border-blue-100 hover:border-blue-200 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-4 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full"></div>
              <CardTitle className="text-3xl font-bold text-blue-600">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-gray-600 leading-relaxed text-lg">
                To be the most trusted and comprehensive real estate platform in Pakistan, setting the 
                standard for excellence in property services. We envision a future where every property 
                transaction is seamless, secure, and satisfying for all parties involved.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionSection; 