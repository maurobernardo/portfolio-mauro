import { PropsWithChildren, useEffect, useRef, useState } from 'react';

type RevealProps = PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delayMs?: number;
}>;

export default function Reveal({ children, className, as = 'div', delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              const id = setTimeout(() => setVisible(true), delayMs);
              obs.unobserve(el);
              return () => clearTimeout(id);
            }
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -5% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delayMs]);

  const Component = as as any;
  return (
    <Component
      ref={ref}
      className={[
        'transition-all duration-500 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
        className ?? '',
      ].join(' ').trim()}
    >
      {children}
    </Component>
  );
}




