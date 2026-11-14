/* Electricity (e1–e13): extra worked examples, fill-the-gaps and exam-style questions.
   e = 1.60e-19 C. Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const tbl = (head, rows) => `<div class="tbl-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const mp = t => `<b>${t}</b>`;

  /* ---------------- e1 Charge and current ---------------- */
  add('e1', {
    ex: [
      ['Charge from a current–time graph', 'The current from a discharging capacitor falls steadily from 0.50 A to zero in 40 s. Find the charge that flows and the number of electrons.', [
        ['Charge = area under the I–t graph', 'A triangle.', ['Q = ½ × 0.50 × 40 = 10 C']],
        ['Number of electrons', '', [`N = ${fr('10', '1.60 × 10⁻¹⁹')}`, res('N = 6.3 × 10¹⁹ electrons')]]
      ], { chk: [['0.5*0.5*40', 10], ['10/e', 6.25e19]] }],
      ['Trap: milliamp-hours', 'A phone battery is rated at 3000 mA h. How much charge can it deliver?', [
        ['What the unit means', 'mA h is a current multiplied by a time: it is a unit of charge.', ['3000 mA h = 3.0 A for 1 hour']],
        ['Convert to coulombs', 'The trap: multiplying 3000 by 3600 without converting mA to A.', ['Q = 3.0 × 3600', res('Q = 1.08 × 10⁴ C')]]
      ], { chk: [['3.0*3600', 10800]] }]
    ],
    gaps: [
      { q: 'A current of 0.25 A flows for 1.0 minute.', lines: ['charge = [[15]] C'], calc: ['0.25*60'], why: 'Q = It, with t in seconds.' },
      { q: 'How many electrons carry a charge of 15 C?', lines: ['N = 15 ÷ 1.60 × 10⁻¹⁹ = [[9.375e19]]'], calc: ['15/e'], why: 'Each electron carries 1.60 × 10⁻¹⁹ C.' },
      { q: '1.0 × 10¹⁸ electrons pass a point each second.', lines: ['current = [[0.16]] A'], calc: ['1e18*e'], why: 'I = (number per second) × e.' }
    ],
    exam: [
      { stem: '<p>A current of 0.80 A passes through copper sulfate solution for 30 minutes. Copper ions, each with a charge of +2e, are deposited on the negative electrode.</p>', parts: [
        { q: 'Calculate the charge that flows.', m: 1, ans: { a: 1440, unit: 'C', tol: 0.01 }, calc: '0.8*1800', ms: [['B1', 'Q = 0.80 × 1800 = 1440 C']] },
        { q: 'Calculate the number of copper ions deposited.', m: 2, ans: { a: 4.5e21, unit: '', tol: 0.02 }, calc: '0.8*1800/(2*e)', ms: [['C1', 'each ion carries 2 × 1.60 × 10⁻¹⁹ = 3.2 × 10⁻¹⁹ C'], ['A1', 'N = 1440 ÷ 3.2 × 10⁻¹⁹ = 4.5 × 10²¹']] },
        { q: 'Each copper atom has a mass of 1.06 × 10⁻²⁵ kg. Calculate the mass of copper deposited.', m: 1, ans: { a: 4.77e-4, unit: 'kg', tol: 0.02 }, calc: '0.8*1800/(2*e)*1.06e-25', ms: [['B1', '4.5 × 10²¹ × 1.06 × 10⁻²⁵ = 4.8 × 10⁻⁴ kg']] },
        { q: 'Explain why the positive and negative ions in the solution move in opposite directions, and state the direction of the conventional current.', m: 2, lines: 3, ms: [['B1', 'Positive ions are attracted to the negative electrode and negative ions to the positive electrode'], ['B1', 'Conventional current is in the direction the positive ions move (towards the negative electrode); both ion flows contribute to it']] }] }
    ]
  });

  /* ---------------- e2 Kirchhoff's first law ---------------- */
  add('e2', {
    ex: [
      ['Following current through two junctions', 'A current of 5.0 A enters junction P and splits into 2.0 A and an unknown current x. Current x reaches junction Q, where a further 0.80 A joins it. Find x and the current leaving Q.', [
        ['Junction P', 'Total current in = total current out.', ['5.0 = 2.0 + x', 'x = 3.0 A']],
        ['Junction Q', '', [res('current leaving Q = 3.0 + 0.80 = 3.8 A')]]
      ], { chk: [['5-2', 3], ['3+0.8', 3.8]] }],
      ['Trap: a negative answer means the arrow was wrong', 'At a junction, 1.2 A and 0.50 A flow in; 2.0 A and a current I are drawn flowing out. Find I.', [
        ['Apply the first law', '', ['1.2 + 0.50 = 2.0 + I', 'I = −0.30 A']],
        ['Interpret the sign', 'The trap: deciding the calculation went wrong. The sign just tells you the direction.', [res('0.30 A flows INTO the junction along that wire, not out')]]
      ], { chk: [['1.2+0.5-2', -0.3]] }]
    ],
    gaps: [
      { q: '4.0 A enters a junction. Two wires leaving carry 1.5 A and 0.90 A.', lines: ['current in the third wire = [[1.6]] A'], calc: ['4-1.5-0.9'], why: 'Charge is conserved at a junction.' },
      { q: 'Two lamps in parallel carry 0.30 A and 0.45 A.', lines: ['current from the supply = [[0.75]] A'], calc: ['0.3+0.45'], why: 'The branch currents add.' },
      { q: '3.0 C of charge flows into a junction each second.', lines: ['charge flowing out each second = [[3]] C'], calc: ['3'], why: 'Kirchhoff’s first law is conservation of charge.' }
    ],
    exam: [
      { stem: '<p>A 12 V car battery supplies, in parallel: two headlamps each taking 4.5 A, two sidelights each taking 0.40 A and a dashboard display taking 0.70 A.</p>', parts: [
        { q: 'Calculate the total current from the battery.', m: 2, ans: { a: 10.5, unit: 'A', tol: 0.01 }, calc: '2*4.5+2*0.4+0.7', ms: [['C1', 'add the branch currents (Kirchhoff’s first law)'], ['A1', '9.0 + 0.80 + 0.70 = 10.5 A']] },
        { q: 'Calculate the charge that flows from the battery in 30 minutes.', m: 1, ans: { a: 18900, unit: 'C', tol: 0.01 }, calc: '10.5*1800', ms: [['B1', '10.5 × 1800 = 1.9 × 10⁴ C']] },
        { q: 'State Kirchhoff’s first law and the quantity it conserves.', m: 2, lines: 3, ms: [['B1', 'The sum of the currents entering a junction equals the sum of the currents leaving it'], ['B1', 'Charge is conserved']] },
        { q: 'One headlamp fails. Calculate the new current from the battery.', m: 1, ans: { a: 6.0, unit: 'A', tol: 0.01 }, calc: '4.5+2*0.4+0.7', ms: [['B1', '10.5 − 4.5 = 6.0 A']] },
        { q: 'Explain why the other lamps are unaffected.', m: 1, lines: 2, ms: [['B1', 'Each lamp is in its own parallel branch with the full 12 V across it, so its current does not depend on the other branches']] }] }
    ]
  });

  /* ---------------- e3 Mean drift velocity ---------------- */
  add('e3', {
    ex: [
      ['Thin wire, thick wire', 'A current of 4.0 A flows through a copper wire (n = 8.5 × 10²⁸ m⁻³) that is 0.50 mm² in cross-section, then into a wire of 2.0 mm². Find the drift velocity in each.', [
        ['Rearrange I = Anev', '', [`v = ${fr('I', 'nAe')}`]],
        ['Thin wire', 'A = 0.50 mm² = 0.50 × 10⁻⁶ m².', [`v = ${fr('4.0', '8.5 × 10²⁸ × 0.50 × 10⁻⁶ × 1.60 × 10⁻¹⁹')} = 5.9 × 10⁻⁴ m s⁻¹`]],
        ['Thick wire', 'Same current, four times the area.', [res('v = 1.5 × 10⁻⁴ m s⁻¹: a quarter of the speed')]]
      ], { chk: [['4/(8.5e28*0.5e-6*e)', 5.88e-4], ['4/(8.5e28*2e-6*e)', 1.47e-4]] }],
      ['A model answer: slow electrons, instant light', 'The drift velocity in a wire is less than 1 mm s⁻¹, yet a lamp lights as soon as it is switched on. Explain why. (3 marks)', [
        ['Electrons are everywhere', '', [`The wire is ${mp('already full of free electrons')}, including in the lamp filament.`]],
        ['The field travels fast', '', [`Closing the switch sets up an ${mp('electric field along the whole circuit almost instantly')} (at nearly the speed of light).`]],
        ['All move together', '', [`${mp('All the free electrons start drifting at once')}, so there is a current in the filament immediately; no electron has to travel from the switch to the lamp.`]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A copper wire (n = 8.5 × 10²⁸ m⁻³) of area 1.0 × 10⁻⁶ m² carries 2.0 A.', lines: ['v = I ÷ nAe = [[1.47e-4]] m s⁻¹', 'time to drift 1.0 m = [[6800]] s'], calc: ['2/(8.5e28*1e-6*e)', '1/(2/(8.5e28*1e-6*e))'], why: 'Nearly two hours to drift one metre.' },
      { q: 'A semiconductor sample of area 1.0 × 10⁻⁶ m² carries 0.010 A with a drift velocity of 0.40 m s⁻¹.', lines: ['n = I ÷ Ave = [[1.5625e23]] m⁻³'], calc: ['0.01/(1e-6*0.4*e)'], why: 'Far fewer charge carriers than in a metal, so they must drift much faster.' }
    ],
    exam: [
      { stem: '<p>A copper wire narrows so that its cross-sectional area halves between points X and Y. The area at X is 1.2 × 10⁻⁶ m² and the current is 2.4 A. For copper, n = 8.5 × 10²⁸ m⁻³.</p>', parts: [
        { q: 'Calculate the mean drift velocity of the electrons at X.', m: 2, ans: { a: 1.47e-4, unit: 'm s⁻¹', tol: 0.02 }, calc: '2.4/(8.5e28*1.2e-6*e)', ms: [['C1', 'v = I ÷ nAe = 2.4 ÷ (8.5 × 10²⁸ × 1.2 × 10⁻⁶ × 1.60 × 10⁻¹⁹)'], ['A1', 'v = 1.5 × 10⁻⁴ m s⁻¹']] },
        { q: 'State the mean drift velocity at Y.', m: 1, ans: { a: 2.94e-4, unit: 'm s⁻¹', tol: 0.02 }, calc: '2*2.4/(8.5e28*1.2e-6*e)', ms: [['B1', 'double: 2.9 × 10⁻⁴ m s⁻¹']] },
        { q: 'Explain why the current at Y is the same as at X.', m: 1, lines: 2, ms: [['B1', 'Charge is conserved and the two points are in series, so the same charge passes each point per second']] },
        { q: 'The electrons also move randomly at about 10⁵ m s⁻¹. Explain how their motion causes the wire to heat up.', m: 2, lines: 3, ms: [['B1', 'As they drift, electrons collide with the vibrating positive ions of the lattice'], ['B1', 'They transfer kinetic energy to the ions, which vibrate more: the temperature rises']] },
        { q: 'What is the unit of the number density n?', m: 1, opts: ['m⁻³', 'C m⁻³', 'm³', 'A m⁻²'], a: 0, why: 'n is a number of charge carriers per cubic metre.' }] }
    ]
  });

  /* ---------------- e4 Potential difference and e.m.f. ---------------- */
  add('e4', {
    ex: [
      ['Energy from charge', 'A 9.0 V battery supplies 0.30 A for 20 minutes. Find the charge that flows and the energy transferred.', [
        ['Charge', '', ['Q = It = 0.30 × 1200 = 360 C']],
        ['Energy', 'Each coulomb is given 9.0 J.', [res('W = VQ = 9.0 × 360 = 3240 J')]]
      ], { chk: [['0.3*1200', 360], ['9*360', 3240]] }],
      ['From volts to speed: an electron', 'An electron is accelerated from rest through 500 V. Find its kinetic energy and speed. (mₑ = 9.11 × 10⁻³¹ kg)', [
        ['Kinetic energy', 'Work done on the charge = eV.', ['E = 1.60 × 10⁻¹⁹ × 500 = 8.0 × 10⁻¹⁷ J (500 eV)']],
        ['Speed', '', [`v = √(${fr('2E', 'm')}) = √(${fr('2 × 8.0 × 10⁻¹⁷', '9.11 × 10⁻³¹')})`, res('v = 1.3 × 10⁷ m s⁻¹')]]
      ], { chk: [['500*e', 8e-17], ['sqrt(2*500*e/me)', 1.325e7]] }]
    ],
    gaps: [
      { q: '5.0 C passes through a 12 V lamp.', lines: ['energy transferred = [[60]] J'], calc: ['12*5'], why: 'W = VQ.' },
      { q: 'An electron is accelerated through 200 V.', lines: ['kinetic energy = [[200]] eV = [[3.2e-17]] J'], calc: ['200', '200*e'], why: '1 eV = 1.60 × 10⁻¹⁹ J.' },
      { q: 'A 9.0 V battery transfers 4.5 kJ.', lines: ['charge that flowed = [[500]] C'], calc: ['4500/9'], why: 'Q = W ÷ V.' }
    ],
    exam: [
      { stem: '<p>A solar cell of e.m.f. 0.60 V delivers a current of 0.25 A to a load. The p.d. across the load is 0.48 V.</p>', parts: [
        { q: 'State the energy converted from light to electrical energy for each coulomb.', m: 1, ans: { a: 0.60, unit: 'J', tol: 0.01 }, calc: '0.6', ms: [['B1', '0.60 J (the e.m.f. is the energy transferred per unit charge)']] },
        { q: 'Calculate the energy delivered to the load in 10 minutes.', m: 2, ans: { a: 72, unit: 'J', tol: 0.01 }, calc: '0.48*0.25*600', ms: [['C1', 'Q = 0.25 × 600 = 150 C'], ['A1', 'W = 0.48 × 150 = 72 J']] },
        { q: 'Calculate the energy dissipated inside the cell in the same time.', m: 2, ans: { a: 18, unit: 'J', tol: 0.01 }, calc: '(0.6-0.48)*0.25*600', ms: [['C1', 'lost volts = 0.60 − 0.48 = 0.12 V'], ['A1', '0.12 × 150 = 18 J']] },
        { q: 'Explain the difference between e.m.f. and potential difference in terms of energy transfer.', m: 2, lines: 3, ms: [['B1', 'e.m.f.: energy transferred to electrical energy per unit charge (in a source)'], ['B1', 'p.d.: electrical energy transferred to other forms per unit charge (in a component)']] }] }
    ]
  });

  /* ---------------- e5 Resistance and I–V characteristics ---------------- */
  add('e5', {
    ex: [
      ['Trap: resistance is V ÷ I, not the gradient', 'A filament lamp takes 0.18 A at 1.5 V and 0.42 A at 6.0 V. Find its resistance at each p.d.', [
        ['Use R = V ÷ I at each point', 'The trap: using the gradient of the I–V graph between the two points.', ['1.5 V: R = 1.5 ÷ 0.18 = 8.3 Ω', '6.0 V: R = 6.0 ÷ 0.42 = 14.3 Ω']],
        ['Why it changes', '', [res('The resistance rises as the filament gets hotter: the ions vibrate more and the electrons collide with them more often')]]
      ], { chk: [['1.5/0.18', 8.33], ['6/0.42', 14.29]] }],
      ['An ohmic conductor from data', 'A resistor gives these readings.' + tbl(['V / V', '1.0', '2.0', '3.0', '4.0'], [['I / mA', '21', '43', '64', '85']]) + 'Show that it is ohmic and find its resistance.', [
        ['Ohmic test', 'Is I proportional to V?', ['V ÷ I: 47.6, 46.5, 46.9, 47.1 Ω: constant within the precision of the readings']],
        ['Best value', 'Use the gradient of a graph of V against I through all points; here the last reading gives', [res('R ≈ 4.0 ÷ 0.085 = 47 Ω')]]
      ], { chk: [['1/0.021', 47.6], ['2/0.043', 46.5], ['4/0.085', 47.06]] }]
    ],
    gaps: [
      { q: 'A resistor carries 0.15 A with 4.5 V across it.', lines: ['R = [[30]] Ω'], calc: ['4.5/0.15'], why: 'R = V ÷ I.' },
      { q: '6.0 V is applied across a 2.4 kΩ resistor.', lines: ['I = [[2.5e-3]] A'], calc: ['6/2.4e3'], why: 'Convert kΩ to Ω.' },
      { q: 'An LED needs 2.1 V and 15 mA. It is in series with a resistor on a 6.0 V supply.', lines: ['p.d. across the resistor = [[3.9]] V', 'resistance = [[260]] Ω'], calc: ['6-2.1', '3.9/0.015'], why: 'The resistor takes the rest of the supply p.d.' }
    ],
    exam: [
      { stem: '<p>A student measures the current I through an unknown component for several p.d.s V.</p>' + tbl(['V / V', '0.50', '1.00', '1.50', '2.00', '2.50'], [['I / mA', '0.050', '0.100', '0.150', '0.200', '0.250']]), parts: [
        { q: 'Show that the component is ohmic.', m: 2, lines: 3, ms: [['M1', 'V ÷ I (or I ÷ V) is the same for every reading'], ['A1', 'so I ∝ V at constant temperature: it obeys Ohm’s law']] },
        { q: 'Calculate the resistance of the component.', m: 1, ans: { a: 10000, unit: 'Ω', tol: 0.01 }, calc: '0.5/0.05e-3', ms: [['B1', 'R = 0.50 ÷ 0.050 × 10⁻³ = 1.0 × 10⁴ Ω']] },
        { q: 'State how the student could vary the p.d. smoothly from zero.', m: 1, lines: 2, ms: [['B1', 'Use a potential divider (potentiometer) or a variable power supply']] }] }
    ]
  });

  /* ---------------- e6 Resistivity, thermistors and LDRs ---------------- */
  add('e6', {
    ex: [
      ['Trap: stretching a wire', 'A wire is stretched to twice its length without changing its volume. What happens to its resistance?', [
        ['Volume stays the same', 'If L doubles, A must halve.', ['L → 2L,  A → A/2']],
        ['Substitute into R = ρL ÷ A', 'The trap: doubling R because L doubled.', [`R → ${fr('ρ × 2L', 'A/2')} = 4 × ${fr('ρL', 'A')}`, res('the resistance becomes four times larger')]]
      ], { chk: [['2/0.5', 4]] }],
      ['A model answer: why a thermistor’s resistance falls', 'Explain why the resistance of an NTC thermistor decreases as its temperature rises. (3 marks)', [
        ['Semiconductor', '', [`A thermistor is a ${mp('semiconductor')}: it has few free charge carriers at room temperature.`]],
        ['More carriers', '', [`Heating ${mp('releases more electrons')} (more charge carriers), so n increases greatly.`]],
        ['Result', 'Link to I = Anev.', [`For a given p.d. the current increases, so the ${mp('resistance decreases')}. The extra lattice vibration has a much smaller opposite effect.`]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A wire has diameter 0.40 mm.', lines: ['cross-sectional area = [[1.257e-7]] m²'], calc: ['pi*0.2e-3**2'], why: 'Use the radius, 0.20 × 10⁻³ m.' },
      { q: 'A constantan wire (ρ = 4.9 × 10⁻⁷ Ω m) is 1.5 m long with area 1.257 × 10⁻⁷ m².', lines: ['R = ρL ÷ A = [[5.85]] Ω'], calc: ['4.9e-7*1.5/1.257e-7'], why: 'Resistance rises with length and falls with area.' },
      { q: 'A wire of length 0.80 m and area 2.0 × 10⁻⁷ m² has resistance 2.5 Ω.', lines: ['ρ = RA ÷ L = [[6.25e-7]] Ω m'], calc: ['2.5*2e-7/0.8'], why: 'Resistivity is a property of the material.' }
    ],
    exam: [
      { stem: '<p>An NTC thermistor has a resistance of 4.7 kΩ at 25 °C and 1.8 kΩ at 50 °C. It is connected directly across a 5.0 V supply.</p>', parts: [
        { q: 'Explain why the resistance of the thermistor decreases as its temperature increases.', m: 2, lines: 3, ms: [['B1', 'It is a semiconductor; heating frees more charge carriers'], ['B1', 'The number density of charge carriers increases, so the current for a given p.d. increases']] },
        { q: 'Calculate the current in the thermistor at 50 °C.', m: 1, ans: { a: 2.78e-3, unit: 'A', tol: 0.02 }, calc: '5/1.8e3', ms: [['B1', 'I = 5.0 ÷ 1800 = 2.8 × 10⁻³ A']] },
        { q: 'Calculate the percentage decrease in resistance between 25 °C and 50 °C.', m: 1, ans: { a: 61.7, unit: '%', tol: 0.02 }, calc: '(4.7-1.8)/4.7*100', ms: [['B1', '(4.7 − 1.8) ÷ 4.7 × 100 = 62 %']] }] }
    ]
  });

  /* ---------------- e7 Electrical power and energy ---------------- */
  add('e7', {
    ex: [
      ['Why transmit at high voltage?', 'A power station sends 1.0 MW through cables of total resistance 5.0 Ω. Compare the power wasted in the cables if it is transmitted at 25 kV and at 400 kV.', [
        ['Currents', 'P = VI.', ['25 kV: I = 1.0 × 10⁶ ÷ 25 000 = 40 A', '400 kV: I = 1.0 × 10⁶ ÷ 400 000 = 2.5 A']],
        ['Power wasted', 'P = I²R.', ['25 kV: 40² × 5.0 = 8000 W', '400 kV: 2.5² × 5.0 = 31 W']],
        ['Conclusion', '', [res('16 times the voltage gives 1/16 of the current and 1/256 of the power loss')]]
      ], { chk: [['1e6/25e3', 40], ['1e6/4e5', 2.5], ['40**2*5', 8000], ['2.5**2*5', 31.25]] }],
      ['Trap: the cost of a heater', 'A 2.5 kW heater runs for 90 minutes. Electricity costs 27p per kW h. Find the cost.', [
        ['Energy in kW h', 'The trap: using 90 instead of 1.5 hours.', ['E = 2.5 kW × 1.5 h = 3.75 kW h']],
        ['Cost', '', [res('3.75 × 27p = 101p (£1.01)')]]
      ], { chk: [['2.5*1.5', 3.75], ['3.75*27', 101.25]] }]
    ],
    gaps: [
      { q: 'A heater of resistance 53 Ω is connected to 230 V.', lines: ['power = V² ÷ R = [[998]] W'], calc: ['230**2/53'], why: 'About 1 kW.' },
      { q: 'A 60 W lamp runs on 230 V.', lines: ['current = [[0.261]] A'], calc: ['60/230'], why: 'I = P ÷ V.' },
      { q: 'A 1.5 kW appliance runs for 2.0 hours.', lines: ['energy = [[3]] kW h = [[1.08e7]] J'], calc: ['1.5*2', '1500*7200'], why: '1 kW h = 3.6 × 10⁶ J.' }
    ],
    exam: [
      { stem: '<p>An electric shower is rated at 9.5 kW, 230 V. Water flows through it at 0.12 kg s⁻¹. The specific heat capacity of water is 4200 J kg⁻¹ K⁻¹.</p>', parts: [
        { q: 'Calculate the current in the shower.', m: 1, ans: { a: 41.3, unit: 'A', tol: 0.02 }, calc: '9500/230', ms: [['B1', 'I = 9500 ÷ 230 = 41 A']] },
        { q: 'Calculate the resistance of the heating element.', m: 1, ans: { a: 5.57, unit: 'Ω', tol: 0.02 }, calc: '230**2/9500', ms: [['B1', 'R = V² ÷ P = 5.6 Ω']] },
        { q: 'Calculate the energy used in an 8.0-minute shower, in kW h.', m: 1, ans: { a: 1.267, unit: 'kW h', tol: 0.02 }, calc: '9.5*8/60', ms: [['B1', '9.5 × (8 ÷ 60) = 1.3 kW h']] },
        { q: 'Calculate the temperature rise of the water, assuming all the energy heats it.', m: 2, ans: { a: 18.8, unit: 'K', tol: 0.02 }, calc: '9500/(0.12*4200)', ms: [['C1', 'P = (m/t)cΔθ, so Δθ = 9500 ÷ (0.12 × 4200)'], ['A1', 'Δθ = 19 K']] },
        { q: 'Explain why the shower needs thicker supply cables than a lamp.', m: 1, lines: 2, ms: [['B1', 'The current is much larger; thicker cables have lower resistance, so less power (I²R) is wasted heating them and they do not overheat']] }] }
    ]
  });

  /* ---------------- e8 Series and parallel circuits; Kirchhoff's second law ---------------- */
  add('e8', {
    ex: [
      ['A series–parallel combination', 'A 10 Ω resistor is in series with a parallel pair of 20 Ω and 30 Ω, across a 12 V supply of negligible internal resistance. Find the current in the 20 Ω resistor.', [
        ['Parallel pair', '', [`R = ${fr('1', '1/20 + 1/30')} = 12 Ω`]],
        ['Total resistance and current', '', ['R_total = 10 + 12 = 22 Ω', 'I = 12 ÷ 22 = 0.545 A']],
        ['Share the p.d.', 'Kirchhoff’s second law: the p.d.s around the loop add to 12 V.', ['p.d. across 10 Ω = 5.45 V, so p.d. across the pair = 6.55 V']],
        ['Current in 20 Ω', '', [res('I = 6.55 ÷ 20 = 0.33 A')]]
      ], { chk: [['1/(1/20+1/30)', 12], ['12/22', 0.5455], ['12*12/22', 6.545], ['12*12/22/20', 0.327]] }],
      ['Two cells in one loop', 'Cells of e.m.f. 6.0 V and 1.5 V, both pointing the same way, are in series with resistors of 3.0 Ω and 4.5 Ω. Find the current.', [
        ['Kirchhoff’s second law', 'Sum of e.m.f.s = sum of p.d.s around the loop.', ['6.0 + 1.5 = I(3.0 + 4.5)']],
        ['Current', '', [res('I = 7.5 ÷ 7.5 = 1.0 A')]],
        ['If one cell is reversed', 'Its e.m.f. subtracts.', ['I = (6.0 − 1.5) ÷ 7.5 = 0.60 A']]
      ], { chk: [['7.5/7.5', 1], ['4.5/7.5', 0.6]] }]
    ],
    gaps: [
      { q: 'Resistors of 4.7 Ω, 2.2 Ω and 1.0 Ω are in series.', lines: ['total = [[7.9]] Ω'], calc: ['4.7+2.2+1'], why: 'In series, resistances add.' },
      { q: 'Resistors of 6.0 Ω and 3.0 Ω are in parallel.', lines: ['combined = [[2]] Ω'], calc: ['1/(1/6+1/3)'], why: 'Less than the smaller one.' },
      { q: 'Three 9.0 Ω resistors are in parallel.', lines: ['combined = [[3]] Ω'], calc: ['9/3'], why: 'n identical resistors in parallel give R ÷ n.' }
    ],
    exam: [
      { stem: '<p>A string of 40 identical lamps is connected in series to the 230 V mains. The current is 0.25 A.</p>', parts: [
        { q: 'Calculate the p.d. across each lamp.', m: 1, ans: { a: 5.75, unit: 'V', tol: 0.01 }, calc: '230/40', ms: [['B1', '230 ÷ 40 = 5.75 V']] },
        { q: 'Calculate the resistance of each lamp.', m: 1, ans: { a: 23, unit: 'Ω', tol: 0.01 }, calc: '230/40/0.25', ms: [['B1', '5.75 ÷ 0.25 = 23 Ω']] },
        { q: 'Calculate the total power of the string.', m: 1, ans: { a: 57.5, unit: 'W', tol: 0.01 }, calc: '230*0.25', ms: [['B1', '230 × 0.25 = 57.5 W']] },
        { q: 'Explain why all the lamps go out when one fails, and suggest one advantage of wiring them in parallel instead.', m: 2, lines: 3, ms: [['B1', 'In series there is only one path, so a broken filament stops the current everywhere'], ['B1', 'In parallel each lamp has its own path, so the others stay lit (each would need to be rated for 230 V)']] }] }
    ]
  });

  /* ---------------- e9 Analysing circuits ---------------- */
  add('e9', {
    ex: [
      ['Two loops, two cells', 'Cell A (6.0 V) with a 2.0 Ω resistor and cell B (3.0 V) with a 4.0 Ω resistor are connected in parallel across a shared 4.0 Ω resistor. Both positive terminals face the same junction. Find the current through each cell.', [
        ['Label the currents', 'Kirchhoff’s first law at the junction.', ['I₁ from cell A, I₂ from cell B; the shared resistor carries I₁ + I₂']],
        ['Kirchhoff’s second law round each loop', '', ['loop A: 6.0 = 2.0I₁ + 4.0(I₁ + I₂)', 'loop B: 3.0 = 4.0I₂ + 4.0(I₁ + I₂)']],
        ['Solve', 'Simplify: 6.0 = 6I₁ + 4I₂ and 3.0 = 4I₁ + 8I₂.', ['I₁ = 1.125 A,  I₂ = −0.1875 A']],
        ['Interpret', 'The negative sign means the current through B flows the other way.', [res('cell A drives 1.1 A; 0.19 A is pushed backwards through cell B; the shared resistor carries 0.94 A')]]
      ], { chk: [['(12-3)/8', 1.125], ['(3-4*1.125)/8', -0.1875], ['1.125-0.1875', 0.9375], ['2*1.125+4*0.9375', 6], ['4*(-0.1875)+4*0.9375', 3]] }],
      ['Trap: a voltmeter changes the circuit', 'Two 10 kΩ resistors in series are connected to 6.0 V. A voltmeter of resistance 10 kΩ is connected across one of them. What does it read?', [
        ['Expected reading', 'With an ideal voltmeter, the p.d. splits equally.', ['3.0 V']],
        ['The voltmeter in parallel', 'The trap: forgetting that the meter is itself a resistor.', ['10 kΩ ∥ 10 kΩ = 5.0 kΩ']],
        ['Actual reading', '', [`V = 6.0 × ${fr('5.0', '10 + 5.0')}`, res('V = 2.0 V'), 'A voltmeter needs a resistance much larger than the resistor it is across.']]
      ], { chk: [['1/(1/10+1/10)', 5], ['6*5/15', 2]] }]
    ],
    gaps: [
      { q: 'A 12 V cell is in series with 4.0 Ω and 2.0 Ω.', lines: ['current = [[2]] A', 'p.d. across 4.0 Ω = [[8]] V'], calc: ['12/6', '2*4'], why: 'The p.d.s share the e.m.f. in proportion to resistance.' },
      { q: 'Two 10 kΩ resistors are connected in parallel.', lines: ['combined resistance = [[5000]] Ω'], calc: ['1/(1/1e4+1/1e4)'], why: 'Half of one.' }
    ],
    exam: [
      { stem: '<p>Two 100 kΩ resistors are connected in series to a 9.0 V supply of negligible internal resistance. A voltmeter of resistance 200 kΩ is connected across one of the resistors.</p>', parts: [
        { q: 'State the reading expected from an ideal voltmeter.', m: 1, ans: { a: 4.5, unit: 'V', tol: 0.01 }, calc: '4.5', ms: [['B1', '4.5 V']] },
        { q: 'Calculate the actual reading of the voltmeter.', m: 3, ans: { a: 3.6, unit: 'V', tol: 0.02 }, calc: '9*(1/(1/1e5+1/2e5))/(1e5+1/(1/1e5+1/2e5))', ms: [['C1', '100 kΩ ∥ 200 kΩ = 66.7 kΩ'], ['C1', 'V = 9.0 × 66.7 ÷ (100 + 66.7)'], ['A1', 'V = 3.6 V']] },
        { q: 'Explain why an ideal voltmeter has infinite resistance.', m: 1, lines: 2, ms: [['B1', 'It then takes no current, so it does not change the current or p.d.s in the circuit it measures']] },
        { q: 'Suggest how the measurement could be improved.', m: 1, lines: 2, ms: [['B1', 'Use a voltmeter with a much higher resistance (e.g. a digital meter of 10 MΩ), or use smaller resistors in the circuit']] }] }
    ]
  });

  /* ---------------- e10 E.m.f. and internal resistance ---------------- */
  add('e10', {
    ex: [
      ['Starting a car', 'A car battery has e.m.f. 12.6 V and internal resistance 0.020 Ω. The starter motor draws 150 A. Find the terminal p.d. and explain why the headlights dim while starting.', [
        ['Lost volts', '', ['Ir = 150 × 0.020 = 3.0 V']],
        ['Terminal p.d.', '', [res('V = E − Ir = 12.6 − 3.0 = 9.6 V')]],
        ['Dimming', '', ['The lamps in parallel now have only 9.6 V across them instead of about 12.6 V, so their power falls.']]
      ], { chk: [['150*0.02', 3], ['12.6-3', 9.6]] }],
      ['E and r from a graph', 'A student varies the load on a cell and records the terminal p.d. V and current I.' + tbl(['I / A', '0.20', '0.40', '0.60', '0.80'], [['V / V', '1.42', '1.34', '1.26', '1.18']]) + 'Find the e.m.f. and internal resistance.', [
        ['Straight-line form', 'V = E − Ir, so V against I has gradient −r and intercept E.', ['y = c + mx with m = −r, c = E']],
        ['Gradient', '', [`gradient = ${fr('1.18 − 1.42', '0.80 − 0.20')} = −0.40 Ω`]],
        ['Intercept', 'Extend to I = 0.', ['E = 1.42 + 0.40 × 0.20', res('E = 1.50 V, r = 0.40 Ω')]]
      ], { chk: [['(1.18-1.42)/0.6', -0.4], ['1.42+0.4*0.2', 1.5]] }]
    ],
    gaps: [
      { q: 'A cell of e.m.f. 6.0 V and internal resistance 0.50 Ω supplies 2.0 A.', lines: ['terminal p.d. = [[5]] V'], calc: ['6-2*0.5'], why: 'V = E − Ir.' },
      { q: 'A 9.0 V battery with r = 0.50 Ω is connected to a 4.0 Ω resistor.', lines: ['current = E ÷ (R + r) = [[2]] A'], calc: ['9/4.5'], why: 'The internal resistance is in series with the load.' },
      { q: 'A 1.5 V cell has a terminal p.d. of 1.2 V when supplying 0.50 A.', lines: ['internal resistance = [[0.6]] Ω'], calc: ['0.3/0.5'], why: 'r = lost volts ÷ current.' }
    ],
    exam: [
      { stem: '<p>Two identical cells, each of e.m.f. 1.5 V and internal resistance 0.80 Ω, are used to light a lamp of resistance 4.0 Ω.</p>', parts: [
        { q: 'The cells are connected in series. Calculate the current in the lamp.', m: 2, ans: { a: 0.536, unit: 'A', tol: 0.02 }, calc: '3/(4+1.6)', ms: [['C1', 'total e.m.f. 3.0 V, total internal resistance 1.6 Ω'], ['A1', 'I = 3.0 ÷ 5.6 = 0.54 A']] },
        { q: 'Calculate the terminal p.d. of the pair of cells.', m: 1, ans: { a: 2.14, unit: 'V', tol: 0.02 }, calc: '3/(4+1.6)*4', ms: [['B1', 'V = IR = 0.536 × 4.0 = 2.1 V']] },
        { q: 'The cells are reconnected in parallel. Calculate the new current in the lamp.', m: 1, ans: { a: 0.341, unit: 'A', tol: 0.02 }, calc: '1.5/(4+0.4)', ms: [['B1', 'e.m.f. 1.5 V, internal resistance 0.40 Ω: I = 1.5 ÷ 4.4 = 0.34 A']] }] }
    ]
  });

  /* ---------------- e11 Potential dividers ---------------- */
  add('e11', {
    ex: [
      ['Trap: a load pulls the output down', 'Two 2.0 kΩ resistors form a divider across 12 V. A 2.0 kΩ load is connected across the lower resistor. Find the output p.d.', [
        ['Without the load', '', ['V_out = 6.0 V']],
        ['With the load', 'The trap: assuming the output stays at 6.0 V. The load is in parallel with the lower resistor.', ['2.0 kΩ ∥ 2.0 kΩ = 1.0 kΩ', `V_out = 12 × ${fr('1.0', '2.0 + 1.0')}`, res('V_out = 4.0 V')]]
      ], { chk: [['12*1/3', 4]] }],
      ['Designing a divider', 'A 10 kΩ resistor is the top resistor of a divider on a 9.0 V supply. What lower resistor gives 3.3 V across it?', [
        ['Divider equation', '', [`3.3 = 9.0 × ${fr('R₂', '10 + R₂')} (R₂ in kΩ)`]],
        ['Solve', '', ['3.3(10 + R₂) = 9.0R₂', '33 = 5.7R₂', res('R₂ = 5.8 kΩ')]]
      ], { chk: [['33/5.7', 5.789]] }]
    ],
    gaps: [
      { q: 'A divider has 2.2 kΩ (top) and 4.7 kΩ (bottom) on 12 V.', lines: ['p.d. across 4.7 kΩ = [[8.17]] V'], calc: ['12*4.7/6.9'], why: 'V_out = V_in × R₂ ÷ (R₁ + R₂).' },
      { q: 'A 1.0 kΩ and a 3.0 kΩ resistor are in series on 6.0 V.', lines: ['p.d. across 1.0 kΩ = [[1.5]] V'], calc: ['6*1/4'], why: 'A quarter of the resistance takes a quarter of the p.d.' },
      { q: 'Resistors of 3.3 kΩ and 6.8 kΩ are in series.', lines: ['V₁ ÷ V₂ = R₁ ÷ R₂ = [[0.485]]'], calc: ['3.3/6.8'], why: 'The same current flows through both.' }
    ],
    exam: [
      { stem: '<p>A potential divider must give an output of 5.0 V from a 12 V supply. The top resistor R₁ is 4.7 kΩ.</p>', parts: [
        { q: 'Calculate the value of the lower resistor R₂.', m: 2, ans: { a: 3357, unit: 'Ω', tol: 0.02 }, calc: '5*4.7e3/7', ms: [['C1', '5.0 = 12 × R₂ ÷ (4.7 + R₂)'], ['A1', 'R₂ = 3.4 kΩ']] },
        { q: 'A standard 3.3 kΩ resistor is used. Calculate the actual output.', m: 1, ans: { a: 4.95, unit: 'V', tol: 0.01 }, calc: '12*3.3/8', ms: [['B1', '12 × 3.3 ÷ 8.0 = 4.95 V']] },
        { q: 'A 3.3 kΩ load is connected across R₂. Calculate the new output.', m: 2, ans: { a: 3.12, unit: 'V', tol: 0.02 }, calc: '12*1.65/(4.7+1.65)', ms: [['C1', '3.3 kΩ ∥ 3.3 kΩ = 1.65 kΩ'], ['A1', 'V = 12 × 1.65 ÷ 6.35 = 3.1 V']] },
        { q: 'Explain why the output falls when the load is connected.', m: 1, lines: 2, ms: [['B1', 'The load in parallel reduces the resistance of the lower section, so it takes a smaller share of the supply p.d.']] }] }
    ]
  });

  /* ---------------- e12 Sensing circuits ---------------- */
  add('e12', {
    ex: [
      ['A light sensor in numbers', 'An LDR has a resistance of 400 Ω in daylight and 200 kΩ in the dark. It is in series with a 10 kΩ resistor on a 9.0 V supply. Find the p.d. across the LDR in each case.', [
        ['Daylight', '', [`V = 9.0 × ${fr('0.40', '0.40 + 10')}`, 'V = 0.35 V']],
        ['Dark', '', [`V = 9.0 × ${fr('200', '200 + 10')}`, 'V = 8.6 V']],
        ['Use', '', [res('the p.d. across the LDR rises sharply as it gets dark, so it can switch on a street lamp')]]
      ], { chk: [['9*0.4/10.4', 0.346], ['9*200/210', 8.571]] }],
      ['Choosing the fixed resistor', 'A thermistor and a fixed resistor R form a divider on 6.0 V. The output is taken across R and must reach 4.0 V when the thermistor’s resistance has fallen to 2.5 kΩ. Find R.', [
        ['Divider equation', 'The output is across R.', [`4.0 = 6.0 × ${fr('R', 'R + 2.5')} (in kΩ)`]],
        ['Solve', '', ['4.0R + 10 = 6.0R', res('R = 5.0 kΩ')]],
        ['Check the direction', '', ['As the temperature rises the thermistor resistance falls, so the p.d. across R rises: the output switches on when hot.']]
      ], { chk: [['10/2', 5], ['6*5/7.5', 4]] }]
    ],
    gaps: [
      { q: 'A thermistor of resistance 5.0 kΩ is in series with 15 kΩ on 12 V.', lines: ['p.d. across the thermistor = [[3]] V'], calc: ['12*5/20'], why: 'A quarter of the resistance.' },
      { q: 'An LDR of 1.0 kΩ is in series with a 4.0 kΩ resistor on 5.0 V.', lines: ['p.d. across the 4.0 kΩ resistor = [[4]] V'], calc: ['5*4/5'], why: 'In bright light the LDR takes very little of the p.d.' }
    ],
    exam: [
      { stem: '<p>A frost alarm uses a thermistor in series with a variable resistor R across a 5.0 V supply. The alarm sounds when the p.d. across the thermistor exceeds 2.0 V. At 0 °C the thermistor’s resistance is 33 kΩ.</p>', parts: [
        { q: 'Explain why the p.d. across the thermistor rises as the temperature falls.', m: 2, lines: 3, ms: [['B1', 'The thermistor’s resistance increases as its temperature falls'], ['B1', 'It takes a larger share of the supply p.d. (its fraction of the total resistance increases)']] },
        { q: 'Calculate the value of R needed for the alarm to sound at 0 °C.', m: 2, ans: { a: 49500, unit: 'Ω', tol: 0.02 }, calc: '33e3*(5-2)/2', ms: [['C1', '2.0 = 5.0 × 33 ÷ (33 + R)'], ['A1', 'R = 49.5 kΩ']] },
        { q: 'Suggest why a variable resistor is used rather than a fixed one.', m: 1, lines: 2, ms: [['B1', 'The switching temperature can be adjusted (calibrated) by changing R']] },
        { q: 'At 10 °C the thermistor’s resistance is 20 kΩ. Calculate the p.d. across it.', m: 1, ans: { a: 1.44, unit: 'V', tol: 0.02 }, calc: '5*20/69.5', ms: [['B1', '5.0 × 20 ÷ 69.5 = 1.4 V']] },
        { q: 'State whether the alarm sounds at 10 °C.', m: 1, lines: 1, ms: [['B1', 'No: 1.4 V is less than 2.0 V']] }] }
    ]
  });

  /* ---------------- e13 Review and exam practice ---------------- */
  add('e13', {
    ex: [
      ['Synoptic: designing a heater', 'A 60 W heater for a 12 V supply is to be made from nichrome wire (ρ = 1.1 × 10⁻⁶ Ω m) of diameter 0.40 mm. What length is needed?', [
        ['Resistance needed', 'P = V² ÷ R.', ['R = 12² ÷ 60 = 2.4 Ω']],
        ['Area', '', ['A = π × (0.20 × 10⁻³)² = 1.26 × 10⁻⁷ m²']],
        ['Length', 'R = ρL ÷ A.', [`L = ${fr('2.4 × 1.26 × 10⁻⁷', '1.1 × 10⁻⁶')}`, res('L = 0.27 m')]]
      ], { chk: [['144/60', 2.4], ['pi*0.2e-3**2', 1.257e-7], ['2.4*pi*0.2e-3**2/1.1e-6', 0.274]] }],
      ['A model answer: measuring internal resistance', 'Describe how to find the e.m.f. and internal resistance of a cell. (6 marks)', [
        ['Circuit', '', [`Connect the cell in series with an ${mp('ammeter and a variable resistor')}, with a ${mp('voltmeter across the cell’s terminals')}.`]],
        ['Measurements', '', [`${mp('Vary the resistance')} and record pairs of terminal p.d. V and current I (at least six); open the switch between readings so the cell does not heat up or run down.`]],
        ['Analysis', '', [`Plot ${mp('V against I')}: a straight line. ${mp('Intercept on the V axis = E')}; ${mp('gradient = −r')}.`]],
        ['Precautions', '', ['Include a protective resistor so the current stays small, and repeat readings to check they agree.']]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A 12 V supply with negligible internal resistance is connected to 6.0 Ω in series with (6.0 Ω ∥ 3.0 Ω).', lines: ['total resistance = [[8]] Ω', 'supply current = [[1.5]] A'], calc: ['6+2', '12/8'], why: 'Combine the parallel pair first.' }
    ],
    exam: [
      { stem: '<p>A phone battery has an e.m.f. of 3.85 V, an internal resistance of 0.15 Ω and a capacity of 4000 mA h. In use the phone draws a steady 0.50 A.</p>', parts: [
        { q: 'Calculate the charge stored in the battery when fully charged.', m: 1, ans: { a: 14400, unit: 'C', tol: 0.01 }, calc: '4.0*3600', ms: [['B1', '4.0 A × 3600 s = 1.44 × 10⁴ C']] },
        { q: 'Calculate the energy transferred by the battery from full to empty, using its e.m.f.', m: 1, ans: { a: 55440, unit: 'J', tol: 0.01 }, calc: '3.85*14400', ms: [['B1', 'W = EQ = 3.85 × 14 400 = 5.5 × 10⁴ J']] },
        { q: 'Calculate the terminal p.d. while the phone is in use.', m: 1, ans: { a: 3.775, unit: 'V', tol: 0.01 }, calc: '3.85-0.5*0.15', ms: [['B1', 'V = 3.85 − 0.50 × 0.15 = 3.78 V']] },
        { q: 'Calculate how long the battery lasts at this current.', m: 1, ans: { a: 8, unit: 'h', tol: 0.01 }, calc: '4/0.5', ms: [['B1', '4000 mA h ÷ 500 mA = 8.0 h']] },
        { q: 'Calculate the power wasted inside the battery.', m: 1, ans: { a: 0.0375, unit: 'W', tol: 0.02 }, calc: '0.5**2*0.15', ms: [['B1', 'P = I²r = 0.50² × 0.15 = 0.038 W']] }] }
    ]
  });

  /* third fill-the-gaps for the calculation-heavy lessons */
  add('e3', { gaps: [{ q: 'Two wires of the same metal carry the same current. Wire P has twice the diameter of wire Q.', lines: ['area of P ÷ area of Q = [[4]]', 'drift velocity in P ÷ drift velocity in Q = [[0.25]]'], calc: ['4', '0.25'], why: 'v = I ÷ nAe, and area goes as diameter squared.' }] });
  add('e9', { gaps: [{ q: 'A 9.0 V and a 3.0 V cell are connected in series but facing opposite ways, with a 4.0 Ω resistor.', lines: ['net e.m.f. = [[6]] V', 'current = [[1.5]] A'], calc: ['9-3', '6/4'], why: 'Opposing e.m.f.s subtract around the loop.' }] });
  add('e12', { gaps: [{ q: 'In a divider on 6.0 V, a thermistor of 3.0 kΩ is in series with a 1.0 kΩ resistor. The output is across the 1.0 kΩ resistor.', lines: ['output = [[1.5]] V', 'when the thermistor falls to 1.0 kΩ, output = [[3]] V'], calc: ['6*1/4', '6*1/2'], why: 'Hotter: the thermistor resistance falls, so the output across the fixed resistor rises.' }] });
})();
