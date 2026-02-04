import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GlobalNumbers from '@/components/GlobalNumbers';
import Timeline from '@/components/Timeline';
import Segments from '@/components/Segments';
import Technology from '@/components/Technology';
import Dashboard from '@/components/Dashboard';
import InteractiveMap from '@/components/InteractiveMap';
import Partners from '@/components/Partners';
import Sustainability from '@/components/Sustainability';
import News from '@/components/News';
import Careers from '@/components/Careers';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SoundProvider from '@/components/SoundProvider';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SoundProvider>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}
      <div className={`min-h-screen bg-background ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <CustomCursor />
        <Header />
        <Hero />
        <GlobalNumbers />
        <Timeline />
        <Segments />
        <Technology />
        <Dashboard />
        <InteractiveMap />
        <Partners />
        <Sustainability />
        <News />
        <Careers />
        <Contact />
        <Footer />
      </div>
    </SoundProvider>
  );
};

export default Index;
