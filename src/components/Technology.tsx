import { Shield, Cpu, Radio, Eye, Zap, Lock } from 'lucide-react';

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

const Technology = () => {
  return (
    <section className="py-24 bg-card-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
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
            <div className="grid grid-cols-3 gap-4 p-6 border-gradient rounded-2xl bg-secondary/30">
              <div className="text-center">
                <div className="text-3xl font-black text-accent">99.8%</div>
                <div className="text-xs text-muted-foreground mt-1">Uptime operacional</div>
              </div>
              <div className="text-center border-x border-border">
                <div className="text-3xl font-black text-accent">0</div>
                <div className="text-xs text-muted-foreground mt-1">Acidentes fatais</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-accent">24/7</div>
                <div className="text-xs text-muted-foreground mt-1">Monitoramento</div>
              </div>
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 border-gradient rounded-xl bg-card hover:shadow-glow transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
