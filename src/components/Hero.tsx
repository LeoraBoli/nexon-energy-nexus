import { ChevronDown, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import heroVideo from '@/assets/hero-video.mp4';
import heroPlatform from '@/assets/hero-platform.jpg';
import SoundButton from '@/components/SoundButton';
import { useSound } from '@/hooks/useSoundEffects';
import ParticlesBackground from '@/components/ParticlesBackground';

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
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent" />
      </div>

      {/* Particles Animation */}
      <ParticlesBackground count={60} />

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
            <motion.div 
              className="hidden md:flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-medium backdrop-blur-sm"
              animate={{ 
                boxShadow: ['0 0 10px hsl(24 95% 53% / 0.2)', '0 0 20px hsl(24 95% 53% / 0.4)', '0 0 10px hsl(24 95% 53% / 0.2)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div 
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              NYSE: NXE • $127.45 (+2.4%)
            </motion.div>
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
            {[
              { color: 'bg-accent', label: '3.4M barris/dia' },
              { color: 'bg-green-500', label: '18 países' },
              { color: 'bg-blue-500', label: '120.000 colaboradores' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="flex items-center gap-2 px-3 py-1.5 bg-background/30 backdrop-blur-sm rounded-full border border-border/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--accent) / 0.1)' }}
              >
                <motion.div 
                  className={`w-2 h-2 ${stat.color} rounded-full`}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <span className="text-foreground/80">{stat.label}</span>
              </motion.div>
            ))}
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
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.2 }}
          >
            <ChevronDown className="w-5 h-5" />
            <motion.div
              className="absolute inset-0 rounded-full bg-accent/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      {/* Corner decorations */}
      <motion.div
        className="absolute top-24 right-8 w-px h-32 bg-gradient-to-b from-accent/50 to-transparent hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      <motion.div
        className="absolute top-24 right-8 w-32 h-px bg-gradient-to-l from-accent/50 to-transparent hidden lg:block"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      />
      <motion.div
        className="absolute bottom-40 left-8 w-px h-24 bg-gradient-to-t from-accent/30 to-transparent hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      />
    </section>
  );
};

export default Hero;
