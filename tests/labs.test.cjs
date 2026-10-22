const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
function notebook(site='gcse-biology',saved={}){
 const values=new Map(Object.entries(saved));const c={console,Map,Set,JSON,Object,Array,String,CustomEvent:class{},localStorage:{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)},document:{addEventListener(){}},setInterval(){},setTimeout(){},queueMicrotask(){}};
 c.window=c;c.ALP_SITE=site;c.addEventListener=()=>{};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'lab-notebook.js'),'utf8'),c);return {c,values,api:c.LabNotebook};
}
test('All linked local lab scripts parse, including newly added modules',()=>{
 for(const m of html.matchAll(/<script(?:[^>]*src="([^"]+)")?[^>]*>([\s\S]*?)<\/script>/g)){
  if(m[1]&&!/^https?:/.test(m[1]))new vm.Script(fs.readFileSync(path.join(root,m[1].split('?')[0]),'utf8'),{filename:m[1]});else if(!m[1])new vm.Script(m[2]);
 }
});
test('Readings survive a reload; animation state does not resume accidentally',()=>{
 const one=notebook(),s={data:[{x:1,y:2}],runs:[],busy:true,t:90,sap:.32};one.api.observe('osmosis',s);one.api.flush();
 const two=notebook('gcse-biology',Object.fromEntries(one.values)),fresh={data:[],runs:[],busy:false,t:0,sap:.1};two.api.observe('osmosis',fresh);
 assert.equal(fresh.data[0].y,2);assert.equal(fresh.sap,.32);assert.equal(fresh.busy,false);assert.equal(fresh.t,0);
 fresh.data=[];two.api.flush();const three=notebook('gcse-biology',Object.fromEntries(two.values)),empty={data:[{old:true}]};three.api.observe('osmosis',empty);assert.equal(empty.data.length,0,'Cleared readings stay cleared');
});
test('Shared origins cannot mix Biology and Combined practical records',()=>{
 const one=notebook(),s={data:[{mass:2.5}]};one.api.observe('bosm',s);one.api.flush();
 const two=notebook('gcse-combined',Object.fromEntries(one.values)),fresh={data:[]};two.api.observe('bosm',fresh);assert.equal(fresh.data.length,0);
 assert.ok([...one.values.keys()].every(k=>k.startsWith('learn-gcse-biology-lab-')));
});
test('Evidence checks handle arrays, nested data and empty datasets',()=>{
 const {api}=notebook();assert.equal(api.hasEvidence({data:[]}),false);assert.equal(api.hasEvidence({res:[null,null]}),false);assert.equal(api.hasEvidence({data:{lamp:[],diode:[{V:1,I:.1}]}}),true);
});
test('Saved lab reviews retain assessed scores and completion for teacher summaries',()=>{
 const {api}=notebook();const result=api.summary({'learn-gcse-biology-lab-review-bosm':{score:2,complete:true,reflection:'A considered conclusion'},'learn-gcse-combined-lab-review-bosm':{score:2,complete:true}});assert.equal(result.complete,1);assert.equal(result.reviews[0].id,'bosm');
});
if(fs.existsSync(path.join(root,'investigation-engine.js'))){
 const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'investigation-engine.js'),'utf8'),c);const A=c.window.InvestigationLab;
 test('Competitive inhibition approaches the same maximum rate at high substrate',()=>{assert.ok(A.expected({model:'enzyme'},1,'inhibitor')<A.expected({model:'enzyme'},1));assert.ok(Math.abs(A.expected({model:'enzyme'},1e9,'inhibitor')-A.expected({model:'enzyme'},1e9))<1e-7);});
 test('Calibration, Rf and inverse-time rates have the intended units and relationships',()=>{assert.equal(A.expected({model:'calibration'},100),2);assert.equal(A.expected({model:'chromatography'},50,'carotene')/50,.91);assert.equal(A.expected({model:'cross'},1),60);assert.equal(A.expected({model:'cross'},.5),120);});
 test('Biological statistics handle spread, tied ranks and degenerate samples',()=>{assert.equal(A.sd([1,2,3]),1);assert.equal(A.spearman([[1,1],[2,2],[3,3]]),1);assert.equal(A.spearman([[1,3],[2,2],[3,1]]),-1);assert.equal(A.spearman([[1,2],[1,3],[1,4]]),null);assert.ok(A.spearman([[1,1],[2,2],[2,3],[3,4]])>.9);});
}
test('The course ID is declared before any lab state can be loaded',()=>{assert.ok(html.indexOf('window.ALP_SITE=')<html.indexOf('src="lab-notebook.js"'));});
