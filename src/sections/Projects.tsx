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
    title: 'Sistema Académico UCM-FEG',
    description: 'Sistema web para facilitar o acesso às informações acadêmicas dos estudantes. Permite consultar avisos, controlar créditos, enviar comprovativos de pagamento e acompanhar validações. Inclui assistente virtual com voz para responder dúvidas.',
    stack: ['React', 'TypeScript', 'Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    link: '#',
    repo: '#',
    image: '/UCM.png',
    imageAlt: 'Prévia do Sistema Académico UCM-FEG',
  },
  {
    title: 'Portfólio Pessoal – Deyril Marlon',
    description: 'Portfólio pessoal moderno e interativo com suporte a múltiplos idiomas (PT/EN), modo escuro/claro e chatbot inteligente para responder perguntas sobre projetos e trajetória profissional.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://deyril-marlon.vercel.app/',
    repo: '#',
    image: '/Deyril.png',
    imageAlt: 'Prévia do Portfólio Pessoal – Deyril Marlon',
  },
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
    title: 'FinEduca aplicativo',
    description: 'Plataforma de educação financeira para ajudar os moçambicanos a melhorar sua literacia financeira, através de modelos interativos, quizes e minigames, módulos educativos, chatbot para dúvidas e sistema de conquista e ranking, e detecção de SMS de burla.',
    stack: ['React Native', 'TypeScript'],
    link: '#',
    repo: '#',
    image: '/Fin.jpg',
    imageAlt: 'Prévia do Aplicativo FinEduca',
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
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
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
              <div className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col hover:-translate-y-2 overflow-hidden">
                {/* Gradiente de fundo sutil no hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                
                {p.image && (
                  <a href={p.link || p.repo || '#'} target="_blank" rel="noreferrer" className="block -mt-3 -mx-3 mb-4 rounded-t-xl overflow-hidden" aria-label={p.imageAlt || p.title}>
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted/50">
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent z-10 group-hover:from-card/60 transition-colors duration-500" />
                      <img
                        src={p.image}
                        alt={p.imageAlt || p.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  </a>
                )}
                <h3 className="font-bold text-xl text-foreground leading-tight mb-3 relative z-10 group-hover:text-primary transition-colors duration-300">{p.title}</h3>
                <p className="mt-2 text-muted-foreground flex-1 text-sm leading-relaxed relative z-10">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2 relative z-10">
                  {p.stack.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 text-xs bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-primary font-medium transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 hover:scale-105">
                      {iconMap[t] && (
                        <img src={iconMap[t]} alt={t} className="h-4 w-4 object-contain" />
                      )}
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3 pt-5 border-t border-border/50 relative z-10">
                  {p.link && (
                    <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-all duration-300 hover:gap-2 group/link" href={p.link} target="_blank" rel="noreferrer">
                      <Link2 size={16} className="transition-transform duration-300 group-hover/link:rotate-[-45deg]" />
                      Demo
                    </a>
                  )}
                  {p.repo && (
                    <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-all duration-300 hover:gap-2 group/link" href={p.repo} target="_blank" rel="noreferrer">
                      <Github size={16} className="transition-transform duration-300 group-hover/link:scale-110" />
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


