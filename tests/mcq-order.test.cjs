const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {order, keepOrder} = require('../mcq-order.js');

test('display order is a deterministic permutation of the stored options', () => {
  const opts = ['alpha', 'beta', 'gamma', 'delta'];
  const a = order('Which is first?', opts), b = order('Which is first?', opts);
  assert.deepEqual(a, b);
  assert.deepEqual([...a].sort(), [0, 1, 2, 3]);
});

test('ordered option sets keep their written order', () => {
  assert.equal(keepOrder(['1.0 m s⁻¹', '2.0 m s⁻¹', '4.0 m s⁻¹', '8.0 m s⁻¹']), true);
  assert.equal(keepOrder(['8 N', '4 N', '2 N', '1 N']), true);
  assert.equal(keepOrder(['A only', 'B only', 'Both A and B', 'Neither']), true);
  assert.equal(keepOrder(['It speeds up', 'It slows down', 'It stops', 'It reverses']), false);
  assert.deepEqual(order('q', ['1 s', '2 s', '3 s', '4 s']), [0, 1, 2, 3]);
});

test('the correct answer is spread across A-D for every kind of page', () => {
  const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'assessment-catalog.json'), 'utf8')).pages;
  const count = [0, 0, 0, 0]; let n = 0;
  for (const page of Object.values(pages)) for (const q of page.questions) {
    if (q.kind !== 'choice' || q.options.length !== 4) continue;
    count[order(q.prompt, q.options).indexOf(q.correct)]++; n++;
  }
  assert.ok(n > 400, 'expected the full set of multiple-choice questions, got ' + n);
  count.forEach((c, i) => assert.ok(c / n > .18 && c / n < .35, `position ${'ABCD'[i]} holds ${(100 * c / n).toFixed(1)}% of the correct answers`));
});
