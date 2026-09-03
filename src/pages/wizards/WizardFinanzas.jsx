import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Download } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";

// —€—€—€ Constantes de datos —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

const PRIMARY_TASKS = [
  {
    id: "F1.1",
    label: "Motor de Descarga, Normalización y Análisis Fundamental",
    desc: "Descarga masiva de estados contables (Balance, P&G, Flujos de Caja) y cálculo de múltiplos de valoración (PER, EV/EBITDA, P/B, FCF Yield).",
    audience: "Analistas de renta variable, departamentos de M&A, gestores patrimoniales.",
  },
  {
    id: "F1.2",
    label: "Simulador de Estrategias Cuantitativas (Backtesting)",
    desc: "Motor de prueba retrospectiva sobre series históricas. Simula reglas de entrada/salida, costes de fricción, slippage y Walk-Forward.",
    audience: "Quants, traders algorítmicos, inversores sistemáticos.",
  },
  {
    id: "F1.3",
    label: "Monitor de Sentimiento de Mercado & NLP Financiero",
    desc: "Extracción de polaridad y señales de divergencia precio-sentimiento sobre noticias, earnings calls e informes regulatorios (10-K/10-Q).",
    audience: "Analistas macroeconómicos, gestores de fondos de eventos corporativos.",
  },
  {
    id: "F1.4",
    label: "Sistema de Detección de Señales Técnicas y Acción del Precio",
    desc: "Cálculo de indicadores técnicos (RSI, MACD, Bollinger, ATR), detección de rupturas y generación de matrices de alertas sobre datos OHLCV.",
    audience: "Operadores de swing trading, analistas técnicos sistemáticos.",
  },
  {
    id: "F1.5",
    label: "Plataforma de Gestión de Riesgo de Cartera y Stress Testing",
    desc: "VaR (paramétrico, histórico y Monte Carlo), Expected Shortfall, matrices de covarianza y simulaciones de crisis históricas (2008, 2020).",
    audience: "CRO, comités de auditoría, family offices, gestores de fondos.",
  },
  {
    id: "F1.6",
    label: "Cuadro de Mando Macroeconómico y Radar de Dividendos",
    desc: "Dashboard que conecta variables macro globales (tipos de interés, inflación, diferenciales de crédito) con sostenibilidad de dividendos corporativos.",
    audience: "Inversores DGI, comités de asset allocation, analistas macro.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-01", label: "Conciliación y Limpieza Automática de Series Temporales", desc: "Ajuste por dividendos, splits, alineación de calendarios y tratamiento de valores ausentes." },
  { id: "SEC-02", label: "Generador de Informes de Auditoría con Trazabilidad Completa", desc: "Exportación a PDF/Markdown con registro inmutable de fuentes, timestamps UTC y hashes de verificación." },
  { id: "SEC-03", label: "Sistema de Alertas Proactivas y Disparadores Multicanal", desc: "Notificaciones locales, webhooks (Slack/Discord/Telegram) o correo electrónico ante cruces o divergencias." },
  { id: "SEC-04", label: "Almacenamiento Columnar Ultrarrápido y Modo Offline (DuckDB/Parquet)", desc: "Persistencia analítica local con consultas SQL mediante DuckDB y dataset DEMO precargado." },
  { id: "SEC-05", label: "Módulo de Atribución de Rendimiento Factorial (Brinson / Fama-French)", desc: "Descomposición de retornos según Size, Value, Momentum, Quality y atribución sectorial." },
  { id: "SEC-06", label: "Visualizador Interactivo Avanzado con Gráficos de Velas y Heatmaps", desc: "Gráficos de velas japonesas, Volume Profile, correlaciones interactivas y visualización de drawdowns." },
  { id: "SEC-07", label: "Asistente Explicativo con IA (LLM + Guardrails Antialucinación)", desc: "Interpretación de resultados con restricciones severas que impiden inventar cifras o emitir recomendaciones." },
  { id: "SEC-08", label: "Integrador de APIs Externas y Exportador a Hoja de Cálculo (Excel/CSV)", desc: "API REST interna (FastAPI) y exportación a Excel con fórmulas financieras preconfiguradas." },
];

const ASSET_CLASSES = [
  "Renta Variable Internacional (Equities – US & Europa)",
  "Renta Variable Nacional (IBEX 35, Mercado Continuo Español)",
  "Índices y ETFs Globales (MSCI World, S&P 500, Sectoriales)",
  "Criptoactivos Líquidos (BTC, ETH y principales tokens regulados)",
  "Renta Fija & Curvas Soberanas (Treasuries, Bund, Bonos corporativos)",
  "Materias Primas & Divisas (Oro, Petróleo Brent/WTI, EUR/USD)",
];

const GRANULARITIES = [
  "Intradiario Alta Resolución (1 min / 5 min) — requiere proveedor especializado",
  "Intradiario Estándar (15 min / 1 hora)",
  "Diario Fin de Día (EOD) — recomendado para análisis fundamental y swing",
  "Semanal / Mensual (estratégico a largo plazo)",
  "Trimestral / Anual (exclusivo para estados financieros)",
];

const HISTORY_WINDOWS = [
  "1 a 3 años (ciclo táctico corto)",
  "5 a 10 años (ciclo económico completo)",
  "20+ años (validación cuantitativa de largo plazo y pruebas de estrés)",
];

const METRICS = [
  { id: "per", label: "PER / Forward P/E", cat: "Fundamentales", desc: "Ratio Precio/Beneficio actual y estimado a 12 meses." },
  { id: "evebitda", label: "EV / EBITDA", cat: "Fundamentales", desc: "Enterprise Value / EBITDA — múltiplo operativo de referencia." },
  { id: "roic", label: "ROIC & ROE", cat: "Fundamentales", desc: "Rentabilidad sobre Capital Invertido y sobre Fondos Propios." },
  { id: "deuda", label: "Deuda Neta / EBITDA", cat: "Fundamentales", desc: "Indicador de apalancamiento y solvencia." },
  { id: "fcfyield", label: "FCF Yield", cat: "Fundamentales", desc: "Rentabilidad del Flujo de Caja Libre por acción." },
  { id: "cagr", label: "CAGR", cat: "Rendimiento", desc: "Tasa de Crecimiento Anual Compuesto: (Vf/Vi)^(1/n) âˆ’ 1." },
  { id: "retorno", label: "Retorno Total Acumulado", cat: "Rendimiento", desc: "Variación porcentual total del capital en el periodo." },
  { id: "sharpe", label: "Ratio de Sharpe", cat: "Riesgo & Eficiencia", desc: "(Rp âˆ’ Rf) / Ïƒp — exceso de retorno por unidad de riesgo total." },
  { id: "sortino", label: "Ratio de Sortino", cat: "Riesgo & Eficiencia", desc: "(Rp âˆ’ Rf) / Ïƒd — exceso de retorno por unidad de riesgo a la baja." },
  { id: "mdd", label: "Máximo Drawdown (MDD)", cat: "Riesgo & Eficiencia", desc: "Máxima caída porcentual de pico a valle en la curva de equidad." },
  { id: "var", label: "Value at Risk (VaR 95% / 99%)", cat: "Riesgo & Eficiencia", desc: "Pérdida máxima esperada a un horizonte temporal con un nivel de confianza dado." },
  { id: "calmar", label: "Ratio de Calmar", cat: "Riesgo & Eficiencia", desc: "CAGR / MDD — relación entre crecimiento y profundidad de caída." },
  { id: "polaridad", label: "Polaridad Textual (VADER / FinBERT)", cat: "Sentimiento / NLP", desc: "Puntuación normalizada en el rango [âˆ’1.0, +1.0]." },
  { id: "subj", label: "Ratio de Subjetividad / Confianza", cat: "Sentimiento / NLP", desc: "Porcentaje de carga emocional vs. factual en el cuerpo de noticias." },
];

const EXEC_MODELS = [
  "Apertura de la Barra Siguiente (Next Bar Open con penalización de latencia)",
  "Cierre de la Vela de Señal (Next Close)",
  "Precio Ponderado por Volumen (VWAP simulado)",
];

const SIZING_METHODS = [
  "Ponderación Equitativa (Equal Weight — 1/N)",
  "Inversa a la Volatilidad (Risk Parity simplificado)",
  "Criterio de Kelly Conservador (Half-Kelly)",
  "Porcentaje Fijo de Riesgo por Operación (ej. 1% del capital por stop-loss)",
];

const UI_FRAMEWORKS = [
  "Flet (Python Desktop/Mobile — motor Flutter, empaquetable en .exe)",
  "Streamlit (prototipado ultrarrápido con interfaz web reactiva local)",
  "FastAPI + React / Next.js (arquitectura cliente-servidor para despliegue profesional)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (OLAP ultrarrápido embebido en memoria)",
  "SQLite + SQLAlchemy (fichero local ACID ligero)",
  "PostgreSQL / TimescaleDB (base de datos escalable para series temporales)",
];

// —€—€—€ Helpers —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

function getAutoMetrics(primaryId, secondaryIds) {
  const auto = new Set();
  if (primaryId === "F1.1") ["per","evebitda","roic","deuda","fcfyield"].forEach(m => auto.add(m));
  if (primaryId === "F1.2") ["sharpe","sortino","mdd","var","calmar","cagr"].forEach(m => auto.add(m));
  if (primaryId === "F1.3") ["polaridad","subj","sharpe","mdd"].forEach(m => auto.add(m));
  if (primaryId === "F1.4") ["mdd","sharpe","sortino","cagr"].forEach(m => auto.add(m));
  if (primaryId === "F1.5") ["var","sharpe","sortino","mdd","calmar"].forEach(m => auto.add(m));
  if (primaryId === "F1.6") ["fcfyield","cagr","retorno","deuda"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-05")) ["sharpe","sortino","mdd"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-07")) ["polaridad","subj"].forEach(m => auto.add(m));
  return [...auto];
}

function getAutoStorage(secondaryIds) {
  if (secondaryIds.includes("SEC-04")) return STORAGE_ENGINES[0];
  return "";
}

function needsBacktest(primaryId, secondaryIds) {
  return primaryId === "F1.2" || secondaryIds.includes("SEC-05");
}

// —€—€—€ Generador del informe —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

function generateReport(data) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const primary = PRIMARY_TASKS.find(t => t.id === data.primaryTask);
  const secondaries = SECONDARY_TASKS.filter(s => data.secondaryTasks.includes(s.id));
  const metrics = METRICS.filter(m => data.selectedMetrics.includes(m.id));
  const appSlug = (data.appName || "fin_app").toLowerCase().replace(/\s+/g, "_");
  const hasBacktest = needsBacktest(data.primaryTask, data.secondaryTasks);
  const hasSEC07 = data.secondaryTasks.includes("SEC-07");
  const hasSEC04 = data.secondaryTasks.includes("SEC-04");
  const hasSEC03 = data.secondaryTasks.includes("SEC-03");
  const hasSEC08 = data.secondaryTasks.includes("SEC-08");

  const metricsByCategory = metrics.reduce((acc, m) => {
    if (!acc[m.cat]) acc[m.cat] = [];
    acc[m.cat].push(m);
    return acc;
  }, {});

  const treeLines = [
    appSlug + "/",
    "—œ—€—€ src/",
    "—‚   —œ—€—€ __init__.py",
    "—‚   —œ—€—€ config.py             # Parámetros globales, claves de API y rutas locales",
    "—‚   —œ—€—€ schemas.py            # Modelos Pydantic v2 para validación estricta de datos" + (hasSEC07 ? "\n—‚   —‚                         # â†’ incluye middleware Guardrails Antialucinación (BR-FIN-05)" : ""),
    "—‚   —œ—€—€ data_fetcher.py       # Clientes HTTP asíncronos y conectores de mercado",
    "—‚   —œ—€—€ analytics.py          # Fórmulas cuantitativas, ratios e indicadores",
    hasBacktest ? "—‚   —œ—€—€ backtest_engine.py    # Simulación de órdenes, curvas de equidad y métricas (BR-FIN-01)" : null,
    "—‚   —œ—€—€ storage.py            # " + (hasSEC04 ? "DuckDB + Parquet (BR-FIN-04) con dataset DEMO offline" : "Capa de persistencia de datos"),
    "—‚   —œ—€—€ reporting.py          # Generador de informes exportables (Markdown / PDF)",
    hasSEC03 ? "—‚   —œ—€—€ alerts.py             # Motor de notificaciones multicanal (SEC-03)" : null,
    hasSEC08 ? "—‚   —œ—€—€ api.py                # API REST interna FastAPI + exportador Excel/CSV (SEC-08)" : null,
    primary?.id === "F1.3" ? "—‚   —œ—€—€ sentiment_engine.py   # Procesamiento NLP y scoring textual (BR-FIN-02)" : null,
    "—‚   —”—€—€ ui/",
    "—‚       —œ—€—€ __init__.py",
    "—‚       —œ—€—€ components.py     # Tarjetas de métricas, tablas y widgets reutilizables",
    "—‚       —”—€—€ main_view.py      # Vistas y pantallas principales",
    "—œ—€—€ tests/",
    "—‚   —œ—€—€ test_schemas.py",
    "—‚   —œ—€—€ test_analytics.py",
    hasBacktest ? "—‚   —”—€—€ test_backtest.py" : null,
    "—œ—€—€ data/                     # Ficheros locales Parquet y caché" + (hasSEC04 ? " — DEMO precargado" : ""),
    "—œ—€—€ requirements.txt",
    "—”—€—€ main.py                   # Punto de entrada de la aplicación",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "F1.2" ? "- **BR-FIN-01:** Paso 5 de backtest activado; backtest_engine.py incluido; métricas Sharpe, Sortino y MDD forzadas." : null,
    data.primaryTask === "F1.3" ? "- **BR-FIN-02:** Módulo NLP activado; sentiment_engine.py incluido; métricas de polaridad y confianza disponibles." : null,
    data.primaryTask === "F1.1" ? "- **BR-FIN-03:** Granularidad temporal fijada en EOD/Trimestral; ratios PER, EV/EBITDA, ROE y FCF Yield preseleccionados." : null,
    hasSEC04 ? "- **BR-FIN-04:** Base de datos preconfigurada en DuckDB + Parquet con dataset sintético DEMO para modo offline." : null,
    hasSEC07 ? "- **BR-FIN-05:** Middleware de Guardrails Antialucinación integrado en schemas.py; cláusula de descargo reforzada en todos los informes." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const backtestSection = hasBacktest
    ? [
        "- **Modelo de ejecución de órdenes:** " + data.execModel,
        "- **Dimensionamiento de posición (Position Sizing):** " + data.sizingMethod,
        "- **Blindaje contra Look-Ahead Bias:** Datos accesibles únicamente en t â‰¤ T_señal. Ventanas deslizantes estrictas.",
        "- **Mitigación del Sesgo de Supervivencia:** Inclusión de activos deslistados o advertencia formal en informe.",
        "- **Validación Out-of-Sample / Walk-Forward:** División 70% In-Sample (Entrenamiento) / 30% Out-of-Sample (Validación).",
      ].join("\n")
    : "La aplicación opera en **modo consulta analítica (Read-Only)**. No requiere parametrización de motor de ejecución de órdenes ni control de sesgos de simulación.";

  const qaLines = [
    "1. **Pruebas Unitarias (pytest):** Cobertura mínima del 100% en esquemas Pydantic y funciones matemáticas en analytics.py.",
    "2. **Prueba de Integración End-to-End:** Flujo completo de ingesta â†’ cálculo â†’ almacenamiento â†’ renderizado de informe.",
    "3. **Modo Offline" + (hasSEC04 ? " (SEC-04 activo)" : "") + ":** Verificación de ejecución completa con dataset sintético sin conexión a internet.",
    hasBacktest ? "4. **Validación de Backtest:** Comparación In-Sample vs. Out-of-Sample. Ratio de Sharpe Out-of-Sample debe superar 0.5." : null,
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACI“N TÃ‰CNICA",
    "## Proyecto de Software Financiero: " + data.appName,
    "",
    "**Fecha de Generación:** " + now,
    "**Área Horizon:** Finanzas Cuantitativas & Análisis de Mercado",
    "**Arquitecto / Diseñador:** " + (data.authorName || "Horizon User"),
    "**Versión del Documento:** v1.0.0 (Especificación Formal)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y Propósito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **Descripción del núcleo funcional:** " + (primary?.desc || ""),
    "- **Público objetivo:** " + (primary?.audience || ""),
    "- **Universo de activos:** " + data.assetClasses.join(", "),
    "- **Resolución temporal:** " + data.granularity,
    "- **Profundidad histórica:** " + data.historyWindow,
    "",
    "**Exclusiones explícitas:** El sistema NO realiza ejecución directa de órdenes en brokers, NO custodia fondos y NO emite asesoramiento financiero personalizado bajo normativa MiFID II / CNMV / SEC.",
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
    "### 3. Fórmulas Matemáticas y Motor Cuantitativo",
    "",
    "El módulo analytics.py implementará de forma determinista las siguientes métricas seleccionadas:",
    "",
    metricsSection || "_No se han seleccionado métricas._",
    "",
    "---",
    "",
    "### 4. Parámetros de Simulación y Gestión de Riesgo",
    "",
    backtestSection,
    "",
    "---",
    "",
    "### 5. Stack Tecnológico y Estructura de Scripts Python",
    "",
    "- **Capa de Presentación (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos:** " + data.storageEngine,
    "- **Validación de Datos:** Pydantic v2 con esquemas estrictos y tipado fuerte.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y Validación (QA)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. Cláusula de Cumplimiento Legal y Descargo de Responsabilidad",
    "",
    "> **AVISO LEGAL OBLIGATORIO**",
    ">",
    "> Esta especificación técnica y cualquier software desarrollado a partir de ella tiene carácter **exclusivamente educativo, analítico y de investigación cuantitativa**.",
    ">",
    "> - **NO constituye asesoramiento financiero, de inversión, fiscal o legal** bajo ninguna normativa vigente (MiFID II, CNMV, SEC, FCA u otras).",
    "> - **NO garantiza rentabilidades futuras.** Los resultados históricos y de simulación no son predictivos de resultados futuros.",
    "> - **NO ejecuta órdenes en mercados reales ni custodia fondos** de terceros.",
    "> - El usuario asume la **responsabilidad total** sobre cualquier decisión de inversión adoptada.",
    hasSEC07 ? "> - El módulo de interpretación con IA aplica Guardrails que impiden la generación de recomendaciones de compra/venta o cifras no presentes en el dataset original." : null,
    ">",
    "> Diseñado en **Horizon — Centro Interactivo de IA Aplicada.** Para uso interno de investigación y formación.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de Especificación Técnica — Generado automáticamente por Horizon FinanceAppWizard v1.0_",
  ].filter(l => l !== null).join("\n");
}

// —€—€—€ Componentes auxiliares —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

function ProgressBar({ step, total }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-dark/50 uppercase tracking-widest">Paso {step} de {total}</span>
        <span className="text-xs text-dark/35">{Math.round((step / total) * 100)}% completado</span>
      </div>
      <div className="h-1.5 bg-dark/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
              i + 1 < step
                ? "bg-accent text-white"
                : i + 1 === step
                ? "bg-accent text-white ring-4 ring-accent/20"
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
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-sm transition-colors"
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
      className="w-full bg-dark/[0.02] border border-dark/12 text-dark text-sm rounded-sm px-3.5 py-2.5 focus:outline-hidden focus:border-accent/50 placeholder:text-dark/25 transition-colors"
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
              ? "border-accent/40 bg-accent/[0.04]"
              : "border-dark/10 hover:border-dark/20 hover:bg-dark/[0.01]"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            value === (opt.id || opt) ? "border-accent" : "border-dark/25"
          }`}>
            {value === (opt.id || opt) && <div className="w-2 h-2 rounded-full bg-accent" />}
          </div>
          <input type="radio" className="sr-only" checked={value === (opt.id || opt)} onChange={() => onChange(opt.id || opt)} />
          <div>
            {opt.label ? (
              <>
                <p className="text-sm font-semibold text-dark"><span className="text-accent text-xs mr-1.5">{opt.id}</span>{opt.label}</p>
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
              isChecked ? "border-accent/40 bg-accent/[0.04]" : isDisabled ? "border-dark/6 opacity-40 cursor-not-allowed" : "border-dark/10 hover:border-dark/20"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${isChecked ? "border-accent bg-accent" : "border-dark/25"}`}>
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={isChecked} disabled={isDisabled} onChange={() => !isDisabled && toggle(opt.id || opt)} />
            <div>
              {opt.label ? (
                <>
                  <p className="text-sm font-medium text-dark"><span className="text-xs text-accent mr-1">[{opt.id}]</span>{opt.label}</p>
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
            value === opt ? "border-accent/40 bg-accent/[0.04]" : "border-dark/10 hover:border-dark/20"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${value === opt ? "border-accent" : "border-dark/25"}`}>
            {value === opt && <div className="w-2 h-2 rounded-full bg-accent" />}
          </div>
          <input type="radio" className="sr-only" checked={value === opt} onChange={() => onChange(opt)} />
          <p className="text-sm text-dark">{opt}</p>
        </label>
      ))}
    </div>
  );
}

// —€—€—€ Componente principal —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

const TOTAL_STEPS = 6;

const initData = () => ({
  appName: "",
  authorName: "",
  primaryTask: "",
  secondaryTasks: [],
  assetClasses: [],
  granularity: "",
  historyWindow: "",
  selectedMetrics: [],
  execModel: "",
  sizingMethod: "",
  uiFramework: "",
  storageEngine: "",
});

export default function WizardFinanzas() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initData);
  const [report, setReport] = useState("");
  const [errors, setErrors] = useState({});

  const set = useCallback((field) => (val) => setData(d => ({ ...d, [field]: val })), []);

  function handlePrimaryChange(val) {
    const autoMetrics = getAutoMetrics(val, data.secondaryTasks);
    const autoStorage = getAutoStorage(data.secondaryTasks);
    setData(d => ({
      ...d,
      primaryTask: val,
      selectedMetrics: autoMetrics,
      storageEngine: autoStorage || d.storageEngine,
    }));
  }

  function handleSecondaryChange(val) {
    const autoMetrics = getAutoMetrics(data.primaryTask, val);
    const autoStorage = getAutoStorage(val);
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
      if (data.assetClasses.length === 0) e.assetClasses = "Selecciona al menos una clase de activo.";
      if (!data.granularity) e.granularity = "Selecciona la granularidad temporal.";
      if (!data.historyWindow) e.historyWindow = "Selecciona la ventana histórica.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una métrica.";
    }
    if (step === 5 && needsBacktest(data.primaryTask, data.secondaryTasks)) {
      if (!data.execModel) e.execModel = "Selecciona un modelo de ejecución.";
      if (!data.sizingMethod) e.sizingMethod = "Selecciona un método de dimensionamiento.";
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
    a.download = `informe_${(data.appName || "fin_app").toLowerCase().replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const isBacktest = needsBacktest(data.primaryTask, data.secondaryTasks);

  return (
    <div className="min-h-full bg-[#F7F6F2]">
      <div className="max-w-[820px] mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-8">
          <Link to="/areas/finanzas" className="inline-flex items-center gap-1.5 text-xs text-dark/40 hover:text-dark transition-colors mb-6">
            <ArrowLeft size={13} /> Laboratorio de Finanzas
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center shrink-0 text-accent font-display text-xl">→™</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                Diseñador de Proyectos — Finanzas
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicación financiera paso a paso y genera su especificación técnica completa.
              </p>
            </div>
          </div>
        </div>

        {/* —€—€ PASOS 1-6 —€—€ */}
        {step <= TOTAL_STEPS && (
          <>
            <ProgressBar step={step} total={TOTAL_STEPS} />

            {/* PASO 1 */}
            {step === 1 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 1 — Tarea Principal</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona el núcleo funcional que definirá la arquitectura de tu aplicación financiera.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="Será el título de tu especificación técnica.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Kairós Sentimiento, ARGOS Alpha, QuantRisk–¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias o equipo de trabajo.">Diseñador / Equipo</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Analista Cuantitativo–¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la función principal de la aplicación. Esto determinará la lógica de los pasos siguientes.">Tarea principal de la aplicación</FieldLabel>
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
                <p className="text-dark/45 text-sm mb-6">Añade hasta <strong>4 capacidades operativas</strong> adicionales para robustecer tu sistema.</p>

                <div className="bg-accent/[0.04] border border-accent/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 — Universo de Análisis</h2>
                <p className="text-dark/45 text-sm mb-6">Configura los activos y el horizonte temporal del sistema.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Puedes seleccionar varias clases de activos.">Clases de activos a analizar</FieldLabel>
                    <CheckGroup options={ASSET_CLASSES.map(a => ({ id: a, label: a, desc: "" }))} selected={data.assetClasses} onChange={set("assetClasses")} max={6} />
                    {errors.assetClasses && <p className="text-red-500 text-xs mt-1.5">{errors.assetClasses}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="La granularidad temporal predeterminada del sistema.">Granularidad temporal</FieldLabel>
                    <SelectGroup options={GRANULARITIES} value={data.granularity} onChange={set("granularity")} />
                    {errors.granularity && <p className="text-red-500 text-xs mt-1.5">{errors.granularity}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Profundidad máxima del histórico de datos.">Ventana histórica de datos</FieldLabel>
                    <SelectGroup options={HISTORY_WINDOWS} value={data.historyWindow} onChange={set("historyWindow")} />
                    {errors.historyWindow && <p className="text-red-500 text-xs mt-1.5">{errors.historyWindow}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 4 */}
            {step === 4 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 — Catálogo de Métricas</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las fórmulas que formarán parte del motor analítico. Las métricas más relevantes para tu tarea principal ya están preseleccionadas.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-emerald-700">
                    ““ {data.selectedMetrics.length} métrica{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automáticamente según tu tarea principal.
                  </div>
                )}

                {["Fundamentales","Rendimiento","Riesgo & Eficiencia","Sentimiento / NLP"].map(cat => (
                  <div key={cat} className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-dark/40 mb-2.5">{cat}</p>
                    <div className="space-y-1.5">
                      {METRICS.filter(m => m.cat === cat).map(m => {
                        const isChecked = data.selectedMetrics.includes(m.id);
                        return (
                          <label key={m.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? "border-accent/30 bg-accent/[0.03]" : "border-dark/8 hover:border-dark/15"}`}>
                            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${isChecked ? "border-accent bg-accent" : "border-dark/20"}`}>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 — Motor de Simulación</h2>

                {isBacktest ? (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-blue-700 flex items-start gap-2">
                      <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                      Este paso está activo porque tu aplicación incluye capacidades de backtesting o simulación (BR-FIN-01).
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Cómo se ejecutan las órdenes en la simulación.">Modelo de ejecución de órdenes</FieldLabel>
                        <SelectGroup options={EXEC_MODELS} value={data.execModel} onChange={set("execModel")} />
                        {errors.execModel && <p className="text-red-500 text-xs mt-1">{errors.execModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="Cómo se distribuye el capital entre posiciones.">Dimensionamiento de posición (Position Sizing)</FieldLabel>
                        <SelectGroup options={SIZING_METHODS} value={data.sizingMethod} onChange={set("sizingMethod")} />
                        {errors.sizingMethod && <p className="text-red-500 text-xs mt-1">{errors.sizingMethod}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Controles de sesgos metodológicos (activados por diseño)</p>
                        {[
                          "Blindaje contra Sesgo de Anticipación (Look-Ahead Bias): datos accesibles únicamente en t â‰¤ T_señal.",
                          "Mitigación del Sesgo de Supervivencia: inclusión de activos deslistados o advertencia en informe.",
                          "Validación Out-of-Sample / Walk-Forward: 70% In-Sample / 30% Out-of-Sample.",
                        ].map(c => (
                          <div key={c} className="flex items-start gap-2.5 mb-2 last:mb-0">
                            <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} className="text-emerald-600" />
                            </div>
                            <p className="text-[12.5px] text-dark/60 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo consulta analítica (Read-Only)</strong>. No requiere parametrización de motor de ejecución de órdenes ni control de sesgos de simulación.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si en el futuro decides añadir capacidades de backtesting, puedes volver al <strong>Paso 2</strong> y activar el módulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-05</code>, o cambiar la tarea principal a <strong>F1.2</strong>.
                    </div>
                  </div>
                )}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 6 */}
            {step === 6 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 6 — Stack Tecnológico</h2>
                <p className="text-dark/45 text-sm mb-6">Elige las herramientas de código que darán vida a tu aplicación.</p>

                {data.secondaryTasks.includes("SEC-04") && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-emerald-700">
                    ““ Motor de persistencia preconfigurado en <strong>DuckDB + Parquet</strong> por el módulo SEC-04 (BR-FIN-04).
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Interfaz con la que el usuario interactuará con la aplicación.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Dónde y cómo se almacenarán los datos históricos y los resultados.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar Informe Ejecutivo" />
              </StepCard>
            )}
          </>
        )}

        {/* —€—€ PANTALLA FINAL: INFORME —€—€ */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-emerald-600" />
                </div>
                <h2 className="font-display text-[24px] text-dark">Informe generado con éxito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                Tu especificación técnica para <strong className="text-dark">{data.appName}</strong> está lista.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={downloadMd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-sm transition-colors"
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
                <strong>Aviso legal:</strong> Este informe tiene carácter exclusivamente educativo y de investigación. No constituye asesoramiento financiero bajo ninguna normativa (MiFID II, CNMV, SEC). Los resultados de simulación no son predictivos de rendimientos futuros.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// —€—€—€ Renderizador de Markdown ligero —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

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
              <span className="text-accent mt-1.5 shrink-0">–¢</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (/^\d+\. /.test(line)) {
          const num = line.match(/^(\d+)\./)[1];
          return (
            <div key={i} className="flex items-start gap-2.5 pl-2">
              <span className="text-accent font-semibold text-xs mt-1 shrink-0 w-4">{num}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, "")) }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-4 border-amber-400 bg-amber-50 px-4 py-2 rounded-r-lg text-[13px] text-amber-900 my-2">
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

