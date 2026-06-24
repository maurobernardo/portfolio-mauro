import Reveal from './Reveal';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 mb-12">
      <Reveal>
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#00D9FF] px-4 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/5 backdrop-blur-sm mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delayMs={60}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delayMs={120}>
          <p className="max-w-[700px] text-muted-foreground md:text-lg font-light leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
