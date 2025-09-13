import Reveal from '../components/Reveal';
import { Code, LayoutDashboard, Smartphone, ShieldCheck, PieChart, Database } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    title: 'Desenvolvimento Web Full Stack',
    description: 'Criação de aplicações web robustas e escaláveis, do front-end ao back-end, utilizando as mais modernas tecnologias.',
    icon: Code,
  },
  {
    title: 'Desenvolvimento Frontend',
    description: 'Construção de interfaces de usuário intuitivas e responsivas com React, Angular e TypeScript, garantindo uma excelente experiência.',
    icon: LayoutDashboard,
  },
  {
    title: 'Desenvolvimento Mobile (React Native)',
    description: 'Criação de aplicativos mobile performáticos para iOS e Android com React Native, oferecendo soluções nativas e híbridas.',
    icon: Smartphone,
  },
  {
    title: 'Consultoria e Arquitetura de Software',
    description: 'Orientação na definição de arquiteturas de software eficientes, otimização de performance e implementação de melhores práticas.',
    icon: ShieldCheck,
  },
  {
    title: 'Análise de Dados e BI',
    description: 'Transformação de dados brutos em insights acionáveis para tomadas de decisão estratégicas, utilizando ferramentas de BI.',
    icon: PieChart,
  },
  {
    title: 'Gerenciamento de Banco de Dados',
    description: 'Administração e otimização de bancos de dados relacionais e não-relacionais, garantindo segurança e performance.',
    icon: Database,
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">Meus Serviços</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Soluções personalizadas e de alta qualidade para impulsionar seus projetos.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Reveal as="div" key={service.title} delayMs={i * 100 + 160}>
              <div className="rounded-xl border bg-card p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center hover:-translate-y-1">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <service.icon size={30} />
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground flex-1">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
