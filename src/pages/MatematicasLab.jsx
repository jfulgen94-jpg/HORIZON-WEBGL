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

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RESEARCH_LINES = [
  {
    id: "competition",
    number: "01",
    title: "MatemÃ¡ticas de competiciÃ³n y razonamiento formal",
    color: "indigo",
    summary:
      "Los problemas de olimpiada matemÃ¡tica â€” AMC, AIME y competiciones Olympiad â€” son los mÃ¡s duros del canon matemÃ¡tico preuniversitario. No son problemas de cÃ¡lculo mecÃ¡nico: requieren elegancia, intuiciÃ³n y un salto creativo no trivial.",
    detail:
      "MATH_Competition evalÃºa la resoluciÃ³n de problemas de olimpiada con distintos niveles de dificultad. MATH_500 es un subconjunto depurado de 500 problemas representativos de todo el espectro. AIME_2025 mide el desempeÃ±o en los problemas mÃ¡s recientes del examen de invitaciÃ³n americano, el nivel inmediatamente anterior a la Olimpiada Internacional. Estos benchmarks miden si el modelo acierta el resultado, no si el camino es correcto.",
    benchmarks: [
      { name: "MATH_Competition", desc: "ResoluciÃ³n de problemas de olimpiada de distintos niveles" },
      { name: "MATH_500", desc: "500 problemas representativos del espectro completo de dificultad" },
      { name: "AIME_2025", desc: "Examen de invitaciÃ³n americano â€” problemas 2025" },
    ],
    topModel: { name: "DeepSeek-R1", score: "97.08", detail: "LÃ­der en matemÃ¡ticas de competiciÃ³n con razonamiento extendido en tiempo de inferencia" },
  },
  {
    id: "chain-of-thought",
    number: "02",
    title: "Razonamiento multi-paso y cadena de pensamiento (Chain-of-Thought)",
    color: "violet",
    summary:
      "Un problema de ocho pasos con un error en el paso tres produce un resultado final incorrecto, aunque los pasos cuatro a ocho sean impecables. El Chain-of-Thought obliga al modelo a escribir cada paso intermedio antes de dar el resultado, exponiendo los razonamientos intermedios para que puedan verificarse.",
    detail:
      "GSM8K (Grade School Math) evalÃºa aritmÃ©tica verbal con soluciÃ³n en mÃºltiples pasos. GSM8K-Platinum es la variante mÃ¡s depurada y difÃ­cil. Socratic_Math mide la coherencia del razonamiento mediante preguntas socrÃ¡ticas que obligan al modelo a justificar cada transiciÃ³n. El diferencial entre DeepSeek-R1 (97.18/100) y Claude 3.7 Sonnet (96.95/100) es de 0.23 puntos â€” ver MÃ³dulo 4, punto 4.2.",
    benchmarks: [
      { name: "GSM8K_ChainOfThought", desc: "AritmÃ©tica verbal multi-paso con razonamiento explÃ­cito" },
      { name: "GSM8K_Platinum", desc: "Variante depurada y mÃ¡s difÃ­cil de GSM8K" },
      { name: "Socratic_Math", desc: "VerificaciÃ³n socrÃ¡tica de la coherencia del razonamiento paso a paso" },
    ],
    topModel: { name: "DeepSeek-R1", score: "97.18", detail: "98.4 GSM8K_ChainOfThought Â· 97.8 GSM8K_Platinum Â· 95.0 Socratic_Math" },
    warning: true,
  },
  {
    id: "quantitative",
    number: "03",
    title: "Razonamiento cuantitativo y abstracciÃ³n simbÃ³lica con sentido comÃºn",
    color: "teal",
    summary:
      "Hay una clase de problemas donde la dificultad no es la operaciÃ³n, sino entender quÃ© se estÃ¡ preguntando: problemas verbales que mezclan contexto fÃ­sico, lÃ³gica espacial y aritmÃ©tica aplicada. Son los que mÃ¡s se parecen a los problemas reales de ingenierÃ­a o anÃ¡lisis de datos.",
    detail:
      "CSQA-Math mide el razonamiento matemÃ¡tico con sentido comÃºn en contextos del mundo real. ARC (Abstraction and Reasoning Corpus) evalÃºa la abstracciÃ³n y el razonamiento analÃ³gico aplicados a problemas cuantitativos. SVAMP (Simple Variations on Arithmetic Math Problems) evalÃºa la robustez ante variaciones de formulaciÃ³n de problemas de aritmÃ©tica verbal â€” si el modelo entiende el problema o solo reconoce su patrÃ³n superficial.",
    benchmarks: [
      { name: "CSQA_Math_Reasoning", desc: "Razonamiento matemÃ¡tico con sentido comÃºn en contexto real" },
      { name: "ARC_Math_Challenge", desc: "AbstracciÃ³n y razonamiento analÃ³gico en problemas cuantitativos" },
      { name: "SVAMP_Math_Word_Problems", desc: "Robustez ante variaciones de formulaciÃ³n en aritmÃ©tica verbal" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "94.34", detail: "95.2 CSQA_Math_Reasoning Â· 97.2 SVAMP_Math_Word_Problems" },
  },
  {
    id: "multi-agent",
    number: "04",
    title: "PlanificaciÃ³n y coordinaciÃ³n multi-agente en resoluciÃ³n distribuida",
    color: "indigo",
    summary:
      "Algunos problemas matemÃ¡ticos son demasiado grandes para un Ãºnico contexto de modelo: requieren descomposiciÃ³n en subproblemas que agentes especializados resuelven en paralelo y cuyos resultados se integran sin bloqueos ni inconsistencias.",
    detail:
      "MAFBench (Multi-Agent Framework Benchmark) mide exactamente eso: la capacidad de un sistema multi-agente para coordinar la resoluciÃ³n distribuida de un problema complejo. MAFBench_Planning evalÃºa la descomposiciÃ³n estratÃ©gica del problema. MAFBench_Coordination evalÃºa la sincronizaciÃ³n entre agentes. MAFBench_Integration evalÃºa la capacidad de integrar resultados parciales en una soluciÃ³n coherente.",
    benchmarks: [
      { name: "MAFBench_Planning", desc: "DescomposiciÃ³n estratÃ©gica de problemas para agentes especializados" },
      { name: "MAFBench_Coordination", desc: "SincronizaciÃ³n entre agentes sin bloqueos ni inconsistencias" },
      { name: "MAFBench_Integration", desc: "IntegraciÃ³n de resultados parciales en soluciÃ³n coherente" },
    ],
    topModel: { name: "AutoGen-Sonnet-Team", score: "92.30", detail: "93.5 MAFBench_Planning â€” lÃ­der en planificaciÃ³n y coordinaciÃ³n multi-agente matemÃ¡tica" },
    warning: true,
  },
  {
    id: "tools",
    number: "05",
    title: "Memoria a largo plazo y uso de herramientas computacionales",
    color: "teal",
    summary:
      "Un modelo que calcula âˆš2 por su cuenta comete errores de precisiÃ³n acumulados. Un modelo que llama a un intÃ©rprete Python con NumPy o SymPy y devuelve el resultado computado externaliza el cÃ¡lculo al motor correcto. La herramienta adecuada en el momento correcto con los argumentos correctos.",
    detail:
      "StableToolBench_Math mide la fiabilidad y robustez en el uso de herramientas matemÃ¡ticas. ToolUse_Calculator_Python evalÃºa especÃ­ficamente la capacidad de generar y ejecutar cÃ³digo Python correcto para cÃ¡lculos matemÃ¡ticos. MemoryAgentBench mide si el modelo mantiene el estado del problema a lo largo de un diÃ¡logo matemÃ¡tico extendido. NingÃºn modelo alcanza el 100% de cobertura â€” ver MÃ³dulo 4, punto 4.1.",
    benchmarks: [
      { name: "StableToolBench_Math", desc: "Fiabilidad y robustez en el uso de herramientas matemÃ¡ticas" },
      { name: "ToolUse_Calculator_Python", desc: "GeneraciÃ³n y ejecuciÃ³n de cÃ³digo Python correcto para cÃ¡lculos" },
      { name: "MemoryAgentBench", desc: "Mantenimiento del estado del problema en diÃ¡logos matemÃ¡ticos extendidos" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "90.44", detail: "96.0 ToolUse_Calculator_Python â€” lÃ­der en tool-use matemÃ¡tico con Python" },
    warning: true,
  },
  {
    id: "verification",
    number: "06",
    title: "Trazabilidad, verificaciÃ³n de pasos y equivalencia formal",
    color: "violet",
    summary:
      "Dada una cadena de razonamiento simbÃ³lico, Â¿es cada paso algebraicamente equivalente al anterior? Â¿Hay un error de signo en el paso 5 que el modelo no detectÃ³? Esta lÃ­nea investiga no cÃ³mo resolver el problema, sino cÃ³mo auditar que la resoluciÃ³n de cualquier agente es correcta.",
    detail:
      "Math_Equivalence_Verification mide la capacidad de comprobar si dos expresiones simbÃ³licas son equivalentes. ProofStep_Validity_Index evalÃºa la detecciÃ³n de pasos de prueba invÃ¡lidos en una cadena de razonamiento. GSM_Symbolic_Robustness mide la robustez del razonamiento simbÃ³lico ante perturbaciones. DeepSeek-R1 lidera con 98.0 en equivalencia â€” la capacidad mÃ¡s directamente relevante para Prisma MatemÃ¡tico.",
    benchmarks: [
      { name: "Math_Equivalence_Verification", desc: "VerificaciÃ³n de equivalencia entre expresiones simbÃ³licas" },
      { name: "ProofStep_Validity_Index", desc: "DetecciÃ³n de pasos de prueba invÃ¡lidos en cadenas de razonamiento" },
      { name: "GSM_Symbolic_Robustness", desc: "Robustez del razonamiento simbÃ³lico ante perturbaciones" },
    ],
    topModel: { name: "DeepSeek-R1", score: "96.55", detail: "98.0 Math_Equivalence_Verification Â· 96.5 ProofStep_Validity_Index Â· 94.8 GSM_Symbolic_Robustness" },
  },
];

const PROJECTS = [
  {
    id: "prisma",
    name: "Prisma MatemÃ¡tico",
    tagline: "Verificar es mÃ¡s fÃ¡cil que generar â€” y mÃ¡s importante",
    desc: "Toma una demostraciÃ³n, una derivaciÃ³n algebraica o una soluciÃ³n multi-paso generada por cualquier modelo, la desmonta paso a paso, y verifica si cada eslabÃ³n es vÃ¡lido antes de aceptar el resultado final. No resuelve problemas matemÃ¡ticos: audita soluciones ya generadas. Usa DeepSeek-R1 para la verificaciÃ³n lÃ³gica de cada paso y Claude 3.7 Sonnet + SymPy para la verificaciÃ³n simbÃ³lica computacional de equivalencias algebraicas.",
    color: "indigo",
    researchLines: ["02", "06"],
    stack: [
      { role: "VerificaciÃ³n lÃ³gica de cada paso del razonamiento", tech: "DeepSeek-R1 â€” lÃ­der verificaciÃ³n formal y equivalencia (96.55/100, 98.0 Math_Equivalence_Verification)" },
      { role: "EjecuciÃ³n simbÃ³lica verificada con herramientas computacionales", tech: "Claude 3.7 Sonnet â€” lÃ­der tool-use matemÃ¡tico (90.44/100, 96.0 ToolUse_Calculator_Python)" },
      { role: "Motor de verificaciÃ³n simbÃ³lica algebraica", tech: "SymPy â€” Ã¡lgebra simbÃ³lica Python: simplify(lhs - rhs) == 0 para equivalencia computacional" },
      { role: "SegmentaciÃ³n de cadenas de razonamiento en pasos atÃ³micos", tech: "Claude 3.7 Sonnet â€” clasificaciÃ³n: aritmÃ©tico | algebraico | lÃ³gico | definitorio" },
      { role: "Almacenamiento", tech: "DuckDB â€” registro de verificaciones con resultado por paso y veredicto global" },
    ],
    whyModels: [
      { model: "DeepSeek-R1", role: "VerificaciÃ³n lÃ³gica y formal de pasos", score: "96.55", area: "Trazabilidad, VerificaciÃ³n y Equivalencia Formal" },
      { model: "Claude 3.7 Sonnet", role: "EjecuciÃ³n simbÃ³lica con SymPy", score: "90.44", area: "Memoria, Herramientas y Robustez (96.0 ToolUse_Calculator_Python)" },
    ],
    flow: [
      "Entrada: cadena de razonamiento matemÃ¡tico generada por cualquier modelo (demostraciÃ³n, derivaciÃ³n algebraica, soluciÃ³n multi-paso en LaTeX o texto plano)",
      "SegmentaciÃ³n en pasos atÃ³micos (Claude 3.7 Sonnet): identificaciÃ³n de cada afirmaciÃ³n individual, clasificaciÃ³n del tipo de paso (aritmÃ©tico | algebraico | lÃ³gico | definitorio), extracciÃ³n de premisas y conclusiÃ³n de cada paso",
      "Para cada paso â€” verificaciÃ³n lÃ³gica (DeepSeek-R1): Â¿la conclusiÃ³n se sigue de las premisas por las reglas invocadas? Â¿la regla existe y se aplica correctamente? Etiquetado: VÃLIDO | INVÃLIDO | INDETERMINADO",
      "Para cada paso algebraico â€” verificaciÃ³n simbÃ³lica (Claude 3.7 Sonnet + SymPy): simplify(lhs - rhs) == 0 en sandbox aislado con timeout. Resultado: EQUIVALENTE | NO_EQUIVALENTE | ERROR_EJECUCIÃ“N",
      "SÃ­ntesis del informe: pasos vÃ¡lidos N, pasos invÃ¡lidos N (con descripciÃ³n del error), pasos indeterminados N (requieren revisiÃ³n humana), veredicto global: VERIFICADO | CONTIENE_ERRORES | PARCIALMENTE_VERIFICADO",
      "Salida: informe JSON estructurado + anotaciÃ³n del razonamiento original con marcas por paso",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado prisma_matematico.py con las siguientes funciones:
1. segment_reasoning(text: str, llm_client) -> list[dict]: segmenta una cadena de
   razonamiento matemÃ¡tico en pasos atÃ³micos. Cada paso debe tener:
   {step_id: int, raw_text: str, step_type: str ("arithmetic"|"algebraic"|"logical"|
   "definitional"), premises: list[str], conclusion: str}.
2. verify_step_logic(step: dict, llm_client) -> dict: verifica la validez lÃ³gica
   de un paso usando el LLM. Devuelve:
   {step_id, logic_status: "VALID"|"INVALID"|"INDETERMINATE",
    confidence: float, error_description: str | null}.
3. verify_step_symbolic(step: dict) -> dict: si el paso es algebraico, verifica
   la equivalencia simbÃ³lica usando SymPy. Devuelve:
   {step_id, symbolic_status: "EQUIVALENT"|"NOT_EQUIVALENT"|"EXECUTION_ERROR",
    sympy_result: str | null, error: str | null}.
4. synthesize_verification_report(steps: list[dict], logic_results: list[dict],
   symbolic_results: list[dict]) -> dict: genera el informe final:
   {total_steps, valid_steps, invalid_steps, indeterminate_steps,
    overall_verdict: "VERIFIED"|"CONTAINS_ERRORS"|"PARTIALLY_VERIFIED",
    step_details: list[dict], reliability_score: float}.
Usa sympy, subprocess (para sandbox), duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el verificador lÃ³gico de Prisma MatemÃ¡tico en el Laboratorio de MatemÃ¡ticas
& Procesos Complejos de Horizon.
Se te proporciona un paso de un razonamiento matemÃ¡tico con sus premisas explicitadas
y su conclusiÃ³n. Tu funciÃ³n no es resolver el problema: es verificar si la conclusiÃ³n
se sigue de las premisas mediante las reglas matemÃ¡ticas correctamente aplicadas.

Tu tarea:
1. Identifica la regla o propiedad matemÃ¡tica que conecta las premisas con la conclusiÃ³n
   (p. ej. distributividad, teorema de PitÃ¡goras, regla del producto de derivadas).
2. Verifica si esa regla existe, si aplica en el contexto dado y si se aplica
   correctamente.
3. Si el paso es aritmÃ©tico, verifica el cÃ¡lculo exacto.
4. Clasifica el paso como VALID, INVALID o INDETERMINATE.

Restricciones crÃ­ticas:
- INDETERMINATE solo cuando no tienes informaciÃ³n suficiente para decidir
  (variables sin definir, contexto cortado, notaciÃ³n ambigua).
- No des por vÃ¡lido un paso solo porque el resultado final "parezca razonable".
- No afirmes que el razonamiento "demuestra" nada: solo que cada paso
  es o no es vÃ¡lido segÃºn las reglas invocadas.
- Si detectas un error, descrÃ­belo con precisiÃ³n: quÃ© regla se violÃ³ y en quÃ© sentido.

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
    tagline: "La respuesta a un problema con incertidumbre no es un nÃºmero, es una distribuciÃ³n",
    desc: "A partir de una descripciÃ³n del problema en lenguaje natural, configura una simulaciÃ³n Monte Carlo, la ejecuta con NumPy/SciPy y traduce los resultados en un lenguaje que no requiere estadÃ­stica avanzada para interpretarse. Define las distribuciones de probabilidad de cada variable, identifica correlaciones, ejecuta hasta 10.000 iteraciones en sandbox aislado y devuelve percentiles, probabilidades de umbral y un anÃ¡lisis de sensibilidad por variable.",
    color: "teal",
    researchLines: ["02", "05"],
    stack: [
      { role: "AnÃ¡lisis del problema y formulaciÃ³n de variables con distribuciones", tech: "DeepSeek-R1 â€” lÃ­der razonamiento multi-paso (97.18/100, 98.4 GSM8K_ChainOfThought)" },
      { role: "GeneraciÃ³n y ejecuciÃ³n de cÃ³digo de simulaciÃ³n con Python/NumPy", tech: "Claude 3.7 Sonnet â€” lÃ­der tool-use matemÃ¡tico (90.44/100, 96.0 ToolUse_Calculator_Python)" },
      { role: "OrquestaciÃ³n del flujo multi-etapa completo", tech: "AutoGen-Sonnet-Team â€” lÃ­der planificaciÃ³n multi-agente (92.30/100, 93.5 MAFBench_Planning)" },
      { role: "Motor de simulaciÃ³n Monte Carlo", tech: "NumPy (muestreo aleatorio) + SciPy (distribuciones: normal, lognormal, triangular, uniforme, beta)" },
      { role: "VisualizaciÃ³n y entorno de ejecuciÃ³n", tech: "matplotlib/plotly â€” sandbox Python aislado con timeout configurable" },
    ],
    whyModels: [
      { model: "DeepSeek-R1", role: "FormulaciÃ³n de variables y distribuciones", score: "97.18", area: "Razonamiento Multi-Paso y Chain-of-Thought" },
      { model: "Claude 3.7 Sonnet", role: "GeneraciÃ³n y ejecuciÃ³n de cÃ³digo Monte Carlo", score: "90.44", area: "Memoria, Herramientas y Robustez" },
      { model: "AutoGen-Sonnet-Team", role: "OrquestaciÃ³n del flujo multi-etapa", score: "92.30", area: "PlanificaciÃ³n y CoordinaciÃ³n Multi-Agente" },
    ],
    flow: [
      "Entrada: descripciÃ³n del problema de riesgo en lenguaje natural (ej. Â«Un proyecto de construcciÃ³n tiene duraciÃ³n estimada entre 8 y 14 meses, con mayor probabilidad en torno a 11 meses. El coste por mes de retraso es entre 50.000 y 80.000 EURÂ»)",
      "AnÃ¡lisis y formulaciÃ³n de variables (DeepSeek-R1): identificaciÃ³n de variables inciertas y sus rangos, selecciÃ³n de distribuciÃ³n de probabilidad para cada variable (normal, lognormal, triangular, uniforme, beta), identificaciÃ³n de correlaciones entre variables, definiciÃ³n de la mÃ©trica de salida",
      "GeneraciÃ³n del cÃ³digo de simulaciÃ³n (Claude 3.7 Sonnet): cÃ³digo Python con NumPy/SciPy, N iteraciones configurables (default: 10.000), cÃ¡lculo de la mÃ©trica de salida en cada iteraciÃ³n",
      "EjecuciÃ³n en sandbox Python aislado con timeout configurable",
      "AnÃ¡lisis de resultados: media, mediana, desviaciÃ³n tÃ­pica, percentiles P5/P25/P50/P75/P90/P95/P99, probabilidad de superar umbrales crÃ­ticos definidos por el usuario",
      "InterpretaciÃ³n en lenguaje natural (DeepSeek-R1): traducciÃ³n de percentiles a enunciados accionables, identificaciÃ³n de variables con mayor impacto en la variabilidad (anÃ¡lisis de sensibilidad)",
      "Salida A: grÃ¡fico de distribuciÃ³n (histograma + densidad + percentiles) Â· Salida B: tabla de percentiles y probabilidades Â· Salida C: cÃ³digo Python reproducible Â· Salida D: resumen para el tomador de decisiÃ³n",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado predictor_riesgo.py con las siguientes funciones:
1. parse_risk_problem(description: str, llm_client) -> dict: analiza la descripciÃ³n
   del problema y devuelve la estructura de simulaciÃ³n:
   {variables: [{name, distribution_type: str, params: dict, description: str}],
    correlations: list[{var1, var2, correlation_coeff}],
    output_metric: {name, formula: str, unit: str},
    critical_thresholds: list[float]}.
2. generate_simulation_code(problem_structure: dict, n_iterations: int = 10000,
   llm_client) -> str: genera cÃ³digo Python completo y ejecutable que:
   - Importa numpy, scipy.stats y matplotlib.
   - Muestrea cada variable segÃºn su distribuciÃ³n en n_iterations iteraciones.
   - Calcula la mÃ©trica de salida en cada iteraciÃ³n.
   - Devuelve el array de resultados como numpy array.
3. run_simulation(code: str, timeout_seconds: int = 120) -> dict:
   ejecuta el cÃ³digo en subprocess aislado. Devuelve:
   {success: bool, results: list[float] | null, error: str | null,
    execution_time_ms: float}.
4. analyze_results(results: list[float], thresholds: list[float]) -> dict:
   calcula estadÃ­sticos descriptivos y probabilidades de umbral. Devuelve:
   {mean, median, std, percentiles: dict, threshold_probs: dict,
    sensitivity_ranking: list[str]}.
5. generate_interpretation(analysis: dict, problem: dict, llm_client) -> str:
   genera un resumen en lenguaje natural de los resultados, sin usar jerga
   estadÃ­stica innecesaria, orientado al tomador de decisiÃ³n no tÃ©cnico.
6. plot_distribution(results: list[float], analysis: dict,
   output_path: str) -> None: genera el histograma con curva de densidad,
   percentiles marcados y umbrales crÃ­ticos.
Usa numpy, scipy, matplotlib, subprocess y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el analista de riesgo cuantitativo de Predictor de Riesgo en el Laboratorio
de MatemÃ¡ticas & Procesos Complejos de Horizon.
Se te proporciona una descripciÃ³n en lenguaje natural de un problema con incertidumbre.

Tarea 1 â€” IdentificaciÃ³n de variables:
Para cada variable incierta mencionada:
1. Identifica su nombre y unidad.
2. Selecciona la distribuciÃ³n de probabilidad mÃ¡s apropiada:
   - Triangular: cuando hay mÃ­nimo, moda y mÃ¡ximo conocidos.
   - Normal: cuando la variable es simÃ©trica alrededor de la media.
   - Lognormal: cuando la variable no puede ser negativa y tiene sesgo positivo.
   - Uniforme: cuando cualquier valor en el rango es igualmente probable.
   - Beta: cuando la variable estÃ¡ acotada en [0,1] (porcentajes, probabilidades).
3. Extrae los parÃ¡metros de la distribuciÃ³n de los datos del enunciado.

Tarea 2 â€” Correlaciones:
Si el enunciado implica que dos variables estÃ¡n relacionadas, identifÃ­calo y estima
un coeficiente de correlaciÃ³n de Pearson entre -1 y 1.

Tarea 3 â€” DefiniciÃ³n de la mÃ©trica de salida:
Define la fÃ³rmula matemÃ¡tica que combina las variables de entrada en la mÃ©trica
que el usuario quiere estimar. ExprÃ©sala como una expresiÃ³n Python evaluable.

Restricciones:
- Si un parÃ¡metro de distribuciÃ³n no estÃ¡ en el enunciado, seÃ±Ã¡lalo como
  "requires_user_input" y no lo asumas.
- No afirmes certeza en la elecciÃ³n de distribuciÃ³n: es una propuesta tÃ©cnica
  que el usuario debe validar.

Responde en JSON conforme a la estructura de parse_risk_problem.`,
  },
  {
    id: "simplex",
    name: "Simplex Helios",
    tagline: "Claridad donde habÃ­a confusiÃ³n: del enunciado verbal a la soluciÃ³n Ã³ptima",
    desc: "Convierte una descripciÃ³n en lenguaje natural de un problema de asignaciÃ³n de recursos en una formulaciÃ³n de programaciÃ³n lineal correcta, la resuelve con scipy.optimize.linprog o PuLP, y devuelve la soluciÃ³n con una interpretaciÃ³n prÃ¡ctica de quÃ© significa en el contexto original. La formulaciÃ³n del problema es siempre el cuello de botella â€” Simplex Helios lo elimina.",
    color: "violet",
    researchLines: ["03", "04", "06"],
    stack: [
      { role: "FormulaciÃ³n del problema LP a partir de enunciado verbal", tech: "Claude 3.7 Sonnet â€” lÃ­der razonamiento cuantitativo mixto (94.34/100, 97.2 SVAMP_Math_Word_Problems)" },
      { role: "VerificaciÃ³n de coherencia de restricciones y validaciÃ³n de soluciÃ³n", tech: "DeepSeek-R1 â€” lÃ­der verificaciÃ³n formal (96.55/100, 98.0 Math_Equivalence_Verification)" },
      { role: "OrquestaciÃ³n del flujo multi-etapa", tech: "AutoGen-Sonnet-Team â€” lÃ­der planificaciÃ³n multi-agente (92.30/100)" },
      { role: "Motor de optimizaciÃ³n (LP continuo)", tech: "scipy.optimize.linprog â€” programaciÃ³n lineal continua" },
      { role: "Motor de optimizaciÃ³n (LP entero)", tech: "PuLP â€” programaciÃ³n lineal entera (variables enteras o binarias)" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "FormulaciÃ³n LP desde enunciado verbal", score: "94.34", area: "Razonamiento Cuantitativo Mixto (97.2 SVAMP)" },
      { model: "DeepSeek-R1", role: "VerificaciÃ³n de coherencia y validaciÃ³n de soluciÃ³n", score: "96.55", area: "Trazabilidad, VerificaciÃ³n y Equivalencia Formal" },
      { model: "AutoGen-Sonnet-Team", role: "OrquestaciÃ³n multi-etapa", score: "92.30", area: "PlanificaciÃ³n y CoordinaciÃ³n Multi-Agente" },
    ],
    flow: [
      "Entrada: descripciÃ³n en lenguaje natural del problema de asignaciÃ³n de recursos (ej. Â«Una empresa produce dos productos A y B. Cada unidad de A requiere 2h de mÃ¡quina y 1h de mano de obraâ€¦Â»)",
      "FormulaciÃ³n del problema LP (Claude 3.7 Sonnet): identificaciÃ³n de variables de decisiÃ³n y sus dominios, funciÃ³n objetivo con coeficientes y direcciÃ³n (maximizar/minimizar), restricciones con matriz de coeficientes A, vector de lÃ­mites b y tipo (<= | >= | =), restricciones de no negatividad y de entero si aplica",
      "VerificaciÃ³n de coherencia (DeepSeek-R1): Â¿el sistema de restricciones es factible? Â¿hay restricciones redundantes o contradictorias? Â¿la funciÃ³n objetivo estÃ¡ acotada en la regiÃ³n factible?",
      "ResoluciÃ³n (scipy.optimize.linprog o PuLP): ejecuciÃ³n del solucionador con los parÃ¡metros formulados, obtenciÃ³n de la soluciÃ³n Ã³ptima o informe de infactibilidad",
      "VerificaciÃ³n de la soluciÃ³n (DeepSeek-R1): comprobaciÃ³n de que cada restricciÃ³n se satisface con la soluciÃ³n, cÃ¡lculo del valor de la funciÃ³n objetivo, identificaciÃ³n de restricciones activas (saturadas) vs. holgadas",
      "InterpretaciÃ³n en lenguaje natural (Claude 3.7 Sonnet): traducciÃ³n de la soluciÃ³n a tÃ©rminos del problema original, explicaciÃ³n de quÃ© restricciones limitan el Ã³ptimo, anÃ¡lisis de sensibilidad â€” Â¿cuÃ¡nto puede cambiar un parÃ¡metro antes de que cambie la soluciÃ³n?",
      "Salida A: vector de soluciÃ³n con valores de cada variable Â· Salida B: valor de la funciÃ³n objetivo Â· Salida C: anÃ¡lisis de sensibilidad Â· Salida D: grÃ¡fico 2D de la regiÃ³n factible (si hay 2 variables) Â· Salida E: formulaciÃ³n LP en LaTeX",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado simplex_helios.py con las siguientes funciones:
1. parse_lp_problem(description: str, llm_client) -> dict: extrae la formulaciÃ³n
   de programaciÃ³n lineal del enunciado. Devuelve:
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
   verifica computacionalmente que la soluciÃ³n satisface todas las restricciones.
   Devuelve: {all_satisfied: bool,
   violations: list[{constraint_name, slack, tolerance}]}.
5. interpret_solution(lp: dict, solution: dict, solver_result: dict,
   llm_client) -> str: genera la interpretaciÃ³n en lenguaje natural de la soluciÃ³n
   en tÃ©rminos del problema original, incluyendo quÃ© restricciones son activas.
6. plot_feasible_region(lp: dict, solution: dict,
   output_path: str) -> None: si el problema tiene exactamente 2 variables,
   genera el grÃ¡fico 2D de la regiÃ³n factible con la soluciÃ³n Ã³ptima marcada.
Usa scipy, pulp, numpy, matplotlib y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el formulador de problemas de programaciÃ³n lineal de Simplex Helios en el
Laboratorio de MatemÃ¡ticas & Procesos Complejos de Horizon.
Se te proporciona un enunciado en lenguaje natural de un problema de asignaciÃ³n
de recursos u optimizaciÃ³n.

Tu tarea es extraer la formulaciÃ³n matemÃ¡tica completa del problema.

Proceso recomendado:
1. Identifica primero QUÃ‰ se decide (las variables de decisiÃ³n y sus unidades).
2. Identifica QUÃ‰ se quiere maximizar o minimizar (la funciÃ³n objetivo).
3. Identifica QUÃ‰ limita las decisiones (las restricciones).
4. Verifica que has capturado TODAS las restricciones del enunciado,
   incluyendo las implÃ­citas (no negatividad, capacidades mÃ¡ximas).

Requisitos crÃ­ticos:
- Si el enunciado es ambiguo sobre si una restricciÃ³n es <= o >=, seÃ±Ã¡lalo
  explÃ­citamente y propÃ³n ambas interpretaciones.
- Si falta informaciÃ³n para completar algÃºn parÃ¡metro, ponlo como null
  y aÃ±ade una nota en "warnings" explicando quÃ© falta.
- No asumas que el problema es de minimizaciÃ³n o maximizaciÃ³n: extrÃ¡elo del enunciado.
- Genera la funciÃ³n objetivo y cada restricciÃ³n tambiÃ©n en formato LaTeX.

Responde en JSON conforme a la estructura de parse_lp_problem.
DespuÃ©s del JSON, aÃ±ade una secciÃ³n "FORMULACIÃ“N LaTeX" con el problema completo
en notaciÃ³n matemÃ¡tica estÃ¡ndar.`,
  },
];

const MARKET_APPS = [
  {
    name: "Wolfram Alpha + Wolfram Language",
    desc: "Motor de conocimiento computacional que resuelve problemas matemÃ¡ticos, simbÃ³licos y cuantitativos con respuestas paso a paso. La versiÃ³n Pro incorpora integraciÃ³n con modelos de lenguaje. Wolfram Language es el lenguaje de programaciÃ³n simbÃ³lica de Mathematica.",
    tag: "CÃ³mputo simbÃ³lico",
    url: "https://wolframalpha.com",
  },
  {
    name: "MATLAB + Statistics Toolbox",
    desc: "Entorno de computaciÃ³n numÃ©rica estÃ¡ndar en ingenierÃ­a y ciencia. El toolbox de estadÃ­stica incluye funciones para simulaciÃ³n Monte Carlo, ajuste de distribuciones y anÃ¡lisis de sensibilidad.",
    tag: "ComputaciÃ³n numÃ©rica",
    url: "https://mathworks.com/products/matlab",
  },
  {
    name: "Gurobi Optimizer",
    desc: "Solucionador comercial de referencia para programaciÃ³n lineal, entera y cuadrÃ¡tica. Ampliamente usado en optimizaciÃ³n industrial, logÃ­stica y finanzas. Ofrece API Python (gurobipy).",
    tag: "OptimizaciÃ³n industrial",
    url: "https://gurobi.com",
  },
  {
    name: "Palisade @RISK",
    desc: "Software de anÃ¡lisis de riesgo mediante simulaciÃ³n Monte Carlo integrado en Excel. Permite definir distribuciones de probabilidad en celdas de Excel y ejecutar simulaciones directamente.",
    tag: "Monte Carlo en Excel",
    url: "https://lumivero.com/products/risk",
  },
  {
    name: "Symbolab",
    desc: "Herramienta web de resoluciÃ³n de problemas matemÃ¡ticos paso a paso con soporte para Ã¡lgebra, cÃ¡lculo, ecuaciones diferenciales y estadÃ­stica. Orientada a uso educativo y acadÃ©mico.",
    tag: "ResoluciÃ³n paso a paso",
    url: "https://symbolab.com",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 AsimetrÃ­a en la cobertura de benchmarks por modelo",
    items: [
      "MatemÃ¡ticas de CompeticiÃ³n: Claude 3.7 Sonnet (67%) carece de evaluaciÃ³n en AIME_2025 (Fuente: STATER Math Leaderboard, latest_rankings_math.md).",
      "Razonamiento Multi-Paso: o1-preview (67%) no cuenta con datos registrados para Socratic_Math.",
      "Razonamiento ComÃºn Cuantitativo: GPT-4.5 (67%) carece de resultado en ARC_Math_Challenge.",
      "Memoria y Uso de Herramientas: ningÃºn modelo alcanza el 100% de cobertura â€” Claude 3.7 Sonnet carece de datos en MemoryAgentBench, AutoGen-Sonnet-Team no tiene registro en ToolUse_Calculator_Python y GPT-4.5 sÃ³lo cuenta con evaluaciÃ³n en StableToolBench_Math (33% de cobertura).",
      "Trazabilidad y VerificaciÃ³n Formal: tanto o1-preview (67%) como Claude 3.7 Sonnet (67%) no registran evaluaciÃ³n en GSM_Symbolic_Robustness.",
    ],
  },
  {
    id: "v2",
    title: "4.2 Diferencial estrecho en Razonamiento Multi-Paso",
    items: [
      "Entre DeepSeek-R1 (97.18/100) y Claude 3.7 Sonnet (96.95/100), ambos con 100% de cobertura, la diferencia es de 0.23 puntos (Fuente: STATER Math Leaderboard, latest_rankings_math.md).",
      "Dado que la diferencia es menor a 0.5 puntos con cobertura idÃ©ntica, antes de recomendar pÃºblicamente uno sobre otro para tareas de razonamiento multi-paso crÃ­ticas se recomienda verificar si el sistema de ponderaciÃ³n normaliza el orden por margen mÃ­nimo.",
      "Los proyectos del laboratorio asignan DeepSeek-R1 a las tareas de verificaciÃ³n formal (donde su margen es mÃ¡s amplio: 96.55 vs. 82.35 de Claude en esa Ã¡rea) y Claude a las de tool-use computacional (donde lidera con mÃ¡s holgura: 90.44 vs. modelos sin cobertura).",
    ],
  },
  {
    id: "v3",
    title: "4.3 Ausencia de benchmarks de Monte Carlo y programaciÃ³n lineal",
    items: [
      "Predictor de Riesgo y Simplex Helios se fundamentan en capacidades de razonamiento cuantitativo (Ã¡rea 3), razonamiento multi-paso (Ã¡rea 2) y uso de herramientas (Ã¡rea 5) como proxies vÃ¡lidos.",
      "El catÃ¡logo oficial no incluye benchmarks especÃ­ficos de simulaciÃ³n Monte Carlo ni de formulaciÃ³n de problemas de programaciÃ³n lineal a partir de enunciados verbales.",
      "Las evaluaciones cuantitativas dedicadas a estas tareas concretas quedan catalogadas como [DATO PENDIENTE DE VERIFICAR].",
    ],
  },
  {
    id: "v4",
    title: "4.4 Costes computacionales y latencia en test-time compute",
    items: [
      "Los modelos o1-preview y DeepSeek-R1 utilizan razonamiento extendido en tiempo de inferencia (test-time compute scaling: asignar mÃ¡s cÃ³mputo en el momento de la inferencia para mejorar la calidad de la respuesta).",
      "El tiempo medio de inferencia por problema de competiciÃ³n y el nÃºmero de tokens de razonamiento generados no constan en el archivo de rankings y permanecen como [DATO PENDIENTE DE VERIFICAR].",
      "Este dato es especialmente relevante para Prisma MatemÃ¡tico, donde el coste por verificaciÃ³n de paso afecta directamente al coste operativo del sistema en uso intensivo.",
    ],
  },
  {
    id: "v5",
    title: "4.5 Disponibilidad de AutoGen-Sonnet-Team como componente de producciÃ³n",
    items: [
      "AutoGen-Sonnet-Team aparece como lÃ­der en planificaciÃ³n multi-agente con 92.30/100 (Fuente: STATER Math Leaderboard, latest_rankings_math.md).",
      "La disponibilidad de esta arquitectura especÃ­fica como componente integrable en producciÃ³n (vÃ­a AutoGen Studio u otras interfaces), incluyendo la versiÃ³n exacta de AutoGen utilizada en la evaluaciÃ³n, debe verificarse antes de basar en ella una decisiÃ³n de stack tÃ©cnico.",
      "Predictor de Riesgo y Simplex Helios dependen de esta arquitectura para la orquestaciÃ³n â€” verificar disponibilidad antes de iniciar los prototipos.",
    ],
  },
];

// â”€â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo lÃ­der Â· STATER Math Leaderboard</p>
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
          {copied ? "âœ“ Copiado" : "Copiar"}
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
          <span className="text-xs text-white/30">LÃ­neas de investigaciÃ³n:</span>
          {project.researchLines.map((n) => {
            const line = RESEARCH_LINES.find((l) => l.number === n);
            return (
              <span key={n} className={`text-xs border px-2 py-0.5 rounded-full ${c.badge}`}>
                {n} Â· {line?.title.split(" ").slice(0, 3).join(" ")}â€¦
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Componentes tÃ©cnicos</p>
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por quÃ© estos modelos Â· STATER Math Leaderboard</p>
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
            <PromptBlock label="prompt_ide.txt â€” Para Cursor / VS Code + Copilot" content={project.promptIDE} />
            <PromptBlock label="prompt_llm.txt â€” Para el modelo LLM asistente" content={project.promptLLM} />
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

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
                <span className="text-xs text-white/20">STATER Reasoning & Math Â· 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-indigo-400">MatemÃ¡ticas</span>
                {" & "}
                <span className="text-violet-400">Procesos Complejos</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                IA para verificaciÃ³n de razonamientos matemÃ¡ticos, simulaciÃ³n de riesgo y optimizaciÃ³n lineal. El estÃ¡ndar aquÃ­ no es Â«acierta el resultadoÂ»: es Â«el camino que recorre es correctoÂ».
              </p>

              {/* Nota de rigor */}
              <div className="mt-5 inline-flex items-start gap-2 border border-indigo-400/20 bg-indigo-400/5 rounded-xl px-4 py-3 max-w-xl">
                <Calculator size={13} className="text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-300/70 leading-relaxed">
                  <strong className="text-indigo-300">Nota de rigor formal:</strong> en todo este cuaderno se distingue entre Â«el modelo acierta el resultadoÂ» y Â«el modelo demuestra el razonamiento de forma rigurosaÂ». Son capacidades distintas, medidas de forma distinta, y se tratan como tales.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigaciÃ³n", value: "6" },
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

        {/* â”€â”€ MÃ³dulo 1 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <BarChart3 size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">MÃ³dulo 1</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">QuÃ© se investiga aquÃ­</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                No nos preguntamos solo si el modelo resuelve el problema: nos preguntamos si el camino que recorre es correcto, si cada paso es vÃ¡lido, y si cuando falla, falla de forma detectable o de forma silenciosa. Seis dimensiones que cubren el espectro completo, desde el problema de olimpiada donde la creatividad es esencial hasta el verificador formal donde el rigor es el Ãºnico criterio.
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
              Las seis lÃ­neas estÃ¡n diseÃ±adas para cubrir el espectro completo: desde el problema de olimpiada (lÃ­nea 01) donde la creatividad es esencial, hasta el verificador formal (lÃ­nea 06) donde el rigor es el Ãºnico criterio. Los tres proyectos del laboratorio viven en distintos puntos de ese espectro: Prisma en la verificaciÃ³n, Predictor en la simulaciÃ³n, Simplex en la optimizaciÃ³n.
            </p>
          </div>
        </section>

        {/* â”€â”€ MÃ³dulo 2 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">MÃ³dulo 2</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Casos de desarrollo</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Tres proyectos en tres registros distintos: Prisma MatemÃ¡tico audita razonamientos ya generados, Predictor de Riesgo convierte incertidumbre en distribuciones accionables, y Simplex Helios lleva cualquier problema de asignaciÃ³n de recursos desde el enunciado verbal hasta la soluciÃ³n Ã³ptima verificada.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* â”€â”€ MÃ³dulo 3 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <GitBranch size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">MÃ³dulo 3</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">QuÃ© aplicaciones ya existen en el mercado</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco aplicaciones reales de IA aplicada a razonamiento matemÃ¡tico, simulaciÃ³n y optimizaciÃ³n. Verificar caracterÃ­sticas actuales y precios en la web oficial de cada herramienta.
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
                    Verificar caracterÃ­sticas en web oficial
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* â”€â”€ MÃ³dulo 4 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={14} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-yellow-400/40 uppercase tracking-widest mb-1">MÃ³dulo 4</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Puntos a verificar</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco puntos que requieren revisiÃ³n antes de publicar o referenciar los datos de este cuaderno en materiales externos. Incluyen el diferencial estrecho entre modelos en razonamiento multi-paso, la ausencia de benchmarks especÃ­ficos de Monte Carlo y programaciÃ³n lineal, y la disponibilidad de AutoGen-Sonnet-Team como componente integrable.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {VERIFICATION_POINTS.map((point) => (
              <VerificationItem key={point.id} point={point} />
            ))}
          </div>
        </section>

        {/* â”€â”€ Footer CTA â”€â”€ */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo Â· STATER Reasoning & Math Leaderboard Â· 2026-08-29</p>
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
            <Link to="/foro" className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all">
              Publicar un proyecto
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

