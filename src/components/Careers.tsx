import { Users, GraduationCap, Heart, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const Careers = () => {
  return (
    <section id="carreiras" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
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
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="p-6 border-gradient rounded-2xl bg-card-gradient text-center hover:shadow-glow transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="xl">
            Ver Vagas Disponíveis
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Mais de 500 vagas abertas em todo o mundo
          </p>
        </div>
      </div>
    </section>
  );
};

export default Careers;
