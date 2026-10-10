import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SectionPattern from '../components/SectionPattern';
import emailjs from '@emailjs/browser';
import { Send, Loader2, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Linkedin, Github, Facebook, Instagram, Crosshair, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

/** Campo editorial: etiqueta mono numerada + linha inferior que se desenha ao focar. */
function Field({ n, label, error, children }: { n: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mz-tag">{n} — {label}</span>
      <span className="relative mt-1 block">
        {children}
        <span className="absolute bottom-0 left-0 h-px w-full bg-foreground/15" />
        <span
          className={"absolute bottom-0 left-0 h-px w-full origin-left bg-foreground transition-transform duration-700 " + (error ? "scale-x-100" : "scale-x-0 peer-focus:scale-x-100")}
          style={{ transitionTimingFunction: "var(--ease)" }}
        />
      </span>
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

/** Hora local na Beira (CAT, UTC+2), a avançar em tempo real. */
function LocalTime({ label }: { label: string }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-GB", { timeZone: "Africa/Maputo", hour12: false });
  return (
    <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[28px] bg-foreground p-6 text-background md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">{label}</p>
      <p className="mt-6 font-mono text-5xl font-medium tabular-nums tracking-tight sm:text-6xl" aria-label={time}>{time}</p>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">Beira · Moçambique · UTC+2</p>
    </div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState('');
  const filled = [firstName, lastName, email, message].filter((v) => v.trim()).length;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('maurobernardozibane@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:maurobernardozibane@gmail.com';
    }
  };

  const serviceId = 'service_v9hnd3o'; 
  const templateId = 'template_0pmbmx9'; 
  const publicKey = 'WYBtiSordr0Zt8IqY'; 

  // Sem trim aqui: corria a cada tecla e apagava os espaços (ex.: "Mauro Bernardo"). O trim é feito no envio.
  const sanitize = (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const validate = () => {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = t('contact.nameError');
    if (!lastName.trim()) next.lastName = t('contact.lastNameError');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!email.trim() || !emailOk) next.email = t('contact.emailError');
    if (phone.trim() && !/^\+?[0-9\-()\s.]{6,}$/.test(phone.trim())) next.phone = t('contact.phoneError');
    if (!message.trim()) next.message = t('contact.messageError');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    const templateParams = {
      user_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
      user_email: email.trim(),
      user_subject: topic ? `${topic} · Nova mensagem do portefólio` : 'Nova mensagem do portefólio', // Assunto padrão, pode ser um campo do form se desejar
      user_message: phone.trim() ? `${message.trim()}

${t('contact.phone')}: ${phone.trim()}` : message.trim(),
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1800);
      setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setMessage(''); setTopic('');
    } catch (error) {
      console.error('EmailJS failed to send message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1800);
    }
  };

  const openEmail = () => {
    const subject = 'Contacto através do Portefólio';
    const bodyLines = [
      'Olá Mauro, venho através do seu Portefólio,',
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
      'Olá Mauro, venho através do seu Portefólio,',
      firstName || lastName ? `Meu nome é ${firstName} ${lastName}`.trim() : '',
      phone ? `Meu telefone: ${phone}` : '',
      '',
      message,
    ].filter(Boolean).join('\n');
    const url = `https://wa.me/${phoneDest}?text=${encodeURIComponent(textLines)}`;
    window.open(url, '_blank');
  };

  const inputBase =
    'flex w-full rounded-2xl border border-foreground/15 bg-background px-4 py-3 text-sm transition-all duration-500 placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50';

  const inputError = 'border-destructive/70 ring-2 ring-destructive/20';
  const inputNormal = 'hover:border-foreground/40';

  const contactCard =
    'relative w-full overflow-hidden rounded-[28px] border border-foreground/10 bg-card';

  const fieldInput = 'peer w-full border-0 bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground/40';

  return (
    <section id="contato" className="relative border-t border-border/70 py-[clamp(56px,8vh,96px)]">
      <SectionPattern />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <SectionHeader no="07" eyebrow={t('eyebrow.contact')} title={t('contact.title')} subtitle={t('contact.subtitle')} />

        {/* Chamada grande */}
        <div className="relative mb-20 lg:mb-28">
          <h3 className="mz-hop text-5xl font-bold leading-[0.95] sm:text-7xl lg:text-[7.5rem]" aria-label={`${t('contact.huge1')} ${t('contact.huge2')}`}>
            {[t('contact.huge1'), t('contact.huge2')].map((line, li) => (
              <span key={li} aria-hidden="true" className="block">
                {Array.from(line).map((ch, ci) => (
                  <span key={ci} className={li === 1 ? 'font-serif font-normal italic text-muted-foreground' : ''}>
                    {ch === ' ' ? ' ' : ch}
                  </span>
                ))}
              </span>
            ))}
          </h3>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="mailto:maurobernardozibane@gmail.com" className="break-all text-2xl font-semibold underline decoration-foreground/30 underline-offset-8 transition-colors hover:decoration-foreground sm:text-4xl">
              maurobernardozibane@gmail.com
            </a>
            <button type="button" onClick={copyEmail} className="mz-btn mz-btn-ghost px-4 py-2 text-xs">
              <span aria-live="polite">{copied ? `${t('contact.copied')} ✓` : t('contact.copy')}</span>
            </button>
          </div>
          <a href="tel:+258842767435" className="mt-4 inline-block text-lg font-medium text-muted-foreground transition-colors hover:text-foreground">
            +258 84 276 7435
          </a>

          <svg viewBox="0 0 120 120" className="absolute bottom-0 right-0 hidden h-32 w-32 animate-spin-slow text-foreground lg:block" aria-hidden="true">
            <defs>
              <path id="mz-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text className="fill-current font-mono text-[10px] uppercase tracking-[0.25em]">
              <textPath href="#mz-circle">{t('contact.sayHello')}</textPath>
            </text>
            <circle cx="60" cy="60" r="4" className="fill-current" />
          </svg>
        </div>

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-stretch">
          {/* Form card */}
          <form onSubmit={handleSubmit} noValidate className={`${contactCard} flex flex-col p-6 md:p-10`}>
            <div className="flex items-center justify-between gap-4">
              <p className="mz-tag">{t('contact.formTag')}</p>
              <p className="mz-tag tabular-nums" aria-live="polite">{filled}/4</p>
            </div>
            <div className="mt-3 h-px bg-foreground/10" aria-hidden="true">
              <div className="h-px origin-left bg-foreground transition-transform duration-700" style={{ transform: `scaleX(${filled / 4})`, transitionTimingFunction: 'var(--ease)' }} />
            </div>

            <fieldset className="mt-8">
              <legend className="mz-tag mb-3">01 — {t('contact.topicTitle')}</legend>
              <div className="flex flex-wrap gap-2">
                {(['project', 'collab', 'opportunity', 'other'] as const).map((k) => {
                  const label = t(`contact.topic.${k}`);
                  const on = topic === label;
                  return (
                    <button
                      key={k}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTopic(on ? '' : label)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-500 ${
                        on ? 'border-foreground bg-foreground text-background' : 'border-foreground/15 text-muted-foreground hover:border-foreground hover:text-foreground'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field n="02" label={t('contact.firstName')} error={errors.firstName}>
                <input value={firstName} onChange={(e) => setFirstName(sanitize(e.target.value))} className={fieldInput} placeholder={t('contact.firstName')} name="user_name_first" autoComplete="given-name" />
              </Field>
              <Field n="03" label={t('contact.lastName')} error={errors.lastName}>
                <input value={lastName} onChange={(e) => setLastName(sanitize(e.target.value))} className={fieldInput} placeholder={t('contact.lastName')} name="user_name_last" autoComplete="family-name" />
              </Field>
              <Field n="04" label={t('contact.email')} error={errors.email}>
                <input type="email" value={email} onChange={(e) => setEmail(sanitize(e.target.value))} className={fieldInput} placeholder={t('contact.emailPlaceholder')} name="user_email" autoComplete="email" />
              </Field>
              <Field n="05" label={`${t('contact.phone')} ${t('contact.optional')}`} error={errors.phone}>
                <input value={phone} onChange={(e) => setPhone(sanitize(e.target.value))} className={fieldInput} placeholder={t('contact.phonePlaceholder')} name="user_phone" autoComplete="tel" />
              </Field>
              <div className="sm:col-span-2">
                <Field n="06" label={t('contact.message')} error={errors.message}>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className={`${fieldInput} resize-none leading-relaxed`} placeholder={t('contact.messagePlaceholder')} name="user_message" />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="group mt-10 flex w-full items-center justify-between rounded-full bg-foreground py-2 pl-8 pr-2 text-background transition-all duration-500 hover:pl-10 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ transitionTimingFunction: 'var(--ease)' }}
            >
              <span className="text-lg font-semibold tracking-tight">
                {status === 'idle' && t('contact.send')}
                {status === 'loading' && t('contact.sending')}
                {status === 'success' && `${t('contact.success')} ✓`}
                {status === 'error' && t('contact.error')}
              </span>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-background text-foreground transition-transform duration-500 group-hover:rotate-45">
                {status === 'idle' && <ArrowUpRight size={22} />}
                {status === 'loading' && <Loader2 size={22} className="animate-spin" />}
                {status === 'success' && <CheckCircle2 size={22} />}
                {status === 'error' && <AlertCircle size={22} />}
              </span>
            </button>

            <div className="mt-6 flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1 bg-foreground/10" />
              <span className="mz-tag">{t('contact.or')}</span>
              <span className="h-px flex-1 bg-foreground/10" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={openEmail} className="mz-btn mz-btn-ghost">
                <Mail size={18} />
                {t('contact.emailButton')}
              </button>
              <button type="button" onClick={openWhatsApp} className="mz-btn mz-btn-ghost">
                <FaWhatsapp size={18} className="text-[#25D366]" />
                {t('contact.whatsappButton')}
              </button>
            </div>
          </form>

                    <div className="flex flex-col gap-6">
          {/* Info card */}
          <div className={`${contactCard} p-6 md:p-8 lg:p-10`}>
            <Reveal delayMs={100}>
              <h3 className="text-3xl font-bold text-foreground relative z-10">{t('contact.infoTitle')}</h3>
            </Reveal>
            <div className="mt-8 space-y-5 relative z-10">
              <Reveal delayMs={150}>
                <div className="group flex items-start gap-4 border-b border-foreground/10 pb-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 text-foreground flex-shrink-0 transition-all duration-500 group-hover:bg-foreground group-hover:text-background">
                    <Phone size={22} />
                  </span>
                  <div>
                    <p className="mz-tag">{t('contact.phone')}</p>
                    <a href="tel:+258842767435" className="font-bold text-lg text-foreground hover:text-primary transition-colors duration-300">+258 84 276 7435</a>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="group flex items-start gap-4 border-b border-foreground/10 pb-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 text-foreground flex-shrink-0 transition-all duration-500 group-hover:bg-foreground group-hover:text-background">
                    <Mail size={22} />
                  </span>
                  <div>
                    <p className="mz-tag">{t('contact.email')}</p>
                    <a href="mailto:maurobernardozibane@gmail.com" className="break-all font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors duration-300">maurobernardozibane@gmail.com</a>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={300}>
              <h4 className="mz-tag mt-10">{t('contact.socialMedia')}</h4>
            </Reveal>
            <div className="mt-4 flex flex-wrap gap-3">
              <Reveal delayMs={350}>
                <a href="https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/" target="_blank" rel="noreferrer" className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 transition-all duration-500 hover:-translate-y-0.5 hover:bg-foreground hover:text-background" aria-label="LinkedIn">
                  <Linkedin size={20}  />
                </a>
              </Reveal>
              <Reveal delayMs={400}>
                <a href="https://github.com/maurobernardo?tab=repositories" target="_blank" rel="noreferrer" className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 transition-all duration-500 hover:-translate-y-0.5 hover:bg-foreground hover:text-background" aria-label="GitHub">
                  <Github size={20}  />
                </a>
              </Reveal>
              <Reveal delayMs={450}>
                <a href="https://www.facebook.com/mauroutall.mbz" target="_blank" rel="noreferrer" className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 transition-all duration-500 hover:-translate-y-0.5 hover:bg-foreground hover:text-background" aria-label="Facebook">
                  <Facebook size={20}  />
                </a>
              </Reveal>
              <Reveal delayMs={500}>
                <a href="https://www.instagram.com/_mauro_zibane10_/" target="_blank" rel="noreferrer" className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 transition-all duration-500 hover:-translate-y-0.5 hover:bg-foreground hover:text-background" aria-label="Instagram">
                  <Instagram size={20}  />
                </a>
              </Reveal>
            </div>
          </div>
            <LocalTime label={t("contact.localTime")} />
            <a href="/Mauro%20Zibane.pdf" download className="group flex items-center justify-between gap-4 rounded-[28px] border border-foreground/10 bg-card p-6 transition-all duration-500 hover:border-foreground">
              <span>
                <span className="mz-tag block">{t("contact.cvTag")}</span>
                <span className="mt-1 block text-xl font-bold">{t("hero.downloadCV")}</span>
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={20} />
              </span>
            </a>
          </div>
        </div>

        {/* Localização: bloco próprio, fora do cartão de contactos */}
        <Reveal delayMs={100}>
          <div className="mt-6 grid overflow-hidden rounded-[28px] border border-foreground/10 bg-card lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <div className="flex flex-col justify-between gap-8 p-7 lg:p-10">
              <div>
                <p className="mz-tag inline-flex items-center gap-2">
                  <Crosshair size={14} />
                  {t('contact.location')}
                </p>
                <h3 className="mt-4 text-3xl font-bold leading-tight lg:text-4xl">{t('contact.locationValue')}</h3>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1.5 font-mono text-xs">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground" />
                  -19.8428, 34.8480
                </span>
              </div>
              <a
                href="https://www.google.com/maps/place/Pintauto+Beira/@-19.8428372,34.8479847,49m/data=!3m1!1e3!4m6!3m5!1s0x1f2a6b004c52f7a1:0xb2595ee1421727ec!8m2!3d-19.8428136!4d34.8480491!16s%2Fg%2F11xs9tpbvf?entry=ttu"
                target="_blank"
                rel="noreferrer"
                className="mz-btn mz-btn-primary self-start"
              >
                <MapPin size={15} />
                {t('contact.openMap')}
              </a>
            </div>
            <div className="relative min-h-[300px] border-t border-foreground/10 lg:border-l lg:border-t-0">
              <iframe
                title="Localização do Mauro Zibane"
                src="https://maps.google.com/maps?q=-19.8428136,34.8480491&hl=pt&z=16&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                style={{ filter: 'grayscale(1) contrast(1.05)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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




