import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Building2, Clock } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import SoundButton from '@/components/SoundButton';
import { useSound } from '@/hooks/useSoundEffects';

const offices = [
  { city: 'Houston', country: 'Estados Unidos', type: 'Sede Global', address: '1200 Smith Street, Suite 3000', phone: '+1 (713) 555-0100' },
  { city: 'Rio de Janeiro', country: 'Brasil', type: 'América do Sul', address: 'Av. Rio Branco, 1 - Centro', phone: '+55 (21) 3555-0200' },
  { city: 'Londres', country: 'Reino Unido', type: 'Europa & África', address: '1 Canada Square, Canary Wharf', phone: '+44 20 7555 0300' },
  { city: 'Singapura', country: 'Singapura', type: 'Ásia-Pacífico', address: 'One Raffles Quay, North Tower', phone: '+65 6555 0400' },
  { city: 'Dubai', country: 'Emirados Árabes', type: 'Oriente Médio', address: 'DIFC, Gate Village 4', phone: '+971 4 555 0500' },
  { city: 'Lagos', country: 'Nigéria', type: 'África Ocidental', address: 'Victoria Island, Adeola Odeku', phone: '+234 1 555 0600' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const { playHover, playSuccess } = useSound();
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const officesRef = useRef(null);
  const officesInView = useInView(officesRef, { once: true, amount: 0.2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contato" className="py-24 bg-card-gradient relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Contato Corporativo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Fale <span className="text-gradient-accent">conosco</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Nossa equipe de relações com investidores e comunicação corporativa está disponível para atendê-lo
          </p>
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
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold text-foreground">
                Envie sua mensagem
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={playHover}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Email corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="email@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={playHover}
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
                    onFocus={playHover}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Departamento *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    onFocus={playHover}
                  >
                    <option value="">Selecione</option>
                    <option value="ir">Relações com Investidores</option>
                    <option value="commercial">Desenvolvimento de Negócios</option>
                    <option value="press">Assessoria de Imprensa</option>
                    <option value="careers">Recursos Humanos</option>
                    <option value="compliance">Compliance & Ética</option>
                    <option value="sustainability">Sustentabilidade</option>
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
                  Mensagem *
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Descreva sua solicitação em detalhes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={playHover}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SoundButton variant="hero" size="lg" className="w-full">
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </SoundButton>
              </motion.div>
              <p className="text-xs text-muted-foreground text-center">
                Ao enviar, você concorda com nossa Política de Privacidade e Termos de Uso
              </p>
            </form>
          </motion.div>

          {/* Offices */}
          <div ref={officesRef}>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-accent" />
              <motion.h3 
                className="text-xl font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={officesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Escritórios Globais
              </motion.h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {offices.map((office, index) => (
                <motion.div
                  key={office.city}
                  className="p-5 border-gradient rounded-xl bg-card hover:shadow-glow transition-all duration-300"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={officesInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  onMouseEnter={playHover}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="font-bold text-foreground">{office.city}</div>
                      <div className="text-sm text-muted-foreground">{office.country}</div>
                      <div className="text-xs text-accent mt-1 font-medium">{office.type}</div>
                      <div className="text-xs text-muted-foreground mt-2">{office.address}</div>
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
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-accent" />
                <h4 className="font-bold text-foreground">Contato Direto</h4>
              </div>
              <div className="space-y-3">
                <motion.a 
                  href="tel:+17135550100" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 10 }}
                  onMouseEnter={playHover}
                >
                  <Phone className="w-5 h-5 text-accent" />
                  +1 (713) 555-0100 (Sede Houston)
                </motion.a>
                <motion.a 
                  href="mailto:ir@nexonenergy.com" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 10 }}
                  onMouseEnter={playHover}
                >
                  <Mail className="w-5 h-5 text-accent" />
                  ir@nexonenergy.com (Relações com Investidores)
                </motion.a>
                <motion.a 
                  href="mailto:press@nexonenergy.com" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 10 }}
                  onMouseEnter={playHover}
                >
                  <Mail className="w-5 h-5 text-accent" />
                  press@nexonenergy.com (Assessoria de Imprensa)
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
