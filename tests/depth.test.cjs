const {test} = require('node:test');
const assert = require('node:assert/strict');
const {verify} = require('../tools/verify-depth.cjs');

test('every numerical answer in the depth data is reproduced by its calculation', () => {
  const r = verify();
  assert.deepEqual(r.errs, []);
  assert.ok(r.asserts > 100, 'expected the data files to be checked');
});

test('every lesson with depth data has at least three worked examples, three fill-the-gaps or 15 marks as planned', () => {
  for (const row of verify().rows) {
    assert.ok(row.examples >= 2, `${row.id}: ${row.examples} worked examples`);
    assert.ok(row.marks >= 6, `${row.id}: ${row.marks} exam marks added`);
  }
});
