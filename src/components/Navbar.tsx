import { useEffect, useState } from 'react';
import { Moon, Sun, Home, User2, Briefcase, Wrench, Mail, Layers3, Menu, X, Rocket } from 'lucide-react';
import cls from 'classnames';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const sections = [
    { href: '#inicio', label: t('navbar.home'), Icon: Home },
    { href: '#sobre', label: t('navbar.about'), Icon: User2 },
    { href: '#skills', label: t('navbar.skills'), Icon: Layers3 },
    { href: '#servicos', label: t('navbar.services'), Icon: Rocket },
    { href: '#projetos', label: t('navbar.projects'), Icon: Briefcase },
    { href: '#experiencia', label: t('navbar.experience'), Icon: Wrench },
    { href: '#contato', label: t('navbar.contact'), Icon: Mail },
  ] as const;

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enable = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', enable);
    setIsDark(enable);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-background/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#inicio" className="relative -m-1.5 p-1.5 text-lg font-bold transition-colors hover:text-primary">
            Mauro Zibane
          </a>
          <nav aria-label="Global" className="hidden items-center gap-6 md:flex">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all duration-300 hover:text-primary hover:-translate-y-px hover:shadow-sm hover:shadow-primary/20"
              >
                {s.Icon && <s.Icon size={16} />}
                {s.label}
              </a>
            ))}
            <button
              aria-label="Alternar tema"
              onClick={toggleTheme}
              className="rounded-full p-2 transition-all duration-300 hover:bg-muted hover:shadow-md hover:shadow-primary/20 hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              aria-label="Mudar para Inglês"
              onClick={() => i18n.changeLanguage('en')}
              className="rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-muted hover:shadow-md hover:shadow-primary/20 hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              EN
            </button>
            <button
              aria-label="Mudar para Português"
              onClick={() => i18n.changeLanguage('pt')}
              className="rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-muted hover:shadow-md hover:shadow-primary/20 hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              PT
            </button>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <button
              aria-label="Alternar tema"
              onClick={toggleTheme}
              className="rounded-full p-2 transition-all duration-300 hover:bg-muted hover:shadow-md hover:shadow-primary/20 hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              aria-label="Mudar para Inglês"
              onClick={() => i18n.changeLanguage('en')}
              className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              EN
            </button>
            <button
              aria-label="Mudar para Português"
              onClick={() => i18n.changeLanguage('pt')}
              className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              PT
            </button>
            <button
              aria-label="Abrir menu"
              onClick={() => setOpen(!open)}
              className="rounded-full p-2 transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-background/40 bg-background/90">
          <nav className="mx-auto w-full max-w-7xl px-4 py-4 grid gap-3" aria-label="Mobile">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 py-2 text-foreground transition-all duration-300 rounded-md px-3 -mx-3 hover:bg-muted hover:text-primary"
              >
                {s.Icon && <s.Icon size={16} />}
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}


