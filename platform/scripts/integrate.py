from pathlib import Path
import re,shutil

platform=Path(__file__).resolve().parents[1]
reviews=platform.parents[1]
repos=['ALevelPhysics','ALevelChemistry','ALevelBiology','ALevelMaths','ALevelFurtherMaths','ALevelPsychology','ALevelSociology','ALevelPE','GCSEPhysics','GCSEChemistry','GCSEBiology','GCSEmaths','GCSECombinedScience','KS3Science','KS3Maths']

core=(platform/'client'/'assessment-core.js').read_text(encoding='utf-8')
names=re.findall(r'export (?:async )?(?:const|function) (\w+)',core)
browser_core='(()=>{\n"use strict";\n'+re.sub(r'\bexport\s+','',core)+'\nwindow.ProdigyAssessment={'+','.join(names)+'};\n})();\n'
client=(platform/'client'/'assignments.js').read_text(encoding='utf-8')
client=re.sub(r"import (\{[^\n]+\}) from './assessment-core.js';",r'const \1=window.ProdigyAssessment;',client, count=1)
browser_client='(()=>{\n"use strict";\n'+client+'\n})();\n'

def patch(text):
    marker='return {graph,attach,build,refresh,allParts,pscore,PARTS,CARDS'
    match=re.search(re.escape(marker)+r'[^}]*\};',text)
    assert match,'EXAM export missing'
    line=match[0]
    for name in ['saved','save','rerender']:
        if not re.search(r'\b'+name+r'\b',line):line=line[:-2]+','+name+'};'
    text=text[:match.start()]+line+text[match.end():]
    old='window.ALP_ACCOUNTS={sb,merge,stats,get user(){ return user; }};'
    new='window.ALP_ACCOUNTS={sb,merge,stats,get user(){ return user; },get profile(){ return profile; },openSignIn:()=>openAuth("in")};'
    assert old in text or new in text,'Accounts bridge missing'
    text=text.replace(old,new)
    if 'data-platform-assignments' not in text:
        needle='<button class="btn" id="td-ref">Refresh</button>'
        assert needle in text,'Teacher dashboard action bar missing'
        text=text.replace(needle,'<button class="btn" data-platform-assignments>Assignments</button>'+needle,1)
    old='await loadProfile(); renderMenu(); const changed=await pull();'
    new='await loadProfile(); renderMenu(); window.dispatchEvent(new Event("prodigy-account-change")); const changed=await pull();'
    assert old in text or new in text,'Sign-in hook missing'
    text=text.replace(old,new)
    if 'href="assignments.css"' not in text:text=text.replace('</head>','<link rel="stylesheet" href="assignments.css">\n</head>',1)
    if 'src="math-notation.js' not in text:text=text.replace('<meta charset="utf-8">','<meta charset="utf-8">\n<script src="math-notation.js?v=20261022-keyboard"></script>',1)
    if 'src="numeric-tools.js' not in text:text=text.replace('<script src="revision-maths.js">','<script src="numeric-tools.js?v=20261022-keyboard"></script>\n<script src="revision-maths.js">',1)
    text=re.sub(r'<script src="numeric-tools.js(?:\?[^\"]*)?">','<script src="numeric-tools.js?v=20261022-keyboard">',text)
    if 'href="maths-keyboard.css' not in text:text=text.replace('<meta charset="utf-8">','<meta charset="utf-8">\n<link rel="stylesheet" href="maths-keyboard.css?v=20261022-keyboard">',1)
    text=re.sub(r'<script src="maths-keyboard.js[^\"]*"></script>\n','',text)
    text=text.replace('<script type="module" src="assignments.js"></script>\n','').replace('<script src="assessment-core.js"></script>\n','').replace('<script src="assignments.js"></script>\n','').replace('<script src="course-links.js"></script>\n','')
    text=re.sub(r'<script src="assessment-core.js(?:\?[^\"]*)?"></script>\n','',text)
    text=re.sub(r'<script src="assignments.js(?:\?[^\"]*)?"></script>\n','',text)
    text=re.sub(r'<script src="subject-icons.js[^"]*"></script>\n','',text)
    if 'src="desktop-units.js' not in text:
        text=re.sub(r'(<script src="simple-layout\.js[^"]*"></script>)',r'\1\n<link rel="stylesheet" href="desktop-units.css?v=20261031-fill">\n<script src="desktop-units.js?v=20261031-fill"></script>',text,count=1)
    if 'href="diagram-fit.css' not in text:text=re.sub(r'(<link rel="stylesheet" href="simple-layout\.css[^"]*">)',r'\1\n<link rel="stylesheet" href="diagram-fit.css?v=20261025-diagrams">',text,count=1)
    text=re.sub(r'<script src="diagram-fit.js[^"]*"></script>\n','',text)
    before,after=text.rsplit('</body>',1)
    text=before+'<script src="subject-icons.js?v=20261023-ks3"></script>\n<script src="maths-keyboard.js?v=20261022-keyboard"></script>\n<script src="course-links.js"></script>\n<script src="assessment-core.js?v=20261023-ks3"></script>\n<script src="assignments.js?v=20261023-ks3"></script>\n<script src="diagram-fit.js?v=20261025-diagrams"></script>\n</body>'+after
    return text

for repo in repos:
    source=reviews/repo
    for target in [source,reviews.parent/repo]:
        index=target/'index.html'
        if not index.exists():continue
        index.write_text(patch(index.read_text(encoding='utf-8')),encoding='utf-8')
        (target/'assessment-core.js').write_text(browser_core,encoding='utf-8')
        (target/'assignments.js').write_text(browser_client,encoding='utf-8')
        if repo in ['ALevelPhysics','ALevelChemistry','ALevelBiology','GCSEPhysics','GCSEChemistry','GCSEBiology','GCSECombinedScience','KS3Science']:
            text=index.read_text(encoding='utf-8')
            if 'src="lesson-practicals.js' not in text:
                text=re.sub(r'(<script src="simple-layout\.js[^"]*"></script>)',r'<link rel="stylesheet" href="lesson-practicals.css?v=20261031-inline">\n<script src="lesson-practical-map.js?v=20261031-inline"></script>\n<script src="lesson-practicals.js?v=20261031-inline"></script>\n\1',text,count=1)
                index.write_text(text,encoding='utf-8')
            for asset in ['lesson-practicals.js','lesson-practicals.css']:shutil.copyfile(platform/'client'/asset,target/asset)
            if target!=source:shutil.copyfile(source/'lesson-practical-map.js',target/'lesson-practical-map.js')

        shutil.copyfile(platform/'client'/'assignments.css',target/'assignments.css')
        shutil.copyfile(platform/'client'/'course-links.js',target/'course-links.js')
        for asset in ['math-notation.js','maths-keyboard.js','maths-keyboard.css','numeric-tools.js','subject-icons.js','diagram-fit.js','diagram-fit.css','desktop-units.js','desktop-units.css']:shutil.copyfile(platform/'client'/asset,target/asset)
    print(repo,flush=True)
shutil.copyfile(platform/'client'/'assessment-core.js',platform/'supabase'/'functions'/'_shared'/'assessment-core.js')
