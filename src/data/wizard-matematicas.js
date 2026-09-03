/**
 * WIZARD-MATEMATICAS.JS — Contenido y Lógica Especializada para el Asistente de Matemáticas & Complejidad
 * Tareas M4.1 a M4.6, Precisión Numérica Arbitraria, Solvers (HiGHS/SciPy), LaTeX/KaTeX y QA Matemático.
 */

/**
 * Tareas primarias expandidas de Matemáticas con especificación de inputs, outputs y riesgos numéricos/teóricos
 * NOTA: IDs canónicos M4.1 a M4.6
 */
export const MATEMATICAS_PRIMARY_TASKS = [
  {
    id: "M4.1",
    label: "Simulación Estocástica y Métodos Quasi-Monte Carlo (QMC)",
    shortDesc: "Generación de secuencias de baja discrepancia (Sobol / Halton) con convergencia acelerada O(1/N) y reducción de varianza.",
    longDesc: "Motor de computación estocástica avanzada para modelado de procesos estocásticos en alta dimensión, cálculo de integrales multidimensionales y estimación de colas pesadas, reemplazando el muestreo pseudoaleatorio convencional (convergencia lenta O(1/sqrt(N))) por secuencias Quasi-Monte Carlo estructuradas que garantizan un llenado homogéneo del hipercubo unitario.",
    audience: "Científicos cuantitativos, físicos computacionales, actuarios de riesgo y matemáticos aplicados.",
    requiredInputs: [
      "Función integrando f(x) o generador de trayectorias estocásticas (ej. Movimiento Browniano Fraccionario)",
      "Dimensionalidad del espacio de integración D (desde 1 hasta 100+ dimensiones)",
      "Número total de muestras N y tipo de secuencia (Sobol scrambled, Halton o Niederreiter)"
    ],
    generatedOutputs: [
      "Estimador puntual de la integral o esperanza matemática E[f(X)] con intervalo de confianza al 99%",
      "Gráfico de convergencia log-log demostrando la tasa asintótica O(1/N) frente a Monte Carlo clásico",
      "Medida de discrepancia en estrella (Star Discrepancy) del conjunto de puntos generados",
      "Exportación de matrices de trayectorias en formato binario NumPy (.npy) o Parquet"
    ],
    clinicalRisks: [
      "Pérdida de propiedades de baja discrepancia en dimensiones muy elevadas (D > 40) por correlaciones espaciales en secuencias Halton no aleatorizadas",
      "Uso de funciones discontinuas con saltos bruscos que violan la hipótesis de variación acotada de Hardy-Krause",
      "Desbordamiento de memoria RAM al almacenar matrices de simulación masivas no vectorizadas"
    ],
    complianceStandards: ["Teorema de Koksma-Hlawka", "NIST Statistical Test Suite", "Precisión IEEE 754"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "M4.2",
    label: "Optimización Combinatoria, Programación Lineal y Entera Mixta (MIP)",
    shortDesc: "Resolución exacta de modelos MILP con Branch-and-Bound, planos de corte, dualidad y solvers de vanguardia (HiGHS/PuLP).",
    longDesc: "Solucionador computacional de optimización matemática para problemas industriales de asignación, ruteo de vehículos (VRP), scheduling y empaquetado tridimensional, formulando el modelo canónico (función objetivo y restricciones lineales/cuadráticas), resolviendo mediante el solver open-source HiGHS y analizando sensibilidad y precios sombra duales.",
    audience: "Ingenieros de investigación operativa, científicos de datos, planificadores logísticos y optimizadores de redes.",
    requiredInputs: [
      "Función objetivo formal (Maximizar / Minimizar c^T * x)",
      "Matriz de restricciones de desigualdad (A_ub * x <= b_ub) y de igualdad (A_eq * x == b_eq)",
      "Definición del dominio de cada variable: continuas (R+), enteras (Z) o binarias ({0, 1})"
    ],
    generatedOutputs: [
      "Valor óptimo de la función objetivo z* y vector solución óptimo x*",
      "Estado de convergencia del solver: Óptimo Global, Infactible (Infeasible) o No Acotado (Unbounded)",
      "GAP de optimalidad en problemas mixtos enteros (MIP Gap residual)",
      "Análisis de sensibilidad dual: Precios Sombra (Shadow Prices) y holguras complementarias"
    ],
    clinicalRisks: [
      "Explosión combinatoria NP-Hard provocando tiempos de computación infinitos sin fijar un límite de tiempo (Time-Limit)",
      "Infactibilidad por restricciones contradictorias no detectadas en la formulación del modelo",
      "Inestabilidad numérica por matrices mal condicionadas con coeficientes que difieren en más de 6 órdenes de magnitud"
    ],
    complianceStandards: ["Dualidad Fuerte de Von Neumann", "Condiciones KKT", "Formato MPS / LP Standard"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "M4.3",
    label: "Integración Numérica de Ecuaciones Diferenciales Ordinarias (EDOs Rígidas)",
    shortDesc: "Simulación de sistemas dinámicos continuos mediante solvers adaptativos Runge-Kutta, Radau y BDF.",
    longDesc: "Motor de resolución de sistemas de ecuaciones diferenciales ordinarias (ODEs) y algebraico-diferenciales (DAEs) enfocado en sistemas rígidos (Stiff Systems) donde conviven escalas temporales extremas (reacciones químicas rápidas y lentas), aplicando métodos implícitos con jacobiano analítico para garantizar estabilidad incondicional sin divergencias.",
    audience: "Físicos teóricos, biólogos de sistemas, ingenieros aeroespaciales y modelizadores climáticos.",
    requiredInputs: [
      "Sistema de ecuaciones diferenciales de primer orden vectorizado: dy/dt = f(t, y, p)",
      "Condiciones iniciales en t=0 (vector y0) e intervalo de integración [t_start, t_end]",
      "Matriz jacobiana analítica J(t, y) = df/dy (opcional o calculada simbólicamente mediante SymPy)"
    ],
    generatedOutputs: [
      "Trayectoria temporal de las variables de estado y(t) con control adaptativo de paso temporal",
      "Diagnóstico del solver: número de pasos aceptados, rechazados y evaluaciones de la función",
      "Retrato de fases bidimensional o tridimensional con diagrama de trayectorias e isoclinas",
      "Cálculo del espectro de autovalores del jacobiano para determinar estabilidad asintótica local"
    ],
    clinicalRisks: [
      "Utilizar un integrador explícito (como RK45) en un problema rígido provocando divergencia a infinito o pasos infinitamente pequeños",
      "Introducir errores de acumulación numérica por tolerancias relativas (rtol) demasiado laxas",
      "Ignorar singularidades o asíntotas verticales que rompen la continuidad Lipschitz del sistema"
    ],
    complianceStandards: ["Criterios de Estabilidad A / L de Dahlquist", "Norma ISO/IEC 10967", "Biblioteca SciPy Integrate"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "M4.4",
    label: "Análisis de Grafos Complejos y Topología Espectral (Network Science)",
    shortDesc: "Cálculo de matrices Laplaciana, espectro de autovalores, PageRank, modularidad de Louvain y centralidades.",
    longDesc: "Plataforma de teoría de grafos y redes complejas que procesa topologías masivas, calculando el Laplaciano no normalizado y simétrico normalizado, extrayendo el radio espectral y el gap espectral (conectividad algebraica de Fiedler), detectando comunidades mediante maximización de modularidad y clasificando nodos según centralidad de intermediación (Betweenness) y vector propio.",
    audience: "Científicos de redes, sociólogos cuantitativos, analistas de ciberseguridad y bioinformáticos.",
    requiredInputs: [
      "Lista de aristas ponderadas (Source, Target, Weight) o matriz de adyacencia dispersa (Sparse Matrix)",
      "Carácter del grafo: Dirigido (Directed) vs No Dirigido (Undirected), con o sin lazos internos",
      "Parámetro de amortiguamiento (Damping Factor alpha = 0.85) para algoritmo PageRank"
    ],
    generatedOutputs: [
      "Espectro de autovalores de la matriz Laplaciana con valor del segundo autovalor más pequeño (Conectividad de Fiedler)",
      "Vector de centralidad PageRank y Betweenness Centrality de todos los nodos",
      "Estructura de comunidades detectada con índice de modularidad Q de Louvain",
      "Visualización topológica interactiva con distribución de fuerza (Force-Directed Graph) y exportación a GEXF / Gephi"
    ],
    clinicalRisks: [
      "Calcular Betweenness Centrality exacta en grafos de más de 50.000 nodos (complejidad O(V*E)) colapsando la CPU",
      "Tratar un grafo dirigido asimétrico como si fuera simétrico falseando el espectro de autovalores",
      "Problema de 'Dangling Nodes' en PageRank provocando sumideros de probabilidad sin conservación de masa"
    ],
    complianceStandards: ["Algoritmo de Fiedler", "Algoritmo de Newman-Girvan", "Formato GraphML / GEXF"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "M4.5",
    label: "Sistemas Dinámicos Caóticos y Exponentes de Lyapunov",
    shortDesc: "Modelado del atractor de Lorenz, cascada de bifurcaciones de Feigenbaum y espectro completo de Lyapunov.",
    longDesc: "Laboratorio computacional de teoría del caos determinista y dinámica no lineal que reconstruye atractores extraños en el espacio de fases, calcula el Máximo Exponente de Lyapunov (MLE) mediante el algoritmo de Wolf o Benettin para cuantificar la sensibilidad a las condiciones iniciales (Efecto Mariposa) y modela el diagrama de bifurcaciones del mapa logístico.",
    audience: "Físicos no lineales, meteorólogos computacionales, criptógrafos de caos y matemáticos teóricos.",
    requiredInputs: [
      "Ecuaciones del sistema caótico continuo (ej. Atractor de Lorenz con sigma=10, r=28, b=8/3) o mapa discreto",
      "Tiempo de transitorio a descartar (Warm-up time) para permitir que el sistema decaiga al atractor",
      "Vector de perturbación infinitesimal inicial d0 (ej. 1e-8) y tiempo de reortonormalización de Gram-Schmidt"
    ],
    generatedOutputs: [
      "Espectro completo de exponentes de Lyapunov lambda_1 >= lambda_2 >= ... >= lambda_n",
      "Cálculo de la Dimensión Fractal de Kaplan-Yorke (dimensión de Lyapunov) del atractor",
      "Horizonte de predictibilidad temporal (Tiempo de Lyapunov = 1 / lambda_max)",
      "Renderizado vectorial 3D del atractor en rotación libre mediante Three.js / WebGL"
    ],
    clinicalRisks: [
      "Confundir ruido estocástico aleatorio con caos determinista de baja dimensión",
      "Reortonormalización insuficiente provocando colapso de todos los vectores tangentes sobre la dirección de máxima expansión",
      "No descartar el transitorio inicial calculando los exponentes sobre la fase de aproximación al atractor"
    ],
    complianceStandards: ["Algoritmo de Benettin", "Constante de Feigenbaum delta = 4.6692016", "Dimensión de Hausdorff"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "M4.6",
    label: "Renderizado Matemático WebGL/Three.js y Exportación KaTeX / SymPy",
    shortDesc: "Visualización en tiempo real de variedades diferenciales, fractales raymarching GLSL y tipografía KaTeX.",
    longDesc: "Motor de renderizado visual interactivo y computación simbólica que genera shaders fragmentarios GLSL para trazado de rayos (Sphere Tracing / Raymarching) de conjuntos fractales cuaterniónicos (Mandelbulb, Conjuntos de Julia 4D), integrando un puente bidireccional con SymPy para derivación analítica de ecuaciones y renderizado tipográfico perfecto en KaTeX / LaTeX.",
    audience: "Divulgadores científicos, profesores de matemáticas avanzadas, desarrolladores de gráficos y diseñadores WebGL.",
    requiredInputs: [
      "Definición analítica de la variedad algebraica o fórmula del fractal (ej. función de distancia estimada SDF)",
      "Resolución de renderizado (viewport canvas) y parámetros de iluminación phong / sombras suaves",
      "Expresión matemática simbólica a tipografiar y verificar algebraicamente"
    ],
    generatedOutputs: [
      "Shader GLSL optimizado para ejecución a 60 FPS en el navegador del cliente",
      "Componente Three.js montable en React con órbita de cámara interactiva y controles dat.GUI",
      "Código LaTeX limpio y validado para renderizado inmediato con KaTeX sin dependencias externas pesadas",
      "Script en Python con SymPy para comprobación de soluciones analíticas y simplificación de términos"
    ],
    clinicalRisks: [
      "Caída drástica de FPS por exceder el número máximo de pasos de iteración de raymarching en GPUs de gama baja",
      "Alucinación de sintaxis LaTeX inválida con comandos no reconocidos por el compilador estándar de KaTeX",
      "Incompatibilidad de precisión de coma flotante de 32 bits (highp float) provocando artefactos visuales a escalas de zoom profundo"
    ],
    complianceStandards: ["Especificación GLSL ES 3.0", "KaTeX Compatible Spec", "SymPy Core Math"],
    recommendedModel: "Claude 3.7 Sonnet"
  }
];

/**
 * Preguntas de diagnóstico técnico especializadas en Matemáticas & Complejidad (3 a 5 preguntas de impacto real)
 */
export const MATEMATICAS_DIAGNOSTIC_QUESTIONS = [
  {
    id: "mat_precision_level",
    title: "Nivel de Precisión Numérica y Tolerancia al Redondeo",
    context: "La elección del tipo de número determina el consumo de memoria, el tiempo de cálculo y la estabilidad del algoritmo.",
    options: [
      {
        id: "standard_float64",
        label: "Precisión Doble Estándar IEEE 754 (float64 - 53 bits significante)",
        impact: "Aproximadamente 15-17 dígitos decimales de precisión. Máxima velocidad nativa de CPU con soporte vectorizado SIMD/AVX.",
        recommendation: "Recomendado para la gran mayoría de simulaciones físicas, EDOs y algoritmos de optimización combinatoria."
      },
      {
        id: "arbitrary_mpmath",
        label: "Precisión Arbitraria Extrema con mpmath (100 a 1.000+ dígitos)",
        impact: "Cero error de cancelación catastrófica en series divergentes o cálculo de ceros de funciones zeta; coste computacional 50-100x superior.",
        recommendation: "Uso exclusivo en núcleos de calibración teórica, teoría analítica de números o comprobación de cotas de error formal."
      },
      {
        id: "exact_symbolic_sympy",
        label: "Aritmética Racional y Simbólica Exacta (SymPy / Fractions)",
        impact: "Representación mediante fracciones irreducibles (p/q) y raíces algebraicas sin pérdida alguna de información decimal.",
        recommendation: "Ideal para demostraciones formales, cálculo de autovalores de matrices pequeñas e identidades trigonométricas."
      }
    ]
  },
  {
    id: "mat_solver_architecture",
    title: "Arquitectura del Solver y Motor de Optimización",
    context: "La naturaleza del problema (lineal, no lineal, convexo, entero o continuo) condiciona el motor computacional óptimo.",
    options: [
      {
        id: "highs_milp",
        label: "Solver Lineal y Mixto Entero HiGHS (C++ Open Source)",
        impact: "Capaz de resolver modelos con millones de variables y restricciones con rendimiento cercano a solvers comerciales (Gurobi/CPLEX).",
        recommendation: "Integrar a través de scipy.optimize.linprog(method='highs') o la librería PuLP para formulaciones MIP complejas."
      },
      {
        id: "scipy_nonlinear",
        label: "Optimización Continua No Lineal con Restricciones (SLSQP / IPOPT)",
        impact: "Resolución de problemas con curvatura y restricciones no lineales mediante métodos de lagrangiano aumentado y puntos interiores.",
        recommendation: "Proveer matrices Jacobiana y Hessiana analíticas para acelerar la convergencia y evitar gradientes finitos ruidosos."
      },
      {
        id: "evolutionary_heuristic",
        label: "Metaheurísticas Globales (Algoritmos Genéticos / Particle Swarm / Simulated Annealing)",
        impact: "Exploración de paisajes de optimización no convexos y altamente rugosos con miles de mínimos locales engañosos.",
        recommendation: "Paralelizar la evaluación de fitness en múltiples núcleos de CPU mediante multiprocessing o joblib."
      }
    ]
  },
  {
    id: "mat_computation_scale",
    title: "Entorno de Ejecución y Aceleración de Cómputo",
    context: "La escala del problema determina si se ejecuta en hilo único, multihilo vectorizado o clúster distribuido.",
    options: [
      {
        id: "numba_cpu_jit",
        label: "Compilación JIT en CPU con Numba (C-Speed en Python)",
        impact: "Transforma bucles iterativos de Python en código máquina nativo con soporte para directivas prange de multiprocesamiento.",
        recommendation: "Añadir decoradores @njit(fastmath=True, parallel=True) en los núcleos de integración y simulación estocástica."
      },
      {
        id: "jax_gpu_tensors",
        label: "Aceleración Masiva en GPU / TPU con JAX / PyTorch",
        impact: "Diferenciación automática hacia adelante y hacia atrás, vectorización vmap y ejecución sobre decenas de miles de núcleos CUDA.",
        recommendation: "Imprescindible para grafos gigantes (> 1M nodos), simulaciones de dinámica molecular o raymarching en tiempo real."
      },
      {
        id: "pure_python_duckdb",
        label: "DuckDB Vectorizado + NumPy Estándar (Sin dependencias C complejas)",
        impact: "Máxima portabilidad e instalación limpia en cualquier sistema operativo sin necesidad de compiladores locales ni drivers GPU.",
        recommendation: "Excelente para herramientas educativas, laboratorios interactivos y prototipos rápidos de análisis de grafos."
      }
    ]
  },
  {
    id: "mat_reproducibility_seed",
    title: "Garantía de Reproducibilidad Científica y Determinismo",
    context: "La ciencia computacional rigurosa exige que cualquier cálculo estocástico pueda ser reproducido exactamente en cualquier máquina.",
    options: [
      {
        id: "strict_prng_seed",
        label: "Semillas Deterministas Fijas en Generadores PRNG (PCG64 / Philox)",
        impact: "Garantiza reproducibilidad bit a bit de las secuencias de números pseudoaleatorios en cualquier ejecución.",
        recommendation: "Usar numpy.random.Generator con SeedSequence explícita, evitando el uso global de np.random.seed()."
      },
      {
        id: "deterministic_qmc",
        label: "Secuencias Cuasi-Aleatorias Deterministas (Sobol / Halton)",
        impact: "Las secuencias QMC son inherentemente deterministas por diseño matemático, eliminando la dependencia del generador aleatorio.",
        recommendation: "Guardar el salto de punto inicial (scramble scramble_seed) para permitir replicación independiente por pares."
      },
      {
        id: "interactive_sandbox",
        label: "Modo Exploratorio Interactivo sin Fijación de Semillas",
        impact: "Cada ejecución ofrece una realización estocástica diferente, útil para exploración visual y docencia interactiva.",
        recommendation: "Ofrecer un botón explícito de 'Fijar Semilla' para cuando el usuario desee documentar un resultado concreto."
      }
    ]
  }
];

/**
 * 3 Templates de proyecto completos por área (Matemáticas)
 */
export const MATEMATICAS_PROJECT_TEMPLATES = [
  {
    id: "template-sobol-qmc-engine",
    name: "Simulador de Métodos Quasi-Monte Carlo y Reducción de Varianza (Sobol Engine)",
    desc: "Plataforma computacional para cálculo de integrales multidimensionales mediante secuencias de Sobol con scramble y orden O(1/N).",
    techStack: [
      { name: "Python 3.12", role: "Entorno numérico principal" },
      { name: "SciPy (scipy.stats.qmc)", role: "Generación de secuencias de baja discrepancia de alta dimensión" },
      { name: "Numba JIT", role: "Compilación nativa de funciones integrando vectorizadas a velocidad C" },
      { name: "DuckDB + Parquet", role: "Almacenamiento columnar de trayectorias estocásticas para análisis posterior" }
    ],
    folderStructure: `sobol_qmc_engine/
├── data/
│   ├── samples/             # Muestras Sobol serializadas en Parquet
│   └── convergence/         # Tablas de error residual por tamaño N
├── src/
│   ├── generators/
│   │   ├── sobol_gen.py     # Generador Sobol con aleatorización Owen scramble
│   │   └── halton_gen.py    # Generador Halton para dimensiones bajas
│   ├── kernels/
│   │   └── test_functions.py# Banco de pruebas (Genz test functions, Rosenbrock)
│   ├── analysis/
│   │   └── discrepancy.py   # Estimador de Star Discrepancy empírica
│   └── main.py              # CLI para benchmark QMC vs MC estándar
├── notebooks/
│   └── error_analysis.ipynb # Gráficos log-log de convergencia
├── requirements.txt
└── README.md`,
    dependencies: ["scipy>=1.14.0", "numpy>=2.1.0", "numba>=0.60.0", "duckdb>=1.1.0", "matplotlib>=3.9.0"],
    envVars: ["DEFAULT_DIMENSIONS=10", "MAX_SAMPLES=1000000", "SCRAMBLE_SEED=42"],
    firstStep: "Ejecutar 'pip install -r requirements.txt' y correr 'python src/main.py --dim 5 --samples 100000' para contrastar el error de integración Sobol vs Pseudoaleatorio."
  },
  {
    id: "template-highs-milp-optimizer",
    name: "Optimizador de Programación Entera Mixta y Asignación (MILP HiGHS Solver)",
    desc: "Framework para modelado y resolución de problemas industriales de optimización combinatoria y asignación de recursos.",
    techStack: [
      { name: "Python 3.12", role: "Modelado algebraico y resolución" },
      { name: "PuLP / SciPy Optimize", role: "Interfaz de formulación y solver HiGHS integrado" },
      { name: "NetworkX", role: "Modelado de restricciones de flujo en redes y conectividad" },
      { name: "Streamlit / React", role: "Cuadro de mando visual para visualización de grafos y asignaciones óptimas" }
    ],
    folderStructure: `highs_milp_optimizer/
├── src/
│   ├── model/
│   │   ├── variables.py     # Definición de variables continuas y binarias
│   │   ├── constraints.py   # Restricciones de capacidad, balance y demanda
│   │   └── objective.py     # Función de coste / beneficio a optimizar
│   ├── solver/
│   │   └── highs_runner.py  # Invocación de HiGHS con control de MIP Gap y tiempo límite
│   ├── sensitivity/
│   │   └── shadow_prices.py # Análisis de precios sombra y holguras duales
│   └── app.py               # Dashboard interactivo con sliders de restricciones
├── tests/
│   └── test_feasibility.py  # Casos unitarios de modelos factibles e infactibles
├── requirements.txt
└── config.yaml`,
    dependencies: ["pulp>=2.9.0", "scipy>=1.14.0", "networkx>=3.4.0", "streamlit>=1.39.0", "pydantic>=2.9.0"],
    envVars: ["TIME_LIMIT_SECONDS=60", "MIP_GAP_TOLERANCE=0.01", "SOLVER_THREADS=4"],
    firstStep: "Ejecutar 'streamlit run src/app.py' para formular interactivamente un problema de transporte y obtener la solución óptima del solver HiGHS."
  },
  {
    id: "template-chaotic-dynamics-lyapunov",
    name: "Integrador Numérico de Sistemas Caóticos y Exponentes de Lyapunov",
    desc: "Laboratorio para simulación de atractores extraños en 3D y cálculo numérico riguroso del espectro completo de Lyapunov.",
    techStack: [
      { name: "Python 3.12", role: "Kernel de integración adaptativo" },
      { name: "SciPy Integrate (Radau / BDF)", role: "Solvers de alta precisión para EDOs no lineales rígidas" },
      { name: "Numba", role: "Aceleración de reortonormalización de Gram-Schmidt" },
      { name: "Three.js / WebGL", role: "Renderizado interactivo del atractor en rotación libre" }
    ],
    folderStructure: `chaotic_dynamics_lyapunov/
├── src/
│   ├── systems/
│   │   ├── lorenz.py        # Atractor clásico de Lorenz
│   │   ├── rossler.py       # Sistema no lineal de Rössler
│   │   └── chua.py          # Circuito caótico de Chua
│   ├── lyapunov/
│   │   ├── benettin.py      # Algoritmo de Benettin con jacobiano variacional
│   │   └── kaplan_yorke.py  # Cálculo de la dimensión fractal del atractor
│   ├── visualizer/
│   │   └── webgl_export.py  # Exportación de trayectorias a JSON para Three.js
│   └── main.py              # Cálculo de exponentes y horizonte de predictibilidad
├── web/
│   ├── index.html           # Visor 3D Three.js con rotación orbital
│   └── atractor.js          # Pipeline de visualización WebGL
├── requirements.txt
└── README.md`,
    dependencies: ["scipy>=1.14.0", "numpy>=2.1.0", "numba>=0.60.0", "sympy>=1.13.0", "plotly>=5.24.0"],
    envVars: ["INTEGRATION_STEPS=50000", "TRANSIENT_STEPS=5000", "GRAM_SCHMIDT_DT=0.1"],
    firstStep: "Ejecutar 'python src/main.py --system lorenz' para computar los exponentes de Lyapunov [0.905, 0.000, -14.572] y abrir el visor WebGL."
  }
];

/**
 * Checklist de Aseguramiento de Calidad (QA) y Pre-Despliegue Específico de Matemáticas (12-15 puntos)
 */
export const MATEMATICAS_DEPLOYMENT_CHECKLIST = [
  {
    category: "Rigor Matemático y Estándares Teóricos",
    items: [
      "Comprobación de condiciones de convergencia: verificar que los métodos iterativos cumplen las hipótesis de contracción de Banach o condiciones KKT.",
      "Validación de simetría y semidefinición positiva en matrices de covarianza y Laplaciano (autovalores lambda >= 0).",
      "Diferenciación estricta entre estabilidad local y global en análisis de puntos de equilibrio de sistemas dinámicos.",
      "Verificación de que las simplificaciones analíticas conservan el dominio y rango original sin introducir soluciones espurias."
    ]
  },
  {
    category: "Seguridad Numérica y Sandboxing Simbólico",
    items: [
      "Aislamiento de la evaluación simbólica SymPy en un subproceso con timeout estricto (< 5 segundos) para prevenir bucles infinitos por simplificaciones complejas.",
      "Protección contra división por cero y operaciones algebraicamente indeterminadas (0/0, inf - inf) mediante excepciones tipadas.",
      "Control de consumo de memoria RAM: comprobar que el almacenamiento de trayectorias masivas utiliza buffers vectorizados en disco o Parquet sin agotar la memoria.",
      "Inmutabilidad de la semilla determinista cuando se solicita un modo de reproducibilidad estricto."
    ]
  },
  {
    category: "Rendimiento, Aceleración JIT y Escalabilidad",
    items: [
      "Verificación de precalentamiento (Warm-up) en funciones Numba para que la compilación JIT no penalice la primera petición del usuario.",
      "Medición de eficiencia de vectorización: comprobar que los bucles matemáticos intensivos operan sobre arrays continuos C-order de NumPy.",
      "Establecimiento obligatorio de límites de tiempo (Time-Limit) en solvers MIP para garantizar retorno de solución subóptima antes de agotar el tiempo de espera.",
      "Optimización de shaders GLSL en Three.js para mantener una tasa sostenida de 60 FPS en resoluciones estándar."
    ]
  },
  {
    category: "Precisión Numérica y Reproducibilidad Determinista",
    items: [
      "Prohibición de valores NaN, Infinity o subnormales no controlados en vectores de estado y matrices de solución.",
      "Comprobación de que la semilla pseudoaleatoria produce secuencias de cálculo idénticas bit a bit en plataformas x86_64.",
      "Verificación de código LaTeX generado para garantizar que compila limpiamente en KaTeX sin comandos no soportados."
    ]
  }
];

/**
 * Presets de configuración rápida para Matemáticas & Complejidad (MVP, Producción, Enterprise)
 */
export const MATEMATICAS_PRESETS = [
  {
    id: "mvp",
    name: "Nivel 1: Script de Investigación / Cuaderno Jupyter Exploratorio",
    description: "Ideal para investigadores, estudiantes y modelizadores que formulan prototipos matemáticos rápidos y visualizaciones exploratorias.",
    recommendedConfig: {
      precisionLevel: "Float64 estándar IEEE 754",
      solverBackend: "SciPy Optimize + HiGHS integrado",
      executionMode: "Python interactivo en local con gráficos Plotly/Matplotlib",
      uiFramework: "Jupyter Notebook o Streamlit local",
      primaryModel: "DeepSeek V4 (Excelente razonamiento matemático y sintaxis NumPy)"
    },
    estimatedApiCostMonthly: "0 € - 20 € / mes",
    estimatedDevTime: "1 a 2 semanas (40 - 80 horas de ingeniería)"
  },
  {
    id: "produccion",
    name: "Nivel 2: Motor Computacional de Producción / API Analítica",
    description: "Para empresas de logística, departamentos de optimización de redes y plataformas cuantitativas con cálculo continuo.",
    recommendedConfig: {
      precisionLevel: "Float64 vectorizado con aceleración Numba JIT",
      solverBackend: "Solver HiGHS compilado en C++ con colas de optimización",
      executionMode: "Microservicio FastAPI en servidor Linux dedicado",
      uiFramework: "React con componentes KaTeX para fórmulas y Three.js para 3D",
      primaryModel: "Claude 3.7 Sonnet (Máximo rigor formal en derivaciones y demostraciones)"
    },
    estimatedApiCostMonthly: "50 € - 150 € / mes",
    estimatedDevTime: "3 a 6 semanas (120 - 240 horas de ingeniería matemática)"
  },
  {
    id: "enterprise",
    name: "Nivel 3: Clúster de Supercomputación Matemática / HPC Grado Industrial",
    description: "Para centros de cálculo científico, simulaciones climáticas, modelado genómico masivo y optimización de redes eléctricas a escala país.",
    recommendedConfig: {
      precisionLevel: "Precisión mixta acelerada por hardware GPU con soporte mpmath",
      solverBackend: "Clúster distribuido de optimización con tolerancia a fallos y checkpoints",
      executionMode: "Contenedores Docker orquestados con Kubernetes y GPU nodes",
      uiFramework: "Portal analítico de alta densidad con exportación formal de papers LaTeX",
      primaryModel: "Modelos privados con guardrails formales de verificación de teoremas y benchmarking continuo"
    },
    estimatedApiCostMonthly: "> 350 € / mes",
    estimatedDevTime: "8 a 16 semanas (320 - 640 horas de ingeniería de supercomputación)"
  }
];

/**
 * Tareas secundarias contextuales de Matemáticas & Complejidad
 */
export const MATEMATICAS_SECONDARY_TASKS = [
  {
    id: "SEC-MAT-01",
    label: "Verificador de Equivalencia Simbólica con SymPy Sandbox",
    desc: "Comprobación estricta de simplificación de diferencias simplify(lhs - rhs) == 0 en entorno Python aislado con timeout."
  },
  {
    id: "SEC-MAT-02",
    label: "Generador de Fórmulas y Artículos en LaTeX / KaTeX",
    desc: "Renderizado tipográfico de demostraciones y derivaciones paso a paso con numeración formal de ecuaciones."
  },
  {
    id: "SEC-MAT-03",
    label: "Acelerador Numérico JIT con Numba y Paralelismo de Hilos",
    desc: "Compilación Just-In-Time de bucles matemáticos intensivos alcanzando rendimiento equiparable a C/Fortran nativo."
  },
  {
    id: "SEC-MAT-04",
    label: "Almacenamiento Columnar de Matrices y Tensores en Parquet",
    desc: "Persistencia de series temporales de simulación, estados de optimización y matrices de covarianza en local."
  },
  {
    id: "SEC-MAT-05",
    label: "Exportador de Cuadernos Jupyter Reproducibles (.ipynb)",
    desc: "Generación automática de notebooks interactivos con celdas de código documentadas y gráficos listos para ejecutar."
  },
  {
    id: "SEC-MAT-06",
    label: "Auditor de Pasos de Razonamiento y Detección de Falsas Demostraciones",
    desc: "Detección algorítmica de divisiones por cero encubiertas, saltos de paso no justificados y falacias circulares."
  },
  {
    id: "SEC-MAT-07",
    label: "Calculadora de Precisión Arbitraria con mpmath (100+ dígitos)",
    desc: "Computación de constantes y funciones especiales sin redondeos de coma flotante estándar de 64 bits."
  },
  {
    id: "SEC-MAT-08",
    label: "Dataset Sintético de Problemas Matemáticos DEMO para Modo Offline",
    desc: "Colección de 50 problemas resueltos de optimización, EDOs y grafos precargados para validación sin internet."
  }
];

/**
 * Reglas de branching condicional para el Wizard de Matemáticas
 * NOTA: IDs canónicos M4.1 a M4.6
 */
export const MATEMATICAS_BRANCHING_RULES = [
  {
    id: "BR-MAT-01",
    condition: (answers) => answers.primaryTask === "M4.1",
    action: "Integrar generador de secuencias de Sobol con scramble; forzar fijación de semilla determinista (Random Seed)."
  },
  {
    id: "BR-MAT-02",
    condition: (answers) => answers.primaryTask === "M4.2",
    action: "Integrar el solver HiGHS vía SciPy Optimize; habilitar comprobación de factibilidad y extracción de precios duales."
  },
  {
    id: "BR-MAT-03",
    condition: (answers) => answers.primaryTask === "M4.3",
    action: "Activar solvers para EDOs rígidas (Radau / BDF); exigir provisión de la matriz jacobiana analítica mediante SymPy."
  },
  {
    id: "BR-MAT-04",
    condition: (answers) => answers.primaryTask === "M4.5",
    action: "Activar algoritmo de reortonormalización de Gram-Schmidt para el cálculo continuo del espectro de Lyapunov."
  },
  {
    id: "BR-MAT-05",
    condition: (answers) => answers.secondaryTasks?.includes("SEC-MAT-01") || answers.primaryTask === "M4.6",
    action: "Activar sandbox de ejecución de SymPy con timeout de 5 segundos para prevenir bucles algebraicos infinitos."
  }
];

/**
 * Generador de PRD (Product Requirements Document) especializado en Matemáticas
 * @param {Object} data - Datos recopilados en el Wizard
 * @returns {string} Documento PRD completo en Markdown
 */
export function generateMatematicasPRD(data = {}) {
  const now = new Date().toISOString().split("T")[0];
  const primary = MATEMATICAS_PRIMARY_TASKS.find(t => t.id === data.primaryTask) || MATEMATICAS_PRIMARY_TASKS[0];

  const secondaryList = (data.secondaryTasks || [])
    .map(id => MATEMATICAS_SECONDARY_TASKS.find(s => s.id === id))
    .filter(Boolean);

  return `# ESPECIFICACIÓN TÉCNICA Y DE REQUISITOS MATEMÁTICOS (PRD)
## Producto Matemático: ${data.appName || "Horizon Math Engine"}

**Fecha de Generación:** ${now}  
**Área Horizon:** Matemáticas & Modelado de Sistemas Complejos  
**Tarea Primaria Identificada:** ${primary.id} — ${primary.label}  
**Versión Documental:** v1.0.0 (Especificación Computacional Rigurosa)  

---

### 1. Resumen Ejecutivo y Marco Teórico
- **Tarea Primaria (${primary.id}):** ${primary.label}
- **Fundamento Matemático:** ${primary.longDesc}
- **Público Objetivo:** ${primary.audience}
- **Estándar Teórico Aplicado:** Cumplimiento de teoremas de convergencia y estándares de precisión numérica.

---

### 2. Entradas, Salidas y Riesgos Numéricos
#### Entradas Requeridas (Inputs):
${primary.requiredInputs.map(i => `- ${i}`).join("\n")}

#### Salidas Generadas (Outputs):
${primary.generatedOutputs.map(o => `- ${o}`).join("\n")}

#### Riesgos Numéricos Identificados y Mitigaciones:
${primary.clinicalRisks?.map(r => `- **Riesgo:** ${r}\n  - *Mitigación:* Verificación formal de cotas de error y solvers adaptativos con jacobiano exacto.`).join("\n") || "- Mitigación mediante solvers adaptativos y control de paso."}

---

### 3. Tareas Secundarias de Soporte y Reproducibilidad
${secondaryList.map(s => `- **${s.id} — ${s.label}:** ${s.desc}`).join("\n") || "- Operativa estándar con aceleración Numba y persistencia en Parquet."}

---

### 4. Arquitectura Técnica y Entorno de Cómputo
- **Framework de Interfaz:** ${data.uiFramework || "Flet (Python Desktop / Local) o Streamlit"}
- **Motor de Cómputo y Solvers:** ${data.storageEngine || "SciPy + HiGHS + Numba JIT (C-Speed)"}
- **Nivel de Precisión:** ${data.precisionLevel || "Float64 estándar IEEE 754"}
- **Soporte Tipográfico:** Renderizado de fórmulas paso a paso mediante KaTeX / LaTeX validado.
- **Modo Offline:** ${data.hasDemoDataset ? "Activado con banco de 50 problemas matemáticos resueltos DEMO." : "Requiere entorno Python con compilador C/LLVM."}

---

### 5. Guardrails Numéricos y Control de Divergencias
1. **Detección de NaN/Inf:** Intercepción inmediata de cualquier vector de estado que contenga indeterminaciones matemáticas.
2. **Timeout Simbólico en Sandbox:** Límite estricto de 5 segundos para cualquier simplificación analítica en SymPy.
3. **Control de Paso Adaptativo:** Reducción automática del paso temporal ante incrementos bruscos de rigidez en EDOs.
4. **Reproducibilidad Estocástica:** Fijación de semilla determinista verificada para garantizar replicabilidad bit a bit.

---

### 6. Checklist de Validación y Aseguramiento de Calidad Matemática (QA)
${MATEMATICAS_DEPLOYMENT_CHECKLIST.map(cat => `#### ${cat.category}:\n` + cat.items.map(i => `- [ ] ${i}`).join("\n")).join("\n\n")}

---
*Documento compilado automáticamente por el motor de especificación técnica de Horizon v3.*`;
}

/** Alias de compatibilidad para verificación QA **/
export const MATEMATICAS_QA_CHECKLIST = MATEMATICAS_DEPLOYMENT_CHECKLIST;
