import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{load,extract}=require('../scripts/build-catalogs.cjs');
test('every Science lesson has short slides, self-test cards, four questions and preserved original question IDs',async()=>{
 const {w,d,errors}=await load('KS3Science');try{assert.deepEqual(errors,[]);assert.equal(w.KS3Labs.manifests.length,23);assert.equal(w.KS3Labs.loaded.size,0);
  for(const l of w.KS_COURSE.lessons){const s=d.getElementById('lab-'+l.id),slides=[...s.querySelectorAll('[data-slide]')];assert.ok(slides.length>=4,l.id);assert.equal(slides.filter(s=>!s.hidden).length,1);assert.ok(slides.every(s=>s.querySelectorAll('.ks-points>li').length<=3));assert.equal(s.querySelector('[data-panel=practice]').hidden,true);assert.equal(s.querySelectorAll('[data-card]').length,l.cards.length);assert.ok(l.cards.length>=2);const page=extract(w,d,w.LAB.list.find(p=>p.id===l.id));assert.equal(page.questions.length,4,l.id);assert.ok(page.questions.some(q=>q.id==='xm-'+l.id+'q0a'));assert.equal(page.questions.filter(q=>q.kind==='choice').length,1);}
  for(const u of w.KS_COURSE.units){const p=w.LAB.list.find(p=>p.id===u.id+'-review');assert.ok(p);assert.ok(extract(w,d,p).questions.length>=6);}
 }finally{w.close();}
});
test('deck buttons, keyboard and swipe work while model sliders keep their own gestures',async()=>{
 const {w,d,errors}=await load('KS3Science');try{assert.deepEqual(errors,[]);const l=w.KS_COURSE.lessons.find(l=>l.key==='particles'),s=d.getElementById('lab-'+l.id),deck=s.querySelector('.ks-deck'),current=()=>+deck.querySelector('[data-slide]:not([hidden])').dataset.slide;
  deck.querySelector('[data-slide-action=next]').click();assert.equal(current(),1);deck.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(current(),2);deck.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));assert.equal(current(),0);
  deck.dispatchEvent(new w.MouseEvent('pointerdown',{clientX:260,clientY:100,bubbles:true}));deck.dispatchEvent(new w.MouseEvent('pointerup',{clientX:80,clientY:110,bubbles:true}));assert.equal(current(),1);
  deck.dispatchEvent(new w.MouseEvent('pointerdown',{clientX:80,clientY:100,bubbles:true}));deck.dispatchEvent(new w.MouseEvent('pointerup',{clientX:90,clientY:260,bubbles:true}));assert.equal(current(),1);
  const control=deck.querySelector('input[type=range]');control.dispatchEvent(new w.MouseEvent('pointerdown',{clientX:260,clientY:100,bubbles:true}));control.dispatchEvent(new w.MouseEvent('pointerup',{clientX:80,clientY:100,bubbles:true}));assert.equal(current(),1);
  deck.dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true}));assert.equal(current(),deck.querySelectorAll('[data-slide]').length-1);deck.querySelector('[data-slide-action=next]').click();assert.equal(s.querySelector('[data-panel=practice]').hidden,false);assert.equal(s.querySelector('[data-panel=learn]').hidden,true);assert.match(w.localStorage.getItem('learn-ks3-science-deck-state'),/practice/);
 }finally{w.close();}
});
test('definition reveal and review ratings stay separate from assessed marks',async()=>{
 const {w,d,errors}=await load('KS3Science');try{assert.deepEqual(errors,[]);const l=w.KS_COURSE.lessons[0],s=d.getElementById('lab-'+l.id);s.querySelector('[data-mode=cards]').click();const card=s.querySelector('[data-card]'),answer=card.querySelector('.ks-definition');assert.equal(answer.hidden,true);card.querySelector('[data-reveal-card]').click();assert.equal(answer.hidden,false);card.querySelector('[data-rating=review]').click();assert.match(w.localStorage.getItem('learn-ks3-science-card-state'),/review/);assert.equal(w.LEARN.done.has(l.id),false);s.querySelector('[data-card-filter=review]').click();assert.equal(s.querySelectorAll('[data-card]:not([hidden])').length,1);card.querySelector('[data-rating=known]').click();assert.equal(s.querySelector('[data-card-empty]').hidden,false);assert.equal(w.EXAM.pscore(w.EXAM.allParts('xm-'+l.id)[0]),null);
 }finally{w.close();}
});
test('all selected GCSE apparatus mount lazily without duplicate pages or cross-course records',async()=>{
 const {w,d,errors}=await load('KS3Science');try{assert.deepEqual(errors,[]);const total=w.LAB.list.length;
  for(const m of w.KS3Labs.manifests){const s=d.getElementById('lab-'+m.id);s.hidden=false;w.KS3Labs.mount(m.id);assert.equal(d.querySelectorAll('#lab-'+m.id).length,1,m.id);assert.equal(w.LAB.list.length,total,m.id);assert.ok(d.querySelector('#lab-'+m.id+' .ks-lab-context'),m.id);assert.ok(d.querySelector('#lab-'+m.id+' .lab-notebook'),m.id);assert.equal(w.EXAM.allParts('xm-'+m.id).length,1,m.id);assert.ok(d.querySelector('#lab-'+m.id+' .stage svg,#lab-'+m.id+' .stage canvas'),m.id);d.getElementById('lab-'+m.id).hidden=true;}
  assert.equal(w.KS3Labs.loaded.size,23);assert.equal(w.KS3Labs.errors.size,0);w.LabNotebook.flush();assert.ok(Object.keys(w.localStorage).filter(k=>k.includes('-lab-data-')).every(k=>k.startsWith('learn-ks3-science-lab-')));assert.deepEqual(errors,[]);
 }finally{w.close();}
});
