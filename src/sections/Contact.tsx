import { useState } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import emailjs from '@emailjs/browser'; 
import { Send, Loader2, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Linkedin, Github, Facebook, Instagram } from 'lucide-react';
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

  const inputBase =
    'flex w-full rounded-2xl border border-primary/15 bg-background/70 dark:bg-card/60 px-4 py-3 text-sm shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background disabled:cursor-not-allowed disabled:opacity-50';

  const inputError = 'border-destructive/70 ring-2 ring-destructive/20';
  const inputNormal = 'hover:border-primary/30 hover:bg-background/90';

  const contactCard =
    'group relative w-full overflow-hidden rounded-3xl border border-primary/20 bg-card/80 shadow-xl shadow-primary/10 backdrop-blur-md transition-all duration-500 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/15';

  const fieldLabel = 'text-sm font-medium text-muted-foreground';

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
      
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">        <SectionHeader eyebrow="Contacto" title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] justify-items-center lg:justify-items-stretch">
          {/* Form card */}
          <form onSubmit={handleSubmit} className={`${contactCard} max-w-xl mx-auto p-6 md:p-8 lg:p-10`}>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-80 shadow-[0_0_12px_rgba(0,217,255,0.45)]" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="grid gap-5 md:gap-6 relative z-10">
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                <label className="grid gap-2.5">
                  <span className={fieldLabel}>{t('contact.firstName')}</span>
                  <input value={firstName} onChange={(e) => setFirstName(sanitize(e.target.value))} className={`${inputBase} h-12 ${errors.firstName ? inputError : inputNormal}`} placeholder={t('contact.firstName')} name="user_name_first" />
                  {errors.firstName && <span className="text-xs text-destructive mt-1">{errors.firstName}</span>}
                </label>
                <label className="grid gap-2.5">
                  <span className={fieldLabel}>{t('contact.lastName')}</span>
                  <input value={lastName} onChange={(e) => setLastName(sanitize(e.target.value))} className={`${inputBase} h-12 ${errors.lastName ? inputError : inputNormal}`} placeholder={t('contact.lastName')} name="user_name_last" />
                  {errors.lastName && <span className="text-xs text-destructive mt-1">{errors.lastName}</span>}
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                <label className="grid gap-2.5">
                  <span className={fieldLabel}>{t('contact.email')}</span>
                  <input type="email" value={email} onChange={(e) => setEmail(sanitize(e.target.value))} className={`${inputBase} h-12 ${errors.email ? inputError : inputNormal}`} placeholder={t('contact.emailPlaceholder')} name="user_email" />
                  {errors.email && <span className="text-xs text-destructive mt-1">{errors.email}</span>}
                </label>
                <label className="grid gap-2.5">
                  <span className={fieldLabel}>{t('contact.phone')} (opcional)</span>
                  <input value={phone} onChange={(e) => setPhone(sanitize(e.target.value))} className={`${inputBase} h-12 ${errors.phone ? inputError : inputNormal}`} placeholder={t('contact.phonePlaceholder')} name="user_phone" />
                  {errors.phone && <span className="text-xs text-destructive mt-1">{errors.phone}</span>}
                </label>
              </div>
              <label className="grid gap-2.5">
                <span className={fieldLabel}>{t('contact.message')}</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputBase} min-h-[150px] resize-y py-4 ${errors.message ? inputError : inputNormal}`} placeholder={t('contact.messagePlaceholder')} name="user_message" />
                {errors.message && <span className="text-xs text-destructive mt-1">{errors.message}</span>}
              </label>
            </div>

            <div className="mt-8 grid gap-4 relative z-10">
              <button type="submit" disabled={status === 'loading'} className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/85 px-6 py-3.5 text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden">
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
                <button type="button" onClick={openEmail} className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/15 bg-background/70 px-5 py-3 text-foreground font-medium transition-all duration-300 hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30">
                  <Mail size={18} className="text-primary transition-transform duration-300 group-hover:scale-110" /> 
                  <span className="text-sm">{t('contact.emailButton')}</span>
                </button>
                <button type="button" onClick={openWhatsApp} className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/15 bg-background/70 px-5 py-3 text-foreground font-medium transition-all duration-300 hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30">
                  <img src="/icons/brands/whatsapp.svg" alt="WhatsApp" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" /> 
                  <span className="text-sm">{t('contact.whatsappButton')}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Info card */}
          <div className={`${contactCard} max-w-lg mx-auto p-6 md:p-8 lg:p-10`}>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-80 shadow-[0_0_12px_rgba(0,217,255,0.45)]" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <Reveal delayMs={100}>
              <h3 className="text-2xl font-bold text-foreground relative z-10">{t('contact.infoTitle')}</h3>
            </Reveal>
            <div className="mt-8 space-y-6 relative z-10">
              <Reveal delayMs={150}>
                <div className="group flex items-start gap-4 rounded-2xl border border-primary/10 bg-background/50 p-4 transition-all duration-300 hover:border-primary/25 hover:bg-background/80">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                    <Phone size={22} />
                  </span>
                  <div>
                    <p className="text-md text-muted-foreground">{t('contact.phone')}</p>
                    <a href="tel:+258842767435" className="font-bold text-lg text-foreground hover:text-primary transition-colors duration-300">+258 84 276 7435</a>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="group flex items-start gap-4 rounded-2xl border border-primary/10 bg-background/50 p-4 transition-all duration-300 hover:border-primary/25 hover:bg-background/80">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                    <Mail size={22} />
                  </span>
                  <div>
                    <p className="text-md text-muted-foreground">{t('contact.email')}</p>
                    <a href="mailto:maurobernardozibane@gmail.com" className="font-bold text-lg text-foreground hover:text-primary transition-colors duration-300">zibanejr@gmail.com</a>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={250}>
                <div className="group flex items-start gap-4 rounded-2xl border border-primary/10 bg-background/50 p-4 transition-all duration-300 hover:border-primary/25 hover:bg-background/80">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                    <MapPin size={22} />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('contact.location')}</p>
                    <a
                      href="https://www.google.com/maps/place/5R4X%2BV84,+Correia+De+Brito+Rua,+Beira/@-19.8427155,34.8480764,51m/data=!3m1!1e3!4m9!1m2!7m1!2e1!3m5!1s0x1f2a6a96f940e04b:0x7d7c9b4fad390f4e!8m2!3d-19.8428372!4d34.8481456!16s%2Fg%2F11lmpmrl1v?entry=ttu"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-base text-foreground hover:text-primary transition-colors duration-300"
                    >
                      {t('contact.locationValue')}
                    </a>
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
                <a href="https://www.facebook.com/mauroutall.mbz" target="_blank" rel="noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 bg-background/50 hover:bg-primary/5" aria-label="Facebook">
                  <Facebook size={20} className="text-primary group-hover:scale-125 transition-transform duration-300" />
                </a>
              </Reveal>
              <Reveal delayMs={500}>
                <a href="https://www.instagram.com/_mauro_zibane10_/" target="_blank" rel="noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 bg-background/50 hover:bg-primary/5" aria-label="Instagram">
                  <Instagram size={20} className="text-primary group-hover:scale-125 transition-transform duration-300" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <Reveal delayMs={700}>
          <div className="mt-12 rounded-3xl border border-primary/20 bg-card/80 shadow-xl shadow-primary/10 overflow-hidden backdrop-blur-md">
            <h4 className="text-xl font-bold text-primary p-5 bg-card/90 text-center tracking-wide">
              {t('contact.mapTitle')}
            </h4>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                title="Localização do Mauro Zibane"
                src="https://maps.google.com/maps?q=-19.8428372,34.8481456&hl=pt&z=18&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Marcador personalizado com pin vermelho e nome */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="flex flex-col items-center -translate-y-6 sm:-translate-y-8">
                  <div className="relative flex flex-col items-center">
                    <svg
                      width="42"
                      height="54"
                      viewBox="0 0 42 54"
                      fill="none"
                      aria-hidden="true"
                      className="drop-shadow-lg"
                    >
                      <path
                        d="M21 0C11.06 0 3 8.06 3 18c0 13.5 18 36 18 36s18-22.5 18-36C39 8.06 30.94 0 21 0z"
                        fill="#EA4335"
                      />
                      <circle cx="21" cy="18" r="7" fill="white" />
                    </svg>
                    <span className="mt-1 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-primary shadow-md border border-primary/20 whitespace-nowrap">
                      Mauro Zibane
                    </span>
                  </div>
                </div>
              </div>
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




