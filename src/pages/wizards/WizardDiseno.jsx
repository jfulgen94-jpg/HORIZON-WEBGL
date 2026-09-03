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

// ─── Constantes de datos (Diseño & Creatividad Visual) ─────────────────────—€

const PRIMARY_TASKS = [
  {
    id: "DS1.1",
    label: "Generador de Direcciones Creativas e Identidad de Marca (Génesis Visual)",
    desc: "Generación de sistemas de identidad coherentes (concepto estético, paletas de color HEX con roles asignados, pares tipográficos verificados en Google Fonts y análisis de sensibilidad cultural).",
    audience: "Estudios de diseño, directores de arte, agencias de branding, diseñadores de marca y marketing.",
  },
  {
    id: "DS1.2",
    label: "Auditor Heurístico de Interfaces y Crítica UI/UX (Crítica UI)",
    desc: "Análisis visual multimodal de capturas de pantalla, localización por bounding boxes de puntos de fricción, auditoría de jerarquía de CTAs y contraste WCAG 2.1.",
    audience: "Diseñadores de producto (Product Designers), investigadores UX, auditores de usabilidad.",
  },
  {
    id: "DS1.3",
    label: "Generador de Sistemas de Diseño y Design Tokens Paramétricos (Design System Studio)",
    desc: "Definición estructurada de tokens de diseño (colores semánticos, escala modular tipográfica, retícula de 8px, elevaciones) exportables a CSS Variables, Tailwind y Figma JSON.",
    audience: "Ingenieros de sistemas de diseño (Design Technologists), desarrolladores frontend, líderes de UI.",
  },
  {
    id: "DS1.4",
    label: "Generador de Gráficos Vectoriales y Logotipos Paramétricos en SVG (SVG Canvas)",
    desc: "Creación determinista de código SVG limpio, escalable y optimizado con svgwrite, sin artefactos rasterizados ni degradación de resolución.",
    audience: "Diseñadores gráficos vectoriales, desarrolladores web, creadores de iconos e infografías.",
  },
  {
    id: "DS1.5",
    label: "Auditor de Accesibilidad Visual y Contraste de Color (WCAG 2.1 AA/AAA)",
    desc: "Cálculo algorítmico de luminancia relativa y ratio de contraste texto/fondo con etiquetado de conformidad y recomendaciones de corrección.",
    audience: "Auditores de accesibilidad digital, diseñadores inclusivos, responsables de calidad web.",
  },
  {
    id: "DS1.6",
    label: "Optimizador de Tasa de Conversión (CRO) y Predicción de Tests A/B (WiserUI)",
    desc: "Evaluación predictiva de variantes de interfaces basada en benchmarks de A/B testing real para maximizar la eficacia de llamadas a la acción y checkout.",
    audience: "Especialistas en CRO, growth managers, diseñadores de ecommerce y landing pages.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-DS-01", label: "Validador Algorítmico de Contraste y Accesibilidad WCAG 2.1 (AA / AAA)", desc: "Verificación matemática estricta de ratios de contraste (mínimo 4.5:1 para texto normal, 3:1 para texto grande)." },
  { id: "SEC-DS-02", label: "Verificador de Disponibilidad de Tipografías en Google Fonts API", desc: "Comprobación en tiempo real de existencia, variantes de peso y compatibilidad multilingüe de fuentes." },
  { id: "SEC-DS-03", label: "Pista de Historial Creativo y Versiones de Diseño en DuckDB", desc: "Registro inmutable de briefings, paletas, tokens generados y feedback de diseño con sellado temporal." },
  { id: "SEC-DS-04", label: "Persistencia Columnar Ultrarrápida y Modo Offline (DuckDB + Parquet)", desc: "Almacenamiento local seguro de assets, tokens de diseño y métricas de accesibilidad." },
  { id: "SEC-DS-05", label: "Exportador a Formatos Estándar (CSS Variables, Tailwind Config, Figma Tokens JSON, SVG)", desc: "Salida modular lista para integración directa en frontends web o herramientas de diseño." },
  { id: "SEC-DS-06", label: "Detector de Connotaciones y Sesgo Cultural del Color (Cultural VQA)", desc: "Alertas tempranas sobre significados desfavorables de colores o símbolos en mercados internacionales específicos." },
  { id: "SEC-DS-07", label: "Asistente con Guardrail de No-Sustitución del Criterio Creativo", desc: "Restricción que enmarca las salidas como puntos de partida exploratorios, preservando la autoría humana." },
  { id: "SEC-DS-08", label: "Detector de Bounding Boxes y Mapas de Calor de Atención Visual", desc: "Mapeo de coordenadas de elementos clave de la interfaz para predecir el recorrido visual del usuario." },
];

const DESIGN_DOMAINS = [
  "Identidad Visual, Branding & Diseño Corporativo",
  "Diseño de Interfaces (UI) & Experiencia de Usuario (UX)",
  "Sistemas de Diseño (Design Systems) & Design Tokens",
  "Gráficos Vectoriales, Ilustración & SVG Paramétrico",
  "Accesibilidad Digital (WCAG 2.1) & Diseño Inclusivo",
  "Optimización de Conversión (CRO) & Flujos de Checkout",
];

const COMPUTATION_ENGINES = [
  "Python + colormath / wcag-contrast (Cálculo algorítmico exacto de contraste y colorimetría)",
  "svgwrite / cairosvg (Generación, renderizado y optimización de gráficos SVG)",
  "Google Fonts API Client (Validación de fuentes tipográficas web)",
  "DuckDB + Parquet (Almacén analítico columnar de tokens y variantes de diseño)",
  "Pydantic v2 (Validación de esquemas de Design Tokens conformes al W3C)",
  "Tailwind / CSS Formatter (Generación de hojas de estilo limpias y optimizadas)",
];

const DESIGN_METRICS = [
  { id: "wcag_aa_pass_rate", label: "Tasa de Conformidad WCAG 2.1 AA", cat: "Accesibilidad & Color", desc: "Porcentaje de combinaciones de color de la interfaz que superan el ratio mínimo 4.5:1." },
  { id: "visual_hierarchy_impact", label: "Índice de Jerarquía Visual de CTAs", cat: "UX & Conversión", desc: "Capacidad de guiar la atención del usuario hacia la acción principal sin ambigüedad visual." },
  { id: "ab_winner_prediction_acc", label: "Acierto en Predicción A/B (WiserUI)", cat: "UX & Conversión", desc: "Exactitud en predecir qué variante de diseño generará mayor conversión en tests reales." },
  { id: "typography_balance_ratio", label: "Equilibrio Tipográfico y Modularidad", cat: "Tipografía & Layout", desc: "Consistencia en la escala modular tipográfica y ritmo vertical en retícula de 8px." },
  { id: "cultural_sensitivity_score", label: "Índice de Adecuación Cultural (CVQA)", cat: "Branding & Semiótica", desc: "Ausencia de connotaciones tabú o negativas de color/simbología en el mercado geográfico objetivo." },
  { id: "bounding_box_precision", label: "Precisión en Localización UI (BBox Detection)", cat: "UI & Auditoría", desc: "Exactitud en coordenadas de píxeles al identificar elementos de interfaz en capturas." },
  { id: "token_completeness", label: "Completitud de Design Tokens W3C", cat: "Sistemas de Diseño", desc: "Cobertura total de variables para color, tipografía, espaciado, bordes y elevaciones." },
  { id: "svg_render_fidelity", label: "Fidelidad y Optimización de Código SVG", cat: "Gráficos Vectoriales", desc: "Validación de sintaxis SVG limpia sin etiquetas redundantes ni artefactos visuales." },
];

const VALIDATION_MODELS = [
  "Doble Etapa: Razonamiento Multimodal Claude 3.7 Sonnet + Verificación Matemática de Contraste WCAG",
  "Validación Algorítmica Determinista de Luminancia Relativa (Fórmula Oficial W3C)",
  "Comprobación de Existencia en Catálogo de Google Fonts mediante API Oficial",
  "Auditoría de Retícula Espacial de 8px y Escalas Modulares de Tipografía",
];

const SAFETY_GUARDRAILS = [
  "Aislamiento de Criterio: Prohibición de Declarar Diseños Definitivos sin Aprobación Humana",
  "Bloqueo Obligatorio ante Inaccesibilidad Severa: Alerta Crítica en Contrastes < 3.0:1",
  "Verificación Obligatoria de Licencias y Disponibilidad Web en Tipografías Propuestas",
  "Cláusula de Autoría y Exploración Creativa en Todos los Informes de Identidad",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard interactivo con visores de paletas interactivas y renderizado SVG)",
  "FastAPI + React / Next.js (Visualizador de Design Tokens y portal de marca en vivo)",
  "Flet (Aplicación de escritorio local .exe para estudios creativos con assets locales)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (Almacén analítico columnar para histórico de direcciones y métricas)",
  "Ficheros JSON W3C Design Tokens + CSS Variables",
  "Repositorio de Ficheros SVG con Control de Versiones",
  "Almacén de Proyectos Creativos en Formato Markdown con Muestras de Color",
];

// ─── Helpers ───────────────────────────────────────────────────────────────—€

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

// ─── Generador del informe ────────────────────────────────────────────────—

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
    "—œ─── src/",
    "—‚   —œ─── __init__.py",
    "—‚   —œ─── config.py                 # Configuración de diseño, perfiles de color y claves API (Google Fonts)",
    "—‚   —œ─── schemas.py                # Modelos Pydantic v2 para paletas, tokens W3C y especificaciones de marca" + (hasSEC07 ? "\n—‚   —‚                             # â†’ incluye middleware Guardrails de Asistencia Creativa (BR-DS-05)" : ""),
    data.primaryTask === "DS1.1" ? "—‚   —œ─── brand_generator.py        # Generador de direcciones creativas y conceptos de identidad (BR-DS-01)" : null,
    hasSEC01 || data.primaryTask === "DS1.5" ? "—‚   —œ─── wcag_contrast.py          # Calculador algorítmico de contraste WCAG 2.1 AA/AAA" : null,
    hasSEC02 || data.primaryTask === "DS1.1" ? "—‚   —œ─── font_validator.py         # Conector con Google Fonts API y validador de pares tipográficos" : null,
    data.primaryTask === "DS1.2" || hasSEC08 ? "—‚   —œ─── ui_auditor.py             # Auditor heurístico de interfaces y detector de bounding boxes (BR-DS-02)" : null,
    data.primaryTask === "DS1.3" || hasSEC05 ? "—‚   —œ─── design_tokens.py          # Generador de tokens W3C, CSS Variables y Tailwind Config (BR-DS-03)" : null,
    data.primaryTask === "DS1.4" ? "—‚   —œ─── svg_generator.py          # Constructor de gráficos y logotipos vectoriales limpios con svgwrite" : null,
    hasSEC06 ? "—‚   —œ─── cultural_checker.py       # Analizador de connotaciones y semiótica cultural del color" : null,
    "—‚   —œ─── storage.py                # " + (hasSEC04 ? "DuckDB + Parquet (BR-DS-04) con registro inmutable de variantes" : "Capa de persistencia de diseño"),
    "—‚   —œ─── brand_reporting.py        # Generador de manuales de identidad y guías de estilo (Markdown / PDF)",
    "—‚   —”─── ui/",
    "—‚       —œ─── __init__.py",
    "—‚       —œ─── components.py         # Visores de paletas de color, muestras tipográficas y renderizadores SVG",
    "—‚       —”─── main_view.py          # Dashboard de diseño y panel del director de arte",
    "—œ─── tests/",
    "—‚   —œ─── test_schemas.py           # Pruebas de esquemas de tokens de diseño",
    hasSEC01 ? "—‚   —œ─── test_wcag_contrast.py     # Batería de cálculo de contrastes y luminancia relativa" : null,
    data.primaryTask === "DS1.4" ? "—‚   —”─── test_svg_output.py        # Validación sintáctica de SVG generados" : null,
    "—œ─── data/                         # Ficheros de tokens JSON, assets SVG y caché de tipografías",
    "—œ─── requirements.txt              # svgwrite, pydantic, duckdb, requests, pytest",
    "—”─── main.py                       # Punto de entrada de la aplicación de diseño",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "DS1.1" ? "- **BR-DS-01 (Génesis Visual):** Generador de identidad activado; paletas HEX con roles asignados; pares tipográficos Google Fonts verificados." : null,
    data.primaryTask === "DS1.2" ? "- **BR-DS-02 (Crítica UI):** Auditor heurístico activado; bounding boxes de fricción; evaluación de jerarquía visual de CTAs." : null,
    data.primaryTask === "DS1.3" ? "- **BR-DS-03 (Design Tokens):** Exportador W3C Design Tokens activado; salida dual CSS Variables + Tailwind Config." : null,
    hasSEC04 ? "- **BR-DS-04 (Persistencia Analítica):** Almacén columnar preconfigurado en DuckDB + Parquet para variantes y métricas de diseño." : null,
    hasSEC07 ? "- **BR-DS-05 (Guardrail Creativo):** Salidas enmarcadas como puntos de partida exploratorios para iteración por el diseñador." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de verificación y control estético:** " + data.validationModel,
        "- **Guardrail de seguridad profesional:** " + data.safetyGuardrail,
        "- **Principio de Asistencia Creativa:** La IA propone direcciones visuales y sistemas de diseño; la selección final y refinamiento es 100% del diseñador.",
        "- **Cálculo Determinista de Accesibilidad:** Los ratios de contraste WCAG se calculan mediante fórmulas matemáticas exactas sobre los valores HEX/RGB.",
        "- **Trazabilidad Inmutable:** Cada dirección creativa y token generado se registra en DuckDB con sellado temporal.",
      ].join("\n")
    : "La aplicación opera en modo de generación de tokens o gráficos vectoriales directos.";

  const qaLines = [
    "1. **Pruebas de Contraste Algorítmico (WCAG 2.1):** Verificación matemática de que todas las combinaciones texto/fondo propuestas superan 4.5:1 (Nivel AA).",
    "2. **Validación de Tipografías en Google Fonts:** Comprobación automática de disponibilidad de pesos (regular, medium, bold) vía API oficial.",
    "3. **Prueba de Renderizado SVG:** Validación sintáctica de archivos SVG generados y prueba de escalabilidad sin distorsión vectorial.",
    "4. **Prueba de Generación de Tokens:** Validación del JSON generado frente a la especificación estándar del W3C Design Tokens Community Group.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACI“N TÃ‰CNICA",
    "## Proyecto de Software de Diseño & Creatividad Visual: " + data.appName,
    "",
    "**Fecha de Generación:** " + now,
    "**Área Horizon:** Diseño, Creatividad Visual & Sistemas de Diseño",
    "**Arquitecto / Diseñador:** " + (data.authorName || "Horizon User"),
    "**Versión del Documento:** v1.0.0 (Especificación Formal de Diseño)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y Propósito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **Descripción del núcleo funcional:** " + (primary?.desc || ""),
    "- **Público objetivo:** " + (primary?.audience || ""),
    "- **Especialidades de diseño aplicables:** " + data.designDomains.join(", "),
    "- **Motores y librerías de procesamiento visual:** " + data.computationEngines.join(", "),
    "",
    "**Exclusiones explícitas:** El sistema NO genera identidades finales cerradas sin revisión de un diseñador profesional, NO registra marcas ni derechos de propiedad industrial de forma autónoma y NO sustituye el criterio estético y estratégico del equipo creativo.",
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
    "### 3. Catálogo de Métricas y Rigor Estético",
    "",
    "El sistema implementará y monitorizará las siguientes métricas de accesibilidad y diseño:",
    "",
    metricsSection || "_No se han seleccionado métricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de Accesibilidad Visual y Guardrails Creativos",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack Tecnológico y Estructura de Scripts Python",
    "",
    "- **Capa de Presentación (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos:** " + data.storageEngine,
    "- **Validación de Datos:** Pydantic v2 con esquemas de tokens W3C y tipado estricto.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y Validación (QA de Diseño)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. Cláusula de Autoría Creativa y Descargo de Responsabilidad",
    "",
    "> **AVISO PROFESIONAL Y METODOL“GICO OBLIGATORIO**",
    ">",
    "> Esta especificación técnica y cualquier software desarrollado a partir de ella tiene carácter **exclusivamente de herramienta de apoyo a la ideación, auditoría de accesibilidad y generación de tokens de diseño**.",
    ">",
    "> - **Las propuestas generadas son puntos de partida exploratorios para que el diseñador refine, personalice y valide**.",
    "> - Todo sistema de identidad, paleta o diseño de interfaz debe ser **revisado y aprobado por el director de arte o responsable de diseño** antes de su lanzamiento en producción.",
    "> - La accesibilidad WCAG se garantiza mediante validación algorítmica determinista de ratios de contraste.",
    ">",
    "> Diseñado en **Horizon — Centro Interactivo de IA Aplicada.** Laboratorio de Diseño & Creatividad Visual.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de Especificación Técnica — Generado automáticamente por Horizon DesignAppWizard v1.0_",
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

// ─── Componente principal ───────────────────────────────────────────────────—€

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
      if (data.designDomains.length === 0) e.designDomains = "Selecciona al menos una especialidad de diseño.";
      if (data.computationEngines.length === 0) e.computationEngines = "Selecciona al menos un motor de procesamiento.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una métrica de diseño.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de verificación de diseño.";
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
            <ArrowLeft size={13} /> Laboratorio de Diseño
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0 text-amber-600 font-display text-xl">ðŸŽ¨</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                Diseñador de Proyectos — Diseño & Creatividad Visual
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicación de diseño paso a paso con accesibilidad WCAG 2.1, tipografía modular y tokens W3C.
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
                <p className="text-dark/45 text-sm mb-6">Selecciona el núcleo funcional que definirá la arquitectura de tu aplicación de diseño.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="Será el título de tu especificación técnica de diseño.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Génesis Visual, Crítica UI, Design System Studio, SVG Canvas–¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias, estudio de diseño o agencia creativa.">Diseñador / Estudio Creativo</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Estudio Creativo, Director de Arte–¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la función de diseño principal. Esto determinará los motores y reglas de accesibilidad requeridas.">Tarea principal de la aplicación</FieldLabel>
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
                <p className="text-dark/45 text-sm mb-6">Añade hasta <strong>4 capacidades creativas y de accesibilidad</strong> para robustecer el sistema.</p>

                <div className="bg-amber-500/[0.04] border border-amber-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 — Ámbito de Diseño & Motores</h2>
                <p className="text-dark/45 text-sm mb-6">Configura las especialidades creativas aplicables y las librerías de renderizado visual.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Campos creativos y áreas visuales donde operará el sistema.">Especialidades de diseño aplicables</FieldLabel>
                    <CheckGroup options={DESIGN_DOMAINS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.designDomains} onChange={set("designDomains")} max={6} />
                    {errors.designDomains && <p className="text-red-500 text-xs mt-1.5">{errors.designDomains}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Librerías de colorimetría, gráficos vectoriales y validación tipográfica.">Motores y librerías de procesamiento visual</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 — Catálogo de Métricas de Diseño</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las métricas de accesibilidad, coherencia visual y conversión que evaluará el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-amber-800">
                    ““ {data.selectedMetrics.length} métrica{data.selectedMetrics.length !== 1 ? "s" : ""} de diseño preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automáticamente según tu tarea principal.
                  </div>
                )}

                {["Accesibilidad & Color", "UX & Conversión", "Tipografía & Layout", "Branding & Semiótica", "UI & Auditoría", "Sistemas de Diseño", "Gráficos Vectoriales"].map(cat => (
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 — Accesibilidad WCAG y Guardrails Creativos</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-amber-800 flex items-start gap-2">
                      <Palette size={16} className="shrink-0 mt-0.5 text-amber-600" />
                      Este paso está activo para garantizar la accesibilidad WCAG 2.1 (AA/AAA), la disponibilidad tipográfica y la preservación de la autoría humana.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de verificación de contraste y coherencia visual.">Modelo de verificación de diseño</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="Restricción de seguridad activa para evitar fallos de accesibilidad o sobreescritura creativa.">Guardrail de seguridad creativa</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios de calidad y accesibilidad (activados por diseño)</p>
                        {[
                          "Principio de Asistencia Creativa: la IA genera direcciones exploratorias; la selección y refinamiento es 100% del diseñador.",
                          "Verificación Algorítmica WCAG: ratios de contraste calculados con la fórmula matemática oficial de luminancia relativa W3C.",
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
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo exportación de tokens o generación SVG</strong> sin auditoría de contraste en tiempo real.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides añadir auditoría de marca o cálculo de accesibilidad, vuelve al <strong>Paso 2</strong> y activa el módulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-DS-01</code> o <code className="bg-dark/5 px-1 rounded text-xs">SEC-DS-06</code>.
                    </div>
                  </div>
                )}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 6 */}
            {step === 6 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 6 — Stack Tecnológico & Persistencia</h2>
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y formatos de exportación para tu aplicación de diseño.</p>

                {data.secondaryTasks.includes("SEC-DS-04") && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-amber-800">
                    ““ Persistencia analítica preconfigurada en <strong>DuckDB + Parquet</strong> por el módulo SEC-DS-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para diseñadores, directores de arte y desarrolladores.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Dónde y cómo se almacenarán las direcciones creativas, tokens y assets SVG.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar Especificación de Diseño" />
              </StepCard>
            )}
          </>
        )}

        {/* PANTALLA FINAL: INFORME */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-amber-100 border border-amber-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-amber-700" />
                </div>
                <h2 className="font-display text-[24px] text-dark">Especificación de diseño generada con éxito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria técnica para <strong className="text-dark">{data.appName}</strong> está lista para desarrollo y exportación de tokens.
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
                <strong>Aviso profesional y creativo:</strong> Este informe especifica una arquitectura de software de apoyo a la ideación y generación de tokens. No constituye identidad corporativa final cerrada ni sustituye la dirección de arte humana.
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
              <span className="text-amber-500 mt-1.5 shrink-0">–¢</span>
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

