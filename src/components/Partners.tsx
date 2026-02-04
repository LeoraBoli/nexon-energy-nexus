import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

// Partner logos as SVG components for crisp rendering
const partners = [
  {
    name: 'ExxonMobil',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-2xl font-bold tracking-tight">
          EXXONMOBIL
        </text>
      </svg>
    ),
  },
  {
    name: 'Shell',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-2xl font-bold">
          SHELL
        </text>
      </svg>
    ),
  },
  {
    name: 'Chevron',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-2xl font-bold">
          CHEVRON
        </text>
      </svg>
    ),
  },
  {
    name: 'TotalEnergies',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-xl font-bold">
          TOTALENERGIES
        </text>
      </svg>
    ),
  },
  {
    name: 'BP',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-3xl font-black">
          bp
        </text>
      </svg>
    ),
  },
  {
    name: 'Equinor',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-2xl font-bold">
          EQUINOR
        </text>
      </svg>
    ),
  },
  {
    name: 'Petrobras',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-2xl font-bold">
          PETROBRAS
        </text>
      </svg>
    ),
  },
  {
    name: 'Saudi Aramco',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-xl font-bold">
          SAUDI ARAMCO
        </text>
      </svg>
    ),
  },
  {
    name: 'ConocoPhillips',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-lg font-bold">
          CONOCOPHILLIPS
        </text>
      </svg>
    ),
  },
  {
    name: 'Eni',
    logo: (
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="text-3xl font-black">
          eni
        </text>
      </svg>
    ),
  },
];

const Partners = () => {
  // Double the array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-card-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-12">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Parceiros Globais
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Trabalhamos com os <span className="text-gradient-accent">líderes mundiais</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Parcerias estratégicas com as maiores empresas de energia do mundo, 
            impulsionando inovação e excelência operacional.
          </p>
        </ScrollReveal>

        {/* Infinite Scroll Logos - First Row (Left to Right) */}
        <div className="relative mb-8">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />
          
          <motion.div
            className="flex gap-12"
            animate={{ x: [0, -50 * partners.length * 2] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-48 h-16 flex items-center justify-center text-muted-foreground/40 hover:text-foreground transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                data-cursor="Ver parceiro"
              >
                {partner.logo}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Infinite Scroll Logos - Second Row (Right to Left) */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />
          
          <motion.div
            className="flex gap-12"
            animate={{ x: [-50 * partners.length * 2, 0] }}
            transition={{
              x: {
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {[...duplicatedPartners].reverse().map((partner, index) => (
              <motion.div
                key={`${partner.name}-rev-${index}`}
                className="flex-shrink-0 w-48 h-16 flex items-center justify-center text-muted-foreground/40 hover:text-foreground transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                data-cursor="Ver parceiro"
              >
                {partner.logo}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { value: '50+', label: 'Parceiros estratégicos' },
            { value: '25', label: 'Anos de colaboração média' },
            { value: '$120B', label: 'Em projetos conjuntos' },
            { value: '100%', label: 'Satisfação em contratos' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            >
              <div className="text-2xl md:text-3xl font-black text-accent">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
