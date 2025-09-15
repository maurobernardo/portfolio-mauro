import Reveal from '../components/Reveal';
import RotatingText from '../components/RotatingText';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="inicio" className="relative overflow-hidden min-h-screen flex items-center bg-background py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left content: text and buttons */}
          <div className="flex-1 text-center lg:text-left">
            <Reveal delayMs={0}>
              <p className="text-lg font-medium text-primary mb-2">{t('hero.intro')}</p>
            </Reveal>
            <Reveal delayMs={80}>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight">
                {t('hero.i_am')} <span className="text-primary"><RotatingText phrases={['Mauro Zibane', 'Desenvolvedor Full Stack', 'Engenheiro de Software', 'Estudante de Tecnologia de Informação']} interval={4000} /></span>
              </h1>
            </Reveal>
            <Reveal delayMs={160}>
              <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto lg:mx-0">
                {t('hero.description')}
              </p>
            </Reveal>
            <Reveal delayMs={240}>
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="/path-to-your-cv.pdf" download className="rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:translate-y-px">
                  {t('hero.download_cv')}
                </a>
                <a href="#projetos" className="rounded-full border border-input px-8 py-4 font-semibold text-foreground transition-all hover:bg-muted hover:text-primary hover:shadow-sm">
                  {t('hero.view_my_work')}
                </a>
              </div>
            </Reveal>
            {/* Scroll Down Indicator */}
            <Reveal delayMs={320}>
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-muted-foreground/30 text-sm animate-bounce">
                  0
                </span>
                <span>{t('hero.scroll_down')}</span>
              </div>
            </Reveal>
            {/* Social icons */}
            <Reveal delayMs={400}>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {[
                  { href: 'https://www.facebook.com/mauroutall.mbz', Icon: Facebook, label: 'Facebook', color: 'blue' },
                  { href: 'https://twitter.com/MauroZiban7', Icon: Twitter, label: 'Twitter', color: 'sky' },
                  { href: 'https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/', Icon: Linkedin, label: 'LinkedIn', color: 'blue' },
                  { href: 'https://github.com/maurobernardo?tab=repositories', Icon: Github, label: 'GitHub', color: 'gray' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={`group flex h-10 w-10 items-center justify-center rounded-full border border-${s.color}-500/50 hover:border-${s.color}-500 hover:shadow-md hover:shadow-${s.color}-500/20 transition-all duration-300`} aria-label={s.label}>
                    <s.Icon size={20} className={`text-${s.color}-400 group-hover:scale-110 transition-transform`} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right content: Photo / Avatar and vertical social bar */}
          <div className="relative flex-shrink-0 mt-12 lg:mt-0">
            {/* Photo / Avatar */}
            <Reveal delayMs={480} className="relative z-10">
              <div className="relative h-80 w-80 rounded-full flex items-center justify-center overflow-hidden border-2 border-primary shadow-xl mx-auto animate-float-slow">
                <img
                  src="/profile.JPG"
                  alt={t('hero.profile_alt')}
                  className="h-full w-full rounded-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src.endsWith('/profile.jpg')) {
                      img.onerror = null; // evita loop
                      img.src = '/profile.JPG';
                    } else {
                      img.style.display = 'none';
                    }
                  }}
                />
              </div>
            </Reveal>
            {/* Abstract elements - for visual richness */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 animate-pulse-glow z-0">
              <div className="h-full w-full rounded-full border border-primary/50 animate-morph-blob" />
            </div>
            {/* Vertical Social Bar - REMOVIDO */}
            {/* O conteúdo da barra social vertical foi removido como solicitado */}
          </div>
        </div>
      </div>
    </section>
  );
}