import { Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

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

  return (
    <footer className="bg-carbon border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center shadow-glow">
                <span className="text-accent-foreground font-black text-xl">N</span>
              </div>
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
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Operações</h4>
            <ul className="space-y-3">
              {links.operations.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Investidores</h4>
            <ul className="space-y-3">
              {links.investors.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} NEXON ENERGY GROUP. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Políticas de Privacidade
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Mapa do Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
