import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Property Journey?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Whether you're buying, selling, or renting, our expert team is here to guide you every step of the way. 
              Join millions of satisfied customers who have found their perfect properties with Zameen.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/properties">
                <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Browse Properties
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-xl transition-all duration-300">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-24 text-gray-50" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection; 