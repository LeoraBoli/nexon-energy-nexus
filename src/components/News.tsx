import { ArrowRight, Calendar, FileText } from 'lucide-react';

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

const News = () => {
  return (
    <section id="investidores" className="py-24 bg-card-gradient relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Notícias & Relatórios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Atualizações <span className="text-gradient-accent">institucionais</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News Cards */}
          <div className="lg:col-span-2 space-y-6">
            {news.map((item, index) => (
              <article
                key={index}
                className="group p-6 border-gradient rounded-2xl bg-card hover:shadow-glow transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                <div className="flex items-center text-accent text-sm font-semibold group-hover:gap-2 transition-all">
                  Ler mais <ArrowRight className="w-4 h-4" />
                </div>
              </article>
            ))}
          </div>

          {/* Reports Sidebar */}
          <div className="space-y-6">
            <div className="p-6 border-gradient rounded-2xl bg-card">
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Documentos
              </h3>
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors group"
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
                  </a>
                ))}
              </div>
            </div>

            {/* Stock Ticker (Mock) */}
            <div className="p-6 border-gradient rounded-2xl bg-card">
              <div className="text-sm text-muted-foreground mb-2">NYSE: NXON</div>
              <div className="text-3xl font-black text-foreground">$127.45</div>
              <div className="text-sm text-green-500 mt-1">+2.34 (+1.87%)</div>
              <div className="text-xs text-muted-foreground mt-4">
                Cotação atrasada em 15 min
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
