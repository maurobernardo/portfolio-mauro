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
    <section id="servicos" className="relative py-16 lg:py-24 overflow-hidden">
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
              <div className="group relative rounded-2xl border border-border/50 bg-card p-8 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col items-center text-center hover:-translate-y-2 overflow-hidden">
                {/* Gradiente de fundo no hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent pointer-events-none" />
                
                <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/30">
                  <service.icon size={32} className="transition-transform duration-500 group-hover:scale-110" />
                </span>
                <h3 className="relative z-10 text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="relative z-10 text-muted-foreground flex-1 leading-relaxed">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
