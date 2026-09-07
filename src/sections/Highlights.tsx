import { useEffect, useRef, useState } from 'react';
import { Code2, Mic, Store, Trophy, Award, ImagePlus, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
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

const highlightsData: { type: HighlightType; photos: string[]; featured?: boolean; companion?: boolean }[] = [
  {
    type: 'hackathon',
    featured: true,
    photos: [
      '/highlights/hackathon/1.jpg',
      '/highlights/hackathon/2.jpg',
      '/highlights/hackathon/3.jpg',
      '/highlights/hackathon/4.jpg',
      '/highlights/hackathon/5.jpg',
    ],
  },
  {
    type: 'talk',
    photos: ['/highlights/talk/1.jpg', '/highlights/talk/2.jpg'],
  },
  {
    type: 'fair',
    photos: ['/highlights/feira/1.jpg', '/highlights/feira/2.jpg', '/highlights/feira/3.jpg', '/highlights/feira/4.jpg'],
  },
  {
    type: 'award',
    photos: [
      '/highlights/award/1.jpg',
      '/highlights/award/2.jpg',
      '/highlights/award/3.jpg',
      '/highlights/award/4.jpg',
      '/highlights/award/5.jpg',
    ],
  },
  {
    type: 'certificate',
    companion: true,
    photos: ['/highlights/certificate/1.jpg', '/highlights/certificate/2.jpg', '/highlights/certificate/3.jpg'],
  },
];

const ROTATE_MS = 3000;

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
      <div className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-primary/5 text-muted-foreground/60 ${className ?? ''}`}>
        <ImagePlus size={22} strokeWidth={1.5} />
        <span className="text-[10px] font-medium uppercase tracking-wide">Foto em breve</span>
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
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? 'scale(1)' : 'scale(1.08)',
          }}
        />
      ))}
    </div>
  );
}

/** Barra de progresso tipo "stories" — um segmento por foto */
function StoryProgress({ count, activeIndex, cardKey }: { count: number; activeIndex: number; cardKey: string }) {
  if (count <= 1) return null;
  return (
    <div className="absolute top-3 left-3 right-3 z-10 flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
          {i < activeIndex && <div className="h-full w-full bg-white" />}
          {i === activeIndex && (
            <div key={`${cardKey}-${activeIndex}`} className="h-full bg-white animate-segment-fill" />
          )}
        </div>
      ))}
    </div>
  );
}

/** Glow que acompanha o cursor, aplicado a qualquer card com className "spotlight" */
function useSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };
  return { ref, onMouseMove };
}

export default function Highlights() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterKey>('all');

  const withIndex = highlightsData.map((h, i) => ({ ...h, originalIndex: i }));
  const visible = withIndex.filter((h) => filter === 'all' || h.type === filter);
  const showBento = filter === 'all';
  const featured = withIndex.find((h) => h.featured);
  const companion = withIndex.find((h) => h.companion);
  const rest = withIndex.filter((h) => !h.featured && !h.companion);

  return (
    <section id="momentos" className="relative border-t border-border/70 bg-card/60 py-16 lg:py-24 overflow-hidden">
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(255, 107, 74, 0.35) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute -bottom-32 -right-24 w-[380px] h-[380px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(255, 107, 74, 0.3) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-8 relative z-10">
        <SectionHeader eyebrow="Highlights" title={t('highlights.title')} subtitle={t('highlights.subtitle')} />

        {/* Filtros */}
        <Reveal delayMs={120}>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {FILTERS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={[
                  'inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200',
                  filter === key
                    ? 'bg-primary/10 border-primary/50 text-primary'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
                ].join(' ')}
              >
                {key === 'all' ? t('highlights.filterAll') : t(`highlights.type.${key}`)}
              </button>
            ))}
          </div>
        </Reveal>

        {showBento ? (
          <div className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {featured && (
                <HighlightCard
                  index={featured.originalIndex}
                  data={featured}
                  onOpen={() => setOpenIdx(featured.originalIndex)}
                  variant="banner"
                  className="lg:col-span-2"
                  delayMs={0}
                />
              )}
              {companion && (
                <HighlightCard
                  index={companion.originalIndex}
                  data={companion}
                  onOpen={() => setOpenIdx(companion.originalIndex)}
                  variant="companion"
                  delayMs={90}
                />
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {rest.map((h, i) => (
                <HighlightCard
                  key={h.originalIndex}
                  index={h.originalIndex}
                  data={h}
                  onOpen={() => setOpenIdx(h.originalIndex)}
                  variant="grid"
                  delayMs={(i + 2) * 90}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {visible.map((h, i) => (
              <HighlightCard
                key={h.originalIndex}
                index={h.originalIndex}
                data={h}
                onOpen={() => setOpenIdx(h.originalIndex)}
                variant="grid"
                delayMs={i * 90}
              />
            ))}
          </div>
        )}
      </div>

      {openIdx !== null && (
        <HighlightModal index={openIdx} data={highlightsData[openIdx]} onClose={() => setOpenIdx(null)} />
      )}
    </section>
  );
}

function HighlightCard({
  index,
  data,
  onOpen,
  variant,
  delayMs,
  className,
}: {
  index: number;
  data: { type: HighlightType; photos: string[] };
  onOpen: () => void;
  variant: 'banner' | 'companion' | 'grid';
  delayMs: number;
  className?: string;
}) {
  const { t } = useLanguage();
  const [photoIndex] = useAutoRotate(data.photos.length, true);
  const Icon = TYPE_ICONS[data.type];
  const title = t(`highlights.${index}.title`);
  const date = t(`highlights.${index}.date`);
  const { ref, onMouseMove } = useSpotlight();
  const isBanner = variant === 'banner';
  const isRow1 = variant === 'banner' || variant === 'companion';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <Reveal delayMs={delayMs} className={`${className ?? ''} ${isRow1 ? 'h-64 sm:h-80 lg:h-[440px]' : ''}`}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={handleKeyDown}
        aria-label={t('highlights.viewDetails')}
        className="group relative block h-full w-full cursor-pointer rounded-3xl border border-border/70 bg-card shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {/* Spotlight que segue o cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(255, 107, 74, 0.18), transparent 45%)' }}
        />

        <div className={isRow1 ? 'absolute inset-0 overflow-hidden' : 'overflow-hidden'}>
          <div className={`transition-transform duration-700 group-hover:scale-[1.04] ${isRow1 ? 'h-full w-full' : ''}`}>
            <PhotoStack photos={data.photos} index={photoIndex} className={isRow1 ? 'h-full w-full' : 'aspect-[4/3] w-full'} />
          </div>
        </div>

        {/* Gradient para legibilidade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

        <StoryProgress count={data.photos.length} activeIndex={photoIndex} cardKey={`card-${index}`} />

        {/* Badge de tipo */}
        <span className="absolute top-8 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <Icon size={12} />
          {t(`highlights.type.${data.type}`)}
        </span>

        {/* Botão "Ver detalhes", sempre visível */}
        <span className="absolute top-8 right-4 inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Maximize2 size={11} />
          {t('highlights.viewDetails')}
        </span>

        {/* Texto sobreposto */}
        <div className={`absolute bottom-0 left-0 right-0 p-5 ${isBanner ? 'sm:p-7' : 'sm:p-6'}`}>
          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/75 mb-1">{date}</p>
          <h3 className={`font-bold leading-snug text-white drop-shadow-sm ${isBanner ? 'text-xl sm:text-2xl' : 'text-lg'}`}>{title}</h3>
        </div>
      </div>
    </Reveal>
  );
}

function HighlightModal({
  index,
  data,
  onClose,
}: {
  index: number;
  data: { type: HighlightType; photos: string[] };
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [photoIndex, setPhotoIndex] = useAutoRotate(data.photos.length, true);
  const Icon = TYPE_ICONS[data.type];
  const title = t(`highlights.${index}.title`);
  const date = t(`highlights.${index}.date`);
  const description = t(`highlights.${index}.description`);

  const goPrev = () => setPhotoIndex((i) => (i - 1 + data.photos.length) % data.photos.length);
  const goNext = () => setPhotoIndex((i) => (i + 1) % data.photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 animate-popup-overlay-in">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border/70 bg-card shadow-2xl animate-popup-modal-in">
        <div className="relative aspect-[4/3] w-full">
          <PhotoStack photos={data.photos} index={photoIndex} className="h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

          {data.photos.length > 1 && (
            <>
              <StoryProgress count={data.photos.length} activeIndex={photoIndex} cardKey="modal" />
              <button
                onClick={goPrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 z-10 rounded-full border border-border bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:text-primary hover:rotate-90"
          >
            <X size={18} />
          </button>
        </div>

        {/* Thumbnails */}
        {data.photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-6 pt-5 pb-1">
            {data.photos.map((src, i) => (
              <button
                key={src}
                onClick={() => setPhotoIndex(i)}
                className={`relative flex-shrink-0 h-14 w-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  i === photoIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
            <Icon size={12} />
            {t(`highlights.type.${data.type}`)}
          </span>
          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5">{date}</p>
          <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
