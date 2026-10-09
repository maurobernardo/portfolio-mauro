import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { lockScroll } from '../lib/scroll';
import { useLanguage } from '../contexts/LanguageContext';

export const certificationsData = [
  { skillCount: 4, image: '/mpesa.webp' },
  { skillCount: 3, image: '/cyber.webp' },
  { skillCount: 4, image: '/ia2.webp' },
  { skillCount: 4, image: '/Ciencia.webp' },
  { skillCount: 2, image: '/Hardware.webp' },
  { skillCount: 2, image: '/strach.webp' },
];

const periodOf = (raw: string) => {
  const [p1, p2] = raw.split(' · ');
  return p2 && p2 !== p1 ? `${p1} → ${p2}` : p1;
};

/** Índice numerado; cada linha inunda de tinta. O certificado vê-se sempre (miniatura no mobile, pré-visualização no desktop) e abre em ecrã inteiro. */
export default function Certifications() {
  const { t } = useLanguage();
  const [sel, setSel] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <section id="certificados" className="relative border-y border-border/70 bg-card py-[clamp(56px,8vh,96px)]">
      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] grid-cols-[minmax(0,1fr)] gap-10 px-[var(--gutter)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <SectionHeader no="04" eyebrow={t('eyebrow.certifications')} title={t('certs.heading')} subtitle={t('experience.certificationsSubtitle')} />
          <p className="mz-tag">
            {certificationsData.length} {t("certs.count")}
          </p>
          <button
            type="button"
            onClick={() => setZoom(sel)}
            aria-label={t(`certifications.${sel}.title`)}
            className="relative mt-6 hidden aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-foreground/10 bg-secondary lg:block"
          >
            {certificationsData.map((c, i) => (
              <img
                key={c.image}
                src={c.image}
                alt={t(`certifications.${i}.title`)}
                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
                style={{ opacity: sel === i ? 1 : 0 }}
              />
            ))}
          </button>
        </div>

        <ol className="min-w-0 border-t border-foreground/10">
          {certificationsData.map((c, i) => {
            const skills = Array.from({ length: c.skillCount }, (_, k) => t(`certifications.${i}.skill${k}`));
            const period = periodOf(t(`certifications.${i}.period`));
            return (
              <Reveal as="li" key={i} delayMs={i * 60}>
                <button
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onFocus={() => setSel(i)}
                  onClick={() => {
                    setSel(i);
                    setZoom(i);
                  }}
                  className="group relative block w-full overflow-hidden border-b border-foreground/10 px-1 py-6 text-left sm:px-4"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-[700ms] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    style={{ transitionTimingFunction: 'var(--ease)' }}
                  />
                  <span className="relative z-10 flex items-start gap-4 transition-colors duration-500 group-hover:text-background group-focus-visible:text-background sm:gap-5">
                    <span className="mz-tag pt-2 text-inherit opacity-60">{String(i + 1).padStart(2, '0')}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xl font-bold leading-tight tracking-tight sm:text-2xl">{t(`certifications.${i}.title`)}</span>
                      <span className="mt-1 block text-sm opacity-70">
                        {t(`certifications.${i}.issuer`)} · {period || t(`certifications.${i}.year`)}
                      </span>
                      <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider opacity-60">
                        {skills.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </span>
                      <img
                        src={c.image}
                        alt={t(`certifications.${i}.title`)}
                        loading="lazy"
                        className="mt-4 block h-auto w-full rounded-xl border border-foreground/10 lg:hidden"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden translate-x-[-12px] pt-1 text-2xl opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:block"
                    >
                      ↗
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ol>
      </div>

      {zoom !== null && (
        <Lightbox
          index={zoom}
          total={certificationsData.length}
          image={certificationsData[zoom].image}
          title={t(`certifications.${zoom}.title`)}
          sub={`${t(`certifications.${zoom}.issuer`)} · ${periodOf(t(`certifications.${zoom}.period`))}`}
          onNav={(d) => setZoom((z) => ((z ?? 0) + d + certificationsData.length) % certificationsData.length)}
          onClose={() => setZoom(null)}
        />
      )}
    </section>
  );
}

function Lightbox({
  index,
  total,
  image,
  title,
  sub,
  onNav,
  onClose,
}: {
  index: number;
  total: number;
  image: string;
  title: string;
  sub: string;
  onNav: (d: 1 | -1) => void;
  onClose: () => void;
}) {
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

  const circle =
    'grid h-11 w-11 place-items-center rounded-full border border-foreground/15 bg-card transition-all duration-500 hover:bg-foreground hover:text-background';

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[80] flex flex-col bg-background/95 p-3 backdrop-blur-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mz-tag">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
          <h3 className="mt-1 text-xl font-bold leading-tight sm:text-2xl">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
        </div>
        <button onClick={onClose} aria-label="Close" className={`${circle} flex-shrink-0`}>
          <X size={18} />
        </button>
      </div>
      <div className="relative my-4 flex min-h-0 flex-1 items-center justify-center" onClick={onClose}>
        <img src={image} alt={title} className="max-h-full max-w-full rounded-xl border border-foreground/10 object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => onNav(-1)} aria-label="Previous" className={circle}><ChevronLeft size={18} /></button>
        <button onClick={() => onNav(1)} aria-label="Next" className={circle}><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
