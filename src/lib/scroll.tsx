import { useEffect } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from './hooks';

let lenis: Lenis | null = null;

export function scrollToTarget(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 1.2 });
  else el.scrollIntoView({ behavior: 'auto' });
}

export function lockScroll(lock: boolean) {
  if (lock) lenis?.stop();
  else lenis?.start();
  document.body.style.overflow = lock ? 'hidden' : '';
}

/** Lenis para scroll suave + interceta links #âncora. Desligado com prefers-reduced-motion. */
export function useSmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      const href = a?.getAttribute('href');
      if (!a || !href || href === '#') return;
      e.preventDefault();
      history.replaceState(null, '', href);
      scrollToTarget(href);
    };
    document.addEventListener('click', onClick);

    let raf = 0;
    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.1 });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}
