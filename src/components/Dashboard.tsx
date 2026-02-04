import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Droplets, Flame, Wind, DollarSign, 
  BarChart3, Activity, Leaf, Globe
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useSound } from '@/hooks/useSoundEffects';

// Production data 2024
const monthlyProduction = [
  { month: 'Jan', oil: 2.8, gas: 1.2, renewable: 0.4 },
  { month: 'Fev', oil: 2.9, gas: 1.3, renewable: 0.5 },
  { month: 'Mar', oil: 3.0, gas: 1.2, renewable: 0.6 },
  { month: 'Abr', oil: 3.1, gas: 1.4, renewable: 0.7 },
  { month: 'Mai', oil: 3.2, gas: 1.3, renewable: 0.8 },
  { month: 'Jun', oil: 3.3, gas: 1.5, renewable: 0.9 },
  { month: 'Jul', oil: 3.4, gas: 1.4, renewable: 1.0 },
  { month: 'Ago', oil: 3.3, gas: 1.6, renewable: 1.1 },
  { month: 'Set', oil: 3.5, gas: 1.5, renewable: 1.2 },
  { month: 'Out', oil: 3.4, gas: 1.7, renewable: 1.3 },
  { month: 'Nov', oil: 3.6, gas: 1.6, renewable: 1.4 },
  { month: 'Dez', oil: 3.4, gas: 1.8, renewable: 1.5 },
];

const revenueData = [
  { quarter: 'Q1 2023', revenue: 22.4, ebitda: 9.8 },
  { quarter: 'Q2 2023', revenue: 23.1, ebitda: 10.2 },
  { quarter: 'Q3 2023', revenue: 24.8, ebitda: 11.1 },
  { quarter: 'Q4 2023', revenue: 25.2, ebitda: 11.4 },
  { quarter: 'Q1 2024', revenue: 24.1, ebitda: 10.5 },
  { quarter: 'Q2 2024', revenue: 24.8, ebitda: 10.9 },
  { quarter: 'Q3 2024', revenue: 25.6, ebitda: 11.2 },
  { quarter: 'Q4 2024', revenue: 26.3, ebitda: 11.8 },
];

const segmentRevenue = [
  { name: 'Exploração & Produção', value: 52, color: 'hsl(24, 95%, 53%)' },
  { name: 'Refino', value: 28, color: 'hsl(213, 60%, 45%)' },
  { name: 'Logística & Trading', value: 12, color: 'hsl(150, 60%, 45%)' },
  { name: 'Renováveis', value: 8, color: 'hsl(45, 90%, 50%)' },
];

const regionalProduction = [
  { region: 'América do Norte', production: 1.2 },
  { region: 'América do Sul', production: 0.9 },
  { region: 'Europa', production: 0.5 },
  { region: 'África', production: 0.4 },
  { region: 'Ásia-Pacífico', production: 0.3 },
  { region: 'Oriente Médio', production: 0.1 },
];

const kpis = [
  { 
    label: 'Produção Total', 
    value: '3.4M', 
    unit: 'boe/dia',
    change: '+8.2%',
    positive: true,
    icon: Droplets,
  },
  { 
    label: 'Receita 2024', 
    value: '$98.2B', 
    unit: 'USD',
    change: '+12.4%',
    positive: true,
    icon: DollarSign,
  },
  { 
    label: 'EBITDA', 
    value: '$42.1B', 
    unit: 'USD',
    change: '+9.8%',
    positive: true,
    icon: TrendingUp,
  },
  { 
    label: 'Capacidade Renovável', 
    value: '8.5', 
    unit: 'GW',
    change: '+45%',
    positive: true,
    icon: Wind,
  },
  { 
    label: 'Emissões CO₂', 
    value: '-18%', 
    unit: 'vs 2019',
    change: 'Meta: -25%',
    positive: true,
    icon: Leaf,
  },
  { 
    label: 'ROACE', 
    value: '14.2%', 
    unit: '',
    change: '+1.8pp',
    positive: true,
    icon: Activity,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value} {entry.name.includes('revenue') || entry.name.includes('ebitda') ? 'B USD' : 'M boe/d'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const KPICard = ({ kpi, index }: { kpi: typeof kpis[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { playHover } = useSound();

  return (
    <motion.div
      ref={ref}
      className="p-5 border-gradient rounded-xl bg-card hover:shadow-glow transition-all duration-300"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      onMouseEnter={playHover}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <kpi.icon className="w-5 h-5 text-accent" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
          {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {kpi.change}
        </div>
      </div>
      <div className="text-2xl font-black text-foreground">{kpi.value}</div>
      <div className="text-xs text-muted-foreground">{kpi.unit}</div>
      <div className="text-sm font-medium text-foreground mt-1">{kpi.label}</div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'producao' | 'financeiro' | 'esg'>('producao');
  const chartRef = useRef(null);
  const chartInView = useInView(chartRef, { once: true, amount: 0.2 });
  const { playClick, playHover } = useSound();

  const tabs = [
    { id: 'producao', label: 'Produção', icon: Droplets },
    { id: 'financeiro', label: 'Financeiro', icon: BarChart3 },
    { id: 'esg', label: 'ESG & Renováveis', icon: Leaf },
  ] as const;

  return (
    <section id="dashboard" className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-12">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Relatório Anual 2024
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Dashboard <span className="text-gradient-accent">Operacional</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Acompanhe em tempo real os principais indicadores de produção, desempenho financeiro 
            e metas de sustentabilidade da NEXON Energy Group.
          </p>
        </ScrollReveal>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {kpis.map((kpi, index) => (
            <KPICard key={kpi.label} kpi={kpi} index={index} />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-accent text-accent-foreground shadow-glow' 
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50'
              }`}
              onClick={() => {
                playClick();
                setActiveTab(tab.id);
              }}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Charts Grid */}
        <motion.div
          ref={chartRef}
          className="grid lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={chartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === 'producao' && (
            <>
              {/* Production Chart */}
              <div className="p-6 border-gradient rounded-2xl bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Produção Mensal 2024</h3>
                    <p className="text-sm text-muted-foreground">Milhões de barris equivalentes/dia</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-muted-foreground">Petróleo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">Gás</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">Renováveis</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyProduction}>
                    <defs>
                      <linearGradient id="colorOil" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(213, 90%, 55%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(213, 90%, 55%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRenewable" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(150, 70%, 45%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(150, 70%, 45%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="oil" stackId="1" stroke="hsl(24, 95%, 53%)" fill="url(#colorOil)" name="Petróleo" />
                    <Area type="monotone" dataKey="gas" stackId="1" stroke="hsl(213, 90%, 55%)" fill="url(#colorGas)" name="Gás" />
                    <Area type="monotone" dataKey="renewable" stackId="1" stroke="hsl(150, 70%, 45%)" fill="url(#colorRenewable)" name="Renováveis" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Regional Production */}
              <div className="p-6 border-gradient rounded-2xl bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Produção por Região</h3>
                    <p className="text-sm text-muted-foreground">Milhões de boe/dia</p>
                  </div>
                  <Globe className="w-5 h-5 text-accent" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalProduction} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="region" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="production" fill="hsl(24, 95%, 53%)" radius={[0, 4, 4, 0]} name="Produção" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {activeTab === 'financeiro' && (
            <>
              {/* Revenue Chart */}
              <div className="p-6 border-gradient rounded-2xl bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Receita & EBITDA</h3>
                    <p className="text-sm text-muted-foreground">Bilhões USD por trimestre</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-accent" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(24, 95%, 53%)" strokeWidth={3} dot={{ fill: 'hsl(24, 95%, 53%)' }} name="Receita" />
                    <Line type="monotone" dataKey="ebitda" stroke="hsl(150, 70%, 45%)" strokeWidth={3} dot={{ fill: 'hsl(150, 70%, 45%)' }} name="EBITDA" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Segment Revenue */}
              <div className="p-6 border-gradient rounded-2xl bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Receita por Segmento</h3>
                    <p className="text-sm text-muted-foreground">Distribuição percentual 2024</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-accent" />
                </div>
                <div className="flex items-center gap-8">
                  <ResponsiveContainer width="50%" height={250}>
                    <PieChart>
                      <Pie
                        data={segmentRevenue}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {segmentRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-3">
                    {segmentRevenue.map((segment) => (
                      <div key={segment.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                          <span className="text-sm text-muted-foreground">{segment.name}</span>
                        </div>
                        <span className="text-sm font-bold text-foreground">{segment.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'esg' && (
            <>
              {/* Renewable Capacity Growth */}
              <div className="p-6 border-gradient rounded-2xl bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Crescimento Renováveis</h3>
                    <p className="text-sm text-muted-foreground">Capacidade instalada (GW)</p>
                  </div>
                  <Wind className="w-5 h-5 text-accent" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={[
                    { year: '2020', capacity: 2.1 },
                    { year: '2021', capacity: 3.2 },
                    { year: '2022', capacity: 4.8 },
                    { year: '2023', capacity: 6.2 },
                    { year: '2024', capacity: 8.5 },
                    { year: '2025 (meta)', capacity: 10.0 },
                  ]}>
                    <defs>
                      <linearGradient id="colorCapacity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(150, 70%, 45%)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(150, 70%, 45%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="capacity" stroke="hsl(150, 70%, 45%)" fill="url(#colorCapacity)" strokeWidth={3} name="Capacidade" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* ESG Metrics */}
              <div className="p-6 border-gradient rounded-2xl bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Métricas ESG 2024</h3>
                    <p className="text-sm text-muted-foreground">Progresso vs metas</p>
                  </div>
                  <Leaf className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Redução CO₂ (vs 2019)', current: 18, target: 25, unit: '%' },
                    { label: 'Energia Renovável no Mix', current: 12, target: 20, unit: '%' },
                    { label: 'Reciclagem de Água', current: 85, target: 95, unit: '%' },
                    { label: 'Mulheres na Liderança', current: 32, target: 40, unit: '%' },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                        <span className="text-sm font-bold text-foreground">
                          {metric.current}{metric.unit} / {metric.target}{metric.unit}
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent to-green-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(metric.current / metric.target) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-12 p-6 border-gradient rounded-2xl bg-card/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-black text-accent">$98.2B</div>
              <div className="text-sm text-muted-foreground">Receita Total 2024</div>
            </div>
            <div>
              <div className="text-2xl font-black text-accent">$42.1B</div>
              <div className="text-sm text-muted-foreground">EBITDA</div>
            </div>
            <div>
              <div className="text-2xl font-black text-accent">$12.8B</div>
              <div className="text-sm text-muted-foreground">Investimentos (CAPEX)</div>
            </div>
            <div>
              <div className="text-2xl font-black text-accent">$6.2B</div>
              <div className="text-sm text-muted-foreground">Dividendos Pagos</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
