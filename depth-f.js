/* Forces in action (f1–f14): extra worked examples, fill-the-gaps and exam-style questions.
   g = 9.81 N kg⁻¹. Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const tbl = (head, rows) => `<div class="tbl-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const mp = t => `<b>${t}</b>`;

  /* ---------------- f1 Resultant force and Newton's second law ---------------- */
  add('f1', {
    ex: [
      ['A lorry speeding up, then cruising', 'A lorry of mass 8000 kg has a driving force of 6400 N and resistive forces of 2400 N. Find its acceleration. Later it moves at constant speed: what is the driving force then if the resistance has risen to 5200 N?', [
        ['Resultant force', 'Forwards positive.', ['F = 6400 − 2400 = 4000 N']],
        ['Acceleration', '', [`a = ${fr('F', 'm')} = ${fr('4000', '8000')}`, res('a = 0.50 m s⁻²')]],
        ['Constant speed', 'Zero acceleration means zero resultant force (Newton’s first law).', [res('driving force = resistance = 5200 N')]]
      ], { chk: [['6400-2400', 4000], ['4000/8000', 0.5]] }],
      ['Trap: forgetting the weight', 'A 2.0 kg mass is lifted by a string with a tension of 30 N. Find its acceleration.', [
        ['The tempting answer', '30 ÷ 2.0 = 15 m s⁻² ignores gravity.', ['a = 15 m s⁻²  ✗']],
        ['Draw the forces', 'Two forces: tension up, weight down.', ['W = 2.0 × 9.81 = 19.6 N', 'resultant = 30 − 19.6 = 10.4 N upwards']],
        ['Acceleration', '', [res('a = 10.4 ÷ 2.0 = 5.2 m s⁻² upwards')]]
      ], { chk: [['2*g', 19.62], ['(30-2*g)/2', 5.19]] }]
    ],
    gaps: [
      { q: 'A car of mass 900 kg accelerates at 2.5 m s⁻².', lines: ['resultant force = [[2250]] N'], calc: ['900*2.5'], why: 'F = ma.' },
      { q: 'Forces of 6.0 N east and 8.0 N north act on a 2.0 kg mass.', lines: ['resultant = √(6.0² + 8.0²) = [[10]] N', 'acceleration = [[5]] m s⁻²'], calc: ['sqrt(36+64)', '10/2'], why: 'The acceleration is in the direction of the resultant force.' },
      { q: 'A 1500 kg car brakes from 20 m s⁻¹ to rest in 4.0 s.', lines: ['deceleration = [[5]] m s⁻²', 'braking force = [[7500]] N'], calc: ['20/4', '1500*5'], why: 'Find a first, then F = ma.' }
    ],
    exam: [
      { stem: '<p>A rocket of mass 2.0 × 10⁴ kg stands on its launch pad. At lift-off its engines produce a thrust of 3.2 × 10⁵ N.</p>', parts: [
        { q: 'Calculate the weight of the rocket.', m: 1, ans: { a: 1.962e5, unit: 'N', tol: 0.01 }, calc: '2.0e4*g', ms: [['B1', 'W = 2.0 × 10⁴ × 9.81 = 1.96 × 10⁵ N']] },
        { q: 'Calculate the initial acceleration of the rocket.', m: 2, ans: { a: 6.19, unit: 'm s⁻²', tol: 0.02 }, calc: '(3.2e5-2.0e4*g)/2.0e4', ms: [['C1', 'resultant = 3.2 × 10⁵ − 1.96 × 10⁵ = 1.24 × 10⁵ N'], ['A1', 'a = 1.24 × 10⁵ ÷ 2.0 × 10⁴ = 6.2 m s⁻²']] },
        { q: 'The thrust stays constant. Explain why the acceleration increases as the rocket rises.', m: 2, lines: 3, ms: [['B1', 'The rocket burns fuel, so its mass (and weight) decreases'], ['B1', 'The resultant force increases and the mass decreases, so a = F ÷ m increases (ignoring air resistance)']] }] }
    ]
  });

  /* ---------------- f2 Weight, mass and free-body diagrams ---------------- */
  add('f2', {
    ex: [
      ['A model answer: Newton’s third law pairs', 'A book rests on a table. Identify the forces on the book and the Newton’s third law partner of each. (4 marks)', [
        ['Forces on the book', 'A free-body diagram shows forces on ONE object.', [`${mp('Weight')}: the Earth pulls the book down.`, `${mp('Normal contact force')}: the table pushes the book up.`]],
        ['Why these are not a pair', 'They act on the same object and are different types of force.', ['They are equal and opposite only because the book is in equilibrium.']],
        ['The real pairs', 'Same size, opposite direction, same type of force, acting on different objects.', [`The book pulls the ${mp('Earth upwards')} (gravitational). The book pushes the ${mp('table downwards')} (contact).`]]
      ], { desc: true }],
      ['Weight on another world', 'A 70 kg astronaut has a 30 kg backpack. Find the weight of astronaut plus pack on Earth and on Mars (g = 3.71 N kg⁻¹), and say what happens to their mass.', [
        ['Total mass', '', ['m = 70 + 30 = 100 kg (the same everywhere)']],
        ['Weights', 'W = mg.', ['Earth: 100 × 9.81 = 981 N', 'Mars: 100 × 3.71 = 371 N']],
        ['Meaning', '', [res('The weight is 38 % of its Earth value; the mass, and so the effort needed to accelerate it sideways, is unchanged')]]
      ], { chk: [['100*g', 981], ['100*3.71', 371], ['3.71/9.81*100', 37.8]] }]
    ],
    gaps: [
      { q: 'Find the weight of a 0.25 kg apple.', lines: ['W = mg = [[2.45]] N'], calc: ['0.25*g'], why: 'Weight is a force, so it is measured in newtons.' },
      { q: 'An object weighs 49 N on Earth.', lines: ['mass = 49 ÷ 9.81 = [[5]] kg', 'weight on the Moon (g = 1.62 N kg⁻¹) = [[8.1]] N'], calc: ['49/g', '49/g*1.62'], why: 'The mass is the same on the Moon.' }
    ],
    exam: [
      { stem: '<p>A book of mass 0.80 kg is pushed across a horizontal table at constant velocity by a horizontal force of 6.0 N.</p>', parts: [
        { q: 'Name all the forces acting on the book and give the size of each.', m: 3, lines: 4, ms: [['B1', 'weight 7.8 N downwards and normal contact force 7.8 N upwards'], ['B1', 'push 6.0 N forwards'], ['B1', 'friction 6.0 N backwards (resultant zero at constant velocity)']] },
        { q: 'The Earth pulls the book downwards. Describe the Newton’s third law partner of this force.', m: 2, lines: 3, ms: [['B1', 'The book pulls the Earth upwards with a gravitational force'], ['B1', 'of the same size, 7.8 N']] }] }
    ]
  });

  /* ---------------- f3 Resolving forces and motion on a slope ---------------- */
  add('f3', {
    ex: [
      ['Trap: the normal force is not always mg', 'A 30 kg box is pulled across a rough floor by a rope at 25° above the horizontal with a tension of 120 N. Friction is 80 N. Find the acceleration and the normal contact force.', [
        ['Resolve the tension', '', ['horizontal: 120 cos 25° = 108.8 N', 'vertical: 120 sin 25° = 50.7 N upwards']],
        ['Acceleration', '', [`a = ${fr('108.8 − 80', '30')}`, res('a = 0.96 m s⁻²')]],
        ['Normal contact force', 'The trap: writing N = mg. The rope supports part of the weight.', ['N = 30 × 9.81 − 50.7', res('N = 244 N, not 294 N')]]
      ], { chk: [['120*cosd(25)', 108.8], ['120*sind(25)', 50.7], ['(120*cosd(25)-80)/30', 0.959], ['30*g-120*sind(25)', 243.6]] }],
      ['Sliding at constant speed', 'A 4.0 kg box slides down a slope at 18° to the horizontal at constant speed. Find the friction force and the normal contact force.', [
        ['Constant speed', 'Resultant force along the slope is zero.', ['friction = mg sin 18° = 4.0 × 9.81 × sin 18°', res('friction = 12.1 N up the slope')]],
        ['Perpendicular to the slope', 'No motion into the slope.', ['N = mg cos 18°', res('N = 37.3 N')]]
      ], { chk: [['4*g*sind(18)', 12.13], ['4*g*cosd(18)', 37.32]] }]
    ],
    gaps: [
      { q: 'Resolve a 40 N force at 35° above the horizontal.', lines: ['horizontal = 40 cos 35° = [[32.8]] N', 'vertical = 40 sin 35° = [[22.9]] N'], calc: ['40*cosd(35)', '40*sind(35)'], why: 'Adjacent to the angle: cos.' },
      { q: 'A 10 kg block rests on a slope at 25°.', lines: ['component of weight down the slope = [[41.5]] N', 'component into the slope = [[88.9]] N'], calc: ['10*g*sind(25)', '10*g*cosd(25)'], why: 'Down the slope: mg sin θ. Into it: mg cos θ.' }
    ],
    exam: [
      { stem: '<p>A skier of mass 65 kg accelerates at 1.2 m s⁻² down a straight slope inclined at 15° to the horizontal.</p>', parts: [
        { q: 'Calculate the component of the skier’s weight down the slope.', m: 1, ans: { a: 165.0, unit: 'N', tol: 0.02 }, calc: '65*g*sind(15)', ms: [['B1', '65 × 9.81 × sin 15° = 165 N']] },
        { q: 'Calculate the total resistive force on the skier.', m: 2, ans: { a: 87.0, unit: 'N', tol: 0.03 }, calc: '65*g*sind(15)-65*1.2', ms: [['C1', 'resultant = ma = 65 × 1.2 = 78 N'], ['A1', 'resistance = 165 − 78 = 87 N']] },
        { q: 'Calculate the normal contact force on the skier.', m: 1, ans: { a: 616, unit: 'N', tol: 0.02 }, calc: '65*g*cosd(15)', ms: [['B1', 'N = 65 × 9.81 × cos 15° = 616 N']] },
        { q: 'Explain why the skier eventually reaches a constant speed.', m: 1, lines: 2, ms: [['B1', 'Air resistance increases with speed until the total resistance equals the component of weight down the slope, so the resultant force becomes zero']] }] }
    ]
  });

  /* ---------------- f4 Lifts and connected objects ---------------- */
  add('f4', {
    ex: [
      ['Trap: going down but slowing', 'A 60 kg person stands on scales in a lift that is moving downwards and slowing at 1.5 m s⁻². What do the scales read?', [
        ['Direction of the acceleration', 'The trap: assuming “moving down” means “accelerating down”. Slowing while moving down means the acceleration is UP.', ['a = 1.5 m s⁻² upwards']],
        ['Newton’s second law (up positive)', '', ['R − mg = ma', 'R = 60 × (9.81 + 1.5)']],
        ['Reading', '', [res('R = 679 N: more than the person’s weight of 589 N')]]
      ], { chk: [['60*(g+1.5)', 678.6], ['60*g', 588.6]] }],
      ['Pushing two blocks', 'Blocks of 3.0 kg and 2.0 kg touch on a smooth floor. A 15 N force pushes the 3.0 kg block, which pushes the 2.0 kg block. Find the acceleration and the force between the blocks.', [
        ['Whole system', 'The force between the blocks is internal and cancels.', ['a = 15 ÷ (3.0 + 2.0) = 3.0 m s⁻²']],
        ['One block alone', 'The 2.0 kg block is pushed only by the 3.0 kg block.', [res('force = 2.0 × 3.0 = 6.0 N')]],
        ['Check with the other block', '', ['3.0 kg block: 15 − 6.0 = 9.0 N = 3.0 × 3.0 ✓']]
      ], { chk: [['15/5', 3], ['2*3', 6], ['15-6', 9]] }]
    ],
    gaps: [
      { q: 'A 50 kg person is in a lift accelerating downwards at 2.0 m s⁻².', lines: ['normal contact force = 50 × (9.81 − 2.0) = [[390.5]] N'], calc: ['50*(g-2)'], why: 'The person feels lighter.' },
      { q: 'An engine of mass 12 000 kg pulls two carriages of 8000 kg each with a driving force of 14 000 N. Ignore resistance.', lines: ['acceleration = 14 000 ÷ 28 000 = [[0.5]] m s⁻²', 'tension in the coupling behind the engine = 16 000 × 0.50 = [[8000]] N'], calc: ['14000/28000', '16000*0.5'], why: 'That coupling accelerates both carriages.' }
    ],
    exam: [
      { stem: '<p>A 3.0 kg block on a smooth horizontal table is attached by a light string over a frictionless pulley to a 1.0 kg mass hanging freely.</p>', parts: [
        { q: 'Calculate the acceleration of the system.', m: 2, ans: { a: 2.45, unit: 'm s⁻²', tol: 0.02 }, calc: 'g/4', ms: [['C1', 'resultant force on the system = weight of hanging mass = 9.81 N'], ['A1', 'a = 9.81 ÷ 4.0 = 2.5 m s⁻²']] },
        { q: 'Calculate the tension in the string.', m: 2, ans: { a: 7.36, unit: 'N', tol: 0.02 }, calc: '3*g/4', ms: [['C1', 'for the block: T = ma'], ['A1', 'T = 3.0 × 2.45 = 7.4 N']] },
        { q: 'Explain why the tension is less than the weight of the hanging mass.', m: 1, lines: 2, ms: [['B1', 'The hanging mass accelerates downwards, so there must be a resultant downward force on it: W − T = ma > 0']] }] }
    ]
  });

  /* ---------------- f5 Drag ---------------- */
  add('f5', {
    ex: [
      ['Drag rises with the square of speed', 'The drag on a cyclist is D = kv² with k = 0.25 kg m⁻¹. Find the drag at 8.0 m s⁻¹ and at 12 m s⁻¹, and the driving force needed to keep a steady 12 m s⁻¹.', [
        ['Drag at each speed', '', ['8.0 m s⁻¹: 0.25 × 64 = 16 N', '12 m s⁻¹: 0.25 × 144 = 36 N']],
        ['Compare', '', ['1.5 times the speed gives 1.5² = 2.25 times the drag']],
        ['Steady speed', 'Resultant force zero.', [res('driving force = 36 N (ignoring other resistances)')]]
      ], { chk: [['0.25*64', 16], ['0.25*144', 36], ['36/16', 2.25]] }],
      ['A model answer: reducing drag', 'Explain three ways a racing cyclist reduces drag. (3 marks)', [
        ['Area', '', [`Crouching low ${mp('reduces the cross-sectional area')} facing the air.`]],
        ['Shape', '', [`A smooth helmet and tight clothing ${mp('streamline')} the shape, so less turbulence forms behind the rider.`]],
        ['Drafting', '', [`Riding close behind another rider means ${mp('meeting air already moving')} in the same direction, so the relative speed of the air is lower.`]]
      ], { desc: true }],
      ['Trap: doubling the top speed', 'A car’s maximum driving force is 600 N and its drag is D = 0.40v². Find its top speed. How much force would double it?', [
        ['Top speed', 'Driving force = drag.', [`v = √(${fr('600', '0.40')}) = 38.7 m s⁻¹`]],
        ['Doubling', 'The trap: doubling the force. Drag rises as v².', ['at 77.5 m s⁻¹: D = 0.40 × 77.5² = 2400 N']],
        ['Result', '', [res('four times the force (2400 N) is needed to double the top speed')]]
      ], { chk: [['sqrt(600/0.4)', 38.73], ['0.4*(2*sqrt(600/0.4))**2', 2400]] }]
    ],
    gaps: [
      { q: 'Drag D = kv² with k = 0.30 kg m⁻¹.', lines: ['drag at 20 m s⁻¹ = [[120]] N', 'top speed if the driving force is 480 N = [[40]] m s⁻¹'], calc: ['0.3*400', 'sqrt(480/0.3)'], why: 'At top speed, drag equals the driving force.' }
    ],
    exam: [
      { stem: '<p>A model car is tested in a wind tunnel. The drag D is measured at different air speeds v.</p>' + tbl(['v / m s⁻¹', '5.0', '10.0', '15.0', '20.0'], [['D / N', '0.60', '2.40', '5.40', '9.60']]), parts: [
        { q: 'Show that D is proportional to v².', m: 2, lines: 3, ms: [['M1', 'Doubling v from 5.0 to 10.0 m s⁻¹ multiplies D by 4; trebling to 15.0 multiplies it by 9'], ['A1', 'D ÷ v² is constant at 0.024 kg m⁻¹ for every reading']] },
        { q: 'Determine the constant k in D = kv².', m: 1, ans: { a: 0.024, unit: 'kg m⁻¹', tol: 0.01 }, calc: '9.60/400', ms: [['B1', 'k = 9.60 ÷ 20.0² = 0.024 kg m⁻¹']] },
        { q: 'Predict the drag at 25 m s⁻¹.', m: 1, ans: { a: 15.0, unit: 'N', tol: 0.01 }, calc: '0.024*625', ms: [['B1', 'D = 0.024 × 25² = 15 N']] },
        { q: 'State one variable that must be kept constant in this investigation.', m: 1, lines: 1, ms: [['B1', 'Any one from: the same model car (shape and area), the same orientation in the tunnel, the air temperature/density']] }] }
    ]
  });

  /* ---------------- f6 Falling with drag: terminal velocity ---------------- */
  add('f6', {
    ex: [
      ['Opening the parachute', 'An 80 kg skydiver falls at a terminal velocity of 55 m s⁻¹, with drag D = kv². With the parachute open the terminal velocity is 6.0 m s⁻¹. Find k in each case, and the deceleration just after the parachute opens.', [
        ['Terminal velocity: drag = weight', '', ['W = 80 × 9.81 = 785 N', `k (closed) = ${fr('785', '55²')} = 0.259 kg m⁻¹`, `k (open) = ${fr('785', '6.0²')} = 21.8 kg m⁻¹`]],
        ['Just after opening', 'She is still moving at 55 m s⁻¹, but k is now much larger.', ['D = 21.8 × 55² = 6.6 × 10⁴ N']],
        ['Deceleration', '', [`a = ${fr('6.6 × 10⁴ − 785', '80')}`, res('about 820 m s⁻² in this simple model; in reality the canopy opens gradually')]]
      ], { chk: [['80*g', 784.8], ['80*g/55**2', 0.2594], ['80*g/36', 21.8], ['80*g/36*55**2', 65940], ['(80*g/36*55**2-80*g)/80', 814.4]] }],
      ['Is it at terminal velocity yet?', 'A ball bearing falls through glycerol past bands 10.0 cm apart. The times between successive bands are 0.62 s, 0.53 s, 0.50 s, 0.50 s and 0.50 s. Find the terminal velocity.', [
        ['Look at the times', 'Equal times for equal distances mean constant speed.', ['The first two intervals are longer: the ball is still accelerating there.']],
        ['Use the constant intervals', '', [`v = ${fr('0.100', '0.50')}`, res('terminal velocity = 0.20 m s⁻¹')]],
        ['Method point', '', ['Start timing well below the surface, and repeat with the same ball to check the times.']]
      ], { chk: [['0.1/0.5', 0.2]] }]
    ],
    gaps: [
      { q: 'A 90 kg skydiver has a terminal velocity of 60 m s⁻¹, with D = kv².', lines: ['weight = [[882.9]] N', 'k = 882.9 ÷ 60² = [[0.245]] kg m⁻¹'], calc: ['90*g', '90*g/3600'], why: 'At terminal velocity, drag equals weight.' },
      { q: 'An 80 kg skydiver has a drag force of 300 N.', lines: ['resultant force = 784.8 − 300 = [[484.8]] N', 'acceleration = [[6.06]] m s⁻²'], calc: ['80*g-300', '(80*g-300)/80'], why: 'The acceleration falls as the drag rises.' }
    ],
    exam: [
      { stem: '<p>A steel ball of mass 4.0 × 10⁻³ kg falls through oil at terminal velocity. The upthrust on the ball is 5.0 × 10⁻³ N.</p>', parts: [
        { q: 'Calculate the drag force on the ball at terminal velocity.', m: 2, ans: { a: 0.0342, unit: 'N', tol: 0.02 }, calc: '4e-3*g-5e-3', ms: [['C1', 'weight = 4.0 × 10⁻³ × 9.81 = 0.0392 N; at terminal velocity drag + upthrust = weight'], ['A1', 'drag = 0.0392 − 0.0050 = 0.034 N']] },
        { q: 'Explain why the student should start timing the ball some distance below the surface of the oil.', m: 1, lines: 2, ms: [['B1', 'The ball accelerates at first; it must have reached terminal velocity before timing starts']] }] }
    ]
  });

  /* ---------------- f7 Moments and the principle of moments ---------------- */
  add('f7', {
    ex: [
      ['Balancing a see-saw', 'A see-saw is pivoted at its centre. A 30 kg child sits 1.5 m from the pivot. Where must a 40 kg child sit to balance it?', [
        ['Principle of moments', 'Clockwise moments = anticlockwise moments about the pivot.', ['30g × 1.5 = 40g × d']],
        ['Solve', 'g cancels.', [`d = ${fr('30 × 1.5', '40')}`, res('d = 1.125 m on the other side')]]
      ], { chk: [['30*1.5/40', 1.125]] }],
      ['Forces on two supports', 'A uniform beam 6.0 m long and of weight 300 N rests on supports at each end, A and B. A load of 600 N sits 2.0 m from A. Find the force from each support.', [
        ['Take moments about A', 'This removes the unknown force at A.', ['R_B × 6.0 = 300 × 3.0 + 600 × 2.0 = 2100 N m']],
        ['Force at B', '', ['R_B = 2100 ÷ 6.0 = 350 N']],
        ['Force at A', 'Up forces = down forces.', [res('R_A = 300 + 600 − 350 = 550 N'), 'A carries more because the load is nearer to it.']]
      ], { chk: [['300*3+600*2', 2100], ['2100/6', 350], ['900-350', 550]] }]
    ],
    gaps: [
      { q: 'A force of 25 N acts 0.40 m from a pivot, at right angles to the lever.', lines: ['moment = [[10]] N m'], calc: ['25*0.4'], why: 'Moment = force × perpendicular distance.' },
      { q: 'A metre rule pivoted at 50 cm balances with 2.0 N at the 20 cm mark and an unknown weight at the 80 cm mark.', lines: ['moment of 2.0 N = 2.0 × 0.30 = [[0.6]] N m', 'unknown weight = 0.6 ÷ 0.30 = [[2]] N'], calc: ['2*0.3', '0.6/0.3'], why: 'The rule’s own weight acts at the pivot, so it has no moment.' }
    ],
    exam: [
      { stem: '<p>A uniform plank 3.0 m long and of weight 150 N rests on a pivot 1.0 m from its left end. A person of weight 600 N stands at the left end. A vertical force F at the right end keeps the plank horizontal.</p>', parts: [
        { q: 'Calculate the moment of the plank’s weight about the pivot.', m: 1, ans: { a: 75, unit: 'N m', tol: 0.01 }, calc: '150*0.5', ms: [['B1', 'The weight acts 0.50 m to the right of the pivot: 150 × 0.50 = 75 N m']] },
        { q: 'Calculate F.', m: 2, ans: { a: 262.5, unit: 'N', tol: 0.02 }, calc: '(600*1.0-75)/2.0', ms: [['C1', '600 × 1.0 = 75 + F × 2.0'], ['A1', 'F = 260 N (262.5 N)']] },
        { q: 'Calculate the force exerted by the pivot on the plank.', m: 1, ans: { a: 1012.5, unit: 'N', tol: 0.02 }, calc: '600+150+262.5', ms: [['B1', '600 + 150 + 262.5 = 1010 N upwards']] },
        { q: 'State why the weight of a uniform plank can be taken to act at its midpoint.', m: 1, lines: 2, ms: [['B1', 'The mass is evenly distributed, so the centre of gravity is at the geometric centre']] },
        { q: 'Describe how to check experimentally where the plank’s centre of gravity is.', m: 1, lines: 2, ms: [['B1', 'Balance the plank on its own on a pivot (knife edge) and find the point where it balances horizontally']] }] }
    ]
  });

  /* ---------------- f8 Couples and the torque of a couple ---------------- */
  add('f8', {
    ex: [
      ['Forces at an angle', 'Two equal and opposite 15 N forces act at the ends of a bar 0.30 m long, each at 60° to the bar. Find the torque.', [
        ['Perpendicular separation', 'Torque uses the perpendicular distance between the lines of action, not the bar length.', ['d = 0.30 sin 60° = 0.260 m']],
        ['Torque', '', [res('torque = 15 × 0.260 = 3.9 N m')]]
      ], { chk: [['0.3*sind(60)', 0.2598], ['15*0.3*sind(60)', 3.897]] }],
      ['A ladder against a smooth wall', 'A uniform ladder 5.0 m long and of weight 200 N leans against a smooth wall at 60° to the ground. Find the force from the wall and the friction at the base.', [
        ['Smooth wall', 'No friction at the wall.', ['The wall’s force R is perpendicular to the wall: horizontal']],
        ['Moments about the base', 'Removes both forces at the base.', ['R × 5.0 sin 60° = 200 × 2.5 cos 60°', `R = ${fr('250', '4.33')} = 57.7 N`]],
        ['Forces at the base', 'Resultant force zero.', [res('friction = 57.7 N towards the wall; normal force = 200 N')]]
      ], { chk: [['5*sind(60)', 4.33], ['200*2.5*cosd(60)', 250], ['250/(5*sind(60))', 57.7]] }]
    ],
    gaps: [
      { q: 'A couple has forces of 20 N whose lines of action are 0.15 m apart.', lines: ['torque = [[3]] N m'], calc: ['20*0.15'], why: 'One force × perpendicular separation.' },
      { q: 'Two 10 N forces act at the ends of a 0.50 m bar, each at 30° to the bar.', lines: ['perpendicular separation = 0.50 sin 30° = [[0.25]] m', 'torque = [[2.5]] N m'], calc: ['0.5*sind(30)', '10*0.5*sind(30)'], why: 'Only the perpendicular separation counts.' }
    ],
    exam: [
      { stem: '<p>A uniform ladder 4.0 m long and of weight 180 N leans against a smooth vertical wall. It makes an angle of 70° with the horizontal ground.</p>', parts: [
        { q: 'Explain why the force from the wall on the ladder is horizontal.', m: 1, lines: 2, ms: [['B1', 'The wall is smooth, so there is no friction: the only force is the normal contact force, perpendicular to the wall']] },
        { q: 'Calculate the force from the wall on the ladder.', m: 3, ans: { a: 32.8, unit: 'N', tol: 0.02 }, calc: '180*2*cosd(70)/(4*sind(70))', ms: [['C1', 'take moments about the base of the ladder'], ['C1', 'R × 4.0 sin 70° = 180 × 2.0 cos 70°'], ['A1', 'R = 33 N']] },
        { q: 'State the friction force at the base of the ladder.', m: 1, ans: { a: 32.8, unit: 'N', tol: 0.03 }, calc: '180*2*cosd(70)/(4*sind(70))', ms: [['B1', '33 N, towards the wall (it balances R)']] },
        { q: 'State the normal contact force from the ground.', m: 1, ans: { a: 180, unit: 'N', tol: 0.01 }, calc: '180', ms: [['B1', '180 N (equal to the weight)']] },
        { q: 'Explain why the ladder is more likely to slip if it makes a smaller angle with the ground.', m: 1, lines: 2, ms: [['B1', 'The moment of the weight about the base increases (cos θ larger), so the wall force and the friction needed increase, and may exceed the maximum friction available']] }] }
    ]
  });

  /* ---------------- f9 Centre of mass and centre of gravity ---------------- */
  add('f9', {
    ex: [
      ['Two masses on a light rod', 'A 2.0 kg mass is fixed at one end of a light rod 0.50 m long and a 3.0 kg mass at the other. Where is the centre of mass?', [
        ['Take moments about one end', 'The total weight acting at the centre of mass has the same moment as the separate weights.', ['(2.0 + 3.0) × x = 2.0 × 0 + 3.0 × 0.50']],
        ['Solve', '', [res('x = 1.5 ÷ 5.0 = 0.30 m from the 2.0 kg mass')]],
        ['Sense check', '', ['It is closer to the heavier mass ✓']]
      ], { chk: [['3*0.5/5', 0.3]] }],
      ['How far can a bus tilt?', 'A bus has wheels 2.4 m apart and its centre of gravity is 1.5 m above the road, midway between the wheels. At what angle of tilt would it topple?', [
        ['The condition', 'It topples when the line of action of its weight passes outside the base (the wheels on one side).', ['Tipping point: the centre of gravity is directly above the lower wheels.']],
        ['Geometry', 'Half the track width against the height.', [`tan θ = ${fr('1.2', '1.5')}`]],
        ['Angle', '', [res('θ = 39°'), 'A lower centre of gravity or wider wheels give a larger angle: more stable.']]
      ], { chk: [['atand(1.2/1.5)', 38.66]] }],
      ['Centre of mass of an L-shape', 'A uniform L-shaped sheet is made of two rectangles: A, 40 cm × 10 cm with its centre at (20 cm, 5 cm), and B, 10 cm × 30 cm with its centre at (5 cm, 25 cm). Find the centre of mass.', [
        ['Mass is proportional to area', 'A uniform sheet.', ['A: 400 cm²,  B: 300 cm²']],
        ['x coordinate', 'Weighted average of the centres.', [`x = ${fr('400 × 20 + 300 × 5', '700')} = 13.6 cm`]],
        ['y coordinate', '', [`y = ${fr('400 × 5 + 300 × 25', '700')} = 13.6 cm`, res('(13.6 cm, 13.6 cm): outside the material, in the corner of the L')]]
      ], { chk: [['(400*20+300*5)/700', 13.57], ['(400*5+300*25)/700', 13.57]] }]
    ],
    gaps: [
      { q: 'A 1.0 kg mass and a 4.0 kg mass are at the ends of a light rod 0.60 m long.', lines: ['distance of the centre of mass from the 1.0 kg mass = 4.0 × 0.60 ÷ 5.0 = [[0.48]] m'], calc: ['4*0.6/5'], why: 'Closer to the heavier mass.' },
      { q: 'A box has a base 0.40 m wide and its centre of gravity 0.50 m high, in the middle.', lines: ['toppling angle = tan⁻¹(0.20 ÷ 0.50) = [[21.8]]°'], calc: ['atand(0.2/0.5)'], why: 'Half the base width against the height.' }
    ],
    exam: [
      { stem: '<p>A racing car has wheels 1.6 m apart (left to right). Its centre of gravity is midway between them, 0.55 m above the ground.</p>', parts: [
        { q: 'Explain why a low centre of gravity makes the car more stable.', m: 2, lines: 3, ms: [['B1', 'The car topples only when the line of action of its weight passes outside the base (the wheels)'], ['B1', 'With a lower centre of gravity the car must tilt through a larger angle before this happens']] },
        { q: 'Calculate the angle through which the car can be tilted sideways before it topples.', m: 2, ans: { a: 55.5, unit: '°', tol: 0.02 }, calc: 'atand(0.8/0.55)', ms: [['C1', 'tan θ = 0.80 ÷ 0.55'], ['A1', 'θ = 55°']] }] }
    ]
  });

  /* ---------------- f10 Three forces in equilibrium ---------------- */
  add('f10', {
    ex: [
      ['Two strings at different angles', 'A 50 N weight hangs from two strings at 30° and 60° to the horizontal. Find the tension in each.', [
        ['Horizontal components balance', '', ['T₁ cos 30° = T₂ cos 60°']],
        ['Vertical components balance the weight', '', ['T₁ sin 30° + T₂ sin 60° = 50']],
        ['Solve', 'From the first: T₂ = 1.732 T₁.', ['0.5T₁ + 1.5T₁ = 50', res('T₁ = 25 N (at 30°),  T₂ = 43 N (at 60°)'), 'The steeper string carries more of the weight.']]
      ], { chk: [['cosd(30)/cosd(60)', 1.732], ['50/(0.5+1.732*sind(60))', 25.0], ['1.732*25', 43.3]] }],
      ['Trap: angle to the horizontal or the vertical?', 'A 30 N picture hangs symmetrically from a nail; each half of the string makes 20° with the horizontal. Find the tension.', [
        ['Vertical balance', 'Each half supports half the weight through its vertical component.', ['2T sin 20° = 30']],
        ['Solve', 'The trap: using cos 20°, which gives 16 N.', [res('T = 15 ÷ sin 20° = 44 N')]],
        ['Why so large?', '', ['A string close to horizontal has only a small vertical component, so the tension must be large: a taut picture wire can snap.']]
      ], { chk: [['15/sind(20)', 43.86], ['15/cosd(20)', 15.96]] }]
    ],
    gaps: [
      { q: 'A 40 N lamp hangs from a horizontal cable and a cable at 40° to the horizontal.', lines: ['tension in the angled cable = 40 ÷ sin 40° = [[62.2]] N', 'tension in the horizontal cable = 62.2 cos 40° = [[47.7]] N'], calc: ['40/sind(40)', '40/tand(40)'], why: 'Only the angled cable can support the weight.' }
    ],
    exam: [
      { stem: '<p>A climber of weight 700 N hangs at rest from two ropes. One rope makes 35° with the horizontal and the other makes 50° with the horizontal.</p>', parts: [
        { q: 'Explain how a triangle of forces can be used to show that the climber is in equilibrium.', m: 1, lines: 2, ms: [['B1', 'The three forces drawn to scale, tip to tail, form a closed triangle (resultant zero)']] },
        { q: 'Calculate the tension in the rope at 50°.', m: 3, ans: { a: 575.6, unit: 'N', tol: 0.02 }, calc: '700/(cosd(50)/cosd(35)*sind(35)+sind(50))', ms: [['C1', 'horizontal: T₁ cos 35° = T₂ cos 50°'], ['C1', 'vertical: T₁ sin 35° + T₂ sin 50° = 700'], ['A1', 'T₂ = 580 N']] },
        { q: 'Calculate the tension in the rope at 35°.', m: 1, ans: { a: 451.7, unit: 'N', tol: 0.02 }, calc: '700/(cosd(50)/cosd(35)*sind(35)+sind(50))*cosd(50)/cosd(35)', ms: [['B1', 'T₁ = 575.6 × cos 50° ÷ cos 35° = 450 N']] },
        { q: 'Explain why neither rope can be exactly horizontal.', m: 1, lines: 2, ms: [['B1', 'A horizontal rope has no vertical component, so the ropes could not support the weight (the tension would have to be infinite)']] }] }
    ]
  });

  /* ---------------- f11 Density ---------------- */
  add('f11', {
    ex: [
      ['Density of an alloy', 'Jewellery is made from 300 g of gold (19.3 g cm⁻³) and 100 g of copper (8.96 g cm⁻³). Find its density.', [
        ['Volume of each metal', 'V = m ÷ ρ.', ['gold: 300 ÷ 19.3 = 15.5 cm³', 'copper: 100 ÷ 8.96 = 11.2 cm³']],
        ['Total', 'Masses and volumes add; densities do not.', [`ρ = ${fr('400', '26.7')}`, res('ρ = 15.0 g cm⁻³')]]
      ], { chk: [['300/19.3', 15.54], ['100/8.96', 11.16], ['400/(300/19.3+100/8.96)', 14.98]] }],
      ['Trap: g cm⁻³ and kg m⁻³', 'A steel rod of diameter 1.20 cm and length 15.0 cm has mass 133 g. Find its density in kg m⁻³.', [
        ['Volume in cm³', '', ['V = π × 0.60² × 15.0 = 16.96 cm³']],
        ['Density in g cm⁻³', '', ['ρ = 133 ÷ 16.96 = 7.84 g cm⁻³']],
        ['Convert', 'The trap: multiplying by 100. 1 g cm⁻³ = 1000 kg m⁻³.', [res('ρ = 7.84 × 10³ kg m⁻³')]]
      ], { chk: [['pi*0.36*15', 16.96], ['133/(pi*0.36*15)', 7.84]] }]
    ],
    gaps: [
      { q: 'A 2.0 kg block has volume 2.5 × 10⁻⁴ m³.', lines: ['density = [[8000]] kg m⁻³'], calc: ['2/2.5e-4'], why: 'ρ = m ÷ V.' },
      { q: 'Air has a density of 1.29 kg m⁻³.', lines: ['mass of 3.0 m³ of air = [[3.87]] kg'], calc: ['1.29*3'], why: 'm = ρV: a room of air has a mass of hundreds of kilograms.' }
    ],
    exam: [
      { stem: '<p>A student measures a metal cylinder. Diameter (2.50 ± 0.01) cm; length (4.00 ± 0.01) cm; mass (154.2 ± 0.1) g.</p>', parts: [
        { q: 'Calculate the volume of the cylinder.', m: 1, ans: { a: 19.63, unit: 'cm³', tol: 0.01 }, calc: 'pi*1.25**2*4', ms: [['B1', 'V = π × 1.25² × 4.00 = 19.6 cm³']] },
        { q: 'Calculate the density in kg m⁻³.', m: 1, ans: { a: 7854, unit: 'kg m⁻³', tol: 0.01 }, calc: '154.2/(pi*1.25**2*4)*1000', ms: [['B1', 'ρ = 154.2 ÷ 19.63 = 7.85 g cm⁻³ = 7850 kg m⁻³']] },
        { q: 'Calculate the percentage uncertainty in the density.', m: 2, ans: { a: 1.11, unit: '%', tol: 0.05 }, calc: '(2*0.01/2.50+0.01/4.00+0.1/154.2)*100', ms: [['C1', 'diameter 0.40 %, doubled to 0.80 %; length 0.25 %; mass 0.06 %'], ['A1', 'total 1.1 %']] },
        { q: 'Densities: aluminium 2700, iron 7870, copper 8960 kg m⁻³. Identify the metal.', m: 1, lines: 1, ms: [['B1', 'Iron: 7870 lies within 7850 ± 90 kg m⁻³']] }] }
    ]
  });

  /* ---------------- f12 Pressure and p = hρg ---------------- */
  add('f12', {
    ex: [
      ['Pressure at the foot of a dam', 'Water is 20 m deep behind a dam. Find the pressure due to the water at the bottom, and the total pressure there. (atmospheric pressure 1.01 × 10⁵ Pa)', [
        ['Pressure due to the water', '', ['p = hρg = 20 × 1000 × 9.81 = 1.96 × 10⁵ Pa']],
        ['Total pressure', 'The atmosphere presses on the surface too.', [res('p = 1.96 × 10⁵ + 1.01 × 10⁵ = 2.97 × 10⁵ Pa')]],
        ['Design', '', ['Pressure rises with depth, which is why dams are thicker at the base.']]
      ], { chk: [['20*1000*g', 1.962e5], ['20*1000*g+1.01e5', 2.972e5]] }],
      ['How tall is a barometer?', 'Atmospheric pressure is 1.01 × 10⁵ Pa. Find the height of a column of mercury (13 600 kg m⁻³) and of water that it can support.', [
        ['Mercury', 'h = p ÷ ρg.', [`h = ${fr('1.01 × 10⁵', '13 600 × 9.81')}`, res('h = 0.757 m')]],
        ['Water', '', [`h = ${fr('1.01 × 10⁵', '1000 × 9.81')}`, res('h = 10.3 m: why mercury is used')]]
      ], { chk: [['1.01e5/(13600*g)', 0.757], ['1.01e5/(1000*g)', 10.3]] }]
    ],
    gaps: [
      { q: 'Find the pressure due to 4.0 m of water.', lines: ['p = hρg = [[3.92e4]] Pa'], calc: ['4*1000*g'], why: 'About 0.4 of atmospheric pressure.' },
      { q: 'A 600 N person stands on boots of total area 0.030 m².', lines: ['pressure = [[2.0e4]] Pa'], calc: ['600/0.03'], why: 'p = F ÷ A.' }
    ],
    exam: [
      { stem: '<p>A submarine has a rectangular window 0.20 m × 0.30 m. It is at a depth of 150 m in seawater of density 1030 kg m⁻³. The air inside is at atmospheric pressure.</p>', parts: [
        { q: 'Calculate the pressure due to the seawater at this depth.', m: 2, ans: { a: 1.516e6, unit: 'Pa', tol: 0.02 }, calc: '150*1030*g', ms: [['C1', 'p = hρg = 150 × 1030 × 9.81'], ['A1', 'p = 1.5 × 10⁶ Pa']] },
        { q: 'Calculate the resultant force on the window.', m: 2, ans: { a: 9.09e4, unit: 'N', tol: 0.02 }, calc: '150*1030*g*0.06', ms: [['C1', 'atmospheric pressure acts on both sides, so use the water pressure only; A = 0.060 m²'], ['A1', 'F = 1.52 × 10⁶ × 0.060 = 9.1 × 10⁴ N']] }] }
    ]
  });

  /* ---------------- f13 Upthrust and Archimedes' principle ---------------- */
  add('f13', {
    ex: [
      ['How much of an iceberg is hidden?', 'Ice has density 917 kg m⁻³ and seawater 1025 kg m⁻³. What fraction of a floating iceberg is below the surface?', [
        ['Floating', 'Upthrust = weight.', ['ρ_water × V_sub × g = ρ_ice × V × g']],
        ['Fraction', '', [`${fr('V_sub', 'V')} = ${fr('917', '1025')}`, res('0.89: nearly 90 % is underwater')]]
      ], { chk: [['917/1025', 0.8946]] }],
      ['Finding density by weighing in water', 'A stone weighs 6.0 N in air and 4.2 N when fully submerged in water. Find its volume and density.', [
        ['Upthrust', 'The loss in apparent weight.', ['U = 6.0 − 4.2 = 1.8 N']],
        ['Volume', 'Upthrust = weight of water displaced.', [`V = ${fr('1.8', '1000 × 9.81')} = 1.83 × 10⁻⁴ m³`]],
        ['Density', '', [`ρ = ${fr('6.0 ÷ 9.81', '1.83 × 10⁻⁴')}`, res('ρ = 3.3 × 10³ kg m⁻³')]]
      ], { chk: [['6-4.2', 1.8], ['1.8/(1000*g)', 1.835e-4], ['(6/g)/(1.8/(1000*g))', 3333]] }]
    ],
    gaps: [
      { q: 'An object of volume 5.0 × 10⁻⁴ m³ is fully submerged in water.', lines: ['upthrust = 1000 × 5.0 × 10⁻⁴ × 9.81 = [[4.905]] N'], calc: ['1000*5e-4*g'], why: 'Upthrust = weight of fluid displaced.' },
      { q: 'A block floats in water with 0.60 of its volume submerged.', lines: ['density of the block = 0.60 × 1000 = [[600]] kg m⁻³'], calc: ['600'], why: 'The submerged fraction equals the density ratio.' }
    ],
    exam: [
      { stem: '<p>A balloon contains 0.012 m³ of helium (density 0.18 kg m⁻³). The rubber has a mass of 0.0040 kg. The density of air is 1.29 kg m⁻³. Ignore the volume of the rubber.</p>', parts: [
        { q: 'Calculate the upthrust on the balloon.', m: 1, ans: { a: 0.152, unit: 'N', tol: 0.02 }, calc: '1.29*0.012*g', ms: [['B1', 'U = 1.29 × 0.012 × 9.81 = 0.15 N']] },
        { q: 'Calculate the total weight of the balloon and helium.', m: 2, ans: { a: 0.0604, unit: 'N', tol: 0.02 }, calc: '(0.18*0.012+0.004)*g', ms: [['C1', 'mass = 0.18 × 0.012 + 0.0040 = 6.16 × 10⁻³ kg'], ['A1', 'W = 0.060 N']] },
        { q: 'Calculate the initial acceleration of the balloon when released, ignoring drag.', m: 2, ans: { a: 14.8, unit: 'm s⁻²', tol: 0.03 }, calc: '(1.29*0.012*g-(0.18*0.012+0.004)*g)/(0.18*0.012+0.004)', ms: [['C1', 'resultant = 0.152 − 0.060 = 0.091 N'], ['A1', 'a = 0.091 ÷ 6.16 × 10⁻³ = 15 m s⁻²']] },
        { q: 'Explain why the real balloon soon rises at a constant speed.', m: 1, lines: 2, ms: [['B1', 'Drag increases with speed until upthrust = weight + drag, so the resultant force becomes zero']] }] }
    ]
  });

  /* ---------------- f14 Review and exam practice ---------------- */
  add('f14', {
    ex: [
      ['Synoptic: braking downhill', 'A 1200 kg car moving at 15 m s⁻¹ down a hill inclined at 8.0° must stop in 30 m. Ignoring other resistance, find the braking force needed.', [
        ['Deceleration needed', 'v² = u² + 2as.', [`a = ${fr('15²', '2 × 30')} = 3.75 m s⁻²`]],
        ['Forces along the slope', 'Up the slope positive. Gravity pulls the car down the hill, working against the brakes.', ['F_brake − mg sin 8.0° = ma']],
        ['Braking force', '', ['F = 1200 × 3.75 + 1200 × 9.81 × sin 8.0° = 4500 + 1638', res('F = 6.1 × 10³ N')]]
      ], { chk: [['225/60', 3.75], ['1200*g*sind(8)', 1638], ['1200*3.75+1200*g*sind(8)', 6138]] }],
      ['A model answer: balanced forces or a third-law pair?', 'A lamp hangs at rest from a cable. Explain why its weight and the tension in the cable are not a Newton’s third law pair. (3 marks)', [
        ['Same object', '', [`Both forces act on the ${mp('same object')} (the lamp); third-law pairs act on ${mp('different objects')}.`]],
        ['Different types', '', [`Weight is ${mp('gravitational')}; tension is a ${mp('contact')} force. A pair is always the same type.`]],
        ['The real partners', '', ['The lamp pulls the Earth up (partner of its weight); the lamp pulls the cable down (partner of the tension). The weight and tension are equal only because the lamp is in equilibrium.']]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A 5.0 kg block is pulled up a smooth slope at 30° by a force of 40 N parallel to the slope.', lines: ['component of weight down the slope = [[24.5]] N', 'acceleration up the slope = [[3.09]] m s⁻²'], calc: ['5*g*sind(30)', '(40-5*g*sind(30))/5'], why: 'Resolve along the slope, then F = ma.' }
    ],
    exam: [
      { stem: '<p>A tower crane lifts a load of weight 5000 N at 10 m from the tower. A counterweight sits on the other arm, 3.0 m from the tower. Ignore the weight of the arms.</p>', parts: [
        { q: 'Calculate the moment of the load about the tower.', m: 1, ans: { a: 5.0e4, unit: 'N m', tol: 0.01 }, calc: '5000*10', ms: [['B1', '5000 × 10 = 5.0 × 10⁴ N m']] },
        { q: 'Calculate the counterweight needed to balance the load.', m: 1, ans: { a: 16667, unit: 'N', tol: 0.02 }, calc: '5000*10/3', ms: [['B1', 'W × 3.0 = 5.0 × 10⁴, so W = 1.7 × 10⁴ N']] },
        { q: 'Calculate the downward force the arms exert on the tower.', m: 1, ans: { a: 21667, unit: 'N', tol: 0.02 }, calc: '5000+5000*10/3', ms: [['B1', '5000 + 16 700 = 2.2 × 10⁴ N']] },
        { q: 'Explain why the maximum safe load is smaller at the end of the arm than near the tower.', m: 1, lines: 2, ms: [['B1', 'The moment of a load increases with its distance from the tower, and the counterweight can only provide a fixed maximum moment']] }] }
    ]
  });

  /* third fill-the-gaps for the calculation-heavy lessons */
  add('f3', { gaps: [{ q: 'A 2.0 kg block slides down a smooth slope at 30°.', lines: ['component of weight down the slope = [[9.81]] N', 'acceleration = [[4.905]] m s⁻²'], calc: ['2*g*sind(30)', 'g*sind(30)'], why: 'On a smooth slope a = g sin θ, whatever the mass.' }] });
  add('f4', { gaps: [{ q: 'A 1500 kg car tows a 500 kg trailer with a driving force of 3000 N. Ignore resistance.', lines: ['acceleration = [[1.5]] m s⁻²', 'tension in the tow bar = 500 × 1.5 = [[750]] N'], calc: ['3000/2000', '500*1.5'], why: 'The tow bar accelerates only the trailer.' }] });
  add('f5', { gaps: [{ q: 'A cyclist’s speed rises from 6.0 m s⁻¹ to 9.0 m s⁻¹. Drag ∝ v².', lines: ['speed ratio = [[1.5]]', 'drag is multiplied by [[2.25]]'], calc: ['9/6', '1.5**2'], why: 'Square the speed ratio.' }, { q: 'A car has drag D = 0.50v² and a driving force of 800 N.', lines: ['drag at 30 m s⁻¹ = [[450]] N', 'acceleration of the 1000 kg car at 30 m s⁻¹ = [[0.35]] m s⁻²'], calc: ['0.5*900', '(800-450)/1000'], why: 'The acceleration falls as the speed rises.' }] });
  add('f6', { gaps: [{ q: 'A raindrop of mass 3.0 × 10⁻⁵ kg falls at terminal velocity 6.5 m s⁻¹, with D = kv².', lines: ['weight = [[2.94e-4]] N', 'k = 2.94 × 10⁻⁴ ÷ 6.5² = [[6.97e-6]] kg m⁻¹'], calc: ['3e-5*g', '3e-5*g/6.5**2'], why: 'At terminal velocity drag equals weight (upthrust in air is negligible).' }] });
  add('f7', { gaps: [{ q: 'A spanner 0.30 m long is used to undo a nut that needs a moment of 45 N m.', lines: ['force needed at the end = [[150]] N', 'force needed if the spanner is twice as long = [[75]] N'], calc: ['45/0.3', '45/0.6'], why: 'A longer lever needs a smaller force for the same moment.' }] });
  add('f8', { gaps: [{ q: 'A steering wheel of diameter 0.40 m is turned by two 30 N forces tangential to the rim.', lines: ['torque = 30 × 0.40 = [[12]] N m'], calc: ['30*0.4'], why: 'The perpendicular separation is the diameter.' }] });
  add('f10', { gaps: [{ q: 'A 60 N weight hangs from a string; a horizontal force pulls it until the string is at 30° to the vertical.', lines: ['tension = 60 ÷ cos 30° = [[69.3]] N', 'horizontal force = 60 tan 30° = [[34.6]] N'], calc: ['60/cosd(30)', '60*tand(30)'], why: 'The angle is measured from the VERTICAL here, so the vertical component uses cos.' }, { q: 'Forces of 3.0 N and 4.0 N at right angles act on a point in equilibrium with a third force.', lines: ['size of the third force = [[5]] N'], calc: ['5'], why: 'It must equal the resultant of the other two, in the opposite direction.' }] });
  add('f11', { gaps: [{ q: 'A cube of side 3.0 cm has mass 72.9 g.', lines: ['volume = [[27]] cm³', 'density = [[2.7]] g cm⁻³ = 2700 kg m⁻³'], calc: ['27', '72.9/27'], why: 'Aluminium.' }] });
  add('f12', { gaps: [{ q: 'A diver is 12 m below the surface of a lake (ρ = 1000 kg m⁻³). Atmospheric pressure is 1.01 × 10⁵ Pa.', lines: ['pressure due to the water = [[1.18e5]] Pa', 'total pressure = [[2.19e5]] Pa'], calc: ['12*1000*g', '12*1000*g+1.01e5'], why: 'About 10 m of water adds one atmosphere.' }] });
  add('f13', { gaps: [{ q: 'A boat of mass 400 kg floats in fresh water.', lines: ['upthrust = [[3924]] N', 'volume of water displaced = [[0.4]] m³'], calc: ['400*g', '400/1000'], why: 'A floating object displaces its own mass of fluid.' }] });

  /* ---- top-up fill-the-gaps ---- */
  add('f2', { gaps: [
    { q: 'Forces of 3.0 N east and 4.0 N north act on a ball.', lines: ['resultant = [[5]] N', 'at [[53.1]]° north of east'], calc: ['5', 'atand(4/3)'], why: 'Pythagoras and tan⁻¹.' }
  ] });
  add('f9', { gaps: [
    { q: 'A uniform beam is 3.0 m long and has a mass of 12 kg.', lines: ['its centre of gravity is [[1.5]] m from either end', 'moment of its weight about one end = [[176.6]] N m'], calc: ['1.5', '12*g*1.5'], why: 'For a uniform beam the weight acts at the midpoint.' }
  ] });
  add('f14', { gaps: [
    { q: 'A 75 kg skydiver falls at terminal velocity.', lines: ['drag force = [[735.8]] N'], calc: ['75*g'], why: 'At terminal velocity the resultant force is zero.' },
    { q: 'A 2.0 × 10⁻³ m³ block is fully submerged in water (density 1000 kg m⁻³).', lines: ['upthrust = ρVg = [[19.62]] N'], calc: ['1000*2e-3*g'], why: 'Equal to the weight of water displaced.' }
  ] });
})();
