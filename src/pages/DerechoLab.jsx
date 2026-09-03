import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Code2 } from "lucide-react";
import { Scale } from "lucide-react";
import { Cpu } from "lucide-react";
import { GitBranch } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { ShieldAlert } from "lucide-react";

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RESEARCH_LINES = [
  {
    id: "contracts",
    number: "01",
    title: "AuditorÃ­a de contratos y detecciÃ³n de riesgo contractual",
    color: "violet",
    summary: "Un contrato mercantil puede tener decenas de clÃ¡usulas. La mayorÃ­a son estÃ¡ndar. Algunas no lo son: clÃ¡usulas leoninas, ausencia de protecciones habituales, lÃ­mites de responsabilidad inusualmente bajos, condiciones de rescisiÃ³n asimÃ©tricas.",
    detail: "El laboratorio investiga si un modelo puede hacer el primer recorrido de forma fiable, marcando los puntos que merecen atenciÃ³n sin inventar riesgos que no existen. Los benchmarks son CUAD (mÃ¡s de 500 contratos anotados con 41 tipos de clÃ¡usulas crÃ­ticas), LEDGAR (disposiciones contractuales de documentos SEC) y LexGLUE_UNFAIR_ToS (detecciÃ³n de tÃ©rminos de servicio abusivos).",
    benchmarks: [
      { name: "CUAD", desc: "500+ contratos, 41 tipos de clÃ¡usulas crÃ­ticas anotadas" },
      { name: "LexGLUE_LEDGAR", desc: "Disposiciones contractuales de documentos SEC" },
      { name: "LexGLUE_UNFAIR_ToS", desc: "DetecciÃ³n de tÃ©rminos de servicio abusivos" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "92.85", detail: "91.5 CUAD Â· 94.2 LEDGAR Â· 93.0 UNFAIR_ToS" },
  },
  {
    id: "jurisprudence",
    number: "02",
    title: "AnÃ¡lisis de jurisprudencia y tendencias en resoluciones judiciales",
    color: "blue",
    summary: "La jurisprudencia no es estÃ¡tica: se mueve. Un argumento que ganaba peso hace cinco aÃ±os puede estar perdiendo tracciÃ³n en las resoluciones mÃ¡s recientes. Un tipo de clÃ¡usula que los tribunales toleraban empieza a ser cuestionado.",
    detail: "El laboratorio investiga si un modelo puede detectar esas tendencias en colecciones de resoluciones, distinguiendo entre doctrina consolidada y lÃ­nea emergente. LegalBench (162 tareas de razonamiento jurÃ­dico), LexGLUE_CaseHOLD (quÃ© precedente aplica a un caso dado) y LexGLUE_SCOTUS miden esta capacidad.",
    benchmarks: [
      { name: "LegalBench_162_Tasks", desc: "162 tareas distintas de razonamiento jurÃ­dico" },
      { name: "LexGLUE_CaseHOLD", desc: "PredicciÃ³n de precedente aplicable a cada caso" },
      { name: "LexGLUE_SCOTUS", desc: "ClasificaciÃ³n de decisiones del Tribunal Supremo EE.UU." },
    ],
    topModel: { name: "DeepSeek-R1", score: "91.81", detail: "91.2 LegalBench Â· 92.5 CaseHOLD Â· 91.8 SCOTUS" },
  },
  {
    id: "compliance",
    number: "03",
    title: "Mapeo de cumplimiento normativo frente a marcos regulatorios",
    color: "teal",
    summary: "El AI Act de la UE, el GDPR, DORA y la ISO 42001 establecen requisitos que las organizaciones deben cumplir. Mapear quÃ© requisitos ya se cumplen y cuÃ¡les presentan huecos requiere cruzar documentaciÃ³n interna con el texto normativo.",
    detail: "El laboratorio investiga si un modelo puede hacer ese cotejo de forma sistemÃ¡tica y trazable. EUR-LEX, RegAudit_Regulatory_Adherence y GDPR_Privacy_Policy_Audit evalÃºan esta capacidad. Toda referencia normativa se marca con [VERIFICAR REDACCIÃ“N OFICIAL DE LA NORMA].",
    benchmarks: [
      { name: "LexGLUE_EURLEX_Compliance", desc: "Cotejo de polÃ­ticas contra normativa comunitaria" },
      { name: "RegAudit_Regulatory_Adherence", desc: "AuditorÃ­a regulatoria sistemÃ¡tica" },
      { name: "GDPR_Privacy_Policy_Audit", desc: "Cumplimiento de polÃ­ticas de privacidad GDPR" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "94.26", detail: "92.4 EURLEX Â· 95.0 RegAudit Â· 95.4 GDPR_Audit" },
    warning: true,
  },
];

const PROJECTS = [
  {
    id: "guardian",
    name: "Lex GuardiÃ¡n",
    tagline: "La primera pasada que encuentra lo que merece atenciÃ³n",
    desc: "Revisa el contrato clÃ¡usula por clÃ¡usula, compara cada una contra los patrones de riesgo conocidos y seÃ±ala quÃ© merece atenciÃ³n antes de que el abogado empiece su revisiÃ³n. No decide si el contrato debe firmarse, no da consejo legal, no reemplaza al abogado. Comprime la primera pasada.",
    color: "violet",
    researchLines: ["01"],
    legalDisclaimer: true,
    stack: [
      { role: "ExtracciÃ³n y clasificaciÃ³n de clÃ¡usulas", tech: "Claude 3.7 Sonnet â€” lÃ­der anÃ¡lisis contractual CUAD+LEDGAR (92.85/100)" },
      { role: "ExtracciÃ³n de responsabilidades e indemnizaciones", tech: "Claude 3.7 Sonnet â€” lÃ­der obligaciones y caps de responsabilidad (94.49/100)" },
      { role: "VerificaciÃ³n anti-alucinaciÃ³n de referencias", tech: "Claude 3.7 Sonnet â€” lÃ­der prevenciÃ³n de citas jurÃ­dicas falsas (96.66/100)" },
      { role: "Parser de documentos legales", tech: "PyMuPDF (PDF) Â· python-docx (Word) Â· preservaciÃ³n de numeraciÃ³n de clÃ¡usulas" },
      { role: "Almacenamiento", tech: "DuckDB â€” registro de auditorÃ­as por contrato + historial de clÃ¡usulas por tipo" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "AnÃ¡lisis contractual + anti-alucinaciÃ³n", score: "96.66", area: "Trazabilidad y PrevenciÃ³n de Alucinaciones JurÃ­dicas" },
      { model: "Claude 3.7 Sonnet", role: "ExtracciÃ³n de responsabilidades", score: "94.49", area: "Obligaciones, Responsabilidades e Indemnizaciones" },
    ],
    flow: [
      "Entrada: contrato en PDF, Word o texto plano + contexto opcional (tipo de contrato, jurisdicciÃ³n, sector)",
      "SegmentaciÃ³n por clÃ¡usulas: detecciÃ³n de estructura, separaciÃ³n en unidades semÃ¡nticas, preservaciÃ³n de posiciÃ³n (pÃ¡gina + nÃºmero de clÃ¡usula)",
      "ClasificaciÃ³n por tipo de clÃ¡usula (Claude 3.7 Sonnet): etiquetado segÃºn los 41 tipos CUAD con confianza por clasificaciÃ³n",
      "AnÃ¡lisis de riesgo: Â¿clÃ¡usula inusual para su tipo? Â¿desequilibrio entre partes? Â¿lÃ­mite de responsabilidad inusualmente bajo? Â¿no competencia desproporcionada?",
      "DetecciÃ³n de ausencias: clÃ¡usulas habituales no presentes para este tipo de contrato",
      "VerificaciÃ³n anti-alucinaciÃ³n: cada afirmaciÃ³n anclada en cita textual literal del contrato â€” prohibiciÃ³n de citar artÃ­culos de ley no presentes en el texto",
      "Salida A: informe con clÃ¡usula + tipo + riesgo + cita textual Â· Salida B: semÃ¡foro BAJO/MEDIO/ALTO/CRÃTICO Â· Salida C: ausencias Â· Salida D: resumen en lenguaje no jurÃ­dico",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado lex_guardian.py con las siguientes funciones:
1. parse_contract(filepath: str) -> dict: carga y segmenta el contrato.
   Detecta el formato (PDF, DOCX, TXT) y devuelve:
   {contract_id: str, source_file: str, raw_text: str,
    clauses: [{clause_id, clause_number: str, title: str | null,
    text: str, page: int}]}.
2. classify_clauses(clauses: list[dict], contract_context: dict,
   llm_client) -> list[dict]: clasifica cada clÃ¡usula segÃºn los 41 tipos CUAD.
   Devuelve: [{clause_id, cuad_type: str, cuad_type_confidence: float,
   secondary_types: list[str]}].
3. analyze_clause_risk(clause: dict, classification: dict,
   llm_client) -> dict: analiza el riesgo de una clÃ¡usula.
   Devuelve: {clause_id, risk_level: "low"|"medium"|"high"|"critical",
   risk_factors: list[str], text_citations: list[str],
   is_unusual: bool, imbalance_detected: bool,
   imbalance_description: str | null, confidence: float}.
4. detect_missing_clauses(classifications: list[dict], contract_type: str,
   llm_client) -> list[dict]: detecta clÃ¡usulas habituales ausentes.
   Devuelve: [{missing_cuad_type, importance: "optional"|"recommended"|"critical",
   rationale: str}].
5. verify_no_hallucination(analysis_results: list[dict],
   contract_text: str, llm_client) -> dict: verifica que cada afirmaciÃ³n
   estÃ¡ anclada en el texto del contrato.
   Devuelve: {all_grounded: bool, ungrounded_claims: list[str],
   verification_score: float}.
6. generate_audit_report(contract: dict, risk_results: list[dict],
   missing: list[dict], verification: dict) -> dict: genera el informe completo:
   {overall_risk: "low"|"medium"|"high"|"critical", clause_count: int,
   high_risk_count: int, critical_count: int, missing_count: int,
   executive_summary: str, detailed_findings: list[dict],
   legal_disclaimer: str}.
Usa PyMuPDF, python-docx, duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el auditor de contratos de Lex GuardiÃ¡n en el Laboratorio de Derecho
& Compliance de Horizon.
Se te proporciona una clÃ¡usula contractual con su tipo clasificado (segÃºn CUAD),
el tipo de contrato al que pertenece y la jurisdicciÃ³n si se conoce.

Tu tarea:
1. EvalÃºa si la clÃ¡usula es inusual para su tipo en el contexto contractual dado.
   Basa tu evaluaciÃ³n en la prÃ¡ctica contractual habitual para ese tipo de clÃ¡usula,
   no en una norma legal especÃ­fica que no estÃ© en el texto.
2. Detecta desequilibrios entre las partes: Â¿las obligaciones y derechos son
   recÃ­procos o asimÃ©tricos?
3. Para clÃ¡usulas de limitaciÃ³n de responsabilidad: Â¿el tope es inusualmente bajo
   para el valor estimado del contrato? Â¿Hay exclusiones que deberÃ­an alertar?
4. Para clÃ¡usulas de no competencia: Â¿el alcance geogrÃ¡fico, temporal y de actividad
   es proporcional al objeto del contrato?
5. Asigna un nivel de riesgo: low | medium | high | critical.

Restricciones crÃ­ticas absolutas:
- NUNCA cites un artÃ­culo de ley, reglamento o sentencia que no aparezca
  literalmente en el texto de la clÃ¡usula que te doy.
- Si necesitas referenciar una norma general, escribe:
  "[VERIFICAR REDACCIÃ“N OFICIAL DE LA NORMA]".
- Cada afirmaciÃ³n de riesgo debe estar acompaÃ±ada de la cita textual exacta
  de la clÃ¡usula que la fundamenta. Sin cita textual, no hay afirmaciÃ³n de riesgo.
- No uses lenguaje categÃ³rico ("esta clÃ¡usula es ilegal"):
  usa "inusual", "potencialmente problemÃ¡tica", "requiere revisiÃ³n de abogado".

Responde en JSON conforme al esquema de analyze_clause_risk.`,
  },
  {
    id: "sententia",
    name: "Sententia Nova",
    tagline: "La tendencia que emerge de cien resoluciones leÃ­das en serie",
    desc: "Detecta en quÃ© direcciÃ³n se mueve la jurisprudencia sobre un tipo de caso, quÃ© argumentos estÃ¡n ganando peso en los razonamientos de los tribunales, quÃ© tipos de clÃ¡usulas o conductas estÃ¡n siendo cada vez mÃ¡s cuestionados. No predice el resultado de un caso concreto: describe el estado actual y la tendencia del corpus.",
    color: "blue",
    researchLines: ["02"],
    legalDisclaimer: true,
    stack: [
      { role: "AnÃ¡lisis jurÃ­dico de resoluciones individuales", tech: "DeepSeek-R1 â€” lÃ­der razonamiento jurisprudencial (91.81/100)" },
      { role: "SÃ­ntesis de tendencias y trazabilidad", tech: "Claude 3.7 Sonnet â€” lÃ­der prevenciÃ³n de alucinaciones jurÃ­dicas (96.66/100)" },
      { role: "Motor de bÃºsqueda semÃ¡ntica", tech: "Embeddings sobre corpus de resoluciones + DuckDB para el Ã­ndice" },
      { role: "Fuente de resoluciones", tech: "Corpus proporcionado por el usuario (PDF/texto) o API jurisprudencial externa [VERIFICAR DISPONIBILIDAD]" },
    ],
    whyModels: [
      { model: "DeepSeek-R1", role: "AnÃ¡lisis de resoluciones individuales", score: "91.81", area: "Razonamiento JurÃ­dico y Jurisprudencia" },
      { model: "Claude 3.7 Sonnet", role: "SÃ­ntesis de tendencias y verificaciÃ³n", score: "96.66", area: "Trazabilidad y PrevenciÃ³n de Alucinaciones" },
    ],
    flow: [
      "Entrada: corpus de resoluciones judiciales (PDF o texto) + materia de anÃ¡lisis en lenguaje natural",
      "IndexaciÃ³n: extracciÃ³n de texto y metadatos (tribunal, fecha, instancia, jurisdicciÃ³n), segmentaciÃ³n en hechos / razonamiento / fallo, indexaciÃ³n semÃ¡ntica",
      "RecuperaciÃ³n de las N resoluciones mÃ¡s relevantes para la materia (bÃºsqueda semÃ¡ntica, default N=20)",
      "AnÃ¡lisis de cada resoluciÃ³n (DeepSeek-R1): norma aplicada, argumentos aceptados/rechazados, fallo, precedentes citados",
      "SÃ­ntesis de tendencias (Claude 3.7 Sonnet): direcciÃ³n clara o divergencia, argumentos con mayor frecuencia, cambios en los Ãºltimos 12/24 meses",
      "VerificaciÃ³n de trazabilidad: cada afirmaciÃ³n de tendencia cita la resoluciÃ³n especÃ­fica que la sustenta â€” seÃ±ales basadas en menos de 3 resoluciones etiquetadas como SEÃ‘AL DÃ‰BIL",
      "Salida A: informe de tendencia con citas Â· Salida B: lÃ­nea temporal Â· Salida C: mapa de argumentos Â· Salida D: advertencias de divergencia entre instancias",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado sententia_nova.py con las siguientes funciones:
1. load_case_corpus(filepaths: list[str]) -> list[dict]: carga el corpus de resoluciones.
   Para cada resoluciÃ³n devuelve:
   {case_id: str, source_file: str, court: str | null, date: str | null,
    jurisdiction: str | null, instance: str | null,
    sections: {facts: str, reasoning: str, ruling: str},
    full_text: str}.
2. index_corpus(cases: list[dict], embedding_client) -> None:
   genera embeddings para cada secciÃ³n y los almacena en DuckDB
   para bÃºsqueda semÃ¡ntica eficiente.
3. retrieve_relevant_cases(query: str, corpus_index, top_k: int = 20) -> list[dict]:
   recupera las K resoluciones mÃ¡s semÃ¡nticamente relevantes.
4. analyze_single_case(case: dict, query: str, llm_client) -> dict:
   analiza una resoluciÃ³n individual. Devuelve:
   {case_id, applied_norm: str | null, accepted_arguments: list[str],
   rejected_arguments: list[str], ruling_summary: str, cited_precedents: list[str],
   key_reasoning: str, analysis_confidence: float}.
5. synthesize_trends(case_analyses: list[dict], query: str,
   llm_client) -> dict: sintetiza el patrÃ³n de tendencia.
   Devuelve: {trend_direction: str, trend_strength: "weak"|"moderate"|"strong",
   supporting_cases: list[str], divergences: list[str],
   argument_frequency: dict, temporal_evolution: list[dict],
   verification_score: float}.
6. verify_trend_grounding(trends: dict, case_analyses: list[dict],
   llm_client) -> dict: verifica que cada afirmaciÃ³n de tendencia estÃ¡
   anclada en el corpus. Devuelve:
   {all_grounded: bool, ungrounded_claims: list[str],
   weak_signals: list[str], grounding_score: float}.
7. generate_trend_report(trends: dict, verification: dict,
   case_analyses: list[dict]) -> str: genera el informe en Markdown.
Usa sentence-transformers, duckdb, PyMuPDF y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el analista jurÃ­dico de Sententia Nova en el Laboratorio de Derecho
& Compliance de Horizon.
Se te proporciona el texto de una resoluciÃ³n judicial (o su secciÃ³n de razonamiento)
y la materia de anÃ¡lisis que se estÃ¡ investigando.

Tu tarea:
1. Identifica quÃ© norma jurÃ­dica aplica el tribunal en su razonamiento.
   Solo cita normas que aparezcan en el texto de la resoluciÃ³n.
2. Extrae los argumentos de las partes que el tribunal acepta y los que rechaza,
   con cita textual de los pÃ¡rrafos relevantes.
3. Resume el razonamiento principal del tribunal en 2-4 frases.
4. Identifica si la resoluciÃ³n cita precedentes anteriores. Lista solo los que
   aparezcan explÃ­citamente citados en el texto.
5. Extrae el fallo en una frase: quÃ© se decide y a favor de quiÃ©n.

Restricciones absolutas:
- NUNCA aÃ±adas normas, artÃ­culos o sentencias que no aparezcan en el texto.
- Si el texto es insuficiente para determinar un campo, ponlo como null.
- No hagas predicciones sobre casos futuros basadas en esta resoluciÃ³n individual.

Responde en JSON conforme al esquema de analyze_single_case.`,
  },
  {
    id: "norma",
    name: "Norma Aurea",
    tagline: "El mapa exacto de dÃ³nde estÃ¡ la organizaciÃ³n y quÃ© le falta",
    desc: "Toma la documentaciÃ³n interna de la organizaciÃ³n y la contrasta sistemÃ¡ticamente contra los requisitos del AI Act, GDPR, DORA e ISO 42001. El resultado no es una certificaciÃ³n: es un mapa de situaciÃ³n que dice exactamente en quÃ© punto estÃ¡ la organizaciÃ³n respecto a cada requisito, con las evidencias documentales que lo justifican.",
    color: "teal",
    researchLines: ["03"],
    legalDisclaimer: true,
    stack: [
      { role: "Cotejo documentaciÃ³n interna vs. requisitos normativos", tech: "Claude 3.7 Sonnet â€” lÃ­der auditorÃ­a regulatoria EUR-LEX y GDPR (94.26/100)" },
      { role: "Trazabilidad y anti-alucinaciÃ³n de requisitos", tech: "Claude 3.7 Sonnet â€” lÃ­der prevenciÃ³n de alucinaciones jurÃ­dicas (96.66/100)" },
      { role: "Obligaciones contractuales con proveedores (DORA)", tech: "Claude 3.7 Sonnet â€” lÃ­der intersecciÃ³n finanzas-derecho (94.17/100)" },
      { role: "Base de requisitos normativos", tech: "CatÃ¡logo estructurado por artÃ­culo/secciÃ³n [VERIFICAR REDACCIÃ“N OFICIAL DE CADA NORMA antes de producciÃ³n]" },
      { role: "Almacenamiento", tech: "DuckDB â€” mapa de cumplimiento por organizaciÃ³n + histÃ³rico de evaluaciones periÃ³dicas" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "AuditorÃ­a regulatoria + trazabilidad", score: "96.66", area: "Trazabilidad y PrevenciÃ³n de Alucinaciones" },
      { model: "Claude 3.7 Sonnet", role: "Cumplimiento EUR-LEX y GDPR", score: "94.26", area: "Cumplimiento Normativo y AuditorÃ­a Regulatoria" },
    ],
    flow: [
      "Entradas: documentaciÃ³n interna (polÃ­ticas, procedimientos, registros, contratos con proveedores de IA) + marco normativo objetivo + perfil de la organizaciÃ³n",
      "SelecciÃ³n de requisitos aplicables: filtrado del catÃ¡logo normativo segÃºn perfil (tamaÃ±o, sector, tipo de sistema de IA, rol: proveedor o usuario)",
      "IndexaciÃ³n semÃ¡ntica de la documentaciÃ³n interna para recuperaciÃ³n eficiente por materia",
      "Cotejo requisito a requisito (Claude 3.7 Sonnet): bÃºsqueda de evidencias â†’ CUMPLIDO / PARCIALMENTE CUMPLIDO / HUECO con cita textual del documento interno",
      "Si no hay evidencia: declarar HUECO con descripciÃ³n de quÃ© documento falta",
      "AnÃ¡lisis de huecos: CRÃTICO (puede derivar en sanciÃ³n) / RELEVANTE (requiere acciÃ³n antes de auditorÃ­a) / MENOR (buena prÃ¡ctica no implementada)",
      "Salida A: mapa completo (requisito Ã— estado Ã— evidencia) Â· Salida B: huecos por criticidad Â· Salida C: dashboard de cumplimiento % Â· Salida D: plan de acciÃ³n priorizado",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado norma_aurea.py con las siguientes funciones:
1. load_regulatory_catalog(framework: str) -> list[dict]:
   carga el catÃ¡logo de requisitos del marco normativo.
   Devuelve lista de requisitos: {req_id: str, framework: str,
   article_section: str, requirement_text: str, applicability_criteria: list[str],
   criticality: "critical"|"relevant"|"minor"}.
2. filter_applicable_requirements(catalog: list[dict],
   org_profile: dict) -> list[dict]:
   filtra los requisitos aplicables al perfil de la organizaciÃ³n.
3. index_org_documentation(doc_paths: list[str], embedding_client) -> None:
   indexa la documentaciÃ³n interna de la organizaciÃ³n en DuckDB.
4. assess_requirement(req: dict, org_docs_index, org_docs_texts: dict,
   llm_client) -> dict: evalÃºa el cumplimiento de un requisito individual.
   Devuelve: {req_id, status: "compliant"|"partial"|"gap"|"not_applicable",
   evidence_citations: list[{doc_name, section, quote}],
   gap_description: str | null, confidence: float}.
5. analyze_gaps(assessments: list[dict], llm_client) -> list[dict]:
   analiza y clasifica los huecos detectados. Devuelve lista de huecos:
   {req_id, criticality, gap_description, remediation_type:
    "new_document"|"process_change"|"adaptation"|"training",
   remediation_effort: "low"|"medium"|"high", priority: int}.
6. generate_compliance_map(applicable_reqs: list[dict],
   assessments: list[dict], gaps: list[dict]) -> dict:
   genera el mapa de cumplimiento completo:
   {framework, org_profile: dict, overall_compliance_pct: float,
   by_area: dict, total_requirements: int, compliant: int, partial: int,
   gaps: int, not_applicable: int, action_plan: list[dict]}.
7. export_compliance_report(compliance_map: dict,
   output_format: str = "markdown") -> str: exporta el informe.
Usa sentence-transformers, duckdb, PyMuPDF, python-docx y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el auditor de cumplimiento normativo de Norma Aurea en el Laboratorio
de Derecho & Compliance de Horizon.

Se te proporciona:
- El texto de un requisito normativo especÃ­fico (con su artÃ­culo/secciÃ³n de referencia)
- Los fragmentos de documentaciÃ³n interna que el sistema ha identificado como
  potencialmente relevantes para ese requisito.

Tu tarea:
1. EvalÃºa si la documentaciÃ³n interna evidencia el cumplimiento del requisito.
   No es suficiente que la documentaciÃ³n "mencione" el tema; debe cubrir lo que
   el requisito exige.
2. Clasifica el estado: COMPLIANT | PARTIAL | GAP.
3. Para COMPLIANT o PARTIAL: cita exactamente quÃ© secciÃ³n y quÃ© texto del documento
   interno justifica la evaluaciÃ³n.
4. Para GAP: describe exactamente quÃ© falta (quÃ© tipo de documento, procedimiento
   o registro deberÃ­a existir).
5. Asigna una confianza entre 0.0 y 1.0. Si es menor a 0.6, recomienda revisiÃ³n
   manual por el responsable de compliance.

Restricciones absolutas:
- No afirmes COMPLIANT si el documento solo menciona el tema sin regularlo.
- No infiertes que algo se cumple porque "serÃ­a habitual en este tipo de organizaciÃ³n".
  Solo lo que estÃ¡ documentado cuenta como evidencia.
- AÃ±ade siempre "[VERIFICAR REDACCIÃ“N OFICIAL DE LA NORMA]" si necesitas interpretar
  el requisito mÃ¡s allÃ¡ del texto que te proporcionan.

Responde en JSON conforme al esquema de assess_requirement.`,
  },
];

const MARKET_APPS = [
  {
    name: "Harvey AI",
    desc: "IA generativa para despachos de abogados y departamentos jurÃ­dicos corporativos. RevisiÃ³n de contratos, investigaciÃ³n jurÃ­dica asistida y generaciÃ³n de documentos legales.",
    url: "https://harvey.ai",
    tag: "Despachos & Legal Corp.",
  },
  {
    name: "Ironclad AI",
    desc: "GestiÃ³n del ciclo de vida de contratos (CLM) con IA para extracciÃ³n de clÃ¡usulas, alertas de vencimiento y anÃ¡lisis de riesgo contractual. Orientada a departamentos jurÃ­dicos corporativos.",
    url: "https://ironcladapp.com",
    tag: "GestiÃ³n de Contratos",
  },
  {
    name: "Luminance",
    desc: "RevisiÃ³n de documentos legales con IA, especializada en due diligence para M&A, auditorÃ­a de contratos y revisiÃ³n de documentaciÃ³n en procesos de litigaciÃ³n.",
    url: "https://luminance.com",
    tag: "Due Diligence",
  },
  {
    name: "LexisNexis+ AI",
    desc: "IA generativa integrada en la plataforma de investigaciÃ³n jurÃ­dica de LexisNexis, con acceso a jurisprudencia, legislaciÃ³n y doctrina, y funciones de resumen y anÃ¡lisis de precedentes.",
    url: "https://lexisnexis.com/en-us/products/lexis-plus-ai",
    tag: "InvestigaciÃ³n JurÃ­dica",
  },
  {
    name: "OneTrust (Privacy & Data Governance)",
    desc: "GestiÃ³n de cumplimiento normativo en privacidad y protecciÃ³n de datos, con automatizaciÃ³n de registros de actividades de tratamiento (GDPR), evaluaciones de impacto (DPIA) y auditorÃ­as.",
    url: "https://onetrust.com",
    tag: "Compliance & Privacy",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "AsimetrÃ­a en la cobertura de benchmarks por modelo",
    items: [
      "AnÃ¡lisis de Contratos: GPT-4.5 (67% cobertura) carece de evaluaciÃ³n en LexGLUE_UNFAIR_ToS. Lex-Guardian Agent (33% cobertura) solo fue evaluado en CUAD_41_Clauses_Extraction.",
      "Razonamiento JurÃ­dico: Claude 3.7 Sonnet (67% cobertura) no cuenta con datos en LexGLUE_CaseHOLD_Precedents.",
      "Cumplimiento Normativo: GPT-4.5 (67% cobertura) no dispone de resultado para LexGLUE_EURLEX_Compliance.",
      "Obligaciones y Responsabilidades: Lex-Guardian Agent (67% cobertura) no tiene registrada evaluaciÃ³n en LexGLUE_ECtHR_Human_Rights.",
      "Trazabilidad y PrevenciÃ³n de Alucinaciones: GPT-4.5 y DeepSeek-R1 (ambos 33% cobertura) solo registran datos en Legal_Hallucination_Statute_Citation, faltando LegalBench_Interpretation_Trace y Audit_Chain_Evidence_Verification.",
      "IntersecciÃ³n Finanzas-Derecho: DeepSeek-R1 (67% cobertura) carece de evaluaciÃ³n en MA_Due_Diligence_Red_Flag.",
    ],
  },
  {
    id: "v2",
    title: "Diferencial estrecho entre DeepSeek-R1 y GPT-4.5 en Razonamiento JurÃ­dico",
    items: [
      "DeepSeek-R1 lidera con 91.81/100 y GPT-4.5 ocupa el segundo lugar con 91.16/100: una diferencia de 0.65 puntos, ambos con 100% de cobertura.",
      "Caso de inversiÃ³n: Claude 3.7 Sonnet obtiene 92.8 en LegalBench_162_Tasks y 93.5 en LexGLUE_SCOTUS_Decisions â€” puntuaciones individuales mÃ¡s altas que DeepSeek-R1 â€” pero queda en tercera posiciÃ³n compuesta (88.47/100) por penalizaciÃ³n de cobertura al no haber sido evaluado en LexGLUE_CaseHOLD_Precedents.",
      "ImplicaciÃ³n para Sententia Nova: si el corpus en producciÃ³n es mayoritariamente de SCOTUS o LegalBench, Claude 3.7 Sonnet podrÃ­a ser preferible al lÃ­der compuesto. DecisiÃ³n pendiente de evaluaciÃ³n en producciÃ³n.",
    ],
  },
  {
    id: "v3",
    title: "MÃ©tricas de coste y latencia en revisiÃ³n masiva de contratos",
    items: [
      "Las mÃ©tricas de latencia de inferencia y coste por millÃ³n de tokens en flujos de revisiÃ³n masiva (Lex GuardiÃ¡n en modo bulk con cientos de documentos simultÃ¡neos) no forman parte del reporte actual.",
      "Dato especialmente relevante para departamentos jurÃ­dicos que necesiten procesar carteras de contratos completas.",
    ],
  },
  {
    id: "v4",
    title: "Lex-Guardian Agent como alternativa especializada en extracciÃ³n de clÃ¡usulas",
    items: [
      "El Lex-Guardian Agent aparece con 96.5 en CUAD_41_Clauses_Extraction, superando al Claude 3.7 Sonnet base en ese benchmark especÃ­fico, pero con solo 33% de cobertura de benchmarks en su Ã¡rea.",
      "La decisiÃ³n de si este agente especializado es preferible a Claude 3.7 Sonnet para extracciÃ³n de clÃ¡usulas en volumen debe evaluarse en producciÃ³n. Queda documentada como [DATO PENDIENTE DE VERIFICAR EN EVALUACIÃ“N COMPARATIVA PROPIA].",
    ],
  },
  {
    id: "v5",
    title: "LegislaciÃ³n y normativas referenciadas",
    items: [
      "Toda referencia normativa en este cuaderno (Reglamento de IA de la UE, GDPR, DORA, ISO 42001) estÃ¡ marcada con [VERIFICAR REDACCIÃ“N OFICIAL DE LA NORMA].",
      "Los textos normativos se actualizan, pueden tener actos delegados posteriores y pueden tener interpretaciones de la autoridad supervisora que modifiquen su aplicaciÃ³n.",
      "NingÃºn dato de este cuaderno debe usarse como referencia definitiva de obligaciones normativas sin consulta al texto oficial y a un abogado especializado en cumplimiento regulatorio.",
    ],
  },
];

// â”€â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STYLES = {
  violet: {
    card: "border-violet-400/30 bg-violet-400/5",
    score: "text-violet-400",
    badge: "bg-violet-400/10 text-violet-300 border-violet-400/20",
    dot: "bg-violet-400",
    accent: "text-violet-400",
    border: "border-violet-400/30",
    bg: "bg-violet-400/5",
    tabBorder: "border-violet-400/30",
  },
  blue: {
    card: "border-blue-400/30 bg-blue-400/5",
    score: "text-blue-400",
    badge: "bg-blue-400/10 text-blue-300 border-blue-400/20",
    dot: "bg-blue-400",
    accent: "text-blue-400",
    border: "border-blue-400/30",
    bg: "bg-blue-400/5",
    tabBorder: "border-blue-400/30",
  },
  teal: {
    card: "border-teal-400/30 bg-teal-400/5",
    score: "text-teal-400",
    badge: "bg-teal-400/10 text-teal-300 border-teal-400/20",
    dot: "bg-teal-400",
    accent: "text-teal-400",
    border: "border-teal-400/30",
    bg: "bg-teal-400/5",
    tabBorder: "border-teal-400/30",
  },
};

function ResearchLineCard({ line }) {
  const [open, setOpen] = useState(false);
  const s = STYLES[line.color];
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${s.card}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 sm:p-6 flex items-start gap-4 hover:opacity-90 transition-opacity"
      >
        <span className="font-display text-2xl sm:text-3xl text-white/20 shrink-0 leading-none mt-0.5">
          {line.number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-base sm:text-lg text-white leading-snug">{line.title}</h3>
            <ChevronDown size={16} className={`shrink-0 text-white/40 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="text-white/50 text-sm mt-1.5 leading-relaxed line-clamp-2">{line.summary}</p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className={`text-xs border px-2.5 py-0.5 rounded-full ${s.badge}`}>
              Top: {line.topModel.name}
            </span>
            <span className={`font-display text-sm font-bold ${s.score}`}>
              {line.topModel.score}/100
            </span>
            {line.warning && (
              <span className="text-xs border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle size={10} /> Normativa: verificar texto oficial
              </span>
            )}
          </div>
        </div>
      </button>
      {open && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/5 pt-4 space-y-4">
          <p className="text-white/60 text-sm leading-relaxed">{line.detail}</p>
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Benchmarks de referencia</p>
            <div className="flex flex-wrap gap-2">
              {line.benchmarks.map((b) => (
                <div key={b.name} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <p className="text-xs font-mono text-white/80">{b.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1.5">Modelo lÃ­der Â· STATER Legal Leaderboard 2026-08-29</p>
            <p className="text-sm text-white font-medium">{line.topModel.name}</p>
            <p className="text-xs text-white/50 mt-0.5">{line.topModel.detail}</p>
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
        {project.legalDisclaimer && (
          <div className="inline-flex items-start gap-2 border border-yellow-400/20 bg-yellow-400/5 rounded-xl px-3 py-2">
            <AlertTriangle size={11} className="text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300/60 leading-relaxed">
              AnÃ¡lisis automatizado de primer nivel. No constituye asesoramiento legal ni suple la revisiÃ³n de un abogado.
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por quÃ© estos modelos Â· STATER Legal Leaderboard</p>
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

export default function DerechoLab() {
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
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center shrink-0">
              <Scale size={28} className="text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs border border-violet-400/30 bg-violet-400/10 text-violet-400 px-3 py-0.5 rounded-full">
                  Laboratorio verificado
                </span>
                <span className="text-xs text-white/20">STATER Legal & Compliance Â· 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-violet-400">Derecho</span>
                {" & "}
                <span className="text-violet-400">Compliance</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                IA para auditorÃ­a de contratos, anÃ¡lisis de jurisprudencia y mapeo de cumplimiento normativo.
                El estÃ¡ndar de calidad aquÃ­ no es "acierta el 90%": es "no inventa citas jurÃ­dicas que no existen".
              </p>

              {/* Aviso legal */}
              <div className="mt-5 inline-flex items-start gap-2 border border-yellow-400/20 bg-yellow-400/5 rounded-xl px-4 py-3 max-w-xl">
                <ShieldAlert size={13} className="text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-300/70 leading-relaxed">
                  <strong className="text-yellow-300">Aviso de responsabilidad jurÃ­dica:</strong> ninguna salida de las herramientas descritas constituye asesoramiento legal ni suple el criterio de un abogado o responsable de compliance habilitado. La decisiÃ³n final y la firma de cualquier documento jurÃ­dico corresponden siempre a un profesional habilitado.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Familias de problemas", value: "3" },
                  { label: "Proyectos activos", value: "3" },
                  { label: "Benchmarks cubiertos", value: "9" },
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
                El estÃ¡ndar de calidad en este laboratorio es mÃ¡s exigente: no es "el modelo acierta el 90% de los casos".
                Es "el modelo no inventa citas jurÃ­dicas que no existen". Una referencia a un artÃ­culo de ley que no existe,
                en un informe que alguien toma como base para una decisiÃ³n legal, puede tener consecuencias graves.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => <ResearchLineCard key={line.id} line={line} />)}
          </div>

          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Del problema acotado al sistÃ©mico</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Las tres familias estÃ¡n ordenadas por escala: del contrato individual (01) a la jurisprudencia
              de un sector (02) al marco regulatorio completo de una organizaciÃ³n (03). Los tres proyectos
              del laboratorio operan en ese mismo orden de escala, y comparten una constante de diseÃ±o:
              ninguna salida puede contener una afirmaciÃ³n que no estÃ© anclada en el texto fuente.
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
                Tres proyectos de escala creciente, del contrato individual al marco regulatorio completo.
                Los tres comparten la misma constante de diseÃ±o: anti-alucinaciÃ³n como requisito no negociable,
                no como caracterÃ­stica opcional.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {PROJECTS.map((project) => <ProjectCard key={project.id} project={project} />)}
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
                Cinco aplicaciones reales de IA aplicada a derecho y compliance. Ninguna sustituye el
                asesoramiento de un abogado o responsable de compliance habilitado.
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
                Cinco puntos que requieren revisiÃ³n antes de publicar o referenciar los datos de este cuaderno
                en materiales externos. Incluyen asimetrÃ­as de cobertura, un diferencial estadÃ­stico estrecho
                relevante para la elecciÃ³n de modelo y la advertencia sistemÃ¡tica sobre normativa.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {VERIFICATION_POINTS.map((point) => <VerificationItem key={point.id} point={point} />)}
          </div>
        </section>

        {/* â”€â”€ Footer CTA â”€â”€ */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo Â· STATER Legal & Compliance Â· 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_legal.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_legal.yaml</code>.
              No constituye asesoramiento legal.
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

