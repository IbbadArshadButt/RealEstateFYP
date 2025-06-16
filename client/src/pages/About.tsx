import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/about/HeroSection';
import StatsSection from '@/components/about/StatsSection';
import StorySection from '@/components/about/StorySection';
import MissionVisionSection from '@/components/about/MissionVisionSection';
import ValuesSection from '@/components/about/ValuesSection';
import TeamSection from '@/components/about/TeamSection';
import CTASection from '@/components/about/CTASection';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        <StatsSection />
        <StorySection />
        <MissionVisionSection />
        <ValuesSection />
        <TeamSection />
        <CTASection />
      </div>

      <Footer />
    </div>
  );
};

export default About;
