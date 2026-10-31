import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
const source=readFileSync(new URL('../client/lesson-practicals.js',import.meta.url),'utf8');
const tabs=readFileSync(new URL('../../../GCSEPhysics/simple-layout.js',import.meta.url),'utf8');
function setup({embedded=false,ks3=false}={}){
 const w=new JSDOM(`<!doctype html><head></head><body><div class="wrap"><header class="top"><div class="brand"><h1>Science</h1><p>Course</p></div></header><div id="hub"><div id="hub-cards"></div></div><section id="lab-en7" class="lab"><div class="lab-head"><h2>Insulation lesson</h2></div><div class="lsec">${ks3?'<div data-learning="en7"><nav class="ks-modes"><button data-mode="learn">Learn</button></nav><section data-panel="learn">Slides</section></div>':'<div class="lcard">Learn content</div><div class="lcard sim" id="existing-model">Other model</div>'}</div></section><section class="lab" id="lab-insulation" hidden><div class="lab-head"><h2>Thermal insulation</h2></div><button id="apparatus">Start experiment</button><div id="readings">Saved readings</div></section></div></body>`,{url:'https://physicsgcse.prodigyai.uk/?assignment=private-id'+(embedded?'&embeddedPractical=insulation#insulation':'#en7'),runScripts:'outside-only'}).window;
 Object.defineProperty(w.document,'readyState',{value:'complete',configurable:true});
 const queue=[];w.requestAnimationFrame=fn=>{queue.push(fn);return queue.length;};
 w.ALP_SITE=ks3?'ks3-science':'gcse-physics';w.HUB_UNITS=[];
 w.LAB={list:[{id:'en7',name:'Insulation lesson',unit:'energy',group:'energy:a'},{id:'insulation',name:'Thermal insulation',group:'gcse'}],store:{get:()=>null}};
 w.LESSON_PRACTICALS={en7:['insulation']};
 return {w,d:w.document,flush:()=>{let count=0;while(queue.length){assert.ok(count++<30,'Animation loop');queue.shift()();}}};
}
test('required practical precedes the other model and loads only in Lab, without assignment context',()=>{
 const {w,d,flush}=setup();try{
  w.eval(source);w.eval(tabs);flush();
  const frame=d.querySelector('iframe'),panel=d.getElementById('lesson-en7-lab');
  assert.equal(panel.firstElementChild.className,'lcard lesson-practicals');
  assert.equal(panel.querySelector('#existing-model').parentElement,panel);
  assert.equal(frame.hasAttribute('src'),false);
  d.getElementById('lesson-en7-lab-tab').click();flush();
  const url=new URL(frame.src);assert.equal(url.searchParams.get('embeddedPractical'),'insulation');assert.equal(url.searchParams.has('assignment'),false);assert.equal(url.hash,'#insulation');
  const message=(origin,source)=>w.dispatchEvent(new w.MessageEvent('message',{origin,source,data:{type:'prodigy-practical-height',lab:'insulation',height:1234}}));
  message('https://other.example',frame.contentWindow);assert.equal(frame.style.height,'');
  message(w.location.origin,w);assert.equal(frame.style.height,'');
  message(w.location.origin,frame.contentWindow);assert.equal(frame.style.height,'1234px');
 }finally{w.close();}
});
test('KS3 gets a practical mode without moving its existing slides or practice',()=>{
 const {w,d,flush}=setup({ks3:true});try{w.eval(source);flush();
  assert.ok(d.querySelector('[data-mode=lab]'));assert.ok(d.querySelector('[data-panel=lab] .lesson-practicals'));
  assert.equal(d.querySelector('[data-panel=learn]').textContent,'Slides');assert.equal(d.querySelector('iframe').hasAttribute('src'),false);
 }finally{w.close();}
});
test('embedded document reuses the native controls and cannot recursively embed labs',()=>{
 const {w,d,flush}=setup({embedded:true});try{
  let clicks=0;const native=d.getElementById('apparatus');native.addEventListener('click',()=>clicks++);
  w.eval(source);flush();assert.equal(d.querySelectorAll('iframe').length,0);
  assert.ok(d.body.classList.contains('practical-embedded-document'));assert.ok(d.getElementById('lab-insulation').hasAttribute('data-practical-root'));
  assert.equal(d.getElementById('lab-insulation').hidden,false);assert.equal(d.getElementById('apparatus'),native);native.click();assert.equal(clicks,1);
 }finally{w.close();}
});
