import Reveal from './Reveal';

/** Etiqueta de secção: cartão arredondado com ponto, como a do hero. Sem travessões. */
export function SectionTag({ no, children }: { no?: string; children: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-foreground/15 bg-card/60 px-5 py-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
      <span className="h-2 w-2 rounded-full bg-foreground" aria-hidden="true" />
      {no && <span className="tabular-nums text-foreground">{no}</span>}
      {children}
    </span>
  );
}

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
        <SectionTag no={no}>{eyebrow}</SectionTag>
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
