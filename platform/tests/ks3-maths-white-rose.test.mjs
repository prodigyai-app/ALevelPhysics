import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{load,extract}=require('../scripts/build-catalogs.cjs');
const course=JSON.parse(readFileSync(new URL('../../../KS3Maths/course.json',import.meta.url),'utf8'));

test('department folders order Years 7 and 8; the combined GCSE scheme orders Year 9',()=>{
 const main=course.units.filter(u=>!u.extra);
 assert.match(course.alignment.scheme,/Department teaching order/);
 assert.deepEqual([7,8,9].map(y=>main.filter(u=>u.year===y).length),[16,14,19]);
 for(const year of [7,8,9])assert.deepEqual(main.filter(u=>u.year===year).map(u=>u.id),Array.from({length:year===7?16:year===8?14:19},(_,i)=>`y${year}-unit-${String(i+1).padStart(2,'0')}`));
 assert.deepEqual(main.filter(u=>u.year===9).map(u=>u.term),[...Array(4).fill('GCSE Unit 1'),...Array(4).fill('GCSE Unit 2'),...Array(3).fill('GCSE Unit 3'),...Array(2).fill('GCSE Unit 4'),...Array(3).fill('GCSE Unit 5'),...Array(3).fill('GCSE Unit 6')]);
 assert.equal(course.units.filter(u=>u.extra).length,11);
 assert.ok(course.units.filter(u=>u.id.includes('-wr-')).every(u=>u.extra));
 assert.deepEqual(course.units.find(u=>u.id==='y8-unit-03').skills,['notation','like','substitute','factorise','expand','double']);
 assert.deepEqual(course.units.find(u=>u.id==='y7-unit-16').skills,['angles','parallel','measure','shapes']);
 for(const u of course.units)assert.deepEqual([...u.assessment_skills].sort(),[...u.skills].sort());
 assert.ok(course.lessons.find(l=>l.id==='y7-unit-01-nth').extension);
 assert.ok(!course.lessons.find(l=>l.id==='y9-unit-13-trig').extension);
});

test('new yearly reviews sample the revised route without replacing the previous papers',()=>{
 const papers=JSON.parse(readFileSync(new URL('../../../KS3Maths/paper-bank.json',import.meta.url),'utf8'));
 assert.equal(papers.length,9);
 for(const y of [7,8,9]){
  assert.ok(papers.some(p=>p.id===`y${y}-paper-a`));assert.ok(papers.some(p=>p.id===`y${y}-paper-b`));
  const p=papers.find(p=>p.id===`y${y}-paper-c`);assert.equal(p.basis,'Version 3 route');assert.equal(p.marks,30);assert.equal(p.questions.length,10);
  for(const q of p.questions)assert.equal(q.parts[0].ms.length,q.parts[0].m);
 }
 const year9=papers.find(p=>p.id==='y9-paper-c');
 for(const topic of ['Maths and money','Constructions','Sets and probability','Transformations'])assert.ok(year9.coverage.includes(topic),topic);
 assert.doesNotMatch(papers.find(p=>p.id==='y7-paper-c').questions.map(q=>q.parts[0].q).join(' '),/nth.term|trigonometry/i);
});

test('all 1020 previously published question parts keep their exact IDs, choices, marks and schemes',()=>{
 const contract=JSON.parse(readFileSync(new URL('./fixtures/ks3-maths-pre-v3.json',import.meta.url),'utf8'));
 const catalog=JSON.parse(readFileSync(new URL('../../../KS3Maths/assessment-catalog.json',import.meta.url),'utf8'));
 let count=0;
 for(const [id,old]of Object.entries(contract)){
  const p=catalog.pages[id];assert.ok(p,id);
  const prefix=p.questions.slice(0,old.count);count+=prefix.length;
  assert.equal(createHash('sha256').update(JSON.stringify(prefix)).digest('hex'),old.sha256,id);
 }
 assert.equal(count,1020);
});

test('representations connect equal parts, place value, signed counters, compass work and coordinate transformations',async()=>{
 const {w,d,errors}=await load('KS3Maths');try{
  assert.deepEqual(errors,[]);
  assert.equal(w.LAB.list.find(p=>p.id==='y7-unit-01-nth').group,'y7-unit-01:extra');
  assert.equal(w.LAB.list.find(p=>p.id==='y7-unit-08-first-quadrant').group,'y7-unit-08:lessons');
  const types=w.KS3MathsDiagrams.types;
  for(const type of ['bar-model','double-number-line','algebra-tiles','zero-pairs','place-value-counters','fraction-area','frequency-tree','venn-diagram','compass-arcs','coordinate-transformation','cuboid-net'])assert.ok(types.includes(type),type);
  for(const key of new Set(course.lessons.map(l=>l.key))){const pictures=w.KS3MathsDiagrams.items(key);assert.ok(pictures.length,key);for(const p of pictures)assert.doesNotMatch(p.html,/NaN|Infinity|undefined/,key);}
  const picture=key=>w.KS3MathsDiagrams.items(key).at(-1).html;
  assert.match(picture('direct'),/1.5/);assert.match(picture('zero-pairs'),/2 − \(−1\) = 3/);
  assert.match(picture('sets'),/8 \+ 4 \+ 5 = 17/);assert.match(picture('nets-surface'),/Six connected rectangular faces/);
  const money=extract(w,d,w.LAB.list.find(p=>p.id==='y9-wr-money-money-budget'));assert.equal(money.questions.length,4);assert.equal(money.questions.find(q=>q.numeric)?.numeric.a,65);
  d.querySelector('[data-year="9"]').click();
  const visible=()=>[...d.querySelectorAll('#hub button.unit[data-go]')].filter(b=>!b.hidden&&/u-y9-/.test(b.dataset.go));
  assert.equal(visible().length,19);const toggle=d.querySelector('[data-show-extra]');toggle.checked=true;toggle.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(visible().length,27);
 }finally{w.close();}
});
