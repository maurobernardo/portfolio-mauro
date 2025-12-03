type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
};

type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  description: string;
};

const education: EducationItem[] = [
  {
    degree: "Tecnologia de Informação",
    institution: "Universidade Católica de Moçambique",
    period: "2023 — Presente",
    description: "Atualmente cursando com foco em desenvolvimento de software, redes e segurança da informação.",
  },
  {
    degree: "Curso de Introducao a IA Moderna",
    institution: "Cisco Networking Academy",
    period: "2025",
    description: "Curso introdutório que aborda os princípios fundamentais da Inteligência Artificial, incluindo aprendizado de máquina, redes neurais, processamento de linguagem natural e visão computacional. Explora aplicações práticas da IA em diversas áreas e discute tendências e desafios éticos relacionados ao uso dessa tecnologia.",
  },
  {
    degree: "Curso de Introducao a CyberSeguranca",
    institution: "Cisco Networking Academy",
    period: "2025",
    description: "Curso introdutório sobre segurança digital, abordando conceitos essenciais de proteção de dados, principais ameaças e vulnerabilidades, métodos de defesa, criptografia básica, segurança em redes e a importância da cibersegurança no mundo atual. Inclui também visão geral sobre oportunidades de carreira na área..",
  },
    {
    degree: "Introdução à Ciência de Dados",
    institution: "Cisco Networking Academy",
    period: "2025",
    description: "Curso introdutório que apresenta os conceitos básicos da Ciência de Dados, incluindo coleta, limpeza e análise de dados, fundamentos de estatística, visualização de informações e noções de machine learning. Explora também aplicações práticas da ciência de dados em diferentes setores..",
  },
    {
    degree: "Fundamentos de Hardware de Computadores",
    institution: "Cisco Networking Academy",
    period: "2025",
    description: "Curso introdutório que cobre os princípios básicos do hardware de computadores, incluindo componentes essenciais como CPU, memória, armazenamento e periféricos. Aborda a arquitetura de computadores, funcionamento interno, montagem e manutenção de sistemas, além de noções sobre redes e segurança de hardware.",
  },
];

const experiences: ExperienceItem[] = [
  {
    role: "Estagiário em Infraestrutura de TI (Redes e Servidores)",
    company: "Anantara Bazaruto Island Resort and SPA",
    period: "Dez 2023 — Fev 2024",
    location: "Vilankulo, Inhambane — Presencial",
    bullets: [
      "Suporte na administração de redes LAN/WAN e infraestrutura de TI.",
      "Configuração e manutenção de servidores Windows Server/Linux.",
      "Monitoramento de redes e troubleshooting de falhas.",
      "Projetos de virtualização (VMware/Hyper‑V) e ambientes em nuvem.",
      "Gerenciamento de firewalls, switches e roteadores.",
      "Políticas de segurança de rede e rotinas de backup.",
      "Documentação técnica de procedimentos e infraestrutura.",
    ],
  },
  {
    role: "Mpesa-Finckathon",
    company: "Vodacom Mocambique",
    period: "Julho21 2025 — Julho25 2025",
    bullets: [
      "Desenvolvimento de Prototipos.",
      "Desenvolvimento de demos.",
      "Pesquisa e analise do mercado.",
      "Elevator Pitch.",
    ],
  },


];

import Reveal from "../components/Reveal";
import SlideIn from "../components/SlideIn";
import { Award, MapPin, BookOpen, Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experiencia" className="relative py-16 lg:py-24 overflow-hidden">
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">Minha Jornada</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Um resumo da minha trajetória acadêmica e profissional.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Coluna de Educação */}
          <div>
            <Reveal delayMs={160}>
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-8 text-center lg:text-left">Educação</h3>
            </Reveal>
            <ol className="relative border-l border-muted-foreground/30 ml-4 md:ml-12 lg:ml-0 lg:text-left">
              {education.map((edu, i) => (
                <li key={edu.degree + i} className="mb-10 ml-6">
                  <Reveal delayMs={i * 100 + 200}>
                    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-background">
                      <BookOpen size={16} className="text-primary-foreground" />
                    </span>
                    <div className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 relative z-10">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{edu.degree}</h3>
                        <time className="text-sm font-medium text-muted-foreground">{edu.period}</time>
                      </div>
                      <p className="text-muted-foreground relative z-10">{edu.institution}</p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed relative z-10">{edu.description}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Coluna de Experiência */}
          <div>
            <Reveal delayMs={240}>
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-8 text-center lg:text-left">Experiência</h3>
        </Reveal>
            <ol className="relative border-l border-muted-foreground/30 ml-4 md:ml-12 lg:ml-0 lg:text-left">
              {experiences.map((exp, i) => (
                <li key={exp.role + i} className="mb-10 ml-6">
                  <Reveal delayMs={i * 100 + 280}>
                    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-background">
                      <Briefcase size={16} className="text-primary-foreground" />
                    </span>
                    <div className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 relative z-10">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{exp.role}</h3>
                        <time className="text-sm font-medium text-muted-foreground">{exp.period}</time>
                      </div>
                      <p className="text-muted-foreground relative z-10">{exp.company}</p>
                      {exp.location && (
                        <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1 relative z-10">
                          <MapPin size={14} /> {exp.location}
                        </p>
                      )}
                      <ul className="mt-4 list-disc pl-5 text-muted-foreground space-y-2 relative z-10">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
                  </div>
                </div>

        {/* Certificações */}
        <div className="mt-16">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Reveal delayMs={360}>
              <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">Certificações</h3>
        </Reveal>
            <Reveal delayMs={440}>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Comprovantes das minhas qualificações e aprendizados em diversas áreas.
              </p>
            </Reveal>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c, i) => (
              <Reveal key={c.title + i} delayMs={i * 100 + 520}>
                <div className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                  <div className="flex items-center gap-3 text-foreground mb-3 relative z-10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Award size={20} />
                    </span>
                    <p className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-300">{c.title}</p>
                  </div>
                  <p className="text-muted-foreground relative z-10">{c.issuer} · {c.year}</p>
              {c.period && (
                    <p className="mt-1 text-sm text-muted-foreground relative z-10">{c.period}</p>
              )}
              {Array.isArray(c.skills) && c.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 relative z-10">
                  {c.skills.map((s: string) => (
                    <span
                      key={s}
                          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-105"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                      className="mt-4 inline-block text-sm font-semibold text-primary hover:underline self-start relative z-10 transition-all duration-300 hover:gap-2 group/link"
                >
                  Ver credencial
                </a>
              )}
                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      className="mt-4 w-full h-auto object-contain rounded-md relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )}
            </div>
              </Reveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Removido o componente Card não utilizado

const certifications = [
  {
    title: "M-Pesa da Vodacom",
    issuer: "Vodacom Moçambique",
    year: "Jul 2025",
    period: "21 Jul 2025 · 25 Jul 2025",
    skills: [
      
      "Design Thinking",
      "Prototipagem",
      "Pesquisa de mercado",
      "Análises de mercado",
      
    
      
    ],
    image: '/mpesa.jpg', // Exemplo de imagem
    imageAlt: 'Certificado de Participação M-Pesa Fickanthon',
  },
  {
    title: "Introdução à Cybersegurança",
    issuer: "Cisco",
    year: "2025",
    period: "Setembro 2025 · Setembro 2025",
    skills: ["Fundamentos de Cibersegurança", "Análise de Ameaças", "Segurança de Rede"],
    image: '/cyber.jpg',
    imageAlt: 'Certificado de Introdução à Cybersegurança da Cisco',
  },
  {
    title: "Introdução à IA Moderna",
    issuer: "Cisco",
    year: "2025",
    period: "Setembro 2025 · Setembro 2025",
    skills :['Inteligência Artificial', 'Machine Learning', 'Deep Learning', 'Ética em IA'],
    image: '/ia2.jpg',
    imageAlt: 'Certificado de Introdução à IA Moderna da Cisco',
  },
  {
    title: "Introdução à Ciência de Dados",
    issuer: "Cisco",
    year: "2025", 
    period: "Setembro 2025 · Setembro 2025", 
    skills: ["Ciência de Dados", "Análise de Dados", "Estatística", "Visualização de Dados"],
    image: '/Ciencia.jpg', 
    imageAlt: 'Certificado de Introdução à Ciência de Dados da Cisco',
  },
   {
    title: "Fundamentos de Hardaware de Computadores",
    issuer: "Cisco",
    year: "2025", 
    period: "Setembro 2025 · Setembro 2025", 
    skills: ["Montagem e desmontagem de computadores.", "Manutenção preventiva e corretiva.", "Diagnóstico e resolução de falhas de hardware."],
    image: '/Hardware.jpg', 
    imageAlt: 'Certificado de Fundamentos de Hardaware de Computadores',
  },
];
