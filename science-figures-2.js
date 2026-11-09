/* Shared: more realistic science figures (physics and chemistry explanations).
   Registers extra figures on window.SciFig, so load it after science-figures.js.
   Each figure returns an SVG string; labels use the same layout engine as the core figures. */
(function (root) {
  'use strict';
  const S = root.SciFig;
  if (!S) return;
  const labels = S._labels, tag = S._tag, near = S._near, wrap0 = S._wrap, f = S._f, esc = S._esc;
  /* shared lab gradients: helpers write url(#LGname); wrap() swaps in ids unique to each figure */
  const LGD = (u, n) => ({
    glass: `<linearGradient id="${u}glass" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".5"/><stop offset=".14" stop-color="#d9eef8" stop-opacity=".2"/><stop offset=".5" stop-color="#e8f5fb" stop-opacity=".07"/><stop offset=".84" stop-color="#d9eef8" stop-opacity=".16"/><stop offset="1" stop-color="#ffffff" stop-opacity=".4"/></linearGradient>`,
    liq: `<linearGradient id="${u}liq" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".22" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset=".85" stop-color="#000" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".26"/></linearGradient>`,
    steel: `<linearGradient id="${u}steel" x1="0" x2="1"><stop offset="0" stop-color="#5f6770"/><stop offset=".35" stop-color="#eef1f4"/><stop offset=".6" stop-color="#a8b0b8"/><stop offset="1" stop-color="#4f5760"/></linearGradient>`,
    steelV: `<linearGradient id="${u}steelV" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#eef1f4"/><stop offset=".5" stop-color="#a8b0b8"/><stop offset="1" stop-color="#5f6770"/></linearGradient>`,
    iron: `<linearGradient id="${u}iron" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6a7482"/><stop offset="1" stop-color="#22262e"/></linearGradient>`,
    wood: `<linearGradient id="${u}wood" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e2bd86"/><stop offset=".45" stop-color="#c99a5e"/><stop offset="1" stop-color="#8e6334"/></linearGradient>`,
    flame: `<linearGradient id="${u}flame" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#9cc8ff" stop-opacity=".55"/><stop offset=".55" stop-color="#3f86f0" stop-opacity=".9"/><stop offset="1" stop-color="#2456c8"/></linearGradient>`,
    graph: `<linearGradient id="${u}graph" x1="0" x2="1"><stop offset="0" stop-color="#1c2026"/><stop offset=".4" stop-color="#5d6672"/><stop offset=".7" stop-color="#383e47"/><stop offset="1" stop-color="#15181d"/></linearGradient>`,
    copper: `<linearGradient id="${u}copper" x1="0" x2="1"><stop offset="0" stop-color="#7a3a1c"/><stop offset=".35" stop-color="#f0a77a"/><stop offset=".6" stop-color="#c46a3c"/><stop offset="1" stop-color="#6e3317"/></linearGradient>`,
    zinc: `<linearGradient id="${u}zinc" x1="0" x2="1"><stop offset="0" stop-color="#6f7780"/><stop offset=".35" stop-color="#e2e7ec"/><stop offset=".6" stop-color="#a9b2bb"/><stop offset="1" stop-color="#5f6770"/></linearGradient>`,
    bath: `<linearGradient id="${u}bath" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f4f7f9"/><stop offset="1" stop-color="#b9c2ca"/></linearGradient>`,
    shadow: `<radialGradient id="${u}shadow"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`
  })[n] || '';
  const wrap = (W, H, aria, defs, body) => {
    if (body.indexOf('url(#LG') < 0) return wrap0(W, H, aria, defs, body);
    const u = id('L'), used = new Set();
    body = body.replace(/url\(#LG([A-Za-z]+)\)/g, (m, n) => { used.add(n); return `url(#${u}${n})`; });
    return wrap0(W, H, aria, (defs || '') + [...used].map(n => LGD(u, n)).join(''), body);
  };
  const lgShadow = (x, y, rx, ry = 5) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#LGshadow)"/>`;
  let uid = 0;
  const id = p => 'sg' + p + (++uid);
  /* helpers */
  const subs = s => s.indexOf('_') < 0 ? s : s.replace(/_(?:\{([^}]+)\}|([A-Za-z0-9]+))([^_]*)/g, (m, a, b, rest) => `<tspan dy="0.32em" font-size="72%">${a || b}</tspan>` + (rest ? `<tspan dy="-0.23em">${rest}</tspan>` : ''));
  const T = (x, y, s, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-size="${o.size || 15}" text-anchor="${o.a || 'middle'}" class="sf-lab"${o.w ? ` font-weight="${o.w}"` : ''}${o.fill ? ` style="fill:${o.fill}"` : ''}>${subs(esc(s))}</text>`;
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
    g += wavy(mid - 60, ey - 40, mid - 60, py + 40, HOT, 2) + wavy(x0 + 10, ey + 105, x0 - 48, ey + 105, HOT, 2);
    g += wavy(x1 - 10, ey + 70, x1 + 46, ey + 70, HOT, 2);
    g += T(470, 40, o.title || 'Warm house, cold day: how insulation reduces energy transfer', { size: 17, w: 700 });
    g += T(556, ey + 104, 'Inside', { size: 15, w: 700, fill: '#b5532a' }) + T(556, ey + 123, '20 °C', { size: 15, w: 700, fill: '#b5532a' }) + T(W - 110, 110, 'Outside 5 °C', { size: 15, w: 700, fill: COLD });
    const labs = [
      { x: x0 + 60, y: ey - 20, t: 'Loft insulation: mineral wool traps air', side: 'l' },
      { x: x0 + 23, y: ey + 60, t: 'Cavity wall insulation: foam fills the gap', side: 'l' },
      { x: x0 + 8, y: ey + 150, t: 'Thick brick walls', side: 'l' },
      { x: x0 + 90, y: gy - 25, t: 'Radiator (energy source)', side: 'l' },
      { x: 506, y: ey + 50, t: 'Double glazing: gas gap between two panes', side: 'r', ly: ey + 20 },
      { x: x1 - 118, y: gy - 5, t: 'Draught excluder stops warm air escaping', side: 'r', ly: gy - 45 },
      { x: x1 + 30, y: ey + 70, t: 'Energy transferred to the cold surroundings', side: 'r', ly: ey + 95 }];
    return wrap(W, H, o.aria || 'Cutaway house showing loft insulation, cavity wall insulation, double glazing and a draught excluder', '', g + labels(labs, { W, H, lx: 250, rx: 712, size: 15, top: 70 }));
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
    g += `<path d="M${cx + 55} 202C${cx + 70} 180 ${L[0]} 200 ${L[0]} ${L[1] - 12}" stroke="#c8792a" stroke-width="5" fill="none"/>`;
    [[E[0], E[1] + 30], [N[0], N[1] + 12], [cx + 55, 284]].forEach(([x, y]) => g += `<circle cx="${x}" cy="${y}" r="5" fill="#c8792a"/>`);
    const labs = [
      { x: E[0] + 9, y: E[1] - 16, t: 'Earth pin', side: 'r', ly: 110 },
      { x: cx - 5, y: 235, t: 'Earth wire (green and yellow): safety wire, 0 V', side: 'l', ly: 215 },
      { x: cx + 66, y: 226, t: 'Fuse: melts if the current is too large', side: 'r', ly: 190 },
      { x: L[0] + 18, y: L[1], t: 'Live pin', side: 'r', ly: 290 },
      { x: cx + 46, y: 356, t: 'Live wire (brown): about 230 V', side: 'r', ly: 356 },
      { x: N[0] - 18, y: N[1], t: 'Neutral pin', side: 'l', ly: 290 },
      { x: cx - 50, y: 356, t: 'Neutral wire (blue): close to 0 V', side: 'l', ly: 356 },
      { x: cx - 46, y: 408, t: 'Cable grip holds the cable', side: 'l', ly: 420 },
      { x: cx - 158, y: 120, t: 'Plastic case: an insulator', side: 'l', ly: 120 },
      { x: cx - 30, y: 480, t: 'Outer insulation', side: 'l', ly: 480 }];
    return wrap(W, H, o.aria || 'Inside a UK three-pin plug: live, neutral and earth wires, fuse and cable grip', '', g + labels(labs, { W, H, lx: 250, rx: 610, size: 15 }));
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
    const labs = [{ x: 268, y: 220, t: `Primary coil (${np} turns)`, side: 'l', ly: 380 }, { x: 156, y: 200, t: 'Alternating p.d. in', side: 'l', ly: 90 },
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
    let g = `<path d="M240 170V420Q240 450 270 450H630Q660 450 660 420V170" fill="${o.aqueous ? '#9fd4e6' : '#e0a64a'}" fill-opacity=".35" stroke="#cfe0ea" stroke-width="5"/><path d="M240 170V420Q240 450 270 450H630Q660 450 660 420V170Z" fill="url(#LGliq)"/><path d="M252 180V430" stroke="#fff" stroke-width="4" opacity=".35"/>` + lgShadow(450, 454, 220, 7);
    g += `<rect x="330" y="120" width="34" height="270" rx="4" fill="url(#LGgraph)"/><rect x="536" y="120" width="34" height="270" rx="4" fill="url(#LGgraph)"/>`;
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
    let g = `<path d="M280 150V470Q280 490 300 490H580Q600 490 600 470V150" fill="url(#LGglass)" stroke="#cfe0ea" stroke-width="5"/><rect x="284" y="430" width="312" height="56" fill="#9fd4e6" opacity=".45"/><rect x="284" y="430" width="312" height="56" fill="url(#LGliq)"/><path d="M292 160V470" stroke="#fff" stroke-width="4" opacity=".35"/>`;
    g += `<rect x="${x0}" y="70" width="${pw}" height="390" fill="#f4f1e6"/><rect x="${x0}" y="${front}" width="${pw}" height="${460 - front}" fill="#9fd4e6" opacity=".25"/><rect x="290" y="66" width="280" height="8" rx="3" fill="url(#LGsteelV)"/>`;
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
    let g = `<rect x="160" y="574" width="380" height="14" rx="3" fill="url(#LGwood)"/>` + lgShadow(250, 572, 70, 5) + `<rect x="200" y="558" width="120" height="16" rx="4" fill="url(#LGiron)"/><rect x="230" y="60" width="12" height="500" rx="2" fill="url(#LGsteel)"/><rect x="236" y="150" width="${bx - 236}" height="10" rx="2" fill="url(#LGsteelV)"/><rect x="226" y="145" width="20" height="20" rx="3" fill="url(#LGiron)"/><rect x="${bx - 22}" y="140" width="44" height="30" rx="6" fill="url(#LGiron)"/>`;
    g += `<rect x="${bx - 12}" y="40" width="24" height="380" rx="6" fill="url(#LGglass)" stroke="#cfe0ea" stroke-width="3"/><rect x="${bx - 9}" y="120" width="18" height="298" fill="#9fd4e6" opacity=".55"/><rect x="${bx - 9}" y="120" width="18" height="298" fill="url(#LGliq)"/><path d="M${bx - 6} 50V410" stroke="#fff" stroke-width="2.5" opacity=".45"/>`;
    for (let i = 0; i <= 25; i++) g += `<path d="M${bx - 12} ${f(60 + i * 13.5)}h${i % 5 ? 7 : 12}" stroke="currentColor" stroke-width="1.2"/>` + (i % 5 ? '' : T(bx + 22, 64 + i * 13.5, String(i * 2), { size: 11, a: 'start' }));
    g += `<rect x="${bx - 22}" y="420" width="44" height="12" rx="4" fill="url(#LGiron)"/><rect x="${bx + 18}" y="416" width="12" height="20" rx="2" fill="#2b6a3c"/><path d="M${bx} 432V452" stroke="#cfe0ea" stroke-width="4"/><circle cx="${bx}" cy="462" r="3" fill="#9fd4e6"/>`;
    g += `` + lgShadow(bx, 560, 96, 4) + `<rect x="${bx - 90}" y="548" width="180" height="12" rx="2" fill="#f5f5f5" stroke="#d6d9de"/><path d="M${bx - 20} 470V500L${bx - 70} 548H${bx + 70}L${bx + 20} 500V470" fill="url(#LGglass)" stroke="#cfe0ea" stroke-width="3"/><path d="M${bx - 36} 516L${bx - 68} 546H${bx + 68}L${bx + 36} 516Z" fill="#e874a8" opacity=".6"/><path d="M${bx - 36} 516L${bx - 68} 546H${bx + 68}L${bx + 36} 516Z" fill="url(#LGliq)"/><path d="M${bx - 36} 516H${bx + 36}" stroke="#fff" stroke-width="1.5" opacity=".5"/><path d="M${bx - 30} 500L${bx - 58} 540" stroke="#fff" stroke-width="3" opacity=".4" stroke-linecap="round"/>`;
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
    const nonmetal = new Set([1, 2, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 33, 34, 35, 36, 52, 53, 54, 85, 86]);
    let g = '';
    const zs = []; for (let z = 1; z <= 56; z++) zs.push(z); zs.push(57); for (let z = 72; z <= 86; z++) zs.push(z);
    zs.forEach(z => { let [c, p] = pos(z); if (z >= 72) c = z - 68; if (z === 57) c = 3;
      const x = x0 + (c - 1) * cw, y = y0 + (p - 1) * ch, grp = c;
      const col = grp === 1 && z > 1 ? '#e0533f' : grp === 17 ? '#3fb27f' : grp === 18 ? '#8e6bd6' : (c >= 3 && c <= 12) ? '#c98a3a' : nonmetal.has(z) ? '#3f8fd6' : '#8a94a6';
      const sym = z >= 72 ? SY[z - 15] : SY[z - 1];
      g += `<rect x="${x + 2}" y="${y + 2}" width="${cw - 4}" height="${ch - 4}" rx="5" fill="${col}"/>` + T(x + cw / 2, y + 22, String(z), { size: 10, fill: '#fff' }) + T(x + cw / 2, y + 40, sym, { size: 16, w: 700, fill: '#fff' }); });
    // staircase between metals and non-metals
    g += `<path d="M${x0 + 12 * cw} ${y0 + ch}V${y0 + 2 * ch}H${x0 + 13 * cw}V${y0 + 3 * ch}H${x0 + 14 * cw}V${y0 + 4 * ch}H${x0 + 15 * cw}V${y0 + 5 * ch}H${x0 + 16 * cw}V${y0 + 6 * ch}" stroke="currentColor" stroke-width="4" stroke-linejoin="round" fill="none"/>`;
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
      s += T(ox + 45, rL - 10, 'Reactants', { size: 13 }) + T(ox + (exo ? 282 : 290), exo ? pL + 19 : pL - 10, 'Products', { size: 13 });
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
    const PL = [[470, 120], [110, 330], [420, 330], [200, 110]], RC = [];
    for (let i = 0; i < 60 && RC.length < 20; i++) { const x = 70 + r() * 460, y = 90 + r() * 260, a = r() * 180; if (Math.hypot(x - 300, y - 210) < 76 || PL.some(([px, py]) => Math.hypot(x - px - 5, y - py - 2) < 34) || RC.some(([cx2, cy2]) => Math.hypot(x - cx2, y - cy2) < 30) || Math.hypot(x - 520, y - 250) < 40 || (x > 330 && Math.abs(y - 224) < 27)) continue; RC.push([x, y]); g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="22" ry="16" fill="#d93a3a" transform="rotate(${f(a)} ${f(x)} ${f(y)})"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="10" ry="6.5" fill="#b92c2c" opacity=".55" transform="rotate(${f(a)} ${f(x)} ${f(y)})"/>`; }
    const rc = near(RC, 520, 120);
    g += `<circle cx="300" cy="210" r="48" fill="#f2f0f6" stroke="#b9b2cc" stroke-width="2"/><path d="M272 196q14 -26 34 -6q20 -14 22 12q-8 26 -30 14q-24 14 -26 -20z" fill="#7a4ab8"/>`;
    PL.forEach(([x, y]) => g += `<path d="M${x} ${y}l6 -5 7 4 -1 7 -7 3z" fill="#e0a64a" stroke="#a8742a"/>`);
    const top = rc[1] < 122;
    const labs = [{ x: rc[0] + 12, y: rc[1], t: 'Red blood cell: no nucleus, biconcave shape, haemoglobin carries oxygen', side: 'r', ly: top ? 100 : 165 }, { x: 340, y: 222, t: 'White blood cell: has a nucleus; part of the immune system', side: 'r', ly: 225 },
      { x: 476, y: 122, t: 'Platelets: small cell fragments that help blood clot', side: 'r', ly: top ? 160 : 100 }, { x: 520, y: 250, t: 'Plasma: liquid carrying cells, glucose, CO₂, urea, hormones', side: 'r', ly: 300 }];
    return wrap(W, H, o.aria || 'Components of blood seen under a microscope', '', g + labels(labs, { W, H, lx: 30, rx: 590, size: 14 }));
  }

  /* ---------- brain regions ---------- */
  function brain(o = {}) {
    const W = 880, H = 440, k = id('br'), lv = S._LV(o.level);
    let g = `<defs><pattern id="${k}" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 20q10 -14 20 0t20 0M0 36q10 -10 20 0t20 0M0 6q10 -10 20 0t20 0" stroke="#c97a8a" stroke-width="2" fill="none"/></pattern></defs>`;
    g += `<path d="M260 250C220 140 300 70 420 70C560 66 640 140 620 240C610 290 560 300 520 296L470 300C430 300 360 300 320 296C280 292 268 276 260 250Z" fill="#f2b5bf"/><path d="M260 250C220 140 300 70 420 70C560 66 640 140 620 240C610 290 560 300 520 296L470 300C430 300 360 300 320 296C280 292 268 276 260 250Z" fill="url(#${k})"/>`;
    g += `<path d="M520 296C560 300 610 300 616 330C612 366 560 372 520 356C496 344 498 312 520 296Z" fill="#d98a9a"/>${[0, 1, 2, 3].map(i => `<path d="M${514 + i * 2} ${310 + i * 12}H${600 - i * 4}" stroke="#b56a7a" stroke-width="2"/>`).join('')}`;
    g += `<path d="M470 300C468 330 480 360 486 400H452C450 370 444 330 440 300Z" fill="#e8a8b4" stroke="#c97a8a" stroke-width="2"/>`;
    const labs = [{ x: 380, y: 130, t: 'Cerebral cortex: memory, language, intelligence and consciousness', side: 'l', ly: 90 }, { x: 565, y: 330, t: 'Cerebellum: balance and coordinating muscle movement', side: 'r', ly: 340 },
      { x: 466, y: 370, t: (lv === 2 ? 'Medulla oblongata: controls heart rate and breathing' : 'Medulla: unconscious activities, e.g. heartbeat and breathing'), side: 'r', ly: 400 }];
    if (lv === 2) { g += `<ellipse cx="402" cy="296" rx="24" ry="11" fill="#b9648a" stroke="#8a4466" stroke-width="1.5"/><path d="M398 306v8" stroke="#8a4466" stroke-width="3"/><circle cx="397" cy="322" r="9" fill="#8e5bd6" stroke="#5e3784" stroke-width="1.5"/>`; labs[0].t = 'Cerebrum: memory, language, thought and voluntary movement'; labs.push({ x: 388, y: 296, t: 'Hypothalamus: temperature and water balance; controls the pituitary', side: 'l', ly: 250 }, { x: 390, y: 323, t: 'Pituitary gland: releases hormones', side: 'l', ly: 345 }); }
    g += arrow(250, 395, 200, 395, 'currentColor', 2, 9) + T(258, 400, 'front of the head', { size: 13, a: 'start' });
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
    g += [[76, 284, 102], [134, 330, 124], [210, 330, 170], [250, 266, 318], [308, 683, 275]].map(([y, px, py]) => `<path d="M${px > 500 ? 546 : 454} ${y - 4}L${px} ${py}" stroke="currentColor" stroke-width="1.2" opacity=".7"/><circle cx="${px}" cy="${py}" r="2.6" fill="currentColor"/>`).join('');
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
    g += gl(cx, 96, 8, '#8e5bd6') + gl(cx - 12, 156, 9, '#3f7fd6') + gl(cx + 12, 156, 9, '#3f7fd6') + gl(cx - 34, 300, 9, '#e0a64a') + gl(cx + 34, 300, 9, '#e0a64a') + `<ellipse cx="${cx + 12}" cy="330" rx="34" ry="10" fill="#3fb27f" stroke="#fff" stroke-width="2"/>` + gl(cx - 30, 392, 8, '#e0533f') + gl(cx + 30, 392, 8, '#e0533f') + gl(cx - 9, 447, 7, '#d98a2b') + gl(cx + 9, 447, 7, '#d98a2b');
    const labs = [{ x: cx - 8, y: 96, t: "Pituitary gland: the 'master gland' (FSH, LH, ADH, TSH)", side: 'l', ly: 70 }, { x: cx - 20, y: 156, t: 'Thyroid: thyroxine controls metabolic rate', side: 'l', ly: 180 },
      { x: cx - 42, y: 300, t: 'Adrenal glands: adrenaline (fight or flight)', side: 'l', ly: 290 }, { x: cx + 46, y: 330, t: 'Pancreas: insulin and glucagon control blood glucose', side: 'r', ly: 330 },
      { x: cx - 37, y: 392, t: 'Ovaries (female): oestrogen and progesterone', side: 'l', ly: 400 }, { x: cx + 15, y: 447, t: 'Testes (male): testosterone', side: 'r', ly: 450 }, { x: cx + 37, y: 392, t: 'Ovary', side: 'r', ly: 392 }];
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
    g += `<rect x="420" y="360" width="110" height="52" rx="20" fill="#f2f2f2" stroke="#999"/><circle cx="440" cy="380" r="10" fill="#333"/><rect x="520" y="345" width="40" height="34" rx="12" fill="#f2f2f2" stroke="#999"/>${[430, 450, 500, 520].map(x => `<rect x="${x}" y="408" width="8" height="24" fill="#ddd"/>`).join('')}` + T(570, 372, 'Animals', { size: 14, w: 700, a: 'start' });
    // decomposers
    g += `<path d="M700 430q20 -40 40 0z" fill="#c9a07a"/><path d="M712 430v-8M728 430v-8" stroke="#a07a5a" stroke-width="4"/><path d="M760 430q16 -30 32 0z" fill="#d9b48a"/>` + T(745, 464, 'Decomposers (microorganisms)', { size: 13, w: 700, fill: '#fff' });
    // fossil fuels
    g += `<rect x="830" y="476" width="120" height="30" rx="6" fill="#222"/>` + T(890, 496, 'Fossil fuels', { size: 13, w: 700, fill: '#fff' }) + T(900, 520 - 4, '', {}) + `<rect x="880" y="300" width="40" height="130" fill="#8a8f98"/><rect x="866" y="290" width="68" height="16" fill="#6a6f78"/>` + T(870, 372, 'Combustion', { size: 13, w: 700, a: 'end' });
    const lbl = (x, y, t, c) => T(x, y, t, { size: 13, w: 700, fill: c });
    g += arrow(380, 96, 200, 210, '#3fb27f', 4, 14) + lbl(250, 140, 'Photosynthesis', '#3fb27f');
    g += arrow(230, 230, 400, 100, '#e0663a', 3, 12) + lbl(352, 176, 'Respiration', '#e0663a');
    g += arrow(214, 300, 414, 380, '#e0a64a', 3, 12) + lbl(310, 312, 'Feeding', '#e0a64a');
    g += arrow(540, 400, 696, 422, '#c9a07a', 3, 12) + arrow(170, 441, 690, 441, '#e8c9a8', 2, 10) + T(400, 500, 'Death and waste (plants and animals) → decomposers', { size: 13, w: 700, fill: '#fff' });
    g += arrow(500, 340, 520, 100, '#e0663a', 3, 12) + T(524, 220, 'Respiration', { size: 13, w: 700, fill: '#e0663a', a: 'start' });
    g += arrow(740, 410, 620, 96, '#e0663a', 3, 12) + T(712, 300, 'Respiration', { size: 13, w: 700, fill: '#e0663a', a: 'start' });
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
    const W = 1140, H = 350, y1 = 170, y2 = 270;
    let g = `<rect x="60" y="${y1 - 10}" width="820" height="${y2 - y1 + 20}" fill="#f5e3a6" opacity=".25"/>`;
    const head = (x, y, up) => `<circle cx="${x}" cy="${y}" r="10" fill="#e0663a"/><path d="M${x - 4} ${y + (up ? 10 : -10)}q-4 ${up ? 18 : -18} 0 ${up ? 36 : -36}M${x + 4} ${y + (up ? 10 : -10)}q4 ${up ? 18 : -18} 0 ${up ? 36 : -36}" stroke="#e0a64a" stroke-width="2.5" fill="none"/>`;
    for (let x = 70; x <= 870; x += 22) { if ((x > 300 && x < 380) || (x > 560 && x < 650)) continue; g += head(x, y1, true) + head(x, y2, false); }
    g += `<path d="M310 ${y1 - 30}h60v${y2 - y1 + 60}h-60z" fill="#5a8fd6" opacity=".9"/><rect x="330" y="${y1 - 30}" width="20" height="${y2 - y1 + 60}" fill="#f5e3a6" opacity=".6"/>`;
    g += `<path d="M566 ${y1 - 24}q40 -20 80 0v${y2 - y1 + 48}q-40 20 -80 0z" fill="#3fb27f"/>`;
    g += `<ellipse cx="460" cy="${y1 + 20}" rx="40" ry="34" fill="#8e5bd6" opacity=".85"/><path d="M460 ${y1 - 14}v-30m0 0l-14 -16m14 16l14 -16m-14 -16l0 -10" stroke="#ffd84a" stroke-width="4" fill="none"/>`;
    g += `<rect x="200" y="${y1 + 14}" width="8" height="30" rx="3" fill="#f2d23a"/><rect x="752" y="${y2 - 44}" width="8" height="30" rx="3" fill="#f2d23a"/>`;
    const X = x => 250 + 0.75 * x, Y = y => 62 + 0.75 * y;
    const labs = [{ x: X(92), y: Y(y1), t: 'Phospholipid: hydrophilic head', side: 'l', ly: Y(y1) - 16 }, { x: X(90), y: Y(y1 + 34), t: 'Hydrophobic fatty acid tails', side: 'l', ly: Y(y1 + 34) + 16 }];
    const tags = tag(X(340), Y(y1 - 28), X(250), 62, 'Channel protein\n(lets ions through)', { size: 16 }) + tag(X(460), Y(y1 - 62), X(470), 28, 'Glycoprotein: cell recognition\nand signalling', { size: 16 })
      + tag(X(606), Y(y1 - 32), X(775), 66, 'Carrier protein (active transport,\nfacilitated diffusion)', { ex: X(690), size: 16 }) + tag(X(756), Y(y2 - 14), X(756), 330, 'Cholesterol: regulates fluidity', { size: 16 })
      + T(X(890), Y(y1 - 40), 'Outside the cell', { size: 15, a: 'start', w: 700 }) + T(X(890), Y(y2 + 50), 'Inside the cell', { size: 15, a: 'start', w: 700 });
    return wrap(W, H, o.aria || 'Fluid mosaic model of the cell-surface membrane', '', `<g transform="translate(250 62) scale(.75)">${g}</g>` + tags + labels(labs, { W, H, lx: 290, rx: 930, size: 16 }));
  }

  /* ---------- menstrual cycle hormones ---------- */
  function menstrualCycle(o = {}) {
    const W = 960, H = 440, x0 = 110, x1 = 900, yb = 300, sx = (x1 - x0) / 28;
    const curve = (fn, c, name, lx) => { let d = ''; for (let t = 0; t <= 28; t += 0.25) d += (t ? 'L' : 'M') + f(x0 + t * sx) + ' ' + f(yb - fn(t)); return `<path d="${d}" stroke="${c}" stroke-width="3.5" fill="none"/>` + T(x0 + lx[0] * sx, yb - lx[1], name, { size: 13, w: 700, fill: c, a: lx[2] || 'middle' }); };
    const gs = (t, m, s, h) => h * Math.exp(-((t - m) ** 2) / (2 * s * s));
    let g = `<path d="M${x0} 60V${yb}H${x1}" stroke="currentColor" stroke-width="2" fill="none"/>`;
    for (let d = 0; d <= 28; d += 7) g += T(x0 + d * sx, yb + 20, String(d), { size: 12 });
    g += T((x0 + x1) / 2, yb + 40, 'Day of the cycle', { size: 13 }) + T(60, 170, 'Hormone level', { size: 13 }).replace('<text', '<text transform="rotate(-90 60 170)"');
    g += curve(t => 30 + gs(t, 3, 3, 40) + gs(t, 14, 1.2, 70), '#3f7fd6', 'FSH', [3.2, 80]);
    g += curve(t => 20 + gs(t, 14, 1.1, 190), '#8e5bd6', 'LH', [15.2, 196, 'start']);
    g += curve(t => 25 + gs(t, 12.5, 3, 150) + gs(t, 21, 3, 60), '#e0533f', 'Oestrogen', [10.4, 160, 'end']);
    g += curve(t => 15 + gs(t, 21, 3.5, 130), '#3fb27f', 'Progesterone', [21.6, 158]);
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
    g += T(x0 + 66, y0 - 52, 'solid', { size: 14, w: 700, a: 'start' }) + T(x0 + 190, y0 - 132, 'melting', { size: 14, w: 700 }) + T(x0 + 190, y0 - 96, 'solid + liquid', { size: 12 }) + T(x0 + 308, y0 - 146, 'liquid', { size: 14, w: 700, a: 'start' }) + T(x0 + 460, y0 - 232, 'boiling', { size: 14, w: 700 }) + T(x0 + 460, y0 - 196, 'liquid + gas', { size: 12 }) + T(x0 + 620, y0 - 290, 'gas', { size: 14, w: 700 });
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
    g += T(x0 + 158, y0 - 84, 'A: steep straight line:', { size: 13, a: 'start' }) + T(x0 + 158, y0 - 68, 'constant, fast speed', { size: 12, a: 'start' }) + T(x0 + 280, y0 - 154, 'B: flat: stationary', { size: 13 }) + T(x0 + 470, y0 - 150, 'C: gentler slope:', { size: 13, a: 'start' }) + T(x0 + 470, y0 - 134, 'constant, slower speed', { size: 12, a: 'start' }) + T(x0 + 580, y0 - 262, 'D: curve getting steeper:', { size: 13, a: 'end' }) + T(x0 + 580, y0 - 246, 'accelerating', { size: 12, a: 'end' });
    g += `<path d="M${x0 + 40} ${y0 - 28}H${x0 + 140}V${y0 - 98}" stroke="#e0a64a" stroke-width="2" stroke-dasharray="5 4" fill="none"/>` + T(x0 + 158, y0 - 44, 'speed = gradient = Δd ÷ Δt', { size: 13, a: 'start', fill: '#e0a64a' });
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
    g += arrow(sx, sy, sx - 110 * Math.sin(a), sy + 110 * Math.cos(a), '#3fb27f', 4, 14) + arrow(sx, sy, sx - 80 * Math.cos(a), sy - 80 * Math.sin(a), '#ef5b4c', 4, 14);
    g += T(sx + 76, sy + 112, 'velocity (tangent to the orbit)', { size: 13, a: 'start', fill: '#3fb27f' }) + T(sx + 30, sy - 26, 'gravity: towards the centre', { size: 13, a: 'start', fill: '#ef5b4c' });
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
    g += `<path d="M380 80V220M640 80V220" stroke="currentColor" stroke-width="3"/><path d="M380 80h10M380 220h10M640 80h-10M640 220h-10" stroke="currentColor" stroke-width="3"/>` + bond(400, 150, 450, 150) + bond(510, 150, 620, 150) + mono(450, 150, false) + T(655, 232, 'n', { size: 22, w: 700, a: 'start' }) + T(510, 260, 'poly(ethene) (polymer)', { size: 14 });
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
      g += `` + lgShadow(x, 324, 36, 4) + `<rect x="${x - 9}" y="252" width="18" height="62" rx="2" fill="url(#LGsteel)"/><rect x="${x - 12}" y="284" width="24" height="9" rx="2" fill="url(#LGiron)"/><rect x="${x - 4}" y="286" width="8" height="5" fill="#0e1116"/><rect x="${x - 28}" y="312" width="56" height="11" rx="3" fill="url(#LGiron)"/><path d="M${x + 24} 318h14" stroke="#d9822b" stroke-width="5" stroke-linecap="round"/><path d="M${x + 60} 150L${x + 6} 200" stroke="#c9ccd2" stroke-width="3"/><circle cx="${x + 4}" cy="202" r="5" fill="none" stroke="#c9ccd2" stroke-width="2"/>`;
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
    const bz = t => { const u = 1 - t, x = cx - 90 * u * u * u - 270 * u * u * t + 270 * u * t * t + 90 * t * t * t, y = 180 * u * u * u + 180 * u * u * t + 180 * u * t * t + 180 * t * t * t, dx = 540 * u * t, dy = -360 * u * u + 360 * t * t, n = Math.hypot(dx, dy) || 1; return [x, y, dy / n, -dx / n]; };
    let mv = null; for (let i = 0; i <= 26; i++) { const [x, y, nx, ny] = bz(i / 26); g += `<path d="M${f(x)} ${f(y)}l${f(9 * nx)} ${f(9 * ny)}" stroke="#c97a8a" stroke-width="3" stroke-linecap="round"/>`; if (i === 20) mv = [x + 7 * nx, y + 7 * ny]; }
    for (let y = 200; y <= 430; y += 14) g += `<path d="M${cx - 90} ${y}h-9M${cx + 90} ${y}h9" stroke="#c97a8a" stroke-width="3" stroke-linecap="round"/>`;
    g += `<path d="M${cx - 50} 440V190C${cx - 50} 120 ${cx + 50} 120 ${cx + 50} 190V440" fill="none" stroke="#d93a3a" stroke-width="5"/><path d="M${cx - 30} 440V200C${cx - 30} 150 ${cx + 30} 150 ${cx + 30} 200V440" fill="none" stroke="#5a7fd6" stroke-width="5"/><path d="M${cx} 440V180" stroke="#f2e6a0" stroke-width="10"/>`;
    for (let i = 0; i < 6; i++) g += `<path d="M${cx - 50} ${200 + i * 38}q25 10 50 0q25 -10 50 0" stroke="#d93a3a" stroke-width="2" fill="none"/>`;
    const labs = [{ x: mv[0], y: mv[1], t: 'Microvilli: even more surface area', side: 'r', ly: 90 }, { x: cx + 84, y: 260, t: 'Wall one cell thick: short diffusion distance', side: 'r', ly: 200 },
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

  /* ======================= WAVE 4: required-practical apparatus ======================= */
  const GL = '#a9c4d4', WATER = '#7fc3e0', METAL = '#9aa3ad', WOOD = '#b98a5a', WIRE = 'currentColor';
  const wire = d => `<path d="${d}" stroke="${WIRE}" stroke-width="2.5" fill="none" stroke-linejoin="round"/>`;
  // glass beaker: x,y = top-left; lvl = fraction filled
  const beaker = (x, y, w, h, lvl = 0.6, liq = WATER, op = 0.45) => {
    const ly = y + h * (1 - lvl), body = `M${x} ${y + 2}V${y + h - 8}Q${x} ${y + h} ${x + 8} ${y + h}H${x + w - 8}Q${x + w} ${y + h} ${x + w} ${y + h - 8}V${y + 2}Z`;
    const lq = `M${x + 2} ${f(ly)}H${x + w - 2}V${y + h - 8}Q${x + w - 2} ${y + h - 2} ${x + w - 8} ${y + h - 2}H${x + 8}Q${x + 2} ${y + h - 2} ${x + 2} ${y + h - 8}Z`;
    let ticks = ''; for (let i = 1; i <= 4; i++) { const ty = y + h - (h - 14) * i / 5; ticks += `<path d="M${x + w - 4} ${f(ty)}h${i % 2 ? -10 : -6}" stroke="#7d95a3" stroke-width="1.2" opacity=".75"/>`; }
    return lgShadow(x + w / 2, y + h + 3, w * .6, 5) + `<path d="${body}" fill="url(#LGglass)"/>` + (lvl > 0 ? `<path d="${lq}" fill="${liq}" fill-opacity="${op}"/><path d="${lq}" fill="url(#LGliq)"/><path d="M${x + 3} ${f(ly)}H${x + w - 3}" stroke="#fff" stroke-width="1.6" opacity=".55"/>` : '') + ticks +
      `<path d="M${x - 6} ${y - 4}Q${x} ${y} ${x} ${y + 6}V${y + h - 8}Q${x} ${y + h} ${x + 8} ${y + h}H${x + w - 8}Q${x + w} ${y + h} ${x + w} ${y + h - 8}V${y}" fill="none" stroke="${GL}" stroke-width="3"/><path d="M${x} ${y}H${x + w}" stroke="${GL}" stroke-width="1.4" opacity=".7"/><path d="M${x + 6} ${y + 10}V${y + h - 14}" stroke="#fff" stroke-width="3" opacity=".4" stroke-linecap="round"/>`;
  };
  const thermo = (x, y1, y2, lvl = 0.55) => `<rect x="${x - 4}" y="${y1}" width="8" height="${y2 - y1}" rx="4" fill="#f4f7f9" stroke="#8fa3b0" stroke-width="1.5"/><rect x="${x - 1.6}" y="${f(y1 + (y2 - y1) * (1 - lvl))}" width="3.2" height="${f((y2 - y1) * lvl)}" fill="#e2483a"/><circle cx="${x}" cy="${y2}" r="6" fill="#e2483a" stroke="#8fa3b0" stroke-width="1.5"/>`;
  const psu = (x, y, w = 110, h = 64, t = 'power supply') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#3d4654" stroke="#22262e" stroke-width="2"/><rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="18" rx="3" fill="#9fe0b0" opacity=".85"/><circle cx="${x + 26}" cy="${y + 46}" r="7" fill="#e2483a"/><circle cx="${x + w - 26}" cy="${y + 46}" r="7" fill="#22262e" stroke="#777"/><circle cx="${x + w / 2}" cy="${y + 46}" r="8" fill="#cfd5dc" stroke="#777"/>` + T(x + w / 2, y + h + 18, t, { size: 13 });
  const stopwatch = (x, y) => `<circle cx="${x}" cy="${y}" r="20" fill="#f4f7f9" stroke="#55606c" stroke-width="3"/><rect x="${x - 5}" y="${y - 30}" width="10" height="8" fill="#55606c"/><path d="M${x} ${y}V${y - 13}M${x} ${y}L${x + 9} ${y + 5}" stroke="#22262e" stroke-width="2.5" stroke-linecap="round"/>`;
  const stand = (x, by, h, ay, ax2) => lgShadow(x + 5, by + 1, 52, 4) + `<rect x="${x - 40}" y="${by - 10}" width="90" height="10" rx="3" fill="url(#LGiron)"/><rect x="${x - 38}" y="${by - 10}" width="86" height="2" fill="#fff" opacity=".18"/><rect x="${x - 3.5}" y="${by - h}" width="7" height="${h - 10}" rx="2" fill="url(#LGsteel)"/><rect x="${Math.min(x, ax2)}" y="${ay - 3.5}" width="${Math.abs(ax2 - x)}" height="7" rx="2" fill="url(#LGsteelV)"/><rect x="${x - 8}" y="${ay - 8}" width="16" height="16" rx="3" fill="url(#LGiron)"/><circle cx="${x}" cy="${ay}" r="2.5" fill="#c9ced4"/>`;
  const bunsen = (x, by, flame = true) => lgShadow(x, by + 1, 30, 4) + `<rect x="${x - 22}" y="${by - 9}" width="44" height="9" rx="3" fill="url(#LGiron)"/><path d="M${x + 18} ${by - 5}h14" stroke="#d9822b" stroke-width="5" stroke-linecap="round"/><rect x="${x - 6}" y="${by - 54}" width="12" height="46" rx="2" fill="url(#LGsteel)"/><rect x="${x - 8.5}" y="${by - 32}" width="17" height="8" rx="2" fill="url(#LGiron)"/><rect x="${x - 3}" y="${by - 30}" width="6" height="4" fill="#0e1116"/>` + (flame ? `<path d="M${x - 7} ${by - 54}Q${x - 10} ${by - 72} ${x} ${by - 96}Q${x + 10} ${by - 72} ${x + 7} ${by - 54}Z" fill="url(#LGflame)"/><path d="M${x - 3.5} ${by - 54}Q${x - 4.5} ${by - 64} ${x} ${by - 76}Q${x + 4.5} ${by - 64} ${x + 3.5} ${by - 54}Z" fill="#d6ecff"/>` : '');
  const tripod = (x, ty, h = 70, w = 90) => `<path d="M${x - w / 2 + 10} ${ty + 6}L${x - w / 2 - 6} ${ty + h}M${x + w / 2 - 10} ${ty + 6}L${x + w / 2 + 6} ${ty + h}M${x} ${ty + 6}V${ty + h}" stroke="#4f5760" stroke-width="5.5" stroke-linecap="round"/><path d="M${x - w / 2 + 9} ${ty + 8}L${x - w / 2 - 6} ${ty + h - 2}M${x + w / 2 - 11} ${ty + 8}L${x + w / 2 + 4} ${ty + h - 2}M${x - 1.5} ${ty + 8}V${ty + h - 2}" stroke="#c9ced4" stroke-width="1.4" opacity=".8"/><rect x="${x - w / 2}" y="${ty}" width="${w}" height="7" rx="2" fill="url(#LGsteelV)"/>`;
  const bench = (x1, x2, y) => `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="13" rx="3" fill="url(#LGwood)"/><path d="M${x1 + 3} ${y + 1.5}H${x2 - 3}" stroke="#f6deb0" stroke-width="1.5" opacity=".8"/>` + Array.from({ length: Math.max(1, Math.floor((x2 - x1) / 120)) }, (_, i) => `<path d="M${x1 + 30 + i * 120} ${y + 6}q30 3 60 0" stroke="#8e6334" stroke-width="1" fill="none" opacity=".45"/>`).join('');
  const box = (x, y, w, h, t, sub) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#3d4654" stroke="#22262e" stroke-width="2"/><rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${Math.min(22, h - 16)}" rx="3" fill="#9fe0b0" opacity=".85"/>` + (t ? T(x + w / 2, y + h + 18, t, { size: 13 }) : '') + (sub ? T(x + w / 2, y + 24, sub, { size: 12, w: 700, fill: '#163a22' }) : '');
  const panelT = (x, t, s) => T(x, 40, t, { size: 16, w: 700 }) + (s ? T(x, 60, s, { size: 12 }) : '');

  /* ---------- specific heat capacity ---------- */
  function shcPractical(o = {}) {
    const W = 940, H = 470;
    let g = bench(150, 800, 400);
    // insulated aluminium block
    g += `<rect x="330" y="200" width="160" height="200" rx="6" fill="#efe6c9" stroke="#c9b98a" stroke-width="2"/>${Array.from({ length: 9 }, (_, i) => `<path d="M334 ${214 + i * 20}q38 -8 76 0t76 0" stroke="#d8cba0" stroke-width="2" fill="none"/>`).join('')}`;
    g += `<rect x="350" y="220" width="120" height="180" fill="#c3cad2" stroke="#8e98a3" stroke-width="2"/><rect x="350" y="220" width="120" height="14" fill="#dde2e8"/>`;
    g += `<rect x="374" y="164" width="22" height="196" rx="4" fill="#5b636e"/><rect x="372" y="120" width="26" height="46" rx="3" fill="#22262e"/>`;
    g += thermo(440, 120, 330, 0.5);
    // circuit: heater leads to the supply; ammeter in series; voltmeter across the heater
    g += psu(660, 150, 110, 64, ' ');
    g += wire('M378 120V40H630V250H686V196') + wire('M392 120V108H535') + meter(550, 108, 'A') + wire('M565 108H610V270H744V196');
    g += wire('M470 40V59') + meter(470, 74, 'V') + wire('M470 89V108') + `<circle cx="470" cy="40" r="4" fill="currentColor"/><circle cx="470" cy="108" r="4" fill="currentColor"/>`;
    g += T(715, 140, 'power supply', { size: 13 });
    g += stopwatch(200, 250) + T(200, 290, 'stopwatch', { size: 13 });
    g += T(470, 440, 'E = V × I × t;   c = E ÷ (m × Δθ)', { size: 15, w: 700 });
    const labs = [
      { x: 374, y: 150, t: 'Immersion heater', side: 'l', ly: 130 },
      { x: 440, y: 260, t: 'Thermometer', side: 'r', ly: 300 },
      { x: 466, y: 380, t: 'Aluminium block (mass m, measured on a balance)', side: 'r', ly: 350 },
      { x: 336, y: 330, t: 'Insulation reduces energy lost to the surroundings', side: 'l', ly: 360 },
      { x: 484, y: 72, t: 'Voltmeter in parallel with the heater', side: 'r', ly: 70 }
    ];
    return wrap(W, H, o.aria || 'Specific heat capacity practical: heater and thermometer in an insulated aluminium block', '', g + labels(labs, { W, H, lx: 280, rx: 660, size: 14, top: 30 }));
  }

  /* ---------- thermal insulation ---------- */
  function insulationPractical(o = {}) {
    const W = 1010, H = 460;
    let g = bench(40, 560, 380);
    const set = (x, kind, name) => {
      let s = beaker(x - 70, 200, 140, 180, 0, WATER);
      if (kind === 1) s += `<path d="M${x - 64} 210H${x + 64}V372H${x - 64}Z" fill="#e8f1f6" opacity=".5"/>${Array.from({ length: 24 }, (_, i) => `<circle cx="${x - 56 + (i % 6) * 22}" cy="${222 + Math.floor(i / 6) * 40}" r="8" fill="none" stroke="#c9d8e2" stroke-width="2"/>`).join('')}`;
      if (kind === 2) s += `<path d="M${x - 64} 210H${x + 64}V372H${x - 64}Z" fill="#f6f2ea"/>${Array.from({ length: 20 }, (_, i) => `<circle cx="${x - 54 + (i % 5) * 27}" cy="${226 + Math.floor(i / 5) * 38}" r="13" fill="#fffdf6" stroke="#e7e0cf"/>`).join('')}`;
      s += beaker(x - 36, 240, 72, 120, 0.8, '#e88a6a', 0.5) + `<rect x="${x - 44}" y="232" width="88" height="8" rx="2" fill="#7b8794"/>` + thermo(x, 150, 320, 0.7);
      return s + T(x, 404, name, { size: 14, w: 700 });
    };
    g += set(110, 0, 'no insulation') + set(290, 1, 'bubble wrap') + set(470, 2, 'cotton wool');
    g += T(290, 40, 'Same volume of hot water, same starting temperature', { size: 15, w: 700 }) + T(290, 62, 'record the temperature every minute for 10 minutes', { size: 13 }) + T(290, 84, 'each small beaker has a lid and a thermometer', { size: 13 });
    g += axes(640, 360, 270, 230, 'Time (min)', 'Temperature (°C)');
    g += `<path d="M642 150Q700 260 905 320" stroke="${HOT}" stroke-width="3" fill="none"/><path d="M642 150Q720 210 905 250" stroke="#e0a64a" stroke-width="3" fill="none"/><path d="M642 150Q740 180 905 205" stroke="#3fb27f" stroke-width="3" fill="none"/>`;
    g += T(918, 324, 'none', { size: 12, a: 'start', fill: HOT }) + T(918, 254, 'bubble wrap', { size: 12, a: 'start', fill: '#e0a64a' }) + T(918, 209, 'cotton wool', { size: 12, a: 'start', fill: '#3fb27f' });
    g += T(780, 430, 'Shallowest curve = best insulator', { size: 14, w: 700 });
    return wrap(W, H, o.aria || 'Thermal insulation practical: beakers of hot water wrapped in different materials, with cooling curves', '', g);
  }

  /* ---------- resistance of a wire ---------- */
  function resistanceWire(o = {}) {
    const W = 1000, H = 460;
    let g = `<rect x="120" y="250" width="560" height="26" fill="#f1d58a" stroke="#c9a94a" stroke-width="2"/>${Array.from({ length: 51 }, (_, i) => `<path d="M${130 + i * 10.8} 250v${i % 10 ? 7 : 14}" stroke="#7a5f1f" stroke-width="1.4"/>`).join('')}`;
    g += T(130, 296, '0', { size: 12 }) + T(670, 296, '100 cm', { size: 12 });
    g += `<path d="M130 246H670" stroke="#d9822b" stroke-width="2.5"/>`;
    g += `<path d="M118 238l16 8-16 8z" fill="#7b8794"/><path d="M444 222l-8 22h16z" fill="#2f6fd6"/><rect x="430" y="210" width="28" height="14" rx="3" fill="#2f6fd6"/>`;
    g += psu(330, 60, 110, 64, ' ') + T(385, 50, 'power supply', { size: 13 });
    g += wire('M356 106V140H260') + meter(245, 140, 'A') + wire('M230 140H140V238') + wire('M414 106V140H444V210');
    g += wire('M140 190H275') + meter(290, 190, 'V') + wire('M305 190H444');
    g += dbl(130, 330, 444, 330) + T(287, 352, 'length L (moved along the wire)', { size: 13 });
    g += axes(780, 380, 170, 180, 'Length L', 'Resistance R');
    g += `<path d="M782 378L940 220" stroke="#3f7fd6" stroke-width="3"/>` + T(865, 440, 'R ∝ L: a straight line', { size: 13 });
    const labs = [{ x: 400, y: 246, t: 'Resistance wire', side: 'r', ly: 200 }, { x: 452, y: 216, t: 'Crocodile clip', side: 'r', ly: 160 }, { x: 126, y: 246, t: 'Fixed end at 0 cm', side: 'l', ly: 270 }];
    g += T(400, 400, 'R = V ÷ I for each length', { size: 15, w: 700 }) + T(400, 422, 'keep the current low so the wire stays at a constant temperature', { size: 13 });
    return wrap(W, H, o.aria || 'Resistance of a wire practical: wire on a metre rule with ammeter, voltmeter and crocodile clip', '', g + labels(labs, { W, H, lx: 110, rx: 540, size: 13 }));
  }

  /* ---------- I–V characteristics ---------- */
  function ivCharacteristic(o = {}) {
    const W = 980, H = 460;
    let g = '';
    g += wire('M100 110H380V280H100Z') + `<rect x="226" y="94" width="28" height="32" fill="var(--panel,#121a33)"/>` + cell(240, 110);
    g += `<rect x="84" y="166" width="32" height="68" fill="var(--panel,#121a33)"/><rect x="88" y="170" width="24" height="60" fill="none" stroke="currentColor" stroke-width="2.5"/>` + arrow(78, 238, 124, 162, 'currentColor', 2, 9);
    g += T(72, 196, 'variable', { size: 12, a: 'end' }) + T(72, 212, 'resistor', { size: 12, a: 'end' });
    g += meter(380, 195, 'A') + `<rect x="200" y="266" width="80" height="28" fill="var(--panel,#121a33)"/><rect x="210" y="268" width="60" height="24" fill="#3a4250" stroke="currentColor" stroke-width="2.5"/>` + T(240, 285, 'X', { size: 14, w: 700 });
    g += T(240, 256, 'component', { size: 12 });
    g += wire('M190 280V340H225M255 340H290V280') + meter(240, 340, 'V');
    g += T(240, 54, 'Circuit', { size: 16, w: 700 }) + T(240, 400, 'Change the variable resistor, record V and I;', { size: 13 }) + T(240, 418, 'reverse the supply for negative values', { size: 13 });
    const gr = (cx, title, d) => `<path d="M${cx - 80} 230H${cx + 80}M${cx} 130V330" stroke="currentColor" stroke-width="2"/>` + T(cx + 78, 222, 'V', { size: 13, a: 'end' }) + T(cx + 6, 130, 'I', { size: 13, a: 'start' }) + `<path d="${d}" stroke="#3f7fd6" stroke-width="3.5" fill="none"/>` + T(cx, 370, title, { size: 15, w: 700 });
    g += gr(530, 'Resistor', 'M460 300L600 160');
    g += gr(710, 'Filament lamp', 'M640 290Q670 285 690 260L730 200Q750 175 780 170');
    g += gr(880, 'Diode', 'M822 232H905Q918 230 922 150');
    g += T(530, 394, 'straight line: R constant', { size: 12 }) + T(710, 394, 'R rises as it gets hotter', { size: 12 }) + T(880, 394, 'current flows one way only', { size: 12 });
    return wrap(W, H, o.aria || 'I–V characteristics practical circuit and graphs for a resistor, filament lamp and diode', '', g);
  }

  /* ---------- density ---------- */
  function densityPractical(o = {}) {
    const W = 940, H = 460;
    let g = bench(30, 910, 380);
    // regular block on balance
    g += `<rect x="90" y="330" width="170" height="50" rx="6" fill="#d9dee4" stroke="#8e98a3" stroke-width="2"/><rect x="110" y="345" width="70" height="22" rx="3" fill="#9fe0b0"/>` + T(145, 361, '96.0 g', { size: 13, w: 700, fill: '#163a22' }) + `<rect x="100" y="318" width="150" height="12" rx="3" fill="#b7bfc8"/>`;
    g += `<path d="M130 318V258L160 236H230V296L200 318Z" fill="#c78e5a" stroke="#8a5a30" stroke-width="2"/><path d="M130 258H200V318M200 258L230 236" fill="none" stroke="#8a5a30" stroke-width="2"/>`;
    g += dbl(130, 210, 200, 210, 'currentColor', 1.8) + T(165, 202, 'length', { size: 12 }) + dbl(108, 258, 108, 318, 'currentColor', 1.8) + T(92, 292, 'height', { size: 12, a: 'end' });
    g += T(165, 410, 'top-pan balance (mass)', { size: 13 });
    g += T(170, 40, 'Regular solid', { size: 16, w: 700 }) + T(170, 62, 'volume = length × width × height', { size: 13 }) + T(170, 80, '(measure with a ruler)', { size: 12 });
    // eureka can
    g += `<path d="M420 200V372H520V200" fill="none" stroke="${GL}" stroke-width="3"/><path d="M422 236H518V370H422Z" fill="${WATER}" fill-opacity=".45"/><path d="M520 236L590 270" stroke="${GL}" stroke-width="7"/><path d="M520 236L590 270" stroke="${WATER}" stroke-width="3" opacity=".7"/>`;
    g += `<path d="M470 120V280" stroke="#888" stroke-width="1.5"/><path d="M452 280Q470 262 490 284Q500 304 480 318Q456 326 448 306Q440 292 452 280Z" fill="#7d7468" stroke="#5a5248" stroke-width="2"/>`;
    g += `<path d="M596 282q-3 10 0 18" stroke="${WATER}" stroke-width="3" fill="none"/><path d="M570 290V372Q570 378 576 378H620Q626 378 626 372V290" fill="none" stroke="${GL}" stroke-width="3"/><path d="M572 330H624V376H572Z" fill="${WATER}" fill-opacity=".5"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M626 ${300 + i * 13}h-10" stroke="${GL}" stroke-width="1.5"/>`).join('')}`;
    g += T(520, 40, 'Irregular solid', { size: 16, w: 700 }) + T(520, 62, 'volume = volume of water displaced', { size: 13 });
    g += T(800, 160, 'density = mass ÷ volume', { size: 16, w: 700 }) + T(800, 186, 'ρ = m ÷ V', { size: 15 }) + T(800, 214, 'units: g/cm³ or kg/m³', { size: 13 }) + T(800, 250, '1 cm³ = 1 ml', { size: 13 });
    const labs = [{ x: 421, y: 215, t: 'Eureka (displacement) can filled to the spout', side: 'l', ly: 140 }, { x: 610, y: 340, t: 'Measuring cylinder', side: 'r', ly: 320 }, { x: 470, y: 300, t: 'Object on a thread', side: 'r', ly: 120 }];
    return wrap(W, H, o.aria || 'Density practical: measuring a regular block and using a eureka can for an irregular object', '', g + labels(labs, { W, H, lx: 330, rx: 650, size: 13 }));
  }

  /* ---------- acceleration (trolley, light gates) ---------- */
  function accelerationPractical(o = {}) {
    const W = 980, H = 440;
    let g = `<path d="M60 268L760 288" stroke="${WOOD}" stroke-width="14" stroke-linecap="round"/><path d="M70 280L70 360M740 300L740 360" stroke="#7d858f" stroke-width="6"/><rect x="40" y="360" width="760" height="8" fill="#7d858f" opacity=".6"/>`;
    // trolley
    g += `<g transform="translate(0 -31) rotate(1.64 200 270)"><rect x="140" y="250" width="120" height="34" rx="5" fill="#2f6fd6"/><rect x="180" y="210" width="6" height="40" fill="#22262e"/><rect x="170" y="196" width="26" height="14" fill="#22262e"/><circle cx="160" cy="288" r="10" fill="#22262e"/><circle cx="240" cy="288" r="10" fill="#22262e"/><rect x="200" y="236" width="30" height="14" fill="#9aa3ad"/><rect x="204" y="226" width="22" height="10" fill="#9aa3ad"/></g>`;
    // light gates
    const gate = x => { const y = 268 + (x - 60) * 20 / 700; return `<path d="M${x - 14} ${f(y - 8)}V${f(y - 90)}H${x + 14}V${f(y - 8)}" stroke="#e0a64a" stroke-width="7" fill="none"/><path d="M${x - 10} ${f(y - 50)}H${x + 10}" stroke="#ef5b4c" stroke-width="1.5" stroke-dasharray="3 3"/>`; };
    g += gate(340) + gate(600);
    g += `<rect x="420" y="110" width="110" height="60" rx="6" fill="#3d4654"/><rect x="430" y="120" width="90" height="22" rx="3" fill="#9fe0b0"/>` + T(475, 136, '0.42 m/s²', { size: 12, w: 700, fill: '#163a22' }) + wire('M340 186Q360 160 420 150M600 193Q580 160 530 150');
    // string over pulley to masses
    g +=  `<path d="M262 238L772 252" stroke="#d9d0bc" stroke-width="2"/><circle cx="772" cy="266" r="14" fill="#9aa3ad" stroke="#55606c" stroke-width="3"/><path d="M786 266V330" stroke="#d9d0bc" stroke-width="2"/><rect x="772" y="330" width="28" height="12" fill="#55606c"/><rect x="772" y="342" width="28" height="12" fill="#6b7480"/><rect x="772" y="354" width="28" height="12" fill="#55606c"/><path d="M786 330V324" stroke="#55606c" stroke-width="3"/>`;
    g += T(480, 40, 'Investigating F = m a', { size: 16, w: 700 }) + T(480, 62, 'falling masses pull the trolley; light gates measure speed at two points', { size: 13 });
    g += T(110, 334, 'runway tilted slightly to compensate for friction', { size: 12, a: 'start' }) + T(480, 400, 'Vary force: move masses from the trolley to the hanger (total mass stays the same).', { size: 13 }) + T(480, 418, 'Vary mass: add masses to the trolley, keep the hanging mass the same.  a = (v − u) ÷ t', { size: 13 });
    const labs = [{ x: 183, y: 174, t: 'Card (interrupts the beam)', side: 'l', ly: 120 }, { x: 180, y: 240, t: 'Trolley', side: 'l', ly: 225 }, { x: 614, y: 222, t: 'Light gate', side: 'r', ly: 110 }, { x: 778, y: 262, t: 'Pulley', side: 'r', ly: 200 }, { x: 800, y: 348, t: 'Hanging masses (force)', side: 'r', ly: 320 }, { x: 420, y: 140, t: 'Data logger', side: 'l', ly: 80 }];
    return wrap(W, H, o.aria || 'Acceleration practical: trolley on a runway with light gates, pulley and hanging masses', '', g + labels(labs, { W, H, lx: 120, rx: 830, size: 13, top: 80 }));
  }

  /* ---------- waves: ripple tank and vibrating string ---------- */
  function wavesPractical(o = {}) {
    const W = 980, H = 450;
    let g = panelT(230, 'Ripple tank', 'water waves') + panelT(720, 'Vibrating string', 'waves on a string');
    // ripple tank (side view)
    g += `<circle cx="230" cy="96" r="14" fill="#fff6c8" stroke="#e0a64a" stroke-width="2"/><path d="M216 112l-80 70M244 112l80 70" stroke="#fff6c8" stroke-width="1.5" opacity=".6" stroke-dasharray="4 4"/>`;
    g += `<path d="M90 190H370V230H90Z" fill="${WATER}" fill-opacity=".45" stroke="${GL}" stroke-width="3"/><path d="M92 196q12 -6 24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0" stroke="#d6f0fb" stroke-width="2" fill="none"/>`;
    g += `<rect x="96" y="176" width="14" height="22" fill="#55606c"/><rect x="88" y="162" width="30" height="16" rx="3" fill="#3d4654"/>` + T(103, 156, 'motor', { size: 11 });
    g += `<path d="M110 230L90 330M350 230L370 330" stroke="#7d858f" stroke-width="5"/><rect x="60" y="330" width="340" height="40" fill="#f4f1e6"/>${Array.from({ length: 10 }, (_, i) => `<rect x="${78 + i * 32}" y="334" width="14" height="32" fill="#b9c6cf" opacity=".8"/>`).join('')}`;
    g += T(230, 394, 'shadow of the waves on paper', { size: 12 }) + T(230, 420, 'measure across 10 waves, ÷ 10 = λ;  count waves in 10 s ÷ 10 = f', { size: 12 });
    // vibrating string
    g += `<rect x="520" y="200" width="60" height="50" rx="6" fill="#3d4654"/><path d="M550 200V180" stroke="#55606c" stroke-width="6"/>` + T(558, 270, 'vibration generator', { size: 12 });
    g += `<path d="M550 178H880" stroke="#c9ccd2" stroke-width="1"/>`;
    const L = 330, nl = 3; let d = 'M550 178'; for (let i = 1; i <= 60; i++) { const x = 550 + L * i / 60; d += `L${f(x)} ${f(178 - 28 * Math.sin(Math.PI * nl * i / 60))}`; }
    let d2 = 'M550 178'; for (let i = 1; i <= 60; i++) { const x = 550 + L * i / 60; d2 += `L${f(x)} ${f(178 + 28 * Math.sin(Math.PI * nl * i / 60))}`; }
    g += `<path d="${d}" stroke="#3f7fd6" stroke-width="3" fill="none"/><path d="${d2}" stroke="#3f7fd6" stroke-width="2" fill="none" opacity=".5"/>`;
    g += `<rect x="868" y="168" width="12" height="160" fill="${WOOD}"/><circle cx="890" cy="186" r="12" fill="#9aa3ad" stroke="#55606c" stroke-width="3"/><path d="M902 186V280" stroke="#c9ccd2" stroke-width="2"/><rect x="890" y="280" width="24" height="12" fill="#55606c"/><rect x="890" y="292" width="24" height="12" fill="#6b7480"/>`;
    g += `<rect x="600" y="300" width="70" height="40" rx="5" fill="#3d4654"/><rect x="608" y="306" width="54" height="14" rx="2" fill="#9fe0b0"/>` + T(635, 317, '60 Hz', { size: 10, w: 700, fill: '#163a22' }) + wire('M600 320H502V225H520') + T(635, 360, 'signal generator (f)', { size: 12 }) + T(902, 324, 'masses', { size: 12 }) + T(902, 340, '(tension)', { size: 12 });
    g += dbl(550, 130, 660, 130, 'currentColor', 1.6) + T(605, 122, 'λ/2', { size: 13, w: 700 });
    g += T(720, 400, 'adjust f until a clear stationary wave appears;', { size: 12 }) + T(720, 418, 'measure the length of several half wavelengths.  v = f λ', { size: 12 });
    const labs = [{ x: 230, y: 96, t: 'Lamp', side: 'l', ly: 96 }, { x: 103, y: 188, t: 'Vibrating bar (dipper)', side: 'l', ly: 200 }, { x: 890, y: 186, t: 'Pulley', side: 'r', ly: 140 }];
    return wrap(W, H, o.aria || 'Waves practical: ripple tank and a vibrating string with a signal generator', '', g + labels(labs, { W, H, lx: 80, rx: 920, size: 12 }));
  }

  /* ---------- infrared radiation: Leslie cube ---------- */
  function irPractical(o = {}) {
    const W = 920, H = 440;
    let g = bench(80, 840, 360);
    // cube in perspective: front face (matt black), side face (shiny silver), top
    g += `<path d="M300 180L360 140H520L460 180Z" fill="#cfd5dc" stroke="#8e98a3" stroke-width="2"/><path d="M300 180H460V360H300Z" fill="#1f2227" stroke="#55606c" stroke-width="2"/><path d="M460 180L520 140V320L460 360Z" fill="url(#${'irS'})" stroke="#8e98a3" stroke-width="2"/>`;
    g = `<defs><linearGradient id="irS" x1="0" x2="1"><stop offset="0" stop-color="#eef2f5"/><stop offset=".5" stop-color="#9aa3ad"/><stop offset="1" stop-color="#e6ebef"/></linearGradient></defs>` + g;
    g += `<ellipse cx="420" cy="160" rx="16" ry="6" fill="#55606c"/>` + thermo(420, 70, 230, 0.8).replace(/cy="230"/, 'cy="230"');
    g += `<path d="M330 156q-6 -14 4 -26M360 148q-6 -14 4 -26" stroke="#c9d8e2" stroke-width="2" fill="none" opacity=".7"/>`;
    g += T(380, 270, 'matt black', { size: 13, w: 700, fill: '#e8ecf5' });
    // detector
    g += `<rect x="640" y="230" width="90" height="56" rx="6" fill="#3d4654"/><path d="M640 248L610 240V276L640 268Z" fill="#55606c"/><rect x="652" y="240" width="66" height="22" rx="3" fill="#9fe0b0"/>` + T(685, 256, '41.6 °C', { size: 12, w: 700, fill: '#163a22' }) + `<path d="M685 286V360" stroke="#7d858f" stroke-width="6"/>`;
    for (let i = 0; i < 3; i++) g += wavy(468 + 0, 230 + i * 24, 596, 242 + i * 9, HOT, 2);
    g += dbl(460, 380, 610, 380, 'currentColor', 1.6) + T(535, 400, 'same distance for every face', { size: 12 });
    g += T(460, 40, 'Leslie cube: which surface emits most infrared?', { size: 16, w: 700 }) + T(460, 62, 'fill with hot water from a kettle; point the detector at each face in turn', { size: 13 });
    g += T(460, 428, 'Matt black emits most; shiny silver emits least (all faces at the same temperature).', { size: 13, w: 700 });
    const labs = [{ x: 420, y: 160, t: 'Hot water inside, thermometer to check temperature', side: 'l', ly: 100 }, { x: 685, y: 236, t: 'Infrared detector', side: 'r', ly: 180 }, { x: 500, y: 300, t: 'Shiny silver face', side: 'r', ly: 320 }, { x: 330, y: 330, t: 'Faces: matt black, shiny silver, matt white, shiny black', side: 'l', ly: 330 }];
    return wrap(W, H, o.aria || 'Infrared radiation practical with a Leslie cube and an infrared detector', '', g + labels(labs, { W, H, lx: 260, rx: 750, size: 13, top: 80 }));
  }

  /* ---------- specific latent heat of fusion ---------- */
  function latentHeat(o = {}) {
    const W = 920, H = 460;
    let g = bench(140, 760, 400);
    const rig = (x, on) => {
      let s = `<path d="M${x - 70} 150H${x + 70}L${x + 12} 250V300H${x - 12}V250Z" fill="#e8f3f8" fill-opacity=".18" stroke="${GL}" stroke-width="3"/>`;
      s += Array.from({ length: 16 }, (_, i) => { const r = Math.floor(i / 5), c = i % 5, xx = x - 52 + c * 24 + r * 10, yy = 166 + r * 22; return xx < x + 70 - r * 26 ? `<path d="M${xx} ${yy}l12 -4 8 10 -6 12 -14 -2z" fill="#e3f4fb" stroke="#a9d3e6" stroke-width="1.5"/>` : ''; }).join('');
      s += `<rect x="${x - 7}" y="100" width="14" height="140" rx="4" fill="#5b636e"/>` + wire(`M${x - 3} 100V80M${x + 3} 100V80`);
      s += `<path d="M${x} 304q-4 10 0 18" stroke="${WATER}" stroke-width="3" fill="none"/>` + beaker(x - 40, 320, 80, 70, 0.35);
      s += `<rect x="${x - 60}" y="390" width="120" height="10" rx="3" fill="#b7bfc8"/>`;
      return s + T(x, 440, on ? 'heater ON' : 'control: heater OFF', { size: 14, w: 700 });
    };
    g += rig(300, true) + rig(580, false);
    g += box(100, 40, 120, 56, 'joulemeter', '12 480 J') + wire('M220 70H297V80');
    g += T(460, 30, 'L = E ÷ m', { size: 17, w: 700 }).replace('y="30"', 'y="38"');
    g += T(800, 160, 'm = extra mass of water', { size: 13 }) + T(800, 178, 'collected with the heater on', { size: 13 }) + T(800, 196, '(minus the control funnel)', { size: 13 }) + T(800, 230, 'E from the joulemeter', { size: 13 });
    const labs = [{ x: 300, y: 130, t: 'Immersion heater', side: 'l', ly: 140 }, { x: 260, y: 180, t: 'Crushed ice in a funnel', side: 'l', ly: 210 }, { x: 300, y: 370, t: 'Beaker collects melted water', side: 'l', ly: 340 }];
    return wrap(W, H, o.aria || 'Specific latent heat of fusion practical: immersion heater in crushed ice with a control funnel', '', g + labels(labs, { W, H, lx: 200, rx: 720, size: 13, top: 120 }));
  }

  /* ---------- making a pure dry soluble salt ---------- */
  function saltPrep(o = {}) {
    const W = 990, H = 460;
    let g = '';
    // step 1: warm acid + excess copper oxide
    g += tripod(170, 280) + bunsen(170, 380) + beaker(120, 180, 100, 100, 0.55, '#56a0e0', 0.55) + `<path d="M126 274q20 -6 40 0t48 0" stroke="#1f2227" stroke-width="7" fill="none"/>` + `<path d="M190 150L230 120" stroke="${METAL}" stroke-width="5"/><ellipse cx="190" cy="152" rx="10" ry="4" fill="#1f2227"/>`;
    g += T(170, 40, '1  React', { size: 16, w: 700 }) + T(170, 60, 'add copper oxide to warm', { size: 12 }) + T(170, 76, 'dilute sulfuric acid until', { size: 12 }) + T(170, 92, 'some is left over (excess)', { size: 12 });
    // step 2: filter
    g += `<path d="M446 166L514 166L486 222H474Z" fill="url(#LGglass)" stroke="${GL}" stroke-width="3"/><path d="M452 170L508 170L484 214H476Z" fill="#f4f1e6"/><path d="M458 175L502 175L483 212H477Z" fill="#1f2227" opacity=".85"/><path d="M480 220V250" stroke="${GL}" stroke-width="3"/>` + stand(560, 390, 260, 190, 500) + `` + beaker(430, 270, 100, 110, .53, "#56a0e0", .55) + ``;
    g += T(490, 40, '2  Filter', { size: 16, w: 700 }) + T(490, 60, 'remove the excess solid;', { size: 12 }) + T(490, 76, 'the filtrate is copper', { size: 12 }) + T(490, 92, 'sulfate solution', { size: 12 });
    // step 3: evaporate on a water bath, then crystallise
    g += tripod(790, 300) + bunsen(790, 400) + beaker(735, 240, 110, 60, 0.6, WATER) + `<path d="M745 236Q790 268 835 236" fill="#56a0e0" fill-opacity=".6" stroke="${GL}" stroke-width="3"/><path d="M742 236H838" stroke="${GL}" stroke-width="3"/>`;
    g += `<path d="M770 210q-6 -14 4 -26M800 206q-6 -14 4 -26" stroke="#c9d8e2" stroke-width="2" fill="none" opacity=".7"/>`;
    g += `<path d="M880 180H960V200Q920 214 880 200Z" fill="#c7d2dc" stroke="${GL}" stroke-width="2"/>${[0, 1, 2].map(i => `<path d="M${892 + i * 20} 196l8 -8 8 8 -8 8z" fill="#2f7fe0" stroke="#bfe0ff"/>`).join('')}` + T(920, 232, 'blue crystals', { size: 12 });
    g += T(800, 40, '3  Crystallise', { size: 16, w: 700 }) + T(800, 60, 'heat gently to evaporate some water,', { size: 12 }) + T(800, 76, 'leave to cool; pat crystals dry', { size: 12 }) + T(800, 92, 'with filter paper', { size: 12 });
    g += arrow(270, 260, 380, 260, 'currentColor', 2.5) + arrow(600, 260, 700, 260, 'currentColor', 2.5);
    g += T(495, 440, 'CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l)', { size: 15, w: 700 });
    g += T(112, 270, 'excess', { size: 12, a: 'end' }) + T(112, 285, 'copper oxide', { size: 12, a: 'end' }) + T(442, 186, 'filter paper', { size: 12, a: 'end' }) + T(726, 280, 'water bath', { size: 12, a: 'end' }) + T(852, 266, 'evaporating', { size: 12, a: 'start' }) + T(852, 281, 'basin', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Making a pure dry sample of copper sulfate: react excess copper oxide, filter, crystallise', '', g);
  }

  /* ---------- electrolysis of aqueous solutions ---------- */
  function electrolysisAq(o = {}) {
    const W = 960, H = 460;
    const cat = o.cathode || 'hydrogen', an = o.anode || 'chlorine';
    let g = psu(410, 40, 140, 64, ' ') + T(560, 76, 'd.c. power supply', { size: 13, a: 'start' });
    g += `` + lgShadow(480, 424, 200, 6) + `<path d="M300 200V400Q300 420 320 420H640Q660 420 660 400V200" fill="url(#LGglass)" stroke="${GL}" stroke-width="3"/><path d="M302 240H658V418H302Z" fill="#9ad6c8" fill-opacity=".35"/><path d="M302 240H658V418H302Z" fill="url(#LGliq)"/><path d="M303 240H657" stroke="#fff" stroke-width="1.6" opacity=".5"/><path d="M308 216V404" stroke="#fff" stroke-width="3" opacity=".35"/>`;
    // electrodes
    g += `<rect x="382" y="200" width="16" height="190" fill="url(#LGgraph)"/><rect x="562" y="200" width="16" height="190" fill="url(#LGgraph)"/>`;
    // inverted test tubes
    const tube = (x, gasH, col) => `<path d="M${x - 24} 400V250Q${x - 24} 222 ${x} 222Q${x + 24} 222 ${x + 24} 250V400" fill="url(#LGglass)" stroke="${GL}" stroke-width="3"/><path d="M${x - 22} ${250 + gasH}V250Q${x - 22} 224 ${x} 224Q${x + 22} 224 ${x + 22} 250V${250 + gasH}Z" fill="${col}" fill-opacity=".35"/>` + [0, 1, 2, 3].map(i => `<circle cx="${x - 8 + (i % 2) * 14}" cy="${380 - i * 26}" r="4" fill="none" stroke="#fff" stroke-width="1.5"/>`).join('');
    g += tube(390, 80, '#ffffff') + tube(570, 50, an === 'chlorine' ? '#d6f08a' : '#ffffff');
    g += wire('M436 92V140H390V200') + wire('M524 92V140H570V200');
    g += T(390, 132, '−', { size: 20, w: 700 }).replace('x="390"', 'x="372"') + T(570, 132, '+', { size: 20, w: 700 }).replace('x="570"', 'x="588"');
    g += T(160, 210, 'Cathode (−)', { size: 15, w: 700 }) + T(160, 232, 'metal if less reactive', { size: 13 }) + T(160, 250, 'than hydrogen,', { size: 13 }) + T(160, 268, 'otherwise hydrogen', { size: 13 });
    g += T(800, 210, 'Anode (+)', { size: 15, w: 700 }) + T(800, 232, 'halogen if a halide', { size: 13 }) + T(800, 250, 'is present, otherwise', { size: 13 }) + T(800, 268, 'oxygen', { size: 13 });
    g += T(480, 448, o.caption || `e.g. sodium chloride solution: ${cat} at the cathode, ${an} at the anode`, { size: 14, w: 700 });
    const labs = [{ x: 390, y: 300, t: 'Inert (graphite) electrodes', side: 'l', ly: 330 }, { x: 390, y: 236, t: 'Inverted test tubes collect the gases', side: 'l', ly: 300 }, { x: 640, y: 380, t: 'Aqueous solution (electrolyte)', side: 'r', ly: 370 }, { x: 594, y: 260, t: 'Test chlorine with damp litmus: bleached', side: 'r', ly: 310 }];
    return wrap(W, H, o.aria || 'Electrolysis of an aqueous solution with inert electrodes and gas collected in test tubes', '', g + labels(labs, { W, H, lx: 250, rx: 700, size: 12, top: 290 }));
  }

  /* ---------- rates of reaction: three methods ---------- */
  function ratesPractical(o = {}) {
    const W = 1000, H = 490;
    const flask = (x, y, liq, op = 0.5) => `<path d="M${x - 12} ${y}V${y + 50}L${x - 52} ${y + 120}Q${x - 56} ${y + 130} ${x - 44} ${y + 130}H${x + 44}Q${x + 56} ${y + 130} ${x + 52} ${y + 120}L${x + 12} ${y + 50}V${y}" fill="none" stroke="${GL}" stroke-width="3"/><path d="M${x - 37} ${y + 96}H${x + 37}L${x + 52} ${y + 120}Q${x + 56} ${y + 128} ${x + 44} ${y + 128}H${x - 44}Q${x - 56} ${y + 128} ${x - 52} ${y + 120}Z" fill="${liq}" fill-opacity="${op}"/>`;
    let g = panelT(170, 'Gas syringe') + panelT(500, 'Collect over water') + panelT(830, 'Disappearing cross');
    // gas syringe
    g += flask(110, 230, WATER) + `<rect x="98" y="222" width="24" height="14" rx="3" fill="#55606c"/>` + `<path d="M110 222V170H170" stroke="${GL}" stroke-width="4" fill="none"/>`;
    g += `<rect x="170" y="156" width="140" height="28" rx="4" fill="#e8f3f8" fill-opacity=".25" stroke="${GL}" stroke-width="2.5"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${180 + i * 12} 156v8" stroke="${GL}" stroke-width="1.5"/>`).join('')}<rect x="240" y="158" width="10" height="24" fill="#8e98a3"/><path d="M250 170H330" stroke="#8e98a3" stroke-width="4"/><rect x="330" y="160" width="6" height="20" fill="#8e98a3"/>`;
    g += [0, 1, 2].map(i => `<circle cx="${100 + i * 10}" cy="${336 - i * 8}" r="3" fill="none" stroke="#fff" stroke-width="1.4"/>`).join('') + `<path d="M96 352l8 -4 10 2" stroke="#b7bfc8" stroke-width="4"/>`;
    g += T(110, 384, 'magnesium + acid', { size: 12 }) + T(240, 144, 'gas syringe', { size: 12 }) + T(170, 412, 'read the gas volume', { size: 12 }) + T(170, 428, 'every 10 seconds', { size: 12 });
    // over water
    g += flask(410, 230, WATER) + `<rect x="398" y="222" width="24" height="14" rx="3" fill="#55606c"/><path d="M410 222V190H520V330H560" stroke="${GL}" stroke-width="4" fill="none"/>`;
    g += `<path d="M480 300V370Q480 380 490 380H640Q650 380 650 370V300" fill="none" stroke="${GL}" stroke-width="3"/><path d="M482 316H648V378H482Z" fill="${WATER}" fill-opacity=".45"/>`;
    g += `<path d="M560 340V196Q560 190 566 190H594Q600 190 600 196V340" fill="none" stroke="${GL}" stroke-width="3"/><path d="M562 250H598V338H562Z" fill="${WATER}" fill-opacity=".45"/>${Array.from({ length: 8 }, (_, i) => `<path d="M600 ${206 + i * 16}h-8" stroke="${GL}" stroke-width="1.5"/>`).join('')}<circle cx="574" cy="300" r="3" fill="none" stroke="#fff"/><circle cx="584" cy="276" r="3" fill="none" stroke="#fff"/>`;
    g += T(656, 360, 'trough', { size: 12, a: 'start' }) + T(500, 412, 'upturned measuring cylinder', { size: 12 }) + T(500, 428, 'full of water', { size: 12 });
    // disappearing cross
    g += `<rect x="760" y="352" width="140" height="22" fill="#f4f1e6"/><path d="M816 356l24 14M840 356l-24 14" stroke="#1f2227" stroke-width="3"/>` + flask(830, 222, '#efe6b0', 0.75);
    g += `<path d="M818 120c8 -10 18 -10 26 0c-8 10 -18 10 -26 0z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="831" cy="120" r="4" fill="currentColor"/>` + arrow(831, 134, 831, 300, 'currentColor', 1.5, 8);
    g += T(830, 394, 'sodium thiosulfate + acid', { size: 12 }) + T(830, 412, 'time until the cross', { size: 12 }) + T(830, 428, 'can no longer be seen (sulfur forms)', { size: 12 });
    g += T(500, 466, 'Rate = amount of product ÷ time.  Change one variable (e.g. acid concentration) and keep the others the same.', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Three ways to measure the rate of a reaction: gas syringe, collecting gas over water, and the disappearing cross', '', g);
  }

  /* ---------- temperature change: polystyrene cup calorimeter ---------- */
  function calorimeter(o = {}) {
    const W = 920, H = 440;
    let g = bench(80, 460, 380);
    g += beaker(150, 210, 200, 170, 0);
    g += `<path d="M180 190L200 360H300L320 190Z" fill="#f7f7f2" stroke="#d6d6cc" stroke-width="2"/><path d="M186 196L204 352" stroke="#fff" stroke-width="4" opacity=".8"/><path d="M314 196L296 352" stroke="#d9d9cf" stroke-width="4" opacity=".7"/><path d="M190 260L200 356H300L310 260Z" fill="${WATER}" fill-opacity=".45"/><rect x="172" y="180" width="156" height="12" rx="4" fill="#f0f0e8" stroke="#d6d6cc"/>`;
    g += thermo(270, 90, 330, 0.62);
    g += `<path d="M110 40L150 30L170 170L150 176Z" fill="none" stroke="${GL}" stroke-width="2.5" opacity="0"/>`;
    g += `` + beaker(380, 110, 50, 100, .58, "#e8b3d6", .5) + ``;
    g += axes(560, 360, 320, 240, 'Volume of acid added (cm³)', 'Max temperature (°C)');
    g += `<path d="M562 320L720 160L878 230" stroke="#3f7fd6" stroke-width="3" fill="none"/><path d="M720 160V360" stroke="#e0a64a" stroke-width="2" stroke-dasharray="5 4"/>` + T(726, 150, 'neutralisation complete', { size: 12, a: 'start' });
    g += T(460, 40, 'Temperature change in a reaction', { size: 16, w: 700 }).replace('x="460"', 'x="300"');
    g += T(300, 420, 'add acid 5 cm³ at a time, stir, record the highest temperature', { size: 13 });
    const labs = [{ x: 270, y: 120, t: 'Thermometer', side: 'l', ly: 100 }, { x: 250, y: 186, t: 'Lid reduces energy loss', side: 'l', ly: 150 }, { x: 186, y: 230, t: 'Polystyrene cup (insulator)', side: 'l', ly: 220 }, { x: 160, y: 300, t: 'Beaker keeps the cup stable', side: 'l', ly: 300 }, { x: 405, y: 120, t: 'Measuring cylinder of acid', side: 'r', ly: 70 }];
    return wrap(W, H, o.aria || 'Polystyrene cup calorimeter for measuring the temperature change in a reaction', '', g + labels(labs, { W, H, lx: 140, rx: 450, size: 13 }));
  }

  /* ======================= WAVE 5: biology practical apparatus ======================= */
  const tubeV = (x, y, h, liq, lvl = 0.7, op = 0.5) => { const ly = y + h * (1 - lvl), lq = `M${x - 14} ${f(ly)}H${x + 14}V${y + h - 14}Q${x + 14} ${y + h} ${x} ${y + h}Q${x - 14} ${y + h} ${x - 14} ${y + h - 14}Z`, bd = `M${x - 16} ${y}V${y + h - 14}Q${x - 16} ${y + h + 2} ${x} ${y + h + 2}Q${x + 16} ${y + h + 2} ${x + 16} ${y + h - 14}V${y}Z`; return `<path d="${bd}" fill="url(#LGglass)"/>` + (lvl > 0 ? `<path d="${lq}" fill="${liq}" fill-opacity="${op}"/><path d="${lq}" fill="url(#LGliq)"/><path d="M${x - 13} ${f(ly)}H${x + 13}" stroke="#fff" stroke-width="1.3" opacity=".5"/>` : '') + `<path d="M${x - 16} ${y}V${y + h - 14}Q${x - 16} ${y + h + 2} ${x} ${y + h + 2}Q${x + 16} ${y + h + 2} ${x + 16} ${y + h - 14}V${y}" fill="none" stroke="${GL}" stroke-width="2.5"/><path d="M${x - 19} ${y}H${x + 19}" stroke="${GL}" stroke-width="3" stroke-linecap="round"/><path d="M${x - 10} ${y + 8}V${y + h - 16}" stroke="#fff" stroke-width="2.5" opacity=".4" stroke-linecap="round"/>`; };

  /* ---------- osmosis in potato ---------- */
  function osmosisPractical(o = {}) {
    const W = 980, H = 470;
    const conc = ['0.0', '0.2', '0.4', '0.6', '0.8'];
    let g = `` + lgShadow(270, 382, 230, 6) + `<rect x="60" y="250" width="420" height="16" rx="3" fill="url(#LGwood)"/><rect x="60" y="330" width="420" height="10" rx="3" fill="url(#LGwood)"/><path d="M70 266V380M470 266V380" stroke="#a87a45" stroke-width="8"/>`;
    conc.forEach((c, i) => { const x = 110 + i * 80, len = [62, 56, 50, 44, 40][i], wid = [15, 14, 12, 11, 10][i];
      g += tubeV(x, 170, 200, '#cfe7f2', 0.75, 0.45) + `<rect x="${x - wid / 2}" y="${300 - len / 2}" width="${wid}" height="${len}" rx="3" fill="#f2e3a8" stroke="#c9b06a" stroke-width="1.5"/>` + T(x, 400, c, { size: 14, w: 700 }); });
    g += T(270, 424, 'sucrose concentration (mol/dm³)', { size: 13 });
    g += T(270, 40, 'Osmosis in potato cylinders', { size: 16, w: 700 }) + T(270, 62, 'same length cylinders (cork borer), blotted dry and weighed', { size: 13 }) + T(270, 80, 'before and after 24 hours in each solution', { size: 13 });
    g += `` + lgShadow(95, 152, 40, 4) + `<rect x="60" y="110" width="70" height="40" rx="5" fill="url(#LGbath)" stroke="#8e98a3"/><rect x="64" y="104" width="62" height="8" rx="2" fill="url(#LGsteelV)"/><rect x="72" y="122" width="46" height="16" rx="2" fill="#9fe0b0"/>` + T(95, 135, '2.41 g', { size: 11, w: 700, fill: '#163a22' }) + T(95, 168, 'balance', { size: 12 });
    // graph
    const x0 = 600, y0 = 250;
    g += `<path d="M${x0} 110V400M${x0} ${y0}H${x0 + 320}" stroke="currentColor" stroke-width="2.5"/>` + arrow(x0 + 310, y0, x0 + 326, y0, 'currentColor', 2.5, 10) + arrow(x0, 120, x0, 104, 'currentColor', 2.5, 10);
    g += T(x0 + 12, 104, '% change in mass', { size: 13, a: 'start' }) + T(x0 + 320, y0 - 12, 'sucrose concentration', { size: 13, a: 'end' });
    g += `<path d="M${x0 + 10} 150L${x0 + 290} 360" stroke="#3f7fd6" stroke-width="3"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="${x0 + 10 + i * 70}" cy="${150 + i * 52.5}" r="5" fill="#3f7fd6"/>`).join('')}`;
    g += `<circle cx="${x0 + 143}" cy="${y0}" r="7" fill="none" stroke="#e0a64a" stroke-width="2.5"/>` + T(x0 + 12, y0 + 96, 'crosses the axis: no net', { size: 12, a: 'start', fill: '#e0a64a' }) + T(x0 + 12, y0 + 112, 'movement of water (same', { size: 12, a: 'start', fill: '#e0a64a' }) + T(x0 + 12, y0 + 128, 'concentration as the cells)', { size: 12, a: 'start', fill: '#e0a64a' });
    g += T(x0 + 20, 140, 'gains water', { size: 12, a: 'start' }).replace(`x="${x0 + 20}"`, `x="${x0 + 30}"`) + T(x0 + 300, 390, 'loses water', { size: 12, a: 'end' });
    g += T(480, 456, '% change = (final mass − initial mass) ÷ initial mass × 100', { size: 14, w: 700 });
    return wrap(W, H, o.aria || 'Osmosis practical: potato cylinders in sucrose solutions and a graph of percentage change in mass', '', g);
  }

  /* ---------- enzymes and pH ---------- */
  function enzymePractical(o = {}) {
    const W = 980, H = 460;
    let g = '';
    // water bath
    g += `` + lgShadow(170, 352, 120, 6) + `<rect x="60" y="200" width="220" height="150" rx="8" fill="url(#LGbath)" stroke="#8e98a3" stroke-width="2"/><rect x="70" y="230" width="200" height="110" fill="${WATER}" fill-opacity=".55"/><rect x="70" y="230" width="200" height="110" fill="url(#LGliq)"/><path d="M70 230H270" stroke="#fff" stroke-width="2" opacity=".5"/><rect x="70" y="208" width="60" height="18" rx="3" fill="#9fe0b0"/>` + T(100, 222, '35 °C', { size: 11, w: 700, fill: '#163a22' });
    g += tubeV(150, 130, 180, '#f2eecf', 0.55) + tubeV(210, 130, 180, '#e7f0f2', 0.55) + T(150, 120, 'starch', { size: 12 }) + T(210, 120, 'amylase', { size: 12 });
    g += T(170, 376, 'water bath: keeps the temperature constant', { size: 12 });
    // spotting tile
    g += `` + lgShadow(500, 374, 150, 6) + `<rect x="360" y="226" width="280" height="146" rx="8" fill="#f4f6f7" stroke="#c9d0d6" stroke-width="2"/><rect x="364" y="229" width="272" height="6" rx="3" fill="#fff"/>`;
    const cols = ['#1e2440', '#1e2440', '#2b2a4a', '#5a4630', '#b57a2a', '#c9892f', '#c9892f', '#c9892f'];
    cols.forEach((c, i) => { const x = 395 + (i % 4) * 70, y = 265 + Math.floor(i / 4) * 60; g += `<circle cx="${x}" cy="${y}" r="20" fill="#dfe4e8"/><circle cx="${x}" cy="${y + 1}" r="18" fill="#c9d0d6"/><circle cx="${x}" cy="${y}" r="14" fill="${c}"/><ellipse cx="${x - 4}" cy="${y - 5}" rx="5" ry="3" fill="#fff" opacity=".35"/>` + T(x, y + 36, `${(i + 1) * 30} s`, { size: 11, fill: '#55606c' }); });
    g += `<path d="M560 150V200" stroke="${GL}" stroke-width="5"/><path d="M552 140H568V150H552Z" fill="#e0a64a"/><circle cx="560" cy="212" r="4" fill="${WATER}"/>` + T(600, 160, 'pipette', { size: 12, a: 'start' });
    g += T(500, 390, 'a drop of mixture into iodine every 30 s:', { size: 12 }) + T(500, 406, 'blue-black → orange-brown when the starch has gone', { size: 12 });
    g += T(330, 40, 'Effect of pH on amylase', { size: 16, w: 700 }) + T(330, 62, 'repeat with buffer solutions of different pH; record the time for starch to be digested', { size: 13 });
    g += stopwatch(700, 140);
    // graph
    const x0 = 720, y0 = 360;
    g += axes(x0, y0, 220, 170, 'pH', 'Rate');
    g += `<path d="M${x0 + 10} ${y0 - 10}Q${x0 + 70} ${y0 - 20} ${x0 + 100} ${y0 - 120}Q${x0 + 115} ${y0 - 165} ${x0 + 130} ${y0 - 120}Q${x0 + 160} ${y0 - 20} ${x0 + 210} ${y0 - 10}" stroke="#3f7fd6" stroke-width="3" fill="none"/>` + T(x0 + 115, y0 - 160, 'optimum', { size: 12 }).replace(`y="${y0 - 160}"`, `y="${y0 - 156}"`);
    g += T(x0 + 120, 430, 'rate = 1000 ÷ time (s)', { size: 13 });
    return wrap(W, H, o.aria || 'Enzyme practical: amylase and starch in a water bath, tested with iodine on a spotting tile', '', g);
  }

  /* ---------- pondweed photosynthesis ---------- */
  function pondweedPractical(o = {}) {
    const W = 980, H = 450;
    let g = bench(40, 620, 360);
    // lamp
    g += benchLamp(100, 360, id('lp'));
    for (let i = 0; i < 4; i++) g += `<path d="M${130 + i * 6} ${240 + i * 2}L${250} ${226 + i * 14}" stroke="#ffe680" stroke-width="2" opacity=".55" stroke-dasharray="6 5"/>`;
    // ruler
    g += `<rect x="110" y="372" width="400" height="14" fill="#f1d58a" stroke="#c9a94a"/>${Array.from({ length: 21 }, (_, i) => `<path d="M${110 + i * 20} 372v${i % 5 ? 5 : 10}" stroke="#7a5f1f" stroke-width="1.3"/>`).join('')}` + dbl(110, 404, 400, 404, 'currentColor', 1.6) + T(255, 424, 'distance d (cm)', { size: 13 });
    // beaker of water as heat shield and boiling tube with pondweed
    g += beaker(270, 220, 80, 140, 0.85) + T(310, 210, 'water', { size: 12 }).replace('y="210"', 'y="206"');
    g += tubeV(400, 150, 200, WATER, 0.88, 0.4);
    g += `<path d="M400 340Q396 300 404 270Q410 250 402 230" stroke="#3f8f3a" stroke-width="4" fill="none"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${400 + (i % 2 ? 4 : -4)} ${330 - i * 18}l${i % 2 ? 10 : -10} -6" stroke="#4fa84a" stroke-width="3"/>`).join('')}<path d="M394 344l12 4" stroke="#9aa3ad" stroke-width="4"/>`;
    g += [0, 1, 2, 3].map(i => `<circle cx="${402 + (i % 2) * 3}" cy="${215 - i * 16}" r="3.5" fill="none" stroke="#fff" stroke-width="1.5"/>`).join('');
    g += T(330, 40, 'Rate of photosynthesis in pondweed', { size: 16, w: 700 }) + T(330, 62, 'count oxygen bubbles per minute at different distances from the lamp', { size: 13 });
    // graph
    const x0 = 700, y0 = 340;
    g += axes(x0, y0, 240, 200, 'Light intensity', 'Bubbles per minute');
    g += `<path d="M${x0 + 4} ${y0 - 10}Q${x0 + 90} ${y0 - 170} ${x0 + 160} ${y0 - 180}H${x0 + 240}" stroke="#3f7fd6" stroke-width="3" fill="none"/>` + T(x0 + 195, y0 - 160, 'another factor limits', { size: 12 });
    g += T(x0 + 125, 410, 'light intensity ∝ 1 ÷ d²', { size: 14, w: 700 }) + T(x0 + 125, 430, 'halve d → 4 × the light intensity', { size: 12 });
    const labs = [{ x: 110, y: 246, t: 'Lamp', side: 'l', ly: 170 }, { x: 310, y: 300, t: 'Water absorbs heat from the lamp', side: 'r', ly: 110 }, { x: 404, y: 260, t: 'Pondweed (Elodea)', side: 'r', ly: 250 }, { x: 405, y: 200, t: 'Oxygen bubbles', side: 'r', ly: 190 }, { x: 400, y: 346, t: 'Paper clip', side: 'r', ly: 320 }];
    return wrap(W, H, o.aria || 'Pondweed photosynthesis practical: lamp at distance d, heat-shield beaker and oxygen bubbles', '', g + labels(labs, { W, H, lx: 60, rx: 450, size: 12, top: 100 }));
  }

  /* ---------- quadrats and transects ---------- */
  function samplingPractical(o = {}) {
    const W = 980, H = 460;
    let g = `<rect x="40" y="90" width="420" height="300" rx="8" fill="#5c9a46"/>`;
    const rnd = S._rnd ? S._rnd(7) : Math.random;
    for (let i = 0; i < 70; i++) { const x = 50 + rnd() * 400, y = 100 + rnd() * 280; g += `<circle cx="${f(x)}" cy="${f(y)}" r="3" fill="${i % 3 ? '#f4e36a' : '#ffffff'}"/>`; }
    // tape axes for random coordinates
    g += `<path d="M40 390H460M40 390V90" stroke="#f1d58a" stroke-width="5"/>`;
    [[110, 150], [300, 130], [210, 260], [380, 300], [90, 320]].forEach(([x, y]) => { g += `<rect x="${x}" y="${y}" width="44" height="44" fill="none" stroke="#fff" stroke-width="3"/>`; });
    g += `<path d="M300 152H40M322 130V390" stroke="#fff" stroke-width="1.2" stroke-dasharray="4 4" opacity=".8"/>`;
    g += T(250, 40, 'Random sampling with quadrats', { size: 16, w: 700 }) + T(250, 62, 'random-number coordinates along two tape measures', { size: 13 }) + T(250, 420, 'estimated population = mean per quadrat × (total area ÷ quadrat area)', { size: 13, w: 700 });
    // transect
    g += `<rect x="530" y="90" width="410" height="200" rx="8" fill="#5c9a46"/><path d="M530 98Q560 90 600 96V282Q560 290 530 282Z" fill="#2f5a2a"/><circle cx="560" cy="130" r="40" fill="#24461f"/><circle cx="575" cy="230" r="34" fill="#24461f"/>`;
    g += `<path d="M560 190H930" stroke="#f1d58a" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${580 + i * 62}" y="168" width="40" height="40" fill="none" stroke="#fff" stroke-width="3"/>`).join('')}`;
    g += T(735, 40, 'Belt transect', { size: 16, w: 700 }) + T(735, 62, 'quadrats at regular intervals along a tape', { size: 13 }) + T(735, 312, 'from shade under trees to open field:', { size: 13 }) + T(735, 330, 'record abundance and light intensity at each quadrat', { size: 13 });
    // close-up quadrat
    g += `<rect x="640" y="350" width="90" height="90" fill="#6aa84f" stroke="#fff" stroke-width="3"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${640 + (i + 1) * 9} 350V440M640 ${350 + (i + 1) * 9}H730" stroke="#fff" stroke-width=".8" opacity=".6"/>`).join('')}${[[655, 365], [690, 372], [672, 400], [712, 420], [660, 428]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#f4e36a"/>`).join('')}`;
    g += T(745, 380, '0.5 m × 0.5 m quadrat', { size: 12, a: 'start' }) + T(745, 398, 'count individuals or', { size: 12, a: 'start' }) + T(745, 414, 'estimate % cover', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Sampling practical: random quadrats placed using coordinates, and a belt transect from shade to open ground', '', g);
  }

  /* ---------- culturing bacteria, antibiotic discs ---------- */
  function culturePractical(o = {}) {
    const W = 1080, H = 450;
    let g = '<g transform="translate(80 0)">';
    // plate
    g += `<circle cx="250" cy="250" r="160" fill="#e8e1c0" stroke="${GL}" stroke-width="5"/><circle cx="250" cy="250" r="150" fill="#ddd2a4"/>`;
    const rnd = S._rnd ? S._rnd(3) : Math.random;
    for (let i = 0; i < 260; i++) { const a = rnd() * 6.283, r = Math.sqrt(rnd()) * 145; g += `<circle cx="${f(250 + Math.cos(a) * r)}" cy="${f(250 + Math.sin(a) * r)}" r="2.2" fill="#c7b06a" opacity=".8"/>`; }
    [[190, 190, 54, 'A'], [320, 210, 30, 'B'], [240, 330, 0, 'C'], [160, 300, 18, 'Control']].forEach(([x, y, z, l]) => {
      if (z) g += `<circle cx="${x}" cy="${y}" r="${z}" fill="#efe9cf"/>`;
      g += `<circle cx="${x}" cy="${y}" r="10" fill="#fff" stroke="#bbb"/>` + T(x, y + 4, l === 'Control' ? '' : l, { size: 11, w: 700, fill: '#333' });
    });
    g += `<circle cx="160" cy="300" r="18" fill="#ddd2a4"/><circle cx="160" cy="300" r="10" fill="#fff" stroke="#bbb"/>`;
    g += dbl(136, 190, 244, 190, '#c0392b', 1.8);
    g += `<path d="M120 112L160 136M380 112L340 136" stroke="#e0d090" stroke-width="10" opacity=".7"/>`;
    g += '</g>';
    g += T(330, 40, 'Antibiotic discs on a lawn of bacteria', { size: 16, w: 700 }) + T(330, 62, 'clear zone = bacteria killed or not growing', { size: 13 });
    g += T(330, 430, 'area of clear zone = π r²  (measure the diameter, r = d ÷ 2)', { size: 13, w: 700 });
    // aseptic steps
    const steps = ['Sterilise the inoculating loop in a Bunsen flame', 'Pour sterile agar; spread bacteria evenly', 'Place antibiotic discs with sterile forceps', 'Tape the lid on (not fully sealed), label', 'Incubate upside down at 25 °C for 48 hours'];
    g += T(800, 110, 'Aseptic technique', { size: 15, w: 700 });
    steps.forEach((s, i) => { g += `<circle cx="640" cy="${150 + i * 56}" r="13" fill="#e0a64a"/>` + T(640, 155 + i * 56, String(i + 1), { size: 13, w: 700, fill: '#1d2733' }) + T(664, 155 + i * 56, s, { size: 13, a: 'start' }); });
    g += T(640, 430, '25 °C limits growth of pathogens that grow at body temperature', { size: 12, a: 'start' }).replace('y="430"', 'y="420"');
    const labs = [{ x: 270, y: 190, t: 'Largest clear zone: most effective', side: 'l', ly: 110 }, { x: 240, y: 300, t: 'Control disc (no antibiotic)', side: 'l', ly: 330 }, { x: 210, y: 250, t: 'Lawn of bacteria on agar', side: 'l', ly: 230 }];
    return wrap(W, H, o.aria || 'Agar plate with antibiotic discs and clear zones, plus the steps of aseptic technique', '', g + labels(labs, { W, H, lx: 164, rx: 520, size: 12, top: 90 }));
  }

  /* ---------- decay: milk, lipase and pH ---------- */
  function decayPractical(o = {}) {
    const W = 980, H = 440;
    let g = '';
    [[150, '20 °C', '#f39ac9'], [330, '30 °C', '#f6c4de'], [510, '40 °C', '#fbf2f6']].forEach(([x, t, c]) => {
      g += `` + lgShadow(x, 352, 80, 5) + `<rect x="${x - 70}" y="200" width="140" height="150" rx="8" fill="url(#LGbath)" stroke="#8e98a3" stroke-width="2"/><rect x="${x - 60}" y="232" width="120" height="108" fill="${WATER}" fill-opacity=".55"/><rect x="${x - 60}" y="232" width="120" height="108" fill="url(#LGliq)"/><path d="M${x - 60} 232H${x + 60}" stroke="#fff" stroke-width="2" opacity=".5"/><rect x="${x - 60}" y="208" width="48" height="16" rx="3" fill="#9fe0b0"/>` + T(x - 36, 221, t, { size: 10, w: 700, fill: '#163a22' });
      g += tubeV(x + 18, 130, 180, c, 0.6, 0.95) + thermo(x - 20, 150, 300, 0.4);
    });
    g += T(150, 376, 'still pink', { size: 13 }) + T(330, 376, 'paler', { size: 13 }) + T(510, 376, 'colourless first', { size: 13 });
    g += T(330, 40, 'Temperature and the rate of decay', { size: 16, w: 700 }) + T(330, 62, 'milk + sodium carbonate + phenolphthalein (pink), then add lipase', { size: 13 });
    g += T(330, 410, 'lipase breaks fat into fatty acids → pH falls → indicator turns colourless; time how long it takes', { size: 13 });
    const x0 = 680, y0 = 330;
    g += axes(x0, y0, 250, 200, 'Temperature (°C)', 'Rate (1 ÷ time)');
    g += `<path d="M${x0 + 10} ${y0 - 20}Q${x0 + 110} ${y0 - 60} ${x0 + 160} ${y0 - 170}Q${x0 + 180} ${y0 - 200} ${x0 + 200} ${y0 - 120}Q${x0 + 215} ${y0 - 40} ${x0 + 240} ${y0 - 10}" stroke="#3f7fd6" stroke-width="3" fill="none"/>` + T(x0 + 125, y0 + 56, 'falls above the optimum: enzymes denature', { size: 12 });
    return wrap(W, H, o.aria || 'Decay practical: milk, lipase and phenolphthalein in water baths at different temperatures', '', g);
  }

  /* ======================= WAVE 6: A-level practical apparatus ======================= */
  const res = (x, y, vert) => vert ? `<rect x="${x - 9}" y="${y - 22}" width="18" height="44" fill="var(--panel,#121a33)" stroke="currentColor" stroke-width="2.5"/>` : `<rect x="${x - 22}" y="${y - 9}" width="44" height="18" fill="var(--panel,#121a33)" stroke="currentColor" stroke-width="2.5"/>`;
  const capS = (x, y, vert) => vert ? `<rect x="${x - 16}" y="${y - 8}" width="32" height="16" fill="var(--panel,#121a33)"/><path d="M${x - 14} ${y - 5}H${x + 14}M${x - 14} ${y + 5}H${x + 14}" stroke="currentColor" stroke-width="3"/>` : `<rect x="${x - 8}" y="${y - 16}" width="16" height="32" fill="var(--panel,#121a33)"/><path d="M${x - 5} ${y - 14}V${y + 14}M${x + 5} ${y - 14}V${y + 14}" stroke="currentColor" stroke-width="3"/>`;
  const rbFlask = (x, y, r, liq) => { const bd = `M${x - 9} ${y - r - 40}V${y - r + 4}A${r} ${r} 0 1 0 ${x + 9} ${y - r + 4}V${y - r - 40}Z`, lq = `M${x - r * 0.8} ${y + r * 0.2}A${r * 0.98} ${r * 0.98} 0 0 0 ${x + r * 0.8} ${y + r * 0.2}Z`; return `<path d="${bd}" fill="url(#LGglass)"/>` + (liq ? `<path d="${lq}" fill="${liq}" fill-opacity=".55"/><path d="${lq}" fill="url(#LGliq)"/><path d="M${f(x - r * .8)} ${f(y + r * .2)}H${f(x + r * .8)}" stroke="#fff" stroke-width="1.4" opacity=".5"/>` : '') + `<path d="M${x - 9} ${y - r - 40}V${y - r + 4}A${r} ${r} 0 1 0 ${x + 9} ${y - r + 4}V${y - r - 40}" fill="none" stroke="${GL}" stroke-width="3"/><path d="M${f(x - r * .62)} ${f(y - r * .42)}A${r * .78} ${r * .78} 0 0 0 ${f(x - r * .72)} ${f(y + r * .3)}" stroke="#fff" stroke-width="3" fill="none" opacity=".45" stroke-linecap="round"/><path d="M${x - 4} ${y - r - 36}V${y - r - 4}" stroke="#fff" stroke-width="2" opacity=".4"/>`; };
  const condenser = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a) * 14, ny = Math.cos(a) * 14;
    return `<path d="M${f(x1 + nx)} ${f(y1 + ny)}L${f(x2 + nx)} ${f(y2 + ny)}L${f(x2 - nx)} ${f(y2 - ny)}L${f(x1 - nx)} ${f(y1 - ny)}Z" fill="${WATER}" fill-opacity=".3" stroke="${GL}" stroke-width="2.5"/><path d="M${f(x1 - Math.cos(a) * 16)} ${f(y1 - Math.sin(a) * 16)}L${f(x2 + Math.cos(a) * 16)} ${f(y2 + Math.sin(a) * 16)}" stroke="${GL}" stroke-width="5"/>`; };
  const heater = (x, y) => lgShadow(x, y + 41, 58, 4) + `<rect x="${x - 50}" y="${y}" width="100" height="40" rx="6" fill="url(#LGiron)"/><rect x="${x - 44}" y="${y - 4}" width="88" height="7" rx="2" fill="url(#LGsteelV)"/><circle cx="${x + 30}" cy="${y + 24}" r="7" fill="#ef5b4c" stroke="#8e2418"/><circle cx="${x - 28}" cy="${y + 24}" r="8" fill="url(#LGsteelV)" stroke="#22262e"/><path d="M${x - 28} ${y + 17}v6" stroke="#22262e" stroke-width="2"/>`;

  /* ---------- Young modulus ---------- */
  function youngModulus(o = {}) {
    const W = 1000, H = 420;
    let g = bench(40, 880, 250);
    g += `<rect x="50" y="200" width="30" height="50" fill="#55606c"/><path d="M80 214H860" stroke="#d6d9de" stroke-width="2"/>`;
    g += `<rect x="560" y="226" width="300" height="16" fill="#f1d58a" stroke="#c9a94a"/>${Array.from({ length: 31 }, (_, i) => `<path d="M${560 + i * 10} 226v${i % 5 ? 5 : 10}" stroke="#7a5f1f" stroke-width="1.2"/>`).join('')}`;
    g += `<path d="M690 206l8 8-8 8" fill="#ef5b4c"/><rect x="684" y="204" width="10" height="20" fill="#ef5b4c"/>`;
    g += `<circle cx="880" cy="228" r="14" fill="#9aa3ad" stroke="#55606c" stroke-width="3"/><path d="M894 228V330" stroke="#d6d9de" stroke-width="2"/>${[0, 1, 2, 3].map(i => `<rect x="882" y="${330 + i * 14}" width="26" height="12" fill="${i % 2 ? '#6b7480' : '#55606c'}"/>`).join('')}`;
    g += dbl(80, 180, 689, 180, 'currentColor', 1.6) + T(385, 172, 'original length L (about 2 m, metre rule or tape)', { size: 13 });
    g += T(480, 40, 'Measuring the Young modulus of a metal wire', { size: 16, w: 700 }) + T(480, 62, 'add masses one at a time; read the extension from the marker against the fixed scale', { size: 13 });
    g += `<rect x="90" y="300" width="120" height="44" rx="6" fill="#c9ccd2" stroke="#7d858f"/><rect x="200" y="314" width="50" height="16" fill="#9aa3ad"/>` + T(170, 370, 'micrometer: diameter d', { size: 12 }) + T(170, 386, 'at several points', { size: 12 });
    g += T(480, 330, 'stress = F ÷ A,  A = π d² ÷ 4', { size: 14 }) + T(480, 352, 'strain = extension ÷ L', { size: 14 }) + T(480, 380, 'E = stress ÷ strain  (gradient of the stress–strain graph)', { size: 14, w: 700 });
    g += T(700, 200, 'marker', { size: 12, a: 'start' }) + T(880, 200, 'pulley', { size: 12 }) + T(916, 366, 'masses', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Young modulus practical: long wire over a pulley with a marker and a fixed scale', '', g + tag(65, 204, 44, 132, 'Wire clamped\nat one end', { anchor: 'start', size: 13, ex: 62, ey: 156 }));
  }

  /* ---------- e.m.f. and internal resistance ---------- */
  function emfInternal(o = {}) {
    const W = 960, H = 430;
    let g = `<rect x="160" y="70" width="160" height="80" rx="6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>`;
    g += wire('M100 110H190') + `<rect x="172" y="94" width="26" height="32" fill="var(--panel,#121a33)"/>` + cell(185, 110) + wire('M198 110H245') + res(270, 110) + wire('M292 110H420V300H100V110');
    g += T(185, 88, 'ε', { size: 15, w: 700 }) + T(270, 88, 'r', { size: 15, w: 700 }) + T(240, 168, 'the cell', { size: 12 });
    g += meter(420, 205, 'A') + `<rect x="220" y="282" width="60" height="36" fill="var(--panel,#121a33)"/>` + res(250, 300) + arrow(215, 322, 288, 278, 'currentColor', 2, 9) + T(250, 345, 'variable resistor R', { size: 12 });
    g += wire('M100 110V40H360V110') ;
    g += `<rect x="215" y="25" width="30" height="30" fill="var(--panel,#121a33)"/>` + meter(230, 40, 'V');
    g += T(260, 386, 'Change R, record V and I;', { size: 13 }) + T(260, 404, 'disconnect between readings so the cell does not warm up', { size: 12 });
    const x0 = 560, y0 = 340;
    g += axes(x0, y0, 330, 250, 'Current I (A)', 'Terminal p.d. V (V)');
    g += `<path d="M${x0} ${y0 - 200}L${x0 + 300} ${y0 - 50}" stroke="#3f7fd6" stroke-width="3"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="${x0 + 40 + i * 55}" cy="${y0 - 200 + (40 + i * 55) * 0.5}" r="4.5" fill="#3f7fd6"/>`).join('')}`;
    g += T(x0 - 8, y0 - 196, 'ε', { size: 15, w: 700, a: 'end' }) + T(x0 + 200, y0 - 160, 'gradient = −r', { size: 14, w: 700, a: 'start' });
    g += T(x0 + 165, 410, 'V = ε − I r', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'Circuit for finding e.m.f. and internal resistance, and the V against I graph', '', g);
  }

  /* ---------- Young's double slit and the diffraction grating ---------- */
  function doubleSlit(o = {}) {
    const W = 1000, H = 440;
    let g = panelT(260, "Young's double slit", 'λ = a x ÷ D') + panelT(760, 'Diffraction grating', 'd sin θ = n λ');
    // double slit
    g += `<rect x="40" y="186" width="70" height="28" rx="4" fill="#3d4654"/><path d="M110 200H200" stroke="#ef5b4c" stroke-width="3"/>` + T(75, 236, 'laser', { size: 12 });
    g += `<path d="M200 120V190M200 196V204M200 210V280" stroke="currentColor" stroke-width="5"/>`;
    for (let k = -2; k <= 2; k++) g += `<path d="M200 193L440 ${200 + k * 34}M200 207L440 ${200 + k * 34}" stroke="#ef5b4c" stroke-width="1" opacity=".35"/>`;
    g += `<rect x="440" y="110" width="12" height="180" fill="#d9dee4"/>${[-2, -1, 0, 1, 2].map(k => `<rect x="440" y="${194 + k * 34}" width="12" height="12" fill="#ef5b4c"/>`).join('')}`;
    g += dbl(200, 320, 440, 320, 'currentColor', 1.6) + T(320, 342, 'D (slits to screen, ~1 m)', { size: 12 }) + dbl(470, 200, 470, 234, 'currentColor', 1.4) + T(478, 222, 'x', { size: 14, w: 700, a: 'start' }) + T(206, 108, 'slits, separation a', { size: 12 }).replace('text-anchor="middle"', 'text-anchor="start"').replace('x="206"', 'x="150"');
    g += T(260, 396, 'measure across several fringes and divide;', { size: 12 }) + T(260, 412, 'use a metre rule for D and a travelling microscope or vernier for a', { size: 12 });
    // grating
    g += `<rect x="560" y="186" width="70" height="28" rx="4" fill="#3d4654"/><path d="M630 200H680" stroke="#3fb27f" stroke-width="3"/>` + T(595, 236, 'laser', { size: 12 });
    g += `<path d="M680 120V280" stroke="currentColor" stroke-width="4" stroke-dasharray="2 2"/>`;
    [[0, 0], [1, 70], [-1, -70], [2, 160], [-2, -160]].forEach(([n, dy]) => { g += `<path d="M680 200L930 ${200 + dy}" stroke="#3fb27f" stroke-width="1.8" opacity=".7"/><circle cx="930" cy="${200 + dy}" r="6" fill="#3fb27f"/>` + T(946, 205 + dy, `n = ${n}`, { size: 12, a: 'start' }); });
    g += `<path d="M930 30V380" stroke="#d9dee4" stroke-width="6"/><path d="M740 200A60 60 0 0 1 737 216" stroke="#e0a64a" stroke-width="2" fill="none"/>` + T(752, 218, 'θ', { size: 14, w: 700, fill: '#e0a64a', a: 'start' });
    g += T(800, 396, 'd = 1 ÷ (lines per metre);', { size: 12 }) + T(800, 412, 'sharp, bright, widely spaced maxima', { size: 12 });
    return wrap(W, H, o.aria || "Young's double-slit experiment and a diffraction grating with laser light", '', g);
  }

  /* ---------- capacitor charge and discharge ---------- */
  function capacitorRC(o = {}) {
    const W = 980, H = 430;
    let g = wire('M80 120V320H380V120') + `<rect x="66" y="196" width="28" height="30" fill="var(--panel,#121a33)"/>` + cell(80, 210).replace(/M(\d+) (\d+)V/g, 'M$1 $2V').replace(`M74 192V228M86 200V220`, '') ;
    g = wire('M80 260V320H380V260') + wire('M80 120V200') + `<path d="M62 210H98M70 222H90" stroke="currentColor" stroke-width="3.5"/>` + wire('M80 222V260');
    g += wire('M80 120V100H166') + `<circle cx="170" cy="100" r="4" fill="currentColor"/><circle cx="170" cy="140" r="4" fill="currentColor"/><circle cx="234" cy="120" r="4" fill="currentColor"/><path d="M231 119L174 102" stroke="currentColor" stroke-width="2.5"/>`;
    g += wire('M170 144V200') + res(170, 222, true) + wire('M170 244V320');
    g += wire('M238 120H380V192') + capS(380, 200, true) + wire('M380 208V260');
    g += wire('M380 170H440V196') + meter(440, 210, 'V') + wire('M440 224V240H380');
    g += T(205, 82, 'two-way switch', { size: 12 }) + T(345, 204, 'C', { size: 14, w: 700, a: 'end' }) + T(192, 226, 'R', { size: 14, w: 700, a: 'start' }) + T(56, 214, 'd.c.', { size: 12, a: 'end' });
    g += T(260, 370, 'switch to the supply: C charges; switch to R: C discharges through R', { size: 12 }) + T(260, 388, 'record V every 5 s (or use a data logger)', { size: 12 });
    const x0 = 560, y0 = 330;
    g += axes(x0, y0, 360, 240, 'Time t', 'p.d. across C');
    let d = '', d2 = ''; for (let i = 0; i <= 40; i++) { const t = i / 40; d += (i ? 'L' : 'M') + f(x0 + t * 340) + ' ' + f(y0 - 200 * Math.exp(-t * 4)); d2 += (i ? 'L' : 'M') + f(x0 + t * 340) + ' ' + f(y0 - 200 * (1 - Math.exp(-t * 4))); }
    g += `<path d="${d}" stroke="#3f7fd6" stroke-width="3" fill="none"/><path d="${d2}" stroke="#e0a64a" stroke-width="3" fill="none" stroke-dasharray="8 5"/>`;
    g += `<path d="M${x0 + 85} ${y0}V${f(y0 - 200 * Math.exp(-1))}H${x0}" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 4" fill="none"/>` + T(x0 + 85, y0 + 18, 'τ = RC', { size: 12 }) + T(x0 - 6, f(y0 - 200 * Math.exp(-1)) + 4, '0.37 V₀', { size: 12, a: 'end' });
    g += T(x0 + 250, y0 - 70, 'discharge: V = V₀ e^(−t/RC)', { size: 12, a: 'start', fill: '#3f7fd6' }).replace(`x="${x0 + 250}"`, `x="${x0 + 150}"`) + T(x0 + 150, y0 - 190, 'charging', { size: 12, a: 'start', fill: '#e0a64a' });
    g += T(x0 + 180, 410, 'ln V against t is a straight line with gradient −1/RC', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Capacitor charging and discharging circuit with a two-way switch, and exponential graphs', '', g);
  }

  /* ---------- photoelectric effect and LEDs ---------- */
  function photoelectric(o = {}) {
    const W = 980, H = 440;
    let g = panelT(250, 'Gold-leaf electroscope', 'a negatively charged zinc plate') + panelT(740, 'Planck constant from LEDs', 'eV = h c ÷ λ');
    g += `<path d="M180 200V330Q180 350 200 350H300Q320 350 320 330V200Q320 180 300 180H200Q180 180 180 200Z" fill="#e8f3f8" fill-opacity=".12" stroke="${GL}" stroke-width="3"/><rect x="244" y="150" width="12" height="30" fill="#c9ccd2"/><rect x="200" y="130" width="100" height="20" fill="#9aa3ad" stroke="#6b7480"/>`;
    g += `<path d="M250 180V290" stroke="#e0b64a" stroke-width="4"/><path d="M250 250L262 300" stroke="#f4d36a" stroke-width="3"/>`;
    g += `<rect x="60" y="80" width="70" height="40" rx="6" fill="#3d4654"/><path d="M130 100L200 132" stroke="#b07cff" stroke-width="3" stroke-dasharray="6 5"/>` + T(95, 140, 'UV lamp', { size: 12 });
    ['−', '−', '−'].forEach((c, i) => { g += T(210 + i * 40, 126, c, { size: 16, w: 700, fill: '#ef5b4c' }); });
    for (let i = 0; i < 3; i++) g += arrow(220 + i * 30, 126, 230 + i * 30, 90, '#5aa9f0', 1.6, 7);
    g += T(310, 84, 'photoelectrons', { size: 12, a: 'start', fill: '#5aa9f0' });
    g += T(250, 380, 'UV: leaf falls (electrons emitted at once).', { size: 12 }) + T(250, 396, 'Bright visible light: nothing happens.', { size: 12 }) + T(250, 412, 'Threshold frequency: hf = φ + KEmax', { size: 13, w: 700 });
    // LED circuit
    g += wire('M600 120H880V300H600Z') + `<rect x="726" y="104" width="28" height="32" fill="var(--panel,#121a33)"/>` + cell(740, 110).replace(/110/g, '120');
    g += `<rect x="584" y="190" width="32" height="50" fill="var(--panel,#121a33)"/>` + res(600, 215, true) + arrow(582, 244, 622, 186, 'currentColor', 2, 8);
    g += `<rect x="716" y="282" width="48" height="36" fill="var(--panel,#121a33)"/><path d="M728 288V312L752 300Z" fill="#ef5b4c"/><path d="M752 288V312" stroke="currentColor" stroke-width="3"/>` + arrow(744, 284, 760, 266, '#ef5b4c', 1.6, 6) + arrow(754, 290, 770, 272, '#ef5b4c', 1.6, 6);
    g += wire('M700 300V350H725M755 350H780V300') + meter(740, 350, 'V') + meter(880, 210, 'A');
    g += T(740, 396, 'increase V until each LED just lights;', { size: 12 }) + T(740, 412, 'plot V against 1/λ: gradient = h c ÷ e', { size: 12, w: 700 });
    ['#ef5b4c', '#f5a524', '#3fb27f', '#3f7fd6'].forEach((c, i) => { g += `<circle cx="${640 + i * 22}" cy="80" r="7" fill="${c}"/>`; });
    g += T(740, 84, 'LEDs of known λ', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Photoelectric effect with a gold-leaf electroscope, and finding the Planck constant with LEDs', '', g);
  }

  /* ---------- charged particles in E and B fields ---------- */
  function chargedBeams(o = {}) {
    const W = 980, H = 420;
    let g = panelT(250, 'Uniform electric field', 'force is constant and parallel to E: a parabola') + panelT(740, 'Uniform magnetic field', 'force is at 90° to v: a circle');
    g += `<rect x="120" y="110" width="280" height="12" fill="#ef5b4c"/><rect x="120" y="290" width="280" height="12" fill="#3f7fd6"/>` + T(110, 120, '+', { size: 20, w: 700, a: 'end' }) + T(110, 302, '−', { size: 20, w: 700, a: 'end' });
    for (let i = 0; i < 6; i++) g += arrow(150 + i * 48, 128, 150 + i * 48, 282, '#e0a64a', 1.4, 8);
    let d = 'M40 206'; for (let i = 0; i <= 40; i++) { const x = 120 + i * 7; d += `L${x} ${f(206 - 0.0008 * (x - 120) * (x - 120))}`; }
    g += `<path d="${d}L470 ${f(206 - 0.0008 * 280 * 280 - 2 * 0.0008 * 280 * 70)}" stroke="#5aa9f0" stroke-width="3" fill="none"/><circle cx="60" cy="206" r="5" fill="#5aa9f0"/>` + T(60, 232, 'electron', { size: 12 });
    g += T(250, 340, 'E = V ÷ d,  F = e E', { size: 13, w: 700 }) + T(250, 358, 'horizontal velocity constant; vertical acceleration constant', { size: 12 });
    // magnetic
    g += `<rect x="560" y="90" width="360" height="260" rx="6" fill="#3f7fd6" fill-opacity=".08" stroke="#3f7fd6" stroke-opacity=".4"/>`;
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) g += `<circle cx="${590 + c * 50}" cy="${115 + r * 52}" r="6" fill="none" stroke="#7fa6e0" stroke-width="1.4"/><circle cx="${590 + c * 50}" cy="${115 + r * 52}" r="2" fill="#7fa6e0"/>`;
    g += `<path d="M520 330H740" stroke="#5aa9f0" stroke-width="3"/><path d="M740 330A100 100 0 0 0 740 130A100 100 0 0 0 740 330" stroke="#5aa9f0" stroke-width="3" fill="none" stroke-dasharray="0"/>` + arrow(740, 330, 690, 330, '#5aa9f0', 0, 0);
    g += arrow(740, 130, 720, 130, '#5aa9f0', 3, 12) + arrow(840, 230, 790, 230, '#ef5b4c', 3, 12) + T(830, 220, 'F', { size: 14, w: 700, fill: '#ef5b4c', a: 'start' }).replace('x="830"', 'x="846"');
    g += T(740, 380, 'B out of the page;  F = B q v,  r = m v ÷ (B q)', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'An electron beam deflected into a parabola between charged plates and into a circle in a magnetic field', '', g);
  }

  /* ---------- Rutherford scattering ---------- */
  function rutherford(o = {}) {
    const W = 980, H = 440;
    let g = `<circle cx="280" cy="230" r="170" fill="#e8f3f8" fill-opacity=".06" stroke="${GL}" stroke-width="3"/>` + T(280, 420, 'evacuated chamber (alpha particles would be absorbed by air)', { size: 12 });
    g += `<rect x="90" y="206" width="70" height="48" fill="#6b7480" stroke="#3d4654"/><rect x="146" y="224" width="14" height="12" fill="#1f2227"/>` + T(84, 224, 'alpha', { size: 12, a: 'end' }) + T(84, 240, 'source', { size: 12, a: 'end' });
    g += `<path d="M160 230H272" stroke="#e0a64a" stroke-width="3"/><rect x="274" y="170" width="6" height="120" fill="#e8c35a"/>` + T(277, 160, 'gold foil', { size: 12 });
    g += `<path d="M280 230L440 230M280 230L436 196M280 230L380 330M280 230L176 150" stroke="#e0a64a" stroke-width="1.6" stroke-dasharray="5 4"/>`;
    g += `<path d="M280 230L420 110" stroke="#9aa3ad" stroke-width="6"/><rect x="408" y="88" width="40" height="34" rx="5" fill="#3d4654" transform="rotate(-40 428 105)"/>` + T(470, 90, 'detector (or microscope with a', { size: 12, a: 'start' }) + T(470, 106, 'zinc sulfide screen) on a rotating arm', { size: 12, a: 'start' });
    // nucleus view
    const cx = 760, cy = 230;
    g += `<circle cx="${cx}" cy="${cy}" r="10" fill="#ef5b4c"/>` + T(cx + 16, cy - 14, 'nucleus', { size: 12, a: 'start' });
    [-90, -50, 50, 90, 130].forEach(dy => { g += `<path d="M560 ${cy + dy}H940" stroke="#e0a64a" stroke-width="1.8"/>`; });
    g += `<path d="M560 ${cy - 20}H700Q745 ${cy - 22} 770 ${cy - 60}L860 ${cy - 170}" stroke="#e0a64a" stroke-width="1.8" fill="none"/><path d="M560 ${cy + 24}H690Q730 ${cy + 26} 760 ${cy + 50}L900 ${cy + 120}" stroke="#e0a64a" stroke-width="1.8" fill="none"/><path d="M560 ${cy + 3}H735Q748 ${cy + 3} 735 ${cy + 8}L560 ${cy + 40}" stroke="#ef5b4c" stroke-width="2" fill="none"/>`;
    g += T(750, 40, 'What the results show', { size: 15, w: 700 }) + T(750, 380, 'most pass straight through: the atom is mostly empty space', { size: 12 }) + T(750, 396, 'some deflect: the nucleus is positive', { size: 12 }) + T(750, 412, 'very few bounce back: the nucleus is tiny and dense', { size: 12 });
    return wrap(W, H, o.aria || 'Rutherford alpha-particle scattering apparatus and the paths of alpha particles near a nucleus', '', g);
  }

  /* ---------- organic: reflux and distillation ---------- */
  function refluxDistil(o = {}) {
    const W = 1000, H = 470;
    let g = panelT(200, 'Heating under reflux', 'vapour condenses and drips back into the flask') + panelT(700, 'Distillation', 'separates a liquid by its boiling point');
    // reflux
    g += heater(220, 380) + rbFlask(220, 340, 50, '#e8b3d6') + condenser(220, 250, 220, 100) + stand(330, 420, 360, 170, 234);
    g += `<path d="M206 228H180V270M234 120H262V104" stroke="${GL}" stroke-width="4" fill="none"/>` + arrow(160, 290, 180, 272, COLD, 2.5, 9) + arrow(262, 106, 278, 90, COLD, 2.5, 9) + T(150, 300, 'water in', { size: 12, a: 'end' }) + T(282, 92, 'water out', { size: 12, a: 'start' }) + T(240, 200, 'condenser', { size: 12, a: 'start' }) + T(220, 436, 'electric heater or water bath (no flame)', { size: 12 });
    g += `<circle cx="210" cy="356" r="4" fill="#fff"/><circle cx="228" cy="362" r="4" fill="#fff"/>` + T(220, 452, 'anti-bumping granules; no stopper on top', { size: 12 });
    // distillation
    g += heater(520, 380) + rbFlask(520, 340, 50, '#e8b3d6') + `<path d="M511 250V230H540V250" fill="none" stroke="${GL}" stroke-width="3"/>` + thermo(526, 170, 236, 0.5);
    g += condenser(560, 240, 790, 320) + `<path d="M520 230L560 240" stroke="${GL}" stroke-width="5"/>`;
    g += `<path d="M810 340V420Q810 434 824 434H880Q894 434 894 420V340" fill="none" stroke="${GL}" stroke-width="3"/><path d="M812 400H892V432H812Z" fill="${WATER}" fill-opacity=".5"/>`;
    g += arrow(760, 350, 750, 326, COLD, 2.5, 9) + arrow(600, 222, 590, 198, COLD, 2.5, 9) + T(760, 368, 'water in', { size: 12 }) + T(600, 190, 'water out', { size: 12 });
    g += T(536, 156, 'thermometer bulb level with the side arm', { size: 12, a: 'start' }) + T(724, 262, 'condenser', { size: 12, a: 'start' }) + T(900, 424, 'distillate', { size: 12, a: 'start' });
    g += T(700, 452, 'collect the fraction that boils at the right temperature', { size: 12 });
    return wrap(W, H, o.aria || 'Organic apparatus: heating under reflux and distillation', '', g);
  }

  /* ---------- organic: separating funnel, drying, recrystallisation, melting point ---------- */
  function purification(o = {}) {
    const W = 1000, H = 460;
    let g = panelT(140, 'Separating funnel', 'remove the aqueous layer') + panelT(390, 'Drying', 'anhydrous MgSO₄ or CaCl₂') + panelT(640, 'Vacuum filtration', 'Büchner funnel and flask') + panelT(880, 'Melting point', 'pure: sharp, matches data');
    g += `<path d="M104 170Q98 194 106 215H174Q182 194 176 170Z" fill="#e8d17a" fill-opacity=".5"/><path d="M106 215Q116 246 132 262H148Q164 246 174 215Z" fill="${WATER}" fill-opacity=".55"/>`;
    g += `<path d="M132 96V122C92 150 92 232 132 262L136 280V340M144 340V280L148 262C188 232 188 150 148 122V96" fill="url(#LGglass)" stroke="${GL}" stroke-width="3"/><rect x="130" y="86" width="20" height="12" rx="3" fill="#55606c"/><rect x="126" y="296" width="28" height="10" rx="2" fill="#55606c"/>`;
    g += T(200, 200, 'organic', { size: 12, a: 'start' }) + T(200, 246, 'aqueous', { size: 12, a: 'start' }) + T(140, 360, 'shake, release pressure,', { size: 12 }) + T(140, 376, 'run off the lower layer', { size: 12 });
    g += `` + beaker(350, 170, 80, 120, .72, "#e8d17a", .45) + `${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${360 + i * 11}" y="${276 - (i % 2) * 6}" width="8" height="8" fill="#fff"/>`).join('')}` + T(390, 330, 'swirl until the liquid', { size: 12 }) + T(390, 346, 'turns clear; then filter', { size: 12 });
    g += `<path d="M622 250V272L572 368Q566 380 580 380H700Q714 380 708 368L658 272V250" fill="url(#LGglass)" stroke="${GL}" stroke-width="3"/><path d="M582 368H698L690 352H590Z" fill="#e8d17a" fill-opacity=".45"/><path d="M664 286H730" stroke="${GL}" stroke-width="5"/><rect x="618" y="240" width="44" height="14" rx="3" fill="url(#LGiron)"/><rect x="600" y="190" width="80" height="34" rx="4" fill="#f4f6f7" stroke="#c9d0d6" stroke-width="2"/><path d="M632 224V262H648V224" fill="#f4f6f7" stroke="#c9d0d6" stroke-width="2"/><rect x="606" y="182" width="68" height="8" fill="#fff8e0"/>` + T(734, 290, 'to vacuum', { size: 11, a: 'start' }) + T(640, 410, 'wash crystals with a little', { size: 12 }) + T(640, 426, 'cold solvent', { size: 12 });
    g += `` + lgShadow(880, 312, 58, 5) + `<rect x="830" y="160" width="100" height="150" rx="8" fill="url(#LGiron)"/><rect x="842" y="174" width="76" height="22" rx="3" fill="#9fe0b0"/>` + T(880, 190, '122 °C', { size: 12, w: 700, fill: '#163a22' }) + `<rect x="864" y="220" width="32" height="50" rx="4" fill="#1f2227"/><path d="M876 214V260" stroke="#e8f3f8" stroke-width="3"/><rect x="874.5" y="250" width="3" height="10" fill="#fff"/>` + T(880, 340, 'capillary tube of solid;', { size: 12 }) + T(880, 356, 'impure: lower, wider range', { size: 12 });
    g += T(500, 450, 'Recrystallisation: dissolve in the minimum hot solvent, filter hot, cool to crystallise, filter under reduced pressure', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Purifying organic products: separating funnel, drying agent, Büchner filtration and melting point', '', g);
  }

  /* ---------- electrochemical cell with the standard hydrogen electrode ---------- */
  function electrochemCell(o = {}) {
    const W = 980, H = 440;
    let g = beaker(140, 200, 180, 170, 0.7, '#cfe7f2') + beaker(620, 200, 180, 170, 0.7, '#56a0e0', 0.55);
    g += `<path d="M300 260V200Q300 160 340 160H600Q640 160 640 200V260" fill="none" stroke="#e0d090" stroke-width="18"/><path d="M300 260V200Q300 160 340 160H600Q640 160 640 200V260" fill="none" stroke="#f4ecc4" stroke-width="12"/>`;
    g += `<path d="M216 130V250Q216 262 230 262Q244 262 244 250V130" fill="url(#LGglass)" stroke="${GL}" stroke-width="3"/><rect x="222" y="280" width="16" height="40" fill="url(#LGzinc)" stroke="#8e98a3"/><path d="M230 130V280" stroke="#9aa3ad" stroke-width="2"/><path d="M180 140H216" stroke="${GL}" stroke-width="4"/>` + arrow(150, 140, 176, 140, '#cfd5dc', 2.5, 9) + [0, 1, 2].map(i => `<circle cx="${226 + (i % 2) * 8}" cy="${300 + i * 12}" r="3" fill="none" stroke="#fff"/>`).join('');
    g += `<rect x="702" y="220" width="16" height="120" rx="2" fill="url(#LGcopper)"/>`;
    g += wire('M230 130V70H420') + meter(450, 70, 'V') + wire('M480 70H710V220') + T(450, 40, 'high-resistance voltmeter: +0.34 V', { size: 13, w: 700 });
    g += T(230, 400, 'standard hydrogen electrode', { size: 14, w: 700 }) + T(230, 418, 'H₂ at 100 kPa, 1.00 mol dm⁻³ H⁺, platinum', { size: 12 });
    g += T(710, 400, 'Cu²⁺/Cu half-cell', { size: 14, w: 700 }) + T(710, 418, '1.00 mol dm⁻³ Cu²⁺, copper electrode', { size: 12 });
    g += T(470, 138, 'salt bridge (filter paper soaked in KNO₃)', { size: 12 }) + T(470, 260, 'standard conditions: 298 K', { size: 12 });
    g += T(140, 136, 'H₂ in', { size: 12, a: 'end' });
    g += T(212, 304, 'platinum', { size: 12, a: 'end' }) + T(212, 318, 'electrode', { size: 12, a: 'end' });
    return wrap(W, H, o.aria || 'Electrochemical cell: standard hydrogen electrode connected to a copper half-cell by a salt bridge', '', g);
  }

  /* ---------- pH titration curves ---------- */
  function phCurves(o = {}) {
    const W = 1000, H = 400;
    const gr = (x0, title, start, end, mid, lo, hi) => {
      let s = `<path d="M${x0} 90V300H${x0 + 200}" stroke="currentColor" stroke-width="2" fill="none"/>` + T(x0 + 100, 330, title, { size: 13, w: 700 });
      const y = p => 300 - p * 15;
      s += `<rect x="${x0}" y="${y(10)}" width="200" height="${y(8.2) - y(10)}" fill="#ef5b9c" opacity=".18"/><rect x="${x0}" y="${y(4.4)}" width="200" height="${y(3.1) - y(4.4)}" fill="#f5a524" opacity=".22"/>`;
      s += `<path d="M${x0} ${y(start)}C${x0 + 70} ${y(start + 0.6)} ${x0 + 95} ${y(lo)} ${x0 + 100} ${y(mid)}C${x0 + 105} ${y(hi)} ${x0 + 130} ${y(end - 0.4)} ${x0 + 200} ${y(end)}" stroke="#3f7fd6" stroke-width="3" fill="none"/>`;
      return s;
    };
    let g = T(30, 96, 'pH', { size: 12, a: 'end' }) + gr(40, 'strong acid + strong base', 1, 13, 7, 3, 11) + gr(280, 'weak acid + strong base', 3, 13, 8.7, 7, 11) + gr(520, 'strong acid + weak base', 1, 11, 5.3, 3, 7.5) + gr(760, 'weak acid + weak base', 3, 11, 7, 4.5, 9.5);
    g += T(500, 40, 'pH curves: acid in the flask, base added from the burette', { size: 16, w: 700 }) + T(500, 62, 'choose an indicator whose colour-change range lies on the vertical section', { size: 13 });
    g += `<rect x="300" y="352" width="18" height="12" fill="#ef5b9c" opacity=".5"/>` + T(324, 362, 'phenolphthalein (8.2–10)', { size: 12, a: 'start' }) + `<rect x="540" y="352" width="18" height="12" fill="#f5a524" opacity=".55"/>` + T(564, 362, 'methyl orange (3.1–4.4)', { size: 12, a: 'start' });
    g += T(860, 384, 'no sharp change: no suitable indicator', { size: 11 });
    return wrap(W, H, o.aria || 'Four pH titration curves with the ranges of phenolphthalein and methyl orange', '', g);
  }

  /* ---------- combustion calorimetry ---------- */
  function combustionCal(o = {}) {
    const W = 940, H = 440;
    let g = bench(80, 560, 400);
    g += stand(140, 410, 330, 150, 300);
    g += `<path d="M250 140V250Q250 262 262 262H338Q350 262 350 250V140" fill="url(#LGcopper)" stroke="#8a4f22" stroke-width="3"/><path d="M254 170H346V258H254Z" fill="${WATER}" fill-opacity=".45"/>` + thermo(310, 90, 240, 0.5);
    g += `<path d="M268 330Q268 304 300 304Q332 304 332 330V400H268Z" fill="url(#LGglass)" stroke="${GL}" stroke-width="3"/>` + lgShadow(300, 402, 40, 4) + `<path d="M270 360H330V398H270Z" fill="#e8d17a" fill-opacity=".55"/><path d="M270 360H330V398H270Z" fill="url(#LGliq)"/><rect x="296" y="290" width="8" height="16" fill="#f4f1e6"/><path d="M292 290Q290 276 300 262Q310 276 308 290Z" fill="#ffb03a"/>`;
    g += `<path d="M220 400V230M380 400V230" stroke="#c9ccd2" stroke-width="4" opacity=".7"/>`;
    g += T(470, 40, 'Enthalpy change of combustion', { size: 16, w: 700 }) + T(470, 62, 'weigh the spirit burner before and after; q = m c ΔT', { size: 13 });
    g += T(720, 120, 'Why the value is too small', { size: 14, w: 700 });
    ['energy lost to the surroundings and the can', 'incomplete combustion (soot on the can)', 'evaporation of fuel from the wick', 'not under standard conditions'].forEach((t, i) => { g += T(600, 150 + i * 24, '• ' + t, { size: 12, a: 'start' }); });
    g += T(720, 290, 'ΔcH = −q ÷ n (fuel)', { size: 15, w: 700 });
    const labs = [{ x: 300, y: 200, t: 'Copper calorimeter of water', side: 'l', ly: 120 }, { x: 300, y: 380, t: 'Spirit burner (fuel)', side: 'l', ly: 380 }, { x: 220, y: 300, t: 'Draught shield', side: 'l', ly: 300 }, { x: 310, y: 100, t: 'Thermometer', side: 'r', ly: 90 }];
    return wrap(W, H, o.aria || 'Combustion calorimetry: spirit burner heating a copper can of water, with sources of error', '', g + labels(labs, { W, H, lx: 120, rx: 400, size: 12 }));
  }

  /* ======================= WAVE 7: more apparatus ======================= */
  const tubeC = (x, y, h, liq, lvl, ppt, op = 0.75) => tubeV(x, y, h, liq, lvl, op) + (ppt ? `<path d="M${x - 13} ${y + h - 30}H${x + 13}V${y + h - 14}Q${x + 13} ${y + h} ${x} ${y + h}Q${x - 13} ${y + h} ${x - 13} ${y + h - 14}Z" fill="${ppt}"/>` : '');

  /* ---------- tests for anions ---------- */
  function anionTests(o = {}) {
    const W = 1000, H = 440;
    let g = panelT(170, 'Carbonate', 'add dilute acid') + panelT(500, 'Halides', 'add dilute nitric acid, then silver nitrate') + panelT(840, 'Sulfate', 'add dilute HCl, then barium chloride');
    g += tubeC(110, 150, 170, '#e7f0f2', 0.55, null, 0.3) + [0, 1, 2, 3].map(i => `<circle cx="${104 + (i % 2) * 10}" cy="${290 - i * 18}" r="4" fill="none" stroke="#fff" stroke-width="1.5"/>`).join('');
    g += `<rect x="98" y="140" width="24" height="14" rx="3" fill="#55606c"/><path d="M110 140V110H220V200" stroke="${GL}" stroke-width="4" fill="none"/>` + tubeC(230, 170, 150, '#f4f5f6', 0.6, null, 0.55) + `<path d="M218 210V300" stroke="${GL}" stroke-width="3"/>` + [0, 1].map(i => `<circle cx="${222 + i * 8}" cy="${280 - i * 20}" r="3.5" fill="none" stroke="#fff"/>`).join('');
    g += T(110, 350, 'fizzes', { size: 12 }) + T(230, 350, 'limewater', { size: 12 }) + T(230, 366, 'turns milky', { size: 12 }) + T(170, 400, 'carbon dioxide given off', { size: 13, w: 700 });
    [[420, '#f8f8f6', 'chloride', 'white'], [500, '#efe6c4', 'bromide', 'cream'], [580, '#f2dc6a', 'iodide', 'yellow']].forEach(([x, c, n, col]) => { g += tubeC(x, 150, 170, '#eef3f5', 0.6, c, 0.3) + T(x, 350, n, { size: 13, w: 700 }) + T(x, 368, col, { size: 12 }) + T(x, 384, 'precipitate', { size: 12 }); });
    g += tubeC(840, 150, 170, '#eef3f5', 0.6, '#ffffff', 0.3) + T(840, 350, 'white precipitate', { size: 13, w: 700 }) + T(840, 368, '(barium sulfate)', { size: 12 });
    g += T(500, 420, 'The acid removes carbonate ions first, which would also give a precipitate.', { size: 12 });
    return wrap(W, H, o.aria || 'Tests for carbonate, halide and sulfate ions with the results', '', g);
  }

  /* ---------- metal displacement ---------- */
  function displacementMetal(o = {}) {
    const W = 960, H = 420;
    let g = panelT(200, 'Before', 'iron nail in blue copper sulfate solution') + panelT(560, 'After', 'brown copper coats the nail; solution turns pale green');
    g += beaker(130, 140, 140, 190, 0.7, '#3a8fe0', 0.6) + `<path d="M200 100V300" stroke="#8e98a3" stroke-width="10" stroke-linecap="round"/><path d="M190 100H210" stroke="#8e98a3" stroke-width="6"/>`;
    g += beaker(490, 140, 140, 190, 0.7, '#9fd49a', 0.45) + `<path d="M560 100V300" stroke="#8e98a3" stroke-width="10" stroke-linecap="round"/><path d="M550 100H570" stroke="#8e98a3" stroke-width="6"/><path d="M560 205V302" stroke="#b5652e" stroke-width="13" stroke-linecap="round" opacity=".95"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="${555 + (i % 2) * 10}" cy="${215 + i * 18}" r="3" fill="#8a4a20"/>`).join('')}`;
    g += arrow(300, 230, 460, 230, 'currentColor', 3);
    g += T(380, 380, 'Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)', { size: 15, w: 700 }) + T(380, 402, 'a more reactive metal displaces a less reactive metal from its compound', { size: 13 });
    const lad = ['potassium', 'sodium', 'calcium', 'magnesium', 'aluminium', '(carbon)', 'zinc', 'iron', '(hydrogen)', 'copper', 'silver', 'gold'];
    g += T(840, 70, 'Reactivity series', { size: 14, w: 700 });
    lad.forEach((m, i) => { g += T(840, 98 + i * 22, m, { size: 12, w: m === 'iron' || m === 'copper' ? 700 : 400, fill: m === 'iron' ? '#e0a64a' : m === 'copper' ? '#d9822b' : undefined }); });
    g += arrow(760, 110, 760, 340, 'currentColor', 2) + T(752, 230, 'less reactive', { size: 11, a: 'end' });
    return wrap(W, H, o.aria || 'An iron nail displacing copper from copper sulfate solution, with the reactivity series', '', g);
  }

  /* ---------- halogen colours and displacement ---------- */
  function halogenColours(o = {}) {
    const W = 980, H = 430;
    let g = panelT(200, 'Halogens in water', 'colours of the solutions') + panelT(680, 'Displacement results', 'halogen added to a solution of a halide');
    [[110, '#d7ef9a', 'chlorine', 'pale green'], [200, '#f0a23a', 'bromine', 'orange'], [290, '#8a5a2a', 'iodine', 'brown']].forEach(([x, c, n, col]) => { g += tubeC(x, 110, 200, c, 0.6) + T(x, 340, n, { size: 13, w: 700 }) + T(x, 358, col, { size: 12 }); });
    const cols = ['potassium chloride', 'potassium bromide', 'potassium iodide'], rows = ['chlorine', 'bromine', 'iodine'];
    const res = [[null, '#f0a23a', '#8a5a2a'], [0, null, '#8a5a2a'], [0, 0, null]];
    cols.forEach((c, j) => { g += T(560 + j * 120, 104, c.split(' ')[0], { size: 11 }) + T(560 + j * 120, 118, c.split(' ')[1], { size: 12, w: 700 }); });
    rows.forEach((r, i) => { g += T(484, 166 + i * 70, r, { size: 12, w: 700, a: 'end' });
      cols.forEach((c, j) => { const x = 560 + j * 120, y = 160 + i * 70, v = res[i][j];
        g += `<rect x="${x - 50}" y="${y - 28}" width="100" height="56" rx="6" fill="none" stroke="currentColor" stroke-opacity=".3"/>`;
        g += v === null ? T(x, y + 5, '—', { size: 16 }) : v ? `<circle cx="${x}" cy="${y - 4}" r="14" fill="${v}"/>` + T(x, y + 22, v === '#8a5a2a' ? 'brown: iodine formed' : 'orange: bromine formed', { size: 10 }) : T(x, y + 5, 'no reaction', { size: 11 });
      }); });
    g += T(680, 390, 'A more reactive halogen displaces a less reactive one: Cl₂ + 2KBr → 2KCl + Br₂', { size: 13, w: 700 }) + T(200, 390, 'reactivity decreases down group 7', { size: 13 });
    return wrap(W, H, o.aria || 'Colours of chlorine, bromine and iodine solutions and a table of halogen displacement results', '', g);
  }

  /* ---------- chemical cell and fuel cell ---------- */
  function chemicalCell(o = {}) {
    const W = 980, H = 430;
    let g = panelT(230, 'A simple chemical cell', 'two different metals in an electrolyte') + panelT(720, 'Hydrogen fuel cell', 'hydrogen + oxygen → water');
    g += beaker(130, 180, 200, 170, 0.7, '#cfe7f2') + `<rect x="166" y="150" width="20" height="170" rx="2" fill="url(#LGzinc)"/><rect x="276" y="150" width="20" height="170" rx="2" fill="url(#LGcopper)"/>`;
    g += wire('M176 150V120H215') + meter(230, 120, 'V') + wire('M245 120H286V150') + T(230, 100, '1.10 V', { size: 15, w: 700 });
    g += T(176, 378, 'zinc', { size: 13, w: 700 }) + T(286, 378, 'copper', { size: 13, w: 700 }) + T(230, 404, 'bigger difference in reactivity → bigger voltage', { size: 12 }) + T(230, 420, 'stops when a reactant is used up (non-rechargeable)', { size: 12 });
    g += `` + lgShadow(720, 324, 110, 6) + `<rect x="620" y="150" width="200" height="170" rx="8" fill="url(#LGiron)"/><rect x="626" y="154" width="188" height="6" rx="3" fill="#fff" opacity=".15"/><rect x="660" y="160" width="14" height="150" fill="url(#LGzinc)"/><rect x="766" y="160" width="14" height="150" fill="url(#LGzinc)"/><rect x="674" y="160" width="92" height="150" fill="#cfe7f2" opacity=".35"/>`;
    g += arrow(560, 200, 640, 200, '#7fb2ff', 3) + T(552, 205, 'H₂ in', { size: 13, a: 'end' }) + arrow(900, 200, 820, 200, '#ef5b4c', 3) + T(908, 205, 'O₂ in', { size: 13, a: 'start' }) + arrow(800, 300, 900, 340, '#5aa9f0', 3) + T(904, 360, 'H₂O out', { size: 13, a: 'start' });
    g += wire('M667 150V100H773V150') + lamp(720, 100) + arrow(690, 118, 640, 118, '#e0a64a', 0, 0) + T(720, 80, 'electrons flow through the external circuit', { size: 12 });
    g += T(720, 345, 'electrolyte', { size: 12 }).replace('<text', '<text opacity=".9"') + T(720, 404, 'only product is water; hydrogen must be made and stored', { size: 12 });
    return wrap(W, H, o.aria || 'A zinc and copper chemical cell, and a hydrogen fuel cell', '', g);
  }

  /* ---------- simple harmonic motion ---------- */
  function shmPractical(o = {}) {
    const W = 980, H = 460;
    let g = `<rect x="40" y="40" width="160" height="10" fill="#7d858f"/>`;
    let d = 'M120 50'; for (let i = 1; i <= 16; i++) d += `L${i % 2 ? 106 : 134} ${50 + i * 9}`; d += 'L120 202';
    g += `<path d="${d}" stroke="#d9822b" stroke-width="2.5" fill="none"/><rect x="98" y="202" width="44" height="40" rx="4" fill="#55606c"/>` + T(120, 227, 'm', { size: 14, w: 700, fill: '#fff' });
    g += `<path d="M150 222H166M150 172H166M150 272H166" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 3"/>` + dbl(176, 222, 176, 172, 'currentColor', 1.4) + T(184, 200, 'A', { size: 13, w: 700, a: 'start' }) + T(170, 240, 'equilibrium', { size: 11, a: 'start' });
    g += `<rect x="96" y="330" width="48" height="24" rx="4" fill="#3d4654"/>` + T(120, 374, 'motion sensor', { size: 12 }) + `<path d="M120 330V256" stroke="#9fe0b0" stroke-width="1.4" stroke-dasharray="4 4"/>`;
    g += `<rect x="240" y="40" width="140" height="10" fill="#7d858f"/><path d="M310 50L270 250" stroke="#d6d9de" stroke-width="2"/><circle cx="270" cy="258" r="14" fill="#9aa3ad"/><path d="M310 50V260" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity=".6"/><path d="M345 250Q310 268 275 250" stroke="#e0a64a" stroke-width="2" fill="none" stroke-dasharray="4 3"/>` + T(310, 300, 'pendulum: T = 2π√(l/g)', { size: 12 }) + T(120, 400, 'mass–spring: T = 2π√(m/k)', { size: 12 });
    const x0 = 470, wv = 440;
    [['displacement x', 0, '#3f7fd6', 110], ['velocity v', Math.PI / 2, '#3fb27f', 230], ['acceleration a', Math.PI, '#ef5b4c', 350]].forEach(([n, ph, c, y]) => {
      let p = ''; for (let i = 0; i <= 80; i++) { const t = i / 80; p += (i ? 'L' : 'M') + f(x0 + t * wv) + ' ' + f(y - 40 * Math.cos(2 * Math.PI * 1.5 * t + ph)); }
      g += `<path d="M${x0} ${y}H${x0 + wv + 10}M${x0} ${y - 50}V${y + 50}" stroke="currentColor" stroke-width="1.6"/><path d="${p}" stroke="${c}" stroke-width="3" fill="none"/>` + T(x0 + 6, y - 54, n, { size: 13, a: 'start', fill: c });
    });
    g += T(x0 + wv / 2, 430, 'a = −ω² x:  a is always opposite to x;  v is greatest at x = 0', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Simple harmonic motion: mass on a spring, a pendulum, and displacement, velocity and acceleration graphs', '', g);
  }

  /* ---------- forced oscillations and resonance ---------- */
  function resonanceCurves(o = {}) {
    const W = 900, H = 420;
    const x0 = 340, y0 = 350;
    let g = `<rect x="40" y="60" width="80" height="50" rx="6" fill="#3d4654"/>` + T(130, 80, 'vibration generator', { size: 12, a: 'start' }) + T(130, 96, '(driving frequency f)', { size: 12, a: 'start' }) + `<path d="M80 110V160" stroke="#55606c" stroke-width="6"/>`;
    let d = 'M80 160'; for (let i = 1; i <= 14; i++) d += `L${i % 2 ? 66 : 94} ${160 + i * 8}`; d += 'L80 284';
    g += `<path d="${d}" stroke="#d9822b" stroke-width="2.5" fill="none"/><rect x="58" y="284" width="44" height="36" rx="4" fill="#55606c"/>` + T(80, 344, 'mass on a spring', { size: 12 }) + T(80, 360, '(natural frequency f₀)', { size: 12 });
    g += `<path d="M160 330Q200 280 240 330" stroke="#e0a64a" stroke-width="2" fill="none" opacity="0"/>`;
    g += axes(x0, y0, 500, 280, 'Driving frequency f', 'Amplitude');
    const curve = (h, w, c) => { let p = ''; for (let i = 0; i <= 100; i++) { const fq = 0.05 + i * 0.02, A = 1 / Math.sqrt((1 - fq * fq) ** 2 + (w * fq) ** 2); p += (i ? 'L' : 'M') + f(x0 + fq * 230) + ' ' + f(y0 - Math.min(A * h, 270)); } return `<path d="${p}" stroke="${c}" stroke-width="3" fill="none"/>`; };
    g += curve(24, 0.12, '#ef5b4c') + curve(24, 0.35, '#e0a64a') + curve(24, 0.9, '#3f7fd6');
    g += `<path d="M${x0 + 230} ${y0}V60" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 4"/>` + T(x0 + 230, y0 + 18, 'f₀', { size: 13, w: 700 });
    g += T(x0 + 250, 90, 'light damping: tall, sharp peak', { size: 12, a: 'start', fill: '#ef5b4c' }) + T(x0 + 290, 200, 'heavier damping:', { size: 12, a: 'start', fill: '#e0a64a' }) + T(x0 + 290, 216, 'lower, wider peak', { size: 12, a: 'start', fill: '#e0a64a' }) + T(x0 + 380, 300, 'heavy damping', { size: 12, a: 'start', fill: '#3f7fd6' });
    g += T(450, 40, 'Resonance: maximum amplitude when the driving frequency = the natural frequency', { size: 14, w: 700 });
    return wrap(W, H, o.aria || 'Forced oscillations: a driven mass on a spring and resonance curves with different damping', '', g);
  }

  /* ---------- Boyle's law ---------- */
  function boylesLaw(o = {}) {
    const W = 940, H = 430;
    let g = `<rect x="150" y="60" width="40" height="280" rx="6" fill="#e8f3f8" fill-opacity=".12" stroke="${GL}" stroke-width="3"/><rect x="154" y="64" width="32" height="140" fill="#e8f3f8" fill-opacity=".12"/><rect x="154" y="204" width="32" height="134" fill="#e0a64a" fill-opacity=".7"/>`;
    g += `<rect x="200" y="60" width="16" height="280" fill="#f1d58a" stroke="#c9a94a"/>${Array.from({ length: 15 }, (_, i) => `<path d="M200 ${64 + i * 18}h${i % 5 ? 6 : 12}" stroke="#7a5f1f" stroke-width="1.2"/>`).join('')}`;
    g += `<path d="M170 340V380H320V300" stroke="${GL}" stroke-width="6" fill="none"/><circle cx="320" cy="260" r="40" fill="#f4f6f7" stroke="#55606c" stroke-width="4"/><path d="M320 260L346 238" stroke="#ef5b4c" stroke-width="3"/>${Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (0.8 + i * 0.175); return `<path d="M${f(320 + 32 * Math.cos(a))} ${f(260 + 32 * Math.sin(a))}L${f(320 + 38 * Math.cos(a))} ${f(260 + 38 * Math.sin(a))}" stroke="#55606c" stroke-width="2"/>`; }).join('')}`;
    g += `<path d="M320 380H420" stroke="#55606c" stroke-width="5"/><rect x="420" y="360" width="60" height="30" rx="5" fill="#3d4654"/>` + T(450, 410, 'foot pump', { size: 12 });
    g += T(170, 44, 'trapped air', { size: 12 }) + T(110, 270, 'oil', { size: 12, a: 'end' }) + T(366, 264, 'pressure gauge', { size: 12, a: 'start' }) + T(222, 140, 'scale: length of air column ∝ V', { size: 12, a: 'start' });
    const x0 = 580, y0 = 350;
    g += axes(x0, y0, 300, 250, '1 ÷ V', 'Pressure p');
    g += `<path d="M${x0} ${y0}L${x0 + 280} ${y0 - 230}" stroke="#3f7fd6" stroke-width="3"/>${[1, 2, 3, 4, 5].map(i => `<circle cx="${x0 + i * 50}" cy="${f(y0 - i * 50 * 230 / 280)}" r="4.5" fill="#3f7fd6"/>`).join('')}`;
    g += T(x0 + 150, 410, 'pV = constant (fixed mass, constant temperature)', { size: 13, w: 700 });
    return wrap(W, H, o.aria || "Boyle's law apparatus: oil column, scale, pressure gauge and foot pump, with a p against 1/V graph", '', g);
  }

  /* ---------- X-ray tube ---------- */
  function xrayTube(o = {}) {
    const W = 960, H = 420;
    let g = `<rect x="100" y="90" width="700" height="240" rx="20" fill="#6b7480" opacity=".35"/><path d="M180 140H680Q740 140 740 210Q740 280 680 280H180Q150 280 150 210Q150 140 180 140Z" fill="#e8f3f8" fill-opacity=".1" stroke="${GL}" stroke-width="3"/>`;
    g += `<path d="M210 190q8 -10 16 0t16 0t16 0" stroke="#ffb03a" stroke-width="4" fill="none"/><path d="M210 190V160M258 190V160" stroke="currentColor" stroke-width="2"/><path d="M198 230h80" stroke="none"/>`;
    g += `<rect x="560" y="160" width="140" height="100" fill="#c26b3a"/><path d="M560 170L610 250H560Z" fill="#9aa3ad"/>`;
    for (let i = 0; i < 4; i++) g += arrow(280, 186 + i * 12, 560, 196 + i * 12, '#5aa9f0', 1.6, 8);
    g += `<rect x="560" y="330" width="60" height="10" fill="#cfe7f2"/>`;
    for (let i = 0; i < 3; i++) g += wavy(584 + i * 6, 240, 560 + i * 24, 390, '#b07cff', 2);
    g += wire('M210 160V60H120') + wire('M258 160V70H160') + T(140, 50, 'low-voltage filament supply', { size: 12 }) + wire('M700 210H860V50H240V60');
    g += `<rect x="420" y="38" width="120" height="24" rx="4" fill="var(--panel,#121a33)" stroke="currentColor" stroke-width="2"/>` + T(480, 55, 'high p.d. (~100 kV)', { size: 12, w: 700 });
    g += T(234, 310, 'heated filament (cathode):', { size: 12 }) + T(234, 326, 'thermionic emission', { size: 12 }) + T(420, 266, 'electrons accelerated in a vacuum', { size: 12, fill: '#5aa9f0' });
    g += T(630, 106, 'tungsten target on a copper anode', { size: 12 }) + T(630, 122, '(rotating, oil-cooled)', { size: 12 });
    g += T(640, 380, 'X-rays out through a window', { size: 12, a: 'start' }) + T(640, 396, 'in the lead casing', { size: 12, a: 'start' });
    g += T(300, 380, 'about 1% of the kinetic energy becomes X-rays;', { size: 12 }) + T(300, 396, 'the rest heats the anode', { size: 12 });
    return wrap(W, H, o.aria || 'X-ray tube: heated filament, electrons accelerated to a tungsten target, X-rays out of a window', '', g);
  }

  /* ---------- gamma camera ---------- */
  function gammaCamera(o = {}) {
    const W = 960, H = 420;
    let g = `<ellipse cx="480" cy="360" rx="300" ry="44" fill="#e8c4a4" opacity=".75"/><circle cx="520" cy="350" r="22" fill="#3fb27f" opacity=".8"/>` + T(480, 410, 'patient injected with a tracer (e.g. technetium-99m, a gamma emitter)', { size: 12 });
    g += `<rect x="260" y="220" width="440" height="60" fill="#55606c"/>${Array.from({ length: 21 }, (_, i) => `<rect x="${268 + i * 20.5}" y="220" width="6" height="60" fill="#2c3038"/>`).join('')}`;
    g += `<rect x="260" y="180" width="440" height="40" fill="#cfe7f2" opacity=".75"/>`;
    for (let i = 0; i < 7; i++) g += `<path d="M${290 + i * 62} 180V120Q${290 + i * 62} 104 ${306 + i * 62} 104H${330 + i * 62}Q${346 + i * 62} 104 ${346 + i * 62} 120V180Z" fill="#3d4654" stroke="#22262e"/>`;
    g += `<path d="M480 104V70H760" stroke="currentColor" stroke-width="2.5" fill="none"/><rect x="760" y="40" width="120" height="70" rx="6" fill="#3d4654"/><rect x="770" y="48" width="100" height="54" rx="3" fill="#0f1620"/><circle cx="820" cy="76" r="14" fill="#3fb27f" opacity=".7"/>` + T(820, 130, 'computer image', { size: 12 });
    g += wavy(520, 330, 516, 284, '#b07cff', 2) + wavy(470, 336, 450, 290, '#b07cff', 2) + `<path d="M450 290L440 286" stroke="none"/>` + T(436, 312, '✕', { size: 13, fill: '#ef5b4c' });
    g += `<circle cx="516" cy="198" r="8" fill="#fff6c8"/>`;
    const labs = [{ x: 700, y: 250, t: 'Lead collimator: only gamma rays parallel to the holes pass', side: 'r', ly: 250 }, { x: 700, y: 200, t: 'Scintillator (sodium iodide): each gamma photon gives a flash of light', side: 'r', ly: 190 }, { x: 260, y: 140, t: 'Photomultiplier tubes turn the flashes into electrical pulses', side: 'l', ly: 140 }];
    return wrap(W, H, o.aria || 'Gamma camera: collimator, scintillator, photomultiplier tubes and computer', '', g + labels(labs, { W, H, lx: 240, rx: 720, size: 12 }));
  }

  /* ---------- ultrasound A-scan ---------- */
  function ultrasoundScan(o = {}) {
    const W = 980, H = 420;
    let g = `<rect x="60" y="70" width="70" height="80" rx="6" fill="#3d4654"/><rect x="66" y="150" width="58" height="16" fill="#e0a64a"/><rect x="60" y="166" width="70" height="10" fill="#9fd4e6" opacity=".8"/>` + T(95, 60, 'transducer', { size: 12 });
    const layers = [['skin', '#f2c9a8', 176, 196], ['fat', '#f4e3a0', 196, 246], ['muscle', '#c8705e', 246, 326], ['bone', '#efece2', 326, 370]];
    layers.forEach(([n, c, y1, y2]) => { g += `<rect x="40" y="${y1}" width="300" height="${y2 - y1}" fill="${c}" opacity=".85"/>` + T(350, (y1 + y2) / 2 + 4, n, { size: 12, a: 'start' }); });
    g += arrow(86, 172, 86, 240, '#3f7fd6', 2.5, 9) + arrow(104, 246, 104, 180, '#3f7fd6', 2, 8) + arrow(116, 326, 116, 182, '#3f7fd6', 2, 8);
    g += T(200, 400, 'coupling gel removes air, so the pulse is not all reflected at the skin', { size: 12 });
    g += T(40, 30, 'piezoelectric crystal sends pulses and detects echoes', { size: 12, a: 'start' });
    const x0 = 460, y0 = 300;
    g += axes(x0, y0, 460, 200, 'Time', 'Echo amplitude');
    [[0, 180], [70, 60], [170, 90], [320, 150]].forEach(([dx, h]) => { g += `<path d="M${x0 + 10 + dx} ${y0}L${x0 + 16 + dx} ${y0 - h}L${x0 + 22 + dx} ${y0}" stroke="#3f7fd6" stroke-width="2.5" fill="none"/>`; });
    g += dbl(x0 + 86, y0 + 40, x0 + 186, y0 + 40, 'currentColor', 1.4) + T(x0 + 136, y0 + 60, 'Δt', { size: 13, w: 700 });
    g += T(x0 + 28, y0 - 150, 'transmitted pulse', { size: 11, a: 'start' }) + T(x0 + 346, y0 - 140, 'bone boundary', { size: 11, a: 'start' });
    g += T(x0 + 230, 400, 'A-scan: depth = v Δt ÷ 2  (the pulse goes there and back)', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Ultrasound transducer on layers of tissue and an A-scan showing echoes', '', g);
  }

  /* ---------- speed of sound by resonance ---------- */
  function resonanceTube(o = {}) {
    const W = 900, H = 440;
    let g = `<path d="M160 120V400Q160 420 180 420H340Q360 420 360 400V120" fill="none" stroke="${GL}" stroke-width="3"/><path d="M162 200H358V418H162Z" fill="${WATER}" fill-opacity=".45"/>`;
    g += `<rect x="236" y="60" width="48" height="280" fill="#e8f3f8" fill-opacity=".15" stroke="${GL}" stroke-width="3"/><rect x="239" y="200" width="42" height="138" fill="${WATER}" fill-opacity=".35"/>`;
    g += `<path d="M260 40V20M250 40V10M270 40V10" stroke="#9aa3ad" stroke-width="5"/>` + T(300, 24, 'tuning fork (known f)', { size: 12, a: 'start' });
    let L = 'M248 60', R = 'M272 60'; for (let i = 0; i <= 30; i++) { const y = 60 + i * 140 / 30, a = 10 * Math.cos(Math.PI / 2 * i / 30); L += `L${f(260 - a)} ${f(y)}`; R += `L${f(260 + a)} ${f(y)}`; }
    g += `<path d="${L}" stroke="#3f7fd6" stroke-width="2" fill="none"/><path d="${R}" stroke="#3f7fd6" stroke-width="2" fill="none"/>`;
    g += dbl(214, 60, 214, 200, 'currentColor', 1.6) + T(206, 134, 'L', { size: 15, w: 700, a: 'end' });
    g += T(300, 64, 'antinode (just above the open end)', { size: 12, a: 'start' }) + T(300, 204, 'node at the water surface', { size: 12, a: 'start' }) + T(380, 300, 'raise the tube until the', { size: 12, a: 'start' }) + T(380, 316, 'sound is loudest (first resonance)', { size: 12, a: 'start' });
    g += T(640, 140, 'first resonance:', { size: 14, a: 'start' }) + T(640, 166, 'L + c = λ ÷ 4', { size: 16, w: 700, a: 'start' }) + T(640, 196, 'c = end correction (≈ 0.3 d)', { size: 12, a: 'start' }) + T(640, 232, 'second resonance: L₂ + c = 3λ ÷ 4', { size: 12, a: 'start' }) + T(640, 252, 'so λ = 2 (L₂ − L₁)', { size: 13, w: 700, a: 'start' }) + T(640, 286, 'v = f λ', { size: 16, w: 700, a: 'start' });
    return wrap(W, H, o.aria || 'Resonance tube in water with a tuning fork, showing a node at the water surface and an antinode at the open end', '', g);
  }

  /* ---------- mass spectrum ---------- */
  function massSpectrum(o = {}) {
    const W = 900, H = 420;
    const x0 = 120, y0 = 340;
    let g = axes(x0, y0, 420, 270, 'm/z', 'Relative abundance (%)');
    [[24, 78.99], [25, 10.00], [26, 11.01]].forEach(([m, a]) => { const x = x0 + (m - 23) * 120; g += `<rect x="${x - 8}" y="${f(y0 - a * 3)}" width="16" height="${f(a * 3)}" fill="#3f7fd6"/>` + T(x, y0 + 18, String(m), { size: 13 }) + T(x, f(y0 - a * 3 - 8), a.toFixed(2), { size: 12, w: 700 }); });
    g += T(330, 40, 'Mass spectrum of magnesium', { size: 15, w: 700 });
    g += T(600, 140, 'Ar = Σ(m/z × abundance) ÷ 100', { size: 14, w: 700, a: 'start' }) + T(600, 174, '= (24 × 78.99 + 25 × 10.00', { size: 13, a: 'start' }) + T(600, 194, '   + 26 × 11.01) ÷ 100', { size: 13, a: 'start' }) + T(600, 222, '= 24.32', { size: 15, w: 700, a: 'start' });
    g += T(600, 270, 'each peak is one isotope;', { size: 12, a: 'start' }) + T(600, 286, 'for a molecule, the peak with the', { size: 12, a: 'start' }) + T(600, 302, 'highest m/z (M⁺) gives Mr', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Mass spectrum of magnesium showing three isotopes and the relative atomic mass calculation', '', g);
  }

  /* ---------- infrared spectrum ---------- */
  function irSpectrum(o = {}) {
    const W = 980, H = 420;
    const x0 = 80, y0 = 330, w = 820, hgt = 250, X = n => x0 + (4000 - n) / 3500 * w, Y = t => y0 - t / 100 * hgt;
    let g = `<path d="M${x0} ${y0 - hgt}V${y0}H${x0 + w}" stroke="currentColor" stroke-width="2.5" fill="none"/>`;
    [4000, 3000, 2000, 1500, 1000, 500].forEach(n => { g += `<path d="M${f(X(n))} ${y0}v6" stroke="currentColor" stroke-width="2"/>` + T(X(n), y0 + 22, String(n), { size: 12 }); });
    g += T(x0 + w / 2, y0 + 48, 'Wavenumber (cm⁻¹)', { size: 13 }) + T(x0 + 10, y0 - hgt - 10, 'Transmittance (%)', { size: 13, a: 'start' });
    const pts = []; for (let n = 4000; n >= 500; n -= 10) { let t = 92; t -= 62 * Math.exp(-(((n - 3000) / 300) ** 2)); t -= 80 * Math.exp(-(((n - 1715) / 25) ** 2)); t -= 40 * Math.exp(-(((n - 1250) / 30) ** 2)); if (n < 1500) t -= 22 * Math.abs(Math.sin(n / 23)) * Math.exp(-(((n - 1000) / 500) ** 2)); pts.push((pts.length ? 'L' : 'M') + f(X(n)) + ' ' + f(Y(Math.max(4, t)))); }
    g += `<rect x="${f(X(1500))}" y="${y0 - hgt}" width="${f(X(500) - X(1500))}" height="${hgt}" fill="#e0a64a" opacity=".1"/><path d="${pts.join('')}" stroke="#3f7fd6" stroke-width="2.5" fill="none"/>`;
    g += T(X(3000), Y(20), 'O–H (carboxylic acid)', { size: 12, w: 700 }) + T(X(3000), Y(20) + 16, 'very broad, 2500–3300', { size: 12 });
    g += T(X(1715) + 10, Y(6), 'C=O, sharp, 1630–1820', { size: 12, w: 700, a: 'start' });
    g += T(X(1000), y0 - hgt - 10, 'fingerprint region (below 1500): unique to each compound', { size: 12 });
    g += T(490, 30, 'Infrared spectrum of ethanoic acid', { size: 15, w: 700 });
    g += T(490, 400, 'an alcohol O–H is broad at 3200–3600; an aldehyde or ketone has C=O but no O–H', { size: 12 });
    return wrap(W, H, o.aria || 'Infrared spectrum of ethanoic acid with the broad O–H and sharp C=O absorptions labelled', '', g);
  }

  /* ---------- transition metal complex colours ---------- */
  function tmColours(o = {}) {
    const W = 980, H = 420;
    let g = T(490, 22, 'Ligand substitution changes the colour', { size: 15, w: 700 });
    const tb = (x, c, f1, f2, n) => tubeC(x, 90, 190, c, 0.7) + T(x, 312, f1, { size: 12, w: 700 }) + T(x, 328, f2, { size: 12 }) + T(x, 346, n, { size: 11 });
    g += tb(110, '#8cc4f0', '[Cu(H₂O)₆]²⁺', 'pale blue', 'octahedral') + tb(330, '#1d3fb0', '[Cu(NH₃)₄(H₂O)₂]²⁺', 'deep blue', 'octahedral') + tb(550, '#e8d24a', '[CuCl₄]²⁻', 'yellow', 'tetrahedral');
    g += arrow(150, 180, 290, 180, 'currentColor', 2.5) + T(220, 168, 'excess NH₃(aq)', { size: 12 }) + `<path d="M120 84Q330 40 540 84" stroke="currentColor" stroke-width="2" fill="none"/>` + arrow(530, 80, 545, 88, 'currentColor', 2, 9) + T(330, 56, 'conc. HCl', { size: 12 });
    g += tb(720, '#f2a7b9', '[Co(H₂O)₆]²⁺', 'pink', 'octahedral') + tb(890, '#3a52d6', '[CoCl₄]²⁻', 'blue', 'tetrahedral') + arrow(760, 180, 850, 180, 'currentColor', 2.5) + T(805, 168, 'conc. HCl', { size: 12 });
    g += T(490, 392, 'Cl⁻ is larger than H₂O, so only four fit: the shape changes from octahedral to tetrahedral', { size: 12 });
    return wrap(W, H, o.aria || 'Colours of copper and cobalt complex ions before and after ligand substitution', '', g);
  }

  /* ======================= WAVE 8: NMR, redox titration and KS3 lab pictures ======================= */
  const burette = (x, y1, y2, liq) => `<rect x="${x - 9}" y="${y1}" width="18" height="${y2 - y1}" rx="3" fill="url(#LGglass)"/><rect x="${x - 9}" y="${y1 + 12}" width="18" height="${y2 - y1 - 12}" rx="3" fill="${liq}" fill-opacity=".45"/><rect x="${x - 9}" y="${y1 + 12}" width="18" height="${y2 - y1 - 12}" rx="3" fill="url(#LGliq)"/><rect x="${x - 9}" y="${y1}" width="18" height="${y2 - y1}" rx="3" fill="none" stroke="${GL}" stroke-width="2.5"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${x - 9} ${y1 + 10 + i * (y2 - y1 - 20) / 9}h7" stroke="#6f8a96" stroke-width="1.3"/>`).join('')}<path d="M${x - 5} ${y1 + 6}V${y2 - 6}" stroke="#fff" stroke-width="2" opacity=".45"/><path d="M${x - 3} ${y2}V${y2 + 26}M${x + 3} ${y2}V${y2 + 26}" stroke="${GL}" stroke-width="2.5"/><rect x="${x - 12}" y="${y2 + 6}" width="24" height="8" rx="2" fill="url(#LGiron)"/><rect x="${x + 10}" y="${y2 + 4}" width="10" height="12" rx="2" fill="#2b6a3c"/>`;
  const conical = (x, y, liq, op = 0.6) => { const bd = `M${x - 12} ${y}V${y + 30}L${x - 52} ${y + 110}Q${x - 56} ${y + 120} ${x - 44} ${y + 120}H${x + 44}Q${x + 56} ${y + 120} ${x + 52} ${y + 110}L${x + 12} ${y + 30}V${y}`, lq = `M${x - 36} ${y + 78}H${x + 36}L${x + 52} ${y + 110}Q${x + 56} ${y + 118} ${x + 44} ${y + 118}H${x - 44}Q${x - 56} ${y + 118} ${x - 52} ${y + 110}Z`; return lgShadow(x, y + 122, 56, 4) + `<path d="${bd}Z" fill="url(#LGglass)"/><path d="${lq}" fill="${liq}" fill-opacity="${op}"/><path d="${lq}" fill="url(#LGliq)"/><path d="M${x - 35} ${y + 78}H${x + 35}" stroke="#fff" stroke-width="1.4" opacity=".5"/><path d="${bd}" fill="none" stroke="${GL}" stroke-width="3"/><path d="M${x - 15} ${y - 2}H${x + 15}" stroke="${GL}" stroke-width="3" stroke-linecap="round"/><path d="M${x - 24} ${y + 62}L${x - 44} ${y + 104}" stroke="#fff" stroke-width="3" opacity=".4" stroke-linecap="round"/>`; };

  /* ---------- redox titrations ---------- */
  function redoxTitration(o = {}) {
    const W = 980, H = 460;
    let g = panelT(250, 'Manganate(VII) titration') + panelT(720, 'Iodine–thiosulfate titration');
    g += stand(330, 400, 320, 90, 250) + burette(250, 60, 230, '#8a2a8f') + conical(250, 270, '#c9e3a8', 0.45);
    g += T(250, 424, 'Fe²⁺ (acidified with dilute H₂SO₄)', { size: 12 }) + T(250, 440, 'end point: first permanent pale pink', { size: 12, w: 700 });
    g += T(130, 120, 'KMnO₄(aq)', { size: 12, a: 'end' }) + T(130, 136, 'read the top of', { size: 11, a: 'end' }) + T(130, 150, 'the meniscus', { size: 11, a: 'end' }) + T(130, 176, 'MnO₄⁻ is its own', { size: 11, a: 'end' }) + T(130, 190, 'indicator', { size: 11, a: 'end' });
    g += stand(800, 400, 320, 90, 720) + burette(720, 60, 230, '#e8eef2') + conical(720, 270, '#3a3fa0', 0.7);
    g += T(720, 424, 'I₂ released (add starch when it is pale yellow)', { size: 12 }) + T(720, 440, 'end point: blue-black → colourless', { size: 12, w: 700 });
    g += T(600, 120, 'Na₂S₂O₃(aq)', { size: 12, a: 'end' }) + T(600, 136, 'starch indicator', { size: 11, a: 'end' }) + T(600, 150, 'near the end point', { size: 11, a: 'end' });
    g += T(490, 180, 'MnO₄⁻ + 8H⁺ + 5Fe²⁺', { size: 12 }) + T(490, 196, '→ Mn²⁺ + 4H₂O + 5Fe³⁺', { size: 12 }) + T(490, 236, 'I₂ + 2S₂O₃²⁻', { size: 12 }) + T(490, 252, '→ 2I⁻ + S₄O₆²⁻', { size: 12 });
    return wrap(W, H, o.aria || 'Redox titrations: potassium manganate(VII) with iron(II), and sodium thiosulfate with iodine', '', g);
  }

  /* ---------- NMR spectra ---------- */
  const nmrAxes = (x0, y0, w, from, to) => { let s = `<path d="M${x0} ${y0}H${x0 + w}" stroke="currentColor" stroke-width="2"/>`; for (let d = from; d >= to; d -= (from > 50 ? 20 : 1)) { const x = x0 + (from - d) / (from - to) * w; s += `<path d="M${f(x)} ${y0}v5" stroke="currentColor" stroke-width="1.5"/>` + T(x, y0 + 20, String(d), { size: 11 }); } return s + T(x0 + w / 2, y0 + 42, 'chemical shift δ (ppm)', { size: 12 }); };
  function c13Nmr(o = {}) {
    const W = 920, H = 400, x0 = 80, y0 = 300, w = 760, X = d => x0 + (220 - d) / 220 * w;
    let g = nmrAxes(x0, y0, w, 220, 0);
    [[58, 'C–O', 160], [18, 'CH₃', 140]].forEach(([d, l, h]) => { g += `<path d="M${f(X(d))} ${y0}V${y0 - h}" stroke="#3f7fd6" stroke-width="3"/>` + T(X(d), y0 - h - 10, `${d} ppm`, { size: 12, w: 700 }) + T(X(d), y0 - h - 26, l, { size: 12 }); });
    g += `<path d="M${f(X(0))} ${y0}V${y0 - 50}" stroke="#9aa3ad" stroke-width="2" stroke-dasharray="3 3"/>` + T(X(0), y0 - 58, 'TMS', { size: 11 });
    g += T(460, 40, '¹³C NMR spectrum of ethanol, CH₃CH₂OH', { size: 15, w: 700 }) + T(460, 62, 'two peaks: two different carbon environments', { size: 13 });
    g += T(X(190), 140, 'C=O in aldehydes, ketones,', { size: 12 }) + T(X(190), 156, 'acids and esters: 160–220', { size: 12 }) + `<rect x="${f(X(220))}" y="170" width="${f(X(160) - X(220))}" height="${y0 - 170}" fill="#e0a64a" opacity=".1"/>`;
    g += T(X(125), 200, 'C=C and aromatic:', { size: 12 }) + T(X(125), 216, '100–150', { size: 12 }) + `<rect x="${f(X(150))}" y="230" width="${f(X(100) - X(150))}" height="${y0 - 230}" fill="#3fb27f" opacity=".1"/>`;
    g += T(460, 384, 'number of peaks = number of carbon environments; no splitting in ¹³C spectra', { size: 12 });
    return wrap(W, H, o.aria || 'Carbon-13 NMR spectrum of ethanol with chemical shift ranges', '', g);
  }
  function h1Nmr(o = {}) {
    const W = 940, H = 420, x0 = 80, y0 = 320, w = 780, X = d => x0 + (6 - d) / 6 * w;
    let g = nmrAxes(x0, y0, w, 6, 0);
    const peak = (d, n, h, c) => { const sp = 10, c0 = [1], co = []; for (let k = 0; k < n; k++) co.push(k === 0 ? 1 : co[k - 1] * (n - k) / k); return co.map((v, k) => `<path d="M${f(X(d) + (k - (n - 1) / 2) * sp)} ${y0}V${f(y0 - h * v / Math.max(...co))}" stroke="${c}" stroke-width="2.5"/>`).join(''); };
    g += peak(3.7, 4, 120, '#3f7fd6') + peak(1.2, 3, 170, '#3f7fd6') + peak(2.6, 1, 70, '#e0a64a');
    g += T(X(3.7), y0 - 140, 'CH₂: quartet (3 H next door)', { size: 12 }) + T(X(3.7), y0 - 156, 'area 2', { size: 12, w: 700 });
    g += T(X(1.2), y0 - 190, 'CH₃: triplet (2 H next door)', { size: 12 }) + T(X(1.2), y0 - 206, 'area 3', { size: 12, w: 700 });
    g += T(X(2.6), y0 - 90, 'O–H: singlet', { size: 12 }) + T(X(2.6), y0 - 106, 'area 1', { size: 12, w: 700 });
    g += T(470, 40, '¹H NMR spectrum of ethanol, CH₃CH₂OH', { size: 15, w: 700 }) + T(470, 62, 'n + 1 rule: a peak splits into n + 1 lines when n H are on the next carbon', { size: 13 });
    g += T(470, 402, 'peak areas give the ratio of H in each environment; add D₂O and the O–H peak disappears', { size: 12 });
    return wrap(W, H, o.aria || 'Proton NMR spectrum of ethanol showing a quartet, a triplet and a singlet', '', g);
  }

  /* ---------- Bunsen burner and reading a measuring cylinder ---------- */
  function labSkills(o = {}) {
    const flames = o.only === 'flames', W = flames ? 580 : 980, H = 420;
    let g = panelT(170, 'Safety flame', 'air hole closed') + panelT(400, 'Roaring flame', 'air hole open: hottest') + (flames ? '' : panelT(760, 'Reading a measuring cylinder', 'eye level with the bottom of the curve'));
    const bun = (x, open) => `<rect x="${x - 40}" y="350" width="80" height="12" rx="3" fill="#55606c"/><rect x="${x - 9}" y="230" width="18" height="122" fill="${METAL}"/><rect x="${x - 13}" y="300" width="26" height="14" fill="#55606c"/><rect x="${x - 4}" y="303" width="8" height="8" fill="${open ? '#1f2227' : METAL}"/><path d="M${x + 13} 340H${x + 60}" stroke="#ef8a3a" stroke-width="6"/>` +
      (open ? `<path d="M${x - 9} 230Q${x - 14} 180 ${x} 120Q${x + 14} 180 ${x + 9} 230Z" fill="#4f9bff" opacity=".8"/><path d="M${x - 5} 230Q${x - 6} 200 ${x} 172Q${x + 6} 200 ${x + 5} 230Z" fill="#bfe0ff"/>` : `<path d="M${x - 9} 230Q${x - 26} 150 ${x - 4} 80Q${x + 4} 120 ${x + 16} 110Q${x + 22} 170 ${x + 9} 230Z" fill="#ffb03a" opacity=".9"/><path d="M${x - 4} 230Q${x - 10} 180 ${x} 140Q${x + 8} 180 ${x + 4} 230Z" fill="#ffe680"/>`);
    g += bun(170, false) + bun(400, true) + T(170, 390, 'easy to see; use when not heating', { size: 12 }) + T(400, 390, 'blue and almost invisible', { size: 12 });
    g += T(250, 412, 'tie hair back, wear goggles, light with the air hole closed', { size: 12, w: 700 }).replace('x="250"', 'x="290"');
    if (!flames) g += `<path d="M700 100V350Q700 360 710 360H790Q800 360 800 350V100" fill="none" stroke="${GL}" stroke-width="3"/><path d="M702 220Q750 236 798 220V358H702Z" fill="${WATER}" fill-opacity=".5"/>${Array.from({ length: 12 }, (_, i) => `<path d="M800 ${120 + i * 18}h-${i % 5 ? 10 : 18}" stroke="${GL}" stroke-width="1.5"/>`).join('')}`;
    if (!flames) g += T(806, 125, '50', { size: 11, a: 'start' }) + T(806, 215, '40', { size: 11, a: 'start' }) + `<path d="M620 228H700" stroke="#e0a64a" stroke-width="2" stroke-dasharray="5 4"/><circle cx="606" cy="228" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="609" cy="228" r="4" fill="currentColor"/>`;
    if (!flames) g += T(750, 270, 'meniscus', { size: 12 }) + T(760, 390, 'read 38 cm³ here, not at the edges', { size: 12 });
    return wrap(W, H, o.aria || (flames ? 'Bunsen burner safety flame and roaring flame' : 'Bunsen burner safety flame and roaring flame, and reading the meniscus at eye level'), '', g);
  }

  /* ---------- diffusion ---------- */
  function diffusionFig(o = {}) {
    const W = 960, H = 400;
    let g = T(480, 36, 'Diffusion: particles spread from where there are many to where there are few', { size: 15, w: 700 });
    const rnd = S._rnd(11);
    [[170, 0, 'start'], [480, 1, 'after a few minutes'], [790, 2, 'later: evenly spread']].forEach(([x, k, t]) => {
      g += beaker(x - 100, 90, 200, 230, 0.85, WATER, 0.25);
      for (let i = 0; i < 60; i++) { let px, py; if (k === 0) { px = x - 20 + rnd() * 40; py = 290 + rnd() * 26; } else if (k === 1) { const a = rnd() * Math.PI, r = Math.sqrt(rnd()) * 110; px = x + Math.cos(a) * r * 0.85; py = 316 - Math.sin(a) * r * 1.6; } else { px = x - 90 + rnd() * 180; py = 130 + rnd() * 186; } g += `<circle cx="${f(px)}" cy="${f(py)}" r="4.5" fill="#b04ad6"/>`; }
      g += T(x, 350, t, { size: 13, w: 700 });
    });
    g += arrow(290, 220, 360, 220, 'currentColor', 2.5) + arrow(600, 220, 670, 220, 'currentColor', 2.5);
    g += T(480, 384, 'faster when it is warmer, because the particles move faster', { size: 13 });
    return wrap(W, H, o.aria || 'Diffusion of coloured particles spreading through water over time', '', g);
  }

  /* ---------- energy in food ---------- */
  function foodBurning(o = {}) {
    const W = 900, H = 430;
    let g = stand(160, 400, 340, 110, 300) + tubeV(300, 70, 190, WATER, 0.7, 0.45) + thermo(300, 40, 230, 0.4);
    g += `<path d="M300 380L300 320" stroke="#9aa3ad" stroke-width="3"/><rect x="270" y="380" width="60" height="14" rx="3" fill="#7d858f"/><ellipse cx="300" cy="312" rx="16" ry="10" fill="#c99a5a"/><path d="M290 302Q286 286 298 270Q308 286 310 302Z" fill="#ffb03a"/>`;
    g += bench(80, 460, 400);
    g += T(560, 110, 'Measure:', { size: 14, w: 700, a: 'start' });
    ['mass of food (g)', 'volume of water (1 cm³ = 1 g)', 'temperature rise of the water'].forEach((t, i) => { g += T(560, 136 + i * 22, '• ' + t, { size: 13, a: 'start' }); });
    g += T(560, 230, 'Energy released (J) =', { size: 13, w: 700, a: 'start' }) + T(560, 252, 'mass of water × 4.2 × temperature rise', { size: 13, a: 'start' });
    g += T(560, 300, 'Less than the real value: some energy', { size: 12, a: 'start' }) + T(560, 316, 'heats the air and the tube, and some', { size: 12, a: 'start' }) + T(560, 332, 'food does not burn completely', { size: 12, a: 'start' });
    const labs = [{ x: 300, y: 312, t: 'Burning food on a mounted needle', side: 'l', ly: 330 }, { x: 300, y: 200, t: 'Boiling tube of water', side: 'l', ly: 200 }, { x: 300, y: 90, t: 'Thermometer', side: 'l', ly: 80 }];
    return wrap(W, H, o.aria || 'Measuring the energy in food by burning it under a boiling tube of water', '', g + labels(labs, { W, H, lx: 140, rx: 520, size: 12 }));
  }

  /* ---------- physical and chemical changes ---------- */
  function changeTypes(o = {}) {
    const W = 960, H = 400;
    let g = panelT(240, 'Physical change', 'no new substance; usually easy to reverse') + panelT(720, 'Chemical change', 'a new substance forms; hard to reverse');
    g += `<rect x="110" y="150" width="70" height="70" rx="10" fill="#d6f0fb" stroke="#9fd4e6" stroke-width="2"/>` + arrow(200, 186, 270, 186, 'currentColor', 2.5) + arrow(270, 210, 200, 210, 'currentColor', 2.5) + beaker(290, 140, 100, 110, 0.5);
    g += T(145, 250, 'ice', { size: 13 }) + T(340, 270, 'water', { size: 13 }) + T(235, 176, 'melt', { size: 11 }) + T(235, 232, 'freeze', { size: 11 });
    g += T(240, 320, 'also: dissolving, boiling, condensing', { size: 12 });
    g += `<path d="M560 230L640 150" stroke="#c9ccd2" stroke-width="4"/><circle cx="640" cy="150" r="22" fill="#ffffff" opacity=".95"/><circle cx="640" cy="150" r="34" fill="#ffffff" opacity=".25"/>` + T(600, 260, 'magnesium burns', { size: 13 }) + T(600, 276, 'with a bright white flame', { size: 12 });
    g += arrow(690, 190, 760, 190, 'currentColor', 2.5) + `<path d="M780 210Q820 180 860 210Q880 230 850 236H790Q770 230 780 210Z" fill="#f4f6f7"/>` + T(820, 260, 'white powder:', { size: 13 }) + T(820, 276, 'magnesium oxide', { size: 13, w: 700 });
    g += T(720, 320, 'signs: colour change, fizzing, light, temperature change', { size: 12 });
    g += T(480, 380, 'magnesium + oxygen → magnesium oxide', { size: 14, w: 700 });
    return wrap(W, H, o.aria || 'Physical change (ice melting) compared with a chemical change (magnesium burning)', '', g);
  }

  /* ---------- food tests ---------- */
  function foodTests(o = {}) {
    const W = 980, H = 420;
    let g = T(490, 36, 'Food tests', { size: 16, w: 700 });
    const set = (x, name, reag, c1, c2, res, extra) => tubeC(x - 34, 100, 190, c1, 0.55, null, 0.7) + tubeC(x + 34, 100, 190, c2, 0.55, null, 0.85) + arrow(x - 14, 160, x + 14, 160, 'currentColor', 1.8, 7) + T(x, 326, name, { size: 14, w: 700 }) + T(x, 344, reag, { size: 12 }) + T(x, 362, res, { size: 12, w: 700 }) + (extra ? T(x, 380, extra, { size: 11 }) : '');
    g += set(130, 'Starch', 'iodine solution', '#e0a64a', '#141a3a', 'orange-brown → blue-black');
    g += set(370, 'Reducing sugar', "Benedict's, hot water bath", '#3a8fe0', '#c0502a', 'blue → green → brick red', 'more sugar: further along');
    g += set(610, 'Protein', 'biuret solution', '#3a8fe0', '#8a3ad6', 'blue → purple');
    g += set(850, 'Fat (lipid)', 'ethanol, then water', '#f2f2f2', '#f8f8f4', 'clear → cloudy white', 'emulsion');
    return wrap(W, H, o.aria || 'Food tests for starch, reducing sugar, protein and fat with before and after colours', '', g);
  }

  /* ---------- levers and moments ---------- */
  function leverMoments(o = {}) {
    const W = 920, H = 400;
    let g = `<path d="M440 260L410 320H470Z" fill="#7d858f"/><rect x="120" y="244" width="640" height="16" rx="4" fill="${WOOD}"/>`;
    g += `<rect x="170" y="180" width="60" height="64" rx="6" fill="#3f7fd6"/>` + T(200, 218, '400 N', { size: 14, w: 700, fill: '#fff' }) + arrow(200, 260, 200, 330, '#3f7fd6', 3) ;
    g += `<rect x="660" y="196" width="50" height="48" rx="6" fill="#ef5b4c"/>` + T(685, 226, '200 N', { size: 13, w: 700, fill: '#fff' }) + arrow(685, 260, 685, 330, '#ef5b4c', 3);
    g += dbl(200, 150, 440, 150, 'currentColor', 1.6) + T(320, 140, '1.5 m', { size: 13, w: 700 }) + dbl(440, 150, 685, 150, 'currentColor', 1.6) + T(562, 140, '3.0 m', { size: 13, w: 700 });
    g += `<path d="M440 150V240" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>` + T(440, 344, 'pivot', { size: 13 });
    g += T(460, 40, 'Moment = force × distance from the pivot', { size: 16, w: 700 }) + T(460, 64, 'balanced when clockwise moments = anticlockwise moments', { size: 13 });
    g += T(200, 360, 'anticlockwise: 400 × 1.5 = 600 N m', { size: 13 }) + T(685, 360, 'clockwise: 200 × 3.0 = 600 N m', { size: 13 });
    g += T(460, 392, 'a longer lever lets a small force turn a big load', { size: 12 });
    return wrap(W, H, o.aria || 'A balanced see-saw showing clockwise and anticlockwise moments', '', g);
  }

  /* ---------- genetic cross ---------- */
  function punnett(o = {}) {
    const W = 900, H = 420;
    const x0 = 320, y0 = 120, c = 110;
    let g = T(450, 36, 'A genetic cross: two parents who carry the recessive allele', { size: 15, w: 700 }) + T(450, 58, 'B = brown eyes (dominant), b = blue eyes (recessive)', { size: 13 });
    g += T(x0 + c, y0 - 30, 'Parent 1: Bb', { size: 13, w: 700 }) + T(x0 - 30, y0 + c, 'Parent 2: Bb', { size: 13, w: 700 }).replace('<text', `<text transform="rotate(-90 ${x0 - 30} ${y0 + c})"`);
    ['B', 'b'].forEach((a, i) => { g += T(x0 + c / 2 + i * c, y0 - 8, a, { size: 18, w: 700, fill: '#e0a64a' }) + T(x0 - 10, y0 + c / 2 + 6 + i * c, a, { size: 18, w: 700, fill: '#e0a64a', a: 'end' }); });
    const cells = [['BB', '#8a5a2a'], ['Bb', '#8a5a2a'], ['Bb', '#8a5a2a'], ['bb', '#3f7fd6']];
    cells.forEach(([t, col], i) => { const x = x0 + (i % 2) * c, y = y0 + Math.floor(i / 2) * c; g += `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="${x + c / 2}" cy="${y + 42}" r="16" fill="#f4f6f7"/><circle cx="${x + c / 2}" cy="${y + 42}" r="9" fill="${col}"/><circle cx="${x + c / 2}" cy="${y + 42}" r="4" fill="#111"/>` + T(x + c / 2, y + 88, t, { size: 18, w: 700 }); });
    g += T(700, 180, '3 brown : 1 blue', { size: 15, w: 700, a: 'start' }) + T(700, 206, 'probability of blue eyes', { size: 13, a: 'start' }) + T(700, 226, '= 1 in 4 = 25%', { size: 13, w: 700, a: 'start' });
    g += T(450, 390, 'each child has the same chance, whatever happened to brothers or sisters', { size: 12 });
    return wrap(W, H, o.aria || 'Punnett square for a cross between two heterozygous parents giving a 3 to 1 ratio', '', g);
  }

  /* ---------- extracting DNA ---------- */
  function dnaExtraction(o = {}) {
    const W = 980, H = 400;
    let g = T(490, 36, 'Extracting DNA from strawberries', { size: 16, w: 700 });
    const step = (x, n, t1, t2) => `<circle cx="${x}" cy="330" r="13" fill="#e0a64a"/>` + T(x, 335, String(n), { size: 13, w: 700, fill: '#1d2733' }) + T(x, 362, t1, { size: 12 }) + T(x, 378, t2, { size: 12 });
    g += `<path d="M90 160Q90 140 120 140Q150 140 150 160L140 260Q120 280 100 260Z" fill="#e2483a"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="${106 + (i % 3) * 14}" cy="${170 + i * 18}" r="2" fill="#f4e36a"/>`).join('')}` + step(120, 1, 'mash in a bag with', 'salt + washing-up liquid');
    g += `<path d="M300 150L360 150L340 200H320Z" fill="#f4f1e6" stroke="${GL}" stroke-width="2.5"/><path d="M330 200V230" stroke="${GL}" stroke-width="2.5"/>` + beaker(290, 230, 80, 70, 0.5, '#e88aa0') + step(330, 2, 'filter out the', 'solid pieces');
    g += tubeV(540, 110, 190, '#e88aa0', 0.5, 0.7) + `<path d="M526 205H554V160H526Z" fill="#e8f3f8" fill-opacity=".35"/><path d="M540 210q-6 -12 0 -24q6 -12 0 -24" stroke="#fff" stroke-width="3" fill="none"/>` + `<path d="M600 120L560 150" stroke="${GL}" stroke-width="4"/>` + T(610, 120, 'ice-cold ethanol', { size: 12, a: 'start' }) + T(610, 136, 'poured gently down the side', { size: 12, a: 'start' }) + step(540, 3, 'add cold ethanol:', 'a layer forms on top');
    g += `<path d="M800 120V240" stroke="#9aa3ad" stroke-width="4"/><path d="M800 240q-10 10 0 22q10 10 0 22" stroke="#fff" stroke-width="4" fill="none"/>` + step(800, 4, 'white strands of DNA', 'collect on a rod');
    g += T(490, 70, 'detergent breaks down cell membranes; salt makes the DNA clump together', { size: 12 });
    return wrap(W, H, o.aria || 'Steps for extracting DNA from strawberries with salt, detergent and cold ethanol', '', g);
  }

  /* ---------- the Solar System ---------- */
  function solarSystem(o = {}) {
    const W = 980, H = 360;
    let g = `<defs><radialGradient id="ssun"><stop offset="0" stop-color="#fff3a0"/><stop offset="1" stop-color="#f5a524"/></radialGradient></defs><circle cx="-40" cy="180" r="130" fill="url(#ssun)"/>`;
    const P = [['Mercury', 6, '#b8b0a6', 140], ['Venus', 10, '#e8c98a', 195], ['Earth', 11, '#3f7fd6', 255], ['Mars', 8, '#d0603a', 310], ['Jupiter', 34, '#d9b08c', 420], ['Saturn', 28, '#e3cf9a', 560], ['Uranus', 18, '#8fd6e0', 690], ['Neptune', 17, '#4a6fe0', 810]];
    P.forEach(([n, r, c, x]) => { g += (n === 'Saturn' ? `<ellipse cx="${x}" cy="180" rx="${r * 1.9}" ry="${r * 0.5}" fill="none" stroke="#d9c48a" stroke-width="4"/>` : '') + `<circle cx="${x}" cy="180" r="${r}" fill="${c}"/>` + T(x, 180 + r + 26, n, { size: 13, w: 700 }); });
    g += `<path d="M120 90H340" stroke="currentColor" stroke-width="1.4"/>` + T(230, 80, 'rocky inner planets', { size: 12 }) + `<path d="M380 90H860" stroke="currentColor" stroke-width="1.4"/>` + T(620, 80, 'gas and ice giants', { size: 12 });
    g += T(490, 36, 'The Solar System (sizes not to scale with distances)', { size: 15, w: 700 });
    g += T(490, 310, 'Light from the Sun takes about 8 minutes to reach Earth.', { size: 13 }) + T(490, 330, 'A light year is the distance light travels in a year: the nearest star is about 4 light years away.', { size: 12 });
    return wrap(W, H, o.aria || 'The eight planets of the Solar System in order from the Sun', '', g);
  }

  /* ---------- KS3 investigations ---------- */
  function ks3Investigation(o = {}) {
    const k = o.kind || 'bounce', W = 900, H = 400;
    let g = '', t = '', s = '';
    if (k === 'bounce') {
      t = 'Testing bouncing balls'; s = 'drop from the same height; measure the bounce height against a metre rule';
      g += `<rect x="300" y="60" width="26" height="300" fill="#f1d58a" stroke="#c9a94a"/>${Array.from({ length: 21 }, (_, i) => `<path d="M300 ${60 + i * 15}h${i % 5 ? 6 : 12}" stroke="#7a5f1f" stroke-width="1.2"/>`).join('')}` + bench(200, 700, 360);
      g += `<circle cx="380" cy="80" r="14" fill="#ef5b4c"/><circle cx="380" cy="346" r="14" fill="#ef5b4c" opacity=".35"/><circle cx="420" cy="180" r="14" fill="#ef5b4c"/>` + `<path d="M380 96V330Q395 350 410 330L418 196" stroke="currentColor" stroke-width="1.6" fill="none" stroke-dasharray="5 4"/>`;
      g += T(470, 84, 'drop height (keep it the same)', { size: 13, a: 'start' }) + T(470, 184, 'bounce height: read at eye level', { size: 13, a: 'start' }) + T(470, 270, 'change: type of ball or surface', { size: 13, a: 'start' }) + T(470, 290, 'repeat 3 times and find the mean', { size: 13, a: 'start' });
    } else if (k === 'bungee') {
      t = 'Testing a stretchy cord'; s = 'add masses one at a time and measure the new length';
      g += `<rect x="200" y="60" width="160" height="10" fill="#7d858f"/><path d="M280 70Q270 140 280 210Q290 240 280 250" stroke="#3fb27f" stroke-width="5" fill="none"/>${[0, 1, 2].map(i => `<rect x="266" y="${250 + i * 16}" width="28" height="14" fill="${i % 2 ? '#6b7480' : '#55606c'}"/>`).join('')}<rect x="330" y="70" width="22" height="260" fill="#f1d58a" stroke="#c9a94a"/>${Array.from({ length: 14 }, (_, i) => `<path d="M330 ${76 + i * 18}h8" stroke="#7a5f1f"/>`).join('')}`;
      g += T(420, 140, 'extension = new length − original length', { size: 13, a: 'start' }) + T(420, 170, 'plot extension against mass (or weight)', { size: 13, a: 'start' }) + T(420, 200, 'add masses gently; wear goggles', { size: 13, a: 'start' });
    } else if (k === 'conduction') {
      t = 'Comparing heat transfer through metals'; s = 'wax blobs or pins melt off first on the best conductor';
      g += bunsen(250, 360) + [['copper', '#c26b3a', 0], ['aluminium', '#c9ccd2', 1], ['iron', '#7d858f', 2]].map(([n, c, i]) => { const a = -0.5 + i * 0.5; return `<path d="M250 260L${f(250 + 380 * Math.cos(a))} ${f(260 + 140 * Math.sin(a))}" stroke="${c}" stroke-width="10" stroke-linecap="round"/>${[1, 2, 3].map(j => `<circle cx="${f(250 + (110 + j * 80) * Math.cos(a))}" cy="${f(268 + (110 + j * 80) * 0.37 * Math.sin(a))}" r="7" fill="#f4f1d6" opacity="${i === 0 && j < 3 ? 0.3 : 1}"/>`).join('')}` + T(250 + 400 * Math.cos(a), 266 + 148 * Math.sin(a), n, { size: 13, w: 700, a: 'start' }); }).join('');
      g += T(450, 380, 'same length and thickness; heat all the ends together; time when each blob falls', { size: 12 });
    } else if (k === 'cupcake') {
      t = 'Testing falling paper cases'; s = 'time the fall from the same height; stack cases to change the mass';
      g += `<rect x="200" y="60" width="22" height="300" fill="#f1d58a" stroke="#c9a94a"/>` + bench(150, 700, 360);
      [[330, 1], [450, 2], [570, 3]].forEach(([x, n]) => { for (let i = 0; i < n; i++) g += `<path d="M${x - 30} ${100 - i * 6}H${x + 30}L${x + 20} ${130 - i * 6}H${x - 20}Z" fill="#f2a7b9" stroke="#c76a86"/>`; g += arrow(x, 140, x, 220, '#3f7fd6', 2) + T(x, 250, `${n} case${n > 1 ? 's' : ''}`, { size: 13, w: 700 }); });
      g += stopwatch(660, 120) + T(450, 300, 'more cases: more weight but the same air resistance area → falls faster', { size: 12 });
    } else if (k === 'salt') {
      t = 'Testing how quickly salt dissolves'; s = 'same mass of salt and volume of water; change the temperature';
      [[200, '20 °C', '#7fc3e0'], [450, '40 °C', '#a8c8d8'], [700, '60 °C', '#d8b8b0']].forEach(([x, tt, c]) => { g += beaker(x - 70, 160, 140, 160, 0.7, c, 0.4) + thermo(x + 40, 110, 300, tt === '20 °C' ? 0.3 : tt === '40 °C' ? 0.5 : 0.7) + `<path d="M${x - 20} 140L${x} 300" stroke="#c9ccd2" stroke-width="5"/>` + [0, 1, 2, 3, 4].map(i => `<rect x="${x - 30 + i * 9}" y="${306 - (i % 2) * 3}" width="5" height="5" fill="#fff"/>`).join('') + T(x, 350, tt, { size: 14, w: 700 }); });
      g += stopwatch(800, 100) + T(450, 380, 'stir the same way each time; stop the clock when no crystals are left', { size: 12 });
    } else if (k === 'candle') {
      t = 'Testing a candle under a container'; s = 'how long does the candle burn under jars of different sizes?';
      [[220, 70], [450, 95], [700, 120]].forEach(([x, r]) => { g += `<path d="M${x - r * 0.6} 330V${330 - r * 1.3}Q${x - r * 0.6} ${330 - r * 1.6} ${x} ${330 - r * 1.6}Q${x + r * 0.6} ${330 - r * 1.6} ${x + r * 0.6} ${330 - r * 1.3}V330" fill="#e8f3f8" fill-opacity=".1" stroke="${GL}" stroke-width="3"/><rect x="${x - 8}" y="290" width="16" height="40" fill="#f4f1e6"/><path d="M${x - 5} 290Q${x - 6} 274 ${x} 262Q${x + 6} 274 ${x + 5} 290Z" fill="#ffb03a"/>`; });
      g += bench(100, 820, 330) + T(450, 370, 'bigger jar → more oxygen → the candle burns for longer', { size: 13, w: 700 });
    } else if (k === 'crater') {
      t = 'Investigating craters'; s = 'drop a ball into sand from different heights and measure the crater';
      g += `<rect x="200" y="60" width="22" height="260" fill="#f1d58a" stroke="#c9a94a"/><circle cx="320" cy="90" r="16" fill="#9aa3ad"/>` + arrow(320, 110, 320, 260, 'currentColor', 1.6) + `<rect x="200" y="300" width="500" height="50" rx="6" fill="#e3cf9a"/><path d="M420 300Q460 336 500 300" fill="#c9b07a"/>` + dbl(420, 290, 500, 290, 'currentColor', 1.4) + T(460, 282, 'diameter', { size: 12 });
      g += T(560, 140, 'higher drop → faster → wider, deeper crater', { size: 13, a: 'start' }) + T(560, 166, 'smooth the sand between drops', { size: 13, a: 'start' });
    }
    g += T(W / 2, 30, t, { size: 16, w: 700 }) + T(W / 2, 50, s, { size: 13 });
    return wrap(W, H, o.aria || t, '', g);
  }

  /* ======================= WAVE 9: KS3 pictures ======================= */
  /* ---------- moon phases and eclipses ---------- */
  function moonPhases(o = {}) {
    const W = 980, H = 440, cx = 300, cy = 230, R = 150;
    let g = `<defs><radialGradient id="mpE" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#6fb2f0"/><stop offset="1" stop-color="#1f5aa8"/></radialGradient></defs>`;
    g += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="currentColor" stroke-dasharray="5 6" opacity=".5"/><circle cx="${cx}" cy="${cy}" r="30" fill="url(#mpE)"/>` + T(cx, cy + 50, 'Earth', { size: 12 });
    for (let i = 0; i < 4; i++) g += arrow(40, 90 + i * 90, 100, 90 + i * 90, '#f5c84a', 2.5);
    g += T(60, 70, 'sunlight', { size: 12, fill: '#f5c84a' });
    const names = ['Full moon', 'Waning gibbous', 'Third quarter', 'Waning crescent', 'New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous'];
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4, x = cx + R * Math.cos(a), y = cy - R * Math.sin(a);
      g += `<circle cx="${f(x)}" cy="${f(y)}" r="16" fill="#2a2f3a"/><path d="M${f(x)} ${f(y - 16)}A16 16 0 0 0 ${f(x)} ${f(y + 16)}Z" fill="#f4f1e6"/>`;
      // view from Earth: lit fraction
      const k = Math.cos(i * Math.PI / 4), vx = 640 + (i % 4) * 85, vy = 150 + Math.floor(i / 4) * 140;
      const lit = (1 + k) / 2, waxing = i > 4;
      let shape;
      if (i === 0) shape = `<circle cx="${vx}" cy="${vy}" r="26" fill="#f4f1e6"/>`;
      else if (i === 4) shape = `<circle cx="${vx}" cy="${vy}" r="26" fill="#2a2f3a" stroke="#555"/>`;
      else { const side = waxing ? 1 : -1, rx = Math.abs(26 * (2 * lit - 1)); shape = `<circle cx="${vx}" cy="${vy}" r="26" fill="#2a2f3a"/><path d="M${vx} ${vy - 26}A26 26 0 0 ${side > 0 ? 1 : 0} ${vx} ${vy + 26}A${f(rx)} 26 0 0 ${(lit > 0.5) === (side > 0) ? 1 : 0} ${vx} ${vy - 26}Z" fill="#f4f1e6"/>`; }
      g += shape + T(vx, vy + 46, names[i], { size: 11 });
    }
    g += T(767, 70, 'What we see from Earth', { size: 14, w: 700 }) + T(300, 30, 'The Moon orbits Earth every 27 days; half of it is always lit by the Sun', { size: 14, w: 700 }).replace('x="300"', 'x="420"');
    g += T(767, 404, 'Solar eclipse: Moon between Sun and Earth', { size: 12 }) + T(767, 422, 'Lunar eclipse: Earth between Sun and Moon', { size: 12 });
    return wrap(W, H, o.aria || 'Phases of the Moon as it orbits Earth and how each phase looks from Earth', '', g);
  }

  /* ---------- seasons ---------- */
  function seasons(o = {}) {
    const W = 960, H = 400;
    let g = `<defs><radialGradient id="ssn"><stop offset="0" stop-color="#fff3a0"/><stop offset="1" stop-color="#f5a524"/></radialGradient></defs><ellipse cx="480" cy="210" rx="330" ry="110" fill="none" stroke="currentColor" stroke-dasharray="5 6" opacity=".5"/><circle cx="480" cy="210" r="46" fill="url(#ssn)"/>` + T(480, 280, 'Sun', { size: 12 });
    const earth = (x, y, lbl, sub) => `<g transform="rotate(23 ${x} ${y})"><circle cx="${x}" cy="${y}" r="30" fill="#3f7fd6"/><path d="M${x} ${y - 44}V${y + 44}" stroke="#fff" stroke-width="2"/><path d="M${x - 30} ${y}H${x + 30}" stroke="#9fd4e6" stroke-width="1.5" opacity=".7"/></g>` + T(x, y + 62, lbl, { size: 13, w: 700 }) + T(x, y + 78, sub, { size: 11 });
    g += earth(150, 210, 'June', 'UK summer: north tilted towards the Sun') + earth(810, 210, 'December', 'UK winter: north tilted away');
    g += T(480, 36, 'Seasons happen because Earth’s axis is tilted (23°)', { size: 15, w: 700 });
    g += T(480, 60, 'Summer: Sun higher in the sky, longer days, light more concentrated. Not because Earth is closer!', { size: 12 });
    g += T(480, 384, 'a day = one spin on the axis (24 hours);  a year = one orbit of the Sun (365¼ days)', { size: 12 });
    return wrap(W, H, o.aria || 'Earth’s tilted axis at opposite sides of its orbit causing summer and winter', '', g);
  }

  /* ---------- the ear ---------- */
  function earFig(o = {}) {
    const W = 920, H = 420;
    let g = `<path d="M150 120Q90 120 90 200Q90 270 140 300Q170 315 175 260Q178 230 200 220Z" fill="#e8b89a" stroke="#c48a6a" stroke-width="2"/>`;
    g += `<path d="M190 200H330" stroke="#c48a6a" stroke-width="30" stroke-linecap="round" opacity=".55"/><path d="M190 200H330" stroke="#3a2a22" stroke-width="18" stroke-linecap="round" opacity=".5"/>`;
    g += `<path d="M335 170Q345 200 335 230" stroke="#f0d2a0" stroke-width="7" fill="none"/>`;
    g += `<path d="M345 196L380 186L400 200L418 196" stroke="#f4f1e6" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M418 186V210" stroke="#f4f1e6" stroke-width="7"/>`;
    g += `<path d="M425 200Q460 140 520 150Q560 160 540 210Q520 250 470 230Q440 220 455 195Q470 180 490 195" fill="none" stroke="#e7a7b9" stroke-width="16"/><path d="M430 140Q480 70 540 110M440 150Q500 100 545 140" stroke="#bfe0ff" stroke-width="7" fill="none"/>`;
    g += `<path d="M545 200Q600 200 640 230" stroke="#f2d06a" stroke-width="5" fill="none"/>`;
    for (let i = 0; i < 3; i++) g += `<path d="M${40 + i * 14} ${180 + i * 2}q6 20 0 40" stroke="#5aa9f0" stroke-width="2.5" fill="none"/>`;
    const labs = [{ x: 120, y: 160, t: 'Outer ear: funnels sound in', side: 'l', ly: 100 }, { x: 260, y: 200, t: 'Ear canal', side: 'l', ly: 330 }, { x: 337, y: 200, t: 'Eardrum vibrates', side: 'r', ly: 100 }, { x: 395, y: 196, t: 'Three tiny bones (ossicles) pass on and amplify the vibrations', side: 'r', ly: 150 }, { x: 500, y: 225, t: 'Cochlea: hair cells turn vibrations into electrical impulses', side: 'r', ly: 250 }, { x: 490, y: 100, t: 'Semicircular canals (balance)', side: 'r', ly: 60 }, { x: 610, y: 216, t: 'Auditory nerve to the brain', side: 'r', ly: 310 }];
    g += T(400, 400, 'humans hear 20 Hz to 20 000 Hz; loud sounds can damage the hair cells', { size: 12 });
    return wrap(W, H, o.aria || 'Structure of the human ear from the outer ear to the auditory nerve', '', g + labels(labs, { W, H, lx: 200, rx: 680, size: 13 }));
  }

  /* ---------- antagonistic muscles and a joint ---------- */
  function armMuscles(o = {}) {
    const W = 980, H = 430;
    let g = panelT(260, 'Antagonistic muscles', 'muscles can only pull, so they work in pairs') + panelT(760, 'A synovial joint', 'the elbow is a hinge joint');
    g += `<path d="M160 90H190L200 260H170Z" fill="#efece2" stroke="#c9c2ac"/><path d="M190 262L360 300L354 320L180 286Z" fill="#efece2" stroke="#c9c2ac"/><circle cx="186" cy="272" r="14" fill="#efece2" stroke="#c9c2ac"/>`;
    g += `<path d="M196 110Q260 150 236 260Q232 280 230 290" fill="#e2483a" stroke="#a83020" stroke-width="2"/><path d="M160 110Q120 180 160 270L170 286" fill="#c96a5a" stroke="#8a3a2e" stroke-width="2" opacity=".85"/>`;
    g += T(270, 160, 'biceps contracts', { size: 13, w: 700, a: 'start', fill: '#ef5b4c' }) + T(270, 178, '(shorter, fatter)', { size: 12, a: 'start' }) + T(110, 150, 'triceps', { size: 13, w: 700, a: 'end' }) + T(110, 168, 'relaxes', { size: 12, a: 'end' }) + arrow(330, 300, 320, 240, 'currentColor', 2) + T(330, 230, 'arm bends', { size: 12, a: 'start' });
    g += T(260, 360, 'to straighten the arm: triceps contracts, biceps relaxes', { size: 12 }) + T(260, 378, 'tendons join muscle to bone; ligaments join bone to bone', { size: 12 });
    g += `<path d="M700 90H760V200Q760 220 730 220Q700 220 700 200Z" fill="#efece2" stroke="#c9c2ac"/><path d="M700 260Q700 240 730 240Q760 240 760 260V370H700Z" fill="#efece2" stroke="#c9c2ac"/><path d="M698 196Q730 214 762 196M698 264Q730 246 762 264" stroke="#9fd4e6" stroke-width="6" fill="none"/><rect x="694" y="214" width="72" height="32" fill="#f4e3a0" opacity=".5"/><path d="M690 180V280M770 180V280" stroke="#d9822b" stroke-width="4"/>`;
    const labs = [{ x: 730, y: 140, t: 'Bone', side: 'r', ly: 120 }, { x: 750, y: 200, t: 'Cartilage: smooth, absorbs shocks', side: 'r', ly: 180 }, { x: 740, y: 230, t: 'Synovial fluid: lubricates', side: 'r', ly: 230 }, { x: 770, y: 270, t: 'Ligament holds the bones together', side: 'r', ly: 290 }];
    return wrap(W, H, o.aria || 'Biceps and triceps working as an antagonistic pair, and the parts of a synovial joint', '', g + labels(labs, { W, H, lx: 600, rx: 800, size: 12 }));
  }

  /* ---------- pH scale ---------- */
  function phScale(o = {}) {
    const W = 980, H = 300;
    const cols = ['#d7191c', '#e8432a', '#f07a2a', '#f5a524', '#f7d14a', '#d6e24a', '#8fcf4a', '#3fb27f', '#2a9a9a', '#2a78c8', '#2a50c8', '#3a3ab0', '#5a2aa0', '#6a1a8a', '#4a0a6a'];
    let g = T(490, 36, 'The pH scale and universal indicator', { size: 16, w: 700 });
    cols.forEach((c, i) => { g += `<rect x="${60 + i * 58}" y="80" width="58" height="60" fill="${c}"/>` + T(89 + i * 58, 166, String(i), { size: 15, w: 700 }); });
    g += dbl(60, 196, 460, 196, '#ef5b4c', 2) + T(260, 216, 'acids: lower pH = stronger', { size: 13, w: 700 }) + T(466, 216, 'neutral', { size: 13, w: 700 }) + dbl(524, 196, 930, 196, '#7a5ad6', 2) + T(727, 216, 'alkalis: higher pH = stronger', { size: 13, w: 700 });
    [[1, 'stomach acid'], [3, 'lemon juice'], [5, 'black coffee'], [7, 'pure water'], [9, 'baking soda'], [12, 'bleach'], [14, 'oven cleaner']].forEach(([p, n]) => { g += T(89 + p * 58, 262, n, { size: 11 }) + `<path d="M${89 + p * 58} 244V250" stroke="currentColor"/>`; });
    g += T(490, 290, 'acid + alkali → salt + water (neutralisation)', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'The pH scale from 0 to 14 with universal indicator colours and everyday examples', '', g);
  }

  /* ---------- the rock cycle ---------- */
  function rockCycle(o = {}) {
    const W = 960, H = 460;
    let g = T(480, 32, 'The rock cycle', { size: 16, w: 700 });
    const box = (x, y, t, c, s) => `<rect x="${x - 90}" y="${y - 34}" width="180" height="68" rx="12" fill="${c}" opacity=".9"/>` + T(x, y - 4, t, { size: 15, w: 700, fill: '#1d2733' }) + T(x, y + 16, s, { size: 11, fill: '#1d2733' });
    g += box(480, 100, 'Sedimentary', '#e3cf9a', 'layers, may contain fossils') + box(800, 300, 'Metamorphic', '#b8b0d6', 'heat + pressure, no melting') + box(160, 300, 'Igneous', '#d68a6a', 'cooled magma, crystals') + `<ellipse cx="480" cy="400" rx="110" ry="34" fill="#ef5b4c" opacity=".85"/>` + T(480, 405, 'Magma', { size: 15, w: 700, fill: '#fff' });
    const curved = (x1, y1, x2, y2, bend, t, tx, ty) => { const mx = (x1 + x2) / 2 + bend[0], my = (y1 + y2) / 2 + bend[1]; return `<path d="M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}" stroke="currentColor" stroke-width="2.5" fill="none"/>` + arrow(mx * 0.1 + x2 * 0.9 - (x2 - mx) * 0.05, my * 0.1 + y2 * 0.9 - (y2 - my) * 0.05, x2, y2, 'currentColor', 2.5) + T(tx, ty, t, { size: 12 }); };
    g += curved(570, 110, 760, 266, [80, -40], 'heat and pressure', 760, 160);
    g += curved(800, 334, 590, 396, [40, 60], 'melting', 760, 400);
    g += curved(370, 400, 190, 334, [-40, 60], 'cooling', 200, 400);
    g += curved(160, 266, 390, 110, [-80, -40], 'weathering, erosion,', 190, 150) + T(190, 166, 'transport, deposition', { size: 12 });
    g += curved(730, 266, 560, 134, [-60, 10], 'uplift, weathering', 600, 240) + T(600, 256, 'and erosion', { size: 12 }) + curved(250, 300, 710, 300, [0, 40], 'heat and pressure', 480, 345);
    g += T(480, 444, 'rocks change slowly over millions of years; the atoms are recycled', { size: 12 });
    return wrap(W, H, o.aria || 'The rock cycle linking sedimentary, metamorphic and igneous rocks and magma', '', g);
  }

  /* ---------- Sankey diagram ---------- */
  function sankey(o = {}) {
    const W = 940, H = 380;
    let g = T(470, 36, 'Sankey diagram for a filament lamp', { size: 16, w: 700 }) + T(470, 58, 'arrow width shows the amount of energy', { size: 13 });
    g += `<rect x="60" y="120" width="460" height="100" fill="#e0a64a" opacity=".85"/><path d="M520 120H860L880 125L860 130H520Z" fill="#f5d84a"/><path d="M520 130H560Q650 130 650 220V310H670L605 350L540 310H560V220H520Z" fill="#ef5b4c" opacity=".85"/>`;
    g += T(290, 176, '100 J electrical energy in', { size: 14, w: 700, fill: '#1d2733' }) + T(870, 110, '10 J light (useful)', { size: 13, w: 700, a: 'end' }) + T(670, 280, '90 J heating the', { size: 13, w: 700, a: 'start' }) + T(670, 298, 'surroundings (wasted)', { size: 13, w: 700, a: 'start' });
    g += T(470, 372, 'efficiency = useful energy out ÷ total energy in = 10 ÷ 100 = 10%', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Sankey diagram for a filament lamp: 100 J in, 10 J light and 90 J wasted heating', '', g);
  }

  /* ---------- pressure and area ---------- */
  function pressureArea(o = {}) {
    const W = 940, H = 380;
    let g = T(470, 36, 'Pressure = force ÷ area', { size: 16, w: 700 }) + T(470, 58, 'the same weight on a smaller area gives a bigger pressure', { size: 13 });
    g += `<rect x="60" y="280" width="820" height="40" fill="#f4f6f7" opacity=".9"/><path d="M60 280H880" stroke="#c9d0d6" stroke-width="2"/>`;
    g += `<rect x="130" y="170" width="160" height="40" rx="8" fill="#3d4654"/><rect x="120" y="268" width="180" height="14" rx="5" fill="#7d858f"/><path d="M160 210L150 268M260 210L270 268" stroke="#7d858f" stroke-width="5"/>` + arrow(210, 110, 210, 165, '#ef5b4c', 3) + T(210, 100, '600 N', { size: 13, w: 700 });
    g += T(210, 344, 'snowshoe: area 0.2 m²', { size: 13 }) + T(210, 362, 'pressure = 600 ÷ 0.2 = 3 000 Pa', { size: 13, w: 700 });
    g += `<path d="M600 280L620 180H700L760 260L720 280Z" fill="#c26b3a"/><path d="M612 280h18V230h-10Z" fill="#3d4654"/><path d="M600 286Q615 300 630 286" fill="#c9d0d6"/>` + arrow(680, 110, 680, 175, '#ef5b4c', 3) + T(680, 100, '600 N', { size: 13, w: 700 });
    g += T(680, 344, 'stiletto heel: area 0.0001 m²', { size: 13 }) + T(680, 362, 'pressure = 6 000 000 Pa: sinks in', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Pressure equals force divided by area: a snowshoe compared with a stiletto heel', '', g);
  }

  /* ---------- graph types ---------- */
  function graphTypes(o = {}) {
    const W = 980, H = 400;
    let g = panelT(250, 'Bar chart', 'the independent variable is in categories') + panelT(730, 'Line graph', 'both variables are numbers (continuous)');
    g += axes(80, 320, 360, 220, 'Type of ball', 'Bounce height (cm)');
    [['tennis', 150, '#3fb27f'], ['rubber', 190, '#ef5b4c'], ['golf', 120, '#e0a64a'], ['foam', 60, '#3f7fd6']].forEach(([n, h, c], i) => { g += `<rect x="${110 + i * 85}" y="${320 - h}" width="56" height="${h}" fill="${c}" opacity=".85"/>` + T(138 + i * 85, 334, n, { size: 11 }); });
    g += axes(560, 320, 360, 220, 'Drop height (cm)', 'Bounce height (cm)');
    const pts = [[40, 20], [80, 44], [120, 62], [160, 86], [200, 104], [240, 128], [280, 146], [320, 172]];
    g += `<path d="M560 320L${560 + 340} ${320 - 182}" stroke="#3f7fd6" stroke-width="2.5"/>` + pts.map(([x, y], i) => `<path d="M${560 + x - 5} ${320 - y - 5}l10 10M${560 + x + 5} ${320 - y - 5}l-10 10" stroke="currentColor" stroke-width="2"/>`).join('');
    g += `<path d="M${560 + 200 - 5} ${320 - 150 - 5}l10 10M${560 + 200 + 5} ${320 - 150 - 5}l-10 10" stroke="#ef5b4c" stroke-width="2.5"/>` + T(748, 166, 'anomaly: repeat it', { size: 12, a: 'end', fill: '#ef5b4c' });
    g += T(740, 384, 'plot with neat crosses; draw a line of best fit, not dot-to-dot', { size: 12 }) + T(260, 384, 'leave gaps between bars; label both axes with units', { size: 12 });
    return wrap(W, H, o.aria || 'When to use a bar chart and when to use a line graph with a line of best fit', '', g);
  }

  /* ---------- energy cost ---------- */
  function powerBill(o = {}) {
    const W = 960, H = 380;
    let g = T(480, 36, 'Power, energy and the cost of electricity', { size: 16, w: 700 });
    const items = [['kettle', '3 000 W', '#cfd5dc'], ['hairdryer', '1 500 W', '#ef8a3a'], ['TV', '100 W', '#3d4654'], ['LED bulb', '10 W', '#f5d84a']];
    items.forEach(([n, p, c], i) => { const x = 110 + i * 130; g += `<rect x="${x - 40}" y="90" width="80" height="80" rx="12" fill="${c}" opacity=".85"/>` + T(x, 196, n, { size: 13, w: 700 }) + T(x, 214, p, { size: 13 }); });
    g += T(260, 260, 'power (W) = energy transferred every second', { size: 13 }) + T(260, 282, '1 kW = 1 000 W', { size: 13 });
    g += `<rect x="620" y="80" width="280" height="180" rx="10" fill="#3d4654"/><rect x="640" y="100" width="240" height="40" rx="4" fill="#9fe0b0"/>` + T(760, 128, '01 234.5 kWh', { size: 18, w: 700, fill: '#163a22' }) + T(760, 170, 'electricity meter', { size: 13, fill: '#e8ecf5' });
    g += T(760, 210, 'energy (kWh) = power (kW) × time (h)', { size: 12, fill: '#e8ecf5' }) + T(760, 230, 'cost = kWh × price per kWh', { size: 12, fill: '#e8ecf5' });
    g += T(480, 330, 'Example: a 3 kW kettle used for 0.1 h = 0.3 kWh; at 25p per kWh it costs 7.5p', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Power ratings of appliances and calculating the cost of electricity in kilowatt-hours', '', g);
  }

  /* ---------- puberty changes ---------- */
  function pubertyChanges(o = {}) {
    const W = 960, H = 380;
    let g = T(480, 36, 'Puberty: hormones cause the body to change', { size: 16, w: 700 }) + T(480, 58, 'usually between about 9 and 16; everyone’s timing is different', { size: 13 });
    const col = (x, title, hormone, c, items) => `<rect x="${x - 140}" y="80" width="280" height="250" rx="12" fill="${c}" opacity=".15" stroke="${c}"/>` + T(x, 108, title, { size: 15, w: 700 }) + T(x, 128, hormone, { size: 12, fill: c }) + items.map((t, i) => T(x - 120, 160 + i * 24, '• ' + t, { size: 13, a: 'start' })).join('');
    g += col(170, 'Both', 'hormones from glands', '#3fb27f', ['growth spurt', 'pubic and underarm hair', 'body odour, spots', 'emotional changes']);
    g += col(480, 'Girls', 'oestrogen (from the ovaries)', '#ef5b9c', ['breasts develop', 'hips widen', 'periods start', 'ovaries release eggs']);
    g += col(790, 'Boys', 'testosterone (from the testes)', '#3f7fd6', ['voice deepens', 'facial hair grows', 'shoulders widen', 'testes make sperm']);
    g += T(480, 362, 'these changes prepare the body for reproduction', { size: 12 });
    return wrap(W, H, o.aria || 'Changes during puberty for everyone, for girls and for boys, and the hormones involved', '', g);
  }

  /* ---------- conservation of mass ---------- */
  function massConservation(o = {}) {
    const W = 920, H = 380;
    let g = T(460, 36, 'Where does the mass go?', { size: 16, w: 700 });
    const scale = (x, r) => `<rect x="${x - 90}" y="270" width="180" height="40" rx="6" fill="#d9dee4" stroke="#8e98a3"/><rect x="${x - 40}" y="280" width="80" height="20" rx="3" fill="#9fe0b0"/>` + T(x, 295, r, { size: 13, w: 700, fill: '#163a22' }) + `<rect x="${x - 80}" y="258" width="160" height="12" rx="3" fill="#b7bfc8"/>`;
    g += T(230, 80, 'Closed flask', { size: 15, w: 700 }) + T(230, 98, 'no gas can escape', { size: 12 }) + conical(230, 130, '#cfe7f2', 0.5) + `<rect x="216" y="122" width="28" height="14" rx="3" fill="#55606c"/>` + scale(230, '152.40 g') + T(230, 340, 'mass stays the same', { size: 13, w: 700 });
    g += T(690, 80, 'Open flask', { size: 15, w: 700 }) + T(690, 98, 'a gas is given off', { size: 12 }) + conical(690, 130, '#cfe7f2', 0.5) + [0, 1, 2].map(i => `<circle cx="${712 + i * 12}" cy="${128 - i * 10}" r="5" fill="none" stroke="currentColor"/>`).join('') + scale(690, '151.86 g') + T(690, 340, 'mass seems to go down', { size: 13, w: 700 });
    g += T(460, 368, 'atoms are not created or destroyed: total mass of reactants = total mass of products', { size: 12 });
    return wrap(W, H, o.aria || 'Conservation of mass in a closed flask compared with an open flask that loses gas', '', g);
  }

  /* ======================= WAVE 10: last KS3 pictures ======================= */
  const tile = (x, y, w, h, c, t, s) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${c}" opacity=".18" stroke="${c}"/>` + T(x + w / 2, y + 26, t, { size: 14, w: 700 }) + (s || []).map((l, i) => T(x + w / 2, y + 48 + i * 17, l, { size: 12 })).join('');

  /* ---------- static electricity ---------- */
  function staticCharge(o = {}) {
    const W = 960, H = 400;
    let g = panelT(250, 'Charging by rubbing', 'electrons move from the cloth to the balloon') + panelT(720, 'Charges and forces', 'like charges repel; opposite charges attract');
    g += `<ellipse cx="200" cy="200" rx="70" ry="86" fill="#ef5b4c"/><path d="M200 286L192 300H208Z" fill="#c0392b"/><path d="M200 300Q190 330 205 360" stroke="#ccc" fill="none"/>` + [[-30, -30], [10, -50], [30, 0], [-20, 20], [20, 40], [-40, 60]].map(([dx, dy]) => T(200 + dx, 206 + dy, '−', { size: 20, w: 700, fill: '#fff' })).join('');
    g += `<path d="M300 140Q340 200 300 280L360 300Q400 210 360 120Z" fill="#9b7ad6" opacity=".85"/>` + [[340, 170], [350, 230], [335, 270]].map(([x, y]) => T(x, y, '+', { size: 18, w: 700, fill: '#fff' })).join('') + T(350, 330, 'cloth', { size: 12 }) + T(200, 380, 'balloon gains electrons: negative; cloth loses electrons: positive', { size: 12 }).replace('x="200"', 'x="260"');
    const pair = (y, a, b, rep) => `<circle cx="640" cy="${y}" r="22" fill="${a === '+' ? '#ef5b4c' : '#3f7fd6'}"/><circle cx="800" cy="${y}" r="22" fill="${b === '+' ? '#ef5b4c' : '#3f7fd6'}"/>` + T(640, y + 7, a, { size: 20, w: 700, fill: '#fff' }) + T(800, y + 7, b, { size: 20, w: 700, fill: '#fff' }) + (rep ? arrow(612, y, 572, y, 'currentColor', 2.5) + arrow(828, y, 868, y, 'currentColor', 2.5) + T(720, y + 5, 'repel', { size: 13, w: 700 }) : arrow(668, y, 708, y, 'currentColor', 2.5) + arrow(772, y, 732, y, 'currentColor', 2.5) + T(720, y + 34, 'attract', { size: 13, w: 700 }));
    g += pair(130, '+', '+', true) + pair(210, '−', '−', true) + pair(290, '+', '−', false);
    g += T(720, 370, 'a charged object is surrounded by an electric field', { size: 12 });
    return wrap(W, H, o.aria || 'Charging a balloon by rubbing, and how like and unlike charges repel and attract', '', g);
  }

  /* ---------- pregnancy ---------- */
  function pregnancy(o = {}) {
    const W = 920, H = 425;
    let g = `<path d="M260 70Q420 40 470 180Q500 300 380 360Q260 400 200 300Q150 200 260 70Z" fill="#f2c9c4" stroke="#c4847e" stroke-width="5"/><path d="M270 100Q400 80 440 190Q460 290 370 330Q270 360 230 290Q190 200 270 100Z" fill="#cfe7f2" opacity=".85"/>`;
    g += `<path d="M410 120Q450 150 440 200Q420 190 400 160Z" fill="#a8484a"/>`;
    g += `<path d="M412 168Q380 210 340 220" stroke="#d9a0a8" stroke-width="7" fill="none"/>`;
    g += `<circle cx="310" cy="190" r="42" fill="#f6d4be" stroke="#d9a080" stroke-width="2"/><path d="M300 228Q280 280 300 310Q330 330 350 300Q370 260 340 226Z" fill="#f6d4be" stroke="#d9a080" stroke-width="2"/><path d="M296 300Q270 300 280 320" stroke="#d9a080" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    g += `<path d="M340 340Q330 380 310 400H350Q360 380 350 350Z" fill="#c4847e" opacity=".6"/>`;
    const labs = [{ x: 330, y: 70, t: 'Uterus wall (muscle): pushes the baby out at birth', side: 'r', ly: 60 }, { x: 425, y: 165, t: 'Placenta: oxygen and nutrients pass from mother to fetus; waste passes back', side: 'r', ly: 140 }, { x: 375, y: 200, t: 'Umbilical cord', side: 'r', ly: 220 }, { x: 420, y: 260, t: 'Amniotic fluid protects the fetus from bumps', side: 'r', ly: 280 }, { x: 330, y: 380, t: 'Cervix', side: 'r', ly: 360 }, { x: 290, y: 180, t: 'Fetus', side: 'l', ly: 180 }];
    g += T(330, 30, 'Pregnancy: about 40 weeks (9 months)', { size: 15, w: 700 }).replace('x="330"', 'x="460"');
    g += T(330, 412, 'harmful substances (alcohol, nicotine) can cross the placenta', { size: 12 });
    return wrap(W, H, o.aria || 'A fetus in the uterus with the placenta, umbilical cord and amniotic fluid', '', g + labels(labs, { W, H, lx: 180, rx: 560, size: 13 }));
  }

  /* ---------- germination ---------- */
  function germination(o = {}) {
    const W = 960, H = 400;
    let g = panelT(220, 'Inside a seed', 'a bean seed cut open') + panelT(700, 'Germination', 'needs water, oxygen and warmth (not light)');
    g += `<ellipse cx="220" cy="210" rx="120" ry="80" fill="#c99a5a" stroke="#8a5a30" stroke-width="4"/><ellipse cx="220" cy="210" rx="108" ry="68" fill="#f2e3a8"/><path d="M150 190Q170 170 190 186Q180 200 160 204Z" fill="#9bd06a"/><path d="M190 194Q200 220 186 240" stroke="#c9d88a" stroke-width="6" fill="none"/>`;
    const labs = [{ x: 120, y: 160, t: 'Seed coat (testa) protects', side: 'l', ly: 130 }, { x: 170, y: 190, t: 'Embryo shoot', side: 'l', ly: 190 }, { x: 188, y: 236, t: 'Embryo root', side: 'l', ly: 250 }, { x: 270, y: 220, t: 'Food store (starch)', side: 'r', ly: 300 }];
    g += bench(500, 900, 330) + `<path d="M520 330H880" stroke="#6b4a2f" stroke-width="40" opacity=".5"/>`;
    [[560, 0], [670, 1], [790, 2]].forEach(([x, k]) => { g += `<ellipse cx="${x}" cy="320" rx="20" ry="13" fill="#c99a5a"/>`; if (k > 0) g += `<path d="M${x} 330Q${x - 6} 350 ${x + 4} 370" stroke="#f4f1e6" stroke-width="4" fill="none"/>`; if (k > 1) g += `<path d="M${x} 308Q${x + 4} 260 ${x} 220" stroke="#4fa84a" stroke-width="5" fill="none"/><path d="M${x} 230Q${x - 30} 210 ${x - 34} 230Q${x - 14} 240 ${x} 230M${x} 230Q${x + 30} 210 ${x + 34} 230Q${x + 14} 240 ${x} 230" fill="#6abf4a"/>`; g += T(x, 396, ['day 1', 'day 3: root', 'day 7: shoot'][k], { size: 12 }); });
    g += T(700, 120, 'the seed uses its food store until', { size: 12 }) + T(700, 136, 'its leaves can photosynthesise', { size: 12 });
    return wrap(W, H, o.aria || 'Parts of a bean seed and the stages of germination', '', g + labels(labs, { W, H, lx: 90, rx: 380, size: 12 }));
  }

  /* ---------- fair tests and variables ---------- */
  function fairTest(o = {}) {
    const W = 980, H = 420;
    let g = T(490, 30, 'Planning a fair test: does ramp height change how far a toy car rolls?', { size: 15, w: 700 });
    g += `<path d="M60 250L300 160V250Z" fill="${WOOD}" opacity=".85"/><rect x="40" y="250" width="440" height="10" fill="#7d858f"/><rect x="250" y="160" width="40" height="18" rx="4" fill="#ef5b4c" transform="rotate(-20 270 170)"/>` + dbl(310, 160, 310, 250, 'currentColor', 1.6) + T(318, 210, 'height', { size: 12, a: 'start' }) + dbl(300, 280, 460, 280, 'currentColor', 1.6) + T(380, 300, 'distance', { size: 12 });
    g += tile(40, 320, 140, 80, '#e0a64a', 'Independent', ['what I change:', 'ramp height']) + tile(195, 320, 140, 80, '#3f7fd6', 'Dependent', ['what I measure:', 'distance rolled']) + tile(350, 320, 140, 80, '#3fb27f', 'Control', ['kept the same:', 'car, surface, start']);
    g += T(740, 70, 'Results table', { size: 14, w: 700 });
    const rows = [['Height (cm)', 'Distance (cm)', '', '', 'Mean'], ['', '1', '2', '3', ''], ['10', '42', '40', '44', '42'], ['20', '81', '79', '95', '80'], ['30', '120', '118', '122', '120']];
    rows.forEach((r, i) => r.forEach((c, j) => { const x = 560 + j * 76, y = 90 + i * 34; g += `<rect x="${x}" y="${y}" width="76" height="34" fill="${i < 2 ? '#3f7fd6' : 'none'}" fill-opacity=".15" stroke="currentColor" stroke-opacity=".35"/>` + T(x + 38, y + 22, c, { size: 12, w: i < 2 ? 700 : 400, fill: c === '95' ? '#ef5b4c' : undefined }); }));
    g += T(740, 290, '95 is an anomaly: leave it out of the mean', { size: 12, fill: '#ef5b4c' }) + T(740, 314, 'repeat readings to check they are repeatable', { size: 12 }) + T(740, 334, 'units go in the column headings, not the boxes', { size: 12 }) + T(740, 354, 'evaluate: what errors happened? how could it be improved?', { size: 12 });
    return wrap(W, H, o.aria || 'A fair test with independent, dependent and control variables and a results table with an anomaly', '', g);
  }

  /* ---------- dissolving ---------- */
  function dissolving(o = {}) {
    const W = 940, H = 380;
    let g = T(470, 32, 'Dissolving: solute + solvent → solution', { size: 15, w: 700 });
    const rnd = S._rnd(5);
    const water = (x, n) => Array.from({ length: n }, () => `<circle cx="${f(x - 70 + rnd() * 140)}" cy="${f(130 + rnd() * 150)}" r="7" fill="#7fc3e0" opacity=".8"/>`).join('');
    g += `<rect x="70" y="160" width="80" height="80" fill="#fff"/>${Array.from({ length: 16 }, (_, i) => `<circle cx="${80 + (i % 4) * 20}" cy="${170 + Math.floor(i / 4) * 20}" r="7" fill="#e0e4ea" stroke="#9aa3ad"/>`).join('')}` + T(110, 270, 'solute (salt)', { size: 13, w: 700 }) + T(110, 288, '10 g', { size: 12 });
    g += T(200, 210, '+', { size: 28, w: 700 }) + beaker(250, 110, 180, 180, 0.95, WATER, 0.15) + water(340, 70) + T(340, 320, 'solvent (water)', { size: 13, w: 700 }) + T(340, 338, '100 g', { size: 12 });
    g += T(480, 210, '→', { size: 28, w: 700 }) + beaker(530, 110, 180, 180, 0.95, WATER, 0.15) + water(620, 70) + Array.from({ length: 16 }, () => `<circle cx="${f(560 + rnd() * 120)}" cy="${f(140 + rnd() * 140)}" r="6" fill="#e0e4ea" stroke="#9aa3ad"/>`).join('') + T(620, 320, 'solution', { size: 13, w: 700 }) + T(620, 338, '110 g: no mass is lost', { size: 12 });
    g += T(830, 160, 'the solute particles', { size: 12 }) + T(830, 176, 'spread out between the', { size: 12 }) + T(830, 192, 'water particles', { size: 12 }) + T(830, 230, 'soluble: dissolves', { size: 12 }) + T(830, 246, 'insoluble: does not', { size: 12 }) + T(830, 280, 'saturated: no more', { size: 12 }) + T(830, 296, 'will dissolve', { size: 12 });
    return wrap(W, H, o.aria || 'Particles of salt dissolving in water to make a solution with no loss of mass', '', g);
  }

  /* ---------- energy stores ---------- */
  function energyStores(o = {}) {
    const W = 980, H = 380;
    let g = T(490, 32, 'Energy stores', { size: 16, w: 700 }) + T(490, 54, 'energy is transferred between stores by heating, by forces, by electricity or by light and sound', { size: 12 });
    const S8 = [['Kinetic', 'moving objects', '#3f7fd6'], ['Gravitational', 'objects raised up', '#3fb27f'], ['Elastic', 'stretched or squashed', '#e0a64a'], ['Thermal', 'hot objects', '#ef5b4c'], ['Chemical', 'food, fuels, batteries', '#9b7ad6'], ['Nuclear', 'atomic nuclei', '#d6c24a'], ['Magnetic', 'magnets attracting', '#5aa9f0'], ['Electrostatic', 'charges attracting', '#e07ab0']];
    S8.forEach(([t, s, c], i) => { g += tile(40 + (i % 4) * 230, 80 + Math.floor(i / 4) * 130, 210, 110, c, t, [s]); });
    g += T(490, 364, 'example: a battery-powered toy car: chemical store → kinetic store (some wasted to thermal)', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'The eight energy stores with examples', '', g);
  }

  /* ---------- energy resources ---------- */
  function energyResources(o = {}) {
    const W = 980, H = 400;
    let g = panelT(250, 'Non-renewable', 'will run out; fossil fuels release carbon dioxide') + panelT(730, 'Renewable', 'will not run out; may depend on the weather');
    [['Coal', '#3d4654'], ['Oil', '#1f2227'], ['Natural gas', '#5aa9f0'], ['Nuclear', '#d6c24a']].forEach(([t, c], i) => { g += tile(60 + (i % 2) * 200, 90 + Math.floor(i / 2) * 120, 180, 100, c, t, [i < 3 ? 'burned in power stations' : 'no CO₂, radioactive waste']); });
    [['Solar', '#f5c84a'], ['Wind', '#9fd4e6'], ['Hydroelectric', '#3f7fd6'], ['Tidal and wave', '#2a9a9a'], ['Geothermal', '#ef5b4c'], ['Biofuel', '#3fb27f']].forEach(([t, c], i) => { g += tile(530 + (i % 3) * 140, 90 + Math.floor(i / 3) * 120, 130, 100, c, t, []); });
    g += T(490, 370, 'most electricity is made by turning a turbine, which turns a generator', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'Renewable and non-renewable energy resources', '', g);
  }

  /* ---------- variation ---------- */
  function variationGraphs(o = {}) {
    const W = 980, H = 395;
    let g = panelT(250, 'Continuous variation', 'any value in a range: height, mass') + panelT(730, 'Discontinuous variation', 'separate groups: blood group, eye colour');
    g += axes(80, 320, 360, 210, 'Height (cm)', 'Number of pupils');
    [10, 24, 46, 70, 90, 72, 44, 22, 8].forEach((v, i) => { g += `<rect x="${92 + i * 38}" y="${320 - v * 2}" width="38" height="${v * 2}" fill="#3f7fd6" opacity=".8" stroke="#1f5aa8"/>`; });
    g += T(260, 382, 'bars touch; often a bell-shaped curve', { size: 12 });
    g += axes(560, 320, 360, 210, 'Blood group', 'Number of people');
    [['O', 88], ['A', 76], ['B', 18], ['AB', 6]].forEach(([n, v], i) => { g += `<rect x="${590 + i * 85}" y="${320 - v * 2}" width="54" height="${v * 2}" fill="#ef5b4c" opacity=".8"/>` + T(617 + i * 85, 336, n, { size: 12, w: 700 }); });
    g += T(740, 382, 'bars have gaps', { size: 12 });
    return wrap(W, H, o.aria || 'Graphs of continuous variation (height) and discontinuous variation (blood group)', '', g);
  }

  /* ---------- adaptations ---------- */
  function adaptations(o = {}) {
    const W = 960, H = 400;
    let g = T(480, 32, 'Adaptations help organisms survive where they live', { size: 15, w: 700 });
    g += `<rect x="180" y="330" width="200" height="16" fill="#e3cf9a"/><path d="M260 330V160Q260 120 280 120Q300 120 300 160V330Z" fill="#4f9a4a"/><path d="M260 240H220V200Q220 180 236 180Q248 180 248 200V220H260Z" fill="#4f9a4a"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${i % 2 ? 300 : 260} ${150 + i * 18}l${i % 2 ? 10 : -10} -4" stroke="#f4f1e6" stroke-width="2"/>`).join('')}<path d="M270 346Q200 370 140 360M290 346Q360 372 420 360M280 346V390" stroke="#c9a06a" stroke-width="3" fill="none"/>`;
    const labs = [{ x: 300, y: 168, t: 'Spines, not leaves: less water lost', side: 'r', ly: 130 }, { x: 290, y: 250, t: 'Thick stem stores water', side: 'r', ly: 230 }, { x: 400, y: 360, t: 'Long, wide roots collect water', side: 'r', ly: 330 }];
    g += T(280, 380, 'cactus (desert)', { size: 13, w: 700 }).replace('y="380"', 'y="392"');
    g += tile(660, 80, 270, 130, '#9fd4e6', 'Polar bear (Arctic)', ['thick fur and fat for insulation', 'white fur for camouflage', 'small ears: less heat lost']) + tile(660, 230, 270, 130, '#e0a64a', 'Camel (desert)', ['stores fat in its hump', 'wide feet for walking on sand', 'long eyelashes keep out sand']);
    return wrap(W, H, o.aria || 'Adaptations of a cactus, a polar bear and a camel', '', g + labels(labs, { W, H, lx: 120, rx: 420, size: 12 }));
  }

  /* ---------- mass and weight ---------- */
  function massWeight(o = {}) {
    const W = 920, H = 430;
    let g = T(460, 32, 'Mass and weight', { size: 16, w: 700 }) + T(460, 54, 'mass (kg) is the amount of matter; weight (N) is the force of gravity on it', { size: 13 });
    const pl = (x, c, n, gv, wt) => `<circle cx="${x}" cy="330" r="95" fill="${c}" opacity=".9"/><rect x="${x - 30}" y="140" width="60" height="60" rx="8" fill="#55606c"/>` + T(x, 176, '60 kg', { size: 14, w: 700, fill: '#fff' }) + arrow(x, 202, x, gv === 10 ? 280 : 228, '#ef5b4c', 3) + T(x + 14, 222, `weight ${wt} N`, { size: 14, w: 700, a: 'start', fill: '#ef5b4c' }) + T(x, 110, `${n}: g = ${gv} N/kg`, { size: 14, w: 700 });
    g += pl(230, '#3f7fd6', 'Earth', 10, 600) + pl(690, '#b8b0a6', 'Moon', 1.6, 96);
    g += T(460, 210, 'weight = mass × g', { size: 16, w: 700 }) + T(460, 236, 'same mass everywhere;', { size: 12 }) + T(460, 252, 'weight changes', { size: 12 });
    return wrap(W, H, o.aria || 'A 60 kg mass weighs 600 N on Earth and 96 N on the Moon', '', g);
  }

  /* ---------- aerobic and anaerobic respiration ---------- */
  function respirationCompare(o = {}) {
    const W = 980, H = 380;
    let g = T(490, 32, 'Aerobic and anaerobic respiration', { size: 16, w: 700 });
    g += tile(40, 60, 420, 120, '#3fb27f', 'Aerobic (with oxygen)', ['glucose + oxygen → carbon dioxide + water', 'releases lots of energy', 'happens in mitochondria all the time']);
    g += tile(520, 60, 420, 120, '#ef5b4c', 'Anaerobic in muscles (no oxygen)', ['glucose → lactic acid', 'releases less energy; causes cramp', 'during hard exercise: oxygen debt afterwards']);
    g += tile(520, 200, 420, 120, '#e0a64a', 'Anaerobic in yeast (fermentation)', ['glucose → ethanol + carbon dioxide', 'used to make bread and beer', 'the carbon dioxide makes bread rise']);
    g += tile(40, 200, 420, 120, '#3f7fd6', 'Breathing is not respiration', ['breathing moves air in and out of the lungs', 'respiration is a chemical reaction', 'in every living cell']);
    g += T(490, 360, 'respiration releases energy for movement, keeping warm and building molecules', { size: 12 });
    return wrap(W, H, o.aria || 'Comparison of aerobic respiration and anaerobic respiration in muscles and in yeast', '', g);
  }

  /* ---------- recycling metals ---------- */
  function recycleMetals(o = {}) {
    const W = 920, H = 380;
    let g = T(460, 32, 'Why recycle aluminium cans?', { size: 16, w: 700 }) + T(460, 54, 'energy needed to make 1 kg of aluminium', { size: 13 });
    g += `<rect x="160" y="100" width="560" height="60" rx="6" fill="#ef5b4c" opacity=".85"/>` + T(170, 136, 'from bauxite ore (mining + electrolysis): about 200 MJ', { size: 13, w: 700, a: 'start', fill: '#fff' });
    g += `<rect x="160" y="180" width="28" height="60" rx="6" fill="#3fb27f"/>` + T(200, 216, 'recycled cans: about 10 MJ, 95% less energy', { size: 13, w: 700, a: 'start' });
    g += T(460, 290, 'Recycling also: saves the ore (a finite resource), means less mining and quarrying,', { size: 12 }) + T(460, 308, 'produces less carbon dioxide and sends less waste to landfill.', { size: 12 });
    g += T(460, 340, 'Problems: collecting and sorting the metals takes energy and money.', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'Energy needed to make aluminium from ore compared with recycling cans', '', g);
  }

  /* ======================= WAVE 11: physics gaps ======================= */
  const curveP = (fn, x0, y0, w, h, n = 80) => { let d = ''; for (let i = 0; i <= n; i++) { const t = i / n, v = fn(t); d += (i ? 'L' : 'M') + f(x0 + t * w) + ' ' + f(y0 - v * h); } return d; };

  function stressStrain(o = {}) {
    const W = 980, H = 400;
    let g = panelT(170, 'Ductile (copper)', 'stretches a lot before breaking') + panelT(490, 'Brittle (glass)', 'breaks with no plastic region') + panelT(810, 'Polymeric (rubber)', 'large strain, not a straight line');
    const ax = x => axes(x, 320, 240, 220, 'Strain', 'Stress');
    g += ax(50) + ax(370) + ax(690);
    g += `<path d="M50 320L110 160Q130 140 170 132Q230 126 260 150L270 176" stroke="#3f7fd6" stroke-width="3" fill="none"/><circle cx="110" cy="160" r="4" fill="#ef5b4c"/><circle cx="214" cy="126" r="4" fill="#e0a64a"/><path d="M266 168l10 10M276 168l-10 10" stroke="#ef5b4c" stroke-width="2.5"/>`;
    g += T(118, 178, 'yield point', { size: 11, a: 'start' }) + T(214, 114, 'UTS', { size: 12, w: 700, fill: '#e0a64a' }) + T(160, 220, 'plastic', { size: 11 }) + T(78, 270, 'E = gradient', { size: 11, a: 'start' }).replace('x="78"', 'x="84"');
    g += `<path d="M370 320L520 120" stroke="#3f7fd6" stroke-width="3"/><path d="M516 112l10 10M526 112l-10 10" stroke="#ef5b4c" stroke-width="2.5"/>` + T(540, 116, 'fractures', { size: 12, a: 'start' });
    g += `<path d="${curveP(t => 0.15 * t + 0.7 * t ** 4 + 0.1 * Math.sin(t * 3), 690, 320, 230, 200)}" stroke="#3f7fd6" stroke-width="3" fill="none"/><path d="${curveP(t => 0.08 * t + 0.6 * t ** 5, 690, 320, 230, 200)}" stroke="#3f7fd6" stroke-width="2" fill="none" stroke-dasharray="6 4"/>` + T(772, 150, 'unloading curve (dashed)', { size: 11 }) + T(772, 166, 'is below the loading curve', { size: 11 });
    g += T(490, 386, 'UTS = ultimate tensile strength (greatest stress before breaking)', { size: 12 });
    return wrap(W, H, o.aria || 'Stress–strain graphs for ductile, brittle and polymeric materials', '', g);
  }

  function potentialDivider(o = {}) {
    const W = 960, H = 420;
    let g = panelT(230, 'Potential divider', 'the p.d. is shared in the ratio of the resistances') + panelT(700, 'Sensing circuit', 'output changes with temperature or light');
    g += wire('M100 100H200V148M200 282V340H100V100') + `<rect x="86" y="200" width="28" height="30" fill="var(--panel,#121a33)"/><path d="M80 210H120M88 222H112" stroke="currentColor" stroke-width="3.5"/>` + res(200, 170, true) + res(200, 260, true) + wire('M200 192V238') + T(178, 170, 'R₁', { size: 14, w: 700, a: 'end' }) + T(178, 260, 'R₂', { size: 14, w: 700, a: 'end' }) + T(70, 220, 'V_in', { size: 13, a: 'end' });
    g += wire('M200 215H300M200 340H300') + `<circle cx="300" cy="215" r="4" fill="currentColor"/><circle cx="300" cy="340" r="4" fill="currentColor"/>` + dbl(320, 220, 320, 335, 'currentColor', 1.6) + T(330, 282, 'V_out', { size: 13, w: 700, a: 'start' });
    g += T(230, 396, 'V_out = V_in × R₂ ÷ (R₁ + R₂)', { size: 15, w: 700 });
    g += wire('M570 100H670V148M670 282V340H570V100') + `<rect x="556" y="200" width="28" height="30" fill="var(--panel,#121a33)"/><path d="M550 210H590M558 222H582" stroke="currentColor" stroke-width="3.5"/>` + res(670, 170, true) + wire('M670 192V238') + res(670, 260, true) + `<path d="M652 280L688 240" stroke="currentColor" stroke-width="2"/><path d="M652 280h-8" stroke="currentColor" stroke-width="2"/>` + T(648, 170, 'fixed R', { size: 12, a: 'end' }) + T(648, 266, 'thermistor', { size: 12, a: 'end' });
    g += wire('M670 215H760M670 340H760') + `<rect x="760" y="230" width="60" height="90" rx="6" fill="#3d4654"/>` + T(790, 280, 'to', { size: 11, fill: '#e8ecf5' }) + T(790, 296, 'alarm', { size: 11, fill: '#e8ecf5' });
    g += T(700, 380, 'hotter → thermistor R falls → V_out across it falls', { size: 12 }) + T(700, 398, '(an LDR works the same way with light)', { size: 12 });
    return wrap(W, H, o.aria || 'A potential divider and a thermistor sensing circuit', '', g);
  }

  function capModel(o = {}) {
    const W = 940, H = 400, x0 = 90, y0 = 330;
    let g = axes(x0, y0, 480, 260, 'Time t', 'Charge Q');
    let d = `M${x0} ${y0 - 240}`, q = 1; const dt = 0.2;
    for (let i = 0; i < 12; i++) { const x1 = x0 + (i + 1) * 40, nq = q - q * dt; d += `H${x1}V${f(y0 - 240 * nq)}`; q = nq; }
    g += `<path d="${curveP(t => Math.exp(-t * 2.4), x0, y0, 480, 240)}" stroke="#3f7fd6" stroke-width="3" fill="none"/><path d="${d}" stroke="#e0a64a" stroke-width="2" fill="none"/>`;
    g += T(x0 + 300, 120, 'smooth curve: Q = Q₀ e^(−t/RC)', { size: 13, a: 'start', fill: '#3f7fd6' }) + T(x0 + 300, 146, 'steps: iterative model', { size: 13, a: 'start', fill: '#e0a64a' });
    g += T(720, 220, 'Each step of Δt:', { size: 14, w: 700, a: 'start' }).replace('x="720"', 'x="620"') + T(620, 246, 'I = Q ÷ RC', { size: 13, a: 'start' }) + T(620, 268, 'ΔQ = −I Δt', { size: 13, a: 'start' }) + T(620, 290, 'new Q = Q + ΔQ', { size: 13, a: 'start' }) + T(620, 316, 'smaller Δt → closer to the curve', { size: 12, a: 'start' });
    g += T(470, 30, 'Modelling capacitor discharge', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'Iterative model of capacitor discharge compared with the exponential curve', '', g);
  }

  function ctScan(o = {}) {
    const W = 920, H = 440, cx = 300, cy = 236;
    let g = `<circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#7d858f" stroke-width="18"/><rect x="${cx - 130}" y="${cy + 30}" width="260" height="16" fill="#9aa3ad"/><ellipse cx="${cx}" cy="${cy + 14}" rx="90" ry="22" fill="#e8c4a4"/>`;
    g += `<rect x="${cx - 24}" y="${cy - 168}" width="48" height="30" rx="5" fill="#3d4654"/>` + T(cx, cy - 178, 'X-ray tube', { size: 12 });
    g += `<path d="M${cx} ${cy - 138}L${cx - 90} ${cy + 135}H${cx + 90}Z" fill="#b07cff" opacity=".18"/>`;
    for (let i = -5; i <= 5; i++) { const a = Math.PI / 2 + i * 0.1; g += `<rect x="${f(cx + 150 * Math.cos(a) - 6)}" y="${f(cy + 150 * Math.sin(a) - 6)}" width="12" height="12" fill="#3fb27f"/>`; }
    g += T(cx, cy + 186, 'detector array', { size: 12 }) + T(cx, cy + 202, 'the tube and detectors rotate together', { size: 12 });
    g += T(520, 140, 'thin fan-shaped X-ray beam', { size: 13, a: 'start' }) + T(520, 170, 'many images from different angles', { size: 13, a: 'start' }) + T(520, 200, 'a computer builds a 3D image', { size: 13, a: 'start' }) + T(520, 220, 'slice by slice', { size: 13, a: 'start' }) + T(520, 260, '+ shows soft tissue in detail', { size: 13, fill: '#3fb27f', a: 'start' }) + T(520, 282, '− higher dose than a single X-ray', { size: 13, fill: '#ef5b4c', a: 'start' });
    g += T(460, 30, 'Computerised axial tomography (CAT)', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'CAT scanner: rotating X-ray tube and detector ring around a patient', '', g);
  }

  function petScan(o = {}) {
    const W = 920, H = 400, cx = 300, cy = 210;
    let g = `<circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#3fb27f" stroke-width="16" stroke-dasharray="14 4"/><ellipse cx="${cx}" cy="${cy}" rx="80" ry="40" fill="#e8c4a4"/>`;
    g += `<circle cx="${cx + 20}" cy="${cy - 6}" r="6" fill="#ef5b4c"/>` + arrow(cx + 20, cy - 6, cx - 120, cy - 106, '#b07cff', 2.5) + arrow(cx + 20, cy - 6, cx + 160, cy + 94, '#b07cff', 2.5);
    g += T(cx - 128, cy - 112, 'γ', { size: 16, w: 700, fill: '#b07cff', a: 'end' }) + T(cx + 170, cy + 104, 'γ', { size: 16, w: 700, fill: '#b07cff', a: 'start' });
    g += T(470, 30, 'Positron emission tomography (PET)', { size: 15, w: 700 });
    ['tracer (e.g. fluorine-18 in glucose)', 'emits a positron β⁺', 'positron meets an electron: annihilation', 'two gamma photons, 511 keV each,', 'travel in opposite directions', 'detectors that fire at the same time', 'locate the source along a line'].forEach((t, i) => { g += T(520, 110 + i * 26, t, { size: 13, a: 'start' }); });
    g += T(520, 310, 'shows where cells are most active', { size: 13, w: 700, a: 'start' });
    return wrap(W, H, o.aria || 'PET scanner: positron annihilation producing two gamma photons detected by a ring', '', g);
  }

  function dopplerUS(o = {}) {
    const W = 920, H = 360;
    let g = `<rect x="80" y="200" width="560" height="70" fill="#c8705e" opacity=".55"/><path d="M80 200H640M80 270H640" stroke="#a83020" stroke-width="3"/>`;
    for (let i = 0; i < 8; i++) g += `<ellipse cx="${120 + i * 66}" cy="${235 + (i % 2 ? 10 : -8)}" rx="14" ry="8" fill="#e2483a"/>`;
    g += arrow(420, 300, 520, 300, '#e2483a', 3) + T(470, 322, 'blood flow, speed v', { size: 12 });
    g += `<g transform="rotate(35 300 110)"><rect x="270" y="40" width="60" height="90" rx="8" fill="#3d4654"/><rect x="276" y="126" width="48" height="10" fill="#e0a64a"/></g>`;
    g += `<path d="M330 150L392 235" stroke="#5aa9f0" stroke-width="2" stroke-dasharray="6 4"/><path d="M392 235H470" stroke="currentColor" stroke-dasharray="3 3"/><path d="M420 235A28 28 0 0 0 408 214" stroke="#e0a64a" stroke-width="2" fill="none"/>` + T(430, 222, 'θ', { size: 14, w: 700, fill: '#e0a64a' });
    g += T(470, 30, 'Doppler ultrasound: measuring the speed of blood', { size: 15, w: 700 });
    g += T(700, 120, 'reflected frequency changes', { size: 13, a: 'start' }).replace('x="700"', 'x="640"') + T(640, 146, 'Δf ÷ f = 2 v cos θ ÷ c', { size: 15, w: 700, a: 'start' }) + T(640, 172, 'c = speed of ultrasound', { size: 12, a: 'start' }) + T(640, 190, 'in tissue', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Doppler ultrasound probe at an angle to a blood vessel', '', g);
  }

  function attenuation(o = {}) {
    const W = 920, H = 380, x0 = 90, y0 = 320;
    let g = axes(x0, y0, 420, 250, 'Thickness x', 'Intensity I');
    g += `<path d="${curveP(t => Math.exp(-t * 1.2), x0, y0, 400, 230)}" stroke="#3f7fd6" stroke-width="3" fill="none"/><path d="${curveP(t => Math.exp(-t * 4.5), x0, y0, 400, 230)}" stroke="#ef5b4c" stroke-width="3" fill="none"/>`;
    g += T(x0 + 250, y0 - 130, 'soft tissue (small μ)', { size: 12, a: 'start', fill: '#3f7fd6' }) + T(x0 + 24, y0 - 12, 'bone (large μ)', { size: 12, a: 'start', fill: '#ef5b4c' }) + T(x0 - 6, y0 - 226, 'I₀', { size: 13, a: 'end' });
    g += T(700, 100, 'I = I₀ e^(−μx)', { size: 16, w: 700 }) + T(700, 126, 'μ = attenuation coefficient', { size: 12 });
    g += T(700, 180, 'Contrast media', { size: 14, w: 700 }) + T(700, 204, 'barium or iodine have a high', { size: 12 }) + T(700, 220, 'atomic number, so absorb X-rays', { size: 12 }) + T(700, 236, 'strongly: soft organs like the gut', { size: 12 }) + T(700, 252, 'and blood vessels show up', { size: 12 });
    g += T(460, 30, 'Attenuation of X-rays', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'Exponential attenuation of X-rays in soft tissue and bone, and contrast media', '', g);
  }

  function acousticImpedance(o = {}) {
    const W = 920, H = 360;
    let g = T(460, 30, 'Acoustic impedance and reflection', { size: 15, w: 700 }) + T(460, 54, 'Z = ρ c   (density × speed of sound)', { size: 14 });
    g += `<rect x="80" y="110" width="200" height="160" fill="#f4e3a0" opacity=".7"/><rect x="280" y="110" width="200" height="160" fill="#efece2" opacity=".85"/>` + T(180, 290, 'soft tissue', { size: 13 }) + T(380, 290, 'bone', { size: 13 });
    g += arrow(120, 160, 270, 190, '#3f7fd6', 3) + arrow(270, 196, 140, 236, '#3f7fd6', 2) + arrow(290, 192, 440, 222, '#3f7fd6', 1.6) + T(130, 150, 'incident', { size: 12, a: 'start', fill: '#1d2733' }) + T(150, 256, 'reflected', { size: 12, a: 'start', fill: '#1d2733' }) + T(470, 250, 'transmitted', { size: 12, a: 'end', fill: '#1d2733' });
    g += T(700, 120, 'fraction reflected', { size: 14, w: 700 }) + T(700, 150, 'I_r ÷ I₀ = (Z₂ − Z₁)² ÷ (Z₂ + Z₁)²', { size: 14 });
    g += T(700, 200, 'big difference in Z → most reflects', { size: 12 }) + T(700, 220, 'air–skin: almost 100%, so use gel', { size: 12, w: 700 }) + T(700, 240, 'gel has Z close to skin', { size: 12 });
    g += T(460, 336, 'reflections at boundaries between tissues build the ultrasound image', { size: 12 });
    return wrap(W, H, o.aria || 'Acoustic impedance and the fraction of ultrasound reflected at a boundary', '', g);
  }

  function freeBody(o = {}) {
    const W = 940, H = 380;
    let g = panelT(230, 'Book on a table', 'balanced: W = N') + panelT(700, 'Box on a rough slope', 'resolve along and at 90° to the slope');
    g += `<rect x="120" y="250" width="220" height="12" fill="${WOOD}"/><rect x="190" y="210" width="80" height="40" rx="4" fill="#3f7fd6"/>` + arrow(230, 230, 230, 330, '#ef5b4c', 3) + arrow(230, 230, 230, 130, '#3fb27f', 3) + T(244, 320, 'W = mg', { size: 13, w: 700, a: 'start', fill: '#ef5b4c' }) + T(244, 140, 'N (normal contact)', { size: 13, w: 700, a: 'start', fill: '#3fb27f' });
    g += `<path d="M520 320L880 320L880 160Z" fill="${WOOD}" opacity=".7"/><g transform="rotate(-24 700 240)"><rect x="660" y="200" width="80" height="44" rx="4" fill="#3f7fd6"/></g>`;
    g += arrow(700, 220, 700, 320, '#ef5b4c', 3) + T(712, 300, 'W', { size: 14, w: 700, a: 'start', fill: '#fff' }) + arrow(700, 220, 660, 130, '#3fb27f', 3) + T(650, 126, 'N', { size: 13, w: 700, a: 'end', fill: '#3fb27f' }) + arrow(700, 220, 790, 180, '#e0a64a', 3) + T(796, 176, 'F (friction)', { size: 13, w: 700, a: 'start', fill: '#e0a64a' });
    g += T(700, 356, 'along slope: mg sin θ = F;  at 90°: N = mg cos θ', { size: 13 }) + T(230, 356, 'draw forces from the centre of mass', { size: 12 });
    return wrap(W, H, o.aria || 'Free-body diagrams for a book on a table and a box on a rough slope', '', g);
  }

  function terminalVelocity(o = {}) {
    const W = 980, H = 390;
    const diver = (x, y, wl, dl, t) => `<circle cx="${x}" cy="${y}" r="12" fill="#e8c4a4"/><rect x="${x - 14}" y="${y + 12}" width="28" height="40" rx="8" fill="#ef8a3a"/>` + arrow(x, y + 56, x, y + 56 + wl, '#ef5b4c', 3) + (dl ? arrow(x, y - 16, x, y - 16 - dl, '#3fb27f', 3) : '') + T(x, y + 160, t, { size: 12 });
    let g = diver(90, 150, 70, 0, 'just jumped') + diver(210, 150, 70, 35, 'speeding up') + diver(330, 150, 70, 70, 'terminal velocity');
    g += T(210, 40, 'weight (red) and air resistance (green)', { size: 13, w: 700 }) + T(210, 354, 'drag increases with speed until', { size: 12 }) + T(210, 370, 'drag = weight: resultant force zero', { size: 12 });
    const x0 = 470, y0 = 330;
    g += axes(x0, y0, 440, 250, 'Time', 'Velocity');
    g += `<path d="${curveP(t => t < 0.45 ? 0.8 * (1 - Math.exp(-t * 7)) : t < 0.5 ? 0.8 - (t - 0.45) * 12 : 0.2 + 0.0 * t, x0, y0, 440, 250, 120)}" stroke="#3f7fd6" stroke-width="3" fill="none"/>`;
    g += T(x0 + 120, y0 - 216, 'terminal velocity', { size: 12 }) + T(x0 + 240, y0 - 150, 'parachute opens', { size: 12, a: 'start' }) + T(x0 + 330, y0 - 64, 'lower terminal velocity', { size: 12 });
    return wrap(W, H, o.aria || 'Forces on a skydiver and a velocity–time graph showing terminal velocity', '', g);
  }

  function centreOfMass(o = {}) {
    const W = 920, H = 380;
    let g = panelT(230, 'Finding the centre of mass', 'hang the shape from two points; draw the plumb lines') + panelT(690, 'Stability', 'topples when the line of action of weight passes outside the base');
    g += `<path d="M120 110L320 130L300 300L150 260Z" fill="#9fd4e6" opacity=".55" stroke="#5aa9f0" stroke-width="2"/><circle cx="125" cy="115" r="5" fill="currentColor"/><circle cx="315" cy="132" r="5" fill="currentColor"/>`;
    g += `<path d="M125 115L240 290" stroke="#ef5b4c" stroke-width="2" stroke-dasharray="6 4"/><path d="M315 132L170 240" stroke="#e0a64a" stroke-width="2" stroke-dasharray="6 4"/><circle cx="214" cy="225" r="7" fill="currentColor"/>` + T(222, 246, 'centre of mass', { size: 12, a: 'start' }) + T(230, 340, 'a plumb line hangs straight down through the pivot', { size: 12 });
    g += `<g transform="rotate(-20 560 300)"><rect x="560" y="160" width="80" height="140" fill="#3fb27f" opacity=".75"/></g><circle cx="574" cy="220" r="6" fill="currentColor"/>` + arrow(574, 220, 574, 318, '#ef5b4c', 2.5) + T(600, 340, 'stable: weight acts inside the base', { size: 12 });
    g += `<g transform="rotate(-42 790 300)"><rect x="790" y="160" width="80" height="140" fill="#ef5b4c" opacity=".7"/></g><circle cx="773" cy="221" r="6" fill="currentColor"/>` + arrow(773, 221, 773, 318, '#ef5b4c', 2.5) + T(800, 340, 'topples', { size: 12 });
    g += `<path d="M520 300H900" stroke="currentColor" stroke-width="2"/>`;
    return wrap(W, H, o.aria || 'Finding the centre of mass with plumb lines, and stability of a tilted block', '', g);
  }

  function triangleForces(o = {}) {
    const W = 920, H = 380;
    let g = panelT(250, 'Three forces in equilibrium', 'a sign hanging from two strings') + panelT(690, 'Triangle of forces', 'drawn tip to tail, the arrows close');
    g += `<path d="M80 80H420" stroke="#7d858f" stroke-width="8"/><path d="M120 84L250 200L390 84" stroke="#d6d9de" stroke-width="2.5" fill="none"/><rect x="200" y="200" width="100" height="60" rx="4" fill="#e0a64a"/>` + T(250, 236, 'SALE', { size: 14, w: 700, fill: '#1d2733' });
    g += arrow(250, 200, 180, 137, '#3f7fd6', 3) + arrow(250, 200, 330, 128, '#3fb27f', 3) + arrow(250, 230, 250, 320, '#ef5b4c', 3) + T(176, 162, 'T₁', { size: 14, w: 700, a: 'end', fill: '#3f7fd6' }) + T(338, 124, 'T₂', { size: 14, w: 700, a: 'start', fill: '#3fb27f' }) + T(262, 316, 'W', { size: 14, w: 700, a: 'start', fill: '#ef5b4c' });
    g += arrow(620, 120, 620, 300, '#ef5b4c', 3) + arrow(620, 300, 720, 210, '#3fb27f', 3) + arrow(720, 210, 620, 120, '#3f7fd6', 3) + T(608, 214, 'W', { size: 14, w: 700, a: 'end', fill: '#ef5b4c' }) + T(682, 274, 'T₂', { size: 14, w: 700, a: 'start', fill: '#3fb27f' }) + T(682, 152, 'T₁', { size: 14, w: 700, a: 'start', fill: '#3f7fd6' });
    g += T(690, 346, 'closed triangle → resultant force is zero', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'Three forces in equilibrium on a hanging sign and the closed triangle of forces', '', g);
  }

  function collisions(o = {}) {
    const W = 960, H = 380;
    const trolley = (x, c, m, v, dir) => `<rect x="${x - 40}" y="150" width="80" height="40" rx="6" fill="${c}"/><circle cx="${x - 24}" cy="196" r="8" fill="#22262e"/><circle cx="${x + 24}" cy="196" r="8" fill="#22262e"/>` + T(x, 175, m, { size: 13, w: 700, fill: '#fff' }) + (v ? arrow(x, 130, x + dir * 60, 130, 'currentColor', 2.5) + T(x + dir * 30, 120, v, { size: 12 }) : T(x, 125, 'at rest', { size: 12 }));
    let g = T(230, 40, 'Before', { size: 15, w: 700 }) + T(700, 40, 'After (they stick together)', { size: 15, w: 700 });
    g += trolley(150, '#3f7fd6', '2 kg', '3 m/s', 1) + trolley(320, '#ef5b4c', '1 kg', '', 0) + `<path d="M60 206H420M520 206H900" stroke="currentColor" stroke-width="2"/>`;
    g += `<rect x="610" y="150" width="160" height="40" rx="6" fill="#9b7ad6"/><circle cx="634" cy="196" r="8" fill="#22262e"/><circle cx="746" cy="196" r="8" fill="#22262e"/>` + T(690, 175, '3 kg', { size: 13, w: 700, fill: '#fff' }) + arrow(690, 130, 760, 130, 'currentColor', 2.5) + T(725, 120, '2 m/s', { size: 12 });
    g += T(230, 250, 'momentum = 2 × 3 + 1 × 0 = 6 kg m/s', { size: 13 }) + T(700, 250, 'momentum = 3 × 2 = 6 kg m/s', { size: 13 });
    g += T(480, 300, 'p = m v.  In a closed system the total momentum before = total momentum after', { size: 14, w: 700 }) + T(480, 326, 'Explosions: total momentum before is zero, so the parts move apart with equal and opposite momentum', { size: 12 });
    g += T(480, 350, 'kinetic energy is conserved only in an elastic collision', { size: 12 });
    return wrap(W, H, o.aria || 'Conservation of momentum when two trolleys collide and stick together', '', g);
  }

  function forceTime(o = {}) {
    const W = 920, H = 360, x0 = 90, y0 = 300;
    let g = axes(x0, y0, 420, 230, 'Time t', 'Force F');
    g += `<path d="${curveP(t => Math.sin(Math.PI * Math.min(1, t * 3.3)) * (t < 0.3 ? 1 : 0), x0, y0, 420, 210)}" stroke="#ef5b4c" stroke-width="3" fill="#ef5b4c" fill-opacity=".15"/><path d="${curveP(t => 0.42 * Math.sin(Math.PI * Math.min(1, t * 1.25)) * (t < 0.8 ? 1 : 0), x0, y0, 420, 210)}" stroke="#3fb27f" stroke-width="3" fill="#3fb27f" fill-opacity=".15"/>`;
    g += T(x0 + 90, y0 - 196, 'hard stop: big force, short time', { size: 12, fill: '#ef5b4c', a: 'start' }) + T(x0 + 200, y0 - 104, 'crumple zone or airbag: smaller force,', { size: 12, fill: '#3fb27f', a: 'start' }) + T(x0 + 200, y0 - 88, 'longer time, same area', { size: 12, fill: '#3fb27f', a: 'start' });
    g += T(700, 120, 'impulse = F Δt = Δp', { size: 16, w: 700 }) + T(700, 150, 'area under the F–t graph', { size: 13 }) + T(700, 170, '= change in momentum', { size: 13 }) + T(700, 220, 'F = Δp ÷ Δt', { size: 15, w: 700 }) + T(700, 244, 'longer time → smaller force', { size: 12 });
    g += T(460, 30, 'Impulse and force–time graphs', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'Force–time graphs: the area is the impulse, and a longer impact time reduces the force', '', g);
  }

  function hrDiagram(o = {}) {
    const W = 900, H = 440, x0 = 110, y0 = 380, w = 620, h = 320;
    let g = `<rect x="${x0}" y="${y0 - h}" width="${w}" height="${h}" fill="#0c1020" stroke="currentColor"/>`;
    g += T(x0 + w / 2, y0 + 28, 'Temperature (K):  hot ← → cool', { size: 13 }) + T(x0 - 50, y0 - h / 2, 'Luminosity', { size: 13 }).replace('<text', `<text transform="rotate(-90 ${x0 - 50} ${y0 - h / 2})"`);
    ['40 000', '10 000', '6 000', '3 000'].forEach((t, i) => { g += T(x0 + 20 + i * 190, y0 + 46, t, { size: 11 }); });
    const rnd = S._rnd(9);
    for (let i = 0; i < 70; i++) { const t = rnd(); const x = x0 + 30 + t * (w - 60), y = y0 - h + 30 + t * (h - 60) + (rnd() - 0.5) * 30; const c = t < 0.3 ? '#9fc6ff' : t < 0.55 ? '#ffffff' : t < 0.75 ? '#ffe680' : '#ff9a5a'; g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(6 - t * 3)}" fill="${c}"/>`; }
    for (let i = 0; i < 14; i++) g += `<circle cx="${f(x0 + 420 + rnd() * 160)}" cy="${f(y0 - h + 50 + rnd() * 80)}" r="${f(6 + rnd() * 6)}" fill="#ff8a4a"/>`;
    for (let i = 0; i < 12; i++) g += `<circle cx="${f(x0 + 60 + rnd() * 160)}" cy="${f(y0 - 50 - rnd() * 50)}" r="3" fill="#dfe8ff"/>`;
    g += `<circle cx="${x0 + 360}" cy="${y0 - 170}" r="8" fill="#ffe680" stroke="#fff" stroke-width="2"/>` + T(x0 + 374, y0 - 166, 'the Sun', { size: 12, a: 'start', fill: '#e8ecf5' });
    g += T(x0 + 200, y0 - 180, 'main sequence', { size: 13, w: 700, a: 'start', fill: '#e8ecf5' }).replace('<text', `<text transform="rotate(34 ${x0 + 200} ${y0 - 180})"`) + T(x0 + 500, y0 - h + 34, 'red giants and supergiants', { size: 12, fill: '#e8ecf5' }) + T(x0 + 140, y0 - 20, 'white dwarfs', { size: 12, fill: '#e8ecf5' });
    g += T(450, 30, 'Hertzsprung–Russell diagram', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'Hertzsprung–Russell diagram with the main sequence, giants and white dwarfs', '', g);
  }

  function lineSpectra(o = {}) {
    const W = 960, H = 420;
    let g = panelT(220, 'Energy levels', 'electrons jump down and emit a photon') + panelT(690, 'Spectra', 'each element has its own pattern of lines');
    [[-13.6, 360, 'n = 1'], [-3.4, 220, 'n = 2'], [-1.5, 170, 'n = 3'], [-0.85, 145, 'n = 4'], [0, 100, '∞']].forEach(([e, y, n]) => { g += `<path d="M90 ${y}H330" stroke="currentColor" stroke-width="2"/>` + T(80, y + 4, n, { size: 12, a: 'end' }) + T(340, y + 4, `${e} eV`, { size: 12, a: 'start' }); });
    g += arrow(150, 170, 150, 216, '#ef5b4c', 2.5) + arrow(200, 145, 200, 216, '#3fb27f', 2.5) + arrow(260, 220, 260, 356, '#b07cff', 2.5) + T(250, 300, 'UV', { size: 11, a: 'end' });
    g += T(220, 400, 'photon energy hf = E₁ − E₂', { size: 14, w: 700 });
    const strip = (y, emis, lab) => { let s = `<rect x="490" y="${y}" width="400" height="44" fill="${emis ? '#05070c' : 'url(#lsg)'}"/>`; [[656, '#ef3030'], [486, '#30c8c8'], [434, '#4a50ff'], [410, '#8a3aff']].forEach(([l, c]) => { const x = 490 + (700 - l) / 320 * 400; s += `<rect x="${f(x)}" y="${y}" width="4" height="44" fill="${emis ? c : '#05070c'}"/>`; }); return s + T(690, y + 64, lab, { size: 12 }); };
    g += `<defs><linearGradient id="lsg"><stop offset="0" stop-color="#ff2a2a"/><stop offset=".25" stop-color="#ffd02a"/><stop offset=".45" stop-color="#3ad04a"/><stop offset=".7" stop-color="#2a8aff"/><stop offset="1" stop-color="#8a2aff"/></linearGradient></defs>`;
    g += strip(110, true, 'emission: bright lines on a dark background') + strip(220, false, 'absorption: dark lines in a continuous spectrum');
    g += T(690, 340, 'hydrogen lines at the same wavelengths in both', { size: 12 }) + T(690, 358, 'λ = h c ÷ ΔE', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Hydrogen energy levels with transitions, and emission and absorption line spectra', '', g);
  }

  function blackBody(o = {}) {
    const W = 920, H = 380, x0 = 90, y0 = 320;
    let g = axes(x0, y0, 480, 250, 'Wavelength λ', 'Intensity');
    const pl = (T0, c) => `<path d="${curveP(t => { const l = Math.max(0.02, t * 1.4); return (1 / l ** 5) / (Math.exp(1.0 / (l * T0)) - 1) / 1.7; }, x0, y0, 480, 230, 140)}" stroke="${c}" stroke-width="3" fill="none"/>`;
    g += pl(0.6, '#5aa9ff') + pl(0.45, '#f5f0d0') + pl(0.35, '#ef8a3a') + T(x0 + 130, y0 - 236, '6000 K', { size: 12, a: 'start', fill: '#5aa9ff' }) + T(x0 + 160, y0 - 64, '4500 K', { size: 12, a: 'start' }) + T(x0 + 210, y0 - 24, '3500 K', { size: 12, a: 'start', fill: '#ef8a3a' });
    g += `<rect x="${x0 + 130}" y="${y0 - 250}" width="110" height="250" fill="url(#bbv)" opacity=".18"/><defs><linearGradient id="bbv"><stop offset="0" stop-color="#8a2aff"/><stop offset=".5" stop-color="#3ad04a"/><stop offset="1" stop-color="#ff2a2a"/></linearGradient></defs>` + T(x0 + 185, y0 + 18, 'visible', { size: 11 });
    g += T(720, 100, 'hotter star:', { size: 14, w: 700 }) + T(720, 124, 'peak moves to shorter λ (bluer)', { size: 12 }) + T(720, 142, 'much more energy at every λ', { size: 12 });
    g += T(720, 190, 'Wien: λ_max T = 2.9 × 10⁻³ m K', { size: 13, w: 700 }) + T(720, 220, 'Stefan: L = 4π r² σ T⁴', { size: 13, w: 700 });
    g += T(460, 30, 'Black-body radiation curves', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'Black-body curves for three temperatures with Wien’s and Stefan’s laws', '', g);
  }

  function redshiftHubble(o = {}) {
    const W = 960, H = 400;
    let g = panelT(240, 'Redshift', 'lines from distant galaxies move to longer wavelengths') + panelT(710, "Hubble's law", 'v = H₀ d');
    g += `<defs><linearGradient id="rsg"><stop offset="0" stop-color="#8a2aff"/><stop offset=".3" stop-color="#2a8aff"/><stop offset=".55" stop-color="#3ad04a"/><stop offset=".75" stop-color="#ffd02a"/><stop offset="1" stop-color="#ff2a2a"/></linearGradient></defs>`;
    const st = (y, sh, lab) => `<rect x="60" y="${y}" width="360" height="40" fill="url(#rsg)"/>` + [80, 150, 250].map(x => `<rect x="${60 + x + sh}" y="${y}" width="4" height="40" fill="#05070c"/>`).join('') + T(240, y + 58, lab, { size: 12 });
    g += st(100, 0, 'lab (or the Sun)') + st(200, 50, 'distant galaxy: shifted towards red') + T(240, 320, 'z = Δλ ÷ λ ≈ v ÷ c', { size: 15, w: 700 });
    const x0 = 520, y0 = 340;
    g += axes(x0, y0, 380, 230, 'Distance d (Mpc)', 'Recession velocity v');
    const rnd = S._rnd(4); for (let i = 1; i <= 12; i++) { const x = i * 28, y = x * 0.6 + (rnd() - 0.5) * 30; g += `<circle cx="${f(x0 + x)}" cy="${f(y0 - y)}" r="4" fill="#3f7fd6"/>`; }
    g += `<path d="M${x0} ${y0}L${x0 + 360} ${y0 - 216}" stroke="#ef5b4c" stroke-width="2.5"/>` + T(x0 + 210, y0 - 160, 'gradient = H₀', { size: 13, a: 'end', fill: '#ef5b4c' }) + T(710, 390, 'age of the universe ≈ 1 ÷ H₀; evidence for the Big Bang', { size: 12 });
    return wrap(W, H, o.aria || 'Redshift of spectral lines and the Hubble’s law graph of velocity against distance', '', g);
  }

  function fieldLines(o = {}) {
    const W = 960, H = 430;
    let g = panelT(240, 'Radial field', 'around a positive point charge') + panelT(720, 'Uniform field', 'between parallel plates (or near Earth’s surface)');
    g += `<circle cx="240" cy="220" r="22" fill="#ef5b4c"/>` + T(240, 228, '+', { size: 20, w: 700, fill: '#fff' });
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; g += arrow(240 + 28 * Math.cos(a), 220 + 28 * Math.sin(a), 240 + 140 * Math.cos(a), 220 + 140 * Math.sin(a), '#e0a64a', 2, 9); }
    [60, 95, 130].forEach(r => { g += `<circle cx="240" cy="220" r="${r}" fill="none" stroke="#5aa9f0" stroke-width="1.4" stroke-dasharray="5 5"/>`; });
    g += T(240, 384, 'lines spread out: field gets weaker, E ∝ 1/r²', { size: 12 }) + T(240, 400, 'arrows point inwards for a negative charge or a planet', { size: 12 });
    g += `<rect x="560" y="110" width="320" height="12" fill="#ef5b4c"/><rect x="560" y="320" width="320" height="12" fill="#3f7fd6"/>` + T(550, 120, '+', { size: 18, w: 700, a: 'end' }) + T(550, 332, '−', { size: 18, w: 700, a: 'end' });
    for (let i = 0; i < 7; i++) g += arrow(580 + i * 48, 124, 580 + i * 48, 316, '#e0a64a', 2, 9);
    [170, 220, 270].forEach(y => { g += `<path d="M560 ${y}H880" stroke="#5aa9f0" stroke-width="1.4" stroke-dasharray="5 5"/>`; });
    g += T(720, 384, 'equally spaced: same strength everywhere, E = V ÷ d', { size: 12 }) + T(480, 418, 'solid: field lines;  dashed: equipotentials (always at 90° to field lines)', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'Radial and uniform field lines with equipotentials', '', g).replace(T(240, 60, 'around a positive point charge', { size: 12 }), T(240, 76, 'around a positive point charge', { size: 12 }));
  }

  function potentialGraph(o = {}) {
    const W = 920, H = 400, x0 = 110, y0 = 80;
    let g = `<path d="M${x0} 60V340M${x0} ${y0}H${x0 + 480}" stroke="currentColor" stroke-width="2.5"/>` + arrow(x0 + 470, y0, x0 + 490, y0, 'currentColor', 2.5, 10) + T(x0 + 470, y0 - 12, 'distance r', { size: 13, a: 'end' }) + T(x0 - 8, 70, '0', { size: 12, a: 'end' }) + T(x0 - 14, 200, 'V_g', { size: 14, w: 700, a: 'end' });
    { let d = ''; for (let i = 0; i <= 80; i++) { const x = x0 + 40 + i * 5.5; d += (i ? 'L' : 'M') + f(x) + ' ' + f(y0 + 250 * 40 / (x - x0)); } g += `<path d="${d}" stroke="#3f7fd6" stroke-width="3" fill="none"/><path d="M${x0 + 40} ${y0}V${y0 + 260}" stroke="#e0a64a" stroke-dasharray="4 4"/>`; }
    g += `<circle cx="${x0}" cy="${y0 + 250}" r="0" fill="none"/>` + T(x0 + 46, 348, 'surface of the planet (r = R)', { size: 12, a: 'start', fill: '#e0a64a' });
    g += T(720, 110, 'V_g = −G M ÷ r', { size: 16, w: 700 }) + T(720, 136, 'zero at infinity, negative nearer', { size: 12 }) + T(720, 154, 'the mass', { size: 12 }) + T(720, 200, 'g = −(gradient of V against r)', { size: 13 }) + T(720, 240, 'escape velocity:', { size: 13, w: 700 }) + T(720, 260, '½ m v² = G M m ÷ r → v = √(2GM ÷ r)', { size: 12 });
    g += T(460, 30, 'Gravitational potential', { size: 15, w: 700 }) + T(460, 388, 'electric potential around a positive charge has the same shape but is positive: V = Q ÷ 4πε₀r', { size: 12 });
    return wrap(W, H, o.aria || 'Graph of gravitational potential against distance, rising towards zero at infinity', '', g);
  }

  function induction(o = {}) {
    const W = 940, H = 380;
    let g = `<rect x="110" y="170" width="160" height="50" rx="6" fill="#ef5b4c"/><rect x="190" y="170" width="80" height="50" fill="#3f7fd6"/>` + T(150, 202, 'N', { size: 18, w: 700, fill: '#fff' }) + T(230, 202, 'S', { size: 18, w: 700, fill: '#fff' }) + arrow(130, 150, 250, 150, 'currentColor', 2.5) + T(190, 140, 'push the magnet in', { size: 12 });
    for (let i = 0; i < 9; i++) g += `<ellipse cx="${330 + i * 22}" cy="195" rx="10" ry="46" fill="none" stroke="#d9822b" stroke-width="4"/>`;
    g += wire('M330 241V300H420M480 300H516V241') + `<circle cx="450" cy="300" r="26" fill="var(--panel,#121a33)" stroke="currentColor" stroke-width="2.5"/><path d="M450 300L462 282" stroke="#ef5b4c" stroke-width="2.5"/>` + T(450, 346, 'sensitive ammeter (galvanometer)', { size: 12 });
    g += T(470, 40, 'Electromagnetic induction', { size: 16, w: 700 }) + T(470, 62, 'a changing magnetic field through a coil induces a p.d.', { size: 13 });
    ['magnet still: no current', 'move faster, use a stronger magnet', 'or more turns: bigger p.d.', 'pull it out: the current reverses'].forEach((t, i) => { g += T(620, 130 + i * 24, t, { size: 13, a: 'start' }); });
    g += T(620, 240, "Faraday: ε = −N ΔΦ ÷ Δt", { size: 14, w: 700, a: 'start' }) + T(620, 266, 'Lenz: the induced current opposes', { size: 12, a: 'start' }) + T(620, 282, 'the change that made it', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Moving a magnet into a coil induces a current shown on a galvanometer', '', g);
  }

  function bindingEnergy(o = {}) {
    const W = 920, H = 380, x0 = 90, y0 = 330;
    let g = axes(x0, y0, 520, 260, 'Nucleon number A', 'Binding energy per nucleon (MeV)');
    g += `<path d="M${x0 + 4} ${y0 - 40}Q${x0 + 20} ${y0 - 210} ${x0 + 80} ${y0 - 230}Q${x0 + 120} ${y0 - 236} ${x0 + 200} ${y0 - 226}L${x0 + 500} ${y0 - 190}" stroke="#3f7fd6" stroke-width="3" fill="none"/><circle cx="${x0 + 82}" cy="${y0 - 232}" r="6" fill="#e0a64a"/>` + T(x0 + 92, y0 - 242, 'iron-56: most stable', { size: 12, a: 'start', fill: '#e0a64a' });
    g += arrow(x0 + 14, y0 - 120, x0 + 50, y0 - 200, '#3fb27f', 2.5) + T(x0 + 26, y0 - 100, 'fusion', { size: 12, w: 700, fill: '#3fb27f', a: 'start' }) + arrow(x0 + 480, y0 - 160, x0 + 330, y0 - 186, '#ef5b4c', 2.5) + T(x0 + 420, y0 - 140, 'fission', { size: 12, w: 700, fill: '#ef5b4c' });
    g += T(760, 110, 'mass defect Δm:', { size: 13, w: 700 }) + T(760, 130, 'nucleus has less mass than', { size: 12 }) + T(760, 146, 'its separate nucleons', { size: 12 }) + T(760, 186, 'binding energy = Δm c²', { size: 14, w: 700 }) + T(760, 220, 'moving towards iron releases', { size: 12 }) + T(760, 236, 'energy', { size: 12 });
    return wrap(W, H, o.aria || 'Binding energy per nucleon against nucleon number with iron-56 at the peak', '', g);
  }

  function decayCurve(o = {}) {
    const W = 960, H = 380;
    let g = panelT(250, 'Exponential decay', 'N = N₀ e^(−λt)') + panelT(720, 'Log graph', 'ln N = ln N₀ − λ t: a straight line');
    g += axes(60, 320, 380, 230, 'Time', 'N');
    g += `<path d="${curveP(t => Math.exp(-t * 2.77), 60, 320, 380, 220)}" stroke="#3f7fd6" stroke-width="3" fill="none"/>`;
    [[0, 1], [1, 0.5], [2, 0.25], [3, 0.125]].forEach(([k, v]) => { if (k) g += `<path d="M60 ${f(320 - v * 220)}H${f(60 + k * 95)}V320" stroke="currentColor" stroke-dasharray="4 4" fill="none" opacity=".6"/>` + T(60 + k * 95, 338, `${k}T½`, { size: 11 }); });
    g += T(52, 104, 'N₀', { size: 12, a: 'end' }) + T(52, 214, 'N₀/2', { size: 12, a: 'end' });
    g += axes(560, 320, 360, 230, 'Time', 'ln N');
    g += `<path d="M560 110L900 300" stroke="#3f7fd6" stroke-width="3"/>` + T(760, 190, 'gradient = −λ', { size: 13, w: 700, a: 'start' });
    g += T(480, 370, 'activity A = λ N;   half-life T½ = ln 2 ÷ λ', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Exponential decay curve with half-lives and the straight-line log graph', '', g);
  }

  function fusionFig(o = {}) {
    const W = 920, H = 340;
    const nuc = (x, y, p, n) => { let s = ''; const tot = p + n; for (let i = 0; i < tot; i++) { const a = i * 2.4, r = 9 * Math.sqrt(i); s += `<circle cx="${f(x + r * Math.cos(a))}" cy="${f(y + r * Math.sin(a))}" r="9" fill="${i < p ? '#ef5b4c' : '#9aa3ad'}" stroke="#222" stroke-width=".6"/>`; } return s; };
    let g = nuc(110, 170, 1, 1) + T(110, 230, 'deuterium ²H', { size: 12 }) + T(190, 176, '+', { size: 22, w: 700 }) + nuc(270, 170, 1, 2) + T(270, 230, 'tritium ³H', { size: 12 }) + arrow(340, 170, 430, 170, 'currentColor', 3);
    g += nuc(510, 170, 2, 2) + T(510, 230, 'helium ⁴He', { size: 12 }) + T(580, 176, '+', { size: 22, w: 700 }) + nuc(640, 170, 0, 1) + T(640, 230, 'neutron', { size: 12 }) + T(720, 176, '+ 17.6 MeV', { size: 16, w: 700, a: 'start', fill: '#e0a64a' });
    g += T(460, 40, 'Nuclear fusion: light nuclei join to make a heavier nucleus', { size: 15, w: 700 });
    g += T(460, 280, 'needs a very high temperature and density to overcome the electrostatic repulsion', { size: 12 }) + T(460, 300, 'the mass of the products is less than the mass of the reactants: energy = Δm c²', { size: 12 });
    return wrap(W, H, o.aria || 'Fusion of deuterium and tritium into helium and a neutron', '', g);
  }

  function waveDiffraction(o = {}) {
    const W = 940, H = 360;
    let g = panelT(240, 'Gap about the same as λ', 'lots of spreading') + panelT(700, 'Gap much wider than λ', 'little spreading');
    const set = (cx, gap, spread) => { let s = `<path d="M${cx} 100V${200 - gap / 2}M${cx} ${200 + gap / 2}V300" stroke="currentColor" stroke-width="6"/>`; for (let i = 0; i < 5; i++) s += `<path d="M${cx - 150 + i * 26} 110V290" stroke="#5aa9f0" stroke-width="2"/>`; for (let i = 1; i <= 5; i++) { const r = i * 26; s += spread ? `<path d="M${cx + 4} ${200 - r}A${r} ${r} 0 0 1 ${cx + 4} ${200 + r}" stroke="#5aa9f0" stroke-width="2" fill="none"/>` : `<path d="M${cx + r} ${200 - gap / 2 - 6}Q${cx + r + 10} 200 ${cx + r} ${200 + gap / 2 + 6}" stroke="#5aa9f0" stroke-width="2" fill="none"/>`; } return s; };
    g += set(240, 30, true) + set(700, 140, false);
    g += T(470, 340, 'diffraction is most noticeable when the gap is similar to the wavelength', { size: 12 });
    return wrap(W, H, o.aria || 'Waves diffracting through a narrow gap and a wide gap', '', g);
  }

  function electronDiffraction(o = {}) {
    const W = 940, H = 390;
    let g = `<path d="M100 180Q100 120 160 120H520Q640 120 700 60V300Q640 240 520 240H160Q100 240 100 180Z" fill="#e8f3f8" fill-opacity=".08" stroke="${GL}" stroke-width="3"/>`;
    g += `<path d="M130 170q6 -10 12 0t12 0" stroke="#ffb03a" stroke-width="3" fill="none"/><rect x="200" y="160" width="10" height="40" fill="#9aa3ad"/><rect x="420" y="150" width="6" height="60" fill="#e8c35a"/>` + arrow(160, 180, 410, 180, '#5aa9f0', 2, 9);
    [20, 40, 60].forEach((r, i) => { g += `<ellipse cx="700" cy="180" rx="${r * 0.3}" ry="${r + 10}" fill="none" stroke="#3fd08a" stroke-width="${3 - i * 0.6}"/>`; });
    g += T(150, 230, 'heated cathode', { size: 12 }) + T(205, 150, 'anode', { size: 12 }) + T(423, 140, 'graphite film', { size: 12 }) + T(700, 322, 'rings on a fluorescent screen', { size: 12 });
    g += T(470, 30, 'Electron diffraction: evidence that electrons behave as waves', { size: 15, w: 700 });
    g += T(400, 352, 'de Broglie wavelength λ = h ÷ p = h ÷ m v', { size: 14, w: 700 }) + T(400, 374, 'higher accelerating voltage → faster electrons → smaller λ → smaller rings', { size: 12 });
    return wrap(W, H, o.aria || 'Electron diffraction tube producing rings on a screen', '', g);
  }

  function boltzmannCurve(o = {}) {
    const W = 900, H = 380, x0 = 90, y0 = 300;
    let g = axes(x0, y0, 520, 230, 'Molecular speed (or energy)', 'Number of molecules');
    const mb = (a, s) => curveP(t => s * (t * a) ** 2 * Math.exp(-((t * a) ** 2)) * 2.7, x0, y0, 500, 200, 120);
    g += `<path d="${mb(3, 1)}" stroke="#3f7fd6" stroke-width="3" fill="none"/><path d="${mb(2, 0.68)}" stroke="#ef5b4c" stroke-width="3" fill="none"/>`;
    g += T(x0 + 175, y0 - 206, 'lower T', { size: 12, fill: '#3f7fd6', a: 'start' }) + T(x0 + 262, y0 - 178, 'higher T: flatter, peak to the right', { size: 12, fill: '#ef5b4c', a: 'start' });
    g += `<path d="M${x0 + 380} ${y0}V${y0 - 150}" stroke="#e0a64a" stroke-width="2" stroke-dasharray="5 4"/>` + T(x0 + 384, y0 - 156, 'E_a', { size: 13, w: 700, fill: '#e0a64a', a: 'start' });
    g += T(450, 30, 'Maxwell–Boltzmann distribution', { size: 15, w: 700 }) + T(450, 368, 'area under each curve = total number of molecules (the same); more molecules above E_a when hotter', { size: 12 });
    return wrap(W, H, o.aria || 'Maxwell–Boltzmann distributions at two temperatures with the activation energy marked', '', g);
  }

  function circularMotion(o = {}) {
    const W = 900, H = 380, cx = 260, cy = 200, R = 130;
    let g = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="currentColor" stroke-dasharray="5 6" opacity=".6"/><circle cx="${cx}" cy="${cy}" r="5" fill="currentColor"/>`;
    const a = -0.7, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    g += `<path d="M${cx} ${cy}L${f(x)} ${f(y)}" stroke="#d6d9de" stroke-width="2"/><circle cx="${f(x)}" cy="${f(y)}" r="14" fill="#9aa3ad"/>`;
    g += arrow(x, y, x + 90 * Math.sin(-a), y + 90 * Math.cos(a), '#3fb27f', 3) + arrow(x, y, x - 70 * Math.cos(a), y - 70 * Math.sin(a), '#ef5b4c', 3);
    g += T(x + 70, y + 70, 'v (tangent)', { size: 13, w: 700, fill: '#3fb27f', a: 'start' }) + T(cx + 44, cy - 54, 'F (to centre)', { size: 13, w: 700, fill: '#ef5b4c', a: 'end' }) + `<path d="M${cx + 40} ${cy}A40 40 0 0 0 ${f(cx + 40 * Math.cos(a))} ${f(cy + 40 * Math.sin(a))}" stroke="#e0a64a" stroke-width="2" fill="none"/>` + T(cx + 50, cy - 8, 'θ', { size: 13, fill: '#e0a64a', a: 'start' });
    g += T(640, 90, 'ω = θ ÷ t = 2π ÷ T = 2π f', { size: 14, w: 700 }) + T(640, 120, 'v = ω r', { size: 14 }) + T(640, 160, 'a = v² ÷ r = ω² r', { size: 14, w: 700 }) + T(640, 190, 'F = m v² ÷ r', { size: 14, w: 700 }) + T(640, 240, 'speed constant, direction changes:', { size: 12 }) + T(640, 258, 'it accelerates towards the centre', { size: 12 });
    g += T(450, 30, 'Circular motion', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'An object in circular motion with velocity along the tangent and force towards the centre', '', g);
  }

  /* GCSE physics extras */
  function decayEquations(o = {}) {
    const W = 940, H = 340;
    let g = T(470, 32, 'Nuclear equations', { size: 15, w: 700 }) + T(470, 54, 'mass numbers and atomic numbers must balance on both sides', { size: 13 });
    g += T(470, 120, '²³⁸₉₂U  →  ²³⁴₉₀Th  +  ⁴₂He', { size: 20, w: 700 }) + T(470, 146, 'alpha decay: mass number −4, atomic number −2', { size: 13, fill: '#ef5b4c' });
    g += T(470, 210, '¹⁴₆C  →  ¹⁴₇N  +  ⁰₋₁e', { size: 20, w: 700 }) + T(470, 236, 'beta decay: a neutron becomes a proton; mass number same, atomic number +1', { size: 13, fill: '#3f7fd6' });
    g += T(470, 296, 'gamma: no change to mass or atomic number (energy given out)', { size: 13, fill: '#b07cff' });
    return wrap(W, H, o.aria || 'Balanced nuclear equations for alpha and beta decay', '', g);
  }
  function contamination(o = {}) {
    const W = 920, H = 340;
    let g = panelT(230, 'Irradiation', 'exposed to radiation from outside') + panelT(690, 'Contamination', 'radioactive atoms get onto or into the body');
    g += `<circle cx="300" cy="190" r="34" fill="#e8c4a4"/><rect x="276" y="224" width="48" height="70" rx="12" fill="#3f7fd6"/><rect x="90" y="170" width="50" height="40" fill="#6b7480"/>` + [0, 1, 2].map(i => wavy(146, 180 + i * 12, 256, 190 + i * 12, '#b07cff', 2)).join('') + T(230, 320, 'stops when the source is removed; the person is not radioactive', { size: 12 });
    g += `<circle cx="690" cy="190" r="34" fill="#e8c4a4"/><rect x="666" y="224" width="48" height="70" rx="12" fill="#3f7fd6"/>` + [[680, 250], [700, 270], [690, 190], [676, 180]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#9bff5a"/>`).join('') + T(690, 320, 'continues until the material is removed or decays', { size: 12 });
    return wrap(W, H, o.aria || 'Irradiation compared with contamination by radioactive material', '', g);
  }
  function vectorsFig(o = {}) {
    const W = 920, H = 340;
    let g = panelT(230, 'Scalars', 'size only') + panelT(690, 'Vectors', 'size and direction: drawn as arrows');
    ['distance  20 m', 'speed  5 m/s', 'mass  60 kg', 'energy  300 J', 'time  4 s'].forEach((t, i) => { g += T(230, 110 + i * 30, t, { size: 14 }); });
    g += arrow(560, 120, 700, 120, '#3f7fd6', 3) + T(630, 110, 'displacement 20 m east', { size: 12 }) + arrow(560, 180, 760, 180, '#3fb27f', 4) + T(660, 170, 'velocity 5 m/s right', { size: 12 }) + arrow(560, 240, 620, 240, '#ef5b4c', 3) + T(600, 230, 'force 10 N', { size: 12 }) + arrow(760, 210, 760, 300, '#e0a64a', 3) + T(774, 260, 'weight', { size: 12, a: 'start' });
    g += T(690, 324, 'longer arrow = bigger value', { size: 12 }).replace('y="324"', 'y="330"');
    return wrap(W, H, o.aria || 'Scalar quantities compared with vector quantities drawn as arrows', '', g);
  }
  function colourFilters(o = {}) {
    const W = 940, H = 340;
    let g = panelT(240, 'White light through a prism', 'splits into a spectrum') + panelT(700, 'Coloured filters and objects', 'absorb some colours, let others through');
    g += `<path d="M190 260L260 120L330 260Z" fill="#e8f3f8" fill-opacity=".2" stroke="${GL}" stroke-width="2.5"/><path d="M60 200L230 186" stroke="#fff" stroke-width="4"/>`;
    ['#ff2a2a', '#ff8a2a', '#ffe02a', '#3ad04a', '#2a8aff', '#5a3aff', '#8a2aff'].forEach((c, i) => { g += `<path d="M290 196L440 ${150 + i * 18}" stroke="${c}" stroke-width="3"/>`; });
    g += `<path d="M520 200H620" stroke="#fff" stroke-width="5"/><rect x="620" y="150" width="20" height="100" fill="#ef3030" opacity=".8"/><path d="M640 200H760" stroke="#ff2a2a" stroke-width="5"/>` + T(630, 280, 'red filter: only red passes', { size: 12 });
    g += `<circle cx="830" cy="200" r="30" fill="#ef3030"/>` + T(830, 270, 'red object: reflects red,', { size: 12 }) + T(830, 286, 'absorbs other colours', { size: 12 });
    g += T(470, 324, 'opaque objects reflect some colours; white reflects all; black absorbs all', { size: 12 });
    return wrap(W, H, o.aria || 'A prism splitting white light, and how filters and coloured objects work', '', g);
  }
  function keGpe(o = {}) {
    const W = 940, H = 360;
    let g = T(470, 32, 'Kinetic and gravitational potential energy', { size: 15, w: 700 });
    g += `<path d="M60 100Q200 100 300 300Q360 360 420 300Q520 150 640 260" stroke="#7d858f" stroke-width="6" fill="none"/>`;
    g += `<rect x="80" y="76" width="40" height="22" rx="5" fill="#ef5b4c"/>` + T(100, 66, 'top: most GPE, least KE', { size: 12 }) + `<rect x="340" y="316" width="40" height="22" rx="5" fill="#ef5b4c"/>` + T(360, 360, 'bottom: most KE', { size: 12 }).replace('y="360"', 'y="352"');
    g += T(800, 120, 'E_k = ½ m v²', { size: 15, w: 700 }) + T(800, 160, 'E_p = m g h', { size: 15, w: 700 }) + T(800, 210, 'as it falls:', { size: 13 }) + T(800, 228, 'GPE lost = KE gained', { size: 13, w: 700 }) + T(800, 246, '(if no energy is wasted)', { size: 12 });
    return wrap(W, H, o.aria || 'A roller coaster transferring gravitational potential energy to kinetic energy', '', g);
  }

  /* ======================= WAVE 12: chemistry gaps ======================= */
  const atm = (x, y, s, c = '#3a3f47', r = 15, tc = '#fff') => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${c}" stroke="#222" stroke-width=".8"/>` + T(x, y + 5, s, { size: r > 12 ? 13 : 11, w: 700, fill: tc });
  const bnd = (x1, y1, x2, y2, n = 1) => n === 1 ? `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="#b7bfc8" stroke-width="3"/>` : (() => { const a = Math.atan2(y2 - y1, x2 - x1), dx = -Math.sin(a) * 4, dy = Math.cos(a) * 4; return `<path d="M${f(x1 + dx)} ${f(y1 + dy)}L${f(x2 + dx)} ${f(y2 + dy)}M${f(x1 - dx)} ${f(y1 - dy)}L${f(x2 - dx)} ${f(y2 - dy)}" stroke="#b7bfc8" stroke-width="3"/>`; })();
  const curly = (x1, y1, x2, y2, bend = -40, col = '#e0a64a') => { const mx = (x1 + x2) / 2 - (y2 - y1) * bend / 100, my = (y1 + y2) / 2 + (x2 - x1) * bend / 100; const a = Math.atan2(y2 - my, x2 - mx); return `<path d="M${f(x1)} ${f(y1)}Q${f(mx)} ${f(my)} ${f(x2)} ${f(y2)}" stroke="${col}" stroke-width="2.2" fill="none"/><path d="M${f(x2)} ${f(y2)}L${f(x2 - 10 * Math.cos(a - 0.4))} ${f(y2 - 10 * Math.sin(a - 0.4))}L${f(x2 - 10 * Math.cos(a + 0.4))} ${f(y2 - 10 * Math.sin(a + 0.4))}Z" fill="${col}"/>`; };
  const C = '#3a3f47', Hc = '#f2f2f2', O = '#e2483a', N = '#3f7fd6', Cl = '#3fb27f', Br = '#a0522d';
  const atH = (x, y, s = 'H') => atm(x, y, s, Hc, 11, '#333');
  const bondsFirst = g => { const b = []; const rest = g.replace(/<path d="[^"]*" stroke="#b7bfc8" stroke-width="3"\/>/g, m => { b.push(m); return ''; }); return b.join('') + rest; };

  function complexShapes(o = {}) {
    const W = 980, H = 380;
    let g = T(490, 30, 'Shapes of complex ions', { size: 15, w: 700 });
    const M = (x, y, l) => atm(x, y, 'M', '#e0a64a', 16, '#1d2733');
    // octahedral
    let x = 120, y = 180; g += [[0, -70], [0, 70], [-70, 0], [70, 0], [-36, -26], [36, 26]].map(([dx, dy]) => bnd(x, y, x + dx, y + dy) + atm(x + dx, y + dy, 'L', '#3f7fd6', 12)).join('') + M(x, y) + T(x, 290, 'octahedral, 90°', { size: 13, w: 700 }) + T(x, 308, '6 ligands, e.g. [Cu(H₂O)₆]²⁺', { size: 11 });
    x = 330; g += [[0, -70], [-60, 34], [60, 34], [10, 50]].map(([dx, dy]) => bnd(x, y, x + dx, y + dy) + atm(x + dx, y + dy, 'L', '#3fb27f', 12)).join('') + M(x, y) + T(x, 290, 'tetrahedral, 109.5°', { size: 13, w: 700 }) + T(x, 308, '4 large ligands, e.g. [CuCl₄]²⁻', { size: 11 });
    x = 530; g += [[0, -70], [0, 70], [-70, 0], [70, 0]].map(([dx, dy]) => bnd(x, y, x + dx, y + dy) + atm(x + dx, y + dy, 'L', '#9b7ad6', 12)).join('') + M(x, y) + T(x, 290, 'square planar, 90°', { size: 13, w: 700 }) + T(x, 308, 'e.g. platin complexes', { size: 11 });
    x = 720; g += bnd(x - 70, y, x + 70, y) + atm(x - 70, y, 'L', '#ef5b4c', 12) + atm(x + 70, y, 'L', '#ef5b4c', 12) + M(x, y) + T(x, 290, 'linear, 180°', { size: 13, w: 700 }) + T(x, 308, 'e.g. [Ag(NH₃)₂]⁺', { size: 11 });
    g += T(880, 150, 'cis-platin:', { size: 12, w: 700 }) + T(880, 168, 'Cl ligands next to', { size: 11 }) + T(880, 184, 'each other (90°);', { size: 11 }) + T(880, 200, 'binds to DNA in', { size: 11 }) + T(880, 216, 'cancer cells', { size: 11 }) + T(880, 250, 'trans: opposite (180°)', { size: 11 });
    g += T(490, 350, 'cis–trans isomers form for square planar and octahedral complexes; octahedral complexes with three bidentate ligands show optical isomers', { size: 11 });
    g = bondsFirst(g);
    return wrap(W, H, o.aria || 'Octahedral, tetrahedral, square planar and linear complex ions', '', g);
  }

  function moleculeShapes(o = {}) {
    const W = 990, H = 400;
    let g = T(495, 30, 'Shapes of molecules: electron pairs repel as far apart as possible', { size: 15, w: 700 }) + T(495, 52, 'lone pairs repel more than bonding pairs, so each lone pair reduces the angle by about 2.5°', { size: 12 });
    const lone = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="8" fill="#e0a64a" opacity=".6"/>`;
    const S = [[100, 'linear', '180°', 'BeCl₂', [[-60, 0], [60, 0]], 0, Cl], [260, 'trigonal planar', '120°', 'BF₃', [[0, -60], [-52, 30], [52, 30]], 0, '#c9a06a'], [430, 'tetrahedral', '109.5°', 'CH₄', [[0, -60], [-52, 30], [52, 30], [14, 44]], 0, Hc], [600, 'pyramidal', '107°', 'NH₃', [[-52, 24], [52, 24], [10, 46]], 1, Hc], [760, 'bent (non-linear)', '104.5°', 'H₂O', [[-46, 30], [46, 30]], 2, Hc], [910, 'octahedral', '90°', 'SF₆', [[0, -60], [0, 60], [-60, 0], [60, 0], [-30, -24], [30, 24]], 0, '#d6e24a']];
    S.forEach(([x, n, a, m, arms, lp, col]) => { const y = 190; g += arms.map(([dx, dy]) => bnd(x, y, x + dx, y + dy) + atm(x + dx, y + dy, '', col, 10)).join(''); if (lp >= 1) g += lone(x - 12, y - 30); if (lp >= 2) g += lone(x + 12, y - 30); g += atm(x, y, { 'BeCl₂': 'Be', 'BF₃': 'B', 'CH₄': 'C', 'NH₃': 'N', 'H₂O': 'O', 'SF₆': 'S' }[m], '#3a3f47', 15) + T(x, 290, n, { size: 13, w: 700 }) + T(x, 308, a, { size: 13 }) + T(x, 326, m, { size: 12 }); });
    g += T(495, 372, 'count bonding pairs and lone pairs around the central atom (a double bond counts as one area)', { size: 12 });
    g = bondsFirst(g);
    return wrap(W, H, o.aria || 'Shapes and bond angles of molecules from linear to octahedral', '', g);
  }

  function intermolecular(o = {}) {
    const W = 980, H = 400;
    let g = panelT(170, 'London forces', 'temporary dipoles; all molecules') + panelT(490, 'Permanent dipole–dipole', 'polar molecules, e.g. HCl') + panelT(810, 'Hydrogen bonding', 'H on N, O or F; lone pair on N, O or F');
    g += `<ellipse cx="120" cy="190" rx="44" ry="34" fill="#9fc6ff" opacity=".35" stroke="#5aa9f0"/><ellipse cx="226" cy="190" rx="44" ry="34" fill="#9fc6ff" opacity=".35" stroke="#5aa9f0"/>` + T(96, 196, 'δ−', { size: 13, w: 700 }) + T(144, 196, 'δ+', { size: 13, w: 700 }) + T(202, 196, 'δ−', { size: 13, w: 700 }) + T(250, 196, 'δ+', { size: 13, w: 700 }) + `<path d="M150 190H180" stroke="#e0a64a" stroke-width="2" stroke-dasharray="4 3"/>` + T(170, 270, 'more electrons → stronger', { size: 12 }) + T(170, 286, '(higher boiling point)', { size: 12 });
    g += atm(420, 190, 'H', Hc, 13, '#333') + bnd(433, 190, 455, 190) + atm(470, 190, 'Cl', Cl, 16) + atm(520, 190, 'H', Hc, 13, '#333') + bnd(533, 190, 555, 190) + atm(570, 190, 'Cl', Cl, 16) + `<path d="M486 190H507" stroke="#e0a64a" stroke-width="2" stroke-dasharray="4 3"/>` + T(420, 166, 'δ+', { size: 12 }) + T(470, 166, 'δ−', { size: 12 }) + T(490, 270, 'electronegativity difference', { size: 12 }) + T(490, 286, 'gives a permanent dipole', { size: 12 });
    const water = (x, y, rot) => `<g transform="rotate(${rot} ${x} ${y})">` + bnd(x, y, x - 26, y + 22) + bnd(x, y, x + 26, y + 22) + atm(x, y, 'O', O, 15) + atH(x - 26, y + 24) + atH(x + 26, y + 24) + `</g>`;
    g += water(760, 150, 0) + water(860, 230, 140) + `<path d="M786 176L840 214" stroke="#e0a64a" stroke-width="2.5" stroke-dasharray="4 3"/>` + T(830, 180, 'H bond', { size: 12, a: 'start', fill: '#e0a64a' });
    g += T(810, 300, 'strongest of the three: water has a high', { size: 12 }) + T(810, 316, 'boiling point; ice is less dense than water', { size: 12 });
    g += T(490, 380, 'these forces are between molecules; covalent bonds inside molecules are much stronger', { size: 12, w: 700 });
    g = bondsFirst(g);
    return wrap(W, H, o.aria || 'London forces, permanent dipole–dipole forces and hydrogen bonding between water molecules', '', g);
  }

  function radicalSub(o = {}) {
    const W = 940, H = 400;
    let g = T(470, 30, 'Radical substitution: methane + chlorine (UV light)', { size: 15, w: 700 });
    const rows = [['Initiation', 'Cl₂ → 2Cl•', 'UV light breaks the Cl–Cl bond (homolytic fission)', '#e0a64a'], ['Propagation', 'CH₄ + Cl• → •CH₃ + HCl', 'a radical is used up and', '#3f7fd6'], ['', '•CH₃ + Cl₂ → CH₃Cl + Cl•', 'another radical is made: a chain reaction', '#3f7fd6'], ['Termination', 'Cl• + Cl• → Cl₂', 'two radicals join: the chain stops', '#3fb27f'], ['', '•CH₃ + •CH₃ → C₂H₆', '', '#3fb27f'], ['', '•CH₃ + Cl• → CH₃Cl', '', '#3fb27f']];
    rows.forEach(([a, b, c, col], i) => { const y = 80 + i * 46; g += (a ? T(60, y, a, { size: 14, w: 700, a: 'start', fill: col }) : '') + T(220, y, b, { size: 15, a: 'start' }) + T(560, y, c, { size: 12, a: 'start' }); });
    g += T(470, 370, 'a radical has an unpaired electron (•). Further substitution gives CH₂Cl₂, CHCl₃ and CCl₄: a mixture of products', { size: 12 });
    return wrap(W, H, o.aria || 'Initiation, propagation and termination steps in radical substitution of methane', '', g);
  }

  function electrophilicAdd(o = {}) {
    const W = 980, H = 420;
    let g = '';
    // ethene and Br2
    g += bnd(90, 170, 150, 170, 2) + atm(90, 170, 'C', C) + atm(150, 170, 'C', C) + [[60, 140], [60, 200], [180, 140], [180, 200]].map(([x, y], i) => bnd(i < 2 ? 90 : 150, 170, x, y) + atH(x, y)).join('');
    g += bnd(120, 90, 120, 50) + atm(120, 90, 'Br', Br, 15) + atm(120, 46, 'Br', Br, 15) + T(140, 94, 'δ+', { size: 11, a: 'start' }) + T(140, 50, 'δ−', { size: 11, a: 'start' });
    g += curly(120, 162, 116, 108, -60) + curly(124, 68, 150, 40, -60);
    g += arrow(220, 160, 290, 160, 'currentColor', 2.5);
    // carbocation
    g += bnd(360, 170, 420, 170) + atm(360, 170, 'C', C) + atm(420, 170, 'C', C) + T(434, 152, '+', { size: 18, w: 700, fill: '#ef5b4c' }) + bnd(360, 170, 360, 120) + atm(360, 110, 'Br', Br, 15) + [[330, 200], [330, 140], [450, 140], [450, 200]].map(([x, y], i) => bnd(i < 2 ? 360 : 420, 170, x, y) + atH(x, y)).join('');
    g += atm(500, 120, 'Br⁻', Br, 18) + `<ellipse cx="484" cy="132" rx="8" ry="5" fill="#e0a64a" opacity=".8"/>` + curly(484, 138, 426, 160, 40);
    g += T(390, 250, 'carbocation intermediate', { size: 12 }) + arrow(560, 160, 630, 160, 'currentColor', 2.5);
    g += bnd(710, 170, 770, 170) + atm(710, 170, 'C', C) + atm(770, 170, 'C', C) + bnd(710, 170, 710, 120) + atm(710, 110, 'Br', Br, 15) + bnd(770, 170, 770, 220) + atm(770, 230, 'Br', Br, 15) + [[680, 200], [680, 140], [800, 140], [800, 200]].map(([x, y], i) => bnd(i < 2 ? 710 : 770, 170, x, y) + atH(x, y)).join('') + T(740, 280, '1,2-dibromoethane', { size: 12, w: 700 });
    g += T(490, 330, 'curly arrows show the movement of a pair of electrons: the π bond attacks the δ+ bromine (electrophile)', { size: 12 }) + T(490, 350, 'unsymmetrical alkenes: the major product comes from the more stable (more substituted) carbocation', { size: 12 });
    g = bondsFirst(g);
    g = T(490, 26, 'Electrophilic addition: ethene + bromine', { size: 15, w: 700 }) + `<g transform="translate(0 40)">${g}</g>`;
    return wrap(W, H, o.aria || 'Mechanism of electrophilic addition of bromine to ethene with curly arrows', '', g);
  }

  function areneSub(o = {}) {
    const W = 980, H = 360;
    const ring = (x, y, full) => { let s = ''; for (let i = 0; i < 6; i++) { const a1 = Math.PI / 6 + i * Math.PI / 3, a2 = a1 + Math.PI / 3; s += `<path d="M${f(x + 46 * Math.cos(a1))} ${f(y + 46 * Math.sin(a1))}L${f(x + 46 * Math.cos(a2))} ${f(y + 46 * Math.sin(a2))}" stroke="#b7bfc8" stroke-width="3"/>`; } return s + (full ? `<circle cx="${x}" cy="${y}" r="26" fill="none" stroke="#b7bfc8" stroke-width="2.5"/>` : `<path d="M${f(x - 22)} ${f(y - 14)}A26 26 0 1 0 ${f(x + 22)} ${f(y - 14)}" fill="none" stroke="#b7bfc8" stroke-width="2.5"/>`); };
    let g = T(490, 30, 'Electrophilic substitution: nitration of benzene', { size: 15, w: 700 }) + T(490, 52, 'HNO₃ + H₂SO₄ (50 °C) make the electrophile NO₂⁺', { size: 12 });
    g += ring(130, 190, true) + T(230, 120, 'NO₂⁺', { size: 15, w: 700, fill: '#3f7fd6' }) + curly(140, 166, 218, 126, -40) + arrow(260, 190, 320, 190, 'currentColor', 2.5);
    g += ring(420, 190, false) + T(420, 196, '+', { size: 16, w: 700, fill: '#ef5b4c' }) + bnd(443, 150, 470, 110) + T(480, 106, 'NO₂', { size: 13, w: 700, a: 'start', fill: '#3f7fd6' }) + bnd(443, 150, 420, 116) + atH(420, 110) + curly(424, 122, 430, 170, 50) + T(420, 270, 'intermediate: delocalisation broken', { size: 12 });
    g += arrow(540, 190, 600, 190, 'currentColor', 2.5) + T(570, 178, '− H⁺', { size: 12 });
    g += ring(700, 190, true) + bnd(723, 150, 750, 110) + T(760, 106, 'NO₂', { size: 13, w: 700, a: 'start', fill: '#3f7fd6' }) + T(700, 270, 'nitrobenzene: ring restored', { size: 12 });
    g += T(490, 320, 'benzene keeps its stable delocalised ring, so it substitutes rather than adds; it does not decolourise bromine water', { size: 12 });
    return wrap(W, H, o.aria || 'Mechanism of the nitration of benzene by electrophilic substitution', '', g);
  }

  function stereoIsomers(o = {}) {
    const W = 980, H = 380;
    let g = panelT(250, 'E/Z isomers (but-2-ene)', 'no rotation about C=C') + panelT(730, 'Optical isomers', 'a chiral carbon with four different groups');
    const alk = (x, y, z) => bnd(x - 30, y, x + 30, y, 2) + atm(x - 30, y, 'C', C) + atm(x + 30, y, 'C', C) + bnd(x - 30, y, x - 60, y - 40) + atm(x - 66, y - 46, 'CH₃', '#55606c', 17) + bnd(x - 30, y, x - 60, y + 40) + atH(x - 62, y + 44) + bnd(x + 30, y, x + 60, z ? y - 40 : y + 40) + atm(x + 66, z ? y - 46 : y + 46, 'CH₃', '#55606c', 17) + bnd(x + 30, y, x + 60, z ? y + 40 : y - 40) + atH(x + 62, z ? y + 44 : y - 44);
    g += alk(140, 190, true) + T(140, 280, 'Z (cis): same side', { size: 13, w: 700 }) + alk(360, 190, false) + T(360, 280, 'E (trans): opposite sides', { size: 13, w: 700 });
    const chiral = (x, y, m) => { const s = m ? -1 : 1; return bnd(x, y, x, y - 60) + atm(x, y - 66, 'H', Hc, 12, '#333') + bnd(x, y, x - 56 * s, y + 30) + atm(x - 62 * s, y + 34, 'OH', O, 15) + bnd(x, y, x + 56 * s, y + 30) + atm(x + 62 * s, y + 34, 'CH₃', '#55606c', 17) + bnd(x, y, x + 10 * s, y + 56) + atm(x + 12 * s, y + 64, 'COOH', '#7a5ad6', 20) + atm(x, y, 'C*', C, 15); };
    g += chiral(630, 180, false) + chiral(830, 180, true) + `<path d="M730 100V300" stroke="#9fd4e6" stroke-width="2" stroke-dasharray="6 5"/>` + T(730, 316, 'mirror', { size: 11 });
    g += T(730, 340, 'enantiomers rotate plane-polarised light in opposite directions', { size: 11 });
    g = bondsFirst(g);
    return wrap(W, H, o.aria || 'E/Z isomers of but-2-ene and the two optical isomers of lactic acid', '', g);
  }

  function bornHaber(o = {}) {
    const W = 920, H = 440;
    let g = T(460, 30, 'Born–Haber cycle for sodium chloride (kJ mol⁻¹)', { size: 15, w: 700 });
    const lv = (x1, x2, y, t) => `<path d="M${x1} ${y}H${x2}" stroke="currentColor" stroke-width="2.5"/>` + T(x2 + 8, y + 4, t, { size: 12, a: 'start' });
    g += lv(80, 260, 330, 'Na(s) + ½Cl₂(g)') + lv(80, 260, 290, 'Na(g) + ½Cl₂(g)') + lv(80, 260, 230, 'Na(g) + Cl(g)') + lv(80, 260, 80, 'Na⁺(g) + e⁻ + Cl(g)') + lv(330, 510, 150, 'Na⁺(g) + Cl⁻(g)') + lv(80, 260, 410, 'NaCl(s)');
    g += arrow(120, 330, 120, 292, '#3f7fd6', 2) + T(126, 316, '+107 atomisation (Na)', { size: 11, a: 'start' }) + arrow(150, 290, 150, 232, '#3f7fd6', 2) + T(156, 266, '+122 atomisation (Cl)', { size: 11, a: 'start' }) + arrow(180, 230, 180, 82, '#3f7fd6', 2) + T(186, 160, '+496 1st ionisation energy', { size: 11, a: 'start' });
    g += arrow(380, 80, 380, 148, '#ef5b4c', 2) + T(386, 112, '−349 electron affinity', { size: 11, a: 'start' }) + arrow(420, 150, 420, 406, '#ef5b4c', 2.5) + T(426, 290, 'lattice enthalpy = ?', { size: 13, w: 700, a: 'start', fill: '#ef5b4c' }) + arrow(100, 330, 100, 406, '#ef5b4c', 2) + T(94, 380, '−411 ΔfH', { size: 11, a: 'end' }).replace('x="94"', 'x="96"');
    g += `<path d="M322 410H420" stroke="currentColor" stroke-dasharray="4 4"/>`;
    g += T(700, 300, 'Hess: ΔfH = sum of all other steps', { size: 12 }) + T(700, 320, 'LE = −411 − (107 + 122 + 496 − 349)', { size: 12 }) + T(700, 344, '= −787 kJ mol⁻¹', { size: 14, w: 700 });
    return wrap(W, H, o.aria || 'Born–Haber cycle for sodium chloride used to find the lattice enthalpy', '', g);
  }

  function hessCycle(o = {}) {
    const W = 900, H = 360;
    let g = T(450, 30, "Hess's law: the enthalpy change is the same whichever route is taken", { size: 15, w: 700 });
    g += T(200, 100, 'reactants', { size: 15, w: 700 }) + T(700, 100, 'products', { size: 15, w: 700 }) + T(450, 290, 'elements (or combustion products)', { size: 14, w: 700 });
    g += arrow(270, 96, 630, 96, '#ef5b4c', 3) + T(450, 84, 'ΔH reaction = ?', { size: 14, w: 700, fill: '#ef5b4c' });
    g += arrow(370, 270, 220, 120, '#3f7fd6', 2.5) + T(240, 200, 'ΔH₁', { size: 14, w: 700, a: 'end', fill: '#3f7fd6' }) + arrow(530, 270, 680, 120, '#3fb27f', 2.5) + T(660, 200, 'ΔH₂', { size: 14, w: 700, a: 'start', fill: '#3fb27f' });
    g += T(450, 330, 'with formation enthalpies (arrows up from elements): ΔH = ΣΔfH(products) − ΣΔfH(reactants)', { size: 12 }) + T(450, 348, 'with combustion enthalpies (arrows down to CO₂ + H₂O): ΔH = ΣΔcH(reactants) − ΣΔcH(products)', { size: 12 });
    return wrap(W, H, o.aria || "Hess's law cycle with two routes from reactants to products", '', g);
  }

  function rateGraphs(o = {}) {
    const W = 980, H = 380;
    let g = panelT(250, 'Concentration–time', 'from a continuous-monitoring experiment') + panelT(730, 'Rate–concentration', 'shows the order directly');
    g += axes(60, 310, 380, 220, 'Time', '[A]');
    g += `<path d="M60 110L330 310" stroke="#ef5b4c" stroke-width="3"/><path d="${curveP(t => Math.exp(-t * 2.8) * 0.9, 60, 310, 380, 222)}" stroke="#3f7fd6" stroke-width="3" fill="none"/>` + T(170, 130, 'zero order: straight line', { size: 12, fill: '#ef5b4c', a: 'start' }) + T(290, 215, 'first order: constant half-life', { size: 12, fill: '#3f7fd6', a: 'start' });
    g += T(250, 360, 'rate = gradient of a tangent', { size: 12 });
    g += axes(540, 310, 380, 220, '[A]', 'Rate');
    g += `<path d="M540 230H900" stroke="#ef5b4c" stroke-width="3"/><path d="M540 310L880 120" stroke="#3f7fd6" stroke-width="3"/><path d="${curveP(t => t * t * 0.95, 540, 310, 340, 220)}" stroke="#3fb27f" stroke-width="3" fill="none"/>`;
    g += T(905, 226, '0', { size: 13, w: 700, fill: '#ef5b4c', a: 'start' }) + T(888, 120, '1st', { size: 13, w: 700, fill: '#3f7fd6', a: 'start' }) + T(870, 92, '2nd', { size: 13, w: 700, fill: '#3fb27f', a: 'end' }) + T(730, 360, 'rate = k[A]ⁿ', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Concentration–time and rate–concentration graphs for zero, first and second order reactions', '', g);
  }

  function arrhenius(o = {}) {
    const W = 900, H = 360, x0 = 90, y0 = 300;
    let g = axes(x0, y0, 420, 230, '1 ÷ T (K⁻¹)', 'ln k');
    g += `<path d="M${x0 + 20} ${y0 - 210}L${x0 + 400} ${y0 - 20}" stroke="#3f7fd6" stroke-width="3"/>${[1, 2, 3, 4, 5].map(i => `<circle cx="${x0 + 20 + i * 64}" cy="${f(y0 - 210 + i * 64 * 0.5)}" r="5" fill="#3f7fd6"/>`).join('')}`;
    g += T(x0 + 260, y0 - 150, 'gradient = −Ea ÷ R', { size: 14, w: 700, a: 'start' });
    g += T(690, 110, 'k = A e^(−Ea/RT)', { size: 16, w: 700 }) + T(690, 140, 'ln k = −Ea ÷ RT + ln A', { size: 14 }) + T(690, 190, 'R = 8.314 J K⁻¹ mol⁻¹', { size: 12 }) + T(690, 220, 'higher T → larger k', { size: 12 });
    g += T(450, 30, 'The Arrhenius equation', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'Arrhenius plot of ln k against 1/T with gradient −Ea/R', '', g);
  }

  function bufferFig(o = {}) {
    const W = 900, H = 360, x0 = 90, y0 = 300;
    let g = axes(x0, y0, 400, 230, 'Volume of NaOH added', 'pH');
    g += `<path d="M${x0} ${y0 - 70}C${x0 + 60} ${y0 - 110} ${x0 + 200} ${y0 - 120} ${x0 + 260} ${y0 - 140}C${x0 + 290} ${y0 - 160} ${x0 + 300} ${y0 - 200} ${x0 + 400} ${y0 - 215}" stroke="#3f7fd6" stroke-width="3" fill="none"/><rect x="${x0 + 50}" y="${y0 - 140}" width="190" height="50" fill="#3fb27f" opacity=".12"/>` + T(x0 + 145, y0 - 148, 'buffer region: pH changes little', { size: 12, fill: '#3fb27f' });
    g += T(690, 90, 'HA ⇌ H⁺ + A⁻', { size: 16, w: 700 }) + T(690, 120, 'large reservoirs of HA and A⁻', { size: 12 }) + T(690, 160, 'add acid: H⁺ + A⁻ → HA', { size: 12 }) + T(690, 180, 'add alkali: OH⁻ + HA → A⁻ + H₂O', { size: 12 }) + T(690, 220, '[H⁺] = Ka × [HA] ÷ [A⁻]', { size: 13, w: 700 }) + T(690, 244, 'blood: carbonic acid / hydrogencarbonate', { size: 12 });
    g += T(450, 30, 'Buffer solutions', { size: 15, w: 700 });
    return wrap(W, H, o.aria || 'How a weak acid buffer resists changes in pH', '', g);
  }

  function hydroxideColours(o = {}) {
    const W = 980, H = 360;
    let g = T(490, 30, 'Adding sodium hydroxide solution: precipitate colours', { size: 15, w: 700 });
    const P = [['Cu²⁺', '#3a8fe0', 'blue'], ['Fe²⁺', '#5a8a4a', 'green'], ['Fe³⁺', '#b0602a', 'orange-brown'], ['Mn²⁺', '#c9b08a', 'pale brown'], ['Cr³⁺', '#4a7a5a', 'grey-green'], ['Al³⁺', '#f4f4f4', 'white (dissolves in excess)'], ['Ca²⁺ / Mg²⁺', '#f4f4f4', 'white']];
    P.forEach(([ion, c, t], i) => { const x = 80 + i * 136; g += tubeC(x, 80, 170, '#eef3f5', 0.6, c, 0.3) + T(x, 284, ion, { size: 14, w: 700 }) + T(x, 302, t.split(' (')[0], { size: 12 }) + (t.includes('(') ? T(x, 318, '(' + t.split(' (')[1], { size: 11 }) : ''); });
    g += T(490, 348, 'e.g. Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s);  Fe²⁺ precipitate turns brown on standing in air', { size: 12 });
    return wrap(W, H, o.aria || 'Colours of metal hydroxide precipitates with sodium hydroxide', '', g);
  }

  function condensationPolymer(o = {}) {
    const W = 980, H = 360;
    let g = T(490, 30, 'Condensation polymerisation: a small molecule (water) is lost at each link', { size: 15, w: 700 });
    g += T(150, 110, 'HO–□–OH', { size: 20, w: 700, fill: '#3f7fd6' }) + T(150, 136, 'diol', { size: 12 }) + T(270, 116, '+', { size: 22, w: 700 }) + T(420, 110, 'HOOC–■–COOH', { size: 20, w: 700, fill: '#ef5b4c' }) + T(420, 136, 'dicarboxylic acid', { size: 12 });
    g += arrow(560, 104, 620, 104, 'currentColor', 2.5) + T(790, 110, '–[O–□–O–CO–■–CO]ₙ–', { size: 19, w: 700 }) + T(790, 136, 'polyester (ester links)', { size: 12 }) + T(900, 166, '+ 2n H₂O', { size: 14, a: 'end' });
    g += T(150, 230, 'H₂N–□–NH₂', { size: 20, w: 700, fill: '#3fb27f' }) + T(150, 256, 'diamine', { size: 12 }) + T(270, 236, '+', { size: 22, w: 700 }) + T(420, 230, 'HOOC–■–COOH', { size: 20, w: 700, fill: '#ef5b4c' }) + T(420, 256, 'dicarboxylic acid', { size: 12 });
    g += arrow(560, 224, 620, 224, 'currentColor', 2.5) + T(790, 230, '–[NH–□–NH–CO–■–CO]ₙ–', { size: 19, w: 700 }) + T(790, 256, 'polyamide (amide links), e.g. nylon', { size: 12 });
    g += T(490, 320, 'proteins are polyamides made from amino acids; DNA, starch and cellulose are natural condensation polymers', { size: 12 }) + T(490, 340, 'polyesters and polyamides can be hydrolysed (biodegradable), unlike addition polymers', { size: 12 });
    return wrap(W, H, o.aria || 'Formation of a polyester and a polyamide by condensation polymerisation', '', g);
  }

  function organicFamilies(o = {}) {
    const W = 980, H = 380;
    let g = T(490, 30, 'Alcohols, carboxylic acids and esters', { size: 15, w: 700 });
    const ch3 = (x, y) => atm(x, y, 'C', C) + bnd(x, y, x - 30, y) + atH(x - 40, y) + bnd(x, y, x, y - 30) + atH(x, y - 40) + bnd(x, y, x, y + 30) + atH(x, y + 40);
    g += ch3(90, 150) + bnd(90, 150, 140, 150) + atm(140, 150, 'C', C) + bnd(140, 150, 140, 120) + atH(140, 110) + bnd(140, 150, 140, 180) + atH(140, 190) + bnd(140, 150, 190, 150) + atm(190, 150, 'O', O) + bnd(190, 150, 225, 150) + atH(232, 150);
    g += T(150, 240, 'ethanol (–OH)', { size: 14, w: 700 }) + T(150, 260, 'burns; with sodium gives H₂;', { size: 12 }) + T(150, 276, 'oxidised to ethanoic acid', { size: 12 });
    g += ch3(400, 150) + bnd(400, 150, 450, 150) + atm(450, 150, 'C', C) + bnd(450, 150, 450, 105, 2) + atm(450, 96, 'O', O) + bnd(450, 150, 500, 150) + atm(500, 150, 'O', O) + bnd(500, 150, 535, 150) + atH(542, 150);
    g += T(460, 240, 'ethanoic acid (–COOH)', { size: 14, w: 700 }) + T(460, 260, 'weak acid; fizzes with carbonates', { size: 12 });
    g += ch3(700, 150) + bnd(700, 150, 750, 150) + atm(750, 150, 'C', C) + bnd(750, 150, 750, 105, 2) + atm(750, 96, 'O', O) + bnd(750, 150, 800, 150) + atm(800, 150, 'O', O) + bnd(800, 150, 850, 150) + T(880, 156, 'C₂H₅', { size: 15, w: 700 });
    g += T(790, 240, 'ethyl ethanoate (ester, –COO–)', { size: 14, w: 700 }) + T(790, 260, 'fruity smell; used in perfumes', { size: 12 });
    g += T(490, 330, 'ethanoic acid + ethanol ⇌ ethyl ethanoate + water   (acid catalyst)', { size: 14, w: 700 }) + T(490, 354, 'homologous series: same functional group, similar reactions, formulae differ by CH₂', { size: 12 });
    g = bondsFirst(g);
    return wrap(W, H, o.aria || 'Structures of ethanol, ethanoic acid and ethyl ethanoate', '', g);
  }

  function alkeneReactions(o = {}) {
    const W = 980, H = 360;
    let g = T(490, 30, 'Reactions of alkenes: the C=C double bond opens (addition)', { size: 15, w: 700 });
    const eth = (x, y) => bnd(x - 25, y, x + 25, y, 2) + atm(x - 25, y, 'C', C) + atm(x + 25, y, 'C', C) + [[-50, -26], [-50, 26], [50, -26], [50, 26]].map(([dx, dy]) => bnd(x + Math.sign(dx) * 25, y, x + dx, y + dy) + atH(x + dx, y + dy)).join('');
    g += eth(120, 190) + T(120, 260, 'ethene', { size: 13, w: 700 });
    [['+ H₂ (nickel, 150 °C)', 'ethane (hydrogenation)', 90], ['+ Br₂ (bromine water)', '1,2-dibromoethane: orange → colourless', 170], ['+ H₂O (steam, H₃PO₄, 300 °C)', 'ethanol (hydration)', 250], ['+ HBr', 'bromoethane', 320]].forEach(([r, p, y]) => { g += arrow(200, 190, 440, y, 'currentColor', 2) + T(450, y + 5, r, { size: 13, w: 700, a: 'start' }) + T(700, y + 5, '→ ' + p, { size: 13, a: 'start' }); });
    g = bondsFirst(g);
    return wrap(W, H, o.aria || 'Addition reactions of ethene with hydrogen, bromine, steam and hydrogen bromide', '', g);
  }

  function equilibriumFig(o = {}) {
    const W = 980, H = 380;
    let g = panelT(250, 'A reversible reaction', 'hydrated copper sulfate') + panelT(730, "Le Chatelier's principle", 'the position of equilibrium shifts to oppose a change');
    g += `<path d="M90 180Q110 150 140 160Q170 150 190 180Q170 200 140 196Q110 200 90 180Z" fill="#3a8fe0"/><path d="M310 180Q330 150 360 160Q390 150 410 180Q390 200 360 196Q330 200 310 180Z" fill="#f4f4f4"/>` + T(140, 230, 'blue (hydrated)', { size: 12 }) + T(360, 230, 'white (anhydrous)', { size: 12 });
    g += arrow(205, 168, 295, 168, '#ef5b4c', 2.5) + T(250, 156, 'heat (endothermic)', { size: 11, fill: '#ef5b4c' }) + arrow(295, 194, 205, 194, '#3f7fd6', 2.5) + T(250, 214, 'add water (exothermic)', { size: 11, fill: '#3f7fd6' });
    g += T(250, 290, 'CuSO₄·5H₂O ⇌ CuSO₄ + 5H₂O', { size: 14, w: 700 }) + T(250, 312, 'closed system: forward rate = backward rate (dynamic)', { size: 12 });
    const rows = [['Change', 'Equilibrium shifts'], ['increase concentration of a reactant', 'right (more products)'], ['increase temperature', 'endothermic direction'], ['increase pressure (gases)', 'side with fewer molecules'], ['add a catalyst', 'no shift; reached faster']];
    rows.forEach((r, i) => { const y = 110 + i * 40; g += `<rect x="520" y="${y - 22}" width="210" height="38" fill="${i ? 'none' : '#3f7fd6'}" fill-opacity=".15" stroke="currentColor" stroke-opacity=".3"/><rect x="730" y="${y - 22}" width="200" height="38" fill="${i ? 'none' : '#3f7fd6'}" fill-opacity=".15" stroke="currentColor" stroke-opacity=".3"/>` + T(625, y + 2, r[0], { size: 11, w: i ? 400 : 700 }) + T(830, y + 2, r[1], { size: 11, w: i ? 400 : 700 }); });
    return wrap(W, H, o.aria || 'Reversible reaction of hydrated copper sulfate and a summary of Le Chatelier’s principle', '', g);
  }

  function acidStrength(o = {}) {
    const W = 940, H = 360;
    let g = panelT(240, 'Strong acid (e.g. HCl)', 'fully ionised in water') + panelT(700, 'Weak acid (e.g. ethanoic acid)', 'only partly ionised');
    const rnd = S._rnd(6);
    g += beaker(140, 100, 200, 180, 0.9, WATER, 0.15) + beaker(600, 100, 200, 180, 0.9, WATER, 0.15);
    for (let i = 0; i < 8; i++) { const x = 175 + (i % 3) * 60, y = 140 + Math.floor(i / 3) * 44; g += T(x, y, 'H⁺', { size: 13, w: 700, fill: '#ef5b4c' }) + T(x + 24, y + 16, 'Cl⁻', { size: 13, w: 700, fill: '#3fb27f' }); }
    [[640, 140], [700, 140], [760, 140], [640, 230], [760, 230], [700, 268], [640, 268]].forEach(([x, y]) => { g += T(x, y, 'HA', { size: 13, w: 700, fill: '#3f7fd6' }); });
    g += T(690, 190, 'H⁺', { size: 13, w: 700, fill: '#ef5b4c' }) + T(722, 204, 'A⁻', { size: 13, w: 700, fill: '#3fb27f' });
    g += T(240, 312, 'HCl → H⁺ + Cl⁻', { size: 14, w: 700 }) + T(700, 312, 'CH₃COOH ⇌ CH₃COO⁻ + H⁺', { size: 14, w: 700 }) + T(470, 344, 'strong/weak = how much it ionises; concentrated/dilute = how much acid per dm³', { size: 12 });
    return wrap(W, H, o.aria || 'A strong acid fully ionised compared with a weak acid that is only partly ionised', '', g);
  }

  function pollutants(o = {}) {
    const W = 960, H = 380;
    let g = T(480, 30, 'Pollutants from burning fuels', { size: 15, w: 700 });
    g += `<path d="M60 230H230Q250 230 256 214L280 180H370L400 214Q420 230 440 230V270H60Z" fill="#3f7fd6"/><circle cx="120" cy="272" r="20" fill="#22262e"/><circle cx="380" cy="272" r="20" fill="#22262e"/><rect x="40" y="250" width="24" height="10" fill="#7d858f"/>`;
    for (let i = 0; i < 6; i++) g += `<circle cx="${30 - i * 4}" cy="${246 - i * 14}" r="${8 + i * 3}" fill="#9aa3ad" opacity="${0.5 - i * 0.06}"/>`;
    const P = [['Carbon monoxide (CO)', 'incomplete combustion; toxic: binds to haemoglobin', '#ef5b4c'], ['Soot (carbon particulates)', 'incomplete combustion; global dimming, lung damage', '#55606c'], ['Sulfur dioxide (SO₂)', 'sulfur in fuels; acid rain, breathing problems', '#e0a64a'], ['Oxides of nitrogen (NOₓ)', 'N₂ + O₂ in a hot engine; acid rain, breathing problems', '#9b7ad6'], ['Carbon dioxide (CO₂)', 'complete combustion; greenhouse gas', '#3fb27f']];
    P.forEach(([a, b, c], i) => { g += `<circle cx="500" cy="${90 + i * 56}" r="8" fill="${c}"/>` + T(518, 86 + i * 56, a, { size: 13, w: 700, a: 'start' }) + T(518, 104 + i * 56, b, { size: 12, a: 'start' }); });
    g += T(240, 340, 'catalytic converters change CO and NOₓ', { size: 12 }) + T(240, 356, 'into CO₂ and N₂', { size: 12 });
    return wrap(W, H, o.aria || 'Pollutants from burning fuels in a car engine and their effects', '', g);
  }

  function potableWater(o = {}) {
    const W = 980, H = 380;
    let g = T(490, 30, 'Making water safe to drink (potable water)', { size: 15, w: 700 });
    const step = (x, t, s, c) => `<rect x="${x - 80}" y="80" width="160" height="110" rx="12" fill="${c}" opacity=".18" stroke="${c}"/>` + T(x, 112, t, { size: 14, w: 700 }) + s.map((l, i) => T(x, 136 + i * 17, l, { size: 12 })).join('');
    g += step(110, 'Choose a source', ['fresh water: rain,', 'lakes, rivers,', 'groundwater'], '#5aa9f0') + arrow(195, 135, 225, 135, 'currentColor', 2.5);
    g += step(310, 'Filter', ['wire meshes, then', 'sand and gravel', 'beds remove solids'], '#e0a64a') + arrow(395, 135, 425, 135, 'currentColor', 2.5);
    g += step(510, 'Sterilise', ['chlorine, ozone', 'or ultraviolet light', 'kill microbes'], '#3fb27f') + arrow(595, 135, 625, 135, 'currentColor', 2.5) + `<rect x="630" y="100" width="90" height="70" rx="10" fill="#3f7fd6" opacity=".3"/>` + T(675, 140, 'tap', { size: 14, w: 700 });
    g += T(490, 240, 'Where fresh water is scarce: desalination of sea water', { size: 14, w: 700 });
    g += T(260, 276, 'distillation: boil and condense', { size: 12 }) + T(260, 294, '(needs lots of energy)', { size: 12 }) + T(720, 276, 'reverse osmosis: membranes', { size: 12 }) + T(720, 294, '(expensive, uses energy)', { size: 12 });
    g += T(490, 344, 'potable water is safe to drink but not pure: it still contains dissolved substances', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'Steps for producing potable water, and desalination', '', g);
  }

  function wasteWater(o = {}) {
    const W = 980, H = 380;
    let g = T(490, 30, 'Treating waste water (sewage)', { size: 15, w: 700 });
    const box = (x, y, t, s, c) => `<rect x="${x - 85}" y="${y}" width="170" height="80" rx="10" fill="${c}" opacity=".18" stroke="${c}"/>` + T(x, y + 30, t, { size: 13, w: 700 }) + s.map((l, i) => T(x, y + 50 + i * 16, l, { size: 11 })).join('');
    g += box(110, 70, 'Screening', ['removes grit and', 'large objects'], '#55606c') + arrow(197, 110, 227, 110, 'currentColor', 2.5) + box(320, 70, 'Sedimentation', ['settles into sludge', 'and effluent'], '#e0a64a');
    g += arrow(320, 152, 320, 200, 'currentColor', 2.5) + T(330, 180, 'sludge', { size: 11, a: 'start' }) + box(320, 202, 'Anaerobic digestion', ['makes biogas', 'and fertiliser'], '#9b7ad6');
    g += arrow(407, 110, 507, 110, 'currentColor', 2.5) + T(457, 100, 'effluent', { size: 11 }) + box(600, 70, 'Aerobic treatment', ['bacteria break down', 'organic matter'], '#3fb27f') + arrow(687, 110, 757, 110, 'currentColor', 2.5) + box(850, 70, 'Released', ['into rivers', 'or the sea'], '#5aa9f0');
    g += T(700, 260, 'industrial waste water may also need', { size: 12 }) + T(700, 276, 'harmful chemicals removed', { size: 12 });
    g += T(490, 344, 'sewage needs more treatment than ground water, but less energy than desalinating sea water', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'Stages of waste water treatment from screening to release', '', g);
  }

  function alloyStructure(o = {}) {
    const W = 920, H = 340;
    let g = panelT(230, 'Pure metal', 'layers of atoms slide easily: soft') + panelT(690, 'Alloy', 'different sized atoms disrupt the layers: harder');
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) g += `<circle cx="${130 + c * 34}" cy="${110 + r * 34}" r="16" fill="#c9a06a" stroke="#8a6a3a"/>`;
    g += arrow(130, 290, 330, 290, '#ef5b4c', 2.5) + T(230, 314, 'force', { size: 12 });
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { const big = (r === 1 && c === 2) || (r === 3 && c === 5) || (r === 2 && c === 4); g += `<circle cx="${590 + c * 34}" cy="${110 + r * 34}" r="${big ? 22 : 16}" fill="${big ? '#7d858f' : '#c9a06a'}" stroke="${big ? '#55606c' : '#8a6a3a'}"/>`; }
    g += T(690, 314, 'e.g. steel (iron + carbon), brass, bronze', { size: 12 });
    return wrap(W, H, o.aria || 'Layers of atoms in a pure metal compared with the disrupted layers in an alloy', '', g);
  }

  const add = { complexShapes, moleculeShapes, intermolecular, radicalSub, electrophilicAdd, areneSub, stereoIsomers, bornHaber, hessCycle, rateGraphs, arrhenius, bufferFig, hydroxideColours, condensationPolymer, organicFamilies, alkeneReactions, equilibriumFig, acidStrength, pollutants, potableWater, wasteWater, alloyStructure, stressStrain, potentialDivider, capModel, ctScan, petScan, dopplerUS, attenuation, acousticImpedance, freeBody, terminalVelocity, centreOfMass, triangleForces, collisions, forceTime, hrDiagram, lineSpectra, blackBody, redshiftHubble, fieldLines, potentialGraph, induction, bindingEnergy, decayCurve, fusionFig, waveDiffraction, electronDiffraction, boltzmannCurve, circularMotion, decayEquations, contamination, vectorsFig, colourFilters, keGpe, staticCharge, pregnancy, germination, fairTest, dissolving, energyStores, energyResources, variationGraphs, adaptations, massWeight, respirationCompare, recycleMetals, moonPhases, seasons, earFig, armMuscles, phScale, rockCycle, sankey, pressureArea, graphTypes, powerBill, pubertyChanges, massConservation, redoxTitration, c13Nmr, h1Nmr, labSkills, diffusionFig, foodBurning, changeTypes, foodTests, leverMoments, punnett, dnaExtraction, solarSystem, ks3Investigation, anionTests, displacementMetal, halogenColours, chemicalCell, shmPractical, resonanceCurves, boylesLaw, xrayTube, gammaCamera, ultrasoundScan, resonanceTube, massSpectrum, irSpectrum, tmColours, youngModulus, emfInternal, doubleSlit, capacitorRC, photoelectric, chargedBeams, rutherford, refluxDistil, purification, electrochemCell, phCurves, combustionCal, osmosisPractical, enzymePractical, pondweedPractical, samplingPractical, culturePractical, decayPractical, shcPractical, insulationPractical, resistanceWire, ivCharacteristic, densityPractical, accelerationPractical, wavesPractical, irPractical, latentHeat, saltPrep, electrolysisAq, ratesPractical, calorimeter, seriesParallel, acdc, heatingCurve, resultantForce, springHooke, dtGraph, liquidPressure, fission, wireField, orbit, separation, cracking, polymerisation, gasTests, flameTests, rusting, atmospherePie, microscope, villus, meiosis, evoTree, limitingFactors, phagocytosis, mitosis, bloodVessels, bloodCells, brain, skin, endocrine, carbonCycle, tropism, biomassPyramid, membrane, menstrualCycle, plasmidGE, fracDist, electrolysis, chromatography, titration, greenhouse, haber, periodicTable, collision, alkanes, reactionProfile, house, plug, grid, transformer, penetration, waves, emSpectrum, glassBlock, lenses, magField, stopping, starLife, gasPressure };
  /* ---------- wave 13: rich redraws of simple-shape figures ---------- */
  const lg = (k, c1, c2, vert = true, mid) => `<linearGradient id="${k}" x1="0" y1="0" x2="${vert ? 0 : 1}" y2="${vert ? 1 : 0}"><stop offset="0" stop-color="${c1}"/>${mid ? `<stop offset=".5" stop-color="${mid}"/>` : ''}<stop offset="1" stop-color="${c2}"/></linearGradient>`;
  const rg = (k, c1, c2, cx = .35, cy = .3, r = .75) => `<radialGradient id="${k}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`;
  const shadow = (x, y, rx, ry = 6, op = .28) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="#000" opacity="${op}"/>`;
  // wooden crate with planks, cross braces and shading
  const crate3 = (x, y, w, h, k) => {
    const x0 = x - w / 2, y0 = y - h / 2, b = Math.min(w, h) * .14;
    let s = `<rect x="${f(x0)}" y="${f(y0)}" width="${w}" height="${h}" rx="3" fill="url(#${k}wd)" stroke="#6b4a26" stroke-width="2"/>`;
    for (let i = 1; i < 4; i++) s += `<path d="M${f(x0 + 2)} ${f(y0 + h * i / 4)}H${f(x0 + w - 2)}" stroke="#8a6334" stroke-width="1.2" opacity=".7"/>`;
    s += `<path d="M${f(x0 + b)} ${f(y0 + b)}L${f(x0 + w - b)} ${f(y0 + h - b)}" stroke="#a87a45" stroke-width="${f(b * .8)}" stroke-linecap="square"/><path d="M${f(x0 + b)} ${f(y0 + b)}L${f(x0 + w - b)} ${f(y0 + h - b)}" stroke="#6b4a26" stroke-width="1" opacity=".5"/>`;
    s += `<rect x="${f(x0)}" y="${f(y0)}" width="${w}" height="${f(b)}" fill="#b7894f" stroke="#6b4a26"/><rect x="${f(x0)}" y="${f(y0 + h - b)}" width="${w}" height="${f(b)}" fill="#a87a45" stroke="#6b4a26"/><rect x="${f(x0)}" y="${f(y0)}" width="${f(b)}" height="${h}" fill="#b7894f" stroke="#6b4a26"/><rect x="${f(x0 + w - b)}" y="${f(y0)}" width="${f(b)}" height="${h}" fill="#a87a45" stroke="#6b4a26"/>`;
    [[x0 + b / 2, y0 + b / 2], [x0 + w - b / 2, y0 + b / 2], [x0 + b / 2, y0 + h - b / 2], [x0 + w - b / 2, y0 + h - b / 2]].forEach(([a, c]) => { s += `<circle cx="${f(a)}" cy="${f(c)}" r="2.2" fill="#5a3d1e"/>`; });
    return s;
  };
  const crateDefs = k => lg(k + 'wd', '#d9ad70', '#a77a44');
  // floor: tiled surface with shading
  const floor3 = (x1, x2, y, k, col = '#8f9aa6') => `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="18" fill="url(#${k}fl)"/><path d="M${x1} ${y}H${x2}" stroke="#55606c" stroke-width="2.5"/>` + Array.from({ length: Math.floor((x2 - x1) / 40) }, (_, i) => `<path d="M${x1 + 20 + i * 40} ${y + 2}l-10 16" stroke="#6b7480" stroke-width="1" opacity=".6"/>`).join('');
  const floorDefs = k => lg(k + 'fl', '#a6b0bb', '#6b7480');
  // dynamics trolley
  const trolley3 = (x, y, w, c1, c2, k, txt) => {
    const x0 = x - w / 2;
    let s = shadow(x, y + 30, w / 2, 5) + `<defs>${lg(k, c1, c2)}</defs>`;
    s += `<rect x="${f(x0)}" y="${y - 22}" width="${w}" height="34" rx="5" fill="url(#${k})" stroke="#1d2733" stroke-width="1.5"/><rect x="${f(x0 + 4)}" y="${y - 19}" width="${w - 8}" height="6" rx="3" fill="#fff" opacity=".28"/>`;
    s += `<rect x="${f(x0 - 6)}" y="${y - 6}" width="8" height="10" rx="2" fill="#7d858f"/><rect x="${f(x0 + w - 2)}" y="${y - 6}" width="8" height="10" rx="2" fill="#7d858f"/>`;
    [x0 + 16, x0 + w - 16].forEach(a => { s += `<circle cx="${f(a)}" cy="${y + 18}" r="10" fill="#22262e"/><circle cx="${f(a)}" cy="${y + 18}" r="4.5" fill="#b8c0c8"/><circle cx="${f(a)}" cy="${y + 18}" r="1.6" fill="#22262e"/>`; });
    if (txt) s += T(x, y + 1, txt, { size: 13, w: 700, fill: '#fff' });
    return s;
  };
  // a standing person (side-neutral), scale s, base at feet y
  const person3 = (x, y, s, shirt, k, skin = '#e8bf98') => {
    const P = (a, b) => `${f(x + a * s)} ${f(y + b * s)}`;
    let g = `<defs>${lg(k + 's', shirt, '#1d2733', true)}${rg(k + 'h', '#f6d7b8', skin)}</defs>` + shadow(x, y + 2, 26 * s, 5 * s);
    g += `<path d="M${P(-12, -62)}L${P(-11, -4)}L${P(-2, -4)}L${P(0, -42)}L${P(2, -4)}L${P(11, -4)}L${P(12, -62)}Z" fill="#33415a"/><path d="M${P(0, -58)}L${P(0, -42)}" stroke="#22262e" stroke-width="1"/>`;
    g += `<path d="M${P(-13, 0)}L${P(-1, 0)}L${P(-1, -5)}L${P(-11, -5)}Z M${P(1, 0)}L${P(13, 0)}L${P(11, -5)}L${P(1, -5)}Z" fill="#22262e"/>`;
    g += `<path d="M${P(-16, -104)}Q${P(0, -112)} ${P(16, -104)}L${P(14, -60)}L${P(-14, -60)}Z" fill="url(#${k}s)"/>`;
    g += `<path d="M${P(-16, -102)}L${P(-22, -66)}M${P(16, -102)}L${P(22, -66)}" stroke="${shirt}" stroke-width="${f(8 * s)}" stroke-linecap="round"/><circle cx="${f(x - 22 * s)}" cy="${f(y - 64 * s)}" r="${f(4.5 * s)}" fill="${skin}"/><circle cx="${f(x + 22 * s)}" cy="${f(y - 64 * s)}" r="${f(4.5 * s)}" fill="${skin}"/>`;
    g += `<rect x="${f(x - 4 * s)}" y="${f(y - 112 * s)}" width="${f(8 * s)}" height="${f(8 * s)}" fill="${skin}"/><circle cx="${f(x)}" cy="${f(y - 124 * s)}" r="${f(14 * s)}" fill="url(#${k}h)"/><path d="M${P(-14, -126)}Q${P(-12, -142)} ${P(0, -140)}Q${P(14, -140)} ${P(14, -124)}Q${P(6, -134)} ${P(-14, -126)}Z" fill="#4a3426"/>`;
    return g;
  };
  // sphere planet with terminator shading
  const planet3 = (x, y, r, c1, c2, k, extra = '') => `<defs>${rg(k, c1, c2, .38, .32, .8)}<radialGradient id="${k}t" cx=".3" cy=".3" r="1"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient><clipPath id="${k}c"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/></clipPath></defs><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#${k})"/><g clip-path="url(#${k}c)">${extra}</g><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#${k}t)"/>`;
  const earthLand = (x, y, r) => `<path d="M${f(x - r * .55)} ${f(y - r * .5)}q${f(r * .3)} ${f(-r * .25)} ${f(r * .55)} ${f(-r * .05)}q${f(r * .15)} ${f(r * .3)} ${f(-r * .1)} ${f(r * .45)}q${f(-r * .1)} ${f(r * .35)} ${f(-r * .3)} ${f(r * .25)}q${f(-r * .25)} ${f(-r * .3)} ${f(-r * .15)} ${f(-r * .65)}Z M${f(x + r * .15)} ${f(y + r * .1)}q${f(r * .35)} ${f(-r * .15)} ${f(r * .5)} ${f(r * .15)}q${f(-r * .05)} ${f(r * .4)} ${f(-r * .3)} ${f(r * .45)}q${f(-r * .25)} ${f(-r * .2)} ${f(-r * .2)} ${f(-r * .6)}Z" fill="#4f9a45"/><ellipse cx="${f(x)}" cy="${f(y - r)}" rx="${f(r * .45)}" ry="${f(r * .16)}" fill="#f4f7f9" opacity=".9"/><path d="M${f(x - r * .7)} ${f(y - r * .15)}q${f(r * .4)} ${f(-r * .12)} ${f(r * .8)} 0" stroke="#fff" stroke-width="${f(r * .06)}" fill="none" opacity=".5"/>`;
  const craters = (x, y, r) => [[-.35, -.3, .18], [.25, -.1, .12], [-.1, .35, .14], [.4, .35, .09], [-.5, .15, .08]].map(([a, b, c]) => `<circle cx="${f(x + a * r)}" cy="${f(y + b * r)}" r="${f(c * r)}" fill="#8e8a84" opacity=".7"/><circle cx="${f(x + a * r - c * r * .2)}" cy="${f(y + b * r - c * r * .2)}" r="${f(c * r * .75)}" fill="#c9c4bc" opacity=".6"/>`).join('');
  const sun3 = (x, y, r, k) => `<defs><radialGradient id="${k}"><stop offset="0" stop-color="#fffbe0"/><stop offset=".45" stop-color="#ffd84a"/><stop offset="1" stop-color="#f08a1c"/></radialGradient><radialGradient id="${k}g"><stop offset=".55" stop-color="#ffcc33" stop-opacity=".45"/><stop offset="1" stop-color="#ffcc33" stop-opacity="0"/></radialGradient></defs><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 1.6)}" fill="url(#${k}g)"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#${k})"/>`;
  // slotted mass hanger stack / weight block with metallic shading
  const massBlock = (x, yb, w, h, c1, c2, k, txt) => `<defs>${lg(k, c1, c2, false, c1)}</defs>` + `<rect x="${f(x - w / 2)}" y="${f(yb - h)}" width="${w}" height="${h}" rx="4" fill="url(#${k})" stroke="#1d2733" stroke-width="1.2"/><rect x="${f(x - w / 2 + 3)}" y="${f(yb - h + 3)}" width="${w - 6}" height="5" rx="2" fill="#fff" opacity=".3"/><path d="M${f(x - 10)} ${f(yb - h)}q10 -16 20 0" stroke="#7d858f" stroke-width="4" fill="none"/>` + (txt ? T(x, yb - h / 2 + 5, txt, { size: 14, w: 700, fill: '#fff' }) : '');
  const nucleon = (x, y, r, p, k) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="url(#${k}${p ? 'p' : 'n'})" stroke="#000" stroke-opacity=".3" stroke-width=".8"/>` + (p ? `<text x="${f(x)}" y="${f(y + r * .42)}" text-anchor="middle" font-size="${f(r * 1.15)}" font-weight="700" style="fill:#fff">+</text>` : '');
  const nucDefs = k => rg(k + 'p', '#ff9b8a', '#c8372a') + rg(k + 'n', '#eef1f4', '#8a949c');

  function resultantForce2(o = {}) {
    const W = 960, H = 360, k = id('rf');
    let g = `<defs>${crateDefs(k)}${floorDefs(k)}</defs>` + floor3(40, 920, 240, k);
    const pane = (cx, F, Fr, tF, tFr) => shadow(cx, 241, 58, 4) + crate3(cx, 195, 104, 90, k) + arrow(cx + 52, 195, cx + 52 + F, 195, '#3fb27f', 7, 20) + T(cx + 60, 172, tF, { size: 14, w: 700, a: 'start', fill: '#3fb27f' }) + arrow(cx - 52, 195, cx - 52 - Fr, 195, '#ef5b4c', 7, 20) + T(cx - 60, 172, tFr, { size: 14, w: 700, a: 'end', fill: '#ef5b4c' });
    g += pane(250, 165, 60, '600 N push', '200 N friction') + pane(720, 100, 100, '300 N', '300 N');
    g += T(250, 290, 'Resultant force = 600 − 200 = 400 N to the right', { size: 15, w: 700 }) + T(250, 312, 'unbalanced: the crate accelerates', { size: 13 });
    g += T(720, 290, 'Resultant force = 0', { size: 15, w: 700 }) + T(720, 312, 'balanced: stays still or moves at constant velocity', { size: 13 });
    g += T(480, 50, 'Arrow length shows the size of each force', { size: 15 });
    return wrap(W, H, o.aria || 'Unbalanced and balanced forces on a crate', '', g);
  }

  function freeBody2(o = {}) {
    const W = 940, H = 380, k = id('fb');
    let g = panelT(230, 'Book on a table', 'balanced: W = N') + panelT(700, 'Box on a rough slope', 'resolve along and at 90° to the slope');
    g += `<defs>${lg(k + 't', '#c99a62', '#8a6334')}${lg(k + 'b', '#5b9be8', '#2b5fa8')}${lg(k + 's', '#d9b07a', '#9a7040')}${lg(k + 'x', '#6aa8f0', '#2f6cc0')}</defs>`;
    // table
    g += shadow(230, 334, 120, 5) + `<rect x="110" y="250" width="240" height="14" rx="3" fill="url(#${k}t)" stroke="#6b4a26"/><path d="M128 264V332M332 264V332" stroke="#8a6334" stroke-width="10" stroke-linecap="round"/>`;
    // book: cover, pages
    g += `<rect x="182" y="226" width="96" height="24" rx="3" fill="url(#${k}b)" stroke="#1d3d6e"/><rect x="186" y="230" width="88" height="15" fill="#f4efe0"/>${[0, 1, 2, 3].map(i => `<path d="M188 ${233 + i * 3.5}H272" stroke="#d6cfb8" stroke-width="1"/>`).join('')}<rect x="182" y="226" width="96" height="5" rx="2" fill="url(#${k}b)"/><rect x="182" y="245" width="96" height="5" rx="2" fill="#2b5fa8"/>`;
    g += `<circle cx="230" cy="238" r="4" fill="currentColor"/>` + arrow(230, 238, 230, 330, '#ef5b4c', 3.5) + arrow(230, 238, 230, 146, '#3fb27f', 3.5) + T(244, 320, 'W = mg', { size: 13, w: 700, a: 'start', fill: '#ef5b4c' }) + T(244, 152, 'N (normal contact)', { size: 13, w: 700, a: 'start', fill: '#3fb27f' });
    // slope (wedge with rough surface)
    g += shadow(700, 324, 190, 5) + `<path d="M520 320L880 320L880 160Z" fill="url(#${k}s)" stroke="#6b4a26" stroke-width="2"/>` + Array.from({ length: 18 }, (_, i) => { const t = (i + .5) / 18, x = 520 + 360 * t, y = 320 - 160 * t; return `<path d="M${f(x)} ${f(y)}l3 4" stroke="#6b4a26" stroke-width="1.4"/>`; }).join('');
    g += `<g transform="rotate(-24 700 240)"><rect x="660" y="198" width="80" height="46" rx="4" fill="url(#${k}x)" stroke="#1d3d6e" stroke-width="1.5"/><rect x="664" y="201" width="72" height="6" rx="3" fill="#fff" opacity=".3"/><path d="M700 198V244" stroke="#c9a06a" stroke-width="6" opacity=".85"/></g>`;
    g += `<circle cx="700" cy="220" r="4" fill="currentColor"/>` + arrow(700, 220, 700, 320, '#ef5b4c', 3.5) + T(712, 300, 'W', { size: 14, w: 700, a: 'start', fill: '#fff' }) + arrow(700, 220, 660, 130, '#3fb27f', 3.5) + T(650, 126, 'N', { size: 13, w: 700, a: 'end', fill: '#3fb27f' }) + arrow(700, 220, 790, 180, '#e0a64a', 3.5) + T(784, 166, 'F (friction)', { size: 13, w: 700, a: 'end', fill: '#e0a64a' });
    g += `<path d="M570 320A50 50 0 0 0 566 300" stroke="currentColor" fill="none" stroke-width="1.5"/>` + T(584, 312, 'θ', { size: 13 });
    g += T(700, 356, 'along slope: mg sin θ = F;  at 90°: N = mg cos θ', { size: 13 }) + T(230, 360, 'draw forces from the centre of mass', { size: 12 });
    return wrap(W, H, o.aria || 'Free-body diagrams for a book on a table and a box on a rough slope', '', g);
  }

  function massWeight2(o = {}) {
    const W = 920, H = 430, k = id('mw');
    const gE = 10, gM = 1.6;
    let g = T(460, 32, 'Mass and weight', { size: 16, w: 700 }) + T(460, 54, 'mass (kg) is the amount of matter; weight (N) is the force of gravity on it', { size: 13 });
    const pl = (x, n, gv, wt, pk, body) => body + `<g>${massBlock(x, 240, 66, 54, '#8a949c', '#3d4654', k + pk, '60 kg')}</g>` + arrow(x, 242, x, n === 'Earth' ? 312 : 272, '#ef5b4c', 4) + T(x + 40, 236, `weight ${wt} N`, { size: 14, w: 700, a: 'start', fill: '#ef5b4c' }) + T(x, 110, `${n}: g = ${gv} N/kg`, { size: 14, w: 700 });
    g += pl(230, 'Earth', gE, Math.round(60 * gE), 'a', planet3(230, 340, 82, '#6db3f2', '#1d4f9a', k + 'e', earthLand(230, 340, 82)));
    g += pl(690, 'Moon', gM, 96, 'b', planet3(690, 340, 82, '#e4e0d8', '#8e8a84', k + 'm', craters(690, 340, 82)));
    g += T(460, 210, 'weight = mass × g', { size: 16, w: 700 }) + T(460, 236, 'same mass everywhere;', { size: 12 }) + T(460, 252, 'weight changes', { size: 12 });
    return wrap(W, H, o.aria || 'A 60 kg mass weighs 600 N on Earth and 96 N on the Moon', '', g);
  }

  function pressureArea2(o = {}) {
    const W = 940, H = 380, k = id('pa');
    let g = T(470, 36, 'Pressure = force ÷ area', { size: 16, w: 700 }) + T(470, 58, 'the same weight on a smaller area gives a bigger pressure', { size: 13 });
    g += `<defs>${lg(k + 'sn', '#ffffff', '#cfdbe6')}${lg(k + 'fr', '#3d4654', '#22262e')}${lg(k + 'sh', '#d97a45', '#8e3f1c')}</defs>`;
    g += `<path d="M60 282Q200 272 470 280T880 280V322H60Z" fill="url(#${k}sn)"/>` + Array.from({ length: 30 }, (_, i) => `<circle cx="${70 + (i * 53) % 800}" cy="${294 + (i * 7) % 20}" r="1.6" fill="#b7c7d6"/>`).join('');
    // snowshoe: oval frame with lacing and a boot
    g += shadow(210, 284, 100, 4, .18) + `<ellipse cx="210" cy="276" rx="100" ry="10" fill="url(#${k}fr)"/><ellipse cx="210" cy="274" rx="92" ry="6" fill="none" stroke="#9aa3ad" stroke-width="1.2" stroke-dasharray="4 3"/>`;
    g += `<path d="M172 270V226Q172 212 186 212H214V250Q250 252 254 266V270Z" fill="#5a3d2a" stroke="#2c1d12" stroke-width="1.5"/><rect x="168" y="262" width="92" height="9" rx="4" fill="#2c1d12"/><path d="M180 222H210M180 232H210M180 242H210" stroke="#c9a06a" stroke-width="1.5"/>`;
    g += arrow(210, 110, 210, 200, '#ef5b4c', 4) + T(210, 100, '600 N', { size: 13, w: 700 });
    g += T(210, 344, 'snowshoe: area 0.2 m²', { size: 13 }) + T(210, 362, 'pressure = 600 ÷ 0.2 = 3 000 Pa', { size: 13, w: 700 });
    // stiletto shoe sinking into snow
    g += `<path d="M726 246L740 246L737 298L731 298Z" fill="#22262e"/><path d="M596 278Q594 262 614 258L662 250Q698 240 720 216Q734 204 752 212L754 238Q742 248 726 248Q700 254 670 272L640 280Q612 284 596 278Z" fill="url(#${k}sh)" stroke="#5a2410" stroke-width="1.6"/><path d="M614 260Q640 252 664 251Q690 246 708 232" stroke="#fff" stroke-width="2" fill="none" opacity=".35"/><path d="M664 251Q680 262 702 244" stroke="#5a2410" stroke-width="1.4" fill="none"/>`;
    g += `<path d="M722 286Q734 302 746 286" fill="none" stroke="#9fb4c8" stroke-width="2"/>` + arrow(690, 110, 690, 225, '#ef5b4c', 4) + T(690, 100, '600 N', { size: 13, w: 700 });
    g += T(680, 344, 'stiletto heel: area 0.0001 m²', { size: 13 }) + T(680, 362, 'pressure = 6 000 000 Pa: sinks in', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'Pressure equals force divided by area: a snowshoe compared with a stiletto heel', '', g);
  }

  function collisions2(o = {}) {
    const W = 960, H = 380, k = id('co');
    let g = `<defs>${floorDefs(k)}</defs>` + T(230, 40, 'Before', { size: 15, w: 700 }) + T(700, 40, 'After (they stick together)', { size: 15, w: 700 });
    g += `<rect x="50" y="200" width="380" height="10" rx="3" fill="url(#${k}fl)"/><rect x="510" y="200" width="400" height="10" rx="3" fill="url(#${k}fl)"/>`;
    g += trolley3(150, 172, 96, '#6aa8f0', '#2457a8', k + 'a', '2 kg') + arrow(120, 120, 190, 120, 'currentColor', 2.5) + T(155, 110, '3 m/s', { size: 12 });
    g += trolley3(320, 172, 80, '#ff8a7a', '#b83a2c', k + 'b', '1 kg') + T(320, 125, 'at rest', { size: 12 }) + `<rect x="276" y="160" width="8" height="12" fill="#c9c9c9"/><path d="M278 162h-6v8h6" fill="#7d858f"/>`;
    g += trolley3(650, 172, 96, '#6aa8f0', '#2457a8', k + 'c', '2 kg') + trolley3(745, 172, 80, '#ff8a7a', '#b83a2c', k + 'd', '1 kg') + `<rect x="696" y="160" width="10" height="12" rx="2" fill="#7d858f"/>` + arrow(660, 120, 740, 120, 'currentColor', 2.5) + T(700, 110, '2 m/s', { size: 12 });
    g += T(230, 250, 'momentum = 2 × 3 + 1 × 0 = 6 kg m/s', { size: 13 }) + T(700, 250, 'momentum = 3 × 2 = 6 kg m/s', { size: 13 });
    g += T(480, 300, 'p = m v.  In a closed system the total momentum before = total momentum after', { size: 14, w: 700 }) + T(480, 326, 'Explosions: total momentum before is zero, so the parts move apart with equal and opposite momentum', { size: 12 });
    g += T(480, 350, 'kinetic energy is conserved only in an elastic collision', { size: 12 });
    return wrap(W, H, o.aria || 'Conservation of momentum when two trolleys collide and stick together', '', g);
  }

  // skydiver seen from the side, falling belly-down
  const skydiver = (x, y, k, chute) => {
    let s = `<defs>${lg(k + 'j', '#ffa25a', '#d0561c')}${rg(k + 'h', '#ffe066', '#c9921a')}</defs>`;
    if (chute) s += `<defs>${lg(k + 'c', '#ff7a6a', '#c8372a')}</defs><path d="M${x - 70} ${y - 70}Q${x} ${y - 150} ${x + 70} ${y - 70}Q${x + 35} ${y - 84} ${x} ${y - 78}Q${x - 35} ${y - 84} ${x - 70} ${y - 70}Z" fill="url(#${k}c)" stroke="#8e2418"/><path d="M${x} ${y - 140}V${y - 78}M${x - 35} ${y - 128}L${x - 30} ${y - 82}M${x + 35} ${y - 128}L${x + 30} ${y - 82}" stroke="#fff" stroke-width="1.4" opacity=".6"/><path d="M${x - 70} ${y - 70}L${x - 6} ${y - 8}M${x + 70} ${y - 70}L${x + 6} ${y - 8}M${x} ${y - 78}V${y - 10}" stroke="#55606c" stroke-width="1"/>`;
    s += `<path d="M${x - 30} ${y + 2}Q${x - 46} ${y - 18} ${x - 52} ${y - 12}M${x + 30} ${y + 2}Q${x + 46} ${y - 18} ${x + 52} ${y - 12}" stroke="#d0561c" stroke-width="7" stroke-linecap="round" fill="none"/>`;
    s += `<ellipse cx="${x}" cy="${y + 4}" rx="30" ry="12" fill="url(#${k}j)" stroke="#8e3f1c"/><path d="M${x - 22} ${y + 10}Q${x - 34} ${y + 30} ${x - 40} ${y + 34}M${x + 22} ${y + 10}Q${x + 34} ${y + 30} ${x + 40} ${y + 34}" stroke="#33415a" stroke-width="8" stroke-linecap="round" fill="none"/>`;
    s += `<rect x="${x - 12}" y="${y - 6}" width="24" height="10" rx="3" fill="#22262e"/><circle cx="${x}" cy="${y - 16}" r="11" fill="url(#${k}h)" stroke="#8e6a10"/><rect x="${x - 7}" y="${y - 16}" width="14" height="5" rx="2" fill="#2b5fa8"/>`;
    return s;
  };
  function terminalVelocity2(o = {}) {
    const W = 980, H = 390, k = id('tv');
    const dv = (x, y, wl, dl, t, i) => skydiver(x, y, k + i) + arrow(x, y + 20, x, y + 20 + wl, '#ef5b4c', 3.5) + (dl ? arrow(x, y - 30, x, y - 30 - dl, '#3fb27f', 3.5) : '') + T(x, 320, t, { size: 12 });
    let g = `<rect x="20" y="70" width="400" height="260" rx="12" fill="#5aa9f0" opacity=".12"/>` + dv(90, 175, 80, 0, 'just jumped', 'a') + dv(210, 175, 80, 40, 'speeding up', 'b') + dv(330, 175, 80, 80, 'terminal velocity', 'c');
    g += T(210, 40, 'weight (red) and air resistance (green)', { size: 13, w: 700 }) + T(210, 354, 'drag increases with speed until', { size: 12 }) + T(210, 370, 'drag = weight: resultant force zero', { size: 12 });
    const x0 = 470, y0 = 330;
    g += axes(x0, y0, 440, 250, 'Time', 'Velocity');
    g += `<path d="${curveP(t => t < 0.45 ? 0.8 * (1 - Math.exp(-t * 7)) : t < 0.5 ? 0.8 - (t - 0.45) * 12 : 0.2 + 0.0 * t, x0, y0, 440, 250, 120)}" stroke="#3f7fd6" stroke-width="3" fill="none"/>`;
    g += T(x0 + 120, y0 - 216, 'terminal velocity', { size: 12 }) + T(x0 + 240, y0 - 150, 'parachute opens', { size: 12, a: 'start' }) + T(x0 + 330, y0 - 64, 'lower terminal velocity', { size: 12 });
    return wrap(W, H, o.aria || 'Forces on a skydiver and a velocity–time graph showing terminal velocity', '', g);
  }

  function keGpe2(o = {}) {
    const W = 940, H = 360, k = id('ke');
    const pth = 'M60 100Q200 100 300 300Q360 360 420 300Q520 150 640 260';
    let g = T(470, 32, 'Kinetic and gravitational potential energy', { size: 15, w: 700 }) + `<defs>${lg(k + 'c', '#ff7a6a', '#b83a2c')}${lg(k + 'g', '#7cc46a', '#3f7a33')}</defs>`;
    g += `<path d="M30 340H700" stroke="url(#${k}g)" stroke-width="10"/>`;
    [[80, 100], [150, 112], [210, 160], [255, 222], [440, 272], [490, 196], [540, 176], [600, 214]].forEach(([x, y]) => { g += `<path d="M${x} ${y + 6}V336" stroke="#9aa3ad" stroke-width="4"/><path d="M${x - 14} 336L${x} ${y + 30}L${x + 14} 336" stroke="#9aa3ad" stroke-width="1.6" fill="none"/>`; });
    g += `<path d="${pth}" stroke="#55606c" stroke-width="10" fill="none"/><path d="${pth}" stroke="#c9ced4" stroke-width="3" fill="none" stroke-dasharray="2 8"/>`;
    const cart = (x, y, a) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-24 -6V-26H24V-6Z" fill="url(#${k}c)" stroke="#6e1c12"/><path d="M-20 -24H20" stroke="#fff" stroke-width="2" opacity=".35"/><circle cx="-14" cy="-3" r="5" fill="#22262e"/><circle cx="14" cy="-3" r="5" fill="#22262e"/><circle cx="-6" cy="-32" r="6" fill="#e8bf98"/><circle cx="8" cy="-32" r="6" fill="#e8bf98"/></g>`;
    g += cart(100, 96, 0) + T(100, 52, 'top: most GPE, least KE', { size: 12 }) + cart(360, 330, 0) + T(360, 356, 'bottom: most KE', { size: 12 });
    g += T(800, 120, 'E_k = ½ m v²', { size: 15, w: 700 }) + T(800, 160, 'E_p = m g h', { size: 15, w: 700 }) + T(800, 210, 'as it falls:', { size: 13 }) + T(800, 228, 'GPE lost = KE gained', { size: 13, w: 700 }) + T(800, 246, '(if no energy is wasted)', { size: 12 });
    return wrap(W, H, o.aria || 'A roller coaster transferring gravitational potential energy to kinetic energy', '', g);
  }

  function contamination2(o = {}) {
    const W = 920, H = 340, k = id('ct');
    let g = panelT(230, 'Irradiation', 'exposed to radiation from outside') + panelT(690, 'Contamination', 'radioactive atoms get onto or into the body');
    g += `<defs>${lg(k + 'pb', '#8a949c', '#3d4654')}</defs><rect x="70" y="190" width="80" height="62" rx="6" fill="url(#${k}pb)" stroke="#22262e"/><rect x="150" y="208" width="10" height="26" fill="#22262e"/>` + T(110, 226, 'source', { size: 11, w: 700, fill: '#fff' }) + `<path d="M110 196l-8 14h16z" fill="#ffd23a" stroke="#22262e" stroke-width=".8"/>`;
    g += [0, 1, 2].map(i => wavy(166, 208 + i * 10, 262, 200 + i * 18, '#b07cff', 2)).join('') + person3(310, 300, 1.25, '#3f7fd6', k + 'a');
    g += T(230, 324, 'stops when the source is removed; the person is not radioactive', { size: 12 });
    g += person3(690, 300, 1.25, '#3f7fd6', k + 'b') + [[680, 230], [702, 252], [690, 160], [674, 148], [712, 196], [668, 210]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#9bff5a" opacity=".35"/><circle cx="${x}" cy="${y}" r="3.5" fill="#6fd63a" stroke="#2c6e10" stroke-width=".8"/>`).join('');
    g += T(780, 190, 'radioactive particles', { size: 11, a: 'start' }) + `<path d="M776 186L716 196" stroke="currentColor" stroke-width="1"/>`;
    g += T(690, 324, 'continues until the material is removed or decays', { size: 12 });
    return wrap(W, H, o.aria || 'Irradiation compared with contamination by radioactive material', '', g);
  }

  function solarSystem2(o = {}) {
    const W = 980, H = 360, k = id('ss');
    let g = `<rect x="0" y="70" width="980" height="220" fill="#0b1026" rx="10"/>` + Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 157) % 960 + 10}" cy="${80 + (i * 61) % 200}" r="${i % 5 ? .9 : 1.5}" fill="#fff" opacity=".7"/>`).join('');
    g += `<defs><clipPath id="${k}pc"><rect x="0" y="70" width="980" height="220" rx="10"/></clipPath></defs><g clip-path="url(#${k}pc)">` + sun3(-40, 180, 130, k + 'sun') + '</g>';
    const P = [['Mercury', 6, '#d6cfc6', '#7d756c', 140], ['Venus', 10, '#f6e2b0', '#b8904a', 195], ['Earth', 11, '#6db3f2', '#1d4f9a', 255], ['Mars', 8, '#f08a5a', '#8e3a1c', 310], ['Jupiter', 34, '#f0d2b0', '#a8774c', 420], ['Saturn', 28, '#f6e6b8', '#b8975a', 560], ['Uranus', 18, '#c6f0f4', '#5aa8b8', 690], ['Neptune', 17, '#7a9cf6', '#2440a8', 810]];
    P.forEach(([n, r, c1, c2, x], i) => {
      let ex = '';
      if (n === 'Jupiter') ex = [-.5, -.2, .15, .45].map((b, j) => `<rect x="${x - r}" y="${f(180 + b * r)}" width="${2 * r}" height="${f(r * .12)}" fill="${j % 2 ? '#c99a6a' : '#b3805a'}" opacity=".7"/>`).join('') + `<ellipse cx="${x + r * .3}" cy="${180 + r * .3}" rx="${r * .18}" ry="${r * .1}" fill="#c2553a" opacity=".8"/>`;
      if (n === 'Earth') ex = earthLand(x, 180, r);
      if (n === 'Saturn') ex = [-.3, .1].map(b => `<rect x="${x - r}" y="${f(180 + b * r)}" width="${2 * r}" height="${f(r * .14)}" fill="#d9bf86" opacity=".7"/>`).join('');
      const ring = n === 'Saturn' ? (back) => `<ellipse cx="${x}" cy="180" rx="${r * 2}" ry="${r * .5}" fill="none" stroke="#e8d6a0" stroke-width="5" opacity=".9" ${back ? `clip-path="url(#${k}rb)"` : `clip-path="url(#${k}rf)"`}/>` : () => '';
      if (n === 'Saturn') g += `<defs><clipPath id="${k}rb"><rect x="${x - 70}" y="120" width="140" height="60"/></clipPath><clipPath id="${k}rf"><rect x="${x - 70}" y="180" width="140" height="60"/></clipPath></defs>`;
      g += ring(true) + planet3(x, 180, r, c1, c2, k + i, ex) + ring(false) + T(x, 180 + r + 26, n, { size: 13, w: 700, fill: '#e8ecf5' });
    });
    g += `<path d="M120 90H340" stroke="#e8ecf5" stroke-width="1.4"/>` + T(230, 84, 'rocky inner planets', { size: 12, fill: '#e8ecf5' }) + `<path d="M380 90H860" stroke="#e8ecf5" stroke-width="1.4"/>` + T(620, 84, 'gas and ice giants', { size: 12, fill: '#e8ecf5' });
    g += T(490, 36, 'The Solar System (sizes not to scale with distances)', { size: 15, w: 700 });
    g += T(490, 316, 'Light from the Sun takes about 8 minutes to reach Earth.', { size: 13 }) + T(490, 336, 'A light year is the distance light travels in a year: the nearest star is about 4 light years away.', { size: 12 });
    return wrap(W, H, o.aria || 'The eight planets of the Solar System in order from the Sun', '', g);
  }

  function seasons2(o = {}) {
    const W = 960, H = 400, k = id('se');
    let g = `<ellipse cx="480" cy="210" rx="330" ry="110" fill="none" stroke="currentColor" stroke-dasharray="5 6" opacity=".5"/>` + sun3(480, 210, 46, k + 's') + T(480, 284, 'Sun', { size: 12 });
    const earth = (x, y, lbl, sub, lit, i) => {
      // night side shading faces away from the Sun
      const sh = `<path d="M${x} ${y - 30}A30 30 0 0 ${lit > 0 ? 0 : 1} ${x} ${y + 30}Z" fill="#000" opacity=".45"/>`;
      return `<g transform="rotate(23 ${x} ${y})">${planet3(x, y, 30, '#6db3f2', '#1d4f9a', k + i, earthLand(x, y, 30))}${sh}<path d="M${x} ${y - 46}V${y + 46}" stroke="#fff" stroke-width="2.2"/><path d="M${x - 30} ${y}H${x + 30}" stroke="#ffe37a" stroke-width="1.5" opacity=".8"/></g>` + T(x, y + 62, lbl, { size: 13, w: 700 }) + T(x, y + 78, sub, { size: 11 });
    };
    g += earth(150, 210, 'June', 'UK summer: north tilted towards the Sun', 1, 'a') + earth(810, 210, 'December', 'UK winter: north tilted away', -1, 'b');
    g += [-1, 0, 1].map(d => arrow(420, 210 + d * 18, 200, 210 + d * 18, '#ffcc33', 1.8, 9) + arrow(540, 210 + d * 18, 760, 210 + d * 18, '#ffcc33', 1.8, 9)).join('');
    g += T(480, 36, 'Seasons happen because Earth’s axis is tilted (23°)', { size: 15, w: 700 });
    g += T(480, 60, 'Summer: Sun higher in the sky, longer days, light more concentrated. Not because Earth is closer!', { size: 12 });
    g += T(480, 384, 'a day = one spin on the axis (24 hours);  a year = one orbit of the Sun (365¼ days)', { size: 12 });
    return wrap(W, H, o.aria || 'Earth’s tilted axis at opposite sides of its orbit causing summer and winter', '', g);
  }

  // bar magnet with shading
  const barMagnet = (x, y, w, h, k) => `<defs>${lg(k + 'n', '#ff8a7a', '#b83a2c')}${lg(k + 's', '#7ab0f4', '#2457a8')}</defs>` + shadow(x + w / 2, y + h + 8, w / 2, 4) + `<rect x="${x}" y="${y}" width="${w / 2}" height="${h}" rx="4" fill="url(#${k}n)" stroke="#6e1c12"/><rect x="${x + w / 2}" y="${y}" width="${w / 2}" height="${h}" rx="4" fill="url(#${k}s)" stroke="#1d3d6e"/><rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="6" rx="3" fill="#fff" opacity=".3"/>` + T(x + w / 4, y + h / 2 + 7, 'N', { size: 18, w: 700, fill: '#fff' }) + T(x + 3 * w / 4, y + h / 2 + 7, 'S', { size: 18, w: 700, fill: '#fff' });
  // copper coil on a tube: back half dimmer, front half bright
  const coil3 = (x1, x2, cy, ry, n, k) => {
    let s = `<defs>${lg(k + 't', '#e9eef3', '#9aa3ad')}</defs><rect x="${x1 - 14}" y="${cy - ry + 8}" width="${x2 - x1 + 28}" height="${2 * ry - 16}" rx="6" fill="url(#${k}t)" opacity=".6"/>`;
    const dx = (x2 - x1) / (n - 1);
    for (let i = 0; i < n; i++) { const x = x1 + i * dx; s += `<path d="M${f(x)} ${cy - ry}A9 ${ry} 0 0 1 ${f(x + dx * .5)} ${cy + ry}" stroke="#8a4a14" stroke-width="3.5" fill="none" opacity=".8"/>`; }
    for (let i = 0; i < n; i++) { const x = x1 + i * dx; s += `<path d="M${f(x)} ${cy - ry}A9 ${ry} 0 0 0 ${f(x - dx * .5)} ${cy + ry}" stroke="#e08a3a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${f(x - 4)} ${cy - ry + 10}A7 ${ry - 10} 0 0 0 ${f(x - 8)} ${cy - 4}" stroke="#ffd2a0" stroke-width="1.6" fill="none"/>`; }
    return s;
  };
  const galvo = (x, y, r, k, ang = -30) => `<defs>${lg(k, '#4a5566', '#22262e')}</defs>` + shadow(x, y + r + 6, r, 4) + `<rect x="${x - r - 8}" y="${y - r - 4}" width="${2 * r + 16}" height="${2 * r + 14}" rx="8" fill="url(#${k})"/><path d="M${x - r + 4} ${y + 6}A${r - 4} ${r - 4} 0 0 1 ${x + r - 4} ${y + 6}Z" fill="#f4f1e6"/>` + Array.from({ length: 9 }, (_, i) => { const a = Math.PI + (i / 8) * Math.PI; return `<path d="M${f(x + Math.cos(a) * (r - 8))} ${f(y + 6 + Math.sin(a) * (r - 8))}L${f(x + Math.cos(a) * (r - 14))} ${f(y + 6 + Math.sin(a) * (r - 14))}" stroke="#22262e" stroke-width="1.2"/>`; }).join('') + `<text x="${x}" y="${y}" text-anchor="middle" font-size="9" style="fill:#22262e">0</text><path d="M${x} ${y + 6}L${f(x + Math.sin(ang * Math.PI / 180) * (r - 10))} ${f(y + 6 - Math.cos(ang * Math.PI / 180) * (r - 10))}" stroke="#d0342c" stroke-width="2.2"/><circle cx="${x}" cy="${y + 6}" r="3" fill="#22262e"/><circle cx="${x - r + 2}" cy="${y + r + 4}" r="4" fill="#d0342c"/><circle cx="${x + r - 2}" cy="${y + r + 4}" r="4" fill="#22262e"/>`;
  function induction2(o = {}) {
    const W = 940, H = 380, k = id('in');
    let g = barMagnet(100, 170, 170, 50, k + 'm') + arrow(130, 150, 250, 150, 'currentColor', 2.5) + T(190, 140, 'push the magnet in', { size: 12 });
    g += coil3(330, 520, 195, 48, 9, k + 'c');
    g += wire('M310 243V300H425M475 300H530V243') + galvo(450, 288, 30, k + 'g', 35) + T(450, 352, 'sensitive ammeter (galvanometer)', { size: 12 });
    g += T(470, 40, 'Electromagnetic induction', { size: 16, w: 700 }) + T(470, 62, 'a changing magnetic field through a coil induces a p.d.', { size: 13 });
    ['magnet still: no current', 'move faster, use a stronger magnet', 'or more turns: bigger p.d.', 'pull it out: the current reverses'].forEach((t, i) => { g += T(620, 130 + i * 24, t, { size: 13, a: 'start' }); });
    g += T(620, 240, "Faraday: ε = −N ΔΦ ÷ Δt", { size: 14, w: 700, a: 'start' }) + T(620, 266, 'Lenz: the induced current opposes', { size: 12, a: 'start' }) + T(620, 282, 'the change that made it', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Moving a magnet into a coil induces a current shown on a galvanometer', '', g);
  }

  function leverMoments2(o = {}) {
    const W = 920, H = 400, k = id('lm');
    let g = `<defs>${lg(k + 'p', '#b8c0c8', '#55606c', false)}${lg(k + 'w', '#d9ad70', '#9a7040')}</defs>`;
    g += shadow(440, 322, 70, 5) + `<path d="M440 262L404 320H476Z" fill="url(#${k}p)" stroke="#3d4654" stroke-width="1.5"/><rect x="396" y="318" width="88" height="6" rx="2" fill="#3d4654"/>`;
    g += `<rect x="120" y="246" width="640" height="16" rx="4" fill="url(#${k}w)" stroke="#6b4a26"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${140 + i * 80} 250q30 4 60 0" stroke="#8a6334" stroke-width="1" fill="none" opacity=".6"/>`).join('');
    g += massBlock(200, 246, 64, 66, '#6aa8f0', '#2457a8', k + 'a', '400 N') + arrow(200, 262, 200, 332, '#3f7fd6', 3.5);
    g += massBlock(685, 246, 52, 50, '#ff8a7a', '#b83a2c', k + 'b', '200 N') + arrow(685, 262, 685, 332, '#ef5b4c', 3.5);
    g += dbl(200, 150, 440, 150, 'currentColor', 1.6) + T(320, 140, '1.5 m', { size: 13, w: 700 }) + dbl(440, 150, 685, 150, 'currentColor', 1.6) + T(562, 140, '3.0 m', { size: 13, w: 700 });
    g += `<path d="M440 150V242" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>` + T(440, 344, 'pivot', { size: 13 });
    g += T(460, 40, 'Moment = force × distance from the pivot', { size: 16, w: 700 }) + T(460, 64, 'balanced when clockwise moments = anticlockwise moments', { size: 13 });
    g += T(200, 362, 'anticlockwise: 400 × 1.5 = 600 N m', { size: 13 }) + T(685, 362, 'clockwise: 200 × 3.0 = 600 N m', { size: 13 });
    g += T(460, 392, 'a longer lever lets a small force turn a big load', { size: 12 });
    return wrap(W, H, o.aria || 'A balanced see-saw showing clockwise and anticlockwise moments', '', g);
  }

  function centreOfMass2(o = {}) {
    const W = 920, H = 380, k = id('cm');
    let g = panelT(230, 'Finding the centre of mass', 'hang the shape from two points; draw the plumb lines') + panelT(690, 'Stability', 'topples when the line of action of weight passes outside the base');
    g += `<defs>${lg(k + 'c', '#f4e6c8', '#d9c296')}${lg(k + 'g', '#5fd29a', '#2a8a5a')}${lg(k + 'r', '#ff8a7a', '#b83a2c')}</defs>`;
    // clamp stand rod with a pin, card hanging from it
    g += `<rect x="96" y="96" width="70" height="8" rx="3" fill="#7d858f"/><circle cx="125" cy="115" r="4" fill="#3d4654"/>`;
    g += `<path d="M120 110L320 130L300 300L150 260Z" fill="url(#${k}c)" stroke="#a8915e" stroke-width="2"/><path d="M124 116L304 134L288 292L156 258Z" fill="none" stroke="#fff" stroke-width="1" opacity=".4"/><circle cx="125" cy="115" r="5" fill="#fff" stroke="#55606c"/><circle cx="315" cy="132" r="5" fill="#fff" stroke="#55606c"/>`;
    g += `<path d="M125 115L240 290" stroke="#ef5b4c" stroke-width="2" stroke-dasharray="6 4"/><path d="M315 132L170 240" stroke="#e0a64a" stroke-width="2" stroke-dasharray="6 4"/><path d="M125 115L125 200" stroke="#55606c" stroke-width="1.2"/><path d="M119 200h12l-6 12z" fill="#55606c"/><circle cx="214" cy="225" r="7" fill="currentColor"/>` + T(222, 246, 'centre of mass', { size: 12, a: 'start' }) + T(230, 340, 'a plumb line hangs straight down through the pivot', { size: 12 });
    g += `<rect x="520" y="300" width="380" height="10" rx="3" fill="#8f9aa6"/>`;
    g += `<g transform="rotate(-20 560 300)"><rect x="560" y="160" width="80" height="140" rx="3" fill="url(#${k}g)" stroke="#1f6a44" stroke-width="1.5"/><rect x="566" y="166" width="12" height="128" fill="#fff" opacity=".2"/></g><circle cx="574" cy="220" r="6" fill="currentColor"/>` + arrow(574, 220, 574, 318, '#ef5b4c', 2.5) + T(600, 340, 'stable: weight acts inside the base', { size: 12 });
    g += `<g transform="rotate(-42 790 300)"><rect x="790" y="160" width="80" height="140" rx="3" fill="url(#${k}r)" stroke="#6e1c12" stroke-width="1.5"/><rect x="796" y="166" width="12" height="128" fill="#fff" opacity=".2"/></g><circle cx="773" cy="221" r="6" fill="currentColor"/>` + arrow(773, 221, 773, 318, '#ef5b4c', 2.5) + T(800, 340, 'topples', { size: 12 });
    return wrap(W, H, o.aria || 'Finding the centre of mass with plumb lines, and stability of a tilted block', '', g);
  }

  function fusionFig2(o = {}) {
    const W = 920, H = 340, k = id('fu');
    // explicit layouts so the proton/neutron counts are right
    const draw = (x, y, list) => list.map(([a, b, p]) => nucleon(x + a, y + b, 14, p, k)).join('');
    let g = `<defs>${nucDefs(k)}<radialGradient id="${k}gl"><stop offset="0" stop-color="#fff2a8"/><stop offset=".4" stop-color="#ffb02e" stop-opacity=".8"/><stop offset="1" stop-color="#ff6a00" stop-opacity="0"/></radialGradient></defs>`;
    g += draw(110, 170, [[-8, 0, 1], [8, 0, 0]]) + T(110, 222, 'deuterium ²H', { size: 12 }) + T(190, 176, '+', { size: 22, w: 700 }) + draw(270, 170, [[-9, 6, 1], [9, 6, 0], [0, -9, 0]]) + T(270, 222, 'tritium ³H', { size: 12 }) + `<circle cx="385" cy="170" r="42" fill="url(#${k}gl)"/>` + arrow(340, 170, 430, 170, 'currentColor', 3);
    g += draw(510, 170, [[-9, -9, 1], [9, -9, 0], [-9, 9, 0], [9, 9, 1]]) + T(510, 222, 'helium ⁴He', { size: 12 }) + T(580, 176, '+', { size: 22, w: 700 }) + draw(640, 170, [[0, 0, 0]]) + arrow(660, 170, 700, 150, '#9aa3ad', 2) + T(640, 222, 'neutron', { size: 12 }) + T(720, 176, '+ 17.6 MeV', { size: 16, w: 700, a: 'start', fill: '#e0a64a' });
    g += T(460, 40, 'Nuclear fusion: light nuclei join to make a heavier nucleus', { size: 15, w: 700 });
    g += `<circle cx="760" cy="260" r="7" fill="url(#${k}p)"/>` + T(772, 264, 'proton', { size: 11, a: 'start' }) + `<circle cx="830" cy="260" r="7" fill="url(#${k}n)"/>` + T(842, 264, 'neutron', { size: 11, a: 'start' });
    g += T(460, 290, 'needs a very high temperature and density to overcome the electrostatic repulsion', { size: 12 }) + T(460, 310, 'the mass of the products is less than the mass of the reactants: energy = Δm c²', { size: 12 });
    return wrap(W, H, o.aria || 'Fusion of deuterium and tritium into helium and a neutron', '', g);
  }

  Object.assign(add, { resultantForce: resultantForce2, freeBody: freeBody2, massWeight: massWeight2, pressureArea: pressureArea2, collisions: collisions2, terminalVelocity: terminalVelocity2, keGpe: keGpe2, contamination: contamination2, solarSystem: solarSystem2, seasons: seasons2, induction: induction2, leverMoments: leverMoments2, centreOfMass: centreOfMass2, fusionFig: fusionFig2 });
  /* ---------- wave 13b: chemistry and general figures redrawn as lab-style pictures ---------- */
  const glassSheen = (x, y, h) => `<path d="M${f(x)} ${f(y + 6)}V${f(y + h - 10)}" stroke="#fff" stroke-width="2.5" opacity=".35" stroke-linecap="round"/>`;
  const tubeG = (x, y, h, liq, lvl = .6) => tubeV(x, y, h, liq || '#fff', liq ? lvl : 0, .55) + glassSheen(x - 9, y, h - 10);
  const bung = (x, y, w = 30) => `<path d="M${x - w / 2} ${y - 14}H${x + w / 2}L${x + w / 2 - 4} ${y + 6}H${x - w / 2 + 4}Z" fill="#c26b3a" stroke="#7a3a18"/><path d="M${x - w / 2 + 2} ${y - 10}H${x + w / 2 - 2}" stroke="#e8a070" stroke-width="2"/>`;
  const splint = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#d9b07a" stroke-width="6" stroke-linecap="round"/><path d="M${x1} ${y1}L${x2} ${y2}" stroke="#a87a45" stroke-width="1.2"/>`;
  const flameS = (x, y, s = 1, k) => `<path d="M${x} ${y}q${-10 * s} ${-12 * s} ${-2 * s} ${-30 * s}q${4 * s} ${10 * s} ${8 * s} ${8 * s}q${2 * s} ${-8 * s} ${-2 * s} ${-14 * s}q${14 * s} ${12 * s} ${8 * s} ${30 * s}q${-4 * s} ${8 * s} ${-12 * s} ${6 * s}z" fill="#ffb02e"/><path d="M${x} ${y - 2 * s}q${-4 * s} ${-8 * s} 0 ${-16 * s}q${5 * s} ${8 * s} 0 ${16 * s}z" fill="#fff2a8"/>`;
  const bubbles = (x, y, n, sp = 14) => Array.from({ length: n }, (_, i) => `<circle cx="${f(x + (i % 2 ? 3 : -3))}" cy="${f(y - i * sp)}" r="${f(2.5 + (i % 3))}" fill="none" stroke="#fff" stroke-width="1.3" opacity=".85"/>`).join('');
  const gauze = (x, y, w) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="5" rx="1" fill="url(#LGsteelV)"/>` + Array.from({ length: Math.floor(w / 6) }, (_, i) => `<path d="M${x - w / 2 + 3 + i * 6} ${y}v5" stroke="#55606c" stroke-width=".8"/>`).join('') + `<rect x="${x - w / 4}" y="${y}" width="${w / 2}" height="5" fill="#efe9dc" opacity=".9"/>`;

  function cracking2(o = {}) {
    const W = 960, H = 420, k = id('ck');
    let g = `<defs>${lg(k + 'g', '#eef6fa', '#b9d4e2')}</defs>`;
    g += bench(40, 920, 400);
    g += stand(200, 400, 250, 160, 200) + `<rect x="188" y="164" width="24" height="10" rx="3" fill="#55606c"/>`;
    // horizontal boiling tube with closed end on the left
    g += `<path d="M100 172H440V228H100Q76 228 76 200Q76 172 100 172Z" fill="url(#${k}g)" fill-opacity=".35" stroke="${GL}" stroke-width="3"/><path d="M96 180H430" stroke="#fff" stroke-width="2" opacity=".4"/>`;
    g += `<path d="M86 184Q82 200 86 216H150V184Z" fill="#f4f1e6"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${88 + i * 5} 186q3 14 -1 28" stroke="#d9c896" stroke-width="1.5" fill="none"/>`).join('')}<path d="M86 210H150V226H90Q84 222 86 210Z" fill="#e0c060" opacity=".6"/>`;
    g += Array.from({ length: 10 }, (_, i) => `<path d="M${270 + (i % 5) * 22} ${212 - Math.floor(i / 5) * 18}l8 -10 10 3 2 10 -9 6z" fill="#e8ecef" stroke="#9aa3ad"/>`).join('');
    g += `<rect x="436" y="182" width="22" height="36" rx="3" fill="#c26b3a" stroke="#7a3a18"/>`;
    g += bunsen(320, 360) + `<g transform="translate(0 0)">${Array.from({ length: 3 }, (_, i) => `<path d="M${308 + i * 12} 258q4 -10 0 -18" stroke="#ffb02e" stroke-width="1.5" fill="none" opacity=".7"/>`).join('')}</g>`;
    // delivery tube into a trough, gas collected in an inverted tube
    g += `<path d="M458 200H560V320" stroke="${GL}" stroke-width="6" fill="none"/><path d="M458 200H560V320" stroke="#fff" stroke-width="1.6" fill="none" opacity=".5"/>`;
    g += `<path d="M500 300V380Q500 392 512 392H800Q812 392 812 380V300" fill="${WATER}" fill-opacity=".35" stroke="${GL}" stroke-width="3"/><path d="M500 312H812" stroke="${WATER}" stroke-width="2"/>`;
    g += `<path d="M574 360V214Q574 196 592 196Q610 196 610 214V360" fill="#fff" fill-opacity=".08" stroke="${GL}" stroke-width="3"/><rect x="577" y="262" width="30" height="98" fill="${WATER}" opacity=".45"/>` + bubbles(566, 340, 3, 16) + bubbles(592, 250, 3, 14);
    g += T(118, 124, 'mineral wool soaked in', { size: 12 }) + T(118, 140, 'liquid paraffin (long alkanes)', { size: 12 }) + `<path d="M118 146V184" stroke="currentColor" stroke-width="1"/>` + T(316, 150, 'hot porous pot / catalyst', { size: 12 }) + `<path d="M316 156V190" stroke="currentColor" stroke-width="1"/>` + T(372, 336, 'heat strongly', { size: 12, a: 'start' });
    g += T(640, 230, 'gas collected over water:', { size: 12, a: 'start' }) + T(640, 246, 'shorter alkenes (decolourise', { size: 12, a: 'start' }) + T(640, 262, 'bromine water) and alkanes', { size: 12, a: 'start' });
    g += T(480, 50, 'Cracking: large alkanes → smaller, more useful alkanes + alkenes', { size: 16, w: 700 }) + T(480, 74, 'e.g. C₁₀H₂₂ → C₈H₁₈ + C₂H₄   (catalytic cracking or steam cracking)', { size: 14 });
    return wrap(W, H, o.aria || 'Laboratory cracking of liquid paraffin over a hot catalyst', '', g);
  }

  function gasTests2(o = {}) {
    const W = 1000, H = 400, k = id('gt');
    let g = T(500, 30, 'The four gas tests', { size: 17, w: 700 });
    const rack = `<rect x="40" y="318" width="920" height="14" rx="3" fill="url(#LGwood)"/><rect x="40" y="250" width="920" height="10" rx="3" fill="url(#LGwood)"/>`;
    g += rack;
    // hydrogen: inverted test tube of gas, lit splint at the mouth
    g += tubeG(125, 150, 170) + splint(128, 146, 200, 70) + flameS(126, 148, .9) + T(84, 112, 'POP!', { size: 18, w: 700, fill: '#e0a64a' }) + `<path d="M104 126l-10 -6M100 138l-14 0M112 116l-4 -12" stroke="#e0a64a" stroke-width="2"/>`;
    g += T(125, 360, 'Hydrogen', { size: 15, w: 700 }) + T(125, 380, 'lit splint: squeaky pop', { size: 12 });
    // oxygen: glowing splint inside the tube relights
    g += tubeG(375, 140, 180) + splint(375, 170, 440, 64) + flameS(375, 172, .8) + `<circle cx="375" cy="172" r="6" fill="#ff5a1f" opacity=".7"/>`;
    g += T(375, 360, 'Oxygen', { size: 15, w: 700 }) + T(375, 380, 'glowing splint relights', { size: 12 });
    // carbon dioxide: bubbled through limewater
    g += tubeG(625, 140, 180, '#e8ecef', .55) + `<path d="M560 80Q600 80 618 120V300" stroke="${GL}" stroke-width="5" fill="none"/><path d="M562 82Q600 82 616 120V300" stroke="#fff" stroke-width="1.2" fill="none" opacity=".5"/>` + bubbles(620, 296, 4, 18) + `<rect x="611" y="230" width="28" height="80" fill="#fff" opacity=".35"/>`;
    g += T(625, 360, 'Carbon dioxide', { size: 15, w: 700 }) + T(625, 380, 'limewater turns milky (cloudy)', { size: 12 });
    // chlorine: tongs holding damp litmus paper over the tube
    g += tubeG(875, 150, 170) + `<path d="M875 150q-10 -20 6 -30q14 -10 0 -24" stroke="#c9e88a" stroke-width="10" fill="none" opacity=".35"/>`;
    g += `<path d="M950 70L880 100M956 80L884 108" stroke="#7d858f" stroke-width="4" stroke-linecap="round"/><rect x="864" y="96" width="18" height="54" rx="2" fill="#f4f4f4" stroke="#ccc"/><rect x="864" y="96" width="18" height="22" rx="2" fill="#7aa8e0"/>`;
    g += T(875, 360, 'Chlorine', { size: 15, w: 700 }) + T(875, 380, 'damp litmus paper is bleached white', { size: 12 });
    return wrap(W, H, o.aria || 'Tests for hydrogen, oxygen, carbon dioxide and chlorine', '', g);
  }

  const conicalF = (x, by, w, h, liq, lvl = .35) => { const t = by - h, nw = 14; let s = ''; if (liq) { const ly = by - h * lvl * .9, hw = nw + (w / 2 - nw) * (1 - (ly - t - 20) / (h - 20)); s += `<path d="M${f(x - hw)} ${f(ly)}H${f(x + hw)}L${x + w / 2 - 4} ${by - 4}H${x - w / 2 + 4}Z" fill="${liq}" fill-opacity=".5"/>`; } return lgShadow(x, by + 2, w * .55, 4) + `<path d="M${x - nw} ${t}V${t + 20}L${x - w / 2} ${by - 4}Q${x - w / 2} ${by} ${x - w / 2 + 6} ${by}H${x + w / 2 - 6}Q${x + w / 2} ${by} ${x + w / 2} ${by - 4}L${x + nw} ${t + 20}V${t}Z" fill="url(#LGglass)"/>` + s + `<path d="M${x - nw} ${t}V${t + 20}L${x - w / 2} ${by - 4}Q${x - w / 2} ${by} ${x - w / 2 + 6} ${by}H${x + w / 2 - 6}Q${x + w / 2} ${by} ${x + w / 2} ${by - 4}L${x + nw} ${t + 20}V${t}" fill="none" stroke="${GL}" stroke-width="3"/>` + glassSheen(x - w / 2 + 14, by - h * .45, h * .4); };
  function separation2(o = {}) {
    const W = 1000, H = 460, k = id('sp');
    let g = bench(30, 970, 436);
    // filtration
    g += stand(70, 436, 260, 196, 126) + `<path d="M98 120H182L148 190V272H132V190Z" fill="#fff" fill-opacity=".08" stroke="${GL}" stroke-width="3"/><path d="M104 124H176L146 182H134Z" fill="#f6f2e4" stroke="#d9cfae"/><path d="M114 160H166L146 182H134Z" fill="#a98352"/>` + conicalF(140, 436, 110, 180, '#cfeaf7', .35) + `<path d="M140 276v60" stroke="#cfeaf7" stroke-width="2" stroke-dasharray="3 5"/>`;
    g += T(140, 60, 'Filtration', { size: 16, w: 700 }) + T(140, 82, 'separates an insoluble solid', { size: 12 }) + T(198, 150, 'residue', { size: 12, a: 'start' }) + `<path d="M196 146L156 166" stroke="currentColor" stroke-width="1"/>` + T(206, 412, 'filtrate', { size: 12, a: 'start' });
    // crystallisation: evaporating basin on gauze, tripod, bunsen
    g += `<path d="M310 260Q312 300 370 302Q428 300 430 260Z" fill="#f4f1ea" stroke="#c9c2b0" stroke-width="2.5"/><path d="M318 268Q326 294 370 296Q414 294 422 268Z" fill="#e0a64a" fill-opacity=".45"/>${[0, 1, 2, 3].map(i => `<path d="M${336 + i * 22} 278l7 -8 7 8 -7 8z" fill="#fff" stroke="#9fd4e6"/>`).join('')}` + gauze(370, 302, 140) + tripod(370, 307, 82, 120) + bunsen(370, 436) + `<path d="M350 250q6 -14 0 -26M370 246q6 -14 0 -26M390 250q6 -14 0 -26" stroke="#cfd5dc" stroke-width="2" fill="none" opacity=".8"/>`;
    g += T(370, 60, 'Crystallisation', { size: 16, w: 700 }) + T(370, 82, 'gets a soluble solid from a solution', { size: 12 }) + T(370, 196, 'heat to evaporate some water,', { size: 12 }) + T(370, 212, 'then leave to cool: crystals form', { size: 12 });
    // simple distillation
    g += stand(530, 436, 300, 230, 600) + rbFlask(600, 300, 46, '#e0a64a') + glassSheen(572, 270, 50) + `<rect x="589" y="190" width="22" height="20" rx="3" fill="#c26b3a"/>` + thermo(600, 150, 240, .5) + condenser(620, 222, 800, 292) + `<path d="M800 292L820 340" stroke="${GL}" stroke-width="5"/>`;
    g += `<path d="M676 262l-6 16M760 268l6 -16" stroke="${GL}" stroke-width="4"/>` + beaker(780, 340, 90, 90, .3) + gauze(600, 352, 110) + tripod(600, 357, 70, 100) + bunsen(600, 436);
    g += T(720, 60, 'Simple distillation', { size: 16, w: 700 }) + T(720, 82, 'separates a solvent from a solution', { size: 12 }) + T(614, 160, 'thermometer', { size: 12, a: 'start' }) + T(760, 214, 'condenser (cold water)', { size: 12, a: 'start' }) + T(880, 420, 'pure distillate', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'Filtration, crystallisation and simple distillation apparatus', '', g);
  }

  function rusting2(o = {}) {
    const W = 960, H = 420, k = id('ru');
    const tube = x => `<path d="M${x - 30} 90V320Q${x - 30} 352 ${x} 352Q${x + 30} 352 ${x + 30} 320V90" fill="#fff" fill-opacity=".06" stroke="${GL}" stroke-width="3"/>` + glassSheen(x - 20, 92, 230);
    const nail = (x, y1, y2, rust) => `<defs>${lg(k + x, '#d6dce2', '#7d858f', false, '#f4f7f9')}</defs><path d="M${x - 4} ${y1}V${y2 - 14}L${x} ${y2}L${x + 4} ${y2 - 14}V${y1}Z" fill="url(#${k + x})" stroke="#55606c" stroke-width="1"/><rect x="${x - 11}" y="${y1 - 6}" width="22" height="7" rx="2" fill="url(#${k + x})" stroke="#55606c"/>` + (rust ? [0, 1, 2, 3, 4, 5].map(i => `<ellipse cx="${x + (i % 2 ? 2 : -2)}" cy="${y1 + 18 + i * 22}" rx="${5 + (i % 3)}" ry="${7 + (i % 2) * 3}" fill="#b5541f" opacity=".85"/>`).join('') + `<rect x="${x - 11}" y="${y1 - 6}" width="12" height="7" fill="#b5541f" opacity=".7"/>` : '');
    let g = `<rect x="80" y="330" width="800" height="16" rx="4" fill="url(#LGwood)"/><rect x="80" y="160" width="800" height="12" rx="4" fill="url(#LGwood)"/>`;
    g += tube(160) + `<path d="M132 200H188V320Q188 346 160 346Q132 346 132 320Z" fill="${WATER}" opacity=".45"/>` + nail(160, 140, 300, true) + T(160, 380, 'Air and water', { size: 15, w: 700 }) + T(160, 400, 'nail rusts', { size: 13, fill: '#c8662a' });
    g += tube(480) + `<path d="M452 150H508V320Q508 346 480 346Q452 346 452 320Z" fill="${WATER}" opacity=".45"/><rect x="452" y="138" width="56" height="14" fill="#f0d24a" opacity=".85"/>` + bung(480, 92, 62) + nail(480, 160, 300, false) + T(480, 380, 'Boiled water + oil layer', { size: 15, w: 700 }) + T(480, 400, 'no air: no rust', { size: 13 }) + T(560, 146, 'oil stops air dissolving', { size: 12, a: 'start' }) + `<path d="M556 142L512 144" stroke="currentColor" stroke-width="1"/>`;
    g += tube(800) + `<path d="M772 268H828V320Q828 346 800 346Q772 346 772 320Z" fill="#f4f4f4" opacity=".5"/>` + Array.from({ length: 22 }, (_, i) => `<circle cx="${776 + (i * 13) % 48}" cy="${276 + Math.floor(i / 4) * 12}" r="5" fill="#fbfbfb" stroke="#c9ccd2"/>`).join('') + `<path d="M772 262H828" stroke="#9aa3ad" stroke-width="2" stroke-dasharray="3 3"/>` + bung(800, 92, 62) + nail(800, 120, 250, false) + T(800, 380, 'Dry air (calcium chloride)', { size: 15, w: 700 }) + T(800, 400, 'no water: no rust', { size: 13 }) + T(740, 296, 'drying agent', { size: 12, a: 'end' });
    g += T(480, 40, 'Iron rusts only when both oxygen (air) and water are present', { size: 16, w: 700 });
    return wrap(W, H, o.aria || 'Rusting experiment with nails in three test tubes', '', g);
  }

  function dnaExtraction2(o = {}) {
    const W = 980, H = 400, k = id('dn');
    let g = T(490, 36, 'Extracting DNA from strawberries', { size: 16, w: 700 }) + `<defs>${rg(k + 's', '#ff6a5a', '#b81c1c', .35, .3, .8)}</defs>`;
    const step = (x, n, t1, t2) => `<circle cx="${x}" cy="330" r="13" fill="#e0a64a"/>` + T(x, 335, String(n), { size: 13, w: 700, fill: '#1d2733' }) + T(x, 362, t1, { size: 12 }) + T(x, 378, t2, { size: 12 });
    // zip bag with a mashed strawberry
    g += `<path d="M66 120H174V290Q174 300 164 300H76Q66 300 66 290Z" fill="#e8f3f8" fill-opacity=".25" stroke="#b9cbd6" stroke-width="2.5"/><rect x="66" y="120" width="108" height="10" fill="#5aa9f0" opacity=".7"/><path d="M76 300Q90 230 120 236Q150 230 164 300Z" fill="#d83a3a" opacity=".55"/>`;
    g += `<path d="M120 170Q96 170 98 198Q104 240 120 252Q136 240 142 198Q144 170 120 170Z" fill="url(#${k}s)"/><path d="M106 168q14 -10 28 0l-6 -10 -8 6 -8 -6z" fill="#3f9a3a"/>${[[108, 190], [124, 186], [134, 204], [114, 214], [128, 226], [120, 238], [104, 204]].map(([x, y]) => `<path d="M${x} ${y}l1.5 -3 1.5 3z" fill="#ffe36a"/>`).join('')}` + step(120, 1, 'mash in a bag with', 'salt + washing-up liquid');
    // filter funnel into a beaker
    g += `<path d="M290 140H370L338 196V226H322V196Z" fill="#fff" fill-opacity=".08" stroke="${GL}" stroke-width="2.5"/><path d="M296 144H364L336 190H324Z" fill="#f6f2e4" stroke="#d9cfae"/><path d="M306 162H354L336 190H324Z" fill="#c23a4a" opacity=".7"/>` + beaker(290, 230, 80, 70, 0.5, '#e88aa0') + glassSheen(298, 232, 60) + step(330, 2, 'filter out the', 'solid pieces');
    // test tube with a pink layer and an ethanol layer with DNA
    g += tubeV(540, 110, 190, '#e88aa0', 0.45, 0.7) + `<path d="M526 210H554V164H526Z" fill="#e8f3f8" fill-opacity=".45"/>` + glassSheen(531, 112, 170) + `<path d="M540 208q-8 -8 -2 -16q8 -6 0 -14q-6 -8 2 -16" stroke="#fff" stroke-width="3" fill="none"/><path d="M534 200q10 -4 4 -14" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>`;
    g += `<path d="M610 108L560 156" stroke="${GL}" stroke-width="4"/><path d="M600 100h20v14h-20z" fill="#e8f3f8" stroke="${GL}"/>` + T(626, 120, 'ice-cold ethanol', { size: 12, a: 'start' }) + T(626, 136, 'poured gently down the side', { size: 12, a: 'start' }) + step(540, 3, 'add cold ethanol:', 'a layer forms on top');
    // glass rod spooling white strands
    g += `<path d="M800 96V250" stroke="#cfe0ea" stroke-width="7" stroke-linecap="round"/><path d="M797 100V246" stroke="#fff" stroke-width="2" opacity=".6"/><path d="M790 238q10 -8 20 0q-10 10 -20 16q12 6 20 14q-8 10 -16 22" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M786 246q-6 14 2 26M814 250q8 12 0 26" stroke="#f4f4f4" stroke-width="2" fill="none" opacity=".8"/>` + step(800, 4, 'white strands of DNA', 'collect on a rod');
    g += T(490, 70, 'detergent breaks down cell membranes; salt makes the DNA clump together', { size: 12 });
    return wrap(W, H, o.aria || 'Steps for extracting DNA from strawberries with salt, detergent and cold ethanol', '', g);
  }

  const car3 = (x, y, k, c1 = '#5b9be8', c2 = '#1d4f9a') => `<defs>${lg(k, c1, c2)}${lg(k + 'w', '#dfeefa', '#8fb4d0')}</defs>` + shadow(x + 190, y + 62, 200, 8) + `<path d="M${x} ${y + 40}Q${x} ${y} ${x + 40} ${y - 4}L${x + 110} ${y - 10}Q${x + 140} ${y - 58} ${x + 200} ${y - 60}H${x + 270}Q${x + 300} ${y - 58} ${x + 330} ${y - 10}L${x + 360} ${y - 4}Q${x + 384} ${y} ${x + 384} ${y + 30}V${y + 44}H${x}Z" fill="url(#${k})" stroke="#13305e" stroke-width="2"/><path d="M${x + 132} ${y - 12}Q${x + 154} ${y - 50} ${x + 196} ${y - 52}H${x + 228}V${y - 12}Z M${x + 240} ${y - 12}V${y - 52}H${x + 268}Q${x + 296} ${y - 50} ${x + 318} ${y - 12}Z" fill="url(#${k}w)" stroke="#13305e" stroke-width="1.5"/><path d="M${x + 16} ${y + 6}H${x + 370}" stroke="#fff" stroke-width="3" opacity=".25"/><rect x="${x + 360}" y="${y + 6}" width="20" height="10" rx="3" fill="#ffe680"/><rect x="${x + 2}" y="${y + 8}" width="14" height="10" rx="3" fill="#e2483a"/>` + [x + 80, x + 304].map(a => `<circle cx="${a}" cy="${y + 44}" r="26" fill="#22262e"/><circle cx="${a}" cy="${y + 44}" r="13" fill="#c9ced4"/><circle cx="${a}" cy="${y + 44}" r="4" fill="#55606c"/>`).join('');
  function pollutants2(o = {}) {
    const W = 960, H = 380, k = id('po');
    let g = T(480, 30, 'Pollutants from burning fuels', { size: 15, w: 700 });
    g += `<rect x="20" y="294" width="440" height="10" rx="3" fill="#55606c"/>` + `<g transform="translate(60 250) scale(.98)">${car3(0, 0, k)}</g>` + `<rect x="40" y="276" width="26" height="8" rx="3" fill="#7d858f"/>`;
    for (let i = 0; i < 6; i++) g += `<circle cx="${30 - i * 3}" cy="${268 - i * 16}" r="${8 + i * 3.5}" fill="#7d858f" opacity="${.55 - i * .07}"/><circle cx="${24 - i * 3}" cy="${264 - i * 16}" r="${5 + i * 2}" fill="#3d4654" opacity="${.35 - i * .04}"/>`;
    const P = [['Carbon monoxide (CO)', 'incomplete combustion; toxic: binds to haemoglobin', '#ef5b4c'], ['Soot (carbon particulates)', 'incomplete combustion; global dimming, lung damage', '#55606c'], ['Sulfur dioxide (SO₂)', 'sulfur in fuels; acid rain, breathing problems', '#e0a64a'], ['Oxides of nitrogen (NOₓ)', 'N₂ + O₂ in a hot engine; acid rain, breathing problems', '#9b7ad6'], ['Carbon dioxide (CO₂)', 'complete combustion; greenhouse gas', '#3fb27f']];
    P.forEach(([a, b, c], i) => { g += `<circle cx="500" cy="${90 + i * 56}" r="8" fill="${c}"/>` + T(518, 86 + i * 56, a, { size: 13, w: 700, a: 'start' }) + T(518, 104 + i * 56, b, { size: 12, a: 'start' }); });
    g += T(250, 340, 'catalytic converters change CO and NOₓ', { size: 12 }) + T(250, 356, 'into CO₂ and N₂', { size: 12 });
    return wrap(W, H, o.aria || 'Pollutants from burning fuels in a car engine and their effects', '', g);
  }

  // small icons for the energy stores, drawn in a 70 x 70 box centred on (x, y)
  const storeIcon = (n, x, y, k) => {
    switch (n) {
      case 'Kinetic': return `<defs>${rg(k + 'b', '#7ab0f4', '#1d4f9a')}</defs>${[0, 1, 2].map(i => `<path d="M${x - 34} ${y - 10 + i * 10}H${x - 14}" stroke="#7ab0f4" stroke-width="3" stroke-linecap="round" opacity="${.9 - i * .25}"/>`).join('')}<circle cx="${x + 6}" cy="${y}" r="20" fill="url(#${k}b)"/><path d="M${x - 6} ${y - 12}q8 -6 16 -2" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>`;
      case 'Gravitational': return `<rect x="${x - 14}" y="${y - 32}" width="28" height="22" rx="3" fill="#3fb27f" stroke="#1f6a44"/><path d="M${x - 30} ${y + 30}H${x + 30}" stroke="#7d858f" stroke-width="4"/>` + dbl(x - 26, y - 10, x - 26, y + 28, 'currentColor', 1.6) + T(x - 34, y + 14, 'h', { size: 13, a: 'end' });
      case 'Elastic': { let d = `M${x} ${y - 32}`; for (let i = 0; i < 8; i++) d += `L${x + (i % 2 ? 14 : -14)} ${y - 26 + i * 6}`; return `<path d="${d}L${x} ${y + 24}" stroke="#e0a64a" stroke-width="3" fill="none"/><rect x="${x - 12}" y="${y + 22}" width="24" height="12" rx="2" fill="#7d858f"/><rect x="${x - 26}" y="${y - 36}" width="52" height="5" fill="#55606c"/>`; }
      case 'Thermal': return `<path d="M${x - 22} ${y - 6}H${x + 16}V${y + 24}Q${x + 16} ${y + 32} ${x + 8} ${y + 32}H${x - 14}Q${x - 22} ${y + 32} ${x - 22} ${y + 24}Z" fill="#ef5b4c" stroke="#8e2418"/><path d="M${x + 16} ${y + 2}q14 0 14 10t-14 10" stroke="#8e2418" stroke-width="3" fill="none"/><path d="M${x - 12} ${y - 12}q6 -10 0 -20M${x - 2} ${y - 12}q6 -10 0 -20M${x + 8} ${y - 12}q6 -10 0 -20" stroke="#ef5b4c" stroke-width="2" fill="none" opacity=".8"/>`;
      case 'Chemical': return `<defs>${lg(k + 'c', '#c9a6f0', '#5a3a9a', false, '#e6d6fa')}</defs><rect x="${x - 14}" y="${y - 26}" width="28" height="56" rx="4" fill="url(#${k}c)" stroke="#3a2470"/><rect x="${x - 6}" y="${y - 32}" width="12" height="7" rx="2" fill="#9aa3ad"/>` + T(x, y - 8, '+', { size: 14, w: 700, fill: '#fff' }) + T(x, y + 22, '−', { size: 14, w: 700, fill: '#fff' });
      case 'Nuclear': { let s = `<defs>${nucDefs(k)}</defs>`; [[-6, -6, 1], [6, -6, 0], [-6, 6, 0], [6, 6, 1], [0, 0, 1], [-11, 0, 0], [11, 0, 1]].forEach(([a, b, p]) => { s += nucleon(x + a, y + b, 7, p, k); }); return `<ellipse cx="${x}" cy="${y}" rx="32" ry="12" fill="none" stroke="#d6c24a" stroke-width="1.5" opacity=".6"/>` + s; }
      case 'Magnetic': return `<path d="M${x - 24} ${y + 28}V${y - 4}Q${x - 24} ${y - 30} ${x} ${y - 30}Q${x + 24} ${y - 30} ${x + 24} ${y - 4}V${y + 28}H${x + 10}V${y - 4}Q${x + 10} ${y - 16} ${x} ${y - 16}Q${x - 10} ${y - 16} ${x - 10} ${y - 4}V${y + 28}Z" fill="#ef5b4c" stroke="#8e2418"/><rect x="${x - 24}" y="${y + 16}" width="14" height="12" fill="#e8ecef"/><rect x="${x + 10}" y="${y + 16}" width="14" height="12" fill="#e8ecef"/>`;
      case 'Electrostatic': return `<defs>${rg(k + 'e', '#ff9bd0', '#b8307a')}</defs><ellipse cx="${x - 12}" cy="${y - 6}" rx="16" ry="20" fill="url(#${k}e)"/><path d="M${x - 12} ${y + 14}q-4 10 2 18" stroke="#ccc" fill="none"/><ellipse cx="${x + 18}" cy="${y - 6}" rx="16" ry="20" fill="url(#${k}e)"/><path d="M${x + 18} ${y + 14}q4 10 -2 18" stroke="#ccc" fill="none"/>` + T(x - 12, y - 1, '−', { size: 16, w: 700, fill: '#fff' }) + T(x + 18, y - 1, '−', { size: 16, w: 700, fill: '#fff' });
    }
    return '';
  };
  function energyStores2(o = {}) {
    const W = 980, H = 380, k = id('es');
    let g = T(490, 32, 'Energy stores', { size: 16, w: 700 }) + T(490, 54, 'energy is transferred between stores by heating, by forces, by electricity or by light and sound', { size: 12 });
    const S8 = [['Kinetic', 'moving objects', '#3f7fd6'], ['Gravitational', 'objects raised up', '#3fb27f'], ['Elastic', 'stretched or squashed', '#e0a64a'], ['Thermal', 'hot objects', '#ef5b4c'], ['Chemical', 'food, fuels, batteries', '#9b7ad6'], ['Nuclear', 'atomic nuclei', '#d6c24a'], ['Magnetic', 'magnets attracting', '#5aa9f0'], ['Electrostatic', 'charges attracting', '#e07ab0']];
    S8.forEach(([t, s, c], i) => { const x = 40 + (i % 4) * 230, y = 80 + Math.floor(i / 4) * 130; g += `<rect x="${x}" y="${y}" width="210" height="110" rx="10" fill="${c}" opacity=".14" stroke="${c}"/>` + storeIcon(t, x + 52, y + 55, k + i) + T(x + 140, y + 50, t, { size: 14, w: 700 }) + T(x + 140, y + 70, s, { size: 11 }); });
    g += T(490, 364, 'example: a battery-powered toy car: chemical store → kinetic store (some wasted to thermal)', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'The eight energy stores with examples', '', g);
  }

  function changeTypes2(o = {}) {
    const W = 960, H = 400, k = id('cg');
    let g = panelT(240, 'Physical change', 'no new substance; usually easy to reverse') + panelT(720, 'Chemical change', 'a new substance forms; hard to reverse');
    g += `<defs>${lg(k + 'i', '#f4fbff', '#a8d8ee')}${lg(k + 'it', '#ffffff', '#d6f0fb')}<radialGradient id="${k}gl"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#cfe0ff" stop-opacity="0"/></radialGradient></defs>`;
    g += `<path d="M112 168L136 152H192L168 168Z" fill="url(#${k}it)" stroke="#8cc4dc"/><path d="M168 168H112V226H168Z" fill="url(#${k}i)" stroke="#8cc4dc"/><path d="M168 168L192 152V210L168 226Z" fill="#9fd0e6" stroke="#8cc4dc"/><path d="M120 176l10 10M146 196l12 -8" stroke="#fff" stroke-width="2" opacity=".8"/><ellipse cx="140" cy="232" rx="34" ry="5" fill="${WATER}" opacity=".5"/>`;
    g += arrow(206, 186, 270, 186, 'currentColor', 2.5) + arrow(270, 210, 206, 210, 'currentColor', 2.5) + beaker(290, 140, 100, 110, 0.5) + glassSheen(298, 146, 90);
    g += T(150, 256, 'ice', { size: 13 }) + T(340, 270, 'water', { size: 13 }) + T(238, 176, 'melt', { size: 11 }) + T(238, 232, 'freeze', { size: 11 });
    g += T(240, 320, 'also: dissolving, boiling, condensing', { size: 12 });
    // tongs holding burning magnesium ribbon above a heatproof mat
    g += `<rect x="520" y="262" width="150" height="10" rx="2" fill="#55606c"/><path d="M500 236L612 166M506 244L616 172" stroke="#9aa3ad" stroke-width="5" stroke-linecap="round"/><path d="M612 166L642 148" stroke="#c9ccd2" stroke-width="3"/><circle cx="644" cy="146" r="46" fill="url(#${k}gl)"/><circle cx="644" cy="146" r="10" fill="#fff"/>`;
    g += T(600, 296, 'magnesium burns', { size: 13 }) + T(600, 312, 'with a bright white flame', { size: 12 });
    g += arrow(700, 190, 760, 190, 'currentColor', 2.5) + `<rect x="770" y="226" width="110" height="10" rx="2" fill="#55606c"/><path d="M784 226Q790 200 812 198Q830 186 848 200Q868 204 868 226Z" fill="#f4f6f7" stroke="#c9ccd2"/>${[[800, 214], [820, 206], [840, 214], [856, 220]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#e2e6ea"/>`).join('')}` + T(825, 260, 'white powder:', { size: 13 }) + T(825, 276, 'magnesium oxide', { size: 13, w: 700 });
    g += T(720, 340, 'signs: colour change, fizzing, light, temperature change', { size: 12 });
    g += T(480, 384, 'magnesium + oxygen → magnesium oxide', { size: 14, w: 700 });
    return wrap(W, H, o.aria || 'Physical change (ice melting) compared with a chemical change (magnesium burning)', '', g);
  }

  function staticCharge2(o = {}) {
    const W = 960, H = 400, k = id('st');
    let g = panelT(250, 'Charging by rubbing', 'electrons move from the cloth to the balloon') + panelT(720, 'Charges and forces', 'like charges repel; opposite charges attract');
    g += `<defs>${rg(k + 'b', '#ff8a7a', '#b82a20', .35, .3, .8)}${lg(k + 'c', '#c3a6f0', '#6a48b0')}${rg(k + 'r', '#ff8a7a', '#c8372a')}${rg(k + 'u', '#7ab0f4', '#2457a8')}</defs>`;
    g += `<ellipse cx="200" cy="200" rx="70" ry="86" fill="url(#${k}b)"/><ellipse cx="174" cy="160" rx="16" ry="26" fill="#fff" opacity=".28" transform="rotate(-20 174 160)"/><path d="M200 286L190 300H210Z" fill="#9a2018"/><path d="M200 300Q186 330 206 362" stroke="#bbb" stroke-width="1.5" fill="none"/>` + [[-30, -30], [10, -50], [30, 0], [-20, 20], [20, 40], [-40, 60]].map(([dx, dy]) => T(200 + dx, 206 + dy, '−', { size: 20, w: 700, fill: '#fff' })).join('');
    g += `<path d="M300 140Q336 150 330 190Q322 230 340 280L380 300Q362 246 372 200Q382 150 352 118Z" fill="url(#${k}c)" opacity=".95"/><path d="M312 150Q332 170 326 200M344 132Q364 160 356 210M352 240q4 30 16 50" stroke="#4a2f88" stroke-width="1.5" fill="none" opacity=".6"/>` + [[340, 170], [352, 230], [348, 270]].map(([x, y]) => T(x, y, '+', { size: 18, w: 700, fill: '#fff' })).join('') + T(354, 330, 'cloth', { size: 12 }) + T(260, 384, 'balloon gains electrons: negative; cloth loses electrons: positive', { size: 12 });
    const ball = (x, y, s) => `<circle cx="${x}" cy="${y}" r="22" fill="url(#${k}${s === '+' ? 'r' : 'u'})"/><circle cx="${x - 7}" cy="${y - 8}" r="6" fill="#fff" opacity=".3"/>` + T(x, y + 7, s, { size: 20, w: 700, fill: '#fff' });
    const pair = (y, a, b, rep) => ball(640, y, a) + ball(800, y, b) + (rep ? arrow(612, y, 572, y, 'currentColor', 2.5) + arrow(828, y, 868, y, 'currentColor', 2.5) + T(720, y + 5, 'repel', { size: 13, w: 700 }) : arrow(668, y, 708, y, 'currentColor', 2.5) + arrow(772, y, 732, y, 'currentColor', 2.5) + T(720, y + 34, 'attract', { size: 13, w: 700 }));
    g += pair(130, '+', '+', true) + pair(210, '−', '−', true) + pair(290, '+', '−', false);
    g += T(720, 370, 'a charged object is surrounded by an electric field', { size: 12 });
    return wrap(W, H, o.aria || 'Charging a balloon by rubbing, and how like and unlike charges repel and attract', '', g);
  }

  function colourFilters2(o = {}) {
    const W = 940, H = 340, k = id('cf');
    let g = panelT(240, 'White light through a prism', 'splits into a spectrum') + panelT(700, 'Coloured filters and objects', 'absorb some colours, let others through');
    g += `<defs>${lg(k + 'p', '#f4fbff', '#9fc4d8', false)}${rg(k + 'r', '#ff7a6a', '#a81c1c', .35, .3, .8)}${lg(k + 'f', '#ff5a4a', '#c81c1c', false)}</defs>`;
    ['#ff2a2a', '#ff8a2a', '#ffe02a', '#3ad04a', '#2a8aff', '#5a3aff', '#8a2aff'].forEach((c, i) => { g += `<path d="M292 200L440 ${150 + i * 18}" stroke="${c}" stroke-width="4" opacity=".9"/>`; });
    g += `<path d="M60 200L232 188" stroke="#fff" stroke-width="5"/><path d="M60 200L232 188" stroke="#ffe" stroke-width="12" opacity=".15"/><path d="M190 260L260 120L330 260Z" fill="url(#${k}p)" fill-opacity=".55" stroke="#8fb4cc" stroke-width="2.5"/><path d="M204 252L260 140" stroke="#fff" stroke-width="2" opacity=".6"/><path d="M232 188L292 200" stroke="#fff" stroke-width="3" opacity=".7"/>`;
    g += `<path d="M520 200H622" stroke="#fff" stroke-width="5"/><rect x="616" y="142" width="32" height="116" rx="3" fill="#3d4654"/><rect x="622" y="150" width="20" height="100" fill="url(#${k}f)" opacity=".85"/><rect x="626" y="154" width="4" height="92" fill="#fff" opacity=".35"/><path d="M648 200H760" stroke="#ff2a2a" stroke-width="5"/>` + T(632, 280, 'red filter: only red passes', { size: 12 });
    g += shadow(830, 236, 26, 4) + `<circle cx="830" cy="200" r="30" fill="url(#${k}r)"/>` + T(830, 270, 'red object: reflects red,', { size: 12 }) + T(830, 286, 'absorbs other colours', { size: 12 });
    g += T(470, 324, 'opaque objects reflect some colours; white reflects all; black absorbs all', { size: 12 });
    return wrap(W, H, o.aria || 'A prism splitting white light, and how filters and coloured objects work', '', g);
  }

  Object.assign(add, { cracking: cracking2, gasTests: gasTests2, separation: separation2, rusting: rusting2, dnaExtraction: dnaExtraction2, pollutants: pollutants2, energyStores: energyStores2, changeTypes: changeTypes2, staticCharge: staticCharge2, colourFilters: colourFilters2 });

  const resIcon = (n, x, y, k) => {
    switch (n) {
      case 'Coal': return [[-14, 8, 12], [8, 10, 13], [-2, -6, 12], [16, -4, 9]].map(([a, b, r]) => `<path d="M${x + a - r} ${y + b}l${r * .4} ${-r}l${r} ${-r * .2}l${r * .7} ${r * .8}l${-r * .3} ${r}l${-r} ${r * .3}z" fill="#2a2e35" stroke="#55606c"/>`).join('') + `<path d="M${x - 8} ${y - 10}l6 -4" stroke="#9aa3ad" stroke-width="1.5"/>`;
      case 'Oil': return `<defs>${lg(k + 'o', '#55606c', '#1f2227', false, '#7d858f')}</defs><rect x="${x - 16}" y="${y - 22}" width="32" height="44" rx="4" fill="url(#${k}o)"/><path d="M${x - 16} ${y - 8}H${x + 16}M${x - 16} ${y + 8}H${x + 16}" stroke="#9aa3ad" stroke-width="2"/><path d="M${x + 22} ${y - 6}q6 10 0 16q-6 -6 0 -16z" fill="#1f2227" stroke="#7d858f"/>`;
      case 'Natural gas': return `<rect x="${x - 20}" y="${y + 14}" width="40" height="8" rx="2" fill="#7d858f"/>` + [-12, 0, 12].map(a => `<path d="M${x + a - 5} ${y + 14}Q${x + a - 6} ${y} ${x + a} ${y - 14}Q${x + a + 6} ${y} ${x + a + 5} ${y + 14}Z" fill="#4f9bff"/><path d="M${x + a - 2} ${y + 14}Q${x + a - 2} ${y + 6} ${x + a} ${y}Q${x + a + 2} ${y + 6} ${x + a + 2} ${y + 14}Z" fill="#bfe0ff"/>`).join('');
      case 'Nuclear': return `<defs>${lg(k + 'n', '#e6eaee', '#9aa3ad', false)}</defs><path d="M${x - 20} ${y + 22}Q${x - 10} ${y} ${x - 16} ${y - 14}H${x + 16}Q${x + 10} ${y} ${x + 20} ${y + 22}Z" fill="url(#${k}n)" stroke="#7d858f"/><circle cx="${x - 6}" cy="${y - 22}" r="8" fill="#e6eaee" stroke="#b9c2ca"/><circle cx="${x + 6}" cy="${y - 26}" r="10" fill="#eef1f4" stroke="#b9c2ca"/>`;
      case 'Solar': return `<defs>${lg(k + 's', '#3a6ab8', '#16305e')}</defs><path d="M${x - 24} ${y + 14}L${x - 14} ${y - 12}H${x + 26}L${x + 16} ${y + 14}Z" fill="url(#${k}s)" stroke="#9aa3ad"/><path d="M${x - 19} ${y + 1}H${x + 21}M${x - 4} ${y - 12}L${x - 9} ${y + 14}M${x + 10} ${y - 12}L${x + 4} ${y + 14}" stroke="#9fc4ec" stroke-width="1"/><path d="M${x} ${y + 14}V${y + 24}" stroke="#7d858f" stroke-width="3"/>`;
      case 'Wind': return `<path d="M${x - 3} ${y + 26}L${x - 1} ${y - 8}H${x + 1}L${x + 3} ${y + 26}Z" fill="#dfe4e8" stroke="#7d858f"/>` + [0, 120, 240].map(a => `<path d="M${x} ${y - 8}L${f(x + Math.cos((a - 90) * Math.PI / 180) * 22)} ${f(y - 8 + Math.sin((a - 90) * Math.PI / 180) * 22)}" stroke="#7d858f" stroke-width="6" stroke-linecap="round"/><path d="M${x} ${y - 8}L${f(x + Math.cos((a - 90) * Math.PI / 180) * 21)} ${f(y - 8 + Math.sin((a - 90) * Math.PI / 180) * 21)}" stroke="#f4f7f9" stroke-width="3.5" stroke-linecap="round"/>`).join('') + `<circle cx="${x}" cy="${y - 8}" r="4" fill="#55606c"/>`;
      case 'Hydroelectric': return `<path d="M${x - 26} ${y - 16}H${x - 6}L${x + 2} ${y + 22}H${x - 26}Z" fill="#3f7fd6" opacity=".7"/><path d="M${x - 6} ${y - 18}L${x + 6} ${y - 18}L${x + 14} ${y + 22}H${x}Z" fill="#9aa3ad" stroke="#55606c"/><path d="M${x + 14} ${y + 14}q8 -2 14 6" stroke="#5aa9f0" stroke-width="3" fill="none"/>`;
      case 'Tidal and wave': return [0, 1, 2].map(i => `<path d="M${x - 26} ${y - 10 + i * 12}q6 -6 13 0t13 0t13 0t13 0" stroke="${i ? '#3fa8a8' : '#9fe0e0'}" stroke-width="3" fill="none"/>`).join('');
      case 'Geothermal': return `<path d="M${x - 26} ${y + 22}V${y + 6}Q${x} ${y - 2} ${x + 26} ${y + 6}V${y + 22}Z" fill="#8a5a3a"/><path d="M${x - 26} ${y + 16}H${x + 26}" stroke="#ef5b4c" stroke-width="3"/><path d="M${x - 4} ${y + 2}q-6 -10 0 -18q6 -8 0 -16M${x + 8} ${y + 2}q-6 -10 0 -18" stroke="#b9c2ca" stroke-width="3" fill="none"/>`;
      case 'Biofuel': return `<path d="M${x - 4} ${y + 22}Q${x - 26} ${y + 2} ${x - 8} ${y - 22}Q${x + 14} ${y - 8} ${x - 4} ${y + 22}Z" fill="#3fb27f" stroke="#1f6a44"/><path d="M${x - 4} ${y + 18}Q${x - 10} ${y} ${x - 8} ${y - 16}" stroke="#1f6a44" fill="none"/><path d="M${x + 14} ${y - 2}q8 12 0 18q-8 -6 0 -18z" fill="#e0a64a"/>`;
    }
    return '';
  };
  function energyResources2(o = {}) {
    const W = 980, H = 400, k = id('er');
    let g = panelT(250, 'Non-renewable', 'will run out; fossil fuels release carbon dioxide') + panelT(730, 'Renewable', 'will not run out; may depend on the weather');
    const tl = (x, y, w, c) => `<rect x="${x}" y="${y}" width="${w}" height="100" rx="10" fill="${c}" opacity=".16" stroke="${c}"/>`;
    [['Coal', '#3d4654'], ['Oil', '#55606c'], ['Natural gas', '#5aa9f0'], ['Nuclear', '#d6c24a']].forEach(([t, c], i) => { const x = 60 + (i % 2) * 200, y = 90 + Math.floor(i / 2) * 120; g += tl(x, y, 180, c) + resIcon(t, x + 40, y + 52, k + i) + T(x + 116, y + 40, t, { size: 14, w: 700 }) + (i < 3 ? T(x + 116, y + 60, 'burned in', { size: 11 }) + T(x + 116, y + 74, 'power stations', { size: 11 }) : T(x + 116, y + 60, 'no CO₂,', { size: 11 }) + T(x + 116, y + 74, 'radioactive waste', { size: 11 })); });
    [['Solar', '#f5c84a'], ['Wind', '#9fd4e6'], ['Hydroelectric', '#3f7fd6'], ['Tidal and wave', '#2a9a9a'], ['Geothermal', '#ef5b4c'], ['Biofuel', '#3fb27f']].forEach(([t, c], i) => { const x = 530 + (i % 3) * 140, y = 90 + Math.floor(i / 3) * 120; g += tl(x, y, 130, c) + resIcon(t, x + 65, y + 64, k + 'r' + i) + T(x + 65, y + 24, t, { size: 13, w: 700 }); });
    g += T(490, 370, 'most electricity is made by turning a turbine, which turns a generator', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'Renewable and non-renewable energy resources', '', g);
  }
  add.energyResources = energyResources2;
  /* ---------- wave 14: remaining simple biology / KS3 figures redrawn with shading ---------- */
  const rbc3 = (x, y, k, s = 1) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(11 * s)}" ry="${f(7.5 * s)}" fill="url(#${k}rbc)" stroke="#8e1a1a" stroke-width=".8"/><ellipse cx="${f(x)}" cy="${f(y + .5)}" rx="${f(4.5 * s)}" ry="${f(2.8 * s)}" fill="#9e1e1e" opacity=".55"/><ellipse cx="${f(x - 4 * s)}" cy="${f(y - 3 * s)}" rx="${f(3 * s)}" ry="${f(1.5 * s)}" fill="#fff" opacity=".35"/>`;
  const rbcDefs = k => rg(k + 'rbc', '#ff7a6a', '#b51f1f', .4, .35, .8);

  function bloodVessels2(o = {}) {
    const W = 960, H = 380, cy = 170, k = id('bv');
    let g = `<defs>${rbcDefs(k)}${rg(k + 'aw', '#f2a090', '#b8483c', .4, .35, .75)}${rg(k + 'am', '#f6c8b8', '#d8836e', .4, .35, .8)}${rg(k + 'bl', '#e04a3a', '#7a1414', .4, .4, .8)}${rg(k + 'vw', '#b9c6ec', '#5a6fb0', .4, .35, .8)}${rg(k + 'vb', '#a8445a', '#4a1426', .4, .4, .8)}${lg(k + 'cp', '#f7c8c0', '#e08a80')}</defs>`;
    // artery: thick layered wall, narrow lumen
    g += shadow(160, cy + 106, 96, 8, .25) + `<circle cx="160" cy="${cy}" r="100" fill="url(#${k}aw)" stroke="#8e2f28" stroke-width="2"/><circle cx="160" cy="${cy}" r="82" fill="url(#${k}am)"/>`;
    for (let i = 0; i < 28; i++) { const a = i * Math.PI / 14; g += `<path d="M${f(160 + Math.cos(a) * 70)} ${f(cy + Math.sin(a) * 70)}Q${f(160 + Math.cos(a + .1) * 76)} ${f(cy + Math.sin(a + .1) * 76)} ${f(160 + Math.cos(a + .2) * 72)} ${f(cy + Math.sin(a + .2) * 72)}" stroke="#c2604e" stroke-width="1.5" fill="none" opacity=".6"/>`; }
    g += `<circle cx="160" cy="${cy}" r="66" fill="none" stroke="#e8b0a0" stroke-width="5" opacity=".7"/><circle cx="160" cy="${cy}" r="34" fill="#f8e0d8"/><circle cx="160" cy="${cy}" r="30" fill="url(#${k}bl)"/>` + rbc3(152, cy - 6, k) + rbc3(168, cy + 8, k);
    // vein: thin wall, wide lumen, valve flaps
    g += shadow(480, cy + 86, 108, 8, .25) + `<ellipse cx="480" cy="${cy}" rx="110" ry="80" fill="url(#${k}vw)" stroke="#3f4f8a" stroke-width="2"/><ellipse cx="480" cy="${cy}" rx="96" ry="66" fill="url(#${k}vb)"/><path d="M400 ${cy - 52}Q440 ${cy} 480 ${cy - 4}Q444 ${cy - 10} 410 ${cy - 46}Z M560 ${cy - 52}Q520 ${cy} 480 ${cy - 4}Q516 ${cy - 10} 550 ${cy - 46}Z" fill="#e6ebf8" stroke="#a9b6dc" stroke-width="1.5"/>` + rbc3(450, cy + 20, k) + rbc3(510, cy + 30, k) + rbc3(480, cy + 42, k);
    // capillary: tube one cell thick with endothelial cells
    g += `<rect x="700" y="${cy - 26}" width="220" height="52" rx="26" fill="url(#${k}cp)" stroke="#c8685e" stroke-width="2"/>${[0, 1, 2, 3, 4].map(i => `<ellipse cx="${730 + i * 42}" cy="${cy - 22}" rx="18" ry="4" fill="#e9a49a" stroke="#c8685e" stroke-width=".8"/><circle cx="${730 + i * 42}" cy="${cy - 22}" r="2.2" fill="#9a4a5a"/><ellipse cx="${740 + i * 42}" cy="${cy + 22}" rx="18" ry="4" fill="#e9a49a" stroke="#c8685e" stroke-width=".8"/><circle cx="${740 + i * 42}" cy="${cy + 22}" r="2.2" fill="#9a4a5a"/>`).join('')}<rect x="708" y="${cy - 16}" width="204" height="32" rx="16" fill="#f9e4de"/>` + [740, 790, 840, 880].map(x => rbc3(x, cy, k, .95)).join('');
    g += `<path d="M720 ${cy - 26}v-30M860 ${cy + 26}v30" stroke="#ffd84a" stroke-width="2"/>` + arrow(720, cy - 40, 720, cy - 70, '#ffd84a', 2, 8) + arrow(860, cy + 40, 860, cy + 70, '#ffd84a', 2, 8) + T(728, cy - 72, 'O₂', { size: 12, a: 'start' }) + T(868, cy + 74, 'CO₂', { size: 12, a: 'start' });
    const lab = (x, t, a) => T(x, 300, t, { size: 16, w: 700 }) + a.map((s, i) => T(x, 322 + i * 18, s, { size: 13 })).join('');
    g += lab(160, 'Artery', ['thick muscular, elastic wall', 'narrow lumen; high pressure', 'carries blood away from the heart']) + lab(480, 'Vein', ['thin wall, large lumen', 'valves stop blood flowing backwards', 'carries blood back to the heart']) + lab(810, 'Capillary', ['wall one cell thick', 'short diffusion distance', 'substances exchanged with cells']);
    g += T(160, 56, 'elastic fibres and muscle', { size: 12 }) + T(480, 82, 'valve', { size: 12 });
    return wrap(W, H, o.aria || 'Cross-sections of an artery, a vein and a capillary', '', g);
  }

  const bact3 = (x, y, a, k) => `<g transform="rotate(${a} ${f(x)} ${f(y)})"><path d="M${f(x + 16)} ${f(y)}q12 -4 18 4t16 0" stroke="#7a5a2a" stroke-width="1.2" fill="none"/><rect x="${f(x - 17)}" y="${f(y - 8.5)}" width="34" height="17" rx="8.5" fill="url(#${k}bac)" stroke="#5a4218" stroke-width="1"/><rect x="${f(x - 12)}" y="${f(y - 6)}" width="20" height="4" rx="2" fill="#fff" opacity=".3"/></g>`;
  const antibody = (x, y, a, c = '#e0a64a') => `<g transform="rotate(${a} ${f(x)} ${f(y)})"><path d="M${f(x)} ${f(y + 14)}V${f(y)}l-9 -12M${f(x)} ${f(y)}l9 -12" stroke="#8a5a10" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${f(x)} ${f(y + 14)}V${f(y)}l-9 -12M${f(x)} ${f(y)}l9 -12" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;
  function phagocytosis2(o = {}) {
    const W = 980, H = 380, k = id('ph');
    let g = `<defs>${rg(k + 'cy', '#ffffff', '#d6cfe8', .4, .35, .85)}${rg(k + 'nu', '#a77ee0', '#4e2490', .35, .3, .8)}${rg(k + 'bac', '#c9a466', '#7a5a2a', .4, .35, .8)}${rg(k + 'ly', '#ffffff', '#cfd8ec', .4, .35, .85)}</defs>`;
    g += shadow(190, 236, 110, 8, .2) + `<path d="M150 120C220 90 300 120 300 190C300 220 280 230 250 220C230 214 230 180 210 180C190 180 190 214 170 220C130 236 80 220 80 180C80 140 110 130 150 120Z" fill="url(#${k}cy)" stroke="#9e95bc" stroke-width="2.5"/><path d="M128 160q8 -26 30 -14q14 -18 28 -2q16 4 8 22q-10 18 -28 8q-22 12 -34 -4q-10 -6 -4 -10z" fill="url(#${k}nu)"/>${[[110, 200], [140, 214], [262, 150], [276, 176], [230, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#c9b8e8" opacity=".8"/>`).join('')}` + bact3(210, 205, 0, k) + `<circle cx="250" cy="160" r="24" fill="#e8e0f4" stroke="#c9a06a" stroke-dasharray="4 4"/>` + bact3(250, 160, 30, k);
    g += T(190, 290, '1. Phagocytosis', { size: 15, w: 700 }) + T(190, 310, 'white blood cells engulf', { size: 12 }) + T(190, 326, 'and digest pathogens', { size: 12 });
    g += shadow(470, 244, 56, 6, .2) + `<circle cx="470" cy="180" r="56" fill="url(#${k}ly)" stroke="#9e95bc" stroke-width="2.5"/><circle cx="470" cy="180" r="40" fill="url(#${k}nu)"/><ellipse cx="456" cy="166" rx="12" ry="7" fill="#fff" opacity=".18"/>`;
    for (let i = 0; i < 5; i++) { const a = -1 + i * 0.5; g += antibody(470 + Math.cos(a) * 90, 180 + Math.sin(a) * 90, f(a * 57 + 90)); }
    g += T(470, 290, '2. Antibodies', { size: 15, w: 700 }) + T(470, 310, 'lymphocytes make antibodies that', { size: 12 }) + T(470, 326, 'fit the antigens on one pathogen', { size: 12 });
    for (let i = 0; i < 4; i++) g += bact3(720 + (i % 2) * 40, 150 + Math.floor(i / 2) * 40, i * 30, k);
    g += [[740, 170], [760, 150], [740, 130], [760, 190]].map(([x, y]) => antibody(x, y, 0)).join('');
    g += T(750, 290, '3. Antibodies clump pathogens', { size: 15, w: 700 }) + T(750, 310, 'together; antitoxins neutralise', { size: 12 }) + T(750, 326, 'the toxins pathogens release', { size: 12 });
    g += T(490, 40, 'How white blood cells defend the body', { size: 17, w: 700 });
    return wrap(W, H, o.aria || 'Phagocytosis, antibody production and clumping of pathogens', '', g);
  }

  function earFig2(o = {}) {
    const W = 920, H = 420, k = id('ea');
    let g = `<defs>${rg(k + 'sk', '#f6d2b8', '#c98a68', .35, .35, .9)}${lg(k + 'cn', '#7a4a3a', '#3a2018')}${rg(k + 'bn', '#ffffff', '#d9cfae', .35, .3, .8)}${rg(k + 'co', '#f6c4d4', '#c8607e', .4, .4, .8)}${lg(k + 'sc', '#d6ecff', '#7fb2e0')}</defs>`;
        g += `<path d="M150 120Q90 120 90 200Q90 270 140 300Q170 315 175 260Q178 230 200 220Z" fill="url(#${k}sk)" stroke="#a8684a" stroke-width="2"/><path d="M140 140Q108 150 110 200Q112 250 142 276" stroke="#a8684a" stroke-width="2" fill="none" opacity=".6"/>`;
    g += `<path d="M188 186H332V214H188Z" fill="url(#${k}cn)"/><path d="M188 186H332M188 214H332" stroke="#a8684a" stroke-width="3"/>`;
    g += `<ellipse cx="336" cy="200" rx="5" ry="30" fill="#f6e2bc" stroke="#c9a46a" stroke-width="1.5"/>`;
    g += `<path d="M341 196Q356 182 372 190L384 198" stroke="#c9b88a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M341 196Q356 182 372 190L384 198" stroke="url(#${k}bn)" stroke-width="6.5" fill="none" stroke-linecap="round"/><path d="M384 196Q396 184 406 194Q404 206 398 210" stroke="#c9b88a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M384 196Q396 184 406 194Q404 206 398 210" stroke="url(#${k}bn)" stroke-width="5.5" fill="none" stroke-linecap="round"/><path d="M406 200H418M410 188V212M422 188V212" stroke="#c9b88a" stroke-width="5"/><path d="M406 200H418M410 188V212M422 188V212" stroke="#f4ecd8" stroke-width="2.5"/>`;
    g += `<path d="M430 140Q480 70 540 110M440 150Q500 100 545 140M455 132Q470 76 510 86" stroke="#4f86c4" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M430 140Q480 70 540 110M440 150Q500 100 545 140M455 132Q470 76 510 86" stroke="url(#${k}sc)" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    g += `<path d="M425 200Q460 140 520 150Q560 160 540 210Q520 250 470 230Q440 220 455 195Q470 180 490 195Q500 208 486 214" fill="none" stroke="#a84a66" stroke-width="20" stroke-linecap="round"/><path d="M425 200Q460 140 520 150Q560 160 540 210Q520 250 470 230Q440 220 455 195Q470 180 490 195Q500 208 486 214" fill="none" stroke="url(#${k}co)" stroke-width="15" stroke-linecap="round"/><path d="M450 170Q480 150 512 156" stroke="#fff" stroke-width="2.5" fill="none" opacity=".45"/>`;
    g += `<path d="M545 200Q600 200 640 230" stroke="#c9a030" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M545 200Q600 200 640 230" stroke="#f6d870" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    for (let i = 0; i < 3; i++) g += `<path d="M${40 + i * 14} ${180 + i * 2}q6 20 0 40" stroke="#5aa9f0" stroke-width="2.5" fill="none"/>`;
    const labs = [{ x: 120, y: 160, t: 'Outer ear: funnels sound in', side: 'l', ly: 100 }, { x: 260, y: 200, t: 'Ear canal', side: 'l', ly: 330 }, { x: 337, y: 200, t: 'Eardrum vibrates', side: 'r', ly: 100 }, { x: 395, y: 196, t: 'Three tiny bones (ossicles) pass on and amplify the vibrations', side: 'r', ly: 150 }, { x: 500, y: 225, t: 'Cochlea: hair cells turn vibrations into electrical impulses', side: 'r', ly: 250 }, { x: 490, y: 100, t: 'Semicircular canals (balance)', side: 'r', ly: 60 }, { x: 610, y: 216, t: 'Auditory nerve to the brain', side: 'r', ly: 310 }];
    g += T(400, 400, 'humans hear 20 Hz to 20 000 Hz; loud sounds can damage the hair cells', { size: 12 });
    return wrap(W, H, o.aria || 'Structure of the human ear from the outer ear to the auditory nerve', '', g + labels(labs, { W, H, lx: 200, rx: 680, size: 13 }));
  }

  function armMuscles2(o = {}) {
    const W = 980, H = 430, k = id('am');
    let g = panelT(260, 'Antagonistic muscles', 'muscles can only pull, so they work in pairs') + panelT(760, 'A synovial joint', 'the elbow is a hinge joint');
    g += `<defs>${lg(k + 'b', '#d9d2bc', '#fbf8ee', false, '#ffffff')}${lg(k + 'bi', '#ff8a7a', '#b8302a', false)}${lg(k + 'tr', '#d98a7a', '#8a3a2e', false)}${lg(k + 'cg', '#e8f6ff', '#9fd4e6')}</defs>`;
    g += `<path d="M160 90H190L200 260H170Z" fill="url(#${k}b)" stroke="#b9b29a" stroke-width="1.5"/><path d="M190 262L360 300L354 320L180 286Z" fill="url(#${k}b)" stroke="#b9b29a" stroke-width="1.5"/><circle cx="186" cy="272" r="15" fill="#f6f2e4" stroke="#b9b29a" stroke-width="1.5"/><ellipse cx="182" cy="268" rx="5" ry="3" fill="#fff"/>`;
    g += `<path d="M196 110Q260 150 236 260Q232 280 230 290" fill="url(#${k}bi)" stroke="#8e2018" stroke-width="2"/>${[0, 1, 2, 3, 4].map(i => `<path d="M${206 + i * 6} ${130 + i * 4}Q${238 + i * 2} ${190} ${222 + i * 2} ${250}" stroke="#ffb0a4" stroke-width="1" fill="none" opacity=".6"/>`).join('')}<path d="M196 104L192 92M232 288L236 300" stroke="#f4ecd8" stroke-width="4" stroke-linecap="round"/>`;
    g += `<path d="M160 110Q120 180 160 270L170 286" fill="url(#${k}tr)" stroke="#6e2a20" stroke-width="2" opacity=".95"/>${[0, 1, 2].map(i => `<path d="M${152 - i * 6} ${130 + i * 10}Q${132 - i * 2} 190 ${156 - i * 2} 254" stroke="#e8a090" stroke-width="1" fill="none" opacity=".6"/>`).join('')}`;
    g += T(270, 160, 'biceps contracts', { size: 13, w: 700, a: 'start', fill: '#ef5b4c' }) + T(270, 178, '(shorter, fatter)', { size: 12, a: 'start' }) + T(110, 150, 'triceps', { size: 13, w: 700, a: 'end' }) + T(110, 168, 'relaxes', { size: 12, a: 'end' }) + arrow(330, 300, 320, 240, 'currentColor', 2) + T(330, 230, 'arm bends', { size: 12, a: 'start' });
    g += T(260, 360, 'to straighten the arm: triceps contracts, biceps relaxes', { size: 12 }) + T(260, 378, 'tendons join muscle to bone; ligaments join bone to bone', { size: 12 });
    g += `<path d="M700 90H760V200Q760 220 730 220Q700 220 700 200Z" fill="url(#${k}b)" stroke="#b9b29a" stroke-width="1.5"/><path d="M700 260Q700 240 730 240Q760 240 760 260V370H700Z" fill="url(#${k}b)" stroke="#b9b29a" stroke-width="1.5"/><path d="M714 110V190M714 270V350" stroke="#e6dfc8" stroke-width="3" opacity=".8"/>`;
    g += `<path d="M688 180V280H772V180" fill="url(#${k}cg)" opacity=".55"/><rect x="694" y="214" width="72" height="32" fill="#f4e3a0" opacity=".55"/><path d="M698 196Q730 214 762 196M698 264Q730 246 762 264" stroke="#7fc0de" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M698 196Q730 214 762 196M698 264Q730 246 762 264" stroke="#d6f0fb" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    g += `<path d="M690 180V280M770 180V280" stroke="#b8681e" stroke-width="5" stroke-linecap="round"/><path d="M690 180V280M770 180V280" stroke="#f0a050" stroke-width="2.5" stroke-linecap="round"/>`;
    const labs = [{ x: 730, y: 140, t: 'Bone', side: 'r', ly: 120 }, { x: 750, y: 200, t: 'Cartilage: smooth, absorbs shocks', side: 'r', ly: 180 }, { x: 740, y: 230, t: 'Synovial fluid: lubricates', side: 'r', ly: 230 }, { x: 770, y: 270, t: 'Ligament holds the bones together', side: 'r', ly: 290 }];
    return wrap(W, H, o.aria || 'Biceps and triceps working as an antagonistic pair, and the parts of a synovial joint', '', g + labels(labs, { W, H, lx: 600, rx: 800, size: 12 }));
  }

  const polarBear = (x, y, k) => `<defs>${rg(k + 'pb', '#ffffff', '#c9d2dc', .4, .3, .9)}</defs>` + shadow(x, y + 44, 70, 6, .2) + `<path d="M${x - 70} ${y + 10}Q${x - 70} ${y - 30} ${x - 20} ${y - 30}H${x + 30}Q${x + 50} ${y - 50} ${x + 70} ${y - 34}Q${x + 86} ${y - 26} ${x + 80} ${y - 14}Q${x + 60} ${y - 6} ${x + 50} ${y + 6}V${y + 40}H${x + 36}V${y + 14}H${x - 40}V${y + 40}H${x - 56}V${y + 18}Q${x - 70} ${y + 18} ${x - 70} ${y + 10}Z" fill="url(#${k}pb)" stroke="#9aa6b3" stroke-width="1.5"/><circle cx="${x + 64}" cy="${y - 34}" r="2.5" fill="#1d2733"/><circle cx="${x + 80}" cy="${y - 18}" r="3" fill="#1d2733"/><circle cx="${x + 50}" cy="${y - 44}" r="5" fill="#eef1f4" stroke="#9aa6b3"/>`;
  const camel = (x, y, k) => `<defs>${lg(k + 'cm', '#e6be84', '#b07a3a')}</defs>` + shadow(x, y + 44, 70, 6, .2) + `<path d="M${x - 66} ${y}Q${x - 70} ${y - 16} ${x - 50} ${y - 16}Q${x - 36} ${y - 54} ${x - 14} ${y - 22}Q${x + 4} ${y - 56} ${x + 26} ${y - 20}Q${x + 44} ${y - 20} ${x + 50} ${y - 40}L${x + 58} ${y - 66}Q${x + 64} ${y - 76} ${x + 76} ${y - 70}L${x + 80} ${y - 62}L${x + 66} ${y - 58}L${x + 60} ${y - 28}Q${x + 54} ${y + 2} ${x + 36} ${y + 2}V${y + 40}H${x + 28}V${y + 6}H${x - 40}V${y + 40}H${x - 48}V${y + 4}Q${x - 62} ${y + 6} ${x - 66} ${y}Z" fill="url(#${k}cm)" stroke="#7a5020" stroke-width="1.5"/><circle cx="${x + 70}" cy="${y - 66}" r="2" fill="#1d2733"/>`;
  function adaptations2(o = {}) {
    const W = 960, H = 400, k = id('ad');
    let g = T(480, 32, 'Adaptations help organisms survive where they live', { size: 15, w: 700 });
    g += `<defs>${lg(k + 'ca', '#2f7a2a', '#7cc46a', false, '#5aa84a')}${lg(k + 'sd', '#f2dca6', '#c9a466')}</defs>`;
    g += `<path d="M140 330Q280 318 420 330V352H140Z" fill="url(#${k}sd)"/><path d="M270 346Q200 370 140 360M290 346Q360 372 420 360M280 346V390" stroke="#a8804a" stroke-width="3" fill="none"/>`;
    g += `<path d="M260 330V160Q260 120 280 120Q300 120 300 160V330Z" fill="url(#${k}ca)" stroke="#1f5a1c" stroke-width="1.5"/><path d="M260 240H220V200Q220 180 236 180Q248 180 248 200V220H260Z" fill="url(#${k}ca)" stroke="#1f5a1c" stroke-width="1.5"/><path d="M270 130V328M280 122V328M290 130V328" stroke="#1f5a1c" stroke-width="1.2" opacity=".55"/><path d="M228 190V220" stroke="#1f5a1c" stroke-width="1.2" opacity=".55"/>`;
    g += Array.from({ length: 16 }, (_, i) => { const y = 140 + i * 11, x = i % 2 ? 300 : 260; return `<path d="M${x} ${y}l${i % 2 ? 9 : -9} -4M${x} ${y}l${i % 2 ? 9 : -9} 3" stroke="#fbf6e4" stroke-width="1.6"/>`; }).join('') + `<circle cx="280" cy="118" r="7" fill="#f26ca0"/><circle cx="280" cy="118" r="3" fill="#ffd84a"/>`;
    const labs = [{ x: 300, y: 168, t: 'Spines, not leaves: less water lost', side: 'r', ly: 130 }, { x: 290, y: 250, t: 'Thick stem stores water', side: 'r', ly: 230 }, { x: 400, y: 360, t: 'Long, wide roots collect water', side: 'r', ly: 330 }];
    g += T(280, 392, 'cactus (desert)', { size: 13, w: 700 });
    const tl = (x, y, c, t, s, pic) => `<rect x="${x}" y="${y}" width="270" height="130" rx="10" fill="${c}" opacity=".16" stroke="${c}"/>` + pic + T(x + 190, y + 28, t, { size: 13, w: 700 }) + s.map((l, i) => T(x + 190, y + 52 + i * 18, l, { size: 11 })).join('');
    g += tl(660, 80, '#9fd4e6', 'Polar bear (Arctic)', ['thick fur and fat', 'for insulation', 'white fur: camouflage', 'small ears: less heat lost'], `<g transform="translate(${660 + 62} ${80 + 72}) scale(.62) translate(${-660 - 62} ${-80 - 72})">${polarBear(722, 152, k + 'p')}</g>`);
    g += tl(660, 230, '#e0a64a', 'Camel (desert)', ['stores fat in its hump', 'wide feet for sand', 'long eyelashes', 'keep out sand'], `<g transform="translate(${660 + 62} ${230 + 76}) scale(.62) translate(${-660 - 62} ${-230 - 76})">${camel(716, 306, k + 'c')}</g>`);
    return wrap(W, H, o.aria || 'Adaptations of a cactus, a polar bear and a camel', '', g + labels(labs, { W, H, lx: 120, rx: 420, size: 12 }));
  }

  function germination2(o = {}) {
    const W = 960, H = 400, k = id('ge');
    let g = panelT(220, 'Inside a seed', 'a bean seed cut open') + panelT(700, 'Germination', 'needs water, oxygen and warmth (not light)');
    g += `<defs>${rg(k + 'sc', '#e2b47a', '#8a5a30', .4, .35, .9)}${rg(k + 'fs', '#fbf2cc', '#e2cc84', .45, .4, .8)}${lg(k + 'so', '#8a6a4a', '#4a3020')}${lg(k + 'lf', '#9be07a', '#3f8f2a')}</defs>`;
    g += shadow(220, 296, 116, 8, .25) + `<ellipse cx="220" cy="210" rx="120" ry="80" fill="url(#${k}sc)" stroke="#6e4220" stroke-width="3"/><ellipse cx="220" cy="210" rx="108" ry="68" fill="url(#${k}fs)"/>${[[250, 190], [280, 230], [230, 250], [300, 200]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#e0c870" opacity=".7"/>`).join('')}<path d="M150 190Q170 170 190 186Q180 200 160 204Z" fill="url(#${k}lf)" stroke="#3f7a2a"/><path d="M190 194Q200 220 186 240" stroke="#a8b860" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M190 194Q200 220 186 240" stroke="#e2eaa0" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    const labs = [{ x: 120, y: 160, t: 'Seed coat (testa) protects', side: 'l', ly: 130 }, { x: 170, y: 190, t: 'Embryo shoot', side: 'l', ly: 190 }, { x: 188, y: 236, t: 'Embryo root', side: 'l', ly: 250 }, { x: 270, y: 220, t: 'Food store (starch)', side: 'r', ly: 300 }];
    g += `<rect x="500" y="310" width="400" height="66" rx="6" fill="url(#${k}so)"/>${Array.from({ length: 40 }, (_, i) => `<circle cx="${510 + (i * 47) % 380}" cy="${322 + (i * 13) % 48}" r="1.6" fill="#b89a74" opacity=".7"/>`).join('')}<path d="M500 312H900" stroke="#a8875e" stroke-width="3"/>`;
    [[560, 0], [670, 1], [790, 2]].forEach(([x, i]) => {
      g += `<ellipse cx="${x}" cy="320" rx="20" ry="13" fill="url(#${k}sc)" stroke="#6e4220" stroke-width="1.2"/>`;
      if (i > 0) g += `<path d="M${x} 330Q${x - 6} 350 ${x + 4} 370" stroke="#e8dcc0" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M${x - 2} 350l-8 4M${x + 2} 362l8 2" stroke="#e8dcc0" stroke-width="1.5"/>`;
      if (i > 1) g += `<path d="M${x} 308Q${x + 4} 260 ${x} 220" stroke="#3f8f2a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${x} 230Q${x - 30} 210 ${x - 34} 230Q${x - 14} 240 ${x} 230M${x} 230Q${x + 30} 210 ${x + 34} 230Q${x + 14} 240 ${x} 230" fill="url(#${k}lf)" stroke="#2f6a1c"/>`;
      g += T(x, 396, ['day 1', 'day 3: root', 'day 7: shoot'][i], { size: 12 });
    });
    g += T(700, 120, 'the seed uses its food store until', { size: 12 }) + T(700, 136, 'its leaves can photosynthesise', { size: 12 });
    return wrap(W, H, o.aria || 'Parts of a bean seed and the stages of germination', '', g + labels(labs, { W, H, lx: 90, rx: 380, size: 12 }));
  }

  function tropism2(o = {}) {
    const W = 900, H = 440, r = S._rnd(4), k = id('tr');
    let g = `<defs>${lg(k + 'so', '#8a6a4a', '#4a3020')}${lg(k + 'st', '#3f8f2a', '#8ad06a', false)}${lg(k + 'lf', '#9be07a', '#3f8f2a')}${rg(k + 'sd', '#e2b47a', '#8a5a30', .4, .35, .9)}</defs>`;
    g += `<rect x="60" y="330" width="360" height="40" rx="4" fill="url(#${k}so)"/><rect x="480" y="330" width="360" height="40" rx="4" fill="url(#${k}so)"/>`;
    g += sun3(80, 90, 30, k + 'sun') + [0, 1, 2].map(i => arrow(120, 100 + i * 20, 180, 130 + i * 20, '#ffcc33', 2.5, 10)).join('');
    g += `<path d="M290 330C290 240 286 180 236 130" stroke="#2f6a1c" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M290 330C290 240 286 180 236 130" stroke="url(#${k}st)" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M236 130Q206 112 196 126Q214 140 236 130Z" fill="url(#${k}lf)" stroke="#2f6a1c"/><path d="M262 170Q236 150 230 168Q248 178 262 170Z M286 240Q314 222 322 238Q304 250 286 240Z" fill="url(#${k}lf)" stroke="#2f6a1c"/>`;
    for (let i = 0; i < 10; i++) g += `<circle cx="${f(296 + r() * 6)}" cy="${f(170 + r() * 120)}" r="3.8" fill="#e0533f" stroke="#8e2418" stroke-width=".6"/>`;
    g += `<circle cx="340" cy="300" r="4" fill="#e0533f"/>` + T(348, 304, 'auxin', { size: 11, a: 'start' });
    g += T(240, 40, 'Phototropism: shoot grows towards light', { size: 16, w: 700 }) + T(240, 400, 'Auxin collects on the shaded side;', { size: 13 }) + T(240, 418, 'cells there elongate more, so the shoot bends', { size: 13 });
    g += `<path d="M560 200C620 200 660 210 690 230" stroke="#2f6a1c" stroke-width="14" fill="none"/><path d="M560 200C620 200 660 210 690 230" stroke="url(#${k}st)" stroke-width="10" fill="none"/><ellipse cx="560" cy="200" rx="24" ry="15" fill="url(#${k}sd)" stroke="#6e4220"/>`;
    g += `<path d="M690 230C720 250 730 290 732 380" stroke="#b8a882" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M690 230C720 250 730 290 732 380" stroke="#f0e6cc" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M712 272l-10 6M728 312l10 4M730 344l-10 4" stroke="#e0d4b0" stroke-width="2"/>`;
    g += `<path d="M690 230C710 210 740 170 742 120" stroke="#2f6a1c" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M690 230C710 210 740 170 742 120" stroke="url(#${k}st)" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M742 120Q722 100 712 112Q728 126 742 120Z M742 120Q762 100 772 112Q756 126 742 120Z" fill="url(#${k}lf)" stroke="#2f6a1c"/>`;
    g += arrow(820, 160, 820, 260, 'currentColor', 3) + T(830, 210, 'gravity', { size: 13, a: 'start' });
    g += T(660, 40, 'Gravitropism: roots grow down, shoots grow up', { size: 16, w: 700 }) + T(660, 400, 'In roots, auxin on the lower side', { size: 13 }) + T(660, 418, 'slows growth, so the root bends downwards', { size: 13 });
    return wrap(W, H, o.aria || 'Phototropism in a shoot and gravitropism in a germinating seed', '', g);
  }

  // shaded bench lamp: base at (x, by), shade pointing right
  const benchLamp = (x, by, k) => `<defs>${rg(k + 'gl', '#fffbe0', '#ffd84a', .5, .5, .6)}<radialGradient id="${k}gw"><stop offset="0" stop-color="#fff2a8" stop-opacity=".7"/><stop offset="1" stop-color="#fff2a8" stop-opacity="0"/></radialGradient></defs>` + lgShadow(x, by + 1, 44, 4) + `<rect x="${x - 36}" y="${by - 14}" width="72" height="14" rx="5" fill="url(#LGiron)"/><rect x="${x - 3}" y="${by - 120}" width="6" height="108" rx="2" fill="url(#LGsteel)"/><circle cx="${x}" cy="${by - 120}" r="5" fill="url(#LGiron)"/><path d="M${x - 30} ${by - 150}H${x + 30}L${x + 22} ${by - 108}H${x - 22}Z" fill="url(#LGiron)" transform="rotate(-24 ${x} ${by - 128})"/><circle cx="${x + 8}" cy="${by - 104}" r="34" fill="url(#${k}gw)"/><circle cx="${x + 8}" cy="${by - 104}" r="11" fill="url(#${k}gl)"/>`;

  // small round icon tile pictures for the text-only comparison figures
  const icoMito = (x, y, k) => `<defs>${rg(k, '#ffb6a0', '#d0604a', .4, .35, .85)}</defs><ellipse cx="${x}" cy="${y}" rx="34" ry="18" fill="url(#${k})" stroke="#8e2f28" stroke-width="1.5"/><path d="M${x - 26} ${y}q6 -12 10 0t10 0t10 0t10 0t10 0" stroke="#fbe0d8" stroke-width="2.5" fill="none"/>`;
  const icoMuscle = (x, y, k) => `<defs>${lg(k, '#ff8a7a', '#b8302a', false)}</defs><path d="M${x - 34} ${y}Q${x - 10} ${y - 24} ${x + 14} ${y - 10}Q${x + 34} ${y} ${x + 34} ${y + 14}Q${x + 10} ${y + 22} ${x - 34} ${y + 10}Z" fill="url(#${k})" stroke="#8e2018"/><path d="M${x - 24} ${y + 2}Q${x} ${y - 10} ${x + 24} ${y + 6}" stroke="#ffb0a4" stroke-width="1.4" fill="none"/>`;
  const icoYeast = (x, y, k) => `<defs>${rg(k, '#fff4d8', '#d9b46a', .4, .35, .85)}</defs>${[[-14, 4, 14], [10, -4, 16], [24, 12, 8]].map(([a, b, r]) => `<ellipse cx="${x + a}" cy="${y + b}" rx="${r}" ry="${r * .82}" fill="url(#${k})" stroke="#a8804a" stroke-width="1.2"/>`).join('')}${[[-8, -14], [4, -20], [14, -16]].map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="3" fill="none" stroke="#9aa3ad"/>`).join('')}`;
  const icoLungs = (x, y, k) => `<defs>${rg(k, '#ffc4c4', '#d06a7a', .4, .35, .9)}</defs><path d="M${x} ${y - 26}V${y - 6}" stroke="#c9d0d6" stroke-width="5"/><path d="M${x - 4} ${y - 8}Q${x - 30} ${y - 24} ${x - 30} ${y + 8}Q${x - 28} ${y + 26} ${x - 6} ${y + 20}Z" fill="url(#${k})" stroke="#9a3a4a"/><path d="M${x + 4} ${y - 8}Q${x + 30} ${y - 24} ${x + 30} ${y + 8}Q${x + 28} ${y + 26} ${x + 6} ${y + 20}Z" fill="url(#${k})" stroke="#9a3a4a"/>`;
  const iconTile = (x, y, w, h, c, t, s, ico) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${c}" opacity=".16" stroke="${c}"/>` + ico + T(x + 70 + (w - 70) / 2, y + 26, t, { size: 14, w: 700 }) + s.map((l, i) => T(x + 70 + (w - 70) / 2, y + 48 + i * 17, l, { size: 12 })).join('');
  function respirationCompare2(o = {}) {
    const W = 980, H = 380, k = id('rc');
    let g = T(490, 32, 'Aerobic and anaerobic respiration', { size: 16, w: 700 });
    g += iconTile(40, 60, 420, 120, '#3fb27f', 'Aerobic (with oxygen)', ['glucose + oxygen → carbon dioxide + water', 'releases lots of energy', 'happens in mitochondria all the time'], icoMito(82, 120, k + 'a'));
    g += iconTile(520, 60, 420, 120, '#ef5b4c', 'Anaerobic in muscles (no oxygen)', ['glucose → lactic acid', 'releases less energy; causes cramp', 'during hard exercise: oxygen debt afterwards'], icoMuscle(562, 118, k + 'b'));
    g += iconTile(520, 200, 420, 120, '#e0a64a', 'Anaerobic in yeast (fermentation)', ['glucose → ethanol + carbon dioxide', 'used to make bread and beer', 'the carbon dioxide makes bread rise'], icoYeast(560, 264, k + 'c'));
    g += iconTile(40, 200, 420, 120, '#3f7fd6', 'Breathing is not respiration', ['breathing moves air in and out of the lungs', 'respiration is a chemical reaction', 'in every living cell'], icoLungs(82, 262, k + 'd'));
    g += T(490, 360, 'respiration releases energy for movement, keeping warm and building molecules', { size: 12 });
    return wrap(W, H, o.aria || 'Comparison of aerobic respiration and anaerobic respiration in muscles and in yeast', '', g);
  }
  function pubertyChanges2(o = {}) {
    const W = 960, H = 380, k = id('pu');
    let g = T(480, 36, 'Puberty: hormones cause the body to change', { size: 16, w: 700 }) + T(480, 58, 'usually between about 9 and 16; everyone’s timing is different', { size: 13 });
    const badge = (x, c, sym, kk) => `<defs>${rg(kk, '#ffffff', c, .35, .3, .9)}</defs><circle cx="${x + 104}" cy="104" r="20" fill="url(#${kk})" stroke="${c}"/>` + T(x + 104, 111, sym, { size: 20, w: 700, fill: '#1d2733' });
    const col = (x, title, hormone, c, items, sym, kk) => `<rect x="${x - 140}" y="80" width="280" height="250" rx="12" fill="${c}" opacity=".15" stroke="${c}"/>` + badge(x, c, sym, kk) + T(x, 108, title, { size: 15, w: 700 }) + T(x, 128, hormone, { size: 12, fill: c }) + items.map((t, i) => T(x - 120, 160 + i * 24, '• ' + t, { size: 13, a: 'start' })).join('');
    g += col(170, 'Both', 'hormones from glands', '#3fb27f', ['growth spurt', 'pubic and underarm hair', 'body odour, spots', 'emotional changes'], '↕', k + 'a');
    g += col(480, 'Girls', 'oestrogen (from the ovaries)', '#ef5b9c', ['breasts develop', 'hips widen', 'periods start', 'ovaries release eggs'], '♀', k + 'b');
    g += col(790, 'Boys', 'testosterone (from the testes)', '#3f7fd6', ['voice deepens', 'facial hair grows', 'shoulders widen', 'testes make sperm'], '♂', k + 'c');
    g += T(480, 362, 'these changes prepare the body for reproduction', { size: 12 });
    return wrap(W, H, o.aria || 'Changes during puberty for everyone, for girls and for boys, and the hormones involved', '', g);
  }
  function recycleMetals2(o = {}) {
    const W = 920, H = 380, k = id('rm');
    let g = T(460, 32, 'Why recycle aluminium cans?', { size: 16, w: 700 }) + T(460, 54, 'energy needed to make 1 kg of aluminium', { size: 13 });
    g += `<defs>${lg(k + 'can', '#8e979e', '#7d868c', false, '#f4f7f9')}${rg(k + 'ore', '#d98a5a', '#7a3a1c', .4, .35, .9)}${lg(k + 'r', '#ff8a7a', '#c8372a')}${lg(k + 'gr', '#7ad6a4', '#2a8a5a')}</defs>`;
    g += `<path d="M66 150l12 -26 22 -6 18 14 4 22 -18 14 -30 -2z" fill="url(#${k}ore)" stroke="#5a2410"/><path d="M80 132l8 -4M98 140l6 6" stroke="#f0b090" stroke-width="2"/>` + T(96, 182, 'bauxite', { size: 11 });
    g += `<rect x="160" y="100" width="560" height="60" rx="6" fill="url(#${k}r)"/><rect x="164" y="103" width="552" height="8" rx="4" fill="#fff" opacity=".2"/>` + T(170, 136, 'from bauxite ore (mining + electrolysis): about 200 MJ', { size: 13, w: 700, a: 'start', fill: '#fff' });
    g += shadow(96, 252, 18, 3) + `<path d="M80 200Q80 194 86 194H106Q112 194 112 200V244Q112 250 106 250H86Q80 250 80 244Z" fill="url(#${k}can)" stroke="#55606c"/><rect x="80" y="210" width="32" height="24" fill="#d0342c"/><path d="M84 214H108" stroke="#fff" stroke-width="2" opacity=".7"/><ellipse cx="96" cy="196" rx="14" ry="3" fill="#c9ced4" stroke="#7d858f"/>` + T(96, 272, 'cans', { size: 11 });
    g += `<rect x="160" y="180" width="28" height="60" rx="6" fill="url(#${k}gr)"/>` + T(200, 216, 'recycled cans: about 10 MJ, 95% less energy', { size: 13, w: 700, a: 'start' });
    g += [0, 1, 2].map(n => { const a0 = n * 120 - 80, a1 = a0 + 95, R = 30, P = a => [800 + R * Math.cos(a * Math.PI / 180), 200 + R * Math.sin(a * Math.PI / 180)]; const [x0, y0] = P(a0), [x1, y1] = P(a1), t = (a1 + 90) * Math.PI / 180; return `<path d="M${f(x0)} ${f(y0)}A${R} ${R} 0 0 1 ${f(x1)} ${f(y1)}" stroke="#3fb27f" stroke-width="7" fill="none"/><path d="M${f(x1 + Math.cos(t) * 12)} ${f(y1 + Math.sin(t) * 12)}L${f(x1 + Math.cos(t - 2.3) * 9)} ${f(y1 + Math.sin(t - 2.3) * 9)}L${f(x1 + Math.cos(t + 2.3) * 9)} ${f(y1 + Math.sin(t + 2.3) * 9)}Z" fill="#3fb27f"/>`; }).join('') + T(800, 250, 'recycle', { size: 11 });
    g += T(460, 290, 'Recycling also: saves the ore (a finite resource), means less mining and quarrying,', { size: 12 }) + T(460, 308, 'produces less carbon dioxide and sends less waste to landfill.', { size: 12 });
    g += T(460, 340, 'Problems: collecting and sorting the metals takes energy and money.', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'Energy needed to make aluminium from ore compared with recycling cans', '', g);
  }

  Object.assign(add, { bloodVessels: bloodVessels2, phagocytosis: phagocytosis2, earFig: earFig2, armMuscles: armMuscles2, adaptations: adaptations2, germination: germination2, tropism: tropism2, respirationCompare: respirationCompare2, pubertyChanges: pubertyChanges2, recycleMetals: recycleMetals2 });
  /* ---------- wave 15: AI-illustrated backdrops (science-figures-img.js) with vector labels and arrows ---------- */
  const IMG = n => (root.SciFigImg || {})[n];
  const pic = (n, x, y, w, h, k, r = 12) => `<defs><clipPath id="${k}c"><rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}"/></clipPath></defs><image href="${IMG(n)}" x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${k}c)"/>`;
  const HT = (x, y, s, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-size="${o.size || 14}" text-anchor="${o.a || 'middle'}"${o.w ? ` font-weight="${o.w}"` : ''} style="fill:${o.fill || '#1d2733'};paint-order:stroke;stroke:#ffffff;stroke-width:4px;stroke-linejoin:round">${esc(s)}</text>`;
  const lead = (x1, y1, x2, y2, c = '#1d2733') => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="#ffffff" stroke-width="3.5" opacity=".8"/><path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="${c}" stroke-width="1.4"/><circle cx="${f(x2)}" cy="${f(y2)}" r="3.4" fill="${c}" stroke="#fff" stroke-width="1.2"/>`;

  const wireFieldPrev = add.wireField || wireField;
  function wireField3(o = {}) {
    if (!IMG('grip')) return wireFieldPrev(o);
    const W = 880, H = 491, k = id('wf'), cx = 438, B = '#1f5fc8';
    let g = pic('grip', 0, 0, W, H, k);
    g += `<defs><linearGradient id="${k}cu" x1="0" x2="1"><stop offset="0" stop-color="#9a4a26"/><stop offset=".45" stop-color="#f0a77a"/><stop offset="1" stop-color="#7a3a1c"/></linearGradient></defs>`;
    const loop = (cy, rx) => {
      const ry = rx * 0.28;
      let s = `<path d="M${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}" fill="none" stroke="${B}" stroke-width="3" opacity=".55"/>`;
      s += `<rect x="${cx - 7}" y="${f(cy - ry - 3)}" width="14" height="${f(ry + 3)}" fill="url(#${k}cu)"/>`;
      s += `<path d="M${cx - rx} ${cy}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy}" fill="none" stroke="${B}" stroke-width="3.2"/>`;
      const head = (th, op) => { const px = cx + rx * Math.sin(th), py = cy + ry * Math.cos(th), dx = rx * Math.cos(th), dy = -ry * Math.sin(th), L = Math.hypot(dx, dy); return arrow(px - dx / L * 2, py - dy / L * 2, px + dx / L * 12, py + dy / L * 12, B, 0, 13).replace('<path d="M', `<path opacity="${op}" d="M`); };
      return s + head(0.75, 1) + head(Math.PI + 0.75, 0.7);
    };
    g += loop(420, 60) + loop(420, 100) + loop(420, 142) + loop(34, 54) + loop(34, 92);
    g += arrow(416, 172, 416, 86, '#e8792a', 5, 16) + HT(404, 128, 'current', { size: 15, w: 700, a: 'end', fill: '#c2551c' });
    g += HT(592, 424, 'magnetic field', { size: 15, w: 700, a: 'start', fill: B }) + HT(592, 442, 'circles round the wire', { size: 12, a: 'start', fill: B });
    g += HT(40, 236, 'Right-hand grip rule', { size: 18, w: 700, a: 'start' }) + HT(40, 262, 'thumb: direction of the current', { size: 14, a: 'start' }) + HT(40, 284, 'curled fingers: direction', { size: 14, a: 'start' }) + HT(40, 302, 'of the magnetic field', { size: 14, a: 'start' });
    g += HT(40, 476, 'field is stronger close to the wire and with a bigger current', { size: 12, a: 'start' });
    return wrap(W, H, o.aria || 'A right hand gripping a current-carrying wire: the thumb points along the current and the curled fingers show the direction of the circular magnetic field', '', g);
  }

  const tvPrev = add.terminalVelocity || terminalVelocity2;
  function terminalVelocity3(o = {}) {
    if (!IMG('skydiver')) return tvPrev(o);
    const W = 980, H = 390, k = id('tv');
    const sd = (x, y) => `<image href="${IMG('skydiver')}" x="${x - 62}" y="${y - 24}" width="124" height="46"/>`;
    const dv = (x, y, wl, dl, t) => sd(x, y) + arrow(x, y + 24, x, y + 24 + wl, '#ef5b4c', 3.5) + (dl ? arrow(x, y - 26, x, y - 26 - dl, '#3fb27f', 3.5) : '') + T(x, 320, t, { size: 12 });
    let g = `<rect x="20" y="70" width="400" height="260" rx="12" fill="#5aa9f0" opacity=".14"/>` + dv(90, 175, 80, 0, 'just jumped') + dv(210, 175, 80, 40, 'speeding up') + dv(330, 175, 80, 80, 'terminal velocity');
    g += T(210, 40, 'weight (red) and air resistance (green)', { size: 13, w: 700 }) + T(210, 354, 'drag increases with speed until', { size: 12 }) + T(210, 370, 'drag = weight: resultant force zero', { size: 12 });
    const x0 = 470, y0 = 330;
    g += axes(x0, y0, 440, 250, 'Time', 'Velocity');
    g += `<path d="${curveP(t => t < 0.45 ? 0.8 * (1 - Math.exp(-t * 7)) : t < 0.5 ? 0.8 - (t - 0.45) * 12 : 0.2 + 0.0 * t, x0, y0, 440, 250, 120)}" stroke="#3f7fd6" stroke-width="3" fill="none"/>`;
    g += T(x0 + 120, y0 - 216, 'terminal velocity', { size: 12 }) + T(x0 + 240, y0 - 150, 'parachute opens', { size: 12, a: 'start' }) + T(x0 + 330, y0 - 64, 'lower terminal velocity', { size: 12 });
    return wrap(W, H, o.aria || 'Forces on a skydiver and a velocity–time graph showing terminal velocity', '', g);
  }

  const earPrev = add.earFig || earFig2;
  function earFig3(o = {}) {
    if (!IMG('ear')) return earPrev(o);
    const W = 920, H = 610, k = id('ea'), s = 880 / 1210, P = (X, Y) => [20 + (X - 90) * s, 40 + (Y - 50) * s];
    let g = pic('ear', 20, 40, 880, 487, k);
    for (let i = 0; i < 3; i++) g += `<path d="M${30 + i * 13} ${262 + i}q8 22 0 44" stroke="#2f7fd0" stroke-width="2.5" fill="none" opacity=".8"/>`;
    const L = (tx, ty, X, Y, t, a = 'middle', t2) => { const [px, py] = P(X, Y); return lead(tx, ty + (ty < 300 ? 6 : -16), px, py) + HT(tx, ty, t, { size: 13, w: 700, a }) + (t2 ? HT(tx, ty + 16, t2, { size: 12, a }) : ''); };
    g += L(110, 560, 215, 330, 'Outer ear (pinna)', 'middle', 'funnels sound in');
    g += L(290, 560, 470, 405, 'Ear canal');
    g += L(470, 560, 735, 420, 'Eardrum', 'middle', 'vibrates');
    g += L(400, 22, 760, 320, 'Ossicles: three tiny bones', 'middle', 'pass on and amplify vibrations');
    g += L(680, 22, 890, 205, 'Semicircular canals', 'middle', 'balance');
    g += L(720, 560, 1000, 430, 'Cochlea', 'middle', 'hair cells make electrical impulses');
    g += L(860, 96, 1190, 290, 'Auditory nerve', 'middle', 'to the brain');
    g += T(460, 604, 'humans hear 20 Hz to 20 000 Hz; loud sounds can damage the hair cells', { size: 12 });
    return wrap(W, H, o.aria || 'Cross-section of the human ear: outer ear, ear canal, eardrum, ossicles, semicircular canals, cochlea and auditory nerve', '', g);
  }

  const armPrev = add.armMuscles || armMuscles2;
  function armMuscles3(o = {}) {
    if (!IMG('armBent')) return armPrev(o);
    const W = 980, H = 490, k = id('am'), RED = '#d63a2c', BLU = '#2f6fd0';
    let g = panelT(260, 'Antagonistic muscles', 'muscles can only pull, so they work in pairs');
    g += `<rect x="18" y="78" width="484" height="402" rx="12" fill="#ffffff"/>` + pic('armBent', 30, 92, 300, 258, k + 'b', 0) + pic('armStraight', 380, 84, 100, 326, k + 's', 0);
    g += HT(180, 372, 'Arm bending', { size: 14, w: 700 }) + HT(180, 392, 'biceps contracts (shorter, fatter)', { size: 12, fill: RED }) + HT(180, 410, 'triceps relaxes', { size: 12, fill: BLU });
    g += HT(430, 436, 'Arm straightening', { size: 14, w: 700 }) + HT(430, 456, 'triceps contracts', { size: 12, fill: BLU }) + HT(430, 474, 'biceps relaxes', { size: 12, fill: RED });
    const old = armPrev(o), inner = old.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    g += `<svg x="520" y="0" width="460" height="430" viewBox="520 0 460 430">${inner}</svg>`;
    return wrap(W, H, o.aria || 'Biceps and triceps working as an antagonistic pair as the arm bends and straightens, and the parts of a synovial joint', '', g);
  }

  const adaptPrev = add.adaptations || adaptations2;
  function adaptations3(o = {}) {
    if (!IMG('bear')) return adaptPrev(o);
    const W = 960, H = 440, k = id('ad');
    let g = T(480, 30, 'Adaptations help organisms survive where they live', { size: 15, w: 700 });
    const col = (cx, n, w, title, c, lines) => pic(n, cx - w / 2, 50, w, 230, k + n, 10) + `<rect x="${cx - 150}" y="292" width="300" height="${36 + lines.length * 20}" rx="10" fill="${c}" opacity=".14" stroke="${c}"/>` + T(cx, 314, title, { size: 14, w: 700 }) + lines.map((l, i) => T(cx, 338 + i * 20, l, { size: 12 })).join('');
    g += col(165, 'bear', 224, 'Polar bear (Arctic)', '#5aa9f0', ['thick fur and a layer of fat: insulation', 'white fur: camouflage on snow', 'small ears: less heat lost', 'large furry feet: grip on ice']);
    g += col(480, 'camel', 279, 'Camel (desert)', '#e0a64a', ['hump stores fat for energy', 'wide feet: do not sink into sand', 'long eyelashes keep out sand', 'loses very little water in urine']);
    g += col(795, 'cactus', 148, 'Cactus (desert)', '#3fb27f', ['spines instead of leaves: less water lost', 'thick stem stores water', 'long, wide roots collect water', 'waxy surface cuts evaporation']);
    return wrap(W, H, o.aria || 'Adaptations of a polar bear, a camel and a cactus', '', g);
  }
  Object.assign(add, { wireField: wireField3, terminalVelocity: terminalVelocity3, earFig: earFig3, armMuscles: armMuscles3, adaptations: adaptations3 });
  for (const k of Object.keys(add)) S.register(k, add[k]);
  S._more = { T, arrow, dbl, wavy, id };
})(typeof window === 'undefined' ? globalThis : window);
