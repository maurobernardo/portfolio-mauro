import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/hooks';
import { clamp, inOut, out, seg } from './ReelPlayer';

export type BridgeItem = { kind: 'photo'; src: string } | { kind: 'icon'; src: string; label: string } | { kind: 'word'; label: string };

/**
 * Passagem entre secções controlada pelo scroll: os elementos da secção seguinte explodem do centro,
 * a frase cresce até a câmara "atravessar" as letras e tudo se dissolve no fundo.
 */
export default function SectionBridge({ items, a, b, height = '170svh' }: { items: BridgeItem[]; a: string; b: string; height?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const calc = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Só recalcula perto do ecrã.
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      setP(clamp(-r.top / (r.height - window.innerHeight)));
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [reduce]);

  if (reduce) return null;

  const burst = out(seg(p, 0.05, 0.55));
  const through = inOut(seg(p, 0.6, 1));
  const n = items.length;

  return (
    // A margem negativa sobrepõe o último ecrã da ponte ao início da secção seguinte:
    // quando a câmara atravessa as letras, o fundo fica transparente e a secção já está lá por baixo.
    <div ref={ref} className="pointer-events-none relative z-30" style={{ height, marginBottom: '-100svh' }} aria-hidden="true">
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ background: `hsl(var(--background) / ${1 - seg(p, 0.55, 0.92)})` }}>
        {items.map((it, i) => {
          // Ângulo de ouro: espalha os elementos de forma uniforme sem parecer grelha.
          const ang = i * 2.39996;
          const dist = (0.25 + ((i * 37) % 10) / 14) * burst;
          const depth = 0.7 + ((i * 53) % 7) / 10;
          const style = {
            transform: `translate(-50%, -50%) translate(${Math.cos(ang) * dist * 55}vw, ${Math.sin(ang) * dist * 48}svh) rotate(${(1 - burst) * (i % 2 ? 25 : -25) + Math.sin(ang) * 8}deg) scale(${(0.3 + burst * 0.7) * (1 + through * 3 * depth)})`,
            opacity: seg(p, 0.02 + (i / n) * 0.08, 0.1 + (i / n) * 0.08) * (1 - seg(p, 0.75, 0.95)),
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
            className="text-center text-[clamp(44px,9vw,150px)] font-bold leading-[0.9] tracking-[-0.06em] text-foreground"
            style={{
              textShadow: '0 0 40px hsl(var(--background)), 0 0 12px hsl(var(--background))',
              transform: `scale(${0.75 + burst * 0.25 + through * through * 14})`,
              opacity: seg(p, 0.08, 0.3) * (1 - seg(p, 0.8, 0.97)),
            }}
          >
            {a}
            <br />
            <span className="font-serif font-normal italic text-muted-foreground">{b}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
