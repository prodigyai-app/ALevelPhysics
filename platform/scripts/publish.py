from pathlib import Path
import json,subprocess,concurrent.futures,shutil,os
root=Path(__file__).resolve().parents[1];base=root.parents[1]
patched_node=Path(os.environ.get('LOCALAPPDATA',''))/'Programs/ProdigyNode/node-v24.22.1-win-x64/node.exe'
if patched_node.is_file():os.environ['PATH']=str(patched_node.parent)+os.pathsep+os.environ['PATH']
subprocess.run(['node',str(root/'scripts/check-node.cjs')],check=True)
repos=['ALevelPhysics','ALevelChemistry','ALevelBiology','ALevelMaths','ALevelFurtherMaths','ALevelPsychology','ALevelSociology','ALevelPE','GCSEPhysics','GCSEChemistry','GCSEBiology','GCSEmaths','GCSECombinedScience']
def run(args,cwd):
    r=subprocess.run(args,cwd=cwd,capture_output=True,text=True)
    assert r.returncode==0,' '.join(args)+'\n'+r.stdout[-7000:]+r.stderr[-2000:]
    return r.stdout.strip()
run(['node','--test',*[str(p.relative_to(root)) for p in (root/'tests').glob('*.test.mjs')]],root)
def check(repo):
    p=base/repo
    run(['git','diff','--check'],p)
    run(['git','fetch','origin','main'],p)
    assert run(['git','rev-parse','HEAD'],p)==run(['git','rev-parse','origin/main'],p),repo+' remote changed; reconcile before publishing'
    run(['node','--test',*[str(t.relative_to(p)) for t in (p/'tests').glob('*.cjs')]],p)
    assert (p/'assessment-catalog.json').exists()
    return repo
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for repo in pool.map(check,repos):print(json.dumps({'repo':repo,'checks':'passed'}),flush=True)
results=[]
for repo in repos:
    p=base/repo
    files=['math-notation.js','maths-keyboard.js','maths-keyboard.css','numeric-tools.js','subject-icons.js','favicon.svg','index.html','assessment-core.js','assignments.js','assignments.css','course-links.js','assessment-catalog.json']
    if repo=='ALevelPhysics':files.append('platform')
    run(['git','add','--',*files],p)
    staged=run(['git','diff','--cached','--name-only'],p).splitlines()
    assert all(not any(part in f.split('/') for part in ['node_modules','.env','.temp']) for f in staged),'Unexpected sensitive/build artifact staged'
    run(['git','commit','-m','Add shared class assignments and optional AI marking with self-mark fallback'],p)
    run(['git','push','origin','HEAD:main'],p)
    sha=run(['git','rev-parse','HEAD'],p);results.append({'repo':repo,'sha':sha});print(json.dumps(results[-1]),flush=True)
    target=base.parent/repo
    for file in files:
        if file=='platform':
            shutil.copytree(p/file,target/file,dirs_exist_ok=True,ignore=shutil.ignore_patterns('node_modules','.temp','.branches','.env','.env.*','test-output','__pycache__'))
        else:shutil.copyfile(p/file,target/file)
(base/'assignments-published.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
