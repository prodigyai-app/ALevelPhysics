const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadLibrary() { return loadLibraryWith(); }
function loadLibraryWith(...extra) {
  const sandbox = {console, Math, Date, JSON, Set, Map, Array, Object, String, Number, RegExp};
  sandbox.window = sandbox; sandbox.globalThis = sandbox;
  sandbox.document = {createElement: () => ({style: {}, setAttribute() {}, appendChild() {}}), getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, head: {appendChild() {}}, body: {appendChild() {}}};
  vm.createContext(sandbox);
  const run = file => vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), sandbox, {filename: file});
  run('science-figures.js');
  const names = ['animalCell', 'plantCell', 'bacterialCell', 'atom', 'neurone', 'heart', 'leaf', 'alveolus', 'eye', 'specialised', 'dna', 'nephron', 'synapse', 'mitochondrion', 'chloroplast', 'ionicBond', 'covalent', 'lattice', 'metallic', 'giantCovalent', 'atomModels', 'isotopes', 'states', 'flower', 'digestive', 'lungs', 'earth'];
  const S = sandbox.SciFig, reg = S.register;
  S.register = (n, fn) => { names.push(n); reg(n, fn); };
  run('science-figures-2.js');
  extra.forEach(run);
  S.names = names;
  return S;
}
const ids = svg => [...svg.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);

test('every figure gives its own gradient and marker ids each time it is drawn', () => {
  const S = loadLibrary();
  assert.ok(S, 'SciFig library did not load');
  let drawn = 0;
  for (const name of S.names) {
    let a, b;
    try { a = S.svg(name, {}); b = S.svg(name, {}); } catch (e) { continue; }
    if (typeof a !== 'string' || !a.includes('<svg')) continue;
    drawn++;
    const first = ids(a), second = new Set(ids(b));
    assert.equal(new Set(first).size, first.length, `${name} repeats an id inside one drawing`);
    first.forEach(id => assert.ok(!second.has(id), `${name}: id "${id}" is shared between two drawings, so one can paint nothing when the other is hidden`));
  }
  assert.ok(drawn > 40, 'expected to draw the whole figure library, drew ' + drawn);
});

test('the redshift figure keeps its coloured spectrum strips', () => {
  const S = loadLibrary();
  const svg = S.svg('redshiftHubble', {});
  const grad = ids(svg).find(id => id.startsWith('rsg'));
  assert.ok(grad, 'gradient id missing');
  assert.ok(svg.includes(`url(#${grad})`), 'strips no longer reference their own gradient');
});

test('the HR diagram and binding-energy figures carry numerical axes', () => {
  const S = loadLibrary();
  const hr = S.svg('hrDiagram', {}), be = S.svg('bindingEnergy', {});
  ['10⁻⁴', '10⁶', '40 000', '3 000'].forEach(t => assert.ok(hr.includes(t), 'HR diagram missing axis label ' + t));
  ['>10<', '>8<', '>250<'].forEach(t => assert.ok(be.includes(t), 'binding-energy figure missing axis label ' + t));
});

test('no two lessons show the same figure', () => {
  const S = loadLibraryWith('physics-figures.js');
  const src = fs.readFileSync(path.join(__dirname, '..', 'lesson-visuals-data-2.js'), 'utf8');
  const A = JSON.parse(src.match(/A=(\{.*\});for/s)[1]);
  const seen = new Map(), dup = [];
  for (const [lesson, list] of Object.entries(A)) for (const v of list) {
    if (!v.fig) continue;
    const svg = S.svg(v.fig[0], v.fig[1] || {});
    assert.ok(svg.includes('<svg'), `${lesson}: figure ${v.fig[0]} did not draw`);
    const text = svg.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(), key = text + '|' + (svg.match(/<[a-z]/g) || []).length;
    if (seen.has(key) && seen.get(key) !== lesson) dup.push(`${seen.get(key)} and ${lesson} (${v.fig[0]})`); else seen.set(key, lesson);
  }
  assert.deepEqual(dup, [], 'lessons sharing an identical figure');
});

test('the lesson-specific figures carry role="img" and an aria-label', () => {
  const S = loadLibraryWith('physics-figures.js');
  assert.ok(S._physicsFigures.length >= 36);
  for (const n of S._physicsFigures) {
    const svg = S.svg(n, {});
    assert.match(svg, /role="img"/, n);
    assert.match(svg, /aria-label="[^"]{20,}"/, n);
    assert.doesNotMatch(svg, /NaN|undefined|Infinity/, n);
  }
});
