import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Download } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { ShieldCheck } from "lucide-react";

// ─── Constantes de datos (Medicina & IA Clínica) ───────────────────────────—€

const PRIMARY_TASKS = [
  {
    id: "M1.1",
    label: "Auditor y Verificador Clínico de Afirmaciones Médicas (Mente Médica)",
    desc: "Segmentación atómica de textos médicos y contraste contra fuentes verificadas (PubMed, bases de interacciones farmacológicas, guías clínicas) con etiquetado VERIFIED/UNVERIFIED/CONTRADICTED.",
    audience: "Comités de calidad asistencial, auditores clínicos, investigadores biomédicos, facultativos.",
  },
  {
    id: "M1.2",
    label: "Pipeline de Extracción e Interoperabilidad HL7 FHIR R4 (Nexo FHIR)",
    desc: "Transformación de texto libre, notas de evolución y recetas escaneadas en recursos JSON conformes a FHIR R4 (Patient, Condition, MedicationRequest, Observation) con codificación CIE-10/SNOMED/RxNorm/LOINC.",
    audience: "Departamentos de informática médica, integradores de EHR/HIS hospitalarios, ingenieros de datos de salud.",
  },
  {
    id: "M1.3",
    label: "Sistema de Soporte de Adherencia y Monitoreo Entre Consultas (Higía IA)",
    desc: "Acompañamiento conversacional continuo para control de tomas farmacológicas, detección de efectos adversos y alertas tempranas, blindado con guardrail de no-maleficencia clínica.",
    audience: "Equipos de enfermería, unidades de crónicos y telemedicina, farmacia hospitalaria.",
  },
  {
    id: "M1.4",
    label: "Motor de Triaje y Soporte al Diagnóstico Diferencial",
    desc: "Clasificación de urgencia y generación jerárquica de hipótesis diagnósticas ordenadas por severidad y probabilidad, integrando síntomas y antecedentes clínicos.",
    audience: "Servicios de urgencias, centros de atención primaria, plataformas de tele-triaje.",
  },
  {
    id: "M1.5",
    label: "Calculadora Médica Especializada y Razonamiento Fisiopatológico",
    desc: "Cálculo computacional exacto de escalas clínicas validadas (GFR, CHADS2-VASc, MELD, Framingham, Apache II) integrado con razonamiento biomédico multicadena.",
    audience: "Especialistas clínicos, unidades de cuidados intensivos, analistas farmacocinéticos.",
  },
  {
    id: "M1.6",
    label: "Analizador y Resumidor Clínico de Historias Electrónicas (EHR)",
    desc: "Generación de resúmenes longitudinales estructurados y notas SOAP a partir de historiales clínicos extensos, preservando la fidelidad temporal y de tratamientos.",
    audience: "Médicos en consulta ambulatoria, servicios de admisión, departamentos de documentación clínica.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-MED-01", label: "Guardrail de Seguridad Do-No-Harm y Rechazo de Contraindicaciones", desc: "Filtro activo que bloquea dosis letales, incompatibilidades farmacológicas y sesgos demográficos de diagnóstico." },
  { id: "SEC-MED-02", label: "Normalizador Terminológico Automatizado (SNOMED / CIE-10 / RxNorm / LOINC)", desc: "Resolución de entidades clínicas extraídas hacia códigos terminológicos estándar con manejo de casos 'UNRESOLVED'." },
  { id: "SEC-MED-03", label: "Conector y Validador de Conformidad FHIR R4 (HAPI FHIR / fhir.resources)", desc: "Validación estricta de esquemas FHIR R4 antes de la persistencia y conectividad con servidores hospitalarios." },
  { id: "SEC-MED-04", label: "Log de Auditoría Inmutable y Trazabilidad por Afirmación en DuckDB", desc: "Registro inmutable de fuentes bibliográficas, confianza del modelo, timestamp y justificación de cada afirmación." },
  { id: "SEC-MED-05", label: "Conector con APIs Bibliográficas Biomédicas (PubMed / NCBI / DrugBank)", desc: "Recuperación dinámica de evidencia científica y fichas técnicas de principios activos en tiempo de ejecución." },
  { id: "SEC-MED-06", label: "Sistema de Alertas Sanitarias Proactivas y Escalado Urgente", desc: "Disparador de notificaciones urgentes a profesionales vía Webhook, Telegram o integración hospitalaria ante síntomas críticos." },
  { id: "SEC-MED-07", label: "Filtro de Seguridad Conversacional Antialucinación y No-Prescripción", desc: "Restricción severa que impide la recomendación clínica activa o modificación terapéutica en diálogos con pacientes." },
  { id: "SEC-MED-08", label: "Exportador de Informes Clínicos Estructurados (PDF / JSON-LD / HL7 CDA)", desc: "Generación de documentos clínicos firmados electrónicamente con metadatos estandarizados para archivo hospitalario." },
];

const CLINICAL_DOMAINS = [
  "Atención Primaria & Medicina Familiar",
  "Urgencias, Emergencias & Triaje Hospitalario",
  "Cardiología & Riesgo Cardiovascular",
  "Oncología & Medicina de Precisión",
  "Farmacología Clínica & Gestión de Medicación",
  "Neurología, Salud Mental & Psicometría",
  "Endocrinología & Manejo de Patologías Crónicas",
];

const INPUT_DOCUMENTS = [
  "Texto libre médico / Notas de evolución y evolución clínica",
  "Informes de alta hospitalaria y epicrisis",
  "Prescripciones médicas y recetas farmacológicas digitalizadas (OCR)",
  "Resultados analíticos de laboratorio (paneles bioquímicos / hematología)",
  "Historias clínicas electrónicas completas (Bundles FHIR / HL7 CDA)",
  "Guías de práctica clínica y literatura biomédica (PubMed / Cochrane)",
];

const CLINICAL_METRICS = [
  { id: "accuracy_usmle", label: "Precisión Clínica (MedQA / USMLE)", cat: "Precisión & QA Biomédica", desc: "Puntuación porcentual en bancos de conocimiento clínico estructurado y especialidades." },
  { id: "hallucination_rate", label: "Tasa de Alucinación por Afirmación", cat: "Precisión & QA Biomédica", desc: "Porcentaje de afirmaciones no respaldadas o contradictorias respecto a las fuentes biomédicas." },
  { id: "donoharm_score", label: "Índice de No-Maleficencia (DoNoHarm_Bench)", cat: "Seguridad & Ã‰tica Clínica", desc: "Capacidad del sistema para rechazar activamente recomendaciones peligrosas o contraindicaciones." },
  { id: "bias_detection", label: "Detección de Sesgo Demográfico (MedHELM)", cat: "Seguridad & Ã‰tica Clínica", desc: "Medición de equidad diagnóstica frente a subgrupos poblacionales y variables sociodemográficas." },
  { id: "fhir_conformity", label: "Conformidad Estricta FHIR R4", cat: "Interoperabilidad & NLP", desc: "Porcentaje de recursos generados que superan la validación sintáctica y semántica de perfil HL7 FHIR." },
  { id: "ner_f1", label: "F1-Score en Extracción de Entidades Clínicas (BLURB)", cat: "Interoperabilidad & NLP", desc: "Precisión y exhaustividad en extracción de fármacos, dosis, diagnósticos y parámetros de laboratorio." },
  { id: "snomed_coverage", label: "Cobertura de Codificación SNOMED/RxNorm", cat: "Interoperabilidad & NLP", desc: "Ratio de términos clínicos mapeados con éxito a códigos estándar oficiales sin ambigüedad." },
  { id: "triage_sensitivity", label: "Sensibilidad de Triaje y Riesgo Vital", cat: "Triaje & Diagnóstico", desc: "Capacidad de identificar correctamente casos de alta prioridad clínica sin falsos negativos de gravedad." },
  { id: "calc_precision", label: "Precisión en Cálculo Fisiopatológico (MedCalc)", cat: "Triaje & Diagnóstico", desc: "Exactitud matemática en fórmulas médicas complejas (GFR, CHADS2, MELD) con tolerancia cero a errores." },
];

const VALIDATION_MODELS = [
  "Arquitectura de Doble Etapa (Razonamiento Clínico DeepSeek-R1 + Filtro Do-No-Harm Claude 3.5 Sonnet)",
  "Verificación Afirmación por Afirmación con PubMed API y Base de Fármacos",
  "Validación Sintáctica y Semántica de Perfiles FHIR R4 (fhir.resources)",
  "Pipeline de Triaje Supervisado con Umbral de Escalado Automático",
];

const SAFETY_GUARDRAILS = [
  "Aislamiento Estricto de Recomendación Clínica Activa (Guardrail Anti-Prescripción)",
  "Rechazo Automático de Dosis Tóxicas y Cruces de Alergias Conocidas",
  "Filtro de Desescalado y Derivación Obligatoria a Recursos Profesionales",
  "Cláusula Inmutable de Descargo Médico en Toda Salida de Texto",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard médico interactivo y prototipado rápido en local)",
  "FastAPI + React / Next.js (Portal clínico profesional con autenticación y perfiles de rol)",
  "Flet (Aplicación de escritorio local .exe para consultas y estaciones médicas aisladas)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (Almacén analítico columnar inmutable para auditoría clínica)",
  "Servidor HAPI FHIR Local + Base de Datos FHIR R4",
  "SQLite + SQLAlchemy con Cifrado Local de Datos Sanitarios",
  "PostgreSQL / TimescaleDB con Esquemas JSONB de Historia Clínica",
];

// ─── Helpers ───────────────────────────────────────────────────────────────—€

function getAutoMetrics(primaryId, secondaryIds) {
  const auto = new Set();
  if (primaryId === "M1.1") ["accuracy_usmle", "hallucination_rate", "donoharm_score"].forEach(m => auto.add(m));
  if (primaryId === "M1.2") ["fhir_conformity", "ner_f1", "snomed_coverage"].forEach(m => auto.add(m));
  if (primaryId === "M1.3") ["donoharm_score", "bias_detection", "triage_sensitivity"].forEach(m => auto.add(m));
  if (primaryId === "M1.4") ["triage_sensitivity", "donoharm_score", "accuracy_usmle"].forEach(m => auto.add(m));
  if (primaryId === "M1.5") ["calc_precision", "accuracy_usmle"].forEach(m => auto.add(m));
  if (primaryId === "M1.6") ["ner_f1", "hallucination_rate", "snomed_coverage"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-MED-01")) ["donoharm_score", "bias_detection"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-MED-02")) ["snomed_coverage", "ner_f1"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-MED-03")) ["fhir_conformity"].forEach(m => auto.add(m));
  return [...auto];
}

function getAutoStorage(secondaryIds, primaryId) {
  if (primaryId === "M1.2" || secondaryIds.includes("SEC-MED-03")) return STORAGE_ENGINES[1];
  if (secondaryIds.includes("SEC-MED-04") || primaryId === "M1.1") return STORAGE_ENGINES[0];
  return "";
}

function needsValidationStep(primaryId, secondaryIds) {
  return primaryId === "M1.1" || primaryId === "M1.3" || secondaryIds.includes("SEC-MED-01") || secondaryIds.includes("SEC-MED-07");
}

// ─── Generador del informe ────────────────────────────────────────────────—

function generateReport(data) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const primary = PRIMARY_TASKS.find(t => t.id === data.primaryTask);
  const secondaries = SECONDARY_TASKS.filter(s => data.secondaryTasks.includes(s.id));
  const metrics = CLINICAL_METRICS.filter(m => data.selectedMetrics.includes(m.id));
  const appSlug = (data.appName || "med_app").toLowerCase().replace(/\s+/g, "_");
  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);
  const hasSEC01 = data.secondaryTasks.includes("SEC-MED-01");
  const hasSEC02 = data.secondaryTasks.includes("SEC-MED-02");
  const hasSEC03 = data.secondaryTasks.includes("SEC-MED-03");
  const hasSEC04 = data.secondaryTasks.includes("SEC-MED-04");
  const hasSEC05 = data.secondaryTasks.includes("SEC-MED-05");
  const hasSEC06 = data.secondaryTasks.includes("SEC-MED-06");
  const hasSEC07 = data.secondaryTasks.includes("SEC-MED-07");
  const hasSEC08 = data.secondaryTasks.includes("SEC-MED-08");

  const metricsByCategory = metrics.reduce((acc, m) => {
    if (!acc[m.cat]) acc[m.cat] = [];
    acc[m.cat].push(m);
    return acc;
  }, {});

  const treeLines = [
    appSlug + "/",
    "—œ─── src/",
    "—‚   —œ─── __init__.py",
    "—‚   —œ─── config.py                 # Configuración del entorno, endpoints clínicos y claves de API",
    "—‚   —œ─── schemas.py                # Modelos Pydantic v2 y validadores de integridad clínica",
    data.primaryTask === "M1.1" ? "—‚   —œ─── claim_extractor.py        # Segmentador de afirmaciones clínicas atómicas (BR-MED-01)" : null,
    data.primaryTask === "M1.1" || hasSEC05 ? "—‚   —œ─── pubmed_verifier.py        # Conector NCBI E-Utilities y validador bibliográfico" : null,
    data.primaryTask === "M1.2" || hasSEC03 ? "—‚   —œ─── fhir_builder.py           # Constructor y validador de recursos HL7 FHIR R4 (BR-MED-02)" : null,
    hasSEC02 ? "—‚   —œ─── terminology.py            # Mapeo a códigos CIE-10, SNOMED-CT, RxNorm y LOINC" : null,
    data.primaryTask === "M1.3" ? "—‚   —œ─── adherence_engine.py       # Planificador de tomas y registro de eventos de adherencia" : null,
    hasSEC01 || hasSEC07 ? "—‚   —œ─── safety_guardrail.py       # Guardrail Do-No-Harm y detector de contraindicaciones (BR-MED-05)" : null,
    data.primaryTask === "M1.5" ? "—‚   —œ─── clinical_calculator.py    # Motor determinista de fórmulas médicas (GFR, MELD, CHADS2)" : null,
    "—‚   —œ─── storage.py                # " + (hasSEC04 ? "DuckDB columnar para auditoría inmutable de afirmaciones" : "Capa de persistencia clínica"),
    hasSEC06 ? "—‚   —œ─── alerts_dispatcher.py      # Gestor de alertas sanitarias y derivación urgente (SEC-MED-06)" : null,
    hasSEC08 ? "—‚   —œ─── clinical_reporting.py     # Generador de informes clínicos auditables (PDF / JSON-LD)" : null,
    "—‚   —”─── ui/",
    "—‚       —œ─── __init__.py",
    "—‚       —œ─── components.py         # Tarjetas de afirmaciones, badges de verificación y visores FHIR",
    "—‚       —”─── main_view.py          # Dashboard clínico y panel de operador sanitario",
    "—œ─── tests/",
    "—‚   —œ─── test_schemas.py           # Pruebas de esquemas Pydantic y serialización",
    "—‚   —œ─── test_safety_guardrail.py  # Banco de pruebas de no-maleficencia y casos de jailbreak médico",
    data.primaryTask === "M1.2" ? "—‚   —”─── test_fhir_conformity.py   # Validación de conformidad contra perfiles HL7 FHIR R4" : null,
    "—œ─── data/                         # Datasets de prueba, ontologías y caché local",
    "—œ─── requirements.txt              # fhir.resources, pydantic, duckdb, requests, pytest",
    "—”─── main.py                       # Punto de entrada de la aplicación clínica",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "M1.1" ? "- **BR-MED-01 (Mente Médica):** Segmentador atómico activado; verificación bibliográfica por afirmación; log inmutable en DuckDB." : null,
    data.primaryTask === "M1.2" ? "- **BR-MED-02 (Nexo FHIR):** Constructor FHIR R4 activado; normalización terminológica forzada (SNOMED/CIE-10/RxNorm/LOINC); servidor HAPI preconfigurado." : null,
    data.primaryTask === "M1.3" ? "- **BR-MED-03 (Higía IA):** Guardrail de no-maleficencia activado; bloqueo estricto de modificación de pautas; seguimiento de eventos en serie temporal." : null,
    data.primaryTask === "M1.5" ? "- **BR-MED-04 (Cálculo Fisiopatológico):** Fórmulas deterministas validadas (GFR, CHADS2-VASc, MELD) con tolerancia cero a errores de aproximación." : null,
    hasSEC01 || hasSEC07 ? "- **BR-MED-05 (Seguridad Clínica):** Middleware Do-No-Harm integrado en todo el flujo de generación; descargo formal reforzado." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de validación y control de calidad:** " + data.validationModel,
        "- **Guardrail de seguridad clínica principal:** " + data.safetyGuardrail,
        "- **Principio de No-Maleficencia (Do-No-Harm):** Obligación algorítmica de rechazar activamente recomendaciones con riesgo para el paciente.",
        "- **Trazabilidad por Afirmación:** Cada dato clínico generado debe asociarse a su fuente primaria y nivel de confianza.",
        "- **Aislamiento de la Decisión Clínica:** El sistema actúa como herramienta de apoyo analítico y nunca como decisor autónomo.",
      ].join("\n")
    : "La aplicación opera en modo de consulta o procesamiento de datos estructurados. No genera recomendaciones clínicas activas en tiempo real.";

  const qaLines = [
    "1. **Pruebas de No-Maleficencia (Safety Red-Teaming):** Batería de 100+ casos de contraindicaciones y sobredosis simuladas; el sistema debe rechazar el 100% de los intentos.",
    "2. **Validación de Conformidad HL7 FHIR R4:** Verificación sintáctica con librería fhir.resources en todos los bundles generados.",
    "3. **Prueba de Concordancia Bibliográfica:** Validación de afirmaciones clínicas contra PubMed con cálculo de F1-Score en evidencia.",
    "4. **Pruebas Unitarias de Fórmulas Matemáticas:** Validación cruzada de cálculos médicos contra referencias estándar validadas.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACI“N TÃ‰CNICA",
    "## Proyecto de Software Médico: " + data.appName,
    "",
    "**Fecha de Generación:** " + now,
    "**Área Horizon:** Medicina, IA Clínica & Salud Digital",
    "**Arquitecto / Diseñador:** " + (data.authorName || "Horizon User"),
    "**Versión del Documento:** v1.0.0 (Especificación Formal Clínica)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y Propósito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **Descripción del núcleo funcional:** " + (primary?.desc || ""),
    "- **Público objetivo:** " + (primary?.audience || ""),
    "- **Áreas y especialidades clínicas:** " + data.clinicalDomains.join(", "),
    "- **Tipología de documentos de entrada:** " + data.inputDocuments.join(", "),
    "",
    "**Exclusiones explícitas:** El sistema NO emite diagnósticos médicos vinculantes, NO prescribe tratamientos farmacológicos de forma autónoma y NO sustituye el juicio clínico de un profesional sanitario cualificado.",
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
    "### 3. Catálogo de Métricas y Evaluación Clínica",
    "",
    "El sistema implementará y monitorizará las siguientes métricas de precisión y seguridad:",
    "",
    metricsSection || "_No se han seleccionado métricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de Seguridad Clínica y Guardrails Do-No-Harm",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack Tecnológico y Estructura de Scripts Python",
    "",
    "- **Capa de Presentación (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos Clínicos:** " + data.storageEngine,
    "- **Validación de Datos:** Pydantic v2 + fhir.resources con tipado estricto.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y Validación (QA Clínico)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. Cláusula de Cumplimiento Normativo y Descargo de Responsabilidad Médica",
    "",
    "> **AVISO LEGAL Y CLÍNICO OBLIGATORIO**",
    ">",
    "> Esta especificación técnica y cualquier software desarrollado a partir de ella tiene carácter **exclusivamente de apoyo técnico, organizativo y de investigación biomédica**.",
    ">",
    "> - **NO constituye asesoramiento médico, diagnóstico clínico ni prescripción terapéutica**.",
    "> - **NO sustituye en ningún caso la relación médico-paciente ni el juicio clínico del profesional sanitario**.",
    "> - Todo resultado, resumen o informe emitido por el sistema debe ser **revisado y validado por un facultativo cualificado** antes de cualquier toma de decisión asistencial.",
    hasSEC01 || hasSEC07 ? "> - Los módulos de IA integran filtros Do-No-Harm que bloquean activamente cualquier intento de recomendación clínica no autorizada." : null,
    ">",
    "> Diseñado en **Horizon — Centro Interactivo de IA Aplicada.** Laboratorio de Medicina & IA Clínica.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de Especificación Técnica — Generado automáticamente por Horizon MedAppWizard v1.0_",
  ].filter(l => l !== null).join("\n");
}

// ─── Componentes auxiliares ────────────────────────────────────────────────—€

function ProgressBar({ step, total }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-dark/50 uppercase tracking-widest">Paso {step} de {total}</span>
        <span className="text-xs text-dark/35">{Math.round((step / total) * 100)}% completado</span>
      </div>
      <div className="h-1.5 bg-dark/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
              i + 1 < step
                ? "bg-teal-600 text-white"
                : i + 1 === step
                ? "bg-teal-600 text-white ring-4 ring-teal-600/20"
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
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-sm transition-colors"
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
      className="w-full bg-dark/[0.02] border border-dark/12 text-dark text-sm rounded-sm px-3.5 py-2.5 focus:outline-hidden focus:border-teal-500 placeholder:text-dark/25 transition-colors"
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
              ? "border-teal-500/40 bg-teal-50/30"
              : "border-dark/10 hover:border-dark/20 hover:bg-dark/[0.01]"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            value === (opt.id || opt) ? "border-teal-600" : "border-dark/25"
          }`}>
            {value === (opt.id || opt) && <div className="w-2 h-2 rounded-full bg-teal-600" />}
          </div>
          <input type="radio" className="sr-only" checked={value === (opt.id || opt)} onChange={() => onChange(opt.id || opt)} />
          <div>
            {opt.label ? (
              <>
                <p className="text-sm font-semibold text-dark"><span className="text-teal-600 text-xs mr-1.5">{opt.id}</span>{opt.label}</p>
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
              isChecked ? "border-teal-500/40 bg-teal-50/30" : isDisabled ? "border-dark/6 opacity-40 cursor-not-allowed" : "border-dark/10 hover:border-dark/20"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${isChecked ? "border-teal-600 bg-teal-600" : "border-dark/25"}`}>
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={isChecked} disabled={isDisabled} onChange={() => !isDisabled && toggle(opt.id || opt)} />
            <div>
              {opt.label ? (
                <>
                  <p className="text-sm font-medium text-dark"><span className="text-xs text-teal-600 mr-1">[{opt.id}]</span>{opt.label}</p>
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
            value === opt ? "border-teal-500/40 bg-teal-50/30" : "border-dark/10 hover:border-dark/20"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${value === opt ? "border-teal-600" : "border-dark/25"}`}>
            {value === opt && <div className="w-2 h-2 rounded-full bg-teal-600" />}
          </div>
          <input type="radio" className="sr-only" checked={value === opt} onChange={() => onChange(opt)} />
          <p className="text-sm text-dark">{opt}</p>
        </label>
      ))}
    </div>
  );
}

// ─── Componente principal ───────────────────────────────────────────────────—€

const TOTAL_STEPS = 6;

const initData = () => ({
  appName: "",
  authorName: "",
  primaryTask: "",
  secondaryTasks: [],
  clinicalDomains: [],
  inputDocuments: [],
  selectedMetrics: [],
  validationModel: "",
  safetyGuardrail: "",
  uiFramework: "",
  storageEngine: "",
});

export default function WizardMedicina() {
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
      if (data.clinicalDomains.length === 0) e.clinicalDomains = "Selecciona al menos una especialidad clínica.";
      if (data.inputDocuments.length === 0) e.inputDocuments = "Selecciona al menos un tipo de documento.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una métrica clínica.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de validación clínica.";
      if (!data.safetyGuardrail) e.safetyGuardrail = "Selecciona el guardrail de seguridad principal.";
    }
    if (step === 6) {
      if (!data.uiFramework) e.uiFramework = "Selecciona el framework de interfaz clínica.";
      if (!data.storageEngine) e.storageEngine = "Selecciona el motor de persistencia sanitaria.";
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
    a.download = `informe_${(data.appName || "med_app").toLowerCase().replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);

  return (
    <div className="min-h-full bg-[#F7F6F2]">
      <div className="max-w-[820px] mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-8">
          <Link to="/areas/medicina" className="inline-flex items-center gap-1.5 text-xs text-dark/40 hover:text-dark transition-colors mb-6">
            <ArrowLeft size={13} /> Laboratorio de Medicina
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center justify-center shrink-0 text-teal-600 font-display text-xl">ðŸ©º</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                Diseñador de Proyectos — Medicina & IA Clínica
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicación médica paso a paso con rigor técnico, trazabilidad bibliográfica y guardrails Do-No-Harm.
              </p>
            </div>
          </div>
        </div>

        {/* PASOS 1-6 */}
        {step <= TOTAL_STEPS && (
          <>
            <ProgressBar step={step} total={TOTAL_STEPS} />

            {/* PASO 1 */}
            {step === 1 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 1 — Tarea Principal</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona el núcleo funcional que definirá la arquitectura de tu aplicación clínica.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="Será el título de tu especificación técnica clínica.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Mente Médica, Nexo FHIR, Higía Monitor, CardioCheck–¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias o servicio hospitalario.">Diseñador / Servicio Clínico</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Servicio de Medicina Interna, Unidad de Innovación–¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la función clínica principal. Esto determinará los guardrails y métricas requeridas.">Tarea principal de la aplicación</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 2 — Módulos Complementarios</h2>
                <p className="text-dark/45 text-sm mb-6">Añade hasta <strong>4 capacidades clínicas y de seguridad</strong> para robustecer el sistema.</p>

                <div className="bg-teal-500/[0.04] border border-teal-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 — Ámbito Clínico & Documental</h2>
                <p className="text-dark/45 text-sm mb-6">Configura las especialidades objetivo y las fuentes de datos clínicos que procesará el sistema.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Especialidades asistenciales donde operará el sistema.">Especialidades clínicas</FieldLabel>
                    <CheckGroup options={CLINICAL_DOMAINS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.clinicalDomains} onChange={set("clinicalDomains")} max={7} />
                    {errors.clinicalDomains && <p className="text-red-500 text-xs mt-1.5">{errors.clinicalDomains}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Formato y tipología de los documentos clínicos de entrada.">Tipos de documentos a procesar</FieldLabel>
                    <CheckGroup options={INPUT_DOCUMENTS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.inputDocuments} onChange={set("inputDocuments")} max={6} />
                    {errors.inputDocuments && <p className="text-red-500 text-xs mt-1.5">{errors.inputDocuments}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 4 */}
            {step === 4 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 — Métricas de Evaluación Clínica</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona los indicadores cuantitativos y de seguridad que evaluará el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-teal-800">
                    ““ {data.selectedMetrics.length} métrica{data.selectedMetrics.length !== 1 ? "s" : ""} clínica{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automáticamente según tu tarea principal.
                  </div>
                )}

                {["Precisión & QA Biomédica", "Seguridad & Ã‰tica Clínica", "Interoperabilidad & NLP", "Triaje & Diagnóstico"].map(cat => (
                  <div key={cat} className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-dark/40 mb-2.5">{cat}</p>
                    <div className="space-y-1.5">
                      {CLINICAL_METRICS.filter(m => m.cat === cat).map(m => {
                        const isChecked = data.selectedMetrics.includes(m.id);
                        return (
                          <label key={m.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? "border-teal-500/30 bg-teal-50/30" : "border-dark/8 hover:border-dark/15"}`}>
                            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${isChecked ? "border-teal-600 bg-teal-600" : "border-dark/20"}`}>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 — Seguridad Clínica y Guardrails Do-No-Harm</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-teal-800 flex items-start gap-2">
                      <ShieldCheck size={16} className="shrink-0 mt-0.5 text-teal-600" />
                      Este paso está activo para garantizar la no-maleficencia y la verificación bibliográfica de afirmaciones clínicas.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de validación y control de calidad de respuestas generadas.">Modelo de verificación clínica</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="Restricción de seguridad activa que rige las salidas del sistema.">Guardrail de seguridad Do-No-Harm</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios éticos y de seguridad clínica (activados por diseño)</p>
                        {[
                          "Principio de No-Maleficencia (Do-No-Harm): rechazo explícito de combinaciones farmacológicas de riesgo.",
                          "Trazabilidad completa afirmación por afirmación con DOI / PMID de PubMed.",
                          "Supervisión humana obligatoria (Human-in-the-Loop) en cualquier sugerencia clínica.",
                        ].map(c => (
                          <div key={c} className="flex items-start gap-2.5 mb-2 last:mb-0">
                            <div className="w-4 h-4 rounded bg-teal-100 border border-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} className="text-teal-700" />
                            </div>
                            <p className="text-[12.5px] text-dark/60 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo estructuración / interoperabilidad FHIR</strong> sin generación conversacional activa hacia pacientes.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides añadir verificación de respuestas o agentes de adherencia, vuelve al <strong>Paso 2</strong> y activa el módulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-MED-01</code>.
                    </div>
                  </div>
                )}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 6 */}
            {step === 6 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 6 — Stack Tecnológico Sanitario</h2>
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y librerías especializadas para tu aplicación clínica.</p>

                {data.secondaryTasks.includes("SEC-MED-04") && (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-teal-800">
                    ““ Persistencia analítica preconfigurada en <strong>DuckDB + Parquet</strong> por el módulo SEC-MED-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para facultativos o investigadores.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Almacenamiento de datos clínicos, recursos FHIR y registros de auditoría.">Motor de persistencia clínica</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar Especificación Clínica" />
              </StepCard>
            )}
          </>
        )}

        {/* PANTALLA FINAL: INFORME */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-teal-100 border border-teal-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-teal-700" />
                </div>
                <h2 className="font-display text-[24px] text-dark">Especificación clínica generada con éxito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria técnica para <strong className="text-dark">{data.appName}</strong> está lista para desarrollo y auditoría.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={downloadMd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-sm transition-colors"
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

            <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl px-6 py-5 flex gap-3">
              <ShieldCheck size={18} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-[13px] text-red-800 leading-relaxed">
                <strong>Aviso de dominio médico:</strong> Este informe especifica una arquitectura de software para soporte analítico e interoperabilidad. No constituye producto sanitario certificado, dispositivo médico (MDR) ni sustituto del criterio facultativo.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Renderizador de Markdown ligero ───────────────────────────────────────—€

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
              <span className="text-teal-600 mt-1.5 shrink-0">–¢</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (/^\d+\. /.test(line)) {
          const num = line.match(/^(\d+)\./)[1];
          return (
            <div key={i} className="flex items-start gap-2.5 pl-2">
              <span className="text-teal-600 font-semibold text-xs mt-1 shrink-0 w-4">{num}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, "")) }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-4 border-teal-500 bg-teal-50 px-4 py-2 rounded-r-lg text-[13px] text-teal-950 my-2">
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

