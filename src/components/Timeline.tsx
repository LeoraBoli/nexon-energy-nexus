import { useEffect, useRef, useState } from 'react';
import { Rocket, Building, Globe, Award, Leaf, Zap } from 'lucide-react';

const timelineEvents = [
  {
    year: '1987',
    icon: Building,
    title: 'Fundação',
    description: 'NEXON Energy é fundada em Houston, Texas, com foco inicial em exploração terrestre no Golfo do México.',
    highlight: false,
  },
  {
    year: '1995',
    icon: Rocket,
    title: 'Primeira Plataforma Offshore',
    description: 'Inauguração da primeira plataforma em águas profundas, marcando entrada no segmento offshore.',
    highlight: true,
  },
  {
    year: '2003',
    icon: Globe,
    title: 'Expansão Internacional',
    description: 'Início das operações no Brasil, Nigéria e Mar do Norte, consolidando presença global.',
    highlight: false,
  },
  {
    year: '2010',
    icon: Award,
    title: 'Líder em Segurança',
    description: 'Reconhecida como referência mundial em segurança operacional com zero acidentes fatais.',
    highlight: true,
  },
  {
    year: '2018',
    icon: Leaf,
    title: 'Compromisso ESG',
    description: 'Lançamento do programa de sustentabilidade com metas ambiciosas de redução de carbono.',
    highlight: false,
  },
  {
    year: '2024',
    icon: Zap,
    title: 'Transição Energética',
    description: 'Inauguração do maior parque eólico offshore da América Latina e meta Net Zero 2050.',
    highlight: true,
  },
];

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    const items = timelineRef.current?.querySelectorAll('.timeline-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="empresa" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Nossa História
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Décadas de <span className="text-gradient-accent">excelência</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Desde 1987, construímos uma trajetória de inovação, segurança e 
            compromisso com o desenvolvimento energético sustentável.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden md:block" />
          
          {timelineEvents.map((event, index) => (
            <div
              key={event.year}
              data-index={index}
              className={`timeline-item relative mb-12 last:mb-0 transition-all duration-700 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div 
                    className={`inline-block p-6 border-gradient rounded-2xl bg-card shadow-card hover:shadow-glow transition-all duration-300 ${
                      event.highlight ? 'border-accent/30' : ''
                    }`}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className={`w-10 h-10 rounded-xl ${event.highlight ? 'bg-accent/20' : 'bg-secondary'} flex items-center justify-center`}>
                        <event.icon className={`w-5 h-5 ${event.highlight ? 'text-accent' : 'text-muted-foreground'}`} />
                      </div>
                      <span className={`text-2xl font-black ${event.highlight ? 'text-accent' : 'text-foreground'}`}>
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Center Point */}
                <div className="hidden md:flex items-center justify-center relative z-10">
                  <div className={`w-4 h-4 rounded-full ${event.highlight ? 'bg-accent shadow-glow' : 'bg-secondary border-2 border-border'}`} />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
