import { Leaf, Wind, Recycle, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  return (
    <section id="sustentabilidade" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={windFarmImg}
                alt="Energia renovável NEXON"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-xl border border-border">
                <div className="text-sm text-accent font-semibold mb-1">Meta ESG 2026</div>
                <div className="text-2xl font-bold text-foreground">30% energia renovável</div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-accent/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-2xl -z-10" />
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {initiatives.map((item) => (
                <div
                  key={item.title}
                  className="p-5 border-gradient rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-accent mb-3" />
                  <div className="text-2xl font-black text-foreground">{item.stat}</div>
                  <div className="text-sm font-medium text-foreground mt-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg">
              Relatório ESG 2025
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
