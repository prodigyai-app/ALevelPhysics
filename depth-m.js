/* Motion (m1–m13): extra worked examples, fill-the-gaps and exam-style questions.
   g = 9.81 m s⁻². Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const tbl = (head, rows) => `<div class="tbl-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const mp = t => `<b>${t}</b>`;

  /* ---------------- m1 Distance, displacement, speed and velocity ---------------- */
  add('m1', {
    ex: [
      ['Two legs of a walk', 'A walker goes 300 m east and then 400 m north, taking 250 s in total. Find the distance, the displacement, the average speed and the average velocity.', [
        ['Distance', 'A scalar: add the lengths.', ['distance = 300 + 400 = 700 m']],
        ['Displacement', 'A vector: the straight line from start to finish.', ['size = √(300² + 400²) = 500 m', `angle = tan⁻¹(${fr('400', '300')}) = 53° north of east`]],
        ['Average speed and average velocity', '', [`speed = ${fr('700', '250')} = 2.8 m s⁻¹`, res('velocity = 500 ÷ 250 = 2.0 m s⁻¹ at 53° north of east')]]
      ], { chk: [['sqrt(300**2+400**2)', 500], ['atand(400/300)', 53.13], ['700/250', 2.8], ['500/250', 2.0]] }],
      ['Trap: averaging two speeds', 'A van drives 12 km to a depot at 20 m s⁻¹ and returns along the same road at 30 m s⁻¹. Find its average speed and average velocity for the round trip.', [
        ['The tempting answer', 'Averaging the speeds gives 25 m s⁻¹, but the van spends longer at the lower speed.', ['(20 + 30) ÷ 2 = 25 m s⁻¹  ✗']],
        ['Times for each leg', '', ['out: 12 000 ÷ 20 = 600 s', 'back: 12 000 ÷ 30 = 400 s']],
        ['Average speed', 'Total distance ÷ total time.', [`${fr('24 000', '1000')}`, res('average speed = 24 m s⁻¹')]],
        ['Average velocity', 'It finishes where it started.', [res('displacement = 0, so average velocity = 0')]]
      ], { chk: [['12000/20', 600], ['12000/30', 400], ['24000/1000', 24]] }]
    ],
    gaps: [
      { q: 'Convert 54 km h⁻¹ into m s⁻¹.', lines: ['54 000 m ÷ 3600 s = [[15]] m s⁻¹'], calc: ['54000/3600'], why: 'Divide km h⁻¹ by 3.6.' },
      { q: 'A runner completes one 400 m lap of a track in 52 s.', lines: ['average speed = [[7.69]] m s⁻¹', 'average velocity = [[0]] m s⁻¹'], calc: ['400/52', '0'], why: 'Back at the start, so the displacement is zero.' },
      { q: 'A ship sails 3.0 km north and then 4.0 km east.', lines: ['displacement = √(3.0² + 4.0²) = [[5]] km', 'angle east of north = tan⁻¹(4.0 ÷ 3.0) = [[53.1]]°'], calc: ['sqrt(9+16)', 'atand(4/3)'], why: 'Give both the size and the direction of a displacement.' }
    ],
    exam: [
      { stem: '<p>A boat crosses a river 120 m wide. It is steered straight across, moving at 1.5 m s⁻¹ relative to the water. The river flows at 0.80 m s⁻¹.</p>', parts: [
        { q: 'Calculate the time taken to cross the river.', m: 1, ans: { a: 80, unit: 's', tol: 0.01 }, calc: '120/1.5', ms: [['B1', 't = 120 ÷ 1.5 = 80 s']] },
        { q: 'Calculate the magnitude of the boat’s velocity relative to the bank.', m: 2, ans: { a: 1.70, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(1.5**2+0.8**2)', ms: [['C1', 'The two velocities are perpendicular: v = √(1.5² + 0.80²)'], ['A1', 'v = 1.7 m s⁻¹']] },
        { q: 'Calculate how far downstream the boat lands.', m: 1, ans: { a: 64, unit: 'm', tol: 0.01 }, calc: '0.80*80', ms: [['B1', '0.80 × 80 = 64 m']] },
        { q: 'Explain why the current does not change the time taken to cross.', m: 1, lines: 2, ms: [['B1', 'The current is perpendicular to the crossing direction, so it does not change the component of velocity across the river']] }] }
    ]
  });

  /* ---------------- m2 Acceleration ---------------- */
  add('m2', {
    ex: [
      ['Trap: deceleration is a negative acceleration', 'A car slows from 25 m s⁻¹ to 10 m s⁻¹ in 5.0 s. Find its acceleration.', [
        ['Use the definition', 'a = (v − u) ÷ t, with final minus initial.', [`a = ${fr('10 − 25', '5.0')}`]],
        ['Keep the sign', 'The trap: writing (25 − 10) ÷ 5 = +3.0 m s⁻², which describes speeding up.', [res('a = −3.0 m s⁻² (a deceleration of 3.0 m s⁻²)')]]
      ], { chk: [['(10-25)/5', -3]] }],
      ['Acceleration from two light gates', 'A card 5.0 cm long on a trolley passes through light gate 1 in 0.050 s and light gate 2 in 0.025 s. The trolley takes 0.40 s to travel between the gates. Find its acceleration.', [
        ['Speed at each gate', 'Length of card ÷ time to pass through the gate.', ['v₁ = 0.050 ÷ 0.050 = 1.0 m s⁻¹', 'v₂ = 0.050 ÷ 0.025 = 2.0 m s⁻¹']],
        ['Acceleration', '', [`a = ${fr('2.0 − 1.0', '0.40')}`, res('a = 2.5 m s⁻²')]],
        ['Limitation', '', ['Each speed is an average over the card, so a shorter card gives values closer to the instantaneous speed.']]
      ], { chk: [['0.05/0.05', 1.0], ['0.05/0.025', 2.0], ['(2-1)/0.4', 2.5]] }]
    ],
    gaps: [
      { q: 'A car reaches 100 km h⁻¹ from rest in 8.0 s.', lines: ['100 km h⁻¹ = [[27.8]] m s⁻¹', 'a = 27.8 ÷ 8.0 = [[3.47]] m s⁻²'], calc: ['100/3.6', '100/3.6/8'], why: 'Convert to SI units before using a = Δv ÷ t.' },
      { q: 'A ball hits a wall at 12 m s⁻¹ and rebounds at 8.0 m s⁻¹ along the same line. Contact lasts 0.020 s. Take the original direction as positive.', lines: ['Δv = −8.0 − 12 = [[-20]] m s⁻¹', 'magnitude of acceleration = [[1000]] m s⁻²'], calc: ['-8-12', '20/0.02'], why: 'The velocity reverses, so the speeds add.' }
    ],
    exam: [
      { stem: '<p>A trolley runs down a ramp through two light gates. A card of length 10.0 cm on the trolley blocks gate A for 0.125 s and gate B for 0.080 s. The trolley takes 0.60 s to travel from A to B.</p>', parts: [
        { q: 'Calculate the speed of the trolley at gate A.', m: 1, ans: { a: 0.80, unit: 'm s⁻¹', tol: 0.01 }, calc: '0.100/0.125', ms: [['B1', '0.100 ÷ 0.125 = 0.80 m s⁻¹']] },
        { q: 'Calculate the speed of the trolley at gate B.', m: 1, ans: { a: 1.25, unit: 'm s⁻¹', tol: 0.01 }, calc: '0.100/0.080', ms: [['B1', '0.100 ÷ 0.080 = 1.25 m s⁻¹']] },
        { q: 'Calculate the acceleration of the trolley.', m: 2, ans: { a: 0.75, unit: 'm s⁻²', tol: 0.02 }, calc: '(0.100/0.080-0.100/0.125)/0.60', ms: [['C1', 'a = (1.25 − 0.80) ÷ 0.60'], ['A1', 'a = 0.75 m s⁻²']] },
        { q: 'Explain why the speeds calculated are averages, and how the method could be improved.', m: 1, lines: 2, ms: [['B1', 'The trolley speeds up while the card passes through each gate; a shorter card gives speeds closer to the instantaneous values']] }] }
    ]
  });

  /* ---------------- m3 Displacement–time graphs ---------------- */
  add('m3', {
    ex: [
      ['A tangent to a curve', 'A trolley moves so that s = 1.5t² (s in m, t in s). A tangent drawn to the s–t graph at t = 2.0 s passes through (1.0 s, 0.0 m) and (3.0 s, 12.0 m). Find the velocity at t = 2.0 s.', [
        ['Gradient of the tangent', 'Use two points on the tangent, well apart.', [`v = ${fr('12.0 − 0.0', '3.0 − 1.0')}`, res('v = 6.0 m s⁻¹')]],
        ['Check', 'For s = 1.5t², the acceleration is 3.0 m s⁻², so v = at.', ['v = 3.0 × 2.0 = 6.0 m s⁻¹ ✓']]
      ], { chk: [['12/2', 6], ['2*1.5*2', 6]] }],
      ['A journey there and back', 'A student walks from 0 m to 20 m in 10 s, stands still until 15 s, then walks back to 5 m, arriving at 25 s. Find each velocity, the average speed and the average velocity.', [
        ['Gradients', '', ['0–10 s: 20 ÷ 10 = 2.0 m s⁻¹', '10–15 s: 0', '15–25 s: (5 − 20) ÷ 10 = −1.5 m s⁻¹']],
        ['Average speed', 'Distance includes the walk back.', [`${fr('20 + 15', '25')} = 1.4 m s⁻¹`]],
        ['Average velocity', 'Displacement is final position minus start.', [res('5 ÷ 25 = 0.20 m s⁻¹')]]
      ], { chk: [['20/10', 2], ['(5-20)/10', -1.5], ['35/25', 1.4], ['5/25', 0.2]] }]
    ],
    gaps: [
      { q: 'A straight line on an s–t graph passes through (2.0 s, 3.0 m) and (6.0 s, 15.0 m).', lines: ['velocity = (15.0 − 3.0) ÷ (6.0 − 2.0) = [[3]] m s⁻¹'], calc: ['12/4'], why: 'A straight line means constant velocity.' },
      { q: 'A tangent to an s–t curve passes through (0, −4.0 m) and (5.0 s, 16.0 m).', lines: ['instantaneous velocity = [[4]] m s⁻¹'], calc: ['20/5'], why: 'The tangent may cross the axes outside the data.' }
    ],
    exam: [
      { stem: '<p>A trolley is released from rest. Its displacement is recorded.</p>' + tbl(['t / s', '0', '0.50', '1.00', '1.50', '2.00'], [['s / m', '0', '0.10', '0.40', '0.90', '1.60']]), parts: [
        { q: 'Show that the data are consistent with uniform acceleration from rest.', m: 2, lines: 3, ms: [['M1', 'For uniform acceleration from rest, s = ½at², so s ÷ t² should be constant'], ['A1', 's ÷ t² = 0.40 m s⁻² for every reading (e.g. 0.10 ÷ 0.25 and 1.60 ÷ 4.00)']] },
        { q: 'Determine the acceleration.', m: 1, ans: { a: 0.80, unit: 'm s⁻²', tol: 0.01 }, calc: '2*1.60/2**2', ms: [['B1', '½a = 0.40, so a = 0.80 m s⁻²']] },
        { q: 'Determine the velocity at t = 2.00 s.', m: 1, ans: { a: 1.6, unit: 'm s⁻¹', tol: 0.01 }, calc: '0.80*2', ms: [['B1', 'v = at = 0.80 × 2.00 = 1.6 m s⁻¹ (or the gradient of a tangent)']] }] }
    ]
  });

  /* ---------------- m4 Velocity–time and acceleration–time graphs ---------------- */
  add('m4', {
    ex: [
      ['Area below the axis', 'An object’s velocity changes uniformly from +6.0 m s⁻¹ to −4.0 m s⁻¹ in 10 s. Find its displacement and the distance it travels.', [
        ['When does it stop?', 'Find the acceleration, then the time at which v = 0.', ['a = (−4.0 − 6.0) ÷ 10 = −1.0 m s⁻²', 'v = 0 when 6.0 − 1.0t = 0, so at t = 6.0 s']],
        ['Areas', 'Area above the axis is forward displacement; area below is backward.', ['forward: ½ × 6.0 × 6.0 = 18 m', 'backward: ½ × 4.0 × 4.0 = 8.0 m']],
        ['Combine', '', [res('displacement = 18 − 8 = 10 m forwards;  distance = 18 + 8 = 26 m')]]
      ], { chk: [['(-4-6)/10', -1], ['0.5*6*6', 18], ['0.5*4*4', 8]] }],
      ['Trap: the area under an a–t graph is a change in velocity', 'An object moving at 1.0 m s⁻¹ accelerates at 2.0 m s⁻² for 3.0 s, then at zero for 2.0 s, then at −1.5 m s⁻² for 4.0 s. Find its velocity at the end of each stage.', [
        ['Stage 1', 'Δv = area = 2.0 × 3.0 = 6.0 m s⁻¹. The trap: forgetting to add the starting velocity.', ['v = 1.0 + 6.0 = 7.0 m s⁻¹']],
        ['Stage 2', 'No area, no change.', ['v = 7.0 m s⁻¹']],
        ['Stage 3', '', ['Δv = −1.5 × 4.0 = −6.0 m s⁻¹', res('v = 1.0 m s⁻¹')]]
      ], { chk: [['1+2*3', 7], ['7-1.5*4', 1]] }]
    ],
    gaps: [
      { q: 'A car speeds up uniformly from 4.0 m s⁻¹ to 12 m s⁻¹ in 5.0 s.', lines: ['distance = area of trapezium = ½(4.0 + 12) × 5.0 = [[40]] m'], calc: ['0.5*16*5'], why: 'Or average velocity × time: 8.0 × 5.0.' },
      { q: 'A v–t line passes through (1.0 s, 3.0 m s⁻¹) and (5.0 s, 15 m s⁻¹).', lines: ['acceleration = [[3]] m s⁻²'], calc: ['12/4'], why: 'The gradient of a v–t graph.' }
    ],
    exam: [
      { stem: '<p>A lift starts from rest and accelerates uniformly to 2.0 m s⁻¹ in 2.0 s. It moves at constant speed for 6.0 s and then decelerates uniformly to rest in 3.0 s.</p>', parts: [
        { q: 'Calculate the total distance travelled by the lift.', m: 2, ans: { a: 17, unit: 'm', tol: 0.01 }, calc: '0.5*2*2+2*6+0.5*2*3', ms: [['C1', 'areas: 2.0 m + 12 m + 3.0 m'], ['A1', 'total = 17 m']] },
        { q: 'Calculate the deceleration of the lift.', m: 1, ans: { a: 0.667, unit: 'm s⁻²', tol: 0.02 }, calc: '2/3', ms: [['B1', '2.0 ÷ 3.0 = 0.67 m s⁻²']] },
        { q: 'Describe the acceleration–time graph for the journey.', m: 1, lines: 2, ms: [['B1', '+1.0 m s⁻² for 2.0 s, then zero for 6.0 s, then −0.67 m s⁻² for 3.0 s (three horizontal lines)']] }] }
    ]
  });

  /* ---------------- m5 Linking displacement, velocity and acceleration graphs ---------------- */
  add('m5', {
    ex: [
      ['A model answer: moving between the three graphs', 'State how each graph of motion is obtained from the others. (4 marks)', [
        ['From displacement–time', '', [`The ${mp('gradient of an s–t graph is the velocity')}.`]],
        ['From velocity–time', 'Two links.', [`The ${mp('gradient of a v–t graph is the acceleration')}; the ${mp('area under a v–t graph is the displacement')}.`]],
        ['From acceleration–time', '', [`The ${mp('area under an a–t graph is the change in velocity')}, not the velocity itself.`]]
      ], { desc: true }],
      ['A bouncing ball in numbers', 'A ball is dropped from 1.25 m onto a hard floor. It rebounds to a height of 0.80 m and is in contact with the floor for 0.050 s. Find the speeds just before and after the bounce, and the average acceleration during contact. (Upwards positive.)', [
        ['Speed before', 'v² = u² + 2as from rest.', ['v = √(2 × 9.81 × 1.25) = 4.95 m s⁻¹, so velocity = −4.95 m s⁻¹']],
        ['Speed after', 'Rising to 0.80 m, the reverse of falling from it.', ['u = √(2 × 9.81 × 0.80) = 3.96 m s⁻¹, upwards']],
        ['Average acceleration', 'The velocity reverses, so Δv is the sum of the speeds.', [`a = ${fr('3.96 − (−4.95)', '0.050')}`, res('a = 178 m s⁻² upwards (about 18g)')]],
        ['On the graphs', '', ['v–t: a line of gradient −9.81 down to −4.95, a near-vertical jump to +3.96, then gradient −9.81 again. The steep jump is the large upward acceleration.']]
      ], { chk: [['sqrt(2*g*1.25)', 4.95], ['sqrt(2*g*0.8)', 3.96], ['(sqrt(2*g*0.8)+sqrt(2*g*1.25))/0.05', 178.3]] }],
      ['Trap: speed against velocity on a graph', 'A ball is thrown straight up at 9.81 m s⁻¹ and caught at the same height 2.0 s later. Describe its velocity–time graph and its speed–time graph.', [
        ['Velocity–time', 'Upwards positive; the acceleration is −9.81 m s⁻² throughout.', ['a straight line from +9.81 m s⁻¹ at t = 0 to −9.81 m s⁻¹ at t = 2.0 s, crossing zero at 1.0 s']],
        ['Speed–time', 'The trap: drawing the same straight line. Speed is never negative.', ['a V shape: falling to 0 at 1.0 s, then rising back to 9.81 m s⁻¹']],
        ['Displacement–time', '', [res('a parabola with its maximum (4.9 m) at 1.0 s, where the v–t line crosses zero')]]
      ], { chk: [['9.81/9.81', 1], ['9.81**2/(2*g)', 4.905]] }]
    ],
    gaps: [
      { q: 'A ball is dropped from 1.25 m.', lines: ['v = √(2 × 9.81 × 1.25) = [[4.95]] m s⁻¹'], calc: ['sqrt(2*g*1.25)'], why: 'From v² = u² + 2as with u = 0.' },
      { q: 'An a–t graph shows 2.0 m s⁻² for 4.0 s.', lines: ['change in velocity = [[8]] m s⁻¹'], calc: ['2*4'], why: 'The area under an a–t graph.' }
    ],
    exam: [
      { stem: '<p>The speed of a cyclist starting from rest is recorded every 2.0 s.</p>' + tbl(['t / s', '0', '2.0', '4.0', '6.0', '8.0', '10.0'], [['v / m s⁻¹', '0', '3.0', '5.4', '7.0', '8.0', '8.4']]), parts: [
        { q: 'Describe how the acceleration of the cyclist changes during the 10 s.', m: 1, lines: 2, ms: [['B1', 'The acceleration is greatest at the start and decreases (the increase in speed in each 2 s interval gets smaller)']] },
        { q: 'Estimate the distance travelled in the 10 s, using the data.', m: 2, ans: { a: 55.2, unit: 'm', tol: 0.03 }, calc: '2*(0/2+3+5.4+7+8+8.4/2)', ms: [['C1', 'area under the v–t graph, e.g. trapezia of width 2.0 s: 2.0 × (0 + 3.0 + 5.4 + 7.0 + 8.0 + 8.4 ÷ 2)… or equivalent'], ['A1', 'about 55 m']] },
        { q: 'State and explain whether your estimate is too large or too small.', m: 1, lines: 2, ms: [['B1', 'Too small: the v–t graph curves (concave downwards), so straight lines joining the points lie below the curve']] }] }
    ]
  });

  /* ---------------- m6 Deriving the equations of motion ---------------- */
  add('m6', {
    ex: [
      ['Deriving a fifth equation', 'Show that s = vt − ½at² for uniform acceleration.', [
        ['Start from two known equations', '', ['v = u + at, so u = v − at', 's = ut + ½at²']],
        ['Substitute for u', '', ['s = (v − at)t + ½at²', 's = vt − at² + ½at²']],
        ['Simplify', '', [res('s = vt − ½at²: the equation that leaves out u')]]
      ], { desc: true }],
      ['Two methods agree', 'A car speeds up uniformly from 4.0 m s⁻¹ to 16 m s⁻¹ in 6.0 s. Find the distance travelled from the area under the v–t graph, then check it with two equations of motion.', [
        ['Area', 'A trapezium.', ['s = ½(4.0 + 16) × 6.0 = 60 m']],
        ['Acceleration', '', ['a = (16 − 4.0) ÷ 6.0 = 2.0 m s⁻²']],
        ['Check with s = ut + ½at²', '', ['s = 4.0 × 6.0 + ½ × 2.0 × 6.0² = 24 + 36 = 60 m ✓']],
        ['Check with v² = u² + 2as', '', [res('16² = 4.0² + 2 × 2.0 × 60: 256 = 16 + 240 ✓')]]
      ], { chk: [['0.5*20*6', 60], ['12/6', 2], ['4*6+0.5*2*36', 60], ['16+2*2*60', 256]] }]
    ],
    gaps: [
      { q: 'An object has u = 3.0 m s⁻¹ and a = 2.0 m s⁻² for 4.0 s.', lines: ['v = u + at = [[11]] m s⁻¹', 's = ut + ½at² = [[28]] m'], calc: ['3+2*4', '3*4+0.5*2*16'], why: 'Check: s = ½(u + v)t = ½ × 14 × 4.0 = 28 m.' }
    ],
    exam: [
      { stem: '<p>An object moves along a straight line with initial velocity 5.0 m s⁻¹ and a constant acceleration of −2.0 m s⁻².</p>', parts: [
        { q: 'State the condition needed for the equations of motion to apply.', m: 1, lines: 1, ms: [['B1', 'The acceleration must be constant (uniform) and the motion in a straight line']] },
        { q: 'Calculate the earlier time at which the displacement is 4.0 m.', m: 3, ans: { a: 1.0, unit: 's', tol: 0.01 }, calc: '(5-sqrt(25-16))/2', ms: [['C1', '4.0 = 5.0t − ½ × 2.0 × t²'], ['C1', 't² − 5t + 4 = 0, so (t − 1)(t − 4) = 0'], ['A1', 't = 1.0 s']] },
        { q: 'Explain the meaning of the second solution of the equation.', m: 1, lines: 2, ms: [['B1', 'At t = 4.0 s the object passes the same point again, moving backwards after stopping at t = 2.5 s']] }] }
    ]
  });

  /* ---------------- m7 Solving problems with the equations of motion ---------------- */
  add('m7', {
    ex: [
      ['Two stages', 'A car accelerates from rest at 2.0 m s⁻² for 8.0 s, then brakes uniformly at 4.0 m s⁻² until it stops. Find the total distance and the total time.', [
        ['Stage 1', 'Treat each stage separately; the end of one is the start of the next.', ['v = 0 + 2.0 × 8.0 = 16 m s⁻¹', 's₁ = ½ × 2.0 × 8.0² = 64 m']],
        ['Stage 2', 'u = 16 m s⁻¹, v = 0, a = −4.0 m s⁻².', ['t₂ = 16 ÷ 4.0 = 4.0 s', 's₂ = 16² ÷ (2 × 4.0) = 32 m']],
        ['Totals', '', [res('distance = 96 m; time = 12 s')]]
      ], { chk: [['2*8', 16], ['0.5*2*64', 64], ['16/4', 4], ['256/8', 32]] }],
      ['Trap: a car does not reverse', 'A car moving at 20 m s⁻¹ brakes with a deceleration of 2.5 m s⁻². How far does it travel in the next 10 s?', [
        ['The tempting answer', 'Put t = 10 s straight into the equation.', ['s = 20 × 10 − ½ × 2.5 × 10² = 75 m  ✗']],
        ['When does it stop?', 'Brakes cannot make a car go backwards.', ['t = 20 ÷ 2.5 = 8.0 s']],
        ['Distance', 'After 8.0 s it is at rest.', [`s = ${fr('20²', '2 × 2.5')}`, res('s = 80 m')]]
      ], { chk: [['20*10-0.5*2.5*100', 75], ['20/2.5', 8], ['400/5', 80]] }]
    ],
    gaps: [
      { q: 'An object starts from rest and accelerates at 3.0 m s⁻² for 24 m.', lines: ['v = √(2as) = [[12]] m s⁻¹', 't = v ÷ a = [[4]] s'], calc: ['sqrt(2*3*24)', '12/3'], why: 'No time given: use v² = u² + 2as first.' },
      { q: 'A car stops from 30 m s⁻¹ in 75 m.', lines: ['a = (0 − 30²) ÷ (2 × 75) = [[-6]] m s⁻²'], calc: ['-900/150'], why: 'Negative: a deceleration.' }
    ],
    exam: [
      { stem: '<p>A ball is rolled up a long slope at 4.0 m s⁻¹. It decelerates uniformly at 1.6 m s⁻² while going up and accelerates at 1.6 m s⁻² down the slope.</p>', parts: [
        { q: 'Calculate how far up the slope the ball travels before stopping.', m: 2, ans: { a: 5.0, unit: 'm', tol: 0.01 }, calc: '4**2/(2*1.6)', ms: [['C1', '0 = 4.0² − 2 × 1.6 × s'], ['A1', 's = 5.0 m']] },
        { q: 'Calculate the time taken for the ball to return to its starting point.', m: 2, ans: { a: 5.0, unit: 's', tol: 0.01 }, calc: '2*4/1.6', ms: [['C1', 'time to stop = 4.0 ÷ 1.6 = 2.5 s'], ['A1', 'the motion is symmetrical, so 2 × 2.5 = 5.0 s']] },
        { q: 'Calculate the speed of the ball 3.0 s after it was rolled.', m: 1, ans: { a: 0.80, unit: 'm s⁻¹', tol: 0.02 }, calc: 'abs(4-1.6*3)', ms: [['B1', 'v = 4.0 − 1.6 × 3.0 = −0.80 m s⁻¹: 0.80 m s⁻¹ down the slope']] }] }
    ]
  });

  /* ---------------- m8 Acceleration of free fall ---------------- */
  add('m8', {
    ex: [
      ['Trap: dropped from something that is moving', 'A balloon rises at a steady 5.0 m s⁻¹. A sandbag is released when the balloon is 40 m above the ground. How long does the sandbag take to reach the ground?', [
        ['Initial velocity', 'The trap: taking u = 0. The sandbag shares the balloon’s velocity when released.', ['u = +5.0 m s⁻¹ (upwards positive), a = −9.81 m s⁻², s = −40 m']],
        ['Set up the equation', 's = ut + ½at².', ['−40 = 5.0t − 4.905t²', '4.905t² − 5.0t − 40 = 0']],
        ['Solve', 'Take the positive root.', [`t = ${fr('5.0 + √(25 + 784.8)', '9.81')}`, res('t = 3.4 s')]]
      ], { chk: [['(5+sqrt(25+4*4.905*40))/9.81', 3.41]] }],
      ['Free fall is not uniform motion', 'A stone is dropped from 20 m. How long does it take to fall the first 10 m and the second 10 m?', [
        ['Time for the whole fall', '', ['t = √(2 × 20 ÷ 9.81) = 2.02 s']],
        ['Time for the first 10 m', '', ['t = √(2 × 10 ÷ 9.81) = 1.43 s']],
        ['Time for the second 10 m', '', [res('2.02 − 1.43 = 0.59 s: the stone is moving much faster in the second half')]]
      ], { chk: [['sqrt(40/g)', 2.019], ['sqrt(20/g)', 1.428], ['sqrt(40/g)-sqrt(20/g)', 0.591]] }]
    ],
    gaps: [
      { q: 'An object is dropped from 5.0 m.', lines: ['t = √(2s ÷ g) = [[1.01]] s', 'v = gt = [[9.9]] m s⁻¹'], calc: ['sqrt(10/g)', 'g*sqrt(10/g)'], why: 'Or v = √(2gs).' },
      { q: 'A ball is thrown straight up at 9.81 m s⁻¹.', lines: ['maximum height = u² ÷ 2g = [[4.905]] m', 'time to the top = u ÷ g = [[1]] s'], calc: ['9.81**2/(2*g)', '9.81/g'], why: 'At the top v = 0, but a is still −9.81 m s⁻².' }
    ],
    exam: [
      { stem: '<p>A hot-air balloon rises vertically at a steady 3.0 m s⁻¹. A passenger drops a camera over the side when the basket is 25 m above the ground. Ignore air resistance.</p>', parts: [
        { q: 'State the velocity of the camera just after it is released.', m: 1, lines: 1, ms: [['B1', '3.0 m s⁻¹ upwards']] },
        { q: 'Calculate the time taken for the camera to reach the ground.', m: 3, ans: { a: 2.58, unit: 's', tol: 0.02 }, calc: '(3+sqrt(9+2*g*25))/g', ms: [['C1', '−25 = 3.0t − 4.905t² (upwards positive)'], ['C1', '4.905t² − 3.0t − 25 = 0'], ['A1', 't = 2.6 s']] },
        { q: 'Calculate the speed of the camera when it hits the ground.', m: 1, ans: { a: 22.4, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(9+2*g*25)', ms: [['B1', 'v² = 3.0² + 2 × 9.81 × 25, v = 22 m s⁻¹']] }] }
    ]
  });

  /* ---------------- m9 Determining the acceleration of free fall ---------------- */
  add('m9', {
    ex: [
      ['g from a light gate', 'A ball of diameter 2.50 cm is dropped from rest through a light gate placed a height h below the release point.' + tbl(['h / m', '0.200', '0.400', '0.600', '0.800'], [['time to pass the gate / ms', '12.6', '8.92', '7.29', '6.31']]) + 'Find g.', [
        ['Speed at the gate', 'v = diameter ÷ time.', ['v = 0.0250 ÷ 0.0126 = 1.98 m s⁻¹ … v = 0.0250 ÷ 0.00631 = 3.96 m s⁻¹']],
        ['Choose a straight-line graph', 'From rest, v² = 2gh.', ['plot v² against h: gradient = 2g']],
        ['Gradient', 'Using the first and last points.', [`v² values 3.94 and 15.70 m² s⁻²: gradient = ${fr('15.70 − 3.94', '0.800 − 0.200')} = 19.6 m s⁻²`]],
        ['Result', '', [res('g = 19.6 ÷ 2 = 9.80 m s⁻²')]]
      ], { chk: [['0.025/0.0126', 1.984], ['(0.025/0.00631)**2', 15.70], ['(0.025/0.0126)**2', 3.937], ['((0.025/0.00631)**2-(0.025/0.0126)**2)/0.6', 19.6], ['((0.025/0.00631)**2-(0.025/0.0126)**2)/1.2', 9.80]] }],
      ['Trap: a systematic delay', 'In a trapdoor experiment, the electromagnet takes 0.010 s to release the ball after the timer starts. For h = 1.000 m the true fall time is 0.452 s. What value of g does a student get from g = 2h ÷ t², and how can the error be removed?', [
        ['Recorded time', '', ['t = 0.452 + 0.010 = 0.462 s']],
        ['Calculated g', '', [`g = ${fr('2 × 1.000', '0.462²')}`, res('g = 9.37 m s⁻², about 4 % too small')]],
        ['Remove it with a graph', 't = √(2/g) × √h + delay.', ['Plot t against √h for several heights. The gradient is √(2/g), unaffected by the delay; the delay appears as the intercept.']]
      ], { chk: [['sqrt(2/g)', 0.4515], ['2/0.462**2', 9.37], ['(9.81-2/0.462**2)/9.81*100', 4.5, 0.05]] }],
      ['A model answer: evaluating the stopwatch method', 'A student drops a ball from 1.00 m and times it with a stopwatch. Evaluate this method and suggest improvements. (4 marks)', [
        ['Main problem', '', [`The fall takes only about 0.45 s, while ${mp('human reaction time is about 0.2 s')}, so the ${mp('percentage uncertainty in t is very large')}; t is squared, which doubles it.`]],
        ['Systematic effect', '', ['Reaction time at the start and at the end may not cancel, so there can be a systematic error as well as scatter.']],
        ['Improvements', '', [`Use ${mp('electronic timing')} (light gates or an electromagnet and trapdoor). ${mp('Use several heights and plot a graph')}, so systematic delays appear as an intercept, not an error in g.`]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A card 2.0 cm long blocks a light gate for 0.0080 s.', lines: ['speed = 0.020 ÷ 0.0080 = [[2.5]] m s⁻¹'], calc: ['0.02/0.008'], why: 'Length of the card divided by the time.' },
      { q: 'A ball falls 1.20 m from rest in 0.495 s.', lines: ['g = 2h ÷ t² = [[9.8]] m s⁻²'], calc: ['2*1.2/0.495**2'], why: 'From s = ½gt².' }
    ],
    exam: [
      { stem: '<p>A student measures the time t for a ball to fall from an electromagnet through a height h onto a trapdoor.</p>' + tbl(['h / m', '0.300', '0.600', '0.900', '1.200'], [['t / s', '0.258', '0.361', '0.439', '0.506']]), parts: [
        { q: 'Explain why a graph of t against √h should be a straight line, and state what its gradient represents.', m: 2, lines: 3, ms: [['B1', 'h = ½gt², so t = √(2/g) × √h: the form y = mx (plus any constant delay)'], ['B1', 'gradient = √(2/g)']] },
        { q: 'The gradient is 0.4515 s m^−½. Calculate g.', m: 1, ans: { a: 9.81, unit: 'm s⁻²', tol: 0.02 }, calc: '2/0.4515**2', ms: [['B1', 'g = 2 ÷ 0.4515² = 9.81 m s⁻²']] },
        { q: 'The line has an intercept of 0.011 s on the t axis. Suggest a reason.', m: 1, lines: 2, ms: [['B1', 'A delay between the timer starting and the ball being released (the electromagnet takes time to lose its magnetism)']] },
        { q: 'Explain why this intercept does not affect the value of g found from the gradient.', m: 1, lines: 2, ms: [['B1', 'A constant delay adds the same time to every reading, so it shifts the line without changing its gradient']] }] }
    ]
  });

  /* ---------------- m10 Reaction time, thinking distance and stopping distance ---------------- */
  add('m10', {
    ex: [
      ['Doubling the speed', 'A driver has a reaction time of 0.70 s and the car decelerates at 6.5 m s⁻². Find the stopping distance at 13 m s⁻¹ and at 26 m s⁻¹.', [
        ['Thinking distance', 'Constant speed during the reaction time: proportional to v.', ['13 × 0.70 = 9.1 m;   26 × 0.70 = 18.2 m']],
        ['Braking distance', 'v² = 2as, so proportional to v².', [`${fr('13²', '2 × 6.5')} = 13.0 m;   ${fr('26²', '2 × 6.5')} = 52.0 m`]],
        ['Totals', '', [res('22.1 m at 13 m s⁻¹ but 70.2 m at 26 m s⁻¹: more than three times as far')]]
      ], { chk: [['13*0.7', 9.1], ['169/13', 13], ['676/13', 52], ['26*0.7+676/13', 70.2]] }],
      ['Trap: a wet road', 'On a wet road the maximum deceleration falls from 7.0 m s⁻² to 3.5 m s⁻². At 20 m s⁻¹, with a reaction time of 0.60 s, how much further does the car need to stop?', [
        ['Thinking distance', 'Unchanged by the road surface.', ['20 × 0.60 = 12 m']],
        ['Braking distances', 'Halving the deceleration doubles the braking distance.', [`dry: ${fr('400', '14')} = 28.6 m;   wet: ${fr('400', '7.0')} = 57.1 m`]],
        ['Difference', '', [res('the stopping distance rises from 40.6 m to 69.1 m: 28.6 m further')]]
      ], { chk: [['400/14', 28.6], ['400/7', 57.1], ['12+400/14', 40.6], ['12+400/7', 69.1]] }]
    ],
    gaps: [
      { q: 'A car travels at 20 m s⁻¹. Reaction time 0.80 s, deceleration 8.0 m s⁻².', lines: ['thinking distance = [[16]] m', 'braking distance = 20² ÷ (2 × 8.0) = [[25]] m', 'stopping distance = [[41]] m'], calc: ['20*0.8', '400/16', '16+25'], why: 'Stopping distance = thinking + braking.' }
    ],
    exam: [
      { stem: '<p>The table shows modelled thinking and braking distances for a car.</p>' + tbl(['speed / m s⁻¹', '10', '20', '30'], [['thinking distance / m', '6.7', '13.4', '20.1'], ['braking distance / m', '7.6', '30.3', '68.2']]), parts: [
        { q: 'Use the data to show that braking distance is proportional to the square of the speed.', m: 2, lines: 3, ms: [['M1', 'When the speed doubles (10 to 20), braking distance increases by a factor of 30.3 ÷ 7.6 ≈ 4; when it trebles, by 68.2 ÷ 7.6 ≈ 9'], ['A1', 'so braking distance ∝ v² (or s ÷ v² is constant at about 0.076)']] },
        { q: 'Calculate the deceleration assumed in the model.', m: 2, ans: { a: 6.6, unit: 'm s⁻²', tol: 0.02 }, calc: '900/(2*68.2)', ms: [['C1', 'a = v² ÷ 2s = 30² ÷ (2 × 68.2)'], ['A1', 'a = 6.6 m s⁻²']] }] }
    ]
  });

  /* ---------------- m11 Independence of horizontal and vertical motion ---------------- */
  add('m11', {
    ex: [
      ['Rolling off a table', 'A ball rolls off a table 0.90 m high at 2.4 m s⁻¹. Find where it lands and its velocity on landing.', [
        ['Vertical motion decides the time', 'Starts with zero vertical velocity.', ['t = √(2 × 0.90 ÷ 9.81) = 0.428 s']],
        ['Horizontal distance', 'Constant horizontal velocity.', ['x = 2.4 × 0.428 = 1.03 m']],
        ['Velocity on landing', 'Combine the components.', ['vertical: 9.81 × 0.428 = 4.20 m s⁻¹', 'speed = √(2.4² + 4.20²) = 4.84 m s⁻¹', res('4.8 m s⁻¹ at tan⁻¹(4.20 ÷ 2.4) = 60° below the horizontal')]]
      ], { chk: [['sqrt(1.8/g)', 0.4284], ['2.4*sqrt(1.8/g)', 1.028], ['g*sqrt(1.8/g)', 4.202], ['sqrt(2.4**2+1.8*g)', 4.839], ['atand(sqrt(1.8*g)/2.4)', 60.3]] }],
      ['A model answer: why the motions are independent', 'Explain why the horizontal and vertical motions of a projectile can be treated separately. (3 marks)', [
        ['Perpendicular components', '', [`Velocity is a vector, so it can be ${mp('resolved into perpendicular components')} that do not affect each other.`]],
        ['Forces', '', [`Ignoring air resistance, the only force is ${mp('weight, which acts vertically')}, so there is ${mp('no horizontal force and no horizontal acceleration')}.`]],
        ['Consequence', '', ['The horizontal velocity is constant, while the vertical velocity changes at 9.81 m s⁻². A ball dropped and a ball thrown horizontally from the same height land together.']]
      ], { desc: true }],
      ['Trap: sin or cos?', 'A ball is launched at 20 m s⁻¹ at 30° above the horizontal. Find the horizontal and vertical components.', [
        ['Draw it', 'The component next to the angle uses cos.', ['The angle is measured from the horizontal, so the horizontal component is adjacent to it.']],
        ['Components', '', ['horizontal: 20 cos 30° = 17.3 m s⁻¹', 'vertical: 20 sin 30° = 10.0 m s⁻¹']],
        ['Check', 'The trap is swapping them; a quick check catches it.', [res('a shallow 30° launch must have the larger horizontal component ✓')]]
      ], { chk: [['20*cosd(30)', 17.32], ['20*sind(30)', 10]] }]
    ],
    gaps: [
      { q: 'A ball is launched at 25 m s⁻¹ at 40° above the horizontal.', lines: ['horizontal component = 25 cos 40° = [[19.2]] m s⁻¹', 'vertical component = 25 sin 40° = [[16.1]] m s⁻¹'], calc: ['25*cosd(40)', '25*sind(40)'], why: 'Check: √(19.2² + 16.1²) = 25.' },
      { q: 'A ball rolls off a ledge 0.80 m high.', lines: ['time to fall = √(2 × 0.80 ÷ 9.81) = [[0.404]] s'], calc: ['sqrt(1.6/g)'], why: 'The same as if it had been dropped.' }
    ],
    exam: [
      { stem: '<p>An aircraft flying horizontally at 60 m s⁻¹, 180 m above level ground, releases a package. Ignore air resistance.</p>', parts: [
        { q: 'Calculate the time taken for the package to reach the ground.', m: 1, ans: { a: 6.06, unit: 's', tol: 0.02 }, calc: 'sqrt(2*180/g)', ms: [['B1', 't = √(2 × 180 ÷ 9.81) = 6.1 s']] },
        { q: 'Calculate the horizontal distance travelled by the package.', m: 1, ans: { a: 363, unit: 'm', tol: 0.02 }, calc: '60*sqrt(2*180/g)', ms: [['B1', '60 × 6.06 = 360 m']] },
        { q: 'State where the package is, relative to the aircraft, when it lands.', m: 1, lines: 1, ms: [['B1', 'Directly below the aircraft (both have the same horizontal velocity)']] },
        { q: 'Calculate the speed of the package as it lands.', m: 2, ans: { a: 84.4, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(60**2+2*g*180)', ms: [['C1', 'vertical component = √(2 × 9.81 × 180) = 59.4 m s⁻¹'], ['A1', 'speed = √(60² + 59.4²) = 84 m s⁻¹']] }] }
    ]
  });

  /* ---------------- m12 Solving projectile problems ---------------- */
  add('m12', {
    ex: [
      ['Landing below the launch height', 'A ball is thrown at 15 m s⁻¹ at 40° above the horizontal from a point 2.0 m above level ground. Find how far it travels horizontally.', [
        ['Components', '', ['uₓ = 15 cos 40° = 11.49 m s⁻¹', 'u_y = 15 sin 40° = 9.64 m s⁻¹']],
        ['Time of flight from the vertical motion', 'Up positive; it lands 2.0 m below the start.', ['−2.0 = 9.64t − 4.905t²', `t = ${fr('9.64 + √(9.64² + 4 × 4.905 × 2.0)', '9.81')} = 2.16 s`]],
        ['Range', '', [res('x = 11.49 × 2.16 = 24.8 m')]]
      ], { chk: [['15*cosd(40)', 11.49], ['15*sind(40)', 9.642], ['(15*sind(40)+sqrt((15*sind(40))**2+4*4.905*2))/9.81', 2.155], ['15*cosd(40)*(15*sind(40)+sqrt((15*sind(40))**2+4*4.905*2))/9.81', 24.76]] }],
      ['Which angle goes furthest?', 'For a launch from level ground at 20 m s⁻¹, compare the range at 30°, 45° and 60°.', [
        ['A general result', 'Time of flight = 2u sin θ ÷ g, range = u cos θ × time.', [`R = ${fr('u² sin 2θ', 'g')}`]],
        ['Calculate', '', ['30°: 400 × sin 60° ÷ 9.81 = 35.3 m', '45°: 400 × 1 ÷ 9.81 = 40.8 m', '60°: 400 × sin 120° ÷ 9.81 = 35.3 m']],
        ['Interpret', '', [res('45° gives the greatest range; angles equally above and below 45° give the same range'), 'With air resistance the best angle is lower than 45°.']]
      ], { chk: [['400*sind(60)/g', 35.31], ['400/g', 40.77]] }]
    ],
    gaps: [
      { q: 'A ball is launched from level ground at 20 m s⁻¹ at 30°.', lines: ['vertical component = [[10]] m s⁻¹', 'time of flight = 2 × 10 ÷ 9.81 = [[2.04]] s', 'range = 20 cos 30° × 2.04 = [[35.3]] m'], calc: ['20*sind(30)', '20/g', '20*cosd(30)*20/g'], why: 'The time up equals the time down on level ground.' },
      { q: 'A projectile has a vertical velocity component of 12 m s⁻¹ at launch.', lines: ['maximum height = 12² ÷ (2 × 9.81) = [[7.34]] m'], calc: ['144/(2*g)'], why: 'Only the vertical component decides the height.' }
    ],
    exam: [
      { stem: '<p>A football is kicked from the ground at 22 m s⁻¹ at 25° above the horizontal, towards a wall 30 m away. Ignore air resistance.</p>', parts: [
        { q: 'Calculate the time taken for the ball to reach the wall.', m: 1, ans: { a: 1.505, unit: 's', tol: 0.02 }, calc: '30/(22*cosd(25))', ms: [['B1', 't = 30 ÷ (22 cos 25°) = 1.5 s']] },
        { q: 'Calculate the height of the ball when it reaches the wall.', m: 2, ans: { a: 2.89, unit: 'm', tol: 0.03 }, calc: '22*sind(25)*30/(22*cosd(25))-4.905*(30/(22*cosd(25)))**2', ms: [['C1', 'h = (22 sin 25°)t − ½ × 9.81 × t² with t = 1.50 s'], ['A1', 'h = 14.0 − 11.1 = 2.9 m']] },
        { q: 'Determine whether the ball is rising or falling when it reaches the wall.', m: 1, lines: 2, ms: [['B1', 'time to the highest point = 22 sin 25° ÷ 9.81 = 0.95 s, which is less than 1.50 s, so it is falling']] }] }
    ]
  });

  /* ---------------- m13 Review and exam practice ---------------- */
  add('m13', {
    ex: [
      ['Synoptic: catching up', 'Car A passes a junction at a constant 25 m s⁻¹. At that moment car B is 50 m behind A, moving at a constant 30 m s⁻¹. When and where does B catch A?', [
        ['Relative speed', 'B closes the gap at the difference in speeds.', ['30 − 25 = 5.0 m s⁻¹']],
        ['Time', '', ['t = 50 ÷ 5.0 = 10 s']],
        ['Position', 'Measure from the junction where A was at t = 0.', [res('A has gone 25 × 10 = 250 m past the junction; B has gone 300 m from 50 m behind it ✓')]]
      ], { chk: [['50/5', 10], ['25*10', 250], ['30*10-50', 250]] }],
      ['Synoptic: free fall inside a moving lift', 'A lift rises at a constant 2.0 m s⁻¹. A bolt comes loose from the ceiling, 2.5 m above the floor. How long does it take to reach the floor?', [
        ['Relative to the lift', 'The lift is not accelerating, so relative to the lift the bolt starts from rest and accelerates at g.', ['s = ½gt², with s = 2.5 m']],
        ['Calculate', '', [`t = √(${fr('2 × 2.5', '9.81')})`, res('t = 0.71 s: the same as in a stationary lift')]],
        ['Check from the ground', 'Bolt: up at 2.0 m s⁻¹, slowing; floor: rising at 2.0 m s⁻¹.', ['bolt rises 2.0t − 4.905t², floor rises 2.0t; they meet when 4.905t² = 2.5 ✓']]
      ], { chk: [['sqrt(5/g)', 0.714]] }]
    ],
    gaps: [
      { q: 'An object accelerates from rest at 1.5 m s⁻² for 4.0 s, then moves at constant speed for 6.0 s.', lines: ['speed after 4.0 s = [[6]] m s⁻¹', 'distance in the first 4.0 s = [[12]] m', 'total distance = [[48]] m'], calc: ['1.5*4', '0.5*1.5*16', '12+6*6'], why: 'Work through each stage in turn.' }
    ],
    exam: [
      { stem: '<p>A drone rises vertically from rest with an acceleration of 1.5 m s⁻² for 4.0 s. It then rises at constant speed for 6.0 s, and releases a small package. Ignore air resistance on the package.</p>', parts: [
        { q: 'Calculate the speed of the drone after 4.0 s.', m: 1, ans: { a: 6.0, unit: 'm s⁻¹', tol: 0.01 }, calc: '1.5*4', ms: [['B1', 'v = 1.5 × 4.0 = 6.0 m s⁻¹']] },
        { q: 'Calculate the height of the drone when it releases the package.', m: 2, ans: { a: 48, unit: 'm', tol: 0.01 }, calc: '0.5*1.5*16+6*6', ms: [['C1', 'first stage 12 m, second stage 36 m'], ['A1', 'h = 48 m']] },
        { q: 'Calculate the time taken for the package to reach the ground.', m: 3, ans: { a: 3.80, unit: 's', tol: 0.02 }, calc: '(6+sqrt(36+2*g*48))/g', ms: [['C1', 'u = +6.0 m s⁻¹ (the package moves with the drone), s = −48 m'], ['C1', '4.905t² − 6.0t − 48 = 0'], ['A1', 't = 3.8 s']] },
        { q: 'Describe the velocity–time graph of the package from release until it lands. Take upwards as positive.', m: 1, lines: 2, ms: [['B1', 'A straight line of gradient −9.81 m s⁻² from +6.0 m s⁻¹, crossing zero at 0.61 s and ending at about −31 m s⁻¹']] }] }
    ]
  });

  /* third fill-the-gaps for the calculation-heavy lessons */
  add('m2', { gaps: [{ q: 'A cyclist accelerates at 0.80 m s⁻² from 3.0 m s⁻¹ for 5.0 s.', lines: ['Δv = 0.80 × 5.0 = [[4]] m s⁻¹', 'final velocity = [[7]] m s⁻¹'], calc: ['0.8*5', '3+0.8*5'], why: 'v = u + at.' }] });
  add('m3', { gaps: [{ q: 'A displacement–time graph is a horizontal line at 8.0 m from t = 3.0 s to t = 7.0 s.', lines: ['velocity during this time = [[0]] m s⁻¹', 'displacement during this time = [[0]] m'], calc: ['0', '0'], why: 'A flat s–t line means the object is at rest, 8.0 m from the start.' }] });
  add('m4', { gaps: [{ q: 'A runner decelerates uniformly from 8.0 m s⁻¹ to 2.0 m s⁻¹ in 3.0 s.', lines: ['acceleration = (2.0 − 8.0) ÷ 3.0 = [[-2]] m s⁻²', 'distance = ½(8.0 + 2.0) × 3.0 = [[15]] m'], calc: ['(2-8)/3', '0.5*10*3'], why: 'Gradient for acceleration, area for distance.' }] });
  add('m6', { gaps: [{ q: 'Use v² = u² + 2as: a car slows from 20 m s⁻¹ to 10 m s⁻¹ at 2.5 m s⁻².', lines: ['10² = 20² + 2 × (−2.5) × s', 's = (400 − 100) ÷ 5.0 = [[60]] m'], calc: ['(400-100)/5'], why: 'The equation that leaves out t.' }, { q: 'Use s = ½(u + v)t: a train speeds up from 12 m s⁻¹ to 18 m s⁻¹ in 20 s.', lines: ['s = ½ × (12 + 18) × 20 = [[300]] m'], calc: ['0.5*30*20'], why: 'The equation that leaves out a.' }] });
  add('m7', { gaps: [{ q: 'A ball is thrown up a slope at 6.0 m s⁻¹ and decelerates at 1.5 m s⁻².', lines: ['time to stop = [[4]] s', 'distance up the slope = [[12]] m'], calc: ['6/1.5', '36/3'], why: 'v = u + at, then v² = u² + 2as.' }] });
  add('m8', { gaps: [{ q: 'A stone is thrown down a well at 4.0 m s⁻¹ and hits the water 1.5 s later.', lines: ['s = ut + ½gt² = 4.0 × 1.5 + 4.905 × 1.5² = [[17]] m', 'speed at the water = 4.0 + 9.81 × 1.5 = [[18.7]] m s⁻¹'], calc: ['6+4.905*2.25', '4+9.81*1.5'], why: 'Taking downwards as positive keeps all the signs positive.' }] });
  add('m10', { gaps: [{ q: 'A ruler falls 0.15 m before it is caught.', lines: ['reaction time = √(2 × 0.15 ÷ 9.81) = [[0.175]] s'], calc: ['sqrt(0.3/g)'], why: 'The ruler falls freely from rest.' }, { q: 'A car at 15 m s⁻¹ stops in a braking distance of 18 m.', lines: ['deceleration = 15² ÷ (2 × 18) = [[6.25]] m s⁻²'], calc: ['225/36'], why: 'From v² = u² + 2as with v = 0.' }] });
  add('m11', { gaps: [{ q: 'A stone is thrown horizontally at 12 m s⁻¹ from a cliff and lands 1.8 s later.', lines: ['horizontal distance = [[21.6]] m', 'height of the cliff = ½ × 9.81 × 1.8² = [[15.9]] m'], calc: ['12*1.8', '4.905*3.24'], why: 'The horizontal speed does not affect the fall time.' }] });
  add('m12', { gaps: [{ q: 'A ball is thrown at 18 m s⁻¹ at 55° from level ground.', lines: ['vertical component = [[14.7]] m s⁻¹', 'time to the highest point = [[1.5]] s', 'maximum height = [[11.1]] m'], calc: ['18*sind(55)', '18*sind(55)/g', '(18*sind(55))**2/(2*g)'], why: 'At the highest point the vertical velocity is zero; the horizontal velocity is unchanged.' }] });
})();
