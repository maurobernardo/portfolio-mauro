import { useState } from 'react';
import { Github, ExternalLink, X, Target, Lightbulb, Plus, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SectionPattern from '../components/SectionPattern';
import { FilterKey, ProjectMeta, StatusKey, iconMap, projectsMeta } from '../lib/projects';
import { lockScroll } from '../lib/scroll';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';

const STATUS_KEYS: Record<StatusKey, string> = {
  live: 'projects.status.live',
  dev: 'projects.status.dev',
  private: 'projects.status.private',
};

const FILTER_KEYS: Record<FilterKey, string> = {
  all: 'projects.filter.all',
  web: 'projects.filter.web',
  mobile: 'projects.filter.mobile',
  fullstack: 'projects.filter.fullstack',
};

const pad = (n: number) => String(n + 1).padStart(2, '0');

export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [open, setOpen] = useState(0);
  const [caseStudyIdx, setCaseStudyIdx] = useState<number | null>(null);

  const visible = projectsMeta
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => activeFilter === 'all' || p.filter === activeFilter);
  const openIdx = visible.some(({ i }) => i === open) ? open : visible[0]?.i ?? 0;

  const navCase = (dir: 1 | -1) =>
    setCaseStudyIdx((cur) => {
      const list = projectsMeta.map((p, i) => (p.caseStudy ? i : -1)).filter((i) => i >= 0);
      const at = list.indexOf(cur ?? list[0]);
      return list[(at + dir + list.length) % list.length];
    });

  return (
    <section id="projetos" className="relative border-t border-border/70 py-[clamp(56px,8vh,96px)]">
      <SectionPattern />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <SectionHeader no="03" eyebrow={t('eyebrow.projects')} title={t('projects.title')} subtitle={t('projects.subtitle')} />

        <Reveal>
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={t('a11y.filterProjects')}>
            {(Object.keys(FILTER_KEYS) as FilterKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={activeFilter === key}
                onClick={() => setActiveFilter(key)}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-500 ${
                  activeFilter === key ? 'border-foreground bg-foreground text-background' : 'border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                }`}
              >
                {t(FILTER_KEYS[key])}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Galeria acordeão */}
        <div className="flex flex-col gap-3 lg:min-h-[min(78svh,640px)] lg:flex-row">
          {visible.map(({ p, i }) => (
            <Panel
              key={i}
              index={i}
              project={p}
              isOpen={openIdx === i}
              onOpen={() => setOpen(i)}
              onCaseStudy={() => setCaseStudyIdx(i)}
            />
          ))}
        </div>

        <Reveal delayMs={80}>
          <figure className="mx-auto mt-16 flex max-w-3xl items-start gap-4 rounded-[24px] border border-foreground/10 bg-card px-7 py-6">
            <Quote size={20} className="mt-1 flex-shrink-0 text-muted-foreground" strokeWidth={1.75} />
            <div>
              <blockquote className="font-serif text-2xl italic leading-snug">{t('projects.devQuote')}</blockquote>
              <figcaption className="mz-tag mt-3">{t('projects.devQuoteAuthor')}</figcaption>
            </div>
          </figure>
        </Reveal>
      </div>

      {caseStudyIdx !== null && (
        <CaseStudyModal project={projectsMeta[caseStudyIdx]} index={caseStudyIdx} onClose={() => setCaseStudyIdx(null)} onNav={navCase} />
      )}
    </section>
  );
}

function Panel({
  index,
  project,
  isOpen,
  onOpen,
  onCaseStudy,
}: {
  index: number;
  project: ProjectMeta;
  isOpen: boolean;
  onOpen: () => void;
  onCaseStudy: () => void;
}) {
  const { t } = useLanguage();
  const title = t(`projects.${index}.title`);

  return (
    <article
      onMouseEnter={onOpen}
      className={`relative min-h-[72px] overflow-hidden rounded-[28px] border bg-card transition-all duration-700 lg:min-h-0 lg:min-w-0 ${isOpen ? "lg:[flex:1_1_72px]" : "lg:[flex:0_0_72px]"} ${
        isOpen ? 'border-foreground/20 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]' : 'border-foreground/10'
      }`}
      style={{ transitionTimingFunction: 'var(--ease)' }}
    >
      {/* Espinha (fechado) */}
      <button
        type="button"
        onClick={onOpen}
        onFocus={onOpen}
        aria-expanded={isOpen}
        aria-label={title}
        className={`group absolute inset-0 z-10 flex items-center justify-between p-5 text-left transition-opacity duration-500 lg:flex-col lg:justify-between lg:py-6 ${
          isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <span className="font-mono text-xs text-muted-foreground">{pad(index)}</span>
        <span className="truncate text-lg font-bold tracking-tight lg:text-xl">
          <span className="hidden lg:inline-block [writing-mode:vertical-rl] [transform:rotate(180deg)]">{title}</span>
          <span className="lg:hidden">{title}</span>
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-foreground/15 transition-transform duration-500 group-hover:rotate-90">
          <Plus size={16} />
        </span>
      </button>

      {/* Painel aberto: imagem inteira em cima, texto por baixo */}
      <div className={`h-full flex-col gap-6 p-5 lg:p-7 ${isOpen ? 'flex animate-fade-in-up opacity-0' : 'hidden'}`} aria-hidden={!isOpen}>
        <div className="overflow-hidden rounded-[20px] border border-foreground/10 bg-secondary p-3">
          {project.image && (
            <img
              key={isOpen ? 'open' : 'closed'}
              src={project.image}
              alt={title}
              className="mx-auto h-auto max-h-[300px] w-auto max-w-full rounded-xl border border-foreground/10 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)]"
              style={isOpen ? { animation: 'mz-wipe 1s var(--ease) both' } : undefined}
            />
          )}
        </div>

        <div className="grid min-w-0 flex-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="min-w-0">
            <p className="mz-tag">{pad(index)} — {t(`projects.${index}.category`)}</p>
            <h3 className="mt-3 text-3xl font-bold leading-[1.02] lg:text-4xl">{title}</h3>
            <span className="mz-tag mt-3 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
              {t(STATUS_KEYS[project.status])}
            </span>
          </div>

          <div className="flex min-w-0 flex-col">
            <p className="text-sm leading-relaxed text-muted-foreground">{t(`projects.${index}.description`)}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-secondary px-3 py-1 text-[11px] font-medium">
                  {iconMap[tech] && <img src={iconMap[tech]} alt="" className="h-3 w-3 object-contain" />}
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1} className="mz-btn mz-btn-primary">
                  <ExternalLink size={15} />
                  {t('projects.demo')}
                </a>
              ) : (
                <span className="mz-btn border border-foreground/15 text-muted-foreground">
                  {project.status === 'private' ? t(STATUS_KEYS.private) : t('projects.comingSoon')}
                </span>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1} className="mz-btn mz-btn-ghost">
                  <Github size={15} />
                  {t('projects.code')}
                </a>
              )}
              {project.caseStudy && (
                <button type="button" onClick={onCaseStudy} tabIndex={isOpen ? 0 : -1} className="mz-btn mz-btn-ghost">
                  <Lightbulb size={15} />
                  {t('projects.viewCaseStudy')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes mz-wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}`}</style>
    </article>
  );
}

function CaseStudyModal({
  project,
  index,
  onClose,
  onNav,
}: {
  project: ProjectMeta;
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const { t } = useLanguage();
  const title = t(`projects.${index}.title`);
  const caseIdx = projectsMeta.map((p, i) => (p.caseStudy ? i : -1)).filter((i) => i >= 0);
  const pos = caseIdx.indexOf(index);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onNav]);

  const sections = [
    { n: '01', icon: Target, label: t('projects.challenge'), text: t(`projects.${index}.challenge`) },
    { n: '02', icon: Lightbulb, label: t('projects.approach'), text: t(`projects.${index}.approach`) },
  ];
  const circle =
    'grid h-11 w-11 place-items-center rounded-full border border-foreground/15 transition-all duration-500 hover:bg-foreground hover:text-background';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
      <div
        key={index}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative grid max-h-[92vh] w-full max-w-5xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[32px] border border-foreground/10 bg-card shadow-2xl lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:grid-rows-1"
        style={{ animation: 'mz-modal-in 0.6s var(--ease) both' }}
      >
        <div className="relative flex items-center justify-center overflow-hidden bg-secondary p-4 sm:p-6">
          {project.image && (
            <img src={project.image} alt={title} className="h-auto w-full rounded-2xl border border-foreground/10 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)]" />
          )}
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            {t(STATUS_KEYS[project.status])}
          </span>
        </div>

        <div className="flex min-h-0 flex-col">
          <div className="flex items-start justify-between gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
            <p className="mz-tag">
              {String(pos + 1).padStart(2, '0')} / {String(caseIdx.length).padStart(2, '0')} — {t(`projects.${index}.category`)}
            </p>
            <button onClick={onClose} aria-label="Fechar" className={`${circle} flex-shrink-0 hover:rotate-90`}>
              <X size={18} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-6 pt-4 sm:p-8 sm:pt-4">
            <h3 className="text-4xl font-bold leading-[0.98] sm:text-5xl">{title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{t(`projects.${index}.description`)}</p>

            <div className="mt-8 divide-y divide-foreground/10 border-y border-foreground/10">
              {sections.map(({ n, icon: Icon, label, text }) => (
                <div key={n} className="grid gap-3 py-5 sm:grid-cols-[140px_minmax(0,1fr)]">
                  <p className="mz-tag inline-flex items-center gap-2 sm:flex-col sm:items-start sm:gap-1">
                    <span className="text-foreground">{n}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon size={12} />
                      {label}
                    </span>
                  </p>
                  <p className="text-[15px] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <p className="mz-tag mt-6">Stack</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-secondary px-3 py-1.5 text-xs font-medium">
                  {iconMap[tech] && <img src={iconMap[tech]} alt="" className="h-3.5 w-3.5 object-contain" />}
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 p-4 sm:px-8">
            <div className="flex gap-2">
              <button onClick={() => onNav(-1)} aria-label="Anterior" className={circle}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => onNav(1)} aria-label="Seguinte" className={circle}>
                <ChevronRight size={18} />
              </button>
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="mz-btn mz-btn-primary">
                <ExternalLink size={15} />
                {t('projects.demo')}
              </a>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes mz-modal-in{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
