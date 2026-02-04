import { Users, GraduationCap, Heart, Rocket } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';

const benefits = [
  {
    icon: GraduationCap,
    title: 'Desenvolvimento Contínuo',
    description: 'Programas de treinamento e bolsas de estudo internacionais.',
  },
  {
    icon: Heart,
    title: 'Bem-estar Integral',
    description: 'Plano de saúde premium, academia e apoio psicológico.',
  },
  {
    icon: Rocket,
    title: 'Carreira Global',
    description: 'Oportunidades em 18 países e mobilidade internacional.',
  },
  {
    icon: Users,
    title: 'Diversidade & Inclusão',
    description: 'Ambiente inclusivo que valoriza todas as perspectivas.',
  },
];

const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="p-6 border-gradient rounded-2xl bg-card-gradient text-center hover:shadow-glow transition-shadow duration-300"
      initial={{ opacity: 0, y: 60, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: 20 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ y: -10, scale: 1.05 }}
    >
      <motion.div 
        className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <benefit.icon className="w-7 h-7 text-accent" />
      </motion.div>
      <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
      <p className="text-sm text-muted-foreground">{benefit.description}</p>
    </motion.div>
  );
};

const Careers = () => {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  return (
    <section id="carreiras" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal animation="fadeUp" className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Carreiras
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Construa o futuro <span className="text-gradient-accent">conosco</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Na NEXON Energy, acreditamos que nosso maior ativo são as pessoas. 
            Oferecemos oportunidades desafiadoras, ambiente de trabalho seguro e 
            remuneração competitiva para profissionais que desejam fazer a diferença 
            no setor de energia.
          </p>
        </ScrollReveal>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          ref={ctaRef}
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="hero" size="xl">
              Ver Vagas Disponíveis
            </Button>
          </motion.div>
          <motion.p 
            className="text-sm text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Mais de 500 vagas abertas em todo o mundo
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;
