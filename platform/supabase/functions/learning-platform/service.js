import { SITES, validDate, contextForPage, requiredQuestions, sanitiseAnswers, answered, answerText, deterministicMark, providerConfig, MARK_SCHEMA, MARK_INSTRUCTIONS, validateMark } from '../_shared/assessment-core.js';

const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const originList=new Set(['https://prodigyai-app.github.io',...['physicsalevel','chemistryalevel','biologyalevel','mathsalevel','furthermathsalevel','psychologyalevel','sociologyalevel','pealevel','physicsgcse','chemistrygcse','biologygcse','mathsgcse','combinedsciencegcse'].map(s=>'https://'+s+'.prodigyai.uk')]);
class ApiError extends Error {constructor(status,message){super(message);this.status=status;}}
const need=(condition,status,message)=>{if(!condition)throw new ApiError(status,message);};
const uuid=id=>{need(UUID.test(id||''),400,'Invalid assignment identifier');return id;};
const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
export function createHandler({env,fetch:request=globalThis.fetch,now=()=>new Date(),catalog:providedCatalog,db:providedDb,authenticate:providedAuth,background=task=>globalThis.EdgeRuntime?.waitUntil(task),diagnostic=event=>console.warn(JSON.stringify(event))}={}) {
 const cache=new Map();
 const base=env('SUPABASE_URL'),keys=JSON.parse(env('SUPABASE_SECRET_KEYS')||'{}'),admin=env('SUPABASE_SERVICE_ROLE_KEY')||keys.default;
 async function db(table,{method='GET',query='',body}={}){
  if(providedDb)return providedDb(table,{method,query,body});
  need(base&&admin,503,'The shared learning service is not configured yet');
  const headers={apikey:admin,'Content-Type':'application/json',Prefer:'return=representation'};
  if(admin.startsWith('eyJ'))headers.Authorization='Bearer '+admin;
  const r=await request(base+'/rest/v1/'+table+(query?'?'+query:''),{method,headers,body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
  if(!r.ok)throw new ApiError(503,'The shared learning database is not ready or could not save. Your local answers are unchanged.');
  return r.status===204?[]:r.json();
 }
 const rows=(table,query)=>db(table,{query});
 async function one(table,query){return (await rows(table,query+'&limit=1'))[0]||null;}
 async function auth(req){
  if(providedAuth)return providedAuth(req);
  const token=req.headers.get('Authorization')||'';need(/^Bearer [^\s]+$/.test(token),401,'Sign in to use assignments and AI marking');
  const publishable=env('SUPABASE_ANON_KEY')||JSON.parse(env('SUPABASE_PUBLISHABLE_KEYS')||'{}').default;
  need(base&&publishable,503,'The shared learning service is not configured yet');
  const r=await request(base+'/auth/v1/user',{headers:{apikey:publishable,Authorization:token},signal:AbortSignal.timeout(10000)});
  need(r.ok,401,'Your session has expired. Sign in again.');const u=await r.json();need(UUID.test(u.id||''),401,'Sign in again');return u;
 }
 async function catalog(site){
  need(SITES[site],400,'Unknown course');if(providedCatalog)return providedCatalog(site);
  const saved=cache.get(site);if(saved&&saved.until>Date.now())return saved.value;
  const r=await request('https://prodigyai-app.github.io/'+SITES[site][1]+'/assessment-catalog.json',{signal:AbortSignal.timeout(12000)});
  need(r.ok,503,'The question catalogue is not available yet. Use self-marking for now.');
  const text=await r.text();need(text.length<12000000,503,'Question catalogue is too large');const value=JSON.parse(text);
  need(value.site===site&&object(value.pages),503,'Question catalogue is invalid');cache.set(site,{value,until:Date.now()+300000});return value;
 }
 async function assignment(id,user,teacher=false){const a=await one('learning_assignments','id=eq.'+uuid(id));need(a&&!a.archived,404,'This assignment is not available');need(teacher?a.teacher_id===user.id:a.teacher_id===user.id||a.recipient_ids.includes(user.id),403,'This assignment is not assigned to you');return a;}
 async function ownClass(id,user){need(UUID.test(id||''),400,'Choose a class');const c=await one('classes','id=eq.'+id+'&teacher_id=eq.'+user.id);need(c,403,'Choose one of your own classes');return c;}
 async function roster(classId,user){await ownClass(classId,user);const m=await rows('memberships','class_id=eq.'+classId+'&select=user_id');const ids=m.map(x=>x.user_id).filter(x=>UUID.test(x));if(!ids.length)return [];
  return rows('profiles','id=in.('+ids.join(',')+')&role=neq.teacher&select=id,display_name,username&order=username');}
 const safeAssignment=a=>{const {recipient_ids,teacher_id,questions,...rest}=a;return {...rest,question_count:questions.length};};
 async function submission(a,id){return one('learning_submissions','assignment_id=eq.'+a.id+'&student_id=eq.'+id);}
 async function marksFor(a,studentId,answers){
  const result={};for(const q of a.questions){const mark=deterministicMark(q,answers[q.id]);if(mark)result[q.id]=mark;}
  const attempts=await rows('learning_marking_attempts','assignment_id=eq.'+a.id+'&user_id=eq.'+studentId+'&state=eq.complete');
  for(const t of attempts){const q=a.questions.find(q=>q.id===t.question_id);if(q&&t.answer_hash===await digest(answerText(answers[q.id])+'\n'+t.model+'\n'+JSON.stringify(q))&&t.result)result[q.id]=t.result;}
  return result;
 }
 async function callAI(config,q,text){
  const data={question:q.prompt,maximum_marks:q.m,mark_scheme:q.scheme,levels:q.levels,indicative_content:q.indicative||[],note:q.note||'',student_answer:text};
  let url,body,headers={'Content-Type':'application/json'};
  if(config.provider==='openai'){
   url='https://api.openai.com/v1/responses';headers.Authorization='Bearer '+config.key;
   body={model:config.model,store:false,instructions:MARK_INSTRUCTIONS+' '+EVIDENCE_INSTRUCTIONS,input:JSON.stringify(data),max_output_tokens:2400,text:{format:{type:'json_schema',name:'assessment',strict:true,schema:MARK_SCHEMA}}};
  }else{
   url='https://api.anthropic.com/v1/messages';headers['x-api-key']=config.key;headers['anthropic-version']='2023-06-01';
   body={model:config.model,max_tokens:2400,system:MARK_INSTRUCTIONS+' '+EVIDENCE_INSTRUCTIONS,messages:[{role:'user',content:JSON.stringify(data)}],tools:[{name:'assess_response',description:'Return the provisional assessment.',input_schema:MARK_SCHEMA}],tool_choice:{type:'tool',name:'assess_response'}};
  }
  const r=await request(url,{method:'POST',headers,body:JSON.stringify(body),signal:AbortSignal.timeout(35000)});
  if(!r.ok){const error=await r.json().catch(()=>null),allowed=new Set(['insufficient_quota','model_not_found','invalid_api_key','unsupported_parameter','invalid_json_schema','rate_limit_exceeded','permission_denied','invalid_value','invalid_request_error','billing_hard_limit_reached']);diagnostic({event:'marking_provider_rejected',provider:config.provider,status:r.status,code:allowed.has(error?.error?.code)?error.error.code:'unknown'});throw Error('Provider unavailable');}
  const response=await r.json();
  let result;if(config.provider==='openai'){
   if(response.status!=='completed'){diagnostic({event:'marking_response_incomplete',provider:config.provider,reason:['max_output_tokens','content_filter'].includes(response.incomplete_details?.reason)?response.incomplete_details.reason:'unknown'});throw Error('Incomplete marking response');}
   const output=(response.output||[]).flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('');result=JSON.parse(output);
  }else{if(response.stop_reason!=='tool_use')throw Error('Incomplete marking response');result=response.content?.find(c=>c.type==='tool_use'&&c.name==='assess_response')?.input;}
  if(Array.isArray(result?.criteria))result.criteria=result.criteria.map(c=>c?.awarded&&typeof c.evidence==='string'?{...c,evidence:groundEvidence(text,c.evidence)??c.evidence}:c);
  try{return validateMark(result,q,text);}catch(e){const reasons=new Set(['Invalid marking result','Invalid feedback','Incomplete criterion assessment','Invalid criterion','Unsupported marking evidence','Criterion total mismatch','Essays must be assessed holistically']);diagnostic({event:'marking_validation_failed',provider:config.provider,reason:reasons.has(e.message)?e.message:'unknown'});throw e;}
 }
 async function markQuestion(q,text,userId,site,assignmentId,config){
  if(q.visual)return {fallback:true,reason:'This question needs a diagram or graph to be checked. Use the self-mark scheme or ask your teacher.'};
  const hash=await digest(text+'\n'+config.model+'\n'+JSON.stringify(q));
  const ticket=await db('rpc/learning_reserve_mark',{method:'POST',body:{p_user:userId,p_site:site,p_question:q.id,p_hash:hash,p_assignment:assignmentId,p_provider:config.provider,p_model:config.model,p_user_limit:bounded(env('MARKING_DAILY_USER_LIMIT'),40,200),p_global_limit:bounded(env('MARKING_DAILY_GLOBAL_LIMIT'),1000,100000)}});
  if(ticket.limited)return {fallback:true,reason:'The daily AI marking allowance has been reached. Self-marking is still available.'};
  if(ticket.state==='complete')return {result:ticket.result};
  if(ticket.created_at&&Date.now()-Date.parse(ticket.created_at)>60000)return {fallback:true,reason:'AI marking was unavailable for this answer. Use self-marking.'};
  const claim=await db('learning_marking_attempts',{method:'PATCH',query:'id=eq.'+ticket.id+'&state=eq.pending&result=is.null',body:{result:{working:true}}});
  if(!claim.length)return {fallback:true,reason:'This answer is already being marked or could not be marked. Use self-marking or try again shortly.'};
  try{const result=await callAI(config,q,text);await db('learning_marking_attempts',{method:'PATCH',query:'id=eq.'+ticket.id,body:{state:'complete',result}});return {result};}
  catch{await db('learning_marking_attempts',{method:'PATCH',query:'id=eq.'+ticket.id,body:{state:'failed',result:null}});return {fallback:true,reason:'AI marking is unavailable for this answer. Your work is saved; use the existing self-mark scheme.'};}
 }
 async function markSubmission(a,s,config){
  const marks={...s.marks},deadline=Date.now()+110000;
  const remaining=a.questions.filter(q=>q.kind!=='choice'&&!(q.numeric&&q.m===1)&&marks[q.id]?.source!=='ai');let cursor=0,partial=false;
  try{
   async function worker(){while(cursor<remaining.length){const q=remaining[cursor++];if(Date.now()>deadline-36000){partial=true;continue;}try{const r=await markQuestion(q,answerText(s.answers[q.id]),s.student_id,a.site,a.id,config);if(r.result)marks[q.id]=r.result;else partial=true;}catch{partial=true;}}}
   await Promise.all([worker(),worker(),worker()]);
   const update={marks,marking_status:partial?'partial':'complete'};if(s.first_submitted_at===s.submitted_at)update.first_marks=marks;
   await db('learning_submissions',{method:'PATCH',query:'assignment_id=eq.'+a.id+'&student_id=eq.'+s.student_id+'&submitted_at=eq.'+encodeURIComponent(s.submitted_at),body:update});
  }catch{try{await db('learning_submissions',{method:'PATCH',query:'assignment_id=eq.'+a.id+'&student_id=eq.'+s.student_id+'&submitted_at=eq.'+encodeURIComponent(s.submitted_at),body:{marking_status:'partial'}});}catch{}}
 }
 async function handle(body,user,profile){
  const action=body.action;const isTeacher=profile.role==='teacher';
  if(action==='status'){await rows('learning_assignments','select=id&limit=0');const p=providerConfig(env);return {available:true,ai_available:!!p,provider:p?.provider||null,role:profile.role};}
  if(action==='classes'){need(isTeacher,403,'Teacher access is required');const classes=await rows('classes','teacher_id=eq.'+user.id+'&select=id,name,site&order=name');return {classes};}
  if(action==='roster'){need(isTeacher,403,'Teacher access is required');return {students:await roster(body.class_id,user)};}
  if(action==='list'){
   const query=isTeacher?'teacher_id=eq.'+user.id:'recipient_ids=cs.{'+user.id+'}';const list=await rows('learning_assignments',query+'&archived=eq.false&order=due_date.asc&limit=500');
   const out=[];for(const a of list){const s=await rows('learning_submissions','assignment_id=eq.'+a.id+(isTeacher?'':'&student_id=eq.'+user.id)+'&select=student_id,started_at,submitted_at,updated_at');out.push({...safeAssignment(a),...(isTeacher?{total:a.recipient_ids.length,completed:s.filter(x=>x.submitted_at).length}:{submission:s[0]||null})});}return {assignments:out};
  }
  if(action==='create'){
   need(isTeacher,403,'Teacher access is required');await ownClass(body.class_id,user);need(validDate(body.due_date),400,'Choose a valid due date');need(typeof body.instructions==='string'&&body.instructions.length<=2000,400,'Instructions must be at most 2000 characters');
   const cat=await catalog(body.site),page=Object.hasOwn(cat.pages,body.page_id)?cat.pages[body.page_id]:null;need(page,400,'Choose an available lesson or paper');let context;try{context=contextForPage(page,body.context||{});}catch(e){throw new ApiError(400,e.message);}const questions=requiredQuestions(page,context);
   const members=await roster(body.class_id,user),allowed=new Set(members.map(s=>s.id));const ids=body.recipient_ids===null?members.map(s=>s.id):[...new Set(body.recipient_ids||[])];need(ids.length>0&&ids.length<=500&&ids.every(id=>allowed.has(id)),400,'Choose current students from this class');
   const marking_mode=body.marking_mode==='automatic'?'automatic':'review';const result=await db('learning_assignments',{method:'POST',body:{teacher_id:user.id,class_id:body.class_id,site:body.site,page_id:body.page_id,title:page.title,due_date:body.due_date,instructions:body.instructions,context,questions,recipient_ids:ids,marking_mode}});return {assignment:safeAssignment(result[0])};
  }
  if(action==='detail'){
   const a=await assignment(body.id,user),teacher=a.teacher_id===user.id;
   if(teacher){const current=await roster(a.class_id,user),names=Object.fromEntries(current.map(x=>[x.id,x]));const submissions=await rows('learning_submissions','assignment_id=eq.'+a.id);return {assignment:safeAssignment(a),questions:a.questions,students:a.recipient_ids.map(id=>({...names[id],id,display_name:names[id]?.display_name||'Former class member',submission:submissions.find(s=>s.student_id===id)||null}))};}
   return {assignment:safeAssignment(a),questions:a.questions,submission:await submission(a,user.id)};
  }
  if(['save','submit'].includes(action)){
   const a=await assignment(body.id,user);need(a.recipient_ids.includes(user.id),403,'Only an assigned student can submit');let old=await submission(a,user.id);need(!old?.submitted_at,409,'This work is already submitted. Ask your teacher to reopen it.');need(object(body.answers),400,'Invalid answers');
   need(a.questions.every(q=>String(body.answers[q.id]?.w||'').length<=12000&&String(body.answers[q.id]?.f||'').length<=200),400,'An answer is too long. Keep written answers within 12,000 characters and final answers within 200 characters.');const answers=sanitiseAnswers(a.questions,body.answers),complete=body.read_confirmed===true;
   if(action==='submit'){need(a.questions.every(q=>answered(q,answers[q.id])),400,'Answer every required question before submitting');need(complete,400,'Confirm you have completed the lesson or paper');}
   const marks=action==='submit'?await marksFor(a,user.id,answers):old?.marks||{};const stamp=now().toISOString();
   const data={answers,read_confirmed:complete,marks,updated_at:stamp,revision:crypto.randomUUID(),teacher_reviews:{}};
   const config=action==='submit'?providerConfig(env):null;
   if(action==='submit'){data.submitted_at=stamp;data.marking_status=config?'pending':'self';if(!old?.first_submitted_at){data.first_submitted_at=stamp;data.first_answers=answers;data.first_marks=marks;}}
   let result;if(old) result=await db('learning_submissions',{method:'PATCH',query:'assignment_id=eq.'+a.id+'&student_id=eq.'+user.id+'&revision=eq.'+old.revision+'&submitted_at=is.null',body:data});
   else result=await db('learning_submissions',{method:'POST',body:{...data,assignment_id:a.id,student_id:user.id,started_at:stamp}});
   need(result.length,409,'This assignment changed on another device. Reload before continuing.');if(config)background(markSubmission(a,result[0],config));return {submission:result[0]};
  }
  if(['update','archive','reopen','review'].includes(action)){
   need(isTeacher,403,'Teacher access is required');const a=await assignment(body.id,user,true);
   if(action==='archive'){await db('learning_assignments',{method:'PATCH',query:'id=eq.'+a.id+'&teacher_id=eq.'+user.id,body:{archived:true}});return {archived:true};}
   if(action==='update'){need(validDate(body.due_date),400,'Choose a valid due date');need(typeof body.instructions==='string'&&body.instructions.length<=2000,400,'Instructions are too long');await db('learning_assignments',{method:'PATCH',query:'id=eq.'+a.id,body:{due_date:body.due_date,instructions:body.instructions}});return {updated:true};}
   need(a.recipient_ids.includes(body.student_id),403,'This student is not assigned this work');const s=await submission(a,body.student_id);need(s,404,'This student has not started');
   if(action==='reopen'){need(s.submitted_at,400,'This work is already open');const result=await db('learning_submissions',{method:'PATCH',query:'assignment_id=eq.'+a.id+'&student_id=eq.'+body.student_id+'&revision=eq.'+s.revision,body:{submitted_at:null,revision:crypto.randomUUID(),updated_at:now().toISOString()}});need(result.length,409,'This submission changed. Reload before reopening.');return {reopened:true};}
   need(s.submitted_at,400,'Wait until the student submits');const q=a.questions.find(q=>q.id===body.question_id);need(q,400,'Unknown question');need(Number.isInteger(body.score)&&body.score>=0&&body.score<=q.m,400,'Choose a mark within the available total');need(typeof body.feedback==='string'&&body.feedback.length<=2000,400,'Feedback is too long');
   const reviews={...s.teacher_reviews,[q.id]:{score:body.score,max:q.m,feedback:body.feedback,source:'teacher',reviewed_at:now().toISOString()}};const result=await db('learning_submissions',{method:'PATCH',query:'assignment_id=eq.'+a.id+'&student_id=eq.'+body.student_id+'&revision=eq.'+s.revision,body:{teacher_reviews:reviews,revision:crypto.randomUUID(),updated_at:now().toISOString()}});need(result.length,409,'This submission changed. Reload before saving the review.');return {reviewed:true};
  }
  if(action==='mark'){
   const config=providerConfig(env);if(!config)return {fallback:true,reason:'AI marking is not configured. Use the existing self-mark scheme.'};
   let q,assignmentId=null;
   if(body.assignment_id){const a=await assignment(body.assignment_id,user);need(a.recipient_ids.includes(user.id),403,'Only the assigned student can request this mark');need(!(await submission(a,user.id))?.submitted_at,409,'This assignment has already been submitted');need(a.site===body.site,400,'Wrong course');q=a.questions.find(q=>q.id===body.question_id);assignmentId=a.id;}
   else{const cat=await catalog(body.site);q=Object.values(cat.pages).flatMap(p=>p.questions).find(q=>q.id===body.question_id);}
   need(q&&q.kind!=='choice',400,'This answer uses the existing automatic checker');
   const text=String(body.answer||'').trim();need(text.length>0&&text.length<=12250,400,'Write an answer of at most 12,000 characters first');
   return markQuestion(q,text,user.id,body.site,assignmentId,config);
  }
  throw new ApiError(400,'Unknown learning action');
 }
 return async req=>{
  const origin=req.headers.get('Origin'),allowed=!origin||originList.has(origin)||(env('ALLOW_LOCAL_PREVIEW')==='true'&&/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin));
  const headers={'Content-Type':'application/json','Vary':'Origin',...(allowed&&origin?{'Access-Control-Allow-Origin':origin}:{}),'Access-Control-Allow-Headers':'authorization,apikey,content-type,x-client-info','Access-Control-Allow-Methods':'POST,OPTIONS','Cache-Control':'no-store'};
  const reply=(value,status=200)=>new Response(JSON.stringify(value),{status,headers});
  if(!allowed)return reply({error:'This origin is not allowed'},403);if(req.method==='OPTIONS')return new Response(null,{status:204,headers});if(req.method!=='POST')return reply({error:'Use POST'},405);
  try{const text=await req.text();need(text.length<=2100000,413,'This submission is too large');const body=JSON.parse(text);need(object(body),400,'Invalid request');const user=await auth(req),profile=await one('profiles','id=eq.'+user.id+'&select=id,role');need(profile,403,'Your learning profile is not ready');return reply(await handle(body,user,profile));}
  catch(e){return reply({error:e instanceof ApiError?e.message:'The learning service is unavailable. Your local answers and self-marking are still available.'},e instanceof ApiError?e.status:503);}
 };
}
const EVIDENCE_INSTRUCTIONS='For a point scheme, return exactly one criterion for every mark_scheme entry, using zero-based indexes. Set score to the number of awarded criteria. Every awarded evidence value must be copied as one contiguous exact substring of student_answer, preserving its words and punctuation. Do not add quotation marks, ellipses, labels or explanations to evidence. For unawarded criteria use an empty evidence string. For level-of-response answers return an empty criteria array.';
export function groundEvidence(text,evidence){
 if(text.includes(evidence))return evidence;
 if(!evidence.trim()||evidence.length>500)return null;
 const pattern=evidence.trim().split(/(\s+|['\u2018\u2019]|["\u201c\u201d])/u).map(part=>/^\s+$/u.test(part)?'\\s+':/^['\u2018\u2019]$/u.test(part)?"['\u2018\u2019]":/^["\u201c\u201d]$/u.test(part)?'["\u201c\u201d]':part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('');
 return text.match(new RegExp(pattern,'u'))?.[0]??null;
}
function bounded(s,fallback,max){const n=Number(s);return Number.isInteger(n)&&n>0?Math.min(n,max):fallback;}
export async function digest(text){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)))].map(b=>b.toString(16).padStart(2,'0')).join('');}
