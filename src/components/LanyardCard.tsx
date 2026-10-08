import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { prefersReducedMotion } from '../lib/hooks';

const BARS = [3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 3, 2, 1, 4, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2];

/** Cartão de identificação pendurado numa fita. Pêndulo amortecido + flip 3D. */
export default function LanyardCard() {
  const { t } = useLanguage();
  const swingRef = useRef<HTMLDivElement | null>(null);
  const [flipped, setFlipped] = useState(false);
  const state = useRef({ angle: 0, vel: 0, lastX: 0 });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const tick = (time: number) => {
      const s = state.current;
      const idle = Math.sin(time / 1700) * 1.1; // balanço suave em repouso
      s.vel += (idle - s.angle) * 0.012;      // mola
      s.vel *= 0.965;                          // amortecimento
      s.angle += s.vel;
      if (swingRef.current) swingRef.current.style.transform = `rotate(${s.angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const s = state.current;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.vel += Math.max(-4, Math.min(4, dx)) * 0.05; // velocidade -> ângulo
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  const rows = [
    [t('about.location'), t('about.locationValue')],
    [t('about.education'), t('about.educationValue')],
    [t('about.languages'), t('about.languagesValue')],
  ];
  const strap = `${t('about.name')} · ${t('about.role')} · `;

  return (
    <div className="relative mx-auto h-[540px] w-[320px] max-w-full" onPointerMove={onMove}>
      <div ref={swingRef} className="absolute inset-x-0 top-0 mx-auto w-[300px]" style={{ transformOrigin: '50% 0' }}>
        {/* Fita */}
        <div className="relative mx-auto h-[56px] w-[30px] overflow-hidden bg-foreground">
          <div
            className="absolute left-0 top-0 flex w-full justify-center whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-background"
            style={{ writingMode: 'vertical-rl', animation: 'mz-strap 14s linear infinite' }}
            aria-hidden="true"
          >
            {strap}{strap}{strap}
          </div>
        </div>
        {/* Mola metálica */}
        <div className="mx-auto h-4 w-9 rounded-b-md border border-foreground/25 bg-muted" />
        <div className="mx-auto h-3 w-1 bg-muted-foreground/60" />

        {/* Cartão */}
        <div
          role="button"
          tabIndex={0}
          aria-label={t('about.flip')}
          aria-pressed={flipped}
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={onKey}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={() => setFlipped(false)}
          className="relative mx-auto h-[404px] w-[300px] cursor-pointer rounded-[24px] [perspective:1200px] focus-visible:outline-offset-4"
        >
          <div
            className="relative h-full w-full transition-transform duration-[900ms]"
            style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none', transitionTimingFunction: 'var(--ease)' }}
          >
            {/* Frente */}
            <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[24px] border border-foreground/10 bg-card shadow-[0_30px_70px_-28px_rgba(0,0,0,0.4)]" style={{ backfaceVisibility: 'hidden' }}>
              <div className="bg-foreground py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-background">
                {t('about.idBand')}
              </div>
              <div className="flex flex-1 flex-col items-center px-6 pt-5">
                <div className="grid h-[164px] w-[136px] place-items-center rounded-full border border-foreground/15 bg-secondary p-1 shadow-[0_0_0_6px_hsl(var(--secondary))]">
                  <img src="/profile10.png" alt={t('about.name')} className="h-[156px] w-[128px] rounded-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <p className="mt-4 text-center text-xl font-bold leading-tight tracking-tight">{t('about.name')}</p>
                <p className="mt-1 text-center text-[11px] leading-snug text-muted-foreground">{t('about.role')}</p>
                <dl className="mt-3 w-full space-y-1 font-mono text-[10px] uppercase tracking-wide">
                  {rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-foreground/10 pb-1">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="truncate text-right text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex items-end justify-between px-6 pb-5">
                <div className="flex h-9 items-end gap-[2px]" aria-hidden="true">
                  {BARS.map((w, i) => (
                    <span key={i} className="h-full bg-foreground" style={{ width: w }} />
                  ))}
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-foreground/20 bg-secondary" aria-hidden="true">
                  <span className="h-6 w-6 rounded-full border border-foreground/30" />
                </span>
              </div>
            </div>

            {/* Verso */}
            <div
              className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[24px] border border-foreground/10 bg-foreground p-7 text-background shadow-[0_30px_70px_-28px_rgba(0,0,0,0.4)]"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-60">{t('about.whatIAm')}</p>
                <ul className="mt-5 space-y-3 text-[15px] leading-snug">
                  <li>{t('about.role')}</li>
                  <li>{t('about.educationValue')}</li>
                  <li>Z-Systems</li>
                  <li>{t('about.languagesValue')}</li>
                  <li>{t('about.locationValue')}</li>
                </ul>
              </div>
              <div>
                <p className="font-serif text-3xl italic opacity-90">Mauro Zibane</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                  {t('about.ifFound')} · maurobernardozibane@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes mz-strap{from{transform:translateY(0)}to{transform:translateY(-33.333%)}}`}</style>
    </div>
  );
}
