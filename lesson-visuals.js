/* Shared: add realistic figures (SciFig) and flow diagrams (FlowDiagram) to lesson pages.
   Each course supplies window.LESSON_VISUALS = { lessonId: [visual, ...] } where a visual is
   { title, after, in, fig: [name, options], caption, flow: spec, html } and `after` counts the
   lesson's learn cards (0 = top of the lesson, 1 = after the first card; default 1).
   `in` names the heading of the card the visual illustrates: it is then placed inside that card. */
(function () {
  'use strict';
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const TOOL = '<div class="lv-tools"><button type="button" class="btn lv-test" aria-pressed="false">Test yourself</button><span class="lv-status" role="status"></span></div>';
  function body(v) {
    if (v.figs && window.SciFig) return `<figure class="fig sf-fig"><div class="sf-pair">${v.figs.map(f => window.SciFig.svg(f[0], f[1] || {})).join('')}</div>${v.caption ? `<figcaption>${v.caption}</figcaption>` : ''}</figure>`;
    if (v.fig && window.SciFig) return `<figure class="fig sf-fig">${window.SciFig.svg(v.fig[0], v.fig[1] || {})}${v.caption ? `<figcaption>${v.caption}</figcaption>` : ''}</figure>`;
    if (v.flow && window.FlowDiagram) return window.FlowDiagram.html(v.flow);
    return v.html || '';
  }
  function render(v) {
    const html = body(v);
    if (!html) return '';
    const testable = html.includes('sf-lbl') || html.includes('sf-q') || (v.flow && html.includes('fd-'));
    return `<div class="lv-wrap">${html}${testable ? TOOL : ''}</div>`;
  }
  /* "Test yourself": hide labels and electrons (figures) or box headings and list points (flow diagrams);
     tap or press Enter on a blank to reveal it. */
  function targets(wrap) {
    const labs = [...wrap.querySelectorAll('.sf-lbl, .sf-q')];
    if (labs.length) return labs;
    const fd = wrap.querySelector('.fd');
    if (!fd) return [];
    if (fd.classList.contains('fd-type-compare')) return [...fd.querySelectorAll('.fd-col li')];
    let boxes = [...fd.querySelectorAll('.fd-box:not(.fd-root)')];
    if (!fd.classList.contains('fd-type-branch') && boxes.length > 2) boxes = boxes.slice(1);
    return boxes.map(b => b.querySelector('.fd-t') || b);
  }
  function status(wrap) {
    const all = wrap.querySelectorAll('.lv-hidden, .lv-shown').length, left = wrap.querySelectorAll('.lv-hidden').length;
    const st = wrap.querySelector('.lv-status');
    if (st) st.textContent = wrap.classList.contains('lv-testing') ? (left ? `${all - left} of ${all} revealed` : `All ${all} revealed`) : '';
  }
  function setTest(wrap, on) {
    const btn = wrap.querySelector('.lv-test');
    wrap.classList.toggle('lv-testing', on);
    btn.setAttribute('aria-pressed', String(on));
    btn.textContent = on ? 'Show all' : 'Test yourself';
    for (const el of targets(wrap)) {
      el.classList.toggle('lv-hidden', on); el.classList.remove('lv-shown');
      if (on) { el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button'); el.setAttribute('aria-label', 'Hidden answer: select to reveal'); }
      else { el.removeAttribute('tabindex'); el.removeAttribute('role'); el.removeAttribute('aria-label'); }
    }
    status(wrap);
  }
  function reveal(el) {
    const wrap = el.closest('.lv-wrap');
    el.classList.remove('lv-hidden'); el.classList.add('lv-shown');
    el.removeAttribute('aria-label'); el.removeAttribute('role'); el.removeAttribute('tabindex');
    if (wrap) status(wrap);
  }
  document.addEventListener('click', e => {
    const btn = e.target.closest && e.target.closest('.lv-test');
    if (btn) { const w = btn.closest('.lv-wrap'); setTest(w, !w.classList.contains('lv-testing')); return; }
    const h = e.target.closest && e.target.closest('.lv-hidden');
    if (h) { e.preventDefault(); e.stopPropagation(); reveal(h); }
  }, true);
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const h = e.target.closest && e.target.closest('.lv-hidden');
    if (h) { e.preventDefault(); reveal(h); }
  });
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
        if (v.in) { // place inside the explanation card it illustrates, under its text or table
          const host = cards.find(c => { const h = c.querySelector('h3,h4'); return h && h.textContent.trim().toLowerCase().startsWith(v.in.toLowerCase()); });
          if (host) { const box = document.createElement('div'); box.className = 'lv-inline' + (v.flow ? ' lv-flow' : ' lv-fig'); box.innerHTML = (v.title ? `<h4>${esc(v.title)}</h4>` : '') + html; host.appendChild(box); continue; }
        }
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
