import { ChevronDown, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import heroVideo from '@/assets/hero-video.mp4';
import heroPlatform from '@/assets/hero-platform.jpg';
import SoundButton from '@/components/SoundButton';
import { useSound } from '@/hooks/useSoundEffects';

const Hero = () => {
  const { playAmbient } = useSound();

  useEffect(() => {
    // Play subtle ambient sound on page load (after user interaction)
    const handleFirstInteraction = () => {
      playAmbient();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [playAmbient]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroPlatform}
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 pt-24">
        <div className="max-w-4xl">
          {/* Pre-title with stock ticker */}
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="industrial-line w-16" />
            <span className="text-accent font-semibold tracking-widest uppercase text-sm">
              Líder Global em Energia
            </span>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-accent text-xs font-medium">
              NYSE: NXE • $127.45 (+2.4%)
            </div>
          </motion.div>

          {/* Main Title */}
          <div className="overflow-hidden mb-6">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9]"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Energia para um
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.span 
              className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] text-gradient-accent"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              mundo em transição.
            </motion.span>
          </div>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            Da exploração offshore às energias renováveis, investimos $12B anuais em 
            inovação para liderar a transição energética global com segurança e responsabilidade.
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            className="flex flex-wrap gap-8 mb-10 text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-muted-foreground">3.4M barris/dia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-muted-foreground">18 países</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-muted-foreground">120.000 colaboradores</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <SoundButton variant="hero" size="xl" data-cursor="Explorar">
              <Play className="w-4 h-4" />
              Nossas Operações
            </SoundButton>
            <SoundButton variant="heroOutline" size="xl" data-cursor="ESG">
              Compromisso ESG
            </SoundButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      >
        <motion.a 
          href="#numeros" 
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
