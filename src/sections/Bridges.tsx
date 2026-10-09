import SectionBridge from '../components/SectionBridge';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsMeta } from '../lib/projects';
import { SKILLS } from './Skills';
import { certificationsData } from './Certifications';

/* Passagens entre secções: cada uma usa o conteúdo da secção que vem a seguir. */

export function ToSkills() {
  const { t } = useLanguage();
  return <SectionBridge items={SKILLS.map((s) => ({ kind: 'icon', src: s.svg, label: s.name }))} a={t('bridge.skillsA')} b={t('bridge.skillsB')} />;
}

export function ToProjects() {
  const { t } = useLanguage();
  const shots = projectsMeta.flatMap((p) => (p.image ? [{ kind: 'photo' as const, src: p.image }] : []));
  return <SectionBridge items={[...shots, ...shots]} a={t('bridge.projectsA')} b={t('bridge.projectsB')} />;
}

export function ToCertifications() {
  const { t } = useLanguage();
  const certs = certificationsData.map((c) => ({ kind: 'photo' as const, src: c.image }));
  return <SectionBridge items={[...certs, ...certs, ...certs]} a={t('bridge.certsA')} b={t('bridge.certsB')} />;
}

export function ToExperience() {
  const { t } = useLanguage();
  const periods = [t('education.0.period'), ...[0, 1, 2, 3, 4].map((i) => t(`experience.${i}.period`))].join(' ');
  const years = [...new Set(periods.match(/\d{4}/g) ?? [])].sort();
  const words = years.flatMap((y) => [y, y, y, y]).map((label) => ({ kind: 'word' as const, label }));
  return <SectionBridge items={words} a={t('bridge.expA')} b={t('bridge.expB')} />;
}

export function ToContact() {
  const { t } = useLanguage();
  const words = ['Hello', 'Olá', '@', 'WhatsApp', 'LinkedIn', 'GitHub', 'E-mail', 'Hello', 'Olá', '→', 'Let’s talk', 'Vamos'];
  return <SectionBridge items={words.map((label) => ({ kind: 'word', label }))} a={t('bridge.contactA')} b={t('bridge.contactB')} />;
}
