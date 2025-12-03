import { useEffect, useState, useRef } from 'react';

type RotatingTextProps = {
  phrases: string[];
  intervalMs?: number;
  className?: string;
};

export default function RotatingText({ phrases, intervalMs = 3000, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [fixedHeight, setFixedHeight] = useState<string>('auto');

  useEffect(() => {
    if (!phrases.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [phrases, intervalMs]);

  // Calcular altura fixa baseada no texto mais longo
  useEffect(() => {
    if (!containerRef.current || !phrases.length) return;
    
    const container = containerRef.current;
    const computedStyle = window.getComputedStyle(container);
    const fontSize = computedStyle.fontSize;
    const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(fontSize) * 1.4;
    
    // Texto mais longo (pode ocupar até 2 linhas)
    const longestPhrase = phrases.reduce((longest, phrase) => 
      phrase.length > longest.length ? phrase : longest, 
      phrases[0]
    );
    
    // Estimar altura para 2 linhas (texto longo pode quebrar)
    const estimatedLines = longestPhrase.length > 25 ? 2 : 1;
    const calculatedHeight = lineHeight * estimatedLines;
    
    setFixedHeight(`${calculatedHeight}px`);
  }, [phrases]);

  return (
    <span 
      ref={containerRef}
      className={['inline-block transition-all duration-500 ease-in-out opacity-100 relative', className ?? ''].join(' ').trim()}
      style={{ 
        minHeight: fixedHeight,
        display: 'inline-block',
        lineHeight: '1.4',
        verticalAlign: 'top'
      }}
      aria-live="polite"
    >
      {phrases[index]}
    </span>
  );
}



