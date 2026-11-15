/* Export the hand-drawn diagrams on the A level Physics lesson pages (lesson figures, exam-question figures and
   circuit symbols) into the diagram library, as self-contained SVG plus 2x PNG on light and dark backgrounds.
   The realistic SciFig diagrams are exported by export.py; the animations by export-animations.cjs.

   Needs the site served over http (fonts, data files):  cd .. && python3 -m http.server 8800
   Usage (from the repo root):  node diagram-library/export-site-figures.cjs [http://127.0.0.1:8800/ALevelPhysics/index.html] */
'use strict';
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = __dirname + '/', URL = process.argv[2] || 'http://127.0.0.1:8800/ALevelPhysics/index.html';
const TOPIC = { mu: ['measurements', 'Practical skills'], m: ['motion', 'Motion and forces'], f: ['forces', 'Motion and forces'], ep: ['energy', 'Motion and forces'], e: ['electricity', 'Electricity'], wv: ['waves', 'Waves and quantum'], t: ['thermal', 'Thermal physics'], cg: ['gravity', 'Gravitation and astrophysics'], a: ['astro', 'Gravitation and astrophysics'], fd: ['fields', 'Electricity and fields'], n: ['nuclear', 'Nuclear and particle physics'], md: ['medical', 'Medical imaging'] };
const topicOf = f => /^papers/.test(f.group) ? ['exam-papers', 'Exam papers'] : /^(ocr|alevel)$/.test(f.group) ? ['practical', 'Practical skills'] : TOPIC[f.page.replace(/\d+$/, '')] || ['other', 'Other'];
const THEMES = [['light', '#ffffff'], ['dark', '#0f1620']];

// In the page: find the diagrams, and serialise one as a standalone SVG with its computed styles written in.
const collect = () => {
  const out = [], seen = new Set();
  const plain = e => { if (!e) return ''; const c = e.cloneNode(true); c.querySelectorAll('svg,figure,.xmarks,.mk').forEach(x => x.remove()); return c.textContent.replace(/\s+/g, ' ').trim(); };
  for (const sec of document.querySelectorAll('section.lab')) {
    const page = sec.id.slice(4), group = (LAB.list.find(p => p.id === page) || {}).group || '';
    for (const svg of sec.querySelectorAll('svg')) {
      if (svg.parentElement.closest('svg') || svg.closest('.lcard.sim,.bench,.lower,.sf-fig,.lesson-practicals,.kind,.btn,h3,h4,.u-ico')) continue;
      const vb = (svg.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
      if (vb.length !== 4 || vb[2] < 40 || vb[3] < 30 || !svg.querySelector('path,line,rect,circle,polyline,polygon,ellipse')) continue;
      const key = svg.outerHTML; if (seen.has(key)) continue; seen.add(key);
      let kind, desc, qid = '';
      const xq = svg.closest('.xq'), fig = svg.closest('figure');
      if (xq) { kind = 'exam'; const stem = xq.querySelector('.xstem'); desc = plain(stem).replace(/^\d+\s*/, ''); qid = (xq.querySelector('[id^="xm-"]') || xq).id || ''; }
      else if (vb[2] <= 100 && vb[3] <= 80) { kind = 'symbol'; desc = plain(svg.parentElement); }
      else { kind = 'figure'; desc = plain(fig && fig.querySelector('figcaption')) || svg.getAttribute('aria-label') || plain(svg.closest('.lcard') && svg.closest('.lcard').querySelector('h3')); }
      svg.dataset.libx = String(out.length);
      out.push({ page, group, kind, desc: desc.slice(0, 220), aria: svg.getAttribute('aria-label') || '', qid, w: vb[2], h: vb[3], lesson: plain(sec.querySelector('.lab-head h2')) });
    }
  }
  return out;
};
const serialise = ([i, bg]) => {
  const src = document.querySelector(`svg[data-libx="${i}"]`);
  const PROPS = ['fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin', 'opacity', 'font-family', 'font-size', 'font-weight', 'font-style', 'text-anchor', 'dominant-baseline', 'letter-spacing', 'marker-start', 'marker-mid', 'marker-end', 'visibility', 'display', 'stop-color', 'stop-opacity', 'paint-order'];
  const DEF = { 'fill-opacity': '1', 'fill-rule': 'nonzero', 'stroke-opacity': '1', 'stroke-dasharray': 'none', 'stroke-linecap': 'butt', 'stroke-linejoin': 'miter', opacity: '1', 'font-style': 'normal', 'letter-spacing': 'normal', 'marker-start': 'none', 'marker-mid': 'none', 'marker-end': 'none', visibility: 'visible', display: 'inline', 'stop-opacity': '1', 'paint-order': 'normal', 'dominant-baseline': 'auto', 'text-anchor': 'start' };
  const ink = getComputedStyle(src).color;
  const fix = v => v.replace(/currentcolor/gi, ink);
  const copy = (a, b) => {
    const cs = getComputedStyle(a); let st = '';
    for (const p of PROPS) { let v = cs.getPropertyValue(p); if (!v || DEF[p] === v) continue; if (p === 'font-family') v = v.replace(/"/g, "'") + ', Arial, sans-serif'; st += `${p}:${fix(v)};`; }
    b.removeAttribute('class'); if (st) b.setAttribute('style', st); else b.removeAttribute('style');
    for (let k = 0; k < a.children.length; k++) copy(a.children[k], b.children[k]);
  };
  const c = src.cloneNode(true); copy(src, c);
  if ((src.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number)[2] <= 100) {
    // circuit symbols: the site fills component bodies with the page's panel colour; make them transparent
    const t = document.createElement('div'); document.body.append(t); const tone = v => { t.style.color = v; return getComputedStyle(t).color; };
    const fills = new Set(['--sunk', '--panel', '--bg'].map(v => tone(`var(${v})`))); t.remove();
    for (const e of c.querySelectorAll('*')) { const st = e.getAttribute('style') || ''; const m = st.match(/fill:(rgb[^;]+);/); if (m && fills.has(m[1])) e.setAttribute('style', st.replace(m[0], 'fill:none;')); }
  }
  // defs referenced from outside the figure (shared arrowheads, gradients, patterns)
  const defs = [], have = new Set([...c.querySelectorAll('[id]')].map(e => e.id));
  const refs = el => [...(el.outerHTML.matchAll(/url\(["']?#([^)"']+)["']?\)|href="#([^"]+)"/g))].map(m => m[1] || m[2]);
  const queue = refs(c);
  while (queue.length) { const id = queue.shift(); if (have.has(id)) continue; have.add(id); const d = document.getElementById(id); if (!d) continue; const dc = d.cloneNode(true); copy(d, dc); defs.push(dc.outerHTML); queue.push(...refs(dc)); }
  // embed raster images
  for (const im of c.querySelectorAll('image')) {
    const href = im.getAttribute('href') || im.getAttribute('xlink:href'); if (!href || href.startsWith('data:')) continue;
    const img = [...src.querySelectorAll('image')].find(x => (x.getAttribute('href') || x.getAttribute('xlink:href')) === href);
    try { const cv = document.createElement('canvas'), I = new Image(); I.src = new URL(href, location.href).href; cv.width = I.naturalWidth; cv.height = I.naturalHeight; cv.getContext('2d').drawImage(I, 0, 0); im.setAttribute('href', cv.toDataURL('image/png')); im.removeAttribute('xlink:href'); } catch (e) { }
  }
  const vb = src.getAttribute('viewBox').split(/[\s,]+/).map(Number), scale = vb[2] < 200 ? 2 : 1;
  ['class', 'style', 'width', 'height', 'data-libx', 'id'].forEach(a => c.removeAttribute(a));
  c.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); c.setAttribute('width', vb[2] * scale); c.setAttribute('height', vb[3] * scale);
  c.setAttribute('font-family', "'Source Sans 3', Arial, sans-serif"); c.setAttribute('color', ink);
  c.insertAdjacentHTML('afterbegin', `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="${bg}"/>${defs.length ? `<defs>${defs.join('')}</defs>` : ''}`);
  return new XMLSerializer().serializeToString(c);
};

// Labels on the site may sit outside the viewBox (the page lets SVG overflow); widen the box so nothing is cut off.
const fit = () => {
  const svg = document.querySelector('#w svg'), bg = svg.querySelector(':scope > rect');
  const vb = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number), k = +svg.getAttribute('width') / vb[2];
  bg.setAttribute('display', 'none'); const b = svg.getBBox(); bg.removeAttribute('display');
  const pad = 6, x0 = Math.min(vb[0], b.x - pad), y0 = Math.min(vb[1], b.y - pad), x1 = Math.max(vb[0] + vb[2], b.x + b.width + pad), y1 = Math.max(vb[1] + vb[3], b.y + b.height + pad);
  const r = n => +n.toFixed(1), nv = [r(x0), r(y0), r(x1 - x0), r(y1 - y0)];
  svg.setAttribute('viewBox', nv.join(' ')); svg.setAttribute('width', r(nv[2] * k)); svg.setAttribute('height', r(nv[3] * k));
  bg.setAttribute('x', nv[0]); bg.setAttribute('y', nv[1]); bg.setAttribute('width', nv[2]); bg.setAttribute('height', nv[3]);
  return new XMLSerializer().serializeToString(svg);
};
const slug = s => s.toLowerCase().replace(/[’'“”]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').split('-').slice(0, 7).join('-');

(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1300, height: 900 } });
  await p.goto(URL); await p.waitForTimeout(3500);
  const figs = await p.evaluate(collect);
  const meta = [], used = new Set();
  const svgs = {};
  for (const [theme, bg] of THEMES) {
    await p.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme); await p.waitForTimeout(300);
    svgs[theme] = await Promise.all(figs.map((_, i) => p.evaluate(serialise, [i, bg])));
  }
  const shot = await b.newPage({ deviceScaleFactor: 2 });
  for (const d of ['svg', 'png-light', 'png-dark']) fs.mkdirSync(OUT + d, { recursive: true });
  figs.forEach((f, i) => {
    const [pre, topic] = topicOf(f);
    const base = f.kind === 'symbol' ? `electricity-symbol-${slug(f.desc)}` : f.kind === 'exam' ? (pre === 'exam-papers' ? `exam-paper-${f.page}-${slug(f.desc)}` : `${pre}-exam-question-${slug(f.desc)}`) : `${pre}-${slug(f.desc || f.aria)}`;
    let name = base, n = 2; while (used.has(name)) name = `${base}-${n++}`; used.add(name);
    f.file = name; f.topic = f.kind === 'symbol' ? 'Circuit symbols' : f.kind === 'exam' ? 'Exam question figures' : topic;
  });
  for (let i = 0; i < figs.length; i++) {
    const f = figs[i];
    for (const [theme] of THEMES) {
      await shot.setContent(`<html><body style="margin:0"><div id=w style="display:inline-block">${svgs[theme][i]}</div></body></html>`);
      svgs[theme][i] = await shot.evaluate(fit); await shot.waitForTimeout(30);
      if (theme === 'light') fs.writeFileSync(OUT + `svg/${f.file}.svg`, '<?xml version="1.0" encoding="UTF-8"?>\n' + svgs.light[i]);
      await (await shot.$('#w svg')).screenshot({ path: OUT + `png-${theme}/${f.file}.png` });
    }
    meta.push({ file: f.file, figure: null, options: {}, topic: f.topic, description: f.kind === 'exam' ? `Exam question figure (${f.lesson}): ${f.desc}` : f.kind === 'symbol' ? `Circuit symbol: ${f.desc}` : f.desc || f.aria, source: { page: f.page, lesson: f.lesson, kind: f.kind, question: f.qid || undefined } });
  }
  // keep export.py's SciFig entries, replace the site-figure entries from any earlier run
  const all = JSON.parse(fs.readFileSync(OUT + 'diagrams.json', 'utf8')).filter(d => !d.source);
  for (const d of JSON.parse(fs.readFileSync(OUT + 'diagrams.json', 'utf8')).filter(d => d.source && !used.has(d.file)))
    for (const x of ['svg/' + d.file + '.svg', 'png-light/' + d.file + '.png', 'png-dark/' + d.file + '.png']) if (fs.existsSync(OUT + x)) fs.unlinkSync(OUT + x);
  fs.writeFileSync(OUT + 'diagrams.json', JSON.stringify(all.concat(meta), null, 1));
  console.log(meta.length, 'site figures exported');
  await b.close();
})();
