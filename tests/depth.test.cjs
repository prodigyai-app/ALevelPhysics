const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const {verify} = require('../tools/verify-depth.cjs');
const {check} = require('../tools/similarity.cjs');

test('every numerical answer in the depth data is reproduced by its calculation', () => {
  const r = verify();
  assert.deepEqual(r.errs, []);
  assert.ok(r.asserts > 100, 'expected the data files to be checked');
});

test('every lesson with depth data reaches 15 exam marks in total and has new worked examples', () => {
  const cat = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'assessment-catalog.json'), 'utf8'));
  for (const row of verify().rows) {
    const old = (cat.pages[row.id]?.questions || []).filter(q => !q.id.startsWith('check:')).reduce((s, q) => s + q.m, 0);
    assert.ok(old + row.marks >= 15, `${row.id}: ${old} existing + ${row.marks} new marks`);
    assert.ok(row.examples >= 1, `${row.id}: no new worked examples`);
  }
});

test('no new exam question is a near-duplicate of an existing one', () => {
  assert.deepEqual(check(0.45).hits, []);
});
