import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Temporário: Crie este componente no src/pages/ProjectDetail.tsx
const ProjectDetail = () => <div>Detalhes do Projeto</div>;

function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <LanguageProvider>
    <div className="min-h-screen bg-background text-foreground">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-3 py-2 rounded">Pular para o conteúdo</a>
      <Navbar />
      <main id="conteudo" className="pt-16">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Skills />
              <Services />
              <Projects />
              <Experience />
              <Contact />
            </>
          } />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Chatbot />
      <Footer />
    </div>
    </LanguageProvider>
  );
}

export default App;


