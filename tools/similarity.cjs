/* Near-duplicate check: compares every new exam prompt in depth-*.js with every existing catalog prompt
   (and with each other) using word-trigram Jaccard similarity on normalised text, numbers kept.
   Run: node tools/similarity.cjs [threshold=0.45] */
const fs = require('node:fs'), path = require('node:path');
const { verify } = require('./verify-depth.cjs');
const norm = s => String(s).toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9.⁰¹²³⁴⁵⁶⁷⁸⁹⁻ ]+/g, ' ').replace(/\s+/g, ' ').trim();
const grams = s => { const w = norm(s).split(' '), g = new Set(); for (let i = 0; i + 2 < w.length; i++) g.add(w.slice(i, i + 3).join(' ')); if (!g.size) g.add(w.join(' ')); return g; };
const jac = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n || 1); };
function check(th = 0.45) {
  const cat = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'assessment-catalog.json'), 'utf8'));
  const old = [];
  for (const [pid, p] of Object.entries(cat.pages)) for (const q of p.questions) if (!q.id.startsWith('check:')) old.push([pid + ' ' + q.id, grams(q.prompt)]);
  const { prompts } = verify(), fresh = prompts.map(([t, s]) => [t, grams(s), s]), hits = [];
  // the shared stem repeats across parts of one question, so compare part text when the stems match
  for (const [t, g] of fresh) for (const [o, h] of old) { const s = jac(g, h); if (s >= th) hits.push([s, t, o]); }
  for (let i = 0; i < fresh.length; i++) for (let j = i + 1; j < fresh.length; j++) { if (fresh[i][0].split(' exam ')[0] + fresh[i][0].split(' exam ')[1].slice(0, 3) === fresh[j][0].split(' exam ')[0] + fresh[j][0].split(' exam ')[1].slice(0, 3)) continue; const s = jac(fresh[i][1], fresh[j][1]); if (s >= th) hits.push([s, fresh[i][0], fresh[j][0]]); }
  return { hits: hits.sort((a, b) => b[0] - a[0]), compared: fresh.length, against: old.length };
}
if (require.main === module) { const r = check(+(process.argv[2] || 0.45)); console.log(`${r.compared} new prompts against ${r.against} existing: ${r.hits.length} above threshold`); r.hits.slice(0, 30).forEach(([s, a, b]) => console.log(`  ${s.toFixed(2)}  ${a}  ~  ${b}`)); process.exitCode = r.hits.length ? 1 : 0; }
module.exports = { check };
