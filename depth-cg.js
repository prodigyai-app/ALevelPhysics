/* Circular motion, oscillations and gravitation (cg1–cg9): extra worked examples, fill-the-gaps and exam-style questions.
   G = 6.67e-11 N m² kg⁻²; Earth: M = 5.97e24 kg, R = 6.37e6 m (GM = 3.98e14). Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const mp = t => `<b>${t}</b>`;

  /* ---------------- cg1 Radians and angular velocity ---------------- */
  add('cg1', {
    ex: [
      ['A bicycle wheel', 'A bicycle wheel of radius 0.34 m turns at 180 revolutions per minute. Find its angular velocity and the speed of a point on the tyre.', [
        ['Frequency', '', ['f = 180 ÷ 60 = 3.0 Hz']],
        ['Angular velocity', 'ω = 2πf.', ['ω = 2π × 3.0 = 18.8 rad s⁻¹']],
        ['Speed', 'v = rω.', [res('v = 0.34 × 18.8 = 6.4 m s⁻¹: the bicycle’s speed, if the tyre does not slip')]]
      ], { chk: [['2*pi*3', 18.85], ['0.34*2*pi*3', 6.41]] }],
      ['Trap: arc length needs radians', 'A point on a wheel of radius 0.50 m turns through 60°. How far does it travel?', [
        ['The tempting answer', 'The trap: s = rθ with θ = 60.', ['0.50 × 60 = 30 m  ✗']],
        ['Convert to radians', '', ['60° = 60 × π ÷ 180 = 1.05 rad']],
        ['Arc length', '', [res('s = 0.50 × 1.05 = 0.52 m')]]
      ], { chk: [['60*pi/180', 1.047], ['0.5*60*pi/180', 0.524]] }]
    ],
    gaps: [
      { q: 'Convert 45° into radians.', lines: ['45° = [[0.785]] rad'], calc: ['45*pi/180'], why: 'Multiply by π ÷ 180: 45° is π/4.' },
      { q: 'A record turns at 45 revolutions per minute.', lines: ['ω = [[4.71]] rad s⁻¹'], calc: ['2*pi*45/60'], why: 'f = 0.75 Hz; ω = 2πf.' },
      { q: 'A point 0.12 m from the centre of that record moves at', lines: ['v = rω = [[0.565]] m s⁻¹'], calc: ['0.12*2*pi*45/60'], why: 'Points further out move faster at the same ω.' }
    ],
    exam: [
      { stem: '<p>A computer hard disk spins at 7200 revolutions per minute. The outer edge of the disk is 0.045 m from the axis.</p>', parts: [
        { q: 'Calculate the angular velocity of the disk.', m: 2, ans: { a: 754, unit: 'rad s⁻¹', tol: 0.01 }, calc: '2*pi*7200/60', ms: [['C1', 'f = 7200 ÷ 60 = 120 Hz'], ['A1', 'ω = 2π × 120 = 754 rad s⁻¹']] },
        { q: 'Calculate the speed of a point on the outer edge.', m: 1, ans: { a: 33.9, unit: 'm s⁻¹', tol: 0.01 }, calc: '0.045*2*pi*7200/60', ms: [['B1', 'v = rω = 0.045 × 754 = 34 m s⁻¹']] },
        { q: 'Calculate the angle, in degrees, that the disk turns through in 0.50 ms.', m: 2, ans: { a: 21.6, unit: '°', tol: 0.01 }, calc: '2*pi*7200/60*0.5e-3*180/pi', ms: [['C1', 'θ = ωt = 754 × 0.50 × 10⁻³ = 0.377 rad'], ['A1', '0.377 × 180 ÷ π = 22°']] }] },
      { stem: '<p>A large observation wheel has a radius of 60 m and makes one complete rotation in 30 minutes.</p>', parts: [
        { q: 'Calculate the angular velocity of the wheel.', m: 1, ans: { a: 3.49e-3, unit: 'rad s⁻¹', tol: 0.01 }, calc: '2*pi/1800', ms: [['B1', 'ω = 2π ÷ 1800 = 3.5 × 10⁻³ rad s⁻¹']] },
        { q: 'Calculate the speed of a passenger capsule on the rim.', m: 1, ans: { a: 0.209, unit: 'm s⁻¹', tol: 0.01 }, calc: '60*2*pi/1800', ms: [['B1', 'v = 60 × 3.49 × 10⁻³ = 0.21 m s⁻¹']] },
        { q: 'A maintenance ladder is fixed halfway between the axis and the rim. Compare its angular velocity and its speed with those of a capsule.', m: 2, lines: 3, ms: [['B1', 'Same angular velocity: every part of the rigid wheel turns through the same angle in the same time'], ['B1', 'Half the speed, since v = rω and r is halved']] }] }
    ]
  });

  /* ---------------- cg2 Centripetal acceleration and force ---------------- */
  add('cg2', {
    ex: [
      ['A car on a flat bend', 'A car goes round a flat bend of radius 40 m. The greatest friction force the road can provide is 0.70 times the car’s weight. Find the maximum safe speed.', [
        ['What provides the centripetal force', 'On a flat road, only friction.', ['mv² ÷ r = 0.70mg']],
        ['Mass cancels', '', ['v² = 0.70 × 9.81 × 40 = 275 m² s⁻²']],
        ['Speed', '', [res('v = 16.6 m s⁻¹ (about 37 mph), whatever the car’s mass')]]
      ], { chk: [['0.7*g*40', 274.7], ['sqrt(0.7*g*40)', 16.57]] }],
      ['Trap: centripetal force is not an extra force', 'A stone on a string is whirled in a horizontal circle on a smooth table. A student’s free-body diagram shows tension, weight, the normal contact force and a “centripetal force”. What is wrong?', [
        ['Count the real forces', 'Each force must have a cause.', ['Weight (Earth), contact force (table), tension (string).']],
        ['The resultant', '', ['Weight and contact force cancel. The tension is the resultant force, and it points to the centre.']],
        ['Correct statement', '', [res('the tension IS the centripetal force: there is no fourth force')]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A runner moves at 8.0 m s⁻¹ round a curve of radius 32 m.', lines: ['a = v² ÷ r = [[2]] m s⁻²'], calc: ['64/32'], why: 'Directed towards the centre of the curve.' },
      { q: 'A 0.50 kg mass moves in a circle of radius 0.40 m at ω = 5.0 rad s⁻¹.', lines: ['F = mω²r = [[5]] N'], calc: ['0.5*25*0.4'], why: 'F = mrω² is the same as mv² ÷ r with v = rω.' },
      { q: 'A car of mass 1200 kg goes round a bend of radius 50 m at 15 m s⁻¹.', lines: ['friction needed = [[5400]] N'], calc: ['1200*225/50'], why: 'F = mv² ÷ r.' }
    ],
    exam: [
      { stem: '<p>A conical pendulum consists of a 0.20 kg mass on a string of length 0.80 m. The mass moves in a horizontal circle with the string at 30° to the vertical.</p>', parts: [
        { q: 'Calculate the radius of the circle.', m: 1, ans: { a: 0.40, unit: 'm', tol: 0.01 }, calc: '0.8*sind(30)', ms: [['B1', 'r = 0.80 sin 30° = 0.40 m']] },
        { q: 'By resolving vertically, calculate the tension in the string.', m: 2, ans: { a: 2.27, unit: 'N', tol: 0.01 }, calc: '0.2*g/cosd(30)', ms: [['C1', 'T cos 30° = mg'], ['A1', 'T = 0.20 × 9.81 ÷ cos 30° = 2.3 N']] },
        { q: 'Calculate the speed of the mass.', m: 2, ans: { a: 1.50, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(0.4*g*tand(30))', ms: [['C1', 'T sin 30° = mv² ÷ r, so v² = rg tan 30°'], ['A1', 'v = 1.5 m s⁻¹']] },
        { q: 'Explain why the string can never be exactly horizontal.', m: 1, lines: 2, ms: [['B1', 'The tension must have a vertical component to balance the weight; a horizontal string has none']] }] },
      { stem: '<p>In a practical, a rubber bung of mass 0.020 kg is whirled in a horizontal circle on a cord that passes through a glass tube. A 0.10 kg mass hangs from the lower end of the cord, so the tension equals its weight. The radius of the circle is kept at 0.50 m.</p>', parts: [
        { q: 'Calculate the period of rotation predicted by this model.', m: 2, ans: { a: 0.634, unit: 's', tol: 0.02 }, calc: '2*pi*sqrt(0.02*0.5/(0.1*g))', ms: [['C1', 'Mg = m(4π² ÷ T²)r'], ['A1', 'T = 2π√(0.020 × 0.50 ÷ 0.981) = 0.63 s']] },
        { q: 'Suggest why the student times 20 rotations rather than one.', m: 1, lines: 2, ms: [['B1', 'The reaction-time uncertainty is spread over 20 periods, so the percentage uncertainty in T is much smaller']] }] }
    ]
  });

  /* ---------------- cg3 Simple harmonic motion ---------------- */
  add('cg3', {
    ex: [
      ['Speed part-way through an oscillation', 'A mass oscillates with SHM of amplitude 0.050 m and frequency 2.0 Hz. Find its speed when its displacement is 0.030 m.', [
        ['Angular frequency', '', ['ω = 2π × 2.0 = 12.6 rad s⁻¹']],
        ['Use v = ±ω√(A² − x²)', '', ['v = 12.6 × √(0.050² − 0.030²) = 12.6 × 0.040']],
        ['Speed', '', [res('v = 0.50 m s⁻¹ (the maximum is ωA = 0.63 m s⁻¹)')]]
      ], { chk: [['2*pi*2*0.04', 0.503], ['2*pi*2*0.05', 0.628]] }],
      ['Trap: where is the acceleration greatest?', 'For an object in SHM, a student says the acceleration is greatest at the centre “because that is where it moves fastest”. Correct this.', [
        ['The defining equation', '', ['a = −ω²x']],
        ['At the centre', 'The trap: confusing speed with acceleration.', ['x = 0, so a = 0: the speed is greatest here']],
        ['At the extremes', '', [res('|a| is greatest at x = ±A, where the object is momentarily at rest')]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'An oscillator has period 0.25 s.', lines: ['ω = 2π ÷ T = [[25.1]] rad s⁻¹'], calc: ['2*pi/0.25'], why: 'ω = 2π ÷ T = 2πf.' },
      { q: 'Its amplitude is 0.020 m.', lines: ['maximum acceleration = ω²A = [[12.6]] m s⁻²'], calc: ['(2*pi/0.25)**2*0.02'], why: 'At the extremes of the motion.' },
      { q: 'Maximum speed of the same oscillator', lines: ['v_max = ωA = [[0.503]] m s⁻¹'], calc: ['2*pi/0.25*0.02'], why: 'At the equilibrium position.' }
    ],
    exam: [
      { stem: '<p>The piston in a small engine moves with approximately simple harmonic motion. Its amplitude is 0.040 m and its frequency is 50 Hz.</p>', parts: [
        { q: 'Calculate the maximum acceleration of the piston.', m: 2, ans: { a: 3948, unit: 'm s⁻²', tol: 0.02 }, calc: '(2*pi*50)**2*0.04', ms: [['C1', 'ω = 2π × 50 = 314 rad s⁻¹'], ['A1', 'a = ω²A = 3.9 × 10³ m s⁻²']] },
        { q: 'Calculate the speed of the piston when it is 0.020 m from its central position.', m: 2, ans: { a: 10.9, unit: 'm s⁻¹', tol: 0.02 }, calc: '2*pi*50*sqrt(0.04**2-0.02**2)', ms: [['C1', 'v = ω√(A² − x²)'], ['A1', 'v = 314 × √(0.0016 − 0.0004) = 11 m s⁻¹']] }] },
      { stem: '<p>A student hangs different masses m on a spring and measures the period T of vertical oscillations. A graph of T² against m is a straight line through the origin with gradient 1.58 s² kg⁻¹.</p>', parts: [
        { q: 'Use T = 2π√(m/k) to explain why the graph is a straight line through the origin.', m: 1, lines: 2, ms: [['B1', 'T² = (4π² ÷ k)m, which has the form y = mx with gradient 4π² ÷ k']] },
        { q: 'Calculate the spring constant.', m: 2, ans: { a: 25.0, unit: 'N m⁻¹', tol: 0.02 }, calc: '4*pi**2/1.58', ms: [['C1', 'gradient = 4π² ÷ k'], ['A1', 'k = 4π² ÷ 1.58 = 25 N m⁻¹']] },
        { q: 'Explain why the student times 10 oscillations and starts timing as the mass passes the equilibrium position.', m: 1, lines: 2, ms: [['B1', 'Timing many oscillations reduces the percentage uncertainty; the mass moves fastest at equilibrium, so that point is passed most sharply']] }] }
    ]
  });

  /* ---------------- cg4 Energy of a simple harmonic oscillator ---------------- */
  add('cg4', {
    ex: [
      ['Energy of a spring oscillator', 'A 0.25 kg mass on a spring (k = 100 N m⁻¹) oscillates with amplitude 0.060 m. Find its total energy and maximum speed.', [
        ['Total energy', 'All elastic potential energy at the extreme.', ['E = ½kA² = ½ × 100 × 0.060² = 0.18 J']],
        ['Maximum speed', 'All kinetic energy at the centre.', [`½mv² = 0.18, v = √(${fr('2 × 0.18', '0.25')})`, res('v_max = 1.2 m s⁻¹')]],
        ['Check with ωA', '', ['ω = √(k ÷ m) = 20 rad s⁻¹, ωA = 1.2 m s⁻¹ ✓']]
      ], { chk: [['0.5*100*0.06**2', 0.18], ['sqrt(2*0.18/0.25)', 1.2], ['sqrt(100/0.25)*0.06', 1.2]] }],
      ['Trap: half the amplitude is not half the energy', 'An oscillator is at half its amplitude. What fraction of its energy is kinetic?', [
        ['Potential energy', 'The trap: guessing a half. Potential energy goes as x².', ['E_p = ½kx² = ½k(A/2)² = ¼ × ½kA²']],
        ['Kinetic energy', '', [res('E_k = E − E_p = ¾ of the total energy')]]
      ], { chk: [['1-0.5**2', 0.75]] }]
    ],
    gaps: [
      { q: 'A 0.10 kg mass oscillates with ω = 10 rad s⁻¹ and A = 0.050 m.', lines: ['total energy = ½mω²A² = [[0.0125]] J'], calc: ['0.5*0.1*100*0.0025'], why: 'Constant if there is no damping.' },
      { q: 'At x = 0.030 m, the kinetic energy is', lines: ['½mω²(A² − x²) = [[0.008]] J'], calc: ['0.5*0.1*100*(0.0025-0.0009)'], why: 'The rest, 0.0045 J, is potential energy.' },
      { q: 'The amplitude of an oscillator falls from 40 mm to 20 mm.', lines: ['fraction of energy remaining = [[0.25]]'], calc: ['0.25'], why: 'E ∝ A².' }
    ],
    exam: [
      { stem: '<p>A 0.40 kg trolley is held between two springs on a horizontal track. The combined stiffness is 40 N m⁻¹. The trolley is pulled 0.050 m from equilibrium and released.</p>', parts: [
        { q: 'Calculate the total energy of the oscillation.', m: 1, ans: { a: 0.050, unit: 'J', tol: 0.01 }, calc: '0.5*40*0.05**2', ms: [['B1', '½kA² = ½ × 40 × 0.050² = 0.050 J']] },
        { q: 'Calculate the maximum speed of the trolley.', m: 2, ans: { a: 0.50, unit: 'm s⁻¹', tol: 0.01 }, calc: 'sqrt(40/0.4)*0.05', ms: [['C1', 'ω = √(40 ÷ 0.40) = 10 rad s⁻¹'], ['A1', 'v = ωA = 0.50 m s⁻¹']] },
        { q: 'Calculate the speed of the trolley when it is 0.030 m from equilibrium.', m: 2, ans: { a: 0.40, unit: 'm s⁻¹', tol: 0.01 }, calc: '10*sqrt(0.05**2-0.03**2)', ms: [['C1', 'v = ω√(A² − x²)'], ['A1', 'v = 10 × 0.040 = 0.40 m s⁻¹']] },
        { q: 'Describe the shape of a graph of the trolley’s potential energy against displacement.', m: 1, lines: 2, ms: [['B1', 'A parabola (U-shaped), zero at x = 0 and reaching 0.050 J at x = ±0.050 m']] }] },
      { stem: '<p>Friction slowly damps the trolley. After 10 oscillations its amplitude has fallen from 50 mm to 40 mm.</p>', parts: [
        { q: 'Calculate the fraction of the original energy remaining.', m: 2, ans: { a: 0.64, unit: '', tol: 0.01 }, calc: '(40/50)**2', ms: [['C1', 'E ∝ A²'], ['A1', '(40 ÷ 50)² = 0.64']] },
        { q: 'State what happens to the energy that is lost.', m: 1, lines: 1, ms: [['B1', 'It is transferred to the surroundings as thermal energy (internal energy) by friction']] }] }
    ]
  });

  /* ---------------- cg5 Damping, forced oscillations and resonance ---------------- */
  add('cg5', {
    ex: [
      ['A model answer: car suspension', 'Explain why a car’s suspension is designed to be critically damped. (3 marks)', [
        ['What critical damping does', '', [`After a bump the car body returns to equilibrium in the ${mp('shortest time without oscillating')}.`]],
        ['Too little damping', '', [`With ${mp('light damping')} the car would bounce up and down for several cycles after each bump.`]],
        ['Too much damping', '', [`With ${mp('heavy damping')} the suspension would return very slowly and could not absorb the next bump.`]]
      ], { desc: true }],
      ['Predicting a resonant frequency', 'A 0.50 kg mass hangs on a spring of stiffness 80 N m⁻¹. At what driving frequency will it resonate?', [
        ['Natural frequency', 'Light damping: resonance is at the natural frequency.', [`f₀ = ${fr('1', '2π')}√(${fr('k', 'm')}) = ${fr('1', '2π')}√160`]],
        ['Value', '', [res('f₀ = 2.0 Hz')]]
      ], { chk: [['sqrt(160)/(2*pi)', 2.013]] }]
    ],
    gaps: [
      { q: 'A mass of 0.20 kg hangs on a spring with k = 50 N m⁻¹.', lines: ['natural frequency = [[2.52]] Hz'], calc: ['sqrt(250)/(2*pi)'], why: 'f₀ = (1 ÷ 2π)√(k ÷ m).' },
      { q: 'A lightly damped oscillator loses amplitude from 20 mm to 18 mm in one cycle.', lines: ['fraction of energy kept each cycle = [[0.81]]'], calc: ['0.9**2'], why: 'E ∝ A²: a 10 % fall in amplitude is a 19 % fall in energy.' },
      { q: 'A pendulum of length 0.50 m', lines: ['natural frequency = (1 ÷ 2π)√(g ÷ L) = [[0.705]] Hz'], calc: ['sqrt(g/0.5)/(2*pi)'], why: 'Drive it at this frequency for resonance.' }
    ],
    exam: [
      { stem: '<p>A footbridge has a natural frequency of sideways oscillation of 1.0 Hz. When crowds walk across it, they push sideways on the deck about once per second.</p>', parts: [
        { q: 'Explain why the bridge sways with a large amplitude.', m: 2, lines: 3, ms: [['B1', 'The walkers provide a driving (forcing) frequency equal to the natural frequency, so resonance occurs'], ['B1', 'Energy is transferred to the bridge most efficiently, so the amplitude builds up to a maximum']] },
        { q: 'Engineers fit dampers to the bridge. Describe two effects on the amplitude–frequency response of the bridge.', m: 2, lines: 3, ms: [['B1', 'The peak amplitude is reduced (the peak is broader/flatter)'], ['B1', 'The peak shifts to a slightly lower frequency']] }] },
      { stem: '<p>A student drives a 0.25 kg mass on a spring of stiffness 40 N m⁻¹ with a vibration generator and records its amplitude at different frequencies.</p>', parts: [
        { q: 'Calculate the frequency at which the amplitude should be greatest.', m: 2, ans: { a: 2.01, unit: 'Hz', tol: 0.02 }, calc: 'sqrt(40/0.25)/(2*pi)', ms: [['C1', 'f₀ = (1 ÷ 2π)√(k ÷ m)'], ['A1', 'f₀ = (1 ÷ 2π)√160 = 2.0 Hz']] },
        { q: 'Suggest how the student could find the peak more precisely.', m: 2, lines: 3, ms: [['B1', 'Take readings at smaller frequency intervals close to the peak'], ['B1', 'Measure the amplitude against a fixed scale/use a motion sensor, and repeat readings']] }] }
    ]
  });

  /* ---------------- cg6 Gravitational fields and Newton's law ---------------- */
  add('cg6', {
    ex: [
      ['g on the surface of Mars', 'Mars has mass 6.42 × 10²³ kg and radius 3.39 × 10⁶ m. Find the gravitational field strength at its surface.', [
        ['Field of a point mass', '', [`g = ${fr('GM', 'r²')} = ${fr('6.67 × 10⁻¹¹ × 6.42 × 10²³', '(3.39 × 10⁶)²')}`]],
        ['Value', '', [res('g = 3.73 N kg⁻¹: about 38 % of the Earth’s value')]]
      ], { chk: [['G*6.42e23/3.39e6**2', 3.726]] }],
      ['Trap: height above the surface', 'A satellite orbits 6.37 × 10⁶ m above the Earth’s surface (one Earth radius up). What is g there?', [
        ['The tempting answer', 'The trap: using the height, not the distance from the centre.', ['“Same distance as the radius, so same g”  ✗']],
        ['Distance from the centre', '', ['r = R + h = 2R']],
        ['Inverse square', '', [res('g = 9.81 ÷ 2² = 2.45 N kg⁻¹')]]
      ], { chk: [['g/4', 2.45]] }]
    ],
    gaps: [
      { q: 'Two 1000 kg masses are 1.0 m apart.', lines: ['F = Gm₁m₂ ÷ r² = [[6.67e-5]] N'], calc: ['G*1e6'], why: 'Tiny: gravity between everyday objects is negligible.' },
      { q: 'The Moon has mass 7.35 × 10²² kg and radius 1.74 × 10⁶ m.', lines: ['g at its surface = [[1.62]] N kg⁻¹'], calc: ['G*7.35e22/1.74e6**2'], why: 'About a sixth of the Earth’s value.' },
      { q: 'g at a distance 3R from the Earth’s centre', lines: ['= 9.81 ÷ 9 = [[1.09]] N kg⁻¹'], calc: ['g/9'], why: 'g ∝ 1 ÷ r².' }
    ],
    exam: [
      { stem: '<p>A space probe lands on a planet of radius 3.4 × 10⁶ m and measures the gravitational field strength at the surface as 3.7 N kg⁻¹.</p>', parts: [
        { q: 'Define gravitational field strength.', m: 1, lines: 2, ms: [['B1', 'The gravitational force per unit mass acting on a small mass placed at that point']] },
        { q: 'Calculate the mass of the planet.', m: 2, ans: { a: 6.41e23, unit: 'kg', tol: 0.02 }, calc: '3.7*3.4e6**2/G', ms: [['C1', 'M = gr² ÷ G'], ['A1', 'M = 3.7 × (3.4 × 10⁶)² ÷ 6.67 × 10⁻¹¹ = 6.4 × 10²³ kg']] },
        { q: 'Calculate the mean density of the planet.', m: 2, ans: { a: 3895, unit: 'kg m⁻³', tol: 0.02 }, calc: '3.7*3.4e6**2/G/(4/3*pi*3.4e6**3)', ms: [['C1', 'V = ⁴⁄₃πr³ = 1.65 × 10²⁰ m³'], ['A1', 'ρ = M ÷ V = 3.9 × 10³ kg m⁻³']] },
        { q: 'Calculate g at a height of 3.4 × 10⁶ m above the surface.', m: 1, ans: { a: 0.925, unit: 'N kg⁻¹', tol: 0.01 }, calc: '3.7/4', ms: [['B1', 'r doubles, so g = 3.7 ÷ 4 = 0.93 N kg⁻¹']] },
        { q: 'Calculate the weight of the 900 kg probe on the surface.', m: 1, ans: { a: 3330, unit: 'N', tol: 0.01 }, calc: '900*3.7', ms: [['B1', 'W = mg = 900 × 3.7 = 3.3 × 10³ N']] }] },
      { stem: '<p>The Earth (mass 5.97 × 10²⁴ kg) and the Moon (mass 7.35 × 10²² kg) are 3.84 × 10⁸ m apart, centre to centre. At one point on the line between them the resultant gravitational field strength is zero.</p>', parts: [
        { q: 'Calculate the distance of this point from the centre of the Earth.', m: 2, ans: { a: 3.46e8, unit: 'm', tol: 0.02 }, calc: '3.84e8*sqrt(5.97e24/7.35e22)/(1+sqrt(5.97e24/7.35e22))', ms: [['C1', 'GM_E ÷ x² = GM_M ÷ (d − x)², so x ÷ (d − x) = √(M_E ÷ M_M) = 9.01'], ['A1', 'x = 3.46 × 10⁸ m']] },
        { q: 'Explain why this point is much closer to the Moon than to the Earth.', m: 1, lines: 2, ms: [['B1', 'The Moon’s mass is much smaller, so its field is only as strong as the Earth’s at a much smaller distance from it']] }] }
    ]
  });

  /* ---------------- cg7 Kepler's laws and satellites ---------------- */
  add('cg7', {
    ex: [
      ['The geostationary orbit', 'Find the radius and the height above the surface of a geostationary orbit. (GM for the Earth = 3.98 × 10¹⁴ N m² kg⁻¹, period 24 h)', [
        ['Kepler’s third law', 'GMm ÷ r² = mω²r gives r³ = GMT² ÷ 4π².', [`r³ = ${fr('3.98 × 10¹⁴ × 86 400²', '4π²')} = 7.53 × 10²² m³`]],
        ['Radius', '', ['r = 4.22 × 10⁷ m']],
        ['Height', 'The trap: quoting r as the height.', [res('h = r − R = 4.22 × 10⁷ − 6.37 × 10⁶ = 3.58 × 10⁷ m')]]
      ], { chk: [['3.98e14*86400**2/(4*pi**2)', 7.525e22], ['cbrt(3.98e14*86400**2/(4*pi**2))', 4.221e7], ['cbrt(3.98e14*86400**2/(4*pi**2))-6.37e6', 3.584e7]] }],
      ['How the period scales', 'One satellite orbits at four times the radius of another. Compare their periods.', [
        ['T² ∝ r³', '', ['T₂ ÷ T₁ = (r₂ ÷ r₁)^(3/2) = 4^1.5']],
        ['Ratio', '', [res('8 times the period')]]
      ], { chk: [['4**1.5', 8]] }]
    ],
    gaps: [
      { q: 'The radius of an orbit doubles.', lines: ['the period is multiplied by [[2.83]]'], calc: ['2**1.5'], why: 'T ∝ r^(3/2).' },
      { q: 'A satellite orbits the Earth at r = 7.0 × 10⁶ m. (GM = 3.98 × 10¹⁴ N m² kg⁻¹)', lines: ['v = √(GM ÷ r) = [[7540]] m s⁻¹'], calc: ['sqrt(3.98e14/7e6)'], why: 'Lower orbits are faster.' },
      { q: 'Its period is', lines: ['T = 2πr ÷ v = [[5833]] s'], calc: ['2*pi*7e6/sqrt(3.98e14/7e6)'], why: 'About 97 minutes.' }
    ],
    exam: [
      { stem: `<p>The table gives data for two moons of Saturn.</p><table class="tbl"><tr><th>Moon</th><th>orbital radius r / m</th><th>period T / days</th></tr><tr><td>Titan</td><td>1.222 × 10⁹</td><td>15.95</td></tr><tr><td>Rhea</td><td>5.27 × 10⁸</td><td>4.52</td></tr></table>`, parts: [
        { q: 'State Kepler’s first law.', m: 1, lines: 2, ms: [['B1', 'Each planet (moon) moves in an ellipse with the central body at one focus']] },
        { q: 'Calculate T² ÷ r³ for Titan, with T in seconds.', m: 2, ans: { a: 1.041e-15, unit: 's² m⁻³', tol: 0.02 }, calc: '(15.95*86400)**2/1.222e9**3', ms: [['C1', 'T = 15.95 × 86 400 = 1.378 × 10⁶ s'], ['A1', 'T² ÷ r³ = 1.04 × 10⁻¹⁵ s² m⁻³']] },
        { q: 'Show that Rhea gives the same value to 2 significant figures.', m: 1, ans: { a: 1.042e-15, unit: 's² m⁻³', tol: 0.02 }, calc: '(4.52*86400)**2/5.27e8**3', ms: [['B1', '(3.905 × 10⁵)² ÷ (5.27 × 10⁸)³ = 1.04 × 10⁻¹⁵ s² m⁻³']] },
        { q: 'Use T² ÷ r³ = 4π² ÷ GM to calculate the mass of Saturn.', m: 2, ans: { a: 5.69e26, unit: 'kg', tol: 0.02 }, calc: '4*pi**2/(G*(15.95*86400)**2/1.222e9**3)', ms: [['C1', 'M = 4π² ÷ (G × 1.04 × 10⁻¹⁵)'], ['A1', 'M = 5.7 × 10²⁶ kg']] },
        { q: 'Explain why the orbital period of a moon does not depend on its own mass.', m: 1, lines: 2, ms: [['B1', 'The moon’s mass appears in both the gravitational force and mω²r, so it cancels']] }] },
      { stem: '<p>The International Space Station orbits 400 km above the Earth’s surface. (GM = 3.98 × 10¹⁴ N m² kg⁻¹, R = 6.37 × 10⁶ m)</p>', parts: [
        { q: 'Calculate its orbital period in minutes.', m: 2, ans: { a: 92.4, unit: 'min', tol: 0.02 }, calc: '2*pi*sqrt(6.77e6**3/3.98e14)/60', ms: [['C1', 'r = 6.77 × 10⁶ m; T = 2π√(r³ ÷ GM)'], ['A1', 'T = 5.5 × 10³ s = 92 min']] }] }
    ]
  });

  /* ---------------- cg8 Gravitational potential and escape velocity ---------------- */
  add('cg8', {
    ex: [
      ['Escaping the Moon', 'Find the escape velocity from the Moon’s surface (M = 7.35 × 10²² kg, R = 1.74 × 10⁶ m).', [
        ['Energy condition', 'Kinetic energy must at least equal the energy needed to reach infinity.', ['½mv² = GMm ÷ R']],
        ['Escape velocity', '', [`v = √(${fr('2GM', 'R')}) = √(${fr('2 × 6.67 × 10⁻¹¹ × 7.35 × 10²²', '1.74 × 10⁶')})`, res('v = 2.37 × 10³ m s⁻¹')]],
        ['Consequence', '', ['Gas molecules at the Moon’s surface temperature can reach this speed, so it has kept no atmosphere.']]
      ], { chk: [['sqrt(2*G*7.35e22/1.74e6)', 2374]] }],
      ['Trap: work done uses the change in potential', 'The potential at the Earth’s surface is −62.5 MJ kg⁻¹ and at 2R it is −31.3 MJ kg⁻¹. How much energy is needed to lift 10 kg from the surface to 2R?', [
        ['The tempting answer', 'The trap: using the surface potential alone.', ['10 × 62.5 MJ = 625 MJ  ✗ (that is the energy to reach infinity)']],
        ['Change in potential', '', ['ΔV = −31.3 − (−62.5) = +31.2 MJ kg⁻¹']],
        ['Energy', 'W = mΔV.', [res('W = 10 × 31.2 = 312 MJ = 3.1 × 10⁸ J')]]
      ], { chk: [['10*(62.5-31.3)', 312]] }]
    ],
    gaps: [
      { q: 'Find the gravitational potential at the Earth’s surface. (GM = 3.98 × 10¹⁴ N m² kg⁻¹, R = 6.37 × 10⁶ m)', lines: ['V = −GM ÷ R = [[-6.25e7]] J kg⁻¹'], calc: ['-3.98e14/6.37e6'], why: 'Negative: work must be done to take a mass to infinity.' },
      { q: 'At a distance 4R from the Earth’s centre', lines: ['V = [[-1.56e7]] J kg⁻¹'], calc: ['-3.98e14/6.37e6/4'], why: 'V ∝ 1 ÷ r, not 1 ÷ r².' },
      { q: 'Escape velocity from the Earth', lines: ['v = √(2GM ÷ R) = [[1.12e4]] m s⁻¹'], calc: ['sqrt(2*3.98e14/6.37e6)'], why: 'About 11 km s⁻¹.' }
    ],
    exam: [
      { stem: '<p>Mars has mass 6.42 × 10²³ kg and radius 3.39 × 10⁶ m. A 1200 kg probe is to be launched from its surface.</p>', parts: [
        { q: 'Calculate the gravitational potential at the surface of Mars.', m: 2, ans: { a: -1.263e7, unit: 'J kg⁻¹', tol: 0.02 }, calc: '-G*6.42e23/3.39e6', ms: [['C1', 'V = −GM ÷ r'], ['A1', 'V = −1.26 × 10⁷ J kg⁻¹']] },
        { q: 'Calculate the escape velocity from Mars.', m: 2, ans: { a: 5026, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(2*G*6.42e23/3.39e6)', ms: [['C1', '½v² = GM ÷ R'], ['A1', 'v = 5.0 × 10³ m s⁻¹']] },
        { q: 'Calculate the gain in gravitational potential energy when the probe is raised to a distance of 2R from the centre of Mars.', m: 2, ans: { a: 7.58e9, unit: 'J', tol: 0.02 }, calc: '1200*G*6.42e23/(2*3.39e6)', ms: [['C1', 'ΔV = GM ÷ R − GM ÷ 2R = GM ÷ 2R = 6.32 × 10⁶ J kg⁻¹'], ['A1', 'ΔE = 1200 × 6.32 × 10⁶ = 7.6 × 10⁹ J']] },
        { q: 'Explain why gravitational potential is always negative.', m: 1, lines: 2, ms: [['B1', 'Potential is zero at infinity and gravity is attractive, so work must be done on a mass to move it to infinity: the potential everywhere else is below zero']] },
        { q: 'Explain why the escape velocity does not depend on the mass of the probe.', m: 1, lines: 2, ms: [['B1', 'Both the kinetic energy ½mv² and the energy needed GMm ÷ R are proportional to m, so m cancels']] }] }
    ]
  });

  /* ---------------- cg9 Review ---------------- */
  add('cg9', {
    ex: [
      ['Synoptic: a hump-back bridge', 'A car drives over a hump-back bridge whose top is part of a circle of radius 12 m. Above what speed will it leave the road?', [
        ['Forces at the top', 'Weight down, contact force up; the resultant points down to the centre.', ['mg − N = mv² ÷ r']],
        ['Losing contact', 'N falls to zero.', ['v² = gr = 9.81 × 12']],
        ['Speed', '', [res('v = 10.8 m s⁻¹ (about 24 mph)')]]
      ], { chk: [['sqrt(g*12)', 10.85]] }],
      ['Synoptic: SHM from circular motion', 'A peg on a turntable rotating at ω = 3.0 rad s⁻¹ is 0.10 m from the axis. Its shadow on a wall moves back and forth. Describe the shadow’s motion.', [
        ['Projection', 'The shadow shows the x-component of the peg’s position.', ['x = 0.10 cos(3.0t)']],
        ['It is SHM', '', ['amplitude 0.10 m, ω = 3.0 rad s⁻¹']],
        ['Maximum speed and acceleration', '', [res('v_max = ωA = 0.30 m s⁻¹, a_max = ω²A = 0.90 m s⁻²'), 'Its maximum acceleration equals the peg’s centripetal acceleration.']]
      ], { chk: [['3*0.1', 0.3], ['9*0.1', 0.9]] }]
    ],
    gaps: [
      { q: 'A car of mass 900 kg crosses a hump of radius 20 m at 10 m s⁻¹.', lines: ['contact force at the top = m(g − v² ÷ r) = [[4329]] N'], calc: ['900*(g-100/20)'], why: 'Less than its weight, 8829 N: passengers feel lighter.' },
      { q: 'A satellite in circular orbit has r = 2.0 × 10⁷ m around the Earth (GM = 3.98 × 10¹⁴ N m² kg⁻¹).', lines: ['centripetal acceleration = GM ÷ r² = [[0.995]] m s⁻²'], calc: ['3.98e14/(2e7)**2'], why: 'Equal to the gravitational field strength there.' }
    ],
    exam: [
      { stem: '<p>A small moon moves in a circular orbit of radius 4.0 × 10⁸ m around a planet, with a period of 2.4 × 10⁶ s.</p>', parts: [
        { q: 'Calculate the orbital speed of the moon.', m: 1, ans: { a: 1047, unit: 'm s⁻¹', tol: 0.01 }, calc: '2*pi*4e8/2.4e6', ms: [['B1', 'v = 2πr ÷ T = 1.0 × 10³ m s⁻¹']] },
        { q: 'Calculate the centripetal acceleration of the moon.', m: 1, ans: { a: 2.74e-3, unit: 'm s⁻²', tol: 0.02 }, calc: '(2*pi*4e8/2.4e6)**2/4e8', ms: [['B1', 'a = v² ÷ r = 2.7 × 10⁻³ m s⁻²']] },
        { q: 'Calculate the mass of the planet.', m: 2, ans: { a: 6.58e24, unit: 'kg', tol: 0.02 }, calc: '4*pi**2*(4e8)**3/(G*(2.4e6)**2)', ms: [['C1', 'M = 4π²r³ ÷ GT²'], ['A1', 'M = 6.6 × 10²⁴ kg']] },
        { q: 'State the gravitational field strength of the planet at the moon’s orbit, and explain your answer.', m: 1, lines: 2, ms: [['B1', '2.7 × 10⁻³ N kg⁻¹: gravity is the only force, so g at the orbit equals the centripetal acceleration']] }] },
      { stem: '<p>A pendulum of length 1.00 m and a mass on a spring each have a period of 2.0 s on the Earth. Both are taken to a planet where g = 3.7 N kg⁻¹.</p>', parts: [
        { q: 'Calculate the period of the pendulum on the planet.', m: 2, ans: { a: 3.27, unit: 's', tol: 0.02 }, calc: '2*pi*sqrt(1/3.7)', ms: [['C1', 'T = 2π√(L ÷ g)'], ['A1', 'T = 2π√(1.00 ÷ 3.7) = 3.3 s']] },
        { q: 'State and explain whether the period of the mass on the spring changes.', m: 2, lines: 3, ms: [['B1', 'No change'], ['B1', 'T = 2π√(m ÷ k) does not depend on g: only the equilibrium extension changes']] }] },
      { stem: '<p>A 200 kg satellite is moved from a circular orbit of radius 7.0 × 10⁶ m to a circular orbit of radius 4.2 × 10⁷ m around the Earth. (GM = 3.98 × 10¹⁴ N m² kg⁻¹)</p>', parts: [
        { q: 'Calculate the increase in gravitational potential energy.', m: 2, ans: { a: 9.48e9, unit: 'J', tol: 0.02 }, calc: '3.98e14*200*(1/7e6-1/4.2e7)', ms: [['C1', 'ΔE_p = GMm(1/r₁ − 1/r₂)'], ['A1', 'ΔE_p = 9.5 × 10⁹ J']] },
        { q: 'Show that the kinetic energy of a satellite in circular orbit is GMm ÷ 2r, and hence calculate the change in its kinetic energy.', m: 2, ans: { a: -4.74e9, unit: 'J', tol: 0.02 }, calc: '-3.98e14*200*(1/7e6-1/4.2e7)/2', ms: [['C1', 'mv² ÷ r = GMm ÷ r², so ½mv² = GMm ÷ 2r'], ['A1', 'ΔE_k = −4.7 × 10⁹ J (it slows down)']] },
        { q: 'Hence state the minimum energy that the rockets must supply.', m: 2, ans: { a: 4.74e9, unit: 'J', tol: 0.02 }, calc: '3.98e14*200*(1/7e6-1/4.2e7)/2', ms: [['C1', 'energy = ΔE_p + ΔE_k = 9.5 × 10⁹ − 4.7 × 10⁹'], ['A1', '4.7 × 10⁹ J']] }] }
    ]
  });

  /* ---- top-up fill-the-gaps ---- */
  add('cg9', { gaps: [
    { q: 'A simple pendulum is 0.80 m long.', lines: ['T = 2π√(L ÷ g) = [[1.79]] s'], calc: ['2*pi*sqrt(0.8/g)'], why: 'Independent of the mass of the bob.' }
  ] });
})();
