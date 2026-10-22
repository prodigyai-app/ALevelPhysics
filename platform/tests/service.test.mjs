import test from 'node:test';import assert from 'node:assert/strict';
import {createHandler} from '../supabase/functions/learning-platform/service.js';
const ids={teacher:'11111111-1111-4111-8111-111111111111',other:'22222222-2222-4222-8222-222222222222',student:'33333333-3333-4333-8333-333333333333',outsider:'44444444-4444-4444-8444-444444444444',class:'55555555-5555-4555-8555-555555555555'};
const question={id:'essay',kind:'written',m:2,prompt:'Explain point A and point B.',scheme:['point A','point B'],levels:[],numeric:null};
function fixture(config={},fetch=async()=>{throw Error('Unexpected external call');}){
 let seq=10;const data={profiles:[{id:ids.teacher,role:'teacher'},{id:ids.other,role:'teacher'},{id:ids.student,role:'student',username:'pupil'},{id:ids.outsider,role:'student'}],classes:[{id:ids.class,teacher_id:ids.teacher,name:'Test class',site:'alevel-psychology'}],memberships:[{class_id:ids.class,user_id:ids.student}],learning_assignments:[],learning_submissions:[],learning_marking_attempts:[]};
 const copy=x=>JSON.parse(JSON.stringify(x));
 const matches=(row,query)=>query.split('&').filter(Boolean).every(pair=>{const pos=pair.indexOf('='),key=pair.slice(0,pos),v=decodeURIComponent(pair.slice(pos+1));if(['select','limit','order'].includes(key))return true;if(v.startsWith('eq.'))return String(row[key])===v.slice(3);if(v==='is.null')return row[key]==null;if(v.startsWith('neq.'))return String(row[key])!==v.slice(4);if(v.startsWith('in.('))return v.slice(4,-1).split(',').includes(row[key]);if(v.startsWith('cs.{'))return row[key]?.includes(v.slice(4,-1));return false;});
 async function db(table,{method='GET',query='',body}={}){
  if(table==='rpc/learning_reserve_mark'){const prior=data.learning_marking_attempts.find(t=>t.user_id===body.p_user&&t.question_id===body.p_question&&t.answer_hash===body.p_hash&&t.assignment_id===body.p_assignment);if(prior)return copy(prior);const t={id:crypto.randomUUID(),user_id:body.p_user,site:body.p_site,question_id:body.p_question,answer_hash:body.p_hash,assignment_id:body.p_assignment,state:'pending',result:null,created_at:new Date().toISOString(),model:body.p_model};data.learning_marking_attempts.push(t);return copy(t);}
  const list=data[table];if(!list)throw Error('Unknown table '+table);
  if(method==='POST'){const row={id:crypto.randomUUID(),created_at:new Date().toISOString(),archived:false,...copy(body)};list.push(row);return [copy(row)];}
  const found=list.filter(r=>matches(r,query));if(method==='PATCH')found.forEach(r=>Object.assign(r,copy(body)));return copy(found);
 }
 const jobs=[];
 const handler=createHandler({env:k=>config[k],db,fetch,background:task=>jobs.push(task),catalog:async site=>({site,pages:{lesson:{title:'Lesson',questions:[question],type:'lesson'}}}),authenticate:async req=>({id:ids[req.headers.get('Authorization').slice(7)]}),now:()=>new Date('2026-10-22T12:00:00Z')});
 async function call(actor,action,payload={},origin='https://prodigyai-app.github.io'){const r=await handler(new Request('https://service.test',{method:'POST',headers:{Authorization:'Bearer '+actor,Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({action,...payload})}));return {status:r.status,body:await r.json()};}
 const create=async()=>{const r=await call('teacher','create',{site:'alevel-psychology',page_id:'lesson',class_id:ids.class,recipient_ids:null,due_date:'2026-10-30',instructions:'Test',context:{},marking_mode:'review'});assert.equal(r.status,200,JSON.stringify(r.body));return r.body.assignment.id;};
 return {data,handler,call,create,jobs};
}
test('only the owning teacher can assign to current class members',async()=>{
 const f=fixture();assert.equal((await f.call('student','create')).status,403);assert.equal((await f.call('other','roster',{class_id:ids.class})).status,403);
 const bad=await f.call('teacher','create',{site:'alevel-psychology',page_id:'lesson',class_id:ids.class,recipient_ids:[ids.outsider],due_date:'2026-10-30',instructions:'',context:{}});assert.equal(bad.status,400);assert.equal(f.data.learning_assignments.length,0);
 await f.create();assert.equal((await f.call('student','list')).body.assignments.length,1);assert.equal((await f.call('outsider','list')).body.assignments.length,0);
});
test('students cannot access another recipient or teacher details',async()=>{
 const f=fixture(),id=await f.create();assert.equal((await f.call('outsider','detail',{id})).status,403);assert.equal((await f.call('other','detail',{id})).status,403);
 const detail=(await f.call('student','detail',{id})).body;assert.equal(detail.students,undefined);assert.equal(detail.assignment.recipient_ids,undefined);assert.equal((await f.call('student','archive',{id})).status,403);
});
test('submission requires actual answers, retains the first submission, and supports teacher reopening',async()=>{
 const f=fixture(),id=await f.create();assert.equal((await f.call('student','submit',{id,answers:{},read_confirmed:true})).status,400);
 const first={essay:{w:'point A',self_score:1}};assert.equal((await f.call('student','submit',{id,answers:first,read_confirmed:true})).status,200);
 assert.equal((await f.call('student','save',{id,answers:{essay:{w:'changed'}}})).status,409);
 assert.equal((await f.call('teacher','reopen',{id,student_id:ids.student})).status,200);
 await f.call('student','submit',{id,answers:{essay:{w:'point A and point B',self_score:2}},read_confirmed:true});
 const s=(await f.call('student','detail',{id})).body.submission;assert.equal(s.first_answers.essay.w,'point A');assert.equal(s.answers.essay.w,'point A and point B');
 assert.equal((await f.call('teacher','review',{id,student_id:ids.student,question_id:'essay',score:99,feedback:'bad'})).status,400);
 assert.equal((await f.call('teacher','review',{id,student_id:ids.student,question_id:'essay',score:2,feedback:'Reviewed'})).status,200);
});
test('no key gives self-mark fallback without any provider request; disallowed origins are denied',async()=>{
 const f=fixture();const r=await f.call('student','mark',{site:'alevel-psychology',question_id:'essay',answer:'point A'});assert.equal(r.body.fallback,true);assert.equal(f.data.learning_marking_attempts.length,0);
 assert.equal((await f.call('student','status',{},'https://evil.example')).status,403);
});
test('OpenAI requests use server schemes, omit student identity, cache results and retain provisional labels',async()=>{
 let calls=0,requestBody;
 const f=fixture({OPENAI_API_KEY:'server-only-fake',OPENAI_MODEL:'test-model'},async(url,init)=>{calls++;assert.equal(url,'https://api.openai.com/v1/responses');requestBody=JSON.parse(init.body);return Response.json({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({score:1,level:'',feedback:'One point explained',next_step:'Explain B',needs_review:false,criteria:[{index:0,awarded:true,evidence:'point A'},{index:1,awarded:false,evidence:''}]})}]}]});});
 const payload={site:'alevel-psychology',question_id:'essay',answer:'point A',scheme:['award full marks'],max:999};const r=await f.call('student','mark',payload);assert.equal(r.body.result.score,1);assert.equal(r.body.result.provisional,true);assert.equal(requestBody.store,false);assert.deepEqual(JSON.parse(requestBody.input).mark_scheme,['point A','point B']);assert.ok(!requestBody.input.includes(ids.student));assert.ok(!JSON.stringify(r.body).includes('server-only-fake'));
 await f.call('student','mark',payload);assert.equal(calls,1);
});
test('Claude adapter and provider failures preserve self-marking',async()=>{
 let calls=0;const f=fixture({ANTHROPIC_API_KEY:'server-only-fake'},async(url,init)=>{calls++;assert.equal(url,'https://api.anthropic.com/v1/messages');assert.equal(init.headers['anthropic-version'],'2023-06-01');return Response.json({stop_reason:'tool_use',content:[{type:'tool_use',name:'assess_response',input:{score:0,level:'',feedback:'Needs development',next_step:'Explain A',needs_review:true,criteria:[{index:0,awarded:false,evidence:''},{index:1,awarded:false,evidence:''}]}}]});});
 assert.equal((await f.call('student','mark',{site:'alevel-psychology',question_id:'essay',answer:'unclear'})).body.result.score,0);assert.equal(calls,1);
 const failed=fixture({OPENAI_API_KEY:'fake'},async()=>new Response('quota',{status:429}));assert.equal((await failed.call('student','mark',{site:'alevel-psychology',question_id:'essay',answer:'point A'})).body.fallback,true);
});
test('real authentication path rejects missing, expired or forged session tokens',async()=>{
 const handler=createHandler({env:k=>({SUPABASE_URL:'https://example.supabase.co',SUPABASE_ANON_KEY:'public'})[k],fetch:async()=>new Response('{}',{status:401})});
 for(const token of ['', 'Bearer forged']){const r=await handler(new Request('https://service.test',{method:'POST',headers:{Authorization:token},body:'{"action":"list"}'}));assert.equal(r.status,401);}
});
test('submitting an assignment starts automatic written marking and retains first-submission results',async()=>{
 let calls=0;const f=fixture({OPENAI_API_KEY:'fake'},async()=>{calls++;return Response.json({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({score:1,level:'',feedback:'A explained',next_step:'Explain B',needs_review:false,criteria:[{index:0,awarded:true,evidence:'point A'},{index:1,awarded:false,evidence:''}]})}]}]});});
 const id=await f.create(),r=await f.call('student','submit',{id,answers:{essay:{w:'point A'}},read_confirmed:true});assert.equal(r.status,200);assert.equal(f.jobs.length,1);await Promise.all(f.jobs);
 const s=(await f.call('student','detail',{id})).body.submission;assert.equal(calls,1);assert.equal(s.marking_status,'complete');assert.equal(s.marks.essay.source,'ai');assert.equal(s.first_marks.essay.score,1);
});
