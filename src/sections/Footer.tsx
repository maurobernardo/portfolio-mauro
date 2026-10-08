import { Facebook, Github, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const quickLinks = [
  { href: '#inicio', labelKey: 'nav.home' },
  { href: '#sobre', labelKey: 'nav.about' },
  { href: '#skills', labelKey: 'nav.skills' },
  { href: '#projetos', labelKey: 'nav.projects' },
  { href: '#certificados', labelKey: 'nav.certificates' },
  { href: '#experiencia', labelKey: 'nav.experience' },
  { href: '#momentos', labelKey: 'nav.highlights' },
  { href: '#contato', labelKey: 'nav.contact' },
] as const;

const socials = [
  { href: 'https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://github.com/maurobernardo?tab=repositories', label: 'GitHub', Icon: Github },
  { href: 'https://www.facebook.com/mauroutall.mbz', label: 'Facebook', Icon: Facebook },
  { href: 'https://www.instagram.com/_mauro_zibane10_/', label: 'Instagram', Icon: Instagram },
] as const;

const link = 'transition-colors duration-500 hover:text-foreground';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-card">
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-[var(--gutter)] pb-8 pt-[clamp(56px,8vh,96px)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,4fr)]">
          <div>
            <a href="#inicio" className="inline-flex items-center gap-3">
              <img src="/profile10.png" alt="" className="h-12 w-12 rounded-full border border-foreground/15 object-cover" />
              <span className="text-lg font-bold tracking-tight">Mauro Zibane</span>
            </a>
            <p className="mt-6 max-w-sm text-2xl leading-snug tracking-tight">
              <span className="font-serif italic text-muted-foreground">{t('footer.tagline')}</span>
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-foreground/15 transition-all duration-500 hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mz-tag mb-5">{t('footer.quickLinks')}</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground lg:grid-cols-1">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>{t(l.labelKey)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mz-tag mb-5">{t('footer.contactTitle')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:maurobernardozibane@gmail.com" className={`inline-flex items-center gap-2 ${link}`}>
                  <Mail size={14} className="flex-shrink-0" /> maurobernardozibane@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+258842767435" className={`inline-flex items-center gap-2 ${link}`}>
                  <Phone size={14} className="flex-shrink-0" /> +258 84 276 7435
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" /> {t('contact.locationValue')}
              </li>
            </ul>
            <a href="#inicio" className="mz-btn mz-btn-ghost mt-8 px-5 py-2.5">
              <ArrowUp size={14} />
              {t('footer.backToTop')}
            </a>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none mt-14 block select-none text-center text-[17vw] font-extrabold uppercase leading-[0.8] lg:text-[13vw]"
          style={{ color: 'transparent', WebkitTextStroke: '1px hsl(var(--foreground) / 0.14)', letterSpacing: '-0.05em' }}
        >
          Zibane
        </span>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-foreground/10 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Mauro Zibane. {t('footer.copyright')}</p>
          <p>{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  );
}
