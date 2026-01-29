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
              return () => clearTimeout(id);
            }
            setVisible(true);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delayMs]);

  const Component = as as any;
  return (
    <Component
      ref={ref}
      className={[
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95',
        className ?? '',
      ].join(' ').trim()}
    >
      {children}
    </Component>
  );
}




