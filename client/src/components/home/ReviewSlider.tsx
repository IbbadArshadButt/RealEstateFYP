import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { getReviews } from "@/services/api";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Dummy reviews to show when no reviews exist
const dummyReviews: Review[] = [
  {
    _id: "dummy1",
    name: "Sarah Johnson",
    rating: 5,
    comment: "Exceptional service! The team at Zameen Echo made finding my dream home a breeze. Their attention to detail and professional approach exceeded my expectations.",
    createdAt: new Date().toISOString()
  },
  {
    _id: "dummy2",
    name: "Michael Chen",
    rating: 5,
    comment: "I was impressed by the quality of properties and the transparency throughout the process. Highly recommend their services to anyone looking for a new home.",
    createdAt: new Date().toISOString()
  },
  {
    _id: "dummy3",
    name: "Emma Thompson",
    rating: 5,
    comment: "The best real estate experience I've had. The team was knowledgeable, responsive, and truly cared about finding the perfect property for me.",
    createdAt: new Date().toISOString()
  }
];

const ReviewSlider = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        // Take only the 3 most recent reviews
        const recentReviews = data.slice(0, 3);
        // If no reviews, use dummy reviews
        setReviews(recentReviews.length > 0 ? recentReviews : dummyReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Use dummy reviews if there's an error
        setReviews(dummyReviews);
      }
    };
    fetchReviews();
  }, []);

  // Auto-slide reviews
  useEffect(() => {
    if (reviews.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            What Our Customers Say
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Read what our satisfied customers have to say about their experience with Zameen Echo
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl p-6 md:p-8 transform transition-all duration-500 hover:shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-green-50 rounded-br-[80px] -z-10"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-50 rounded-tl-[80px] -z-10"></div>
            
            {/* Quote Icon */}
            <div className="absolute top-4 left-4 text-green-100 transform rotate-12">
              <Quote className="w-12 h-12" />
            </div>

            <div className="relative h-[250px]">
              {reviews.map((review, index) => (
                <div
                  key={review._id}
                  className={`absolute w-full transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 transition-all duration-300 hover:scale-110 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      {new Date(review.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 italic text-lg leading-relaxed font-light">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900 text-lg">{review.name}</p>
                      <div className="flex items-center mt-0.5">
                        <span className="text-sm text-gray-500">Verified Customer</span>
                        <span className="ml-2 text-green-500">•</span>
                        <span className="ml-2 text-sm text-gray-500">Trusted Review</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-green-600 w-8"
                      : "bg-gray-200 w-2 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider; 