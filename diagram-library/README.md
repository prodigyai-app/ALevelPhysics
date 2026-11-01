# A level Physics diagram library

38 realistic A level Physics diagrams, exported from the shared figure library used on the prodigyai revision sites
(`ALevelPhysics/platform/client/science-figures.js` and `science-figures-2.js`).

Open `index.html` to browse them.

| Folder | Contents |
|---|---|
| `svg/` | Scalable vector files on a white background. They stay sharp at any size, and PowerPoint can convert them to editable shapes (Insert ▸ Pictures, then right-click ▸ Convert to Shape). |
| `png-light/` | 2× PNG images on white, for slides, worksheets and printing. |
| `png-dark/` | 2× PNG images on a dark background, for dark slide templates. |
| `diagrams.json` | The list of diagrams: file name, topic, description and the figure options used. |

File names start with the topic (energy, particle, electricity, magnetism, atomic, forces, waves, space).

## Diagrams

- **Practical skills**: Young modulus: long wire, pulley, marker and fixed scale (`practical-young-modulus`)
- **Practical skills**: E.m.f. and internal resistance: circuit and V against I graph (`practical-emf-internal-resistance`)
- **Practical skills**: Specific heat capacity: heater and thermometer in an insulated block (`practical-specific-heat-capacity`)
- **Practical skills**: Specific latent heat of fusion with a control funnel (`practical-specific-latent-heat`)
- **Practical skills**: Resistance of a wire against length (resistivity) (`practical-resistivity`)
- **Practical skills**: I–V characteristics: resistor, filament lamp and diode (`practical-iv-characteristics`)
- **Practical skills**: Density of regular and irregular solids (`practical-density`)
- **Practical skills**: Ripple tank and stationary waves on a string (`practical-stationary-waves`)
- **Motion and forces**: Thinking and braking distances (`motion-stopping-distances`)
- **Motion and forces**: Spring extension and force–extension graph (`forces-springs-hookes-law`)
- **Motion and forces**: Pressure increases with depth: p = hρg (`forces-pressure-in-a-liquid`)
- **Electricity**: Series and parallel circuits (`electricity-series-parallel`)
- **Electricity and fields**: Capacitor charging and discharging through a resistor (`electricity-capacitor-charge-discharge`)
- **Electricity and fields**: Electron beam in uniform electric and magnetic fields (`fields-charged-particles-e-and-b`)
- **Electricity and fields**: Magnetic field around a current-carrying wire (`fields-wire-and-grip-rule`)
- **Electricity and fields**: Field patterns of a bar magnet and a solenoid (`fields-magnet-and-solenoid`)
- **Electricity and fields**: Transformer: primary and secondary coils on an iron core (`fields-transformer`)
- **Waves and quantum**: Young's double slit and the diffraction grating (`waves-double-slit-and-grating`)
- **Waves and quantum**: Transverse and longitudinal waves (`waves-progressive-transverse-longitudinal`)
- **Waves and quantum**: The electromagnetic spectrum (`waves-electromagnetic-spectrum`)
- **Waves and quantum**: Refraction through a glass block (`waves-refraction-glass-block`)
- **Waves and quantum**: Photoelectric effect and the Planck constant from LEDs (`quantum-photoelectric-and-leds`)
- **Thermal physics**: Heating curve: latent heat at the melting and boiling points (`thermal-heating-curve`)
- **Thermal physics**: Gas particles and pressure at two temperatures (`thermal-gas-pressure`)
- **Thermal physics**: Particles in solids, liquids and gases (`thermal-states-of-matter`)
- **Nuclear and particle physics**: Rutherford alpha-particle scattering (`nuclear-rutherford-scattering`)
- **Nuclear and particle physics**: Models of the atom (`nuclear-models-of-the-atom`)
- **Nuclear and particle physics**: Alpha, beta and gamma penetration (`nuclear-radiation-penetration`)
- **Nuclear and particle physics**: Induced fission and a chain reaction (`nuclear-fission-chain-reaction`)
- **Gravitation and astrophysics**: Circular orbit: gravity provides the centripetal force (`gravitation-orbits`)
- **Gravitation and astrophysics**: Life cycles of low-mass and massive stars (`astro-life-cycle-of-stars`)
- **Oscillations**: Simple harmonic motion: mass on a spring, pendulum, x, v and a graphs (`oscillations-shm`)
- **Oscillations**: Forced oscillations and resonance curves with damping (`oscillations-resonance`)
- **Thermal physics**: Boyle's law apparatus and p against 1/V (`thermal-boyles-law`)
- **Waves and quantum**: Speed of sound with a resonance tube (`waves-speed-of-sound-resonance-tube`)
- **Medical imaging**: X-ray tube (`medical-x-ray-tube`)
- **Medical imaging**: Gamma camera (`medical-gamma-camera`)
- **Medical imaging**: Ultrasound transducer and A-scan (`medical-ultrasound-a-scan`)

## Making more or changing one

The diagrams are drawn by code, so a change made in the figure library can be re-exported for every diagram at once
(`export.py`, needs Python with Playwright). Figures accept options, for example a different element for the atom
(`{"Z": 19}` for potassium) or the number of turns on each transformer coil (`{"np": 10, "ns": 2}`).
