import { Droplet, Settings, Ship, Leaf } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border-gradient bg-card shadow-card hover:shadow-glow transition-shadow duration-500"
      initial={{ opacity: 0, y: 80, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: 10 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ y: -10 }}
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={segment.image}
          alt={segment.title}
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 min-h-[300px] flex flex-col justify-end">
        <motion.div 
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
        >
          <motion.div 
            className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <segment.icon className="w-7 h-7 text-accent" />
          </motion.div>
          <div className="text-sm font-medium text-accent tracking-wide uppercase">
            0{index + 1}
          </div>
        </motion.div>
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-foreground mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
        >
          {segment.title}
        </motion.h3>
        <motion.p 
          className="text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
        >
          {segment.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const Segments = () => {
  return (
    <section id="operacoes" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
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
        </ScrollReveal>

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
