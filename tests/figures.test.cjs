const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadLibrary() {
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
