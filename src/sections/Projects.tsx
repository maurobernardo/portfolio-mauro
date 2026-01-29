type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
  repo?: string;
  image?: string;
  imageAlt?: string;
};

const projectsData = [
  {
    stack: ['React', 'TypeScript', 'Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    link: '#',
    repo: '#',
    image: '/UCM.png',
    imageAltKey: 'projects.0.title',
  },
  {
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://deyril-marlon.vercel.app/',
    repo: '#',
    image: '/Deyril.png',
    imageAltKey: 'projects.1.title',
  },
  {
    stack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    link: '#',
    repo: '#',
    image: '/Feg.png',
    imageAltKey: 'projects.2.title',
  },
  {
    stack: ['React Native', 'TypeScript'],
    link: '#',
    repo: '#',
    image: '/Fin.jpg',
    imageAltKey: 'projects.3.title',
  },
  {
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    repo: 'https://github.com/maurobernardo/portfolio-mauro',
    image: '/projecto.png',
    imageAltKey: 'projects.4.title',
  },
  {
    stack: ['React Native', 'TypeScript', 'Expo'],
    link: '#',
    repo: 'https://github.com/maurobernardo/mobile-app',
    image: '/Confia.png',
    imageAltKey: 'projects.5.title',
  },
];

import Reveal from '../components/Reveal';
import { Github, Link2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const iconMap: Record<string, string> = {
    React: '/icons/react.svg',
    'React Native': '/icons/react.svg',
    'Next.js': '/icons/nextjs.svg',
    TypeScript: '/icons/typescript.svg',
    'Tailwind CSS': '/icons/tailwindcss.svg',
    Java: '/icons/java.svg',
    'Spring Boot': '/icons/spring.svg',
    MySQL: '/icons/mysql.svg',
    Docker: '/icons/docker.svg',
    Angular: '/icons/tech/angular.svg',
    Expo: '/icons/react.svg',
    JavaFX: '/icons/java.svg',
    Laravel: '/icons/laravel.svg', // Adicionado ícone do Laravel
    PHP: '/icons/php.svg', // Adicionado ícone do PHP
  };

  return (
    <section id="projetos" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Gradiente de fundo horizontal sutil - similar ao Hero */}
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(239, 246, 255, 0.6) 0%, rgba(255, 255, 255, 1) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 100%)' }} />
      
      {/* Partículas animadas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-12 w-2 h-2 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '1.5s', animationDuration: '8s' }} />
        <div className="absolute top-1/2 left-16 w-1.5 h-1.5 bg-[#00D9FF] rounded-full opacity-25 animate-float" style={{ animationDelay: '3.5s', animationDuration: '9s' }} />
        <div className="absolute bottom-28 right-1/4 w-2.5 h-2.5 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '5.5s', animationDuration: '7s' }} />
        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-[#00D9FF] rounded-full opacity-35 animate-float" style={{ animationDelay: '7s', animationDuration: '10s' }} />
      </div>
      
      {/* Gradientes animados */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-12">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '6.5s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3.5s', animationDuration: '8.5s' }} />
      </div>
      
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">{t('projects.title')}</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t('projects.subtitle')}
            </p>
          </Reveal>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((p, i) => {
            const title = t(`projects.${i}.title`);
            const description = t(`projects.${i}.description`);
            return (
              <Reveal as="article" key={i} delayMs={i * 80}>
                <div className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 h-full flex flex-col hover:-translate-y-2 overflow-hidden">
                  {/* Borda vertical azul ciano na esquerda */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                  
                  {/* Efeito de brilho animado na borda */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-60 animate-pulse" />
                  
                  {/* Gradiente de fundo sutil no hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                  {/* Brilho sutil no hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
                  
                  {p.image && (
                    <a href={p.link || p.repo || '#'} target="_blank" rel="noreferrer" className="block -mt-3 -mx-3 mb-4 rounded-t-xl overflow-hidden" aria-label={title}>
                      <div className="relative aspect-[16/9] overflow-hidden bg-muted/50">
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent z-10 group-hover:from-card/60 transition-colors duration-500" />
                        <img
                          src={p.image}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    </a>
                  )}
                  <h3 className="font-bold text-xl text-foreground leading-tight mb-3 relative z-10 group-hover:text-primary transition-colors duration-300">{title}</h3>
                  <p className="mt-2 text-muted-foreground flex-1 text-sm leading-relaxed relative z-10">{description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 relative z-10">
                    {p.stack.map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-1.5 text-xs bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-primary font-medium transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 hover:scale-105">
                        {iconMap[tech] && (
                          <img src={iconMap[tech]} alt={tech} className="h-4 w-4 object-contain" />
                        )}
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 pt-5 border-t border-border/50 relative z-10">
                    {p.link && (
                      <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-all duration-300 hover:gap-2 group/link" href={p.link} target="_blank" rel="noreferrer">
                        <Link2 size={16} className="transition-transform duration-300 group-hover/link:rotate-[-45deg]" />
                        {t('projects.demo')}
                      </a>
                    )}
                    {p.repo && (
                      <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-all duration-300 hover:gap-2 group/link" href={p.repo} target="_blank" rel="noreferrer">
                        <Github size={16} className="transition-transform duration-300 group-hover/link:scale-110" />
                        {t('projects.code')}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


