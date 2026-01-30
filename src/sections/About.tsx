import Reveal from '../components/Reveal';
import { CalendarDays, MapPin, GraduationCap, Languages, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="sobre" className="relative py-16 lg:py-24 text-center overflow-hidden">
      {/* Gradiente de fundo animado */}
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 1) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 100%)' }} />
      
      {/* Partículas animadas de fundo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-[#00D9FF] rounded-full opacity-40 animate-float" style={{ animationDelay: '1s', animationDuration: '8s' }} />
        <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-[#00D9FF] rounded-full opacity-25 animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }} />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#00D9FF] rounded-full opacity-35 animate-float" style={{ animationDelay: '3s', animationDuration: '9s' }} />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '4s', animationDuration: '6.5s' }} />
      </div>
      
      {/* Gradiente animado */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
        <Reveal delayMs={0}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">{t('about.title')}</h2>
        </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t('about.subtitle')}
            </p>
            </Reveal>
          </div>
          
        {/* Conteúdo principal com card de informações pessoais e texto */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-16 items-start">
            {/* Card de Informações Pessoais */}
            <Reveal delayMs={160} className="flex justify-center lg:justify-start">
              <div className="group relative rounded-2xl border-2 border-primary/50 shadow-2xl shadow-primary/20 bg-card p-8 lg:p-10 w-full overflow-hidden">
                {/* Borda vertical azul ciano na esquerda */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-60 animate-pulse" />
                
                {/* Gradiente de fundo no hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground mb-8 text-center group-hover:text-primary transition-colors duration-300">
                    {t('about.personalInfo')}
                  </h3>
                  <div className="grid gap-4">
                    <Badge icon={<CalendarDays size={20} />} title={t('about.age')} value={t('about.ageValue')} delayMs={0} />
                    <Badge icon={<MapPin size={20} />} title={t('about.location')} value={t('about.locationValue')} delayMs={0} />
                    <Badge icon={<GraduationCap size={20} />} title={t('about.education')} value={t('about.educationValue')} delayMs={0} />
                    <Badge icon={<Languages size={20} />} title={t('about.languages')} value={t('about.languagesValue')} delayMs={0} />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Informações e texto */}
            <div className="space-y-6">
              <Reveal delayMs={240}>
                <div className="space-y-3">
                  <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{t('about.name')}</h3>
                  <p className="text-lg font-semibold text-primary">{t('about.role')}</p>
                </div>
              </Reveal>
              
              <div className="space-y-5 text-muted-foreground">
                <Reveal as="p" delayMs={320} className="text-base leading-relaxed">
                  {t('about.text1')}
            </Reveal>
            <Reveal as="p" delayMs={400} className="text-base leading-relaxed">
                  {t('about.text2')}
            </Reveal>
            <Reveal as="p" delayMs={480} className="text-base leading-relaxed">
                  {t('about.text3')}
            </Reveal>
            <Reveal as="p" delayMs={560} className="text-base leading-relaxed">
                  {t('about.text4')}
            </Reveal>
          </div>
          
          <Reveal delayMs={640}>
                <div className="pt-4">
                  <a href="#skills" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3 text-primary-foreground font-semibold shadow-lg transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:translate-y-0">
                    {t('about.viewSkills')}
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
              </a>
            </div>
          </Reveal>
        </div>
            </div>
          </div>

        {/* Card de Reflexão centralizado */}
        <div className="flex justify-center">
            <Reveal delayMs={720}>
            <QuoteCard />
            </Reveal>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, title, value, className, delayMs = 0 }: { icon: React.ReactNode; title: string; value: string; className?: string; delayMs?: number }) {
  return (
    <div className={["group relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden", className ?? ''].join(' ')}>
        {/* Borda vertical azul ciano na esquerda */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        
      <div className="flex items-center gap-4 relative z-10">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/30 flex-shrink-0">
            {icon}
          </span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-300 mb-1">{title}</p>
          <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuoteCard() {
  const { t } = useLanguage();
  return (
    <div className="group relative rounded-2xl border-2 border-primary/50 shadow-2xl shadow-primary/20 bg-card p-6 lg:p-8 max-w-2xl overflow-hidden">
      {/* Borda vertical azul ciano na esquerda */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-100 shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D9FF] opacity-60 animate-pulse" />
        
      {/* Gradiente de fundo no hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent pointer-events-none" />
        
      {/* Conteúdo do card */}
      <div className="relative z-10 flex flex-col">
          {/* Ícone de livro no topo centralizado com animação */}
        <div className="flex justify-center mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
            <BookOpen size={24} className="text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
            </div>
          </div>
          
        {/* Texto da citação */}
        <div className="flex flex-col justify-center">
          <p className="text-foreground text-base font-normal italic text-center mb-4 leading-relaxed">
            {t('about.quote')}
          </p>
          
          {/* Autor em azul ciano, alinhado à direita */}
          <p className="text-primary text-sm font-semibold text-right">
            {t('about.quoteAuthor')}
          </p>
        </div>
      </div>
    </div>
  );
}


