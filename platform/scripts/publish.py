from pathlib import Path
import json,subprocess,concurrent.futures,shutil
root=Path(__file__).resolve().parents[1];base=root.parents[1]
repos=['ALevelPhysics','ALevelChemistry','ALevelBiology','ALevelMaths','ALevelFurtherMaths','ALevelPsychology','ALevelSociology','GCSEPhysics','GCSEChemistry','GCSEBiology','GCSEmaths','GCSECombinedScience']
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
    files=['math-notation.js','maths-keyboard.js','maths-keyboard.css','numeric-tools.js','index.html','assessment-core.js','assignments.js','assignments.css','course-links.js','assessment-catalog.json']
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
