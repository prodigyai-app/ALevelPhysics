/* Shared: more realistic science figures (physics and chemistry explanations).
   Registers extra figures on window.SciFig, so load it after science-figures.js.
   Each figure returns an SVG string; labels use the same layout engine as the core figures. */
(function (root) {
  'use strict';
  const S = root.SciFig;
  if (!S) return;
  const labels = S._labels, wrap = S._wrap, f = S._f, esc = S._esc;
  let uid = 0;
  const id = p => 'sg' + p + (++uid);
  /* helpers */
  const T = (x, y, s, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-size="${o.size || 15}" text-anchor="${o.a || 'middle'}" class="sf-lab"${o.w ? ` font-weight="${o.w}"` : ''}${o.fill ? ` style="fill:${o.fill}"` : ''}>${esc(s)}</text>`;
  const arrow = (x1, y1, x2, y2, col = 'currentColor', w = 3, head = 12) => {
    const a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - Math.cos(a) * head, hy = y2 - Math.sin(a) * head;
    const p = (s) => `${f(hx + Math.cos(a + s * Math.PI / 2) * head * 0.5)} ${f(hy + Math.sin(a + s * Math.PI / 2) * head * 0.5)}`;
    return `<path d="M${f(x1)} ${f(y1)}L${f(hx)} ${f(hy)}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="M${f(x2)} ${f(y2)}L${p(1)}L${p(-1)}Z" fill="${col}"/>`;
  };
  const dbl = (x1, y1, x2, y2, col = 'currentColor', w = 2) => arrow((x1 + x2) / 2, (y1 + y2) / 2, x2, y2, col, w, 10) + arrow((x1 + x2) / 2, (y1 + y2) / 2, x1, y1, col, w, 10);
  const wavy = (x1, y1, x2, y2, col, w = 3) => { // heat-flow arrow drawn as a wavy line
    const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1), n = Math.max(2, Math.round(L / 22)); let d = `M${f(x1)} ${f(y1)}`;
    for (let i = 1; i <= n; i++) { const t = i / n, m = (i - 0.5) / n, s = i % 2 ? 7 : -7; d += `Q${f(x1 + Math.cos(a) * L * m - Math.sin(a) * s)} ${f(y1 + Math.sin(a) * L * m + Math.cos(a) * s)} ${f(x1 + Math.cos(a) * L * t)} ${f(y1 + Math.sin(a) * L * t)}`; }
    const hx = x2 + Math.cos(a) * 12, hy = y2 + Math.sin(a) * 12;
    return `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="M${f(hx)} ${f(hy)}L${f(x2 - Math.sin(a) * 7)} ${f(y2 + Math.cos(a) * 7)}L${f(x2 + Math.sin(a) * 7)} ${f(y2 - Math.cos(a) * 7)}Z" fill="${col}"/>`;
  };
  const HOT = '#ef5b4c', COLD = '#5aa9f0';

  /* ---------- house insulation cutaway ---------- */
  function house(o = {}) {
    const W = 920, H = 600, x0 = 300, x1 = 640, gy = 520, ey = 250, py = 120, mid = (x0 + x1) / 2, k = id('h');
    let g = `<defs><pattern id="${k}b" width="28" height="14" patternUnits="userSpaceOnUse"><rect width="28" height="14" fill="#b65a3c"/><path d="M0 13.5H28M14 0V7M0 7H28M0 7V14M28 7V14" stroke="#e7c3a8" stroke-width="1.4"/></pattern>
      <pattern id="${k}w" width="16" height="12" patternUnits="userSpaceOnUse"><rect width="16" height="12" fill="#f3dc8a"/><path d="M0 6q4 -5 8 0t8 0" stroke="#d7b75a" stroke-width="1.6" fill="none"/></pattern>
      <pattern id="${k}f" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#f4f1e6"/><circle cx="3" cy="3" r="1.6" fill="#cfc8b0"/><circle cx="8" cy="7" r="1.3" fill="#cfc8b0"/></pattern>
      <linearGradient id="${k}r" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7a3b33"/><stop offset="1" stop-color="#5a2a24"/></linearGradient></defs>`;
    g += `<rect x="40" y="${gy}" width="${W - 80}" height="40" rx="6" fill="#4d7a3a"/><rect x="40" y="${gy + 26}" width="${W - 80}" height="14" fill="#6b4a2f"/>`;
    // interior (warm)
    g += `<rect x="${x0}" y="${ey}" width="${x1 - x0}" height="${gy - ey}" fill="#f7c9a3" opacity=".55"/>`;
    // walls: outer brick leaf | cavity foam | inner leaf
    [[x0, 1], [x1 - 46, -1]].forEach(([x]) => { g += `<rect x="${x}" y="${ey}" width="16" height="${gy - ey}" fill="url(#${k}b)"/><rect x="${x + 16}" y="${ey}" width="14" height="${gy - ey}" fill="url(#${k}f)"/><rect x="${x + 30}" y="${ey}" width="16" height="${gy - ey}" fill="url(#${k}b)"/>`; });
    // floors
    g += `<rect x="${x0}" y="${ey - 8}" width="${x1 - x0}" height="10" fill="#8b6a4a"/><rect x="${x0 + 46}" y="${(ey + gy) / 2}" width="${x1 - x0 - 92}" height="10" fill="#8b6a4a"/>`;
    // loft insulation on the loft floor
    g += `<rect x="${x0 + 4}" y="${ey - 30}" width="${x1 - x0 - 8}" height="22" fill="url(#${k}w)" stroke="#c9a94a"/>`;
    // roof
    g += `<path d="M${x0 - 40} ${ey}L${mid} ${py}L${x1 + 40} ${ey}" fill="none" stroke="url(#${k}r)" stroke-width="16" stroke-linejoin="round"/><path d="M${x0 + 8} ${ey - 8}L${mid} ${py + 16}L${x1 - 8} ${ey - 8}Z" fill="#2c3448" opacity=".35"/>`;
    g += `<rect x="${mid + 60}" y="${py + 10}" width="30" height="60" fill="#9a5a45"/>`;
    // double-glazed windows (two panes with a gas gap)
    const win = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#cfe8f7" stroke="#e9eef3" stroke-width="5"/><rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" fill="none" stroke="#7fb7d8" stroke-width="2"/><path d="M${x + w / 2} ${y}V${y + h}" stroke="#e9eef3" stroke-width="4"/>`;
    g += win(400, ey + 30, 110, 80) + win(370, (ey + gy) / 2 + 30, 100, 64);
    // door with draught excluder
    g += `<rect x="${x1 - 150}" y="${gy - 120}" width="64" height="120" fill="#5a7da8" stroke="#3b5a80" stroke-width="3"/><circle cx="${x1 - 98}" cy="${gy - 60}" r="4" fill="#e8c35a"/><rect x="${x1 - 152}" y="${gy - 10}" width="68" height="10" fill="#222"/>${Array.from({ length: 14 }, (_, i) => `<path d="M${x1 - 150 + i * 5} ${gy - 10}v10" stroke="#555" stroke-width="1.5"/>`).join('')}`;
    // radiator
    g += `<rect x="${x0 + 80}" y="${gy - 42}" width="84" height="34" rx="4" fill="#f1f1f1" stroke="#bbb"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${x0 + 88 + i * 13} ${gy - 38}v26" stroke="#ccc" stroke-width="3"/>`).join('')}`;
    // energy-transfer arrows (thin where insulated)
    g += wavy(mid - 60, ey - 40, mid - 60, py + 40, HOT, 2) + wavy(x0 + 10, gy - 140, x0 - 70, gy - 140, HOT, 2);
    g += wavy(x1 - 10, ey + 70, x1 + 70, ey + 70, HOT, 2);
    g += T(470, 40, o.title || 'Warm house, cold day: how insulation reduces energy transfer', { size: 17, w: 700 });
    g += T(553, ey + 60, 'Inside', { size: 15, w: 700, fill: '#ffd0b0' }) + T(553, ey + 80, '20 °C', { size: 15, w: 700, fill: '#ffd0b0' }) + T(W - 110, 110, 'Outside 5 °C', { size: 15, w: 700, fill: COLD });
    const labs = [
      { x: x0 + 60, y: ey - 20, t: 'Loft insulation: mineral wool traps air', side: 'l' },
      { x: x0 + 23, y: ey + 60, t: 'Cavity wall insulation: foam fills the gap', side: 'l' },
      { x: x0 + 8, y: ey + 150, t: 'Thick brick walls', side: 'l' },
      { x: x0 + 90, y: gy - 25, t: 'Radiator (energy source)', side: 'l' },
      { x: 506, y: ey + 50, t: 'Double glazing: gas gap between two panes', side: 'r', ly: ey + 20 },
      { x: x1 - 118, y: gy - 5, t: 'Draught excluder stops warm air escaping', side: 'r' },
      { x: x1 + 40, y: ey + 70, t: 'Energy transferred to the cold surroundings', side: 'r' }];
    return wrap(W, H, o.aria || 'Cutaway house showing loft insulation, cavity wall insulation, double glazing and a draught excluder', '', g + labels(labs, { W, H, lx: 250, rx: 690, size: 15, top: 70 }));
  }

  /* ---------- UK three-pin plug ---------- */
  function plug(o = {}) {
    const W = 860, H = 520, cx = 430;
    let g = `<rect x="${cx - 160}" y="60" width="320" height="380" rx="34" fill="#f2f2ee" stroke="#c9c9c2" stroke-width="3"/><rect x="${cx - 140}" y="80" width="280" height="340" rx="24" fill="#e2e2dc"/>`;
    // pins (brass) + terminals
    const pin = (x, y, w, h) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="3" fill="#d8b24a" stroke="#a2802a" stroke-width="2"/><circle cx="${x}" cy="${y}" r="6" fill="#b48f33"/>`;
    const E = [cx, 150], N = [cx - 85, 300], L = [cx + 85, 300];
    g += pin(E[0], E[1], 26, 54) + pin(N[0], N[1], 50, 22) + pin(L[0], L[1], 50, 22);
    // fuse next to live pin
    g += `<rect x="${cx + 40}" y="200" width="30" height="78" rx="8" fill="#f6f1e4" stroke="#b9a77a" stroke-width="2"/><rect x="${cx + 40}" y="200" width="30" height="12" rx="5" fill="#c9c9c9"/><rect x="${cx + 40}" y="266" width="30" height="12" rx="5" fill="#c9c9c9"/><text x="${cx + 55}" y="244" text-anchor="middle" font-size="12" font-weight="700" style="fill:#b03a2e">13A</text>`;
    // cable, outer sheath and cable grip
    g += `<rect x="${cx - 34}" y="400" width="68" height="120" rx="10" fill="#3a3a3a"/><rect x="${cx - 52}" y="392" width="104" height="22" rx="6" fill="#8a8a8a" stroke="#555"/><circle cx="${cx - 40}" cy="403" r="5" fill="#ccc"/><circle cx="${cx + 40}" cy="403" r="5" fill="#ccc"/>`;
    // wires: insulation colour + copper ends
    const wire = (col, pts, stripe) => `<path d="${pts}" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>${stripe ? `<path d="${pts}" fill="none" stroke="${stripe}" stroke-width="16" stroke-dasharray="10 10" stroke-linejoin="round"/>` : ''}`;
    g += wire('#3b9b3f', `M${cx} 392C${cx} 330 ${cx} 260 ${E[0]} ${E[1] + 34}`, '#f2d23a');
    g += wire('#2f6fd6', `M${cx - 14} 392C${cx - 40} 360 ${N[0] + 10} 340 ${N[0]} ${N[1] + 16}`);
    g += wire('#8a5a2b', `M${cx + 14} 392C${cx + 40} 360 ${cx + 55} 330 ${cx + 55} 284`);
    g += `<path d="M${cx + 55} 196V${L[1] - 16}" stroke="#c8792a" stroke-width="5"/><path d="M${cx + 55} 196C${cx + 70} 180 ${L[0]} 200 ${L[0]} ${L[1] - 12}" stroke="#c8792a" stroke-width="5" fill="none"/>`;
    [[E[0], E[1] + 30], [N[0], N[1] + 12], [cx + 55, 284]].forEach(([x, y]) => g += `<circle cx="${x}" cy="${y}" r="5" fill="#c8792a"/>`);
    const labs = [
      { x: E[0] + 12, y: E[1] - 10, t: 'Earth pin', side: 'r', ly: 110 },
      { x: cx + 8, y: 330, t: 'Earth wire (green and yellow): safety wire, 0 V', side: 'r', ly: 160 },
      { x: cx + 62, y: 240, t: 'Fuse: melts if the current is too large', side: 'r', ly: 220 },
      { x: L[0] + 20, y: L[1], t: 'Live pin', side: 'r', ly: 290 },
      { x: cx + 40, y: 370, t: 'Live wire (brown): about 230 V', side: 'r', ly: 350 },
      { x: N[0] - 20, y: N[1], t: 'Neutral pin', side: 'l', ly: 300 },
      { x: cx - 30, y: 375, t: 'Neutral wire (blue): close to 0 V', side: 'l', ly: 360 },
      { x: cx - 48, y: 403, t: 'Cable grip holds the cable', side: 'l', ly: 420 },
      { x: cx - 150, y: 120, t: 'Plastic case: an insulator', side: 'l', ly: 140 },
      { x: cx - 34, y: 480, t: 'Outer insulation', side: 'l', ly: 480 }];
    return wrap(W, H, o.aria || 'Inside a UK three-pin plug: live, neutral and earth wires, fuse and cable grip', '', labels(labs, { W, H, lx: 250, rx: 610, size: 15 }) + g);
  }

  /* ---------- the National Grid ---------- */
  function grid(o = {}) {
    const W = 980, H = 420, gy = 330;
    let g = `<rect x="0" y="${gy}" width="${W}" height="16" rx="4" fill="#4d7a3a"/>`;
    // power station
    g += `<rect x="30" y="${gy - 110}" width="130" height="110" fill="#8c95a3"/><rect x="50" y="${gy - 190}" width="30" height="80" fill="#9aa3b0"/><rect x="100" y="${gy - 160}" width="44" height="50" rx="6" fill="#a7b0bc"/>`;
    g += `<path d="M65 ${gy - 200}q10 -20 30 -14q14 -26 40 -10" stroke="#c9d3dc" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>`;
    // transformer boxes
    const tx = (x, up) => `<rect x="${x}" y="${gy - 70}" width="66" height="70" rx="6" fill="#6f7f5a" stroke="#4a573c" stroke-width="2"/><path d="M${x + 14} ${gy - 52}h38M${x + 14} ${gy - 40}h38M${x + 14} ${gy - 28}h38" stroke="#c9d39a" stroke-width="3"/>${arrow(x + 33, up ? gy - 8 : gy - 62, x + 33, up ? gy - 62 : gy - 8, '#ffd84a', 3, 12)}`;
    g += tx(200, true) + tx(700, false);
    // pylons
    const pylon = (x) => `<path d="M${x - 26} ${gy}L${x - 8} ${gy - 170}L${x + 8} ${gy - 170}L${x + 26} ${gy}M${x - 20} ${gy - 40}L${x + 20} ${gy - 40}M${x - 14} ${gy - 90}L${x + 14} ${gy - 90}M${x - 40} ${gy - 140}H${x + 40}M${x - 30} ${gy - 165}H${x + 30}M${x - 26} ${gy}L${x + 20} ${gy - 40}L${x - 14} ${gy - 90}L${x + 8} ${gy - 170}M${x + 26} ${gy}L${x - 20} ${gy - 40}L${x + 14} ${gy - 90}L${x - 8} ${gy - 170}" stroke="#9aa6b2" stroke-width="3" fill="none"/>`;
    [340, 480, 620].forEach(x => g += pylon(x));
    g += `<path d="M266 ${gy - 60}Q300 ${gy - 150} 300 ${gy - 140}Q410 ${gy - 110} 440 ${gy - 140}Q550 ${gy - 110} 580 ${gy - 140}Q690 ${gy - 110} 700 ${gy - 60}" stroke="#d0d6dc" stroke-width="2.5" fill="none"/>`;
    // houses
    [800, 880].forEach((x, i) => g += `<rect x="${x}" y="${gy - 60}" width="60" height="60" fill="#d9c6a5"/><path d="M${x - 8} ${gy - 58}L${x + 30} ${gy - 92}L${x + 68} ${gy - 58}Z" fill="#8b3d34"/><rect x="${x + 22}" y="${gy - 30}" width="16" height="30" fill="#5a7da8"/><rect x="${x + 8}" y="${gy - 50}" width="14" height="12" fill="#ffe08a"/>`);
    g += `<path d="M766 ${gy - 50}H800" stroke="#d0d6dc" stroke-width="2.5"/>`;
    // stage values
    const v = (x, t1, t2) => T(x, gy + 40, t1, { size: 15, w: 700 }) + T(x, gy + 60, t2, { size: 13 });
    g += v(95, 'Power station', 'about 25 kV') + v(233, 'Step-up transformer', 'p.d. up, current down') + v(480, 'Transmission cables', 'about 400 kV, small current') + v(733, 'Step-down transformer', 'p.d. down') + v(870, 'Homes', '230 V');
    g += T(480, 40, 'High p.d. and low current in the cables means less energy is wasted heating the wires', { size: 15 });
    return wrap(W, H, o.aria || 'The National Grid: power station, step-up transformer, transmission cables, step-down transformer and homes', '', g);
  }

  /* ---------- transformer ---------- */
  function transformer(o = {}) {
    const W = 980, H = 440, np = o.np || 6, ns = o.ns || 12;
    let g = `<rect x="260" y="90" width="340" height="260" rx="8" fill="#8f9aa6"/>`;
    for (let i = 0; i < 9; i++) g += `<path d="M262 ${96 + i * 28}H598" stroke="#7a8592" stroke-width="1"/>`;
    g += `<rect x="320" y="150" width="220" height="140" rx="4" fill="var(--panel,#121a33)"/>`;
    const coil = (x, n, col) => { let s = ''; const h = 200 / n; for (let i = 0; i < n; i++) { const y = 120 + i * h; s += `<ellipse cx="${x}" cy="${f(y + h / 2)}" rx="44" ry="${f(h / 2 - 1)}" fill="none" stroke="${col}" stroke-width="5"/>`; } return s; };
    g += coil(290, np, '#d9822b') + coil(570, ns, '#c8792a');
    g += `<path d="M246 125H150M246 315H150" stroke="#d9822b" stroke-width="4"/><path d="M614 125H710M614 315H710" stroke="#c8792a" stroke-width="4"/>`;
    g += `<circle cx="130" cy="220" r="34" fill="none" stroke="currentColor" stroke-width="3"/><path d="M110 220q10 -22 20 0t20 0" stroke="currentColor" stroke-width="3" fill="none"/><path d="M130 186V125H150M130 254V315H150" stroke="currentColor" stroke-width="3" fill="none"/>`;
    g += `<rect x="712" y="190" width="40" height="60" fill="none" stroke="currentColor" stroke-width="3"/><path d="M710 125H732V190M710 315H732V250" stroke="currentColor" stroke-width="3" fill="none"/>`;
    g += T(430, 40, `${ns > np ? 'Step-up' : 'Step-down'} transformer:  Vp / Vs = Np / Ns`, { size: 17, w: 700 });
    const labs = [{ x: 268, y: 220, t: `Primary coil (${np} turns)`, side: 'l', ly: 380 }, { x: 108, y: 210, t: 'Alternating p.d. in', side: 'l', ly: 90 },
      { x: 430, y: 100, t: 'Iron core: carries the changing field', side: 'r', ly: 70 }, { x: 600, y: 200, t: `Secondary coil (${ns} turns)`, side: 'r', ly: 390 }, { x: 750, y: 220, t: 'Output to the load', side: 'r', ly: 220 }];
    return wrap(W, H, o.aria || 'Transformer: primary and secondary coils wound on an iron core', '', g + labels(labs, { W, H, lx: 120, rx: 770, size: 15 }));
  }

  /* ---------- penetration of alpha, beta and gamma ---------- */
  function penetration(o = {}) {
    const W = 900, H = 420, ys = [130, 220, 310], k = id('p');
    let g = `<defs><linearGradient id="${k}" x1="0" x2="1"><stop offset="0" stop-color="#6c7682"/><stop offset="1" stop-color="#9aa4b0"/></linearGradient></defs>`;
    g += `<rect x="50" y="100" width="90" height="240" rx="10" fill="#4a5363"/><circle cx="120" cy="220" r="16" fill="#f2c94c"/><circle cx="120" cy="220" r="5" fill="#4a5363"/>` + T(95, 370, 'Radioactive source', { size: 14 });
    // barriers
    g += `<rect x="330" y="80" width="6" height="290" fill="#f4f1e6" stroke="#cfc8b0"/>` + T(333, 70, 'Paper', { size: 15, w: 700 });
    g += `<rect x="520" y="80" width="18" height="290" fill="#c7ced6" stroke="#9aa4b0"/>` + T(529, 70, 'Aluminium (a few mm)', { size: 15, w: 700 });
    g += `<rect x="700" y="80" width="56" height="290" fill="url(#${k})" stroke="#555"/>` + T(728, 70, 'Lead (several cm)', { size: 15, w: 700 });
    const beam = (y, x2, col, name, dash) => `<path d="M140 ${y}H${x2}" stroke="${col}" stroke-width="5" ${dash ? 'stroke-dasharray="10 8"' : ''}/>` + T(160, y - 12, name, { size: 16, w: 700, a: 'start', fill: col });
    g += beam(ys[0], 328, '#ef5b4c', 'α alpha') + `<path d="M326 ${ys[0] - 10}l8 10 -8 10" stroke="#ef5b4c" stroke-width="3" fill="none"/>`;
    g += beam(ys[1], 518, '#3fb27f', 'β beta');
    g += beam(ys[2], 700, '#9b7bf2', 'γ gamma') + `<path d="M756 ${ys[2]}H860" stroke="#9b7bf2" stroke-width="2" stroke-dasharray="8 8"/>` + T(808, ys[2] - 12, 'reduced', { size: 13, fill: '#9b7bf2' });
    g += T(450, 405, 'Alpha is the most ionising and the least penetrating; gamma is the most penetrating', { size: 14 });
    return wrap(W, H, o.aria || 'Alpha is stopped by paper, beta by a few millimetres of aluminium, gamma is reduced by thick lead', '', g);
  }

  /* ---------- transverse and longitudinal waves ---------- */
  function waves(o = {}) {
    const W = 920, H = 500, A = 50, lam = 220, y1 = 140, x0 = 120;
    let d = `M${x0} ${y1}`; for (let x = 0; x <= 660; x += 5) d += `L${f(x0 + x)} ${f(y1 - A * Math.sin(2 * Math.PI * x / lam))}`;
    let g = T(450, 40, 'Transverse wave (for example, light or a wave on a rope)', { size: 16, w: 700 });
    g += `<path d="M${x0} ${y1}H${x0 + 660}" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 6" opacity=".6"/><path d="${d}" stroke="#4fb3e8" stroke-width="4" fill="none"/>`;
    g += dbl(x0 + lam / 4, y1 - A - 22, x0 + lam * 5 / 4, y1 - A - 22) + T(x0 + lam * 3 / 4, y1 - A - 30, 'wavelength λ', { size: 14 });
    g += `<path d="M${x0 - 40} ${y1 - A}H${x0 + lam / 4}" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 5" opacity=".6"/>` + dbl(x0 - 30, y1, x0 - 30, y1 - A) + T(x0 - 38, y1 - A / 2 + 5, 'amplitude', { size: 14, a: 'end' });
    g += T(x0 + lam / 4, y1 - A - 4 + 26, 'crest', { size: 13 }) + T(x0 + lam * 3 / 4, y1 + A + 22, 'trough', { size: 13 });
    g += arrow(800, y1 - 30, 860, y1 - 30, '#ffd84a') + T(830, y1 - 42, 'energy', { size: 13 }) + dbl(830, y1 + 4, 830, y1 + 50, '#ef8b5b') + T(830, y1 + 68, 'vibration', { size: 13 });
    // longitudinal: slinky coils
    const y2 = 360;
    g += T(450, 250, 'Longitudinal wave (for example, sound or a pushed slinky)', { size: 16, w: 700 });
    const xs = []; for (let u = 0; u <= 660; u += 16) xs.push(x0 + u + 10 * Math.sin(2 * Math.PI * u / lam));
    xs.forEach(xx => g += `<ellipse cx="${f(xx)}" cy="${y2}" rx="5" ry="42" fill="none" stroke="#e0a64a" stroke-width="3"/>`);
    g += T(x0 + lam / 2, y2 + 70, 'compression', { size: 13 }) + T(x0 + lam, y2 + 70, 'rarefaction', { size: 13 });
    g += dbl(x0 + lam / 2, y2 - 58, x0 + 1.5 * lam, y2 - 58) + T(x0 + lam, y2 - 66, 'wavelength λ', { size: 14 });
    g += arrow(800, y2 - 30, 860, y2 - 30, '#ffd84a') + T(830, y2 - 42, 'energy', { size: 13 }) + dbl(800, y2 + 30, 860, y2 + 30, '#ef8b5b') + T(830, y2 + 52, 'vibration', { size: 13 });
    return wrap(W, H, o.aria || 'Transverse wave with wavelength and amplitude; longitudinal wave with compressions and rarefactions', '', g);
  }

  /* ---------- electromagnetic spectrum ---------- */
  function emSpectrum(o = {}) {
    const W = 980, H = 430, bands = [['Radio waves', '#7f8fa6', 'TV and radio'], ['Microwaves', '#8a8fd6', 'Satellites, cooking'], ['Infrared', '#d9604a', 'Heaters, thermal cameras'], ['Visible', null, 'Fibre optics, seeing'], ['Ultraviolet', '#8e5bd6', 'Energy-efficient lamps, tanning'], ['X-rays', '#5d8fb8', 'Medical images'], ['Gamma rays', '#3f9b77', 'Sterilising, treating cancer']];
    const x0 = 40, bw = 128, y0 = 150, k = id('e');
    let g = `<defs><linearGradient id="${k}" x1="0" x2="1"><stop offset="0" stop-color="#e53935"/><stop offset=".2" stop-color="#fb8c00"/><stop offset=".4" stop-color="#fdd835"/><stop offset=".6" stop-color="#43a047"/><stop offset=".8" stop-color="#1e88e5"/><stop offset="1" stop-color="#8e24aa"/></linearGradient></defs>`;
    let d = `M${x0} 90`, ph = 0; for (let x = 0; x <= bw * 7; x += 1) { const lamx = 90 * Math.pow(0.04 / 0.9, x / (bw * 7)) + 4; ph += 2 * Math.PI / lamx; d += `L${f(x0 + x)} ${f(90 - 24 * Math.sin(ph))}`; }
    g += `<path d="${d}" stroke="#4fb3e8" stroke-width="2.5" fill="none"/>`;
    bands.forEach(([n, c, u], i) => { const x = x0 + i * bw; g += `<rect x="${x}" y="${y0}" width="${bw - 4}" height="70" rx="6" fill="${c || `url(#${k})`}"/>` + T(x + bw / 2 - 2, y0 + 41, n, { size: 15, w: 700, fill: '#fff' }) + T(x + bw / 2 - 2, y0 + 100, u.split(', ')[0] + (u.includes(', ') ? ',' : ''), { size: 13 }) + (u.includes(', ') ? T(x + bw / 2 - 2, y0 + 118, u.split(', ')[1], { size: 13 }) : ''); });
    g += arrow(x0 + bw * 7 - 4, 330, x0, 330, 'currentColor', 2.5) + T(x0 + bw * 3.5, 320, 'Wavelength increases', { size: 15 });
    g += arrow(x0, 375, x0 + bw * 7 - 4, 375, 'currentColor', 2.5) + T(x0 + bw * 3.5, 365, 'Frequency and energy increase (more hazardous)', { size: 15 });
    g += T(x0 + bw * 3.5, 30, 'All electromagnetic waves are transverse and travel at the same speed in a vacuum', { size: 15 });
    g += T(x0 + bw * 3.5, 415, 'about 1 km  ←  wavelength  →  about 10⁻¹⁵ m', { size: 13 });
    return wrap(W, H, o.aria || 'The electromagnetic spectrum from radio waves to gamma rays with uses', '', g);
  }

  /* ---------- ray through a glass block ---------- */
  function glassBlock(o = {}) {
    const W = 880, H = 460, bx = 300, by = 140, bw = 300, bh = 180, i = (o.angle || 40) * Math.PI / 180, n = 1.5, r = Math.asin(Math.sin(i) / n);
    const px = bx + 90, py = by, L = 150, ex = px + Math.tan(r) * bh, ey = by + bh;
    let g = `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" fill="#bfe3f2" opacity=".55" stroke="#8cc7de" stroke-width="2"/>`;
    g += `<path d="M${px} ${by - 110}V${by + 50}M${ex} ${ey - 50}V${ey + 110}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="7 6" opacity=".7"/>`;
    const sx = px - Math.sin(i) * L, sy = py - Math.cos(i) * L;
    g += `<path d="M${f(sx)} ${f(sy)}L${px} ${py}L${f(ex)} ${ey}L${f(ex + Math.sin(i) * L)} ${f(ey + Math.cos(i) * L)}" stroke="#ff5a4f" stroke-width="3.5" fill="none"/>`;
    g += arrow(sx + (px - sx) * 0.4, sy + (py - sy) * 0.4, sx + (px - sx) * 0.6, sy + (py - sy) * 0.6, '#ff5a4f', 0, 14) + arrow(px + (ex - px) * 0.45, py + bh * 0.45, px + (ex - px) * 0.6, py + bh * 0.6, '#ff5a4f', 0, 14);
    g += `<path d="M${px} ${py}L${f(px - Math.sin(i) * 90)} ${f(py - Math.cos(i) * 90)}" stroke="none"/><path d="M${px} ${py - 50}A50 50 0 0 0 ${f(px - Math.sin(i) * 50)} ${f(py - Math.cos(i) * 50)}" stroke="#ffd84a" stroke-width="2.5" fill="none"/><path d="M${px} ${py + 60}A60 60 0 0 0 ${f(px + Math.sin(r) * 60)} ${f(py + Math.cos(r) * 60)}" stroke="#ffd84a" stroke-width="2.5" fill="none"/>`;
    g += `<path d="M${px} ${py}L${f(px + Math.sin(i) * 120)} ${f(py - Math.cos(i) * 120)}" stroke="#ff5a4f" stroke-width="1.5" opacity=".45"/>`;
    g += T(px - 20, py - 60, 'i', { size: 16, w: 700, fill: '#e0b020' }) + T(px + 14, py + 82, 'r', { size: 16, w: 700, fill: '#e0b020' });
    const labs = [{ x: sx + 20, y: sy + 16, t: 'Incident ray', side: 'l', ly: sy }, { x: px, y: by - 90, t: 'Normal (at 90° to the surface)', side: 'l', ly: 70 },
      { x: px + 30, y: py + 40, t: 'Refracted ray bends towards the normal', side: 'r', ly: 150 }, { x: ex + Math.sin(i) * 100, y: ey + Math.cos(i) * 100, t: 'Emergent ray: parallel to the incident ray', side: 'r', ly: 380 },
      { x: px + Math.sin(i) * 100, y: py - Math.cos(i) * 100, t: 'Weak reflected ray', side: 'r', ly: 70 }, { x: bx + 20, y: by + bh - 20, t: 'Glass block', side: 'l', ly: 300 }];
    return wrap(W, H, o.aria || 'A ray of light refracting through a rectangular glass block', '', g + labels(labs, { W, H, lx: 230, rx: 650, size: 15 }));
  }

  /* ---------- convex and concave lenses ---------- */
  function lenses(o = {}) {
    const W = 960, H = 400, cy = 210, F = 120;
    const panel = (x, convex) => {
      let s = `<path d="M${x - 200} ${cy}H${x + 200}" stroke="currentColor" stroke-width="1.2" stroke-dasharray="6 6" opacity=".7"/>`;
      s += convex ? `<path d="M${x} ${cy - 110}Q${x + 34} ${cy} ${x} ${cy + 110}Q${x - 34} ${cy} ${x} ${cy - 110}Z" fill="#bfe3f2" opacity=".75" stroke="#8cc7de" stroke-width="2"/>`
        : `<path d="M${x - 18} ${cy - 110}H${x + 18}Q${x + 2} ${cy} ${x + 18} ${cy + 110}H${x - 18}Q${x - 2} ${cy} ${x - 18} ${cy - 110}Z" fill="#bfe3f2" opacity=".75" stroke="#8cc7de" stroke-width="2"/>`;
      [-70, -35, 0, 35, 70].forEach(h => {
        s += `<path d="M${x - 190} ${cy + h}H${x}" stroke="#ff5a4f" stroke-width="2.5"/>` + arrow(x - 140, cy + h, x - 110, cy + h, '#ff5a4f', 0, 11);
        if (convex) { const ex = x + 190, ey = cy + h + (-h / F) * 190; s += `<path d="M${x} ${cy + h}L${f(ex)} ${f(ey)}" stroke="#ff5a4f" stroke-width="2.5"/>`; }
        else { const ex = x + 110, ey = cy + h + (h / F) * 110; s += `<path d="M${x} ${cy + h}L${f(ex)} ${f(ey)}" stroke="#ff5a4f" stroke-width="2.5"/>`; if (h) s += `<path d="M${x} ${cy + h}L${x - F} ${cy}" stroke="#ff5a4f" stroke-width="1.5" stroke-dasharray="5 5" opacity=".7"/>`; }
      });
      const fx = convex ? x + F : x - F;
      s += `<circle cx="${fx}" cy="${cy}" r="6" fill="#ffd84a"/>` + T(fx, cy + 30, 'F', { size: 16, w: 700 }) + dbl(x, cy + 140, fx, cy + 140) + T((x + fx) / 2, cy + 162, 'focal length', { size: 13 });
      s += T(x, 50, convex ? 'Convex (converging) lens' : 'Concave (diverging) lens', { size: 17, w: 700 }) + T(x, 74, convex ? 'Parallel rays meet at the principal focus' : 'Rays spread out as if from the principal focus', { size: 14 });
      return s;
    };
    return wrap(W, H, o.aria || 'Ray diagrams for a convex lens and a concave lens', '', panel(250, true) + panel(720, false));
  }

  /* ---------- magnetic fields: bar magnet and solenoid ---------- */
  function magField(o = {}) {
    const W = 980, H = 420, cy = 220;
    const loops = (cx, half) => { let s = ''; [40, 80, 125, 175].forEach((h, i) => { const sp = half + 30 + i * 22;
      s += `<path d="M${cx - half} ${cy - 6}C${cx - sp} ${cy - h * 1.2} ${cx + sp} ${cy - h * 1.2} ${cx + half} ${cy - 6}" fill="none" stroke="#7fb2ff" stroke-width="2"/><path d="M${cx - half} ${cy + 6}C${cx - sp} ${cy + h * 1.2} ${cx + sp} ${cy + h * 1.2} ${cx + half} ${cy + 6}" fill="none" stroke="#7fb2ff" stroke-width="2"/>`;
      s += arrow(cx - 3, cy - h * 0.9 - 2, cx - 4 + 10, cy - h * 0.9 - 2, '#7fb2ff', 0, 10) + arrow(cx - 3, cy + h * 0.9 + 2, cx - 4 + 10, cy + h * 0.9 + 2, '#7fb2ff', 0, 10); });
      s += `<path d="M${cx - half - 120} ${cy}H${cx - half}M${cx + half} ${cy}H${cx + half + 120}" stroke="#7fb2ff" stroke-width="2"/>` + arrow(cx + half + 80, cy, cx + half + 60, cy, '#7fb2ff', 0, 10) + arrow(cx - half - 60, cy, cx - half - 80, cy, '#7fb2ff', 0, 10);
      return s; };
    // bar magnet: field from N (right) to S (left) outside => arrows point left-to-right? Use N on left
    let g = '';
    const mag = (cx) => `<rect x="${cx - 90}" y="${cy - 20}" width="90" height="40" fill="#e0453a"/><rect x="${cx}" y="${cy - 20}" width="90" height="40" fill="#3f6fd6"/>` + T(cx - 45, cy + 6, 'N', { size: 20, w: 700, fill: '#fff' }) + T(cx + 45, cy + 6, 'S', { size: 20, w: 700, fill: '#fff' });
    // field lines leave N (left) and enter S (right): arrows point left → right along the top/bottom loops
    g += `<g>${loops(250, 90)}</g>` + mag(250) + T(250, 40, 'Bar magnet', { size: 17, w: 700 }) + T(250, 400, 'Field lines go from N to S; closest lines = strongest field', { size: 14 });
    // solenoid
    const sx = 730; let coil = '';
    for (let i = 0; i < 9; i++) { const x = sx - 80 + i * 20; coil += `<ellipse cx="${x}" cy="${cy}" rx="8" ry="34" fill="none" stroke="#c8792a" stroke-width="4"/>`; }
    g += `<g>${loops(sx, 90)}</g>` + coil + `<path d="M${sx - 80} ${cy - 22}H${sx + 80}M${sx - 80} ${cy}H${sx + 80}M${sx - 80} ${cy + 22}H${sx + 80}" stroke="#7fb2ff" stroke-width="2"/>`;
    g += arrow(sx + 14, cy, sx - 10, cy, '#7fb2ff', 0, 11) + T(sx - 108, cy + 58, 'N', { size: 20, w: 700, fill: '#e0453a' }) + T(sx + 108, cy + 58, 'S', { size: 20, w: 700, fill: '#3f6fd6' });
    g += T(sx, 40, 'Solenoid (coil carrying a current)', { size: 17, w: 700 }) + T(sx, 400, 'Strong, uniform field inside; outside it looks like a bar magnet', { size: 14 });
    return wrap(W, H, o.aria || 'Magnetic field patterns of a bar magnet and of a solenoid', '', g);
  }

  /* ---------- stopping distances ---------- */
  function stopping(o = {}) {
    const W = 980, H = 380, x0 = 140, k = 7.6; // px per metre
    const rows = [['30 mph', 9, 14], ['50 mph', 15, 38], ['70 mph', 21, 75]];
    const car = (x, y) => `<rect x="${x - 54}" y="${y - 18}" width="54" height="20" rx="6" fill="#d94a3d"/><path d="M${x - 46} ${y - 18}l8 -12h22l10 12z" fill="#d94a3d"/><path d="M${x - 42} ${y - 19}l6 -9h8v9zM${x - 25} ${y - 19}v-9h7l7 9z" fill="#cfe8f7"/><circle cx="${x - 42}" cy="${y + 3}" r="6" fill="#222"/><circle cx="${x - 12}" cy="${y + 3}" r="6" fill="#222"/>`;
    let g = T(W / 2, 34, 'Stopping distance = thinking distance + braking distance (Highway Code values, dry road)', { size: 15, w: 700 });
    rows.forEach(([s, th, br], i) => { const y = 110 + i * 82;
      g += `<rect x="${x0}" y="${y}" width="${W - x0 - 30}" height="34" fill="#4b5563" opacity=".35"/>` + T(x0 - 14, y + 23, s, { size: 16, w: 700, a: 'end' });
      g += `<rect x="${x0}" y="${y + 6}" width="${f(th * k)}" height="22" fill="#f2b84b"/><rect x="${f(x0 + th * k)}" y="${y + 6}" width="${f(br * k)}" height="22" fill="#e0453a"/>`;
      g += T(x0 + th * k / 2, y + 22, th + ' m', { size: 13, w: 700, fill: '#2b2b2b' }) + T(x0 + th * k + br * k / 2, y + 22, br + ' m', { size: 13, w: 700, fill: '#fff' });
      g += car(x0 + (th + br) * k + 58, y + 26) + T(x0 + (th + br) * k + 66, y + 26, `${th + br} m`, { size: 14, w: 700, a: 'start' }); });
    g += `<rect x="${x0}" y="350" width="18" height="14" fill="#f2b84b"/>` + T(x0 + 26, 362, 'Thinking: longer if tired, distracted, drunk or on drugs', { size: 13, a: 'start' });
    g += `<rect x="${x0 + 470}" y="350" width="18" height="14" fill="#e0453a"/>` + T(x0 + 496, 362, 'Braking: longer on wet or icy roads, worn brakes or tyres', { size: 13, a: 'start' });
    return wrap(W, H, o.aria || 'Thinking and braking distances at 30, 50 and 70 miles per hour', '', g);
  }

  /* ---------- life cycle of a star ---------- */
  function starLife(o = {}) {
    const W = 1000, H = 470, k = id('s');
    const star = (x, y, r, c1, c2) => `<radialGradient id="${k}${x}${y}" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${k}${x}${y})"/>`;
    const nodes = [
      [80, 220, 'Nebula', ''], [210, 220, 'Protostar', ''], [350, 220, 'Main sequence star', 'fusion balances gravity'],
      [520, 120, 'Red giant', ''], [680, 120, 'White dwarf', ''], [840, 120, 'Black dwarf', ''],
      [520, 330, 'Red super giant', ''], [680, 330, 'Supernova', 'makes heavy elements'], [840, 290, 'Neutron star', ''], [840, 390, 'Black hole', '']];
    let g = `<path d="M30 220q30 -60 90 -30q40 -30 70 20q-10 60 -80 40q-60 30 -80 -30z" fill="#8f6fbf" opacity=".45"/><path d="M50 210q40 -20 70 0q-20 30 -60 15z" fill="#d68fbf" opacity=".5"/>`;
    g += star(210, 220, 22, '#ffd6a0', '#e07a3a') + star(350, 220, 30, '#fff7c0', '#f2b33a') + star(520, 120, 48, '#ffb08a', '#d9482e') + star(680, 120, 12, '#ffffff', '#c9d6ff') + star(840, 120, 12, '#5a5a66', '#26262e');
    g += star(520, 330, 58, '#ff9a7a', '#b8321f') + `<path d="${Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8, r = i % 2 ? 22 : 46; return (i ? 'L' : 'M') + f(680 + Math.cos(a) * r) + ' ' + f(330 + Math.sin(a) * r); }).join('')}Z" fill="#ffe27a"/>` + star(680, 330, 18, '#ffffff', '#ffd04a');
    g += star(840, 290, 9, '#ffffff', '#9ab8ff') + `<circle cx="840" cy="390" r="16" fill="#05060a" stroke="#ffb04a" stroke-width="3"/>`;
    const link = (a, b) => arrow(a[0] + 40, a[1] + (b[1] - a[1]) * 0.15, b[0] - 50, b[1] - (b[1] - a[1]) * 0.15, 'currentColor', 2, 10);
    g += link(nodes[0], nodes[1]) + link(nodes[1], nodes[2]) + link(nodes[2], nodes[3]) + link(nodes[3], nodes[4]) + link(nodes[4], nodes[5]) + link(nodes[2], nodes[6]) + link(nodes[6], nodes[7]) + link(nodes[7], nodes[8]) + link(nodes[7], nodes[9]);
    nodes.forEach(([x, y, n, s], i) => { const dy = i === 8 ? -18 : i >= 3 ? (y < 220 ? 70 : (i === 9 ? 32 : 82)) : 58; g += T(x, y + dy, n, { size: 14, w: 700 }) + (s ? T(x, y + dy + 17, s, { size: 12 }) : ''); });
    g += T(600, 40, 'Stars about the size of the Sun', { size: 14, w: 700, fill: '#e0a64a' }) + T(600, 460, 'Stars much bigger than the Sun', { size: 14, w: 700, fill: '#e0a64a' });
    return wrap(W, H, o.aria || 'Life cycle of a star', '', g);
  }

  /* ---------- gas particles and pressure ---------- */
  function gasPressure(o = {}) {
    const W = 920, H = 380, r = S._rnd(5);
    const box = (x, hot) => {
      let s = `<rect x="${x}" y="80" width="320" height="230" rx="8" fill="${hot ? '#f7c9a3' : '#cfe3f7'}" opacity=".35" stroke="currentColor" stroke-width="4"/>`;
      for (let i = 0; i < 16; i++) { const px = x + 30 + r() * 260, py = 105 + r() * 180, a = r() * Math.PI * 2, L = hot ? 44 : 22;
        s += `<circle cx="${f(px)}" cy="${f(py)}" r="9" fill="${hot ? '#e0663a' : '#3f8fd6'}"/>` + arrow(px + Math.cos(a) * 11, py + Math.sin(a) * 11, px + Math.cos(a) * (11 + L), py + Math.sin(a) * (11 + L), hot ? '#e0663a' : '#3f8fd6', 2, 8); }
      [[x + 2, 150], [x + 318, 230], [x + 160, 82], [x + 240, 308]].forEach(([cx2, cy2]) => s += `<circle cx="${cx2}" cy="${cy2}" r="${hot ? 12 : 7}" fill="none" stroke="#ffd84a" stroke-width="2"/>`);
      s += T(x + 160, 60, hot ? 'Hotter gas (same volume)' : 'Cooler gas', { size: 16, w: 700 }) + T(x + 160, 340, hot ? 'Faster particles: more frequent, harder collisions' : 'Slower particles: fewer, gentler collisions', { size: 13 }) + T(x + 160, 360, hot ? 'Higher pressure' : 'Lower pressure', { size: 14, w: 700 });
      return s;
    };
    return wrap(W, H, o.aria || 'Gas particles colliding with container walls at low and high temperature', '', box(60, false) + arrow(400, 195, 520, 195, '#ef5b4c', 4) + T(460, 180, 'heat', { size: 14 }) + box(540, true));
  }


  /* ======================= CHEMISTRY ======================= */
  /* ---------- fractional distillation of crude oil ---------- */
  function fracDist(o = {}) {
    const W = 960, H = 560, cx = 420, top = 70, bot = 460, cw = 120, k = id('fd');
    const fr = [['Refinery gases', 'C1–C4', 'bottled gas (LPG)'], ['Petrol', 'C5–C10', 'car fuel'], ['Kerosene', 'C10–C16', 'aircraft fuel'], ['Diesel oil', 'C14–C20', 'lorry and car fuel'], ['Heavy fuel oil', 'C20–C40', 'ships and power stations'], ['Bitumen', 'C40+', 'roads and roofs']];
    let g = `<defs><linearGradient id="${k}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#5aa9f0" stop-opacity=".45"/><stop offset="1" stop-color="#ef5b4c" stop-opacity=".55"/></linearGradient></defs>`;
    g += `<rect x="${cx - cw / 2}" y="${top}" width="${cw}" height="${bot - top}" rx="14" fill="url(#${k})" stroke="#9aa4b0" stroke-width="4"/>`;
    const step = (bot - top) / fr.length;
    fr.forEach(([n, c, u], i) => { const y = top + step * (i + 0.55);
      if (i < fr.length - 1) g += `<path d="M${cx - cw / 2 + 6} ${top + step * (i + 1)}H${cx + cw / 2 - 6}" stroke="#9aa4b0" stroke-width="3"/>${[-30, 0, 30].map(d => `<path d="M${cx + d - 8} ${top + step * (i + 1)}q8 -12 16 0" stroke="#9aa4b0" stroke-width="2.5" fill="none"/>`).join('')}`;
      g += `<path d="M${cx + cw / 2} ${y}H${cx + cw / 2 + 70}" stroke="#9aa4b0" stroke-width="7"/>` + arrow(cx + cw / 2 + 60, y, cx + cw / 2 + 100, y, '#e0a64a', 3, 11);
      g += T(cx + cw / 2 + 112, y - 3, n, { size: 15, w: 700, a: 'start' }) + T(cx + cw / 2 + 112, y + 15, `${c} · ${u}`, { size: 13, a: 'start' }); });
    g += `<rect x="${cx - 250}" y="${bot - 60}" width="110" height="60" rx="8" fill="#5a6270"/>` + `<path d="M${cx - 230} ${bot - 6}q10 -22 20 0q10 -22 20 0q10 -22 20 0q10 -22 20 0" fill="#ff8a3a"/>` + T(cx - 195, bot + 24, 'Furnace', { size: 13 });
    g += `<path d="M${cx - 140} ${bot - 30}H${cx - cw / 2}" stroke="#7a5a3a" stroke-width="9"/>` + arrow(cx - 120, bot - 30, cx - cw / 2 - 4, bot - 30, '#e0a64a', 3, 11) + T(cx - 195, bot + 44, 'Crude oil heated', { size: 13 }) + T(cx - 195, bot + 60, 'and vaporised', { size: 13 });
    g += T(cx - cw / 2 - 18, top + 14, 'about 25 °C', { size: 13, a: 'end', fill: '#5aa9f0' }) + T(cx - cw / 2 - 18, bot - 80, 'about 350 °C', { size: 13, a: 'end', fill: '#ef5b4c' });
    g += arrow(140, top + 30, 140, bot - 120, 'currentColor', 2) + T(130, (top + bot) / 2 - 40, 'Going down:', { size: 13, a: 'end' }) + T(130, (top + bot) / 2 - 22, 'longer chains', { size: 13, a: 'end' }) + T(130, (top + bot) / 2 - 4, 'higher boiling point', { size: 13, a: 'end' }) + T(130, (top + bot) / 2 + 14, 'more viscous', { size: 13, a: 'end' }) + T(130, (top + bot) / 2 + 32, 'harder to ignite', { size: 13, a: 'end' });
    g += T(cx + 100, 36, 'The column is hot at the bottom and cooler at the top; each fraction condenses where the temperature is below its boiling point', { size: 13 });
    return wrap(W, H, o.aria || 'Fractional distillation column separating crude oil into fractions', '', g);
  }

  /* ---------- electrolysis cell ---------- */
  function electrolysis(o = {}) {
    const W = 900, H = 500, cat = o.cation || 'Pb²⁺', an = o.anion || 'Br⁻', name = o.name || 'Molten lead bromide';
    let g = `<path d="M240 170V420Q240 450 270 450H630Q660 450 660 420V170" fill="${o.aqueous ? '#9fd4e6' : '#e0a64a'}" fill-opacity=".35" stroke="#cfe0ea" stroke-width="5"/>`;
    g += `<rect x="330" y="120" width="34" height="270" rx="4" fill="#3a3f47"/><rect x="536" y="120" width="34" height="270" rx="4" fill="#3a3f47"/>`;
    g += `<path d="M347 120V70H420M553 120V70H480" stroke="currentColor" stroke-width="3" fill="none"/><path d="M420 50V90M434 60V80" stroke="currentColor" stroke-width="3"/><path d="M466 50V90M480 60V80" stroke="currentColor" stroke-width="3" opacity="0"/>`;
    g += `<path d="M434 70H480" stroke="currentColor" stroke-width="3"/>` + T(420, 44, '−', { size: 18, w: 700 }) + T(440, 44, '+', { size: 18, w: 700 }) + T(450, 106, 'd.c. power supply', { size: 13 });
    [[405, 200], [405, 260], [405, 320], [405, 380]].forEach(([x, y]) => { g += `<circle cx="${x}" cy="${y}" r="15" fill="#e0533f"/>` + T(x, y + 5, cat, { size: 11, w: 700, fill: '#fff' }) + arrow(x - 19, y, x - 44, y, '#e0533f', 2.5, 9); });
    [[495, 230], [495, 290], [495, 350], [495, 410]].forEach(([x, y]) => { g += `<circle cx="${x}" cy="${y}" r="15" fill="#3f7fd6"/>` + T(x, y + 5, an, { size: 11, w: 700, fill: '#fff' }) + arrow(x + 19, y, x + 44, y, '#3f7fd6', 2.5, 9); });
    g += T(450, 480, name + ': opposite charges attract, so ions move to the electrodes', { size: 14 });
    const labs = [{ x: 334, y: 160, t: 'Cathode (−): positive ions gain electrons (reduction)', side: 'l', ly: 170 }, { x: 362, y: 350, t: o.atCathode || 'Lead forms here', side: 'l', ly: 330 },
      { x: 566, y: 160, t: 'Anode (+): negative ions lose electrons (oxidation)', side: 'r', ly: 170 }, { x: 540, y: 350, t: o.atAnode || 'Bromine forms here', side: 'r', ly: 330 }, { x: 640, y: 420, t: 'Electrolyte: ions free to move', side: 'r', ly: 420 }];
    return wrap(W, H, o.aria || 'Electrolysis cell with ions moving to the electrodes', '', g + labels(labs, { W, H, lx: 220, rx: 680, size: 14 }));
  }

  /* ---------- paper chromatography ---------- */
  function chromatography(o = {}) {
    const W = 960, H = 520, x0 = 330, pw = 200, base = 410, front = 110;
    let g = `<path d="M280 150V470Q280 490 300 490H580Q600 490 600 470V150" fill="none" stroke="#cfe0ea" stroke-width="5"/><rect x="284" y="430" width="312" height="56" fill="#9fd4e6" opacity=".45"/>`;
    g += `<rect x="${x0}" y="70" width="${pw}" height="390" fill="#f4f1e6"/><rect x="${x0}" y="${front}" width="${pw}" height="${460 - front}" fill="#9fd4e6" opacity=".25"/><path d="M290 70H570" stroke="#777" stroke-width="5"/>`;
    g += `<path d="M${x0} ${base}H${x0 + pw}" stroke="#555" stroke-width="2" stroke-dasharray="6 4"/><path d="M${x0} ${front}H${x0 + pw}" stroke="#3f8fd6" stroke-width="2" stroke-dasharray="3 4"/>`;
    const spots = [[x0 + 50, ['#e0453a', 300], ['#3f7fd6', 180]], [x0 + 100, ['#2e9e5b', 240]], [x0 + 150, ['#e0453a', 300], ['#2e9e5b', 240], ['#8e4bd6', 360]]];
    spots.forEach(([x, ...ss]) => { g += `<circle cx="${x}" cy="${base}" r="4" fill="#555"/>`; ss.forEach(([c, y]) => g += `<ellipse cx="${x}" cy="${y}" rx="11" ry="8" fill="${c}" opacity=".85"/>`); });
    g += `<path d="M${x0 + 150} 300H${x0 + pw + 100}" stroke="#e0453a" stroke-dasharray="3 4"/>` + dbl(x0 + pw + 90, base, x0 + pw + 90, 300) + T(x0 + pw + 100, 350, 'distance moved', { size: 13, a: 'start' }) + T(x0 + pw + 100, 366, 'by the red dye', { size: 13, a: 'start' });
    g += `<path d="M${x0 + pw} ${front}H${x0 + pw + 220}" stroke="#3f8fd6" stroke-dasharray="3 4"/>` + dbl(x0 + pw + 210, base, x0 + pw + 210, front) + T(x0 + pw + 220, 250, 'distance moved', { size: 13, a: 'start' }) + T(x0 + pw + 220, 266, 'by the solvent', { size: 13, a: 'start' });
    g += T(450, 40, 'Rf = distance moved by substance ÷ distance moved by solvent', { size: 16, w: 700 });
    g += T(x0 + 50, base + 30, 'A', { size: 13, w: 700, fill: '#555' }) + T(x0 + 100, base + 30, 'B', { size: 13, w: 700, fill: '#555' }) + T(x0 + 150, base + 30, 'ink', { size: 13, w: 700, fill: '#555' });
    const labs = [{ x: x0, y: front, t: 'Solvent front', side: 'l', ly: front }, { x: x0 + 4, y: 200, t: 'Chromatography paper (stationary phase)', side: 'l', ly: 200 },
      { x: x0, y: base, t: 'Start line drawn in pencil (does not dissolve)', side: 'l', ly: 330 }, { x: 300, y: 460, t: 'Solvent (mobile phase) below the start line', side: 'l', ly: 460 }];
    return wrap(W, H, o.aria || 'Paper chromatography of an ink with reference dyes', '', g + labels(labs, { W, H, lx: 260, rx: 700, size: 14 }));
  }

  /* ---------- titration ---------- */
  function titration(o = {}) {
    const W = 860, H = 600, bx = 430;
    let g = `<rect x="200" y="560" width="300" height="16" rx="4" fill="#6b5a48"/><rect x="230" y="60" width="12" height="500" fill="#8a8f98"/><rect x="236" y="150" width="${bx - 236}" height="10" fill="#8a8f98"/><rect x="${bx - 22}" y="140" width="44" height="30" rx="6" fill="#5a6070"/>`;
    g += `<rect x="${bx - 12}" y="40" width="24" height="380" rx="6" fill="#e8f3f8" fill-opacity=".25" stroke="#cfe0ea" stroke-width="3"/><rect x="${bx - 9}" y="120" width="18" height="298" fill="#9fd4e6" opacity=".55"/>`;
    for (let i = 0; i <= 25; i++) g += `<path d="M${bx - 12} ${f(60 + i * 13.5)}h${i % 5 ? 7 : 12}" stroke="currentColor" stroke-width="1.2"/>` + (i % 5 ? '' : T(bx + 22, 64 + i * 13.5, String(i * 2), { size: 11, a: 'start' }));
    g += `<rect x="${bx - 22}" y="420" width="44" height="12" rx="4" fill="#3a3f47"/><path d="M${bx} 432V452" stroke="#cfe0ea" stroke-width="4"/><circle cx="${bx}" cy="462" r="3" fill="#9fd4e6"/>`;
    g += `<rect x="${bx - 90}" y="548" width="180" height="12" fill="#f5f5f5"/><path d="M${bx - 20} 470V500L${bx - 70} 548H${bx + 70}L${bx + 20} 500V470" fill="#f2a1c4" fill-opacity=".55" stroke="#cfe0ea" stroke-width="3"/><path d="M${bx - 36} 516L${bx - 70} 548H${bx + 70}L${bx + 36} 516Z" fill="#e874a8" opacity=".55"/>`;
    const labs = [{ x: bx + 12, y: 100, t: 'Burette: add acid a few drops at a time near the end point', side: 'r', ly: 90 }, { x: bx + 12, y: 200, t: 'Read the volume at the bottom of the meniscus, at eye level', side: 'r', ly: 190 },
      { x: bx + 10, y: 426, t: 'Tap', side: 'r', ly: 420 }, { x: bx + 40, y: 520, t: 'Conical flask: alkali measured with a pipette, plus indicator', side: 'r', ly: 500 }, { x: bx + 80, y: 554, t: 'White tile: makes the colour change easy to see', side: 'r', ly: 560 },
      { x: 236, y: 300, t: 'Clamp stand', side: 'l', ly: 300 }];
    return wrap(W, H, o.aria || 'Titration apparatus: burette, conical flask with indicator, white tile', '', g + labels(labs, { W, H, lx: 200, rx: 520, size: 14 }));
  }

  /* ---------- greenhouse effect ---------- */
  function greenhouse(o = {}) {
    const W = 960, H = 480, k = id('g');
    let g = `<defs><radialGradient id="${k}" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#fff7c0"/><stop offset="1" stop-color="#f2b33a"/></radialGradient></defs>`;
    g += `<circle cx="100" cy="90" r="50" fill="url(#${k})"/>` + T(100, 165, 'Sun', { size: 14, w: 700 });
    g += `<path d="M0 360Q460 300 920 360V480H0Z" fill="#4d7a3a"/><path d="M0 360Q460 300 920 360" stroke="#6b9a4a" stroke-width="4" fill="none"/>`;
    g += `<path d="M0 200Q460 140 920 200V250Q460 190 0 250Z" fill="#9fd4e6" opacity=".25"/>` + T(820, 196, 'Atmosphere', { size: 14 });
    const r = S._rnd(6); for (let i = 0; i < 9; i++) { const x = 220 + i * 70 + r() * 20, y = 200 + r() * 30; g += `<circle cx="${f(x)}" cy="${f(y)}" r="6" fill="#555"/><circle cx="${f(x - 9)}" cy="${f(y)}" r="5" fill="#e0453a"/><circle cx="${f(x + 9)}" cy="${f(y)}" r="5" fill="#e0453a"/>`; }
    g += arrow(150, 130, 330, 330, '#f2c94c', 4, 14) + T(200, 260, 'Short-wavelength', { size: 13, a: 'end' }) + T(200, 276, 'radiation passes through', { size: 13, a: 'end' });
    g += wavy(380, 330, 450, 150, '#ef5b4c', 3) + T(460, 120, 'Some infrared escapes to space', { size: 13 });
    g += wavy(560, 330, 610, 225, '#ef5b4c', 3) + wavy(650, 222, 700, 325, '#ef5b4c', 3);
    g += T(715, 290, 'Greenhouse gases absorb infrared', { size: 13, a: 'start' }) + T(715, 306, 'and re-emit it, warming the Earth', { size: 13, a: 'start' });
    g += T(460, 420, 'The warm Earth emits long-wavelength infrared radiation', { size: 14, fill: '#fff' }) + T(460, 30, 'The greenhouse effect: carbon dioxide, methane and water vapour', { size: 16, w: 700 });
    return wrap(W, H, o.aria || 'The greenhouse effect', '', g);
  }

  /* ---------- the Haber process ---------- */
  function haber(o = {}) {
    const W = 980, H = 440;
    const box = (x, y, w, h, fill, t1, t2) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="#9aa4b0" stroke-width="2"/>` + T(x + w / 2, y + h / 2 - 4, t1, { size: 15, w: 700, fill: '#fff' }) + (t2 ? T(x + w / 2, y + h / 2 + 16, t2, { size: 12, fill: '#fff' }) : '');
    let g = box(30, 90, 160, 60, '#3f7fd6', 'Nitrogen', 'from the air') + box(30, 230, 160, 60, '#7a8592', 'Hydrogen', 'from natural gas');
    g += arrow(190, 120, 270, 175, 'currentColor', 3) + arrow(190, 260, 270, 205, 'currentColor', 3);
    g += box(280, 150, 130, 80, '#5a6270', 'Compressor', 'about 200 atm');
    g += arrow(410, 190, 460, 190, 'currentColor', 3);
    g += `<rect x="470" y="100" width="130" height="190" rx="22" fill="#a2482e" stroke="#9aa4b0" stroke-width="2"/>${[0, 1, 2, 3].map(i => `<rect x="490" y="${130 + i * 36}" width="90" height="20" rx="4" fill="#5b4a3a"/>`).join('')}` + T(535, 90, 'Reactor', { size: 15, w: 700 }) + T(535, 310, 'iron catalyst, about 450 °C', { size: 12 });
    g += arrow(600, 190, 660, 190, 'currentColor', 3);
    g += box(670, 150, 130, 80, '#3f8f9a', 'Cooler', 'ammonia liquefies');
    g += arrow(735, 230, 735, 300, 'currentColor', 3) + `<path d="M690 300h90v50q0 20 -20 20h-50q-20 0 -20 -20z" fill="#9fd4e6" opacity=".6" stroke="#cfe0ea" stroke-width="2"/>` + T(735, 395, 'Liquid ammonia removed', { size: 13, w: 700 });
    g += `<path d="M800 175H880V60H345V150" stroke="#e0a64a" stroke-width="3" fill="none" stroke-dasharray="8 6"/>` + arrow(345, 100, 345, 148, '#e0a64a', 3) + T(612, 52, 'Unreacted nitrogen and hydrogen are recycled', { size: 13, fill: '#e0a64a' });
    g += T(490, 425, 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)   (forward reaction is exothermic)', { size: 16, w: 700 });
    return wrap(W, H, o.aria || 'Flow diagram of the Haber process', '', g);
  }

  /* ---------- periodic table regions ---------- */
  function periodicTable(o = {}) {
    const SY = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn'.split(' ');
    const W = 1000, H = 530, cw = 50, ch = 50, x0 = 40, y0 = 90;
    const pos = z => { if (z === 1) return [1, 1]; if (z === 2) return [18, 1];
      if (z <= 10) return [z <= 4 ? z - 2 : z + 8, 2]; if (z <= 18) return [z <= 12 ? z - 10 : z, 3];
      const p = z <= 36 ? 4 : z <= 54 ? 5 : 6, s = p === 4 ? 18 : p === 5 ? 36 : 54; let c = z - s; if (p === 6 && z > 57) c = z - 54 - 14 + 0; return [p === 6 && z > 57 ? c : c, p]; };
    const nonmetal = new Set([1, 2, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 32, 33, 34, 35, 36, 51, 52, 53, 54, 85, 86]);
    let g = '';
    const zs = []; for (let z = 1; z <= 56; z++) zs.push(z); zs.push(57); for (let z = 72; z <= 86; z++) zs.push(z);
    zs.forEach(z => { let [c, p] = pos(z); if (z >= 72) c = z - 68; if (z === 57) c = 3;
      const x = x0 + (c - 1) * cw, y = y0 + (p - 1) * ch, grp = c;
      const col = grp === 1 && z > 1 ? '#e0533f' : grp === 17 ? '#3fb27f' : grp === 18 ? '#8e6bd6' : (c >= 3 && c <= 12) ? '#c98a3a' : nonmetal.has(z) ? '#3f8fd6' : '#8a94a6';
      const sym = z >= 72 ? SY[z - 15] : SY[z - 1];
      g += `<rect x="${x + 2}" y="${y + 2}" width="${cw - 4}" height="${ch - 4}" rx="5" fill="${col}"/>` + T(x + cw / 2, y + 22, String(z), { size: 10, fill: '#fff' }) + T(x + cw / 2, y + 40, sym, { size: 16, w: 700, fill: '#fff' }); });
    // staircase between metals and non-metals
    g += `<path d="M${x0 + 12 * cw} ${y0 + cw}H${x0 + 13 * cw}V${y0 + 2 * ch}H${x0 + 14 * cw}V${y0 + 3 * ch}H${x0 + 15 * cw}V${y0 + 4 * ch}H${x0 + 16 * cw}V${y0 + 6 * ch}" stroke="#fff" stroke-width="4" fill="none"/>`;
    for (let c = 1; c <= 18; c++) { const n = c <= 2 ? c : c >= 13 ? (c === 18 ? 0 : c - 10) : ''; if (n !== '') g += T(x0 + (c - 0.5) * cw, y0 - 10, String(n), { size: 14, w: 700 }); }
    g += T(x0 + 9.5 * cw, 40, 'Groups are columns (same outer electrons); periods are rows (same number of shells)', { size: 15, w: 700 });
    const key = [['#e0533f', 'Group 1: alkali metals'], ['#c98a3a', 'Transition metals'], ['#8a94a6', 'Other metals'], ['#3f8fd6', 'Non-metals'], ['#3fb27f', 'Group 7: halogens'], ['#8e6bd6', 'Group 0: noble gases']];
    key.forEach(([c, t], i) => { const x = x0 + (i % 3) * 300, y = 440 + Math.floor(i / 3) * 34; g += `<rect x="${x}" y="${y}" width="22" height="22" rx="4" fill="${c}"/>` + T(x + 32, y + 17, t, { size: 14, a: 'start' }); });
    g += T(x0 + 14.5 * cw, 418, 'The staircase line separates metals (left) from non-metals (right)', { size: 13 });
    return wrap(W, H, o.aria || 'The periodic table showing groups, periods, metals and non-metals', '', g);
  }

  /* ---------- collision theory ---------- */
  function collision(o = {}) {
    const W = 920, H = 400, r = S._rnd(12);
    const box = (x, n, fast, title, sub) => { let s = `<rect x="${x}" y="70" width="380" height="250" rx="10" fill="#9fd4e6" opacity=".12" stroke="currentColor" stroke-width="3"/>`;
      for (let i = 0; i < n; i++) { const px = x + 25 + r() * 330, py = 95 + r() * 200, a = r() * 6.3, L = fast ? 30 : 16, red = i % 2;
        s += `<circle cx="${f(px)}" cy="${f(py)}" r="10" fill="${red ? '#e0533f' : '#3f7fd6'}"/>` + arrow(px + Math.cos(a) * 12, py + Math.sin(a) * 12, px + Math.cos(a) * (12 + L), py + Math.sin(a) * (12 + L), 'currentColor', 1.6, 7); }
      const sp = n > 10 ? [[x + 120, 160], [x + 260, 240], [x + 200, 120]] : [[x + 190, 200]];
      sp.forEach(([sx, sy]) => s += `<path d="${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, rr = i % 2 ? 6 : 15; return (i ? 'L' : 'M') + f(sx + Math.cos(a) * rr) + ' ' + f(sy + Math.sin(a) * rr); }).join('')}Z" fill="#ffd84a"/>`);
      return s + T(x + 190, 50, title, { size: 16, w: 700 }) + T(x + 190, 345, sub, { size: 13 }); };
    let g = box(40, 8, false, 'Low concentration or temperature', 'Fewer successful collisions per second') + box(500, 18, true, 'Higher concentration or temperature', 'More frequent, more energetic collisions');
    g += T(460, 385, 'A collision only reacts if the particles have at least the activation energy', { size: 14, w: 700 });
    return wrap(W, H, o.aria || 'Collision theory: more frequent and energetic collisions increase the rate', '', g);
  }

  /* ---------- displayed formulae of alkanes ---------- */
  function alkanes(o = {}) {
    const W = 980, H = 300, names = ['Methane', 'Ethane', 'Propane', 'Butane'], forms = ['CH₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀'];
    let g = '', x = 40;
    const atom = (cx, cy, s) => `<circle cx="${cx}" cy="${cy}" r="${s === 'C' ? 15 : 11}" fill="${s === 'C' ? '#3a3f47' : '#f2f2f2'}" stroke="#888"/>` + T(cx, cy + 5, s, { size: s === 'C' ? 14 : 12, w: 700, fill: s === 'C' ? '#fff' : '#333' });
    names.forEach((n, i) => { const nC = i + 1, sp = 46, w = (nC + 1) * sp, cy = 150; let b = '', a = '';
      for (let c = 0; c < nC; c++) { const cx = x + sp * (c + 1);
        b += `<path d="M${cx} ${cy}V${cy - 42}M${cx} ${cy}V${cy + 42}" stroke="#aaa" stroke-width="3"/>`; a += atom(cx, cy - 42, 'H') + atom(cx, cy + 42, 'H');
        if (c < nC - 1) b += `<path d="M${cx} ${cy}H${cx + sp}" stroke="#aaa" stroke-width="3"/>`; }
      b += `<path d="M${x + sp} ${cy}H${x + sp - 40}M${x + sp * nC} ${cy}H${x + sp * nC + 40}" stroke="#aaa" stroke-width="3"/>`; a += atom(x + sp - 40, cy, 'H') + atom(x + sp * nC + 40, cy, 'H');
      for (let c = 0; c < nC; c++) a += atom(x + sp * (c + 1), cy, 'C');
      g += b + a + T(x + sp * (nC + 1) / 2, 60, n, { size: 16, w: 700 }) + T(x + sp * (nC + 1) / 2, 250, forms[i], { size: 16 });
      x += w + 60; });
    g += T(W / 2, 290, 'Alkanes: saturated hydrocarbons, general formula CₙH₂ₙ₊₂ (each carbon makes four single bonds)', { size: 14 });
    return wrap(W, H, o.aria || 'Displayed formulae of methane, ethane, propane and butane', '', g);
  }

  /* ---------- reaction profiles ---------- */
  function reactionProfile(o = {}) {
    const W = 1000, H = 400;
    const panel = (x, exo) => { const ox = x + 50, oy = 330, w = 330, rL = exo ? 190 : 260, pL = exo ? 270 : 170, pk = 100;
      let s = `<path d="M${ox} 60V${oy}H${ox + w}" stroke="currentColor" stroke-width="2.5" fill="none"/>` + T(ox - 14, 190, 'Energy', { size: 14, a: 'middle' }).replace('<text', `<text transform="rotate(-90 ${ox - 18} 190)"`) + T(ox + w / 2, oy + 30, 'Progress of reaction', { size: 14 });
      s += `<path d="M${ox + 10} ${rL}H${ox + 80}C${ox + 130} ${rL} ${ox + 140} ${pk} ${ox + 170} ${pk}C${ox + 200} ${pk} ${ox + 210} ${pL} ${ox + 260} ${pL}H${ox + 320}" stroke="${exo ? '#ef5b4c' : '#3f8fd6'}" stroke-width="4" fill="none"/>`;
      s += T(ox + 45, rL - 10, 'Reactants', { size: 13 }) + T(ox + 290, pL - 10, 'Products', { size: 13 });
      s += dbl(ox + 95, rL, ox + 95, pk) + T(ox + 88, pk + 20, 'Activation', { size: 12, a: 'end' }) + T(ox + 88, pk + 35, 'energy', { size: 12, a: 'end' }) + `<path d="M${ox + 95} ${pk}H${ox + 170}" stroke="currentColor" stroke-dasharray="4 4" opacity=".6"/>`;
      s += `<path d="M${ox + 260} ${rL}H${ox + 320}" stroke="currentColor" stroke-dasharray="4 4"/>` + dbl(ox + 305, rL, ox + 305, pL) + T(ox + 314, (rL + pL) / 2 - 3, exo ? 'Energy' : 'Energy', { size: 12, a: 'start' }) + T(ox + 314, (rL + pL) / 2 + 12, exo ? 'given out' : 'taken in', { size: 12, a: 'start' });
      return s + T(x + 210, 34, exo ? 'Exothermic: products lower than reactants' : 'Endothermic: products higher than reactants', { size: 15, w: 700 }); };
    return wrap(W, H, o.aria || 'Reaction profiles for exothermic and endothermic reactions', '', panel(20, true) + panel(500, false));
  }


  /* ======================= BIOLOGY ======================= */
  const chromo = (x, y, c, a = 0, sc = 1) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${a}) scale(${sc})"><path d="M-9 -14L9 14M9 -14L-9 14" stroke="${c}" stroke-width="6" stroke-linecap="round"/><circle r="3.5" fill="#fff" opacity=".8"/></g>`;
  /* ---------- mitosis ---------- */
  function mitosis(o = {}) {
    const W = 1000, H = 330, cy = 150, R = 66, cols = ['#e0533f', '#3f7fd6', '#e0a64a', '#3fb27f'];
    const st = [['Interphase', 'DNA copied; more organelles made'], ['Prophase', 'chromosomes condense; nucleus breaks down'], ['Metaphase', 'chromosomes line up across the middle'], ['Anaphase', 'spindle fibres pull chromatids to each end'], ['Telophase and cytokinesis', 'new nuclei form; cytoplasm divides']];
    let g = '';
    st.forEach(([n, d], i) => { const x = 105 + i * 197;
      const cell = (cx, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#f6dce4" stroke="#b56a86" stroke-width="2.5"/>`;
      if (i < 4) g += cell(x, R + (i === 3 ? 12 : 0), R - (i === 3 ? 6 : 0)); else g += `<path d="M${x - 78} ${cy}C${x - 78} ${cy - 80} ${x - 10} ${cy - 70} ${x} ${cy - 24}C${x + 10} ${cy - 70} ${x + 78} ${cy - 80} ${x + 78} ${cy}C${x + 78} ${cy + 80} ${x + 10} ${cy + 70} ${x} ${cy + 24}C${x - 10} ${cy + 70} ${x - 78} ${cy + 80} ${x - 78} ${cy}Z" fill="#f6dce4" stroke="#b56a86" stroke-width="2.5"/>`;
      if (i === 0) { g += `<circle cx="${x}" cy="${cy}" r="32" fill="#c7a8e0" stroke="#8e5bb8" stroke-width="2"/>`; for (let k = 0; k < 4; k++) g += `<path d="M${x - 20 + k * 10} ${cy - 16}q8 14 0 30" stroke="${cols[k]}" stroke-width="2.5" fill="none"/>`; }
      if (i === 1) { g += `<circle cx="${x}" cy="${cy}" r="34" fill="none" stroke="#8e5bb8" stroke-width="2" stroke-dasharray="6 6"/>`; [[-14, -12, 20], [12, -10, -30], [-10, 14, 60], [14, 12, 10]].forEach(([dx, dy, a], k) => g += chromo(x + dx, cy + dy, cols[k], a, 0.8)); }
      if (i === 2) { g += `<path d="M${x - 62} ${cy}L${x} ${cy - 40}L${x + 62} ${cy}L${x} ${cy + 40}Z" fill="none" stroke="#9aa4b0" stroke-width="1"/>`; for (let k = 0; k < 6; k++) g += `<path d="M${x - 64} ${cy}L${x} ${cy - 45 + k * 18}L${x + 64} ${cy}" stroke="#9aa4b0" stroke-width="1" fill="none"/>`; [0, 1, 2, 3].forEach(k => g += chromo(x, cy - 36 + k * 24, cols[k], 90, 0.75)); }
      if (i === 3) { for (let k = 0; k < 4; k++) { const yy = cy - 33 + k * 22; g += `<path d="M${x - 70} ${cy}L${x - 30} ${yy}M${x + 70} ${cy}L${x + 30} ${yy}" stroke="#9aa4b0" stroke-width="1"/><path d="M${x - 38} ${yy - 8}L${x - 24} ${yy}L${x - 38} ${yy + 8}M${x + 38} ${yy - 8}L${x + 24} ${yy}L${x + 38} ${yy + 8}" stroke="${cols[k]}" stroke-width="5" fill="none" stroke-linecap="round"/>`; } }
      if (i === 4) { [x - 40, x + 40].forEach(nx => { g += `<circle cx="${nx}" cy="${cy}" r="22" fill="#c7a8e0" stroke="#8e5bb8" stroke-width="2"/>`; for (let k = 0; k < 4; k++) g += `<path d="M${nx - 12 + k * 7} ${cy - 10}q6 10 0 20" stroke="${cols[k]}" stroke-width="2" fill="none"/>`; }); }
      const cut = d.includes(';') ? d.indexOf(';') + 1 : d.lastIndexOf(' ', Math.ceil(d.length / 2)); g += T(x, cy + 100, n, { size: 15, w: 700 }) + T(x, cy + 120, d.slice(0, cut).trim(), { size: 12 }) + T(x, cy + 136, d.slice(cut).trim(), { size: 12 });
      if (i < 4) g += arrow(x + 82, cy, x + 112, cy, 'currentColor', 2.5, 10); });
    g += T(W / 2, 30, 'Mitosis makes two genetically identical cells (chromosome pairs shown in different colours)', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'Stages of the cell cycle and mitosis', '', g);
  }

  /* ---------- blood vessels ---------- */
  function bloodVessels(o = {}) {
    const W = 960, H = 380, cy = 170;
    const rbc = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="7" fill="#d93a3a"/><ellipse cx="${x}" cy="${y}" rx="4" ry="2.6" fill="#a82222"/>`;
    let g = '';
    // artery
    g += `<circle cx="160" cy="${cy}" r="100" fill="#c9524a"/><circle cx="160" cy="${cy}" r="82" fill="#e9b0a0"/><circle cx="160" cy="${cy}" r="66" fill="#d16a5c"/><circle cx="160" cy="${cy}" r="34" fill="#7a1f1f"/><circle cx="160" cy="${cy}" r="30" fill="#b9302c"/>` + rbc(152, cy - 6) + rbc(168, cy + 8);
    // vein
    g += `<ellipse cx="480" cy="${cy}" rx="110" ry="80" fill="#6a7fc0"/><ellipse cx="480" cy="${cy}" rx="96" ry="66" fill="#8a3a52"/><path d="M400 ${cy - 52}Q440 ${cy} 480 ${cy - 4}M560 ${cy - 52}Q520 ${cy} 480 ${cy - 4}" stroke="#d6dcf2" stroke-width="5" fill="none"/>` + rbc(450, cy + 20) + rbc(510, cy + 30) + rbc(480, cy + 40);
    // capillary
    g += `<rect x="700" y="${cy - 26}" width="220" height="52" rx="26" fill="#f2b8b0" stroke="#e08a80" stroke-width="3"/><rect x="706" y="${cy - 18}" width="208" height="36" rx="18" fill="#f7d8d0"/>` + [740, 790, 840, 880].map(x => rbc(x, cy)).join('');
    g += `<path d="M720 ${cy - 26}v-30M860 ${cy + 26}v30" stroke="#ffd84a" stroke-width="2"/>` + arrow(720, cy - 40, 720, cy - 70, '#ffd84a', 2, 8) + arrow(860, cy + 40, 860, cy + 70, '#ffd84a', 2, 8);
    const lab = (x, t, a) => T(x, 300, t, { size: 16, w: 700 }) + a.map((s, i) => T(x, 322 + i * 18, s, { size: 13 })).join('');
    g += lab(160, 'Artery', ['thick muscular, elastic wall', 'narrow lumen; high pressure', 'carries blood away from the heart']) + lab(480, 'Vein', ['thin wall, large lumen', 'valves stop blood flowing backwards', 'carries blood back to the heart']) + lab(810, 'Capillary', ['wall one cell thick', 'short diffusion distance', 'substances exchanged with cells']);
    g += T(160, 56, 'elastic fibres and muscle', { size: 12 }) + T(480, 82, 'valve', { size: 12 });
    return wrap(W, H, o.aria || 'Cross-sections of an artery, a vein and a capillary', '', g);
  }

  /* ---------- blood cells ---------- */
  function bloodCells(o = {}) {
    const W = 900, H = 420, r = S._rnd(31);
    let g = `<rect x="40" y="60" width="520" height="320" rx="20" fill="#f5d98a" opacity=".55"/>`;
    for (let i = 0; i < 22; i++) { const x = 70 + r() * 460, y = 90 + r() * 260; if (Math.hypot(x - 300, y - 210) < 70) continue; g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="22" ry="16" fill="#d93a3a" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="9" ry="6" fill="#a82222" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`; }
    g += `<circle cx="300" cy="210" r="48" fill="#f2f0f6" stroke="#b9b2cc" stroke-width="2"/><path d="M272 196q14 -26 34 -6q20 -14 22 12q-8 26 -30 14q-24 14 -26 -20z" fill="#7a4ab8"/>`;
    [[470, 120], [110, 330], [420, 330], [200, 110]].forEach(([x, y]) => g += `<path d="M${x} ${y}l6 -5 7 4 -1 7 -7 3z" fill="#e0a64a"/>`);
    const labs = [{ x: 250, y: 150, t: 'Red blood cell: no nucleus, biconcave shape, haemoglobin carries oxygen', side: 'r', ly: 110 }, { x: 345, y: 210, t: 'White blood cell: has a nucleus; part of the immune system', side: 'r', ly: 210 },
      { x: 476, y: 118, t: 'Platelets: small cell fragments that help blood clot', side: 'r', ly: 160 }, { x: 520, y: 300, t: 'Plasma: liquid carrying cells, glucose, CO₂, urea, hormones', side: 'r', ly: 300 }];
    return wrap(W, H, o.aria || 'Components of blood seen under a microscope', '', g + labels(labs, { W, H, lx: 30, rx: 590, size: 14 }));
  }

  /* ---------- brain regions ---------- */
  function brain(o = {}) {
    const W = 880, H = 440, k = id('br');
    let g = `<defs><pattern id="${k}" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 20q10 -14 20 0t20 0M0 36q10 -10 20 0t20 0M0 6q10 -10 20 0t20 0" stroke="#c97a8a" stroke-width="2" fill="none"/></pattern></defs>`;
    g += `<path d="M260 250C220 140 300 70 420 70C560 66 640 140 620 240C610 290 560 300 520 296L470 300C430 300 360 300 320 296C280 292 268 276 260 250Z" fill="#f2b5bf"/><path d="M260 250C220 140 300 70 420 70C560 66 640 140 620 240C610 290 560 300 520 296L470 300C430 300 360 300 320 296C280 292 268 276 260 250Z" fill="url(#${k})"/>`;
    g += `<path d="M520 296C560 300 610 300 616 330C612 366 560 372 520 356C496 344 498 312 520 296Z" fill="#d98a9a"/>${[0, 1, 2, 3].map(i => `<path d="M${514 + i * 2} ${310 + i * 12}H${600 - i * 4}" stroke="#b56a7a" stroke-width="2"/>`).join('')}`;
    g += `<path d="M470 300C468 330 480 360 486 400H452C450 370 444 330 440 300Z" fill="#e8a8b4" stroke="#c97a8a" stroke-width="2"/>`;
    const labs = [{ x: 380, y: 130, t: 'Cerebral cortex: memory, language, intelligence and consciousness', side: 'l', ly: 90 }, { x: 565, y: 330, t: 'Cerebellum: balance and coordinating muscle movement', side: 'r', ly: 340 },
      { x: 466, y: 370, t: 'Medulla: unconscious activities, e.g. heartbeat and breathing', side: 'r', ly: 400 }, { x: 300, y: 260, t: 'Front of the head', side: 'l', ly: 300 }];
    return wrap(W, H, o.aria || 'Side view of the brain showing the cerebral cortex, cerebellum and medulla', '', g + labels(labs, { W, H, lx: 240, rx: 650, size: 14 }));
  }

  /* ---------- skin and temperature control ---------- */
  function skin(o = {}) {
    const W = 1000, H = 440;
    const panel = (x, hot) => { let s = `<rect x="${x}" y="110" width="400" height="40" fill="#e9b89a"/><rect x="${x}" y="150" width="400" height="190" fill="#f3d1bd"/><rect x="${x}" y="340" width="400" height="40" fill="#f5e3a6"/>`;
      s += `<path d="M${x + 80} 330V180q0 -20 12 -30L${x + 96} 70" stroke="#5a3a24" stroke-width="5" fill="none"/><ellipse cx="${x + 80}" cy="320" rx="14" ry="20" fill="#e9b89a" stroke="#b07a5a"/><path d="M${x + 86} 250L${x + 120} 300" stroke="#c96a5a" stroke-width="5"/>`;
      s += `<path d="M${x + 260} 340c-20 -10 -20 -30 0 -36c20 -6 20 -26 0 -32V110" stroke="#5aa9f0" stroke-width="5" fill="none"/>${hot ? `<circle cx="${x + 260}" cy="98" r="7" fill="#5aa9f0"/><circle cx="${x + 275}" cy="88" r="5" fill="#5aa9f0"/>` : ''}`;
      s += `<path d="M${x} 200C${x + 120} ${hot ? 160 : 230} ${x + 280} ${hot ? 160 : 230} ${x + 400} 200" stroke="#d93a3a" stroke-width="${hot ? 16 : 6}" fill="none"/>`;
      if (hot) s += [x + 120, x + 200, x + 330].map(xx => wavy(xx, 150, xx, 70, '#ef5b4c', 2)).join('');
      s += T(x + 200, 40, hot ? 'Too hot' : 'Too cold', { size: 18, w: 700, fill: hot ? '#ef5b4c' : '#5aa9f0' });
      const notes = hot ? ['Vasodilation: vessels near the surface widen,', 'more energy transferred to the surroundings', 'Sweat is released; it evaporates and cools the skin', 'Hairs lie flat']
        : ['Vasoconstriction: vessels near the surface narrow,', 'less energy transferred to the surroundings', 'Little or no sweat; shivering releases energy', 'Hairs stand up, trapping a layer of air'];
      return s + notes.map((t, i) => T(x + 200, 400 + i * 0 + [0, 14, 30, 46][i] - 8, t, { size: 12 })).join(''); };
    let g = panel(20, true) + panel(580, false);
    g += [[76, 284, 102], [134, 330, 124], [210, 330, 170], [250, 266, 318], [308, 123, 275]].map(([y, px, py]) => `<path d="M454 ${y - 4}L${px} ${py}" stroke="currentColor" stroke-width="1.2" opacity=".7"/><circle cx="${px}" cy="${py}" r="2.6" fill="currentColor"/>`).join('');
    g += T(500, 76, 'Sweat pore', { size: 13 }) + T(500, 210, 'Blood vessel', { size: 13 }) + T(500, 134, 'Epidermis', { size: 13 }) + T(500, 300, 'Hair erector', { size: 13 }) + T(500, 316, 'muscle', { size: 13 }) + T(500, 250, 'Sweat gland', { size: 13 });
    return wrap(W, H + 20, o.aria || 'Skin responses when the body is too hot and too cold', '', g);
  }

  /* ---------- endocrine glands ---------- */
  function endocrine(o = {}) {
    const W = 900, H = 580, cx = 450;
    let g = `<g fill="#e7c2a8" opacity=".9"><circle cx="${cx}" cy="96" r="44"/><rect x="${cx - 16}" y="132" width="32" height="40"/><rect x="${cx - 92}" y="166" width="184" height="270" rx="46"/>
      <rect x="${cx - 130}" y="176" width="40" height="230" rx="20" transform="rotate(8 ${cx - 110} 176)"/><rect x="${cx + 90}" y="176" width="40" height="230" rx="20" transform="rotate(-8 ${cx + 110} 176)"/>
      <rect x="${cx - 80}" y="410" width="66" height="140" rx="24"/><rect x="${cx + 14}" y="410" width="66" height="140" rx="24"/></g>`;
    const gl = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#fff" stroke-width="2"/>`;
    g += gl(cx, 96, 8, '#8e5bd6') + gl(cx - 12, 156, 9, '#3f7fd6') + gl(cx + 12, 156, 9, '#3f7fd6') + gl(cx - 34, 300, 9, '#e0a64a') + gl(cx + 34, 300, 9, '#e0a64a') + `<ellipse cx="${cx + 12}" cy="330" rx="34" ry="10" fill="#3fb27f" stroke="#fff" stroke-width="2"/>` + gl(cx - 30, 392, 8, '#e0533f') + gl(cx + 30, 392, 8, '#e0533f');
    const labs = [{ x: cx - 8, y: 96, t: "Pituitary gland: the 'master gland' (FSH, LH, ADH, TSH)", side: 'l', ly: 70 }, { x: cx - 20, y: 156, t: 'Thyroid: thyroxine controls metabolic rate', side: 'l', ly: 180 },
      { x: cx - 42, y: 300, t: 'Adrenal glands: adrenaline (fight or flight)', side: 'l', ly: 290 }, { x: cx + 46, y: 330, t: 'Pancreas: insulin and glucagon control blood glucose', side: 'r', ly: 330 },
      { x: cx - 36, y: 392, t: 'Ovaries (female): oestrogen and progesterone', side: 'l', ly: 400 }, { x: cx + 36, y: 392, t: 'Testes (male): testosterone', side: 'r', ly: 410 }];
    g += T(cx, 572, 'Glands secrete hormones into the blood, which carries them to target organs', { size: 13 });
    return wrap(W, H, o.aria || 'Positions of the main endocrine glands in the body', '', g + labels(labs, { W, H, lx: 290, rx: 610, size: 14 }));
  }

  /* ---------- carbon cycle ---------- */
  function carbonCycle(o = {}) {
    const W = 980, H = 520;
    let g = `<rect x="330" y="30" width="320" height="64" rx="32" fill="#7f9fb8" opacity=".5" stroke="#9fc0d8" stroke-width="2"/>` + T(490, 70, 'Carbon dioxide in the air', { size: 17, w: 700 });
    g += `<path d="M0 430H980V520H0Z" fill="#4d7a3a"/><path d="M0 470H980V520H0Z" fill="#6b4a2f"/>`;
    // plant
    g += `<path d="M150 430V300" stroke="#6b4a2f" stroke-width="12"/><circle cx="150" cy="270" r="60" fill="#3f9b3f"/><circle cx="110" cy="300" r="34" fill="#4fb04f"/><circle cx="190" cy="300" r="34" fill="#4fb04f"/>` + T(150, 200, 'Green plants', { size: 14, w: 700 });
    // animal (cow)
    g += `<rect x="420" y="360" width="110" height="52" rx="20" fill="#f2f2f2" stroke="#999"/><circle cx="440" cy="380" r="10" fill="#333"/><rect x="520" y="345" width="40" height="34" rx="12" fill="#f2f2f2" stroke="#999"/>${[430, 450, 500, 520].map(x => `<rect x="${x}" y="408" width="8" height="24" fill="#ddd"/>`).join('')}` + T(475, 340, 'Animals', { size: 14, w: 700 });
    // decomposers
    g += `<path d="M700 430q20 -40 40 0z" fill="#c9a07a"/><path d="M712 430v-8M728 430v-8" stroke="#a07a5a" stroke-width="4"/><path d="M760 430q16 -30 32 0z" fill="#d9b48a"/>` + T(745, 455, 'Decomposers (microorganisms)', { size: 14, w: 700, fill: '#fff' });
    // fossil fuels
    g += `<rect x="830" y="476" width="120" height="30" rx="6" fill="#222"/>` + T(890, 496, 'Fossil fuels', { size: 13, w: 700, fill: '#fff' }) + T(900, 520 - 4, '', {}) + `<rect x="880" y="300" width="40" height="130" fill="#8a8f98"/><rect x="866" y="290" width="68" height="16" fill="#6a6f78"/>` + T(900, 280, 'Combustion', { size: 13, w: 700 });
    const lbl = (x, y, t, c) => T(x, y, t, { size: 13, w: 700, fill: c });
    g += arrow(380, 96, 200, 210, '#3fb27f', 4, 14) + lbl(250, 140, 'Photosynthesis', '#3fb27f');
    g += arrow(230, 230, 400, 100, '#e0663a', 3, 12) + lbl(352, 176, 'Respiration', '#e0663a');
    g += arrow(214, 300, 414, 380, '#e0a64a', 3, 12) + lbl(310, 312, 'Feeding', '#e0a64a');
    g += arrow(540, 400, 696, 422, '#c9a07a', 3, 12) + arrow(170, 445, 690, 445, '#c9a07a', 2, 10) + T(400, 500, 'Death and waste (plants and animals) → decomposers', { size: 13, w: 700, fill: '#fff' });
    g += arrow(500, 340, 520, 100, '#e0663a', 3, 12) + lbl(560, 220, 'Respiration', '#e0663a');
    g += arrow(740, 410, 620, 96, '#e0663a', 3, 12) + lbl(720, 300, 'Respiration', '#e0663a');
    g += arrow(900, 300, 650, 80, '#8a8f98', 3, 12) + arrow(890, 474, 900, 440, '#8a8f98', 2, 8);
    return wrap(W, H, o.aria || 'The carbon cycle: photosynthesis, respiration, feeding, decay and combustion', '', g);
  }

  /* ---------- tropisms ---------- */
  function tropism(o = {}) {
    const W = 900, H = 440, r = S._rnd(4);
    let g = `<rect x="60" y="330" width="360" height="40" fill="#6b4a2f"/><rect x="480" y="330" width="360" height="40" fill="#6b4a2f"/>`;
    // phototropism
    g += `<circle cx="80" cy="90" r="34" fill="#ffd84a"/>` + [0, 1, 2].map(i => arrow(120, 100 + i * 20, 180, 130 + i * 20, '#ffd84a', 2.5, 10)).join('');
    g += `<path d="M290 330C290 240 286 180 236 130" stroke="#5aa84a" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M236 130l-30 -10 22 30z" fill="#4f9b3f"/>`;
    for (let i = 0; i < 10; i++) g += `<circle cx="${f(296 + r() * 6)}" cy="${f(170 + r() * 120)}" r="3.5" fill="#e0533f"/>`;
    g += T(240, 40, 'Phototropism: shoot grows towards light', { size: 16, w: 700 }) + T(240, 400, 'Auxin collects on the shaded side;', { size: 13 }) + T(240, 418, 'cells there elongate more, so the shoot bends', { size: 13 });
    // gravitropism
    g += `<path d="M560 200C620 200 660 210 690 230" stroke="#5aa84a" stroke-width="12" fill="none"/><ellipse cx="560" cy="200" rx="22" ry="14" fill="#c9a07a"/><path d="M690 230C720 250 730 290 732 380" stroke="#e8d6b0" stroke-width="10" fill="none"/><path d="M690 230C710 210 740 170 742 120" stroke="#5aa84a" stroke-width="10" fill="none"/>`;
    g += arrow(820, 160, 820, 260, 'currentColor', 3) + T(830, 210, 'gravity', { size: 13, a: 'start' });
    g += T(660, 40, 'Gravitropism: roots grow down, shoots grow up', { size: 16, w: 700 }) + T(660, 400, 'In roots, auxin on the lower side', { size: 13 }) + T(660, 418, 'slows growth, so the root bends downwards', { size: 13 });
    return wrap(W, H, o.aria || 'Phototropism in a shoot and gravitropism in a germinating seed', '', g);
  }

  /* ---------- pyramid of biomass ---------- */
  function biomassPyramid(o = {}) {
    const W = 960, H = 420, cx = 380;
    const lv = [['Tertiary consumer', 'hawk', 170, '#b8433a'], ['Secondary consumer', 'blue tit', 240, '#e0663a'], ['Primary consumer', 'caterpillars', 360, '#e0a64a'], ['Producer', 'oak tree', 560, '#3f9b3f']];
    let g = '';
    lv.forEach(([n, e, w, c], i) => { const y = 70 + i * 74; g += `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="60" rx="6" fill="${c}"/>` + T(cx, y + 26, n, { size: 15, w: 700, fill: '#fff' }) + T(cx, y + 45, 'e.g. ' + e, { size: 12, fill: '#fff' }); if (i < 3) g += wavy(cx + w / 2 + 6, y + 60, cx + w / 2 + 60, y + 50, '#ef5b4c', 2); });
    g += T(cx + 300, 120, 'Biomass lost at each stage:', { size: 13, a: 'start' }) + T(cx + 300, 138, 'not all eaten, egested as faeces,', { size: 13, a: 'start' }) + T(cx + 300, 156, 'excreted, used in respiration', { size: 13, a: 'start' }) + T(cx + 300, 184, 'Only about 10% is passed on', { size: 13, w: 700, a: 'start' });
    g += T(cx, 40, 'Pyramid of biomass: bar width shows the dry mass at each trophic level', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'A pyramid of biomass with four trophic levels', '', g);
  }

  /* ---------- cell membrane (fluid mosaic) ---------- */
  function membrane(o = {}) {
    const W = 1200, H = 340, y1 = 170, y2 = 270;
    let g = `<rect x="60" y="${y1 - 10}" width="820" height="${y2 - y1 + 20}" fill="#f5e3a6" opacity=".25"/>`;
    const head = (x, y, up) => `<circle cx="${x}" cy="${y}" r="10" fill="#e0663a"/><path d="M${x - 4} ${y + (up ? 10 : -10)}q-4 ${up ? 18 : -18} 0 ${up ? 36 : -36}M${x + 4} ${y + (up ? 10 : -10)}q4 ${up ? 18 : -18} 0 ${up ? 36 : -36}" stroke="#e0a64a" stroke-width="2.5" fill="none"/>`;
    for (let x = 70; x <= 870; x += 22) { if ((x > 300 && x < 380) || (x > 560 && x < 650)) continue; g += head(x, y1, true) + head(x, y2, false); }
    g += `<path d="M310 ${y1 - 30}h60v${y2 - y1 + 60}h-60z" fill="#5a8fd6" opacity=".9"/><rect x="330" y="${y1 - 30}" width="20" height="${y2 - y1 + 60}" fill="#f5e3a6" opacity=".6"/>`;
    g += `<path d="M566 ${y1 - 24}q40 -20 80 0v${y2 - y1 + 48}q-40 20 -80 0z" fill="#3fb27f"/>`;
    g += `<ellipse cx="460" cy="${y1 + 20}" rx="40" ry="34" fill="#8e5bd6" opacity=".85"/><path d="M460 ${y1 - 14}v-30m0 0l-14 -16m14 16l14 -16m-14 -16l0 -10" stroke="#ffd84a" stroke-width="4" fill="none"/>`;
    g += `<rect x="200" y="${y1 + 14}" width="8" height="30" rx="3" fill="#f2d23a"/><rect x="752" y="${y2 - 44}" width="8" height="30" rx="3" fill="#f2d23a"/>`;
    const labs = [{ x: 158, y: y1, t: 'Phospholipid: hydrophilic head', side: 'l', ly: 60 }, { x: 160, y: y1 + 30, t: 'Hydrophobic fatty acid tails', side: 'l', ly: 330 },
      { x: 340, y: y1 - 30, t: 'Channel protein (lets ions through)', side: 'l', ly: 110 }, { x: 460, y: y1 - 52, t: 'Glycoprotein: cell recognition and signalling', side: 'r', ly: 60 },
      { x: 606, y: y1 - 24, t: 'Carrier protein (active transport, facilitated diffusion)', side: 'r', ly: 110 }, { x: 204, y: y1 + 30, t: 'Cholesterol: regulates fluidity', side: 'l', ly: 380 }, { x: 860, y: y2 + 10, t: 'Inside the cell', side: 'r', ly: 360 }];
    labs.forEach(l => { l.x = 250 + 0.75 * l.x; l.y = 50 + 0.75 * l.y; if (l.ly) l.ly = 50 + 0.75 * l.ly; }); return wrap(W, H, o.aria || 'Fluid mosaic model of the cell-surface membrane', '', `<g transform="translate(250 50) scale(.75)">${g}</g>` + labels(labs, { W, H, lx: 240, rx: 930, size: 14 }));
  }

  /* ---------- menstrual cycle hormones ---------- */
  function menstrualCycle(o = {}) {
    const W = 960, H = 440, x0 = 110, x1 = 900, yb = 300, sx = (x1 - x0) / 28;
    const curve = (fn, c, name, lx) => { let d = ''; for (let t = 0; t <= 28; t += 0.25) d += (t ? 'L' : 'M') + f(x0 + t * sx) + ' ' + f(yb - fn(t)); return `<path d="${d}" stroke="${c}" stroke-width="3.5" fill="none"/>` + T(x0 + lx * sx, yb - fn(lx) - 10, name, { size: 13, w: 700, fill: c }); };
    const gs = (t, m, s, h) => h * Math.exp(-((t - m) ** 2) / (2 * s * s));
    let g = `<path d="M${x0} 60V${yb}H${x1}" stroke="currentColor" stroke-width="2" fill="none"/>`;
    for (let d = 0; d <= 28; d += 7) g += T(x0 + d * sx, yb + 20, String(d), { size: 12 });
    g += T((x0 + x1) / 2, yb + 40, 'Day of the cycle', { size: 13 }) + T(60, 170, 'Hormone level', { size: 13 }).replace('<text', '<text transform="rotate(-90 60 170)"');
    g += curve(t => 30 + gs(t, 3, 3, 40) + gs(t, 14, 1.2, 70), '#3f7fd6', 'FSH', 3.5);
    g += curve(t => 20 + gs(t, 14, 1.1, 190), '#8e5bd6', 'LH', 17);
    g += curve(t => 25 + gs(t, 12.5, 3, 150) + gs(t, 21, 3, 60), '#e0533f', 'Oestrogen', 8);
    g += curve(t => 15 + gs(t, 21, 3.5, 130), '#3fb27f', 'Progesterone', 23.5);
    g += `<path d="M${x0 + 14 * sx} 60V${yb}" stroke="#ffd84a" stroke-dasharray="6 5" stroke-width="2"/>` + T(x0 + 14 * sx, 52, 'Ovulation (about day 14)', { size: 13, w: 700, fill: '#e0a64a' });
    let lin = `M${x0} 400`; for (let t = 0; t <= 28; t += 0.5) { const th = t < 5 ? 6 : t < 14 ? 6 + (t - 5) * 3 : t < 24 ? 33 : 33 - (t - 24) * 6; lin += `L${f(x0 + t * sx)} ${f(400 - th)}`; } lin += `L${x1} 400Z`;
    g += `<path d="${lin}" fill="#d97a8a" opacity=".8"/>` + T(x0 - 10, 392, 'Uterus lining', { size: 12, a: 'end' }) + `<rect x="${x0}" y="402" width="${5 * sx}" height="10" fill="#b8322f"/>` + T(x0 + 2.5 * sx, 428, 'Menstruation', { size: 12 });
    return wrap(W, H, o.aria || 'Hormone levels and the uterus lining during the menstrual cycle', '', g);
  }

  /* ---------- genetic engineering with a plasmid ---------- */
  function plasmidGE(o = {}) {
    const W = 1000, H = 400;
    const ring = (x, y, gap, ins) => { let s = `<circle cx="${x}" cy="${y}" r="44" fill="none" stroke="#3f7fd6" stroke-width="8"${gap ? ' stroke-dasharray="230 46"' : ''}/>`; if (ins) s += `<path d="M${x + 30} ${y - 32}A44 44 0 0 1 ${x + 44} ${y + 4}" stroke="#e0533f" stroke-width="9" fill="none"/>`; return s; };
    let g = '';
    g += `<path d="M40 100h180" stroke="#8e5bd6" stroke-width="10"/><path d="M100 100h60" stroke="#e0533f" stroke-width="10"/>` + T(130, 80, 'Human DNA', { size: 13 }) + T(130, 132, 'Restriction enzyme cuts', { size: 12 }) + T(130, 148, 'out the gene (sticky ends)', { size: 12 });
    g += `<path d="M110 220h40" stroke="#e0533f" stroke-width="10"/>` + T(130, 250, 'Insulin gene', { size: 13, w: 700 }) + arrow(130, 160, 130, 205, 'currentColor', 2, 9);
    g += ring(130, 330, true, false) + T(130, 392, 'Plasmid cut open by the same enzyme', { size: 12 });
    g += arrow(200, 230, 300, 250, 'currentColor', 3) + arrow(180, 320, 300, 278, 'currentColor', 3) + ring(360, 260, false, true) + T(360, 330, 'DNA ligase joins the gene', { size: 12 }) + T(360, 346, 'into the plasmid (recombinant DNA)', { size: 12 });
    g += arrow(430, 260, 520, 260, 'currentColor', 3);
    g += `<rect x="530" y="200" width="160" height="110" rx="55" fill="#d8c08a" stroke="#8a6d3b" stroke-width="3"/><circle cx="610" cy="255" r="22" fill="none" stroke="#3f7fd6" stroke-width="5"/><path d="M624 240A22 22 0 0 1 632 258" stroke="#e0533f" stroke-width="6" fill="none"/>` + T(610, 340, 'Plasmid inserted into a bacterium', { size: 12 });
    g += arrow(700, 255, 780, 255, 'currentColor', 3);
    for (let i = 0; i < 6; i++) { const x = 800 + (i % 3) * 58, y = 205 + Math.floor(i / 3) * 62; g += `<rect x="${x}" y="${y}" width="50" height="34" rx="17" fill="#d8c08a" stroke="#8a6d3b" stroke-width="2"/>`; }
    g += T(888, 320, 'Bacteria multiply and', { size: 12 }) + T(888, 336, 'make human insulin', { size: 12 });
    g += T(W / 2, 36, 'Genetic engineering: transferring a human gene using a plasmid vector', { size: 16, w: 700 });
    return wrap(W, H, o.aria || 'Steps in genetically engineering bacteria to make insulin', '', g);
  }


  /* ======================= WAVE 3 ======================= */
  /* simple axes helper for sketch graphs */
  const axes = (x0, y0, w, h, xl, yl) => `<path d="M${x0} ${y0 - h}V${y0}H${x0 + w}" stroke="currentColor" stroke-width="2.5" fill="none"/>` + arrow(x0, y0 - h + 10, x0, y0 - h - 6, 'currentColor', 2.5, 10) + arrow(x0 + w - 10, y0, x0 + w + 6, y0, 'currentColor', 2.5, 10) + T(x0 + w / 2, y0 + 34, xl, { size: 14 }) + T(x0 + 14, y0 - h + 4, yl, { size: 14, a: 'start' });
  const cell = (x, y) => `<path d="M${x - 6} ${y - 18}V${y + 18}M${x + 6} ${y - 10}V${y + 10}" stroke="currentColor" stroke-width="3.5"/>`;
  const lamp = (x, y) => `<circle cx="${x}" cy="${y}" r="15" fill="#fff6c8" stroke="currentColor" stroke-width="2.5"/><path d="M${x - 10} ${y - 10}L${x + 10} ${y + 10}M${x + 10} ${y - 10}L${x - 10} ${y + 10}" stroke="#3a3f47" stroke-width="2"/>`;
  const meter = (x, y, l) => `<circle cx="${x}" cy="${y}" r="15" fill="var(--panel,#121a33)" stroke="currentColor" stroke-width="2.5"/>` + T(x, y + 6, l, { size: 15, w: 700 });

  /* ---------- series and parallel circuits ---------- */
  function seriesParallel(o = {}) {
    const W = 980, H = 440;
    let g = '';
    // series
    g += `<path d="M80 120H420V320H80Z" stroke="currentColor" stroke-width="2.5" fill="none"/>` + `<rect x="236" y="104" width="28" height="32" fill="var(--panel,#121a33)"/>` + cell(250, 120);
    g += `<rect x="173" y="300" width="34" height="40" fill="var(--panel,#121a33)"/>${lamp(190, 320)}<rect x="303" y="300" width="34" height="40" fill="var(--panel,#121a33)"/>${lamp(320, 320)}` + meter(420, 220, 'A') + meter(80, 220, 'A');
    g += `<path d="M175 320V380H205V320" stroke="currentColor" stroke-width="2" fill="none" opacity="0"/><path d="M160 360H220" stroke="currentColor" stroke-width="2"/><path d="M160 320V360M220 320V360" stroke="currentColor" stroke-width="2"/>` + meter(190, 360, 'V');
    g += T(250, 50, 'Series circuit', { size: 17, w: 700 }) + T(250, 72, 'one loop', { size: 13 });
    g += T(250, 404, 'Same current everywhere; the supply p.d. is shared', { size: 13 }) + T(250, 422, 'R total = R₁ + R₂', { size: 13 });
    // parallel
    g += `<path d="M560 120H900V320H560Z" stroke="currentColor" stroke-width="2.5" fill="none"/><path d="M640 120V320M820 120V320" stroke="none"/><path d="M600 220H860" stroke="none"/>`;
    g += `<rect x="716" y="104" width="28" height="32" fill="var(--panel,#121a33)"/>` + cell(730, 120);
    g += `<path d="M560 220H900" stroke="currentColor" stroke-width="2.5"/><rect x="713" y="200" width="34" height="40" fill="var(--panel,#121a33)"/>${lamp(730, 220)}<rect x="713" y="300" width="34" height="40" fill="var(--panel,#121a33)"/>${lamp(730, 320)}`;
    g += meter(620, 220, 'A') + meter(620, 320, 'A') + meter(560, 170, 'A');
    g += T(730, 50, 'Parallel circuit', { size: 17, w: 700 }) + T(730, 72, 'separate branches', { size: 13 });
    g += T(730, 404, 'Branch currents add up to the supply current;', { size: 13 }) + T(730, 422, 'same p.d. across each branch; R total is less than the smallest R', { size: 13 });
    return wrap(W, H, o.aria || 'Series and parallel circuits with ammeters and a voltmeter', '', g);
  }

  /* ---------- a.c. and d.c. ---------- */
  function acdc(o = {}) {
    const W = 960, H = 360;
    const scr = (x, title, path, note) => `<rect x="${x}" y="70" width="400" height="220" rx="14" fill="#0e2a24" stroke="#5a6b7d" stroke-width="4"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${x + 20 + i * 45} 80V280" stroke="#2f6b5a" stroke-width="1"/>`).join('')}${Array.from({ length: 5 }, (_, i) => `<path d="M${x + 10} ${100 + i * 45}H${x + 390}" stroke="#2f6b5a" stroke-width="1"/>`).join('')}<path d="M${x + 10} 190H${x + 390}" stroke="#4f9b85" stroke-width="1.5"/><path d="${path}" stroke="#5ff2c0" stroke-width="3.5" fill="none"/>` + T(x + 200, 50, title, { size: 17, w: 700 }) + T(x + 200, 320, note, { size: 13 });
    let ac = `M40 190`; for (let t = 0; t <= 380; t += 2) ac += `L${40 + t} ${f(190 - 70 * Math.sin(2 * Math.PI * t / 150))}`;
    let g = scr(520, 'Direct p.d. (d.c.), e.g. a cell', `M530 130H910`, 'Constant; current always flows one way');
    g += scr(20, 'Alternating p.d. (a.c.), e.g. mains', ac.replace('M40', 'M30').replace(/L(\d+)/g, (m, x) => 'L' + (x - 10)), 'UK mains: 230 V, 50 Hz; direction keeps reversing');
    return wrap(W, H, o.aria || 'Oscilloscope traces of alternating and direct potential difference', '', g);
  }

  /* ---------- heating curve ---------- */
  function heatingCurve(o = {}) {
    const W = 900, H = 440, x0 = 150, y0 = 360;
    let g = axes(x0, y0, 700, 300, 'Time (energy supplied at a steady rate)', 'Temperature');
    const pts = [[0, 40], [120, 120], [260, 120], [360, 220], [560, 220], [660, 300]];
    g += `<path d="M${pts.map(([x, y]) => `${x0 + x} ${y0 - y}`).join('L')}" stroke="#e0663a" stroke-width="4" fill="none"/>`;
    g += `<path d="M${x0} ${y0 - 120}H${x0 + 120}M${x0} ${y0 - 220}H${x0 + 360}" stroke="currentColor" stroke-dasharray="5 5" opacity=".6"/>` + T(x0 - 10, y0 - 116, 'melting point', { size: 12, a: 'end' }) + T(x0 - 10, y0 - 216, 'boiling point', { size: 12, a: 'end' });
    g += T(x0 + 50, y0 - 60, 'solid', { size: 14, w: 700, a: 'start' }) + T(x0 + 190, y0 - 132, 'melting', { size: 14, w: 700 }) + T(x0 + 190, y0 - 96, 'solid + liquid', { size: 12 }) + T(x0 + 290, y0 - 150, 'liquid', { size: 14, w: 700 }) + T(x0 + 460, y0 - 232, 'boiling', { size: 14, w: 700 }) + T(x0 + 460, y0 - 196, 'liquid + gas', { size: 12 }) + T(x0 + 620, y0 - 290, 'gas', { size: 14, w: 700 });
    g += T(450, 40, 'Flat sections: energy breaks bonds between particles (latent heat), so temperature stays constant', { size: 14 });
    return wrap(W, H, o.aria || 'Heating curve showing melting and boiling at constant temperature', '', g);
  }

  /* ---------- resultant force ---------- */
  function resultantForce(o = {}) {
    const W = 960, H = 360;
    const crate = (x, y) => `<rect x="${x - 50}" y="${y - 40}" width="100" height="80" rx="6" fill="#c9a06a" stroke="#8a6a3a" stroke-width="3"/><path d="M${x - 50} ${y - 40}L${x + 50} ${y + 40}M${x + 50} ${y - 40}L${x - 50} ${y + 40}" stroke="#8a6a3a" stroke-width="2"/>`;
    let g = `<path d="M40 240H920" stroke="currentColor" stroke-width="3"/>`;
    g += crate(240, 200) + arrow(290, 200, 450, 200, '#3fb27f', 6, 18) + T(370, 185, '600 N push', { size: 14, w: 700 }) + arrow(190, 200, 90, 200, '#ef5b4c', 6, 18) + T(140, 185, '200 N friction', { size: 14, w: 700 });
    g += T(240, 290, 'Resultant force = 600 − 200 = 400 N to the right', { size: 15, w: 700 }) + T(240, 312, 'unbalanced: the crate accelerates', { size: 13 });
    g += crate(720, 200) + arrow(770, 200, 880, 200, '#3fb27f', 6, 18) + T(825, 185, '300 N', { size: 14, w: 700 }) + arrow(670, 200, 560, 200, '#ef5b4c', 6, 18) + T(615, 185, '300 N', { size: 14, w: 700 });
    g += T(720, 290, 'Resultant force = 0', { size: 15, w: 700 }) + T(720, 312, 'balanced: stays still or moves at constant velocity', { size: 13 });
    g += T(480, 50, 'Arrow length shows the size of each force', { size: 15 });
    return wrap(W, H, o.aria || 'Unbalanced and balanced forces on a crate', '', g);
  }

  /* ---------- Hooke's law ---------- */
  function springHooke(o = {}) {
    const W = 980, H = 460;
    let g = `<rect x="60" y="40" width="200" height="14" fill="#8a8f98"/><rect x="150" y="54" width="10" height="20" fill="#8a8f98"/>`;
    let sp = 'M155 74'; for (let i = 0; i < 14; i++) sp += `l${i % 2 ? -18 : 18} 10`; g += `<path d="${sp}l0 16" stroke="#c8792a" stroke-width="3" fill="none"/>`;
    g += `<rect x="135" y="230" width="40" height="40" rx="4" fill="#5a6270"/><rect x="135" y="270" width="40" height="40" rx="4" fill="#5a6270"/>` + T(155, 255, '1 N', { size: 12, fill: '#fff' }) + T(155, 295, '1 N', { size: 12, fill: '#fff' });
    g += `<rect x="230" y="60" width="26" height="320" fill="#f2e6c4" stroke="#b9a77a"/>${Array.from({ length: 33 }, (_, i) => `<path d="M230 ${60 + i * 10}h${i % 5 ? 8 : 14}" stroke="#555" stroke-width="1"/>`).join('')}` + `<path d="M170 214H232" stroke="#ef5b4c" stroke-width="2"/>` + T(160, 410, 'extension = new length − original length', { size: 13 });
    const x0 = 440, y0 = 380;
    g += axes(x0, y0, 470, 300, 'Extension (m)', 'Force (N)');
    g += `<path d="M${x0} ${y0}L${x0 + 300} ${y0 - 220}" stroke="#3f7fd6" stroke-width="4"/><path d="M${x0 + 300} ${y0 - 220}Q${x0 + 380} ${y0 - 270} ${x0 + 450} ${y0 - 280}" stroke="#3f7fd6" stroke-width="4" fill="none" stroke-dasharray="8 6"/>`;
    g += `<circle cx="${x0 + 300}" cy="${y0 - 220}" r="6" fill="#ef5b4c"/>` + T(x0 + 310, y0 - 232, 'limit of proportionality', { size: 13, a: 'end' });
    g += T(x0 + 150, y0 - 60, 'F = k e', { size: 18, w: 700 }) + T(x0 + 150, y0 - 38, 'straight line through the origin', { size: 13 }) + T(x0 + 150, y0 - 20, 'gradient = spring constant k', { size: 13 });
    return wrap(W, H, o.aria || 'Spring stretched by weights and a force–extension graph', '', g);
  }

  /* ---------- distance–time graph ---------- */
  function dtGraph(o = {}) {
    const W = 900, H = 420, x0 = 140, y0 = 350;
    let g = axes(x0, y0, 700, 290, 'Time (s)', 'Distance (m)');
    g += `<path d="M${x0} ${y0}L${x0 + 200} ${y0 - 140}H${x0 + 360}L${x0 + 460} ${y0 - 180}Q${x0 + 560} ${y0 - 210} ${x0 + 680} ${y0 - 290}" stroke="#3f7fd6" stroke-width="4" fill="none"/>`;
    g += T(x0 + 90, y0 - 120, 'A: steep straight line:', { size: 13, a: 'end' }) + T(x0 + 90, y0 - 104, 'constant, fast speed', { size: 12, a: 'end' }) + T(x0 + 280, y0 - 154, 'B: flat: stationary', { size: 13 }) + T(x0 + 470, y0 - 150, 'C: gentler slope:', { size: 13, a: 'start' }) + T(x0 + 470, y0 - 134, 'constant, slower speed', { size: 12, a: 'start' }) + T(x0 + 580, y0 - 262, 'D: curve getting steeper:', { size: 13, a: 'end' }) + T(x0 + 580, y0 - 246, 'accelerating', { size: 12, a: 'end' });
    g += `<path d="M${x0 + 40} ${y0 - 28}H${x0 + 140}V${y0 - 98}" stroke="#e0a64a" stroke-width="2" stroke-dasharray="5 4" fill="none"/>` + T(x0 + 150, y0 - 50, 'speed = gradient = Δd ÷ Δt', { size: 13, a: 'start', fill: '#e0a64a' });
    return wrap(W, H, o.aria || 'Distance–time graph showing constant speed, stationary and acceleration', '', g);
  }

  /* ---------- pressure in a liquid ---------- */
  function liquidPressure(o = {}) {
    const W = 860, H = 440;
    let g = `<rect x="200" y="60" width="160" height="320" rx="6" fill="#9fd4e6" fill-opacity=".45" stroke="#cfe0ea" stroke-width="4"/><path d="M200 80H360" stroke="#5aa9f0" stroke-width="2"/>`;
    [[130, 50], [210, 110], [290, 170]].forEach(([y, d], i) => { g += `<circle cx="360" cy="${y + 40}" r="5" fill="#cfe0ea"/><path d="M364 ${y + 40}Q${364 + d} ${y + 30} ${364 + d * 1.6} ${380}" stroke="#5aa9f0" stroke-width="${4 + i}" fill="none"/>`; });
    g += `<path d="M180 80V380" stroke="currentColor" stroke-width="2"/>` + arrow(180, 100, 180, 370, 'currentColor', 2) + T(170, 230, 'depth', { size: 13, a: 'end' });
    g += T(560, 150, 'Water spurts further from lower holes:', { size: 14, a: 'start' }) + T(560, 172, 'pressure increases with depth', { size: 14, w: 700, a: 'start' }) + T(560, 214, 'p = h ρ g', { size: 18, w: 700, a: 'start' }) + T(560, 238, 'h = depth (m), ρ = density (kg/m³)', { size: 13, a: 'start' }) + T(560, 256, 'g = 9.8 N/kg', { size: 13, a: 'start' });
    g += T(430, 420, 'Pressure acts in all directions, at right angles to any surface', { size: 13 });
    return wrap(W, H, o.aria || 'Water spurting from holes at different depths in a container', '', g);
  }

  /* ---------- nuclear fission chain reaction ---------- */
  function fission(o = {}) {
    const W = 980, H = 420, r = S._rnd(15);
    const nuc = (x, y, R, c) => { let s = ''; for (let i = 0; i < Math.round(R * R / 18); i++) { const a = r() * 6.3, d = Math.sqrt(r()) * (R - 5); s += `<circle cx="${f(x + Math.cos(a) * d)}" cy="${f(y + Math.sin(a) * d)}" r="5" fill="${i % 2 ? '#e0533f' : '#9aa4b0'}"/>`; } return s + T(x, y + R + 18, c, { size: 13 }); };
    const n = (x, y) => `<circle cx="${x}" cy="${y}" r="6" fill="#9aa4b0" stroke="#fff"/>`;
    let g = n(60, 210) + arrow(70, 210, 140, 210, 'currentColor', 2.5, 10) + T(80, 190, 'neutron', { size: 12, a: 'start' });
    g += nuc(200, 210, 46, 'uranium-235');
    g += arrow(250, 210, 300, 210, 'currentColor', 2.5, 10) + nuc(350, 140, 30, 'smaller nucleus') + nuc(350, 290, 26, 'smaller nucleus') + `<path d="${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, rr = i % 2 ? 10 : 24; return (i ? 'L' : 'M') + f(410 + Math.cos(a) * rr) + ' ' + f(215 + Math.sin(a) * rr); }).join('')}Z" fill="#ffd84a"/>` + T(410, 254, 'energy', { size: 12 });
    [[150], [210], [270]].forEach(([y], i) => { g += arrow(440, 215, 560, y, 'currentColor', 2, 9) + n(570, y) + arrow(580, y, 660, y + (i - 1) * 30, 'currentColor', 2, 9); g += nuc(700, y + (i - 1) * 30 + (i - 1) * 20, 26, ''); });
    g += T(490, 40, 'Each fission releases 2 or 3 neutrons, which can split more nuclei: a chain reaction', { size: 14, w: 700 });
    g += T(490, 400, 'In a reactor, control rods absorb neutrons and a moderator slows them down', { size: 13 });
    return wrap(W, H, o.aria || 'Nuclear fission of uranium-235 and a chain reaction', '', g);
  }

  /* ---------- magnetic field around a wire ---------- */
  function wireField(o = {}) {
    const W = 880, H = 420, cx = 300, cy = 220;
    let g = `<ellipse cx="${cx}" cy="${cy}" rx="220" ry="70" fill="#d9c6a5" opacity=".35" stroke="#b9a77a"/>`;
    [40, 80, 125, 175].forEach(rr => { g += `<ellipse cx="${cx}" cy="${cy}" rx="${rr}" ry="${rr * 0.32}" fill="none" stroke="#7fb2ff" stroke-width="2"/>` + arrow(cx + 6, cy + rr * 0.32, cx - 8, cy + rr * 0.32, '#7fb2ff', 0, 10); });
    g += `<rect x="${cx - 6}" y="40" width="12" height="340" fill="#c8792a"/>` + arrow(cx, 120, cx, 60, '#ffd84a', 4, 14) + T(cx + 18, 80, 'current', { size: 14, a: 'start', fill: '#e0a64a' });
    g += arrow(680, 250, 680, 90, '#ffd84a', 5, 16) + `<path d="M640 190A40 14 0 1 0 720 190" stroke="#7fb2ff" stroke-width="4" fill="none"/><path d="M720 190A40 14 0 0 0 640 190" stroke="#7fb2ff" stroke-width="4" fill="none" stroke-dasharray="6 6"/>` + arrow(700, 203, 690, 204, '#7fb2ff', 0, 12) + T(700, 110, 'thumb', { size: 12, a: 'start' }) + T(730, 190, 'fingers', { size: 12, a: 'start' }) + T(680, 300, 'Right-hand grip rule:', { size: 14, w: 700 }) + T(680, 320, 'thumb = current direction,', { size: 13 }) + T(680, 338, 'fingers curl the way the field goes', { size: 13 });
    g += T(cx, 410, 'Circular field lines; stronger close to the wire and with a bigger current', { size: 13 });
    return wrap(W, H, o.aria || 'Circular magnetic field around a straight current-carrying wire', '', g);
  }

  /* ---------- satellite orbit ---------- */
  function orbit(o = {}) {
    const W = 860, H = 460, cx = 330, cy = 240, R = 170, k = id('o');
    let g = `<defs><radialGradient id="${k}" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#6fb2f0"/><stop offset="1" stop-color="#1f5aa8"/></radialGradient></defs>`;
    g += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 6" opacity=".7"/><circle cx="${cx}" cy="${cy}" r="70" fill="url(#${k})"/><path d="M${cx - 40} ${cy - 30}q20 -20 40 -6t30 20q-20 30 -50 16z" fill="#5aa84a"/>`;
    const a = -0.6, sx = cx + R * Math.cos(a), sy = cy + R * Math.sin(a);
    g += `<rect x="${f(sx - 12)}" y="${f(sy - 9)}" width="24" height="18" fill="#c9ccd2"/><rect x="${f(sx - 44)}" y="${f(sy - 5)}" width="28" height="10" fill="#3f6fd6"/><rect x="${f(sx + 16)}" y="${f(sy - 5)}" width="28" height="10" fill="#3f6fd6"/>`;
    g += arrow(sx, sy, sx + 110 * Math.sin(-a), sy + 110 * Math.cos(a) * -1 + 0, '#3fb27f', 4, 14) + arrow(sx, sy, sx - 80 * Math.cos(a), sy - 80 * Math.sin(a), '#ef5b4c', 4, 14);
    g += T(sx + 100, sy - 70, 'velocity (tangent to the orbit)', { size: 13, a: 'start', fill: '#3fb27f' }) + T(sx + 14, sy + 44, 'gravity: towards the centre', { size: 13, a: 'start', fill: '#ef5b4c' });
    g += T(560, 300, 'The speed stays the same but the', { size: 13, a: 'start' }) + T(560, 318, 'direction keeps changing, so the', { size: 13, a: 'start' }) + T(560, 336, 'velocity changes: it is accelerating', { size: 13, a: 'start' }) + T(560, 354, 'towards the Earth', { size: 13, a: 'start' });
    return wrap(W, H, o.aria || 'Satellite in a circular orbit with velocity and gravitational force arrows', '', g);
  }

  /* ---------- separation techniques ---------- */
  function separation(o = {}) {
    const W = 1000, H = 460;
    let g = '';
    // filtration
    g += `<path d="M100 120L180 120L150 190H130Z" fill="#f4f1e6" stroke="#cfe0ea" stroke-width="3"/><path d="M110 125L170 125L148 180H132Z" fill="#c9a06a" opacity=".7"/><path d="M140 190V230" stroke="#cfe0ea" stroke-width="3"/><path d="M100 250V340Q100 360 120 360H160Q180 360 180 340V250" fill="#9fd4e6" fill-opacity=".35" stroke="#cfe0ea" stroke-width="3"/><rect x="104" y="300" width="72" height="56" fill="#9fd4e6" opacity=".5"/>`;
    g += T(140, 60, 'Filtration', { size: 16, w: 700 }) + T(140, 82, 'separates an insoluble solid', { size: 12 }) + T(60, 150, 'residue', { size: 12, a: 'end' }).replace('x="60"', 'x="104"') + T(140, 390, 'filtrate', { size: 12 });
    // crystallisation
    g += `<path d="M300 260Q300 300 340 300H400Q440 300 440 260" fill="#e0a64a" fill-opacity=".35" stroke="#cfe0ea" stroke-width="3"/><path d="M296 260H444" stroke="#cfe0ea" stroke-width="3"/><rect x="330" y="330" width="80" height="12" fill="#8a8f98"/><path d="M350 342L330 420M390 342L410 420" stroke="#8a8f98" stroke-width="5"/><path d="M362 390q8 -30 8 -40q8 10 8 40z" fill="#4f9bff"/>${[0, 1, 2, 3].map(i => `<path d="M${330 + i * 22} 284l8 -8 8 8 -8 8z" fill="#fff" opacity=".85"/>`).join('')}`;
    g += T(370, 60, 'Crystallisation', { size: 16, w: 700 }) + T(370, 82, 'gets a soluble solid from a solution', { size: 12 }) + T(370, 236, 'heat to evaporate some water,', { size: 12 }) + T(370, 252, 'then leave to cool: crystals form', { size: 12 });
    // simple distillation
    g += `<circle cx="600" cy="300" r="50" fill="#e0a64a" fill-opacity=".25" stroke="#cfe0ea" stroke-width="3"/><path d="M590 252V200H610V252" fill="none" stroke="#cfe0ea" stroke-width="3"/><rect x="595" y="180" width="10" height="40" fill="#ef5b4c"/><path d="M610 215L800 285" stroke="#cfe0ea" stroke-width="10"/><path d="M640 220L790 275" stroke="#5aa9f0" stroke-width="22" opacity=".35"/><path d="M800 285L820 330" stroke="#cfe0ea" stroke-width="5"/><path d="M790 340V400Q790 420 810 420H850Q870 420 870 400V340" fill="#9fd4e6" fill-opacity=".35" stroke="#cfe0ea" stroke-width="3"/><rect x="794" y="384" width="72" height="32" fill="#9fd4e6" opacity=".55"/><path d="M588 392q6 -24 12 -34q6 18 12 34z" fill="#4f9bff"/><rect x="584" y="392" width="32" height="44" rx="3" fill="#8a8f98"/>`;
    g += arrow(650, 205, 670, 212, '#5aa9f0', 0, 0) + T(720, 60, 'Simple distillation', { size: 16, w: 700 }) + T(720, 82, 'separates a solvent from a solution', { size: 12 }) + T(560, 170, 'thermometer', { size: 12, a: 'end' }) + T(760, 230, 'condenser (cold water)', { size: 12, a: 'start' }) + T(830, 445, 'pure distillate', { size: 12 }) + T(570, 420, 'heat', { size: 12, a: 'end' });
    return wrap(W, H, o.aria || 'Filtration, crystallisation and simple distillation apparatus', '', g);
  }

  /* ---------- cracking ---------- */
  function cracking(o = {}) {
    const W = 960, H = 420;
    let g = `<path d="M100 200H460" stroke="#cfe0ea" stroke-width="4"/><path d="M100 160H460V240H100Z" fill="#e8f3f8" fill-opacity=".15" stroke="#cfe0ea" stroke-width="3"/><rect x="110" y="170" width="70" height="60" fill="#f4f1e6"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${115 + i * 11} 172v56" stroke="#e0c890" stroke-width="2"/>`).join('')}`;
    g += `${Array.from({ length: 8 }, (_, i) => `<rect x="${280 + (i % 4) * 22}" y="${180 + Math.floor(i / 4) * 22}" width="16" height="16" fill="#c9cfd8"/>`).join('')}<path d="M330 330q10 -40 20 -60q10 30 20 60z" fill="#4f9bff"/><rect x="330" y="330" width="40" height="70" fill="#8a8f98"/>`;
    g += `<path d="M460 200H560V330" stroke="#cfe0ea" stroke-width="4" fill="none"/><path d="M500 330H760V380H500Z" fill="#9fd4e6" fill-opacity=".45" stroke="#cfe0ea" stroke-width="3"/><path d="M540 240H580V380H540Z" fill="#e8f3f8" fill-opacity=".2" stroke="#cfe0ea" stroke-width="3"/><rect x="543" y="244" width="34" height="60" fill="#f2f2f2" opacity=".4"/>`;
    g += T(145, 124, 'mineral wool soaked in', { size: 12 }) + T(145, 140, 'liquid paraffin (long alkanes)', { size: 12 }) + T(316, 150, 'hot porous pot / catalyst', { size: 12 }) + T(350, 418, 'heat strongly', { size: 12 });
    g += T(640, 230, 'gas collected over water:', { size: 12, a: 'start' }) + T(640, 246, 'shorter alkenes (decolourise', { size: 12, a: 'start' }) + T(640, 262, 'bromine water) and alkanes', { size: 12, a: 'start' });
    g += T(480, 50, 'Cracking: large alkanes → smaller, more useful alkanes + alkenes', { size: 16, w: 700 }) + T(480, 74, 'e.g. C₁₀H₂₂ → C₈H₁₈ + C₂H₄   (catalytic cracking or steam cracking)', { size: 14 });
    return wrap(W, H, o.aria || 'Laboratory cracking of liquid paraffin over a hot catalyst', '', g);
  }

  /* ---------- addition polymerisation ---------- */
  function polymerisation(o = {}) {
    const W = 980, H = 300;
    const at = (x, y, s) => `<circle cx="${x}" cy="${y}" r="${s === 'C' ? 15 : 11}" fill="${s === 'C' ? '#3a3f47' : '#f2f2f2'}" stroke="#888"/>` + T(x, y + 5, s, { size: s === 'C' ? 14 : 12, w: 700, fill: s === 'C' ? '#fff' : '#333' });
    const bond = (x1, y1, x2, y2, dbl2) => dbl2 ? `<path d="M${x1} ${y1 - 5}H${x2}M${x1} ${y1 + 5}H${x2}" stroke="#aaa" stroke-width="3"/>` : `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#aaa" stroke-width="3"/>`;
    const mono = (x, y, dblb) => bond(x, y, x + 60, y, dblb) + bond(x, y, x, y - 44) + bond(x, y, x, y + 44) + bond(x + 60, y, x + 60, y - 44) + bond(x + 60, y, x + 60, y + 44) + at(x, y - 44, 'H') + at(x, y + 44, 'H') + at(x + 60, y - 44, 'H') + at(x + 60, y + 44, 'H') + at(x, y, 'C') + at(x + 60, y, 'C');
    let g = T(78, 158, 'n', { size: 22, w: 700 }) + mono(110, 150, true) + T(140, 240, 'ethene (monomer)', { size: 14 });
    g += arrow(240, 150, 340, 150, 'currentColor', 3) + T(290, 130, 'heat, pressure,', { size: 12 }) + T(290, 178, 'catalyst', { size: 12 });
    g += `<path d="M380 80V220M640 80V220" stroke="currentColor" stroke-width="3"/><path d="M380 80h10M380 220h10M640 80h-10M640 220h-10" stroke="currentColor" stroke-width="3"/>` + bond(400, 150, 450, 150) + mono(450, 150, false) + bond(510, 150, 560, 150) + bond(560, 150, 620, 150) + T(655, 232, 'n', { size: 22, w: 700, a: 'start' }) + T(510, 260, 'poly(ethene) (polymer)', { size: 14 });
    g += T(820, 120, 'The C=C double bond opens', { size: 13 }) + T(820, 138, 'and the monomers join', { size: 13 }) + T(820, 156, 'in a long chain; no other', { size: 13 }) + T(820, 174, 'product is made', { size: 13 });
    return wrap(W, H, o.aria || 'Addition polymerisation of ethene to poly(ethene)', '', g);
  }

  /* ---------- gas tests ---------- */
  function gasTests(o = {}) {
    const W = 1000, H = 400;
    const tube = (x, fill) => `<path d="M${x - 22} 150V300Q${x - 22} 330 ${x} 330Q${x + 22} 330 ${x + 22} 300V150" fill="${fill || 'none'}" fill-opacity=".35" stroke="#cfe0ea" stroke-width="3"/>`;
    let g = '';
    // hydrogen
    g += tube(125) + `<path d="M140 110L210 60" stroke="#c9a06a" stroke-width="5"/><path d="M128 128q8 -20 16 -10q-2 -16 10 -20q-4 18 -6 30z" fill="#ff8a3a"/>` + T(140, 100, 'POP!', { size: 16, w: 700, fill: '#e0a64a' });
    g += T(125, 360, 'Hydrogen', { size: 15, w: 700 }) + T(125, 380, 'lit splint: squeaky pop', { size: 12 });
    // oxygen
    g += tube(375) + `<path d="M375 120L440 60" stroke="#c9a06a" stroke-width="5"/><path d="M370 128q8 -24 18 -10q4 -18 14 -6q-4 16 -14 22z" fill="#ff8a3a"/>`;
    g += T(375, 360, 'Oxygen', { size: 15, w: 700 }) + T(375, 380, 'glowing splint relights', { size: 12 });
    // carbon dioxide
    g += tube(625, '#d8dde3') + `<rect x="604" y="250" width="42" height="72" fill="#eef1f4" opacity=".9"/><path d="M560 80Q600 80 615 200V260" stroke="#cfe0ea" stroke-width="5" fill="none"/>${[0, 1, 2].map(i => `<circle cx="${618 + i * 6}" cy="${280 - i * 14}" r="4" fill="none" stroke="#fff"/>`).join('')}`;
    g += T(625, 360, 'Carbon dioxide', { size: 15, w: 700 }) + T(625, 380, 'limewater turns milky (cloudy)', { size: 12 });
    // chlorine
    g += tube(875, '#c9e88a') + `<rect x="850" y="70" width="16" height="110" fill="#f4f1e6"/><rect x="850" y="70" width="16" height="60" fill="#7aa8e0"/><rect x="850" y="130" width="16" height="50" fill="#f8f8f8"/>`;
    g += T(875, 360, 'Chlorine', { size: 15, w: 700 }) + T(875, 380, 'damp litmus paper is bleached white', { size: 12 });
    g += T(500, 30, 'The four gas tests', { size: 17, w: 700 });
    return wrap(W, H, o.aria || 'Tests for hydrogen, oxygen, carbon dioxide and chlorine', '', g);
  }

  /* ---------- flame tests ---------- */
  function flameTests(o = {}) {
    const W = 980, H = 380, k = id('fl');
    const ions = [['Lithium, Li⁺', 'crimson', '#d3123a'], ['Sodium, Na⁺', 'yellow', '#ffcf1a'], ['Potassium, K⁺', 'lilac', '#c48fe8'], ['Calcium, Ca²⁺', 'orange-red', '#ff5a2a'], ['Copper, Cu²⁺', 'green', '#2fcf6a']];
    let g = T(490, 36, 'Flame tests: dip a clean wire loop in the sample and hold it in a blue Bunsen flame', { size: 15, w: 700 });
    ions.forEach(([n, c, col], i) => { const x = 110 + i * 190;
      g += `<radialGradient id="${k}${i}" cx=".5" cy=".75" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${col}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient>`;
      g += `<path d="M${x} 90C${x - 50} 160 ${x - 40} 230 ${x} 250C${x + 40} 230 ${x + 50} 160 ${x} 90Z" fill="url(#${k}${i})"/><path d="M${x} 190C${x - 16} 220 ${x - 14} 244 ${x} 252C${x + 14} 244 ${x + 16} 220 ${x} 190Z" fill="#4f9bff" opacity=".8"/>`;
      g += `<rect x="${x - 16}" y="252" width="32" height="70" fill="#8a8f98"/><path d="M${x + 60} 150L${x + 6} 200" stroke="#c9ccd2" stroke-width="3"/><circle cx="${x + 4}" cy="202" r="5" fill="none" stroke="#c9ccd2" stroke-width="2"/>`;
      g += T(x, 346, n, { size: 14, w: 700 }) + T(x, 366, c + ' flame', { size: 13, fill: col }); });
    return wrap(W, H, o.aria || 'Flame test colours for lithium, sodium, potassium, calcium and copper ions', '', g);
  }

  /* ---------- rusting experiment ---------- */
  function rusting(o = {}) {
    const W = 960, H = 420;
    const tube = (x) => `<path d="M${x - 30} 90V320Q${x - 30} 350 ${x} 350Q${x + 30} 350 ${x + 30} 320V90" fill="none" stroke="#cfe0ea" stroke-width="3"/>`;
    const nail = (x, y1, y2, rust) => `<path d="M${x} ${y1}V${y2}" stroke="${rust ? '#a8542a' : '#9aa4b0'}" stroke-width="6"/><path d="M${x - 9} ${y1}H${x + 9}" stroke="${rust ? '#a8542a' : '#9aa4b0'}" stroke-width="5"/>${rust ? [0, 1, 2, 3].map(i => `<circle cx="${x + (i % 2 ? 4 : -4)}" cy="${y1 + 30 + i * 30}" r="4" fill="#c8662a"/>`).join('') : ''}`;
    let g = '';
    g += tube(160) + `<rect x="132" y="200" width="56" height="120" fill="#9fd4e6" opacity=".45"/>` + nail(160, 140, 300, true) + T(160, 380, 'Air and water', { size: 15, w: 700 }) + T(160, 400, 'nail rusts', { size: 13, fill: '#c8662a' });
    g += tube(480) + `<rect x="452" y="150" width="56" height="170" fill="#9fd4e6" opacity=".45"/><rect x="452" y="140" width="56" height="12" fill="#e8d26a"/><rect x="462" y="78" width="36" height="20" rx="3" fill="#c9a06a"/>` + nail(480, 160, 300, false) + T(480, 380, 'Boiled water + oil layer', { size: 15, w: 700 }) + T(480, 400, 'no air: no rust', { size: 13 }) + T(560, 146, 'oil stops air dissolving', { size: 12, a: 'start' });
    g += tube(800) + `<rect x="772" y="270" width="56" height="50" fill="#f4f4f4" opacity=".7"/><rect x="782" y="78" width="36" height="20" rx="3" fill="#c9a06a"/>` + nail(800, 120, 250, false) + T(800, 380, 'Dry air (calcium chloride)', { size: 15, w: 700 }) + T(800, 400, 'no water: no rust', { size: 13 }) + T(740, 296, 'drying agent', { size: 12, a: 'end' });
    g += T(480, 40, 'Iron rusts only when both oxygen (air) and water are present', { size: 16, w: 700 });
    return wrap(W, H, o.aria || 'Rusting experiment with nails in three test tubes', '', g);
  }

  /* ---------- atmosphere composition ---------- */
  function atmospherePie(o = {}) {
    const W = 860, H = 400, cx = 240, cy = 210, R = 150;
    const parts = [['Nitrogen', 78, '#3f7fd6'], ['Oxygen', 21, '#3fb27f'], ['Argon, carbon dioxide and other gases', 1, '#e0a64a']];
    let g = '', a0 = -Math.PI / 2;
    parts.forEach(([n, p, c], i) => { const a1 = a0 + p / 100 * 2 * Math.PI, big = p > 50 ? 1 : 0;
      g += `<path d="M${cx} ${cy}L${f(cx + R * Math.cos(a0))} ${f(cy + R * Math.sin(a0))}A${R} ${R} 0 ${big} 1 ${f(cx + R * Math.cos(a1))} ${f(cy + R * Math.sin(a1))}Z" fill="${c}" stroke="var(--panel,#121a33)" stroke-width="2"/>`;
      g += `<rect x="470" y="${130 + i * 60}" width="26" height="26" rx="4" fill="${c}"/>` + T(508, 150 + i * 60, `${n}: about ${p}%`, { size: 15, a: 'start' }); a0 = a1; });
    g += T(cx, 46, 'Composition of dry air today', { size: 17, w: 700 }) + T(620, 330, 'Carbon dioxide is only about 0.04%', { size: 13 });
    return wrap(W, H, o.aria || 'Pie chart of the composition of the atmosphere', '', g);
  }

  /* ---------- light microscope ---------- */
  function microscope(o = {}) {
    const W = 860, H = 560, x = 380;
    let g = `<path d="M${x - 120} 520H${x + 80}Q${x + 100} 520 ${x + 100} 500V490H${x - 140}V500Q${x - 140} 520 ${x - 120} 520Z" fill="#3a3f47"/>`;
    g += `<path d="M${x + 40} 490V300Q${x + 40} 220 ${x - 20} 190" stroke="#3a3f47" stroke-width="34" fill="none" stroke-linecap="round"/>`;
    g += `<rect x="${x - 120}" y="330" width="170" height="14" rx="4" fill="#5a6270"/><rect x="${x - 70}" y="324" width="70" height="6" fill="#cfe0ea"/><circle cx="${x - 40}" cy="420" r="16" fill="#ffe08a" stroke="#8a8f98" stroke-width="3"/><path d="M${x - 40} 404V350" stroke="#ffe08a" stroke-width="3" stroke-dasharray="4 4"/>`;
    g += `<rect x="${x - 58}" y="60" width="36" height="140" rx="8" fill="#5a6270" transform="rotate(-18 ${x - 40} 130)"/><rect x="${x - 54}" y="34" width="28" height="36" rx="4" fill="#3a3f47" transform="rotate(-18 ${x - 40} 50)"/><path d="M${x - 80} 236l20 50M${x - 50} 240l6 56M${x - 20} 236l-8 46" stroke="#9aa4b0" stroke-width="10" stroke-linecap="round"/><ellipse cx="${x - 50}" cy="232" rx="44" ry="12" fill="#3a3f47"/>`;
    g += `<circle cx="${x + 60}" cy="330" r="22" fill="#5a6270" stroke="#3a3f47" stroke-width="3"/><circle cx="${x + 60}" cy="370" r="14" fill="#5a6270" stroke="#3a3f47" stroke-width="3"/>`;
    const labs = [{ x: x - 52, y: 50, t: 'Eyepiece lens (×10)', side: 'l', ly: 50 }, { x: x - 50, y: 270, t: 'Objective lenses (×4, ×10, ×40)', side: 'l', ly: 250 }, { x: x - 40, y: 327, t: 'Slide with specimen on the stage', side: 'l', ly: 330 },
      { x: x - 40, y: 420, t: 'Light source / mirror', side: 'l', ly: 420 }, { x: x + 80, y: 330, t: 'Coarse focusing knob', side: 'r', ly: 320 }, { x: x + 70, y: 370, t: 'Fine focusing knob', side: 'r', ly: 380 }, { x: x + 50, y: 250, t: 'Arm (carry it here)', side: 'r', ly: 240 }];
    g += T(430, 548, 'Total magnification = eyepiece × objective magnification', { size: 14 });
    return wrap(W, H, o.aria || 'Labelled light microscope', '', g + labels(labs, { W, H, lx: 250, rx: 520, size: 14 }));
  }

  /* ---------- villus ---------- */
  function villus(o = {}) {
    const W = 880, H = 480, cx = 330;
    let g = `<path d="M${cx - 90} 440V180C${cx - 90} 60 ${cx + 90} 60 ${cx + 90} 180V440" fill="#f2b5bf" stroke="#c97a8a" stroke-width="3"/>`;
    for (let i = 0; i < 22; i++) { const a = Math.PI + i * Math.PI / 21; g += `<path d="M${f(cx + 90 * Math.cos(a))} ${f(140 + 80 * Math.sin(a))}l${f(8 * Math.cos(a))} ${f(8 * Math.sin(a))}" stroke="#c97a8a" stroke-width="3"/>`; }
    g += `<path d="M${cx - 50} 440V190C${cx - 50} 120 ${cx + 50} 120 ${cx + 50} 190V440" fill="none" stroke="#d93a3a" stroke-width="5"/><path d="M${cx - 30} 440V200C${cx - 30} 150 ${cx + 30} 150 ${cx + 30} 200V440" fill="none" stroke="#5a7fd6" stroke-width="5"/><path d="M${cx} 440V180" stroke="#f2e6a0" stroke-width="10"/>`;
    for (let i = 0; i < 6; i++) g += `<path d="M${cx - 50} ${200 + i * 38}q25 10 50 0q25 -10 50 0" stroke="#d93a3a" stroke-width="2" fill="none"/>`;
    const labs = [{ x: cx + 60, y: 100, t: 'Microvilli: even more surface area', side: 'r', ly: 90 }, { x: cx + 86, y: 260, t: 'Wall one cell thick: short diffusion distance', side: 'r', ly: 200 },
      { x: cx + 50, y: 330, t: 'Capillary network: good blood supply keeps a steep concentration gradient', side: 'r', ly: 290 }, { x: cx, y: 360, t: 'Lacteal: absorbs fatty acids and glycerol', side: 'r', ly: 390 },
      { x: cx - 90, y: 260, t: 'Millions of villi give a huge surface area', side: 'l', ly: 260 }];
    g += T(cx, 470, 'A villus in the small intestine (absorption of digested food)', { size: 14 });
    return wrap(W, H, o.aria || 'Structure of a villus with capillaries and lacteal', '', g + labels(labs, { W, H, lx: 220, rx: 470, size: 14 }));
  }

  /* ---------- meiosis ---------- */
  function meiosis(o = {}) {
    const W = 1000, H = 380, cy = 180, cols = ['#e0533f', '#3f7fd6'];
    const cellC = (x, r, chs) => `<circle cx="${x}" cy="${cy}" r="${r}" fill="#f6dce4" stroke="#b56a86" stroke-width="2.5"/>` + chs;
    let g = '';
    g += cellC(110, 62, chromo(95, cy - 18, cols[0], 0, 0.8) + chromo(125, cy - 18, cols[1], 0, 0.8) + chromo(95, cy + 22, '#e0a64a', 20, 0.8) + chromo(125, cy + 22, '#3fb27f', -20, 0.8)) + T(110, cy + 92, 'Parent cell (diploid)', { size: 13, w: 700 }) + T(110, cy + 110, 'chromosomes copied', { size: 12 });
    g += arrow(180, cy, 230, cy - 50, 'currentColor', 2.5, 10) + arrow(180, cy, 230, cy + 50, 'currentColor', 2.5, 10);
    g += `<circle cx="290" cy="${cy - 70}" r="46" fill="#f6dce4" stroke="#b56a86" stroke-width="2.5"/>` + chromo(280, cy - 70, cols[0], 0, 0.7) + chromo(302, cy - 70, '#3fb27f', 0, 0.7) + `<circle cx="290" cy="${cy + 70}" r="46" fill="#f6dce4" stroke="#b56a86" stroke-width="2.5"/>` + chromo(280, cy + 70, cols[1], 0, 0.7) + chromo(302, cy + 70, '#e0a64a', 0, 0.7);
    g += T(290, 40, 'First division: pairs separate', { size: 13, w: 700 });
    [[cy - 70, [cols[0], '#3fb27f']], [cy + 70, [cols[1], '#e0a64a']]].forEach(([y, cs]) => { g += arrow(340, y, 400, y - 30, 'currentColor', 2, 9) + arrow(340, y, 400, y + 30, 'currentColor', 2, 9); [-30, 30].forEach((d, j) => { const yy = y + d * 1.27; g += `<circle cx="450" cy="${yy}" r="26" fill="#f6dce4" stroke="#b56a86" stroke-width="2.5"/><path d="M444 ${yy - 12}l0 24M456 ${yy - 12}l0 24" stroke="${cs[0]}" stroke-width="0"/>` + `<path d="M440 ${yy - 10}L448 ${yy + 10}" stroke="${cs[0]}" stroke-width="5" stroke-linecap="round"/><path d="M456 ${yy - 10}L462 ${yy + 10}" stroke="${cs[1]}" stroke-width="5" stroke-linecap="round"/>`; }); });
    g += T(450, 360, 'Second division: four gametes (haploid)', { size: 13, w: 700 });
    g += T(760, 120, 'Meiosis (in ovaries and testes):', { size: 14, w: 700 }) + T(760, 146, '• two divisions', { size: 13 }) + T(760, 168, '• four genetically different cells', { size: 13 }) + T(760, 190, '• half the chromosome number', { size: 13 }) + T(760, 212, '(23 in human gametes)', { size: 13 }) + T(760, 248, 'Fertilisation restores 46', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Meiosis producing four genetically different gametes', '', g);
  }

  /* ---------- evolutionary tree ---------- */
  function evoTree(o = {}) {
    const W = 900, H = 420;
    const leaves = [['Lizard', 160], ['Crocodile', 290], ['Bird', 420], ['Mouse', 560], ['Human', 700]];
    let g = `<path d="M430 380V320M430 320H230M430 320H630M230 320V240M230 240H160M230 240H355M355 240V180M355 180H290M355 180H420M630 320V230M630 230H560M630 230H700" stroke="#3fb27f" stroke-width="5" fill="none"/>`;
    g += `<path d="M160 240V90M290 180V90M420 180V90M560 230V90M700 230V90" stroke="#3fb27f" stroke-width="5"/>`;
    leaves.forEach(([n, x]) => g += `<circle cx="${x}" cy="80" r="8" fill="#3fb27f"/>` + T(x, 60, n, { size: 15, w: 700 }));
    g += `<circle cx="430" cy="380" r="7" fill="#e0a64a"/>` + T(450, 395, 'common ancestor', { size: 13, a: 'start' }) + `<circle cx="355" cy="180" r="6" fill="#e0a64a"/>` + T(365, 200, 'more recent common ancestor', { size: 12, a: 'start' });
    g += arrow(820, 380, 820, 90, 'currentColor', 2) + T(840, 240, 'time', { size: 13, a: 'start' });
    g += T(450, 30, 'Evolutionary tree: closer branches share a more recent common ancestor', { size: 14 });
    return wrap(W, H, o.aria || 'Evolutionary tree of five vertebrates', '', g);
  }

  /* ---------- limiting factors ---------- */
  function limitingFactors(o = {}) {
    const W = 900, H = 420, x0 = 120, y0 = 350;
    let g = axes(x0, y0, 700, 290, 'Light intensity', 'Rate of photosynthesis');
    const curve = (top, c, name) => `<path d="M${x0} ${y0}C${x0 + 160} ${y0 - top * 1.1} ${x0 + 260} ${y0 - top} ${x0 + 680} ${y0 - top}" stroke="${c}" stroke-width="4" fill="none"/>` + T(x0 + 690, y0 - top - 8, name, { size: 13, a: 'end', fill: c });
    g += curve(150, '#3f7fd6', 'low CO₂ concentration') + curve(250, '#3fb27f', 'high CO₂ concentration');
    g += T(x0 + 130, y0 - 60, 'Light is limiting:', { size: 13, w: 700, a: 'start' }) + T(x0 + 130, y0 - 42, 'more light, faster rate', { size: 12, a: 'start' }) + T(x0 + 360, y0 - 212, 'Graph levels off: another factor', { size: 13, w: 700, a: 'start' }) + T(x0 + 360, y0 - 194, '(CO₂ or temperature) is limiting', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Graph of rate of photosynthesis against light intensity at two carbon dioxide concentrations', '', g);
  }

  /* ---------- phagocytosis and antibodies ---------- */
  function phagocytosis(o = {}) {
    const W = 980, H = 380, r = S._rnd(8);
    let g = '';
    const bac = (x, y, a) => `<rect x="${x - 16}" y="${y - 8}" width="32" height="16" rx="8" fill="#8a6d3b" transform="rotate(${a} ${x} ${y})"/>`;
    // phagocyte engulfing
    g += `<path d="M150 120C220 90 300 120 300 190C300 220 280 230 250 220C230 214 230 180 210 180C190 180 190 214 170 220C130 236 80 220 80 180C80 140 110 130 150 120Z" fill="#f2f0f6" stroke="#b9b2cc" stroke-width="3"/><path d="M140 160q14 -24 34 -6q18 -12 20 10q-8 22 -28 12q-22 12 -26 -16z" fill="#7a4ab8"/>` + bac(210, 205, 0) + bac(250, 160, 30) + `<circle cx="250" cy="160" r="22" fill="none" stroke="#c9a06a" stroke-dasharray="4 4"/>`;
    g += T(190, 290, '1. Phagocytosis', { size: 15, w: 700 }) + T(190, 310, 'white blood cells engulf', { size: 12 }) + T(190, 326, 'and digest pathogens', { size: 12 });
    // lymphocyte + antibodies
    g += `<circle cx="470" cy="180" r="56" fill="#f2f0f6" stroke="#b9b2cc" stroke-width="3"/><circle cx="470" cy="180" r="40" fill="#7a4ab8"/>`;
    for (let i = 0; i < 5; i++) { const a = -1 + i * 0.5, x = 470 + Math.cos(a) * 90, y = 180 + Math.sin(a) * 90; g += `<path d="M${f(x)} ${f(y + 10)}V${f(y)}l-8 -10M${f(x)} ${f(y)}l8 -10" stroke="#e0a64a" stroke-width="3.5" fill="none" transform="rotate(${f(a * 57 + 90)} ${f(x)} ${f(y)})"/>`; }
    g += T(470, 290, '2. Antibodies', { size: 15, w: 700 }) + T(470, 310, 'lymphocytes make antibodies that', { size: 12 }) + T(470, 326, 'fit the antigens on one pathogen', { size: 12 });
    // antitoxin + clumping
    for (let i = 0; i < 4; i++) g += bac(720 + (i % 2) * 40, 150 + Math.floor(i / 2) * 40, i * 30);
    g += [[740, 170], [760, 150], [740, 130], [760, 190]].map(([x, y]) => `<path d="M${x} ${y + 6}V${y}l-6 -8M${x} ${y}l6 -8" stroke="#e0a64a" stroke-width="3" fill="none"/>`).join('');
    g += T(750, 290, '3. Antibodies clump pathogens', { size: 15, w: 700 }) + T(750, 310, 'together; antitoxins neutralise', { size: 12 }) + T(750, 326, 'the toxins pathogens release', { size: 12 });
    g += T(490, 40, 'How white blood cells defend the body', { size: 17, w: 700 });
    return wrap(W, H, o.aria || 'Phagocytosis, antibody production and clumping of pathogens', '', g);
  }

  const add = { seriesParallel, acdc, heatingCurve, resultantForce, springHooke, dtGraph, liquidPressure, fission, wireField, orbit, separation, cracking, polymerisation, gasTests, flameTests, rusting, atmospherePie, microscope, villus, meiosis, evoTree, limitingFactors, phagocytosis, mitosis, bloodVessels, bloodCells, brain, skin, endocrine, carbonCycle, tropism, biomassPyramid, membrane, menstrualCycle, plasmidGE, fracDist, electrolysis, chromatography, titration, greenhouse, haber, periodicTable, collision, alkanes, reactionProfile, house, plug, grid, transformer, penetration, waves, emSpectrum, glassBlock, lenses, magField, stopping, starLife, gasPressure };
  for (const k of Object.keys(add)) S.register(k, add[k]);
  S._more = { T, arrow, dbl, wavy, id };
})(typeof window === 'undefined' ? globalThis : window);
