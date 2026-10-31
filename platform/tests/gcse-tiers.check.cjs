const assert=require('node:assert/strict');const {load}=require('../scripts/build-catalogs.cjs');
(async()=>{const repo=process.argv[2],{dom,w,d,errors}=await load(repo);try{
 const pages=w.eval('LAB.list');const native=d.querySelector('.tier-switch[aria-label="Tier"]');
 const click=t=>{if(native)native.querySelector('[data-tier="'+(t==='foundation'?'f':'h')+'"]').click();else d.querySelector('[data-study-tier="'+t+'"]').click();};
 const tier=()=>native?w.TIER:d.querySelector('#study-tier').value;
 assert(d.querySelector('.gcse-tier-buttons'),'Visible tier control');assert(!d.querySelector('#study-tier:not([hidden])'),'No tier dropdown');
 click('foundation');assert(['f','foundation'].includes(tier()));
 const h=pages.find(p=>/higher/i.test(p.tag||''));assert(h,'Has higher lesson');assert(w.eval('LAB_HIDE')(h),'Higher lesson excluded');
 const hp=pages.find(p=>/^papers:/.test(p.group)&&/higher/i.test(p.group+' '+p.name+' '+p.tag));if(hp)assert(w.eval('LAB_HIDE')(hp),'Higher paper excluded');
 const root=d.documentElement;assert.equal(root.dataset.studyTier||root.dataset.tier,native?'f':'foundation');
 const part=Object.values(w.EXAM.PARTS).find(p=>p.ht);if(part&&['GCSEPhysics','GCSEChemistry','GCSEmaths'].includes(repo)){const cid=Object.keys(w.EXAM.CARDS).find(c=>w.EXAM.CARDS[c].qs.some(q=>q.parts.some(p=>p.id===part.id)));assert(!w.EXAM.allParts(cid).some(p=>p.id===part.id),'Higher exam marks excluded');}
 click('higher');assert(['h','higher'].includes(tier()));assert(!w.eval('LAB_HIDE')(h),'Higher lesson restored');
 const fp=pages.find(p=>/^papers:/.test(p.group)&&/foundation/i.test(p.group+' '+p.name+' '+p.tag));if(fp)assert(w.eval('LAB_HIDE')(fp),'Foundation paper excluded');
 if(!native){click('all');assert(!w.eval('LAB_HIDE')(h));if(fp)assert(!w.eval('LAB_HIDE')(fp));}
 assert.equal(errors.length,0,errors.join('\n'));
 console.log(repo+': tier buttons, lesson/paper filtering, Higher restoration and exam totals passed');
 console.log('Existing loader diagnostics: '+errors.length);if(errors.length)console.log(errors.slice(0,2).join('\n').slice(0,500));
 }finally{dom.window.close();}})().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exitCode=1});

