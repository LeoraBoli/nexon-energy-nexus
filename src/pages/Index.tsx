import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GlobalNumbers from '@/components/GlobalNumbers';
import Segments from '@/components/Segments';
import Technology from '@/components/Technology';
import Sustainability from '@/components/Sustainability';
import News from '@/components/News';
import Careers from '@/components/Careers';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <GlobalNumbers />
      <Segments />
      <Technology />
      <Sustainability />
      <News />
      <Careers />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
