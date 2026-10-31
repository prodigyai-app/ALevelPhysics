/* Keep each practical's original document, controls and saved-state keys inside its lesson. */
(() => {
  'use strict';
  const pages=window.LAB?.list||[],maps=window.LESSON_PRACTICALS||{};
  const labUnits=new Set(['lab','labs','gcse-labs']);
  const labs=new Map(pages.filter(p=>!p.unit||labUnits.has(p.unit)).map(p=>[p.id,p]));
  const embedded=new URLSearchParams(location.search).get('embeddedPractical');
  if(embedded){
    if(!labs.has(embedded))return;
    function showEmbedded(){
      const page=labs.get(embedded);(page.redraw||page.onShow)?.();
      let section=document.getElementById('lab-'+embedded);if(!section)return;
      document.body.classList.add('practical-embedded-document');section.dataset.practicalRoot='';section.hidden=false;
      for(let el=section.parentElement;el&&el!==document.body;el=el.parentElement)el.dataset.practicalPath='';
      const style=document.createElement('style');style.textContent=`
        body.practical-embedded-document{margin:0;padding:8px;overflow:visible!important}
        .practical-embedded-document>:not([data-practical-path]):not([data-practical-root]),
        .practical-embedded-document [data-practical-path]>:not([data-practical-path]):not([data-practical-root]){display:none!important}
        .practical-embedded-document .wrap{max-width:none;gap:0;margin:0}
        .practical-embedded-document [data-practical-root]{display:block!important;margin:0}
        .practical-embedded-document .lab-head{margin-top:0}
        .practical-embedded-document .assignment-actions,.practical-embedded-document .ks-lab-context a{display:none!important}`;
      document.head.append(style);
      let previous=0,pending=false;
      function report(){pending=false;const next=document.getElementById('lab-'+embedded);
        if(next&&next!==section){section=next;section.dataset.practicalRoot='';section.hidden=false;observer?.disconnect();observer?.observe(section);requestAnimationFrame(()=>dispatchEvent(new Event('resize')));}
        const height=Math.ceil(Math.max(section.scrollHeight,section.getBoundingClientRect().height))+24;
        if(Math.abs(height-previous)>2){previous=height;parent.postMessage({type:'prodigy-practical-height',lab:embedded,height},location.origin);}}
      const resize=()=>{if(!pending){pending=true;requestAnimationFrame(report);}};
      const observer=window.ResizeObserver?new ResizeObserver(resize):null;observer?.observe(section);
      new MutationObserver(resize).observe(section.parentElement,{childList:true});
      addEventListener('resize',resize);document.addEventListener('click',resize);document.addEventListener('input',resize);
      document.fonts?.ready.then(resize);
      requestAnimationFrame(()=>{const page=labs.get(embedded);(page.redraw||page.onShow)?.();dispatchEvent(new Event('resize'));resize();});
    }
    if(document.readyState==='complete')showEmbedded();else addEventListener('load',showEmbedded,{once:true});
    return;
  }
  const frames=new Set();
  const plain=html=>{const div=document.createElement('div');div.innerHTML=html;return div.textContent;};
  for(const [pageId,ids] of Object.entries(maps)){
    const page=pages.find(p=>p.id===pageId),section=document.getElementById('lab-'+pageId),content=section?.querySelector('.lsec');
    if(!page||!content||section.querySelector('.xtimer')||page.group?.startsWith('papers:'))continue;
    const related=[...new Set(ids)].filter(id=>labs.has(id));if(!related.length)continue;
    const host=document.createElement('section');host.className='lcard lesson-practicals';
    const heading=document.createElement('h3');heading.textContent=/^gcse-/.test(window.ALP_SITE||'')?'Required practical lab':'Practical lab';host.append(heading);
    const marker=document.createElement('div');marker.className='prac-link lesson-practical-list';host.append(marker);
    for(const id of related){
      const name=plain(labs.get(id).name),block=document.createElement('div');block.className='lesson-practical-item';
      const loading=document.createElement('p');loading.className='practical-loading';loading.setAttribute('role','status');loading.textContent='Loading '+name+' practical…';block.append(loading);
      const frame=document.createElement('iframe');frame.setAttribute('aria-hidden','true');frame.title=name+' — interactive practical';frame.className='lesson-practical-frame';frame.dataset.practicalId=id;
      frame.setAttribute('loading','lazy');frame.setAttribute('height','850');block.append(frame);frames.add(frame);marker.append(block);
    }
    const deck=content.querySelector('[data-learning]');
    if(deck){
      const mode=document.createElement('button');mode.type='button';mode.className='btn';mode.dataset.mode='lab';mode.setAttribute('aria-pressed','false');mode.textContent='Lab';deck.querySelector('.ks-modes').append(mode);
      const panel=document.createElement('section');panel.dataset.panel='lab';panel.hidden=true;panel.setAttribute('aria-label','Practical labs');panel.append(host);deck.append(panel);
      if(LAB.store.get('learn-ks3-science-deck-state')?.[pageId]?.mode==='lab')mode.click();
      content.querySelectorAll('aside').forEach(aside=>{if(aside.querySelector('.ks-lab-links'))aside.remove();});
    }else content.prepend(host);
    // Preserve useful method text while replacing lab navigation with the experiment itself.
    for(const a of content.querySelectorAll('a[href^="#"]')){
      if(a.closest('.exam,.qz')||!related.includes(a.getAttribute('href').slice(1)))continue;
      if(a.matches('.btn')){const parent=a.parentElement;a.remove();if(!parent.textContent.trim())parent.remove();}
      else{const text=document.createElement('span');text.textContent=a.textContent;a.replaceWith(text);}
    }
  }
  function shown(el){for(let p=el;p&&p!==document.body;p=p.parentElement)if(p.hidden||getComputedStyle(p).display==='none')return false;return true;}
  function loadVisible(){if(document.readyState==='loading')return;for(const frame of frames){if(frame.hasAttribute('src')||!shown(frame))continue;
    const url=new URL(location.href);url.search='';url.searchParams.set('embeddedPractical',frame.dataset.practicalId);url.hash=frame.dataset.practicalId;frame.src=url.href;}}
  let pending=false;function schedule(){if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;loadVisible();});}}
  addEventListener('message',event=>{
    if(event.origin!==location.origin||event.data?.type!=='prodigy-practical-height')return;
    const frame=[...frames].find(f=>f.contentWindow===event.source&&f.dataset.practicalId===event.data.lab),height=Number(event.data.height);
    if(frame&&Number.isFinite(height)&&height>0){frame.style.height=Math.min(20000,Math.max(400,Math.ceil(height)))+'px';frame.classList.add('is-ready');frame.removeAttribute('aria-hidden');frame.previousElementSibling.hidden=true;}
  });
  document.addEventListener('click',schedule);document.addEventListener('keydown',schedule);addEventListener('hashchange',schedule);addEventListener('load',schedule);schedule();
})();
