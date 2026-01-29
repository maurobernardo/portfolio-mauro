// Types removed - using translations instead

const educationData = [
  {
    institution: "Universidade Católica de Moçambique",
    periodKey: "education.0.period",
  },
];

const experiencesData = [
  {
    company: "Anantara Bazaruto Island Resort and SPA",
    periodKey: "experience.0.period",
    locationKey: "experience.0.location",
    bulletCount: 1,
  },
  {
    company: "Vodacom Mocambique",
    periodKey: "experience.1.period",
    bulletCount: 4,
  },
];

import Reveal from "../components/Reveal";
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
      
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">{t('experience.title')}</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t('experience.subtitle')}
            </p>
          </Reveal>
        </div>

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
                      <div className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                        {/* Borda vertical azul ciano na esquerda */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                        
                        {/* Efeito de brilho animado na borda */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-60 animate-pulse" />
                        
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
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
                  <div className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    {/* Borda vertical azul ciano na esquerda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                    
                    {/* Efeito de brilho animado na borda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-60 animate-pulse" />
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
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
            </ol>
          </div>

          {/* Coluna de Experiência */}
          <div>
            <Reveal delayMs={240}>
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-8 text-center lg:text-left">{t('experience.experience')}</h3>
        </Reveal>
            <ol className="relative border-l border-muted-foreground/30 ml-4 md:ml-12 lg:ml-0 lg:text-left">
              {experiencesData.map((exp, i) => {
                const role = t(`experience.${i}.role`);
                const company = t(`experience.${i}.company`);
                const period = t(`experience.${i}.period`);
                const location = exp.locationKey ? t(exp.locationKey) : null;
                const bullets = Array.from({ length: exp.bulletCount }, (_, idx) => t(`experience.${i}.bullet${idx}`));
                return (
                  <li key={i} className="mb-10 ml-6">
                    <Reveal delayMs={i * 100 + 280}>
                      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-background">
                        <Briefcase size={16} className="text-primary-foreground" />
                      </span>
                      <div className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                        {/* Borda vertical azul ciano na esquerda */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                        
                        {/* Efeito de brilho animado na borda */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-60 animate-pulse" />
                        
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 relative z-10">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{role}</h3>
                          <time className="text-sm font-medium text-muted-foreground">{period}</time>
                        </div>
                        <p className="text-muted-foreground relative z-10">{company}</p>
                        {location && (
                          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1 relative z-10">
                            <MapPin size={14} /> {location}
                          </p>
                        )}
                        <ul className="mt-4 list-disc pl-5 text-muted-foreground space-y-2 relative z-10">
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
        <div className="mt-16">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Reveal delayMs={360}>
              <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">{t('experience.certifications')}</h3>
        </Reveal>
            <Reveal delayMs={440}>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {t('experience.certificationsSubtitle')}
              </p>
            </Reveal>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificationsData.map((c, i) => {
              const title = t(`certifications.${i}.title`);
              const issuer = t(`certifications.${i}.issuer`);
              const year = t(`certifications.${i}.year`);
              const period = t(`certifications.${i}.period`);
              const skills = Array.from({ length: c.skillCount }, (_, idx) => t(`certifications.${i}.skill${idx}`));
              return (
                <Reveal key={i} delayMs={i * 100 + 520}>
                  <div className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col hover:-translate-y-2 overflow-hidden">
                    {/* Borda vertical azul ciano na esquerda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                    
                    {/* Efeito de brilho animado na borda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-60 animate-pulse" />
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                    <div className="flex items-center gap-3 text-foreground mb-3 relative z-10">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Award size={20} />
                      </span>
                      <p className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-300">{title}</p>
                    </div>
                    <p className="text-muted-foreground relative z-10">{issuer} · {year}</p>
                    {period && (
                      <p className="mt-1 text-sm text-muted-foreground relative z-10">{period}</p>
                    )}
                    {skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 relative z-10">
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
                    {c.image && (
                      <img
                        src={c.image}
                        alt={title}
                        className="mt-4 w-full h-auto object-contain rounded-md relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    )}
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
];
