import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/hooks';
import { lockScroll } from '../lib/scroll';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsMeta } from '../lib/projects';
import { certificationsData } from '../sections/Certifications';
import { highlightsData } from '../sections/Highlights';

/*
 * Entrada: contador 000→100 e o nome a subir letra a letra; as letras saem por cima,
 * uma íris abre do centro e o hero entra (desfoque + zoom) com a barra de navegação a descer.
 * Clique ou tecla salta. Desligada com prefers-reduced-motion.
 */
const COUNT_MS = 2100;
const OUT_AT = 2300;
const IRIS_AT = 2600;
const DONE_AT = 3550;
const SECTIONS = ['eyebrow.about', 'eyebrow.skills', 'eyebrow.projects', 'eyebrow.certifications', 'eyebrow.experience', 'eyebrow.highlights', 'eyebrow.contact'];

export default function Splash() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<'in' | 'out' | 'iris' | 'done'>(() => (prefersReducedMotion() ? 'done' : 'in'));
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (phase === 'done') return;
    lockScroll(true);
    const root = document.documentElement;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const x = Math.min(1, (now - t0) / COUNT_MS);
      setCount(Math.round((1 - Math.pow(1 - x, 3)) * 100));
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const finish = () => {
      setPhase('done');
      lockScroll(false);
    };
    const timers = [
      setTimeout(() => setPhase('out'), OUT_AT),
      setTimeout(() => {
        setPhase('iris');
        root.classList.add('mz-enter');
      }, IRIS_AT),
      setTimeout(finish, DONE_AT),
    ];
    const skip = () => {
      root.classList.add('mz-enter');
      finish();
    };
    window.addEventListener('keydown', skip, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
    };
    // Corre só uma vez, ao abrir.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'done') return null;

  const name = 'MAURO';
  const leaving = phase !== 'in';
  const roles = t('hero.role1').split('|').map((r) => r.trim());
  const role = roles[Math.min(roles.length - 1, Math.floor((count / 100) * roles.length))];
  const city = t('about.locationValue').split(',').slice(-2).join(' ·').trim();
  const clock = new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Maputo', hour12: false });
  const stats = [
    [projectsMeta.length, t('eyebrow.projects')],
    [certificationsData.length, t('eyebrow.certifications')],
    [highlightsData.length, t('eyebrow.highlights')],
  ] as const;
  const fade = { opacity: leaving ? 0 : 1, transition: 'opacity .45s' };
  const R = 46;
  const C = 2 * Math.PI * R;

  return (
    <div
      className="fixed inset-0 z-[200] cursor-pointer bg-foreground text-background"
      onClick={() => {
        document.documentElement.classList.add('mz-enter');
        setPhase('done');
        lockScroll(false);
      }}
      style={
        phase === 'iris'
          ? {
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent var(--mz-r), #000 calc(var(--mz-r) + 1px))',
              maskImage: 'radial-gradient(circle at 50% 50%, transparent var(--mz-r), #000 calc(var(--mz-r) + 1px))',
              animation: 'mz-iris 0.95s cubic-bezier(.7,0,.2,1) forwards',
            }
          : undefined
      }
      aria-hidden="true"
    >
      {['left-4 top-20', 'right-4 top-20', 'left-4 bottom-24', 'right-4 bottom-24'].map((pos) => (
        <span key={pos} className={`absolute ${pos} font-mono text-lg opacity-40`} style={fade}>+</span>
      ))}

      {/* Barra de topo */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[var(--gutter)] pt-7 font-mono text-[10px] uppercase tracking-[0.3em] sm:text-[11px]" style={fade}>
        <span>MZ — Portfolio ©{new Date().getFullYear()}</span>
        <span className="hidden opacity-60 sm:inline">19.84°S · 34.85°E</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
          {city} · {clock}
        </span>
      </div>

      {/* Anel de progresso */}
      <svg className="pointer-events-none absolute left-1/2 top-1/2 h-[min(78vmin,640px)] w-[min(78vmin,640px)] -translate-x-1/2 -translate-y-1/2 -rotate-90" viewBox="0 0 100 100" style={fade}>
        <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.25" />
        <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray={C} strokeDashoffset={C * (1 - count / 100)} strokeLinecap="round" />
      </svg>

      {/* Sequência de arranque: secções a carregar */}
      <ul className="absolute left-[var(--gutter)] top-1/2 hidden -translate-y-1/2 space-y-2 font-mono text-[11px] uppercase tracking-[0.25em] lg:block" style={fade}>
        {SECTIONS.map((k, i) => {
          const ok = count >= ((i + 1) / SECTIONS.length) * 100 - 2;
          return (
            <li key={k} className="flex items-center gap-3 transition-opacity duration-300" style={{ opacity: ok ? 1 : 0.25 }}>
              <span className="w-5 tabular-nums opacity-50">{String(i + 1).padStart(2, '0')}</span>
              {t(k)}
              <span className="opacity-70">{ok ? '✓' : '…'}</span>
            </li>
          );
        })}
      </ul>

      {/* Números reais */}
      <div className="absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 space-y-5 text-right lg:block" style={fade}>
        {stats.map(([n, label], i) => (
          <div key={label}>
            <p className="text-4xl font-bold tabular-nums leading-none tracking-[-0.05em]">{String(Math.round(n * Math.min(1, count / (60 + i * 15)))).padStart(2, '0')}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">{label}</p>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="flex justify-center overflow-hidden text-[clamp(64px,17vw,260px)] font-extrabold leading-[0.85] tracking-[-0.06em]">
            {name.split('').map((ch, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: leaving
                    ? `mz-up-out 0.5s cubic-bezier(.7,0,.2,1) ${i * 0.04}s both`
                    : `mz-up-in 0.8s cubic-bezier(.16,1,.3,1) ${0.15 + i * 0.07}s both`,
                }}
              >
                {ch}
              </span>
            ))}
          </p>
          <p className="mt-2 overflow-hidden font-serif text-[clamp(28px,6vw,84px)] italic leading-none opacity-70">
            <span
              className="inline-block"
              style={{ animation: leaving ? 'mz-up-out 0.5s cubic-bezier(.7,0,.2,1) 0.15s both' : 'mz-up-in 0.9s cubic-bezier(.16,1,.3,1) 0.55s both' }}
            >
              Zibane
            </span>
          </p>
          <p className="mt-6 h-5 overflow-hidden font-mono text-[11px] uppercase tracking-[0.35em] sm:text-xs" style={fade}>
            <span key={role} className="inline-block" style={{ animation: 'mz-up-in .45s cubic-bezier(.16,1,.3,1) both' }}>
              {role}
            </span>
          </p>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 flex items-end justify-between px-[var(--gutter)] pb-8 font-mono text-[11px] uppercase tracking-[0.3em]"
        style={{ opacity: leaving ? 0 : 1, transition: 'opacity .4s' }}
      >
        <span className="max-w-[45%] leading-relaxed opacity-60">
          {t('splash.loading')}
          <br />
          <span className="opacity-70">{t('splash.skip')}</span>
        </span>
        <span className="text-[clamp(40px,7vw,96px)] font-bold tabular-nums leading-none tracking-[-0.05em]">{String(count).padStart(3, '0')}</span>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] bg-background" style={{ width: `${count}%` }} />

      <style>{`
        @keyframes mz-up-in{from{transform:translateY(105%)}to{transform:none}}
        @keyframes mz-up-out{to{transform:translateY(-110%)}}
        @property --mz-r{syntax:'<length>';inherits:false;initial-value:0px}
        @keyframes mz-iris{from{--mz-r:0px}80%{opacity:1}to{--mz-r:120vmax;opacity:0}}
      `}</style>
    </div>
  );
}
