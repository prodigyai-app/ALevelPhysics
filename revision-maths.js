/* Shared, scale-aware numerical checks and straight-line uncertainty bounds. */
(function (root) {
  "use strict";
  function matches(value, answer, relative = 0.02, absolute = 0) {
    if (![value, answer, relative, absolute].every(Number.isFinite) || relative < 0 || absolute < 0) return false;
    const rounding = 8 * Number.EPSILON * Math.max(Math.abs(value), Math.abs(answer));
    return Math.abs(value - answer) <= Math.abs(answer) * relative + absolute + rounding;
  }

  // Each error bar constrains the intercept: y-e-mx <= c <= y+e-mx.
  // Pairwise constraints give the full feasible interval of gradients.
  function worst(points, errors, best) {
    if (!best || !Number.isFinite(best.m) || points.length < 2) return null;
    const data = points.map(([x, y], i) => [x, y, Array.isArray(errors) ? errors[i] : errors]);
    if (data.some(p => !p.every(Number.isFinite) || p[2] < 0)) return null;
    data.sort((a, b) => a[0] - b[0]);
    let lower = -Infinity, upper = Infinity;
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        const [x1, y1, e1] = data[i], [x2, y2, e2] = data[j], dx = x2 - x1;
        if (dx === 0) {
          if (Math.abs(y2 - y1) > e1 + e2) return null;
          continue;
        }
        lower = Math.max(lower, (y2 - e2 - y1 - e1) / dx);
        upper = Math.min(upper, (y2 + e2 - y1 + e1) / dx);
      }
    }
    if (!Number.isFinite(lower) || !Number.isFinite(upper)) return null;
    const slack = 32 * Number.EPSILON * Math.max(Math.abs(lower), Math.abs(upper));
    if (lower > upper + slack) return null;
    if (lower > upper) lower = upper = (lower + upper) / 2;
    const m = Math.abs(lower - best.m) > Math.abs(upper - best.m) ? lower : upper;
    const cLow = Math.max(...data.map(([x, y, e]) => y - e - m * x));
    const cHigh = Math.min(...data.map(([x, y, e]) => y + e - m * x));
    const c = (cLow + cHigh) / 2;
    const dm = Math.abs(m - best.m);
    return {m, c, dm, pc: best.m === 0 ? null : dm / Math.abs(best.m) * 100};
  }
  const api = {matches, worst};
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.RevisionMath = api;
})(typeof window !== "undefined" ? window : globalThis);
