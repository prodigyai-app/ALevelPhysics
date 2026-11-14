/* Waves and quantum physics (wv1–wv12): extra worked examples, fill-the-gaps and exam-style questions.
   c = 3.00e8 m s⁻¹, h = 6.63e-34 J s, e = 1.60e-19 C, mₑ = 9.11e-31 kg; speed of sound 340 m s⁻¹ unless stated.
   Every answer is recomputed by tools/verify-depth.cjs. */
(() => {
  const { fr, res } = LAB.W, add = PhysDepth.add;
  const tbl = (head, rows) => `<div class="tbl-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const mp = t => `<b>${t}</b>`;

  /* ---------------- wv1 Progressive waves ---------------- */
  add('wv1', {
    ex: [
      ['Speed and phase difference', 'A sound wave of frequency 425 Hz has a wavelength of 0.80 m. Find its speed, and the phase difference between two points 0.20 m apart along the wave.', [
        ['Wave speed', '', ['v = fλ = 425 × 0.80 = 340 m s⁻¹']],
        ['Phase difference', 'One wavelength is 360° (2π rad).', [`φ = ${fr('0.20', '0.80')} × 360°`, res('φ = 90° (π/2 rad)')]]
      ], { chk: [['425*0.8', 340], ['0.2/0.8*360', 90]] }],
      ['Trap: reading an oscilloscope', 'One cycle of a trace covers 4.0 divisions at 0.50 ms per division. The trace is 5.0 divisions from top to bottom at 0.20 V per division. Find the frequency and the amplitude.', [
        ['Period and frequency', '', ['T = 4.0 × 0.50 ms = 2.0 ms', 'f = 1 ÷ 2.0 × 10⁻³ = 500 Hz']],
        ['Amplitude', 'The trap: using the full height. Top to bottom is twice the amplitude.', ['peak-to-peak = 5.0 × 0.20 = 1.0 V', res('amplitude = 0.50 V')]]
      ], { chk: [['4*0.5e-3', 2e-3], ['1/2e-3', 500], ['5*0.2/2', 0.5]] }]
    ],
    gaps: [
      { q: 'A wave has frequency 500 Hz and wavelength 0.68 m.', lines: ['speed = [[340]] m s⁻¹'], calc: ['500*0.68'], why: 'v = fλ.' },
      { q: 'A wave has frequency 250 Hz.', lines: ['period = [[4e-3]] s'], calc: ['1/250'], why: 'T = 1 ÷ f.' },
      { q: 'Two points on a wave of wavelength 0.60 m are 0.15 m apart.', lines: ['phase difference = [[90]]°'], calc: ['0.15/0.6*360'], why: 'A quarter of a wavelength.' }
    ],
    exam: [
      { stem: '<p>In a ripple tank, the distance from the first to the tenth crest is 0.27 m. Fifteen waves pass a point in 10 s.</p>', parts: [
        { q: 'Calculate the wavelength.', m: 2, ans: { a: 0.030, unit: 'm', tol: 0.01 }, calc: '0.27/9', ms: [['C1', 'there are 9 wavelengths between the first and tenth crests'], ['A1', 'λ = 0.27 ÷ 9 = 0.030 m']] },
        { q: 'Calculate the frequency.', m: 1, ans: { a: 1.5, unit: 'Hz', tol: 0.01 }, calc: '15/10', ms: [['B1', '15 ÷ 10 = 1.5 Hz']] },
        { q: 'Calculate the speed of the waves.', m: 1, ans: { a: 0.045, unit: 'm s⁻¹', tol: 0.01 }, calc: '1.5*0.03', ms: [['B1', 'v = 1.5 × 0.030 = 0.045 m s⁻¹']] },
        { q: 'Explain why measuring across several wavelengths gives a more precise value.', m: 1, lines: 2, ms: [['B1', 'The uncertainty in reading the ruler is the same, but it is divided among nine wavelengths, so the percentage uncertainty is smaller']] }] },
      { stem: '<p>Waves can be transverse or longitudinal.</p>', parts: [
        { q: 'Describe the difference between transverse and longitudinal waves.', m: 2, lines: 3, ms: [['B1', 'Transverse: oscillations perpendicular to the direction of energy transfer'], ['B1', 'Longitudinal: oscillations parallel to the direction of energy transfer (compressions and rarefactions)']] },
        { q: 'Two points on a wave of wavelength 2.0 m are 1.5 m apart. Calculate their phase difference in degrees.', m: 1, ans: { a: 270, unit: '°', tol: 0.01 }, calc: '1.5/2*360', ms: [['B1', '1.5 ÷ 2.0 × 360° = 270° (3π/2 rad)']] },
        { q: 'State which type of wave can be polarised.', m: 1, lines: 1, ms: [['B1', 'Transverse waves only']] }] }
    ]
  });

  /* ---------------- wv2 Reflection, refraction, diffraction, polarisation ---------------- */
  add('wv2', {
    ex: [
      ['Trap: what changes when light enters glass', 'Light of wavelength 600 nm in air enters glass of refractive index 1.50. Find its speed, wavelength and frequency in the glass.', [
        ['Speed', 'v = c ÷ n.', ['v = 3.00 × 10⁸ ÷ 1.50 = 2.00 × 10⁸ m s⁻¹']],
        ['Frequency', 'The trap: thinking the frequency changes. It is set by the source.', ['f = 3.00 × 10⁸ ÷ 600 × 10⁻⁹ = 5.0 × 10¹⁴ Hz, in air and in glass']],
        ['Wavelength', 'λ = v ÷ f.', [res('λ = 2.00 × 10⁸ ÷ 5.0 × 10¹⁴ = 400 nm')]]
      ], { chk: [['3e8/1.5', 2e8], ['3e8/600e-9', 5e14], ['2e8/5e14', 4e-7]] }],
      ['A model answer: why radio bends round hills', 'Explain why long-wave radio (200 kHz) can be received behind hills but TV signals (600 MHz) cannot. (3 marks)', [
        ['Wavelengths', '', ['200 kHz: λ = 3.00 × 10⁸ ÷ 2.0 × 10⁵ = 1500 m', '600 MHz: λ = 3.00 × 10⁸ ÷ 6.0 × 10⁸ = 0.50 m']],
        ['Diffraction', '', [`Diffraction is ${mp('greatest when the wavelength is similar to the size of the gap or obstacle')}.`]],
        ['Apply it', '', [`Hills are hundreds of metres across: ${mp('long-wave radio diffracts round them')}, while ${mp('TV waves are much shorter and hardly diffract')}, leaving a shadow behind the hill.`]]
      ], { chk: [['3e8/2e5', 1500], ['3e8/6e8', 0.5]] }]
    ],
    gaps: [
      { q: 'Water has a refractive index of 1.33.', lines: ['speed of light in water = [[2.26e8]] m s⁻¹'], calc: ['3e8/1.33'], why: 'v = c ÷ n.' },
      { q: 'Yellow light of wavelength 589 nm in air enters water (n = 1.33).', lines: ['wavelength in water = [[443]] nm'], calc: ['589/1.33'], why: 'The wavelength shrinks by the same factor as the speed.' },
      { q: 'A radio station broadcasts at 100 MHz.', lines: ['wavelength = [[3]] m'], calc: ['3e8/1e8'], why: 'λ = c ÷ f.' }
    ],
    exam: [
      { stem: '<p>Sound of frequency 380 Hz passes through a doorway 0.90 m wide. The speed of sound is 340 m s⁻¹.</p>', parts: [
        { q: 'Calculate the wavelength of the sound.', m: 1, ans: { a: 0.895, unit: 'm', tol: 0.01 }, calc: '340/380', ms: [['B1', 'λ = 340 ÷ 380 = 0.89 m']] },
        { q: 'Explain why the sound can be heard by someone standing to one side of the doorway.', m: 2, lines: 3, ms: [['B1', 'The sound diffracts (spreads out) as it passes through the doorway'], ['B1', 'The diffraction is large because the wavelength is about the same as the width of the gap']] },
        { q: 'Explain why light passing through the same doorway does not spread out noticeably.', m: 2, lines: 3, ms: [['B1', 'The wavelength of light (about 5 × 10⁻⁷ m) is very much smaller than the doorway'], ['B1', 'so the diffraction is negligible and a sharp shadow forms']] }] },
      { stem: '<p>Light reflected from a wet road is partially plane polarised.</p>', parts: [
        { q: 'Explain what is meant by plane polarised light.', m: 1, lines: 2, ms: [['B1', 'The oscillations (of the electric field) are in one plane only, perpendicular to the direction of travel']] },
        { q: 'A polarising filter is placed in front of another and rotated through 360°. Describe and explain what is seen through both.', m: 2, lines: 3, ms: [['B1', 'The light passing through goes from maximum to minimum (almost zero) twice per rotation'], ['B1', 'Maximum when the transmission axes are parallel; minimum when they are perpendicular, as the second filter blocks the polarised light from the first']] },
        { q: 'Explain why sound waves cannot be polarised.', m: 1, lines: 2, ms: [['B1', 'Sound is longitudinal: its oscillations are along the direction of travel, so there is no plane of oscillation to select']] },
        { q: 'Which of these waves can be polarised?', m: 1, opts: ['microwaves', 'sound in air', 'ultrasound in tissue', 'compression waves in a spring'], a: 0, why: 'Microwaves are electromagnetic, so transverse; the others are longitudinal.' }] }
    ]
  });

  /* ---------------- wv3 Intensity and the electromagnetic spectrum ---------------- */
  add('wv3', {
    ex: [
      ['The inverse-square law', 'A small lamp radiates 100 W equally in all directions. Find the intensity at 2.0 m and at 4.0 m.', [
        ['Spread over a sphere', 'I = P ÷ 4πr².', [`I = ${fr('100', '4π × 2.0²')} = 1.99 W m⁻²`]],
        ['Twice as far', 'The area is four times larger.', [res('I = 1.99 ÷ 4 = 0.50 W m⁻²')]]
      ], { chk: [['100/(4*pi*4)', 1.989], ['100/(4*pi*16)', 0.497]] }],
      ['Trap: intensity depends on amplitude squared', 'The amplitude of a wave is halved. What happens to its intensity?', [
        ['The relationship', 'Intensity ∝ amplitude².', ['I ∝ A²']],
        ['Apply it', 'The trap: halving the intensity.', [res('(½)² = ¼: the intensity falls to a quarter')]]
      ], { chk: [['0.5**2', 0.25]] }]
    ],
    gaps: [
      { q: 'A beam of power 0.50 W falls on an area of 2.5 × 10⁻⁴ m².', lines: ['intensity = [[2000]] W m⁻²'], calc: ['0.5/2.5e-4'], why: 'I = P ÷ A.' },
      { q: 'A 40 W point source radiates in all directions.', lines: ['intensity at 3.0 m = [[0.354]] W m⁻²'], calc: ['40/(4*pi*9)'], why: 'Divide by the area of a sphere.' },
      { q: 'The amplitude of a wave is trebled.', lines: ['the intensity is multiplied by [[9]]'], calc: ['9'], why: 'I ∝ A².' }
    ],
    exam: [
      { stem: '<p>The intensity of sunlight at the Earth, 1.5 × 10¹¹ m from the Sun, is 1.4 kW m⁻².</p>', parts: [
        { q: 'Calculate the total power emitted by the Sun.', m: 2, ans: { a: 3.96e26, unit: 'W', tol: 0.02 }, calc: '1400*4*pi*1.5e11**2', ms: [['C1', 'P = I × 4πr²'], ['A1', 'P = 1400 × 4π × (1.5 × 10¹¹)² = 4.0 × 10²⁶ W']] },
        { q: 'Mars is 2.3 × 10¹¹ m from the Sun. Calculate the intensity of sunlight there.', m: 2, ans: { a: 595, unit: 'W m⁻²', tol: 0.02 }, calc: '1400*(1.5/2.3)**2', ms: [['C1', 'I ∝ 1/r², so I = 1400 × (1.5 ÷ 2.3)²'], ['A1', 'I = 600 W m⁻²']] },
        { q: 'State one assumption made in these calculations.', m: 1, lines: 2, ms: [['B1', 'The Sun radiates equally in all directions (a point source), and no energy is absorbed between the Sun and the planet']] }] },
      { stem: '<p>All electromagnetic waves travel at 3.00 × 10⁸ m s⁻¹ in a vacuum.</p>', parts: [
        { q: 'List the main regions of the electromagnetic spectrum in order of increasing wavelength.', m: 2, lines: 3, ms: [['B1', 'gamma, X-rays, ultraviolet, visible, infrared'], ['B1', 'microwaves, radio waves (all in the correct order)']] },
        { q: 'Calculate the frequency of microwaves of wavelength 3.0 cm.', m: 1, ans: { a: 1.0e10, unit: 'Hz', tol: 0.01 }, calc: '3e8/0.03', ms: [['B1', 'f = 3.00 × 10⁸ ÷ 0.030 = 1.0 × 10¹⁰ Hz']] },
        { q: 'State one property shared by all electromagnetic waves other than their speed in a vacuum.', m: 1, lines: 1, ms: [['B1', 'Any one: transverse; can be polarised; can travel through a vacuum; consist of oscillating electric and magnetic fields']] }] }
    ]
  });

  /* ---------------- wv4 Refractive index and total internal reflection ---------------- */
  add('wv4', {
    ex: [
      ['Critical angle of glass', 'Glass has a refractive index of 1.52. Find the critical angle for a glass–air boundary, and what happens to a ray meeting it at 45°.', [
        ['Critical angle', 'sin C = 1 ÷ n.', [`C = sin⁻¹(${fr('1', '1.52')}) = 41.1°`]],
        ['Compare', '45° is greater than the critical angle.', [res('total internal reflection: the ray is reflected back into the glass')]]
      ], { chk: [['asind(1/1.52)', 41.1]] }],
      ['Trap: measure angles from the normal', 'A ray in air strikes a water surface (n = 1.33) at 30° to the SURFACE. Find the angle of refraction.', [
        ['Angle of incidence', 'The trap: using 30°. Angles are measured from the normal.', ['i = 90° − 30° = 60°']],
        ['Snell’s law', 'n₁ sin θ₁ = n₂ sin θ₂.', [`sin r = ${fr('1.00 × sin 60°', '1.33')} = 0.651`, res('r = 40.6° from the normal')]]
      ], { chk: [['sind(60)/1.33', 0.651], ['asind(sind(60)/1.33)', 40.6]] }]
    ],
    gaps: [
      { q: 'A ray enters a material at 50° and refracts to 30°.', lines: ['n = sin 50° ÷ sin 30° = [[1.53]]'], calc: ['sind(50)/sind(30)'], why: 'From air, n = sin i ÷ sin r.' },
      { q: 'Water has n = 1.33.', lines: ['critical angle = [[48.8]]°'], calc: ['asind(1/1.33)'], why: 'sin C = 1 ÷ n.' },
      { q: 'Glass has n = 1.5.', lines: ['speed of light in the glass = [[2e8]] m s⁻¹'], calc: ['3e8/1.5'], why: 'n = c ÷ v.' }
    ],
    exam: [
      { stem: '<p>A ray of light in air meets a glass block of refractive index 1.50 at an angle of incidence of 40°.</p>', parts: [
        { q: 'Calculate the angle of refraction.', m: 2, ans: { a: 25.4, unit: '°', tol: 0.02 }, calc: 'asind(sind(40)/1.5)', ms: [['C1', 'sin r = sin 40° ÷ 1.50 = 0.429'], ['A1', 'r = 25°']] },
        { q: 'Calculate the speed of light in the glass.', m: 1, ans: { a: 2.0e8, unit: 'm s⁻¹', tol: 0.01 }, calc: '3e8/1.5', ms: [['B1', 'v = 3.00 × 10⁸ ÷ 1.50 = 2.0 × 10⁸ m s⁻¹']] },
        { q: 'Calculate the critical angle for the glass–air boundary.', m: 2, ans: { a: 41.8, unit: '°', tol: 0.02 }, calc: 'asind(1/1.5)', ms: [['C1', 'sin C = 1 ÷ 1.50'], ['A1', 'C = 42°']] },
        { q: 'Diamond has a refractive index of 2.42. Explain why a cut diamond sparkles.', m: 2, lines: 3, ms: [['B1', 'Its critical angle is small (about 24°)'], ['B1', 'so light inside is totally internally reflected many times before leaving, and leaves in bright beams from the top faces']] }] }
    ]
  });

  /* ---------------- wv5 Superposition and two-source interference ---------------- */
  add('wv5', {
    ex: [
      ['Microwaves: maximum or minimum?', 'Two slits act as coherent microwave sources in phase, wavelength 3.0 cm. A detector is 41.5 cm from one slit and 35.5 cm from the other. What does it detect?', [
        ['Path difference', '', ['41.5 − 35.5 = 6.0 cm']],
        ['In wavelengths', '', ['6.0 ÷ 3.0 = 2.0 wavelengths: a whole number']],
        ['Result', 'Whole wavelengths: the waves arrive in phase.', [res('constructive interference: a maximum (second order)')]]
      ], { chk: [['41.5-35.5', 6], ['6/3', 2]] }],
      ['Trap: sources in antiphase', 'Two loudspeakers are wired so that they vibrate in antiphase. At a point the path difference is exactly one wavelength. Is the sound loud or quiet?', [
        ['The usual rule', 'The trap: the rule nλ → maximum assumes the sources are in phase.', ['For in-phase sources, a path difference of λ gives a maximum.']],
        ['Antiphase sources', 'The waves start half a cycle apart, so every condition swaps.', [res('a path difference of λ now gives a minimum: quiet')]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'Sound of frequency 680 Hz travels at 340 m s⁻¹.', lines: ['wavelength = [[0.5]] m'], calc: ['340/680'], why: 'λ = v ÷ f.' },
      { q: 'At a point the path difference from two in-phase sources is 1.25 m. The wavelength is 0.50 m.', lines: ['path difference = [[2.5]] wavelengths: a minimum'], calc: ['1.25/0.5'], why: 'A half-number of wavelengths gives destructive interference.' },
      { q: 'Microwaves have wavelength 2.8 cm.', lines: ['path difference for the second-order maximum = [[5.6]] cm'], calc: ['2*2.8'], why: 'Order n: path difference nλ.' }
    ],
    exam: [
      { stem: '<p>Two loudspeakers 1.5 m apart are connected to the same signal generator at 1100 Hz. They vibrate in phase. The speed of sound is 330 m s⁻¹. A listener at P is 4.20 m from one speaker and 4.65 m from the other.</p>', parts: [
        { q: 'Calculate the wavelength of the sound.', m: 1, ans: { a: 0.30, unit: 'm', tol: 0.01 }, calc: '330/1100', ms: [['B1', 'λ = 330 ÷ 1100 = 0.30 m']] },
        { q: 'Calculate the path difference at P in wavelengths.', m: 1, ans: { a: 1.5, unit: '', tol: 0.01 }, calc: '(4.65-4.20)/0.30', ms: [['B1', '0.45 ÷ 0.30 = 1.5 λ']] },
        { q: 'State and explain whether the sound at P is loud or quiet.', m: 2, lines: 3, ms: [['B1', 'Quiet (a minimum)'], ['B1', 'A path difference of 1.5λ means the waves arrive in antiphase and interfere destructively']] },
        { q: 'Suggest why the sound at P is not completely silent.', m: 1, lines: 2, ms: [['B1', 'The waves from the two speakers have different amplitudes at P (different distances, reflections from walls), so they do not cancel completely']] }] },
      { stem: '<p>Interference patterns can only be seen with coherent sources.</p>', parts: [
        { q: 'State what is meant by coherent sources.', m: 1, lines: 2, ms: [['B1', 'Sources with a constant phase difference (and the same frequency)']] },
        { q: 'Explain why two separate light bulbs do not produce a visible interference pattern.', m: 1, lines: 2, ms: [['B1', 'Their light is emitted in short random bursts, so the phase difference changes constantly and the pattern averages out']] },
        { q: 'Explain why light from one laser passing through two slits does produce a pattern.', m: 2, lines: 3, ms: [['B1', 'Both slits are lit by the same wavefront, so the two sources are coherent'], ['B1', 'At each point the phase difference depends only on the path difference, so stable maxima and minima form']] }] }
    ]
  });

  /* ---------------- wv6 Young's double-slit experiment ---------------- */
  add('wv6', {
    ex: [
      ['Wavelength from fringe spacing', 'A laser lights a double slit with a = 0.25 mm. On a screen 2.40 m away, 10 fringe spacings measure 61.0 mm. Find the wavelength.', [
        ['One fringe spacing', 'Measure across many fringes to reduce the uncertainty.', ['x = 61.0 ÷ 10 = 6.10 mm']],
        ['Rearrange λ = ax ÷ D', '', [`λ = ${fr('0.25 × 10⁻³ × 6.10 × 10⁻³', '2.40')}`, res('λ = 6.4 × 10⁻⁷ m (635 nm, red)')]]
      ], { chk: [['61/10', 6.1], ['0.25e-3*6.1e-3/2.4', 6.354e-7]] }],
      ['Trap: changing the set-up', 'In a double-slit experiment the fringe spacing is 2.0 mm. Predict the new spacing if (a) the screen is moved twice as far away, (b) slits half as far apart are used, (c) both changes are made.', [
        ['The relationship', 'x = λD ÷ a.', ['x ∝ D and x ∝ 1/a']],
        ['Each change', 'The trap: thinking closer slits give closer fringes. It is the reverse.', ['(a) 4.0 mm;  (b) 4.0 mm']],
        ['Both', '', [res('(c) 2.0 × 2 × 2 = 8.0 mm')]]
      ], { chk: [['2*2', 4], ['2*2*2', 8]] }]
    ],
    gaps: [
      { q: 'Green light (532 nm) passes through slits 0.30 mm apart onto a screen 1.5 m away.', lines: ['fringe spacing = λD ÷ a = [[2.66e-3]] m'], calc: ['532e-9*1.5/0.3e-3'], why: 'About 2.7 mm.' },
      { q: 'Slits 0.50 mm apart give fringes 2.2 mm apart on a screen 1.8 m away.', lines: ['wavelength = [[6.11e-7]] m'], calc: ['0.5e-3*2.2e-3/1.8'], why: 'λ = ax ÷ D.' },
      { q: 'The slit separation is halved.', lines: ['the fringe spacing is multiplied by [[2]]'], calc: ['2'], why: 'x ∝ 1/a.' }
    ],
    exam: [
      { stem: '<p>A student measures the wavelength of a laser. Slit separation a = (0.20 ± 0.01) mm; slit-to-screen distance D = (2.000 ± 0.005) m; the width of 8 fringe spacings is (47.0 ± 0.5) mm.</p>', parts: [
        { q: 'Calculate the wavelength of the light.', m: 2, ans: { a: 5.875e-7, unit: 'm', tol: 0.02 }, calc: '0.20e-3*(47.0e-3/8)/2.000', ms: [['C1', 'x = 47.0 ÷ 8 = 5.875 mm'], ['A1', 'λ = ax ÷ D = 5.9 × 10⁻⁷ m']] },
        { q: 'Calculate the percentage uncertainty in the wavelength.', m: 2, ans: { a: 6.31, unit: '%', tol: 0.03 }, calc: '(0.01/0.20+0.005/2.000+0.5/47.0)*100', ms: [['C1', 'a: 5.0 %; D: 0.25 %; fringes: 1.1 %'], ['A1', 'total = 6.3 %']] },
        { q: 'Suggest how the uncertainty could be reduced most effectively.', m: 1, lines: 2, ms: [['B1', 'Measure the slit separation more precisely (e.g. with a travelling microscope), since it contributes most of the uncertainty']] },
        { q: 'State one safety precaution when using a laser.', m: 1, lines: 1, ms: [['B1', 'Never look along the beam or at its reflection; keep the beam below eye level and remove shiny surfaces']] }] },
      { stem: '<p>The laser is replaced by a white light source with a single slit in front of the double slit.</p>', parts: [
        { q: 'Describe the pattern seen on the screen.', m: 2, lines: 3, ms: [['B1', 'A white central fringe with coloured fringes on either side'], ['B1', 'Each side fringe is blue on the inside and red on the outside, and the fringes soon blur together']] },
        { q: 'Explain why the central fringe is white.', m: 1, lines: 2, ms: [['B1', 'At the centre the path difference is zero for every wavelength, so all colours interfere constructively there']] }] }
    ]
  });

  /* ---------------- wv7 Stationary waves ---------------- */
  add('wv7', {
    ex: [
      ['Microwave speed from a stationary wave', 'Microwaves reflected from a metal plate form a stationary wave. A probe finds nodes 1.4 cm apart. The frequency is 1.07 × 10¹⁰ Hz. Find the wavelength and the speed.', [
        ['Wavelength', 'Adjacent nodes are half a wavelength apart.', ['λ = 2 × 1.4 = 2.8 cm']],
        ['Speed', '', [res('v = fλ = 1.07 × 10¹⁰ × 0.028 = 3.0 × 10⁸ m s⁻¹')]]
      ], { chk: [['2*1.4', 2.8], ['1.07e10*0.028', 3.0e8]] }],
      ['Trap: node to node is λ/2', 'In a stationary sound wave, the distance between the first node and the fourth node is 0.75 m. Find the wavelength.', [
        ['Count the gaps', 'The trap: dividing by 4. First to fourth node is three gaps.', ['3 × λ/2 = 0.75 m']],
        ['Wavelength', '', [res('λ = 0.50 m')]]
      ], { chk: [['0.75*2/3', 0.5]] }]
    ],
    gaps: [
      { q: 'Adjacent nodes are 0.25 m apart.', lines: ['wavelength = [[0.5]] m'], calc: ['0.5'], why: 'Node to node is λ/2.' },
      { q: 'That wave has frequency 680 Hz.', lines: ['wave speed = [[340]] m s⁻¹'], calc: ['680*0.5'], why: 'v = fλ.' },
      { q: 'A stationary wave has wavelength 0.60 m.', lines: ['distance from a node to the next antinode = [[0.15]] m'], calc: ['0.6/4'], why: 'A quarter of a wavelength.' }
    ],
    exam: [
      { stem: '<p>A string 1.20 m long, fixed at both ends, vibrates in a stationary wave with three loops at a frequency of 150 Hz.</p>', parts: [
        { q: 'Calculate the wavelength.', m: 1, ans: { a: 0.80, unit: 'm', tol: 0.01 }, calc: '2*1.2/3', ms: [['B1', 'three loops = 1.5λ = 1.20 m, so λ = 0.80 m']] },
        { q: 'Calculate the speed of the waves on the string.', m: 1, ans: { a: 120, unit: 'm s⁻¹', tol: 0.01 }, calc: '150*0.8', ms: [['B1', 'v = 150 × 0.80 = 120 m s⁻¹']] },
        { q: 'Calculate the fundamental frequency.', m: 1, ans: { a: 50, unit: 'Hz', tol: 0.01 }, calc: '150/3', ms: [['B1', '150 ÷ 3 = 50 Hz']] },
        { q: 'State the phase difference between points in adjacent loops, and between points in the same loop.', m: 2, lines: 2, ms: [['B1', 'adjacent loops: 180° (antiphase)'], ['B1', 'same loop: 0 (in phase)']] }] },
      { stem: '<p>Stationary waves differ from progressive waves.</p>', parts: [
        { q: 'State two differences between a stationary wave and a progressive wave.', m: 2, lines: 3, ms: [['B1', 'A stationary wave does not transfer energy along it; a progressive wave does'], ['B1', 'Amplitude varies with position (nodes and antinodes) in a stationary wave but is the same everywhere in a progressive wave (or: phase is the same within a loop rather than changing continuously)']] },
        { q: 'Explain how a stationary wave is formed.', m: 2, lines: 3, ms: [['B1', 'Two waves of the same frequency (and similar amplitude) travel in opposite directions, e.g. a wave and its reflection'], ['B1', 'They superpose: at nodes they always cancel, at antinodes they reinforce']] }] }
    ]
  });

  /* ---------------- wv8 Harmonics on strings and in air columns ---------------- */
  add('wv8', {
    ex: [
      ['A pipe closed at one end', 'A pipe 0.33 m long is closed at one end. Find its fundamental frequency and the next two frequencies it can produce. (v = 340 m s⁻¹)', [
        ['Fundamental', 'A node at the closed end and an antinode at the open end: L = λ/4.', ['λ = 4 × 0.33 = 1.32 m', 'f₁ = 340 ÷ 1.32 = 258 Hz']],
        ['Higher harmonics', 'Only odd harmonics fit a pipe closed at one end.', [res('3f₁ = 773 Hz and 5f₁ = 1288 Hz')]]
      ], { chk: [['340/1.32', 257.6], ['3*340/1.32', 772.7], ['5*340/1.32', 1288]] }],
      ['Trap: open and closed pipes', 'Compare the fundamental frequency of a pipe 0.50 m long when it is (a) open at both ends, (b) closed at one end. (v = 340 m s⁻¹)', [
        ['Open at both ends', 'Antinodes at both ends: L = λ/2.', ['λ = 1.00 m, f = 340 Hz; harmonics 680, 1020 Hz…']],
        ['Closed at one end', 'The trap: using λ/2 again.', ['L = λ/4, λ = 2.00 m, f = 170 Hz; harmonics 510, 850 Hz…']],
        ['Conclusion', '', [res('closing one end halves the fundamental and removes the even harmonics')]]
      ], { chk: [['340/1', 340], ['340/2', 170], ['3*170', 510]] }]
    ],
    gaps: [
      { q: 'A string 0.60 m long carries waves at 240 m s⁻¹.', lines: ['fundamental frequency = 240 ÷ 1.20 = [[200]] Hz'], calc: ['240/1.2'], why: 'For a string fixed at both ends, L = λ/2.' },
      { q: 'A pipe 0.25 m long is closed at one end. (v = 340 m s⁻¹)', lines: ['fundamental = [[340]] Hz'], calc: ['340/1'], why: 'λ = 4L = 1.00 m.' },
      { q: 'The same pipe is opened at both ends.', lines: ['fundamental = [[680]] Hz'], calc: ['340/0.5'], why: 'λ = 2L = 0.50 m.' }
    ],
    exam: [
      { stem: '<p>A guitar string has a vibrating length of 0.65 m and a fundamental frequency of 196 Hz.</p>', parts: [
        { q: 'Calculate the speed of the waves on the string.', m: 2, ans: { a: 254.8, unit: 'm s⁻¹', tol: 0.02 }, calc: '196*1.3', ms: [['C1', 'λ = 2 × 0.65 = 1.30 m'], ['A1', 'v = 196 × 1.30 = 255 m s⁻¹']] },
        { q: 'A finger shortens the vibrating length to 0.49 m. Calculate the new fundamental frequency.', m: 1, ans: { a: 260, unit: 'Hz', tol: 0.02 }, calc: '196*1.3/0.98', ms: [['B1', 'f = 255 ÷ 0.98 = 260 Hz']] },
        { q: 'State the frequency of the second harmonic of the open string.', m: 1, ans: { a: 392, unit: 'Hz', tol: 0.01 }, calc: '2*196', ms: [['B1', '392 Hz']] },
        { q: 'Describe the stationary wave on the string at its second harmonic.', m: 1, lines: 2, ms: [['B1', 'Two loops: nodes at both ends and in the middle, with two antinodes']] }] },
      { stem: '<p>A flute can be modelled as a pipe 0.60 m long, open at both ends. The speed of sound is 340 m s⁻¹.</p>', parts: [
        { q: 'Calculate the fundamental frequency of the flute.', m: 2, ans: { a: 283, unit: 'Hz', tol: 0.02 }, calc: '340/1.2', ms: [['C1', 'λ = 2L = 1.20 m'], ['A1', 'f = 340 ÷ 1.20 = 280 Hz']] },
        { q: 'A pipe of the same length closed at one end plays a lower note. Explain why, and calculate its fundamental frequency.', m: 2, ans: { a: 141.7, unit: 'Hz', tol: 0.02 }, calc: '340/2.4', ms: [['B1', 'With a node at the closed end the pipe holds only a quarter wavelength, so λ = 4L = 2.40 m (twice as long)'], ['B1', 'f = 340 ÷ 2.40 = 140 Hz']] }] }
    ]
  });

  /* ---------------- wv9 Photons and the Planck constant ---------------- */
  add('wv9', {
    ex: [
      ['How many photons from a laser pointer?', 'A red laser emits 1.0 mW at 650 nm. Find the energy of each photon and the number emitted each second.', [
        ['Photon energy', 'E = hc ÷ λ.', [`E = ${fr('6.63 × 10⁻³⁴ × 3.00 × 10⁸', '650 × 10⁻⁹')} = 3.06 × 10⁻¹⁹ J`]],
        ['Photons per second', 'Power ÷ energy per photon.', [`N = ${fr('1.0 × 10⁻³', '3.06 × 10⁻¹⁹')}`, res('N = 3.3 × 10¹⁵ photons per second')]]
      ], { chk: [['h*c/650e-9', 3.06e-19], ['1e-3/(h*c/650e-9)', 3.27e15]] }],
      ['The Planck constant from an LED', 'A red LED of wavelength 620 nm just begins to emit light at 2.0 V. Estimate the Planck constant.', [
        ['Energy balance', 'At the threshold, the energy given to each electron, eV, becomes one photon.', [`eV = ${fr('hc', 'λ')}, so h = ${fr('eVλ', 'c')}`]],
        ['Calculate', '', [`h = ${fr('1.60 × 10⁻¹⁹ × 2.0 × 620 × 10⁻⁹', '3.00 × 10⁸')}`, res('h ≈ 6.6 × 10⁻³⁴ J s')]]
      ], { chk: [['e*2*620e-9/3e8', 6.61e-34]] }]
    ],
    gaps: [
      { q: 'Light has a wavelength of 500 nm.', lines: ['photon energy = [[3.98e-19]] J', 'in eV = [[2.49]] eV'], calc: ['h*c/500e-9', 'h*c/500e-9/e'], why: 'Divide by 1.60 × 10⁻¹⁹ to convert J to eV.' },
      { q: 'A photon has an energy of 3.0 eV.', lines: ['wavelength = hc ÷ E = [[4.14e-7]] m'], calc: ['h*c/(3*e)'], why: 'Violet light.' }
    ],
    exam: [
      { stem: '<p>A student measures the p.d. V at which LEDs of different colours start to emit light.</p>' + tbl(['LED', 'red', 'green', 'blue'], [['λ / nm', '630', '525', '470'], ['V / V', '1.95', '2.35', '2.65']]), parts: [
        { q: 'Explain why the threshold p.d. depends on the wavelength of the LED.', m: 2, lines: 3, ms: [['B1', 'Each electron passing through the LED transfers energy eV to one photon'], ['B1', 'Shorter wavelength photons have more energy (E = hc/λ), so a larger p.d. is needed']] },
        { q: 'Use the blue LED to calculate a value for the Planck constant.', m: 2, ans: { a: 6.64e-34, unit: 'J s', tol: 0.02 }, calc: 'e*2.65*470e-9/3e8', ms: [['C1', 'h = eVλ ÷ c'], ['A1', 'h = 1.60 × 10⁻¹⁹ × 2.65 × 470 × 10⁻⁹ ÷ 3.00 × 10⁸ = 6.6 × 10⁻³⁴ J s']] },
        { q: 'Explain why plotting V against 1/λ for all the LEDs gives a better value.', m: 2, lines: 3, ms: [['B1', 'V = (hc/e)(1/λ), so the graph is a straight line of gradient hc/e'], ['B1', 'The gradient uses all the data and reduces the effect of random error in one reading (a systematic offset appears as an intercept)']] }] },
      { stem: '<p>A green laser emits 5.0 mW of light at 532 nm.</p>', parts: [
        { q: 'Calculate the energy of one photon.', m: 1, ans: { a: 3.74e-19, unit: 'J', tol: 0.02 }, calc: 'h*c/532e-9', ms: [['B1', 'E = hc ÷ λ = 3.7 × 10⁻¹⁹ J']] },
        { q: 'Calculate the number of photons emitted each second.', m: 2, ans: { a: 1.34e16, unit: 's⁻¹', tol: 0.02 }, calc: '5e-3/(h*c/532e-9)', ms: [['C1', 'N = P ÷ E'], ['A1', 'N = 5.0 × 10⁻³ ÷ 3.74 × 10⁻¹⁹ = 1.3 × 10¹⁶ s⁻¹']] },
        { q: 'State what a photon is.', m: 1, lines: 1, ms: [['B1', 'A quantum (discrete packet) of electromagnetic energy']] }] }
    ]
  });

  /* ---------------- wv10 The photoelectric effect ---------------- */
  add('wv10', {
    ex: [
      ['Zinc in ultraviolet', 'Ultraviolet light of wavelength 200 nm falls on zinc (work function 4.3 eV). Find the maximum kinetic energy of the photoelectrons, the stopping potential and the maximum speed.', [
        ['Photon energy', '', [`E = ${fr('hc', 'λ')} = 9.95 × 10⁻¹⁹ J = 6.22 eV`]],
        ['Einstein’s equation', 'hf = φ + KE_max.', ['KE_max = 6.22 − 4.3 = 1.92 eV', 'stopping potential = 1.92 V']],
        ['Maximum speed', '', [`v = √(${fr('2 × 1.92 × 1.60 × 10⁻¹⁹', '9.11 × 10⁻³¹')})`, res('v = 8.2 × 10⁵ m s⁻¹')]]
      ], { chk: [['h*c/200e-9/e', 6.22], ['h*c/200e-9/e-4.3', 1.92], ['sqrt(2*(h*c/200e-9-4.3*e)/me)', 8.2e5]] }],
      ['A model answer: why the wave model fails', 'Explain how the photoelectric effect shows that light behaves as particles. (4 marks)', [
        ['Threshold frequency', '', [`No electrons are emitted below a ${mp('threshold frequency')}, however intense the light. A wave model predicts that intense light should eventually give enough energy.`]],
        ['One photon, one electron', '', [`Each electron absorbs ${mp('one photon')} of energy hf; if hf < φ it cannot escape.`]],
        ['Kinetic energy', '', [`KE_max depends on ${mp('frequency, not intensity')}; intensity changes only the ${mp('number of electrons')} per second.`]],
        ['Instant emission', '', [`Emission is ${mp('instantaneous')}: a wave would need time to build up the energy.`]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'A metal has a work function of 2.3 eV.', lines: ['threshold frequency = φ ÷ h = [[5.55e14]] Hz'], calc: ['2.3*e/h'], why: 'Convert eV to J first.' },
      { q: 'Photons of 3.1 eV hit a metal with work function 2.3 eV.', lines: ['KE_max = [[0.8]] eV'], calc: ['3.1-2.3'], why: 'KE_max = hf − φ.' },
      { q: 'A metal has work function 4.5 eV.', lines: ['threshold wavelength = hc ÷ φ = [[2.76e-7]] m'], calc: ['h*c/(4.5*e)'], why: 'Longer wavelengths do not emit electrons.' }
    ],
    exam: [
      { stem: '<p>A student measures the maximum kinetic energy of photoelectrons emitted from a metal at different frequencies.</p>' + tbl(['f / 10¹⁴ Hz', '6.0', '7.0', '8.0', '9.0'], [['KE_max / eV', '0.21', '0.62', '1.04', '1.45']]), parts: [
        { q: 'Use the data to determine the Planck constant in J s.', m: 2, ans: { a: 6.61e-34, unit: 'J s', tol: 0.02 }, calc: '(1.45-0.21)/(3e14)*e', ms: [['C1', 'gradient = (1.45 − 0.21) eV ÷ 3.0 × 10¹⁴ Hz = 4.13 × 10⁻¹⁵ eV s'], ['A1', 'h = 4.13 × 10⁻¹⁵ × 1.60 × 10⁻¹⁹ = 6.6 × 10⁻³⁴ J s']] },
        { q: 'Determine the threshold frequency.', m: 2, ans: { a: 5.49e14, unit: 'Hz', tol: 0.02 }, calc: '6e14-0.21/((1.45-0.21)/3e14)', ms: [['C1', 'extrapolate to KE_max = 0'], ['A1', 'f₀ = 6.0 × 10¹⁴ − 0.21 ÷ 4.13 × 10⁻¹⁵ = 5.5 × 10¹⁴ Hz']] },
        { q: 'Calculate the work function in eV.', m: 1, ans: { a: 2.27, unit: 'eV', tol: 0.02 }, calc: '(1.45-0.21)/3e14*(6e14-0.21/((1.45-0.21)/3e14))', ms: [['B1', 'φ = hf₀ = 4.13 × 10⁻¹⁵ × 5.5 × 10¹⁴ = 2.3 eV']] }] },
      { stem: '<p>Light shone on a clean metal surface may release electrons.</p>', parts: [
        { q: 'Explain why no electrons are released below a certain frequency, however bright the light.', m: 2, lines: 3, ms: [['B1', 'Each electron can absorb only one photon, of energy hf'], ['B1', 'Below the threshold frequency hf is less than the work function, so no single photon gives enough energy to escape']] },
        { q: 'Explain why electrons are emitted with no measurable delay.', m: 1, lines: 2, ms: [['B1', 'The energy arrives in photons, so one photon transfers its energy to one electron at once; no build-up is needed']] },
        { q: 'State the effect of doubling the intensity at a frequency above the threshold.', m: 1, lines: 1, ms: [['B1', 'Twice as many electrons are emitted per second; their maximum kinetic energy is unchanged']] }] }
    ]
  });

  /* ---------------- wv11 Wave–particle duality and electron diffraction ---------------- */
  add('wv11', {
    ex: [
      ['An electron through 100 V', 'An electron is accelerated from rest through 100 V. Find its de Broglie wavelength.', [
        ['Kinetic energy', '', ['E = eV = 1.60 × 10⁻¹⁹ × 100 = 1.60 × 10⁻¹⁷ J']],
        ['Momentum', 'p = √(2mE).', ['p = √(2 × 9.11 × 10⁻³¹ × 1.60 × 10⁻¹⁷) = 5.40 × 10⁻²⁴ kg m s⁻¹']],
        ['Wavelength', 'λ = h ÷ p.', [res('λ = 1.2 × 10⁻¹⁰ m: similar to the spacing of atoms, so the electrons diffract')]]
      ], { chk: [['100*e', 1.6e-17], ['sqrt(2*me*100*e)', 5.4e-24], ['h/sqrt(2*me*100*e)', 1.228e-10]] }],
      ['Trap: why don’t cricket balls diffract?', 'Find the de Broglie wavelength of a 0.16 kg cricket ball bowled at 30 m s⁻¹.', [
        ['Calculate', '', [`λ = ${fr('h', 'mv')} = ${fr('6.63 × 10⁻³⁴', '0.16 × 30')}`, res('λ = 1.4 × 10⁻³⁴ m')]],
        ['Interpret', 'The trap: thinking only electrons have a wavelength. Everything does.', ['Diffraction needs a gap comparable to λ. Nothing is anywhere near 10⁻³⁴ m wide, so no diffraction is ever seen.']]
      ], { chk: [['h/(0.16*30)', 1.38e-34]] }]
    ],
    gaps: [
      { q: 'An electron moves at 2.0 × 10⁶ m s⁻¹.', lines: ['de Broglie wavelength = [[3.64e-10]] m'], calc: ['h/(me*2e6)'], why: 'λ = h ÷ mv.' },
      { q: 'An electron has a de Broglie wavelength of 1.0 × 10⁻¹⁰ m.', lines: ['speed = h ÷ mλ = [[7.28e6]] m s⁻¹'], calc: ['h/(me*1e-10)'], why: 'Rearrange λ = h ÷ mv.' },
      { q: 'A proton (1.673 × 10⁻²⁷ kg) has the same wavelength, 1.0 × 10⁻¹⁰ m.', lines: ['speed = [[3963]] m s⁻¹'], calc: ['h/(mp*1e-10)'], why: 'Same momentum, much larger mass, so a much lower speed.' }
    ],
    exam: [
      { stem: '<p>Beams of neutrons are diffracted by crystals with atomic spacing about 2.0 × 10⁻¹⁰ m. The neutrons need a de Broglie wavelength equal to this spacing. (mass of a neutron = 1.675 × 10⁻²⁷ kg)</p>', parts: [
        { q: 'Calculate the momentum of each neutron.', m: 1, ans: { a: 3.315e-24, unit: 'kg m s⁻¹', tol: 0.02 }, calc: 'h/2e-10', ms: [['B1', 'p = h ÷ λ = 3.3 × 10⁻²⁴ kg m s⁻¹']] },
        { q: 'Calculate the speed of the neutrons.', m: 2, ans: { a: 1979, unit: 'm s⁻¹', tol: 0.02 }, calc: 'h/2e-10/1.675e-27', ms: [['C1', 'v = p ÷ m'], ['A1', 'v = 2.0 × 10³ m s⁻¹']] },
        { q: 'Calculate the kinetic energy of each neutron in eV.', m: 2, ans: { a: 0.0205, unit: 'eV', tol: 0.03 }, calc: '0.5*1.675e-27*(h/2e-10/1.675e-27)**2/e', ms: [['C1', 'KE = ½mv² = 3.3 × 10⁻²¹ J'], ['A1', 'KE = 0.021 eV']] }] },
      { stem: '<p>In an electron diffraction tube, a beam of electrons passes through thin graphite and forms rings on a screen.</p>', parts: [
        { q: 'Explain how this shows that electrons behave as waves.', m: 2, lines: 3, ms: [['B1', 'Diffraction is a wave property'], ['B1', 'The rings are a diffraction pattern produced because the electrons’ de Broglie wavelength is comparable to the spacing of the carbon atoms']] },
        { q: 'The accelerating voltage is increased. Describe and explain the change in the rings.', m: 2, lines: 3, ms: [['B1', 'The rings get smaller (closer to the centre)'], ['B1', 'The electrons have more momentum, so a shorter wavelength, so they diffract through smaller angles']] }] }
    ]
  });

  /* ---------------- wv12 Review and exam practice ---------------- */
  add('wv12', {
    ex: [
      ['Synoptic: a fibre-optic link', 'An optical fibre link uses a 2.0 mW laser at 1550 nm. The core has refractive index 1.47. Find the photons sent per second and the time for light to travel 50 km along the fibre.', [
        ['Photon energy', '', [`E = ${fr('hc', 'λ')} = 1.28 × 10⁻¹⁹ J`]],
        ['Photons per second', '', ['N = 2.0 × 10⁻³ ÷ 1.28 × 10⁻¹⁹ = 1.56 × 10¹⁶ s⁻¹']],
        ['Travel time', 'Speed in the core = c ÷ n.', ['v = 3.00 × 10⁸ ÷ 1.47 = 2.04 × 10⁸ m s⁻¹', res('t = 5.0 × 10⁴ ÷ 2.04 × 10⁸ = 2.5 × 10⁻⁴ s')]]
      ], { chk: [['h*c/1550e-9', 1.283e-19], ['2e-3/(h*c/1550e-9)', 1.559e16], ['3e8/1.47', 2.04e8], ['5e4*1.47/3e8', 2.45e-4]] }],
      ['A model answer: wave–particle duality', 'Describe evidence that light behaves both as a wave and as a particle, and evidence that electrons do too. (4 marks)', [
        ['Light as a wave', '', [`${mp('Diffraction and interference')} (e.g. Young’s double slit).`]],
        ['Light as particles', '', [`The ${mp('photoelectric effect')}: threshold frequency and instant emission need photons.`]],
        ['Electrons as particles', '', [`They have ${mp('mass and charge')} and are deflected by fields (e.g. in an electron gun).`]],
        ['Electrons as waves', '', [`${mp('Electron diffraction')} through graphite, with λ = h ÷ p.`]]
      ], { desc: true }]
    ],
    gaps: [
      { q: 'Microwaves have a wavelength of 2.8 cm.', lines: ['frequency = [[1.07e10]] Hz', 'photon energy = [[7.1e-24]] J'], calc: ['3e8/0.028', 'h*3e8/0.028'], why: 'Microwave photons carry very little energy each.' }
    ],
    exam: [
      { stem: '<p>A microwave transmitter emits vertically polarised waves of wavelength 2.8 cm.</p>', parts: [
        { q: 'Calculate the frequency of the microwaves.', m: 1, ans: { a: 1.07e10, unit: 'Hz', tol: 0.02 }, calc: '3e8/0.028', ms: [['B1', 'f = 3.00 × 10⁸ ÷ 0.028 = 1.1 × 10¹⁰ Hz']] },
        { q: 'The microwaves reflect from a metal plate and form a stationary wave. State the distance between adjacent nodes.', m: 1, ans: { a: 1.4, unit: 'cm', tol: 0.01 }, calc: '2.8/2', ms: [['B1', 'λ/2 = 1.4 cm']] },
        { q: 'The waves pass through two slits 0.20 m apart. Calculate the separation of the maxima 0.80 m beyond the slits.', m: 2, ans: { a: 0.112, unit: 'm', tol: 0.02 }, calc: '0.028*0.8/0.2', ms: [['C1', 'x = λD ÷ a'], ['A1', 'x = 0.028 × 0.80 ÷ 0.20 = 0.11 m']] },
        { q: 'The receiver is rotated through 90° about the beam. Explain what happens to the signal.', m: 2, lines: 3, ms: [['B1', 'The signal falls to (nearly) zero'], ['B1', 'The waves are polarised and the receiver only detects oscillations in one plane, now perpendicular to that of the waves']] },
        { q: 'Calculate the energy of one microwave photon.', m: 2, ans: { a: 7.1e-24, unit: 'J', tol: 0.02 }, calc: 'h*3e8/0.028', ms: [['C1', 'E = hf = 6.63 × 10⁻³⁴ × 1.07 × 10¹⁰'], ['A1', 'E = 7.1 × 10⁻²⁴ J']] }] },
      { stem: '<p>Ultraviolet light of wavelength 250 nm falls on potassium, which has a work function of 2.3 eV.</p>', parts: [
        { q: 'Calculate the photon energy in eV.', m: 1, ans: { a: 4.97, unit: 'eV', tol: 0.02 }, calc: 'h*c/250e-9/e', ms: [['B1', 'E = hc ÷ λ = 7.96 × 10⁻¹⁹ J = 5.0 eV']] },
        { q: 'Calculate the maximum kinetic energy of the photoelectrons in eV.', m: 1, ans: { a: 2.67, unit: 'eV', tol: 0.02 }, calc: 'h*c/250e-9/e-2.3', ms: [['B1', '4.97 − 2.3 = 2.7 eV']] },
        { q: 'Calculate the maximum speed of the photoelectrons.', m: 2, ans: { a: 9.69e5, unit: 'm s⁻¹', tol: 0.02 }, calc: 'sqrt(2*(h*c/250e-9-2.3*e)/me)', ms: [['C1', 'KE = 2.67 × 1.60 × 10⁻¹⁹ = 4.27 × 10⁻¹⁹ J'], ['A1', 'v = √(2KE ÷ m) = 9.7 × 10⁵ m s⁻¹']] },
        { q: 'Calculate the de Broglie wavelength of these fastest electrons.', m: 2, ans: { a: 7.51e-10, unit: 'm', tol: 0.02 }, calc: 'h/(me*sqrt(2*(h*c/250e-9-2.3*e)/me))', ms: [['C1', 'λ = h ÷ mv'], ['A1', 'λ = 7.5 × 10⁻¹⁰ m']] },
        { q: 'State what this question shows about the nature of light and electrons.', m: 1, lines: 2, ms: [['B1', 'Light arrives as particles (photons), while the electrons it releases have a wavelength: both show wave–particle duality']] }] }
    ]
  });

  add('wv9', { gaps: [{ q: 'An LED emits light of wavelength 590 nm.', lines: ['photon energy = [[3.37e-19]] J', 'minimum p.d. to light it = [[2.11]] V'], calc: ['h*c/590e-9', 'h*c/590e-9/e'], why: 'eV = hc ÷ λ at the threshold.' }] });
})();
