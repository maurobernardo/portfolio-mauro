import { Facebook, Github, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const quickLinks = [
  { href: '#inicio', labelKey: 'nav.home' },
  { href: '#sobre', labelKey: 'nav.about' },
  { href: '#skills', labelKey: 'nav.skills' },
  { href: '#projetos', labelKey: 'nav.projects' },
  { href: '#experiencia', labelKey: 'nav.experience' },
  { href: '#certificados', labelKey: 'nav.certificates' },
  { href: '#contato', labelKey: 'nav.contact' },
] as const;

const socials = [
  { href: 'https://www.linkedin.com/in/mauro-bernardo-zibane-5619b427a/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://github.com/maurobernardo?tab=repositories', label: 'GitHub', Icon: Github },
  { href: 'https://www.facebook.com/mauroutall.mbz', label: 'Facebook', Icon: Facebook },
  { href: 'https://www.instagram.com/_mauro_zibane10_/', label: 'Instagram', Icon: Instagram },
] as const;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-border/70 bg-card/60">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#inicio" className="inline-flex items-center gap-3">
              <img src="/profile10.png" alt="Mauro Zibane" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-bold text-foreground">Mauro Zibane</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    {t(l.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="mailto:maurobernardozibane@gmail.com" className="inline-flex items-center gap-2 hover:text-primary transition-colors duration-200">
                  <Mail size={14} className="flex-shrink-0" /> zibanejr@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+258842767435" className="inline-flex items-center gap-2 hover:text-primary transition-colors duration-200">
                  <Phone size={14} className="flex-shrink-0" /> +258 84 276 7435
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" /> {t('contact.locationValue')}
              </li>
            </ul>
          </div>

          {/* Back to top */}
          <div className="flex sm:justify-end lg:justify-end items-start">
            <a
              href="#inicio"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:-translate-y-0.5"
            >
              <ArrowUp size={14} />
              {t('footer.backToTop')}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Mauro Zibane. {t('footer.copyright')}</p>
          <p>{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  );
}
