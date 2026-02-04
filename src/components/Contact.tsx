import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';

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

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const officesRef = useRef(null);
  const officesInView = useInView(officesRef, { once: true, amount: 0.2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contato" className="py-24 bg-card-gradient relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Contato Global
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Fale <span className="text-gradient-accent">conosco</span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            ref={formRef}
            className="border-gradient rounded-2xl p-8 bg-card"
            initial={{ opacity: 0, x: -80 }}
            animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">
              Envie sua mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
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
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
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
                </motion.div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
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
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
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
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="hero" size="lg" className="w-full">
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Offices */}
          <div ref={officesRef}>
            <motion.h3 
              className="text-xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={officesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Nossos Escritórios
            </motion.h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {offices.map((office, index) => (
                <motion.div
                  key={office.city}
                  className="p-5 border-gradient rounded-xl bg-card hover:shadow-glow transition-all duration-300"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={officesInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <div>
                      <div className="font-bold text-foreground">{office.city}</div>
                      <div className="text-sm text-muted-foreground">{office.country}</div>
                      <div className="text-xs text-accent mt-1">{office.type}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <motion.div 
              className="mt-8 p-6 border-gradient rounded-2xl bg-card"
              initial={{ opacity: 0, y: 40 }}
              animate={officesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h4 className="font-bold text-foreground mb-4">Contato Direto</h4>
              <div className="space-y-3">
                <motion.a 
                  href="tel:+1-800-NEXON" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <Phone className="w-5 h-5 text-accent" />
                  +1 (800) NEXON-00
                </motion.a>
                <motion.a 
                  href="mailto:contact@nexonenergy.com" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <Mail className="w-5 h-5 text-accent" />
                  contact@nexonenergy.com
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
