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

        <ol ref={listRef} className="relative mx-auto max-w-4xl pl-10 sm:pl-14">
          <span aria-hidden="true" className="absolute bottom-0 left-[11px] top-2 w-px bg-foreground/10 sm:left-[15px]" />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[11px] top-2 w-px origin-top bg-foreground sm:left-[15px]"
            style={{ transform: `scaleY(${progress})` }}
          />

          {stops.map((s, i) => {
            const lit = progress * stops.length >= i + 0.4;
            return (
              <li key={i} className="relative pb-12 last:pb-6">
                <span
                  aria-hidden="true"
                  className={`absolute -left-10 top-1.5 h-[22px] w-[22px] rounded-full border-2 bg-background transition-all duration-700 sm:-left-14 sm:h-[30px] sm:w-[30px] ${
                    lit ? 'scale-100 border-foreground bg-foreground' : 'border-foreground/20'
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease)' }}
                />
                <Reveal>
                  <div className={`transition-opacity duration-700 ${lit ? 'opacity-100' : 'opacity-50'}`}>
                    <p className="mz-tag">
                      {s.meta} · {t(s.kind === 'edu' ? 'experience.kindEdu' : 'experience.kindExp')}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">{s.title}</h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">{s.place}</p>
                    {s.detail && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{s.detail}</p>}
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

          <li className="relative">
            <span aria-hidden="true" className="absolute -left-10 top-1.5 h-[22px] w-[22px] rounded-full border-2 border-dashed border-foreground/30 bg-background sm:-left-14 sm:h-[30px] sm:w-[30px]" />
            <Reveal>
              <a href="#contato" className="block rounded-[24px] border border-dashed border-foreground/25 p-6 transition-colors duration-500 hover:border-foreground hover:bg-card">
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
