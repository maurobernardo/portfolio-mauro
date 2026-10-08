import Reveal from '../components/Reveal';
import SectionPattern from '../components/SectionPattern';
import { Facebook, Linkedin, Github, ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const social = [
  { href: 'https://www.facebook.com/mauroutall.mbz', label: 'Facebook', Icon: Facebook },
  { href: 'https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://github.com/maurobernardo?tab=repositories', label: 'GitHub', Icon: Github },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pb-20">
      <SectionPattern />

      {/* Palavra fantasma, só contorno */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none text-center text-[34vw] font-extrabold uppercase leading-none lg:text-[24vw]"
        style={{ color: 'transparent', WebkitTextStroke: '1px hsl(var(--foreground) / 0.12)', letterSpacing: '-0.05em' }}
      >
        Mauro
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:gap-8">
          <div className="flex-1 text-center lg:text-left">
            <Reveal>
              <span className="mz-tag inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/60 px-4 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                {t('hero.welcome')}
              </span>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="mt-6 text-5xl font-bold leading-[0.95] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                {t('hero.greeting')}{' '}
                <span className="font-serif font-normal italic text-muted-foreground" style={{ letterSpacing: '-0.02em' }}>
                  {t('hero.name')}
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="mx-auto mt-6 max-w-2xl text-xl font-semibold tracking-tight text-foreground lg:mx-0 lg:text-2xl">
                {t('hero.role1')}
              </p>
            </Reveal>

            <Reveal delayMs={200}>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg">
                {t('hero.description')}
              </p>
            </Reveal>

            <Reveal delayMs={260}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a href="#projetos" className="mz-btn mz-btn-primary px-7 py-3.5">
                  {t('hero.viewWork')}
                </a>
                <a href="#contato" className="mz-btn mz-btn-ghost px-7 py-3.5">
                  {t('nav.contact')}
                </a>
                <a href="/Mauro%20Zibane.pdf" download className="mz-btn mz-btn-ghost px-7 py-3.5">
                  {t('hero.downloadCV')} ↓
                </a>
              </div>
            </Reveal>

            <Reveal delayMs={320}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-5 lg:justify-start">
                <div className="flex items-center gap-3">
                  {social.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-foreground/15 text-foreground transition-all duration-500 hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
                <a href="#sobre" className="mz-tag inline-flex items-center gap-2 transition-colors hover:text-foreground">
                  <ArrowDown size={14} />
                  {t('hero.scrollDown')}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={160} className="relative flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full border border-foreground/10" />
              <div className="absolute -inset-10 rounded-full border border-dashed border-foreground/10" />
              <div className="relative overflow-hidden rounded-full border border-foreground/15 bg-card shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)]">
                <img
                  src="/profile10.png"
                  alt="Foto de perfil de Mauro Zibane"
                  className="h-72 w-72 object-cover transition-transform duration-[1200ms] hover:scale-105 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]"
                  style={{ transitionTimingFunction: 'var(--ease)' }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
