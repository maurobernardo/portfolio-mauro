import Reveal from '../components/Reveal';
import RotatingText from '../components/RotatingText';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden min-h-screen flex items-center py-20 sm:py-28 lg:py-32">
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
          backgroundImage: 'radial-gradient(ellipse at right, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left content: text and buttons */}
          <div className="flex-1 text-center lg:text-left">
            <Reveal delayMs={0}>
              <p className="text-lg font-medium text-primary mb-2">Bem-Vindo ao Meu Portfólio!</p>
            </Reveal>
            <Reveal delayMs={80}>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl" style={{ lineHeight: '1.3' }}>
                Olá, eu sou{' '}
                <span className="text-primary inline-block relative" style={{ display: 'inline-block', verticalAlign: 'top' }}>
                  <RotatingText phrases={['Mauro Zibane', 'Desenvolvedor Full Stack', 'Engenheiro de Software', 'Estudante de Tecnologia de Informação']} intervalMs={4000} />
                </span>
              </h1>
            </Reveal>
            <Reveal delayMs={160}>
              <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto lg:mx-0">
                Desenvolvedor Full Stack em formação com paixão por criar soluções modernas e escaláveis.
              </p>
            </Reveal>
            <Reveal delayMs={240}>
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="/path-to-your-cv.pdf" download className="rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-px active:translate-y-px">
                  Download CV
                </a>
                <a href="#projetos" className="rounded-full border border-input px-8 py-4 font-semibold text-foreground transition-all hover:bg-muted hover:text-primary hover:shadow-sm hover:-translate-y-px">
                  Ver Meu Trabalho
                </a>
              </div>
            </Reveal>
            {/* Scroll Down Indicator */}
            <Reveal delayMs={320}>
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-muted-foreground/30 text-sm animate-bounce">
                  0
                </span>
                <span>Scroll down</span>
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
          <div className="relative flex-shrink-0 mt-12 lg:mt-0">
            {/* Photo / Avatar */}
            <Reveal delayMs={480} className="relative z-10">
              <div className="relative h-80 w-80 rounded-full flex items-center justify-center overflow-hidden border-2 border-primary shadow-xl mx-auto animate-float-slow">
                <img
                  src="/profile.JPG"
                  alt="Foto de perfil de Mauro Zibane"
                  className="h-full w-full rounded-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src.endsWith('/profile.jpg')) {
                      img.onerror = null; // evita loop
                      img.src = '/profile.JPG';
                    }
                    else {
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