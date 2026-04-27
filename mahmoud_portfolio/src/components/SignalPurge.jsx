import { useEffect, useRef } from 'react';
import * as gameAudio from '../utils/gameAudio';

const GAME_DURATION = 30;
const PLAYER_SIZE = 8;
const PLAYER_SPEED = 4.2;
const FIRE_COOLDOWN = 200;
const SHOT_SPEED = 10;
const SHIELD_MAX = 5;
const ENEMY_BULLET_SPEED = 2.2;
const HIT_RADIUS = 18;

// Wave definitions: [timeOffset (ms), type]
const WAVES = [
  // Wave 1 (0-10s): DRONEs only
  [500, 'DRONE'], [2500, 'DRONE'], [4000, 'DRONE'],
  [5500, 'DRONE'], [7500, 'DRONE'], [9000, 'DRONE'],
  // Wave 2 (10-20s): DRONEs + TURRETs
  [10500, 'DRONE'], [11500, 'TURRET'], [13000, 'DRONE'],
  [14500, 'DRONE'], [15500, 'TURRET'], [17000, 'DRONE'],
  // Wave 3 (20-30s): All types
  [20500, 'ORB'], [21000, 'DRONE'], [22000, 'TURRET'],
  [23000, 'ORB'], [24000, 'DRONE'], [25000, 'ORB'],
  [26000, 'DRONE'], [27500, 'TURRET'], [28500, 'DRONE'],
];

export default function SignalPurge({ onWin, onFail }) {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const keysRef = useRef({});

  const game = useRef({
    // Timing
    startTime: 0,
    phase: 'INTRO', // INTRO → PLAYING → WIN_ANIM → FAIL_ANIM
    introProgress: 0,
    isComplete: false,
    // Player
    px: 0, py: 0,
    shields: SHIELD_MAX,
    lastShot: 0,
    mouseDown: false,
    mouseX: 0, mouseY: 0,
    aimAngle: 0,
    leftTouch: null,
    rightTouch: null,
    // Arena (set on resize)
    arenaX: 0, arenaY: 0, arenaW: 0, arenaH: 0,
    // Entities
    shots: [],
    enemies: [],
    enemyBullets: [],
    particles: [],
    trail: [],
    // Waves
    wave: 0,
    waveSpawns: [],
    // FX
    shakeIntensity: 0,
    flashAlpha: 0,
    breathPhase: 0,
    gridRotation: 0,
    overlayAlpha: 0,
    overlayText: '',
    purgeCount: 0,
    invulnFrames: 0,
    // Wave display
    currentWave: 0,
    waveTextTimer: 0,
    waveTextContent: '',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const g = game.current;

    // ── Sizing ──
    const calcArena = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const margin = 80;
      const maxW = Math.min(canvas.width - margin * 2, 800);
      const maxH = Math.min(canvas.height - margin * 2, 520);
      g.arenaW = maxW;
      g.arenaH = maxH;
      g.arenaX = (canvas.width - maxW) / 2;
      g.arenaY = (canvas.height - maxH) / 2;
      // Center player on first calc
      if (g.px === 0 && g.py === 0) {
        g.px = g.arenaX + maxW / 2;
        g.py = g.arenaY + maxH / 2;
      }
    };
    window.addEventListener('resize', calcArena);
    calcArena();

    // ── Input ──
    const fireShot = () => {
      if (g.isComplete || g.phase !== 'PLAYING') return;
      const now = Date.now();
      if (now - g.lastShot < FIRE_COOLDOWN) return;
      g.lastShot = now;
      g.shots.push({
        x: g.px, y: g.py,
        vx: Math.cos(g.aimAngle) * SHOT_SPEED,
        vy: Math.sin(g.aimAngle) * SHOT_SPEED,
      });
      gameAudio.playFireSound();
    };

    const onKeyDown = (e) => {
      keysRef.current[e.code] = true;
      if (e.code === 'Space') { e.preventDefault(); fireShot(); }
    };
    const onKeyUp = (e) => { keysRef.current[e.code] = false; };
    const onMouseMove = (e) => { g.mouseX = e.clientX; g.mouseY = e.clientY; };
    const onMouseDown = () => { g.mouseDown = true; fireShot(); };
    const onMouseUp = () => { g.mouseDown = false; };

    const onTouchStart = (e) => {
      if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        if (t.clientX < window.innerWidth / 2) {
          if (!g.leftTouch) g.leftTouch = { id: t.identifier, startX: t.clientX, startY: t.clientY, currentX: t.clientX, currentY: t.clientY };
        } else {
          if (!g.rightTouch) g.rightTouch = { id: t.identifier, startX: t.clientX, startY: t.clientY, currentX: t.clientX, currentY: t.clientY };
        }
      }
    };
    const onTouchMove = (e) => {
      if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        if (g.leftTouch && t.identifier === g.leftTouch.id) {
          g.leftTouch.currentX = t.clientX; g.leftTouch.currentY = t.clientY;
        }
        if (g.rightTouch && t.identifier === g.rightTouch.id) {
          g.rightTouch.currentX = t.clientX; g.rightTouch.currentY = t.clientY;
        }
      }
    };
    const onTouchEnd = (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        if (g.leftTouch && t.identifier === g.leftTouch.id) g.leftTouch = null;
        if (g.rightTouch && t.identifier === g.rightTouch.id) g.rightTouch = null;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    // ── Update ──
    const update = () => {
      const now = Date.now();

      // Intro
      if (g.phase === 'INTRO') {
        g.introProgress = Math.min(g.introProgress + 0.02, 1);
        if (g.introProgress >= 1) {
          g.phase = 'PLAYING';
          g.startTime = Date.now();
        }
        draw(0, 0);
        requestRef.current = requestAnimationFrame(update);
        return;
      }

      const elapsed = now - g.startTime;
      const progress = Math.min(elapsed / (GAME_DURATION * 1000), 1);

      // Wave tracking for display
      const newWave = elapsed < 10000 ? 1 : (elapsed < 20000 ? 2 : 3);
      if (newWave !== g.currentWave && g.phase === 'PLAYING') {
        g.currentWave = newWave;
        g.waveTextTimer = 90; // ~1.5s display
        g.waveTextContent = newWave === 1 ? 'WAVE_01 // DRONES' : newWave === 2 ? 'WAVE_02 // TURRETS DETECTED' : 'WAVE_03 // FULL ASSAULT';
      }
      if (g.waveTextTimer > 0) g.waveTextTimer--;

      // Win — dissolve all remaining enemies
      if (progress >= 1 && !g.isComplete) {
        g.isComplete = true;
        g.phase = 'WIN_ANIM';
        g.overlayText = 'SIGNAL_PURGE: COMPLETE';
        g.flashAlpha = 0.5;
        // Dissolve remaining enemies into particles
        g.enemies.forEach(e => burstParticles(e.x, e.y, 6));
        g.enemies = [];
        g.enemyBullets = [];
        gameAudio.playWinSound();
        setTimeout(onWin, 2500);
      }
      // Fail — static noise burst
      if (g.shields <= 0 && !g.isComplete) {
        g.isComplete = true;
        g.phase = 'FAIL_ANIM';
        g.overlayText = 'SYSTEM_COMPROMISED';
        g.shakeIntensity = 18;
        g.flashAlpha = 0.6;
        gameAudio.playFailSound();
        setTimeout(onFail, 2000);
      }

      if (g.phase === 'PLAYING') {
        // ── Player movement ──
        const k = keysRef.current;
        let dx = 0, dy = 0;
        if (k['KeyW'] || k['ArrowUp'])    dy = -1;
        if (k['KeyS'] || k['ArrowDown'])  dy = 1;
        if (k['KeyA'] || k['ArrowLeft'])  dx = -1;
        if (k['KeyD'] || k['ArrowRight']) dx = 1;
        if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

        if (g.leftTouch) {
           const maxD = 40;
           let tdx = g.leftTouch.currentX - g.leftTouch.startX;
           let tdy = g.leftTouch.currentY - g.leftTouch.startY;
           const dist = Math.sqrt(tdx*tdx + tdy*tdy);
           if (dist > 0) {
             const factor = Math.min(dist / maxD, 1);
             dx = (tdx / dist) * factor;
             dy = (tdy / dist) * factor;
           }
        }

        g.px += dx * PLAYER_SPEED;
        g.py += dy * PLAYER_SPEED;
        const half = PLAYER_SIZE / 2 + 2;
        g.px = Math.max(g.arenaX + half, Math.min(g.arenaX + g.arenaW - half, g.px));
        g.py = Math.max(g.arenaY + half, Math.min(g.arenaY + g.arenaH - half, g.py));
        
        if (g.rightTouch) {
           g.aimAngle = Math.atan2(g.rightTouch.currentY - g.rightTouch.startY, g.rightTouch.currentX - g.rightTouch.startX);
           fireShot();
        } else {
           g.aimAngle = Math.atan2(g.mouseY - g.py, g.mouseX - g.px);
           if (g.mouseDown) fireShot();
        }
        g.trail.push({ x: g.px, y: g.py, life: 1 });
        if (g.trail.length > 8) g.trail.shift();
        if (g.invulnFrames > 0) g.invulnFrames--;

        // ── Wave spawning ──
        WAVES.forEach((w, i) => {
          if (!g.waveSpawns[i] && elapsed >= w[0]) {
            g.waveSpawns[i] = true;
            spawnEnemy(w[1]);
          }
        });

        // ── Update enemies ──
        g.enemies.forEach(e => {
          e.age++;
          e.rotation += 0.03;
          if (e.type === 'DRONE') {
            const a = Math.atan2(g.py - e.y, g.px - e.x);
            e.x += Math.cos(a) * e.speed;
            e.y += Math.sin(a) * e.speed;
          } else if (e.type === 'TURRET') {
            // Turret stays in place, fires every 120 frames (~2s)
            e.fireTimer--;
            if (e.fireTimer <= 0) {
              e.fireTimer = 120;
              e.telegraphing = 0; // reset
            }
            if (e.fireTimer <= 30) e.telegraphing = (30 - e.fireTimer) / 30; // telegraph 0→1
            if (e.fireTimer === 1) {
              const a = Math.atan2(g.py - e.y, g.px - e.x);
              g.enemyBullets.push({ x: e.x, y: e.y, vx: Math.cos(a) * ENEMY_BULLET_SPEED, vy: Math.sin(a) * ENEMY_BULLET_SPEED });
            }
          } else if (e.type === 'ORB') {
            e.x += e.speed * e.dirX;
            e.y += Math.sin(e.age * 0.04) * 1.8;
            // Bounce off arena walls
            if (e.x < g.arenaX + 10 || e.x > g.arenaX + g.arenaW - 10) e.dirX *= -1;
            e.y = Math.max(g.arenaY + 10, Math.min(g.arenaY + g.arenaH - 10, e.y));
          }
        });

        // ── Update enemy bullets ──
        g.enemyBullets.forEach(b => { b.x += b.vx; b.y += b.vy; });
        g.enemyBullets = g.enemyBullets.filter(b =>
          b.x > g.arenaX - 20 && b.x < g.arenaX + g.arenaW + 20 &&
          b.y > g.arenaY - 20 && b.y < g.arenaY + g.arenaH + 20
        );

        // ── Collision: player shots → enemies ──
        const shotsHit = new Set();
        const enemiesHit = new Set();
        g.shots.forEach((s, si) => {
          g.enemies.forEach((e, ei) => {
            if (shotsHit.has(si) || enemiesHit.has(ei)) return;
            const d = Math.sqrt((s.x - e.x) ** 2 + (s.y - e.y) ** 2);
            if (d < HIT_RADIUS) {
              shotsHit.add(si);
              e.hp--;
              if (e.hp <= 0) {
                enemiesHit.add(ei);
                g.purgeCount++;
                g.flashAlpha = Math.min(g.flashAlpha + 0.08, 0.4);
                gameAudio.playHitSound(e.type === 'TURRET' ? 'PULSE' : 'DRIFT');
                burstParticles(e.x, e.y, 8);
              } else {
                gameAudio.playHitSound('STAGGER');
              }
            }
          });
        });
        g.shots = g.shots.filter((_, i) => !shotsHit.has(i));
        g.enemies = g.enemies.filter((_, i) => !enemiesHit.has(i));

        // ── Collision: player shots → enemy bullets (destructible) ──
        const sBulletHit = new Set();
        const eBulletHit = new Set();
        g.shots.forEach((s, si) => {
          g.enemyBullets.forEach((b, bi) => {
            if (sBulletHit.has(si) || eBulletHit.has(bi)) return;
            if (Math.sqrt((s.x - b.x) ** 2 + (s.y - b.y) ** 2) < 14) {
              sBulletHit.add(si); eBulletHit.add(bi);
              burstParticles(b.x, b.y, 4);
            }
          });
        });
        g.shots = g.shots.filter((_, i) => !sBulletHit.has(i));
        g.enemyBullets = g.enemyBullets.filter((_, i) => !eBulletHit.has(i));

        // ── Collision: enemies/enemy bullets → player ──
        if (g.invulnFrames <= 0) {
          let hit = false;
          const enemiesToDestroy = new Set();
          // Enemy bodies — destroy on contact
          g.enemies.forEach((e, ei) => {
            if (Math.sqrt((g.px - e.x) ** 2 + (g.py - e.y) ** 2) < 14) {
              hit = true;
              enemiesToDestroy.add(ei);
              burstParticles(e.x, e.y, 5);
            }
          });
          if (enemiesToDestroy.size > 0) {
            g.enemies = g.enemies.filter((_, i) => !enemiesToDestroy.has(i));
          }
          // Enemy bullets
          g.enemyBullets = g.enemyBullets.filter(b => {
            if (Math.sqrt((g.px - b.x) ** 2 + (g.py - b.y) ** 2) < 10) { hit = true; return false; }
            return true;
          });
          if (hit) {
            g.shields--;
            g.invulnFrames = 60; // ~1s invulnerability (was 45)
            g.shakeIntensity = 8;
            g.flashAlpha = 0.3;
            gameAudio.playCoreDamageSound();
          }
        }
      }

      // ── Update shots ──
      g.shots.forEach(s => { s.x += s.vx; s.y += s.vy; });
      g.shots = g.shots.filter(s =>
        s.x > g.arenaX - 20 && s.x < g.arenaX + g.arenaW + 20 &&
        s.y > g.arenaY - 20 && s.y < g.arenaY + g.arenaH + 20
      );

      // ── Update particles ──
      g.particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.94; p.vy *= 0.94;
        p.life -= 0.025;
      });
      g.particles = g.particles.filter(p => p.life > 0);

      // ── Trail decay ──
      g.trail.forEach(t => { t.life -= 0.12; });
      g.trail = g.trail.filter(t => t.life > 0);

      // ── FX decay ──
      g.shakeIntensity *= 0.85;
      g.flashAlpha = Math.max(0, g.flashAlpha - 0.03);
      g.breathPhase += 0.012;
      g.gridRotation += 0.0003;
      if (g.phase === 'WIN_ANIM' || g.phase === 'FAIL_ANIM') {
        g.overlayAlpha = Math.min(g.overlayAlpha + 0.025, 1);
      }

      draw(elapsed, progress);
      requestRef.current = requestAnimationFrame(update);
    };

    // ── Spawn helper ──
    const spawnEnemy = (type) => {
      const side = Math.floor(Math.random() * 4);
      let x, y;
      if (side === 0)      { x = g.arenaX + Math.random() * g.arenaW; y = g.arenaY + 10; }
      else if (side === 1) { x = g.arenaX + Math.random() * g.arenaW; y = g.arenaY + g.arenaH - 10; }
      else if (side === 2) { x = g.arenaX + 10; y = g.arenaY + Math.random() * g.arenaH; }
      else                 { x = g.arenaX + g.arenaW - 10; y = g.arenaY + Math.random() * g.arenaH; }
      const base = { x, y, type, hp: 1, age: 0, rotation: 0 };
      if (type === 'DRONE')  Object.assign(base, { speed: 1.2 });
      if (type === 'TURRET') Object.assign(base, { speed: 0, hp: 2, fireTimer: 90, telegraphing: 0 });
      if (type === 'ORB')    Object.assign(base, { speed: 1.5, dirX: Math.random() > 0.5 ? 1 : -1 });
      g.enemies.push(base);
      // Spawn flash particle
      burstParticles(x, y, 3);
    };

    const burstParticles = (x, y, count) => {
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        g.particles.push({
          x, y,
          vx: Math.cos(a) * (1 + Math.random() * 2.5),
          vy: Math.sin(a) * (1 + Math.random() * 2.5),
          life: 0.7 + Math.random() * 0.3,
          size: 1.5 + Math.random() * 1.5,
          color: '#c8b87a',
        });
      }
    };

    // ── Draw ──
    const draw = (elapsed, progress) => {
      const W = canvas.width, H = canvas.height;
      const shake = g.shakeIntensity;
      const sx = shake > 0.5 ? (Math.random() - 0.5) * shake : 0;
      const sy = shake > 0.5 ? (Math.random() - 0.5) * shake : 0;

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.translate(sx, sy);

      const breath = Math.sin(g.breathPhase) * 1.5;

      // ── INTRO: draw arena border progressively ──
      if (g.phase === 'INTRO') {
        const p = g.introProgress;
        const ax = g.arenaX - breath, ay = g.arenaY - breath;
        const aw = g.arenaW + breath * 2, ah = g.arenaH + breath * 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 1;
        // Draw perimeter progressively
        const totalPerim = 2 * (aw + ah);
        const drawn = p * totalPerim;
        ctx.beginPath();
        let remaining = drawn;
        // Top
        const topLen = Math.min(remaining, aw); remaining -= topLen;
        ctx.moveTo(ax, ay); ctx.lineTo(ax + topLen, ay);
        // Right
        if (remaining > 0) { const rLen = Math.min(remaining, ah); remaining -= rLen; ctx.lineTo(ax + aw, ay + rLen); }
        // Bottom
        if (remaining > 0) { const bLen = Math.min(remaining, aw); remaining -= bLen; ctx.lineTo(ax + aw - bLen, ay + ah); }
        // Left
        if (remaining > 0) { const lLen = Math.min(remaining, ah); ctx.lineTo(ax, ay + ah - lLen); }
        ctx.stroke();
        // Center crosshair
        ctx.strokeStyle = 'rgba(200,184,122,0.3)';
        const ccx = ax + aw / 2, ccy = ay + ah / 2;
        ctx.beginPath(); ctx.moveTo(ccx - 12, ccy); ctx.lineTo(ccx + 12, ccy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ccx, ccy - 12); ctx.lineTo(ccx, ccy + 12); ctx.stroke();
        // Label
        ctx.font = '11px "Space Mono", monospace';
        ctx.fillStyle = `rgba(200,184,122,${p})`;
        ctx.textAlign = 'center';
        ctx.fillText('INITIALIZING ARENA...', W / 2, g.arenaY + g.arenaH + 30);
        ctx.restore();
        return;
      }

      // ── Arena border ──
      const ax = g.arenaX - breath, ay = g.arenaY - breath;
      const aw = g.arenaW + breath * 2, ah = g.arenaH + breath * 2;
      const critical = g.shields <= 1;
      ctx.strokeStyle = critical ? 'rgba(255,80,80,0.5)' : 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1;
      ctx.strokeRect(ax, ay, aw, ah);

      // Grid lines (subtle, slowly rotating offset)
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      const gridOff = Math.sin(g.gridRotation * 50) * 2;
      for (let i = 1; i < 4; i++) {
        const lx = g.arenaX + (g.arenaW / 4) * i + gridOff;
        ctx.beginPath(); ctx.moveTo(lx, g.arenaY); ctx.lineTo(lx, g.arenaY + g.arenaH); ctx.stroke();
      }
      for (let i = 1; i < 3; i++) {
        const ly = g.arenaY + (g.arenaH / 3) * i + gridOff;
        ctx.beginPath(); ctx.moveTo(g.arenaX, ly); ctx.lineTo(g.arenaX + g.arenaW, ly); ctx.stroke();
      }

      // Corner markers
      ctx.strokeStyle = 'rgba(200,184,122,0.15)';
      const cm = 14;
      [[ax, ay, 1, 1], [ax + aw, ay, -1, 1], [ax, ay + ah, 1, -1], [ax + aw, ay + ah, -1, -1]].forEach(([cx, cy, dx, dy]) => {
        ctx.beginPath(); ctx.moveTo(cx, cy + dy * cm); ctx.lineTo(cx, cy); ctx.lineTo(cx + dx * cm, cy); ctx.stroke();
      });

      // ── Player trail ──
      g.trail.forEach(t => {
        ctx.globalAlpha = t.life * 0.3;
        ctx.fillStyle = 'white';
        const sz = PLAYER_SIZE * t.life;
        ctx.fillRect(t.x - sz / 2, t.y - sz / 2, sz, sz);
      });
      ctx.globalAlpha = 1;

      // ── Player ──
      const blink = g.invulnFrames > 0 && Math.floor(g.invulnFrames / 3) % 2 === 0;
      if (!blink) {
        ctx.fillStyle = 'white';
        ctx.shadowBlur = 10; ctx.shadowColor = 'white';
        ctx.fillRect(g.px - PLAYER_SIZE / 2, g.py - PLAYER_SIZE / 2, PLAYER_SIZE, PLAYER_SIZE);
        ctx.shadowBlur = 0;
      }

      // Aim line
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(g.px, g.py);
      ctx.lineTo(g.px + Math.cos(g.aimAngle) * 50, g.py + Math.sin(g.aimAngle) * 50);
      ctx.stroke(); ctx.setLineDash([]);

      // ── Shots ──
      ctx.strokeStyle = 'white'; ctx.lineWidth = 1.5;
      ctx.shadowBlur = 4; ctx.shadowColor = '#c8b87a';
      g.shots.forEach(s => {
        const a = Math.atan2(s.vy, s.vx);
        ctx.beginPath(); ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + Math.cos(a) * 12, s.y + Math.sin(a) * 12);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // ── Enemies ──
      g.enemies.forEach(e => {
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.rotation);
        ctx.strokeStyle = 'rgba(255,255,255,0.85)';
        ctx.lineWidth = 1.5;
        if (e.type === 'DRONE') {
          // Diamond
          ctx.beginPath();
          ctx.moveTo(0, -9); ctx.lineTo(8, 0); ctx.lineTo(0, 9); ctx.lineTo(-8, 0);
          ctx.closePath(); ctx.stroke();
        } else if (e.type === 'TURRET') {
          // Triangle with telegraph glow
          if (e.telegraphing > 0) {
            ctx.shadowBlur = e.telegraphing * 15;
            ctx.shadowColor = '#ff4444';
            ctx.strokeStyle = `rgba(255,${Math.floor(255 - e.telegraphing * 200)},${Math.floor(255 - e.telegraphing * 200)},0.9)`;
          }
          ctx.beginPath();
          ctx.moveTo(10, 0); ctx.lineTo(-7, 8); ctx.lineTo(-7, -8);
          ctx.closePath(); ctx.stroke();
          // Inner dot if 2hp
          if (e.hp === 2) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI * 2); ctx.fill();
          }
          ctx.shadowBlur = 0;
        } else if (e.type === 'ORB') {
          // Circle outline
          ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
      });

      // ── Enemy bullets ──
      g.enemyBullets.forEach(b => {
        ctx.strokeStyle = 'rgba(255,100,100,0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(b.x, b.y, 4, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = 'rgba(255,100,100,0.15)';
        ctx.fill();
      });

      // ── Particles ──
      g.particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color || '#c8b87a';
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      });
      ctx.globalAlpha = 1;

      // ── Critical vignette ──
      if (critical) {
        const vAlpha = 0.1 + 0.06 * Math.sin(Date.now() * 0.005);
        const vGrad = ctx.createRadialGradient(
          g.arenaX + g.arenaW / 2, g.arenaY + g.arenaH / 2, g.arenaW * 0.2,
          g.arenaX + g.arenaW / 2, g.arenaY + g.arenaH / 2, g.arenaW * 0.6
        );
        vGrad.addColorStop(0, 'rgba(255,0,0,0)');
        vGrad.addColorStop(1, `rgba(180,0,0,${vAlpha})`);
        ctx.fillStyle = vGrad;
        ctx.fillRect(g.arenaX, g.arenaY, g.arenaW, g.arenaH);
      }

      ctx.restore();

      // ── Screen flash ──
      if (g.flashAlpha > 0.01) {
        ctx.fillStyle = `rgba(255,255,255,${g.flashAlpha})`;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Fail static noise ──
      if (g.phase === 'FAIL_ANIM' && g.overlayAlpha < 0.5) {
        const imgData = ctx.getImageData(g.arenaX, g.arenaY, g.arenaW, g.arenaH);
        const d = imgData.data;
        const intensity = (0.5 - g.overlayAlpha) * 2;
        for (let i = 0; i < d.length; i += 16) {
          const noise = (Math.random() - 0.5) * 100 * intensity;
          d[i] = Math.min(255, Math.max(0, d[i] + noise));
          d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise));
          d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise));
        }
        ctx.putImageData(imgData, g.arenaX, g.arenaY);
      }

      // ── HUD ──
      ctx.font = '11px "Space Mono", monospace';
      ctx.textAlign = 'center';

      // Progress bar
      const filled = Math.floor(progress * 16);
      const bar = '█'.repeat(filled) + '░'.repeat(16 - filled);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(`PURGE: [${bar}] ${Math.floor(progress * 100)}%`, W / 2, g.arenaY - 20);

      // Shields
      ctx.fillStyle = critical ? '#ff4444' : 'rgba(255,255,255,0.6)';
      const shieldBar = Array.from({ length: SHIELD_MAX }, (_, i) => i < g.shields ? '■' : '□').join('');
      ctx.fillText(`SHIELDS: [${shieldBar}]`, W / 2, g.arenaY + g.arenaH + 24);

      // Purge counter
      ctx.fillStyle = 'rgba(200,184,122,0.4)';
      ctx.textAlign = 'right';
      ctx.fillText(`PURGED: ${g.purgeCount}`, g.arenaX + g.arenaW, g.arenaY - 20);
      ctx.textAlign = 'center';

      // Wave indicator
      if (g.waveTextTimer > 0) {
        const wAlpha = Math.min(g.waveTextTimer / 30, 1) * 0.7;
        ctx.font = '13px "Space Mono", monospace';
        ctx.fillStyle = `rgba(200,184,122,${wAlpha})`;
        ctx.fillText(g.waveTextContent, W / 2, g.arenaY + g.arenaH / 2 - 40);
      }

      // Controls hint
      if (progress < 0.1) {
        const a = Math.max(0, 0.25 - progress * 2.5);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        const isMobile = 'ontouchstart' in window;
        const hintText = isMobile ? 'DRAG LEFT TO MOVE  |  DRAG RIGHT TO AIM & FIRE' : 'WASD: MOVE  |  MOUSE: AIM  |  CLICK/SPACE: FIRE';
        ctx.fillText(hintText, W / 2, g.arenaY + g.arenaH + 44);
      }

      // ── Touch Joysticks ──
      const drawJoystick = (touch) => {
        if (!touch) return;
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(touch.startX, touch.startY, 40, 0, Math.PI * 2);
        ctx.stroke();
        
        let dx = touch.currentX - touch.startX;
        let dy = touch.currentY - touch.startY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 40) {
          dx = (dx / dist) * 40;
          dy = (dy / dist) * 40;
        }
        ctx.fillStyle = 'rgba(200,184,122,0.5)';
        ctx.beginPath();
        ctx.arc(touch.startX + dx, touch.startY + dy, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawJoystick(g.leftTouch);
      drawJoystick(g.rightTouch);

      // ── Overlay ──
      if ((g.phase === 'WIN_ANIM' || g.phase === 'FAIL_ANIM') && g.overlayAlpha > 0) {
        const isWin = g.phase === 'WIN_ANIM';
        ctx.fillStyle = `rgba(0,0,0,${g.overlayAlpha * 0.65})`;
        ctx.fillRect(0, 0, W, H);
        ctx.font = 'bold 22px "Space Mono", monospace';
        ctx.fillStyle = isWin ? `rgba(200,184,122,${g.overlayAlpha})` : `rgba(255,80,80,${g.overlayAlpha})`;
        ctx.textAlign = 'center';
        ctx.fillText(g.overlayText, W / 2, H / 2 - 12);
        ctx.font = '12px "Space Mono", monospace';
        ctx.fillStyle = `rgba(255,255,255,${g.overlayAlpha * 0.5})`;
        ctx.fillText(
          isWin ? `SIGNALS PURGED: ${g.purgeCount} | RETURNING...` : 'RETURNING TO TERMINAL...',
          W / 2, H / 2 + 14
        );
      }
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', calcArena);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [onWin, onFail]);

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', cursor: 'none' }} />;
}
