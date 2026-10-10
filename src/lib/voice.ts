import { useEffect } from 'react';

/*
 * Voz de boas-vindas no hero (Web Speech API, sem ficheiros).
 * Os browsers só deixam falar depois do primeiro gesto do visitante, por isso fala no primeiro
 * clique/toque/tecla, depois do splash, uma vez por sessão e só se o hero estiver à vista.
 * Para quando se sai do hero ou se troca de idioma.
 */

const MALE = /male|daniel|david|guy|ryan|george|james|mark|alex|fred|thomas|duarte|antonio|ricardo|rui|joaquim|diego|christopher|eric|andrew|brian|liam|william/i;
const FEMALE = /female|zira|samantha|joana|francisca|maria|raquel|luciana|helena|susan|hazel|libby|sonia|jenny|aria|fernanda|catarina|victoria|karen|moira|tessa/i;

function pickVoice(lang: 'en' | 'pt') {
  const all = window.speechSynthesis.getVoices();
  const want = lang === 'pt' ? ['pt-PT', 'pt'] : ['en-GB', 'en-US', 'en'];
  for (const code of want) {
    const pool = all.filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith(code.toLowerCase()));
    const male = pool.find((v) => MALE.test(v.name) && !FEMALE.test(v.name));
    if (male) return { voice: male, male: true };
    const neutral = pool.find((v) => !FEMALE.test(v.name));
    if (neutral) return { voice: neutral, male: false };
    if (pool[0]) return { voice: pool[0], male: false };
  }
  return { voice: null, male: false };
}

export function useWelcomeVoice(lang: 'en' | 'pt', text: string) {
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const KEY = 'mz-voice-done';
    let started = false;
    let timer = 0;

    const speak = () => {
      if (started) return;
      try {
        if (sessionStorage.getItem(KEY)) return;
      } catch {
        /* sem storage: fala na mesma */
      }
      // Espera pelo fim do splash.
      if (!document.documentElement.classList.contains('mz-enter')) {
        timer = window.setTimeout(speak, 250);
        return;
      }
      if (window.scrollY > window.innerHeight * 0.6) return;
      started = true;
      const { voice, male } = pickVoice(lang);
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'pt' ? 'pt-PT' : 'en-GB';
      if (voice) u.voice = voice;
      // Sem voz masculina instalada, baixa o tom para soar mais grave.
      u.pitch = male ? 0.95 : 0.7;
      u.rate = 0.98;
      synth.cancel();
      synth.speak(u);
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* ignore */
      }
    };

    const evs = ['pointerdown', 'keydown', 'touchend'] as const;
    const onGesture = () => {
      evs.forEach((e) => window.removeEventListener(e, onGesture));
      // As vozes podem ainda não estar carregadas.
      if (synth.getVoices().length) speak();
      else synth.addEventListener('voiceschanged', speak, { once: true });
    };
    evs.forEach((e) => window.addEventListener(e, onGesture));

    const onScroll = () => {
      if (started && synth.speaking && window.scrollY > window.innerHeight * 0.8) synth.cancel();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      evs.forEach((e) => window.removeEventListener(e, onGesture));
      window.removeEventListener('scroll', onScroll);
      synth.removeEventListener('voiceschanged', speak);
      clearTimeout(timer);
      synth.cancel();
    };
  }, [lang, text]);
}
