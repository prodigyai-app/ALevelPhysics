/* Capacitors, electric fields and electromagnetism (fd1–fd12): extra worked examples, fill-the-gaps and exam-style questions.
   ε₀ = 8.85e-12 F m⁻¹, k = 1/4πε₀ = 8.99e9 N m² C⁻², e = 1.60e-19 C, mₑ = 9.11e-31 kg. Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const mp = t => `<b>${t}</b>`;
  const tbl = (head, rows) => `<table class="tbl"><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;

  /* ---------------- fd1 Capacitance; series and parallel ---------------- */
  add('fd1', {
    ex: [
      ['A mixed network', 'A 2.0 μF and a 3.0 μF capacitor in parallel are connected in series with a 5.0 μF capacitor across 12 V. Find the total capacitance and the charge drawn from the supply.', [
        ['Parallel pair', 'Capacitances in parallel add.', ['2.0 + 3.0 = 5.0 μF']],
        ['In series with 5.0 μF', 'Reciprocals add in series.', [`${fr('1', 'C')} = ${fr('1', '5.0')} + ${fr('1', '5.0')}, C = 2.5 μF`]],
        ['Charge', 'Q = CV.', [res('Q = 2.5 × 12 = 30 μC'), 'Each series section holds the same 30 μC, so each has 6.0 V across it.']]
      ], { chk: [['1/(1/5+1/5)', 2.5], ['2.5*12', 30]] }],
      ['Trap: capacitors combine the opposite way to resistors', 'A student says two 10 μF capacitors in series make 20 μF. Correct this.', [
        ['The trap', 'Using the resistor rule.', ['10 + 10 = 20 μF  ✗']],
        ['Series rule', 'The same charge sits on each, and the p.d.s add.', [`${fr('1', 'C')} = ${fr('1', '10')} + ${fr('1', '10')}`]],
        ['Answer', '', [res('C = 5.0 μF: series capacitance is less than either one')]]
      ], { chk: [['1/(1/10+1/10)', 5]] }]
    ],
    gaps: [
      { q: 'A 470 μF capacitor is charged to 9.0 V.', lines: ['Q = CV = [[4.23e-3]] C'], calc: ['470e-6*9'], why: '4.2 mC.' },
      { q: 'Capacitors of 4.7 μF, 2.2 μF and 1.0 μF in parallel', lines: ['total = [[7.9]] μF'], calc: ['4.7+2.2+1.0'], why: 'Parallel capacitances add.' },
      { q: 'A 6.0 μF and a 12 μF capacitor in series', lines: ['total = [[4]] μF'], calc: ['1/(1/6+1/12)'], why: '1/C = 1/6 + 1/12 = 1/4.' }
    ],
    exam: [
      { stem: '<p>A 4.0 μF capacitor is connected in parallel with a 2.0 μF capacitor. This pair is connected in series with a 3.0 μF capacitor across a 9.0 V supply.</p>', parts: [
        { q: 'Calculate the total capacitance of the network.', m: 2, ans: { a: 2.0, unit: 'μF', tol: 0.01 }, calc: '1/(1/6+1/3)', ms: [['C1', 'parallel pair = 6.0 μF'], ['A1', '1/C = 1/6.0 + 1/3.0, C = 2.0 μF']] },
        { q: 'Calculate the charge drawn from the supply.', m: 1, ans: { a: 18, unit: 'μC', tol: 0.01 }, calc: '2*9', ms: [['B1', 'Q = 2.0 × 9.0 = 18 μC']] },
        { q: 'Calculate the p.d. across the 3.0 μF capacitor.', m: 1, ans: { a: 6.0, unit: 'V', tol: 0.01 }, calc: '18/3', ms: [['B1', 'V = 18 ÷ 3.0 = 6.0 V']] },
        { q: 'Calculate the charge on the 4.0 μF capacitor.', m: 2, ans: { a: 12, unit: 'μC', tol: 0.01 }, calc: '4*(9-18/3)', ms: [['C1', 'p.d. across the parallel pair = 9.0 − 6.0 = 3.0 V'], ['A1', 'Q = 4.0 × 3.0 = 12 μC']] }] },
      { stem: `<p>A student charges a capacitor to different p.d.s and measures the charge with a coulombmeter.</p>${tbl(['V / V', '2.0', '4.0', '6.0', '8.0'], [['Q / μC', '2.4', '4.9', '7.3', '9.6']])}`, parts: [
        { q: 'Use the gradient of a graph of Q against V to find the capacitance.', m: 2, ans: { a: 1.2, unit: 'μF', tol: 0.03 }, calc: '(9.6-2.4)/(8-2)', ms: [['C1', 'gradient = ΔQ ÷ ΔV, e.g. (9.6 − 2.4) ÷ (8.0 − 2.0)'], ['A1', 'C = 1.2 μF']] },
        { q: 'Explain why the gradient method is better than calculating Q ÷ V for a single reading.', m: 1, lines: 2, ms: [['B1', 'It uses all the data, so it reduces the effect of random errors, and it is unaffected by a zero error in the coulombmeter']] }] }
    ]
  });

  /* ---------------- fd2 Energy stored by a capacitor ---------------- */
  add('fd2', {
    ex: [
      ['A camera flash', 'A 220 μF flash capacitor is charged to 300 V and discharges through the lamp in 1.0 ms. Find the energy and the mean power.', [
        ['Energy', 'W = ½CV².', ['W = ½ × 220 × 10⁻⁶ × 300² = 9.9 J']],
        ['Mean power', '', [res('P = 9.9 ÷ 1.0 × 10⁻³ = 9.9 kW'), 'A small battery could never supply this power directly.']]
      ], { chk: [['0.5*220e-6*300**2', 9.9], ['0.5*220e-6*300**2/1e-3', 9900]] }],
      ['Trap: energy and p.d. are not proportional', 'A capacitor’s p.d. falls to half its starting value as it discharges. What fraction of its energy is left?', [
        ['The tempting answer', 'The trap: “half the p.d., half the energy”.', ['½  ✗']],
        ['W ∝ V²', '', ['(½)² = ¼']],
        ['Answer', '', [res('a quarter of the energy is left; three quarters has been transferred')]]
      ], { chk: [['0.5**2', 0.25]] }]
    ],
    gaps: [
      { q: 'A capacitor stores 3.0 mC at 6.0 V.', lines: ['W = ½QV = [[9e-3]] J'], calc: ['0.5*3e-3*6'], why: 'The area under the V–Q graph.' },
      { q: 'A 1000 μF capacitor at 12 V', lines: ['W = ½CV² = [[0.072]] J'], calc: ['0.5*1e-3*144'], why: 'Use C in farads.' },
      { q: 'A 50 μF capacitor holds 2.0 mC.', lines: ['W = Q² ÷ 2C = [[0.04]] J'], calc: ['(2e-3)**2/(2*50e-6)'], why: 'The third form of the energy equation.' }
    ],
    exam: [
      { stem: '<p>A defibrillator stores 150 J in a capacitor charged to 2000 V. The capacitor discharges through the patient in about 5.0 ms.</p>', parts: [
        { q: 'Calculate the capacitance.', m: 2, ans: { a: 7.5e-5, unit: 'F', tol: 0.01 }, calc: '2*150/2000**2', ms: [['C1', 'W = ½CV², so C = 2W ÷ V²'], ['A1', 'C = 7.5 × 10⁻⁵ F (75 μF)']] },
        { q: 'Calculate the charge stored.', m: 1, ans: { a: 0.15, unit: 'C', tol: 0.01 }, calc: '7.5e-5*2000', ms: [['B1', 'Q = CV = 0.15 C']] },
        { q: 'Estimate the mean current during the discharge.', m: 2, ans: { a: 30, unit: 'A', tol: 0.01 }, calc: '0.15/5e-3', ms: [['C1', 'I = Q ÷ t'], ['A1', 'I = 0.15 ÷ 5.0 × 10⁻³ = 30 A']] },
        { q: 'Calculate the fraction of the stored energy left when the p.d. has fallen to 1000 V.', m: 1, ans: { a: 0.25, unit: '', tol: 0.01 }, calc: '(1000/2000)**2', ms: [['B1', 'W ∝ V², so (1000 ÷ 2000)² = 0.25']] }] },
      { stem: '<p>A 10 F supercapacitor is charged to 2.7 V and used to light a 0.50 W LED.</p>', parts: [
        { q: 'Calculate the energy stored.', m: 1, ans: { a: 36.5, unit: 'J', tol: 0.01 }, calc: '0.5*10*2.7**2', ms: [['B1', '½ × 10 × 2.7² = 36 J']] },
        { q: 'Calculate the maximum time the LED could be lit at full power.', m: 1, ans: { a: 72.9, unit: 's', tol: 0.01 }, calc: '0.5*10*2.7**2/0.5', ms: [['B1', 't = 36.45 ÷ 0.50 = 73 s']] },
        { q: 'Suggest why the LED will in practice be lit at full power for less time than this.', m: 1, lines: 2, ms: [['B1', 'The p.d. falls as the capacitor discharges, and the LED stops working below a minimum p.d., so not all the energy can be used (some is also dissipated in resistance)']] },
        { q: 'Calculate the charge that flows from the supercapacitor if it discharges from 2.7 V to 1.5 V.', m: 1, ans: { a: 12, unit: 'C', tol: 0.01 }, calc: '10*(2.7-1.5)', ms: [['B1', 'ΔQ = CΔV = 10 × 1.2 = 12 C']] }] }
    ]
  });

  /* ---------------- fd3 Charging and discharging ---------------- */
  add('fd3', {
    ex: [
      ['How long to halve?', 'A 100 μF capacitor discharges through a 47 kΩ resistor. How long does the p.d. take to halve?', [
        ['Time constant', '', ['τ = CR = 100 × 10⁻⁶ × 47 × 10³ = 4.7 s']],
        ['Half-life of the discharge', 'Set V = V₀ ÷ 2 in V = V₀e^(−t/CR).', ['t = CR ln 2']],
        ['Value', '', [res('t = 4.7 × 0.693 = 3.3 s')]]
      ], { chk: [['100e-6*47e3', 4.7], ['4.7*ln(2)', 3.258]] }],
      ['Trap: what happens after one time constant', 'A student says a capacitor is fully discharged after one time constant, and fully charged after one time constant when charging. Correct both.', [
        ['Discharging', 'The trap: confusing τ with the time to finish.', ['V = V₀e⁻¹ = 0.37V₀: 37 % remains']],
        ['Charging', '', ['V = V₀(1 − e⁻¹) = 0.63V₀: 63 % of the final p.d.']],
        ['Rule of thumb', '', [res('after about 5CR the capacitor is effectively fully charged or discharged (within 1 %)')]]
      ], { chk: [['exp(-1)', 0.368], ['1-exp(-1)', 0.632], ['exp(-5)', 0.0067]] }]
    ],
    gaps: [
      { q: 'A 220 μF capacitor with a 10 kΩ resistor', lines: ['τ = CR = [[2.2]] s'], calc: ['220e-6*1e4'], why: 'Farads × ohms = seconds.' },
      { q: 'A capacitor at 10 V discharges for two time constants.', lines: ['V = 10e⁻² = [[1.35]] V'], calc: ['10*exp(-2)'], why: 'Each time constant multiplies V by 0.37.' },
      { q: 'With CR = 5.0 s, the time for V to fall to 10 % is', lines: ['t = CR ln 10 = [[11.5]] s'], calc: ['5*ln(10)'], why: 't = −CR ln(V ÷ V₀).' }
    ],
    exam: [
      { stem: '<p>A student discharges a 470 μF capacitor through a resistor and records the p.d. every 10 s. A graph of ln V (with V in volts) against t is a straight line of gradient −0.021 s⁻¹.</p>', parts: [
        { q: 'Explain why the student plots ln V rather than V.', m: 1, lines: 2, ms: [['B1', 'ln V = ln V₀ − t ÷ CR is linear in t, so a straight line confirms exponential decay and its gradient gives −1 ÷ CR']] },
        { q: 'Calculate the resistance of the resistor.', m: 2, ans: { a: 1.01e5, unit: 'Ω', tol: 0.02 }, calc: '1/(0.021*470e-6)', ms: [['C1', 'gradient = −1 ÷ CR, so CR = 47.6 s'], ['A1', 'R = 47.6 ÷ 470 × 10⁻⁶ = 1.0 × 10⁵ Ω']] }] },
      { stem: '<p>The same 470 μF capacitor, initially uncharged, is charged from a 9.0 V supply through a 100 kΩ resistor.</p>', parts: [
        { q: 'Calculate the initial charging current.', m: 1, ans: { a: 9.0e-5, unit: 'A', tol: 0.01 }, calc: '9/1e5', ms: [['B1', 'I = 9.0 ÷ 100 × 10³ = 9.0 × 10⁻⁵ A']] },
        { q: 'Calculate the p.d. across the capacitor after 30 s.', m: 2, ans: { a: 4.25, unit: 'V', tol: 0.02 }, calc: '9*(1-exp(-30/47))', ms: [['C1', 'V = V₀(1 − e^(−t/CR)), CR = 47 s'], ['A1', 'V = 9.0(1 − e^(−0.638)) = 4.2 V']] },
        { q: 'Calculate the time for the p.d. to reach 8.0 V.', m: 2, ans: { a: 103, unit: 's', tol: 0.02 }, calc: '-47*ln(1-8/9)', ms: [['C1', '1 − 8.0 ÷ 9.0 = e^(−t/47)'], ['A1', 't = 47 ln 9 = 1.0 × 10² s']] },
        { q: 'Explain why the charging current decreases with time.', m: 1, lines: 2, ms: [['B1', 'As charge builds up, the p.d. across the capacitor rises, so the p.d. across the resistor (9.0 V − V_C), and hence the current, falls']] }] }
    ]
  });

  /* ---------------- fd4 Modelling capacitor discharge ---------------- */
  add('fd4', {
    ex: [
      ['A spreadsheet model', 'Q₀ = 1000 μC and CR = 10 s. Use ΔQ = −(Q ÷ CR)Δt with Δt = 2.0 s to model the first three steps.', [
        ['Each step', 'Each step removes 2.0 ÷ 10 = 20 % of the charge.', ['Q(2 s) = 1000 − 200 = 800 μC']],
        ['Continue', '', ['Q(4 s) = 640 μC,  Q(6 s) = 512 μC']],
        ['Compare with the exact value', '', [res('exact: 1000e^(−0.6) = 549 μC, so the model is 7 % low'), 'It uses the current at the start of each interval, which is too large for the rest of it.']]
      ], { chk: [['1000*0.8**3', 512], ['1000*exp(-0.6)', 548.8]] }],
      ['Trap: the model and the time constant', 'A student says the model shows that the charge falls by the same amount in each step. Correct this.', [
        ['The trap', '', ['Equal amounts would give a straight line: linear decay.']],
        ['What the model does', 'ΔQ ∝ Q.', ['The charge falls by the same FRACTION in each step.']],
        ['Consequence', '', [res('equal fractions in equal times is exponential decay')]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'Q = 500 μC, CR = 4.0 s, Δt = 0.50 s', lines: ['ΔQ = −(Q ÷ CR)Δt = [[-62.5]] μC'], calc: ['-500/4*0.5'], why: 'The first step of the model.' },
      { q: 'Exact charge after 2.0 s for Q₀ = 500 μC and CR = 4.0 s', lines: ['Q = 500e^(−0.5) = [[303]] μC'], calc: ['500*exp(-0.5)'], why: 'Q = Q₀e^(−t/CR).' },
      { q: 'A discharge halves every 6.9 s.', lines: ['CR = 6.9 ÷ ln 2 = [[9.95]] s'], calc: ['6.9/ln(2)'], why: 'T½ = CR ln 2.' }
    ],
    exam: [
      { stem: '<p>A 100 μF capacitor charged to 900 μC discharges through a 50 kΩ resistor. A student models the discharge using steps of Δt = 1.0 s.</p>', parts: [
        { q: 'Use the model to find the charge after 3.0 s.', m: 2, ans: { a: 461, unit: 'μC', tol: 0.01 }, calc: '900*(1-1/5)**3', ms: [['C1', 'CR = 5.0 s, so each step multiplies Q by 0.80 (900 → 720 → 576)'], ['A1', 'Q = 461 μC']] },
        { q: 'Calculate the exact charge after 3.0 s.', m: 1, ans: { a: 494, unit: 'μC', tol: 0.01 }, calc: '900*exp(-3/5)', ms: [['B1', 'Q = 900e^(−0.60) = 494 μC']] },
        { q: 'Calculate the exact time for the charge to fall to 100 μC.', m: 2, ans: { a: 11.0, unit: 's', tol: 0.01 }, calc: '5*ln(9)', ms: [['C1', '100 = 900e^(−t/5.0)'], ['A1', 't = 5.0 ln 9 = 11 s']] },
        { q: 'State the effect on the model of using Δt = 0.50 s.', m: 1, lines: 2, ms: [['B1', 'More steps are needed, but the result is closer to the exact (exponential) value']] }] },
      { stem: '<p>A data logger shows that the p.d. across a discharging capacitor halves every 3.5 s.</p>', parts: [
        { q: 'Calculate the time constant of the circuit.', m: 2, ans: { a: 5.05, unit: 's', tol: 0.02 }, calc: '3.5/ln(2)', ms: [['C1', 'T½ = CR ln 2'], ['A1', 'CR = 3.5 ÷ 0.693 = 5.0 s']] },
        { q: 'State the fraction of the initial p.d. left after 14 s.', m: 1, ans: { a: 0.0625, unit: '', tol: 0.01 }, calc: '0.5**4', ms: [['B1', '14 s is four halvings: (½)⁴ = 1/16 = 0.0625']] }] }
    ]
  });

  /* ---------------- fd5 Coulomb's law ---------------- */
  add('fd5', {
    ex: [
      ['Inside a hydrogen atom', 'Find the electric force between the proton and the electron 5.3 × 10⁻¹¹ m apart, and compare it with the gravitational force.', [
        ['Coulomb’s law', '', [`F = ${fr('kQ₁Q₂', 'r²')} = ${fr('8.99 × 10⁹ × (1.60 × 10⁻¹⁹)²', '(5.3 × 10⁻¹¹)²')} = 8.2 × 10⁻⁸ N`]],
        ['Gravity', '', [`F = ${fr('Gm_pm_e', 'r²')} = 3.6 × 10⁻⁴⁷ N`]],
        ['Ratio', '', [res('the electric force is about 2 × 10³⁹ times stronger')]]
      ], { chk: [['kC*1.6e-19**2/5.3e-11**2', 8.19e-8], ['G*mp*me/5.3e-11**2', 3.62e-47], ['kC*1.6e-19**2/(G*mp*me)', 2.27e39]] }],
      ['Trap: adding fields as vectors', 'Two +2.0 nC charges are 0.20 m apart. What is the field at the midpoint?', [
        ['Each field', '', ['E = 8.99 × 10⁹ × 2.0 × 10⁻⁹ ÷ 0.10² = 1800 N C⁻¹ from each']],
        ['Directions', 'The trap: adding the magnitudes. Each field points away from its own charge, so they are opposite.', ['1800 − 1800']],
        ['Answer', '', [res('E = 0 at the midpoint (but the potential there is not zero)')]]
      ], { chk: [['kC*2e-9/0.01', 1798]] }]
    ],
    gaps: [
      { q: 'Two 2.0 μC charges are 0.10 m apart.', lines: ['F = [[3.6]] N'], calc: ['kC*4e-12/0.01'], why: 'Micro means 10⁻⁶.' },
      { q: 'A 5.0 nC point charge', lines: ['E at 0.20 m = [[1124]] N C⁻¹'], calc: ['kC*5e-9/0.04'], why: 'E = kQ ÷ r².' },
      { q: 'The distance from a point charge triples.', lines: ['E is multiplied by [[0.111]]'], calc: ['1/9'], why: 'Inverse square: 1 ÷ 3².' }
    ],
    exam: [
      { stem: '<p>Two identical small balls, each of mass 0.50 g, hang from insulating threads of equal length from the same point. They carry equal charges and repel, coming to rest 0.050 m apart with each thread at 10° to the vertical.</p>', parts: [
        { q: 'By considering the forces on one ball, calculate the electric force between the balls.', m: 2, ans: { a: 8.65e-4, unit: 'N', tol: 0.02 }, calc: '0.5e-3*g*tand(10)', ms: [['C1', 'T cos 10° = mg and T sin 10° = F, so F = mg tan 10°'], ['A1', 'F = 0.50 × 10⁻³ × 9.81 × tan 10° = 8.6 × 10⁻⁴ N']] },
        { q: 'Calculate the charge on each ball.', m: 2, ans: { a: 1.55e-8, unit: 'C', tol: 0.02 }, calc: '0.05*sqrt(0.5e-3*g*tand(10)/kC)', ms: [['C1', 'F = kq² ÷ r², so q = r√(F ÷ k)'], ['A1', 'q = 1.6 × 10⁻⁸ C']] },
        { q: 'Describe the field-line pattern around an isolated positive point charge.', m: 1, lines: 2, ms: [['B1', 'Radial lines pointing outwards, getting further apart with distance']] }] },
      { stem: '<p>Air breaks down and sparks when the electric field strength reaches 3.0 × 10⁶ N C⁻¹. A charged metal sphere of radius 0.15 m can be treated as a point charge at its centre.</p>', parts: [
        { q: 'Calculate the maximum charge the sphere can hold without sparking.', m: 2, ans: { a: 7.51e-6, unit: 'C', tol: 0.02 }, calc: '3e6*0.15**2/kC', ms: [['C1', 'E = kQ ÷ r², so Q = Er² ÷ k'], ['A1', 'Q = 7.5 × 10⁻⁶ C']] },
        { q: 'Calculate the force on an electron at the surface of the sphere at this field strength.', m: 1, ans: { a: 4.8e-13, unit: 'N', tol: 0.01 }, calc: '3e6*e', ms: [['B1', 'F = Ee = 3.0 × 10⁶ × 1.60 × 10⁻¹⁹ = 4.8 × 10⁻¹³ N']] },
        { q: 'Explain why the sphere can be treated as a point charge for points outside it.', m: 1, lines: 2, ms: [['B1', 'The charge spreads evenly over the surface, so outside the sphere the field is radial, the same as for a point charge at the centre']] }] }
    ]
  });

  /* ---------------- fd6 Uniform electric fields and charged particles ---------------- */
  add('fd6', {
    ex: [
      ['Accelerating an electron', 'An electron is accelerated from rest through 2000 V. Find its final speed.', [
        ['Energy', 'Work done by the field = eV.', ['½mv² = eV = 1.60 × 10⁻¹⁹ × 2000 = 3.2 × 10⁻¹⁶ J']],
        ['Speed', '', [`v = √(${fr('2eV', 'm')})`, res('v = 2.65 × 10⁷ m s⁻¹: about 9 % of the speed of light')]]
      ], { chk: [['sqrt(2*e*2000/me)', 2.65e7]] }],
      ['An electron between deflecting plates', 'An electron at 2.0 × 10⁷ m s⁻¹ enters the gap between plates 5.0 cm long and 2.0 cm apart, with 200 V across them. How far is it deflected?', [
        ['Field and acceleration', 'The trap: using d = 2.0 instead of 0.020 m.', ['E = 200 ÷ 0.020 = 1.0 × 10⁴ V m⁻¹', 'a = eE ÷ m = 1.76 × 10¹⁵ m s⁻²']],
        ['Time between the plates', 'Constant horizontal speed.', ['t = 0.050 ÷ 2.0 × 10⁷ = 2.5 × 10⁻⁹ s']],
        ['Deflection', 'Like a projectile.', [res('y = ½at² = 5.5 × 10⁻³ m (5.5 mm): it clears the plates')]]
      ], { chk: [['e*1e4/me', 1.756e15], ['0.05/2e7', 2.5e-9], ['0.5*e*1e4/me*(2.5e-9)**2', 5.49e-3]] }]
    ],
    gaps: [
      { q: 'Plates 4.0 mm apart have 600 V across them.', lines: ['E = V ÷ d = [[1.5e5]] V m⁻¹'], calc: ['600/4e-3'], why: 'Convert mm to m.' },
      { q: 'The force on a proton in that field', lines: ['F = eE = [[2.4e-14]] N'], calc: ['e*1.5e5'], why: 'The same size for an electron, but opposite direction.' },
      { q: 'An electron accelerated through 100 V gains', lines: ['[[1.6e-17]] J'], calc: ['e*100'], why: '100 eV.' }
    ],
    exam: [
      { stem: '<p>An electron moving horizontally at 3.0 × 10⁷ m s⁻¹ enters the region between two horizontal plates. The plates are 4.0 cm long and 1.5 cm apart, with a p.d. of 300 V between them.</p>', parts: [
        { q: 'Calculate the electric field strength between the plates.', m: 1, ans: { a: 2.0e4, unit: 'V m⁻¹', tol: 0.01 }, calc: '300/0.015', ms: [['B1', 'E = 300 ÷ 0.015 = 2.0 × 10⁴ V m⁻¹']] },
        { q: 'Calculate the time the electron spends between the plates.', m: 1, ans: { a: 1.33e-9, unit: 's', tol: 0.01 }, calc: '0.04/3e7', ms: [['B1', 't = 0.040 ÷ 3.0 × 10⁷ = 1.3 × 10⁻⁹ s']] },
        { q: 'Calculate the vertical deflection of the electron as it leaves the plates.', m: 3, ans: { a: 3.12e-3, unit: 'm', tol: 0.02 }, calc: '0.5*e*2e4/me*(0.04/3e7)**2', ms: [['C1', 'a = eE ÷ m = 3.5 × 10¹⁵ m s⁻²'], ['C1', 'y = ½at²'], ['A1', 'y = 3.1 × 10⁻³ m']] },
        { q: 'Describe the shape of the path between the plates and explain it.', m: 2, lines: 3, ms: [['B1', 'A parabola'], ['B1', 'Constant horizontal velocity with a constant acceleration (force) at right angles to it']] }] },
      { stem: '<p>Two square parallel plates of side 0.20 m are separated by 2.0 mm of air.</p>', parts: [
        { q: 'Calculate the capacitance of the plates.', m: 2, ans: { a: 1.77e-10, unit: 'F', tol: 0.01 }, calc: 'eps0*0.04/2e-3', ms: [['C1', 'C = ε₀A ÷ d'], ['A1', 'C = 8.85 × 10⁻¹² × 0.040 ÷ 2.0 × 10⁻³ = 1.8 × 10⁻¹⁰ F']] }] }
    ]
  });

  /* ---------------- fd7 Electric potential ---------------- */
  add('fd7', {
    ex: [
      ['Work done moving a charge', 'A 2.0 nC charge is moved from 0.20 m to 0.10 m from a +5.0 nC point charge. How much work is done?', [
        ['Potentials', 'V = kQ ÷ r.', ['V(0.20 m) = 225 V,  V(0.10 m) = 449 V']],
        ['Work', 'W = qΔV.', [res('W = 2.0 × 10⁻⁹ × 225 = 4.5 × 10⁻⁷ J (work done against the repulsion)')]]
      ], { chk: [['kC*5e-9/0.2', 224.8], ['kC*5e-9/0.1', 449.5], ['2e-9*kC*5e-9*(1/0.1-1/0.2)', 4.5e-7]] }],
      ['Trap: potential is a scalar', 'Charges of +3.0 nC and −3.0 nC are 0.40 m apart. Find the potential and the field at the midpoint.', [
        ['Potential', 'The trap: treating potentials like vectors. Potentials add as numbers, with signs.', ['V = k(3.0 × 10⁻⁹) ÷ 0.20 + k(−3.0 × 10⁻⁹) ÷ 0.20 = 0']],
        ['Field', 'Fields add as vectors: both point towards the negative charge.', [res('E = 2 × 8.99 × 10⁹ × 3.0 × 10⁻⁹ ÷ 0.20² = 1350 N C⁻¹'), 'Zero potential does not mean zero field.']]
      ], { chk: [['2*kC*3e-9/0.04', 1348]] }]
    ],
    gaps: [
      { q: 'Potential at 0.050 m from a +1.0 nC charge', lines: ['V = kQ ÷ r = [[180]] V'], calc: ['kC*1e-9/0.05'], why: 'Positive near a positive charge.' },
      { q: 'Electric potential energy of two protons 1.0 × 10⁻¹⁴ m apart', lines: ['E = ke² ÷ r = [[2.3e-14]] J'], calc: ['kC*e*e/1e-14'], why: 'Positive: they repel.' },
      { q: 'The potential falls by 600 V over 0.030 m in a uniform field.', lines: ['E = ΔV ÷ Δd = [[2e4]] V m⁻¹'], calc: ['600/0.03'], why: 'Field strength is the potential gradient.' }
    ],
    exam: [
      { stem: '<p>In the core of a star, two protons must come within about 2.0 × 10⁻¹⁵ m of each other for fusion to happen.</p>', parts: [
        { q: 'Calculate the electric potential energy of two protons at this separation.', m: 2, ans: { a: 1.15e-13, unit: 'J', tol: 0.02 }, calc: 'kC*e*e/2e-15', ms: [['C1', 'E = kQ₁Q₂ ÷ r'], ['A1', 'E = 8.99 × 10⁹ × (1.60 × 10⁻¹⁹)² ÷ 2.0 × 10⁻¹⁵ = 1.2 × 10⁻¹³ J']] },
        { q: 'Convert this energy into MeV.', m: 1, ans: { a: 0.719, unit: 'MeV', tol: 0.02 }, calc: 'kC*e*e/2e-15/MeV', ms: [['B1', '1.15 × 10⁻¹³ ÷ 1.60 × 10⁻¹³ = 0.72 MeV']] },
        { q: 'Calculate the temperature at which the mean kinetic energy of a proton, ³⁄₂kT, equals this energy.', m: 2, ans: { a: 5.56e9, unit: 'K', tol: 0.02 }, calc: '2*kC*e*e/2e-15/(3*k)', ms: [['C1', 'T = 2E ÷ 3k'], ['A1', 'T = 5.6 × 10⁹ K']] },
        { q: 'The core of the Sun is at about 1.5 × 10⁷ K. Suggest why fusion still happens there.', m: 1, lines: 2, ms: [['B1', 'The speeds follow a distribution, so a small fraction of protons have energies far above the mean (and there are enormous numbers of protons)']] }] },
      { stem: '<p>The potential 0.20 m from a small charged sphere is +900 V.</p>', parts: [
        { q: 'Calculate the charge on the sphere.', m: 2, ans: { a: 2.0e-8, unit: 'C', tol: 0.01 }, calc: '900*0.2/kC', ms: [['C1', 'Q = Vr ÷ k'], ['A1', 'Q = 900 × 0.20 ÷ 8.99 × 10⁹ = 2.0 × 10⁻⁸ C']] },
        { q: 'State the potential 0.60 m from the sphere.', m: 1, ans: { a: 300, unit: 'V', tol: 0.01 }, calc: '900*0.2/0.6', ms: [['B1', 'V ∝ 1 ÷ r: 900 ÷ 3 = 300 V']] }] }
    ]
  });

  /* ---------------- fd8 Magnetic fields and the force on a current ---------------- */
  add('fd8', {
    ex: [
      ['A current balance', 'A horizontal wire carries 3.0 A across a 5.0 cm wide magnet that sits on a top-pan balance. The reading rises by 2.4 g when the current is switched on. Find B.', [
        ['Force on the wire', 'By Newton’s third law the magnet is pushed down with an equal force.', ['F = 2.4 × 10⁻³ × 9.81 = 0.0235 N']],
        ['F = BIL', '', [`B = ${fr('F', 'IL')} = ${fr('0.0235', '3.0 × 0.050')}`, res('B = 0.157 T')]]
      ], { chk: [['2.4e-3*g', 0.02354], ['2.4e-3*g/(3*0.05)', 0.157]] }],
      ['Trap: the angle in F = BIL sin θ', 'A 0.30 m wire carries 4.0 A in a 0.20 T field. Find the force when the wire is (a) parallel to the field and (b) at 30° to it.', [
        ['Parallel', 'The trap: thinking there is always a force.', ['θ = 0, sin 0 = 0, so F = 0']],
        ['At 30°', 'θ is the angle between the wire and the field.', [res('F = 0.20 × 4.0 × 0.30 × sin 30° = 0.12 N')]],
        ['Greatest force', '', ['At 90°: F = 0.24 N']]
      ], { chk: [['0.2*4*0.3*sind(30)', 0.12], ['0.2*4*0.3', 0.24]] }]
    ],
    gaps: [
      { q: 'A 0.25 m wire carries 6.0 A at right angles to a 0.080 T field.', lines: ['F = BIL = [[0.12]] N'], calc: ['0.08*6*0.25'], why: 'Maximum force: θ = 90°.' },
      { q: 'A 0.10 m wire carrying 2.5 A feels 0.050 N at right angles to a field.', lines: ['B = [[0.2]] T'], calc: ['0.05/(2.5*0.1)'], why: 'B = F ÷ IL.' },
      { q: 'The same wire is turned to 60° to the field.', lines: ['F = [[0.0433]] N'], calc: ['0.05*sind(60)'], why: 'F ∝ sin θ.' }
    ],
    exam: [
      { stem: '<p>A student places a magnet on a top-pan balance. A horizontal wire passes through the field, perpendicular to it, over a length of 0.050 m. The balance reading increases linearly with current; the gradient of a graph of reading against current is 0.80 g A⁻¹.</p>', parts: [
        { q: 'Calculate the magnetic flux density.', m: 2, ans: { a: 0.157, unit: 'T', tol: 0.02 }, calc: '0.8e-3*g/0.05', ms: [['C1', 'force per amp = 0.80 × 10⁻³ × 9.81 = 7.85 × 10⁻³ N A⁻¹ = BL'], ['A1', 'B = 7.85 × 10⁻³ ÷ 0.050 = 0.16 T']] },
        { q: 'Explain why the balance reading changes, even though the wire is not touching the magnet.', m: 2, lines: 3, ms: [['B1', 'The field exerts a force on the current-carrying wire'], ['B1', 'By Newton’s third law the wire exerts an equal and opposite force on the magnet, changing the force on the balance']] }] },
      { stem: '<p>A rectangular coil of 50 turns in a motor has sides of 0.040 m and 0.030 m. It carries 1.5 A in a uniform field of 0.30 T. The 0.040 m sides are perpendicular to the field.</p>', parts: [
        { q: 'Calculate the force on one 0.040 m side of the coil.', m: 2, ans: { a: 0.90, unit: 'N', tol: 0.01 }, calc: '50*0.3*1.5*0.04', ms: [['C1', 'F = NBIL'], ['A1', 'F = 50 × 0.30 × 1.5 × 0.040 = 0.90 N']] },
        { q: 'Calculate the maximum torque on the coil.', m: 2, ans: { a: 0.027, unit: 'N m', tol: 0.01 }, calc: '50*0.3*1.5*0.04*0.03', ms: [['C1', 'the two forces form a couple: torque = F × separation'], ['A1', '0.90 × 0.030 = 0.027 N m']] },
        { q: 'State why the 0.030 m sides feel no force when the coil’s plane is parallel to the field.', m: 1, lines: 2, ms: [['B1', 'Those sides are then parallel to the field (θ = 0), so F = BIL sin θ = 0']] },
        { q: 'State the rule used to find the direction of the force on a side of the coil.', m: 1, lines: 1, ms: [['B1', 'Fleming’s left-hand rule']] }] }
    ]
  });

  /* ---------------- fd9 Charged particles in magnetic fields ---------------- */
  add('fd9', {
    ex: [
      ['An electron in a circle', 'An electron moves at 3.0 × 10⁷ m s⁻¹ at right angles to a 2.0 mT field. Find the radius of its path.', [
        ['Magnetic force provides the centripetal force', '', [`Bev = ${fr('mv²', 'r')}, so r = ${fr('mv', 'Be')}`]],
        ['Value', '', [`r = ${fr('9.11 × 10⁻³¹ × 3.0 × 10⁷', '2.0 × 10⁻³ × 1.60 × 10⁻¹⁹')}`, res('r = 0.085 m')]]
      ], { chk: [['me*3e7/(2e-3*e)', 0.0854]] }],
      ['Trap: the velocity selector', 'In crossed fields E = 4.0 × 10⁴ V m⁻¹ and B = 0.020 T, a student says the particles that pass straight through depend on their charge and mass. Correct this.', [
        ['Balance', 'Electric force = magnetic force.', ['qE = Bqv']],
        ['q cancels', 'The trap: neither the charge nor the mass appears.', [res('v = E ÷ B = 2.0 × 10⁶ m s⁻¹ for any charged particle')]]
      ], { chk: [['4e4/0.02', 2e6]] }]
    ],
    gaps: [
      { q: 'A proton moves at 2.0 × 10⁶ m s⁻¹ perpendicular to a 0.50 T field.', lines: ['F = BQv = [[1.6e-13]] N'], calc: ['0.5*e*2e6'], why: 'Always at right angles to the velocity.' },
      { q: 'Its radius of path', lines: ['r = mv ÷ BQ = [[0.0418]] m'], calc: ['mp*2e6/(0.5*e)'], why: 'Faster or heavier particles curve less.' },
      { q: 'Plates give E = 3.0 × 10⁴ V m⁻¹ across B = 0.15 T.', lines: ['selected speed = [[2e5]] m s⁻¹'], calc: ['3e4/0.15'], why: 'v = E ÷ B.' }
    ],
    exam: [
      { stem: '<p>Protons pass through a velocity selector made of two plates 1.0 cm apart with 500 V across them, in a magnetic field of 0.10 T. The protons that emerge then enter a region with only the 0.10 T field.</p>', parts: [
        { q: 'Calculate the speed of the protons that pass straight through the selector.', m: 2, ans: { a: 5.0e5, unit: 'm s⁻¹', tol: 0.01 }, calc: '(500/0.01)/0.1', ms: [['C1', 'E = 500 ÷ 0.010 = 5.0 × 10⁴ V m⁻¹; v = E ÷ B'], ['A1', 'v = 5.0 × 10⁵ m s⁻¹']] },
        { q: 'Calculate the radius of the protons’ path in the magnetic field.', m: 2, ans: { a: 0.0523, unit: 'm', tol: 0.02 }, calc: 'mp*5e5/(e*0.1)', ms: [['C1', 'r = mv ÷ Be'], ['A1', 'r = 1.673 × 10⁻²⁷ × 5.0 × 10⁵ ÷ (1.60 × 10⁻¹⁹ × 0.10) = 0.052 m']] },
        { q: 'Calculate the time for a proton to travel half a circle.', m: 2, ans: { a: 3.28e-7, unit: 's', tol: 0.02 }, calc: 'pi*mp*5e5/(e*0.1)/5e5', ms: [['C1', 't = πr ÷ v'], ['A1', 't = 3.3 × 10⁻⁷ s']] },
        { q: 'Explain why the magnetic field does not change the speed of the protons.', m: 2, lines: 3, ms: [['B1', 'The magnetic force is always perpendicular to the velocity'], ['B1', 'so it does no work on the proton and its kinetic energy (speed) is unchanged; only its direction changes']] },
        { q: 'Deuterons (twice the mass, same charge) at the same speed enter the field. State their radius.', m: 1, ans: { a: 0.105, unit: 'm', tol: 0.02 }, calc: '2*mp*5e5/(e*0.1)', ms: [['B1', 'r ∝ m: twice the radius, 0.10 m']] }] }
    ]
  });

  /* ---------------- fd10 Flux and induction ---------------- */
  add('fd10', {
    ex: [
      ['Pulling a coil out of a field', 'A 200-turn coil of area 4.0 × 10⁻⁴ m² sits at right angles to a 0.050 T field and is pulled out in 0.10 s. Find the average induced e.m.f.', [
        ['Initial flux linkage', 'NΦ = NBA.', ['NΦ = 200 × 0.050 × 4.0 × 10⁻⁴ = 4.0 × 10⁻³ Wb turns']],
        ['Faraday’s law', 'e.m.f. = rate of change of flux linkage.', [res('ε = 4.0 × 10⁻³ ÷ 0.10 = 0.040 V')]]
      ], { chk: [['200*0.05*4e-4', 4e-3], ['200*0.05*4e-4/0.1', 0.04]] }],
      ['Trap: which angle?', 'A 0.020 m² loop is in a 0.30 T field, with the plane of the loop at 30° to the field lines. Find the flux.', [
        ['The tempting answer', 'The trap: using cos 30° because the angle is “given”.', ['0.30 × 0.020 × cos 30° = 5.2 × 10⁻³ Wb  ✗']],
        ['Angle to the normal', 'Φ = BA cos θ, with θ between the field and the NORMAL to the plane.', ['θ = 90° − 30° = 60°']],
        ['Flux', '', [res('Φ = 0.30 × 0.020 × cos 60° = 3.0 × 10⁻³ Wb')]]
      ], { chk: [['0.3*0.02*cosd(60)', 3e-3]] }]
    ],
    gaps: [
      { q: 'A field of 0.40 T passes at right angles through 0.015 m².', lines: ['Φ = BA = [[6e-3]] Wb'], calc: ['0.4*0.015'], why: '1 Wb = 1 T m².' },
      { q: 'That area is a coil of 150 turns.', lines: ['flux linkage = [[0.9]] Wb turns'], calc: ['150*0.4*0.015'], why: 'NΦ.' },
      { q: 'The field falls to zero in 0.20 s.', lines: ['average e.m.f. = [[4.5]] V'], calc: ['150*0.4*0.015/0.2'], why: 'ε = Δ(NΦ) ÷ Δt.' }
    ],
    exam: [
      { stem: '<p>A metal rod of length 0.50 m slides at a steady 4.0 m s⁻¹ along two parallel rails, at right angles to a uniform 0.20 T field. The rails are joined by a 2.0 Ω resistor; the rod and rails have negligible resistance.</p>', parts: [
        { q: 'Show that the induced e.m.f. is BLv, and calculate it.', m: 2, ans: { a: 0.40, unit: 'V', tol: 0.01 }, calc: '0.2*0.5*4', ms: [['C1', 'area swept per second = Lv, so ΔΦ ÷ Δt = BLv'], ['A1', 'ε = 0.20 × 0.50 × 4.0 = 0.40 V']] },
        { q: 'Calculate the current in the circuit.', m: 1, ans: { a: 0.20, unit: 'A', tol: 0.01 }, calc: '0.4/2', ms: [['B1', 'I = 0.40 ÷ 2.0 = 0.20 A']] },
        { q: 'Calculate the force needed to keep the rod moving at a steady speed.', m: 2, ans: { a: 0.020, unit: 'N', tol: 0.01 }, calc: '0.2*0.2*0.5', ms: [['C1', 'the induced current feels F = BIL opposing the motion'], ['A1', 'F = 0.20 × 0.20 × 0.50 = 0.020 N']] },
        { q: 'Use Lenz’s law to explain why a force is needed, in terms of energy.', m: 2, lines: 3, ms: [['B1', 'The induced current flows in a direction that opposes the change producing it (it slows the rod)'], ['B1', 'Work must be done against this force; it equals the energy dissipated in the resistor (0.020 × 4.0 = 0.080 W = I²R)']] }] },
      { stem: '<p>A bar magnet falls through a coil connected to a data logger. The e.m.f.–time graph shows a positive peak as the magnet enters the coil, then a larger negative peak as it leaves.</p>', parts: [
        { q: 'Explain why the second peak is opposite in sign and larger.', m: 2, lines: 3, ms: [['B1', 'Opposite: the flux linkage increases as it enters and decreases as it leaves, so the rate of change has the opposite sign'], ['B1', 'Larger: the magnet is moving faster as it leaves (it accelerates), so the flux changes faster']] }] }
    ]
  });

  /* ---------------- fd11 Transformers and power transmission ---------------- */
  add('fd11', {
    ex: [
      ['Why transmit at high voltage?', '100 MW is sent along cables of total resistance 5.0 Ω. Compare the power lost at 400 kV and at 25 kV.', [
        ['Current at 400 kV', 'I = P ÷ V.', ['I = 1.0 × 10⁸ ÷ 4.0 × 10⁵ = 250 A', 'loss = I²R = 250² × 5.0 = 0.31 MW']],
        ['Current at 25 kV', '', ['I = 4000 A', 'loss = 4000² × 5.0 = 80 MW']],
        ['Conclusion', '', [res('raising the voltage 16 times cuts the loss 256 times')]]
      ], { chk: [['(1e8/4e5)**2*5', 3.125e5], ['(1e8/2.5e4)**2*5', 8e7], ['16**2', 256]] }],
      ['Trap: current goes the other way', 'An ideal transformer steps 230 V down to 12 V. The secondary current is 5.0 A. Find the primary current.', [
        ['The tempting answer', 'The trap: scaling current the same way as voltage.', ['I_p = 5.0 × 230 ÷ 12 = 96 A  ✗']],
        ['Power in = power out', 'V_pI_p = V_sI_s.', [res('I_p = 12 × 5.0 ÷ 230 = 0.26 A: stepping the voltage down steps the current up')]]
      ], { chk: [['12*5/230', 0.261]] }]
    ],
    gaps: [
      { q: 'A transformer has 400 primary and 10 000 secondary turns, with 230 V in.', lines: ['V_s = [[5750]] V'], calc: ['230*10000/400'], why: 'V_s ÷ V_p = N_s ÷ N_p.' },
      { q: 'An ideal transformer gives 24 V at 3.0 A from 240 V.', lines: ['I_p = [[0.3]] A'], calc: ['24*3/240'], why: 'Power in = power out.' },
      { q: 'A 150 A current flows in a cable of 4.0 Ω.', lines: ['power lost = [[90000]] W'], calc: ['150**2*4'], why: 'P = I²R.' }
    ],
    exam: [
      { stem: '<p>At a power station, a transformer steps 25 kV up to 400 kV to transmit 500 MW. The primary coil has 1500 turns. The transmission line has a total resistance of 2.0 Ω. Assume the transformer is ideal.</p>', parts: [
        { q: 'Calculate the number of turns on the secondary coil.', m: 1, ans: { a: 24000, unit: '', tol: 0.01 }, calc: '1500*400/25', ms: [['B1', 'N_s = 1500 × 400 ÷ 25 = 24 000']] },
        { q: 'Calculate the current in the primary coil.', m: 1, ans: { a: 2.0e4, unit: 'A', tol: 0.01 }, calc: '5e8/2.5e4', ms: [['B1', 'I = 5.0 × 10⁸ ÷ 2.5 × 10⁴ = 2.0 × 10⁴ A']] },
        { q: 'Calculate the current in the transmission line.', m: 1, ans: { a: 1250, unit: 'A', tol: 0.01 }, calc: '5e8/4e5', ms: [['B1', 'I = 5.0 × 10⁸ ÷ 4.0 × 10⁵ = 1250 A']] },
        { q: 'Calculate the power lost in the line, as a percentage of the power transmitted.', m: 2, ans: { a: 0.625, unit: '%', tol: 0.01 }, calc: '1250**2*2/5e8*100', ms: [['C1', 'P = I²R = 1250² × 2.0 = 3.1 × 10⁶ W'], ['A1', '3.1 × 10⁶ ÷ 5.0 × 10⁸ × 100 = 0.63 %']] },
        { q: 'Explain why the transformer core is laminated.', m: 2, lines: 3, ms: [['B1', 'The changing flux induces eddy currents in the iron core'], ['B1', 'Insulated laminations reduce these currents, reducing the energy wasted as heat']] },
        { q: 'Explain why transformers only work with alternating current.', m: 1, lines: 2, ms: [['B1', 'An e.m.f. is only induced when the flux linkage changes; a steady d.c. gives a constant flux']] },
        { q: 'State one cause of energy loss in a real transformer, other than eddy currents.', m: 1, lines: 1, ms: [['B1', 'Any one: heating of the coils by their resistance (I²R); flux that does not link both coils; energy needed to magnetise and demagnetise the core']] }] }
    ]
  });

  /* ---------------- fd12 Review ---------------- */
  add('fd12', {
    ex: [
      ['A model answer: comparing fields', 'Compare gravitational and electric fields due to point sources. (4 marks)', [
        ['Similarities', '', [`Both are ${mp('radial')} for point sources, with ${mp('inverse-square')} field strength (F ∝ 1 ÷ r²) and potentials ∝ 1 ÷ r.`]],
        ['Differences', '', [`Gravity is ${mp('always attractive')}; electric forces can ${mp('attract or repel')}.`, `Gravitational potential is always negative; electric potential can be positive or negative.`]],
        ['Strength', '', [`Between particles the electric force is ${mp('vastly stronger')}: about 10³⁶ times for two protons.`]]
      ], { desc: true }],
      ['Synoptic: an electron in crossed fields', 'Electrons accelerated through 500 V pass undeflected through crossed fields with B = 1.0 mT. What is E?', [
        ['Speed', '', ['v = √(2eV ÷ m) = √(2 × 1.60 × 10⁻¹⁹ × 500 ÷ 9.11 × 10⁻³¹) = 1.33 × 10⁷ m s⁻¹']],
        ['No deflection', 'eE = Bev.', [res('E = Bv = 1.0 × 10⁻³ × 1.33 × 10⁷ = 1.3 × 10⁴ V m⁻¹')]]
      ], { chk: [['sqrt(2*e*500/me)', 1.326e7], ['1e-3*sqrt(2*e*500/me)', 1.326e4]] }]
    ],
    gaps: [
      { q: 'Ratio of electric to gravitational force between two protons', lines: ['ke² ÷ Gm_p² = [[1.23e36]]'], calc: ['kC*e*e/(G*mp*mp)'], why: 'The separation cancels: both are inverse-square.' },
      { q: 'A 2200 μF capacitor at 12 V stores', lines: ['[[0.158]] J'], calc: ['0.5*2200e-6*144'], why: 'W = ½CV².' }
    ],
    exam: [
      { stem: '<p>A 2200 μF capacitor charged to 12 V is discharged through a small motor that lifts a 0.050 kg mass.</p>', parts: [
        { q: 'Calculate the energy stored in the capacitor.', m: 1, ans: { a: 0.158, unit: 'J', tol: 0.01 }, calc: '0.5*2200e-6*144', ms: [['B1', 'W = ½ × 2200 × 10⁻⁶ × 12² = 0.16 J']] },
        { q: 'The motor system is 40 % efficient. Calculate the height the mass is lifted.', m: 2, ans: { a: 0.129, unit: 'm', tol: 0.02 }, calc: '0.4*0.5*2200e-6*144/(0.05*g)', ms: [['C1', 'mgh = 0.40 × 0.158'], ['A1', 'h = 0.063 ÷ (0.050 × 9.81) = 0.13 m']] }] },
      { stem: '<p>An electron is accelerated from rest through 500 V and then enters a uniform 1.0 mT magnetic field at right angles to its velocity.</p>', parts: [
        { q: 'Calculate the speed of the electron.', m: 2, ans: { a: 1.33e7, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(2*e*500/me)', ms: [['C1', '½mv² = eV'], ['A1', 'v = 1.3 × 10⁷ m s⁻¹']] },
        { q: 'Calculate the radius of its path in the field.', m: 2, ans: { a: 0.0755, unit: 'm', tol: 0.02 }, calc: 'me*sqrt(2*e*500/me)/(1e-3*e)', ms: [['C1', 'r = mv ÷ Be'], ['A1', 'r = 0.075 m']] },
        { q: 'Explain why the path is a circle.', m: 1, lines: 2, ms: [['B1', 'The force is constant in size and always perpendicular to the velocity, so it provides a centripetal force']] }] },
      { stem: '<p>Two parallel plates, each of area 0.010 m², are 1.0 mm apart in air and connected to a 100 V supply.</p>', parts: [
        { q: 'Calculate the capacitance.', m: 1, ans: { a: 8.85e-11, unit: 'F', tol: 0.01 }, calc: 'eps0*0.01/1e-3', ms: [['B1', 'C = ε₀A ÷ d = 8.9 × 10⁻¹¹ F']] },
        { q: 'Calculate the charge on each plate.', m: 1, ans: { a: 8.85e-9, unit: 'C', tol: 0.01 }, calc: 'eps0*0.01/1e-3*100', ms: [['B1', 'Q = CV = 8.9 × 10⁻⁹ C']] },
        { q: 'Calculate the electric field strength between the plates.', m: 1, ans: { a: 1.0e5, unit: 'V m⁻¹', tol: 0.01 }, calc: '100/1e-3', ms: [['B1', 'E = 100 ÷ 1.0 × 10⁻³ = 1.0 × 10⁵ V m⁻¹']] },
        { q: 'Calculate the force on a dust particle carrying 2.0 nC between the plates.', m: 1, ans: { a: 2.0e-4, unit: 'N', tol: 0.01 }, calc: '2e-9*1e5', ms: [['B1', 'F = qE = 2.0 × 10⁻⁴ N']] }] },
      { stem: '<p>Two protons are a distance r apart.</p>', parts: [
        { q: 'Calculate the ratio of the electric force to the gravitational force between them.', m: 2, ans: { a: 1.23e36, unit: '', tol: 0.02 }, calc: 'kC*e*e/(G*mp*mp)', ms: [['C1', 'ratio = ke² ÷ Gm_p² (r² cancels)'], ['A1', '1.2 × 10³⁶']] },
        { q: 'Explain why gravity can be ignored inside the nucleus but dominates on the scale of planets.', m: 1, lines: 2, ms: [['B1', 'Between particles the electric force is vastly larger; but large bodies are electrically neutral, so only gravity (always attractive, adding up) remains']] }] }
    ]
  });
})();
