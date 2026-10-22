import test from 'node:test';import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const {load}=createRequire(import.meta.url)('../scripts/build-catalogs.cjs');
test('direct Psychology lesson links load without errors and option controls return above papers',async()=>{
 const {dom,w,d,errors}=await load('ALevelPsychology',{hash:'#conformity'});try{
  assert.deepEqual(errors,[]);assert.equal(d.getElementById('lab-conformity').hidden,false);assert.ok(d.querySelector('.psych-options').isConnected);assert.ok(d.querySelector('[aria-label="Choose a course"]'));
  w.location.hash='';await new Promise(r=>setTimeout(r,20));assert.equal(d.querySelector('.psych-options').nextElementSibling.dataset.go,'u-papers');
 }finally{dom.window.close();}
});
