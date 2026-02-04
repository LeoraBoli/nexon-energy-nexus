import { Droplet, Settings, Ship, Leaf, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import explorationImg from '@/assets/exploration-platform.jpg';
import refineryImg from '@/assets/refinery-night.jpg';
import logisticsImg from '@/assets/logistics-tanker.jpg';
import renewableImg from '@/assets/renewable-wind.jpg';

const segments = [
  {
    icon: Droplet,
    title: 'Exploração & Produção',
    description: 'Operações de perfuração e extração em águas profundas e ultra-profundas, utilizando tecnologia de ponta para maximizar eficiência e segurança.',
    image: explorationImg,
    stats: ['3.4M barris/dia', '42 plataformas', '8 bacias'],
    color: 'from-blue-500/20',
  },
  {
    icon: Settings,
    title: 'Refino & Petroquímica',
    description: 'Complexos industriais de processamento de hidrocarbonetos, transformando petróleo bruto em combustíveis e produtos químicos essenciais.',
    image: refineryImg,
    stats: ['8 refinarias', '2.1M barris/dia', '150+ produtos'],
    color: 'from-orange-500/20',
  },
  {
    icon: Ship,
    title: 'Logística & Transporte',
    description: 'Frota própria de navios-tanque e infraestrutura de dutos para distribuição segura e eficiente de produtos em escala global.',
    image: logisticsImg,
    stats: ['45 navios', '12.000km dutos', '6 terminais'],
    color: 'from-cyan-500/20',
  },
  {
    icon: Leaf,
    title: 'Transição Energética',
    description: 'Investimentos em energia renovável, eólica offshore e tecnologias de baixo carbono para um futuro mais sustentável.',
    image: renewableImg,
    stats: ['2.5 GW eólica', '-40% CO₂', 'Net Zero 2050'],
    color: 'from-green-500/20',
  },
];

const SegmentCard = ({ segment, index }: { segment: typeof segments[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border-gradient bg-card shadow-card hover:shadow-glow transition-shadow duration-500"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
      >
        <motion.img
          src={segment.image}
          alt={segment.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={isInView ? { scale: 1 } : { scale: 1.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
        />
        {/* Gradient overlays */}
        <div className={`absolute inset-0 bg-gradient-to-t ${segment.color} via-transparent to-transparent opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-card/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 min-h-[400px] flex flex-col justify-end">
        {/* Number badge */}
        <motion.div
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
        >
          <span className="text-accent font-black text-lg">0{index + 1}</span>
        </motion.div>

        {/* Icon */}
        <motion.div 
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
        >
          <motion.div 
            className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-accent/20 transition-colors"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <segment.icon className="w-8 h-8 text-accent" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-foreground mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
        >
          {segment.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-muted-foreground leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
        >
          {segment.description}
        </motion.p>

        {/* Stats */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.7 }}
        >
          {segment.stats.map((stat, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 rounded-lg bg-secondary/80 text-xs font-semibold text-foreground backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.15 + 0.8 + i * 0.1 }}
            >
              {stat}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.a
          href="#"
          className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all"
          whileHover={{ x: 5 }}
        >
          Saiba mais <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

const Segments = () => {
  return (
    <section id="operacoes" className="py-24 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            hsl(var(--foreground)) 2px,
            hsl(var(--foreground)) 4px
          )`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
        <div className="grid md:grid-cols-2 gap-8">
          {segments.map((segment, index) => (
            <SegmentCard key={segment.title} segment={segment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Segments;
