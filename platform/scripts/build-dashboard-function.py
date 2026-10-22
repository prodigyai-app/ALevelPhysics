from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
core=(root/'client'/'assessment-core.js').read_text(encoding='utf-8')
core=re.sub(r'\bexport\s+','',core)
service=(root/'supabase'/'functions'/'learning-platform'/'service.js').read_text(encoding='utf-8')
service=re.sub(r'^import[^\n]+\n','',service,count=1)
service=re.sub(r'\bexport\s+','',service)
out=root/'deploy';out.mkdir(exist_ok=True)
(out/'learning-platform.ts').write_text('// Generated from the maintained shared platform source. Do not add secrets here.\n'+core+'\n'+service+'\nDeno.serve(createHandler({env:name=>Deno.env.get(name)}));\n',encoding='utf-8')
print(out/'learning-platform.ts')
