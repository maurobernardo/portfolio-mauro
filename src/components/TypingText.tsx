import { useEffect, useState } from 'react';

type TypingTextProps = {
  text: string;
  speedMs?: number;
  className?: string;
};

export default function TypingText({ text, speedMs = 80, className }: TypingTextProps) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speedMs);
    return () => clearInterval(id);
  }, [text, speedMs]);

  return (
    <span className={[
      'inline-block relative before:absolute before:inset-0 before:animate-typewriter before:bg-background after:absolute after:inset-y-0 after:right-0 after:w-[0.125em] after:animate-blink after:bg-foreground',
      className ?? '',
    ].join(' ').trim()}>
      {display}
    </span>
  );
}




