import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Download } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Heart } from "lucide-react";

// â”€â”€â”€ Constantes de datos (Psicología & Creatividad) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRIMARY_TASKS = [
  {
    id: "P1.1",
    label: "Sistema de Acompañamiento y Escucha Activa No Clínica (Ánima AI)",
    desc: "Detección de señales emocionales implícitas en el lenguaje, modulación adaptativa del tono (validar / acompañar / orientar) y protocolo de desescalada de crisis no clínica.",
    audience: "Equipos de bienestar corporativo, usuarios individuales, plataformas de teleasistencia no sanitaria.",
  },
  {
    id: "P1.2",
    label: "Motor de Pensamiento Divergente e Ideación Creativa (Mente Abierta)",
    desc: "Generación de soluciones de alta distancia semántica (DAT), superación de la fijación funcional mediante Denial Prompting y evaluación de novedad conceptual.",
    audience: "Equipos de innovación, facilitadores de design thinking, creativos, investigadores y estrategas.",
  },
  {
    id: "P1.3",
    label: "Simulador de Negociación Estratégica con Teoría de la Mente (Ágora Táctica)",
    desc: "Modelado de asimetrías de información, seguimiento epistémico turno a turno y anticipación de las reacciones y creencias de la contraparte (ToM).",
    audience: "Negociadores, mediadores, directivos, equipos comerciales y profesionales de resolución de conflictos.",
  },
  {
    id: "P1.4",
    label: "Analizador de Clima Afectivo y Resonancia Emocional en Comunicaciones (Vox Emotiva)",
    desc: "Auditoría de tono, detección de sesgos lingüísticos implícitos, nivel de agresividad/empatía y carga emocional en comunicaciones escritas de equipo.",
    audience: "Departamentos de recursos humanos, líderes de equipo, consultores de clima laboral.",
  },
  {
    id: "P1.5",
    label: "Evaluador de Sesgos Cognitivos y Trampas Heurísticas en Decisiones",
    desc: "Identificación sistemática de sesgos de confirmación, anclaje, aversión a la pérdida y efecto encuadre en procesos de toma de decisión individual y grupal.",
    audience: "Comités de dirección, analistas de riesgos, gestores de proyectos, consultores estratégicos.",
  },
  {
    id: "P1.6",
    label: "Asistente de Psicoeducación y Reflexión Guiada (Coaching No Directivo)",
    desc: "Facilitación de preguntas reflexivas abiertas basadas en el método socrático para autoconocimiento, sin emitir diagnósticos ni directrices prescriptivas.",
    audience: "Coaches profesionales, mentores, educadores y personas en procesos de desarrollo personal.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-PSI-01", label: "Guardrail Deontológico No Clínico y Protocolo de Derivación Sanitaria", desc: "Bloqueo estricto ante detección de ideación autolítica o patología clínica severa con entrega de teléfonos de emergencia oficiales." },
  { id: "SEC-PSI-02", label: "Calculador de Distancia Semántica (DAT) y Novedad Conceptual", desc: "Medición de distancia coseno en espacio vectorial para garantizar que las ideas generadas superen el pensamiento obvio." },
  { id: "SEC-PSI-03", label: "Registro Inmutable de Sesiones y Estado Emocional en DuckDB", desc: "Trazabilidad de turnos conversacionales, modos de acompañamiento y flags de seguridad con cifrado local." },
  { id: "SEC-PSI-04", label: "Persistencia Columnar Ultrarrápida y Modo Offline (DuckDB + Parquet)", desc: "Almacenamiento local seguro de transcripciones, métricas psicométricas y árboles de negociación." },
  { id: "SEC-PSI-05", label: "Exportador de Informes de Clima y Mapas de Empatía (PDF / Markdown)", desc: "Generación de resúmenes de tono, análisis de sentimiento agregado y recomendaciones no directivas." },
  { id: "SEC-PSI-06", label: "Detector de Falsas Creencias y Asimetría de Información (ToMBench / ATOMS)", desc: "Rastreo explícito de qué sabe cada parte y qué información permanece oculta en la interacción." },
  { id: "SEC-PSI-07", label: "Filtro Antialucinación Emocional y Prohibición de Pseudo-Terapia", desc: "Restricción severa que impide fingir afecto humano real o emitir juicios de valor moral sobre el usuario." },
  { id: "SEC-PSI-08", label: "Analizador Multidimensional de Emociones (Plutchik / Valence-Arousal)", desc: "Clasificación granular en ejes de valencia afectiva, nivel de activación (arousal) y familias emocionales." },
];

const PSYCHOLOGY_DOMAINS = [
  "Bienestar Conversacional & Escucha Activa No Clínica",
  "Creatividad Aplicada, Pensamiento Lateral & Innovación",
  "Negociación Estratégica, Dinámica de Grupos & Teoría de la Mente",
  "Psicología Organizacional, Clima de Equipo & Liderazgo Empático",
  "Psicología Cognitiva & Análisis de Sesgos en Decisiones",
  "Psicoeducación, Coaching No Directivo & Hábitos Saludables",
];

const COMPUTATION_ENGINES = [
  "Sentence-Transformers / SciPy (Cálculo de distancia semántica DAT y similitud coseno)",
  "DuckDB + Parquet (Almacén analítico columnar cifrado para logs de diálogo y sesiones)",
  "Pydantic v2 (Modelos de validación para estados emocionales y turnos conversacionales)",
  "NLTK / spaCy (Extracción de marcadores lingüísticos implícitos y hedges)",
  "Matplotlib / Seaborn (Visualización de mapas de valencia-arousal y gráficos radar)",
  "ReportLab / Markdown Renderer (Generación de informes de clima emocional y reflexión)",
];

const PSYCHOLOGY_METRICS = [
  { id: "active_listening_score", label: "Índice de Escucha Activa y Validación (Empathetic Scale)", cat: "Inteligencia Emocional", desc: "Calidad y calidez en la respuesta empática sin invalidación afectiva ni consejos no solicitados." },
  { id: "implicit_emotion_f1", label: "F1-Score en Reconocimiento Emocional Implícito", cat: "Inteligencia Emocional", desc: "Detección de estados afectivos subyacentes en mensajes con texto aparentemente neutro." },
  { id: "dat_semantic_distance", label: "Distancia Semántica Divergente (DAT Score)", cat: "Creatividad", desc: "Grado de novedad e imprevisibilidad entre conceptos generados en espacio vectorial." },
  { id: "tom_false_belief_acc", label: "Acierto en Razonamiento de Falsas Creencias (BigToM)", cat: "Teoría de la Mente", desc: "Precisión al inferir creencias erróneas de la contraparte en la interacción estratégica." },
  { id: "epistemic_tracking_score", label: "Seguimiento Epistémico Conversacional (CogToM)", cat: "Teoría de la Mente", desc: "Consistencia en rastrear la evolución del conocimiento de cada interlocutor turno a turno." },
  { id: "deescalation_safety_rate", label: "Tasa de Desescalada Segura en Crisis Emocional", cat: "Seguridad & Deontología", desc: "Eficacia en modular la tensión sin validar conductas lesivas ni cruzar a territorio clínico." },
  { id: "cognitive_bias_detection", label: "Sensibilidad en Detección de Sesgos Heurísticos", cat: "Psicología Cognitiva", desc: "Capacidad para identificar trampas de razonamiento como el sesgo de confirmación o anclaje." },
  { id: "empathic_resonance_index", label: "Índice de Resonancia y Clima Afectivo (Vox Emotiva)", cat: "Comunicación & Clima", desc: "Equilibrio entre asertividad, claridad y consideración interpersonal en textos corporativos." },
];

const VALIDATION_MODELS = [
  "Doble Etapa: Razonamiento Afectivo Claude 3.7 Sonnet + Agente de Escalada de Crisis Ánima",
  "Validación Heurística Determinista de Marcadores Lingüísticos de Tono y Tensión",
  "Cálculo Matemático Vectorial de Distancia Semántica DAT para Respuestas Creativas",
  "Auditoría de Protocolos de Seguridad y Desescalada No Clínica",
];

const SAFETY_GUARDRAILS = [
  "Aislamiento Deontológico: Prohibición Absoluta de Diagnóstico Clínico o Prescripción Terapéutica",
  "Protocolo Inmutable de Derivación: Bloqueo de Diálogo y Entrega de Teléfonos de Emergencia ante Crisis",
  "Transparencia de Identidad: Recordatorio de Naturaleza Artificial del Asistente sin Fingir Consciencia",
  "Prohibición de Pseudo-Terapia: Enfoque Exclusivo en Escucha Activa y Coaching Reflexivo No Directivo",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard interactivo con visores de estado emocional, radar de empatía y chat adaptativo)",
  "FastAPI + React / Next.js (Portal de bienestar y reflexión guiada con perfiles de privacidad estricta)",
  "Flet (Aplicación de escritorio local .exe para sesiones de coaching sin conexión externa)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (Almacén analítico columnar cifrado para series de estado emocional)",
  "SQLite con Cifrado Local SQLCipher para Privacidad Absoluta de Sesiones",
  "Almacén Estructurado en Ficheros JSON-LD y Markdown de Reflexión",
  "Base de Datos en Memoria para Sesiones de Simulación de Negociación Temporales",
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function getAutoMetrics(primaryId, secondaryIds) {
  const auto = new Set();
  if (primaryId === "P1.1") ["active_listening_score", "implicit_emotion_f1", "deescalation_safety_rate"].forEach(m => auto.add(m));
  if (primaryId === "P1.2") ["dat_semantic_distance"].forEach(m => auto.add(m));
  if (primaryId === "P1.3") ["tom_false_belief_acc", "epistemic_tracking_score"].forEach(m => auto.add(m));
  if (primaryId === "P1.4") ["empathic_resonance_index", "implicit_emotion_f1"].forEach(m => auto.add(m));
  if (primaryId === "P1.5") ["cognitive_bias_detection"].forEach(m => auto.add(m));
  if (primaryId === "P1.6") ["active_listening_score", "deescalation_safety_rate"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-PSI-01")) ["deescalation_safety_rate"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-PSI-02")) ["dat_semantic_distance"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-PSI-06")) ["tom_false_belief_acc", "epistemic_tracking_score"].forEach(m => auto.add(m));
  return [...auto];
}

function getAutoStorage(secondaryIds, primaryId) {
  if (primaryId === "P1.1" || secondaryIds.includes("SEC-PSI-03") || secondaryIds.includes("SEC-PSI-04")) {
    return STORAGE_ENGINES[0]; // DuckDB + Parquet
  }
  return "";
}

function needsValidationStep(primaryId, secondaryIds) {
  return primaryId === "P1.1" || primaryId === "P1.4" || primaryId === "P1.6" || secondaryIds.includes("SEC-PSI-01") || secondaryIds.includes("SEC-PSI-07");
}

// â”€â”€â”€ Generador del informe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function generateReport(data) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const primary = PRIMARY_TASKS.find(t => t.id === data.primaryTask);
  const secondaries = SECONDARY_TASKS.filter(s => data.secondaryTasks.includes(s.id));
  const metrics = PSYCHOLOGY_METRICS.filter(m => data.selectedMetrics.includes(m.id));
  const appSlug = (data.appName || "psych_app").toLowerCase().replace(/\s+/g, "_");
  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);
  const hasSEC01 = data.secondaryTasks.includes("SEC-PSI-01");
  const hasSEC02 = data.secondaryTasks.includes("SEC-PSI-02");
  const hasSEC03 = data.secondaryTasks.includes("SEC-PSI-03");
  const hasSEC04 = data.secondaryTasks.includes("SEC-PSI-04");
  const hasSEC05 = data.secondaryTasks.includes("SEC-PSI-05");
  const hasSEC06 = data.secondaryTasks.includes("SEC-PSI-06");
  const hasSEC07 = data.secondaryTasks.includes("SEC-PSI-07");
  const hasSEC08 = data.secondaryTasks.includes("SEC-PSI-08");

  const metricsByCategory = metrics.reduce((acc, m) => {
    if (!acc[m.cat]) acc[m.cat] = [];
    acc[m.cat].push(m);
    return acc;
  }, {});

  const treeLines = [
    appSlug + "/",
    "â”œâ”€â”€ src/",
    "â”‚   â”œâ”€â”€ __init__.py",
    "â”‚   â”œâ”€â”€ config.py                 # Parámetros de diálogo, umbrales de carga emocional y protocolos de seguridad",
    "â”‚   â”œâ”€â”€ schemas.py                # Modelos Pydantic v2 para estados emocionales, turnos y árboles de negociación" + (hasSEC07 ? "\nâ”‚   â”‚                             # â†’ incluye middleware Guardrails Deontológicos No Clínicos (BR-PSI-05)" : ""),
    data.primaryTask === "P1.1" ? "â”‚   â”œâ”€â”€ empathic_engine.py        # Modulador de escucha activa y respuestas no clínicas (BR-PSI-01)" : null,
    hasSEC01 || data.primaryTask === "P1.1" ? "â”‚   â”œâ”€â”€ crisis_guardrail.py       # Detector de señales críticas y protocolo de derivación oficial" : null,
    data.primaryTask === "P1.2" || hasSEC02 ? "â”‚   â”œâ”€â”€ divergent_ideation.py     # Motor de pensamiento divergente y cálculo de distancia DAT (BR-PSI-02)" : null,
    data.primaryTask === "P1.3" || hasSEC06 ? "â”‚   â”œâ”€â”€ tom_simulator.py          # Simulador de negociación con Teoría de la Mente y asimetrías (BR-PSI-03)" : null,
    data.primaryTask === "P1.4" || hasSEC08 ? "â”‚   â”œâ”€â”€ tone_auditor.py           # Analizador de resonancia afectiva, hedges y clima de comunicaciones" : null,
    data.primaryTask === "P1.5" ? "â”‚   â”œâ”€â”€ bias_detector.py          # Evaluador de sesgos cognitivos y trampas heurísticas" : null,
    data.primaryTask === "P1.6" ? "â”‚   â”œâ”€â”€ reflective_coaching.py    # Facilitador de preguntas reflexivas socráticas no directivas" : null,
    "â”‚   â”œâ”€â”€ storage.py                # " + (hasSEC04 ? "DuckDB + Parquet (BR-PSI-04) con registro inmutable de sesiones y estado" : "Capa de persistencia psicológica"),
    "â”‚   â”œâ”€â”€ reporting.py              # Generador de informes de clima emocional y mapas de empatía (PDF / Markdown)",
    "â”‚   â””â”€â”€ ui/",
    "â”‚       â”œâ”€â”€ __init__.py",
    "â”‚       â”œâ”€â”€ components.py         # Visores de tono emocional, gráficos radar de empatía y paneles de diálogo",
    "â”‚       â””â”€â”€ main_view.py          # Dashboard interactivo y panel del facilitador/usuario",
    "â”œâ”€â”€ tests/",
    "â”‚   â”œâ”€â”€ test_schemas.py           # Validación de modelos de datos conversacionales",
    hasSEC01 ? "â”‚   â”œâ”€â”€ test_crisis_guardrail.py  # Batería de pruebas de seguridad y derivación inmediata ante ideación crítica" : null,
    data.primaryTask === "P1.2" ? "â”‚   â””â”€â”€ test_dat_distance.py      # Casos de prueba de cálculo de distancia semántica vectorial" : null,
    "â”œâ”€â”€ data/                         # Datasets de validación emocional, ontologías y caché local",
    "â”œâ”€â”€ requirements.txt              # pydantic, duckdb, scipy, requests, pytest",
    "â””â”€â”€ main.py                       # Punto de entrada de la aplicación de psicología/creatividad",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "P1.1" ? "- **BR-PSI-01 (Ánima AI):** Modulador empático activado; adaptación de tono por turno; protocolo de desescalada activo." : null,
    data.primaryTask === "P1.2" ? "- **BR-PSI-02 (Mente Abierta):** Motor divergente activado; cálculo de distancia DAT en espacio vectorial; denial prompting habilitado." : null,
    data.primaryTask === "P1.3" ? "- **BR-PSI-03 (Ágora Táctica):** Simulador ToM activado; seguimiento epistémico de asimetrías de información turno a turno." : null,
    hasSEC04 ? "- **BR-PSI-04 (Persistencia Analítica):** Almacén columnar preconfigurado en DuckDB + Parquet para series de estado emocional cifradas." : null,
    hasSEC07 ? "- **BR-PSI-05 (Guardrail Deontológico):** Prohibición estricta de emitir diagnósticos clínicos o fingir relación terapéutica humana." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de verificación y rigor deontológico:** " + data.validationModel,
        "- **Guardrail de seguridad profesional:** " + data.safetyGuardrail,
        "- **Principio de No-Intervención Clínica:** El sistema opera exclusivamente en el ámbito del bienestar, la escucha activa y la creatividad; nunca en la psicoterapia clínica.",
        "- **Protocolo Inmutable de Derivación:** Ante cualquier indicador de ideación autolítica o crisis severa, el sistema detiene el diálogo y entrega recursos de ayuda profesional oficiales.",
        "- **Trazabilidad Inmutable:** Cada sesión y evaluación queda registrada con sellado temporal en DuckDB respetando la privacidad del usuario.",
      ].join("\n")
    : "La aplicación opera en modo de cálculo divergente o simulación estratégica de negociación.";

  const qaLines = [
    "1. **Pruebas de Red-Teaming de Seguridad en Crisis:** Batería de 100+ escenarios de alta carga emocional simulada; el sistema debe derivar a recursos oficiales en el 100% de los casos críticos.",
    "2. **Validación de Distancia Semántica DAT:** Comprobación matemática de cálculo de distancia coseno frente a benchmarks de creatividad divergente.",
    "3. **Prueba de Consistencia en Teoría de la Mente:** Verificación de seguimiento epistémico en diálogos asimétricos sin filtración de información oculta.",
    "4. **Prueba de Privacidad y Cifrado:** Comprobación de almacenamiento seguro y anonimizado en DuckDB.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACIÃ“N TÃ‰CNICA",
    "## Proyecto de Software de Psicología & Creatividad: " + data.appName,
    "",
    "**Fecha de Generación:** " + now,
    "**Área Horizon:** Psicología, Creatividad & Análisis del Comportamiento",
    "**Arquitecto / Diseñador:** " + (data.authorName || "Horizon User"),
    "**Versión del Documento:** v1.0.0 (Especificación Formal Psicométrica y Creativa)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y Propósito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **Descripción del núcleo funcional:** " + (primary?.desc || ""),
    "- **Público objetivo:** " + (primary?.audience || ""),
    "- **Dominios psicológicos y aplicados:** " + data.psychologyDomains.join(", "),
    "- **Motores y librerías de procesamiento:** " + data.computationEngines.join(", "),
    "",
    "**Exclusiones explícitas:** El sistema NO realiza diagnósticos psiquiátricos ni psicológicos clínicos, NO proporciona psicoterapia reglada y NO sustituye la atención médica o psicológica de un facultativo colegiado.",
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
    "### 3. Catálogo de Métricas y Rigor Científico",
    "",
    "El sistema implementará y monitorizará las siguientes métricas de empatía, creatividad y cognición:",
    "",
    metricsSection || "_No se han seleccionado métricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de Seguridad Deontológica y Derivación en Crisis",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack Tecnológico y Estructura de Scripts Python",
    "",
    "- **Capa de Presentación (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos:** " + data.storageEngine,
    "- **Validación de Datos:** Pydantic v2 con esquemas de estado emocional y tipado estricto.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y Validación (QA Deontológico)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. Cláusula de Deontología y Descargo de Responsabilidad No Clínica",
    "",
    "> **AVISO Ã‰TICO, DEONTOLÃ“GICO Y SANITARIO OBLIGATORIO**",
    ">",
    "> Esta especificación técnica y cualquier software desarrollado a partir de ella tiene carácter **exclusivamente de herramienta de apoyo al bienestar conversacional, la creatividad aplicada y el entrenamiento en negociación**.",
    ">",
    "> - **NO constituye tratamiento psicológico, psicoterapia ni diagnóstico de salud mental**.",
    "> - Si el usuario experimenta malestar psicológico severo, ideación lesiva o crisis emocional, el sistema está obligado a **derivar inmediatamente a los servicios de salud y líneas telefónicas oficiales de emergencia** (ej. 024 / 112 en España).",
    "> - El asistente recuerda en todo momento su condición de software basado en IA y no finge consciencia ni afecto humano real.",
    ">",
    "> Diseñado en **Horizon â€” Centro Interactivo de IA Aplicada.** Laboratorio de Psicología & Creatividad.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de Especificación Técnica â€” Generado automáticamente por Horizon PsychAppWizard v1.0_",
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
          className="h-full bg-rose-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
              i + 1 < step
                ? "bg-rose-600 text-white"
                : i + 1 === step
                ? "bg-rose-600 text-white ring-4 ring-rose-600/20"
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
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-sm transition-colors"
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
      className="w-full bg-dark/[0.02] border border-dark/12 text-dark text-sm rounded-sm px-3.5 py-2.5 focus:outline-hidden focus:border-rose-500 placeholder:text-dark/25 transition-colors"
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
              ? "border-rose-500/40 bg-rose-50/30"
              : "border-dark/10 hover:border-dark/20 hover:bg-dark/[0.01]"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            value === (opt.id || opt) ? "border-rose-600" : "border-dark/25"
          }`}>
            {value === (opt.id || opt) && <div className="w-2 h-2 rounded-full bg-rose-600" />}
          </div>
          <input type="radio" className="sr-only" checked={value === (opt.id || opt)} onChange={() => onChange(opt.id || opt)} />
          <div>
            {opt.label ? (
              <>
                <p className="text-sm font-semibold text-dark"><span className="text-rose-600 text-xs mr-1.5">{opt.id}</span>{opt.label}</p>
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
              isChecked ? "border-rose-500/40 bg-rose-50/30" : isDisabled ? "border-dark/6 opacity-40 cursor-not-allowed" : "border-dark/10 hover:border-dark/20"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${isChecked ? "border-rose-600 bg-rose-600" : "border-dark/25"}`}>
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={isChecked} disabled={isDisabled} onChange={() => !isDisabled && toggle(opt.id || opt)} />
            <div>
              {opt.label ? (
                <>
                  <p className="text-sm font-medium text-dark"><span className="text-xs text-rose-600 mr-1">[{opt.id}]</span>{opt.label}</p>
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
            value === opt ? "border-rose-500/40 bg-rose-50/30" : "border-dark/10 hover:border-dark/20"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${value === opt ? "border-rose-600" : "border-dark/25"}`}>
            {value === opt && <div className="w-2 h-2 rounded-full bg-rose-600" />}
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
  psychologyDomains: [],
  computationEngines: [],
  selectedMetrics: [],
  validationModel: "",
  safetyGuardrail: "",
  uiFramework: "",
  storageEngine: "",
});

export default function WizardPsicologia() {
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
      if (data.psychologyDomains.length === 0) e.psychologyDomains = "Selecciona al menos un dominio psicológico.";
      if (data.computationEngines.length === 0) e.computationEngines = "Selecciona al menos un motor de procesamiento.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una métrica psicométrica/cognitiva.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de verificación deontológica.";
      if (!data.safetyGuardrail) e.safetyGuardrail = "Selecciona el guardrail de seguridad profesional.";
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
    a.download = `informe_${(data.appName || "psych_app").toLowerCase().replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);

  return (
    <div className="min-h-full bg-[#F7F6F2]">
      <div className="max-w-[820px] mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-8">
          <Link to="/areas/psicologia" className="inline-flex items-center gap-1.5 text-xs text-dark/40 hover:text-dark transition-colors mb-6">
            <ArrowLeft size={13} /> Laboratorio de Psicología
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center shrink-0 text-rose-600 font-display text-xl">ðŸ§ </div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                Diseñador de Proyectos â€” Psicología & Creatividad
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicación psicológica y creativa paso a paso con escucha activa, distancia semántica y rigor deontológico.
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
                <p className="text-dark/45 text-sm mb-6">Selecciona el núcleo funcional que definirá la arquitectura de tu aplicación de psicología o creatividad.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="Será el título de tu especificación técnica psicométrica y creativa.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Ánima AI, Mente Abierta, Ágora Táctica, Vox Emotivaâ€¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias, equipo de investigación o consultoría.">Diseñador / Equipo de Psicología</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Facilitador de Bienestar, Consultor de Innovaciónâ€¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la función psicológica o creativa principal. Esto determinará los guardrails deontológicos y métricas requeridas.">Tarea principal de la aplicación</FieldLabel>
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
                <p className="text-dark/45 text-sm mb-6">Añade hasta <strong>4 capacidades cognitivas y de seguridad</strong> para robustecer el sistema.</p>

                <div className="bg-rose-500/[0.04] border border-rose-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 â€” Ámbito Psicológico & Motores</h2>
                <p className="text-dark/45 text-sm mb-6">Configura los campos de la cognición y las librerías de procesamiento del lenguaje y cálculo vectorial.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Áreas teóricas y ramas aplicadas de la psicología.">Dominios psicológicos y aplicados</FieldLabel>
                    <CheckGroup options={PSYCHOLOGY_DOMAINS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.psychologyDomains} onChange={set("psychologyDomains")} max={6} />
                    {errors.psychologyDomains && <p className="text-red-500 text-xs mt-1.5">{errors.psychologyDomains}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Librerías de análisis vectorial, estado conversacional y cálculo psicométrico.">Motores y librerías de procesamiento</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 â€” Catálogo de Métricas Psicométricas</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las métricas de empatía, creatividad divergente y Teoría de la Mente que evaluará el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-rose-800">
                    âœ“ {data.selectedMetrics.length} métrica{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automáticamente según tu tarea principal.
                  </div>
                )}

                {["Inteligencia Emocional", "Creatividad", "Teoría de la Mente", "Seguridad & Deontología", "Psicología Cognitiva", "Comunicación & Clima"].map(cat => (
                  <div key={cat} className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-dark/40 mb-2.5">{cat}</p>
                    <div className="space-y-1.5">
                      {PSYCHOLOGY_METRICS.filter(m => m.cat === cat).map(m => {
                        const isChecked = data.selectedMetrics.includes(m.id);
                        return (
                          <label key={m.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? "border-rose-500/30 bg-rose-50/30" : "border-dark/8 hover:border-dark/15"}`}>
                            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${isChecked ? "border-rose-600 bg-rose-600" : "border-dark/20"}`}>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 â€” Deontología y Guardrails de Seguridad</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-rose-800 flex items-start gap-2">
                      <Heart size={16} className="shrink-0 mt-0.5 text-rose-600" />
                      Este paso está activo para garantizar la no-intervención clínica, la derivación inmediata en crisis y la transparencia del sistema.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de modulación afectiva y supervisión de seguridad.">Modelo de verificación deontológica</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="Restricción de seguridad activa para evitar extralimitaciones clínicas.">Guardrail de seguridad profesional</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios éticos y deontológicos (activados por diseño)</p>
                        {[
                          "Principio de No-Intervención Clínica: acompañamiento y reflexión no directiva sin diagnósticos psiquiátricos.",
                          "Protocolo de Derivación Inmediata: entrega de números oficiales de ayuda en situaciones de crisis emocional severa.",
                          "Trazabilidad Inmutable: registro cifrado de sesiones y estados de ánimo en DuckDB con privacidad total.",
                        ].map(c => (
                          <div key={c} className="flex items-start gap-2.5 mb-2 last:mb-0">
                            <div className="w-4 h-4 rounded bg-rose-100 border border-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} className="text-rose-700" />
                            </div>
                            <p className="text-[12.5px] text-dark/60 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo ideación creativa o simulación estratégica</strong> sin acompañamiento directo de bienestar personal.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides añadir escucha activa o coaching reflexivo, vuelve al <strong>Paso 2</strong> y activa el módulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-PSI-01</code> o <code className="bg-dark/5 px-1 rounded text-xs">SEC-PSI-07</code>.
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
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y librerías que darán soporte a tu aplicación de psicología y creatividad.</p>

                {data.secondaryTasks.includes("SEC-PSI-04") && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-rose-800">
                    âœ“ Persistencia analítica preconfigurada en <strong>DuckDB + Parquet</strong> por el módulo SEC-PSI-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para facilitadores, coaches, usuarios o analistas.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Dónde y cómo se almacenarán los registros de sesiones y métricas psicométricas.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar Especificación Psicológica" />
              </StepCard>
            )}
          </>
        )}

        {/* â”€â”€ PANTALLA FINAL: INFORME â”€â”€ */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-rose-100 border border-rose-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-rose-700" />
                </div>
                <h2 className="font-display text-[24px] text-dark">Especificación psicológica y creativa generada con éxito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria técnica para <strong className="text-dark">{data.appName}</strong> está lista para desarrollo y auditoría deontológica.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={downloadMd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-sm transition-colors"
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

            <div className="mt-6 bg-rose-50 border border-rose-200 rounded-2xl px-6 py-5 flex gap-3">
              <Heart size={18} className="text-rose-600 shrink-0 mt-0.5" />
              <p className="text-[13px] text-rose-800 leading-relaxed">
                <strong>Aviso ético y de salud:</strong> Este informe especifica una arquitectura de software de bienestar conversacional y creatividad. No constituye tratamiento clínico ni sustituye la atención de un psicólogo o psiquiatra colegiado.
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
              <span className="text-rose-600 mt-1.5 shrink-0">â€¢</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (/^\d+\. /.test(line)) {
          const num = line.match(/^(\d+)\./)[1];
          return (
            <div key={i} className="flex items-start gap-2.5 pl-2">
              <span className="text-rose-600 font-semibold text-xs mt-1 shrink-0 w-4">{num}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, "")) }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-4 border-rose-500 bg-rose-50 px-4 py-2 rounded-r-lg text-[13px] text-rose-950 my-2">
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

