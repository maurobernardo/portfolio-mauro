import { useState } from 'react';
import { Github, Link2, ExternalLink } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

type FilterKey = 'all' | 'web' | 'mobile' | 'fullstack';
type StatusKey = 'live' | 'dev' | 'private';

type ProjectMeta = {
  stack: string[];
  link?: string;
  repo?: string;
  image?: string;
  category: string;
  filter: FilterKey;
  status: StatusKey;
  placeholder: {
    gradient: string;
    iconColor: string;
  };
};

const STATUS_LABELS: Record<StatusKey, string> = {
  live:    'Live',
  dev:     'Em dev',
  private: 'Privado',
};

const STATUS_STYLES: Record<StatusKey, string> = {
  live:    'bg-green-500/15 text-green-400 border border-green-500/30',
  dev:     'bg-violet-500/15 text-violet-400 border border-violet-500/30',
  private: 'bg-orange-500/12 text-orange-400 border border-orange-500/25',
};

const FILTER_LABELS: Record<FilterKey, string> = {
  all:       'Todos',
  web:       'Web App',
  mobile:    'Mobile',
  fullstack: 'Full Stack',
};

const projectsMeta: ProjectMeta[] = [
  {
    stack:    ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    link:     'https://agro-tech-mozambique.vercel.app/',
    image:    '/Agro.png',
    filter:   'web',
    status:   'live',
    category: 'Agritech · Nampula',
    placeholder: { gradient: 'from-[#0a3a1a] to-[#1a7a43]', iconColor: '#00D9FF' },
  },
  {
    stack:    ['Next.js', 'TypeScript', 'Framer Motion', 'next-intl', 'Tailwind CSS'],
    link:     'https://bioclean-environment.vercel.app/pt',
    image:    '/Bio.png',
    filter:   'web',
    status:   'live',
    category: 'Ambiente · Bilíngue PT/EN',
    placeholder: { gradient: 'from-[#0c2a1a] to-[#0c4724]', iconColor: '#2da05a' },
  },
  {
    stack:    ['React', 'TypeScript', 'Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    image:    '/UCM.png',
    filter:   'fullstack',
    status:   'private',
    category: 'Educação · UCM',
    placeholder: { gradient: 'from-[#0d1b2a] to-[#1a3a5c]', iconColor: '#0096ff' },
  },
  {
    stack:    ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link:     'https://deyril-marlon.vercel.app/',
    image:    '/Deyril.png',
    filter:   'web',
    status:   'live',
    category: 'Portfólio pessoal',
    placeholder: { gradient: 'from-[#1a1030] to-[#3a1a6a]', iconColor: '#a070ff' },
  },
  {
    stack:    ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    image:    '/Feg.png',
    filter:   'fullstack',
    status:   'private',
    category: 'Governo · FEG',
    placeholder: { gradient: 'from-[#1a1200] to-[#3a2800]', iconColor: '#c89600' },
  },
  {
    stack:    ['React Native', 'TypeScript', 'Expo'],
    image:    '/Fin.jpg',
    filter:   'mobile',
    status:   'dev',
    category: 'Fintech · Mobile',
    placeholder: { gradient: 'from-[#001a2a] to-[#003a5a]', iconColor: '#00b4ff' },
  },
  {
    stack:    ['React', 'TypeScript', 'Tailwind CSS'],
    repo:     'https://github.com/maurobernardo/portfolio-mauro',
    image:    '/projecto.png',
    filter:   'web',
    status:   'live',
    category: 'Portfólio · Mauro Zibane',
    placeholder: { gradient: 'from-[#001830] to-[#002a50]', iconColor: '#00D9FF' },
  },
  {
    stack:    ['React Native', 'TypeScript', 'Expo'],
    repo:     'https://github.com/maurobernardo/mobile-app',
    image:    '/Confia.png',
    filter:   'mobile',
    status:   'dev',
    category: 'Social · Mobile',
    placeholder: { gradient: 'from-[#1a0a00] to-[#3a1500]', iconColor: '#ff8c00' },
  },
];

const iconMap: Record<string, string> = {
  'React':         '/icons/react.svg',
  'React Native':  '/icons/react.svg',
  'Next.js':       '/icons/nextjs.svg',
  'TypeScript':    '/icons/typescript.svg',
  'Tailwind CSS':  '/icons/tailwindcss.svg',
  'Java':          '/icons/java.svg',
  'Spring Boot':   '/icons/spring.svg',
  'MySQL':         '/icons/mysql.svg',
  'Docker':        '/icons/docker.svg',
  'Expo':          '/icons/react.svg',
  'Laravel':       '/icons/laravel.svg',
  'PHP':           '/icons/php.svg',
  'Framer Motion': '/icons/react.svg',
  'next-intl':     '/icons/nextjs.svg',
};

const INITIAL_VISIBLE = 5;

export default function Projects() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered = projectsMeta.filter(
    (p) => activeFilter === 'all' || p.filter === activeFilter
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  return (
    <section id="projetos" className="relative py-16 lg:py-28 overflow-hidden">

      {/* ── Backgrounds ── */}
      <div
        className="absolute inset-0 z-0 dark:hidden opacity-50"
        style={{ background: 'linear-gradient(to right, rgba(239,246,255,0.6) 0%, rgba(255,255,255,1) 100%)' }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block opacity-40"
        style={{ background: 'linear-gradient(to right, rgb(15,23,42) 0%, rgb(2,6,23) 100%)' }}
      />

      {/* Orbs */}
      <div
        className="absolute -top-16 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none z-0 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.35) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-24 -left-20 w-[320px] h-[320px] rounded-full pointer-events-none z-0 opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(130,80,255,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[
          { top: '15%',    right:  '8%',  animationDelay: '1.5s', animationDuration: '8s'  },
          { top: '50%',    left:   '6%',  animationDelay: '3.5s', animationDuration: '9s'  },
          { bottom: '20%', right: '25%',  animationDelay: '5.5s', animationDuration: '7s'  },
          { top: '70%',    left:  '35%',  animationDelay: '7s',   animationDuration: '10s' },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#00D9FF] rounded-full opacity-25 animate-float"
            style={s}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#00D9FF] px-4 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
              Portfólio
            </span>
          </Reveal>

          <Reveal delayMs={60}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              {t('projects.title')}
            </h2>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="max-w-[600px] text-muted-foreground md:text-lg font-light leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </Reveal>

          {/* Filters */}
          <Reveal delayMs={160}>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {(Object.keys(FILTER_LABELS) as FilterKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setActiveFilter(key); setShowAll(false); }}
                  className={[
                    'text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200 outline-none',
                    activeFilter === key
                      ? 'bg-[#00D9FF]/10 border-[#00D9FF]/50 text-[#00D9FF]'
                      : 'bg-background border-border text-muted-foreground hover:border-[#00D9FF]/30 hover:text-foreground hover:bg-[#00D9FF]/5',
                  ].join(' ')}
                >
                  {FILTER_LABELS[key]}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p, i) => {
            const originalIdx = projectsMeta.indexOf(p);
            const title       = t(`projects.${originalIdx}.title`);
            const description = t(`projects.${originalIdx}.description`);
            const isFeatured  = originalIdx === 0;

            return (
              <Reveal
                as="article"
                key={originalIdx}
                delayMs={i * 70}
                className={isFeatured ? 'sm:col-span-2' : ''}
              >
                <div className="group relative h-full flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF]/35 hover:shadow-xl hover:shadow-[#00D9FF]/5">

                  {/* Image area */}
                  <a
                    href={p.link || p.repo || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      'block relative overflow-hidden flex-shrink-0',
                      isFeatured ? 'aspect-[16/7]' : 'aspect-[16/9]',
                    ].join(' ')}
                    aria-label={title}
                    onClick={(e) => { if (!p.link && !p.repo) e.preventDefault(); }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent z-10 transition-opacity duration-500 group-hover:from-card/50" />

                    {/* Real image */}
                    {p.image && (
                      <img
                        src={p.image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = 'none';
                          const fallback = img.parentElement?.querySelector('.pj-placeholder') as HTMLElement | null;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    )}

                    {/* Placeholder — visible when no image or image fails */}
                    <div
                      className={`pj-placeholder absolute inset-0 bg-gradient-to-br ${p.placeholder.gradient} items-center justify-center transition-transform duration-700 group-hover:scale-105`}
                      style={{ display: p.image ? 'none' : 'flex' }}
                    >
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <circle cx="24" cy="24" r="20" stroke={p.placeholder.iconColor} strokeWidth="1" strokeOpacity="0.4" />
                        <circle cx="24" cy="24" r="10" stroke={p.placeholder.iconColor} strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
                        <circle cx="24" cy="24" r="3"  fill={p.placeholder.iconColor} fillOpacity="0.5" />
                      </svg>
                    </div>

                    {/* Status badge */}
                    <span className={`absolute top-3 right-3 z-20 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full ${STATUS_STYLES[p.status]}`}>
                      {STATUS_LABELS[p.status]}
                    </span>
                  </a>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">

                    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#00D9FF] mb-1.5">
                      {p.category}
                    </p>

                    <h3 className="font-bold text-lg leading-snug text-foreground mb-2 transition-colors duration-200 group-hover:text-[#00D9FF]">
                      {title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 font-light mb-4">
                      {description}
                    </p>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-primary/8 border border-primary/15 px-2.5 py-1 rounded-full text-muted-foreground transition-all duration-200 hover:bg-primary/15 hover:border-primary/30"
                        >
                          {iconMap[tech] && (
                            <img src={iconMap[tech]} alt={tech} className="h-3 w-3 object-contain" />
                          )}
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4">
                        {p.link && p.link !== '#' ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-[#00D9FF] transition-colors duration-200 group/link"
                          >
                            <ExternalLink size={13} className="transition-transform duration-200 group-hover/link:-rotate-12" />
                            {t('projects.demo')}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/30 cursor-default">
                            <Link2 size={13} />
                            {p.status === 'private' ? 'Privado' : 'Em breve'}
                          </span>
                        )}

                        {p.repo && p.repo !== '#' && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-[#00D9FF] transition-colors duration-200 group/link"
                          >
                            <Github size={13} className="transition-transform duration-200 group-hover/link:scale-110" />
                            {t('projects.code')}
                          </a>
                        )}
                      </div>

                      <span className="text-[11px] font-bold text-border/60 tabular-nums">
                        {String(originalIdx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Show more / less */}
        {filtered.length > INITIAL_VISIBLE && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground bg-background hover:bg-muted hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-all duration-300 hover:-translate-y-px"
            >
              {showAll ? t('projects.showLess') : t('projects.showMore')}
              <svg
                width="14" height="14" viewBox="0 0 14 14"
                fill="none" stroke="currentColor" strokeWidth="1.8"
                className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              >
                <path d="M7 3v8M3 9l4 4 4-4" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}