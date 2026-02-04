import { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadialBarChart, RadialBar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Droplets, Wind, DollarSign, 
  BarChart3, Activity, Leaf, Globe, Zap, Clock, RefreshCw
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
  { name: 'E&P', fullName: 'Exploração & Produção', value: 52, color: 'hsl(24, 95%, 53%)' },
  { name: 'Refino', fullName: 'Refino & Petroquímica', value: 28, color: 'hsl(213, 60%, 45%)' },
  { name: 'Logística', fullName: 'Logística & Trading', value: 12, color: 'hsl(150, 60%, 45%)' },
  { name: 'Renováveis', fullName: 'Energias Renováveis', value: 8, color: 'hsl(45, 90%, 50%)' },
];

const regionalProduction = [
  { region: 'América do Norte', production: 1.2, fill: 'hsl(24, 95%, 53%)' },
  { region: 'América do Sul', production: 0.9, fill: 'hsl(24, 85%, 58%)' },
  { region: 'Europa', production: 0.5, fill: 'hsl(24, 75%, 63%)' },
  { region: 'África', production: 0.4, fill: 'hsl(24, 65%, 68%)' },
  { region: 'Ásia-Pacífico', production: 0.3, fill: 'hsl(24, 55%, 73%)' },
  { region: 'Oriente Médio', production: 0.1, fill: 'hsl(24, 45%, 78%)' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        className="bg-card/95 backdrop-blur-md border border-accent/20 rounded-xl p-4 shadow-glow"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="text-sm font-bold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold" style={{ color: entry.color }}>
              {entry.value} {entry.name.includes('Receita') || entry.name.includes('EBITDA') ? 'B' : 'M'}
            </span>
          </div>
        ))}
      </motion.div>
    );
  }
  return null;
};

// Animated Counter Component
const AnimatedValue = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const prefix = value.match(/^[^0-9]*/)?.[0] || '';
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(`${prefix}${current.toFixed(1)}${suffix}`);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value, suffix]);

  return <span ref={ref}>{displayValue}</span>;
};

// Live indicator component
const LiveIndicator = () => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
    <motion.div
      className="w-2 h-2 bg-green-500 rounded-full"
      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <span className="text-xs font-semibold text-green-500">AO VIVO</span>
  </div>
);

// KPI Card with enhanced animations
const KPICard = ({ kpi, index }: { kpi: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { playHover } = useSound();

  return (
    <motion.div
      ref={ref}
      className="relative p-5 border-gradient rounded-xl bg-gradient-to-br from-card to-card/50 hover:shadow-glow transition-all duration-500 group overflow-hidden"
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 15 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.05, y: -8 }}
      onMouseEnter={playHover}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ filter: 'blur(20px)' }}
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <kpi.icon className="w-6 h-6 text-accent" />
          </motion.div>
          <motion.div 
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
              kpi.positive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
            }`}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {kpi.change}
          </motion.div>
        </div>
        
        <motion.div 
          className="text-3xl font-black text-foreground mb-1"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <AnimatedValue value={kpi.value} />
        </motion.div>
        <div className="text-xs text-accent font-medium">{kpi.unit}</div>
        <div className="text-sm font-semibold text-muted-foreground mt-2">{kpi.label}</div>
      </div>
    </motion.div>
  );
};

// Chart Card wrapper with animations
const ChartCard = ({ children, title, subtitle, icon: Icon, delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="p-6 border-gradient rounded-2xl bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-accent" />}
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
};

const kpis = [
  { label: 'Produção Total', value: '3.4M', unit: 'boe/dia', change: '+8.2%', positive: true, icon: Droplets },
  { label: 'Receita 2024', value: '$98.2B', unit: 'USD', change: '+12.4%', positive: true, icon: DollarSign },
  { label: 'EBITDA', value: '$42.1B', unit: 'USD', change: '+9.8%', positive: true, icon: TrendingUp },
  { label: 'Capacidade Renovável', value: '8.5GW', unit: 'Instalado', change: '+45%', positive: true, icon: Wind },
  { label: 'Emissões CO₂', value: '-18%', unit: 'vs 2019', change: 'Meta: -25%', positive: true, icon: Leaf },
  { label: 'ROACE', value: '14.2%', unit: 'Retorno', change: '+1.8pp', positive: true, icon: Activity },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'producao' | 'financeiro' | 'esg'>('producao');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const { playClick, playHover } = useSound();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'producao', label: 'Produção', icon: Droplets },
    { id: 'financeiro', label: 'Financeiro', icon: BarChart3 },
    { id: 'esg', label: 'ESG & Renováveis', icon: Leaf },
  ] as const;

  return (
    <section id="dashboard" className="py-24 bg-gradient-to-b from-background via-card/20 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-accent font-semibold tracking-widest uppercase text-sm">
              Relatório Anual 2024
            </span>
            <LiveIndicator />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mt-4">
            Dashboard <span className="text-gradient-accent">Operacional</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Monitoramento em tempo real dos indicadores de produção, desempenho financeiro 
            e metas de sustentabilidade da NEXON Energy Group.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}</span>
            <motion.button
              className="ml-2 p-1 hover:bg-accent/10 rounded-full transition-colors"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLastUpdate(new Date())}
            >
              <RefreshCw className="w-3 h-3" />
            </motion.button>
          </div>
        </ScrollReveal>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {kpis.map((kpi, index) => (
            <KPICard key={kpi.label} kpi={kpi} index={index} />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab, i) => (
            <motion.button
              key={tab.id}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all overflow-hidden ${
                activeTab === tab.id 
                  ? 'text-accent-foreground' 
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
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-accent shadow-glow"
                  layoutId="activeTab"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Charts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'producao' && (
              <>
                <ChartCard title="Produção Mensal 2024" subtitle="Milhões de barris equivalentes/dia" icon={Droplets}>
                  <div className="flex items-center gap-6 mb-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-muted-foreground">Petróleo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">Gás Natural</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">Renováveis</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyProduction}>
                      <defs>
                        <linearGradient id="colorOil" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(213, 90%, 55%)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(213, 90%, 55%)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRenewable" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(150, 70%, 45%)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(150, 70%, 45%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="oil" stackId="1" stroke="hsl(24, 95%, 53%)" strokeWidth={2} fill="url(#colorOil)" name="Petróleo" />
                      <Area type="monotone" dataKey="gas" stackId="1" stroke="hsl(213, 90%, 55%)" strokeWidth={2} fill="url(#colorGas)" name="Gás" />
                      <Area type="monotone" dataKey="renewable" stackId="1" stroke="hsl(150, 70%, 45%)" strokeWidth={2} fill="url(#colorRenewable)" name="Renováveis" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Produção por Região" subtitle="Distribuição geográfica (M boe/dia)" icon={Globe} delay={0.1}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={regionalProduction} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis dataKey="region" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={120} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="production" radius={[0, 8, 8, 0]} name="Produção">
                        {regionalProduction.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </>
            )}

            {activeTab === 'financeiro' && (
              <>
                <ChartCard title="Receita & EBITDA" subtitle="Evolução trimestral (Bilhões USD)" icon={DollarSign}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                      <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="hsl(24, 95%, 53%)" strokeWidth={3} dot={{ fill: 'hsl(24, 95%, 53%)', strokeWidth: 2, r: 5 }} activeDot={{ r: 8, fill: 'hsl(24, 95%, 53%)' }} name="Receita" />
                      <Line type="monotone" dataKey="ebitda" stroke="hsl(150, 70%, 45%)" strokeWidth={3} dot={{ fill: 'hsl(150, 70%, 45%)', strokeWidth: 2, r: 5 }} activeDot={{ r: 8, fill: 'hsl(150, 70%, 45%)' }} name="EBITDA" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Receita por Segmento" subtitle="Distribuição 2024" icon={BarChart3} delay={0.1}>
                  <div className="flex items-center gap-8">
                    <ResponsiveContainer width="50%" height={280}>
                      <PieChart>
                        <Pie
                          data={segmentRevenue}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {segmentRevenue.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--background))" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-4">
                      {segmentRevenue.map((segment, i) => (
                        <motion.div 
                          key={segment.name} 
                          className="flex items-center justify-between"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-md" style={{ backgroundColor: segment.color }} />
                            <div>
                              <div className="text-sm font-medium text-foreground">{segment.name}</div>
                              <div className="text-xs text-muted-foreground">{segment.fullName}</div>
                            </div>
                          </div>
                          <span className="text-lg font-black text-foreground">{segment.value}%</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ChartCard>
              </>
            )}

            {activeTab === 'esg' && (
              <>
                <ChartCard title="Crescimento Energia Renovável" subtitle="Capacidade instalada (GW)" icon={Zap}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={[
                      { year: '2020', capacity: 2.1, meta: 3.0 },
                      { year: '2021', capacity: 3.2, meta: 4.0 },
                      { year: '2022', capacity: 4.8, meta: 5.5 },
                      { year: '2023', capacity: 6.2, meta: 7.0 },
                      { year: '2024', capacity: 8.5, meta: 8.0 },
                      { year: '2025', capacity: null, meta: 10.0 },
                    ]}>
                      <defs>
                        <linearGradient id="colorCapacity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(150, 70%, 45%)" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="hsl(150, 70%, 45%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                      <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="capacity" stroke="hsl(150, 70%, 45%)" fill="url(#colorCapacity)" strokeWidth={3} name="Realizado" />
                      <Line type="monotone" dataKey="meta" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Meta" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Metas ESG 2024" subtitle="Progresso vs objetivos" icon={Leaf} delay={0.1}>
                  <div className="space-y-6">
                    {[
                      { label: 'Redução CO₂ (vs 2019)', current: 18, target: 25, unit: '%', color: 'hsl(150, 70%, 45%)' },
                      { label: 'Energia Renovável no Mix', current: 12, target: 20, unit: '%', color: 'hsl(24, 95%, 53%)' },
                      { label: 'Reciclagem de Água', current: 85, target: 95, unit: '%', color: 'hsl(213, 90%, 55%)' },
                      { label: 'Mulheres na Liderança', current: 32, target: 40, unit: '%', color: 'hsl(280, 70%, 55%)' },
                    ].map((metric, i) => (
                      <motion.div 
                        key={metric.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{metric.label}</span>
                          <div className="text-right">
                            <span className="text-lg font-black" style={{ color: metric.color }}>
                              {metric.current}{metric.unit}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              / {metric.target}{metric.unit}
                            </span>
                          </div>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${metric.color}, ${metric.color}dd)` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(metric.current / metric.target) * 100}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ChartCard>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Financial Summary */}
        <motion.div
          className="mt-12 p-8 border-gradient rounded-2xl bg-gradient-to-r from-card via-card/80 to-card backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-foreground">Destaques Financeiros 2024</h3>
            <p className="text-sm text-muted-foreground">Resultados consolidados do exercício fiscal</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Receita Total', value: '$98.2B', icon: DollarSign },
              { label: 'EBITDA', value: '$42.1B', icon: TrendingUp },
              { label: 'Investimentos', value: '$12.8B', icon: Activity },
              { label: 'Dividendos', value: '$6.2B', icon: BarChart3 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <item.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-black text-accent">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
