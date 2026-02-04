import { Shield, Cpu, Radio, Eye, Zap, Lock } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const features = [
  {
    icon: Cpu,
    title: 'Inteligência Artificial',
    description: 'Algoritmos preditivos para manutenção e otimização de operações.',
  },
  {
    icon: Radio,
    title: 'IoT Industrial',
    description: 'Milhares de sensores conectados monitorando operações 24/7.',
  },
  {
    icon: Eye,
    title: 'Digital Twin',
    description: 'Réplicas digitais de ativos para simulações e planejamento.',
  },
  {
    icon: Zap,
    title: 'Automação Avançada',
    description: 'Sistemas robóticos para operações em ambientes de risco.',
  },
  {
    icon: Shield,
    title: 'Segurança Zero',
    description: 'Protocolos rigorosos com meta de zero acidentes.',
  },
  {
    icon: Lock,
    title: 'Cybersecurity',
    description: 'Proteção contra ameaças cibernéticas em infraestrutura crítica.',
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="p-6 border-gradient rounded-xl bg-card hover:shadow-glow transition-all duration-300 group"
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: -15 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <motion.div 
        className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <feature.icon className="w-6 h-6 text-accent" />
      </motion.div>
      <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground">{feature.description}</p>
    </motion.div>
  );
};

const Technology = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });

  return (
    <section className="py-24 bg-card-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.8, 0.5, 0.8]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <ScrollReveal animation="fadeRight">
              <span className="text-accent font-semibold tracking-widest uppercase text-sm">
                Tecnologia & Segurança
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Inovação que <span className="text-gradient-accent">protege</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Investimos continuamente em tecnologias de ponta para garantir operações 
                seguras, eficientes e sustentáveis. Nossa cultura de segurança é 
                inegociável — cada colaborador é responsável por manter nosso 
                compromisso de zero acidentes.
              </p>
            </ScrollReveal>
            
            <motion.div 
              ref={statsRef}
              className="grid grid-cols-3 gap-4 p-6 border-gradient rounded-2xl bg-secondary/30"
              initial={{ opacity: 0, y: 40 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { value: '99.8%', label: 'Uptime operacional' },
                { value: '0', label: 'Acidentes fatais' },
                { value: '24/7', label: 'Monitoramento' }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  className={`text-center ${i === 1 ? 'border-x border-border' : ''}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                >
                  <div className="text-3xl font-black text-accent">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
