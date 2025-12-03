type Skill = { name: string; level: string; svg: string };

const skills: Skill[] = [
  { name: 'Java', level: 'Avançado', svg: '/icons/java.svg' },
  { name: 'Spring Boot', level: 'Avançado', svg: '/icons/spring.svg' },
  { name: 'React', level: 'Avançado', svg: '/icons/react.svg' },
  { name: 'React Native', level: 'Avançado', svg: '/icons/react.svg' },
  { name: 'TypeScript', level: 'Avançado', svg: '/icons/typescript.svg' },
  { name: 'JavaScript', level: 'Avançado', svg: '/icons/tech/js.svg' },
  { name: 'HTML5', level: 'Avançado', svg: '/icons/tech/html.svg' },
  { name: 'CSS3', level: 'Avançado', svg: '/icons/tech/css.svg' },
  { name: 'Tailwind CSS', level: 'Avançado', svg: '/icons/tailwindcss.svg' },
  { name: 'MySQL', level: 'Avançado', svg: '/icons/mysql.svg' },
  
];

import Reveal from '../components/Reveal';

export default function Skills() {
  return (
    <section id="skills" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Gradiente de fundo idêntico ao Hero - Modo Claro */}
      <div className="absolute inset-0 z-0 dark:hidden" style={{ background: 'linear-gradient(to right, rgba(219, 234, 254, 1) 0%, rgba(239, 246, 255, 0.8) 30%, rgba(248, 250, 252, 0.6) 60%, rgba(255, 255, 255, 1) 100%)' }} />
      {/* Gradiente de fundo idêntico ao Hero - Modo Escuro */}
      <div className="absolute inset-0 z-0 hidden dark:block" style={{ background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 50%, rgb(0, 0, 0) 100%)' }} />
      {/* Padrão geométrico sutil - modo claro */}
      <div className="absolute inset-0 opacity-[0.03] dark:hidden z-0" style={{ backgroundImage: 'url(\'/patterns/hero-network.svg\')', backgroundRepeat: 'repeat', backgroundSize: '400px' }} />
      {/* Padrões abstratos emanando do lado direito - modo escuro */}
      <div className="absolute inset-0 opacity-[0.08] hidden dark:block z-0" style={{ backgroundImage: 'radial-gradient(ellipse at right, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' }} />
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">Minhas Habilidades</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Tecnologias e ferramentas que domino e utilizo no desenvolvimento de soluções.
            </p>
          </Reveal>
        </div>
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, i) => (
            <Reveal
              as="li"
              key={skill.name}
              delayMs={i * 50}
              className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
            >
              {/* Gradiente sutil no hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
              
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary/20">
                <img src={skill.svg} alt={skill.name} className="h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-110" />
              </span>
              <div className="relative z-10 text-center">
                <p className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">{skill.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{skill.level}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}


