import { PropsWithChildren, useEffect, useRef, useState } from 'react';

type SlideInProps = PropsWithChildren<{
  direction: 'left' | 'right';
  className?: string;
}>;

export default function SlideIn({ direction, className, children }: SlideInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setVisible(true);
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const translateClass = direction === 'left' ? 'translate-x-[-24px]' : 'translate-x-[24px]';

  return (
    <div
      ref={ref}
      className={[
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-x-0' : `opacity-0 ${translateClass}`,
        className ?? '',
      ].join(' ').trim()}
    >
      {children}
    </div>
  );
}



