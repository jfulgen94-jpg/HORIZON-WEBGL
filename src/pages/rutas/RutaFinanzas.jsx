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

// â”€â”€â”€ Tools table â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "InvestigaciÃ³n", herramienta: "SEC EDGAR Â· Yahoo Finance Â· Alpha Vantage [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL] Â· Papers de sentimiento financiero", motivo: "Validar legalidad, cobertura, cuotas y formatos de datos fundamentales y textuales antes de programar." },
  { capa: "1", subcapa: "1.1â€“1.6", herramienta: "Plantilla de especificaciÃ³n funcional y tÃ©cnica", motivo: "Acotar el alcance estricto del proyecto, delimitando las fronteras entre investigaciÃ³n y trading." },
  { capa: "2", subcapa: "2.1", herramienta: "httpx (async) Â· requests", motivo: "Descarga de fundamentales, series temporales de precios y noticias autorizadas con trazabilidad de metadatos." },
  { capa: "2", subcapa: "2.2â€“2.3", herramienta: "Pydantic v2", motivo: "Modelos Company, PriceOHLCV, FinancialFundamental, Signal, SentimentResult, SimulatedTrade, Report con validadores estrictos." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB + PyArrow (Parquet) + SQLite", motivo: "DuckDB OLAP para consultas analÃ­ticas; Parquet para series histÃ³ricas comprimidas; SQLite para configuraciones y estrategias locales." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON / CSV sintÃ©tico etiquetado como DEMO", motivo: "Dataset completamente reproducible sin APIs ni datos sensibles para pruebas locales." },
  { capa: "3", subcapa: "3.1", herramienta: "Ollama / Llama.cpp (local) Â· OpenAI / Anthropic / Groq [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]", motivo: "ClasificaciÃ³n de sentimiento financiero y extracciÃ³n de entidades; modo local con fallback a API configurado por el usuario." },
  { capa: "3", subcapa: "3.2", herramienta: "Pandas Â· NumPy", motivo: "CÃ¡lculo determinista de indicadores (SMA, EMA, RSI, MACD, Volatilidad) y normalizaciÃ³n de fundamentales." },
  { capa: "3", subcapa: "3.3â€“3.4", herramienta: "httpx con tenacity Â· variables de entorno", motivo: "Llamadas desacopladas a APIs financieras y LLMs con retry exponential backoff y zero hardcoding de credenciales." },
  { capa: "3", subcapa: "3.5â€“3.6", herramienta: "Pydantic validators Â· cachÃ© local Parquet", motivo: "Guardrails antialucinaciÃ³n: la IA no puede inventar cifras ni fuentes; modo offline inmediato sin pÃ©rdida de funcionalidad." },
  { capa: "4", subcapa: "4.1â€“4.5", herramienta: "Flet (Python con Flutter UI) Â· Matplotlib / Plotly", motivo: "Interfaz de escritorio completa con selectores, grÃ¡ficos de precios, tablas de fundamentales y backstage de estrategias." },
  { capa: "5", subcapa: "5.1â€“5.7", herramienta: "python-dotenv Â· logging estÃ¡ndar", motivo: "IntegraciÃ³n modular con trazabilidad en archivo, rotaciÃ³n de logs y centralizaciÃ³n segura de credenciales." },
  { capa: "6", subcapa: "6.1â€“6.5", herramienta: "Pytest + pytest-asyncio", motivo: "Suite automatizada de pruebas unitarias, de integraciÃ³n y de validaciÃ³n de simulaciÃ³n de estrategias." },
  { capa: "6", subcapa: "6.6â€“6.7", herramienta: "PyInstaller", motivo: "Ejecutable Ãºnico distribuible que corra sin Python instalado; dataset DEMO incluido, .env excluido del binario." },
  { capa: "Fase 7", subcapa: "IteraciÃ³n", herramienta: "Foro Horizon Â· Markdown exporter", motivo: "Publicar informes de investigaciÃ³n en la comunidad y definir el roadmap de extensiones futuras." },
];

// â”€â”€â”€ Phases overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PHASES = [
  { id: "0", label: "Fase 0",  name: "InvestigaciÃ³n",         summary: "Fuentes autorizadas de fundamentales y precios, licencias, cuotas y viabilidad del backstage de estrategias e indicadores reproducibles." },
  { id: "1", label: "Capa 1", name: "DefiniciÃ³n",             summary: "Perfil del analista/investigador, problema de fragmentaciÃ³n y opacidad, inputs/outputs con clasificaciÃ³n epistemolÃ³gica y lÃ­mites: sin trading automÃ¡tico ni asesorÃ­a." },
  { id: "2", label: "Capa 2", name: "Datos",                  summary: "11 modelos Pydantic v2 (Company, PriceOHLCV, FinancialFundamental, SentimentResult, Strategy, Signal, SimulatedTrade, Reportâ€¦), DuckDB + Parquet + SQLite y dataset DEMO sintÃ©tico." },
  { id: "3", label: "Capa 3", name: "LÃ³gica / IA",            summary: "Motor de sentimiento (local vs. API), cÃ¡lculo determinista de indicadores con Pandas, guardrails antialucinaciÃ³n y fallback a cachÃ© local con marca temporal." },
  { id: "4", label: "Capa 4", name: "Interfaz (Flet)",        summary: "5 pestaÃ±as: Resumen & Fundamentales, GrÃ¡ficos de Precios & Indicadores, Sentimiento Textual, Backstage de Estrategias y Generador de Informes auditables." },
  { id: "5", label: "Capa 5", name: "IntegraciÃ³n",            summary: "7 mÃ³dulos de integraciÃ³n: controller, data_pipeline, api_bridge, text_processor, simulator, report_generator, config+logger." },
  { id: "6", label: "Capa 6", name: "Pruebas y empaquetado",  summary: "7 suites de tests (esquemas, pipeline, sentimiento, simulaciÃ³n, E2E), empaquetado PyInstaller y checklist en mÃ¡quina limpia." },
  { id: "7", label: "Fase 7", name: "IteraciÃ³n",              summary: "Backlog v2 (conectores profesionales, backtesting multiactivo, alertas avanzadas) y publicaciÃ³n en el Foro de Proyectos." },
];

// â”€â”€â”€ Version extensions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VERSIONS = [
  {
    tag: "v2 Â· Multiactivo",
    area: "Carteras & Rebalanceo",
    title: "KairÃ³s Portfolio â€” Simulador de carteras multiactivo",
    desc: "Extiende KairÃ³s Sentimiento para gestionar simultÃ¡neamente mÃºltiples activos en una cartera, con simulaciÃ³n de rebalanceo periÃ³dico, correlaciones entre activos y curva de capital consolidada de la cartera completa.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: nuevo perfil de usuario gestor de cartera con mÃºltiples tickers simultÃ¡neos",
      "Capa 2: modelo Portfolio con lista de activos, pesos objetivo y frecuencia de rebalanceo",
      "Capa 3: calculate_portfolio_metrics(): correlaciones, Sharpe ratio hipotÃ©tico y drawdown de cartera",
      "Capa 4: pantalla de Cartera con tabla de pesos actuales vs. objetivo y botÃ³n 'Simular Rebalanceo'",
      "Capa 5: portfolio_pipeline() procesa todos los activos en paralelo con asyncio.gather",
      "Aviso legal ampliado: el rebalanceo simulado no tiene en cuenta costes de transacciÃ³n reales",
    ],
  },
  {
    tag: "v3 Â· Mapas de calor",
    area: "VisualizaciÃ³n avanzada",
    title: "KairÃ³s Heat â€” Correlaciones sentimiento Ã— rendimiento",
    desc: "AÃ±ade mapas de calor interactivos que muestran la correlaciÃ³n estadÃ­stica entre el sentimiento textual acumulado y el rendimiento posterior del activo en ventanas de 5, 10 y 20 dÃ­as, para estudiar la capacidad predictiva del sentimiento.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 3: calculate_sentiment_return_correlation(): Pearson y Spearman para cada ventana temporal",
      "Capa 4: nueva pestaÃ±a 'Correlaciones' con mapa de calor Plotly y selector de ventana",
      "Capa 4: tooltip en cada celda con n_observations y p-value (advertencia si n < 30)",
      "Advertencia metodolÃ³gica obligatoria: correlaciÃ³n no implica causalidad ni predicciÃ³n de rendimiento futuro",
      "Capa 6: test_correlation_calculation() con datos sintÃ©ticos con correlaciÃ³n conocida",
      "Capa 6: test_low_sample_warning() verifica que el aviso aparece cuando n < 30",
    ],
  },
  {
    tag: "v4 Â· Alertas de divergencia",
    area: "SeÃ±ales de investigaciÃ³n",
    title: "KairÃ³s Alert â€” Divergencias entre fundamentales y cotizaciÃ³n",
    desc: "Sistema de alertas que detecta automÃ¡ticamente situaciones en que el sentimiento textual y/o los fundamentales reportados divergen significativamente de la cotizaciÃ³n del mercado, generando una notificaciÃ³n de investigaciÃ³n (no una recomendaciÃ³n de inversiÃ³n).",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 3: detect_divergence(): compara z-score de sentimiento con z-score de precio en ventana de 20 dÃ­as",
      "Capa 3: el umbral de divergencia es configurable en config.py; por defecto â‰¥ 2 desviaciones estÃ¡ndar",
      "Capa 4: badge de 'Divergencia Detectada' en el panel de Sentimiento con descripciÃ³n del patrÃ³n",
      "Capa 4: historial de divergencias anteriores en la pantalla del activo",
      "Descargo obligatorio: 'Esta alerta es una seÃ±al de investigaciÃ³n, no una seÃ±al de compra/venta'",
      "Capa 6: test_divergence_detection() con serie sintÃ©tica donde la divergencia es conocida",
    ],
  },
];

// â”€â”€â”€ Financial disclaimer banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FinancialDisclaimerBanner() {
  return (
    <div className="mb-8 rounded-xl border overflow-hidden"
      style={{ borderColor: "rgba(217,119,6,0.25)" }}>
      <div className="flex items-center gap-2 px-5 py-3"
        style={{ background: "rgba(217,119,6,0.08)" }}>
        <AlertTriangle size={15} style={{ color: C.amber }} className="shrink-0" />
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.amber }}>
          Aviso legal financiero â€” Lectura obligatoria
        </span>
      </div>
      <div className="px-5 py-4" style={{ background: "rgba(217,119,6,0.03)" }}>
        <ul className="space-y-2 text-[13px] leading-relaxed" style={{ color: "rgba(17,17,17,0.70)" }}>
          <li className="flex items-start gap-2">
            <span style={{ color: C.amber }} className="shrink-0 font-bold">â†’</span>
            <span><strong>KairÃ³s Sentimiento no es asesoramiento financiero</strong> ni una recomendaciÃ³n de inversiÃ³n. Todos los resultados son de uso investigador y educativo.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: C.amber }} className="shrink-0 font-bold">â†’</span>
            <span>Las seÃ±ales, estrategias y simulaciones son <strong>hipotÃ©ticas</strong>. Los resultados pasados simulados no garantizan rendimientos futuros ni implican rentabilidad real.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: C.amber }} className="shrink-0 font-bold">â†’</span>
            <span>La app separa estrictamente <strong>dato observado</strong> (precio real, cifra contable declarada) de <strong>cÃ¡lculo propio</strong> (indicadores) e <strong>inferencia de IA</strong> (sentimiento). Esta separaciÃ³n es obligatoria en todos los outputs.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: C.amber }} className="shrink-0 font-bold">â†’</span>
            <span>Quedan <strong>fuera de alcance en v1</strong>: ejecuciÃ³n automÃ¡tica de Ã³rdenes, custodia de fondos, asesoramiento personalizado y promesas de rentabilidad futura.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            Finanzas Cuantitativas & AnÃ¡lisis de Mercado Â· Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            KairÃ³s Sentimiento
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            AplicaciÃ³n de investigaciÃ³n financiera que descarga, estructura y analiza fundamentales, precios y sentimiento de mercado, mientras permite construir y evaluar estrategias de inversiÃ³n en un backstage dedicado, de forma trazable y sin ejecutar Ã³rdenes ni sustituir el criterio de un profesional financiero.
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
                    {["Capa", "Subcapa", "Herramienta(s)", "Por quÃ© se usa aquÃ­"].map(h => (
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
                  <strong>Â¿Por quÃ© Flet y DuckDB?</strong> Flet crea interfaces reactivas nativas con grÃ¡ficos interactivos usando 100% Python, sin JavaScript ni dependencias C++. DuckDB procesa millones de filas de datos de mercado en un archivo Ãºnico local a velocidad vectorial, sin servidor externo.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 0 â€” INVESTIGACIÃ“N PREVIA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Search}
          label="Fase 0"
          color={C.accent}
          title="InvestigaciÃ³n"
          desc="Identificar fuentes autorizadas de fundamentales, precios y sentimiento, verificar licencias, cuotas y tÃ©rminos de servicio, y definir quÃ© indicadores y estrategias son tÃ©cnicamente reproducibles antes de escribir una sola lÃ­nea de cÃ³digo."
        />

        <Step 
          num="0.A" 
          title="Identificar fuentes de datos financieros"
          goal="Mapa de proveedores de fundamentales (SEC EDGAR, etc.), series histÃ³ricas OHLCV y fuentes textuales legales para sentimiento, con cobertura geogrÃ¡fica, tipo de acceso y precauciones de copyright y rate limits para cada uno."
        >
          <PromptBlock label="Prompt 0.A â€” Fuentes de datos financieros">
{`ActÃºa como ingeniero de datos financieros y especialista en arquitectura de software cuantitativo.
Estoy diseÃ±ando la aplicaciÃ³n de investigaciÃ³n financiera KairÃ³s Sentimiento.

Necesito que investigues y estructures:
1. Â¿QuÃ© fuentes de datos pÃºblicas o APIs oficiales permiten obtener datos fundamentales de empresas
   (estados financieros, ratios de balance, cuentas de resultados)?
   Indica nombre del proveedor, cobertura geogrÃ¡fica y tipo de acceso (gratuito, registro, freemium).
   [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL de cada proveedor]
2. Â¿QuÃ© fuentes permiten descargar series histÃ³ricas de precios diarios (OHLCV) de forma reproducible?
3. Â¿QuÃ© fuentes textuales legales y autorizadas existen para anÃ¡lisis de sentimiento financiero
   (comunicados oficiales, transcripciones pÃºblicas de earnings calls, feeds RSS autorizados)?
4. Â¿QuÃ© precauciones legales de copyright, rate limits y tÃ©rminos de servicio aplican a cada tipo de dato?

No inventes endpoints, lÃ­mites de peticiones ni precios de suscripciÃ³n. Marca cualquier dato no confirmado
como [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL].`}
          </PromptBlock>
        </Step>

        <Step 
          num="0.B" 
          title="Viabilidad del backstage de estrategias e indicadores"
          goal="Lista de 5 indicadores tÃ©cnicos y 5 ratios fundamentales con fÃ³rmula determinista; cÃ³mo formular seÃ±ales simuladas manteniendo la separaciÃ³n estricta entre dato observado / cÃ¡lculo propio / seÃ±al hipotÃ©tica / inferencia IA; advertencia legal y metodolÃ³gica sobre los lÃ­mites del backtesting."
        >
          <PromptBlock label="Prompt 0.B â€” Viabilidad del backstage">
{`BasÃ¡ndote en el objetivo de KairÃ³s Sentimiento (construir un backstage de estrategias de investigaciÃ³n
sin ejecuciÃ³n automÃ¡tica ni promesas de rentabilidad), necesito definir:
1. Una lista de 5 indicadores tÃ©cnicos estÃ¡ndar y 5 ratios fundamentales clave cuya formulaciÃ³n
   matemÃ¡tica sea determinista, reproducible y libre de ambigÃ¼edades.
2. CÃ³mo formular seÃ±ales de compra/venta simuladas respetando la separaciÃ³n estricta entre:
   - Dato observado (precio real de cierre, beneficio reportado).
   - CÃ¡lculo matemÃ¡tico propio (media mÃ³vil, RSI).
   - SeÃ±al generada por hipÃ³tesis (cruce de medias).
   - Sentimiento extraÃ­do por IA (clasificaciÃ³n positiva/negativa con nivel de confianza).
3. Una advertencia legal y metodolÃ³gica estÃ¡ndar sobre las limitaciones del backtesting y la ausencia de
   asesoramiento financiero personalizado.

Estructura la respuesta de forma tÃ©cnica, limpia y pedagÃ³gica.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 1 â€” DEFINICIÃ“N DEL PROBLEMA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Layers}
          label="Capa 1"
          color={C.emerald}
          title="DefiniciÃ³n del problema"
          desc="Perfil del analista/investigador, problema de fragmentaciÃ³n y opacidad de datos financieros, inputs/outputs con clasificaciÃ³n epistemolÃ³gica obligatoria, criterios de Ã©xito medibles y lÃ­mites no negociables de v1."
        />

        <Step 
          num="1.1" 
          title="Â¿QuiÃ©n usa KairÃ³s Sentimiento?"
          goal="Ficha de usuario con perfil profesional, flujo de trabajo actual disperso en mÃºltiples webs y hojas de cÃ¡lculo, frustraciones (pÃ©rdida de trazabilidad, cÃ¡lculos no reproducibles, mezcla de datos y opiniones) y nivel tÃ©cnico en finanzas y herramientas analÃ­ticas."
        >
          <PromptBlock label="Prompt 1.1 â€” Perfil del analista/investigador">
{`Necesito definir el perfil de usuario detallado de KairÃ³s Sentimiento antes de escribir cÃ³digo.

La aplicaciÃ³n es un entorno de escritorio para investigaciÃ³n financiera, descarga de datos, anÃ¡lisis de
fundamentales, seguimiento de sentimiento y definiciÃ³n de estrategias simuladas.
[DESCRIBE A TU USUARIO: ej. "analista independiente que necesita contrastar los fundamentales de una
empresa con el sentimiento de sus noticias y probar hipÃ³tesis de entrada/salida de forma estructurada"]

Genera una ficha completa de usuario con:
- Perfil profesional y rol.
- Flujo de trabajo actual sin la app (dispersiÃ³n en mÃºltiples webs, hojas de cÃ¡lculo desordenadas).
- Frustraciones principales (pÃ©rdida de trazabilidad, cÃ¡lculos no reproducibles, mezcla de datos y opiniones).
- Beneficios concretos al usar KairÃ³s Sentimiento.
- Nivel tÃ©cnico (competencia en finanzas, uso de herramientas analÃ­ticas, comprensiÃ³n de riesgos).
- Frecuencia y contexto de uso (anÃ¡lisis semanal, estudio previo a decisiones de inversiÃ³n).

Sin lenguaje publicitario ni promesas de enriquecimiento. Tono profesional y analÃ­tico.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.2" 
          title="Â¿QuÃ© problema concreto resuelve?"
          goal="Una sola frase en formato [PERFIL] no puede [TAREA FINANCIERA] porque [OBSTÃCULO], lo que provoca [CONSECUENCIA]. 3 opciones, elegir la mÃ¡s precisa justificando en tÃ©rminos de trazabilidad y rigor analÃ­tico."
        >
          <PromptBlock label="Prompt 1.2 â€” Frase del problema">
{`BasÃ¡ndome en el perfil de usuario de KairÃ³s Sentimiento ([PEGA EL PERFIL DE USUARIO DEFINIDO EN 1.1]),
necesito formular UNA SOLA FRASE rigurosa que defina el problema especÃ­fico que resuelve la aplicaciÃ³n.

La frase debe seguir este formato exacto:
"[PERFIL DE USUARIO] no puede [TAREA FINANCIERA CONCRETA] porque [OBSTÃCULO TÃ‰CNICO/METODOLÃ“GICO REAL],
 lo que provoca [CONSECUENCIA NEGATIVA MEDIBLE EN SU ANÃLISIS]."

Genera 3 opciones adaptadas a KairÃ³s Sentimiento y selecciona la mÃ¡s precisa, justificando la elecciÃ³n
en 2 lÃ­neas en tÃ©rminos de trazabilidad y rigor analÃ­tico.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.3" 
          title="Â¿QuÃ© datos entran?"
          goal="Tabla exhaustiva: ticker/mercado, rango de fechas, estados financieros, textos de noticias, parÃ¡metros de estrategias, archivos CSV/Parquet importados. Para cada campo: tipo, obligatorio/opcional, rango vÃ¡lido, origen y valor por defecto."
        >
          <PromptBlock label="Prompt 1.3 â€” Inventario de inputs">
{`Para KairÃ³s Sentimiento, necesito un inventario formal de todos los datos de entrada que la app puede
recibir (introducidos por el usuario o descargados automÃ¡ticamente).

El usuario podrÃ¡:
- Indicar ticker o sÃ­mbolo de cotizaciÃ³n (ej. AAPL, SAN.MC) y mercado de origen.
- Seleccionar rango de fechas histÃ³ricas y periodicidad (diaria, semanal, mensual).
- Solicitar descarga de estados financieros (Balance, Cuenta de Resultados, Flujo de Caja).
- Suministrar textos o seleccionar feeds de noticias para anÃ¡lisis de sentimiento.
- Configurar parÃ¡metros de estrategias (umbrales de indicadores, reglas de seÃ±al).
- Importar archivos CSV o Parquet externos con histÃ³ricos propios.

Genera una tabla exhaustiva con:
- Nombre del parÃ¡metro / dato.
- Tipo de dato (string, float, date, enum, DataFrame).
- Obligatorio u Opcional.
- Rango o valores vÃ¡lidos permitidos.
- Origen (Usuario / API Financiera / Archivo local).
- Valor por defecto si aplica.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.4" 
          title="Â¿QuÃ© datos salen?"
          goal="Todos los outputs con clasificaciÃ³n epistemolÃ³gica obligatoria: [DATO OBSERVADO] (precios, cifras contables), [DATO CALCULADO] (indicadores), [INFERENCIA IA] (sentimiento), [ESCENARIO HIPOTÃ‰TICO] (seÃ±ales simuladas). Ninguna salida puede confundirse con recomendaciÃ³n de inversiÃ³n."
        >
          <PromptBlock label="Prompt 1.4 â€” Outputs con clasificaciÃ³n epistemolÃ³gica">
{`Continuando con la especificaciÃ³n de KairÃ³s Sentimiento, define todos los outputs (salidas) que la app
debe generar a partir de los datos procesados:

Detalla cada salida especificando:
1. Nombre del output (ej. Tabla de Ratios Fundamentales, GrÃ¡fico OHLCV con Indicadores, Serie de Sentimiento Ponderado, Registro de SeÃ±ales de Estrategia, Informe de InvestigaciÃ³n).
2. Formato de presentaciÃ³n (DataTable en pantalla, grÃ¡fico interactivo Flet/Plotly, archivo Parquet, informe exportable en Markdown/HTML/PDF).
3. Campos e informaciÃ³n exacta que contiene.
4. Momento en que se genera y calcula.
5. ClasificaciÃ³n epistemolÃ³gica del dato:
   - [DATO OBSERVADO] (precios de mercado, cifras contables declaradas).
   - [DATO CALCULADO] (medias mÃ³viles, ratios PER, ROE).
   - [INFERENCIA IA] (sentimiento textual, resumen cualitativo).
   - [ESCENARIO HIPOTÃ‰TICO] (seÃ±ales simuladas de compra/venta).

Asegura que ninguna salida pueda confundirse con una recomendaciÃ³n directa de inversiÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.5" 
          title="Criterios de Ã©xito"
          goal="6â€“8 criterios verificables: descarga sin huecos no identificados, validaciÃ³n Pydantic de esquemas, cÃ¡lculo determinista de indicadores, separaciÃ³n visual dato real / seÃ±al hipotÃ©tica, persistencia DuckDB + Parquet, modo offline ante fallos de API."
        >
          <PromptBlock label="Prompt 1.5 â€” Criterios de Ã©xito">
{`Define una lista de 6 a 8 criterios de Ã©xito medibles y verificables para KairÃ³s Sentimiento v1.

Cada criterio debe redactarse en el formato:
"La aplicaciÃ³n funciona correctamente cuando [CONDICIÃ“N VERIFICABLE Y CUANTIFICABLE]."

Incluye criterios que cubran:
- Descarga y normalizaciÃ³n correcta de series temporales sin huecos no identificados.
- ValidaciÃ³n estricta de esquemas Pydantic para datos fundamentales y de precios.
- CÃ¡lculo determinista de indicadores contrastado con fÃ³rmulas matemÃ¡ticas estÃ¡ndar.
- SeparaciÃ³n visual y funcional clara entre datos reales y seÃ±ales hipotÃ©ticas.
- Persistencia adecuada en DuckDB y exportaciÃ³n Ã­ntegra a Parquet.
- Funcionamiento continuo del modo offline ante fallos de conexiÃ³n o cuotas de API.

Evita tÃ©rminos ambiguos como 'rÃ¡pido' o 'fÃ¡cil'. Todo criterio debe ser testeable automÃ¡ticamente o mediante un paso a paso manual concreto.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.6" 
          title="LÃ­mites explÃ­citos de la v1"
          goal="DeclaraciÃ³n formal de exclusiÃ³n de: ejecuciÃ³n automÃ¡tica de Ã³rdenes, custodia de fondos, asesoramiento personalizado, promesas de rentabilidad y APIs propietarias de coste prohibitivo. Bloque de aviso legal para la pantalla de inicio y la documentaciÃ³n."
        >
          <PromptBlock label="Prompt 1.6 â€” LÃ­mites y aviso legal">
{`Para KairÃ³s Sentimiento v1, redacta una declaraciÃ³n formal de lÃ­mites y alcance excluido.

Para cada una de las siguientes caracterÃ­sticas, justifica por quÃ© queda FUERA de la versiÃ³n 1:
1. EjecuciÃ³n automÃ¡tica de Ã³rdenes de compra/venta en brokers.
2. Custodia o gestiÃ³n de cuentas de dinero real.
3. Asesoramiento financiero personalizado o emisiÃ³n de juicios de idoneidad.
4. Promesas, proyecciones o garantÃ­as de rentabilidad futura.
5. Conexiones a APIs propietarias de coste prohibitivo (como terminales institucionales de pago).

Genera el bloque formal de aviso legal y lÃ­mites que aparecerÃ¡ en la documentaciÃ³n y en la pantalla de
inicio de la aplicaciÃ³n.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 2 â€” DATOS (KAIRÃ“S SENTIMIENTO)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Database}
          label="Capa 2"
          color={C.amber}
          title="Estructura de datos y persistencia"
          desc="11 modelos Pydantic v2 con validadores estrictos, capa de adquisiciÃ³n con trazabilidad completa de metadatos, normalizaciÃ³n con InsufficientDataError, triple almacenamiento DuckDB+Parquet+SQLite y dataset DEMO etiquetado is_demo=True."
        />

        <Step 
          num="2.1" 
          title="Fuentes de datos y conectores" 
          goal="data_fetcher.py con conectores independientes para precios, fundamentales y noticias: headers, rate limits, timeouts, clave desde variable de entorno. Traza de metadatos por descarga: URL/fuente, timestamp UTC, parÃ¡metros y hash del contenido."
        >
          <PromptBlock label="Prompt 2.1 â€” data_fetcher.py">
{`DiseÃ±a el mÃ³dulo de adquisiciÃ³n de datos para KairÃ³s Sentimiento (\`data_fetcher.py\`).

Opciones de fuentes:
- Precios histÃ³ricos: APIs financieras verificadas o bibliotecas de mercado [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL].
- Fundamentales: endpoints oficiales (ej. SEC EDGAR para empresas de EE.UU. o proveedores con capa gratuita documentada).
- Noticias y textos: feeds RSS financieros autorizados y archivos de texto locales aportados por el usuario.
- Carga manual: importador de archivos CSV y Parquet con series personalizadas.

Escribe el cÃ³digo Python con \`httpx\` (asÃ­ncrono) y \`pathlib\` que:
1. Defina conectores independientes para cada fuente con manejo de headers, rate limits y timeouts.
2. Gestione tokens/claves mediante variables de entorno (nunca hardcodeadas).
3. Guarde la traza de metadatos de cada descarga: URL/fuente original, timestamp UTC de consulta, parÃ¡metros y hash del contenido.
4. Incluya tipado estricto y manejo de excepciones de red (\`httpx.RequestError\`, \`httpx.HTTPStatusError\`).`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquemas de datos con Pydantic v2" 
          goal="schemas.py con 11 modelos: Company, Asset, PriceOHLCV (validadores highâ‰¥low, fechas no futuras), FinancialFundamental, AccountingPeriod, NewsDocument, SentimentResult (-1.0 a 1.0), Strategy, Signal, SimulatedTrade y Report. Tickers en mayÃºsculas normalizados."
        >
          <PromptBlock label="Prompt 2.2 â€” schemas.py (11 modelos)">
{`Escribe el mÃ³dulo \`schemas.py\` de KairÃ³s Sentimiento utilizando Pydantic v2 (\`pydantic.BaseModel\`, \`Field\`, \`field_validator\`).

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
- Tickers normalizados en mayÃºsculas sin espacios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="ValidaciÃ³n, limpieza y normalizaciÃ³n" 
          goal="normalizer.py: normalize_price_history() (orden cronolÃ³gico, nulos, continuidad temporal, festivos), normalize_fundamentals() (monedas, unidades, precisiÃ³n numÃ©rica) y log_validation_issues(). InsufficientDataError si el lote no es suficiente para anÃ¡lisis."
        >
          <PromptBlock label="Prompt 2.3 â€” normalizer.py">
{`Escribe el mÃ³dulo \`normalizer.py\` para KairÃ³s Sentimiento.

Implementa funciones de limpieza y normalizaciÃ³n:
1. \`normalize_price_history(raw_data: list[dict]) -> list[PriceOHLCV]\`:
   - Ordena cronolÃ³gicamente.
   - Elimina filas con valores nulos en precios de cierre o fechas duplicadas.
   - Verifica continuidad temporal e identifica fines de semana y festivos de mercado.
2. \`normalize_fundamentals(raw_data: list[dict]) -> list[FinancialFundamental]\`:
   - Homogeneiza monedas y unidades (ej. millones vs unidades).
   - Maneja conversiones de tipos numÃ©ricos evitando pÃ©rdida de precisiÃ³n.
3. \`log_validation_issues(rejected_records: list[dict], reason: str)\`: registra en archivo de log cada registro descartado con el motivo exacto.

Incluye manejo riguroso de excepciones; si un lote no contiene suficientes datos vÃ¡lidos para anÃ¡lisis, lanza una excepciÃ³n de dominio descriptiva (\`InsufficientDataError\`).`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento local DuckDB + Parquet + SQLite" 
          goal="storage.py: init_storage(), save_price_series() idempotente en Parquet + vista DuckDB, save_fundamentals() sin duplicados de ejercicios fiscales, query_asset_overview() uniendo precios y fundamentales, save_strategy_definition() en SQLite. Transacciones atÃ³micas."
        >
          <PromptBlock label="Prompt 2.4 â€” storage.py (triple almacenamiento)">
{`Escribe el mÃ³dulo \`storage.py\` de KairÃ³s Sentimiento implementando la estrategia de almacenamiento local:

Arquitectura de persistencia:
- **DuckDB**: motor analÃ­tico columnar para ejecutar consultas complejas, cruzar fundamentales con precios e integrar cÃ¡lculos estadÃ­sticos.
- **Parquet**: formato de archivo comprimido en disco (\`data/parquet/\`) para series histÃ³ricas de precios y documentos de noticias de solo lectura.
- **SQLite**: base de datos local (\`config.db\`) para almacenar parÃ¡metros de usuario, definiciones de estrategias y registros de auditorÃ­a de informes.

Implementa:
1. \`init_storage(base_path: Path)\`: crea directorios y esquemas iniciales de tablas e Ã­ndices en DuckDB y SQLite.
2. \`save_price_series(ticker: str, prices: list[PriceOHLCV])\`: guarda o actualiza la serie en Parquet y sincroniza la vista analÃ­tica en DuckDB de forma idempotente.
3. \`save_fundamentals(fundamentals: list[FinancialFundamental])\`: inserta registros en DuckDB evitando duplicados de ejercicios fiscales.
4. \`query_asset_overview(ticker: str, start_date: date, end_date: date) -> pd.DataFrame\`: consulta DuckDB uniendo precios y fundamentales para el anÃ¡lisis en interfaz.
5. \`save_strategy_definition(strategy: Strategy)\`: persiste en SQLite la versiÃ³n de la estrategia.

AÃ±ade manejo de conexiones seguras y transacciones atÃ³micas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mÃ­nimo de ejemplo (DEMO)" 
          goal="generate_demo_dataset.py: 2 empresas ficticias (DEMO_TECH, DEMO_ENERGY), 250 dÃ­as OHLCV, 8 trimestres de fundamentales, 10 noticias por empresa con sentimiento variado. Todos los registros marcados is_demo=True y '[DEMO DATA - NO REAL]'. Validados con Pydantic, guardados en data/demo/."
        >
          <PromptBlock label="Prompt 2.5 â€” Dataset DEMO sintÃ©tico">
{`Escribe un script \`generate_demo_dataset.py\` que construya un dataset sintÃ©tico completo para KairÃ³s Sentimiento.

El dataset debe contener:
1. 2 empresas ficticias con tickers de demostraciÃ³n: \`DEMO_TECH\` (Sector TecnolÃ³gico) y \`DEMO_ENERGY\` (Sector EnergÃ©tico).
2. 250 dÃ­as de precios diarios OHLCV simulados con parÃ¡metros realistas (tendencia, volatilidad y volumen coherente).
3. 8 trimestres de estados fundamentales sintÃ©ticos (ingresos, costes, beneficio neto, deuda y activos).
4. 10 noticias ficticias fechadas para cada empresa, con contenido variado (noticias positivas sobre innovaciÃ³n, neutrales sobre eventos del sector y negativas sobre costes regulatorios).
5. Todas las entidades deben estar claramente marcadas con el campo \`is_demo=True\` y la etiqueta \`[DEMO DATA - NO REAL]\`.

El script debe validar los datos generados contra los modelos Pydantic de \`schemas.py\` y guardarlos en \`data/demo/\` en formatos JSON y Parquet listos para pruebas.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 â€” LÃ“GICA / IA (KAIRÃ“S SENTIMIENTO)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Cpu}
          label="Capa 3"
          color={C.accent}
          title="LÃ³gica, indicadores y modelos de sentimiento"
          desc="Motor de sentimiento (modo local Ollama/FinBERT con fallback a API), indicadores tÃ©cnicos deterministas con Pandas, guardrails que impiden alucinaciones de cifras financieras y modo offline con cachÃ© Parquet con marca temporal explÃ­cita."
        />

        <Step 
          num="3.1" 
          title="SelecciÃ³n del motor de sentimiento" 
          goal="Comparativa: modelo local (FinBERT o Llama-3-8B con Ollama) vs. API externa (OpenAI/Anthropic/Groq). Evaluar: privacidad de datos, latencia y coste por 1.000 artÃ­culos, facilidad de empaquetado en .exe. ConfiguraciÃ³n por defecto: local con fallback a API opcional configurada por el usuario."
        >
          <PromptBlock label="Prompt 3.1 â€” SelecciÃ³n del motor de sentimiento">
{`ActÃºa como arquitecto de soluciones de IA aplicada a finanzas.
Para KairÃ³s Sentimiento, necesito seleccionar el motor para dos tareas de procesamiento de lenguaje:
- Tarea A: ClasificaciÃ³n de sentimiento financiero en 3 clases (Positivo, Neutro, Negativo) con extracciÃ³n de puntuaciÃ³n (-1.0 a +1.0) y nivel de confianza.
- Tarea B: ExtracciÃ³n estructurada de factores clave y resumen de hechos relevantes en noticias financieras.

Genera una comparativa tÃ©cnica entre:
1. Modelo local de lenguaje pequeÃ±o / especializado (ej. FinBERT o Llama-3-8B local vÃ­a Ollama).
2. API externa de inferencia rÃ¡pida y bajo coste (ej. OpenAI / Anthropic / Groq) [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL].

EvalÃºa segÃºn:
- Privacidad y soberanÃ­a de datos (anÃ¡lisis sin enviar informaciÃ³n a terceros).
- Latencia y coste por cada 1.000 artÃ­culos analizados.
- Facilidad de empaquetado para el usuario final en una app de escritorio.

Proporciona la configuraciÃ³n recomendada por defecto (modo local con fallback a API opcional configurada por el usuario con su propia clave).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="Funciones analÃ­ticas e indicadores" 
          goal="analytics.py: calculate_technical_indicators() (SMA 20/50/200, EMA 12/26, RSI 14 con gestiÃ³n de divisiones por cero, MACD, Volatilidad histÃ³rica anualizada), calculate_fundamental_ratios() (Margen Neto, ROE, ROA, Endeudamiento, PER, P/B) y aggregate_sentiment_score() ponderado por confianza y recencia."
        >
          <PromptBlock label="Prompt 3.2 â€” analytics.py (indicadores deterministas)">
{`Escribe el mÃ³dulo \`analytics.py\` para KairÃ³s Sentimiento con funciones matemÃ¡ticas puras utilizando Pandas y NumPy.

Implementa:
1. \`calculate_technical_indicators(df_prices: pd.DataFrame) -> pd.DataFrame\`:
   - Medias MÃ³viles Simples (SMA 20, 50, 200) y Exponenciales (EMA 12, 26).
   - RSI (Relative Strength Index) estÃ¡ndar de 14 periodos con gestiÃ³n de divisiones por cero.
   - MACD (LÃ­nea MACD, SeÃ±al y Divergencia).
   - Volatilidad histÃ³rica anualizada (desviaciÃ³n estÃ¡ndar de rendimientos logarÃ­tmicos).
2. \`calculate_fundamental_ratios(df_fundamentals: pd.DataFrame, current_price: float) -> dict\`:
   - Margen Neto, Margen Operativo, ROE (Return on Equity), ROA (Return on Assets).
   - Ratio de Endeudamiento (Deuda Total / Activo Total).
   - Ratios de valoraciÃ³n aproximados con el precio suministrado (PER, P/B).
3. \`aggregate_sentiment_score(sentiments: list[SentimentResult], window_days: int = 30) -> dict\`:
   - Sentimiento medio ponderado por confianza y recencia temporal.
   - DistribuciÃ³n de noticias (conteo positivo, neutro, negativo).

Todas las funciones deben ser deterministas, incluir pruebas de divisiÃ³n por cero y manejar vectores con valores NaN al inicio de las series.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Clientes de APIs y gestiÃ³n de claves" 
          goal="api_client.py: clientes separados para APIs financieras y LLM, credenciales solo desde variables de entorno, retry con exponential backoff (tenacity o nativo async), rate limiting estricto, timeout 20s, log de cada llamada con claves enmascaradas."
        >
          <PromptBlock label="Prompt 3.3 â€” api_client.py">
{`Escribe el mÃ³dulo \`api_client.py\` de KairÃ³s Sentimiento.

Requisitos tÃ©cnicos:
1. Separar completamente el cliente de APIs financieras del cliente de APIs de LLM.
2. Cargar credenciales exclusivamente desde variables de entorno (\`FINANCIAL_API_KEY\`, \`LLM_API_KEY\`) utilizando \`os.environ\` y \`python-dotenv\`.
3. Implementar reintentos con retroceso exponencial (Exponential Backoff) usando \`tenacity\` o un decorador nativo asÃ­ncrono para errores HTTP transitorios (429 Too Many Requests, 500, 503).
4. Configurar lÃ­mites de tasa (Rate Limiting) estrictos para no saturar las cuotas del proveedor.
5. Implementar timeout estricto de 20 segundos por solicitud.
6. Registrar en log cada llamada realizada (ocultando siempre tokens y cabeceras de autorizaciÃ³n).

Incluye marcado [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL] para los endpoints utilizados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Parseo y trazabilidad de inferencias" 
          goal="sentiment_parser.py: prompt de sistema con JSON estricto (sentiment, score, confidence, key_factors, quote_evidence); parse_sentiment_response() que valida rangos, genera SentimentResult con doc_id, timestamp y model_used; SentimentParsingError con texto recibido si falla."
        >
          <PromptBlock label="Prompt 3.4 â€” sentiment_parser.py">
{`Escribe el mÃ³dulo \`sentiment_parser.py\` para KairÃ³s Sentimiento.

Implementa:
1. Un prompt de sistema para el LLM que exija respuesta estricta en formato JSON sin texto introductorio ni markdown residual:
   \`{"sentiment": "Positive"|"Neutral"|"Negative", "score": float, "confidence": float, "key_factors": list[str], "quote_evidence": str}\`.
2. La funciÃ³n \`parse_sentiment_response(raw_response: str, doc: NewsDocument, model_name: str) -> SentimentResult\`:
   - Extrae el bloque JSON utilizando expresiones regulares de seguridad o deserializaciÃ³n directa.
   - Valida los rangos numÃ©ricos (\`score\` entre -1.0 y 1.0; \`confidence\` entre 0.0 y 1.0).
   - Genera el objeto \`SentimentResult\` asociando el \`doc_id\`, la fecha actual de anÃ¡lisis y el identificador del modelo.
   - Si la respuesta es invÃ¡lida o no parseable, lanza \`SentimentParsingError\` con el texto recibido para auditorÃ­a.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Guardrails antialucinaciÃ³n" 
          goal="guardrails.py: verify_analysis_integrity() comprueba que cifras en key_factors/quote_evidence existan literalmente en el documento original, que la etiqueta sea coherente con el signo del score y que cambios porcentuales no contradigan precios reales. Devuelve (True,[]) o (False,[motivos]). Si False â†’ is_verified=False + aviso visible."
        >
          <PromptBlock label="Prompt 3.5 â€” guardrails.py (antialucinaciÃ³n)">
{`Escribe el mÃ³dulo \`guardrails.py\` para KairÃ³s Sentimiento.

Implementa la funciÃ³n de verificaciÃ³n:
\`verify_analysis_integrity(sentiment_result: SentimentResult, original_doc: NewsDocument, financial_data: dict) -> tuple[bool, list[str]]\`

Reglas de control:
1. Comprobar que cualquier cifra econÃ³mica citada por el LLM en \`key_factors\` o \`quote_evidence\` exista literalmente dentro del texto del documento original \`original_doc.content\`.
2. Verificar que la etiqueta asignada coincida con el signo del score (ej. si score > 0.2 no puede etiquetarse como Negative).
3. Si el modelo afirma un cambio porcentual de precio, verificar que no se contradiga con la serie real de precios del activo.
4. Devolver \`(True, [])\` si la inferencia es consistente o \`(False, ["motivo1", "motivo2"])\` si detecta anomalÃ­as o alucinaciones.

Si devuelve False, el resultado se marcarÃ¡ en la base de datos con la bandera \`is_verified=False\` y se mostrarÃ¡ una advertencia visible en la interfaz.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="Fallback y modo offline" 
          goal="fallback_manager.py: get_analysis_with_fallback() intenta API â†’ si falla carga DuckDB/Parquet local con aviso 'Datos en cachÃ© local actualizados a fecha [TIMESTAMP]' â†’ sentimiento pendiente en modo offline marcado explÃ­citamente. Devuelve AnalysisPayload con estado ONLINE_FRESH / LOCAL_CACHE / DEMO_DATA."
        >
          <PromptBlock label="Prompt 3.6 â€” fallback_manager.py">
{`Escribe el mÃ³dulo \`fallback_manager.py\` para KairÃ³s Sentimiento.

Implementa la funciÃ³n de resoluciÃ³n con respaldo:
\`get_analysis_with_fallback(ticker: str, start_date: date, end_date: date, allow_network: bool = True) -> AnalysisPayload\`

Flujo de ejecuciÃ³n:
1. Intentar actualizar datos desde APIs si \`allow_network=True\`.
2. Si falla la red, expira el timeout o se agota la cuota:
   - Cargar la Ãºltima serie de precios y fundamentales almacenada localmente en DuckDB/Parquet.
   - Calcular la antigÃ¼edad del dato local e incluir un aviso explÃ­cito: *"Datos en cachÃ© local actualizados a fecha [TIMESTAMP]"*.
   - Para el sentimiento, si el LLM no estÃ¡ disponible, utilizar un analizador lÃ©xico bÃ¡sico basado en reglas de diccionario financiero o marcar las noticias como *"Pendientes de anÃ¡lisis de IA (Modo Offline)"*.
3. Devolver un objeto \`AnalysisPayload\` que incluya el estado de la fuente (\`ONLINE_FRESH\`, \`LOCAL_CACHE\`, \`DEMO_DATA\`).`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 4 â€” INTERFAZ DE ESCRITORIO (FLET)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Monitor}
          label="Capa 4"
          color="#7C3AED"
          title="Interfaz de escritorio (Flet)"
          desc="5 pestaÃ±as en la interfaz principal: Resumen & Fundamentales, GrÃ¡ficos de Precios & Indicadores, Sentimiento Textual & Noticias, Backstage de Estrategias (con aviso legal fijo) y Generador de Informes auditables en Markdown/HTML."
        />

        <Step 
          num="4.1" 
          title="Panel principal y wireframe" 
          goal="ui_main.py: selector de activo/mercado/rango temporal, badge de estado del sistema (Conectado / CachÃ© Local / DEMO), timestamp de Ãºltima sincronizaciÃ³n y 5 pestaÃ±as de navegaciÃ³n (ft.Tabs). DescripciÃ³n de widgets con nombres de controles y disposiciÃ³n responsiva."
        >
          <PromptBlock label="Prompt 4.1 â€” ui_main.py (panel principal)">
{`ActÃºa como diseÃ±ador de interfaces de software financiero y desarrollador experto en Flet (Python).
DiseÃ±a la arquitectura visual y wireframe del panel principal de KairÃ³s Sentimiento (\`ui_main.py\`).

Componentes requeridos en el panel superior y barra lateral:
1. Selector de activo / empresa (campo de texto para ticker o lista desplegable de seguimiento).
2. Selector de mercado (Mercado Continuo, NYSE, NASDAQ, etc.).
3. Selector de rango temporal de anÃ¡lisis (1M, 3M, 6M, 1A, 5A, Personalizado con DatePicker).
4. Indicador de estado del sistema (Badge con color: Verde = Conectado / Amarillo = Modo CachÃ© Local / Azul = Dataset DEMO).
5. Marca de tiempo con la fecha y hora de la Ãºltima sincronizaciÃ³n de datos.
6. NavegaciÃ³n principal por pestaÃ±as:
   - [PestaÃ±a 1: Resumen & Fundamentales]
   - [PestaÃ±a 2: GrÃ¡ficos de Precios & Indicadores]
   - [PestaÃ±a 3: Sentimiento Textual & Noticias]
   - [PestaÃ±a 4: Backstage de Estrategias]
   - [PestaÃ±a 5: Generador de Informes]

Escribe la descripciÃ³n estructurada de widgets Flet (\`ft.Tabs\`, \`ft.NavigationRail\`, \`ft.Container\`, \`ft.Dropdown\`) con nombres de controles y disposiciÃ³n responsiva.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Zona de descargas y gestiÃ³n de datos" 
          goal="ui_downloads.py: botones de descarga asÃ­ncronos (Fundamentales, Precios, Importar CSV/Parquet con ft.FilePicker), barra de progreso, diÃ¡logo de confirmaciÃ³n y panel de errores claros por cuota o formato invÃ¡lido. Sin congelar la UI en ningÃºn momento."
        >
          <PromptBlock label="Prompt 4.2 â€” ui_downloads.py">
{`Escribe el componente Flet \`ui_downloads.py\` para KairÃ³s Sentimiento.

Funcionalidades de la interfaz:
1. BotÃ³n "Descargar / Actualizar Fundamentales": dispara la sincronizaciÃ³n asÃ­ncrona del balance y cuenta de resultados.
2. BotÃ³n "Descargar Precios HistÃ³ricos": recupera la serie temporal de cotizaciÃ³n.
3. BotÃ³n "Importar Archivo Local": selector de archivos (\`ft.FilePicker\`) para cargar CSV o Parquet externos.
4. Barra de progreso (\`ft.ProgressBar\`) y estado de la operaciÃ³n (mensajes informativos de descarga y validaciÃ³n).
5. Cuadro de diÃ¡logo de confirmaciÃ³n y panel de errores con mensajes claros si la API rechaza la peticiÃ³n por cuota o formato invÃ¡lido.

El cÃ³digo debe ejecutar las operaciones en hilos secundarios asÃ­ncronos para nunca congelar la interfaz de usuario.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Zona de anÃ¡lisis visual y mÃ©tricas" 
          goal="ui_analysis.py: DataTable de fundamentales con cÃ³digo de color por variaciÃ³n interanual, grÃ¡fico OHLCV + SMA 50/200 + RSI, panel de sentimiento con velocÃ­metro (-1 a +1) + distribuciÃ³n de noticias + lista de artÃ­culos con etiqueta. Metadatos de trazabilidad al pie de cada panel."
        >
          <PromptBlock label="Prompt 4.3 â€” ui_analysis.py">
{`Escribe el componente Flet \`ui_analysis.py\` para KairÃ³s Sentimiento.

Incluye los siguientes paneles:
1. **Tabla de Fundamentales**: \`ft.DataTable\` interactiva que presente ingresos, mÃ¡rgenes, deuda neta y ratios financieros clave por trimestre/aÃ±o, con cÃ³digo de color sutil para variaciones interanuales.
2. **GrÃ¡fico de Precios e Indicadores**: contenedor para visualizar velas japonesas (OHLCV) junto con las medias mÃ³viles (SMA 50/200) y panel inferior con el oscilador RSI.
3. **Panel de Sentimiento**: tarjeta de resumen con velocÃ­metro o barra de progreso de sentimiento (-1.0 a +1.0), distribuciÃ³n de noticias analizadas y lista de artÃ­culos recientes con su etiqueta de sentimiento y factor clave extraÃ­do.
4. **Metadatos de Trazabilidad**: pie de pÃ¡gina en cada panel indicando fuente del dato, fecha de captura y versiÃ³n del algoritmo aplicado.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Backstage de estrategias cuantitativas" 
          goal="ui_strategies.py: panel de definiciÃ³n (nombre, constructor de reglas tÃ©cnicas y de sentimiento, periodo de simulaciÃ³n), botÃ³n 'Ejecutar SimulaciÃ³n en Backstage', tabla de SimulatedTrade con fecha/precio/resultado, curva de capital hipotÃ©tica y banner legal fijo no descartable."
        >
          <PromptBlock label="Prompt 4.4 â€” ui_strategies.py (backstage)">
{`Escribe el componente Flet \`ui_strategies.py\` para el Backstage de Estrategias de KairÃ³s Sentimiento.

Elementos de la pantalla:
1. **Panel de DefiniciÃ³n**:
   - Campo para nombre y descripciÃ³n de la estrategia.
   - Constructor de reglas: selector de condiciÃ³n (ej. "RSI(14) < 30", "SMA(20) cruza al alza SMA(50)", "Sentimiento 30d > 0.3").
   - Selector de periodo histÃ³rico para la simulaciÃ³n.
2. **BotÃ³n "Ejecutar SimulaciÃ³n en Backstage"**:
   - Procesa la serie histÃ³rica y genera las seÃ±ales hipotÃ©ticas sin enviar ninguna orden a ningÃºn broker.
3. **Panel de Resultados de la SimulaciÃ³n**:
   - Tabla de operaciones simuladas (\`SimulatedTrade\`): fecha de entrada, precio simulado, fecha de salida, resultado porcentual hipotÃ©tico.
   - MÃ©tricas de la simulaciÃ³n: nÃºmero total de operaciones, porcentaje de operaciones positivas, ratio ganancia/pÃ©rdida promedio.
   - GrÃ¡fico de curva de capital hipotÃ©tica (Equity Curve simulada).
4. **Aviso Legal Destacado**: banner fijo que recuerde: *"Los resultados simulados son hipotÃ©ticos, se basan en datos pasados y no garantizan rendimientos futuros. No constituye asesoramiento de inversiÃ³n."*`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="Generador de informes auditables" 
          goal="ui_reports.py + report_generator.py: informe Markdown/HTML con cabecera, resumen ejecutivo, anÃ¡lisis fundamental/tÃ©cnico/de sentimiento, estrategia simulada, tabla de trazabilidad (API/archivo, timestamps, versiones de modelos) y descargo legal. PrevisualizaciÃ³n + botones de guardado .md/.html."
        >
          <PromptBlock label="Prompt 4.5 â€” ui_reports.py + report_generator.py">
{`Escribe el componente Flet \`ui_reports.py\` y el motor de generaciÃ³n de reportes \`report_generator.py\` para KairÃ³s Sentimiento.

El generador debe producir un informe estructurado en formato Markdown (con opciÃ³n de exportaciÃ³n a HTML):
1. **Cabecera**: Empresa/Activo, Ticker, Fecha de generaciÃ³n, Identificador Ãºnico del reporte.
2. **Resumen Ejecutivo**: sÃ­ntesis de fundamentales observados y tendencia de precios.
3. **AnÃ¡lisis Fundamental**: tabla de ratios y notas sobre la salud del balance.
4. **AnÃ¡lisis TÃ©cnico**: estado de los indicadores calculados al cierre del periodo.
5. **AnÃ¡lisis de Sentimiento**: resumen de la percepciÃ³n textual con citas del corpus analizado.
6. **Registro de Estrategia Simulada**: parÃ¡metros de la hipÃ³tesis testeada y mÃ©tricas obtenidas.
7. **Trazabilidad y Fuentes**: tabla con cada API/archivo utilizado, timestamps de descarga y versiones de modelos.
8. **Descargo de Responsabilidad (Disclaimer)**: clÃ¡usula formal de no asesoramiento financiero.

Incluye en la interfaz un botÃ³n para previsualizar el informe y botones de guardado en archivo (\`.md\` / \`.html\`).`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 5 â€” INTEGRACIÃ“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Link2}
          label="Capa 5"
          color={C.emerald}
          title="IntegraciÃ³n"
          desc="7 mÃ³dulos de orquestaciÃ³n que conectan la interfaz Flet con la lÃ³gica analÃ­tica, la triple base de datos, las APIs financieras, el motor de sentimiento, el simulador de estrategias, el generador de informes y la configuraciÃ³n centralizada con logs rotativos."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con el motor analÃ­tico" 
          goal="controller.py AppController: on_asset_selected() carga DuckDB + calcula indicadores en background y actualiza la vista activa; on_run_sentiment_analysis() indexa noticias, aplica guardrails y refresca el panel de sentimiento. Estado centralizado propagado a todas las pestaÃ±as."
        >
          <PromptBlock label="Prompt 5.1 â€” controller.py">
{`Escribe el mÃ³dulo de orquestaciÃ³n \`controller.py\` que conecte la interfaz Flet (\`ui_main.py\`, \`ui_analysis.py\`) con la lÃ³gica analÃ­tica de KairÃ³s Sentimiento.

Implementa la clase \`AppController\`:
1. \`on_asset_selected(ticker: str, timeframe: str)\`:
   - Dispara la carga o consulta en DuckDB.
   - Ejecuta el cÃ¡lculo de indicadores tÃ©cnicos y ratios en segundo plano.
   - Actualiza los componentes visuales de la vista activa.
2. \`on_run_sentiment_analysis(ticker: str)\`:
   - Consulta los documentos de noticias asociados al activo.
   - Ejecuta la inferencia mediante el cliente de IA configurado.
   - Aplica los guardrails de calidad y refresca el panel de sentimiento.
3. Manejo de estado centralizado para que el cambio de activo se propague coherentemente a todas las pestaÃ±as de la aplicaciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lÃ³gica con la triple base de datos" 
          goal="data_pipeline.py: sync_and_load_asset_data() verifica rango en DuckDB/Parquet, descarga el diferencial si falta, valida y normaliza, persiste y retorna DataFrames listos para presentaciÃ³n."
        >
          <PromptBlock label="Prompt 5.2 â€” data_pipeline.py">
{`Escribe el mÃ³dulo de integraciÃ³n de datos \`data_pipeline.py\` para KairÃ³s Sentimiento.

Implementa la funciÃ³n integral:
\`sync_and_load_asset_data(ticker: str, start_date: date, end_date: date, force_refresh: bool = False) -> tuple[pd.DataFrame, pd.DataFrame, list[SentimentResult]]\`

Comportamiento:
1. Verifica si existen datos en DuckDB/Parquet para el rango solicitado.
2. Si faltan datos o \`force_refresh=True\`, invoca a \`data_fetcher.py\` para obtener el diferencial.
3. Valida y normaliza con \`schemas.py\` y \`normalizer.py\`.
4. Persiste en Parquet y actualiza las tablas analÃ­ticas en DuckDB.
5. Retorna los DataFrames de precios con indicadores y fundamentales, listos para la capa de presentaciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="Conectar APIs con validadores y control de cuotas" 
          goal="api_bridge.py: safe_fetch_financials() comprueba contador local de peticiones en SQLite, hace la llamada HTTP, valida con Pydantic correspondiente; si la validaciÃ³n falla registra el payload errÃ³neo en el log y activa el fallback sin interrumpir la app."
        >
          <PromptBlock label="Prompt 5.3 â€” api_bridge.py">
{`Escribe el mÃ³dulo \`api_bridge.py\` para KairÃ³s Sentimiento.

Implementa el wrapper seguro de consulta:
\`safe_fetch_financials(ticker: str, endpoint_type: str) -> dict\`

Requisitos:
1. Comprueba el contador local de peticiones en SQLite para no sobrepasar la cuota diaria del proveedor.
2. Realiza la llamada HTTP asÃ­ncrona con headers autorizados.
3. Pasa la respuesta cruda por el validador Pydantic correspondiente.
4. Si la validaciÃ³n falla (ej. cambio en el JSON del proveedor), captura el error, registra el payload errÃ³neo en el log y activa el mecanismo de fallback sin romper la ejecuciÃ³n de la app.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Conectar motor de sentimiento con el repositorio de textos" 
          goal="text_processor.py: index_financial_news() normaliza y guarda noticias en DuckDB/Parquet indexadas por ticker y fecha; process_unclassified_news() recupera noticias sin anÃ¡lisis, procesa en lotes asÃ­ncronos con sentiment_parser + guardrails y guarda resultados."
        >
          <PromptBlock label="Prompt 5.4 â€” text_processor.py">
{`Escribe el mÃ³dulo \`text_processor.py\` de KairÃ³s Sentimiento.

Implementa:
1. \`index_financial_news(documents: list[dict]) -> int\`: normaliza y guarda noticias en DuckDB/Parquet indexadas por ticker y fecha de publicaciÃ³n.
2. \`process_unclassified_news(ticker: str, batch_size: int = 20) -> list[SentimentResult]\`:
   - Recupera noticias de ese ticker que no tengan anÃ¡lisis de sentimiento registrado.
   - Procesa en lotes asÃ­ncronos llamando a \`sentiment_parser.py\`.
   - Aplica \`guardrails.py\` para verificar coherencia.
   - Guarda los resultados en la base de datos y retorna la lista procesada.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="Conectar backstage con el motor de simulaciÃ³n" 
          goal="simulator.py: run_strategy_simulation() itera cronolÃ³gicamente, evalÃºa condiciones tÃ©cnicas + sentimiento disponible hasta la fecha exacta (sin look-ahead bias), genera Signal, modela SimulatedTrade con precios reales del dÃ­a siguiente y calcula mÃ©tricas consolidadas (drawdown, tasa de acierto, factor de beneficio)."
        >
          <PromptBlock label="Prompt 5.5 â€” simulator.py">
{`Escribe el mÃ³dulo \`simulator.py\` de KairÃ³s Sentimiento.

Implementa la funciÃ³n de simulaciÃ³n:
\`run_strategy_simulation(strategy: Strategy, df_market_data: pd.DataFrame, sentiments: list[SentimentResult]) -> SimulationReport\`

Algoritmo:
1. Itera cronolÃ³gicamente sobre cada fila del DataFrame de mercado.
2. EvalÃºa las condiciones de la estrategia combinando indicadores tÃ©cnicos y sentimiento disponible hasta esa fecha exacta (evitando el sesgo de anticipaciÃ³n o *look-ahead bias*).
3. Genera seÃ±ales \`Signal\` (BUY, SELL, HOLD) con su justificaciÃ³n tÃ©cnica.
4. Modela las operaciones simuladas \`SimulatedTrade\` calculando precios de entrada y salida basados en precios reales de apertura o cierre del dÃ­a siguiente.
5. Calcula mÃ©tricas consolidadas (Drawdown mÃ¡ximo simulado, tasa de acierto, factor de beneficio hipotÃ©tico).
6. Guarda el resultado y la versiÃ³n de la estrategia en SQLite para consulta posterior.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.6" 
          title="Integrar generaciÃ³n de informes con auditorÃ­a" 
          goal="ConexiÃ³n entre report_generator.py y el almacÃ©n de trazas: cada informe incluye hash de auditorÃ­a, timestamps de cada fuente consultada y versiÃ³n del modelo de sentimiento usado. Guardado en SQLite para consulta posterior de quÃ© datos respaldaban quÃ© informe."
        >
          <PromptBlock label="Prompt 5.6 â€” AuditorÃ­a de informes">
{`ActÃºa como Ingeniero de Software Cuantitativo y Especialista en AuditorÃ­a Financiera.

Integra la auditorÃ­a inmutable en \`report_generator.py\` para KairÃ³s Sentimiento:

1. GENERACIÃ“N DE HASH Y TRAZABILIDAD:
   - Para cada informe generado, calcula un hash SHA-256 a partir de los datos observados, parÃ¡metros de indicadores y respuestas del LLM.
   - Genera una tabla en la cabecera del informe con: \`Report ID\`, \`Audit Hash\`, \`Data Sources (APIs & Files)\`, \`Download Timestamps (UTC)\` y \`Model Version\`.

2. PERSISTENCIA DE TRAZAS EN SQLITE:
   - Registra en \`config.db\` (tabla \`report_audit_log\`) la tupla: \`(report_id, ticker, generated_at, audit_hash, strategy_version, filepath)\`.
   - Permite a cualquier usuario o auditor verificar si los resultados presentados corresponden exactamente a los datos brutos descargados en su momento.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.7" 
          title="ConfiguraciÃ³n centralizada y logging" 
          goal="config.py con clase Settings (Pydantic Settings): KAIROS_DATA_DIR, LOG_LEVEL, FINANCIAL_API_KEY, LLM_API_KEY, LLM_PROVIDER. logger.py con RotatingFileHandler (5MB, 3 copias), formato con timestamp/level/nombre y funciÃ³n de enmascaramiento automÃ¡tico de tokens antes de escribir en log."
        >
          <PromptBlock label="Prompt 5.7 â€” config.py + logger.py">
{`Escribe los mÃ³dulos de infraestructura \`config.py\` y \`logger.py\` para KairÃ³s Sentimiento.

Requisitos de \`config.py\`:
1. Clase \`Settings\` de Pydantic Settings que cargue variables desde \`.env\`:
   - \`KAIROS_DATA_DIR\` (por defecto: \`~/.kairos_sentimiento/data\`).
   - \`KAIROS_LOG_LEVEL\` (por defecto: \`INFO\`).
   - \`FINANCIAL_API_KEY\` (opcional).
   - \`LLM_API_KEY\` (opcional).
   - \`LLM_PROVIDER\` (local / openai / anthropic) [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL].
2. CreaciÃ³n automÃ¡tica con \`pathlib\` de todas las carpetas necesarias (\`data/parquet/\`, \`logs/\`, \`exports/\`).
3. GeneraciÃ³n de un archivo \`.env.example\` auto-documentado.

Requisitos de \`logger.py\`:
1. Configurar \`logging\` estÃ¡ndar con \`RotatingFileHandler\` (mÃ¡ximo 5MB por archivo, 3 copias de respaldo) guardando en \`logs/kairos_app.log\`.
2. Formato: \`[%(asctime)s] [%(levelname)s] [%(name)s]: %(message)s\`.
3. FunciÃ³n auxiliar para enmascarar automÃ¡ticamente cualquier clave o token de seguridad antes de escribir en el log.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 6 â€” PRUEBAS Y EMPAQUETADO
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={FlaskConical}
          label="Capa 6"
          color={C.red}
          title="Pruebas y empaquetado"
          desc="7 suites de tests con Pytest: esquemas Pydantic, indicadores tÃ©cnicos, calidad de datos, sentimiento con respuestas ambiguas, simulaciÃ³n sin look-ahead bias, informes con trazabilidad, test E2E completo y checklist de verificaciÃ³n en mÃ¡quina limpia."
        />

        <Step 
          num="6.1" 
          title="Tests unitarios de modelos e indicadores" 
          goal="test_analytics.py + test_schemas.py: Pydantic rechaza precios negativos y high < low; SMA calculada contra vector con resultado conocido; RSI en series extremas (100/0/plana); score de sentimiento fuera de [-1,1] lanza error. Fixtures en conftest.py con datos sintÃ©ticos deterministas."
        >
          <PromptBlock label="Prompt 6.1 â€” Tests de esquemas e indicadores">
{`Escribe la suite de pruebas unitarias \`tests/test_analytics.py\` y \`tests/test_schemas.py\` para KairÃ³s Sentimiento con \`pytest\`.

Tests a implementar:
1. \`test_price_ohlcv_validation_rules()\`: prueba que Pydantic rechace precios negativos, \`high < low\` o fechas futuras.
2. \`test_sma_calculation_accuracy()\`: comprueba el cÃ¡lculo de medias mÃ³viles contra un vector de precios con resultados conocidos a mano.
3. \`test_rsi_edge_cases()\`: verifica el comportamiento del RSI en series con subidas continuas (RSI=100), caÃ­das continuas (RSI=0) y series planas.
4. \`test_sentiment_score_boundaries()\`: asegura que cualquier score fuera del rango [-1.0, 1.0] lance error de validaciÃ³n.

Utiliza fixtures de \`pytest\` en \`conftest.py\` con datos sintÃ©ticos deterministas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Tests de calidad de datos y detecciÃ³n de duplicados" 
          goal="test_data_pipeline.py: inserciÃ³n de precios duplicados es idempotente en DuckDB; normalizador detecta huecos anormales en dÃ­as laborables; guardrails devuelve False con motivo exacto cuando el LLM inventa una cifra no presente en el documento original."
        >
          <PromptBlock label="Prompt 6.2 â€” Tests de calidad de datos">
{`Escribe la suite \`tests/test_data_pipeline.py\` para KairÃ³s Sentimiento.

Tests a implementar:
1. \`test_deduplicate_prices()\`: prueba que la inserciÃ³n de registros duplicados con el mismo ticker y timestamp sea idempotente y no corrompa DuckDB.
2. \`test_missing_dates_detection()\`: valida que el normalizador identifique correctamente huecos anormales en dÃ­as laborables de mercado.
3. \`test_guardrails_hallucination_detection()\`: simula una respuesta de LLM con una cifra econÃ³mica inventada y verifica que \`verify_analysis_integrity\` retorne \`False\` con el motivo exacto.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Tests de sentimiento y manejo de respuestas ambiguas" 
          goal="test_sentiment.py: JSON limpio, JSON con etiquetas markdown residuales, timeout de red activa el modo offline sin interrumpir el flujo, documento sin contenido de texto lanza excepciÃ³n controlada."
        >
          <PromptBlock label="Prompt 6.3 â€” Tests de sentimiento">
{`Escribe la suite \`tests/test_sentiment.py\` para KairÃ³s Sentimiento.

Tests a implementar:
1. \`test_parse_valid_llm_json()\`: comprueba la extracciÃ³n correcta de un JSON limpio.
2. \`test_parse_json_with_surrounding_markdown()\`: prueba la extracciÃ³n cuando el LLM incluye etiquetas \`\`\`json ... \`\`\` y comentarios previos.
3. \`test_fallback_on_api_timeout()\`: simula un timeout de red y verifica que el gestor active el modo de anÃ¡lisis offline sin interrumpir el flujo.
4. \`test_empty_news_document()\`: comprueba que un documento sin contenido de texto sea rechazado con una excepciÃ³n controlada.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Tests de simulaciÃ³n de estrategias e informes" 
          goal="test_simulator.py + test_reports.py: seÃ±ales del dÃ­a T solo usan datos hasta T (no look-ahead bias); modificar reglas de estrategia genera nueva versiÃ³n en SQLite; informe contiene todos los bloques requeridos con hash de auditorÃ­a."
        >
          <PromptBlock label="Prompt 6.4 â€” Tests de simulaciÃ³n e informes">
{`Escribe la suite \`tests/test_simulator.py\` y \`tests/test_reports.py\` para KairÃ³s Sentimiento.

Tests a implementar:
1. \`test_no_look_ahead_bias()\`: verifica rigurosamente que las seÃ±ales del dÃ­a T solo utilicen datos e indicadores calculados hasta el dÃ­a T.
2. \`test_strategy_versioning()\`: comprueba que al modificar las reglas de una estrategia se genere un nuevo identificador de versiÃ³n en SQLite.
3. \`test_report_generation_traceability()\`: genera un informe con \`report_generator.py\` y valida que contenga todos los bloques requeridos (metadatos, tablas, fuentes, disclaimer legal y hash de auditorÃ­a).`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Test de flujo completo (End-to-End)" 
          goal="test_full_workflow.py: DuckDB + SQLite en memoria, dataset DEMO, normalizaciÃ³n + almacenamiento + indicadores + sentimiento con mock determinista del LLM + simulaciÃ³n cruce de medias con filtro de sentimiento + informe Markdown con mÃ©tricas esperadas."
        >
          <PromptBlock label="Prompt 6.5 â€” Test E2E completo">
{`Escribe el test de integraciÃ³n E2E \`tests/test_full_workflow.py\` para KairÃ³s Sentimiento.

El test debe:
1. Inicializar una base de datos DuckDB y SQLite en memoria (\`:memory:\`).
2. Cargar el dataset de demostraciÃ³n \`generate_demo_dataset.py\`.
3. Ejecutar la normalizaciÃ³n y almacenamiento.
4. Calcular todos los indicadores tÃ©cnicos y ratios fundamentales.
5. Procesar el sentimiento de las noticias de prueba con un mock determinista del LLM.
6. Ejecutar una simulaciÃ³n de estrategia basada en cruce de medias y filtro de sentimiento positivo.
7. Generar el informe final en Markdown y comprobar que el archivo resultante no estÃ© vacÃ­o y contenga las mÃ©tricas esperadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.6" 
          title="Empaquetado con PyInstaller" 
          goal="kairos_sentimiento.spec: rutas de datos (templates, data/demo/), hiddenimports, exclusiones. Comando pyinstaller --clean. Problemas conocidos con DLLs de DuckDB y assets de Flet al empaquetar. El .env con claves reales NUNCA se incrusta en el binario."
        >
          <PromptBlock label="Prompt 6.6 â€” Empaquetado .exe">
{`Prepara el proceso de empaquetado de KairÃ³s Sentimiento con PyInstaller.

Requisitos del empaquetado:
- Punto de entrada: \`main.py\`.
- Framework visual: Flet.
- Dependencias clave: duckdb, pydantic, pandas, httpx, python-dotenv.
- Archivos de datos incluidos: templates de reporte, dataset demo (\`data/demo/\`).
- ExclusiÃ³n de seguridad: el archivo \`.env\` con claves reales NUNCA debe incrustarse en el binario.

Escribe:
1. El archivo de especificaciÃ³n \`kairos_sentimiento.spec\` con todas las rutas de datos (\`datas\`), importaciones ocultas (\`hiddenimports\`) y exclusiones configuradas correctamente.
2. El comando exacto de compilaciÃ³n:
   \`pyinstaller --clean kairos_sentimiento.spec\`
3. Instrucciones detalladas para resolver problemas comunes con las DLLs de DuckDB y los assets de Flet al empaquetar.
   [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL DE FLET Y PYINSTALLER]`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.7" 
          title="Protocolo de prueba en mÃ¡quina limpia" 
          goal="Checklist en mÃ¡quina sin Python: arranque < 5s sin ventana de consola, carpetas locales creadas, dataset DEMO cargable sin internet, grÃ¡ficos correctos, backstage sin errores, exportaciÃ³n de informe Markdown/HTML, modo offline ante pÃ©rdida de red, log en ruta esperada sin exponer claves."
        >
          <PromptBlock label="Prompt 6.7 â€” VerificaciÃ³n en mÃ¡quina limpia">
{`Genera un protocolo de control de calidad (Checklist en Markdown) para probar el ejecutable de KairÃ³s Sentimiento en una mÃ¡quina limpia (o mÃ¡quina virtual reciÃ©n formateada sin Python).

Puntos de verificaciÃ³n obligatorios:
1. **Arranque inicial**:
   - Â¿Abre la ventana de la aplicaciÃ³n en menos de 5 segundos sin ventanas de consola residuales?
   - Â¿Se crean correctamente las carpetas locales en el directorio del usuario?
2. **Carga y demostraciÃ³n**:
   - Â¿Se puede cargar y visualizar el dataset DEMO sin conexiÃ³n a internet?
   - Â¿Se dibujan correctamente los grÃ¡ficos interactivos de precios y tablas de fundamentales?
3. **Flujo de estrategia e informes**:
   - Â¿Se puede definir y simular una estrategia en el backstage sin errores?
   - Â¿El botÃ³n de exportaciÃ³n genera el archivo de informe Markdown/HTML en la carpeta seleccionada?
4. **Resiliencia y seguridad**:
   - Â¿Muestra el aviso de modo offline sin cerrarse si se desconecta el cable de red?
   - Â¿Se escribe el archivo de log en la ruta esperada sin exponer informaciÃ³n confidencial?`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 â€” ITERACIÃ“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={RefreshCw}
          label="Fase 7"
          color={C.amber}
          title="IteraciÃ³n y publicaciÃ³n"
          desc="Planificar KairÃ³s v2 con conectores profesionales adicionales, backtesting multiactivo y alertas de divergencia, y publicar la ficha tÃ©cnica en el Foro de Proyectos Horizon."
        />

        <Step 
          num="7.A" 
          title="Roadmap de evoluciÃ³n (v2)" 
          goal="Tabla del backlog v2 con columnas: capa afectada, complejidad tÃ©cnica, impacto analÃ­tico y prioridad. Evaluar: conectores a fuentes profesionales, simulador multiactivo con rebalanceo, mapas de calor correlaciÃ³n sentimiento Ã— rendimiento, alertas de divergencia fundamentales/cotizaciÃ³n y publicaciÃ³n de informes en la red Horizon. Reiterar exclusiones permanentes."
        >
          <PromptBlock label="Prompt 7.A â€” Backlog v2">
{`KairÃ³s Sentimiento v1 estÃ¡ completado y verificado. Ahora planificamos las mejoras para la versiÃ³n 2.

Posibles extensiones a evaluar:
- Conectores a bases de datos financieras profesionales e institucionales [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL].
- Simulador de carteras multiactivo con rebalanceo periÃ³dico.
- Visualizaciones avanzadas (mapas de calor de correlaciÃ³n entre sentimiento y rendimiento).
- Alertas de divergencia entre fundamentales y cotizaciÃ³n de mercado.
- PublicaciÃ³n y versionado de informes de investigaciÃ³n dentro de la red Horizon.

Genera la tabla del backlog de la v2 clasificando cada mejora por:
- Capa afectada (1 a 6).
- Complejidad tÃ©cnica (Alta, Media, Baja).
- Impacto analÃ­tico para el investigador.
- Prioridad recomendada.

Reitera explÃ­citamente quÃ© funciones continÃºan fuera de alcance (ejecuciÃ³n directa de Ã³rdenes y custodia de fondos).`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos Horizon" 
          goal="Ficha tÃ©cnica con: tÃ­tulo 'KairÃ³s Sentimiento v1 â€” Plataforma de InvestigaciÃ³n Financiera, Datos y Backstage de Estrategias', stack (Python, Flet, Pydantic v2, DuckDB, Parquet, SQLite, Pandas, LLM/NLP), diferenciadores (separaciÃ³n epistemolÃ³gica estricta, trazabilidad auditable, modo offline), descargo legal formal y pregunta sobre metodologÃ­as para mitigar el ruido en el sentimiento financiero."
        >
          <PromptBlock label="Prompt 7.B â€” PublicaciÃ³n en el Foro">
{`Prepara la ficha tÃ©cnica de presentaciÃ³n de KairÃ³s Sentimiento para su publicaciÃ³n en el Foro de Proyectos de Horizon.

Estructura de la ficha:
1. **TÃ­tulo del Proyecto**: \`KairÃ³s Sentimiento v1 â€” Plataforma de InvestigaciÃ³n Financiera, Datos y Backstage de Estrategias\`.
2. **Ãrea**: Finanzas Cuantitativas & AnÃ¡lisis de Mercado.
3. **PropÃ³sito**: dotar al analista e investigador de un entorno unificado, trazable y reproducible que conecta fundamentales, series de precios y sentimiento textual con un backstage de simulaciÃ³n de hipÃ³tesis.
4. **Stack TecnolÃ³gico**: Python, Flet, Pydantic v2, DuckDB, Parquet, SQLite, Pandas, LLM/NLP.
5. **Diferenciadores Clave**: separaciÃ³n estricta entre datos observados, cÃ¡lculos e inferencias de IA; trazabilidad auditable en cada reporte; operaciÃ³n completa en modo local/offline con dataset DEMO integrado.
6. **Descargo Legal**: aviso formal de ausencia de asesoramiento financiero.
7. **Pregunta para la Comunidad**: plantear un debate tÃ©cnico sobre metodologÃ­as para mitigar el ruido en el anÃ¡lisis de sentimiento de noticias financieras.`}
          </PromptBlock>
        </Step>

        {/* â”€â”€â”€ Resultado esperado â”€â”€â”€ */}
        <div className="mt-12 rounded-2xl p-6 border"
          style={{ background: "rgba(5,150,105,0.04)", borderColor: "rgba(5,150,105,0.18)" }}>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={16} style={{ color: C.emerald }} />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.emerald }}>Resultado esperado</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Al completar los 30+ prompts de esta ruta (Fase 0 + Capas 1â€“6 + Fase 7), tendrÃ¡s un <strong>ejecutable de KairÃ³s Sentimiento</strong>: descarga y almacena series de precios y fundamentales de forma idempotente, analiza el sentimiento de fuentes textuales con guardrails antialucinaciÃ³n, permite diseÃ±ar y simular estrategias cuantitativas en un backstage dedicado sin ejecutar Ã³rdenes, y exporta informes analÃ­ticos reproducibles y auditables con trazabilidad completa de fuentes, timestamps y versiones de modelos.
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

        {/* â”€â”€â”€ Version extensions â”€â”€â”€ */}
        <VersionExtensions versions={VERSIONS} />

      </div>
    </div>
  );
}

