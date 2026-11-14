/* Measurements and uncertainties (mu1–mu5): extra worked examples, fill-the-gaps and exam-style questions.
   Data sets and regressions: tools/mu_data.py. Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const tbl = (head, rows) => `<div class="tbl-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  /* ---------------- mu1 SI units, prefixes and significant figures ---------------- */
  add('mu1', {
    ex: [
      ['Density of a metal cylinder', 'A metal cylinder has diameter 12.0 mm, length 5.00 cm and mass 44.1 g. Calculate its density in kg m⁻³.', [
        ['Convert every quantity first', 'Three different prefixes: deal with them before any calculation.', ['r = 6.00 mm = 6.00 × 10⁻³ m', 'L = 5.00 cm = 5.00 × 10⁻² m', 'm = 44.1 g = 4.41 × 10⁻² kg']],
        ['Volume', '', [`V = πr²L = π × (6.00 × 10⁻³)² × 5.00 × 10⁻² = 5.655 × 10⁻⁶ m³`]],
        ['Density, rounded at the end', 'The data are given to three significant figures, so the answer is too.', [`ρ = ${fr('m', 'V')} = ${fr('4.41 × 10⁻²', '5.655 × 10⁻⁶')} = 7798 kg m⁻³`, res('ρ = 7.80 × 10³ kg m⁻³')]]
      ], { chk: [['pi*6e-3**2*5e-2', 5.655e-6], ['4.41e-2/(pi*6e-3**2*5e-2)', 7798]] }],
      ['Trap: converting compound units', 'Convert (a) 72 km h⁻¹ into m s⁻¹, (b) 2.5 g cm⁻³ into kg m⁻³, (c) 3.0 kW h into J.', [
        ['Speed', 'Convert the top and the bottom separately.', [`72 km h⁻¹ = ${fr('72 × 10³ m', '3600 s')}`, res('= 20 m s⁻¹')]],
        ['Density', 'The trap: 1 cm³ is 10⁻⁶ m³, not 10⁻² m³. The number gets bigger, because a cubic metre holds far more mass.', [`2.5 g cm⁻³ = ${fr('2.5 × 10⁻³ kg', '10⁻⁶ m³')}`, res('= 2.5 × 10³ kg m⁻³')]],
        ['Energy', 'A kilowatt-hour is a power multiplied by a time.', ['3.0 kW h = 3.0 × 10³ W × 3600 s', res('= 1.1 × 10⁷ J')]]
      ], { chk: [['72e3/3600', 20], ['2.5e-3/1e-6', 2500], ['3.0e3*3600', 1.08e7]] }],
      ['Checking an equation with units', 'The drag on a ball is modelled by F = kAv², where A is an area and v is a speed. (a) Find the base units of k. (b) A student writes the period of a pendulum as T = 2π√(g/l). Use units to show this is wrong.', [
        ['Base units of each quantity', '', ['F: N = kg m s⁻²', 'A: m²    v²: m² s⁻²']],
        ['Rearrange for k', 'Units behave like algebra.', [`k = ${fr('F', 'Av²')} → ${fr('kg m s⁻²', 'm² × m² s⁻²')}`, res('k: kg m⁻³ (a density)')]],
        ['Test the pendulum equation', 'A correct equation must give seconds on the right.', [`√(g/l) → √(${fr('m s⁻²', 'm')}) = √(s⁻²) = s⁻¹`, 'The right-hand side has units s⁻¹, not s, so the equation is not homogeneous.', res('It must be T = 2π√(l/g).')]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A rectangular strip measures 3.0 mm by 4.0 mm. Find its area in m².', lines: ['3.0 mm = [[3.0e-3]] m and 4.0 mm = 4.0 × 10⁻³ m', 'A = 3.0 × 10⁻³ × 4.0 × 10⁻³ = [[1.2e-5]] m²'], calc: ['3.0e-3', '3.0e-3*4.0e-3'], why: 'Converting first avoids the mm² trap: 12 mm² = 12 × 10⁻⁶ m².' },
      { q: 'Convert 90 km h⁻¹ into m s⁻¹.', lines: ['90 km = 90 × [[1000]] m', '1 h = [[3600]] s', 'speed = 90 000 ÷ 3600 = [[25]] m s⁻¹'], calc: ['1000', '3600', '90e3/3600'], why: 'Dividing by 3.6 is a useful shortcut from km h⁻¹ to m s⁻¹.' },
      { q: 'Find the base units of the joule from W = Fd.', lines: ['F: kg m s⁻²   d: m', 'J = kg m^[[2]] s^[[-2]]'], calc: ['2', '-2'], why: 'kg m s⁻² × m = kg m² s⁻².' }
    ],
    exam: [
      { stem: '<p>Units can be used to check equations.</p>', parts: [
        { q: 'State what is meant by a <b>homogeneous</b> equation.', m: 1, lines: 2, ms: [['B1', 'Every term on both sides has the same (base) units']] },
        { q: 'Show that the pascal, written in SI base units, is kg m⁻¹ s⁻².', m: 2, lines: 3, ms: [['M1', 'Pa = N m⁻² and N = kg m s⁻²'], ['A1', 'kg m s⁻² × m⁻² = kg m⁻¹ s⁻²']] },
        { q: 'The drag force on a car is F = ½ρACv², where ρ is the density of air, A is an area and v is the speed. Show that the drag coefficient C has no unit.', m: 2, lines: 4, ms: [['M1', 'ρAv² has units kg m⁻³ × m² × m² s⁻² = kg m s⁻²'], ['A1', 'This is the unit of F (N), so C = 2F ÷ ρAv² is a ratio with no unit']] }] },
      { stem: '<p>A resistance wire has diameter 0.38 mm and length 2.40 m. Its resistance is 12.6 Ω.</p>', parts: [
        { q: 'Calculate the cross-sectional area of the wire in m².', m: 2, ans: { a: 1.134e-7, unit: 'm²', tol: 0.02 }, calc: 'pi*(0.19e-3)**2', ms: [['C1', 'r = 0.19 × 10⁻³ m (diameter halved and converted)'], ['A1', 'A = π × (0.19 × 10⁻³)² = 1.13 × 10⁻⁷ m²']] },
        { q: 'Calculate the resistivity of the metal. Use ρ = RA ÷ L.', m: 2, ans: { a: 5.95e-7, unit: 'Ω m', tol: 0.02 }, calc: '12.6*pi*(0.19e-3)**2/2.40', ms: [['C1', 'ρ = 12.6 × 1.13 × 10⁻⁷ ÷ 2.40'], ['A1', 'ρ = 6.0 × 10⁻⁷ Ω m (5.95 × 10⁻⁷)']] },
        { q: 'A student writes the answer as 5.9541 × 10⁻⁷ Ω m. Explain why this is not appropriate and state a suitable answer.', m: 2, lines: 3, ms: [['B1', 'The diameter is given to only two significant figures, so five significant figures claims a precision the data do not have'], ['B1', '6.0 × 10⁻⁷ Ω m (two significant figures)']] }] },
      { stem: '<p>Answer each part in the unit asked for.</p>', parts: [
        { q: 'Convert 2.5 kW h into joules.', m: 1, ans: { a: 9.0e6, unit: 'J', tol: 0.01 }, calc: '2.5e3*3600', ms: [['B1', '2.5 × 10³ × 3600 = 9.0 × 10⁶ J']] },
        { q: 'Convert 250 cm³ into m³.', m: 1, ans: { a: 2.5e-4, unit: 'm³', tol: 0.01 }, calc: '250*1e-6', ms: [['B1', '250 × 10⁻⁶ = 2.5 × 10⁻⁴ m³']] },
        { q: 'A hair has diameter 0.000 062 m. Write this in micrometres.', m: 1, ans: { a: 62, unit: 'μm', tol: 0.01 }, calc: '0.000062/1e-6', ms: [['B1', '62 μm (6.2 × 10⁻⁵ m)']] },
        { q: 'A signal has frequency 2.4 GHz. Calculate its period in nanoseconds.', m: 1, ans: { a: 0.417, unit: 'ns', tol: 0.02 }, calc: '1/2.4e9/1e-9', ms: [['B1', 'T = 1 ÷ 2.4 × 10⁹ = 4.2 × 10⁻¹⁰ s = 0.42 ns']] }] }
    ]
  });

  /* ---------------- mu2 Measurements, errors and repeat readings ---------------- */
  add('mu2', {
    ex: [
      ['Repeat readings with a micrometer', 'The diameter of a ball bearing is measured five times: 6.34, 6.36, 6.35, 6.33 and 6.37 mm. Find the diameter with its uncertainty, then the volume of the ball with its uncertainty.', [
        ['Mean', '', ['mean d = (6.34 + 6.36 + 6.35 + 6.33 + 6.37) ÷ 5 = 6.35 mm']],
        ['Uncertainty from the spread', 'Half the range of the repeats.', ['Δd = (6.37 − 6.33) ÷ 2 = 0.02 mm', 'percentage uncertainty = 0.02 ÷ 6.35 × 100 = 0.31 %', res('d = (6.35 ± 0.02) mm')]],
        ['Volume', 'V = ⁴⁄₃πr³ = πd³ ÷ 6.', ['V = π × 6.35³ ÷ 6 = 134.1 mm³']],
        ['Uncertainty in the volume', 'd is cubed, so its percentage uncertainty counts three times.', ['% uncertainty in V = 3 × 0.31 = 0.94 %', 'ΔV = 0.0094 × 134.1 = 1.3 mm³', res('V = (134 ± 1) mm³')]]
      ], { chk: [['mean(6.34,6.36,6.35,6.33,6.37)', 6.35], ['(6.37-6.33)/2', 0.02], ['0.02/6.35*100', 0.315, 0.02], ['pi*6.35**3/6', 134.1], ['3*0.02/6.35*100', 0.945, 0.01], ['3*0.02/6.35*pi*6.35**3/6', 1.27, 0.03]] }],
      ['Trap: a zero error', 'With its jaws closed a micrometer reads 0.03 mm. Three readings of the thickness of a glass slide are 1.26, 1.27 and 1.25 mm. Find the thickness.', [
        ['Recognise the type of error', 'Every reading is 0.03 mm too large: a systematic (zero) error. Averaging does not remove it.', ['mean reading = (1.26 + 1.27 + 1.25) ÷ 3 = 1.26 mm']],
        ['Correct the mean', 'Subtract the zero reading.', ['thickness = 1.26 − 0.03 = 1.23 mm']],
        ['Uncertainty', 'The spread gives the random uncertainty; it is unchanged by the correction.', ['half-range = (1.27 − 1.25) ÷ 2 = 0.01 mm', res('thickness = (1.23 ± 0.01) mm')]]
      ], { chk: [['mean(1.26,1.27,1.25)', 1.26], ['mean(1.26,1.27,1.25)-0.03', 1.23], ['(1.27-1.25)/2', 0.01]] }],
      ['Dealing with an anomaly', 'The time for 20 oscillations of a pendulum is recorded four times: 24.8, 25.0, 27.9 and 24.9 s. Find the period with its uncertainty.', [
        ['Look at the readings before averaging', '27.9 s is about 3 s away from the others, far more than their spread: probably a miscount of the oscillations.', ['Repeat that reading if you can. Otherwise leave it out and say so.']],
        ['Mean of the others', '', ['mean time = (24.8 + 25.0 + 24.9) ÷ 3 = 24.9 s']],
        ['Uncertainty', '', ['Δt = (25.0 − 24.8) ÷ 2 = 0.1 s']],
        ['Divide by the number of oscillations', 'Twenty is an exact count, so divide both the value and its uncertainty.', ['T = 24.9 ÷ 20 = 1.245 s    ΔT = 0.1 ÷ 20 = 0.005 s', res('T = (1.245 ± 0.005) s, an uncertainty of 0.4 %')]]
      ], { chk: [['mean(24.8,25.0,24.9)', 24.9], ['24.9/20', 1.245], ['0.1/20', 0.005], ['0.005/1.245*100', 0.4, 0.02]] }]
    ],
    gaps: [
      { q: 'Three readings of a p.d. are 2.31 V, 2.35 V and 2.33 V. Find the mean and its uncertainty.', lines: ['mean = (2.31 + 2.35 + 2.33) ÷ 3 = [[2.33]] V', 'range = 2.35 − 2.31 = [[0.04]] V', 'uncertainty = half the range = [[0.02]] V'], calc: ['mean(2.31,2.35,2.33)', '2.35-2.31', '(2.35-2.31)/2'], why: 'Quote V = (2.33 ± 0.02) V.' },
      { q: 'A length of 80.0 mm is measured with a ruler. Each end can be read to ±0.5 mm.', lines: ['absolute uncertainty = 0.5 + 0.5 = [[1]] mm', 'percentage uncertainty = 1 ÷ 80.0 × 100 = [[1.25]] %'], calc: ['0.5+0.5', '1/80*100'], why: 'Two readings are needed for one length, so the two uncertainties add.' },
      { q: 'Twenty oscillations take (31.4 ± 0.2) s. Find the period.', lines: ['T = 31.4 ÷ 20 = [[1.57]] s', 'ΔT = 0.2 ÷ 20 = [[0.01]] s', 'percentage uncertainty = 0.2 ÷ 31.4 × 100 = [[0.64]] %'], calc: ['31.4/20', '0.2/20', '0.2/31.4*100'], why: 'The percentage uncertainty in T is the same as in the total time.' }
    ],
    exam: [
      { stem: '<p>A student measures the diameter of a wire at five places along its length: 0.46 mm, 0.48 mm, 0.47 mm, 0.47 mm and 0.52 mm.</p>', parts: [
        { q: 'Explain the difference between an <b>accurate</b> measurement and a <b>precise</b> measurement.', m: 2, lines: 3, ms: [['B1', 'Accurate: close to the true value'], ['B1', 'Precise: repeated readings are close to each other (small spread)']] },
        { q: 'Identify the anomalous reading and state how it should be treated.', m: 2, lines: 3, ms: [['B1', '0.52 mm'], ['B1', 'Repeat the measurement at that place (the wire may have a kink or the jaws were not square); if it is still out of line, leave it out of the mean and record that this was done']] },
        { q: 'Calculate the mean diameter using the other four readings.', m: 1, ans: { a: 0.47, unit: 'mm', tol: 0.01 }, calc: 'mean(0.46,0.48,0.47,0.47)', ms: [['B1', '(0.46 + 0.48 + 0.47 + 0.47) ÷ 4 = 0.47 mm']] },
        { q: 'Calculate the percentage uncertainty in the mean diameter, using half the range.', m: 2, ans: { a: 2.13, unit: '%', tol: 0.06 }, calc: '((0.48-0.46)/2)/0.47*100', ms: [['C1', 'half-range = (0.48 − 0.46) ÷ 2 = 0.01 mm'], ['A1', '0.01 ÷ 0.47 × 100 = 2.1 %']] }] },
      { stem: '<p>The time for 10 oscillations of a mass on a spring is measured three times with a hand-held stopwatch that reads to 0.01 s: 14.2 s, 14.5 s and 14.3 s.</p>', parts: [
        { q: 'Calculate the period of the oscillations and its absolute uncertainty.', m: 3, ans: { a: 1.433, unit: 's', tol: 0.01 }, calc: 'mean(14.2,14.5,14.3)/10', ms: [['C1', 'mean time = 14.33 s'], ['C1', 'half-range = (14.5 − 14.2) ÷ 2 = 0.15 s'], ['A1', 'T = 1.43 s with uncertainty 0.015 s, so T = (1.43 ± 0.02) s']] },
        { q: 'Explain why timing 10 oscillations gives a smaller percentage uncertainty in the period than timing one.', m: 2, lines: 3, ms: [['B1', 'The absolute uncertainty in starting and stopping the watch (reaction time) is about the same however long is timed'], ['B1', 'The time measured is 10 times longer, so the uncertainty is a 10 times smaller fraction of it']] },
        { q: 'The stopwatch reads to 0.01 s. Explain why the uncertainty in each timing is much larger than this.', m: 1, lines: 2, ms: [['B1', 'The uncertainty is set by human reaction time in judging the start and end of the oscillations (about 0.1 s to 0.2 s), not by the resolution of the display']] },
        { q: 'Suggest one change to the method that would reduce the uncertainty in the timing.', m: 1, lines: 2, ms: [['B1', 'Any one from: time more oscillations; use a fiducial marker at the equilibrium position, where the mass moves fastest; use a light gate or motion sensor with a data logger']] }] },
      { stem: '<p>A digital voltmeter reads 0.04 V when nothing is connected to it.</p>', parts: [
        { q: 'State the name of this type of error.', m: 1, lines: 1, ms: [['B1', 'Zero error (a systematic error)']] },
        { q: 'The voltmeter reads 5.82 V across a resistor. Calculate the true p.d.', m: 1, ans: { a: 5.78, unit: 'V', tol: 0.002 }, calc: '5.82-0.04', ms: [['B1', '5.82 − 0.04 = 5.78 V']] }] }
    ]
  });

  /* ---------------- mu3 Combining uncertainties ---------------- */
  add('mu3', {
    ex: [
      ['Density of a block', 'A block has mass (85.4 ± 0.1) g and sides 4.00 cm, 3.00 cm and 2.50 cm, each measured to ±0.05 cm. Find its density with its uncertainty.', [
        ['Value', '', ['V = 4.00 × 3.00 × 2.50 = 30.0 cm³', 'ρ = 85.4 ÷ 30.0 = 2.847 g cm⁻³']],
        ['Percentage uncertainty in each quantity', '', ['mass: 0.1 ÷ 85.4 = 0.12 %', 'sides: 0.05 ÷ 4.00 = 1.25 %,  0.05 ÷ 3.00 = 1.67 %,  0.05 ÷ 2.50 = 2.00 %']],
        ['Add them', 'Everything is multiplied or divided, so the percentages add.', ['total = 0.12 + 1.25 + 1.67 + 2.00 = 5.0 %']],
        ['Back to an absolute uncertainty', 'Quote the uncertainty to one significant figure, and the value to the same decimal place.', ['Δρ = 0.050 × 2.847 = 0.14 g cm⁻³', res('ρ = (2.8 ± 0.1) g cm⁻³')]]
      ], { chk: [['85.4/30', 2.847], ['0.1/85.4*100', 0.117, 0.03], ['0.05/3*100', 1.667], ['(0.1/85.4+0.05/4+0.05/3+0.05/2.5)*100', 5.03, 0.01], ['(0.1/85.4+0.05/4+0.05/3+0.05/2.5)*85.4/30', 0.143, 0.03]] }],
      ['Trap: subtracting two readings', 'Water is heated from (18.5 ± 0.5) °C to (24.0 ± 0.5) °C. Find the temperature rise and its percentage uncertainty.', [
        ['Rise', '', ['Δθ = 24.0 − 18.5 = 5.5 °C']],
        ['Uncertainty', 'The trap: the uncertainties do not cancel when you subtract. Absolute uncertainties add for a sum and for a difference.', ['uncertainty = 0.5 + 0.5 = 1.0 °C']],
        ['Percentage', '', ['1.0 ÷ 5.5 × 100 = 18 %', res('Δθ = (5.5 ± 1.0) °C, an uncertainty of 18 %')]],
        ['What this tells you', 'Each thermometer reading was good to about 2 %, yet the difference is only good to 18 %.', ['Improve it by making the rise much larger, or by using a thermometer with a finer scale.']]
      ], { chk: [['24.0-18.5', 5.5], ['1.0/5.5*100', 18.2, 0.02]] }],
      ['Powers: the Young modulus of a wire', `A wire of length (2.000 ± 0.002) m and diameter (0.38 ± 0.01) mm stretches by (1.8 ± 0.1) mm under a load of (20.0 ± 0.1) N. Find the Young modulus E = ${fr('FL', 'Ax')} with its uncertainty.`, [
        ['Value', '', ['A = π × (0.19 × 10⁻³)² = 1.134 × 10⁻⁷ m²', `E = ${fr('20.0 × 2.000', '1.134 × 10⁻⁷ × 1.8 × 10⁻³')} = 1.96 × 10¹¹ Pa`]],
        ['Percentage uncertainties', 'A depends on d², so the percentage uncertainty in d is doubled.', ['F: 0.1 ÷ 20.0 = 0.5 %      L: 0.002 ÷ 2.000 = 0.1 %', 'd: 0.01 ÷ 0.38 = 2.6 %, so A: 5.3 %', 'x: 0.1 ÷ 1.8 = 5.6 %']],
        ['Total', '', ['0.5 + 0.1 + 5.3 + 5.6 = 11.4 %', 'ΔE = 0.114 × 1.96 × 10¹¹ = 0.22 × 10¹¹ Pa', res('E = (2.0 ± 0.2) × 10¹¹ Pa')]],
        ['Which measurement matters?', 'Compare the contributions.', ['The extension and the diameter give almost all the uncertainty. A longer wire (larger extension) and more diameter readings would help most; a better ruler for L would make no difference.']]
      ], { chk: [['pi*0.19e-3**2', 1.134e-7], ['20*2/(pi*0.19e-3**2*1.8e-3)', 1.96e11], ['2*0.01/0.38*100', 5.26], ['0.1/1.8*100', 5.56], ['(0.1/20+0.002/2+2*0.01/0.38+0.1/1.8)*100', 11.4], ['(0.1/20+0.002/2+2*0.01/0.38+0.1/1.8)*20*2/(pi*0.19e-3**2*1.8e-3)', 0.224e11, 0.02]] }]
    ],
    gaps: [
      { q: 'A resistor has p.d. (5.0 ± 0.1) V across it and current (0.25 ± 0.01) A in it. Find its resistance.', lines: ['% uncertainty in V = 0.1 ÷ 5.0 × 100 = [[2]] %', '% uncertainty in I = 0.01 ÷ 0.25 × 100 = [[4]] %', '% uncertainty in R = [[6]] %', 'R = 5.0 ÷ 0.25 = [[20]] Ω', 'ΔR = 6 % of 20 Ω = [[1.2]] Ω'], calc: ['0.1/5*100', '0.01/0.25*100', '0.1/5*100+0.01/0.25*100', '5/0.25', '0.06*20'], why: 'R = (20 ± 1) Ω.' },
      { q: 'A disc has diameter (8.0 ± 0.2) mm. Find its area.', lines: ['% uncertainty in d = 0.2 ÷ 8.0 × 100 = [[2.5]] %', '% uncertainty in A = 2 × 2.5 = [[5]] %', 'A = π × 4.0² = [[50.3]] mm²', 'ΔA = 5 % of 50.3 = [[2.5]] mm²'], calc: ['0.2/8*100', '2*0.2/8*100', 'pi*16', '0.05*pi*16'], why: 'A = (50 ± 3) mm². The diameter is squared, so its percentage uncertainty doubles.' },
      { q: 'A spring is (32.5 ± 0.1) cm long unloaded and (45.0 ± 0.1) cm long when loaded. Find the extension.', lines: ['extension = 45.0 − 32.5 = [[12.5]] cm', 'absolute uncertainty = 0.1 + 0.1 = [[0.2]] cm', 'percentage uncertainty = 0.2 ÷ 12.5 × 100 = [[1.6]] %'], calc: ['45-32.5', '0.2', '0.2/12.5*100'], why: 'For a difference, add the absolute uncertainties, never the percentages.' }
    ],
    exam: [
      { stem: `<p>A student finds the acceleration of free fall by timing a steel ball falling from rest through a height <i>h</i>, using g = ${fr('2h', 't²')}.</p><p>h = (1.250 ± 0.002) m and t = (0.505 ± 0.005) s.</p>`, parts: [
        { q: 'Calculate the value of g.', m: 2, ans: { a: 9.80, unit: 'm s⁻²', tol: 0.01 }, calc: '2*1.250/0.505**2', ms: [['C1', 'g = 2 × 1.250 ÷ 0.505²'], ['A1', 'g = 9.80 m s⁻²']] },
        { q: 'Calculate the percentage uncertainty in g.', m: 3, ans: { a: 2.14, unit: '%', tol: 0.05 }, calc: '(0.002/1.250+2*0.005/0.505)*100', ms: [['C1', '% uncertainty in h = 0.002 ÷ 1.250 × 100 = 0.16 %'], ['C1', '% uncertainty in t = 0.005 ÷ 0.505 × 100 = 0.99 %, doubled because t is squared'], ['A1', '0.16 + 2 × 0.99 = 2.1 %']] },
        { q: 'Write down g with its absolute uncertainty, to an appropriate number of significant figures.', m: 2, lines: 2, ms: [['C1', 'Δg = 0.021 × 9.80 = 0.21 m s⁻²'], ['A1', 'g = (9.8 ± 0.2) m s⁻²']] },
        { q: 'The accepted value is 9.81 m s⁻². Comment on the accuracy of the student’s result.', m: 1, lines: 2, ms: [['B1', 'The accepted value lies within the range 9.6 to 10.0 m s⁻², so the result is accurate within its uncertainty']] },
        { q: 'State which measurement contributes most to the uncertainty and suggest how it could be reduced.', m: 2, lines: 3, ms: [['B1', 'The time (2.0 % of the 2.1 %)'], ['B1', 'Use a larger height so that the time is longer, or time electronically with light gates or a trapdoor and electromagnet switch']] }] },
      { stem: `<p>The specific heat capacity of a metal block is found from c = ${fr('E', 'mΔθ')}. The energy supplied is 12 500 J with an uncertainty of 2 %. The mass of the block is (0.250 ± 0.001) kg. Its temperature rises from 21.0 °C to 33.5 °C; each temperature has an uncertainty of ±0.5 °C.</p>`, parts: [
        { q: 'Calculate the temperature rise and state its absolute uncertainty.', m: 2, ans: { a: 12.5, unit: '°C', tol: 0.005 }, calc: '33.5-21.0', ms: [['B1', 'Δθ = 12.5 °C'], ['B1', 'uncertainty = 0.5 + 0.5 = ±1.0 °C']] },
        { q: 'Calculate the percentage uncertainty in c.', m: 3, ans: { a: 10.4, unit: '%', tol: 0.03 }, calc: '2+0.001/0.250*100+1.0/12.5*100', ms: [['C1', 'mass: 0.001 ÷ 0.250 × 100 = 0.4 %'], ['C1', 'temperature rise: 1.0 ÷ 12.5 × 100 = 8.0 %'], ['A1', '2 + 0.4 + 8.0 = 10.4 %']] },
        { q: 'Calculate c and its absolute uncertainty.', m: 2, ans: { a: 4000, unit: 'J kg⁻¹ K⁻¹', tol: 0.02 }, calc: '12500/(0.250*12.5)', ms: [['C1', 'c = 12 500 ÷ (0.250 × 12.5) = 4000 J kg⁻¹ K⁻¹'], ['A1', '10.4 % of 4000 = 420, so c = (4.0 ± 0.4) × 10³ J kg⁻¹ K⁻¹']] }] }
    ]
  });

  /* ---------------- mu4 Graphs, gradients and uncertainties ---------------- */
  add('mu4', {
    ex: [
      ['Best and worst lines: g from a pendulum', 'A student times 10 oscillations of a pendulum (±0.2 s) for five lengths and plots T² against L.' + tbl(['L / m', '10T / s', 'T² / s²', 'uncertainty in T² / s²'], [['0.300', '11.0', '1.21', '0.04'], ['0.500', '14.3', '2.04', '0.06'], ['0.700', '16.7', '2.79', '0.07'], ['0.900', '19.1', '3.65', '0.08'], ['1.100', '21.0', '4.41', '0.08']]) + 'The best-fit line has gradient 4.00 s² m⁻¹. Find g and its uncertainty.', [
        ['Link the gradient to the theory', `T = 2π√(L/g), so T² = ${fr('4π²', 'g')} L: a straight line through the origin.`, [`gradient = ${fr('4π²', 'g')}`]],
        ['Find g', '', [`g = ${fr('4π²', '4.00')} = 9.86 m s⁻²`]],
        ['Draw the worst acceptable line', 'The shallowest line that still passes through all the error bars runs from the top of the first bar to the bottom of the last.', [`worst gradient = ${fr('(4.41 − 0.08) − (1.21 + 0.04)', '1.100 − 0.300')} = ${fr('3.08', '0.800')} = 3.85 s² m⁻¹`]],
        ['Percentage uncertainty in the gradient', '', [`${fr('4.00 − 3.85', '4.00')} × 100 = 3.9 %`]],
        ['Uncertainty in g', 'g depends on 1 ÷ gradient, so it has the same percentage uncertainty.', ['Δg = 0.039 × 9.86 = 0.4 m s⁻²', res('g = (9.9 ± 0.4) m s⁻²')]]
      ], { chk: [['1.1**2', 1.21], ['1.43**2', 2.04, 0.01], ['2.1**2', 4.41], ['2*0.2/21.0*4.41', 0.08, 0.06], ['4*pi**2/4.005', 9.86], ['((4.41-0.08)-(1.21+0.04))/0.8', 3.85], ['(4.005-3.85)/4.005*100', 3.9, 0.02], ['0.039*9.86', 0.38, 0.06]] }],
      ['Linearising an exponential: capacitor discharge', 'A capacitor discharges through a 22 kΩ resistor. The p.d. across it is recorded every 10 s.' + tbl(['t / s', 'V / V', 'ln (V / V)'], [['0', '9.00', '2.197'], ['10', '7.35', '1.995'], ['20', '6.10', '1.808'], ['30', '4.95', '1.599'], ['40', '4.10', '1.411'], ['50', '3.30', '1.194']]) + 'A graph of ln V against t has gradient −0.0199 s⁻¹ and intercept 2.199. Find the time constant, the capacitance and the initial p.d.', [
        ['Make the equation a straight line', 'Take natural logs of V = V₀e^(−t/RC).', [`ln V = ln V₀ − ${fr('t', 'RC')}`, 'Compare with y = c + mx:  gradient = −1 ÷ RC,  intercept = ln V₀']],
        ['Time constant', '', [`RC = ${fr('1', '0.0199')} = 50.2 s`]],
        ['Capacitance', '', [`C = ${fr('50.2', '22 × 10³')} = 2.3 × 10⁻³ F`, res('C = 2300 μF')]],
        ['Initial p.d.', 'Undo the logarithm.', ['V₀ = e^2.199', res('V₀ = 9.0 V')]],
        ['Why plot ln V?', '', ['A curve cannot easily be tested by eye. If ln V against t is a straight line, the decay is exponential, and the constant comes from the gradient using all the data.']]
      ], { chk: [['ln(9.00)', 2.197], ['ln(4.95)', 1.599], ['ln(3.30)', 1.194], ['1/0.0199', 50.2], ['1/0.0199/22e3', 2.28e-3], ['exp(2.199)', 9.02]] }],
      ['Finding a power: light from a lamp', 'The intensity I of light is measured at distances d from a small lamp. Theory suggests I = kdⁿ.' + tbl(['d / m', 'I / W m⁻²', 'lg (d / m)', 'lg (I / W m⁻²)'], [['0.20', '48.0', '−0.699', '1.681'], ['0.30', '21.8', '−0.523', '1.338'], ['0.40', '12.1', '−0.398', '1.083'], ['0.60', '5.2', '−0.222', '0.716'], ['0.80', '3.1', '−0.097', '0.491']]) + 'The graph of lg I against lg d is a straight line of gradient −2.00 and intercept 0.288. Find n and k.', [
        ['Take logs of both sides', 'lg (kdⁿ) = lg k + n lg d.', ['lg I = n lg d + lg k', 'gradient = n,  intercept = lg k']],
        ['The power', '', [res('n = −2.00: an inverse-square law')]],
        ['The constant', '', ['k = 10^0.288', res('k = 1.94 W (in SI units)')]],
        ['Check with a data point', 'A quick test catches slips with the logs.', [`at d = 0.40 m: I = ${fr('1.94', '0.40²')} = 12.1 W m⁻²  ✓`]]
      ], { chk: [['lg(0.20)', -0.699], ['lg(48.0)', 1.681], ['lg(3.1)', 0.491], ['10**0.288', 1.94], ['1.94/0.4**2', 12.1]] }]
    ],
    gaps: [
      { q: 'A best-fit line passes through (0.20, 1.5) and (0.80, 6.3). Find its gradient.', lines: ['Δy = 6.3 − 1.5 = [[4.8]]', 'Δx = 0.80 − 0.20 = [[0.6]]', 'gradient = Δy ÷ Δx = [[8]]'], calc: ['6.3-1.5', '0.8-0.2', '(6.3-1.5)/(0.8-0.2)'], why: 'Use two points on the line that are far apart, not two data points.' },
      { q: 'A graph of lg y against lg x is a straight line with gradient 1.5 and intercept 0.30. The relationship is y = axⁿ.', lines: ['lg y = [[n]] lg x + lg a', 'n = [[1.5]]', 'a = 10^0.30 = [[2]]'], calc: ['1.5', '10**0.30'], why: 'The gradient is the power; the intercept is lg a.' },
      { q: 'The best-fit gradient is 4.20 and the worst acceptable gradient is 4.41.', lines: ['difference = 4.41 − 4.20 = [[0.21]]', 'percentage uncertainty = 0.21 ÷ 4.20 × 100 = [[5]] %'], calc: ['4.41-4.20', '(4.41-4.20)/4.20*100'], why: 'Quote the gradient as 4.2 ± 0.2.' }
    ],
    exam: [
      { stem: '<p>A student loads a spring and measures its extension <i>x</i> for each force <i>F</i>. A graph of F (y-axis) against x (x-axis) is plotted with error bars for x.</p>' + tbl(['F / N', '1.0', '2.0', '3.0', '4.0', '5.0'], [['x / m', '0.020', '0.041', '0.059', '0.082', '0.100']]), parts: [
        { q: 'The best-fit line passes through (0.010, 0.50) and (0.090, 4.47). Determine the force constant k of the spring.', m: 2, ans: { a: 49.6, unit: 'N m⁻¹', tol: 0.02 }, calc: '(4.47-0.50)/(0.090-0.010)', ms: [['C1', 'gradient = (4.47 − 0.50) ÷ (0.090 − 0.010)'], ['A1', 'k = 49.6 N m⁻¹ (accept 50 N m⁻¹)']] },
        { q: 'The worst acceptable line has gradient 52.5 N m⁻¹. Calculate the percentage uncertainty in k.', m: 2, ans: { a: 5.79, unit: '%', tol: 0.05 }, calc: '(52.5-49.625)/49.625*100', ms: [['C1', 'difference in gradients = 52.5 − 49.6 = 2.9 N m⁻¹'], ['A1', '2.9 ÷ 49.6 × 100 = 5.8 %']] },
        { q: 'Write down k with its absolute uncertainty.', m: 1, lines: 1, ms: [['B1', 'k = (50 ± 3) N m⁻¹']] },
        { q: 'Explain why a large triangle should be used to find the gradient.', m: 1, lines: 2, ms: [['B1', 'The uncertainty in reading each coordinate is fixed, so larger values of Δy and Δx have smaller percentage uncertainties']] },
        { q: 'The best-fit line does not pass exactly through the origin. Suggest one possible reason.', m: 1, lines: 2, ms: [['B1', 'A systematic error in the extension, for example the unloaded length was misread or the ruler zero was not level with the end of the spring']] }] },
      { stem: '<p>The activity A of a radioactive source falls with time t according to A = A₀e<sup>−λt</sup>.</p>', parts: [
        { q: 'State the graph that should be plotted to obtain a straight line, and state what the gradient and the intercept represent.', m: 3, lines: 4, ms: [['B1', 'ln A (y-axis) against t (x-axis)'], ['B1', 'gradient = −λ'], ['B1', 'intercept = ln A₀']] },
        { q: 'The gradient of the line is −0.0231 min⁻¹. Calculate the half-life of the source.', m: 2, ans: { a: 30.0, unit: 'min', tol: 0.02 }, calc: 'ln(2)/0.0231', ms: [['C1', 't½ = ln 2 ÷ λ = 0.693 ÷ 0.0231'], ['A1', 't½ = 30 minutes']] },
        { q: 'The intercept on the y-axis is 6.40, with A in Bq. Calculate the initial activity.', m: 1, ans: { a: 602, unit: 'Bq', tol: 0.02 }, calc: 'exp(6.40)', ms: [['B1', 'A₀ = e^6.40 = 600 Bq']] }] },
      { stem: '<p>The period T of a loaded cantilever is thought to depend on the load m as T = kmⁿ. A graph of lg (T / s) against lg (m / kg) is a straight line of gradient 0.49 and intercept −0.35.</p>', parts: [
        { q: 'State the value of n and suggest the relationship between T and m.', m: 2, lines: 2, ms: [['B1', 'n = 0.49 (the gradient)'], ['B1', 'n is close to ½, so T is proportional to √m']] },
        { q: 'Calculate k, in SI units.', m: 1, ans: { a: 0.447, unit: '', tol: 0.02 }, calc: '10**-0.35', ms: [['B1', 'k = 10^−0.35 = 0.45']] },
        { q: 'Describe how the error bars are used to draw a worst acceptable line and to estimate the uncertainty in the gradient.', m: 2, lines: 4, ms: [['B1', 'Draw the steepest (or shallowest) straight line that still passes through all the error bars'], ['B1', 'uncertainty in gradient = |gradient of best line − gradient of worst line|']] }] }
    ]
  });

  /* ---------------- mu5 Planning, recording and evaluating ---------------- */
  add('mu5', {
    ex: [
      ['From table to result: resistivity', 'The resistance R of a constantan wire is measured for five lengths l.' + tbl(['l / m', '0.200', '0.400', '0.600', '0.800', '1.000'], [['R / Ω', '1.75', '3.42', '5.20', '6.85', '8.60']]) + 'The best-fit line of R against l has gradient 8.57 Ω m⁻¹, with an uncertainty of 0.6 %. Five micrometer readings of the diameter are 0.27, 0.28, 0.27, 0.26 and 0.27 mm. Find the resistivity with its uncertainty.', [
        ['Theory', `R = ${fr('ρl', 'A')}, so the gradient of R against l is ρ ÷ A.`, ['ρ = gradient × A']],
        ['Diameter and area', '', ['mean d = 0.27 mm, half-range = (0.28 − 0.26) ÷ 2 = 0.01 mm', 'A = π × (0.135 × 10⁻³)² = 5.73 × 10⁻⁸ m²']],
        ['Resistivity', '', ['ρ = 8.57 × 5.73 × 10⁻⁸ = 4.91 × 10⁻⁷ Ω m']],
        ['Uncertainty', 'd is squared in the area.', ['d: 0.01 ÷ 0.27 = 3.7 %, so A: 7.4 %', 'total = 7.4 + 0.6 = 8.0 %', 'Δρ = 0.080 × 4.91 × 10⁻⁷ = 0.4 × 10⁻⁷ Ω m', res('ρ = (4.9 ± 0.4) × 10⁻⁷ Ω m')]],
        ['Evaluate', 'Say which measurement limits the result and what you would change.', ['Almost all the uncertainty comes from the diameter. A thicker wire, or more diameter readings along the wire, would improve the result far more than a better ohmmeter.']]
      ], { chk: [['mean(0.27,0.28,0.27,0.26,0.27)', 0.27], ['pi*0.135e-3**2', 5.73e-8], ['8.57*pi*0.135e-3**2', 4.91e-7], ['2*0.01/0.27*100', 7.41], ['0.080*4.91e-7', 0.39e-7, 0.03]] }],
      ['Writing a plan that scores full marks', 'Plan an experiment to investigate how the period T of a mass oscillating on a spring depends on the mass m, and to find the spring constant k. Theory: T = 2π√(m/k).', [
        ['Variables', 'Name what you change, what you measure and what you keep the same.', ['Independent: mass m (at least six values, for example 100 g to 600 g). Dependent: period T. Control: the same spring, small amplitude each time.']],
        ['Measurements', 'Say which instrument and how you make each reading good.', ['Measure m on a balance. Time 10 oscillations with a stopwatch, starting and stopping as the mass passes a fiducial marker at the equilibrium position. Repeat each timing three times and average.']],
        ['Reducing uncertainty', 'This is where marks are usually lost.', ['Timing many oscillations reduces the percentage uncertainty from reaction time. The equilibrium position is where the mass moves fastest, so the moment it passes is clearest.']],
        ['Analysis', 'Make a straight-line graph from the theory.', [`T² = ${fr('4π²', 'k')} m, so plot T² against m: a straight line through the origin`, `gradient = ${fr('4π²', 'k')}, so k = ${fr('4π²', 'gradient')}`]],
        ['Safety', 'One specific, sensible precaution.', ['Clamp the stand to the bench and keep feet clear in case the masses fall; wear eye protection in case the spring breaks.']]
      ], { desc: true }],
      ['Is the result consistent with the accepted value?', 'Two students measure g. Asha obtains (9.6 ± 0.3) m s⁻² and Ben obtains (10.2 ± 0.2) m s⁻². The accepted value is 9.81 m s⁻². Compare the two results.', [
        ['Percentage difference from the accepted value', '', ['Asha: (9.81 − 9.6) ÷ 9.81 × 100 = 2.1 %', 'Ben: (10.2 − 9.81) ÷ 9.81 × 100 = 4.0 %']],
        ['Compare with each uncertainty', 'A result agrees with the accepted value if that value lies inside its range.', ['Asha: 9.3 to 9.9 m s⁻², which includes 9.81: consistent', 'Ben: 10.0 to 10.4 m s⁻², which does not include 9.81']],
        ['Conclusion', 'The trap is to call Ben’s result better because its uncertainty is smaller.', ['Ben’s readings are more precise, but his result is less accurate: there is probably a systematic error in his method. Asha’s is accurate within its (larger) uncertainty.']]
      ], { chk: [['(9.81-9.6)/9.81*100', 2.14, 0.03], ['(10.2-9.81)/9.81*100', 3.98, 0.01]] }]
    ],
    gaps: [
      { q: 'A student measures the density of glass as 2.45 × 10³ kg m⁻³. The accepted value is 2.50 × 10³ kg m⁻³.', lines: ['difference = [[50]] kg m⁻³', 'percentage difference = 50 ÷ 2500 × 100 = [[2]] %'], calc: ['2.50e3-2.45e3', '(2.50e3-2.45e3)/2.50e3*100'], why: 'Divide by the accepted value, not the measured one.' },
      { q: 'Three readings of a current are 0.38 A, 0.42 A and 0.40 A.', lines: ['mean = [[0.40]] A', 'half-range = (0.42 − 0.38) ÷ 2 = [[0.02]] A', 'percentage uncertainty = 0.02 ÷ 0.40 × 100 = [[5]] %'], calc: ['mean(0.38,0.42,0.40)', '(0.42-0.38)/2', '0.02/0.40*100'], why: 'Record the mean to the same number of decimal places as the readings.' },
      { q: 'A wire of length 0.400 m and cross-sectional area 5.73 × 10⁻⁸ m² has resistance 3.42 Ω.', lines: ['R ÷ l = 3.42 ÷ 0.400 = [[8.55]] Ω m⁻¹', 'ρ = (R ÷ l) × A = [[4.90e-7]] Ω m'], calc: ['3.42/0.400', '3.42/0.400*5.73e-8'], why: 'One reading gives a similar value to the gradient method, but the graph uses all the data and exposes any zero error.' }
    ],
    exam: [
      { stem: '<p>A student investigates how the resistance of a thermistor depends on its temperature. The thermistor is placed in a beaker of water that is heated from 20 °C to 80 °C.</p>', parts: [
        { q: 'State the independent variable, the dependent variable and one variable that should be controlled.', m: 3, lines: 3, ms: [['B1', 'Independent: temperature (of the water or thermistor)'], ['B1', 'Dependent: resistance of the thermistor'], ['B1', 'Control: any one from the same thermistor, the same depth of immersion, the same meter and range, a small current so the thermistor is not heated by it']] },
        { q: 'Describe two things the student should do to make sure each recorded temperature is the temperature of the thermistor.', m: 2, lines: 3, ms: [['B1', 'Stir the water (so its temperature is uniform) and place the thermometer bulb close to the thermistor'], ['B1', 'Remove the heat and wait for the readings to become steady (thermal equilibrium) before recording']] },
        { q: 'State two conventions the student should follow when drawing the results table.', m: 2, lines: 3, ms: [['B1', 'Each column heading has the quantity and its unit, for example θ / °C and R / Ω'], ['B1', 'All readings in a column are recorded to the same number of decimal places, matching the resolution of the instrument']] }] },
      { stem: '<p>A student finds the speed of sound in air. A sharp clap is detected by two microphones placed (1.20 ± 0.01) m apart, in line with the source. A timer records the time between the two signals. Three values are obtained: 3.4 ms, 3.6 ms and 3.5 ms.</p>', parts: [
        { q: 'Calculate the mean time and state its absolute uncertainty.', m: 2, ans: { a: 3.5, unit: 'ms', tol: 0.01 }, calc: 'mean(3.4,3.6,3.5)', ms: [['B1', 'mean = 3.5 ms'], ['B1', 'uncertainty = (3.6 − 3.4) ÷ 2 = ±0.1 ms']] },
        { q: 'Calculate the speed of sound.', m: 1, ans: { a: 343, unit: 'm s⁻¹', tol: 0.01 }, calc: '1.20/3.5e-3', ms: [['B1', 'v = 1.20 ÷ 3.5 × 10⁻³ = 343 m s⁻¹']] },
        { q: 'Calculate the percentage uncertainty in the speed.', m: 2, ans: { a: 3.69, unit: '%', tol: 0.04 }, calc: '(0.01/1.20+0.1/3.5)*100', ms: [['C1', 'distance: 0.01 ÷ 1.20 × 100 = 0.83 %; time: 0.1 ÷ 3.5 × 100 = 2.86 %'], ['A1', 'total = 3.7 %']] },
        { q: 'Determine whether the result is consistent with the accepted value of 340 m s⁻¹.', m: 2, lines: 3, ms: [['C1', 'absolute uncertainty = 0.037 × 343 = 13 m s⁻¹, so the range is 330 to 356 m s⁻¹'], ['A1', '340 m s⁻¹ lies inside this range, so the result is consistent with the accepted value']] },
        { q: 'Suggest and explain one improvement that would reduce the percentage uncertainty in the speed.', m: 2, lines: 3, ms: [['B1', 'Increase the distance between the microphones'], ['B1', 'The time is then longer, so the same absolute uncertainty of 0.1 ms is a smaller percentage of it (the time is the larger source of uncertainty)']] }] }
    ]
  });
})();
