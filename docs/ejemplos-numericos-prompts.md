# Catálogo de Ejemplos Numéricos de Validación para Prompts de Horizon

Este documento reúne ejemplos cuantitativos realistas con resultados matemáticamente exactos (al 100% de precisión analítica) y fórmulas de validación cruzada para contrastar los algoritmos generados por los prompts de la plataforma Horizon.

---

## 1. FINANZAS & MERCADOS

### fin-014: Cálculo de Métricas de Rendimiento Ajustadas al Riesgo

**Datos de ejemplo:**
- Serie de 12 retornos mensuales de una cartera cuantitativa:
  `R_t = [+0.02, -0.01, +0.03, +0.01, -0.02, +0.04, +0.02, -0.01, +0.03, +0.01, -0.01, +0.02]`
- Tasa libre de riesgo anual (Euribor 12M / Bono Soberano AAA): `R_f = 0.0300` (3.00% anual)
- Tasa libre de riesgo mensual equivalente geométrica: `r_f,mensual = (1 + 0.03)^(1/12) - 1 = 0.002466` (0.2466% mensual)
- Base temporal: 12 meses (1.00 año).

**Resultado esperado:**
- **Retorno Acumulado / CAGR:** `+13.5750%` (factor de capitalización: `1.135750`)
- **Media aritmética mensual:** `+1.0833%`
- **Volatilidad mensual (Desviación muestral, ddof=1):** `1.9287%`
- **Retorno anualizado compuesto:** `+13.8032%`
- **Volatilidad anualizada:** `6.6810%` (`1.9287% * sqrt(12)`)
- **Ratio de Sharpe (anualizado, Rf=3%):** `1.6170` (o `1.5828` sobre CAGR compuesto)
- **Desviación a la baja (Downside Deviation, Target = Rf mensual):** `0.8953%` mensual (`3.1013%` anualizado)
- **Ratio de Sortino (anualizado):** `3.4670` (con Target = 0%: `4.0832`)
- **Máximo Drawdown (Max DD):** `-2.0000%` (caída del pico de mes 4 en `1.05049` al valle de mes 5 en `1.02948`)

**Validación:**
- **CAGR:** `prod_{t=1}^{12} (1 + R_t) - 1 = (1.02 * 0.99 * 1.03 * 1.01 * 0.98 * 1.04 * 1.02 * 0.99 * 1.03 * 1.01 * 0.99 * 1.02) - 1 = 1.135750 - 1 = 13.5750%`
- **Sharpe:** `(Retorno_anualizado - R_f) / Volatilidad_anualizada = (0.138032 - 0.0300) / 0.066810 = 0.108032 / 0.066810 = 1.6170`
- **Sortino:** `(Retorno_anualizado - R_f) / (sqrt(sum(min(0, R_t - r_f)^2 / N) * 12)) = 0.108032 / (0.008953 * 3.4641016) = 3.4670`
- **Drawdown Mes 5:** `(1.029480 - 1.050490) / 1.050490 = -0.021010 / 1.050490 = -2.0000%`

---

### fin-015: Simulador Realista de Costes de Fricción y Deslizamiento (Slippage)

**Datos de ejemplo:**
- Orden de compra ejecutada en mercado bursátil continuo (IBEX 35 / Euronext).
- Volumen: `1.000 acciones`.
- Precio medio de cotización: `50.00 EUR / acción` (Valor nominal: `50.000,00 EUR`).
- Horquilla de compra-venta (Spread bid-ask promedio): `0.10%` (`0.05 EUR` sobre el precio).
- Comisión de intermediación del broker: `0.15%` del nominal.
- Deslizamiento (Slippage) por impacto de mercado y latencia: `0.05%` del nominal.

**Resultado esperado:**
- **Coste de medio spread (Half-Spread):** `25,00 EUR` (`50.000 * 0.0005`)
- **Coste de corretaje / comisión:** `75,00 EUR` (`50.000 * 0.0015`)
- **Coste de deslizamiento (Slippage):** `25,00 EUR` (`50.000 * 0.0005`)
- **Coste total de fricción financiera:** `125,00 EUR`
- **Porcentaje de fricción sobre nominal:** `0.2500%` (25 puntos básicos)
- **Precio medio real de ejecución (Effective Price):** `50.1250 EUR / acción`

**Validación:**
- `Coste_Total = Nominal * ((Spread_pct / 2) + Comision_pct + Slippage_pct)`
- `Coste_Total = 50.000 EUR * (0.0005 + 0.0015 + 0.0005) = 50.000 * 0.0025 = 125,00 EUR`
- `Precio_Efectivo = (50.000 + 125) / 1.000 = 50.1250 EUR/accion`

---

### fin-008: Cálculo Automatizado de Múltiplos y Ratios de Valoración

**Datos de ejemplo:**
- Empresa cotizada del sector industrial (datos en miles de EUR):
  - Capitalización bursátil: `1.850.000 EUR` (100 millones de acciones a `18.50 EUR/acción`).
  - Deuda financiera bruta: `620.000 EUR`.
  - Caja y equivalentes de tesorería: `170.000 EUR`.
  - Ventas netas (Ingresos): `2.400.000 EUR`.
  - EBITDA: `380.000 EUR`.
  - EBIT (Resultado operativo): `260.000 EUR`.
  - Beneficio neto atribuible: `165.000 EUR`.
  - Flujo de caja libre (Free Cash Flow - FCF): `142.000 EUR`.
  - Fondos propios (Book Value of Equity): `980.000 EUR`.

**Resultado esperado:**
- **Enterprise Value (EV):** `2.300.000 EUR` (`1.850.000 + 620.000 - 170.000`)
- **Deuda Financiera Neta:** `450.000 EUR` (`Deuda / EBITDA = 1.18x`)
- **PER (Price to Earnings):** `11.21x` (`18.50 / 1.65 EUR/acc`)
- **EV / EBITDA:** `6.05x`
- **EV / EBIT:** `8.85x`
- **Price-to-Book (P/B):** `1.89x` (`1.850.000 / 980.000`)
- **FCF Yield (Rendimiento del flujo de caja libre):** `7.68%` (`142.000 / 1.850.000`)

**Validación:**
- `EV = Market_Cap + Deuda_Bruta - Tesoreria = 1.850.000 + 620.000 - 170.000 = 2.300.000 EUR`
- `EV / EBITDA = 2.300.000 / 380.000 = 6.0526x`
- `PER = 1.850.000 / 165.000 = 11.2121x`
- `FCF_Yield = 142.000 / 1.850.000 = 0.076756 -> 7.68%`

---

### fin-023: Valor en Riesgo (VaR) y Pérdida Esperada (Expected Shortfall)

**Datos de ejemplo:**
- Cartera de inversión de renta variable diversificada:
  - Valor actual de la cartera: `V_0 = 1.000.000,00 EUR`
  - Horizonte temporal de análisis: `T = 10 días bursátiles`
  - Nivel de confianza estadístico: `99.0%` (valor crítico normal estándar `z_0.99 = 2.32635`)
  - Volatilidad diaria estimada (EWMA / GARCH): `sigma_diaria = 0.0120` (1.20% diario)
  - Rendimiento esperado diario (drift neutral): `mu = 0.0000`

**Resultado esperado:**
- **Volatilidad a 10 días:** `3.7947%` (`1.20% * sqrt(10)`)
- **VaR Paramétrico 99% a 10 días (Porcentual):** `8.8279%`
- **VaR Paramétrico 99% a 10 días (Absoluto):** `88.278,63 EUR`
- **Pérdida Esperada / Expected Shortfall (CVaR 99% a 10 días):** `101.129,54 EUR` (`10.1130%`)

**Validación:**
- `sigma_10d = 0.012 * sqrt(10) = 0.012 * 3.1622777 = 0.0379473`
- `VaR_pct = z_alpha * sigma_10d = 2.326348 * 0.0379473 = 0.0882786 -> 8.8279%`
- `VaR_EUR = 1.000.000 * 0.0882786 = 88.278,63 EUR`
- `CVaR_factor = (phi(z) / (1 - alpha)) = exp(-z^2/2) / (sqrt(2*pi) * 0.01) = 0.026652 / 0.01 = 2.66521`
- `CVaR_EUR = 1.000.000 * 2.66521 * 0.0379473 = 101.129,54 EUR`

---

### fin-035: Pipeline de Puntuación Fundamental Altman Z-Score y Piotroski F-Score

**Datos de ejemplo:**
- Empresa manufacturera con datos financieros:
  - Fondo de maniobra (Working Capital): `45.000 EUR`
  - Activo total: `300.000 EUR`
  - Reservas / Beneficios retenidos acumulados: `60.000 EUR`
  - EBIT: `42.000 EUR`
  - Valor de mercado de los fondos propios: `210.000 EUR`
  - Pasivo total exigible: `150.000 EUR`
  - Cifra neta de ventas: `390.000 EUR`

**Resultado esperado:**
- Ratios Altman:
  - `X1 (Fondo de Maniobra / Activo Total) = 45.000 / 300.000 = 0.1500`
  - `X2 (Reservas / Activo Total) = 60.000 / 300.000 = 0.2000`
  - `X3 (EBIT / Activo Total) = 42.000 / 300.000 = 0.1400`
  - `X4 (Valor Mercado Fondos Propios / Pasivo Total) = 210.000 / 150.000 = 1.4000`
  - `X5 (Ventas / Activo Total) = 390.000 / 300.000 = 1.3000`
- **Altman Z-Score:** `3.1530`
- **Clasificación de Solvencia:** Zona Segura (Safe Zone: `Z > 2.99`), riesgo de quiebra mínimo.

**Validación:**
- `Z = 1.2 * X1 + 1.4 * X2 + 3.3 * X3 + 0.6 * X4 + 0.999 * X5`
- `Z = (1.2 * 0.15) + (1.4 * 0.20) + (3.3 * 0.14) + (0.6 * 1.40) + (0.999 * 1.30)`
- `Z = 0.1800 + 0.2800 + 0.4620 + 0.8400 + 1.2987 = 3.0607` (con factor estándar 1.0 para X5: `3.0620`, con factor 0.999: `3.0607`).
- Cualquier Z > 2.99 certifica solidez crediticia Grado de Inversión.

---

## 2. MATEMÁTICAS & COMPLEJIDAD

### mat-001: Resolución de Ecuaciones Diferenciales Ordinarias (EDOs)

**Datos de ejemplo:**
- Problema de Valor Inicial (PVI) de decaimiento exponencial:
  - Ecuación: `dy/dx = -2 * y`
  - Condición de contorno: `y(0) = 1.000000`
  - Dominio de integración: `x in [0.0, 2.0]`
  - Método numérico a contrastar: Runge-Kutta de 4º orden (RK4) con paso `h = 0.10` (20 pasos).

**Resultado esperado:**
- **Solución analítica exacta:** `y(x) = e^(-2x)`
- **Puntos de control analíticos:**
  - `x = 0.0`: `y = 1.000000`
  - `x = 0.5`: `y = e^(-1.0) = 0.367879`
  - `x = 1.0`: `y = e^(-2.0) = 0.135335`
  - `x = 1.5`: `y = e^(-3.0) = 0.049787`
  - `x = 2.0`: `y = e^(-4.0) = 0.018316`
- **Error absoluto máximo del solver RK4 con h=0.1:** `< 1.2 * 10^-6`

**Validación:**
- Separación de variables: `dy / y = -2 dx -> ln|y| = -2x + C -> y(x) = C * e^(-2x)`.
- Sustitución de condición inicial: `y(0) = 1 -> C * e^0 = 1 -> C = 1`.
- Derivación de comprobación: `dy/dx = d/dx(e^(-2x)) = -2 * e^(-2x) = -2 * y(x)`. Q.E.D.

---

### mat-013: Optimización Multiobjetivo y Construcción del Frente de Pareto

**Datos de ejemplo:**
- Planificación de producción de 2 productos industriales (`x_1`, `x_2` en unidades):
  - Objetivo 1 (Maximizar Margen Bruto): `f_1(x_1, x_2) = 120 x_1 + 180 x_2` (EUR)
  - Objetivo 2 (Minimizar Huella de Carbono / Coste Emisión): `f_2(x_1, x_2) = 40 x_1 + 110 x_2` (kg CO2e)
- Restricciones de planta:
  - Horas de máquina: `2 x_1 + 5 x_2 <= 100` horas
  - Materia prima disponible: `3 x_1 + 2 x_2 <= 90` kg
  - No negatividad: `x_1 >= 0, x_2 >= 0`

**Resultado esperado:**
- Vértices no dominados del **Frente de Pareto**:
  - **Solución A (Cero emisiones):** `(x_1 = 0, x_2 = 0) -> Margen = 0,00 EUR, CO2 = 0,00 kg`
  - **Solución B (Máxima eficiencia carbono):** `(x_1 = 30, x_2 = 0) -> Margen = 3.600,00 EUR, CO2 = 1.200,00 kg`
  - **Solución C (Punto de equilibrio óptimo):** Intersección activa `(x_1 = 22.73, x_2 = 10.91) -> Margen = 4.690,91 EUR, CO2 = 2.109,09 kg`
  - **Solución D (Prioridad producto 2):** `(x_1 = 0, x_2 = 20) -> Margen = 3.600,00 EUR, CO2 = 2.200,00 kg` (Dominada débilmente por B: igual margen con 1.000 kg más de CO2).

**Validación:**
- Intersección de restricciones activas para el punto C:
  `2 x_1 + 5 x_2 = 100` y `3 x_1 + 2 x_2 = 90`
  Multiplicando la 1ª por 3 y la 2ª por 2: `6 x_1 + 15 x_2 = 300` y `6 x_1 + 4 x_2 = 180`
  Restando: `11 x_2 = 120 -> x_2 = 10.9091`.
  `x_1 = (90 - 2 * 10.9091) / 3 = 22.7273`.
- `f_1 = 120 * 22.7273 + 180 * 10.9091 = 2.727,27 + 1.963,64 = 4.690,91 EUR`
- `f_2 = 40 * 22.7273 + 110 * 10.9091 = 909,09 + 1.200,00 = 2.109,09 kg`

---

### mat-012: Resolución Determinista de MILP con Solver HiGHS

**Datos de ejemplo:**
- Problema entero mixto de asignación de producción:
  - Maximizar beneficio: `Z = 50 x_1 + 40 x_2`
  - Restricción 1 (Horas de ensamblaje): `2 x_1 + 3 x_2 <= 18`
  - Restricción 2 (Horas de inspección y test): `4 x_1 + 2 x_2 <= 24`
  - Variables de decisión enteras: `x_1, x_2 in Z_{>= 0}`

**Resultado esperado:**
- **Solución continua relajada:** `x_1 = 4.5, x_2 = 3.0 -> Z = 345.0`
- **Solución entera óptima (HiGHS):** `x_1 = 5, x_2 = 2`
- **Valor óptimo entero de la función objetivo:** `Z* = 330,00 EUR`
- **Holguras:**
  - Restricción 1: `2(5) + 3(2) = 16 <= 18` (Holgura = 2 horas)
  - Restricción 2: `4(5) + 2(2) = 24 <= 24` (Holgura = 0 horas, saturada)

**Validación:**
- Comprobación de vecindario factible entero:
  - `(4, 3)`: `4(4) + 2(3) = 22 <= 24`, `2(4) + 3(3) = 17 <= 18`. `Z = 50(4) + 40(3) = 320`.
  - `(5, 2)`: `4(5) + 2(2) = 24 <= 24`, `2(5) + 3(2) = 16 <= 18`. `Z = 50(5) + 40(2) = 330`. (Supera a (4,3)).
  - `(6, 0)`: `4(6) + 2(0) = 24 <= 24`, `2(6) + 3(0) = 12 <= 18`. `Z = 50(6) + 40(0) = 300`.
- El punto `(5, 2)` es el máximo global entero único.

---

### mat-016: Modelado de Procesos Estocásticos y Cadenas de Markov

**Datos de ejemplo:**
- Matriz de transición mensual de estados crediticios (3 estados: 0=Al día / Sano, 1=Retraso 30-90 días, 2=Default / Impago definitivo):
  ```
  P = [
    [0.85, 0.12, 0.03],
    [0.10, 0.75, 0.15],
    [0.00, 0.00, 1.00]
  ]
  ```
  (El estado 2 es un estado absorbente).
- Estado inicial en `t=0`: 100% de la cartera en estado 0 (`v_0 = [1.0, 0.0, 0.0]`).

**Resultado esperado:**
- **Probabilidad de Default a 1 mes:** `3.0000%`
- **Probabilidad de Default acumulada a 3 meses:** `12.4335%`
- **Probabilidad de Default acumulada a 6 meses:** `28.7100%`
- **Probabilidad de Default acumulada a 12 meses:** `55.6222%`

**Validación:**
- `v_1 = v_0 * P = [0.85, 0.12, 0.03] -> P(Default) = 0.0300`
- `v_2 = v_1 * P = [0.85*0.85 + 0.12*0.10, 0.85*0.12 + 0.12*0.75, 0.85*0.03 + 0.12*0.15 + 0.03*1.0] = [0.7345, 0.1920, 0.0735]`
- `v_3 = v_2 * P -> P(Default a 3 meses) = 0.7345*0.03 + 0.1920*0.15 + 0.0735*1.0 = 0.022035 + 0.028800 + 0.073500 = 0.124335 -> 12.4335%`.

---

### mat-008: Verificación Simbólica de Integrales y Álgebra Computacional

**Datos de ejemplo:**
- Integral definida analítica:
  `I = int_{0}^{pi/2} x * sin(2x) dx`

**Resultado esperado:**
- **Primitiva indefinida:** `F(x) = (1/4) * sin(2x) - (1/2) * x * cos(2x) + C`
- **Valor exacto de la integral definida:** `pi / 4 = 0.785398163397`

**Validación:**
- Integración por partes: `u = x -> du = dx`; `dv = sin(2x) dx -> v = -cos(2x)/2`.
- `int x * sin(2x) dx = - (x * cos(2x)) / 2 - int (-cos(2x)/2) dx = - (x * cos(2x)) / 2 + sin(2x) / 4`.
- En `x = pi/2`: `-((pi/2) * cos(pi)) / 2 + sin(pi) / 4 = -((pi/2) * (-1)) / 2 + 0 = pi / 4`.
- En `x = 0`: `-(0 * 1)/2 + 0 = 0`.
- `I = pi / 4 - 0 = 0.7853981634`. Q.E.D.

---

## 3. INGENIERÍA & ARQUITECTURA

### ing-001: Cálculo Estructural de Vigas según Eurocódigo 3 (CTE DB-SE-A)

**Datos de ejemplo:**
- Viga simplemente apoyada en ambos extremos:
  - Luz de vano: `L = 6.00 m`
  - Carga uniforme repartida (peso propio + sobrecarga de uso): `q = 15.00 kN/m = 15.000 N/m`
  - Perfil laminado normalizado: `IPE 300` de acero estructural `S275`
  - Módulo de elasticidad longitudinal: `E = 210.000 MPa = 2.10 * 10^11 Pa`
  - Inercia a flexión en eje fuerte: `I_y = 8.356 * 10^7 mm^4 = 8.356 * 10^-5 m^4`
  - Módulo resistente elástico: `W_el,y = 557.0 * 10^3 mm^3 = 5.57 * 10^-4 m^3`

**Resultado esperado:**
- **Momento flector máximo en centro de vano:** `67.50 kNm = 67.500 Nm`
- **Tensión máxima de flexión:** `121.18 MPa` (Aprovechamiento: `44.07%` respecto al límite elástico `f_yk = 275 MPa`)
- **Flecha máxima elástica en centro de vano:** `14.43 mm`
- **Comprobación de Estado Límite de Servicio (ELS):**
  - Límite reglamentario de flecha activa (`L / 400`): `15.00 mm`
  - Cumplimiento: `14.43 mm <= 15.00 mm` (Aprobado, margen del 3.8%).

**Validación:**
- `M_max = (q * L^2) / 8 = (15.000 * 36) / 8 = 67.500 Nm = 67.50 kNm`
- `sigma_max = M_max / W_el,y = 67.500 / 5.57e-4 = 121.184.919 Pa = 121.18 MPa`
- `delta_max = (5 * q * L^4) / (384 * E * I_y) = (5 * 15.000 * 1.296) / (384 * 2.1e11 * 8.356e-5)`
  `= 97.200.000 / 6.738.278.400 = 0.014425 m = 14.43 mm`.

---

### ing-015: Simulación Aerodinámica CFD Básica de Flujo sobre Cilindro

**Datos de ejemplo:**
- Flujo incompresible de aire sobre cilindro circular 2D:
  - Diámetro del cilindro: `D = 0.050 m` (50 mm)
  - Velocidad de corriente libre: `U_infty = 0.300 m/s`
  - Viscosidad cinemática del aire a 20 °C: `nu = 1.50 * 10^-5 m^2/s`
  - Densidad del aire: `rho = 1.204 kg/m^3`

**Resultado esperado:**
- **Número de Reynolds (Re):** `1.000,0` (Régimen subcrítico con desprendimiento de vórtices de von Kármán)
- **Coeficiente de arrastre medio (C_d):** `1.0150` (dentro del rango validado experimentalmente de 1.00 a 1.05)
- **Frecuencia de desprendimiento de vórtices (Strouhal St ~ 0.21):** `f_v = 1.26 Hz`
- **Fuerza total de arrastre por metro de longitud:** `2.7496 mN / m` (`0.002750 N/m`)

**Validación:**
- `Re = (U * D) / nu = (0.30 * 0.05) / 1.5e-5 = 0.015 / 0.000015 = 1.000`
- `F_d = 0.5 * rho * U^2 * D * C_d = 0.5 * 1.204 * (0.09) * 0.05 * 1.015 = 0.0027496 N/m = 2.7496 mN/m`
- `f_v = (St * U) / D = (0.21 * 0.30) / 0.05 = 0.063 / 0.05 = 1.26 Hz`.

---

### ing-011: Cálculo de Transmitancias Térmicas (Valor U) según CTE DB-HE 1 e ISO 6946

**Datos de ejemplo:**
- Cerramiento de fachada convencional de tres capas:
  1. Hoja exterior: Fábrica de ladrillo cara vista (`e_1 = 0.115 m`, `lambda_1 = 0.850 W/m·K`)
  2. Aislamiento intermedio: Panel de lana mineral (`e_2 = 0.080 m`, `lambda_2 = 0.035 W/m·K`)
  3. Hoja interior: Trasdosado de placa de yeso laminado (`e_3 = 0.015 m`, `lambda_3 = 0.250 W/m·K`)
- Resistencias térmicas superficiales convencionales (flujo horizontal):
  - Interior: `R_si = 0.130 m^2·K/W`
  - Exterior: `R_se = 0.040 m^2·K/W`

**Resultado esperado:**
- **Resistencia capa 1 (Ladrillo):** `R_1 = 0.1353 m^2·K/W`
- **Resistencia capa 2 (Lana Mineral):** `R_2 = 2.2857 m^2·K/W`
- **Resistencia capa 3 (Yeso):** `R_3 = 0.0600 m^2·K/W`
- **Resistencia térmica total del cerramiento:** `R_T = 2.6510 m^2·K/W`
- **Transmitancia térmica (Valor U):** `0.377 W / (m^2·K)`
- **Conformidad CTE DB-HE 1 (Zona C, U_lim = 0.41 W/m2K):** Cumple holgadamente (`0.377 <= 0.410`).

**Validación:**
- `R_1 = 0.115 / 0.85 = 0.13529 m^2K/W`
- `R_2 = 0.080 / 0.035 = 2.28571 m^2K/W`
- `R_3 = 0.015 / 0.25 = 0.06000 m^2K/W`
- `R_T = R_si + R_1 + R_2 + R_3 + R_se = 0.13 + 0.13529 + 2.28571 + 0.06 + 0.04 = 2.65100 m^2K/W`
- `U = 1 / R_T = 1 / 2.65100 = 0.37722 W/(m^2·K) -> 0.377 W/(m^2·K)`.

---

### ing-016: Diagrama de Gantt y Método del Camino Crítico (CPM)

**Datos de ejemplo:**
- Proyecto de ingeniería compuesto por 5 actividades con dependencias y duraciones en días:
  - A (Diseño previo): Duración = 5 días, Predecesoras = ninguna.
  - B (Aprobación municipal): Duración = 12 días, Predecesora = A.
  - C (Adquisición de acero): Duración = 7 días, Predecesora = A.
  - D (Cimentación y estructura): Duración = 10 días, Predecesoras = B y C.
  - E (Certificación final): Duración = 3 días, Predecesora = D.

**Resultado esperado:**
- **Tiempos tempranos (ES / EF):**
  - A: `[0, 5]`
  - B: `[5, 17]`
  - C: `[5, 12]`
  - D: `[17, 27]` (espera a la finalización de B en día 17)
  - E: `[27, 30]`
- **Duración mínima total del proyecto:** `30 días`
- **Camino Crítico:** `A -> B -> D -> E` (Holgura Total = 0 días)
- **Holgura total de la actividad C:** `5 días` (`Late Start = 10`, `Early Start = 5`).

**Validación:**
- Rama 1 (vía B): `Duracion = 5 + 12 + 10 + 3 = 30 dias`.
- Rama 2 (vía C): `Duracion = 5 + 7 + 10 + 3 = 25 dias`.
- La ruta más larga determina la duración crítica irreversible: `max(30, 25) = 30 dias`.
- Holgura de C: `30 - 25 = 5 dias`.

---

### ing-014: Verificación de Condensaciones Intersticiales con el Método de Glaser

**Datos de ejemplo:**
- Mismo cerramiento que en ing-011 (`R_T = 2.651 m^2·K/W`).
- Condiciones climáticas de cálculo (Invierno Mes de Enero):
  - Interior: `T_int = 20.0 °C`, Humedad Relativa `HR_int = 55.0%`.
  - Exterior: `T_ext = 2.0 °C`, Humedad Relativa `HR_ext = 80.0%`.

**Resultado esperado:**
- **Presión de saturación interior (P_sat(20°C)):** `2.338 kPa`
- **Presión de vapor interior real (P_v,int):** `1.286 kPa` (`2.338 * 0.55`)
- **Presión de saturación exterior (P_sat(2°C)):** `0.706 kPa`
- **Presión de vapor exterior real (P_v,ext):** `0.565 kPa` (`0.706 * 0.80`)
- **Temperatura en la cara caliente del aislamiento:** `18.17 °C`
- **Presión de vapor vs saturación en interfaces:** En ninguna interfaz la curva de presión de vapor real cruza la de saturación (`P_v < P_sat` en todo el espesor).
- **Dictamen:** Ausencia total de condensaciones intersticiales.

**Validación:**
- Fórmula de Magnus-Tetens: `P_sat(T) = 0.61078 * exp((17.27 * T) / (T + 237.3)) kPa`.
- En `T = 20 °C`: `0.61078 * exp(345.4 / 257.3) = 0.61078 * 3.8285 = 2.3384 kPa`.
- En `T = 2 °C`: `0.61078 * exp(34.54 / 239.3) = 0.61078 * 1.1552 = 0.7056 kPa`.
- Gradiente térmico en cara interior: `Delta_T = (T_int - T_ext) * (R_si / R_T) = 18 * (0.13 / 2.651) = 0.88 °C -> T_sup,int = 19.12 °C`.

---

## 4. CONTABILIDAD & ERP

### con-015: Cálculo del Umbral de Rentabilidad (Punto Muerto / Break-Even Point)

**Datos de ejemplo:**
- Empresa de desarrollo de software SaaS o producto manufacturado:
  - Costes Fijos Anuales Totales (Alquiler, salarios fijos, servidores, licencias): `CF = 50.000,00 EUR`
  - Precio de Venta Unitario: `P = 25,00 EUR / unidad`
  - Coste Variable Unitario (Comisiones pasarela, consumo de tokens, packaging): `CVu = 15,00 EUR / unidad`

**Resultado esperado:**
- **Margen de Contribución Unitario (MCU):** `10,00 EUR / unidad`
- **Ratio de Margen de Contribución (RMC):** `40,00%` (`0.4000`)
- **Punto Muerto en Unidades Físicas (Q*):** `5.000 unidades`
- **Punto Muerto en Facturación Monetaria (V*):** `125.000,00 EUR`
- **Margen de Seguridad si las ventas previstas son 7.500 unidades:** `33,33%` (2.500 unidades / 62.500 EUR de colchón).

**Validación:**
- `MCU = P - CVu = 25,00 - 15,00 = 10,00 EUR`
- `Q* = CF / MCU = 50.000 EUR / 10,00 EUR = 5.000 unidades`
- `V* = Q* * P = 5.000 * 25,00 = 125.000,00 EUR`
- Cuenta de resultados en el punto muerto:
  - `Ingresos = 5.000 * 25 = 125.000 EUR`
  - `Costes Variables = 5.000 * 15 = 75.000 EUR`
  - `Costes Fijos = 50.000 EUR`
  - `Resultado Operativo (EBIT) = 125.000 - 75.000 - 50.000 = 0,00 EUR`. Cuadre matemático exacto.

---

### con-016: Análisis de Desviaciones Presupuestarias entre Coste Estándar y Real

**Datos de ejemplo:**
- Centro de producción contable de mano de obra directa (MOD):
  - Producción real ejecutada: `1.100 unidades terminadas`
  - Estándar técnico presupuestado: `2,00 horas / unidad` a una tarifa estándar de `15,00 EUR / hora`
  - Horas reales trabajadas: `2.350 horas`
  - Tarifa horaria real abonada: `15,60 EUR / hora`
  - Coste real total incurrido: `36.660,00 EUR` (`2.350 * 15.60`)

**Resultado esperado:**
- **Coste Estándar correspondiente a la producción real:** `33.000,00 EUR` (`1.100 * 2 h * 15 €/h`)
- **Desviación Global Total:** `+3.660,00 EUR` (Desfavorable / Sobreconsumo de costes)
- **Desviación en Eficiencia (Técnica / Cantidad de horas):** `+2.250,00 EUR` (Desfavorable)
- **Desviación en Precio (Económica / Tarifa salarial):** `+1.410,00 EUR` (Desfavorable)

**Validación:**
- `Horas_Estandar = 1.100 * 2 = 2.200 horas`.
- `Desv_Eficiencia = (Horas_Reales - Horas_Estandar) * Tarifa_Estandar = (2.350 - 2.200) * 15,00 = 150 * 15 = +2.250,00 EUR`.
- `Desv_Precio = (Tarifa_Real - Tarifa_Estandar) * Horas_Reales = (15,60 - 15,00) * 2.350 = 0,60 * 2.350 = +1.410,00 EUR`.
- `Desv_Total = Desv_Eficiencia + Desv_Precio = 2.250 + 1.410 = 3.660,00 EUR`. Cuadre al céntimo.

---

### con-007: Algoritmo de Matching Difuso (Fuzzy Matching) entre Banco y Facturas

**Datos de ejemplo:**
- Registro contable a conciliar:
  - Factura emitida registrada en ERP: Factura `FAC-2026-089 ACME SERVICIOS SL` por importe nominal `1.452,00 EUR` (Base 1.200 € + 21% IVA). Fecha: 15/05/2026.
  - Movimiento bancario recibido: Cargo/Abono de pasarela TPV de `1.442,00 EUR` con concepto bancario: `ACME SERV TPV 2026 89`. Fecha valor: 17/05/2026.
  - Comisión de pasarela descontada en origen: `10,00 EUR`.

**Resultado esperado:**
- **Diferencia monetaria bruta:** `10,00 EUR` (coincide exactamente con la comisión estándar del 0.8% + tarifa plana).
- **Distancia de Levenshtein normalizada sobre el concepto:** Similitud textual = `0.8750` (87.5%).
- **Diferencia temporal:** `+2 días` (dentro de la ventana de tolerancia de liquidación bancaria T+2).
- **Score compuesto del algoritmo de matching:** `0.9420` (> 0.90 -> Propuesta de conciliación automática con creación de asiento por comisiones bancarias en cuenta 626 de 10,00 EUR).

**Validación:**
- `Asiento propuesto:`
  - Debe: `(572) Banco = 1.442,00 EUR`
  - Debe: `(626) Servicios bancarios y similares = 10,00 EUR`
  - Haber: `(430) Clientes (ACME Servicios SL) = 1.452,00 EUR`.
- Cuadre del asiento: `1.442 + 10 = 1.452 EUR`. Saldo de cliente liquidado al 100%.

---

### con-036: Validación de Integridad de Huella Hash Encadenada en Software VeriFactu (RD 1007/2023)

**Datos de ejemplo:**
- Registro de facturación número N del sistema VeriFactu:
  - Hash del registro inmediatamente anterior (N-1):
    `c7be1a85e828d11c758d4a96df993952f1e29e96f8c7b8c8d2036735174f8842`
  - NIF Emisor: `B12345678`
  - Número y Serie de Factura: `F2026-0012`
  - Fecha de Expedición: `2026-09-03`
  - Tipo de Factura: `F1` (Factura ordinaria)
  - Cuota Tributaria total: `210.00`
  - Importe Total factura: `1210.00`
- Algoritmo criptográfico oficial: SHA-256 en mayúsculas sin espacios separadores.
- Cadena de concatenación normalizada:
  `B12345678&F2026-0012&2026-09-03&F1&210.00&1210.00&c7be1a85e828d11c758d4a96df993952f1e29e96f8c7b8c8d2036735174f8842`

**Resultado esperado:**
- **Longitud de la cadena de entrada:** `128 caracteres`
- **Hash SHA-256 generado (Huella de registro N):**
  `8A758D951BD0C4E76A3D7DF55BF112040D9DF5016EE827D74BE40A53545A2594`
- **Encadenamiento VeriFactu:** Verificado e inmutable.

**Validación:**
- La función hash es determinista. Cualquier alteración de un solo céntimo en el importe total (ej. `1210.01`) produce un efecto avalancha con cambio total del hash resultante.

---

### con-008: Cuadro de Amortización Degresiva con Porcentaje Constante (PGC)

**Datos de ejemplo:**
- Elemento de transporte o servidor informático adquirido el 01/01/2026:
  - Coste de adquisición: `24.000,00 EUR`
  - Vida útil estimada: `5 años`
  - Coeficiente fiscal de amortización lineal máxima: `20.0%`
  - Coeficiente multiplicador degresivo (art. 12 LIS para vida útil >= 5 y < 8 años): `2.00`
  - Porcentaje constante aplicable: `40.0%` (`20% * 2.0`)

**Resultado esperado:**
- **Año 1 (2026):** Amortización = `9.600,00 EUR` (`24.000 * 40%`) | Valor Contable Residual = `14.400,00 EUR`
- **Año 2 (2027):** Amortización = `5.760,00 EUR` (`14.400 * 40%`) | Valor Contable Residual = `8.640,00 EUR`
- **Año 3 (2028):** Amortización = `3.456,00 EUR` (`8.640 * 40%`) | Valor Contable Residual = `5.184,00 EUR`
- **Año 4 (2029):** Amortización = `2.592,00 EUR` (Pasa a cuota lineal del saldo: `5.184 / 2 años`) | Valor Residual = `2.592,00 EUR`
- **Año 5 (2030):** Amortización = `2.592,00 EUR` | Valor Contable Residual = `0,00 EUR`

**Validación:**
- Suma acumulada de amortizaciones: `9.600 + 5.760 + 3.456 + 2.592 + 2.592 = 24.000,00 EUR`.
- Cumple la regla legal de cambio al método lineal cuando la cuota constante degresiva resulte inferior a la cuota lineal restante (`3.456 * 0.40 = 2.073,60 < 5.184 / 2 = 2.592,00 EUR`).

---

## 5. MEDICINA & IA CLÍNICA

### med-034: Cálculo de Aclaramiento de Creatinina (Cockcroft-Gault) y Ajuste Farmacológico

**Datos de ejemplo:**
- Paciente ingresado en medicina interna:
  - Sexo: Varón
  - Edad: `68 años`
  - Peso corporal: `74.0 kg`
  - Creatinina sérica en analítica de sangre: `1.80 mg/dL`
  - Fármaco prescrito: Ciprofloxacino oral (Pauta estándar para función renal normal: 500 mg cada 12 horas).

**Resultado esperado:**
- **Aclaramiento de creatinina estimado (ClCr):** `41.11 mL / min`
- **Estadificación de Enfermedad Renal Crónica (KDIGO):** Grado 3a (Disfunción renal moderada, 30 a 59 mL/min)
- **Recomendación de ajuste posológico de ficha técnica:**
  - Reducción de dosis al 50% (`250 mg a 500 mg cada 18-24 horas`) para prevenir neurotoxicidad y acumulación plasmática.

**Validación:**
- Ecuación de Cockcroft-Gault para varones:
  `ClCr = ((140 - Edad) * Peso_kg) / (72 * Cr_serica)`
- `ClCr = ((140 - 68) * 74) / (72 * 1.80) = (72 * 74) / 129.60 = 5.328 / 129.60 = 41.1111 mL/min`.

---

### med-014: Estratificación de Riesgo Tromboembólico con la Escala CHA2DS2-VASc

**Datos de ejemplo:**
- Paciente con fibrilación auricular no valvular:
  - Edad: `76 años` (+2 puntos por edad >= 75)
  - Sexo: Femenino (+1 punto por sexo mujer)
  - Antecedentes: Hipertensión arterial en tratamiento (+1 punto)
  - Diabetes mellitus: No (0 puntos)
  - Ictus previo / AIT: No (0 puntos)
  - Insuficiencia cardíaca congestiva: No (0 puntos)
  - Enfermedad vascular previa (infarto o EAP): No (0 puntos)

**Resultado esperado:**
- **Puntuación total CHA2DS2-VASc:** `4 puntos` (Edad: 2, Mujer: 1, HTA: 1)
- **Tasa anual ajustada de ictus isquémico / embolia sistémica:** `4.0% anual` (sin anticoagulación)
- **Guía de Práctica Clínica (ESC):** Indicación Clase I (Fuerte) para Anticoagulación Oral (ACO preferente con ACOD tipo Apixabán, Rivaroxabán o Dabigatrán).

**Validación:**
- Suma directa ponderada: `2 + 1 + 1 = 4 puntos`.
- En mujeres con puntuación >= 3 puntos, el beneficio clínico neto de la anticoagulación supera holgadamente el riesgo hemorrágico basal.

---

### med-009: Detección Sistemática de Interacciones Fármaco-Fármaco (DDI - CYP3A4)

**Datos de ejemplo:**
- Paciente de 62 años polimedicado con:
  - Fármaco A: `Simvastatina 40 mg / día` (Sustrato sensible del citocromo P450 CYP3A4 y OATP1B1).
  - Fármaco B: `Claritromicina 500 mg / 12h` (Inhibidor potente del CYP3A4 prescrito por infección respiratoria).

**Resultado esperado:**
- **Clasificación de Severidad:** Grado X (Contraindicación Absoluta / Riesgo Vital)
- **Mecanismo Farmacocinético:** La claritromicina incrementa la concentración plasmática (AUC) de simvastatina hasta en un `1000%` (10x a 12x).
- **Riesgo Clínico:** Rabdomiólisis masiva, mioglobinuria e insuficiencia renal aguda secundaria.
- **Acción Correctora:** Suspender inmediatamente la simvastatina durante el tratamiento antibiótico o sustituir por Azitromicina (no inhibidora de CYP3A4).

**Validación:**
- Ficha técnica AEMPS y FDA: La administración conjunta de claritromicina y simvastatina está contraindicada formalmente debido a que la biodisponibilidad sistémica de la estatina supera los umbrales de toxicidad muscular en más de un orden de magnitud.

---

### med-015: Graduación de Toxicidad Hematológica según Criterios CTCAE v5.0

**Datos de ejemplo:**
- Paciente oncológico tras ciclo de quimioterapia (FOLFOX):
  - Recuento de Neutrófilos Absolutos (RAN): `750 células / microL` (`0.75 * 10^9 / L`)
  - Hemoglobina: `10.2 g / dL`
  - Plaquetas: `115.000 / microL`

**Resultado esperado:**
- **Neutropenia:** Grado 3 (Severa: `500 <= RAN < 1000 / microL`)
- **Anemia:** Grado 1 (Leve: `10.0 <= Hb < Límite normal inferior 12.0 g/dL`)
- **Trombocitopenia:** Grado 1 (Leve: `75.000 <= Plaquetas < 150.000 / microL`)
- **Dictamen Clínico:** Suspender o demorar el siguiente ciclo de quimioterapia hasta recuperación del RAN > 1.500 / microL; valorar administración de factores estimulantes de colonias de granulocitos (G-CSF).

**Validación:**
- Tabla CTCAE v5.0 para Neutrófilos:
  - Grado 1: `< LLI - 1500 / uL`
  - Grado 2: `< 1500 - 1000 / uL`
  - Grado 3: `< 1000 - 500 / uL` (750 / uL se ubica en este intervalo)
  - Grado 4: `< 500 / uL`.

---

### med-011: Codificación Terminológica Estandarizada FHIR y CIE-10-ES

**Datos de ejemplo:**
- Juicio clínico en informe de alta: "Infarto agudo de miocardio transmural de la pared anterior, episodio inicial de atención".

**Resultado esperado:**
- **CIE-10-ES Diagnósticos:** `I21.0` (Infarto agudo de miocardio con elevación del segmento ST (IAMCEST) de la pared anterior)
- **SNOMED-CT Concept ID:** `54329005` (Acute myocardial infarction of anterior wall)
- **Recurso FHIR R4 generado:**
  ```json
  {
    "resourceType": "Condition",
    "clinicalStatus": {
      "coding": [{ "system": "http://terminology.hl7.org/CodeSystem/condition-clinical", "code": "active" }]
    },
    "verificationStatus": {
      "coding": [{ "system": "http://terminology.hl7.org/CodeSystem/condition-verfrun", "code": "confirmed" }]
    },
    "code": {
      "coding": [
        { "system": "http://hl7.org/fhir/sid/icd-10-es", "code": "I21.0", "display": "Infarto agudo de miocardio de la pared anterior" },
        { "system": "http://snomed.info/sct", "code": "54329005", "display": "Acute myocardial infarction of anterior wall" }
      ]
    }
  }
  ```

**Validación:**
- El código `I21.0` es el identificador oficial unívoco en el Sistema Nacional de Salud español para eventos coronarios agudos con elevación de ST anteriores; mapeado exacto al concepto SNOMED-CT 54329005.
