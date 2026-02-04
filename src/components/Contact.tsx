import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const offices = [
  { city: 'Houston', country: 'EUA', type: 'Sede Global' },
  { city: 'Rio de Janeiro', country: 'Brasil', type: 'América do Sul' },
  { city: 'Londres', country: 'Reino Unido', type: 'Europa' },
  { city: 'Singapura', country: 'Singapura', type: 'Ásia-Pacífico' },
  { city: 'Dubai', country: 'EAU', type: 'Oriente Médio' },
  { city: 'Lagos', country: 'Nigéria', type: 'África' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contato" className="py-24 bg-card-gradient relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Contato Global
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Fale <span className="text-gradient-accent">conosco</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="border-gradient rounded-2xl p-8 bg-card">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Envie sua mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Email corporativo
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="email@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Empresa
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Nome da empresa"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Assunto
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    <option value="commercial">Comercial</option>
                    <option value="investors">Investidores</option>
                    <option value="press">Imprensa</option>
                    <option value="careers">Carreiras</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Mensagem
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Descreva sua solicitação..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <Button variant="hero" size="lg" className="w-full">
                <Send className="w-4 h-4" />
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">
              Nossos Escritórios
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="p-5 border-gradient rounded-xl bg-card hover:shadow-glow transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-foreground">{office.city}</div>
                      <div className="text-sm text-muted-foreground">{office.country}</div>
                      <div className="text-xs text-accent mt-1">{office.type}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 p-6 border-gradient rounded-2xl bg-card">
              <h4 className="font-bold text-foreground mb-4">Contato Direto</h4>
              <div className="space-y-3">
                <a href="tel:+1-800-NEXON" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                  +1 (800) NEXON-00
                </a>
                <a href="mailto:contact@nexonenergy.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                  contact@nexonenergy.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
