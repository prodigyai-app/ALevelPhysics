# A level Physics diagram library

145 A level Physics diagrams and 157 animations from the prodigyai A level Physics site.

- **105 realistic figures** drawn by the shared figure library (`science-figures.js`, `science-figures-2.js`, `physics-figures.js`), exported by `export.py`.
- **40 lesson figures and exam-question figures** taken from the lesson and exam-paper pages, exported by `export-site-figures.cjs`.
- **157 animations** in `animations/`: 120 lesson simulations and 37 practical labs (OCR PAGs and extension practicals), exported by `export-animations.cjs`.

Open `index.html` to browse the diagrams, and `animations/index.html` for the animations.

| Folder | Contents |
|---|---|
| `svg/` | Scalable vector files on a white background. They stay sharp at any size, and PowerPoint can convert them to editable shapes (Insert ▸ Pictures, then right-click ▸ Convert to Shape). |
| `png-light/` | 2× PNG images on white, for slides, worksheets and printing. |
| `png-dark/` | 2× PNG images on a dark background, for dark slide templates. |
| `diagrams.json` | The list of diagrams: file name, topic, description, and either the figure options used or the page it came from. |
| `animations/` | One self-contained HTML file per animation, plus `animations.json` and a browsing page. |

File names start with the topic (motion, forces, energy, electricity, waves, thermal, gravity, astro, fields, nuclear, medical, measurements, practical, exam-paper).

## Using an animation in a lesson

Each animation is a single HTML file with everything it needs inside it, so it works offline. Open it in a browser to
use it on the board, or put it in a lesson page with an iframe:

```html
<iframe src="animations/wv1-watch-a-wave-travel.html" style="width:100%;height:640px;border:0" title="Watch a wave travel"></iframe>
```

They open in the light theme; add `?theme=dark` to the address for the dark theme. Readings in the practical labs are not saved
between visits (there is no sign-in or notebook in the standalone files).

## Diagrams

- **Practical skills**: Young modulus: long wire, pulley, marker and fixed scale (`practical-young-modulus`)
- **Practical skills**: E.m.f. and internal resistance: circuit and V against I graph (`practical-emf-internal-resistance`)
- **Practical skills**: Specific heat capacity: heater and thermometer in an insulated block (`practical-specific-heat-capacity`)
- **Practical skills**: Specific latent heat of fusion with a control funnel (`practical-specific-latent-heat`)
- **Practical skills**: Resistance of a wire against length (resistivity) (`practical-resistivity`)
- **Practical skills**: I–V characteristics: resistor, filament lamp and diode (`practical-iv-characteristics`)
- **Practical skills**: Density of regular and irregular solids (`practical-density`)
- **Practical skills**: Ripple tank and stationary waves on a string (`practical-stationary-waves`)
- **Practical skills**: A powers-of-ten scale from pico to tera with each SI prefix and examples, and how to convert areas and volumes (`measurements-prefix-scale`)
- **Practical skills**: Four sets of repeat readings of g showing accurate and precise, precise but not accurate from a systematic error, accurate but not precise from random error, and neither (`measurements-error-types`)
- **Practical skills**: Bars showing the percentage uncertainty in h and in t, with t counted twice because it is squared, adding to the percentage uncertainty in g (`measurements-uncertainty-combine`)
- **Practical skills**: Log-log graph of pendulum period against length giving a straight line of gradient one half (`measurements-log-log-power`)
- **Practical skills**: A results table for resistance against length with headings, repeats, an anomaly circled, means and uncertainties, with annotations explaining each convention (`measurements-results-table`)
- **Motion and forces**: Thinking and braking distances (`motion-stopping-distances`)
- **Motion and forces**: Spring extension and force–extension graph (`forces-springs-hookes-law`)
- **Motion and forces**: Pressure increases with depth: p = hρg (`forces-pressure-in-a-liquid`)
- **Motion and forces**: Free-body diagrams: book on a table, box on a rough slope (`forces-free-body-diagrams`)
- **Motion and forces**: Skydiver forces and terminal velocity (`forces-terminal-velocity`)
- **Motion and forces**: Finding the centre of mass, and stability (`forces-centre-of-mass-stability`)
- **Motion and forces**: Three forces in equilibrium and the triangle of forces (`forces-triangle-of-forces`)
- **Motion and forces**: Free-body diagram of a person in a lift accelerating upwards, and a trolley pulled by a hanging mass with tension and weight labelled (`forces-lift-forces`)
- **Motion and forces**: Graph of drag force against speed rising as v squared until it meets the weight line at terminal velocity (`forces-drag-speed`)
- **Motion and forces**: Two equal and opposite forces on a tap handle forming a couple with perpendicular separation 6 centimetres, and the perpendicular distance between lines of action for forces at an angle (`forces-couple`)
- **Motion and forces**: A sledge pulled by a rope at 35 degrees showing the horizontal and vertical components of the tension, friction and the displacement (`energy-work-angle`)
- **Motion and forces**: A roller coaster transferring gravitational potential energy to kinetic energy (`energy-ke-gpe`)
- **Motion and forces**: Force-extension graph with the triangle under it shaded as stored energy, and a rubber loading and unloading loop with the energy dissipated shaded (`energy-elastic-energy`)
- **Motion and forces**: A block on a 30 degree slope with its weight resolved into components along and into the slope, the normal contact force and friction (`forces-slope-forces`)
- **Motion and forces**: Table showing which of s, u, v, a and t each of the five suvat equations contains and the one it leaves out (`motion-suvat-chooser`)
- **Motion and forces**: Computed height-time and velocity-time graphs for a stone thrown upwards from a cliff, with the top of the flight and the impact marked (`motion-free-fall-graphs`)
- **Motion and forces**: Sankey diagram with 50 kilowatts of fuel power in, 15 kilowatts useful and 35 kilowatts wasted, drawn to scale (`energy-sankey-car`)
- **Motion and forces**: Distance follows the path actually taken. Displacement is measured in a straight line from start to finish, with a direction. (`motion-distance-follows-the-path-actually-taken-displacement`)
- **Motion and forces**: If velocity and acceleration point the same way the object speeds up; if they are opposite it slows down. (`motion-if-velocity-and-acceleration-point-the-same`)
- **Motion and forces**: The gradient of a displacement–time graph is the velocity. Steeper means faster; a negative gradient means moving in the negative direction. (`motion-the-gradient-of-a-displacement-time-graph`)
- **Motion and forces**: On a v–t graph the gradient is the acceleration and the area between the line and the time axis is the displacement. (`motion-on-a-v-t-graph-the-gradient`)
- **Motion and forces**: Take the gradient to move from s–t to v–t to a–t. Take the area to move back the other way. (`motion-take-the-gradient-to-move-from-s`)
- **Motion and forces**: The displacement is the total area: a rectangle (ut) plus a triangle (½ × t × at). (`motion-the-displacement-is-the-total-area-a`)
- **Motion and forces**: Switching off the magnet starts the timer; the ball opening the trapdoor stops it. Measure h from the bottom of the ball to the trapdoor. (`motion-switching-off-the-magnet-starts-the-timer`)
- **Motion and forces**: A ball fired vertically upwards from a trolley moving at constant velocity lands back in the trolley: it keeps the trolley's horizontal velocity throughout. (`motion-a-ball-fired-vertically-upwards-from-a`)
- **Motion and forces**: Resolve the launch velocity into components, then treat the two directions separately. Time is the link between them. (`motion-resolve-the-launch-velocity-into-components-then`)
- **Motion and forces**: Add forces along a line, taking one direction as positive. The resultant (net) force produces the acceleration. (`forces-add-forces-along-a-line-taking-one`)
- **Motion and forces**: Any force can be replaced by two perpendicular components that together have the same effect. (`forces-any-force-can-be-replaced-by-two`)
- **Motion and forces**: The moment of a force is the force times the perpendicular distance from the pivot to its line of action. (`forces-the-moment-of-a-force-is-the`)
- **Motion and forces**: The pressure at depth h is the weight of the column of liquid above an area, divided by that area. (`forces-the-pressure-at-depth-h-is-the`)
- **Motion and forces**: Upthrust comes from the pressure difference between the bottom and the top of the object. (`forces-upthrust-comes-from-the-pressure-difference-between`)
- **Materials**: Stress–strain graphs: ductile, brittle and polymeric (`materials-stress-strain`)
- **Momentum**: Conservation of momentum in a collision (`momentum-collisions`)
- **Momentum**: Impulse and force–time graphs (`momentum-impulse-force-time`)
- **Momentum**: Two trolleys pushed apart by a spring with equal and opposite momentum, and an elastic collision in which momentum and kinetic energy are both conserved (`momentum-explosion-elastic`)
- **Momentum**: Two pucks colliding at an angle with the momentum vectors drawn as a closed triangle and resolved into components (`momentum-collision-2d`)
- **Electricity**: Series and parallel circuits (`electricity-series-parallel`)
- **Electricity**: Potential divider and sensing circuit (`electricity-potential-divider`)
- **Electricity**: A 9 volt supply across 20 and 40 ohm resistors in series, in parallel with 30 ohms, with every current and potential difference labelled (`electricity-network-solved`)
- **Electricity**: A potential divider with a fixed resistor and a thermistor, and a computed graph of output voltage falling as temperature rises (`electricity-sensing-divider`)
- **Electricity**: Electrons drifting through a metal lattice from negative to positive against the conventional current, and positive and negative ions moving opposite ways in an electrolyte (`electricity-charge-carriers`)
- **Electricity**: The power equations P equals VI, I squared R and V squared over R linked through V equals IR, with a kettle example (`electricity-power-equations`)
- **Electricity**: The total current into a junction equals the total current out of it. (`electricity-the-total-current-into-a-junction-equals`)
- **Electricity**: In time t, every carrier in a length vt passes the end face. (`electricity-in-time-t-every-carrier-in-a`)
- **Electricity**: E.m.f.: energy transferred into electrical energy per coulomb. P.d.: electrical energy transferred into other forms per coulomb. (`electricity-e-m-f-energy-transferred-into-electrical`)
- **Waves and quantum**: Young's double slit and the diffraction grating (`waves-double-slit-and-grating`)
- **Waves and quantum**: Transverse and longitudinal waves (`waves-progressive-transverse-longitudinal`)
- **Waves and quantum**: The electromagnetic spectrum (`waves-electromagnetic-spectrum`)
- **Waves and quantum**: Refraction through a glass block (`waves-refraction-glass-block`)
- **Waves and quantum**: Photoelectric effect and the Planck constant from LEDs (`quantum-photoelectric-and-leds`)
- **Waves and quantum**: Speed of sound with a resonance tube (`waves-speed-of-sound-resonance-tube`)
- **Waves and quantum**: Diffraction through narrow and wide gaps (`waves-diffraction-gap`)
- **Waves and quantum**: Electron diffraction tube (`quantum-electron-diffraction`)
- **Waves and quantum**: Energy levels and line spectra (`quantum-energy-levels-spectra`)
- **Waves and quantum**: Graph of maximum kinetic energy against frequency for copper and sodium: parallel lines of gradient h with intercepts at the threshold frequency and minus the work function (`waves-photo-ke`)
- **Waves and quantum**: Wavefronts from two coherent sources with the lines of maxima where the path difference is a whole number of wavelengths and the minima between them (`waves-two-source`)
- **Thermal physics**: Heating curve: latent heat at the melting and boiling points (`thermal-heating-curve`)
- **Thermal physics**: Gas particles and pressure at two temperatures (`thermal-gas-pressure`)
- **Thermal physics**: Particles in solids, liquids and gases (`thermal-states-of-matter`)
- **Thermal physics**: Boyle's law apparatus and p against 1/V (`thermal-boyles-law`)
- **Thermal physics**: Maxwell–Boltzmann distribution (`thermal-maxwell-boltzmann`)
- **Thermal physics**: Pressure against volume for a fixed amount of gas at 290 K and 350 K, computed from pV equals nRT (`thermal-isotherms`)
- **Thermal physics**: A temperature difference of 1 K is the same as 1 °C; only the zero is different. (`thermal-a-temperature-difference-of-1-k-is`)
- **Thermal physics**: Solid: particles close together, vibrating about fixed positions. Liquid: close together but free to move past each other. Gas: far apart, moving fast and randomly. (`thermal-solid-particles-close-together-vibrating-about-fixed`)
- **Oscillations**: Simple harmonic motion: mass on a spring, pendulum, x, v and a graphs (`oscillations-shm`)
- **Oscillations**: Forced oscillations and resonance curves with damping (`oscillations-resonance`)
- **Oscillations**: Kinetic, potential and total energy against displacement for simple harmonic motion: two parabolas that add to a constant (`oscillations-shm-energy`)
- **Gravitation and astrophysics**: Circular orbit: gravity provides the centripetal force (`gravitation-orbits`)
- **Gravitation and astrophysics**: Life cycles of low-mass and massive stars (`astro-life-cycle-of-stars`)
- **Gravitation and astrophysics**: Gravitational potential against distance (`fields-potential`)
- **Gravitation and astrophysics**: Circular motion: velocity and centripetal force (`circular-motion`)
- **Gravitation and astrophysics**: Hertzsprung–Russell diagram (`astro-hr-diagram`)
- **Gravitation and astrophysics**: Black-body radiation curves (`astro-black-body`)
- **Gravitation and astrophysics**: Redshift and Hubble’s law (`astro-redshift-hubble`)
- **Gravitation and astrophysics**: An elliptical orbit with three equal-area sectors swept in equal times, and a graph of T squared against r cubed for the inner planets on a straight line (`gravity-kepler-laws`)
- **Gravitation and astrophysics**: Laser light passing through a diffraction grating producing orders at angles computed from d sin theta equals n lambda (`astro-grating-orders`)
- **Gravitation and astrophysics**: An object moving in a circle with velocity along the tangent and the resultant force towards the centre at two positions, and the velocity change pointing to the centre (`circular-centripetal`)
- **Gravitation and astrophysics**: Radial gravitational field lines pointing into the Earth and a graph of g falling as one over r squared from the surface (`gravity-grav-field`)
- **Gravitation and astrophysics**: Hubble graph of recession speed against distance with gradient H0, and the separation of galaxies run backwards to zero at about 14 billion years ago (`astro-hubble-age`)
- **Gravitation and astrophysics**: Stellar parallax: the Earth on opposite sides of its orbit sees a nearby star at angle p, defining the parsec (`astro-parallax`)
- **Gravitation and astrophysics**: Schematic timeline from the Big Bang through inflation, nucleosynthesis, the CMB, the first galaxies and accelerating expansion to today, and a pie chart of dark energy, dark matter and ordinary matter (`astro-universe-timeline`)
- **Gravitation and astrophysics**: Approximate sizes (diameters). The universe spans more than 20 orders of magnitude. (`astro-approximate-sizes-diameters-the-universe-spans-more`)
- **Electricity and fields**: Capacitor charging and discharging through a resistor (`electricity-capacitor-charge-discharge`)
- **Electricity and fields**: Electron beam in uniform electric and magnetic fields (`fields-charged-particles-e-and-b`)
- **Electricity and fields**: Magnetic field around a current-carrying wire (`fields-wire-and-grip-rule`)
- **Electricity and fields**: Field patterns of a bar magnet and a solenoid (`fields-magnet-and-solenoid`)
- **Electricity and fields**: Transformer: primary and secondary coils on an iron core (`fields-transformer`)
- **Electricity and fields**: Iterative model of capacitor discharge (`electricity-capacitor-model`)
- **Electricity and fields**: Radial and uniform fields with equipotentials (`fields-radial-uniform`)
- **Electricity and fields**: Electromagnetic induction: magnet and coil (`fields-induction`)
- **Electricity and fields**: The National Grid: power station, step-up transformer, transmission cables, step-down transformer and homes (`fields-grid`)
- **Electricity and fields**: An electron moving in a circle in a magnetic field into the page with the force towards the centre, and a velocity selector with balanced electric and magnetic forces (`fields-magnetic-path`)
- **Electricity and fields**: Capacitor plates carrying equal and opposite charge, with 2 and 3 microfarad capacitors combined in series and in parallel across 10 volts (`fields-capacitor-combine`)
- **Electricity and fields**: Graph of p.d. against charge for a capacitor with the triangular area of 18 millijoules shaded and the 36 millijoule rectangle supplied by the battery outlined (`fields-cap-energy`)
- **Electricity and fields**: Graphs of potential against distance for positive and negative point charges, and circular equipotentials around a positive charge at equal steps of 30 volts (`fields-potential-charge`)
- **Nuclear and particle physics**: Rutherford alpha-particle scattering (`nuclear-rutherford-scattering`)
- **Nuclear and particle physics**: Models of the atom (`nuclear-models-of-the-atom`)
- **Nuclear and particle physics**: Alpha, beta and gamma penetration (`nuclear-radiation-penetration`)
- **Nuclear and particle physics**: Induced fission and a chain reaction (`nuclear-fission-chain-reaction`)
- **Nuclear and particle physics**: Binding energy per nucleon (`nuclear-binding-energy`)
- **Nuclear and particle physics**: Exponential decay and the log graph (`nuclear-decay-curves`)
- **Nuclear and particle physics**: Fusion of deuterium and tritium (`nuclear-fusion`)
- **Nuclear and particle physics**: An alpha particle approaching a gold nucleus head-on to a distance of closest approach, and a straight-line graph of nuclear radius against the cube root of nucleon number (`nuclear-nuclear-size`)
- **Nuclear and particle physics**: Graph of the natural log of activity against time for protactinium-234m giving a straight line of gradient minus lambda (`nuclear-ln-activity`)
- **Nuclear and particle physics**: In β⁻ decay a down quark changes into an up quark, emitting an electron and an electron antineutrino. (`nuclear-in-decay-a-down-quark-changes-into`)
- **Medical imaging**: X-ray tube (`medical-x-ray-tube`)
- **Medical imaging**: Gamma camera (`medical-gamma-camera`)
- **Medical imaging**: Ultrasound transducer and A-scan (`medical-ultrasound-a-scan`)
- **Medical imaging**: X-ray attenuation and contrast media (`medical-attenuation`)
- **Medical imaging**: CAT scanner (`medical-ct-scanner`)
- **Medical imaging**: PET scanner (`medical-pet-scanner`)
- **Medical imaging**: Acoustic impedance and reflection (`medical-acoustic-impedance`)
- **Medical imaging**: Doppler ultrasound (`medical-doppler-ultrasound`)
- **Exam question figures**: Exam question figure (Displacement–time graphs): The graph shows how the displacement of a remote-controlled car changes with time. (`motion-exam-question-the-graph-shows-how-the-displacement-of`)
- **Exam question figures**: Exam question figure (Velocity–time and acceleration–time graphs): The velocity–time graph shows a car travelling between two sets of traffic lights. It accelerates uniformly from rest to 15 m s⁻¹ in 6.0 s, travels at constant velocity until t = 16 s, then decelerates uniformly to rest  (`motion-exam-question-the-velocity-time-graph-shows-a-car`)
- **Exam question figures**: Exam question figure (Mixed exam paper: motion): The velocity–time graph shows the motion of a cyclist along a straight road. (`motion-exam-question-the-velocity-time-graph-shows-the-motion`)
- **Exam question figures**: Exam question figure (Resolving forces and motion on a slope): A sledge of mass 25 kg slides down a straight slope inclined at 20° to the horizontal. The frictional force on the sledge is 30 N. (`forces-exam-question-a-sledge-of-mass-25-kg-slides`)
- **Exam question figures**: Exam question figure (Moments and the principle of moments): A uniform plank of length 4.0 m and weight 200 N rests on two supports. Support A is at one end and support B is 1.0 m from the other end. A child of weight 300 N stands 1.0 m from A. (`forces-exam-question-a-uniform-plank-of-length-4-0`)
- **Exam question figures**: Exam question figure (Mixed exam paper: forces in action): A uniform horizontal beam of length 5.0 m and weight 600 N is hinged to a wall at one end. It is held horizontal by a cable attached to its other end, making an angle of 30° with the beam. A load of 400 N hangs 4.0 m fro (`forces-exam-question-a-uniform-horizontal-beam-of-length-5`)
- **Exam question figures**: Exam question figure (Force–extension graphs and elastic potential energy): The graph shows how the force needed to stretch the elastic of a catapult varies with extension. The elastic obeys Hooke's law. (`energy-exam-question-the-graph-shows-how-the-force-needed`)
- **Exam question figures**: Exam question figure (Mixed exam paper: energy, materials and momentum): The graph shows how the force on a tennis ball varies with time while it is in contact with a racket. The ball has a mass of 0.058 kg and arrives at the racket at 25 m s⁻¹. (`energy-exam-question-the-graph-shows-how-the-force-on`)
- **Exam question figures**: Exam question figure (Series and parallel circuits; Kirchhoff's second law): A 12 V battery of negligible internal resistance is connected to three resistors as shown. (`electricity-exam-question-a-12-v-battery-of-negligible-internal`)
- **Exam question figures**: Exam question figure (E.m.f. and internal resistance): A battery of e.m.f. 4.5 V and internal resistance 0.60 Ω is connected to a 2.4 Ω resistor. (`electricity-exam-question-a-battery-of-e-m-f-4`)
- **Exam question figures**: Exam question figure (Electricity: review and exam practice): A battery of e.m.f. 12.0 V and internal resistance 0.50 Ω is connected to two identical lamps in parallel. Each lamp has a resistance of 6.0 Ω. (`electricity-exam-question-a-battery-of-e-m-f-12`)
- **Exam question figures**: Exam question figure (Mixed exam paper: electricity): The circuit shows a 9.0 V battery of negligible internal resistance connected to a resistor R₁ of 1.0 kΩ, a resistor R₂ of 3.0 kΩ and an NTC thermistor T. At 20 °C the resistance of the thermistor is 6.0 kΩ. (`electricity-exam-question-the-circuit-shows-a-9-0-v`)
- **Exam question figures**: Exam question figure (Mixed exam paper: waves and quantum physics): The graph shows the displacement of particles against distance along a wave at one instant. The wave travels at 12 m s⁻¹. (`waves-exam-question-the-graph-shows-the-displacement-of-particles`)
- **Exam question figures**: Exam question figure (Mixed exam paper: circular motion, oscillations and gravitation): A student investigates the motion of a mass hanging from a spring. The graph shows the displacement of the mass against time. (`gravity-exam-question-a-student-investigates-the-motion-of-a`)
- **Exam question figures**: Exam question figure (Mixed exam paper: capacitors, electric fields and electromagnetism): A 470 μF capacitor is charged to 12.0 V and then discharged through a resistor. The graph shows how the p.d. across the capacitor varies with time. (`fields-exam-question-a-470-f-capacitor-is-charged-to`)
- **Exam question figures**: Exam question figure (Paper 1: Modelling physics): The graph shows the stress–strain graph for a metal wire, up to the point where the wire breaks. (`exam-paper-fp1-the-graph-shows-the-stress-strain-graph`)
- **Exam question figures**: Exam question figure (Paper 2: Exploring physics): The circuit is used as a temperature sensor. The battery has negligible internal resistance. The thermistor T is a negative temperature coefficient (NTC) thermistor. (`exam-paper-fp2-the-circuit-is-used-as-a-temperature`)
- **Exam question figures**: Exam question figure (Paper 2: Exploring physics): A student varies the external resistance connected to a cell and measures the terminal p.d. V and the current I. The graph shows the results. (`exam-paper-fp2-a-student-varies-the-external-resistance-connected`)
- **Exam question figures**: Exam question figure (Paper 2: Exploring physics (Set 2)): The circuit is used to monitor the temperature of a greenhouse. The thermistor is an NTC thermistor; its resistance is 4.7 kΩ at 25 °C and 1.2 kΩ at 60 °C. The battery has negligible internal resistance. (`exam-paper-fp5-the-circuit-is-used-to-monitor-the`)

## Making more or changing one

The diagrams are drawn by code, so a change made in the figure library can be re-exported for every diagram at once
(`export.py`, needs Python with Playwright). Figures accept options, for example a different element for the atom
(`{"Z": 19}` for potassium) or the number of turns on each transformer coil (`{"np": 10, "ns": 2}`).

To refresh everything after the site changes, serve the repos folder (`python3 -m http.server 8800` from the folder
that contains `ALevelPhysics`), then from the repo root run:

```
python3 diagram-library/export.py                 # realistic figures
node diagram-library/export-site-figures.cjs      # lesson figures and exam-question figures
node diagram-library/export-animations.cjs        # animations
node diagram-library/build-index.cjs              # browsing pages and this README's list
```
