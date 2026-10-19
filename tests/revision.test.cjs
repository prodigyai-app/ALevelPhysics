const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {matches, worst} = require('../revision-maths.js');

test('numerical checks respect the scale of photon energies, h and ordinary quantities', () => {
  for (const answer of [6.63e-34, 3.98e-19, 4.55e-14, 2.43e-12, .294, 9.81, 1.63e16, -1.13e7]) {
    assert.equal(matches(answer, answer), true);
    assert.equal(matches(answer * 1.01, answer, .02), true);
    assert.equal(matches(answer * 1.1, answer, .02), false);
    assert.equal(matches(0, answer, .02), false);
    assert.equal(matches(-answer, answer, .02), false);
  }
  assert.equal(matches(0, 0), true);
  assert.equal(matches(.01, 0, 0, .02), true);
  assert.equal(matches(.03, 0, 0, .02), false);
  for (const value of [Infinity, -Infinity, NaN]) assert.equal(matches(value, 1), false);
});

function assertIntersects(points, errors, line) {
  assert.ok(line);
  points.forEach(([x,y], i) => {
    const error = Array.isArray(errors) ? errors[i] : errors;
    const residual = Math.abs(line.m*x + line.c - y);
    assert.ok(residual <= error + 1e-10 * Math.max(1, Math.abs(y)), `line misses error bar ${i}: ${residual} > ${error}`);
  });
}

test('a tight intermediate error bar limits the worst gradient', () => {
  const points = [[0,0],[.5,.5],[2,2]], errors = [1,.01,1];
  const line = worst(points,errors,{m:1,c:0});
  assertIntersects(points,errors,line);
  assert.ok(Math.abs(line.m - 1) < .674);
  assert.ok(Math.abs(line.m - 1) > .67);
  // The previous endpoints-only candidate m=2,c=-1 misses the middle bar.
  assert.ok(Math.abs(2*.5 - 1 - .5) > errors[1]);
});

test('negative gradients, unsorted readings and zero gradients work', () => {
  const points = [[2,-2],[0,0],[1,-1]], errors = [.1,.1,.01];
  const line = worst(points, errors, {m:-1,c:0});
  assertIntersects(points, errors, line);
  assert.ok(line.pc > 0);
  const flat = worst([[0,1],[1,1]], .1, {m:0,c:1});
  assert.equal(flat.pc, null);
  assert.ok(flat.dm > 0);
});

test('inconsistent bars and unidentifiable gradients do not produce a fake uncertainty', () => {
  assert.equal(worst([[0,0],[.5,2],[2,2]],[1,.01,1],{m:1,c:0}), null);
  assert.equal(worst([[0,0],[0,2]], .1, {m:0,c:1}), null);
  assert.equal(worst([[0,0],[0,0]], .1, {m:0,c:0}), null);
  assert.equal(worst([[0,0]], .1, {m:1,c:0}), null);
  assert.equal(worst([[0,0],[1,1]], -1, {m:1,c:0}), null);
  assert.equal(worst([[0,0],[1,1]], .1, null), null);
});

test('feasible lines intersect every bar for varied data sets', () => {
  // Deterministic off-centre readings around a known straight line.
  for (const slope of [-3, -.01, 0, .1, 10]) {
    for (const offset of [-100, 0, 20]) {
      const errors = [.2,.01,.15,.3,.05];
      const points = [0,.2,.7,1.5,3].map((x,i) => [x,slope*x+offset+errors[i]*(i%2 ? -.6 : .7)]);
      assertIntersects(points,errors,worst(points,errors,{m:slope,c:offset}));
    }
  }
});

test('all browser scripts parse and local script references exist', () => {
  const root = path.join(__dirname,'..');
  const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  for (const [i,match] of [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].entries()) {
    new vm.Script(match[1], {filename:`index.html script ${i}`});
  }
  for (const [,source] of html.matchAll(/<script[^>]*src="([^"/:]+\.js)"[^>]*>/g)) {
    new vm.Script(fs.readFileSync(path.join(root,source),'utf8'), {filename:source});
  }
  assert.match(html, /<html lang="en">/);
  assert.match(html, /name="viewport" content="width=device-width, initial-scale=1"/);
});

test('measurements content registers six unique lessons and a consistent exam paper', () => {
  const lessons = [], checks = [], papers = [];
  const elements = new Map(['mu-h','mu-dh','mu-t','mu-dt'].map((id,i) => [id, {valueAsNumber:[.8,.002,.404,.005][i]}]));
  const document = {getElementById(id) {
    if (!elements.has(id)) elements.set(id, {});
    const element = elements.get(id);
    element.addEventListener = () => {};
    return element;
  }};
  const empty = () => '';
  const B = new Proxy({}, {get:(_, key) => key === 'check' ? questions => {checks.push(...questions); return '';} : empty});
  const ctx = {document, LEARN:{unit:null,B,lesson:cfg=>lessons.push(cfg)}, LAB:{ICONS:{},W:{fr:empty,v:empty,res:empty}}, EXAM:{paper:cfg=>papers.push(cfg)}};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../measurements.js'),'utf8'),ctx);
  assert.equal(lessons.length,5);
  assert.equal(papers.length,1);
  const ids = [...lessons.map(l=>l.id),...papers.map(p=>p.id)];
  assert.equal(new Set(ids).size,6);
  assert.equal(ctx.LEARN.unit,null);
  assert.equal(checks.length,24);
  for (const question of checks) {
    if (question.opts) assert.ok(Number.isInteger(question.a) && question.a >= 0 && question.a < question.opts.length);
    else assert.ok(Number.isFinite(question.a));
  }
  const paper = papers[0], parts = paper.secB.flatMap(q=>q.parts);
  assert.equal(paper.secA.length + parts.reduce((sum,p)=>sum+p.m,0),33);
  for (const part of parts) if (part.ms) assert.equal(part.ms.length,part.m);
  assert.match(elements.get('mu-calc').textContent,/9\.803/);
});
