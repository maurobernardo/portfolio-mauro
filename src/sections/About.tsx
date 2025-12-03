import Reveal from '../components/Reveal';
import TypingText from '../components/TypingText';
import { CalendarDays, MapPin, GraduationCap, Languages } from 'lucide-react';

export default function About() {
  return (
    <section id="sobre" className="relative py-16 lg:py-24 text-center overflow-hidden">
      {/* Gradiente de fundo horizontal sutil - similar ao Hero */}
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 1) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 100%)' }} />
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <Reveal delayMs={0}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground mb-12">Sobre Mim</h2>
        </Reveal>

        <div className="flex flex-col items-center gap-8">
          <div className="relative flex-shrink-0 mt-12 lg:mt-0">
            {/* Photo / Avatar */}
        
            {/* Abstract elements - for visual richness */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 animate-pulse-glow z-0">
              <div className="h-full w-full rounded-full border border-primary/50 animate-morph-blob" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <Reveal delayMs={160}>
              <h3 className="text-2xl font-bold tracking-tight text-primary">Mauro Bernardo Zibane</h3>
            </Reveal>
            <Reveal delayMs={240}>
              <TypingText text="Desenvolvedor Full Stack em Formação!" className="mt-1 text-foreground font-semibold text-xl" />
            </Reveal>
            <div className="space-y-4 text-muted-foreground mt-4">
              <Reveal as="p" delayMs={320}>
                Sou um jovem desenvolvedor moçambicano apaixonado por tecnologia e inovação. Minha jornada na programação começou cedo e desde então me dedico ao aprendizado contínuo de novas tecnologias e frameworks.
              </Reveal>
              <Reveal as="p" delayMs={400}>
                Atualmente curso Tecnologia de Informação na Universidade Católica de Moçambique, onde aprofundo conhecimentos em desenvolvimento web, banco de dados e arquitetura de software.
              </Reveal>
              <Reveal as="p" delayMs={480}>
                Gosto de criar soluções eficientes e escaláveis, combinando criatividade com pensamento lógico e foco em impacto real.
              </Reveal>
            </div>
            <Reveal delayMs={560}>
              <a href="#skills" className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/30 active:translate-y-px">
                Ver Mais
              </a>
            </Reveal>
          </div>
        </div>

        {/* Badges e Progress Bars reorganizados */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16 text-left">
          <div>
            <Reveal delayMs={640}>
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-6">Informações Pessoais</h3>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
              <Badge icon={<CalendarDays size={16} />} title="Idade" value="19 anos" delayMs={680} />
              <Badge icon={<MapPin size={16} />} title="Localização" value="Beira, Moçambique" delayMs={720} />
              <Badge icon={<GraduationCap size={16} />} title="Formação" value="UCM-Tecnologia de Informação" delayMs={760} />
              <Badge icon={<Languages size={16} />} title="Idiomas" value="Português, Inglês, Changana/Xitsua" delayMs={800} />
            </div>
          </div>

          <div>
            <Reveal delayMs={880}>
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-6">Minhas Habilidades Técnicas</h3>
            </Reveal>
            <div className="grid gap-4">
              <ProgressBar label="HTML/CSS" value={80} delayMs={920} />
              <ProgressBar label="JavaScript" value={70} delayMs={960} />
              <ProgressBar label="Java" value={75} delayMs={1000} />
              <ProgressBar label="React | React-Native" value={75} delayMs={1040} />
              <ProgressBar label="Python" value={90} delayMs={1080} />
              <ProgressBar label="Excel" value={85} delayMs={1120} />
              <ProgressBar label="SQL" value={80} delayMs={1160} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, title, value, className, delayMs = 0 }: { icon: React.ReactNode; title: string; value: string; className?: string; delayMs?: number }) {
  return (
    <Reveal delayMs={delayMs}>
      <div className={["group relative rounded-2xl border border-border/50 bg-card p-5 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden", className ?? ''].join(' ')}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="flex items-center gap-2 text-muted-foreground relative z-10">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">{icon}</span>
          <span className="text-sm font-medium text-muted-foreground">{title}:</span>
        </div>
        <p className="mt-1 text-base font-semibold text-foreground relative z-10">{value}</p>
      </div>
    </Reveal>
  );
}

function ProgressBar({ label, value, delayMs = 0 }: { label: string; value: number; delayMs?: number }) {
  return (
    <Reveal delayMs={delayMs}>
      <div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-xs">{value}%</span>
        </div>
        <div className="mt-1 h-2 rounded-full bg-muted">
          <div className="h-2 rounded-full bg-primary transition-all duration-700 ease-out" style={{ width: `${value}%` }} />
        </div>
      </div>
    </Reveal>
  );
}


