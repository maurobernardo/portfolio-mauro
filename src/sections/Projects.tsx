import { useState } from 'react';
import { Github, Link2, ExternalLink, X, Target, Lightbulb } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
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
  caseStudy?: boolean;
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
    stack:    ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'PostgreSQL'],
    image:    '/Data.png',
    filter:   'fullstack',
    status:   'dev',
    category: 'Dados Abertos · Moçambique',
    caseStudy: true,
    placeholder: { gradient: 'from-[#001a30] to-[#003060]', iconColor: '#FF6B4A' },
  },
  {
    stack:    ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    link:     'https://agro-tech-mozambique.vercel.app/',
    image:    '/Agro.png',
    filter:   'web',
    status:   'live',
    category: 'Agritech · Nampula',
    caseStudy: true,
    placeholder: { gradient: 'from-[#0a3a1a] to-[#1a7a43]', iconColor: '#FF6B4A' },
  },
  {
    stack:    ['Next.js', 'TypeScript', 'Framer Motion', 'next-intl', 'Tailwind CSS'],
    link:     'https://bioclean-environment.vercel.app/pt',
    image:    '/Bio.png',
    filter:   'web',
    status:   'live',
    category: 'Ambiente · Bilíngue PT/EN',
    caseStudy: true,
    placeholder: { gradient: 'from-[#0c2a1a] to-[#0c4724]', iconColor: '#2da05a' },
  },
  {
    stack:    ['React', 'TypeScript', 'Tailwind CSS'],
    image:    '/metri.png',
    filter:   'web',
    status:   'live',
    category: 'Consultoria · MEAL',
    placeholder: { gradient: 'from-[#0d1b2a] to-[#1a3050]', iconColor: '#0096ff' },
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
    category: 'Portefólio pessoal',
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
  const [caseStudyIdx, setCaseStudyIdx] = useState<number | null>(null);

  const filtered = projectsMeta.filter(
    (p) => activeFilter === 'all' || p.filter === activeFilter
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  return (
    <section id="projetos" className="relative border-t border-border/70 bg-card/60 py-16 overflow-hidden lg:py-28">

      {/* Orb de assinatura, único e discreto */}
      <div
        className="absolute -top-16 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none z-0 opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 74, 0.35) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* -- Content -- */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#FF6B4A] px-4 py-1.5 rounded-full border border-[#FF6B4A]/30 bg-[#FF6B4A]/5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] animate-pulse" />
              Portefólio
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
                      ? 'bg-[#FF6B4A]/10 border-[#FF6B4A]/50 text-[#FF6B4A]'
                      : 'bg-background border-border text-muted-foreground hover:border-[#FF6B4A]/30 hover:text-foreground hover:bg-[#FF6B4A]/5',
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
                <div className="group relative h-full flex flex-col rounded-3xl border border-border/70 bg-card shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5">

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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

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

                    {/* Placeholder - visible when no image or image fails */}
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
                    <span className={`absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-sm ${STATUS_STYLES[p.status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {STATUS_LABELS[p.status]}
                    </span>

                    {/* Categoria sobre a imagem */}
                    <p className="absolute bottom-3 left-4 z-20 text-[10px] font-semibold tracking-[0.12em] uppercase text-white/90 drop-shadow">
                      {p.category}
                    </p>
                  </a>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">

                    <h3 className="font-bold text-lg leading-snug text-foreground mb-2 transition-colors duration-200 group-hover:text-primary">
                      {title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                      {description}
                    </p>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-secondary px-2.5 py-1 rounded-full text-muted-foreground"
                        >
                          {iconMap[tech] && (
                            <img src={iconMap[tech]} alt={tech} className="h-3 w-3 object-contain" />
                          )}
                          {tech}
                        </span>
                      ))}
                    </div>

                    {p.caseStudy && (
                      <button
                        type="button"
                        onClick={() => setCaseStudyIdx(originalIdx)}
                        className="mb-5 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-primary hover:underline"
                      >
                        <Lightbulb size={13} />
                        {t('projects.viewCaseStudy')}
                      </button>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/60">
                      <div className="flex items-center gap-4">
                        {p.link && p.link !== '#' ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 group/link"
                          >
                            <ExternalLink size={13} className="transition-transform duration-200 group-hover/link:-rotate-12" />
                            {t('projects.demo')}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/40 cursor-default">
                            <Link2 size={13} />
                            {p.status === 'private' ? 'Privado' : 'Em breve'}
                          </span>
                        )}

                        {p.repo && p.repo !== '#' && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 group/link"
                          >
                            <Github size={13} className="transition-transform duration-200 group-hover/link:scale-110" />
                            {t('projects.code')}
                          </a>
                        )}
                      </div>

                      <span className="text-[11px] font-bold text-muted-foreground/40 tabular-nums">
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
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground bg-background hover:bg-muted hover:text-[#FF6B4A] hover:border-[#FF6B4A]/40 transition-all duration-300 hover:-translate-y-px"
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

      {caseStudyIdx !== null && (
        <CaseStudyModal
          project={projectsMeta[caseStudyIdx]}
          index={caseStudyIdx}
          onClose={() => setCaseStudyIdx(null)}
        />
      )}
    </section>
  );
}

function CaseStudyModal({ project, index, onClose }: { project: ProjectMeta; index: number; onClose: () => void }) {
  const { t } = useLanguage();
  const title = t(`projects.${index}.title`);
  const challenge = t(`projects.${index}.challenge`);
  const approach = t(`projects.${index}.approach`);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border/70 bg-card shadow-2xl">
        {project.image && (
          <div className="relative aspect-[16/8] w-full overflow-hidden">
            <img src={project.image} alt={title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
          </div>
        )}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 rounded-full border border-border bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:text-primary"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-primary mb-1.5">{project.category}</p>
          <h3 className="text-2xl font-bold text-foreground mb-6">{title}</h3>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Target size={16} className="text-primary" />
                {t('projects.challenge')}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{challenge}</p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Lightbulb size={16} className="text-primary" />
                {t('projects.approach')}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{approach}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="inline-flex items-center gap-1.5 text-xs font-medium bg-secondary px-2.5 py-1 rounded-full text-muted-foreground">
                  {iconMap[tech] && <img src={iconMap[tech]} alt={tech} className="h-3.5 w-3.5 object-contain" />}
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-border/60 pt-5">
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full ${STATUS_STYLES[project.status]}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {t('projects.status')}: {STATUS_LABELS[project.status]}
            </span>
            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                <ExternalLink size={15} />
                {t('projects.demo')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

