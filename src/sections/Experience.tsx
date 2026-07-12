// Types removed - using translations instead

const educationData = [
  {
    institution: "Universidade Católica de Moçambique",
    periodKey: "education.0.period",
  },
];

const experiencesData = [
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

import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import SlideIn from "../components/SlideIn";
import { Award, MapPin, BookOpen, Briefcase } from "lucide-react";
import { useLanguage } from '../contexts/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  return (
    <section id="experiencia" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Gradiente de fundo horizontal sutil - similar ao Hero */}
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 0.9) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(2, 6, 23) 0%, rgb(15, 23, 42) 100%)' }} />
      
      {/* Partículas animadas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-24 right-16 w-2 h-2 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '1s', animationDuration: '8s' }} />
        <div className="absolute top-1/2 left-20 w-1.5 h-1.5 bg-[#00D9FF] rounded-full opacity-25 animate-float" style={{ animationDelay: '3s', animationDuration: '10s' }} />
        <div className="absolute bottom-32 right-1/4 w-2.5 h-2.5 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '5s', animationDuration: '9s' }} />
      </div>
      
      {/* Gradientes animados */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-12">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s', animationDuration: '8s' }} />
      </div>
      
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">        <SectionHeader eyebrow="Trajetória" title={t('experience.title')} subtitle={t('experience.subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Coluna de Educação */}
          <div>
            <Reveal delayMs={160}>
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-8 text-center lg:text-left">{t('experience.education')}</h3>
            </Reveal>
            <ol className="relative border-l border-muted-foreground/30 ml-4 md:ml-12 lg:ml-0 lg:text-left">
              {educationData.map((edu, i) => {
                const degree = t(`education.${i}.degree`);
                const institution = t(`education.${i}.institution`);
                const period = t(`education.${i}.period`);
                const description = t(`education.${i}.description`);
                return (
                  <li key={i} className="mb-10 ml-6">
                    <Reveal delayMs={i * 100 + 200}>
                      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-background">
                        <BookOpen size={16} className="text-primary-foreground" />
                      </span>
                      <div className="group mz-card mz-card-sm">
                        <div className="mz-card-accent" />
                        <div className="mz-card-accent-pulse" />
                        <div className="mz-card-hover-bg" />
                        <div className="mz-card-hover-shine" />
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 relative z-10">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{degree}</h3>
                          <time className="text-sm font-medium text-muted-foreground">{period}</time>
                        </div>
                        <p className="text-muted-foreground relative z-10">{institution}</p>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed relative z-10">{description}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
              
              {/* Card único com todos os cursos da Cisco */}
              <li className="mb-10 ml-6">
                <Reveal delayMs={300}>
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-background">
                    <Award size={16} className="text-primary-foreground" />
                  </span>
                  <div className="group mz-card mz-card-sm">
                    <div className="mz-card-accent" />
                    <div className="mz-card-accent-pulse" />
                    <div className="mz-card-hover-bg" />
                    <div className="mz-card-hover-shine" />
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 relative z-10">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{t('experience.ciscoCourses')}</h3>
                        <time className="text-sm font-medium text-muted-foreground">2025</time>
                    </div>
                    <p className="text-muted-foreground relative z-10 mb-4">{t('experience.ciscoInstitution')}</p>
                    <div className="relative z-10 space-y-2">
                      <p className="text-sm font-semibold text-foreground mb-2">{t('experience.ciscoCompleted')}</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{t('experience.cybersecurity')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{t('experience.ai')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{t('experience.dataScience')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{t('experience.hardware')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>

              {/* Card de cursos AWS Educate */}
              <li className="mb-10 ml-6">
                <Reveal delayMs={360}>
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-background">
                    <Award size={16} className="text-primary-foreground" />
                  </span>
                  <div className="group mz-card mz-card-sm">
                    <div className="mz-card-accent" />
                    <div className="mz-card-accent-pulse" />
                    <div className="mz-card-hover-bg" />
                    <div className="mz-card-hover-shine" />
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 relative z-10">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {t('experience.awsCourses')}
                      </h3>
                      <time className="text-sm font-medium text-muted-foreground">2025</time>
                    </div>
                    <p className="text-muted-foreground relative z-10 mb-4">
                      {t('experience.awsInstitution')}
                    </p>
                    <div className="relative z-10 space-y-2">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        {t('experience.awsCompleted')}
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{t('experience.aws.compute')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{t('experience.aws.storage')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{t('experience.aws.cloud101')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{t('experience.aws.genai')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{t('experience.aws.ml')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            </ol>
          </div>

          {/* Coluna de Experiência */}
          <div>
            <Reveal delayMs={240}>
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-8 text-center lg:text-left">{t('experience.experience')}</h3>
        </Reveal>
            <ol className="relative border-l border-muted-foreground/30 ml-4 md:ml-12 lg:ml-0 lg:text-left">
              {experiencesData.map((exp, i) => {
                const key = exp.translationKey;
                const role = t(`${key}.role`);
                const company = t(`${key}.company`);
                const period = t(`${key}.period`);
                const location = t(`${key}.location`);
                const bullets = Array.from({ length: exp.bulletCount }, (_, idx) => t(`${key}.bullet${idx}`));
                return (
                  <li key={i} className="mb-10 ml-6">
                    <Reveal delayMs={i * 100 + 280}>
                      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-background">
                        <Briefcase size={16} className="text-primary-foreground" />
                      </span>
                      <div className="group mz-card mz-card-sm">
                        <div className="mz-card-accent" />
                        <div className="mz-card-accent-pulse" />
                        <div className="mz-card-hover-bg" />
                        <div className="mz-card-hover-shine" />
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 relative z-10">
                          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">{role}</h3>
                          <time className="text-sm font-medium text-muted-foreground">{period}</time>
                        </div>
                        <p className="text-sm text-muted-foreground relative z-10">{company}</p>
                        {location && (
                          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1 relative z-10">
                            <MapPin size={14} /> {location}
                          </p>
                        )}
                        <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground space-y-2 relative z-10">
                          {bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </li>
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
                    <div className="mz-card-hover-shine" />
                    {c.image && (
                      <div className="relative z-10 aspect-[16/10] w-full overflow-hidden border-b border-primary/15 bg-primary/5">
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
                      {skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {skills.map((s, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-105"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Removido o componente Card não utilizado

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