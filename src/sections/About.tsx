import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { MapPin, GraduationCap, Languages, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="sobre" className="relative border-t border-border/70 bg-background py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <SectionHeader eyebrow="Perfil" title={t('about.title')} subtitle={t('about.subtitle')} />

        <div className="mx-auto max-w-3xl text-center">
          <Reveal delayMs={160}>
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">{t('about.name')}</h3>
            <p className="mt-1.5 text-base font-semibold text-primary">{t('about.role')}</p>
          </Reveal>

          <Reveal delayMs={240}>
            <div className="mt-6 space-y-4 text-left text-muted-foreground">
              <p className="leading-relaxed">{t('about.text1')}</p>
              <p className="leading-relaxed">{t('about.text2')}</p>
              <p className="leading-relaxed">{t('about.text3')}</p>
              <p className="leading-relaxed">{t('about.text4')}</p>
            </div>
          </Reveal>

          <Reveal delayMs={320}>
            <div className="mt-8">
              <a href="#skills" className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                {t('about.viewSkills')}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Informações pessoais: grid plano, sem card dentro de card */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          <Badge icon={<MapPin size={18} />} title={t('about.location')} value={t('about.locationValue')} delayMs={400} />
          <Badge icon={<GraduationCap size={18} />} title={t('about.education')} value={t('about.educationValue')} delayMs={460} />
          <Badge icon={<Languages size={18} />} title={t('about.languages')} value={t('about.languagesValue')} delayMs={520} />
        </div>

        {/* Citação — faixa discreta, não um segundo bloco de destaque */}
        <Reveal delayMs={580}>
          <div className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-2xl border border-border/70 bg-card px-6 py-5">
            <BookOpen size={20} className="mt-0.5 flex-shrink-0 text-primary" strokeWidth={1.75} />
            <div>
              <p className="text-foreground italic leading-relaxed">{t('about.quote')}</p>
              <p className="mt-2 text-sm font-semibold text-primary">{t('about.quoteAuthor')}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Badge({ icon, title, value, delayMs = 0 }: { icon: React.ReactNode; title: string; value: string; delayMs?: number }) {
  return (
    <Reveal delayMs={delayMs}>
      <div className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 transition-all duration-200 hover:border-primary/30">
        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-sm font-semibold text-foreground truncate">{value}</p>
        </div>
      </div>
    </Reveal>
  );
}
