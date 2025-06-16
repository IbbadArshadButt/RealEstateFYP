import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ReviewSection from '@/components/home/ReviewSection';
import ReviewSlider from '@/components/home/ReviewSlider';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <ReviewSlider />
      <ReviewSection />
      <Footer />
    </div>
  );
};

export default Index;
