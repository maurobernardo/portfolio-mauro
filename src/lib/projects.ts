export type FilterKey = 'all' | 'web' | 'mobile' | 'fullstack';
export type StatusKey = 'live' | 'dev' | 'private';

export type ProjectMeta = {
  stack: string[];
  link?: string;
  repo?: string;
  image?: string;
  filter: FilterKey;
  status: StatusKey;
  caseStudy?: boolean;
};

// A ordem define os índices das chaves de tradução `projects.N.*`.
export const projectsMeta: ProjectMeta[] = [
  { stack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'PostgreSQL'], link: 'https://dataportal.co.mz/', image: '/Data.png', filter: 'fullstack', status: 'live', caseStudy: true },
  { stack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'], link: 'https://agro-tech-mozambique.vercel.app/', image: '/Agro.png', filter: 'web', status: 'live', caseStudy: true },
  { stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], link: 'https://antonio-inguane.vercel.app/', image: '/Antonio.png', filter: 'web', status: 'live', caseStudy: true },
  { stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], link: 'https://ancapa-global.vercel.app/', image: '/ancapa.png', filter: 'web', status: 'live', caseStudy: true },
  { stack: ['Next.js', 'TypeScript', 'Framer Motion', 'next-intl', 'Tailwind CSS'], link: 'https://bioclean-environment.vercel.app/pt', image: '/Bio.png', filter: 'web', status: 'live', caseStudy: true },
  { stack: ['React', 'TypeScript', 'Tailwind CSS'], image: '/metri.png', filter: 'web', status: 'live' },
  { stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], link: 'https://deyril-marlon.vercel.app/', image: '/Deyril.png', filter: 'web', status: 'live' },
];

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
  'Framer Motion': '/icons/react.svg',
  'next-intl': '/icons/nextjs.svg',
};
