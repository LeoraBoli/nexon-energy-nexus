import { Leaf, Wind, Recycle, TreePine } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import windFarmImg from '@/assets/wind-farm.jpg';

const initiatives = [
  {
    icon: Wind,
    title: 'Energia Eólica Offshore',
    stat: '2.5 GW',
    description: 'Capacidade instalada em parques eólicos',
  },
  {
    icon: Recycle,
    title: 'Redução de Carbono',
    stat: '-40%',
    description: 'Meta de redução até 2035',
  },
  {
    icon: TreePine,
    title: 'Reflorestamento',
    stat: '5M',
    description: 'Árvores plantadas anualmente',
  },
  {
    icon: Leaf,
    title: 'Net Zero',
    stat: '2050',
    description: 'Compromisso de neutralidade',
  },
];

const Sustainability = () => {
  const imageRef = useRef(null);
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 });
  const initiativesRef = useRef(null);
  const initiativesInView = useInView(initiativesRef, { once: true, amount: 0.3 });

  return (
    <section id="sustentabilidade" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <motion.div 
            ref={imageRef}
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -80, rotateY: 15 }}
            animate={imageInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -80, rotateY: 15 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <motion.img
                src={windFarmImg}
                alt="Energia renovável NEXON"
                className="w-full h-[500px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <motion.div 
                className="absolute bottom-6 left-6 right-6 p-6 glass rounded-xl border border-border"
                initial={{ opacity: 0, y: 30 }}
                animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-sm text-accent font-semibold mb-1">Meta ESG 2026</div>
                <div className="text-2xl font-bold text-foreground">30% energia renovável</div>
              </motion.div>
            </div>
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-32 h-32 border-2 border-accent/20 rounded-2xl -z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-2xl -z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            />
          </motion.div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <ScrollReveal animation="fadeLeft">
              <span className="text-accent font-semibold tracking-widest uppercase text-sm">
                Sustentabilidade
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Compromisso com o <span className="text-gradient-accent">futuro</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Reconhecemos nossa responsabilidade ambiental e trabalhamos ativamente 
                na transição energética. Investimos em tecnologias limpas, redução de 
                emissões e proteção dos ecossistemas onde operamos.
              </p>
            </ScrollReveal>

            {/* Stats Grid */}
            <motion.div 
              ref={initiativesRef}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {initiatives.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="p-5 border-gradient rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={initiativesInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-accent mb-3" />
                  </motion.div>
                  <div className="text-2xl font-black text-foreground">{item.stat}</div>
                  <div className="text-sm font-medium text-foreground mt-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                </motion.div>
              ))}
            </motion.div>

            <ScrollReveal animation="fadeUp" delay={0.4}>
              <Button variant="hero" size="lg">
                Relatório ESG 2025
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
