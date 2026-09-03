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
import { HardHat } from "lucide-react";
import { ShieldAlert } from "lucide-react";

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RESEARCH_LINES = [
  {
    id: "mdo",
    number: "01",
    title: "Diseño de ingeniería multidisciplinar y física aplicada",
    color: "cyan",
    summary:
      "La Optimización de Diseño Multidisciplinar (MDO) es el proceso de optimizar simultáneamente parámetros de distintas disciplinas (aerodinámica, estructura, propulsión, masa) que se afectan mutuamente. En aviación, cambiar el ala para mejorar la sustentación cambia la distribución de masa y afecta la estabilidad.",
    detail:
      "El laboratorio investiga si un modelo puede razonar sobre esas interdependencias para proponer configuraciones de diseño coherentes entre disciplinas. EngDesign_Benchmark evalúa el razonamiento de diseño multidisciplinar. RocketBench_Physics mide el razonamiento físico aplicado a sistemas de propulsión. DesignQA evalúa la calidad del razonamiento de diseño en preguntas abiertas.",
    benchmarks: [
      { name: "EngDesign_Benchmark", desc: "Razonamiento de diseño multidisciplinar en sistemas complejos" },
      { name: "RocketBench_Physics", desc: "Física aplicada a sistemas de propulsión aeroespacial" },
      { name: "DesignQA", desc: "Calidad de razonamiento de diseño en preguntas abiertas de ingeniería" },
    ],
    topModel: { name: "GPT-4.5", score: "90.35", detail: "89.1 EngDesign_Benchmark · 88.4 RocketBench_Physics · 94.2 DesignQA" },
  },
  {
    id: "software-arch",
    number: "02",
    title: "Arquitectura de software asistida por modelos de lenguaje",
    color: "violet",
    summary:
      "Los Architecture Decision Records (ADRs) son documentos que registran formalmente por qué se tomó una decisión arquitectónica, qué alternativas se consideraron y cuáles fueron las consecuencias esperadas. La IA puede ayudar a generarlos, detectar inconsistencias y evaluar tradeoffs como escalabilidad frente a complejidad operativa.",
    detail:
      "ArchBench_Core mide la capacidad de razonar sobre decisiones arquitectónicas de software (microservicios vs. monolito, consistencia vs. disponibilidad en sistemas distribuidos). SAKE_Architecture evalúa el conocimiento de arquitecturas de software establecidas. GenAI_Arch_Patterns mide el reconocimiento y aplicación de patrones arquitectónicos en sistemas que incorporan IA generativa.",
    benchmarks: [
      { name: "ArchBench_Core", desc: "Razonamiento sobre decisiones y tradeoffs arquitectónicos de software" },
      { name: "SAKE_Architecture", desc: "Conocimiento de arquitecturas de software establecidas" },
      { name: "GenAI_Arch_Patterns", desc: "Patrones arquitectónicos en sistemas con IA generativa" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "91.82", detail: "Líder en razonamiento arquitectónico de software y generación de ADRs estructurados" },
  },
  {
    id: "prd-to-arch",
    number: "03",
    title: "Transformación de requisitos a diagramas técnicos",
    color: "cyan",
    summary:
      "Un PRD (Product Requirements Document) llega al equipo de arquitectura y alguien tiene que transformarlo en diagramas de componentes, secuencia y contenedores en formato PlantUML o en el modelo C4 â€” un marco de diagramas con cuatro niveles: Contexto, Contenedores, Componentes y Código.",
    detail:
      "R2ABench_PRD_to_UML mide cuánto de ese trabajo puede hacerse de forma automática con calidad suficiente. PRD_Interface_Synthesis evalúa la capacidad de sintetizar interfaces de sistema a partir de requisitos funcionales no estructurados. Gemini 2.0 Pro (67% de cobertura) no cuenta con datos registrados para PRD_Interface_Synthesis â€” ver Módulo 4, punto 4.1.",
    benchmarks: [
      { name: "R2ABench_PRD_to_UML", desc: "Transformación automática de PRD a diagramas UML y C4" },
      { name: "PRD_Interface_Synthesis", desc: "Síntesis de interfaces de sistema desde requisitos no estructurados" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "91.48", detail: "91.2 R2ABench_PRD_to_UML · 94.0 PRD_Interface_Synthesis" },
  },
  {
    id: "semantic-search",
    number: "04",
    title: "Búsqueda semántica en documentación técnica y código",
    color: "emerald",
    summary:
      "Los ingenieros pasan una parte significativa de su tiempo buscando en documentación técnica, bases de código y especificaciones previas. Un motor de búsqueda semántica especializado en documentación de ingeniería puede recuperar el fragmento correcto aunque las palabras clave no coincidan exactamente.",
    detail:
      "La suite MTEB (Massive Text Embedding Benchmark) mide la calidad de los modelos de embedding en tareas de recuperación y agrupamiento. En el contexto de ingeniería, esto incluye búsqueda de APIs relevantes, recuperación de especificaciones similares y agrupamiento de incidencias. MTEB cubre retrieval, clustering, classification, reranking y STS (Semantic Textual Similarity).",
    benchmarks: [
      { name: "MTEB_Retrieval", desc: "Recuperación de documentos relevantes por similitud semántica" },
      { name: "MTEB_Clustering", desc: "Agrupamiento semántico de especificaciones e incidencias" },
      { name: "MTEB_STS", desc: "Similitud textual semántica para deduplicación de requisitos" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "88.94", detail: "Líder en búsqueda semántica de documentación técnica y código de ingeniería" },
  },
  {
    id: "agents",
    number: "05",
    title: "Agentes autónomos de optimización en bucles de simulación",
    color: "violet",
    summary:
      "Los flujos de optimización CAD/CAE son iterativos: se propone un diseño, se simula, se analiza el resultado, se ajustan parámetros, se vuelve a simular. Un agente autónomo que pueda ejecutar ese bucle sin intervención humana en cada iteración puede explorar el espacio de diseño mucho más rápido.",
    detail:
      "DUCTILE_Agent_Workflow mide la fiabilidad de agentes en flujos de ingeniería complejos. MDO_Autonomous_Loop evalúa bucles autónomos de optimización multidisciplinar. Conceptual_Systems_Agent mide la capacidad de agentes para razonar sobre sistemas en fase conceptual. La disponibilidad de DUCTILE-Sonnet-Agent como componente integrable debe verificarse â€” ver Módulo 4, punto 4.3.",
    benchmarks: [
      { name: "DUCTILE_Agent_Workflow", desc: "Fiabilidad de agentes en flujos de ingeniería complejos" },
      { name: "MDO_Autonomous_Loop", desc: "Bucles autónomos de optimización multidisciplinar" },
      { name: "Conceptual_Systems_Agent", desc: "Agentes de razonamiento conceptual sobre sistemas complejos" },
    ],
    topModel: { name: "DUCTILE-Sonnet-Agent", score: "92.58", detail: "93.8 DUCTILE_Agent_Workflow · 91.2 MDO_Autonomous_Loop · 92.5 Conceptual_Systems_Agent" },
    warning: true,
  },
  {
    id: "safety",
    number: "06",
    title: "Trazabilidad de requisitos y seguridad en sistemas críticos",
    color: "emerald",
    summary:
      "En ingeniería aeronáutica, médica, nuclear o de infraestructuras, la trazabilidad bidireccional entre requisitos y código no es una buena práctica: es una obligación normativa. La capacidad de seguir cada requisito hasta el código que lo implementa, y viceversa, es condición de certificación.",
    detail:
      "EngSafety_Simulation_Verify mide la capacidad de los modelos de verificar que los sistemas simulados cumplen las restricciones de seguridad definidas en la especificación. Claude 3.7 Sonnet lidera este benchmark con 95.2, lo que lo convierte en el candidato natural para los módulos de verificación y auditoría de trazabilidad de los tres proyectos del laboratorio.",
    benchmarks: [
      { name: "EngSafety_Simulation_Verify", desc: "Verificación de cumplimiento de restricciones de seguridad en sistemas simulados" },
      { name: "Requirements_Traceability_Audit", desc: "Auditoría de trazabilidad bidireccional requisito-código" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "93.09", detail: "95.2 EngSafety_Simulation_Verify â€” líder en trazabilidad y verificación de sistemas críticos" },
  },
];

const PROJECTS = [
  {
    id: "vitruvio",
    name: "Vitruvio IA",
    tagline: "Veinte distribuciones en una hora; el arquitecto elige cinco",
    desc: "A partir de los requisitos básicos de un espacio â€” superficie, programa de estancias, orientación del solar, restricciones normativas â€” genera propuestas de distribución que satisfacen primero las restricciones de funcionalidad y circulación. La salida es una especificación estructurada (matriz de adyacencias, dimensiones aproximadas, orientación de huecos) importable en herramientas BIM. No genera renders 3D: genera puntos de partida que el arquitecto filtra y desarrolla.",
    color: "cyan",
    researchLines: ["01", "03", "06"],
    professionalDisclaimer: true,
    stack: [
      { role: "Razonamiento espacial y generación de distribuciones candidatas", tech: "GPT-4.5 â€” líder diseño ingeniería multidominio, 94.2 DesignQA (90.35/100)" },
      { role: "Síntesis de requisitos a especificación estructurada (PRD â†’ layout)", tech: "Claude 3.7 Sonnet â€” líder transformación PRDâ†’arquitectura (91.48/100)" },
      { role: "Verificación de restricciones (adyacencia, orientación, normativa)", tech: "Claude 3.7 Sonnet â€” líder trazabilidad y verificación (93.09/100, 95.2 EngSafety)" },
      { role: "Exportación de plano esquemático", tech: "svgwrite â€” SVG de la distribución con estancias etiquetadas y dimensionadas" },
      { role: "Almacenamiento", tech: "DuckDB â€” histórico de distribuciones generadas por proyecto" },
    ],
    whyModels: [
      { model: "GPT-4.5", role: "Razonamiento espacial multidisciplinar", score: "90.35", area: "Diseño de Ingeniería Multidominio" },
      { model: "Claude 3.7 Sonnet", role: "Síntesis PRD â†’ especificación estructurada", score: "91.48", area: "Requirement-to-Architecture (R2ABench)" },
      { model: "Claude 3.7 Sonnet", role: "Verificación de restricciones y trazabilidad", score: "93.09", area: "Trazabilidad y Seguridad en Ingeniería" },
    ],
    flow: [
      "Entrada: requisitos en lenguaje natural â€” superficie total y edificable, programa de necesidades con superficies mínimas por estancia, restricciones de orientación solar, restricciones normativas (retranqueos, ocupación máxima), restricciones de adyacencia obligatorias y prohibidas",
      "Normalización a especificación estructurada (Claude 3.7 Sonnet): lista de estancias con superficies mínimas y máximas, grafo de adyacencias obligatorias y prohibidas, restricciones de orientación por estancia, restricciones normativas cuantificadas",
      "Generación de N distribuciones candidatas (GPT-4.5): N distribuciones (default: 5) que satisfacen las restricciones â€” cada distribución como matriz de posición de estancias en cuadrícula paramétrica, con justificación de cada decisión de adyacencia y orientación",
      "Verificación de restricciones (Claude 3.7 Sonnet): ¿todas las estancias requeridas están presentes con superficie >= mínima? ¿se satisfacen las restricciones de adyacencia? ¿se respetan las restricciones normativas? Etiquetado: VÁLIDA | INVÁLIDA (con razón) | PARCIAL",
      "Ranking de distribuciones válidas: score de eficiencia de circulaciones (ratio superficie útil / pasillos) + score de orientación solar (porcentaje de estancias principales con orientación deseada)",
      "Salida A: JSON de cada distribución válida (matriz + métricas) · Salida B: SVG del plano esquemático · Salida C: justificación textual con trade-offs · Salida D: comparativa tabular",
    ],
    promptIDE: `Crea un módulo Python llamado vitruvio_ia.py con las siguientes funciones:
1. parse_project_requirements(description: str | dict, llm_client) -> dict:
   normaliza los requisitos del proyecto a especificación estructurada:
   {rooms: [{name, min_area_m2, max_area_m2, required_orientation: str|null,
     adjacency_required: list[str], adjacency_forbidden: list[str]}],
    total_buildable_area_m2: float, normative_constraints: list[str],
    grid_resolution_m: float}.
2. generate_layout(requirements: dict, llm_client,
   n_proposals: int = 5) -> list[dict]: genera N distribuciones candidatas.
   Cada distribución: {layout_id, rooms: [{name, x, y, width, height}],
   adjacency_graph: dict, orientation_assignments: dict,
   generation_rationale: str}.
3. verify_layout(layout: dict, requirements: dict, llm_client) -> dict:
   verifica que la distribución satisface todos los requisitos.
   Devuelve: {is_valid: bool, violations: list[str], warnings: list[str],
   coverage_score: float}.
4. score_layout(layout: dict, requirements: dict) -> dict:
   calcula métricas de calidad: {circulation_efficiency: float,
   solar_orientation_score: float, compactness_ratio: float,
   overall_score: float}.
5. export_to_svg(layout: dict, output_path: str) -> None:
   genera un SVG del plano esquemático con estancias etiquetadas y dimensionadas.
6. generate_comparison_report(layouts: list[dict],
   scores: list[dict]) -> str: genera tabla Markdown comparativa.
Usa svgwrite, duckdb y la librería estándar. Sin frameworks de renderizado 3D.`,
    promptLLM: `Eres el asistente de síntesis de requisitos de Vitruvio IA en el Laboratorio
de Ingeniería & Arquitectura de Horizon.

TAREA 1 â€” Síntesis de requisitos:
Se te proporciona una descripción en lenguaje natural de los requisitos de un proyecto
de distribución espacial. Extrae la especificación estructurada.

Para cada estancia:
- Identifica su nombre y función.
- Estima la superficie mínima razonable si no se especifica, y marca la estimación
  con confidence < 0.7.
- Identifica restricciones de orientación solar si se mencionan.
- Identifica relaciones de adyacencia obligatorias y prohibidas.

Para las restricciones normativas:
- Extrae sólo las que aparezcan en el texto. No añadas normativa que no esté
  en el enunciado.
- Marca toda referencia normativa con "[VERIFICAR NORMATIVA VIGENTE - MUNICIPIO]".

TAREA 2 â€” Verificación de distribución:
Se te proporciona una distribución propuesta y la especificación de requisitos.
Verifica cada restricción explícitamente. Para cada violación, describe con precisión
qué restricción se incumple y en qué estancia.

Restricciones de salida:
- No hagas afirmaciones sobre normativa urbanística que no estén en el enunciado.
- No presentes ninguna distribución como "óptima" o "definitiva":
  son propuestas orientativas para revisión profesional.

Responde en JSON conforme a los esquemas de parse_project_requirements
y verify_layout según la tarea que se active.`,
  },
  {
    id: "gaia",
    name: "Gaia Eficiencia",
    tagline: "Saber qué mejora tiene más impacto antes de encargar el certificado",
    desc: "Toma los datos básicos de un edificio â€” materiales de fachada y cubierta, porcentajes de huecos por orientación, tipo de vidrio, localización y datos climáticos â€” y estima su demanda energética de calefacción y refrigeración. A partir de esa estimación, propone mejoras ordenadas por su relación coste-beneficio: qué cambio tiene mayor impacto en la demanda con menor coste de ejecución. Todas las estimaciones son aproximadas; el cálculo oficial requiere software certificado y firma técnica.",
    color: "emerald",
    researchLines: ["01", "06"],
    professionalDisclaimer: true,
    stack: [
      { role: "Estimación de demanda energética y análisis de envolvente térmica", tech: "GPT-4.5 â€” líder diseño ingeniería y razonamiento físico aplicado (90.35/100, 94.2 DesignQA)" },
      { role: "Generación y justificación de propuestas de mejora", tech: "Claude 3.7 Sonnet â€” líder trazabilidad y razonamiento arquitectónico (93.09/100)" },
      { role: "Datos climáticos de referencia", tech: "PVGIS (radiación solar) + AEMET/Meteonorm (temperatura exterior por zona) [VERIFICAR FUENTE APLICABLE]" },
      { role: "Motor de cálculo energético simplificado", tech: "Método simplificado basado en ISO 13790 [VERIFICAR NORMATIVA VIGENTE â€” no sustituto de software certificado]" },
      { role: "Almacenamiento", tech: "DuckDB â€” histórico de análisis por edificio + comparativa de escenarios" },
    ],
    whyModels: [
      { model: "GPT-4.5", role: "Razonamiento físico y estimación energética", score: "90.35", area: "Diseño de Ingeniería Multidominio (94.2 DesignQA)" },
      { model: "Claude 3.7 Sonnet", role: "Trazabilidad de propuestas y auditoría de datos", score: "93.09", area: "Trazabilidad y Seguridad en Ingeniería" },
    ],
    flow: [
      "Entrada: datos del edificio â€” localización y zona climática, superficie habitable y volumen interior, materiales de fachada (composición, transmitancia U en W/m²K si conocida), porcentaje de huecos por orientación N/S/E/O y tipo de vidrio, tipo de cubierta y espesor de aislamiento, sistema de calefacción/refrigeración actual o previsto (opcional)",
      "Obtención de datos climáticos: temperatura media mensual exterior, radiación solar horizontal por orientación, días grado de calefacción y refrigeración para la zona",
      "Estimación de demanda energética (GPT-4.5): cálculo de transmitancia efectiva de la envolvente, estimación de demanda de calefacción (kWh/m²·año) y refrigeración, comparativa con valores de referencia CTE [VERIFICAR NORMATIVA VIGENTE]",
      "Análisis de sensibilidad por componente (GPT-4.5): ¿cuánto reduce la demanda mejorar el aislamiento de fachada X cm? ¿cuánto reduce cambiar a doble bajo emisivo? ¿cuánto afecta la orientación de los huecos principales?",
      "Generación de propuestas de mejora ordenadas (Claude 3.7 Sonnet): para cada mejora â€” descripción técnica + estimación de reducción de demanda + coste orientativo de ejecución [ESTIMACIÃ“N APROXIMADA], ratio coste/beneficio energético, justificación respaldada en los datos de entrada",
      "Salida A: informe de demanda energética estimada por orientación · Salida B: ranking de mejoras por ratio coste/beneficio · Salida C: comparativa edificio actual vs. escenario mejorado · Salida D: distribución de pérdidas por componente",
    ],
    promptIDE: `Crea un módulo Python llamado gaia_eficiencia.py con las siguientes funciones:
1. parse_building_data(description: str | dict, llm_client) -> dict:
   extrae los datos del edificio de la descripción. Devuelve:
   {location: {municipality, climate_zone}, floor_area_m2: float,
    volume_m3: float, envelope: {facades: list[{orientation, area_m2,
    u_value_W_m2K: float | null, openings_pct: float, glazing_type: str}],
    roof: {area_m2, u_value_W_m2K: float | null, insulation_cm: float | null},
    ground_floor: {area_m2, u_value_W_m2K: float | null}}}.
2. fetch_climate_data(location: dict) -> dict: obtiene datos climáticos de la
   zona. Devuelve: {heating_degree_days: float, cooling_degree_days: float,
   monthly_temps: list[float], solar_radiation: dict}.
3. estimate_energy_demand(building: dict, climate: dict,
   llm_client) -> dict: estima la demanda energética.
   Devuelve: {heating_demand_kwh_m2_year: float, cooling_demand_kwh_m2_year: float,
   total_demand_kwh_m2_year: float, losses_by_component: dict,
   reference_values: dict, confidence: float, disclaimer: str}.
4. sensitivity_analysis(building: dict, climate: dict,
   llm_client) -> list[dict]: evalúa el impacto de mejoras individuales.
   Cada mejora: {component, improvement_description, demand_reduction_pct: float,
   estimated_cost_eur: float | null, cost_benefit_ratio: float | null,
   data_basis: str}.
5. generate_improvement_plan(sensitivity: list[dict],
   llm_client) -> dict: ordena las mejoras por ratio coste/beneficio y genera
   el plan con justificación basada en los datos.
   Devuelve: {ranked_improvements: list[dict], scenario_comparison: dict,
   total_potential_reduction_pct: float}.
Usa pandas, requests (para APIs climáticas), matplotlib, duckdb y la librería estándar.`,
    promptLLM: `Eres el motor de estimación energética de Gaia Eficiencia en el Laboratorio
de Ingeniería & Arquitectura de Horizon.
Se te proporciona la descripción estructurada de un edificio (envolvente térmica,
superficies, orientaciones, tipos de material) y los datos climáticos de su zona.

Tarea 1 â€” Estimación de demanda:
Estima la demanda de calefacción y refrigeración usando el método simplificado
basado en transmitancias y grados-día. Muestra el razonamiento paso a paso.

Para cada componente de envolvente:
1. Si la transmitancia U no está especificada, estímala según el material descrito
   y márcala como "[U ESTIMADA â€” verificar con ficha técnica del material]".
2. Calcula las pérdidas o ganancias energéticas por orientación y período.
3. Suma las contribuciones para obtener la demanda total.

Tarea 2 â€” Análisis de sensibilidad:
Para cada componente de la envolvente, estima cuánto cambiaría la demanda si:
- La transmitancia mejora en un 30% (mejor aislamiento).
- El porcentaje de huecos aumenta o disminuye un 10%.
- El tipo de vidrio pasa de simple a doble bajo emisivo.

Restricciones críticas:
- Todas las estimaciones deben marcarse como aproximaciones orientativas.
- No cites valores normativos sin añadir "[VERIFICAR NORMATIVA VIGENTE]".
- No afirmes ningún valor de reducción de consumo como garantizado.
- Si faltan datos para un cálculo, identifica exactamente qué dato falta
  y qué impacto tiene esa incertidumbre en el resultado.

Responde en JSON conforme a los esquemas de estimate_energy_demand
y sensitivity_analysis.`,
  },
  {
    id: "atlas",
    name: "Atlas Constructor",
    tagline: "Simula el impacto de una decisión antes de que cueste semanas y miles",
    desc: "Simulador de escenarios de coste y plazo para proyectos de obra. Toma un presupuesto base y un diagrama de fases, y permite hacer preguntas como «¿qué pasa si cambiamos el revestimiento de fachada de piedra natural a composite de aluminio?» o «¿qué impacto tiene un retraso de tres semanas en la cimentación?». No gestiona contratos ni compras: simula escenarios para la toma de decisiones en fase de proyecto, donde cada cambio todavía cuesta una hora de dibujo en lugar de semanas de obra.",
    color: "violet",
    researchLines: ["05", "06"],
    professionalDisclaimer: true,
    stack: [
      { role: "Orquestador de bucles de simulación de escenarios", tech: "DUCTILE-Sonnet-Agent â€” líder en optimización y flujos de agentes de ingeniería (92.58/100)" },
      { role: "Trazabilidad y justificación de escenarios simulados", tech: "Claude 3.7 Sonnet â€” líder trazabilidad y verificación en ingeniería (93.09/100)" },
      { role: "Motor de cálculo de presupuesto", tech: "Generador de mediciones basado en BEDEC / CYPE / Generador de Precios [VERIFICAR BASE DE PRECIOS APLICABLE]" },
      { role: "Motor de planificación de plazos", tech: "Diagrama de Gantt paramétrico con dependencias entre fases (pandas + datetime)" },
      { role: "Almacenamiento", tech: "DuckDB â€” historial de escenarios simulados por proyecto" },
    ],
    whyModels: [
      { model: "DUCTILE-Sonnet-Agent", role: "Orquestación de simulación de escenarios", score: "92.58", area: "Agentes Autónomos de Optimización (93.8 DUCTILE_Agent_Workflow)" },
      { model: "Claude 3.7 Sonnet", role: "Trazabilidad y auditoría de escenarios", score: "93.09", area: "Trazabilidad y Seguridad en Ingeniería" },
    ],
    flow: [
      "Entradas: A) Presupuesto base (CSV/Excel: partidas, mediciones, precios unitarios) · B) Diagrama de fases de obra (Gantt simplificado: fases, duraciones, dependencias) · C) Consulta de escenario en lenguaje natural: «¿qué pasa si cambiamos el revestimiento de fachada de piedra a composite?»",
      "Análisis del escenario (DUCTILE-Sonnet-Agent): identificación de las partidas del presupuesto afectadas, identificación de las fases del Gantt afectadas, estimación del impacto en coste por partida modificada [ESTIMACIÃ“N ORIENTATIVA], estimación del impacto en plazo por efecto cascada en fases dependientes",
      "Cálculo del escenario modificado: nuevo total de presupuesto, nueva fecha de finalización con dependencias propagadas, delta de coste (â‚¬ más/menos que el presupuesto base), delta de plazo (días de adelanto o retraso)",
      "Verificación de trazabilidad (Claude 3.7 Sonnet): ¿cada modificación del escenario está respaldada por una partida del presupuesto base? ¿hay suposiciones no documentadas? ¿el impacto en plazo respeta las dependencias entre fases?",
      "Análisis de sensibilidad global: ¿qué partidas tienen mayor peso relativo en el presupuesto total? ¿qué fases tienen mayor impacto en el plazo si se retrasan? ¿dónde está el margen de seguridad económico actual?",
      "Salida A: comparativa escenario base vs. simulado · Salida B: Gantt actualizado con nuevas fechas · Salida C: análisis de sensibilidad por partida y fase · Salida D: informe de trazabilidad del cálculo",
    ],
    promptIDE: `Crea un módulo Python llamado atlas_constructor.py con las siguientes funciones:
1. load_budget(filepath: str) -> pd.DataFrame: carga el presupuesto base.
   Normaliza a columnas: [chapter, subchapter, item_code, description,
   quantity, unit, unit_price, total_price].
2. load_gantt(filepath: str) -> pd.DataFrame: carga el diagrama de fases.
   Normaliza a: [phase_id, phase_name, start_date, duration_days,
   predecessor_phases: list[str], cost_phase_pct: float].
3. parse_scenario_query(query: str, budget: pd.DataFrame, gantt: pd.DataFrame,
   llm_client) -> dict: identifica las partidas y fases afectadas por la consulta.
   Devuelve: {affected_items: list[{item_code, change_type, new_value,
   change_rationale}], affected_phases: list[{phase_id, delay_days, reason}]}.
4. simulate_scenario(base_budget: pd.DataFrame, base_gantt: pd.DataFrame,
   scenario: dict) -> dict: calcula el escenario modificado.
   Devuelve: {new_total_cost: float, cost_delta: float, cost_delta_pct: float,
   new_end_date: str, delay_days: int, modified_items: list[dict],
   cascade_effects: list[str]}.
5. verify_scenario_traceability(scenario: dict, query: dict,
   llm_client) -> dict: verifica que cada modificación está respaldada
   por datos del presupuesto base.
   Devuelve: {all_traced: bool, untraced_assumptions: list[str], warnings: list[str]}.
6. sensitivity_analysis(budget: pd.DataFrame, gantt: pd.DataFrame,
   llm_client) -> dict: identifica partidas y fases críticas.
   Devuelve: {top_cost_items: list[dict], critical_path_phases: list[dict],
   safety_margin_eur: float | null}.
Usa pandas, datetime, duckdb y la librería estándar.`,
    promptLLM: `Eres el simulador de escenarios de Atlas Constructor en el Laboratorio de Ingeniería
& Arquitectura de Horizon.
Se te proporciona:
- El presupuesto base del proyecto (lista de partidas con código, medición y precio)
- El diagrama de fases de obra (fases con duraciones y dependencias)
- Una consulta de escenario en lenguaje natural

Tu tarea:
1. Identifica exactamente qué partidas del presupuesto se ven afectadas por el
   escenario descrito. Cita el código de partida para cada una.
2. Para cada partida afectada, estima el nuevo precio unitario o la nueva medición
   si aplica. Marca la estimación con una confianza entre 0.0 y 1.0.
   Si la confianza es menor a 0.6, recomienda verificar con el responsable de obra.
3. Identifica qué fases del Gantt se ven afectadas y propaga los retrasos/adelantos
   a las fases dependientes.
4. Calcula el impacto total en coste (â‚¬) y en plazo (días).

Restricciones críticas:
- Solo modifica partidas que aparezcan explícitamente en el presupuesto base.
  Si el escenario implica una partida que no existe, señálalo y no la añadas.
- Marca todos los precios unitarios estimados como:
  "[PRECIO ORIENTATIVO â€” verificar con base de precios actualizada y presupuesto firmado]".
- No afirmes plazo ni coste como compromisos: son estimaciones de escenario.
- Si el escenario es ambiguo, describe la ambigüedad y solicita aclaración
  antes de simular.

Responde en JSON conforme a los esquemas de parse_scenario_query
y simulate_scenario.`,
  },
];

const MARKET_APPS = [
  {
    name: "Autodesk Forma",
    desc: "Plataforma de análisis urbanístico y arquitectónico basada en IA que evalúa propuestas de diseño en términos de soleamiento, ruido, viento y densidad. Integrada en el ecosistema Autodesk AEC.",
    tag: "Análisis urbanístico",
    url: "https://autodesk.com/products/forma",
  },
  {
    name: "CYPE Architecture + CYPE BIM",
    desc: "Suite española de software técnico para arquitectura, ingeniería y construcción con módulos de cálculo estructural, eficiencia energética (certificación CE3X) y presupuesto integrados.",
    tag: "Cálculo técnico integral",
    url: "https://cype.es",
  },
  {
    name: "GitHub Copilot for Infrastructure",
    desc: "Uso de Copilot en entornos de infraestructura como código (Terraform, Kubernetes, diagramas C4 generados desde PRDs) â€” caso de uso real documentado por equipos de arquitectura de software.",
    tag: "Arquitectura de software",
    url: "https://github.com/features/copilot",
  },
  {
    name: "Maket.ai",
    desc: "Plataforma de generación automática de planos de distribución residencial a partir de parámetros de entrada (superficie, número de habitaciones, estilo). Orientada a la fase conceptual del diseño arquitectónico.",
    tag: "Distribución residencial",
    url: "https://maket.ai",
  },
  {
    name: "Paladin AI (TestFit)",
    desc: "Plataforma de optimización de programas de edificación para promotores: calcula automáticamente cuántas unidades de vivienda caben en un solar dado el programa y la normativa, con análisis financiero integrado.",
    tag: "Optimización de programa",
    url: "https://testfit.io",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 Asimetría en la cobertura de benchmarks por modelo",
    items: [
      "Diseño Multidominio: GPT-4.5 (75%) y Claude 3.7 Sonnet (75%) carecen de evaluación en MDO_Agent_Opt. MDO-Autonomous-Agent (50%) solo fue evaluado en MDO_Agent_Opt y EngDesign_Benchmark (Fuente: ENGDESIGN Leaderboard, latest_rankings_engineering.md).",
      "Requirement-to-Architecture: Gemini 2.0 Pro (67%) no cuenta con datos registrados para PRD_Interface_Synthesis.",
      "Agentes Autónomos de Optimización: Claude 3.7 Sonnet (67%) carece de datos en MDO_Autonomous_Loop, y MDO-Autonomous-Agent (33%) sólo dispone de evaluación en ese mismo benchmark.",
    ],
  },
  {
    id: "v2",
    title: "4.2 Límite de aplicabilidad de los benchmarks a los proyectos del laboratorio",
    items: [
      "Los benchmarks del módulo están estructurados sobre ingeniería de software (ADRs, C4, PlantUML), física aplicada a sistemas de propulsión y optimización MDO, y recuperación semántica de documentación técnica.",
      "Vitruvio IA, Gaia Eficiencia y Atlas Constructor aplican esas capacidades a distribución arquitectónica de planos, estimación energética de edificios y simulación de presupuestos de obra civil: tareas para las que no existen benchmarks específicos en el catálogo actual del módulo.",
      "Las evaluaciones cuantitativas dedicadas a estas tareas permanecen como [DATO PENDIENTE DE VERIFICAR]. Las métricas aplicadas son extrapolaciones razonadas, no mediciones directas.",
    ],
  },
  {
    id: "v3",
    title: "4.3 Disponibilidad de DUCTILE-Sonnet-Agent como componente integrable",
    items: [
      "DUCTILE-Sonnet-Agent lidera los flujos de agentes de optimización de ingeniería con 92.58/100 (Fuente: ENGDESIGN Leaderboard, latest_rankings_engineering.md).",
      "La disponibilidad de esta arquitectura específica como componente integrable mediante API estándar, su documentación técnica y el proveedor responsable deben verificarse antes de basar en ella una decisión de stack técnico.",
      "Atlas Constructor depende de este modelo para la orquestación de bucles de simulación â€” verificar disponibilidad como primera acción antes de iniciar el prototipo.",
    ],
  },
  {
    id: "v4",
    title: "4.4 Costes de cómputo y memoria en bucles de optimización autónoma",
    items: [
      "La VRAM requerida y el coste computacional por iteración en los agentes de optimización autónoma (DUCTILE y MDO) no constan en el archivo de rankings y permanecen como [DATO PENDIENTE DE VERIFICAR].",
      "Este dato es especialmente relevante para Atlas Constructor en proyectos con presupuestos de gran número de partidas, donde el bucle de simulación puede ser intensivo.",
      "Para despliegues en producción, estimar el coste operativo por simulación antes de escalar el sistema.",
    ],
  },
  {
    id: "v5",
    title: "4.5 Normativa de referencia y bases de precios",
    items: [
      "Toda referencia normativa en este cuaderno (CTE, normativa urbanística, tablas de transmitancias, bases de precios de construcción) está marcada con [VERIFICAR NORMATIVA VIGENTE] o [VERIFICAR BASE DE PRECIOS APLICABLE].",
      "Las normativas varían por municipio, comunidad autónoma y ejercicio. Las bases de precios (BEDEC, CYPE, Generador de Precios) se actualizan periódicamente.",
      "Ningún dato de este cuaderno debe usarse como referencia definitiva de coste o normativa sin validación profesional por arquitecto o ingeniero colegiado.",
    ],
  },
];

// â”€â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STYLES = {
  cyan: {
    accent: "text-cyan-400",
    border: "border-cyan-400/20",
    bg: "bg-cyan-400/5",
    dot: "bg-cyan-400",
    badge: "border-cyan-400/30 text-cyan-400",
    tabBorder: "border-cyan-400",
    score: "text-cyan-400",
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
  emerald: {
    accent: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
    dot: "bg-emerald-400",
    badge: "border-emerald-400/30 text-emerald-400",
    tabBorder: "border-emerald-400",
    score: "text-emerald-400",
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
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo líder · ENGDESIGN Leaderboard</p>
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
        <button
          onClick={copy}
          className="text-xs text-white/30 hover:text-white/70 transition-colors px-2 py-0.5 rounded hover:bg-white/10"
        >
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
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-white/30">Líneas de investigación:</span>
          {project.researchLines.map((n) => {
            const line = RESEARCH_LINES.find((l) => l.number === n);
            return (
              <span key={n} className={`text-xs border px-2 py-0.5 rounded-full ${c.badge}`}>
                {n} · {line?.title.split(" ").slice(0, 3).join(" ")}â€¦
              </span>
            );
          })}
        </div>
        {project.professionalDisclaimer && (
          <div className="inline-flex items-start gap-2 border border-yellow-400/20 bg-yellow-400/5 rounded-xl px-3 py-2">
            <ShieldAlert size={11} className="text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300/60 leading-relaxed">
              Análisis orientativo de apoyo a la decisión técnica. No sustituye la firma y validación de un arquitecto o ingeniero colegiado. Toda decisión de obra requiere informe técnico firmado por profesional habilitado.
            </p>
          </div>
        )}
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por qué estos modelos · ENGDESIGN Leaderboard</p>
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
        <ChevronDown
          size={14}
          className={`text-white/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
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

export default function IngenieriaLab() {
  return (
    <div className="min-h-full bg-[#111111]">
      {/* Back nav */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-4">
          <Link
            to="/areas"
            className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={14} />
            Todos los laboratorios
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(34,211,238,0.07) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
              <HardHat size={28} className="text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 px-3 py-0.5 rounded-full">
                  Laboratorio verificado
                </span>
                <span className="text-xs text-white/20">ENGDESIGN & ARCHBENCH · 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-cyan-400">Ingeniería</span>
                {" & "}
                <span className="text-violet-400">Arquitectura</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                IA para distribución espacial, estimación energética de edificios y simulación de escenarios de coste y plazo en proyectos de obra. Un segundo par de ojos muy rápido â€” no el par definitivo.
              </p>

              {/* Aviso de responsabilidad */}
              <div className="mt-5 inline-flex items-start gap-2 border border-yellow-400/20 bg-yellow-400/5 rounded-xl px-4 py-3 max-w-xl">
                <ShieldAlert size={13} className="text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-300/70 leading-relaxed">
                  <strong className="text-yellow-300">Aviso de responsabilidad profesional:</strong> cualquier estimación de coste, eficiencia energética o distribución de planos generada por estas herramientas es orientativa. Un proyecto real de obra o edificación requiere firma y validación de un arquitecto o ingeniero colegiado, no solo la salida de un modelo de IA.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigación", value: "6" },
                  { label: "Proyectos activos", value: "3" },
                  { label: "Benchmarks cubiertos", value: "12" },
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

        {/* â”€â”€ Módulo 1 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <BarChart3 size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 1</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué se investiga aquí</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                En ingeniería y arquitectura las decisiones están encadenadas: la orientación de un edificio afecta su demanda energética, que afecta el espesor del aislamiento, que afecta el coste, que afecta el plazo. La hipótesis del laboratorio es que la IA bien diseñada puede simular ese encadenamiento con mucha más velocidad de la que permite una hoja de cálculo â€” no para reemplazar el criterio del profesional, sino para que llegue a la reunión con escenarios ya explorados.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>

          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Del concepto al sistema en producción</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Las seis líneas convergen en los tres proyectos del laboratorio, cada uno en un punto distinto del ciclo de vida: desde el diseño conceptual inicial (Vitruvio IA) hasta el análisis de desempeño en uso (Gaia Eficiencia) y la simulación de escenarios económicos y temporales (Atlas Constructor). Los tres comparten la misma constante de diseño: ninguna salida puede presentarse como definitiva sin validación de un profesional habilitado.
            </p>
          </div>
        </section>

        {/* â”€â”€ Módulo 2 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 2</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Casos de desarrollo</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Tres proyectos que cubren el ciclo completo de un proyecto de obra: de la distribución conceptual de planos (Vitruvio IA) al análisis de la envolvente térmica del edificio construido (Gaia Eficiencia) hasta la simulación de escenarios de coste y plazo antes de ejecutar cualquier cambio (Atlas Constructor).
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* â”€â”€ Módulo 3 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <GitBranch size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 3</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué aplicaciones ya existen en el mercado</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco aplicaciones reales de IA aplicada a ingeniería y arquitectura. Ninguna sustituye la firma y validación de un profesional colegiado para proyectos de obra. Verificar características actuales y precios en la web oficial de cada herramienta.
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
                  <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-snug mb-2">
                    {app.name}
                  </h3>
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

        {/* â”€â”€ Módulo 4 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={14} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-yellow-400/40 uppercase tracking-widest mb-1">Módulo 4</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Puntos a verificar</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco puntos que requieren revisión antes de publicar o referenciar los datos de este cuaderno en materiales externos. Incluyen asimetrías de cobertura, el límite de aplicabilidad de los benchmarks a arquitectura de planos y presupuestos de obra, la disponibilidad de DUCTILE-Sonnet-Agent y el estado de la normativa de referencia.
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
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo · ENGDESIGN & ARCHBENCH Leaderboard · 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_engineering.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_engineering.yaml</code>.
              Orientativo. No constituye proyecto técnico ni certificación energética.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/taller"
              className="text-sm text-accent hover:text-accent-light border border-accent/30 hover:border-accent/60 px-4 py-2 rounded-xl transition-all"
            >
              Ver casos en el Taller â†’
            </Link>
            <Link
              to="/foro"
              className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all"
            >
              Publicar un proyecto
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

