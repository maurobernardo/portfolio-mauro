import Reveal from '../components/Reveal';
import { Code, LayoutDashboard, Smartphone, ShieldCheck, PieChart, Database } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Service {
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    titleKey: 'services.webFullStack',
    descriptionKey: 'services.webFullStackDesc',
    icon: Code,
  },
  {
    titleKey: 'services.frontend',
    descriptionKey: 'services.frontendDesc',
    icon: LayoutDashboard,
  },
  {
    titleKey: 'services.mobile',
    descriptionKey: 'services.mobileDesc',
    icon: Smartphone,
  },
  {
    titleKey: 'services.consulting',
    descriptionKey: 'services.consultingDesc',
    icon: ShieldCheck,
  },
  {
    titleKey: 'services.dataAnalysis',
    descriptionKey: 'services.dataAnalysisDesc',
    icon: PieChart,
  },
  {
    titleKey: 'services.database',
    descriptionKey: 'services.databaseDesc',
    icon: Database,
  },
];

export default function Services() {
  const { t } = useLanguage();
  
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">{t('services.title')}</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t('services.subtitle')}
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Reveal as="div" key={service.titleKey} delayMs={i * 100 + 160}>
              <div className="group mz-card mz-card-lg h-full flex flex-col items-center text-center">
                <div className="mz-card-accent" />
                <div className="mz-card-accent-pulse" />
                <div className="mz-card-hover-bg" />
                <div className="mz-card-hover-shine" />
                <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/30">
                  <service.icon size={32} className="transition-transform duration-500 group-hover:scale-110" />
                </span>
                <h3 className="relative z-10 text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{t(service.titleKey)}</h3>
                <p className="relative z-10 text-muted-foreground flex-1 leading-relaxed">{t(service.descriptionKey)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
