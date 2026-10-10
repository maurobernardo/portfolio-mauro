import { CSSProperties, useMemo } from 'react';
import SectionBridge from '../components/SectionBridge';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollToTarget } from '../lib/scroll';
import Reveal from '../components/Reveal';
import ReelPlayer, { inOut, out, pad, Rise, Scene, seg, useWide } from '../components/ReelPlayer';
import { highlightsData, TYPE_ICONS } from './Highlights';

/* Curta documental dos Highlights, em papel: contagem de película, polaroids que caem na mesa,
   tira de 35 mm, páginas de revista e uma linha do tempo entre cada momento. */

const INK = '#0d0d0d';
const allPhotos = highlightsData.flatMap((h) => h.photos);

// Layout de cada momento: polaroids, revista ou película (sempre a variar).
const LAYOUT: Record<string, 'polaroid' | 'magazine' | 'strip'> = {
  hackathon: 'polaroid',
  talk: 'magazine',
  fair: 'strip',
  award: 'magazine',
  certificate: 'polaroid',
};

// Posições (% do palco) e rotação das polaroids.
const DROP_WIDE = [[56, 34, -8], [72, 28, 6], [86, 46, -5], [62, 66, 5], [79, 70, -7]];
const DROP_TALL = [[28, 18, -8], [72, 16, 6], [50, 34, -4], [26, 48, 7], [74, 50, -6]];

/** Foto sem cortes: altura fixa, largura natural. */
const Photo = ({ src, h, style, className = '' }: { src: string; h: string; style?: CSSProperties; className?: string }) => (
  <img src={src} alt="" className={`block max-w-none ${className}`} style={{ height: h, width: 'auto', ...style }} />
);

export default function HighlightsFilm() {
  const { t } = useLanguage();
  const wide = useWide();

  const scenes: Scene[] = useMemo(() => {
    const z = (w: number, tall: number) => `${wide ? w : tall}cqw`;
    const years = highlightsData.map((_, i) => Number((t(`highlights.${i}.date`).match(/\d{4}/g) || ['0']).pop()));
    const span = `${Math.min(...years)} — ${Math.max(...years)}`;

    /** Carimbo de tinta com a data. */
    const stamp = (s: number, at: number, i: number, style: CSSProperties) => {
      const q = seg(s, at, at + 0.25);
      if (q <= 0) return null;
      return (
        <div
          className="absolute rounded-[0.8cqw] border-[0.35cqw] px-[1.6cqw] py-[0.8cqw] text-center font-mono uppercase mix-blend-multiply"
          style={{ ...style, borderColor: INK, color: INK, opacity: 0.85 * q, transform: `rotate(-11deg) scale(${1.8 - out(q) * 0.8})` }}
        >
          <p className="tracking-[0.3em]" style={{ fontSize: z(1, 2.2) }}>{t(`highlights.type.${highlightsData[i].type}`)}</p>
          <p className="font-bold leading-none tracking-[-0.04em]" style={{ fontSize: z(3.6, 7) }}>{years[i]}</p>
        </div>
      );
    };

    /** Bloco de título comum a todos os momentos. */
    const caption = (s: number, i: number, style: CSSProperties, withText = true) => {
      const Icon = TYPE_ICONS[highlightsData[i].type];
      const [a, ...rest] = t(`highlights.${i}.title`).split(' ');
      return (
        <div className="absolute" style={style}>
          <p className="flex items-center gap-[1cqw] font-mono uppercase tracking-[0.3em] text-black/55" style={{ fontSize: z(1.1, 2.6), opacity: seg(s, 0.2, 0.6) }}>
            <Icon style={{ width: z(1.4, 3), height: z(1.4, 3) }} /> {pad(i + 1)} · {t(`highlights.type.${highlightsData[i].type}`)}
          </p>
          <h3 className="mt-[1.2cqw] font-bold leading-[0.95] tracking-[-0.045em]" style={{ fontSize: z(3.8, 7.6) }}>
            <Rise q={seg(s, 0.35, 0.9)}>{a}</Rise>{' '}
            <Rise q={seg(s, 0.5, 1.05)} className="font-serif font-normal italic text-black/60">{rest.join(' ')}</Rise>
          </h3>
          {withText && wide && (
            <p className="mt-[1.4cqw] max-w-[30cqw] leading-snug text-black/60" style={{ fontSize: '1.25cqw', opacity: seg(s, 1, 1.6) }}>
              {t(`highlights.${i}.description`)}
            </p>
          )}
        </div>
      );
    };

    const exitStyle = (s: number, dur: number): CSSProperties => {
      const e = inOut(seg(s, dur - 0.45, dur));
      return { opacity: 1 - e, transform: `translateY(${-e * 4}cqw) scale(${1 - e * 0.04})` };
    };

    // Abertura: contagem de película e título.
    const intro: Scene = {
      key: 'intro',
      dur: 4.6,
      draw: (s) => {
        if (s < 1.6) {
          const n = 3 - Math.floor(s / 0.53);
          const sweep = ((s % 0.53) / 0.53) * 360;
          return (
            <div className="absolute inset-0 grid place-items-center">
              <div className="absolute h-px w-full bg-black/15" />
              <div className="absolute h-full w-px bg-black/15" />
              <div className="relative grid aspect-square place-items-center rounded-full border border-black/30" style={{ width: z(30, 62) }}>
                <div className="absolute inset-[6%] rounded-full" style={{ background: `conic-gradient(rgba(13,13,13,0.12) ${sweep}deg, transparent 0)` }} />
                <div className="absolute inset-[12%] rounded-full border border-black/20" />
                <span className="relative font-bold tabular-nums leading-none tracking-[-0.06em]" style={{ fontSize: z(16, 34) }}>{n}</span>
              </div>
            </div>
          );
        }
        const l = s - 1.6;
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="font-mono uppercase tracking-[0.4em] text-black/50" style={{ fontSize: z(1.3, 2.8), opacity: seg(l, 0, 0.4) }}>
              Highlights · {span}
            </p>
            <p className="mt-[2cqw] font-bold leading-[0.9] tracking-[-0.06em]" style={{ fontSize: z(10, 14) }}>
              <Rise q={seg(l, 0.1, 0.7)}>{t('film.introA')}</Rise>
              <br />
              <Rise q={seg(l, 0.45, 1.05)} className="font-serif font-normal italic text-black/60">{t('film.introB')}</Rise>
            </p>
            <div className="mt-[3cqw] h-px bg-black/40" style={{ width: `${out(seg(l, 0.9, 2)) * 26}cqw` }} />
          </div>
        );
      },
    };

    // Linha do tempo que leva ao momento i.
    const timeline = (i: number): Scene => ({
      key: `tl${i}`,
      dur: 1.7,
      draw: (s) => {
        const n = highlightsData.length;
        const x = (k: number) => 10 + (k / (n - 1)) * 80;
        const from = i === 0 ? x(0) - 8 : x(i - 1);
        const cur = from + (x(i) - from) * inOut(seg(s, 0.1, 1));
        return (
          <div className="absolute inset-0" style={exitStyle(s, 1.7)}>
            <div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-black/20" />
            <div className="absolute left-[10%] top-1/2 h-[2px] -translate-y-[0.5px] bg-black" style={{ width: `${cur - 10}%` }} />
            {highlightsData.map((_, k) => (
              <span
                key={k}
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black ${k < i || (k === i && s > 1) ? 'bg-black' : 'bg-[#efebe4]'}`}
                style={{ left: `${x(k)}%`, width: z(1.2, 2.4), height: z(1.2, 2.4) }}
              />
            ))}
            <div className="absolute left-0 right-0 px-[6cqw] text-center" style={{ bottom: '54%' }}>
              <p className="font-bold leading-none tracking-[-0.05em]" style={{ fontSize: z(5, 9) }}>
                <Rise q={seg(s, 0.4, 0.9)}>{t(`highlights.${i}.date`)}</Rise>
              </p>
            </div>
            <p className="absolute left-0 right-0 top-[56%] text-center font-mono uppercase tracking-[0.35em] text-black/50" style={{ fontSize: z(1.2, 2.6), opacity: seg(s, 0.6, 1) }}>
              {pad(i + 1)} / {pad(n)} · {t(`highlights.type.${highlightsData[i].type}`)}
            </p>
          </div>
        );
      },
    });

    const polaroid = (i: number): Scene => {
      const photos = highlightsData[i].photos;
      const dur = 2.6 + photos.length * 0.4;
      const spots = wide ? DROP_WIDE : DROP_TALL;
      return {
        key: `m${i}`,
        dur,
        draw: (s) => (
          <div className="absolute inset-0" style={exitStyle(s, dur)}>
            {photos.map((src, j) => {
              const [x, y, r] = spots[j % spots.length];
              const q = out(seg(s, 0.25 + j * 0.35, 0.85 + j * 0.35));
              if (q <= 0) return null;
              return (
                <div
                  key={src}
                  className="absolute bg-white p-[0.7cqw] pb-[3cqw]"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) translateY(${-(1 - q) * 25}cqw) rotate(${r + (1 - q) * 18}deg) scale(${1.3 - q * 0.3})`,
                    opacity: Math.min(1, q * 2),
                    boxShadow: `0 ${0.5 + q * 1.5}cqw ${1 + q * 3}cqw rgba(40,30,20,${0.12 + q * 0.18})`,
                  }}
                >
                  <Photo src={src} h={z(19, 26)} />
                  <p className="absolute bottom-[0.7cqw] left-[1cqw] font-mono text-black/45" style={{ fontSize: z(0.9, 2) }}>
                    {pad(i + 1)}.{j + 1}
                  </p>
                </div>
              );
            })}
            {caption(s, i, wide ? { left: '5cqw', top: '50%', marginTop: '-9cqw', width: '34cqw' } : { left: '6cqw', right: '6cqw', top: '86cqw' })}
            {stamp(s, 0.4 + photos.length * 0.35, i, wide ? { left: '24cqw', top: '7cqw' } : { right: '6cqw', top: '72cqw' })}
          </div>
        ),
      };
    };

    const magazine = (i: number): Scene => {
      const photos = highlightsData[i].photos;
      const dur = 2.2 + photos.length * 0.9;
      return {
        key: `m${i}`,
        dur,
        draw: (s) => {
          const per = (dur - 1) / photos.length;
          const enter = out(seg(s, 0, 0.9));
          return (
            <div className="absolute inset-0 overflow-hidden" style={exitStyle(s, dur)}>
              <p
                className="absolute font-bold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1.5px_rgba(13,13,13,0.18)]"
                style={{ fontSize: z(30, 46), left: '2cqw', bottom: wide ? '-4cqw' : 'auto', top: wide ? 'auto' : '60cqw', transform: `translateY(${(1 - enter) * 10}cqw)` }}
              >
                {pad(i + 1)}
              </p>
              <div
                className="absolute"
                style={{
                  ...(wide ? { right: '7cqw', top: '50%' } : { left: '50%', top: '8cqw' }),
                  transform: `${wide ? 'translateY(-50%)' : 'translateX(-50%)'} translateX(${(1 - enter) * 20}cqw) rotate(${(1 - enter) * 6}deg)`,
                  opacity: enter,
                }}
              >
                {/* Folha de trás, como numa revista */}
                <div className="absolute inset-0 translate-x-[2.5cqw] translate-y-[1.5cqw] rotate-[4deg] bg-white shadow-xl" />
                <div className="relative overflow-hidden bg-white p-[0.8cqw] shadow-[0_2cqw_5cqw_-1cqw_rgba(40,30,20,0.35)]">
                  <div className="relative overflow-hidden">
                    {photos.map((src, j) => {
                      const a = 0.3 + j * per;
                      const vis = j === 0 ? 1 - seg(s, a + per - 0.2, a + per + 0.2) : seg(s, a - 0.2, a + 0.2) * (j === photos.length - 1 ? 1 : 1 - seg(s, a + per - 0.2, a + per + 0.2));
                      return (
                        <Photo
                          key={src}
                          src={src}
                          h={z(42, 60)}
                          className={j === 0 ? 'relative' : 'absolute left-1/2 top-0'}
                          style={{
                            opacity: vis,
                            transform: `${j === 0 ? '' : 'translateX(-50%)'} scale(${1.08 - seg(s, a - 0.2, a + per) * 0.08})`,
                            ...(j === 0 ? {} : { height: z(42, 60), width: 'auto' }),
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-[0.6cqw] flex justify-between font-mono text-black/45" style={{ fontSize: z(0.9, 2) }}>
                    <span>{t(`highlights.${i}.date`)}</span>
                    <span>{pad(Math.min(photos.length, Math.floor(Math.max(0, s - 0.3) / per) + 1))} / {pad(photos.length)}</span>
                  </div>
                </div>
              </div>
              {caption(s, i, wide ? { left: '6cqw', top: '50%', marginTop: '-10cqw', width: '38cqw' } : { left: '6cqw', right: '6cqw', top: '88cqw' }, true)}
              {stamp(s, 1.4, i, wide ? { left: '30cqw', top: '6cqw' } : { left: '6cqw', top: '72cqw' })}
            </div>
          );
        },
      };
    };

    const strip = (i: number): Scene => {
      const photos = highlightsData[i].photos;
      const dur = 5;
      const h = z(22, 34);
      const holes = 'repeating-linear-gradient(90deg, transparent 0 1.2cqw, rgba(239,235,228,0.85) 1.2cqw 2.4cqw, transparent 2.4cqw 3.6cqw)';
      return {
        key: `m${i}`,
        dur,
        draw: (s) => (
          <div className="absolute inset-0 overflow-hidden" style={exitStyle(s, dur)}>
            <div
              className="absolute left-0 flex items-center bg-[#111]"
              style={{ top: wide ? '42%' : '34%', height: `calc(${h} + 6cqw)`, transform: `translateY(-50%) rotate(-3deg) translateX(${30 - s * 16}cqw)`, width: 'max-content' }}
            >
              <div className="absolute inset-x-0 top-[0.8cqw] h-[1.2cqw]" style={{ background: holes }} />
              <div className="absolute inset-x-0 bottom-[0.8cqw] h-[1.2cqw]" style={{ background: holes }} />
              <div className="flex gap-[1.5cqw] px-[1.5cqw]">
                {[...photos, ...photos, ...photos].map((src, j) => (
                  <Photo key={j} src={src} h={h} className="rounded-[0.3cqw]" style={{ opacity: seg(s, 0.1 + (j % photos.length) * 0.12, 0.5 + (j % photos.length) * 0.12) }} />
                ))}
              </div>
            </div>
            {caption(s, i, wide ? { left: '6cqw', bottom: '9cqw', width: '50cqw' } : { left: '6cqw', right: '6cqw', top: '84cqw' }, false)}
            {stamp(s, 1.3, i, wide ? { right: '8cqw', bottom: '10cqw' } : { right: '6cqw', top: '66cqw' })}
          </div>
        ),
      };
    };

    // Fecho: folha de contactos com todas as fotos e os números reais.
    const outro: Scene = {
      key: 'outro',
      dur: 6,
      draw: (s) => {
        const stats = [
          [highlightsData.length, t('film.moments')],
          [allPhotos.length, t('film.photos')],
          [new Set(years).size, t('film.years')],
        ] as const;
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-[-6%] flex flex-wrap content-center justify-center gap-[0.8cqw] opacity-25" style={{ transform: `rotate(-4deg) scale(${1.15 - out(seg(s, 0, 3)) * 0.15})` }}>
              {[...allPhotos, ...allPhotos].map((src, j) => (
                <Photo key={j} src={src} h={z(11, 18)} style={{ opacity: seg(s, (j % 19) * 0.04, 0.4 + (j % 19) * 0.04) }} />
              ))}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#efebe4_35%,rgba(239,235,228,0.6))]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-[6cqw] text-center" style={{ paddingBottom: z(6, 14) }}>
              <div className="flex gap-[4cqw]">
                {stats.map(([n, label], k) => (
                  <div key={label} style={{ opacity: seg(s, 0.2 + k * 0.2, 0.6 + k * 0.2) }}>
                    <p className="font-bold tabular-nums leading-none tracking-[-0.06em]" style={{ fontSize: z(6, 12) }}>{pad(Math.round(n * out(seg(s, 0.2 + k * 0.2, 1.6 + k * 0.2))))}</p>
                    <p className="mt-[0.8cqw] font-mono uppercase tracking-[0.25em] text-black/50" style={{ fontSize: z(1.1, 2.4) }}>{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-[3.5cqw] font-bold leading-[0.92] tracking-[-0.055em]" style={{ fontSize: z(7, 10.5) }}>
                <Rise q={seg(s, 1.4, 2)}>{t('film.outroA')}</Rise>
                <br />
                <Rise q={seg(s, 1.7, 2.3)} className="font-serif font-normal italic text-black/60">{t('film.outroB')}</Rise>
              </p>
            </div>
          </div>
        );
      },
    };

    const make = { polaroid, magazine, strip };
    return [intro, ...highlightsData.flatMap((h, i) => [timeline(i), make[LAYOUT[h.type]](i)]), outro];
  }, [t, wide]);

  return (
    <section id="filme" className="relative border-t border-border/70 py-[clamp(56px,8vh,96px)]">
      <div className="mx-auto max-w-[1440px] px-[var(--gutter)]">
        <div className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="mz-tag">{t('film.eyebrow')}</span>
            </Reveal>
            <Reveal delayMs={60}>
              <h2 className="mt-4 text-5xl font-bold leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-8xl">
                {t('film.titleA')} <span className="font-serif font-normal italic text-muted-foreground">{t('film.titleB')}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delayMs={120}>
            <p className="max-w-[420px] text-base leading-relaxed text-muted-foreground md:text-lg">{t('film.subtitle')}</p>
          </Reveal>
        </div>

        <Reveal delayMs={160}>
          <ReelPlayer
            scenes={scenes}
            label={t('film.label')}
            tone="paper"
            mood="memory"
            cue={(key) => ({ cut: key.startsWith('m') ? 'hit' : key.startsWith('tl') ? 'whoosh' : undefined, type: key === 'intro' || key === 'outro' ? 6 : 0 })}
            outro={(local, replay) => (
              <div className="absolute bottom-[13%] left-0 right-0 flex justify-center gap-3" style={{ opacity: seg(local, 2.4, 3) }}>
                <button onClick={() => scrollToTarget('#contato')} className="rounded-full bg-[#0d0d0d] px-5 py-3 text-sm font-semibold text-[#efebe4] transition-transform duration-500 hover:scale-105">
                  {t('film.cta')}
                </button>
                <button onClick={replay} className="flex items-center gap-2 rounded-full border border-black/25 px-5 py-3 text-sm font-semibold text-[#0d0d0d] transition-colors duration-500 hover:bg-[#0d0d0d] hover:text-[#efebe4]">
                  <RotateCcw size={15} /> {t('reel.replay')}
                </button>
              </div>
            )}
          />
        </Reveal>
      </div>
      <SectionBridge
        items={allPhotos.map((src) => ({ kind: 'photo', src }))}
        a={t('film.bridgeA')}
        b={t('film.bridgeB')}
        back={{ items: allPhotos.map((src) => ({ kind: 'photo', src })), a: t('bridge.backFilmA'), b: t('bridge.backFilmB') }}
        height="220svh"
      />
    </section>
  );
}
