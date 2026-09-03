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

// â”€â”€â”€ Constantes de datos (Medicina & IA ClÃ­nica) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRIMARY_TASKS = [
  {
    id: "M1.1",
    label: "Auditor y Verificador ClÃ­nico de Afirmaciones MÃ©dicas (Mente MÃ©dica)",
    desc: "SegmentaciÃ³n atÃ³mica de textos mÃ©dicos y contraste contra fuentes verificadas (PubMed, bases de interacciones farmacolÃ³gicas, guÃ­as clÃ­nicas) con etiquetado VERIFIED/UNVERIFIED/CONTRADICTED.",
    audience: "ComitÃ©s de calidad asistencial, auditores clÃ­nicos, investigadores biomÃ©dicos, facultativos.",
  },
  {
    id: "M1.2",
    label: "Pipeline de ExtracciÃ³n e Interoperabilidad HL7 FHIR R4 (Nexo FHIR)",
    desc: "TransformaciÃ³n de texto libre, notas de evoluciÃ³n y recetas escaneadas en recursos JSON conformes a FHIR R4 (Patient, Condition, MedicationRequest, Observation) con codificaciÃ³n CIE-10/SNOMED/RxNorm/LOINC.",
    audience: "Departamentos de informÃ¡tica mÃ©dica, integradores de EHR/HIS hospitalarios, ingenieros de datos de salud.",
  },
  {
    id: "M1.3",
    label: "Sistema de Soporte de Adherencia y Monitoreo Entre Consultas (HigÃ­a IA)",
    desc: "AcompaÃ±amiento conversacional continuo para control de tomas farmacolÃ³gicas, detecciÃ³n de efectos adversos y alertas tempranas, blindado con guardrail de no-maleficencia clÃ­nica.",
    audience: "Equipos de enfermerÃ­a, unidades de crÃ³nicos y telemedicina, farmacia hospitalaria.",
  },
  {
    id: "M1.4",
    label: "Motor de Triaje y Soporte al DiagnÃ³stico Diferencial",
    desc: "ClasificaciÃ³n de urgencia y generaciÃ³n jerÃ¡rquica de hipÃ³tesis diagnÃ³sticas ordenadas por severidad y probabilidad, integrando sÃ­ntomas y antecedentes clÃ­nicos.",
    audience: "Servicios de urgencias, centros de atenciÃ³n primaria, plataformas de tele-triaje.",
  },
  {
    id: "M1.5",
    label: "Calculadora MÃ©dica Especializada y Razonamiento FisiopatolÃ³gico",
    desc: "CÃ¡lculo computacional exacto de escalas clÃ­nicas validadas (GFR, CHADS2-VASc, MELD, Framingham, Apache II) integrado con razonamiento biomÃ©dico multicadena.",
    audience: "Especialistas clÃ­nicos, unidades de cuidados intensivos, analistas farmacocinÃ©ticos.",
  },
  {
    id: "M1.6",
    label: "Analizador y Resumidor ClÃ­nico de Historias ElectrÃ³nicas (EHR)",
    desc: "GeneraciÃ³n de resÃºmenes longitudinales estructurados y notas SOAP a partir de historiales clÃ­nicos extensos, preservando la fidelidad temporal y de tratamientos.",
    audience: "MÃ©dicos en consulta ambulatoria, servicios de admisiÃ³n, departamentos de documentaciÃ³n clÃ­nica.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-MED-01", label: "Guardrail de Seguridad Do-No-Harm y Rechazo de Contraindicaciones", desc: "Filtro activo que bloquea dosis letales, incompatibilidades farmacolÃ³gicas y sesgos demogrÃ¡ficos de diagnÃ³stico." },
  { id: "SEC-MED-02", label: "Normalizador TerminolÃ³gico Automatizado (SNOMED / CIE-10 / RxNorm / LOINC)", desc: "ResoluciÃ³n de entidades clÃ­nicas extraÃ­das hacia cÃ³digos terminolÃ³gicos estÃ¡ndar con manejo de casos 'UNRESOLVED'." },
  { id: "SEC-MED-03", label: "Conector y Validador de Conformidad FHIR R4 (HAPI FHIR / fhir.resources)", desc: "ValidaciÃ³n estricta de esquemas FHIR R4 antes de la persistencia y conectividad con servidores hospitalarios." },
  { id: "SEC-MED-04", label: "Log de AuditorÃ­a Inmutable y Trazabilidad por AfirmaciÃ³n en DuckDB", desc: "Registro inmutable de fuentes bibliogrÃ¡ficas, confianza del modelo, timestamp y justificaciÃ³n de cada afirmaciÃ³n." },
  { id: "SEC-MED-05", label: "Conector con APIs BibliogrÃ¡ficas BiomÃ©dicas (PubMed / NCBI / DrugBank)", desc: "RecuperaciÃ³n dinÃ¡mica de evidencia cientÃ­fica y fichas tÃ©cnicas de principios activos en tiempo de ejecuciÃ³n." },
  { id: "SEC-MED-06", label: "Sistema de Alertas Sanitarias Proactivas y Escalado Urgente", desc: "Disparador de notificaciones urgentes a profesionales vÃ­a Webhook, Telegram o integraciÃ³n hospitalaria ante sÃ­ntomas crÃ­ticos." },
  { id: "SEC-MED-07", label: "Filtro de Seguridad Conversacional AntialucinaciÃ³n y No-PrescripciÃ³n", desc: "RestricciÃ³n severa que impide la recomendaciÃ³n clÃ­nica activa o modificaciÃ³n terapÃ©utica en diÃ¡logos con pacientes." },
  { id: "SEC-MED-08", label: "Exportador de Informes ClÃ­nicos Estructurados (PDF / JSON-LD / HL7 CDA)", desc: "GeneraciÃ³n de documentos clÃ­nicos firmados electrÃ³nicamente con metadatos estandarizados para archivo hospitalario." },
];

const CLINICAL_DOMAINS = [
  "AtenciÃ³n Primaria & Medicina Familiar",
  "Urgencias, Emergencias & Triaje Hospitalario",
  "CardiologÃ­a & Riesgo Cardiovascular",
  "OncologÃ­a & Medicina de PrecisiÃ³n",
  "FarmacologÃ­a ClÃ­nica & GestiÃ³n de MedicaciÃ³n",
  "NeurologÃ­a, Salud Mental & PsicometrÃ­a",
  "EndocrinologÃ­a & Manejo de PatologÃ­as CrÃ³nicas",
];

const INPUT_DOCUMENTS = [
  "Texto libre mÃ©dico / Notas de evoluciÃ³n y evoluciÃ³n clÃ­nica",
  "Informes de alta hospitalaria y epicrisis",
  "Prescripciones mÃ©dicas y recetas farmacolÃ³gicas digitalizadas (OCR)",
  "Resultados analÃ­ticos de laboratorio (paneles bioquÃ­micos / hematologÃ­a)",
  "Historias clÃ­nicas electrÃ³nicas completas (Bundles FHIR / HL7 CDA)",
  "GuÃ­as de prÃ¡ctica clÃ­nica y literatura biomÃ©dica (PubMed / Cochrane)",
];

const CLINICAL_METRICS = [
  { id: "accuracy_usmle", label: "PrecisiÃ³n ClÃ­nica (MedQA / USMLE)", cat: "PrecisiÃ³n & QA BiomÃ©dica", desc: "PuntuaciÃ³n porcentual en bancos de conocimiento clÃ­nico estructurado y especialidades." },
  { id: "hallucination_rate", label: "Tasa de AlucinaciÃ³n por AfirmaciÃ³n", cat: "PrecisiÃ³n & QA BiomÃ©dica", desc: "Porcentaje de afirmaciones no respaldadas o contradictorias respecto a las fuentes biomÃ©dicas." },
  { id: "donoharm_score", label: "Ãndice de No-Maleficencia (DoNoHarm_Bench)", cat: "Seguridad & Ã‰tica ClÃ­nica", desc: "Capacidad del sistema para rechazar activamente recomendaciones peligrosas o contraindicaciones." },
  { id: "bias_detection", label: "DetecciÃ³n de Sesgo DemogrÃ¡fico (MedHELM)", cat: "Seguridad & Ã‰tica ClÃ­nica", desc: "MediciÃ³n de equidad diagnÃ³stica frente a subgrupos poblacionales y variables sociodemogrÃ¡ficas." },
  { id: "fhir_conformity", label: "Conformidad Estricta FHIR R4", cat: "Interoperabilidad & NLP", desc: "Porcentaje de recursos generados que superan la validaciÃ³n sintÃ¡ctica y semÃ¡ntica de perfil HL7 FHIR." },
  { id: "ner_f1", label: "F1-Score en ExtracciÃ³n de Entidades ClÃ­nicas (BLURB)", cat: "Interoperabilidad & NLP", desc: "PrecisiÃ³n y exhaustividad en extracciÃ³n de fÃ¡rmacos, dosis, diagnÃ³sticos y parÃ¡metros de laboratorio." },
  { id: "snomed_coverage", label: "Cobertura de CodificaciÃ³n SNOMED/RxNorm", cat: "Interoperabilidad & NLP", desc: "Ratio de tÃ©rminos clÃ­nicos mapeados con Ã©xito a cÃ³digos estÃ¡ndar oficiales sin ambigÃ¼edad." },
  { id: "triage_sensitivity", label: "Sensibilidad de Triaje y Riesgo Vital", cat: "Triaje & DiagnÃ³stico", desc: "Capacidad de identificar correctamente casos de alta prioridad clÃ­nica sin falsos negativos de gravedad." },
  { id: "calc_precision", label: "PrecisiÃ³n en CÃ¡lculo FisiopatolÃ³gico (MedCalc)", cat: "Triaje & DiagnÃ³stico", desc: "Exactitud matemÃ¡tica en fÃ³rmulas mÃ©dicas complejas (GFR, CHADS2, MELD) con tolerancia cero a errores." },
];

const VALIDATION_MODELS = [
  "Arquitectura de Doble Etapa (Razonamiento ClÃ­nico DeepSeek-R1 + Filtro Do-No-Harm Claude 3.5 Sonnet)",
  "VerificaciÃ³n AfirmaciÃ³n por AfirmaciÃ³n con PubMed API y Base de FÃ¡rmacos",
  "ValidaciÃ³n SintÃ¡ctica y SemÃ¡ntica de Perfiles FHIR R4 (fhir.resources)",
  "Pipeline de Triaje Supervisado con Umbral de Escalado AutomÃ¡tico",
];

const SAFETY_GUARDRAILS = [
  "Aislamiento Estricto de RecomendaciÃ³n ClÃ­nica Activa (Guardrail Anti-PrescripciÃ³n)",
  "Rechazo AutomÃ¡tico de Dosis TÃ³xicas y Cruces de Alergias Conocidas",
  "Filtro de Desescalado y DerivaciÃ³n Obligatoria a Recursos Profesionales",
  "ClÃ¡usula Inmutable de Descargo MÃ©dico en Toda Salida de Texto",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard mÃ©dico interactivo y prototipado rÃ¡pido en local)",
  "FastAPI + React / Next.js (Portal clÃ­nico profesional con autenticaciÃ³n y perfiles de rol)",
  "Flet (AplicaciÃ³n de escritorio local .exe para consultas y estaciones mÃ©dicas aisladas)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (AlmacÃ©n analÃ­tico columnar inmutable para auditorÃ­a clÃ­nica)",
  "Servidor HAPI FHIR Local + Base de Datos FHIR R4",
  "SQLite + SQLAlchemy con Cifrado Local de Datos Sanitarios",
  "PostgreSQL / TimescaleDB con Esquemas JSONB de Historia ClÃ­nica",
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Generador del informe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    "â”œâ”€â”€ src/",
    "â”‚   â”œâ”€â”€ __init__.py",
    "â”‚   â”œâ”€â”€ config.py                 # ConfiguraciÃ³n del entorno, endpoints clÃ­nicos y claves de API",
    "â”‚   â”œâ”€â”€ schemas.py                # Modelos Pydantic v2 y validadores de integridad clÃ­nica",
    data.primaryTask === "M1.1" ? "â”‚   â”œâ”€â”€ claim_extractor.py        # Segmentador de afirmaciones clÃ­nicas atÃ³micas (BR-MED-01)" : null,
    data.primaryTask === "M1.1" || hasSEC05 ? "â”‚   â”œâ”€â”€ pubmed_verifier.py        # Conector NCBI E-Utilities y validador bibliogrÃ¡fico" : null,
    data.primaryTask === "M1.2" || hasSEC03 ? "â”‚   â”œâ”€â”€ fhir_builder.py           # Constructor y validador de recursos HL7 FHIR R4 (BR-MED-02)" : null,
    hasSEC02 ? "â”‚   â”œâ”€â”€ terminology.py            # Mapeo a cÃ³digos CIE-10, SNOMED-CT, RxNorm y LOINC" : null,
    data.primaryTask === "M1.3" ? "â”‚   â”œâ”€â”€ adherence_engine.py       # Planificador de tomas y registro de eventos de adherencia" : null,
    hasSEC01 || hasSEC07 ? "â”‚   â”œâ”€â”€ safety_guardrail.py       # Guardrail Do-No-Harm y detector de contraindicaciones (BR-MED-05)" : null,
    data.primaryTask === "M1.5" ? "â”‚   â”œâ”€â”€ clinical_calculator.py    # Motor determinista de fÃ³rmulas mÃ©dicas (GFR, MELD, CHADS2)" : null,
    "â”‚   â”œâ”€â”€ storage.py                # " + (hasSEC04 ? "DuckDB columnar para auditorÃ­a inmutable de afirmaciones" : "Capa de persistencia clÃ­nica"),
    hasSEC06 ? "â”‚   â”œâ”€â”€ alerts_dispatcher.py      # Gestor de alertas sanitarias y derivaciÃ³n urgente (SEC-MED-06)" : null,
    hasSEC08 ? "â”‚   â”œâ”€â”€ clinical_reporting.py     # Generador de informes clÃ­nicos auditables (PDF / JSON-LD)" : null,
    "â”‚   â””â”€â”€ ui/",
    "â”‚       â”œâ”€â”€ __init__.py",
    "â”‚       â”œâ”€â”€ components.py         # Tarjetas de afirmaciones, badges de verificaciÃ³n y visores FHIR",
    "â”‚       â””â”€â”€ main_view.py          # Dashboard clÃ­nico y panel de operador sanitario",
    "â”œâ”€â”€ tests/",
    "â”‚   â”œâ”€â”€ test_schemas.py           # Pruebas de esquemas Pydantic y serializaciÃ³n",
    "â”‚   â”œâ”€â”€ test_safety_guardrail.py  # Banco de pruebas de no-maleficencia y casos de jailbreak mÃ©dico",
    data.primaryTask === "M1.2" ? "â”‚   â””â”€â”€ test_fhir_conformity.py   # ValidaciÃ³n de conformidad contra perfiles HL7 FHIR R4" : null,
    "â”œâ”€â”€ data/                         # Datasets de prueba, ontologÃ­as y cachÃ© local",
    "â”œâ”€â”€ requirements.txt              # fhir.resources, pydantic, duckdb, requests, pytest",
    "â””â”€â”€ main.py                       # Punto de entrada de la aplicaciÃ³n clÃ­nica",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "M1.1" ? "- **BR-MED-01 (Mente MÃ©dica):** Segmentador atÃ³mico activado; verificaciÃ³n bibliogrÃ¡fica por afirmaciÃ³n; log inmutable en DuckDB." : null,
    data.primaryTask === "M1.2" ? "- **BR-MED-02 (Nexo FHIR):** Constructor FHIR R4 activado; normalizaciÃ³n terminolÃ³gica forzada (SNOMED/CIE-10/RxNorm/LOINC); servidor HAPI preconfigurado." : null,
    data.primaryTask === "M1.3" ? "- **BR-MED-03 (HigÃ­a IA):** Guardrail de no-maleficencia activado; bloqueo estricto de modificaciÃ³n de pautas; seguimiento de eventos en serie temporal." : null,
    data.primaryTask === "M1.5" ? "- **BR-MED-04 (CÃ¡lculo FisiopatolÃ³gico):** FÃ³rmulas deterministas validadas (GFR, CHADS2-VASc, MELD) con tolerancia cero a errores de aproximaciÃ³n." : null,
    hasSEC01 || hasSEC07 ? "- **BR-MED-05 (Seguridad ClÃ­nica):** Middleware Do-No-Harm integrado en todo el flujo de generaciÃ³n; descargo formal reforzado." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de validaciÃ³n y control de calidad:** " + data.validationModel,
        "- **Guardrail de seguridad clÃ­nica principal:** " + data.safetyGuardrail,
        "- **Principio de No-Maleficencia (Do-No-Harm):** ObligaciÃ³n algorÃ­tmica de rechazar activamente recomendaciones con riesgo para el paciente.",
        "- **Trazabilidad por AfirmaciÃ³n:** Cada dato clÃ­nico generado debe asociarse a su fuente primaria y nivel de confianza.",
        "- **Aislamiento de la DecisiÃ³n ClÃ­nica:** El sistema actÃºa como herramienta de apoyo analÃ­tico y nunca como decisor autÃ³nomo.",
      ].join("\n")
    : "La aplicaciÃ³n opera en modo de consulta o procesamiento de datos estructurados. No genera recomendaciones clÃ­nicas activas en tiempo real.";

  const qaLines = [
    "1. **Pruebas de No-Maleficencia (Safety Red-Teaming):** BaterÃ­a de 100+ casos de contraindicaciones y sobredosis simuladas; el sistema debe rechazar el 100% de los intentos.",
    "2. **ValidaciÃ³n de Conformidad HL7 FHIR R4:** VerificaciÃ³n sintÃ¡ctica con librerÃ­a fhir.resources en todos los bundles generados.",
    "3. **Prueba de Concordancia BibliogrÃ¡fica:** ValidaciÃ³n de afirmaciones clÃ­nicas contra PubMed con cÃ¡lculo de F1-Score en evidencia.",
    "4. **Pruebas Unitarias de FÃ³rmulas MatemÃ¡ticas:** ValidaciÃ³n cruzada de cÃ¡lculos mÃ©dicos contra referencias estÃ¡ndar validadas.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACIÃ“N TÃ‰CNICA",
    "## Proyecto de Software MÃ©dico: " + data.appName,
    "",
    "**Fecha de GeneraciÃ³n:** " + now,
    "**Ãrea Horizon:** Medicina, IA ClÃ­nica & Salud Digital",
    "**Arquitecto / DiseÃ±ador:** " + (data.authorName || "Horizon User"),
    "**VersiÃ³n del Documento:** v1.0.0 (EspecificaciÃ³n Formal ClÃ­nica)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y PropÃ³sito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **DescripciÃ³n del nÃºcleo funcional:** " + (primary?.desc || ""),
    "- **PÃºblico objetivo:** " + (primary?.audience || ""),
    "- **Ãreas y especialidades clÃ­nicas:** " + data.clinicalDomains.join(", "),
    "- **TipologÃ­a de documentos de entrada:** " + data.inputDocuments.join(", "),
    "",
    "**Exclusiones explÃ­citas:** El sistema NO emite diagnÃ³sticos mÃ©dicos vinculantes, NO prescribe tratamientos farmacolÃ³gicos de forma autÃ³noma y NO sustituye el juicio clÃ­nico de un profesional sanitario cualificado.",
    "",
    "---",
    "",
    "### 2. Matriz de Arquitectura y MÃ³dulos Complementarios",
    "",
    secondaries.length === 0 ? "_No se han seleccionado mÃ³dulos secundarios._" : secondaries.map(s => "- **[" + s.id + "] " + s.label + ":** " + s.desc).join("\n"),
    "",
    "**Reglas de lÃ³gica condicional aplicadas (Branching Rules):**",
    branchingLines || "_Ninguna regla de branching activada con la configuraciÃ³n actual._",
    "",
    "---",
    "",
    "### 3. CatÃ¡logo de MÃ©tricas y EvaluaciÃ³n ClÃ­nica",
    "",
    "El sistema implementarÃ¡ y monitorizarÃ¡ las siguientes mÃ©tricas de precisiÃ³n y seguridad:",
    "",
    metricsSection || "_No se han seleccionado mÃ©tricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de Seguridad ClÃ­nica y Guardrails Do-No-Harm",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack TecnolÃ³gico y Estructura de Scripts Python",
    "",
    "- **Capa de PresentaciÃ³n (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos ClÃ­nicos:** " + data.storageEngine,
    "- **ValidaciÃ³n de Datos:** Pydantic v2 + fhir.resources con tipado estricto.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y ValidaciÃ³n (QA ClÃ­nico)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. ClÃ¡usula de Cumplimiento Normativo y Descargo de Responsabilidad MÃ©dica",
    "",
    "> **AVISO LEGAL Y CLÃNICO OBLIGATORIO**",
    ">",
    "> Esta especificaciÃ³n tÃ©cnica y cualquier software desarrollado a partir de ella tiene carÃ¡cter **exclusivamente de apoyo tÃ©cnico, organizativo y de investigaciÃ³n biomÃ©dica**.",
    ">",
    "> - **NO constituye asesoramiento mÃ©dico, diagnÃ³stico clÃ­nico ni prescripciÃ³n terapÃ©utica**.",
    "> - **NO sustituye en ningÃºn caso la relaciÃ³n mÃ©dico-paciente ni el juicio clÃ­nico del profesional sanitario**.",
    "> - Todo resultado, resumen o informe emitido por el sistema debe ser **revisado y validado por un facultativo cualificado** antes de cualquier toma de decisiÃ³n asistencial.",
    hasSEC01 || hasSEC07 ? "> - Los mÃ³dulos de IA integran filtros Do-No-Harm que bloquean activamente cualquier intento de recomendaciÃ³n clÃ­nica no autorizada." : null,
    ">",
    "> DiseÃ±ado en **Horizon â€” Centro Interactivo de IA Aplicada.** Laboratorio de Medicina & IA ClÃ­nica.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de EspecificaciÃ³n TÃ©cnica â€” Generado automÃ¡ticamente por Horizon MedAppWizard v1.0_",
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

// â”€â”€â”€ Componente principal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
      if (data.clinicalDomains.length === 0) e.clinicalDomains = "Selecciona al menos una especialidad clÃ­nica.";
      if (data.inputDocuments.length === 0) e.inputDocuments = "Selecciona al menos un tipo de documento.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una mÃ©trica clÃ­nica.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de validaciÃ³n clÃ­nica.";
      if (!data.safetyGuardrail) e.safetyGuardrail = "Selecciona el guardrail de seguridad principal.";
    }
    if (step === 6) {
      if (!data.uiFramework) e.uiFramework = "Selecciona el framework de interfaz clÃ­nica.";
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
                DiseÃ±ador de Proyectos â€” Medicina & IA ClÃ­nica
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicaciÃ³n mÃ©dica paso a paso con rigor tÃ©cnico, trazabilidad bibliogrÃ¡fica y guardrails Do-No-Harm.
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
                <p className="text-dark/45 text-sm mb-6">Selecciona el nÃºcleo funcional que definirÃ¡ la arquitectura de tu aplicaciÃ³n clÃ­nica.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="SerÃ¡ el tÃ­tulo de tu especificaciÃ³n tÃ©cnica clÃ­nica.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Mente MÃ©dica, Nexo FHIR, HigÃ­a Monitor, CardioCheckâ€¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias o servicio hospitalario.">DiseÃ±ador / Servicio ClÃ­nico</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Servicio de Medicina Interna, Unidad de InnovaciÃ³nâ€¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la funciÃ³n clÃ­nica principal. Esto determinarÃ¡ los guardrails y mÃ©tricas requeridas.">Tarea principal de la aplicaciÃ³n</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 2 â€” MÃ³dulos Complementarios</h2>
                <p className="text-dark/45 text-sm mb-6">AÃ±ade hasta <strong>4 capacidades clÃ­nicas y de seguridad</strong> para robustecer el sistema.</p>

                <div className="bg-teal-500/[0.04] border border-teal-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
                  <strong className="text-dark">Tarea principal seleccionada:</strong> [{data.primaryTask}]{" "}
                  {PRIMARY_TASKS.find(t => t.id === data.primaryTask)?.label}
                </div>

                <FieldLabel hint="Selecciona entre 0 y 4 mÃ³dulos secundarios.">MÃ³dulos secundarios</FieldLabel>
                <CheckGroup options={SECONDARY_TASKS} selected={data.secondaryTasks} onChange={handleSecondaryChange} max={4} />
                <p className="text-[11px] text-dark/30 mt-2">{data.secondaryTasks.length} / 4 mÃ³dulos seleccionados</p>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 3 */}
            {step === 3 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 â€” Ãmbito ClÃ­nico & Documental</h2>
                <p className="text-dark/45 text-sm mb-6">Configura las especialidades objetivo y las fuentes de datos clÃ­nicos que procesarÃ¡ el sistema.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Especialidades asistenciales donde operarÃ¡ el sistema.">Especialidades clÃ­nicas</FieldLabel>
                    <CheckGroup options={CLINICAL_DOMAINS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.clinicalDomains} onChange={set("clinicalDomains")} max={7} />
                    {errors.clinicalDomains && <p className="text-red-500 text-xs mt-1.5">{errors.clinicalDomains}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Formato y tipologÃ­a de los documentos clÃ­nicos de entrada.">Tipos de documentos a procesar</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 â€” MÃ©tricas de EvaluaciÃ³n ClÃ­nica</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona los indicadores cuantitativos y de seguridad que evaluarÃ¡ el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-teal-800">
                    âœ“ {data.selectedMetrics.length} mÃ©trica{data.selectedMetrics.length !== 1 ? "s" : ""} clÃ­nica{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automÃ¡ticamente segÃºn tu tarea principal.
                  </div>
                )}

                {["PrecisiÃ³n & QA BiomÃ©dica", "Seguridad & Ã‰tica ClÃ­nica", "Interoperabilidad & NLP", "Triaje & DiagnÃ³stico"].map(cat => (
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 â€” Seguridad ClÃ­nica y Guardrails Do-No-Harm</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-teal-800 flex items-start gap-2">
                      <ShieldCheck size={16} className="shrink-0 mt-0.5 text-teal-600" />
                      Este paso estÃ¡ activo para garantizar la no-maleficencia y la verificaciÃ³n bibliogrÃ¡fica de afirmaciones clÃ­nicas.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de validaciÃ³n y control de calidad de respuestas generadas.">Modelo de verificaciÃ³n clÃ­nica</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="RestricciÃ³n de seguridad activa que rige las salidas del sistema.">Guardrail de seguridad Do-No-Harm</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios Ã©ticos y de seguridad clÃ­nica (activados por diseÃ±o)</p>
                        {[
                          "Principio de No-Maleficencia (Do-No-Harm): rechazo explÃ­cito de combinaciones farmacolÃ³gicas de riesgo.",
                          "Trazabilidad completa afirmaciÃ³n por afirmaciÃ³n con DOI / PMID de PubMed.",
                          "SupervisiÃ³n humana obligatoria (Human-in-the-Loop) en cualquier sugerencia clÃ­nica.",
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
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo estructuraciÃ³n / interoperabilidad FHIR</strong> sin generaciÃ³n conversacional activa hacia pacientes.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides aÃ±adir verificaciÃ³n de respuestas o agentes de adherencia, vuelve al <strong>Paso 2</strong> y activa el mÃ³dulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-MED-01</code>.
                    </div>
                  </div>
                )}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 6 */}
            {step === 6 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 6 â€” Stack TecnolÃ³gico Sanitario</h2>
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y librerÃ­as especializadas para tu aplicaciÃ³n clÃ­nica.</p>

                {data.secondaryTasks.includes("SEC-MED-04") && (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-teal-800">
                    âœ“ Persistencia analÃ­tica preconfigurada en <strong>DuckDB + Parquet</strong> por el mÃ³dulo SEC-MED-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para facultativos o investigadores.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Almacenamiento de datos clÃ­nicos, recursos FHIR y registros de auditorÃ­a.">Motor de persistencia clÃ­nica</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar EspecificaciÃ³n ClÃ­nica" />
              </StepCard>
            )}
          </>
        )}

        {/* â”€â”€ PANTALLA FINAL: INFORME â”€â”€ */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-teal-100 border border-teal-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-teal-700" />
                </div>
                <h2 className="font-display text-[24px] text-dark">EspecificaciÃ³n clÃ­nica generada con Ã©xito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria tÃ©cnica para <strong className="text-dark">{data.appName}</strong> estÃ¡ lista para desarrollo y auditorÃ­a.
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
                  <RefreshCw size={15} /> Crear otro diseÃ±o
                </button>
              </div>
            </div>

            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.05)]">
              <ReportRenderer markdown={report} />
            </div>

            <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl px-6 py-5 flex gap-3">
              <ShieldCheck size={18} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-[13px] text-red-800 leading-relaxed">
                <strong>Aviso de dominio mÃ©dico:</strong> Este informe especifica una arquitectura de software para soporte analÃ­tico e interoperabilidad. No constituye producto sanitario certificado, dispositivo mÃ©dico (MDR) ni sustituto del criterio facultativo.
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
              <span className="text-teal-600 mt-1.5 shrink-0">â€¢</span>
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

