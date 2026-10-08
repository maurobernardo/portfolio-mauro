import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Code2, Mic, Store, Trophy, Award, ImagePlus, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import SectionPattern from '../components/SectionPattern';
import { prefersReducedMotion } from '../lib/hooks';
import { lockScroll } from '../lib/scroll';
import { useLanguage } from '../contexts/LanguageContext';

type HighlightType = 'hackathon' | 'talk' | 'fair' | 'award' | 'certificate';
type FilterKey = 'all' | HighlightType;

const TYPE_ICONS: Record<HighlightType, React.ElementType> = {
  hackathon: Code2,
  talk: Mic,
  fair: Store,
  award: Trophy,
  certificate: Award,
};

const FILTERS: FilterKey[] = ['all', 'hackathon', 'talk', 'fair', 'award', 'certificate'];

// A ordem define os índices das chaves de tradução `highlights.N.*`.
const highlightsData: { type: HighlightType; photos: string[] }[] = [
  { type: 'hackathon', photos: ['/highlights/hackathon/1.webp', '/highlights/hackathon/2.webp', '/highlights/hackathon/3.webp', '/highlights/hackathon/4.webp', '/highlights/hackathon/5.webp'] },
  { type: 'talk', photos: ['/highlights/talk/1.webp', '/highlights/talk/2.webp'] },
  { type: 'fair', photos: ['/highlights/feira/1.webp', '/highlights/feira/2.webp', '/highlights/feira/3.webp', '/highlights/feira/4.webp'] },
  { type: 'award', photos: ['/highlights/award/1.webp', '/highlights/award/2.webp', '/highlights/award/3.webp', '/highlights/award/4.webp', '/highlights/award/5.webp'] },
  { type: 'certificate', photos: ['/highlights/certificate/1.webp', '/highlights/certificate/2.webp', '/highlights/certificate/3.webp'] },
];

const ROTATE_MS = 3000;
// Quanto scroll vertical é preciso por pixel de deslize horizontal (<1 = a galeria avança mais depressa que o scroll).
const SCROLL_RATIO = 0.5;
const pad = (n: number) => String(n).padStart(2, '0');

function useAutoRotate(length: number, active: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active || length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ROTATE_MS);
    return () => clearInterval(id);
  }, [length, active]);
  return [index, setIndex] as const;
}

function PhotoStack({ photos, index, className, fit = 'cover' }: { photos: string[]; index: number; className?: string; fit?: 'cover' | 'contain' }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (photos.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-secondary text-muted-foreground ${className ?? ''}`}>
        <ImagePlus size={22} strokeWidth={1.5} />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {photos.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ease-out ${mounted ? 'transition-all duration-700' : ''}`}
          style={{ opacity: i === index ? 1 : 0, transform: i === index ? 'scale(1)' : 'scale(1.08)' }}
        />
      ))}
    </div>
  );
}

/** Barra de progresso tipo "stories": um segmento por foto */
function StoryProgress({ count, activeIndex, cardKey }: { count: number; activeIndex: number; cardKey: string }) {
  if (count <= 1) return null;
  return (
    <div className="absolute left-3 right-3 top-3 z-10 flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/40">
          {i < activeIndex && <div className="h-full w-full bg-white" />}
          {i === activeIndex && <div key={`${cardKey}-${activeIndex}`} className="h-full animate-segment-fill bg-white" />}
        </div>
      ))}
    </div>
  );
}

/** Galeria horizontal "pinned": a página desce, a pista desliza para a esquerda. */
export default function Highlights() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [pinned, setPinned] = useState(false);
  const [travel, setTravel] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  const outerRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  const visible = highlightsData
    .map((h, i) => ({ ...h, originalIndex: i }))
    .filter((h) => filter === 'all' || h.type === filter);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setPinned(mq.matches && !prefersReducedMotion());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (!pinned) {
      setTravel(0);
      return;
    }
    const measure = () => {
      const tr = trackRef.current;
      if (tr) setTravel(Math.max(0, tr.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    // Volta a medir quando a pista muda de tamanho (imagens, fontes, filtro)
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    document.fonts?.ready.then(measure);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, [pinned, filter]);

  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const update = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;
      const span = outer.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -outer.getBoundingClientRect().top / span)) : 0;
      track.style.transform = `translate3d(${-p * travel}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const mid = window.innerWidth / 2;
      let best = 0;
      let bestD = Infinity;
      Array.from(track.children).forEach((c, i) => {
        const r = (c as HTMLElement).getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActiveCard(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pinned, travel, filter]);

  return (
    <section
      id="momentos"
      ref={outerRef}
      className="relative border-t border-border/70"
      style={pinned ? { height: `calc(100svh + ${Math.round(travel * SCROLL_RATIO)}px)` } : undefined}
    >
      <div className={pinned ? 'sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-24' : 'py-[clamp(56px,8vh,96px)]'}>
        <SectionPattern />
        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
          <SectionHeader no="06" eyebrow={t('eyebrow.highlights')} title={t('highlights.title')} subtitle={t('highlights.subtitle')} />
          <div className="-mt-6 mb-8 flex flex-wrap items-center gap-2 lg:-mt-8">
            {FILTERS.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-500 ${
                  filter === key ? 'border-foreground bg-foreground text-background' : 'border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                }`}
              >
                {key === 'all' ? t('highlights.filterAll') : t(`highlights.type.${key}`)}
              </button>
            ))}
            {pinned && (
              <div className="ml-auto hidden h-px w-40 bg-foreground/15 md:block" aria-hidden="true">
                <div ref={barRef} className="h-px origin-left bg-foreground" style={{ transform: 'scaleX(0)' }} />
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10">
          <div
            ref={trackRef}
            className={pinned ? 'flex w-max items-center gap-6 px-[var(--gutter)] py-4 will-change-transform' : 'mx-auto flex w-full max-w-[1320px] flex-col gap-5 px-[var(--gutter)] py-2'}
          >
            {visible.map((h, i) => (
              <HighlightCard
                key={h.originalIndex}
                index={h.originalIndex}
                position={i + 1}
                total={visible.length}
                data={h}
                active={pinned && activeCard === i}
                pinned={pinned}
                onOpen={() => setOpenIdx(h.originalIndex)}
              />
            ))}
          </div>
        </div>
      </div>

      {openIdx !== null && (() => {
        const list = visible.map((h) => h.originalIndex);
        const pos = Math.max(0, list.indexOf(openIdx));
        const at = (d: number) => list[(pos + d + list.length) % list.length];
        return (
          <HighlightModal
            index={openIdx}
            data={highlightsData[openIdx]}
            position={pos + 1}
            total={list.length}
            prevTitle={t(`highlights.${at(-1)}.title`)}
            nextTitle={t(`highlights.${at(1)}.title`)}
            onNav={(d) => setOpenIdx(at(d))}
            onClose={() => setOpenIdx(null)}
          />
        );
      })()}
    </section>
  );
}

/** Número que sobe até ao valor na primeira vez que o cartão aparece (easeOutQuart, 1,4 s). */
function useCountUp(target: number, ref: React.RefObject<HTMLElement>) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, ref]);
  return value;
}

function HighlightCard({
  index,
  position,
  total,
  data,
  active,
  pinned,
  onOpen,
}: {
  index: number;
  position: number;
  total: number;
  data: { type: HighlightType; photos: string[] };
  active: boolean;
  pinned: boolean;
  onOpen: () => void;
}) {
  const { t } = useLanguage();
  const [photoIndex] = useAutoRotate(data.photos.length, true);
  const ref = useRef<HTMLDivElement | null>(null);
  const Icon = TYPE_ICONS[data.type];
  const date = t(`highlights.${index}.date`);
  const years = date.match(/\d{4}/g);
  const year = useCountUp(years ? Number(years[years.length - 1]) : 0, ref);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`${t(`highlights.${index}.title`)}. ${t('highlights.viewDetails')}`}
      className={`group relative flex flex-shrink-0 cursor-pointer overflow-hidden rounded-[28px] bg-card transition-all duration-700 ${
        pinned ? 'h-[clamp(300px,46vh,400px)] w-[clamp(560px,52vw,680px)] flex-row' : 'w-full flex-col'
      } ${
        active
          ? '-translate-y-3 shadow-[0_44px_90px_-34px_rgba(0,0,0,0.55)] ring-1 ring-foreground/15'
          : 'shadow-[0_14px_36px_-26px_rgba(0,0,0,0.4)] ring-1 ring-foreground/5'
      }`}
      style={{ transitionTimingFunction: 'var(--ease)' }}
    >
      {/* Fotografia em moldura */}
      <div className={`relative flex-shrink-0 overflow-hidden ${pinned ? 'm-3 w-[42%] rounded-[20px]' : 'm-3 aspect-[4/3] rounded-[20px]'}`}>
        <PhotoStack photos={data.photos} index={photoIndex} className="h-full w-full transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
        <StoryProgress count={data.photos.length} activeIndex={photoIndex} cardKey={`card-${index}`} />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur-sm transition-colors duration-500 group-hover:bg-foreground group-hover:text-background">
          <Maximize2 size={11} />
          {t('highlights.viewDetails')}
        </span>
      </div>

      {/* Informação: etiqueta no topo, título em baixo e o ano em número gigante */}
      <div className="relative flex min-w-0 flex-1 flex-col justify-between p-5 pt-3 sm:p-6 sm:pt-4">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-[72px] w-[72px] flex-shrink-0 place-items-center rounded-[22px] bg-secondary text-foreground">
            <Icon size={28} strokeWidth={1.6} />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {pad(position)} / {pad(total)}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="mz-tag">{t(`highlights.type.${data.type}`)}</p>
            <h3 className="mt-1.5 text-lg font-bold leading-tight sm:text-xl">{t(`highlights.${index}.title`)}</h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{date}</p>
          </div>
          {years && (
            <span
              aria-label={years[years.length - 1]}
              className="select-none font-bold leading-[0.8] tracking-[-0.06em] tabular-nums text-foreground/90 text-5xl sm:text-6xl"
            >
              {year || ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function HighlightModal({
  index,
  data,
  position,
  total,
  nextTitle,
  prevTitle,
  onNav,
  onClose,
}: {
  index: number;
  data: { type: HighlightType; photos: string[] };
  position: number;
  total: number;
  nextTitle: string;
  prevTitle: string;
  onNav: (dir: 1 | -1) => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [manual, setManual] = useState(false);
  const [photoIndex, setPhotoIndex] = useAutoRotate(data.photos.length, !manual);
  const yearRef = useRef<HTMLDivElement | null>(null);
  const Icon = TYPE_ICONS[data.type];
  const date = t(`highlights.${index}.date`);
  const years = date.match(/\d{4}/g);
  const year = useCountUp(years ? Number(years[years.length - 1]) : 0, yearRef);
  const count = data.photos.length;

  const go = (d: number) => {
    setManual(true);
    setPhotoIndex((i) => (i + d + count) % count);
  };

  useEffect(() => {
    setManual(false);
    setPhotoIndex(0);
  }, [index, setPhotoIndex]);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowUp') onNav(-1);
      if (e.key === 'ArrowDown') onNav(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, onNav, onClose]);

  const round =
    'grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-foreground/15 bg-card transition-all duration-500 hover:bg-foreground hover:text-background';
  const facts = [
    [t('highlights.factType'), t(`highlights.type.${data.type}`)],
    [t('highlights.factDate'), date],
    [t('highlights.factPhotos'), String(count).padStart(2, '0')],
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" onClick={onClose} />
      <div
        key={index}
        role="dialog"
        aria-modal="true"
        aria-label={t(`highlights.${index}.title`)}
        className="relative grid max-h-[92vh] w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[32px] border border-foreground/10 bg-card shadow-2xl lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:grid-rows-1"
        style={{ animation: 'mz-modal-in 0.6s var(--ease) both' }}
      >
        {/* Galeria */}
        <div className="flex min-h-0 flex-col gap-3 bg-secondary p-3">
          <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-[22px] bg-background/60 sm:min-h-[320px]">
            <div className="absolute inset-0">
              <PhotoStack photos={data.photos} index={photoIndex} fit="contain" className="h-full w-full" />
            </div>
            <StoryProgress count={count} activeIndex={photoIndex} cardKey={`modal-${index}`} />
            <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
              {String(photoIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            {count > 1 && (
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button onClick={() => go(-1)} aria-label="Previous photo" className={round}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => go(1)} aria-label="Next photo" className={round}>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {count > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {data.photos.map((src, i) => (
                <button
                  key={src}
                  onClick={() => {
                    setManual(true);
                    setPhotoIndex(i);
                  }}
                  aria-label={`Foto ${i + 1}`}
                  aria-current={i === photoIndex}
                  className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-500 ${
                    i === photoIndex ? 'ring-2 ring-foreground ring-offset-2 ring-offset-secondary' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Texto */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
            <p className="mz-tag inline-flex items-center gap-2">
              <Icon size={13} />
              {t(`highlights.type.${data.type}`)}
            </p>
            <button onClick={onClose} aria-label="Fechar" className={`${round} hover:rotate-90`}>
              <X size={18} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-6 pt-4 sm:p-8 sm:pt-4">
            <div ref={yearRef} className="select-none text-7xl font-bold leading-[0.8] tracking-[-0.06em] tabular-nums text-foreground/90 sm:text-8xl" aria-hidden="true">
              {years ? year || '' : ''}
            </div>
            <h3 className="mt-6 text-3xl font-bold leading-[1.02] sm:text-4xl">{t(`highlights.${index}.title`)}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{t(`highlights.${index}.description`)}</p>

            <dl className="mt-7 divide-y divide-foreground/10 border-y border-foreground/10">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="mz-tag">{k}</dt>
                  <dd className="text-right text-sm font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Navegação entre momentos */}
          <div className="flex items-center justify-between gap-3 border-t border-foreground/10 p-4 sm:px-8">
            <button onClick={() => onNav(-1)} aria-label={prevTitle} title={prevTitle} className={round}>
              <ChevronLeft size={18} />
            </button>
            <p className="mz-tag text-center">
              {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <button onClick={() => onNav(1)} aria-label={nextTitle} title={nextTitle} className={round}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes mz-modal-in{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
