import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Download } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Calculator } from "lucide-react";

// â”€â”€â”€ Constantes de datos (MatemÃ¡ticas & Procesos Complejos) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRIMARY_TASKS = [
  {
    id: "M4.1",
    label: "Auditor LÃ³gico y Verificador SimbÃ³lico de Demostraciones (Prisma MatemÃ¡tico)",
    desc: "SegmentaciÃ³n de derivaciones matemÃ¡ticas paso a paso, verificaciÃ³n lÃ³gica formal (DeepSeek-R1) y comprobaciÃ³n de equivalencia algebraica mediante Ã¡lgebra computacional (SymPy).",
    audience: "Investigadores matemÃ¡ticos, desarrolladores de algoritmos, profesores universitarios, analistas formales.",
  },
  {
    id: "M4.2",
    label: "Motor de OptimizaciÃ³n Combinatoria y ProgramaciÃ³n Lineal Mixta (Simplex Helios)",
    desc: "ResoluciÃ³n exacta y aproximada de problemas de investigaciÃ³n operativa (MILP, Simplex, Branch-and-Bound, metaheurÃ­sticas) para logÃ­stica, despacho energÃ©tico y asignaciÃ³n de recursos con SciPy/PuLP/OR-Tools.",
    audience: "Ingenieros de operaciones, quants, planificadores de redes logÃ­sticas y energÃ©ticas.",
  },
  {
    id: "M4.3",
    label: "Predictor de Riesgo Operacional y Modelado EstocÃ¡stico de Colas Pesadas",
    desc: "EstimaciÃ³n de distribuciones de valores extremos (EVT), cadenas de Markov, procesos de Poisson no homogÃ©neos y simulaciones Monte Carlo aceleradas por GPU/Numba.",
    audience: "Gestores de riesgo operacional, actuarios de seguros, analistas de fiabilidad de sistemas crÃ­ticos.",
  },
  {
    id: "M4.4",
    label: "Solucionador Multi-Paso de MatemÃ¡ticas de CompeticiÃ³n (Olimpiadas / AIME / Putnam)",
    desc: "ResoluciÃ³n con razonamiento extendido en tiempo de inferencia (o1 / DeepSeek-R1) y verificaciÃ³n socrÃ¡tica paso a paso en teorÃ­a de nÃºmeros, combinatoria y geometrÃ­a analÃ­tica.",
    audience: "Estudiantes de olimpiadas, entrenadores de competiciÃ³n matemÃ¡tica, analistas de razonamiento formal.",
  },
  {
    id: "M4.5",
    label: "Sistema Multi-Agente Coordinado para Problemas MatemÃ¡ticos Distribuidos (MAFBench)",
    desc: "DescomposiciÃ³n estratÃ©gica de problemas complejos en subproblemas concurrentes resueltos por agentes especializados con sincronizaciÃ³n de estado y convergencia garantizada.",
    audience: "CientÃ­ficos de la computaciÃ³n, arquitectos de agentes distribuidos, equipos de I+D algorÃ­tmico.",
  },
  {
    id: "M4.6",
    label: "Calculador SimbÃ³lico-NumÃ©rico HÃ­brido con Tool-Use y CÃ³digo Python Validado",
    desc: "IntegraciÃ³n de LLMs con entornos aislados de ejecuciÃ³n de cÃ³digo (Python Sandbox) para cÃ¡lculo tensorial, cÃ¡lculo diferencial y Ã¡lgebra lineal con NumPy/SciPy sin alucinaciÃ³n numÃ©rica.",
    audience: "CientÃ­ficos de datos, ingenieros de simulaciÃ³n fÃ­sica, investigadores cuantitativos.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-MATH-01", label: "Verificador de Equivalencia SimbÃ³lica con SymPy Sandbox", desc: "EjecuciÃ³n determinista de simplify(lhs - rhs) == 0 en entorno aislado con control de timeout estricto." },
  { id: "SEC-MATH-02", label: "Generador de Informes con Salida LaTeX y Trazabilidad en DuckDB", desc: "Renderizado de fÃ³rmulas en LaTeX con anotaciÃ³n de estado por paso y registro inmutable de verificaciones." },
  { id: "SEC-MATH-03", label: "Motor de SimulaciÃ³n Monte Carlo Paralelizado (Multiprocessing / Numba JIT)", desc: "AceleraciÃ³n computacional de 1.000.000+ iteraciones con compilaciÃ³n JIT y fijaciÃ³n de semilla determinista." },
  { id: "SEC-MATH-04", label: "AlmacÃ©n Columnar de Series y Resultados MatemÃ¡ticos (DuckDB + Parquet)", desc: "Persistencia analÃ­tica de matrices, vectores de estado y soluciones de optimizaciÃ³n." },
  { id: "SEC-MATH-05", label: "Exportador a Formatos Computacionales (JSON-Schema, Python Script, Jupyter Notebook)", desc: "GeneraciÃ³n de cÃ³digo Python listo para ejecutar y notebooks reproducibles." },
  { id: "SEC-MATH-06", label: "Detector de Pasos de Razonamiento InvÃ¡lidos o Desconectados (ProofStep Auditor)", desc: "IdentificaciÃ³n de saltos lÃ³gicos no justificados, divisiones por cero potenciales y uso de lemas no demostrados." },
  { id: "SEC-MATH-07", label: "Asistente SocrÃ¡tico AntialucinaciÃ³n con VerificaciÃ³n de Premisas", desc: "RestricciÃ³n severa que exige validaciÃ³n explÃ­cita de condiciones de contorno antes de aceptar cualquier soluciÃ³n." },
  { id: "SEC-MATH-08", label: "Visualizador de Grafos de DecisiÃ³n y TopologÃ­a de Redes (NetworkX / D3.js)", desc: "Renderizado interactivo de Ã¡rboles de descomposiciÃ³n matemÃ¡tica y redes de flujo." },
];

const MATH_DOMAINS = [
  "Ãlgebra SimbÃ³lica, TeorÃ­a de NÃºmeros & CriptografÃ­a",
  "InvestigaciÃ³n Operativa & OptimizaciÃ³n Combinatoria (MILP / Simplex)",
  "CÃ¡lculo Diferencial, Integral & Ecuaciones Diferenciales",
  "Probabilidad, Procesos EstocÃ¡sticos & TeorÃ­a de Colas",
  "Ãlgebra Lineal NumÃ©rica, Tensores & AnÃ¡lisis de Grafos",
  "MatemÃ¡ticas de CompeticiÃ³n & Razonamiento Formal (AIME / Olympiad)",
];

const COMPUTATION_ENGINES = [
  "SymPy (Ãlgebra simbÃ³lica determinista en Python)",
  "SciPy / PuLP / Google OR-Tools (Solucionadores de optimizaciÃ³n y programaciÃ³n lineal)",
  "NumPy + Numba JIT (CÃ¡lculo vectorial numÃ©rico de alto rendimiento)",
  "NetworkX (Algoritmos de teorÃ­a de grafos y optimizaciÃ³n de redes)",
  "Z3 Theorem Prover / Lean 4 (VerificaciÃ³n formal de demostraciones lÃ³gicas)",
  "DuckDB (Procesamiento analÃ­tico de grandes volÃºmenes de datos numÃ©ricos)",
];

const MATH_METRICS = [
  { id: "proof_validity", label: "Validez LÃ³gica de DemostraciÃ³n (ProofStep_Validity)", cat: "VerificaciÃ³n Formal", desc: "Tasa de pasos lÃ³gicos validados formalmente sin saltos deductivos no justificados." },
  { id: "symbolic_equiv", label: "Equivalencia SimbÃ³lica Exacta (SymPy Verification)", cat: "VerificaciÃ³n Formal", desc: "Exactitud algebraica determinista en simplificaciÃ³n y comprobaciÃ³n de identidades (lhs == rhs)." },
  { id: "optim_gap", label: "Brecha de Optimalidad (Optimality Gap %)", cat: "OptimizaciÃ³n & MILP", desc: "Distancia porcentual entre la soluciÃ³n encontrada por el solver y el Ã³ptimo global teÃ³rico." },
  { id: "time_to_solve", label: "Tiempo de Convergencia / Latencia Computacional", cat: "OptimizaciÃ³n & MILP", desc: "Tiempo en segundos/milisegundos requerido para alcanzar la convergencia del algoritmo de optimizaciÃ³n." },
  { id: "mc_convergence", label: "Error EstÃ¡ndar de Monte Carlo (SEM)", cat: "Probabilidad & EstocÃ¡stica", desc: "PrecisiÃ³n estadÃ­stica en simulaciones aleatorias en funciÃ³n del nÃºmero de iteraciones N." },
  { id: "tool_use_accuracy", label: "PrecisiÃ³n en Tool-Use de CÃ³digo Python (ToolBench)", cat: "Herramientas & Sandbox", desc: "Porcentaje de scripts de cÃ¡lculo Python generados y ejecutados sin errores sintÃ¡cticos ni lÃ³gicos." },
  { id: "competition_score", label: "Acierto en Problemas de CompeticiÃ³n (MATH_500 / AIME)", cat: "Razonamiento de CompeticiÃ³n", desc: "Porcentaje de problemas de olimpiada matemÃ¡tica resueltos con respuesta final exacta." },
  { id: "multiagent_coord", label: "Eficiencia de CoordinaciÃ³n Multi-Agente (MAFBench)", cat: "Sistemas Distribuidos", desc: "Ratio de subproblemas resueltos en paralelo sin colisiones, deadlocks ni inconsistencias de estado." },
];

const VALIDATION_MODELS = [
  "Arquitectura de Doble VerificaciÃ³n (Razonamiento LÃ³gico DeepSeek-R1 + Ãlgebra SimbÃ³lica SymPy)",
  "VerificaciÃ³n Formal Basada en Reglas LÃ³gicas y Teoremas Demostrados",
  "ValidaciÃ³n NumÃ©rica Cruzada con Solucionadores Deterministas (SciPy / OR-Tools)",
  "AuditorÃ­a SocrÃ¡tica Paso a Paso con Exigencia de JustificaciÃ³n de Premisas",
];

const SAFETY_GUARDRAILS = [
  "Tolerancia Cero a AlucinaciÃ³n AritmÃ©tica: DelegaciÃ³n Obligatoria de CÃ¡lculo a IntÃ©rprete Python",
  "Sandbox Aislado con Timeout Estricto (5s) para Evitar Bucles Infinitos en Ãlgebra SimbÃ³lica",
  "Marcado Obligatorio de Casos INDETERMINADOS cuando la Confianza del Modelo es < 90%",
  "ClÃ¡usula de Reproducibilidad: Semilla Aleatoria y Entorno Determinista Registrados en Informe",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard interactivo con renderizado KaTeX/LaTeX y grÃ¡ficos dinÃ¡micos)",
  "FastAPI + React / Next.js (Plataforma matemÃ¡tica web con editor LaTeX y ejecuciÃ³n asÃ­ncrona)",
  "Flet (AplicaciÃ³n de escritorio local .exe para estaciones de cÃ¡lculo aisladas sin nube)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (AlmacÃ©n analÃ­tico columnar para matrices, simulaciones y pistas de auditorÃ­a)",
  "SQLite con Soporte de Vectores NumÃ©ricos y JSON de Pasos",
  "Ficheros HDF5 / Parquet para Grandes VolÃºmenes de Series Temporales y Tensores",
  "Almacenamiento Local en Ficheros JSON-LD y Markdown con Bloques LaTeX",
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function getAutoMetrics(primaryId, secondaryIds) {
  const auto = new Set();
  if (primaryId === "M4.1") ["proof_validity", "symbolic_equiv"].forEach(m => auto.add(m));
  if (primaryId === "M4.2") ["optim_gap", "time_to_solve"].forEach(m => auto.add(m));
  if (primaryId === "M4.3") ["mc_convergence", "time_to_solve"].forEach(m => auto.add(m));
  if (primaryId === "M4.4") ["competition_score", "proof_validity"].forEach(m => auto.add(m));
  if (primaryId === "M4.5") ["multiagent_coord", "time_to_solve"].forEach(m => auto.add(m));
  if (primaryId === "M4.6") ["tool_use_accuracy", "symbolic_equiv"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-MATH-01")) ["symbolic_equiv"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-MATH-03")) ["mc_convergence"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-MATH-06")) ["proof_validity"].forEach(m => auto.add(m));
  return [...auto];
}

function getAutoStorage(secondaryIds, primaryId) {
  if (primaryId === "M4.1" || secondaryIds.includes("SEC-MATH-02") || secondaryIds.includes("SEC-MATH-04")) {
    return STORAGE_ENGINES[0]; // DuckDB + Parquet
  }
  return "";
}

function needsValidationStep(primaryId, secondaryIds) {
  return primaryId === "M4.1" || primaryId === "M4.4" || primaryId === "M4.6" || secondaryIds.includes("SEC-MATH-01") || secondaryIds.includes("SEC-MATH-06") || secondaryIds.includes("SEC-MATH-07");
}

// â”€â”€â”€ Generador del informe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function generateReport(data) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const primary = PRIMARY_TASKS.find(t => t.id === data.primaryTask);
  const secondaries = SECONDARY_TASKS.filter(s => data.secondaryTasks.includes(s.id));
  const metrics = MATH_METRICS.filter(m => data.selectedMetrics.includes(m.id));
  const appSlug = (data.appName || "math_app").toLowerCase().replace(/\s+/g, "_");
  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);
  const hasSEC01 = data.secondaryTasks.includes("SEC-MATH-01");
  const hasSEC02 = data.secondaryTasks.includes("SEC-MATH-02");
  const hasSEC03 = data.secondaryTasks.includes("SEC-MATH-03");
  const hasSEC04 = data.secondaryTasks.includes("SEC-MATH-04");
  const hasSEC05 = data.secondaryTasks.includes("SEC-MATH-05");
  const hasSEC06 = data.secondaryTasks.includes("SEC-MATH-06");
  const hasSEC07 = data.secondaryTasks.includes("SEC-MATH-07");
  const hasSEC08 = data.secondaryTasks.includes("SEC-MATH-08");

  const metricsByCategory = metrics.reduce((acc, m) => {
    if (!acc[m.cat]) acc[m.cat] = [];
    acc[m.cat].push(m);
    return acc;
  }, {});

  const treeLines = [
    appSlug + "/",
    "â”œâ”€â”€ src/",
    "â”‚   â”œâ”€â”€ __init__.py",
    "â”‚   â”œâ”€â”€ config.py                 # ParÃ¡metros numÃ©ricos, tolerancias Ã©psilon y timeouts",
    "â”‚   â”œâ”€â”€ schemas.py                # Modelos Pydantic v2 para pasos, demostraciones y tensores" + (hasSEC07 ? "\nâ”‚   â”‚                             # â†’ incluye middleware Guardrails de VerificaciÃ³n de Premisas (BR-MATH-05)" : ""),
    data.primaryTask === "M4.1" || hasSEC06 ? "â”‚   â”œâ”€â”€ proof_segmenter.py        # Segmentador atÃ³mico de cadenas de razonamiento (BR-MATH-01)" : null,
    data.primaryTask === "M4.1" || hasSEC01 ? "â”‚   â”œâ”€â”€ symbolic_verifier.py      # Motor de equivalencia algebraica con SymPy en sandbox aislado" : null,
    data.primaryTask === "M4.2" ? "â”‚   â”œâ”€â”€ optimization_solver.py    # Solucionador MILP / Simplex con SciPy y PuLP (BR-MATH-02)" : null,
    data.primaryTask === "M4.3" || hasSEC03 ? "â”‚   â”œâ”€â”€ stochastic_engine.py      # Simulador Monte Carlo paralelizado con Numba JIT (BR-MATH-03)" : null,
    data.primaryTask === "M4.5" ? "â”‚   â”œâ”€â”€ multiagent_coordinator.py # Coordinador de descomposiciÃ³n y sincronizaciÃ³n MAFBench" : null,
    data.primaryTask === "M4.6" ? "â”‚   â”œâ”€â”€ python_sandbox.py         # IntÃ©rprete Python seguro con NumPy/SciPy para tool-use determinista" : null,
    "â”‚   â”œâ”€â”€ storage.py                # " + (hasSEC04 ? "DuckDB + Parquet (BR-MATH-04) con registro inmutable de veredictos" : "Capa de persistencia matemÃ¡tica"),
    hasSEC08 ? "â”‚   â”œâ”€â”€ graph_visualizer.py       # Renderizador de grafos y Ã¡rboles de derivaciÃ³n con NetworkX" : null,
    "â”‚   â”œâ”€â”€ latex_reporter.py         # Generador de informes en LaTeX y Markdown con fÃ³rmulas KaTeX",
    "â”‚   â””â”€â”€ ui/",
    "â”‚       â”œâ”€â”€ __init__.py",
    "â”‚       â”œâ”€â”€ components.py         # Visor KaTeX, tarjetas de pasos anotados y paneles de convergencia",
    "â”‚       â””â”€â”€ main_view.py          # Dashboard de cÃ¡lculo y panel interactivo",
    "â”œâ”€â”€ tests/",
    "â”‚   â”œâ”€â”€ test_schemas.py           # ValidaciÃ³n de modelos y serializaciÃ³n de tensores",
    data.primaryTask === "M4.1" ? "â”‚   â”œâ”€â”€ test_symbolic_equiv.py    # BaterÃ­a de identidades algebraicas y simplificaciones SymPy" : null,
    data.primaryTask === "M4.2" ? "â”‚   â””â”€â”€ test_optimization.py      # Casos de prueba de optimizaciÃ³n lineal y convergencia" : null,
    "â”œâ”€â”€ data/                         # Datasets de prueba, problemas de olimpiada y cachÃ©",
    "â”œâ”€â”€ requirements.txt              # sympy, numpy, scipy, pulp, duckdb, pydantic, pytest",
    "â””â”€â”€ main.py                       # Punto de entrada de la aplicaciÃ³n matemÃ¡tica",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "M4.1" ? "- **BR-MATH-01 (Prisma MatemÃ¡tico):** Segmentador atÃ³mico activado; verificaciÃ³n simbÃ³lica SymPy en sandbox; veredicto por paso." : null,
    data.primaryTask === "M4.2" ? "- **BR-MATH-02 (Simplex Helios):** Motor MILP/Simplex activado; solucionadores SciPy/PuLP configurados con tolerancia 1e-6." : null,
    data.primaryTask === "M4.3" ? "- **BR-MATH-03 (Modelado EstocÃ¡stico):** Simulador Monte Carlo acelerado por Numba JIT activado; semilla aleatoria determinista." : null,
    hasSEC04 ? "- **BR-MATH-04 (Persistencia AnalÃ­tica):** AlmacÃ©n columnar preconfigurado en DuckDB + Parquet para matrices y series numÃ©ricas." : null,
    hasSEC07 ? "- **BR-MATH-05 (Guardrail AntialucinaciÃ³n NumÃ©rica):** DelegaciÃ³n obligatoria de cÃ¡lculos a intÃ©rprete Python determinista." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de verificaciÃ³n y rigor formal:** " + data.validationModel,
        "- **Guardrail de seguridad algorÃ­tmica:** " + data.safetyGuardrail,
        "- **Tolerancia Cero a Alucinaciones NumÃ©ricas:** NingÃºn cÃ¡lculo aritmÃ©tico o algebraico se confÃ­a a la memoria del LLM; todo se evalÃºa en SymPy/NumPy.",
        "- **Sandbox con Timeout Aislado:** LÃ­mite estricto de 5 segundos de ejecuciÃ³n por simplificaciÃ³n simbÃ³lica para evitar bloqueos por complejidad exponencial.",
        "- **Trazabilidad Formal:** Cada paso demostrado incluye su justificaciÃ³n axiomÃ¡tica y el estado de validaciÃ³n (VÃLIDO / INVÃLIDO / INDETERMINADO).",
      ].join("\n")
    : "La aplicaciÃ³n opera en modo de cÃ¡lculo directo o modelado probabilÃ­stico continuo.";

  const qaLines = [
    "1. **Pruebas de Equivalencia SimbÃ³lica:** BaterÃ­a de 200+ identidades algebraicas y trigonomÃ©tricas verificadas con SymPy simplify.",
    "2. **ValidaciÃ³n de Soluciones de OptimizaciÃ³n (KKT):** ComprobaciÃ³n de condiciones de Karush-Kuhn-Tucker en problemas no lineales.",
    "3. **Prueba de Determinismo Monte Carlo:** VerificaciÃ³n de reproducibilidad exacta de resultados estocÃ¡sticos al fijar la semilla aleatoria.",
    "4. **Prueba de Rendimiento de Inferencia:** Benchmark de segmentaciÃ³n y verificaciÃ³n de 50 pasos de derivaciÃ³n en menos de 2.5 segundos.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACIÃ“N TÃ‰CNICA",
    "## Proyecto de Software MatemÃ¡tico: " + data.appName,
    "",
    "**Fecha de GeneraciÃ³n:** " + now,
    "**Ãrea Horizon:** MatemÃ¡ticas, OptimizaciÃ³n & Procesos Complejos",
    "**Arquitecto / DiseÃ±ador:** " + (data.authorName || "Horizon User"),
    "**VersiÃ³n del Documento:** v1.0.0 (EspecificaciÃ³n Formal MatemÃ¡tica)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y PropÃ³sito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **DescripciÃ³n del nÃºcleo funcional:** " + (primary?.desc || ""),
    "- **PÃºblico objetivo:** " + (primary?.audience || ""),
    "- **Dominios matemÃ¡ticos de aplicaciÃ³n:** " + data.mathDomains.join(", "),
    "- **Motores y librerÃ­as de cÃ¡lculo seleccionados:** " + data.computationEngines.join(", "),
    "",
    "**Exclusiones explÃ­citas:** El sistema NO garantiza la resoluciÃ³n de problemas NP-completos fuera de los lÃ­mites computacionales del solver y NO asume veracidad en demostraciones no verificadas por el motor simbÃ³lico formal.",
    "",
    "---",
    "",
    "### 2. Matriz de Arquitectura y MÃ³dulos Complementarios",
    "",
    secondaries.length === 0 ? "_No se han seleccionado mÃ³dulos secundarios._" : secondaries.map(s => "- **[" + s.id + "] " + s.label + ":** " + s.desc).join("\n"),
    "",
    "**Reglas de lÃ³gica condicional aplicadas (Branching Rules):**",
    branchingLines || "_Ninguna regla de branching activada con la configuraciÃ³n actual._",
    "",
    "---",
    "",
    "### 3. CatÃ¡logo de MÃ©tricas y Rigor MatemÃ¡tico",
    "",
    "El sistema implementarÃ¡ y monitorizarÃ¡ las siguientes mÃ©tricas de precisiÃ³n y convergencia:",
    "",
    metricsSection || "_No se han seleccionado mÃ©tricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de VerificaciÃ³n Formal y Guardrails AntialucinaciÃ³n",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack TecnolÃ³gico y Estructura de Scripts Python",
    "",
    "- **Capa de PresentaciÃ³n (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos:** " + data.storageEngine,
    "- **ValidaciÃ³n de Datos:** Pydantic v2 con esquemas matemÃ¡ticos y tipado fuerte.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y ValidaciÃ³n (QA MatemÃ¡tico)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. ClÃ¡usula de Cumplimiento CientÃ­fico y Descargo de Responsabilidad",
    "",
    "> **AVISO CIENTÃFICO Y METODOLÃ“GICO OBLIGATORIO**",
    ">",
    "> Esta especificaciÃ³n tÃ©cnica y cualquier software desarrollado a partir de ella tiene carÃ¡cter **exclusivamente de investigaciÃ³n, cÃ¡lculo computacional y verificaciÃ³n formal**.",
    ">",
    "> - Todo resultado analÃ­tico, optimizaciÃ³n o demostraciÃ³n matemÃ¡tica debe ser **interpretado considerando las tolerancias numÃ©ricas y los lÃ­mites de precisiÃ³n** del motor computacional empleado.",
    "> - Las salidas generadas por modelos de lenguaje son auditadas por motores deterministas (SymPy / SciPy) antes de su certificaciÃ³n final.",
    ">",
    "> DiseÃ±ado en **Horizon â€” Centro Interactivo de IA Aplicada.** Laboratorio de MatemÃ¡ticas & Procesos Complejos.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de EspecificaciÃ³n TÃ©cnica â€” Generado automÃ¡ticamente por Horizon MathAppWizard v1.0_",
  ].filter(l => l !== null).join("\n");
}

// â”€â”€â”€ Componentes auxiliares â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ProgressBar({ step, total }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-dark/50 uppercase tracking-widest">Paso {step} de {total}</span>
        <span className="text-xs text-dark/35">{Math.round((step / total) * 100)}% completado</span>
      </div>
      <div className="h-1.5 bg-dark/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
              i + 1 < step
                ? "bg-indigo-600 text-white"
                : i + 1 === step
                ? "bg-indigo-600 text-white ring-4 ring-indigo-600/20"
                : "bg-dark/8 text-dark/30"
            }`}
          >
            {i + 1 < step ? <Check size={10} /> : i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavButtons({ onPrev, onNext, nextLabel = "Siguiente", disabled = false }) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark/8">
      {onPrev ? (
        <button onClick={onPrev} className="flex items-center gap-2 px-4 py-2.5 text-sm text-dark/60 hover:text-dark border border-dark/12 hover:border-dark/25 rounded-sm transition-colors">
          <ChevronLeft size={15} /> Anterior
        </button>
      ) : <div />}
      <button
        onClick={onNext}
        disabled={disabled}
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-sm transition-colors"
      >
        {nextLabel} <ChevronRight size={15} />
      </button>
    </div>
  );
}

function StepCard({ children }) {
  return (
    <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)]">
      {children}
    </div>
  );
}

function FieldLabel({ children, hint }) {
  return (
    <div className="mb-2">
      <label className="block text-[11px] font-bold uppercase tracking-widest text-dark/50">{children}</label>
      {hint && <p className="text-[12px] text-dark/35 mt-0.5">{hint}</p>}
    </div>
  );
}

function InputText({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-dark/[0.02] border border-dark/12 text-dark text-sm rounded-sm px-3.5 py-2.5 focus:outline-hidden focus:border-indigo-500 placeholder:text-dark/25 transition-colors"
    />
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="space-y-2.5">
      {options.map(opt => (
        <label
          key={opt.id || opt}
          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
            (value === (opt.id || opt))
              ? "border-indigo-500/40 bg-indigo-50/30"
              : "border-dark/10 hover:border-dark/20 hover:bg-dark/[0.01]"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            value === (opt.id || opt) ? "border-indigo-600" : "border-dark/25"
          }`}>
            {value === (opt.id || opt) && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
          </div>
          <input type="radio" className="sr-only" checked={value === (opt.id || opt)} onChange={() => onChange(opt.id || opt)} />
          <div>
            {opt.label ? (
              <>
                <p className="text-sm font-semibold text-dark"><span className="text-indigo-600 text-xs mr-1.5">{opt.id}</span>{opt.label}</p>
                <p className="text-[12.5px] text-dark/50 mt-0.5 leading-relaxed">{opt.desc}</p>
                {opt.audience && <p className="text-[11px] text-dark/35 mt-1"><span className="font-semibold">Destinatarios:</span> {opt.audience}</p>}
              </>
            ) : (
              <p className="text-sm text-dark">{opt}</p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

function CheckGroup({ options, selected, onChange, max = 4 }) {
  function toggle(id) {
    if (selected.includes(id)) {
      onChange(selected.filter(s => s !== id));
    } else if (selected.length < max) {
      onChange([...selected, id]);
    }
  }
  return (
    <div className="space-y-2">
      {options.map(opt => {
        const isChecked = selected.includes(opt.id || opt);
        const isDisabled = !isChecked && selected.length >= max;
        return (
          <label
            key={opt.id || opt}
            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
              isChecked ? "border-indigo-500/40 bg-indigo-50/30" : isDisabled ? "border-dark/6 opacity-40 cursor-not-allowed" : "border-dark/10 hover:border-dark/20"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${isChecked ? "border-indigo-600 bg-indigo-600" : "border-dark/25"}`}>
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={isChecked} disabled={isDisabled} onChange={() => !isDisabled && toggle(opt.id || opt)} />
            <div>
              {opt.label ? (
                <>
                  <p className="text-sm font-medium text-dark"><span className="text-xs text-indigo-600 mr-1">[{opt.id}]</span>{opt.label}</p>
                  <p className="text-[12px] text-dark/45 mt-0.5 leading-relaxed">{opt.desc}</p>
                </>
              ) : <p className="text-sm text-dark">{opt}</p>}
            </div>
          </label>
        );
      })}
    </div>
  );
}

function SelectGroup({ options, value, onChange }) {
  return (
    <div className="space-y-2">
      {options.map(opt => (
        <label
          key={opt}
          className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
            value === opt ? "border-indigo-500/40 bg-indigo-50/30" : "border-dark/10 hover:border-dark/20"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${value === opt ? "border-indigo-600" : "border-dark/25"}`}>
            {value === opt && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
          </div>
          <input type="radio" className="sr-only" checked={value === opt} onChange={() => onChange(opt)} />
          <p className="text-sm text-dark">{opt}</p>
        </label>
      ))}
    </div>
  );
}

// â”€â”€â”€ Componente principal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const TOTAL_STEPS = 6;

const initData = () => ({
  appName: "",
  authorName: "",
  primaryTask: "",
  secondaryTasks: [],
  mathDomains: [],
  computationEngines: [],
  selectedMetrics: [],
  validationModel: "",
  safetyGuardrail: "",
  uiFramework: "",
  storageEngine: "",
});

export default function WizardMatematicas() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initData);
  const [report, setReport] = useState("");
  const [errors, setErrors] = useState({});

  const set = useCallback((field) => (val) => setData(d => ({ ...d, [field]: val })), []);

  function handlePrimaryChange(val) {
    const autoMetrics = getAutoMetrics(val, data.secondaryTasks);
    const autoStorage = getAutoStorage(data.secondaryTasks, val);
    setData(d => ({
      ...d,
      primaryTask: val,
      selectedMetrics: autoMetrics,
      storageEngine: autoStorage || d.storageEngine,
    }));
  }

  function handleSecondaryChange(val) {
    const autoMetrics = getAutoMetrics(data.primaryTask, val);
    const autoStorage = getAutoStorage(val, data.primaryTask);
    setData(d => ({
      ...d,
      secondaryTasks: val,
      selectedMetrics: autoMetrics,
      storageEngine: autoStorage || d.storageEngine,
    }));
  }

  function validate() {
    const e = {};
    if (step === 1) {
      if (!data.appName.trim()) e.appName = "El nombre del proyecto es obligatorio.";
      if (!data.primaryTask) e.primaryTask = "Selecciona una tarea principal.";
    }
    if (step === 3) {
      if (data.mathDomains.length === 0) e.mathDomains = "Selecciona al menos un dominio matemÃ¡tico.";
      if (data.computationEngines.length === 0) e.computationEngines = "Selecciona al menos un motor de cÃ¡lculo.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una mÃ©trica matemÃ¡tica.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de verificaciÃ³n matemÃ¡tica.";
      if (!data.safetyGuardrail) e.safetyGuardrail = "Selecciona el guardrail de seguridad algorÃ­tmica.";
    }
    if (step === 6) {
      if (!data.uiFramework) e.uiFramework = "Selecciona el framework de interfaz.";
      if (!data.storageEngine) e.storageEngine = "Selecciona el motor de persistencia.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    if (step === 6) {
      setReport(generateReport(data));
      setStep(7);
    } else {
      setStep(s => s + 1);
    }
  }

  function prev() { setStep(s => Math.max(1, s - 1)); }

  function reset() { setData(initData()); setStep(1); setReport(""); setErrors({}); }

  function downloadMd() {
    const blob = new Blob([report], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `informe_${(data.appName || "math_app").toLowerCase().replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);

  return (
    <div className="min-h-full bg-[#F7F6F2]">
      <div className="max-w-[820px] mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-8">
          <Link to="/areas/matematicas" className="inline-flex items-center gap-1.5 text-xs text-dark/40 hover:text-dark transition-colors mb-6">
            <ArrowLeft size={13} /> Laboratorio de MatemÃ¡ticas
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center shrink-0 text-indigo-600 font-display text-xl">âˆ‘</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                DiseÃ±ador de Proyectos â€” MatemÃ¡ticas & OptimizaciÃ³n
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicaciÃ³n matemÃ¡tica paso a paso con rigor formal, verificaciÃ³n simbÃ³lica y optimizaciÃ³n combinatoria.
              </p>
            </div>
          </div>
        </div>

        {/* â”€â”€ PASOS 1-6 â”€â”€ */}
        {step <= TOTAL_STEPS && (
          <>
            <ProgressBar step={step} total={TOTAL_STEPS} />

            {/* PASO 1 */}
            {step === 1 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 1 â€” Tarea Principal</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona el nÃºcleo funcional que definirÃ¡ la arquitectura de tu aplicaciÃ³n matemÃ¡tica.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="SerÃ¡ el tÃ­tulo de tu especificaciÃ³n tÃ©cnica matemÃ¡tica.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Prisma MatemÃ¡tico, Simplex Helios, Predictor Riesgo, GraphFlowâ€¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias o departamento de I+D / MatemÃ¡ticas.">DiseÃ±ador / Equipo de InvestigaciÃ³n</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Investigador Cuantitativo, Grupo de OptimizaciÃ³nâ€¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la funciÃ³n matemÃ¡tica principal. Esto determinarÃ¡ los motores computacionales y guardrails requeridos.">Tarea principal de la aplicaciÃ³n</FieldLabel>
                    <RadioGroup options={PRIMARY_TASKS} value={data.primaryTask} onChange={handlePrimaryChange} />
                    {errors.primaryTask && <p className="text-red-500 text-xs mt-2">{errors.primaryTask}</p>}
                  </div>
                </div>

                <NavButtons onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 2 */}
            {step === 2 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 2 â€” MÃ³dulos Complementarios</h2>
                <p className="text-dark/45 text-sm mb-6">AÃ±ade hasta <strong>4 capacidades computacionales y de verificaciÃ³n</strong> para robustecer el sistema.</p>

                <div className="bg-indigo-500/[0.04] border border-indigo-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
                  <strong className="text-dark">Tarea principal seleccionada:</strong> [{data.primaryTask}]{" "}
                  {PRIMARY_TASKS.find(t => t.id === data.primaryTask)?.label}
                </div>

                <FieldLabel hint="Selecciona entre 0 y 4 mÃ³dulos secundarios.">MÃ³dulos secundarios</FieldLabel>
                <CheckGroup options={SECONDARY_TASKS} selected={data.secondaryTasks} onChange={handleSecondaryChange} max={4} />
                <p className="text-[11px] text-dark/30 mt-2">{data.secondaryTasks.length} / 4 mÃ³dulos seleccionados</p>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 3 */}
            {step === 3 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 â€” Dominio MatemÃ¡tico & Motores de CÃ¡lculo</h2>
                <p className="text-dark/45 text-sm mb-6">Configura las Ã¡reas teÃ³ricas y los motores de Ã¡lgebra computacional que utilizarÃ¡ el sistema.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Campos matemÃ¡ticos y ramas teÃ³ricas principales.">Dominios matemÃ¡ticos de aplicaciÃ³n</FieldLabel>
                    <CheckGroup options={MATH_DOMAINS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.mathDomains} onChange={set("mathDomains")} max={6} />
                    {errors.mathDomains && <p className="text-red-500 text-xs mt-1.5">{errors.mathDomains}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Motores de Ã¡lgebra computacional, optimizaciÃ³n y cÃ¡lculo numÃ©rico.">Motores y librerÃ­as de cÃ¡lculo</FieldLabel>
                    <CheckGroup options={COMPUTATION_ENGINES.map(a => ({ id: a, label: a, desc: "" }))} selected={data.computationEngines} onChange={set("computationEngines")} max={6} />
                    {errors.computationEngines && <p className="text-red-500 text-xs mt-1.5">{errors.computationEngines}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 4 */}
            {step === 4 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 â€” CatÃ¡logo de MÃ©tricas MatemÃ¡ticas</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las mÃ©tricas de rigor formal, convergencia y optimalidad que evaluarÃ¡ el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-indigo-800">
                    âœ“ {data.selectedMetrics.length} mÃ©trica{data.selectedMetrics.length !== 1 ? "s" : ""} matemÃ¡tica{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automÃ¡ticamente segÃºn tu tarea principal.
                  </div>
                )}

                {["VerificaciÃ³n Formal", "OptimizaciÃ³n & MILP", "Probabilidad & EstocÃ¡stica", "Herramientas & Sandbox", "Razonamiento de CompeticiÃ³n", "Sistemas Distribuidos"].map(cat => (
                  <div key={cat} className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-dark/40 mb-2.5">{cat}</p>
                    <div className="space-y-1.5">
                      {MATH_METRICS.filter(m => m.cat === cat).map(m => {
                        const isChecked = data.selectedMetrics.includes(m.id);
                        return (
                          <label key={m.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? "border-indigo-500/30 bg-indigo-50/30" : "border-dark/8 hover:border-dark/15"}`}>
                            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${isChecked ? "border-indigo-600 bg-indigo-600" : "border-dark/20"}`}>
                              {isChecked && <Check size={10} className="text-white" />}
                            </div>
                            <input type="checkbox" className="sr-only" checked={isChecked} onChange={() => {
                              set("selectedMetrics")(isChecked ? data.selectedMetrics.filter(x => x !== m.id) : [...data.selectedMetrics, m.id]);
                            }} />
                            <div>
                              <p className="text-sm font-medium text-dark">{m.label}</p>
                              <p className="text-[12px] text-dark/40 mt-0.5">{m.desc}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {errors.selectedMetrics && <p className="text-red-500 text-xs mt-1">{errors.selectedMetrics}</p>}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 5 */}
            {step === 5 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 â€” Rigor Formal y Guardrails AntialucinaciÃ³n</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-indigo-800 flex items-start gap-2">
                      <Calculator size={16} className="shrink-0 mt-0.5 text-indigo-600" />
                      Este paso estÃ¡ activo para garantizar la validez deductiva y la ausencia de alucinaciÃ³n en operaciones algebraicas y numÃ©ricas.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de verificaciÃ³n de pasos de derivaciÃ³n o soluciones de optimizaciÃ³n.">Modelo de verificaciÃ³n formal</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="RestricciÃ³n de seguridad activa para evitar fallos de cÃ¡lculo o bucles infinitos.">Guardrail de seguridad algorÃ­tmica</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios de rigor formal (activados por diseÃ±o)</p>
                        {[
                          "Tolerancia Cero a AlucinaciÃ³n AritmÃ©tica: todo cÃ¡lculo se delega a SymPy/NumPy.",
                          "Sandbox Aislado con Timeout (5s) para simplificaciones algebraicas complejas.",
                          "Reproducibilidad Total: registro de semilla aleatoria y configuraciÃ³n de entorno determinista.",
                        ].map(c => (
                          <div key={c} className="flex items-start gap-2.5 mb-2 last:mb-0">
                            <div className="w-4 h-4 rounded bg-indigo-100 border border-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} className="text-indigo-700" />
                            </div>
                            <p className="text-[12.5px] text-dark/60 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo cÃ¡lculo numÃ©rico directo o simulaciÃ³n estocÃ¡stica</strong> sin auditorÃ­a de demostraciones en tiempo real.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides aÃ±adir verificaciÃ³n simbÃ³lica de pasos o auditorÃ­a de equivalencias, vuelve al <strong>Paso 2</strong> y activa el mÃ³dulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-MATH-01</code> o <code className="bg-dark/5 px-1 rounded text-xs">SEC-MATH-06</code>.
                    </div>
                  </div>
                )}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 6 */}
            {step === 6 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 6 â€” Stack TecnolÃ³gico & Persistencia</h2>
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y librerÃ­as que darÃ¡n soporte a tu aplicaciÃ³n matemÃ¡tica.</p>

                {data.secondaryTasks.includes("SEC-MATH-04") && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-indigo-800">
                    âœ“ Persistencia analÃ­tica preconfigurada en <strong>DuckDB + Parquet</strong> por el mÃ³dulo SEC-MATH-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para investigadores y analistas cuantitativos.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="AlmacÃ©n de matrices, grafos, series temporales y resultados de simulaciÃ³n.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar EspecificaciÃ³n MatemÃ¡tica" />
              </StepCard>
            )}
          </>
        )}

        {/* â”€â”€ PANTALLA FINAL: INFORME â”€â”€ */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-indigo-100 border border-indigo-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-indigo-700" />
                </div>
                <h2 className="font-display text-[24px] text-dark">EspecificaciÃ³n matemÃ¡tica generada con Ã©xito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria tÃ©cnica para <strong className="text-dark">{data.appName}</strong> estÃ¡ lista para desarrollo y ejecuciÃ³n computacional.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={downloadMd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-sm transition-colors"
                >
                  <Download size={15} /> Descargar Informe (.md)
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-5 py-2.5 border border-dark/15 hover:border-dark/30 text-dark/70 hover:text-dark text-sm font-medium rounded-sm transition-colors"
                >
                  <RefreshCw size={15} /> Crear otro diseÃ±o
                </button>
              </div>
            </div>

            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.05)]">
              <ReportRenderer markdown={report} />
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 flex gap-3">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[13px] text-amber-800 leading-relaxed">
                <strong>Aviso cientÃ­fico y metodolÃ³gico:</strong> Este informe especifica una arquitectura de software de cÃ¡lculo y verificaciÃ³n formal. Toda soluciÃ³n debe interpretarse dentro de las tolerancias numÃ©ricas y los lÃ­mites teÃ³ricos del solucionador empleado.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// â”€â”€â”€ Renderizador de Markdown ligero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ReportRenderer({ markdown }) {
  const lines = markdown.split("\n");

  return (
    <div className="space-y-1.5 text-[14px] text-dark/75 leading-[1.8] font-sans">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) return <h1 key={i} className="font-display text-[28px] text-dark tracking-[-0.02em] mt-2 mb-2">{line.slice(2)}</h1>;
        if (line.startsWith("## ")) return <h2 key={i} className="font-display text-[22px] text-dark tracking-[-0.01em] mt-6 mb-1">{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i} className="font-semibold text-[15px] text-dark mt-5 mb-1 pb-1.5 border-b border-dark/8">{line.slice(4)}</h3>;
        if (line.startsWith("---")) return <hr key={i} className="border-dark/10 my-4" />;
        if (line.startsWith("```")) return null;
        if (line.startsWith("- **") || line.startsWith("- ")) {
          return (
            <div key={i} className="flex items-start gap-2 pl-2">
              <span className="text-indigo-600 mt-1.5 shrink-0">â€¢</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (/^\d+\. /.test(line)) {
          const num = line.match(/^(\d+)\./)[1];
          return (
            <div key={i} className="flex items-start gap-2.5 pl-2">
              <span className="text-indigo-600 font-semibold text-xs mt-1 shrink-0 w-4">{num}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, "")) }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-4 border-indigo-500 bg-indigo-50 px-4 py-2 rounded-r-lg text-[13px] text-indigo-950 my-2">
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-semibold text-dark" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />;
        }
        if (line.trim() === "") return <div key={i} className="h-2" />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />;
      })}
    </div>
  );
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-dark/5 px-1 py-0.5 rounded text-[12px] font-mono text-dark/70">$1</code>');
}

