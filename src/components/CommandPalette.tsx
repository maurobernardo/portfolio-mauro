import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search, Home, User2, Wrench, Briefcase, Award, Mail, Download,
  Github, Sun, Moon, MessageCircle, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: React.ReactNode;
  action: () => void;
};

export default function CommandPalette() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const close = () => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  };

  const goTo = (hash: string) => {
    close();
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const items: Item[] = useMemo(() => [
    { id: 'inicio', label: t('nav.home'), group: t('cmdk.sections'), icon: <Home size={16} />, action: () => goTo('#inicio') },
    { id: 'sobre', label: t('nav.about'), group: t('cmdk.sections'), icon: <User2 size={16} />, action: () => goTo('#sobre') },
    { id: 'skills', label: t('nav.skills'), group: t('cmdk.sections'), icon: <Wrench size={16} />, action: () => goTo('#skills') },
    { id: 'projetos', label: t('nav.projects'), group: t('cmdk.sections'), icon: <Briefcase size={16} />, action: () => goTo('#projetos') },
    { id: 'experiencia', label: t('nav.experience'), group: t('cmdk.sections'), icon: <Wrench size={16} />, action: () => goTo('#experiencia') },
    { id: 'certificados', label: t('nav.certificates'), group: t('cmdk.sections'), icon: <Award size={16} />, action: () => goTo('#certificados') },
    { id: 'momentos', label: t('highlights.title'), group: t('cmdk.sections'), icon: <Award size={16} />, action: () => goTo('#momentos') },
    { id: 'contato', label: t('nav.contact'), group: t('cmdk.sections'), icon: <Mail size={16} />, action: () => goTo('#contato') },

    { id: 'dataportal', label: 'DataPortal-Data4Moz', group: t('cmdk.projects'), icon: <Briefcase size={16} />, action: () => goTo('#projetos') },
    { id: 'agrotech', label: 'Agro Tech Mozambique', group: t('cmdk.projects'), icon: <Briefcase size={16} />, action: () => window.open('https://agro-tech-mozambique.vercel.app/', '_blank') },
    { id: 'bioclean', label: 'BioClean Environment', group: t('cmdk.projects'), icon: <Briefcase size={16} />, action: () => window.open('https://bioclean-environment.vercel.app/pt', '_blank') },

    { id: 'cv', label: t('cmdk.actionDownloadCV'), group: t('cmdk.actions'), icon: <Download size={16} />, action: () => { close(); const a = document.createElement('a'); a.href = '/Mauro_ZibaneCV.pdf'; a.download = ''; a.click(); } },
    { id: 'whatsapp', label: t('cmdk.actionWhatsApp'), group: t('cmdk.actions'), icon: <MessageCircle size={16} />, action: () => window.open('https://wa.me/258842767435', '_blank') },
    { id: 'github', label: t('cmdk.actionGithub'), group: t('cmdk.actions'), icon: <Github size={16} />, action: () => window.open('https://github.com/maurobernardo?tab=repositories', '_blank') },
    { id: 'theme', label: t('cmdk.actionToggleTheme'), group: t('cmdk.actions'), icon: <span className="relative flex h-4 w-4 items-center justify-center"><Sun size={14} className="absolute dark:hidden" /><Moon size={14} className="absolute hidden dark:block" /></span>, action: toggleTheme },
  ], [t]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q));
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>();
    filtered.forEach((i) => {
      if (!map.has(i.group)) map.set(i.group, []);
      map.get(i.group)!.push(i);
    });
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (e.key === 'Escape' && open) {
        close();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIndex]?.action();
    }
  };

  let runningIndex = -1;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Command palette"
        className="hidden md:inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-background/65 px-3.5 h-12 text-sm text-muted-foreground shadow-sm transition-all duration-300 hover:bg-primary/10 hover:-translate-y-px"
      >
        <Search size={16} />
        <kbd className="rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[12vh] sm:p-6 sm:pt-[15vh]">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-popup-overlay-in"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl animate-popup-modal-in"
          >
            <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3.5">
              <Search size={18} className="text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('cmdk.placeholder')}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <kbd className="hidden sm:inline rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground flex-shrink-0">esc</kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {grouped.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">{t('cmdk.noResults')}</p>
              )}
              {grouped.map(([group, groupItems]) => (
                <div key={group} className="mb-2 last:mb-0">
                  <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">{group}</p>
                  {groupItems.map((item) => {
                    runningIndex += 1;
                    const isActive = runningIndex === activeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveIndex(runningIndex)}
                        onClick={() => item.action()}
                        className={[
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-100',
                          isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary',
                        ].join(' ')}
                      >
                        <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>{item.icon}</span>
                        <span className="flex-1">{item.label}</span>
                        {isActive && <ArrowRight size={14} className="text-primary" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
