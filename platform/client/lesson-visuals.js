/* Shared: add realistic figures (SciFig) and flow diagrams (FlowDiagram) to lesson pages.
   Each course supplies window.LESSON_VISUALS = { lessonId: [visual, ...] } where a visual is
   { title, after, fig: [name, options], caption, flow: spec, html } and `after` counts the
   lesson's learn cards (0 = top of the lesson, 1 = after the first card; default 1). */
(function () {
  'use strict';
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function render(v) {
    if (v.figs && window.SciFig) return `<figure class="fig sf-fig"><div class="sf-pair">${v.figs.map(f => window.SciFig.svg(f[0], f[1] || {})).join('')}</div>${v.caption ? `<figcaption>${v.caption}</figcaption>` : ''}</figure>`;
    if (v.fig && window.SciFig) return `<figure class="fig sf-fig">${window.SciFig.svg(v.fig[0], v.fig[1] || {})}${v.caption ? `<figcaption>${v.caption}</figcaption>` : ''}</figure>`;
    if (v.flow && window.FlowDiagram) return window.FlowDiagram.html(v.flow);
    return v.html || '';
  }
  function apply() {
    const all = window.LESSON_VISUALS || {};
    for (const id of Object.keys(all)) {
      const panel = document.getElementById('lesson-' + id + '-learn') || document.querySelector('#lab-' + CSS.escape(id) + ' .lesson-panel');
      if (!panel || panel.dataset.visuals) continue;
      panel.dataset.visuals = '1';
      const cards = [...panel.children].filter(c => c.classList.contains('lcard') || c.tagName === 'FIGURE');
      const end = panel.querySelector(':scope > details.lesson-objectives');
      for (const v of all[id]) {
        const html = render(v); if (!html) continue;
        const el = document.createElement('div');
        el.className = 'lcard lv-card' + (v.flow ? ' lv-flow' : ' lv-fig');
        el.dataset.visual = v.flow ? 'flow' : 'figure';
        el.innerHTML = (v.title ? `<h3>${esc(v.title)}</h3>` : '') + html;
        const at = Math.max(0, Math.min(v.after ?? 1, cards.length));
        const ref = at < cards.length ? cards[at] : end;
        panel.insertBefore(el, ref || null);
      }
    }
  }
  window.LessonVisuals = { apply, render };
  apply();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  window.addEventListener('load', apply);
})();
