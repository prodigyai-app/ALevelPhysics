/* Shared science figures: realistic, labelled illustrations pitched at KS3, GCSE or A-level.
   SciFig.svg(name, options) returns an <svg> string; SciFig.fig(name, options) wraps it in a figure with a caption.
   Labels sit outside the drawing with leader lines, so they never cover structures. */
(function (root) {
  'use strict';
  let uid = 0;
  const f = v => (+v).toFixed(1);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rnd = seed => { let a = seed >>> 0 || 1; return () => ((a = (a * 1664525 + 1013904223) >>> 0) / 4294967296); };

  /* ---------- label layout: labels in columns either side, leader lines to anchors ---------- */
  function labels(list, o) {
    const W = o.W, H = o.H, size = o.size || 15, lh = size * 1.18, gap = o.gap || Math.max(26, size * 1.7), top = o.top ?? 24, bot = o.bot ?? H - 14;
    const lx = o.lx ?? 150, rx = o.rx ?? W - 150, cw = size * 0.56;
    const L = [], R = [];
    list.forEach(l => ((l.side || (l.x < W / 2 ? 'l' : 'r')) === 'l' ? L : R).push(l));
    const split = (t, room) => {
      if (t.length * cw <= room) return [t];
      const words = t.split(' '); let best = [t], bestW = 1e9;
      for (let k = 1; k < words.length; k++) { const a = words.slice(0, k).join(' '), b = words.slice(k).join(' '), w = Math.max(a.length, b.length) * cw; if (w < bestW) { bestW = w; best = [a, b]; } }
      return best;
    };
    let g = '';
    const run = (arr, side) => {
      const tx = side === 'l' ? lx : rx, room = side === 'l' ? tx - 4 : W - tx - 4;
      arr.forEach(l => { l._y = +(l.ly ?? l.y); l._lines = split(l.t, room); l._h = (l._lines.length - 1) * lh; });
      arr.sort((a, b) => a._y - b._y);
      const ys = arr.map(a => Math.max(top + a._h / 2, Math.min(bot - a._h / 2, a._y)));
      for (let i = 1; i < ys.length; i++) ys[i] = Math.max(ys[i], ys[i - 1] + gap + (arr[i]._h + arr[i - 1]._h) / 2);
      const over = ys.length ? ys[ys.length - 1] + arr[arr.length - 1]._h / 2 - bot : 0;
      if (over > 0) { ys[ys.length - 1] -= over; for (let i = ys.length - 2; i >= 0; i--) ys[i] = Math.min(ys[i], ys[i + 1] - gap - (arr[i]._h + arr[i + 1]._h) / 2); }
      arr.forEach((l, i) => {
        const y = ys[i], ex = side === 'l' ? tx + 6 : tx - 6;
        g += `<path d="M${f(ex)} ${f(y)}L${f(side === 'l' ? ex + 14 : ex - 14)} ${f(y)}L${f(l.x)} ${f(l.y)}" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".75"/><circle cx="${f(l.x)}" cy="${f(l.y)}" r="2.6" fill="currentColor"/>`;
        const y0 = y - l._h / 2 + size * 0.34, bw = Math.max(...l._lines.map(t => t.length)) * cw + 10, bh = l._lines.length * lh + 6;
        g += `<g class="sf-lbl"><rect class="sf-blank" x="${f(side === 'l' ? tx - bw + 4 : tx - 6)}" y="${f(y - l._h / 2 - lh / 2 - 3)}" width="${f(bw)}" height="${f(bh)}" rx="5"/><text x="${f(tx)}" y="${f(y0)}" text-anchor="${side === 'l' ? 'end' : 'start'}" class="sf-lab" font-size="${size}">${l._lines.map((t, k) => `<tspan x="${f(tx)}" dy="${k ? f(lh) : 0}">${esc(t)}</tspan>`).join('')}</text></g>`;
      });
    };
    run(L, 'l'); run(R, 'r');
    return g;
  }
  const wrap = (W, H, aria, defs, body) => `<svg class="sf" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}" style="color:var(--ink,#e8ecf5)"><defs>${defs}</defs>${body}</svg>`;
  const LV = l => (l === 'ks3' ? 0 : l === 'alevel' || l === 'a' ? 2 : 1);

  /* ---------- organelles ---------- */
  const mito = (x, y, w, h, rot, id, alevel) => {
    let s = `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><ellipse rx="${f(w / 2)}" ry="${f(h / 2)}" fill="url(#${id}-mito)" stroke="#a5402e" stroke-width="1.6"/>`;
    const n = alevel ? 6 : 4;
    for (let i = 0; i < n; i++) { const px = -w / 2 + w * (i + 0.7) / (n + 0.4), up = i % 2 === 0; s += `<path d="M${f(px)} ${f(up ? -h / 2 + 2 : h / 2 - 2)}q${f(w / (n * 3))} ${f(up ? h * 0.42 : -h * 0.42)} ${f(w / (n * 1.6))} 0" fill="none" stroke="#a5402e" stroke-width="1.3"/>`; }
    return s + '</g>';
  };
  const chloro = (x, y, w, h, rot, id, alevel) => {
    let s = `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><ellipse rx="${f(w / 2)}" ry="${f(h / 2)}" fill="url(#${id}-chl)" stroke="#2f6b23" stroke-width="1.4"/>`;
    const n = alevel ? 5 : 3;
    for (let i = 0; i < n; i++) { const px = -w / 2 + w * (i + 0.8) / (n + 0.6); s += `<g>${[0, 1, 2].map(k => `<rect x="${f(px - 4)}" y="${f(-6 + k * 4)}" width="8" height="3" rx="1" fill="#1f5a1a" opacity=".8"/>`).join('')}</g>`; }
    if (alevel) s += `<path d="M${f(-w / 2 + 8)} 0H${f(w / 2 - 8)}" stroke="#1f5a1a" stroke-width=".8" opacity=".7"/><circle cx="${f(w * 0.25)}" cy="${f(h * 0.18)}" r="2.4" fill="#f4f0d0" opacity=".9"/>`;
    return s + '</g>';
  };
  const ribos = (r, n, cx, cy, rx, ry, avoid) => {
    let s = '';
    for (let i = 0, k = 0; i < n * 4 && k < n; i++) {
      const a = r() * Math.PI * 2, rr = Math.sqrt(r()), x = cx + Math.cos(a) * rx * rr, y = cy + Math.sin(a) * ry * rr;
      if (avoid && avoid.some(([ax, ay, ar]) => (x - ax) ** 2 + (y - ay) ** 2 < ar * ar)) continue;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="1.9" fill="#4b2c6b"/>`; k++;
    }
    return s;
  };
  const gradDefs = id => `<radialGradient id="${id}-nuc" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#d8b6ef"/><stop offset=".7" stop-color="#a979cf"/><stop offset="1" stop-color="#7d4fa5"/></radialGradient>
<radialGradient id="${id}-mito" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffc4a8"/><stop offset="1" stop-color="#ec8a68"/></radialGradient>
<radialGradient id="${id}-chl" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#9edc78"/><stop offset="1" stop-color="#4f9b3a"/></radialGradient>
<radialGradient id="${id}-ac" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#fbe7e4"/><stop offset="1" stop-color="#f1c7c2"/></radialGradient>
<linearGradient id="${id}-pc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef7dc"/><stop offset="1" stop-color="#d6ecbc"/></linearGradient>
<radialGradient id="${id}-vac" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#eef7ff"/><stop offset="1" stop-color="#cfe3f5"/></radialGradient>`;
  const nucleus = (x, y, rx, ry, id, lv) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#${id}-nuc)" stroke="#5e3784" stroke-width="${lv === 2 ? 3 : 2}"/>` +
    (lv === 2 ? `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx - 4)}" ry="${f(ry - 4)}" fill="none" stroke="#5e3784" stroke-width="1" opacity=".6"/>` + [0.3, 1.4, 2.6, 3.7, 4.9].map(a => `<circle cx="${f(x + Math.cos(a) * (rx - 2))}" cy="${f(y + Math.sin(a) * (ry - 2))}" r="2.3" fill="#f1c7c2"/>`).join('') : '') +
    (lv >= 1 ? `<circle cx="${f(x + rx * 0.2)}" cy="${f(y - ry * 0.1)}" r="${f(Math.min(rx, ry) * 0.32)}" fill="#5e3784" opacity=".85"/>` : '') +
    `<path d="M${f(x - rx * 0.6)} ${f(y + ry * 0.3)}q8 -10 16 0t16 0M${f(x - rx * 0.4)} ${f(y - ry * 0.45)}q8 6 16 0" fill="none" stroke="#5e3784" stroke-width="1" opacity=".5"/>`;
  const rer = (x, y, w, n) => { let s = ''; for (let i = 0; i < n; i++) { const yy = y + i * 9; s += `<path d="M${f(x)} ${f(yy)}q${f(w / 4)} -7 ${f(w / 2)} 0t${f(w / 2)} 0" fill="none" stroke="#9a6fc0" stroke-width="3.4"/>`; for (let k = 0; k <= 8; k++) s += `<circle cx="${f(x + w * k / 8)}" cy="${f(yy - 3.4 + (k % 2 ? -1.5 : 1.5))}" r="1.5" fill="#4b2c6b"/>`; } return s; };
  const ser = (x, y, w) => `<path d="M${f(x)} ${f(y)}q10 -12 20 0t20 0t20 0M${f(x + 4)} ${f(y + 10)}q10 -10 20 0t20 0t18 0" fill="none" stroke="#b993d9" stroke-width="3.6" stroke-linecap="round"/>`;
  const golgi = (x, y, n = 5) => { let s = ''; for (let i = 0; i < n; i++) s += `<path d="M${f(x - 30 + i * 2)} ${f(y + i * 7)}q${f(30 - i * 2)} -14 ${f(60 - i * 4)} 0" fill="none" stroke="#e2a83a" stroke-width="4" stroke-linecap="round"/>`; return s + `<circle cx="${f(x + 38)}" cy="${f(y + 6)}" r="4" fill="#f2c96b"/><circle cx="${f(x + 34)}" cy="${f(y + 28)}" r="3.4" fill="#f2c96b"/>`; };

  /* ---------- cells ---------- */
  function animalCell(o = {}) {
    const lv = LV(o.level), id = 'sf' + (++uid), W = 840, H = 440, cx = 420, cy = 220, r = rnd(7);
    let b = `<path d="M${cx - 190} ${cy - 10}C${cx - 200} ${cy - 120} ${cx - 60} ${cy - 175} ${cx + 40} ${cy - 160}C${cx + 160} ${cy - 150} ${cx + 205} ${cy - 70} ${cx + 195} ${cy + 20}C${cx + 190} ${cy + 120} ${cx + 90} ${cy + 175} ${cx - 20} ${cy + 165}C${cx - 140} ${cy + 160} ${cx - 182} ${cy + 90} ${cx - 190} ${cy - 10}Z" fill="url(#${id}-ac)" stroke="#b46a7a" stroke-width="3"/>`;
    const N = [cx - 15, cy - 5, 62, 52];
    b += nucleus(N[0], N[1], N[2], N[3], id, lv);
    const M = [[cx + 110, cy - 70, 62, 30, -25], [cx - 120, cy + 70, 58, 28, 30], [cx + 95, cy + 95, 56, 27, 15], [cx - 125, cy - 60, 54, 26, -40]];
    M.forEach(m => b += mito(m[0], m[1], m[2], m[3], m[4], id, lv === 2));
    const labs = [{ x: cx - 110, y: cy + 120, t: 'Cytoplasm', side: 'l' }, { x: cx + 180, y: cy - 60, t: lv === 2 ? 'Cell-surface membrane' : 'Cell membrane', side: 'r' }, { x: N[0] - 30, y: N[1] - 20, t: 'Nucleus', side: 'l' }, { x: M[0][0] + 10, y: M[0][1], t: 'Mitochondrion', side: 'r' }];
    if (lv >= 1) { b += ribos(r, lv === 2 ? 26 : 34, cx, cy, 165, 130, [[N[0], N[1], 75], ...M.map(m => [m[0], m[1], 36])]); labs.push({ x: cx + 40, y: cy + 130, t: 'Ribosomes', side: 'r' }); }
    if (lv === 2) {
      b += rer(cx - 70, cy + 72, 90, 3) + ser(cx + 60, cy + 30, 60) + golgi(cx + 30, cy - 120) + `<circle cx="${cx - 60}" cy="${cy - 115}" r="13" fill="#e9b7d8" stroke="#a45a8a" stroke-width="1.6"/><g transform="translate(${cx + 140} ${cy + 25})"><rect x="-10" y="-4" width="20" height="8" rx="2" fill="#c9a26b"/><rect x="-4" y="-12" width="8" height="20" rx="2" fill="#c9a26b" transform="translate(14 4)"/></g>`;
      labs.push({ x: N[0] + 20, y: N[1] + 20, t: 'Nucleolus', side: 'r', ly: cy + 10 }, { x: N[0] - 55, y: N[1] + 25, t: 'Nuclear envelope', side: 'l' }, { x: cx - 30, y: cy + 75, t: 'Rough ER', side: 'l' }, { x: cx + 85, y: cy + 28, t: 'Smooth ER', side: 'r' }, { x: cx + 30, y: cy - 118, t: 'Golgi apparatus', side: 'r' }, { x: cx - 60, y: cy - 115, t: 'Lysosome', side: 'l' }, { x: cx + 145, y: cy + 25, t: 'Centrioles', side: 'r' });
    }
    if (lv === 1) labs.push({ x: N[0] + 20, y: N[1] - 2, t: 'Genetic material (DNA)', side: 'r', ly: cy - 20 });
    return wrap(W, H, o.aria || 'Labelled animal cell', gradDefs(id), b + labels(labs, { W, H, lx: 190, rx: 640 }));
  }
  function plantCell(o = {}) {
    const lv = LV(o.level), id = 'sf' + (++uid), W = 840, H = 440, x0 = 245, y0 = 70, w = 350, h = 300, r = rnd(11);
    let b = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="18" fill="#bfe08f" stroke="#3f7d2c" stroke-width="3"/><rect x="${x0 + 9}" y="${y0 + 9}" width="${w - 18}" height="${h - 18}" rx="12" fill="url(#${id}-pc)" stroke="#6c9b3c" stroke-width="1.6"/>`;
    const V = [x0 + w * 0.57, y0 + h * 0.53, w * 0.33, h * 0.36];
    b += `<path d="M${f(V[0] - V[2])} ${f(V[1])}C${f(V[0] - V[2])} ${f(V[1] - V[3] * 1.1)} ${f(V[0] + V[2])} ${f(V[1] - V[3] * 1.1)} ${f(V[0] + V[2])} ${f(V[1])}S${f(V[0] - V[2] * 0.8)} ${f(V[1] + V[3] * 1.2)} ${f(V[0] - V[2])} ${f(V[1])}Z" fill="url(#${id}-vac)" stroke="#6f9cc4" stroke-width="2"/>`;
    const N = [x0 + 62, y0 + 70, 36, 30];
    b += nucleus(N[0], N[1], N[2], N[3], id, lv);
    const C = [[x0 + 40, y0 + 160, 0], [x0 + 52, y0 + 240, 20], [x0 + 140, y0 + 265, -10], [x0 + 250, y0 + 268, 5], [x0 + 320, y0 + 200, 80], [x0 + 300, y0 + 50, -15], [x0 + 190, y0 + 38, 5], [x0 + 320, y0 + 120, 70]];
    C.forEach(c => b += chloro(c[0], c[1], 40, 20, c[2], id, lv === 2));
    const M = [[x0 + 120, y0 + 35, 30, 15, 10], [x0 + 95, y0 + 200, 28, 14, -30]];
    M.forEach(m => b += mito(m[0], m[1], m[2], m[3], m[4], id, lv === 2));
    const labs = [{ x: x0 + 2, y: y0 + 120, t: 'Cell wall', side: 'l' }, { x: x0 + 10, y: y0 + 285, t: 'Cell membrane', side: 'l' }, { x: x0 + 60, y: y0 + 130, t: 'Cytoplasm', side: 'l', ly: y0 + 150 }, { x: N[0] - 20, y: N[1] - 10, t: 'Nucleus', side: 'l' },
      { x: C[5][0] + 10, y: C[5][1], t: 'Chloroplast', side: 'r' }, { x: V[0] + 40, y: V[1], t: lv ? 'Permanent vacuole' : 'Vacuole', side: 'r' }, { x: M[1][0], y: M[1][1], t: 'Mitochondrion', side: 'l', ly: y0 + 215 }];
    if (lv >= 1) { b += ribos(r, 26, x0 + w / 2, y0 + h / 2, w * 0.45, h * 0.44, [[V[0], V[1], 110], [N[0], N[1], 45], ...C.map(c => [c[0], c[1], 24])]); labs.push({ x: x0 + 78, y: y0 + 248, t: 'Ribosomes', side: 'l', ly: y0 + 250 }); }
    if (lv === 2) { b += golgi(x0 + 140, y0 + 95, 4) + `<path d="M${x0 + 175} ${y0}v9M${x0 + 175} ${y0 + h - 9}v9" stroke="#2f5d20" stroke-width="3"/>`; labs.push({ x: V[0] + V[2] - 4, y: V[1] + 14, t: 'Tonoplast', side: 'r', ly: V[1] + 40 }, { x: x0 + 140, y: y0 + 100, t: 'Golgi apparatus', side: 'l' }, { x: x0 + 175, y: y0 + h + 4, t: 'Plasmodesma', side: 'r', ly: H - 20 }); }
    return wrap(W, H, o.aria || 'Labelled plant cell', gradDefs(id), b + labels(labs, { W, H, lx: 205, rx: 640 }));
  }
  function bacterialCell(o = {}) {
    const lv = LV(o.level), id = 'sf' + (++uid), W = 880, H = 380, cx = 440, cy = 190, r = rnd(5);
    let b = '';
    if (lv === 2 || o.capsule) b += `<rect x="${cx - 215}" y="${cy - 95}" width="430" height="190" rx="95" fill="#f3e3b4" opacity=".55" stroke="#c9ad5f" stroke-dasharray="5 4"/>`;
    b += `<path d="M${cx + 200} ${cy}c30 -10 40 30 70 18s40 -30 70 -14" fill="none" stroke="#8a6d3b" stroke-width="3" stroke-linecap="round"/>`;
    b += `<rect x="${cx - 200}" y="${cy - 80}" width="400" height="160" rx="80" fill="#d8c08a" stroke="#8a6d3b" stroke-width="3"/><rect x="${cx - 192}" y="${cy - 72}" width="384" height="144" rx="72" fill="#f6ecd0" stroke="#a48a52" stroke-width="1.6"/>`;
    let loop = ''; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 2, rr = 1 + 0.18 * Math.sin(a * 5) + 0.1 * Math.cos(a * 9); loop += (i ? 'L' : 'M') + f(cx - 30 + Math.cos(a) * 85 * rr) + ' ' + f(cy + Math.sin(a) * 38 * rr); }
    b += `<path d="${loop}Z" fill="none" stroke="#5e3784" stroke-width="2.4"/>`;
    const P = [[cx + 110, cy - 30, 16], [cx + 130, cy + 30, 12], [cx - 150, cy + 30, 11]];
    P.forEach(p => b += `<ellipse cx="${p[0]}" cy="${p[1]}" rx="${p[2]}" ry="${p[2] * 0.75}" fill="none" stroke="#c0392b" stroke-width="2.2"/>`);
    b += ribos(r, 40, cx, cy, 175, 60, [[cx - 30, cy, 40], ...P.map(p => [p[0], p[1], p[2] + 4])]);
    const labs = [{ x: cx - 70, y: cy - 34, t: lv === 2 ? 'Circular DNA (nucleoid)' : 'DNA (single loop)', side: 'l' }, { x: P[0][0] + 11, y: P[0][1] - 12, t: 'Plasmids', side: 'r', ly: cy - 90 }, { x: cx - 150, y: cy - 60, t: 'Cell wall', side: 'l', ly: cy - 100 }, { x: cx - 120, y: cy + 68, t: 'Cell membrane', side: 'l' }, { x: cx + 60, y: cy + 50, t: 'Cytoplasm', side: 'r', ly: cy + 70 }, { x: cx + 300, y: cy + 6, t: 'Flagellum', side: 'r', ly: cy - 45 }];
    if (lv >= 1) labs.push({ x: cx - 100, y: cy + 40, t: lv === 2 ? 'Ribosomes (70S)' : 'Ribosomes', side: 'l' });
    if (lv === 2 || o.capsule) labs.push({ x: cx + 170, y: cy - 88, t: 'Capsule (slime layer)', side: 'r', ly: cy - 120 });
    if (lv === 2) { b += [-60, -20, 30, 70].map((dx, i) => `<path d="M${cx + dx} ${cy - 80}l${i % 2 ? 4 : -4} -14" stroke="#8a6d3b" stroke-width="1.6"/>`).join(''); labs.push({ x: cx - 20, y: cy - 90, t: 'Pili', side: 'r', ly: cy - 150 }); }
    return wrap(W, H, o.aria || 'Labelled bacterial cell', gradDefs(id), b + labels(labs, { W, H, lx: 205, rx: 675, top: 20 }));
  }

  /* ---------- atom (Bohr model) ---------- */
  const SYM = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
  const NAME = ['', 'hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'neon', 'sodium', 'magnesium', 'aluminium', 'silicon', 'phosphorus', 'sulfur', 'chlorine', 'argon', 'potassium', 'calcium'];
  const MASS = [0, 1, 4, 7, 9, 11, 12, 14, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 40, 39, 40];
  const shells = n => { const c = []; for (const cap of [2, 8, 8, 2]) { if (n <= 0) break; c.push(Math.min(cap, n)); n -= cap; } return c; };
  function atom(o = {}) {
    const Z = Math.max(1, Math.min(20, o.Z || 6)), A = o.A || MASS[Z], ch = o.charge || 0, e = Z - ch, lv = LV(o.level), id = 'sf' + (++uid);
    const W = 840, H = 440, cx = 380, cy = 220, cfg = shells(e), N = A - Z;
    let b = `<radialGradient id="${id}-p" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff9b8a"/><stop offset="1" stop-color="#c8372a"/></radialGradient><radialGradient id="${id}-n" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e2e6ea"/><stop offset="1" stop-color="#8a949c"/></radialGradient><radialGradient id="${id}-e" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#9fd0ff"/><stop offset="1" stop-color="#2f7fd6"/></radialGradient>`;
    const defs = b; b = '';
    const R0 = 52, dR = Math.min(46, 150 / Math.max(1, cfg.length));
    cfg.forEach((n, i) => { b += `<circle cx="${cx}" cy="${cy}" r="${f(R0 + dR * (i + 1))}" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".45" stroke-dasharray="${lv === 0 ? '0' : '0'}"/>`; });
    /* nucleus: pack nucleons in a disc, protons and neutrons interleaved */
    const tot = Math.min(A, 48), r1 = 9.5, nr = Math.max(14, Math.sqrt(tot) * r1 * 0.95);
    const pts = []; for (let k = 0; k < tot; k++) { const rr = nr * Math.sqrt((k + 0.5) / tot) * 0.82, a = k * 2.39996; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
    pts.sort((p, q) => (q[1] - p[1]) || (p[0] - q[0]));
    const isP = pts.map((_, k) => Math.round((k + 1) * Z / tot) > Math.round(k * Z / tot));
    b += `<circle cx="${cx}" cy="${cy}" r="${f(nr + 8)}" fill="#f3d6a8" opacity=".18"/>`;
    pts.forEach((p, k) => { b += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${r1}" fill="url(#${id}-${isP[k] ? 'p' : 'n'})" stroke="#000" stroke-opacity=".25"/>` + (isP[k] && lv >= 1 && tot <= 24 ? `<text x="${f(p[0])}" y="${f(p[1] + 4)}" text-anchor="middle" font-size="11" font-weight="700" class="sf-in" style="fill:#fff">+</text>` : ''); });
    /* electrons: pairs at compass points, as drawn in GCSE dot diagrams */
    let firstE = null;
    cfg.forEach((n, i) => {
      const rr = R0 + dR * (i + 1), slots = n <= 2 ? [[-90, n]] : [];
      if (n > 2) { const per = [0, 0, 0, 0]; for (let k = 0; k < n; k++) per[k % 4]++; [-90, 0, 90, 180].forEach((a, j) => slots.push([a, per[j]])); }
      let es = '';
      slots.forEach(([a, m]) => { for (let k = 0; k < m; k++) { const aa = (a + (m === 2 ? (k ? 9 : -9) * 52 / rr : 0)) * Math.PI / 180, x = cx + Math.cos(aa) * rr, y = cy + Math.sin(aa) * rr; if (!firstE) firstE = [x, y]; es += `<circle cx="${f(x)}" cy="${f(y)}" r="7.5" fill="url(#${id}-e)" stroke="#123c6b" stroke-opacity=".6"/>` + (lv >= 1 ? `<text x="${f(x)}" y="${f(y + 3.5)}" text-anchor="middle" font-size="10" font-weight="700" class="sf-in" style="fill:#fff">−</text>` : ''); } });
      b += qg(es, cx, cy, rr);
    });
    const pk = pts.findIndex((_, k) => isP[k]), nk = pts.findIndex((_, k) => !isP[k]);
    const labs = [{ x: cx - nr - 6, y: cy + 4, t: 'Nucleus', side: 'l' }];
    if (pk >= 0) labs.push({ x: pts[pk][0], y: pts[pk][1], t: lv ? 'Proton (+1)' : 'Proton', side: 'l', ly: cy + 60 });
    if (nk >= 0) labs.push({ x: pts[nk][0], y: pts[nk][1], t: lv ? 'Neutron (0)' : 'Neutron', side: 'l', ly: cy + 110 });
    if (firstE) labs.push({ x: firstE[0], y: firstE[1], t: lv ? 'Electron (−1)' : 'Electron', side: 'r', ly: 40 });
    const outR = R0 + dR * cfg.length;
    labs.push({ x: cx + outR * 0.71, y: cy + outR * 0.71, t: lv ? 'Shell (energy level)' : 'Shell', side: 'r', ly: cy + 150 });
    let sideTxt = `<g transform="translate(${W - 140} 150)"><text x="0" y="0" font-size="16" class="sf-lab" text-anchor="middle">${esc(o.title || (NAME[Z][0].toUpperCase() + NAME[Z].slice(1) + (ch ? ' ion' : ' atom')))}</text>`;
    sideTxt += `<text x="-6" y="44" font-size="14" text-anchor="end" class="sf-lab">${A}</text><text x="-6" y="72" font-size="14" text-anchor="end" class="sf-lab">${Z}</text><text x="0" y="70" font-size="40" font-weight="700" class="sf-lab">${SYM[Z]}</text>${ch ? `<text x="${SYM[Z].length * 24 + 4}" y="46" font-size="16" class="sf-lab">${Math.abs(ch) > 1 ? Math.abs(ch) : ''}${ch > 0 ? '+' : '−'}</text>` : ''}`;
    if (lv >= 1) { const t1 = `${Z} p · ${N} n · ${e} e⁻`, t2 = `Electrons: ${cfg.join(', ')}`; sideTxt += qt(`<text x="0" y="104" font-size="13" text-anchor="middle" class="sf-lab">${t1}</text>`, -t1.length * 3.8 - 6, 91, t1.length * 7.6 + 12, 17) + qt(`<text x="0" y="124" font-size="13" text-anchor="middle" class="sf-lab">${t2}</text>`, -t2.length * 3.8 - 6, 112, t2.length * 7.6 + 12, 17); }
    sideTxt += '</g>';
    return wrap(W, H, o.aria || `Atom diagram of ${NAME[Z]}: ${Z} protons, ${N} neutrons, ${e} electrons arranged ${cfg.join(', ')}`, defs, b + labels(labs, { W, H, lx: cx - outR - 26, rx: cx + outR + 30, top: 30 }) + sideTxt);
  }


  /* ---------- neurone ---------- */
  function neurone(o = {}) {
    const lv = LV(o.level), id = 'sf' + (++uid), W = 1000, H = 330, cy = 165, r = rnd(3);
    let b = `<radialGradient id="${id}-cb" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffe0d0"/><stop offset="1" stop-color="#f0b29a"/></radialGradient>`;
    const defs = gradDefs(id) + b; b = '';
    const bx = 260;
    const den = (x, y, a, len, d) => { if (d > 2) return ''; const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; return `<path d="M${f(x)} ${f(y)}Q${f((x + x2) / 2 + 6)} ${f((y + y2) / 2 - 6)} ${f(x2)} ${f(y2)}" stroke="#e7a68c" stroke-width="${7 - d * 2.2}" fill="none" stroke-linecap="round"/>` + den(x2, y2, a - 0.45, len * 0.62, d + 1) + den(x2, y2, a + 0.4, len * 0.6, d + 1); };
    [[-2.5, 46], [-1.9, 52], [-1.2, 44], [2.4, 46], [1.8, 50], [1.2, 40], [3.1, 50]].forEach(([a, l]) => b += den(bx + Math.cos(a) * 34, cy + Math.sin(a) * 34, a, l, 0));
    b += `<path d="M${bx - 40} ${cy}C${bx - 44} ${cy - 42} ${bx + 20} ${cy - 52} ${bx + 46} ${cy - 18}L${bx + 60} ${cy - 7}V${cy + 7}L${bx + 46} ${cy + 18}C${bx + 20} ${cy + 52} ${bx - 44} ${cy + 42} ${bx - 40} ${cy}Z" fill="url(#${id}-cb)" stroke="#c97f63" stroke-width="2"/>`;
    b += nucleus(bx - 2, cy, 18, 15, id, 1);
    b += `<rect x="${bx + 58}" y="${cy - 5}" width="470" height="10" fill="#f0b29a" stroke="#c97f63"/>`;
    const segs = 5, sx = bx + 80, sw = 76, gap = 14;
    for (let i = 0; i < segs; i++) { const x = sx + i * (sw + gap); b += `<rect x="${x}" y="${cy - 15}" width="${sw}" height="30" rx="14" fill="#f6f1e6" stroke="#c9b98a" stroke-width="1.6"/>` + (lv === 2 ? `<ellipse cx="${x + sw / 2}" cy="${cy - 11}" rx="7" ry="3.5" fill="#b28fd0"/>` : ''); }
    const ex = bx + 528;
    [[-0.7, 60], [-0.25, 70], [0.2, 66], [0.65, 58]].forEach(([a, l]) => { const x2 = ex + Math.cos(a) * l, y2 = cy + Math.sin(a) * l; b += `<path d="M${ex} ${cy}Q${f(ex + l * 0.5)} ${f(cy + Math.sin(a) * l * 0.3)} ${f(x2)} ${f(y2)}" stroke="#e7a68c" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="${f(x2 + 4)}" cy="${f(y2)}" r="8" fill="#f0b29a" stroke="#c97f63"/>`; });
    b += `<path d="M${bx + 120} ${cy + 46}H${bx + 360}" stroke="#ffcf5a" stroke-width="3"/><path d="M${bx + 360} ${cy + 40}l12 6 -12 6z" fill="#ffcf5a"/><text x="${bx + 240}" y="${cy + 66}" text-anchor="middle" font-size="14" class="sf-lab">direction of impulse</text>`;
    const labs = [{ x: bx - 70, y: cy - 60, t: 'Dendrites', side: 'l' }, { x: bx + 30, y: cy - 30, t: 'Cell body', side: 'l', ly: 70 }, { x: bx - 6, y: cy + 4, t: 'Nucleus', side: 'l', ly: 260 },
      { x: sx + sw + gap + 40, y: cy - 15, t: lv === 2 ? 'Myelin sheath (Schwann cell)' : 'Myelin sheath', side: 'r', ly: 40 }, { x: sx + segs * (sw + gap) + 2, y: cy, t: 'Axon', side: 'r', ly: 115 }, { x: ex + 66, y: cy + 40, t: lv === 2 ? 'Axon terminals (synaptic knobs)' : 'Nerve endings', side: 'r', ly: 300 }];
    if (lv === 2) labs.push({ x: sx + 2 * (sw + gap) - gap / 2, y: cy - 4, t: 'Node of Ranvier', side: 'r', ly: 70 });
    return wrap(W, H, o.aria || 'Labelled motor neurone', defs, b + labels(labs, { W, H, lx: 150, rx: 870, size: 14, gap: 24 }));
  }

  /* ---------- heart (front view, section) ---------- */
  function heart(o = {}) {
    const lv = LV(o.level), id = 'sf' + (++uid), W = 900, H = 540;
    const defs = `<linearGradient id="${id}-mu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9786e"/><stop offset="1" stop-color="#a8423c"/></linearGradient>`;
    const B = '#6f8fd8', Bd = '#3c5fae', Rr = '#e2554b', Rd = '#a8231c';
    let b = '';
    /* vessels behind the heart */
    b += `<path d="M470 300C468 230 455 160 462 110C470 60 560 40 610 70C640 88 650 120 652 170" fill="none" stroke="${Rd}" stroke-width="48" stroke-linecap="butt"/><path d="M470 300C468 230 455 160 462 110C470 60 560 40 610 70C640 88 650 120 652 170" fill="none" stroke="${Rr}" stroke-width="40"/>`;
    b += `<path d="M300 40V190" stroke="${Bd}" stroke-width="44"/><path d="M300 40V190" stroke="${B}" stroke-width="36"/>`;
    b += `<path d="M262 330L222 430" stroke="${Bd}" stroke-width="40"/><path d="M262 330L222 430" stroke="${B}" stroke-width="32"/>`;
    b += [[200], [236]].map(([y]) => `<path d="M560 ${y}H690" stroke="${Rd}" stroke-width="26"/><path d="M560 ${y}H690" stroke="${Rr}" stroke-width="20"/>`).join('');
    /* muscle */
    b += `<path d="M250 210C246 165 285 140 330 142C380 144 420 150 440 160C470 145 540 140 580 160C615 178 618 230 610 290C600 360 540 430 450 488C350 430 270 360 255 300C250 270 252 240 250 210Z" fill="url(#${id}-mu)" stroke="#7d2a25" stroke-width="2"/>`;
    /* chambers */
    b += `<path d="M268 215C268 180 300 168 335 170C372 172 400 185 402 215C404 248 380 268 335 270C295 270 268 250 268 215Z" fill="${B}"/>`;
    b += `<path d="M460 205C462 180 500 168 535 170C570 172 592 190 590 220C588 248 560 262 525 262C490 262 458 238 460 205Z" fill="${Rr}"/>`;
    b += `<path d="M278 292C320 282 370 282 405 290C412 340 418 390 432 440C368 400 300 350 278 292Z" fill="${B}"/>`;
    b += `<path d="M458 290C500 280 545 282 580 292C584 340 552 392 462 452C452 400 452 340 458 290Z" fill="${Rr}"/>`;
    /* pulmonary artery in front */
    b += `<path d="M395 290C392 230 390 175 395 128C400 100 360 90 300 100M395 140C400 110 470 92 540 104" fill="none" stroke="${Bd}" stroke-width="40"/><path d="M395 290C392 230 390 175 395 128C400 100 360 90 300 100M395 140C400 110 470 92 540 104" fill="none" stroke="${B}" stroke-width="32"/>`;
    /* valves */
    const valve = (x, y, s) => `<path d="M${x - 22} ${y}l12 ${s * 16}M${x + 22} ${y}l-12 ${s * 16}" stroke="#f6f0e6" stroke-width="5" stroke-linecap="round"/>`;
    b += valve(335, 274, 1) + valve(525, 268, 1);
    b += `<path d="M380 128h30M450 150h30" stroke="#f6f0e6" stroke-width="5" stroke-linecap="round"/>`;
    if (lv === 2) b += `<path d="M325 290L340 330M345 290L350 330M515 285L520 330M535 285L530 330" stroke="#f6f0e6" stroke-width="1.6"/>`;
    /* flow arrows */
    const ar = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1); return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#fff" stroke-width="3"/><path d="M${x2} ${y2}l${f(-12 * Math.cos(a - 0.4))} ${f(-12 * Math.sin(a - 0.4))}M${x2} ${y2}l${f(-12 * Math.cos(a + 0.4))} ${f(-12 * Math.sin(a + 0.4))}" stroke="#fff" stroke-width="3"/>`; };
    b += ar(300, 60, 300, 120) + ar(335, 230, 335, 320) + ar(380, 360, 393, 250) + ar(660, 200, 600, 210) + ar(525, 225, 520, 320) + ar(480, 380, 470, 240) + ar(560, 55, 615, 75);
    const labs = [{ x: 300, y: 70, t: lv === 2 ? 'Vena cava (superior)' : 'Vena cava', side: 'l' }, { x: 230, y: 415, t: lv === 2 ? 'Vena cava (inferior)' : 'Vena cava', side: 'l' }, { x: 310, y: 100, t: 'Pulmonary artery', side: 'l', ly: 120 },
      { x: 300, y: 215, t: 'Right atrium', side: 'l' }, { x: 320, y: 320, t: 'Right ventricle', side: 'l' }, { x: 335, y: 282, t: lv === 2 ? 'Atrioventricular (tricuspid) valve' : 'Valve', side: 'l' },
      { x: 600, y: 75, t: 'Aorta', side: 'r' }, { x: 675, y: 236, t: 'Pulmonary vein', side: 'r' }, { x: 555, y: 205, t: 'Left atrium', side: 'r' }, { x: 545, y: 330, t: 'Left ventricle', side: 'r' }, { x: 600, y: 330, t: 'Thick muscular wall', side: 'r' }, { x: 440, y: 380, t: 'Septum', side: 'r', ly: 430 }];
    if (lv === 2) labs.push({ x: 452, y: 150, t: 'Semilunar valves', side: 'r', ly: 120 }, { x: 345, y: 315, t: 'Tendinous cords', side: 'l' });
    b += `<text x="450" y="525" text-anchor="middle" font-size="13" class="sf-lab">Viewed from the front: the left side of the heart is on the right of the diagram</text>`;
    return wrap(W, H, o.aria || 'Labelled section through the human heart', defs, b + labels(labs, { W, H: H - 20, lx: 200, rx: 710, size: 14, gap: 25 }));
  }

  /* ---------- leaf cross-section ---------- */
  function leaf(o = {}) {
    const lv = LV(o.level), id = 'sf' + (++uid), W = 900, H = 470, x0 = 40, x1 = 640, r = rnd(13);
    let b = '';
    b += `<rect x="${x0}" y="40" width="${x1 - x0}" height="8" fill="#e9f2b8" opacity=".9"/>`;
    for (let x = x0; x < x1; x += 50) b += `<rect x="${x}" y="48" width="50" height="26" fill="#f2f8e8" stroke="#8fae6a"/>`;
    const ch = (x, y, n, w, h) => { let s = ''; for (let k = 0; k < n; k++) s += `<ellipse cx="${f(x + 6 + r() * (w - 12))}" cy="${f(y + 6 + r() * (h - 12))}" rx="4.5" ry="3" fill="#3f9b3a"/>`; return s; };
    for (let x = x0; x < x1; x += 30) b += `<rect x="${x + 1}" y="76" width="28" height="92" rx="9" fill="#cdeaa8" stroke="#6c9b3c"/>` + ch(x + 1, 76, 9, 28, 92);
    const sp = []; for (let i = 0; i < 26; i++) { const x = x0 + 20 + (i % 13) * 46 + (Math.floor(i / 13) ? 22 : 0), y = 200 + Math.floor(i / 13) * 58 + (r() - 0.5) * 12; if (x > 300 && x < 400) continue; sp.push([x, y]); }
    sp.forEach(([x, y]) => b += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="20" ry="17" fill="#ddf0c4" stroke="#6c9b3c"/>` + ch(x - 14, y - 10, 3, 28, 20));
    b += `<ellipse cx="350" cy="235" rx="46" ry="40" fill="#e8e0c8" stroke="#8a7a4a" stroke-width="2"/>${[[-14, -16], [0, -18], [14, -15], [-8, -2], [8, -1]].map(([dx, dy]) => `<circle cx="${350 + dx}" cy="${235 + dy}" r="7" fill="#f6efe0" stroke="#7a5a2a" stroke-width="2.4"/>`).join('')}${[[-12, 18], [2, 22], [15, 16]].map(([dx, dy]) => `<circle cx="${350 + dx}" cy="${235 + dy}" r="5" fill="#d9e9f6" stroke="#5a7fa8" stroke-width="1.2"/>`).join('')}`;
    for (let x = x0; x < x1; x += 50) { if (x === x0 + 200) continue; b += `<rect x="${x}" y="306" width="50" height="22" fill="#f2f8e8" stroke="#8fae6a"/>`; }
    const gx = x0 + 225;
    b += `<path d="M${gx - 25} 306c0 -12 22 -12 22 0v22c0 12 -22 12 -22 0z" fill="#9fd47a" stroke="#4f8a32"/><path d="M${gx + 25} 306c0 -12 -22 -12 -22 0v22c0 12 22 12 22 0z" fill="#9fd47a" stroke="#4f8a32"/>`;
    b += `<rect x="${x0}" y="328" width="${x1 - x0}" height="6" fill="#e9f2b8" opacity=".9"/>`;
    b += `<path d="M${gx} 380V340" stroke="#7fb2ff" stroke-width="2.4"/><path d="M${gx - 6} 350l6 -10 6 10" fill="none" stroke="#7fb2ff" stroke-width="2.4"/><text x="${gx + 10}" y="378" font-size="13" class="sf-lab">CO₂ in</text><path d="M${gx - 40} 340l-20 36" stroke="#ff9b8a" stroke-width="2.4"/><text x="${gx - 120}" y="392" font-size="13" class="sf-lab">O₂ and water vapour out</text>`;
    b += `<text x="20" y="${H - 20}" font-size="13" class="sf-lab">Air spaces between spongy cells let gases diffuse to and from every cell.</text>`;
    const labs = [{ x: x1 - 10, y: 44, t: 'Waxy cuticle', side: 'r' }, { x: x1 - 20, y: 62, t: 'Upper epidermis', side: 'r' }, { x: x1 - 15, y: 120, t: 'Palisade mesophyll', side: 'r' }, { x: x1 - 20, y: 220, t: 'Spongy mesophyll', side: 'r' }, { x: x1 - 45, y: 250, t: 'Air space', side: 'r' },
      { x: 342, y: 220, t: 'Xylem', side: 'r', ly: 180 }, { x: 352, y: 257, t: 'Phloem', side: 'r', ly: 280 }, { x: x1 - 20, y: 318, t: 'Lower epidermis', side: 'r' }, { x: gx + 16, y: 320, t: 'Guard cell', side: 'r', ly: 350 }, { x: gx, y: 318, t: 'Stoma', side: 'r', ly: 378 }, { x: x1 - 52, y: 100, t: 'Chloroplasts', side: 'r', ly: 150 }];
    return wrap(W, H, o.aria || 'Cross-section of a leaf', gradDefs(id), b + labels(labs, { W, H: H - 30, lx: 30, rx: 690, size: 14, gap: 25, top: 30 }));
  }

  /* ---------- alveolus and capillary ---------- */
  function alveolus(o = {}) {
    const id = 'sf' + (++uid), W = 960, H = 420, lv = LV(o.level);
    let b = `<path d="M330 20V90" stroke="#e9d8cf" stroke-width="40"/><circle cx="330" cy="200" r="120" fill="#fbeee8" stroke="#d6a99a" stroke-width="5"/><circle cx="330" cy="200" r="114" fill="#eaf4fb"/>`;
    b += `<path d="M190 330C200 250 210 140 300 80C370 40 470 60 480 140C490 220 470 300 440 360" fill="none" stroke="#b5332b" stroke-width="30" stroke-linecap="round"/><path d="M190 330C200 250 210 140 300 80C370 40 470 60 480 140C490 220 470 300 440 360" fill="none" stroke="#e46b5f" stroke-width="24" stroke-linecap="round"/>`;
    [[205, 270], [215, 190], [255, 112], [330, 72], [410, 74], [470, 130], [476, 220], [458, 310]].forEach(([x, y]) => b += `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#c0261d" stroke="#8a1610"/>`);
    const ar = (x1, y1, x2, y2, c) => { const a = Math.atan2(y2 - y1, x2 - x1); return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="3"/><path d="M${x2} ${y2}l${f(-11 * Math.cos(a - 0.45))} ${f(-11 * Math.sin(a - 0.45))}M${x2} ${y2}l${f(-11 * Math.cos(a + 0.45))} ${f(-11 * Math.sin(a + 0.45))}" stroke="${c}" stroke-width="3"/>`; };
    b += ar(380, 190, 455, 165, '#2f7fd6') + `<text x="370" y="205" font-size="15" font-weight="700" style="fill:#2f7fd6">O₂</text>` + ar(455, 250, 382, 238, '#8a6d00') + `<text x="372" y="262" font-size="15" font-weight="700" style="fill:#8a6d00">CO₂</text>`;
    b += ar(170, 360, 196, 320, '#e46b5f') + ar(440, 365, 460, 400, '#e46b5f');
    const labs = [{ x: 330, y: 40, t: 'Air from bronchiole', side: 'l' }, { x: 290, y: 300, t: 'Alveolus (air sac)', side: 'l' }, { x: 222, y: 245, t: lv === 2 ? 'Squamous epithelium (one cell thick)' : 'Thin alveolus wall (one cell thick)', side: 'l' }, { x: 470, y: 130, t: 'Capillary', side: 'r' }, { x: 476, y: 220, t: 'Red blood cell', side: 'r' }, { x: 175, y: 352, t: 'Blood from heart (low O₂)', side: 'l' }, { x: 455, y: 392, t: 'Blood to heart (high O₂)', side: 'r' }, { x: 420, y: 180, t: 'Oxygen diffuses into blood', side: 'r', ly: 60 }, { x: 420, y: 245, t: 'Carbon dioxide diffuses out', side: 'r', ly: 290 }];
    labs.forEach(l => l.x += 100);
    return wrap(W, H, o.aria || 'Gas exchange between an alveolus and a capillary', '', `<g transform="translate(100 0)">${b}</g>` + labels(labs, { W, H, lx: 260, rx: 660, size: 14, gap: 26 }));
  }

  /* ---------- eye (horizontal section) ---------- */
  function eye(o = {}) {
    const id = 'sf' + (++uid), W = 920, H = 440, cx = 430, cy = 220, R = 150;
    let b = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#f7f3ec" stroke="#cfc6b4" stroke-width="8"/><circle cx="${cx}" cy="${cy}" r="${R - 8}" fill="none" stroke="#d1584e" stroke-width="5" stroke-dasharray="560 400" stroke-dashoffset="-120"/><circle cx="${cx}" cy="${cy}" r="${R - 12}" fill="#f4f0f8"/>`;
    b += `<path d="M${cx - R + 30} ${cy - 92}A110 110 0 0 0 ${cx - R + 30} ${cy + 92}" fill="#e7f3fb" stroke="#9cc3dc" stroke-width="3"/>`;
    b += `<path d="M${cx - R + 34} ${cy - 92}V${cy - 26}M${cx - R + 34} ${cy + 26}V${cy + 92}" stroke="#6b4b2a" stroke-width="9"/>`;
    b += `<ellipse cx="${cx - R + 62}" cy="${cy}" rx="20" ry="52" fill="#e9f3ff" stroke="#7fa6c8" stroke-width="2"/>`;
    b += `<path d="M${cx - R + 62} ${cy - 52}L${cx - R + 52} ${cy - 96}M${cx - R + 62} ${cy + 52}L${cx - R + 52} ${cy + 96}" stroke="#a89b80" stroke-width="1.6"/><ellipse cx="${cx - R + 52}" cy="${cy - 100}" rx="12" ry="7" fill="#c47b5f"/><ellipse cx="${cx - R + 52}" cy="${cy + 100}" rx="12" ry="7" fill="#c47b5f"/>`;
    b += `<path d="M${cx + R - 6} ${cy + 18}H${cx + R + 110}V${cy + 58}H${cx + R - 6}Z" fill="#f2e2b8" stroke="#c9ad5f" stroke-width="2"/><circle cx="${cx + R - 14}" cy="${cy + 36}" r="5" fill="#c9ad5f"/>`;
    b += `<path d="M${cx - R - 40} ${cy - 30}L${cx + R - 12} ${cy + 10}M${cx - R - 40} ${cy + 30}L${cx + R - 12} ${cy + 10}" stroke="#ffcf5a" stroke-width="1.6" stroke-dasharray="6 4" opacity=".9"/>`;
    const labs = [{ x: cx - R + 6, y: cy - 60, t: 'Cornea', side: 'l' }, { x: cx - R + 34, y: cy - 60, t: 'Iris', side: 'l', ly: cy - 20 }, { x: cx - R + 40, y: cy, t: 'Pupil', side: 'l', ly: cy + 20 }, { x: cx - R + 64, y: cy + 30, t: 'Lens', side: 'l', ly: cy + 60 },
      { x: cx - R + 52, y: cy - 100, t: 'Ciliary muscle', side: 'l', ly: cy - 120 }, { x: cx - R + 57, y: cy + 74, t: 'Suspensory ligaments', side: 'l', ly: cy + 110 }, { x: cx + R - 10, y: cy - 60, t: 'Retina', side: 'r' }, { x: cx + R + 2, y: cy - 110, t: 'Sclera', side: 'r' }, { x: cx + R + 80, y: cy + 40, t: 'Optic nerve', side: 'r', ly: cy + 90 }, { x: cx + R - 14, y: cy + 36, t: 'Blind spot', side: 'r', ly: cy + 40 }];
    return wrap(W, H, o.aria || 'Horizontal section through the eye', '', b + labels(labs, { W, H, lx: 180, rx: 730, size: 14, gap: 26 }));
  }


  /* ---------- specialised cells panel ---------- */
  function specialised(o = {}) {
    const id = 'sf' + (++uid), W = 960, H = 520, r = rnd(21);
    const want = o.cells || ['sperm', 'nerve', 'muscle', 'roothair', 'xylem', 'phloem'];
    const cellW = 300, cellH = 262;
    const P = {
      sperm: (x, y) => `<ellipse cx="${x + 70}" cy="${y + 100}" rx="34" ry="24" fill="#f6e3ef" stroke="#a45a8a" stroke-width="2"/><path d="M${x + 44} ${y + 86}a30 22 0 0 1 30 -10" fill="none" stroke="#e2a83a" stroke-width="6"/><ellipse cx="${x + 72}" cy="${y + 102}" rx="20" ry="14" fill="#a979cf"/><rect x="${x + 102}" y="${y + 92}" width="56" height="18" rx="8" fill="#f6e3ef" stroke="#a45a8a"/>${[0, 1, 2, 3].map(i => `<ellipse cx="${x + 110 + i * 13}" cy="${y + 101}" rx="6" ry="5" fill="#ec8a68"/>`).join('')}<path d="M${x + 158} ${y + 101}c20 -20 40 20 60 0s40 -20 60 0" fill="none" stroke="#c98fb6" stroke-width="4"/>`,
      nerve: (x, y) => `<circle cx="${x + 60}" cy="${y + 100}" r="24" fill="#f0b29a" stroke="#c97f63" stroke-width="2"/>${[-2.4, -1.6, 2.2, 1.5, 3.0].map(a => `<path d="M${x + 60 + Math.cos(a) * 22} ${y + 100 + Math.sin(a) * 22}l${f(Math.cos(a) * 34)} ${f(Math.sin(a) * 34)}" stroke="#e7a68c" stroke-width="4" stroke-linecap="round"/>`).join('')}<circle cx="${x + 58}" cy="${y + 100}" r="9" fill="#a979cf"/><path d="M${x + 84} ${y + 100}H${x + 250}" stroke="#f0b29a" stroke-width="7"/>${[0, 1, 2, 3].map(i => `<rect x="${x + 96 + i * 38}" y="${y + 92}" width="30" height="16" rx="7" fill="#f6f1e6" stroke="#c9b98a"/>`).join('')}${[-0.5, 0, 0.5].map(a => `<path d="M${x + 250} ${y + 100}l${f(Math.cos(a) * 28)} ${f(Math.sin(a) * 28)}" stroke="#e7a68c" stroke-width="4" stroke-linecap="round"/>`).join('')}`,
      muscle: (x, y) => `<rect x="${x + 30}" y="${y + 70}" width="230" height="60" rx="26" fill="#efb0a8" stroke="#b55a50" stroke-width="2"/>${Array.from({ length: 16 }, (_, i) => `<path d="M${x + 50 + i * 12.5} ${y + 74}v52" stroke="#c96f66" stroke-width="${i % 2 ? 1.2 : 3}"/>`).join('')}${[0, 1, 2].map(i => `<ellipse cx="${x + 80 + i * 70}" cy="${y + 78}" rx="9" ry="5" fill="#a979cf"/>`).join('')}${[0, 1, 2, 3].map(i => `<ellipse cx="${x + 64 + i * 56}" cy="${y + 120}" rx="9" ry="4.5" fill="#ec8a68"/>`).join('')}`,
      roothair: (x, y) => `<path d="M${x + 30} ${y + 60}h80v80h-80z" fill="#eef7dc" stroke="#6c9b3c" stroke-width="3"/><path d="M${x + 110} ${y + 90}h120q20 0 20 10t-20 10h-120" fill="#eef7dc" stroke="#6c9b3c" stroke-width="3"/><rect x="${x + 40}" y="${y + 70}" width="60" height="60" rx="10" fill="#e3f0f9" stroke="#7fa6c8"/><circle cx="${x + 160}" cy="${y + 100}" r="9" fill="#a979cf"/>${[0, 1, 2].map(i => `<circle cx="${x + 255 + i * 10}" cy="${y + 90 + i * 9}" r="3" fill="#7fb2ff"/>`).join('')}<text x="${x + 262}" y="${y + 134}" font-size="12" class="sf-lab">water</text>`,
      xylem: (x, y) => `${[0, 1, 2].map(i => `<rect x="${x + 70 + i * 50}" y="${y + 36}" width="38" height="150" fill="#f2e8cf" stroke="#7a5a2a" stroke-width="2"/>${Array.from({ length: 7 }, (_, k) => `<path d="M${x + 70 + i * 50} ${y + 48 + k * 20}l38 8" stroke="#7a5a2a" stroke-width="3"/>`).join('')}`).join('')}<path d="M${x + 250} ${y + 180}V${y + 50}" stroke="#7fb2ff" stroke-width="3"/><path d="M${x + 243} ${y + 62}l7 -12 7 12" fill="none" stroke="#7fb2ff" stroke-width="3"/>`,
      phloem: (x, y) => `${[0, 1].map(i => `<rect x="${x + 80}" y="${y + 36 + i * 72}" width="46" height="70" fill="#f2f8e8" stroke="#4f8a32" stroke-width="2"/>`).join('')}<path d="M${x + 80} ${y + 107}h46" stroke="#4f8a32" stroke-width="5" stroke-dasharray="4 4"/><rect x="${x + 128}" y="${y + 46}" width="26" height="128" rx="6" fill="#dcebc6" stroke="#4f8a32"/><circle cx="${x + 141}" cy="${y + 110}" r="7" fill="#a979cf"/><path d="M${x + 210} ${y + 50}V${y + 180}M${x + 203} ${y + 168}l7 12 7 -12M${x + 230} ${y + 180}V${y + 50}M${x + 223} ${y + 62}l7 -12 7 12" fill="none" stroke="#e2a83a" stroke-width="3"/>`
    };
    const TXT = { sperm: ['Sperm cell', 'Tail to swim; mitochondria release energy; acrosome enzymes digest the egg membrane'], nerve: ['Nerve cell (neurone)', 'Long axon carries impulses; branched endings connect to other cells'], muscle: ['Muscle cell', 'Protein filaments slide to contract; many mitochondria'], roothair: ['Root hair cell', 'Long projection gives a large surface area for water and mineral uptake'], xylem: ['Xylem', 'Dead hollow tubes strengthened by lignin carry water upwards'], phloem: ['Phloem', 'Sieve plates and companion cells move sugars both ways'] };
    let b = '';
    want.forEach((k, i) => {
      const x = (i % 3) * (cellW + 20) + 10, y = Math.floor(i / 3) * (cellH + 20) + 10;
      b += `<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="12" fill="currentColor" opacity=".05"/>` + P[k](x, y) + `<text x="${x + 14}" y="${y + 24}" font-size="16" font-weight="700" class="sf-lab">${TXT[k][0]}</text>`;
      const words = TXT[k][1].split(' '); let line = '', ln = 0;
      words.forEach(w => { if ((line + ' ' + w).length > 40) { b += `<text x="${x + 14}" y="${y + 214 + ln * 17}" font-size="13" class="sf-lab">${esc(line.trim())}</text>`; ln++; line = ''; } line += ' ' + w; });
      b += `<text x="${x + 14}" y="${y + 214 + ln * 17}" font-size="13" class="sf-lab">${esc(line.trim())}</text>`;
    });
    const rows = Math.ceil(want.length / 3);
    return wrap(W, rows * (cellH + 20) + 10, o.aria || 'Specialised cells and their adaptations', gradDefs(id), b);
  }

  /* ---------- DNA ---------- */
  function dna(o = {}) {
    const lv = LV(o.level), W = 900, H = 420;
    const C = { A: '#e9776b', T: '#f2c14e', C: '#6aa9e8', G: '#62c08a' }, PAIR = { A: 'T', T: 'A', C: 'G', G: 'C' };
    const seq = 'ATGCCGTAGCATTGCA'.split('');
    let b = '', back = '', front = '';
    const x0 = 60, dx = 30, amp = 70, cy = 200;
    const yA = i => cy + Math.sin(i * 0.55) * amp, yB = i => cy - Math.sin(i * 0.55) * amp;
    seq.forEach((s, i) => { const x = x0 + i * dx, a = yA(i), c = yB(i), m = (a + c) / 2; b += `<path d="M${x} ${f(a)}V${f(m)}" stroke="${C[s]}" stroke-width="8"/><path d="M${x} ${f(m)}V${f(c)}" stroke="${C[PAIR[s]]}" stroke-width="8"/>` + (lv === 2 ? `<path d="M${x - 5} ${f(m)}h10" stroke="#fff" stroke-width="1.5" stroke-dasharray="2 2"/>` : ''); });
    let pa = '', pb = ''; for (let t = 0; t <= (seq.length - 1) * 10; t++) { const i = t / 10, x = x0 + i * dx; pa += (t ? 'L' : 'M') + f(x) + ' ' + f(yA(i)); pb += (t ? 'L' : 'M') + f(x) + ' ' + f(yB(i)); }
    back = `<path d="${pb}" fill="none" stroke="#5c6f8f" stroke-width="10" stroke-linecap="round"/>`; front = `<path d="${pa}" fill="none" stroke="#8aa3cc" stroke-width="10" stroke-linecap="round"/>`;
    b = back + b + front;
    for (let i = 0; i < seq.length; i++) { b += `<circle cx="${x0 + i * dx}" cy="${f(yA(i))}" r="5" fill="#f4e7c8"/>`; }
    const nx = 620, ny = 120;
    b += `<g><text x="${nx}" y="${ny - 40}" font-size="15" font-weight="700" class="sf-lab">One nucleotide</text><circle cx="${nx + 20}" cy="${ny}" r="20" fill="#f4e7c8" stroke="#9a8656" stroke-width="2"/><text x="${nx + 20}" y="${ny + 5}" text-anchor="middle" font-size="13" style="fill:#3a2f15">P</text><path d="M${nx + 40} ${ny}H${nx + 64}" stroke="#ccc" stroke-width="3"/><path d="M${nx + 88} ${ny - 26}l24 17 -9 28h-30l-9 -28z" fill="#8aa3cc" stroke="#4d6694" stroke-width="2"/><path d="M${nx + 112} ${ny}H${nx + 136}" stroke="#ccc" stroke-width="3"/><rect x="${nx + 136}" y="${ny - 18}" width="70" height="36" rx="6" fill="${C.A}"/><text x="${nx + 171}" y="${ny + 5}" text-anchor="middle" font-size="13" style="fill:#2a1a10">Base</text>`;
    b += `<text x="${nx + 20}" y="${ny + 44}" text-anchor="middle" font-size="12" class="sf-lab">phosphate</text><text x="${nx + 100}" y="${ny + 58}" text-anchor="middle" font-size="12" class="sf-lab">${lv === 2 ? 'deoxyribose' : 'sugar'}</text></g>`;
    const key = ['A', 'T', 'C', 'G'].map((k, i) => `<rect x="${nx}" y="${ny + 90 + i * 30}" width="22" height="22" rx="4" fill="${C[k]}"/><text x="${nx + 32}" y="${ny + 106 + i * 30}" font-size="14" class="sf-lab">${{ A: 'A adenine', T: 'T thymine', C: 'C cytosine', G: 'G guanine' }[k]}</text>`).join('');
    b += key + `<text x="${nx}" y="${ny + 222}" font-size="13" class="sf-lab">A pairs with T; C pairs with G</text>`;
    const labs = [{ x: x0 + 3 * dx, y: yA(3), t: 'Sugar–phosphate backbone', side: 'r', ly: 360 }, { x: x0 + 7 * dx, y: cy, t: lv === 2 ? 'Base pair (hydrogen bonds)' : 'Complementary base pair', side: 'l', ly: 380 }];
    return wrap(W, H, o.aria || 'DNA double helix with complementary base pairs and one nucleotide', '', b + `<text x="${x0}" y="30" font-size="14" class="sf-lab">Two strands twist into a double helix</text>` + labels(labs, { W, H, lx: 300, rx: 300, size: 14, top: 300 }));
  }

  /* ---------- nephron ---------- */
  function nephron(o = {}) {
    const lv = LV(o.level), W = 900, H = 520;
    const T = '#f2d39b', Td = '#b98d3e';
    let b = `<circle cx="170" cy="120" r="46" fill="#fbe7cf" stroke="${Td}" stroke-width="5"/><path d="M150 100c10 -20 30 -10 25 5s25 15 10 30s-30 5 -40 -5s-5 -25 5 -30z" fill="#e46b5f" stroke="#a8231c" stroke-width="2"/>`;
    b += `<path d="M90 70Q140 80 150 104" stroke="#e46b5f" stroke-width="9" fill="none"/><path d="M188 122Q240 70 300 60" stroke="#c4473c" stroke-width="7" fill="none"/>`;
    const tube = (d) => `<path d="${d}" fill="none" stroke="${Td}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${T}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`;
    b += tube('M210 140C260 150 250 200 300 190C350 180 330 130 380 140C420 150 410 200 400 230V430Q400 470 430 470Q460 470 460 430V230C460 190 500 160 540 170C590 182 560 230 610 225C640 222 650 190 660 160');
    b += `<path d="M680 60V480" stroke="${Td}" stroke-width="30"/><path d="M680 60V480" stroke="${T}" stroke-width="22"/>`;
    b += `<path d="M300 60C380 70 360 250 380 300Q390 470 430 490Q480 480 480 300C490 220 600 250 640 240" fill="none" stroke="#c4473c" stroke-width="4" stroke-dasharray="1 0" opacity=".85"/>`;
    const ar = (x1, y1, x2, y2, c) => { const a = Math.atan2(y2 - y1, x2 - x1); return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="2.6"/><path d="M${x2} ${y2}l${f(-10 * Math.cos(a - 0.45))} ${f(-10 * Math.sin(a - 0.45))}M${x2} ${y2}l${f(-10 * Math.cos(a + 0.45))} ${f(-10 * Math.sin(a + 0.45))}" stroke="${c}" stroke-width="2.6"/>`; };
    b += ar(680, 120, 680, 200, '#7a5a1a') + ar(680, 380, 680, 460, '#7a5a1a');
    const labs = [{ x: 150, y: 115, t: lv === 2 ? 'Glomerulus (ultrafiltration)' : 'Glomerulus (filtration)', side: 'l' }, { x: 128, y: 100, t: lv === 2 ? "Bowman's capsule" : 'Capsule', side: 'l', ly: 190 }, { x: 95, y: 72, t: lv === 2 ? 'Afferent arteriole' : 'Blood in', side: 'l', ly: 50 }, { x: 260, y: 66, t: lv === 2 ? 'Efferent arteriole' : 'Blood out', side: 'r', ly: 30 },
      { x: 300, y: 190, t: lv === 2 ? 'Proximal convoluted tubule (selective reabsorption)' : 'Tubule: glucose and useful substances reabsorbed', side: 'l', ly: 250 }, { x: 430, y: 470, t: 'Loop of Henle', side: 'l', ly: 470 }, { x: 600, y: 222, t: lv === 2 ? 'Distal convoluted tubule' : 'Tubule', side: 'r', ly: 250 }, { x: 680, y: 300, t: lv === 2 ? 'Collecting duct (water reabsorbed; ADH)' : 'Collecting duct: urine to the bladder', side: 'r', ly: 330 }, { x: 384, y: 300, t: lv === 2 ? 'Capillary network' : 'Blood capillary', side: 'l', ly: 380 }];
    labs.forEach(l => l.x += 140);
    return wrap(W + 140, H, o.aria || 'A nephron and its blood supply', '', `<g transform="translate(140 0)">${b}</g>` + labels(labs, { W: W + 140, H, lx: 250, rx: 860, size: 14, gap: 24 }));
  }

  /* ---------- synapse ---------- */
  function synapse(o = {}) {
    const lv = LV(o.level), W = 900, H = 460, id = 'sf' + (++uid), r = rnd(9);
    let b = `<path d="M330 10V90C220 110 200 230 250 300C300 360 420 360 470 300C520 230 500 110 400 90V10Z" fill="#fbe0d2" stroke="#c97f63" stroke-width="3"/>`;
    b += `<path d="M200 380C280 340 460 340 540 380V460H200Z" fill="#e7eefb" stroke="#6f8fd8" stroke-width="3"/>`;
    b += mito(300, 170, 48, 24, -20, id, lv === 2) + mito(420, 160, 44, 22, 25, id, lv === 2);
    const ves = [[300, 250], [340, 270], [380, 262], [420, 250], [360, 230], [320, 290], [400, 292], [440, 280], [360, 305]];
    ves.forEach(([x, y]) => { b += `<circle cx="${x}" cy="${y}" r="13" fill="#fff6d8" stroke="#c9a24a" stroke-width="2"/>`; for (let k = 0; k < 4; k++) b += `<circle cx="${f(x - 5 + r() * 10)}" cy="${f(y - 5 + r() * 10)}" r="2" fill="#7a3fb0"/>`; });
    b += `<path d="M350 330q10 14 20 0" fill="#fff6d8" stroke="#c9a24a" stroke-width="2"/>`;
    for (let k = 0; k < 14; k++) b += `<circle cx="${f(330 + r() * 80)}" cy="${f(340 + r() * 20)}" r="2.4" fill="#7a3fb0"/>`;
    [260, 310, 360, 410, 460].forEach(x => b += `<path d="M${x - 8} 372v-10h6v6h4v-6h6v10" fill="#3ecf8e" stroke="#1f7a4f"/>`);
    if (lv === 2) [230, 495].forEach(x => b += `<rect x="${x}" y="240" width="12" height="26" rx="3" fill="#f2a63a" stroke="#9c5f1a"/>`);
    b += `<path d="M560 100V300" stroke="#ffcf5a" stroke-width="3"/><path d="M553 288l7 12 7 -12" fill="none" stroke="#ffcf5a" stroke-width="3"/><text x="572" y="200" font-size="13" class="sf-lab">impulse</text>`;
    const labs = [{ x: 400, y: 60, t: lv === 2 ? 'Presynaptic neurone (synaptic knob)' : 'Axon ending of first neurone', side: 'r', ly: 40 }, { x: 300, y: 170, t: 'Mitochondrion', side: 'l' }, { x: 300, y: 250, t: 'Vesicle containing neurotransmitter', side: 'l' }, { x: 380, y: 352, t: 'Synaptic cleft (gap)', side: 'r', ly: 350 }, { x: 410, y: 368, t: 'Receptor', side: 'r', ly: 390 }, { x: 260, y: 420, t: lv === 2 ? 'Postsynaptic membrane' : 'Next neurone', side: 'l', ly: 420 }, { x: 345, y: 345, t: 'Neurotransmitter', side: 'l', ly: 340 }];
    if (lv === 2) labs.push({ x: 236, y: 252, t: 'Ca²⁺ channel', side: 'l', ly: 290 });
    return wrap(W, H, o.aria || 'Labelled synapse', gradDefs(id), b + labels(labs, { W, H, lx: 190, rx: 600, size: 14, gap: 26 }));
  }

  /* ---------- mitochondrion and chloroplast (A-level ultrastructure) ---------- */
  function mitochondrion(o = {}) {
    const W = 880, H = 360, cx = 430, cy = 180;
    let b = `<ellipse cx="${cx}" cy="${cy}" rx="250" ry="120" fill="#f9d2bf" stroke="#a5402e" stroke-width="4"/><ellipse cx="${cx}" cy="${cy}" rx="236" ry="106" fill="#fbe6da" stroke="#c46a4e" stroke-width="2"/>`;
    for (let i = 0; i < 9; i++) { const x = cx - 200 + i * 50, up = i % 2 === 0, e = 106 * Math.sqrt(Math.max(0, 1 - ((x - cx) / 236) ** 2)), y0 = up ? cy - e + 2 : cy + e - 2; b += `<path d="M${x - 10} ${y0}C${x - 12} ${up ? cy + 30 : cy - 30} ${x + 12} ${up ? cy + 30 : cy - 30} ${x + 10} ${y0}" fill="#f6b39a" stroke="#c46a4e" stroke-width="2"/>`; }
    b += `<path d="M${cx + 60} ${cy + 10}c10 -14 26 -4 20 8s14 14 2 22s-26 -2 -22 -14" fill="none" stroke="#5e3784" stroke-width="2.2"/>`;
    for (let i = 0; i < 14; i++) b += `<circle cx="${cx - 160 + (i * 37) % 330}" cy="${cy - 30 + (i * 23) % 70}" r="2.4" fill="#4b2c6b"/>`;
    const labs = [{ x: cx - 200, y: cy - 103, t: 'Outer membrane', side: 'l' }, { x: cx - 180, y: cy + 92, t: 'Inner membrane', side: 'l' }, { x: cx - 152, y: cy + 40, t: 'Crista (folded inner membrane)', side: 'l' }, { x: cx + 40, y: cy - 10, t: 'Matrix (Krebs cycle, link reaction)', side: 'r' }, { x: cx + 228, y: cy - 30, t: 'Intermembrane space', side: 'r' }, { x: cx + 75, y: cy + 15, t: 'Circular DNA', side: 'r' }, { x: cx + 120, y: cy + 20, t: '70S ribosomes', side: 'r' }];
    return wrap(W, H, o.aria || 'Ultrastructure of a mitochondrion', '', b + labels(labs, { W, H, lx: 160, rx: 700, size: 14 }));
  }
  function chloroplast(o = {}) {
    const W = 900, H = 380, cx = 440, cy = 190;
    let b = `<ellipse cx="${cx}" cy="${cy}" rx="260" ry="130" fill="#bfe39a" stroke="#2f6b23" stroke-width="4"/><ellipse cx="${cx}" cy="${cy}" rx="248" ry="118" fill="#d9f0bf" stroke="#4f8a32" stroke-width="2"/>`;
    const gr = [[cx - 160, cy - 30], [cx - 70, cy + 30], [cx + 20, cy - 40], [cx + 110, cy + 20], [cx + 180, cy - 20]];
    b += `<path d="M${gr[0][0]} ${gr[0][1]}L${gr[1][0]} ${gr[1][1]}L${gr[2][0]} ${gr[2][1]}L${gr[3][0]} ${gr[3][1]}L${gr[4][0]} ${gr[4][1]}" stroke="#3f8a2c" stroke-width="5" fill="none"/>`;
    gr.forEach(([x, y]) => { for (let k = 0; k < 6; k++) b += `<rect x="${x - 26}" y="${y - 24 + k * 8}" width="52" height="6" rx="3" fill="#2f7a26" stroke="#1d4f16"/>`; });
    b += `<ellipse cx="${cx + 60}" cy="${cy + 75}" rx="30" ry="16" fill="#f4f0d0" stroke="#b0a66a"/><circle cx="${cx - 120}" cy="${cy + 70}" r="7" fill="#f4e7a0" stroke="#b0a66a"/>`;
    b += `<path d="M${cx + 150} ${cy + 60}c10 -10 22 -2 16 8s12 12 0 18s-22 -4 -16 -12" fill="none" stroke="#5e3784" stroke-width="2"/>`;
    for (let i = 0; i < 12; i++) b += `<circle cx="${cx - 200 + (i * 41) % 400}" cy="${cy + 40 + (i * 17) % 40}" r="2.2" fill="#4b2c6b"/>`;
    const labs = [{ x: cx - 220, y: cy - 75, t: 'Outer membrane', side: 'l' }, { x: cx - 230, y: cy + 50, t: 'Inner membrane', side: 'l' }, { x: gr[0][0] - 20, y: gr[0][1] - 8, t: 'Granum (stack of thylakoids)', side: 'l' }, { x: gr[1][0] + 26, y: gr[1][1] + 2, t: 'Thylakoid membrane (light-dependent stage)', side: 'l', ly: cy + 110 }, { x: cx - 30, y: cy - 4, t: 'Intergranal lamella', side: 'r', ly: 60 }, { x: cx + 200, y: cy + 50, t: 'Stroma (Calvin cycle)', side: 'r' }, { x: cx + 60, y: cy + 75, t: 'Starch grain', side: 'r' }, { x: cx - 120, y: cy + 70, t: 'Lipid droplet', side: 'l' }, { x: cx + 160, y: cy + 65, t: 'Circular DNA and 70S ribosomes', side: 'r' }];
    return wrap(W, H, o.aria || 'Ultrastructure of a chloroplast', '', b + labels(labs, { W, H, lx: 160, rx: 715, size: 14 }));
  }


  /* ---------- chemistry: shell diagrams for bonding ---------- */
  const EL = { 1: ['H', '#e9eef2'], 3: ['Li', '#c9a6e8'], 6: ['C', '#9aa3ab'], 7: ['N', '#7fb2ff'], 8: ['O', '#ff8a7a'], 9: ['F', '#9fe08a'], 11: ['Na', '#c9a6e8'], 12: ['Mg', '#b5e08a'], 17: ['Cl', '#8fe08a'], 19: ['K', '#c9a6e8'], 20: ['Ca', '#b5e08a'] };
  /* Test-yourself groups: qg hides electrons and shows a dashed ring to tap; qt hides a text and shows a blank box. */
  const qg = (inner, x, y, r) => inner ? `<g class="sf-q">${inner}<circle class="sf-ring" cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/><circle class="sf-hit" cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/></g>` : '';
  const qt = (inner, x, y, w, h) => `<g class="sf-q"><rect class="sf-blank" x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="5"/>${inner}</g>`;
  const mark = (x, y, k, col) => k === 'x' ? `<path d="M${f(x - 4)} ${f(y - 4)}l8 8M${f(x + 4)} ${f(y - 4)}l-8 8" stroke="${col || '#ffcf5a'}" stroke-width="2.2"/>` : `<circle cx="${f(x)}" cy="${f(y)}" r="4.2" fill="${col || '#7fd0ff'}"/>`;
  function shellAtom(cx, cy, Z, o = {}) {
    const [sym, col] = EL[Z] || [SYM[Z], '#ccc'], e = Z - (o.charge || 0), cfg = shells(e), outerOnly = o.outerOnly;
    const rs = cfg.map((_, i) => 26 + i * 24); let s = '';
    const use = outerOnly ? [cfg.length - 1] : cfg.map((_, i) => i);
    use.forEach(i => { const rr = outerOnly ? 40 : rs[i]; s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${rr}" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/>`; });
    s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="17" fill="${col}" stroke="#000" stroke-opacity=".3"/><text x="${f(cx)}" y="${f(cy + 6)}" text-anchor="middle" font-size="16" font-weight="700" class="sf-in" style="fill:#1b1f22">${sym}</text>`;
    use.forEach(i => {
      const rr = outerOnly ? 40 : rs[i], n = cfg[i], gained = (i === cfg.length - 1 && o.gain) ? o.gain : 0, q = o.quiz && i === cfg.length - 1;
      let es = '';
      const per = [0, 0, 0, 0]; for (let k = 0; k < n; k++) per[k % 4]++;
      let gi = n - gained;
      [-90, 0, 90, 180].forEach((a, j) => { for (let k = 0; k < per[j]; k++) { const aa = (a + (per[j] === 2 ? (k ? 10 : -10) * 40 / rr : 0)) * Math.PI / 180, idx = [-90, 0, 90, 180].slice(0, j).reduce((t, _, q) => t + per[q], 0) + k; es += mark(cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr, idx >= gi ? (o.other || 'x') : (o.own || 'o')); } });
      s += q ? qg(es, cx, cy, rr) : es;
    });
    return { s, R: outerOnly ? 40 : rs[rs.length - 1] };
  }
  const bracket = (cx, cy, R, ch) => `<path d="M${f(cx - R - 8)} ${f(cy - R - 6)}h-8v${f(2 * R + 12)}h8M${f(cx + R + 8)} ${f(cy - R - 6)}h8v${f(2 * R + 12)}h-8" fill="none" stroke="currentColor" stroke-width="2"/>` + qt(`<text x="${f(cx + R + 20)}" y="${f(cy - R - 2)}" font-size="18" font-weight="700" class="sf-lab">${ch}</text>`, cx + R + 16, cy - R - 20, String(ch).length * 11 + 10, 24);
  function ionicBond(o = {}) {
    const M = o.metal || 11, N = o.nonmetal || 17, mv = { 11: 1, 19: 1, 3: 1, 12: 2, 20: 2 }[M] || 1, nv = { 17: 1, 9: 1, 8: 2 }[N] || 1;
    const W = 960, H = 330, cy = 150;
    const a = shellAtom(120, cy, M, { own: 'o' }), b = shellAtom(330, cy, N, { own: 'x' });
    let g = a.s + b.s;
    g += `<path d="M${f(120 + a.R + 6)} ${cy - a.R + 10}Q225 ${cy - a.R - 40} ${f(330 - b.R + 4)} ${cy - b.R + 6}" fill="none" stroke="#ffcf5a" stroke-width="2.4" stroke-dasharray="6 4"/><path d="M${f(330 - b.R + 4)} ${cy - b.R + 6}l-14 -2 6 -10z" fill="#ffcf5a"/>` + qt(`<text x="225" y="${cy - a.R - 34}" text-anchor="middle" font-size="14" class="sf-lab">${mv > 1 ? mv + ' electrons' : '1 electron'} transferred</text>`, 150, cy - a.R - 50, 150, 22);
    g += `<path d="M430 ${cy}h70" stroke="currentColor" stroke-width="3"/><path d="M500 ${cy}l-12 -7v14z" fill="currentColor"/>`;
    const c = shellAtom(610, cy, M, { charge: mv, own: 'o', quiz: true }), d = shellAtom(830, cy, N, { charge: -nv, own: 'x', gain: nv, other: 'o', quiz: true });
    g += c.s + bracket(610, cy, c.R, (mv > 1 ? mv : '') + '+') + d.s + bracket(830, cy, d.R, (nv > 1 ? nv : '') + '−');
    const nm = { 11: 'sodium', 12: 'magnesium', 3: 'lithium', 19: 'potassium', 20: 'calcium' }[M], nn = { 17: 'chlorine', 9: 'fluorine', 8: 'oxygen' }[N], ion = { 17: 'chloride', 9: 'fluoride', 8: 'oxide' }[N];
    g += `<text x="225" y="${H - 50}" text-anchor="middle" font-size="15" class="sf-lab">${nm} atom + ${nn} atom</text><text x="720" y="${H - 50}" text-anchor="middle" font-size="15" class="sf-lab">${nm} ion + ${ion} ion</text><text x="480" y="${H - 18}" text-anchor="middle" font-size="13" class="sf-lab">• and × show electrons from different atoms; both ions now have full outer shells</text>`;
    return wrap(W, H, o.aria || `Ionic bonding between ${nm} and ${nn}: electron transfer forms ions`, '', g);
  }
  function covalent(o = {}) {
    const MOL = { H2: [1, [1], [0]], Cl2: [17, [17], [3]], HCl: [17, [1], [3]], H2O: [8, [1, 1], [2]], NH3: [7, [1, 1, 1], [1]], CH4: [6, [1, 1, 1, 1], [0]], O2: [8, [8], [2], 2], CO2: [6, [8, 8], [0], 2] };
    const key = o.molecule || 'H2O', [Zc, nb, lp, order = 1] = MOL[key], W = 760, H = 380, cx = 380, cy = 185;
    const angs = { 1: [0], 2: nb.length === 2 && key !== 'H2O' ? [180, 0] : [215, 325], 3: [200, 340, 90], 4: [180, 0, 270, 90] }[nb.length];
    let g = '', d = 72;
    const own = (Z) => (Z === 1 ? 1 : shells(Z)[shells(Z).length - 1]);
    nb.forEach((Z, i) => { const a = angs[i] * Math.PI / 180, x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d; g += `<circle cx="${f(x)}" cy="${f(y)}" r="46" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/><circle cx="${f(x)}" cy="${f(y)}" r="17" fill="${EL[Z][1]}"/><text x="${f(x)}" y="${f(y + 6)}" text-anchor="middle" font-size="16" font-weight="700" class="sf-in" style="fill:#1b1f22">${EL[Z][0]}</text>`;
      const shared = order, mx = cx + Math.cos(a) * d * 0.5, my = cy + Math.sin(a) * d * 0.5; let bp = ''; for (let k = 0; k < shared; k++) { const off = (k - (shared - 1) / 2) * 14, px = -Math.sin(a), py = Math.cos(a); bp += mark(mx + px * (off - 5), my + py * (off - 5), 'o') + mark(mx + px * (off + 5), my + py * (off + 5), 'x'); } g += qg(bp, mx, my, 10 + shared * 5);
      const rest = own(Z) - shared; let nbp = ''; for (let k = 0; k < rest; k++) { const b = a + Math.PI + (k - (rest - 1) / 2) * 0.55 + Math.PI; nbp += mark(x + Math.cos(b) * 46, y + Math.sin(b) * 46, 'x'); } g += qg(nbp, x, y, 46);
    });
    g = `<circle cx="${cx}" cy="${cy}" r="46" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/><circle cx="${cx}" cy="${cy}" r="17" fill="${EL[Zc][1]}"/><text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="16" font-weight="700" class="sf-in" style="fill:#1b1f22">${EL[Zc][0]}</text>` + g;
    const used = nb.map(n => angs[nb.indexOf(n)]); const free = [270, 90, 180, 0, 135, 45].filter(a => angs.every(u => Math.abs(((a - u) % 360 + 540) % 360 - 180) > 50)).slice(0, lp[0]);
    free.forEach(a => { const r = a * Math.PI / 180, x = cx + Math.cos(r) * 46, y = cy + Math.sin(r) * 46, px = -Math.sin(r) * 6, py = Math.cos(r) * 6; g += qg(mark(x + px, y + py, 'o') + mark(x - px, y - py, 'o'), x, y, 13); });
    void used;
    const sub = key.replace(/(\d)/g, d => '₀₁₂₃₄'[d]);
    g += `<text x="${cx}" y="${H - 40}" text-anchor="middle" font-size="16" class="sf-lab">${sub}: ${order > 1 ? 'double covalent bonds' : 'single covalent bonds'} (shared pairs of electrons in the overlap)</text><text x="${cx}" y="${H - 16}" text-anchor="middle" font-size="13" class="sf-lab">Outer shells only. • and × show electrons from different atoms.</text>`;
    return wrap(W, H, o.aria || `Dot and cross diagram of ${key}`, '', g);
  }
  function lattice(o = {}) {
    const W = 820, H = 420, id = 'sf' + (++uid);
    const defs = `<radialGradient id="${id}-na" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e3c9ff"/><stop offset="1" stop-color="#7d4fa5"/></radialGradient><radialGradient id="${id}-cl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#c8f5b5"/><stop offset="1" stop-color="#3f8f34"/></radialGradient>`;
    const P = (i, j, k) => [250 + i * 90 - k * 42, 300 - j * 90 + k * -36 + k * 70 * 0.0 - k * 0 + k * 0, k];
    const pts = []; for (let k = 2; k >= 0; k--) for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const x = 250 + i * 90 + k * 48, y = 330 - j * 90 - k * 40; pts.push([x, y, (i + j + k) % 2]); }
    let g = '';
    for (let k = 0; k < 3; k++) for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const x = 250 + i * 90 + k * 48, y = 330 - j * 90 - k * 40; if (i < 2) g += `<path d="M${x} ${y}h90" stroke="currentColor" opacity=".35"/>`; if (j < 2) g += `<path d="M${x} ${y}v-90" stroke="currentColor" opacity=".35"/>`; if (k < 2) g += `<path d="M${x} ${y}l48 -40" stroke="currentColor" opacity=".35"/>`; }
    pts.sort((a, b) => b[2] - a[2] || 0);
    pts.forEach(([x, y, t]) => g += t ? `<circle cx="${x}" cy="${y}" r="11" fill="url(#${id}-na)"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="12" font-weight="700" class="sf-in" style="fill:#fff">+</text>` : `<circle cx="${x}" cy="${y}" r="19" fill="url(#${id}-cl)"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="700" class="sf-in" style="fill:#fff">−</text>`);
    void P;
    g += `<g transform="translate(620 120)"><circle r="11" fill="url(#${id}-na)"/><text x="26" y="5" font-size="15" class="sf-lab">Na⁺ sodium ion</text><circle cy="50" r="19" fill="url(#${id}-cl)"/><text x="34" y="55" font-size="15" class="sf-lab">Cl⁻ chloride ion</text><text x="-10" y="110" font-size="13" class="sf-lab">Strong electrostatic</text><text x="-10" y="128" font-size="13" class="sf-lab">forces act in all</text><text x="-10" y="146" font-size="13" class="sf-lab">directions</text></g>`;
    return wrap(W, H, o.aria || 'Giant ionic lattice of sodium chloride', defs, g + `<text x="40" y="${H - 14}" font-size="13" class="sf-lab">A regular lattice of oppositely charged ions repeats in three dimensions.</text>`);
  }
  function metallic(o = {}) {
    const W = 760, H = 340, r = rnd(17);
    let g = '';
    for (let j = 0; j < 4; j++) for (let i = 0; i < 8; i++) { const x = 90 + i * 72 + (j % 2) * 36, y = 70 + j * 62; g += `<circle cx="${x}" cy="${y}" r="24" fill="#c9d1d8" stroke="#6b7680"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="16" font-weight="700" class="sf-in" style="fill:#1b1f22">+</text>`; }
    for (let k = 0; k < 46; k++) { const x = 60 + r() * 640, y = 50 + r() * 240; g += `<circle cx="${f(x)}" cy="${f(y)}" r="5" fill="#2f7fd6" stroke="#9fd0ff"/>`; }
    g += `<text x="60" y="${H - 30}" font-size="14" class="sf-lab">Positive metal ions in regular layers, surrounded by a sea of delocalised electrons (blue).</text><text x="60" y="${H - 10}" font-size="13" class="sf-lab">The delocalised electrons can move, so metals conduct; layers can slide, so metals are malleable.</text>`;
    return wrap(W, H, o.aria || 'Metallic bonding: positive ions and delocalised electrons', '', g);
  }
  function giantCovalent(o = {}) {
    const W = 900, H = 400;
    let g = '<text x="200" y="28" text-anchor="middle" font-size="16" font-weight="700" class="sf-lab">Diamond</text><text x="660" y="28" text-anchor="middle" font-size="16" font-weight="700" class="sf-lab">Graphite</text>';
    const D = [];
    for (let x = 0; x <= 6; x++) for (let y = 0; y <= 6; y++) for (let z = 0; z <= 6; z++) {
      const fcc = (a, b, c) => a % 2 === 0 && b % 2 === 0 && c % 2 === 0 && (a + b + c) % 4 === 0;
      if (fcc(x, y, z) || (x > 0 && y > 0 && z > 0 && fcc(x - 1, y - 1, z - 1))) D.push([x, y, z]);
    }
    const PJ = ([x, y, z]) => [95 + x * 30 + z * 13, 330 - y * 30 - z * 11];
    const bonds = [];
    D.forEach((a, i) => D.forEach((b, k) => { if (k > i && (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2 === 3) bonds.push([a, b]); }));
    bonds.sort((p, q) => (q[0][2] + q[1][2]) - (p[0][2] + p[1][2]));
    const shade = z => Math.round(150 - z * 12);
    const items = bonds.map(([a, b]) => [Math.max(a[2], b[2]) + 0.5, () => { const [x1, y1] = PJ(a), [x2, y2] = PJ(b), c = shade((a[2] + b[2]) / 2); return `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="rgb(${c + 40},${c + 48},${c + 56})" stroke-width="3"/>`; }]).concat(D.map(a => [a[2], () => { const [x, y] = PJ(a), c = shade(a[2]); return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(8 - a[2] * 0.35)}" fill="rgb(${c + 10},${c + 16},${c + 22})" stroke="#2a2f33"/>`; }]));
    items.sort((p, q) => q[0] - p[0]).forEach(it => g += it[1]());
    g += `<text x="200" y="${H - 40}" text-anchor="middle" font-size="13" class="sf-lab">Each carbon forms 4 strong covalent bonds in a 3-D network:</text><text x="200" y="${H - 22}" text-anchor="middle" font-size="13" class="sf-lab">very hard, very high melting point, no free electrons</text>`;
    for (let L = 0; L < 3; L++) { const oy = 90 + L * 90, ox = 520 + L * 12; for (let i = 0; i < 4; i++) { const hx = ox + i * 60, pts = [0, 1, 2, 3, 4, 5].map(k => [hx + 30 * Math.cos(k * Math.PI / 3), oy + 16 * Math.sin(k * Math.PI / 3)]); g += `<path d="M${pts.map(p => f(p[0]) + ' ' + f(p[1])).join('L')}Z" fill="none" stroke="#9aa3ab" stroke-width="2.6"/>` + pts.map(p => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="5" fill="#4a5258"/>`).join(''); } if (L < 2) g += `<path d="M${ox + 260} ${oy + 22}v46" stroke="#7fb2ff" stroke-dasharray="4 4"/>`; }
    g += `<text x="${805}" y="${185}" font-size="12" class="sf-lab">weak forces</text><text x="${805}" y="${200}" font-size="12" class="sf-lab">between layers</text>`;
    g += `<text x="660" y="${H - 40}" text-anchor="middle" font-size="13" class="sf-lab">Layers of hexagons; each carbon bonds to 3 others.</text><text x="660" y="${H - 22}" text-anchor="middle" font-size="13" class="sf-lab">One delocalised electron per atom, so graphite conducts</text>`;
    return wrap(W, H, o.aria || 'Structures of diamond and graphite', '', g);
  }
  function atomModels(o = {}) {
    const W = 960, H = 360, r = rnd(4);
    let g = '';
    g += `<circle cx="160" cy="170" r="100" fill="#f7c8d8" opacity=".55" stroke="#c9879f" stroke-width="2"/>`;
    for (let k = 0; k < 14; k++) { const a = r() * 6.28, rr = Math.sqrt(r()) * 85; g += `<circle cx="${f(160 + Math.cos(a) * rr)}" cy="${f(170 + Math.sin(a) * rr)}" r="7" fill="#2f7fd6"/>`; }
    g += `<text x="160" y="40" text-anchor="middle" font-size="16" font-weight="700" class="sf-lab">Plum pudding model</text><text x="160" y="300" text-anchor="middle" font-size="13" class="sf-lab">A ball of positive charge</text><text x="160" y="318" text-anchor="middle" font-size="13" class="sf-lab">with electrons embedded in it</text>`;
    g += `<circle cx="480" cy="170" r="100" fill="none" stroke="currentColor" stroke-dasharray="3 5" opacity=".4"/><circle cx="480" cy="170" r="8" fill="#c8372a"/>`;
    for (let k = 0; k < 6; k++) { const a = k * 1.05 + 0.3; g += `<circle cx="${f(480 + Math.cos(a) * 88)}" cy="${f(170 + Math.sin(a) * 70)}" r="6" fill="#2f7fd6"/>`; }
    g += `<text x="480" y="40" text-anchor="middle" font-size="16" font-weight="700" class="sf-lab">Nuclear model (Rutherford)</text><text x="480" y="300" text-anchor="middle" font-size="13" class="sf-lab">Tiny, dense positive nucleus;</text><text x="480" y="318" text-anchor="middle" font-size="13" class="sf-lab">mostly empty space</text>`;
    [40, 70, 100].forEach(rr => g += `<circle cx="800" cy="170" r="${rr}" fill="none" stroke="currentColor" opacity=".5"/>`);
    g += `<circle cx="800" cy="170" r="10" fill="#c8372a"/>` + [[40, -90], [40, 90], [70, 0], [70, 180], [100, -45]].map(([rr, a]) => `<circle cx="${f(800 + Math.cos(a * Math.PI / 180) * rr)}" cy="${f(170 + Math.sin(a * Math.PI / 180) * rr)}" r="6" fill="#2f7fd6"/>`).join('');
    g += `<text x="800" y="40" text-anchor="middle" font-size="16" font-weight="700" class="sf-lab">Bohr model</text><text x="800" y="300" text-anchor="middle" font-size="13" class="sf-lab">Electrons orbit at fixed</text><text x="800" y="318" text-anchor="middle" font-size="13" class="sf-lab">distances (energy levels)</text>`;
    g += `<path d="M275 170h80M595 170h80" stroke="currentColor" stroke-width="2.4"/><path d="M355 170l-10 -6v12zM675 170l-10 -6v12z" fill="currentColor"/><text x="315" y="160" text-anchor="middle" font-size="11" class="sf-lab">alpha</text><text x="315" y="190" text-anchor="middle" font-size="11" class="sf-lab">scattering</text><text x="635" y="160" text-anchor="middle" font-size="11" class="sf-lab">Bohr's</text><text x="635" y="190" text-anchor="middle" font-size="11" class="sf-lab">calculations</text>`;
    return wrap(W, H, o.aria || 'How the model of the atom developed', '', g);
  }
  function isotopes(o = {}) {
    const Z = o.Z || 6, As = o.masses || [12, 14];
    const parts = As.map(A => atom({ Z, A, level: o.level || 'gcse', title: (NAME[Z][0].toUpperCase() + NAME[Z].slice(1)) + '-' + A }));
    return `<div class="sf-pair">${parts.join('')}</div>`;
  }
  function states(o = {}) {
    const W = 960, H = 330, r = rnd(8);
    let g = '';
    const box = (x, t, d) => { g += `<rect x="${x}" y="40" width="260" height="200" rx="8" fill="#eaf4fb" opacity=".08" stroke="currentColor" opacity=".7"/><text x="${x + 130}" y="28" text-anchor="middle" font-size="16" font-weight="700" class="sf-lab">${t}</text>`; d.forEach((line, i) => g += `<text x="${x + 130}" y="${268 + i * 18}" text-anchor="middle" font-size="13" class="sf-lab">${line}</text>`); };
    box(20, 'Solid', ['Particles touch in a regular pattern', 'and vibrate about fixed positions']); box(350, 'Liquid', ['Particles touch but are random', 'and move past each other']); box(680, 'Gas', ['Particles far apart, random,', 'moving quickly in all directions']);
    const p = (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="13" fill="#2f7fd6" stroke="#9fd0ff" stroke-width="1.5"/>`;
    for (let j = 0; j < 5; j++) for (let i = 0; i < 8; i++) g += p(50 + i * 28, 214 - j * 28);
    const used = []; let n = 0; while (n < 30 && used.length < 400) { const x = 380 + r() * 200, y = 228 - r() * 110; if (used.every(([a, b]) => Math.hypot(a - x, b - y) > 26.5)) { used.push([x, y]); g += p(x, y); n++; } else used.push([-99, -99]); }
    for (let k = 0; k < 8; k++) { const x = 710 + r() * 200, y = 60 + r() * 160, a = r() * 6.28; g += p(x, y) + `<path d="M${f(x + Math.cos(a) * 16)} ${f(y + Math.sin(a) * 16)}l${f(Math.cos(a) * 22)} ${f(Math.sin(a) * 22)}" stroke="#ffcf5a" stroke-width="2"/>`; }
    return wrap(W, H, o.aria || 'Particle arrangement in solids, liquids and gases', '', g);
  }



  /* ---------- flower (half section) ---------- */
  function flower(o = {}) {
    const W = 880, H = 460, cx = 440;
    let g = `<path d="M${cx} 450V330" stroke="#4f8a32" stroke-width="12"/><path d="M${cx} 400q-60 -10 -90 -50q50 0 90 30z" fill="#6aa84f"/>`;
    g += `<path d="M${cx - 70} 330q-40 -10 -60 20q50 10 70 -8zM${cx + 70} 330q40 -10 60 20q-50 10 -70 -8z" fill="#7cbf5a" stroke="#4f8a32"/>`;
    g += `<path d="M${cx - 60} 320C${cx - 220} 300 ${cx - 230} 120 ${cx - 150} 80C${cx - 110} 140 ${cx - 80} 240 ${cx - 40} 300Z" fill="#f5a3c7" stroke="#c45a8a" stroke-width="2"/><path d="M${cx + 60} 320C${cx + 220} 300 ${cx + 230} 120 ${cx + 150} 80C${cx + 110} 140 ${cx + 80} 240 ${cx + 40} 300Z" fill="#f5a3c7" stroke="#c45a8a" stroke-width="2"/>`;
    g += `<path d="M${cx - 70} 330Q${cx} 300 ${cx + 70} 330Q${cx} 350 ${cx - 70} 330Z" fill="#8fc46a"/>`;
    g += `<path d="M${cx - 34} 316C${cx - 40} 270 ${cx + 40} 270 ${cx + 34} 316Z" fill="#b6e08f" stroke="#4f8a32" stroke-width="2"/>${[-14, 0, 14].map(d => `<ellipse cx="${cx + d}" cy="300" rx="6" ry="8" fill="#f4f0d0" stroke="#9a8656"/>`).join('')}`;
    g += `<path d="M${cx} 280V150" stroke="#8fc46a" stroke-width="8"/><ellipse cx="${cx}" cy="144" rx="18" ry="10" fill="#cfe89a" stroke="#4f8a32"/>`;
    [[-1, 1], [1, 1]].forEach(([s]) => { g += `<path d="M${cx + s * 28} 300Q${cx + s * 40} 220 ${cx + s * 60} 170" stroke="#e3d6a0" stroke-width="3" fill="none"/><ellipse cx="${cx + s * 62}" cy="160" rx="10" ry="20" fill="#f2c14e" stroke="#b08a1e" transform="rotate(${s * 20} ${cx + s * 62} 160)"/>`; });
    [[cx - 75, 150], [cx - 80, 166], [cx + 78, 152]].forEach(([x, y]) => g += `<circle cx="${x}" cy="${y}" r="3" fill="#ffd84a"/>`);
    const labs = [{ x: cx - 160, y: 140, t: 'Petal (attracts insects)', side: 'l' }, { x: cx - 100, y: 336, t: 'Sepal (protects the bud)', side: 'l' }, { x: cx - 62, y: 160, t: 'Anther (makes pollen)', side: 'l', ly: 200 }, { x: cx - 40, y: 225, t: 'Filament', side: 'l', ly: 250 }, { x: cx - 12, y: 300, t: 'Ovule (contains the egg cell)', side: 'l', ly: 300 },
      { x: cx + 16, y: 144, t: 'Stigma (pollen lands here)', side: 'r' }, { x: cx + 4, y: 210, t: 'Style', side: 'r' }, { x: cx + 30, y: 306, t: 'Ovary', side: 'r' }, { x: cx + 160, y: 140, t: 'Petal', side: 'r', ly: 100 }, { x: cx, y: 430, t: 'Stem', side: 'r', ly: 420 }];
    g += `<text x="${cx}" y="30" text-anchor="middle" font-size="14" class="sf-lab">Male parts: stamen (anther + filament) · Female parts: carpel (stigma + style + ovary)</text>`;
    return wrap(W, H, o.aria || 'Half section through a flower', '', g + labels(labs, { W, H, lx: 220, rx: 640, size: 14, top: 60 }));
  }
  /* ---------- human digestive system ---------- */
  function digestive(o = {}) {
    const W = 880, H = 600, cx = 440;
    let g = `<path d="M${cx - 120} 40Q${cx} 0 ${cx + 120} 40L${cx + 170} 560H${cx - 170}Z" fill="#f4dfd2" opacity=".18"/>`;
    g += `<path d="M${cx} 40V190" stroke="#e8a99a" stroke-width="16" stroke-linecap="round"/>`;
    g += `<path d="M${cx - 40} 230C${cx - 120} 230 ${cx - 140} 160 ${cx - 70} 140C${cx - 40} 135 ${cx - 10} 150 ${cx - 2} 185Z" fill="#a8763e" stroke="#6e4a22" stroke-width="2"/>`;
    g += `<path d="M${cx} 185C${cx + 30} 165 ${cx + 110} 170 ${cx + 110} 215C${cx + 110} 260 ${cx + 40} 270 ${cx + 10} 250C${cx - 10} 240 ${cx - 6} 205 ${cx} 185Z" fill="#f0a39a" stroke="#b55a50" stroke-width="2"/>`;
    g += `<path d="M${cx + 20} 268q-30 10 -60 0" stroke="#e1b84a" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    g += `<path d="M${cx - 120} 480V300Q${cx - 120} 280 ${cx - 100} 280H${cx + 100}Q${cx + 120} 280 ${cx + 120} 300V480" fill="none" stroke="#d6866f" stroke-width="26"/><path d="M${cx - 120} 480Q${cx - 120} 500 ${cx - 100} 505" fill="none" stroke="#d6866f" stroke-width="26"/>`;
    let sm = `M${cx - 80} 320`; for (let i = 0; i < 6; i++) sm += `q80 ${i % 2 ? -14 : 14} 160 0q0 18 -160 22`;
    g += `<path d="${sm}" fill="none" stroke="#f3b8a6" stroke-width="14" stroke-linejoin="round"/>`;
    g += `<path d="M${cx - 100} 505H${cx}V560" stroke="#d6866f" stroke-width="18" fill="none"/>`;
    g += `<path d="M${cx - 160} 70C${cx - 160} 50 ${cx - 140} 40 ${cx - 120} 50" stroke="#f0c0b0" stroke-width="8" fill="none"/><ellipse cx="${cx - 150}" cy="95" rx="16" ry="11" fill="#e6c99a"/>`;
    const labs = [{ x: cx - 150, y: 95, t: 'Salivary glands', side: 'l', ly: 70 }, { x: cx - 6, y: 110, t: 'Oesophagus (gullet)', side: 'r', ly: 90 }, { x: cx - 90, y: 180, t: 'Liver (makes bile)', side: 'l' }, { x: cx + 90, y: 210, t: 'Stomach (acid and protease)', side: 'r' }, { x: cx - 30, y: 270, t: 'Pancreas (makes enzymes)', side: 'l', ly: 260 }, { x: cx + 40, y: 360, t: 'Small intestine (digestion and absorption)', side: 'r', ly: 360 }, { x: cx + 120, y: 440, t: 'Large intestine (absorbs water)', side: 'r', ly: 450 }, { x: cx, y: 545, t: 'Rectum and anus', side: 'r', ly: 540 }, { x: cx - 120, y: 230, t: 'Gall bladder (stores bile)', side: 'l', ly: 220 }];
    g += `<ellipse cx="${cx - 115}" cy="222" rx="11" ry="8" fill="#6aa84f" stroke="#2f5d20"/>`;
    return wrap(W, H, o.aria || 'The human digestive system', '', g + labels(labs, { W, H, lx: 240, rx: 630, size: 14 }));
  }
  /* ---------- breathing system ---------- */
  function lungs(o = {}) {
    const W = 880, H = 520, cx = 440;
    let g = `<path d="M${cx} 30V150" stroke="#cfd8de" stroke-width="22"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${cx - 11} ${40 + i * 18}h22" stroke="#9aa6ae" stroke-width="3"/>`).join('')}`;
    g += `<path d="M${cx} 150L${cx - 60} 200M${cx} 150L${cx + 60} 200" stroke="#cfd8de" stroke-width="16" stroke-linecap="round"/>`;
    const lung = s => `<path d="M${cx + s * 30} 120C${cx + s * 150} 110 ${cx + s * 190} 260 ${cx + s * 180} 400C${cx + s * 120} 420 ${cx + s * 40} 410 ${cx + s * 30} 380Z" fill="#f2b8b0" stroke="#c46a5e" stroke-width="2.4"/>`;
    g += lung(-1) + lung(1);
    const br = (x, y, a, l, d) => { if (d > 4) return `<circle cx="${f(x)}" cy="${f(y)}" r="4" fill="#e6847a"/>`; const x2 = x + Math.cos(a) * l, y2 = y + Math.sin(a) * l; return `<path d="M${f(x)} ${f(y)}L${f(x2)} ${f(y2)}" stroke="#e8d2cc" stroke-width="${8 - d * 1.5}" stroke-linecap="round"/>` + br(x2, y2, a - 0.45, l * 0.72, d + 1) + br(x2, y2, a + 0.45, l * 0.72, d + 1); };
    g += br(cx - 60, 200, Math.PI * 0.62, 50, 0) + br(cx + 60, 200, Math.PI * 0.38, 50, 0);
    for (let i = 0; i < 6; i++) { const y = 150 + i * 46; g += `<path d="M${cx - 210} ${y + 20}Q${cx - 120} ${y - 10} ${cx - 40} ${y}M${cx + 210} ${y + 20}Q${cx + 120} ${y - 10} ${cx + 40} ${y}" fill="none" stroke="#e8e2d0" stroke-width="10" opacity=".55"/>`; }
    g += `<path d="M${cx - 220} 440Q${cx} 380 ${cx + 220} 440" fill="none" stroke="#c46a5e" stroke-width="10"/>`;
    const labs = [{ x: cx, y: 70, t: 'Trachea (windpipe)', side: 'r', ly: 60 }, { x: cx, y: 70, t: 'Rings of cartilage', side: 'l', ly: 60 }, { x: cx + 40, y: 172, t: 'Bronchus', side: 'r', ly: 130 }, { x: cx + 110, y: 260, t: 'Bronchioles', side: 'r', ly: 220 }, { x: cx - 150, y: 340, t: 'Alveoli (air sacs) at the ends', side: 'l', ly: 330 }, { x: cx + 190, y: 330, t: 'Lung', side: 'r', ly: 300 }, { x: cx - 205, y: 196, t: 'Ribs', side: 'l', ly: 190 }, { x: cx - 205, y: 230, t: 'Intercostal muscles', side: 'l', ly: 240 }, { x: cx + 120, y: 420, t: 'Diaphragm', side: 'r', ly: 430 }];
    return wrap(W, H, o.aria || 'The human breathing system', '', g + labels(labs, { W, H, lx: 190, rx: 690, size: 14 }));
  }
  /* ---------- structure of the Earth ---------- */
  function earth(o = {}) {
    const W = 880, H = 460, cx = 330, cy = 230, ck = 'sfe' + (++uid);
    let g = `<defs><clipPath id="${ck}"><path d="M${cx} ${cy}L${cx + 260} ${cy - 260}V${cy + 260}Z"/></clipPath></defs>`;
    g += `<circle cx="${cx}" cy="${cy}" r="200" fill="#4f8fd8"/><path d="M${cx - 140} ${cy - 80}q40 -40 90 -10t40 60q-40 40 -90 10z M${cx - 60} ${cy + 60}q50 -20 80 20q-20 50 -60 40z" fill="#6aa84f"/>`;
    g += `<g clip-path="url(#${ck})"><circle cx="${cx}" cy="${cy}" r="200" fill="#8a6a42"/><circle cx="${cx}" cy="${cy}" r="194" fill="#e07a3f"/><circle cx="${cx}" cy="${cy}" r="110" fill="#f2b63a"/><circle cx="${cx}" cy="${cy}" r="50" fill="#fff0b0"/></g>`;
    const labs = [{ x: cx + 180, y: cy - 60, t: 'Crust (thin, solid rock)', side: 'r' }, { x: cx + 150, y: cy + 20, t: 'Mantle (hot rock that flows slowly)', side: 'r' }, { x: cx + 80, y: cy + 10, t: 'Outer core (liquid iron and nickel)', side: 'r', ly: cy + 90 }, { x: cx + 25, y: cy + 4, t: 'Inner core (solid iron and nickel)', side: 'r', ly: cy + 160 }];
    return wrap(W, H, o.aria || 'Layers of the Earth', '', g + labels(labs, { W, H, lx: 100, rx: 580, size: 14 }));
  }

  const REG = { animalCell, plantCell, bacterialCell, atom, neurone, heart, leaf, alveolus, eye, specialised, dna, nephron, synapse, mitochondrion, chloroplast, ionicBond, covalent, lattice, metallic, giantCovalent, atomModels, isotopes, states, flower, digestive, lungs, earth };
  const svg = (name, o) => (REG[name] ? REG[name](o || {}) : '');
  const fig = (name, o = {}) => `<figure class="fig sf-fig">${svg(name, o)}${o.caption ? `<figcaption>${o.caption}</figcaption>` : ''}</figure>`;
  const api = { svg, fig, register: (n, fn) => { REG[n] = fn; }, _labels: labels, _wrap: wrap, _LV: LV, _f: f, _esc: esc, _rnd: rnd, _grad: gradDefs, _mito: mito, _chloro: chloro, _nucleus: nucleus };
  root.SciFig = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
