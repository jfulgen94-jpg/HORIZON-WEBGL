import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Search } from "lucide-react";
import { Layers } from "lucide-react";
import { Database } from "lucide-react";
import { Cpu } from "lucide-react";
import { Monitor } from "lucide-react";
import { Link2 } from "lucide-react";
import { FlaskConical } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { BarChart3 } from "lucide-react";

import {
  C, PromptBlock, Step, PhaseHeader, BackLink,
  HumanValidationWarning, VersionExtensions,
} from "./shared.jsx";

// —€—€—€ Tools table —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "Investigación", herramienta: "SEC EDGAR · Yahoo Finance · Alpha Vantage [VERIFICAR EN DOCUMENTACI“N OFICIAL] · Papers de sentimiento financiero", motivo: "Validar legalidad, cobertura, cuotas y formatos de datos fundamentales y textuales antes de programar." },
  { capa: "1", subcapa: "1.1–1.6", herramienta: "Plantilla de especificación funcional y técnica", motivo: "Acotar el alcance estricto del proyecto, delimitando las fronteras entre investigación y trading." },
  { capa: "2", subcapa: "2.1", herramienta: "httpx (async) · requests", motivo: "Descarga de fundamentales, series temporales de precios y noticias autorizadas con trazabilidad de metadatos." },
  { capa: "2", subcapa: "2.2–2.3", herramienta: "Pydantic v2", motivo: "Modelos Company, PriceOHLCV, FinancialFundamental, Signal, SentimentResult, SimulatedTrade, Report con validadores estrictos." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB + PyArrow (Parquet) + SQLite", motivo: "DuckDB OLAP para consultas analíticas; Parquet para series históricas comprimidas; SQLite para configuraciones y estrategias locales." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON / CSV sintético etiquetado como DEMO", motivo: "Dataset completamente reproducible sin APIs ni datos sensibles para pruebas locales." },
  { capa: "3", subcapa: "3.1", herramienta: "Ollama / Llama.cpp (local) · OpenAI / Anthropic / Groq [VERIFICAR EN DOCUMENTACI“N OFICIAL]", motivo: "Clasificación de sentimiento financiero y extracción de entidades; modo local con fallback a API configurado por el usuario." },
  { capa: "3", subcapa: "3.2", herramienta: "Pandas · NumPy", motivo: "Cálculo determinista de indicadores (SMA, EMA, RSI, MACD, Volatilidad) y normalización de fundamentales." },
  { capa: "3", subcapa: "3.3–3.4", herramienta: "httpx con tenacity · variables de entorno", motivo: "Llamadas desacopladas a APIs financieras y LLMs con retry exponential backoff y zero hardcoding de credenciales." },
  { capa: "3", subcapa: "3.5–3.6", herramienta: "Pydantic validators · caché local Parquet", motivo: "Guardrails antialucinación: la IA no puede inventar cifras ni fuentes; modo offline inmediato sin pérdida de funcionalidad." },
  { capa: "4", subcapa: "4.1–4.5", herramienta: "Flet (Python con Flutter UI) · Matplotlib / Plotly", motivo: "Interfaz de escritorio completa con selectores, gráficos de precios, tablas de fundamentales y backstage de estrategias." },
  { capa: "5", subcapa: "5.1–5.7", herramienta: "python-dotenv · logging estándar", motivo: "Integración modular con trazabilidad en archivo, rotación de logs y centralización segura de credenciales." },
  { capa: "6", subcapa: "6.1–6.5", herramienta: "Pytest + pytest-asyncio", motivo: "Suite automatizada de pruebas unitarias, de integración y de validación de simulación de estrategias." },
  { capa: "6", subcapa: "6.6–6.7", herramienta: "PyInstaller", motivo: "Ejecutable único distribuible que corra sin Python instalado; dataset DEMO incluido, .env excluido del binario." },
  { capa: "Fase 7", subcapa: "Iteración", herramienta: "Foro Horizon · Markdown exporter", motivo: "Publicar informes de investigación en la comunidad y definir el roadmap de extensiones futuras." },
];

// —€—€—€ Phases overview —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
const PHASES = [
  { id: "0", label: "Fase 0",  name: "Investigación",         summary: "Fuentes autorizadas de fundamentales y precios, licencias, cuotas y viabilidad del backstage de estrategias e indicadores reproducibles." },
  { id: "1", label: "Capa 1", name: "Definición",             summary: "Perfil del analista/investigador, problema de fragmentación y opacidad, inputs/outputs con clasificación epistemológica y límites: sin trading automático ni asesoría." },
  { id: "2", label: "Capa 2", name: "Datos",                  summary: "11 modelos Pydantic v2 (Company, PriceOHLCV, FinancialFundamental, SentimentResult, Strategy, Signal, SimulatedTrade, Report–¦), DuckDB + Parquet + SQLite y dataset DEMO sintético." },
  { id: "3", label: "Capa 3", name: "Lógica / IA",            summary: "Motor de sentimiento (local vs. API), cálculo determinista de indicadores con Pandas, guardrails antialucinación y fallback a caché local con marca temporal." },
  { id: "4", label: "Capa 4", name: "Interfaz (Flet)",        summary: "5 pestañas: Resumen & Fundamentales, Gráficos de Precios & Indicadores, Sentimiento Textual, Backstage de Estrategias y Generador de Informes auditables." },
  { id: "5", label: "Capa 5", name: "Integración",            summary: "7 módulos de integración: controller, data_pipeline, api_bridge, text_processor, simulator, report_generator, config+logger." },
  { id: "6", label: "Capa 6", name: "Pruebas y empaquetado",  summary: "7 suites de tests (esquemas, pipeline, sentimiento, simulación, E2E), empaquetado PyInstaller y checklist en máquina limpia." },
  { id: "7", label: "Fase 7", name: "Iteración",              summary: "Backlog v2 (conectores profesionales, backtesting multiactivo, alertas avanzadas) y publicación en el Foro de Proyectos." },
];

// —€—€—€ Version extensions —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
const VERSIONS = [
  {
    tag: "v2 · Multiactivo",
    area: "Carteras & Rebalanceo",
    title: "Kairós Portfolio — Simulador de carteras multiactivo",
    desc: "Extiende Kairós Sentimiento para gestionar simultáneamente múltiples activos en una cartera, con simulación de rebalanceo periódico, correlaciones entre activos y curva de capital consolidada de la cartera completa.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: nuevo perfil de usuario gestor de cartera con múltiples tickers simultáneos",
      "Capa 2: modelo Portfolio con lista de activos, pesos objetivo y frecuencia de rebalanceo",
      "Capa 3: calculate_portfolio_metrics(): correlaciones, Sharpe ratio hipotético y drawdown de cartera",
      "Capa 4: pantalla de Cartera con tabla de pesos actuales vs. objetivo y botón 'Simular Rebalanceo'",
      "Capa 5: portfolio_pipeline() procesa todos los activos en paralelo con asyncio.gather",
      "Aviso legal ampliado: el rebalanceo simulado no tiene en cuenta costes de transacción reales",
    ],
  },
  {
    tag: "v3 · Mapas de calor",
    area: "Visualización avanzada",
    title: "Kairós Heat — Correlaciones sentimiento — rendimiento",
    desc: "Añade mapas de calor interactivos que muestran la correlación estadística entre el sentimiento textual acumulado y el rendimiento posterior del activo en ventanas de 5, 10 y 20 días, para estudiar la capacidad predictiva del sentimiento.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 3: calculate_sentiment_return_correlation(): Pearson y Spearman para cada ventana temporal",
      "Capa 4: nueva pestaña 'Correlaciones' con mapa de calor Plotly y selector de ventana",
      "Capa 4: tooltip en cada celda con n_observations y p-value (advertencia si n < 30)",
      "Advertencia metodológica obligatoria: correlación no implica causalidad ni predicción de rendimiento futuro",
      "Capa 6: test_correlation_calculation() con datos sintéticos con correlación conocida",
      "Capa 6: test_low_sample_warning() verifica que el aviso aparece cuando n < 30",
    ],
  },
  {
    tag: "v4 · Alertas de divergencia",
    area: "Señales de investigación",
    title: "Kairós Alert — Divergencias entre fundamentales y cotización",
    desc: "Sistema de alertas que detecta automáticamente situaciones en que el sentimiento textual y/o los fundamentales reportados divergen significativamente de la cotización del mercado, generando una notificación de investigación (no una recomendación de inversión).",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 3: detect_divergence(): compara z-score de sentimiento con z-score de precio en ventana de 20 días",
      "Capa 3: el umbral de divergencia es configurable en config.py; por defecto â‰¥ 2 desviaciones estándar",
      "Capa 4: badge de 'Divergencia Detectada' en el panel de Sentimiento con descripción del patrón",
      "Capa 4: historial de divergencias anteriores en la pantalla del activo",
      "Descargo obligatorio: 'Esta alerta es una señal de investigación, no una señal de compra/venta'",
      "Capa 6: test_divergence_detection() con serie sintética donde la divergencia es conocida",
    ],
  },
];

// —€—€—€ Financial disclaimer banner —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
function FinancialDisclaimerBanner() {
  return (
    <div className="mb-8 rounded-xl border overflow-hidden"
      style={{ borderColor: "rgba(217,119,6,0.25)" }}>
      <div className="flex items-center gap-2 px-5 py-3"
        style={{ background: "rgba(217,119,6,0.08)" }}>
        <AlertTriangle size={15} style={{ color: C.amber }} className="shrink-0" />
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.amber }}>
          Aviso legal financiero — Lectura obligatoria
        </span>
      </div>
      <div className="px-5 py-4" style={{ background: "rgba(217,119,6,0.03)" }}>
        <ul className="space-y-2 text-[13px] leading-relaxed" style={{ color: "rgba(17,17,17,0.70)" }}>
          <li className="flex items-start gap-2">
            <span style={{ color: C.amber }} className="shrink-0 font-bold">â†’</span>
            <span><strong>Kairós Sentimiento no es asesoramiento financiero</strong> ni una recomendación de inversión. Todos los resultados son de uso investigador y educativo.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: C.amber }} className="shrink-0 font-bold">â†’</span>
            <span>Las señales, estrategias y simulaciones son <strong>hipotéticas</strong>. Los resultados pasados simulados no garantizan rendimientos futuros ni implican rentabilidad real.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: C.amber }} className="shrink-0 font-bold">â†’</span>
            <span>La app separa estrictamente <strong>dato observado</strong> (precio real, cifra contable declarada) de <strong>cálculo propio</strong> (indicadores) e <strong>inferencia de IA</strong> (sentimiento). Esta separación es obligatoria en todos los outputs.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: C.amber }} className="shrink-0 font-bold">â†’</span>
            <span>Quedan <strong>fuera de alcance en v1</strong>: ejecución automática de órdenes, custodia de fondos, asesoramiento personalizado y promesas de rentabilidad futura.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// —€—€—€ Main component —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
export default function RutaFinanzas() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <BackLink />

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5"
            style={{ background: "rgba(5,150,105,0.08)", color: C.emerald }}>
            Finanzas Cuantitativas & Análisis de Mercado · Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Kairós Sentimiento
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            Aplicación de investigación financiera que descarga, estructura y analiza fundamentales, precios y sentimiento de mercado, mientras permite construir y evaluar estrategias de inversión en un backstage dedicado, de forma trazable y sin ejecutar órdenes ni sustituir el criterio de un profesional financiero.
          </p>
          <div className="flex flex-wrap gap-6">
            {[["7", "Fases"], ["7", "Capas"], ["30+", "Prompts"], ["App .exe", "Resultado"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl" style={{ color: C.dark }}>{v}</div>
                <div className="text-[11px] uppercase tracking-wide" style={{ color: "rgba(17,17,17,0.35)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial disclaimer */}
        <FinancialDisclaimerBanner />

        {/* Human validation warning */}
        <HumanValidationWarning />

        {/* Map overview */}
        <div className="rounded-2xl p-6 mb-8 border" style={{ background: "white", borderColor: "rgba(17,17,17,0.08)" }}>
          <h2 className="font-display text-lg mb-4" style={{ color: C.dark }}>Mapa de la ruta</h2>
          <div className="space-y-1">
            {PHASES.map((p) => (
              <div key={p.id} className="flex items-start gap-3 py-2">
                <div className="shrink-0 w-16 text-[10px] font-bold uppercase tracking-wider pt-0.5"
                  style={{ color: "rgba(17,17,17,0.30)" }}>{p.label}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px]" style={{ color: C.dark }}>{p.name}</div>
                  <div className="text-[12px]" style={{ color: "rgba(17,17,17,0.45)" }}>{p.summary}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools table (collapsible) */}
        <div className="mb-10 rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(17,17,17,0.10)" }}>
          <button
            onClick={() => setToolsOpen(v => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-black/[0.02]"
            style={{ background: "white" }}>
            <span className="font-semibold text-[14px]" style={{ color: C.dark }}>Herramientas necesarias por capa</span>
            <ChevronDown size={16} className="transition-transform"
              style={{ color: "rgba(17,17,17,0.35)", transform: toolsOpen ? "rotate(180deg)" : "none" }} />
          </button>
          {toolsOpen && (
            <div className="border-t overflow-x-auto" style={{ borderColor: "rgba(17,17,17,0.08)" }}>
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ background: "rgba(17,17,17,0.03)" }}>
                    {["Capa", "Subcapa", "Herramienta(s)", "Por qué se usa aquí"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-semibold"
                        style={{ color: "rgba(17,17,17,0.50)", borderBottom: "1px solid rgba(17,17,17,0.07)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOOLS_TABLE.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "white" : "rgba(17,17,17,0.015)" }}>
                      <td className="px-4 py-2.5 font-medium" style={{ color: C.emerald, whiteSpace: "nowrap" }}>{row.capa}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", whiteSpace: "nowrap" }}>{row.subcapa}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: C.dark }}>{row.herramienta}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", maxWidth: 320 }}>{row.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(17,17,17,0.06)", background: "rgba(5,150,105,0.03)" }}>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(17,17,17,0.50)" }}>
                  <strong>¿Por qué Flet y DuckDB?</strong> Flet crea interfaces reactivas nativas con gráficos interactivos usando 100% Python, sin JavaScript ni dependencias C++. DuckDB procesa millones de filas de datos de mercado en un archivo único local a velocidad vectorial, sin servidor externo.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 0 — INVESTIGACI“N PREVIA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Search}
          label="Fase 0"
          color={C.accent}
          title="Investigación"
          desc="Identificar fuentes autorizadas de fundamentales, precios y sentimiento, verificar licencias, cuotas y términos de servicio, y definir qué indicadores y estrategias son técnicamente reproducibles antes de escribir una sola línea de código."
        />

        <Step 
          num="0.A" 
          title="Identificar fuentes de datos financieros"
          goal="Mapa de proveedores de fundamentales (SEC EDGAR, etc.), series históricas OHLCV y fuentes textuales legales para sentimiento, con cobertura geográfica, tipo de acceso y precauciones de copyright y rate limits para cada uno."
        >
          <PromptBlock label="Prompt 0.A — Fuentes de datos financieros">
{`Actúa como ingeniero de datos financieros y especialista en arquitectura de software cuantitativo.
Estoy diseñando la aplicación de investigación financiera Kairós Sentimiento.

Necesito que investigues y estructures:
1. ¿Qué fuentes de datos públicas o APIs oficiales permiten obtener datos fundamentales de empresas
   (estados financieros, ratios de balance, cuentas de resultados)?
   Indica nombre del proveedor, cobertura geográfica y tipo de acceso (gratuito, registro, freemium).
   [VERIFICAR EN DOCUMENTACI“N OFICIAL de cada proveedor]
2. ¿Qué fuentes permiten descargar series históricas de precios diarios (OHLCV) de forma reproducible?
3. ¿Qué fuentes textuales legales y autorizadas existen para análisis de sentimiento financiero
   (comunicados oficiales, transcripciones públicas de earnings calls, feeds RSS autorizados)?
4. ¿Qué precauciones legales de copyright, rate limits y términos de servicio aplican a cada tipo de dato?

No inventes endpoints, límites de peticiones ni precios de suscripción. Marca cualquier dato no confirmado
como [VERIFICAR EN DOCUMENTACI“N OFICIAL].`}
          </PromptBlock>
        </Step>

        <Step 
          num="0.B" 
          title="Viabilidad del backstage de estrategias e indicadores"
          goal="Lista de 5 indicadores técnicos y 5 ratios fundamentales con fórmula determinista; cómo formular señales simuladas manteniendo la separación estricta entre dato observado / cálculo propio / señal hipotética / inferencia IA; advertencia legal y metodológica sobre los límites del backtesting."
        >
          <PromptBlock label="Prompt 0.B — Viabilidad del backstage">
{`Basándote en el objetivo de Kairós Sentimiento (construir un backstage de estrategias de investigación
sin ejecución automática ni promesas de rentabilidad), necesito definir:
1. Una lista de 5 indicadores técnicos estándar y 5 ratios fundamentales clave cuya formulación
   matemática sea determinista, reproducible y libre de ambigüedades.
2. Cómo formular señales de compra/venta simuladas respetando la separación estricta entre:
   - Dato observado (precio real de cierre, beneficio reportado).
   - Cálculo matemático propio (media móvil, RSI).
   - Señal generada por hipótesis (cruce de medias).
   - Sentimiento extraído por IA (clasificación positiva/negativa con nivel de confianza).
3. Una advertencia legal y metodológica estándar sobre las limitaciones del backtesting y la ausencia de
   asesoramiento financiero personalizado.

Estructura la respuesta de forma técnica, limpia y pedagógica.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 1 — DEFINICI“N DEL PROBLEMA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Layers}
          label="Capa 1"
          color={C.emerald}
          title="Definición del problema"
          desc="Perfil del analista/investigador, problema de fragmentación y opacidad de datos financieros, inputs/outputs con clasificación epistemológica obligatoria, criterios de éxito medibles y límites no negociables de v1."
        />

        <Step 
          num="1.1" 
          title="¿Quién usa Kairós Sentimiento?"
          goal="Ficha de usuario con perfil profesional, flujo de trabajo actual disperso en múltiples webs y hojas de cálculo, frustraciones (pérdida de trazabilidad, cálculos no reproducibles, mezcla de datos y opiniones) y nivel técnico en finanzas y herramientas analíticas."
        >
          <PromptBlock label="Prompt 1.1 — Perfil del analista/investigador">
{`Necesito definir el perfil de usuario detallado de Kairós Sentimiento antes de escribir código.

La aplicación es un entorno de escritorio para investigación financiera, descarga de datos, análisis de
fundamentales, seguimiento de sentimiento y definición de estrategias simuladas.
[DESCRIBE A TU USUARIO: ej. "analista independiente que necesita contrastar los fundamentales de una
empresa con el sentimiento de sus noticias y probar hipótesis de entrada/salida de forma estructurada"]

Genera una ficha completa de usuario con:
- Perfil profesional y rol.
- Flujo de trabajo actual sin la app (dispersión en múltiples webs, hojas de cálculo desordenadas).
- Frustraciones principales (pérdida de trazabilidad, cálculos no reproducibles, mezcla de datos y opiniones).
- Beneficios concretos al usar Kairós Sentimiento.
- Nivel técnico (competencia en finanzas, uso de herramientas analíticas, comprensión de riesgos).
- Frecuencia y contexto de uso (análisis semanal, estudio previo a decisiones de inversión).

Sin lenguaje publicitario ni promesas de enriquecimiento. Tono profesional y analítico.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.2" 
          title="¿Qué problema concreto resuelve?"
          goal="Una sola frase en formato [PERFIL] no puede [TAREA FINANCIERA] porque [OBSTÁCULO], lo que provoca [CONSECUENCIA]. 3 opciones, elegir la más precisa justificando en términos de trazabilidad y rigor analítico."
        >
          <PromptBlock label="Prompt 1.2 — Frase del problema">
{`Basándome en el perfil de usuario de Kairós Sentimiento ([PEGA EL PERFIL DE USUARIO DEFINIDO EN 1.1]),
necesito formular UNA SOLA FRASE rigurosa que defina el problema específico que resuelve la aplicación.

La frase debe seguir este formato exacto:
"[PERFIL DE USUARIO] no puede [TAREA FINANCIERA CONCRETA] porque [OBSTÁCULO TÃ‰CNICO/METODOL“GICO REAL],
 lo que provoca [CONSECUENCIA NEGATIVA MEDIBLE EN SU ANÁLISIS]."

Genera 3 opciones adaptadas a Kairós Sentimiento y selecciona la más precisa, justificando la elección
en 2 líneas en términos de trazabilidad y rigor analítico.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.3" 
          title="¿Qué datos entran?"
          goal="Tabla exhaustiva: ticker/mercado, rango de fechas, estados financieros, textos de noticias, parámetros de estrategias, archivos CSV/Parquet importados. Para cada campo: tipo, obligatorio/opcional, rango válido, origen y valor por defecto."
        >
          <PromptBlock label="Prompt 1.3 — Inventario de inputs">
{`Para Kairós Sentimiento, necesito un inventario formal de todos los datos de entrada que la app puede
recibir (introducidos por el usuario o descargados automáticamente).

El usuario podrá:
- Indicar ticker o símbolo de cotización (ej. AAPL, SAN.MC) y mercado de origen.
- Seleccionar rango de fechas históricas y periodicidad (diaria, semanal, mensual).
- Solicitar descarga de estados financieros (Balance, Cuenta de Resultados, Flujo de Caja).
- Suministrar textos o seleccionar feeds de noticias para análisis de sentimiento.
- Configurar parámetros de estrategias (umbrales de indicadores, reglas de señal).
- Importar archivos CSV o Parquet externos con históricos propios.

Genera una tabla exhaustiva con:
- Nombre del parámetro / dato.
- Tipo de dato (string, float, date, enum, DataFrame).
- Obligatorio u Opcional.
- Rango o valores válidos permitidos.
- Origen (Usuario / API Financiera / Archivo local).
- Valor por defecto si aplica.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.4" 
          title="¿Qué datos salen?"
          goal="Todos los outputs con clasificación epistemológica obligatoria: [DATO OBSERVADO] (precios, cifras contables), [DATO CALCULADO] (indicadores), [INFERENCIA IA] (sentimiento), [ESCENARIO HIPOTÃ‰TICO] (señales simuladas). Ninguna salida puede confundirse con recomendación de inversión."
        >
          <PromptBlock label="Prompt 1.4 — Outputs con clasificación epistemológica">
{`Continuando con la especificación de Kairós Sentimiento, define todos los outputs (salidas) que la app
debe generar a partir de los datos procesados:

Detalla cada salida especificando:
1. Nombre del output (ej. Tabla de Ratios Fundamentales, Gráfico OHLCV con Indicadores, Serie de Sentimiento Ponderado, Registro de Señales de Estrategia, Informe de Investigación).
2. Formato de presentación (DataTable en pantalla, gráfico interactivo Flet/Plotly, archivo Parquet, informe exportable en Markdown/HTML/PDF).
3. Campos e información exacta que contiene.
4. Momento en que se genera y calcula.
5. Clasificación epistemológica del dato:
   - [DATO OBSERVADO] (precios de mercado, cifras contables declaradas).
   - [DATO CALCULADO] (medias móviles, ratios PER, ROE).
   - [INFERENCIA IA] (sentimiento textual, resumen cualitativo).
   - [ESCENARIO HIPOTÃ‰TICO] (señales simuladas de compra/venta).

Asegura que ninguna salida pueda confundirse con una recomendación directa de inversión.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.5" 
          title="Criterios de éxito"
          goal="6–8 criterios verificables: descarga sin huecos no identificados, validación Pydantic de esquemas, cálculo determinista de indicadores, separación visual dato real / señal hipotética, persistencia DuckDB + Parquet, modo offline ante fallos de API."
        >
          <PromptBlock label="Prompt 1.5 — Criterios de éxito">
{`Define una lista de 6 a 8 criterios de éxito medibles y verificables para Kairós Sentimiento v1.

Cada criterio debe redactarse en el formato:
"La aplicación funciona correctamente cuando [CONDICI“N VERIFICABLE Y CUANTIFICABLE]."

Incluye criterios que cubran:
- Descarga y normalización correcta de series temporales sin huecos no identificados.
- Validación estricta de esquemas Pydantic para datos fundamentales y de precios.
- Cálculo determinista de indicadores contrastado con fórmulas matemáticas estándar.
- Separación visual y funcional clara entre datos reales y señales hipotéticas.
- Persistencia adecuada en DuckDB y exportación íntegra a Parquet.
- Funcionamiento continuo del modo offline ante fallos de conexión o cuotas de API.

Evita términos ambiguos como 'rápido' o 'fácil'. Todo criterio debe ser testeable automáticamente o mediante un paso a paso manual concreto.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.6" 
          title="Límites explícitos de la v1"
          goal="Declaración formal de exclusión de: ejecución automática de órdenes, custodia de fondos, asesoramiento personalizado, promesas de rentabilidad y APIs propietarias de coste prohibitivo. Bloque de aviso legal para la pantalla de inicio y la documentación."
        >
          <PromptBlock label="Prompt 1.6 — Límites y aviso legal">
{`Para Kairós Sentimiento v1, redacta una declaración formal de límites y alcance excluido.

Para cada una de las siguientes características, justifica por qué queda FUERA de la versión 1:
1. Ejecución automática de órdenes de compra/venta en brokers.
2. Custodia o gestión de cuentas de dinero real.
3. Asesoramiento financiero personalizado o emisión de juicios de idoneidad.
4. Promesas, proyecciones o garantías de rentabilidad futura.
5. Conexiones a APIs propietarias de coste prohibitivo (como terminales institucionales de pago).

Genera el bloque formal de aviso legal y límites que aparecerá en la documentación y en la pantalla de
inicio de la aplicación.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 2 — DATOS (KAIR“S SENTIMIENTO)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Database}
          label="Capa 2"
          color={C.amber}
          title="Estructura de datos y persistencia"
          desc="11 modelos Pydantic v2 con validadores estrictos, capa de adquisición con trazabilidad completa de metadatos, normalización con InsufficientDataError, triple almacenamiento DuckDB+Parquet+SQLite y dataset DEMO etiquetado is_demo=True."
        />

        <Step 
          num="2.1" 
          title="Fuentes de datos y conectores" 
          goal="data_fetcher.py con conectores independientes para precios, fundamentales y noticias: headers, rate limits, timeouts, clave desde variable de entorno. Traza de metadatos por descarga: URL/fuente, timestamp UTC, parámetros y hash del contenido."
        >
          <PromptBlock label="Prompt 2.1 — data_fetcher.py">
{`Diseña el módulo de adquisición de datos para Kairós Sentimiento (\`data_fetcher.py\`).

Opciones de fuentes:
- Precios históricos: APIs financieras verificadas o bibliotecas de mercado [VERIFICAR EN DOCUMENTACI“N OFICIAL].
- Fundamentales: endpoints oficiales (ej. SEC EDGAR para empresas de EE.UU. o proveedores con capa gratuita documentada).
- Noticias y textos: feeds RSS financieros autorizados y archivos de texto locales aportados por el usuario.
- Carga manual: importador de archivos CSV y Parquet con series personalizadas.

Escribe el código Python con \`httpx\` (asíncrono) y \`pathlib\` que:
1. Defina conectores independientes para cada fuente con manejo de headers, rate limits y timeouts.
2. Gestione tokens/claves mediante variables de entorno (nunca hardcodeadas).
3. Guarde la traza de metadatos de cada descarga: URL/fuente original, timestamp UTC de consulta, parámetros y hash del contenido.
4. Incluya tipado estricto y manejo de excepciones de red (\`httpx.RequestError\`, \`httpx.HTTPStatusError\`).`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquemas de datos con Pydantic v2" 
          goal="schemas.py con 11 modelos: Company, Asset, PriceOHLCV (validadores highâ‰¥low, fechas no futuras), FinancialFundamental, AccountingPeriod, NewsDocument, SentimentResult (-1.0 a 1.0), Strategy, Signal, SimulatedTrade y Report. Tickers en mayúsculas normalizados."
        >
          <PromptBlock label="Prompt 2.2 — schemas.py (11 modelos)">
{`Escribe el módulo \`schemas.py\` de Kairós Sentimiento utilizando Pydantic v2 (\`pydantic.BaseModel\`, \`Field\`, \`field_validator\`).

Define con tipado estricto y docstrings los siguientes modelos:
1. \`Company\`: ticker, name, sector, industry, country, currency.
2. \`Asset\`: asset_type (Stock, ETF, Index), ticker, exchange, is_active.
3. \`PriceOHLCV\`: timestamp (datetime), open (float > 0), high (float > 0), low (float > 0), close (float > 0), volume (float >= 0), adjusted_close (Optional[float]).
4. \`FinancialFundamental\`: ticker, period_end_date, report_type (Annual, Quarterly), revenue, net_income, total_assets, total_liabilities, operating_cash_flow, currency.
5. \`AccountingPeriod\`: fiscal_year (int), fiscal_period (Q1, Q2, Q3, Q4, FY), filing_date.
6. \`NewsDocument\`: doc_id, source, title, content, published_at, url, ticker_related.
7. \`SentimentResult\`: doc_id, sentiment_label (Positive, Neutral, Negative), sentiment_score (float entre -1.0 y 1.0), confidence (float entre 0.0 y 1.0), model_used, analyzed_at.
8. \`Strategy\`: strategy_id, name, description, indicator_rules (dict), created_at, version.
9. \`Signal\`: strategy_id, ticker, timestamp, signal_type (BUY, SELL, HOLD), trigger_reason, simulated_price.
10. \`SimulatedTrade\`: trade_id, strategy_id, ticker, entry_date, entry_price, exit_date, exit_price, pnl_percentage, status.
11. \`Report\`: report_id, ticker, generated_at, data_sources_summary, sections_content, disclaimers.

Incluye validadores que comprueben:
- \`high >= low\`, \`high >= open\`, \`high >= close\`, \`low <= open\`, \`low <= close\`.
- Fechas no futuras.
- Tickers normalizados en mayúsculas sin espacios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="Validación, limpieza y normalización" 
          goal="normalizer.py: normalize_price_history() (orden cronológico, nulos, continuidad temporal, festivos), normalize_fundamentals() (monedas, unidades, precisión numérica) y log_validation_issues(). InsufficientDataError si el lote no es suficiente para análisis."
        >
          <PromptBlock label="Prompt 2.3 — normalizer.py">
{`Escribe el módulo \`normalizer.py\` para Kairós Sentimiento.

Implementa funciones de limpieza y normalización:
1. \`normalize_price_history(raw_data: list[dict]) -> list[PriceOHLCV]\`:
   - Ordena cronológicamente.
   - Elimina filas con valores nulos en precios de cierre o fechas duplicadas.
   - Verifica continuidad temporal e identifica fines de semana y festivos de mercado.
2. \`normalize_fundamentals(raw_data: list[dict]) -> list[FinancialFundamental]\`:
   - Homogeneiza monedas y unidades (ej. millones vs unidades).
   - Maneja conversiones de tipos numéricos evitando pérdida de precisión.
3. \`log_validation_issues(rejected_records: list[dict], reason: str)\`: registra en archivo de log cada registro descartado con el motivo exacto.

Incluye manejo riguroso de excepciones; si un lote no contiene suficientes datos válidos para análisis, lanza una excepción de dominio descriptiva (\`InsufficientDataError\`).`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento local DuckDB + Parquet + SQLite" 
          goal="storage.py: init_storage(), save_price_series() idempotente en Parquet + vista DuckDB, save_fundamentals() sin duplicados de ejercicios fiscales, query_asset_overview() uniendo precios y fundamentales, save_strategy_definition() en SQLite. Transacciones atómicas."
        >
          <PromptBlock label="Prompt 2.4 — storage.py (triple almacenamiento)">
{`Escribe el módulo \`storage.py\` de Kairós Sentimiento implementando la estrategia de almacenamiento local:

Arquitectura de persistencia:
- **DuckDB**: motor analítico columnar para ejecutar consultas complejas, cruzar fundamentales con precios e integrar cálculos estadísticos.
- **Parquet**: formato de archivo comprimido en disco (\`data/parquet/\`) para series históricas de precios y documentos de noticias de solo lectura.
- **SQLite**: base de datos local (\`config.db\`) para almacenar parámetros de usuario, definiciones de estrategias y registros de auditoría de informes.

Implementa:
1. \`init_storage(base_path: Path)\`: crea directorios y esquemas iniciales de tablas e índices en DuckDB y SQLite.
2. \`save_price_series(ticker: str, prices: list[PriceOHLCV])\`: guarda o actualiza la serie en Parquet y sincroniza la vista analítica en DuckDB de forma idempotente.
3. \`save_fundamentals(fundamentals: list[FinancialFundamental])\`: inserta registros en DuckDB evitando duplicados de ejercicios fiscales.
4. \`query_asset_overview(ticker: str, start_date: date, end_date: date) -> pd.DataFrame\`: consulta DuckDB uniendo precios y fundamentales para el análisis en interfaz.
5. \`save_strategy_definition(strategy: Strategy)\`: persiste en SQLite la versión de la estrategia.

Añade manejo de conexiones seguras y transacciones atómicas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mínimo de ejemplo (DEMO)" 
          goal="generate_demo_dataset.py: 2 empresas ficticias (DEMO_TECH, DEMO_ENERGY), 250 días OHLCV, 8 trimestres de fundamentales, 10 noticias por empresa con sentimiento variado. Todos los registros marcados is_demo=True y '[DEMO DATA - NO REAL]'. Validados con Pydantic, guardados en data/demo/."
        >
          <PromptBlock label="Prompt 2.5 — Dataset DEMO sintético">
{`Escribe un script \`generate_demo_dataset.py\` que construya un dataset sintético completo para Kairós Sentimiento.

El dataset debe contener:
1. 2 empresas ficticias con tickers de demostración: \`DEMO_TECH\` (Sector Tecnológico) y \`DEMO_ENERGY\` (Sector Energético).
2. 250 días de precios diarios OHLCV simulados con parámetros realistas (tendencia, volatilidad y volumen coherente).
3. 8 trimestres de estados fundamentales sintéticos (ingresos, costes, beneficio neto, deuda y activos).
4. 10 noticias ficticias fechadas para cada empresa, con contenido variado (noticias positivas sobre innovación, neutrales sobre eventos del sector y negativas sobre costes regulatorios).
5. Todas las entidades deben estar claramente marcadas con el campo \`is_demo=True\` y la etiqueta \`[DEMO DATA - NO REAL]\`.

El script debe validar los datos generados contra los modelos Pydantic de \`schemas.py\` y guardarlos en \`data/demo/\` en formatos JSON y Parquet listos para pruebas.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 — L“GICA / IA (KAIR“S SENTIMIENTO)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Cpu}
          label="Capa 3"
          color={C.accent}
          title="Lógica, indicadores y modelos de sentimiento"
          desc="Motor de sentimiento (modo local Ollama/FinBERT con fallback a API), indicadores técnicos deterministas con Pandas, guardrails que impiden alucinaciones de cifras financieras y modo offline con caché Parquet con marca temporal explícita."
        />

        <Step 
          num="3.1" 
          title="Selección del motor de sentimiento" 
          goal="Comparativa: modelo local (FinBERT o Llama-3-8B con Ollama) vs. API externa (OpenAI/Anthropic/Groq). Evaluar: privacidad de datos, latencia y coste por 1.000 artículos, facilidad de empaquetado en .exe. Configuración por defecto: local con fallback a API opcional configurada por el usuario."
        >
          <PromptBlock label="Prompt 3.1 — Selección del motor de sentimiento">
{`Actúa como arquitecto de soluciones de IA aplicada a finanzas.
Para Kairós Sentimiento, necesito seleccionar el motor para dos tareas de procesamiento de lenguaje:
- Tarea A: Clasificación de sentimiento financiero en 3 clases (Positivo, Neutro, Negativo) con extracción de puntuación (-1.0 a +1.0) y nivel de confianza.
- Tarea B: Extracción estructurada de factores clave y resumen de hechos relevantes en noticias financieras.

Genera una comparativa técnica entre:
1. Modelo local de lenguaje pequeño / especializado (ej. FinBERT o Llama-3-8B local vía Ollama).
2. API externa de inferencia rápida y bajo coste (ej. OpenAI / Anthropic / Groq) [VERIFICAR EN DOCUMENTACI“N OFICIAL].

Evalúa según:
- Privacidad y soberanía de datos (análisis sin enviar información a terceros).
- Latencia y coste por cada 1.000 artículos analizados.
- Facilidad de empaquetado para el usuario final en una app de escritorio.

Proporciona la configuración recomendada por defecto (modo local con fallback a API opcional configurada por el usuario con su propia clave).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="Funciones analíticas e indicadores" 
          goal="analytics.py: calculate_technical_indicators() (SMA 20/50/200, EMA 12/26, RSI 14 con gestión de divisiones por cero, MACD, Volatilidad histórica anualizada), calculate_fundamental_ratios() (Margen Neto, ROE, ROA, Endeudamiento, PER, P/B) y aggregate_sentiment_score() ponderado por confianza y recencia."
        >
          <PromptBlock label="Prompt 3.2 — analytics.py (indicadores deterministas)">
{`Escribe el módulo \`analytics.py\` para Kairós Sentimiento con funciones matemáticas puras utilizando Pandas y NumPy.

Implementa:
1. \`calculate_technical_indicators(df_prices: pd.DataFrame) -> pd.DataFrame\`:
   - Medias Móviles Simples (SMA 20, 50, 200) y Exponenciales (EMA 12, 26).
   - RSI (Relative Strength Index) estándar de 14 periodos con gestión de divisiones por cero.
   - MACD (Línea MACD, Señal y Divergencia).
   - Volatilidad histórica anualizada (desviación estándar de rendimientos logarítmicos).
2. \`calculate_fundamental_ratios(df_fundamentals: pd.DataFrame, current_price: float) -> dict\`:
   - Margen Neto, Margen Operativo, ROE (Return on Equity), ROA (Return on Assets).
   - Ratio de Endeudamiento (Deuda Total / Activo Total).
   - Ratios de valoración aproximados con el precio suministrado (PER, P/B).
3. \`aggregate_sentiment_score(sentiments: list[SentimentResult], window_days: int = 30) -> dict\`:
   - Sentimiento medio ponderado por confianza y recencia temporal.
   - Distribución de noticias (conteo positivo, neutro, negativo).

Todas las funciones deben ser deterministas, incluir pruebas de división por cero y manejar vectores con valores NaN al inicio de las series.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Clientes de APIs y gestión de claves" 
          goal="api_client.py: clientes separados para APIs financieras y LLM, credenciales solo desde variables de entorno, retry con exponential backoff (tenacity o nativo async), rate limiting estricto, timeout 20s, log de cada llamada con claves enmascaradas."
        >
          <PromptBlock label="Prompt 3.3 — api_client.py">
{`Escribe el módulo \`api_client.py\` de Kairós Sentimiento.

Requisitos técnicos:
1. Separar completamente el cliente de APIs financieras del cliente de APIs de LLM.
2. Cargar credenciales exclusivamente desde variables de entorno (\`FINANCIAL_API_KEY\`, \`LLM_API_KEY\`) utilizando \`os.environ\` y \`python-dotenv\`.
3. Implementar reintentos con retroceso exponencial (Exponential Backoff) usando \`tenacity\` o un decorador nativo asíncrono para errores HTTP transitorios (429 Too Many Requests, 500, 503).
4. Configurar límites de tasa (Rate Limiting) estrictos para no saturar las cuotas del proveedor.
5. Implementar timeout estricto de 20 segundos por solicitud.
6. Registrar en log cada llamada realizada (ocultando siempre tokens y cabeceras de autorización).

Incluye marcado [VERIFICAR EN DOCUMENTACI“N OFICIAL] para los endpoints utilizados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Parseo y trazabilidad de inferencias" 
          goal="sentiment_parser.py: prompt de sistema con JSON estricto (sentiment, score, confidence, key_factors, quote_evidence); parse_sentiment_response() que valida rangos, genera SentimentResult con doc_id, timestamp y model_used; SentimentParsingError con texto recibido si falla."
        >
          <PromptBlock label="Prompt 3.4 — sentiment_parser.py">
{`Escribe el módulo \`sentiment_parser.py\` para Kairós Sentimiento.

Implementa:
1. Un prompt de sistema para el LLM que exija respuesta estricta en formato JSON sin texto introductorio ni markdown residual:
   \`{"sentiment": "Positive"|"Neutral"|"Negative", "score": float, "confidence": float, "key_factors": list[str], "quote_evidence": str}\`.
2. La función \`parse_sentiment_response(raw_response: str, doc: NewsDocument, model_name: str) -> SentimentResult\`:
   - Extrae el bloque JSON utilizando expresiones regulares de seguridad o deserialización directa.
   - Valida los rangos numéricos (\`score\` entre -1.0 y 1.0; \`confidence\` entre 0.0 y 1.0).
   - Genera el objeto \`SentimentResult\` asociando el \`doc_id\`, la fecha actual de análisis y el identificador del modelo.
   - Si la respuesta es inválida o no parseable, lanza \`SentimentParsingError\` con el texto recibido para auditoría.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Guardrails antialucinación" 
          goal="guardrails.py: verify_analysis_integrity() comprueba que cifras en key_factors/quote_evidence existan literalmente en el documento original, que la etiqueta sea coherente con el signo del score y que cambios porcentuales no contradigan precios reales. Devuelve (True,[]) o (False,[motivos]). Si False â†’ is_verified=False + aviso visible."
        >
          <PromptBlock label="Prompt 3.5 — guardrails.py (antialucinación)">
{`Escribe el módulo \`guardrails.py\` para Kairós Sentimiento.

Implementa la función de verificación:
\`verify_analysis_integrity(sentiment_result: SentimentResult, original_doc: NewsDocument, financial_data: dict) -> tuple[bool, list[str]]\`

Reglas de control:
1. Comprobar que cualquier cifra económica citada por el LLM en \`key_factors\` o \`quote_evidence\` exista literalmente dentro del texto del documento original \`original_doc.content\`.
2. Verificar que la etiqueta asignada coincida con el signo del score (ej. si score > 0.2 no puede etiquetarse como Negative).
3. Si el modelo afirma un cambio porcentual de precio, verificar que no se contradiga con la serie real de precios del activo.
4. Devolver \`(True, [])\` si la inferencia es consistente o \`(False, ["motivo1", "motivo2"])\` si detecta anomalías o alucinaciones.

Si devuelve False, el resultado se marcará en la base de datos con la bandera \`is_verified=False\` y se mostrará una advertencia visible en la interfaz.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="Fallback y modo offline" 
          goal="fallback_manager.py: get_analysis_with_fallback() intenta API â†’ si falla carga DuckDB/Parquet local con aviso 'Datos en caché local actualizados a fecha [TIMESTAMP]' â†’ sentimiento pendiente en modo offline marcado explícitamente. Devuelve AnalysisPayload con estado ONLINE_FRESH / LOCAL_CACHE / DEMO_DATA."
        >
          <PromptBlock label="Prompt 3.6 — fallback_manager.py">
{`Escribe el módulo \`fallback_manager.py\` para Kairós Sentimiento.

Implementa la función de resolución con respaldo:
\`get_analysis_with_fallback(ticker: str, start_date: date, end_date: date, allow_network: bool = True) -> AnalysisPayload\`

Flujo de ejecución:
1. Intentar actualizar datos desde APIs si \`allow_network=True\`.
2. Si falla la red, expira el timeout o se agota la cuota:
   - Cargar la última serie de precios y fundamentales almacenada localmente en DuckDB/Parquet.
   - Calcular la antigüedad del dato local e incluir un aviso explícito: *"Datos en caché local actualizados a fecha [TIMESTAMP]"*.
   - Para el sentimiento, si el LLM no está disponible, utilizar un analizador léxico básico basado en reglas de diccionario financiero o marcar las noticias como *"Pendientes de análisis de IA (Modo Offline)"*.
3. Devolver un objeto \`AnalysisPayload\` que incluya el estado de la fuente (\`ONLINE_FRESH\`, \`LOCAL_CACHE\`, \`DEMO_DATA\`).`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 4 — INTERFAZ DE ESCRITORIO (FLET)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Monitor}
          label="Capa 4"
          color="#7C3AED"
          title="Interfaz de escritorio (Flet)"
          desc="5 pestañas en la interfaz principal: Resumen & Fundamentales, Gráficos de Precios & Indicadores, Sentimiento Textual & Noticias, Backstage de Estrategias (con aviso legal fijo) y Generador de Informes auditables en Markdown/HTML."
        />

        <Step 
          num="4.1" 
          title="Panel principal y wireframe" 
          goal="ui_main.py: selector de activo/mercado/rango temporal, badge de estado del sistema (Conectado / Caché Local / DEMO), timestamp de última sincronización y 5 pestañas de navegación (ft.Tabs). Descripción de widgets con nombres de controles y disposición responsiva."
        >
          <PromptBlock label="Prompt 4.1 — ui_main.py (panel principal)">
{`Actúa como diseñador de interfaces de software financiero y desarrollador experto en Flet (Python).
Diseña la arquitectura visual y wireframe del panel principal de Kairós Sentimiento (\`ui_main.py\`).

Componentes requeridos en el panel superior y barra lateral:
1. Selector de activo / empresa (campo de texto para ticker o lista desplegable de seguimiento).
2. Selector de mercado (Mercado Continuo, NYSE, NASDAQ, etc.).
3. Selector de rango temporal de análisis (1M, 3M, 6M, 1A, 5A, Personalizado con DatePicker).
4. Indicador de estado del sistema (Badge con color: Verde = Conectado / Amarillo = Modo Caché Local / Azul = Dataset DEMO).
5. Marca de tiempo con la fecha y hora de la última sincronización de datos.
6. Navegación principal por pestañas:
   - [Pestaña 1: Resumen & Fundamentales]
   - [Pestaña 2: Gráficos de Precios & Indicadores]
   - [Pestaña 3: Sentimiento Textual & Noticias]
   - [Pestaña 4: Backstage de Estrategias]
   - [Pestaña 5: Generador de Informes]

Escribe la descripción estructurada de widgets Flet (\`ft.Tabs\`, \`ft.NavigationRail\`, \`ft.Container\`, \`ft.Dropdown\`) con nombres de controles y disposición responsiva.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Zona de descargas y gestión de datos" 
          goal="ui_downloads.py: botones de descarga asíncronos (Fundamentales, Precios, Importar CSV/Parquet con ft.FilePicker), barra de progreso, diálogo de confirmación y panel de errores claros por cuota o formato inválido. Sin congelar la UI en ningún momento."
        >
          <PromptBlock label="Prompt 4.2 — ui_downloads.py">
{`Escribe el componente Flet \`ui_downloads.py\` para Kairós Sentimiento.

Funcionalidades de la interfaz:
1. Botón "Descargar / Actualizar Fundamentales": dispara la sincronización asíncrona del balance y cuenta de resultados.
2. Botón "Descargar Precios Históricos": recupera la serie temporal de cotización.
3. Botón "Importar Archivo Local": selector de archivos (\`ft.FilePicker\`) para cargar CSV o Parquet externos.
4. Barra de progreso (\`ft.ProgressBar\`) y estado de la operación (mensajes informativos de descarga y validación).
5. Cuadro de diálogo de confirmación y panel de errores con mensajes claros si la API rechaza la petición por cuota o formato inválido.

El código debe ejecutar las operaciones en hilos secundarios asíncronos para nunca congelar la interfaz de usuario.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Zona de análisis visual y métricas" 
          goal="ui_analysis.py: DataTable de fundamentales con código de color por variación interanual, gráfico OHLCV + SMA 50/200 + RSI, panel de sentimiento con velocímetro (-1 a +1) + distribución de noticias + lista de artículos con etiqueta. Metadatos de trazabilidad al pie de cada panel."
        >
          <PromptBlock label="Prompt 4.3 — ui_analysis.py">
{`Escribe el componente Flet \`ui_analysis.py\` para Kairós Sentimiento.

Incluye los siguientes paneles:
1. **Tabla de Fundamentales**: \`ft.DataTable\` interactiva que presente ingresos, márgenes, deuda neta y ratios financieros clave por trimestre/año, con código de color sutil para variaciones interanuales.
2. **Gráfico de Precios e Indicadores**: contenedor para visualizar velas japonesas (OHLCV) junto con las medias móviles (SMA 50/200) y panel inferior con el oscilador RSI.
3. **Panel de Sentimiento**: tarjeta de resumen con velocímetro o barra de progreso de sentimiento (-1.0 a +1.0), distribución de noticias analizadas y lista de artículos recientes con su etiqueta de sentimiento y factor clave extraído.
4. **Metadatos de Trazabilidad**: pie de página en cada panel indicando fuente del dato, fecha de captura y versión del algoritmo aplicado.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Backstage de estrategias cuantitativas" 
          goal="ui_strategies.py: panel de definición (nombre, constructor de reglas técnicas y de sentimiento, periodo de simulación), botón 'Ejecutar Simulación en Backstage', tabla de SimulatedTrade con fecha/precio/resultado, curva de capital hipotética y banner legal fijo no descartable."
        >
          <PromptBlock label="Prompt 4.4 — ui_strategies.py (backstage)">
{`Escribe el componente Flet \`ui_strategies.py\` para el Backstage de Estrategias de Kairós Sentimiento.

Elementos de la pantalla:
1. **Panel de Definición**:
   - Campo para nombre y descripción de la estrategia.
   - Constructor de reglas: selector de condición (ej. "RSI(14) < 30", "SMA(20) cruza al alza SMA(50)", "Sentimiento 30d > 0.3").
   - Selector de periodo histórico para la simulación.
2. **Botón "Ejecutar Simulación en Backstage"**:
   - Procesa la serie histórica y genera las señales hipotéticas sin enviar ninguna orden a ningún broker.
3. **Panel de Resultados de la Simulación**:
   - Tabla de operaciones simuladas (\`SimulatedTrade\`): fecha de entrada, precio simulado, fecha de salida, resultado porcentual hipotético.
   - Métricas de la simulación: número total de operaciones, porcentaje de operaciones positivas, ratio ganancia/pérdida promedio.
   - Gráfico de curva de capital hipotética (Equity Curve simulada).
4. **Aviso Legal Destacado**: banner fijo que recuerde: *"Los resultados simulados son hipotéticos, se basan en datos pasados y no garantizan rendimientos futuros. No constituye asesoramiento de inversión."*`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="Generador de informes auditables" 
          goal="ui_reports.py + report_generator.py: informe Markdown/HTML con cabecera, resumen ejecutivo, análisis fundamental/técnico/de sentimiento, estrategia simulada, tabla de trazabilidad (API/archivo, timestamps, versiones de modelos) y descargo legal. Previsualización + botones de guardado .md/.html."
        >
          <PromptBlock label="Prompt 4.5 — ui_reports.py + report_generator.py">
{`Escribe el componente Flet \`ui_reports.py\` y el motor de generación de reportes \`report_generator.py\` para Kairós Sentimiento.

El generador debe producir un informe estructurado en formato Markdown (con opción de exportación a HTML):
1. **Cabecera**: Empresa/Activo, Ticker, Fecha de generación, Identificador único del reporte.
2. **Resumen Ejecutivo**: síntesis de fundamentales observados y tendencia de precios.
3. **Análisis Fundamental**: tabla de ratios y notas sobre la salud del balance.
4. **Análisis Técnico**: estado de los indicadores calculados al cierre del periodo.
5. **Análisis de Sentimiento**: resumen de la percepción textual con citas del corpus analizado.
6. **Registro de Estrategia Simulada**: parámetros de la hipótesis testeada y métricas obtenidas.
7. **Trazabilidad y Fuentes**: tabla con cada API/archivo utilizado, timestamps de descarga y versiones de modelos.
8. **Descargo de Responsabilidad (Disclaimer)**: cláusula formal de no asesoramiento financiero.

Incluye en la interfaz un botón para previsualizar el informe y botones de guardado en archivo (\`.md\` / \`.html\`).`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 5 — INTEGRACI“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Link2}
          label="Capa 5"
          color={C.emerald}
          title="Integración"
          desc="7 módulos de orquestación que conectan la interfaz Flet con la lógica analítica, la triple base de datos, las APIs financieras, el motor de sentimiento, el simulador de estrategias, el generador de informes y la configuración centralizada con logs rotativos."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con el motor analítico" 
          goal="controller.py AppController: on_asset_selected() carga DuckDB + calcula indicadores en background y actualiza la vista activa; on_run_sentiment_analysis() indexa noticias, aplica guardrails y refresca el panel de sentimiento. Estado centralizado propagado a todas las pestañas."
        >
          <PromptBlock label="Prompt 5.1 — controller.py">
{`Escribe el módulo de orquestación \`controller.py\` que conecte la interfaz Flet (\`ui_main.py\`, \`ui_analysis.py\`) con la lógica analítica de Kairós Sentimiento.

Implementa la clase \`AppController\`:
1. \`on_asset_selected(ticker: str, timeframe: str)\`:
   - Dispara la carga o consulta en DuckDB.
   - Ejecuta el cálculo de indicadores técnicos y ratios en segundo plano.
   - Actualiza los componentes visuales de la vista activa.
2. \`on_run_sentiment_analysis(ticker: str)\`:
   - Consulta los documentos de noticias asociados al activo.
   - Ejecuta la inferencia mediante el cliente de IA configurado.
   - Aplica los guardrails de calidad y refresca el panel de sentimiento.
3. Manejo de estado centralizado para que el cambio de activo se propague coherentemente a todas las pestañas de la aplicación.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lógica con la triple base de datos" 
          goal="data_pipeline.py: sync_and_load_asset_data() verifica rango en DuckDB/Parquet, descarga el diferencial si falta, valida y normaliza, persiste y retorna DataFrames listos para presentación."
        >
          <PromptBlock label="Prompt 5.2 — data_pipeline.py">
{`Escribe el módulo de integración de datos \`data_pipeline.py\` para Kairós Sentimiento.

Implementa la función integral:
\`sync_and_load_asset_data(ticker: str, start_date: date, end_date: date, force_refresh: bool = False) -> tuple[pd.DataFrame, pd.DataFrame, list[SentimentResult]]\`

Comportamiento:
1. Verifica si existen datos en DuckDB/Parquet para el rango solicitado.
2. Si faltan datos o \`force_refresh=True\`, invoca a \`data_fetcher.py\` para obtener el diferencial.
3. Valida y normaliza con \`schemas.py\` y \`normalizer.py\`.
4. Persiste en Parquet y actualiza las tablas analíticas en DuckDB.
5. Retorna los DataFrames de precios con indicadores y fundamentales, listos para la capa de presentación.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="Conectar APIs con validadores y control de cuotas" 
          goal="api_bridge.py: safe_fetch_financials() comprueba contador local de peticiones en SQLite, hace la llamada HTTP, valida con Pydantic correspondiente; si la validación falla registra el payload erróneo en el log y activa el fallback sin interrumpir la app."
        >
          <PromptBlock label="Prompt 5.3 — api_bridge.py">
{`Escribe el módulo \`api_bridge.py\` para Kairós Sentimiento.

Implementa el wrapper seguro de consulta:
\`safe_fetch_financials(ticker: str, endpoint_type: str) -> dict\`

Requisitos:
1. Comprueba el contador local de peticiones en SQLite para no sobrepasar la cuota diaria del proveedor.
2. Realiza la llamada HTTP asíncrona con headers autorizados.
3. Pasa la respuesta cruda por el validador Pydantic correspondiente.
4. Si la validación falla (ej. cambio en el JSON del proveedor), captura el error, registra el payload erróneo en el log y activa el mecanismo de fallback sin romper la ejecución de la app.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Conectar motor de sentimiento con el repositorio de textos" 
          goal="text_processor.py: index_financial_news() normaliza y guarda noticias en DuckDB/Parquet indexadas por ticker y fecha; process_unclassified_news() recupera noticias sin análisis, procesa en lotes asíncronos con sentiment_parser + guardrails y guarda resultados."
        >
          <PromptBlock label="Prompt 5.4 — text_processor.py">
{`Escribe el módulo \`text_processor.py\` de Kairós Sentimiento.

Implementa:
1. \`index_financial_news(documents: list[dict]) -> int\`: normaliza y guarda noticias en DuckDB/Parquet indexadas por ticker y fecha de publicación.
2. \`process_unclassified_news(ticker: str, batch_size: int = 20) -> list[SentimentResult]\`:
   - Recupera noticias de ese ticker que no tengan análisis de sentimiento registrado.
   - Procesa en lotes asíncronos llamando a \`sentiment_parser.py\`.
   - Aplica \`guardrails.py\` para verificar coherencia.
   - Guarda los resultados en la base de datos y retorna la lista procesada.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="Conectar backstage con el motor de simulación" 
          goal="simulator.py: run_strategy_simulation() itera cronológicamente, evalúa condiciones técnicas + sentimiento disponible hasta la fecha exacta (sin look-ahead bias), genera Signal, modela SimulatedTrade con precios reales del día siguiente y calcula métricas consolidadas (drawdown, tasa de acierto, factor de beneficio)."
        >
          <PromptBlock label="Prompt 5.5 — simulator.py">
{`Escribe el módulo \`simulator.py\` de Kairós Sentimiento.

Implementa la función de simulación:
\`run_strategy_simulation(strategy: Strategy, df_market_data: pd.DataFrame, sentiments: list[SentimentResult]) -> SimulationReport\`

Algoritmo:
1. Itera cronológicamente sobre cada fila del DataFrame de mercado.
2. Evalúa las condiciones de la estrategia combinando indicadores técnicos y sentimiento disponible hasta esa fecha exacta (evitando el sesgo de anticipación o *look-ahead bias*).
3. Genera señales \`Signal\` (BUY, SELL, HOLD) con su justificación técnica.
4. Modela las operaciones simuladas \`SimulatedTrade\` calculando precios de entrada y salida basados en precios reales de apertura o cierre del día siguiente.
5. Calcula métricas consolidadas (Drawdown máximo simulado, tasa de acierto, factor de beneficio hipotético).
6. Guarda el resultado y la versión de la estrategia en SQLite para consulta posterior.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.6" 
          title="Integrar generación de informes con auditoría" 
          goal="Conexión entre report_generator.py y el almacén de trazas: cada informe incluye hash de auditoría, timestamps de cada fuente consultada y versión del modelo de sentimiento usado. Guardado en SQLite para consulta posterior de qué datos respaldaban qué informe."
        >
          <PromptBlock label="Prompt 5.6 — Auditoría de informes">
{`Actúa como Ingeniero de Software Cuantitativo y Especialista en Auditoría Financiera.

Integra la auditoría inmutable en \`report_generator.py\` para Kairós Sentimiento:

1. GENERACI“N DE HASH Y TRAZABILIDAD:
   - Para cada informe generado, calcula un hash SHA-256 a partir de los datos observados, parámetros de indicadores y respuestas del LLM.
   - Genera una tabla en la cabecera del informe con: \`Report ID\`, \`Audit Hash\`, \`Data Sources (APIs & Files)\`, \`Download Timestamps (UTC)\` y \`Model Version\`.

2. PERSISTENCIA DE TRAZAS EN SQLITE:
   - Registra en \`config.db\` (tabla \`report_audit_log\`) la tupla: \`(report_id, ticker, generated_at, audit_hash, strategy_version, filepath)\`.
   - Permite a cualquier usuario o auditor verificar si los resultados presentados corresponden exactamente a los datos brutos descargados en su momento.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.7" 
          title="Configuración centralizada y logging" 
          goal="config.py con clase Settings (Pydantic Settings): KAIROS_DATA_DIR, LOG_LEVEL, FINANCIAL_API_KEY, LLM_API_KEY, LLM_PROVIDER. logger.py con RotatingFileHandler (5MB, 3 copias), formato con timestamp/level/nombre y función de enmascaramiento automático de tokens antes de escribir en log."
        >
          <PromptBlock label="Prompt 5.7 — config.py + logger.py">
{`Escribe los módulos de infraestructura \`config.py\` y \`logger.py\` para Kairós Sentimiento.

Requisitos de \`config.py\`:
1. Clase \`Settings\` de Pydantic Settings que cargue variables desde \`.env\`:
   - \`KAIROS_DATA_DIR\` (por defecto: \`~/.kairos_sentimiento/data\`).
   - \`KAIROS_LOG_LEVEL\` (por defecto: \`INFO\`).
   - \`FINANCIAL_API_KEY\` (opcional).
   - \`LLM_API_KEY\` (opcional).
   - \`LLM_PROVIDER\` (local / openai / anthropic) [VERIFICAR EN DOCUMENTACI“N OFICIAL].
2. Creación automática con \`pathlib\` de todas las carpetas necesarias (\`data/parquet/\`, \`logs/\`, \`exports/\`).
3. Generación de un archivo \`.env.example\` auto-documentado.

Requisitos de \`logger.py\`:
1. Configurar \`logging\` estándar con \`RotatingFileHandler\` (máximo 5MB por archivo, 3 copias de respaldo) guardando en \`logs/kairos_app.log\`.
2. Formato: \`[%(asctime)s] [%(levelname)s] [%(name)s]: %(message)s\`.
3. Función auxiliar para enmascarar automáticamente cualquier clave o token de seguridad antes de escribir en el log.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 6 — PRUEBAS Y EMPAQUETADO
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={FlaskConical}
          label="Capa 6"
          color={C.red}
          title="Pruebas y empaquetado"
          desc="7 suites de tests con Pytest: esquemas Pydantic, indicadores técnicos, calidad de datos, sentimiento con respuestas ambiguas, simulación sin look-ahead bias, informes con trazabilidad, test E2E completo y checklist de verificación en máquina limpia."
        />

        <Step 
          num="6.1" 
          title="Tests unitarios de modelos e indicadores" 
          goal="test_analytics.py + test_schemas.py: Pydantic rechaza precios negativos y high < low; SMA calculada contra vector con resultado conocido; RSI en series extremas (100/0/plana); score de sentimiento fuera de [-1,1] lanza error. Fixtures en conftest.py con datos sintéticos deterministas."
        >
          <PromptBlock label="Prompt 6.1 — Tests de esquemas e indicadores">
{`Escribe la suite de pruebas unitarias \`tests/test_analytics.py\` y \`tests/test_schemas.py\` para Kairós Sentimiento con \`pytest\`.

Tests a implementar:
1. \`test_price_ohlcv_validation_rules()\`: prueba que Pydantic rechace precios negativos, \`high < low\` o fechas futuras.
2. \`test_sma_calculation_accuracy()\`: comprueba el cálculo de medias móviles contra un vector de precios con resultados conocidos a mano.
3. \`test_rsi_edge_cases()\`: verifica el comportamiento del RSI en series con subidas continuas (RSI=100), caídas continuas (RSI=0) y series planas.
4. \`test_sentiment_score_boundaries()\`: asegura que cualquier score fuera del rango [-1.0, 1.0] lance error de validación.

Utiliza fixtures de \`pytest\` en \`conftest.py\` con datos sintéticos deterministas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Tests de calidad de datos y detección de duplicados" 
          goal="test_data_pipeline.py: inserción de precios duplicados es idempotente en DuckDB; normalizador detecta huecos anormales en días laborables; guardrails devuelve False con motivo exacto cuando el LLM inventa una cifra no presente en el documento original."
        >
          <PromptBlock label="Prompt 6.2 — Tests de calidad de datos">
{`Escribe la suite \`tests/test_data_pipeline.py\` para Kairós Sentimiento.

Tests a implementar:
1. \`test_deduplicate_prices()\`: prueba que la inserción de registros duplicados con el mismo ticker y timestamp sea idempotente y no corrompa DuckDB.
2. \`test_missing_dates_detection()\`: valida que el normalizador identifique correctamente huecos anormales en días laborables de mercado.
3. \`test_guardrails_hallucination_detection()\`: simula una respuesta de LLM con una cifra económica inventada y verifica que \`verify_analysis_integrity\` retorne \`False\` con el motivo exacto.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Tests de sentimiento y manejo de respuestas ambiguas" 
          goal="test_sentiment.py: JSON limpio, JSON con etiquetas markdown residuales, timeout de red activa el modo offline sin interrumpir el flujo, documento sin contenido de texto lanza excepción controlada."
        >
          <PromptBlock label="Prompt 6.3 — Tests de sentimiento">
{`Escribe la suite \`tests/test_sentiment.py\` para Kairós Sentimiento.

Tests a implementar:
1. \`test_parse_valid_llm_json()\`: comprueba la extracción correcta de un JSON limpio.
2. \`test_parse_json_with_surrounding_markdown()\`: prueba la extracción cuando el LLM incluye etiquetas \`\`\`json ... \`\`\` y comentarios previos.
3. \`test_fallback_on_api_timeout()\`: simula un timeout de red y verifica que el gestor active el modo de análisis offline sin interrumpir el flujo.
4. \`test_empty_news_document()\`: comprueba que un documento sin contenido de texto sea rechazado con una excepción controlada.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Tests de simulación de estrategias e informes" 
          goal="test_simulator.py + test_reports.py: señales del día T solo usan datos hasta T (no look-ahead bias); modificar reglas de estrategia genera nueva versión en SQLite; informe contiene todos los bloques requeridos con hash de auditoría."
        >
          <PromptBlock label="Prompt 6.4 — Tests de simulación e informes">
{`Escribe la suite \`tests/test_simulator.py\` y \`tests/test_reports.py\` para Kairós Sentimiento.

Tests a implementar:
1. \`test_no_look_ahead_bias()\`: verifica rigurosamente que las señales del día T solo utilicen datos e indicadores calculados hasta el día T.
2. \`test_strategy_versioning()\`: comprueba que al modificar las reglas de una estrategia se genere un nuevo identificador de versión en SQLite.
3. \`test_report_generation_traceability()\`: genera un informe con \`report_generator.py\` y valida que contenga todos los bloques requeridos (metadatos, tablas, fuentes, disclaimer legal y hash de auditoría).`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Test de flujo completo (End-to-End)" 
          goal="test_full_workflow.py: DuckDB + SQLite en memoria, dataset DEMO, normalización + almacenamiento + indicadores + sentimiento con mock determinista del LLM + simulación cruce de medias con filtro de sentimiento + informe Markdown con métricas esperadas."
        >
          <PromptBlock label="Prompt 6.5 — Test E2E completo">
{`Escribe el test de integración E2E \`tests/test_full_workflow.py\` para Kairós Sentimiento.

El test debe:
1. Inicializar una base de datos DuckDB y SQLite en memoria (\`:memory:\`).
2. Cargar el dataset de demostración \`generate_demo_dataset.py\`.
3. Ejecutar la normalización y almacenamiento.
4. Calcular todos los indicadores técnicos y ratios fundamentales.
5. Procesar el sentimiento de las noticias de prueba con un mock determinista del LLM.
6. Ejecutar una simulación de estrategia basada en cruce de medias y filtro de sentimiento positivo.
7. Generar el informe final en Markdown y comprobar que el archivo resultante no esté vacío y contenga las métricas esperadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.6" 
          title="Empaquetado con PyInstaller" 
          goal="kairos_sentimiento.spec: rutas de datos (templates, data/demo/), hiddenimports, exclusiones. Comando pyinstaller --clean. Problemas conocidos con DLLs de DuckDB y assets de Flet al empaquetar. El .env con claves reales NUNCA se incrusta en el binario."
        >
          <PromptBlock label="Prompt 6.6 — Empaquetado .exe">
{`Prepara el proceso de empaquetado de Kairós Sentimiento con PyInstaller.

Requisitos del empaquetado:
- Punto de entrada: \`main.py\`.
- Framework visual: Flet.
- Dependencias clave: duckdb, pydantic, pandas, httpx, python-dotenv.
- Archivos de datos incluidos: templates de reporte, dataset demo (\`data/demo/\`).
- Exclusión de seguridad: el archivo \`.env\` con claves reales NUNCA debe incrustarse en el binario.

Escribe:
1. El archivo de especificación \`kairos_sentimiento.spec\` con todas las rutas de datos (\`datas\`), importaciones ocultas (\`hiddenimports\`) y exclusiones configuradas correctamente.
2. El comando exacto de compilación:
   \`pyinstaller --clean kairos_sentimiento.spec\`
3. Instrucciones detalladas para resolver problemas comunes con las DLLs de DuckDB y los assets de Flet al empaquetar.
   [VERIFICAR EN DOCUMENTACI“N OFICIAL DE FLET Y PYINSTALLER]`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.7" 
          title="Protocolo de prueba en máquina limpia" 
          goal="Checklist en máquina sin Python: arranque < 5s sin ventana de consola, carpetas locales creadas, dataset DEMO cargable sin internet, gráficos correctos, backstage sin errores, exportación de informe Markdown/HTML, modo offline ante pérdida de red, log en ruta esperada sin exponer claves."
        >
          <PromptBlock label="Prompt 6.7 — Verificación en máquina limpia">
{`Genera un protocolo de control de calidad (Checklist en Markdown) para probar el ejecutable de Kairós Sentimiento en una máquina limpia (o máquina virtual recién formateada sin Python).

Puntos de verificación obligatorios:
1. **Arranque inicial**:
   - ¿Abre la ventana de la aplicación en menos de 5 segundos sin ventanas de consola residuales?
   - ¿Se crean correctamente las carpetas locales en el directorio del usuario?
2. **Carga y demostración**:
   - ¿Se puede cargar y visualizar el dataset DEMO sin conexión a internet?
   - ¿Se dibujan correctamente los gráficos interactivos de precios y tablas de fundamentales?
3. **Flujo de estrategia e informes**:
   - ¿Se puede definir y simular una estrategia en el backstage sin errores?
   - ¿El botón de exportación genera el archivo de informe Markdown/HTML en la carpeta seleccionada?
4. **Resiliencia y seguridad**:
   - ¿Muestra el aviso de modo offline sin cerrarse si se desconecta el cable de red?
   - ¿Se escribe el archivo de log en la ruta esperada sin exponer información confidencial?`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 — ITERACI“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={RefreshCw}
          label="Fase 7"
          color={C.amber}
          title="Iteración y publicación"
          desc="Planificar Kairós v2 con conectores profesionales adicionales, backtesting multiactivo y alertas de divergencia, y publicar la ficha técnica en el Foro de Proyectos Horizon."
        />

        <Step 
          num="7.A" 
          title="Roadmap de evolución (v2)" 
          goal="Tabla del backlog v2 con columnas: capa afectada, complejidad técnica, impacto analítico y prioridad. Evaluar: conectores a fuentes profesionales, simulador multiactivo con rebalanceo, mapas de calor correlación sentimiento — rendimiento, alertas de divergencia fundamentales/cotización y publicación de informes en la red Horizon. Reiterar exclusiones permanentes."
        >
          <PromptBlock label="Prompt 7.A — Backlog v2">
{`Kairós Sentimiento v1 está completado y verificado. Ahora planificamos las mejoras para la versión 2.

Posibles extensiones a evaluar:
- Conectores a bases de datos financieras profesionales e institucionales [VERIFICAR EN DOCUMENTACI“N OFICIAL].
- Simulador de carteras multiactivo con rebalanceo periódico.
- Visualizaciones avanzadas (mapas de calor de correlación entre sentimiento y rendimiento).
- Alertas de divergencia entre fundamentales y cotización de mercado.
- Publicación y versionado de informes de investigación dentro de la red Horizon.

Genera la tabla del backlog de la v2 clasificando cada mejora por:
- Capa afectada (1 a 6).
- Complejidad técnica (Alta, Media, Baja).
- Impacto analítico para el investigador.
- Prioridad recomendada.

Reitera explícitamente qué funciones continúan fuera de alcance (ejecución directa de órdenes y custodia de fondos).`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos Horizon" 
          goal="Ficha técnica con: título 'Kairós Sentimiento v1 — Plataforma de Investigación Financiera, Datos y Backstage de Estrategias', stack (Python, Flet, Pydantic v2, DuckDB, Parquet, SQLite, Pandas, LLM/NLP), diferenciadores (separación epistemológica estricta, trazabilidad auditable, modo offline), descargo legal formal y pregunta sobre metodologías para mitigar el ruido en el sentimiento financiero."
        >
          <PromptBlock label="Prompt 7.B — Publicación en el Foro">
{`Prepara la ficha técnica de presentación de Kairós Sentimiento para su publicación en el Foro de Proyectos de Horizon.

Estructura de la ficha:
1. **Título del Proyecto**: \`Kairós Sentimiento v1 — Plataforma de Investigación Financiera, Datos y Backstage de Estrategias\`.
2. **Área**: Finanzas Cuantitativas & Análisis de Mercado.
3. **Propósito**: dotar al analista e investigador de un entorno unificado, trazable y reproducible que conecta fundamentales, series de precios y sentimiento textual con un backstage de simulación de hipótesis.
4. **Stack Tecnológico**: Python, Flet, Pydantic v2, DuckDB, Parquet, SQLite, Pandas, LLM/NLP.
5. **Diferenciadores Clave**: separación estricta entre datos observados, cálculos e inferencias de IA; trazabilidad auditable en cada reporte; operación completa en modo local/offline con dataset DEMO integrado.
6. **Descargo Legal**: aviso formal de ausencia de asesoramiento financiero.
7. **Pregunta para la Comunidad**: plantear un debate técnico sobre metodologías para mitigar el ruido en el análisis de sentimiento de noticias financieras.`}
          </PromptBlock>
        </Step>

        {/* —€—€—€ Resultado esperado —€—€—€ */}
        <div className="mt-12 rounded-2xl p-6 border"
          style={{ background: "rgba(5,150,105,0.04)", borderColor: "rgba(5,150,105,0.18)" }}>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={16} style={{ color: C.emerald }} />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.emerald }}>Resultado esperado</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Al completar los 30+ prompts de esta ruta (Fase 0 + Capas 1–6 + Fase 7), tendrás un <strong>ejecutable de Kairós Sentimiento</strong>: descarga y almacena series de precios y fundamentales de forma idempotente, analiza el sentimiento de fuentes textuales con guardrails antialucinación, permite diseñar y simular estrategias cuantitativas en un backstage dedicado sin ejecutar órdenes, y exporta informes analíticos reproducibles y auditables con trazabilidad completa de fuentes, timestamps y versiones de modelos.
          </p>
          <div className="flex flex-wrap gap-3 justify-start mt-6">
            <Link to="/comunidad/aplicaciones"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: C.emerald, color: "white" }}>
              Publicar en la Comunidad <ChevronRight size={14} />
            </Link>
            <Link to="/taller"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
              style={{ borderColor: "rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.6)" }}>
              Volver al Taller
            </Link>
          </div>
        </div>

        {/* —€—€—€ Version extensions —€—€—€ */}
        <VersionExtensions versions={VERSIONS} />

      </div>
    </div>
  );
}

