import { useState } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../contexts/LanguageContext';

const certificationsData = [
  { skillCount: 4, image: '/mpesa.jpg' },
  { skillCount: 3, image: '/cyber.jpg' },
  { skillCount: 4, image: '/ia2.jpg' },
  { skillCount: 4, image: '/Ciencia.jpg' },
  { skillCount: 2, image: '/Hardware.jpg' },
  { skillCount: 2, image: '/strach.jpeg' },
];

/** Índice numerado; cada linha inunda de tinta da esquerda para a direita. */
export default function Certifications() {
  const { t } = useLanguage();
  const [sel, setSel] = useState(0);

  return (
    <section id="certificados" className="relative border-y border-border/70 bg-card py-[clamp(56px,8vh,96px)]">
      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] gap-12 px-[var(--gutter)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader no="04" eyebrow={t('eyebrow.certifications')} title={t('certs.heading')} subtitle={t('experience.certificationsSubtitle')} />
          <p className="mz-tag">
            {String(certificationsData.length).padStart(2, '0')} {t('certs.count')}
          </p>
          <div className="relative mt-6 hidden aspect-[16/10] overflow-hidden rounded-[24px] border border-foreground/10 bg-secondary lg:block">
            {certificationsData.map((c, i) => (
              <img
                key={c.image}
                src={c.image}
                alt={t(`certifications.${i}.title`)}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: sel === i ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        <ol className="border-t border-foreground/10">
          {certificationsData.map((c, i) => {
            const skills = Array.from({ length: c.skillCount }, (_, k) => t(`certifications.${i}.skill${k}`));
            return (
              <Reveal as="li" key={i} delayMs={i * 60}>
                <button
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onFocus={() => setSel(i)}
                  onClick={() => setSel(i)}
                  className="group relative block w-full overflow-hidden border-b border-foreground/10 px-1 py-6 text-left sm:px-4"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-[700ms] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    style={{ transitionTimingFunction: 'var(--ease)' }}
                  />
                  <span className="relative z-10 flex items-start gap-5 transition-colors duration-500 group-hover:text-background group-focus-visible:text-background">
                    <span className="mz-tag pt-2 text-inherit opacity-60">{String(i + 1).padStart(2, '0')}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xl font-bold leading-tight tracking-tight sm:text-2xl">{t(`certifications.${i}.title`)}</span>
                      <span className="mt-1 block text-sm opacity-70">
                        {t(`certifications.${i}.issuer`)} · {t(`certifications.${i}.year`)}
                      </span>
                      <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider opacity-60">
                        {skills.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="translate-x-[-12px] pt-1 text-2xl opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
