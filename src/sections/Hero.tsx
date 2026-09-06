import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import { Facebook, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  
  return (
    <section id="inicio" className="relative overflow-hidden min-h-screen flex items-start pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
      {/* Gradiente de fundo idêntico às imagens - Modo Claro: azul claro à esquerda para branco à direita */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: 'linear-gradient(to right, rgba(219, 234, 254, 1) 0%, rgba(239, 246, 255, 0.85) 30%, rgba(250, 244, 231, 0.8) 65%, rgba(251, 240, 217, 0.7) 100%)'
        }}
      />
      {/* Gradiente de fundo idêntico às imagens - Modo Escuro: azul escuro para preto com padrões */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: 'linear-gradient(to right, rgb(26, 20, 15) 0%, rgb(16, 12, 9) 45%, rgb(6, 4, 3) 100%)'
        }}
      />
      {/* Padrão geométrico sutil - modo claro */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:hidden z-0"
        style={{
          backgroundImage: 'url(\'/patterns/hero-network.svg\')',
          backgroundRepeat: 'repeat',
          backgroundSize: '400px',
        }}
      />
      {/* Padrões abstratos emanando do lado direito - modo escuro */}
      <div
        className="absolute inset-0 opacity-[0.08] hidden dark:block z-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse at right, rgba(255, 107, 74, 0.15) 0%, transparent 70%)',
        }}
      />
      
      {/* Glow único de assinatura, atrás da foto */}
      <div className="absolute inset-0 z-0 opacity-15 dark:opacity-[0.07]">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '6s' }} />
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          {/* Left content: text and buttons */}
          <div className="flex-1 text-center lg:text-left">
            <Reveal delayMs={0}>
              <p className="text-lg font-medium text-primary mb-2">{t('hero.welcome')}</p>
            </Reveal>
            <Reveal delayMs={80}>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl" style={{ lineHeight: '1.3' }}>
                {t('hero.greeting')}{' '}
                <span className="text-primary">{t('hero.name')}</span>
              </h1>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="mt-4 text-2xl font-semibold text-primary mx-auto lg:mx-0">
                {t('hero.role1')}
              </p>
            </Reveal>
            <Reveal delayMs={160}>
              <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto lg:mx-0">
                {t('hero.description')}
              </p>
            </Reveal>
            <Reveal delayMs={240}>
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="/Mauro_ZibaneCV.pdf" download className="rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-px active:translate-y-px">
                  {t('hero.downloadCV')}
                </a>
                <a href="#projetos" className="rounded-full border border-input px-8 py-4 font-semibold text-foreground transition-all hover:bg-muted hover:text-primary hover:shadow-sm hover:-translate-y-px">
                  {t('hero.viewWork')}
                </a>
              </div>
            </Reveal>
            {/* Scroll Down Indicator */}
            <Reveal delayMs={320}>
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-2 text-primary">
                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-primary/40 text-sm animate-bounce">
                  0
                </span>
                <span>{t('hero.scrollDown')}</span>
              </div>
            </Reveal>
            {/* Social icons */}
            <Reveal delayMs={400}>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="https://www.facebook.com/mauroutall.mbz" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300" aria-label="Facebook">
                  <Facebook size={20} className="text-primary group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300" aria-label="LinkedIn">
                  <Linkedin size={20} className="text-primary group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://github.com/maurobernardo?tab=repositories" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300" aria-label="GitHub">
                  <Github size={20} className="text-primary group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right content: Photo / Avatar and vertical social bar */}
          <div className="relative flex-shrink-0 mt-8 lg:mt-4">
            {/* Photo / Avatar */}
            <Reveal delayMs={480} className="relative z-10">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-primary rounded-full opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative rounded-full border-4 border-primary/50 shadow-2xl shadow-primary/30 overflow-hidden">
                <img
                  src={isDark ? "/profile10.png" : "/profile10.png"}
                  alt="Foto de perfil de Mauro Zibane"
                    className="h-80 w-80 lg:h-96 lg:w-96 object-cover rounded-full transition-all duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src.endsWith('/profile10.png') || img.src.endsWith('/profile10.png')) {
                      img.onerror = null; // evita loop
                      img.src = isDark ? '/profile10.png' : '/profile10.png';
                    }
                    else {
                      img.style.display = 'none';
                    }
                  }}
                />
                </div>
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

