type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
  repo?: string;
  image?: string;
  imageAlt?: string;
};

const projects: Project[] = [
   {
    title: 'Gestão de Projeto de Fim do Curso (Laravel/PHP)',
    description: 'Desenvolvimento de um sistema web para gestão de projetos de fim de curso do Departamento de Arquitetura da UCM-FEG, facilitando o acompanhamento e a organização.',
    stack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    link: '#', // Adicione o link real do projeto aqui
    repo: '#', // Adicione o link do repositório aqui
    image: '/Feg.png', // Imagem placeholder, adicione a imagem real se tiver
    imageAlt: 'Prévia do Projeto de Gestão de Fim de Curso',
  },

  {
    title: 'Portfólio Web (React)',
    description: 'Criação de um portfólio pessoal e responsivo utilizando React, TypeScript e Tailwind CSS para apresentar meus projetos e habilidades de forma interativa e moderna.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    repo: 'https://github.com/maurobernardo/portfolio-mauro',
    image: '/projecto.png',
    imageAlt: 'Prévia do Portfólio Web',
  },
  {
    title: 'App Mobile (Confia+)',
    description: 'O Confia+ é um aplicativo desenvolvido com foco em segurança digital e proteção do usuário. Ele permite que qualquer pessoa possa reportar fraudes, denunciar mensagens de burla e números suspeitos, além de detectar automaticamente mensagens fraudulentas recebidas no dispositivo..',
    stack: ['React Native', 'TypeScript', 'Expo'],
    link: '#',
    repo: 'https://github.com/maurobernardo/mobile-app',
    image: '/Confia.png',
    imageAlt: 'Prévia do Aplicativo Mobile',
  },

 
];

import Reveal from '../components/Reveal';
import { Github, Link2 } from 'lucide-react';

export default function Projects() {
  const iconMap: Record<string, string> = {
    React: '/icons/react.svg',
    'React Native': '/icons/react.svg',
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
    <section id="projetos" className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">Meus Projetos</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Uma seleção dos meus trabalhos mais recentes e impactantes.
            </p>
          </Reveal>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.title} delayMs={i * 80}>
              <div className="rounded-xl border bg-card p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                {p.image && (
                  <a href={p.link || p.repo || '#'} target="_blank" rel="noreferrer" className="block group -mt-3 -mx-3 mb-4 rounded-t-xl overflow-hidden" aria-label={p.imageAlt || p.title}>
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={p.imageAlt || p.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.03]"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  </a>
                )}
                <h3 className="font-semibold text-xl text-foreground leading-tight">{p.title}</h3>
                <p className="mt-2 text-muted-foreground flex-1 text-sm">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 text-xs bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full text-primary">
                      {iconMap[t] && (
                        <img src={iconMap[t]} alt={t} className="h-4 w-4 object-contain" />
                      )}
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-border/70">
                  {p.link && (
                    <a className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline hover:text-primary/80 transition-colors" href={p.link} target="_blank" rel="noreferrer">
                      <Link2 size={16} />
                      Demo
                    </a>
                  )}
                  {p.repo && (
                    <a className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline hover:text-primary/80 transition-colors" href={p.repo} target="_blank" rel="noreferrer">
                      <Github size={16} />
                      Código
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


