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
      {/* Gradiente de fundo horizontal sutil - similar ao Hero */}
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(239, 246, 255, 0.7) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(2, 6, 23) 0%, rgb(15, 23, 42) 100%)' }} />
      
      {/* Partículas animadas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-28 left-12 w-2 h-2 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '0.5s', animationDuration: '7s' }} />
        <div className="absolute top-1/3 right-16 w-1.5 h-1.5 bg-[#00D9FF] rounded-full opacity-25 animate-float" style={{ animationDelay: '2.5s', animationDuration: '9s' }} />
        <div className="absolute bottom-36 left-1/4 w-2.5 h-2.5 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '4.5s', animationDuration: '8s' }} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-[#00D9FF] rounded-full opacity-35 animate-float" style={{ animationDelay: '6s', animationDuration: '10s' }} />
      </div>
      
      {/* Gradientes animados */}
      <div className="absolute inset-0 z-0 opacity-25 dark:opacity-15">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '5.5s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2.5s', animationDuration: '7.5s' }} />
      </div>
      
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
              <div className="group mz-card mz-card-lg h-full flex flex-col items-center text-center">
                <div className="mz-card-accent" />
                <div className="mz-card-accent-pulse" />
                <div className="mz-card-hover-bg" />
                <div className="mz-card-hover-shine" />
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
