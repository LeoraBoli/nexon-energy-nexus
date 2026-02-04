import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ParallaxImage from '@/components/ParallaxImage';
import heroPlatform from '@/assets/hero-platform.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <ParallaxImage
        src={heroPlatform}
        alt="Plataforma offshore NEXON Energy"
        speed={0.5}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 pt-24">
        <div className="max-w-4xl">
          {/* Pre-title */}
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="industrial-line w-16" />
            <span className="text-accent font-semibold tracking-widest uppercase text-sm">
              Energia Global
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="overflow-hidden mb-6">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9]"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Energia que move
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.span 
              className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] text-gradient-accent"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              o mundo.
            </motion.span>
          </div>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Exploração offshore, refino e logística em escala global. 
            Construindo o futuro da energia com inovação e responsabilidade.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Button variant="hero" size="xl">
              Nossas Operações
            </Button>
            <Button variant="heroOutline" size="xl">
              Sustentabilidade
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
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
