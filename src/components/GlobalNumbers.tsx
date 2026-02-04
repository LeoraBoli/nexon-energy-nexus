import { Globe, Ship, Users, Droplets, TrendingUp, Award } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedCounter } from '@/components/ScrollReveal';
import { useSound } from '@/hooks/useSoundEffects';

const stats = [
  {
    icon: Globe,
    value: 18,
    suffix: '',
    label: 'Países',
    description: 'Operações em 5 continentes',
  },
  {
    icon: Ship,
    value: 42,
    suffix: '',
    label: 'Plataformas',
    description: 'Offshore e onshore',
  },
  {
    icon: Users,
    value: 120,
    suffix: 'K',
    label: 'Colaboradores',
    description: 'Equipe global diversa',
  },
  {
    icon: Droplets,
    value: 3.4,
    suffix: 'M',
    label: 'Barris/dia',
    description: 'Capacidade de produção',
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: 'B',
    label: 'Receita USD',
    description: 'Ano fiscal 2024',
  },
  {
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'Anos S&P A+',
    description: 'Investment grade',
  },
];

const GlobalNumbers = () => {
  const { playHover } = useSound();

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
            Resultados Globais
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Impacto em <span className="text-gradient-accent">escala mundial</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Números que refletem nossa posição de liderança no setor energético global
          </p>
        </ScrollReveal>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label} animation="scale">
              <div 
                className="border-gradient rounded-2xl p-6 bg-card-gradient shadow-card hover:shadow-glow transition-all duration-500 group h-full"
                onMouseEnter={playHover}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-black text-foreground mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom ticker */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <span>NYSE: NXE</span>
          <span className="text-accent">$127.45 (+2.4%)</span>
          <span>Market Cap: $156B</span>
          <span>Dividend Yield: 4.2%</span>
        </div>
      </div>
    </section>
  );
};

export default GlobalNumbers;
