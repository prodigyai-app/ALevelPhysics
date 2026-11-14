/* Recompute every numerical answer in the depth-*.js data files.
   Run: node tools/verify-depth.cjs [--table]
   - exam parts with a checked answer must carry calc:"<expression>" that reproduces ans.a within 0.5 %
   - fill-the-gaps items carry calc:[...] with one expression for each numerical blank, in order (1 %)
   - worked examples carry {chk:[[expression, quoted value], ...]} as a fourth element, or {desc:true} for written answers
   Expressions use plain JavaScript with the constants and helpers defined in SCOPE below. */
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.join(__dirname, '..');
const NT = require(path.join(root, 'numeric-tools.js'));
const SCOPE = {
  g: 9.81, c: 3.00e8, h: 6.63e-34, e: 1.60e-19, k: 1.38e-23, R: 8.31, NA: 6.02e23, G: 6.67e-11, eps0: 8.85e-12, me: 9.11e-31, mp: 1.673e-27, mn: 1.675e-27, u: 1.661e-27, sigma: 5.67e-8, wien: 2.9e-3, kC: 8.99e9, MeV: 1.60e-13, yr: 3.16e7,
  pi: Math.PI, sqrt: Math.sqrt, cbrt: Math.cbrt, exp: Math.exp, ln: Math.log, lg: Math.log10, abs: Math.abs, pow: Math.pow, atan: Math.atan, asin: Math.asin, acos: Math.acos, sin: Math.sin, cos: Math.cos, tan: Math.tan,
  sind: d => Math.sin(d * Math.PI / 180), cosd: d => Math.cos(d * Math.PI / 180), tand: d => Math.tan(d * Math.PI / 180), asind: x => Math.asin(x) * 180 / Math.PI, atand: x => Math.atan(x) * 180 / Math.PI, acosd: x => Math.acos(x) * 180 / Math.PI,
  mean: (...a) => a.reduce((s, x) => s + x, 0) / a.length, max: Math.max, min: Math.min, round: Math.round
};
const names = Object.keys(SCOPE), vals = Object.values(SCOPE);
const calc = expr => Function(...names, `"use strict";return (${expr});`)(...vals);

function load() {
  delete require.cache[require.resolve(path.join(root, 'physics-depth.js'))];
  const api = require(path.join(root, 'physics-depth.js'));
  const W = { fr: (a, b) => `(${a})/(${b})`, res: x => x, v: (a, b) => a + (b ? '_' + b : ''), sq: x => `√(${x})` };
  const sb = { PhysDepth: api, LAB: { W }, EXAM: { graph: () => '<figure></figure>' }, console, Math };
  sb.window = sb; vm.createContext(sb);
  const files = fs.readdirSync(root).filter(f => /^depth-[\w-]+\.js$/.test(f)).sort();
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sb, { filename: f });
  return { api, files };
}
function verify() {
  const { api, files } = load(), errs = [], rows = [], prompts = [];
  let asserts = 0;
  const close = (a, b, rel) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= Math.abs(b) * rel + 1e-15;
  const bad = (id, msg) => errs.push(`${id}: ${msg}`);
  for (const id of api.ORDER) {
    const d = api.DATA[id]; let marks = 0, parts = 0;
    d.ex.forEach(([title, q, steps, meta], i) => {
      const tag = `${id} example ${i + 1} "${title}"`;
      if (!title || !q || !Array.isArray(steps) || steps.length < 2) bad(tag, 'needs a title, a question and at least two steps');
      steps.forEach(s => { if (!Array.isArray(s) || s.length !== 3 || !Array.isArray(s[2]) || !s[2].length || s[2].some(l => !String(l).trim())) bad(tag, 'each step is [title, why, [lines]] with no empty lines'); });
      if (!meta || (!meta.desc && !(meta.chk && meta.chk.length))) return bad(tag, 'needs {chk:[[expr, value]]} or {desc:true}');
      (meta.chk || []).forEach(([expr, val, rel]) => { asserts++; let got; try { got = calc(expr); } catch (e) { return bad(tag, `calc failed: ${expr} (${e.message})`); } if (!close(val, got, rel || 0.006)) bad(tag, `${expr} = ${got}, but the example quotes ${val}`); });
    });
    d.gaps.forEach((it, i) => {
      const tag = `${id} gaps ${i + 1}`;
      const blanks = it.lines.join(' ').match(/\[\[(.+?)\]\]/g) || [];
      if (!blanks.length) bad(tag, 'has no blanks');
      const numeric = blanks.map(b => b.slice(2, -2).split('|')[0]).filter(a => Number.isFinite(NT.parseNumber(a)));
      const cs = it.calc || [];
      if (cs.length !== numeric.length) return bad(tag, `${numeric.length} numerical blanks but ${cs.length} calc expressions`);
      numeric.forEach((a, j) => { asserts++; let got; try { got = calc(cs[j]); } catch (e) { return bad(tag, `calc failed: ${cs[j]} (${e.message})`); } if (!close(NT.parseNumber(a), got, 0.006)) bad(tag, `blank ${a} but ${cs[j]} = ${got}`); });
    });
    d.exam.forEach((q, qi) => q.parts.forEach((p, pi) => {
      const tag = `${id} exam q${qi + 1}(${'abcdefgh'[pi]})`;
      parts++; marks += p.m; prompts.push([tag, String((q.stem || '') + ' ' + p.q).replace(/<[^>]+>/g, ' ')]);
      if (!Number.isInteger(p.m) || p.m < 1) bad(tag, 'marks');
      if (p.opts) { if (p.opts.length !== 4 || new Set(p.opts).size !== 4 || !(p.a >= 0 && p.a < 4) || !p.why || p.m !== 1) bad(tag, 'multiple choice needs four different options, an answer index, a reason and one mark'); return; }
      if (p.lor) { if (!p.ind || p.m !== 6) bad(tag, 'level of response needs indicative content and 6 marks'); return; }
      if (!Array.isArray(p.ms) || p.ms.length !== p.m) bad(tag, `mark scheme has ${p.ms ? p.ms.length : 0} points for ${p.m} marks`);
      (p.ms || []).forEach(m => { if (!/^[MABC]\d$/.test(m[0]) || !m[1]) bad(tag, 'mark codes are M1, A1, B1 or C1'); });
      if (p.ans) {
        if (typeof p.ans.tol !== 'number') bad(tag, 'ans needs an explicit tol');
        if (!p.calc) return bad(tag, 'checked answer needs calc');
        asserts++; let got; try { got = calc(p.calc); } catch (e) { return bad(tag, `calc failed: ${p.calc} (${e.message})`); }
        if (!close(p.ans.a, got, 0.005)) bad(tag, `${p.calc} = ${got}, but ans.a = ${p.ans.a}`);
      } else if (p.calc) bad(tag, 'calc without ans');
    }));
    rows.push({ id, examples: d.ex.length, gaps: d.gaps.length, parts, marks });
  }
  return { errs, rows, asserts, files, prompts };
}
if (require.main === module) {
  const r = verify();
  if (process.argv.includes('--table')) console.table(r.rows);
  console.log(`${r.files.length} data files, ${r.rows.length} lessons, ${r.asserts} numerical checks, ${r.errs.length} problems`);
  r.errs.forEach(e => console.log('  ' + e));
  process.exitCode = r.errs.length ? 1 : 0;
}
module.exports = { verify, calc };
