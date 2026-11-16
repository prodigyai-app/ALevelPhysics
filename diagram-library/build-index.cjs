/* Rebuild the diagram library's browsing page (index.html) and README from diagrams.json and
   animations/animations.json. Run after export.py, export-site-figures.cjs or export-animations.cjs:
   node diagram-library/build-index.cjs */
'use strict';
const fs = require('fs'), path = require('path');
const D = __dirname, J = f => JSON.parse(fs.readFileSync(path.join(D, f), 'utf8'));
const diagrams = J('diagrams.json'), anims = fs.existsSync(path.join(D, 'animations/animations.json')) ? J('animations/animations.json') : [];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ORDER = ['Practical skills', 'Motion and forces', 'Materials', 'Momentum', 'Electricity', 'Waves and quantum', 'Thermal physics', 'Oscillations', 'Gravitation and astrophysics', 'Electricity and fields', 'Nuclear and particle physics', 'Medical imaging', 'Exam question figures', 'Exam papers'];
const topics = [...new Set(diagrams.map(d => d.topic))].sort((a, b) => (ORDER.indexOf(a) + 1 || 99) - (ORDER.indexOf(b) + 1 || 99));
const nSci = diagrams.filter(d => !d.source).length, nSite = diagrams.length - nSci;
const nSim = anims.filter(a => a.kind === 'sim').length, nLab = anims.filter(a => a.kind === 'lab').length;

const fig = d => `<figure><a href="png-light/${d.file}.png"><img src="png-light/${d.file}.png" alt="${esc(d.description)}" loading="lazy"></a><figcaption><b>${esc(d.description)}</b><span><a href="svg/${d.file}.svg" download>SVG</a> · <a href="png-light/${d.file}.png" download>PNG (white)</a> · <a href="png-dark/${d.file}.png" download>PNG (dark)</a></span></figcaption></figure>`;
fs.writeFileSync(path.join(D, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>A level Physics diagram library</title>
<style>:root{--bg:#f4f6f9;--card:#fff;--ink:#1d2733;--muted:#5a6b7d;--line:#d9e0e8;--acc:#1f6fd1}@media (prefers-color-scheme:dark){:root{--bg:#0f1620;--card:#172131;--ink:#e8ecf5;--muted:#9aa8ba;--line:#2a3a50;--acc:#7fb2ff}}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,Segoe UI,Arial,sans-serif}main{max-width:1200px;margin:0 auto;padding:24px 16px 60px}h1{margin:0 0 4px}p.lead{color:var(--muted);margin:0 0 12px}
nav{display:flex;flex-wrap:wrap;gap:6px 14px;margin:0 0 8px;font-size:.92rem}
h2{margin:32px 0 12px;font-size:1.2rem}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:16px}figure{margin:0;background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden}
img{display:block;width:100%;height:auto;max-height:340px;object-fit:contain;background:#fff;border-bottom:1px solid var(--line)}figcaption{padding:10px 12px;display:grid;gap:4px;font-size:.92rem}figcaption span{color:var(--muted)}a{color:var(--acc)}
.anim{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:20px 0 0}</style></head>
<body><main><h1>A level Physics diagram library</h1><p class="lead">${diagrams.length} diagrams from the prodigyai A level Physics site, ready for lesson slides and worksheets: ${nSci} realistic figures, plus ${nSite} lesson figures and exam-question figures taken from the lesson pages. SVG scales to any size and can be edited in PowerPoint (Insert ▸ Pictures, then Convert to Shape). PNGs are 2× resolution, on white or dark backgrounds.</p>
${anims.length ? `<div class="anim"><b>Animations:</b> ${anims.length} interactive simulations and practical labs (${nSim} from lessons, ${nLab} practical labs), each a single HTML file that works offline. <a href="animations/index.html">Browse the animations</a>.</div>` : ''}
<h2 style="font-size:1rem;margin-top:24px">Topics</h2><nav>${topics.map(t => `<a href="#${t.toLowerCase().replace(/[^a-z]+/g, '-')}">${esc(t)}</a>`).join('')}</nav>
${topics.map(t => `<h2 id="${t.toLowerCase().replace(/[^a-z]+/g, '-')}">${esc(t)}</h2><div class="grid">${diagrams.filter(d => d.topic === t).map(fig).join('')}</div>`).join('\n')}
</main></body></html>
`);

let readme = fs.readFileSync(path.join(D, 'README.md'), 'utf8');
const head = `# A level Physics diagram library

${diagrams.length} A level Physics diagrams and ${anims.length} animations from the prodigyai A level Physics site.

- **${nSci} realistic figures** drawn by the shared figure library (\`science-figures.js\`, \`science-figures-2.js\`, \`physics-figures.js\`), exported by \`export.py\`.
- **${nSite} lesson figures and exam-question figures** taken from the lesson and exam-paper pages, exported by \`export-site-figures.cjs\`.
- **${anims.length} animations** in \`animations/\`: ${nSim} lesson simulations and ${nLab} practical labs (OCR PAGs and extension practicals), exported by \`export-animations.cjs\`.

Open \`index.html\` to browse the diagrams, and \`animations/index.html\` for the animations.

| Folder | Contents |
|---|---|
| \`svg/\` | Scalable vector files on a white background. They stay sharp at any size, and PowerPoint can convert them to editable shapes (Insert ▸ Pictures, then right-click ▸ Convert to Shape). |
| \`png-light/\` | 2× PNG images on white, for slides, worksheets and printing. |
| \`png-dark/\` | 2× PNG images on a dark background, for dark slide templates. |
| \`diagrams.json\` | The list of diagrams: file name, topic, description, and either the figure options used or the page it came from. |
| \`animations/\` | One self-contained HTML file per animation, plus \`animations.json\` and a browsing page. |

File names start with the topic (motion, forces, energy, electricity, waves, thermal, gravity, astro, fields, nuclear, medical, measurements, practical, exam-paper).

## Using an animation in a lesson

Each animation is a single HTML file with everything it needs inside it, so it works offline. Open it in a browser to
use it on the board, or put it in a lesson page with an iframe:

\`\`\`html
<iframe src="animations/wv1-watch-a-wave-travel.html" style="width:100%;height:640px;border:0" title="Watch a wave travel"></iframe>
\`\`\`

They open in the light theme; add \`?theme=dark\` to the address for the dark theme. Readings in the practical labs are not saved
between visits (there is no sign-in or notebook in the standalone files).

## Diagrams

`;
const list = topics.map(t => diagrams.filter(d => d.topic === t).map(d => `- **${t}**: ${d.description.replace(/\s+/g, ' ')} (\`${d.file}\`)`).join('\n')).join('\n');
const tail = readme.slice(readme.indexOf('## Making more or changing one'));
readme = head + list + '\n\n' + tail;
fs.writeFileSync(path.join(D, 'README.md'), readme);
console.log(`index.html and README.md: ${diagrams.length} diagrams, ${anims.length} animations`);
