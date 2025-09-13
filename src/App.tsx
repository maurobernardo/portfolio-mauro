import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Services from './sections/Services'; // Import the new Services component
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-3 py-2 rounded">Pular para o conteúdo</a>
      <Navbar />
      <main id="conteudo" className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Services /> {/* Add the new Services section here */}
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;


