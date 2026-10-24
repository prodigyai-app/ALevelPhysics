import test from 'node:test';import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const {load}=createRequire(import.meta.url)('../scripts/build-catalogs.cjs');
test('direct Psychology lesson links load without errors and option controls remain in Tools',async()=>{
 const {dom,w,d,errors}=await load('ALevelPsychology',{hash:'#conformity'});try{
  assert.deepEqual(errors,[]);assert.equal(d.getElementById('lab-conformity').hidden,false);assert.ok(d.querySelector('.psych-options').isConnected);assert.equal(d.querySelector('[aria-label="Choose a course"]'),null);
  w.location.hash='';await new Promise(r=>setTimeout(r,20));assert.ok(d.querySelector('.psych-options').closest('.simple-tools-panel'));
 }finally{dom.window.close();}
});
