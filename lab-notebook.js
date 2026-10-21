/* Course-scoped practical records. Apparatus animations restart; recorded evidence stays. */
window.LabNotebook = (() => {
 'use strict';
 const states = new Map(), cards = new Map();let saveFailed=false;
 const site = () => window.ALP_SITE || window.COURSE_META?.id || 'science';
 const prefix = () => `learn-${site()}-lab-`;
 const read = key => { try { return JSON.parse(localStorage.getItem(key)); } catch (_) { return null; } };
 const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { saveFailed=true;return false; } };
 const clone = value => JSON.parse(JSON.stringify(value));
 const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const recordField = k => /^(data\w*|runs|readings|res|log|ans|dia|bg|bgData)$/.test(k);
 function observe(id, state, options = {}) {
  const key = prefix() + 'data-' + id;
  const keys = options.keys || Object.keys(state).filter(recordField);
  // Keep random calibration/sample constants with their observations.
  for (const k of ['sap','basin','R0','T0','VE','c']) if (k in state && !keys.includes(k)) keys.push(k);
  const saved = read(key);
  if (saved?.v === 1) for (const k of keys) if (Object.hasOwn(saved.values || {}, k)) state[k] = clone(saved.values[k]);
  states.set(id, {id,key, state, keys, last: JSON.stringify(saved), extra: options.extra});
  return state;
 }
 function flush() {
  for (const entry of states.values()) {
   const values = Object.fromEntries(entry.keys.map(k => [k, entry.state[k]]));
   const value = {v:1, values}, text = JSON.stringify(value);
   if (text !== entry.last && write(entry.key, value)) entry.last = text;
  }
  for (const [id, card] of cards) {
   const panel = card.querySelector('.lab-notebook');
   if (panel) panel.querySelector('[data-save-status]').textContent = saveFailed?'This browser could not save your latest changes. Download your results before leaving.':'Readings and review saved on this device. Sign in to use account sync.';
  }
 }
 const hasEvidence = state => Object.entries(state || {}).some(([k,v]) => recordField(k) && (Array.isArray(v) ? v.some(x => x !== null) : v && typeof v === 'object' && Object.values(v).some(x => Array.isArray(x) ? x.length : x !== null && x !== false)));
 function attach(cfg, section) {
  if (cfg.embed || cards.has(cfg.id)) return;
  cards.set(cfg.id, section);
  const key = prefix() + 'review-' + cfg.id, saved = read(key) || {};
  const panel = document.createElement('div'); panel.className = 'card lab-notebook';
  const qa = cfg.info?.qa?.[0];
  panel.innerHTML = `<div class="card-h"><h3>Practical notebook</h3><span data-save-status role="status"></span></div>
   <p class="muted">Recorded readings return after a refresh; a running experiment restarts. Download your results before sharing them with your teacher.</p>
   <button class="btn" type="button" data-export>Download results CSV</button>
   <label style="display:block;margin:16px 0 6px" for="${cfg.id}-reflection">Conclusion and evaluation: use your readings, discuss uncertainty and suggest an improvement.</label>
   <textarea id="${cfg.id}-reflection" data-reflection rows="4" style="width:100%"></textarea>
   <fieldset style="margin:14px 0;padding:12px"><legend>Practical skills check</legend>
   <label style="display:block">Why repeat measurements? <select data-skill="0"><option value="">Choose</option><option value="a">To remove every systematic error</option><option value="b">To estimate variation and calculate a representative mean</option></select></label>
   <label style="display:block;margin-top:10px">What does a larger sample or more repeats fail to correct? <select data-skill="1"><option value="">Choose</option><option value="a">A consistent calibration error or biased method</option><option value="b">Random variation between readings</option></select></label></fieldset>
   ${qa ? `<details><summary>Apply this practical: ${qa[0]}</summary><div class="prose">${qa[1]}</div></details><label style="display:block;margin:12px 0"><input type="checkbox" data-applied> I compared my explanation with the practical answer above.</label>` : '<label style="display:block;margin:12px 0"><input type="checkbox" data-applied> I evaluated my method using the guidance for this practical.</label>'}
   <button class="btn primary" type="button" data-review>Check skills and complete review</button><p data-review-status role="status"></p>`;
  section.append(panel);
  panel.querySelector('[data-reflection]').value = saved.reflection || '';
  panel.querySelectorAll('[data-skill]').forEach((el,i) => el.value = saved.skills?.[i] || '');
  panel.querySelector('[data-applied]').checked = !!saved.applied;
  const paint = () => { panel.querySelector('[data-review-status]').textContent = saved.complete ? `Review complete · skills ${saved.score}/2 · explanation self-reviewed.` : saved.score == null ? 'Record evidence, write your evaluation, then check your skills.' : `Skills ${saved.score}/2. Review the questions and try again. Repeats reduce the effect of random variation; they do not remove calibration errors.`; };
  function save() {
   saved.reflection = panel.querySelector('[data-reflection]').value;
   saved.skills = [...panel.querySelectorAll('[data-skill]')].map(el => el.value);
   saved.applied = panel.querySelector('[data-applied]').checked;
   // Editing an assessed answer requires a fresh check.
   saved.complete = false; delete saved.score;
   write(key, saved); paint();
  }
  panel.addEventListener('input', save);
  panel.addEventListener('change', save);
  panel.querySelector('[data-review]').addEventListener('click', () => {
   saved.score = (saved.skills?.[0] === 'b' ? 1 : 0) + (saved.skills?.[1] === 'a' ? 1 : 0);
   const evidence = [...states.entries()].some(([id,entry])=>(id===cfg.id || id.startsWith(cfg.id+'-')) && hasEvidence(entry.state));
   saved.complete = saved.score === 2 && saved.applied && (saved.reflection || '').trim().length >= 30 && evidence;
   write(key, saved); flush(); paint();
   if (!saved.complete && saved.score === 2) panel.querySelector('[data-review-status]').textContent = 'Skills 2/2. To complete: record some experimental evidence, write a conclusion/evaluation (at least 30 characters) and review the practical explanation.';
   window.dispatchEvent(new CustomEvent('labreviewchange', {detail:{id:cfg.id,complete:saved.complete}}));
  });
  panel.querySelector('[data-export]').addEventListener('click', () => {
   flush(); const entries = [...states.entries()].filter(([id])=>id===cfg.id || id.startsWith(cfg.id+'-')).map(([,entry])=>entry);
   const lines = [['Practical',cfg.title],['Course',site()],['Conclusion',panel.querySelector('[data-reflection]').value],['Record set','Record','Field','Value']];
   for (const entry of entries) for (const key of entry.keys.filter(recordField)) {
    const value = entry.state[key];
    const records = Array.isArray(value) ? value : value && typeof value === 'object' ? Object.entries(value).map(([name,record])=>({name,record})) : [];
    records.forEach((record,i) => Object.entries(record && typeof record === 'object' ? record : {value:record}).forEach(([field,v]) => lines.push([entry.id+':'+key,i+1,field,typeof v === 'object' ? JSON.stringify(v) : v])));
   }
   const cell = v => '"' + String(v ?? '').replace(/^[=+@\t\r]/,"'" + String(v ?? '')[0]).replace(/"/g,'""') + '"';
   const blob = new Blob(['\uFEFF'+lines.map(r=>r.map(cell).join(',')).join('\r\n')], {type:'text/csv;charset=utf-8'});
   const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href=url; a.download=`${site()}-${cfg.id}-results.csv`; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  paint();
 }
 function summary(data) {
  const reviews = Object.entries(data || {}).filter(([k])=>k.startsWith(prefix()+'review-')).map(([key,v])=>({id:key.slice((prefix()+'review-').length),...v}));
  return {total:reviews.length, complete:reviews.filter(x=>x.complete).length, reviews};
 }
 document.addEventListener('click',()=>queueMicrotask(flush));
 document.addEventListener('change',()=>queueMicrotask(flush));
 window.addEventListener('pagehide',flush);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)flush();});
 setInterval(flush,1500);
 document.addEventListener('DOMContentLoaded',()=>{
  if (typeof LAB==='undefined') return;
  for (const p of LAB.list.filter(p=>!p.unit && !p.group?.startsWith('papers:'))) {
   const sec=document.getElementById('lab-'+p.id); if(sec) attach({id:p.id,title:p.name},sec);
  }
 });
 const completed=id=>!!read(prefix()+'review-'+id)?.complete;
 return {observe,attach,flush,summary,hasEvidence,completed};
})();
