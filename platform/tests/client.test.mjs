import test from 'node:test';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';import {readFileSync} from 'node:fs';import * as core from '../client/assessment-core.js';
const tick=()=>new Promise(r=>setTimeout(r,15));
const id='66666666-6666-4666-8666-666666666666',studentId='33333333-3333-4333-8333-333333333333';
const q={id:'part',kind:'written',m:2,prompt:'Explain point A and B',scheme:['point A','point B'],levels:[],numeric:null};
async function setup({role='student',assignment=false,ai=false,failure=false,tierRedirect=false,choice=false,steps=false}={}){
 const question=choice?{...q,kind:'choice',options:['A','B'],correct:1}:q;
 const w=new JSDOM('<!doctype html><header class="top"><div class="top-actions"></div></header><section class="lab" id="lab-lesson"><div class="lab-head"><h2>Lesson</h2></div><div id="card" class="lcard exam"></div></section>',{url:'https://prodigyai-app.github.io/ALevelPsychology/'+(assignment?'?assignment='+id:'')+'#lesson',runScripts:'outside-only'}).window,d=w.document,calls=[];
 const saved={part:steps?{lines:['Independent line 1','Independent line 2'],done:false}:{w:'Independent answer',done:false}},storage={};w.CSS={escape:s=>String(s)};w.structuredClone=structuredClone;w.__core=core;w.fetch=async(url,init)=>{
  if(String(url).includes('assessment-catalog'))return Response.json({site:'alevel-psychology',pages:{lesson:{id:'lesson',title:'Lesson',questions:[question],type:'lesson'}}});
  const b=JSON.parse(init.body);calls.push(b);let result;
  if(b.action==='status')result={available:true,ai_available:ai};
  else if(b.action==='classes')result={classes:[{id:'55555555-5555-4555-8555-555555555555',name:'Test class',site:'alevel-psychology'}]};
  else if(b.action==='roster')result={students:[{id:studentId,username:'pupil',display_name:'Test Pupil'}]};
  else if(b.action==='detail')result={assignment:{id,site:'alevel-psychology',page_id:'lesson',title:'Lesson',due_date:'2026-11-01',instructions:'Complete carefully',context:tierRedirect?{tier:'f'}:{}},questions:[question],submission:null};
  else if(b.action==='list')result={assignments:[]};
  else if(b.action==='mark')result=failure?{fallback:true,reason:'AI unavailable. Use self-marking.'}:{result:{score:1,max:2,source:'ai',provisional:true,needs_review:false,feedback:'One point explained',next_step:'Explain B',criteria:[{index:0,awarded:true,evidence:'point A'},{index:1,awarded:false,evidence:''}]}};
  else if(b.action==='create')result={assignment:{id}};
  else if(b.action==='save'||b.action==='submit')result={submission:{answers:b.answers,read_confirmed:b.read_confirmed,updated_at:new Date().toISOString(),submitted_at:b.action==='submit'?'2026-10-22T12:00:00Z':null}};
  else throw Error('Unexpected action '+b.action);return Response.json(result);
 };
 w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};
 w.ALP_SITE='alevel-psychology';w.ALP_CONFIG={url:'https://test.supabase.co',key:'public'};w.ALP_ACCOUNTS={user:{id:studentId},profile:{role},sb:{auth:{getSession:async()=>({data:{session:{access_token:'fake-test-token'}}})}},openSignIn:()=>{}};
 w.LAB={list:[{id:'lesson'}],store:{get:k=>storage[k],set:(k,v)=>{storage[k]=v;}}};
 const render=()=>{d.getElementById('card').innerHTML=`<div class="xp" data-p="part"><div class="xbody">${choice?'<label><input type="radio" name="part" value="0">A</label><label><input type="radio" name="part" value="1">B</label>':steps?(saved.part.lines||(saved.part.w?saved.part.w.split('\n'):[''])).map(s=>`<input data-wl="part" value="${core.esc(s)}">`).join(''):`<textarea data-xw="part">${core.esc(saved.part.w||'')}</textarea>`}<button data-xms="part">Mark it: show mark scheme</button></div></div>`;};render();
 w.EXAM={saved,PARTS:{part:{...question,...(choice?{opts:question.options}:{}),ms:[['1','point A'],['2','point B']],card:'card'}},save(){},refresh(){},rerender:render,pscore:p=>(saved[p.id].t||[]).filter(Boolean).length};
 if(tierRedirect){w.TIER='h';w.location.hash='u-papers';const switcher=d.createElement('div');switcher.className='tier-switch';switcher.innerHTML='<button data-tier="f">Foundation</button>';switcher.querySelector('button').onclick=()=>w.TIER='f';d.querySelector('header').append(switcher);}
 // The real framework saves before the shared client handles this input.
 d.addEventListener('input',e=>{if(e.target.dataset.xw)saved[e.target.dataset.xw].w=e.target.value;if(e.target.dataset.wl){saved[e.target.dataset.wl].lines=[...d.querySelectorAll('[data-wl]')].map(i=>i.value);delete saved[e.target.dataset.wl].w;}});
 const source=readFileSync(new URL('../client/assignments.js',import.meta.url),'utf8').replace(/^import[^\n]+\n/,'const {SITES,clone,esc,londonDate,statusOf,pageURL,contextForPage,requiredQuestions,answered,answerText,summaryOf}=window.__core;\n');w.eval(source);await tick();await tick();
 return {w,d,calls,saved,storage,close:()=>w.close()};
}
test('teacher assigns the current lesson with a date picker and class/individual audience',async()=>{
 const f=await setup({role:'teacher'});try{
  [...f.d.querySelectorAll('button')].find(b=>b.textContent==='Assign this lesson or paper').click();await tick();await tick();
  const form=f.d.querySelector('[data-create]');assert.ok(form);assert.equal(form.elements.due_date.type,'date');assert.equal(form.querySelector('[type=time]'),null);assert.equal(form.elements.page_id.value,'lesson');
  form.elements.audience.value='students';form.elements.audience.dispatchEvent(new f.w.Event('change'));assert.equal(form.querySelector('[data-students]').hidden,false);
  form.elements.students.options[0].selected=true;form.elements.due_date.value='2026-11-01';form.dispatchEvent(new f.w.Event('submit',{bubbles:true,cancelable:true}));await tick();
  const create=f.calls.find(c=>c.action==='create');assert.deepEqual(create.recipient_ids,[studentId]);assert.equal(create.due_date,'2026-11-01');
 }finally{f.close();}
});
test('assignment answers are isolated from independent practice, required before submission and locked afterwards',async()=>{
 const f=await setup({assignment:true});try{
  assert.equal(f.saved.part.w,'','new assignment starts with separate answers');
  f.d.querySelector('[data-submit-assignment]').click();await tick();assert.ok(!f.calls.some(c=>c.action==='submit'));
  const field=f.d.querySelector('[data-xw]');field.value='My assignment answer';field.dispatchEvent(new f.w.Event('input',{bubbles:true}));f.d.querySelector('[data-read-confirmed]').checked=true;
  f.d.querySelector('[data-submit-assignment]').click();await tick();await tick();assert.equal(f.calls.find(c=>c.action==='submit').answers.part.w,'My assignment answer');assert.equal(f.d.querySelector('[data-xw]').disabled,true);
  f.w.location.hash='other';await tick();assert.equal(f.saved.part.w,'Independent answer','leaving assignment restores independent practice');
 }finally{f.close();}
});
test('AI is available in independent practice and editing invalidates an accepted suggested mark',async()=>{
 const f=await setup({ai:true});try{
  const field=f.d.querySelector('[data-xw]');field.value='point A';field.dispatchEvent(new f.w.Event('input',{bubbles:true}));f.d.querySelector('[data-ai-mark]').click();await tick();assert.match(f.d.querySelector('[data-ai-result]').textContent,/AI-suggested mark: 1\/2/);
  assert.equal(f.calls.find(c=>c.action==='mark').assignment_id,undefined);f.d.querySelector('[data-use-ai]').click();await tick();assert.equal(f.saved.part.source,'ai-suggested');
  const changed=f.d.querySelector('[data-xw]');changed.value='Changed answer';changed.dispatchEvent(new f.w.Event('input',{bubbles:true}));assert.equal(f.saved.part.done,false);assert.equal(f.saved.part.source,undefined);
 }finally{f.close();}
});
test('no key or provider failure preserves the original self-mark button',async()=>{
 for(const opts of [{ai:false},{ai:true,failure:true}]){const f=await setup(opts);try{assert.ok(f.d.querySelector('[data-xms]'));if(opts.ai){f.d.querySelector('[data-ai-mark]').click();await tick();assert.match(f.d.querySelector('[data-ai-result]').textContent,/self-marking/);}else assert.equal(f.d.querySelector('[data-ai-mark]'),null);}finally{f.close();}}
});
test('an assignment restores its tier and destination after the course redirects a hidden Foundation paper',async()=>{
 const f=await setup({assignment:true,tierRedirect:true});try{assert.equal(f.w.TIER,'f');assert.equal(f.w.location.hash,'#lesson');assert.ok(f.d.querySelector('[data-submit-assignment]'));}finally{f.close();}
});
test('selected MCQ responses are submitted even before the existing Check button is pressed',async()=>{
 const f=await setup({assignment:true,choice:true});try{f.d.querySelector('input[name=part][value="1"]').checked=true;f.d.querySelector('[data-read-confirmed]').checked=true;f.d.querySelector('[data-submit-assignment]').click();await tick();assert.equal(f.calls.find(c=>c.action==='submit').answers.part.c,1);}finally{f.close();}
});
test('leaving an assignment flushes the latest draft before restoring independent answers',async()=>{
 const f=await setup({assignment:true});try{const field=f.d.querySelector('[data-xw]');field.value='Draft before moving away';field.dispatchEvent(new f.w.Event('input',{bubbles:true}));f.w.location.hash='other';await tick();await tick();assert.equal(f.calls.filter(c=>c.action==='save').at(-1).answers.part.w,'Draft before moving away');assert.equal(f.saved.part.w,'Independent answer');}finally{f.close();}
});


test('stepwise Maths work is submitted in full, locked and kept separate from independent answers',async()=>{
 const f=await setup({assignment:true,steps:true});try{
  const first=f.d.querySelector('[data-wl]');first.value='point A';const second=f.d.createElement('input');second.dataset.wl='part';second.value='point B';first.after(second);second.dispatchEvent(new f.w.Event('input',{bubbles:true}));f.d.querySelector('[data-read-confirmed]').checked=true;f.d.querySelector('[data-submit-assignment]').click();await tick();await tick();
  assert.equal(f.calls.find(c=>c.action==='submit').answers.part.w,'point A\npoint B');assert.ok([...f.d.querySelectorAll('[data-wl]')].every(i=>i.disabled));f.w.location.hash='other';await tick();assert.deepEqual(f.saved.part.lines,['Independent line 1','Independent line 2']);
 }finally{f.close();}
});

test('AI feedback reads every Maths working line and editing a line invalidates an accepted mark',async()=>{
 const f=await setup({ai:true,steps:true});try{
  const fields=f.d.querySelectorAll('[data-wl]');fields[0].value='point A';fields[1].value='point B';fields[1].dispatchEvent(new f.w.Event('input',{bubbles:true}));f.d.querySelector('[data-ai-mark]').click();await tick();assert.equal(f.calls.find(c=>c.action==='mark').answer,'point A\npoint B');f.d.querySelector('[data-use-ai]').click();await tick();assert.equal(f.saved.part.source,'ai-suggested');const changed=f.d.querySelectorAll('[data-wl]')[1];changed.value='Different reasoning';changed.dispatchEvent(new f.w.Event('input',{bubbles:true}));assert.equal(f.saved.part.done,false);assert.equal(f.saved.part.source,undefined);
 }finally{f.close();}
});
