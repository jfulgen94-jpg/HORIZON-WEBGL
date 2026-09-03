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
    title: "EvaluaciÃ³n clÃ­nica y control de alucinaciones en modelos mÃ©dicos",
    color: "teal",
    summary:
      "Superar el examen de especialidad mÃ©dica estadounidense (USMLE) no garantiza que las respuestas en producciÃ³n sean seguras. El razonamiento mÃ©dico real requiere manejar incertidumbre, contradicciÃ³n entre fuentes y casos atÃ­picos. La diferencia entre Â«saber medicinaÂ» y Â«razonar correctamente cuando el caso es ambiguoÂ» es la que este Ã¡rea mide.",
    detail:
      "MedQA_USMLE y MedMCQA miden conocimiento mÃ©dico clÃ­nico estructurado. HealthBench_Pro y ClinEval_Diagnosis miden el razonamiento ante casos ambiguos en producciÃ³n. El segundo componente de esta Ã¡rea es la no-maleficencia (Do-No-Harm): el principio Ã©tico que obliga al sistema a rechazar activamente recomendaciones peligrosas â€” dosis letales, contraindicaciones ignoradas, sesgos demogrÃ¡ficos en el diagnÃ³stico. DoNoHarm_Bench, MedHELM_Safety_Bias y HealthBench_RedTeaming miden esta capacidad de rechazo.",
    benchmarks: [
      { name: "MedQA_USMLE", desc: "Conocimiento mÃ©dico clÃ­nico â€” estÃ¡ndar USMLE de especialidad" },
      { name: "MedMCQA", desc: "Preguntas de opciÃ³n mÃºltiple de medicina clÃ­nica estructurada" },
      { name: "HealthBench_Pro", desc: "Razonamiento ante casos ambiguos y complejos en producciÃ³n" },
      { name: "ClinEval_Diagnosis", desc: "EvaluaciÃ³n de razonamiento diagnÃ³stico en casos atÃ­picos" },
    ],
    topModel: {
      name: "DeepSeek-R1",
      score: "91.6",
      detail: "92.4 MedQA_USMLE Â· 90.7 MedMCQA â€” lÃ­der en QA mÃ©dica y evidencia biomÃ©dica",
    },
  },
  {
    id: "do-no-harm",
    number: "02",
    title: "Seguridad clÃ­nica y no-maleficencia (Do-No-Harm)",
    color: "emerald",
    summary:
      "Do-No-Harm es el primer principio de la Ã©tica mÃ©dica: la obligaciÃ³n de no causar daÃ±o. Aplicado a modelos de IA significa que el sistema debe rechazar activamente recomendaciones peligrosas y detectar sesgos demogrÃ¡ficos que afectan el diagnÃ³stico.",
    detail:
      "DoNoHarm_Bench mide la capacidad del modelo de rechazar recomendaciones con riesgo directo para el paciente. MedHELM_Safety_Bias evalÃºa sesgos demogrÃ¡ficos implÃ­citos que afectan la calidad del diagnÃ³stico. HealthBench_RedTeaming mide la robustez del modelo ante intentos de extraer contenido mÃ©dico peligroso mediante tÃ©cnicas de jailbreak. Claude 3.5 Sonnet lidera con 95.3/100 compuesto, registrando 96.4 en DoNoHarm_Bench â€” la puntuaciÃ³n mÃ¡s alta de cualquier modelo en cualquier Ã¡rea mÃ©dica evaluada.",
    benchmarks: [
      { name: "DoNoHarm_Bench", desc: "Rechazo de recomendaciones con riesgo directo para el paciente" },
      { name: "MedHELM_Safety_Bias", desc: "DetecciÃ³n de sesgos demogrÃ¡ficos en diagnÃ³stico" },
      { name: "HealthBench_RedTeaming", desc: "Robustez ante extracciÃ³n de contenido mÃ©dico peligroso" },
    ],
    topModel: {
      name: "Claude 3.5 Sonnet",
      score: "95.3",
      detail: "96.4 DoNoHarm_Bench Â· 95.1 MedHELM_Safety_Bias Â· 94.0 HealthBench_RedTeaming",
    },
  },
  {
    id: "ehr-nlp",
    number: "03",
    title: "Interoperabilidad de datos de salud y estructuraciÃ³n de EHR",
    color: "cyan",
    summary:
      "Las historias clÃ­nicas electrÃ³nicas (EHR: Electronic Health Records) son el repositorio central de un paciente, pero cada sistema hospitalario las almacena de forma diferente. Convertir notas mÃ©dicas en texto libre al estÃ¡ndar HL7 FHIR es un problema de NLP especializado â€” el punto de uniÃ³n entre el caos de los datos clÃ­nicos reales y las aplicaciones de IA que necesitan datos limpios.",
    detail:
      "BLURB_Suite (Biomedical Language Understanding and Reasoning Benchmark) mide NLP biomÃ©dico en tareas como extracciÃ³n de entidades clÃ­nicas, normalizaciÃ³n de nombres de fÃ¡rmacos y relaciÃ³n entre entidades. FlowerTune_Medical_NLP evalÃºa el ajuste de modelos a vocabulario clÃ­nico especializado. EHR_Summarization mide la capacidad de resumir historiales completos manteniendo la fidelidad clÃ­nica. Claude 3.5 Sonnet lidera con 90.2/100 compuesto.",
    benchmarks: [
      { name: "BLURB_Suite", desc: "NLP biomÃ©dico: extracciÃ³n de entidades, normalizaciÃ³n de fÃ¡rmacos, relaciones" },
      { name: "FlowerTune_Medical_NLP", desc: "Ajuste a vocabulario clÃ­nico especializado" },
      { name: "EHR_Summarization", desc: "Resumen fiel de historiales clÃ­nicos completos" },
    ],
    topModel: {
      name: "Claude 3.5 Sonnet",
      score: "90.2",
      detail: "90.2 BLURB_Suite Â· 88.4 FlowerTune_Medical_NLP Â· 92.3 EHR_Summarization",
    },
  },
  {
    id: "diagnosis",
    number: "04",
    title: "DiagnÃ³stico clÃ­nico y toma de decisiones en triage",
    color: "teal",
    summary:
      "El diagnÃ³stico diferencial â€” generar y ordenar una lista de posibles causas para los sÃ­ntomas de un paciente â€” es una de las tareas mÃ¡s complejas de la prÃ¡ctica mÃ©dica. Requiere integrar informaciÃ³n parcial, manejar sÃ­ntomas comunes a mÃºltiples patologÃ­as y priorizar correctamente segÃºn el riesgo para el paciente.",
    detail:
      "HealthBench_Pro evalÃºa el razonamiento clÃ­nico ante casos complejos con mÃºltiples diagnÃ³sticos posibles. ClinEval_Diagnosis mide especÃ­ficamente la calidad del diagnÃ³stico diferencial y la toma de decisiones en triage. AMIE (Articulate Medical Intelligence Explorer) de Google DeepMind fue evaluado en estudios controlados frente a mÃ©dicos de atenciÃ³n primaria. Lidera con 92.7/100 compuesto, registrando 93.5 en ClinEval_Diagnosis.",
    benchmarks: [
      { name: "HealthBench_Pro", desc: "Razonamiento clÃ­nico ante casos con mÃºltiples diagnÃ³sticos posibles" },
      { name: "ClinEval_Diagnosis", desc: "DiagnÃ³stico diferencial y toma de decisiones en triage" },
    ],
    topModel: {
      name: "AMIE (Google ClinEval)",
      score: "92.7",
      detail: "92.1 HealthBench_Pro Â· 93.5 ClinEval_Diagnosis â€” evaluado frente a mÃ©dicos de atenciÃ³n primaria",
    },
    warning: true,
  },
  {
    id: "pathophysiology",
    number: "05",
    title: "Razonamiento fisiopatolÃ³gico y cÃ¡lculo mÃ©dico complejo",
    color: "emerald",
    summary:
      "La fisiopatologÃ­a conecta el mecanismo de enfermedad con la presentaciÃ³n clÃ­nica. MedCalc integra fÃ³rmulas mÃ©dicas complejas (GFR, CHADS2-VASc, MELD, Framingham) con el contexto del paciente. Esta Ã¡rea mide si el modelo puede combinar razonamiento biolÃ³gico y cÃ¡lculo especializado sin errores de precisiÃ³n.",
    detail:
      "MedCalc_Bench evalÃºa el cÃ¡lculo mÃ©dico especializado con fÃ³rmulas clÃ­nicas validadas. MedHELM_MultiStep_Reasoning mide el razonamiento fisiopatolÃ³gico en cadenas de mÃºltiples pasos. Pathology_Reasoning evalÃºa la integraciÃ³n de hallazgos patolÃ³gicos en el razonamiento diagnÃ³stico. DeepSeek-R1 lidera con 94.0/100 compuesto, aunque el diferencial con o1-preview (93.9/100) es de solo 0.1 puntos â€” ver MÃ³dulo 4, punto 4.2.",
    benchmarks: [
      { name: "MedCalc_Bench", desc: "CÃ¡lculo mÃ©dico especializado: GFR, CHADS2-VASc, MELD, Framingham" },
      { name: "MedHELM_MultiStep_Reasoning", desc: "Razonamiento fisiopatolÃ³gico en cadenas de mÃºltiples pasos" },
      { name: "Pathology_Reasoning", desc: "IntegraciÃ³n de hallazgos patolÃ³gicos en razonamiento diagnÃ³stico" },
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
      "La adherencia al tratamiento â€” que el paciente tome la medicaciÃ³n pautada, acuda a las revisiones y siga las indicaciones â€” es uno de los determinantes de salud mÃ¡s subestimados. Esta Ã¡rea investiga si los modelos pueden actuar como capa de soporte conversacional para el seguimiento continuo del paciente entre consultas: no como sustituto del mÃ©dico, sino como sistema de alerta temprana.",
    detail:
      "Esta lÃ­nea combina capacidades de NLP clÃ­nico (interpretaciÃ³n de sÃ­ntomas reportados en lenguaje natural), razonamiento conversacional (mantenimiento del contexto del tratamiento del paciente) y filtrado de seguridad (garantÃ­a de que el sistema no genera recomendaciones clÃ­nicas activas). Las tres lÃ­neas se retroalimentan: un monitor de adherencia que no puede interpretar correctamente las instrucciones del historial del paciente genera alertas incorrectas. La extracciÃ³n de EHR que no pasa por un filtro de no-maleficencia propaga datos errÃ³neos a decisiones clÃ­nicas reales.",
    benchmarks: [
      { name: "HealthBench_Pro", desc: "ComprensiÃ³n de sÃ­ntomas reportados en lenguaje natural" },
      { name: "EHR_Summarization", desc: "ExtracciÃ³n de pauta de tratamiento desde historiales clÃ­nicos" },
      { name: "MedHELM_Safety_Bias", desc: "Filtrado de seguridad en contexto conversacional con paciente" },
    ],
    topModel: {
      name: "Claude 3.5 Sonnet",
      score: "95.3",
      detail: "LÃ­der en seguridad conversacional clÃ­nica â€” componente crÃ­tico del guardrail de adherencia",
    },
  },
];

const PROJECTS = [
  {
    id: "mente-medica",
    name: "Mente MÃ©dica",
    tagline: "El sistema de control de calidad del laboratorio â€” auditar antes de que salga",
    desc: "No es un chatbot mÃ©dico mÃ¡s: es la capa de verificaciÃ³n que decide si una respuesta generada por cualquier modelo mÃ©dico es lo suficientemente fiable como para salir hacia el exterior. ActÃºa como evaluador clÃ­nico: recibe una respuesta generada, la contrasta contra fuentes verificadas (guÃ­as clÃ­nicas, bases de datos de fÃ¡rmacos, PubMed) y devuelve un informe estructurado donde cada afirmaciÃ³n se etiqueta como VERIFICADA, NO VERIFICADA o CONTRADICTORIA CON FUENTE. La arquitectura en dos etapas usa DeepSeek-R1 para la evaluaciÃ³n de precisiÃ³n clÃ­nica y Claude 3.5 Sonnet para el filtro de seguridad.",
    color: "teal",
    researchLines: ["01", "02"],
    stack: [
      { role: "EvaluaciÃ³n de precisiÃ³n clÃ­nica por afirmaciÃ³n (etapa 1)", tech: "DeepSeek-R1 â€” lÃ­der QA mÃ©dica y evidencia biomÃ©dica (91.6/100, 92.4 MedQA_USMLE)" },
      { role: "Filtro de seguridad y no-maleficencia (etapa 2)", tech: "Claude 3.5 Sonnet â€” lÃ­der no-maleficencia (95.3/100, 96.4 DoNoHarm_Bench)" },
      { role: "Base de conocimiento clÃ­nico verificada", tech: "PubMed API Â· bases de datos de interacciones farmacolÃ³gicas Â· guÃ­as clÃ­nicas estructuradas" },
      { role: "Log de auditorÃ­a con trazabilidad completa por afirmaciÃ³n", tech: "DuckDB â€” registro de verificaciones con campo status, confidence y supporting_sources por afirmaciÃ³n" },
    ],
    whyModels: [
      { model: "DeepSeek-R1", role: "EvaluaciÃ³n de precisiÃ³n clÃ­nica (etapa 1)", score: "91.6", area: "QA MÃ©dica y Evidencia BiomÃ©dica (92.4 MedQA_USMLE Â· 90.7 MedMCQA)" },
      { model: "Claude 3.5 Sonnet", role: "Filtro de seguridad y no-maleficencia (etapa 2)", score: "95.3", area: "Seguridad ClÃ­nica Â· Do-No-Harm (96.4 DoNoHarm_Bench Â· 95.1 MedHELM_Safety_Bias)" },
    ],
    flow: [
      "Entrada: texto generado por cualquier modelo mÃ©dico (resumen de historial, diagnÃ³stico diferencial de apoyo, protocolo de dosificaciÃ³n)",
      "SegmentaciÃ³n en afirmaciones clÃ­nicas atÃ³micas (Claude 3.5 Sonnet): cada afirmaciÃ³n con campo claim_type â€” diagnostic | pharmacological | procedural | statistical | other",
      "Por cada afirmaciÃ³n â€” bÃºsqueda en PubMed API / base de fÃ¡rmacos / guÃ­as clÃ­nicas; evaluaciÃ³n de soporte bibliogrÃ¡fico (DeepSeek-R1); etiquetado: VERIFIED | UNVERIFIED | CONTRADICTED",
      "Filtro de seguridad y no-maleficencia (Claude 3.5 Sonnet): Â¿alguna afirmaciÃ³n implica riesgo directo para el paciente? Â¿hay sesgos demogrÃ¡ficos implÃ­citos?",
      "GeneraciÃ³n del informe de auditorÃ­a: puntuaciÃ³n de fiabilidad global [0â€“100], listado de afirmaciones por categorÃ­a, recomendaciones de correcciÃ³n donde proceda",
      "Salida: informe estructurado JSON + resumen en lenguaje natural para el operador sanitario",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado mente_medica.py con las siguientes clases y funciones:
1. FunciÃ³n segment_claims(text: str, llm_client) -> list[dict]: segmenta un texto
   mÃ©dico en afirmaciones clÃ­nicas atÃ³micas. Cada elemento del resultado debe tener
   campos: {claim_id: int, text: str, claim_type: str ("diagnostic" | "pharmacological"
   | "procedural" | "statistical" | "other")}.
2. FunciÃ³n verify_claim(claim: dict, pubmed_client, drug_db_client,
   llm_client) -> dict: consulta PubMed y la base de datos de fÃ¡rmacos para verificar
   la afirmaciÃ³n. Devuelve {claim_id, status: "VERIFIED" | "UNVERIFIED" |
   "CONTRADICTED", confidence: float, supporting_sources: list[str],
   contradiction_note: str | None}.
3. FunciÃ³n safety_filter(claims: list[dict], llm_client) -> dict:
   evalÃºa si alguna afirmaciÃ³n verificada o no verificada implica riesgo directo
   para el paciente. Devuelve {has_risk: bool, risk_claims: list[int],
   risk_description: str | None}.
4. FunciÃ³n generate_audit_report(original_text: str, verified_claims: list[dict],
   safety_result: dict) -> dict: genera el informe final con campos:
   {reliability_score: float, verified_count: int, unverified_count: int,
   contradicted_count: int, has_safety_risk: bool, summary: str}.
Usa solo requests, duckdb, pandas y la librerÃ­a estÃ¡ndar. Sin frameworks de agentes.`,
    promptLLM: `Eres el mÃ³dulo de evaluaciÃ³n clÃ­nica de Mente MÃ©dica, el sistema de control de calidad
del Laboratorio de Medicina de Horizon.
Se te proporciona una afirmaciÃ³n clÃ­nica (claim) extraÃ­da de un texto mÃ©dico generado
por IA, y un conjunto de fuentes bibliogrÃ¡ficas recuperadas de PubMed y bases de datos
de fÃ¡rmacos.

Tu tarea:
1. Determina si la afirmaciÃ³n estÃ¡ respaldada, no respaldada o contradicha por las
   fuentes proporcionadas. Basa tu evaluaciÃ³n exclusivamente en las fuentes adjuntas.
2. Si la afirmaciÃ³n contiene una cifra cuantitativa (dosis, porcentaje, umbral clÃ­nico),
   verifica que coincide exactamente con lo que dicen las fuentes. Una diferencia
   de mÃ¡s de 10% entre la cifra afirmada y la fuente debe clasificarse como CONTRADICTED.
3. Si las fuentes son insuficientes para evaluar la afirmaciÃ³n, clasifÃ­cala como UNVERIFIED
   y explica quÃ© tipo de fuente adicional se necesitarÃ­a.

Responde exclusivamente en JSON:
{
  "status": "VERIFIED" | "UNVERIFIED" | "CONTRADICTED",
  "confidence": float (0.0-1.0),
  "rationale": str (mÃ¡x. 2 frases),
  "supporting_source_ids": [str],
  "contradiction_note": str | null
}

No aÃ±adas informaciÃ³n que no estÃ© en las fuentes adjuntas. No hagas afirmaciones
clÃ­nicas propias. En caso de duda, clasifica como UNVERIFIED.`,
    medicalDisclaimer: true,
  },
  {
    id: "nexo-fhir",
    name: "Nexo FHIR",
    tagline: "El punto de uniÃ³n entre el caos de los datos clÃ­nicos y la IA que los necesita limpios",
    desc: "Toma datos clÃ­nicos en cualquier formato (notas en texto libre, PDFs escaneados, prescripciones en papel digitalizado, registros propietarios) y los transforma en recursos HL7 FHIR R4: objetos JSON estructurados que cualquier sistema compatible puede consumir directamente, sin ambigÃ¼edad y con trazabilidad completa. Sin Nexo FHIR, Mente MÃ©dica trabaja con texto libre y HigÃ­a IA no puede saber quÃ© medicamentos tiene pautados el paciente. Claude 3.5 Sonnet lidera la extracciÃ³n de entidades clÃ­nicas con 90.2/100 en NLP de EHR.",
    color: "emerald",
    researchLines: ["03"],
    stack: [
      { role: "ExtracciÃ³n de entidades clÃ­nicas y NLP biomÃ©dico", tech: "Claude 3.5 Sonnet â€” lÃ­der NLP de EHR (90.2/100, 90.2 BLURB_Suite, 92.3 EHR_Summarization)" },
      { role: "NormalizaciÃ³n terminolÃ³gica a cÃ³digos estÃ¡ndar", tech: "APIs de terminologÃ­a clÃ­nica: RxNorm (fÃ¡rmacos) Â· CIE-10 / SNOMED-CT (diagnÃ³sticos) Â· LOINC (laboratorio)" },
      { role: "Constructor de recursos FHIR R4", tech: "HL7 FHIR R4: Patient, Condition, MedicationRequest, Observation, DiagnosticReport" },
      { role: "Validador de conformidad FHIR", tech: "fhir.resources â€” validaciÃ³n de perfil R4 antes de persistir cada recurso" },
      { role: "Almacenamiento de desarrollo", tech: "HAPI FHIR â€” servidor FHIR local para el entorno de laboratorio" },
    ],
    whyModels: [
      { model: "Claude 3.5 Sonnet", role: "ExtracciÃ³n de entidades clÃ­nicas de texto no estructurado", score: "90.2", area: "NLP de EHR (90.2 BLURB_Suite Â· 88.4 FlowerTune_Medical_NLP Â· 92.3 EHR_Summarization)" },
    ],
    flow: [
      "Entrada: documento clÃ­nico no estructurado (nota de evoluciÃ³n, informe de alta, resultado de laboratorio, prescripciÃ³n escaneada)",
      "OCR si el documento es imagen/PDF escaneado (Tesseract / Azure Document Intelligence)",
      "ExtracciÃ³n de entidades clÃ­nicas (Claude 3.5 Sonnet): medicamentos + dosis + frecuencia + vÃ­a; diagnÃ³sticos + fecha inicio/fin; resultados de laboratorio + valor + unidades + fecha; signos vitales + procedimientos",
      "NormalizaciÃ³n terminolÃ³gica: medicamentos â†’ RxNorm CUI; diagnÃ³sticos â†’ CIE-10 / SNOMED-CT; laboratorio â†’ LOINC. Marcado 'UNRESOLVED' para entidades sin cÃ³digo encontrado",
      "ConstrucciÃ³n de recursos FHIR R4: Patient, Condition, MedicationRequest, Observation, DiagnosticReport a partir de entidades normalizadas",
      "ValidaciÃ³n de conformidad FHIR (perfiles R4) â€” verificaciÃ³n de que cada recurso cumple el perfil antes de persistirlo",
      "Salida: bundle FHIR R4 en JSON + log de entidades no resueltas para revisiÃ³n manual",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado nexo_fhir.py con las siguientes clases y funciones:
1. FunciÃ³n extract_clinical_entities(text: str, llm_client) -> dict: extrae entidades
   clÃ­nicas de texto mÃ©dico no estructurado. Devuelve un dict con listas separadas:
   {medications: [{name, dose, frequency, route}],
    diagnoses: [{description, icd10_candidate, onset_date}],
    lab_results: [{test_name, value, unit, date}],
    vital_signs: [{type, value, unit, date}]}.
2. FunciÃ³n normalize_to_codes(entities: dict, rxnorm_client, snomed_client,
   loinc_client) -> dict: normaliza cada entidad a su cÃ³digo estÃ¡ndar
   (RxNorm para fÃ¡rmacos, ICD-10/SNOMED para diagnÃ³sticos, LOINC para laboratorio).
   Marca como "UNRESOLVED" las entidades sin cÃ³digo encontrado.
3. FunciÃ³n build_fhir_bundle(normalized: dict, patient_id: str) -> dict:
   construye un FHIR R4 Bundle en formato JSON con recursos Patient, Condition,
   MedicationRequest y Observation. Sigue el perfil FHIR R4 estrictamente.
4. FunciÃ³n validate_fhir_bundle(bundle: dict) -> dict:
   valida el bundle contra el perfil FHIR R4 usando la librerÃ­a fhir.resources.
   Devuelve {is_valid: bool, errors: list[str], warnings: list[str]}.
Usa fhir.resources, requests y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el mÃ³dulo de extracciÃ³n clÃ­nica de Nexo FHIR en el Laboratorio de Medicina
de Horizon. Se te proporciona un fragmento de texto de una historia clÃ­nica, nota
de evoluciÃ³n o informe mÃ©dico.

Tu tarea es extraer todas las entidades clÃ­nicas mencionadas y estructurarlas en JSON.
SÃ© exhaustivo: es preferible extraer una entidad con baja confianza y marcarla como tal
que omitirla.

Reglas crÃ­ticas:
- Para medicamentos, extrae siempre la dosis, la frecuencia y la vÃ­a de administraciÃ³n
  si estÃ¡n mencionadas. Si algÃºn campo no aparece en el texto, ponlo como null.
- Para diagnÃ³sticos, extrae la fecha de inicio y fin si estÃ¡n mencionadas.
- Para resultados de laboratorio, extrae siempre el valor numÃ©rico y las unidades.
- No normalices a cÃ³digos (eso lo hace el siguiente paso). Extrae los tÃ©rminos
  tal como aparecen en el texto.
- Si un fragmento es ambiguo, aÃ±ade un campo "ambiguity_note" con la descripciÃ³n
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
    name: "HigÃ­a IA",
    tagline: "El tiempo entre consultas â€” donde el tratamiento funciona o se abandona",
    desc: "HigÃ­a (Hygieia), la diosa griega de la salud preventiva, representaba el cuidado continuo que evita que la enfermedad llegue a necesitar curaciÃ³n. HigÃ­a IA es el proyecto orientado al tiempo entre consultas: registra si el paciente toma su medicaciÃ³n segÃºn el plan pautado, recuerda citas, detecta patrones de abandono y agrega tendencias para el profesional sanitario. No diagnostica, no prescribe, no sustituye al mÃ©dico. Es un sistema de alerta temprana y soporte conversacional con un guardrail de seguridad estricto: si el sistema detecta que su respuesta implica una recomendaciÃ³n clÃ­nica activa, la bloquea automÃ¡ticamente y escala al profesional sanitario.",
    color: "cyan",
    researchLines: ["04", "06"],
    stack: [
      { role: "ComprensiÃ³n de sÃ­ntomas reportados y triage de alertas", tech: "AMIE/ClinEval (Google DeepMind) â€” lÃ­der diagnÃ³stico clÃ­nico (92.7/100, 93.5 ClinEval_Diagnosis)" },
      { role: "ExtracciÃ³n de pauta de tratamiento desde FHIR (integraciÃ³n con Nexo FHIR)", tech: "Claude 3.5 Sonnet â€” lÃ­der NLP de EHR (90.2/100, 92.3 EHR_Summarization)" },
      { role: "Filtro de seguridad conversacional (no-maleficencia)", tech: "Claude 3.5 Sonnet â€” lÃ­der seguridad clÃ­nica (95.3/100, 96.4 DoNoHarm_Bench)" },
      { role: "Canal conversacional de recordatorios y registro de tomas", tech: "WhatsApp Business API / Telegram Bot / SMS â€” configurable por instituciÃ³n" },
      { role: "Serie temporal de adherencia + alertas + dashboard clÃ­nico", tech: "DuckDB â€” eventos por paciente con timestamp, event_type, status; panel de resumen para la consulta" },
    ],
    whyModels: [
      { model: "AMIE (Google ClinEval)", role: "Triage de alertas por sÃ­ntomas reportados", score: "92.7", area: "DiagnÃ³stico ClÃ­nico (92.1 HealthBench_Pro Â· 93.5 ClinEval_Diagnosis)" },
      { model: "Claude 3.5 Sonnet", role: "ExtracciÃ³n FHIR + filtro de seguridad conversacional", score: "95.3", area: "Seguridad ClÃ­nica + NLP de EHR (96.4 DoNoHarm_Bench Â· 92.3 EHR_Summarization)" },
    ],
    flow: [
      "Fuente: pauta de tratamiento del paciente (recursos FHIR de Nexo FHIR)",
      "ExtracciÃ³n de medicamentos, dosis, frecuencias y citas programadas (Claude 3.5 Sonnet)",
      "GeneraciÃ³n de calendario de recordatorios personalizado para las prÃ³ximas 7 dÃ­as",
      "EnvÃ­o de recordatorio conversacional al canal configurado (WhatsApp / SMS / app)",
      "Registro de respuesta del paciente: toma confirmada / omitida / pospuesta; sÃ­ntoma reportado; efecto adverso referido",
      "InterpretaciÃ³n de sÃ­ntomas reportados (AMIE/ClinEval): Â¿requiere alerta urgente al profesional sanitario? Â¿hay patrÃ³n de abandono progresivo?",
      "Filtro de seguridad conversacional (Claude 3.5 Sonnet): Â¿la respuesta del sistema implica recomendaciÃ³n clÃ­nica activa? Si sÃ­: bloquear y escalar al profesional sanitario",
      "Salida A: alerta al profesional sanitario si se supera umbral de riesgo; Salida B: resumen semanal de adherencia para la prÃ³xima consulta",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado higia_ia.py con las siguientes clases y funciones:
1. FunciÃ³n extract_treatment_plan(fhir_bundle: dict, llm_client) -> dict:
   extrae la pauta de tratamiento desde un FHIR Bundle. Devuelve:
   {medications: [{name, dose, frequency, route, start_date, end_date}],
    appointments: [{type, scheduled_date, practitioner}],
    patient_id: str}.
2. FunciÃ³n generate_reminder_schedule(treatment_plan: dict) -> list[dict]:
   genera la secuencia de recordatorios para las prÃ³ximas 7 dÃ­as. Cada recordatorio:
   {reminder_id, patient_id, type: "medication"|"appointment",
    scheduled_time: datetime, message: str}.
3. FunciÃ³n process_patient_response(reminder_id: str, response_text: str,
   llm_client) -> dict: interpreta la respuesta del paciente y devuelve:
   {status: "confirmed"|"missed"|"postponed"|"symptom_reported"|"adverse_event",
    symptom_description: str|null, requires_escalation: bool, escalation_reason: str|null}.
4. FunciÃ³n safety_check(response_classification: dict, llm_client) -> dict:
   verifica que la respuesta del sistema al paciente no contiene recomendaciones
   clÃ­nicas activas. Devuelve {is_safe: bool, blocked_content: str|null}.
5. FunciÃ³n persist_adherence_event(event: dict, db_path: str) -> None:
   guarda el evento de adherencia en DuckDB con columnas:
   [patient_id, timestamp, event_type, status, notes].
Usa duckdb, pandas, requests y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el filtro de seguridad conversacional de HigÃ­a IA en el Laboratorio de Medicina
de Horizon. Tu funciÃ³n es evaluar si una respuesta generada por el sistema para un
paciente contiene algÃºn tipo de recomendaciÃ³n clÃ­nica activa que deba ser bloqueada.

DefiniciÃ³n operativa de "recomendaciÃ³n clÃ­nica activa" (bloquear siempre):
- Modificar, suspender o sustituir una medicaciÃ³n pautada.
- Indicar que un sÃ­ntoma reportado corresponde a un diagnÃ³stico especÃ­fico.
- Recomendar acudir a urgencias o no acudir a urgencias basÃ¡ndose en los sÃ­ntomas.
- Recomendar dosis distintas a las pautadas en el plan de tratamiento.
- Cualquier afirmaciÃ³n sobre causalidad entre un sÃ­ntoma y un fÃ¡rmaco.

Lo que NO es una recomendaciÃ³n clÃ­nica activa (permitir):
- Recordar la toma de una medicaciÃ³n ya pautada con su dosis ya establecida.
- Confirmar la fecha de una cita ya programada.
- Registrar un sÃ­ntoma reportado sin interpretarlo.
- Informar de que se ha transmitido un reporte al profesional sanitario.

Se te proporciona el texto de la respuesta propuesta por el sistema.
Responde en JSON:
{
  "is_safe": bool,
  "blocked_content": str | null,
  "safe_alternative": str | null,
  "block_reason": str | null
}

Si is_safe es false, genera en safe_alternative una versiÃ³n del mensaje que elimine
el contenido bloqueado y lo sustituya por una redirecciÃ³n al profesional sanitario.`,
    medicalDisclaimer: true,
  },
];

const MARKET_APPS = [
  {
    name: "Google Health AI (AMIE / MedLM)",
    desc: "Google DeepMind publicÃ³ AMIE (Articulate Medical Intelligence Explorer) como sistema de razonamiento clÃ­nico conversacional evaluado en estudios controlados frente a mÃ©dicos de atenciÃ³n primaria. MedLM es la familia de modelos mÃ©dicos disponible para proveedores sanitarios.",
    tag: "Razonamiento clÃ­nico",
    url: "https://health.google/health-research/",
  },
  {
    name: "Microsoft Nuance DAX Copilot",
    desc: "Asistente de documentaciÃ³n clÃ­nica que transcribe y estructura las conversaciones mÃ©dico-paciente en notas clÃ­nicas estructuradas automÃ¡ticamente, integrado en Epic y otros sistemas EHR.",
    tag: "DocumentaciÃ³n clÃ­nica",
    url: "https://www.nuance.com/healthcare/",
  },
  {
    name: "Epic MyChart AI",
    desc: "Epic, el sistema EHR mÃ¡s extendido en hospitales de EE.UU., integra modelos de IA para generaciÃ³n automÃ¡tica de respuestas a mensajes de pacientes en MyChart, con revisiÃ³n obligatoria del clÃ­nico antes del envÃ­o.",
    tag: "EHR integrado",
    url: "https://www.epic.com/software/mychart/",
  },
  {
    name: "Nabla Copilot",
    desc: "Asistente de documentaciÃ³n clÃ­nica que escucha la consulta mÃ©dico-paciente y genera notas SOAP (Subjective, Objective, Assessment, Plan) estructuradas. Disponible en mÃºltiples idiomas, incluyendo espaÃ±ol.",
    tag: "Notas SOAP",
    url: "https://www.nabla.com",
  },
  {
    name: "Ada Health",
    desc: "AplicaciÃ³n de evaluaciÃ³n de sÃ­ntomas basada en IA que guÃ­a al usuario a travÃ©s de un proceso de preguntas para generar un informe de posibles causas de sus sÃ­ntomas, orientado a facilitar la consulta con un profesional sanitario.",
    tag: "EvaluaciÃ³n de sÃ­ntomas",
    url: "https://ada.com",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 AsimetrÃ­a en la cobertura de benchmarks por modelo",
    items: [
      "Preguntas y Respuestas MÃ©dicas: DeepSeek-R1 dispone de 2 benchmarks evaluados (MedQA_USMLE, MedMCQA), mientras que Claude 3.5 Sonnet y GPT-4o cuentan con 3 (incluyendo PubMedQA) â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md. Falta verificar si existen resultados de DeepSeek-R1 para PubMedQA.",
      "DiagnÃ³stico ClÃ­nico: AMIE registra 2 evaluaciones (HealthBench_Pro, ClinEval_Diagnosis), mientras que Claude 3.5 Sonnet y GPT-4o disponen de 3 (sumando MedHELM_Diagnostic) â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "Seguridad del Paciente: Med-PaLM 2 cuenta con 2 evaluaciones (DoNoHarm_Bench, MedHELM_Safety_Bias), sin dato para HealthBench_RedTeaming â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "NLP de Historias ClÃ­nicas: Med-PaLM 2 cuenta Ãºnicamente con 1 evaluaciÃ³n (EHR_Summarization), sin datos para BLURB_Suite ni FlowerTune_Medical_NLP â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "Razonamiento FisiopatolÃ³gico: o1-preview registra 2 evaluaciones (MedCalc_Bench, MedHELM_MultiStep_Reasoning), sin puntuaciÃ³n para Pathology_Reasoning â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
    ],
  },
  {
    id: "v2",
    title: "4.2 Diferencial de 0.1 puntos en Razonamiento FisiopatolÃ³gico",
    items: [
      "Entre el Top 1 (DeepSeek-R1 con 94.0/100) y el Top 2 (o1-preview con 93.9/100) la diferencia es de 0.1 puntos en el Ã¡rea de Razonamiento FisiopatolÃ³gico y CÃ¡lculo MÃ©dico Complejo â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "Dado que o1-preview fue evaluado sobre 2 benchmarks y DeepSeek-R1 sobre 3, se requiere confirmar si la puntuaciÃ³n compuesta normaliza correctamente este desbalance de cobertura antes de recomendar pÃºblicamente uno sobre otro para tareas de cÃ¡lculo mÃ©dico crÃ­tico.",
    ],
  },
  {
    id: "v3",
    title: "4.3 Disponibilidad real de AMIE para integraciÃ³n en producciÃ³n",
    items: [
      "AMIE (Google ClinEval) aparece como lÃ­der en DiagnÃ³stico ClÃ­nico con 92.7/100 â€” Fuente: MedAI Leaderboard, latest_rankings_medical.md.",
      "Su disponibilidad como API de producciÃ³n accesible para integraciÃ³n en sistemas de terceros debe verificarse en la web oficial de Google Health AI [VERIFICAR EN: health.google].",
      "HigÃ­a IA depende de AMIE para el componente de triage de alertas â€” verificar disponibilidad antes de iniciar el prototipo.",
    ],
  },
  {
    id: "v4",
    title: "4.4 Benchmarks de interoperabilidad FHIR y cogniciÃ³n social",
    items: [
      "Los benchmarks cuantitativos especÃ­ficos de conformidad con el estÃ¡ndar HL7 FHIR R4 no figuran con evaluaciones en el catÃ¡logo de benchmarks mÃ©dicos del archivo adjunto latest_rankings_medical.md.",
      "Los benchmarks de cogniciÃ³n social aplicada a entornos de salud (ToMBench, CogToM) pertenecen al mÃ³dulo de PsicologÃ­a en este sistema y no estÃ¡n cruzados con el catÃ¡logo mÃ©dico.",
      "Su evaluaciÃ³n cuantitativa en contexto mÃ©dico queda clasificada como: [DATO PENDIENTE DE VERIFICAR].",
    ],
  },
  {
    id: "v5",
    title: "4.5 Costes por token y latencia en entornos hospitalarios",
    items: [
      "La latencia por inferencia en milisegundos y los costes operativos por token de los modelos mÃ©dicos evaluados (crÃ­ticos para sistemas que operan en tiempo real durante consultas) no constan en el archivo de rankings.",
      "Este dato permanece como [DATO PENDIENTE DE VERIFICAR].",
      "Especialmente relevante para Mente MÃ©dica, donde la verificaciÃ³n afirmaciÃ³n por afirmaciÃ³n puede implicar mÃºltiples llamadas al modelo por cada texto mÃ©dico evaluado, afectando directamente al coste operativo en uso intensivo.",
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
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo lÃ­der Â· MedAI Leaderboard</p>
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

        {/* Aviso mÃ©dico prominente */}
        {project.medicalDisclaimer && (
          <div className="mb-4 flex items-start gap-2.5 border border-red-400/20 bg-red-400/5 rounded-xl px-4 py-3">
            <ShieldCheck size={13} className="text-red-400/70 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300/60 leading-relaxed">
              <strong className="text-red-300/80">Aviso de dominio:</strong> este proyecto es de apoyo tÃ©cnico y analÃ­tico. Ninguna salida del sistema constituye diagnÃ³stico clÃ­nico, recomendaciÃ³n terapÃ©utica ni sustituto del criterio de un profesional mÃ©dico cualificado.
            </p>
          </div>
        )}

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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por quÃ© estos modelos Â· MedAI Leaderboard</p>
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
                <span className="text-xs text-white/20">MedAI Leaderboard Â· 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-teal-400">Medicina</span>
                {" & "}
                <span className="text-emerald-400">IA ClÃ­nica</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                En finanzas, un error de cÃ¡lculo cuesta dinero. En medicina, puede costar una vida. Las reglas de fiabilidad, tolerancia al error y trazabilidad aquÃ­ son cualitativamente distintas.
              </p>

              {/* Aviso de dominio prominente */}
              <div className="mt-5 flex items-start gap-2.5 border border-red-400/20 bg-red-400/5 rounded-xl px-4 py-3 max-w-2xl">
                <ShieldCheck size={14} className="text-red-400/70 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300/60 leading-relaxed">
                  <strong className="text-red-300/80">Aviso de dominio:</strong> todas las herramientas descritas en este laboratorio son de apoyo tÃ©cnico y analÃ­tico. Ninguna sustituye el criterio de un profesional mÃ©dico cualificado ni constituye diagnÃ³stico clÃ­nico.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigaciÃ³n", value: "6" },
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
                El laboratorio aborda tres familias de problemas tÃ©cnicos â€” evaluaciÃ³n clÃ­nica y control de alucinaciones, interoperabilidad de datos de salud y seguimiento de pacientes â€” que se retroalimentan: sin los datos estructurados del segundo, ni el primero ni el tercero pueden funcionar. Seis lÃ­neas que cubren el espectro completo de la IA aplicada a medicina.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>
          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Interdependencia de las lÃ­neas</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Un monitor de adherencia (lÃ­nea 6) que no puede interpretar correctamente las instrucciones clÃ­nicas del historial del paciente (lÃ­nea 3) genera alertas incorrectas. Un sistema de extracciÃ³n de EHR (lÃ­nea 3) que no pasa por un filtro de no-maleficencia (lÃ­nea 2) propaga datos errÃ³neos a decisiones clÃ­nicas reales. Las tres lÃ­neas de datos se retroalimentan, y los tres proyectos del laboratorio reflejan exactamente esa dependencia.
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
                Tres proyectos en tres registros distintos: Mente MÃ©dica audita la fiabilidad de cualquier respuesta mÃ©dica generada por IA, Nexo FHIR convierte datos clÃ­nicos dispersos en recursos estructurados que cualquier sistema puede consumir, e HigÃ­a IA actÃºa como soporte conversacional de adherencia en el tiempo entre consultas.
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
                Cinco aplicaciones reales de IA aplicada a medicina que operan en el mercado. Para detalles exactos de caracterÃ­sticas actuales o precios, verificar en la web oficial de cada herramienta. Ninguna sustituye el diagnÃ³stico mÃ©dico profesional.
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
                Cinco puntos que requieren revisiÃ³n antes de publicar o referenciar los datos de este cuaderno en materiales externos. Incluyen asimetrÃ­as de cobertura entre modelos, el diferencial de 0.1 puntos en fisiopatologÃ­a, la disponibilidad real de AMIE para producciÃ³n, y datos pendientes de latencia y costes en entornos hospitalarios.
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
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo Â· MedAI Leaderboard Â· 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_medical.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_medical.yaml</code>.
              Aviso: ningÃºn contenido constituye consejo mÃ©dico, diagnÃ³stico clÃ­nico ni recomendaciÃ³n terapÃ©utica.
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

