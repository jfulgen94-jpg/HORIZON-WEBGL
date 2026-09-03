import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Download } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Scale } from "lucide-react";

// â”€â”€â”€ Constantes de datos (Derecho & LegalTech) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRIMARY_TASKS = [
  {
    id: "D1.1",
    label: "Auditor Contractual y Detector de Riesgo de Cláusulas (Lex Guardián)",
    desc: "Segmentación de contratos mercantiles y laborales, clasificación según los 41 tipos CUAD/LEDGAR, detección de asimetrías, límites de responsabilidad desproporcionados y cláusulas ausentes.",
    audience: "Despachos de abogados, asesorías jurídicas internas, departamentos de compras y contratación.",
  },
  {
    id: "D1.2",
    label: "Analizador de Tendencias Jurisprudenciales y Evolución Doctrinal (Sententia Nova)",
    desc: "Procesamiento masivo de resoluciones judiciales (CENDOJ, Curia, Aranzadi), extracción de ratios decidendi, clustering de criterios y detección de líneas doctrinales emergentes.",
    audience: "Abogados procesalistas, magistrados, investigadores jurídicos, departamentos de litigación.",
  },
  {
    id: "D1.3",
    label: "Motor de Mapeo de Cumplimiento Regulatorio y Gap Analysis (RegAudit / AI Act / RGPD)",
    desc: "Cotejo sistemático de políticas y procedimientos internos frente a marcos regulatorios vigentes (AI Act, RGPD, DORA, NIS2, ISO 42001) con matriz de brechas de cumplimiento.",
    audience: "Oficiales de cumplimiento (CCO), delegados de protección de datos (DPO), auditores de compliance.",
  },
  {
    id: "D1.4",
    label: "Asistente de Búsqueda Jurídica Semántica y RAG Normativo (Iuris RAG)",
    desc: "Motor de recuperación y síntesis de legislación y doctrina con citas textuales literales, verificación de vigencia de artículos y blindaje contra alucinaciones jurídicas.",
    audience: "Juristas, asesores fiscales, documentalistas jurídicos, estudiantes de derecho.",
  },
  {
    id: "D1.5",
    label: "Detector de Cláusulas Abusivas y Términos de Servicio (LexGLUE ToS)",
    desc: "Evaluación de condiciones generales de contratación, términos de servicio web (ToS) y contratos de adhesión con scoring de abusividad y desequilibrio contractual.",
    audience: "Asociaciones de consumidores, departamentos legales de comercio electrónico, abogados mercantilistas.",
  },
  {
    id: "D1.6",
    label: "Generador de Informes de Due Diligence Legal y Trazabilidad Contractual",
    desc: "Resúmenes ejecutivos de auditoría legal para transacciones corporativas de M&A, rondas de inversión y comités de gestión de riesgos.",
    audience: "Departamentos de M&A, fondos de capital riesgo, consultoras de auditoría legal.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-LAW-01", label: "Verificador Anti-Alucinación de Citas Jurídicas y Articulado", desc: "Restricción absoluta que prohíbe inventar números de artículos, leyes o sentencias no presentes en el corpus de entrada." },
  { id: "SEC-LAW-02", label: "Pista de Auditoría Legal y Trazabilidad con Hash SHA-256 en DuckDB", desc: "Registro inmutable de cada cláusula analizada, dictamen preliminar, nivel de riesgo y timestamp UTC." },
  { id: "SEC-LAW-03", label: "Extractor de Responsabilidades, Indemnizaciones y Cláusulas Penales", desc: "Módulo especializado en la detección de topes de indemnización (liability caps), exclusiones de daños y penalizaciones." },
  { id: "SEC-LAW-04", label: "Persistencia Columnar Ultrarrápida y Modo Offline (DuckDB + Parquet)", desc: "Almacenamiento local seguro de contratos cifrados y colecciones de jurisprudencia sin enviar datos a servidores externos." },
  { id: "SEC-LAW-05", label: "Exportador de Informes Legales en PDF y Markdown con Semáforos de Riesgo", desc: "Formateo profesional con codificación por colores (Bajo / Medio / Alto / Crítico) y citas textuales exactas." },
  { id: "SEC-LAW-06", label: "Extractor Estructurado de Contratos (PyMuPDF / python-docx / OCR)", desc: "Preservación rigurosa de numeración de cláusulas, anexos, tablas de precios y firmas." },
  { id: "SEC-LAW-07", label: "Asistente con Restricción Estricta de No-Asesoramiento Legal", desc: "Bloqueo automático de afirmaciones categóricas de legalidad e imposición de cláusula de descargo deontológico." },
  { id: "SEC-LAW-08", label: "Conector con Bases de Datos de Legislación Oficial (BOE / EUR-Lex API)", desc: "Consulta en tiempo real del estado de vigencia y versiones consolidadas de leyes y directivas comunitarias." },
];

const LEGAL_DOMAINS = [
  "Derecho Mercantil, Societario & Contratación Internacional",
  "Derecho Laboral & Relaciones de Trabajo",
  "Privacidad, Protección de Datos (RGPD) & Ciberseguridad (DORA / NIS2)",
  "Regulación de Inteligencia Artificial (EU AI Act & ISO 42001)",
  "Derecho Procesal, Litigación & Jurisprudencia Civil/Penal",
  "Derecho Administrativo, Contratación Pública & Licitaciones",
];

const COMPUTATION_ENGINES = [
  "PyMuPDF / python-docx (Extracción y segmentación de contratos Word/PDF)",
  "DuckDB + Parquet (Almacén analítico columnar inmutable para auditorías legales)",
  "Sentence-Transformers / MTEB Embeddings (Búsqueda semántica en corpus jurídicos)",
  "BOE / EUR-Lex API Connectors (Verificación de textos legislativos oficiales)",
  "Pydantic v2 (Validación de esquemas y estructuras contractuales)",
  "ReportLab / WeasyPrint (Generación de dictámenes e informes PDF estructurados)",
];

const LEGAL_METRICS = [
  { id: "cuad_clause_f1", label: "F1-Score en Extracción de Cláusulas (CUAD)", cat: "Análisis Contractual", desc: "Precisión y exhaustividad en la identificación de los 41 tipos de cláusulas críticas." },
  { id: "risk_precision", label: "Precisión en Detección de Alto Riesgo", cat: "Análisis Contractual", desc: "Ratio de cláusulas leoninas o desproporcionadas identificadas correctamente." },
  { id: "zero_hallucination_score", label: "Índice de Fidelidad y No-Alucinación Jurídica", cat: "Seguridad & Ã‰tica Legal", desc: "Porcentaje de citas y referencias que coinciden exactamente con el texto documental analizado." },
  { id: "precedent_matching_acc", label: "Acierto en Predicción de Precedente (CaseHOLD)", cat: "Jurisprudencia", desc: "Capacidad para identificar la doctrina o sentencia rectora aplicable al supuesto de hecho." },
  { id: "regulatory_gap_score", label: "Cobertura de Mapeo Regulatorio (RegAudit)", cat: "Compliance & Regulación", desc: "Porcentaje de requisitos de la norma evaluados con evidencia documental contrastada." },
  { id: "tos_unfair_f1", label: "F1-Score en Detección de Abusividad (LexGLUE ToS)", cat: "Condiciones Generales", desc: "Sensibilidad en detección de cláusulas abusivas en términos de servicio y contratos masa." },
  { id: "missing_clause_recall", label: "Sensibilidad en Detección de Cláusulas Ausentes", cat: "Análisis Contractual", desc: "Capacidad para advertir la falta de protecciones habituales como confidencialidad o no competencia." },
  { id: "audit_trail_integrity", label: "Integridad de Pista de Auditoría Contractual", cat: "Seguridad & Calidad", desc: "Garantía de trazabilidad inmutable desde el documento original hasta el informe de auditoría." },
];

const VALIDATION_MODELS = [
  "Arquitectura de Doble Revisión (Análisis Claude 3.7 Sonnet + Verificación Anti-Alucinación Estricta)",
  "Validación Determinista contra Base de Datos de Citas y Términos Definidos del Contrato",
  "Supervisión Humana Obligatoria (Human-in-the-Loop) con Flujo de Revisión por Abogado",
  "Cotejo Cruzado contra Textos Oficiales Consolidados del BOE y EUR-Lex",
];

const SAFETY_GUARDRAILS = [
  "Aislamiento Deontológico: Prohibición de Emisión de Dictamen Vinculante sin Abogado Colegiado",
  "Prohibición Absoluta de Citas Normativas Inventadas (Marcado [VERIFICAR NORMA VIGENTE])",
  "Obligación de Anclar Toda Afirmación de Riesgo en Cita Textual Literal del Contrato",
  "Inclusión Inmutable de Cláusula de Descargo Legal en Toda Página del Informe",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard interactivo con visor de contratos anotados y semáforos de riesgo)",
  "FastAPI + React / Next.js (Portal LegalTech profesional con control de acceso por cliente/expediente)",
  "Flet (Aplicación de escritorio local .exe para despachos de abogados con secreto profesional estricto)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (Almacén analítico columnar cifrado para contratos y auditorías)",
  "SQLite con Cifrado Local SQLCipher para Expedientes Confidenciales",
  "Almacén de Documentos Seguros en Formato JSON-LD y Markdown Anotado",
  "Base de Datos de Vectores para Búsqueda Semántica de Jurisprudencia",
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function getAutoMetrics(primaryId, secondaryIds) {
  const auto = new Set();
  if (primaryId === "D1.1") ["cuad_clause_f1", "risk_precision", "zero_hallucination_score"].forEach(m => auto.add(m));
  if (primaryId === "D1.2") ["precedent_matching_acc", "zero_hallucination_score"].forEach(m => auto.add(m));
  if (primaryId === "D1.3") ["regulatory_gap_score", "zero_hallucination_score"].forEach(m => auto.add(m));
  if (primaryId === "D1.4") ["zero_hallucination_score", "precedent_matching_acc"].forEach(m => auto.add(m));
  if (primaryId === "D1.5") ["tos_unfair_f1", "risk_precision"].forEach(m => auto.add(m));
  if (primaryId === "D1.6") ["audit_trail_integrity", "risk_precision"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-LAW-01")) ["zero_hallucination_score"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-LAW-02")) ["audit_trail_integrity"].forEach(m => auto.add(m));
  return [...auto];
}

function getAutoStorage(secondaryIds, primaryId) {
  if (primaryId === "D1.1" || secondaryIds.includes("SEC-LAW-02") || secondaryIds.includes("SEC-LAW-04")) {
    return STORAGE_ENGINES[0]; // DuckDB + Parquet
  }
  return "";
}

function needsValidationStep(primaryId, secondaryIds) {
  return primaryId === "D1.1" || primaryId === "D1.3" || primaryId === "D1.5" || secondaryIds.includes("SEC-LAW-01") || secondaryIds.includes("SEC-LAW-07");
}

// â”€â”€â”€ Generador del informe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function generateReport(data) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const primary = PRIMARY_TASKS.find(t => t.id === data.primaryTask);
  const secondaries = SECONDARY_TASKS.filter(s => data.secondaryTasks.includes(s.id));
  const metrics = LEGAL_METRICS.filter(m => data.selectedMetrics.includes(m.id));
  const appSlug = (data.appName || "legal_app").toLowerCase().replace(/\s+/g, "_");
  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);
  const hasSEC01 = data.secondaryTasks.includes("SEC-LAW-01");
  const hasSEC02 = data.secondaryTasks.includes("SEC-LAW-02");
  const hasSEC03 = data.secondaryTasks.includes("SEC-LAW-03");
  const hasSEC04 = data.secondaryTasks.includes("SEC-LAW-04");
  const hasSEC05 = data.secondaryTasks.includes("SEC-LAW-05");
  const hasSEC06 = data.secondaryTasks.includes("SEC-LAW-06");
  const hasSEC07 = data.secondaryTasks.includes("SEC-LAW-07");
  const hasSEC08 = data.secondaryTasks.includes("SEC-LAW-08");

  const metricsByCategory = metrics.reduce((acc, m) => {
    if (!acc[m.cat]) acc[m.cat] = [];
    acc[m.cat].push(m);
    return acc;
  }, {});

  const treeLines = [
    appSlug + "/",
    "â”œâ”€â”€ src/",
    "â”‚   â”œâ”€â”€ __init__.py",
    "â”‚   â”œâ”€â”€ config.py                 # Parámetros del proyecto, claves de API y rutas de almacenamiento seguro",
    "â”‚   â”œâ”€â”€ schemas.py                # Modelos Pydantic v2 para contratos, cláusulas y dictámenes" + (hasSEC07 ? "\nâ”‚   â”‚                             # â†’ incluye middleware Guardrails de No-Asesoramiento (BR-LAW-05)" : ""),
    data.primaryTask === "D1.1" || hasSEC06 ? "â”‚   â”œâ”€â”€ contract_parser.py        # Parser de contratos (PDF, DOCX, TXT) con segmentación atómica (BR-LAW-01)" : null,
    data.primaryTask === "D1.1" ? "â”‚   â”œâ”€â”€ clause_auditor.py         # Clasificador CUAD (41 tipos) y detector de riesgos contractuales" : null,
    hasSEC03 ? "â”‚   â”œâ”€â”€ liability_extractor.py    # Extractor especializado de topes de indemnización y responsabilidades" : null,
    data.primaryTask === "D1.2" ? "â”‚   â”œâ”€â”€ jurisprudence_trends.py   # Analizador de sentencias y clustering de evolución doctrinal (BR-LAW-02)" : null,
    data.primaryTask === "D1.3" ? "â”‚   â”œâ”€â”€ compliance_mapper.py      # Motor de mapeo regulatorio (AI Act, RGPD, DORA) y gap analysis" : null,
    data.primaryTask === "D1.4" ? "â”‚   â”œâ”€â”€ legal_rag_engine.py       # Asistente semántico con recuperación de legislación y jurisprudencia" : null,
    hasSEC01 ? "â”‚   â”œâ”€â”€ anti_hallucination.py     # Verificador estricto de anclaje textual y citas legislativas" : null,
    hasSEC08 ? "â”‚   â”œâ”€â”€ boe_connector.py          # Conector para verificación de textos consolidados del BOE / EUR-Lex" : null,
    "â”‚   â”œâ”€â”€ storage.py                # " + (hasSEC04 ? "DuckDB + Parquet (BR-LAW-04) con registro inmutable de auditorías" : "Capa de persistencia jurídica"),
    "â”‚   â”œâ”€â”€ legal_reporting.py        # Generador de informes de auditoría legal con semáforos de riesgo (PDF / Markdown)",
    "â”‚   â””â”€â”€ ui/",
    "â”‚       â”œâ”€â”€ __init__.py",
    "â”‚       â”œâ”€â”€ components.py         # Visores de contratos anotados, badges de riesgo y tablas de cláusulas",
    "â”‚       â””â”€â”€ main_view.py          # Dashboard de auditoría y panel del jurista",
    "â”œâ”€â”€ tests/",
    "â”‚   â”œâ”€â”€ test_schemas.py           # Validación de modelos de datos jurídicos",
    data.primaryTask === "D1.1" ? "â”‚   â”œâ”€â”€ test_clause_auditor.py    # Casos de prueba de detección de cláusulas abusivas" : null,
    hasSEC01 ? "â”‚   â””â”€â”€ test_anti_hallucination.py# Banco de pruebas de no-alucinación y anclaje de citas" : null,
    "â”œâ”€â”€ data/                         # Contratos de prueba anonimizados, corpus normativo y caché",
    "â”œâ”€â”€ requirements.txt              # PyMuPDF, python-docx, duckdb, pydantic, pytest",
    "â””â”€â”€ main.py                       # Punto de entrada de la aplicación LegalTech",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "D1.1" ? "- **BR-LAW-01 (Lex Guardián):** Segmentador contractual activado; clasificación según taxonomía CUAD; verificación de anclaje literal obligatoria." : null,
    data.primaryTask === "D1.2" ? "- **BR-LAW-02 (Sententia Nova):** Analizador jurisprudencial activado; extracción de ratio decidendi y clustering de doctrina." : null,
    data.primaryTask === "D1.3" ? "- **BR-LAW-03 (RegAudit / AI Act):** Matriz de cumplimiento regulatorio activada; marcado obligatorio de [VERIFICAR REDACCIÃ“N OFICIAL]." : null,
    hasSEC04 ? "- **BR-LAW-04 (Persistencia Analítica):** Almacén columnar preconfigurado en DuckDB + Parquet para expedientes y auditorías inmutables." : null,
    hasSEC07 ? "- **BR-LAW-05 (Guardrail Deontológico):** Prohibición severa de emitir dictámenes vinculantes sin supervisión de abogado colegiado." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de verificación y control jurídico:** " + data.validationModel,
        "- **Guardrail de seguridad profesional:** " + data.safetyGuardrail,
        "- **Principio de Asistencia al Jurista:** El sistema actúa como herramienta de primera pasada y análisis documental; nunca emite consejo legal vinculante.",
        "- **Tolerancia Cero a Citas Inventadas:** Toda afirmación de riesgo debe acompañarse de la cita textual exacta de la cláusula analizada.",
        "- **Trazabilidad Inmutable:** Cada dictamen preliminar queda registrado con sellado temporal UTC y hash SHA-256 en DuckDB.",
      ].join("\n")
    : "La aplicación opera en modo de consulta documental o búsqueda de precedentes.";

  const qaLines = [
    "1. **Pruebas de Anclaje Textual (Zero-Hallucination):** Verificación automática de que el 100% de las citas de riesgo corresponden a fragmentos literales del contrato.",
    "2. **Validación de Taxonomía CUAD:** Comprobación cruzada de clasificación de cláusulas frente al dataset de referencia CUAD.",
    "3. **Prueba de Inmutabilidad de Auditoría:** Verificación de integridad de hashes SHA-256 en los registros de auditoría de DuckDB.",
    "4. **Prueba de Rendimiento Contractual:** Parsing y auditoría completa de un contrato de 100 cláusulas en menos de 4 segundos.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACIÃ“N TÃ‰CNICA",
    "## Proyecto de Software LegalTech: " + data.appName,
    "",
    "**Fecha de Generación:** " + now,
    "**Área Horizon:** Derecho, LegalTech & Compliance Regulatorio",
    "**Arquitecto / Diseñador:** " + (data.authorName || "Horizon User"),
    "**Versión del Documento:** v1.0.0 (Especificación Formal LegalTech)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y Propósito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **Descripción del núcleo funcional:** " + (primary?.desc || ""),
    "- **Público objetivo:** " + (primary?.audience || ""),
    "- **Áreas del derecho aplicables:** " + data.legalDomains.join(", "),
    "- **Motores y librerías de procesamiento:** " + data.computationEngines.join(", "),
    "",
    "**Exclusiones explícitas:** El sistema NO emite asesoramiento legal vinculante, NO ejerce la abogacía de forma autónoma y NO sustituye el criterio ni la firma de un abogado o jurista colegiado.",
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
    "### 3. Catálogo de Métricas y Rigor Jurídico",
    "",
    "El sistema implementará y monitorizará las siguientes métricas de precisión y fidelidad documental:",
    "",
    metricsSection || "_No se han seleccionado métricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de Seguridad Operativa y Guardrails Deontológicos",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack Tecnológico y Estructura de Scripts Python",
    "",
    "- **Capa de Presentación (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos:** " + data.storageEngine,
    "- **Validación de Datos:** Pydantic v2 con esquemas contractuales y tipado estricto.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y Validación (QA LegalTech)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. Cláusula de Deontología Profesional y Descargo de Responsabilidad Legal",
    "",
    "> **AVISO LEGAL Y DEONTOLÃ“GICO OBLIGATORIO**",
    ">",
    "> Esta especificación técnica y cualquier software desarrollado a partir de ella tiene carácter **exclusivamente de herramienta de apoyo analítico, organizativo y de primera revisión documental**.",
    ">",
    "> - **NO constituye asesoramiento legal, dictamen jurídico vinculante ni relación abogado-cliente**.",
    "> - Todo análisis de riesgos contractuales, mapeo regulatorio o resumen jurisprudencial debe ser **revisado, validado y firmado por un abogado o profesional del derecho debidamente colegiado** antes de cualquier toma de decisión con trascendencia jurídica.",
    "> - El sistema aplica un **principio estricto de no-alucinación**: ninguna afirmación sobre cláusulas es válida sin cita textual literal del contrato analizado.",
    ">",
    "> Diseñado en **Horizon â€” Centro Interactivo de IA Aplicada.** Laboratorio de Derecho & LegalTech.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de Especificación Técnica â€” Generado automáticamente por Horizon LegalAppWizard v1.0_",
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
          className="h-full bg-violet-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
              i + 1 < step
                ? "bg-violet-600 text-white"
                : i + 1 === step
                ? "bg-violet-600 text-white ring-4 ring-violet-600/20"
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
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-sm transition-colors"
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
      className="w-full bg-dark/[0.02] border border-dark/12 text-dark text-sm rounded-sm px-3.5 py-2.5 focus:outline-hidden focus:border-violet-500 placeholder:text-dark/25 transition-colors"
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
              ? "border-violet-500/40 bg-violet-50/30"
              : "border-dark/10 hover:border-dark/20 hover:bg-dark/[0.01]"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            value === (opt.id || opt) ? "border-violet-600" : "border-dark/25"
          }`}>
            {value === (opt.id || opt) && <div className="w-2 h-2 rounded-full bg-violet-600" />}
          </div>
          <input type="radio" className="sr-only" checked={value === (opt.id || opt)} onChange={() => onChange(opt.id || opt)} />
          <div>
            {opt.label ? (
              <>
                <p className="text-sm font-semibold text-dark"><span className="text-violet-600 text-xs mr-1.5">{opt.id}</span>{opt.label}</p>
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
              isChecked ? "border-violet-500/40 bg-violet-50/30" : isDisabled ? "border-dark/6 opacity-40 cursor-not-allowed" : "border-dark/10 hover:border-dark/20"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${isChecked ? "border-violet-600 bg-violet-600" : "border-dark/25"}`}>
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={isChecked} disabled={isDisabled} onChange={() => !isDisabled && toggle(opt.id || opt)} />
            <div>
              {opt.label ? (
                <>
                  <p className="text-sm font-medium text-dark"><span className="text-xs text-violet-600 mr-1">[{opt.id}]</span>{opt.label}</p>
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
            value === opt ? "border-violet-500/40 bg-violet-50/30" : "border-dark/10 hover:border-dark/20"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${value === opt ? "border-violet-600" : "border-dark/25"}`}>
            {value === opt && <div className="w-2 h-2 rounded-full bg-violet-600" />}
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
  legalDomains: [],
  computationEngines: [],
  selectedMetrics: [],
  validationModel: "",
  safetyGuardrail: "",
  uiFramework: "",
  storageEngine: "",
});

export default function WizardDerecho() {
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
      if (data.legalDomains.length === 0) e.legalDomains = "Selecciona al menos un área del derecho.";
      if (data.computationEngines.length === 0) e.computationEngines = "Selecciona al menos un motor de procesamiento.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una métrica jurídica.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de verificación jurídica.";
      if (!data.safetyGuardrail) e.safetyGuardrail = "Selecciona el guardrail de seguridad deontológica.";
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
    a.download = `informe_${(data.appName || "legal_app").toLowerCase().replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);

  return (
    <div className="min-h-full bg-[#F7F6F2]">
      <div className="max-w-[820px] mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-8">
          <Link to="/areas/derecho" className="inline-flex items-center gap-1.5 text-xs text-dark/40 hover:text-dark transition-colors mb-6">
            <ArrowLeft size={13} /> Laboratorio de Derecho
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center shrink-0 text-violet-600 font-display text-xl">âš–</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                Diseñador de Proyectos â€” Derecho & LegalTech
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicación jurídica paso a paso con rigor analítico, anclaje textual literal y control deontológico.
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
                <p className="text-dark/45 text-sm mb-6">Selecciona el núcleo funcional que definirá la arquitectura de tu aplicación jurídica.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="Será el título de tu especificación técnica LegalTech.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Lex Guardián, Sententia Nova, RegAudit, Iuris RAGâ€¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias, despacho de abogados o asesoría jurídica.">Diseñador / Despacho Jurídico</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Asesoría Jurídica, Despacho de Abogadosâ€¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la función jurídica principal. Esto determinará las reglas de análisis y verificación de citas requeridas.">Tarea principal de la aplicación</FieldLabel>
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
                <p className="text-dark/45 text-sm mb-6">Añade hasta <strong>4 capacidades jurídicas y de trazabilidad</strong> para robustecer el sistema.</p>

                <div className="bg-violet-500/[0.04] border border-violet-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 â€” Ámbito Jurídico & Motores</h2>
                <p className="text-dark/45 text-sm mb-6">Configura las ramas del derecho aplicables y los motores de procesamiento documental.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Ramas jurídicas y especialidades normativas donde operará el sistema.">Áreas del derecho aplicables</FieldLabel>
                    <CheckGroup options={LEGAL_DOMAINS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.legalDomains} onChange={set("legalDomains")} max={6} />
                    {errors.legalDomains && <p className="text-red-500 text-xs mt-1.5">{errors.legalDomains}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Librerías de análisis documental, persistencia y conectores normativos.">Motores y librerías de procesamiento</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 â€” Catálogo de Métricas Jurídicas</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las métricas de precisión contractual, fidelidad y detección de riesgos que evaluará el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-violet-800">
                    âœ“ {data.selectedMetrics.length} métrica{data.selectedMetrics.length !== 1 ? "s" : ""} jurídica{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automáticamente según tu tarea principal.
                  </div>
                )}

                {["Análisis Contractual", "Seguridad & Ã‰tica Legal", "Jurisprudencia", "Compliance & Regulación", "Condiciones Generales", "Seguridad & Calidad"].map(cat => (
                  <div key={cat} className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-dark/40 mb-2.5">{cat}</p>
                    <div className="space-y-1.5">
                      {LEGAL_METRICS.filter(m => m.cat === cat).map(m => {
                        const isChecked = data.selectedMetrics.includes(m.id);
                        return (
                          <label key={m.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? "border-violet-500/30 bg-violet-50/30" : "border-dark/8 hover:border-dark/15"}`}>
                            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${isChecked ? "border-violet-600 bg-violet-600" : "border-dark/20"}`}>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 â€” Rigor Jurídico y Guardrails Deontológicos</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-violet-800 flex items-start gap-2">
                      <Scale size={16} className="shrink-0 mt-0.5 text-violet-600" />
                      Este paso está activo para garantizar la no-alucinación de citas legales y el cumplimiento del secreto profesional y deontológico.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de verificación de cláusulas y prevención de citas falsas.">Modelo de verificación jurídica</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="Restricción de seguridad activa para evitar extralimitaciones o afirmaciones categóricas.">Guardrail de seguridad deontológica</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios deontológicos y de rigor legal (activados por diseño)</p>
                        {[
                          "Principio de Asistencia al Jurista: el sistema realiza la primera pasada; la firma y decisión es 100% del abogado.",
                          "Tolerancia Cero a Citas Falsas: toda afirmación de riesgo debe vincularse a la cita textual exacta de la cláusula.",
                          "Trazabilidad Inmutable: registro de contratos analizados con sellado temporal UTC y hash SHA-256 en DuckDB.",
                        ].map(c => (
                          <div key={c} className="flex items-start gap-2.5 mb-2 last:mb-0">
                            <div className="w-4 h-4 rounded bg-violet-100 border border-violet-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} className="text-violet-700" />
                            </div>
                            <p className="text-[12.5px] text-dark/60 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo consulta documental o búsqueda semántica</strong> sin auditoría de cláusulas en tiempo real.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides añadir auditoría de contratos o detección de riesgos, vuelve al <strong>Paso 2</strong> y activa el módulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-LAW-01</code> o <code className="bg-dark/5 px-1 rounded text-xs">SEC-LAW-07</code>.
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
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y librerías que darán soporte a tu aplicación LegalTech.</p>

                {data.secondaryTasks.includes("SEC-LAW-04") && (
                  <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-violet-800">
                    âœ“ Persistencia analítica preconfigurada en <strong>DuckDB + Parquet</strong> por el módulo SEC-LAW-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para abogados, juristas y equipos de compliance.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Dónde y cómo se almacenarán los contratos analizados y las pistas de auditoría.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar Especificación LegalTech" />
              </StepCard>
            )}
          </>
        )}

        {/* â”€â”€ PANTALLA FINAL: INFORME â”€â”€ */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-violet-100 border border-violet-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-violet-700" />
                </div>
                <h2 className="font-display text-[24px] text-dark">Especificación LegalTech generada con éxito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria técnica para <strong className="text-dark">{data.appName}</strong> está lista para desarrollo y auditoría jurídica.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={downloadMd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-sm transition-colors"
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
                <strong>Aviso deontológico y legal:</strong> Este informe especifica una arquitectura de software de apoyo analítico y revisión preliminar. No constituye asesoramiento legal vinculante ni sustituye el dictamen de un abogado colegiado.
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
              <span className="text-violet-600 mt-1.5 shrink-0">â€¢</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (/^\d+\. /.test(line)) {
          const num = line.match(/^(\d+)\./)[1];
          return (
            <div key={i} className="flex items-start gap-2.5 pl-2">
              <span className="text-violet-600 font-semibold text-xs mt-1 shrink-0 w-4">{num}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, "")) }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-4 border-violet-500 bg-violet-50 px-4 py-2 rounded-r-lg text-[13px] text-violet-950 my-2">
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

