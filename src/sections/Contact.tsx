import { useState } from 'react';
import Reveal from '../components/Reveal';
// import WeatherDisplay from '../components/WeatherDisplay'; // Importe o novo componente - REMOVIDO
import { Send, Loader2, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Linkedin, Github, Twitter, Facebook, Youtube, Instagram } from 'lucide-react';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const sanitize = (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();

  const validate = () => {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = 'Informe seu nome';
    if (!lastName.trim()) next.lastName = 'Informe seu apelido';
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!email.trim() || !emailOk) next.email = 'E-mail inválido';
    if (phone && !/^\+?[0-9\-()\s.]{6,}$/.test(phone)) next.phone = 'Telefone inválido';
    if (!message.trim()) next.message = 'Escreva sua mensagem';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      // Simula envio (substituir por API/Firebase se desejar)
      await new Promise((res) => setTimeout(res, 1500));
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1800);
      setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setMessage('');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1800);
    }
  };

  const openEmail = () => {
    const subject = 'Conctato através do Portfólio';
    const bodyLines = [
      'Olá Mauro, venho através do seu Portfólio,',
      firstName || lastName ? `Meu nome é ${firstName} ${lastName}`.trim() : '',
      phone ? `Meu telefone: ${phone}` : '',
      '',
      message,
      '',
      'Atenciosamente,',
      `${firstName} ${lastName}`.trim(),
    ].filter(Boolean).join('\n');
    const mailto = `mailto:maurobernardozibane@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
    window.location.href = mailto;
  };

  const openWhatsApp = () => {
    const phoneDest = '258842767435';
    const textLines = [
      'Olá Mauro, venho através do seu Portfólio,',
      firstName || lastName ? `Meu nome é ${firstName} ${lastName}`.trim() : '',
      phone ? `Meu telefone: ${phone}` : '',
      '',
      message,
    ].filter(Boolean).join('\n');
    const url = `https://wa.me/${phoneDest}?text=${encodeURIComponent(textLines)}`;
    window.open(url, '_blank');
  };

  const inputBase = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <section id="contato" className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">Entre em Conctato</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Estou sempre aberto a novas oportunidades e colaborações. Envie uma mensagem ou conecte-se pelas redes sociais.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] justify-items-center lg:justify-items-stretch">
          {/* Form card */}
          <form onSubmit={handleSubmit} className="relative rounded-xl border bg-card p-10 shadow-lg w-full max-w-2xl">
            <div className="grid gap-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <label className="grid gap-2">
                  <span className="text-md font-bold leading-none text-foreground">Nome</span>
                  <input value={firstName} onChange={(e) => setFirstName(sanitize(e.target.value))} className={`${inputBase} ${errors.firstName ? 'border-destructive ring-destructive' : ''}`} placeholder="Seu Nome" />
                  {errors.firstName && <span className="text-sm text-destructive-foreground mt-1">{errors.firstName}</span>}
          </label>
                <label className="grid gap-2">
                  <span className="text-md font-bold leading-none text-foreground">Apelido</span>
                  <input value={lastName} onChange={(e) => setLastName(sanitize(e.target.value))} className={`${inputBase} ${errors.lastName ? 'border-destructive ring-destructive' : ''}`} placeholder="Seu Apelido" />
                  {errors.lastName && <span className="text-sm text-destructive-foreground mt-1">{errors.lastName}</span>}
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <label className="grid gap-2">
                  <span className="text-md font-bold leading-none text-foreground">E-mail</span>
                  <input type="email" value={email} onChange={(e) => setEmail(sanitize(e.target.value))} className={`${inputBase} ${errors.email ? 'border-destructive ring-destructive' : ''}`} placeholder="mauro@gmail.com" />
                  {errors.email && <span className="text-sm text-destructive-foreground mt-1">{errors.email}</span>}
          </label>
                <label className="grid gap-2">
                  <span className="text-md font-bold leading-none text-foreground">Telefone (opcional)</span>
                  <input value={phone} onChange={(e) => setPhone(sanitize(e.target.value))} className={`${inputBase} ${errors.phone ? 'border-destructive ring-destructive' : ''}`} placeholder="Ex: +258 84 123 4567" />
                  {errors.phone && <span className="text-sm text-destructive-foreground mt-1">{errors.phone}</span>}
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-md font-bold leading-none text-foreground">Mensagem</span>
                <textarea value={message} onChange={(e) => setMessage(sanitize(e.target.value))} className={`${inputBase} min-h-[160px] resize-y ${errors.message ? 'border-destructive ring-destructive' : ''}`} placeholder="Como posso ajudar?" />
                {errors.message && <span className="text-sm text-destructive-foreground mt-1">{errors.message}</span>}
          </label>
            </div>

            <div className="mt-10 grid gap-5">
              <button type="submit" disabled={status === 'loading'} className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-primary-foreground font-bold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                {status === 'idle' && <Send size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                {status === 'loading' && <Loader2 size={24} className="animate-spin" />}
                {status === 'success' && <CheckCircle2 size={24} />}
                {status === 'error' && <AlertCircle size={24} />}
                <span className="text-xl">
                  {status === 'idle' && 'Enviar Mensagem'}
                  {status === 'loading' && 'Enviando...'}
                  {status === 'success' && 'Enviado com sucesso!'}
                  {status === 'error' && 'Erro ao enviar'}
                </span>
              </button>

              <div className="grid sm:grid-cols-2 gap-4">
                <button type="button" onClick={openEmail} className="inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-6 py-3 text-foreground font-semibold transition-colors hover:bg-muted/50 hover:shadow-sm">
                  <Mail size={20} className="text-primary" /> <span className="text-md">Enviar E-mail</span>
                </button>
                <button type="button" onClick={openWhatsApp} className="inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-6 py-3 text-foreground font-semibold transition-colors hover:bg-muted/50 hover:shadow-sm">
                  <img src="/icons/brands/whatsapp.svg" alt="WhatsApp" className="h-5 w-5" /> <span className="text-md">WhatsApp</span>
                </button>
              </div>
            </div>
          </form>

          {/* Info card */}
          <div className="rounded-xl border bg-card p-8 shadow-lg">
            <Reveal delayMs={100}>
              <h3 className="text-2xl font-bold text-foreground">Informações de Conctato</h3>
            </Reveal>
            <div className="mt-8 space-y-6">
              <Reveal delayMs={150}>
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <Phone size={26} />
                </span>
                  <div>
                    <p className="text-md text-muted-foreground">Telefone</p>
                    <a href="tel:+258842767435" className="font-bold text-lg text-foreground hover:underline">+258 84 276 7435</a>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <Mail size={26} />
                </span>
                  <div>
                    <p className="text-md text-muted-foreground">E-mail</p>
                    <a href="mailto:maurobernardozibane@gmail.com" className="font-bold text-lg text-foreground hover:underline">maurobernardozibane@gmail.com</a>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={250}>
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <MapPin size={26} />
                </span>
                  <div>
                    <p className="text-md text-muted-foreground">Localização</p>
                    <p className="font-bold text-lg text-foreground">Beira, Moçambique</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={300}>
              <h4 className="mt-10 text-2xl font-bold text-foreground text-center">Redes Sociais</h4>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <Reveal delayMs={350}>
                <a href="https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300" aria-label="LinkedIn">
                  <Linkedin size={20} className="text-primary group-hover:scale-110 transition-transform" />
                </a>
              </Reveal>
              <Reveal delayMs={400}>
                <a href="https://github.com/maurobernardo?tab=repositories" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300" aria-label="GitHub">
                  <Github size={20} className="text-primary group-hover:scale-110 transition-transform" />
                </a>
              </Reveal>
              <Reveal delayMs={450}>
                <a href="https://twitter.com/MauroZiban7" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300" aria-label="Twitter">
                  <Twitter size={20} className="text-primary group-hover:scale-110 transition-transform" />
                </a>
              </Reveal>
              <Reveal delayMs={500}>
                <a href="https://www.facebook.com/mauroutall.mbz" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300" aria-label="Facebook">
                  <Facebook size={20} className="text-primary group-hover:scale-110 transition-transform" />
                </a>
              </Reveal>
              <Reveal delayMs={600}>
                <a href="https://www.youtube.com/@ZibaneUpdatee026" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300" aria-label="YouTube">
                  <Youtube size={20} className="text-primary group-hover:scale-110 transition-transform" />
                </a>
              </Reveal>
              <Reveal delayMs={650}>
                <a href="https://www.instagram.com/_mauro_zibane10_/" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300" aria-label="Instagram">
                  <Instagram size={20} className="text-primary group-hover:scale-110 transition-transform" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <Reveal delayMs={700}>
          <div className="mt-12 rounded-xl border border-primary/20 shadow-lg overflow-hidden">
            <h4 className="text-xl font-bold text-foreground p-4 bg-card text-center">Minha Localização</h4>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>{/* 16:9 Aspect Ratio */}
              <iframe
                title="Google Map of Beira, Mozambique"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15440.09886407005!2d34.8291535!3d-19.8398463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x192a549d44c8c775%3A0x6339d6b5e0c51f4c!2sBeira%2C%20Mozambique!5e0!3m2!1sen!2s!4v1678886000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
         </div>
        </Reveal>

        {/* Weather Display - REMOVIDO */}
        {/*
        <Reveal delayMs={750}>
          <div className="mt-8">
            <WeatherDisplay apiKey="SUA_CHAVE_API_OPENWEATHERMAP" city="Beira" countryCode="MZ" />
          </div>
        </Reveal>
        */}
      </div>
    </section>
  );
}


