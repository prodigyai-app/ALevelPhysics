/* A level Physics: extra depth for each lesson, kept as data in depth-*.js.
   PhysDepth.add(lessonId, {ex:[[title, question, steps]], gaps:[{q, lines, why}], exam:[{stem, parts}]})
   - ex    worked examples in the lesson's own format (LEARN.B.example); they go after the last existing example
   - gaps  fill-the-gaps working: write blanks as [[answer]] or [[answer|alternative]]; numbers are matched to 1 %
   - exam  exam-style questions added to the lesson's question card (or a new card if it has none)
   PhysDepth.apply() runs once, after every lesson has been built and before the tabs are laid out.
   Each data file is checked by tools/verify-depth.cjs: every numerical answer is recomputed from its `calc`. */
(function (root) {
  'use strict';
  const DATA = {}, ORDER = [];
  const add = (id, d) => { if (!DATA[id]) { DATA[id] = { ex: [], gaps: [], exam: [] }; ORDER.push(id); } for (const k of ['ex', 'gaps', 'exam']) if (d[k]) DATA[id][k].push(...d[k]); };
  const api = { add, DATA, ORDER, apply: () => {} };
  if (typeof module === 'object' && module.exports) { module.exports = api; return; }
  root.PhysDepth = api;
  if (!root.document) return;

  const KEY = 'phys-fill';
  const store = { get() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (_) { return {}; } }, set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (_) {} } };
  const SAVED = store.get(), ITEMS = {};
  const num = s => root.NumericTools ? root.NumericTools.parseNumber(s) : Number(s);
  const norm = s => String(s).toLowerCase().replace(/\s+/g, '').replace(/−/g, '-');
  function same(typed, answer) {
    if (norm(typed) === norm(answer)) return true;
    const a = num(typed), b = num(answer);
    return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= Math.abs(b) * 0.01 + 1e-12;
  }
  const right = box => box.dataset.a.split('|').some(a => same(box.value, a));
  let n = 0;
  function gapsHTML(id, items) {
    const cid = 'pf' + (++n);
    const body = items.map((it, i) => {
      const fid = `${id}:${i}`; ITEMS[fid] = it;
      const lines = it.lines.map(l => `<div class="pfl">${l.replace(/\[\[(.+?)\]\]/g, (m, a) => `<input class="pfbox" data-a="${a.replace(/"/g, '&quot;')}" style="width:${Math.max(4, Math.min(16, a.split('|')[0].length + 2))}ch" autocomplete="off" spellcheck="false" aria-label="Missing value">`)}</div>`).join('');
      return `<div class="pfi" data-f="${fid}"><div class="pfq"><b class="qn">${i + 1}</b>${it.q}</div><div class="pfw">${lines}</div><div class="qact"><button class="btn primary" data-pfchk="1">Check</button><button class="btn" data-pfshow="1">Show answers</button></div><div class="qfb" hidden></div></div>`;
    }).join('');
    return `<div class="lcard fill" id="${cid}"><h3><span class="kind k-fill">Fill the gaps</span>Complete the working <span class="qscore"></span></h3><p class="muted pf-intro">Fill in the missing value in each line, then check. Numbers are accepted within 1 %; write powers of ten as 3.2e-5 or 3.2 × 10^-5.</p><div class="pfis">${body}</div></div>`;
  }
  function score(card) { const all = [...card.querySelectorAll('.pfi')], ok = all.filter(f => f.dataset.st === 'ok').length; card.querySelector('.qscore').textContent = `${ok} / ${all.length} correct`; }
  function keep(fi) { SAVED[fi.dataset.f] = { v: [...fi.querySelectorAll('.pfbox')].map(b => b.value), st: fi.dataset.st || '' }; store.set(SAVED); }
  function check(fi) {
    const bs = [...fi.querySelectorAll('.pfbox')]; let good = 0, empty = 0;
    bs.forEach(b => { b.classList.remove('ok', 'no'); if (!b.value.trim()) { empty++; return; } const ok = right(b); b.classList.add(ok ? 'ok' : 'no'); if (ok) good++; });
    const fb = fi.querySelector('.qfb'), all = good === bs.length, it = ITEMS[fi.dataset.f] || {};
    fb.hidden = false; fb.className = 'qfb ' + (all ? 'ok' : 'nok');
    fb.innerHTML = all ? `<b>All correct.</b> ${it.why || ''}` : empty && !good ? 'Fill in the boxes first.' : `<b>${good} of ${bs.length} correct.</b> Look again at the red boxes, or show the answers.`;
    if (fi.dataset.st !== 'shown' || all) fi.dataset.st = all ? 'ok' : 'no';
    keep(fi); score(fi.closest('.fill'));
  }
  function reveal(fi) {
    fi.querySelectorAll('.pfbox').forEach(b => { b.value = b.dataset.a.split('|')[0]; b.classList.remove('no'); b.classList.add('ok'); });
    const fb = fi.querySelector('.qfb'), it = ITEMS[fi.dataset.f] || {};
    fb.hidden = false; fb.className = 'qfb ok'; fb.innerHTML = `<b>Answers shown.</b> ${it.why || ''} Cover them and try again later.`;
    if (fi.dataset.st !== 'ok') fi.dataset.st = 'shown';
    keep(fi); score(fi.closest('.fill'));
  }
  document.addEventListener('click', e => { const c = e.target.closest && e.target.closest('[data-pfchk],[data-pfshow]'); if (!c) return; const fi = c.closest('.pfi'); c.dataset.pfchk ? check(fi) : reveal(fi); });
  document.addEventListener('keydown', e => { if (e.key !== 'Enter' || !e.target.matches || !e.target.matches('.pfbox')) return; const fi = e.target.closest('.pfi'), bs = [...fi.querySelectorAll('.pfbox')], i = bs.indexOf(e.target); if (i < bs.length - 1) bs[i + 1].focus(); else check(fi); });
  document.addEventListener('input', e => { const b = e.target; if (!b.matches || !b.matches('.pfbox')) return; b.classList.remove('no'); b.classList.toggle('ok', !!b.value.trim() && right(b)); });

  const css = `.k-fill{background:#7a4fb3;color:#fff}.pf-intro{margin:-4px 0 12px;font-size:.92rem}.pfis{display:flex;flex-direction:column;gap:14px}
.pfi{border:1px solid var(--line);border-radius:8px;padding:12px 14px;background:var(--bg)}
.pfq{padding:9px 12px;background:var(--sunk);border-radius:8px;margin-bottom:10px;line-height:1.55}.pfq b.qn{font-family:var(--f-mono);color:var(--accent);margin-right:8px}
.pfl{min-height:40px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;line-height:1.6;padding:2px 0}
.pfbox{font-family:var(--f-mono);font-size:.98rem;height:34px;padding:0 6px;text-align:center;border:1px solid var(--line);border-bottom:2px dashed var(--accent);border-radius:6px;background:var(--panel);color:var(--ink);max-width:100%}
.pfbox:focus{outline:2px solid var(--accent);outline-offset:1px}
.pfbox.ok{border-color:var(--good);border-bottom-style:solid;background:color-mix(in srgb,var(--good) 14%,var(--panel))}
.pfbox.no{border-color:var(--bad);border-bottom-style:solid;background:color-mix(in srgb,var(--bad) 12%,var(--panel))}
.pfi .qact{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}.pfi .qact .btn{width:auto;min-height:36px;padding:5px 14px}`;

  let applied = false;
  api.apply = function () {
    if (applied || !root.LEARN || !root.EXAM) return; applied = true;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    const { B } = root.LEARN, EX = root.EXAM;
    const frag = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
    for (const id of ORDER) {
      const d = DATA[id], sec = document.querySelector('#lab-' + CSS.escape(id) + ' .lsec'); if (!sec) continue;
      const cards = [...sec.children];
      const lastEx = cards.filter(c => c.classList.contains('ex')).pop();
      const firstCheck = cards.find(c => /^qz/.test(c.id)) || cards.find(c => c.querySelector('.kp'));
      let after = lastEx || null;
      const place = el => { if (after) { after.after(el); } else if (firstCheck) { sec.insertBefore(el, firstCheck); } else sec.appendChild(el); after = el; };
      d.ex.forEach(([title, q, steps]) => place(frag(B.example(title, q, steps))));
      if (d.gaps.length) place(frag(gapsHTML(id, d.gaps)));
      if (d.exam.length) {
        const cid = 'xm-' + id;
        if (EX.CARDS[cid] && EX.extend) EX.extend(cid, d.exam);
        else EX.attach(id, { title: 'Exam-style questions', intro: 'Write your answer, then open the mark scheme and tick the marks you earned. Numerical parts can be checked automatically.', qs: d.exam });
      }
    }
    document.querySelectorAll('.pfi').forEach(fi => {
      const s = SAVED[fi.dataset.f]; if (!s) return;
      const bs = [...fi.querySelectorAll('.pfbox')]; bs.forEach((b, j) => { b.value = (s.v || [])[j] || ''; if (b.value.trim()) b.classList.add(right(b) ? 'ok' : 'no'); }); fi.dataset.st = s.st || '';
    });
    document.querySelectorAll('.lcard.fill').forEach(score);
  };
})(typeof window === 'undefined' ? globalThis : window);
