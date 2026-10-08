import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Moon, Sun, ArrowUpRight, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { lockScroll } from '../lib/scroll';
import CommandPalette from './CommandPalette';

const sections = [
  { href: '#sobre', id: 'sobre', labelKey: 'nav.about' },
  { href: '#skills', id: 'skills', labelKey: 'nav.skills' },
  { href: '#projetos', id: 'projetos', labelKey: 'nav.projects' },
  { href: '#certificados', id: 'certificados', labelKey: 'nav.certificates' },
  { href: '#experiencia', id: 'experiencia', labelKey: 'nav.experience' },
  { href: '#momentos', id: 'momentos', labelKey: 'nav.highlights' },
  { href: '#contato', id: 'contato', labelKey: 'nav.contact' },
] as const;

const EMAIL = 'maurobernardozibane@gmail.com';

/** Texto que rola para cima ao passar o rato (duplicado por baixo). */
function Roll({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 group-hover:-translate-y-full" style={{ transitionTimingFunction: 'var(--ease)' }}>
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
        style={{ transitionTimingFunction: 'var(--ease)' }}
      >
        {children}
      </span>
    </span>
  );
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const enable = saved ? saved === 'dark' : true;
    document.documentElement.classList.toggle('dark', enable);
    setIsDark(enable);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    const hero = document.getElementById('inicio');
    if (hero) obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[active];
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, language, scrolled]);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt');
  const iconBtn =
    'grid h-10 w-10 place-items-center rounded-full text-foreground transition-all duration-500 hover:bg-foreground hover:text-background';

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px]">
        <div className="h-full origin-left bg-foreground" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        {/* Ilha flutuante: expande no topo, encolhe e ganha vidro ao descer */}
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between gap-3 rounded-full border px-2 py-2 transition-all duration-700 ${
            scrolled
              ? 'max-w-[1120px] border-foreground/10 bg-background/70 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)] backdrop-blur-[14px]'
              : 'max-w-[1320px] border-transparent bg-transparent'
          }`}
          style={{ transitionTimingFunction: 'var(--ease)' }}
        >
          <a href="#inicio" className="group flex items-center gap-3 pl-1 pr-2" aria-label="Mauro Zibane">
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-foreground/20 transition-transform duration-700 group-hover:rotate-[360deg]" style={{ transitionTimingFunction: 'var(--ease)' }}>
              <img src="/profile10.png" alt="" className="h-full w-full object-cover" />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-bold tracking-tight">Mauro Zibane</span>
              <span className={`block overflow-hidden font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-all duration-500 ${scrolled ? 'max-h-0 opacity-0' : 'max-h-4 opacity-100'}`}>
                Beira · MZ
              </span>
            </span>
          </a>

          <nav aria-label="Global" className="relative hidden items-center xl:flex">
            {pill && (
              <span
                className="absolute bottom-0 top-0 rounded-full bg-foreground transition-all duration-500"
                style={{ left: pill.left, width: pill.width, transitionTimingFunction: 'var(--ease)' }}
              />
            )}
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                ref={(el) => (linkRefs.current[s.id] = el)}
                className={`group relative z-10 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-500 ${
                  active === s.id ? 'text-background' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <Roll>{t(s.labelKey)}</Roll>
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-1 xl:flex">
            <CommandPalette />
            <button aria-label={t('a11y.language')} title={t('a11y.languageTo')} onClick={toggleLanguage} className={`${iconBtn} font-mono text-[11px] font-bold`}>
              {language.toUpperCase()}
            </button>
            <button aria-label={t('a11y.theme')} onClick={toggleTheme} className={iconBtn}>
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a href="#contato" className="group ml-1 inline-flex h-10 items-center gap-2 rounded-full bg-foreground pl-5 pr-2 text-sm font-semibold text-background transition-all duration-500 hover:pr-3">
              {t('nav.cta')}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-background text-foreground transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </a>
          </div>

          <div className="flex items-center gap-1 xl:hidden">
            <button aria-label={t('a11y.language')} onClick={toggleLanguage} className={`${iconBtn} font-mono text-[11px] font-bold`}>
              {language.toUpperCase()}
            </button>
            <button aria-label={t('a11y.theme')} onClick={toggleTheme} className={iconBtn}>
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              aria-label={open ? t('nav.close') : t('nav.menu')}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="relative ml-1 flex h-10 items-center gap-2 rounded-full bg-foreground pl-4 pr-3 text-sm font-semibold text-background"
            >
              {open ? t('nav.close') : t('nav.menu')}
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-all duration-500 ${open ? 'top-1.5 rotate-45' : ''}`} />
                <span className={`absolute left-0 top-3 h-px w-4 bg-current transition-all duration-500 ${open ? 'top-1.5 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay mobile: papel inteiro, revelado com clip-path */}
      <div
        aria-hidden={!open}
        className="fixed inset-0 z-40 bg-background xl:hidden"
        style={{
          clipPath: open ? 'circle(150% at 92% 4%)' : 'circle(0% at 92% 4%)',
          transition: 'clip-path 0.8s var(--ease)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="flex h-full flex-col justify-between px-[var(--gutter)] pb-8 pt-28">
          <nav className="flex flex-col" aria-label="Mobile">
            {sections.map((s, i) => (
              <a
                key={s.href}
                href={s.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between gap-4 border-b border-foreground/10 py-3 text-4xl font-bold sm:text-5xl"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(24px)',
                  transition: `all 0.7s var(--ease) ${open ? 150 + i * 60 : 0}ms`,
                  letterSpacing: '-0.045em',
                }}
              >
                <span className="flex items-baseline gap-4">
                  <span className="mz-tag">{String(i + 1).padStart(2, '0')}</span>
                  {t(s.labelKey)}
                </span>
                <span className={`font-serif text-2xl italic ${active === s.id ? 'text-foreground' : 'text-transparent'}`}>●</span>
              </a>
            ))}
          </nav>
          <div
            className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
            style={{ opacity: open ? 1 : 0, transition: `opacity 0.7s var(--ease) ${open ? 600 : 0}ms` }}
          >
            <a href={`mailto:${EMAIL}`} className="break-all hover:text-foreground">{EMAIL}</a>
            <a href="tel:+258842767435" className="hover:text-foreground">+258 84 276 7435</a>
          </div>
        </div>
      </div>
    </>
  );
}
