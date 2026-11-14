/* Astrophysics and cosmology (a1–a10): extra worked examples, fill-the-gaps and exam-style questions.
   Constants as in the module: h = 6.63e-34, c = 3.00e8, e = 1.60e-19, σ = 5.67e-8, Wien constant 2.9e-3 m K,
   1 pc = 3.1e16 m, 1 year = 3.16e7 s, G = 6.67e-11. Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const tbl = (head, rows) => `<div class="tbl-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const mp = t => `<b>${t}</b>`; // a marking point inside a model answer

  /* ---------------- a1 Objects in the universe and the formation of stars ---------------- */
  add('a1', {
    ex: [
      ['A model answer: why a main-sequence star is stable', 'Explain why a star on the main sequence stays the same size, and what happens if its core becomes slightly hotter. (4 marks)', [
        ['Name the two effects', 'One mark for each, with its direction.', [`${mp('Gravity')} acts inwards on every part of the star.`, `${mp('Gas pressure and radiation pressure')} from the hot core act outwards.`]],
        ['Say that they balance', 'The word examiners look for is equilibrium.', [`The star is in ${mp('equilibrium')}: the outward pressure balances the inward gravitational force, so the radius does not change.`]],
        ['Follow the change through', 'Take the disturbance one step at a time.', [`Hotter core → higher pressure → the star ${mp('expands and cools')} → the fusion rate falls → the pressure drops back.`]],
        ['Finish with the consequence', '', [res('The balance corrects itself, so the star is stable for as long as it has hydrogen to fuse in its core.')]]
      ], { desc: true }],
      ['Distances as light travel times', 'Light travels at 3.00 × 10⁸ m s⁻¹. Calculate the time light takes to travel (a) from the Sun to the Earth, 1.5 × 10¹¹ m, (b) across the Milky Way, 1.0 × 10²¹ m. Take 1 year = 3.16 × 10⁷ s.', [
        ['Sun to Earth', '', [`t = ${fr('1.5 × 10¹¹', '3.00 × 10⁸')} = 500 s`, res('about 8.3 minutes')]],
        ['Across the galaxy, in seconds', '', [`t = ${fr('1.0 × 10²¹', '3.00 × 10⁸')} = 3.33 × 10¹² s`]],
        ['Convert to years', 'A sensible unit makes the answer meaningful.', [`t = ${fr('3.33 × 10¹²', '3.16 × 10⁷')}`, res('about 1.1 × 10⁵ years')]],
        ['What it means', '', ['We see the Sun as it was 8 minutes ago, and the far side of the galaxy as it was about 100 000 years ago.']]
      ], { chk: [['1.5e11/3e8', 500], ['500/60', 8.33], ['1e21/3e8', 3.33e12], ['1e21/3e8/3.16e7', 1.055e5]] }],
      ['From nebula to star: how much denser?', 'A cloud of gas of mass 2.0 × 10³⁰ kg and radius 1.0 × 10¹⁵ m collapses to form a star of radius 7.0 × 10⁸ m. Compare the mean densities.', [
        ['Density of the cloud', 'Mean density = mass ÷ volume of a sphere.', [`V = ⁴⁄₃π(1.0 × 10¹⁵)³ = 4.19 × 10⁴⁵ m³`, `ρ = ${fr('2.0 × 10³⁰', '4.19 × 10⁴⁵')} = 4.8 × 10⁻¹⁶ kg m⁻³`]],
        ['Density of the star', '', [`V = ⁴⁄₃π(7.0 × 10⁸)³ = 1.44 × 10²⁷ m³`, `ρ = ${fr('2.0 × 10³⁰', '1.44 × 10²⁷')} = 1.4 × 10³ kg m⁻³`]],
        ['Ratio', 'The trap: the radius ratio must be cubed.', [`${fr('ρ(star)', 'ρ(cloud)')} = (${fr('1.0 × 10¹⁵', '7.0 × 10⁸')})³`, res('about 3 × 10¹⁸ times denser')]],
        ['Link to the physics', '', ['The collapse transfers gravitational potential energy to the kinetic energy of the particles, which is why the core reaches the 10⁷ K needed for fusion.']]
      ], { chk: [['4/3*pi*1e45', 4.19e45], ['2e30/(4/3*pi*1e45)', 4.77e-16, 0.01], ['2e30/(4/3*pi*7e8**3)', 1.39e3, 0.01], ['(1e15/7e8)**3', 2.9e18, 0.02]] }]
    ],
    gaps: [
      { q: 'The Sun is 1.5 × 10¹¹ m from the Earth. How long does its light take to arrive?', lines: ['t = distance ÷ speed = 1.5 × 10¹¹ ÷ 3.00 × 10⁸ = [[500]] s', 'in minutes: 500 ÷ 60 = [[8.3]] minutes'], calc: ['1.5e11/3e8', '1.5e11/3e8/60'], why: 'Light-travel time is a natural way to state astronomical distances.' },
      { q: 'A protostar has mass 4.0 × 10³⁰ kg and volume 2.0 × 10²⁷ m³. Find its mean density.', lines: ['ρ = m ÷ V = 4.0 × 10³⁰ ÷ 2.0 × 10²⁷ = [[2000]] kg m⁻³'], calc: ['4e30/2e27'], why: 'About twice the density of water, even though the core is far denser.' }
    ],
    exam: [
      { stem: '<p>The Sun radiates energy at a rate of 3.8 × 10²⁶ W. This energy comes from the fusion of hydrogen in its core. The mass of the Sun is 2.0 × 10³⁰ kg.</p>', parts: [
        { q: 'Explain why fusion happens only in the core of the Sun and not in its outer layers.', m: 2, lines: 3, ms: [['B1', 'Nuclei are positively charged and repel, so they must approach at very high speed to get close enough to fuse'], ['B1', 'Only the core is hot (and dense) enough, about 10⁷ K, for nuclei to have this kinetic energy']] },
        { q: 'Use E = mc² to calculate the mass the Sun loses each second.', m: 2, ans: { a: 4.22e9, unit: 'kg', tol: 0.02 }, calc: '3.8e26/9e16', ms: [['C1', 'm = E ÷ c² = 3.8 × 10²⁶ ÷ (3.00 × 10⁸)²'], ['A1', 'm = 4.2 × 10⁹ kg each second']] },
        { q: 'During its main-sequence life, about 10 % of the Sun’s mass is fused, and 0.70 % of the mass fused is converted to energy. Estimate the main-sequence lifetime of the Sun in years. (1 year = 3.16 × 10⁷ s)', m: 3, ans: { a: 1.05e10, unit: 'years', tol: 0.03 }, calc: '0.10*0.0070*2.0e30*9e16/3.8e26/3.16e7', ms: [['C1', 'mass converted = 0.10 × 0.0070 × 2.0 × 10³⁰ = 1.4 × 10²⁷ kg'], ['C1', 'energy = 1.4 × 10²⁷ × (3.00 × 10⁸)² = 1.26 × 10⁴⁴ J, so t = 1.26 × 10⁴⁴ ÷ 3.8 × 10²⁶ = 3.3 × 10¹⁷ s'], ['A1', 't = 1.0 × 10¹⁰ years']] },
        { q: 'Which list is in order of increasing size?', m: 1, opts: ['comet, planet, galaxy, solar system', 'planet, comet, solar system, galaxy', 'comet, planet, solar system, galaxy', 'planet, solar system, comet, galaxy'], a: 2, why: 'A comet nucleus is a few kilometres across; a planet thousands of kilometres; a solar system about 10¹³ m; a galaxy about 10²¹ m.' }] }
    ]
  });

  /* ---------------- a2 Evolution of low-mass and massive stars ---------------- */
  add('a2', {
    ex: [
      ['A model answer: what decides how a star ends?', 'Explain how the mass of a star’s core determines the object that remains at the end of its life. (5 marks)', [
        ['Low-mass stars', 'State the limit and what holds the remnant up.', [`Core below the ${mp('Chandrasekhar limit, 1.44 M☉')}: the star sheds its outer layers as a planetary nebula and the core becomes a ${mp('white dwarf')}, supported by ${mp('electron degeneracy pressure')}.`]],
        ['Above the limit', 'Say what fails.', [`Core above 1.44 M☉: electron degeneracy pressure cannot support it. The core collapses, protons and electrons combine to form neutrons, and the outer layers are thrown off in a ${mp('supernova')}.`]],
        ['The two massive remnants', '', [`The remnant is a ${mp('neutron star')} (supported by neutron degeneracy pressure), or, if the core is above about 3 M☉, nothing can stop the collapse and a ${mp('black hole')} forms.`]],
        ['Check against the question', 'Each remnant is tied to a core mass and a reason: that is what earns the marks.', [res('white dwarf < 1.44 M☉ < neutron star < about 3 M☉ < black hole')]]
      ], { desc: true }],
      ['Density of a neutron star', 'A neutron star has mass 2.8 × 10³⁰ kg and radius 12 km. Calculate its mean density and compare it with the density of nuclear matter, 2.3 × 10¹⁷ kg m⁻³.', [
        ['Volume', 'Convert km to m before cubing.', ['r = 1.2 × 10⁴ m', 'V = ⁴⁄₃π(1.2 × 10⁴)³ = 7.24 × 10¹² m³']],
        ['Density', '', [`ρ = ${fr('2.8 × 10³⁰', '7.24 × 10¹²')}`, res('ρ = 3.9 × 10¹⁷ kg m⁻³')]],
        ['Compare', '', ['This is about 1.7 times the density of an atomic nucleus: a neutron star is, in effect, one enormous nucleus.']]
      ], { chk: [['4/3*pi*1.2e4**3', 7.24e12], ['2.8e30/(4/3*pi*1.2e4**3)', 3.87e17], ['2.8e30/(4/3*pi*1.2e4**3)/2.3e17', 1.68, 0.02]] }],
      ['Escape velocity: why black holes are black', `Use v = √(${fr('2GM', 'r')}) to find the escape velocity from the surface of (a) a white dwarf of mass 1.2 × 10³⁰ kg and radius 6.0 × 10⁶ m, (b) a neutron star of mass 2.8 × 10³⁰ kg and radius 1.2 × 10⁴ m.`, [
        ['White dwarf', '', [`v = √(${fr('2 × 6.67 × 10⁻¹¹ × 1.2 × 10³⁰', '6.0 × 10⁶')})`, res('v = 5.2 × 10⁶ m s⁻¹, about 2 % of the speed of light')]],
        ['Neutron star', '', [`v = √(${fr('2 × 6.67 × 10⁻¹¹ × 2.8 × 10³⁰', '1.2 × 10⁴')})`, res('v = 1.8 × 10⁸ m s⁻¹, about 60 % of the speed of light')]],
        ['The limit', 'A slightly more massive or more compact core takes this past c.', ['A black hole is an object whose escape velocity is greater than the speed of light, so not even light can leave it.']]
      ], { chk: [['sqrt(2*G*1.2e30/6e6)', 5.17e6], ['sqrt(2*G*2.8e30/1.2e4)', 1.76e8], ['sqrt(2*G*2.8e30/1.2e4)/c', 0.59, 0.01]] }]
    ],
    gaps: [
      { q: 'The Chandrasekhar limit is 1.44 M☉, where M☉ = 2.0 × 10³⁰ kg. Express it in kilograms.', lines: ['1.44 × 2.0 × 10³⁰ = [[2.88e30]] kg'], calc: ['1.44*2.0e30'], why: 'A core heavier than this cannot remain a white dwarf.' },
      { q: 'A white dwarf has mass 1.0 × 10³⁰ kg and volume 5.0 × 10²⁰ m³.', lines: ['ρ = m ÷ V = [[2.0e9]] kg m⁻³', 'One cubic centimetre (10⁻⁶ m³) has mass [[2000]] kg'], calc: ['1e30/5e20', '1e30/5e20*1e-6'], why: 'A sugar-cube of white dwarf has a mass of about two tonnes.' }
    ],
    exam: [
      { stem: '<p>A star of mass 15 M☉ ends its life in a supernova, leaving a neutron star.</p>', parts: [
        { q: 'State what is meant by the Chandrasekhar limit.', m: 1, lines: 2, ms: [['B1', 'The maximum mass of a stellar core that electron degeneracy pressure can support (1.44 M☉); above it the core cannot remain a white dwarf']] },
        { q: 'Explain how a supernova is important for the existence of elements heavier than iron on Earth.', m: 2, lines: 3, ms: [['B1', 'Fusion in stars releases energy only up to iron; heavier elements are formed in the supernova (by rapid neutron capture)'], ['B1', 'The explosion scatters these elements into space, where they become part of the clouds from which later stars and planets form']] },
        { q: 'The neutron star has mass 3.0 × 10³⁰ kg and radius 11 km. Calculate its mean density.', m: 2, ans: { a: 5.38e17, unit: 'kg m⁻³', tol: 0.02 }, calc: '3.0e30/(4/3*pi*1.1e4**3)', ms: [['C1', 'V = ⁴⁄₃π(1.1 × 10⁴)³ = 5.58 × 10¹² m³'], ['A1', 'ρ = 3.0 × 10³⁰ ÷ 5.58 × 10¹² = 5.4 × 10¹⁷ kg m⁻³']] },
        { q: 'State what would have formed instead if the core left by the supernova had a mass of 5 M☉, and describe this object.', m: 1, lines: 2, ms: [['B1', 'A black hole: an object so dense that its escape velocity exceeds the speed of light, so nothing, including light, can escape']] }] }
    ]
  });

  /* ---------------- a3 The Hertzsprung–Russell diagram ---------------- */
  add('a3', {
    ex: [
      ['How big is a red giant?', 'A red giant has surface temperature 3500 K and luminosity 400 L☉. The Sun has surface temperature 5800 K. Find the radius of the red giant in solar radii.', [
        ['Write Stefan’s law as a ratio', 'L = 4πr²σT⁴, so the constants cancel when two stars are compared.', [`${fr('L', 'L☉')} = (${fr('r', 'r☉')})² (${fr('T', 'T☉')})⁴`]],
        ['Rearrange for the radius ratio', '', [`${fr('r', 'r☉')} = √(${fr('L', 'L☉')}) × (${fr('T☉', 'T')})²`]],
        ['Substitute', '', [`${fr('r', 'r☉')} = √400 × (${fr('5800', '3500')})² = 20 × 2.75`, res('r ≈ 55 r☉')]],
        ['Make sense of it', '', ['The star is cool, so each square metre emits little power. It can only be 400 times as luminous as the Sun by having about 3000 times the surface area.']]
      ], { chk: [['sqrt(400)*(5800/3500)**2', 54.9], ['(5800/3500)**2', 2.746], ['54.9**2', 3014, 0.01]] }],
      ['A model answer: placing stars on the diagram', 'Three stars have these properties. P: 30 000 K, 10⁴ L☉. Q: 3000 K, 10³ L☉. R: 10 000 K, 10⁻² L☉. State the type of each star and justify your answer. (6 marks)', [
        ['Remember the axes', 'Luminosity increases upwards; temperature increases to the LEFT.', ['top left = hot and bright;  top right = cool and bright;  bottom left = hot and dim']],
        ['Star P', '', [`Hot and very luminous: on the upper part of the ${mp('main sequence')} (a massive, blue star).`]],
        ['Star Q', 'Cool but bright can only mean a large surface area.', [`Cool but luminous, so it must be very large: a ${mp('red giant')} (top right).`]],
        ['Star R', '', [`Hot but very dim, so it must be very small: a ${mp('white dwarf')} (bottom left).`]],
        ['Why the reasoning earns marks', '', [res('Each identification is justified using L = 4πr²σT⁴: for a given temperature, luminosity tells you the size.')]]
      ], { desc: true }],
      ['Trap: same luminosity, different temperature', 'Stars A and B have the same luminosity. A has surface temperature 12 000 K and B has 4000 K. Which is larger, and by what factor?', [
        ['Do not assume hotter means bigger', 'On the HR diagram A is to the left of B at the same height.', ['Equal L means r²T⁴ is the same for both.']],
        ['Compare', '', [`r_A² T_A⁴ = r_B² T_B⁴, so ${fr('r_B', 'r_A')} = (${fr('T_A', 'T_B')})²`]],
        ['Calculate', '', [`${fr('r_B', 'r_A')} = (${fr('12 000', '4000')})² = 3²`, res('B has 9 times the radius of A')]],
        ['Interpret', '', ['The cooler star needs 81 times the area to give out the same power, because each square metre emits 3⁴ = 81 times less.']]
      ], { chk: [['(12000/4000)**2', 9], ['3**4', 81]] }]
    ],
    gaps: [
      { q: 'A star has twice the radius of the Sun and twice its surface temperature. Find its luminosity in L☉.', lines: ['L ∝ r²T⁴', 'L = 2² × 2⁴ = [[64]] L☉'], calc: ['2**2*2**4'], why: 'Temperature matters far more than radius because it is raised to the fourth power.' },
      { q: 'A white dwarf has luminosity 0.010 L☉ and twice the surface temperature of the Sun. Find its radius in r☉.', lines: ['r/r☉ = √(L/L☉) × (T☉/T)²', '√0.010 = [[0.1]]', 'r = 0.10 × (½)² = [[0.025]] r☉'], calc: ['sqrt(0.010)', 'sqrt(0.010)*0.25'], why: 'About the size of the Earth compared with the Sun.' }
    ],
    exam: [
      { stem: '<p>The table gives data for three stars. The surface temperature of the Sun is 5800 K.</p>' + tbl(['Star', 'Surface temperature / K', 'Luminosity / L☉'], [['X', '25 000', '2.0 × 10⁴'], ['Y', '3200', '5.0 × 10³'], ['Z', '12 000', '2.0 × 10⁻³']]), parts: [
        { q: 'Identify the region of the HR diagram in which each star lies.', m: 3, lines: 3, ms: [['B1', 'X: main sequence (upper left: hot and luminous)'], ['B1', 'Y: red giant (or supergiant) region, top right'], ['B1', 'Z: white dwarf region, bottom left']] },
        { q: 'Calculate the radius of star Y in solar radii.', m: 3, ans: { a: 232, unit: 'r☉', tol: 0.03 }, calc: 'sqrt(5.0e3)*(5800/3200)**2', ms: [['C1', 'L ∝ r²T⁴, so r/r☉ = √(L/L☉) × (T☉/T)²'], ['C1', '√(5.0 × 10³) = 70.7 and (5800 ÷ 3200)² = 3.29'], ['A1', 'r = 230 r☉']] },
        { q: 'Explain why star Y is far more luminous than the Sun although its surface is cooler.', m: 1, lines: 2, ms: [['B1', 'Each square metre of Y emits less power, but its surface area is so much larger (about 50 000 times) that the total power emitted is greater']] }] }
    ]
  });

  /* ---------------- a4 Energy levels, photons and line spectra ---------------- */
  add('a4', {
    ex: [
      ['Which photons can a hydrogen atom absorb?', 'A hydrogen atom is in its ground state (−13.6 eV). The next levels are −3.40 eV and −1.51 eV. Photons of energy 10.2 eV, 11.0 eV and 12.09 eV pass through the gas. Which can be absorbed? Find the wavelength of the lowest-energy photon absorbed.', [
        ['Energy differences from the ground state', 'A photon is absorbed only if its energy exactly matches a difference between two levels.', ['n = 1 → 2: −3.40 − (−13.6) = 10.2 eV', 'n = 1 → 3: −1.51 − (−13.6) = 12.09 eV']],
        ['Compare', '', ['10.2 eV: absorbed.  12.09 eV: absorbed.  11.0 eV: not absorbed, because no level lies 11.0 eV above the ground state.']],
        ['Wavelength of the 10.2 eV photon', 'Convert eV to J first.', ['E = 10.2 × 1.60 × 10⁻¹⁹ = 1.63 × 10⁻¹⁸ J', `λ = ${fr('hc', 'E')} = ${fr('6.63 × 10⁻³⁴ × 3.00 × 10⁸', '1.63 × 10⁻¹⁸')}`, res('λ = 1.22 × 10⁻⁷ m (ultraviolet)')]]
      ], { chk: [['-3.40+13.6', 10.2], ['-1.51+13.6', 12.09], ['10.2*e', 1.632e-18], ['h*c/(10.2*e)', 1.219e-7]] }],
      ['Trap: ionisation and the sign of the levels', 'The ground state of hydrogen is −13.6 eV. Calculate the minimum frequency of radiation that can ionise a hydrogen atom in its ground state, and the corresponding wavelength.', [
        ['What ionisation means', 'The electron must be raised to the zero level, where it is free.', ['energy needed = 0 − (−13.6) = +13.6 eV']],
        ['Convert', 'The trap: putting 13.6 straight into E = hf without converting to joules.', ['E = 13.6 × 1.60 × 10⁻¹⁹ = 2.18 × 10⁻¹⁸ J']],
        ['Frequency', '', [`f = ${fr('E', 'h')} = ${fr('2.18 × 10⁻¹⁸', '6.63 × 10⁻³⁴')}`, res('f = 3.28 × 10¹⁵ Hz')]],
        ['Wavelength', '', [`λ = ${fr('c', 'f')}`, res('λ = 9.1 × 10⁻⁸ m (91 nm, ultraviolet)')]]
      ], { chk: [['13.6*e', 2.176e-18], ['13.6*e/h', 3.28e15], ['c/(13.6*e/h)', 9.14e-8]] }]
    ],
    gaps: [
      { q: 'An electron in a hydrogen atom falls from n = 4 (−0.85 eV) to n = 2 (−3.40 eV). Find the wavelength of the photon emitted.', lines: ['ΔE = 3.40 − 0.85 = [[2.55]] eV', 'ΔE = 2.55 × 1.60 × 10⁻¹⁹ = [[4.08e-19]] J', 'λ = hc ÷ ΔE = [[4.88e-7]] m'], calc: ['3.40-0.85', '2.55*e', 'h*c/(2.55*e)'], why: 'This is the blue-green Hβ line at 488 nm in this model.' },
      { q: 'Atoms are excited to the n = 4 level. How many different photon energies can be emitted as they return to the ground state?', lines: ['From n = 4 there are 3 possible downward jumps, from n = 3 there are 2, and from n = 2 there is 1.', 'total = 3 + 2 + 1 = [[6]]'], calc: ['3+2+1'], why: 'Each pair of levels gives one line.' },
      { q: 'A photon has wavelength 656 nm. Find its energy in electronvolts.', lines: ['E = hc ÷ λ = 6.63 × 10⁻³⁴ × 3.00 × 10⁸ ÷ 656 × 10⁻⁹ = [[3.03e-19]] J', 'E = 3.03 × 10⁻¹⁹ ÷ 1.60 × 10⁻¹⁹ = [[1.9]] eV'], calc: ['h*c/656e-9', 'h*c/656e-9/e'], why: 'This matches the n = 3 to n = 2 transition in hydrogen (1.89 eV).' }
    ],
    exam: [
      { stem: '<p>Four of the energy levels of an atom are at −10.4 eV (the ground state), −5.5 eV, −3.7 eV and −1.6 eV.</p>', parts: [
        { q: 'Calculate the longest wavelength of radiation that can be emitted by transitions between these four levels.', m: 3, ans: { a: 6.91e-7, unit: 'm', tol: 0.02 }, calc: 'h*c/(1.8*e)', ms: [['C1', 'The longest wavelength comes from the smallest energy difference: 5.5 − 3.7 = 1.8 eV'], ['C1', 'ΔE = 1.8 × 1.60 × 10⁻¹⁹ = 2.88 × 10⁻¹⁹ J'], ['A1', 'λ = hc ÷ ΔE = 6.9 × 10⁻⁷ m']] },
        { q: 'An electron with kinetic energy 6.0 eV collides with one of these atoms in its ground state. Explain which of the levels the atom can be excited to.', m: 2, lines: 3, ms: [['B1', 'Reaching −5.5 eV needs 4.9 eV; reaching −3.7 eV needs 6.7 eV'], ['B1', 'Only the −5.5 eV level, because the electron has enough energy for 4.9 eV but not for 6.7 eV (it keeps the remaining 1.1 eV as kinetic energy)']] },
        { q: 'Explain why the light emitted by a hot gas of these atoms forms a line spectrum and not a continuous spectrum.', m: 2, lines: 3, ms: [['B1', 'Electrons can only have certain discrete energies in the atom, so only certain energy differences are possible'], ['B1', 'Each photon has energy hf equal to one of these differences, so only certain frequencies (wavelengths) are emitted']] }] }
    ]
  });

  /* ---------------- a5 Diffraction gratings ---------------- */
  add('a5', {
    ex: [
      ['How many orders are there?', 'Light of wavelength 486 nm falls normally on a grating with 600 lines per mm. Find the highest order visible, the total number of maxima, and the angle of the highest order.', [
        ['Grating spacing', '', [`d = ${fr('1 × 10⁻³', '600')} = 1.67 × 10⁻⁶ m`]],
        ['Highest order', 'sin θ cannot exceed 1, so n cannot exceed d ÷ λ. Round DOWN.', [`${fr('d', 'λ')} = ${fr('1.67 × 10⁻⁶', '486 × 10⁻⁹')} = 3.43`, res('highest order n = 3')]],
        ['Count the maxima', 'Three each side plus the central one.', [res('2 × 3 + 1 = 7 maxima')]],
        ['Angle of the third order', '', [`sin θ = ${fr('3 × 486 × 10⁻⁹', '1.67 × 10⁻⁶')} = 0.875`, res('θ = 61.0°')]]
      ], { chk: [['1e-3/600', 1.667e-6], ['1e-3/600/486e-9', 3.43], ['3*486e-9/(1e-3/600)', 0.875], ['asind(3*486e-9/(1e-3/600))', 61.0]] }],
      ['Using several orders: a better wavelength', 'A grating has 300 lines per mm. The first three orders of a spectral line are found at 10.2°, 20.7° and 32.1°. Use all three to find the wavelength.' + tbl(['n', '1', '2', '3'], [['θ / °', '10.2', '20.7', '32.1'], ['sin θ', '0.177', '0.353', '0.531']]), [
        ['Turn the equation into a straight line', 'd sin θ = nλ.', [`sin θ = ${fr('λ', 'd')} × n, so a graph of sin θ against n has gradient ${fr('λ', 'd')}`]],
        ['Gradient', 'The points lie on a line through the origin; use the widest pair.', [`gradient = ${fr('0.531', '3')} = 0.177`]],
        ['Wavelength', '', [`d = ${fr('1 × 10⁻³', '300')} = 3.33 × 10⁻⁶ m`, 'λ = 0.177 × 3.33 × 10⁻⁶', res('λ = 5.9 × 10⁻⁷ m (590 nm)')]],
        ['Why this is better', '', ['The highest order has the largest angle, so the smallest percentage uncertainty; a graph also shows up a misread angle.']]
      ], { chk: [['sind(10.2)', 0.177], ['sind(20.7)', 0.3535], ['sind(32.1)', 0.5314], ['sind(32.1)/3', 0.1771], ['sind(32.1)/3*1e-3/300', 5.90e-7]] }]
    ],
    gaps: [
      { q: 'A grating has 400 lines per mm. Light of wavelength 550 nm is incident normally. Find the first-order angle.', lines: ['d = 1 × 10⁻³ ÷ 400 = [[2.5e-6]] m', 'sin θ = λ ÷ d = 550 × 10⁻⁹ ÷ 2.5 × 10⁻⁶ = [[0.22]]', 'θ = [[12.7]]°'], calc: ['1e-3/400', '550e-9/2.5e-6', 'asind(0.22)'], why: 'Lines per mm must be converted to a spacing in metres.' },
      { q: 'Red light of wavelength 650 nm falls on a grating of spacing 2.5 × 10⁻⁶ m.', lines: ['d ÷ λ = 2.5 × 10⁻⁶ ÷ 650 × 10⁻⁹ = [[3.85]]', 'highest order = [[3]]', 'total number of maxima = [[7]]'], calc: ['2.5e-6/650e-9', '3', '7'], why: 'Round down, never up: order 4 would need sin θ > 1.' },
      { q: 'The second-order maximum for a grating of spacing 2.0 × 10⁻⁶ m is at 30.0°. Find the wavelength.', lines: ['nλ = d sin θ', 'λ = 2.0 × 10⁻⁶ × sin 30.0° ÷ 2 = [[5.0e-7]] m'], calc: ['2.0e-6*sind(30)/2'], why: 'Remember to divide by the order n.' }
    ],
    exam: [
      { stem: '<p>Light from a star contains two bright lines of wavelengths 589.0 nm and 656.3 nm. The light is incident normally on a diffraction grating with 600 lines per mm.</p>', parts: [
        { q: 'Calculate the angle between the two lines in the second-order spectrum.', m: 4, ans: { a: 6.98, unit: '°', tol: 0.04 }, calc: 'asind(2*656.3e-9/(1e-3/600))-asind(2*589.0e-9/(1e-3/600))', ms: [['C1', 'd = 1 × 10⁻³ ÷ 600 = 1.67 × 10⁻⁶ m'], ['C1', 'sin θ = 2λ ÷ d: 0.7068 for 589.0 nm, giving θ = 45.0°'], ['C1', '0.7876 for 656.3 nm, giving θ = 52.0°'], ['A1', 'separation = 7.0°']] },
        { q: 'Explain why the wavelengths can be measured with a smaller percentage uncertainty in the second order than in the first.', m: 2, lines: 3, ms: [['B1', 'The angles are larger in the second order'], ['B1', 'The absolute uncertainty in reading an angle is the same, so it is a smaller percentage of the angle (and the two lines are further apart)']] },
        { q: 'State one precaution that should be taken when setting up the grating to make the result accurate.', m: 1, lines: 2, ms: [['B1', 'Any one from: make sure the light meets the grating at right angles (normal incidence); measure the angle between the two images of the same order on either side and halve it']] }] }
    ]
  });

  /* ---------------- a6 Wien's displacement law and Stefan's law ---------------- */
  add('a6', {
    ex: [
      ['The Sun as a black body', 'The spectrum of the Sun peaks at 500 nm and its radius is 7.0 × 10⁸ m. Estimate its surface temperature and its luminosity.', [
        ['Wien’s law', 'λ_max T = 2.9 × 10⁻³ m K.', [`T = ${fr('2.9 × 10⁻³', '500 × 10⁻⁹')} = 5800 K`]],
        ['Stefan’s law', 'L = 4πr²σT⁴. Work out T⁴ carefully: it is where slips happen.', ['4πr² = 4π × (7.0 × 10⁸)² = 6.16 × 10¹⁸ m²', 'σT⁴ = 5.67 × 10⁻⁸ × 5800⁴ = 6.42 × 10⁷ W m⁻²']],
        ['Luminosity', '', ['L = 6.16 × 10¹⁸ × 6.42 × 10⁷', res('L = 4.0 × 10²⁶ W')]]
      ], { chk: [['wien/500e-9', 5800], ['4*pi*7e8**2', 6.16e18], ['sigma*5800**4', 6.42e7], ['4*pi*7e8**2*sigma*5800**4', 3.95e26]] }],
      ['Trap: the fourth power', 'A star expands to twice its radius while its surface temperature falls to half its original value. By what factor does its luminosity change?', [
        ['Write the dependence', '', ['L ∝ r²T⁴']],
        ['Apply both changes', 'The trap: treating the two changes as cancelling. Radius is squared, but temperature is raised to the fourth power.', ['factor = 2² × (½)⁴ = 4 × 0.0625']],
        ['Result', '', [res('L falls to 0.25 of its original value')]],
        ['And the colour?', 'Wien’s law gives the other change.', ['λ_max ∝ 1/T, so the peak wavelength doubles: the star looks redder.']]
      ], { chk: [['2**2*0.5**4', 0.25]] }]
    ],
    gaps: [
      { q: 'The spectrum of a star peaks at 290 nm. Find its surface temperature.', lines: ['T = 2.9 × 10⁻³ ÷ λ_max = 2.9 × 10⁻³ ÷ 290 × 10⁻⁹ = [[10000]] K'], calc: ['wien/290e-9'], why: 'A shorter peak wavelength means a hotter (bluer) star.' },
      { q: 'A star has radius 1.0 × 10⁹ m and surface temperature 10 000 K. Find its luminosity.', lines: ['4πr² = [[1.26e19]] m²', 'σT⁴ = 5.67 × 10⁻⁸ × (1.0 × 10⁴)⁴ = [[5.67e8]] W m⁻²', 'L = 4πr²σT⁴ = [[7.1e27]] W'], calc: ['4*pi*1e18', 'sigma*1e16', '4*pi*1e18*sigma*1e16'], why: 'About 19 times the luminosity of the Sun.' },
      { q: 'The surface temperature of a star trebles while its radius stays the same.', lines: ['L ∝ T⁴, so L increases by a factor of 3⁴ = [[81]]', 'λ_max ∝ 1/T, so λ_max is multiplied by [[0.333]]'], calc: ['3**4', '1/3'], why: 'A modest rise in temperature makes a star enormously brighter.' }
    ],
    exam: [
      { stem: '<p>A red dwarf star has a surface temperature of 3200 K and a radius of 1.4 × 10⁸ m. A planet orbits the star at a distance of 6.0 × 10⁹ m.</p>', parts: [
        { q: 'Calculate the wavelength at which the spectrum of the star has its peak intensity.', m: 1, ans: { a: 9.06e-7, unit: 'm', tol: 0.02 }, calc: 'wien/3200', ms: [['B1', 'λ_max = 2.9 × 10⁻³ ÷ 3200 = 9.1 × 10⁻⁷ m']] },
        { q: 'State the region of the electromagnetic spectrum in which this wavelength lies.', m: 1, lines: 1, ms: [['B1', 'Infrared']] },
        { q: 'Calculate the luminosity of the star.', m: 2, ans: { a: 1.46e24, unit: 'W', tol: 0.03 }, calc: '4*pi*1.4e8**2*sigma*3200**4', ms: [['C1', 'L = 4πr²σT⁴ = 4π × (1.4 × 10⁸)² × 5.67 × 10⁻⁸ × 3200⁴'], ['A1', 'L = 1.5 × 10²⁴ W']] },
        { q: 'Calculate the intensity of the star’s radiation at the planet.', m: 2, ans: { a: 3240, unit: 'W m⁻²', tol: 0.03 }, calc: '4*pi*1.4e8**2*sigma*3200**4/(4*pi*6.0e9**2)', ms: [['C1', 'I = L ÷ 4πd² = 1.46 × 10²⁴ ÷ (4π × (6.0 × 10⁹)²)'], ['A1', 'I = 3.2 × 10³ W m⁻²']] },
        { q: 'State two assumptions made about the star when Stefan’s law is used in this way.', m: 2, lines: 3, ms: [['B1', 'The star radiates as a black body'], ['B1', 'The star is a sphere with the same temperature over its whole surface']] }] }
    ]
  });

  /* ---------------- a7 Astronomical distances ---------------- */
  add('a7', {
    ex: [
      ['From an observation to a distance', 'Photographs taken six months apart show that a star shifts by 0.154 arcseconds against the background stars. Find its distance in parsecs, light-years and metres.', [
        ['Parallax angle', 'The trap: p is HALF the total shift seen over six months.', ['p = 0.154 ÷ 2 = 0.077 arcseconds']],
        ['Parsecs', '', [`d = ${fr('1', 'p')} = ${fr('1', '0.077')}`, res('d = 13.0 pc')]],
        ['Light-years', '1 pc = 3.26 ly.', [res('d = 13.0 × 3.26 = 42 ly')]],
        ['Metres', '1 pc = 3.1 × 10¹⁶ m.', [res('d = 13.0 × 3.1 × 10¹⁶ = 4.0 × 10¹⁷ m')]]
      ], { chk: [['0.154/2', 0.077], ['1/0.077', 12.99], ['1/0.077*3.26', 42.3], ['1/0.077*3.1e16', 4.03e17]] }],
      ['Where the parsec comes from', 'Use the definition of the parsec to show that 1 pc ≈ 3.1 × 10¹⁶ m. (1 AU = 1.50 × 10¹¹ m)', [
        ['Definition', 'One parsec is the distance at which 1 AU subtends an angle of 1 arcsecond.', [`tan p = ${fr('1 AU', 'd')}`]],
        ['Convert the angle to radians', '1 arcsecond = 1/3600 of a degree.', [`p = ${fr('1', '3600')} × ${fr('π', '180')} = 4.85 × 10⁻⁶ rad`]],
        ['Small-angle approximation', 'For so small an angle, tan p = p in radians.', [`d = ${fr('1.50 × 10¹¹', '4.85 × 10⁻⁶')}`, res('d = 3.1 × 10¹⁶ m')]]
      ], { chk: [['pi/180/3600', 4.848e-6], ['1.50e11/(pi/180/3600)', 3.09e16]] }]
    ],
    gaps: [
      { q: 'A star has a parallax angle of 0.25 arcseconds.', lines: ['d = 1 ÷ p = [[4]] pc', 'd = 4.0 × 3.26 = [[13]] ly'], calc: ['1/0.25', '1/0.25*3.26'], why: 'The relation d = 1/p works only with parsecs and arcseconds.' },
      { q: 'Show how the light-year is calculated. Take 1 year = 3.16 × 10⁷ s.', lines: ['1 ly = c × t = 3.00 × 10⁸ × 3.16 × 10⁷ = [[9.48e15]] m'], calc: ['3e8*3.16e7'], why: 'A light-year is a distance, not a time.' },
      { q: 'A star is 20 pc away. What parallax angle does it show, and what total shift is seen over six months?', lines: ['p = 1 ÷ d = [[0.05]] arcseconds', 'total shift = 2p = [[0.1]] arcseconds'], calc: ['1/20', '2/20'], why: 'More distant stars show smaller angles, which is why parallax fails beyond a few hundred parsecs from the ground.' }
    ],
    exam: [
      { stem: '<p>The parallax angles of two bright stars are: Sirius 0.379 arcseconds, Vega 0.130 arcseconds. Take 1 pc = 3.1 × 10¹⁶ m = 3.26 ly.</p>', parts: [
        { q: 'Calculate the distance to Vega in parsecs.', m: 1, ans: { a: 7.69, unit: 'pc', tol: 0.01 }, calc: '1/0.130', ms: [['B1', 'd = 1 ÷ 0.130 = 7.7 pc']] },
        { q: 'Calculate the distance to Vega in light-years.', m: 1, ans: { a: 25.1, unit: 'ly', tol: 0.02 }, calc: '1/0.130*3.26', ms: [['B1', '7.69 × 3.26 = 25 ly']] },
        { q: 'State what your answer shows about the light now arriving from Vega.', m: 1, lines: 2, ms: [['B1', 'It left Vega about 25 years ago, so we see the star as it was then']] },
        { q: 'The intensity of the light from Sirius at the Earth is 1.2 × 10⁻⁷ W m⁻². Calculate the luminosity of Sirius.', m: 3, ans: { a: 1.01e28, unit: 'W', tol: 0.03 }, calc: '4*pi*(1/0.379*3.1e16)**2*1.2e-7', ms: [['C1', 'd = 1 ÷ 0.379 = 2.64 pc = 8.18 × 10¹⁶ m'], ['C1', 'L = 4πd²I = 4π × (8.18 × 10¹⁶)² × 1.2 × 10⁻⁷'], ['A1', 'L = 1.0 × 10²⁸ W']] },
        { q: 'Explain why a telescope in space can measure the distances to more stars by parallax than a telescope on the ground.', m: 1, lines: 2, ms: [['B1', 'With no atmosphere to blur the images it can measure much smaller parallax angles, so it reaches more distant stars']] }] }
    ]
  });

  /* ---------------- a8 Doppler effect, redshift and Hubble's law ---------------- */
  add('a8', {
    ex: [
      ['A galaxy coming towards us', 'The Hα line has wavelength 656.3 nm in the laboratory. In the spectrum of the Andromeda galaxy it is observed at 655.6 nm. Find the velocity of Andromeda relative to us.', [
        ['Change in wavelength', 'Keep the sign: observed − laboratory.', ['Δλ = 655.6 − 656.3 = −0.7 nm']],
        ['Doppler equation', '', [`${fr('Δλ', 'λ')} = ${fr('v', 'c')}, so v = ${fr('0.7', '656.3')} × 3.00 × 10⁸`, res('v = 3.2 × 10⁵ m s⁻¹')]],
        ['Direction', 'The wavelength is shorter: a blueshift.', ['Andromeda is moving towards us at about 320 km s⁻¹.']],
        ['Does this contradict Hubble’s law?', '', ['No. Andromeda is close, so its recession speed from the expansion is small, and the gravitational attraction between the two galaxies dominates.']]
      ], { chk: [['655.6-656.3', -0.7], ['0.7/656.3*3e8', 3.2e5]] }],
      ['The Hubble constant from data', 'The table gives the distance d and recession speed v of four galaxies.' + tbl(['d / Mpc', '50', '120', '200', '310'], [['v / km s⁻¹', '3400', '8600', '13 800', '21 900']]) + 'A graph of v against d is a straight line through the origin with gradient 70 km s⁻¹ Mpc⁻¹. Find H₀ in s⁻¹ and estimate the age of the universe in years. (1 Mpc = 3.1 × 10²² m)', [
        ['What the gradient is', 'v = H₀d.', ['H₀ = 70 km s⁻¹ Mpc⁻¹']],
        ['Convert to SI', 'The trap: forgetting either the km or the Mpc.', [`H₀ = ${fr('70 × 10³ m s⁻¹', '3.1 × 10²² m')} = 2.26 × 10⁻¹⁸ s⁻¹`]],
        ['Age of the universe', 'If the expansion rate has been constant, t ≈ 1 ÷ H₀.', [`t = ${fr('1', '2.26 × 10⁻¹⁸')} = 4.43 × 10¹⁷ s`, `t = ${fr('4.43 × 10¹⁷', '3.16 × 10⁷')}`, res('t ≈ 1.4 × 10¹⁰ years')]]
      ], { chk: [['(50*3400+120*8600+200*13800+310*21900)/(50**2+120**2+200**2+310**2)', 70.3, 0.01], ['70e3/3.1e22', 2.26e-18], ['3.1e22/70e3', 4.43e17], ['3.1e22/70e3/3.16e7', 1.40e10]] }]
    ],
    gaps: [
      { q: 'A line of laboratory wavelength 480 nm is observed at 492 nm in the spectrum of a galaxy.', lines: ['Δλ = [[12]] nm', 'Δλ ÷ λ = 12 ÷ 480 = [[0.025]]', 'v = 0.025 × 3.00 × 10⁸ = [[7.5e6]] m s⁻¹'], calc: ['492-480', '12/480', '12/480*3e8'], why: 'Divide by the laboratory (emitted) wavelength.' },
      { q: 'A galaxy recedes at 7700 km s⁻¹. Take H₀ = 70 km s⁻¹ Mpc⁻¹.', lines: ['d = v ÷ H₀ = 7700 ÷ 70 = [[110]] Mpc'], calc: ['7700/70'], why: 'With v in km s⁻¹ and H₀ in km s⁻¹ Mpc⁻¹ the distance comes out in Mpc.' },
      { q: 'Convert H₀ = 62 km s⁻¹ Mpc⁻¹ into s⁻¹. (1 Mpc = 3.1 × 10²² m)', lines: ['62 km s⁻¹ = [[6.2e4]] m s⁻¹', 'H₀ = 6.2 × 10⁴ ÷ 3.1 × 10²² = [[2.0e-18]] s⁻¹'], calc: ['62e3', '62e3/3.1e22'], why: 'In SI units H₀ is simply “per second”.' }
    ],
    exam: [
      { stem: '<p>A spiral galaxy is seen edge-on. The Hα line (laboratory wavelength 656.3 nm) is observed at three points along the galaxy: at the centre 657.3 nm, at the left-hand edge 657.9 nm and at the right-hand edge 656.7 nm.</p>', parts: [
        { q: 'Explain why the line is observed at different wavelengths at the two edges.', m: 2, lines: 3, ms: [['B1', 'The galaxy is rotating, so one edge moves away from us and the other towards us (relative to the centre)'], ['B1', 'The receding edge has a larger redshift (657.9 nm) and the approaching edge a smaller one (656.7 nm)']] },
        { q: 'Calculate the recession speed of the galaxy as a whole.', m: 2, ans: { a: 4.57e5, unit: 'm s⁻¹', tol: 0.02 }, calc: '(657.3-656.3)/656.3*3e8', ms: [['C1', 'use the centre: Δλ ÷ λ = (657.3 − 656.3) ÷ 656.3 = 1.52 × 10⁻³'], ['A1', 'v = 1.52 × 10⁻³ × 3.00 × 10⁸ = 4.6 × 10⁵ m s⁻¹']] },
        { q: 'Calculate the orbital speed of the stars at the edges of the galaxy.', m: 2, ans: { a: 2.74e5, unit: 'm s⁻¹', tol: 0.03 }, calc: '(657.9-656.7)/2/656.3*3e8', ms: [['C1', 'Δλ for rotation = (657.9 − 656.7) ÷ 2 = 0.60 nm (or 657.9 − 657.3)'], ['A1', 'v = 0.60 ÷ 656.3 × 3.00 × 10⁸ = 2.7 × 10⁵ m s⁻¹']] },
        { q: 'Use your answer to (b) to estimate the distance to the galaxy in Mpc. Take H₀ = 70 km s⁻¹ Mpc⁻¹.', m: 1, ans: { a: 6.53, unit: 'Mpc', tol: 0.03 }, calc: '(657.3-656.3)/656.3*3e8/1e3/70', ms: [['B1', 'd = 457 ÷ 70 = 6.5 Mpc']] },
        { q: 'Suggest why a distance found in this way is unreliable for a galaxy this close.', m: 1, lines: 2, ms: [['B1', 'The recession speed due to the expansion is small, so the galaxy’s own motion (peculiar velocity) through its group is a large fraction of the measured speed']] }] }
    ]
  });

  /* ---------------- a9 The cosmological principle, the Big Bang and the CMB ---------------- */
  add('a9', {
    ex: [
      ['A model answer: evidence for the Big Bang', 'Describe two pieces of evidence that support the Big Bang theory, and explain how each supports it. (6 marks)', [
        ['Evidence 1: what is observed', 'State the observation first.', [`The light from distant galaxies is ${mp('redshifted')}, and the redshift is ${mp('greater for more distant galaxies')} (Hubble’s law).`]],
        ['Evidence 1: why it supports the theory', '', [`All galaxies are moving apart, so space itself is ${mp('expanding')}. Running this backwards, the universe was once very small, hot and dense.`]],
        ['Evidence 2: what is observed', '', [`${mp('Microwave radiation')} reaches us almost equally from all directions, with a black-body spectrum of temperature ${mp('2.7 K')}.`]],
        ['Evidence 2: why it supports the theory', 'Link the present wavelength to the expansion.', [`The young, hot universe was filled with short-wavelength radiation. As space expanded, the ${mp('wavelength was stretched')} into the microwave region.`]],
        ['Use the marks as a checklist', '', [res('For each piece of evidence: one observation, one detail, one link to an expanding universe that began hot and dense.')]]
      ], { desc: true }],
      ['How much has the CMB been stretched?', 'The cosmic microwave background now has a black-body temperature of 2.7 K. It was released when the universe had a temperature of about 3000 K. Find the peak wavelength now and then.', [
        ['Now', '', [`λ_max = ${fr('2.9 × 10⁻³', '2.7')}`, res('λ_max = 1.1 × 10⁻³ m (microwave)')]],
        ['When released', '', [`λ_max = ${fr('2.9 × 10⁻³', '3000')}`, res('λ_max = 9.7 × 10⁻⁷ m (infrared, just beyond red light)')]],
        ['Stretch factor', 'λ_max ∝ 1/T.', [`${fr('3000', '2.7')}`, res('the wavelength has been stretched about 1100 times')]],
        ['Meaning', '', ['The universe has expanded by about this factor since the radiation was released.']]
      ], { chk: [['wien/2.7', 1.07e-3], ['wien/3000', 9.67e-7], ['3000/2.7', 1111]] }],
      ['Trap: units of the Hubble constant', 'Take H₀ = 68 km s⁻¹ Mpc⁻¹ and 1 Mpc = 3.1 × 10²² m. Estimate the age of the universe in years.', [
        ['Convert H₀ to s⁻¹', 'Two conversions are needed: km to m on top, Mpc to m underneath.', [`H₀ = ${fr('68 × 10³', '3.1 × 10²²')} = 2.19 × 10⁻¹⁸ s⁻¹`]],
        ['Age in seconds', '', [`t = ${fr('1', 'H₀')} = 4.56 × 10¹⁷ s`]],
        ['Age in years', '', [`t = ${fr('4.56 × 10¹⁷', '3.16 × 10⁷')}`, res('t ≈ 1.4 × 10¹⁰ years')]],
        ['State the assumption', 'Often worth a mark.', ['This assumes the universe has expanded at a constant rate since the Big Bang.']]
      ], { chk: [['68e3/3.1e22', 2.19e-18], ['3.1e22/68e3', 4.56e17], ['3.1e22/68e3/3.16e7', 1.44e10]] }]
    ],
    gaps: [
      { q: 'Take H₀ = 2.0 × 10⁻¹⁸ s⁻¹. Estimate the age of the universe.', lines: ['t = 1 ÷ H₀ = [[5.0e17]] s', 'in years: 5.0 × 10¹⁷ ÷ 3.16 × 10⁷ = [[1.58e10]] years'], calc: ['1/2.0e-18', '1/2.0e-18/3.16e7'], why: 'About 16 billion years for this value of H₀.' },
      { q: 'Radiation was released when the universe was at 2700 K. It now has a black-body temperature of 2.7 K.', lines: ['The temperature has fallen by a factor of [[1000]]', 'so the peak wavelength has increased by a factor of [[1000]]'], calc: ['2700/2.7', '2700/2.7'], why: 'λ_max ∝ 1/T.' }
    ],
    exam: [
      { stem: '<p>Observations of distant galaxies and of the cosmic microwave background support the Big Bang theory. Take H₀ = 72 km s⁻¹ Mpc⁻¹.</p>', parts: [
        { q: 'Describe how the redshift of the light from galaxies leads to the idea that the universe is expanding.', m: 2, lines: 3, ms: [['B1', 'Redshift shows that galaxies are moving away from us, and the more distant the galaxy the greater its redshift (speed)'], ['B1', 'So every galaxy is moving away from every other: the space between them is expanding']] },
        { q: 'Calculate the recession speed of a galaxy 250 Mpc away, in m s⁻¹.', m: 1, ans: { a: 1.8e7, unit: 'm s⁻¹', tol: 0.01 }, calc: '72*250*1e3', ms: [['B1', 'v = 72 × 250 = 1.8 × 10⁴ km s⁻¹ = 1.8 × 10⁷ m s⁻¹']] },
        { q: 'The Hα line has a laboratory wavelength of 656.3 nm. Calculate the wavelength at which it is observed in the spectrum of this galaxy.', m: 2, ans: { a: 695.7, unit: 'nm', tol: 0.003 }, calc: '656.3*(1+72*250*1e3/3e8)', ms: [['C1', 'Δλ = λv ÷ c = 656.3 × 1.8 × 10⁷ ÷ 3.00 × 10⁸ = 39.4 nm'], ['A1', 'observed wavelength = 656.3 + 39.4 = 695.7 nm']] },
        { q: 'The radiation that forms the cosmic microwave background was emitted with much shorter wavelengths. Explain why it is now detected as microwaves.', m: 2, lines: 3, ms: [['B1', 'The universe (space) has expanded since the radiation was emitted'], ['B1', 'The expansion has stretched the wavelength of the radiation (it now corresponds to a black body at 2.7 K)']] },
        { q: 'What is the temperature of the cosmic microwave background?', m: 1, opts: ['0 K', '2.7 K', '270 K', '3000 K'], a: 1, why: 'It has a black-body spectrum corresponding to 2.7 K; it was about 3000 K when released.' }] }
    ]
  });

  /* ---------------- a10 Evolution of the universe, dark matter and dark energy ---------------- */
  add('a10', {
    ex: [
      ['What a flat rotation curve tells us', `Stars 8.0 kpc from the centre of a galaxy orbit at 230 km s⁻¹, and gas clouds 16 kpc out orbit at 220 km s⁻¹. Use M = ${fr('v²r', 'G')} to find the mass inside each orbit. (1 kpc = 3.1 × 10¹⁹ m)`, [
        ['Where the equation comes from', 'Gravity provides the centripetal force.', [`${fr('GMm', 'r²')} = ${fr('mv²', 'r')}, so M = ${fr('v²r', 'G')}`]],
        ['Inside 8.0 kpc', '', ['r = 8.0 × 3.1 × 10¹⁹ = 2.48 × 10²⁰ m', `M = ${fr('(2.30 × 10⁵)² × 2.48 × 10²⁰', '6.67 × 10⁻¹¹')} = 2.0 × 10⁴¹ kg`]],
        ['Inside 16 kpc', '', ['r = 4.96 × 10²⁰ m', `M = ${fr('(2.20 × 10⁵)² × 4.96 × 10²⁰', '6.67 × 10⁻¹¹')} = 3.6 × 10⁴¹ kg`]],
        ['Compare with expectation', 'If almost all the mass were near the centre, v would fall as 1/√r.', ['expected speed at 16 kpc = 230 ÷ √2 = 163 km s⁻¹, but 220 km s⁻¹ is observed', res('The mass inside the orbit has almost doubled where few stars are seen: evidence for dark matter.')]]
      ], { chk: [['8*3.1e19', 2.48e20], ['2.3e5**2*2.48e20/G', 1.97e41], ['2.2e5**2*4.96e20/G', 3.60e41], ['230/sqrt(2)', 163], ['(2.2e5**2*4.96e20)/(2.3e5**2*2.48e20)', 1.83]] }],
      ['A model answer: the history of the universe', 'Describe the evolution of the universe from the Big Bang to the present day. (6 marks)', [
        ['Start', 'Give times and temperatures where you know them.', [`The universe began ${mp('very hot and dense')} and has been ${mp('expanding and cooling')} ever since. A very rapid expansion (inflation) happened in the first fraction of a second.`]],
        ['Particles', '', [`As it cooled, quarks combined to form ${mp('protons and neutrons')} (hadrons), within about 10⁻⁶ s.`]],
        ['Nuclei', '', [`In the first few minutes, ${mp('fusion formed helium nuclei')}; the universe then became too cool and thin for fusion, leaving about 75 % hydrogen and 25 % helium by mass.`]],
        ['Atoms and the CMB', '', [`After about 380 000 years it was cool enough (about 3000 K) for ${mp('electrons to combine with nuclei to form atoms')}. The universe became transparent and the radiation released is now the CMB.`]],
        ['Structure', '', [`${mp('Gravity')} pulled gas together to form the first stars and galaxies after a few hundred million years. The expansion is now ${mp('accelerating')}, which is attributed to dark energy.`]]
      ], { desc: true }],
      ['Trap: dark matter and dark energy are different things', 'A student writes: “Dark matter is the energy that makes the universe expand faster.” Correct this statement.', [
        ['Dark matter', 'What it does and the evidence for it.', [`Dark matter has ${mp('mass')}, so it attracts by gravity, but it does not emit or absorb electromagnetic radiation. Evidence: the ${mp('rotation curves of galaxies stay flat')}, so stars far from the centre orbit faster than the visible mass allows.`]],
        ['Dark energy', '', [`Dark energy is the name for whatever causes the ${mp('expansion of the universe to accelerate')}. Evidence: distant supernovae are fainter (further away) than expected for a steadily slowing expansion.`]],
        ['Proportions', '', [res('about 68 % dark energy, 27 % dark matter, 5 % ordinary matter')]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'Gas orbits a galaxy at 2.0 × 10⁵ m s⁻¹ at a radius of 3.0 × 10²⁰ m. Find the mass inside the orbit.', lines: ['M = v²r ÷ G', 'v² = [[4.0e10]] m² s⁻²', 'M = 4.0 × 10¹⁰ × 3.0 × 10²⁰ ÷ 6.67 × 10⁻¹¹ = [[1.8e41]] kg', 'in solar masses (2.0 × 10³⁰ kg): [[9.0e10]]'], calc: ['2e5**2', '2e5**2*3e20/G', '2e5**2*3e20/G/2e30'], why: 'About 90 billion Suns inside this orbit.' },
      { q: 'If all the mass of a galaxy were at its centre, orbital speed would be proportional to 1/√r. The speed at radius r is 240 km s⁻¹.', lines: ['speed expected at radius 4r = 240 ÷ √4 = [[120]] km s⁻¹'], calc: ['240/sqrt(4)'], why: 'Real galaxies do not show this fall: the curves stay flat.' }
    ],
    exam: [
      { stem: '<p>The table shows the orbital speed <i>v</i> of gas at different distances <i>r</i> from the centre of a spiral galaxy. Almost all of the visible stars lie within 15 kpc of the centre. (1 kpc = 3.1 × 10¹⁹ m)</p>' + tbl(['r / kpc', '5', '10', '20', '30'], [['v / km s⁻¹', '220', '225', '222', '220']]), parts: [
        { q: 'Describe how v would be expected to vary with r beyond 15 kpc if the galaxy contained only its visible matter.', m: 2, lines: 3, ms: [['B1', 'Almost all the mass would be inside the orbit, so the mass enclosed would be constant'], ['B1', 'v would decrease as r increases (v ∝ 1/√r)']] },
        { q: 'Calculate the mass of the galaxy inside a radius of 30 kpc.', m: 3, ans: { a: 6.75e41, unit: 'kg', tol: 0.03 }, calc: '2.2e5**2*30*3.1e19/G', ms: [['C1', 'r = 30 × 3.1 × 10¹⁹ = 9.3 × 10²⁰ m and v = 2.20 × 10⁵ m s⁻¹'], ['C1', 'M = v²r ÷ G = (2.20 × 10⁵)² × 9.3 × 10²⁰ ÷ 6.67 × 10⁻¹¹'], ['A1', 'M = 6.7 × 10⁴¹ kg']] },
        { q: 'State what the data in the table suggest about how the mass inside radius r depends on r.', m: 1, lines: 2, ms: [['B1', 'v is constant, so M = v²r ÷ G is proportional to r: the enclosed mass keeps increasing well beyond the visible stars (dark matter)']] }] }
    ]
  });

  /* ---- top-up fill-the-gaps ---- */
  add('a1', { gaps: [
    { q: 'A light-year is the distance light travels in one year (3.16 × 10⁷ s).', lines: ['1 ly = [[9.48e15]] m'], calc: ['c*yr'], why: 'd = ct.' }
  ] });
  add('a2', { gaps: [
    { q: 'The core of a star of radius 7.0 × 10⁸ m collapses to a white dwarf of radius 7.0 × 10⁶ m.', lines: ['the radius falls by a factor of [[100]]', 'so, for the same mass, the density rises by a factor of [[1e6]]'], calc: ['7e8/7e6', '(7e8/7e6)**3'], why: 'Density ∝ 1 ÷ r³.' }
  ] });
  add('a3', { gaps: [
    { q: 'The Sun has radius 6.96 × 10⁸ m and surface temperature 5800 K.', lines: ['L = 4πr²σT⁴ = [[3.91e26]] W'], calc: ['4*pi*6.96e8**2*sigma*5800**4'], why: 'Close to the measured 3.8 × 10²⁶ W.' }
  ] });
  add('a9', { gaps: [
    { q: 'A galaxy is 3.09 × 10²⁴ m (100 Mpc) away. Take H₀ = 2.3 × 10⁻¹⁸ s⁻¹.', lines: ['recession speed v = H₀d = [[7.11e6]] m s⁻¹'], calc: ['2.3e-18*3.09e24'], why: 'Hubble’s law.' }
  ] });
  add('a10', { gaps: [
    { q: 'A hydrogen line emitted at 656 nm is observed at 689 nm.', lines: ['z = Δλ ÷ λ = [[0.0503]]', 'v = zc = [[1.51e7]] m s⁻¹'], calc: ['33/656', '33/656*c'], why: 'Valid because v is much less than c.' }
  ] });

  /* ---------------- a11 Review ---------------- */
  add('a11', {
    ex: [
      ['A model answer: evidence for the Big Bang', 'Describe two pieces of evidence for the Big Bang model. (4 marks)', [
        ['Galactic redshift', '', [`Light from distant galaxies is ${mp('redshifted')}, and the ${mp('recession speed is proportional to distance')} (Hubble’s law): the universe is expanding.`]],
        ['Running the expansion backwards', '', ['Everything was once together in a hot, dense state; 1 ÷ H₀ estimates its age.']],
        ['The cosmic microwave background', '', [`Microwave radiation arrives ${mp('from all directions')} with a ${mp('black-body spectrum at about 2.7 K')}: radiation from the early hot universe, stretched by the expansion.`]]
      ], { desc: true }],
      ['Synoptic: measuring a redshift with a grating', 'Light from a galaxy passes through a grating of 600 lines per mm. The Hα line (656.3 nm in the laboratory) appears in the first order at 24.0°. Find the recession speed.', [
        ['Grating spacing', '', ['d = 1 ÷ 600 000 = 1.667 × 10⁻⁶ m']],
        ['Observed wavelength', 'dsin θ = nλ, n = 1.', ['λ = 1.667 × 10⁻⁶ × sin 24.0° = 678 nm']],
        ['Redshift and speed', '', ['z = (678 − 656.3) ÷ 656.3 = 0.033', res('v = zc = 9.9 × 10⁶ m s⁻¹')]]
      ], { chk: [['sind(24)/6e5', 6.779e-7], ['(sind(24)/6e5-656.3e-9)/656.3e-9*c', 9.87e6]] }]
    ],
    gaps: [
      { q: 'An electron in hydrogen falls from −1.51 eV to −3.40 eV.', lines: ['photon energy = [[1.89]] eV = [[3.02e-19]] J'], calc: ['3.40-1.51', '1.89*e'], why: 'This is the red Hα line.' },
      { q: 'A star’s spectrum peaks at 400 nm.', lines: ['T = 2.9 × 10⁻³ ÷ λ_max = [[7250]] K'], calc: ['wien/400e-9'], why: 'Wien’s law.' },
      { q: 'A star has a parallax angle of 0.25 arcseconds.', lines: ['distance = [[4]] pc'], calc: ['1/0.25'], why: 'd (pc) = 1 ÷ p (arcseconds).' }
    ],
    exam: [
      { stem: '<p>Light from a distant galaxy is passed through a diffraction grating with 500 lines per mm. The hydrogen line that has a laboratory wavelength of 656.3 nm is seen in the first order at an angle of 20.0°. Take H₀ = 2.3 × 10⁻¹⁸ s⁻¹.</p>', parts: [
        { q: 'Calculate the observed wavelength of the line.', m: 2, ans: { a: 684, unit: 'nm', tol: 0.01 }, calc: 'sind(20)/5e5*1e9', ms: [['C1', 'd = 1 ÷ (500 × 10³) = 2.00 × 10⁻⁶ m; λ = d sin θ'], ['A1', 'λ = 684 nm']] },
        { q: 'Calculate the recession speed of the galaxy.', m: 1, ans: { a: 1.27e7, unit: 'm s⁻¹', tol: 0.03 }, calc: '(sind(20)/5e5-656.3e-9)/656.3e-9*c', ms: [['B1', 'v = (Δλ ÷ λ)c = 0.042 × 3.00 × 10⁸ = 1.3 × 10⁷ m s⁻¹']] },
        { q: 'Calculate the distance to the galaxy.', m: 2, ans: { a: 5.50e24, unit: 'm', tol: 0.03 }, calc: '(sind(20)/5e5-656.3e-9)/656.3e-9*c/2.3e-18', ms: [['C1', 'd = v ÷ H₀'], ['A1', 'd = 5.5 × 10²⁴ m']] },
        { q: 'Explain why the redshift of distant galaxies is evidence that the universe is expanding.', m: 1, lines: 2, ms: [['B1', 'Almost all galaxies are receding, with speed proportional to distance, so space itself must be expanding']] }] },
      { stem: '<p>Two stars have masses of 1 M☉ and 20 M☉.</p>', parts: [
        { q: 'State two differences between the final stages of the two stars.', m: 2, lines: 3, ms: [['B1', '1 M☉: becomes a red giant, then loses its outer layers as a planetary nebula'], ['B1', 'and leaves a white dwarf; 20 M☉: becomes a red supergiant, explodes as a supernova and leaves a neutron star or black hole']] }] }
    ]
  });
})();
