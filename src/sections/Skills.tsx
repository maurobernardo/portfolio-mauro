type Skill = { name: string; svg: string };

const frontendSkills: Skill[] = [
  { name: 'Next.js', svg: '/icons/nextjs.svg' },
  { name: 'React Native', svg: '/icons/react.svg' },
  { name: 'Angular', svg: '/icons/tech/angular.svg' },
  { name: 'Flutter', svg: '/icons/flutter.svg' },
];

const backendSkills: Skill[] = [
  { name: 'Java', svg: '/icons/java.svg' },
  { name: 'Node.js', svg: '/icons/nodejs.svg' },
  { name: 'Golang', svg: '/icons/golang.svg' },
  { name: 'MySQL', svg: '/icons/mysql.svg' },
];

const fullStackSkills: Skill[] = [
  { name: 'Python', svg: '/icons/python.svg' },
  { name: 'PHP', svg: '/icons/php.svg' },
  { name: 'JavaScript', svg: '/icons/tech/js.svg' },
  { name: 'Dart', svg: '/icons/dart.svg' },
];

const gisSkills: Skill[] = [
  { name: 'PostgreSQL / PostGIS', svg: '/icons/postgresql.svg' },
  { name: 'QGIS', svg: '/icons/qgis.svg' },
  { name: 'Leaflet', svg: '/icons/leaflet.svg' },
  { name: 'Power BI', svg: '/icons/powerbi.svg' },
];

import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { Code2, Server, Layers, MapPinned } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CARD_CLASS = 'group mz-card mz-card-sm aspect-square flex flex-col items-center justify-center gap-3';

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="relative border-t border-border/70 bg-card/60 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">        <SectionHeader eyebrow="Stack" title={t('skills.title')} subtitle={t('skills.subtitle')} />

        <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
          {/* Frontend Section - Esquerda */}
          <Reveal delayMs={160}>
            <div className="space-y-5">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 text-blue-500">
                  <Code2 size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">{t('skills.frontend')}</h3>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {frontendSkills.map((skill, i) => (
                  <Reveal as="li" key={skill.name} delayMs={i * 50 + 200} className={CARD_CLASS}>
                    <div className="mz-card-accent" />
                    <div className="mz-card-hover-bg" />
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-blue-500/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md group-hover:shadow-blue-500/20">
                      <img src={skill.svg} alt={skill.name} className="h-6 w-6 object-contain transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <div className="relative z-10 text-center">
                      <p className="text-sm font-semibold text-foreground group-hover:text-blue-500 transition-colors duration-300">{skill.name}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Backend Section - Centro */}
          <Reveal delayMs={400}>
            <div className="space-y-5">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/10 text-green-500">
                  <Server size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">{t('skills.backend')}</h3>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {backendSkills.map((skill, i) => (
                  <Reveal as="li" key={skill.name} delayMs={i * 50 + 440} className={CARD_CLASS}>
                    <div className="mz-card-accent" />
                    <div className="mz-card-hover-bg" />
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/15 to-green-500/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md group-hover:shadow-green-500/20">
                      <img src={skill.svg} alt={skill.name} className="h-6 w-6 object-contain transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <div className="relative z-10 text-center">
                      <p className="text-sm font-semibold text-foreground group-hover:text-green-500 transition-colors duration-300">{skill.name}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Full Stack Section - Direita */}
          <Reveal delayMs={640}>
            <div className="space-y-5">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B4A]/20 to-[#FF6B4A]/10 text-[#FF6B4A]">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">{t('skills.fullStack')}</h3>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {fullStackSkills.map((skill, i) => (
                  <Reveal as="li" key={skill.name} delayMs={i * 50 + 680} className={CARD_CLASS}>
                    <div className="mz-card-accent" />
                    <div className="mz-card-hover-bg" />
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B4A]/15 to-[#FF6B4A]/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md group-hover:shadow-[#FF6B4A]/20">
                      <img src={skill.svg} alt={skill.name} className="h-6 w-6 object-contain transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <div className="relative z-10 text-center">
                      <p className="text-sm font-semibold text-foreground group-hover:text-[#FF6B4A] transition-colors duration-300">{skill.name}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* GIS */}
          <Reveal delayMs={760}>
            <div className="space-y-5">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-500/10 text-teal-500">
                  <MapPinned size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">GIS</h3>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {gisSkills.map((skill, i) => (
                  <Reveal as="li" key={skill.name} delayMs={i * 50 + 800} className={CARD_CLASS}>
                    <div className="mz-card-accent" />
                    <div className="mz-card-hover-bg" />
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/15 to-teal-500/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md group-hover:shadow-teal-500/20">
                      <img src={skill.svg} alt={skill.name} className="h-6 w-6 object-contain transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <div className="relative z-10 text-center">
                      <p className="text-sm font-semibold text-foreground group-hover:text-teal-500 transition-colors duration-300">{skill.name}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
