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
    title: "DiseÃ±o de ingenierÃ­a multidisciplinar y fÃ­sica aplicada",
    color: "cyan",
    summary:
      "La OptimizaciÃ³n de DiseÃ±o Multidisciplinar (MDO) es el proceso de optimizar simultÃ¡neamente parÃ¡metros de distintas disciplinas (aerodinÃ¡mica, estructura, propulsiÃ³n, masa) que se afectan mutuamente. En aviaciÃ³n, cambiar el ala para mejorar la sustentaciÃ³n cambia la distribuciÃ³n de masa y afecta la estabilidad.",
    detail:
      "El laboratorio investiga si un modelo puede razonar sobre esas interdependencias para proponer configuraciones de diseÃ±o coherentes entre disciplinas. EngDesign_Benchmark evalÃºa el razonamiento de diseÃ±o multidisciplinar. RocketBench_Physics mide el razonamiento fÃ­sico aplicado a sistemas de propulsiÃ³n. DesignQA evalÃºa la calidad del razonamiento de diseÃ±o en preguntas abiertas.",
    benchmarks: [
      { name: "EngDesign_Benchmark", desc: "Razonamiento de diseÃ±o multidisciplinar en sistemas complejos" },
      { name: "RocketBench_Physics", desc: "FÃ­sica aplicada a sistemas de propulsiÃ³n aeroespacial" },
      { name: "DesignQA", desc: "Calidad de razonamiento de diseÃ±o en preguntas abiertas de ingenierÃ­a" },
    ],
    topModel: { name: "GPT-4.5", score: "90.35", detail: "89.1 EngDesign_Benchmark Â· 88.4 RocketBench_Physics Â· 94.2 DesignQA" },
  },
  {
    id: "software-arch",
    number: "02",
    title: "Arquitectura de software asistida por modelos de lenguaje",
    color: "violet",
    summary:
      "Los Architecture Decision Records (ADRs) son documentos que registran formalmente por quÃ© se tomÃ³ una decisiÃ³n arquitectÃ³nica, quÃ© alternativas se consideraron y cuÃ¡les fueron las consecuencias esperadas. La IA puede ayudar a generarlos, detectar inconsistencias y evaluar tradeoffs como escalabilidad frente a complejidad operativa.",
    detail:
      "ArchBench_Core mide la capacidad de razonar sobre decisiones arquitectÃ³nicas de software (microservicios vs. monolito, consistencia vs. disponibilidad en sistemas distribuidos). SAKE_Architecture evalÃºa el conocimiento de arquitecturas de software establecidas. GenAI_Arch_Patterns mide el reconocimiento y aplicaciÃ³n de patrones arquitectÃ³nicos en sistemas que incorporan IA generativa.",
    benchmarks: [
      { name: "ArchBench_Core", desc: "Razonamiento sobre decisiones y tradeoffs arquitectÃ³nicos de software" },
      { name: "SAKE_Architecture", desc: "Conocimiento de arquitecturas de software establecidas" },
      { name: "GenAI_Arch_Patterns", desc: "Patrones arquitectÃ³nicos en sistemas con IA generativa" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "91.82", detail: "LÃ­der en razonamiento arquitectÃ³nico de software y generaciÃ³n de ADRs estructurados" },
  },
  {
    id: "prd-to-arch",
    number: "03",
    title: "TransformaciÃ³n de requisitos a diagramas tÃ©cnicos",
    color: "cyan",
    summary:
      "Un PRD (Product Requirements Document) llega al equipo de arquitectura y alguien tiene que transformarlo en diagramas de componentes, secuencia y contenedores en formato PlantUML o en el modelo C4 â€” un marco de diagramas con cuatro niveles: Contexto, Contenedores, Componentes y CÃ³digo.",
    detail:
      "R2ABench_PRD_to_UML mide cuÃ¡nto de ese trabajo puede hacerse de forma automÃ¡tica con calidad suficiente. PRD_Interface_Synthesis evalÃºa la capacidad de sintetizar interfaces de sistema a partir de requisitos funcionales no estructurados. Gemini 2.0 Pro (67% de cobertura) no cuenta con datos registrados para PRD_Interface_Synthesis â€” ver MÃ³dulo 4, punto 4.1.",
    benchmarks: [
      { name: "R2ABench_PRD_to_UML", desc: "TransformaciÃ³n automÃ¡tica de PRD a diagramas UML y C4" },
      { name: "PRD_Interface_Synthesis", desc: "SÃ­ntesis de interfaces de sistema desde requisitos no estructurados" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "91.48", detail: "91.2 R2ABench_PRD_to_UML Â· 94.0 PRD_Interface_Synthesis" },
  },
  {
    id: "semantic-search",
    number: "04",
    title: "BÃºsqueda semÃ¡ntica en documentaciÃ³n tÃ©cnica y cÃ³digo",
    color: "emerald",
    summary:
      "Los ingenieros pasan una parte significativa de su tiempo buscando en documentaciÃ³n tÃ©cnica, bases de cÃ³digo y especificaciones previas. Un motor de bÃºsqueda semÃ¡ntica especializado en documentaciÃ³n de ingenierÃ­a puede recuperar el fragmento correcto aunque las palabras clave no coincidan exactamente.",
    detail:
      "La suite MTEB (Massive Text Embedding Benchmark) mide la calidad de los modelos de embedding en tareas de recuperaciÃ³n y agrupamiento. En el contexto de ingenierÃ­a, esto incluye bÃºsqueda de APIs relevantes, recuperaciÃ³n de especificaciones similares y agrupamiento de incidencias. MTEB cubre retrieval, clustering, classification, reranking y STS (Semantic Textual Similarity).",
    benchmarks: [
      { name: "MTEB_Retrieval", desc: "RecuperaciÃ³n de documentos relevantes por similitud semÃ¡ntica" },
      { name: "MTEB_Clustering", desc: "Agrupamiento semÃ¡ntico de especificaciones e incidencias" },
      { name: "MTEB_STS", desc: "Similitud textual semÃ¡ntica para deduplicaciÃ³n de requisitos" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "88.94", detail: "LÃ­der en bÃºsqueda semÃ¡ntica de documentaciÃ³n tÃ©cnica y cÃ³digo de ingenierÃ­a" },
  },
  {
    id: "agents",
    number: "05",
    title: "Agentes autÃ³nomos de optimizaciÃ³n en bucles de simulaciÃ³n",
    color: "violet",
    summary:
      "Los flujos de optimizaciÃ³n CAD/CAE son iterativos: se propone un diseÃ±o, se simula, se analiza el resultado, se ajustan parÃ¡metros, se vuelve a simular. Un agente autÃ³nomo que pueda ejecutar ese bucle sin intervenciÃ³n humana en cada iteraciÃ³n puede explorar el espacio de diseÃ±o mucho mÃ¡s rÃ¡pido.",
    detail:
      "DUCTILE_Agent_Workflow mide la fiabilidad de agentes en flujos de ingenierÃ­a complejos. MDO_Autonomous_Loop evalÃºa bucles autÃ³nomos de optimizaciÃ³n multidisciplinar. Conceptual_Systems_Agent mide la capacidad de agentes para razonar sobre sistemas en fase conceptual. La disponibilidad de DUCTILE-Sonnet-Agent como componente integrable debe verificarse â€” ver MÃ³dulo 4, punto 4.3.",
    benchmarks: [
      { name: "DUCTILE_Agent_Workflow", desc: "Fiabilidad de agentes en flujos de ingenierÃ­a complejos" },
      { name: "MDO_Autonomous_Loop", desc: "Bucles autÃ³nomos de optimizaciÃ³n multidisciplinar" },
      { name: "Conceptual_Systems_Agent", desc: "Agentes de razonamiento conceptual sobre sistemas complejos" },
    ],
    topModel: { name: "DUCTILE-Sonnet-Agent", score: "92.58", detail: "93.8 DUCTILE_Agent_Workflow Â· 91.2 MDO_Autonomous_Loop Â· 92.5 Conceptual_Systems_Agent" },
    warning: true,
  },
  {
    id: "safety",
    number: "06",
    title: "Trazabilidad de requisitos y seguridad en sistemas crÃ­ticos",
    color: "emerald",
    summary:
      "En ingenierÃ­a aeronÃ¡utica, mÃ©dica, nuclear o de infraestructuras, la trazabilidad bidireccional entre requisitos y cÃ³digo no es una buena prÃ¡ctica: es una obligaciÃ³n normativa. La capacidad de seguir cada requisito hasta el cÃ³digo que lo implementa, y viceversa, es condiciÃ³n de certificaciÃ³n.",
    detail:
      "EngSafety_Simulation_Verify mide la capacidad de los modelos de verificar que los sistemas simulados cumplen las restricciones de seguridad definidas en la especificaciÃ³n. Claude 3.7 Sonnet lidera este benchmark con 95.2, lo que lo convierte en el candidato natural para los mÃ³dulos de verificaciÃ³n y auditorÃ­a de trazabilidad de los tres proyectos del laboratorio.",
    benchmarks: [
      { name: "EngSafety_Simulation_Verify", desc: "VerificaciÃ³n de cumplimiento de restricciones de seguridad en sistemas simulados" },
      { name: "Requirements_Traceability_Audit", desc: "AuditorÃ­a de trazabilidad bidireccional requisito-cÃ³digo" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "93.09", detail: "95.2 EngSafety_Simulation_Verify â€” lÃ­der en trazabilidad y verificaciÃ³n de sistemas crÃ­ticos" },
  },
];

const PROJECTS = [
  {
    id: "vitruvio",
    name: "Vitruvio IA",
    tagline: "Veinte distribuciones en una hora; el arquitecto elige cinco",
    desc: "A partir de los requisitos bÃ¡sicos de un espacio â€” superficie, programa de estancias, orientaciÃ³n del solar, restricciones normativas â€” genera propuestas de distribuciÃ³n que satisfacen primero las restricciones de funcionalidad y circulaciÃ³n. La salida es una especificaciÃ³n estructurada (matriz de adyacencias, dimensiones aproximadas, orientaciÃ³n de huecos) importable en herramientas BIM. No genera renders 3D: genera puntos de partida que el arquitecto filtra y desarrolla.",
    color: "cyan",
    researchLines: ["01", "03", "06"],
    professionalDisclaimer: true,
    stack: [
      { role: "Razonamiento espacial y generaciÃ³n de distribuciones candidatas", tech: "GPT-4.5 â€” lÃ­der diseÃ±o ingenierÃ­a multidominio, 94.2 DesignQA (90.35/100)" },
      { role: "SÃ­ntesis de requisitos a especificaciÃ³n estructurada (PRD â†’ layout)", tech: "Claude 3.7 Sonnet â€” lÃ­der transformaciÃ³n PRDâ†’arquitectura (91.48/100)" },
      { role: "VerificaciÃ³n de restricciones (adyacencia, orientaciÃ³n, normativa)", tech: "Claude 3.7 Sonnet â€” lÃ­der trazabilidad y verificaciÃ³n (93.09/100, 95.2 EngSafety)" },
      { role: "ExportaciÃ³n de plano esquemÃ¡tico", tech: "svgwrite â€” SVG de la distribuciÃ³n con estancias etiquetadas y dimensionadas" },
      { role: "Almacenamiento", tech: "DuckDB â€” histÃ³rico de distribuciones generadas por proyecto" },
    ],
    whyModels: [
      { model: "GPT-4.5", role: "Razonamiento espacial multidisciplinar", score: "90.35", area: "DiseÃ±o de IngenierÃ­a Multidominio" },
      { model: "Claude 3.7 Sonnet", role: "SÃ­ntesis PRD â†’ especificaciÃ³n estructurada", score: "91.48", area: "Requirement-to-Architecture (R2ABench)" },
      { model: "Claude 3.7 Sonnet", role: "VerificaciÃ³n de restricciones y trazabilidad", score: "93.09", area: "Trazabilidad y Seguridad en IngenierÃ­a" },
    ],
    flow: [
      "Entrada: requisitos en lenguaje natural â€” superficie total y edificable, programa de necesidades con superficies mÃ­nimas por estancia, restricciones de orientaciÃ³n solar, restricciones normativas (retranqueos, ocupaciÃ³n mÃ¡xima), restricciones de adyacencia obligatorias y prohibidas",
      "NormalizaciÃ³n a especificaciÃ³n estructurada (Claude 3.7 Sonnet): lista de estancias con superficies mÃ­nimas y mÃ¡ximas, grafo de adyacencias obligatorias y prohibidas, restricciones de orientaciÃ³n por estancia, restricciones normativas cuantificadas",
      "GeneraciÃ³n de N distribuciones candidatas (GPT-4.5): N distribuciones (default: 5) que satisfacen las restricciones â€” cada distribuciÃ³n como matriz de posiciÃ³n de estancias en cuadrÃ­cula paramÃ©trica, con justificaciÃ³n de cada decisiÃ³n de adyacencia y orientaciÃ³n",
      "VerificaciÃ³n de restricciones (Claude 3.7 Sonnet): Â¿todas las estancias requeridas estÃ¡n presentes con superficie >= mÃ­nima? Â¿se satisfacen las restricciones de adyacencia? Â¿se respetan las restricciones normativas? Etiquetado: VÃLIDA | INVÃLIDA (con razÃ³n) | PARCIAL",
      "Ranking de distribuciones vÃ¡lidas: score de eficiencia de circulaciones (ratio superficie Ãºtil / pasillos) + score de orientaciÃ³n solar (porcentaje de estancias principales con orientaciÃ³n deseada)",
      "Salida A: JSON de cada distribuciÃ³n vÃ¡lida (matriz + mÃ©tricas) Â· Salida B: SVG del plano esquemÃ¡tico Â· Salida C: justificaciÃ³n textual con trade-offs Â· Salida D: comparativa tabular",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado vitruvio_ia.py con las siguientes funciones:
1. parse_project_requirements(description: str | dict, llm_client) -> dict:
   normaliza los requisitos del proyecto a especificaciÃ³n estructurada:
   {rooms: [{name, min_area_m2, max_area_m2, required_orientation: str|null,
     adjacency_required: list[str], adjacency_forbidden: list[str]}],
    total_buildable_area_m2: float, normative_constraints: list[str],
    grid_resolution_m: float}.
2. generate_layout(requirements: dict, llm_client,
   n_proposals: int = 5) -> list[dict]: genera N distribuciones candidatas.
   Cada distribuciÃ³n: {layout_id, rooms: [{name, x, y, width, height}],
   adjacency_graph: dict, orientation_assignments: dict,
   generation_rationale: str}.
3. verify_layout(layout: dict, requirements: dict, llm_client) -> dict:
   verifica que la distribuciÃ³n satisface todos los requisitos.
   Devuelve: {is_valid: bool, violations: list[str], warnings: list[str],
   coverage_score: float}.
4. score_layout(layout: dict, requirements: dict) -> dict:
   calcula mÃ©tricas de calidad: {circulation_efficiency: float,
   solar_orientation_score: float, compactness_ratio: float,
   overall_score: float}.
5. export_to_svg(layout: dict, output_path: str) -> None:
   genera un SVG del plano esquemÃ¡tico con estancias etiquetadas y dimensionadas.
6. generate_comparison_report(layouts: list[dict],
   scores: list[dict]) -> str: genera tabla Markdown comparativa.
Usa svgwrite, duckdb y la librerÃ­a estÃ¡ndar. Sin frameworks de renderizado 3D.`,
    promptLLM: `Eres el asistente de sÃ­ntesis de requisitos de Vitruvio IA en el Laboratorio
de IngenierÃ­a & Arquitectura de Horizon.

TAREA 1 â€” SÃ­ntesis de requisitos:
Se te proporciona una descripciÃ³n en lenguaje natural de los requisitos de un proyecto
de distribuciÃ³n espacial. Extrae la especificaciÃ³n estructurada.

Para cada estancia:
- Identifica su nombre y funciÃ³n.
- Estima la superficie mÃ­nima razonable si no se especifica, y marca la estimaciÃ³n
  con confidence < 0.7.
- Identifica restricciones de orientaciÃ³n solar si se mencionan.
- Identifica relaciones de adyacencia obligatorias y prohibidas.

Para las restricciones normativas:
- Extrae sÃ³lo las que aparezcan en el texto. No aÃ±adas normativa que no estÃ©
  en el enunciado.
- Marca toda referencia normativa con "[VERIFICAR NORMATIVA VIGENTE - MUNICIPIO]".

TAREA 2 â€” VerificaciÃ³n de distribuciÃ³n:
Se te proporciona una distribuciÃ³n propuesta y la especificaciÃ³n de requisitos.
Verifica cada restricciÃ³n explÃ­citamente. Para cada violaciÃ³n, describe con precisiÃ³n
quÃ© restricciÃ³n se incumple y en quÃ© estancia.

Restricciones de salida:
- No hagas afirmaciones sobre normativa urbanÃ­stica que no estÃ©n en el enunciado.
- No presentes ninguna distribuciÃ³n como "Ã³ptima" o "definitiva":
  son propuestas orientativas para revisiÃ³n profesional.

Responde en JSON conforme a los esquemas de parse_project_requirements
y verify_layout segÃºn la tarea que se active.`,
  },
  {
    id: "gaia",
    name: "Gaia Eficiencia",
    tagline: "Saber quÃ© mejora tiene mÃ¡s impacto antes de encargar el certificado",
    desc: "Toma los datos bÃ¡sicos de un edificio â€” materiales de fachada y cubierta, porcentajes de huecos por orientaciÃ³n, tipo de vidrio, localizaciÃ³n y datos climÃ¡ticos â€” y estima su demanda energÃ©tica de calefacciÃ³n y refrigeraciÃ³n. A partir de esa estimaciÃ³n, propone mejoras ordenadas por su relaciÃ³n coste-beneficio: quÃ© cambio tiene mayor impacto en la demanda con menor coste de ejecuciÃ³n. Todas las estimaciones son aproximadas; el cÃ¡lculo oficial requiere software certificado y firma tÃ©cnica.",
    color: "emerald",
    researchLines: ["01", "06"],
    professionalDisclaimer: true,
    stack: [
      { role: "EstimaciÃ³n de demanda energÃ©tica y anÃ¡lisis de envolvente tÃ©rmica", tech: "GPT-4.5 â€” lÃ­der diseÃ±o ingenierÃ­a y razonamiento fÃ­sico aplicado (90.35/100, 94.2 DesignQA)" },
      { role: "GeneraciÃ³n y justificaciÃ³n de propuestas de mejora", tech: "Claude 3.7 Sonnet â€” lÃ­der trazabilidad y razonamiento arquitectÃ³nico (93.09/100)" },
      { role: "Datos climÃ¡ticos de referencia", tech: "PVGIS (radiaciÃ³n solar) + AEMET/Meteonorm (temperatura exterior por zona) [VERIFICAR FUENTE APLICABLE]" },
      { role: "Motor de cÃ¡lculo energÃ©tico simplificado", tech: "MÃ©todo simplificado basado en ISO 13790 [VERIFICAR NORMATIVA VIGENTE â€” no sustituto de software certificado]" },
      { role: "Almacenamiento", tech: "DuckDB â€” histÃ³rico de anÃ¡lisis por edificio + comparativa de escenarios" },
    ],
    whyModels: [
      { model: "GPT-4.5", role: "Razonamiento fÃ­sico y estimaciÃ³n energÃ©tica", score: "90.35", area: "DiseÃ±o de IngenierÃ­a Multidominio (94.2 DesignQA)" },
      { model: "Claude 3.7 Sonnet", role: "Trazabilidad de propuestas y auditorÃ­a de datos", score: "93.09", area: "Trazabilidad y Seguridad en IngenierÃ­a" },
    ],
    flow: [
      "Entrada: datos del edificio â€” localizaciÃ³n y zona climÃ¡tica, superficie habitable y volumen interior, materiales de fachada (composiciÃ³n, transmitancia U en W/mÂ²K si conocida), porcentaje de huecos por orientaciÃ³n N/S/E/O y tipo de vidrio, tipo de cubierta y espesor de aislamiento, sistema de calefacciÃ³n/refrigeraciÃ³n actual o previsto (opcional)",
      "ObtenciÃ³n de datos climÃ¡ticos: temperatura media mensual exterior, radiaciÃ³n solar horizontal por orientaciÃ³n, dÃ­as grado de calefacciÃ³n y refrigeraciÃ³n para la zona",
      "EstimaciÃ³n de demanda energÃ©tica (GPT-4.5): cÃ¡lculo de transmitancia efectiva de la envolvente, estimaciÃ³n de demanda de calefacciÃ³n (kWh/mÂ²Â·aÃ±o) y refrigeraciÃ³n, comparativa con valores de referencia CTE [VERIFICAR NORMATIVA VIGENTE]",
      "AnÃ¡lisis de sensibilidad por componente (GPT-4.5): Â¿cuÃ¡nto reduce la demanda mejorar el aislamiento de fachada X cm? Â¿cuÃ¡nto reduce cambiar a doble bajo emisivo? Â¿cuÃ¡nto afecta la orientaciÃ³n de los huecos principales?",
      "GeneraciÃ³n de propuestas de mejora ordenadas (Claude 3.7 Sonnet): para cada mejora â€” descripciÃ³n tÃ©cnica + estimaciÃ³n de reducciÃ³n de demanda + coste orientativo de ejecuciÃ³n [ESTIMACIÃ“N APROXIMADA], ratio coste/beneficio energÃ©tico, justificaciÃ³n respaldada en los datos de entrada",
      "Salida A: informe de demanda energÃ©tica estimada por orientaciÃ³n Â· Salida B: ranking de mejoras por ratio coste/beneficio Â· Salida C: comparativa edificio actual vs. escenario mejorado Â· Salida D: distribuciÃ³n de pÃ©rdidas por componente",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado gaia_eficiencia.py con las siguientes funciones:
1. parse_building_data(description: str | dict, llm_client) -> dict:
   extrae los datos del edificio de la descripciÃ³n. Devuelve:
   {location: {municipality, climate_zone}, floor_area_m2: float,
    volume_m3: float, envelope: {facades: list[{orientation, area_m2,
    u_value_W_m2K: float | null, openings_pct: float, glazing_type: str}],
    roof: {area_m2, u_value_W_m2K: float | null, insulation_cm: float | null},
    ground_floor: {area_m2, u_value_W_m2K: float | null}}}.
2. fetch_climate_data(location: dict) -> dict: obtiene datos climÃ¡ticos de la
   zona. Devuelve: {heating_degree_days: float, cooling_degree_days: float,
   monthly_temps: list[float], solar_radiation: dict}.
3. estimate_energy_demand(building: dict, climate: dict,
   llm_client) -> dict: estima la demanda energÃ©tica.
   Devuelve: {heating_demand_kwh_m2_year: float, cooling_demand_kwh_m2_year: float,
   total_demand_kwh_m2_year: float, losses_by_component: dict,
   reference_values: dict, confidence: float, disclaimer: str}.
4. sensitivity_analysis(building: dict, climate: dict,
   llm_client) -> list[dict]: evalÃºa el impacto de mejoras individuales.
   Cada mejora: {component, improvement_description, demand_reduction_pct: float,
   estimated_cost_eur: float | null, cost_benefit_ratio: float | null,
   data_basis: str}.
5. generate_improvement_plan(sensitivity: list[dict],
   llm_client) -> dict: ordena las mejoras por ratio coste/beneficio y genera
   el plan con justificaciÃ³n basada en los datos.
   Devuelve: {ranked_improvements: list[dict], scenario_comparison: dict,
   total_potential_reduction_pct: float}.
Usa pandas, requests (para APIs climÃ¡ticas), matplotlib, duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el motor de estimaciÃ³n energÃ©tica de Gaia Eficiencia en el Laboratorio
de IngenierÃ­a & Arquitectura de Horizon.
Se te proporciona la descripciÃ³n estructurada de un edificio (envolvente tÃ©rmica,
superficies, orientaciones, tipos de material) y los datos climÃ¡ticos de su zona.

Tarea 1 â€” EstimaciÃ³n de demanda:
Estima la demanda de calefacciÃ³n y refrigeraciÃ³n usando el mÃ©todo simplificado
basado en transmitancias y grados-dÃ­a. Muestra el razonamiento paso a paso.

Para cada componente de envolvente:
1. Si la transmitancia U no estÃ¡ especificada, estÃ­mala segÃºn el material descrito
   y mÃ¡rcala como "[U ESTIMADA â€” verificar con ficha tÃ©cnica del material]".
2. Calcula las pÃ©rdidas o ganancias energÃ©ticas por orientaciÃ³n y perÃ­odo.
3. Suma las contribuciones para obtener la demanda total.

Tarea 2 â€” AnÃ¡lisis de sensibilidad:
Para cada componente de la envolvente, estima cuÃ¡nto cambiarÃ­a la demanda si:
- La transmitancia mejora en un 30% (mejor aislamiento).
- El porcentaje de huecos aumenta o disminuye un 10%.
- El tipo de vidrio pasa de simple a doble bajo emisivo.

Restricciones crÃ­ticas:
- Todas las estimaciones deben marcarse como aproximaciones orientativas.
- No cites valores normativos sin aÃ±adir "[VERIFICAR NORMATIVA VIGENTE]".
- No afirmes ningÃºn valor de reducciÃ³n de consumo como garantizado.
- Si faltan datos para un cÃ¡lculo, identifica exactamente quÃ© dato falta
  y quÃ© impacto tiene esa incertidumbre en el resultado.

Responde en JSON conforme a los esquemas de estimate_energy_demand
y sensitivity_analysis.`,
  },
  {
    id: "atlas",
    name: "Atlas Constructor",
    tagline: "Simula el impacto de una decisiÃ³n antes de que cueste semanas y miles",
    desc: "Simulador de escenarios de coste y plazo para proyectos de obra. Toma un presupuesto base y un diagrama de fases, y permite hacer preguntas como Â«Â¿quÃ© pasa si cambiamos el revestimiento de fachada de piedra natural a composite de aluminio?Â» o Â«Â¿quÃ© impacto tiene un retraso de tres semanas en la cimentaciÃ³n?Â». No gestiona contratos ni compras: simula escenarios para la toma de decisiones en fase de proyecto, donde cada cambio todavÃ­a cuesta una hora de dibujo en lugar de semanas de obra.",
    color: "violet",
    researchLines: ["05", "06"],
    professionalDisclaimer: true,
    stack: [
      { role: "Orquestador de bucles de simulaciÃ³n de escenarios", tech: "DUCTILE-Sonnet-Agent â€” lÃ­der en optimizaciÃ³n y flujos de agentes de ingenierÃ­a (92.58/100)" },
      { role: "Trazabilidad y justificaciÃ³n de escenarios simulados", tech: "Claude 3.7 Sonnet â€” lÃ­der trazabilidad y verificaciÃ³n en ingenierÃ­a (93.09/100)" },
      { role: "Motor de cÃ¡lculo de presupuesto", tech: "Generador de mediciones basado en BEDEC / CYPE / Generador de Precios [VERIFICAR BASE DE PRECIOS APLICABLE]" },
      { role: "Motor de planificaciÃ³n de plazos", tech: "Diagrama de Gantt paramÃ©trico con dependencias entre fases (pandas + datetime)" },
      { role: "Almacenamiento", tech: "DuckDB â€” historial de escenarios simulados por proyecto" },
    ],
    whyModels: [
      { model: "DUCTILE-Sonnet-Agent", role: "OrquestaciÃ³n de simulaciÃ³n de escenarios", score: "92.58", area: "Agentes AutÃ³nomos de OptimizaciÃ³n (93.8 DUCTILE_Agent_Workflow)" },
      { model: "Claude 3.7 Sonnet", role: "Trazabilidad y auditorÃ­a de escenarios", score: "93.09", area: "Trazabilidad y Seguridad en IngenierÃ­a" },
    ],
    flow: [
      "Entradas: A) Presupuesto base (CSV/Excel: partidas, mediciones, precios unitarios) Â· B) Diagrama de fases de obra (Gantt simplificado: fases, duraciones, dependencias) Â· C) Consulta de escenario en lenguaje natural: Â«Â¿quÃ© pasa si cambiamos el revestimiento de fachada de piedra a composite?Â»",
      "AnÃ¡lisis del escenario (DUCTILE-Sonnet-Agent): identificaciÃ³n de las partidas del presupuesto afectadas, identificaciÃ³n de las fases del Gantt afectadas, estimaciÃ³n del impacto en coste por partida modificada [ESTIMACIÃ“N ORIENTATIVA], estimaciÃ³n del impacto en plazo por efecto cascada en fases dependientes",
      "CÃ¡lculo del escenario modificado: nuevo total de presupuesto, nueva fecha de finalizaciÃ³n con dependencias propagadas, delta de coste (â‚¬ mÃ¡s/menos que el presupuesto base), delta de plazo (dÃ­as de adelanto o retraso)",
      "VerificaciÃ³n de trazabilidad (Claude 3.7 Sonnet): Â¿cada modificaciÃ³n del escenario estÃ¡ respaldada por una partida del presupuesto base? Â¿hay suposiciones no documentadas? Â¿el impacto en plazo respeta las dependencias entre fases?",
      "AnÃ¡lisis de sensibilidad global: Â¿quÃ© partidas tienen mayor peso relativo en el presupuesto total? Â¿quÃ© fases tienen mayor impacto en el plazo si se retrasan? Â¿dÃ³nde estÃ¡ el margen de seguridad econÃ³mico actual?",
      "Salida A: comparativa escenario base vs. simulado Â· Salida B: Gantt actualizado con nuevas fechas Â· Salida C: anÃ¡lisis de sensibilidad por partida y fase Â· Salida D: informe de trazabilidad del cÃ¡lculo",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado atlas_constructor.py con las siguientes funciones:
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
   llm_client) -> dict: verifica que cada modificaciÃ³n estÃ¡ respaldada
   por datos del presupuesto base.
   Devuelve: {all_traced: bool, untraced_assumptions: list[str], warnings: list[str]}.
6. sensitivity_analysis(budget: pd.DataFrame, gantt: pd.DataFrame,
   llm_client) -> dict: identifica partidas y fases crÃ­ticas.
   Devuelve: {top_cost_items: list[dict], critical_path_phases: list[dict],
   safety_margin_eur: float | null}.
Usa pandas, datetime, duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el simulador de escenarios de Atlas Constructor en el Laboratorio de IngenierÃ­a
& Arquitectura de Horizon.
Se te proporciona:
- El presupuesto base del proyecto (lista de partidas con cÃ³digo, mediciÃ³n y precio)
- El diagrama de fases de obra (fases con duraciones y dependencias)
- Una consulta de escenario en lenguaje natural

Tu tarea:
1. Identifica exactamente quÃ© partidas del presupuesto se ven afectadas por el
   escenario descrito. Cita el cÃ³digo de partida para cada una.
2. Para cada partida afectada, estima el nuevo precio unitario o la nueva mediciÃ³n
   si aplica. Marca la estimaciÃ³n con una confianza entre 0.0 y 1.0.
   Si la confianza es menor a 0.6, recomienda verificar con el responsable de obra.
3. Identifica quÃ© fases del Gantt se ven afectadas y propaga los retrasos/adelantos
   a las fases dependientes.
4. Calcula el impacto total en coste (â‚¬) y en plazo (dÃ­as).

Restricciones crÃ­ticas:
- Solo modifica partidas que aparezcan explÃ­citamente en el presupuesto base.
  Si el escenario implica una partida que no existe, seÃ±Ã¡lalo y no la aÃ±adas.
- Marca todos los precios unitarios estimados como:
  "[PRECIO ORIENTATIVO â€” verificar con base de precios actualizada y presupuesto firmado]".
- No afirmes plazo ni coste como compromisos: son estimaciones de escenario.
- Si el escenario es ambiguo, describe la ambigÃ¼edad y solicita aclaraciÃ³n
  antes de simular.

Responde en JSON conforme a los esquemas de parse_scenario_query
y simulate_scenario.`,
  },
];

const MARKET_APPS = [
  {
    name: "Autodesk Forma",
    desc: "Plataforma de anÃ¡lisis urbanÃ­stico y arquitectÃ³nico basada en IA que evalÃºa propuestas de diseÃ±o en tÃ©rminos de soleamiento, ruido, viento y densidad. Integrada en el ecosistema Autodesk AEC.",
    tag: "AnÃ¡lisis urbanÃ­stico",
    url: "https://autodesk.com/products/forma",
  },
  {
    name: "CYPE Architecture + CYPE BIM",
    desc: "Suite espaÃ±ola de software tÃ©cnico para arquitectura, ingenierÃ­a y construcciÃ³n con mÃ³dulos de cÃ¡lculo estructural, eficiencia energÃ©tica (certificaciÃ³n CE3X) y presupuesto integrados.",
    tag: "CÃ¡lculo tÃ©cnico integral",
    url: "https://cype.es",
  },
  {
    name: "GitHub Copilot for Infrastructure",
    desc: "Uso de Copilot en entornos de infraestructura como cÃ³digo (Terraform, Kubernetes, diagramas C4 generados desde PRDs) â€” caso de uso real documentado por equipos de arquitectura de software.",
    tag: "Arquitectura de software",
    url: "https://github.com/features/copilot",
  },
  {
    name: "Maket.ai",
    desc: "Plataforma de generaciÃ³n automÃ¡tica de planos de distribuciÃ³n residencial a partir de parÃ¡metros de entrada (superficie, nÃºmero de habitaciones, estilo). Orientada a la fase conceptual del diseÃ±o arquitectÃ³nico.",
    tag: "DistribuciÃ³n residencial",
    url: "https://maket.ai",
  },
  {
    name: "Paladin AI (TestFit)",
    desc: "Plataforma de optimizaciÃ³n de programas de edificaciÃ³n para promotores: calcula automÃ¡ticamente cuÃ¡ntas unidades de vivienda caben en un solar dado el programa y la normativa, con anÃ¡lisis financiero integrado.",
    tag: "OptimizaciÃ³n de programa",
    url: "https://testfit.io",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 AsimetrÃ­a en la cobertura de benchmarks por modelo",
    items: [
      "DiseÃ±o Multidominio: GPT-4.5 (75%) y Claude 3.7 Sonnet (75%) carecen de evaluaciÃ³n en MDO_Agent_Opt. MDO-Autonomous-Agent (50%) solo fue evaluado en MDO_Agent_Opt y EngDesign_Benchmark (Fuente: ENGDESIGN Leaderboard, latest_rankings_engineering.md).",
      "Requirement-to-Architecture: Gemini 2.0 Pro (67%) no cuenta con datos registrados para PRD_Interface_Synthesis.",
      "Agentes AutÃ³nomos de OptimizaciÃ³n: Claude 3.7 Sonnet (67%) carece de datos en MDO_Autonomous_Loop, y MDO-Autonomous-Agent (33%) sÃ³lo dispone de evaluaciÃ³n en ese mismo benchmark.",
    ],
  },
  {
    id: "v2",
    title: "4.2 LÃ­mite de aplicabilidad de los benchmarks a los proyectos del laboratorio",
    items: [
      "Los benchmarks del mÃ³dulo estÃ¡n estructurados sobre ingenierÃ­a de software (ADRs, C4, PlantUML), fÃ­sica aplicada a sistemas de propulsiÃ³n y optimizaciÃ³n MDO, y recuperaciÃ³n semÃ¡ntica de documentaciÃ³n tÃ©cnica.",
      "Vitruvio IA, Gaia Eficiencia y Atlas Constructor aplican esas capacidades a distribuciÃ³n arquitectÃ³nica de planos, estimaciÃ³n energÃ©tica de edificios y simulaciÃ³n de presupuestos de obra civil: tareas para las que no existen benchmarks especÃ­ficos en el catÃ¡logo actual del mÃ³dulo.",
      "Las evaluaciones cuantitativas dedicadas a estas tareas permanecen como [DATO PENDIENTE DE VERIFICAR]. Las mÃ©tricas aplicadas son extrapolaciones razonadas, no mediciones directas.",
    ],
  },
  {
    id: "v3",
    title: "4.3 Disponibilidad de DUCTILE-Sonnet-Agent como componente integrable",
    items: [
      "DUCTILE-Sonnet-Agent lidera los flujos de agentes de optimizaciÃ³n de ingenierÃ­a con 92.58/100 (Fuente: ENGDESIGN Leaderboard, latest_rankings_engineering.md).",
      "La disponibilidad de esta arquitectura especÃ­fica como componente integrable mediante API estÃ¡ndar, su documentaciÃ³n tÃ©cnica y el proveedor responsable deben verificarse antes de basar en ella una decisiÃ³n de stack tÃ©cnico.",
      "Atlas Constructor depende de este modelo para la orquestaciÃ³n de bucles de simulaciÃ³n â€” verificar disponibilidad como primera acciÃ³n antes de iniciar el prototipo.",
    ],
  },
  {
    id: "v4",
    title: "4.4 Costes de cÃ³mputo y memoria en bucles de optimizaciÃ³n autÃ³noma",
    items: [
      "La VRAM requerida y el coste computacional por iteraciÃ³n en los agentes de optimizaciÃ³n autÃ³noma (DUCTILE y MDO) no constan en el archivo de rankings y permanecen como [DATO PENDIENTE DE VERIFICAR].",
      "Este dato es especialmente relevante para Atlas Constructor en proyectos con presupuestos de gran nÃºmero de partidas, donde el bucle de simulaciÃ³n puede ser intensivo.",
      "Para despliegues en producciÃ³n, estimar el coste operativo por simulaciÃ³n antes de escalar el sistema.",
    ],
  },
  {
    id: "v5",
    title: "4.5 Normativa de referencia y bases de precios",
    items: [
      "Toda referencia normativa en este cuaderno (CTE, normativa urbanÃ­stica, tablas de transmitancias, bases de precios de construcciÃ³n) estÃ¡ marcada con [VERIFICAR NORMATIVA VIGENTE] o [VERIFICAR BASE DE PRECIOS APLICABLE].",
      "Las normativas varÃ­an por municipio, comunidad autÃ³noma y ejercicio. Las bases de precios (BEDEC, CYPE, Generador de Precios) se actualizan periÃ³dicamente.",
      "NingÃºn dato de este cuaderno debe usarse como referencia definitiva de coste o normativa sin validaciÃ³n profesional por arquitecto o ingeniero colegiado.",
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
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo lÃ­der Â· ENGDESIGN Leaderboard</p>
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
        {project.professionalDisclaimer && (
          <div className="inline-flex items-start gap-2 border border-yellow-400/20 bg-yellow-400/5 rounded-xl px-3 py-2">
            <ShieldAlert size={11} className="text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300/60 leading-relaxed">
              AnÃ¡lisis orientativo de apoyo a la decisiÃ³n tÃ©cnica. No sustituye la firma y validaciÃ³n de un arquitecto o ingeniero colegiado. Toda decisiÃ³n de obra requiere informe tÃ©cnico firmado por profesional habilitado.
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por quÃ© estos modelos Â· ENGDESIGN Leaderboard</p>
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
                <span className="text-xs text-white/20">ENGDESIGN & ARCHBENCH Â· 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-cyan-400">IngenierÃ­a</span>
                {" & "}
                <span className="text-violet-400">Arquitectura</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                IA para distribuciÃ³n espacial, estimaciÃ³n energÃ©tica de edificios y simulaciÃ³n de escenarios de coste y plazo en proyectos de obra. Un segundo par de ojos muy rÃ¡pido â€” no el par definitivo.
              </p>

              {/* Aviso de responsabilidad */}
              <div className="mt-5 inline-flex items-start gap-2 border border-yellow-400/20 bg-yellow-400/5 rounded-xl px-4 py-3 max-w-xl">
                <ShieldAlert size={13} className="text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-300/70 leading-relaxed">
                  <strong className="text-yellow-300">Aviso de responsabilidad profesional:</strong> cualquier estimaciÃ³n de coste, eficiencia energÃ©tica o distribuciÃ³n de planos generada por estas herramientas es orientativa. Un proyecto real de obra o edificaciÃ³n requiere firma y validaciÃ³n de un arquitecto o ingeniero colegiado, no solo la salida de un modelo de IA.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigaciÃ³n", value: "6" },
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
                En ingenierÃ­a y arquitectura las decisiones estÃ¡n encadenadas: la orientaciÃ³n de un edificio afecta su demanda energÃ©tica, que afecta el espesor del aislamiento, que afecta el coste, que afecta el plazo. La hipÃ³tesis del laboratorio es que la IA bien diseÃ±ada puede simular ese encadenamiento con mucha mÃ¡s velocidad de la que permite una hoja de cÃ¡lculo â€” no para reemplazar el criterio del profesional, sino para que llegue a la reuniÃ³n con escenarios ya explorados.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>

          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Del concepto al sistema en producciÃ³n</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Las seis lÃ­neas convergen en los tres proyectos del laboratorio, cada uno en un punto distinto del ciclo de vida: desde el diseÃ±o conceptual inicial (Vitruvio IA) hasta el anÃ¡lisis de desempeÃ±o en uso (Gaia Eficiencia) y la simulaciÃ³n de escenarios econÃ³micos y temporales (Atlas Constructor). Los tres comparten la misma constante de diseÃ±o: ninguna salida puede presentarse como definitiva sin validaciÃ³n de un profesional habilitado.
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
                Tres proyectos que cubren el ciclo completo de un proyecto de obra: de la distribuciÃ³n conceptual de planos (Vitruvio IA) al anÃ¡lisis de la envolvente tÃ©rmica del edificio construido (Gaia Eficiencia) hasta la simulaciÃ³n de escenarios de coste y plazo antes de ejecutar cualquier cambio (Atlas Constructor).
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
                Cinco aplicaciones reales de IA aplicada a ingenierÃ­a y arquitectura. Ninguna sustituye la firma y validaciÃ³n de un profesional colegiado para proyectos de obra. Verificar caracterÃ­sticas actuales y precios en la web oficial de cada herramienta.
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
                Cinco puntos que requieren revisiÃ³n antes de publicar o referenciar los datos de este cuaderno en materiales externos. Incluyen asimetrÃ­as de cobertura, el lÃ­mite de aplicabilidad de los benchmarks a arquitectura de planos y presupuestos de obra, la disponibilidad de DUCTILE-Sonnet-Agent y el estado de la normativa de referencia.
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
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo Â· ENGDESIGN & ARCHBENCH Leaderboard Â· 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_engineering.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_engineering.yaml</code>.
              Orientativo. No constituye proyecto tÃ©cnico ni certificaciÃ³n energÃ©tica.
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

