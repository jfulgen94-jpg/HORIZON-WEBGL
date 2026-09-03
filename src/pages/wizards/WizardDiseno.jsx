import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Download } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Palette } from "lucide-react";

// â”€â”€â”€ Constantes de datos (DiseÃ±o & Creatividad Visual) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRIMARY_TASKS = [
  {
    id: "DS1.1",
    label: "Generador de Direcciones Creativas e Identidad de Marca (GÃ©nesis Visual)",
    desc: "GeneraciÃ³n de sistemas de identidad coherentes (concepto estÃ©tico, paletas de color HEX con roles asignados, pares tipogrÃ¡ficos verificados en Google Fonts y anÃ¡lisis de sensibilidad cultural).",
    audience: "Estudios de diseÃ±o, directores de arte, agencias de branding, diseÃ±adores de marca y marketing.",
  },
  {
    id: "DS1.2",
    label: "Auditor HeurÃ­stico de Interfaces y CrÃ­tica UI/UX (CrÃ­tica UI)",
    desc: "AnÃ¡lisis visual multimodal de capturas de pantalla, localizaciÃ³n por bounding boxes de puntos de fricciÃ³n, auditorÃ­a de jerarquÃ­a de CTAs y contraste WCAG 2.1.",
    audience: "DiseÃ±adores de producto (Product Designers), investigadores UX, auditores de usabilidad.",
  },
  {
    id: "DS1.3",
    label: "Generador de Sistemas de DiseÃ±o y Design Tokens ParamÃ©tricos (Design System Studio)",
    desc: "DefiniciÃ³n estructurada de tokens de diseÃ±o (colores semÃ¡nticos, escala modular tipogrÃ¡fica, retÃ­cula de 8px, elevaciones) exportables a CSS Variables, Tailwind y Figma JSON.",
    audience: "Ingenieros de sistemas de diseÃ±o (Design Technologists), desarrolladores frontend, lÃ­deres de UI.",
  },
  {
    id: "DS1.4",
    label: "Generador de GrÃ¡ficos Vectoriales y Logotipos ParamÃ©tricos en SVG (SVG Canvas)",
    desc: "CreaciÃ³n determinista de cÃ³digo SVG limpio, escalable y optimizado con svgwrite, sin artefactos rasterizados ni degradaciÃ³n de resoluciÃ³n.",
    audience: "DiseÃ±adores grÃ¡ficos vectoriales, desarrolladores web, creadores de iconos e infografÃ­as.",
  },
  {
    id: "DS1.5",
    label: "Auditor de Accesibilidad Visual y Contraste de Color (WCAG 2.1 AA/AAA)",
    desc: "CÃ¡lculo algorÃ­tmico de luminancia relativa y ratio de contraste texto/fondo con etiquetado de conformidad y recomendaciones de correcciÃ³n.",
    audience: "Auditores de accesibilidad digital, diseÃ±adores inclusivos, responsables de calidad web.",
  },
  {
    id: "DS1.6",
    label: "Optimizador de Tasa de ConversiÃ³n (CRO) y PredicciÃ³n de Tests A/B (WiserUI)",
    desc: "EvaluaciÃ³n predictiva de variantes de interfaces basada en benchmarks de A/B testing real para maximizar la eficacia de llamadas a la acciÃ³n y checkout.",
    audience: "Especialistas en CRO, growth managers, diseÃ±adores de ecommerce y landing pages.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-DS-01", label: "Validador AlgorÃ­tmico de Contraste y Accesibilidad WCAG 2.1 (AA / AAA)", desc: "VerificaciÃ³n matemÃ¡tica estricta de ratios de contraste (mÃ­nimo 4.5:1 para texto normal, 3:1 para texto grande)." },
  { id: "SEC-DS-02", label: "Verificador de Disponibilidad de TipografÃ­as en Google Fonts API", desc: "ComprobaciÃ³n en tiempo real de existencia, variantes de peso y compatibilidad multilingÃ¼e de fuentes." },
  { id: "SEC-DS-03", label: "Pista de Historial Creativo y Versiones de DiseÃ±o en DuckDB", desc: "Registro inmutable de briefings, paletas, tokens generados y feedback de diseÃ±o con sellado temporal." },
  { id: "SEC-DS-04", label: "Persistencia Columnar UltrarrÃ¡pida y Modo Offline (DuckDB + Parquet)", desc: "Almacenamiento local seguro de assets, tokens de diseÃ±o y mÃ©tricas de accesibilidad." },
  { id: "SEC-DS-05", label: "Exportador a Formatos EstÃ¡ndar (CSS Variables, Tailwind Config, Figma Tokens JSON, SVG)", desc: "Salida modular lista para integraciÃ³n directa en frontends web o herramientas de diseÃ±o." },
  { id: "SEC-DS-06", label: "Detector de Connotaciones y Sesgo Cultural del Color (Cultural VQA)", desc: "Alertas tempranas sobre significados desfavorables de colores o sÃ­mbolos en mercados internacionales especÃ­ficos." },
  { id: "SEC-DS-07", label: "Asistente con Guardrail de No-SustituciÃ³n del Criterio Creativo", desc: "RestricciÃ³n que enmarca las salidas como puntos de partida exploratorios, preservando la autorÃ­a humana." },
  { id: "SEC-DS-08", label: "Detector de Bounding Boxes y Mapas de Calor de AtenciÃ³n Visual", desc: "Mapeo de coordenadas de elementos clave de la interfaz para predecir el recorrido visual del usuario." },
];

const DESIGN_DOMAINS = [
  "Identidad Visual, Branding & DiseÃ±o Corporativo",
  "DiseÃ±o de Interfaces (UI) & Experiencia de Usuario (UX)",
  "Sistemas de DiseÃ±o (Design Systems) & Design Tokens",
  "GrÃ¡ficos Vectoriales, IlustraciÃ³n & SVG ParamÃ©trico",
  "Accesibilidad Digital (WCAG 2.1) & DiseÃ±o Inclusivo",
  "OptimizaciÃ³n de ConversiÃ³n (CRO) & Flujos de Checkout",
];

const COMPUTATION_ENGINES = [
  "Python + colormath / wcag-contrast (CÃ¡lculo algorÃ­tmico exacto de contraste y colorimetrÃ­a)",
  "svgwrite / cairosvg (GeneraciÃ³n, renderizado y optimizaciÃ³n de grÃ¡ficos SVG)",
  "Google Fonts API Client (ValidaciÃ³n de fuentes tipogrÃ¡ficas web)",
  "DuckDB + Parquet (AlmacÃ©n analÃ­tico columnar de tokens y variantes de diseÃ±o)",
  "Pydantic v2 (ValidaciÃ³n de esquemas de Design Tokens conformes al W3C)",
  "Tailwind / CSS Formatter (GeneraciÃ³n de hojas de estilo limpias y optimizadas)",
];

const DESIGN_METRICS = [
  { id: "wcag_aa_pass_rate", label: "Tasa de Conformidad WCAG 2.1 AA", cat: "Accesibilidad & Color", desc: "Porcentaje de combinaciones de color de la interfaz que superan el ratio mÃ­nimo 4.5:1." },
  { id: "visual_hierarchy_impact", label: "Ãndice de JerarquÃ­a Visual de CTAs", cat: "UX & ConversiÃ³n", desc: "Capacidad de guiar la atenciÃ³n del usuario hacia la acciÃ³n principal sin ambigÃ¼edad visual." },
  { id: "ab_winner_prediction_acc", label: "Acierto en PredicciÃ³n A/B (WiserUI)", cat: "UX & ConversiÃ³n", desc: "Exactitud en predecir quÃ© variante de diseÃ±o generarÃ¡ mayor conversiÃ³n en tests reales." },
  { id: "typography_balance_ratio", label: "Equilibrio TipogrÃ¡fico y Modularidad", cat: "TipografÃ­a & Layout", desc: "Consistencia en la escala modular tipogrÃ¡fica y ritmo vertical en retÃ­cula de 8px." },
  { id: "cultural_sensitivity_score", label: "Ãndice de AdecuaciÃ³n Cultural (CVQA)", cat: "Branding & SemiÃ³tica", desc: "Ausencia de connotaciones tabÃº o negativas de color/simbologÃ­a en el mercado geogrÃ¡fico objetivo." },
  { id: "bounding_box_precision", label: "PrecisiÃ³n en LocalizaciÃ³n UI (BBox Detection)", cat: "UI & AuditorÃ­a", desc: "Exactitud en coordenadas de pÃ­xeles al identificar elementos de interfaz en capturas." },
  { id: "token_completeness", label: "Completitud de Design Tokens W3C", cat: "Sistemas de DiseÃ±o", desc: "Cobertura total de variables para color, tipografÃ­a, espaciado, bordes y elevaciones." },
  { id: "svg_render_fidelity", label: "Fidelidad y OptimizaciÃ³n de CÃ³digo SVG", cat: "GrÃ¡ficos Vectoriales", desc: "ValidaciÃ³n de sintaxis SVG limpia sin etiquetas redundantes ni artefactos visuales." },
];

const VALIDATION_MODELS = [
  "Doble Etapa: Razonamiento Multimodal Claude 3.7 Sonnet + VerificaciÃ³n MatemÃ¡tica de Contraste WCAG",
  "ValidaciÃ³n AlgorÃ­tmica Determinista de Luminancia Relativa (FÃ³rmula Oficial W3C)",
  "ComprobaciÃ³n de Existencia en CatÃ¡logo de Google Fonts mediante API Oficial",
  "AuditorÃ­a de RetÃ­cula Espacial de 8px y Escalas Modulares de TipografÃ­a",
];

const SAFETY_GUARDRAILS = [
  "Aislamiento de Criterio: ProhibiciÃ³n de Declarar DiseÃ±os Definitivos sin AprobaciÃ³n Humana",
  "Bloqueo Obligatorio ante Inaccesibilidad Severa: Alerta CrÃ­tica en Contrastes < 3.0:1",
  "VerificaciÃ³n Obligatoria de Licencias y Disponibilidad Web en TipografÃ­as Propuestas",
  "ClÃ¡usula de AutorÃ­a y ExploraciÃ³n Creativa en Todos los Informes de Identidad",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard interactivo con visores de paletas interactivas y renderizado SVG)",
  "FastAPI + React / Next.js (Visualizador de Design Tokens y portal de marca en vivo)",
  "Flet (AplicaciÃ³n de escritorio local .exe para estudios creativos con assets locales)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (AlmacÃ©n analÃ­tico columnar para histÃ³rico de direcciones y mÃ©tricas)",
  "Ficheros JSON W3C Design Tokens + CSS Variables",
  "Repositorio de Ficheros SVG con Control de Versiones",
  "AlmacÃ©n de Proyectos Creativos en Formato Markdown con Muestras de Color",
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function getAutoMetrics(primaryId, secondaryIds) {
  const auto = new Set();
  if (primaryId === "DS1.1") ["wcag_aa_pass_rate", "typography_balance_ratio", "cultural_sensitivity_score"].forEach(m => auto.add(m));
  if (primaryId === "DS1.2") ["visual_hierarchy_impact", "bounding_box_precision", "wcag_aa_pass_rate"].forEach(m => auto.add(m));
  if (primaryId === "DS1.3") ["token_completeness", "typography_balance_ratio", "wcag_aa_pass_rate"].forEach(m => auto.add(m));
  if (primaryId === "DS1.4") ["svg_render_fidelity"].forEach(m => auto.add(m));
  if (primaryId === "DS1.5") ["wcag_aa_pass_rate"].forEach(m => auto.add(m));
  if (primaryId === "DS1.6") ["ab_winner_prediction_acc", "visual_hierarchy_impact"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-DS-01")) ["wcag_aa_pass_rate"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-DS-02")) ["typography_balance_ratio"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-DS-06")) ["cultural_sensitivity_score"].forEach(m => auto.add(m));
  return [...auto];
}

function getAutoStorage(secondaryIds, primaryId) {
  if (primaryId === "DS1.1" || secondaryIds.includes("SEC-DS-03") || secondaryIds.includes("SEC-DS-04")) {
    return STORAGE_ENGINES[0]; // DuckDB + Parquet
  }
  return "";
}

function needsValidationStep(primaryId, secondaryIds) {
  return primaryId === "DS1.1" || primaryId === "DS1.2" || primaryId === "DS1.5" || secondaryIds.includes("SEC-DS-01") || secondaryIds.includes("SEC-DS-06") || secondaryIds.includes("SEC-DS-07");
}

// â”€â”€â”€ Generador del informe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function generateReport(data) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const primary = PRIMARY_TASKS.find(t => t.id === data.primaryTask);
  const secondaries = SECONDARY_TASKS.filter(s => data.secondaryTasks.includes(s.id));
  const metrics = DESIGN_METRICS.filter(m => data.selectedMetrics.includes(m.id));
  const appSlug = (data.appName || "design_app").toLowerCase().replace(/\s+/g, "_");
  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);
  const hasSEC01 = data.secondaryTasks.includes("SEC-DS-01");
  const hasSEC02 = data.secondaryTasks.includes("SEC-DS-02");
  const hasSEC03 = data.secondaryTasks.includes("SEC-DS-03");
  const hasSEC04 = data.secondaryTasks.includes("SEC-DS-04");
  const hasSEC05 = data.secondaryTasks.includes("SEC-DS-05");
  const hasSEC06 = data.secondaryTasks.includes("SEC-DS-06");
  const hasSEC07 = data.secondaryTasks.includes("SEC-DS-07");
  const hasSEC08 = data.secondaryTasks.includes("SEC-DS-08");

  const metricsByCategory = metrics.reduce((acc, m) => {
    if (!acc[m.cat]) acc[m.cat] = [];
    acc[m.cat].push(m);
    return acc;
  }, {});

  const treeLines = [
    appSlug + "/",
    "â”œâ”€â”€ src/",
    "â”‚   â”œâ”€â”€ __init__.py",
    "â”‚   â”œâ”€â”€ config.py                 # ConfiguraciÃ³n de diseÃ±o, perfiles de color y claves API (Google Fonts)",
    "â”‚   â”œâ”€â”€ schemas.py                # Modelos Pydantic v2 para paletas, tokens W3C y especificaciones de marca" + (hasSEC07 ? "\nâ”‚   â”‚                             # â†’ incluye middleware Guardrails de Asistencia Creativa (BR-DS-05)" : ""),
    data.primaryTask === "DS1.1" ? "â”‚   â”œâ”€â”€ brand_generator.py        # Generador de direcciones creativas y conceptos de identidad (BR-DS-01)" : null,
    hasSEC01 || data.primaryTask === "DS1.5" ? "â”‚   â”œâ”€â”€ wcag_contrast.py          # Calculador algorÃ­tmico de contraste WCAG 2.1 AA/AAA" : null,
    hasSEC02 || data.primaryTask === "DS1.1" ? "â”‚   â”œâ”€â”€ font_validator.py         # Conector con Google Fonts API y validador de pares tipogrÃ¡ficos" : null,
    data.primaryTask === "DS1.2" || hasSEC08 ? "â”‚   â”œâ”€â”€ ui_auditor.py             # Auditor heurÃ­stico de interfaces y detector de bounding boxes (BR-DS-02)" : null,
    data.primaryTask === "DS1.3" || hasSEC05 ? "â”‚   â”œâ”€â”€ design_tokens.py          # Generador de tokens W3C, CSS Variables y Tailwind Config (BR-DS-03)" : null,
    data.primaryTask === "DS1.4" ? "â”‚   â”œâ”€â”€ svg_generator.py          # Constructor de grÃ¡ficos y logotipos vectoriales limpios con svgwrite" : null,
    hasSEC06 ? "â”‚   â”œâ”€â”€ cultural_checker.py       # Analizador de connotaciones y semiÃ³tica cultural del color" : null,
    "â”‚   â”œâ”€â”€ storage.py                # " + (hasSEC04 ? "DuckDB + Parquet (BR-DS-04) con registro inmutable de variantes" : "Capa de persistencia de diseÃ±o"),
    "â”‚   â”œâ”€â”€ brand_reporting.py        # Generador de manuales de identidad y guÃ­as de estilo (Markdown / PDF)",
    "â”‚   â””â”€â”€ ui/",
    "â”‚       â”œâ”€â”€ __init__.py",
    "â”‚       â”œâ”€â”€ components.py         # Visores de paletas de color, muestras tipogrÃ¡ficas y renderizadores SVG",
    "â”‚       â””â”€â”€ main_view.py          # Dashboard de diseÃ±o y panel del director de arte",
    "â”œâ”€â”€ tests/",
    "â”‚   â”œâ”€â”€ test_schemas.py           # Pruebas de esquemas de tokens de diseÃ±o",
    hasSEC01 ? "â”‚   â”œâ”€â”€ test_wcag_contrast.py     # BaterÃ­a de cÃ¡lculo de contrastes y luminancia relativa" : null,
    data.primaryTask === "DS1.4" ? "â”‚   â””â”€â”€ test_svg_output.py        # ValidaciÃ³n sintÃ¡ctica de SVG generados" : null,
    "â”œâ”€â”€ data/                         # Ficheros de tokens JSON, assets SVG y cachÃ© de tipografÃ­as",
    "â”œâ”€â”€ requirements.txt              # svgwrite, pydantic, duckdb, requests, pytest",
    "â””â”€â”€ main.py                       # Punto de entrada de la aplicaciÃ³n de diseÃ±o",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "DS1.1" ? "- **BR-DS-01 (GÃ©nesis Visual):** Generador de identidad activado; paletas HEX con roles asignados; pares tipogrÃ¡ficos Google Fonts verificados." : null,
    data.primaryTask === "DS1.2" ? "- **BR-DS-02 (CrÃ­tica UI):** Auditor heurÃ­stico activado; bounding boxes de fricciÃ³n; evaluaciÃ³n de jerarquÃ­a visual de CTAs." : null,
    data.primaryTask === "DS1.3" ? "- **BR-DS-03 (Design Tokens):** Exportador W3C Design Tokens activado; salida dual CSS Variables + Tailwind Config." : null,
    hasSEC04 ? "- **BR-DS-04 (Persistencia AnalÃ­tica):** AlmacÃ©n columnar preconfigurado en DuckDB + Parquet para variantes y mÃ©tricas de diseÃ±o." : null,
    hasSEC07 ? "- **BR-DS-05 (Guardrail Creativo):** Salidas enmarcadas como puntos de partida exploratorios para iteraciÃ³n por el diseÃ±ador." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de verificaciÃ³n y control estÃ©tico:** " + data.validationModel,
        "- **Guardrail de seguridad profesional:** " + data.safetyGuardrail,
        "- **Principio de Asistencia Creativa:** La IA propone direcciones visuales y sistemas de diseÃ±o; la selecciÃ³n final y refinamiento es 100% del diseÃ±ador.",
        "- **CÃ¡lculo Determinista de Accesibilidad:** Los ratios de contraste WCAG se calculan mediante fÃ³rmulas matemÃ¡ticas exactas sobre los valores HEX/RGB.",
        "- **Trazabilidad Inmutable:** Cada direcciÃ³n creativa y token generado se registra en DuckDB con sellado temporal.",
      ].join("\n")
    : "La aplicaciÃ³n opera en modo de generaciÃ³n de tokens o grÃ¡ficos vectoriales directos.";

  const qaLines = [
    "1. **Pruebas de Contraste AlgorÃ­tmico (WCAG 2.1):** VerificaciÃ³n matemÃ¡tica de que todas las combinaciones texto/fondo propuestas superan 4.5:1 (Nivel AA).",
    "2. **ValidaciÃ³n de TipografÃ­as en Google Fonts:** ComprobaciÃ³n automÃ¡tica de disponibilidad de pesos (regular, medium, bold) vÃ­a API oficial.",
    "3. **Prueba de Renderizado SVG:** ValidaciÃ³n sintÃ¡ctica de archivos SVG generados y prueba de escalabilidad sin distorsiÃ³n vectorial.",
    "4. **Prueba de GeneraciÃ³n de Tokens:** ValidaciÃ³n del JSON generado frente a la especificaciÃ³n estÃ¡ndar del W3C Design Tokens Community Group.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACIÃ“N TÃ‰CNICA",
    "## Proyecto de Software de DiseÃ±o & Creatividad Visual: " + data.appName,
    "",
    "**Fecha de GeneraciÃ³n:** " + now,
    "**Ãrea Horizon:** DiseÃ±o, Creatividad Visual & Sistemas de DiseÃ±o",
    "**Arquitecto / DiseÃ±ador:** " + (data.authorName || "Horizon User"),
    "**VersiÃ³n del Documento:** v1.0.0 (EspecificaciÃ³n Formal de DiseÃ±o)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y PropÃ³sito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **DescripciÃ³n del nÃºcleo funcional:** " + (primary?.desc || ""),
    "- **PÃºblico objetivo:** " + (primary?.audience || ""),
    "- **Especialidades de diseÃ±o aplicables:** " + data.designDomains.join(", "),
    "- **Motores y librerÃ­as de procesamiento visual:** " + data.computationEngines.join(", "),
    "",
    "**Exclusiones explÃ­citas:** El sistema NO genera identidades finales cerradas sin revisiÃ³n de un diseÃ±ador profesional, NO registra marcas ni derechos de propiedad industrial de forma autÃ³noma y NO sustituye el criterio estÃ©tico y estratÃ©gico del equipo creativo.",
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
    "### 3. CatÃ¡logo de MÃ©tricas y Rigor EstÃ©tico",
    "",
    "El sistema implementarÃ¡ y monitorizarÃ¡ las siguientes mÃ©tricas de accesibilidad y diseÃ±o:",
    "",
    metricsSection || "_No se han seleccionado mÃ©tricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de Accesibilidad Visual y Guardrails Creativos",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack TecnolÃ³gico y Estructura de Scripts Python",
    "",
    "- **Capa de PresentaciÃ³n (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos:** " + data.storageEngine,
    "- **ValidaciÃ³n de Datos:** Pydantic v2 con esquemas de tokens W3C y tipado estricto.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y ValidaciÃ³n (QA de DiseÃ±o)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. ClÃ¡usula de AutorÃ­a Creativa y Descargo de Responsabilidad",
    "",
    "> **AVISO PROFESIONAL Y METODOLÃ“GICO OBLIGATORIO**",
    ">",
    "> Esta especificaciÃ³n tÃ©cnica y cualquier software desarrollado a partir de ella tiene carÃ¡cter **exclusivamente de herramienta de apoyo a la ideaciÃ³n, auditorÃ­a de accesibilidad y generaciÃ³n de tokens de diseÃ±o**.",
    ">",
    "> - **Las propuestas generadas son puntos de partida exploratorios para que el diseÃ±ador refine, personalice y valide**.",
    "> - Todo sistema de identidad, paleta o diseÃ±o de interfaz debe ser **revisado y aprobado por el director de arte o responsable de diseÃ±o** antes de su lanzamiento en producciÃ³n.",
    "> - La accesibilidad WCAG se garantiza mediante validaciÃ³n algorÃ­tmica determinista de ratios de contraste.",
    ">",
    "> DiseÃ±ado en **Horizon â€” Centro Interactivo de IA Aplicada.** Laboratorio de DiseÃ±o & Creatividad Visual.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de EspecificaciÃ³n TÃ©cnica â€” Generado automÃ¡ticamente por Horizon DesignAppWizard v1.0_",
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
          className="h-full bg-amber-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
              i + 1 < step
                ? "bg-amber-500 text-white"
                : i + 1 === step
                ? "bg-amber-500 text-white ring-4 ring-amber-500/20"
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
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-sm transition-colors"
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
      className="w-full bg-dark/[0.02] border border-dark/12 text-dark text-sm rounded-sm px-3.5 py-2.5 focus:outline-hidden focus:border-amber-500 placeholder:text-dark/25 transition-colors"
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
              ? "border-amber-500/40 bg-amber-50/30"
              : "border-dark/10 hover:border-dark/20 hover:bg-dark/[0.01]"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            value === (opt.id || opt) ? "border-amber-500" : "border-dark/25"
          }`}>
            {value === (opt.id || opt) && <div className="w-2 h-2 rounded-full bg-amber-500" />}
          </div>
          <input type="radio" className="sr-only" checked={value === (opt.id || opt)} onChange={() => onChange(opt.id || opt)} />
          <div>
            {opt.label ? (
              <>
                <p className="text-sm font-semibold text-dark"><span className="text-amber-600 text-xs mr-1.5">{opt.id}</span>{opt.label}</p>
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
              isChecked ? "border-amber-500/40 bg-amber-50/30" : isDisabled ? "border-dark/6 opacity-40 cursor-not-allowed" : "border-dark/10 hover:border-dark/20"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${isChecked ? "border-amber-500 bg-amber-500" : "border-dark/25"}`}>
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={isChecked} disabled={isDisabled} onChange={() => !isDisabled && toggle(opt.id || opt)} />
            <div>
              {opt.label ? (
                <>
                  <p className="text-sm font-medium text-dark"><span className="text-xs text-amber-600 mr-1">[{opt.id}]</span>{opt.label}</p>
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
            value === opt ? "border-amber-500/40 bg-amber-50/30" : "border-dark/10 hover:border-dark/20"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${value === opt ? "border-amber-500" : "border-dark/25"}`}>
            {value === opt && <div className="w-2 h-2 rounded-full bg-amber-500" />}
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
  designDomains: [],
  computationEngines: [],
  selectedMetrics: [],
  validationModel: "",
  safetyGuardrail: "",
  uiFramework: "",
  storageEngine: "",
});

export default function WizardDiseno() {
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
      if (data.designDomains.length === 0) e.designDomains = "Selecciona al menos una especialidad de diseÃ±o.";
      if (data.computationEngines.length === 0) e.computationEngines = "Selecciona al menos un motor de procesamiento.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una mÃ©trica de diseÃ±o.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de verificaciÃ³n de diseÃ±o.";
      if (!data.safetyGuardrail) e.safetyGuardrail = "Selecciona el guardrail de seguridad creativa.";
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
    a.download = `informe_${(data.appName || "design_app").toLowerCase().replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);

  return (
    <div className="min-h-full bg-[#F7F6F2]">
      <div className="max-w-[820px] mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-8">
          <Link to="/areas/diseno" className="inline-flex items-center gap-1.5 text-xs text-dark/40 hover:text-dark transition-colors mb-6">
            <ArrowLeft size={13} /> Laboratorio de DiseÃ±o
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0 text-amber-600 font-display text-xl">ðŸŽ¨</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                DiseÃ±ador de Proyectos â€” DiseÃ±o & Creatividad Visual
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicaciÃ³n de diseÃ±o paso a paso con accesibilidad WCAG 2.1, tipografÃ­a modular y tokens W3C.
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
                <p className="text-dark/45 text-sm mb-6">Selecciona el nÃºcleo funcional que definirÃ¡ la arquitectura de tu aplicaciÃ³n de diseÃ±o.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="SerÃ¡ el tÃ­tulo de tu especificaciÃ³n tÃ©cnica de diseÃ±o.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: GÃ©nesis Visual, CrÃ­tica UI, Design System Studio, SVG Canvasâ€¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias, estudio de diseÃ±o o agencia creativa.">DiseÃ±ador / Estudio Creativo</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Estudio Creativo, Director de Arteâ€¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la funciÃ³n de diseÃ±o principal. Esto determinarÃ¡ los motores y reglas de accesibilidad requeridas.">Tarea principal de la aplicaciÃ³n</FieldLabel>
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
                <p className="text-dark/45 text-sm mb-6">AÃ±ade hasta <strong>4 capacidades creativas y de accesibilidad</strong> para robustecer el sistema.</p>

                <div className="bg-amber-500/[0.04] border border-amber-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 â€” Ãmbito de DiseÃ±o & Motores</h2>
                <p className="text-dark/45 text-sm mb-6">Configura las especialidades creativas aplicables y las librerÃ­as de renderizado visual.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Campos creativos y Ã¡reas visuales donde operarÃ¡ el sistema.">Especialidades de diseÃ±o aplicables</FieldLabel>
                    <CheckGroup options={DESIGN_DOMAINS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.designDomains} onChange={set("designDomains")} max={6} />
                    {errors.designDomains && <p className="text-red-500 text-xs mt-1.5">{errors.designDomains}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="LibrerÃ­as de colorimetrÃ­a, grÃ¡ficos vectoriales y validaciÃ³n tipogrÃ¡fica.">Motores y librerÃ­as de procesamiento visual</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 â€” CatÃ¡logo de MÃ©tricas de DiseÃ±o</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las mÃ©tricas de accesibilidad, coherencia visual y conversiÃ³n que evaluarÃ¡ el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-amber-800">
                    âœ“ {data.selectedMetrics.length} mÃ©trica{data.selectedMetrics.length !== 1 ? "s" : ""} de diseÃ±o preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automÃ¡ticamente segÃºn tu tarea principal.
                  </div>
                )}

                {["Accesibilidad & Color", "UX & ConversiÃ³n", "TipografÃ­a & Layout", "Branding & SemiÃ³tica", "UI & AuditorÃ­a", "Sistemas de DiseÃ±o", "GrÃ¡ficos Vectoriales"].map(cat => (
                  <div key={cat} className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-dark/40 mb-2.5">{cat}</p>
                    <div className="space-y-1.5">
                      {DESIGN_METRICS.filter(m => m.cat === cat).map(m => {
                        const isChecked = data.selectedMetrics.includes(m.id);
                        return (
                          <label key={m.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? "border-amber-500/30 bg-amber-50/30" : "border-dark/8 hover:border-dark/15"}`}>
                            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${isChecked ? "border-amber-500 bg-amber-500" : "border-dark/20"}`}>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 â€” Accesibilidad WCAG y Guardrails Creativos</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-amber-800 flex items-start gap-2">
                      <Palette size={16} className="shrink-0 mt-0.5 text-amber-600" />
                      Este paso estÃ¡ activo para garantizar la accesibilidad WCAG 2.1 (AA/AAA), la disponibilidad tipogrÃ¡fica y la preservaciÃ³n de la autorÃ­a humana.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de verificaciÃ³n de contraste y coherencia visual.">Modelo de verificaciÃ³n de diseÃ±o</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="RestricciÃ³n de seguridad activa para evitar fallos de accesibilidad o sobreescritura creativa.">Guardrail de seguridad creativa</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios de calidad y accesibilidad (activados por diseÃ±o)</p>
                        {[
                          "Principio de Asistencia Creativa: la IA genera direcciones exploratorias; la selecciÃ³n y refinamiento es 100% del diseÃ±ador.",
                          "VerificaciÃ³n AlgorÃ­tmica WCAG: ratios de contraste calculados con la fÃ³rmula matemÃ¡tica oficial de luminancia relativa W3C.",
                          "Trazabilidad Inmutable: registro de cada propuesta de paleta y tokens en DuckDB con sellado temporal.",
                        ].map(c => (
                          <div key={c} className="flex items-start gap-2.5 mb-2 last:mb-0">
                            <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} className="text-amber-700" />
                            </div>
                            <p className="text-[12.5px] text-dark/60 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo exportaciÃ³n de tokens o generaciÃ³n SVG</strong> sin auditorÃ­a de contraste en tiempo real.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides aÃ±adir auditorÃ­a de marca o cÃ¡lculo de accesibilidad, vuelve al <strong>Paso 2</strong> y activa el mÃ³dulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-DS-01</code> o <code className="bg-dark/5 px-1 rounded text-xs">SEC-DS-06</code>.
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
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y formatos de exportaciÃ³n para tu aplicaciÃ³n de diseÃ±o.</p>

                {data.secondaryTasks.includes("SEC-DS-04") && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-amber-800">
                    âœ“ Persistencia analÃ­tica preconfigurada en <strong>DuckDB + Parquet</strong> por el mÃ³dulo SEC-DS-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para diseÃ±adores, directores de arte y desarrolladores.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="DÃ³nde y cÃ³mo se almacenarÃ¡n las direcciones creativas, tokens y assets SVG.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar EspecificaciÃ³n de DiseÃ±o" />
              </StepCard>
            )}
          </>
        )}

        {/* â”€â”€ PANTALLA FINAL: INFORME â”€â”€ */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-amber-100 border border-amber-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-amber-700" />
                </div>
                <h2 className="font-display text-[24px] text-dark">EspecificaciÃ³n de diseÃ±o generada con Ã©xito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria tÃ©cnica para <strong className="text-dark">{data.appName}</strong> estÃ¡ lista para desarrollo y exportaciÃ³n de tokens.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={downloadMd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-sm transition-colors"
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
                <strong>Aviso profesional y creativo:</strong> Este informe especifica una arquitectura de software de apoyo a la ideaciÃ³n y generaciÃ³n de tokens. No constituye identidad corporativa final cerrada ni sustituye la direcciÃ³n de arte humana.
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
              <span className="text-amber-500 mt-1.5 shrink-0">â€¢</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (/^\d+\. /.test(line)) {
          const num = line.match(/^(\d+)\./)[1];
          return (
            <div key={i} className="flex items-start gap-2.5 pl-2">
              <span className="text-amber-500 font-semibold text-xs mt-1 shrink-0 w-4">{num}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, "")) }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-4 border-amber-500 bg-amber-50 px-4 py-2 rounded-r-lg text-[13px] text-amber-950 my-2">
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

