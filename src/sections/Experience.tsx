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
    <section id="experiencia" className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
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
                    <div className="rounded-lg border bg-card p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                        <time className="text-sm font-medium text-muted-foreground">{edu.period}</time>
                      </div>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
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
                    <div className="rounded-lg border bg-card p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                        <time className="text-sm font-medium text-muted-foreground">{exp.period}</time>
                      </div>
                      <p className="text-muted-foreground">{exp.company}</p>
                      {exp.location && (
                        <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin size={14} /> {exp.location}
                        </p>
                      )}
                      <ul className="mt-4 list-disc pl-5 text-muted-foreground space-y-2">
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
                <div className="rounded-xl border bg-card p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                  <div className="flex items-center gap-3 text-foreground mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Award size={20} />
                    </span>
                    <p className="font-semibold text-lg leading-tight text-foreground">{c.title}</p>
                  </div>
                  <p className="text-muted-foreground">{c.issuer} · {c.year}</p>
              {c.period && (
                    <p className="mt-1 text-sm text-muted-foreground">{c.period}</p>
              )}
              {Array.isArray(c.skills) && c.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                  {c.skills.map((s: string) => (
                    <span
                      key={s}
                          className="inline-flex items-center rounded-full border bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
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
                      className="mt-4 inline-block text-sm text-primary hover:underline self-start"
                >
                  Ver credencial
                </a>
              )}
                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      className="mt-4 w-full h-auto object-contain rounded-md"
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
];
