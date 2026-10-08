import Reveal from './Reveal';

type SectionHeaderProps = {
  no: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

/** Etiqueta mono "03 — Label" + título bold com a última palavra em serifa itálica. */
export default function SectionHeader({ no, eyebrow, title, subtitle, align = 'left' }: SectionHeaderProps) {
  const words = title.trim().split(' ');
  const last = words.pop();
  const rest = words.join(' ');
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`mb-12 flex flex-col gap-4 lg:mb-16 ${alignCls}`}>
      <Reveal>
        <span className="mz-tag">{no} — {eyebrow}</span>
      </Reveal>

      <Reveal delayMs={60}>
        <h2 className="text-4xl font-bold leading-none text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {rest && <>{rest} </>}
          <span className="font-serif font-normal italic text-muted-foreground" style={{ letterSpacing: '-0.02em' }}>{last}</span>
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delayMs={120}>
          <p className="max-w-[640px] text-base leading-relaxed text-muted-foreground md:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
