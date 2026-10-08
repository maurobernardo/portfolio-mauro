import { useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Experience from './sections/Experience';
import Highlights from './sections/Highlights';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { scrollToTarget, useSmoothScroll } from './lib/scroll';

function App() {
  useSmoothScroll();

  useEffect(() => {
    if (window.location.hash) setTimeout(() => scrollToTarget(window.location.hash), 300);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Experience />
          <Highlights />
          <Contact />
        </main>
        <Chatbot />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
