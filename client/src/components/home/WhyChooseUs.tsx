import { Home, Users, Star } from "lucide-react";

const features = [
  {
    icon: <Home className="h-12 w-12 text-green-600" />,
    title: "Wide Range of Properties",
    description: "Browse through thousands of verified properties across Pakistan. From luxury villas to affordable apartments, we have something for everyone."
  },
  {
    icon: <Users className="h-12 w-12 text-green-600" />,
    title: "Expert Real Estate Agents",
    description: "Our platform connects you with experienced and professional real estate agents who can guide you through every step of your property journey."
  },
  {
    icon: <Star className="h-12 w-12 text-green-600" />,
    title: "Trusted Platform",
    description: "We verify all property listings and agents to ensure you have a safe and reliable experience. Your trust is our top priority."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-[fadeIn_0.8s_ease-out]">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Zameen Echo?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make finding your perfect property simple and straightforward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">
                <div className="transform group-hover:rotate-360 transition-transform duration-500">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 