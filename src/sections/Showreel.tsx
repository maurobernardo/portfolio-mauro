import { useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { iconMap, projectsMeta } from '../lib/projects';
import { scrollToTarget } from '../lib/scroll';
import Reveal from '../components/Reveal';
import ReelPlayer, { inOut, out, pad, Rise, Scene, seg, useWide } from '../components/ReelPlayer';

const projects = projectsMeta.filter((p) => p.image);
const stack = [...new Set(projectsMeta.flatMap((p) => p.stack))];
const liveCount = projectsMeta.filter((p) => p.link).length;
// Índices de projectsMeta por capítulo: dados, instituições, pessoas.
const CHAPTERS = [[0, 5], [1, 3, 4], [2, 6, 7, 8]];

const cue = (key: string) => ({
  cut: key.startsWith('ch') || key === 'montage' ? ('hit' as const) : key === 'intro' ? undefined : ('whoosh' as const),
  type: key.startsWith('p') || key === 'intro' || key === 'outro' ? 7 : 0,
});

export default function Showreel() {
  const { t } = useLanguage();
  const wide = useWide();

  const scenes: Scene[] = useMemo(() => {
    const words = [t('reel.w1'), t('reel.w2'), t('reel.w3')];
    const numbers = [
      [projects.length, t('reel.nProjects')],
      [stack.length, t('reel.nTech')],
      [liveCount, t('reel.nLive')],
    ] as const;

    const intro: Scene = {
      key: 'intro',
      dur: 4.6,
      draw: (s) => {
        const name = out(seg(s, 2.6, 3.8));
        return (
          <div className="absolute inset-0 grid place-items-center">
            {words.map((w, i) => {
              const a = 0.25 + i * 0.75;
              const vis = s >= a && s < a + 0.75;
              return vis ? (
                <p key={w} className="absolute text-[15cqw] font-bold leading-none tracking-[-0.06em]">
                  <Rise q={seg(s, a, a + 0.35)}>{w}</Rise>
                </p>
              ) : null;
            })}
            {s >= 2.6 && (
              <div className="text-center">
                <p className="text-[9cqw] font-bold leading-none" style={{ letterSpacing: `${0.5 - name * 0.54}em`, opacity: name }}>
                  Mauro <span className="font-serif font-normal italic">Zibane</span>
                </p>
                <p className="mt-[2cqw] font-mono text-[1.5cqw] uppercase tracking-[0.35em] text-white/60" style={{ opacity: seg(s, 3.3, 3.9) }}>
                  {t('reel.role')}
                </p>
              </div>
            )}
          </div>
        );
      },
    };

    const stats: Scene = {
      key: 'numbers',
      dur: 4.8,
      draw: (s) => (
        <div className="absolute inset-0 flex flex-col justify-center px-[6cqw]">
          <p className="font-mono text-[1.4cqw] uppercase tracking-[0.35em] text-white/50" style={{ opacity: seg(s, 0, 0.4) }}>
            {t('reel.byNumbers')}
          </p>
          <div className="mt-[3cqw] grid grid-cols-3 gap-[3cqw]">
            {numbers.map(([n, label], i) => {
              const q = seg(s, 0.3 + i * 0.35, 2.1 + i * 0.35);
              return (
                <div key={label} className="border-t border-white/20 pt-[1.5cqw]" style={{ opacity: seg(s, 0.2 + i * 0.35, 0.6 + i * 0.35) }}>
                  <p className="text-[16cqw] font-bold leading-[0.85] tracking-[-0.07em] tabular-nums">{pad(Math.round(n * out(q)))}</p>
                  <p className="mt-[1.2cqw] font-mono text-[1.3cqw] uppercase tracking-[0.2em] text-white/60">
                    <Rise q={seg(s, 1 + i * 0.35, 1.5 + i * 0.35)}>{label}</Rise>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ),
    };

    const tech: Scene = {
      key: 'stack',
      dur: 4.4,
      draw: (s) => {
        const line = stack.join(' · ') + ' · ';
        return (
          <div className="absolute inset-0 flex flex-col justify-center gap-[3cqw] overflow-hidden">
            <p className="whitespace-nowrap text-[9cqw] font-bold leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]" style={{ transform: `translateX(${-s * 9}cqw)` }}>
              {line}{line}
            </p>
            <div className="flex flex-wrap justify-center gap-[2cqw] px-[6cqw]">
              {stack.map((name, i) => {
                const q = out(seg(s, 0.3 + i * 0.12, 0.8 + i * 0.12));
                return (
                  <div key={name} className="flex items-center gap-[1cqw] rounded-full border border-white/20 bg-white/[0.06] px-[1.8cqw] py-[1cqw]" style={{ opacity: q, transform: `translateY(${(1 - q) * 3}cqw) scale(${0.8 + q * 0.2})` }}>
                    {iconMap[name] && <img src={iconMap[name]} alt="" className="h-[2.4cqw] w-[2.4cqw]" />}
                    <span className="font-mono text-[1.5cqw] uppercase tracking-wider">{name}</span>
                  </div>
                );
              })}
            </div>
            <p className="whitespace-nowrap text-[9cqw] font-serif italic leading-none text-white/80" style={{ transform: `translateX(${-60 + s * 9}cqw)` }}>
              {t('reel.stackLine')} {t('reel.stackLine')} {t('reel.stackLine')}
            </p>
          </div>
        );
      },
    };

    // Tamanhos em cqw: no palco vertical (telemóvel) tudo é maior em relação à largura.
    const z = (wideV: number, tallV: number) => `${wide ? wideV : tallV}cqw`;
    let shotNo = 0;

    const chapterScene = (c: number, members: number[]): Scene => ({
      key: `ch${c}`,
      dur: 2.6,
      draw: (s) => {
        const q = out(seg(s, 0, 1.1));
        const exit = inOut(seg(s, 2.2, 2.6));
        return (
          <div className="absolute inset-0 grid place-items-center overflow-hidden" style={{ opacity: 1 - exit, transform: `scale(${1 + exit * 0.06})` }}>
            {/* Leque com as capturas do capítulo */}
            <div className="absolute inset-0 grid place-items-center opacity-40">
              {members.map((i, j) => {
                const off = j - (members.length - 1) / 2;
                return (
                  <div
                    key={i}
                    className="absolute overflow-hidden rounded-[1cqw] border border-white/15 shadow-2xl"
                    style={{ width: z(30, 52), transform: `translateX(${off * q * (wide ? 24 : 18)}cqw) translateY(${Math.abs(off) * q * 3}cqw) rotate(${off * q * 9}deg)` }}
                  >
                    <img src={projectsMeta[i].image} alt="" className="block w-full" />
                  </div>
                );
              })}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            <div className="relative px-[6cqw] text-center">
              <p className="font-mono uppercase tracking-[0.35em] text-white/60" style={{ fontSize: z(1.4, 3), opacity: seg(s, 0.1, 0.5) }}>
                {t('reel.chapter')} {pad(c + 1)} / 03 · {pad(members.length)} {t('reel.nProjects')}
              </p>
              <p className="mt-[2cqw] font-bold leading-[0.92] tracking-[-0.05em]" style={{ fontSize: z(8, 12) }}>
                <Rise q={seg(s, 0.25, 0.85)} className="font-serif font-normal italic">{t(`reel.ch${c + 1}`)}</Rise>
              </p>
              <div className="mx-auto mt-[2.5cqw] h-px bg-white/40" style={{ width: `${out(seg(s, 0.6, 1.6)) * 24}cqw` }} />
            </div>
          </div>
        );
      },
    });

    const shotScene = (i: number): Scene => {
      const p = projectsMeta[i];
      const no = ++shotNo;
      const dir = no % 2 === 0 ? -1 : 1;
      const host = p.link ? new URL(p.link).host : 'localhost';
      return {
        key: `p${i}`,
        dur: 3.6,
        draw: (s) => {
          const q = out(seg(s, 0, 1.1));
          const exit = inOut(seg(s, 3.1, 3.6));
          const glare = seg(s, 0.9, 1.9);
          const title = t(`projects.${i}.title`).split(' - ');
          const textOut = { opacity: 1 - exit, transform: `translateY(${-exit * 3}cqw)` };
          return (
            <div className="absolute inset-0 overflow-hidden">
              {/* Luz ambiente tirada da própria captura */}
              <img src={p.image} alt="" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-3xl" style={{ opacity: 0.3 * q * (1 - exit) }} />

              <p
                className="absolute font-bold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.2)]"
                style={{ fontSize: z(26, 40), left: wide ? '2cqw' : 'auto', right: wide ? 'auto' : '4cqw', top: wide ? '-2cqw' : '62cqw', opacity: seg(s, 0.2, 0.8) * (1 - exit), transform: `translateY(${(1 - out(seg(s, 0.2, 1.4))) * 10}cqw)` }}
              >
                {pad(no)}
              </p>

              {/* Janela de browser com a captura inteira, sem cortes */}
              <div
                className="absolute [perspective:1600px]"
                style={wide ? { right: '4cqw', top: '50%', width: '58cqw', marginTop: '-15cqw' } : { left: '5cqw', top: '14cqw', width: '90cqw' }}
              >
                <div
                  className="relative overflow-hidden rounded-[1.2cqw] border border-white/15 bg-[#151515] shadow-[0_4cqw_8cqw_-2cqw_rgba(0,0,0,0.8)]"
                  style={{
                    opacity: q * (1 - exit),
                    transform: `translateX(${dir * (1 - q) * 30}cqw) translateY(${-exit * 5}cqw) rotateY(${dir * (-38 * (1 - q) - (wide ? 8 : 0))}deg) rotateX(${wide ? 4 : 2}deg) scale(${(0.9 + q * 0.1) * (1 - exit * 0.1)})`,
                  }}
                >
                  <div className="flex items-center gap-[0.6cqw] border-b border-white/10 px-[1.4cqw] py-[1cqw]">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="rounded-full bg-white/25" style={{ width: z(0.9, 1.6), height: z(0.9, 1.6) }} />
                    ))}
                    <span className="mx-auto rounded-full bg-white/[0.07] px-[2cqw] py-[0.3cqw] font-mono text-white/60" style={{ fontSize: z(0.95, 2) }}>{host}</span>
                  </div>
                  <img src={p.image} alt="" className="block w-full" />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `linear-gradient(105deg, transparent ${glare * 140 - 40}%, rgba(255,255,255,0.18) ${glare * 140 - 25}%, transparent ${glare * 140 - 10}%)` }}
                  />
                </div>
              </div>

              {/* Texto */}
              <div className="absolute" style={{ ...(wide ? { left: '5cqw', width: '31cqw', top: '50%', marginTop: '-8cqw' } : { left: '6cqw', right: '6cqw', top: '72cqw' }), ...textOut }}>
                <p className="font-mono uppercase tracking-[0.3em] text-white/60" style={{ fontSize: z(1.2, 2.8) }}>
                  <Rise q={seg(s, 0.35, 0.8)}>{t(`projects.${i}.category`)}</Rise>
                </p>
                <h3 className="mt-[1.2cqw] font-bold leading-[0.95] tracking-[-0.04em]" style={{ fontSize: z(4.2, 8.5) }}>
                  <Rise q={seg(s, 0.45, 1)}>{title[0]}</Rise>
                  {title[1] && (
                    <>
                      <br />
                      <Rise q={seg(s, 0.6, 1.15)} className="font-serif font-normal italic text-white/75">{title[1]}</Rise>
                    </>
                  )}
                </h3>
                <div className="mt-[2cqw] flex flex-wrap gap-[0.8cqw]">
                  {p.stack.map((name, j) => {
                    const c = out(seg(s, 1 + j * 0.1, 1.4 + j * 0.1));
                    return (
                      <span key={name} className="flex items-center gap-[0.6cqw] rounded-full border border-white/15 bg-white/[0.07] px-[1.2cqw] py-[0.5cqw] font-mono uppercase tracking-wider" style={{ fontSize: z(0.95, 2.2), opacity: c, transform: `translateY(${(1 - c) * 2}cqw)` }}>
                        {iconMap[name] && <img src={iconMap[name]} alt="" style={{ width: z(1.4, 3), height: z(1.4, 3) }} />}
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        },
      };
    };

    const shots: Scene[] = CHAPTERS.flatMap((members, c) => [chapterScene(c, members), ...members.map(shotScene)]);

    const montage: Scene = {
      key: 'montage',
      dur: 3.6,
      draw: (s) => {
        const zoom = 1.5 - out(seg(s, 0, 2.2)) * 0.5;
        const text = out(seg(s, 1.8, 2.5));
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute inset-0 grid content-center gap-[1.2cqw] p-[3cqw] ${wide ? 'grid-cols-3' : 'grid-cols-2'}`} style={{ transform: `scale(${zoom}) rotate(${(1 - out(seg(s, 0, 2.2))) * -4}deg)` }}>
              {projects.map((p, k) => {
                const q = out(seg(s, k * 0.09, 0.6 + k * 0.09));
                return (
                  <div key={p.image} className="overflow-hidden rounded-[1cqw] border border-white/10 bg-white/5" style={{ opacity: q, transform: `scale(${0.7 + q * 0.3})` }}>
                    <img src={p.image} alt="" className="block w-full" />
                  </div>
                );
              })}
            </div>
            <div className="absolute inset-0 grid place-items-center bg-black/60" style={{ opacity: text }}>
              <p className="px-[5cqw] text-center text-[7.5cqw] font-bold leading-[0.95] tracking-[-0.05em]">
                <Rise q={seg(s, 1.8, 2.4)}>{t('reel.montageA').replace('{n}', String(projects.length))}</Rise>{' '}
                <Rise q={seg(s, 2.05, 2.7)} className="font-serif font-normal italic">{t('reel.montageB')}</Rise>
              </p>
            </div>
          </div>
        );
      },
    };

    const outro: Scene = {
      key: 'outro',
      dur: 5.2,
      draw: (s) => (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[10cqw] font-bold leading-[0.9] tracking-[-0.06em]">
            <Rise q={seg(s, 0.2, 0.8)}>{t('reel.outroA')}</Rise>
            <br />
            <Rise q={seg(s, 0.5, 1.1)} className="font-serif font-normal italic text-white/80">{t('reel.outroB')}</Rise>
          </p>
          <div className="mx-auto mt-[3cqw] h-px bg-white/30" style={{ width: `${out(seg(s, 1, 2)) * 30}cqw` }} />
          <p className="mt-[2cqw] font-mono text-[1.4cqw] uppercase tracking-[0.35em] text-white/60" style={{ opacity: seg(s, 1.4, 2) }}>
            Mauro Zibane · maurobernardozibane@gmail.com
          </p>
        </div>
      ),
    };

    return [intro, stats, tech, ...shots, montage, outro];
  }, [t, wide]);

  return (
    <section id="showreel" className="relative border-t border-border/70 py-[clamp(56px,8vh,96px)]">
      <div className="mx-auto max-w-[1440px] px-[var(--gutter)]">
        <div className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="mz-tag">{t('reel.eyebrow')}</span>
            </Reveal>
            <Reveal delayMs={60}>
              <h2 className="mt-4 text-5xl font-bold leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-8xl">
                {t('reel.titleA')}{' '}
                <span className="font-serif font-normal italic text-muted-foreground">{t('reel.titleB')}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delayMs={120}>
            <p className="max-w-[420px] text-base leading-relaxed text-muted-foreground md:text-lg">{t('reel.subtitle')}</p>
          </Reveal>
        </div>

        <Reveal delayMs={160}>
          <ReelPlayer
            scenes={scenes}
            label="Showreel"
            cue={cue}
            outro={(local, replay) => (
              <div className="absolute bottom-[12%] left-0 right-0 flex justify-center gap-3" style={{ opacity: seg(local, 2, 2.6) }}>
                <button onClick={() => scrollToTarget('#contato')} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform duration-500 hover:scale-105">
                  {t('reel.cta')}
                </button>
                <button onClick={replay} className="flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold transition-colors duration-500 hover:bg-white hover:text-black">
                  <RotateCcw size={15} /> {t('reel.replay')}
                </button>
              </div>
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}
