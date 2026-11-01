import { useEffect, useState } from 'react';
import { Target, Lightbulb, Quote, Smartphone, Monitor } from 'lucide-react';
import { Github, ExternalLink, X, Plus, ChevronLeft, ChevronRight, ChevronDown, Server } from '../components/icons';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SectionPattern from '../components/SectionPattern';
import { FilterKey, ProjectMeta, StatusKey, iconMap, pk, projectsMeta } from '../lib/projects';
import { lockScroll } from '../lib/scroll';
import { useLanguage } from '../contexts/LanguageContext';

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

// Quantos "outros trabalhos" aparecem antes do "Ver mais".
const OTHERS_VISIBLE = 5;

const pad = (n: number) => String(n + 1).padStart(2, '0');
const num = (p: ProjectMeta) => projectsMeta.indexOf(p);
const host = (url?: string) => (url ? new URL(url).host.replace(/^www\./, '') : 'localhost');

const dataportal = projectsMeta[0];
const terraWeb = projectsMeta[1];
const terraApp = projectsMeta[2];

/** Troca de ecrã automática (galeria do telemóvel). */
function useCycle(length: number, ms = 2600) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (length <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms]);
  return [i, setI] as const;
}

function BrowserFrame({ src, alt, url, className = '' }: { src: string; alt: string; url?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[18px] border border-foreground/15 bg-card shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-foreground/10 px-4 py-2.5">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-2 w-2 rounded-full bg-foreground/20" />
        ))}
        <span className="mx-auto max-w-[60%] truncate rounded-full bg-secondary px-3 py-0.5 font-mono text-[10px] text-muted-foreground">{host(url)}</span>
      </div>
      <img loading="lazy" decoding="async" src={src} alt={alt} className="block h-auto w-full" />
    </div>
  );
}

/** Telemóvel desenhado em CSS com os ecrãs reais da app a trocar. */
function PhoneFrame({ screens, index, className = '', style }: { screens: string[]; index: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-[2.4rem] border-[6px] border-[#111] bg-[#111] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65)] ${className}`} style={style}>
      <div className="relative aspect-[540/1071] overflow-hidden rounded-[1.9rem] bg-black">
        {screens.map((s, i) => (
          <img loading="lazy" decoding="async"
            key={s}
            src={s}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms]"
            style={{ opacity: i === index ? 1 : 0, transform: i === index ? 'none' : 'scale(1.04)', transitionTimingFunction: 'var(--ease)' }}
          />
        ))}
        <span className="absolute left-1/2 top-2 h-4 w-[34%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

function StackChips({ stack, small = false }: { stack: string[]; small?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li
          key={tech}
          className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${small ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'}`}
          style={{ borderColor: 'color-mix(in srgb, currentColor 16%, transparent)', background: 'color-mix(in srgb, currentColor 5%, transparent)' }}
        >
          {iconMap[tech] && <img loading="lazy" decoding="async" src={iconMap[tech]} alt="" className="h-3.5 w-3.5 object-contain" />}
          {tech}
        </li>
      ))}
    </ul>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [open, setOpen] = useState<ProjectMeta | null>(null);
  const [caseStudy, setCaseStudy] = useState<ProjectMeta | null>(null);
  const [showAll, setShowAll] = useState(false);

  const match = (p: ProjectMeta) => activeFilter === 'all' || p.filter === activeFilter;
  const others = projectsMeta.filter((p) => !p.flagship && match(p));
  const shown = showAll ? others : others.slice(0, OTHERS_VISIBLE);
  const openP = open && shown.includes(open) ? open : shown[0];

  const caseList = projectsMeta.filter((p) => p.caseStudy);
  const navCase = (dir: 1 | -1) =>
    setCaseStudy((cur) => caseList[(caseList.indexOf(cur ?? caseList[0]) + dir + caseList.length) % caseList.length]);

  return (
    <section id="projetos" className="relative border-t border-border/70 py-[clamp(56px,8vh,96px)]">
      <SectionPattern />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <SectionHeader no="03" eyebrow={t('eyebrow.projects')} title={t('projects.title')} subtitle={t('projects.subtitle')} />

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={t('a11y.filterProjects')}>
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

        {/* Projetos principais */}
        {(match(dataportal) || match(terraWeb) || match(terraApp)) && (
          <div className="mb-20">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-foreground/10 pb-4">
                <p className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  <span className="relative grid h-3 w-3 place-items-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-foreground/40" />
                    <span className="h-2 w-2 rounded-full bg-foreground" />
                  </span>
                  {t('projects.flagship')}
                </p>
                <p className="max-w-md text-sm text-muted-foreground">{t('projects.flagshipNote')}</p>
              </div>
            </Reveal>
            <div className="grid gap-6">
              {match(dataportal) && <DataPortalCard onCase={setCaseStudy} />}
              {(match(terraWeb) || match(terraApp)) && <TerraCard onCase={setCaseStudy} />}
            </div>
          </div>
        )}

        {/* Outros trabalhos: acordeão, só os primeiros até "Ver mais" */}
        {others.length > 0 && (
          <>
            <Reveal>
              <p className="mz-tag mb-6">{t('projects.otherWork')} · {String(others.length).padStart(2, '0')}</p>
            </Reveal>
            <div className="flex flex-col gap-3 xl:min-h-[min(78svh,640px)] xl:flex-row">
              {shown.map((p, k) => (
                <Panel key={p.tk} project={p} enter={k - OTHERS_VISIBLE} isOpen={openP === p} onOpen={() => setOpen(p)} onCaseStudy={() => setCaseStudy(p)} />
              ))}
            </div>
            {others.length > OTHERS_VISIBLE && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  aria-expanded={showAll}
                  className="group inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-card py-2 pl-6 pr-2 font-semibold transition-all duration-500 hover:border-foreground"
                >
                  {showAll ? t('projects.less') : t('projects.more')}
                  {!showAll && <span className="font-mono text-xs text-muted-foreground">+{others.length - OTHERS_VISIBLE}</span>}
                  <span className={`grid h-9 w-9 place-items-center rounded-full bg-foreground text-background transition-transform duration-500 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>
                    <ChevronDown size={16} />
                  </span>
                </button>
              </div>
            )}
          </>
        )}

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

      {caseStudy && <CaseStudyModal project={caseStudy} onClose={() => setCaseStudy(null)} onNav={navCase} />}
      <style>{`
        @keyframes mz-more-in{from{opacity:0;transform:translateY(40px) scale(.97)}to{opacity:1;transform:none}}
        @keyframes mz-sync-dot{0%,100%{opacity:.2;transform:none}50%{opacity:1;transform:translateY(-3px)}}
        @keyframes mz-wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
      `}</style>
    </section>
  );
}

/** Cartão grande do DataPortal. */
function DataPortalCard({ onCase }: { onCase: (p: ProjectMeta) => void }) {
  const { t } = useLanguage();
  const p = dataportal;
  return (
    <Reveal>
      <article className="group relative grid overflow-hidden rounded-[32px] border border-foreground/10 bg-card lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="flex flex-col p-7 sm:p-10">
          <p className="mz-tag">{pad(num(p))} · {t(`${pk(p)}.category`)}</p>
          <h3 className="mt-4 text-4xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-5xl">
            DataPortal <span className="font-serif font-normal italic text-muted-foreground">Data4Moz</span>
          </h3>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{t(`${pk(p)}.description`)}</p>
          <div className="mt-6">
            <StackChips stack={p.stack} />
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <a href={p.link} target="_blank" rel="noreferrer" className="mz-btn mz-btn-primary">
              <ExternalLink size={15} /> {t('projects.demo')}
            </a>
            <button type="button" onClick={() => onCase(p)} className="mz-btn mz-btn-ghost">
              <Lightbulb size={15} /> {t('projects.viewCaseStudy')}
            </button>
          </div>
        </div>
        <div className="relative flex items-center overflow-hidden bg-secondary p-4 sm:p-6">
          <span className="pointer-events-none absolute -right-4 -top-6 select-none text-[clamp(120px,18vw,240px)] font-bold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1.5px_hsl(var(--foreground)/0.08)]">01</span>
          <BrowserFrame
            src={p.image!}
            alt={t(`${pk(p)}.title`)}
            url={p.link}
            className="relative w-full transition-transform duration-[1200ms] group-hover:-translate-y-1.5 group-hover:scale-[1.01]"
          />
        </div>
      </article>
    </Reveal>
  );
}

/** TERRA: projeto híbrido. Browser + telemóvel ligados por uma linha de sincronização. */
function TerraCard({ onCase }: { onCase: (p: ProjectMeta) => void }) {
  const { t } = useLanguage();
  const screens = terraApp.screens!;
  const [i, setI] = useCycle(screens.length);
  const layers = [
    { Icon: Monitor, label: t('projects.layerWeb'), stack: ['Next.js', 'Tailwind CSS', 'PostgreSQL'] },
    { Icon: Smartphone, label: t('projects.layerMobile'), stack: ['React Native', 'Tailwind CSS'] },
    { Icon: Server, label: t('projects.layerApi'), stack: ['Node.js', 'Python', 'PostGIS'] },
  ];

  return (
    <Reveal>
      <article className="relative grid overflow-hidden rounded-[32px] border border-foreground/10 bg-card lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* Visual */}
        <div className="relative flex min-h-[420px] flex-col justify-center px-5 pb-24 pt-20 sm:min-h-[520px] sm:px-10 sm:pb-28 sm:pt-24">
          <span className="pointer-events-none absolute -left-3 -top-6 select-none text-[clamp(120px,18vw,240px)] font-bold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1.5px_hsl(var(--foreground)/0.08)]">
            02
          </span>
          {/* Web e telemóvel juntos: o telemóvel sobrepõe-se ao canto do browser */}
          <div className="relative mr-[14%]">
            <BrowserFrame src={terraWeb.image!} alt={t(`${pk(terraWeb)}.title`)} url={terraWeb.link} />
            <PhoneFrame screens={screens} index={i} className="absolute -bottom-[22%] -right-[18%] w-[34%] max-w-[210px] rotate-[4deg]" />
          </div>
          <p className="absolute bottom-6 left-5 max-w-[52%] font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground sm:left-10 lg:bottom-10">
            <span className="mb-2 flex items-center gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((d) => (
                <span key={d} className="h-1 w-1 rounded-full bg-current" style={{ animation: `mz-sync-dot 1.6s ease-in-out ${d * 0.16}s infinite` }} />
              ))}
            </span>
            {t('projects.hybridSync')}
          </p>
          {/* Legenda do ecrã atual */}
          <div className="absolute right-5 top-6 hidden max-w-[220px] text-right sm:block sm:right-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">TERRA Campo · {String(i + 1).padStart(2, '0')}/08</p>
            <p key={i} className="mt-1 font-serif text-lg italic leading-snug" style={{ animation: 'mz-more-in .7s var(--ease) both' }}>
              {t(`projects.app.${i}`)}
            </p>
          </div>
        </div>

        {/* Texto */}
        <div className="flex flex-col border-t border-foreground/10 p-7 sm:p-10 lg:border-l lg:border-t-0">
          <p className="mz-tag">{pad(num(terraWeb))} + {pad(num(terraApp))} · {t('projects.hybrid')}</p>
          <h3 className="mt-4 text-5xl font-bold leading-[0.9] tracking-[-0.05em] sm:text-6xl">
            TERRA<span className="font-serif font-normal italic text-muted-foreground"> moz</span>
          </h3>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{t(`${pk(terraWeb)}.description`)}</p>

          <dl className="mt-7 divide-y divide-foreground/10 border-y border-foreground/10">
            {layers.map(({ Icon, label, stack }) => (
              <div key={label} className="grid gap-3 py-3.5 sm:grid-cols-[110px_minmax(0,1fr)] sm:items-center">
                <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <Icon size={14} /> {label}
                </dt>
                <dd>
                  <StackChips stack={stack} small />
                </dd>
              </div>
            ))}
          </dl>

          {/* Miniaturas da app */}
          <div className="mt-6 flex gap-1.5" role="tablist" aria-label="TERRA Campo">
            {screens.map((s, k) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={k === i}
                aria-label={t(`projects.app.${k}`)}
                onClick={() => setI(k)}
                className={`h-12 flex-1 overflow-hidden rounded-md transition-all duration-500 ${k === i ? 'opacity-100 ring-1 ring-foreground' : 'opacity-35 hover:opacity-80'}`}
              >
                <img loading="lazy" decoding="async" src={s} alt="" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <a href={terraWeb.link} target="_blank" rel="noreferrer" className="mz-btn mz-btn-primary">
              <ExternalLink size={15} /> terramoz.com
            </a>
            <button type="button" onClick={() => onCase(terraWeb)} className="mz-btn mz-btn-ghost">
              <Monitor size={15} /> {t('projects.caseWeb')}
            </button>
            <button type="button" onClick={() => onCase(terraApp)} className="mz-btn mz-btn-ghost">
              <Smartphone size={15} /> {t('projects.caseMobile')}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Panel({ project, enter, isOpen, onOpen, onCaseStudy }: { project: ProjectMeta; enter: number; isOpen: boolean; onOpen: () => void; onCaseStudy: () => void }) {
  const { t } = useLanguage();
  const k = pk(project);
  const title = t(`${k}.title`);
  const n = num(project);

  return (
    <article
      onMouseEnter={onOpen}
      className={`relative min-h-[64px] w-full overflow-hidden rounded-[28px] border bg-card transition-all duration-700 xl:min-h-0 xl:min-w-0 ${isOpen ? 'xl:[flex:1_1_64px]' : 'xl:[flex:0_0_64px]'} ${
        isOpen ? 'border-foreground/20 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]' : 'border-foreground/10'
      }`}
      style={{
        transitionTimingFunction: 'var(--ease)',
        // Os que entram com "Ver mais" chegam em cascata.
        animation: enter >= 0 ? `mz-more-in .8s var(--ease) ${enter * 0.08}s both` : undefined,
      }}
    >
      {/* Espinha (fechado) */}
      <button
        type="button"
        onClick={onOpen}
        onFocus={onOpen}
        aria-expanded={isOpen}
        aria-label={title}
        className={`group absolute inset-0 z-10 flex items-center justify-between p-5 text-left transition-opacity duration-500 xl:flex-col xl:justify-between xl:py-6 ${
          isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <span className="font-mono text-xs text-muted-foreground">{pad(n)}</span>
        <span className="truncate text-lg font-bold tracking-tight xl:text-xl">
          <span className="hidden xl:inline-block [writing-mode:vertical-rl] [transform:rotate(180deg)]">{title}</span>
          <span className="xl:hidden">{title}</span>
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-foreground/15 transition-transform duration-500 group-hover:rotate-90">
          <Plus size={16} />
        </span>
      </button>

      {/* Painel aberto: imagem inteira em cima, texto por baixo */}
      <div className={`h-full flex-col gap-6 p-5 xl:p-7 ${isOpen ? 'flex animate-fade-in-up opacity-0' : 'hidden'}`} aria-hidden={!isOpen}>
        {project.image && (
          <img loading="lazy" decoding="async"
            key={isOpen ? 'open' : 'closed'}
            src={project.image}
            alt={title}
            className="block h-auto w-full rounded-[18px] border border-foreground/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)]"
            style={isOpen ? { animation: 'mz-wipe 1s var(--ease) both' } : undefined}
          />
        )}

        <div className="grid min-w-0 flex-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="min-w-0">
            <p className="mz-tag">{pad(n)} · {t(`${k}.category`)}</p>
            <h3 className="mt-3 text-3xl font-bold leading-[1.02] lg:text-4xl">{title}</h3>
            <span className="mz-tag mt-3 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
              {t(STATUS_KEYS[project.status])}
            </span>
          </div>

          <div className="flex min-w-0 flex-col">
            <p className="text-sm leading-relaxed text-muted-foreground">{t(`${k}.description`)}</p>
            <div className="mt-4">
              <StackChips stack={project.stack} small />
            </div>
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
    </article>
  );
}

function CaseStudyModal({ project, onClose, onNav }: { project: ProjectMeta; onClose: () => void; onNav: (dir: 1 | -1) => void }) {
  const { t } = useLanguage();
  const k = pk(project);
  const title = t(`${k}.title`);
  const caseList = projectsMeta.filter((p) => p.caseStudy);
  const pos = caseList.indexOf(project);
  const [shot, setShot] = useCycle(project.screens?.length ?? 0, 3000);

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
    { n: '01', icon: Target, label: t('projects.challenge'), text: t(`${k}.challenge`) },
    { n: '02', icon: Lightbulb, label: t('projects.approach'), text: t(`${k}.approach`) },
  ];
  const circle = 'grid h-11 w-11 place-items-center rounded-full border border-foreground/15 transition-all duration-500 hover:bg-foreground hover:text-background';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
      <div
        key={project.tk}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-lenis-prevent
        className="relative grid max-h-[92svh] w-full max-w-5xl grid-cols-[minmax(0,1fr)] overflow-y-auto overscroll-contain rounded-[28px] border border-foreground/10 bg-card shadow-2xl sm:rounded-[32px] lg:h-[min(92svh,780px)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden"
        style={{ animation: 'mz-modal-in 0.6s var(--ease) both' }}
      >
        {/* Visual: o telemóvel cabe sempre na altura; o browser ocupa a largura */}
        <div className="relative flex min-h-[260px] flex-col items-center justify-center gap-4 overflow-hidden bg-secondary px-4 pb-14 pt-10 sm:px-8">
          <span className="pointer-events-none absolute -left-2 -top-4 select-none text-[clamp(110px,14vw,200px)] font-bold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1.5px_hsl(var(--foreground)/0.08)]">
            {pad(num(project))}
          </span>
          {project.screens ? (
            <>
              <PhoneFrame screens={project.screens} index={shot} className="relative w-[min(240px,26svh)] rotate-[-2deg]" />
              <p key={shot} className="relative max-w-[280px] text-center font-serif text-lg italic leading-snug" style={{ animation: 'mz-modal-in .6s var(--ease) both' }}>
                {t(`projects.app.${shot}`)}
              </p>
              <div className="relative flex w-full max-w-[420px] gap-1.5">
                {project.screens.map((src, j) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={t(`projects.app.${j}`)}
                    onClick={() => setShot(j)}
                    className={`h-14 flex-1 overflow-hidden rounded-md border transition-all duration-500 ${j === shot ? 'border-foreground opacity-100' : 'border-transparent opacity-40 hover:opacity-80'}`}
                  >
                    <img loading="lazy" decoding="async" src={src} alt="" className="h-full w-full object-cover object-top" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            project.image && <BrowserFrame src={project.image} alt={title} url={project.link} className="relative w-full" />
          )}
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground" />
            {t(STATUS_KEYS[project.status])}
          </span>
        </div>

        <div className="flex flex-col lg:min-h-0">
          <div className="flex items-start justify-between gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
            <p className="mz-tag">
              {String(pos + 1).padStart(2, '0')} / {String(caseList.length).padStart(2, '0')} · {t(`${k}.category`)}
            </p>
            <button onClick={onClose} aria-label="Fechar" className={`${circle} flex-shrink-0 hover:rotate-90`}>
              <X size={18} />
            </button>
          </div>

          <div className="p-6 pt-4 sm:p-8 sm:pt-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            <h3 className="text-4xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-5xl">{title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {[t(FILTER_KEYS[project.filter]), `${project.stack.length} tech`, host(project.link)].map((f) => (
                <span key={f} className="rounded-full border border-foreground/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{t(`${k}.description`)}</p>

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
            <div className="mt-3">
              <StackChips stack={project.stack} />
            </div>
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
