import { PropsWithChildren, useEffect, useRef, useState } from 'react';

type RevealProps = PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delayMs?: number;
}>;

/** Fade + subida de 24px, uma única vez, ao entrar no viewport. */
export default function Reveal({ children, className, as = 'div', delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -5% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Component = as as any;
  return (
    <Component
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms`, transitionTimingFunction: 'var(--ease)' }}
      className={[
        'transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className ?? '',
      ].join(' ').trim()}
    >
      {children}
    </Component>
  );
}
