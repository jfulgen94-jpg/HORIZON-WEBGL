import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Code2 } from "lucide-react";
import { Cpu } from "lucide-react";
import { GitBranch } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { Calculator } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────—

const RESEARCH_LINES = [
  {
    id: "competition",
    number: "01",
    title: "Matemáticas de competición y razonamiento formal",
    color: "indigo",
    summary:
      "Los problemas de olimpiada matemática — AMC, AIME y competiciones Olympiad — son los más duros del canon matemático preuniversitario. No son problemas de cálculo mecánico: requieren elegancia, intuición y un salto creativo no trivial.",
    detail:
      "MATH_Competition evalúa la resolución de problemas de olimpiada con distintos niveles de dificultad. MATH_500 es un subconjunto depurado de 500 problemas representativos de todo el espectro. AIME_2025 mide el desempeño en los problemas más recientes del examen de invitación americano, el nivel inmediatamente anterior a la Olimpiada Internacional. Estos benchmarks miden si el modelo acierta el resultado, no si el camino es correcto.",
    benchmarks: [
      { name: "MATH_Competition", desc: "Resolución de problemas de olimpiada de distintos niveles" },
      { name: "MATH_500", desc: "500 problemas representativos del espectro completo de dificultad" },
      { name: "AIME_2025", desc: "Examen de invitación americano — problemas 2025" },
    ],
    topModel: { name: "DeepSeek-R1", score: "97.08", detail: "Líder en matemáticas de competición con razonamiento extendido en tiempo de inferencia" },
  },
  {
    id: "chain-of-thought",
    number: "02",
    title: "Razonamiento multi-paso y cadena de pensamiento (Chain-of-Thought)",
    color: "violet",
    summary:
      "Un problema de ocho pasos con un error en el paso tres produce un resultado final incorrecto, aunque los pasos cuatro a ocho sean impecables. El Chain-of-Thought obliga al modelo a escribir cada paso intermedio antes de dar el resultado, exponiendo los razonamientos intermedios para que puedan verificarse.",
    detail:
      "GSM8K (Grade School Math) evalúa aritmética verbal con solución en múltiples pasos. GSM8K-Platinum es la variante más depurada y difícil. Socratic_Math mide la coherencia del razonamiento mediante preguntas socráticas que obligan al modelo a justificar cada transición. El diferencial entre DeepSeek-R1 (97.18/100) y Claude 3.7 Sonnet (96.95/100) es de 0.23 puntos — ver Módulo 4, punto 4.2.",
    benchmarks: [
      { name: "GSM8K_ChainOfThought", desc: "Aritmética verbal multi-paso con razonamiento explícito" },
      { name: "GSM8K_Platinum", desc: "Variante depurada y más difícil de GSM8K" },
      { name: "Socratic_Math", desc: "Verificación socrática de la coherencia del razonamiento paso a paso" },
    ],
    topModel: { name: "DeepSeek-R1", score: "97.18", detail: "98.4 GSM8K_ChainOfThought · 97.8 GSM8K_Platinum · 95.0 Socratic_Math" },
    warning: true,
  },
  {
    id: "quantitative",
    number: "03",
    title: "Razonamiento cuantitativo y abstracción simbólica con sentido común",
    color: "teal",
    summary:
      "Hay una clase de problemas donde la dificultad no es la operación, sino entender qué se está preguntando: problemas verbales que mezclan contexto físico, lógica espacial y aritmética aplicada. Son los que más se parecen a los problemas reales de ingeniería o análisis de datos.",
    detail:
      "CSQA-Math mide el razonamiento matemático con sentido común en contextos del mundo real. ARC (Abstraction and Reasoning Corpus) evalúa la abstracción y el razonamiento analógico aplicados a problemas cuantitativos. SVAMP (Simple Variations on Arithmetic Math Problems) evalúa la robustez ante variaciones de formulación de problemas de aritmética verbal — si el modelo entiende el problema o solo reconoce su patrón superficial.",
    benchmarks: [
      { name: "CSQA_Math_Reasoning", desc: "Razonamiento matemático con sentido común en contexto real" },
      { name: "ARC_Math_Challenge", desc: "Abstracción y razonamiento analógico en problemas cuantitativos" },
      { name: "SVAMP_Math_Word_Problems", desc: "Robustez ante variaciones de formulación en aritmética verbal" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "94.34", detail: "95.2 CSQA_Math_Reasoning · 97.2 SVAMP_Math_Word_Problems" },
  },
  {
    id: "multi-agent",
    number: "04",
    title: "Planificación y coordinación multi-agente en resolución distribuida",
    color: "indigo",
    summary:
      "Algunos problemas matemáticos son demasiado grandes para un único contexto de modelo: requieren descomposición en subproblemas que agentes especializados resuelven en paralelo y cuyos resultados se integran sin bloqueos ni inconsistencias.",
    detail:
      "MAFBench (Multi-Agent Framework Benchmark) mide exactamente eso: la capacidad de un sistema multi-agente para coordinar la resolución distribuida de un problema complejo. MAFBench_Planning evalúa la descomposición estratégica del problema. MAFBench_Coordination evalúa la sincronización entre agentes. MAFBench_Integration evalúa la capacidad de integrar resultados parciales en una solución coherente.",
    benchmarks: [
      { name: "MAFBench_Planning", desc: "Descomposición estratégica de problemas para agentes especializados" },
      { name: "MAFBench_Coordination", desc: "Sincronización entre agentes sin bloqueos ni inconsistencias" },
      { name: "MAFBench_Integration", desc: "Integración de resultados parciales en solución coherente" },
    ],
    topModel: { name: "AutoGen-Sonnet-Team", score: "92.30", detail: "93.5 MAFBench_Planning — líder en planificación y coordinación multi-agente matemática" },
    warning: true,
  },
  {
    id: "tools",
    number: "05",
    title: "Memoria a largo plazo y uso de herramientas computacionales",
    color: "teal",
    summary:
      "Un modelo que calcula âˆš2 por su cuenta comete errores de precisión acumulados. Un modelo que llama a un intérprete Python con NumPy o SymPy y devuelve el resultado computado externaliza el cálculo al motor correcto. La herramienta adecuada en el momento correcto con los argumentos correctos.",
    detail:
      "StableToolBench_Math mide la fiabilidad y robustez en el uso de herramientas matemáticas. ToolUse_Calculator_Python evalúa específicamente la capacidad de generar y ejecutar código Python correcto para cálculos matemáticos. MemoryAgentBench mide si el modelo mantiene el estado del problema a lo largo de un diálogo matemático extendido. Ningún modelo alcanza el 100% de cobertura — ver Módulo 4, punto 4.1.",
    benchmarks: [
      { name: "StableToolBench_Math", desc: "Fiabilidad y robustez en el uso de herramientas matemáticas" },
      { name: "ToolUse_Calculator_Python", desc: "Generación y ejecución de código Python correcto para cálculos" },
      { name: "MemoryAgentBench", desc: "Mantenimiento del estado del problema en diálogos matemáticos extendidos" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "90.44", detail: "96.0 ToolUse_Calculator_Python — líder en tool-use matemático con Python" },
    warning: true,
  },
  {
    id: "verification",
    number: "06",
    title: "Trazabilidad, verificación de pasos y equivalencia formal",
    color: "violet",
    summary:
      "Dada una cadena de razonamiento simbólico, ¿es cada paso algebraicamente equivalente al anterior? ¿Hay un error de signo en el paso 5 que el modelo no detectó? Esta línea investiga no cómo resolver el problema, sino cómo auditar que la resolución de cualquier agente es correcta.",
    detail:
      "Math_Equivalence_Verification mide la capacidad de comprobar si dos expresiones simbólicas son equivalentes. ProofStep_Validity_Index evalúa la detección de pasos de prueba inválidos en una cadena de razonamiento. GSM_Symbolic_Robustness mide la robustez del razonamiento simbólico ante perturbaciones. DeepSeek-R1 lidera con 98.0 en equivalencia — la capacidad más directamente relevante para Prisma Matemático.",
    benchmarks: [
      { name: "Math_Equivalence_Verification", desc: "Verificación de equivalencia entre expresiones simbólicas" },
      { name: "ProofStep_Validity_Index", desc: "Detección de pasos de prueba inválidos en cadenas de razonamiento" },
      { name: "GSM_Symbolic_Robustness", desc: "Robustez del razonamiento simbólico ante perturbaciones" },
    ],
    topModel: { name: "DeepSeek-R1", score: "96.55", detail: "98.0 Math_Equivalence_Verification · 96.5 ProofStep_Validity_Index · 94.8 GSM_Symbolic_Robustness" },
  },
];

const PROJECTS = [
  {
    id: "prisma",
    name: "Prisma Matemático",
    tagline: "Verificar es más fácil que generar — y más importante",
    desc: "Toma una demostración, una derivación algebraica o una solución multi-paso generada por cualquier modelo, la desmonta paso a paso, y verifica si cada eslabón es válido antes de aceptar el resultado final. No resuelve problemas matemáticos: audita soluciones ya generadas. Usa DeepSeek-R1 para la verificación lógica de cada paso y Claude 3.7 Sonnet + SymPy para la verificación simbólica computacional de equivalencias algebraicas.",
    color: "indigo",
    researchLines: ["02", "06"],
    stack: [
      { role: "Verificación lógica de cada paso del razonamiento", tech: "DeepSeek-R1 — líder verificación formal y equivalencia (96.55/100, 98.0 Math_Equivalence_Verification)" },
      { role: "Ejecución simbólica verificada con herramientas computacionales", tech: "Claude 3.7 Sonnet — líder tool-use matemático (90.44/100, 96.0 ToolUse_Calculator_Python)" },
      { role: "Motor de verificación simbólica algebraica", tech: "SymPy — álgebra simbólica Python: simplify(lhs - rhs) == 0 para equivalencia computacional" },
      { role: "Segmentación de cadenas de razonamiento en pasos atómicos", tech: "Claude 3.7 Sonnet — clasificación: aritmético | algebraico | lógico | definitorio" },
      { role: "Almacenamiento", tech: "DuckDB — registro de verificaciones con resultado por paso y veredicto global" },
    ],
    whyModels: [
      { model: "DeepSeek-R1", role: "Verificación lógica y formal de pasos", score: "96.55", area: "Trazabilidad, Verificación y Equivalencia Formal" },
      { model: "Claude 3.7 Sonnet", role: "Ejecución simbólica con SymPy", score: "90.44", area: "Memoria, Herramientas y Robustez (96.0 ToolUse_Calculator_Python)" },
    ],
    flow: [
      "Entrada: cadena de razonamiento matemático generada por cualquier modelo (demostración, derivación algebraica, solución multi-paso en LaTeX o texto plano)",
      "Segmentación en pasos atómicos (Claude 3.7 Sonnet): identificación de cada afirmación individual, clasificación del tipo de paso (aritmético | algebraico | lógico | definitorio), extracción de premisas y conclusión de cada paso",
      "Para cada paso — verificación lógica (DeepSeek-R1): ¿la conclusión se sigue de las premisas por las reglas invocadas? ¿la regla existe y se aplica correctamente? Etiquetado: VÁLIDO | INVÁLIDO | INDETERMINADO",
      "Para cada paso algebraico — verificación simbólica (Claude 3.7 Sonnet + SymPy): simplify(lhs - rhs) == 0 en sandbox aislado con timeout. Resultado: EQUIVALENTE | NO_EQUIVALENTE | ERROR_EJECUCI“N",
      "Síntesis del informe: pasos válidos N, pasos inválidos N (con descripción del error), pasos indeterminados N (requieren revisión humana), veredicto global: VERIFICADO | CONTIENE_ERRORES | PARCIALMENTE_VERIFICADO",
      "Salida: informe JSON estructurado + anotación del razonamiento original con marcas por paso",
    ],
    promptIDE: `Crea un módulo Python llamado prisma_matematico.py con las siguientes funciones:
1. segment_reasoning(text: str, llm_client) -> list[dict]: segmenta una cadena de
   razonamiento matemático en pasos atómicos. Cada paso debe tener:
   {step_id: int, raw_text: str, step_type: str ("arithmetic"|"algebraic"|"logical"|
   "definitional"), premises: list[str], conclusion: str}.
2. verify_step_logic(step: dict, llm_client) -> dict: verifica la validez lógica
   de un paso usando el LLM. Devuelve:
   {step_id, logic_status: "VALID"|"INVALID"|"INDETERMINATE",
    confidence: float, error_description: str | null}.
3. verify_step_symbolic(step: dict) -> dict: si el paso es algebraico, verifica
   la equivalencia simbólica usando SymPy. Devuelve:
   {step_id, symbolic_status: "EQUIVALENT"|"NOT_EQUIVALENT"|"EXECUTION_ERROR",
    sympy_result: str | null, error: str | null}.
4. synthesize_verification_report(steps: list[dict], logic_results: list[dict],
   symbolic_results: list[dict]) -> dict: genera el informe final:
   {total_steps, valid_steps, invalid_steps, indeterminate_steps,
    overall_verdict: "VERIFIED"|"CONTAINS_ERRORS"|"PARTIALLY_VERIFIED",
    step_details: list[dict], reliability_score: float}.
Usa sympy, subprocess (para sandbox), duckdb y la librería estándar.`,
    promptLLM: `Eres el verificador lógico de Prisma Matemático en el Laboratorio de Matemáticas
& Procesos Complejos de Horizon.
Se te proporciona un paso de un razonamiento matemático con sus premisas explicitadas
y su conclusión. Tu función no es resolver el problema: es verificar si la conclusión
se sigue de las premisas mediante las reglas matemáticas correctamente aplicadas.

Tu tarea:
1. Identifica la regla o propiedad matemática que conecta las premisas con la conclusión
   (p. ej. distributividad, teorema de Pitágoras, regla del producto de derivadas).
2. Verifica si esa regla existe, si aplica en el contexto dado y si se aplica
   correctamente.
3. Si el paso es aritmético, verifica el cálculo exacto.
4. Clasifica el paso como VALID, INVALID o INDETERMINATE.

Restricciones críticas:
- INDETERMINATE solo cuando no tienes información suficiente para decidir
  (variables sin definir, contexto cortado, notación ambigua).
- No des por válido un paso solo porque el resultado final "parezca razonable".
- No afirmes que el razonamiento "demuestra" nada: solo que cada paso
  es o no es válido según las reglas invocadas.
- Si detectas un error, descríbelo con precisión: qué regla se violó y en qué sentido.

Responde en JSON:
{
  "logic_status": "VALID" | "INVALID" | "INDETERMINATE",
  "rule_applied": str,
  "rule_exists": bool,
  "rule_correctly_applied": bool,
  "confidence": float,
  "error_description": str | null
}`,
  },
  {
    id: "predictor",
    name: "Predictor de Riesgo",
    tagline: "La respuesta a un problema con incertidumbre no es un número, es una distribución",
    desc: "A partir de una descripción del problema en lenguaje natural, configura una simulación Monte Carlo, la ejecuta con NumPy/SciPy y traduce los resultados en un lenguaje que no requiere estadística avanzada para interpretarse. Define las distribuciones de probabilidad de cada variable, identifica correlaciones, ejecuta hasta 10.000 iteraciones en sandbox aislado y devuelve percentiles, probabilidades de umbral y un análisis de sensibilidad por variable.",
    color: "teal",
    researchLines: ["02", "05"],
    stack: [
      { role: "Análisis del problema y formulación de variables con distribuciones", tech: "DeepSeek-R1 — líder razonamiento multi-paso (97.18/100, 98.4 GSM8K_ChainOfThought)" },
      { role: "Generación y ejecución de código de simulación con Python/NumPy", tech: "Claude 3.7 Sonnet — líder tool-use matemático (90.44/100, 96.0 ToolUse_Calculator_Python)" },
      { role: "Orquestación del flujo multi-etapa completo", tech: "AutoGen-Sonnet-Team — líder planificación multi-agente (92.30/100, 93.5 MAFBench_Planning)" },
      { role: "Motor de simulación Monte Carlo", tech: "NumPy (muestreo aleatorio) + SciPy (distribuciones: normal, lognormal, triangular, uniforme, beta)" },
      { role: "Visualización y entorno de ejecución", tech: "matplotlib/plotly — sandbox Python aislado con timeout configurable" },
    ],
    whyModels: [
      { model: "DeepSeek-R1", role: "Formulación de variables y distribuciones", score: "97.18", area: "Razonamiento Multi-Paso y Chain-of-Thought" },
      { model: "Claude 3.7 Sonnet", role: "Generación y ejecución de código Monte Carlo", score: "90.44", area: "Memoria, Herramientas y Robustez" },
      { model: "AutoGen-Sonnet-Team", role: "Orquestación del flujo multi-etapa", score: "92.30", area: "Planificación y Coordinación Multi-Agente" },
    ],
    flow: [
      "Entrada: descripción del problema de riesgo en lenguaje natural (ej. «Un proyecto de construcción tiene duración estimada entre 8 y 14 meses, con mayor probabilidad en torno a 11 meses. El coste por mes de retraso es entre 50.000 y 80.000 EUR»)",
      "Análisis y formulación de variables (DeepSeek-R1): identificación de variables inciertas y sus rangos, selección de distribución de probabilidad para cada variable (normal, lognormal, triangular, uniforme, beta), identificación de correlaciones entre variables, definición de la métrica de salida",
      "Generación del código de simulación (Claude 3.7 Sonnet): código Python con NumPy/SciPy, N iteraciones configurables (default: 10.000), cálculo de la métrica de salida en cada iteración",
      "Ejecución en sandbox Python aislado con timeout configurable",
      "Análisis de resultados: media, mediana, desviación típica, percentiles P5/P25/P50/P75/P90/P95/P99, probabilidad de superar umbrales críticos definidos por el usuario",
      "Interpretación en lenguaje natural (DeepSeek-R1): traducción de percentiles a enunciados accionables, identificación de variables con mayor impacto en la variabilidad (análisis de sensibilidad)",
      "Salida A: gráfico de distribución (histograma + densidad + percentiles) · Salida B: tabla de percentiles y probabilidades · Salida C: código Python reproducible · Salida D: resumen para el tomador de decisión",
    ],
    promptIDE: `Crea un módulo Python llamado predictor_riesgo.py con las siguientes funciones:
1. parse_risk_problem(description: str, llm_client) -> dict: analiza la descripción
   del problema y devuelve la estructura de simulación:
   {variables: [{name, distribution_type: str, params: dict, description: str}],
    correlations: list[{var1, var2, correlation_coeff}],
    output_metric: {name, formula: str, unit: str},
    critical_thresholds: list[float]}.
2. generate_simulation_code(problem_structure: dict, n_iterations: int = 10000,
   llm_client) -> str: genera código Python completo y ejecutable que:
   - Importa numpy, scipy.stats y matplotlib.
   - Muestrea cada variable según su distribución en n_iterations iteraciones.
   - Calcula la métrica de salida en cada iteración.
   - Devuelve el array de resultados como numpy array.
3. run_simulation(code: str, timeout_seconds: int = 120) -> dict:
   ejecuta el código en subprocess aislado. Devuelve:
   {success: bool, results: list[float] | null, error: str | null,
    execution_time_ms: float}.
4. analyze_results(results: list[float], thresholds: list[float]) -> dict:
   calcula estadísticos descriptivos y probabilidades de umbral. Devuelve:
   {mean, median, std, percentiles: dict, threshold_probs: dict,
    sensitivity_ranking: list[str]}.
5. generate_interpretation(analysis: dict, problem: dict, llm_client) -> str:
   genera un resumen en lenguaje natural de los resultados, sin usar jerga
   estadística innecesaria, orientado al tomador de decisión no técnico.
6. plot_distribution(results: list[float], analysis: dict,
   output_path: str) -> None: genera el histograma con curva de densidad,
   percentiles marcados y umbrales críticos.
Usa numpy, scipy, matplotlib, subprocess y la librería estándar.`,
    promptLLM: `Eres el analista de riesgo cuantitativo de Predictor de Riesgo en el Laboratorio
de Matemáticas & Procesos Complejos de Horizon.
Se te proporciona una descripción en lenguaje natural de un problema con incertidumbre.

Tarea 1 — Identificación de variables:
Para cada variable incierta mencionada:
1. Identifica su nombre y unidad.
2. Selecciona la distribución de probabilidad más apropiada:
   - Triangular: cuando hay mínimo, moda y máximo conocidos.
   - Normal: cuando la variable es simétrica alrededor de la media.
   - Lognormal: cuando la variable no puede ser negativa y tiene sesgo positivo.
   - Uniforme: cuando cualquier valor en el rango es igualmente probable.
   - Beta: cuando la variable está acotada en [0,1] (porcentajes, probabilidades).
3. Extrae los parámetros de la distribución de los datos del enunciado.

Tarea 2 — Correlaciones:
Si el enunciado implica que dos variables están relacionadas, identifícalo y estima
un coeficiente de correlación de Pearson entre -1 y 1.

Tarea 3 — Definición de la métrica de salida:
Define la fórmula matemática que combina las variables de entrada en la métrica
que el usuario quiere estimar. Exprésala como una expresión Python evaluable.

Restricciones:
- Si un parámetro de distribución no está en el enunciado, señálalo como
  "requires_user_input" y no lo asumas.
- No afirmes certeza en la elección de distribución: es una propuesta técnica
  que el usuario debe validar.

Responde en JSON conforme a la estructura de parse_risk_problem.`,
  },
  {
    id: "simplex",
    name: "Simplex Helios",
    tagline: "Claridad donde había confusión: del enunciado verbal a la solución óptima",
    desc: "Convierte una descripción en lenguaje natural de un problema de asignación de recursos en una formulación de programación lineal correcta, la resuelve con scipy.optimize.linprog o PuLP, y devuelve la solución con una interpretación práctica de qué significa en el contexto original. La formulación del problema es siempre el cuello de botella — Simplex Helios lo elimina.",
    color: "violet",
    researchLines: ["03", "04", "06"],
    stack: [
      { role: "Formulación del problema LP a partir de enunciado verbal", tech: "Claude 3.7 Sonnet — líder razonamiento cuantitativo mixto (94.34/100, 97.2 SVAMP_Math_Word_Problems)" },
      { role: "Verificación de coherencia de restricciones y validación de solución", tech: "DeepSeek-R1 — líder verificación formal (96.55/100, 98.0 Math_Equivalence_Verification)" },
      { role: "Orquestación del flujo multi-etapa", tech: "AutoGen-Sonnet-Team — líder planificación multi-agente (92.30/100)" },
      { role: "Motor de optimización (LP continuo)", tech: "scipy.optimize.linprog — programación lineal continua" },
      { role: "Motor de optimización (LP entero)", tech: "PuLP — programación lineal entera (variables enteras o binarias)" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Formulación LP desde enunciado verbal", score: "94.34", area: "Razonamiento Cuantitativo Mixto (97.2 SVAMP)" },
      { model: "DeepSeek-R1", role: "Verificación de coherencia y validación de solución", score: "96.55", area: "Trazabilidad, Verificación y Equivalencia Formal" },
      { model: "AutoGen-Sonnet-Team", role: "Orquestación multi-etapa", score: "92.30", area: "Planificación y Coordinación Multi-Agente" },
    ],
    flow: [
      "Entrada: descripción en lenguaje natural del problema de asignación de recursos (ej. «Una empresa produce dos productos A y B. Cada unidad de A requiere 2h de máquina y 1h de mano de obra–¦»)",
      "Formulación del problema LP (Claude 3.7 Sonnet): identificación de variables de decisión y sus dominios, función objetivo con coeficientes y dirección (maximizar/minimizar), restricciones con matriz de coeficientes A, vector de límites b y tipo (<= | >= | =), restricciones de no negatividad y de entero si aplica",
      "Verificación de coherencia (DeepSeek-R1): ¿el sistema de restricciones es factible? ¿hay restricciones redundantes o contradictorias? ¿la función objetivo está acotada en la región factible?",
      "Resolución (scipy.optimize.linprog o PuLP): ejecución del solucionador con los parámetros formulados, obtención de la solución óptima o informe de infactibilidad",
      "Verificación de la solución (DeepSeek-R1): comprobación de que cada restricción se satisface con la solución, cálculo del valor de la función objetivo, identificación de restricciones activas (saturadas) vs. holgadas",
      "Interpretación en lenguaje natural (Claude 3.7 Sonnet): traducción de la solución a términos del problema original, explicación de qué restricciones limitan el óptimo, análisis de sensibilidad — ¿cuánto puede cambiar un parámetro antes de que cambie la solución?",
      "Salida A: vector de solución con valores de cada variable · Salida B: valor de la función objetivo · Salida C: análisis de sensibilidad · Salida D: gráfico 2D de la región factible (si hay 2 variables) · Salida E: formulación LP en LaTeX",
    ],
    promptIDE: `Crea un módulo Python llamado simplex_helios.py con las siguientes funciones:
1. parse_lp_problem(description: str, llm_client) -> dict: extrae la formulación
   de programación lineal del enunciado. Devuelve:
   {variables: [{name, description, domain: "continuous"|"integer"|"binary",
     lower_bound: float, upper_bound: float | null}],
    objective: {coefficients: list[float], direction: "minimize"|"maximize",
      expression_latex: str},
    constraints: [{name, coefficients: list[float], rhs: float,
      sense: "<="|">="|"=", description: str}],
    problem_type: "LP"|"ILP"|"MIP"}.
2. verify_problem_coherence(lp: dict, llm_client) -> dict:
   verifica la coherencia del problema formulado. Devuelve:
   {is_feasible_candidate: bool, has_redundant_constraints: bool,
    has_contradicting_constraints: bool, is_bounded: bool, warnings: list[str]}.
3. solve_lp(lp: dict) -> dict: resuelve el problema usando scipy.optimize.linprog
   (para LP continuo) o pulp (para ILP/MIP). Devuelve:
   {status: "optimal"|"infeasible"|"unbounded"|"error",
    solution: dict | null, objective_value: float | null,
    active_constraints: list[str], solver_message: str}.
4. verify_solution(lp: dict, solution: dict) -> dict:
   verifica computacionalmente que la solución satisface todas las restricciones.
   Devuelve: {all_satisfied: bool,
   violations: list[{constraint_name, slack, tolerance}]}.
5. interpret_solution(lp: dict, solution: dict, solver_result: dict,
   llm_client) -> str: genera la interpretación en lenguaje natural de la solución
   en términos del problema original, incluyendo qué restricciones son activas.
6. plot_feasible_region(lp: dict, solution: dict,
   output_path: str) -> None: si el problema tiene exactamente 2 variables,
   genera el gráfico 2D de la región factible con la solución óptima marcada.
Usa scipy, pulp, numpy, matplotlib y la librería estándar.`,
    promptLLM: `Eres el formulador de problemas de programación lineal de Simplex Helios en el
Laboratorio de Matemáticas & Procesos Complejos de Horizon.
Se te proporciona un enunciado en lenguaje natural de un problema de asignación
de recursos u optimización.

Tu tarea es extraer la formulación matemática completa del problema.

Proceso recomendado:
1. Identifica primero QUÃ‰ se decide (las variables de decisión y sus unidades).
2. Identifica QUÃ‰ se quiere maximizar o minimizar (la función objetivo).
3. Identifica QUÃ‰ limita las decisiones (las restricciones).
4. Verifica que has capturado TODAS las restricciones del enunciado,
   incluyendo las implícitas (no negatividad, capacidades máximas).

Requisitos críticos:
- Si el enunciado es ambiguo sobre si una restricción es <= o >=, señálalo
  explícitamente y propón ambas interpretaciones.
- Si falta información para completar algún parámetro, ponlo como null
  y añade una nota en "warnings" explicando qué falta.
- No asumas que el problema es de minimización o maximización: extráelo del enunciado.
- Genera la función objetivo y cada restricción también en formato LaTeX.

Responde en JSON conforme a la estructura de parse_lp_problem.
Después del JSON, añade una sección "FORMULACI“N LaTeX" con el problema completo
en notación matemática estándar.`,
  },
];

const MARKET_APPS = [
  {
    name: "Wolfram Alpha + Wolfram Language",
    desc: "Motor de conocimiento computacional que resuelve problemas matemáticos, simbólicos y cuantitativos con respuestas paso a paso. La versión Pro incorpora integración con modelos de lenguaje. Wolfram Language es el lenguaje de programación simbólica de Mathematica.",
    tag: "Cómputo simbólico",
    url: "https://wolframalpha.com",
  },
  {
    name: "MATLAB + Statistics Toolbox",
    desc: "Entorno de computación numérica estándar en ingeniería y ciencia. El toolbox de estadística incluye funciones para simulación Monte Carlo, ajuste de distribuciones y análisis de sensibilidad.",
    tag: "Computación numérica",
    url: "https://mathworks.com/products/matlab",
  },
  {
    name: "Gurobi Optimizer",
    desc: "Solucionador comercial de referencia para programación lineal, entera y cuadrática. Ampliamente usado en optimización industrial, logística y finanzas. Ofrece API Python (gurobipy).",
    tag: "Optimización industrial",
    url: "https://gurobi.com",
  },
  {
    name: "Palisade @RISK",
    desc: "Software de análisis de riesgo mediante simulación Monte Carlo integrado en Excel. Permite definir distribuciones de probabilidad en celdas de Excel y ejecutar simulaciones directamente.",
    tag: "Monte Carlo en Excel",
    url: "https://lumivero.com/products/risk",
  },
  {
    name: "Symbolab",
    desc: "Herramienta web de resolución de problemas matemáticos paso a paso con soporte para álgebra, cálculo, ecuaciones diferenciales y estadística. Orientada a uso educativo y académico.",
    tag: "Resolución paso a paso",
    url: "https://symbolab.com",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 Asimetría en la cobertura de benchmarks por modelo",
    items: [
      "Matemáticas de Competición: Claude 3.7 Sonnet (67%) carece de evaluación en AIME_2025 (Fuente: STATER Math Leaderboard, latest_rankings_math.md).",
      "Razonamiento Multi-Paso: o1-preview (67%) no cuenta con datos registrados para Socratic_Math.",
      "Razonamiento Común Cuantitativo: GPT-4.5 (67%) carece de resultado en ARC_Math_Challenge.",
      "Memoria y Uso de Herramientas: ningún modelo alcanza el 100% de cobertura — Claude 3.7 Sonnet carece de datos en MemoryAgentBench, AutoGen-Sonnet-Team no tiene registro en ToolUse_Calculator_Python y GPT-4.5 sólo cuenta con evaluación en StableToolBench_Math (33% de cobertura).",
      "Trazabilidad y Verificación Formal: tanto o1-preview (67%) como Claude 3.7 Sonnet (67%) no registran evaluación en GSM_Symbolic_Robustness.",
    ],
  },
  {
    id: "v2",
    title: "4.2 Diferencial estrecho en Razonamiento Multi-Paso",
    items: [
      "Entre DeepSeek-R1 (97.18/100) y Claude 3.7 Sonnet (96.95/100), ambos con 100% de cobertura, la diferencia es de 0.23 puntos (Fuente: STATER Math Leaderboard, latest_rankings_math.md).",
      "Dado que la diferencia es menor a 0.5 puntos con cobertura idéntica, antes de recomendar públicamente uno sobre otro para tareas de razonamiento multi-paso críticas se recomienda verificar si el sistema de ponderación normaliza el orden por margen mínimo.",
      "Los proyectos del laboratorio asignan DeepSeek-R1 a las tareas de verificación formal (donde su margen es más amplio: 96.55 vs. 82.35 de Claude en esa área) y Claude a las de tool-use computacional (donde lidera con más holgura: 90.44 vs. modelos sin cobertura).",
    ],
  },
  {
    id: "v3",
    title: "4.3 Ausencia de benchmarks de Monte Carlo y programación lineal",
    items: [
      "Predictor de Riesgo y Simplex Helios se fundamentan en capacidades de razonamiento cuantitativo (área 3), razonamiento multi-paso (área 2) y uso de herramientas (área 5) como proxies válidos.",
      "El catálogo oficial no incluye benchmarks específicos de simulación Monte Carlo ni de formulación de problemas de programación lineal a partir de enunciados verbales.",
      "Las evaluaciones cuantitativas dedicadas a estas tareas concretas quedan catalogadas como [DATO PENDIENTE DE VERIFICAR].",
    ],
  },
  {
    id: "v4",
    title: "4.4 Costes computacionales y latencia en test-time compute",
    items: [
      "Los modelos o1-preview y DeepSeek-R1 utilizan razonamiento extendido en tiempo de inferencia (test-time compute scaling: asignar más cómputo en el momento de la inferencia para mejorar la calidad de la respuesta).",
      "El tiempo medio de inferencia por problema de competición y el número de tokens de razonamiento generados no constan en el archivo de rankings y permanecen como [DATO PENDIENTE DE VERIFICAR].",
      "Este dato es especialmente relevante para Prisma Matemático, donde el coste por verificación de paso afecta directamente al coste operativo del sistema en uso intensivo.",
    ],
  },
  {
    id: "v5",
    title: "4.5 Disponibilidad de AutoGen-Sonnet-Team como componente de producción",
    items: [
      "AutoGen-Sonnet-Team aparece como líder en planificación multi-agente con 92.30/100 (Fuente: STATER Math Leaderboard, latest_rankings_math.md).",
      "La disponibilidad de esta arquitectura específica como componente integrable en producción (vía AutoGen Studio u otras interfaces), incluyendo la versión exacta de AutoGen utilizada en la evaluación, debe verificarse antes de basar en ella una decisión de stack técnico.",
      "Predictor de Riesgo y Simplex Helios dependen de esta arquitectura para la orquestación — verificar disponibilidad antes de iniciar los prototipos.",
    ],
  },
];

// ─── Styles ──────────────────────────────────────────────────────────────────—€

const STYLES = {
  indigo: {
    accent: "text-indigo-400",
    border: "border-indigo-400/20",
    bg: "bg-indigo-400/5",
    dot: "bg-indigo-400",
    badge: "border-indigo-400/30 text-indigo-400",
    tabBorder: "border-indigo-400",
    score: "text-indigo-400",
  },
  violet: {
    accent: "text-violet-400",
    border: "border-violet-400/20",
    bg: "bg-violet-400/5",
    dot: "bg-violet-400",
    badge: "border-violet-400/30 text-violet-400",
    tabBorder: "border-violet-400",
    score: "text-violet-400",
  },
  teal: {
    accent: "text-teal-400",
    border: "border-teal-400/20",
    bg: "bg-teal-400/5",
    dot: "bg-teal-400",
    badge: "border-teal-400/30 text-teal-400",
    tabBorder: "border-teal-400",
    score: "text-teal-400",
  },
};

// ─── Sub-components ─────────────────────────────────────────────────────────—

function ResearchLineCard({ line }) {
  const [open, setOpen] = useState(false);
  const c = STYLES[line.color];
  return (
    <div className={`border ${c.border} ${c.bg} rounded-2xl overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 sm:px-6 py-5 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-start gap-4 min-w-0">
          <span className={`text-xs font-mono ${c.accent} shrink-0 mt-0.5 opacity-60`}>{line.number}</span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-sm font-medium text-white leading-snug">{line.title}</h3>
              {line.warning && (
                <span className="text-xs border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <AlertTriangle size={9} />
                  Datos parciales
                </span>
              )}
            </div>
            <p className="text-xs text-white/45 leading-relaxed">{line.summary}</p>
          </div>
        </div>
        <ChevronDown
          size={14}
          className={`text-white/30 shrink-0 transition-transform duration-200 mt-1 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-white/5 px-5 sm:px-6 py-5 space-y-5">
          <p className="text-sm text-white/55 leading-relaxed">{line.detail}</p>
          <div>
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2.5">Benchmarks clave</p>
            <div className="space-y-2">
              {line.benchmarks.map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl px-4 py-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
                  <div>
                    <span className="text-xs font-mono text-white/60">{b.name}</span>
                    <p className="text-xs text-white/35 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`border ${c.border} ${c.bg} rounded-xl p-4 flex items-start justify-between gap-4`}>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo líder · STATER Math Leaderboard</p>
              <p className={`text-sm font-medium ${c.accent}`}>{line.topModel.name}</p>
              <p className="text-xs text-white/40 mt-1">{line.topModel.detail}</p>
            </div>
            <div className={`text-2xl font-display ${c.score} shrink-0`}>{line.topModel.score}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function FlowStep({ step, index, total }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
          <span className="text-[10px] text-accent font-bold">{index + 1}</span>
        </div>
        {index < total - 1 && <div className="w-px h-4 bg-white/10 mt-1" />}
      </div>
      <p className="text-sm text-white/60 pb-4 leading-relaxed">{step}</p>
    </div>
  );
}

function PromptBlock({ label, content }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code2 size={12} className="text-white/40" />
          <span className="text-xs text-white/50 font-mono">{label}</span>
        </div>
        <button onClick={copy} className="text-xs text-white/30 hover:text-white/70 transition-colors px-2 py-0.5 rounded hover:bg-white/10">
          {copied ? "““ Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="text-xs text-white/70 p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono bg-black/20">
        {content}
      </pre>
    </div>
  );
}

function ProjectCard({ project }) {
  const [tab, setTab] = useState("stack");
  const c = STYLES[project.color];
  const tabs = [
    { id: "stack", label: "Stack & Modelos" },
    { id: "flow", label: "Flujo de datos" },
    { id: "prompts", label: "Prompts maestros" },
  ];
  return (
    <div className={`border ${c.border} ${c.bg} rounded-2xl overflow-hidden`}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-2 h-2 rounded-full ${c.dot} mt-2 shrink-0`} />
          <div>
            <h3 className={`font-display text-2xl sm:text-3xl ${c.accent}`}>{project.name}</h3>
            <p className="text-white/40 text-sm mt-0.5">{project.tagline}</p>
          </div>
        </div>
        <p className="text-white/65 text-sm leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs text-white/30">Líneas de investigación:</span>
          {project.researchLines.map((n) => {
            const line = RESEARCH_LINES.find((l) => l.number === n);
            return (
              <span key={n} className={`text-xs border px-2 py-0.5 rounded-full ${c.badge}`}>
                {n} · {line?.title.split(" ").slice(0, 3).join(" ")}–¦
              </span>
            );
          })}
        </div>
      </div>
      <div className="border-t border-white/5 flex">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 text-xs py-3 px-2 transition-all ${
              tab === t.id
                ? `${c.accent} border-b-2 ${c.tabBorder} bg-white/5`
                : "text-white/30 hover:text-white/60 border-b-2 border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-6 sm:p-8">
        {tab === "stack" && (
          <div className="space-y-6">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Componentes técnicos</p>
              <div className="space-y-2">
                {project.stack.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">{s.role}</p>
                      <p className="text-sm text-white/80 font-mono">{s.tech}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por qué estos modelos · STATER Math Leaderboard</p>
              <div className="space-y-2">
                {project.whyModels.map((m, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-white font-medium">{m.model}</p>
                      <p className="text-xs text-white/40 mt-0.5">{m.role}</p>
                      <p className="text-xs text-white/30 mt-1">{m.area}</p>
                    </div>
                    <div className={`text-lg font-display ${c.accent} shrink-0`}>{m.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "flow" && (
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Pipeline completo</p>
            {project.flow.map((step, i) => (
              <FlowStep key={i} step={step} index={i} total={project.flow.length} />
            ))}
          </div>
        )}
        {tab === "prompts" && (
          <div className="space-y-4">
            <PromptBlock label="prompt_ide.txt — Para Cursor / VS Code + Copilot" content={project.promptIDE} />
            <PromptBlock label="prompt_llm.txt — Para el modelo LLM asistente" content={project.promptLLM} />
          </div>
        )}
      </div>
    </div>
  );
}

function VerificationItem({ point }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-yellow-400/20 bg-yellow-400/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-yellow-400/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle size={14} className="text-yellow-400 shrink-0" />
          <span className="text-sm text-white/80">{point.title}</span>
        </div>
        <ChevronDown size={14} className={`text-white/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-yellow-400/10 pt-4 space-y-2">
          {point.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <ChevronRight size={12} className="text-yellow-400/50 mt-0.5 shrink-0" />
              <p className="text-xs text-white/50 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MatematicasLab() {
  return (
    <div className="min-h-full bg-[#111111]">
      {/* Back nav */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-4">
          <Link to="/areas" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors">
            <ArrowLeft size={14} />
            Todos los laboratorios
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)" }}
        />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center shrink-0">
              <Calculator size={28} className="text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs border border-indigo-400/30 bg-indigo-400/10 text-indigo-400 px-3 py-0.5 rounded-full">
                  Laboratorio verificado
                </span>
                <span className="text-xs text-white/20">STATER Reasoning & Math · 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-indigo-400">Matemáticas</span>
                {" & "}
                <span className="text-violet-400">Procesos Complejos</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                IA para verificación de razonamientos matemáticos, simulación de riesgo y optimización lineal. El estándar aquí no es «acierta el resultado»: es «el camino que recorre es correcto».
              </p>

              {/* Nota de rigor */}
              <div className="mt-5 inline-flex items-start gap-2 border border-indigo-400/20 bg-indigo-400/5 rounded-xl px-4 py-3 max-w-xl">
                <Calculator size={13} className="text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-300/70 leading-relaxed">
                  <strong className="text-indigo-300">Nota de rigor formal:</strong> en todo este cuaderno se distingue entre «el modelo acierta el resultado» y «el modelo demuestra el razonamiento de forma rigurosa». Son capacidades distintas, medidas de forma distinta, y se tratan como tales.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigación", value: "6" },
                  { label: "Proyectos activos", value: "3" },
                  { label: "Benchmarks cubiertos", value: "15" },
                  { label: "Aplicaciones de mercado", value: "5" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl text-white">{s.value}</p>
                    <p className="text-xs text-white/30 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-20">

        {/* Módulo 1 */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <BarChart3 size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 1</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué se investiga aquí</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                No nos preguntamos solo si el modelo resuelve el problema: nos preguntamos si el camino que recorre es correcto, si cada paso es válido, y si cuando falla, falla de forma detectable o de forma silenciosa. Seis dimensiones que cubren el espectro completo, desde el problema de olimpiada donde la creatividad es esencial hasta el verificador formal donde el rigor es el único criterio.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>
          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Del resultado al razonamiento</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Las seis líneas están diseñadas para cubrir el espectro completo: desde el problema de olimpiada (línea 01) donde la creatividad es esencial, hasta el verificador formal (línea 06) donde el rigor es el único criterio. Los tres proyectos del laboratorio viven en distintos puntos de ese espectro: Prisma en la verificación, Predictor en la simulación, Simplex en la optimización.
            </p>
          </div>
        </section>

        {/* Módulo 2 */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 2</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Casos de desarrollo</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Tres proyectos en tres registros distintos: Prisma Matemático audita razonamientos ya generados, Predictor de Riesgo convierte incertidumbre en distribuciones accionables, y Simplex Helios lleva cualquier problema de asignación de recursos desde el enunciado verbal hasta la solución óptima verificada.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Módulo 3 */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <GitBranch size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 3</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué aplicaciones ya existen en el mercado</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco aplicaciones reales de IA aplicada a razonamiento matemático, simulación y optimización. Verificar características actuales y precios en la web oficial de cada herramienta.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MARKET_APPS.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs border border-white/10 text-white/30 px-2 py-0.5 rounded-full">{app.tag}</span>
                    <ExternalLink size={12} className="text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                  </div>
                  <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-snug mb-2">{app.name}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{app.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-xs text-yellow-400/50 flex items-center gap-1.5">
                    <AlertTriangle size={10} />
                    Verificar características en web oficial
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Módulo 4 */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={14} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-yellow-400/40 uppercase tracking-widest mb-1">Módulo 4</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Puntos a verificar</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco puntos que requieren revisión antes de publicar o referenciar los datos de este cuaderno en materiales externos. Incluyen el diferencial estrecho entre modelos en razonamiento multi-paso, la ausencia de benchmarks específicos de Monte Carlo y programación lineal, y la disponibilidad de AutoGen-Sonnet-Team como componente integrable.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {VERIFICATION_POINTS.map((point) => (
              <VerificationItem key={point.id} point={point} />
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo · STATER Reasoning & Math Leaderboard · 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_math.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_math.yaml</code>.
              Puntuaciones de benchmark miden tasa de acierto, no rigor formal del razonamiento.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/taller" className="text-sm text-accent hover:text-accent-light border border-accent/30 hover:border-accent/60 px-4 py-2 rounded-xl transition-all">
              Ver casos en el Taller â†’
            </Link>
            <Link to="/comunidad/debate" className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all">
              Publicar un proyecto
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

