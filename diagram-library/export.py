import asyncio,json,re
from playwright.async_api import async_playwright
import os
HERE=os.path.dirname(os.path.abspath(__file__))
C=os.path.join(HERE,'..','platform','client')+'/'; OUT=HERE+'/'
FIGS=[
 ('practical-young-modulus','youngModulus',{},'Practical skills','Young modulus: long wire, pulley, marker and fixed scale'),
 ('practical-emf-internal-resistance','emfInternal',{},'Practical skills','E.m.f. and internal resistance: circuit and V against I graph'),
 ('practical-specific-heat-capacity','shcPractical',{'level':'alevel'},'Practical skills','Specific heat capacity: heater and thermometer in an insulated block'),
 ('practical-specific-latent-heat','latentHeat',{'level':'alevel'},'Practical skills','Specific latent heat of fusion with a control funnel'),
 ('practical-resistivity','resistanceWire',{'level':'alevel'},'Practical skills','Resistance of a wire against length (resistivity)'),
 ('practical-iv-characteristics','ivCharacteristic',{'level':'alevel'},'Practical skills','I–V characteristics: resistor, filament lamp and diode'),
 ('practical-density','densityPractical',{'level':'alevel'},'Practical skills','Density of regular and irregular solids'),
 ('practical-stationary-waves','wavesPractical',{'level':'alevel'},'Practical skills','Ripple tank and stationary waves on a string'),
 ('motion-stopping-distances','stopping',{},'Motion and forces','Thinking and braking distances'),
 ('forces-springs-hookes-law','springHooke',{},'Motion and forces','Spring extension and force–extension graph'),
 ('forces-pressure-in-a-liquid','liquidPressure',{},'Motion and forces','Pressure increases with depth: p = hρg'),
 ('electricity-series-parallel','seriesParallel',{},'Electricity','Series and parallel circuits'),
 ('electricity-capacitor-charge-discharge','capacitorRC',{},'Electricity and fields','Capacitor charging and discharging through a resistor'),
 ('fields-charged-particles-e-and-b','chargedBeams',{},'Electricity and fields','Electron beam in uniform electric and magnetic fields'),
 ('fields-wire-and-grip-rule','wireField',{},'Electricity and fields','Magnetic field around a current-carrying wire'),
 ('fields-magnet-and-solenoid','magField',{},'Electricity and fields','Field patterns of a bar magnet and a solenoid'),
 ('fields-transformer','transformer',{'np':6,'ns':12},'Electricity and fields','Transformer: primary and secondary coils on an iron core'),
 ('waves-double-slit-and-grating','doubleSlit',{},'Waves and quantum','Young\'s double slit and the diffraction grating'),
 ('waves-progressive-transverse-longitudinal','waves',{},'Waves and quantum','Transverse and longitudinal waves'),
 ('waves-electromagnetic-spectrum','emSpectrum',{},'Waves and quantum','The electromagnetic spectrum'),
 ('waves-refraction-glass-block','glassBlock',{},'Waves and quantum','Refraction through a glass block'),
 ('quantum-photoelectric-and-leds','photoelectric',{},'Waves and quantum','Photoelectric effect and the Planck constant from LEDs'),
 ('thermal-heating-curve','heatingCurve',{},'Thermal physics','Heating curve: latent heat at the melting and boiling points'),
 ('thermal-gas-pressure','gasPressure',{},'Thermal physics','Gas particles and pressure at two temperatures'),
 ('thermal-states-of-matter','states',{'level':'alevel'},'Thermal physics','Particles in solids, liquids and gases'),
 ('nuclear-rutherford-scattering','rutherford',{},'Nuclear and particle physics','Rutherford alpha-particle scattering'),
 ('nuclear-models-of-the-atom','atomModels',{'level':'alevel'},'Nuclear and particle physics','Models of the atom'),
 ('nuclear-radiation-penetration','penetration',{},'Nuclear and particle physics','Alpha, beta and gamma penetration'),
 ('nuclear-fission-chain-reaction','fission',{},'Nuclear and particle physics','Induced fission and a chain reaction'),
 ('gravitation-orbits','orbit',{},'Gravitation and astrophysics','Circular orbit: gravity provides the centripetal force'),
 ('astro-life-cycle-of-stars','starLife',{},'Gravitation and astrophysics','Life cycles of low-mass and massive stars'),
 ('oscillations-shm','shmPractical',{},'Oscillations','Simple harmonic motion: mass on a spring, pendulum, x, v and a graphs'),
 ('oscillations-resonance','resonanceCurves',{},'Oscillations','Forced oscillations and resonance curves with damping'),
 ('thermal-boyles-law','boylesLaw',{},'Thermal physics','Boyle\'s law apparatus and p against 1/V'),
 ('waves-speed-of-sound-resonance-tube','resonanceTube',{},'Waves and quantum','Speed of sound with a resonance tube'),
 ('medical-x-ray-tube','xrayTube',{},'Medical imaging','X-ray tube'),
 ('medical-gamma-camera','gammaCamera',{},'Medical imaging','Gamma camera'),
 ('medical-ultrasound-a-scan','ultrasoundScan',{},'Medical imaging','Ultrasound transducer and A-scan'),
 ('forces-free-body-diagrams','freeBody',{},'Motion and forces','Free-body diagrams: book on a table, box on a rough slope'),
 ('forces-terminal-velocity','terminalVelocity',{},'Motion and forces','Skydiver forces and terminal velocity'),
 ('forces-centre-of-mass-stability','centreOfMass',{},'Motion and forces','Finding the centre of mass, and stability'),
 ('forces-triangle-of-forces','triangleForces',{},'Motion and forces','Three forces in equilibrium and the triangle of forces'),
 ('materials-stress-strain','stressStrain',{},'Materials','Stress–strain graphs: ductile, brittle and polymeric'),
 ('momentum-collisions','collisions',{},'Momentum','Conservation of momentum in a collision'),
 ('momentum-impulse-force-time','forceTime',{},'Momentum','Impulse and force–time graphs'),
 ('electricity-potential-divider','potentialDivider',{},'Electricity','Potential divider and sensing circuit'),
 ('electricity-capacitor-model','capModel',{},'Electricity and fields','Iterative model of capacitor discharge'),
 ('fields-radial-uniform','fieldLines',{},'Electricity and fields','Radial and uniform fields with equipotentials'),
 ('fields-potential','potentialGraph',{},'Gravitation and astrophysics','Gravitational potential against distance'),
 ('fields-induction','induction',{},'Electricity and fields','Electromagnetic induction: magnet and coil'),
 ('waves-diffraction-gap','waveDiffraction',{},'Waves and quantum','Diffraction through narrow and wide gaps'),
 ('quantum-electron-diffraction','electronDiffraction',{},'Waves and quantum','Electron diffraction tube'),
 ('quantum-energy-levels-spectra','lineSpectra',{},'Waves and quantum','Energy levels and line spectra'),
 ('thermal-maxwell-boltzmann','boltzmannCurve',{},'Thermal physics','Maxwell–Boltzmann distribution'),
 ('circular-motion','circularMotion',{},'Gravitation and astrophysics','Circular motion: velocity and centripetal force'),
 ('astro-hr-diagram','hrDiagram',{},'Gravitation and astrophysics','Hertzsprung–Russell diagram'),
 ('astro-black-body','blackBody',{},'Gravitation and astrophysics','Black-body radiation curves'),
 ('astro-redshift-hubble','redshiftHubble',{},'Gravitation and astrophysics','Redshift and Hubble’s law'),
 ('nuclear-binding-energy','bindingEnergy',{},'Nuclear and particle physics','Binding energy per nucleon'),
 ('nuclear-decay-curves','decayCurve',{},'Nuclear and particle physics','Exponential decay and the log graph'),
 ('nuclear-fusion','fusionFig',{},'Nuclear and particle physics','Fusion of deuterium and tritium'),
 ('medical-attenuation','attenuation',{},'Medical imaging','X-ray attenuation and contrast media'),
 ('medical-ct-scanner','ctScan',{},'Medical imaging','CAT scanner'),
 ('medical-pet-scanner','petScan',{},'Medical imaging','PET scanner'),
 ('medical-acoustic-impedance','acousticImpedance',{},'Medical imaging','Acoustic impedance and reflection'),
 ('medical-doppler-ultrasound','dopplerUS',{},'Medical imaging','Doppler ultrasound'),
]
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1700,'height':1200},device_scale_factor=2)
    await pg.set_content('<html><body style="margin:0"></body></html>')
    for f in ['science-figures.js','science-figures-2.js']: await pg.add_script_tag(path=C+f)
    meta=[]
    for name,fig,o,topic,desc in FIGS:
      for theme,bg,ink,panel in [('light','#ffffff','#1d2733','#ffffff'),('dark','#0f1620','#e8ecf5','#0f1620')]:
        svg=await pg.evaluate("""([fig,o,bg,ink,panel])=>{let s=SciFig.svg(fig,o);
          s=s.replace(/<rect class="sf-blank"[^>]*\\/>/g,'').replace(/<circle class="sf-(ring|hit)"[^>]*\\/>/g,'')
           .replace(/var\\(--panel,#121a33\\)/g,panel).replace(/var\\(--ink,#e8ecf5\\)/g,ink).replace(/currentColor/g,ink)
           .replace(/class="sf-lab"/g,'class="sf-lab" fill="'+ink+'"').replace(/fill:#ffd0b0/g,bg==='#ffffff'?'fill:#c0392b':'fill:#ffd0b0').replace(/<g class="sf-(lbl|q)"[^>]*>/g,'<g>');
          // one svg (isotopes returns two side by side): wrap into a single svg
          if(s.startsWith('<div')){const parts=[...s.matchAll(/<svg[^>]*viewBox="0 0 (\\d+) (\\d+)"[^>]*>([\\s\\S]*?)<\\/svg>/g)];let x=0,H=0,inner='';for(const p of parts){inner+=`<svg x="${x}" y="0" width="${p[1]}" height="${p[2]}" viewBox="0 0 ${p[1]} ${p[2]}">${p[3]}</svg>`;x+=+p[1]+20;H=Math.max(H,+p[2]);}s=`<svg viewBox="0 0 ${x-20} ${H}" role="img">${inner}</svg>`;}
          const vb=s.match(/viewBox="([-\\d.]+) ([-\\d.]+) ([\\d.]+) ([\\d.]+)"/);
          s=s.replace(/^<svg([^>]*)>/,(m,a)=>`<svg xmlns="http://www.w3.org/2000/svg"${a.replace(/ class="[^"]*"/,'').replace(/ style="[^"]*"/,'')} width="${vb[3]}" height="${vb[4]}" font-family="Arial, Helvetica, sans-serif" color="${ink}"><rect x="${vb[1]}" y="${vb[2]}" width="${vb[3]}" height="${vb[4]}" fill="${bg}"/>`);
          return s}""",[fig,o,bg,ink,panel])
        if theme=='light': open(OUT+'svg/'+name+'.svg','w').write('<?xml version="1.0" encoding="UTF-8"?>\n'+svg)
        await pg.evaluate("s=>{document.body.innerHTML='<div id=w style=\"display:inline-block\">'+s+'</div>'}",svg)
        el=await pg.query_selector('#w svg'); await el.screenshot(path=OUT+f'png-{theme}/{name}.png')
      meta.append({'file':name,'figure':fig,'options':o,'topic':topic,'description':desc})
    json.dump(meta,open(OUT+'diagrams.json','w'),indent=1)
    await b.close(); print(len(meta),'diagrams')
asyncio.run(m())
