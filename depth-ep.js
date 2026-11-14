/* Energy, materials and momentum (ep1–ep12): extra worked examples, fill-the-gaps and exam-style questions.
   g = 9.81 N kg⁻¹. Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const tbl = (head, rows) => `<div class="tbl-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const mp = t => `<b>${t}</b>`;

  /* ---------------- ep1 Work done and conservation of energy ---------------- */
  add('ep1', {
    ex: [
      ['Where the work goes on a ramp', 'A 40 kg crate is pushed 5.0 m up a ramp that rises 1.2 m, using a force of 150 N parallel to the ramp, at constant speed. Find the work done by the push, the gain in gravitational potential energy and the friction force.', [
        ['Work done by the push', 'The force is along the displacement.', ['W = 150 × 5.0 = 750 J']],
        ['Gain in GPE', 'Only the vertical rise counts.', ['ΔE = mgh = 40 × 9.81 × 1.2 = 471 J']],
        ['Friction', 'Constant speed: no change in kinetic energy, so the rest of the work is done against friction.', ['work against friction = 750 − 471 = 279 J', res('friction = 279 ÷ 5.0 = 56 N')]]
      ], { chk: [['150*5', 750], ['40*g*1.2', 470.9], ['750-40*g*1.2', 279.1], ['(750-40*g*1.2)/5', 55.8]] }],
      ['Trap: a force that does no work', 'A waiter carries a 2.0 kg tray 10 m across a room at constant height and speed. How much work does the waiter’s upward force do on the tray?', [
        ['The force and the motion', 'The upward force (19.6 N) balances the weight; the tray moves horizontally.', ['angle between force and displacement = 90°']],
        ['Apply W = Fx cos θ', 'The trap: multiplying 19.6 N by 10 m.', ['W = 19.6 × 10 × cos 90°', res('W = 0')]],
        ['Check with energy', '', ['The tray’s kinetic and potential energies do not change, so no work is done on it.']]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A 50 N force acts at 30° to the direction of motion over 8.0 m.', lines: ['W = 50 × 8.0 × cos 30° = [[346]] J'], calc: ['50*8*cosd(30)'], why: 'Only the component along the motion does work.' },
      { q: 'A 12 kg suitcase is lifted 1.5 m at constant speed.', lines: ['work done = mgh = [[176.6]] J'], calc: ['12*g*1.5'], why: 'All of it becomes gravitational potential energy.' },
      { q: 'A sledge is pulled 15 m against a friction force of 20 N.', lines: ['work done against friction = [[300]] J'], calc: ['20*15'], why: 'This energy is dissipated as heating of the runners and snow.' }
    ],
    exam: [
      { stem: '<p>A cyclist and bicycle, of total mass 60 kg, freewheel from rest down a hill that is 8.0 m high and 120 m long. At the bottom the speed is 9.0 m s⁻¹.</p>', parts: [
        { q: 'Calculate the loss in gravitational potential energy.', m: 1, ans: { a: 4709, unit: 'J', tol: 0.02 }, calc: '60*g*8', ms: [['B1', '60 × 9.81 × 8.0 = 4.7 × 10³ J']] },
        { q: 'Calculate the kinetic energy at the bottom of the hill.', m: 1, ans: { a: 2430, unit: 'J', tol: 0.01 }, calc: '0.5*60*81', ms: [['B1', '½ × 60 × 9.0² = 2.4 × 10³ J']] },
        { q: 'Calculate the average resistive force on the cyclist.', m: 2, ans: { a: 19.0, unit: 'N', tol: 0.03 }, calc: '(60*g*8-0.5*60*81)/120', ms: [['C1', 'work against resistance = 4709 − 2430 = 2279 J'], ['A1', 'F = 2279 ÷ 120 = 19 N']] },
        { q: 'State the principle of conservation of energy.', m: 1, lines: 2, ms: [['B1', 'Energy cannot be created or destroyed, only transferred from one store to another; the total energy of a closed system is constant']] }] },
      { stem: '<p>A 5.0 kg box, initially at rest, is pushed 6.0 m along a horizontal floor by a force of 30 N directed at 20° below the horizontal. The friction force is 22 N.</p>', parts: [
        { q: 'Calculate the work done by the push.', m: 2, ans: { a: 169.1, unit: 'J', tol: 0.02 }, calc: '30*cosd(20)*6', ms: [['C1', 'horizontal component = 30 cos 20° = 28.2 N'], ['A1', 'W = 28.2 × 6.0 = 169 J']] },
        { q: 'Calculate the work done against friction.', m: 1, ans: { a: 132, unit: 'J', tol: 0.01 }, calc: '22*6', ms: [['B1', '22 × 6.0 = 132 J']] },
        { q: 'Calculate the speed of the box after 6.0 m.', m: 2, ans: { a: 3.85, unit: 'm s⁻¹', tol: 0.03 }, calc: 'sqrt(2*(30*cosd(20)*6-132)/5)', ms: [['C1', 'gain in kinetic energy = 169 − 132 = 37 J'], ['A1', 'v = √(2 × 37 ÷ 5.0) = 3.9 m s⁻¹']] }] }
    ]
  });

  /* ---------------- ep2 Kinetic and gravitational potential energy ---------------- */
  add('ep2', {
    ex: [
      ['A roller-coaster: mass cancels', 'A roller-coaster car passes over a hill 30 m high at 4.0 m s⁻¹. Ignoring friction, find its speed when it is 12 m above the ground.', [
        ['Energy conservation', 'Loss of GPE = gain of KE. The mass cancels.', ['½mv² = ½mu² + mg(30 − 12)']],
        ['Solve', '', ['v² = 4.0² + 2 × 9.81 × 18 = 369', res('v = 19 m s⁻¹, whatever the mass of the car')]]
      ], { chk: [['16+2*g*18', 369.2], ['sqrt(16+2*g*18)', 19.2]] }],
      ['Trap: kinetic energy goes as v²', 'Compare the kinetic energy of a 1200 kg car at 15 m s⁻¹ and at 30 m s⁻¹.', [
        ['Calculate both', '', ['15 m s⁻¹: ½ × 1200 × 15² = 1.35 × 10⁵ J', '30 m s⁻¹: ½ × 1200 × 30² = 5.40 × 10⁵ J']],
        ['Compare', 'The trap: expecting double.', [res('doubling the speed gives four times the kinetic energy'), 'So the brakes must do four times as much work, and the braking distance is four times as long.']]
      ], { chk: [['0.5*1200*225', 1.35e5], ['0.5*1200*900', 5.4e5]] }]
    ],
    gaps: [
      { q: 'A 0.50 kg ball moves at 6.0 m s⁻¹.', lines: ['kinetic energy = [[9]] J'], calc: ['0.5*0.5*36'], why: 'E = ½mv².' },
      { q: 'An object falls from rest through 3.2 m. Ignore air resistance.', lines: ['v = √(2gh) = [[7.92]] m s⁻¹'], calc: ['sqrt(2*g*3.2)'], why: 'From mgh = ½mv².' },
      { q: 'A ball is thrown straight up at 12 m s⁻¹.', lines: ['maximum height = v² ÷ 2g = [[7.34]] m'], calc: ['144/(2*g)'], why: 'All the kinetic energy becomes gravitational potential energy.' }
    ],
    exam: [
      { stem: '<p>A pole vaulter of mass 70 kg sprints at 9.0 m s⁻¹ before planting the pole.</p>', parts: [
        { q: 'Calculate the kinetic energy of the vaulter.', m: 1, ans: { a: 2835, unit: 'J', tol: 0.01 }, calc: '0.5*70*81', ms: [['B1', '½ × 70 × 9.0² = 2.8 × 10³ J']] },
        { q: 'Calculate the maximum height the vaulter’s centre of mass could rise if all this energy became gravitational potential energy.', m: 2, ans: { a: 4.13, unit: 'm', tol: 0.02 }, calc: '81/(2*g)', ms: [['C1', 'mgh = ½mv², so h = v² ÷ 2g'], ['A1', 'h = 4.1 m']] },
        { q: 'Vaulters clear bars higher than this. Suggest two reasons.', m: 2, lines: 3, ms: [['B1', 'The centre of mass starts about 1 m above the ground'], ['B1', 'The vaulter does extra work by pushing up on the pole with the arms (and passes over the bar with the centre of mass close to or below it)']] }] },
      { stem: '<p>A 0.15 kg ball is thrown vertically downwards at 5.0 m s⁻¹ from a height of 20 m. It reaches the ground at 19.5 m s⁻¹.</p>', parts: [
        { q: 'Calculate the initial kinetic energy of the ball.', m: 1, ans: { a: 1.875, unit: 'J', tol: 0.01 }, calc: '0.5*0.15*25', ms: [['B1', '½ × 0.15 × 5.0² = 1.9 J']] },
        { q: 'Calculate the energy transferred to the air by the time the ball lands.', m: 2, ans: { a: 2.79, unit: 'J', tol: 0.05 }, calc: '0.5*0.15*25+0.15*g*20-0.5*0.15*19.5**2', ms: [['C1', 'initial total = 1.9 + 0.15 × 9.81 × 20 = 31.3 J; final KE = ½ × 0.15 × 19.5² = 28.5 J'], ['A1', 'energy transferred = 2.8 J']] },
        { q: 'Calculate the average resistive force on the ball.', m: 1, ans: { a: 0.139, unit: 'N', tol: 0.05 }, calc: '(0.5*0.15*25+0.15*g*20-0.5*0.15*19.5**2)/20', ms: [['B1', '2.8 ÷ 20 = 0.14 N']] }] }
    ]
  });

  /* ---------------- ep3 Power and efficiency ---------------- */
  add('ep3', {
    ex: [
      ['Power at a steady speed', 'A car travels at a steady 30 m s⁻¹ against resistive forces of 750 N. Its engine is 25 % efficient. Find the useful power and the rate of energy input from the fuel.', [
        ['Steady speed', 'Driving force = resistance.', ['F = 750 N']],
        ['Useful power', 'P = Fv.', ['P = 750 × 30 = 2.25 × 10⁴ W']],
        ['Input power', '', [`P_in = ${fr('22.5 kW', '0.25')}`, res('P_in = 90 kW')]]
      ], { chk: [['750*30', 22500], ['22500/0.25', 90000]] }],
      ['Trap: kW and kW h', 'A 3.0 kW kettle runs for 4.0 minutes. Find the energy transferred in joules and in kilowatt-hours, and the cost at 28p per kW h.', [
        ['In joules', 'Use seconds.', ['E = 3000 × 240 = 7.2 × 10⁵ J']],
        ['In kilowatt-hours', 'The trap: multiplying kW by minutes. Use hours.', ['E = 3.0 kW × (4.0 ÷ 60) h = 0.20 kW h']],
        ['Cost', '', [res('0.20 × 28p = 5.6p')]]
      ], { chk: [['3000*240', 7.2e5], ['3*4/60', 0.2], ['0.2*28', 5.6]] }]
    ],
    gaps: [
      { q: 'A motor does 1800 J of work in 12 s.', lines: ['power = [[150]] W'], calc: ['1800/12'], why: 'Power is the rate of doing work.' },
      { q: 'A van moves at a steady 12 m s⁻¹ against 400 N of resistance.', lines: ['power = Fv = [[4800]] W'], calc: ['400*12'], why: 'At steady speed the driving force equals the resistance.' },
      { q: 'A motor takes in 2400 J of electrical energy and lifts a load, gaining 600 J of GPE.', lines: ['efficiency = [[25]] %'], calc: ['600/2400*100'], why: 'useful output ÷ total input.' }
    ],
    exam: [
      { stem: '<p>An electric motor lifts a 15 kg load through 2.4 m at constant speed in 3.0 s. The motor takes a current of 6.5 A from a 24 V supply.</p>', parts: [
        { q: 'Calculate the useful output power of the motor.', m: 2, ans: { a: 117.7, unit: 'W', tol: 0.02 }, calc: '15*g*2.4/3', ms: [['C1', 'work done = 15 × 9.81 × 2.4 = 353 J'], ['A1', 'P = 353 ÷ 3.0 = 118 W']] },
        { q: 'Calculate the efficiency of the motor.', m: 2, ans: { a: 75.5, unit: '%', tol: 0.02 }, calc: '15*g*2.4/3/(24*6.5)*100', ms: [['C1', 'input power = 24 × 6.5 = 156 W'], ['A1', 'efficiency = 118 ÷ 156 = 75 %']] }] },
      { stem: '<p>A cyclist can produce a maximum useful power of 400 W. The total resistive force is modelled as F = 0.20v² + 10, with F in N and v in m s⁻¹.</p>', parts: [
        { q: 'Explain why the cyclist reaches a maximum speed.', m: 1, lines: 2, ms: [['B1', 'As speed rises the resistance rises, so the power needed (Fv) rises; at maximum speed all 400 W is used against resistance and the resultant force is zero']] },
        { q: 'Show that the power needed to ride at 11.3 m s⁻¹ is about 400 W.', m: 2, ans: { a: 401.6, unit: 'W', tol: 0.02 }, calc: '11.3*(0.2*11.3**2+10)', ms: [['C1', 'F = 0.20 × 11.3² + 10 = 35.5 N'], ['A1', 'P = 35.5 × 11.3 = 402 W']] },
        { q: 'Explain why doubling the power would not double the maximum speed.', m: 1, lines: 2, ms: [['B1', 'The power needed rises roughly as v³ (Fv with F ∝ v²), so doubling the power raises the speed by only about 2^⅓ ≈ 1.26 times']] }] }
    ]
  });

  /* ---------------- ep4 Springs and Hooke's law ---------------- */
  add('ep4', {
    ex: [
      ['Springs in series and in parallel', 'Two identical springs each have k = 40 N m⁻¹. Find the combined force constant when they are joined (a) in series, (b) in parallel, and the extension of each arrangement under a 6.0 N load.', [
        ['Series', 'Each spring carries the full load, so the extensions add.', [`k = ${fr('1', '1/40 + 1/40')} = 20 N m⁻¹`, 'extension = 6.0 ÷ 20 = 0.30 m']],
        ['Parallel', 'The load is shared, so the springs act like one stiffer spring.', ['k = 40 + 40 = 80 N m⁻¹', 'extension = 6.0 ÷ 80 = 0.075 m']],
        ['Compare', '', [res('series: 0.30 m;  parallel: 0.075 m (four times smaller)')]]
      ], { chk: [['1/(1/40+1/40)', 20], ['6/20', 0.3], ['6/80', 0.075]] }],
      ['Finding k from data', 'A spring is loaded in 1.0 N steps.' + tbl(['F / N', '0', '1.0', '2.0', '3.0', '4.0', '5.0'], [['x / cm', '0', '2.1', '4.0', '6.1', '8.0', '10.6']]) + 'Find the force constant and identify where Hooke’s law stops applying.', [
        ['Look at the steps', 'Equal force steps should give equal extension steps.', ['steps: 2.1, 1.9, 2.1, 1.9, then 2.6 cm']],
        ['Limit of proportionality', '', ['Between 4.0 N and 5.0 N the extension jumps: beyond about 4.0 N the spring no longer obeys Hooke’s law.']],
        ['Force constant from the straight part', 'Use the gradient of F against x up to 4.0 N.', [`k = ${fr('4.0', '0.080')}`, res('k = 50 N m⁻¹')]]
      ], { chk: [['4/0.08', 50]] }]
    ],
    gaps: [
      { q: 'A spring extends 4.0 cm under 6.0 N.', lines: ['k = 6.0 ÷ 0.040 = [[150]] N m⁻¹'], calc: ['6/0.04'], why: 'Convert cm to m first.' },
      { q: 'A spring with k = 50 N m⁻¹ carries 2.5 N.', lines: ['extension = [[0.05]] m'], calc: ['2.5/50'], why: 'x = F ÷ k.' },
      { q: 'Two springs of k = 50 N m⁻¹ share a load side by side.', lines: ['combined k = [[100]] N m⁻¹'], calc: ['100'], why: 'In parallel the force constants add.' }
    ],
    exam: [
      { stem: '<p>A student loads a spring and records its extension.</p>' + tbl(['F / N', '0', '1.0', '2.0', '3.0', '4.0', '5.0', '6.0'], [['x / mm', '0', '12', '24', '36', '48', '64', '85']]), parts: [
        { q: 'State the load beyond which the spring no longer obeys Hooke’s law.', m: 1, lines: 1, ms: [['B1', '4.0 N (extension no longer increases by 12 mm per newton)']] },
        { q: 'Determine the force constant of the spring.', m: 2, ans: { a: 83.3, unit: 'N m⁻¹', tol: 0.02 }, calc: '4/0.048', ms: [['C1', 'k = F ÷ x using the linear region, e.g. 4.0 ÷ 0.048'], ['A1', 'k = 83 N m⁻¹']] },
        { q: 'Calculate the elastic potential energy stored at a load of 3.0 N.', m: 2, ans: { a: 0.054, unit: 'J', tol: 0.02 }, calc: '0.5*3*0.036', ms: [['C1', 'E = ½Fx = ½ × 3.0 × 0.036'], ['A1', 'E = 0.054 J']] }] },
      { stem: '<p>A car of mass 1000 kg rests on four identical suspension springs, each of force constant 2.5 × 10⁴ N m⁻¹. The springs share the weight equally.</p>', parts: [
        { q: 'Calculate the combined force constant of the four springs.', m: 1, ans: { a: 1.0e5, unit: 'N m⁻¹', tol: 0.01 }, calc: '4*2.5e4', ms: [['B1', '4 × 2.5 × 10⁴ = 1.0 × 10⁵ N m⁻¹ (parallel)']] },
        { q: 'Calculate the compression of the springs.', m: 1, ans: { a: 0.0981, unit: 'm', tol: 0.02 }, calc: '1000*g/1e5', ms: [['B1', 'x = 9810 ÷ 1.0 × 10⁵ = 0.098 m']] },
        { q: 'Four passengers of total mass 300 kg get in. Calculate the extra compression.', m: 2, ans: { a: 0.0294, unit: 'm', tol: 0.02 }, calc: '300*g/1e5', ms: [['C1', 'extra force = 300 × 9.81 = 2943 N'], ['A1', 'extra compression = 2943 ÷ 1.0 × 10⁵ = 0.029 m']] }] }
    ]
  });

  /* ---------------- ep5 Force–extension graphs and elastic potential energy ---------------- */
  add('ep5', {
    ex: [
      ['Energy from a curved graph', 'A strip of rubber is stretched and the force measured.' + tbl(['x / m', '0', '0.020', '0.040', '0.060', '0.080'], [['F / N', '0', '4.0', '7.0', '9.0', '10.0']]) + 'Estimate the energy stored at an extension of 0.080 m.', [
        ['The graph is not straight', 'So E = ½Fx does not apply.', ['energy stored = area under the F–x curve']],
        ['Trapezium rule', 'Strips of width 0.020 m.', ['area = 0.020 × (0/2 + 4.0 + 7.0 + 9.0 + 10.0/2)', res('E ≈ 0.50 J')]],
        ['Compare', 'The curve bows upwards, above the straight line from the origin.', ['½Fx would give ½ × 10.0 × 0.080 = 0.40 J: an underestimate']]
      ], { chk: [['0.02*(4+7+9+5)', 0.5], ['0.5*10*0.08', 0.4]] }],
      ['Trap: ½kx², not kx²', 'A spring with k = 200 N m⁻¹ is stretched by 0.050 m. Find the energy stored.', [
        ['The tempting answer', 'Force × extension uses the final force for the whole stretch.', ['F = 200 × 0.050 = 10 N;  10 × 0.050 = 0.50 J  ✗']],
        ['Why it is half', 'The force rises from 0 to 10 N, so the average force is 5.0 N.', [`E = ½kx² = ½ × 200 × 0.050²`, res('E = 0.25 J')]]
      ], { chk: [['200*0.05', 10], ['0.5*200*0.05**2', 0.25]] }]
    ],
    gaps: [
      { q: 'A spring obeys Hooke’s law and extends 0.060 m under 12 N.', lines: ['energy stored = ½Fx = [[0.36]] J'], calc: ['0.5*12*0.06'], why: 'The area of the triangle under the line.' },
      { q: 'A spring with k = 400 N m⁻¹ is compressed by 0.030 m.', lines: ['energy stored = ½kx² = [[0.18]] J'], calc: ['0.5*400*0.03**2'], why: 'The same formula works for compression.' },
      { q: 'All 0.36 J from a catapult goes into a 0.020 kg stone.', lines: ['speed = √(2E ÷ m) = [[6]] m s⁻¹'], calc: ['sqrt(2*0.36/0.02)'], why: 'Elastic potential energy becomes kinetic energy.' }
    ],
    exam: [
      { stem: '<p>The elastic of a catapult obeys Hooke’s law with force constant 180 N m⁻¹. It is pulled back 0.15 m and fires a 25 g stone vertically upwards.</p>', parts: [
        { q: 'Calculate the energy stored in the elastic.', m: 2, ans: { a: 2.025, unit: 'J', tol: 0.02 }, calc: '0.5*180*0.15**2', ms: [['C1', 'E = ½kx² = ½ × 180 × 0.15²'], ['A1', 'E = 2.0 J']] },
        { q: '70 % of this energy becomes kinetic energy of the stone. Calculate its launch speed.', m: 2, ans: { a: 10.65, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(2*0.7*0.5*180*0.15**2/0.025)', ms: [['C1', 'KE = 0.70 × 2.03 = 1.42 J'], ['A1', 'v = √(2 × 1.42 ÷ 0.025) = 11 m s⁻¹']] },
        { q: 'Suggest where the other 30 % of the energy goes.', m: 1, lines: 2, ms: [['B1', 'Kinetic energy of the elastic and pouch, and heating of the elastic (it does not return all the energy: hysteresis)']] }] },
      { stem: '<p>A rubber band is stretched and then allowed to contract. The area under the loading curve is 1.8 J and the area under the unloading curve is 1.2 J.</p>', parts: [
        { q: 'State what the area between the two curves represents.', m: 1, lines: 2, ms: [['B1', 'Energy dissipated (as thermal energy in the rubber) in one cycle']] },
        { q: 'Calculate the percentage of the work done in stretching that is dissipated.', m: 2, ans: { a: 33.3, unit: '%', tol: 0.02 }, calc: '(1.8-1.2)/1.8*100', ms: [['C1', 'dissipated = 1.8 − 1.2 = 0.6 J'], ['A1', '0.6 ÷ 1.8 = 33 %']] },
        { q: 'Explain what a student would notice if the band were stretched and released many times quickly.', m: 1, lines: 2, ms: [['B1', 'The band becomes warm, because the energy dissipated in each cycle heats it']] }] }
    ]
  });

  /* ---------------- ep6 Stress, strain and the Young modulus ---------------- */
  add('ep6', {
    ex: [
      ['Predicting an extension', 'A steel wire 3.0 m long with diameter 0.50 mm carries a load of 80 N. The Young modulus of steel is 2.0 × 10¹¹ Pa. Find the extension.', [
        ['Area', 'Radius, in metres.', ['A = π × (0.25 × 10⁻³)² = 1.96 × 10⁻⁷ m²']],
        ['Stress and strain', '', ['σ = 80 ÷ 1.96 × 10⁻⁷ = 4.07 × 10⁸ Pa', 'ε = σ ÷ E = 2.04 × 10⁻³']],
        ['Extension', '', [res('x = εL = 2.04 × 10⁻³ × 3.0 = 6.1 × 10⁻³ m (6.1 mm)')]]
      ], { chk: [['pi*0.25e-3**2', 1.963e-7], ['80/(pi*0.25e-3**2)', 4.07e8], ['80/(pi*0.25e-3**2)/2e11*3', 6.11e-3]] }],
      ['Trap: diameter, radius and mm²', 'A student writes the area of a wire of diameter 0.40 mm as π × 0.40² = 0.50. Find the correct area in m², and the factor by which the student’s stress would be wrong.', [
        ['Two errors', 'Spot both before recalculating.', ['diameter used as the radius (area 4 times too big)', 'millimetres not converted to metres']],
        ['Correct area', '', [res('A = π × (0.20 × 10⁻³)² = 1.26 × 10⁻⁷ m²')]],
        ['Effect', 'Using 0.50 mm² as if it were m² makes the stress far too small.', ['0.50 ÷ 1.26 × 10⁻⁷ = 4.0 × 10⁶: the stress would be four million times too small']]
      ], { chk: [['pi*0.2e-3**2', 1.257e-7], ['pi*0.16', 0.503], ['pi*0.16/(pi*0.2e-3**2)', 4.0e6]] }]
    ],
    gaps: [
      { q: 'A load of 40 N acts on a wire of cross-sectional area 4.0 × 10⁻⁷ m².', lines: ['stress = [[1e8]] Pa'], calc: ['40/4e-7'], why: 'Stress = F ÷ A.' },
      { q: 'A 2.0 m wire extends by 1.2 mm.', lines: ['strain = [[6e-4]]'], calc: ['1.2e-3/2'], why: 'Strain has no unit.' },
      { q: 'Use the two answers above.', lines: ['Young modulus = 1.0 × 10⁸ ÷ 6.0 × 10⁻⁴ = [[1.67e11]] Pa'], calc: ['1e8/6e-4'], why: 'Typical of a metal.' }
    ],
    exam: [
      { stem: '<p>A wire of length 2.50 m and diameter 0.40 mm is loaded in steps. A graph of load F against extension x is a straight line of gradient 1.06 × 10⁴ N m⁻¹.</p>', parts: [
        { q: 'Show how the Young modulus is found from this gradient, and calculate it.', m: 3, ans: { a: 2.11e11, unit: 'Pa', tol: 0.02 }, calc: '1.06e4*2.5/(pi*0.2e-3**2)', ms: [['C1', 'E = (F/A) ÷ (x/L) = gradient × L ÷ A'], ['C1', 'A = π × (0.20 × 10⁻³)² = 1.26 × 10⁻⁷ m²'], ['A1', 'E = 1.06 × 10⁴ × 2.50 ÷ 1.26 × 10⁻⁷ = 2.1 × 10¹¹ Pa']] },
        { q: 'Suggest which metal the wire is made of. (copper 1.2 × 10¹¹ Pa, steel 2.0 × 10¹¹ Pa, aluminium 7.0 × 10¹⁰ Pa)', m: 1, lines: 1, ms: [['B1', 'Steel']] }] },
      { stem: '<p>A nylon fishing line has diameter 0.30 mm. The Young modulus of nylon is 3.0 × 10⁹ Pa and its ultimate tensile strength is 6.0 × 10⁷ Pa.</p>', parts: [
        { q: 'Calculate the largest load the line can support.', m: 2, ans: { a: 4.24, unit: 'N', tol: 0.02 }, calc: '6e7*pi*0.15e-3**2', ms: [['C1', 'A = π × (0.15 × 10⁻³)² = 7.07 × 10⁻⁸ m²'], ['A1', 'F = 6.0 × 10⁷ × 7.07 × 10⁻⁸ = 4.2 N']] },
        { q: 'Calculate the strain in the line when it supports a load of 2.0 N.', m: 2, ans: { a: 9.43e-3, unit: '', tol: 0.02 }, calc: '2/(pi*0.15e-3**2)/3e9', ms: [['C1', 'stress = 2.0 ÷ 7.07 × 10⁻⁸ = 2.83 × 10⁷ Pa'], ['A1', 'strain = 2.83 × 10⁷ ÷ 3.0 × 10⁹ = 9.4 × 10⁻³']] }] }
    ]
  });

  /* ---------------- ep7 Stress–strain graphs ---------------- */
  add('ep7', {
    ex: [
      ['A model answer: rubber and polythene', 'Describe and compare the stress–strain graphs of rubber and polythene. (4 marks)', [
        ['Rubber', '', [`Rubber stretches to a ${mp('very large strain')} with a curved graph and ${mp('returns to its original length')}; the unloading curve lies below the loading curve (${mp('hysteresis')}).`]],
        ['Polythene', '', [`Polythene stretches a little elastically, then ${mp('deforms plastically')} with little increase in stress, and does ${mp('not return')} to its original length.`]],
        ['Comparison', '', ['Both are polymers with long chain molecules; rubber’s tangled chains straighten and recoil, while polythene’s chains slide past one another permanently.']]
      ], { desc: true }],
      ['Energy stored per unit volume', 'A steel wire (E = 2.0 × 10¹¹ Pa) is stressed to 2.0 × 10⁸ Pa within its elastic limit. Find the elastic energy stored per cubic metre.', [
        ['Strain', '', ['ε = σ ÷ E = 2.0 × 10⁸ ÷ 2.0 × 10¹¹ = 1.0 × 10⁻³']],
        ['Energy per unit volume', 'The area under the stress–strain line.', [`${fr('E', 'V')} = ½σε = ½ × 2.0 × 10⁸ × 1.0 × 10⁻³`, res('1.0 × 10⁵ J m⁻³')]]
      ], { chk: [['2e8/2e11', 1e-3], ['0.5*2e8*1e-3', 1e5]] }]
    ],
    gaps: [
      { q: 'A rod has cross-sectional area 1.0 × 10⁻⁶ m² and ultimate tensile strength 4.0 × 10⁸ Pa.', lines: ['breaking force = [[400]] N'], calc: ['4e8*1e-6'], why: 'F = UTS × A.' },
      { q: 'A material is stressed to 3.0 × 10⁸ Pa at a strain of 1.5 × 10⁻³ (still elastic).', lines: ['energy stored per m³ = ½σε = [[2.25e5]] J m⁻³'], calc: ['0.5*3e8*1.5e-3'], why: 'The area under the straight part of the graph.' }
    ],
    exam: [
      { stem: '<p>A metal sample obeys Hooke’s law up to a stress of 2.4 × 10⁸ Pa, where the strain is 1.2 × 10⁻³. It then yields and finally breaks at a strain of 0.25.</p>', parts: [
        { q: 'Calculate the Young modulus of the metal.', m: 2, ans: { a: 2.0e11, unit: 'Pa', tol: 0.01 }, calc: '2.4e8/1.2e-3', ms: [['C1', 'E = stress ÷ strain in the linear region'], ['A1', 'E = 2.0 × 10¹¹ Pa']] },
        { q: 'State and explain whether the metal is ductile or brittle.', m: 1, lines: 2, ms: [['B1', 'Ductile: it undergoes large plastic deformation (strain 0.25, about 200 times the elastic strain) before breaking']] },
        { q: 'Explain what happens to the sample if the load is removed after it has yielded.', m: 1, lines: 2, ms: [['B1', 'It contracts along a line parallel to the original elastic line but does not return to its original length: it has a permanent extension']] }] },
      { stem: '<p>Materials can be classified by the shape of their stress–strain graphs.</p>', parts: [
        { q: 'Describe the stress–strain graph of a brittle material such as glass, and explain what happens at the end.', m: 2, lines: 3, ms: [['B1', 'A straight line (obeys Hooke’s law) all the way'], ['B1', 'It breaks suddenly at the end of the elastic region, with no plastic deformation']] },
        { q: 'Explain why the Young modulus is not a useful quantity for rubber.', m: 1, lines: 2, ms: [['B1', 'Rubber’s stress–strain graph is curved, so stress is not proportional to strain and the gradient changes']] },
        { q: 'Which material is brittle?', m: 1, opts: ['cast iron', 'copper', 'rubber', 'polythene'], a: 0, why: 'Cast iron fractures with very little plastic deformation; the others are ductile or polymeric.' }] }
    ]
  });

  /* ---------------- ep8 Newton's laws of motion and momentum ---------------- */
  add('ep8', {
    ex: [
      ['Force from a water jet', 'A hose sends 2.0 kg of water each second at 15 m s⁻¹ horizontally against a wall. The water stops at the wall. Find the force on the wall.', [
        ['Newton’s second law in momentum form', 'F = rate of change of momentum.', [`F = ${fr('Δp', 'Δt')} = ${fr('Δm', 'Δt')} × Δv`]],
        ['Calculate', '', [res('F = 2.0 × 15 = 30 N')]],
        ['Third law', '', ['The wall pushes the water with 30 N; the water pushes the wall with 30 N.']]
      ], { chk: [['2*15', 30]] }],
      ['Trap: a rebound doubles the change', 'A 0.060 kg ball hits a wall at 20 m s⁻¹ and rebounds at 15 m s⁻¹. Contact lasts 4.0 ms. Find the average force.', [
        ['Change in momentum', 'The trap: subtracting the speeds (20 − 15). The direction reverses, so the changes add.', ['Δp = 0.060 × (15 − (−20)) = 0.060 × 35 = 2.1 N s']],
        ['Average force', '', [`F = ${fr('2.1', '4.0 × 10⁻³')}`, res('F = 525 N')]]
      ], { chk: [['0.06*35', 2.1], ['2.1/4e-3', 525]] }]
    ],
    gaps: [
      { q: 'A 0.40 kg ball moves at 8.0 m s⁻¹.', lines: ['momentum = [[3.2]] kg m s⁻¹'], calc: ['0.4*8'], why: 'p = mv, a vector.' },
      { q: 'A 1200 kg car speeds up from 10 m s⁻¹ to 25 m s⁻¹.', lines: ['change in momentum = [[1.8e4]] kg m s⁻¹'], calc: ['1200*15'], why: 'Δp = mΔv.' },
      { q: 'A rocket expels 50 kg of gas each second at 2000 m s⁻¹.', lines: ['thrust = [[1e5]] N'], calc: ['50*2000'], why: 'F = (Δm/Δt)v.' }
    ],
    exam: [
      { stem: '<p>A jet engine takes in 80 kg of air each second. The air enters at 200 m s⁻¹ and leaves at 600 m s⁻¹ relative to the engine.</p>', parts: [
        { q: 'State Newton’s second law in terms of momentum.', m: 1, lines: 2, ms: [['B1', 'The resultant force on an object is proportional to (equal to) its rate of change of momentum, in the same direction']] },
        { q: 'Calculate the thrust of the engine.', m: 2, ans: { a: 32000, unit: 'N', tol: 0.01 }, calc: '80*(600-200)', ms: [['C1', 'Δp each second = 80 × (600 − 200)'], ['A1', 'F = 3.2 × 10⁴ N']] },
        { q: 'Explain, using Newton’s third law, why the engine is pushed forwards.', m: 2, lines: 3, ms: [['B1', 'The engine exerts a backward force on the air to increase its momentum backwards'], ['B1', 'The air exerts an equal and opposite (forward) force on the engine']] }] },
      { stem: '<p>Hailstones of mass 0.010 kg fall vertically at 20 m s⁻¹ onto a flat roof of area 2.0 m². 500 hailstones hit the roof each second and stop.</p>', parts: [
        { q: 'Calculate the change in momentum of one hailstone.', m: 1, ans: { a: 0.20, unit: 'kg m s⁻¹', tol: 0.01 }, calc: '0.01*20', ms: [['B1', '0.010 × 20 = 0.20 kg m s⁻¹']] },
        { q: 'Calculate the average force on the roof.', m: 1, ans: { a: 100, unit: 'N', tol: 0.01 }, calc: '500*0.01*20', ms: [['B1', '500 × 0.20 = 100 N']] },
        { q: 'Calculate the average pressure on the roof.', m: 1, ans: { a: 50, unit: 'Pa', tol: 0.01 }, calc: '500*0.01*20/2', ms: [['B1', '100 ÷ 2.0 = 50 Pa']] },
        { q: 'Explain why the force would be larger if the hailstones bounced.', m: 1, lines: 2, ms: [['B1', 'The velocity reverses, so the change in momentum of each hailstone (and the rate of change) is larger']] }] }
    ]
  });

  /* ---------------- ep9 Conservation of momentum: collisions and explosions ---------------- */
  add('ep9', {
    ex: [
      ['Recoil of a rifle', 'A 4.0 kg rifle fires a 10 g bullet at 400 m s⁻¹. Find the recoil speed of the rifle and compare the kinetic energies.', [
        ['Momentum before = 0', 'An explosion: the parts move apart with equal and opposite momentum.', ['0 = 0.010 × 400 + 4.0 × v']],
        ['Recoil velocity', '', [res('v = −1.0 m s⁻¹ (1.0 m s⁻¹ backwards)')]],
        ['Kinetic energies', 'Equal momenta, unequal kinetic energies: the lighter object gets most of it.', ['bullet: ½ × 0.010 × 400² = 800 J', 'rifle: ½ × 4.0 × 1.0² = 2.0 J']]
      ], { chk: [['0.01*400/4', 1], ['0.5*0.01*400**2', 800], ['0.5*4*1', 2]] }],
      ['Trap: momentum is conserved, kinetic energy may not be', 'A 2.0 kg trolley at 3.0 m s⁻¹ hits a 1.0 kg trolley at rest and they stick together. Find their speed and the kinetic energy lost.', [
        ['Momentum', '', ['2.0 × 3.0 = 3.0 × v, so v = 2.0 m s⁻¹']],
        ['Kinetic energy', 'The trap: assuming kinetic energy is also conserved.', ['before: ½ × 2.0 × 3.0² = 9.0 J', 'after: ½ × 3.0 × 2.0² = 6.0 J']],
        ['Result', '', [res('3.0 J lost (to heat and sound): a perfectly inelastic collision')]]
      ], { chk: [['6/3', 2], ['0.5*2*9', 9], ['0.5*3*4', 6]] }]
    ],
    gaps: [
      { q: 'A 0.50 kg trolley at 4.0 m s⁻¹ hits a 1.5 kg trolley at rest; they stick.', lines: ['common velocity = 2.0 ÷ 2.0 = [[1]] m s⁻¹', 'kinetic energy lost = 4.0 − 1.0 = [[3]] J'], calc: ['0.5*4/2', '0.5*0.5*16-0.5*2*1'], why: 'Momentum first, then compare the kinetic energies.' },
      { q: 'A 60 kg skater at rest throws a 2.0 kg ball forwards at 9.0 m s⁻¹.', lines: ['skater’s recoil speed = 2.0 × 9.0 ÷ 60 = [[0.3]] m s⁻¹'], calc: ['18/60'], why: 'Total momentum stays zero.' }
    ],
    exam: [
      { stem: '<p>On an air track, glider A (0.40 kg) moves right at 0.60 m s⁻¹ and glider B (0.20 kg) moves left at 0.30 m s⁻¹. They collide and stick together.</p>', parts: [
        { q: 'Calculate the velocity of the gliders after the collision.', m: 2, ans: { a: 0.30, unit: 'm s⁻¹', tol: 0.01 }, calc: '(0.4*0.6-0.2*0.3)/0.6', ms: [['C1', 'total momentum = 0.40 × 0.60 − 0.20 × 0.30 = 0.18 kg m s⁻¹'], ['A1', 'v = 0.18 ÷ 0.60 = 0.30 m s⁻¹ to the right']] },
        { q: 'Calculate the kinetic energy lost in the collision.', m: 2, ans: { a: 0.054, unit: 'J', tol: 0.02 }, calc: '0.5*0.4*0.36+0.5*0.2*0.09-0.5*0.6*0.09', ms: [['C1', 'before = 0.072 + 0.009 = 0.081 J; after = ½ × 0.60 × 0.30² = 0.027 J'], ['A1', 'lost = 0.054 J']] },
        { q: 'State whether the collision is elastic, and why.', m: 1, lines: 1, ms: [['B1', 'Inelastic: kinetic energy is not conserved (they stick together)']] }] },
      { stem: '<p>A radon-222 nucleus at rest emits an alpha particle (mass 4 u) at 1.6 × 10⁷ m s⁻¹. The remaining nucleus has mass 218 u.</p>', parts: [
        { q: 'Calculate the recoil speed of the remaining nucleus.', m: 2, ans: { a: 2.94e5, unit: 'm s⁻¹', tol: 0.02 }, calc: '4*1.6e7/218', ms: [['C1', '4 × 1.6 × 10⁷ = 218 × v'], ['A1', 'v = 2.9 × 10⁵ m s⁻¹']] },
        { q: 'Explain why the two particles move in opposite directions.', m: 1, lines: 2, ms: [['B1', 'The total momentum was zero before, so the two momenta must be equal and opposite afterwards']] }] }
    ]
  });

  /* ---------------- ep10 Collisions in two dimensions ---------------- */
  add('ep10', {
    ex: [
      ['A glancing elastic collision', 'A puck at 2.0 m s⁻¹ strikes an identical puck at rest elastically. Afterwards the first puck moves at 30° to its original line. Elastic collisions between equal masses send the two pucks off at 90° to each other. Find both speeds.', [
        ['Directions', '', ['first puck at 30° on one side; second puck at 60° on the other']],
        ['Momentum triangle', 'With equal masses, the velocities form a right-angled triangle with the original velocity as the hypotenuse.', ['v₁ = 2.0 cos 30° = 1.73 m s⁻¹', 'v₂ = 2.0 sin 30° = 1.00 m s⁻¹']],
        ['Check kinetic energy', '', [res('1.73² + 1.00² = 4.0 = 2.0²: kinetic energy is conserved ✓')]]
      ], { chk: [['2*cosd(30)', 1.732], ['2*sind(30)', 1], ['(2*cosd(30))**2+1', 4]] }],
      ['An explosion in two dimensions', 'A 3.0 kg object at rest breaks into three 1.0 kg pieces. One moves east at 10 m s⁻¹, another north at 10 m s⁻¹. Find the velocity of the third.', [
        ['Total momentum is zero', 'The third piece cancels the other two.', ['east component: −10 kg m s⁻¹;  north component: −10 kg m s⁻¹']],
        ['Size', '', ['p = √(10² + 10²) = 14.1 kg m s⁻¹']],
        ['Velocity', '', [res('14 m s⁻¹ towards the south-west (45° south of west)')]]
      ], { chk: [['sqrt(200)', 14.14]] }]
    ],
    gaps: [
      { q: 'A momentum of 0.30 kg m s⁻¹ acts at 60° to the x-axis.', lines: ['x component = [[0.15]] kg m s⁻¹', 'y component = [[0.26]] kg m s⁻¹'], calc: ['0.3*cosd(60)', '0.3*sind(60)'], why: 'Resolve, then conserve each component separately.' },
      { q: 'Momenta of 3.0 kg m s⁻¹ east and 4.0 kg m s⁻¹ north are added.', lines: ['resultant = [[5]] kg m s⁻¹'], calc: ['5'], why: 'Pythagoras for perpendicular vectors.' }
    ],
    exam: [
      { stem: '<p>A 1200 kg car travelling north at 15 m s⁻¹ collides at a junction with an 1800 kg car travelling east at 10 m s⁻¹. The cars lock together.</p>', parts: [
        { q: 'Calculate the momentum of each car before the collision.', m: 1, ans: { a: 18000, unit: 'kg m s⁻¹', tol: 0.01 }, calc: '1200*15', ms: [['B1', 'both 1.8 × 10⁴ kg m s⁻¹ (north and east)']] },
        { q: 'Calculate the speed of the wreckage just after the collision.', m: 2, ans: { a: 8.49, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(2)*18000/3000', ms: [['C1', 'total momentum = √(18 000² + 18 000²) = 2.55 × 10⁴ kg m s⁻¹'], ['A1', 'v = 2.55 × 10⁴ ÷ 3000 = 8.5 m s⁻¹']] },
        { q: 'State the direction of the wreckage.', m: 1, lines: 1, ms: [['B1', 'north-east (45° east of north), because the two momenta are equal']] },
        { q: 'State, with a reason, whether kinetic energy is conserved.', m: 1, lines: 1, ms: [['B1', 'No: the cars stick together, so the collision is inelastic']] }] },
      { stem: '<p>A nucleus at rest decays. It emits an electron with momentum 3.0 × 10⁻²² kg m s⁻¹ east and a neutrino with momentum 4.0 × 10⁻²² kg m s⁻¹ north.</p>', parts: [
        { q: 'Calculate the magnitude of the momentum of the recoiling nucleus.', m: 2, ans: { a: 5.0e-22, unit: 'kg m s⁻¹', tol: 0.01 }, calc: 'sqrt(9+16)*1e-22', ms: [['C1', 'it must cancel the resultant of the other two'], ['A1', '√(3.0² + 4.0²) × 10⁻²² = 5.0 × 10⁻²² kg m s⁻¹']] },
        { q: 'State its direction.', m: 1, lines: 1, ms: [['B1', 'opposite to the resultant: 53° south of west (37° west of south)']] },
        { q: 'The nucleus has mass 3.6 × 10⁻²⁵ kg. Calculate its recoil speed.', m: 2, ans: { a: 1389, unit: 'm s⁻¹', tol: 0.02 }, calc: '5e-22/3.6e-25', ms: [['C1', 'v = p ÷ m'], ['A1', 'v = 1.4 × 10³ m s⁻¹']] }] }
    ]
  });

  /* ---------------- ep11 Impulse and force–time graphs ---------------- */
  add('ep11', {
    ex: [
      ['Impulse from a triangle', 'The force on a 0.058 kg tennis ball rises steadily to 600 N and falls back to zero over 4.0 ms. The ball was at rest. Find the impulse and the ball’s speed.', [
        ['Impulse = area under F–t', 'A triangle.', ['impulse = ½ × 600 × 4.0 × 10⁻³ = 1.2 N s']],
        ['Change in momentum', 'Impulse = Δp.', [`v = ${fr('1.2', '0.058')}`, res('v = 21 m s⁻¹')]]
      ], { chk: [['0.5*600*4e-3', 1.2], ['1.2/0.058', 20.7]] }],
      ['Trap: direction counts', 'A 0.16 kg cricket ball arrives at 25 m s⁻¹ and leaves the bat at 35 m s⁻¹ in the opposite direction. Find the impulse from the bat.', [
        ['Choose a positive direction', 'Take the outgoing direction as positive.', ['u = −25 m s⁻¹, v = +35 m s⁻¹']],
        ['Impulse', 'The trap: using 35 − 25 = 10 m s⁻¹.', ['Δp = 0.16 × (35 − (−25)) = 0.16 × 60', res('impulse = 9.6 N s')]]
      ], { chk: [['0.16*60', 9.6]] }]
    ],
    gaps: [
      { q: 'A force of 250 N acts for 0.020 s.', lines: ['impulse = [[5]] N s'], calc: ['250*0.02'], why: 'Impulse = FΔt.' },
      { q: 'That impulse acts on a 0.50 kg ball at rest.', lines: ['speed = [[10]] m s⁻¹'], calc: ['5/0.5'], why: 'Impulse = change in momentum.' },
      { q: 'A 1100 kg car stops from 14 m s⁻¹ in 0.10 s.', lines: ['average force = [[1.54e5]] N'], calc: ['1100*14/0.1'], why: 'F = Δp ÷ Δt.' }
    ],
    exam: [
      { stem: '<p>During a kick, the force on a 0.43 kg football rises steadily from 0 to 900 N in 4.0 ms and then falls steadily to 0 at 10 ms. The ball starts at rest.</p>', parts: [
        { q: 'Calculate the impulse on the ball.', m: 2, ans: { a: 4.5, unit: 'N s', tol: 0.01 }, calc: '0.5*900*0.010', ms: [['C1', 'impulse = area under the graph = ½ × 900 × 0.010'], ['A1', '4.5 N s']] },
        { q: 'Calculate the speed of the ball.', m: 1, ans: { a: 10.47, unit: 'm s⁻¹', tol: 0.02 }, calc: '4.5/0.43', ms: [['B1', 'v = 4.5 ÷ 0.43 = 10 m s⁻¹']] },
        { q: 'Calculate the average force on the ball.', m: 1, ans: { a: 450, unit: 'N', tol: 0.01 }, calc: '4.5/0.010', ms: [['B1', '4.5 ÷ 0.010 = 450 N']] },
        { q: 'Explain why “following through” with the kick can make the ball faster.', m: 1, lines: 2, ms: [['B1', 'The foot stays in contact for longer, so for a similar force the impulse, and so the change in momentum, is larger']] }] },
      { stem: '<p>In a crash, a passenger’s head (5.0 kg) moving at 15 m s⁻¹ is stopped either by a dashboard in 0.010 s or by an airbag in 0.12 s.</p>', parts: [
        { q: 'Calculate the average force on the head in each case.', m: 2, ans: { a: 7500, unit: 'N (dashboard)', tol: 0.01 }, calc: '5*15/0.010', ms: [['C1', 'Δp = 5.0 × 15 = 75 N s'], ['A1', 'dashboard: 7500 N; airbag: 625 N']] },
        { q: 'Explain how the airbag reduces the risk of injury.', m: 2, lines: 3, ms: [['B1', 'The change in momentum is the same in both cases'], ['B1', 'The airbag increases the stopping time, so the rate of change of momentum (the force) is much smaller']] }] }
    ]
  });

  /* ---------------- ep12 Review and exam practice ---------------- */
  add('ep12', {
    ex: [
      ['Synoptic: a bungee jump', 'A 70 kg jumper uses a bungee cord with natural length 20 m and force constant 80 N m⁻¹. Find the greatest extension of the cord.', [
        ['Energy at the lowest point', 'The jumper is momentarily at rest. All the GPE lost has become elastic energy.', ['mg(20 + x) = ½kx²']],
        ['Rearrange', '', ['40x² − 686.7x − 13 734 = 0']],
        ['Solve', 'Take the positive root.', [`x = ${fr('686.7 + √(686.7² + 4 × 40 × 13 734)', '80')}`, res('x = 29 m: the jumper falls 49 m in total')]]
      ], { chk: [['70*g', 686.7], ['70*g*20', 13734], ['(686.7+sqrt(686.7**2+4*40*13734))/80', 29.0]] }],
      ['A model answer: what is conserved in a collision?', 'Explain the difference between elastic and inelastic collisions, and what is conserved in each. (3 marks)', [
        ['Momentum', '', [`${mp('Momentum is conserved in every collision')} (no external force on the system).`]],
        ['Elastic', '', [`In an elastic collision ${mp('kinetic energy is also conserved')}.`]],
        ['Inelastic', '', [`In an inelastic collision ${mp('kinetic energy decreases')}: some is transferred to heat, sound or deformation. Total energy is still conserved.`]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A 2.0 kg trolley at 3.0 m s⁻¹ compresses a buffer spring (k = 800 N m⁻¹) and stops.', lines: ['kinetic energy = [[9]] J', 'maximum compression = √(2 × 9.0 ÷ 800) = [[0.15]] m'], calc: ['0.5*2*9', 'sqrt(18/800)'], why: 'Kinetic energy becomes elastic potential energy.' }
    ],
    exam: [
      { stem: '<p>A 1.2 kg trolley moving at 0.80 m s⁻¹ runs into a spring buffer of force constant 300 N m⁻¹. It rebounds along the same line at 0.60 m s⁻¹. The trolley is in contact with the buffer for 0.40 s.</p>', parts: [
        { q: 'Calculate the maximum compression of the buffer, assuming no energy is lost before the trolley stops.', m: 2, ans: { a: 0.0506, unit: 'm', tol: 0.02 }, calc: 'sqrt(1.2*0.8**2/300)', ms: [['C1', '½ × 1.2 × 0.80² = 0.384 J = ½ × 300 × x²'], ['A1', 'x = 0.051 m']] },
        { q: 'Calculate the change in momentum of the trolley.', m: 2, ans: { a: 1.68, unit: 'kg m s⁻¹', tol: 0.02 }, calc: '1.2*(0.8+0.6)', ms: [['C1', 'the velocity reverses: Δp = 1.2 × (0.60 − (−0.80))'], ['A1', 'Δp = 1.7 kg m s⁻¹']] },
        { q: 'Calculate the average force exerted by the buffer.', m: 1, ans: { a: 4.2, unit: 'N', tol: 0.02 }, calc: '1.2*1.4/0.4', ms: [['B1', 'F = 1.68 ÷ 0.40 = 4.2 N']] },
        { q: 'Calculate the percentage of the trolley’s kinetic energy that is lost.', m: 2, ans: { a: 43.75, unit: '%', tol: 0.02 }, calc: '(1-(0.6/0.8)**2)*100', ms: [['C1', 'KE before 0.384 J, after ½ × 1.2 × 0.60² = 0.216 J'], ['A1', '44 % lost']] },
        { q: 'Suggest what happens to the kinetic energy that is lost.', m: 1, lines: 2, ms: [['B1', 'It is dissipated as heat (and sound) in the buffer and trolley, for example through friction or internal damping in the spring']] }] },
      { stem: '<p>A steel wire of length 1.5 m and cross-sectional area 2.0 × 10⁻⁷ m² hangs vertically. A load of 60 N is attached. The Young modulus of steel is 2.0 × 10¹¹ Pa and its ultimate tensile strength is 4.0 × 10⁸ Pa.</p>', parts: [
        { q: 'Calculate the stress in the wire.', m: 1, ans: { a: 3.0e8, unit: 'Pa', tol: 0.01 }, calc: '60/2e-7', ms: [['B1', '60 ÷ 2.0 × 10⁻⁷ = 3.0 × 10⁸ Pa']] },
        { q: 'Calculate the extension of the wire.', m: 2, ans: { a: 2.25e-3, unit: 'm', tol: 0.02 }, calc: '60*1.5/(2e-7*2e11)', ms: [['C1', 'strain = 3.0 × 10⁸ ÷ 2.0 × 10¹¹ = 1.5 × 10⁻³'], ['A1', 'x = 1.5 × 10⁻³ × 1.5 = 2.3 × 10⁻³ m']] },
        { q: 'Calculate the elastic potential energy stored in the wire.', m: 1, ans: { a: 0.0675, unit: 'J', tol: 0.02 }, calc: '0.5*60*60*1.5/(2e-7*2e11)', ms: [['B1', '½ × 60 × 2.25 × 10⁻³ = 0.068 J']] },
        { q: 'The load is lowered gently onto the wire. Explain why the energy stored is only half of the GPE lost by the load.', m: 2, lines: 3, ms: [['B1', 'The load loses mgx = 60 × 2.25 × 10⁻³ = 0.135 J of GPE'], ['B1', 'Only ½Fx is stored; the rest is transferred to whatever lowers the load (or, if dropped, to oscillations and heating)']] },
        { q: 'Calculate the largest load the wire can support.', m: 1, ans: { a: 80, unit: 'N', tol: 0.01 }, calc: '4e8*2e-7', ms: [['B1', '4.0 × 10⁸ × 2.0 × 10⁻⁷ = 80 N']] }] }
    ]
  });

  /* third fill-the-gaps for the calculation-heavy lessons */
  add('ep7', { gaps: [{ q: 'A copper wire of diameter 0.50 mm has ultimate tensile strength 2.2 × 10⁸ Pa.', lines: ['area = [[1.96e-7]] m²', 'breaking force = [[43.2]] N'], calc: ['pi*0.25e-3**2', '2.2e8*pi*0.25e-3**2'], why: 'Convert the diameter to a radius in metres.' }] });
  add('ep9', { gaps: [{ q: 'A 0.20 kg ball at 5.0 m s⁻¹ hits a 0.30 kg ball at rest. Afterwards the 0.20 kg ball moves at −1.0 m s⁻¹.', lines: ['momentum before = [[1]] kg m s⁻¹', 'velocity of the 0.30 kg ball = (1.0 + 0.20) ÷ 0.30 = [[4]] m s⁻¹'], calc: ['0.2*5', '1.2/0.3'], why: 'The negative sign means the first ball bounced back.' }] });
  add('ep10', { gaps: [{ q: 'A 2.0 kg puck at 3.0 m s⁻¹ east hits a puck at rest. Afterwards it moves at 1.5 m s⁻¹ at 60° north of east.', lines: ['its east momentum after = 2.0 × 1.5 cos 60° = [[1.5]] kg m s⁻¹', 'east momentum of the other puck = 6.0 − 1.5 = [[4.5]] kg m s⁻¹'], calc: ['2*1.5*cosd(60)', '6-2*1.5*cosd(60)'], why: 'Conserve each component separately.' }] });
})();
