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
    <section id="skills" className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
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
              className="group flex flex-col items-center justify-center gap-4 rounded-xl border bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <img src={skill.svg} alt={skill.name} className="h-8 w-8 object-contain" />
              </span>
              <div className="text-center">
                <p className="font-medium text-foreground">{skill.name}</p>
                <p className="text-xs text-muted-foreground">{skill.level}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}


