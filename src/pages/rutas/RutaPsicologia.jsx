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
import { Brain } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Eye } from "lucide-react";

import {
  C, PromptBlock, Step, PhaseHeader, BackLink,
  HumanValidationWarning, VersionExtensions,
} from "./shared.jsx";

// —€—€—€ Tools table —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "Investigación", herramienta: "Laboratorio Psicología (data_psychology/rankings/) · ToMBench · SocialIQa · BIG-Bench Social · EmoBench · OpenToM", motivo: "Verificar qué modelos tienen mejor performance en razonamiento social antes de elegir el motor de Psique Lab." },
  { capa: "1", subcapa: "1.1–1.6", herramienta: "Documento de definición", motivo: "Definir qué tipos de análisis psicológico cubre la v1 y las advertencias de interpretación necesarias en cada resultado." },
  { capa: "2", subcapa: "2.1", herramienta: "data_psychology/raw/ · SocialIQa Hugging Face [VERIFICAR EN DOCUMENTACI“N OFICIAL]", motivo: "Escenarios de razonamiento social ya descargados por el motor Horizon más fuente alternativa pública." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas estrictos para PsychScenario, BiasFlag, ModelResponse y PsychEvaluation con validadores de dominio." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators", motivo: "Validar formato de escenario (mínimo 30 palabras), presencia de contexto social y rango de opciones." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial auditable con vistas vw_model_social_iq y vw_bias_distribution para estadísticas por modelo." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON manual (15 escenarios)", motivo: "5 ToM + 5 SocialIQa + 5 de sesgo cognitivo para desarrollo completamente offline." },
  { capa: "3", subcapa: "3.1", herramienta: "data_psychology/rankings/", motivo: "Seleccionar modelo con mejor score verificado en SocialIQa y ToMBench, con capacidad de razonamiento de perspectiva." },
  { capa: "3", subcapa: "3.2", herramienta: "Chain of Thought social (perspectiva de actores)", motivo: "El prompt fuerza al modelo a identificar estados mentales de cada actor antes de responder." },
  { capa: "3", subcapa: "3.3", herramienta: "httpx · openai SDK [VERIFICAR EN DOCUMENTACI“N OFICIAL]", motivo: "Llamada async con temperatura 0.3 para razonamiento social con algo de variabilidad detectable." },
  { capa: "3", subcapa: "3.4", herramienta: "Python puro + lista de patrones de sesgo", motivo: "Heurísticas para detectar atribución fundamental, sesgo de confirmación, estereotipos y simplificación moral." },
  { capa: "3", subcapa: "3.5", herramienta: "Comparación directa con ground truth SocialIQa", motivo: "Verificar si el modelo eligió la opción correcta cuando existe respuesta conocida." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Mostrar la respuesta sin análisis de sesgos si ese módulo falla; interpretation_warning NUNCA se suprime." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir 3 pantallas (Evaluación, Estadísticas, Historial) antes de codificar." },
  { capa: "4", subcapa: "4.2–4.5", herramienta: "Flet", motivo: "Escenarios y respuestas son texto narrativo largo; Flet gestiona scroll y tarjetas de sesgo más naturalmente que Tkinter." },
  { capa: "5", subcapa: "5.1–5.5", herramienta: "Flet · DuckDB · python-dotenv", motivo: "Pipeline completo con INTERPRETATION_WARNING hardcodeada para que no pueda desactivarse." },
  { capa: "6", subcapa: "6.1–6.2", herramienta: "Pytest", motivo: "Tests de extracción de opción elegida, detección de sesgos heurística y test de integración del pipeline completo." },
  { capa: "6", subcapa: "6.3", herramienta: "Escenarios del laboratorio de Psicología", motivo: "Validación manual con 7 escenarios psicológicos específicos incluyendo sesgos de género y ToM clásicos." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller · flet build [VERIFICAR EN DOCUMENTACI“N OFICIAL]", motivo: "Ejecutable distribuible; la INTERPRETATION_WARNING debe estar en código, no en .env." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio verificando que la advertencia de interpretación aparece en todas las pantallas." },
  { capa: "Fase 7", subcapa: "Iteración", herramienta: "Foro Horizon", motivo: "Publicar Psique Lab con la advertencia de interpretación prominente y recoger feedback sobre heurísticas de sesgos." },
];

// —€—€—€ Phases overview —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
const PHASES = [
  { id: "0", label: "Fase 0",  name: "Investigación",         summary: "Benchmarks de razonamiento social (ToMBench, SocialIQa, EmoBench) y validez epistemológica de evaluar psicología en LLMs." },
  { id: "1", label: "Capa 1", name: "Definición",             summary: "Perfil de usuario (investigador/docente), tipos de análisis disponibles, inputs/outputs, criterios de éxito y advertencia de interpretación como requisito no negociable." },
  { id: "2", label: "Capa 2", name: "Datos",                  summary: "Carga de SocialIQa y ToMBench, Pydantic (PsychScenario, BiasFlag, ModelResponse, PsychEvaluation), DuckDB con vistas de estadísticas de sesgos y 15 escenarios de ejemplo." },
  { id: "3", label: "Capa 3", name: "Lógica / IA",            summary: "Selección del modelo, Chain of Thought social (perspectiva de actores), parseo de respuesta, detección heurística de 4 tipos de sesgo, comparación con ground truth y fallback seguro." },
  { id: "4", label: "Capa 4", name: "Interfaz (Flet)",        summary: "3 pantallas: Evaluación (tarjetas de sesgo, badge correcto/incorrecto, advertencia permanente), Estadísticas (accuracy y distribución de sesgos por modelo) e Historial." },
  { id: "5", label: "Capa 5", name: "Integración",            summary: "Pipeline completo, interpretation_warning hardcodeada en código (no configurable), log sin texto de escenarios y configuración de tipos de análisis y umbrales." },
  { id: "6", label: "Capa 6", name: "Pruebas y empaquetado",  summary: "Tests de extracción de opción y detección de sesgos, integración completa con mock, prueba manual con 7 escenarios y empaquetado con advertencia indesactivable." },
  { id: "7", label: "Fase 7", name: "Iteración",              summary: "Publicar en el Foro con advertencia de interpretación prominente y planificar v2 con comparativa de 3 modelos y análisis batch." },
];

// —€—€—€ Version extensions —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
const VERSIONS = [
  {
    tag: "v2 · Arena de modelos",
    area: "Comparativa de razonamiento social",
    title: "Psique Arena — 3 modelos ante el mismo escenario",
    desc: "Envía el mismo escenario psicológico a 3 modelos en paralelo, muestra sus razonamientos en columnas y compara los patrones de sesgo detectados en cada uno. Especialmente útil para ver si el sesgo de atribución fundamental es consistente entre modelos o específico de uno.",
    badgeBg: "rgba(124,58,237,0.10)", badgeColor: "#7C3AED",
    changes: [
      "Capa 1: el usuario configura 3 API keys o selecciona 3 modelos del mismo proveedor",
      "Capa 3: evaluate_parallel(): asyncio.gather con 3 llamadas; fallo individual no cancela las otras",
      "Capa 3: compare_reasoning_patterns(): tabla comparativa de sesgos detectados en cada modelo",
      "Capa 4: pantalla Arena con 3 columnas side-by-side de respuesta + tarjetas de sesgo",
      "Capa 4: banner 'Más sesgos detectados en: [MODELO]' con caveat de interpretación",
      "Capa 5: store_arena_evaluation() guarda las 3 respuestas con un session_id común",
    ],
  },
  {
    tag: "v3 · Análisis batch",
    area: "Estadísticas robustas",
    title: "Psique Batch — Dataset completo de SocialIQa en un análisis",
    desc: "Evalúa un conjunto de 50–200 escenarios SocialIQa de forma automática para obtener estadísticas robustas de accuracy por categoría, distribución de sesgos frecuentes y comparativa de modelos con tamaño de muestra significativo.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 1: nueva acción 'Análisis batch'; el usuario elige subconjunto de SocialIQa y número de escenarios",
      "Capa 3: evaluate_batch(): asyncio.gather con semáforo (máx 5 llamadas simultáneas)",
      "Capa 3: estimación de tiempo y coste antes de ejecutar (N escenarios — tiempo medio por escenario)",
      "Capa 4: pantalla de progreso con barra y ETA; cancelable en cualquier momento",
      "Capa 4: informe de resultados batch: accuracy por analysis_type, top-5 sesgos más frecuentes",
      "Advertencia adicional: con n > 50, los patrones de sesgo son más robustos pero sigue siendo heurístico",
    ],
  },
  {
    tag: "v4 · Sesgos adicionales",
    area: "Heurísticas extendidas",
    title: "Psique Plus — Detección de sesgo de disponibilidad y anclaje",
    desc: "Amplía el catálogo de sesgos detectables en v1 (atribución fundamental, confirmación, estereotipos, simplificación moral) con dos nuevos: el sesgo de disponibilidad (el modelo sobrepesa casos extremos o recientes) y el efecto de anclaje (la primera información presentada domina el razonamiento).",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 3: nueva heurística de disponibilidad: el modelo menciona casos extremos o noticias recientes sin base en el escenario",
      "Capa 3: nueva heurística de anclaje: el primer dato numérico o categoría del escenario aparece sin cuestionarse en la respuesta",
      "Capa 3: BIAS_TYPES en config.py ampliado de 4 a 6 entradas",
      "Capa 4: las nuevas tarjetas de sesgo tienen el mismo diseño; solo cambia bias_name",
      "Capa 6: dataset de ejemplo ampliado con 4 escenarios nuevos (2 por sesgo adicional)",
      "Advertencia: las nuevas heurísticas son más experimentales que las v1; confidence máximo BAJO",
    ],
  },
];

// —€—€—€ Interpretation notice —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
function InterpretationNotice() {
  return (
    <div className="mb-8 rounded-xl border overflow-hidden"
      style={{ borderColor: "rgba(124,58,237,0.22)" }}>
      <div className="flex items-center gap-2 px-5 py-3"
        style={{ background: "rgba(124,58,237,0.07)" }}>
        <Eye size={15} style={{ color: "#7C3AED" }} className="shrink-0" />
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#7C3AED" }}>
          Advertencia de interpretación — Lectura obligatoria
        </span>
      </div>
      <div className="px-5 py-4" style={{ background: "rgba(124,58,237,0.03)" }}>
        <ul className="space-y-2 text-[13px] leading-relaxed" style={{ color: "rgba(17,17,17,0.70)" }}>
          <li className="flex items-start gap-2">
            <span style={{ color: "#7C3AED" }} className="shrink-0 font-bold">â†’</span>
            <span>Los análisis de Psique Lab miden el <strong>comportamiento del LLM en este escenario específico</strong>. No reflejan capacidades cognitivas generales ni comportamiento humano real.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: "#7C3AED" }} className="shrink-0 font-bold">â†’</span>
            <span>La detección de sesgos es <strong>heurística automática</strong>, no metodología psicológica formal. Cada flag indica un posible patrón; siempre requiere verificación humana.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: "#7C3AED" }} className="shrink-0 font-bold">â†’</span>
            <span>Un LLM que acierta en SocialIQa <strong>no "comprende" socialmente</strong>: puede estar reproduciendo patrones estadísticos. Esta distinción debe comunicarse al usuario en cada resultado.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: "#7C3AED" }} className="shrink-0 font-bold">â†’</span>
            <span>Psique Lab <strong>no puede usarse para diagnosticar comportamiento humano</strong> ni para procesos de selección de personal. La advertencia debe ser visible e indesactivable en el ejecutable.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// —€—€—€ Main component —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
export default function RutaPsicologia() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <BackLink />

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5"
            style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED" }}>
            Psicología & Creatividad · Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Psique Lab
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que evalúa el razonamiento social y empático de los LLMs: el usuario introduce escenarios de Teoría de la Mente o dilemas sociales, obtiene la respuesta del modelo con análisis de sesgos cognitivos detectados heurísticamente, y guarda un historial comparativo de razonamiento por modelo.
          </p>
          <div className="flex flex-wrap gap-6">
            {[["7", "Fases"], ["6", "Capas"], ["30+", "Prompts"], ["App .exe", "Resultado"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl" style={{ color: C.dark }}>{v}</div>
                <div className="text-[11px] uppercase tracking-wide" style={{ color: "rgba(17,17,17,0.35)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interpretation notice */}
        <InterpretationNotice />

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
                      <td className="px-4 py-2.5 font-medium" style={{ color: "#7C3AED", whiteSpace: "nowrap" }}>{row.capa}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", whiteSpace: "nowrap" }}>{row.subcapa}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: C.dark }}>{row.herramienta}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", maxWidth: 320 }}>{row.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(17,17,17,0.06)", background: "rgba(124,58,237,0.03)" }}>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(17,17,17,0.50)" }}>
                  <strong>¿Por qué Flet y no PyQt o Tkinter?</strong> Los escenarios psicológicos son texto narrativo largo y las respuestas del LLM también. Flet gestiona áreas de texto scrollable y tarjetas de badges de sesgo de forma más natural que Tkinter, sin la complejidad de configuración de PyQt para una app de este alcance.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 0 — INVESTIGACI“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Search}
          label="Fase 0"
          color={C.accent}
          title="Investigación"
          desc="Verificar qué benchmarks evalúan razonamiento social y Teoría de la Mente, qué miden realmente, cuál es el modelo líder en el laboratorio y qué advertencias epistemológicas debe incluir la app antes de implementar nada."
        />

        <Step 
          num="0.A" 
          title="Benchmarks de psicología y teoría de la mente" 
          goal="Identificar ToMBench, SocialIQa, BIG-Bench Social, EmoBench y OpenToM; qué habilidades evalúan (perspectiva de terceros, estados mentales, predicción de comportamiento); modelo líder en el ranking del laboratorio; sesgos sistemáticos conocidos en LLMs para razonamiento social."
        >
          <PromptBlock label="Prompt 0.A — Benchmarks de razonamiento social">
{`Actúa como especialista en evaluación de LLMs para tareas de razonamiento social y psicología cognitiva.
Tengo acceso al Laboratorio de Psicología de Horizon (\`data_psychology/rankings/\`).

Respóndeme:
1. ¿Qué benchmarks evalúan razonamiento social y Teoría de la Mente en LLMs? (ToMBench, SocialIQa, BIG-Bench Social, EmoBench, OpenToM, HiToM)
2. ¿Qué habilidades específicas evalúan? (perspectiva de terceros, comprensión de estados mentales, predicción de comportamiento, razonamiento emocional)
3. ¿Cuál es el modelo con mejor score en SocialIQa/ToMBench según \`data_psychology/rankings/latest_rankings_psychology.json\`?
4. ¿Hay evidencia de sesgos sistemáticos conocidos en LLMs para razonamiento social? (sesgo de atribución fundamental, sesgo de confirmación de expectativas, etc.)

Cita scores específicos. No inventes datos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="0.B" 
          title="Validez de evaluar razonamiento psicológico con LLMs" 
          goal="Entender las limitaciones epistemológicas antes de construir: ¿los benchmarks de ToM miden 'comprensión' social o patrones estadísticos? ¿Es fiable la detección heurística de sesgos? ¿Qué advertencias de interpretación son obligatorias? Esta investigación determina el diseño de los avisos de la app."
        >
          <PromptBlock label="Prompt 0.B — Validez epistemológica">
{`Psique Lab evaluará el razonamiento social de LLMs usando benchmarks psicológicos.

Antes de construirlo, necesito entender las limitaciones epistemológicas:
1. ¿Los benchmarks de Teoría de la Mente para LLMs realmente miden "comprensión" social o solo patrones de respuesta estadística? ¿Qué dice la literatura reciente sobre esto? [VERIFICAR EN FUENTES ACADÃ‰MICAS]
2. ¿Es posible detectar "sesgos" de razonamiento social en LLMs de forma fiable con heurísticas simples, o requiere metodología psicológica formal?
3. ¿Qué advertencias debería incluir la app sobre la interpretación de los resultados? (Los resultados miden el comportamiento del modelo en el benchmark, no la "psicología" del modelo)

Esta información determinará el tono de los análisis y las advertencias de la app.`}
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
          desc="Quién usa Psique Lab, qué mide exactamente (rendimiento en benchmark vs. calidad del razonamiento), qué entra, qué sale y cómo comunicar los límites de interpretación sin engañar al usuario."
        />

        <Step 
          num="1.1" 
          title="¿Quién usa esta app?" 
          goal="Ficha con rol (investigador de IA, psicólogo investigador, docente universitario), qué hace sin la app, tipos de escenarios que le interesan (ToM clásicos, dilemas morales, sesgos cognitivos), nivel técnico y cuántos escenarios evalúa por sesión."
        >
          <PromptBlock label="Prompt 1.1 — Perfil de usuario">
{`Define el perfil de usuario de Psique Lab.

La app evalúa el razonamiento social de LLMs con escenarios de Teoría de la Mente y SocialIQa.

[DESCRIBE AQUÍ TU USUARIO OBJETIVO: ej. "investigador de IA que estudia el razonamiento social emergente en LLMs" o "psicólogo investigador que quiere comparar respuestas de LLMs con respuestas humanas en dilemas sociales" o "profesor universitario que usa LLMs en clases de psicología cognitiva y quiere evaluar su fiabilidad"]

Genera la ficha con:
- Nombre ficticio y rol (investigador, docente, developer de IA)
- Qué hace actualmente sin la app (prueba LLMs manualmente, revisa papers)
- Qué tipos de escenarios le interesan más (ToM clásicos, dilemas morales, situaciones de comunicación, escenarios de sesgo cognitivo)
- Nivel técnico (¿conoce benchmarks de IA? ¿usa Python? ¿solo web?)
- Cuántos escenarios evalúa por sesión (5, 50, 200)
- Qué métricas le importan: ¿tasa de aciertos en SocialIQa? ¿detección de sesgos?`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.2" 
          title="¿Qué problema concreto resuelve?" 
          goal="Una sola frase en formato [ROL] no puede [TAREA] porque [OBSTÁCULO]. Aclarar si la app mide RENDIMIENTO (comparar con ground truth) o CALIDAD DEL RAZONAMIENTO (detectar sesgos), y qué implica para el diseño que los resultados no midan 'psicología real' del modelo."
        >
          <PromptBlock label="Prompt 1.2 — Frase del problema">
{`Basándome en el perfil ([PEGA EL RESUMEN DEL PERFIL]), escribe UNA SOLA FRASE del problema que Psique Lab resuelve.

Formato: "[ROL] no puede [TAREA] porque [OBSTÁCULO], lo que provoca [CONSECUENCIA]."

Genera 3 variantes. Para la elegida, aclara:
- ¿La app mide el RENDIMIENTO del LLM (comparar con ground truth SocialIQa) o analiza la CALIDAD del RAZONAMIENTO (detectar sesgos en cómo piensa)? ¿O ambas cosas?
- ¿Qué implicaciones tiene para el diseño que los resultados NO miden la "psicología real" del modelo sino su comportamiento en el benchmark? ¿Cómo comunicar esto al usuario?

Define la posición de la app en una frase que aparecerá en la pantalla de inicio.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.3" 
          title="¿Qué datos entran?" 
          goal="Lista completa: escenario libre o cargado del dataset, tipo de análisis (ToM, dilema moral, razonamiento empático, detección de sesgo), ground truth opcional, modelo a evaluar. Tipo, restricciones y valor por defecto de cada campo."
        >
          <PromptBlock label="Prompt 1.3 — Inputs de la app">
{`Para Psique Lab, define todos los datos de entrada.

El usuario puede:
- Seleccionar un escenario del dataset (SocialIQa, ToMBench locales)
- Escribir un escenario psicológico propio en texto libre
- Elegir el tipo de análisis:
  [DECIDE LOS TIPOS: ej. "Teoría de la Mente (estados mentales de 3ª persona)", "Dilema moral (razonamiento deontológico vs utilitario)", "Razonamiento empático (perspectiva emocional de los actores)", "Detección de sesgo cognitivo"]
- Indicar si hay una respuesta considerada correcta (ground truth del benchmark)
- Seleccionar el modelo LLM a evaluar

Genera la lista completa de inputs con tipo, restricciones y valor por defecto.

Define también si el escenario puede tener múltiples opciones de respuesta (tipo SocialIQa: A/B/C) o es de respuesta libre.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.4" 
          title="¿Qué sale?" 
          goal="Outputs: respuesta completa del LLM, resultado correcto/incorrecto/N-A, sesgos detectados con nivel de confianza, resumen del patrón de razonamiento, advertencia de interpretación obligatoria y score de la sesión si se evalúan múltiples escenarios."
        >
          <PromptBlock label="Prompt 1.4 — Outputs de la evaluación">
{`Define todos los outputs de Psique Lab para cada evaluación.

La app debe producir:
1. La respuesta completa del LLM al escenario (texto libre o elección de opción)
2. Resultado de comparación con ground truth (si existe): Correcto / Incorrecto / N/A
3. Análisis de sesgos detectados en el razonamiento:
   - Lista de sesgos identificados (cada uno con nombre y descripción de 50 palabras)
   - Nivel de confianza de la detección: ALTO / MEDIO / BAJO
4. Resumen del patrón de razonamiento: ¿el modelo razona desde perspectiva del actor? ¿Hace atribuciones internas o externas?
5. Advertencia de interpretación: "Estos resultados reflejan el comportamiento del modelo en este escenario específico, no sus 'capacidades cognitivas' generales"
6. Score de la sesión: % de respuestas correctas si se evalúan múltiples escenarios

Para cada output: formato, cuándo se genera, si se guarda en DuckDB.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.5" 
          title="Criterios de éxito" 
          goal="6–8 criterios verificables incluyendo: parseo de opción elegida â‰¥90% en SocialIQa, detección de atribución fundamental â‰¥70% en escenarios que la presentan, advertencia de interpretación visible en TODOS los resultados sin excepción y comparativa de 2 modelos en pantalla de estadísticas."
        >
          <PromptBlock label="Prompt 1.5 — Criterios de éxito">
{`Define los criterios de éxito de Psique Lab v1.

El dominio psicológico requiere especial cuidado en no sobreinterpretar resultados.

Genera 6-8 criterios verificables. Incluye obligatoriamente:
- Parseo de respuesta (ej. "extrae correctamente la opción elegida en >= 90% de respuestas tipo SocialIQa con formato A/B/C")
- Detección de sesgos (ej. "detecta correctamente el sesgo de atribución fundamental en los escenarios del dataset de ejemplo que lo presentan, en >= 70% de los casos")
- Advertencia de interpretación (ej. "la advertencia de interpretación es visible en TODOS los resultados sin excepción")
- Persistencia (ej. "el historial de evaluaciones persiste entre sesiones")
- Comparación de modelos (ej. "el usuario puede evaluar el mismo escenario con 2 modelos y ver los resultados en la pantalla de estadísticas")

Sé honesto: la detección automática de sesgos psicológicos tiene limitaciones; refleja esas limitaciones en los criterios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.6" 
          title="Límites explícitos de la v1" 
          goal="Límites de interpretación (heurística, no metodología psicológica formal; no diagnostica comportamiento humano; no apto para selección de personal) y límites técnicos. La INTERPRETATION_WARNING hardcodeada en código, no configurable, para que no pueda desactivarse."
        >
          <PromptBlock label="Prompt 1.6 — Límites de la v1">
{`Define los límites explícitos de Psique Lab v1.

Límites de interpretación (críticos en el dominio psicológico):
- La detección de sesgos es heurística, no metodología psicológica rigurosa
- Los resultados no miden capacidades cognitivas del modelo sino comportamiento en benchmarks específicos
- La app no debe usarse para diagnosticar comportamiento humano ni para selección de personal

Límites técnicos:
[DECIDE: ej. "solo escenarios en español o inglés", "no analiza audio ni imágenes", "no evalúa más de 50 escenarios en batch en v1"]

Para cada límite: por qué existe, cómo comunicarlo al usuario.

Genera la advertencia de interpretación que aparecerá en cada resultado:
"Los análisis de Psique Lab miden el comportamiento del LLM en este escenario. No infieren sobre la 'psicología' del modelo ni sobre comportamiento humano real."`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 2 — DATOS
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Database}
          label="Capa 2"
          color={C.amber}
          title="Datos"
          desc="Carga de SocialIQa y ToMBench, Pydantic con 4 modelos (PsychScenario, BiasFlag, ModelResponse, PsychEvaluation), DuckDB con vistas de estadísticas de sesgos y 15 escenarios de ejemplo de 3 categorías."
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="load_socialIQa_scenarios() y load_tom_scenarios() desde data_psychology/raw/ con pathlib; create_manual_scenario() para entrada libre sin opciones predefinidas. FileNotFoundError descriptivo. Ambas funciones devuelven lista de PsychScenario."
        >
          <PromptBlock label="Prompt 2.1 — Carga de escenarios">
{`Implementa la carga de escenarios psicológicos para Psique Lab.

Fuente 1 (local): escenarios en \`data_psychology/raw/\`
Formato SocialIQa: [PEGA EL FORMATO REAL O INDICA: context, question, answerA, answerB, answerC, correct (0, 1 o 2 para la respuesta correcta)]
Formato ToMBench: [PEGA EL FORMATO REAL O INDICA]

Escribe:
1. \`load_socialIQa_scenarios(file_path: str, limit: int = 30) -> list[PsychScenario]\`:
   - Carga escenarios SocialIQa con sus respuestas múltiples y ground truth
   - Convierte a lista de \`PsychScenario\`

2. \`load_tom_scenarios(file_path: str, limit: int = 20) -> list[PsychScenario]\`:
   - Carga escenarios de Teoría de la Mente
   - Puede ser un formato diferente a SocialIQa

3. \`create_manual_scenario(context: str, question: str, analysis_type: str) -> PsychScenario\`:
   - Crea un escenario desde la entrada manual del usuario (sin opciones predefinidas)

Usa \`pathlib\`. Maneja \`FileNotFoundError\` descriptivo.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="PsychScenario (context, options, analysis_type, difficulty, source), BiasFlag (bias_name, evidence_in_response, detection_confidence ALTO/MEDIO/BAJO), ModelResponse (chosen_option, is_correct, reasoning_summary, bias_flags, response_time) y PsychEvaluation (con interpretation_warning siempre presente)."
        >
          <PromptBlock label="Prompt 2.2 — Modelos Pydantic">
{`Crea los modelos Pydantic v2 para Psique Lab.

1. \`PsychScenario\`:
   - \`scenario_id\`: str
   - \`context\`: str (descripción de la situación social)
   - \`question\`: Optional[str] (pregunta sobre el escenario)
   - \`options\`: Optional[list[str]] (opciones A/B/C si es tipo test)
   - \`correct_option\`: Optional[int] (índice de la opción correcta, 0-based)
   - \`analysis_type\`: str (teoría de la mente, dilema moral, razonamiento empático)
   - \`source\`: Literal["socialIQa", "tomBench", "manual"]
   - \`difficulty\`: Optional[Literal["easy", "medium", "hard"]]

2. \`BiasFlag\`:
   - \`bias_name\`: str (ej. "Sesgo de atribución fundamental")
   - \`bias_description\`: str (máx 50 palabras)
   - \`evidence_in_response\`: str (fragmento de la respuesta del LLM que evidencia el sesgo)
   - \`detection_confidence\`: Literal["ALTO", "MEDIO", "BAJO"]

3. \`ModelResponse\`:
   - \`scenario_id\`: str
   - \`model_name\`: str
   - \`response_text\`: str (respuesta completa del LLM)
   - \`chosen_option\`: Optional[int] (si era tipo test, qué opción eligió)
   - \`is_correct\`: Optional[bool]
   - \`reasoning_summary\`: str (resumen del patrón de razonamiento detectado)
   - \`bias_flags\`: list[BiasFlag]
   - \`evaluated_at\`: datetime
   - \`response_time_seconds\`: float

4. \`PsychEvaluation\`:
   - \`scenario_id\`: str
   - \`model_response\`: ModelResponse
   - \`interpretation_warning\`: str (siempre presente)

Pydantic v2. Docstrings en todos los modelos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="Validación y detección de patrones de razonamiento" 
          goal="validate_scenario() (mínimo 30 palabras, 2–4 opciones si las tiene, analysis_type válido), extract_chosen_option() (busca 'Opción A', 'B)', texto de la opción) y summarize_reasoning_pattern() (¿menciona perspectiva de terceros? ¿atribuciones internas o externas? 50–100 palabras sin sobreinterpretar)."
        >
          <PromptBlock label="Prompt 2.3 — Validación y patrones">
{`Implementa las funciones de validación y análisis básico para Psique Lab.

1. \`validate_scenario(scenario: PsychScenario) -> tuple[bool, list[str]]\`:
   - Verifica que \`context\` no está vacío (mínimo 30 palabras)
   - Si tiene \`options\`: verifica que hay exactamente 2-4 opciones
   - Si tiene \`correct_option\`: verifica que está dentro del rango de \`options\`
   - Si es manual: verifica que \`analysis_type\` es uno de los tipos disponibles
   - Devuelve \`(True, [])\` o \`(False, ["razón1"...])\`

2. \`extract_chosen_option(response_text: str, options: list[str]) -> Optional[int]\`:
   - Intenta identificar qué opción del test eligió el LLM en su respuesta
   - Busca patrones como "Opción A", "A)", "La respuesta correcta es A", etc.
   - Busca si el texto de la opción aparece explícitamente en la respuesta
   - Devuelve el índice (0-based) de la opción elegida o None si no puede detectarlo

3. \`summarize_reasoning_pattern(response_text: str) -> str\`:
   - Heurísticas simples para resumir el patrón de razonamiento:
   - ¿El modelo menciona perspectiva de terceros? ("él/ella cree", "desde su punto de vista")
   - ¿Hace atribuciones internas (a la personalidad) o externas (a la situación)?
   - Devuelve un string de 50-100 palabras describiendo el patrón observable
   - No interpreta más allá de lo que el texto permite`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="init_psychology_db(), store_evaluation(), get_model_social_stats() usando vw_model_social_iq (accuracy por modelo), get_bias_statistics() usando vw_bias_distribution (sesgos más frecuentes) y get_evaluation_history() con filtro por analysis_type."
        >
          <PromptBlock label="Prompt 2.4 — DuckDB con vistas de sesgos">
{`Crea la capa de persistencia de Psique Lab con DuckDB.

1. \`init_psychology_db(db_path: str) -> duckdb.DuckDBPyConnection\`:
   - Tablas: \`psych_scenarios\`, \`model_responses\`, \`bias_flags\`, \`psych_evaluations\`
   - Vista: \`vw_model_social_iq\` (model_name, total, correct, accuracy_pct, most_common_bias, avg_response_time)
   - Vista: \`vw_bias_distribution\` (model_name, bias_name, count, avg_confidence)

2. \`store_evaluation(conn, evaluation: PsychEvaluation, scenario: PsychScenario) -> str\`:
   - Guarda la evaluación completa (\`response\` + \`bias_flags\`)
   - Devuelve \`evaluation_id\`

3. \`get_model_social_stats(conn, model_name: Optional[str] = None) -> list[dict]\`:
   - Estadísticas de razonamiento social por modelo (usando \`vw_model_social_iq\`)

4. \`get_bias_statistics(conn, model_name: Optional[str] = None) -> list[dict]\`:
   - Distribución de sesgos detectados por modelo (usando \`vw_bias_distribution\`)

5. \`get_evaluation_history(conn, analysis_type: Optional[str] = None, limit: int = 30) -> list[dict]\`:
   - Historial filtrado por tipo de análisis

Maneja excepciones DuckDB.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mínimo de ejemplo" 
          goal="15 escenarios en sample_psych_scenarios.json: 5 ToM (2 False Belief, 2 perspectiva de segundo orden, 1 intención vs. acción) + 5 SocialIQa con opciones A/B/C + 5 de sesgo cognitivo (2 atribución fundamental, 2 sesgo de confirmación, 1 estereotipo sutil). Campo expected_bias para validar la detección."
        >
          <PromptBlock label="Prompt 2.5 — Dataset de ejemplo">
{`Genera el dataset de escenarios psicológicos de ejemplo para Psique Lab.

Archivo \`sample_psych_scenarios.json\` con 15 escenarios:

5 de Teoría de la Mente (ToM):
- 2 escenarios clásicos de "False Belief" (Sally-Anne test adaptado)
- 2 escenarios de perspectiva de segundo orden (lo que X cree que Y cree)
- 1 escenario de intención vs. acción (X hizo A sin querer causar B)

5 de Razonamiento Social (estilo SocialIQa):
- Escenarios de predicción de comportamiento en situaciones sociales
- Con 3 opciones (A/B/C) y respuesta correcta definida

5 de Sesgos Cognitivos (para detectar si el LLM los reproduce):
- 2 escenarios que invitan al sesgo de atribución fundamental
- 2 escenarios con sesgo de confirmación implícito
- 1 escenario con estereotipo de género sutil

Para cada escenario: \`context\`, \`question\`, \`options\` (si aplica), \`correct_option\` (si aplica), \`analysis_type\`, \`expected_bias\` (para validar la detección), \`educational_note\`.

Indica claramente que los escenarios de sesgos son para DETECTAR si el LLM reproduce el sesgo, no para inducirlo en el usuario.

Incluye el código Python para cargar y validar con \`PsychScenario\`.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 — L“GICA / IA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Cpu}
          label="Capa 3"
          color={C.accent}
          title="Lógica / IA"
          desc="Selección del modelo con mejor score en SocialIQa y ToMBench, prompt social con perspectiva de actores, llamada async con temperatura 0.3, detección heurística de 4 tipos de sesgo y fallback con interpretation_warning indesactivable."
        />

        <Step 
          num="3.1" 
          title="Selección del modelo LLM" 
          goal="Modelo #1 en SocialIQa y #1 en ToMBench del ranking; si son distintos, cuál es más relevante para Psique Lab. Confirmar: ¿conoce conceptos como Teoría de la Mente y atribución fundamental? ¿Hay evidencia de que reproduce sesgos específicos? Alternativa open-source."
        >
          <PromptBlock label="Prompt 3.1 — Selección del modelo">
{`Para Psique Lab, necesito el LLM con mejor razonamiento social.

Según \`data_psychology/rankings/latest_rankings_psychology.json\`:
- Modelo #1 en SocialIQa: [MODELO Y SCORE]
- Modelo #1 en ToMBench: [MODELO Y SCORE]

¿Son el mismo modelo? Si no: ¿cuál es más relevante para Psique Lab que evaluará ambos tipos de escenario?

Confirma:
1. ¿El modelo elegido tiene conocimiento de psicología cognitiva y conceptos como "Teoría de la Mente" o "atribución fundamental"? (para que entienda el contexto de los escenarios sin necesidad de definirlos en cada prompt)
2. ¿Hay evidencia de que el modelo reproduce sesgos cognitivos específicos? (cita investigaciones recientes si las hay, sin inventarlas)
3. Alternativa open-source con buen razonamiento social? [VERIFICAR EN DOCUMENTACI“N OFICIAL]

Justifica la elección considerando: score en benchmark + capacidad de razonamiento de perspectiva + disponibilidad de API.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="Diseño del prompt central" 
          goal="System prompt de investigador de psicología cognitiva + user prompt con {{CONTEXTO}}, {{PREGUNTA}}, {{OPCIONES_SI_EXISTEN}}: identificar estados mentales de cada actor, razonar y elegir opción (tipo test) o responder libre, considerar perspectivas alternativas, no reproducir estereotipos. Respuesta en JSON (response_text, chosen_option, actor_mental_states, alternative_perspectives, confidence)."
        >
          <PromptBlock label="Prompt 3.2 — Prompt social central">
{`Diseña el prompt maestro de Psique Lab para análisis de escenarios psicológicos.

El prompt debe:
1. Presentar el escenario al modelo con el contexto completo
2. Si es tipo test: pedir al modelo que razone y elija una opción (A/B/C)
3. Si es respuesta libre: pedir análisis desde la perspectiva de los actores
4. En todos los casos: pedir al modelo que:
   a. Identifique los estados mentales de cada actor del escenario
   b. Explique el razonamiento que lleva a su respuesta
   c. Considere perspectivas alternativas razonables
5. Formato de respuesta: JSON con campos \`response_text\`, \`chosen_option\` (si aplica), \`actor_mental_states\`: dict[actor_name, mental_state_description], \`alternative_perspectives\`: list[str], \`confidence\`: float

System prompt: investigador de psicología cognitiva que analiza comportamiento social.
User prompt: plantilla con \`{{CONTEXTO}}\`, \`{{PREGUNTA}}\`, \`{{OPCIONES_SI_EXISTEN}}\`.

Incluye la instrucción explícita de no reproducir estereotipos de género, cultura o edad al razonar sobre los actores del escenario.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo y parseo" 
          goal="evaluate_social_scenario(): temperatura 0.3, max_tokens 1000, retry 2 intentos, timeout 45s. parse_social_response(): extraer JSON, llamar a extract_chosen_option(), verificar is_correct, llamar a summarize_reasoning_pattern(), construir ModelResponse (sin bias_flags aún). API key desde PSIQUE_LLM_API_KEY."
        >
          <PromptBlock label="Prompt 3.3 — Llamada y parseo">
{`Implementa \`evaluate_social_scenario(scenario: PsychScenario, model_name: str) -> tuple[str, float]\` que:

1. Construye el mensaje con el prompt del paso anterior
2. Temperatura: 0.3 (razonamiento social necesita algo de variabilidad para detectar si el modelo varía ante escenarios similares, pero no demasiada)
3. Max tokens: 1000 (escenarios de ToM pueden requerir razonamientos largos)
4. Llama al modelo con retry 2 intentos, timeout 45s
5. Devuelve \`(raw_response, response_time)\`

Luego implementa \`parse_social_response(raw_response: str, scenario: PsychScenario, model_name: str, response_time: float) -> ModelResponse\` que:
- Extrae el JSON de la respuesta
- Llama a \`extract_chosen_option()\` si el escenario tiene opciones
- Verifica \`is_correct\` si hay \`correct_option\`
- Llama a \`summarize_reasoning_pattern()\` con el \`response_text\`
- Construye el \`ModelResponse\` (sin \`bias_flags\` aún; eso va en el siguiente paso)

API key desde \`PSIQUE_LLM_API_KEY\`. Log con: \`model_name\`, \`scenario_id\`, \`response_time\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Análisis de sesgos heurístico" 
          goal="detect_cognitive_biases(): 4 heurísticas — atribución fundamental (adjetivos de carácter sin factores situacionales), sesgo de confirmación (alternative_perspectives < 2), estereotipo de género (género + atributo estereotipado en mismo contexto), simplificación moral (absolutos sin matización). Confianza máxima MEDIO para heurísticas; NUNCA ALTO."
        >
          <PromptBlock label="Prompt 3.4 — Detección de sesgos">
{`Implementa el sistema de detección de sesgos cognitivos en las respuestas del LLM.

Los sesgos que Psique Lab puede detectar heurísticamente en v1:

1. Sesgo de atribución fundamental: el modelo atribuye el comportamiento a la personalidad del actor (adj. internos: "es agresivo", "es desconsiderado") en lugar de a la situación. Señal: adjetivos de carácter en la explicación sin considerar factores situacionales.

2. Sesgo de confirmación: el modelo elige la opción que confirma la hipótesis más obvia del escenario sin explorar alternativas contraintuitivas. Señal: \`alternative_perspectives\` lista vacía o < 2 elementos.

3. Estereotipo de género: el modelo asigna roles, emociones o motivaciones según el género del actor. Señal: mencionar género + atributo estereotipado en el mismo contexto. [DEFINE UNA LISTA DE PATRONES HEURÍSTICOS BÁSICOS]

4. Simplificación moral: en dilemas morales, el modelo descarta una perspectiva sin considerar su validez. Señal: frases absolutas ("siempre", "nunca", "claramente") sin matización.

Escribe \`detect_cognitive_biases(response: ModelResponse, scenario: PsychScenario) -> list[BiasFlag]\` que aplica estas heurísticas.
Cada flag tiene \`detection_confidence\` BAJO o MEDIO (no ALTO para heurísticas simples).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Comparación con ground truth" 
          goal="compare_with_ground_truth(): si chosen_option es None â†’ is_correct=None con nota 'Opción no extractable'; si ambos disponibles â†’ comparar. calculate_session_accuracy(): total, con ground truth, accuracy_pct y accuracy_by_type para el score de sesión."
        >
          <PromptBlock label="Prompt 3.5 — Ground truth y accuracy">
{`Implementa la comparación de la respuesta del LLM con el ground truth del benchmark.

Escribe \`compare_with_ground_truth(response: ModelResponse, scenario: PsychScenario) -> ModelResponse\` que:

1. Si \`scenario.correct_option is None\`: devuelve \`response\` sin cambios (\`is_correct=None\`)
2. Si \`response.chosen_option is None\` (no se pudo extraer la opción elegida): \`is_correct=None\` con nota "Opción no extractable"
3. Si ambos están disponibles: \`is_correct = (response.chosen_option == scenario.correct_option)\`
4. Devuelve el \`ModelResponse\` actualizado

Escribe también \`calculate_session_accuracy(evaluations: list[PsychEvaluation]) -> dict\`:
- Calcula el porcentaje de respuestas correctas en los escenarios con ground truth
- Separa por \`analysis_type\`
- Devuelve dict con: \`total_evaluated\`, \`total_with_ground_truth\`, \`accuracy_pct\`, \`accuracy_by_type: dict[str, float]\`

Esta función se usa para mostrar el score de la sesión en la pantalla de estadísticas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="Función de fallback" 
          goal="evaluate_scenario_with_fallback(): si API falla â†’ ModelResponse vacío; si parseo falla â†’ guardar raw_response sin bias_flags; si llega a parse â†’ apply detect_cognitive_biases() + compare_with_ground_truth(). PsychEvaluation SIEMPRE contiene interpretation_warning. Devuelve (evaluation, is_model_available)."
        >
          <PromptBlock label="Prompt 3.6 — Fallback seguro">
{`Implementa \`evaluate_scenario_with_fallback(scenario: PsychScenario, model_name: str) -> tuple[PsychEvaluation, bool]\` que:

1. Intenta \`evaluate_social_scenario()\` + \`parse_social_response()\`
2. Si falla por API caída:
   - \`ModelResponse\` con \`response_text="[Evaluación no disponible]"\`, \`chosen_option=None\`, \`is_correct=None\`, \`bias_flags=[]\`, \`reasoning_summary=""\`
3. Si falla el parseo (respuesta no JSON):
   - Guarda la \`raw_response\` en \`response_text\` y marca como "parseo fallido"
   - No intenta detectar sesgos si no hay respuesta estructurada
4. Si llega a \`parse_social_response\`: aplica \`detect_cognitive_biases()\` y \`compare_with_ground_truth()\`
5. Añade \`interpretation_warning\` al \`PsychEvaluation\` (siempre)
6. Devuelve \`(evaluation, is_model_available)\`

Cuando \`is_model_available=False\`: banner "Evaluación no disponible".
La \`interpretation_warning\` SIEMPRE aparece, incluso si \`is_model_available=False\`.`}
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
          desc="3 pantallas con la interpretation_warning visible en todas: Evaluación (tarjetas de sesgo, badge correcto/incorrecto, resumen de patrón), Estadísticas (accuracy y distribución de sesgos por modelo) e Historial con reutilización de escenarios."
        />

        <Step 
          num="4.1" 
          title="Wireframe de 3 pantallas" 
          goal="Descripción textual de Evaluación (TextField, Dropdowns, panel de resultados con tarjetas de sesgo), Estadísticas (tablas vw_model_social_iq y vw_bias_distribution con filtros) e Historial (lista + panel lateral al hacer clic). Componente Flet específico para cada elemento."
        >
          <PromptBlock label="Prompt 4.1 — Wireframe">
{`Define el wireframe de Psique Lab con 3 pantallas:

1. Pantalla Evaluación (principal):
   - Advertencia de interpretación (siempre visible, no descartable)
   - TextField multiline para el escenario (o botón para cargar del dataset)
   - Dropdown para tipo de análisis y modelo LLM
   - Checkbox "Hay respuesta correcta conocida" + Dropdown para indicarla (A/B/C)
   - Botón "Evaluar"
   - Panel de resultados (después de evaluar):
     - Respuesta completa del LLM con scroll
     - Badge "CORRECTO/INCORRECTO/N/A" si hay ground truth
     - Tarjetas de sesgos detectados (si los hay): cada una con nombre + evidencia + confianza
     - Resumen del patrón de razonamiento
     - La advertencia de interpretación al pie

2. Pantalla Estadísticas:
   - Tabla \`vw_model_social_iq\`: accuracy por modelo
   - Tabla \`vw_bias_distribution\`: sesgos más frecuentes por modelo
   - Filtro por tipo de análisis

3. Pantalla Historial:
   - Lista de evaluaciones con filtros
   - Clic en evaluación: ver detalles en panel lateral

Para cada elemento: componente Flet específico.
[VERIFICAR EN DOCUMENTACI“N DE FLET los componentes disponibles]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="ft.Banner no descartable con interpretation_warning al inicio + ft.TextField multiline (máx 1000 chars) + botón 'Cargar escenario del dataset' con diálogo + Dropdowns de tipo de análisis y modelo + ft.Switch 'Tiene respuesta correcta' con Dropdown condicional A/B/C + botón 'Evaluar'."
        >
          <PromptBlock label="Prompt 4.2 — Formulario de escenario">
{`Implementa el formulario de Psique Lab con Flet.

PRIMERO: la advertencia de interpretación en \`ft.Banner\` no descartable al inicio:
"→ ️ Los análisis de Psique Lab miden el comportamiento del LLM en este escenario. No reflejan capacidades cognitivas generales ni comportamiento humano real."

Luego el formulario:
1. \`ft.TextField\` multiline para el escenario (scroll, máx 1000 chars)
2. \`ft.ElevatedButton\` "Cargar escenario del dataset" (diálogo con filtros por tipo)
3. \`ft.Dropdown\` para tipo de análisis, \`ft.Dropdown\` para modelo LLM
4. \`ft.Row\` con \`ft.Switch\` "Tiene respuesta correcta" + \`ft.Dropdown\` A/B/C (el Dropdown solo visible cuando el Switch está activo)
5. \`ft.ElevatedButton\` "Evaluar"
6. Contador de evaluaciones de la sesión en la barra de estado

[VERIFICAR EN DOCUMENTACI“N DE FLET Switch y comportamiento condicional de Dropdown]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Área de resultados" 
          goal="Badge CORRECTO/INCORRECTO/N-A + score de sesión; respuesta scrollable; ft.Column de tarjetas de sesgo con nombre + evidencia + badge de confianza BAJO/MEDIO + nota 'Detectado heurísticamente; verificar manualmente'; resumen de patrón en contenedor azul claro; interpretation_warning al pie siempre visible; botones Guardar y 'Evaluar con otro modelo'."
        >
          <PromptBlock label="Prompt 4.3 — Área de resultados">
{`Implementa el área de resultados de Psique Lab con Flet.

Recibe \`PsychEvaluation\`, \`session_stats\` (dict del cálculo de accuracy).

Genera código Flet para:
1. Badge de resultado (si hay ground truth): CORRECTO verde / INCORRECTO rojo / N/A gris + score de la sesión "Sesión: X/Y correctos (Z%)"
2. La respuesta completa en área scrollable con fuente legible
3. Si \`bias_flags\` no vacío: \`ft.Column\` de tarjetas de sesgo:
   - Cada tarjeta: nombre del sesgo en negrita + evidencia en el texto
   - Badge de confianza (MEDIO gris, BAJO más claro)
   - Nota: "Detectado heurísticamente; verificar manualmente"
4. Resumen del patrón de razonamiento en \`ft.Container\` con fondo azul muy claro
5. La advertencia de interpretación al pie, siempre visible (puede ser la misma del banner superior pero en texto más pequeño)
6. Botones: "Guardar evaluación", "Evaluar mismo escenario con otro modelo"

Datos recibidos como parámetros, no hardcodeados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacíos y de error" 
          goal="7 estados como funciones reutilizables: inicio (3 botones de ejemplo por categoría), evaluando (ProgressRing), LLM no disponible (banner rojo + interpretation_warning reforzada), escenario < 30 palabras (SnackBar), 0 sesgos detectados (texto educativo, no engañoso), opción no extractable (badge N-A con explicación), dataset no encontrado (modo manual con mensaje descriptivo)."
        >
          <PromptBlock label="Prompt 4.4 — Estados de error">
{`Define los estados excepcionales de Psique Lab.

Código Flet para:
1. Sin escenario (inicio): texto guía + 3 botones de ejemplo de escenario por categoría
2. Evaluando: \`ProgressRing\` + "Analizando con [MODELO]..."
3. LLM no disponible: banner rojo + la advertencia de interpretación reforzada "Sin análisis automático disponible. Revisa el escenario manualmente."
4. Escenario demasiado corto (< 30 palabras): \`SnackBar\` "El contexto del escenario necesita más detalle para un análisis significativo"
5. 0 sesgos detectados: texto "No se detectaron sesgos cognitivos con las heurísticas actuales. Esto no implica ausencia de sesgos." (educativo, no engañoso)
6. Opción no extractable del texto del LLM: badge N/A con texto "El modelo no indicó claramente su elección. Ver respuesta completa."
7. Dataset no encontrado: solo modo manual con mensaje descriptivo`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="Navegación básica" 
          goal="NavigationBar con 3 íconos; Estadísticas se actualiza al navegar; Historial con panel lateral al hacer clic en evaluación (solo lectura) + botón 'Reutilizar escenario' que lleva a Evaluación pre-cargada para probar con otro modelo. Interpretation_warning visible en todas las pantallas."
        >
          <PromptBlock label="Prompt 4.5 — Navegación">
{`Implementa la navegación de Psique Lab con Flet.

3 pantallas: Evaluación, Estadísticas, Historial.
La advertencia de interpretación es visible en TODAS las pantallas.

Implementa:
1. \`NavigationBar\` con 3 íconos
2. Pantalla Estadísticas se actualiza automáticamente al navegar
3. Pantalla Historial: clic en una evaluación â†’ panel lateral con detalles (\`response_text\` + \`bias_flags\` en modo solo lectura)
4. Botón "Reutilizar escenario" en el historial: lleva a Evaluación con el escenario pre-cargado para probar con otro modelo

Escribe el esqueleto completo de la app.
[VERIFICAR EN DOCUMENTACI“N DE FLET el sistema de navegación]`}
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
          desc="Pipeline completo on_evaluate_click, INTERPRETATION_WARNING hardcodeada en código (no en .env), log sin texto de escenarios por privacidad y configuración de tipos de análisis y sesgos disponibles en v1."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lógica" 
          goal="on_evaluate_click(): validar â‰¥30 palabras, mostrar 'Evaluando–¦', construir PsychScenario, llamar a psych_evaluation_pipeline() async, actualizar UI, actualizar score de sesión, guardar en DuckDB, banner si is_model_available=False. Interpretation_warning visible durante y después del análisis."
        >
          <PromptBlock label="Prompt 5.1 — on_evaluate_click()">
{`Implementa \`on_evaluate_click(e)\` para Psique Lab que:

1. Valida el escenario (mínimo 30 palabras)
2. Muestra "Evaluando..."
3. Construye el \`PsychScenario\` con los datos del formulario
4. Llama a \`evaluate_scenario_with_fallback()\` de forma asíncrona
5. Actualiza el área de resultados
6. Actualiza el score de la sesión con \`calculate_session_accuracy()\`
7. Guarda en DuckDB con \`store_evaluation()\`
8. Si \`is_model_available=False\`: muestra el banner de error

Usa asyncio con Flet [VERIFICAR EN DOCUMENTACI“N DE FLET].
La advertencia de interpretación debe ser visible durante Y después del análisis.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lógica con datos" 
          goal="psych_evaluation_pipeline(): evaluate_scenario_with_fallback() + store_evaluation() + devolver (evaluation, is_model_available). Sin lógica de UI. Log: scenario_id, model_name, analysis_type, is_correct, num_bias_flags, confidence_levels, response_time."
        >
          <PromptBlock label="Prompt 5.2 — Pipeline completo">
{`Escribe \`psych_evaluation_pipeline(scenario: PsychScenario, model_name: str, conn: duckdb.DuckDBPyConnection) -> tuple[PsychEvaluation, bool]\` que:

1. Llama a \`evaluate_scenario_with_fallback()\`
2. Guarda con \`store_evaluation()\`
3. Devuelve \`(evaluation, is_model_available)\`

La función no tiene lógica de UI.
Registra en log: \`scenario_id\`, \`model_name\`, \`analysis_type\`, \`is_correct\`, \`num_bias_flags\`, \`confidence_levels\`, \`response_time\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="Gestión de errores en cascada" 
          goal="PsyqueError enum + PsyqueException + tabla de decisiones para 6 puntos de fallo. Regla principal: 'La interpretation_warning NUNCA puede suprimirse, ni en errores.' La detection de sesgos puede fallar silenciosamente (bias_flags=[]), el resultado se muestra igualmente."
        >
          <PromptBlock label="Prompt 5.3 — Errores en cascada">
{`Define el plan de errores en cascada para Psique Lab.

Puntos de fallo:
1. API timeout â†’ \`ModelResponse\` con \`response_text=[TIMEOUT]\`, badge N/A
2. Parseo JSON falla â†’ guardar \`raw_response\`, sin \`bias_flags\`, sin \`chosen_option\`
3. \`extract_chosen_option()\` devuelve None â†’ badge N/A, mostrar respuesta completa
4. \`detect_cognitive_biases()\` lanza excepción â†’ \`ModelResponse\` con \`bias_flags=[]\` y nota "Detección de sesgos no disponible"
5. DuckDB falla â†’ mostrar resultados igualmente, log del error
6. Dataset no existe â†’ solo modo manual, mensaje descriptivo

Genera enum \`PsyqueError\`, excepción \`PsyqueException\`, tabla de decisiones.
Regla principal: "La interpretation_warning NUNCA puede suprimirse, ni en errores."`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging sin datos de escenarios" 
          goal="psychology_logger.py: evaluations.log + biases.log separado para análisis estadístico de tendencias. log_evaluation() SIN texto del escenario ni de la respuesta (puede contener contenido sensible). log_bias_detection() para estadísticas de sesgos detectados. Justificación del diseño de privacidad."
        >
          <PromptBlock label="Prompt 5.4 — Logging con privacidad">
{`Escribe \`psychology_logger.py\` para Psique Lab.

CONSIDERACI“N: los escenarios psicológicos pueden incluir contenido sensible que el usuario crea. El log nunca debe contener el texto del escenario.

1. Dos handlers: \`evaluations.log\` (\`RotatingFileHandler\` 5MB) y \`biases.log\` (registro específico de sesgos detectados, para análisis de tendencias)
2. \`log_evaluation(scenario_id: str, model_name: str, analysis_type: str, is_correct: Optional[bool], num_bias_flags: int, response_time: float)\`: SIN el texto del escenario ni de la respuesta
3. \`log_bias_detection(scenario_id: str, model_name: str, bias_names: list[str], confidence_levels: list[str])\`: Registro de sesgos detectados en \`biases.log\` (para análisis estadístico posterior)
4. \`log_error(error_type: str, scenario_id: str, message: str)\`: errores

¿Por qué no guardar el texto del escenario en el log? Puede contener contenido sensible creado por el usuario (ej. escenarios basados en situaciones personales).`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="Configuración centralizada" 
          goal="config.py: PSIQUE_LLM_API_KEY, MODEL, DB_PATH, SOCIALQA_PATH, TOM_PATH, LLM_TIMEOUT. Constantes ANALYSIS_TYPES, INTERPRETATION_WARNING (hardcodeada, no variable de entorno), BIAS_TYPES (4 en v1) y MIN_SCENARIO_WORDS=30. .env.example con explicación de por qué INTERPRETATION_WARNING es obligatoria."
        >
          <PromptBlock label="Prompt 5.5 — config.py">
{`Escribe \`config.py\` para Psique Lab:

Variables de entorno:
- \`PSIQUE_LLM_API_KEY\` (obligatoria)
- \`PSIQUE_LLM_MODEL\` (por defecto: [MODELO ELEGIDO])
- \`PSIQUE_DB_PATH\` (por defecto: \`~/.psique_lab/evaluations.duckdb\`)
- \`PSIQUE_LOG_LEVEL\` (por defecto: \`INFO\`)
- \`PSIQUE_SOCIALQA_PATH\` (por defecto: \`./data_psychology/raw/socialIQa.json\`)
- \`PSIQUE_TOM_PATH\` (por defecto: \`./data_psychology/raw/tomBench.json\`)
- \`PSIQUE_LLM_TIMEOUT\` (por defecto: \`45\`, segundos)

Constantes:
- \`ANALYSIS_TYPES\`: list[str] (tipos de análisis disponibles en v1)
- \`INTERPRETATION_WARNING\`: str (la advertencia de interpretación completa)
- \`BIAS_TYPES\`: list[str] (categorías de sesgos que detecta la v1)
- \`MIN_SCENARIO_WORDS\`: int = 30

Genera \`.env.example\` con comentarios, incluyendo una explicación de por qué la \`INTERPRETATION_WARNING\` es obligatoria en cada resultado.`}
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
          desc="Tests de extracción de opción elegida y detección de sesgos heurística, integración completa con mock, prueba manual con 7 escenarios específicos del dominio psicológico y empaquetado con INTERPRETATION_WARNING indesactivable."
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="tests/test_psychology_logic.py: extract_chosen_option (4 variantes: letra, paréntesis, texto, ambigua â†’ None), detect_cognitive_biases (atribuciones internas â†’ flag MEDIO, respuesta equilibrada â†’ 0 flags, estereotipo de género â†’ flag), summarize_reasoning_pattern (con y sin perspectiva de terceros). conftest.py con 4 fixtures."
        >
          <PromptBlock label="Prompt 6.1 — Tests unitarios">
{`Escribe tests unitarios con Pytest para Psique Lab.

Crea \`tests/test_psychology_logic.py\`:
1. \`extract_chosen_option()\`: respuesta con "Opción A", respuesta con "B)", respuesta con texto de la opción B (no la letra), respuesta ambigua â†’ None
2. \`detect_cognitive_biases()\`: respuesta con atribuciones internas obvias â†’ flag de atribución fundamental MEDIO, respuesta equilibrada â†’ 0 flags, respuesta con estereotipo de género â†’ flag de estereotipo
3. \`summarize_reasoning_pattern()\`: respuesta con perspectiva de terceros detectada, respuesta sin mención de actores (solo la respuesta A/B/C)

Fixtures en \`conftest.py\`:
- \`sample_tom_scenario\` (escenario ToM con ground truth)
- \`sample_socialIQa_scenario\` (escenario SocialIQa con opciones A/B/C)
- \`sample_biased_response\` (respuesta con atribución fundamental obvia)
- \`sample_balanced_response\` (respuesta equilibrada sin sesgos obvios)

No llames a APIs. No uses DuckDB en tests unitarios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="tests/test_psychology_integration.py: sample_psych_scenarios.json + DuckDB en memoria + mock de evaluate_social_scenario() con respuesta que incluye chosen_option=0 (correcta) y atribución fundamental obvia. Verificar: is_correct=True, â‰¥1 BiasFlag, interpretation_warning presente y get_model_social_stats() actualizado."
        >
          <PromptBlock label="Prompt 6.2 — Test de integración">
{`Escribe \`tests/test_psychology_integration.py\`:

1. Carga \`sample_psych_scenarios.json\`
2. DuckDB en memoria
3. Mockea SOLO \`evaluate_social_scenario()\` con respuesta JSON predefinida que:
   - Incluye \`chosen_option=0\` (opción A, que es la correcta en el escenario de prueba)
   - Incluye una atribución fundamental obvia en el reasoning
4. Ejecuta \`psych_evaluation_pipeline()\` completo
5. Verifica:
   a. \`chosen_option\` extraído correctamente â†’ \`is_correct=True\`
   b. Al menos 1 \`BiasFlag\` detectado (atribución fundamental)
   c. La \`interpretation_warning\` está presente en el \`PsychEvaluation\`
   d. La evaluación fue guardada en DuckDB
   e. \`get_model_social_stats()\` refleja 1 evaluación con el modelo mockeado

Test adicional: escenario sin opciones (respuesta libre) â†’ \`chosen_option=None\`, \`is_correct=None\`, sin excepción.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="Checklist con 7 escenarios: ToM clásico (razona desde perspectiva del actor?), SocialIQa difícil (acierta?), escenario con sesgo de género implícito (detección heurística funciona?), mismo escenario con 2 modelos (estadísticas reflejan diferencias?), sin internet (interpretation_warning aparece igualmente?), advertencia visible en 3 pantallas, historial persiste entre sesiones."
        >
          <PromptBlock label="Prompt 6.3 — Prueba manual">
{`Genera el protocolo de prueba manual de Psique Lab.

Escenarios (usando escenarios del dataset del laboratorio):
1. Cargar un escenario ToM clásico (False Belief) y evaluar con el modelo elegido â†’ ¿El modelo razona correctamente desde la perspectiva del actor?
2. Cargar un escenario SocialIQa de nivel difícil â†’ ¿El modelo acierta?
3. Introducir manualmente un escenario que contenga un sesgo de género implícito â†’ ¿La detección heurística lo detecta?
4. Evaluar el mismo escenario con 2 modelos diferentes â†’ ¿Las estadísticas reflejan las diferencias?
5. Desconectar internet â†’ ¿Aparece la advertencia de interpretación igualmente?
6. Verificar que la advertencia de interpretación es visible en las 3 pantallas
7. Verificar que el historial persiste entre sesiones

Señales de que está listo para empaquetar: [GENERA LA LISTA].`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado" 
          goal="PyInstaller o flet build (verificar cuál es el recomendado para la versión actual de Flet), incluir sample_psych_scenarios.json, INTERPRETATION_WARNING hardcodeada en el código (no en .env para que no pueda desactivarse eliminando el archivo), instrucciones de 3 pasos para el usuario final."
        >
          <PromptBlock label="Prompt 6.4 — Empaquetado .exe">
{`Instrucciones de empaquetado para Psique Lab.

Dependencias: \`flet\`, \`duckdb\`, \`pydantic\`, \`httpx\`, \`python-dotenv\`
Archivos de datos: \`sample_psych_scenarios.json\`
El \`.env\` NO se incluye.

Genera:
1. Comando de empaquetado (PyInstaller o \`flet build\`) [VERIFICAR EN DOCUMENTACI“N DE FLET Y PYINSTALLER]
2. Cómo incluir los archivos de escenarios en el ejecutable
3. La \`INTERPRETATION_WARNING\` debe estar hardcodeada en el código (no en el \`.env\`) para que no pueda desactivarse eliminando el \`.env\`
4. Instrucciones de instalación de 3 pasos para el usuario final
5. Cómo configurar la API key sin modificar el ejecutable`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en máquina limpia" 
          goal="Protocolo en VM Windows/macOS sin Python: archivos necesarios, checklist (interpretation_warning en pantalla principal, cargar escenario del dataset, bias_flags visibles, estadísticas de sesgos), errores comunes de Flet/DuckDB y cómo el usuario puede añadir escenarios propios sin reinstalar."
        >
          <PromptBlock label="Prompt 6.5 — Prueba en entorno limpio">
{`Protocolo de prueba del ejecutable de Psique Lab en entorno limpio.

1. Entorno: VM Windows o macOS sin Python instalado
2. Archivos necesarios: \`.env\` con \`PSIQUE_LLM_API_KEY\`
3. Checklist:
   - La advertencia de interpretación aparece en la pantalla principal
   - Se puede cargar un escenario del dataset
   - El modelo responde y aparece el análisis con los \`bias_flags\`
   - Las estadísticas de sesgos se muestran correctamente
   - El historial persiste entre sesiones
   - Sin internet: aparece el banner de error SIN suprimir la advertencia
4. Errores comunes de Flet/DuckDB en Windows/macOS [VERIFICAR EN DOCUMENTACI“N OFICIAL]
5. Cómo el usuario puede añadir escenarios propios al dataset sin reinstalar`}
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
          desc="Planificar v2 con comparativa paralela de 3 modelos y heurísticas de sesgos adicionales, y publicar en el Foro de Proyectos con la advertencia de interpretación prominente en la ficha."
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog en tabla con columna 'Riesgo de malinterpretación': comparativa de 3 modelos (Arena), análisis batch de 50 escenarios SocialIQa, heurísticas de disponibilidad y anclaje, exportar informe PDF de comparativa. Para cada idea: capa afectada, complejidad, prioridad y advertencias adicionales necesarias."
        >
          <PromptBlock label="Prompt 7.A — Backlog v2">
{`Psique Lab v1 está funcionando. Planifica la v2.

Ideas para v2: [ej. "comparar 3 modelos en el mismo escenario en paralelo", "análisis batch de 50 escenarios SocialIQa con estadísticas completas", "heurísticas de sesgos adicionales (sesgo de disponibilidad, anclaje)", "exportar informe PDF de comparativa de modelos"]

Para cada idea:
1. ¿Qué capa del mapa 1-6 afecta?
2. ¿Añade riesgo de malinterpretar los resultados? ¿Qué advertencias adicionales?
3. Complejidad y prioridad

Backlog v2 en formato tabla con columna "Riesgo de malinterpretación".`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Ficha con título 'Psique Lab v1 — [SUBTÍTULO]', área Psicología, descripción â‰¤150 palabras, advertencia de interpretación completa y prominente en la ficha, capturas (evaluación con bias_flags, pantalla de estadísticas de sesgos), instalación en 3 pasos y pregunta: '¿Qué sesgos cognitivos habéis observado en LLMs que Psique Lab debería detectar en v2?'"
        >
          <PromptBlock label="Prompt 7.B — Publicación en el Foro">
{`Genera la ficha de publicación de Psique Lab para el Foro Horizon.

1. Título: "Psique Lab v1 — [SUBTÍTULO]"
2. Área: Psicología & Ciencias del Comportamiento
3. Descripción (máx 150 palabras)
4. Advertencia de interpretación (texto completo, prominente en la ficha)
5. Capturas: evaluación con \`bias_flags\`, pantalla de estadísticas de sesgos
6. Instrucciones de instalación
7. Qué feedback busco: ¿heurísticas de sesgo que fallan? ¿escenarios donde la detección es incorrecta?
8. Pregunta para la comunidad: ej. "¿Qué sesgos cognitivos habéis observado en las respuestas de LLMs que consideráis que Psique Lab debería detectar en la v2?"`}
          </PromptBlock>
        </Step>

        {/* Resultado esperado */}
        <div className="mt-12 rounded-2xl p-6 border"
          style={{ background: "rgba(124,58,237,0.04)", borderColor: "rgba(124,58,237,0.18)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} style={{ color: "#7C3AED" }} />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#7C3AED" }}>Resultado esperado</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Al completar los 30+ prompts de esta ruta (Fase 0 + Capas 1–6 + Fase 7), tendrás un <strong>ejecutable de Psique Lab</strong> que evalúa el razonamiento social de cualquier LLM disponible por API: introduce un escenario de Teoría de la Mente o SocialIQa, obtén la respuesta razonada del modelo con análisis heurístico de sesgos cognitivos detectados, y compara el rendimiento entre modelos con historial estadístico de sesgos en DuckDB. La advertencia de interpretación está presente en todas las pantallas de forma indesactivable.
          </p>
          <div className="flex flex-wrap gap-3 justify-start mt-6">
            <Link to="/comunidad/aplicaciones"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "#7C3AED", color: "white" }}>
              Publicar en la Comunidad <ChevronRight size={14} />
            </Link>
            <Link to="/taller"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
              style={{ borderColor: "rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.6)" }}>
              Volver al Taller
            </Link>
          </div>
        </div>

        {/* Version extensions */}
        <VersionExtensions versions={VERSIONS} />

      </div>
    </div>
  );
}

