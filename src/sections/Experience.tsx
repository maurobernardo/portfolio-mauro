// Types removed - using translations instead

const educationData = [
  {
    institution: "Universidade Católica de Moçambique",
    periodKey: "education.0.period",
  },
];

const experiencesData = [
  {
    translationKey: 'experience.4',
    bulletCount: 1,
  },
  {
    translationKey: 'experience.3',
    bulletCount: 1,
  },
  {
    translationKey: 'experience.0',
    bulletCount: 1,
  },
  {
    translationKey: 'experience.1',
    bulletCount: 1,
  },
  {
    translationKey: 'experience.2',
    bulletCount: 1,
  },
];

const ciscoCourseKeys = ['experience.cybersecurity', 'experience.ai', 'experience.dataScience', 'experience.hardware'];
const awsCourseKeys = [
  'experience.aws.compute',
  'experience.aws.storage',
  'experience.aws.cloud101',
  'experience.aws.genai',
  'experience.aws.ml',
];

import { PropsWithChildren, ReactNode } from 'react';
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { Award, MapPin, BookOpen, Briefcase } from "lucide-react";
import { useLanguage } from '../contexts/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  return (
    <section id="experiencia" className="relative border-t border-border/70 bg-background py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <SectionHeader eyebrow="Trajetória" title={t('experience.title')} subtitle={t('experience.subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Coluna de Educação */}
          <div>
            <Reveal delayMs={160}>
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-8 text-center lg:text-left">{t('experience.education')}</h3>
            </Reveal>
            <ol className="relative border-l border-border ml-4 md:ml-12 lg:ml-0 lg:text-left">
              {educationData.map((edu, i) => {
                const degree = t(`education.${i}.degree`);
                const institution = t(`education.${i}.institution`);
                const period = t(`education.${i}.period`);
                const description = t(`education.${i}.description`);
                return (
                  <TimelineItem key={i} delayMs={i * 100 + 200} icon={<BookOpen size={14} />} title={degree} meta={period}>
                    <p className="text-sm text-muted-foreground">{institution}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </TimelineItem>
                );
              })}

              <TimelineItem delayMs={300} icon={<Award size={14} />} title={t('experience.ciscoCourses')} meta="2025">
                <p className="text-sm text-muted-foreground mb-3">{t('experience.ciscoInstitution')}</p>
                <TagList items={ciscoCourseKeys.map((k) => t(k))} />
              </TimelineItem>

              <TimelineItem delayMs={360} icon={<Award size={14} />} title={t('experience.awsCourses')} meta="2025">
                <p className="text-sm text-muted-foreground mb-3">{t('experience.awsInstitution')}</p>
                <TagList items={awsCourseKeys.map((k) => t(k))} />
              </TimelineItem>
            </ol>
          </div>

          {/* Coluna de Experiência */}
          <div>
            <Reveal delayMs={240}>
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-8 text-center lg:text-left">{t('experience.experience')}</h3>
            </Reveal>
            <ol className="relative border-l border-border ml-4 md:ml-12 lg:ml-0 lg:text-left">
              {experiencesData.map((exp, i) => {
                const key = exp.translationKey;
                const role = t(`${key}.role`);
                const company = t(`${key}.company`);
                const period = t(`${key}.period`);
                const location = t(`${key}.location`);
                const bullets = Array.from({ length: exp.bulletCount }, (_, idx) => t(`${key}.bullet${idx}`));
                return (
                  <TimelineItem key={i} delayMs={i * 100 + 280} icon={<Briefcase size={14} />} title={role} meta={period}>
                    <p className="text-sm text-muted-foreground">{company}</p>
                    {location && (
                      <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin size={13} /> {location}
                      </p>
                    )}
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </TimelineItem>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Certificações */}
        <div id="certificados" className="mt-16 scroll-mt-24">
          <SectionHeader eyebrow="Certificados" title={t('experience.certifications')} subtitle={t('experience.certificationsSubtitle')} />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificationsData.map((c, i) => {
              const title = t(`certifications.${i}.title`);
              const issuer = t(`certifications.${i}.issuer`);
              const year = t(`certifications.${i}.year`);
              const period = t(`certifications.${i}.period`);
              const skills = Array.from({ length: c.skillCount }, (_, idx) => t(`certifications.${i}.skill${idx}`));
              return (
                <Reveal key={i} delayMs={i * 100 + 520}>
                  <div className="group mz-card h-full flex flex-col overflow-hidden p-0">
                    <div className="mz-card-hover-bg" />
                    {c.image && (
                      <div className="relative z-10 aspect-[16/10] w-full overflow-hidden border-b border-border/70 bg-primary/5">
                        <img
                          src={c.image}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="relative z-10 flex flex-1 flex-col p-5 md:p-6">
                      <div className="mb-3 flex items-start gap-3 text-foreground">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                          <Award size={18} />
                        </span>
                        <div>
                          <p className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-300">{title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{issuer} · {year}</p>
                        </div>
                      </div>
                      {period && (
                        <p className="text-sm text-muted-foreground">{period}</p>
                      )}
                      {skills.length > 0 && <TagList items={skills} className="mt-4" />}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  icon,
  title,
  meta,
  delayMs = 0,
  children,
}: PropsWithChildren<{ icon: ReactNode; title: string; meta: string; delayMs?: number }>) {
  return (
    <li className="relative mb-8 ml-6">
      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-background">
        <span className="text-primary-foreground">{icon}</span>
      </span>
      <Reveal delayMs={delayMs}>
        <div className="group mz-card mz-card-sm">
          <div className="mz-card-accent" />
          <div className="mz-card-hover-bg" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-1 mb-1.5">
              <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">{title}</h4>
              <time className="text-xs font-medium text-muted-foreground flex-shrink-0">{meta}</time>
            </div>
            {children}
          </div>
        </div>
      </Reveal>
    </li>
  );
}

function TagList({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={["flex flex-wrap gap-1.5", className ?? ''].join(' ')}>
      {items.map((s, idx) => (
        <span
          key={idx}
          className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

const certificationsData = [
  {
    year: "Jul 2025",
    periodKey: "certifications.0.period",
    skillCount: 4,
    image: '/mpesa.jpg',
  },
  {
    year: "2025",
    periodKey: "certifications.1.period",
    skillCount: 3,
    image: '/cyber.jpg',
  },
  {
    year: "2025",
    periodKey: "certifications.2.period",
    skillCount: 4,
    image: '/ia2.jpg',
  },
  {
    year: "2025",
    periodKey: "certifications.3.period",
    skillCount: 4,
    image: '/Ciencia.jpg',
  },
  {
    year: "2025",
    periodKey: "certifications.4.period",
    skillCount: 2,
    image: '/Hardware.jpg',
  },
  {
    year: "2024 - 2025",
    periodKey: "certifications.5.period",
    skillCount: 2,
    image: '/strach.jpeg',
  },
];
