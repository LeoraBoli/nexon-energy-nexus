import { Rocket, Building, Globe, Award, Leaf, Zap } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

const timelineEvents = [
  {
    year: '1987',
    icon: Building,
    title: 'Fundação',
    description: 'NEXON Energy é fundada em Houston, Texas, com foco inicial em exploração terrestre no Golfo do México.',
    highlight: false,
  },
  {
    year: '1995',
    icon: Rocket,
    title: 'Primeira Plataforma Offshore',
    description: 'Inauguração da primeira plataforma em águas profundas, marcando entrada no segmento offshore.',
    highlight: true,
  },
  {
    year: '2003',
    icon: Globe,
    title: 'Expansão Internacional',
    description: 'Início das operações no Brasil, Nigéria e Mar do Norte, consolidando presença global.',
    highlight: false,
  },
  {
    year: '2010',
    icon: Award,
    title: 'Líder em Segurança',
    description: 'Reconhecida como referência mundial em segurança operacional com zero acidentes fatais.',
    highlight: true,
  },
  {
    year: '2018',
    icon: Leaf,
    title: 'Compromisso ESG',
    description: 'Lançamento do programa de sustentabilidade com metas ambiciosas de redução de carbono.',
    highlight: false,
  },
  {
    year: '2024',
    icon: Zap,
    title: 'Transição Energética',
    description: 'Inauguração do maior parque eólico offshore da América Latina e meta Net Zero 2050.',
    highlight: true,
  },
];

const TimelineItem = ({ event, index }: { event: typeof timelineEvents[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative mb-12 last:mb-0"
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className={`flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Content Card */}
        <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
          <motion.div 
            className={`inline-block p-6 border-gradient rounded-2xl bg-card shadow-card hover:shadow-glow transition-all duration-300 ${
              event.highlight ? 'border-accent/30' : ''
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : ''}`}>
              <motion.div 
                className={`w-10 h-10 rounded-xl ${event.highlight ? 'bg-accent/20' : 'bg-secondary'} flex items-center justify-center`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <event.icon className={`w-5 h-5 ${event.highlight ? 'text-accent' : 'text-muted-foreground'}`} />
              </motion.div>
              <span className={`text-2xl font-black ${event.highlight ? 'text-accent' : 'text-foreground'}`}>
                {event.year}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
          </motion.div>
        </div>

        {/* Center Point */}
        <div className="hidden md:flex items-center justify-center relative z-10">
          <motion.div 
            className={`w-4 h-4 rounded-full ${event.highlight ? 'bg-accent shadow-glow' : 'bg-secondary border-2 border-border'}`}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          />
        </div>

        {/* Spacer for alternating layout */}
        <div className="flex-1 hidden md:block" />
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <section id="empresa" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-20">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Nossa História
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Décadas de <span className="text-gradient-accent">excelência</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Desde 1987, construímos uma trajetória de inovação, segurança e 
            compromisso com o desenvolvimento energético sustentável.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ originY: 0 }}
          />
          
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.year} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
