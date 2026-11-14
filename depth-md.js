/* Medical imaging (md1–md9): extra worked examples, fill-the-gaps and exam-style questions.
   Constants: h = 6.63e-34, c = 3.00e8, e = 1.60e-19, me = 9.11e-31; speed of ultrasound in soft tissue 1540 m s⁻¹ unless stated.
   Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const mp = t => `<b>${t}</b>`;

  /* ---------------- md1 Production of X-rays ---------------- */
  add('md1', {
    ex: [
      ['The X-ray tube in numbers', 'An X-ray tube operates at 80 kV with a tube current of 20 mA. Find the maximum photon energy, the minimum wavelength and the number of electrons hitting the anode each second.', [
        ['Maximum photon energy', 'An electron accelerated through 80 kV gains 80 keV. The most energetic photon takes all of it.', ['E_max = eV = 1.60 × 10⁻¹⁹ × 80 × 10³', res('E_max = 1.28 × 10⁻¹⁴ J (80 keV)')]],
        ['Minimum wavelength', '', [`λ_min = ${fr('hc', 'E_max')} = ${fr('6.63 × 10⁻³⁴ × 3.00 × 10⁸', '1.28 × 10⁻¹⁴')}`, res('λ_min = 1.55 × 10⁻¹¹ m')]],
        ['Electrons per second', 'Current is charge per second.', [`n = ${fr('I', 'e')} = ${fr('20 × 10⁻³', '1.60 × 10⁻¹⁹')}`, res('n = 1.25 × 10¹⁷ s⁻¹')]]
      ], { chk: [['e*80e3', 1.28e-14], ['h*c/(e*80e3)', 1.554e-11], ['20e-3/e', 1.25e17]] }],
      ['Trap: where the energy goes', 'An X-ray tube runs at 100 kV and 30 mA for 5.0 s. Only 1.0 % of the energy becomes X-rays. The anode has mass 0.50 kg and specific heat capacity 134 J kg⁻¹ K⁻¹. Estimate the temperature rise of the anode.', [
        ['Input power', '', ['P = VI = 100 × 10³ × 30 × 10⁻³ = 3000 W']],
        ['Heating power', 'The trap: assuming most of the energy becomes X-rays. 99 % heats the anode.', ['P_heat = 0.99 × 3000 = 2970 W', 'energy in 5.0 s = 2970 × 5.0 = 14 850 J']],
        ['Temperature rise', '', [`ΔT = ${fr('E', 'mc')} = ${fr('14 850', '0.50 × 134')}`, res('ΔT ≈ 220 K')]],
        ['Design consequence', '', ['This is why the anode is made of tungsten (high melting point), rotated (the heat is spread over a ring) and cooled by oil.']]
      ], { chk: [['100e3*30e-3', 3000], ['0.99*3000*5', 14850], ['0.99*3000*5/(0.5*134)', 221.6]] }],
      ['A model answer: the X-ray spectrum', 'Explain the shape of the spectrum of X-rays produced by a tube operating at 100 kV. (4 marks)', [
        ['The continuous spectrum', '', [`Electrons decelerate in the target and emit ${mp('braking radiation (bremsstrahlung)')}. Each electron can lose any amount of energy, so a ${mp('continuous range of photon energies')} is produced.`]],
        ['The cut-off', '', [`The maximum photon energy is ${mp('100 keV')}, when an electron loses all its kinetic energy in one interaction, so there is a minimum wavelength.`]],
        ['The sharp lines', '', [`Incoming electrons ${mp('knock inner-shell electrons out of tungsten atoms')}; electrons from higher levels fall into the gaps and emit photons of ${mp('specific energies')} (characteristic lines).`]],
        ['The low-energy end', 'Often worth a mark.', ['Low-energy X-rays are absorbed in the glass and filter, so the curve falls to zero at low energies.']]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'An X-ray tube operates at 60 kV.', lines: ['maximum photon energy = [[60]] keV', 'in joules: 60 × 10³ × 1.60 × 10⁻¹⁹ = [[9.6e-15]] J', 'λ_min = hc ÷ E = [[2.07e-11]] m'], calc: ['60', '60e3*e', 'h*c/(60e3*e)'], why: 'Halving the voltage doubles the minimum wavelength.' },
      { q: 'A tube current is 12 mA.', lines: ['electrons per second = 12 × 10⁻³ ÷ 1.60 × 10⁻¹⁹ = [[7.5e16]]'], calc: ['12e-3/e'], why: 'Increasing the current increases the intensity, not the maximum photon energy.' }
    ],
    exam: [
      { stem: '<p>The graph of intensity against photon energy for the X-rays from a tube operating at 100 kV shows a smooth curve with two sharp peaks.</p>', parts: [
        { q: 'Explain why the curve is continuous and why it ends at 100 keV.', m: 2, lines: 3, ms: [['B1', 'Electrons decelerate in the target and can lose any amount of energy, giving photons with a continuous range of energies'], ['B1', 'The maximum photon energy is 100 keV, when one electron transfers all of its kinetic energy (eV) to one photon']] },
        { q: 'Explain how the sharp peaks are produced.', m: 2, lines: 3, ms: [['B1', 'Incident electrons remove electrons from inner shells of the target atoms'], ['B1', 'Electrons from higher energy levels fall into the vacancies, emitting photons of energies characteristic of the target metal']] },
        { q: 'The tube voltage is reduced to 50 kV. Calculate the new minimum wavelength.', m: 1, ans: { a: 2.49e-11, unit: 'm', tol: 0.02 }, calc: 'h*c/(50e3*e)', ms: [['B1', 'λ = hc ÷ eV = 2.5 × 10⁻¹¹ m']] }] }
    ]
  });

  /* ---------------- md2 Attenuation of X-rays ---------------- */
  add('md2', {
    ex: [
      ['Bone against soft tissue: where the contrast comes from', 'X-rays (μ: bone 0.60 cm⁻¹, soft tissue 0.20 cm⁻¹) pass through a limb 8.0 cm thick. Path A crosses 8.0 cm of soft tissue; path B crosses 3.0 cm of bone and 5.0 cm of soft tissue. Compare the transmitted fractions.', [
        ['Path A', '', ['I/I₀ = e^(−0.20 × 8.0) = e^(−1.6) = 0.20']],
        ['Path B', 'Layers in series: add the μx values.', ['μx = 0.60 × 3.0 + 0.20 × 5.0 = 2.8', 'I/I₀ = e^(−2.8) = 0.061']],
        ['Compare', '', [`${fr('0.20', '0.061')}`, res('about 3.3 times more X-rays reach the detector through soft tissue, so the bone shows up as a lighter shadow')]]
      ], { chk: [['exp(-1.6)', 0.2019], ['exp(-2.8)', 0.0608], ['exp(-1.6)/exp(-2.8)', 3.32]] }],
      ['Trap: units of μ, and the half-value thickness', 'An aluminium filter has a half-value thickness of 3.5 mm for a beam. Find the linear attenuation coefficient in m⁻¹, and the thickness needed to cut the intensity to 10 %.', [
        ['μ from the half-value thickness', 'Half the intensity: e^(−μx½) = ½.', [`μ = ${fr('ln 2', 'x½')} = ${fr('0.693', '3.5 × 10⁻³ m')}`, res('μ = 198 m⁻¹ (1.98 cm⁻¹)')]],
        ['Thickness for 10 %', 'The trap: using μ in cm⁻¹ and x in m. Keep both in the same length unit.', [`x = ${fr('ln 10', 'μ')} = ${fr('2.303', '198')}`, res('x = 1.16 × 10⁻² m (11.6 mm)')]],
        ['Check with half-value thicknesses', '', ['10 % is between 3 half-values (12.5 %) and 4 (6.25 %): 11.6 mm is between 10.5 mm and 14 mm ✓']]
      ], { chk: [['ln(2)/3.5e-3', 198], ['ln(10)/(ln(2)/3.5e-3)', 1.163e-2]] }]
    ],
    gaps: [
      { q: 'X-rays pass through 4.0 cm of tissue with μ = 0.35 cm⁻¹.', lines: ['μx = [[1.4]]', 'I/I₀ = e^(−1.4) = [[0.247]]'], calc: ['0.35*4', 'exp(-1.4)'], why: 'μx has no unit when μ and x use the same length unit.' },
      { q: 'A material has μ = 0.50 cm⁻¹.', lines: ['half-value thickness = ln 2 ÷ 0.50 = [[1.39]] cm'], calc: ['ln(2)/0.5'], why: 'The half-value thickness is the same whatever the starting intensity.' },
      { q: 'What thickness of bone (μ = 0.60 cm⁻¹) transmits 1.0 % of the X-rays?', lines: ['e^(−0.60x) = 0.010, so 0.60x = ln 100 = [[4.61]]', 'x = [[7.68]] cm'], calc: ['ln(100)', 'ln(100)/0.6'], why: 'Take logs to bring x down from the exponent.' }
    ],
    exam: [
      { stem: '<p>X-ray photons lose energy in matter by different mechanisms, depending on their energy.</p>', parts: [
        { q: 'Name the main attenuation mechanism for photons of (i) 40 keV, (ii) 1 MeV, (iii) 10 MeV, and describe what happens in each.', m: 3, lines: 5, ms: [['B1', '40 keV: photoelectric effect: the photon is absorbed and an inner electron is ejected'], ['B1', '1 MeV: Compton scattering: the photon is scattered with less energy and an electron is ejected'], ['B1', '10 MeV: pair production: the photon becomes an electron and a positron near a nucleus']] },
        { q: 'Calculate the minimum photon energy, in MeV, for pair production. (me = 9.11 × 10⁻³¹ kg)', m: 2, ans: { a: 1.02, unit: 'MeV', tol: 0.02 }, calc: '2*me*c*c/MeV', ms: [['C1', 'E = 2mₑc² = 2 × 9.11 × 10⁻³¹ × (3.00 × 10⁸)² = 1.64 × 10⁻¹³ J'], ['A1', 'E = 1.02 MeV']] },
        { q: 'Diagnostic X-rays have energies where the photoelectric effect dominates. Explain why this gives good contrast between bone and soft tissue.', m: 1, lines: 2, ms: [['B1', 'Photoelectric absorption increases steeply with proton number (about Z³), and bone (containing calcium) has a higher average proton number than soft tissue']] }] }
    ]
  });

  /* ---------------- md3 CAT scans ---------------- */
  add('md3', {
    ex: [
      ['Why many directions are needed', 'A CAT scanner sees only the total attenuation along each ray. A slice is divided into four voxels with attenuations a, b (top row) and c, d (bottom row). The measured totals are: top row 0.9, bottom row 0.5, left column 0.6, diagonal a + d = 0.4. Find each voxel.', [
        ['Write the equations', 'One equation per ray.', ['a + b = 0.9,  c + d = 0.5,  a + c = 0.6,  a + d = 0.4']],
        ['Eliminate', 'Express c and d in terms of a.', ['c = 0.6 − a and d = 0.4 − a, so c + d = 1.0 − 2a = 0.5']],
        ['Solve', '', ['a = 0.25,  b = 0.65,  c = 0.35,  d = 0.15']],
        ['The point', 'With only the rows (two rays), the four voxels could not be separated.', [res('Each extra direction adds equations. Real scanners take thousands of rays from hundreds of angles to find hundreds of thousands of voxels.')]]
      ], { chk: [['(0.6+0.4-0.5)/2', 0.25], ['0.9-0.25', 0.65], ['0.6-0.25', 0.35], ['0.4-0.25', 0.15]] }],
      ['Weighing the dose', 'A CAT scan of the abdomen gives an effective dose of 10 mSv. Background radiation gives about 2.7 mSv per year, and the risk of a fatal cancer is taken as 5 % per sievert. Put the dose in context.', [
        ['Compared with background', '', [`${fr('10', '2.7')} = 3.7`, res('the same as about 3.7 years of background radiation')]],
        ['Risk', '', ['risk = 10 × 10⁻³ Sv × 0.05 per Sv = 5 × 10⁻⁴', res('about 1 in 2000')]],
        ['Judgement', 'Examiners want the benefit weighed against the risk.', ['The scan is justified when the information gained (for example finding a tumour or internal bleeding) outweighs this small extra risk.']]
      ], { chk: [['10/2.7', 3.7], ['10e-3*0.05', 5e-4], ['1/(10e-3*0.05)', 2000]] }],
      ['A model answer: choosing between a CAT scan and an X-ray image', 'Compare a CAT scan with a single X-ray image for investigating a head injury. (4 marks)', [
        ['Advantage: 3D information', '', [`A CAT scan gives ${mp('cross-sectional slices that build a 3D image')}, so the position and depth of an injury can be found.`]],
        ['Advantage: soft tissue', '', [`It ${mp('distinguishes soft tissues with similar attenuation')} (for example blood and brain), which overlap on a single X-ray image.`]],
        ['Disadvantage: dose', '', [`The patient receives a ${mp('much larger radiation dose')} (hundreds of times that of a single X-ray).`]],
        ['Disadvantage: practical', '', [`The scan takes ${mp('longer')}, the patient must keep still, and the equipment is more expensive.`]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'Four voxels a, b (top) and c, d (bottom). Ray totals: a + b = 1.0, c + d = 0.6, a + c = 0.7, a + d = 0.5.', lines: ['c + d = (0.7 − a) + (0.5 − a), so a = [[0.3]]', 'b = [[0.7]]', 'c = [[0.4]]', 'd = [[0.2]]'], calc: ['(0.7+0.5-0.6)/2', '0.7', '0.4', '0.2'], why: 'The computer solves millions of these equations to reconstruct a slice.' },
      { q: 'A CT scan gives 8.0 mSv. The fatal cancer risk is 5 % per Sv.', lines: ['risk = 8.0 × 10⁻³ × 0.05 = [[4.0e-4]]', 'about 1 in [[2500]]'], calc: ['8e-3*0.05', '1/(8e-3*0.05)'], why: 'A small risk that has to be justified by the benefit.' }
    ],
    exam: [
      { stem: '<p>A CAT scan gives an effective dose of 6.0 mSv. Take the risk of a fatal cancer as 5 % per sievert.</p>', parts: [
        { q: 'Explain why a CAT scan can distinguish between soft tissues that cannot be told apart on a single X-ray image.', m: 2, lines: 3, ms: [['B1', 'A single image records the total attenuation along each path, so tissues at different depths overlap'], ['B1', 'A CAT scan measures attenuation from many directions and a computer calculates the attenuation of each small volume (voxel), so small differences can be shown']] },
        { q: 'Calculate the risk of a fatal cancer from the scan, as a probability.', m: 1, ans: { a: 3.0e-4, unit: '', tol: 0.02 }, calc: '6.0e-3*0.05', ms: [['B1', '6.0 × 10⁻³ × 0.05 = 3.0 × 10⁻⁴']] },
        { q: 'Express this risk as “1 in N”.', m: 1, ans: { a: 3333, unit: '', tol: 0.02 }, calc: '1/(6.0e-3*0.05)', ms: [['B1', 'about 1 in 3300']] },
        { q: 'Suggest two ways in which the dose to the patient can be kept as low as possible.', m: 2, lines: 3, ms: [['B1', 'Only scan the region needed (narrow beam, few slices) and use the lowest tube current/time that gives a usable image'], ['B1', 'Use ultrasound or MRI instead where they give the information needed, and avoid repeat scans']] }] }
    ]
  });

  /* ---------------- md4 Medical tracers and the gamma camera ---------------- */
  add('md4', {
    ex: [
      ['Why technetium-99m?', 'Technetium-99m emits 140 keV gamma photons and has a half-life of 6.0 hours. Find the photon energy in joules and its wavelength, and explain why it is a good tracer.', [
        ['Photon energy', '', ['E = 140 × 10³ × 1.60 × 10⁻¹⁹', res('E = 2.24 × 10⁻¹⁴ J')]],
        ['Wavelength', '', [`λ = ${fr('hc', 'E')}`, res('λ = 8.9 × 10⁻¹² m')]],
        ['A model justification', 'Link each property to its benefit.', [`${mp('Gamma only')}: photons escape the body and are detected; no alpha or beta to damage tissue.`, `${mp('Half-life of a few hours')}: long enough to image, short enough that the dose soon falls.`, `${mp('Energy 140 keV')}: penetrates tissue but is easily stopped by the lead collimator and detected by the scintillator.`]]
      ], { chk: [['140e3*e', 2.24e-14], ['h*c/(140e3*e)', 8.88e-12]] }],
      ['Inside the scintillator', 'In the sodium iodide crystal of a gamma camera, a 140 keV photon produces flashes of light. About 13 % of its energy becomes visible photons of about 3.0 eV. How many visible photons are produced, and why is a photomultiplier needed?', [
        ['Energy converted to light', '', ['0.13 × 140 × 10³ eV = 1.82 × 10⁴ eV']],
        ['Number of visible photons', '', [`${fr('1.82 × 10⁴', '3.0')}`, res('about 6000 photons')]],
        ['Why a photomultiplier?', '', ['This flash is far too faint to detect directly. Each light photon releases a photoelectron, and a chain of dynodes multiplies the electrons into a measurable pulse. The pattern of signals in neighbouring tubes locates the flash.']]
      ], { chk: [['0.13*140e3', 1.82e4], ['0.13*140e3/3.0', 6067]] }],
      ['Trap: mixing hours and minutes', 'A dose of technetium-99m (half-life 6.0 h) has activity 800 MBq when it is prepared. The scan starts 90 minutes later. Find the activity at the start of the scan.', [
        ['Use consistent units', 'The trap: putting t = 90 into a half-life given in hours.', ['t = 90 min = 1.5 h, so t ÷ t½ = 1.5 ÷ 6.0 = 0.25']],
        ['Calculate', '', ['A = 800 × (½)^0.25', res('A = 673 MBq')]],
        ['Sense check', 'Less than one half-life has passed.', ['The activity has fallen by about 16 %, well under half ✓']]
      ], { chk: [['1.5/6', 0.25], ['800*0.5**0.25', 672.7]] }]
    ],
    gaps: [
      { q: 'Convert 140 keV into joules.', lines: ['E = 140 × 10³ × 1.60 × 10⁻¹⁹ = [[2.24e-14]] J'], calc: ['140e3*e'], why: 'Multiply by 10³ for keV and by e for joules.' },
      { q: 'A technetium-99m dose has activity 500 MBq. Find its activity 3.0 hours later. (t½ = 6.0 h)', lines: ['t ÷ t½ = [[0.5]]', 'A = 500 × (½)^0.5 = [[354]] MBq'], calc: ['3/6', '500*0.5**0.5'], why: 'After half a half-life the activity is 1/√2 of its starting value, not three-quarters.' }
    ],
    exam: [
      { stem: '<p>In the scintillator of a gamma camera, a 140 keV gamma photon produces 5000 visible-light photons, each of energy 3.0 eV.</p>', parts: [
        { q: 'Calculate the fraction of the gamma-photon energy that becomes visible light.', m: 2, ans: { a: 0.107, unit: '', tol: 0.02 }, calc: '5000*3.0/140e3', ms: [['C1', 'energy of visible light = 5000 × 3.0 = 1.5 × 10⁴ eV'], ['A1', 'fraction = 1.5 × 10⁴ ÷ 1.40 × 10⁵ = 0.11']] },
        { q: 'Explain why the light from the scintillator is detected by photomultiplier tubes.', m: 1, lines: 2, ms: [['B1', 'The flash is very faint; the tube converts light into electrons and multiplies them into an electrical pulse large enough to be measured']] },
        { q: 'A collimator with longer, narrower holes gives a sharper image. Explain why, and state a disadvantage.', m: 2, lines: 3, ms: [['B1', 'Only photons travelling almost parallel to the holes reach the crystal, so each point in the crystal corresponds to a smaller region of the patient'], ['B1', 'Fewer photons are detected, so a longer imaging time or a larger activity (dose) is needed']] }] }
    ]
  });

  /* ---------------- md5 PET ---------------- */
  add('md5', {
    ex: [
      ['The annihilation photons', 'A positron from fluorine-18 annihilates with an electron, both effectively at rest. Find the energy, wavelength and momentum of each photon.', [
        ['Energy', 'Each photon carries the rest energy of one particle.', ['E = mₑc² = 9.11 × 10⁻³¹ × (3.00 × 10⁸)² = 8.20 × 10⁻¹⁴ J', res('E = 0.51 MeV')]],
        ['Wavelength', '', [`λ = ${fr('hc', 'E')}`, res('λ = 2.4 × 10⁻¹² m')]],
        ['Momentum', 'The two momenta are equal and opposite, so the photons travel in opposite directions.', [`p = ${fr('E', 'c')}`, res('p = 2.7 × 10⁻²² kg m s⁻¹')]]
      ], { chk: [['me*c*c', 8.2e-14], ['me*c*c/MeV', 0.512], ['h/(me*c)', 2.43e-12], ['me*c', 2.73e-22]] }],
      ['Planning a delivery', 'A PET scan at 2 pm needs 300 MBq of fluorine-18 (half-life 110 minutes). The tracer is made at 9 am. What activity must be produced?', [
        ['Time elapsed', 'Work in minutes, the unit of the half-life.', ['9 am to 2 pm = 5 h = 300 min']],
        ['Number of half-lives', '', ['300 ÷ 110 = 2.73']],
        ['Activity needed at 9 am', 'Work backwards: multiply by 2 for each half-life.', ['A₀ = 300 × 2^2.73 = 300 × 6.63', res('A₀ ≈ 2.0 × 10³ MBq')]],
        ['Why this matters', '', ['The short half-life means PET needs a cyclotron nearby; most of the tracer decays on the way.']]
      ], { chk: [['300/110', 2.727], ['2**(300/110)', 6.63], ['300*2**(300/110)', 1989]] }]
    ],
    gaps: [
      { q: 'Find the energy of each photon from an electron–positron annihilation at rest.', lines: ['E = mₑc² = [[8.2e-14]] J', 'in MeV: [[0.51]] MeV'], calc: ['me*c*c', 'me*c*c/MeV'], why: '0.511 MeV with more precise constants.' },
      { q: 'Two annihilation photons are detected 0.30 ns apart.', lines: ['the extra distance travelled by the later photon = cΔt = [[0.09]] m', 'distance of the annihilation from the midpoint = cΔt ÷ 2 = [[0.045]] m'], calc: ['3e8*0.30e-9', '3e8*0.30e-9/2'], why: 'The annihilation is nearer the detector that fires first.' }
    ],
    exam: [
      { stem: '<p>A PET scanner has a ring of detectors of diameter 0.80 m. An annihilation occurs 0.12 m from the centre of the ring, on the line joining two detectors.</p>', parts: [
        { q: 'Calculate the difference in the arrival times of the two photons.', m: 2, ans: { a: 8.0e-10, unit: 's', tol: 0.02 }, calc: '2*0.12/3e8', ms: [['C1', 'path difference = (0.40 + 0.12) − (0.40 − 0.12) = 0.24 m'], ['A1', 'Δt = 0.24 ÷ 3.00 × 10⁸ = 8.0 × 10⁻¹⁰ s']] },
        { q: 'Explain why the two photons travel in opposite directions.', m: 2, lines: 3, ms: [['B1', 'The electron and positron have (almost) zero total momentum before annihilating'], ['B1', 'Momentum is conserved, so the two photons have equal and opposite momenta']] },
        { q: 'The detectors can measure time differences to ±0.20 ns. Calculate the uncertainty in the position of the annihilation along the line.', m: 1, ans: { a: 0.03, unit: 'm', tol: 0.02 }, calc: '3e8*0.20e-9/2', ms: [['B1', 'Δx = cΔt ÷ 2 = 3.00 × 10⁸ × 0.20 × 10⁻⁹ ÷ 2 = 0.03 m']] }] }
    ]
  });

  /* ---------------- md6 Ultrasound: transducers, A-scans and B-scans ---------------- */
  add('md6', {
    ex: [
      ['Trap: two tissues, two speeds', 'An A-scan shows an echo from a fat–muscle boundary at 40 μs and from a muscle–bone boundary at 104 μs. The speed of ultrasound is 1450 m s⁻¹ in fat and 1590 m s⁻¹ in muscle. Find the thickness of the fat and of the muscle.', [
        ['Fat layer', 'The trap: forgetting that the pulse goes there AND back.', [`d = ${fr('vt', '2')} = ${fr('1450 × 40 × 10⁻⁶', '2')}`, res('fat: 2.9 cm')]],
        ['Muscle layer', 'Use the extra time, and the speed in muscle.', ['extra time = 104 − 40 = 64 μs', `d = ${fr('1590 × 64 × 10⁻⁶', '2')}`, res('muscle: 5.1 cm')]],
        ['Why it matters', '', ['A scanner that assumes 1540 m s⁻¹ everywhere makes small errors in the depths of boundaries.']]
      ], { chk: [['1450*40e-6/2', 0.029], ['1590*64e-6/2', 0.0509]] }],
      ['Choosing the frequency', 'Compare the wavelength in soft tissue of 1.5 MHz and 7.5 MHz ultrasound, and explain which would be used to scan an eye and which a liver.', [
        ['Wavelengths', 'v = fλ with v = 1540 m s⁻¹.', ['1.5 MHz: λ = 1540 ÷ 1.5 × 10⁶ = 1.03 mm', '7.5 MHz: λ = 1540 ÷ 7.5 × 10⁶ = 0.21 mm']],
        ['Resolution', 'Detail smaller than about a wavelength cannot be resolved.', ['7.5 MHz shows detail about five times finer.']],
        ['Penetration', 'Attenuation increases with frequency.', [res('Eye (shallow, fine detail): 7.5 MHz. Liver (deep): 1.5 MHz, accepting poorer resolution.')]]
      ], { chk: [['1540/1.5e6', 1.027e-3], ['1540/7.5e6', 2.05e-4]] }]
    ],
    gaps: [
      { q: 'An echo returns 52 μs after the pulse is sent.', lines: ['distance there and back = 1540 × 52 × 10⁻⁶ = [[0.08]] m', 'depth = [[0.04]] m'], calc: ['1540*52e-6', '1540*52e-6/2'], why: 'Always halve the round trip.' },
      { q: 'Find the wavelength of 5.0 MHz ultrasound in soft tissue.', lines: ['λ = v ÷ f = 1540 ÷ 5.0 × 10⁶ = [[3.08e-4]] m'], calc: ['1540/5e6'], why: 'About 0.3 mm: the finest detail this probe can show.' },
      { q: 'A scanner images to a depth of 0.20 m. Each pulse must return before the next is sent.', lines: ['round-trip time = 2 × 0.20 ÷ 1540 = [[2.6e-4]] s', 'maximum pulses per second = [[3850]]'], calc: ['0.4/1540', '1540/0.4'], why: 'Imaging deeper means fewer pulses per second.' }
    ],
    exam: [
      { stem: '<p>A B-scan is used to image a fetus.</p>', parts: [
        { q: 'Explain how a B-scan builds a two-dimensional image.', m: 2, lines: 3, ms: [['B1', 'The transducer (or an array of crystals) is moved or swept across the body, sending pulses along many lines'], ['B1', 'Each echo is shown as a dot whose brightness depends on its strength and whose position depends on the direction and the echo time']] },
        { q: 'Calculate the maximum pulse repetition frequency that allows echoes from a depth of 15 cm to return before the next pulse.', m: 2, ans: { a: 5133, unit: 'Hz', tol: 0.02 }, calc: '1540/(2*0.15)', ms: [['C1', 'time for the round trip = 2 × 0.15 ÷ 1540 = 1.95 × 10⁻⁴ s'], ['A1', 'f = 1 ÷ 1.95 × 10⁻⁴ = 5.1 × 10³ Hz']] },
        { q: 'Explain why the ultrasound must be sent in short pulses, and how the transducer is designed to achieve this.', m: 2, lines: 3, ms: [['B1', 'Short pulses let echoes from boundaries close together be distinguished (better resolution along the beam), and the same crystal can detect echoes between pulses'], ['B1', 'A backing (damping) material behind the crystal stops it vibrating soon after each pulse']] }] }
    ]
  });

  /* ---------------- md7 Acoustic impedance ---------------- */
  add('md7', {
    ex: [
      ['From density and speed to reflection', 'Fat has density 925 kg m⁻³ and ultrasound speed 1450 m s⁻¹; muscle has 1075 kg m⁻³ and 1590 m s⁻¹. Find the fraction of intensity reflected at a fat–muscle boundary.', [
        ['Impedances', 'Z = ρc.', ['Z(fat) = 925 × 1450 = 1.34 × 10⁶ kg m⁻² s⁻¹', 'Z(muscle) = 1075 × 1590 = 1.71 × 10⁶ kg m⁻² s⁻¹']],
        ['Reflected fraction', '', [`${fr('I_r', 'I₀')} = (${fr('Z₂ − Z₁', 'Z₂ + Z₁')})² = (${fr('0.368', '3.050')})²`, res('about 1.5 % is reflected')]],
        ['What this means', '', ['Small reflections at soft-tissue boundaries are what make internal structure visible; 98.5 % carries on to deeper boundaries.']]
      ], { chk: [['925*1450', 1.341e6], ['1075*1590', 1.709e6], ['((1075*1590-925*1450)/(1075*1590+925*1450))**2', 0.0146]] }],
      ['Trap: following the echo there and back', 'Ultrasound passes from gel (Z = 1.6 × 10⁶) into skin (Z = 1.7 × 10⁶), then reflects at a muscle–bone boundary (1.71 × 10⁶ and 7.75 × 10⁶). Ignoring absorption, what fraction of the original intensity returns to the probe?', [
        ['Transmission at the gel–skin boundary', 'The trap: forgetting that the echo crosses this boundary twice.', [`reflected = (${fr('0.1', '3.3')})² = 9.2 × 10⁻⁴, so transmitted = 0.9991`]],
        ['Reflection at muscle–bone', '', [`(${fr('7.75 − 1.71', '7.75 + 1.71')})² = 0.408`]],
        ['Combine', 'Multiply the fractions along the path.', ['0.9991 × 0.408 × 0.9991', res('about 0.41 of the original intensity')]],
        ['Without gel', 'Air (Z = 430) would reflect 99.9 % at the skin each way, leaving almost nothing.', ['This is why the coupling gel matters.']]
      ], { chk: [['(0.1/3.3)**2', 9.18e-4], ['((7.75-1.71)/(7.75+1.71))**2', 0.4077], ['(1-(0.1/3.3)**2)**2*((7.75-1.71)/(7.75+1.71))**2', 0.4070]] }]
    ],
    gaps: [
      { q: 'Blood has density 1060 kg m⁻³ and ultrasound speed 1570 m s⁻¹.', lines: ['Z = ρc = [[1.664e6]] kg m⁻² s⁻¹'], calc: ['1060*1570'], why: 'Similar to other soft tissues.' },
      { q: 'Find the fraction reflected at a boundary between tissues with Z = 1.38 × 10⁶ and 1.70 × 10⁶ kg m⁻² s⁻¹.', lines: ['(Z₂ − Z₁) ÷ (Z₂ + Z₁) = 0.32 ÷ 3.08 = [[0.104]]', 'fraction reflected = [[0.0108]]'], calc: ['0.32/3.08', '(0.32/3.08)**2'], why: 'Remember to square the ratio.' }
    ],
    exam: [
      { stem: '<p>Acoustic impedances: soft tissue 1.63 × 10⁶ kg m⁻² s⁻¹; bone 7.80 × 10⁶ kg m⁻² s⁻¹. The density of bone is 1900 kg m⁻³.</p>', parts: [
        { q: 'Calculate the fraction of the intensity reflected at a soft tissue–bone boundary.', m: 2, ans: { a: 0.428, unit: '', tol: 0.02 }, calc: '((7.80-1.63)/(7.80+1.63))**2', ms: [['C1', '(7.80 − 1.63) ÷ (7.80 + 1.63) = 0.654'], ['A1', 'fraction = 0.654² = 0.43']] },
        { q: 'Explain why it is difficult to image organs that lie behind bone.', m: 2, lines: 3, ms: [['B1', 'A large fraction (over 40 %) is reflected at the front surface of the bone, and bone also absorbs ultrasound strongly'], ['B1', 'Little ultrasound reaches the organ, and its echoes are weakened again on the way back, so they are too weak to show']] },
        { q: 'Calculate the speed of ultrasound in bone.', m: 1, ans: { a: 4105, unit: 'm s⁻¹', tol: 0.02 }, calc: '7.80e6/1900', ms: [['B1', 'c = Z ÷ ρ = 7.80 × 10⁶ ÷ 1900 = 4.1 × 10³ m s⁻¹']] },
        { q: 'What is the unit of acoustic impedance?', m: 1, opts: ['kg m⁻² s⁻¹', 'kg m⁻³', 'kg m s⁻¹', 'kg m⁻¹ s⁻²'], a: 0, why: 'Z = ρc: kg m⁻³ × m s⁻¹ = kg m⁻² s⁻¹.' }] }
    ]
  });

  /* ---------------- md8 Doppler imaging ---------------- */
  add('md8', {
    ex: [
      ['Predicting the frequency shift', 'Ultrasound of 6.0 MHz is directed at 60° to blood flowing at 0.40 m s⁻¹. Find the frequency shift of the reflected ultrasound. (c = 1540 m s⁻¹)', [
        ['The Doppler equation', 'The factor 2 appears because the blood both receives and re-emits the ultrasound while moving.', [`Δf = ${fr('2fv cos θ', 'c')}`]],
        ['Substitute', '', [`Δf = ${fr('2 × 6.0 × 10⁶ × 0.40 × cos 60°', '1540')}`, res('Δf = 1.6 kHz')]],
        ['Sense check', '', ['A shift of a few kilohertz in megahertz: about one part in 4000, within the audible range so it can be played as sound.']]
      ], { chk: [['2*6e6*0.4*cosd(60)/1540', 1558]] }],
      ['Trap: cos, not sin', 'A shift of 2.0 kHz is measured with 5.0 MHz ultrasound at 40° to the flow. A student uses sin θ by mistake. Find the correct speed and the student’s error.', [
        ['Correct', 'θ is the angle between the beam and the direction of flow; the component of velocity along the beam is v cos θ.', [`v = ${fr('Δf c', '2f cos θ')} = ${fr('2000 × 1540', '2 × 5.0 × 10⁶ × cos 40°')}`, res('v = 0.40 m s⁻¹')]],
        ['With sin', '', [`v = ${fr('2000 × 1540', '2 × 5.0 × 10⁶ × sin 40°')} = 0.48 m s⁻¹`]],
        ['Size of the error', '', [res('about 19 % too large'), 'Draw the beam and the flow and mark the angle between them before choosing cos.']]
      ], { chk: [['2000*1540/(2*5e6*cosd(40))', 0.402], ['2000*1540/(2*5e6*sind(40))', 0.479], ['(cosd(40)/sind(40)-1)*100', 19.2]] }]
    ],
    gaps: [
      { q: 'A shift of 1.8 kHz is measured with 4.0 MHz ultrasound at 30° to the flow.', lines: ['v = Δf c ÷ (2f cos θ) = 1800 × 1540 ÷ (2 × 4.0 × 10⁶ × [[0.866]])', 'v = [[0.4]] m s⁻¹'], calc: ['cosd(30)', '1800*1540/(2*4e6*cosd(30))'], why: 'cos 30° = 0.866.' },
      { q: 'Blood flows at 0.60 m s⁻¹. Ultrasound of 3.0 MHz is at 45° to the flow.', lines: ['Δf = 2 × 3.0 × 10⁶ × 0.60 × cos 45° ÷ 1540 = [[1653]] Hz'], calc: ['2*3e6*0.6*cosd(45)/1540'], why: 'Faster blood gives a bigger shift.' }
    ],
    exam: [
      { stem: '<p>Blood flows at 0.30 m s⁻¹ in an artery. In a narrowed section, the cross-sectional area falls to one-third. Ultrasound of 5.0 MHz is directed at 45° to the flow. (c = 1540 m s⁻¹)</p>', parts: [
        { q: 'Assuming the volume flow rate is the same, calculate the speed of the blood in the narrowed section.', m: 1, ans: { a: 0.90, unit: 'm s⁻¹', tol: 0.01 }, calc: '0.30*3', ms: [['B1', 'Av is constant, so v = 3 × 0.30 = 0.90 m s⁻¹']] },
        { q: 'Calculate the frequency shift measured from the narrowed section.', m: 2, ans: { a: 4132, unit: 'Hz', tol: 0.02 }, calc: '2*5e6*0.9*cosd(45)/1540', ms: [['C1', 'Δf = 2fv cos θ ÷ c = 2 × 5.0 × 10⁶ × 0.90 × cos 45° ÷ 1540'], ['A1', 'Δf = 4.1 × 10³ Hz']] },
        { q: 'The angle of the probe is only known to ±5° about 45°. Estimate the percentage uncertainty this causes in the measured speed.', m: 2, ans: { a: 8.85, unit: '%', tol: 0.08 }, calc: '((1/cosd(50)-1/cosd(40))/2)/(1/cosd(45))*100', ms: [['C1', 'v ∝ 1/cos θ: 1/cos 50° = 1.556, 1/cos 40° = 1.305, 1/cos 45° = 1.414'], ['A1', 'half-range ÷ value = 0.126 ÷ 1.414 = 9 %']] },
        { q: 'Blood is flowing away from the probe. How does the frequency of the reflected ultrasound compare with the emitted frequency?', m: 1, opts: ['It is lower', 'It is higher', 'It is the same', 'It is lower only if the angle is greater than 90°'], a: 0, why: 'A reflector moving away gives a lower frequency (a negative shift).' },
        { q: 'Explain why using a higher ultrasound frequency can make the measurement of blood speed more precise.', m: 1, lines: 2, ms: [['B1', 'The frequency shift is proportional to f, so it is larger and the same absolute uncertainty in measuring it is a smaller percentage']] }] }
    ]
  });

  /* ---------------- md9 Review and exam practice ---------------- */
  add('md9', {
    ex: [
      ['A model answer: choosing the technique', 'Suggest the most suitable imaging technique for each case, with a reason: (a) a broken wrist, (b) a fetus at 20 weeks, (c) whether a tumour has spread (its metabolic activity), (d) a suspected bleed inside the skull. (8 marks)', [
        ['(a) Broken wrist', '', [`${mp('X-ray image')}: bone attenuates far more than soft tissue, giving a clear, quick, low-dose image.`]],
        ['(b) Fetus', '', [`${mp('Ultrasound')}: no ionising radiation, so no risk to the fetus; it gives real-time images.`]],
        ['(c) Tumour activity', '', [`${mp('PET scan')}: a glucose-based tracer collects where cells are most active, so it shows function, not just structure.`]],
        ['(d) Bleed in the skull', '', [`${mp('CAT scan')}: ultrasound cannot pass through the skull, and CT distinguishes blood from brain tissue in 3D slices.`]]
      ], { desc: true }],
      ['Synoptic: one stone, two techniques', 'Ultrasound echoes from the front and back of a kidney stone arrive 78 μs and 91 μs after the pulse. The speed of ultrasound in the stone is 2800 m s⁻¹. X-rays (μ = 1.8 cm⁻¹ in the stone) then pass straight through it. Find the stone’s thickness and the fraction of X-rays it transmits.', [
        ['Thickness from the echoes', 'Use the time spent inside the stone and the speed in the stone.', ['Δt = 91 − 78 = 13 μs', `x = ${fr('2800 × 13 × 10⁻⁶', '2')} = 1.82 × 10⁻² m`, res('thickness = 1.8 cm')]],
        ['X-ray transmission', 'Same length unit as μ.', ['μx = 1.8 × 1.82 = 3.28', 'I/I₀ = e^(−3.28)', res('about 3.8 % is transmitted: the stone shows clearly')]]
      ], { chk: [['2800*13e-6/2', 0.0182], ['1.8*1.82', 3.276], ['exp(-1.8*1.82)', 0.0378]] }]
    ],
    gaps: [
      { q: 'An X-ray tube operates at 90 kV.', lines: ['maximum photon energy = [[1.44e-14]] J', 'minimum wavelength = [[1.38e-11]] m'], calc: ['90e3*e', 'h*c/(90e3*e)'], why: 'Both follow from E = eV.' }
    ],
    exam: [
      { stem: '<p>The thickness of a fluid-filled cyst is measured by ultrasound. Echoes from its front and back surfaces arrive 45.0 μs and 71.0 μs after the pulse. Each time is measured to ±0.5 μs. The speed of ultrasound in the fluid is 1520 m s⁻¹.</p>', parts: [
        { q: 'Calculate the thickness of the cyst.', m: 2, ans: { a: 0.01976, unit: 'm', tol: 0.02 }, calc: '1520*(71.0-45.0)*1e-6/2', ms: [['C1', 'time in the cyst (both ways) = 26.0 μs'], ['A1', 'x = 1520 × 26.0 × 10⁻⁶ ÷ 2 = 1.98 × 10⁻² m']] },
        { q: 'Calculate the percentage uncertainty in the thickness.', m: 2, ans: { a: 3.85, unit: '%', tol: 0.03 }, calc: '(0.5+0.5)/26*100', ms: [['C1', 'uncertainty in the time difference = 0.5 + 0.5 = 1.0 μs'], ['A1', '1.0 ÷ 26.0 × 100 = 3.8 %']] },
        { q: 'X-rays with μ = 0.21 cm⁻¹ in the fluid pass through the full thickness. Calculate the fraction transmitted.', m: 1, ans: { a: 0.660, unit: '', tol: 0.02 }, calc: 'exp(-0.21*1.976)', ms: [['B1', 'I/I₀ = e^(−0.21 × 1.98) = 0.66']] },
        { q: 'Explain why the cyst shows clearly on the ultrasound image but not on an X-ray image.', m: 2, lines: 3, ms: [['B1', 'X-rays: the fluid and the surrounding soft tissue have similar attenuation coefficients, so there is little contrast'], ['B1', 'Ultrasound: the acoustic impedance of the fluid differs from that of tissue, so its boundaries reflect pulses and are located from the echo times']] }] }
    ]
  });
})();
