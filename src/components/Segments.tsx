import { Droplet, Settings, Ship, Leaf } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import refineryImg from '@/assets/refinery.jpg';
import tankerImg from '@/assets/tanker.jpg';
import windFarmImg from '@/assets/wind-farm.jpg';
import heroPlatformImg from '@/assets/hero-platform.jpg';

const segments = [
  {
    icon: Droplet,
    title: 'Exploração & Produção',
    description: 'Operações de perfuração e extração em águas profundas e ultra-profundas, utilizando tecnologia de ponta para maximizar eficiência e segurança.',
    image: heroPlatformImg,
  },
  {
    icon: Settings,
    title: 'Refino & Petroquímica',
    description: 'Complexos industriais de processamento de hidrocarbonetos, transformando petróleo bruto em combustíveis e produtos químicos essenciais.',
    image: refineryImg,
  },
  {
    icon: Ship,
    title: 'Logística & Transporte',
    description: 'Frota própria de navios-tanque e infraestrutura de dutos para distribuição segura e eficiente de produtos em escala global.',
    image: tankerImg,
  },
  {
    icon: Leaf,
    title: 'Transição Energética',
    description: 'Investimentos em energia renovável, eólica offshore e tecnologias de baixo carbono para um futuro mais sustentável.',
    image: windFarmImg,
  },
];

const SegmentCard = ({ segment, index }: { segment: typeof segments[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setParallaxOffset(scrolled * 0.1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border-gradient bg-card shadow-card hover:shadow-glow transition-all duration-500"
    >
      {/* Parallax Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={segment.image}
          alt={segment.title}
          className="w-full h-[130%] object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700"
          style={{ 
            transform: `translateY(${parallaxOffset}px) scale(1.1)`,
            transition: 'transform 0.1s ease-out, opacity 0.7s ease'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 min-h-[300px] flex flex-col justify-end">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <segment.icon className="w-7 h-7 text-accent" />
          </div>
          <div className="text-sm font-medium text-accent tracking-wide uppercase">
            0{index + 1}
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          {segment.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {segment.description}
        </p>
      </div>
    </div>
  );
};

const Segments = () => {
  return (
    <section id="operacoes" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Nossos Segmentos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Cadeia completa de <span className="text-gradient-accent">valor energético</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Da exploração à distribuição, operamos em todos os elos da cadeia de energia, 
            com excelência operacional e compromisso com a sustentabilidade.
          </p>
        </div>

        {/* Segments Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {segments.map((segment, index) => (
            <SegmentCard key={segment.title} segment={segment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Segments;
