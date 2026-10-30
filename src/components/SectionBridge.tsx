import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/hooks';
import { clamp, inOut, out, seg } from './ReelPlayer';

export type BridgeItem = { kind: 'photo'; src: string } | { kind: 'icon'; src: string; label: string } | { kind: 'word'; label: string };

/**
 * Passagem entre secções: um flash curto (cerca de 1 s), por tempo e não por scroll.
 * Toca uma única vez, só a descer, quando o topo da secção seguinte entra no ecrã.
 * Não ocupa espaço na página, não bloqueia o scroll e não toca a subir.
 */
type Content = { items: BridgeItem[]; a: string; b: string };

const DURATION = 1000;

export default function SectionBridge({ items, a, b }: Content & { back?: Content; height?: string }) {
  const marker = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState<number | null>(null);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    const el = marker.current;
    if (reduce || !el) return;
    let raf = 0;
    let lastY = window.scrollY;
    let armed = true;
    const play = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const x = Math.min(1, (now - t0) / DURATION);
        setP(x);
        if (x < 1) raf = requestAnimationFrame(tick);
        else setP(null);
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(
      ([e]) => {
        const down = window.scrollY > lastY;
        lastY = window.scrollY;
        // Entra pelo fundo do ecrã a descer: toca. Sai por baixo (voltou a subir): rearma.
        if (e.isIntersecting && down && armed) {
          armed = false;
          play();
        } else if (!e.isIntersecting && e.boundingClientRect.top > 0) {
          armed = true;
        }
      },
      { rootMargin: '0px 0px -20% 0px' }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const show = { items, a, b };
  const q = p ?? 0;
  const burst = out(seg(q, 0.0, 0.4));
  const through = inOut(seg(q, 0.45, 0.9));
  const n = Math.min(14, show.items.length);

  return (
    <div ref={marker} className="relative h-0" aria-hidden="true">
      {p !== null && (
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" style={{ background: `hsl(var(--background) / ${0.55 * Math.min(seg(q, 0, 0.2), 1 - seg(q, 0.5, 0.85))})` }}>
        {show.items.slice(0, 14).map((it, i) => {
          // Ângulo de ouro: espalha os elementos de forma uniforme sem parecer grelha.
          const ang = i * 2.39996;
          const dist = (0.25 + ((i * 37) % 10) / 14) * burst;
          const depth = 0.7 + ((i * 53) % 7) / 10;
          const style = {
            transform: `translate(-50%, -50%) translate(${Math.cos(ang) * dist * 55}vw, ${Math.sin(ang) * dist * 48}svh) rotate(${(1 - burst) * (i % 2 ? 25 : -25) + Math.sin(ang) * 8}deg) scale(${(0.3 + burst * 0.7) * (1 + through * 1.6 * depth)})`,
            opacity: 0.9 * seg(q, 0.0 + (i / n) * 0.05, 0.08 + (i / n) * 0.05) * (1 - seg(q, 0.6, 0.85)),
            zIndex: Math.round(depth * 10),
          };
          const base = 'absolute left-1/2 top-1/2';
          if (it.kind === 'photo')
            return <img key={i} src={it.src} alt="" className={`${base} rounded-[6px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]`} style={{ ...style, height: `${16 * depth}svh`, width: 'auto' }} />;
          if (it.kind === 'icon')
            return (
              <div key={i} className={`${base} flex items-center gap-3 rounded-2xl border border-foreground/10 bg-card px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]`} style={style}>
                <img src={it.src} alt="" style={{ height: `${5 * depth}svh`, width: 'auto' }} />
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-wider">{it.label}</span>
              </div>
            );
          return (
            <span
              key={i}
              className={`${base} whitespace-nowrap font-bold leading-none tracking-[-0.06em] ${i % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_hsl(var(--foreground)/0.5)]' : 'text-foreground/80'}`}
              style={{ ...style, fontSize: `${7 * depth}svh` }}
            >
              {it.label}
            </span>
          );
        })}
        <div className="absolute inset-0 z-20 grid place-items-center px-[var(--gutter)]">
          <p
            className="text-center text-[clamp(36px,7vw,110px)] font-bold leading-[0.9] tracking-[-0.06em] text-foreground"
            style={{
              textShadow: '0 0 40px hsl(var(--background)), 0 0 12px hsl(var(--background))',
              transform: `scale(${0.75 + burst * 0.25 + through * through * 4})`,
              opacity: seg(q, 0.04, 0.2) * (1 - seg(q, 0.6, 0.85)),
            }}
          >
            {show.a}
            <br />
            <span className="font-serif font-normal italic text-muted-foreground">{show.b}</span>
          </p>
        </div>
      </div>
      )}
    </div>
  );
}
