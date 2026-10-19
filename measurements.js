/* OCR A Physics: revision of the measurement and analysis skills used across modules 1–2.
   Source: OCR Physics Practical Skills Handbook v2.1 (January 2026), especially pp. 30–48.
   https://www.ocr.org.uk/Images/295483-practical-skills-handbook.pdf */
(() => {
  "use strict";
  const {B, lesson} = LEARN, {W} = LAB, {fr, v, res} = W;
  const previousUnit = LEARN.unit;
  LEARN.unit = "measurements";
  Object.assign(LAB.ICONS, {
    "u-measure": '<path d="M3 7h18v10H3zM6 7v5M10 7v3M14 7v5M18 7v3"/>',
    "l-measure": '<path d="M3 7h18v10H3zM6 7v5M10 7v3M14 7v5M18 7v3"/>'
  });
  const add = (id, num, group, name, intro, outcomes, blocks, onShow) => lesson({
    id, num, group, name, icon:"measure", lvl:`Modules 1–2 · Lesson ${num}`,
    eyebrow:`OCR A Level Physics A · Measurements and uncertainties · Lesson ${num}`,
    title:name, intro, outcomes:outcomes.map(t => [t]), blocks, onShow
  });
  const source = B.text("Reference", '<p>These revision lessons use the conventions in the <a href="https://www.ocr.org.uk/Images/295483-practical-skills-handbook.pdf" target="_blank" rel="noopener">OCR Physics Practical Skills Handbook</a>. Always use any uncertainty or convention specified in the question or on the instrument.</p>');

  add("mu1", 1, "f", "SI units, prefixes and significant figures",
    "Make quantities comparable before you calculate. Use SI units, convert powers of units correctly and report only the precision justified by the data.",
    ["Recognise SI base and derived units", "Convert prefixes, areas and volumes", "Check the homogeneity of an equation", "Use significant figures without rounding intermediate calculations"], [
      B.text("Base and derived units", '<p>The seven SI base units are metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol) and candela (cd). Derived units are combinations of these.</p><ul><li>Force: N = kg m s⁻², from F = ma.</li><li>Energy: J = N m = kg m² s⁻².</li><li>Pressure: Pa = N m⁻² = kg m⁻¹ s⁻².</li><li>Charge: C = A s; potential difference: V = J C⁻¹.</li></ul><p>An equation is <b>homogeneous</b> when both sides have the same units. This is a useful check, but matching units alone does not prove that an equation is correct: a missing factor such as ½ has no units.</p>'),
      B.text("Prefixes and powers", '<div class="tbl-wrap"><table><thead><tr><th>Prefix</th><th>Symbol</th><th>Multiplier</th></tr></thead><tbody><tr><td>giga</td><td>G</td><td>10⁹</td></tr><tr><td>mega</td><td>M</td><td>10⁶</td></tr><tr><td>kilo</td><td>k</td><td>10³</td></tr><tr><td>centi</td><td>c</td><td>10⁻²</td></tr><tr><td>milli</td><td>m</td><td>10⁻³</td></tr><tr><td>micro</td><td>μ</td><td>10⁻⁶</td></tr><tr><td>nano</td><td>n</td><td>10⁻⁹</td></tr><tr><td>pico</td><td>p</td><td>10⁻¹²</td></tr></tbody></table></div><p>Square or cube the <b>whole conversion factor</b>: 1 mm² = (10⁻³ m)² = 10⁻⁶ m²; 1 cm³ = (10⁻² m)³ = 10⁻⁶ m³. Prefixes are case sensitive: mW and MW differ by a factor of 10⁹.</p>'),
      B.text("Significant figures", '<p>Leading zeros locate the decimal point; they are not significant figures. 0.00450 has three significant figures. In standard form, write a number between 1 and 10 multiplied by a power of ten.</p><p>Keep extra digits in intermediate calculations. For multiplication and division, report the final answer to a precision consistent with the least precise supplied data. For addition and subtraction, consider decimal places. Follow any specific instruction in the question.</p>'),
      B.example("A thin wire", "A wire has diameter 0.50 mm. Calculate its cross-sectional area in m², to two significant figures.", [
        ["Convert the diameter", "Convert before squaring.", ["d = 0.50 × 10⁻³ m = 5.0 × 10⁻⁴ m"]],
        ["Use the radius", "The radius is half the diameter.", ["r = 2.5 × 10⁻⁴ m"]],
        ["Calculate and round at the end", "", ["A = πr² = π × (2.5 × 10⁻⁴)² = 1.963… × 10⁻⁷ m²", res("A = 2.0 × 10⁻⁷ m²")]]
      ]),
      B.check([
        {q:"Which are the SI base units of pressure?",opts:["kg m s⁻²","kg m⁻¹ s⁻²","kg m² s⁻²","kg m⁻² s⁻¹"],a:1,why:"Pa = N/m² = kg m⁻¹ s⁻²."},
        {q:"Convert 2.4 mm² into m².",a:2.4e-6,unit:"m²",why:"(10⁻³)² = 10⁻⁶, so 2.4 mm² = 2.4 × 10⁻⁶ m²."},
        {q:"Convert 35 cm³ into m³.",a:3.5e-5,unit:"m³",why:"35 × 10⁻⁶ = 3.5 × 10⁻⁵ m³."},
        {q:"How many significant figures are in 0.00450?",a:3,tol:0,why:"4, 5 and the final 0 are significant; the leading zeros are not."},
        {q:"An equation has matching units on both sides. What can you conclude?",opts:["It must be correct","It is homogeneous, but could still be incorrect","Its numerical constant must be 1","It applies at all speeds"],a:1,why:"A dimensionless constant or a condition of validity can still be wrong."}
      ]),
      B.mistakes(["Converting mm² using 10⁻³ instead of 10⁻⁶.","Using a diameter as a radius.","Rounding each intermediate result.","Confusing significant figures with decimal places."])
    ]);

  add("mu2", 2, "f", "Measurements, errors and repeat readings",
    "A measurement is an estimate with an uncertainty. Distinguish a consistent set of readings from a set that is close to the true value, and choose improvements that address the actual source of error.",
    ["Distinguish accuracy, precision, resolution and uncertainty", "Explain random and systematic errors", "Estimate uncertainty from instruments and repeated readings"], [
      B.text("What the terms mean", '<ul><li><b>Accuracy</b>: closeness to the true value.</li><li><b>Precision</b>: closeness of repeated readings to one another (small spread).</li><li><b>Resolution</b>: the smallest change an instrument can distinguish.</li><li><b>Uncertainty</b>: an estimate of the range within which the measured value may lie.</li></ul><p>A miscalibrated balance can give tightly grouped readings that are precise but inaccurate. Extra digits on a display do not guarantee accuracy.</p>'),
      B.text("Random and systematic errors", '<p><b>Random errors</b> produce unpredictable scatter, such as judging an oscillation’s passage past a marker. Repeat readings and average them to reduce the effect on the estimate.</p><p><b>Systematic errors</b> bias readings in a consistent way, such as an uncorrected zero offset or a stretched ruler. Repetition alone does not remove them. Check calibration, measure and correct a zero offset, or improve the method.</p><p>Do not discard a reading solely because it is inconvenient. Investigate a suspected anomaly and repeat the measurement; explain any justified exclusion.</p>'),
      B.text("Instrument uncertainty", '<p>Use a stated manufacturer or question uncertainty first. Otherwise, a common convention is <b>half the smallest scale division per analogue reading</b> and <b>one last displayed increment per digital reading</b>. For a distance found from two ruler readings, add the two absolute uncertainties.</p><p>For example, a ruler marked every 1 mm gives ±0.5 mm for each endpoint, so the measured distance has uncertainty ±1 mm. A digital balance displaying 12.34 g has a display increment of 0.01 g; using the convention above gives ±0.01 g. Other effects may make the overall uncertainty larger.</p><p>OCR also accepts consistently applied alternative half/full-resolution conventions; follow the uncertainty specified in an exam question.</p>'),
      B.example("Timing oscillations", "Three measurements of the time for 10 oscillations are 12.4 s, 12.6 s and 12.5 s. Estimate the period and its uncertainty using half the range.", [
        ["Mean total time", "", ["mean time = (12.4 + 12.6 + 12.5)/3 = 12.5 s"]],
        ["Spread uncertainty", "Half the range estimates the uncertainty due to the observed scatter.", ["Δt = (12.6 − 12.4)/2 = 0.1 s"]],
        ["Divide by the exact count", "Ten is a counted number of complete oscillations.", ["T = 12.5/10 = 1.25 s; ΔT = 0.1/10 = 0.01 s", res("T = (1.25 ± 0.01) s")]]
      ]),
      B.check([
        {q:"A balance always reads 0.20 g too high. What type of error is this?",opts:["Random error","Systematic zero error","An error removed by averaging alone","No error if readings agree"],a:1,why:"The same offset biases every reading. Correct the zero."},
        {q:"Times are 8.2 s, 8.4 s and 8.6 s. What is the half-range uncertainty?",a:.2,unit:"s",why:"(8.6 − 8.2)/2 = 0.2 s."},
        {q:"Each endpoint of a distance has uncertainty ±0.5 mm. What is the absolute uncertainty in the distance?",a:1,unit:"mm",why:"Add the two absolute uncertainties: 0.5 + 0.5 = 1 mm."},
        {q:"A measured time for 20 oscillations is (30.0 ± 0.2) s. What is the uncertainty in one period?",a:.01,unit:"s",why:"Divide the time and its absolute uncertainty by 20: 0.2/20 = 0.01 s."},
        {q:"Repeated readings have little scatter but are far from the accepted value. They are…",opts:["accurate and precise","precise but inaccurate","accurate but imprecise","evidence that there is no uncertainty"],a:1,why:"Small spread means precision; proximity to the true value determines accuracy."}
      ]),
      B.keypoints(["Repeated readings reveal random scatter; averaging does not remove a systematic offset.","Half-range uncertainty = (maximum − minimum)/2; do not use a zero range as proof of zero uncertainty.","Time many oscillations to reduce the percentage effect of reaction time; use a consistent reference point."]), source
    ]);

  const uncertaintyControls = `<div class="lcard"><h3>Interactive: uncertainty in g = 2h/t²</h3><p>Change the readings and their absolute uncertainties. The factor 2 is exact.</p><div class="row"><label>Height h / m <input id="mu-h" type="number" min="0.001" step="0.001" value="0.800"></label><label>Δh / m <input id="mu-dh" type="number" min="0" step="0.001" value="0.002"></label><label>Time t / s <input id="mu-t" type="number" min="0.001" step="0.001" value="0.404"></label><label>Δt / s <input id="mu-dt" type="number" min="0" step="0.001" value="0.005"></label></div><p id="mu-calc" role="status" aria-live="polite"></p></div>`;
  add("mu3", 3, "u", "Calculating and combining uncertainties",
    "Use absolute uncertainties for sums and differences, and percentage uncertainties for products, quotients and powers. These are the usual maximum-uncertainty estimates used in A-level questions.",
    ["Calculate absolute, fractional and percentage uncertainties", "Combine uncertainties in sums, products, quotients and powers", "Report a result and its uncertainty consistently"], [
      B.text("Absolute and percentage uncertainty", '<p>For x = (25.0 ± 0.5) mm, the <b>absolute uncertainty</b> is 0.5 mm. The fractional uncertainty is 0.5/25.0 = 0.020, and the percentage uncertainty is 2.0%.</p>' + B.eq(`percentage uncertainty = ${fr("absolute uncertainty","magnitude of measured value")} × 100%`) + '<p>For a fixed absolute uncertainty, a larger measured quantity has a smaller percentage uncertainty. A fractional or percentage uncertainty is undefined for a measured value of zero: report its absolute uncertainty instead.</p>'),
      B.text("Combination rules", '<ul><li><b>Addition or subtraction</b>: add the absolute uncertainties. For z = x − y, Δz = Δx + Δy.</li><li><b>Multiplication or division</b>: add the percentage uncertainties.</li><li><b>Powers</b>: multiply the percentage uncertainty by the magnitude of the power. For A ∝ d², %ΔA = 2 × %Δd.</li><li><b>Exact constants</b> contribute no uncertainty. Multiplying a quantity by an exact constant multiplies its absolute uncertainty by the same factor, leaving its percentage uncertainty unchanged.</li></ul><p>For z = axᵖ/yᑫ with exact a, add |p| × %Δx and |q| × %Δy. Do not subtract uncertainties when dividing. Do not count the same measurement as independent twice if an expression can first be simplified.</p>'),
      B.example("An extension from two readings", "A wire’s scale reading changes from (500.0 ± 0.5) mm to (502.0 ± 0.5) mm. Find the extension and its percentage uncertainty.", [
        ["Subtract the readings", "", ["extension = 502.0 − 500.0 = 2.0 mm"]],
        ["Add absolute uncertainties", "Subtraction does not cancel the uncertainties.", ["Δ(extension) = 0.5 + 0.5 = 1.0 mm"]],
        ["Find the percentage", "Use the extension as the denominator.", ["percentage uncertainty = 1.0/2.0 × 100% = 50%", res("extension = (2.0 ± 1.0) mm")]]
      ]), uncertaintyControls,
      B.text("Present the result", '<p>Usually quote an uncertainty to one significant figure (or two when appropriate), then round the measured value to the same decimal place: for example (9.7 ± 0.3) m s⁻². Keep extra digits until the final step.</p><p>Compare an accepted value with the interval you have estimated. Being outside it is a reason to investigate the method, assumptions and uncertainty estimate; it does not by itself prove a particular systematic error.</p>'),
      B.check([
        {q:"A length is (40.0 ± 0.8) cm. What is its percentage uncertainty?",a:2,unit:"%",why:"0.8/40.0 × 100 = 2.0%."},
        {q:"A diameter has a 2% uncertainty. What is the percentage uncertainty in area A = πd²/4?",a:4,unit:"%",why:"The power is 2, so double the percentage uncertainty."},
        {q:"V has 3% uncertainty and I has 2%. What is the percentage uncertainty in R = V/I?",a:5,unit:"%",why:"Add percentage uncertainties for division: 3 + 2 = 5%."},
        {q:"h has 1% uncertainty and t has 2%. What is the percentage uncertainty in g = 2h/t²?",a:5,unit:"%",why:"%Δg = %Δh + 2 × %Δt = 1 + 4 = 5%."},
        {q:"A result is 9.8 m s⁻² with 3% uncertainty. What is its absolute uncertainty before rounding?",a:.294,unit:"m s⁻²",tol:.001,why:"0.03 × 9.8 = 0.294 m s⁻², normally reported as ±0.3 m s⁻²."}
      ]), B.mistakes(["Subtracting uncertainties when subtracting readings or dividing quantities.","Dividing by an original length when the required percentage uncertainty is in the extension.","Forgetting to multiply percentage uncertainty by the power."])
    ]);
  function updateUncertainty() {
    const [h, dh, t, dt] = ["mu-h","mu-dh","mu-t","mu-dt"].map(id => document.getElementById(id).valueAsNumber);
    const out = document.getElementById("mu-calc");
    if (![h,dh,t,dt].every(Number.isFinite) || h <= 0 || t <= 0 || dh < 0 || dt < 0) {
      out.textContent = "Enter positive readings and non-negative uncertainties."; return;
    }
    const g = 2*h/t**2, ph = dh/h*100, pt = dt/t*100, percent = ph + 2*pt;
    out.textContent = `g = ${g.toFixed(3)} m s⁻²; %Δg = ${ph.toFixed(2)} + 2 × ${pt.toFixed(2)} = ${percent.toFixed(2)}%; Δg = ${(g*percent/100).toPrecision(3)} m s⁻² (before final rounding).${dh >= h || dt >= t ? " These uncertainties are large compared with the readings; improve the measurement method before relying on this estimate." : ""}`;
  }
  ["mu-h","mu-dh","mu-t","mu-dt"].forEach(id => document.getElementById(id).addEventListener("input", updateUncertainty));
  updateUncertainty();

  const graphControls = `<div class="lcard"><h3>Interactive: every error bar matters</h3><p>These data follow y = x. Tightening an intermediate error bar restricts the acceptable gradient even though the outer bars stay the same.</p><label class="check"><input id="mu-tight" type="checkbox" checked>Use a tight intermediate error bar</label><label class="check"><input id="mu-anomaly" type="checkbox">Move the middle reading outside the straight-line pattern</label><canvas id="mu-graph" class="graph" role="img" aria-label="Data and vertical error bars with best-fit and worst acceptable lines"></canvas><p id="mu-graph-result" role="status" aria-live="polite"></p></div>`;
  add("mu4", 4, "u", "Graphs, gradients and worst acceptable lines",
    "Choose a graph that tests your model, use a large gradient triangle and check every error bar before deciding how uncertain the gradient is.",
    ["Choose and label suitable axes", "Linearise a relationship and interpret its gradient and intercept", "Find a worst acceptable line through every error bar", "Calculate uncertainty in a gradient"], [
      B.text("A graph that tests the model", '<p>Put the independent variable on the horizontal axis and the dependent variable on the vertical axis. Label each axis with its quantity and unit, for example t² / s² and h / m. Choose simple scales so the points use a substantial fraction of the grid. Plot error bars where required.</p><p>For h = ½gt², plot h against t². A straight line is consistent with this model; its gradient is g/2. An intercept consistent with zero is needed for the simple proportional relationship h ∝ t². A straight line alone does not prove the model.</p>'),
      B.text("Gradient and intercept", B.eq(`gradient m = ${fr("y₂ − y₁","x₂ − x₁")}`, "y = mx + c") + '<p>Choose two well-separated points <b>on the best-fit line</b>, which need not be experimental readings. Draw a large triangle and show both coordinate differences. The gradient’s unit is the vertical-axis unit divided by the horizontal-axis unit.</p><p>A best-fit line should represent the overall trend with a reasonable balance of points on each side. Do not join points dot to dot or force the line through the origin unless the model and the data justify it.</p>'),
      B.text("Worst acceptable lines", '<p>Draw the steepest and shallowest straight lines that still intersect <b>all</b> the error bars. Choose the one whose gradient differs most from the best-fit gradient. The limiting bars may be in the middle of the data: joining opposite ends of the outermost bars is only valid if the line also crosses every other bar.</p>' + B.eq("Δm = |m<sub>worst</sub> − m<sub>best</sub>|", `percentage uncertainty in m = ${fr("Δm","|m<sub>best</sub>|")} × 100%`) + '<p>If no straight line fits all the error bars, do not invent a worst-fit uncertainty. Investigate anomalies, the uncertainty estimates and whether a straight-line model is appropriate. If the best gradient is zero, report absolute gradient uncertainty rather than a percentage.</p>'), graphControls,
      B.example("Determining g from a graph", "The best-fit gradient of h against t² is 4.86 m s⁻². The worst acceptable gradient is 5.02 m s⁻². Calculate g and its uncertainty.", [
        ["Interpret the gradient", "h = ½gt², so g = 2m.", ["g = 2 × 4.86 = 9.72 m s⁻²"]],
        ["Uncertainty in the gradient", "", ["Δm = |5.02 − 4.86| = 0.16 m s⁻²"]],
        ["Propagate the exact factor", "", ["Δg = 2 × 0.16 = 0.32 m s⁻²", res("g = (9.7 ± 0.3) m s⁻²")]]
      ]),
      B.check([
        {q:"A graph of h / m against t² / s² has gradient 4.90. What is g?",a:9.8,unit:"m s⁻²",why:"Gradient = g/2, so g = 2 × 4.90."},
        {q:"The best gradient is 2.00 and the worst acceptable gradient is 2.12. What is the percentage uncertainty?",a:6,unit:"%",why:"|2.12 − 2.00|/2.00 × 100 = 6%."},
        {q:"Which line is a valid worst acceptable line?",opts:["Any line joining the first and last readings","The steepest or shallowest line that crosses every error bar","A line through the origin even if it misses the bars","A curve through every point"],a:1,why:"Every supplied error bar constrains the acceptable straight line."},
        {q:"What are the units of the gradient of force / N against extension / m?",opts:["N m","N m⁻¹","m N⁻¹","J"],a:1,why:"Vertical unit divided by horizontal unit: N/m."},
        {q:"Which points should you normally use for a gradient triangle?",opts:["Two adjacent measured points","Two well-separated points on the best-fit line","The origin and any point","The largest and smallest y values regardless of the line"],a:1,why:"A large triangle reduces the percentage effect of reading coordinates."}
      ])
    ], () => drawGraph());
  function drawGraph() {
    const tight = document.getElementById("mu-tight").checked, anomaly = document.getElementById("mu-anomaly").checked;
    const points = [[0,0],[.5,anomaly ? 2 : .5],[2,2]], errors = [1,tight ? .01 : 1,1];
    const best = LAB.linfit(points), worst = LAB.worst(points,errors,best);
    const fits = [{...best,x0:0,x1:2,label:"best fit"}];
    if (worst) fits.push({...worst,x0:0,x1:2,label:"worst acceptable",dash:[6,4],col:LAB.css("--data")});
    LAB.plot(document.getElementById("mu-graph"), {x:{label:"x / arbitrary units",min:0,max:2},y:{label:"y / arbitrary units",min:-1.5,max:3.5},series:[{pts:points,ey:errors,col:LAB.css("--accent")}],fits,legend:"left"});
    document.getElementById("mu-graph-result").textContent = worst ? `Best gradient ${best.m.toFixed(3)}; worst acceptable gradient ${worst.m.toFixed(3)}; absolute gradient uncertainty ${worst.dm.toFixed(3)}. Both lines are assessed against every error bar.` : "No single straight line crosses all these error bars. Check the middle reading and its uncertainty; no worst-fit uncertainty is reported.";
  }
  ["mu-tight","mu-anomaly"].forEach(id => document.getElementById(id).addEventListener("change",drawGraph));

  add("mu5", 5, "u", "Planning practicals and reporting results",
    "A strong practical answer links each measurement and improvement to the quantity being determined. Explain what you will change, measure and control, then how the data test the model.",
    ["Identify independent, dependent and control variables", "Plan measurements over a suitable range with repeats and relevant safety steps", "Present tables and evaluate a result using its uncertainty"], [
      B.text("Plan a method that can answer the question", '<ol><li>State the relationship you will test and identify what to change (independent variable) and measure (dependent variable).</li><li>Describe the apparatus, arrangement and how each quantity is measured, including units and instruments.</li><li>Choose a suitable range and enough distinct values to establish the trend; repeat measurements.</li><li>Control relevant variables and explain how. For a wire’s resistance against length, keep the wire material, diameter and temperature constant.</li><li>Address a specific hazard with a practical precaution: for example, limit current and switch off between readings to prevent wire heating.</li><li>Explain the graph, expected shape, gradient and how the requested constant will be obtained.</li></ol>'),
      B.text("Tables and evaluation", '<p>Put the quantity and unit in each table heading, such as length L / m. Record raw readings, repeats and calculated means clearly. Keep an appropriate, consistent precision for readings from the same instrument.</p><p>Evaluate with evidence: discuss the uncertainty that matters most, any non-zero intercept, a justified anomaly and whether the accepted value falls within the estimated interval. Suggest a specific improvement and explain the effect: timing 20 oscillations gives a longer measured interval, reducing the percentage effect of reaction time.</p><p>Virtual practicals support understanding and exam preparation. Practical Endorsement evidence comes from the required teacher-assessed practical work.</p>'),
      B.example("Testing the resistance of a wire", "Describe how a graph can be used to determine the resistivity of a wire.", [
        ["Measure resistance at several lengths", "Control heating, material and cross-sectional area.", ["Measure V across, and I through, each test length; calculate R = V/I."]],
        ["Measure the diameter", "Repeat at several positions and orientations using a micrometer.", ["Calculate A = πd²/4."]],
        ["Use a graph", "R = (ρ/A)L.", ["Plot R against L; gradient = ρ/A, so ρ = gradient × A."]],
        ["Evaluate", "", ["Use error bars and worst acceptable gradients; include the area uncertainty. Investigate an intercept that could represent contact/lead resistance."]]
      ]),
      B.check([
        {q:"When investigating resistance against wire length, which variable should be controlled?",opts:["Wire length","Resistance","Temperature of the wire","The plotted gradient"],a:2,why:"Heating changes resistivity, so temperature should be kept as constant as practicable."},
        {q:"Which is an appropriate table heading?",opts:["Length (with m written in every cell)","L / m","L + m","Numbers"],a:1,why:"A heading identifies the quantity and unit; the entries contain the numerical readings."},
        {q:"A result is (9.7 ± 0.3) m s⁻². Is the accepted value 9.81 m s⁻² within this interval?",opts:["Yes: 9.4 to 10.0 includes 9.81","No: the central values differ","Only if they have identical digits","Uncertainty cannot be used for comparisons"],a:0,why:"The accepted value lies within the estimated interval, so it is consistent with the result at this uncertainty."},
        {q:"Which improvement directly reduces the percentage effect of stopwatch reaction time?",opts:["Write more decimal places","Time one oscillation instead of twenty","Time twenty complete oscillations and divide by twenty","Use a smaller graph"],a:2,why:"The measured interval becomes larger while the start/stop reaction uncertainty is similar."}
      ]), source
    ]);

  const secA = [
    {tag:"mu1",q:"Which is an SI base unit?",opts:["newton","joule","ampere","volt"],a:2,why:"The ampere is a base unit; the others are derived."},
    {tag:"mu1",q:"What is 4.0 cm² in m²?",opts:["4.0 × 10⁻²","4.0 × 10⁻⁴","4.0 × 10⁻⁶","4.0 × 10⁴"],a:1,why:"Square the length conversion: 4.0 × (10⁻²)²."},
    {tag:"mu1",q:"How many significant figures are in 0.0300?",opts:["1","2","3","4"],a:2,why:"3 and the two trailing zeros are significant."},
    {tag:"mu2",q:"Which action addresses a systematic zero error?",opts:["Repeat and average only","Correct the measured offset","Use more decimal places","Use fewer readings"],a:1,why:"A known zero offset should be corrected."},
    {tag:"mu2",q:"Three readings are 4.8 s, 5.0 s and 5.2 s. What is the half-range uncertainty?",opts:["0.1 s","0.2 s","0.4 s","5.0 s"],a:1,why:"(5.2 − 4.8)/2 = 0.2 s."},
    {tag:"mu3",q:"A radius has 3% uncertainty. What is the percentage uncertainty in the volume of a sphere?",opts:["1%","3%","6%","9%"],a:3,why:"V ∝ r³, so multiply by 3."},
    {tag:"mu3",q:"What is the uncertainty in the difference of (10.0 ± 0.1) cm and (8.0 ± 0.1) cm?",opts:["0 cm","0.1 cm","0.2 cm","2.0 cm"],a:2,why:"Add absolute uncertainties for a difference."},
    {tag:"mu4",q:"A worst acceptable straight line must…",opts:["pass through the origin","join every reading","intersect every error bar","use only the first and last bars"],a:2,why:"Intermediate error bars constrain the line too."},
    {tag:"mu4",q:"For T² = (4π²/k)m, the gradient of T² against m equals…",opts:["k","1/k","4π²/k","k/4π²"],a:2,why:"Compare with y = gradient × x."},
    {tag:"mu5",q:"Why measure a wire diameter at different positions and orientations?",opts:["To remove all uncertainty","To detect variation and estimate a representative diameter","To make the wire longer","To eliminate the need to measure length"],a:1,why:"A wire may not be perfectly uniform or circular."}
  ];
  const secB = [
    {stem:"<p>A student measures the diameter of a wire as (0.50 ± 0.01) mm and its length as (1.20 ± 0.01) m.</p>",parts:[
      {tag:"mu1",q:"Calculate the cross-sectional area of the wire in m².",m:2,ans:{a:1.9635e-7,unit:"m²"},ms:[["C1","A = πd²/4 with d = 0.50 × 10⁻³ m"],["A1","A = 2.0 × 10⁻⁷ m² (unrounded 1.96 × 10⁻⁷ m²)"]]},
      {tag:"mu3",q:"Calculate the percentage uncertainty in the cross-sectional area.",m:2,ans:{a:4,unit:"%"},ms:[["C1","Percentage diameter uncertainty = 0.01/0.50 × 100 = 2%"],["A1","Area ∝ diameter², so percentage area uncertainty = 4%"]]},
      {tag:"mu3",q:"The measured resistance is (6.0 ± 0.1) Ω. Calculate the percentage uncertainty in the resistivity ρ = RA/L.",m:3,ans:{a:6.5,unit:"%"},ms:[["C1","Resistance uncertainty = 0.1/6.0 × 100 = 1.67%"],["C1","Length uncertainty = 0.01/1.20 × 100 = 0.83%"],["A1","Add 1.67 + 4 + 0.83 = 6.5%"]]}
    ]},
    {stem:"<p>The times for 20 complete oscillations are 31.2 s, 31.6 s and 31.4 s.</p>",parts:[
      {tag:"mu2",q:"Calculate the mean period.",m:2,ans:{a:1.57,unit:"s"},ms:[["C1","Mean total time = 31.4 s"],["A1","T = 31.4/20 = 1.57 s"]]},
      {tag:"mu2",q:"Use half the range to estimate the absolute uncertainty in the period.",m:2,ans:{a:.01,unit:"s"},ms:[["C1","Total time uncertainty = (31.6 − 31.2)/2 = 0.2 s"],["A1","Period uncertainty = 0.2/20 = 0.01 s"]]},
      {tag:"mu2",q:"Explain why averaging these times will not remove an uncorrected systematic timing error.",m:1,ms:[["B1","A systematic error biases all readings consistently, so averaging does not remove the bias"]]}
    ]},
    {stem:"<p>A graph of height h against time squared t² has best-fit gradient 4.86 m s⁻² and worst acceptable gradient 5.02 m s⁻². The model is h = ½gt².</p>",parts:[
      {tag:"mu4",q:"Calculate g from the best-fit gradient.",m:2,ans:{a:9.72,unit:"m s⁻²"},ms:[["C1","Gradient = g/2"],["A1","g = 2 × 4.86 = 9.72 m s⁻²"]]},
      {tag:"mu4",q:"Calculate the absolute uncertainty in g.",m:2,ans:{a:.32,unit:"m s⁻²",tol:.1},ms:[["C1","Gradient uncertainty = |5.02 − 4.86| = 0.16 m s⁻²"],["A1","Δg = 2 × 0.16 = 0.32 m s⁻² (about 0.3 m s⁻²)"]]},
      {tag:"mu4",q:"A proposed worst-fit line crosses the first and last error bars but misses a middle bar. Explain whether it is acceptable.",m:1,ms:[["B1","It is not acceptable: a worst acceptable straight line must intersect every error bar"]]}
    ]},
    {stem:"<p>A student wants to investigate how the period of a mass–spring oscillator depends on mass, using T = 2π√(m/k).</p>",parts:[
      {tag:"mu5",q:"Describe the measurements, accuracy steps and graph analysis needed to test the relationship and determine k. Include one relevant safety precaution.",m:6,lines:12,lor:[["Level 3 (5–6)","A clear workable method over a range of masses, accurate measurement of period, correct linear graph and extraction of k, with a relevant safety precaution. Logical and sufficiently detailed."],["Level 2 (3–4)","A workable method with some accuracy steps and graph analysis, but important details are missing."],["Level 1 (1–2)","Some relevant apparatus, measurements or analysis, with limited detail."]],ind:["Clamp a spring securely; add known masses including the hanger","Use a range of masses within the spring’s elastic limit","Use small vertical oscillations and a fixed reference marker","Time 10 or 20 complete oscillations; repeat, average and divide by the count","Plot T² against total suspended mass m","A straight line supports T² ∝ m; gradient = 4π²/k, so k = 4π²/gradient","Secure or weight the stand and keep clear of falling masses; do not overload the spring"]}
    ]}
  ];
  EXAM.paper({id:"mu6",num:6,mins:40,secA,secB,group:"r",name:"Mixed exam practice: measurements and uncertainties",lvl:"Modules 1–2 · Revision",
    eyebrow:"OCR A Level Physics A · Measurements and uncertainties · Exam practice",title:"Mixed exam practice: measurements and uncertainties",
    note:"Answer all questions. Show your working, units and uncertainty calculations. Use the stated instrument uncertainties and half-range convention where requested.",
    intro:"Practise units, measurement errors, uncertainty propagation, graph analysis and experimental planning. Mark your work against the schemes and use the summary to revisit the relevant lessons."});
  LEARN.unit = previousUnit;
})();
