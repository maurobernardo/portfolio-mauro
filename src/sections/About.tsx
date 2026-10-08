import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SectionPattern from '../components/SectionPattern';
import LanyardCard from '../components/LanyardCard';
import { MapPin, GraduationCap, Languages, Mail, BookOpen, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const facts = [
    { Icon: MapPin, k: t('about.location'), v: t('about.locationValue') },
    { Icon: GraduationCap, k: t('about.education'), v: t('about.educationValue') },
    { Icon: Languages, k: t('about.languages'), v: t('about.languagesValue') },
    { Icon: Mail, k: t('about.email'), v: 'maurobernardozibane@gmail.com' },
  ];

  return (
    <section id="sobre" className="relative border-t border-border/70 py-[clamp(56px,8vh,96px)]">
      <SectionPattern />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <SectionHeader no="01" eyebrow={t('eyebrow.about')} title={t('about.title')} subtitle={t('about.subtitle')} />

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] lg:gap-14">
          {/* Esquerda: texto */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <h3 className="text-3xl font-bold leading-tight lg:text-4xl">{t('about.name')}</h3>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">{t('about.role')}</p>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>{t('about.text1')}</p>
                <p>{t('about.text2')}</p>
                <p>{t('about.text3')}</p>
                <p>{t('about.text4')}</p>
              </div>
            </Reveal>
            <Reveal delayMs={140}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#skills" className="mz-btn mz-btn-primary">
                  {t('about.viewSkills')}
                  <ArrowRight size={16} />
                </a>
                <a href="/Mauro%20Zibane.pdf" download className="mz-btn mz-btn-ghost">{t('hero.downloadCV')} ↓</a>
                <a href="https://github.com/maurobernardo?tab=repositories" target="_blank" rel="noreferrer" className="mz-btn mz-btn-ghost">GitHub</a>
                <a href="https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/" target="_blank" rel="noreferrer" className="mz-btn mz-btn-ghost">LinkedIn</a>
              </div>
            </Reveal>
          </div>

          {/* Centro: cartão pendurado */}
          <Reveal className="order-1 lg:order-2">
            <LanyardCard />
          </Reveal>

          {/* Direita: factos rápidos + citação */}
          <div className="order-3">
            <Reveal>
              <p className="mz-tag mb-4">{t('about.quickFacts')}</p>
              <dl className="divide-y divide-foreground/10 rounded-[24px] border border-foreground/10 bg-card px-6">
                {facts.map(({ Icon, k, v }) => (
                  <div key={k} className="flex items-start gap-4 py-4">
                    <Icon size={16} className="mt-1 flex-shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <dt className="mz-tag">{k}</dt>
                      <dd className="mt-1 text-[15px] font-semibold leading-snug break-words">{v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delayMs={120}>
              <figure className="mt-6 rounded-[24px] bg-foreground p-6 text-background">
                <BookOpen size={18} className="opacity-60" strokeWidth={1.75} />
                <blockquote className="mt-3 font-serif text-xl italic leading-snug">{t('about.quote')}</blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">{t('about.quoteAuthor')}</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
