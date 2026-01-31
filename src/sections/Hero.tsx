import Reveal from '../components/Reveal';
import RotatingText from '../components/RotatingText';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t, language } = useLanguage();
  
  const rotatingPhrases = language === 'pt' 
    ? ['Mauro Zibane', 'Desenvolvedor Full Stack', 'Administrador de Sistemas e Redes']
    : ['Mauro Zibane', 'Full Stack Developer', 'Systems and Networks Administrator'];
  
  return (
    <section id="inicio" className="relative overflow-hidden min-h-screen flex items-start pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
      {/* Gradiente de fundo idêntico às imagens - Modo Claro: azul claro à esquerda para branco à direita */}
      <div 
        className="absolute inset-0 z-0 dark:hidden" 
        style={{
          background: 'linear-gradient(to right, rgba(219, 234, 254, 1) 0%, rgba(239, 246, 255, 0.8) 30%, rgba(248, 250, 252, 0.6) 60%, rgba(255, 255, 255, 1) 100%)'
        }}
      />
      {/* Gradiente de fundo idêntico às imagens - Modo Escuro: azul escuro para preto com padrões */}
      <div 
        className="absolute inset-0 z-0 hidden dark:block" 
        style={{
          background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 50%, rgb(0, 0, 0) 100%)'
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
          backgroundImage: 'radial-gradient(ellipse at right, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
        }}
      />
      
      {/* Partículas animadas no Hero */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#00D9FF] rounded-full opacity-25 animate-float" style={{ animationDelay: '1.5s', animationDuration: '10s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '3s', animationDuration: '9s' }} />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '4.5s', animationDuration: '7s' }} />
      </div>
      
      {/* Gradientes animados */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s', animationDuration: '8s' }} />
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left content: text and buttons */}
          <div className="flex-1 text-center lg:text-left">
            <Reveal delayMs={0}>
              <p className="text-lg font-medium text-primary mb-2">{t('hero.welcome')}</p>
            </Reveal>
            <Reveal delayMs={80}>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl" style={{ lineHeight: '1.3' }}>
                {t('hero.greeting')}{' '}
                <span className="text-primary inline-block relative" style={{ display: 'inline-block', verticalAlign: 'top' }}>
                  <RotatingText phrases={rotatingPhrases} intervalMs={4000} />
                </span>
              </h1>
            </Reveal>
            <Reveal delayMs={160}>
              <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto lg:mx-0">
                {t('hero.description')}
              </p>
            </Reveal>
            <Reveal delayMs={240}>
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="/path-to-your-cv.pdf" download className="rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-px active:translate-y-px">
                  {t('hero.downloadCV')}
                </a>
                <a href="#projetos" className="rounded-full border border-input px-8 py-4 font-semibold text-foreground transition-all hover:bg-muted hover:text-primary hover:shadow-sm hover:-translate-y-px">
                  {t('hero.viewWork')}
                </a>
              </div>
            </Reveal>
            {/* Scroll Down Indicator */}
            <Reveal delayMs={320}>
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-muted-foreground/30 text-sm animate-bounce">
                  0
                </span>
                <span>{t('hero.scrollDown')}</span>
              </div>
            </Reveal>
            {/* Social icons */}
            <Reveal delayMs={400}>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="https://www.facebook.com/mauroutall.mbz" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/50 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300" aria-label="Facebook">
                  <Facebook size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://twitter.com/MauroZiban7" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-sky-500/50 hover:border-sky-500 hover:shadow-md hover:shadow-sky-500/20 transition-all duration-300" aria-label="Twitter">
                  <Twitter size={20} className="text-sky-400 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/50 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300" aria-label="LinkedIn">
                  <Linkedin size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://github.com/maurobernardo?tab=repositories" target="_blank" rel="noreferrer" className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-500/50 hover:border-gray-500 hover:shadow-md hover:shadow-gray-500/20 transition-all duration-300" aria-label="GitHub">
                  <Github size={20} className="text-gray-400 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right content: Photo / Avatar and vertical social bar */}
          <div className="relative flex-shrink-0 mt-8 lg:mt-0 -mt-4 lg:-mt-8">
            {/* Photo / Avatar */}
            <Reveal delayMs={480} className="relative z-10">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-[#00D9FF] to-primary rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"></div>
                <div className="relative rounded-full border-4 border-primary/50 shadow-2xl shadow-primary/30 overflow-hidden">
                <img
                  src="/profile.PNG"
                  alt="Foto de perfil de Mauro Zibane"
                    className="h-80 w-80 lg:h-96 lg:w-96 object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src.endsWith('/profile.png')) {
                      img.onerror = null; // evita loop
                      img.src = '/profile.PNG';
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