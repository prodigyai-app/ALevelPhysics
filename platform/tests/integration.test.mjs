import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import vm from 'node:vm';import {SITES} from '../client/assessment-core.js';
const base=new URL('../../../',import.meta.url),read=(repo,file)=>readFileSync(new URL(repo+'/'+file,base),'utf8');
test('all courses include the same browser assets and account/assessment bridges',()=>{
 const hashes=new Map();for(const [,repo]of Object.values(SITES)){
  const html=read(repo,'index.html');assert.ok(html.includes('get profile(){ return profile; }'),repo);assert.ok(html.includes('prodigy-account-change'),repo);assert.ok(html.includes('data-platform-assignments'),repo);
  let tail=html.slice(html.lastIndexOf('<script src="assessment-core.js'));
  // Each course adds its presentation layer after the shared account tools.
  tail=tail.replace(/<link rel="stylesheet" href="simple-layout\.css\?[^"]*">\s*<script src="simple-layout\.js\?[^"]*"><\/script>/,'');
  assert.match(tail,/<script src="assessment-core\.js(?:\?[^\"]*)?"><\/script>\s*<script src="assignments\.js(?:\?[^\"]*)?"><\/script>\s*<\/body>/,repo);
  for(const file of ['assessment-core.js','assignments.js','assignments.css','course-links.js','simple-layout.js','simple-layout.css']){const text=read(repo,file);if(hashes.has(file))assert.equal(text,hashes.get(file),repo+' '+file);else hashes.set(file,text);if(file.endsWith('.js'))new vm.Script(text,{filename:repo+'/'+file});}
 }
});
test('published catalogues contain valid canonical questions and every course has papers',()=>{
 let count=0;for(const [site,[,repo]]of Object.entries(SITES)){const c=JSON.parse(read(repo,'assessment-catalog.json'));assert.equal(c.site,site);assert.ok(Object.values(c.pages).some(p=>p.type==='paper'),repo);
  for(const p of Object.values(c.pages)){const ids=new Set();for(const q of p.questions){assert.ok(q.prompt&&q.m>0,repo+' '+q.id);assert.ok(!ids.has(q.id),q.id);ids.add(q.id);if(q.kind==='choice')assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length,repo+' '+q.id);count++;}}
 }assert.ok(count>10000);
});
test('all Psychology Paper 3 combinations and fixed Foundation papers retain their context',()=>{
 const c=JSON.parse(read('ALevelPsychology','assessment-catalog.json')),p3=Object.values(c.pages).filter(p=>p.selection);assert.equal(p3.length,27);for(const p of p3)assert.equal(p.questions.reduce((sum,q)=>sum+q.m,0),96);
 const maths=JSON.parse(read('GCSEmaths','assessment-catalog.json'));for(const p of Object.values(maths.pages).filter(p=>/Foundation/i.test(p.title)))assert.equal(p.tier,'f');
});

test('all sixteen Sociology Paper 2 combinations retain the two selected topics and 80 marks',()=>{const c=JSON.parse(read('ALevelSociology','assessment-catalog.json')),papers=Object.values(c.pages).filter(p=>p.selection);assert.equal(papers.length,16);for(const p of papers){assert.deepEqual(Object.keys(p.selection),['1','2']);assert.equal(p.questions.reduce((sum,q)=>sum+q.m,0),80);}for(const p of Object.values(c.pages).filter(p=>p.id.startsWith('education-')))assert.ok(p.questions.find(q=>q.kind==='written').prompt.includes('Fictional example:'));});
