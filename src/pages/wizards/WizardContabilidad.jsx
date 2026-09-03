import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Download } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Calculator } from "lucide-react";

// â”€â”€â”€ Constantes de datos (Contabilidad & ERP) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRIMARY_TASKS = [
  {
    id: "C1.1",
    label: "Motor de ConciliaciÃ³n Bancaria y Propuesta de Asientos (Balance Inteligente)",
    desc: "Cruce automÃ¡tico de extractos bancarios (MT940, CAMT.053, Norma 43, CSV) contra el Libro Mayor del ERP, detecciÃ³n de descuadres y generaciÃ³n de asientos de ajuste sugeridos.",
    audience: "Jefes de contabilidad, departamentos de tesorerÃ­a, controllers financieros, auditores internos.",
  },
  {
    id: "C1.2",
    label: "Pipeline de Ingesta OCR y Cumplimiento Fiscal de Facturas (Factura Flujo)",
    desc: "ExtracciÃ³n estructurada de facturas y tickets (proveedor, CIF/NIF, bases imponibles, desglose de IVA/IRPF, retenciones) y verificaciÃ³n de reglas tributarias (SII / VeriFactu / TicketBAI).",
    audience: "AsesorÃ­as fiscales y laborales, departamentos de cuentas a pagar (AP), administrativos contables.",
  },
  {
    id: "C1.3",
    label: "Auditor de Activos Fijos y Cuadros de AmortizaciÃ³n (Auditor Activos)",
    desc: "DetecciÃ³n de desviaciones en tablas de amortizaciÃ³n, vidas Ãºtiles mal asignadas, activos duplicados o dados de baja errÃ³neamente con cÃ¡lculo de cuotas lineales y regresivas.",
    audience: "Auditores financieros externos, controllers de gestiÃ³n de activos, directores financieros (CFO).",
  },
  {
    id: "C1.4",
    label: "Detector de AnomalÃ­as y Fraude en Notas de Gastos (Gasto Seguro)",
    desc: "AnÃ¡lisis de justificantes de gastos corporativos, detecciÃ³n de duplicados temporales, gastos no laborables y patrones atÃ­picos de dietas, kilometraje y representaciÃ³n.",
    audience: "Departamentos de recursos humanos, compliance corporativo, comitÃ©s de auditorÃ­a interna.",
  },
  {
    id: "C1.5",
    label: "Motor de Cierre Contable y AsignaciÃ³n de Centros de Coste (Cost Allocation)",
    desc: "Reparto analÃ­tico de costes indirectos, regularizaciÃ³n de existencias, cÃ¡lculo de provisiones y generaciÃ³n de balances de comprobaciÃ³n de sumas y saldos.",
    audience: "Controllers financieros, analistas de costes, directores de administraciÃ³n y finanzas.",
  },
  {
    id: "C1.6",
    label: "Conector de IntegraciÃ³n e Interoperabilidad ERP (SAP / Sage / Holded / A3)",
    desc: "SincronizaciÃ³n bidireccional y normalizaciÃ³n de asientos entre sistemas ERP heterogÃ©neos, garantizando integridad referencial y pista de auditorÃ­a inmutable.",
    audience: "Integradores de ERP, consultores funcionales contables, directores de sistemas IT.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-CONT-01", label: "Validador de Reglas Fiscales (IVA, IRPF, SII / VeriFactu / VIES)", desc: "VerificaciÃ³n automÃ¡tica de tipos impositivos vigentes, inversiÃ³n del sujeto pasivo y validaciÃ³n de CIF/NIF en bases oficiales." },
  { id: "SEC-CONT-02", label: "Pista de AuditorÃ­a Completa (Audit Trail) y Trazabilidad en DuckDB", desc: "Registro inmutable con sellado temporal UTC, usuario, documento fuente y hash SHA-256 para cada propuesta contable." },
  { id: "SEC-CONT-03", label: "Sistema de NotificaciÃ³n y AprobaciÃ³n de Asientos por Umbrales", desc: "Enrutamiento automÃ¡tico hacia responsables contables para asientos o ajustes superiores a umbrales configurables (ej. 10.000â‚¬)." },
  { id: "SEC-CONT-04", label: "Almacenamiento Columnar UltrarrÃ¡pido y Modo Offline (DuckDB + Parquet)", desc: "Persistencia analÃ­tica local con consultas SQL sobre el Libro Mayor sin saturar la base de datos central del ERP." },
  { id: "SEC-CONT-05", label: "Exportador a Formatos EstÃ¡ndar ERP (Excel, CSV, XML AEAT, FacturaE)", desc: "GeneraciÃ³n de ficheros de importaciÃ³n directa listos para SAP, Sage, Holded, Factusol o A3 Software." },
  { id: "SEC-CONT-06", label: "Detector Multimodal de ManipulaciÃ³n de Justificantes (Anti-Tampering)", desc: "AnÃ¡lisis de metadatos EXIF, inconsistencias tipogrÃ¡ficas y alineaciÃ³n de pÃ­xeles en facturas y tickets PDF/imagen." },
  { id: "SEC-CONT-07", label: "Asistente Explicativo con Guardrails Anti-Autoasiento", desc: "ExplicaciÃ³n en lenguaje natural de descuadres contables con prohibiciÃ³n severa de registrar asientos reales sin supervisiÃ³n humana." },
  { id: "SEC-CONT-08", label: "Conector de Extractos Bancarios Multiformato (MT940 / CAMT.053 / Norma 43)", desc: "Parser universal para formatos de banca online europea y extractos normalizados de la AsociaciÃ³n EspaÃ±ola de Banca." },
];

const ERP_SYSTEMS = [
  "Holded ERP (Cloud API REST)",
  "Sage 50 / Sage 200 / Sage Despachos",
  "SAP S/4HANA / SAP Business One",
  "A3 Software (A3innuva / A3ERP de Wolters Kluwer)",
  "Factusol / ContaSol (Software Delsol)",
  "ExportaciÃ³n EstÃ¡ndar Contable (CSV / Excel / Formato PGC)",
];

const DOCUMENT_TYPES = [
  "Facturas de Proveedores y Acreedores (PDF / Imagen / FacturaE)",
  "Extractos Bancarios (Norma 43, MT940, CAMT.053, CSV)",
  "Tickets y Justificantes de Gastos de Empleados",
  "Libro Mayor y Diario Contable del ERP",
  "Tablas y Fichas de Activos Fijos y Amortizaciones",
  "Modelos Tributarios Oficiales (303, 347, 390, 111, 115)",
];

const CONTABILIDAD_METRICS = [
  { id: "reconcil_rate", label: "Tasa de ConciliaciÃ³n AutomÃ¡tica", cat: "ConciliaciÃ³n & Asientos", desc: "Porcentaje de movimientos bancarios cruzados automÃ¡ticamente con confianza superior al 95%." },
  { id: "orphan_detection", label: "Sensibilidad en DetecciÃ³n de Asientos HuÃ©rfanos", cat: "ConciliaciÃ³n & Asientos", desc: "PrecisiÃ³n en la identificaciÃ³n de movimientos del extracto sin contrapartida en el Libro Mayor." },
  { id: "ocr_invoice_f1", label: "F1-Score en ExtracciÃ³n de Facturas (FinBen)", cat: "Fiscalidad & OCR", desc: "PrecisiÃ³n y exhaustividad en extracciÃ³n de bases imponibles, cuotas y tipos de IVA/IRPF." },
  { id: "vat_compliance", label: "Conformidad con Normativa de IVA / SII", cat: "Fiscalidad & OCR", desc: "Ratio de facturas validadas correctamente contra reglas tributarias de deducibilidad y retenciÃ³n." },
  { id: "deprec_accuracy", label: "Exactitud en Cuadros de AmortizaciÃ³n", cat: "Activos & AuditorÃ­a", desc: "Tasa de detecciÃ³n de desviaciones en vidas Ãºtiles, coeficientes fiscales y cuotas acumuladas." },
  { id: "audit_trail_score", label: "Integridad de Pista de AuditorÃ­a (Audit Trail)", cat: "Activos & AuditorÃ­a", desc: "VerificaciÃ³n de trazabilidad inmutable desde el documento de origen hasta el asiento propuesto." },
  { id: "fraud_precision", label: "PrecisiÃ³n en DetecciÃ³n de Gastos AtÃ­picos", cat: "Fraude & Gastos", desc: "Ratio de tickets fraudulentos o duplicados identificados sin falsos positivos que bloqueen la operativa." },
  { id: "cost_alloc_balance", label: "Equilibrio en AsignaciÃ³n de Centros de Coste", cat: "GestiÃ³n & ERP", desc: "Cuadre exacto al cÃ©ntimo en la distribuciÃ³n analÃ­tica de costes directos e indirectos." },
];

const VALIDATION_MODELS = [
  "Arquitectura de Doble Filtro (Propuesta Claude 3.7 Sonnet + DetecciÃ³n de AnomalÃ­as DeepSeek-R1)",
  "ValidaciÃ³n Determinista Basada en Reglas Contables del Plan General Contable (PGC / NIIF)",
  "SupervisiÃ³n Humana Obligatoria (Human-in-the-Loop) con Flujo de AprobaciÃ³n por Importes",
  "VerificaciÃ³n Cruzada AutomÃ¡tica contra Censo de NIFs de la AEAT y Registro VIES",
];

const SAFETY_GUARDRAILS = [
  "Aislamiento de Asientos: ProhibiciÃ³n Estricta de Auto-InyecciÃ³n en ERP sin ValidaciÃ³n Humana",
  "Alerta Obligatoria de AuditorÃ­a para Todo Ajuste o Asiento Superior a 10.000 EUR",
  "RestricciÃ³n AntialucinaciÃ³n en CÃ¡lculos de Cuotas Tributarias, Retenciones y Totales",
  "Sello de Inmutabilidad y Registro de Discrepancias en Toda Propuesta Contable",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard contable interactivo y panel de conciliaciÃ³n local)",
  "FastAPI + React / Next.js (Portal de administraciÃ³n contable multiusuario con roles y permisos)",
  "Flet (AplicaciÃ³n de escritorio local .exe para estaciones contables sin conexiÃ³n externa)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (AlmacÃ©n analÃ­tico columnar inmutable para Libro Mayor y auditorÃ­a)",
  "SQLite + SQLAlchemy con Cifrado Local de Datos Contables",
  "PostgreSQL con Esquema Transaccional ACID para Diario y Libro Mayor",
  "IntegraciÃ³n Directa con la Base de Datos del ERP (Modo Read-Only Mirror)",
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function getAutoMetrics(primaryId, secondaryIds) {
  const auto = new Set();
  if (primaryId === "C1.1") ["reconcil_rate", "orphan_detection", "audit_trail_score"].forEach(m => auto.add(m));
  if (primaryId === "C1.2") ["ocr_invoice_f1", "vat_compliance", "audit_trail_score"].forEach(m => auto.add(m));
  if (primaryId === "C1.3") ["deprec_accuracy", "audit_trail_score"].forEach(m => auto.add(m));
  if (primaryId === "C1.4") ["fraud_precision", "audit_trail_score"].forEach(m => auto.add(m));
  if (primaryId === "C1.5") ["cost_alloc_balance", "reconcil_rate"].forEach(m => auto.add(m));
  if (primaryId === "C1.6") ["audit_trail_score", "reconcil_rate"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-CONT-01")) ["vat_compliance"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-CONT-02")) ["audit_trail_score"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-CONT-06")) ["fraud_precision"].forEach(m => auto.add(m));
  return [...auto];
}

function getAutoStorage(secondaryIds, primaryId) {
  if (primaryId === "C1.1" || secondaryIds.includes("SEC-CONT-02") || secondaryIds.includes("SEC-CONT-04")) {
    return STORAGE_ENGINES[0];
  }
  return "";
}

function needsValidationStep(primaryId, secondaryIds) {
  return primaryId === "C1.1" || primaryId === "C1.2" || primaryId === "C1.4" || secondaryIds.includes("SEC-CONT-03") || secondaryIds.includes("SEC-CONT-07");
}

// â”€â”€â”€ Generador del informe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function generateReport(data) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const primary = PRIMARY_TASKS.find(t => t.id === data.primaryTask);
  const secondaries = SECONDARY_TASKS.filter(s => data.secondaryTasks.includes(s.id));
  const metrics = CONTABILIDAD_METRICS.filter(m => data.selectedMetrics.includes(m.id));
  const appSlug = (data.appName || "contabilidad_app").toLowerCase().replace(/\s+/g, "_");
  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);
  const hasSEC01 = data.secondaryTasks.includes("SEC-CONT-01");
  const hasSEC02 = data.secondaryTasks.includes("SEC-CONT-02");
  const hasSEC03 = data.secondaryTasks.includes("SEC-CONT-03");
  const hasSEC04 = data.secondaryTasks.includes("SEC-CONT-04");
  const hasSEC05 = data.secondaryTasks.includes("SEC-CONT-05");
  const hasSEC06 = data.secondaryTasks.includes("SEC-CONT-06");
  const hasSEC07 = data.secondaryTasks.includes("SEC-CONT-07");
  const hasSEC08 = data.secondaryTasks.includes("SEC-CONT-08");

  const metricsByCategory = metrics.reduce((acc, m) => {
    if (!acc[m.cat]) acc[m.cat] = [];
    acc[m.cat].push(m);
    return acc;
  }, {});

  const treeLines = [
    appSlug + "/",
    "â”œâ”€â”€ src/",
    "â”‚   â”œâ”€â”€ __init__.py",
    "â”‚   â”œâ”€â”€ config.py                 # ConfiguraciÃ³n general, umbrales de revisiÃ³n y credenciales ERP",
    "â”‚   â”œâ”€â”€ schemas.py                # Modelos Pydantic v2 para asientos, facturas y extractos" + (hasSEC07 ? "\nâ”‚   â”‚                             # â†’ incluye middleware Guardrails Anti-Autoasiento (BR-CONT-05)" : ""),
    data.primaryTask === "C1.1" || hasSEC08 ? "â”‚   â”œâ”€â”€ bank_parser.py            # Parser multiformato (MT940, CAMT.053, Norma 43, CSV) (BR-CONT-01)" : null,
    data.primaryTask === "C1.1" ? "â”‚   â”œâ”€â”€ reconciler.py             # Motor de cruce bancario y generaciÃ³n de propuestas de ajuste" : null,
    data.primaryTask === "C1.2" ? "â”‚   â”œâ”€â”€ invoice_ocr.py            # Pipeline de extracciÃ³n estructurada OCR y desglose de IVA (BR-CONT-02)" : null,
    hasSEC01 ? "â”‚   â”œâ”€â”€ tax_validator.py          # Validador de reglas de IVA/IRPF, retenciones y censo VIES/AEAT" : null,
    data.primaryTask === "C1.3" ? "â”‚   â”œâ”€â”€ assets_auditor.py         # Auditor de tablas de amortizaciÃ³n y vidas Ãºtiles de activos" : null,
    data.primaryTask === "C1.4" || hasSEC06 ? "â”‚   â”œâ”€â”€ expense_fraud.py          # Detector de anomalÃ­as en notas de gastos y duplicados" : null,
    data.primaryTask === "C1.5" ? "â”‚   â”œâ”€â”€ cost_allocation.py        # Motor de reparto analÃ­tico y centros de coste" : null,
    data.primaryTask === "C1.6" || hasSEC05 ? "â”‚   â”œâ”€â”€ erp_connector.py          # Conector para SAP, Sage, Holded y A3 Software" : null,
    "â”‚   â”œâ”€â”€ storage.py                # " + (hasSEC04 ? "DuckDB + Parquet (BR-CONT-04) con pista de auditorÃ­a inmutable" : "Capa de persistencia contable"),
    hasSEC03 ? "â”‚   â”œâ”€â”€ approval_workflow.py      # Gestor de aprobaciones para asientos superiores a umbral (SEC-CONT-03)" : null,
    "â”‚   â”œâ”€â”€ reporting.py              # Generador de informes de conciliaciÃ³n y cierres (PDF / Excel)",
    "â”‚   â””â”€â”€ ui/",
    "â”‚       â”œâ”€â”€ __init__.py",
    "â”‚       â”œâ”€â”€ components.py         # Tablas de descuadres, visores de asientos y tarjetas de facturas",
    "â”‚       â””â”€â”€ main_view.py          # Panel principal de revisiÃ³n contable para el equipo",
    "â”œâ”€â”€ tests/",
    "â”‚   â”œâ”€â”€ test_schemas.py           # ValidaciÃ³n de esquemas contables y consistencia debe/haber",
    data.primaryTask === "C1.1" ? "â”‚   â”œâ”€â”€ test_reconciler.py        # Casos de prueba de conciliaciÃ³n y tolerancia de redondeo" : null,
    "â”‚   â””â”€â”€ test_tax_rules.py         # BaterÃ­a de pruebas de retenciones y tipos de IVA vigentes",
    "â”œâ”€â”€ data/                         # Ficheros Parquet, extractos DEMO y cachÃ© de clientes/proveedores",
    "â”œâ”€â”€ requirements.txt              # pandas, duckdb, pydantic, openpyxl, requests, pytest",
    "â””â”€â”€ main.py                       # Punto de entrada de la aplicaciÃ³n contable",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "C1.1" ? "- **BR-CONT-01 (Balance Inteligente):** MÃ³dulo de conciliaciÃ³n bancaria activado; reconciler.py incluido; tolerancia mÃ¡xima de 0.01â‚¬ configurada." : null,
    data.primaryTask === "C1.2" ? "- **BR-CONT-02 (Factura Flujo):** Pipeline OCR activado; invoice_ocr.py incluido; validaciÃ³n de bases y cuotas obligatoria." : null,
    data.primaryTask === "C1.3" ? "- **BR-CONT-03 (Auditor Activos):** Motor de amortizaciÃ³n lineal/regresiva activado; assets_auditor.py incluido." : null,
    hasSEC04 ? "- **BR-CONT-04 (Persistencia AnalÃ­tica):** Almacenamiento preconfigurado en DuckDB + Parquet con pista de auditorÃ­a sellada en UTC." : null,
    hasSEC07 ? "- **BR-CONT-05 (Guardrail Anti-Autoasiento):** RestricciÃ³n severa que impide registrar asientos definitivos en el ERP sin aprobaciÃ³n del contable." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de verificaciÃ³n y control contable:** " + data.validationModel,
        "- **Guardrail de seguridad operativa:** " + data.safetyGuardrail,
        "- **Principio de Doble RevisiÃ³n:** Todo descuadre o asiento de ajuste propuesto por la IA requiere confirmaciÃ³n expresa del responsable contable.",
        "- **Umbral de Escalado AutomÃ¡tico:** Toda transacciÃ³n superior a 10.000 EUR queda marcada automÃ¡ticamente como 'REQUIERE VALIDACIÃ“N DE RESPONSABLE CONTABLE'.",
        "- **Trazabilidad Inmutable:** Cada propuesta contable queda vinculada a su documento de origen mediante hash SHA-256.",
      ].join("\n")
    : "La aplicaciÃ³n opera en modo de consulta o generaciÃ³n de informes analÃ­ticos. No genera propuestas automÃ¡ticas de asientos contables.";

  const qaLines = [
    "1. **Pruebas de Partida Doble (Cuadre MatemÃ¡tico):** VerificaciÃ³n estricta de que la suma de DÃ©bito es exactamente igual a la suma de CrÃ©dito en el 100% de los asientos propuestos.",
    "2. **ValidaciÃ³n de Reglas de IVA y Retenciones:** BaterÃ­a de pruebas con facturas de regÃ­menes especiales (inversiÃ³n sujeto pasivo, recargo de equivalencia, no deducibles).",
    "3. **Prueba de Resistencia a ManipulaciÃ³n (Anti-Tampering):** VerificaciÃ³n de detecciÃ³n de justificantes duplicados o editados con herramientas grÃ¡ficas.",
    "4. **Prueba de Rendimiento con Gran Volumen:** Carga y conciliaciÃ³n de extractos con 50.000+ movimientos en DuckDB en menos de 3 segundos.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACIÃ“N TÃ‰CNICA",
    "## Proyecto de Software Contable & ERP: " + data.appName,
    "",
    "**Fecha de GeneraciÃ³n:** " + now,
    "**Ãrea Horizon:** Contabilidad, ERP & GestiÃ³n Financiera",
    "**Arquitecto / DiseÃ±ador:** " + (data.authorName || "Horizon User"),
    "**VersiÃ³n del Documento:** v1.0.0 (EspecificaciÃ³n Formal Contable)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y PropÃ³sito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **DescripciÃ³n del nÃºcleo funcional:** " + (primary?.desc || ""),
    "- **PÃºblico objetivo:** " + (primary?.audience || ""),
    "- **Sistemas ERP compatibles:** " + data.erpSystems.join(", "),
    "- **TipologÃ­a de documentos contables:** " + data.documentTypes.join(", "),
    "",
    "**Exclusiones explÃ­citas:** El sistema NO registra asientos automÃ¡ticos definitivos en el ERP sin revisiÃ³n humana, NO emite dictÃ¡menes de auditorÃ­a legal de cuentas y NO asume responsabilidad tributaria directa ante organismos fiscales.",
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
    "### 3. CatÃ¡logo de MÃ©tricas y Control de Calidad Contable",
    "",
    "El sistema implementarÃ¡ y monitorizarÃ¡ las siguientes mÃ©tricas de precisiÃ³n y cuadre:",
    "",
    metricsSection || "_No se han seleccionado mÃ©tricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de Seguridad Operativa y Pista de AuditorÃ­a (Audit Trail)",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack TecnolÃ³gico y Estructura de Scripts Python",
    "",
    "- **Capa de PresentaciÃ³n (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos Contables:** " + data.storageEngine,
    "- **ValidaciÃ³n de Datos:** Pydantic v2 con esquemas estrictos de partida doble.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y ValidaciÃ³n (QA Contable)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. ClÃ¡usula de Cumplimiento Legal y Descargo de Responsabilidad Contable",
    "",
    "> **AVISO LEGAL Y CONTABLE OBLIGATORIO**",
    ">",
    "> Esta especificaciÃ³n tÃ©cnica y cualquier software desarrollado a partir de ella tiene carÃ¡cter **exclusivamente de herramienta de apoyo operativo, anÃ¡lisis y conciliaciÃ³n contable**.",
    ">",
    "> - **NO constituye dictamen de auditorÃ­a oficial de cuentas ni asesoramiento tributario formal**.",
    "> - **Toda propuesta de asiento, ajuste o liquidaciÃ³n de impuestos generada por la IA debe ser validada por un profesional contable o asesor fiscal colegiado** antes de su firma o presentaciÃ³n oficial.",
    "> - El sistema aplica un **principio de no auto-asiento**: ninguna transacciÃ³n se inyecta en producciÃ³n sin confirmaciÃ³n humana expresa.",
    ">",
    "> DiseÃ±ado en **Horizon â€” Centro Interactivo de IA Aplicada.** Laboratorio de Contabilidad & ERP.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de EspecificaciÃ³n TÃ©cnica â€” Generado automÃ¡ticamente por Horizon ContabilidadAppWizard v1.0_",
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
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
              i + 1 < step
                ? "bg-blue-600 text-white"
                : i + 1 === step
                ? "bg-blue-600 text-white ring-4 ring-blue-600/20"
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
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-sm transition-colors"
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
      className="w-full bg-dark/[0.02] border border-dark/12 text-dark text-sm rounded-sm px-3.5 py-2.5 focus:outline-hidden focus:border-blue-500 placeholder:text-dark/25 transition-colors"
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
              ? "border-blue-500/40 bg-blue-50/30"
              : "border-dark/10 hover:border-dark/20 hover:bg-dark/[0.01]"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            value === (opt.id || opt) ? "border-blue-600" : "border-dark/25"
          }`}>
            {value === (opt.id || opt) && <div className="w-2 h-2 rounded-full bg-blue-600" />}
          </div>
          <input type="radio" className="sr-only" checked={value === (opt.id || opt)} onChange={() => onChange(opt.id || opt)} />
          <div>
            {opt.label ? (
              <>
                <p className="text-sm font-semibold text-dark"><span className="text-blue-600 text-xs mr-1.5">{opt.id}</span>{opt.label}</p>
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
              isChecked ? "border-blue-500/40 bg-blue-50/30" : isDisabled ? "border-dark/6 opacity-40 cursor-not-allowed" : "border-dark/10 hover:border-dark/20"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${isChecked ? "border-blue-600 bg-blue-600" : "border-dark/25"}`}>
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={isChecked} disabled={isDisabled} onChange={() => !isDisabled && toggle(opt.id || opt)} />
            <div>
              {opt.label ? (
                <>
                  <p className="text-sm font-medium text-dark"><span className="text-xs text-blue-600 mr-1">[{opt.id}]</span>{opt.label}</p>
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
            value === opt ? "border-blue-500/40 bg-blue-50/30" : "border-dark/10 hover:border-dark/20"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${value === opt ? "border-blue-600" : "border-dark/25"}`}>
            {value === opt && <div className="w-2 h-2 rounded-full bg-blue-600" />}
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
  erpSystems: [],
  documentTypes: [],
  selectedMetrics: [],
  validationModel: "",
  safetyGuardrail: "",
  uiFramework: "",
  storageEngine: "",
});

export default function WizardContabilidad() {
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
      if (data.erpSystems.length === 0) e.erpSystems = "Selecciona al menos un sistema ERP compatible.";
      if (data.documentTypes.length === 0) e.documentTypes = "Selecciona al menos un tipo de documento.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una mÃ©trica contable.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de verificaciÃ³n contable.";
      if (!data.safetyGuardrail) e.safetyGuardrail = "Selecciona el guardrail de seguridad principal.";
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
    a.download = `informe_${(data.appName || "contabilidad_app").toLowerCase().replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);

  return (
    <div className="min-h-full bg-[#F7F6F2]">
      <div className="max-w-[820px] mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-8">
          <Link to="/areas/contabilidad" className="inline-flex items-center gap-1.5 text-xs text-dark/40 hover:text-dark transition-colors mb-6">
            <ArrowLeft size={13} /> Laboratorio de Contabilidad & ERP
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0 text-blue-600 font-display text-xl">ðŸ§¾</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                DiseÃ±ador de Proyectos â€” Contabilidad & ERP
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicaciÃ³n contable paso a paso con rigor de cuadre, validaciÃ³n fiscal y trazabilidad inmutable.
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
                <p className="text-dark/45 text-sm mb-6">Selecciona el nÃºcleo funcional que definirÃ¡ la arquitectura de tu aplicaciÃ³n contable.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="SerÃ¡ el tÃ­tulo de tu especificaciÃ³n tÃ©cnica contable.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Balance Inteligente, Factura Flujo, Auditor Activos, Gasto Seguroâ€¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias o departamento de contabilidad / finanzas.">DiseÃ±ador / Departamento Contable</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Controller Financiero, AsesorÃ­a Fiscalâ€¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la funciÃ³n contable principal. Esto determinarÃ¡ las reglas de cuadre y los mÃ³dulos requeridos.">Tarea principal de la aplicaciÃ³n</FieldLabel>
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
                <p className="text-dark/45 text-sm mb-6">AÃ±ade hasta <strong>4 capacidades contables y de auditorÃ­a</strong> para robustecer el sistema.</p>

                <div className="bg-blue-500/[0.04] border border-blue-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 â€” Ecosistema ERP & Documentos</h2>
                <p className="text-dark/45 text-sm mb-6">Configura los sistemas ERP con los que se integrarÃ¡ la aplicaciÃ³n y la tipologÃ­a de documentos de entrada.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Sistemas ERP y de gestiÃ³n con los que sincronizarÃ¡ la aplicaciÃ³n.">Sistemas ERP compatibles</FieldLabel>
                    <CheckGroup options={ERP_SYSTEMS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.erpSystems} onChange={set("erpSystems")} max={6} />
                    {errors.erpSystems && <p className="text-red-500 text-xs mt-1.5">{errors.erpSystems}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Documentos contables que procesarÃ¡ el motor de datos.">Tipos de documentos a procesar</FieldLabel>
                    <CheckGroup options={DOCUMENT_TYPES.map(a => ({ id: a, label: a, desc: "" }))} selected={data.documentTypes} onChange={set("documentTypes")} max={6} />
                    {errors.documentTypes && <p className="text-red-500 text-xs mt-1.5">{errors.documentTypes}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 4 */}
            {step === 4 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 â€” CatÃ¡logo de MÃ©tricas Contables</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las mÃ©tricas de cuadre, precisiÃ³n y cumplimiento fiscal que evaluarÃ¡ el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-blue-800">
                    âœ“ {data.selectedMetrics.length} mÃ©trica{data.selectedMetrics.length !== 1 ? "s" : ""} contable{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automÃ¡ticamente segÃºn tu tarea principal.
                  </div>
                )}

                {["ConciliaciÃ³n & Asientos", "Fiscalidad & OCR", "Activos & AuditorÃ­a", "Fraude & Gastos", "GestiÃ³n & ERP"].map(cat => (
                  <div key={cat} className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-dark/40 mb-2.5">{cat}</p>
                    <div className="space-y-1.5">
                      {CONTABILIDAD_METRICS.filter(m => m.cat === cat).map(m => {
                        const isChecked = data.selectedMetrics.includes(m.id);
                        return (
                          <label key={m.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? "border-blue-500/30 bg-blue-50/30" : "border-dark/8 hover:border-dark/15"}`}>
                            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${isChecked ? "border-blue-600 bg-blue-600" : "border-dark/20"}`}>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 â€” Control Operativo y Pista de AuditorÃ­a</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-blue-800 flex items-start gap-2">
                      <Calculator size={16} className="shrink-0 mt-0.5 text-blue-600" />
                      Este paso estÃ¡ activo para garantizar la integridad contable, la pista de auditorÃ­a y el principio de no auto-asiento.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de verificaciÃ³n de descuadres y validaciÃ³n de asientos.">Modelo de verificaciÃ³n contable</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="RestricciÃ³n de seguridad activa que impide registros automÃ¡ticos no supervisados.">Guardrail de seguridad operativa</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios de auditorÃ­a y control interno (activados por diseÃ±o)</p>
                        {[
                          "Principio de No Auto-Asiento: la IA solo genera propuestas de ajuste; el registro definitivo es 100% humano.",
                          "Pista de AuditorÃ­a Inmutable (Audit Trail): registro de fuentes, timestamps UTC y hashes SHA-256.",
                          "Alerta Obligatoria de Escalado: toda transacciÃ³n > 10.000â‚¬ requiere validaciÃ³n de responsable contable.",
                        ].map(c => (
                          <div key={c} className="flex items-start gap-2.5 mb-2 last:mb-0">
                            <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} className="text-blue-700" />
                            </div>
                            <p className="text-[12.5px] text-dark/60 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo consulta analÃ­tica / sincronizaciÃ³n</strong> sin generaciÃ³n de propuestas de asientos en tiempo real.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides aÃ±adir conciliaciÃ³n bancaria o validaciÃ³n OCR de facturas, vuelve al <strong>Paso 2</strong> y activa el mÃ³dulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-CONT-03</code> o <code className="bg-dark/5 px-1 rounded text-xs">SEC-CONT-07</code>.
                    </div>
                  </div>
                )}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 6 */}
            {step === 6 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 6 â€” Stack TecnolÃ³gico & Persistencia</h2>
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y librerÃ­as que darÃ¡n soporte a tu aplicaciÃ³n contable.</p>

                {data.secondaryTasks.includes("SEC-CONT-04") && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-blue-800">
                    âœ“ Persistencia analÃ­tica preconfigurada en <strong>DuckDB + Parquet</strong> por el mÃ³dulo SEC-CONT-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para el equipo de contabilidad y administraciÃ³n.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="DÃ³nde y cÃ³mo se almacenarÃ¡n los extractos, asientos y pistas de auditorÃ­a.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar EspecificaciÃ³n Contable" />
              </StepCard>
            )}
          </>
        )}

        {/* â”€â”€ PANTALLA FINAL: INFORME â”€â”€ */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-100 border border-blue-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-blue-700" />
                </div>
                <h2 className="font-display text-[24px] text-dark">EspecificaciÃ³n contable generada con Ã©xito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria tÃ©cnica para <strong className="text-dark">{data.appName}</strong> estÃ¡ lista para desarrollo e integraciÃ³n con ERP.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={downloadMd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-sm transition-colors"
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

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 flex gap-3">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[13px] text-amber-800 leading-relaxed">
                <strong>Aviso de dominio contable y fiscal:</strong> Este informe especifica una arquitectura de software de conciliaciÃ³n y soporte administrativo. No constituye dictamen de auditorÃ­a de cuentas ni asesoramiento tributario formal vinculante.
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
              <span className="text-blue-600 mt-1.5 shrink-0">â€¢</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (/^\d+\. /.test(line)) {
          const num = line.match(/^(\d+)\./)[1];
          return (
            <div key={i} className="flex items-start gap-2.5 pl-2">
              <span className="text-blue-600 font-semibold text-xs mt-1 shrink-0 w-4">{num}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, "")) }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-4 border-blue-500 bg-blue-50 px-4 py-2 rounded-r-lg text-[13px] text-blue-950 my-2">
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

