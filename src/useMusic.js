import { useCallback, useRef, useState } from "react";

// A soft, warm romantic pad generated with the Web Audio API.
// Slow chord progression (Cadd9 - Am7 - Fmaj7 - G) with gentle tremolo.
const CHORDS = [
  [261.63, 329.63, 392.0, 587.33],
  [220.0, 261.63, 329.63, 392.0],
  [174.61, 220.0, 261.63, 329.63],
  [196.0, 246.94, 293.66, 369.99],
];

export function useMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(null);
  const oscsRef = useRef([]);
  const timerRef = useRef(null);
  const idxRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    oscsRef.current.forEach((o) => {
      try {
        o.stop();
      } catch (e) {}
    });
    oscsRef.current = [];
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.0;
    master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 3);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1400;
    filter.Q.value = 0.6;
    filter.connect(master);
    master.connect(ctx.destination);

    // gentle tremolo
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.12;
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();

    const oscs = CHORDS[0].map((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 3 ? "triangle" : "sine";
      osc.frequency.value = f;
      osc.detune.value = i * 3;
      const g = ctx.createGain();
      g.gain.value = 0.25 / (i + 1);
      osc.connect(g);
      g.connect(filter);
      osc.start();
      return osc;
    });
    oscsRef.current = [...oscs, lfo];

    idxRef.current = 0;
    timerRef.current = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % CHORDS.length;
      const chord = CHORDS[idxRef.current];
      oscs.forEach((osc, i) => {
        osc.frequency.linearRampToValueAtTime(chord[i], ctx.currentTime + 2.4);
      });
    }, 6000);

    setPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  return { playing, toggle };
}
