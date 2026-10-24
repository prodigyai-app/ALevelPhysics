import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
const require=createRequire(import.meta.url),{load,extract}=require('../scripts/build-catalogs.cjs');

test('Physics layout keeps assessment contracts, tab state, keyboard access and lab routes',async()=>{
  const {w,d,errors}=await load('ALevelPhysics');
  try {
    assert.deepEqual(errors,[]);
    assert.equal(d.querySelector('#topic-query,.rp-open,#rp,[aria-label="Choose a course"]'),null);
    assert.equal(d.querySelectorAll('#hub .unit:not([hidden])').length,12);
    assert.equal(d.querySelectorAll('#hub .u-d,#hub .u-s,#switcher .desc,#switcher .lvl').length,0);
    assert.ok(d.querySelector('header > a[href="#u-papers"]'));
    assert.ok(d.querySelector('.simple-tools .theme-btn'));
    assert.ok(d.querySelector('.simple-tools a[href="#u-lab"]'));
    const catalog=JSON.parse(readFileSync(new URL('../../assessment-catalog.json',import.meta.url)));
    let count=0;
    for(const page of w.LAB.list){
      const before=catalog.pages[page.id];
      assert.ok(before,page.id);
      assert.deepEqual(JSON.parse(JSON.stringify(extract(w,d,page).questions)),before.questions,page.id);
      count+=before.questions.length;
    }
    assert.ok(count>1000);
    const section=d.getElementById('lab-m1');
    const tabs=[...section.querySelectorAll('[role=tab]')];
    assert.deepEqual(tabs.map(b=>b.textContent),['Learn','Practice','Lab']);
    const panels=tabs.map(b=>d.getElementById(b.getAttribute('aria-controls')));
    assert.equal(panels[0].hidden,false);assert.equal(panels[1].hidden,true);
    assert.ok(panels[1].querySelector('.qi'));assert.ok(panels[1].querySelector('.exam'));
    assert.ok(panels[2].querySelector('.sim'));
    const answer=panels[1].querySelector('textarea[data-xw]');
    answer.value='Layout test: my working';answer.dispatchEvent(new w.Event('input',{bubbles:true}));
    tabs[1].click();tabs[2].click();tabs[0].click();tabs[1].click();
    assert.equal(answer.value,'Layout test: my working');
    assert.equal(panels[1].hidden,false);assert.equal(panels[2].hidden,true);
    tabs[1].dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));
    assert.equal(d.activeElement,tabs[2]);assert.equal(tabs[2].getAttribute('aria-selected'),'true');
    assert.equal(tabs[1].tabIndex,-1);
    tabs[2].dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));
    assert.equal(d.activeElement,tabs[0]);
    for(const timer of d.querySelectorAll('.xtimer')) assert.equal(timer.closest('.lesson-panel'),null);
    for(const section of d.querySelectorAll('section.lab')) {
      for(const panel of section.querySelectorAll('.lesson-panel')) assert.ok(panel.children.length,panel.id);
    }
    await new Promise(r=>setTimeout(r,300));
    assert.match(w.localStorage.getItem('learn-motion-exam'),/Layout test: my working/);
  } finally {w.close();}
});
