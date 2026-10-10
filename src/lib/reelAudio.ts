/* Bandas sonoras geradas em tempo real (Web Audio): sem ficheiros.
   'beat': arpejador de dados em ré dórico a 96 bpm, sub-grave, eco, glitches e quedas de grave (showreel).
   'memory': caixinha de música em arpejo, pad quente e estalidos de vinil (filme dos Highlights). */

export type ReelAudio = {
  start: () => void;
  stop: () => void;
  cut: (kind: 'whoosh' | 'hit') => void;
  type: (n: number) => void;
  close: () => void;
};

export type Mood = 'beat' | 'memory';

export function createReelAudio(mood: Mood = 'beat'): ReelAudio {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0.55;
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp).connect(ctx.destination);

  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

  const env = (g: GainNode, t: number, peak: number, a: number, r: number) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + r);
  };

  const noiseHit = (t: number, type: BiquadFilterType, f: number, peak: number, r: number, q = 1) => {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const fl = ctx.createBiquadFilter();
    fl.type = type;
    fl.frequency.value = f;
    fl.Q.value = q;
    const g = ctx.createGain();
    env(g, t, peak, 0.002, r);
    src.connect(fl).connect(g).connect(master);
    src.start(t, Math.random() * 0.5);
    src.stop(t + r + 0.05);
    return fl;
  };

  const kick = (t: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.18);
    env(g, t, 0.9, 0.003, 0.35);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.4);
  };

  // --- 'beat' (showreel): arpejador de "dados" em ré dórico, sub-grave, eco e glitches ---
  const echo = ctx.createDelay(1);
  echo.delayTime.value = 0.156 * 3; // três semicolcheias a 96 bpm
  const echoFb = ctx.createGain();
  echoFb.gain.value = 0.38;
  const echoTone = ctx.createBiquadFilter();
  echoTone.type = 'lowpass';
  echoTone.frequency.value = 2200;
  echo.connect(echoTone).connect(echoFb).connect(echo);
  echoTone.connect(master);

  const tone = (t: number, f: number, type: OscillatorType, peak: number, len: number, cutoff: number, wet = false) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = f;
    const fl = ctx.createBiquadFilter();
    fl.type = 'lowpass';
    fl.frequency.setValueAtTime(cutoff, t);
    fl.frequency.exponentialRampToValueAtTime(Math.max(80, cutoff / 6), t + len);
    const g = ctx.createGain();
    env(g, t, peak, 0.003, len);
    o.connect(fl).connect(g).connect(master);
    if (wet) g.connect(echo);
    o.start(t);
    o.stop(t + len + 0.05);
    return o;
  };

  // Ré dórico: D F A C E, e o baixo D · D · Bb · C.
  const ARP_BEAT = [293.66, 349.23, 440, 523.25, 659.25, 523.25, 440, 349.23];
  const SUB = [73.42, 73.42, 58.27, 65.41];
  const blip = (t: number, f: number, peak = 0.06) => tone(t, f, 'sine', peak, 0.05, 6000, true);

  // --- 'memory' ---
  const bell = (t: number, f: number, peak: number, len: number) => {
    [1, 2, 3.01].forEach((h, k) => {
      const o = ctx.createOscillator();
      o.frequency.value = f * h;
      const g = ctx.createGain();
      env(g, t, peak / (1 + k * 2.5), 0.004, len / (1 + k));
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + len + 0.1);
    });
  };
  const pad = (t: number, notes: number[], len: number) => {
    const fl = ctx.createBiquadFilter();
    fl.type = 'lowpass';
    fl.frequency.value = 700;
    fl.connect(master);
    notes.forEach((f) =>
      [-4, 4].forEach((cents) => {
        const o = ctx.createOscillator();
        o.type = 'triangle';
        o.frequency.value = f / 2;
        o.detune.value = cents;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.035, t + 1.2);
        g.gain.exponentialRampToValueAtTime(0.0001, t + len);
        o.connect(g).connect(fl);
        o.start(t);
        o.stop(t + len + 0.1);
      })
    );
  };
  // Cmaj7 · Am7 · Fmaj7 · G6 (Hz)
  const CHORDS = [
    [261.63, 329.63, 392, 493.88],
    [220, 261.63, 329.63, 392],
    [174.61, 220, 261.63, 329.63],
    [196, 246.94, 293.66, 329.63],
  ];
  const ARP = [0, 1, 2, 3, 2, 1, 2, 3];

  const STEP = mood === 'memory' ? 0.24 : 0.156; // colcheia a ~62 bpm / semicolcheia a 96 bpm
  let timer = 0;
  let step = 0;
  let next = 0;

  const schedule = () => {
    while (next < ctx.currentTime + 0.12) {
      if (mood === 'memory') {
        const bar = Math.floor(step / 16) % 4;
        const s = step % 16;
        const chord = CHORDS[bar];
        if (s === 0) pad(next, chord, STEP * 17);
        if (s % 2 === 0) bell(next, chord[ARP[(s / 2) % 8]] * (s >= 8 ? 2 : 1), 0.07, 2.2);
        if (Math.random() < 0.35) noiseHit(next + Math.random() * STEP, 'highpass', 3000, 0.02 + Math.random() * 0.03, 0.008); // vinil
        next += STEP;
        step++;
        continue;
      }
      const s = step % 16;
      const bar = Math.floor(step / 16) % 4;
      if (s === 0 || s === 8) kick(next); // meio-tempo, mais cinematográfico
      if (s === 14) tone(next, 110, 'sine', 0.35, 0.25, 400); // tom grave antes do compasso
      if (s === 0) tone(next, SUB[bar], 'triangle', 0.3, STEP * 15, 300);
      // Arpejo "de dados": pluck quadrado com eco; sobe uma oitava na segunda metade.
      tone(next, ARP_BEAT[s % 8] * (bar >= 2 && s >= 8 ? 2 : 1), 'square', s % 4 === 0 ? 0.06 : 0.035, 0.14, 2600, true);
      if (s % 4 === 2) blip(next, 2637, 0.025); // tique de relógio
      if (s === 4 || s === 12) noiseHit(next, 'bandpass', 3200, 0.12, 0.06, 4); // snap seco
      next += STEP;
      step++;
    }
  };

  return {
    start() {
      void ctx.resume();
      if (timer) return;
      next = ctx.currentTime + 0.05;
      timer = window.setInterval(schedule, 25);
    },
    stop() {
      clearInterval(timer);
      timer = 0;
    },
    cut(kind) {
      const t = ctx.currentTime;
      if (mood === 'memory') {
        if (kind === 'hit') CHORDS[0].forEach((f, k) => bell(t + k * 0.06, f / 2, 0.08, 3));
        else {
          const fl = noiseHit(t, 'lowpass', 400, 0.12, 0.9);
          fl.frequency.exponentialRampToValueAtTime(1400, t + 0.8);
        }
        return;
      }
      if (kind === 'hit') {
        // Queda de sub-grave + "ping" metálico.
        const o = tone(t, 90, 'sine', 0.8, 1.2, 600);
        o.frequency.exponentialRampToValueAtTime(28, t + 1.1);
        tone(t, 1567.98, 'triangle', 0.08, 1.4, 5000, true);
        return;
      }
      // Glitch: rajada de bips aleatórios e um varrimento a descer.
      for (let i = 0; i < 6; i++) blip(t + i * 0.035, 1000 + Math.random() * 3000, 0.05);
      const sw = tone(t, 1400, 'sawtooth', 0.12, 0.35, 3000);
      sw.frequency.exponentialRampToValueAtTime(70, t + 0.35);
    },
    type(n) {
      let t = ctx.currentTime;
      if (mood === 'memory') {
        // Projetor de película: tiques baixos e regulares.
        for (let i = 0; i < n * 2; i++) noiseHit(t + i * 0.09, 'bandpass', 1200, 0.06, 0.02, 2);
        return;
      }
      // Bips de dados (tipo terminal), na escala do arpejo.
      for (let i = 0; i < n; i++) {
        blip(t, ARP_BEAT[Math.floor(Math.random() * 5)] * 4, 0.04);
        t += 0.045 + Math.random() * 0.05;
      }
    },
    close() {
      clearInterval(timer);
      if (ctx.state !== 'closed') void ctx.close();
    },
  };
}
