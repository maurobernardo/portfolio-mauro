import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Splash from './components/Splash';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Showreel from './sections/Showreel';
import Certifications from './sections/Certifications';
import Experience from './sections/Experience';
import { ToCertifications, ToContact, ToExperience, ToProjects, ToSkills } from './sections/Bridges';
import HighlightsFilm from './sections/HighlightsFilm';
import Highlights from './sections/Highlights';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { scrollToTarget, useSmoothScroll } from './lib/scroll';

function SkipLink() {
  const { t } = useLanguage();
  return (
    <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
      {t('a11y.skip')}
    </a>
  );
}

function App() {
  useSmoothScroll();

  useEffect(() => {
    if (window.location.hash) setTimeout(() => scrollToTarget(window.location.hash), 300);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Splash />
        <SkipLink />
        <Navbar />
        <main id="conteudo">
          <Hero />
          <About />
          <ToSkills />
          <Skills />
          <ToProjects />
          <Projects />
          <Showreel />
          <ToCertifications />
          <Certifications />
          <ToExperience />
          <Experience />
          <HighlightsFilm />
          <Highlights />
          <ToContact />
          <Contact />
        </main>
        <Chatbot />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
