import { Globe, Ship, Users, Droplets } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedCounter } from '@/components/ScrollReveal';

const stats = [
  {
    icon: Globe,
    value: 18,
    suffix: '',
    label: 'Países',
    description: 'Presença global',
  },
  {
    icon: Ship,
    value: 42,
    suffix: '',
    label: 'Plataformas',
    description: 'Operações offshore',
  },
  {
    icon: Users,
    value: 120,
    suffix: 'mil',
    label: 'Funcionários',
    description: 'Equipe global',
  },
  {
    icon: Droplets,
    value: 3.4,
    suffix: 'M',
    label: 'Barris/dia',
    description: 'Produção diária',
  },
];

const GlobalNumbers = () => {
  return (
    <section id="numeros" className="py-24 bg-card-gradient relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Números Globais
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Impacto em <span className="text-gradient-accent">escala mundial</span>
          </h2>
        </ScrollReveal>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label} animation="scale">
              <div className="border-gradient rounded-2xl p-8 bg-card-gradient shadow-card hover:shadow-glow transition-all duration-500 group h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black text-foreground mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default GlobalNumbers;
