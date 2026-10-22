/* Execute only local, owned course source; all external resources are blocked. */
const {JSDOM,ResourceLoader,VirtualConsole}=require('jsdom');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const base=path.resolve(__dirname,'../../..');
const repos={ALevelPhysics:'alevel-physics',ALevelChemistry:'alevel-chemistry',ALevelBiology:'alevel-biology',ALevelMaths:'alevel-maths',ALevelPsychology:'alevel-psychology',GCSEPhysics:'gcse-physics',GCSEChemistry:'gcse-chemistry',GCSEBiology:'gcse-biology',GCSEmaths:'gcse-maths',GCSECombinedScience:'gcse-combined'};
const fakeContext=()=>new Proxy({measureText:s=>({width:String(s).length*7}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}}),getImageData:()=>({data:new Uint8ClampedArray(4)})},{get:(o,k)=>k in o?o[k]:()=>{}});
async function load(repo,{hash=''}={}){
 const dir=path.join(base,repo),errors=[];
 class Local extends ResourceLoader{fetch(url){const u=new URL(url);if(u.origin!=='https://test.prodigyai.uk')return null;const file=path.join(dir,decodeURIComponent(u.pathname).replace(/^\//,''));return fs.existsSync(file)?Promise.resolve(fs.readFileSync(file)):null;}}
 const vc=new VirtualConsole();vc.on('jsdomError',e=>{if(!/CSS stylesheet|navigation/.test(e.message))errors.push(e.message+' '+(e.detail?.stack||''));});
 let scriptIndex=0;
 const html=fs.readFileSync(path.join(dir,'index.html'),'utf8').replace(/<style[^>]*>[\s\S]*?<\/style>/g,'').replace('function refresh(cid){','function refresh(cid){if(window.__CATALOG)return;').replace(/<script([^>]*)>([\s\S]*?)<\/script>/g,(all,attrs,source)=>{const number=scriptIndex++;return /src=/.test(attrs)?all:`<script${attrs}>${source}\n//# sourceURL=${repo}-inline-${number}.js\n</script>`;});
 const dom=new JSDOM(html,{url:'https://test.prodigyai.uk/'+hash,runScripts:'dangerously',resources:new Local(),pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
  w.__CATALOG=true;
  const originalQuery=w.Document.prototype.querySelector;
  // JSDOM's selector engine needs quoted radio names containing hyphens.
  w.Document.prototype.querySelector=function(selector){selector=String(selector).replace(/\[name=([\w-]+)\]/g,'[name="$1"]');const match=selector.match(/^#([\w-]+)(?:\s+(.+))?$/);if(match){const el=this.getElementById(match[1]);return match[2]?el?.querySelector(match[2])||null:el;}return originalQuery.call(this,selector);};
  w.MutationObserver=class{observe(){}disconnect(){}};
  w.matchMedia=()=>({matches:false,addEventListener(){},addListener(){}});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.HTMLCanvasElement.prototype.getContext=fakeContext;w.requestAnimationFrame=()=>1;w.cancelAnimationFrame=()=>{};w.setInterval=()=>1;w.confirm=()=>true;
  w.HTMLElement.prototype.getBoundingClientRect=()=>({width:900,height:470,top:0,left:0,right:900,bottom:470});
 }});
 await Promise.race([new Promise(resolve=>dom.window.addEventListener('load',resolve,{once:true})),new Promise(resolve=>setTimeout(resolve,3000))]);
 if(!dom.window.EXAM||!dom.window.LEARN)throw Error(repo+' failed to initialise: '+errors.join('; '));
 return {dom,w:dom.window,d:dom.window.document,errors};
}
function extract(w,d,p){
 const plain=s=>{const e=d.createElement('div');e.innerHTML=String(s||'').replace(/<sup>(.*?)<\/sup>/g,'^$1');return e.textContent.replace(/\s+/g,' ').trim();};
 const sec=d.getElementById('lab-'+p.id),questions=[];
 if(!sec)return null;
 for(const card of sec.querySelectorAll('.exam')){
  const cfg=w.EXAM.CARDS[card.id];if(!cfg)continue;
  for(const group of cfg.qs)for(const q of group.parts){
   const prompt=plain((group.stem||'')+' '+q.q),essay=p.id==='essay-workbench'?card.id.replace('xm-essay-workbench-',''):null;
   questions.push({id:q.id,kind:q.opts?'choice':'written',m:q.m,prompt,options:q.opts?.map(plain)||[],correct:q.opts?q.a:null,scheme:(q.ms||[]).map(x=>plain(Array.isArray(x)?x.join(' · '):x)),levels:q.lor?.map(x=>x.map(plain))||[],indicative:q.ind?.map(plain)||[],note:plain(q.note),numeric:q.ans||null,higher:!!q.ht,visual:/<(svg|img|canvas)\b/i.test((group.stem||'')+q.q),...(essay?{essay}:{})});
  }
 }
 for(const el of sec.querySelectorAll('.qi[data-q]')){
  const id=el.dataset.q,[set,i]=id.split(/-(?=\d+$)/),q=w.LEARN.QZ[set]?.[+i];if(!q)continue;
  questions.push({id:'check:'+id,kind:q.opts?'choice':'written',m:1,prompt:plain(q.q),options:q.opts?.map(plain)||[],correct:q.opts?q.a:null,scheme:[plain(q.why||q.show||q.a)],levels:[],numeric:q.opts?null:{a:q.a,tol:q.tol??.02,atol:q.abs||0},higher:!!q.ht||!!el.closest('.higher'),visual:/<(svg|img|canvas)\b/i.test(q.q)});
 }
 const title=plain(sec.querySelector('.lab-head h2')?.innerHTML||p.name);
 return {id:p.id,title,type:/paper/i.test(title+' '+p.name+' '+p.group)?'paper':'lesson',questions,...(/Foundation/i.test(title+' '+p.tag)?{tier:'f'}:/Higher tier/i.test(title+' '+p.tag)?{tier:'h'}:{}),...(p.id==='essay-workbench'?{essays:Object.keys(w.PSY_BANK.essays)}:{})};
}
async function build(repo){
 console.log('Building catalogue:',repo);const {dom,w,d,errors}=await load(repo);try{
  if(errors.length)throw Error(repo+': '+errors.slice(0,2).join('\n').slice(0,2500));
  const pages={};for(const p of w.eval('LAB.list')){const page=extract(w,d,p);if(page)pages[p.id]=page;}
  if(repo==='ALevelPsychology'){
   for(const a of w.PSY_OPTION_GROUPS[1])for(const b of w.PSY_OPTION_GROUPS[2])for(const c of w.PSY_OPTION_GROUPS[3]){
    const selection={1:a,2:b,3:c},p=w.PsychTools.paper3(w.PSY_BANK,selection);if(pages[p.id]){pages[p.id].selection=selection;continue;}
    const section=d.createElement('section');section.id='lab-'+p.id;section.innerHTML='<div class="lab-head"><h2></h2></div>';section.querySelector('h2').textContent=p.title;
    section.append(w.EXAM.build('xm-'+p.id,{title:p.title,qs:p.questions.map(q=>({stem:`<h4>${q.title}</h4>${q.stem||''}`,parts:q.parts.map(w.PSY_HELPERS.part)}))}));d.body.append(section);
    pages[p.id]={...extract(w,d,{id:p.id,name:p.title,group:'papers:aqa'}),selection};
   }
  }
  for(const page of Object.values(pages)){const ids=new Set();for(const q of page.questions){if(ids.has(q.id))throw Error('Duplicate question '+q.id);ids.add(q.id);if(!Number.isFinite(q.m)||q.m<1)throw Error('Invalid marks '+q.id);}}
  const data={version:1,site:repos[repo],pages};data.revision=crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  fs.writeFileSync(path.join(base,repo,'assessment-catalog.json'),JSON.stringify(data));console.log(JSON.stringify({repo,pages:Object.keys(pages).length,questions:Object.values(pages).reduce((s,p)=>s+p.questions.length,0)}));
 }finally{dom.window.close();}
}
if(require.main===module)(async()=>{for(const repo of process.argv.slice(2).length?process.argv.slice(2):Object.keys(repos))await build(repo);})().catch(e=>{console.error(e.stack);process.exitCode=1;});
module.exports={load,extract,build,repos};
