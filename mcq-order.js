/* Display order for multiple-choice options.
   The stored option order and the stored correct index never change (saved answers keep working);
   only the order the options are shown in is permuted, by a seed taken from the question text, so a
   question looks the same on every visit but "the answer is usually B" no longer works.
   Option sets with an inherent order (numbers in order, "all of the above", "both ...") stay as written. */
(function (root) {
  "use strict";
  function mix(s) { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function plain(o) { return String(o).replace(/<[^>]*>/g, '').replace(/&minus;|−/g, '-').replace(/,/g, ''); }
  function lead(o) { const m = plain(o).match(/^\s*(-?\d+(?:\.\d+)?)/); return m ? +m[1] : null; }
  function keepOrder(opts) {
    if (opts.some(o => /\b(all|none) of the above\b|\b(both|neither)\b|\b[A-D] and [A-D]\b/i.test(plain(o)))) return true;
    const v = opts.map(lead);
    if (v.every(x => x !== null)) {
      const up = v.every((x, i) => !i || x >= v[i - 1]), down = v.every((x, i) => !i || x <= v[i - 1]);
      if (up || down) return true;
    }
    return false;
  }
  /* order(key, opts) -> array of original indexes in display order */
  function order(key, opts) {
    const n = opts.length, idx = Array.from({ length: n }, (_, i) => i);
    if (n < 2 || keepOrder(opts)) return idx;
    const r = rng(mix(plain(key)));
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    return idx;
  }
  const api = { order, keepOrder, mix };
  if (typeof module === 'object' && module.exports) module.exports = api; else root.MCQ = api;
})(typeof window !== 'undefined' ? window : globalThis);
