/* A level Physics: lesson-specific figures (Opus pass, November 2026).
   Registers on window.SciFig, so load it after science-figures-2.js. Every plotted curve is computed
   from the physics, and most figures use the numbers of the lesson's own worked example. */
(function (root) {
  'use strict';
  const S = root.SciFig;
  if (!S || !S._more || !S._more.wrap) return;
  const { T, arrow, dbl, wrap, f } = S._more;
  const BL = '#3f7fd6', RD = '#ef5b4c', GN = '#3fb27f', AM = '#e0a64a', PU = '#9b6bd6', GR = '#8a94a0';
  const TR = (x, y, s, o = {}) => `<g transform="rotate(-90 ${f(x)} ${f(y)})">${T(x, y, s, o)}</g>`;
  const ln = (x1, y1, x2, y2, c = 'currentColor', w = 2, ex = '') => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"${ex}/>`;
  const dsh = ' stroke-dasharray="6 5"';
  const pl = (pts, c = BL, w = 3, ex = '') => `<path d="M${pts.map(p => f(p[0]) + ' ' + f(p[1])).join('L')}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linejoin="round" stroke-linecap="round"${ex}/>`;
  const dot = (x, y, r = 4.5, c = BL) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${c}"/>`;
  const box = (x, y, w, h, c = 'currentColor', op = .1, rx = 8) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${rx}" fill="${c}" fill-opacity="${op}" stroke="${c}" stroke-width="1.6"/>`;
  const fnPts = (fn, a, b, X, Y, n = 120) => { const p = []; for (let i = 0; i <= n; i++) { const v = a + (b - a) * i / n, y = fn(v); if (isFinite(y)) p.push([X(v), Y(y)]); } return p; };
  const fmt = v => String(+v.toFixed(6)).replace('-', '−');
  /* graph frame with numbered ticks; returns the scale functions */
  const graph = o => {
    const { x0, y0, w, h, xr, yr } = o, X = v => x0 + (v - xr[0]) / (xr[1] - xr[0]) * w, Y = v => y0 - (v - yr[0]) / (yr[1] - yr[0]) * h;
    const ax = o.xAt !== undefined ? Y(o.xAt) : y0, xf = o.xf || fmt, yf = o.yf || fmt;
    let g = '';
    (o.yt || []).forEach(v => { if (o.grid !== false) g += ln(x0, Y(v), x0 + w, Y(v), 'currentColor', 1, ' opacity=".14"'); g += ln(x0 - 5, Y(v), x0, Y(v), 'currentColor', 1.5) + T(x0 - 9, Y(v) + 4, yf(v), { size: 12, a: 'end' }); });
    (o.xt || []).forEach(v => { if (o.grid !== false) g += ln(X(v), y0 - h, X(v), y0, 'currentColor', 1, ' opacity=".14"'); g += ln(X(v), ax, X(v), ax + 5, 'currentColor', 1.5) + T(X(v), (o.xAt !== undefined ? ax : y0) + 19, xf(v), { size: 12 }); });
    g += `<path d="M${x0} ${f(y0 - h)}V${y0}M${x0} ${f(ax)}H${x0 + w}" stroke="currentColor" stroke-width="2" fill="none"/>`;
    g += T(x0 + w / 2, y0 + 44, o.xl || '', { size: 14 }) + TR(x0 - (o.ylo || 50), y0 - h / 2, o.yl || '', { size: 14 });
    return { g, X, Y };
  };
  const HT = (x, y, s, c, size = 11, a = 'middle') => `<text x="${f(x)}" y="${f(y)}" font-size="${size}" font-weight="700" text-anchor="${a}" class="sf-lab" style="fill:${c};stroke:var(--panel,#fff);stroke-width:4px;paint-order:stroke">${s}</text>`;
  const title = (x, y, s, size = 15) => T(x, y, s, { size, w: 700 });
  const note = (x, y, lines, o = {}) => lines.map((s, i) => T(x, y + i * (o.lh || 19), s, { size: o.size || 13, a: o.a || 'start', w: o.w && i === 0 ? 700 : undefined, fill: o.fill })).join('');
  const resistor = (cx, cy, lab, vert = false, w = 54, h = 18) => (vert ? `<rect x="${f(cx - h / 2)}" y="${f(cy - w / 2)}" width="${h}" height="${w}"` : `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${w}" height="${h}"`) + ` rx="2" fill="var(--panel,#fff)" fill-opacity=".9" stroke="currentColor" stroke-width="2.2"/>` + (lab ? T(vert ? cx + h / 2 + 8 : cx, vert ? cy + 5 : cy - h / 2 - 8, lab, { size: 13, a: vert ? 'start' : 'middle', w: 700 }) : '');
  const cellV = (cx, cy) => ln(cx - 18, cy - 5, cx + 18, cy - 5, 'currentColor', 3) + ln(cx - 9, cy + 5, cx + 9, cy + 5, 'currentColor', 5) + `<rect x="${cx - 20}" y="${cy - 4}" width="40" height="8" fill="var(--panel,#fff)" opacity="0"/>`;
  const trolley = (x, y, w, h, c, lab) => `<rect x="${f(x)}" y="${f(y - h)}" width="${w}" height="${h}" rx="5" fill="${c}" fill-opacity=".85" stroke="currentColor" stroke-width="1.5"/>` + `<circle cx="${f(x + w * .22)}" cy="${f(y + 7)}" r="7" fill="${GR}" stroke="currentColor" stroke-width="1.5"/><circle cx="${f(x + w * .78)}" cy="${f(y + 7)}" r="7" fill="${GR}" stroke="currentColor" stroke-width="1.5"/>` + T(x + w / 2, y - h / 2 + 5, lab, { size: 13, w: 700, fill: '#fff' });
  const deg = Math.PI / 180;
  const add = {};

  /* ---------- f4 Newton's second law: lift and connected objects ---------- */
  add.liftForces = (o = {}) => {
    const W = 940, H = 430;
    let g = title(230, 30, 'Person on scales in a lift') + title(700, 30, 'Trolley pulled by a hanging mass');
    // lift: R = m(g + a) = 70(9.81 + 1.2) = 771 N; W = 687 N
    g += box(50, 60, 170, 300, 'currentColor', .05, 6) + ln(135, 60, 135, 46, GR, 3);
    g += `<rect x="85" y="330" width="100" height="14" rx="3" fill="${GR}"/>` + T(135, 372, 'scales', { size: 12 });
    g += `<circle cx="135" cy="150" r="18" fill="${AM}"/><rect x="113" y="170" width="44" height="100" rx="14" fill="${AM}"/><rect x="117" y="262" width="14" height="68" rx="5" fill="${AM}"/><rect x="139" y="262" width="14" height="68" rx="5" fill="${AM}"/>`;
    const sc = 0.15, fx = 300, fy = 210; // free-body diagram: px per N
    g += T(fx, 62, 'free-body diagram', { size: 12, w: 700 }) + dot(fx, fy, 7, 'currentColor');
    g += arrow(fx, fy - 8, fx, fy - 771 * sc, BL, 4) + T(fx + 12, fy - 771 * sc + 12, 'R = 771 N', { size: 14, w: 700, a: 'start', fill: BL });
    g += arrow(fx, fy + 8, fx, fy + 687 * sc, RD, 4) + T(fx + 12, fy + 687 * sc - 4, 'W = mg = 687 N', { size: 14, w: 700, a: 'start', fill: RD });
    g += arrow(250, 250, 250, 170, GN, 3.5) + T(250, 274, 'a = 1.2', { size: 12, fill: GN }) + T(250, 290, 'm s⁻² up', { size: 12, fill: GN });
    g += note(40, 398, ['up positive:  R − W = ma', 'R = 70 × (9.81 + 1.2) = 771 N: the scales read more than your weight'], { size: 13 });
    // trolley and hanging mass: a = 0.50g / 2.0 = 2.45 m s⁻², T = 1.5 × 2.45 = 3.7 N
    g += `<rect x="480" y="190" width="350" height="18" fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="1.5"/><rect x="486" y="208" width="14" height="150" fill="currentColor" fill-opacity=".12"/>`;
    g += `<circle cx="838" cy="182" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="838" cy="182" r="3" fill="currentColor"/>`;
    g += trolley(560, 176, 130, 46, BL, '1.5 kg');
    g += ln(690, 168, 838, 168, 'currentColor', 1.8) + ln(852, 182, 852, 270, 'currentColor', 1.8);
    g += `<rect x="830" y="270" width="44" height="40" rx="4" fill="${PU}"/>` + T(852, 295, '0.50 kg', { size: 11, w: 700, fill: '#fff' });
    g += arrow(700, 150, 770, 150, RD, 3.5) + T(735, 140, 'T = 3.7 N', { size: 13, w: 700, fill: RD });
    g += arrow(852, 262, 852, 214, RD, 3.5) + T(864, 238, 'T', { size: 13, w: 700, a: 'start', fill: RD });
    g += arrow(852, 312, 852, 380, RD, 3.5) + T(864, 362, 'W = 4.9 N', { size: 13, w: 700, a: 'start', fill: RD });
    g += arrow(560, 120, 640, 120, GN, 3) + T(600, 110, 'a = 2.45 m s⁻²', { size: 13, fill: GN }) + arrow(800, 330, 800, 380, GN, 3) + T(790, 362, 'a', { size: 13, a: 'end', fill: GN });
    g += note(520, 252, ['whole system:', 'a = 0.50 × 9.81 ÷ (1.5 + 0.50)', '   = 2.45 m s⁻²', 'trolley alone:', 'T = 1.5 × 2.45 = 3.7 N'], { size: 13, lh: 18 });
    return wrap(W, H, o.aria || 'Free-body diagram of a person in a lift accelerating upwards, and a trolley pulled by a hanging mass with tension and weight labelled', '', g);
  };

  /* ---------- f5 drag against speed for a skydiver ---------- */
  add.dragSpeed = (o = {}) => {
    const W = 920, H = 410, m = 80, Wt = m * 9.81, k = 0.25, vt = Math.sqrt(Wt / k);
    const G = graph({ x0: 90, y0: 340, w: 520, h: 280, xr: [0, 70], yr: [0, 1000], xt: [10, 20, 30, 40, 50, 60, 70], yt: [200, 400, 600, 800, 1000], xl: 'Speed v / m s⁻¹', yl: 'Force / N', ylo: 58 });
    let g = G.g + title(350, 32, 'Drag rises with speed until it equals the weight');
    g += pl([[G.X(0), G.Y(Wt)], [G.X(70), G.Y(Wt)]], RD, 3) + T(G.X(3), G.Y(Wt) - 10, 'weight W = 785 N (80 kg)', { size: 13, a: 'start', fill: RD });
    g += pl(fnPts(v => k * v * v, 0, 63, G.X, G.Y), BL, 3.5) + T(G.X(46) + 10, G.Y(k * 46 * 46) + 26, 'drag D = kv²', { size: 13, w: 700, fill: BL, a: 'start' });
    g += ln(G.X(vt), G.Y(Wt), G.X(vt), G.Y(0), 'currentColor', 1.5, dsh + ' opacity=".7"') + dot(G.X(vt), G.Y(Wt), 6, AM) + T(G.X(vt) + 10, G.Y(Wt) + 26, 'terminal velocity', { size: 13, w: 700, a: 'start', fill: AM }) + T(G.X(vt) + 10, G.Y(Wt) + 44, `≈ ${Math.round(vt)} m s⁻¹`, { size: 13, a: 'start', fill: AM });
    g += dbl(G.X(30), G.Y(Wt), G.X(30), G.Y(k * 900), GN, 2.5) + T(G.X(30) + 8, G.Y((Wt + k * 900) / 2) + 4, 'resultant', { size: 12, a: 'start', fill: GN }) + T(G.X(30) + 8, G.Y((Wt + k * 900) / 2) + 20, 'W − D', { size: 12, a: 'start', fill: GN });
    g += note(650, 90, ['Drag depends on', '• speed (D ∝ v² when turbulent)', '• cross-sectional area', '• shape (streamlining)', '• density of the fluid', '', 'a = (W − D) ÷ m', 'so the acceleration falls', 'as the speed rises', '', `k = 0.25 kg m⁻¹ here:`, `v_t = √(W ÷ k) = ${Math.round(vt)} m s⁻¹`], { size: 13, lh: 20, w: 1 });
    return wrap(W, H, o.aria || 'Graph of drag force against speed rising as v squared until it meets the weight line at terminal velocity', '', g);
  };

  /* ---------- ep1 work done by a force at an angle ---------- */
  add.workAngle = (o = {}) => {
    const W = 920, H = 400, F = 80, th = 35, x = 50, Fh = F * Math.cos(th * deg), Fv = F * Math.sin(th * deg), Wd = F * x * Math.cos(th * deg);
    let g = title(460, 30, 'Only the component of the force along the displacement does work');
    g += `<path d="M40 250H880" stroke="currentColor" stroke-width="2"/><path d="M40 250H880V262H40Z" fill="#dfe8f2" opacity=".5"/>`;
    g += `<path d="M220 246h170l20 -24h-200z" fill="${AM}" stroke="currentColor" stroke-width="1.6"/><path d="M200 248h220" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`;
    const ox = 400, oy = 228, L = 230, ex = ox + L * Math.cos(th * deg), ey = oy - L * Math.sin(th * deg);
    g += ln(ox, oy, ex + 20, ey - 14, 'currentColor', 1.6) + arrow(ox, oy, ex, ey, RD, 4) + T(ex - 14, ey - 16, 'T = 80 N', { size: 14, w: 700, a: 'end', fill: RD });
    g += arrow(ox, oy, ex, oy, BL, 3.5) + ln(ex, oy, ex, ey, BL, 2, dsh) + T((ox + ex) / 2 + 40, oy + 46, `F cos θ = ${Fh.toFixed(1)} N (does work)`, { size: 13, fill: BL, w: 700 });
    g += T(ex + 10, (oy + ey) / 2 + 10, `F sin θ = ${Fv.toFixed(1)} N`, { size: 13, a: 'start', fill: BL }) + T(ex + 10, (oy + ey) / 2 + 28, '(no work: ⊥ to motion)', { size: 12, a: 'start', fill: BL });
    g += `<path d="M${ox + 60} ${oy}A60 60 0 0 0 ${f(ox + 60 * Math.cos(th * deg))} ${f(oy - 60 * Math.sin(th * deg))}" fill="none" stroke="currentColor" stroke-width="1.5"/>` + T(ox + 70, oy - 14, 'θ = 35°', { size: 13, a: 'start' });
    g += arrow(210, 236, 120, 236, PU, 3.5) + T(140, 222, 'friction 55 N', { size: 13, fill: PU, w: 700 });
    g += arrow(220, 300, 700, 300, GN, 3) + ln(220, 292, 220, 308, GN, 2) + T(460, 322, 'displacement x = 50 m', { size: 13, w: 700, fill: GN });
    g += note(60, 352, [`W = Fx cos θ = 80 × 50 × cos 35° = ${Math.round(Wd / 10) * 10} J by the tension`, `work against friction = 55 × 50 = 2750 J   →   gain in kinetic energy ≈ ${Math.round((Wd - 2750) / 10) * 10} J`], { size: 13 });
    return wrap(W, H, o.aria || 'A sledge pulled by a rope at 35 degrees showing the horizontal and vertical components of the tension, friction and the displacement', '', g);
  };

  /* ---------- ep5 elastic potential energy and hysteresis ---------- */
  add.elasticEnergy = (o = {}) => {
    const W = 940, H = 410;
    const A = graph({ x0: 80, y0: 330, w: 330, h: 240, xr: [0, 0.05], yr: [0, 15], xt: [0.01, 0.02, 0.03, 0.04, 0.05], yt: [3, 6, 9, 12, 15], xl: 'Extension x / m', yl: 'Force F / N', ylo: 46 });
    let g = A.g + title(245, 34, 'Energy stored = area under F–x');
    g += `<path d="M${A.X(0)} ${A.Y(0)}L${A.X(0.04)} ${A.Y(12)}L${A.X(0.04)} ${A.Y(0)}Z" fill="${BL}" fill-opacity=".22"/>` + pl([[A.X(0), A.Y(0)], [A.X(0.04), A.Y(12)]], BL, 3.5);
    g += ln(A.X(0), A.Y(12), A.X(0.04), A.Y(12), 'currentColor', 1.3, dsh + ' opacity=".6"') + dot(A.X(0.04), A.Y(12), 5, BL);
    g += T(A.X(0.028), A.Y(3), 'E = ½Fx', { size: 14, w: 700, fill: BL }) + T(A.X(0.028), A.Y(1.4), '= ½ × 12 × 0.040 = 0.24 J', { size: 12, fill: BL });
    g += T(A.X(0.012), A.Y(11), 'gradient = k = 300 N m⁻¹', { size: 12, a: 'start' });
    const Bg = graph({ x0: 560, y0: 330, w: 320, h: 240, xr: [0, 1], yr: [0, 1.1], xt: [], yt: [], xl: 'Extension', yl: 'Force', ylo: 22, grid: false });
    const load = x => x * (1.6 - 1.4 * x + 0.8 * x * x), unload = x => Math.pow(x, 2.5);
    const top = fnPts(load, 0, 1, Bg.X, Bg.Y, 60), bot = fnPts(unload, 1, 0, Bg.X, Bg.Y, 60);
    g += title(720, 34, 'Rubber: loading and unloading');
    g += `<path d="M${top.concat(bot).map(p => f(p[0]) + ' ' + f(p[1])).join('L')}Z" fill="${RD}" fill-opacity=".2"/>` + pl(top, RD, 3.5) + pl(bot, BL, 3.5);
    g += arrow(Bg.X(.5), Bg.Y(load(.5)) - 14, Bg.X(.62), Bg.Y(load(.62)) - 14, RD, 2.5, 10) + T(Bg.X(.36), Bg.Y(load(.36)) - 22, 'loading', { size: 13, w: 700, fill: RD, a: 'end' });
    g += arrow(Bg.X(.8), Bg.Y(unload(.8)) + 14, Bg.X(.68), Bg.Y(unload(.68)) + 14, BL, 2.5, 10) + T(Bg.X(.82), Bg.Y(unload(.82)) + 40, 'unloading', { size: 13, w: 700, fill: BL, a: 'start' });
    g += ln(Bg.X(.3), Bg.Y(.8), Bg.X(.62), Bg.Y(.52), RD, 1.3) + dot(Bg.X(.62), Bg.Y(.52), 3, RD) + note(Bg.X(.02), Bg.Y(.96), ['area between the curves', '= energy dissipated as heat'], { size: 12, lh: 16, fill: RD });
    g += T(470, 395, 'Elastic: returns along the same line. A loop (hysteresis) means energy is lost each cycle; plastic deformation leaves a permanent extension.', { size: 12 });
    return wrap(W, H, o.aria || 'Force-extension graph with the triangle under it shaded as stored energy, and a rubber loading and unloading loop with the energy dissipated shaded', '', g);
  };

  /* ---------- ep9 explosion and elastic collision ---------- */
  add.explosionElastic = (o = {}) => {
    const W = 940, H = 420, sc = 34; // px per m s⁻¹
    let g = title(230, 30, 'Explosion: trolleys pushed apart') + title(700, 30, 'Elastic collision');
    g += T(40, 72, 'before', { size: 13, a: 'start', w: 700 }) + `<path d="M30 126H440" stroke="currentColor" stroke-width="1.5"/>`;
    g += trolley(150, 112, 70, 34, BL, '1.0 kg') + trolley(222, 112, 110, 34, RD, '2.0 kg') + T(240, 152, 'at rest: total momentum = 0', { size: 13 });
    g += T(40, 200, 'after', { size: 13, a: 'start', w: 700 }) + `<path d="M30 254H440" stroke="currentColor" stroke-width="1.5"/>`;
    g += trolley(90, 240, 70, 34, BL, '1.0 kg') + trolley(282, 240, 110, 34, RD, '2.0 kg');
    g += arrow(150, 194, 150 - 0.6 * sc * 2, 194, BL, 3.5) + T(130, 182, '0.60 m s⁻¹', { size: 12, fill: BL }) + arrow(330, 194, 330 + 0.3 * sc * 2, 194, RD, 3.5) + T(350, 182, '0.30 m s⁻¹', { size: 12, fill: RD });
    g += note(40, 296, ['1.0 × (−0.60) + 2.0 × (+0.30) = 0', 'momentum is still zero: the trolleys', 'move apart with equal and opposite', 'momentum (0.60 N s each)', 'kinetic energy comes from the spring'], { size: 13 });
    // elastic: 2.0 kg at 3.0 m/s on 1.0 kg at rest → 1.0 and 4.0 m/s
    g += `<line x1="470" y1="50" x2="470" y2="400" stroke="currentColor" stroke-opacity=".2"/>`;
    g += T(510, 72, 'before', { size: 13, a: 'start', w: 700 }) + `<path d="M500 126H910" stroke="currentColor" stroke-width="1.5"/>`;
    g += trolley(530, 112, 110, 34, RD, '2.0 kg') + trolley(780, 112, 70, 34, BL, '1.0 kg') + arrow(640, 86, 640 + 3 * sc, 86, RD, 3.5) + T(690, 76, '3.0 m s⁻¹', { size: 12, fill: RD }) + T(815, 160, 'at rest', { size: 12 });
    g += T(510, 200, 'after', { size: 13, a: 'start', w: 700 }) + `<path d="M500 254H910" stroke="currentColor" stroke-width="1.5"/>`;
    g += trolley(600, 240, 110, 34, RD, '2.0 kg') + trolley(760, 240, 70, 34, BL, '1.0 kg') + arrow(710, 214, 710 + 1 * sc, 214, RD, 3.5) + T(728, 204, '1.0', { size: 12, fill: RD }) + arrow(830, 214, 830 + 2.0 * sc, 214, BL, 3.5) + T(866, 204, '4.0 m s⁻¹', { size: 12, fill: BL });
    g += note(510, 296, ['momentum: 2.0 × 3.0 = 2.0 × 1.0 + 1.0 × 4.0 = 6.0 N s', 'kinetic energy: ½ × 2.0 × 3.0² = 9.0 J', '   after: ½ × 2.0 × 1.0² + ½ × 1.0 × 4.0² = 1.0 + 8.0 = 9.0 J', 'elastic: kinetic energy is conserved as well', 'relative speed of approach = relative speed of separation (3.0)'], { size: 13 });
    return wrap(W, H, o.aria || 'Two trolleys pushed apart by a spring with equal and opposite momentum, and an elastic collision in which momentum and kinetic energy are both conserved', '', g);
  };

  /* ---------- ep10 two-dimensional collision ---------- */
  add.collision2D = (o = {}) => {
    const W = 940, H = 420, pA = 0.6, pAx = 0.2 * 1.5 * Math.cos(60 * deg), pAy = 0.2 * 1.5 * Math.sin(60 * deg), pBx = pA - pAx, pBy = -pAy, pB = Math.hypot(pBx, pBy), aB = Math.atan2(-pBy, pBx) / deg;
    let g = title(230, 30, 'Pucks on an air table (from above)') + title(700, 30, 'Momentum vectors (N s)');
    // left: paths
    const cx = 260, cy = 200;
    g += arrow(60, cy, cx - 26, cy, BL, 3.5) + `<circle cx="${cx - 40}" cy="${cy}" r="14" fill="${BL}"/>` + T(110, cy - 14, 'A: 0.20 kg, 3.0 m s⁻¹', { size: 12, fill: BL });
    g += `<circle cx="${cx}" cy="${cy}" r="17" fill="${RD}"/>` + T(cx - 14, cy + 34, 'B: 0.30 kg at rest', { size: 12, fill: RD, a: 'end' });
    g += arrow(cx, cy, cx + 160 * Math.cos(60 * deg), cy - 160 * Math.sin(60 * deg), BL, 3, 11) + T(cx + 92, cy - 150, 'A: 1.5 m s⁻¹', { size: 12, fill: BL, a: 'start' });
    g += arrow(cx, cy, cx + 170 * Math.cos(aB * deg), cy + 170 * Math.sin(aB * deg), RD, 3, 11) + T(cx + 150, cy + 100, `B: ${(pB / 0.3).toFixed(2)} m s⁻¹`, { size: 12, fill: RD, a: 'start' });
    g += ln(cx, cy, cx + 200, cy, 'currentColor', 1.2, dsh + ' opacity=".5"');
    g += `<path d="M${cx + 54} ${cy}A54 54 0 0 0 ${f(cx + 54 * Math.cos(60 * deg))} ${f(cy - 54 * Math.sin(60 * deg))}" fill="none" stroke="${BL}" stroke-width="1.5"/>` + T(cx + 62, cy - 26, '60°', { size: 12, a: 'start', fill: BL });
    g += `<path d="M${cx + 64} ${cy}A64 64 0 0 1 ${f(cx + 64 * Math.cos(aB * deg))} ${f(cy + 64 * Math.sin(aB * deg))}" fill="none" stroke="${RD}" stroke-width="1.5"/>` + T(cx + 72, cy + 26, `${aB.toFixed(0)}°`, { size: 12, a: 'start', fill: RD });
    // right: closed vector triangle, scale 500 px per N s
    const s = 500, ox = 540, oy = 230;
    g += arrow(ox, oy, ox + pA * s, oy, 'currentColor', 3.5) + T(ox + pA * s / 2, oy + 24, 'p before = 0.60', { size: 13, w: 700 });
    g += arrow(ox, oy, ox + pAx * s, oy - pAy * s, BL, 3.5) + T(ox + pAx * s / 2 - 12, oy - pAy * s / 2 - 6, `p_A = ${(pAx * 2).toFixed(2)}`, { size: 13, w: 700, fill: BL, a: 'end' });
    g += arrow(ox + pAx * s, oy - pAy * s, ox + pA * s, oy, RD, 3.5) + T(ox + (pAx + pA) * s / 2 + 16, oy - pAy * s / 2 - 6, `p_B = ${pB.toFixed(2)}`, { size: 13, w: 700, fill: RD, a: 'start' });
    g += ln(ox + pAx * s, oy - pAy * s, ox + pAx * s, oy, 'currentColor', 1.3, dsh + ' opacity=".6"');
    g += T(ox + pAx * s / 2, oy - 8, (pAx).toFixed(2), { size: 11, fill: BL }) + T(ox + (pAx + pA) * s / 2, oy - 8, pBx.toFixed(2), { size: 11, fill: RD }) + T(ox + pAx * s + 6, oy - pAy * s / 2 + 4, `${pAy.toFixed(2)}`, { size: 11, a: 'start' });
    g += note(520, 296, [`x: 0.60 = ${pAx.toFixed(2)} + p_Bx  →  p_Bx = ${pBx.toFixed(2)} N s`, `y: 0 = ${pAy.toFixed(2)} + p_By  →  p_By = −${pAy.toFixed(2)} N s`, `p_B = √(${pBx.toFixed(2)}² + ${pAy.toFixed(2)}²) = ${pB.toFixed(2)} N s`, `v_B = ${pB.toFixed(2)} ÷ 0.30 = ${(pB / 0.3).toFixed(2)} m s⁻¹ at ${aB.toFixed(0)}° below the line`], { size: 13 });
    g += T(230, 380, 'momentum is conserved in each of two perpendicular directions', { size: 13 });
    return wrap(W, H, o.aria || 'Two pucks colliding at an angle with the momentum vectors drawn as a closed triangle and resolved into components', '', g);
  };

  /* ---------- e9 series–parallel network solved ---------- */
  add.networkSolved = (o = {}) => {
    const W = 940, H = 400, V = 9.0, R1 = 20, R2 = 40, R3 = 30, I1 = V / (R1 + R2), I3 = V / R3, I = I1 + I3, Rt = V / I;
    let g = title(300, 30, 'Two branches across a 9.0 V supply');
    const L = 90, Rr = 520, top = 90, mid = 210, bot = 330;
    // left node joins the + terminal (top), right node returns to the − terminal (bottom); branches in parallel between them
    const yb1 = 150, yb2 = 270, xl = L + 80, xr = Rr - 60;
    g += `<path d="M${L} ${mid - 30}V${top}H${xl}V${yb2}M${xl} ${yb1}H${xr}M${xl} ${yb2}H${xr}M${xr} ${yb1}V${bot}H${L}V${mid + 30}" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round"/>`;
    g += dot(xl, yb1, 4.5, 'currentColor') + dot(xr, yb2, 4.5, 'currentColor');
    g += resistor(240, yb1, 'R₁ = 20 Ω') + resistor(380, yb1, 'R₂ = 40 Ω') + resistor(310, yb2, 'R₃ = 30 Ω');
    g += `<rect x="${L - 22}" y="${mid - 30}" width="44" height="60" fill="var(--panel,#fff)" opacity="0"/>` + ln(L - 18, mid - 6, L + 18, mid - 6, 'currentColor', 3) + ln(L - 9, mid + 6, L + 9, mid + 6, 'currentColor', 5) + ln(L, mid - 30, L, mid - 6, 'currentColor', 2.5) + ln(L, mid + 6, L, mid + 30, 'currentColor', 2.5);
    g += T(L - 26, mid + 5, '9.0 V', { size: 14, w: 700, a: 'end' });
    g += arrow(L, top + 40, L, top + 4, RD, 3, 10) + T(L + 8, top + 30, `${I.toFixed(2)} A`, { size: 13, w: 700, fill: RD, a: 'start' });
    g += arrow(178, yb1, 206, yb1, RD, 3, 10) + T(192, yb1 + 22, `${I1.toFixed(2)} A`, { size: 13, w: 700, fill: RD });
    g += arrow(178, yb2, 250, yb2, RD, 3, 10) + T(214, yb2 + 22, `${I3.toFixed(2)} A`, { size: 13, w: 700, fill: RD });
    g += T(240, yb1 + 44, `${(I1 * R1).toFixed(1)} V`, { size: 13, w: 700, fill: BL }) + T(380, yb1 + 44, `${(I1 * R2).toFixed(1)} V`, { size: 13, w: 700, fill: BL }) + T(310, yb2 + 44, `${(I3 * R3).toFixed(1)} V`, { size: 13, w: 700, fill: BL });
    g += note(590, 90, ['1  Each branch has the full 9.0 V', `   branch 1: 20 + 40 = 60 Ω → ${I1.toFixed(2)} A`, `   branch 2: 9.0 ÷ 30 = ${I3.toFixed(2)} A`, '2  Kirchhoff’s first law', `   supply current = ${I1.toFixed(2)} + ${I3.toFixed(2)} = ${I.toFixed(2)} A`, `   (check: R_total = 9.0 ÷ ${I.toFixed(2)} = ${Rt.toFixed(0)} Ω)`, '3  Work back with V = IR', `   V₁ = ${I1.toFixed(2)} × 20 = ${(I1 * R1).toFixed(1)} V`, `   V₂ = ${I1.toFixed(2)} × 40 = ${(I1 * R2).toFixed(1)} V`, `   ${(I1 * R1).toFixed(1)} + ${(I1 * R2).toFixed(1)} = 9.0 V round each loop`], { size: 13, lh: 20 });
    g += T(300, 376, 'red: currents     blue: p.d.s', { size: 12 });
    return wrap(W, H, o.aria || 'A 9 volt supply across 20 and 40 ohm resistors in series, in parallel with 30 ohms, with every current and potential difference labelled', '', g);
  };

  /* ---------- e12 thermistor sensing circuit with computed Vout ---------- */
  add.sensingDivider = (o = {}) => {
    const W = 940, H = 410, Vin = 5.0, Rf = 10, RT = Tc => 10 * Math.exp(3950 * (1 / (Tc + 273.15) - 1 / 298.15)), Vo = Tc => Vin * RT(Tc) / (RT(Tc) + Rf);
    let g = title(170, 30, 'Temperature-sensing divider') + title(640, 30, 'V_out against temperature (computed)');
    const x = 170;
    g += `<path d="M${x} 70V110M${x} 164V200M${x} 254V300" stroke="currentColor" stroke-width="2.5" fill="none"/>`;
    g += resistor(x, 137, '', true) + T(x - 20, 142, '10 kΩ', { size: 13, w: 700, a: 'end' });
    g += resistor(x, 227, '', true) + ln(x - 22, 248, x + 22, 206, 'currentColor', 2) + ln(x + 22, 206, x + 32, 206, 'currentColor', 2) + T(x - 20, 232, 'thermistor', { size: 13, w: 700, a: 'end' });
    g += T(x, 62, '+5.0 V', { size: 13, w: 700 }) + T(x, 318, '0 V', { size: 13, w: 700 });
    g += ln(x, 182, 290, 182, 'currentColor', 2.5) + dot(x, 182, 4, 'currentColor') + `<circle cx="294" cy="182" r="5" fill="none" stroke="currentColor" stroke-width="2"/>` + ln(x, 300, 290, 300, 'currentColor', 2.5) + `<circle cx="294" cy="300" r="5" fill="none" stroke="currentColor" stroke-width="2"/>`;
    g += dbl(294, 194, 294, 290, BL, 2) + T(304, 246, 'V_out', { size: 14, w: 700, a: 'start', fill: BL });
    g += note(40, 352, ['V_out = V_in × R_T ÷ (R_T + 10 kΩ)', 'hotter → R_T falls → V_out falls'], { size: 13 });
    const G = graph({ x0: 470, y0: 330, w: 410, h: 250, xr: [0, 100], yr: [0, 5], xt: [20, 40, 60, 80, 100], yt: [1, 2, 3, 4, 5], xl: 'Temperature / °C', yl: 'V_out / V', ylo: 40 });
    g += G.g + pl(fnPts(Vo, 0, 100, G.X, G.Y), BL, 3.5);
    g += ln(G.X(0), G.Y(2.5), G.X(100), G.Y(2.5), RD, 2, dsh) + T(G.X(98), G.Y(2.5) - 8, 'switching level 2.5 V', { size: 12, a: 'end', fill: RD });
    g += dot(G.X(25), G.Y(Vo(25)), 6, AM) + T(G.X(28), G.Y(2.5) - 10, 'R_T = 10 kΩ at 25 °C', { size: 12, a: 'start', fill: AM });
    g += T(G.X(62), G.Y(4.4), 'NTC thermistor, 10 kΩ at 25 °C', { size: 12 }) + T(G.X(62), G.Y(4.4) + 16, '(an LDR divider behaves the same way with light)', { size: 12 });
    return wrap(W, H, o.aria || 'A potential divider with a fixed resistor and a thermistor, and a computed graph of output voltage falling as temperature rises', '', g);
  };

  /* ---------- wv5 two-source interference ---------- */
  add.twoSource = (o = {}) => {
    const W = 940, H = 420, lam = 30, d = 96, sx = 110, sy = 210, x1 = 560, yT = 40, yB = 380;
    const S1 = [sx, sy - d / 2], S2 = [sx, sy + d / 2], diff = (x, y) => Math.hypot(x - S2[0], y - S2[1]) - Math.hypot(x - S1[0], y - S1[1]);
    const curve = D => { const p = []; for (let x = sx + 8; x <= x1; x += 6) { let lo = yT - 400, hi = yB + 400; if ((diff(x, lo) - D) * (diff(x, hi) - D) > 0) continue; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; ((diff(x, lo) - D) * (diff(x, m) - D) <= 0) ? hi = m : lo = m; } const y = (lo + hi) / 2; if (y >= yT && y <= yB) p.push([x, y]); } return p; };
    let g = `<defs><clipPath id="ts"><rect x="${sx}" y="${yT}" width="${x1 - sx}" height="${yB - yT}"/></clipPath></defs>` + title(330, 28, 'Two coherent sources in phase');
    g += `<g clip-path="url(#ts)">`;
    for (let k = 1; k <= 17; k++) g += `<circle cx="${S1[0]}" cy="${S1[1]}" r="${k * lam}" fill="none" stroke="${BL}" stroke-width="1.3" opacity=".45"/><circle cx="${S2[0]}" cy="${S2[1]}" r="${k * lam}" fill="none" stroke="${BL}" stroke-width="1.3" opacity=".45"/>`;
    [-3, -2, -1, 0, 1, 2, 3].forEach(n => { const p = curve(n * lam); if (p.length > 2) g += pl(p, RD, 3); });
    [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].forEach(n => { const p = curve(n * lam); if (p.length > 2) g += pl(p, 'currentColor', 2, dsh + ' opacity=".7"'); });
    g += `</g>` + dot(S1[0], S1[1], 7, AM) + dot(S2[0], S2[1], 7, AM) + T(S1[0] - 12, S1[1] + 5, 'S₁', { size: 14, w: 700, a: 'end' }) + T(S2[0] - 12, S2[1] + 5, 'S₂', { size: 14, w: 700, a: 'end' });
    const p0 = curve(lam).find(p => p[0] > 470) || [500, 150];
    g += T(x1 + 8, curve(0).slice(-1)[0][1] + 4, 'n = 0', { size: 12, a: 'start', fill: RD });
    const e1 = curve(lam).slice(-1)[0], e2 = curve(-lam).slice(-1)[0];
    if (e1) g += T(e1[0] + 8, e1[1] + 4, 'n = 1', { size: 12, a: 'start', fill: RD }); if (e2) g += T(e2[0] + 8, e2[1] + 4, 'n = 1', { size: 12, a: 'start', fill: RD });
    g += note(640, 80, ['circles: wave crests, λ apart', '', 'red lines: crest meets crest', 'path difference = nλ', '→ constructive: maximum', '', 'dashed: crest meets trough', 'path difference = (n + ½)λ', '→ destructive: minimum'], { size: 13, lh: 19 });
    g += box(630, 268, 290, 112, AM, .1) + note(642, 290, ['Two loudspeakers, 680 Hz, v = 340 m s⁻¹', 'λ = 340 ÷ 680 = 0.50 m', 'path difference = 4.75 − 4.00 = 0.75 m', '= 1.5λ → quiet (destructive)', 'sources must be coherent'], { size: 12, lh: 19 });
    return wrap(W, H, o.aria || 'Wavefronts from two coherent sources with the lines of maxima where the path difference is a whole number of wavelengths and the minima between them', '', g);
  };

  /* ---------- a5 diffraction grating orders ---------- */
  add.gratingOrders = (o = {}) => {
    const W = 940, H = 470, lam = 656e-9, N = 300e3, dg = 1 / N, nmax = Math.floor(dg / lam), gx = 230, gy = 235, L = 245;
    let g = title(470, 28, 'Diffraction grating: d sin θ = nλ');
    g += `<rect x="${gx - 4}" y="95" width="8" height="280" fill="currentColor" fill-opacity=".2"/>`; for (let y = 99; y < 375; y += 8) g += ln(gx - 4, y, gx + 4, y, 'currentColor', 1.5);
    g += T(gx, 394, 'grating', { size: 12 }) + T(gx, 410, '300 lines per mm', { size: 12 });
    g += `<path d="M60 ${gy}H${gx}" stroke="${RD}" stroke-width="5"/>` + T(110, gy - 14, 'laser, λ = 656 nm', { size: 12, fill: RD });
    const sxs = gx + L;
    g += ln(sxs, 50, sxs, 420, 'currentColor', 2.5) + T(sxs, 438, 'screen', { size: 12 });
    for (let n = -3; n <= 3; n++) {
      const th = Math.asin(n * lam / dg), y = gy - Math.tan(th) * L; // up is positive n
      g += ln(gx, gy, sxs, y, RD, n ? 2.5 : 3.5, ' opacity=".85"') + dot(sxs, y, 6, RD) + T(sxs + 14, y + 5, `n = ${n > 0 ? '+' + n : String(n).replace('-', '−')}` + (n ? `,  θ = ${(Math.abs(th) / deg).toFixed(1)}°` : '  (straight through)'), { size: 12, a: 'start' });
    }
    const t1 = Math.asin(lam / dg);
    g += `<path d="M${gx + 110} ${gy}A110 110 0 0 0 ${f(gx + 110 * Math.cos(t1))} ${f(gy - 110 * Math.sin(t1))}" fill="none" stroke="currentColor" stroke-width="1.5"/>` + T(gx + 118, gy - 6, 'θ₁', { size: 13, a: 'start' });
    g += note(40, 80, [`d = 1 ÷ 300 000 m⁻¹`, `  = ${(dg * 1e6).toFixed(2)} μm`, '', `sin θ ≤ 1, so`, `n_max = d ÷ λ = ${(dg / lam).toFixed(2)}`, `→ ${nmax} orders each side`], { size: 13, lh: 19 });
    g += T(470, 462, `Each slit is a source; the beams reinforce where the path difference from neighbouring slits is nλ. Orders 4 and 5 miss this screen.`, { size: 12 });
    return wrap(W, H, o.aria || 'Laser light passing through a diffraction grating producing orders at angles computed from d sin theta equals n lambda', '', g);
  };

  /* ---------- wv10 KEmax against frequency ---------- */
  add.photoKE = (o = {}) => {
    const W = 920, H = 430, h = 6.63e-34, e = 1.60e-19, k = h / e * 1e15; // eV per 10^15 Hz
    const G = graph({ x0: 100, y0: 400, w: 500, h: 330, xr: [0, 2.0], yr: [-5, 3], xAt: 0, xt: [0.5, 1.0, 1.5, 2.0], yt: [-5, -4, -3, -2, -1, 1, 2, 3], xl: '', yl: 'KE_max / eV', ylo: 54 });
    let g = G.g + T(G.X(1.0), G.Y(0) - 0, '', {}) + T(G.X(1.95), G.Y(0) - 10, 'f / 10¹⁵ Hz', { size: 13, a: 'end' }) + title(350, 30, 'hf = φ + KE_max  →  KE_max = hf − φ');
    [['copper', 4.7, BL], ['sodium', 2.28, GN]].forEach(([nm, phi, c]) => {
      const f0 = phi / k;
      const fe = Math.min(2.0, (3 + phi) / k);
      g += pl([[G.X(0), G.Y(-phi)], [G.X(f0), G.Y(0)]], c, 2, dsh) + pl([[G.X(f0), G.Y(0)], [G.X(fe), G.Y(k * fe - phi)]], c, 3.5);
      g += dot(G.X(f0), G.Y(0), 5, c) + dot(G.X(0), G.Y(-phi), 5, c) + T(G.X(0) + 10, G.Y(-phi) + 5, `−φ = −${phi} eV (${nm})`, { size: 12, a: 'start', fill: c });
      g += T(G.X(f0) + 6, G.Y(0) + 34, `f₀ = ${f0.toFixed(2)}`, { size: 12, fill: c, a: 'start' });
      g += T(G.X(fe) + 6, G.Y(k * fe - phi) + 14, nm, { size: 13, w: 700, fill: c, a: 'start' });
    });
    const fx = 3e8 / 200e-9 / 1e15, KE = k * fx - 4.7;
    g += dot(G.X(fx), G.Y(KE), 6, AM) + T(G.X(fx) + 10, G.Y(KE) + 18, `200 nm UV: ${KE.toFixed(2)} eV`, { size: 12, a: 'start', fill: AM });
    g += note(640, 90, ['Every metal gives a line of', 'gradient h (the Planck constant).', '', 'x-intercept: threshold frequency f₀', 'y-intercept: −φ (work function)', '', 'Below f₀ no electrons escape,', 'however bright the light.', 'Brighter light: more electrons', 'per second, same KE_max.', '', `gradient = ${(k).toFixed(2)} eV per 10¹⁵ Hz`, '= 6.63 × 10⁻³⁴ J s'], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'Graph of maximum kinetic energy against frequency for copper and sodium: parallel lines of gradient h with intercepts at the threshold frequency and minus the work function', '', g);
  };

  /* ---------- t7 isotherms pV = nRT ---------- */
  add.isotherms = (o = {}) => {
    const W = 920, H = 410, n = 1.49, R = 8.31;
    const G = graph({ x0: 100, y0: 340, w: 480, h: 280, xr: [0, 0.03], yr: [0, 900], xt: [0.005, 0.01, 0.015, 0.02, 0.025, 0.03], yt: [150, 300, 450, 600, 750, 900], xl: 'Volume V / m³', yl: 'Pressure p / kPa', ylo: 58 });
    let g = G.g + title(340, 30, `Isotherms for ${n} mol of air (pV = nRT)`);
    [[290, BL], [350, RD]].forEach(([Tk, c]) => { const p = V => n * R * Tk / V / 1000; g += pl(fnPts(p, 0.0055, 0.03, G.X, G.Y), c, 3.5) + T(G.X(0.0055) - 6, G.Y(p(0.0055)) + 4, `${Tk} K`, { size: 13, w: 700, fill: c, a: 'end' }); });
    const p0 = n * R * 290 / 0.012 / 1000;
    g += dot(G.X(0.012), G.Y(p0), 6, AM) + T(G.X(0.0118), G.Y(p0) + 26, `tyre: 0.012 m³, ${Math.round(p0)} kPa, 290 K`, { size: 12, a: 'end', fill: AM });
    g += note(620, 90, ['Along each curve T is constant,', 'so pV is constant (Boyle’s law).', '', 'A hotter isotherm lies further', 'from the axes: pV = nRT is larger.', '', `290 K: pV = ${(n * R * 290).toFixed(0)} J`, `350 K: pV = ${(n * R * 350).toFixed(0)} J`, '', 'Use SI units: Pa, m³, K.', 'p against 1/V is a straight line', 'through the origin.'], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'Pressure against volume for a fixed amount of gas at 290 K and 350 K, computed from pV equals nRT', '', g);
  };

  /* ---------- cg2 centripetal force ---------- */
  add.centripetal = (o = {}) => {
    const W = 920, H = 410, cx = 230, cy = 215, r = 140;
    let g = title(230, 30, 'Constant speed, changing velocity') + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 6" opacity=".7"/>` + dot(cx, cy, 4, 'currentColor');
    [[30, 'A'], [130, 'B']].forEach(([a, lab]) => {
      const x = cx + r * Math.cos(a * deg), y = cy - r * Math.sin(a * deg), tx = -Math.sin(a * deg), ty = -Math.cos(a * deg);
      g += `<circle cx="${f(x)}" cy="${f(y)}" r="11" fill="${AM}"/>` + T(x + 16 * Math.cos(a * deg), y - 16 * Math.sin(a * deg) - 4, lab, { size: 13, w: 700 });
      g += arrow(x, y, x + tx * 100, y + ty * 100, BL, 3.5) + T(x + tx * 112, y + ty * 112 + 4, 'v', { size: 15, w: 700, fill: BL });
      g += arrow(x, y, x + (cx - x) * .55, y + (cy - y) * .55, RD, 3.5) + T(x + (cx - x) * .55, y + (cy - y) * .55 + 22, 'F, a', { size: 13, w: 700, fill: RD });
    });
    g += ln(cx, cy, cx + r * Math.cos(-60 * deg), cy - r * Math.sin(-60 * deg), 'currentColor', 1.5) + T(cx + 40, cy + 70, 'r', { size: 14, w: 700 });
    // velocity change: vA and vB from a common point, Δv towards the centre
    const ox = 520, oy = 230, L = 110, vA = [-Math.sin(30 * deg), -Math.cos(30 * deg)], vB = [-Math.sin(130 * deg), -Math.cos(130 * deg)];
    g += title(600, 74, 'Change of velocity from A to B', 14);
    g += arrow(ox, oy, ox + vA[0] * L, oy + vA[1] * L, BL, 3) + T(ox + vA[0] * L - 4, oy + vA[1] * L + 20, 'v_A', { size: 13, fill: BL, a: 'end' });
    g += arrow(ox, oy, ox + vB[0] * L, oy + vB[1] * L, BL, 3) + T(ox + vB[0] * L + 6, oy + vB[1] * L - 6, 'v_B', { size: 13, fill: BL, a: 'start' });
    g += arrow(ox + vA[0] * L, oy + vA[1] * L, ox + vB[0] * L, oy + vB[1] * L, RD, 3) + T(ox + (vA[0] + vB[0]) * L / 2 + 6, oy + (vA[1] + vB[1]) * L / 2 + 18, 'Δv', { size: 13, w: 700, fill: RD, a: 'start' });
    g += note(470, 300, ['Δv points towards the centre of the circle,', 'so the acceleration does too.', 'a = v² ÷ r = ω²r      F = mv² ÷ r = mω²r', 'The resultant force does no work: it is', 'perpendicular to the velocity, so the speed stays the same.'], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'An object moving in a circle with velocity along the tangent and the resultant force towards the centre at two positions, and the velocity change pointing to the centre', '', g);
  };

  /* ---------- cg4 energy in SHM ---------- */
  add.shmEnergy = (o = {}) => {
    const W = 920, H = 410, k = 200, A = 0.04, m = 0.5, Et = 0.5 * k * A * A, vmax = Math.sqrt(2 * Et / m);
    const X = x => 330 + x / A * 250, Y = E => 352 - E / 0.2 * 272;
    let g = title(330, 26, 'Mass on a spring: k = 200 N m⁻¹, m = 0.50 kg, A = 0.040 m');
    g += `<path d="M70 352H600M330 352V68" stroke="currentColor" stroke-width="2" fill="none"/>`;
    [-0.04, -0.02, 0.02, 0.04].forEach(x => { g += ln(X(x), 352, X(x), 357, 'currentColor', 1.5) + T(X(x), 374, fmt(x), { size: 12 }); });
    [0.05, 0.1, 0.15, 0.2].forEach(E => { g += ln(70, Y(E), 600, Y(E), 'currentColor', 1, ' opacity=".14"') + ln(325, Y(E), 330, Y(E), 'currentColor', 1.5) + T(320, Y(E) + 4, E.toFixed(2), { size: 12, a: 'end' }); });
    g += T(330, 400, 'Displacement x / m', { size: 14 }) + T(340, 60, 'Energy / J', { size: 14, a: 'start' });
    g += pl([[X(-A), Y(Et)], [X(A), Y(Et)]], AM, 3.5) + T(X(A) + 8, Y(Et) + 4, `total = ½kA² = ${Et.toFixed(2)} J`, { size: 13, a: 'start', fill: AM, w: 700 });
    g += pl(fnPts(x => 0.5 * k * x * x, -A, A, X, Y), BL, 3.5) + T(X(-A) - 6, Y(Et) + 30, 'potential ½kx²', { size: 13, a: 'end', fill: BL, w: 700 });
    g += pl(fnPts(x => 0.5 * k * (A * A - x * x), -A, A, X, Y), RD, 3.5) + T(X(-0.006), Y(0.185), 'kinetic ½k(A² − x²)', { size: 13, fill: RD, w: 700, a: 'end' }) + ln(X(-0.006) + 4, Y(0.185) + 2, X(-0.012), Y(0.5 * k * (A * A - 0.012 * 0.012)) - 4, RD, 1.2);
    g += ln(X(-A), Y(Et), X(-A), 352, 'currentColor', 1.2, dsh + ' opacity=".6"') + ln(X(A), Y(Et), X(A), 352, 'currentColor', 1.2, dsh + ' opacity=".6"');
    g += note(660, 180, ['At x = 0: all kinetic', `v_max = √(2E ÷ m) = ${vmax.toFixed(2)} m s⁻¹`, '', 'At x = ±A: all potential,', 'the mass is momentarily at rest', '', 'Kinetic + potential = constant', '(no damping).', 'E_total ∝ A²'], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'Kinetic, potential and total energy against displacement for simple harmonic motion: two parabolas that add to a constant', '', g);
  };

  /* ---------- cg6 radial gravitational field and g against r ---------- */
  add.gravField = (o = {}) => {
    const W = 920, H = 410, cx = 180, cy = 215, Re = 70;
    let g = title(180, 30, 'Radial field of the Earth') + `<circle cx="${cx}" cy="${cy}" r="${Re}" fill="${BL}" fill-opacity=".75"/><path d="M${cx - 40} ${cy - 30}q20 -20 45 -6t20 30q-20 20 -45 6z" fill="${GN}" opacity=".8"/>`;
    for (let i = 0; i < 12; i++) { const a = i * 30 * deg; g += arrow(cx + 150 * Math.cos(a), cy + 150 * Math.sin(a), cx + (Re + 8) * Math.cos(a), cy + (Re + 8) * Math.sin(a), 'currentColor', 2, 10); }
    g += T(cx, 392, 'lines point inwards and spread out', { size: 12 });
    const G = graph({ x0: 420, y0: 340, w: 440, h: 260, xr: [0, 5], yr: [0, 10], xt: [1, 2, 3, 4, 5], yt: [2, 4, 6, 8, 10], xl: 'Distance from centre r (in Earth radii R)', yl: 'g / N kg⁻¹', ylo: 40 });
    g += G.g + title(640, 30, 'g = GM ÷ r² outside the Earth');
    g += pl(fnPts(r => 9.81 / r / r, 1, 5, G.X, G.Y), RD, 3.5);
    g += `<rect x="${G.X(0)}" y="${G.Y(10)}" width="${G.X(1) - G.X(0)}" height="${G.Y(0) - G.Y(10)}" fill="currentColor" fill-opacity=".07"/>` + T(G.X(0.5), G.Y(1), 'inside', { size: 11 }) + T(G.X(0.5), G.Y(1) + 14, 'Earth', { size: 11 });
    [[1, '9.81 at the surface'], [2, '2.45 at 2R (¼)'], [3, '1.09 at 3R (⅑)']].forEach(([r, s]) => { g += dot(G.X(r), G.Y(9.81 / r / r), 5, RD) + T(G.X(r) + 10, G.Y(9.81 / r / r) - 8, s, { size: 12, a: 'start' }); });
    const rI = 6.77 / 6.37, gI = 9.81 / rI / rI;
    g += dot(G.X(rI), G.Y(gI), 5, AM) + T(G.X(rI) + 24, G.Y(gI) - 4, `ISS (400 km up): ${gI.toFixed(1)} N kg⁻¹`, { size: 12, a: 'start', fill: AM });
    return wrap(W, H, o.aria || 'Radial gravitational field lines pointing into the Earth and a graph of g falling as one over r squared from the surface', '', g);
  };

  /* ---------- fd7 electric potential of point charges ---------- */
  add.potentialCharge = (o = {}) => {
    const W = 940, H = 420, kQ = 8.99e9 * 2.0e-9; // Q = ±2.0 nC
    const G = graph({ x0: 90, y0: 380, w: 400, h: 330, xr: [0, 0.5], yr: [-400, 400], xAt: 0, xt: [0.1, 0.2, 0.3, 0.4, 0.5], yt: [-400, -200, 200, 400], xl: '', yl: 'Potential V / V', ylo: 50 });
    let g = G.g + T(G.X(0.5) + 6, G.Y(0) + 5, 'r / m', { size: 13, a: 'start' }) + title(290, 30, 'V = kQ ÷ r for Q = ±2.0 nC');
    g += pl(fnPts(r => kQ / r, 0.045, 0.5, G.X, G.Y), RD, 3.5) + T(G.X(0.2), G.Y(kQ / 0.2) - 14, '+2.0 nC: V positive', { size: 13, w: 700, fill: RD, a: 'start' });
    g += pl(fnPts(r => -kQ / r, 0.045, 0.5, G.X, G.Y), BL, 3.5) + T(G.X(0.2), G.Y(-kQ / 0.2) + 24, '−2.0 nC: V negative', { size: 13, w: 700, fill: BL, a: 'start' });
    g += T(G.X(0.25), G.Y(-340), 'V → 0 as r → ∞;  E = −gradient of the V–r graph', { size: 12 });
    // equipotentials around +Q at V = 60, 120, 180, 240, 300 V
    const cx = 720, cy = 225, s = 500; // px per m
    g += title(720, 30, 'Equipotentials around +2.0 nC');
    for (let i = 0; i < 12; i++) { const a = i * 30 * deg; g += arrow(cx + 14 * Math.cos(a), cy + 14 * Math.sin(a), cx + 172 * Math.cos(a), cy + 172 * Math.sin(a), 'currentColor', 1.4, 8); }
    [60, 90, 120, 150, 180].forEach(V => { const r = kQ / V * s; g += `<circle cx="${cx}" cy="${cy}" r="${f(r)}" fill="none" stroke="${RD}" stroke-width="2.2"/>`; });
    [60, 90, 120].forEach(V => { const r = kQ / V * s; g += HT(cx + r * Math.cos(-75 * deg), cy + r * Math.sin(-75 * deg) - 3, `${V} V`, RD); });
    g += `<circle cx="${cx}" cy="${cy}" r="11" fill="${RD}"/>` + T(cx, cy + 5, '+', { size: 16, w: 700, fill: '#fff' });
    g += T(cx, 412, 'equal 30 V steps (60 to 180 V) crowd together near the charge', { size: 12 });
    return wrap(W, H, o.aria || 'Graphs of potential against distance for positive and negative point charges, and circular equipotentials around a positive charge at equal steps of 30 volts', '', g);
  };

  /* ---------- a9 Hubble graph and age of the universe ---------- */
  add.hubbleAge = (o = {}) => {
    const W = 940, H = 410, H0 = 70, ds = [40, 75, 120, 160, 205, 250, 290, 340, 385, 440], eps = [0.06, -0.08, 0.05, -0.03, 0.07, -0.05, 0.02, -0.06, 0.04, -0.02];
    const G = graph({ x0: 100, y0: 340, w: 420, h: 270, xr: [0, 500], yr: [0, 35000], xt: [100, 200, 300, 400, 500], yt: [5000, 10000, 15000, 20000, 25000, 30000, 35000], xl: 'Distance d / Mpc', yl: 'Recession speed v / km s⁻¹', ylo: 62, yf: v => String(v / 1000) + ' 000' });
    let g = G.g + title(320, 30, 'Hubble’s law: v = H₀d');
    g += pl([[G.X(0), G.Y(0)], [G.X(500), G.Y(500 * H0)]], BL, 3) + ds.map((d, i) => dot(G.X(d), G.Y(H0 * d * (1 + eps[i])), 5, RD)).join('');
    g += T(G.X(250), G.Y(30500), `gradient H₀ = ${H0} km s⁻¹ Mpc⁻¹`, { size: 13, w: 700, fill: BL });
    const Hs = H0 / 3.086e19, age = 1 / Hs / 3.156e16;
    g += T(G.X(250), G.Y(30500) + 18, '(galaxy data: illustrative)', { size: 11 });
    // run the expansion backwards: separation shrinks linearly to zero at t = −1/H0
    const A = graph({ x0: 620, y0: 340, w: 280, h: 230, xr: [-15, 0], yr: [0, 1.2], xt: [-15, -10, -5, 0], yt: [], xl: 'Time from now / billion years', yl: 'Separation (now = 1)', ylo: 22, grid: false });
    g += A.g + title(760, 72, 'Run it backwards', 14) + pl([[A.X(-age), A.Y(0)], [A.X(0), A.Y(1)]], RD, 3) + dot(A.X(-age), A.Y(0), 6, AM) + dot(A.X(0), A.Y(1), 5, RD);
    g += ln(A.X(-age) + 2, A.Y(0) - 6, A.X(-13.6), A.Y(0.5), AM, 1.2) + note(A.X(-14.4), A.Y(0.62), [`zero ≈ ${age.toFixed(0)} billion`, 'years ago'], { size: 12, lh: 16, fill: AM });
    g += note(634, 140, ['if speeds were constant,', 'every separation reaches', 'zero at t = 1 ÷ H₀', `1 ÷ H₀ = ${(1 / Hs).toExponential(2).replace('e+', ' × 10^')} s`], { size: 12, lh: 17 });
    return wrap(W, H, o.aria || 'Hubble graph of recession speed against distance with gradient H0, and the separation of galaxies run backwards to zero at about 14 billion years ago', '', g).replace('10^17', '10¹⁷');
  };

  /* ---------- fd2 energy from the V–Q graph ---------- */
  add.capEnergy = (o = {}) => {
    const W = 920, H = 410, C = 1000e-6, V = 6.0, Q = C * V;
    const G = graph({ x0: 100, y0: 340, w: 440, h: 270, xr: [0, 7], yr: [0, 7], xt: [1, 2, 3, 4, 5, 6, 7], yt: [1, 2, 3, 4, 5, 6, 7], xl: 'Charge Q / mC', yl: 'p.d. V / V', ylo: 44 });
    let g = G.g + title(320, 30, '1000 μF capacitor charged to 6.0 V');
    g += `<rect x="${G.X(0)}" y="${G.Y(6)}" width="${G.X(6) - G.X(0)}" height="${G.Y(0) - G.Y(6)}" fill="none" stroke="${AM}" stroke-width="2" stroke-dasharray="7 5"/>`;
    g += `<path d="M${G.X(0)} ${G.Y(0)}L${G.X(6)} ${G.Y(6)}L${G.X(6)} ${G.Y(0)}Z" fill="${BL}" fill-opacity=".25"/>` + pl([[G.X(0), G.Y(0)], [G.X(6.6), G.Y(6.6)]], BL, 3.5);
    g += T(G.X(4.3), G.Y(1.3), 'area = ½QV', { size: 14, w: 700, fill: BL }) + T(G.X(4.3), G.Y(1.3) + 18, '= 18 mJ stored', { size: 13, fill: BL });
    g += T(G.X(2.2), G.Y(6) + 22, 'QV = 36 mJ from the battery', { size: 13, fill: AM, w: 700 });
    g += T(G.X(1.0), G.Y(4.6), 'gradient = 1 ÷ C', { size: 12, a: 'start' });
    g += note(590, 100, [`Q = CV = ${(Q * 1000).toFixed(1)} mC`, 'W = ½QV = ½CV² = Q² ÷ 2C', `  = ½ × 1000 × 10⁻⁶ × 6.0² = ${(0.5 * C * V * V * 1000).toFixed(0)} mJ`, '', 'The battery supplies QV = 36 mJ.', 'Half is stored; the other half', 'is dissipated in the resistance', 'of the circuit while charging.', '', 'Each small charge ΔQ is added', 'at the p.d. at that moment, so the', 'energy is the triangle, not QV.'], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'Graph of p.d. against charge for a capacitor with the triangular area of 18 millijoules shaded and the 36 millijoule rectangle supplied by the battery outlined', '', g);
  };

  /* ---------- fd9 charged particle in a magnetic field and velocity selector ---------- */
  add.magneticPath = (o = {}) => {
    const W = 940, H = 420, me = 9.11e-31, v = 3.0e7, B = 2.0e-3, e = 1.6e-19, r = me * v / (B * e);
    let g = title(230, 30, 'Electron in a uniform field (B into the page)');
    for (let x = 50; x <= 420; x += 40) for (let y = 70; y <= 380; y += 40) g += `<path d="M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8" stroke="currentColor" stroke-width="1.4" opacity=".4"/>`;
    const cx = 235, cy = 235, R = 115;
    g += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${BL}" stroke-width="3" stroke-dasharray="2 0"/>` + dot(cx, cy, 4, 'currentColor');
    g += `<circle cx="${cx}" cy="${cy - R}" r="9" fill="${BL}"/>` + T(cx, cy - R + 4, '−', { size: 14, w: 700, fill: '#fff' });
    g += arrow(cx + 10, cy - R, cx + 100, cy - R, GN, 3.5) + T(cx + 104, cy - R - 10, 'v', { size: 15, w: 700, fill: GN, a: 'start' });
    g += arrow(cx, cy - R + 12, cx, cy - R + 78, RD, 3.5) + T(cx + 8, cy - R + 64, 'F = BQv', { size: 13, w: 700, fill: RD, a: 'start' });
    g += ln(cx, cy, cx + R * Math.cos(35 * deg), cy + R * Math.sin(35 * deg), 'currentColor', 1.6) + T(cx + 60, cy + 54, 'r', { size: 14, w: 700 });
    g += note(40, 384, [`r = mv ÷ BQ = (9.11 × 10⁻³¹ × 3.0 × 10⁷) ÷ (2.0 × 10⁻³ × 1.60 × 10⁻¹⁹) = ${(r * 100).toFixed(1)} cm`], { size: 12 });
    g += T(40, 404, 'F ⊥ v, so the speed is constant: the force provides the centripetal force BQv = mv² ÷ r', { size: 12, a: 'start' });
    // velocity selector
    const x0 = 520, x1 = 900, yt = 120, yb = 300;
    g += title(710, 30, 'Velocity selector');
    g += `<rect x="${x0}" y="${yt - 12}" width="${x1 - x0}" height="12" fill="${RD}" fill-opacity=".8"/><rect x="${x0}" y="${yb}" width="${x1 - x0}" height="12" fill="${BL}" fill-opacity=".8"/>` + T(x0 - 8, yt - 2, '+', { size: 18, w: 700, a: 'end', fill: RD }) + T(x0 - 8, yb + 10, '−', { size: 18, w: 700, a: 'end', fill: BL });
    for (let x = x0 + 30; x < x1; x += 50) for (let y = yt + 30; y < yb; y += 50) g += `<path d="M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8" stroke="currentColor" stroke-width="1.4" opacity=".35"/>`;
    const ym = (yt + yb) / 2;
    g += arrow(x0 - 30, ym, x1 + 20, ym, GN, 3) + `<circle cx="${x0 + 150}" cy="${ym}" r="8" fill="${AM}"/>` + T(x0 + 150, ym + 4, '+', { size: 12, w: 700, fill: '#fff' });
    g += arrow(x0 + 150, ym - 10, x0 + 150, ym - 62, PU, 3) + T(x0 + 160, ym - 48, 'BQv (magnetic)', { size: 12, a: 'start', fill: PU, w: 700 }) + arrow(x0 + 150, ym + 10, x0 + 150, ym + 62, RD, 3) + T(x0 + 160, ym + 56, 'EQ (electric)', { size: 12, a: 'start', fill: RD, w: 700 });
    g += `<path d="M${x0 + 200} ${ym}Q${x0 + 320} ${ym} ${x1 - 20} ${ym - 70}" stroke="currentColor" stroke-width="1.6" fill="none" stroke-dasharray="5 5" opacity=".7"/>` + T(x1 - 20, ym - 78, 'faster', { size: 11, a: 'end' }) + `<path d="M${x0 + 200} ${ym}Q${x0 + 320} ${ym} ${x1 - 20} ${ym + 70}" stroke="currentColor" stroke-width="1.6" fill="none" stroke-dasharray="5 5" opacity=".7"/>` + T(x1 - 20, ym + 88, 'slower', { size: 11, a: 'end' });
    g += note(530, 346, ['Undeflected when EQ = BQv:', 'v = E ÷ B, whatever the charge or mass'], { size: 13 });
    return wrap(W, H, o.aria || 'An electron moving in a circle in a magnetic field into the page with the force towards the centre, and a velocity selector with balanced electric and magnetic forces', '', g);
  };

  /* ---------- n2 closest approach and nuclear radius ---------- */
  add.nuclearSize = (o = {}) => {
    const W = 940, H = 420, k = 8.99e9, e = 1.6e-19, Ek = 5.0e6 * e, d = k * 2 * 79 * e * e / Ek, Ra = 1.2 * Math.cbrt(197);
    let g = title(230, 30, 'Closest approach of an alpha particle');
    const nx = 380, ny = 190;
    g += `<circle cx="${nx}" cy="${ny}" r="16" fill="${RD}"/>` + T(nx, ny + 5, 'Au', { size: 11, w: 700, fill: '#fff' }) + T(nx, ny + 38, 'gold nucleus, +79e', { size: 12 });
    g += arrow(60, ny - 4, 270, ny - 4, BL, 3) + arrow(270, ny + 6, 80, ny + 6, BL, 2, 10) + `<circle cx="282" cy="${ny}" r="8" fill="${BL}"/>` + T(160, ny - 18, '5.0 MeV alpha, head-on', { size: 12, fill: BL });
    g += dbl(290, ny + 60, nx, ny + 60, 'currentColor', 1.6) + T((290 + nx) / 2, ny + 80, `d = ${(d * 1e15).toFixed(0)} fm`, { size: 13, w: 700 });
    g += note(40, 300, ['All kinetic energy → electric potential energy:', 'E_k = kQq ÷ d', `d = (8.99 × 10⁹ × 79e × 2e) ÷ (5.0 MeV) = ${(d * 1e15).toFixed(0)} fm`, `This is an upper limit for the radius. R(gold) = 1.2 × ∛197 = ${Ra.toFixed(1)} fm.`, 'Electron diffraction gives the radius more directly.'], { size: 12, lh: 19 });
    const nuc = [['C-12', 12], ['O-16', 16], ['Ca-40', 40], ['Fe-56', 56], ['Sn-120', 120], ['Pb-208', 208], ['U-238', 238]];
    const G = graph({ x0: 560, y0: 330, w: 330, h: 240, xr: [0, 7], yr: [0, 8], xt: [1, 2, 3, 4, 5, 6, 7], yt: [2, 4, 6, 8], xl: '∛A  (cube root of nucleon number)', yl: 'Radius R / fm', ylo: 38 });
    g += G.g + title(730, 30, 'R = r₀ ∛A with r₀ = 1.2 fm') + pl([[G.X(0), G.Y(0)], [G.X(6.6), G.Y(1.2 * 6.6)]], BL, 2.5);
    nuc.forEach(([nm, A], i) => { const x = Math.cbrt(A); g += dot(G.X(x), G.Y(1.2 * x), 5, RD) + (i % 2 === 0 || i === 6 ? T(G.X(x) + 8, G.Y(1.2 * x) + 15, nm, { size: 11, a: 'start' }) : T(G.X(x) - 8, G.Y(1.2 * x) - 6, nm, { size: 11, a: 'end' })); });
    const rho = 1.661e-27 / (4 / 3 * Math.PI * Math.pow(1.2e-15, 3));
    g += T(730, 395, `nuclear density = u ÷ (⁴⁄₃πr₀³) ≈ ${(rho / 1e17).toFixed(1)} × 10¹⁷ kg m⁻³ for every nucleus`, { size: 12, w: 700 }) + T(730, 413, '(water: 1.0 × 10³ kg m⁻³, so about 10¹⁴ times denser)', { size: 12 });
    return wrap(W, H, o.aria || 'An alpha particle approaching a gold nucleus head-on to a distance of closest approach, and a straight-line graph of nuclear radius against the cube root of nucleon number', '', g);
  };

  /* ---------- n6 ln(activity) against time ---------- */
  add.lnActivity = (o = {}) => {
    const W = 920, H = 410, th = 70, lam = Math.LN2 / th, A0 = 120, ts = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300], sc = [0.03, -0.04, 0.02, 0.05, -0.03, 0.01, -0.05, 0.04, -0.02, 0.03, -0.01];
    const G = graph({ x0: 100, y0: 340, w: 450, h: 270, xr: [0, 300], yr: [0, 5], xt: [50, 100, 150, 200, 250, 300], yt: [1, 2, 3, 4, 5], xl: 'Time t / s', yl: 'ln (A / Bq)', ylo: 40 });
    let g = G.g + title(330, 30, 'Protactinium-234m: ln A falls in a straight line');
    const lnA = t => Math.log(A0) - lam * t;
    g += pl([[G.X(0), G.Y(lnA(0))], [G.X(300), G.Y(lnA(300))]], BL, 3) + ts.map((t, i) => dot(G.X(t), G.Y(lnA(t) + sc[i]), 5, RD)).join('');
    const t1 = 50, t2 = 250;
    g += `<path d="M${G.X(t1)} ${G.Y(lnA(t1))}H${G.X(t2)}V${G.Y(lnA(t2))}" fill="none" stroke="${AM}" stroke-width="2"/>` + T((G.X(t1) + G.X(t2)) / 2, G.Y(lnA(t1)) - 8, `Δt = ${t2 - t1} s`, { size: 12, fill: AM }) + T(G.X(t2) + 8, (G.Y(lnA(t1)) + G.Y(lnA(t2))) / 2, `Δ ln A = −${(lam * (t2 - t1)).toFixed(2)}`, { size: 12, a: 'start', fill: AM });
    g += T(G.X(8), G.Y(lnA(0)) - 10, `intercept ln A₀ = ${Math.log(A0).toFixed(2)} → A₀ = ${A0} Bq`, { size: 12, a: 'start' });
    g += note(590, 100, ['A = A₀e^(−λt)', 'ln A = ln A₀ − λt', 'so ln A against t is a straight line', '', `gradient = −${(lam * (t2 - t1)).toFixed(2)} ÷ ${t2 - t1}`, `= −${lam.toFixed(4)} s⁻¹ = −λ`, `t½ = ln 2 ÷ λ = ${(Math.LN2 / lam).toFixed(0)} s`, '', 'Points scatter about the line', 'because decay is random.'], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'Graph of the natural log of activity against time for protactinium-234m giving a straight line of gradient minus lambda', '', g);
  };

  /* ---------- f3 block on a slope ---------- */
  add.slopeForces = (o = {}) => {
    const W = 920, H = 410, th = 30, m = 5.0, mg = m * 9.81, Fs = mg * Math.sin(th * deg), Fn = mg * Math.cos(th * deg), fr = 10, a = (Fs - fr) / m;
    const x0 = 70, y0 = 360, L = 520, c = Math.cos(th * deg), s = Math.sin(th * deg);
    let g = title(330, 30, '5.0 kg block sliding down a 30° slope');
    g += `<path d="M${x0} ${y0}H${x0 + L * c}V${f(y0 - L * s)}Z" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="2"/>`;
    g += `<path d="M${x0 + 70} ${y0}A70 70 0 0 0 ${f(x0 + 70 * c)} ${f(y0 - 70 * s)}" fill="none" stroke="currentColor" stroke-width="1.5"/>` + T(x0 + 80, y0 - 12, 'θ = 30°', { size: 13, a: 'start' });
    // block centred 300 px along the slope
    const d = 300, bx = x0 + d * c, by = y0 - d * s, nx = -s, ny = -c; // outward normal (screen)
    const cxB = bx + nx * 32, cyB = by + ny * 32;
    g += `<g transform="translate(${f(cxB)} ${f(cyB)}) rotate(${-th})"><rect x="-46" y="-32" width="92" height="64" rx="4" fill="${AM}" fill-opacity=".6" stroke="currentColor" stroke-width="1.6"/></g>`;
    const sc = 2.4; // px per N
    g += arrow(cxB, cyB, cxB, cyB + mg * sc, RD, 4) + T(cxB - 10, cyB + mg * sc + 16, `mg = ${mg.toFixed(1)} N`, { size: 13, w: 700, fill: RD, a: 'end' });
    g += arrow(cxB, cyB, cxB - c * Fs * sc, cyB + s * Fs * sc, BL, 3, 11) + T(cxB - c * Fs * sc - 8, cyB + s * Fs * sc + 16, `mg sin θ = ${Fs.toFixed(1)} N`, { size: 12, w: 700, fill: BL, a: 'end' });
    g += arrow(cxB, cyB, cxB - nx * Fn * sc, cyB - ny * Fn * sc, BL, 3, 11) + T(cxB - nx * Fn * sc + 10, cyB - ny * Fn * sc + 4, `mg cos θ = ${Fn.toFixed(1)} N`, { size: 12, w: 700, fill: BL, a: 'start' });
    g += ln(cxB - c * Fs * sc, cyB + s * Fs * sc, cxB, cyB + mg * sc, BL, 1.3, dsh) + ln(cxB - nx * Fn * sc, cyB - ny * Fn * sc, cxB, cyB + mg * sc, BL, 1.3, dsh);
    g += arrow(cxB, cyB, cxB + nx * Fn * sc, cyB + ny * Fn * sc, GN, 4) + T(cxB + nx * Fn * sc - 8, cyB + ny * Fn * sc - 6, `R = ${Fn.toFixed(1)} N`, { size: 13, w: 700, fill: GN, a: 'end' });
    const fx = bx + c * 50, fy = by - s * 50;
    g += arrow(fx, fy - 4, fx + c * fr * sc * 2.4, fy - s * fr * sc * 2.4 - 4, PU, 3.5) + T(fx + c * fr * sc * 2.4 + 6, fy - s * fr * sc * 2.4 - 10, 'friction 10 N', { size: 13, w: 700, fill: PU, a: 'start' });
    g += note(640, 100, ['Resolve the weight along', 'and perpendicular to the slope:', `along: mg sin θ = ${Fs.toFixed(1)} N`, `into: mg cos θ = ${Fn.toFixed(1)} N`, '', 'No motion into the slope:', `R = mg cos θ = ${Fn.toFixed(1)} N`, '', 'Along the slope, F = ma:', `${Fs.toFixed(1)} − 10 = 5.0a`, `a = ${a.toFixed(1)} m s⁻²`], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'A block on a 30 degree slope with its weight resolved into components along and into the slope, the normal contact force and friction', '', g);
  };

  /* ---------- f8 couple and torque ---------- */
  add.couple = (o = {}) => {
    const W = 920, H = 400, F = 12, dd = 0.06, tq = F * dd;
    let g = title(230, 30, 'Tap handle turned by a couple');
    const cx = 230, cy = 200, hw = 150;
    g += `<rect x="${cx - hw}" y="${cy - 12}" width="${hw * 2}" height="24" rx="12" fill="${GR}" stroke="currentColor" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="22" fill="${AM}" stroke="currentColor" stroke-width="1.6"/>` + dot(cx, cy, 4, 'currentColor');
    g += arrow(cx + hw - 8, cy + 10, cx + hw - 8, cy + 110, RD, 4) + T(cx + hw + 2, cy + 100, '12 N', { size: 14, w: 700, fill: RD, a: 'start' });
    g += arrow(cx - hw + 8, cy - 10, cx - hw + 8, cy - 110, RD, 4) + T(cx - hw - 2, cy - 100, '12 N', { size: 14, w: 700, fill: RD, a: 'end' });
    g += dbl(cx - hw + 8, cy + 54, cx + hw - 8, cy + 54, 'currentColor', 1.6) + T(cx, cy + 74, 'd = 6.0 cm (perpendicular separation)', { size: 12 });
    g += `<path d="M${cx + 40} ${cy - 58}A70 70 0 0 1 ${cx + 66} ${cy - 18}" fill="none" stroke="${GN}" stroke-width="3"/>` + arrow(cx + 62, cy - 30, cx + 67, cy - 14, GN, 3, 10) + T(cx + 76, cy - 52, 'turns', { size: 12, a: 'start', fill: GN });
    g += note(40, 330, [`torque = F × d = 12 × 0.060 = ${tq.toFixed(2)} N m`, 'resultant force = 0, so the handle turns without moving across'], { size: 13 });
    // forces not perpendicular: perpendicular separation between lines of action
    const ox = 680, oy = 200, a = 55 * deg, hl = 120, ux = Math.cos(a), uy = Math.sin(a), Fl = 90;
    g += title(680, 30, 'Forces at an angle to the bar');
    g += ln(ox - hl, oy, ox + hl, oy, GR, 14) + dot(ox, oy, 4, 'currentColor');
    const P = [ox + hl, oy], Q = [ox - hl, oy];
    g += arrow(P[0], P[1], P[0] - ux * Fl * .3 + ux * 0, P[1] + uy * Fl, RD, 3.5);
    g += arrow(Q[0], Q[1], Q[0] + ux * Fl * .3, Q[1] - uy * Fl, RD, 3.5) + T(Q[0] + ux * Fl * .3 + 10, Q[1] - uy * Fl + 6, 'F', { size: 14, w: 700, fill: RD, a: 'start' }) + T(P[0] - ux * Fl * .3 - 10, P[1] + uy * Fl, 'F', { size: 14, w: 700, fill: RD, a: 'end' });
    // lines of action through P and Q with direction (−0.3ux, uy) normalised
    const dx = -0.3 * ux, dy = uy, n = Math.hypot(dx, dy), ex = dx / n, ey = dy / n;
    g += ln(P[0] - ex * 110, P[1] - ey * 110, P[0] + ex * 130, P[1] + ey * 130, RD, 1.2, dsh + ' opacity=".6"') + ln(Q[0] - ex * 130, Q[1] - ey * 130, Q[0] + ex * 110, Q[1] + ey * 110, RD, 1.2, dsh + ' opacity=".6"');
    // foot of perpendicular from Q to line through P
    const t = (Q[0] - P[0]) * ex + (Q[1] - P[1]) * ey, Fx = P[0] + ex * t, Fy = P[1] + ey * t;
    g += ln(Q[0], Q[1], Fx, Fy, GN, 2.5) + T((Q[0] + Fx) / 2 - 6, (Q[1] + Fy) / 2 + 22, 'd', { size: 14, w: 700, fill: GN });
    g += note(560, 330, ['use the perpendicular distance between', 'the two lines of action, not the bar length'], { size: 13 });
    return wrap(W, H, o.aria || 'Two equal and opposite forces on a tap handle forming a couple with perpendicular separation 6 centimetres, and the perpendicular distance between lines of action for forces at an angle', '', g);
  };

  /* ---------- cg7 Kepler's laws ---------- */
  add.keplerLaws = (o = {}) => {
    const W = 940, H = 420, e = 0.6, a = 190, b = a * Math.sqrt(1 - e * e), cx = 260, cy = 215, fx = cx + a * e;
    const pos = M => { let E = M; for (let i = 0; i < 30; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); return [cx + a * Math.cos(E), cy - b * Math.sin(E)]; };
    let g = title(260, 28, 'Equal areas in equal times');
    g += `<ellipse cx="${cx}" cy="${cy}" rx="${a}" ry="${f(b)}" fill="none" stroke="currentColor" stroke-width="2"/>`;
    [[-0.28, 0.28, RD], [Math.PI - 0.28, Math.PI + 0.28, BL], [1.75, 2.31, GN]].forEach(([m1, m2, c]) => { const p = []; for (let i = 0; i <= 30; i++) p.push(pos(m1 + (m2 - m1) * i / 30)); g += `<path d="M${f(fx)} ${cy}L${p.map(q => f(q[0]) + ' ' + f(q[1])).join('L')}Z" fill="${c}" fill-opacity=".3" stroke="${c}" stroke-width="1.5"/>`; });
    g += `<circle cx="${f(fx)}" cy="${cy}" r="13" fill="${AM}"/>` + T(fx - 16, cy + 48, 'Sun at a focus', { size: 12, a: 'end' });
    const pp = pos(0), pa = pos(Math.PI);
    g += T(pp[0], cy + 152, 'fast near the Sun', { size: 12, a: 'end', fill: RD }) + T(pa[0] - 10, pa[1] + 4, 'slow', { size: 12, a: 'end', fill: BL });
    g += T(260, 400, 'Each shaded sector is swept in the same time (computed for e = 0.6).', { size: 12 });
    const pl6 = [['Mercury', .387, .241], ['Venus', .723, .615], ['Earth', 1, 1], ['Mars', 1.524, 1.881]];
    const G = graph({ x0: 590, y0: 330, w: 300, h: 240, xr: [0, 4], yr: [0, 4], xt: [1, 2, 3, 4], yt: [1, 2, 3, 4], xl: 'r³ / AU³', yl: 'T² / years²', ylo: 36 });
    g += G.g + title(740, 28, 'Kepler’s third law: T² ∝ r³') + pl([[G.X(0), G.Y(0)], [G.X(4), G.Y(4)]], BL, 2.5);
    pl6.forEach(([nm, r, T_], i) => { const X = r ** 3, Yv = T_ * T_; g += dot(G.X(X), G.Y(Yv), 5, RD) + (i === 0 ? T(G.X(0) + 2, G.Y(0) + 19, nm, { size: 12, a: 'start' }) : i === 1 ? T(G.X(X) + 10, G.Y(Yv) + 16, nm, { size: 12, a: 'start' }) : T(G.X(X) - 8, G.Y(Yv) - 8, nm, { size: 12, a: 'end' })); });
    g += T(740, 390, 'Jupiter (141, 141) and Saturn (867, 868) lie on the same line.', { size: 12 }) + T(740, 408, 'gradient 1 year² AU⁻³ = 4π² ÷ GM (Sun)', { size: 12 });
    return wrap(W, H, o.aria || 'An elliptical orbit with three equal-area sectors swept in equal times, and a graph of T squared against r cubed for the inner planets on a straight line', '', g);
  };

  /* ---------- m7 choosing a suvat equation ---------- */
  add.suvatChooser = (o = {}) => {
    const W = 920, H = 400, vars = ['s', 'u', 'v', 'a', 't'];
    const rows = [['v = u + at', 's'], ['s = ½(u + v)t', 'a'], ['s = ut + ½at²', 'v'], ['s = vt − ½at²', 'u'], ['v² = u² + 2as', 't']];
    let g = title(460, 30, 'Each suvat equation leaves out one of the five quantities');
    const x0 = 250, cw = 74, y0 = 70, rh = 46;
    vars.forEach((v, j) => { g += T(x0 + j * cw + cw / 2, y0 + 20, v, { size: 18, w: 700 }); });
    g += T(x0 + 5 * cw + 40, y0 + 20, 'leaves out', { size: 13, w: 700, a: 'start' });
    rows.forEach(([eq, miss], i) => {
      const y = y0 + 36 + i * rh;
      g += box(40, y, 190, rh - 8, BL, .1, 6) + T(135, y + rh / 2 + 1, eq, { size: 15, w: 700 });
      vars.forEach((v, j) => { const has = v !== miss, cx = x0 + j * cw + cw / 2; g += has ? `<circle cx="${cx}" cy="${y + rh / 2 - 4}" r="13" fill="${GN}" fill-opacity=".85"/>` + T(cx, y + rh / 2 + 1, '✓', { size: 14, w: 700, fill: '#fff' }) : `<circle cx="${cx}" cy="${y + rh / 2 - 4}" r="13" fill="none" stroke="${RD}" stroke-width="2.2" stroke-dasharray="4 3"/>` + T(cx, y + rh / 2 + 1, '–', { size: 15, w: 700, fill: RD }); });
      g += T(x0 + 5 * cw + 40, y + rh / 2 + 1, miss, { size: 16, w: 700, a: 'start', fill: RD });
    });
    g += note(730, 120, ['Method', '1  List s, u, v, a, t.', '2  Fill in the three you know', '    and the one you want.', '3  The fifth is not needed:', '    use the equation that', '    leaves it out.', '', 'Uniform acceleration only.', 'Choose a positive direction.'], { size: 13, lh: 20, w: 1 });
    return wrap(W, H, o.aria || 'Table showing which of s, u, v, a and t each of the five suvat equations contains and the one it leaves out', '', g);
  };

  /* ---------- m8 free fall: stone thrown up from a cliff ---------- */
  add.freeFallGraphs = (o = {}) => {
    const W = 940, H = 410, u = 12, gg = 9.81, h0 = 20, tTop = u / gg, hMax = h0 + u * u / (2 * gg), tEnd = (u + Math.sqrt(u * u + 2 * gg * h0)) / gg, vEnd = u - gg * tEnd;
    let g = title(470, 26, 'Stone thrown up at 12 m s⁻¹ from a 20 m cliff (up positive, g = 9.81 m s⁻²)', 14);
    const A = graph({ x0: 80, y0: 340, w: 340, h: 260, xr: [0, 4], yr: [0, 30], xt: [1, 2, 3, 4], yt: [5, 10, 15, 20, 25, 30], xl: 'Time t / s', yl: 'Height above sea / m', ylo: 44 });
    g += A.g + pl(fnPts(t => h0 + u * t - 0.5 * gg * t * t, 0, tEnd, A.X, A.Y), BL, 3.5);
    g += dot(A.X(tTop), A.Y(hMax), 5, AM) + T(A.X(tTop) + 8, A.Y(hMax) - 16, `top: ${hMax.toFixed(1)} m at ${tTop.toFixed(2)} s`, { size: 12, a: 'start', fill: AM });
    g += dot(A.X(tEnd), A.Y(0), 5, RD) + T(A.X(tEnd) + 8, A.Y(3), `sea: ${tEnd.toFixed(2)} s`, { size: 12, a: 'start', fill: RD }) + dot(A.X(0), A.Y(h0), 5, BL) + T(A.X(0) + 10, A.Y(h0) + 18, 'start: 20 m', { size: 12, a: 'start' });
    const B = graph({ x0: 560, y0: 380, w: 340, h: 310, xr: [0, 4], yr: [-25, 15], xAt: 0, xt: [1, 2, 3, 4], yt: [-25, -20, -15, -10, -5, 5, 10, 15], xl: '', yl: 'Velocity v / m s⁻¹', ylo: 44 });
    g += B.g + T(B.X(4), B.Y(0) - 10, 't / s', { size: 13, a: 'end' }) + pl([[B.X(0), B.Y(u)], [B.X(tEnd), B.Y(vEnd)]], RD, 3.5);
    g += dot(B.X(tTop), B.Y(0), 5, AM) + T(B.X(tTop) + 8, B.Y(0) - 12, 'v = 0 at the top', { size: 12, a: 'start', fill: AM });
    g += dot(B.X(tEnd), B.Y(vEnd), 5, RD) + T(B.X(tEnd) - 8, B.Y(vEnd) + 4, `${fmt(+vEnd.toFixed(1))} m s⁻¹`, { size: 12, a: 'end', fill: RD });
    g += T(B.X(2.4), B.Y(9), 'gradient = −9.81 m s⁻²', { size: 13, w: 700, fill: RD }) + T(B.X(2.4), B.Y(9) + 18, 'the same all the way, even at the top', { size: 12 });
    return wrap(W, H, o.aria || 'Computed height-time and velocity-time graphs for a stone thrown upwards from a cliff, with the top of the flight and the impact marked', '', g);
  };

  /* ---------- ep3 Sankey diagram for a car engine ---------- */
  add.sankeyCar = (o = {}) => {
    const W = 920, H = 400, Pin = 50, Pu = 15, Pw = Pin - Pu, s = 3.2; // px per kW: band widths to scale
    const x0 = 60, y0 = 80, xs = 380, top = y0 + Pu * s, bot = y0 + Pin * s, ri = 30, ro = ri + Pw * s, cyB = top + ro, yEnd = cyB + 26;
    let g = title(460, 30, 'Car at 25 m s⁻¹: engine 30 % efficient');
    g += `<path d="M${x0} ${y0}H760l34 ${f(Pu * s / 2)}l-34 ${f(Pu * s / 2)}H${x0}Z" fill="${GN}" fill-opacity=".8"/>`;
    g += `<path d="M${x0} ${f(top)}H${xs}A${f(ro)} ${f(ro)} 0 0 1 ${f(xs + ro)} ${f(cyB)}V${f(yEnd)}L${f(xs + (ri + ro) / 2)} ${f(yEnd + 22)}L${f(xs + ri)} ${f(yEnd)}V${f(cyB)}A${ri} ${ri} 0 0 0 ${xs} ${f(bot)}H${x0}Z" fill="${RD}" fill-opacity=".75"/>`;
    g += T(x0 + 12, (y0 + bot) / 2 + 5, 'fuel: 50 kW in', { size: 15, w: 700, a: 'start', fill: '#fff' });
    g += T(806, y0 + Pu * s / 2 - 2, 'useful: 15 kW', { size: 14, w: 700, a: 'start', fill: GN }) + T(806, y0 + Pu * s / 2 + 16, 'P = Fv = 600 × 25', { size: 12, a: 'start' });
    g += T(xs + (ri + ro) / 2, yEnd + 44, 'wasted: 35 kW', { size: 14, w: 700, fill: RD }) + T(xs + (ri + ro) / 2, yEnd + 62, 'heating the engine, exhaust and air', { size: 12 });
    g += note(580, 190, ['efficiency = useful ÷ total input', '= 15 ÷ 50 = 0.30 = 30 %', '', 'input power = 15 kW ÷ 0.30 = 50 kW', 'band widths drawn to scale'], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'Sankey diagram with 50 kilowatts of fuel power in, 15 kilowatts useful and 35 kilowatts wasted, drawn to scale', '', g);
  };

  /* ---------- e1 charge carriers and conventional current ---------- */
  add.chargeCarriers = (o = {}) => {
    const W = 920, H = 400;
    let g = title(460, 28, 'Charge carriers: electrons in a metal, ions in an electrolyte');
    const y = 110;
    g += `<rect x="100" y="${y - 40}" width="620" height="80" rx="40" fill="${AM}" fill-opacity=".22" stroke="${AM}" stroke-width="2"/>`;
    for (let i = 0; i < 9; i++) for (let j = 0; j < 2; j++) { const x = 150 + i * 66, yy = y - 18 + j * 36; g += `<circle cx="${x}" cy="${yy}" r="11" fill="${GR}"/>` + T(x, yy + 5, '+', { size: 13, w: 700, fill: '#fff' }); }
    [[180, 104], [260, 92], [330, 124], [420, 100], [500, 118], [580, 96], [650, 112], [220, 128], [460, 88]].forEach(([x, yy]) => { g += `<circle cx="${x}" cy="${yy}" r="6" fill="${BL}"/>` + arrow(x - 8, yy, x - 30, yy, BL, 2, 7); });
    g += T(110, y + 64, 'metal wire: free electrons drift from − to +', { size: 13, a: 'start', fill: BL, w: 700 }) + T(110, y + 82, 'the positive ions stay fixed in the lattice', { size: 12, a: 'start' });
    g += arrow(300, y - 58, 520, y - 58, RD, 3.5) + T(530, y - 54, 'conventional current: + to −', { size: 13, a: 'start', fill: RD, w: 700 });
    g += T(84, y + 5, '+', { size: 22, w: 700, a: 'end', fill: RD }) + T(736, y + 5, '−', { size: 22, w: 700, a: 'start', fill: BL });
    const y2 = 270;
    g += `<rect x="100" y="${y2 - 46}" width="620" height="92" rx="8" fill="${BL}" fill-opacity=".1" stroke="currentColor" stroke-width="1.5"/><rect x="100" y="${y2 - 46}" width="18" height="92" fill="${RD}" fill-opacity=".7"/><rect x="702" y="${y2 - 46}" width="18" height="92" fill="${BL}" fill-opacity=".7"/>`;
    [[220, -18], [360, 14], [500, -10], [600, 20], [280, 22], [440, -24]].forEach(([x, dy], i) => { const pos = i % 2 === 0; g += `<circle cx="${x}" cy="${y2 + dy}" r="10" fill="${pos ? RD : PU}"/>` + T(x, y2 + dy + 5, pos ? '+' : '−', { size: 13, w: 700, fill: '#fff' }) + arrow(pos ? x + 13 : x - 13, y2 + dy, pos ? x + 40 : x - 40, y2 + dy, pos ? RD : PU, 2, 7); });
    g += T(110, y2 + 70, 'electrolyte: positive ions move one way, negative ions the other', { size: 13, a: 'start', w: 700 });
    g += note(740, 220, ['I = ΔQ ÷ Δt', '1 A = 1 C s⁻¹', 'e = 1.60 × 10⁻¹⁹ C', 'Q = ±ne'], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'Electrons drifting through a metal lattice from negative to positive against the conventional current, and positive and negative ions moving opposite ways in an electrolyte', '', g);
  };

  /* ---------- e7 power equations ---------- */
  add.powerEquations = (o = {}) => {
    const W = 920, H = 380, P = 2800, V = 230, I = P / V, R = V * V / P;
    let g = title(460, 28, 'Three forms of the power equation');
    g += `<circle cx="300" cy="190" r="46" fill="${AM}" fill-opacity=".9"/>` + T(300, 202, 'P', { size: 34, w: 700, fill: '#fff' });
    const forms = [[300, 96, 'P = VI', 'definition: energy per coulomb × coulombs per second', -34], [120, 300, 'P = I²R', 'put V = IR: use when you know I', 40], [480, 300, 'P = V² ÷ R', 'put I = V ÷ R: use when you know V', 40]];
    forms.forEach(([x, y, eq, s, dy]) => { const a = Math.atan2(y - 190, x - 300), ey = y > 190 ? y - 24 : y + 20, ex = 300 + (ey - 190) / Math.tan(a); g += ln(300 + 46 * Math.cos(a), 190 + 46 * Math.sin(a), Math.abs(Math.cos(a)) < 1e-6 ? 300 : ex, ey, 'currentColor', 2, ' opacity=".5"') + box(x - 80, y - 24, 160, 44, BL, .14) + T(x, y + 5, eq, { size: 18, w: 700 }) + T(x, y + dy, s, { size: 11 }); });
    g += `<circle cx="300" cy="190" r="46" fill="${AM}"/>` + T(300, 202, 'P', { size: 34, w: 700, fill: '#fff' });
    g += box(620, 70, 270, 250, GN, .08) + note(636, 96, ['Kettle: 2.8 kW on 230 V mains', `I = P ÷ V = ${I.toFixed(1)} A`, `R = V² ÷ P = ${R.toFixed(1)} Ω`, `check: I²R = ${(I * I * R).toFixed(0)} W`, '', '3.0 minutes:', `W = Pt = 2800 × 180 = ${(P * 180 / 1e5).toFixed(2)} × 10⁵ J`, `= 2.8 kW × 0.050 h = 0.14 kWh`, 'cost at 25p per kWh = 3.5p'], { size: 13, lh: 22, w: 1 });
    return wrap(W, H, o.aria || 'The power equations P equals VI, I squared R and V squared over R linked through V equals IR, with a kettle example', '', g);
  };

  /* ---------- a7 stellar parallax and the parsec ---------- */
  add.parallax = (o = {}) => {
    const W = 940, H = 430, p = 0.768, dpc = 1 / p;
    let g = title(300, 24, 'Parallax: observe 6 months apart');
    const sx = 300, sy = 330, R = 120, st = [300, 80];
    g += `<ellipse cx="${sx}" cy="${sy}" rx="${R}" ry="34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 5" opacity=".7"/>` + `<circle cx="${sx}" cy="${sy}" r="14" fill="${AM}"/>` + T(sx, sy + 32, 'Sun', { size: 12 });
    g += `<circle cx="${sx - R}" cy="${sy}" r="8" fill="${BL}"/><circle cx="${sx + R}" cy="${sy}" r="8" fill="${BL}"/>` + T(sx - R - 12, sy + 4, 'Earth in January', { size: 12, a: 'end' }) + T(sx + R + 12, sy + 4, 'Earth in July', { size: 12, a: 'start' });
    g += ln(sx - R, sy, st[0], st[1], BL, 1.8) + ln(sx + R, sy, st[0], st[1], BL, 1.8) + ln(sx, sy, st[0], st[1], 'currentColor', 1.5, dsh);
    g += `<path d="M${st[0]} ${st[1] + 50}A50 50 0 0 0 ${f(st[0] + 50 * Math.sin(Math.atan(R / (sy - st[1]))))} ${f(st[1] + 50 * Math.cos(Math.atan(R / (sy - st[1]))))}" fill="none" stroke="${RD}" stroke-width="2.5"/>` + T(st[0] + 16, st[1] + 64, 'p', { size: 15, w: 700, fill: RD, a: 'start' });
    g += `<circle cx="${st[0]}" cy="${st[1]}" r="7" fill="${RD}"/>` + T(st[0] + 12, st[1] - 6, 'nearby star', { size: 12, a: 'start', fill: RD });
    g += dbl(sx, sy + 44, sx + R, sy + 44, 'currentColor', 1.5) + T(sx + R / 2, sy + 62, '1 AU', { size: 12 }) + T(sx - 20, (sy + st[1]) / 2, 'd', { size: 15, w: 700, a: 'end' });
    [[90, 60], [150, 46], [450, 52], [520, 70], [60, 120], [540, 120]].forEach(([x, y]) => { g += `<circle cx="${x}" cy="${y}" r="2.5" fill="currentColor" opacity=".7"/>`; });
    g += T(300, 420, 'distant stars form a fixed background; the nearby star appears to shift against them (angles exaggerated)', { size: 11 });
    g += box(600, 80, 310, 250, BL, .08) + note(616, 108, ['tan p ≈ p = 1 AU ÷ d  (p in radians)', '', 'The parsec: the distance at which', '1 AU subtends 1 arcsecond.', '1 pc = 3.09 × 10¹⁶ m ≈ 3.26 ly', 'd (pc) = 1 ÷ p (arcseconds)', '', `Proxima Centauri: p = ${p}″`, `d = 1 ÷ ${p} = ${dpc.toFixed(2)} pc ≈ ${(dpc * 3.26).toFixed(1)} ly`, 'p is half the total angular shift'], { size: 13, lh: 21, w: 1 });
    return wrap(W, H, o.aria || 'Stellar parallax: the Earth on opposite sides of its orbit sees a nearby star at angle p, defining the parsec', '', g);
  };

  /* ---------- a10 timeline of the universe and its make-up ---------- */
  add.universeTimeline = (o = {}) => {
    const W = 940, H = 410;
    let g = title(330, 28, 'History of the universe (schematic; times not to scale)');
    const ev = [['Big Bang', 't = 0', ''], ['Inflation', '~10⁻³⁶ s', 'rapid expansion'], ['Quarks → nucleons', '~10⁻⁶ s', ''], ['Nucleosynthesis', '~3 minutes', 'H and He nuclei form'], ['CMB released', '~380 000 years', 'atoms form; light travels freely'], ['First stars and galaxies', '~200 million years', ''], ['Expansion accelerates', '~9 billion years', 'dark energy dominates'], ['Today', '13.8 billion years', '']];
    const x0 = 40, x1 = 620, y = 210;
    g += `<path d="M${x0} ${y}H${x1}" stroke="currentColor" stroke-width="3"/>` + arrow(x1 - 10, y, x1 + 10, y, 'currentColor', 3, 12);
    ev.forEach(([nm, t, s], i) => { const x = x0 + i * (x1 - x0) / (ev.length - 1), up = i % 2 === 0, c = [AM, PU, PU, BL, RD, GN, GN, AM][i]; g += `<circle cx="${f(x)}" cy="${y}" r="7" fill="${c}"/>` + ln(x, y + (up ? -8 : 8), x, y + (up ? -40 : 40), c, 1.6); const ty = up ? y - 92 : y + 60; g += T(x, ty, nm, { size: 12, w: 700, fill: c }) + T(x, ty + 16, t, { size: 12 }) + (s ? T(x, ty + 32, s, { size: 11 }) : ''); });
    const cx = 790, cy = 210, r = 100, parts = [['dark energy', 68, PU], ['dark matter', 27, GR], ['ordinary matter', 5, AM]];
    g += title(790, 70, 'Make-up of the universe today', 14);
    let a0 = -Math.PI / 2;
    parts.forEach(([nm, pc, c]) => { const a1 = a0 + pc / 100 * 2 * Math.PI, big = pc > 50 ? 1 : 0; g += `<path d="M${cx} ${cy}L${f(cx + r * Math.cos(a0))} ${f(cy + r * Math.sin(a0))}A${r} ${r} 0 ${big} 1 ${f(cx + r * Math.cos(a1))} ${f(cy + r * Math.sin(a1))}Z" fill="${c}" stroke="var(--panel,#fff)" stroke-width="2"/>`; const am = (a0 + a1) / 2, lr = pc > 20 ? r * .55 : r + 26; g += T(cx + lr * Math.cos(am), cy + lr * Math.sin(am) + 4, `${pc} %`, { size: 13, w: 700, fill: pc > 20 ? '#fff' : c }); a0 = a1; });
    parts.forEach(([nm, pc, c], i) => { g += `<rect x="700" y="${336 + i * 20}" width="12" height="12" fill="${c}"/>` + T(720, 347 + i * 20, `${nm} ${pc} %`, { size: 12, a: 'start' }); });
    g += T(790, 404, 'dark matter: from galaxy rotation curves', { size: 11 });
    return wrap(W, H, o.aria || 'Schematic timeline from the Big Bang through inflation, nucleosynthesis, the CMB, the first galaxies and accelerating expansion to today, and a pie chart of dark energy, dark matter and ordinary matter', '', g);
  };

  /* ---------- mu1 prefixes on a powers-of-ten scale ---------- */
  add.prefixScale = (o = {}) => {
    const W = 940, H = 360, P = [[-12, 'p', 'pico'], [-9, 'n', 'nano'], [-6, 'μ', 'micro'], [-3, 'm', 'milli'], [-2, 'c', 'centi'], [0, '', 'base unit'], [3, 'k', 'kilo'], [6, 'M', 'mega'], [9, 'G', 'giga'], [12, 'T', 'tera']];
    const X = e => 60 + (e + 12) / 24 * 820, y = 150;
    let g = title(470, 30, 'SI prefixes: each step on the scale is a power of ten');
    g += `<path d="M50 ${y}H890" stroke="currentColor" stroke-width="2.5"/>`;
    for (let e = -12; e <= 12; e++) g += ln(X(e), y - 5, X(e), y + 5, 'currentColor', 1.2, ' opacity=".6"');
    P.forEach(([e, s, nm], i) => { const c = e < 0 ? BL : e > 0 ? RD : GN, up = i % 2 === 0; g += `<circle cx="${f(X(e))}" cy="${y}" r="7" fill="${c}"/>` + T(X(e), y + (up ? -40 : 34), s ? `${s}  (${nm})` : nm, { size: 13, w: 700, fill: c }) + T(X(e), y + (up ? -22 : 52), `10${e === 0 ? '⁰' : (e < 0 ? '⁻' : '') + String(Math.abs(e)).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('')}`, { size: 12 }); });
    const ex = [['visible light', '500 nm', -6.7], ['wire diameter', '0.27 mm', -3.6], ['mains power line', '400 kV', 5.6], ['power station', '2 GW', 9.3]];
    ex.forEach(([a, b, e], i) => { const yy = 250 + (i % 2) * 34; g += `<path d="M${f(X(e))} ${y + 9}l-5 9h10z" fill="${GR}"/>` + ln(X(e), y + 64, X(e), yy - 14, GR, 1, dsh) + T(X(e), yy, `${a}: ${b}`, { size: 12 }); });
    g += box(60, 310, 820, 40, AM, .1) + T(470, 336, 'Areas and volumes: square or cube the prefix too.  1 mm² = (10⁻³ m)² = 10⁻⁶ m²   ·   1 cm³ = (10⁻² m)³ = 10⁻⁶ m³', { size: 13, w: 700 });
    return wrap(W, H, o.aria || 'A powers-of-ten scale from pico to tera with each SI prefix and examples, and how to convert areas and volumes', '', g);
  };

  /* ---------- mu2 accuracy, precision, random and systematic error ---------- */
  add.errorTypes = (o = {}) => {
    const W = 940, H = 400, tv = 9.81, sets = [
      ['accurate and precise', [-0.02, 0.01, 0.03, -0.01, 0.0, 0.02], 0, GN],
      ['precise, not accurate', [-0.02, 0.01, 0.03, -0.01, 0.0, 0.02], 0.35, AM],
      ['accurate, not precise', [-0.3, 0.22, 0.05, -0.12, 0.33, -0.18], 0, BL],
      ['neither', [-0.3, 0.22, 0.05, -0.12, 0.33, -0.18], 0.4, RD]];
    const X = v => 330 + (v - 9.0) / 1.6 * 560;
    let g = title(470, 28, 'Six repeat readings of g compared with the true value 9.81 m s⁻²');
    sets.forEach(([nm, d, off, c], i) => {
      const y = 80 + i * 66, vals = d.map(v => tv + off + v), mean = vals.reduce((a, b) => a + b) / vals.length;
      g += T(40, y + 5, nm, { size: 14, w: 700, a: 'start', fill: c }) + `<path d="M${X(9.2)} ${y}H${X(10.6)}" stroke="currentColor" stroke-width="1.5" opacity=".5"/>`;
      vals.forEach(v => { g += dot(X(v), y, 6, c); });
      g += ln(X(mean), y - 16, X(mean), y + 16, c, 2.5) + HT(X(mean) + 8, y + 30, `mean ${mean.toFixed(2)}`, c, 11, 'start');
    });
    g += ln(X(tv), 58, X(tv), 330, 'currentColor', 2, dsh) + T(X(tv), 50, 'true value', { size: 12, w: 700 });
    [9.4, 9.8, 10.2].forEach(v => { g += T(X(v), 352, v.toFixed(1), { size: 12 }) + ln(X(v), 334, X(v), 340, 'currentColor', 1.5); });
    g += T(X(9.8), 372, 'g / m s⁻²', { size: 13 });
    g += note(40, 352, ['random error → spread (poor precision)', 'systematic error → shift (poor accuracy)'], { size: 12, lh: 18 });
    return wrap(W, H, o.aria || 'Four sets of repeat readings of g showing accurate and precise, precise but not accurate from a systematic error, accurate but not precise from random error, and neither', '', g);
  };

  /* ---------- mu3 combining percentage uncertainties ---------- */
  add.uncertaintyCombine = (o = {}) => {
    const W = 940, H = 380, h = 0.800, dh = 0.002, t = 0.404, dt = 0.005, ph = dh / h * 100, pt = dt / t * 100, pg = ph + 2 * pt, gv = 2 * h / t / t;
    let g = title(470, 28, 'g = 2h ÷ t²: add percentage uncertainties, doubling for the square');
    const x0 = 250, s = 120; // px per %
    const bar = (y, pc, c, lab, txt) => `<rect x="${x0}" y="${y}" width="${f(pc * s)}" height="30" rx="4" fill="${c}" fill-opacity=".85"/>` + T(x0 - 12, y + 20, lab, { size: 14, w: 700, a: 'end' }) + T(x0 + pc * s + 10, y + 20, txt, { size: 13, a: 'start' });
    g += bar(70, ph, BL, 'h', `${dh * 1000} mm ÷ ${h * 1000} mm = ${ph.toFixed(2)} %`);
    g += bar(120, pt, RD, 't', `${dt * 1000} ms ÷ ${t * 1000} ms = ${pt.toFixed(2)} %`);
    g += bar(170, pt, RD, 't again', 'squared: counts twice');
    g += `<rect x="${x0}" y="236" width="${f(ph * s)}" height="34" fill="${BL}" fill-opacity=".85"/><rect x="${f(x0 + ph * s)}" y="236" width="${f(pt * s)}" height="34" fill="${RD}" fill-opacity=".85"/><rect x="${f(x0 + (ph + pt) * s)}" y="236" width="${f(pt * s)}" height="34" fill="${RD}" fill-opacity=".6"/>`;
    g += T(x0 - 12, 258, 'g', { size: 15, w: 700, a: 'end' }) + T(x0 + pg * s + 10, 258, `${ph.toFixed(2)} + 2 × ${pt.toFixed(2)} = ${pg.toFixed(1)} %`, { size: 13, w: 700, a: 'start' });
    g += ln(x0, 222, x0 + pg * s, 222, 'currentColor', 1, ' opacity=".4"');
    g += note(60, 310, [`g = 2 × ${h.toFixed(3)} ÷ ${t}² = ${gv.toFixed(2)} m s⁻²   ±${pg.toFixed(1)} % = ±${(gv * pg / 100).toFixed(2)} m s⁻²   →   g = ${gv.toFixed(1)} ± ${(gv * pg / 100).toFixed(1)} m s⁻²`, 'Rules: add or subtract → add absolute uncertainties;  multiply or divide → add percentages;  power n → multiply the percentage by n.'], { size: 13, lh: 22 });
    return wrap(W, H, o.aria || 'Bars showing the percentage uncertainty in h and in t, with t counted twice because it is squared, adding to the percentage uncertainty in g', '', g);
  };

  /* ---------- mu4 log–log graph: gradient gives the power ---------- */
  add.logLogPower = (o = {}) => {
    const W = 920, H = 410, gg = 9.81, Ls = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.6], sc = [0.006, -0.008, 0.004, -0.003, 0.007, -0.005, 0.003];
    const lgT = L => Math.log10(2 * Math.PI * Math.sqrt(L / gg));
    const G = graph({ x0: 110, y0: 340, w: 450, h: 270, xr: [-0.8, 0.3], yr: [-0.1, 0.4], xAt: -0.1, xt: [-0.8, -0.6, -0.4, -0.2, 0, 0.2], yt: [-0.1, 0, 0.1, 0.2, 0.3, 0.4], xl: 'lg (L / m)', yl: 'lg (T / s)', ylo: 54 });
    let g = G.g + title(335, 30, 'Pendulum: if T = kLⁿ then lg T = n lg L + lg k');
    g += pl([[G.X(-0.8), G.Y(lgT(Math.pow(10, -0.8)))], [G.X(0.3), G.Y(lgT(Math.pow(10, 0.3)))]], BL, 3) + Ls.map((L, i) => dot(G.X(Math.log10(L)), G.Y(lgT(L) + sc[i]), 5, RD)).join('');
    const xa = -0.6, xb = 0.1;
    g += `<path d="M${G.X(xa)} ${G.Y(lgT(10 ** xa))}H${G.X(xb)}V${G.Y(lgT(10 ** xb))}" fill="none" stroke="${AM}" stroke-width="2"/>` + T((G.X(xa) + G.X(xb)) / 2, G.Y(lgT(10 ** xa)) + 18, `Δ lg L = ${(xb - xa).toFixed(2)}`, { size: 12, fill: AM }) + T(G.X(xb) + 8, (G.Y(lgT(10 ** xa)) + G.Y(lgT(10 ** xb))) / 2 + 4, `Δ lg T = ${(lgT(10 ** xb) - lgT(10 ** xa)).toFixed(2)}`, { size: 12, a: 'start', fill: AM });
    const k = 2 * Math.PI / Math.sqrt(gg);
    g += note(600, 100, ['gradient n = 0.35 ÷ 0.70 = 0.50', 'so T ∝ L⁰·⁵ (T ∝ √L)', '', 'intercept (at lg L = 0):', `lg k = ${Math.log10(k).toFixed(2)}, k = ${k.toFixed(2)} s m⁻⁰·⁵`, `k = 2π ÷ √g → g = ${(4 * Math.PI * Math.PI / k / k).toFixed(2)} m s⁻²`, '', 'A straight line on log–log axes', 'shows a power law;', 'its gradient is the power.'], { size: 13, lh: 20 });
    return wrap(W, H, o.aria || 'Log-log graph of pendulum period against length giving a straight line of gradient one half', '', g);
  };

  /* ---------- mu5 a well-laid-out results table ---------- */
  add.resultsTable = (o = {}) => {
    const W = 940, H = 400, rpm = 8.3, ls = [0.200, 0.400, 0.600, 0.800, 1.000], off = [[0.02, -0.03, 0.01], [-0.02, 0.03, 0.0], [0.04, -0.01, 0.43], [-0.03, 0.02, 0.01], [0.03, -0.02, 0.0]];
    let g = title(470, 26, 'Resistance of a wire against length: a results table');
    const cols = ['length l / m', 'R₁ / Ω', 'R₂ / Ω', 'R₃ / Ω', 'mean R / Ω', '± / Ω'], cw = [120, 80, 80, 80, 110, 70], x0 = 40, y0 = 60, rh = 32;
    let x = x0; cols.forEach((c, j) => { g += `<rect x="${x}" y="${y0}" width="${cw[j]}" height="${rh}" fill="${BL}" fill-opacity=".16" stroke="currentColor" stroke-width="1.2"/>` + T(x + cw[j] / 2, y0 + 21, c, { size: 13, w: 700 }); x += cw[j]; });
    ls.forEach((l, i) => {
      const R = off[i].map(d => +(rpm * l + d).toFixed(2)), good = R.filter((v, k) => !(i === 2 && k === 2)), mean = good.reduce((a, b) => a + b) / good.length, half = (Math.max(...good) - Math.min(...good)) / 2;
      const r2 = v => (Math.round(v * 100 + 1e-6) / 100).toFixed(2), cells = [l.toFixed(3), ...R.map(r2), r2(mean), r2(half)];
      let xx = x0; const y = y0 + rh * (i + 1);
      cells.forEach((c, j) => { g += `<rect x="${xx}" y="${y}" width="${cw[j]}" height="${rh}" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/>` + T(xx + cw[j] / 2, y + 21, c, { size: 13 }); if (i === 2 && j === 3) g += `<ellipse cx="${xx + cw[j] / 2}" cy="${y + 16}" rx="34" ry="13" fill="none" stroke="${RD}" stroke-width="2.2"/>`; xx += cw[j]; });
    });
    const xe = x0 + cw.reduce((a, b) => a + b);
    const ann = [[y0 + 16, 'quantity / unit in each heading; no units in the cells'], [y0 + rh + 16, 'l: same decimal places as the ruler resolution (1 mm)'], [y0 + rh * 3 + 16, 'anomaly circled: repeat it, and leave it out of the mean', RD], [y0 + rh * 4 + 16, 'mean to the same decimal places as the readings'], [y0 + rh * 5 + 16, 'uncertainty = half the range of the repeats']];
    ann.forEach(([y, s, c]) => { g += ln(xe + 6, y, xe + 22, y, c || GR, 1.5) + T(xe + 28, y + 4, s, { size: 12, a: 'start', fill: c }); });
    g += note(40, 290, ['Plan: independent variable l in the first column; at least 5 values over a wide range; three repeats.', 'Then plot mean R against l: the gradient is ρ ÷ A, so ρ = gradient × A.', `Values computed for about ${rpm} Ω per metre (constantan, 0.27 mm diameter) with small reading scatter.`], { size: 13, lh: 22 });
    return wrap(W, H, o.aria || 'A results table for resistance against length with headings, repeats, an anomaly circled, means and uncertainties, with annotations explaining each convention', '', g);
  };

  /* ---------- fd1 capacitance: plate charges, series and parallel ---------- */
  add.capacitorCombine = (o = {}) => {
    const W = 940, H = 420, C1 = 2.0, C2 = 3.0, V = 10, Cs = 1 / (1 / C1 + 1 / C2), Qs = Cs * V, Cp = C1 + C2;
    const cap = (x, y, lab, vert = true) => (vert ? `<path d="M${x - 16} ${y - 5}H${x + 16}M${x - 16} ${y + 5}H${x + 16}" stroke="currentColor" stroke-width="3.5"/><rect x="${x - 18}" y="${y - 3}" width="36" height="6" fill="var(--panel,#fff)"/>` : `<path d="M${x - 5} ${y - 16}V${y + 16}M${x + 5} ${y - 16}V${y + 16}" stroke="currentColor" stroke-width="3.5"/>`) + (lab ? T(vert ? x + 24 : x, vert ? y + 5 : y - 24, lab, { size: 13, w: 700, a: vert ? 'start' : 'middle' }) : '');
    let g = title(190, 28, 'Equal and opposite charges');
    g += `<rect x="90" y="70" width="16" height="170" fill="${RD}" fill-opacity=".85"/><rect x="214" y="70" width="16" height="170" fill="${BL}" fill-opacity=".85"/><rect x="106" y="70" width="108" height="170" fill="currentColor" fill-opacity=".06"/>`;
    for (let i = 0; i < 6; i++) g += T(98, 92 + i * 27, '+', { size: 15, w: 700, fill: '#fff' }) + T(222, 92 + i * 27, '−', { size: 15, w: 700, fill: '#fff' });
    g += T(160, 160, 'insulator', { size: 12 }) + T(160, 176, '(dielectric)', { size: 12 }) + T(98, 262, '+Q', { size: 14, w: 700, fill: RD }) + T(222, 262, '−Q', { size: 14, w: 700, fill: BL });
    g += `<path d="M98 70V46H150M170 46H222V70" stroke="currentColor" stroke-width="2.2" fill="none"/>` + ln(152, 36, 152, 56, 'currentColor', 3) + ln(166, 40, 166, 52, 'currentColor', 5);
    g += arrow(60, 120, 60, 200, BL, 2.5, 9) + T(54, 166, 'e⁻', { size: 12, a: 'end', fill: BL }) + arrow(262, 200, 262, 120, BL, 2.5, 9) + T(268, 166, 'e⁻', { size: 12, a: 'start', fill: BL });
    g += note(40, 300, ['electrons leave one plate and flow onto', 'the other; no charge crosses the gap', 'C = Q ÷ V    1 F = 1 C V⁻¹'], { size: 13, lh: 20 });
    // series
    g += title(480, 28, 'Series: same Q, p.d.s add') + `<path d="M380 120H430M470 120H520M560 120H600V200H380V120" stroke="currentColor" stroke-width="2.2" fill="none"/>` + cap(450, 120, '', false) + cap(540, 120, '', false);
    g += T(450, 92, '2.0 μF', { size: 13, w: 700 }) + T(540, 92, '3.0 μF', { size: 13, w: 700 }) + `<rect x="476" y="190" width="10" height="20" fill="var(--panel,#fff)"/>` + ln(478, 186, 478, 214, 'currentColor', 3) + ln(486, 192, 486, 208, 'currentColor', 5) + T(482, 232, '10 V', { size: 13, w: 700 });
    g += T(450, 160, `${(Qs / C1).toFixed(1)} V`, { size: 13, fill: BL, w: 700 }) + T(540, 160, `${(Qs / C2).toFixed(1)} V`, { size: 13, fill: BL, w: 700 });
    g += note(370, 262, [`1/C = 1/2.0 + 1/3.0 → C = ${Cs.toFixed(1)} μF`, `Q = CV = ${Qs.toFixed(0)} μC on each`, `V₁ = 12 ÷ 2.0 = ${(Qs / C1).toFixed(1)} V, V₂ = 12 ÷ 3.0 = ${(Qs / C2).toFixed(1)} V`, 'C is less than the smallest'], { size: 12, lh: 19 });
    // parallel
    g += title(780, 28, 'Parallel: same V, charges add') + `<path d="M700 110V200H760M800 200H860V110" stroke="currentColor" stroke-width="2.2" fill="none"/>` + dot(700, 160, 4, 'currentColor') + dot(860, 160, 4, 'currentColor');
    g += `<path d="M700 110H760M800 110H860M700 160H760M800 160H860" stroke="currentColor" stroke-width="2.2" fill="none"/>` + cap(780, 110, '', false) + cap(780, 160, '', false);
    g += T(870, 115, '2.0 μF', { size: 12, w: 700, a: 'start' }) + T(870, 165, '3.0 μF', { size: 12, w: 700, a: 'start' });
    g += `<rect x="774" y="190" width="10" height="20" fill="var(--panel,#fff)"/>` + ln(776, 186, 776, 214, 'currentColor', 3) + ln(784, 192, 784, 208, 'currentColor', 5) + T(780, 232, '10 V', { size: 13, w: 700 });
    g += note(680, 262, [`C = 2.0 + 3.0 = ${Cp.toFixed(1)} μF`, `Q₁ = 2.0 × 10 = 20 μC`, `Q₂ = 3.0 × 10 = 30 μC`, `total Q = ${(Cp * V).toFixed(0)} μC`], { size: 12, lh: 19 });
    g += T(640, 400, 'The rules are the opposite way round to those for resistors.', { size: 12, w: 700 });
    return wrap(W, H, o.aria || 'Capacitor plates carrying equal and opposite charge, with 2 and 3 microfarad capacitors combined in series and in parallel across 10 volts', '', g);
  };

  for (const k of Object.keys(add)) S.register(k, add[k]);
  S._physicsFigures = Object.keys(add);
})(typeof window === 'undefined' ? globalThis : window);
