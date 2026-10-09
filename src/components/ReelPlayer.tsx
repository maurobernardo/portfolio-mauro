import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { createReelAudio, Mood, ReelAudio } from '../lib/reelAudio';
import { useLanguage } from '../contexts/LanguageContext';
import { prefersReducedMotion } from '../lib/hooks';

/* Filmes "rodados" em código: uma linha do tempo de cenas, cada uma desenhada a partir do seu tempo local. */

export const clamp = (v: number) => Math.min(1, Math.max(0, v));
export const seg = (s: number, a: number, b: number) => clamp((s - a) / (b - a));
export const out = (x: number) => 1 - Math.pow(1 - x, 4); // ease-out quart
export const inOut = (x: number) => (x < 0.5 ? 8 * x ** 4 : 1 - Math.pow(-2 * x + 2, 4) / 2);
export const pad = (n: number) => String(n).padStart(2, '0');

export type Scene = { key: string; dur: number; draw: (s: number) => ReactNode };
export type Cue = { cut?: 'whoosh' | 'hit'; type?: number };

/** Texto que sobe de dentro de uma máscara. */
export function Rise({ q, children, className = '', style }: { q: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  const e = out(q);
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`} style={style}>
      <span className="inline-block" style={{ transform: `translateY(${(1 - e) * 110}%)` }}>{children}</span>
    </span>
  );
}

/** Palco largo (16:9) a partir de 640px; abaixo é vertical (4:5). */
export function useWide() {
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 640px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const on = () => setWide(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return wide;
}

const TONES = {
  dark: {
    stage: 'bg-[#0a0a0a] text-white',
    bar: 'from-black/80',
    label: 'text-white/50',
    solid: 'bg-white text-black',
    ring: 'border-white/30 hover:bg-white hover:text-black',
    track: 'bg-white/25',
    fill: 'bg-white',
    time: 'text-white/70',
    vignette: 'bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]',
    flash: 'bg-white',
  },
  paper: {
    stage: 'bg-[#efebe4] text-[#0d0d0d]',
    bar: 'from-[#efebe4]/95',
    label: 'text-black/45',
    solid: 'bg-[#0d0d0d] text-[#efebe4]',
    ring: 'border-black/25 hover:bg-[#0d0d0d] hover:text-[#efebe4]',
    track: 'bg-black/15',
    fill: 'bg-[#0d0d0d]',
    time: 'text-black/60',
    vignette: 'bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(60,45,25,0.18))]',
    flash: 'bg-black',
  },
};

type Props = {
  scenes: Scene[];
  label: string;
  tone?: keyof typeof TONES;
  mood?: Mood;
  cue?: (key: string) => Cue;
  /** Desenhado por cima da cena 'outro' (botões clicáveis). */
  outro?: (local: number, replay: () => void) => ReactNode;
};

export default function ReelPlayer({ scenes, label, tone = 'dark', mood = 'beat', cue, outro }: Props) {
  const { t } = useLanguage();
  const c = TONES[tone];
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [time, setTime] = useState(0);
  const [wantPlay, setWantPlay] = useState(() => !prefersReducedMotion());
  const [inView, setInView] = useState(false);
  // Som ligado por defeito; o browser só deixa tocar depois do primeiro gesto do visitante.
  const [soundOn, setSoundOn] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const audioRef = useRef<ReelAudio | null>(null);
  const unlockedAt = useRef(0);
  const playing = wantPlay && inView;

  const starts = useMemo(() => {
    let acc = 0;
    return scenes.map((sc) => {
      const a = acc;
      acc += sc.dur;
      return a;
    });
  }, [scenes]);
  const total = starts[starts.length - 1] + scenes[scenes.length - 1].dur;

  // Só reproduz com o palco visível (25%: no telemóvel deitado o palco é mais alto que o ecrã).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      setTime((v) => (v + dt) % total);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total]);

  let idx = starts.findIndex((a, i) => time >= a && time < a + scenes[i].dur);
  if (idx < 0) idx = 0;
  const local = time - starts[idx];
  const sceneKey = scenes[idx].key;

  // Som: só arranca com um clique (regra dos browsers) e segue o play/pause e os cortes.
  useEffect(() => {
    if (unlocked) return;
    const unlock = () => {
      if (!audioRef.current) audioRef.current = createReelAudio(mood);
      unlockedAt.current = performance.now();
      setUnlocked(true);
    };
    const evs = ['pointerdown', 'keydown', 'touchend'] as const;
    evs.forEach((e) => window.addEventListener(e, unlock, { once: true }));
    return () => evs.forEach((e) => window.removeEventListener(e, unlock));
  }, [unlocked, mood]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (soundOn && playing) a.start();
    else a.stop();
  }, [soundOn, playing, unlocked]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !soundOn || !playing || !cue) return;
    const q = cue(sceneKey);
    if (q.cut) a.cut(q.cut);
    if (q.type) a.type(q.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneKey]);

  useEffect(() => () => audioRef.current?.close(), []);

  const toggleSound = () => {
    if (!audioRef.current) audioRef.current = createReelAudio(mood);
    setUnlocked(true);
    // O primeiro clique no botão só desbloqueia o som (que já estava ligado); não o desliga.
    if (performance.now() - unlockedAt.current > 400) setSoundOn((v) => !v);
    setWantPlay(true);
  };
  // Corte com flash no início de cada cena.
  const flash = idx > 0 ? 1 - seg(local, 0, 0.12) : 0;
  const mmss = (v: number) => `${pad(Math.floor(v / 60))}:${pad(Math.floor(v % 60))}`;

  return (
    <div
      ref={stageRef}
      className={`group relative aspect-[4/5] w-full select-none overflow-hidden rounded-[20px] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] sm:aspect-video sm:rounded-[32px] ${c.stage}`}
      style={{ containerType: 'inline-size' }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('[data-ctl]')) return;
        setWantPlay((v) => !v);
      }}
      role="region"
      aria-label={label}
    >
      <div key={sceneKey} className="absolute inset-0">{scenes[idx].draw(local)}</div>

      <div className={`pointer-events-none absolute inset-0 ${c.vignette}`} />
      <div className={`pointer-events-none absolute inset-0 ${c.flash}`} style={{ opacity: flash * 0.18 }} />
      <div className={`pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-[3cqw] py-[2cqw] font-mono text-[max(9px,1.1cqw)] uppercase tracking-[0.3em] ${c.label}`}>
        <span>MZ — {label}</span>
        <span>{pad(idx + 1)} / {pad(scenes.length)}</span>
      </div>

      {sceneKey === 'outro' && outro && <div data-ctl>{outro(local, () => setTime(0))}</div>}

      {/* Controlos */}
      <div data-ctl className={`absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t to-transparent px-4 pb-4 pt-10 sm:px-6 ${c.bar}`}>
        <button
          onClick={() => setWantPlay((v) => !v)}
          aria-label={wantPlay ? t('reel.pause') : t('reel.play')}
          className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-full transition-transform duration-500 hover:scale-110 ${c.solid}`}
        >
          {wantPlay ? <Pause size={16} /> : <Play size={16} className="translate-x-[1px]" />}
        </button>
        <div className="flex h-6 flex-1 items-center gap-[3px]">
          {scenes.map((sc, i) => {
            const fill = i < idx ? 1 : i === idx ? local / sc.dur : 0;
            return (
              <button key={sc.key} onClick={() => setTime(starts[i])} aria-label={pad(i + 1)} className="relative h-full" style={{ flex: sc.dur }}>
                <span className={`absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full ${c.track}`}>
                  <span className={`block h-full ${c.fill}`} style={{ width: `${fill * 100}%` }} />
                </span>
              </button>
            );
          })}
        </div>
        <span className={`font-mono text-[11px] tabular-nums ${c.time}`}>{mmss(time)} / {mmss(total)}</span>
        <button
          onClick={toggleSound}
          aria-label={soundOn ? t('reel.soundOff') : t('reel.soundOn')}
          aria-pressed={soundOn}
          className={`relative grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border transition-colors duration-500 ${soundOn ? c.solid : c.ring}`}
        >
          {(!soundOn || !unlocked) && <span className="absolute inset-0 animate-ping rounded-full border border-current opacity-40" />}
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {!wantPlay && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/30">
          <span className={`grid h-20 w-20 place-items-center rounded-full shadow-2xl ${c.solid}`}>
            <Play size={28} className="translate-x-[2px]" />
          </span>
        </div>
      )}
    </div>
  );
}
