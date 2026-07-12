import { useEffect, useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_PHONE = '258842767435';
const WHATSAPP_MESSAGE =
  'Olá Mauro! Tenho uma ideia, projeto ou solução em mente e gostaria de conversar contigo.';

export default function Chatbot() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 280);
  };

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label={t('popup.close')}
            className={`absolute inset-0 bg-black/45 backdrop-blur-md ${
              closing ? 'animate-popup-overlay-out' : 'animate-popup-overlay-in'
            }`}
            onClick={handleClose}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            className={`relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-primary/20 bg-card/90 shadow-[0_24px_80px_-12px_rgba(0,217,255,0.25)] backdrop-blur-2xl ${
              closing ? 'animate-popup-modal-out' : 'animate-popup-modal-in'
            }`}
          >
            <div className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full bg-[#00D9FF]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 animate-popup-shine bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00D9FF] via-primary to-[#00D9FF]/40" />

            <button
              onClick={handleClose}
              aria-label={t('popup.close')}
              className="absolute right-4 top-4 z-10 rounded-full border border-primary/15 bg-background/60 p-2 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-background hover:text-primary hover:rotate-90"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 px-7 pb-7 pt-8 sm:px-9 sm:pb-9 sm:pt-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
                  <Sparkles size={20} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00D9FF]">
                    {t('popup.eyebrow')}
                  </p>
                  <h2 id="popup-title" className="text-xl font-bold text-foreground sm:text-2xl">
                    {t('popup.title')}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <p className="animate-fade-in-up text-[15px] leading-relaxed text-foreground/90 sm:text-base [animation-delay:120ms] [animation-fill-mode:both] opacity-0">
                  {t('popup.message1')}
                </p>
                <p className="animate-fade-in-up text-sm leading-relaxed text-muted-foreground sm:text-[15px] [animation-delay:220ms] [animation-fill-mode:both] opacity-0">
                  {t('popup.message2')}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-in-up [animation-delay:320ms] [animation-fill-mode:both] opacity-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleClose}
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 sm:flex-1"
                >
                  <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                  <span className="relative">{t('popup.whatsappButton')}</span>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex w-full items-center justify-center rounded-full border border-primary/15 bg-background/50 px-6 py-3.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/25 hover:bg-background hover:text-foreground sm:w-auto"
                >
                  {t('popup.later')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-[60]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={t('popup.whatsappButton')}
          title={t('popup.whatsappButton')}
          className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <MessageCircle size={26} />
        </a>
      </div>
    </>
  );
}
