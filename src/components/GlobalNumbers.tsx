import { useEffect, useState, useRef } from 'react';
import { Globe, Ship, Users, Droplets } from 'lucide-react';

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

const AnimatedCounter = ({ end, suffix, inView }: { end: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const startTime = Date.now();
    const isDecimal = end % 1 !== 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      countRef.current = eased * end;
      setCount(isDecimal ? parseFloat(countRef.current.toFixed(1)) : Math.floor(countRef.current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [end, inView]);

  return (
    <span>
      {count}
      {suffix && <span className="text-accent">{suffix}</span>}
    </span>
  );
};

const GlobalNumbers = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="numeros" ref={sectionRef} className="py-24 bg-card-gradient relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Números Globais
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Impacto em <span className="text-gradient-accent">escala mundial</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="border-gradient rounded-2xl p-8 bg-card-gradient shadow-card hover:shadow-glow transition-all duration-500 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-black text-foreground mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalNumbers;
