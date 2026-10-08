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
  { type: 'hackathon', photos: ['/highlights/hackathon/1.jpg', '/highlights/hackathon/2.jpg', '/highlights/hackathon/3.jpg', '/highlights/hackathon/4.jpg', '/highlights/hackathon/5.jpg'] },
  { type: 'talk', photos: ['/highlights/talk/1.jpg', '/highlights/talk/2.jpg'] },
  { type: 'fair', photos: ['/highlights/feira/1.jpg', '/highlights/feira/2.jpg', '/highlights/feira/3.jpg', '/highlights/feira/4.jpg'] },
  { type: 'award', photos: ['/highlights/award/1.jpg', '/highlights/award/2.jpg', '/highlights/award/3.jpg', '/highlights/award/4.jpg', '/highlights/award/5.jpg'] },
  { type: 'certificate', photos: ['/highlights/certificate/1.jpg', '/highlights/certificate/2.jpg', '/highlights/certificate/3.jpg'] },
];

const ROTATE_MS = 3000;
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

function PhotoStack({ photos, index, className }: { photos: string[]; index: number; className?: string }) {
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
          className={`absolute inset-0 h-full w-full object-cover ease-out ${mounted ? 'transition-all duration-700' : ''}`}
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
    return () => window.removeEventListener('resize', measure);
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
      style={pinned ? { height: `calc(100svh + ${travel}px)` } : undefined}
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

        <div className={pinned ? 'relative z-10' : 'relative z-10 overflow-x-auto pb-6 [scroll-snap-type:x_mandatory]'}>
          <div
            ref={trackRef}
            className="flex w-max items-center gap-6 px-[var(--gutter)] py-4 will-change-transform"
          >
            {visible.map((h, i) => (
              <HighlightCard
                key={h.originalIndex}
                index={h.originalIndex}
                position={i + 1}
                total={visible.length}
                data={h}
                active={!pinned || activeCard === i}
                onOpen={() => setOpenIdx(h.originalIndex)}
              />
            ))}
            <div className="flex h-[min(46vh,420px)] w-[clamp(220px,24vw,320px)] flex-shrink-0 snap-center items-center pr-4">
              <p className="font-serif text-4xl italic text-muted-foreground">{t('highlights.counting')}</p>
            </div>
          </div>
        </div>
      </div>

      {openIdx !== null && <HighlightModal index={openIdx} data={highlightsData[openIdx]} onClose={() => setOpenIdx(null)} />}
    </section>
  );
}

function HighlightCard({
  index,
  position,
  total,
  data,
  active,
  onOpen,
}: {
  index: number;
  position: number;
  total: number;
  data: { type: HighlightType; photos: string[] };
  active: boolean;
  onOpen: () => void;
}) {
  const { t } = useLanguage();
  const [photoIndex] = useAutoRotate(data.photos.length, true);
  const Icon = TYPE_ICONS[data.type];

  return (
    <div
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
      className={`group relative flex h-[min(46vh,420px)] w-[clamp(300px,40vw,540px)] flex-shrink-0 cursor-pointer snap-center flex-col overflow-hidden rounded-[28px] border bg-card transition-all duration-700 ${
        active ? '-translate-y-3 border-foreground/20 shadow-[0_40px_80px_-36px_rgba(0,0,0,0.45)]' : 'border-foreground/10 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.3)]'
      }`}
      style={{ transitionTimingFunction: 'var(--ease)' }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <PhotoStack photos={data.photos} index={photoIndex} className="h-full w-full transition-transform duration-[1200ms] group-hover:scale-[1.04]" />
        <StoryProgress count={data.photos.length} activeIndex={photoIndex} cardKey={`card-${index}`} />
        <span className="absolute right-3 top-8 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur-sm transition-colors duration-500 group-hover:bg-foreground group-hover:text-background">
          <Maximize2 size={11} />
          {t('highlights.viewDetails')}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="mz-tag inline-flex items-center gap-1.5">
            <Icon size={12} />
            {t(`highlights.type.${data.type}`)} · {t(`highlights.${index}.date`)}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-tight sm:text-xl">{t(`highlights.${index}.title`)}</h3>
        </div>
        <span className="flex-shrink-0 font-mono text-xs text-muted-foreground">
          {pad(position)} / {pad(total)}
        </span>
      </div>
    </div>
  );
}

function HighlightModal({ index, data, onClose }: { index: number; data: { type: HighlightType; photos: string[] }; onClose: () => void }) {
  const { t } = useLanguage();
  const [photoIndex, setPhotoIndex] = useAutoRotate(data.photos.length, true);
  const Icon = TYPE_ICONS[data.type];

  const goPrev = () => setPhotoIndex((i) => (i - 1 + data.photos.length) % data.photos.length);
  const goNext = () => setPhotoIndex((i) => (i + 1) % data.photos.length);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrow =
    'absolute top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur-sm transition-all hover:scale-110';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-foreground/10 bg-card shadow-2xl">
        <div className="relative aspect-[4/3] w-full">
          <PhotoStack photos={data.photos} index={photoIndex} className="h-full w-full" />
          {data.photos.length > 1 && (
            <>
              <StoryProgress count={data.photos.length} activeIndex={photoIndex} cardKey="modal" />
              <button onClick={goPrev} aria-label="Previous photo" className={`${arrow} left-3`}><ChevronLeft size={18} /></button>
              <button onClick={goNext} aria-label="Next photo" className={`${arrow} right-3`}><ChevronRight size={18} /></button>
            </>
          )}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-6 z-10 grid h-10 w-10 place-items-center rounded-full border border-foreground/15 bg-background/85 backdrop-blur-sm transition-all hover:rotate-90"
          >
            <X size={18} />
          </button>
        </div>

        {data.photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-6 pb-1 pt-5">
            {data.photos.map((src, i) => (
              <button
                key={src}
                onClick={() => setPhotoIndex(i)}
                aria-label={`Foto ${i + 1}`}
                className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  i === photoIndex ? 'border-foreground' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="p-6 pt-4 sm:p-8">
          <p className="mz-tag inline-flex items-center gap-1.5">
            <Icon size={12} />
            {t(`highlights.type.${data.type}`)} · {t(`highlights.${index}.date`)}
          </p>
          <h3 className="mb-4 mt-2 text-3xl font-bold">{t(`highlights.${index}.title`)}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{t(`highlights.${index}.description`)}</p>
        </div>
      </div>
    </div>
  );
}
