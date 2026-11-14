/* Thermal physics (t1–t10): extra worked examples, fill-the-gaps and exam-style questions.
   k = 1.38e-23 J K⁻¹, R = 8.31 J mol⁻¹ K⁻¹, NA = 6.02e23 mol⁻¹; c(water) = 4200 J kg⁻¹ K⁻¹,
   L_f(ice) = 3.34e5 J kg⁻¹, L_v(water) = 2.26e6 J kg⁻¹. Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const mp = t => `<b>${t}</b>`;

  /* ---------------- t1 Temperature and the kelvin scale ---------------- */
  add('t1', {
    ex: [
      ['A model answer: thermal equilibrium', 'A hot metal block is dropped into cool water in an insulated flask. Describe what happens until thermal equilibrium is reached. (3 marks)', [
        ['Net energy flow', '', [`There is a ${mp('net transfer of thermal energy from the hotter block to the cooler water')}.`]],
        ['Temperatures', '', [`The block cools and the water warms until they reach the ${mp('same temperature')}.`]],
        ['Equilibrium', 'Energy still moves both ways at the particle level.', [`At equilibrium there is ${mp('no net energy transfer')}: the rates in each direction are equal.`]]
      ], { desc: true }],
      ['Trap: ratios need kelvin', 'A gas is warmed from 20 °C to 40 °C. By what factor does the mean kinetic energy of its molecules increase?', [
        ['The tempting answer', 'The trap: 40 ÷ 20 = 2.', ['×2  ✗']],
        ['Use absolute temperature', 'Mean kinetic energy is proportional to T in kelvin.', ['20 °C = 293 K, 40 °C = 313 K']],
        ['Ratio', '', [res('313 ÷ 293 = 1.07: only a 7 % increase')]]
      ], { chk: [['313/293', 1.068]] }]
    ],
    gaps: [
      { q: 'Body temperature is 37 °C.', lines: ['in kelvin = [[310]] K'], calc: ['37+273'], why: 'Add 273.' },
      { q: 'Liquid nitrogen boils at 77 K.', lines: ['in °C = [[-196]] °C'], calc: ['77-273'], why: 'Subtract 273.' },
      { q: 'Water warms from 25 °C to 85 °C.', lines: ['temperature change = [[60]] K'], calc: ['60'], why: 'A change of 1 °C is the same as a change of 1 K.' }
    ],
    exam: [
      { stem: '<p>A copper block at 80 °C and an aluminium block at 20 °C are placed in contact inside an insulated box.</p>', parts: [
        { q: 'State and explain the direction of the net energy transfer.', m: 2, lines: 3, ms: [['B1', 'From the copper block to the aluminium block'], ['B1', 'Thermal energy is transferred from the hotter object to the colder one (net flow from higher to lower temperature)']] },
        { q: 'State the condition for the two blocks to be in thermal equilibrium.', m: 1, lines: 1, ms: [['B1', 'They are at the same temperature (no net energy transfer between them)']] },
        { q: 'Explain why the final temperature is not necessarily 50 °C.', m: 1, lines: 2, ms: [['B1', 'The blocks have different masses and/or specific heat capacities, so equal energy transfers give different temperature changes']] }] },
      { stem: '<p>Nitrogen gas is warmed from 77 K to 300 K.</p>', parts: [
        { q: 'Convert 77 K into degrees Celsius.', m: 1, ans: { a: -196, unit: '°C', tol: 0.01 }, calc: '77-273', ms: [['B1', '77 − 273 = −196 °C']] },
        { q: 'Calculate the factor by which the mean kinetic energy of the molecules increases.', m: 1, ans: { a: 3.90, unit: '', tol: 0.01 }, calc: '300/77', ms: [['B1', 'E ∝ T, so 300 ÷ 77 = 3.9']] },
        { q: 'Explain why this ratio cannot be found using Celsius temperatures.', m: 1, lines: 2, ms: [['B1', 'The Celsius scale does not start at absolute zero, so Celsius values are not proportional to the mean kinetic energy']] },
        { q: 'State what is meant by absolute zero.', m: 1, lines: 2, ms: [['B1', 'The temperature at which the particles have minimum internal energy (minimum kinetic energy): 0 K']] }] }
    ]
  });

  /* ---------------- t2 The kinetic model and Brownian motion ---------------- */
  add('t2', {
    ex: [
      ['How far apart are molecules in steam?', '1.0 kg of water occupies 1.0 × 10⁻³ m³ as a liquid and about 1.7 m³ as steam at 100 °C. By what factor does the spacing of the molecules increase?', [
        ['Volume ratio', '', ['1.7 ÷ 1.0 × 10⁻³ = 1700']],
        ['Spacing', 'Spacing goes as the cube root of the volume per molecule.', [`∛1700`, res('about 12 times further apart')]],
        ['Consequence', '', ['This is why gases are easily compressed and have densities about a thousand times smaller than liquids.']]
      ], { chk: [['1.7/1e-3', 1700], ['cbrt(1700)', 11.9]] }],
      ['How many molecules in a drop?', 'A drop of water has a mass of 0.050 g. The molar mass of water is 18 g mol⁻¹. How many molecules does it contain?', [
        ['Moles', '', ['n = 0.050 ÷ 18 = 2.78 × 10⁻³ mol']],
        ['Molecules', 'N = nN_A.', [res('N = 2.78 × 10⁻³ × 6.02 × 10²³ = 1.7 × 10²¹')]]
      ], { chk: [['0.05/18', 2.78e-3], ['0.05/18*NA', 1.67e21]] }]
    ],
    gaps: [
      { q: 'One mole of any substance contains', lines: ['[[6.02e23]] particles'], calc: ['NA'], why: 'The Avogadro constant.' },
      { q: 'Water has molar mass 18 g mol⁻¹.', lines: ['moles in 9.0 g = [[0.5]] mol'], calc: ['9/18'], why: 'n = mass ÷ molar mass.' },
      { q: 'In steam, 1.0 kg occupies 1.7 m³. One molecule has mass 0.018 ÷ 6.02 × 10²³ kg.', lines: ['typical spacing = ∛(volume per molecule) = [[3.7e-9]] m'], calc: ['cbrt(1.7*0.018/NA)'], why: 'About ten molecular diameters.' }
    ],
    exam: [
      { stem: '<p>Smoke particles in air are viewed through a microscope and are seen to move randomly.</p>', parts: [
        { q: 'Explain why the smoke particles move more vigorously when the air is warmer.', m: 2, lines: 3, ms: [['B1', 'The air molecules have a higher mean kinetic energy (move faster)'], ['B1', 'They collide with the smoke particles harder and the uneven collisions give larger random impulses']] },
        { q: 'Explain why larger smoke particles show less Brownian motion.', m: 2, lines: 3, ms: [['B1', 'More molecules hit a larger particle at once, so the impulses from different sides tend to balance'], ['B1', 'and its greater mass means any resultant force gives a smaller acceleration']] }] }
    ]
  });

  /* ---------------- t3 Internal energy and changes of state ---------------- */
  add('t3', {
    ex: [
      ['From ice to warm water', 'Find the energy needed to turn 0.20 kg of ice at −10 °C into water at 20 °C. (c(ice) = 2100 J kg⁻¹ K⁻¹)', [
        ['Warm the ice to 0 °C', '', ['0.20 × 2100 × 10 = 4200 J']],
        ['Melt it', 'No temperature change.', ['0.20 × 3.34 × 10⁵ = 66 800 J']],
        ['Warm the water', '', ['0.20 × 4200 × 20 = 16 800 J']],
        ['Total', 'Melting needs far more than either warming stage.', [res('8.8 × 10⁴ J')]]
      ], { chk: [['0.2*2100*10', 4200], ['0.2*3.34e5', 66800], ['0.2*4200*20', 16800], ['4200+66800+16800', 87800]] }],
      ['A model answer: energy in, temperature constant', 'Explain why the temperature of a substance stays constant while it melts, even though it is being heated. (3 marks)', [
        ['Where the energy goes', '', [`The energy supplied ${mp('breaks bonds')} between particles (it does work against the attractive forces).`]],
        ['Kinetic and potential', '', [`The ${mp('potential energy')} of the particles increases; their ${mp('mean kinetic energy does not')}.`]],
        ['Temperature', '', [`Temperature depends on the mean kinetic energy, so it stays constant, while the ${mp('internal energy increases')}.`]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'Find the energy to melt 0.50 kg of ice at 0 °C.', lines: ['E = mL_f = [[1.67e5]] J'], calc: ['0.5*3.34e5'], why: 'No temperature change during melting.' },
      { q: 'Find the energy to heat 0.50 kg of water from 0 °C to 100 °C.', lines: ['E = mcΔθ = [[2.1e5]] J'], calc: ['0.5*4200*100'], why: 'Similar to the energy for melting.' },
      { q: 'Find the energy to boil away 0.50 kg of water at 100 °C.', lines: ['E = mL_v = [[1.13e6]] J'], calc: ['0.5*2.26e6'], why: 'More than five times the energy to heat it from 0 °C to 100 °C.' }
    ],
    exam: [
      { stem: '<p>0.30 kg of a solid wax is heated by a 50 W heater. Its temperature stays at 55 °C for 4.0 minutes while it melts.</p>', parts: [
        { q: 'Calculate the energy supplied while the wax melts.', m: 1, ans: { a: 12000, unit: 'J', tol: 0.01 }, calc: '50*240', ms: [['B1', '50 × 240 = 1.2 × 10⁴ J']] },
        { q: 'Calculate the specific latent heat of fusion of the wax.', m: 2, ans: { a: 4.0e4, unit: 'J kg⁻¹', tol: 0.01 }, calc: '50*240/0.3', ms: [['C1', 'L = E ÷ m'], ['A1', 'L = 1.2 × 10⁴ ÷ 0.30 = 4.0 × 10⁴ J kg⁻¹']] },
        { q: 'State and explain whether this value is likely to be too large or too small.', m: 1, lines: 2, ms: [['B1', 'Too large: some of the heater’s energy is lost to the surroundings rather than melting the wax']] },
        { q: 'Describe what happens to the internal energy of the wax while it melts.', m: 1, lines: 2, ms: [['B1', 'It increases: the potential energy of the particles increases while their mean kinetic energy stays the same']] }] }
    ]
  });

  /* ---------------- t4 Specific heat capacity ---------------- */
  add('t4', {
    ex: [
      ['Method of mixtures', 'A 0.20 kg copper block at 95 °C is dropped into 0.30 kg of water at 20 °C. Find the final temperature. (c(copper) = 385 J kg⁻¹ K⁻¹; ignore heat losses)', [
        ['Energy lost = energy gained', 'Let the final temperature be T.', ['0.20 × 385 × (95 − T) = 0.30 × 4200 × (T − 20)']],
        ['Expand', '', ['7315 − 77T = 1260T − 25 200', '1337T = 32 515']],
        ['Solve', '', [res('T = 24 °C: water’s large specific heat capacity keeps its temperature rise small')]]
      ], { chk: [['(7315+25200)/1337', 24.32], ['0.2*385*95', 7315]] }],
      ['Trap: using the gradient', 'A 50 W heater warms a 1.0 kg block. The graph of temperature against time is a straight line of gradient 0.055 K s⁻¹. Find c, and say how heat loss affects it.', [
        ['Power balance', 'P = mc × (rate of temperature rise).', [`c = ${fr('P', 'm × gradient')} = ${fr('50', '1.0 × 0.055')}`]],
        ['Value', '', [res('c = 910 J kg⁻¹ K⁻¹')]],
        ['Effect of losses', 'The trap: thinking losses make c too small.', ['Losses make the temperature rise more slowly, so the gradient is too small and c comes out too LARGE.']]
      ], { chk: [['50/0.055', 909]] }]
    ],
    gaps: [
      { q: '0.50 kg of water is heated by 15 K.', lines: ['energy = [[31500]] J'], calc: ['0.5*4200*15'], why: 'E = mcΔθ.' },
      { q: '9000 J raises the temperature of 0.40 kg of a metal by 25 K.', lines: ['c = [[900]] J kg⁻¹ K⁻¹'], calc: ['9000/(0.4*25)'], why: 'About right for aluminium.' },
      { q: 'A 2.0 kW kettle heats 1.5 kg of water by 80 K.', lines: ['time = mcΔθ ÷ P = [[252]] s'], calc: ['1.5*4200*80/2000'], why: 'About four minutes, ignoring losses.' }
    ],
    exam: [
      { stem: '<p>A student finds the specific heat capacity of an oil. 0.25 kg of oil in an insulated beaker is heated by a 30 W immersion heater. A graph of temperature against time is a straight line of gradient 0.060 K s⁻¹.</p>', parts: [
        { q: 'Calculate the specific heat capacity of the oil.', m: 2, ans: { a: 2000, unit: 'J kg⁻¹ K⁻¹', tol: 0.02 }, calc: '30/(0.25*0.06)', ms: [['C1', 'P = mc × gradient'], ['A1', 'c = 30 ÷ (0.25 × 0.060) = 2.0 × 10³ J kg⁻¹ K⁻¹']] },
        { q: 'Explain why using the gradient of the graph is better than using a single pair of readings.', m: 2, lines: 3, ms: [['B1', 'The gradient uses all the readings, reducing the effect of random error in any one'], ['B1', 'It avoids the start, when the heater and beaker are still warming up (the heater takes time to reach a steady state)']] },
        { q: 'State and explain the effect of heat loss on the value of c.', m: 1, lines: 2, ms: [['B1', 'c will be too large: the temperature rises more slowly than it would without losses, so the gradient is smaller']] },
        { q: 'Suggest one improvement to the method.', m: 1, lines: 2, ms: [['B1', 'Any one: add a lid and more insulation; stir the oil; start below room temperature and finish the same amount above it']] }] }
    ]
  });

  /* ---------------- t5 Specific latent heat ---------------- */
  add('t5', {
    ex: [
      ['A kettle boiling dry', 'A 2.4 kW kettle contains 0.50 kg of water that has just reached 100 °C. How long until it boils dry, ignoring losses?', [
        ['Energy needed', 'Only latent heat: the temperature stays at 100 °C.', ['E = 0.50 × 2.26 × 10⁶ = 1.13 × 10⁶ J']],
        ['Time', '', [res('t = 1.13 × 10⁶ ÷ 2400 = 471 s (about 8 minutes)')]]
      ], { chk: [['0.5*2.26e6', 1.13e6], ['0.5*2.26e6/2400', 470.8]] }],
      ['Trap: why steam burns are worse', 'Compare the energy given to the skin by 5.0 g of steam at 100 °C and by 5.0 g of water at 100 °C, each cooling to 37 °C on the skin.', [
        ['Boiling water', '', ['0.0050 × 4200 × 63 = 1323 J']],
        ['Steam', 'The trap: forgetting that steam first condenses, releasing its latent heat.', ['condensing: 0.0050 × 2.26 × 10⁶ = 11 300 J', 'then cooling: 1323 J']],
        ['Compare', '', [res('steam: 1.26 × 10⁴ J, nearly ten times as much as the water')]]
      ], { chk: [['0.005*4200*63', 1323], ['0.005*2.26e6', 11300], ['0.005*2.26e6+0.005*4200*63', 12623]] }]
    ],
    gaps: [
      { q: 'Find the energy to vaporise 0.20 kg of water at 100 °C.', lines: ['E = [[4.52e5]] J'], calc: ['0.2*2.26e6'], why: 'E = mL_v.' },
      { q: '6.68 × 10⁴ J melts 0.20 kg of a solid at its melting point.', lines: ['L = [[3.34e5]] J kg⁻¹'], calc: ['6.68e4/0.2'], why: 'This is ice.' },
      { q: '1.0 × 10⁴ J is supplied to ice at 0 °C.', lines: ['mass melted = [[0.0299]] kg'], calc: ['1e4/3.34e5'], why: 'm = E ÷ L.' }
    ],
    exam: [
      { stem: '<p>To find the specific latent heat of vaporisation of water, a heater keeps water boiling. At a power of 60 W, 14.0 g boils away in 600 s. At 40 W, 8.6 g boils away in the same time. The rate of heat loss is the same in both runs.</p>', parts: [
        { q: 'Explain why using two different powers removes the effect of heat loss.', m: 2, lines: 3, ms: [['B1', 'In both runs the same energy is lost to the surroundings in the same time'], ['B1', 'Subtracting the two equations, P₁t − P₂t = (m₁ − m₂)L, cancels the heat loss']] },
        { q: 'Calculate the specific latent heat of vaporisation.', m: 2, ans: { a: 2.22e6, unit: 'J kg⁻¹', tol: 0.02 }, calc: '(60-40)*600/(0.0140-0.0086)', ms: [['C1', 'L = (60 − 40) × 600 ÷ (0.0140 − 0.0086)'], ['A1', 'L = 2.2 × 10⁶ J kg⁻¹']] },
        { q: 'Calculate the rate of heat loss to the surroundings.', m: 2, ans: { a: 8.15, unit: 'W', tol: 0.03 }, calc: '(60*600-0.014*(20*600/0.0054))/600', ms: [['C1', '60 × 600 = 0.0140 × 2.22 × 10⁶ + h × 600'], ['A1', 'h = 8 W']] }] }
    ]
  });

  /* ---------------- t6 The gas laws and absolute zero ---------------- */
  add('t6', {
    ex: [
      ['A bubble rising through water', 'An air bubble of volume 2.0 cm³ is released 20 m below the surface of a lake. Atmospheric pressure is 1.01 × 10⁵ Pa. Assuming the temperature is constant, find its volume at the surface.', [
        ['Pressure at depth', 'p = p_atm + hρg.', ['p₁ = 1.01 × 10⁵ + 20 × 1000 × 9.81 = 2.97 × 10⁵ Pa']],
        ['Boyle’s law', 'pV = constant at constant temperature.', [`V₂ = ${fr('2.97 × 10⁵ × 2.0', '1.01 × 10⁵')}`, res('V₂ = 5.9 cm³')]]
      ], { chk: [['1.01e5+20*1000*g', 2.972e5], ['(1.01e5+20*1000*g)*2/1.01e5', 5.89]] }],
      ['Trap: the pressure law needs kelvin', 'A tyre is at 220 kPa at 7 °C. After a drive it is at 37 °C. Find the new pressure, assuming its volume is constant.', [
        ['The tempting answer', 'The trap: 220 × 37 ÷ 7.', ['1160 kPa  ✗']],
        ['Use kelvin', 'p ∝ T for a fixed mass at constant volume.', ['T₁ = 280 K, T₂ = 310 K']],
        ['Calculate', '', [res('p₂ = 220 × 310 ÷ 280 = 244 kPa')]]
      ], { chk: [['220*310/280', 243.6]] }]
    ],
    gaps: [
      { q: 'A gas is compressed to half its volume at constant temperature.', lines: ['its pressure is multiplied by [[2]]'], calc: ['2'], why: 'Boyle’s law: pV = constant.' },
      { q: 'A gas at constant volume is heated from 300 K to 600 K.', lines: ['its pressure is multiplied by [[2]]'], calc: ['2'], why: 'p ∝ T in kelvin.' },
      { q: 'A gas has pressure 100 kPa at 0 °C and 136.6 kPa at 100 °C (constant volume).', lines: ['extrapolating to zero pressure: θ = −100 × 100 ÷ 36.6 = [[-273]] °C'], calc: ['-100*100/36.6'], why: 'This is absolute zero.' }
    ],
    exam: [
      { stem: '<p>A constant-volume gas thermometer reads 96.0 kPa at 10 °C and 129.9 kPa at 110 °C.</p>', parts: [
        { q: 'Calculate the increase in pressure per kelvin.', m: 1, ans: { a: 0.339, unit: 'kPa K⁻¹', tol: 0.01 }, calc: '(129.9-96.0)/100', ms: [['B1', '33.9 ÷ 100 = 0.339 kPa K⁻¹']] },
        { q: 'Use the data to estimate absolute zero in °C.', m: 2, ans: { a: -273.2, unit: '°C', tol: 0.01 }, calc: '10-96.0/((129.9-96.0)/100)', ms: [['C1', 'pressure falls to zero after a further 96.0 ÷ 0.339 = 283 K below 10 °C'], ['A1', '10 − 283 = −273 °C']] },
        { q: 'Explain why the graph of pressure against temperature is a straight line.', m: 1, lines: 2, ms: [['B1', 'For an ideal gas at constant volume, p ∝ T (absolute temperature), so p increases linearly with θ']] },
        { q: 'State two quantities that must be kept constant.', m: 1, lines: 1, ms: [['B1', 'The mass (amount) of gas and its volume']] }] }
    ]
  });

  /* ---------------- t7 The ideal gas equation ---------------- */
  add('t7', {
    ex: [
      ['How many molecules in a room?', 'A room is 5.0 m × 4.0 m × 3.0 m. The air is at 1.01 × 10⁵ Pa and 293 K. Find the number of molecules.', [
        ['Volume', '', ['V = 60 m³']],
        ['pV = NkT', '', [`N = ${fr('pV', 'kT')} = ${fr('1.01 × 10⁵ × 60', '1.38 × 10⁻²³ × 293')}`, res('N = 1.5 × 10²⁷ molecules')]]
      ], { chk: [['1.01e5*60/(k*293)', 1.499e27]] }],
      ['Trap: three unit conversions', 'A syringe holds 250 cm³ of gas at 20 °C and 150 kPa. How many moles is that?', [
        ['Convert everything to SI', 'The trap: substituting 250, 20 and 150 directly.', ['V = 250 × 10⁻⁶ m³,  T = 293 K,  p = 1.50 × 10⁵ Pa']],
        ['pV = nRT', '', [`n = ${fr('1.50 × 10⁵ × 2.50 × 10⁻⁴', '8.31 × 293')}`, res('n = 0.0154 mol')]]
      ], { chk: [['1.5e5*2.5e-4/(R*293)', 0.0154]] }]
    ],
    gaps: [
      { q: 'A gas at 1.0 × 10⁵ Pa occupies 0.024 m³ at 300 K.', lines: ['n = pV ÷ RT = [[0.963]] mol'], calc: ['1e5*0.024/(R*300)'], why: 'About one mole: 24 litres at room temperature.' },
      { q: 'That gas contains', lines: ['N = nN_A = [[5.8e23]] molecules'], calc: ['1e5*0.024/(R*300)*NA'], why: 'Or N = pV ÷ kT.' },
      { q: '1.0 mol of gas occupies 0.010 m³ at 2.0 × 10⁵ Pa.', lines: ['T = pV ÷ nR = [[240.7]] K'], calc: ['2e5*0.01/R'], why: 'Rearrange pV = nRT.' }
    ],
    exam: [
      { stem: '<p>A scuba diving tank of volume 0.012 m³ contains air at 2.0 × 10⁷ Pa and 290 K. The molar mass of air is 0.029 kg mol⁻¹.</p>', parts: [
        { q: 'Calculate the number of moles of air in the tank.', m: 2, ans: { a: 99.6, unit: 'mol', tol: 0.02 }, calc: '2e7*0.012/(R*290)', ms: [['C1', 'n = pV ÷ RT'], ['A1', 'n = 2.0 × 10⁷ × 0.012 ÷ (8.31 × 290) = 100 mol']] },
        { q: 'Calculate the mass of air in the tank.', m: 1, ans: { a: 2.89, unit: 'kg', tol: 0.02 }, calc: '2e7*0.012/(R*290)*0.029', ms: [['B1', '99.6 × 0.029 = 2.9 kg']] },
        { q: 'Calculate the volume this air would occupy at 1.0 × 10⁵ Pa and 290 K.', m: 2, ans: { a: 2.4, unit: 'm³', tol: 0.01 }, calc: '2e7*0.012/1e5', ms: [['C1', 'at constant temperature, p₁V₁ = p₂V₂'], ['A1', 'V = 2.0 × 10⁷ × 0.012 ÷ 1.0 × 10⁵ = 2.4 m³']] },
        { q: 'The tank is left in the sun and warms to 320 K. Calculate the new pressure.', m: 1, ans: { a: 2.21e7, unit: 'Pa', tol: 0.02 }, calc: '2e7*320/290', ms: [['B1', 'p = 2.0 × 10⁷ × 320 ÷ 290 = 2.2 × 10⁷ Pa']] }] }
    ]
  });

  /* ---------------- t8 Kinetic theory ---------------- */
  add('t8', {
    ex: [
      ['R.m.s. speed from density', 'Air has density 1.29 kg m⁻³ at a pressure of 1.01 × 10⁵ Pa. Find the r.m.s. speed of its molecules.', [
        ['Rewrite the kinetic theory equation', 'Nm ÷ V is the density.', [`pV = ⅓Nm⟨c²⟩, so p = ⅓ρ⟨c²⟩`]],
        ['Mean square speed', '', [`⟨c²⟩ = ${fr('3p', 'ρ')} = ${fr('3 × 1.01 × 10⁵', '1.29')} = 2.35 × 10⁵ m² s⁻²`]],
        ['Root', '', [res('c_rms = 485 m s⁻¹: faster than the speed of sound in air')]]
      ], { chk: [['3*1.01e5/1.29', 2.349e5], ['sqrt(3*1.01e5/1.29)', 484.6]] }],
      ['One molecule hitting a wall', 'A molecule of mass 4.8 × 10⁻²⁶ kg moves at 500 m s⁻¹ back and forth along a box 0.20 m long, colliding elastically with the ends. Find the change in momentum at each collision and the average force it exerts on one end.', [
        ['Change in momentum', 'It reverses: Δp = 2mv.', ['Δp = 2 × 4.8 × 10⁻²⁶ × 500 = 4.8 × 10⁻²³ kg m s⁻¹']],
        ['Time between collisions with the same end', 'There and back: 2L ÷ v.', ['t = 0.40 ÷ 500 = 8.0 × 10⁻⁴ s']],
        ['Average force', 'F = Δp ÷ t.', [res('F = 4.8 × 10⁻²³ ÷ 8.0 × 10⁻⁴ = 6.0 × 10⁻²⁰ N'), 'Billions of billions of such impacts give a steady pressure.']]
      ], { chk: [['2*4.8e-26*500', 4.8e-23], ['0.4/500', 8e-4], ['4.8e-23/8e-4', 6e-20]] }]
    ],
    gaps: [
      { q: 'A gas has pressure 1.0 × 10⁵ Pa and density 1.2 kg m⁻³.', lines: ['⟨c²⟩ = 3p ÷ ρ = [[2.5e5]] m² s⁻²', 'c_rms = [[500]] m s⁻¹'], calc: ['3e5/1.2', 'sqrt(3e5/1.2)'], why: 'Take the square root last.' },
      { q: 'A molecule of mass 5.0 × 10⁻²⁶ kg hits a wall at 400 m s⁻¹ and rebounds at the same speed.', lines: ['change in momentum = [[4e-23]] kg m s⁻¹'], calc: ['2*5e-26*400'], why: 'Δp = 2mv for an elastic collision.' }
    ],
    exam: [
      { stem: '<p>The helium in a balloon is at a pressure of 1.1 × 10⁵ Pa and has a density of 0.18 kg m⁻³.</p>', parts: [
        { q: 'Calculate the r.m.s. speed of the helium atoms.', m: 2, ans: { a: 1354, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(3*1.1e5/0.18)', ms: [['C1', 'p = ⅓ρ⟨c²⟩, so ⟨c²⟩ = 3 × 1.1 × 10⁵ ÷ 0.18'], ['A1', 'c_rms = 1.4 × 10³ m s⁻¹']] },
        { q: 'Use kinetic theory to explain why the pressure of a gas at constant volume increases when its temperature rises.', m: 2, lines: 3, ms: [['B1', 'The molecules move faster, so each collision with the wall gives a larger change in momentum'], ['B1', 'and collisions happen more often, so the rate of change of momentum (force) on the walls per unit area increases']] }] }
    ]
  });

  /* ---------------- t9 The Boltzmann distribution and ½m⟨c²⟩ = 3/2 kT ---------------- */
  add('t9', {
    ex: [
      ['Nitrogen at room temperature', 'Find the mean kinetic energy of a molecule at 300 K, and the r.m.s. speed of nitrogen molecules (mass 4.65 × 10⁻²⁶ kg).', [
        ['Mean kinetic energy', 'Depends only on the temperature.', ['E = ³⁄₂kT = 1.5 × 1.38 × 10⁻²³ × 300 = 6.21 × 10⁻²¹ J']],
        ['R.m.s. speed', '½m⟨c²⟩ = ³⁄₂kT.', [`c_rms = √(${fr('3kT', 'm')}) = √(${fr('3 × 1.38 × 10⁻²³ × 300', '4.65 × 10⁻²⁶')})`, res('c_rms = 516 m s⁻¹')]]
      ], { chk: [['1.5*k*300', 6.21e-21], ['sqrt(3*k*300/4.65e-26)', 516.8]] }],
      ['Trap: doubling the temperature', 'The absolute temperature of a gas is doubled. What happens to the mean kinetic energy and the r.m.s. speed of its molecules?', [
        ['Mean kinetic energy', 'Proportional to T.', ['doubles']],
        ['R.m.s. speed', 'The trap: doubling the speed too. Speed goes as √T.', [res('the r.m.s. speed is multiplied by √2 = 1.41')]]
      ], { chk: [['sqrt(2)', 1.414]] }]
    ],
    gaps: [
      { q: 'Find the mean kinetic energy of a gas molecule at 400 K.', lines: ['E = ³⁄₂kT = [[8.28e-21]] J'], calc: ['1.5*k*400'], why: 'The same for every gas at this temperature.' },
      { q: 'Helium atoms have mass 6.64 × 10⁻²⁷ kg.', lines: ['c_rms at 300 K = [[1368]] m s⁻¹'], calc: ['sqrt(3*k*300/6.64e-27)'], why: 'Light atoms move fast.' },
      { q: 'At what temperature is the mean kinetic energy 1.0 × 10⁻²⁰ J?', lines: ['T = 2E ÷ 3k = [[483]] K'], calc: ['2e-20/(3*k)'], why: 'Rearrange E = ³⁄₂kT.' }
    ],
    exam: [
      { stem: '<p>In the upper atmosphere the temperature can reach 1000 K. A hydrogen molecule has a mass of 3.34 × 10⁻²⁷ kg. The escape velocity from the Earth is 1.12 × 10⁴ m s⁻¹.</p>', parts: [
        { q: 'Calculate the mean kinetic energy of a hydrogen molecule at 1000 K.', m: 1, ans: { a: 2.07e-20, unit: 'J', tol: 0.02 }, calc: '1.5*k*1000', ms: [['B1', '³⁄₂ × 1.38 × 10⁻²³ × 1000 = 2.1 × 10⁻²⁰ J']] },
        { q: 'Calculate the r.m.s. speed of the hydrogen molecules.', m: 2, ans: { a: 3521, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(3*k*1000/3.34e-27)', ms: [['C1', 'c_rms = √(3kT ÷ m)'], ['A1', 'c_rms = 3.5 × 10³ m s⁻¹']] },
        { q: 'The r.m.s. speed is well below the escape velocity. Explain why hydrogen still escapes from the atmosphere over time.', m: 2, lines: 3, ms: [['B1', 'The speeds follow the Maxwell–Boltzmann distribution, so a small fraction of molecules have speeds far above the r.m.s. value'], ['B1', 'Those above the escape velocity leave; collisions keep re-forming the distribution, so more escape over time']] }] }
    ]
  });

  /* ---------------- t10 Review and exam practice ---------------- */
  add('t10', {
    ex: [
      ['Synoptic: ice in a drink', '0.030 kg of ice at 0 °C is added to 0.25 kg of cola at 25 °C (c = 4200 J kg⁻¹ K⁻¹). Find the final temperature, ignoring losses.', [
        ['Energy gained by the ice', 'It melts, then the meltwater warms to T.', ['0.030 × 3.34 × 10⁵ + 0.030 × 4200 × T = 10 020 + 126T']],
        ['Energy lost by the cola', '', ['0.25 × 4200 × (25 − T) = 26 250 − 1050T']],
        ['Solve', '', ['1176T = 16 230', res('T = 13.8 °C')]]
      ], { chk: [['0.03*3.34e5', 10020], ['(26250-10020)/1176', 13.80]] }],
      ['A model answer: internal energy of an ideal gas', 'Explain why the internal energy of an ideal gas depends only on its temperature. (3 marks)', [
        ['What internal energy is', '', [`Internal energy is the ${mp('sum of the random kinetic and potential energies')} of the particles.`]],
        ['No potential energy', '', [`In an ideal gas there are ${mp('no forces between the molecules')} (except in collisions), so the ${mp('potential energy is zero')}.`]],
        ['Only kinetic energy', '', ['The internal energy is the total kinetic energy, N × ³⁄₂kT, which depends only on T (for a fixed amount of gas).']]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'An ideal gas contains 2.0 × 10²³ molecules at 300 K.', lines: ['internal energy = N × ³⁄₂kT = [[1242]] J'], calc: ['2e23*1.5*k*300'], why: 'For an ideal gas, internal energy is all kinetic.' }
    ],
    exam: [
      { stem: '<p>A car tyre has a volume of 0.025 m³ and contains air at 2.4 × 10⁵ Pa and 280 K. During a drive the air warms to 310 K. Assume the volume stays constant.</p>', parts: [
        { q: 'Calculate the number of moles of air in the tyre.', m: 1, ans: { a: 2.58, unit: 'mol', tol: 0.02 }, calc: '2.4e5*0.025/(R*280)', ms: [['B1', 'n = pV ÷ RT = 2.6 mol']] },
        { q: 'Calculate the pressure after the drive.', m: 1, ans: { a: 2.66e5, unit: 'Pa', tol: 0.02 }, calc: '2.4e5*310/280', ms: [['B1', 'p = 2.4 × 10⁵ × 310 ÷ 280 = 2.7 × 10⁵ Pa']] },
        { q: 'Calculate the increase in the mean kinetic energy of each molecule.', m: 1, ans: { a: 6.21e-22, unit: 'J', tol: 0.02 }, calc: '1.5*k*30', ms: [['B1', '³⁄₂k × 30 = 6.2 × 10⁻²² J']] },
        { q: 'Explain, in terms of molecules, why the pressure rises.', m: 1, lines: 2, ms: [['B1', 'The molecules move faster, so they hit the walls more often and with a greater change of momentum each time, increasing the force per unit area']] }] }
    ]
  });

  /* ---- top-up fill-the-gaps ---- */
  add('t8', { gaps: [
    { q: '2.4 × 10²² helium atoms (mass 6.6 × 10⁻²⁷ kg) with c_rms = 1300 m s⁻¹ fill 1.0 × 10⁻³ m³.', lines: ['p = Nm⟨c²⟩ ÷ 3V = [[8.92e4]] Pa'], calc: ['2.4e22*6.6e-27*1300**2/(3*1e-3)'], why: 'pV = ⅓Nm⟨c²⟩.' }
  ] });
  add('t10', { gaps: [
    { q: '0.20 kg of water is heated by 30 K.', lines: ['energy = mcΔθ = [[25200]] J'], calc: ['0.2*4200*30'], why: 'c = 4200 J kg⁻¹ K⁻¹.' },
    { q: 'A gas occupies 5.0 × 10⁻³ m³ at 1.0 × 10⁵ Pa and 290 K.', lines: ['n = pV ÷ RT = [[0.208]] mol'], calc: ['1e5*5e-3/(R*290)'], why: 'Convert litres and °C first.' }
  ] });
})();
