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

// â”€â”€â”€ Constantes de datos (Matemáticas & Procesos Complejos) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRIMARY_TASKS = [
  {
    id: "M4.1",
    label: "Auditor Lógico y Verificador Simbólico de Demostraciones (Prisma Matemático)",
    desc: "Segmentación de derivaciones matemáticas paso a paso, verificación lógica formal (DeepSeek-R1) y comprobación de equivalencia algebraica mediante álgebra computacional (SymPy).",
    audience: "Investigadores matemáticos, desarrolladores de algoritmos, profesores universitarios, analistas formales.",
  },
  {
    id: "M4.2",
    label: "Motor de Optimización Combinatoria y Programación Lineal Mixta (Simplex Helios)",
    desc: "Resolución exacta y aproximada de problemas de investigación operativa (MILP, Simplex, Branch-and-Bound, metaheurísticas) para logística, despacho energético y asignación de recursos con SciPy/PuLP/OR-Tools.",
    audience: "Ingenieros de operaciones, quants, planificadores de redes logísticas y energéticas.",
  },
  {
    id: "M4.3",
    label: "Predictor de Riesgo Operacional y Modelado Estocástico de Colas Pesadas",
    desc: "Estimación de distribuciones de valores extremos (EVT), cadenas de Markov, procesos de Poisson no homogéneos y simulaciones Monte Carlo aceleradas por GPU/Numba.",
    audience: "Gestores de riesgo operacional, actuarios de seguros, analistas de fiabilidad de sistemas críticos.",
  },
  {
    id: "M4.4",
    label: "Solucionador Multi-Paso de Matemáticas de Competición (Olimpiadas / AIME / Putnam)",
    desc: "Resolución con razonamiento extendido en tiempo de inferencia (o1 / DeepSeek-R1) y verificación socrática paso a paso en teoría de números, combinatoria y geometría analítica.",
    audience: "Estudiantes de olimpiadas, entrenadores de competición matemática, analistas de razonamiento formal.",
  },
  {
    id: "M4.5",
    label: "Sistema Multi-Agente Coordinado para Problemas Matemáticos Distribuidos (MAFBench)",
    desc: "Descomposición estratégica de problemas complejos en subproblemas concurrentes resueltos por agentes especializados con sincronización de estado y convergencia garantizada.",
    audience: "Científicos de la computación, arquitectos de agentes distribuidos, equipos de I+D algorítmico.",
  },
  {
    id: "M4.6",
    label: "Calculador Simbólico-Numérico Híbrido con Tool-Use y Código Python Validado",
    desc: "Integración de LLMs con entornos aislados de ejecución de código (Python Sandbox) para cálculo tensorial, cálculo diferencial y álgebra lineal con NumPy/SciPy sin alucinación numérica.",
    audience: "Científicos de datos, ingenieros de simulación física, investigadores cuantitativos.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-MATH-01", label: "Verificador de Equivalencia Simbólica con SymPy Sandbox", desc: "Ejecución determinista de simplify(lhs - rhs) == 0 en entorno aislado con control de timeout estricto." },
  { id: "SEC-MATH-02", label: "Generador de Informes con Salida LaTeX y Trazabilidad en DuckDB", desc: "Renderizado de fórmulas en LaTeX con anotación de estado por paso y registro inmutable de verificaciones." },
  { id: "SEC-MATH-03", label: "Motor de Simulación Monte Carlo Paralelizado (Multiprocessing / Numba JIT)", desc: "Aceleración computacional de 1.000.000+ iteraciones con compilación JIT y fijación de semilla determinista." },
  { id: "SEC-MATH-04", label: "Almacén Columnar de Series y Resultados Matemáticos (DuckDB + Parquet)", desc: "Persistencia analítica de matrices, vectores de estado y soluciones de optimización." },
  { id: "SEC-MATH-05", label: "Exportador a Formatos Computacionales (JSON-Schema, Python Script, Jupyter Notebook)", desc: "Generación de código Python listo para ejecutar y notebooks reproducibles." },
  { id: "SEC-MATH-06", label: "Detector de Pasos de Razonamiento Inválidos o Desconectados (ProofStep Auditor)", desc: "Identificación de saltos lógicos no justificados, divisiones por cero potenciales y uso de lemas no demostrados." },
  { id: "SEC-MATH-07", label: "Asistente Socrático Antialucinación con Verificación de Premisas", desc: "Restricción severa que exige validación explícita de condiciones de contorno antes de aceptar cualquier solución." },
  { id: "SEC-MATH-08", label: "Visualizador de Grafos de Decisión y Topología de Redes (NetworkX / D3.js)", desc: "Renderizado interactivo de árboles de descomposición matemática y redes de flujo." },
];

const MATH_DOMAINS = [
  "Álgebra Simbólica, Teoría de Números & Criptografía",
  "Investigación Operativa & Optimización Combinatoria (MILP / Simplex)",
  "Cálculo Diferencial, Integral & Ecuaciones Diferenciales",
  "Probabilidad, Procesos Estocásticos & Teoría de Colas",
  "Álgebra Lineal Numérica, Tensores & Análisis de Grafos",
  "Matemáticas de Competición & Razonamiento Formal (AIME / Olympiad)",
];

const COMPUTATION_ENGINES = [
  "SymPy (Álgebra simbólica determinista en Python)",
  "SciPy / PuLP / Google OR-Tools (Solucionadores de optimización y programación lineal)",
  "NumPy + Numba JIT (Cálculo vectorial numérico de alto rendimiento)",
  "NetworkX (Algoritmos de teoría de grafos y optimización de redes)",
  "Z3 Theorem Prover / Lean 4 (Verificación formal de demostraciones lógicas)",
  "DuckDB (Procesamiento analítico de grandes volúmenes de datos numéricos)",
];

const MATH_METRICS = [
  { id: "proof_validity", label: "Validez Lógica de Demostración (ProofStep_Validity)", cat: "Verificación Formal", desc: "Tasa de pasos lógicos validados formalmente sin saltos deductivos no justificados." },
  { id: "symbolic_equiv", label: "Equivalencia Simbólica Exacta (SymPy Verification)", cat: "Verificación Formal", desc: "Exactitud algebraica determinista en simplificación y comprobación de identidades (lhs == rhs)." },
  { id: "optim_gap", label: "Brecha de Optimalidad (Optimality Gap %)", cat: "Optimización & MILP", desc: "Distancia porcentual entre la solución encontrada por el solver y el óptimo global teórico." },
  { id: "time_to_solve", label: "Tiempo de Convergencia / Latencia Computacional", cat: "Optimización & MILP", desc: "Tiempo en segundos/milisegundos requerido para alcanzar la convergencia del algoritmo de optimización." },
  { id: "mc_convergence", label: "Error Estándar de Monte Carlo (SEM)", cat: "Probabilidad & Estocástica", desc: "Precisión estadística en simulaciones aleatorias en función del número de iteraciones N." },
  { id: "tool_use_accuracy", label: "Precisión en Tool-Use de Código Python (ToolBench)", cat: "Herramientas & Sandbox", desc: "Porcentaje de scripts de cálculo Python generados y ejecutados sin errores sintácticos ni lógicos." },
  { id: "competition_score", label: "Acierto en Problemas de Competición (MATH_500 / AIME)", cat: "Razonamiento de Competición", desc: "Porcentaje de problemas de olimpiada matemática resueltos con respuesta final exacta." },
  { id: "multiagent_coord", label: "Eficiencia de Coordinación Multi-Agente (MAFBench)", cat: "Sistemas Distribuidos", desc: "Ratio de subproblemas resueltos en paralelo sin colisiones, deadlocks ni inconsistencias de estado." },
];

const VALIDATION_MODELS = [
  "Arquitectura de Doble Verificación (Razonamiento Lógico DeepSeek-R1 + Álgebra Simbólica SymPy)",
  "Verificación Formal Basada en Reglas Lógicas y Teoremas Demostrados",
  "Validación Numérica Cruzada con Solucionadores Deterministas (SciPy / OR-Tools)",
  "Auditoría Socrática Paso a Paso con Exigencia de Justificación de Premisas",
];

const SAFETY_GUARDRAILS = [
  "Tolerancia Cero a Alucinación Aritmética: Delegación Obligatoria de Cálculo a Intérprete Python",
  "Sandbox Aislado con Timeout Estricto (5s) para Evitar Bucles Infinitos en Álgebra Simbólica",
  "Marcado Obligatorio de Casos INDETERMINADOS cuando la Confianza del Modelo es < 90%",
  "Cláusula de Reproducibilidad: Semilla Aleatoria y Entorno Determinista Registrados en Informe",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard interactivo con renderizado KaTeX/LaTeX y gráficos dinámicos)",
  "FastAPI + React / Next.js (Plataforma matemática web con editor LaTeX y ejecución asíncrona)",
  "Flet (Aplicación de escritorio local .exe para estaciones de cálculo aisladas sin nube)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (Almacén analítico columnar para matrices, simulaciones y pistas de auditoría)",
  "SQLite con Soporte de Vectores Numéricos y JSON de Pasos",
  "Ficheros HDF5 / Parquet para Grandes Volúmenes de Series Temporales y Tensores",
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
    "â”‚   â”œâ”€â”€ config.py                 # Parámetros numéricos, tolerancias épsilon y timeouts",
    "â”‚   â”œâ”€â”€ schemas.py                # Modelos Pydantic v2 para pasos, demostraciones y tensores" + (hasSEC07 ? "\nâ”‚   â”‚                             # â†’ incluye middleware Guardrails de Verificación de Premisas (BR-MATH-05)" : ""),
    data.primaryTask === "M4.1" || hasSEC06 ? "â”‚   â”œâ”€â”€ proof_segmenter.py        # Segmentador atómico de cadenas de razonamiento (BR-MATH-01)" : null,
    data.primaryTask === "M4.1" || hasSEC01 ? "â”‚   â”œâ”€â”€ symbolic_verifier.py      # Motor de equivalencia algebraica con SymPy en sandbox aislado" : null,
    data.primaryTask === "M4.2" ? "â”‚   â”œâ”€â”€ optimization_solver.py    # Solucionador MILP / Simplex con SciPy y PuLP (BR-MATH-02)" : null,
    data.primaryTask === "M4.3" || hasSEC03 ? "â”‚   â”œâ”€â”€ stochastic_engine.py      # Simulador Monte Carlo paralelizado con Numba JIT (BR-MATH-03)" : null,
    data.primaryTask === "M4.5" ? "â”‚   â”œâ”€â”€ multiagent_coordinator.py # Coordinador de descomposición y sincronización MAFBench" : null,
    data.primaryTask === "M4.6" ? "â”‚   â”œâ”€â”€ python_sandbox.py         # Intérprete Python seguro con NumPy/SciPy para tool-use determinista" : null,
    "â”‚   â”œâ”€â”€ storage.py                # " + (hasSEC04 ? "DuckDB + Parquet (BR-MATH-04) con registro inmutable de veredictos" : "Capa de persistencia matemática"),
    hasSEC08 ? "â”‚   â”œâ”€â”€ graph_visualizer.py       # Renderizador de grafos y árboles de derivación con NetworkX" : null,
    "â”‚   â”œâ”€â”€ latex_reporter.py         # Generador de informes en LaTeX y Markdown con fórmulas KaTeX",
    "â”‚   â””â”€â”€ ui/",
    "â”‚       â”œâ”€â”€ __init__.py",
    "â”‚       â”œâ”€â”€ components.py         # Visor KaTeX, tarjetas de pasos anotados y paneles de convergencia",
    "â”‚       â””â”€â”€ main_view.py          # Dashboard de cálculo y panel interactivo",
    "â”œâ”€â”€ tests/",
    "â”‚   â”œâ”€â”€ test_schemas.py           # Validación de modelos y serialización de tensores",
    data.primaryTask === "M4.1" ? "â”‚   â”œâ”€â”€ test_symbolic_equiv.py    # Batería de identidades algebraicas y simplificaciones SymPy" : null,
    data.primaryTask === "M4.2" ? "â”‚   â””â”€â”€ test_optimization.py      # Casos de prueba de optimización lineal y convergencia" : null,
    "â”œâ”€â”€ data/                         # Datasets de prueba, problemas de olimpiada y caché",
    "â”œâ”€â”€ requirements.txt              # sympy, numpy, scipy, pulp, duckdb, pydantic, pytest",
    "â””â”€â”€ main.py                       # Punto de entrada de la aplicación matemática",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "M4.1" ? "- **BR-MATH-01 (Prisma Matemático):** Segmentador atómico activado; verificación simbólica SymPy en sandbox; veredicto por paso." : null,
    data.primaryTask === "M4.2" ? "- **BR-MATH-02 (Simplex Helios):** Motor MILP/Simplex activado; solucionadores SciPy/PuLP configurados con tolerancia 1e-6." : null,
    data.primaryTask === "M4.3" ? "- **BR-MATH-03 (Modelado Estocástico):** Simulador Monte Carlo acelerado por Numba JIT activado; semilla aleatoria determinista." : null,
    hasSEC04 ? "- **BR-MATH-04 (Persistencia Analítica):** Almacén columnar preconfigurado en DuckDB + Parquet para matrices y series numéricas." : null,
    hasSEC07 ? "- **BR-MATH-05 (Guardrail Antialucinación Numérica):** Delegación obligatoria de cálculos a intérprete Python determinista." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de verificación y rigor formal:** " + data.validationModel,
        "- **Guardrail de seguridad algorítmica:** " + data.safetyGuardrail,
        "- **Tolerancia Cero a Alucinaciones Numéricas:** Ningún cálculo aritmético o algebraico se confía a la memoria del LLM; todo se evalúa en SymPy/NumPy.",
        "- **Sandbox con Timeout Aislado:** Límite estricto de 5 segundos de ejecución por simplificación simbólica para evitar bloqueos por complejidad exponencial.",
        "- **Trazabilidad Formal:** Cada paso demostrado incluye su justificación axiomática y el estado de validación (VÁLIDO / INVÁLIDO / INDETERMINADO).",
      ].join("\n")
    : "La aplicación opera en modo de cálculo directo o modelado probabilístico continuo.";

  const qaLines = [
    "1. **Pruebas de Equivalencia Simbólica:** Batería de 200+ identidades algebraicas y trigonométricas verificadas con SymPy simplify.",
    "2. **Validación de Soluciones de Optimización (KKT):** Comprobación de condiciones de Karush-Kuhn-Tucker en problemas no lineales.",
    "3. **Prueba de Determinismo Monte Carlo:** Verificación de reproducibilidad exacta de resultados estocásticos al fijar la semilla aleatoria.",
    "4. **Prueba de Rendimiento de Inferencia:** Benchmark de segmentación y verificación de 50 pasos de derivación en menos de 2.5 segundos.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACIÃ“N TÃ‰CNICA",
    "## Proyecto de Software Matemático: " + data.appName,
    "",
    "**Fecha de Generación:** " + now,
    "**Área Horizon:** Matemáticas, Optimización & Procesos Complejos",
    "**Arquitecto / Diseñador:** " + (data.authorName || "Horizon User"),
    "**Versión del Documento:** v1.0.0 (Especificación Formal Matemática)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y Propósito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **Descripción del núcleo funcional:** " + (primary?.desc || ""),
    "- **Público objetivo:** " + (primary?.audience || ""),
    "- **Dominios matemáticos de aplicación:** " + data.mathDomains.join(", "),
    "- **Motores y librerías de cálculo seleccionados:** " + data.computationEngines.join(", "),
    "",
    "**Exclusiones explícitas:** El sistema NO garantiza la resolución de problemas NP-completos fuera de los límites computacionales del solver y NO asume veracidad en demostraciones no verificadas por el motor simbólico formal.",
    "",
    "---",
    "",
    "### 2. Matriz de Arquitectura y Módulos Complementarios",
    "",
    secondaries.length === 0 ? "_No se han seleccionado módulos secundarios._" : secondaries.map(s => "- **[" + s.id + "] " + s.label + ":** " + s.desc).join("\n"),
    "",
    "**Reglas de lógica condicional aplicadas (Branching Rules):**",
    branchingLines || "_Ninguna regla de branching activada con la configuración actual._",
    "",
    "---",
    "",
    "### 3. Catálogo de Métricas y Rigor Matemático",
    "",
    "El sistema implementará y monitorizará las siguientes métricas de precisión y convergencia:",
    "",
    metricsSection || "_No se han seleccionado métricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de Verificación Formal y Guardrails Antialucinación",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack Tecnológico y Estructura de Scripts Python",
    "",
    "- **Capa de Presentación (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos:** " + data.storageEngine,
    "- **Validación de Datos:** Pydantic v2 con esquemas matemáticos y tipado fuerte.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y Validación (QA Matemático)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. Cláusula de Cumplimiento Científico y Descargo de Responsabilidad",
    "",
    "> **AVISO CIENTÍFICO Y METODOLÃ“GICO OBLIGATORIO**",
    ">",
    "> Esta especificación técnica y cualquier software desarrollado a partir de ella tiene carácter **exclusivamente de investigación, cálculo computacional y verificación formal**.",
    ">",
    "> - Todo resultado analítico, optimización o demostración matemática debe ser **interpretado considerando las tolerancias numéricas y los límites de precisión** del motor computacional empleado.",
    "> - Las salidas generadas por modelos de lenguaje son auditadas por motores deterministas (SymPy / SciPy) antes de su certificación final.",
    ">",
    "> Diseñado en **Horizon â€” Centro Interactivo de IA Aplicada.** Laboratorio de Matemáticas & Procesos Complejos.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de Especificación Técnica â€” Generado automáticamente por Horizon MathAppWizard v1.0_",
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
      if (data.mathDomains.length === 0) e.mathDomains = "Selecciona al menos un dominio matemático.";
      if (data.computationEngines.length === 0) e.computationEngines = "Selecciona al menos un motor de cálculo.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una métrica matemática.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de verificación matemática.";
      if (!data.safetyGuardrail) e.safetyGuardrail = "Selecciona el guardrail de seguridad algorítmica.";
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
            <ArrowLeft size={13} /> Laboratorio de Matemáticas
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center shrink-0 text-indigo-600 font-display text-xl">âˆ‘</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                Diseñador de Proyectos â€” Matemáticas & Optimización
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicación matemática paso a paso con rigor formal, verificación simbólica y optimización combinatoria.
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
                <p className="text-dark/45 text-sm mb-6">Selecciona el núcleo funcional que definirá la arquitectura de tu aplicación matemática.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="Será el título de tu especificación técnica matemática.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Prisma Matemático, Simplex Helios, Predictor Riesgo, GraphFlowâ€¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias o departamento de I+D / Matemáticas.">Diseñador / Equipo de Investigación</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Investigador Cuantitativo, Grupo de Optimizaciónâ€¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la función matemática principal. Esto determinará los motores computacionales y guardrails requeridos.">Tarea principal de la aplicación</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 2 â€” Módulos Complementarios</h2>
                <p className="text-dark/45 text-sm mb-6">Añade hasta <strong>4 capacidades computacionales y de verificación</strong> para robustecer el sistema.</p>

                <div className="bg-indigo-500/[0.04] border border-indigo-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
                  <strong className="text-dark">Tarea principal seleccionada:</strong> [{data.primaryTask}]{" "}
                  {PRIMARY_TASKS.find(t => t.id === data.primaryTask)?.label}
                </div>

                <FieldLabel hint="Selecciona entre 0 y 4 módulos secundarios.">Módulos secundarios</FieldLabel>
                <CheckGroup options={SECONDARY_TASKS} selected={data.secondaryTasks} onChange={handleSecondaryChange} max={4} />
                <p className="text-[11px] text-dark/30 mt-2">{data.secondaryTasks.length} / 4 módulos seleccionados</p>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 3 */}
            {step === 3 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 â€” Dominio Matemático & Motores de Cálculo</h2>
                <p className="text-dark/45 text-sm mb-6">Configura las áreas teóricas y los motores de álgebra computacional que utilizará el sistema.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Campos matemáticos y ramas teóricas principales.">Dominios matemáticos de aplicación</FieldLabel>
                    <CheckGroup options={MATH_DOMAINS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.mathDomains} onChange={set("mathDomains")} max={6} />
                    {errors.mathDomains && <p className="text-red-500 text-xs mt-1.5">{errors.mathDomains}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Motores de álgebra computacional, optimización y cálculo numérico.">Motores y librerías de cálculo</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 â€” Catálogo de Métricas Matemáticas</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las métricas de rigor formal, convergencia y optimalidad que evaluará el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-indigo-800">
                    âœ“ {data.selectedMetrics.length} métrica{data.selectedMetrics.length !== 1 ? "s" : ""} matemática{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automáticamente según tu tarea principal.
                  </div>
                )}

                {["Verificación Formal", "Optimización & MILP", "Probabilidad & Estocástica", "Herramientas & Sandbox", "Razonamiento de Competición", "Sistemas Distribuidos"].map(cat => (
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 â€” Rigor Formal y Guardrails Antialucinación</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-indigo-800 flex items-start gap-2">
                      <Calculator size={16} className="shrink-0 mt-0.5 text-indigo-600" />
                      Este paso está activo para garantizar la validez deductiva y la ausencia de alucinación en operaciones algebraicas y numéricas.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de verificación de pasos de derivación o soluciones de optimización.">Modelo de verificación formal</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="Restricción de seguridad activa para evitar fallos de cálculo o bucles infinitos.">Guardrail de seguridad algorítmica</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios de rigor formal (activados por diseño)</p>
                        {[
                          "Tolerancia Cero a Alucinación Aritmética: todo cálculo se delega a SymPy/NumPy.",
                          "Sandbox Aislado con Timeout (5s) para simplificaciones algebraicas complejas.",
                          "Reproducibilidad Total: registro de semilla aleatoria y configuración de entorno determinista.",
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
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo cálculo numérico directo o simulación estocástica</strong> sin auditoría de demostraciones en tiempo real.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides añadir verificación simbólica de pasos o auditoría de equivalencias, vuelve al <strong>Paso 2</strong> y activa el módulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-MATH-01</code> o <code className="bg-dark/5 px-1 rounded text-xs">SEC-MATH-06</code>.
                    </div>
                  </div>
                )}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 6 */}
            {step === 6 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 6 â€” Stack Tecnológico & Persistencia</h2>
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y librerías que darán soporte a tu aplicación matemática.</p>

                {data.secondaryTasks.includes("SEC-MATH-04") && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-indigo-800">
                    âœ“ Persistencia analítica preconfigurada en <strong>DuckDB + Parquet</strong> por el módulo SEC-MATH-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para investigadores y analistas cuantitativos.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Almacén de matrices, grafos, series temporales y resultados de simulación.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar Especificación Matemática" />
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
                <h2 className="font-display text-[24px] text-dark">Especificación matemática generada con éxito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria técnica para <strong className="text-dark">{data.appName}</strong> está lista para desarrollo y ejecución computacional.
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
                  <RefreshCw size={15} /> Crear otro diseño
                </button>
              </div>
            </div>

            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.05)]">
              <ReportRenderer markdown={report} />
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 flex gap-3">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[13px] text-amber-800 leading-relaxed">
                <strong>Aviso científico y metodológico:</strong> Este informe especifica una arquitectura de software de cálculo y verificación formal. Toda solución debe interpretarse dentro de las tolerancias numéricas y los límites teóricos del solucionador empleado.
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

