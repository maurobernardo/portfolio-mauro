import { useState } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SectionPattern from '../components/SectionPattern';
import { useInView } from '../lib/hooks';
import { projectsMeta } from '../lib/projects';
import { useLanguage } from '../contexts/LanguageContext';

type Family = 'frontend' | 'backend' | 'fullstack' | 'gis';
type Skill = { name: string; symbol: string; svg: string; family: Family; match: string };

// Ordem = número atómico (1..n). Símbolo de 2 letras.
export const SKILLS: Skill[] = [
  { name: 'Next.js', symbol: 'Nx', svg: '/icons/nextjs.svg', family: 'frontend', match: 'next' },
  { name: 'React Native', symbol: 'Rn', svg: '/icons/react.svg', family: 'frontend', match: 'react native' },
  { name: 'Angular', symbol: 'An', svg: '/icons/tech/angular.svg', family: 'frontend', match: 'angular' },
  { name: 'Flutter', symbol: 'Fl', svg: '/icons/flutter.svg', family: 'frontend', match: 'flutter' },
  { name: 'Java', symbol: 'Jv', svg: '/icons/java.svg', family: 'backend', match: 'java' },
  { name: 'Node.js', symbol: 'No', svg: '/icons/nodejs.svg', family: 'backend', match: 'node' },
  { name: 'Golang', symbol: 'Go', svg: '/icons/golang.svg', family: 'backend', match: 'golang' },
  { name: 'MySQL', symbol: 'My', svg: '/icons/mysql.svg', family: 'backend', match: 'mysql' },
  { name: 'Python', symbol: 'Py', svg: '/icons/python.svg', family: 'fullstack', match: 'python' },
  { name: 'PHP', symbol: 'Ph', svg: '/icons/php.svg', family: 'fullstack', match: 'php' },
  { name: 'JavaScript', symbol: 'Js', svg: '/icons/tech/js.svg', family: 'fullstack', match: 'javascript' },
  { name: 'Dart', symbol: 'Da', svg: '/icons/dart.svg', family: 'fullstack', match: 'dart' },
  { name: 'PostgreSQL / PostGIS', symbol: 'Pg', svg: '/icons/postgresql.svg', family: 'gis', match: 'postgres' },
  { name: 'QGIS', symbol: 'Qg', svg: '/icons/qgis.svg', family: 'gis', match: 'qgis' },
  { name: 'Leaflet', symbol: 'Lf', svg: '/icons/leaflet.svg', family: 'gis', match: 'leaflet' },
  { name: 'Power BI', symbol: 'Pb', svg: '/icons/powerbi.svg', family: 'gis', match: 'power bi' },
];

const FAMILIES: Family[] = ['frontend', 'backend', 'fullstack', 'gis'];
const COLS = 8;

export default function Skills() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Family | 'all'>('all');
  const [sel, setSel] = useState(0);
  const [gridRef, seen] = useInView<HTMLUListElement>(0.1);

  const famLabel = (f: Family) => (f === 'gis' ? 'GIS' : t(f === 'fullstack' ? 'skills.fullStack' : `skills.${f}`));
  const active = SKILLS[sel];
  const usedIn = projectsMeta
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.stack.some((s) => s.toLowerCase().includes(active.match)));

  return (
    <section id="skills" className="relative border-t border-border/70 py-[clamp(56px,8vh,96px)]">
      <SectionPattern />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <SectionHeader no="02" eyebrow={t('eyebrow.skills')} title={t('skills.title')} subtitle={t('skills.subtitle')} />

        <Reveal>
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={t('a11y.filterSkills')}>
            {(['all', ...FAMILIES] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-500 ${
                  filter === f ? 'border-foreground bg-foreground text-background' : 'border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                }`}
              >
                {f === 'all' ? t('skills.all') : famLabel(f)}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ul ref={gridRef} className="grid grid-cols-4 content-start gap-3 md:grid-cols-8">
            {SKILLS.map((s, i) => {
              const row = Math.floor(i / COLS);
              const col = i % COLS;
              const dim = filter !== 'all' && s.family !== filter;
              return (
                <li
                  key={s.name}
                  style={{
                    transitionDelay: seen ? `${(row + col) * 40}ms` : '0ms',
                    transitionTimingFunction: 'var(--ease)',
                  }}
                  className={`transition-all duration-700 ${seen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setSel(i)}
                    onFocus={() => setSel(i)}
                    onClick={() => setSel(i)}
                    aria-label={`${s.name}, ${famLabel(s.family)}`}
                    className={`group flex aspect-square w-full flex-col justify-between rounded-2xl border bg-card p-2.5 text-left transition-all duration-500 hover:-translate-y-1 ${
                      sel === i ? 'border-foreground shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]' : 'border-foreground/10'
                    } ${dim ? 'opacity-25' : ''}`}
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-2xl font-bold leading-none tracking-tight sm:text-3xl">{s.symbol}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-[10px] font-semibold leading-tight">{s.name}</span>
                      <span className="block truncate font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{famLabel(s.family)}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Inspetor */}
          <aside className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
            <div className="rounded-[28px] border border-foreground/10 bg-card p-7">
              <p className="mz-tag">{String(sel + 1).padStart(2, '0')} · {famLabel(active.family)}</p>
              <div className="mt-6 grid h-[150px] place-items-center rounded-[20px] bg-secondary">
                <img
                  key={active.name}
                  src={active.svg}
                  alt={active.name}
                  className="h-[88px] w-[88px] object-contain"
                  style={{ animation: 'mz-pop 0.6s var(--ease)' }}
                />
              </div>
              <h3 className="mt-6 text-3xl font-bold leading-tight">{active.name}</h3>
              <p className="mz-tag mt-5">{t('skills.usedIn')}</p>
              {usedIn.length ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {usedIn.map(({ i }) => (
                    <li key={i} className="rounded-full border border-foreground/10 bg-secondary px-3 py-1 text-xs font-medium">
                      {t(`projects.${i}.title`)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">{t('skills.noProjects')}</p>
              )}
            </div>
            <p className="mz-tag mt-4 text-center lg:text-left">{t('skills.hint')}</p>
          </aside>
        </div>
      </div>
      <style>{`@keyframes mz-pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}`}</style>
    </section>
  );
}
