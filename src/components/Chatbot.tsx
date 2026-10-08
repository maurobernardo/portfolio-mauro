import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_PHONE = '258842767435';
const WHATSAPP_MESSAGE =
  'Olá Mauro! Tenho uma ideia, projeto ou solução em mente e gostaria de conversar contigo.';

/** Convite "Vamos conversar": cartão no canto, sem bloquear a página. */
export default function Chatbot() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 450);
  };

  return (
    <>
      {visible && (
        <aside
          role="dialog"
          aria-labelledby="popup-title"
          className="fixed bottom-24 right-4 z-[70] w-[calc(100vw-2rem)] max-w-[380px] sm:bottom-28 sm:right-6"
          style={{ animation: `${closing ? 'mz-chat-out' : 'mz-chat-in'} 0.7s var(--ease) both` }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-foreground/10 bg-card p-5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)]">
            <button
              onClick={handleClose}
              aria-label={t('popup.close')}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-foreground/15 text-muted-foreground transition-all duration-500 hover:rotate-90 hover:bg-foreground hover:text-background"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <span className="relative">
                <img src="/profile10.png" alt="" className="h-12 w-12 rounded-full border border-foreground/15 object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-foreground" />
              </span>
              <p className="mz-tag">{t('popup.eyebrow')}</p>
            </div>

            <h2 id="popup-title" className="mt-4 text-3xl font-bold leading-[0.95] sm:text-4xl">
              <span className="font-serif font-normal italic text-muted-foreground">{t('popup.title')}</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{t('popup.message1')}</p>
            <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">{t("popup.message2")}</p>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleClose}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all duration-500 hover:-translate-y-0.5"
              >
                <FaWhatsapp size={17} />
                {t('popup.whatsappButton')}
                <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-foreground/15 px-5 py-3.5 text-sm font-medium text-muted-foreground transition-all duration-500 hover:border-foreground hover:text-foreground"
              >
                {t('popup.later')}
              </button>
            </div>
          </div>
        </aside>
      )}

      <div className="fixed bottom-5 right-5 z-[60]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={t('popup.whatsappButton')}
          title={t('popup.whatsappButton')}
          className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all duration-500 hover:-translate-y-0.5"
        >
          {!visible && <span className="absolute inset-0 rounded-full border border-foreground" style={{ animation: 'mz-ping 2.4s ease-out infinite' }} />}
          <FaWhatsapp size={26} />
        </a>
      </div>
      <style>{`
        @keyframes mz-chat-in{from{opacity:0;transform:translateY(28px) scale(.96)}to{opacity:1;transform:none}}
        @keyframes mz-chat-out{from{opacity:1;transform:none}to{opacity:0;transform:translateY(20px) scale(.97)}}
      `}</style>
    </>
  );
}
