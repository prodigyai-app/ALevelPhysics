/* Shared flow diagrams: turn a short structured summary into a readable diagram.
   FlowDiagram.html(spec) returns HTML. Spec:
   { type: 'steps' | 'cycle' | 'compare' | 'branch' | 'chain',
     title: 'Heading', note: 'optional caption',
     items: [{t:'Box heading', d:'one or two short lines'}]          // steps, cycle, chain
     root: {t,d}, items:[{t,d,tone:'good'|'bad'|'neutral'}]           // branch
     cols: [{t:'Column', items:['point', ...]}, ...]                  // compare
   }
   The layout is plain HTML so text wraps and stays readable on phones. */
(function (root) {
  'use strict';
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/_(\S(?:.*?\S)?)_/g, '<i>$1</i>');
  const box = (it, i, n, cls = '') => `<div class="fd-box ${cls} ${it.tone ? 'fd-' + it.tone : ''}"${n ? ` data-n="${n}"` : ''}>${it.t ? `<b class="fd-t">${rich(it.t)}</b>` : ''}${it.d ? `<span class="fd-d">${rich(it.d)}</span>` : ''}</div>`;
  const arrow = (dir = 'r') => `<span class="fd-arrow fd-${dir}" aria-hidden="true"></span>`;
  function body(s) {
    const items = s.items || [], n = items.length, per = n <= 5 ? n : Math.ceil(n / Math.ceil(n / 5));
    switch (s.type) {
      case 'cycle':
        return `<div class="fd-cycle" style="--n:${n};--per:${per}">${items.map((it, i) => box(it, i, i + 1) + (i < items.length - 1 ? arrow() : '')).join('')}</div><div class="fd-return" aria-hidden="true"><span>repeats</span></div>`;
      case 'compare':
        return `<div class="fd-compare" style="--c:${(s.cols || []).length}">${(s.cols || []).map(c => `<div class="fd-col${c.tone ? ' fd-' + c.tone : ''}"><b class="fd-ch">${rich(c.t)}</b><ul>${(c.items || []).map(x => `<li>${rich(x)}</li>`).join('')}</ul></div>`).join('')}</div>`;
      case 'branch':
        return `<div class="fd-branch">${box(s.root || {}, 0, 0, 'fd-root')}<div class="fd-stem" aria-hidden="true"></div><div class="fd-kids" style="--k:${items.length}">${items.map((it, i) => box(it, i, 0, 'fd-kid')).join('')}</div></div>`;
      case 'chain':
        return `<div class="fd-chain">${items.map((it, i) => box(it, i, 0) + (i < items.length - 1 ? arrow('d') : '')).join('')}</div>`;
      default:
        return `<div class="fd-steps" style="--per:${per}">${items.map((it, i) => box(it, i, s.numbered === false ? 0 : i + 1) + (i < items.length - 1 ? arrow() : '')).join('')}</div>`;
    }
  }
  function html(s) {
    if (!s) return '';
    const label = esc((s.title || 'Flow diagram') + (s.note ? '. ' + s.note : ''));
    return `<figure class="fd fd-type-${esc(s.type || 'steps')}" role="group" aria-label="${label}">${s.title ? `<figcaption class="fd-title">${rich(s.title)}</figcaption>` : ''}${body(s)}${s.note ? `<p class="fd-note">${rich(s.note)}</p>` : ''}</figure>`;
  }
  const api = { html, esc };
  root.FlowDiagram = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
