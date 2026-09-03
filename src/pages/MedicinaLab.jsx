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
import { Heart } from "lucide-react";
import { ShieldCheck } from "lucide-react";

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RESEARCH_LINES = [
  {
    id: "clinical-eval",
    number: "01",
    title: "Evaluación clínica y control de alucinaciones en modelos médicos",
    color: "teal",
    summary:
      "Superar el examen de especialidad médica estadounidense (USMLE) no garantiza que las respuestas en producción sean seguras. El razonamiento médico real requiere manejar incertidumbre, contradicción entre fuentes y casos atípicos. La diferencia entre «saber medicina» y «razonar correctamente cuando el caso es ambiguo» es la que este área mide.",
    detail:
      "MedQA_USMLE y MedMCQA miden conocimiento médico clínico estructurado. HealthBench_Pro y ClinEval_Diagnosis miden el razonamiento ante casos ambiguos en producción. El segundo componente de esta área es la no-maleficencia (Do-No-Harm): el principio ético que obliga al sistema a rechazar activamente recomendaciones peligrosas â€” dosis letales, contraindicaciones ignoradas, sesgos demográficos en el diagnóstico. DoNoHarm_Bench, MedHELM_Safety_Bias y HealthBench_RedTeaming miden esta capacidad de rechazo.",
    benchmarks: [
      { name: "MedQA_USMLE", desc: "Conocimiento médico clínico â€” estándar USMLE de especialidad" },
      { name: "MedMCQA", desc: "Preguntas de opción múltiple de medicina clínica estructurada" },
      { name: "HealthBench_Pro", desc: "Razonamiento ante casos ambiguos y complejos en producción" },
      { name: "ClinEval_Diagnosis", desc: "Evaluación de razonamiento diagnóstico en casos atípicos" },
    ],
    topModel: {
      name: "DeepSeek-R1",
      score: "91.6",
      detail: "92.4 MedQA_USMLE · 90.7 MedMCQA â€” líder en QA médica y evidencia biomédica",
    },
  },
  {
    id: "do-no-harm",
    number: "02",
    title: "Seguridad clínica y no-maleficencia (Do-No-Harm)",
    color: "emerald",
    summary:
      "Do-No-Harm es el primer principio de la ética médica: la obligación de no causar daño. Aplicado a modelos de IA significa que el sistema debe rechazar activamente recomendaciones peligrosas y detectar sesgos demográficos que afectan el diagnóstico.",
    detail:
      "DoNoHarm_Bench mide la capacidad del modelo de rechazar recomendaciones con riesgo directo para el paciente. MedHELM_Safety_Bias evalúa sesgos demográficos implícitos que afectan la calidad del diagnóstico. HealthBench_RedTeaming mide la robustez del modelo ante intentos de extraer contenido médico peligroso mediante técnicas de jailbreak. Claude 3.5 Sonnet lidera con 95.3/100 compuesto, registrando 96.4 en DoNoHarm_Bench â€” la puntuación más alta de cualquier modelo en cualquier área médica evaluada.",
    benchmarks: [
      { name: "DoNoHarm_Bench", desc: "Rechazo de recomendaciones con riesgo directo para el paciente" },
      { name: "MedHELM_Safety_Bias", desc: "Detección de sesgos demográficos en diagnóstico" },
      { name: "HealthBench_RedTeaming", desc: "Robustez ante extracción de contenido médico peligroso" },
    ],
    topModel: {
      name: "Claude 3.5 Sonnet",
      score: "95.3",
      detail: "96.4 DoNoHarm_Bench · 95.1 MedHELM_Safety_Bias · 94.0 HealthBench_RedTeaming",
    },
  },
  {
    id: "ehr-nlp",
    number: "03",
    title: "Interoperabilidad de datos de salud y estructuración de EHR",
    color: "cyan",
    summary:
      "Las historias clínicas electrónicas (EHR: Electronic Health Records) son el repositorio central de un paciente, pero cada sistema hospitalario las almacena de forma diferente. Convertir notas médicas en texto libre al estándar HL7 FHIR es un problema de NLP especializado â€” el punto de unión entre el caos de los datos clínicos reales y las aplicaciones de IA que necesitan datos limpios.",
    detail:
      "BLURB_Suite (Biomedical Language Understanding and Reasoning Benchmark) mide NLP biomédico en tareas como extracción de entidades clínicas, normalización de nombres de fármacos y relación entre entidades. FlowerTune_Medical_NLP evalúa el ajuste de modelos a vocabulario clínico especializado. EHR_Summarization mide la capacidad de resumir historiales completos manteniendo la fidelidad clínica. Claude 3.5 Sonnet lidera con 90.2/100 compuesto.",
    benchmarks: [
      { name: "BLURB_Suite", desc: "NLP biomédico: extracción de entidades, normalización de fármacos, relaciones" },
      { name: "FlowerTune_Medical_NLP", desc: "Ajuste a vocabulario clínico especializado" },
      { name: "EHR_Summarization", desc: "Resumen fiel de historiales clínicos completos" },
    ],
    topModel: {
      name: "Claude 3.5 Sonnet",
      score: "90.2",
      detail: "90.2 BLURB_Suite · 88.4 FlowerTune_Medical_NLP · 92.3 EHR_Summarization",
    },
  },
  {
    id: "diagnosis",
    number: "04",
    title: "Diagnóstico clínico y toma de decisiones en triage",
    color: "teal",
    summary:
      "El diagnóstico diferencial â€” generar y ordenar una lista de posibles causas para los síntomas de un paciente â€” es una de las tareas más complejas de la práctica médica. Requiere integrar información parcial, manejar síntomas comunes a múltiples patologías y priorizar correctamente según el riesgo para el paciente.",
    detail:
      "HealthBench_Pro evalúa el razonamiento clínico ante casos complejos con múltiples diagnósticos posibles. ClinEval_Diagnosis mide específicamente la calidad del diagnóstico diferencial y la toma de decisiones en triage. AMIE (Articulate Medical Intelligence Explorer) de Google DeepMind fue evaluado en estudios controlados frente a médicos de atención primaria. Lidera con 92.7/100 compuesto, registrando 93.5 en ClinEval_Diagnosis.",
    benchmarks: [
      { name: "HealthBench_Pro", desc: "Razonamiento clínico ante casos con múltiples diagnósticos posibles" },
      { name: "ClinEval_Diagnosis", desc: "Diagnóstico diferencial y toma de decisiones en triage" },
    ],
    topModel: {
      name: "AMIE (Google ClinEval)",
      score: "92.7",
      detail: "92.1 HealthBench_Pro · 93.5 ClinEval_Diagnosis â€” evaluado frente a médicos de atención primaria",
    },
    warning: true,
  },
  {
    id: "pathophysiology",
    number: "05",
    title: "Razonamiento fisiopatológico y cálculo médico complejo",
    color: "emerald",
    summary:
      "La fisiopatología conecta el mecanismo de enfermedad con la presentación clínica. MedCalc integra fórmulas médicas complejas (GFR, CHADS2-VASc, MELD, Framingham) con el contexto del paciente. Esta área mide si el modelo puede combinar razonamiento biológico y cálculo especializado sin errores de precisión.",
    detail:
      "MedCalc_Bench evalúa el cálculo médico especializado con fórmulas clínicas validadas. MedHELM_MultiStep_Reasoning mide el razonamiento fisiopatológico en cadenas de múltiples pasos. Pathology_Reasoning evalúa la integración de hallazgos patológicos en el razonamiento diagnóstico. DeepSeek-R1 lidera con 94.0/100 compuesto, aunque el diferencial con o1-preview (93.9/100) es de solo 0.1 puntos â€” ver Módulo 4, punto 4.2.",
    benchmarks: [
      { name: "MedCalc_Bench", desc: "Cálculo médico especializado: GFR, CHADS2-VASc, MELD, Framingham" },
      { name: "MedHELM_MultiStep_Reasoning", desc: "Razonamiento fisiopatológico en cadenas de múltiples pasos" },
      { name: "Pathology_Reasoning", desc: "Integración de hallazgos patológicos en razonamiento diagnóstico" },
    ],
    topModel: {
      name: "DeepSeek-R1",
      score: "94.0",
      detail: "Diferencial de 0.1 puntos con o1-preview (93.9) â€” ver punto 4.2",
    },
    warning: true,
  },
  {
    id: "adherence",
    number: "06",
    title: "Seguimiento y adherencia de pacientes",
    color: "cyan",
    summary:
      "La adherencia al tratamiento â€” que el paciente tome la medicación pautada, acuda a las revisiones y siga las indicaciones â€” es uno de los determinantes de salud más subestimados. Esta área investiga si los modelos pueden actuar como capa de soporte conversacional para el seguimiento continuo del paciente entre consultas: no como sustituto del médico, sino como sistema de alerta temprana.",
    detail:
      "Esta línea combina capacidades de NLP clínico (interpretación de síntomas reportados en lenguaje natural), razonamiento conversacional (mantenimiento del contexto del tratamiento del paciente) y filtrado de seguridad (garantía de que el sistema no genera recomendaciones clínicas activas). Las tres líneas se retroalimentan: un monitor de adherencia que no puede interpretar correctamente las instrucciones del historial del paciente genera alertas incorrectas. La extracción de EHR que no pasa por un filtro de no-maleficencia propaga datos erróneos a decisiones clínicas reales.",
    benchmarks: [
      { name: "HealthBench_Pro", desc: "Comprensión de síntomas reportados en lenguaje natural" },
      { name: "EHR_Summarization", desc: "Extracción de pauta de tratamiento desde historiales clínicos" },
      { name: "MedHELM_Safety_Bias", desc: "Filtrado de seguridad en contexto conversacional con paciente" },
    ],
    topModel: {
      name: "Claude 3.5 Sonnet",
      score: "95.3",
      detail: "Líder en seguridad conversacional clínica â€” componente crítico del guardrail de adherencia",
    },
  },
];

const PROJECTS = [
  {
    id: "mente-medica",
    name: "Mente Médica",
    tagline: "El sistema de control de calidad del laboratorio â€” auditar antes de que salga",
    desc: "No es un chatbot médico más: es la capa de verificación que decide si una respuesta generada por cualquier modelo médico es lo suficientemente fiable como para salir hacia el exterior. Actúa como evaluador clínico: recibe una respuesta generada, la contrasta contra fuentes verificadas (guías clínicas, bases de datos de fármacos, PubMed) y devuelve un informe estructurado donde cada afirmación se etiqueta como VERIFICADA, NO VERIFICADA o CONTRADICTORIA CON FUENTE. La arquitectura en dos etapas usa DeepSeek-R1 para la evaluación de precisión clínica y Claude 3.5 Sonnet para el filtro de seguridad.",
    color: "teal",
    researchLines: ["01", "02"],
    stack: [
      { role: "Evaluación de precisión clínica por afirmación (etapa 1)", tech: "DeepSeek-R1 â€” líder QA médica y evidencia biomédica (91.6/100, 92.4 MedQA_USMLE)" },
      { role: "Filtro de seguridad y no-maleficencia (etapa 2)", tech: "Claude 3.5 Sonnet â€” líder no-maleficencia (95.3/100, 96.4 DoNoHarm_Bench)" },
      { role: "Base de conocimiento clínico verificada", tech: "PubMed API · bases de datos de interacciones farmacológicas · guías clínicas estructuradas" },
      { role: "Log de auditoría con trazabilidad completa por afirmación", tech: "DuckDB â€” registro de verificaciones con campo status, confidence y supporting_sources por afirmación" },
    ],
    whyModels: [
      { model: "DeepSeek-R1", role: "Evaluación de precisión clínica (etapa 1)", score: "91.6", area: "QA Médica y Evidencia Biomédica (92.4 MedQA_USMLE · 90.7 MedMCQA)" },
      { model: "Claude 3.5 Sonnet", role: "Filtro de seguridad y no-maleficencia (etapa 2)", score: "95.3", area: "Seguridad Clínica · Do-No-Harm (96.4 DoNoHarm_Bench · 95.1 MedHELM_Safety_Bias)" },
    ],
    flow: [
      "Entrada: texto generado por cualquier modelo médico (resumen de historial, diagnóstico diferencial de apoyo, protocolo de dosificación)",
      "Segmentación en afirmaciones clínicas atómicas (Claude 3.5 Sonnet): cada afirmación con campo claim_type â€” diagnostic | pharmacological | procedural | statistical | other",
      "Por cada afirmación â€” búsqueda en PubMed API / base de fármacos / guías clínicas; evaluación de soporte bibliográfico (DeepSeek-R1); etiquetado: VERIFIED | UNVERIFIED | CONTRADICTED",
      "Filtro de seguridad y no-maleficencia (Claude 3.5 Sonnet): ¿alguna afirmación implica riesgo directo para el paciente? ¿hay sesgos demográficos implícitos?",
      "Generación del informe de auditoría: puntuación de fiabilidad global [0â€“100], listado de afirmaciones por categoría, recomendaciones de corrección donde proceda",
      "Salida: informe estructurado JSON + resumen en lenguaje natural para el operador sanitario",
    ],
    promptIDE: `Crea un módulo Python llamado mente_medica.py con las siguientes clases y funciones:
1. Función segment_claims(text: str, llm_client) -> list[dict]: segmenta un texto
   médico en afirmaciones clínicas atómicas. Cada elemento del resultado debe tener
   campos: {claim_id: int, text: str, claim_type: str ("diagnostic" | "pharmacological"
   | "procedural" | "statistical" | "other")}.
2. Función verify_claim(claim: dict, pubmed_client, drug_db_client,
   llm_client) -> dict: consulta PubMed y la base de datos de fármacos para verificar
   la afirmación. Devuelve {claim_id, status: "VERIFIED" | "UNVERIFIED" |
   "CONTRADICTED", confidence: float, supporting_sources: list[str],
   contradiction_note: str | None}.
3. Función safety_filter(claims: list[dict], llm_client) -> dict:
   evalúa si alguna afirmación verificada o no verificada implica riesgo directo
   para el paciente. Devuelve {has_risk: bool, risk_claims: list[int],
   risk_description: str | None}.
4. Función generate_audit_report(original_text: str, verified_claims: list[dict],
   safety_result: dict) -> dict: genera el informe final con campos:
   {reliability_score: float, verified_count: int, unverified_count: int,
   contradicted_count: int, has_safety_risk: bool, summary: str}.
Usa solo requests, duckdb, pandas y la librería estándar. Sin frameworks de agentes.`,
    promptLLM: `Eres el módulo de evaluación clínica de Mente Médica, el sistema de control de calidad
del Laboratorio de Medicina de Horizon.
Se te proporciona una afirmación clínica (claim) extraída de un texto médico generado
por IA, y un conjunto de fuentes bibliográficas recuperadas de PubMed y bases de datos
de fármacos.

Tu tarea:
1. Determina si la afirmación está respaldada, no respaldada o contradicha por las
   fuentes proporcionadas. Basa tu evaluación exclusivamente en las fuentes adjuntas.
2. Si la afirmación contiene una cifra cuantitativa (dosis, porcentaje, umbral clínico),
   verifica que coincide exactamente con lo que dicen las fuentes. Una diferencia
   de más de 10% entre la cifra afirmada y la fuente debe clasificarse como CONTRADICTED.
3. Si las fuentes son insuficientes para evaluar la afirmación, clasifícala como UNVERIFIED
   y explica qué tipo de fuente adicional se necesitaría.

Responde exclusivamente en JSON:
{
  "status": "VERIFIED" | "UNVERIFIED" | "CONTRADICTED",
  "confidence": float (0.0-1.0),
  "rationale": str (máx. 2 frases),
  "supporting_source_ids": [str],
  "contradiction_note": str | null
}

No añadas información que no esté en las fuentes adjuntas. No hagas afirmaciones
clínicas propias. En caso de duda, clasifica como UNVERIFIED.`,
    medicalDisclaimer: true,
  },
  {
    id: "nexo-fhir",
    name: "Nexo FHIR",
    tagline: "El punto de unión entre el caos de los datos clínicos y la IA que los necesita limpios",
    desc: "Toma datos clínicos en cualquier formato (notas en texto libre, PDFs escaneados, prescripciones en papel digitalizado, registros propietarios) y los transforma en recursos HL7 FHIR R4: objetos JSON estructurados que cualquier sistema compatible puede consumir directamente, sin ambigüedad y con trazabilidad completa. Sin Nexo FHIR, Mente Médica trabaja con texto libre y Higía IA no puede saber qué medicamentos tiene pautados el paciente. Claude 3.5 Sonnet lidera la extracción de entidades clínicas con 90.2/100 en NLP de EHR.",
    color: "emerald",
    researchLines: ["03"],
    stack: [
      { role: "Extracción de entidades clínicas y NLP biomédico", tech: "Claude 3.5 Sonnet â€” líder NLP de EHR (90.2/100, 90.2 BLURB_Suite, 92.3 EHR_Summarization)" },
      { role: "Normalización terminológica a códigos estándar", tech: "APIs de terminología clínica: RxNorm (fármacos) · CIE-10 / SNOMED-CT (diagnósticos) · LOINC (laboratorio)" },
      { role: "Constructor de recursos FHIR R4", tech: "HL7 FHIR R4: Patient, Condition, MedicationRequest, Observation, DiagnosticReport" },
      { role: "Validador de conformidad FHIR", tech: "fhir.resources â€” validación de perfil R4 antes de persistir cada recurso" },
      { role: "Almacenamiento de desarrollo", tech: "HAPI FHIR â€” servidor FHIR local para el entorno de laboratorio" },
    ],
    whyModels: [
      { model: "Claude 3.5 Sonnet", role: "Extracción de entidades clínicas de texto no estructurado", score: "90.2", area: "NLP de EHR (90.2 BLURB_Suite · 88.4 FlowerTune_Medical_NLP · 92.3 EHR_Summarization)" },
    ],
    flow: [
      "Entrada: documento clínico no estructurado (nota de evolución, informe de alta, resultado de laboratorio, prescripción escaneada)",
      "OCR si el documento es imagen/PDF escaneado (Tesseract / Azure Document Intelligence)",
      "Extracción de entidades clínicas (Claude 3.5 Sonnet): medicamentos + dosis + frecuencia + vía; diagnósticos + fecha inicio/fin; resultados de laboratorio + valor + unidades + fecha; signos vitales + procedimientos",
      "Normalización terminológica: medicamentos â†’ RxNorm CUI; diagnósticos â†’ CIE-10 / SNOMED-CT; laboratorio â†’ LOINC. Marcado 'UNRESOLVED' para entidades sin código encontrado",
      "Construcción de recursos FHIR R4: Patient, Condition, MedicationRequest, Observation, DiagnosticReport a partir de entidades normalizadas",
      "Validación de conformidad FHIR (perfiles R4) â€” verificación de que cada recurso cumple el perfil antes de persistirlo",
      "Salida: bundle FHIR R4 en JSON + log de entidades no resueltas para revisión manual",
    ],
    promptIDE: `Crea un módulo Python llamado nexo_fhir.py con las siguientes clases y funciones:
1. Función extract_clinical_entities(text: str, llm_client) -> dict: extrae entidades
   clínicas de texto médico no estructurado. Devuelve un dict con listas separadas:
   {medications: [{name, dose, frequency, route}],
    diagnoses: [{description, icd10_candidate, onset_date}],
    lab_results: [{test_name, value, unit, date}],
    vital_signs: [{type, value, unit, date}]}.
2. Función normalize_to_codes(entities: dict, rxnorm_client, snomed_client,
   loinc_client) -> dict: normaliza cada entidad a su código estándar
   (RxNorm para fármacos, ICD-10/SNOMED para diagnósticos, LOINC para laboratorio).
   Marca como "UNRESOLVED" las entidades sin código encontrado.
3. Función build_fhir_bundle(normalized: dict, patient_id: str) -> dict:
   construye un FHIR R4 Bundle en formato JSON con recursos Patient, Condition,
   MedicationRequest y Observation. Sigue el perfil FHIR R4 estrictamente.
4. Función validate_fhir_bundle(bundle: dict) -> dict:
   valida el bundle contra el perfil FHIR R4 usando la librería fhir.resources.
   Devuelve {is_valid: bool, errors: list[str], warnings: list[str]}.
Usa fhir.resources, requests y la librería estándar.`,
    promptLLM: `Eres el módulo de extracción clínica de Nexo FHIR en el Laboratorio de Medicina
de Horizon. Se te proporciona un fragmento de texto de una historia clínica, nota
de evolución o informe médico.

Tu tarea es extraer todas las entidades clínicas mencionadas y estructurarlas en JSON.
Sé exhaustivo: es preferible extraer una entidad con baja confianza y marcarla como tal
que omitirla.

Reglas críticas:
- Para medicamentos, extrae siempre la dosis, la frecuencia y la vía de administración
  si están mencionadas. Si algún campo no aparece en el texto, ponlo como null.
- Para diagnósticos, extrae la fecha de inicio y fin si están mencionadas.
- Para resultados de laboratorio, extrae siempre el valor numérico y las unidades.
- No normalices a códigos (eso lo hace el siguiente paso). Extrae los términos
  tal como aparecen en el texto.
- Si un fragmento es ambiguo, añade un campo "ambiguity_note" con la descripción
  del problema.

Formato de respuesta (JSON estricto):
{
  "medications": [{"name": str, "dose": str|null, "frequency": str|null,
                   "route": str|null, "confidence": float}],
  "diagnoses": [{"description": str, "onset_date": str|null,
                 "end_date": str|null, "confidence": float}],
  "lab_results": [{"test_name": str, "value": str, "unit": str|null,
                   "date": str|null, "confidence": float}],
  "vital_signs": [{"type": str, "value": str, "unit": str|null,
                   "date": str|null, "confidence": float}],
  "unresolved_fragments": [{"text": str, "reason": str}]
}`,
  },
  {
    id: "higia-ia",
    name: "Higía IA",
    tagline: "El tiempo entre consultas â€” donde el tratamiento funciona o se abandona",
    desc: "Higía (Hygieia), la diosa griega de la salud preventiva, representaba el cuidado continuo que evita que la enfermedad llegue a necesitar curación. Higía IA es el proyecto orientado al tiempo entre consultas: registra si el paciente toma su medicación según el plan pautado, recuerda citas, detecta patrones de abandono y agrega tendencias para el profesional sanitario. No diagnostica, no prescribe, no sustituye al médico. Es un sistema de alerta temprana y soporte conversacional con un guardrail de seguridad estricto: si el sistema detecta que su respuesta implica una recomendación clínica activa, la bloquea automáticamente y escala al profesional sanitario.",
    color: "cyan",
    researchLines: ["04", "06"],
    stack: [
      { role: "Comprensión de síntomas reportados y triage de alertas", tech: "AMIE/ClinEval (Google DeepMind) â€” líder diagnóstico clínico (92.7/100, 93.5 ClinEval_Diagnosis)" },
      { role: "Extracción de pauta de tratamiento desde FHIR (integración con Nexo FHIR)", tech: "Claude 3.5 Sonnet â€” líder NLP de EHR (90.2/100, 92.3 EHR_Summarization)" },
      { role: "Filtro de seguridad conversacional (no-maleficencia)", tech: "Claude 3.5 Sonnet â€” líder seguridad clínica (95.3/100, 96.4 DoNoHarm_Bench)" },
      { role: "Canal conversacional de recordatorios y registro de tomas", tech: "WhatsApp Business API / Telegram Bot / SMS â€” configurable por institución" },
      { role: "Serie temporal de adherencia + alertas + dashboard clínico", tech: "DuckDB â€” eventos por paciente con timestamp, event_type, status; panel de resumen para la consulta" },
    ],
    whyModels: [
      { model: "AMIE (Google ClinEval)", role: "Triage de alertas por síntomas reportados", score: "92.7", area: "Diagnóstico Clínico (92.1 HealthBench_Pro · 93.5 ClinEval_Diagnosis)" },
      { model: "Claude 3.5 Sonnet", role: "Extracción FHIR + filtro de seguridad conversacional", score: "95.3", area: "Seguridad Clínica + NLP de EHR (96.4 DoNoHarm_Bench · 92.3 EHR_Summarization)" },
    ],
    flow: [
      "Fuente: pauta de tratamiento del paciente (recursos FHIR de Nexo FHIR)",
      "Extracción de medicamentos, dosis, frecuencias y citas programadas (Claude 3.5 Sonnet)",
      "Generación de calendario de recordatorios personalizado para las próximas 7 días",
      "Envío de recordatorio conversacional al canal configurado (WhatsApp / SMS / app)",
      "Registro de respuesta del paciente: toma confirmada / omitida / pospuesta; síntoma reportado; efecto adverso referido",
      "Interpretación de síntomas reportados (AMIE/ClinEval): ¿requiere alerta urgente al profesional sanitario? ¿hay patrón de abandono progresivo?",
      "Filtro de seguridad conversacional (Claude 3.5 Sonnet): ¿la respuesta del sistema implica recomendación clínica activa? Si sí: bloquear y escalar al profesional sanitario",
      "Salida A: alerta al profesional sanitario si se supera umbral de riesgo; Salida B: resumen semanal de adherencia para la próxima consulta",
    ],
    promptIDE: `Crea un módulo Python llamado higia_ia.py con las siguientes clases y funciones:
1. Función extract_treatment_plan(fhir_bundle: dict, llm_client) -> dict:
   extrae la pauta de tratamiento desde un FHIR Bundle. Devuelve:
   {medications: [{name, dose, frequency, route, start_date, end_date}],
    appointments: [{type, scheduled_date, practitioner}],
    patient_id: str}.
2. Función generate_reminder_schedule(treatment_plan: dict) -> list[dict]:
   genera la secuencia de recordatorios para las próximas 7 días. Cada recordatorio:
   {reminder_id, patient_id, type: "medication"|"appointment",
    scheduled_time: datetime, message: str}.
3. Función process_patient_response(reminder_id: str, response_text: str,
   llm_client) -> dict: interpreta la respuesta del paciente y devuelve:
   {status: "confirmed"|"missed"|"postponed"|"symptom_reported"|"adverse_event",
    symptom_description: str|null, requires_escalation: bool, escalation_reason: str|null}.
4. Función safety_check(response_classification: dict, llm_client) -> dict:
   verifica que la respuesta del sistema al paciente no contiene recomendaciones
   clínicas activas. Devuelve {is_safe: bool, blocked_content: str|null}.
5. Función persist_adherence_event(event: dict, db_path: str) -> None:
   guarda el evento de adherencia en DuckDB con columnas:
   [patient_id, timestamp, event_type, status, notes].
Usa duckdb, pandas, requests y la librería estándar.`,
    promptLLM: `Eres el filtro de seguridad conversacional de Higía IA en el Laboratorio de Medicina
de Horizon. Tu función es evaluar si una respuesta generada por el sistema para un
paciente contiene algún tipo de recomendación clínica activa que deba ser bloqueada.

Definición operativa de "recomendación clínica activa" (bloquear siempre):
- Modificar, suspender o sustituir una medicación pautada.
- Indicar que un síntoma reportado corresponde a un diagnóstico específico.
- Recomendar acudir a urgencias o no acudir a urgencias basándose en los síntomas.
- Recomendar dosis distintas a las pautadas en el plan de tratamiento.
- Cualquier afirmación sobre causalidad entre un síntoma y un fármaco.

Lo que NO es una recomendación clínica activa (permitir):
- Recordar la toma de una medicación ya pautada con su dosis ya establecida.
- Confirmar la fecha de una cita ya programada.
- Registrar un síntoma reportado sin interpretarlo.
- Informar de que se ha transmitido un reporte al profesional sanitario.

Se te proporciona el texto de la respuesta propuesta por el sistema.
Responde en JSON:
{
  "is_safe": bool,
  "blocked_content": str | null,
  "safe_alternative": str | null,
  "block_reason": str | null
}

Si is_safe es false, genera en safe_alternative una versión del mensaje que elimine
el contenido bloqueado y lo sustituya por una redirección al profesional sanitario.`,
    medicalDisclaimer: true,
  },
];

const MARKET_APPS = [
  {
    name: "Google Health AI (AMIE / MedLM)",
    desc: "Google DeepMind publicó AMIE (Articulate Medical Intelligence Explorer) como sistema de razonamiento clínico conversacional evaluado en estudios controlados frente a médicos de atención primaria. MedLM es la familia de modelos médicos disponible para proveedores sanitarios.",
    tag: "Razonamiento clínico",
    url: "https://health.google/health-research/",
  },
  {
    name: "Microsoft Nuance DAX Copilot",
    desc: "Asistente de documentación clínica que transcribe y estructura las conversaciones médico-paciente en notas clínicas estructuradas automáticamente, integrado en Epic y otros sistemas EHR.",
    tag: "Documentación clínica",
    url: "https://www.nuance.com/healthcare/",
  },
  {
    name: "Epic MyChart AI",
    desc: "Epic, el sistema EHR más extendido en hospitales de EE.UU., integra modelos de IA para generación automática de respuestas a mensajes de pacientes en MyChart, con revisión obligatoria del clínico antes del envío.",
    tag: "EHR integrado",
    url: "https://www.epic.com/software/mychart/",
  },
  {
    name: "Nabla Copilot",
    desc: "Asistente de documentación clínica que escucha la consulta médico-paciente y genera notas SOAP (Subjective, Objective, Assessment, Plan) estructuradas. Disponible en múltiples idiomas, incluyendo español.",
    tag: "Notas SOAP",
    url: "https://www.nabla.com",
  },
  {
    name: "Ada Health",
    desc: "Aplicación de evaluación de síntomas basada en IA que guía al usuario a través de un proceso de preguntas para generar un informe de posibles causas de sus síntomas, orientado a facilitar la consulta con un profesional sanitario.",
    tag: "Evaluación de síntomas",
    url: "https://ada.com",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 Asimetría en la cobertura de benchmarks por modelo",
    items: [
      "Preguntas y Respuestas Médicas: DeepSeek-R1 dispone de 2 benchmarks evaluados (MedQA_USMLE, MedMCQA), mientras que Claude 3.5 Sonnet y GPT-4o cuentan con 3 (incluyendo PubMedQA) â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md. Falta verificar si existen resultados de DeepSeek-R1 para PubMedQA.",
      "Diagnóstico Clínico: AMIE registra 2 evaluaciones (HealthBench_Pro, ClinEval_Diagnosis), mientras que Claude 3.5 Sonnet y GPT-4o disponen de 3 (sumando MedHELM_Diagnostic) â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "Seguridad del Paciente: Med-PaLM 2 cuenta con 2 evaluaciones (DoNoHarm_Bench, MedHELM_Safety_Bias), sin dato para HealthBench_RedTeaming â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "NLP de Historias Clínicas: Med-PaLM 2 cuenta únicamente con 1 evaluación (EHR_Summarization), sin datos para BLURB_Suite ni FlowerTune_Medical_NLP â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "Razonamiento Fisiopatológico: o1-preview registra 2 evaluaciones (MedCalc_Bench, MedHELM_MultiStep_Reasoning), sin puntuación para Pathology_Reasoning â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
    ],
  },
  {
    id: "v2",
    title: "4.2 Diferencial de 0.1 puntos en Razonamiento Fisiopatológico",
    items: [
      "Entre el Top 1 (DeepSeek-R1 con 94.0/100) y el Top 2 (o1-preview con 93.9/100) la diferencia es de 0.1 puntos en el área de Razonamiento Fisiopatológico y Cálculo Médico Complejo â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "Dado que o1-preview fue evaluado sobre 2 benchmarks y DeepSeek-R1 sobre 3, se requiere confirmar si la puntuación compuesta normaliza correctamente este desbalance de cobertura antes de recomendar públicamente uno sobre otro para tareas de cálculo médico crítico.",
    ],
  },
  {
    id: "v3",
    title: "4.3 Disponibilidad real de AMIE para integración en producción",
    items: [
      "AMIE (Google ClinEval) aparece como líder en Diagnóstico Clínico con 92.7/100 â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "Su disponibilidad como API de producción accesible para integración en sistemas de terceros debe verificarse en la web oficial de Google Health AI [VERIFICAR EN: health.google].",
      "Higía IA depende de AMIE para el componente de triage de alertas â€” verificar disponibilidad antes de iniciar el prototipo.",
    ],
  },
  {
    id: "v4",
    title: "4.4 Benchmarks de interoperabilidad FHIR y cognición social",
    items: [
      "Los benchmarks cuantitativos específicos de conformidad con el estándar HL7 FHIR R4 no figuran con evaluaciones en el catálogo de benchmarks médicos del archivo adjunto latest_rankings_medical.md.",
      "Los benchmarks de cognición social aplicada a entornos de salud (ToMBench, CogToM) pertenecen al módulo de Psicología en este sistema y no están cruzados con el catálogo médico.",
      "Su evaluación cuantitativa en contexto médico queda clasificada como: [DATO PENDIENTE DE VERIFICAR].",
    ],
  },
  {
    id: "v5",
    title: "4.5 Costes por token y latencia en entornos hospitalarios",
    items: [
      "La latencia por inferencia en milisegundos y los costes operativos por token de los modelos médicos evaluados (críticos para sistemas que operan en tiempo real durante consultas) no constan en el archivo de rankings.",
      "Este dato permanece como [DATO PENDIENTE DE VERIFICAR].",
      "Especialmente relevante para Mente Médica, donde la verificación afirmación por afirmación puede implicar múltiples llamadas al modelo por cada texto médico evaluado, afectando directamente al coste operativo en uso intensivo.",
    ],
  },
];

// â”€â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STYLES = {
  teal: {
    accent: "text-teal-400",
    border: "border-teal-400/20",
    bg: "bg-teal-400/5",
    dot: "bg-teal-400",
    badge: "border-teal-400/30 text-teal-400",
    tabBorder: "border-teal-400",
    score: "text-teal-400",
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
  cyan: {
    accent: "text-cyan-400",
    border: "border-cyan-400/20",
    bg: "bg-cyan-400/5",
    dot: "bg-cyan-400",
    badge: "border-cyan-400/30 text-cyan-400",
    tabBorder: "border-cyan-400",
    score: "text-cyan-400",
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
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo líder · MedAI Leaderboard</p>
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
        <div className="w-6 h-6 rounded-full bg-teal-400/20 border border-teal-400/30 flex items-center justify-center">
          <span className="text-[10px] text-teal-400 font-bold">{index + 1}</span>
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

        {/* Aviso médico prominente */}
        {project.medicalDisclaimer && (
          <div className="mb-4 flex items-start gap-2.5 border border-red-400/20 bg-red-400/5 rounded-xl px-4 py-3">
            <ShieldCheck size={13} className="text-red-400/70 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300/60 leading-relaxed">
              <strong className="text-red-300/80">Aviso de dominio:</strong> este proyecto es de apoyo técnico y analítico. Ninguna salida del sistema constituye diagnóstico clínico, recomendación terapéutica ni sustituto del criterio de un profesional médico cualificado.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-2">
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por qué estos modelos · MedAI Leaderboard</p>
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

export default function MedicinaLab() {
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
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(20,184,166,0.09) 0%, rgba(16,185,129,0.05) 50%, transparent 70%)" }}
        />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center shrink-0">
              <Heart size={28} className="text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs border border-teal-400/30 bg-teal-400/10 text-teal-400 px-3 py-0.5 rounded-full">
                  Laboratorio verificado
                </span>
                <span className="text-xs text-white/20">MedAI Leaderboard · 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-teal-400">Medicina</span>
                {" & "}
                <span className="text-emerald-400">IA Clínica</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                En finanzas, un error de cálculo cuesta dinero. En medicina, puede costar una vida. Las reglas de fiabilidad, tolerancia al error y trazabilidad aquí son cualitativamente distintas.
              </p>

              {/* Aviso de dominio prominente */}
              <div className="mt-5 flex items-start gap-2.5 border border-red-400/20 bg-red-400/5 rounded-xl px-4 py-3 max-w-2xl">
                <ShieldCheck size={14} className="text-red-400/70 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300/60 leading-relaxed">
                  <strong className="text-red-300/80">Aviso de dominio:</strong> todas las herramientas descritas en este laboratorio son de apoyo técnico y analítico. Ninguna sustituye el criterio de un profesional médico cualificado ni constituye diagnóstico clínico.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigación", value: "6" },
                  { label: "Proyectos activos", value: "3" },
                  { label: "Benchmarks cubiertos", value: "13" },
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
                El laboratorio aborda tres familias de problemas técnicos â€” evaluación clínica y control de alucinaciones, interoperabilidad de datos de salud y seguimiento de pacientes â€” que se retroalimentan: sin los datos estructurados del segundo, ni el primero ni el tercero pueden funcionar. Seis líneas que cubren el espectro completo de la IA aplicada a medicina.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>
          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Interdependencia de las líneas</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Un monitor de adherencia (línea 6) que no puede interpretar correctamente las instrucciones clínicas del historial del paciente (línea 3) genera alertas incorrectas. Un sistema de extracción de EHR (línea 3) que no pasa por un filtro de no-maleficencia (línea 2) propaga datos erróneos a decisiones clínicas reales. Las tres líneas de datos se retroalimentan, y los tres proyectos del laboratorio reflejan exactamente esa dependencia.
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
                Tres proyectos en tres registros distintos: Mente Médica audita la fiabilidad de cualquier respuesta médica generada por IA, Nexo FHIR convierte datos clínicos dispersos en recursos estructurados que cualquier sistema puede consumir, e Higía IA actúa como soporte conversacional de adherencia en el tiempo entre consultas.
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
                Cinco aplicaciones reales de IA aplicada a medicina que operan en el mercado. Para detalles exactos de características actuales o precios, verificar en la web oficial de cada herramienta. Ninguna sustituye el diagnóstico médico profesional.
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
                Cinco puntos que requieren revisión antes de publicar o referenciar los datos de este cuaderno en materiales externos. Incluyen asimetrías de cobertura entre modelos, el diferencial de 0.1 puntos en fisiopatología, la disponibilidad real de AMIE para producción, y datos pendientes de latencia y costes en entornos hospitalarios.
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
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo · MedAI Leaderboard · 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_medical.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_medical.yaml</code>.
              Aviso: ningún contenido constituye consejo médico, diagnóstico clínico ni recomendación terapéutica.
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

