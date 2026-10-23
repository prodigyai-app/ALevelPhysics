import test from 'node:test';
import assert from 'node:assert/strict';
import {londonDate,statusOf,validDate,pageURL,parseNumber,deterministicMark,validateMark,providerConfig,requiredQuestions,sanitiseAnswers,summaryOf,answerText} from '../client/assessment-core.js';

test('date-only deadlines cover the whole UK calendar day, including DST',()=>{
 assert.equal(londonDate(new Date('2026-06-01T23:15:00Z')),'2026-06-02');
 const a={due_date:'2026-06-01'};assert.equal(statusOf(a,null,new Date('2026-06-01T22:59:59Z')),'Not started');assert.equal(statusOf(a,null,new Date('2026-06-01T23:00:00Z')),'Overdue');
 assert.equal(statusOf(a,{submitted_at:'x'},new Date('2026-06-03')),'Completed');assert.equal(validDate('2026-02-29'),false);assert.equal(validDate('2028-02-29'),true);
});
test('question URLs retain Psychology choices, essay and tier without accepting external URLs',()=>{
 const u=new URL(pageURL({id:'abc',site:'alevel-psychology',page_id:'paper3',context:{option1:'gender',option2:'stress',option3:'addiction',essay:'memory',tier:'h'}}));
 assert.equal(u.hostname,'prodigyai-app.github.io');assert.equal(u.searchParams.get('option2'),'stress');assert.equal(u.hash,'#paper3');assert.throws(()=>pageURL({site:'evil'}));
});
test('numeric marking accepts safe equivalent expressions and rejects executable input',()=>{
 assert.equal(parseNumber('3.2 × 10^-3'),.0032);assert.equal(parseNumber('sqrt(9)/2'),1.5);assert.equal(parseNumber('-2^2'),-4);assert.equal(parseNumber('2^-3'),.125);assert.equal(parseNumber('1/2'),.5);
 for(const s of ['globalThis.secret','fetch("https://evil")','1; process.exit()','1/0','1e999','(' .repeat(100)])assert.ok(Number.isNaN(parseNumber(s)),s);
 const q={kind:'written',m:1,numeric:{a:2,tol:.01}};assert.equal(deterministicMark(q,{f:'4/2'}).score,1);
 assert.equal(deterministicMark({...q,m:4},{f:'2'}).score,null,'a matching number never awards all method marks');
});
test('provider is disabled without a server key; explicit provider and model choices are respected',()=>{
 const env=o=>k=>o[k];assert.equal(providerConfig(env({})),null);assert.equal(providerConfig(env({OPENAI_API_KEY:'fake'})).model,'gpt-4.1-mini');
 assert.equal(providerConfig(env({MARKING_PROVIDER:'anthropic',OPENAI_API_KEY:'fake',OPENAI_MODEL:'test'})),null);
 assert.equal(providerConfig(env({ANTHROPIC_API_KEY:'fake',ANTHROPIC_MODEL:'test'})).provider,'anthropic');
});
test('point marking requires grounded evidence, unique criteria and correct totals',()=>{
 const q={m:2,scheme:['point A','point B'],levels:[]},r={score:1,level:'',feedback:'One point supported',next_step:'Develop B',needs_review:false,criteria:[{index:0,awarded:true,evidence:'point A'},{index:1,awarded:false,evidence:''}]};
 assert.equal(validateMark(r,q,'My point A is explained.').provisional,true);
 assert.throws(()=>validateMark({...r,score:2},q,'point A'));
 assert.throws(()=>validateMark({...r,criteria:[r.criteria[0],r.criteria[0]]},q,'point A'));
 assert.throws(()=>validateMark(r,q,'I did not include the evidence.'));
 assert.throws(()=>validateMark({...r,score:99},q,'point A'));
 const essay={m:16,levels:[['Level 4','Developed']],scheme:[]};assert.equal(validateMark({...r,score:12,criteria:[]},essay,'An essay').score,12);assert.throws(()=>validateMark(r,essay,'point A'));
});
test('tier and essay selection determine required questions; unknown answer keys are dropped',()=>{
 const page={questions:[{id:'a',m:1},{id:'b',m:2,higher:true},{id:'c',m:16,essay:'memory'}]};
 assert.deepEqual(requiredQuestions(page,{tier:'f',essay:'social'}).map(q=>q.id),['a']);assert.equal(Object.keys(sanitiseAnswers(page.questions,{secret:{w:'injected'},a:{w:'ok',self_score:999}})).length,3);
 assert.equal(sanitiseAnswers(page.questions,{a:{self_score:999}}).a.self_score,null);
});
test('teacher review supersedes suggested scores and source counts remain distinct',()=>{
 const qs=[{id:'a',m:4},{id:'b',m:2},{id:'c',m:1}],s=summaryOf(qs,{b:{self_score:1}},{a:{score:2,source:'ai'},c:{score:1,source:'automatic'}},{a:{score:3,source:'teacher'}});
 assert.equal(s.score,5);assert.equal(s.reviewed,1);assert.equal(s.ai,0);assert.equal(s.self,1);assert.equal(s.automatic,1);
});

 test('stepwise Maths working takes precedence over legacy text, preserves line breaks and supports clearing',()=>{assert.equal(answerText({lines:['x²−4=0','x=±2'],w:'old answer',f:'2'}),'x²−4=0\nx=±2\nFinal answer: 2');assert.equal(answerText({lines:[],w:'stale answer'}),'');assert.equal(answerText({w:'A paragraph'}),'A paragraph');});
