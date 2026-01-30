import { useState } from 'react';
import Reveal from '../components/Reveal';
import emailjs from '@emailjs/browser'; 
import { Send, Loader2, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Linkedin, Github, Twitter, Facebook, Youtube, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');


  const serviceId = 'service_v9hnd3o'; 
  const templateId = 'template_0pmbmx9'; 
  const publicKey = 'WYBtiSordr0Zt8IqY'; 

  const sanitize = (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();

  const validate = () => {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = t('contact.nameError');
    if (!lastName.trim()) next.lastName = t('contact.lastNameError');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!email.trim() || !emailOk) next.email = t('contact.emailError');
    if (phone && !/^\+?[0-9\-()\s.]{6,}$/.test(phone)) next.phone = t('contact.phoneError');
    if (!message.trim()) next.message = t('contact.messageError');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    const templateParams = {
      user_name: `${firstName} ${lastName}`.trim(),
      user_email: email,
      user_subject: 'Nova mensagem do portfólio', // Assunto padrão, pode ser um campo do form se desejar
      user_message: message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1800);
      setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setMessage('');
    } catch (error) {
      console.error('EmailJS failed to send message:', error);
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
    <section id="contato" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Gradiente de fundo horizontal sutil - similar ao Hero */}
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 1) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 100%)' }} />
      
      {/* Partículas animadas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-24 left-20 w-2 h-2 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-[#00D9FF] rounded-full opacity-25 animate-float" style={{ animationDelay: '4s', animationDuration: '9s' }} />
        <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '6s', animationDuration: '7s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-[#00D9FF] rounded-full opacity-35 animate-float" style={{ animationDelay: '8s', animationDuration: '10s' }} />
      </div>
      
      {/* Gradientes animados */}
      <div className="absolute inset-0 z-0 opacity-25 dark:opacity-15">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s', animationDuration: '9s' }} />
      </div>
      
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">{t('contact.title')}</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t('contact.subtitle')}
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 md:gap-8 lg:grid-cols-[1fr_1fr] justify-items-center lg:justify-items-stretch">
          {/* Form card */}
          <form onSubmit={handleSubmit} className="group mz-card mz-card-md w-full max-w-xl mx-auto">
            <div className="mz-card-accent" />
            <div className="mz-card-accent-pulse" />
            <div className="mz-card-hover-bg" />
            <div className="mz-card-hover-shine" />
            
            <div className="grid gap-5 md:gap-6 lg:gap-7 relative z-10">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold leading-none text-foreground">{t('contact.firstName')}</span>
                  <input value={firstName} onChange={(e) => setFirstName(sanitize(e.target.value))} className={`${inputBase} transition-all duration-300 ${errors.firstName ? 'border-destructive ring-destructive' : 'hover:border-primary/50'}`} placeholder={t('contact.firstName')} name="user_name_first" />
                  {errors.firstName && <span className="text-xs text-destructive-foreground mt-1 animate-in fade-in slide-in-from-top-1">{errors.firstName}</span>}
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold leading-none text-foreground">{t('contact.lastName')}</span>
                  <input value={lastName} onChange={(e) => setLastName(sanitize(e.target.value))} className={`${inputBase} transition-all duration-300 ${errors.lastName ? 'border-destructive ring-destructive' : 'hover:border-primary/50'}`} placeholder={t('contact.lastName')} name="user_name_last" />
                  {errors.lastName && <span className="text-xs text-destructive-foreground mt-1 animate-in fade-in slide-in-from-top-1">{errors.lastName}</span>}
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold leading-none text-foreground">{t('contact.email')}</span>
                  <input type="email" value={email} onChange={(e) => setEmail(sanitize(e.target.value))} className={`${inputBase} transition-all duration-300 ${errors.email ? 'border-destructive ring-destructive' : 'hover:border-primary/50'}`} placeholder={t('contact.emailPlaceholder')} name="user_email" />
                  {errors.email && <span className="text-xs text-destructive-foreground mt-1 animate-in fade-in slide-in-from-top-1">{errors.email}</span>}
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold leading-none text-foreground">{t('contact.phone')} (opcional)</span>
                  <input value={phone} onChange={(e) => setPhone(sanitize(e.target.value))} className={`${inputBase} transition-all duration-300 ${errors.phone ? 'border-destructive ring-destructive' : 'hover:border-primary/50'}`} placeholder={t('contact.phonePlaceholder')} name="user_phone" />
                  {errors.phone && <span className="text-xs text-destructive-foreground mt-1 animate-in fade-in slide-in-from-top-1">{errors.phone}</span>}
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-semibold leading-none text-foreground">{t('contact.message')}</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputBase} min-h-[140px] resize-y transition-all duration-300 ${errors.message ? 'border-destructive ring-destructive' : 'hover:border-primary/50'}`} placeholder={t('contact.messagePlaceholder')} name="user_message" />
                {errors.message && <span className="text-xs text-destructive-foreground mt-1 animate-in fade-in slide-in-from-top-1">{errors.message}</span>}
              </label>
            </div>

            <div className="mt-6 md:mt-8 lg:mt-10 grid gap-4 md:gap-5">
              <button type="submit" disabled={status === 'loading'} className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-primary-foreground font-semibold shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 via-transparent to-transparent" />
                {status === 'idle' && <Send size={20} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />}
                {status === 'loading' && <Loader2 size={20} className="relative z-10 animate-spin" />}
                {status === 'success' && <CheckCircle2 size={20} className="relative z-10" />}
                {status === 'error' && <AlertCircle size={20} className="relative z-10" />}
                <span className="relative z-10 text-base">
                  {status === 'idle' && t('contact.send')}
                  {status === 'loading' && t('contact.sending')}
                  {status === 'success' && t('contact.success')}
                  {status === 'error' && t('contact.error')}
                </span>
              </button>

              <div className="grid sm:grid-cols-2 gap-3">
                <button type="button" onClick={openEmail} className="group inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-5 py-2.5 text-foreground font-medium transition-all duration-300 hover:bg-muted/50 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30">
                  <Mail size={18} className="text-primary transition-transform duration-300 group-hover:scale-110" /> 
                  <span className="text-sm">{t('contact.emailButton')}</span>
                </button>
                <button type="button" onClick={openWhatsApp} className="group inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-5 py-2.5 text-foreground font-medium transition-all duration-300 hover:bg-muted/50 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30">
                  <img src="/icons/brands/whatsapp.svg" alt="WhatsApp" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" /> 
                  <span className="text-sm">{t('contact.whatsappButton')}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Info card */}
          <div className="group mz-card mz-card-md w-full max-w-lg mx-auto">
            <div className="mz-card-accent" />
            <div className="mz-card-accent-pulse" />
            <div className="mz-card-hover-bg" />
            <div className="mz-card-hover-shine" />
            
            <Reveal delayMs={100}>
              <h3 className="text-2xl font-bold text-foreground relative z-10">{t('contact.infoTitle')}</h3>
            </Reveal>
            <div className="mt-6 md:mt-8 lg:mt-10 space-y-5 md:space-y-6 lg:space-y-7 relative z-10">
              <Reveal delayMs={150}>
                <div className="group flex items-start gap-5 transition-all duration-300 hover:translate-x-1">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Phone size={26} className="transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <div>
                    <p className="text-md text-muted-foreground">{t('contact.phone')}</p>
                    <a href="tel:+258842767435" className="font-bold text-lg text-foreground hover:text-primary transition-colors duration-300">+258 84 276 7435</a>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="group flex items-start gap-5 transition-all duration-300 hover:translate-x-1">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Mail size={26} className="transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <div>
                    <p className="text-md text-muted-foreground">{t('contact.email')}</p>
                    <a href="mailto:maurobernardozibane@gmail.com" className="font-bold text-lg text-foreground hover:text-primary transition-colors duration-300">zibanejr@gmail.com</a>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={250}>
                <div className="group flex items-start gap-5 transition-all duration-300 hover:translate-x-1">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <MapPin size={26} className="transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <div>
                    <p className="text-md text-muted-foreground">{t('contact.location')}</p>
                    <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">{t('contact.locationValue')}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={300}>
              <h4 className="mt-8 md:mt-10 lg:mt-12 text-xl md:text-2xl font-bold text-foreground text-center">{t('contact.socialMedia')}</h4>
            </Reveal>
            <div className="mt-5 md:mt-6 lg:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center">
              <Reveal delayMs={350}>
                <a href="https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/" target="_blank" rel="noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 bg-background/50 hover:bg-primary/5" aria-label="LinkedIn">
                  <Linkedin size={20} className="text-primary group-hover:scale-125 transition-transform duration-300" />
                </a>
              </Reveal>
              <Reveal delayMs={400}>
                <a href="https://github.com/maurobernardo?tab=repositories" target="_blank" rel="noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 bg-background/50 hover:bg-primary/5" aria-label="GitHub">
                  <Github size={20} className="text-primary group-hover:scale-125 transition-transform duration-300" />
                </a>
              </Reveal>
              <Reveal delayMs={450}>
                <a href="https://twitter.com/MauroZiban7" target="_blank" rel="noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 bg-background/50 hover:bg-primary/5" aria-label="Twitter">
                  <Twitter size={20} className="text-primary group-hover:scale-125 transition-transform duration-300" />
                </a>
              </Reveal>
              <Reveal delayMs={500}>
                <a href="https://www.facebook.com/mauroutall.mbz" target="_blank" rel="noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 bg-background/50 hover:bg-primary/5" aria-label="Facebook">
                  <Facebook size={20} className="text-primary group-hover:scale-125 transition-transform duration-300" />
                </a>
              </Reveal>
              <Reveal delayMs={600}>
                <a href="https://www.youtube.com/@ZibaneUpdatee026" target="_blank" rel="noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 bg-background/50 hover:bg-primary/5" aria-label="YouTube">
                  <Youtube size={20} className="text-primary group-hover:scale-125 transition-transform duration-300" />
                </a>
              </Reveal>
              <Reveal delayMs={650}>
                <a href="https://www.instagram.com/_mauro_zibane10_/" target="_blank" rel="noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 bg-background/50 hover:bg-primary/5" aria-label="Instagram">
                  <Instagram size={20} className="text-primary group-hover:scale-125 transition-transform duration-300" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <Reveal delayMs={700}>
          <div className="mt-12 rounded-xl border border-primary/20 shadow-lg overflow-hidden">
            <h4 className="text-xl font-bold text-foreground p-4 bg-card text-center">{t('contact.mapTitle')}</h4>
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


