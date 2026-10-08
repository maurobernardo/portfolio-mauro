import { useRef } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SectionPattern from '../components/SectionPattern';
import { useScrollProgress } from '../lib/hooks';
import { useLanguage } from '../contexts/LanguageContext';

const ciscoCourseKeys = ['experience.cybersecurity', 'experience.ai', 'experience.dataScience', 'experience.hardware'];
const awsCourseKeys = ['experience.aws.compute', 'experience.aws.storage', 'experience.aws.cloud101', 'experience.aws.genai', 'experience.aws.ml'];

type Stop = {
  kind: 'edu' | 'exp';
  sort: number;
  title: string;
  meta: string;
  place: string;
  detail?: string;
  tags?: string[];
};

/** Formação e experiência no mesmo caminho, por ordem cronológica. */
export default function Experience() {
  const { t } = useLanguage();
  const listRef = useRef<HTMLOListElement | null>(null);
  const progress = useScrollProgress(listRef, 0.65);

  const exp = (i: number, sort: number): Stop => {
    const k = `experience.${i}`;
    const loc = t(`${k}.location`);
    return {
      kind: 'exp',
      sort,
      title: t(`${k}.role`),
      meta: t(`${k}.period`),
      place: loc ? `${t(`${k}.company`)} · ${loc}` : t(`${k}.company`),
      detail: t(`${k}.bullet0`),
    };
  };

  const raw: Stop[] = [
    { kind: 'edu', sort: 2023.0, title: t('education.0.degree'), meta: t('education.0.period'), place: t('education.0.institution'), detail: t('education.0.description') },
    exp(0, 2023.9),
    { kind: 'edu', sort: 2025.1, title: t('experience.ciscoCourses'), meta: '2025', place: t('experience.ciscoInstitution'), tags: ciscoCourseKeys.map((k) => t(k)) },
    { kind: 'edu', sort: 2025.2, title: t('experience.awsCourses'), meta: '2025', place: t('experience.awsInstitution'), tags: awsCourseKeys.map((k) => t(k)) },
    exp(2, 2026.0),
    exp(1, 2026.05),
    exp(3, 2026.3),
    exp(4, 2026.5),
  ];
  const stops = raw.sort((a, b) => a.sort - b.sort);

  return (
    <section id="experiencia" className="relative border-t border-border/70 py-[clamp(56px,8vh,96px)]">
      <SectionPattern />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <SectionHeader no="05" eyebrow={t('eyebrow.experience')} title={t('experience.title')} subtitle={t('experience.subtitle')} />

        <ol ref={listRef} className="relative mx-auto max-w-6xl [--yw:0px] sm:[--yw:190px] lg:[--yw:280px]">
          <span aria-hidden="true" className="absolute bottom-0 left-[14px] top-2 w-px bg-foreground/10 sm:left-[calc(var(--yw)+14px)]" />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[14px] top-2 w-px origin-top bg-foreground sm:left-[calc(var(--yw)+14px)]"
            style={{ transform: `scaleY(${progress})` }}
          />

          {stops.map((s, i) => {
            const lit = progress * stops.length >= i + 0.4;
            const year = s.meta.match(/\d{4}/)?.[0] ?? s.meta;
            const kind = t(s.kind === 'edu' ? 'experience.kindEdu' : 'experience.kindExp');
            return (
              <li key={i} className="relative grid gap-4 pb-16 pl-12 last:pb-8 sm:grid-cols-[var(--yw)_minmax(0,1fr)] sm:gap-0 sm:pl-0">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-3 h-[30px] w-[30px] rounded-full border-2 transition-all duration-700 sm:left-[var(--yw)] sm:top-5 ${
                    lit ? 'border-foreground bg-foreground' : 'border-foreground/25 bg-background'
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease)' }}
                />

                {/* Ano em destaque */}
                <Reveal className="sm:pr-10 sm:text-right">
                  <p
                    className={`text-6xl font-bold leading-[0.9] tracking-[-0.06em] transition-colors duration-700 sm:text-7xl lg:text-[7rem] ${
                      lit ? 'text-foreground' : 'text-foreground/20'
                    }`}
                  >
                    {year}
                  </p>
                  <p className="mz-tag mt-3">{s.meta}</p>
                  <p className="mz-tag mt-1 text-foreground">{kind}</p>
                </Reveal>

                <Reveal delayMs={80}>
                  <div className={`transition-opacity duration-700 sm:pl-12 sm:pt-3 ${lit ? 'opacity-100' : 'opacity-50'}`}>
                    <h3 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">{s.title}</h3>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">{s.place}</p>
                    {s.detail && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{s.detail}</p>}
                    {s.tags && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {s.tags.map((tag) => (
                          <li key={tag} className="rounded-full border border-foreground/10 bg-card px-3 py-1 text-xs font-medium">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}

          <li className="relative grid gap-4 pl-12 sm:grid-cols-[var(--yw)_minmax(0,1fr)] sm:gap-0 sm:pl-0">
            <span aria-hidden="true" className="absolute left-0 top-3 h-[30px] w-[30px] rounded-full border-2 border-dashed border-foreground/30 bg-background sm:left-[var(--yw)] sm:top-5" />
            <Reveal className="sm:pr-10 sm:text-right">
              <p className="text-6xl font-bold leading-[0.9] tracking-[-0.06em] text-foreground/20 sm:text-7xl lg:text-[7rem]">
                <span className="font-serif font-normal italic">→</span>
              </p>
            </Reveal>
            <Reveal delayMs={80}>
              <a href="#contato" className="block rounded-[24px] border border-dashed border-foreground/25 p-6 transition-colors duration-500 hover:border-foreground hover:bg-card sm:ml-12">
                <p className="mz-tag">{t('experience.next')} —</p>
                <p className="mt-2 text-2xl font-bold sm:text-3xl">
                  <span className="font-serif font-normal italic text-muted-foreground">{t('experience.nextTitle')}</span>
                </p>
              </a>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}
