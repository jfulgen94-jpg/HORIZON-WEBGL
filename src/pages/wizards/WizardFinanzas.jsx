import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Download } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";

// â”€â”€â”€ Constantes de datos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRIMARY_TASKS = [
  {
    id: "F1.1",
    label: "Motor de Descarga, NormalizaciÃ³n y AnÃ¡lisis Fundamental",
    desc: "Descarga masiva de estados contables (Balance, P&G, Flujos de Caja) y cÃ¡lculo de mÃºltiplos de valoraciÃ³n (PER, EV/EBITDA, P/B, FCF Yield).",
    audience: "Analistas de renta variable, departamentos de M&A, gestores patrimoniales.",
  },
  {
    id: "F1.2",
    label: "Simulador de Estrategias Cuantitativas (Backtesting)",
    desc: "Motor de prueba retrospectiva sobre series histÃ³ricas. Simula reglas de entrada/salida, costes de fricciÃ³n, slippage y Walk-Forward.",
    audience: "Quants, traders algorÃ­tmicos, inversores sistemÃ¡ticos.",
  },
  {
    id: "F1.3",
    label: "Monitor de Sentimiento de Mercado & NLP Financiero",
    desc: "ExtracciÃ³n de polaridad y seÃ±ales de divergencia precio-sentimiento sobre noticias, earnings calls e informes regulatorios (10-K/10-Q).",
    audience: "Analistas macroeconÃ³micos, gestores de fondos de eventos corporativos.",
  },
  {
    id: "F1.4",
    label: "Sistema de DetecciÃ³n de SeÃ±ales TÃ©cnicas y AcciÃ³n del Precio",
    desc: "CÃ¡lculo de indicadores tÃ©cnicos (RSI, MACD, Bollinger, ATR), detecciÃ³n de rupturas y generaciÃ³n de matrices de alertas sobre datos OHLCV.",
    audience: "Operadores de swing trading, analistas tÃ©cnicos sistemÃ¡ticos.",
  },
  {
    id: "F1.5",
    label: "Plataforma de GestiÃ³n de Riesgo de Cartera y Stress Testing",
    desc: "VaR (paramÃ©trico, histÃ³rico y Monte Carlo), Expected Shortfall, matrices de covarianza y simulaciones de crisis histÃ³ricas (2008, 2020).",
    audience: "CRO, comitÃ©s de auditorÃ­a, family offices, gestores de fondos.",
  },
  {
    id: "F1.6",
    label: "Cuadro de Mando MacroeconÃ³mico y Radar de Dividendos",
    desc: "Dashboard que conecta variables macro globales (tipos de interÃ©s, inflaciÃ³n, diferenciales de crÃ©dito) con sostenibilidad de dividendos corporativos.",
    audience: "Inversores DGI, comitÃ©s de asset allocation, analistas macro.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-01", label: "ConciliaciÃ³n y Limpieza AutomÃ¡tica de Series Temporales", desc: "Ajuste por dividendos, splits, alineaciÃ³n de calendarios y tratamiento de valores ausentes." },
  { id: "SEC-02", label: "Generador de Informes de AuditorÃ­a con Trazabilidad Completa", desc: "ExportaciÃ³n a PDF/Markdown con registro inmutable de fuentes, timestamps UTC y hashes de verificaciÃ³n." },
  { id: "SEC-03", label: "Sistema de Alertas Proactivas y Disparadores Multicanal", desc: "Notificaciones locales, webhooks (Slack/Discord/Telegram) o correo electrÃ³nico ante cruces o divergencias." },
  { id: "SEC-04", label: "Almacenamiento Columnar UltrarrÃ¡pido y Modo Offline (DuckDB/Parquet)", desc: "Persistencia analÃ­tica local con consultas SQL mediante DuckDB y dataset DEMO precargado." },
  { id: "SEC-05", label: "MÃ³dulo de AtribuciÃ³n de Rendimiento Factorial (Brinson / Fama-French)", desc: "DescomposiciÃ³n de retornos segÃºn Size, Value, Momentum, Quality y atribuciÃ³n sectorial." },
  { id: "SEC-06", label: "Visualizador Interactivo Avanzado con GrÃ¡ficos de Velas y Heatmaps", desc: "GrÃ¡ficos de velas japonesas, Volume Profile, correlaciones interactivas y visualizaciÃ³n de drawdowns." },
  { id: "SEC-07", label: "Asistente Explicativo con IA (LLM + Guardrails AntialucinaciÃ³n)", desc: "InterpretaciÃ³n de resultados con restricciones severas que impiden inventar cifras o emitir recomendaciones." },
  { id: "SEC-08", label: "Integrador de APIs Externas y Exportador a Hoja de CÃ¡lculo (Excel/CSV)", desc: "API REST interna (FastAPI) y exportaciÃ³n a Excel con fÃ³rmulas financieras preconfiguradas." },
];

const ASSET_CLASSES = [
  "Renta Variable Internacional (Equities â€“ US & Europa)",
  "Renta Variable Nacional (IBEX 35, Mercado Continuo EspaÃ±ol)",
  "Ãndices y ETFs Globales (MSCI World, S&P 500, Sectoriales)",
  "Criptoactivos LÃ­quidos (BTC, ETH y principales tokens regulados)",
  "Renta Fija & Curvas Soberanas (Treasuries, Bund, Bonos corporativos)",
  "Materias Primas & Divisas (Oro, PetrÃ³leo Brent/WTI, EUR/USD)",
];

const GRANULARITIES = [
  "Intradiario Alta ResoluciÃ³n (1 min / 5 min) â€” requiere proveedor especializado",
  "Intradiario EstÃ¡ndar (15 min / 1 hora)",
  "Diario Fin de DÃ­a (EOD) â€” recomendado para anÃ¡lisis fundamental y swing",
  "Semanal / Mensual (estratÃ©gico a largo plazo)",
  "Trimestral / Anual (exclusivo para estados financieros)",
];

const HISTORY_WINDOWS = [
  "1 a 3 aÃ±os (ciclo tÃ¡ctico corto)",
  "5 a 10 aÃ±os (ciclo econÃ³mico completo)",
  "20+ aÃ±os (validaciÃ³n cuantitativa de largo plazo y pruebas de estrÃ©s)",
];

const METRICS = [
  { id: "per", label: "PER / Forward P/E", cat: "Fundamentales", desc: "Ratio Precio/Beneficio actual y estimado a 12 meses." },
  { id: "evebitda", label: "EV / EBITDA", cat: "Fundamentales", desc: "Enterprise Value / EBITDA â€” mÃºltiplo operativo de referencia." },
  { id: "roic", label: "ROIC & ROE", cat: "Fundamentales", desc: "Rentabilidad sobre Capital Invertido y sobre Fondos Propios." },
  { id: "deuda", label: "Deuda Neta / EBITDA", cat: "Fundamentales", desc: "Indicador de apalancamiento y solvencia." },
  { id: "fcfyield", label: "FCF Yield", cat: "Fundamentales", desc: "Rentabilidad del Flujo de Caja Libre por acciÃ³n." },
  { id: "cagr", label: "CAGR", cat: "Rendimiento", desc: "Tasa de Crecimiento Anual Compuesto: (Vf/Vi)^(1/n) âˆ’ 1." },
  { id: "retorno", label: "Retorno Total Acumulado", cat: "Rendimiento", desc: "VariaciÃ³n porcentual total del capital en el periodo." },
  { id: "sharpe", label: "Ratio de Sharpe", cat: "Riesgo & Eficiencia", desc: "(Rp âˆ’ Rf) / Ïƒp â€” exceso de retorno por unidad de riesgo total." },
  { id: "sortino", label: "Ratio de Sortino", cat: "Riesgo & Eficiencia", desc: "(Rp âˆ’ Rf) / Ïƒd â€” exceso de retorno por unidad de riesgo a la baja." },
  { id: "mdd", label: "MÃ¡ximo Drawdown (MDD)", cat: "Riesgo & Eficiencia", desc: "MÃ¡xima caÃ­da porcentual de pico a valle en la curva de equidad." },
  { id: "var", label: "Value at Risk (VaR 95% / 99%)", cat: "Riesgo & Eficiencia", desc: "PÃ©rdida mÃ¡xima esperada a un horizonte temporal con un nivel de confianza dado." },
  { id: "calmar", label: "Ratio de Calmar", cat: "Riesgo & Eficiencia", desc: "CAGR / MDD â€” relaciÃ³n entre crecimiento y profundidad de caÃ­da." },
  { id: "polaridad", label: "Polaridad Textual (VADER / FinBERT)", cat: "Sentimiento / NLP", desc: "PuntuaciÃ³n normalizada en el rango [âˆ’1.0, +1.0]." },
  { id: "subj", label: "Ratio de Subjetividad / Confianza", cat: "Sentimiento / NLP", desc: "Porcentaje de carga emocional vs. factual en el cuerpo de noticias." },
];

const EXEC_MODELS = [
  "Apertura de la Barra Siguiente (Next Bar Open con penalizaciÃ³n de latencia)",
  "Cierre de la Vela de SeÃ±al (Next Close)",
  "Precio Ponderado por Volumen (VWAP simulado)",
];

const SIZING_METHODS = [
  "PonderaciÃ³n Equitativa (Equal Weight â€” 1/N)",
  "Inversa a la Volatilidad (Risk Parity simplificado)",
  "Criterio de Kelly Conservador (Half-Kelly)",
  "Porcentaje Fijo de Riesgo por OperaciÃ³n (ej. 1% del capital por stop-loss)",
];

const UI_FRAMEWORKS = [
  "Flet (Python Desktop/Mobile â€” motor Flutter, empaquetable en .exe)",
  "Streamlit (prototipado ultrarrÃ¡pido con interfaz web reactiva local)",
  "FastAPI + React / Next.js (arquitectura cliente-servidor para despliegue profesional)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (OLAP ultrarrÃ¡pido embebido en memoria)",
  "SQLite + SQLAlchemy (fichero local ACID ligero)",
  "PostgreSQL / TimescaleDB (base de datos escalable para series temporales)",
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Generador del informe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    "â”œâ”€â”€ src/",
    "â”‚   â”œâ”€â”€ __init__.py",
    "â”‚   â”œâ”€â”€ config.py             # ParÃ¡metros globales, claves de API y rutas locales",
    "â”‚   â”œâ”€â”€ schemas.py            # Modelos Pydantic v2 para validaciÃ³n estricta de datos" + (hasSEC07 ? "\nâ”‚   â”‚                         # â†’ incluye middleware Guardrails AntialucinaciÃ³n (BR-FIN-05)" : ""),
    "â”‚   â”œâ”€â”€ data_fetcher.py       # Clientes HTTP asÃ­ncronos y conectores de mercado",
    "â”‚   â”œâ”€â”€ analytics.py          # FÃ³rmulas cuantitativas, ratios e indicadores",
    hasBacktest ? "â”‚   â”œâ”€â”€ backtest_engine.py    # SimulaciÃ³n de Ã³rdenes, curvas de equidad y mÃ©tricas (BR-FIN-01)" : null,
    "â”‚   â”œâ”€â”€ storage.py            # " + (hasSEC04 ? "DuckDB + Parquet (BR-FIN-04) con dataset DEMO offline" : "Capa de persistencia de datos"),
    "â”‚   â”œâ”€â”€ reporting.py          # Generador de informes exportables (Markdown / PDF)",
    hasSEC03 ? "â”‚   â”œâ”€â”€ alerts.py             # Motor de notificaciones multicanal (SEC-03)" : null,
    hasSEC08 ? "â”‚   â”œâ”€â”€ api.py                # API REST interna FastAPI + exportador Excel/CSV (SEC-08)" : null,
    primary?.id === "F1.3" ? "â”‚   â”œâ”€â”€ sentiment_engine.py   # Procesamiento NLP y scoring textual (BR-FIN-02)" : null,
    "â”‚   â””â”€â”€ ui/",
    "â”‚       â”œâ”€â”€ __init__.py",
    "â”‚       â”œâ”€â”€ components.py     # Tarjetas de mÃ©tricas, tablas y widgets reutilizables",
    "â”‚       â””â”€â”€ main_view.py      # Vistas y pantallas principales",
    "â”œâ”€â”€ tests/",
    "â”‚   â”œâ”€â”€ test_schemas.py",
    "â”‚   â”œâ”€â”€ test_analytics.py",
    hasBacktest ? "â”‚   â””â”€â”€ test_backtest.py" : null,
    "â”œâ”€â”€ data/                     # Ficheros locales Parquet y cachÃ©" + (hasSEC04 ? " â€” DEMO precargado" : ""),
    "â”œâ”€â”€ requirements.txt",
    "â””â”€â”€ main.py                   # Punto de entrada de la aplicaciÃ³n",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "F1.2" ? "- **BR-FIN-01:** Paso 5 de backtest activado; backtest_engine.py incluido; mÃ©tricas Sharpe, Sortino y MDD forzadas." : null,
    data.primaryTask === "F1.3" ? "- **BR-FIN-02:** MÃ³dulo NLP activado; sentiment_engine.py incluido; mÃ©tricas de polaridad y confianza disponibles." : null,
    data.primaryTask === "F1.1" ? "- **BR-FIN-03:** Granularidad temporal fijada en EOD/Trimestral; ratios PER, EV/EBITDA, ROE y FCF Yield preseleccionados." : null,
    hasSEC04 ? "- **BR-FIN-04:** Base de datos preconfigurada en DuckDB + Parquet con dataset sintÃ©tico DEMO para modo offline." : null,
    hasSEC07 ? "- **BR-FIN-05:** Middleware de Guardrails AntialucinaciÃ³n integrado en schemas.py; clÃ¡usula de descargo reforzada en todos los informes." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const backtestSection = hasBacktest
    ? [
        "- **Modelo de ejecuciÃ³n de Ã³rdenes:** " + data.execModel,
        "- **Dimensionamiento de posiciÃ³n (Position Sizing):** " + data.sizingMethod,
        "- **Blindaje contra Look-Ahead Bias:** Datos accesibles Ãºnicamente en t â‰¤ T_seÃ±al. Ventanas deslizantes estrictas.",
        "- **MitigaciÃ³n del Sesgo de Supervivencia:** InclusiÃ³n de activos deslistados o advertencia formal en informe.",
        "- **ValidaciÃ³n Out-of-Sample / Walk-Forward:** DivisiÃ³n 70% In-Sample (Entrenamiento) / 30% Out-of-Sample (ValidaciÃ³n).",
      ].join("\n")
    : "La aplicaciÃ³n opera en **modo consulta analÃ­tica (Read-Only)**. No requiere parametrizaciÃ³n de motor de ejecuciÃ³n de Ã³rdenes ni control de sesgos de simulaciÃ³n.";

  const qaLines = [
    "1. **Pruebas Unitarias (pytest):** Cobertura mÃ­nima del 100% en esquemas Pydantic y funciones matemÃ¡ticas en analytics.py.",
    "2. **Prueba de IntegraciÃ³n End-to-End:** Flujo completo de ingesta â†’ cÃ¡lculo â†’ almacenamiento â†’ renderizado de informe.",
    "3. **Modo Offline" + (hasSEC04 ? " (SEC-04 activo)" : "") + ":** VerificaciÃ³n de ejecuciÃ³n completa con dataset sintÃ©tico sin conexiÃ³n a internet.",
    hasBacktest ? "4. **ValidaciÃ³n de Backtest:** ComparaciÃ³n In-Sample vs. Out-of-Sample. Ratio de Sharpe Out-of-Sample debe superar 0.5." : null,
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACIÃ“N TÃ‰CNICA",
    "## Proyecto de Software Financiero: " + data.appName,
    "",
    "**Fecha de GeneraciÃ³n:** " + now,
    "**Ãrea Horizon:** Finanzas Cuantitativas & AnÃ¡lisis de Mercado",
    "**Arquitecto / DiseÃ±ador:** " + (data.authorName || "Horizon User"),
    "**VersiÃ³n del Documento:** v1.0.0 (EspecificaciÃ³n Formal)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y PropÃ³sito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **DescripciÃ³n del nÃºcleo funcional:** " + (primary?.desc || ""),
    "- **PÃºblico objetivo:** " + (primary?.audience || ""),
    "- **Universo de activos:** " + data.assetClasses.join(", "),
    "- **ResoluciÃ³n temporal:** " + data.granularity,
    "- **Profundidad histÃ³rica:** " + data.historyWindow,
    "",
    "**Exclusiones explÃ­citas:** El sistema NO realiza ejecuciÃ³n directa de Ã³rdenes en brokers, NO custodia fondos y NO emite asesoramiento financiero personalizado bajo normativa MiFID II / CNMV / SEC.",
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
    "### 3. FÃ³rmulas MatemÃ¡ticas y Motor Cuantitativo",
    "",
    "El mÃ³dulo analytics.py implementarÃ¡ de forma determinista las siguientes mÃ©tricas seleccionadas:",
    "",
    metricsSection || "_No se han seleccionado mÃ©tricas._",
    "",
    "---",
    "",
    "### 4. ParÃ¡metros de SimulaciÃ³n y GestiÃ³n de Riesgo",
    "",
    backtestSection,
    "",
    "---",
    "",
    "### 5. Stack TecnolÃ³gico y Estructura de Scripts Python",
    "",
    "- **Capa de PresentaciÃ³n (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos:** " + data.storageEngine,
    "- **ValidaciÃ³n de Datos:** Pydantic v2 con esquemas estrictos y tipado fuerte.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y ValidaciÃ³n (QA)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. ClÃ¡usula de Cumplimiento Legal y Descargo de Responsabilidad",
    "",
    "> **AVISO LEGAL OBLIGATORIO**",
    ">",
    "> Esta especificaciÃ³n tÃ©cnica y cualquier software desarrollado a partir de ella tiene carÃ¡cter **exclusivamente educativo, analÃ­tico y de investigaciÃ³n cuantitativa**.",
    ">",
    "> - **NO constituye asesoramiento financiero, de inversiÃ³n, fiscal o legal** bajo ninguna normativa vigente (MiFID II, CNMV, SEC, FCA u otras).",
    "> - **NO garantiza rentabilidades futuras.** Los resultados histÃ³ricos y de simulaciÃ³n no son predictivos de resultados futuros.",
    "> - **NO ejecuta Ã³rdenes en mercados reales ni custodia fondos** de terceros.",
    "> - El usuario asume la **responsabilidad total** sobre cualquier decisiÃ³n de inversiÃ³n adoptada.",
    hasSEC07 ? "> - El mÃ³dulo de interpretaciÃ³n con IA aplica Guardrails que impiden la generaciÃ³n de recomendaciones de compra/venta o cifras no presentes en el dataset original." : null,
    ">",
    "> DiseÃ±ado en **Horizon â€” Centro Interactivo de IA Aplicada.** Para uso interno de investigaciÃ³n y formaciÃ³n.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de EspecificaciÃ³n TÃ©cnica â€” Generado automÃ¡ticamente por Horizon FinanceAppWizard v1.0_",
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

// â”€â”€â”€ Componente principal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
      if (!data.historyWindow) e.historyWindow = "Selecciona la ventana histÃ³rica.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una mÃ©trica.";
    }
    if (step === 5 && needsBacktest(data.primaryTask, data.secondaryTasks)) {
      if (!data.execModel) e.execModel = "Selecciona un modelo de ejecuciÃ³n.";
      if (!data.sizingMethod) e.sizingMethod = "Selecciona un mÃ©todo de dimensionamiento.";
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
            <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center shrink-0 text-accent font-display text-xl">âš™</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                DiseÃ±ador de Proyectos â€” Finanzas
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicaciÃ³n financiera paso a paso y genera su especificaciÃ³n tÃ©cnica completa.
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
                <p className="text-dark/45 text-sm mb-6">Selecciona el nÃºcleo funcional que definirÃ¡ la arquitectura de tu aplicaciÃ³n financiera.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="SerÃ¡ el tÃ­tulo de tu especificaciÃ³n tÃ©cnica.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: KairÃ³s Sentimiento, ARGOS Alpha, QuantRiskâ€¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias o equipo de trabajo.">DiseÃ±ador / Equipo</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Analista Cuantitativoâ€¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la funciÃ³n principal de la aplicaciÃ³n. Esto determinarÃ¡ la lÃ³gica de los pasos siguientes.">Tarea principal de la aplicaciÃ³n</FieldLabel>
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
                <p className="text-dark/45 text-sm mb-6">AÃ±ade hasta <strong>4 capacidades operativas</strong> adicionales para robustecer tu sistema.</p>

                <div className="bg-accent/[0.04] border border-accent/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 â€” Universo de AnÃ¡lisis</h2>
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
                    <FieldLabel hint="Profundidad mÃ¡xima del histÃ³rico de datos.">Ventana histÃ³rica de datos</FieldLabel>
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 â€” CatÃ¡logo de MÃ©tricas</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las fÃ³rmulas que formarÃ¡n parte del motor analÃ­tico. Las mÃ©tricas mÃ¡s relevantes para tu tarea principal ya estÃ¡n preseleccionadas.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-emerald-700">
                    âœ“ {data.selectedMetrics.length} mÃ©trica{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automÃ¡ticamente segÃºn tu tarea principal.
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
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 â€” Motor de SimulaciÃ³n</h2>

                {isBacktest ? (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-blue-700 flex items-start gap-2">
                      <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                      Este paso estÃ¡ activo porque tu aplicaciÃ³n incluye capacidades de backtesting o simulaciÃ³n (BR-FIN-01).
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="CÃ³mo se ejecutan las Ã³rdenes en la simulaciÃ³n.">Modelo de ejecuciÃ³n de Ã³rdenes</FieldLabel>
                        <SelectGroup options={EXEC_MODELS} value={data.execModel} onChange={set("execModel")} />
                        {errors.execModel && <p className="text-red-500 text-xs mt-1">{errors.execModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="CÃ³mo se distribuye el capital entre posiciones.">Dimensionamiento de posiciÃ³n (Position Sizing)</FieldLabel>
                        <SelectGroup options={SIZING_METHODS} value={data.sizingMethod} onChange={set("sizingMethod")} />
                        {errors.sizingMethod && <p className="text-red-500 text-xs mt-1">{errors.sizingMethod}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Controles de sesgos metodolÃ³gicos (activados por diseÃ±o)</p>
                        {[
                          "Blindaje contra Sesgo de AnticipaciÃ³n (Look-Ahead Bias): datos accesibles Ãºnicamente en t â‰¤ T_seÃ±al.",
                          "MitigaciÃ³n del Sesgo de Supervivencia: inclusiÃ³n de activos deslistados o advertencia en informe.",
                          "ValidaciÃ³n Out-of-Sample / Walk-Forward: 70% In-Sample / 30% Out-of-Sample.",
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
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo consulta analÃ­tica (Read-Only)</strong>. No requiere parametrizaciÃ³n de motor de ejecuciÃ³n de Ã³rdenes ni control de sesgos de simulaciÃ³n.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si en el futuro decides aÃ±adir capacidades de backtesting, puedes volver al <strong>Paso 2</strong> y activar el mÃ³dulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-05</code>, o cambiar la tarea principal a <strong>F1.2</strong>.
                    </div>
                  </div>
                )}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 6 */}
            {step === 6 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 6 â€” Stack TecnolÃ³gico</h2>
                <p className="text-dark/45 text-sm mb-6">Elige las herramientas de cÃ³digo que darÃ¡n vida a tu aplicaciÃ³n.</p>

                {data.secondaryTasks.includes("SEC-04") && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-emerald-700">
                    âœ“ Motor de persistencia preconfigurado en <strong>DuckDB + Parquet</strong> por el mÃ³dulo SEC-04 (BR-FIN-04).
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Interfaz con la que el usuario interactuarÃ¡ con la aplicaciÃ³n.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="DÃ³nde y cÃ³mo se almacenarÃ¡n los datos histÃ³ricos y los resultados.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar Informe Ejecutivo" />
              </StepCard>
            )}
          </>
        )}

        {/* â”€â”€ PANTALLA FINAL: INFORME â”€â”€ */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-emerald-600" />
                </div>
                <h2 className="font-display text-[24px] text-dark">Informe generado con Ã©xito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                Tu especificaciÃ³n tÃ©cnica para <strong className="text-dark">{data.appName}</strong> estÃ¡ lista.
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
                <strong>Aviso legal:</strong> Este informe tiene carÃ¡cter exclusivamente educativo y de investigaciÃ³n. No constituye asesoramiento financiero bajo ninguna normativa (MiFID II, CNMV, SEC). Los resultados de simulaciÃ³n no son predictivos de rendimientos futuros.
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
              <span className="text-accent mt-1.5 shrink-0">â€¢</span>
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

