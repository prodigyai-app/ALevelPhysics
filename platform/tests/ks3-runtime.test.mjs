import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
const require=createRequire(import.meta.url),{load}=require('../scripts/build-catalogs.cjs');
for(const [repo,site,counts] of [['KS3Science','ks3-science',[14,14,12]],['KS3Maths','ks3-maths',[16,17,27]]]){
 test(repo+' initialises all years, original assessments, accounts and models',async()=>{
  const {w,d,errors}=await load(repo);try{
   assert.deepEqual(errors,[]);assert.equal(w.ALP_SITE,site);assert.equal(w.KS_COURSE.units.length,counts.reduce((a,b)=>a+b));
   assert.deepEqual([7,8,9].map(y=>w.KS_COURSE.units.filter(u=>u.year===y).length),counts);
   assert.equal(d.querySelector('[aria-label="Choose a course"]'),null);assert.ok(d.querySelector('.simple-tools'));
   assert.equal(w.KS_PAPERS.length,repo==='KS3Maths'?9:6);assert.equal(new Set(w.LAB.list.map(p=>p.id)).size,w.LAB.list.length);
   for(const l of w.KS_COURSE.lessons){assert.equal(l.notes.length,2,l.id);assert.ok(l.notes.every(n=>typeof n==='string'&&n.trim().length>0),l.id);assert.ok(w.KSDecks.slides(l).length>=4,l.id);assert.ok(l.worked.length>25,l.id);const parts=w.EXAM.allParts('xm-'+l.id);assert.equal(parts.length,1,l.id);assert.equal(parts[0].m,l.scheme.length);assert.ok(l.mistake);assert.ok(d.getElementById('lab-'+l.id));}
   for(const p of w.KS_PAPERS){assert.equal(p.questions.length,10);assert.equal(p.questions.reduce((n,q)=>n+q.parts.reduce((n,a)=>n+a.m,0),0),30);assert.equal(w.EXAM.allParts('xm-'+p.id).length,10);}
   assert.ok(d.querySelectorAll('#lab-interactive-lab .ks-model').length>=9);
   assert.ok([...d.querySelectorAll('[data-motion=play]')].every(b=>b.textContent==='Play'));
   assert.equal(d.querySelector('header h1').textContent,'KS3 '+(repo==='KS3Science'?'Science':'Maths'));
   assert.ok(!/AQA|Physical Education|sport psychology/.test(d.querySelector('header').textContent));
  }finally{w.close();}
 });
 test(repo+' year filter preserves cross-year routes, tools and saved working',async()=>{
  const {w,d,errors}=await load(repo);try{
   assert.deepEqual(errors,[]);d.querySelector('[data-year="9"]').click();assert.equal(d.querySelector('[data-year="9"]').getAttribute('aria-pressed'),'true');
   const cards=[...d.querySelectorAll('#hub button.unit[data-go]')];assert.equal(cards.filter(b=>!b.hidden&&/u-y7-/.test(b.dataset.go)).length,0);assert.equal(cards.filter(b=>!b.hidden&&/u-y9-/.test(b.dataset.go)).length,repo==='KS3Maths'?19:counts[2]);
   const l=w.KS_COURSE.lessons.find(l=>l.year===7);w.location.hash=l.id;w.dispatchEvent(new w.HashChangeEvent('hashchange'));await new Promise(r=>setTimeout(r,0));assert.equal(d.getElementById('lab-'+l.id).hidden,false);
   const answer=d.querySelector('#lab-'+l.id+' [data-wl]');assert.ok(answer);assert.equal(answer.tagName,'TEXTAREA');answer.value='First step\n\nExplanation with units.';answer.dispatchEvent(new w.Event('input',{bubbles:true}));assert.match(w.localStorage.getItem('learn-'+site+'-motion-exam'),/Explanation with units/);assert.equal(w.localStorage.getItem('learn-alevel-pe-motion-exam'),null);
   assert.equal(w.EXAM.pscore(w.EXAM.allParts('xm-'+l.id)[0]),null);
   assert.equal(d.querySelector('#topic-query'),null);assert.ok(d.querySelector('.simple-tools-panel a[href="#u-models"]'));
   const p=w.KS_PAPERS[0],timer=d.querySelector('#ks-timer-'+p.id);timer.querySelector('[data-timer=toggle]').click();assert.match(timer.textContent,/running/);timer.querySelector('[data-timer=toggle]').click();assert.match(timer.textContent,/paused/);timer.querySelector('[data-timer=reset]').click();assert.equal(timer.querySelector('output').textContent,'35:00');
  }finally{w.close();}
 });
}
test('KS3 teaching models retain correct quantities at range limits',()=>{
 const {values:v,render,defs}=require('../../../KS3Science/models.js');assert.equal(v.circuit(12,6).current,2);assert.equal(v.spring(200,.03).force,6);assert.equal(v.lever(12,.5).balanceForce,10);assert.equal(v.wave(4,1.5).speed,6);assert.equal(v.genetics('Aa','Aa').recessive,.25);assert.equal(v.ratio(5,3,96).first,60);assert.equal(v.sequence(5,3,10),53);assert.equal(v.triangle(6,8),10);assert.equal(v.area(12,7),42);assert.equal(v.photosynthesis(9,3),3);
 for(const [id,d]of Object.entries(defs))for(const mode of [2,3,5]){const p=Object.fromEntries(d.params.map(a=>[a[0],a[mode]]));p.clip='test';const out=render(id,p,1);assert.ok(out.caption.length>10,id);assert.doesNotMatch(out.svg,/NaN|undefined|Infinity/,id+' '+mode);assert.match(out.svg,/viewBox/,id);}
});
test('KS3 graph plotter accepts familiar maths notation and rejects code',()=>{
 const G=require('../../../KS3Maths/graph-core.js');assert.equal(G.compile('x²+2x+1')(-3),4);assert.ok(Number.isNaN(G.compile('1/x')(0)));assert.throws(()=>G.compile('alert(1)'));assert.throws(()=>G.compile('x;document.cookie'));
});
