export type FilterKey = 'all' | 'web' | 'mobile' | 'fullstack';
export type StatusKey = 'live' | 'dev' | 'private';

export type ProjectMeta = {
  /** Índice das chaves de tradução `projects.N.*` (fixo; a ordem do array é a de apresentação). */
  tk: number;
  stack: string[];
  link?: string;
  repo?: string;
  image?: string;
  /** Ecrãs de telemóvel (app móvel): mostrados numa moldura de telemóvel em vez de browser. */
  screens?: string[];
  filter: FilterKey;
  status: StatusKey;
  caseStudy?: boolean;
  /** Projetos principais, destacados no topo da secção. */
  flagship?: boolean;
};

const TERRA_SCREENS = Array.from({ length: 8 }, (_, i) => `/terra-app-${i + 1}.webp`);

export const projectsMeta: ProjectMeta[] = [
  { tk: 0, stack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'PostgreSQL'], link: 'https://dataportal.co.mz/', image: '/Data.webp', filter: 'fullstack', status: 'live', caseStudy: true, flagship: true },
  { tk: 9, stack: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'PostGIS', 'Node.js', 'Python'], link: 'https://terramoz.com/', image: '/terra.webp', filter: 'fullstack', status: 'live', caseStudy: true, flagship: true },
  { tk: 10, stack: ['React Native', 'Tailwind CSS', 'Node.js', 'Python', 'PostGIS'], link: 'https://terramoz.com/', image: TERRA_SCREENS[0], screens: TERRA_SCREENS, filter: 'mobile', status: 'live', caseStudy: true, flagship: true },
  { tk: 1, stack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'], link: 'https://agro-tech-mozambique.vercel.app/', image: '/Agro.webp', filter: 'web', status: 'live', caseStudy: true },
  { tk: 2, stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], link: 'https://antonio-inguane.vercel.app/', image: '/Antonio.webp', filter: 'web', status: 'live', caseStudy: true },
  { tk: 3, stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], link: 'https://ancapa-global.vercel.app/', image: '/ancapa.webp', filter: 'web', status: 'live', caseStudy: true },
  { tk: 4, stack: ['Next.js', 'TypeScript', 'Framer Motion', 'next-intl', 'Tailwind CSS'], link: 'https://bioclean-environment.vercel.app/pt', image: '/Bio.webp', filter: 'web', status: 'live', caseStudy: true },
  { tk: 5, stack: ['React', 'TypeScript', 'Tailwind CSS'], image: '/metri.webp', filter: 'web', status: 'live' },
  { tk: 6, stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], link: 'https://deyril-marlon.vercel.app/', image: '/Deyril.webp', filter: 'web', status: 'live' },
  { tk: 7, stack: ['Next.js', 'Tailwind CSS'], link: 'https://paulo-macamo.vercel.app/', image: '/paulo.webp', filter: 'web', status: 'live', caseStudy: true },
  { tk: 8, stack: ['React'], link: 'https://michel-domingos.vercel.app/', image: '/michel.webp', filter: 'web', status: 'live', caseStudy: true },
];

/** Prefixo das chaves de tradução de um projeto. */
export const pk = (p: ProjectMeta) => `projects.${p.tk}`;

export const iconMap: Record<string, string> = {
  'React': '/icons/react.svg',
  'React Native': '/icons/react.svg',
  'Next.js': '/icons/nextjs.svg',
  'TypeScript': '/icons/typescript.svg',
  'Tailwind CSS': '/icons/tailwindcss.svg',
  'Java': '/icons/java.svg',
  'MySQL': '/icons/mysql.svg',
  'Laravel': '/icons/laravel.svg',
  'PHP': '/icons/php.svg',
  'PostgreSQL': '/icons/postgresql.svg',
  'PostGIS': '/icons/postgresql.svg',
  'Node.js': '/icons/nodejs.svg',
  'Python': '/icons/python.svg',
  'Framer Motion': '/icons/react.svg',
  'next-intl': '/icons/nextjs.svg',
};
