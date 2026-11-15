import asyncio,json,re
from playwright.async_api import async_playwright
import os
HERE=os.path.dirname(os.path.abspath(__file__))
C=os.path.join(HERE,'..')+'/'; OUT=HERE+'/'  # the figure scripts this site loads
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
# Figures used in the lessons (lesson-visuals-data-2.js), added November 2026
 ("fields-grid","grid",{'level':"alevel"},"Electricity and fields","The National Grid: power station, step-up transformer, transmission cables, step-down transformer and homes"),
 ("gravity-kepler-laws","keplerLaws",{'level':"alevel"},"Gravitation and astrophysics","An elliptical orbit with three equal-area sectors swept in equal times, and a graph of T squared against r cubed for the inner planets on a straight line"),
 ("astro-grating-orders","gratingOrders",{'level':"alevel"},"Gravitation and astrophysics","Laser light passing through a diffraction grating producing orders at angles computed from d sin theta equals n lambda"),
 ("waves-photo-ke","photoKE",{'level':"alevel"},"Waves and quantum","Graph of maximum kinetic energy against frequency for copper and sodium: parallel lines of gradient h with intercepts at the threshold frequency and minus the work function"),
 ("fields-magnetic-path","magneticPath",{'level':"alevel"},"Electricity and fields","An electron moving in a circle in a magnetic field into the page with the force towards the centre, and a velocity selector with balanced electric and magnetic forces"),
 ("forces-lift-forces","liftForces",{'level':"alevel"},"Motion and forces","Free-body diagram of a person in a lift accelerating upwards, and a trolley pulled by a hanging mass with tension and weight labelled"),
 ("forces-drag-speed","dragSpeed",{'level':"alevel"},"Motion and forces","Graph of drag force against speed rising as v squared until it meets the weight line at terminal velocity"),
 ("forces-couple","couple",{'level':"alevel"},"Motion and forces","Two equal and opposite forces on a tap handle forming a couple with perpendicular separation 6 centimetres, and the perpendicular distance between lines of action for forces at an angle"),
 ("energy-work-angle","workAngle",{'level':"alevel"},"Motion and forces","A sledge pulled by a rope at 35 degrees showing the horizontal and vertical components of the tension, friction and the displacement"),
 ("energy-ke-gpe","keGpe",{'level':"alevel"},"Motion and forces","A roller coaster transferring gravitational potential energy to kinetic energy"),
 ("energy-elastic-energy","elasticEnergy",{'level':"alevel"},"Motion and forces","Force-extension graph with the triangle under it shaded as stored energy, and a rubber loading and unloading loop with the energy dissipated shaded"),
 ("momentum-explosion-elastic","explosionElastic",{'level':"alevel"},"Momentum","Two trolleys pushed apart by a spring with equal and opposite momentum, and an elastic collision in which momentum and kinetic energy are both conserved"),
 ("momentum-collision-2d","collision2D",{'level':"alevel"},"Momentum","Two pucks colliding at an angle with the momentum vectors drawn as a closed triangle and resolved into components"),
 ("electricity-network-solved","networkSolved",{'level':"alevel"},"Electricity","A 9 volt supply across 20 and 40 ohm resistors in series, in parallel with 30 ohms, with every current and potential difference labelled"),
 ("electricity-sensing-divider","sensingDivider",{'level':"alevel"},"Electricity","A potential divider with a fixed resistor and a thermistor, and a computed graph of output voltage falling as temperature rises"),
 ("waves-two-source","twoSource",{'level':"alevel"},"Waves and quantum","Wavefronts from two coherent sources with the lines of maxima where the path difference is a whole number of wavelengths and the minima between them"),
 ("thermal-isotherms","isotherms",{'level':"alevel"},"Thermal physics","Pressure against volume for a fixed amount of gas at 290 K and 350 K, computed from pV equals nRT"),
 ("circular-centripetal","centripetal",{'level':"alevel"},"Gravitation and astrophysics","An object moving in a circle with velocity along the tangent and the resultant force towards the centre at two positions, and the velocity change pointing to the centre"),
 ("oscillations-shm-energy","shmEnergy",{'level':"alevel"},"Oscillations","Kinetic, potential and total energy against displacement for simple harmonic motion: two parabolas that add to a constant"),
 ("gravity-grav-field","gravField",{'level':"alevel"},"Gravitation and astrophysics","Radial gravitational field lines pointing into the Earth and a graph of g falling as one over r squared from the surface"),
 ("astro-hubble-age","hubbleAge",{'level':"alevel"},"Gravitation and astrophysics","Hubble graph of recession speed against distance with gradient H0, and the separation of galaxies run backwards to zero at about 14 billion years ago"),
 ("fields-capacitor-combine","capacitorCombine",{'level':"alevel"},"Electricity and fields","Capacitor plates carrying equal and opposite charge, with 2 and 3 microfarad capacitors combined in series and in parallel across 10 volts"),
 ("fields-cap-energy","capEnergy",{'level':"alevel"},"Electricity and fields","Graph of p.d. against charge for a capacitor with the triangular area of 18 millijoules shaded and the 36 millijoule rectangle supplied by the battery outlined"),
 ("fields-potential-charge","potentialCharge",{'level':"alevel"},"Electricity and fields","Graphs of potential against distance for positive and negative point charges, and circular equipotentials around a positive charge at equal steps of 30 volts"),
 ("nuclear-nuclear-size","nuclearSize",{'level':"alevel"},"Nuclear and particle physics","An alpha particle approaching a gold nucleus head-on to a distance of closest approach, and a straight-line graph of nuclear radius against the cube root of nucleon number"),
 ("nuclear-ln-activity","lnActivity",{'level':"alevel"},"Nuclear and particle physics","Graph of the natural log of activity against time for protactinium-234m giving a straight line of gradient minus lambda"),
 ("forces-slope-forces","slopeForces",{'level':"alevel"},"Motion and forces","A block on a 30 degree slope with its weight resolved into components along and into the slope, the normal contact force and friction"),
 ("motion-suvat-chooser","suvatChooser",{'level':"alevel"},"Motion and forces","Table showing which of s, u, v, a and t each of the five suvat equations contains and the one it leaves out"),
 ("motion-free-fall-graphs","freeFallGraphs",{'level':"alevel"},"Motion and forces","Computed height-time and velocity-time graphs for a stone thrown upwards from a cliff, with the top of the flight and the impact marked"),
 ("energy-sankey-car","sankeyCar",{'level':"alevel"},"Motion and forces","Sankey diagram with 50 kilowatts of fuel power in, 15 kilowatts useful and 35 kilowatts wasted, drawn to scale"),
 ("electricity-charge-carriers","chargeCarriers",{'level':"alevel"},"Electricity","Electrons drifting through a metal lattice from negative to positive against the conventional current, and positive and negative ions moving opposite ways in an electrolyte"),
 ("electricity-power-equations","powerEquations",{'level':"alevel"},"Electricity","The power equations P equals VI, I squared R and V squared over R linked through V equals IR, with a kettle example"),
 ("astro-parallax","parallax",{'level':"alevel"},"Gravitation and astrophysics","Stellar parallax: the Earth on opposite sides of its orbit sees a nearby star at angle p, defining the parsec"),
 ("astro-universe-timeline","universeTimeline",{'level':"alevel"},"Gravitation and astrophysics","Schematic timeline from the Big Bang through inflation, nucleosynthesis, the CMB, the first galaxies and accelerating expansion to today, and a pie chart of dark energy, dark matter and ordinary matter"),
 ("measurements-prefix-scale","prefixScale",{'level':"alevel"},"Practical skills","A powers-of-ten scale from pico to tera with each SI prefix and examples, and how to convert areas and volumes"),
 ("measurements-error-types","errorTypes",{'level':"alevel"},"Practical skills","Four sets of repeat readings of g showing accurate and precise, precise but not accurate from a systematic error, accurate but not precise from random error, and neither"),
 ("measurements-uncertainty-combine","uncertaintyCombine",{'level':"alevel"},"Practical skills","Bars showing the percentage uncertainty in h and in t, with t counted twice because it is squared, adding to the percentage uncertainty in g"),
 ("measurements-log-log-power","logLogPower",{'level':"alevel"},"Practical skills","Log-log graph of pendulum period against length giving a straight line of gradient one half"),
 ("measurements-results-table","resultsTable",{'level':"alevel"},"Practical skills","A results table for resistance against length with headings, repeats, an anomaly circled, means and uncertainties, with annotations explaining each convention"),

]
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1700,'height':1200},device_scale_factor=2)
    await pg.set_content('<html><body style="margin:0"></body></html>')
    for f in ['science-figures.js','science-figures-2.js','science-figures-img.js','physics-figures.js']: await pg.add_script_tag(path=C+f)
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
    try: keep=[d for d in json.load(open(OUT+'diagrams.json')) if d.get('source')]  # figures from export-site-figures.cjs
    except FileNotFoundError: keep=[]
    json.dump(meta+keep,open(OUT+'diagrams.json','w'),indent=1,ensure_ascii=False)
    await b.close(); print(len(meta),'diagrams')
asyncio.run(m())
