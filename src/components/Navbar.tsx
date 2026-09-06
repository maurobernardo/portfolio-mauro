import { useEffect, useState } from 'react';
import { Moon, Sun, Home, User2, Briefcase, Wrench, Code2, Mail, Menu, X, Award, Send, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CommandPalette from './CommandPalette';

const sections = [
  { href: '#inicio', labelKey: 'nav.home', Icon: Home },
  { href: '#sobre', labelKey: 'nav.about', Icon: User2 },
  { href: '#skills', labelKey: 'nav.skills', Icon: Code2 },
  { href: '#projetos', labelKey: 'nav.projects', Icon: Briefcase },
  { href: '#experiencia', labelKey: 'nav.experience', Icon: Wrench },
  { href: '#certificados', labelKey: 'nav.certificates', Icon: Award },
  { href: '#contato', labelKey: 'nav.contact', Icon: Mail },
] as const;

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const enable = saved ? saved === 'dark' : true;
    document.documentElement.classList.toggle('dark', enable);
    setIsDark(enable);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt');

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-primary/10 bg-background/90 shadow-[0_12px_40px_rgba(255,107,74,0.10)] backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <a
            href="#inicio"
            aria-label=""
            className="grid h-12 w-12 place-items-center overflow-hidden rounded-full transition-transform duration-300 hover:-translate-y-px"
          >
            <img
              src="/profile10.png"
              alt="Mauro Zibane"
              className="h-full w-full rounded-full object-cover"
            />
          </a>

          <nav aria-label="Global" className="hidden items-center gap-0.5 rounded-full border border-primary/20 bg-background/65 px-2 py-2.5 shadow-sm backdrop-blur xl:flex">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/10 hover:-translate-y-px whitespace-nowrap"
              >
                {t(s.labelKey)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <CommandPalette />
            <button
              aria-label="Mudar idioma"
              title={language === 'pt' ? 'Switch to English' : 'Mudar para Portugues'}
              onClick={toggleLanguage}
              className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/20 bg-background/65 text-primary shadow-sm transition-all duration-300 hover:bg-primary/10 hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Languages size={20} />
            </button>            <button
              aria-label="Alternar tema"
              onClick={toggleTheme}
              className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/20 bg-background/65 text-primary shadow-sm transition-all duration-300 hover:bg-primary/10 hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href="#contato"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:-translate-y-px"
            >
              <Send size={17} />
              Contactar
            </a>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button
              aria-label="Mudar idioma"
              onClick={toggleLanguage}
              className="grid h-10 w-10 place-items-center rounded-xl border border-primary/20 text-primary transition-all duration-300 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Languages size={18} />
            </button>            <button
              aria-label="Alternar tema"
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center rounded-xl border border-primary/20 text-primary transition-all duration-300 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              aria-label="Abrir menu"
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-primary/20 text-primary transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-primary/10 bg-background/95 shadow-lg backdrop-blur-xl">
          <nav className="mx-auto grid w-full max-w-7xl gap-2 px-4 py-4" aria-label="Mobile">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/10"
              >
                <s.Icon size={16} />
                {t(s.labelKey)}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              <Send size={17} />
              Contactar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

