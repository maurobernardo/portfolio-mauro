type Skill = { name: string; svg: string };

const frontendSkills: Skill[] = [
  { name: 'Next.js', svg: '/icons/nextjs.svg' },
  { name: 'React Native', svg: '/icons/react.svg' },
  { name: 'HTML5', svg: '/icons/tech/html.svg' },
  { name: 'CSS3', svg: '/icons/tech/css.svg' },
  { name: 'Tailwind CSS', svg: '/icons/tailwindcss.svg' },
];

const backendSkills: Skill[] = [
  { name: 'Java', svg: '/icons/java.svg' },
  { name: 'Spring Boot', svg: '/icons/spring.svg' },
  { name: 'MySQL', svg: '/icons/mysql.svg' },
  { name: 'PostgreSQL', svg: '/icons/postgresql.svg' },
];

const fullStackSkills: Skill[] = [
  { name: 'Node.js', svg: '/icons/nodejs.svg' },
  { name: 'TypeScript', svg: '/icons/typescript.svg' },
  { name: 'JavaScript', svg: '/icons/tech/js.svg' },
  { name: 'REST APIs', svg: '/icons/cicd.svg' },
];

import Reveal from '../components/Reveal';
import { Code2, Server, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(219, 234, 254, 0.5) 0%, rgba(255, 255, 255, 1) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 100%)' }} />
      
      {/* Partículas animadas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-32 left-16 w-2 h-2 bg-[#00D9FF] rounded-full opacity-25 animate-float" style={{ animationDelay: '0s', animationDuration: '7s' }} />
        <div className="absolute top-1/2 right-24 w-1.5 h-1.5 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '2s', animationDuration: '9s' }} />
        <div className="absolute bottom-40 left-1/3 w-2.5 h-2.5 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '4s', animationDuration: '8s' }} />
      </div>
      
      {/* Gradientes animados */}
      <div className="absolute inset-0 z-0 opacity-25 dark:opacity-15">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2.5s', animationDuration: '7s' }} />
      </div>
      
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">{t('skills.title')}</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t('skills.subtitle')}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-8">
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
                  <Reveal
                    as="li"
                    key={skill.name}
                    delayMs={i * 50 + 200}
                    className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden"
                  >
                    {/* Borda vertical azul ciano na esquerda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_8px_rgba(0,217,255,0.4)]" />
                    
                    {/* Efeito de brilho animado na borda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-50 animate-pulse" />
                    
                    {/* Gradiente sutil no hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />
                    
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
                  <Reveal
                    as="li"
                    key={skill.name}
                    delayMs={i * 50 + 440}
                    className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10 overflow-hidden"
                  >
                    {/* Borda vertical azul ciano na esquerda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_8px_rgba(0,217,255,0.4)]" />
                    
                    {/* Efeito de brilho animado na borda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-50 animate-pulse" />
                    
                    {/* Gradiente sutil no hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none" />
                    
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
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00D9FF]/20 to-[#00D9FF]/10 text-[#00D9FF]">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">{t('skills.fullStack')}</h3>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {fullStackSkills.map((skill, i) => (
                  <Reveal
                    as="li"
                    key={skill.name}
                    delayMs={i * 50 + 680}
                    className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00D9FF]/10 overflow-hidden"
                  >
                    {/* Borda vertical azul ciano na esquerda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_8px_rgba(0,217,255,0.4)]" />
                    
                    {/* Efeito de brilho animado na borda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-50 animate-pulse" />
                    
                    {/* Gradiente sutil no hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#00D9FF]/5 via-transparent to-transparent pointer-events-none" />
                    
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D9FF]/15 to-[#00D9FF]/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md group-hover:shadow-[#00D9FF]/20">
                      <img src={skill.svg} alt={skill.name} className="h-6 w-6 object-contain transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <div className="relative z-10 text-center">
                      <p className="text-sm font-semibold text-foreground group-hover:text-[#00D9FF] transition-colors duration-300">{skill.name}</p>
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
