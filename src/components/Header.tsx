import { useState, useEffect } from 'react';
import { Menu, X, FileText, TrendingUp } from 'lucide-react';
import SoundButton from '@/components/SoundButton';
import { useSound } from '@/hooks/useSoundEffects';

const navItems = [
  { label: 'Empresa', href: '#empresa' },
  { label: 'Operações', href: '#operacoes' },
  { label: 'Sustentabilidade', href: '#sustentabilidade' },
  { label: 'Investidores', href: '#investidores' },
  { label: 'Carreiras', href: '#carreiras' },
  { label: 'Contato', href: '#contato' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { playHover, playClick, playWhoosh } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    playWhoosh();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass border-b border-border py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2 group"
          onMouseEnter={playHover}
          onClick={playClick}
        >
          <div className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center shadow-glow">
            <span className="text-accent-foreground font-black text-xl">N</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground">NEXON</span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase -mt-1">Energy Group</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full text-accent text-xs font-semibold">
            <TrendingUp className="w-3 h-3" />
            NYSE: NXE +2.4%
          </div>
          <SoundButton variant="corporate" size="sm">
            <FileText className="w-4 h-4" />
            Relatório 2024
          </SoundButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-t border-border mt-3 animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => {
                  playClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <SoundButton variant="corporate" size="sm" className="mt-4">
              <FileText className="w-4 h-4" />
              Relatório 2024
            </SoundButton>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
