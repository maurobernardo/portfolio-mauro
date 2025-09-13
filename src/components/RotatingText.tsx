import { useEffect, useState } from 'react';

type RotatingTextProps = {
  phrases: string[];
  intervalMs?: number;
  className?: string;
};

export default function RotatingText({ phrases, intervalMs = 3000, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!phrases.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [phrases, intervalMs]);

  return (
    <span key={index} className={['inline-block transition-all duration-700 ease-out opacity-100 translate-y-0', className ?? ''].join(' ').trim()}>{phrases[index]}</span>
  );
}



