import { Rocket, Building, Globe, Award, Leaf, Zap, Shield, BarChart3 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useSound } from '@/hooks/useSoundEffects';

const timelineEvents = [
  {
    year: '1987',
    icon: Building,
    title: 'Fundação da Companhia',
    description: 'NEXON Energy Corporation é constituída em Houston, Texas, com capital inicial de $50M. Primeira concessão no Golfo do México (Bloco GOM-127).',
    highlight: false,
    stats: 'Capital: $50M',
    location: 'Houston, TX',
  },
  {
    year: '1994',
    icon: Rocket,
    title: 'Descoberta de Deepwater Horizon',
    description: 'Descoberta do campo gigante Thunder Horse no Golfo do México com reservas estimadas de 1 bilhão de barris. IPO na NYSE com valorização de $2.1B.',
    highlight: true,
    stats: '1B barris',
    location: 'Golfo do México',
  },
  {
    year: '2002',
    icon: Globe,
    title: 'Expansão para Bacia de Santos',
    description: 'Joint venture com Petrobras para exploração do pré-sal brasileiro. Investimento de $3.2B em tecnologia de perfuração em águas ultraprofundas.',
    highlight: false,
    stats: 'Invest: $3.2B',
    location: 'Santos, Brasil',
  },
  {
    year: '2008',
    icon: Shield,
    title: 'Certificação ISO 45001',
    description: 'Primeira empresa do setor a obter certificação em segurança ocupacional global. Zero acidentes fatais por 5 anos consecutivos.',
    highlight: true,
    stats: '0 fatalidades',
    location: 'Global',
  },
  {
    year: '2015',
    icon: BarChart3,
    title: 'Aquisição da Nordic Petroleum',
    description: 'Compra estratégica da Nordic Petroleum por $8.7B, expandindo operações para Mar do Norte e adicionando 15 plataformas ao portfólio.',
    highlight: false,
    stats: '+15 plataformas',
    location: 'Mar do Norte',
  },
  {
    year: '2019',
    icon: Leaf,
    title: 'Compromisso Net Zero 2050',
    description: 'Anúncio do programa "Energy Transition 2050" com investimento de $45B em renováveis até 2035. Primeira fazenda eólica offshore inaugurada.',
    highlight: true,
    stats: '$45B renováveis',
    location: 'Global',
  },
  {
    year: '2024',
    icon: Zap,
    title: 'Líder em Energia Limpa',
    description: 'Capacidade renovável atinge 8.5 GW. Hidrogênio verde em escala comercial na Holanda. Receita anual supera $98B com EBITDA de $42B.',
    highlight: true,
    stats: '8.5 GW limpo',
    location: 'Roterdã, NL',
  },
];

const TimelineItem = ({ event, index }: { event: typeof timelineEvents[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const isEven = index % 2 === 0;
  const { playHover } = useSound();

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={playHover}
    >
      {/* Connection line to center */}
      <motion.div
        className={`hidden md:block absolute top-1/2 w-8 h-0.5 ${isEven ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}`}
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent)))' }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />

      <motion.div
        className={`p-6 border-gradient rounded-2xl bg-card shadow-card hover:shadow-glow transition-all duration-500 ${
          event.highlight ? 'border-accent/30 bg-gradient-to-br from-card to-accent/5' : ''
        }`}
        initial={{ x: isEven ? -60 : 60, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: isEven ? -60 : 60, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        {/* Year Badge */}
        <motion.div 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
            event.highlight ? 'bg-accent/20 text-accent' : 'bg-secondary text-muted-foreground'
          }`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <event.icon className="w-4 h-4" />
          </motion.div>
          <span className="text-2xl font-black">{event.year}</span>
        </motion.div>

        <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{event.description}</p>

        {/* Stats & Location */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
            event.highlight ? 'bg-accent text-accent-foreground' : 'bg-secondary text-foreground'
          }`}>
            {event.stats}
          </div>
          <div className="px-3 py-1 rounded-lg text-xs text-muted-foreground bg-background/50">
            📍 {event.location}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Timeline = () => {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.1 });

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
            37 anos de <span className="text-gradient-accent">excelência</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            De uma startup em Houston a um dos maiores grupos de energia do mundo. 
            Nossa trajetória é marcada por inovação, aquisições estratégicas e compromisso ESG.
          </p>
        </ScrollReveal>

        {/* Timeline Container */}
        <div ref={lineRef} className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-1 hidden md:block"
            style={{ 
              background: 'linear-gradient(180deg, transparent, hsl(var(--accent) / 0.5) 10%, hsl(var(--accent) / 0.5) 90%, transparent)',
              marginLeft: '-2px',
              transformOrigin: 'top'
            }}
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Timeline Items Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {timelineEvents.map((event, index) => (
              <div 
                key={event.year}
                className={`${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:col-start-2'} ${
                  index % 2 === 1 ? 'md:-mt-32' : ''
                }`}
                style={{ marginTop: index === 0 ? 0 : undefined }}
              >
                <TimelineItem event={event} index={index} />
                
                {/* Center dot */}
                <motion.div
                  className={`hidden md:flex absolute left-1/2 w-5 h-5 rounded-full items-center justify-center ${
                    event.highlight ? 'bg-accent shadow-glow' : 'bg-secondary border-2 border-border'
                  }`}
                  style={{ 
                    marginLeft: '-10px',
                    top: `calc(${(index * 100) / timelineEvents.length}% + 3rem)`
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {event.highlight && (
                    <motion.div
                      className="w-2 h-2 bg-accent-foreground rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Financial Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { value: '$98B', label: 'Receita 2024' },
            { value: '$42B', label: 'EBITDA' },
            { value: '18', label: 'Países' },
            { value: 'A+', label: 'Rating S&P' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 border-gradient rounded-xl bg-card/50"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-black text-accent">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
