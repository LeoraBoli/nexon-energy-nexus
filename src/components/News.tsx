import { ArrowRight, Calendar, FileText, TrendingUp, Download } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useSound } from '@/hooks/useSoundEffects';

const news = [
  {
    date: '28 Jan 2024',
    category: 'Fato Relevante',
    title: 'NEXON Energy conclui aquisição da Horizon Deepwater por $4.2B',
    excerpt: 'Transação adiciona 12 plataformas no Golfo do México e aumenta reservas provadas em 1.2 bilhão de barris equivalentes.',
    urgent: true,
  },
  {
    date: '22 Jan 2024',
    category: 'Resultados',
    title: 'Prévia operacional 4T23: Produção recorde de 3.6M boe/d',
    excerpt: 'Produção no trimestre supera guidance em 8%. Atualização do guidance 2024 será divulgada em 15/02.',
    urgent: false,
  },
  {
    date: '18 Jan 2024',
    category: 'Sustentabilidade',
    title: 'NEXON atinge marco de 5 GW em energia renovável instalada',
    excerpt: 'Meta de 8.5 GW até 2025 permanece no trilho. Parque eólico Ventos do Atlântico inicia operação comercial.',
    urgent: false,
  },
  {
    date: '12 Jan 2024',
    category: 'Governança',
    title: 'Conselho aprova programa de recompra de ações de $5B',
    excerpt: 'Programa terá duração de 24 meses. Dividend yield projetado de 4.5% para 2024.',
    urgent: false,
  },
];

const reports = [
  { title: 'Relatório Anual 2023', type: 'PDF', size: '14.2 MB', date: '15/03/2024' },
  { title: 'Relatório ESG 2023', type: 'PDF', size: '9.8 MB', date: '28/02/2024' },
  { title: 'Resultados 4T23', type: 'PDF', size: '2.4 MB', date: '15/02/2024' },
  { title: 'Apresentação Investidores', type: 'PDF', size: '5.1 MB', date: '15/02/2024' },
];

const NewsCard = ({ item, index }: { item: typeof news[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { playHover } = useSound();

  return (
    <motion.article
      ref={ref}
      className={`group p-6 border-gradient rounded-2xl bg-card hover:shadow-glow transition-all duration-300 cursor-pointer ${
        item.urgent ? 'ring-1 ring-accent/30' : ''
      }`}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ x: 10, scale: 1.02 }}
      onMouseEnter={playHover}
    >
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <motion.span 
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            item.urgent 
              ? 'text-accent bg-accent/20 ring-1 ring-accent/50' 
              : 'text-accent bg-accent/10'
          }`}
          whileHover={{ scale: 1.1 }}
        >
          {item.urgent && '● '}{item.category}
        </motion.span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {item.date}
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors leading-tight">
        {item.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
      <motion.div 
        className="flex items-center text-accent text-sm font-semibold"
        whileHover={{ x: 10 }}
      >
        Ler comunicado completo <ArrowRight className="w-4 h-4 ml-1" />
      </motion.div>
    </motion.article>
  );
};

const News = () => {
  const sidebarRef = useRef(null);
  const sidebarInView = useInView(sidebarRef, { once: true, amount: 0.3 });
  const { playHover, playClick } = useSound();

  return (
    <section id="investidores" className="py-24 bg-card-gradient relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Relações com Investidores
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Comunicados <span className="text-gradient-accent">& Relatórios</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Informações financeiras, fatos relevantes e documentos para acionistas
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News Cards */}
          <div className="lg:col-span-2 space-y-6">
            {news.map((item, index) => (
              <NewsCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Reports Sidebar */}
          <motion.div 
            ref={sidebarRef}
            className="space-y-6"
            initial={{ opacity: 0, x: 60 }}
            animate={sidebarInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Stock Ticker */}
            <motion.div 
              className="p-6 border-gradient rounded-2xl bg-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={playHover}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">NYSE: NXE</div>
                  <motion.div 
                    className="text-3xl font-black text-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={sidebarInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    $127.45
                  </motion.div>
                </div>
                <div className="text-right">
                  <motion.div 
                    className="text-lg font-bold text-green-500 flex items-center gap-1"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="w-4 h-4" />
                    +2.4%
                  </motion.div>
                  <div className="text-sm text-green-500">+$2.98</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Market Cap</span>
                  <div className="font-semibold text-foreground">$156.2B</div>
                </div>
                <div>
                  <span className="text-muted-foreground">P/E Ratio</span>
                  <div className="font-semibold text-foreground">12.4x</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Div Yield</span>
                  <div className="font-semibold text-foreground">4.2%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">52W High</span>
                  <div className="font-semibold text-foreground">$142.80</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                Dados com atraso de 15 min • Fonte: NYSE
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div 
              className="p-6 border-gradient rounded-2xl bg-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Documentos para Download
              </h3>
              <div className="space-y-3">
                {reports.map((report, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="block p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sidebarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    onMouseEnter={playHover}
                    onClick={playClick}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-foreground group-hover:text-accent transition-colors text-sm">
                          {report.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {report.type} • {report.size} • {report.date}
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div 
              className="p-6 border-gradient rounded-2xl bg-card"
              initial={{ opacity: 0, y: 40 }}
              animate={sidebarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 1 }}
              onMouseEnter={playHover}
            >
              <h3 className="text-lg font-bold text-foreground mb-4">Próximos Eventos</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-center px-2">
                    <div className="text-xl font-bold text-accent">15</div>
                    <div className="text-xs text-muted-foreground">FEV</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Resultados 4T23</div>
                    <div className="text-xs text-muted-foreground">Teleconferência 10h EST</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-center px-2">
                    <div className="text-xl font-bold text-accent">28</div>
                    <div className="text-xs text-muted-foreground">MAR</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Investor Day 2024</div>
                    <div className="text-xs text-muted-foreground">Houston, TX</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default News;
