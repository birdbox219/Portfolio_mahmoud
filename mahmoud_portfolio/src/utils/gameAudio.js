import { getAudioContext } from './audioSystem';

const ctx = () => getAudioContext();

function osc(type, freq, dur, vol = 0.15) {
  const c = ctx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime);
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start();
  o.stop(c.currentTime + dur);
}

export function playFireSound() {
  const c = ctx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(600, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(900, c.currentTime + 0.05);
  g.gain.setValueAtTime(0.12, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
  o.connect(g);
  g.connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.06);
}

export function playHitSound(enemyType) {
  if (enemyType === 'DRIFT') {
    osc('square', 200, 0.03, 0.1);
  } else if (enemyType === 'SPIRAL') {
    const c = ctx();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(800, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.1);
    g.gain.setValueAtTime(0.12, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
    o.connect(g);
    g.connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.11);
  } else {
    osc('square', 400, 0.08, 0.12);
    osc('sine', 600, 0.08, 0.08);
  }
}

export function playCoreDamageSound() {
  osc('sine', 80, 0.2, 0.25);
  const c = ctx();
  if (!c) return;
  // Noise burst
  const bufferSize = c.sampleRate * 0.1;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
  const noise = c.createBufferSource();
  const ng = c.createGain();
  noise.buffer = buffer;
  ng.gain.setValueAtTime(0.15, c.currentTime);
  ng.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
  noise.connect(ng);
  ng.connect(c.destination);
  noise.start();
  noise.stop(c.currentTime + 0.15);
}

export function playWinSound() {
  const c = ctx();
  if (!c) return;
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, c.currentTime + i * 0.15);
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(0.12, c.currentTime + i * 0.15);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.15 + 0.4);
    o.connect(g);
    g.connect(c.destination);
    o.start(c.currentTime + i * 0.15);
    o.stop(c.currentTime + i * 0.15 + 0.45);
  });
}

export function playFailSound() {
  const c = ctx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(300, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(40, c.currentTime + 0.5);
  g.gain.setValueAtTime(0.2, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);
  o.connect(g);
  g.connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.55);
}

export function playTerminalKey() {
  osc('square', 1200, 0.02, 0.04);
}

export function playGlitchSound() {
  const c = ctx();
  if (!c) return;
  const bufferSize = c.sampleRate * 0.15;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);
  const noise = c.createBufferSource();
  const ng = c.createGain();
  noise.buffer = buffer;
  ng.gain.setValueAtTime(0.08, c.currentTime);
  ng.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
  noise.connect(ng);
  ng.connect(c.destination);
  noise.start();
  noise.stop(c.currentTime + 0.15);
}
