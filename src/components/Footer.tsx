import { Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { label: 'Sobre nós', href: '#empresa' },
      { label: 'Liderança', href: '#' },
      { label: 'História', href: '#' },
      { label: 'Prêmios', href: '#' },
    ],
    operations: [
      { label: 'Exploração', href: '#operacoes' },
      { label: 'Refino', href: '#operacoes' },
      { label: 'Logística', href: '#operacoes' },
      { label: 'Renováveis', href: '#operacoes' },
    ],
    investors: [
      { label: 'Relatórios', href: '#investidores' },
      { label: 'Governança', href: '#' },
      { label: 'Ações', href: '#' },
      { label: 'Eventos', href: '#' },
    ],
    legal: [
      { label: 'Políticas', href: '#' },
      { label: 'Compliance', href: '#' },
      { label: 'ESG', href: '#sustentabilidade' },
      { label: 'Privacidade', href: '#' },
    ],
  };

  const social = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-carbon border-t border-border">
      {/* Main Footer */}
      <motion.div 
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <a href="#" className="flex items-center gap-2 mb-6">
              <motion.div 
                className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center shadow-glow"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent-foreground font-black text-xl">N</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground">NEXON</span>
                <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase -mt-1">Energy Group</span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Líder global em exploração, refino e transporte de energia, 
              comprometida com a transição para um futuro sustentável.
            </p>
            <div className="flex gap-3">
              {social.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-4">Operações</h4>
            <ul className="space-y-3">
              {links.operations.map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-4">Investidores</h4>
            <ul className="space-y-3">
              {links.investors.map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              © {currentYear} NEXON ENERGY GROUP. Todos os direitos reservados.
            </motion.div>
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {['Políticas de Privacidade', 'Termos de Uso', 'Mapa do Site'].map((text) => (
                <motion.a 
                  key={text}
                  href="#" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {text}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
