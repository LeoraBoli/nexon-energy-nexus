import { Users, GraduationCap, Heart, Rocket, Globe, Shield, Briefcase, MapPin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import SoundButton from '@/components/SoundButton';
import { useSound } from '@/hooks/useSoundEffects';

const benefits = [
  {
    icon: GraduationCap,
    title: 'Universidade Corporativa',
    description: 'Programas de MBA, certificações técnicas e bolsas de estudo em instituições parceiras globais.',
  },
  {
    icon: Heart,
    title: 'Bem-estar 360°',
    description: 'Plano de saúde premium, Gympass, apoio psicológico, licença parental estendida.',
  },
  {
    icon: Globe,
    title: 'Mobilidade Internacional',
    description: 'Programa de expatriação com suporte completo para você e sua família.',
  },
  {
    icon: Shield,
    title: 'Segurança em Primeiro',
    description: 'Cultura de segurança reconhecida mundialmente. Zero acidentes é nossa meta.',
  },
];

const openPositions = [
  { title: 'Engenheiro de Reservatório Sr.', location: 'Houston, TX', type: 'Presencial' },
  { title: 'Geofísico de Exploração', location: 'Rio de Janeiro, BR', type: 'Híbrido' },
  { title: 'Operador de Plataforma', location: 'Bacia de Santos', type: 'Offshore' },
  { title: 'Analista ESG Pleno', location: 'Londres, UK', type: 'Híbrido' },
];

const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { playHover } = useSound();

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
      onMouseEnter={playHover}
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
  const positionsRef = useRef(null);
  const positionsInView = useInView(positionsRef, { once: true, amount: 0.3 });
  const { playHover } = useSound();

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
            Faça Parte do Time
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Construa o futuro da <span className="text-gradient-accent">energia</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Na NEXON Energy, você fará parte de uma equipe de 120.000 profissionais 
            que trabalham para garantir o fornecimento seguro de energia enquanto 
            lideram a transição para um futuro mais sustentável.
          </p>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
          {[
            { value: '120K', label: 'Colaboradores' },
            { value: '18', label: 'Países' },
            { value: '45%', label: 'Mulheres' },
            { value: '98%', label: 'Satisfação' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 border-gradient rounded-xl bg-card/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={playHover}
            >
              <div className="text-2xl font-black text-accent">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>

        {/* Featured Positions */}
        <motion.div
          ref={positionsRef}
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={positionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 justify-center">
            <Briefcase className="w-5 h-5 text-accent" />
            Vagas em Destaque
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {openPositions.map((position, index) => (
              <motion.a
                key={position.title}
                href="#"
                className="p-4 border-gradient rounded-xl bg-card hover:shadow-glow transition-all duration-300 group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={positionsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={playHover}
              >
                <div className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {position.title}
                </div>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {position.location}
                  </span>
                  <span className="px-2 py-0.5 bg-secondary rounded-full text-xs">
                    {position.type}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

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
            <SoundButton variant="hero" size="xl" data-cursor="Candidatar">
              <Users className="w-5 h-5" />
              Ver Todas as Vagas
            </SoundButton>
          </motion.div>
          <motion.p 
            className="text-sm text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Mais de 450 vagas abertas em 18 países • Processo seletivo 100% online
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;
