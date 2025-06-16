const StorySection = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Our Journey</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Our Story</h2>
            </div>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                Founded in 2006, Zameen started with a simple vision: to revolutionize the way people buy, 
                sell, and rent properties in Pakistan. What began as a small startup has now grown into the 
                country's largest real estate platform.
              </p>
              <p className="text-lg">
                Over the years, we've helped millions of Pakistanis find their perfect homes and investment 
                opportunities. Our platform has transformed the real estate industry by bringing transparency, 
                efficiency, and trust to property transactions.
              </p>
              <p className="text-lg">
                Today, we continue to innovate with cutting-edge technology, comprehensive market insights, 
                and exceptional customer service to make your property journey as smooth as possible.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl opacity-20 blur-2xl"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl opacity-10 blur-xl"></div>
            
            {/* Image Container */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl opacity-20 blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Office building"
                className="w-full h-[600px] object-cover rounded-3xl shadow-2xl relative"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-3xl"></div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-4xl font-bold text-green-600">15+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection; 