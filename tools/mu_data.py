"""Data sets behind the Measurements (mu1-mu5) worked examples and questions.
Run: python3 tools/mu_data.py   Every quoted gradient, intercept and uncertainty in depth-mu.js comes from here."""
import numpy as np
np.set_printoptions(suppress=True)
def fit(x, y):
    x, y = np.array(x, float), np.array(y, float)
    (m, c), cov = np.polyfit(x, y, 1, cov=True)
    return m, c, np.sqrt(cov[0, 0]), np.sqrt(cov[1, 1])
def show(name, **kw):
    print('\n== ' + name); [print(f'  {k} = {v}') for k, v in kw.items()]

# A: pendulum, T^2 against L (times for 10 oscillations, stopwatch)
L = [0.300, 0.500, 0.700, 0.900, 1.100]
t10 = [11.0, 14.3, 16.7, 19.1, 21.0]
T = [t / 10 for t in t10]; T2 = [round(t * t, 2) for t in T]
dT2 = [round(2 * 0.2 / t * t2, 2) for t, t2 in zip(t10, T2)]          # +-0.2 s on each 10T
m, c, sm, sc = fit(L, T2)
worst = ((T2[-1] - dT2[-1]) - (T2[0] + dT2[0])) / (L[-1] - L[0])       # shallowest line through the end error bars
show('A pendulum', T=T, T2=T2, dT2=dT2, gradient=m, intercept=c, se_gradient=sm, g=4 * np.pi**2 / m,
     worst_gradient=worst, pc=abs(m - worst) / m * 100, g_unc=4 * np.pi**2 / m * abs(m - worst) / m)

# B: capacitor discharge, ln V against t
t = [0, 10, 20, 30, 40, 50]
V = [9.00, 7.35, 6.10, 4.95, 4.10, 3.30]
lnV = [round(float(np.log(v)), 3) for v in V]
m, c, sm, sc = fit(t, lnV)
show('B discharge', lnV=lnV, gradient=m, intercept=c, se=sm, RC=-1 / m, V0=np.exp(c), C_uF=-1 / m / 22e3 * 1e6)

# C: light intensity against distance from a small lamp, lg I against lg d
d = [0.20, 0.30, 0.40, 0.60, 0.80]
I = [48.0, 21.8, 12.1, 5.2, 3.1]
lgd = [round(float(np.log10(x)), 3) for x in d]; lgI = [round(float(np.log10(x)), 3) for x in I]
m, c, sm, sc = fit(lgd, lgI)
show('C inverse square', lgd=lgd, lgI=lgI, n=m, lgk=c, k=10**c, se=sm)

# D: resistance of constantan wire against length
l = [0.200, 0.400, 0.600, 0.800, 1.000]
R = [1.75, 3.42, 5.20, 6.85, 8.60]
m, c, sm, sc = fit(l, R)
dia = [0.27, 0.28, 0.27, 0.26, 0.27]; dm = np.mean(dia); A = np.pi * (dm * 1e-3)**2 / 4
show('D resistivity', gradient=m, intercept=c, se=sm, d_mean=dm, half_range=(max(dia) - min(dia)) / 2, A=A, rho=m * A,
     pc_d=0.01 / dm * 100, pc_A=2 * 0.01 / dm * 100, pc_grad=sm / m * 100)

# E: spring constant, F against x (Hooke's law), with a worst line
x = [0.020, 0.041, 0.059, 0.082, 0.100]     # m
F = [1.0, 2.0, 3.0, 4.0, 5.0]               # N
m, c, sm, sc = fit(x, F)
show('E spring', k=m, intercept=c, se=sm)

# F: repeat readings of a ball-bearing diameter with a micrometer (mm)
dd = [6.34, 6.36, 6.35, 6.33, 6.37]
show('F repeats', mean=np.mean(dd), half_range=(max(dd) - min(dd)) / 2, pc=(max(dd) - min(dd)) / 2 / np.mean(dd) * 100,
     V_mm3=np.pi * np.mean(dd)**3 / 6, pc_V=3 * (max(dd) - min(dd)) / 2 / np.mean(dd) * 100)
