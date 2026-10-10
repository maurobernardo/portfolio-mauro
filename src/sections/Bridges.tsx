import SectionBridge, { BridgeItem } from '../components/SectionBridge';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsMeta } from '../lib/projects';
import { SKILLS } from './Skills';
import { certificationsData } from './Certifications';
import { highlightsData } from './Highlights';

/* Passagens entre secções. A descer usam o conteúdo da secção seguinte; a subir, o da secção de cima. */

const shots: BridgeItem[] = projectsMeta.flatMap((p) => (p.image ? [{ kind: 'photo' as const, src: p.image }] : []));
const skills: BridgeItem[] = SKILLS.map((s) => ({ kind: 'icon', src: s.svg, label: s.name }));
const certs: BridgeItem[] = certificationsData.map((c) => ({ kind: 'photo', src: c.image }));
const moments: BridgeItem[] = highlightsData.flatMap((h) => h.photos.map((src) => ({ kind: 'photo' as const, src })));

export function ToSkills() {
  const { t } = useLanguage();
  const about: BridgeItem[] = [
    'Mauro', 'Zibane', ...t('about.locationValue').split(',').slice(-2), ...t('about.educationValue').split(' - '), ...t('about.languagesValue').split(/,| e | and /),
  ]
    .map((w) => w.trim())
    .filter(Boolean)
    .map((label) => ({ kind: 'word', label }));
  return (
    <SectionBridge
      items={skills}
      a={t('bridge.skillsA')}
      b={t('bridge.skillsB')}
      back={{ items: [{ kind: 'photo', src: '/profile10.png' }, ...about, ...about], a: t('bridge.backAboutA'), b: t('bridge.backAboutB') }}
    />
  );
}

export function ToProjects() {
  const { t } = useLanguage();
  return (
    <SectionBridge
      items={[...shots, ...shots]}
      a={t('bridge.projectsA')}
      b={t('bridge.projectsB')}
      back={{ items: skills, a: t('bridge.backSkillsA'), b: t('bridge.backSkillsB') }}
    />
  );
}

export function ToCertifications() {
  const { t } = useLanguage();
  return (
    <SectionBridge
      items={[...certs, ...certs, ...certs]}
      a={t('bridge.certsA')}
      b={t('bridge.certsB')}
      back={{ items: [...shots, ...shots], a: t('bridge.backWorkA'), b: t('bridge.backWorkB') }}
    />
  );
}

export function ToExperience() {
  const { t } = useLanguage();
  const periods = [t('education.0.period'), ...[0, 1, 2, 3, 4].map((i) => t(`experience.${i}.period`))].join(' ');
  const years = [...new Set(periods.match(/\d{4}/g) ?? [])].sort();
  const words: BridgeItem[] = years.flatMap((y) => [y, y, y, y]).map((label) => ({ kind: 'word', label }));
  return (
    <SectionBridge
      items={words}
      a={t('bridge.expA')}
      b={t('bridge.expB')}
      back={{ items: [...certs, ...certs, ...certs], a: t('bridge.backCertsA'), b: t('bridge.backCertsB') }}
    />
  );
}

export function ToContact() {
  const { t } = useLanguage();
  const words = ['Hello', 'Olá', '@', 'WhatsApp', 'LinkedIn', 'GitHub', 'E-mail', 'Hello', 'Olá', '→', 'Let’s talk', 'Vamos'];
  return (
    <SectionBridge
      items={words.map((label) => ({ kind: 'word', label }))}
      a={t('bridge.contactA')}
      b={t('bridge.contactB')}
      back={{ items: moments, a: t('bridge.backMomentsA'), b: t('bridge.backMomentsB') }}
    />
  );
}
