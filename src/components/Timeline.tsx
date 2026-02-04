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
    stats: '1ª operação',
  },
  {
    year: '1995',
    icon: Rocket,
    title: 'Primeira Plataforma Offshore',
    description: 'Inauguração da primeira plataforma em águas profundas, marcando entrada no segmento offshore.',
    highlight: true,
    stats: '500m profundidade',
  },
  {
    year: '2003',
    icon: Globe,
    title: 'Expansão Internacional',
    description: 'Início das operações no Brasil, Nigéria e Mar do Norte, consolidando presença global.',
    highlight: false,
    stats: '5 países',
  },
  {
    year: '2010',
    icon: Award,
    title: 'Líder em Segurança',
    description: 'Reconhecida como referência mundial em segurança operacional com zero acidentes fatais.',
    highlight: true,
    stats: '0 acidentes',
  },
  {
    year: '2018',
    icon: Leaf,
    title: 'Compromisso ESG',
    description: 'Lançamento do programa de sustentabilidade com metas ambiciosas de redução de carbono.',
    highlight: false,
    stats: '-25% CO₂',
  },
  {
    year: '2024',
    icon: Zap,
    title: 'Transição Energética',
    description: 'Inauguração do maior parque eólico offshore da América Latina e meta Net Zero 2050.',
    highlight: true,
    stats: '2.5 GW',
  },
];

const TimelineItem = ({ event, index }: { event: typeof timelineEvents[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
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

        {/* Stats badge */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
            event.highlight ? 'bg-accent text-accent-foreground' : 'bg-secondary text-foreground'
          }`}>
            {event.stats}
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
            Décadas de <span className="text-gradient-accent">excelência</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Desde 1987, construímos uma trajetória de inovação, segurança e 
            compromisso com o desenvolvimento energético sustentável.
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

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { value: '37+', label: 'Anos de história' },
            { value: '18', label: 'Países' },
            { value: '120K', label: 'Colaboradores' },
            { value: '42', label: 'Plataformas' }
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
