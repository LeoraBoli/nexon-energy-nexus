import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GlobalNumbers from '@/components/GlobalNumbers';
import Timeline from '@/components/Timeline';
import Segments from '@/components/Segments';
import Technology from '@/components/Technology';
import InteractiveMap from '@/components/InteractiveMap';
import Partners from '@/components/Partners';
import Sustainability from '@/components/Sustainability';
import News from '@/components/News';
import Careers from '@/components/Careers';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Header />
      <Hero />
      <GlobalNumbers />
      <Timeline />
      <Segments />
      <Technology />
      <InteractiveMap />
      <Partners />
      <Sustainability />
      <News />
      <Careers />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
