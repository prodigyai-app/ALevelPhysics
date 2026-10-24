import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{load,extract}=require('../scripts/build-catalogs.cjs');

test('all Maths lessons retain original answers and IDs while adding diagrams, short worked steps and retrieval',async()=>{
 const {w,d,errors}=await load('KS3Maths');try{
  assert.deepEqual(errors,[]);assert.equal(w.KS_COURSE.lessons.length,142);assert.equal(w.KS_COURSE.units.length,49);
  assert.equal(w.KS3MathsDiagrams.keys.length,74);assert.equal(w.LAB.list.length,199);
  for(const l of w.KS_COURSE.lessons){
   const s=d.getElementById('lab-'+l.id),slides=[...s.querySelectorAll('[data-slide]')];
   assert.ok(slides.length>=5,l.id);assert.equal(slides.filter(s=>!s.hidden).length,1,l.id);
   assert.ok(s.querySelector('.ks-maths-diagram'),l.id);assert.ok(s.querySelector('.ks-worked'),l.id);
   assert.ok(slides.every(slide=>slide.querySelectorAll('.ks-points>li,.ks-worked>li').length<=3),l.id);
   assert.equal(s.querySelector('[data-panel=practice]').hidden,true);assert.ok(l.cards.length>=2);
   const page=extract(w,d,w.LAB.list.find(p=>p.id===l.id));assert.equal(page.questions.length,4,l.id);
   const original=page.questions.find(q=>q.id==='xm-'+l.id+'q0a');assert.ok(original,l.id);
   if(l.answer!==null)assert.equal(original.numeric.a,l.answer,l.id);
   assert.equal(page.questions.filter(q=>q.kind==='choice').length,1,l.id);
  }
  for(const u of w.KS_COURSE.units){const p=w.LAB.list.find(p=>p.id===u.id+'-review');assert.ok(p,u.id);assert.ok(extract(w,d,p).questions.length>=6,u.id);}
  for(const diagram of d.querySelectorAll('.ks-maths-diagram'))assert.doesNotMatch(diagram.innerHTML,/NaN|Infinity|undefined/);
  assert.ok(d.getElementById('lab-graph-plotter'));assert.equal(d.querySelectorAll('#lab-interactive-lab .ks-model').length,12);
  assert.doesNotMatch(d.querySelector('[data-wl]').getAttribute('placeholder'),/sport|science/i);
 }finally{w.close();}
});

test('Maths swipe and keyboard navigation preserve model controls, word-card review and separate course state',async()=>{
 const {w,d,errors}=await load('KS3Maths');try{
  assert.deepEqual(errors,[]);const l=w.KS_COURSE.lessons[0],s=d.getElementById('lab-'+l.id),deck=s.querySelector('.ks-deck'),current=()=>+deck.querySelector('[data-slide]:not([hidden])').dataset.slide;
  deck.querySelector('[data-slide-action=next]').click();assert.equal(current(),1);
  deck.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(current(),2);
  deck.dispatchEvent(new w.MouseEvent('pointerdown',{clientX:260,clientY:100,bubbles:true}));deck.dispatchEvent(new w.MouseEvent('pointerup',{clientX:80,clientY:110,bubbles:true}));assert.equal(current(),3);
  const control=deck.querySelector('input[type=range]');control.dispatchEvent(new w.MouseEvent('pointerdown',{clientX:260,clientY:100,bubbles:true}));control.dispatchEvent(new w.MouseEvent('pointerup',{clientX:80,clientY:100,bubbles:true}));assert.equal(current(),3);
  s.querySelector('[data-mode=cards]').click();const card=s.querySelector('[data-card]');assert.equal(card.querySelector('.ks-definition').hidden,true);card.querySelector('[data-reveal-card]').click();assert.equal(card.querySelector('.ks-definition').hidden,false);card.querySelector('[data-rating=review]').click();assert.match(w.localStorage.getItem('learn-ks3-maths-card-state'),/review/);assert.equal(w.LEARN.done.has(l.id),false);
  assert.equal(w.localStorage.getItem('learn-ks3-science-card-state'),null);assert.equal(w.localStorage.getItem('learn-ks3-science-deck-state'),null);
  s.querySelector('[data-mode=learn]').click();deck.dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true}));deck.querySelector('[data-slide-action=next]').click();assert.equal(s.querySelector('[data-panel=practice]').hidden,false);
  const answer=s.querySelector('#xm-'+l.id+' [data-wl]');answer.value='27 and 32\nAdd 5 each time.';answer.dispatchEvent(new w.Event('input',{bubbles:true}));assert.match(w.localStorage.getItem('learn-ks3-maths-motion-exam'),/Add 5 each time/);
 }finally{w.close();}
});

test('diagram examples state the right relationships and graphs keep labelled scales',async()=>{
 const {w,d,errors}=await load('KS3Maths');try{
  assert.deepEqual(errors,[]);
  const diagram=key=>{const l=w.KS_COURSE.lessons.find(l=>l.key===key);return d.querySelector('#lab-'+l.id+' .ks-maths-diagram');};
  assert.match(diagram('fdp').textContent,/3\/8 = 0.375 = 37.5%/);
  assert.match(diagram('hcf').textContent,/HCF = 12/);
  assert.match(diagram('fraction-product').textContent,/2\/3 ÷ 4\/5[\s\S]*2\/3 × 5\/4[\s\S]*5\/6/);
  assert.match(diagram('histogram').textContent,/Frequency density/);assert.match(diagram('histogram').textContent,/0.6/);
  assert.match(diagram('trig').textContent,/30°/);assert.match(diagram('trig').textContent,/Hypotenuse 10/);
  assert.match(diagram('curves').textContent,/x² − 4/);assert.match(diagram('curves').textContent,/−2 and 2/);
  assert.match(diagram('inequality').textContent,/x ≥ −3/);
  assert.ok([...diagram('linear').querySelectorAll('svg text')].some(e=>e.textContent==='Up 4'));
 }finally{w.close();}
});
