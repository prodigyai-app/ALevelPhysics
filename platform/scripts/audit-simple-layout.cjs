const {load,extract,repos}=require('./build-catalogs.cjs');
const fs=require('fs'),path=require('path');
(async()=>{let failures=0;for(const repo of (process.argv.slice(2).length?process.argv.slice(2):Object.keys(repos))){const {w,d,errors}=await load(repo);try{
 const old=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../..',repo,'assessment-catalog.json')));
 const mismatch=[];let questions=0;
 for(const p of w.LAB.list){const before=old.pages[p.id];if(!before){mismatch.push(p.id+': missing baseline');continue;}const actual=extract(w,d,p).questions;questions+=actual.length;if(JSON.stringify(actual)!==JSON.stringify(before.questions))mismatch.push(p.id);}
 for(const p of Object.values(old.pages))if(!p.selection&&!w.LAB.list.some(x=>x.id===p.id))mismatch.push(p.id+':missing page');
 const info={repo,errors,mismatch,pages:w.LAB.list.length,questions,tabs:d.querySelectorAll('.lesson-tabs').length,ksDecks:d.querySelectorAll('[data-learning]').length,unitNames:[...d.querySelectorAll('#hub .unit:not(.simple-secondary) .u-t')].slice(0,2).map(x=>x.textContent),tools:[...d.querySelectorAll('.simple-tools-panel>a')].map(x=>x.textContent),report:!!d.querySelector('.rp-open'),search:!!d.querySelector('#topic-query'),course:!!d.querySelector('[aria-label="Choose a course"]'),descr:d.querySelectorAll('#switcher .desc').length};
 console.log(JSON.stringify(info));if(errors.length||mismatch.length||info.report||info.search||info.course||info.descr)failures++;
 }finally{w.close();}}process.exitCode=failures?1:0;})();
