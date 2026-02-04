import { ArrowRight, Calendar, FileText } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

const news = [
  {
    date: '28 Jan 2026',
    category: 'Comunicado',
    title: 'NEXON Energy anuncia descoberta de novo campo em águas ultraprofundas',
    excerpt: 'Nova reserva estimada em 800 milhões de barris de petróleo equivalente no pré-sal brasileiro.',
  },
  {
    date: '15 Jan 2026',
    category: 'Resultados',
    title: 'Resultados do 4º trimestre de 2025 superam expectativas',
    excerpt: 'EBITDA de US$ 4.2 bilhões representa crescimento de 18% em relação ao mesmo período.',
  },
  {
    date: '10 Jan 2026',
    category: 'ESG',
    title: 'Inauguração do maior parque eólico offshore da América Latina',
    excerpt: 'Complexo com capacidade de 1.2 GW vai abastecer 2 milhões de residências.',
  },
];

const reports = [
  { title: 'Relatório Anual 2025', type: 'PDF', size: '12.4 MB' },
  { title: 'Relatório ESG 2025', type: 'PDF', size: '8.2 MB' },
  { title: 'Apresentação Investidores Q4', type: 'PDF', size: '3.1 MB' },
];

const NewsCard = ({ item, index }: { item: typeof news[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.article
      ref={ref}
      className="group p-6 border-gradient rounded-2xl bg-card hover:shadow-glow transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ x: 10, scale: 1.02 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.span 
          className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full"
          whileHover={{ scale: 1.1 }}
        >
          {item.category}
        </motion.span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {item.date}
        </span>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
        {item.title}
      </h3>
      <p className="text-muted-foreground mb-4">{item.excerpt}</p>
      <motion.div 
        className="flex items-center text-accent text-sm font-semibold"
        whileHover={{ x: 10 }}
      >
        Ler mais <ArrowRight className="w-4 h-4 ml-1" />
      </motion.div>
    </motion.article>
  );
};

const News = () => {
  const sidebarRef = useRef(null);
  const sidebarInView = useInView(sidebarRef, { once: true, amount: 0.3 });

  return (
    <section id="investidores" className="py-24 bg-card-gradient relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Notícias & Relatórios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Atualizações <span className="text-gradient-accent">institucionais</span>
          </h2>
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
            <motion.div 
              className="p-6 border-gradient rounded-2xl bg-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Documentos
              </h3>
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="block p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sidebarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                          {report.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {report.type} • {report.size}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Stock Ticker (Mock) */}
            <motion.div 
              className="p-6 border-gradient rounded-2xl bg-card"
              initial={{ opacity: 0, y: 40 }}
              animate={sidebarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-sm text-muted-foreground mb-2">NYSE: NXON</div>
              <motion.div 
                className="text-3xl font-black text-foreground"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={sidebarInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                $127.45
              </motion.div>
              <motion.div 
                className="text-sm text-green-500 mt-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                +2.34 (+1.87%)
              </motion.div>
              <div className="text-xs text-muted-foreground mt-4">
                Cotação atrasada em 15 min
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default News;
