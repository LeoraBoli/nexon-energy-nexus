import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
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
          <div className="flex items-center gap-4 mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="industrial-line w-16" />
            <span className="text-accent font-semibold tracking-widest uppercase text-sm">
              Energia Global
            </span>
          </div>

          {/* Main Title */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-6 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            Energia que move
            <span className="block text-gradient-accent">o mundo.</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            Exploração offshore, refino e logística em escala global. 
            Construindo o futuro da energia com inovação e responsabilidade.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: '0.8s' }}
          >
            <Button variant="hero" size="xl">
              Nossas Operações
            </Button>
            <Button variant="heroOutline" size="xl">
              Sustentabilidade
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <a 
          href="#numeros" 
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
