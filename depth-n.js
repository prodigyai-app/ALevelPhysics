/* Nuclear and particle physics (n1–n10): extra worked examples, fill-the-gaps and exam-style questions.
   Constants: e = 1.60e-19 C, k = 8.99e9 N m² C⁻², u = 1.661e-27 kg, 1 u ≡ 931.5 MeV, mp = 1.007276 u, mn = 1.008665 u,
   electron 0.000549 u, 1 year = 3.16e7 s, NA = 6.02e23. Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const tbl = (head, rows) => `<div class="tbl-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const mp = t => `<b>${t}</b>`;

  /* ---------------- n1 Alpha-particle scattering ---------------- */
  add('n1', {
    ex: [
      ['Closest approach to a gold nucleus', 'An alpha particle of kinetic energy 5.0 MeV travels head-on towards a gold nucleus (Z = 79). Find the distance of closest approach.', [
        ['Energy at closest approach', 'The alpha particle stops momentarily: all its kinetic energy has become electric potential energy.', [`E_k = ${fr('kQq', 'd')}, so d = ${fr('kQq', 'E_k')}`]],
        ['Charges and energy in SI units', 'The alpha particle carries 2e; the nucleus carries Ze.', ['Q = 79 × 1.60 × 10⁻¹⁹ C,  q = 2 × 1.60 × 10⁻¹⁹ C', 'E_k = 5.0 × 10⁶ × 1.60 × 10⁻¹⁹ = 8.0 × 10⁻¹³ J']],
        ['Calculate', '', [`d = ${fr('8.99 × 10⁹ × 79 × 2 × (1.60 × 10⁻¹⁹)²', '8.0 × 10⁻¹³')}`, res('d = 4.5 × 10⁻¹⁴ m (45 fm)')]],
        ['What it tells you', '', ['The nucleus must be smaller than this. The gold nucleus is actually about 7 fm in radius.']]
      ], { chk: [['5.0e6*e', 8.0e-13], ['kC*79*2*e*e/8.0e-13', 4.55e-14]] }],
      ['Trap: two charges and two unit conversions', 'A student calculates the closest approach of a 4.0 MeV alpha particle to an aluminium nucleus (Z = 13) and gets 4.7 × 10⁻¹⁵ m. Find the mistake and the correct answer.', [
        ['Redo it carefully', '', ['E_k = 4.0 × 10⁶ × 1.60 × 10⁻¹⁹ = 6.4 × 10⁻¹³ J', `d = ${fr('8.99 × 10⁹ × (13e)(2e)', '6.4 × 10⁻¹³')}`, res('d = 9.3 × 10⁻¹⁵ m')]],
        ['Find the slip', 'The student’s answer is exactly half the correct one.', ['The student used a charge of e for the alpha particle instead of 2e.']],
        ['The other common slips', 'Check these every time.', ['MeV to J: multiply by 1.60 × 10⁻¹³. Nuclear charge: Z × e, not Z.']]
      ], { chk: [['4.0e6*e', 6.4e-13], ['kC*13*2*e*e/6.4e-13', 9.35e-15], ['kC*13*e*e/6.4e-13', 4.68e-15]] }],
      ['A model answer: the choices in the experiment', 'Explain why the alpha-scattering experiment used a very thin gold foil in an evacuated chamber. (4 marks)', [
        ['Thin foil', '', [`Each alpha particle should be ${mp('scattered by at most one nucleus')}, so the angle can be linked to a single close encounter.`]],
        ['Gold', '', [`Gold is ${mp('malleable')}, so it can be beaten to a foil only a few hundred atoms thick, and its ${mp('large charge (Z = 79)')} gives large deflections.`]],
        ['Vacuum', '', [`Alpha particles have a range of only a few centimetres in air: they would be ${mp('absorbed or deflected by air molecules')} before reaching the foil or the detector.`]],
        ['Check', '', [res('Four separate reasons, each linked to what it achieves: one mark each.')]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'An alpha particle of 6.0 MeV approaches a lead nucleus (Z = 82) head-on.', lines: ['E_k = 6.0 × 10⁶ × 1.60 × 10⁻¹⁹ = [[9.6e-13]] J', 'charge of the nucleus = 82 × 1.60 × 10⁻¹⁹ = [[1.312e-17]] C', 'd = k(82e)(2e) ÷ E_k = [[3.93e-14]] m'], calc: ['6.0e6*e', '82*e', 'kC*82*2*e*e/(6.0e6*e)'], why: 'The closer the approach, the greater the energy needed.' },
      { q: 'At its closest approach to a nucleus an alpha particle has electric potential energy 1.2 × 10⁻¹² J.', lines: ['Its initial kinetic energy was [[1.2e-12]] J', 'in MeV: 1.2 × 10⁻¹² ÷ 1.60 × 10⁻¹³ = [[7.5]] MeV'], calc: ['1.2e-12', '1.2e-12/1.6e-13'], why: 'Energy is conserved, and the alpha particle is momentarily at rest.' }
    ],
    exam: [
      { stem: '<p>Alpha particles of kinetic energy 4.8 MeV are directed at a thin silver foil. Silver has proton number 47.</p>', parts: [
        { q: 'Calculate the distance of closest approach for an alpha particle that travels directly towards a silver nucleus.', m: 3, ans: { a: 2.82e-14, unit: 'm', tol: 0.02 }, calc: 'kC*47*2*e*e/(4.8e6*e)', ms: [['C1', 'E_k = 4.8 × 1.60 × 10⁻¹³ = 7.68 × 10⁻¹³ J'], ['C1', 'd = kQq ÷ E_k with Q = 47e and q = 2e'], ['A1', 'd = 2.8 × 10⁻¹⁴ m']] },
        { q: 'The experiment is repeated with alpha particles of higher energy. Explain how the number of alpha particles scattered through large angles changes.', m: 2, lines: 3, ms: [['B1', 'Fewer are scattered through large angles'], ['B1', 'A faster alpha particle passing at the same distance from the nucleus spends less time near it, so it is deflected less (it must pass closer to be turned back)']] },
        { q: 'Explain why high-energy electrons, not alpha particles, are used to measure the radius of a nucleus accurately.', m: 2, lines: 3, ms: [['B1', 'Electrons are leptons, so they are not affected by the strong nuclear force; alpha particles that get close to the nucleus are'], ['B1', 'Electrons diffract around the nucleus, and the angle of the first minimum gives its radius']] }] }
    ]
  });

  /* ---------------- n2 The nucleus: size, density and the strong force ---------------- */
  add('n2', {
    ex: [
      ['Every nucleus has the same density', 'Use R = r₀A^⅓ with r₀ = 1.2 fm to find the radii of carbon-12 and gold-197, and show that their densities are the same.', [
        ['Radii', '', ['R(C) = 1.2 × 12^⅓ = 2.75 fm', 'R(Au) = 1.2 × 197^⅓ = 6.98 fm']],
        ['Density in general', 'The mass is about A × u and the volume is ⁴⁄₃πR³ = ⁴⁄₃πr₀³A.', [`ρ = ${fr('Au', '⁴⁄₃πr₀³A')} = ${fr('u', '⁴⁄₃πr₀³')}: A cancels`]],
        ['Calculate', '', [`ρ = ${fr('1.661 × 10⁻²⁷', '⁴⁄₃π × (1.2 × 10⁻¹⁵)³')}`, res('ρ = 2.3 × 10¹⁷ kg m⁻³ for every nucleus')]]
      ], { chk: [['1.2*cbrt(12)', 2.75], ['1.2*cbrt(197)', 6.98], ['u/(4/3*pi*1.2e-15**3)', 2.29e17]] }],
      ['Trap: comparing sizes', 'How many times larger is the radius of a gold-197 nucleus than that of a carbon-12 nucleus?', [
        ['The wrong answer', 'It is tempting to divide the nucleon numbers.', ['197 ÷ 12 = 16.4  ✗  (this is the ratio of the volumes)']],
        ['Use the cube root', '', [`${fr('R(Au)', 'R(C)')} = (${fr('197', '12')})^⅓`, res('about 2.5 times larger')]],
        ['Why', '', ['Nucleons are packed at the same density, so volume ∝ A and radius ∝ A^⅓.']]
      ], { chk: [['197/12', 16.4], ['cbrt(197/12)', 2.54]] }],
      ['The strong force against electrostatic repulsion', 'Two protons in a nucleus are 1.0 fm apart. Calculate the electrostatic force between them, and explain why the nucleus does not fly apart. (Describe the strong force fully.)', [
        ['Electrostatic force', '', [`F = ${fr('ke²', 'r²')} = ${fr('8.99 × 10⁹ × (1.60 × 10⁻¹⁹)²', '(1.0 × 10⁻¹⁵)²')}`, res('F = 230 N (on a particle of mass 10⁻²⁷ kg)')]],
        ['A model description of the strong force', 'The marking points examiners look for.', [`It acts between ${mp('all nucleons')} (protons and neutrons). It is ${mp('repulsive below about 0.5 fm')}, ${mp('attractive from about 0.5 fm to 3 fm')} and ${mp('negligible beyond about 3 fm')}.`]],
        ['Why the nucleus holds together', '', ['At about 1 fm the strong attraction is greater than the electrostatic repulsion. The short range is why large nuclei need extra neutrons: they add attraction without adding repulsion.']]
      ], { chk: [['kC*e*e/1e-30', 230.1]] }]
    ],
    gaps: [
      { q: 'Find the radius of an oxygen-16 nucleus. (r₀ = 1.2 fm)', lines: ['16^⅓ = [[2.52]]', 'R = 1.2 × 2.52 = [[3.02]] fm'], calc: ['cbrt(16)', '1.2*cbrt(16)'], why: 'About 3 × 10⁻¹⁵ m.' },
      { q: 'Find the density of an iron-56 nucleus. (u = 1.661 × 10⁻²⁷ kg, r₀ = 1.2 fm)', lines: ['mass = 56 × 1.661 × 10⁻²⁷ = [[9.30e-26]] kg', 'R = 1.2 × 10⁻¹⁵ × 56^⅓ = [[4.59e-15]] m', 'ρ = mass ÷ ⁴⁄₃πR³ = [[2.29e17]] kg m⁻³'], calc: ['56*u', '1.2e-15*cbrt(56)', '56*u/(4/3*pi*(1.2e-15*cbrt(56))**3)'], why: 'The same as for any other nucleus.' },
      { q: 'Two protons are 2.0 fm apart.', lines: ['F = ke² ÷ r² = 8.99 × 10⁹ × (1.60 × 10⁻¹⁹)² ÷ (2.0 × 10⁻¹⁵)² = [[57.5]] N'], calc: ['kC*e*e/4e-30'], why: 'Doubling the separation quarters the electrostatic force.' }
    ],
    exam: [
      { stem: '<p>Electron-scattering experiments give the radius R of nuclei of nucleon number A. A graph of ln (R / fm) against ln A is a straight line with gradient 0.33 and intercept 0.18.</p>', parts: [
        { q: 'Show that R = r₀A^⅓ predicts a straight line on this graph, and state what the gradient and intercept represent.', m: 2, lines: 3, ms: [['B1', 'ln R = ln r₀ + ⅓ ln A, which has the form y = c + mx'], ['B1', 'gradient = ⅓ (the power) and intercept = ln r₀']] },
        { q: 'Use the intercept to determine r₀.', m: 1, ans: { a: 1.20, unit: 'fm', tol: 0.02 }, calc: 'exp(0.18)', ms: [['B1', 'r₀ = e^0.18 = 1.2 fm']] },
        { q: 'A nucleus has radius 4.8 fm. Calculate its nucleon number.', m: 2, ans: { a: 64, unit: '', tol: 0.03 }, calc: '(4.8/1.2)**3', ms: [['C1', 'A = (R ÷ r₀)³ = (4.8 ÷ 1.2)³'], ['A1', 'A = 64']] },
        { q: 'Explain why electrons with energies of hundreds of MeV are needed in these experiments.', m: 2, lines: 3, ms: [['B1', 'For diffraction, the de Broglie wavelength must be comparable to the size of the nucleus (about 10⁻¹⁵ m)'], ['B1', 'λ = h ÷ p, so the electrons need a very large momentum, and hence a very high energy']] }] }
    ]
  });

  /* ---------------- n3 Antiparticles, hadrons, leptons and quarks ---------------- */
  add('n3', {
    ex: [
      ['A model answer: which forces act on which particles?', 'State which of the strong and weak nuclear forces act on hadrons and on leptons, and name the force responsible for beta decay. (3 marks)', [
        ['Hadrons', '', [`Hadrons (baryons and mesons) are affected by ${mp('both the strong and the weak nuclear force')} (and by the electromagnetic force if charged).`]],
        ['Leptons', '', [`Leptons (electron, muon, tau and the neutrinos) are affected by the ${mp('weak nuclear force but not the strong nuclear force')}. Neutrinos feel only the weak force (and gravity).`]],
        ['Beta decay', 'The weak force is the only one that can change a quark’s type.', [`Beta decay is caused by the ${mp('weak nuclear force')}: it changes d → u in β⁻ decay and u → d in β⁺ decay.`]]
      ], { desc: true }],
      ['Quark compositions and charges', 'Find the charge of each particle from its quarks: (a) π⁺ (u d̄), (b) K⁰ (d s̄), (c) the antiproton (ū ū d̄), (d) Σ⁻ (d d s).', [
        ['Quark charges', 'Antiquarks have the opposite charge.', ['u +⅔, d −⅓, s −⅓;  ū −⅔, d̄ +⅓, s̄ +⅓']],
        ['Mesons', 'One quark and one antiquark.', ['π⁺: +⅔ + ⅓ = +1', 'K⁰: −⅓ + ⅓ = 0']],
        ['Baryons and antibaryons', 'Three quarks or three antiquarks.', ['antiproton: −⅔ − ⅔ + ⅓ = −1', 'Σ⁻: −⅓ − ⅓ − ⅓ = −1']],
        ['Classify', '', [res('π⁺ and K⁰ are mesons; the antiproton is an antibaryon; Σ⁻ is a baryon')]]
      ], { chk: [['2/3+1/3', 1], ['-1/3+1/3', 0], ['-2/3-2/3+1/3', -1], ['-1/3*3', -1]] }],
      ['Proton–antiproton annihilation', 'A proton and an antiproton, both at rest, annihilate to produce two photons. Find the energy and the wavelength of each photon. (mp = 1.673 × 10⁻²⁷ kg)', [
        ['Why two photons?', 'Momentum is zero before, so it must be zero after.', ['The photons travel in opposite directions with equal energy.']],
        ['Energy of each photon', 'Each photon carries the rest energy of one particle.', ['E = mc² = 1.673 × 10⁻²⁷ × (3.00 × 10⁸)² = 1.51 × 10⁻¹⁰ J', res('E = 941 MeV')]],
        ['Wavelength', '', [`λ = ${fr('hc', 'E')} = ${fr('6.63 × 10⁻³⁴ × 3.00 × 10⁸', '1.51 × 10⁻¹⁰')}`, res('λ = 1.3 × 10⁻¹⁵ m (gamma rays)')]]
      ], { chk: [['mp*c*c', 1.506e-10], ['mp*c*c/e/1e6', 941], ['h/(mp*c)', 1.32e-15]] }]
    ],
    gaps: [
      { q: 'The Σ⁺ baryon is made of the quarks u u s. Find its charge in units of e.', lines: ['⅔ + ⅔ − ⅓ = [[1]]'], calc: ['2/3+2/3-1/3'], why: 'A baryon with charge +1, like the proton.' },
      { q: 'Write the β⁻ decay of a neutron in terms of quarks, and check the charge.', lines: ['d → u + e⁻ + [[antineutrino|ν̄|v̄|electron antineutrino|anti-neutrino]]', 'charge: −⅓ = ⅔ − 1 + [[0]]'], calc: ['0'], why: 'The antineutrino carries no charge but must appear (lepton balance is beyond OCR, but the particle is required).' }
    ],
    exam: [
      { stem: '<p>The lambda particle Λ⁰ is a baryon with quark composition u d s.</p>', parts: [
        { q: 'Show that the lambda particle is neutral, and explain how you know it is a baryon.', m: 2, lines: 3, ms: [['B1', '⅔ − ⅓ − ⅓ = 0'], ['B1', 'It is made of three quarks']] },
        { q: 'A free neutron decays by β⁻ emission. Write the decay as a quark transformation and show that charge is conserved.', m: 2, lines: 3, ms: [['B1', 'd → u + e⁻ + ν̄ₑ (antineutrino required)'], ['B1', '−⅓ = +⅔ + (−1) + 0']] },
        { q: 'Name the force responsible for this decay, and explain why it cannot be the strong nuclear force.', m: 2, lines: 3, ms: [['B1', 'The weak nuclear force'], ['B1', 'The strong force cannot change the type (flavour) of a quark, and it does not act on the leptons emitted']] },
        { q: 'Which particle is not affected by the strong nuclear force?', m: 1, opts: ['neutron', 'pion', 'muon', 'proton'], a: 2, why: 'The muon is a lepton; the others are hadrons.' }] }
    ]
  });

  /* ---------------- n4 Alpha, beta and gamma radiation ---------------- */
  add('n4', {
    ex: [
      ['Following a decay chain', 'Uranium-238 (Z = 92) decays by α emission, then β⁻, then β⁻. Find the nucleon number and proton number after each step, and name the final element.', [
        ['Alpha decay', 'An alpha particle is ⁴₂He: A falls by 4, Z falls by 2.', ['²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂α']],
        ['First β⁻ decay', 'A neutron becomes a proton: A unchanged, Z rises by 1.', ['²³⁴₉₀Th → ²³⁴₉₁Pa + ⁰₋₁e + ν̄ₑ']],
        ['Second β⁻ decay', '', ['²³⁴₉₁Pa → ²³⁴₉₂U + ⁰₋₁e + ν̄ₑ']],
        ['Check the totals', 'A and Z must balance in each equation.', [res('Final nucleus: ²³⁴₉₂U, an isotope of the starting element')]]
      ], { chk: [['238-4', 234], ['92-2', 90], ['90+1+1', 92]] }],
      ['Trap: β⁺ decay', 'Sodium-22 (Z = 11) decays by β⁺ emission. Write the equation.', [
        ['What changes', 'The trap: treating β⁺ like β⁻. In β⁺ decay a proton becomes a neutron, so Z goes DOWN by 1.', ['p → n + e⁺ + νₑ']],
        ['Write the equation', 'The positron is ⁰₊₁e and a neutrino (not an antineutrino) is emitted.', [res('²²₁₁Na → ²²₁₀Ne + ⁰₊₁e + νₑ')]],
        ['Check', '', ['A: 22 = 22 + 0.   Z: 11 = 10 + 1.']]
      ], { chk: [['11-1', 10]] }],
      ['Gamma rays and the inverse-square law', 'A gamma source gives a count rate of 245 per minute at 10 cm from a GM tube. The background count rate is 25 per minute. Predict the count rate at 20 cm.', [
        ['Correct for background first', 'The trap: applying the inverse-square law to the measured rate.', ['corrected rate = 245 − 25 = 220 per minute']],
        ['Inverse square', 'Doubling the distance quarters the intensity of a point source of gamma rays.', ['corrected rate at 20 cm = 220 ÷ 4 = 55 per minute']],
        ['Add the background back', 'The GM tube still detects the background.', [res('measured rate = 55 + 25 = 80 per minute')]]
      ], { chk: [['245-25', 220], ['220/4', 55], ['220/4+25', 80]] }]
    ],
    gaps: [
      { q: 'Radium-226 (Z = 88) decays by alpha emission to radon.', lines: ['nucleon number of radon = [[222]]', 'proton number of radon = [[86]]'], calc: ['226-4', '88-2'], why: '²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂α.' },
      { q: 'Carbon-14 (Z = 6) decays by β⁻ emission.', lines: ['proton number of the daughter = [[7]] (nitrogen)', 'nucleon number of the daughter = [[14]]'], calc: ['7', '14'], why: 'A is unchanged in beta decay.' },
      { q: 'A 5.0 MeV alpha particle loses about 30 eV in each ionisation.', lines: ['number of ion pairs = 5.0 × 10⁶ ÷ 30 = [[1.67e5]]'], calc: ['5.0e6/30'], why: 'This is why alpha particles stop within a few centimetres of air.' }
    ],
    exam: [
      { stem: '<p>Thorium-232 (Z = 90) decays to lead-208 (Z = 82) through a series of α and β⁻ decays.</p>', parts: [
        { q: 'Calculate the number of alpha decays in the series.', m: 1, ans: { a: 6, unit: '', tol: 0 }, calc: '(232-208)/4', ms: [['B1', 'Only α decay changes A: (232 − 208) ÷ 4 = 6']] },
        { q: 'Calculate the number of β⁻ decays in the series.', m: 2, ans: { a: 4, unit: '', tol: 0 }, calc: '82-(90-2*6)', ms: [['C1', 'After 6 α decays, Z = 90 − 12 = 78'], ['A1', 'Each β⁻ decay raises Z by 1, so 82 − 78 = 4']] },
        { q: 'A gamma source gives a corrected count rate of 360 per minute at 0.15 m from a GM tube. The background is 20 per minute. Calculate the count rate the GM tube would record at 0.45 m.', m: 2, ans: { a: 60, unit: 'min⁻¹', tol: 0.02 }, calc: '360*(0.15/0.45)**2+20', ms: [['C1', 'corrected rate = 360 × (0.15 ÷ 0.45)² = 40 min⁻¹'], ['A1', 'recorded rate = 40 + 20 = 60 min⁻¹']] },
        { q: 'State two precautions that reduce the dose received by a student using a sealed radioactive source.', m: 2, lines: 3, ms: [['B1', 'Handle the source with long tongs and point it away from people (increase distance)'], ['B1', 'Minimise the time it is out of its lead-lined box, and return it as soon as the experiment ends']] }] }
    ]
  });

  /* ---------------- n5 Random decay, activity and half-life ---------------- */
  add('n5', {
    ex: [
      ['Trap: decay is not linear', 'Technetium-99m has a half-life of 6.0 hours. How long does it take for the activity of a dose to fall to 5.0 % of its initial value?', [
        ['The wrong idea', 'The activity does not fall by the same amount each hour.', ['5 % is between 4 half-lives (6.25 %) and 5 half-lives (3.1 %), so “95 % of 6 h” is meaningless.']],
        ['Use the exponential', '', [`A = A₀e^(−λt), so t = ${fr('ln (A₀/A)', 'λ')}`, `λ = ${fr('ln 2', '6.0 h')} = 0.1155 h⁻¹`]],
        ['Calculate', '', [`t = ${fr('ln 20', '0.1155')}`, res('t = 26 hours')]]
      ], { chk: [['ln(2)/6', 0.1155], ['ln(20)/(ln(2)/6)', 25.9]] }],
      ['From activity to mass', 'A strontium-90 source has an activity of 4.0 × 10⁶ Bq. The half-life of Sr-90 is 28.8 years. Find the mass of strontium-90 in the source. (molar mass 0.090 kg mol⁻¹)', [
        ['Decay constant in s⁻¹', 'Activity is in Bq (s⁻¹), so λ must be in s⁻¹.', [`λ = ${fr('0.693', '28.8 × 3.16 × 10⁷')} = 7.62 × 10⁻¹⁰ s⁻¹`]],
        ['Number of nuclei', 'A = λN.', [`N = ${fr('4.0 × 10⁶', '7.62 × 10⁻¹⁰')} = 5.25 × 10¹⁵`]],
        ['Mass', 'Use the Avogadro constant.', [`m = ${fr('5.25 × 10¹⁵', '6.02 × 10²³')} × 0.090`, res('m = 7.9 × 10⁻¹⁰ kg (less than a microgram)')]]
      ], { chk: [['ln(2)/(28.8*yr)', 7.62e-10], ['4.0e6/(ln(2)/(28.8*yr))', 5.25e15], ['4.0e6/(ln(2)/(28.8*yr))/NA*0.090', 7.85e-10]] }]
    ],
    gaps: [
      { q: 'Iodine-131 has a half-life of 8.0 days. Find its decay constant in s⁻¹.', lines: ['t½ = 8.0 × 24 × 3600 = [[6.912e5]] s', 'λ = ln 2 ÷ t½ = [[1.003e-6]] s⁻¹'], calc: ['8*86400', 'ln(2)/(8*86400)'], why: 'Always convert to seconds when the activity is in becquerels.' },
      { q: 'A source decays for three half-lives.', lines: ['fraction of nuclei left = (½)³ = [[0.125]]', 'percentage decayed = [[87.5]] %'], calc: ['0.5**3', '(1-0.5**3)*100'], why: 'After n half-lives the fraction left is (½)ⁿ.' },
      { q: 'A sample contains 2.0 × 10²⁰ nuclei with decay constant 3.0 × 10⁻⁹ s⁻¹.', lines: ['A = λN = [[6.0e11]] Bq'], calc: ['3.0e-9*2.0e20'], why: 'Activity is proportional to the number of undecayed nuclei.' }
    ],
    exam: [
      { stem: '<p>A patient is injected with a dose of technetium-99m with an activity of 400 MBq. The half-life of technetium-99m is 6.0 hours.</p>', parts: [
        { q: 'Calculate the activity of the dose 24 hours later.', m: 2, ans: { a: 25, unit: 'MBq', tol: 0.02 }, calc: '400*0.5**(24/6)', ms: [['C1', '24 h is 4 half-lives'], ['A1', 'A = 400 × (½)⁴ = 25 MBq']] },
        { q: 'Calculate the number of technetium-99m nuclei injected.', m: 2, ans: { a: 1.25e13, unit: '', tol: 0.02 }, calc: '400e6/(ln(2)/(6*3600))', ms: [['C1', 'λ = 0.693 ÷ (6.0 × 3600) = 3.21 × 10⁻⁵ s⁻¹'], ['A1', 'N = A ÷ λ = 4.0 × 10⁸ ÷ 3.21 × 10⁻⁵ = 1.2 × 10¹³']] },
        { q: 'Explain why a half-life of a few hours is suitable for a medical tracer.', m: 2, lines: 3, ms: [['B1', 'Long enough for the tracer to reach the organ and for images to be taken'], ['B1', 'Short enough that the activity, and so the dose to the patient, falls quickly afterwards']] },
        { q: 'A student measures the activity of a sample with a GM tube. Explain why the background count must be measured and subtracted.', m: 1, lines: 2, ms: [['B1', 'The GM tube also detects background radiation, so the measured count rate is larger than that due to the sample alone']] }] }
    ]
  });

  /* ---------------- n6 Exponential decay: equations, log graphs and modelling ---------------- */
  add('n6', {
    ex: [
      ['Half-life from a log graph', 'The activity of a sample of protactinium-234m is measured every 60 s.' + tbl(['t / s', '0', '60', '120', '180', '240'], [['A / Bq', '120', '66.2', '36.6', '20.2', '11.1'], ['ln (A / Bq)', '4.787', '4.193', '3.600', '3.006', '2.407']]) + 'Find the decay constant and the half-life.', [
        ['Linearise', '', ['ln A = ln A₀ − λt: a straight line of gradient −λ']],
        ['Gradient', 'Use the first and last points, which lie on the line.', [`gradient = ${fr('2.407 − 4.787', '240 − 0')} = −9.92 × 10⁻³ s⁻¹`]],
        ['Half-life', '', ['λ = 9.92 × 10⁻³ s⁻¹', `t½ = ${fr('0.693', '9.92 × 10⁻³')}`, res('t½ = 70 s')]]
      ], { chk: [['120*exp(-ln(2)/70*60)', 66.2], ['120*exp(-ln(2)/70*240)', 11.1], ['ln(11.1)', 2.407], ['(2.407-4.787)/240', -9.9167e-03], ['ln(2)/9.9167e-03', 69.9]] }],
      ['Trap: a time step that is too large', 'A spreadsheet models decay with ΔN = −λNΔt, N₀ = 1000 and λ = 0.10 s⁻¹. Compare the model with Δt = 5 s and the exact value at t = 10 s.', [
        ['Two steps of 5 s', '', ['ΔN = −0.10 × 1000 × 5 = −500, so N = 500', 'ΔN = −0.10 × 500 × 5 = −250, so N = 250']],
        ['Exact value', '', ['N = 1000e^(−0.10 × 10) = 1000e⁻¹ = 368']],
        ['Why they differ', 'The model assumes N stays constant through each step, but it falls during the step.', [res('Δt must be small compared with 1/λ (10 s here); with Δt = 0.1 s the model gives 366.')]]
      ], { chk: [['1000*(1-0.10*5)**2', 250], ['1000*exp(-1)', 367.9], ['1000*(1-0.10*0.1)**100', 366.0]] }]
    ],
    gaps: [
      { q: 'A source has initial activity 500 Bq and decay constant 0.020 s⁻¹. Find the activity after 50 s.', lines: ['λt = 0.020 × 50 = [[1]]', 'A = 500e^(−1) = [[184]] Bq'], calc: ['0.020*50', '500*exp(-1)'], why: 'After a time 1/λ the activity has fallen to 37 % (1/e).' },
      { q: 'The decay constant of a source is 0.0231 s⁻¹. How long does its activity take to fall from 800 Bq to 200 Bq?', lines: ['ln (800 ÷ 200) = [[1.386]]', 't = 1.386 ÷ 0.0231 = [[60]] s'], calc: ['ln(4)', 'ln(4)/0.0231'], why: 'This is two half-lives of 30 s.' }
    ],
    exam: [
      { stem: '<p>Potassium-40 decays to argon-40 with a half-life of 1.25 × 10⁹ years. Argon is a gas that is trapped when volcanic rock solidifies, so it can be used to date the rock. A rock sample is found to contain 0.82 of the potassium-40 it had when it solidified.</p>', parts: [
        { q: 'Calculate the decay constant of potassium-40 in year⁻¹.', m: 1, ans: { a: 5.55e-10, unit: 'year⁻¹', tol: 0.02 }, calc: 'ln(2)/1.25e9', ms: [['B1', 'λ = 0.693 ÷ 1.25 × 10⁹ = 5.5 × 10⁻¹⁰ year⁻¹']] },
        { q: 'Calculate the age of the rock.', m: 2, ans: { a: 3.58e8, unit: 'years', tol: 0.02 }, calc: 'ln(1/0.82)/(ln(2)/1.25e9)', ms: [['C1', '0.82 = e^(−λt), so t = ln (1 ÷ 0.82) ÷ λ'], ['A1', 't = 3.6 × 10⁸ years']] },
        { q: 'Explain why carbon-14 (half-life 5700 years) could not be used to date this rock.', m: 1, lines: 2, ms: [['B1', 'After about 60 000 half-lives no measurable carbon-14 would remain (and the rock never contained living material that took in carbon-14)']] }] }
    ]
  });

  /* ---------------- n7 Mass–energy, mass defect and binding energy ---------------- */
  add('n7', {
    ex: [
      ['The most stable nucleus: iron-56', 'An iron-56 nucleus (26 protons, 30 neutrons) has mass 55.920662 u. Calculate its binding energy per nucleon. (mp = 1.007276 u, mn = 1.008665 u, 1 u ≡ 931.5 MeV)', [
        ['Mass of the separate nucleons', '', ['26 × 1.007276 + 30 × 1.008665 = 56.449126 u']],
        ['Mass defect', '', ['Δm = 56.449126 − 55.920662 = 0.528464 u']],
        ['Binding energy', '', ['BE = 0.528464 × 931.5 = 492.3 MeV', `per nucleon: ${fr('492.3', '56')}`, res('8.79 MeV per nucleon: the peak of the curve')]]
      ], { chk: [['26*1.007276+30*1.008665', 56.449126], ['26*1.007276+30*1.008665-55.920662', 0.528464], ['0.528464*931.5', 492.3], ['0.528464*931.5/56', 8.79]] }],
      ['Energy released from binding energies', 'In one fission, uranium-235 splits into barium-141 and krypton-92 (plus neutrons). The binding energies per nucleon are: U-235 7.59 MeV, Ba-141 8.33 MeV, Kr-92 8.51 MeV. Estimate the energy released.', [
        ['Total binding energy before', 'Free neutrons have no binding energy.', ['235 × 7.59 = 1783.7 MeV']],
        ['Total binding energy after', '', ['141 × 8.33 + 92 × 8.51 = 1174.5 + 782.9 = 1957.4 MeV']],
        ['Energy released', 'The trap: subtracting the per-nucleon values (8.4 − 7.6 ≈ 0.8 MeV). Multiply by the nucleon numbers first.', ['released = 1957.4 − 1783.7', res('about 174 MeV')]]
      ], { chk: [['235*7.59', 1783.65], ['141*8.33+92*8.51', 1957.45], ['141*8.33+92*8.51-235*7.59', 173.8]] }]
    ],
    gaps: [
      { q: 'A deuterium nucleus (1 proton, 1 neutron) has mass 2.013553 u.', lines: ['Δm = 1.007276 + 1.008665 − 2.013553 = [[0.002388]] u', 'BE = 0.002388 × 931.5 = [[2.224]] MeV', 'BE per nucleon = [[1.112]] MeV'], calc: ['1.007276+1.008665-2.013553', '0.002388*931.5', '0.002388*931.5/2'], why: 'Deuterium is very weakly bound, which is why fusing it releases so much energy.' },
      { q: 'Show the energy equivalent of 1 u, using c = 3.00 × 10⁸ m s⁻¹.', lines: ['E = 1.661 × 10⁻²⁷ × (3.00 × 10⁸)² = [[1.495e-10]] J', 'in MeV: 1.495 × 10⁻¹⁰ ÷ 1.60 × 10⁻¹³ = [[934]] MeV'], calc: ['u*c*c', 'u*c*c/1.6e-13'], why: 'With more precise constants this is 931.5 MeV.' },
      { q: 'What mass is equivalent to 1.0 J of energy?', lines: ['m = E ÷ c² = [[1.11e-17]] kg'], calc: ['1/(c*c)'], why: 'Everyday energy changes involve undetectably small changes in mass.' }
    ],
    exam: [
      { stem: '<p>In 1932 Cockcroft and Walton split lithium nuclei by bombarding them with protons: ⁷₃Li + ¹₁p → 2 ⁴₂He. The masses are: lithium-7 7.014357 u, proton 1.007276 u, helium-4 4.001506 u.</p>', parts: [
        { q: 'Show that the energy released in each reaction is about 17 MeV.', m: 3, ans: { a: 17.35, unit: 'MeV', tol: 0.02 }, calc: '(7.014357+1.007276-2*4.001506)*931.5', ms: [['C1', 'mass before = 8.021633 u, mass after = 8.003012 u'], ['C1', 'mass difference = 0.018621 u'], ['A1', 'energy = 0.018621 × 931.5 = 17.3 MeV']] },
        { q: 'The incident proton has negligible kinetic energy. Calculate the kinetic energy of each helium nucleus.', m: 1, ans: { a: 8.67, unit: 'MeV', tol: 0.02 }, calc: '(7.014357+1.007276-2*4.001506)*931.5/2', ms: [['B1', 'The two nuclei share the energy equally (equal and opposite momenta): 8.7 MeV each']] },
        { q: 'Explain, in terms of binding energy per nucleon, why energy is released in this reaction.', m: 2, lines: 3, ms: [['B1', 'Helium-4 has a much greater binding energy per nucleon than lithium-7 (about 7.1 MeV compared with 5.6 MeV)'], ['B1', 'The products are more tightly bound, so the total binding energy increases and the difference is released as kinetic energy']] }] }
    ]
  });

  /* ---------------- n8 Induced fission, chain reactions and reactors ---------------- */
  add('n8', {
    ex: [
      ['How much fuel does a power station use?', 'A nuclear power station produces 1.0 GW of electrical power with an efficiency of 33 %. Each fission of uranium-235 releases 200 MeV. Find the mass of uranium-235 used each day.', [
        ['Thermal power', 'Only a third of the energy released becomes electrical energy.', [`P = ${fr('1.0 × 10⁹', '0.33')} = 3.03 × 10⁹ W`]],
        ['Fissions per second', '', ['energy per fission = 200 × 1.60 × 10⁻¹³ = 3.2 × 10⁻¹¹ J', `rate = ${fr('3.03 × 10⁹', '3.2 × 10⁻¹¹')} = 9.47 × 10¹⁹ s⁻¹`]],
        ['Mass per day', 'Each nucleus has mass 235 u.', ['nuclei per day = 9.47 × 10¹⁹ × 86 400 = 8.18 × 10²⁴', 'mass = 8.18 × 10²⁴ × 235 × 1.661 × 10⁻²⁷', res('about 3.2 kg of uranium-235 each day')]]
      ], { chk: [['1e9/0.33', 3.03e9], ['200*MeV', 3.2e-11], ['1e9/0.33/3.2e-11', 9.47e19], ['1e9/0.33/3.2e-11*86400*235*u', 3.19]] }],
      ['Why a moderator made of light atoms?', 'A fast neutron of 2.0 MeV must be slowed to about 0.025 eV. In a head-on elastic collision with a nucleus of mass M, a neutron of mass m keeps a fraction ((M − m)/(M + m))² of its kinetic energy. Estimate the number of head-on collisions needed with carbon-12 nuclei, and explain why lead would be useless.', [
        ['Fraction kept per collision with carbon', '', [`(${fr('12 − 1', '12 + 1')})² = 0.716`]],
        ['Number of collisions', '0.716ⁿ = 0.025 eV ÷ 2.0 MeV.', [`n = ${fr('ln (1.25 × 10⁻⁸)', 'ln 0.716')}`, res('about 55 head-on collisions (more in practice, as most are glancing)')]],
        ['Lead', 'M = 207.', [`(${fr('206', '208')})² = 0.98: the neutron keeps 98 % of its energy, so it would need about 900 collisions. A moderator works best when its nuclei have a mass close to the neutron’s.`]]
      ], { chk: [['(11/13)**2', 0.716], ['ln(0.025/2e6)/ln((11/13)**2)', 54.6], ['(206/208)**2', 0.981], ['ln(0.025/2e6)/ln((206/208)**2)', 943, 0.02]] }]
    ],
    gaps: [
      { q: 'Balance: ¹₀n + ²³⁵₉₂U → ¹⁴⁴₅₆Ba + ⁸⁹ₖKr + x ¹₀n', lines: ['nucleon numbers: 1 + 235 = 144 + 89 + x, so x = [[3]]', 'proton numbers: 92 = 56 + k, so k = [[36]]'], calc: ['236-144-89', '92-56'], why: 'Three neutrons are released, so a chain reaction is possible.' },
      { q: 'Each fission releases 200 MeV.', lines: ['in joules: 200 × 1.60 × 10⁻¹³ = [[3.2e-11]] J', 'fissions needed for 1.0 J = [[3.13e10]]'], calc: ['200*MeV', '1/(200*MeV)'], why: 'About 30 billion fissions for each joule.' }
    ],
    exam: [
      { stem: '<p>A thermal fission reactor generates 3.0 GW of thermal power. Each fission releases 3.2 × 10⁻¹¹ J.</p>', parts: [
        { q: 'Explain what is meant by the critical mass of a fissile material.', m: 2, lines: 3, ms: [['B1', 'The minimum mass needed for a self-sustaining chain reaction'], ['B1', 'At this mass, on average one neutron from each fission goes on to cause another fission (fewer escape through the surface)']] },
        { q: 'Calculate the number of fissions each second.', m: 1, ans: { a: 9.375e19, unit: 's⁻¹', tol: 0.02 }, calc: '3.0e9/3.2e-11', ms: [['B1', '3.0 × 10⁹ ÷ 3.2 × 10⁻¹¹ = 9.4 × 10¹⁹ s⁻¹']] },
        { q: 'Calculate the mass of uranium-235 used in one year. (1 year = 3.16 × 10⁷ s, mass of a U-235 nucleus = 235 u)', m: 2, ans: { a: 1156, unit: 'kg', tol: 0.02 }, calc: '3.0e9/3.2e-11*yr*235*u', ms: [['C1', 'number of fissions = 9.4 × 10¹⁹ × 3.16 × 10⁷ = 2.96 × 10²⁷'], ['A1', 'mass = 2.96 × 10²⁷ × 235 × 1.661 × 10⁻²⁷ = 1.2 × 10³ kg']] },
        { q: 'What is the purpose of the coolant in a reactor?', m: 1, opts: ['to absorb neutrons and control the rate of fission', 'to slow down fast neutrons so they cause further fissions', 'to transfer thermal energy from the core to the heat exchanger', 'to shield the operators from gamma radiation'], a: 2, why: 'Control rods absorb neutrons; the moderator slows them; the coolant carries the heat away.' }] }
    ]
  });

  /* ---------------- n9 Nuclear fusion ---------------- */
  add('n9', {
    ex: [
      ['The energy from the proton–proton chain', 'Overall, four protons fuse to form a helium-4 nucleus: 4 ¹₁p → ⁴₂He + 2 ⁰₊₁e + 2νₑ. Calculate the energy released. (proton 1.007276 u, helium-4 nucleus 4.001506 u, positron 0.000549 u)', [
        ['Mass before and after', 'Include the two positrons; neutrinos have negligible mass.', ['before: 4 × 1.007276 = 4.029104 u', 'after: 4.001506 + 2 × 0.000549 = 4.002604 u']],
        ['Mass defect and energy', '', ['Δm = 0.026500 u', res('E = 0.026500 × 931.5 = 24.7 MeV')]],
        ['The positrons annihilate', 'Each positron meets an electron and releases 2 × 0.511 MeV.', ['total per helium nucleus ≈ 24.7 + 2 × 1.02 = 26.7 MeV']]
      ], { chk: [['4*1.007276', 4.029104], ['4.001506+2*0.000549', 4.002604], ['(4*1.007276-4.001506-2*0.000549)*931.5', 24.68], ['(4*1.007276-4.001506-2*0.000549)*931.5+4*0.511', 26.73]] }],
      ['How hot must the core be?', 'Two protons must approach to about 2 fm to fuse. Estimate the temperature at which the mean kinetic energy of a proton, ³⁄₂kT, equals the electric potential energy at this separation.', [
        ['Potential energy at 2 fm', '', [`E = ${fr('ke²', 'r')} = ${fr('8.99 × 10⁹ × (1.60 × 10⁻¹⁹)²', '2.0 × 10⁻¹⁵')} = 1.15 × 10⁻¹³ J`]],
        ['Temperature', '', [`T = ${fr('2E', '3k')} = ${fr('2 × 1.15 × 10⁻¹³', '3 × 1.38 × 10⁻²³')}`, res('T ≈ 6 × 10⁹ K')]],
        ['Compare with the Sun', 'The Sun’s core is only about 1.5 × 10⁷ K.', ['Fusion still happens because a few protons in the fast tail of the distribution have far more than the mean energy, and quantum tunnelling lets some pass through the barrier.']]
      ], { chk: [['kC*e*e/2e-15', 1.151e-13], ['2*kC*e*e/2e-15/(3*k)', 5.56e9]] }]
    ],
    gaps: [
      { q: 'Two deuterium nuclei fuse: ²₁H + ²₁H → ³₂He + ¹₀n. Masses: ²H 2.013553 u, ³He 3.014932 u, n 1.008665 u.', lines: ['mass before = [[4.027106]] u', 'mass after = [[4.023597]] u', 'energy released = (difference) × 931.5 = [[3.27]] MeV'], calc: ['2*2.013553', '3.014932+1.008665', '(2*2.013553-3.014932-1.008665)*931.5'], why: 'Less than D–T fusion (17.6 MeV), which is why reactors use tritium.' },
      { q: 'Particles have mean kinetic energy 1.0 × 10⁻¹⁴ J.', lines: ['T = 2E ÷ 3k = [[4.83e8]] K'], calc: ['2*1e-14/(3*k)'], why: 'Fusion plasmas have temperatures of hundreds of millions of kelvin.' }
    ],
    exam: [
      { stem: '<p>The Sun radiates 3.8 × 10²⁶ W. Assume all of this comes from the proton–proton chain, each of which converts four protons into one helium-4 nucleus and releases 26.7 MeV.</p>', parts: [
        { q: 'Calculate the number of proton–proton chains completed each second.', m: 2, ans: { a: 8.90e37, unit: 's⁻¹', tol: 0.02 }, calc: '3.8e26/(26.7*MeV)', ms: [['C1', '26.7 MeV = 26.7 × 1.60 × 10⁻¹³ = 4.27 × 10⁻¹² J'], ['A1', '3.8 × 10²⁶ ÷ 4.27 × 10⁻¹² = 8.9 × 10³⁷ s⁻¹']] },
        { q: 'Calculate the mass of hydrogen (protons) used each second. (mp = 1.673 × 10⁻²⁷ kg)', m: 2, ans: { a: 5.96e11, unit: 'kg', tol: 0.02 }, calc: '4*3.8e26/(26.7*MeV)*mp', ms: [['C1', 'protons per second = 4 × 8.9 × 10³⁷ = 3.56 × 10³⁸'], ['A1', 'mass = 3.56 × 10³⁸ × 1.673 × 10⁻²⁷ = 6.0 × 10¹¹ kg']] },
        { q: 'Explain why fusion needs both a high temperature and a high density.', m: 2, lines: 3, ms: [['B1', 'High temperature: the nuclei need very high kinetic energy to overcome their electrostatic repulsion and get close enough for the strong force to act'], ['B1', 'High density: collisions must be frequent enough for a significant rate of fusion']] }] }
    ]
  });

  /* ---------------- n10 Review and exam practice ---------------- */
  add('n10', {
    ex: [
      ['Synoptic: a smoke detector source', 'A smoke detector contains americium-241, an alpha emitter with a half-life of 432 years and an activity of 37 kBq. Find the mass of americium in it, and explain why an alpha emitter is used.', [
        ['Decay constant', '', [`λ = ${fr('0.693', '432 × 3.16 × 10⁷')} = 5.08 × 10⁻¹¹ s⁻¹`]],
        ['Number of nuclei and mass', '', [`N = ${fr('3.7 × 10⁴', '5.08 × 10⁻¹¹')} = 7.29 × 10¹⁴`, 'mass = 7.29 × 10¹⁴ × 241 × 1.661 × 10⁻²⁷', res('mass = 2.9 × 10⁻¹⁰ kg (0.3 μg)')]],
        ['Why alpha?', 'Link the property to the use.', ['Alpha particles ionise the air strongly, giving a measurable current; smoke absorbs them, so the current falls. They are stopped by a few centimetres of air or the casing, so the detector is safe. The long half-life means the activity is nearly constant for the detector’s lifetime.']]
      ], { chk: [['ln(2)/(432*yr)', 5.08e-11], ['3.7e4/(ln(2)/(432*yr))', 7.29e14], ['3.7e4/(ln(2)/(432*yr))*241*u', 2.92e-10]] }],
      ['A model answer: fission and fusion compared', 'Compare nuclear fission and fusion as ways of releasing energy. (6 marks)', [
        ['What happens', '', [`Fission: a ${mp('heavy nucleus splits')} into two smaller nuclei after absorbing a neutron. Fusion: ${mp('two light nuclei join')} to form a heavier one.`]],
        ['Why energy is released', 'Use the binding-energy curve for both.', [`In both, the products have a ${mp('greater binding energy per nucleon')} than the reactants, so mass decreases and energy is released (E = Δmc²).`]],
        ['Conditions', '', [`Fission needs ${mp('slow (thermal) neutrons')} and a critical mass. Fusion needs ${mp('very high temperature and density')} to overcome electrostatic repulsion.`]],
        ['Products and practicality', '', [`Fission gives ${mp('long-lived radioactive waste')}; fusion products are mainly helium and neutrons, but sustained fusion is ${mp('not yet achieved')} in a power station. Fusion releases more energy per kilogram of fuel.`]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A source has activity 6.0 × 10⁵ Bq. Its half-life is 2.0 hours.', lines: ['activity after 6.0 hours = 6.0 × 10⁵ × (½)³ = [[7.5e4]] Bq', 'λ = 0.693 ÷ 7200 = [[9.63e-5]] s⁻¹'], calc: ['6.0e5*0.125', 'ln(2)/7200'], why: 'Count the half-lives first when the time is a whole number of them.' }
    ],
    exam: [
      { stem: '<p>Space probes use radioisotope generators. A generator contains 1.0 kg of plutonium-238, an alpha emitter of half-life 87.7 years. Each alpha particle has energy 5.59 MeV. (molar mass 0.238 kg mol⁻¹)</p>', parts: [
        { q: 'Calculate the power released by the plutonium when the generator is new.', m: 3, ans: { a: 566, unit: 'W', tol: 0.02 }, calc: '1/0.238*NA*ln(2)/(87.7*yr)*5.59*MeV', ms: [['C1', 'N = (1.0 ÷ 0.238) × 6.02 × 10²³ = 2.53 × 10²⁴ and λ = 0.693 ÷ (87.7 × 3.16 × 10⁷) = 2.50 × 10⁻¹⁰ s⁻¹'], ['C1', 'A = λN = 6.3 × 10¹⁴ Bq'], ['A1', 'P = 6.3 × 10¹⁴ × 5.59 × 1.60 × 10⁻¹³ = 570 W']] },
        { q: 'Calculate the power after 20 years.', m: 2, ans: { a: 483, unit: 'W', tol: 0.02 }, calc: '1/0.238*NA*ln(2)/(87.7*yr)*5.59*MeV*exp(-ln(2)/87.7*20)', ms: [['C1', 'P = P₀e^(−λt) with λ = 0.693 ÷ 87.7 year⁻¹'], ['A1', 'P = 566 × 0.854 = 480 W']] },
        { q: 'Explain why an alpha emitter is a good choice for this generator.', m: 2, lines: 3, ms: [['B1', 'Alpha particles are absorbed within the material and casing, so their kinetic energy is transferred to thermal energy where it is needed'], ['B1', 'Little shielding is needed to protect the probe’s electronics (no penetrating radiation to absorb)']] }] }
    ]
  });
})();
